---
name: zoho-workflow
description: Orchestrate a multi-stage Zoho Sprints project workflow in a BMAD-like way, choose the relevant Zoho skill from current evidence, track progress, and recommend the next actionable step. Use for end-to-end planning, reconciliation, sprint preparation, or requests asking what to do next; use a specialist skill directly for a single focused operation.
---

# Zoho Workflow

Coordinate the existing Zoho skills. This skill chooses the next action; it does not grant access to Zoho or replace the specialist skill's rules. For any Zoho read or write, load `zoho-sprints` and follow its role, coverage, authorization and read-back requirements. A recommendation alone never authorizes a write.

## Start from the actual request

1. Identify the project and desired outcome. Determine whether it is a new project, an existing project, or a focused operation within either. Resolve live project and user context through `zoho-sprints` when Zoho data is needed.
2. Inspect the relevant current evidence: project knowledge, Zoho state, approved requirements or BMAD artifacts, Git state, and prior audit ledger. Use only sources that actually exist and are identified for this project. Do not require a complete knowledge base or BMAD artifact when the requested action can be done safely without one.
3. Choose the smallest useful stage and specialist below. Complete work already authorized by the request. Re-evaluate after each meaningful result; stages can be skipped, repeated, or revisited when evidence changes.

| Current need | Specialist and outcome |
|---|---|
| Learn the project's conventions or establish a project baseline | `zoho-project-knowledge`: scoped knowledge with sources and coverage |
| Check connection, browse, manage sprint/project/item, or reconcile Git/approved BMAD with Zoho | `zoho-sprints`: verified state, audit, or item result |
| Turn a requirement or audit gap into a reviewable Story | `user-story-authoring`: draft and acceptance criteria |
| Create or update a Story, Task or Bug in Zoho | `zoho-sprints`: duplicate check, authorized write, read-back |
| Organize dependencies, parent/child items, duplicates, or carry-over | `zoho-work-item-linking`: verified relationships and disposition |
| Plan or verify a deployable release | `zoho-release-management`: version, associations, stage and evidence |

For an existing codebase, a common path is project knowledge → Git/approved BMAD reconciliation → Story review → authorized Zoho changes → delivery evidence → carry-over or release preparation. For a new project, start with the available requirements and Zoho context, draft Stories, then create and organize items if authorized. These are examples, not mandatory gates. Run the Git or BMAD route only when its source exists and is applicable.

## Decide the next step

After each stage, choose one primary recommendation from the current result:

- Missing identity, role, project mapping, required field, or source decision: resolve that exact input before the dependent write.
- Incomplete Zoho coverage, likely duplicate, ambiguous create, or conflicting evidence: reconcile or verify first; do not recommend another create or a retry.
- Draft is incomplete: finish the missing requirement or acceptance criterion.
- Draft is complete and a Zoho write is in scope: perform the authorized write with `zoho-sprints`; otherwise present the exact proposed change for a decision.
- Write succeeded: read back before proposing a dependent link, status change, sprint closure, or release step.
- Work is verified and no stage remains in the user's scope: state that the workflow is complete. Suggest a related optional follow-up only if it has a concrete benefit.

The next step must name the **action**, **skill**, **reason grounded in evidence**, and **prerequisite or blocker**. Recommend one action first; add an alternative only when there is a real choice. Never describe a proposed step as completed. Do not force a handoff back to this skill between every specialist action.

## Progress and handoff

For a multi-stage request, maintain a concise status in the response: goal, current stage, completed outputs with source or Zoho IDs, unresolved decisions, and next step. If the work spans sessions and the user wants a local handoff, write a project-scoped `.zoho-sprints/WORKFLOW_STATUS.md` with those facts, last verification time, and source pointers. Treat that file as a checkpoint, not proof of current Zoho state; refresh live state before dependent changes.

End every substantial result with:

> **الخطوة التالية الموصى بها:** `<action>` باستخدام `<skill>` — `<evidence-based reason>`. **الشرط:** `<prerequisite>` أو `لا يوجد`.

If the current request is finished and no useful follow-up exists, say `لا توجد خطوة لازمة الآن`. A specialist skill may use the same compact handoff without loading this orchestration skill for a focused task.
