const fs = require('fs');
const j = JSON.parse(fs.readFileSync('reports/update-new-stories.json', 'utf8'));
const base = j.find((r) => r.args.path_variables.itemId === '120216000004657094');
const mk = (extra) => {
  const r = JSON.parse(JSON.stringify(base));
  Object.assign(r.args.query_params, extra);
  return r;
};
const out = [
  mk({ delusers: JSON.stringify(['120216000000359035']) }),
  mk({ newusers: JSON.stringify(['120216000000359035']) }),
];
fs.writeFileSync('reports/fix-assignee-s2.json', JSON.stringify(out, null, 2));
console.log(JSON.stringify(out.map((r) => ({
  itemId: r.args.path_variables.itemId,
  delusers: r.args.query_params.delusers,
  newusers: r.args.query_params.newusers,
})), null, 2));
