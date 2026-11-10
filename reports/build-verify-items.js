const fs = require('fs');
const sprint = '120216000004656294';
const ids = [
  ['S1', '120216000004655029'],
  ['S2', '120216000004657094'],
  ['S3', '120216000004655033'],
  ['S4', '120216000004656304'],
  ['S5', '120216000004656360'],
  ['S6', '120216000004657007'],
  ['S7', '120216000004656300'],
  ['S8', '120216000004655091'],
];
const out = ids.map(([key, itemId]) => ({
  tool: 'ZohoSprints_GetItemDetails',
  args: {
    headers: { 'X-convert-response': 'true', 'x-za-ui-version': 'v2' },
    path_variables: {
      teamId: '767679505',
      projectId: '120216000000593007',
      sprintId: sprint,
      itemId,
    },
    query_params: { action: 'details' },
  },
}));
out.push({
  tool: 'ZohoSprints_GetItems',
  args: {
    headers: { 'X-convert-response': 'true', 'x-za-ui-version': 'v2' },
    path_variables: {
      teamId: '767679505',
      projectId: '120216000000593007',
      sprintId: '120216000000593009',
    },
    query_params: { action: 'data', index: 1, range: 250, subitem: true },
  },
});
fs.writeFileSync('reports/verify-items.json', JSON.stringify(out, null, 2));
console.log('wrote', out.length, 'calls');
