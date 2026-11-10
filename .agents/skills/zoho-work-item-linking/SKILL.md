---
name: zoho-work-item-linking
description: Link, delink, clone and split Zoho Sprints work items with the correct relationship, and apply Part n naming when unfinished or cloned work continues at sprint close. Use for dependency mapping, parent/child structure, duplicate canonicalisation, or sprint carry-over.
---

# Zoho Work-Item Linking

Use this skill for relationships between Stories, Tasks and Bugs. Load `zoho-sprints` for permissions, read coverage and write verification.

## Choose the relationship

| Relationship | Meaning | Example |
|---|---|---|
| Parent / child | One item contains the other | Story → Task |
| Blocks / is blocked by | One cannot be accepted before the other | API task blocks mobile screen |
| Relates to | Shared scope or decision, no blocking | Two admin screens sharing a permission |
| Duplicate | Same outcome and acceptance | Two BMAD sections imported twice |
| Clone / part of | Copied or split to continue | Sprint carry-over, phase 2 |

Do not link items merely because they share a module or assignee. Do not create a duplicate link if one already exists.

## Before linking

1. Read both items and confirm project/sprint, type, parent, status and scope.
2. Read existing links. If the read fails, record `unknown_coverage`; do not assume there are none.
3. Resolve a real `linktypeid` from the project's link configuration. Never invent an ID or reuse one from another workspace.
4. Link one pair, read back, then continue.
5. Record both item IDs, direction, link type and result.

## Clone or split

- Search the target sprint/backlog for an existing continuation first.
- Preserve epic, release, requester, tester, analysis team, acceptance structure and traceability.
- Do not copy `Done` into the continuation; set its real status.
- Link original ↔ continuation.
- If a child is cloned, verify the parent Story exists in the target sprint.

## Consolidate micro-stories

When several small Stories describe parts of one outcome:

1. Choose one **survivor** that best represents the user value; keep its item ID.
2. Merge scope and acceptance criteria into the survivor; do not concatenate titles.
3. Set the survivor's points from the consolidated scope, using the analog method.
4. Rename each absorbed Story `[Merged into SNA-<survivor>] <original title>`, and apply the same prefix to `UDF_CHAR3` and `UDF_CHAR4`.
5. Move absorbed Stories out of the active sprint to Backlog; do not delete them or mark them Done.
6. Read back the survivor and every absorbed Story: name, points, assignee, sprint, status.
7. If the platform supports a duplicate/relates link, link absorbed → survivor; if link discovery fails, record `unknown_coverage` and rely on the name marker plus the merge report.

Do not use `Part n` for a merge. `Part n` is for a continuation that keeps its own scope; `[Merged into ...]` is for absorbed scope.

## `Part n` naming

When an unfinished or cloned item continues into another sprint, prefix:

- item title → `Part 1 - <title>`
- Story Arabic Name (`UDF_CHAR3`) → `Part 1 - <الاسم العربي>`
- Story English Name (`UDF_CHAR4`) → `Part 1 - <English name>`

Rules:

- First continuation or original being carried: `Part 1`.
- Next continuation: `Part 2`.
- If the name already starts with `Part k - `, replace with `Part k+1 - `; do not stack.
- Do not prefix a fully completed item that is not being carried.
- Keep epic/release names unchanged.
- Read back all three fields. If one is not writable, record `unsupported_write`.

## Sprint close

Before completing a sprint:

1. Page every item and child.
2. Classify unfinished work: complete, carry, split, or cancel with reason.
3. Get authorization for the disposition; never silently move or close.
4. Apply `Part n` and links to every carried/cloned item.
5. Complete the sprint.
6. Read back sprint status and each moved item's sprint/parent/assignee.

Closing a sprint is not a status reset; do not mark items Done because the sprint closed.

## References

- [Admin management](../zoho-sprints/workflows/admin-management.md)
- [Write verification](../zoho-sprints/checks/write-verification.md)

For a multi-stage workflow, add one evidence-based next action using the `zoho-workflow` handoff format. After verified carry-over, recommend sprint completion only when every item has a disposition and the requested authorization covers it. After a relationship change, recommend release planning only when the linked work belongs to a deployable release; otherwise state the remaining concrete gap or completion.
