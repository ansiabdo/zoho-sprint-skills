const fs = require('fs');
const j = JSON.parse(fs.readFileSync('reports/update-new-stories.json', 'utf8'));
const r = j.find((x) => x.args.path_variables.itemId === '120216000004657094');
r.args.query_params.newusers = '120216000000359035';
fs.writeFileSync('reports/update-s2-plain.json', JSON.stringify([r], null, 2));
console.log(JSON.stringify(r.args.query_params, null, 2));
