# Workflow: Per-project knowledge base

Use one knowledge base per Zoho project. The KB is a working reference, not a second tracker: it records what exists, how the team writes and estimates work, and where the evidence came from. It never replaces Zoho status or acceptance.

## Scope isolation

- Resolve the exact `teamId` and `projectId` first.
- If the project has a local folder and the user wants the KB beside the code, write to `<project>/.zoho-sprints/knowledge/`.
- Otherwise write to `knowledge/projects/<project-slug>-<projectId>/`.
- Never write project A's items into project B's folder. If the same capability appears in both projects, keep two records linked by project ID and note the overlap; do not merge them.
- Do not copy credentials, tokens, full customer data or sensitive diffs into the KB.

## Read coverage

Read, and page fully:

- project details, team fields, layout, item types, statuses, priorities, estimation scale;
- Backlog and every sprint (active, upcoming, completed, canceled);
- all Stories, Tasks, Bugs and sub-items, with details for every Story;
- epics, releases, release stages, comments, links, assignees and followers;
- local Git/BMAD artifacts only when the user identifies them as the project's source.

Record pages, counts, timestamps, blind spots and errors. A partial read is marked `unknown_coverage`; never write “all items” from a partial page.

## File layout

```text
knowledge/projects/<slug>-<id>/
  INDEX.md            # how to use this KB, freshness, coverage
  PROJECT.md          # identity, team, layout, field map, IDs
  BACKLOG.md          # backlog items and placement
  STORIES.md          # Story catalog, patterns, examples
  TASKS-BUGS.md       # child items and defect patterns
  SPRINTS.md          # sprint windows, names, carry-over
  EPICS-RELEASES.md   # epics, releases, stages, associations
  PATTERNS.md         # naming, description, AC, estimation, priority, linking
  GLOSSARY.md         # Arabic/English business terms
  SOURCES.md          # reads, artifacts, evidence, unresolved gaps
```

## What to extract

- Identity: project name/number, IDs, owner, layout, module, item types, statuses, priorities, estimation scale.
- Team: project-details roles and the routing map (Analyst, Main Mobile, Main Back End, Main Web, backups).
- Item catalog: item number, Zoho ID, type, title, Arabic name, English name, status, priority, assignee, epic, release, sprint, points, dates, parent, flags.
- Patterns: title grammar, description structure, acceptance-criteria style, requester/tester conventions, DoR/DoD usage, estimation analogs, priority decisions, link/clone conventions.
- History: sprint naming and windows, carry-over, `Part n` usage, release numbering, mobile version source.
- Gaps: missing fields, conflicting status vs code/BMAD, locked items, ambiguous semantics.

## Learning rules

- Learn the team's actual format from repeated examples; do not invent a “best practice” that contradicts the project's validated pattern.
- Distinguish observed convention from a one-off mistake. A wrong requester (for example a Story title in the requester field) is a defect, not a pattern.
- Preserve the source item ID beside every extracted rule or example.
- When Zoho and BMAD/Git disagree, record both and name the conflict; do not silently choose one.
- Mark assumptions and proposed conventions clearly.

## Maintenance

- Prefer incremental updates over full rewrites.
- Keep a fingerprint (project ID + item ID + updated timestamp/description hash) so unchanged items are not re-summarized.
- Preserve manual notes in a separate `NOTES.md`; never overwrite them during regeneration.
- On each run, update `SOURCES.md` with the read timestamp and coverage, then update only changed sections.
- Read back any Zoho write that the KB claims; a KB statement is not evidence of a write.

## Output

Report the KB path, project ID, pages/items read, counts by type/status, patterns learned, conflicts, gaps, and whether the KB is complete or `unknown_coverage`.
