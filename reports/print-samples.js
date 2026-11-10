const fs = require('fs');
const a = JSON.parse(fs.readFileSync('F:/zoho sprint skills/reports/samples.json', 'utf8'));
for (const x of a) {
  const it = x.data?.items?.[0];
  console.log('\n### ' + (it?.itemNo || '?') + ' ' + x.tool + ' ok=' + x.ok + ' isError=' + x.isError);
  if (!it) continue;
  for (const k of ['itemName','description','UDF_CHAR3','UDF_CHAR4','UDF_CHAR5','UDF_CHAR6','UDF_CHAR7','UDF_CHAR8','UDF_TEXT1','UDF_PKL1','UDF_MULTIUSERPKL1','UDF_DATE1','UDF_RADIO1','UDF_CHKBOX1','UDF_CHKBOX2','statusName','parentItem','epicId','sprintId']) {
    console.log(k + ' = ' + JSON.stringify(it[k]));
  }
}
