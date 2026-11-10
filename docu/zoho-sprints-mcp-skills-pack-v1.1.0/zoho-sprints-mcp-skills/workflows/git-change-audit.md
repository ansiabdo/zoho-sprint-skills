# Git Local Change Audit → Zoho Sprints

## Purpose
Analyze local repository changes, map meaningful work to existing Zoho Sprints User Stories, create only missing and justified work items, and persist an auditable checkpoint so repeat runs process only newly observed changes.

## Safety rules
- Start in **audit/dry-run mode**. Do not create or update Zoho items until the proposed mapping and actions are shown and the user authorizes write actions, unless the user has explicitly pre-authorized this workflow.
- Never commit, reset, checkout, stash, amend, push, or otherwise mutate the developer's Git repository.
- Never read or print secrets. Exclude `.env*`, credentials, certificates, private keys, tokens, generated files, dependency folders, build outputs, and binary files from content inspection. File paths and change metadata may still be recorded where safe.
- Do not infer that a change was authored by the current user merely because it exists locally. Record author/commit evidence when available and mark uncertain attribution.
- If a Git or Zoho operation is unavailable, say so. Never fabricate tool names, item IDs, sprint status, or successful writes.

## Run sequence
1. Identify repository root, current branch, HEAD SHA, working-tree state, staged and unstaged changes, untracked files, and recent commits since the last successful checkpoint.
2. Read the local audit state before inspecting deltas. Validate schema, repository identity, branch/commit checkpoint, and outstanding pending actions.
3. If the state file is absent or invalid, perform a clearly labeled **baseline run**. Do not silently claim that prior history has been audited. Ask whether to process current working-tree changes and a chosen commit range, or initialize the baseline without creating items.
4. Determine the delta:
   - Commits after the last successful commit SHA on the same history, if the ancestor relationship is valid.
   - Current staged, unstaged, and untracked changes.
   - If branch changed or history diverged, do not use a simple `HEAD~N` assumption. Compare known checkpoint ancestry and ask for a base ref or produce a review-only report.
5. Read relevant code diffs and surrounding code. Summarize behavior change, likely purpose, impacted modules/APIs/data/UI/tests, risk, and evidence. Exclude generated noise and secrets.
6. Fetch current user's permitted Zoho work, relevant existing User Stories, child items, and all candidate sprints. Filter eligible sprints using the exact inclusive rule `start_datetime <= now <= end_datetime`, with project timezone/Zoho timezone established explicitly. A sprint marked “active” is not eligible if its dates do not contain the current instant; date-valid sprint status and date window must both be checked where the API provides both.
7. Map changes to existing stories using title, description, acceptance criteria, module, API/entity names, related files, linked issues, and existing child tasks. Use evidence-based confidence: high / medium / low. Do not create a task from a weak match without review.
8. Check for duplicates in Zoho **and** the local ledger before proposing any item. Compare normalized title, semantic purpose, story parent, module, commit/change fingerprint, and existing status. Similar wording is not proof of a duplicate; inspect intent.
9. Produce a review table containing change evidence, candidate story, match rationale/confidence, proposed task, duplicate check, sprint eligibility, and action (reuse / add child task / add bug / propose story / no action).
10. For changes already covered by a story:
    - Add a detailed child Task or Bug under that story only if the current user is assigned to that story and Zoho permissions/tools permit it.
    - Do not create a duplicate child item if an equivalent item already exists, including a closed/completed item that records the same work.
11. For uncovered work:
    - Decide whether it merits a User Story. A new story is justified only when it represents user/business value and is independently testable; refactoring, implementation steps, and technical sub-work normally belong under an existing story or a properly scoped technical story when policy allows.
    - Search all accessible stories for duplicates before creation.
    - Create a new User Story only in an eligible sprint whose start/end date window contains the current instant, and only if the current role and Zoho permissions allow it.
    - If no eligible sprint exists, do not create the story in a future, expired, or date-ineligible sprint. Report it as pending.
12. If the workflow has no pre-authorization to write, stop after presenting the plan and request confirmation.
13. Apply approved changes one at a time. Capture the returned Zoho item IDs and verify each created item by reading it back where possible.
14. Update the local ledger only after the corresponding Zoho result is confirmed. Record failed, unknown, or interrupted writes as `pending_verification`; never mark them as successfully created.
15. Save the final report and checkpoint atomically where possible. Advance the commit checkpoint only after all deltas have been accounted for and the run status is explicit. If any changes remain unresolved, preserve a pending queue and do not advance past them.

## Detailed task writing
Each task should include:
- Action-oriented title with a clear object.
- Context / reason grounded in the diff.
- Exact expected implementation or investigation.
- Acceptance criteria that are observable and testable.
- Relevant files/modules/endpoints/entities when known.
- Test expectations (unit/integration/UI/regression) based on the change.
- Dependencies and risks, if evidenced.
- Traceability to commit SHA(s) or change fingerprint.
Do not invent requirements, business rules, API behavior, or acceptance criteria that cannot be supported by code, story details, or user confirmation. Mark assumptions explicitly.

## Required artifacts
Maintain these repository-local artifacts (default paths; configurable):
- `.zoho-sprints/audit-state.json`: checkpoint and run metadata.
- `.zoho-sprints/change-ledger.jsonl`: one JSON record per observed change group and per Zoho item action.
- `.zoho-sprints/reports/<timestamp>-git-zoho-audit.md`: human-readable analysis and mapping.
- `.zoho-sprints/pending-actions.json`: actions not yet verified or awaiting approval.
- `.zoho-sprints/config.yaml`: project/workspace mapping and timezone preferences, with no credentials.

## Repeat-run / idempotency rules
- First read state and pending actions; report each item's Zoho status before doing new analysis.
- Process only changes not already covered by a successful ledger record, while still checking whether a prior Zoho item remains open/closed/changed.
- If a prior action is `pending_verification`, query Zoho for the candidate item before retrying a create call. Never blindly retry a non-idempotent create.
- A ledger match is not enough if the underlying Zoho item has been deleted or cannot be found; report discrepancy and request policy-based recovery.
- Record exact checkpoint SHA and working-tree fingerprint separately. Commit SHA alone does not represent uncommitted changes.
- A fingerprint is an idempotency aid, not proof that two semantically similar changes are identical.
- Keep an append-only audit trail; do not silently rewrite historical entries. Corrections should be new events.

## Completion report
Summarize: analyzed range, files/change groups, mapped stories, tasks reused/created, stories proposed/created, duplicates skipped, changes excluded, errors, pending actions, checkpoint before/after, and exact Zoho IDs confirmed.
