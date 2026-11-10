# Workflow: Admin Project/Sprint/Work Item Management

1. Confirm configured role is `admin`.
2. Identify workspace and exact project. Search first if names are ambiguous.
3. Read project details and permission flags when available.
4. Check whether the specific requested mutation tool is actually exposed by MCP.
5. For sprint creation, validate dates, sequence, and project association.
6. For work-item creation, resolve item types/statuses from project metadata and search for duplicates.
7. For closing/completing/canceling/deleting, show the exact target and seek explicit confirmation when not already clearly given.
8. Execute only the real tool with schema-valid parameters.
9. Re-read the record/list and verify state.
10. If tool is missing, say the operation is unsupported by the current MCP toolset even if the permission flag is true. Never simulate success.
