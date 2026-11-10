const fs = require('fs');
const r = JSON.parse(fs.readFileSync('reports/create-stories.json', 'utf8'));
const idx = [0, 4, 7];
const out = [];
for (const i of idx) {
  const q = JSON.parse(JSON.stringify(r[i].args.query_params));
  q.description = q.description.replace(/<p><strong>ملاحظة:<\/strong>.*?<\/p>\n?/s, '');
  out.push({ ...r[i], args: { ...r[i].args, query_params: q } });
  console.log(i + 1, q.description.length, encodeURIComponent(q.description).length);
}
fs.writeFileSync('reports/create-failed-stories.json', JSON.stringify(out, null, 2), 'utf8');
