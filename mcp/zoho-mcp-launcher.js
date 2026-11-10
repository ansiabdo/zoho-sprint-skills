const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');

const projectRoot = path.resolve(__dirname, '..');
const configPath = path.join(projectRoot, 'docu', 'mcp_sprint_config.json');
const server = JSON.parse(fs.readFileSync(configPath, 'utf8')).mcpServers?.ZohoMCP;
if (server?.command !== 'npx' || !Array.isArray(server.args) || server.args[0] !== 'mcp-remote') {
  throw new Error('ZohoMCP must launch mcp-remote through npx.');
}

const npmCli = path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npx-cli.js');
const child = spawn(process.execPath, [npmCli, '--yes', ...server.args], {
  cwd: projectRoot,
  stdio: 'inherit',
  windowsHide: true,
});
child.on('error', (error) => {
  process.stderr.write(`Could not start ZohoMCP: ${error.message}\n`);
  process.exitCode = 1;
});
child.on('exit', (code) => { process.exitCode = code ?? 1; });
