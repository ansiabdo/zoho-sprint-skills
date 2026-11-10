const fs = require('fs');
const items = JSON.parse(fs.readFileSync('reports/restructure-updates.json', 'utf8'));
const map = {
  '120216000004655033': ['المشتركون وتسجيل الأصدقاء', 'Subscribers & Friend Registration'],
  '120216000004656304': ['تكامل API بنكي لايت', 'Banky Lite API Integration'],
  '120216000004657007': ['الدفع الجزئي والتحقق الخلفي', 'Partial Payment & Backend Verification'],
  '120216000004656300': ['قبول ورفض المديونية وتعديل البنود', 'Debt Acceptance & Line Edit Approval'],
};
const out = items
  .filter((r) => map[r.args.path_variables.itemId])
  .map((r) => {
    const id = r.args.path_variables.itemId;
    const q = r.args.query_params;
    q.newusers = JSON.stringify(['120216000000359035']);
    q.startdate = '2026-10-31T21:00:00+0000';
    q.enddate = '2026-11-15T20:59:59+0000';
    q.point = 1;
    q.statusid = '120216000000003629';
    q.duration = '11d';
    q.UDF_CHAR5 = 'Nidhal';
    q.UDF_CHAR3 = map[id][0];
    q.UDF_CHAR4 = map[id][1];
    return r;
  });
fs.writeFileSync('reports/update-rest.json', JSON.stringify(out, null, 2));
console.log(JSON.stringify(out.map((r) => ({
  id: r.args.path_variables.itemId,
  name: r.args.query_params.name,
  udf3: r.args.query_params.UDF_CHAR3,
  udf4: r.args.query_params.UDF_CHAR4,
})), null, 2));
