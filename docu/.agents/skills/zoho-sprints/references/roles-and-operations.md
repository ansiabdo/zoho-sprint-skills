# Role and operation rules

The configured role is `admin` or `developer`. It limits assistant behavior; the Zoho account remains the permission boundary. Do not infer Admin from a request's wording, a mutation tool, or a permission flag. If the role is missing or conflicting, ask one short question before a write. Until role and user identity are established, report only connection capabilities and workspace metadata.

## Admin

Admin may manage projects, sprints, and items when the current MCP registry contains the operation and Zoho allows it. Resolve the exact workspace/project/sprint/item; read its details and permissions; check required fields, dates, and duplicates; execute the authorized action; then verify by reading again.

Completing a sprint requires special preflight: read the current sprint and all relevant work-item pages, identify unfinished items and any required destination or status, and follow the current tool's prerequisites. The 2026-10-27 MCP registry contained `ZohoSprints_CompleteSprint`, whose description said every work item must first be closed or moved. Do not silently close or move work to make completion succeed. Confirm the exact sprint and intended treatment of unfinished work unless already specified by the user.

## Developer reads

- Show User Stories assigned to the verified current user's Zoho ID.
- When asked for active sprint work, show only items assigned to that user in the relevant active sprint(s).
- Show child items under a story only when that story is assigned to the user and the account permits reading them.
- If the MCP lacks an assignee filter, fetch the smallest relevant scope and filter using exact IDs before responding. Do not expose unrelated team members' work in the answer.
- Duplicate detection may inspect the minimum accessible metadata across relevant sprints internally. If a likely matching story belongs to someone else, stop creation and report that a possible overlap exists outside the Developer's display scope; request review by an Admin or the story owner without revealing its title, ID, assignee, or details.

## Developer child Task or Bug

1. Resolve and read the parent; verify its type is User Story and its assignee list includes the current user's exact ID.
2. Search existing children and relevant items for equivalent work, including completed items.
3. Resolve the project's actual Task/Bug type ID, priority ID, and required fields. The observed `CreateSubItem` tool required workspace, project, sprint, and parent IDs plus name, type, and priority IDs; use the *current* schema.
4. Create only under the verified parent. Read back and verify parent, type, sprint, and assignee. If the tool cannot set a required assignee safely, do not imply it was assigned.

## Developer User Story

1. Resolve the project, timezone, current time, all relevant active sprints, and each sprint's actual start/end timestamps. Require Active status and inclusive `start <= now <= end`. If timezone or end-of-day meaning is ambiguous, resolve it before a write.
2. Search accessible relevant current and recent stories, including all candidate active sprints, for the same user/business outcome. Read only the minimum plausible matches needed to compare description and acceptance criteria. Show details only for stories inside the Developer's display scope. For a likely match outside that scope, apply the privacy rule above and leave creation pending.
3. If several sprints qualify, let the user's specified target decide; otherwise request a choice after the duplicate search. Do not silently select one.
4. Resolve the actual User Story type, priority and required fields. The observed `CreateItem` tool created work items; there was no need to invent a separate create-story tool.
5. Create in the selected eligible sprint and verify returned ID, type, sprint, and assignees. If no sprint qualifies, leave the proposed story pending instead of placing it elsewhere.

## Duplicate response

For candidates within the configured display scope, report title, ID, type, parent, sprint, status, assignee, and why the item appears equivalent where available. Do not reveal those fields for another person's item to a Developer. A likely duplicate pauses creation; an exact duplicate is reused or reported. A related but distinct item may proceed after the normal preflight. State search limits.
