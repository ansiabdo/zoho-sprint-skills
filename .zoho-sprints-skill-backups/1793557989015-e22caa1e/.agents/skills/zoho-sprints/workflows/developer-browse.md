# Workflow: Browse my work

Use [the policy contract](../references/policy-contract.md) and [read coverage](../checks/read-coverage.md).

1. Resolve the private role profile, exact current-user Zoho ID, workspace, and relevant project(s). If identity cannot be established, return only connection metadata and ask for the missing ID.
2. For User Stories, retrieve the smallest accessible scope and show only stories whose assignee IDs include the current user.
3. For active sprint work, inspect current Zoho status and relevant sprints, then show only items assigned to the current user. If the user asks for child items, verify the parent Story is assigned to them first.
4. Use server-side assignee filters when documented; otherwise page and filter locally by exact ID. Do not put unrelated team items into the answer, even if a broad MCP list returned them.
5. Report project/sprint, item title/type/ID/status and assignee where permitted, plus pages and limits searched. Do not call the result a complete inventory when pagination, projects, or permissions were not fully covered.
