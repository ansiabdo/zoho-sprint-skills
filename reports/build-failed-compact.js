const fs = require('fs');
const r = JSON.parse(fs.readFileSync('reports/create-stories.json', 'utf8'));
const idx = [0, 4, 7];
const out = [];
for (const i of idx) {
  const q = JSON.parse(JSON.stringify(r[i].args.query_params));
  q.description = q.description.replace(/^.*?<hr>\n/s, '<p><strong>Business Requester:</strong> Nidhal</p>\n');
  out.push({ ...r[i], args: { ...r[i].args, query_params: q } });
  console.log(i + 1, q.description.length, encodeURIComponent(q.description).length, 'total', encodeURIComponent(q.description).length + encodeURIComponent(q.name).length + 60);
}
fs.writeFileSync('reports/create-failed-stories-compact.json', JSON.stringify(out, null, 2), 'utf8');
