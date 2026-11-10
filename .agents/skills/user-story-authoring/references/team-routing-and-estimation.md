# Team routing, sizing, and description format

## Assignee routing

Read the project's **Current Project Team** before proposing an assignee.

| Team field | Story destination |
|---|---|
| Analyst | Analysis team `UDF_MULTIUSERPKL1` — not Assignee |
| Analyst Backup | Analysis team only if main unavailable / explicitly requested |
| Main Mobile App Developer | Assignee when the Story has a mobile surface |
| Main Back End Developers | Assignee when the Story has API/DB/sync/job/provider/auth/cache/migration work |
| Main Web Developer | Assignee when the Story has web/admin/third-party portal UI |
| Developer backups | Not default assignees |

If a Story spans mobile + web/admin + backend, assign every main owner. If it is backend-only, assign only the backend owner. Preserve existing assignees unless replacement is authorized. Add Analyst to Analysis team even when not an assignee.

For the World Cup field map, read [Zoho fields and sprint rules](zoho-fields-and-sprints.md#project-team-routing). Revalidate all IDs and team members from current Zoho project details.

## Estimation by analogy

Use the project's Fibonacci scale. Do not use 0 for a real Story.

1. Pick the 3 closest completed Stories in the same project by actor, surface, AC count, data/permission complexity, integration risk and uncertainty.
2. Take their median points.
3. Adjust one Fibonacci step per material difference, maximum ±2 steps.
4. Record analog IDs, median, adjustment, final points and confidence.

If there is no project history, use another project only as a labeled reference and ask for confirmation.

## Priority

- **High**: critical journey, revenue/security/regulatory risk, release blocker, or blocks another team.
- **Medium**: important with a workaround or later window.
- **Low**: nice-to-have/cosmetic.
- **None**: untriaged; make a decision for a real Story.

Write one sentence of rationale. Do not equate High with large, or Low with small.

## BMAD consolidation

Merge micro-stories only when they share actor, outcome, epic, release and acceptance surface, and each is below 2 points. Keep 3–7 combined AC and every source-section reference. If an epic is one sprint-sized deliverable, make it one Story under the existing epic container. If a “story” is only a technical step, make it a Task. Record the merge rationale.

## Description format

Write structured multi-line text, never one line. Preserve the old description byte-for-byte, then:

```text
##+=================================================##
```

then the new/actual-delivery section. The separator must be exactly as written, on its own line. Never delete the old business explanation. For rich text/HTML, preserve the markup and insert the separator as its own paragraph.

Suggested baseline:

```markdown
## الهدف
...
## المستخدم والقيمة
...
## معايير القبول
1. ...
## التغييرات المطلوبة
- ...
## الاعتماديات
- ...
```

After delivery, use the actual-delivery template with criterion-by-criterion verdicts and evidence.

## Sprint close / Part n

When carrying or cloning unfinished work to another sprint, prefix the title, Arabic name and English name with `Part 1 - `; the next continuation is `Part 2 - `. Replace an existing `Part k` rather than stacking. Link the parts and preserve epic/release/parent. See [zoho-work-item-linking](../../zoho-work-item-linking/SKILL.md).
