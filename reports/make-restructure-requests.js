const fs = require('fs');
const d = JSON.parse(fs.readFileSync('reports/restructure-data.json', 'utf8'));
const h = d.headers;

const epicSprint = [
  {
    tool: "ZohoSprints_UpdateEpic",
    args: {
      headers: h,
      path_variables: { teamId: d.teamId, projectId: d.projectId, epicId: d.epicId },
      body: { name: d.epicName, desc: d.epicDesc, owner: "120216000000359035", color: "#0064ca" }
    }
  },
  {
    tool: "ZohoSprints_UpdateSprint",
    args: {
      headers: h,
      path_variables: { teamId: d.teamId, projectId: d.projectId, sprintId: d.sprintId },
      query_params: { name: d.sprintName, description: d.sprintDesc }
    }
  }
];

const updates = d.stories.filter(s => s.update).map(s => ({
  tool: "ZohoSprints_UpdateItem",
  args: {
    headers: h,
    path_variables: { teamId: d.teamId, projectId: d.projectId, sprintId: d.sprintId, itemId: s.id },
    query_params: {
      name: s.name,
      description: s.desc,
      epicid: d.epicId,
      projitemtypeid: d.storyType,
      projpriorityid: s.priority
    }
  }
}));

const creates = d.stories.filter(s => !s.update).map(s => ({
  tool: "ZohoSprints_CreateItem",
  args: {
    headers: h,
    path_variables: { teamId: d.teamId, projectId: d.projectId, sprintId: d.sprintId },
    query_params: {
      name: s.name,
      description: s.desc,
      projitemtypeid: d.storyType,
      projpriorityid: s.priority,
      epicid: d.epicId
    }
  }
}));

const moveIds = [
  ["S2-old-identity", "120216000004657003"],
  ["S3-old-migration", "120216000004656296"],
  ["S4-old-ledger", "120216000004655019"],
  ["S7-old-disputes", "120216000004655023"]
];
const moves = moveIds.map(([label, id]) => ({
  label,
  tool: "ZohoSprints_MoveItem",
  args: {
    headers: h,
    path_variables: { teamId: d.teamId, projectId: d.projectId, sprintId: d.sprintId },
    query_params: { action: "moveitem", itemidarr: id, tosprintid: d.backlogId, toprojectid: d.projectId }
  }
}));

const link122 = [{
  tool: "ZohoSprints_UpdateItem",
  args: {
    headers: h,
    path_variables: { teamId: d.teamId, projectId: d.projectId, sprintId: d.backlogId, itemId: "120216000004656142" },
    query_params: { epicid: d.epicId }
  }
}];

fs.writeFileSync('reports/restructure-epic-sprint.json', JSON.stringify(epicSprint, null, 2), 'utf8');
fs.writeFileSync('reports/restructure-updates.json', JSON.stringify(updates, null, 2), 'utf8');
fs.writeFileSync('reports/restructure-creates.json', JSON.stringify(creates, null, 2), 'utf8');
fs.writeFileSync('reports/restructure-moves.json', JSON.stringify(moves, null, 2), 'utf8');
fs.writeFileSync('reports/restructure-link-122.json', JSON.stringify(link122, null, 2), 'utf8');

console.log(JSON.stringify({
  epicSprint: epicSprint.length,
  updates: updates.map(x => x.args.path_variables.itemId),
  creates: creates.map(x => x.args.query_params.name),
  moves: moves.map(x => x.label),
  link122: 1
}, null, 2));
