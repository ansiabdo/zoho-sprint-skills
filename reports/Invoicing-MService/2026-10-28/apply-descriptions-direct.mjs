import fs from "node:fs";

const tokenFile = "C:/Users/ykbadmin/.mcp-auth/mcp-remote-v1/954170729d402b122025e6c53858fbea_tokens.json";
const { access_token } = JSON.parse(fs.readFileSync(tokenFile, "utf8"));
const calls = JSON.parse(fs.readFileSync("reports/Invoicing-MService/2026-10-28/description-updates.json", "utf8"));
const results = [];

for (const call of calls) {
  const p = call.args.path_variables;
  const url = `https://sprintsapi.zoho.com/zsapi/team/${p.teamId}/projects/${p.projectId}/sprints/${p.sprintId}/item/${p.itemId}/`;
  const description = call.args.query_params.description;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${access_token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ description }),
  });
  const text = await res.text();
  let body;
  try { body = JSON.parse(text); } catch { body = text.slice(0, 500); }
  results.push({ itemId: p.itemId, sprintId: p.sprintId, status: res.status, ok: res.ok, body });
  console.log(p.itemId, res.status, typeof body === "object" ? body.status || body.message : body);
}

fs.writeFileSync("reports/Invoicing-MService/2026-10-28/description-direct.out.json", JSON.stringify(results, null, 2), "utf8");
console.log("done", results.length, "failed", results.filter((r) => !r.ok).length);
