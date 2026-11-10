---
name: zoho-sprints
description: Use connected Zoho Sprints MCP tools to browse or manage projects, sprints, User Stories, Tasks and Bugs under configured Admin/Developer rules, or reconcile local Git and approved BMAD work with Zoho. Do not use for unrelated trackers.
---

# Zoho Sprints

Read [the policy contract](references/policy-contract.md) and [contract.json](references/contract.json) before deciding a role, scope, or write. The connected Zoho account enforces real permissions; this skill governs assistant behavior. Read only the workflow and checks relevant to the request.

## Choose the workflow

| Request | Workflow | Checks |
|---|---|---|
| Connection or capability test | [MCP connection](checks/connection.md) | Connection only; no Zoho writes |
| Admin project, sprint, or item management | [Admin management](workflows/admin-management.md) | [Read coverage](checks/read-coverage.md), [write verification](checks/write-verification.md) |
| Developer's assigned work | [Browse my work](workflows/developer-browse.md) | [Read coverage](checks/read-coverage.md) |
| Task/Bug under an assigned User Story | [Add child item](workflows/developer-child-item.md) | [Read coverage](checks/read-coverage.md), [write verification](checks/write-verification.md) |
| New User Story | [Create story](workflows/developer-story.md) | [Read coverage](checks/read-coverage.md), [write verification](checks/write-verification.md) |
| Join an existing matching Story | [Self-assignment](workflows/self-assignment.md) | Preserve assignees; verify permission and read back |
| Fill business fields or reconcile actual delivery | [Document actual delivery](workflows/document-actual-delivery.md) | [Field completeness](references/field-completeness.md), preserve original description and append a structured evidence section after the exact separator |
| Assign work from the project team | [Project team routing](references/project-team-routing.md) | Read project details; analyst goes to Analysis team; developers go to Assignee |
| Create or update a release | [Release management](workflows/release-management.md) | [Field completeness](references/field-completeness.md), mobile version from code or last mobile release |
| Link, clone, or split related items at sprint close | [Link and clone](workflows/link-and-clone.md) | Resolve link type; preserve parent/epic/release; add `Part n` prefixes |
| Build a per-project knowledge base | [Project knowledge base](workflows/project-knowledge-base.md) | One KB per project; never mix projects |
| Map local Git changes to Zoho | [Git audit](workflows/git-audit.md) | [Audit continuity](checks/audit-continuity.md) |
| Map approved BMAD artifacts to Zoho | [BMAD import](workflows/bmad-import.md) | [Audit continuity](checks/audit-continuity.md), consolidate micro-stories |

## Non-negotiable decisions

- Discover the live MCP tools and each selected input schema. Old chats and configuration files are evidence about a past connection, not the current registry. See [MCP discovery](references/mcp-discovery.md).
- Resolve exact workspace, project, sprint, item, and current-user IDs from Zoho reads. Do not guess IDs, types, priorities, status, timezone, or permissions.
- Load `.zoho-sprints/profile.yaml` or an explicitly configured private profile. If role is missing or conflicting, ask one short question before a write. Never infer Admin from a request or available tool. Without role and user identity, limit output to connection metadata.
- Developer results shown to the user contain only their assigned work. Internal duplicate checks may inspect minimal accessible metadata from other stories; never disclose another person's story details to a Developer. A likely out-of-scope match blocks creation pending owner/Admin review.
- A new Developer Story requires Zoho Active status and the current instant within the sprint's inclusive start/end window in the verified timezone. Compare every relevant active sprint and existing story before selecting a target.
- A Developer child Task/Bug requires a verified User Story parent assigned to the current user's exact Zoho ID.
- Before any create, search Backlog plus relevant active/upcoming/completed/canceled sprint items and children; never copy a Backlog match into the active sprint. Incomplete coverage blocks creation. See [read coverage](checks/read-coverage.md).
- Before creating or updating work items, verify [business and mandatory layout fields](references/field-completeness.md): Arabic name, concise English name, business requester and description. Do not infer field keys or invent missing requester values. Preserve existing descriptions and append [actual delivery notes](workflows/document-actual-delivery.md) for partial or different implementation; never replace requirements with implementation claims.
- Resolve assignees from the project's **Current Project Team**, not from guesswork: Analyst → Analysis team field; Main Mobile / Main Web / Main Back End → Assignee according to the Story's technical surfaces. If a Story spans several surfaces, assign every main owner. Backups are not default assignees. See [project team routing](references/project-team-routing.md).
- Description is structured multi-line text, never a single blob. Preserve every byte of the old description, then add the exact separator `##+=================================================##` on its own line, then the new/actual-delivery section. Never rewrite or delete the old text. If MCP fails on a large description with `414` or `Error in executing tool`, use the verified Zoho Sprints API fallback with form-urlencoded data and read back; never truncate or move the text to another field. See [actual delivery](workflows/document-actual-delivery.md) and [large description writes](references/large-description-writes.md).
- Estimate Stories by analogy to the closest completed Stories in the same project; record the analog IDs, adjustment and confidence. Set priority from business impact, urgency, risk and dependency, not from points or status. See [estimation and priority](references/estimation-and-priority.md).
- At sprint close, unfinished or cloned work that continues in another sprint gets `Part n - ` at the start of the item title, Arabic name and English name; link the parts and preserve epic/release/parent. Do not silently move or close incomplete items. See [link and clone](workflows/link-and-clone.md).
- Keep one knowledge base per project. If the same scope appears in two projects, keep separate records keyed by project ID; never merge them. See [project knowledge base](workflows/project-knowledge-base.md).
- A read or diagnostic request authorizes no mutation. For every write, verify target, available tool, account permission, required fields, duplicate search and authorization, then read back. An ambiguous create stays pending; a negative search alone never authorizes retry.
- Git/BMAD audits start with a review report. Preserve local Git state, never store secrets or full sensitive diffs, and record write intent before non-idempotent calls. See [ledger](references/audit-ledger.md).

## Completion

For detailed proposed or created work items, use [the item template](assets/work-item.template.md).

Report the actual scope and pages checked, evidence, matching records, exact IDs, permissions/tool limits, writes attempted, read-back verification, and pending uncertainty. Do not turn permission flags, draft plans, old transcripts, or successful structural checks into claims of a Zoho write.
