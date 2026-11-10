const fs = require('fs');

const md = fs.readFileSync('reports/fatoorati-epic-proposal-ar.md', 'utf8');
const start = md.indexOf('### S1 —');
const end = md.indexOf('## 7.', start);
if (start < 0 || end < 0) throw new Error('Could not locate story section');

const section = md.slice(start, end);
const parts = section.split(/^### /m).filter(Boolean);

const priority = {
  S1: '120216000000593039',
  S2: '120216000000593039',
  S3: '120216000000593037',
  S4: '120216000000593039',
  S5: '120216000000593039',
  S6: '120216000000593037',
  S7: '120216000000593037',
  S8: '120216000000593037',
  S9: '120216000000593037',
};

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inline(s) {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>');
}

function mdToHtml(lines) {
  const out = [];
  let list = null;
  let para = [];

  function flushPara() {
    if (para.length) {
      out.push('<p>' + para.map(inline).join('<br>') + '</p>');
      para = [];
    }
  }
  function flushList() {
    if (list) {
      out.push(`<${list.tag}>` + list.items.map(i => '<li>' + inline(i) + '</li>').join('') + `</${list.tag}>`);
      list = null;
    }
  }

  for (let raw of lines) {
    const line = raw.replace(/\s+$/, '');
    if (!line.trim()) { flushPara(); flushList(); continue; }
    if (/^---+$/.test(line.trim())) { flushPara(); flushList(); continue; }
    if (line.startsWith('### ')) { flushPara(); flushList(); out.push('<h3>' + inline(line.slice(4)) + '</h3>'); continue; }
    const ol = line.match(/^\d+\.\s+(.*)$/);
    if (ol) {
      flushPara();
      if (!list || list.tag !== 'ol') { flushList(); list = { tag: 'ol', items: [] }; }
      list.items.push(ol[1]);
      continue;
    }
    const ul = line.match(/^[-*]\s+(.*)$/);
    if (ul) {
      flushPara();
      if (!list || list.tag !== 'ul') { flushList(); list = { tag: 'ul', items: [] }; }
      list.items.push(ul[1]);
      continue;
    }
    flushList();
    para.push(line);
  }
  flushPara(); flushList();
  return out.join('\n');
}

const stories = [];
for (const p of parts) {
  const nl = p.indexOf('\n');
  const title = p.slice(0, nl).trim();
  const body = p.slice(nl + 1);
  const key = (title.match(/^(S\d+)/) || [])[1];
  if (!key || !priority[key]) continue;
  const [ar, en] = title.replace(/^S\d+\s*—\s*/, '').split('|').map(s => s.trim());
  const html = mdToHtml(body.split('\n'));
  const header = `<p><strong>الاسم العربي:</strong> ${esc(ar)}</p>\n` +
    `<p><strong>English Name:</strong> ${esc(en || ar)}</p>\n` +
    `<p><strong>Business Requester:</strong> Nidhal</p>\n` +
    `<p><strong>Epic:</strong> منصة فاتورتي متعددة المستأجرين والتسويات المستقلة</p>\n` +
    `<p><strong>ملاحظة:</strong> الحقول المخصصة (Arabic Short Name / English Short Name / Business Requester) غير قابلة للكتابة عبر MCP الحالي؛ القيم مذكورة أعلاه داخل الوصف لحين استكمالها من واجهة Zoho.</p>\n<hr>\n`;
  stories.push({
    key,
    name: title,
    ar,
    en,
    priority: priority[key],
    description: header + html,
    length: (header + html).length
  });
}

if (stories.length !== 9) throw new Error('Expected 9 stories, got ' + stories.length);

const req = stories.map(s => ({
  tool: 'ZohoSprints_CreateItem',
  args: {
    headers: { 'X-convert-response': 'true', 'x-za-ui-version': 'v2' },
    path_variables: {
      teamId: '767679505',
      projectId: '120216000000593007',
      sprintId: '120216000004656294'
    },
    query_params: {
      name: s.name,
      description: s.description,
      projitemtypeid: '120216000000593045',
      projpriorityid: s.priority,
      epicid: '120216000004657001'
    }
  }
}));

fs.writeFileSync('reports/create-stories.json', JSON.stringify(req, null, 2), 'utf8');
fs.writeFileSync('reports/stories-manifest.json', JSON.stringify(stories.map(({description, ...rest}) => rest), null, 2), 'utf8');
console.log(JSON.stringify(stories.map(s => ({ key: s.key, name: s.name, priority: s.priority, length: s.length })), null, 2));
