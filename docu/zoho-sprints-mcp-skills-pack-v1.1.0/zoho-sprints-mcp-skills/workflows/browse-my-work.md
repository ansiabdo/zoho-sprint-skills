# Workflow: Browse My Work (Developer)

1. Resolve current user ID from trusted profile or MCP identity source.
2. List active sprint(s) for the relevant project(s).
3. Retrieve assigned user stories and active-sprint work items using source-side filters where available.
4. If source-side filtering is unavailable, retrieve the smallest practical result set and filter strictly by exact assignee ID.
5. Include child items only under stories assigned to the current user.
6. Do not show unrelated work owned by other users.
7. Present title, type, ID, sprint, status, due/date fields, and parent when available.
8. State if permissions, pagination, or missing filters may make the result incomplete.
