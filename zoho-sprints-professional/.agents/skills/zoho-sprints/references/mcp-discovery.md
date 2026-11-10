# Live MCP discovery and source coverage

Inspect the live registry and each selected tool's schema at use time. A config file only describes a possible connection. A safe probe is initialize → list tools → read workspaces. An unauthenticated direct HTTP request can return 401 even when the configured OAuth MCP client works.

The local Zoho session on 2026-10-27 exposed 83 tools and a successful `getAllWorkspaces` read. Observed examples included `GetProjects`, `GetSprints`, `GetSprintDetails`, `GetItems`, `GetItemDetails`, `GetWorkspaceUsers`, `getItemTypes`, `CreateItem`, `CreateSubItem`, and `CompleteSprint` under the `ZohoSprints_` prefix. These names and schemas are dated evidence, not a fixed contract. The previous chat's statement that Sprint completion was unavailable is stale for this connection, but presence of `CompleteSprint` does not establish account permission or completed prerequisites.

Observed list tools used `index` and `range` pagination, with index beginning at 1 and maximum range 250 for several tools. `GetItems` listed items in a specified sprint. Do not treat one page, sprint, or project as a global duplicate search. Record each project/sprint/filter/page scanned; page until the response establishes exhaustion. If a backlog operation or filter is unavailable or undocumented, state the limit.

Observed argument schemas varied. Most list/detail tools required string headers `x-za-ui-version` and `X-convert-response`, while `getItemTypes` required boolean `x-convert-response`. Use the exact live schema for each tool, including nested `headers`, `path_variables`, and `query_params`; do not reuse a generic argument object. Resolve actual item-type and priority IDs from current project metadata before create calls.

Separate failures into transport/authentication, missing MCP operation, Zoho permission denial, missing required data, ambiguous identity/target, incomplete search coverage, and unverified mutation. Report the actual category, not a guessed cause.
