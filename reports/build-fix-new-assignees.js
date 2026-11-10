const fs = require('fs');
const j = JSON.parse(fs.readFileSync('reports/update-new-stories.json', 'utf8'));
const ids = ['120216000004656360', '120216000004655091'];
const out = [];
for (const id of ids) {
  const base = j.find((x) => x.args.path_variables.itemId === id);
  const add = JSON.parse(JSON.stringify(base));
  delete add.args.query_params.delusers;
  add.args.query_params.newusers = JSON.stringify(['120216000000535227']);
  out.push(add);
  const rem = JSON.parse(JSON.stringify(base));
  delete rem.args.query_params.newusers;
  rem.args.query_params.delusers = JSON.stringify(['120216000000535227']);
  out.push(rem);
}
fs.writeFileSync('reports/fix-new-assignees.json', JSON.stringify(out, null, 2));
console.log(JSON.stringify(out.map((r) => ({
  itemId: r.args.path_variables.itemId,
  newusers: r.args.query_params.newusers,
  delusers: r.args.query_params.delusers,
  udf3: r.args.query_params.UDF_CHAR3,
})), null, 2));
