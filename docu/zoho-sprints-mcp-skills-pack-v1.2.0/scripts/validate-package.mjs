import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(process.argv[2] || defaultRoot);
const errors = [];

function filesUnder(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const current = path.join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(current) : [current];
  });
}

try {
  const files = filesUnder(root);
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
  if (manifest.file_count !== files.length) {
    errors.push(`manifest file_count ${manifest.file_count} differs from actual ${files.length}`);
  }
  const skillPath = path.join(root, manifest.canonical_skill || '');
  if (!fs.existsSync(skillPath)) errors.push('canonical_skill does not exist');
  const skillCopies = files.filter((file) => path.basename(file) === 'SKILL.md');
  if (skillCopies.length !== 1) errors.push(`expected one SKILL.md source, found ${skillCopies.length}`);

  if (fs.existsSync(skillPath)) {
    const skill = fs.readFileSync(skillPath, 'utf8');
    if (!/^---\r?\n[\s\S]*?\bname:\s*zoho-sprints\b[\s\S]*?\bdescription:\s*.+?\r?\n[\s\S]*?---\r?\n/.test(skill)) {
      errors.push('SKILL.md needs valid name and description frontmatter');
    }
  }

  for (const file of files.filter((name) => name.endsWith('.md') && name.startsWith(path.join(root, 'skills')))) {
    const contents = fs.readFileSync(file, 'utf8');
    for (const match of contents.matchAll(/\]\(([^)]+)\)/g)) {
      const link = match[1].split('#')[0];
      if (!link || /^[a-z]+:\/\//i.test(link)) continue;
      if (!fs.existsSync(path.resolve(path.dirname(file), link))) {
        errors.push(`broken link in ${path.relative(root, file)}: ${link}`);
      }
    }
  }

  for (const file of files) {
    if (path.basename(file).toLowerCase() === 'mcp_sprint_config.json') errors.push('private MCP configuration is bundled');
    if (/\.(md|json|yaml|yml|mjs|mdc)$/i.test(file)) {
      const contents = fs.readFileSync(file, 'utf8');
      if (/https:\/\/[^\s"']+\.zohomcp\.com\/mcp\//i.test(contents)) {
        errors.push(`private Zoho MCP endpoint appears in ${path.relative(root, file)}`);
      }
    }
  }

  if (errors.length) throw new Error(errors.join('\n'));
  process.stdout.write(`Package valid: ${files.length} files, one skill, links resolved, no private MCP endpoint.\n`);
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}
