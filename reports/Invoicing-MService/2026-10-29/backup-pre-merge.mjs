import fs from "node:fs";

const tokenFile = "C:/Users/ykbadmin/.mcp-auth/mcp-remote-v1/954170729d402b122025e6c53858fbea_tokens.json";
const token = JSON.parse(fs.readFileSync(tokenFile, "utf8")).access_token;
const teamId = "767679505";
const projectId = "120216000000593007";
const sprintId = "120216000004656294";

const targets = {
  "129": "120216000004655029",
  "131": "120216000004655033",
  "126": "120216000004656300",
};

async function getDetails(itemId, sId) {
  const url = `https://sprintsapi.zoho.com/zsapi/team/${teamId}/projects/${projectId}/sprints/${sId}/item/${itemId}/?action=details`;
  const res = await fetch(url, { headers: { Authorization: `Zoho-oauthtoken ${token}` } });
  const json = await res.json();
  const item = json.itemJObj[json.itemIds[0]];
  return {
    itemId,
    itemNo: item.itemNo,
    itemName: item.itemName,
    description: item[json.item_prop.description] || "",
    points: item.points,
    statusId: item.statusId,
    priorityId: item.projPriorityId,
    ownerId: item.ownerId,
    udf3: item.UDF_CHAR3,
    udf4: item.UDF_CHAR4,
    udf5: item.UDF_CHAR5,
  };
}

const out = {};
for (const [no, id] of Object.entries(targets)) {
  out[no] = await getDetails(id, sprintId);
}
fs.writeFileSync("reports/Invoicing-MService/2026-10-29/pre-merge-backup.json", JSON.stringify(out, null, 2), "utf8");
console.log(JSON.stringify(out, null, 2));
