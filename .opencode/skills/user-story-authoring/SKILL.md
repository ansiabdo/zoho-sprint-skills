---
name: user-story-authoring
description: Author, analyze, and review User Stories for the World Cup / Sports Activities project, including bilingual Zoho fields, acceptance criteria, dependencies, traceability to BMAD/Git, Definition of Ready/Done, and half-month sprint placement. Use when drafting or critiquing a story, not for general Zoho administration.
---

# User Story Authoring

Use this skill to turn an approved requirement or BMAD artifact into a reviewable User Story, or to audit an existing story for completeness and testability. For any Zoho read/write, also load the `zoho-sprints` skill and follow its role, permission, duplicate-search, and read-back rules. This skill does not authorize writes by itself.

## Choose the task

| Task | Read |
|---|---|
| Draft a new story | [story template](references/story-template-ar-en.md), [review checklist](references/review-checklist.md) |
| Analyze an existing story | [review checklist](references/review-checklist.md), [Zoho fields](references/zoho-fields-and-sprints.md) |
| Fill Zoho fields | [Zoho fields](references/zoho-fields-and-sprints.md); then use `zoho-sprints` field-completeness workflow |
| Set assignee / analyst | [team routing, sizing and format](references/team-routing-and-estimation.md) |
| Estimate points or priority | [team routing, sizing and format](references/team-routing-and-estimation.md#estimation-by-analogy) |
| Reconcile actual delivery | [review checklist](references/review-checklist.md) and the `zoho-sprints` actual-delivery workflow |
| Merge BMAD micro-stories | [team routing, sizing and format](references/team-routing-and-estimation.md#bmad-consolidation) |
| Carry or clone at sprint close | [zoho-work-item-linking](../zoho-work-item-linking/SKILL.md) |

## Non-negotiable rules

- A story needs a user role, a capability, a business value, and testable acceptance criteria. A technical task list is not a story.
- Do not invent the requester, tester, assignee, dates, points, or release. Resolve real users and values from Zoho, BMAD, or an explicit human decision.
- Resolve Assignee from the project's Current Project Team: Analyst → Analysis team `UDF_MULTIUSERPKL1`; Main Mobile / Main Web / Main Back End → Assignee by surface. A Story spanning several surfaces gets every main owner. Backups are not default assignees. See [team routing](references/team-routing-and-estimation.md#assignee-routing).
- Do not put native-field values in the description and claim the native field is filled. Arabic name, English name, requester, tester, epic, points, dates, release, and assignee are separate fields.
- Estimate points by analogy to the closest completed Stories in the same project; record the analog IDs, median, adjustment and confidence. Set priority from impact, urgency, risk and dependency, not from size or status. See [estimation](references/team-routing-and-estimation.md#estimation-by-analogy).
- Do not create a duplicate. Search Backlog and relevant active, upcoming, completed, and canceled sprints first.
- A completed sprint item is not writable through the normal MCP path (`7401.14`). Record `unsupported_write`; do not fake the field in the description.
- Do not change status because code exists. Status changes require acceptance evidence; otherwise keep the status and record `unverified`.
- Preserve existing descriptions byte-for-byte. Append actual-delivery notes after the exact separator `##+=================================================##`; never replace requirements with implementation claims. See [description format](references/team-routing-and-estimation.md#description-format).
- Half-month sprint rule: 1st–15th and 16th–end of month. Do not copy the historical monthly pattern unless the user explicitly asks for it.
- A Story may have child Tasks/Bugs; a Task must have a parent Story. Do not create a child under a parent assigned to someone else.
- When BMAD yields micro-stories below 2 points, consolidate only same-actor/same-outcome/same-epic/same-release items; keep 3–7 AC and every source reference. See [BMAD consolidation](references/team-routing-and-estimation.md#bmad-consolidation).
- At sprint close, carried or cloned items get `Part n - ` at the start of the title, Arabic name and English name; link the parts and preserve epic/release/parent. See [zoho-work-item-linking](../zoho-work-item-linking/SKILL.md).

## Drafting sequence

1. Identify the source: BMAD artifact, approved requirement, production gap, or explicit user request.
2. State the capability and value in one sentence. If you cannot, the story is not ready.
3. Write 3–7 acceptance criteria covering happy path, errors, permissions, data edges, and non-functional constraints.
4. List required changes and dependencies separately from acceptance criteria.
5. Propose a short Arabic name and a short English name.
6. Resolve the requester and tester from real users; do not use a story title as a person.
7. Choose the epic, sprint window and release. Resolve assignees from the project team, estimate points by analogy, and set priority from the rubric.
8. Check duplicates and field completeness before proposing any Zoho write.
9. After delivery, compare each criterion and append a structured actual-delivery note after the exact separator.

## Output contract

When drafting, return:

- Story title (English) and short English name.
- Arabic name.
- Role / want / value.
- Numbered acceptance criteria.
- Required changes.
- Dependencies.
- Proposed requester, tester, epic, points, sprint window, release, assignee.
- Traceability: BMAD section, Git commits/files, or “none found”.
- Open questions and assumptions.

When analyzing, return a criterion-by-criterion verdict: `delivered`, `partial`, `not_delivered`, `delivered_differently`, or `unverified`, with evidence and the exact missing field(s).

For a multi-stage workflow, add one evidence-based next action using the `zoho-workflow` handoff format. If required story fields or acceptance criteria are unresolved, recommend resolving those exact gaps. If the draft is ready and creation was requested, route to `zoho-sprints` for duplicate checks and the authorized write; after a delivery review, route to actual-delivery documentation only when evidence supports it.

## References

- [Story template (Arabic/English)](references/story-template-ar-en.md)
- [Review checklist](references/review-checklist.md)
- [Zoho fields and sprint rules](references/zoho-fields-and-sprints.md)
- [Team routing, sizing and description format](references/team-routing-and-estimation.md)
- [Project team routing and estimation](references/team-routing-and-estimation.md)
- [Link and clone](../zoho-work-item-linking/SKILL.md)
