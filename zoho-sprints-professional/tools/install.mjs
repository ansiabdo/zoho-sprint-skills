import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skillSource = path.join(packageRoot, 'skills', 'zoho-sprints');

const locations = {
  codex: [['skill', '.agents/skills/zoho-sprints']],
  claude: [['skill', '.claude/skills/zoho-sprints']],
  opencode: [['skill', '.opencode/skills/zoho-sprints']],
  cursor: [['skill', '.cursor/skills/zoho-sprints']],
  kiro: [['skill', '.kiro/skills/zoho-sprints']],
  antigravity: [['skill', '.agents/skills/zoho-sprints']],
  generic: [['skill', '.agents/skills/zoho-sprints']],
};

function usage() {
  throw new Error('Usage: node tools/install.mjs --editor codex|claude|opencode|cursor|kiro|antigravity|generic --target <existing-project-directory> [--force]');
}

let editor;
let target;
let force = false;
for (let i = 2; i < process.argv.length; i++) {
  const arg = process.argv[i];
  if (arg === '--editor') editor = process.argv[++i];
  else if (arg === '--target') target = process.argv[++i];
  else if (arg === '--force') force = true;
  else usage();
}
if (!Object.hasOwn(locations, editor) || !target) usage();

const root = fs.realpathSync(path.resolve(target));
if (!fs.statSync(root).isDirectory()) throw new Error('Target must be a directory.');

function inside(base, candidate) {
  const relative = path.relative(base, candidate);
  return relative !== '' && relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

function assertSafeDestination(destination) {
  if (!inside(root, destination)) throw new Error('Destination is outside the target project.');
  let ancestor = destination;
  while (!fs.existsSync(ancestor)) ancestor = path.dirname(ancestor);
  const realAncestor = fs.realpathSync(ancestor);
  if (realAncestor !== root && !inside(root, realAncestor)) {
    throw new Error('Destination follows a link outside the target project.');
  }
}

const sources = {
  skill: skillSource,
  cursor: path.join(packageRoot, 'editor-adapters', 'cursor', 'zoho-sprints.mdc'),
  kiro: path.join(packageRoot, 'editor-adapters', 'kiro', 'zoho-sprints.md'),
};
const copies = locations[editor].map(([sourceName, relative]) => ({
  source: sources[sourceName],
  destination: path.join(root, relative),
}));

for (const copy of copies) {
  assertSafeDestination(copy.destination);
  if (fs.existsSync(copy.destination) && !force) {
    throw new Error(`Already installed: ${copy.destination}. Use --force to replace it.`);
  }
}

const runId = `${Date.now()}-${randomUUID().slice(0, 8)}`;
const stagingRoot = path.join(root, '.zoho-sprints-skill-staging', runId);
const backupRoot = path.join(root, '.zoho-sprints-skill-backups', runId);
assertSafeDestination(stagingRoot);
assertSafeDestination(backupRoot);

const switched = [];
let madeBackup = false;
try {
  fs.mkdirSync(stagingRoot, { recursive: true });
  copies.forEach((copy, index) => {
    copy.staged = path.join(stagingRoot, String(index));
    copy.backup = path.join(backupRoot, path.relative(root, copy.destination));
    assertSafeDestination(copy.backup);
    fs.cpSync(copy.source, copy.staged, { recursive: true, force: false });
  });

  for (const copy of copies) {
    const state = { copy, hadOld: false, installed: false };
    switched.push(state);
    if (fs.existsSync(copy.destination)) {
      fs.mkdirSync(path.dirname(copy.backup), { recursive: true });
      fs.renameSync(copy.destination, copy.backup);
      state.hadOld = true;
      madeBackup = true;
    }
    fs.mkdirSync(path.dirname(copy.destination), { recursive: true });
    fs.renameSync(copy.staged, copy.destination);
    state.installed = true;
  }
} catch (error) {
  for (const state of switched.reverse()) {
    if (state.installed && fs.existsSync(state.copy.destination)) {
      fs.rmSync(state.copy.destination, { recursive: true, force: true });
    }
    if (state.hadOld && fs.existsSync(state.copy.backup)) {
      fs.mkdirSync(path.dirname(state.copy.destination), { recursive: true });
      fs.renameSync(state.copy.backup, state.copy.destination);
    }
  }
  throw error;
} finally {
  if (fs.existsSync(stagingRoot)) fs.rmSync(stagingRoot, { recursive: true, force: true });
}

for (const copy of copies) process.stdout.write(`Installed ${copy.destination}\n`);
if (madeBackup) process.stdout.write(`Previous files saved at ${backupRoot}\n`);
