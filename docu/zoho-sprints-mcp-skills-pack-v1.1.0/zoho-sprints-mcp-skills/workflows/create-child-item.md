# Workflow: Create a Task/Bug under an assigned User Story (Developer)

1. Resolve the exact parent story ID from a search result or user-provided reference confirmed through MCP.
2. Fetch parent details.
3. Confirm parent type is User Story.
4. Confirm the configured current user's exact Zoho ID is among parent assignees.
5. If not, stop and explain that this parent is outside the developer's allowed scope.
6. Search existing child items and relevant project items for exact/likely duplicates.
7. If duplicate or overlap exists, show the existing item(s) and ask whether to reuse/update/link rather than create.
8. Resolve the correct Task/Bug type ID and mandatory fields from current project metadata.
9. Create the child item using an available tool.
10. Re-read parent/child details and verify parent relationship, type, sprint, and assignee.
11. Report the created ID and verification result.
