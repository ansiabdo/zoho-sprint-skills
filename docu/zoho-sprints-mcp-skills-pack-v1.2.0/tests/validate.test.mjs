import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const validator = path.join(packageRoot, 'scripts', 'validate-package.mjs');

test('package validator accepts this release', () => {
  const result = spawnSync(process.execPath, [validator, packageRoot], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
});

test('package validator rejects a wrong manifest count', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'zoho-skill-validate-'));
  try {
    fs.cpSync(packageRoot, temp, { recursive: true });
    const manifestPath = path.join(temp, 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    manifest.file_count = -1;
    fs.writeFileSync(manifestPath, JSON.stringify(manifest));
    const result = spawnSync(process.execPath, [validator, temp], { encoding: 'utf8' });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /file_count/);
  } finally { fs.rmSync(temp, { recursive: true, force: true }); }
});
