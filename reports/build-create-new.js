const fs = require('fs');
const items = JSON.parse(fs.readFileSync('reports/restructure-creates.json', 'utf8'));
for (const r of items) {
  const q = r.args.query_params;
  q.users = JSON.stringify(['120216000000359035']);
  q.point = 1;
  q.startdate = '2026-10-31T21:00:00+0000';
  q.enddate = '2026-11-15T20:59:59+0000';
  q.duration = '11d';
}
fs.writeFileSync('reports/create-new-stories.json', JSON.stringify(items, null, 2));
console.log(JSON.stringify(items.map((r) => ({
  name: r.args.query_params.name,
  users: r.args.query_params.users,
  point: r.args.query_params.point,
  start: r.args.query_params.startdate,
  end: r.args.query_params.enddate,
  duration: r.args.query_params.duration,
})), null, 2));
