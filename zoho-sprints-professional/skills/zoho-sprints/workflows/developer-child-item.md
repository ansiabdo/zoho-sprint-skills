# Workflow: Add Task or Bug under my User Story

Use [the policy contract](../references/policy-contract.md), [read coverage](../checks/read-coverage.md), and [write verification](../checks/write-verification.md).

1. Resolve the exact parent ID and read it. Verify its type is User Story and its assignees contain the configured current user's exact Zoho ID.
2. Search the project's Backlog and relevant active/upcoming/completed/canceled sprint items and children for the same work, including completed items. Classify exact, likely, related, none-in-scope or unknown coverage. A likely or unknown match stays pending; never copy a Backlog match into this parent.
3. Write a precise proposed child title and description: the observed need, specific expected work, observable acceptance criteria, test expectation, and relevant source references. Mark assumptions instead of inventing product rules.
4. Resolve the current project's real Task/Bug type and priority IDs and the live create-subitem schema. Do not assume fixed numeric IDs or that the tool assigns the child automatically.
5. Call the create tool only after authorization and checks. Read back the child and parent; verify ID, type, parent link, sprint, and assignee. If any field differs, report it as an unresolved result rather than claiming the requested child was created correctly.
