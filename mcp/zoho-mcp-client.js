#!/usr/bin/env node
/*
 * Minimal stdio MCP client for the Zoho Sprints MCP endpoint used by this workspace.
 * Usage:
 *   node zoho-mcp-client.js list-tools
 *   node zoho-mcp-client.js call <toolName> '<jsonArgs>'
 *   node zoho-mcp-client.js batch <file.json>
 * Batch file: [{ "tool": "name", "args": { ... } }, ...] or
 *             [{ "method": "tools/list", "params": {} }, ...]
 */
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');

const projectRoot = path.resolve(__dirname, '..');
const configPath = path.join(projectRoot, 'docu', 'mcp_sprint_config.json');
const server = JSON.parse(fs.readFileSync(configPath, 'utf8')).mcpServers?.ZohoMCP;
if (!server || server.command !== 'npx' || !Array.isArray(server.args)) {
  console.error('Invalid ZohoMCP config');
  process.exit(2);
}

const npmCli = path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npx-cli.js');
const child = spawn(process.execPath, [npmCli, '--yes', ...server.args], {
  cwd: projectRoot,
  stdio: ['pipe', 'pipe', 'pipe'],
  windowsHide: true,
});

let nextId = 1;
const pending = new Map();
let stdoutBuffer = '';

function send(method, params) {
  const id = nextId++;
  const msg = { jsonrpc: '2.0', id, method, params: params ?? {} };
  child.stdin.write(JSON.stringify(msg) + '\n');
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`Timeout waiting for ${method} (${id})`));
    }, 180000);
    pending.set(id, { resolve, reject, timer });
  });
}

function notify(method, params) {
  child.stdin.write(JSON.stringify({ jsonrpc: '2.0', method, params: params ?? {} }) + '\n');
}

child.stdout.on('data', (chunk) => {
  stdoutBuffer += chunk.toString('utf8');
  let idx;
  while ((idx = stdoutBuffer.indexOf('\n')) >= 0) {
    const line = stdoutBuffer.slice(0, idx).trim();
    stdoutBuffer = stdoutBuffer.slice(idx + 1);
    if (!line) continue;
    let msg;
    try { msg = JSON.parse(line); } catch { console.error('[server]', line); continue; }
    if (msg.id != null && pending.has(msg.id)) {
      const { resolve, reject, timer } = pending.get(msg.id);
      clearTimeout(timer);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(JSON.stringify(msg.error)));
      else resolve(msg.result);
    } else if (msg.method) {
      // Server-initiated request; answer minimally so startup does not stall.
      if (msg.method === 'ping') child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: msg.id, result: {} }) + '\n');
    }
  }
});

child.stderr.on('data', (d) => console.error('[stderr]', d.toString('utf8').trim()));
child.on('exit', (code) => {
  for (const [id, p] of pending) { clearTimeout(p.timer); p.reject(new Error(`Server exited (${code}) before response ${id}`)); }
  pending.clear();
});

async function openSession() {
  const init = await send('initialize', {
    protocolVersion: '2025-03-26',
    capabilities: { tools: {} },
    clientInfo: { name: 'zoho-workspace-client', version: '1.0.0' },
  });
  notify('notifications/initialized', {});
  return init;
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const init = await openSession();
  if (!cmd || cmd === 'init') {
    console.log(JSON.stringify(init, null, 2));
  } else if (cmd === 'list-tools') {
    const result = await send('tools/list', {});
    const tools = (result.tools || []).map((t) => ({ name: t.name, description: t.description, inputSchema: t.inputSchema }));
    console.log(JSON.stringify({ server: init.serverInfo, count: tools.length, tools }, null, 2));
  } else if (cmd === 'call') {
    const tool = rest[0];
    const args = rest[1] ? JSON.parse(rest[1]) : {};
    const result = await send('tools/call', { name: tool, arguments: args });
    console.log(JSON.stringify(result, null, 2));
  } else if (cmd === 'batch') {
    const items = JSON.parse(fs.readFileSync(rest[0], 'utf8'));
    const out = [];
    for (const item of items) {
      const method = item.method || 'tools/call';
      const params = item.params || (method === 'tools/call' ? { name: item.tool, arguments: item.args || {} } : {});
      try {
        const result = await send(method, params);
        out.push({ ok: true, method, params: params.name || undefined, result });
      } catch (e) {
        out.push({ ok: false, method, params: params.name || undefined, error: e.message });
      }
    }
    console.log(JSON.stringify(out, null, 2));
  } else {
    throw new Error(`Unknown command: ${cmd}`);
  }
  child.stdin.end();
  setTimeout(() => { child.kill(); process.exit(0); }, 1000).unref();
}

main().catch((e) => { console.error('ERROR:', e.message); try { child.kill(); } catch {} process.exit(1); });
