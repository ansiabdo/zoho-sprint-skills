# User Story Review Checklist

## 1. Structure

- [ ] Title is a capability, not a task.
- [ ] Role is a real user/actor.
- [ ] Want is observable.
- [ ] Value explains why it matters.
- [ ] 3–7 acceptance criteria, numbered.
- [ ] Required changes separated from AC.
- [ ] Dependencies separated from AC.

## 2. Testability

- [ ] Every AC has an observable result.
- [ ] Happy path covered.
- [ ] Error/failure path covered.
- [ ] Permission/authorization covered.
- [ ] Data edge/empty state covered.
- [ ] Non-functional constraint has a number (latency, quota, retention), not an adjective.
- [ ] No AC says “works correctly” without defining correct.

## 3. Zoho fields

- [ ] Arabic name present and short.
- [ ] English short name present and short.
- [ ] Requester is a real person/team, not a title or story name.
- [ ] Tester present or explicitly deferred.
- [ ] Epic present.
- [ ] Points > 0 and estimated by analogy to named completed Stories; analog IDs and confidence recorded.
- [ ] Priority set from impact/urgency/risk/dependency, with one-sentence rationale.
- [ ] Start date, end date, duration consistent.
- [ ] Assignee resolved from the project's Current Project Team by surface (mobile/web/backend); Analyst is in Analysis team, not Assignee.
- [ ] Release present.
- [ ] Status matches evidence, not hope.
- [ ] Description is structured multi-line; old text preserved byte-for-byte; actual delivery follows the exact separator `##+=================================================##`.

## 4. Duplicate and placement

- [ ] Searched Backlog.
- [ ] Searched each relevant active sprint.
- [ ] Searched upcoming sprint(s).
- [ ] Searched completed/canceled items for history.
- [ ] If a Backlog match exists, do not copy it into an active sprint.
- [ ] Parent Story is correct and assigned to the current user for child tasks.
- [ ] Sprint window is 1–15 or 16–end of month.
- [ ] BMAD micro-stories below 2 points were merged only when actor/outcome/epic/release/surface match; 3–7 AC and all source references preserved.
- [ ] An epic with one sprint-sized deliverable is represented as a Story under the existing epic container, not an empty epic plus a micro-story.
- [ ] A technical step is a Task under a real Story, not a relabelled Story.

## 5. Traceability

- [ ] BMAD artifact/section named, if one exists.
- [ ] Git commit/file named, if code exists.
- [ ] Test evidence named, or “tests not run” stated.
- [ ] Conflicts between BMAD and Zoho listed explicitly.
- [ ] No claim that code presence equals user-value delivery.

## 6. Sprint close and carry-over

- [ ] Every unfinished item has a disposition: complete, carry, split, or cancel with reason.
- [ ] Carried/cloned items are linked to their source.
- [ ] Title, Arabic name and English name start with `Part n - `; no stacked prefixes.
- [ ] Epic, release, parent and assignees preserved.
- [ ] No item was marked Done merely because the sprint closed.

## 7. Actual delivery verdicts

Use exactly one per criterion:

- `delivered` — evidence shows the criterion is met.
- `partial` — some behavior exists, but a criterion is incomplete.
- `not_delivered` — no evidence or explicitly absent.
- `delivered_differently` — behavior exists but differs from the written requirement.
- `unverified` — evidence is insufficient or tests were not run.

Then state the evidence and the status decision. Do not change status automatically.

## 8. Red flags observed in this project

- Story title used as requester (SNA-120).
- Empty description in a completed story (SNA-106/111/113).
- To do while code exists (SNA-53).
- In progress while BMAD says done (SNA-116–118).
- Dates missing (SNA-124/125 before correction).
- Assignee/Epic/Points/Release missing (SNA-126–133 before correction).
- Task treated as Story (SNA-141/142).
- Ambiguous empty-selection semantics (SNA-120 vs 10.3).
- Ambiguous default context (SNA-130 vs 10.6).
