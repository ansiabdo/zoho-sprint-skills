# Workflow: Create a User Story (Developer)

1. Resolve current user ID from trusted local profile or MCP identity data.
2. List active sprints for the target project(s); fetch full details for candidates.
3. Confirm sprint status is Active and `start <= now <= end` in the sprint timezone.
4. If more than one sprint qualifies, do not silently choose one. Search for duplicates across all relevant active sprints first, then ask the user to select a sprint if needed.
5. Search existing stories using title/keywords; retrieve details for plausible matches.
6. Compare outcome, description, acceptance criteria, entity/module, and context.
7. If a match exists, present it and stop creation. If appropriate, offer to add a child item only after verifying the parent is assigned to the developer.
8. If no likely duplicate exists, resolve the project's actual User Story type ID and required fields.
9. Create using the exposed MCP tool only.
10. Re-read the created story and verify ID, title, type, sprint, and assignees.
11. Report the result and any limitations of the search.
