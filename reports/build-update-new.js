const fs = require('fs');
const data = JSON.parse(fs.readFileSync('reports/restructure-data.json', 'utf8'));
const newIds = {
  S2: '120216000004657094',
  S5: '120216000004656360',
  S8: '120216000004655091',
};
const names = {
  S2: ['نموذج أطراف الفاتورة', 'Invoice Provider, Issuer & Subscriber'],
  S5: ['تنفيذ خدمة مديونية الأصدقاء', 'Friend Debt Service'],
  S8: ['سجل المديونية ومصادر التسوية', 'Debt History & Settlement Sources'],
};
const requests = data.stories
  .filter((s) => newIds[s.key])
  .map((s) => ({
    tool: 'ZohoSprints_UpdateItem',
    args: {
      headers: { 'X-convert-response': 'true', 'x-za-ui-version': 'v2' },
      path_variables: {
        teamId: '767679505',
        projectId: '120216000000593007',
        sprintId: '120216000004656294',
        itemId: newIds[s.key],
      },
      query_params: {
        name: s.name,
        description: s.desc,
        epicid: '120216000004657001',
        projitemtypeid: '120216000000593045',
        projpriorityid: s.priority,
        newusers: JSON.stringify(['120216000000359035']),
        startdate: '2026-10-31T21:00:00+0000',
        enddate: '2026-11-15T20:59:59+0000',
        point: 1,
        statusid: '120216000000003629',
        duration: '11d',
        UDF_CHAR5: 'Nidhal',
        UDF_CHAR3: names[s.key][0],
        UDF_CHAR4: names[s.key][1],
      },
    },
  }));
fs.writeFileSync('reports/update-new-stories.json', JSON.stringify(requests, null, 2));
console.log(JSON.stringify(requests.map((r) => ({
  id: r.args.path_variables.itemId,
  name: r.args.query_params.name,
  udf3: r.args.query_params.UDF_CHAR3,
  udf4: r.args.query_params.UDF_CHAR4,
  priority: r.args.query_params.projpriorityid,
})), null, 2));
