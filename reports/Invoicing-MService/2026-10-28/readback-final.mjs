import fs from "node:fs";

const tokenFile = "C:/Users/ykbadmin/.mcp-auth/mcp-remote-v1/954170729d402b122025e6c53858fbea_tokens.json";
const { access_token } = JSON.parse(fs.readFileSync(tokenFile, "utf8"));
const calls = JSON.parse(fs.readFileSync("reports/Invoicing-MService/2026-10-28/description-updates.json", "utf8"));
const before = JSON.parse(fs.readFileSync("reports/Invoicing-MService/2026-10-28/open-story-details.out.json", "utf8"));
const oldById = new Map();
for (const c of before) {
  const it = c?.data?.items?.[0];
  if (it) oldById.set(it.itemId, it.description || "");
}

const rows = [];
for (const call of calls) {
  const p = call.args.path_variables;
  const url = `https://sprintsapi.zoho.com/zsapi/team/${p.teamId}/projects/${p.projectId}/sprints/${p.sprintId}/item/${p.itemId}/?action=details`;
  const res = await fetch(url, { headers: { Authorization: `Zoho-oauthtoken ${access_token}` } });
  const json = await res.json();
  const item = json.itemJObj?.[json.itemIds?.[0]] || [];
  const prop = json.item_prop || {};
  const get = (k) => item[prop[k]];
  const desc = get("description") || "";
  const old = oldById.get(p.itemId) || "";
  rows.push({
    itemId: p.itemId,
    itemNo: get("itemNo"),
    status: res.status,
    name: get("itemName"),
    ownerId: get("ownerId"),
    analysis: get("UDF_MULTIUSERPKL1"),
    radio: get("UDF_RADIO1"),
    udf3: get("UDF_CHAR3"),
    udf4: get("UDF_CHAR4"),
    udf5: get("UDF_CHAR5"),
    descLength: desc.length,
    hasSeparator: desc.includes("##+=================================================##"),
    oldPreserved: old ? desc.startsWith(old) : true,
    apiStatus: json.status,
  });
  console.log(get("itemNo"), p.itemId, "owner", get("ownerId"), "analysis", get("UDF_MULTIUSERPKL1"), "radio", get("UDF_RADIO1"), "sep", desc.includes("##+=================================================##"), "old", old ? desc.startsWith(old) : true);
}
fs.writeFileSync("reports/Invoicing-MService/2026-10-28/readback-final.json", JSON.stringify(rows, null, 2), "utf8");
console.log("rows", rows.length);
