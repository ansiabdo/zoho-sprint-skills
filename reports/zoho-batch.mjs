#!/usr/bin/env node
/*
 * Run a batch of Zoho MCP calls through mcp/zoho-mcp-client.js and save UTF-8 JSON.
 * Usage: node reports/zoho-batch.mjs <input.json> <output.json>
 * Input: [{ "tool": "ZohoSprints_GetItems", "args": { ... } }]
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const inputPath = process.argv[2];
const outputPath = process.argv[3];
if (!inputPath || !outputPath) {
  console.error('Usage: node reports/zoho-batch.mjs <input.json> <output.json>');
  process.exit(2);
}
const calls = JSON.parse(fs.readFileSync(inputPath, 'utf8').replace(/^\uFEFF/, ''));
const stamp = Date.now();
const temp = path.join(root, 'reports', `.batch-${stamp}.json`);
fs.writeFileSync(temp, JSON.stringify(calls), 'utf8');
let raw = '';
try {
  raw = execFileSync(process.execPath, [path.join(root, 'mcp', 'zoho-mcp-client.js'), 'batch', temp], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 200 * 1024 * 1024,
    timeout: 30 * 60 * 1000,
  });
} finally {
  try { fs.unlinkSync(temp); } catch {}
}
const start = raw.indexOf('[');
if (start < 0) {
  console.error('No JSON array in output. First 500 chars:\n' + raw.slice(0, 500));
  process.exit(1);
}
const results = JSON.parse(raw.slice(start));
const normalized = results.map((r) => {
  const text = r.result?.content?.[0]?.text;
  let data = null;
  if (typeof text === 'string') {
    try { data = JSON.parse(text); } catch { data = { raw: text }; }
  }
  return {
    ok: r.ok,
    tool: r.params || r.tool || '',
    error: r.error,
    isError: r.result?.isError ?? null,
    data,
  };
});
fs.writeFileSync(outputPath, JSON.stringify(normalized, null, 2), 'utf8');
const failed = normalized.filter((r) => !r.ok || r.isError).length;
console.log(JSON.stringify({ calls: calls.length, failed, output: outputPath }));
