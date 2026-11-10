const fs = require('fs');
const j = JSON.parse(fs.readFileSync('reports/update-new-stories.json', 'utf8'));
const base = j.find((x) => x.args.path_variables.itemId === '120216000004657094');
const mk = (extra, remove) => {
  const r = JSON.parse(JSON.stringify(base));
  if (remove) delete r.args.query_params.newusers;
  Object.assign(r.args.query_params, extra);
  return r;
};
const out = [
  mk({ newusers: JSON.stringify(['120216000000535227']) }, true),
  mk({ delusers: JSON.stringify(['120216000000535227']) }, false),
];
fs.writeFileSync('reports/fix-assignee-s2-add-remove.json', JSON.stringify(out, null, 2));
console.log(JSON.stringify(out.map((r) => ({
  newusers: r.args.query_params.newusers,
  delusers: r.args.query_params.delusers,
})), null, 2));
