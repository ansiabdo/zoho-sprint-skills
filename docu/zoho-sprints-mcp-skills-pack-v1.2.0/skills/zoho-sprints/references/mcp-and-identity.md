# MCP discovery, identity, and search coverage

## Connection preflight

Inspect the live MCP registry and schemas before calling Zoho. A configuration file shows how a client *might* connect; it is not a successful connection. A safe diagnostic sequence is: initialize, list tools, then call a read-only workspace operation. A direct HTTP `401` may simply mean the OAuth-capable MCP client was bypassed; test through the configured client.

The 2026-10-27 local connection exposed 83 tools, including `ZohoSprints_getAllWorkspaces`, `ZohoSprints_GetProjects`, `ZohoSprints_GetSprints`, `ZohoSprints_GetItems`, `ZohoSprints_CreateItem`, `ZohoSprints_CreateSubItem`, and `ZohoSprints_CompleteSprint`. This is evidence from that session, **not** a permanent API contract. Discover the current registry and read each selected tool's schema anew. An earlier chat said sprint completion was unavailable; the live registry superseded it.

The observed tools used different header schemas: most list/detail tools required string `x-za-ui-version` and `X-convert-response`, while `getItemTypes` required boolean `x-convert-response`. Send precisely the schema for the selected tool. Do not reuse one generic argument object for every operation.

## Resolve identity and scope

- Read current workspaces and select the exact workspace ID. Resolve the project and sprint IDs from Zoho results, not from title matches alone.
- Use a local profile such as [profile.example.yaml](../assets/profile.example.yaml) for the assistant role and verified user ID. Keep it outside a distributable skill or use an ignored project-local path. The profile is a policy input, not proof of Zoho permission.
- A display name or email match is insufficient when several users match. Use current-user metadata or workspace users and verify the exact Zoho user ID before Developer writes or assignee filtering.
- Read details where list results omit assignees, status, dates, parent linkage, or permission flags.

## Paginate and describe coverage

The observed project, sprint, item, and user list tools expose `index` and `range`; the documented maximum range was 250 and indexes began at 1. Use the current schema, page until the response proves the result is exhausted, and record pages scanned. Apply server filters when their syntax is documented; otherwise fetch the smallest relevant scope and filter locally. The item list was scoped to a sprint; do not claim that scanning one sprint checked backlog or other sprints.

For duplicate searches, check relevant accessible projects/sprints and plausible existing stories or child items. Compare business outcome, description, acceptance criteria, parent, module/entity/API, and status. Classify exact duplicate, likely overlap, related but distinct, or no match in the searched scope. If pagination, permissions, or an unavailable backlog operation limit coverage, state that limit and stop before a risky create.

## Failure categories

Distinguish transport/authentication failure, absent MCP capability, Zoho permission denial, missing required data, ambiguous identity or target, and unverified result. Do not replace one category with another in the report.
