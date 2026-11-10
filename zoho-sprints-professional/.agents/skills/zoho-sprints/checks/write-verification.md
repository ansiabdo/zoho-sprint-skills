# Check: before and after a Zoho write

## Before

1. Record the user's authorized action and exact resolved target IDs. Do not expand a read request into a write.
2. Confirm role, exact current-user ID if Developer, Zoho permission, live mutation tool and its current required schema.
3. Confirm parent/type/priority/assignee, required fields, and date/time eligibility when applicable. Resolve multiple matching targets explicitly.
   Apply [field completeness](../references/field-completeness.md): verify Arabic/short English names, business requester, description and every applicable layout-required field with a writable argument. Missing data or unsupported native-field writes block the affected operation. For implementation differences use [actual delivery](../workflows/document-actual-delivery.md); preserve the original description and deduplicate marked appendices.
4. Complete [read coverage](read-coverage.md) and duplicate classification across Backlog and relevant sprints, including completed items and children. An existing Backlog item is not permission to create an active-sprint copy. Pause on `likely` or `unknown_coverage`.
5. For completion/cancel/delete/bulk, show the exact target and unresolved work. A specifically authorized operation may proceed only after its prerequisites are settled.
6. For Git/BMAD non-idempotent creates, append the write-intent event before the MCP call.

## After

1. Capture the tool's actual response and returned ID. If success is clear, read back the affected record and verify the requested type, parent, sprint, status, assignee and changed fields where supported.
2. If response or read-back is ambiguous, label `pending_verification`; do not call it success or blindly repeat create. A negative immediate search is not proof of failure.
3. Record confirmed, verified, failed or pending state in the local ledger when the audit workflow is active. Report exact IDs and any verification limits.
