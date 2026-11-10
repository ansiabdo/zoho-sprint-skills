# Estimation and priority

Read this before setting Estimation Points or Priority. Both are judgments, not labels copied from a template.

## Story points by analogy

Use the project's own Fibonacci scale from `GetProjectDetails.estimationPointArr` (normally `0,1,2,3,5,8,13,21...`). Do not use `0` for a real Story unless the team explicitly treats it as “no estimate”. Split a Story above 13 points instead of inflating it.

1. Build the analog set from **completed** Stories in the same project. Prefer Stories with a description, acceptance criteria and a known outcome.
2. Shortlist the 3 closest analogs by:
   - same actor and business capability;
   - same surface set (mobile / web / backend / integration);
   - similar number of acceptance criteria;
   - similar data/permission/migration complexity;
   - similar external provider or cache/realtime risk;
   - similar uncertainty.
3. Start from the **median** points of the shortlist, then round to the nearest allowed Fibonacci value; record the rounding.
4. Adjust by one Fibonacci step for each material difference:
   - new integration, migration, security/permission model, or multi-tenant rule → +1 step;
   - reuse of an existing pattern/component, no schema change, or read-only UI → −1 step.
5. Cap the adjustment at ±2 steps. If the result is still uncertain, record the range and choose the upper bound only with a reason.
6. Record: analog item IDs, their points, why they are comparable, the median, adjustments, final points, and confidence (`high`, `medium`, `low`).

If the project has no usable history, use analogs from another project **only as a labeled reference**, then ask for confirmation. Never present a cross-project analogy as project history.

### Size signals

| Signal | Smaller | Larger |
|---|---|---|
| Surfaces | one | mobile + web + backend |
| Data | read-only | schema change + migration + backfill |
| Permissions | existing role | new tenant/role/security rule |
| Integration | existing client | new provider, retries, quota, reconciliation |
| UI | one screen/state | multi-step flow, empty/error/offline states |
| Realtime/cache | none | invalidation, consistency, race handling |
| Uncertainty | known pattern | unresolved product/technical decision |

Do not estimate from title length, number of files, or number of tasks. A task list is not a size measure.

## Priority

Set priority from business impact, urgency, risk and dependency. Do not copy the requester's wording and do not equate High with “large”.

| Priority | Use when |
|---|---|
| High | revenue/critical user journey, regulatory/security exposure, release blocker, or blocks another team/sprint; no acceptable workaround |
| Medium | important outcome with a workaround or a later release window; material but not immediate |
| Low | nice-to-have, cosmetic, or can wait without business loss |
| None | not triaged; do not leave a real Story at None when the project expects a decision |

Record one sentence of rationale. If two priorities are defensible, choose the lower one and state the condition that would raise it.

## BMAD micro-story consolidation

BMAD often produces very small stories that are really one capability split by artifact section. Before importing:

- Merge candidates only when they share the same actor, business outcome, epic, release and acceptance surface, and each is below 2 points.
- Keep 3–7 acceptance criteria after merging; fold duplicates and preserve traceability to every source section.
- Do not merge across different actors, different releases, independent acceptance decisions, or unrelated data/permissions.
- If an “epic” contains only one sprint-sized deliverable, represent it as one Story under the existing epic container instead of creating an empty epic plus a micro-story.
- If a “story” is only a technical step (add DTO, add migration, wire button), make it a Task under the real Story. Do not relabel a Task as a Story without a role, value and testable AC.
- Record the merge rationale and the source-section list in the Story's traceability block.

The goal is a reviewable, independently valuable Story — not the fewest possible records and not one record per BMAD heading.
