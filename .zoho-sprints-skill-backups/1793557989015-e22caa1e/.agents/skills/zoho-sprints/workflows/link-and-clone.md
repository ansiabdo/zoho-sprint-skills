# Workflow: Link, clone, and split at sprint close

Use [read coverage](../checks/read-coverage.md), [write verification](../checks/write-verification.md), and the live `LinkItems`, `DelinkItem`, `GetLinkedItems`, `CreateItem`, `CreateSubItem`, `MoveItem`, and `CompleteSprint` tools.

## 1. Decide the relationship

Read both items and state the relationship in business terms before calling a tool:

| Relationship | Use when | Direction to record |
|---|---|---|
| Parent / child | A Story contains a deliverable Task or Bug | Parent → child |
| Blocks / is blocked by | One item cannot be accepted until another is done | Blocker → blocked |
| Relates to | Shared scope, dependency or decision, but neither blocks the other | Symmetric note |
| Duplicate | Same outcome and acceptance criteria | Duplicate → canonical |
| Clone / part of | Work was copied or split to continue in another sprint/release | Original ↔ continuation |

Do not link merely because two items mention the same module. Do not create a duplicate link if one already exists. `GetLinkedItems` may return an internal error on a project with no links; record `unknown_coverage`, do not assume “no links”.

## 2. Resolve link types

`LinkItems` needs a real `linktypeid`. Resolve it from the project's existing relationships or the Zoho link-type configuration. Do not invent an ID or reuse an ID from another workspace. If the link type cannot be resolved, keep the link proposed and report the missing mapping.

A safe sequence:

1. Read both items and their project/sprint IDs.
2. Read existing links on at least one item. If the read fails, pause.
3. Map the business relationship to a real link type.
4. Link one pair, read back, then continue.
5. Record both item IDs, link type ID, direction and read-back result.

## 3. Clone or split

Before cloning, search the target sprint/backlog for an existing continuation with the same scope. If found, link/reuse it; do not create a twin.

When splitting:

- Keep the original item's completed scope and evidence.
- Create the continuation in the correct sprint/backlog with the same epic, release, requester, tester, analysis team and acceptance structure.
- Do not copy a “Done” status into the continuation; set the real status.
- Preserve traceability to the source item and BMAD/Git evidence.
- Link original ↔ continuation.
- If a child is cloned, verify the parent Story is valid in the target sprint.

## 3.5 Consolidate micro-stories

When several small Stories describe parts of one outcome:

1. Choose one survivor with the clearest user value; keep its item ID.
2. Merge scope and acceptance criteria into the survivor; never concatenate titles.
3. Re-estimate the consolidated scope with the analog method and record the references.
4. Prefix each absorbed Story `[Merged into SNA-<survivor>] <original title>` in `itemName`, `UDF_CHAR3`, and `UDF_CHAR4`.
5. Move absorbed Stories to Backlog; do not delete them and do not mark them Done.
6. Read back the survivor, every absorbed Story, the source sprint and the backlog. Confirm the source sprint has only the survivors.
7. Link absorbed → survivor when a real duplicate/relates link type is resolvable. If not, record `unknown_coverage` and rely on the name marker plus the execution report.

`Part n` is for a continuation that keeps its own scope. `[Merged into ...]` is for absorbed scope; do not mix the two conventions.

## 4. `Part n` naming at sprint close

When an unfinished or cloned item continues into another sprint, prefix the **item title**, **Story Arabic Name**, and **Story English Name** with `Part n - `:

- First continuation / original that is being carried: `Part 1 - <name>`
- Next continuation: `Part 2 - <name>`
- If the name already starts with `Part k - `, replace it with `Part k+1 - `; do not stack prefixes.
- Arabic name: `Part 1 - <الاسم العربي>` by default, to match the user's requested literal prefix. If the project has an Arabic-only convention, use `الجزء 1 - <الاسم>` and record the convention.
- Do not prefix a fully completed item that is not being cloned or carried.
- Keep the prefix out of the epic/release names.

Update all three name fields in the same authorized operation when the tool allows it, then read back the title, `UDF_CHAR3` and `UDF_CHAR4`. If a field is not writable, record `unsupported_write`; do not claim the rename is complete.

## 5. Sprint close

Before `CompleteSprint`:

1. Page every item and child.
2. Classify each unfinished item: complete now, carry to next sprint, split, or cancel with a reason.
3. Get explicit authorization for the disposition. Do not silently move or close unfinished work.
4. Apply `Part n` naming and links to every carried/cloned item.
5. Complete the sprint only after the disposition is recorded.
6. Read back the sprint status and each moved item's sprint/parent/assignee.

A sprint close is not a status reset. Do not mark items Done because the sprint closed.
