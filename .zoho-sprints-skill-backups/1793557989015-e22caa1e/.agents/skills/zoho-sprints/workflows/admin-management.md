# Workflow: Admin management

Use [the policy contract](../references/policy-contract.md) and run [read coverage](../checks/read-coverage.md) before changing a project, Sprint, or work item.

1. Resolve the workspace and exact project from Zoho reads; resolve any sprint/item ID from a current list or detail result. If names collide, present the distinct records before acting.
2. Read current details and permission flags. Discover the actual mutation tool and schema; a flag alone cannot execute an action.
3. For a create, validate required fields, date order, target relationship and semantic duplicates. For an update, capture current values and the requested delta. Do not quietly reassign or move work.
4. For Complete/Cancel/Delete/Bulk actions, identify the exact target and consequence. In particular, before `CompleteSprint`, page through its items and determine unfinished work and the server's required disposition. Do not close or move items as an implicit side effect. A specific current instruction may authorize completion, but handling unfinished work still needs a specified policy. Carried or cloned items get `Part n - ` at the start of the title, Arabic name and English name, and are linked to their source. See [link and clone](link-and-clone.md).
5. For releases, use [release management](release-management.md): inventory stages, resolve the version from code for mobile, create/update the release, associate root items per sprint/backlog group, then read back. Do not mark a release `Released` from code presence or a closed sprint.
6. Run [write verification](../checks/write-verification.md), call only the authorized tool, then read the affected record and report exact persisted result or uncertainty.

The 2026-10-27 live registry exposed project/sprint/item creation and `CompleteSprint`; rediscover on every run. This workflow never assumes that every Admin action is exposed or permitted.
