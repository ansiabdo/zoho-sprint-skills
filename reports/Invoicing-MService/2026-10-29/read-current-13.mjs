import fs from "node:fs";

const tokenFile = "C:/Users/ykbadmin/.mcp-auth/mcp-remote-v1/954170729d402b122025e6c53858fbea_tokens.json";
const token = JSON.parse(fs.readFileSync(tokenFile, "utf8")).access_token;
const teamId = "767679505";
const projectId = "120216000000593007";
const sprint10 = "120216000004656294";
const backlog = "120216000000593009";

const items = [
  ["122", "120216000004656142", backlog],
  ["123", "120216000004657003", backlog],
  ["124", "120216000004656296", backlog],
  ["125", "120216000004655019", backlog],
  ["127", "120216000004655023", backlog],
  ["126", "120216000004656300", sprint10],
  ["128", "120216000004656304", sprint10],
  ["129", "120216000004655029", sprint10],
  ["130", "120216000004657007", sprint10],
  ["131", "120216000004655033", sprint10],
  ["132", "120216000004657094", sprint10],
  ["133", "120216000004656360", sprint10],
  ["134", "120216000004655091", sprint10],
];

const out = [];
for (const [no, id, sprintId] of items) {
  const url = `https://sprintsapi.zoho.com/zsapi/team/${teamId}/projects/${projectId}/sprints/${sprintId}/item/${id}/?action=details`;
  const res = await fetch(url, { headers: { Authorization: `Zoho-oauthtoken ${token}` } });
  const json = await res.json();
  const item = json.itemJObj?.[json.itemIds?.[0]];
  if (!item) {
    out.push({ no, id, error: json });
    continue;
  }
  out.push({
    no,
    id,
    sprintId,
    name: item.itemName,
    points: item.points,
    status: item.statusName,
    ownerId: item.ownerId,
    priority: item.priorityName,
    radio: item.UDF_RADIO1,
    udf3: item.UDF_CHAR3,
    udf4: item.UDF_CHAR4,
    udf5: item.UDF_CHAR5,
    descLength: (item[json.item_prop.description] || "").length,
  });
}
fs.writeFileSync("reports/Invoicing-MService/2026-10-29/current-13.json", JSON.stringify(out, null, 2), "utf8");
console.table(out.map(({ no, points, ownerId, status, radio, descLength }) => ({ no, points, ownerId: ownerId?.join(","), status, radio, descLength })));
