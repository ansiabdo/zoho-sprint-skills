import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRelative = '.agents/skills/zoho-sprints';
const distributionRelative = 'skills/zoho-sprints';
const version = '2.0.0';

const normalize = (name) => name.split(path.sep).join('/');
const digest = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');

function files(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name, 'en'))
    .flatMap((entry) => {
      const current = path.join(directory, entry.name);
      return entry.isDirectory() ? files(current) : [current];
    });
}

function within(base, candidate) {
  const relative = path.relative(base, candidate);
  return relative && relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

function manifestFor(base) {
  const source = path.join(base, sourceRelative);
  return {
    name: 'Zoho Sprints Professional Skills',
    version,
    canonical_skill: `${sourceRelative}/SKILL.md`,
    distribution_skill: `${distributionRelative}/SKILL.md`,
    source_files: files(source).map((file) => ({
      path: normalize(path.relative(source, file)),
      sha256: digest(file),
    })),
  };
}

export function sync(base = root) {
  const absolute = fs.realpathSync(base);
  const source = path.join(absolute, sourceRelative);
  const destination = path.join(absolute, distributionRelative);
  if (!fs.existsSync(path.join(source, 'SKILL.md'))) throw new Error('Canonical skill is missing.');
  if (!within(absolute, destination)) throw new Error('Distribution path is outside package.');
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  if (!within(absolute, fs.realpathSync(path.dirname(destination)))) throw new Error('Distribution parent follows a link outside package.');
  if (fs.existsSync(destination)) {
    if (fs.lstatSync(destination).isSymbolicLink()) throw new Error('Refusing to replace a symlinked distribution.');
    fs.rmSync(destination, { recursive: true, force: true });
  }
  fs.cpSync(source, destination, { recursive: true });
  fs.writeFileSync(path.join(absolute, 'manifest.json'), `${JSON.stringify(manifestFor(absolute), null, 2)}\n`);
}

export function check(base = root) {
  const absolute = fs.realpathSync(base);
  const source = path.join(absolute, sourceRelative);
  const distribution = path.join(absolute, distributionRelative);
  const errors = [];
  const sourceFiles = files(source);
  const distributedFiles = files(distribution);
  if (!fs.existsSync(path.join(source, 'SKILL.md'))) return ['canonical SKILL.md missing'];

  const sourceNames = sourceFiles.map((file) => normalize(path.relative(source, file)));
  const distributedNames = distributedFiles.map((file) => normalize(path.relative(distribution, file)));
  if (JSON.stringify(sourceNames) !== JSON.stringify(distributedNames)) errors.push('distribution differs: file set');
  for (const name of sourceNames) {
    const target = path.join(distribution, name);
    if (!fs.existsSync(target) || digest(path.join(source, name)) !== digest(target)) errors.push(`distribution differs: ${name}`);
  }

  const skill = fs.readFileSync(path.join(source, 'SKILL.md'), 'utf8').replace(/\r\n/g, '\n');
  const frontmatter = skill.match(/^---\n([\s\S]+?)\n---\n/);
  if (!frontmatter || !/^name:\s*zoho-sprints\s*$/m.test(frontmatter[1]) || !/^description:\s*\S.+$/m.test(frontmatter[1])) {
    errors.push('SKILL.md frontmatter requires zoho-sprints name and description');
  }
  try {
    const contract = JSON.parse(fs.readFileSync(path.join(source, 'references', 'contract.json'), 'utf8'));
    if (contract.version !== 2 || JSON.stringify(contract.roles) !== JSON.stringify(['admin', 'developer']) || !Array.isArray(contract.action_states)) {
      errors.push('policy contract structure differs');
    }
  } catch { errors.push('policy contract is missing or invalid'); }

  for (const file of sourceFiles) {
    const content = fs.readFileSync(file, 'utf8');
    if (/https:\/\/[^\s"']+\.zohomcp\.com\/mcp\//i.test(content)) errors.push(`private MCP endpoint in ${normalize(path.relative(source, file))}`);
    if (!file.endsWith('.md')) continue;
    const outsideFences = content.replace(/(^|\n)```[\s\S]*?\n```/g, '\n');
    for (const match of outsideFences.matchAll(/\]\(([^)]+)\)/g)) {
      const target = match[1].split('#')[0];
      if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
      if (!fs.existsSync(path.resolve(path.dirname(file), target))) {
        errors.push(`broken link in ${normalize(path.relative(source, file))}: ${target}`);
      }
    }
  }

  try {
    const current = JSON.parse(fs.readFileSync(path.join(absolute, 'manifest.json'), 'utf8'));
    if (JSON.stringify(current) !== JSON.stringify(manifestFor(absolute))) errors.push('manifest is stale; run npm run sync');
  } catch { errors.push('manifest is missing or invalid'); }
  return errors;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const operation = process.argv[2];
  if (operation === 'sync') sync();
  else if (operation === 'check') {
    const errors = check();
    if (errors.length) {
      process.stderr.write(`${errors.join('\n')}\n`);
      process.exitCode = 1;
    } else process.stdout.write('Skill source, distribution, links, contract and manifest: valid.\n');
  } else {
    process.stderr.write('Usage: node tools/skill.mjs sync|check\n');
    process.exitCode = 2;
  }
}
