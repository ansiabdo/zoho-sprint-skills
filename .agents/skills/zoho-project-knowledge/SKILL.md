---
name: zoho-project-knowledge
description: Build and maintain a separate knowledge base for each Zoho Sprints project from its Backlog, Stories, Tasks, Bugs, sprints, epics, releases, team fields and historical patterns. Use when onboarding to a project, learning its conventions, or preparing cross-project work without mixing project data.
---

# Zoho Project Knowledge

Use this skill to turn a project's real Zoho history into a durable reference. It is a learning and traceability layer, not a second tracker and not an authority to write Zoho. Load `zoho-sprints` for reads/writes and follow its role, coverage and write rules.

## One project, one KB

- Resolve the exact `teamId` and `projectId` before reading.
- A KB belongs to exactly one project. Never merge two projects into one file, even when they share a capability, epic name or team member.
- If the same scope appears in two projects, keep two records and note the overlap with both project IDs.
- If the project has a local folder and the user wants the KB beside the code, write under `<project>/.zoho-sprints/knowledge/`. Otherwise use `knowledge/projects/<slug>-<projectId>/`.
- Never place project A's KB inside project B's folder just because the folders are nearby.

## Build sequence

1. Read project details: name, number, owner, team fields, layout, module, item types, statuses, priorities, estimation scale.
2. Read Backlog and every sprint (active, upcoming, completed, canceled). Page fully.
3. Read all Stories, Tasks, Bugs and children. Read details for every Story; comments and links where available.
4. Read epics, releases, release stages and associations.
5. Read local BMAD/Git artifacts only when the user identifies them as this project's source.
6. Extract the item catalog, team routing, naming/description/AC patterns, estimation analogs, priority decisions, sprint cadence and release numbering.
7. Write the KB, then record coverage and gaps.

## Files

Use `INDEX.md`, `PROJECT.md`, `BACKLOG.md`, `STORIES.md`, `TASKS-BUGS.md`, `SPRINTS.md`, `EPICS-RELEASES.md`, `PATTERNS.md`, `GLOSSARY.md`, and `SOURCES.md`. Create only files supported by available evidence; mark missing coverage in `INDEX.md` and `SOURCES.md`.

## Learning rules

- Prefer repeated evidence over one example. A wrong field value is a defect, not a convention.
- Keep the source item ID beside every rule or example.
- Separate observed facts, inferred patterns and proposed improvements.
- Record Zoho vs BMAD/Git conflicts explicitly; do not silently choose one.
- Preserve manual notes in `NOTES.md`; regeneration must not overwrite them.
- Update incrementally with item fingerprints; do not re-summarize unchanged items.
- A KB statement is not proof of a Zoho write. Read back before claiming a change.

## Output

Report the KB path, project ID, pages/items read, counts by type/status, team routing, patterns learned, conflicts, missing coverage and whether the KB is complete or `unknown_coverage`.

For a multi-stage workflow, add one evidence-based next action using the `zoho-workflow` handoff format. Recommend the precise missing read when coverage is incomplete; otherwise route to Git/BMAD reconciliation only when that source applies, or to Story drafting for a new requirement. A single focused KB request need not start a full pipeline.
