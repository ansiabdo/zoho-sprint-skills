import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { check, sync } from '../tools/skill.mjs';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function fixture(run) {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'zoho-skill-contract-'));
  const source = path.join(base, '.agents', 'skills', 'zoho-sprints');
  fs.mkdirSync(path.dirname(source), { recursive: true });
  fs.cpSync(path.join(packageRoot, '.agents', 'skills', 'zoho-sprints'), source, { recursive: true });
  try { run(base); }
  finally {
    const resolved = path.resolve(base);
    if (resolved.startsWith(path.resolve(os.tmpdir()) + path.sep) && path.basename(resolved).startsWith('zoho-skill-contract-')) {
      fs.rmSync(resolved, { recursive: true, force: true });
    }
  }
}

test('sync creates an identical portable skill and deterministic manifest', () => fixture((base) => {
  sync(base);
  assert.deepEqual(check(base), []);
  const manifest = fs.readFileSync(path.join(base, 'manifest.json'), 'utf8');
  sync(base);
  assert.equal(fs.readFileSync(path.join(base, 'manifest.json'), 'utf8'), manifest);
}));

test('check rejects drift in the portable copy', () => fixture((base) => {
  sync(base);
  fs.appendFileSync(path.join(base, 'skills', 'zoho-sprints', 'SKILL.md'), '\nStale edit\n');
  assert.ok(check(base).some((error) => error.includes('distribution differs')));
}));

test('check rejects broken links and private endpoints', () => fixture((base) => {
  sync(base);
  const skill = path.join(base, '.agents', 'skills', 'zoho-sprints', 'SKILL.md');
  fs.appendFileSync(skill, '\n[Missing](references/not-there.md)\n');
  assert.ok(check(base).some((error) => error.includes('broken link')));
  fs.appendFileSync(skill, '\nhttps://example.zohomcp.com/mcp/private\n');
  assert.ok(check(base).some((error) => error.includes('private MCP endpoint')));
}));
