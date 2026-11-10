import fs from "node:fs";

const active = "120216000004192758";
const backlog = "120216000004162608";
const items = [
  ["116", "120216000004558543", active],
  ["117", "120216000004558544", active],
  ["118", "120216000004558545", active],
  ["119", "120216000004558546", active],
  ["120", "120216000004558547", active],
  ["121", "120216000004558548", active],
  ["122", "120216000004558549", active],
  ["123", "120216000004558550", backlog],
  ["124", "120216000004558551", backlog],
  ["125", "120216000004558552", backlog],
  ["126", "120216000004558553", backlog],
  ["127", "120216000004558554", backlog],
  ["128", "120216000004558555", backlog],
  ["129", "120216000004558556", backlog],
  ["130", "120216000004558557", backlog],
  ["131", "120216000004558558", backlog],
  ["132", "120216000004558559", backlog],
  ["133", "120216000004558560", backlog],
  ["141", "120216000004650013", active],
  ["142", "120216000004650023", active],
  ["53", "120216000004260019", backlog]
];
const calls = items.map(([no, itemId, sprintId]) => ({
  tool: "ZohoSprints_GetItemDetails",
  args: {
    headers: { "x-za-ui-version": "v2", "X-convert-response": "true" },
    path_variables: { teamId: "767679505", projectId: "120216000004162606", sprintId, itemId },
    query_params: { action: "details" }
  },
  _no: no
}));
fs.writeFileSync("reports/WorldCup-New/2026-10-28/route-readback.json", JSON.stringify(calls.map(({ _no, ...c }) => c), null, 2));
fs.writeFileSync("reports/WorldCup-New/2026-10-28/route-readback-map.json", JSON.stringify(items, null, 2));
console.log(calls.length);
