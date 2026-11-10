const fs = require('fs');
const j = JSON.parse(fs.readFileSync('reports/update-new-stories.json', 'utf8'));
const r = j.find((x) => x.args.path_variables.itemId === '120216000004657094');
delete r.args.query_params.newusers;
r.args.query_params.delusers = JSON.stringify(['120216000000535227']);
fs.writeFileSync('reports/remove-abdullah-s2.json', JSON.stringify([r], null, 2));
console.log(JSON.stringify(r.args.query_params, null, 2));
