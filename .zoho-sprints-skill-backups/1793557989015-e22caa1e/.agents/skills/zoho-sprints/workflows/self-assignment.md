# Workflow: Join an existing User Story

Use [the policy contract](../references/policy-contract.md) and [write verification](../checks/write-verification.md). Reuse a matching story instead of creating a duplicate.

1. Resolve the current user's exact Zoho ID and an authorized target story. A minimal internal duplicate match can justify offering to request assignment, but cannot justify displaying another user's story details.
2. Ask whether the user wants to join the existing story unless their instruction already requests self-assignment. Never assign automatically merely because a duplicate was found.
3. Read current assignees and discover the live assignment/update tool and account permissions. If joining is permitted by the project's policy and Zoho account, add only the current user while preserving all existing assignees. If the tool replaces the assignment list, reread it immediately before updating. If permission is absent or uncertain, record a pending owner/Admin assignment request; do not bypass it.
4. Read back and verify membership. Only after successful assignment may Developer browsing disclose the story and child creation proceed under it. Failure or ambiguous results must remain pending. Never create a substitute duplicate or remove another assignee.
