import fs from "node:fs";

const tokenFile = "C:/Users/ykbadmin/.mcp-auth/mcp-remote-v1/954170729d402b122025e6c53858fbea_tokens.json";
const token = JSON.parse(fs.readFileSync(tokenFile, "utf8")).access_token;
const payloads = JSON.parse(fs.readFileSync("reports/Invoicing-MService/2026-10-29/merge-description-payloads.json", "utf8"));

const teamId = "767679505";
const projectId = "120216000000593007";
const sprintId = "120216000004656294";
const results = [];

for (const p of payloads) {
  const base = `https://sprintsapi.zoho.com/zsapi/team/${teamId}/projects/${projectId}/sprints/${sprintId}/item/${p.itemId}/`;
  const post = await fetch(base, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ description: p.description }),
  });
  const postText = await post.text();

  const get = await fetch(`${base}?action=details`, {
    headers: { Authorization: `Zoho-oauthtoken ${token}` },
  });
  const data = await get.json();
  const item = data.itemJObj?.[p.itemId];
  const idx = data.item_prop?.description;
  const live = Array.isArray(item) && typeof idx === "number" ? item[idx] : "";
  const sep = "##+=================================================##";
  results.push({
    no: p.no,
    itemId: p.itemId,
    postStatus: post.status,
    postBody: postText.slice(0, 300),
    getStatus: get.status,
    liveLength: live.length,
    separator: live.includes(sep),
    oldPreserved: live.startsWith(p.description.split(sep)[0].trimEnd()),
  });
  console.log(p.no, post.status, live.length, live.includes(sep));
}

fs.writeFileSync("reports/Invoicing-MService/2026-10-29/merge-descriptions.out.json", JSON.stringify(results, null, 2), "utf8");
