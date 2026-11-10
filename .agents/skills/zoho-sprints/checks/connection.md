# Check: MCP connection and capabilities

This check is read-only. It does not require an Admin/Developer role and authorizes no Zoho mutation.

1. Identify the currently configured MCP client/server without printing private URLs or tokens.
2. Initialize the server, list live tool names and schemas, and call one safe read such as workspaces.
3. Distinguish direct HTTP authentication failure from failure through the configured OAuth client. Do not claim a broken server based only on a bare 401.
4. Record the date, server reachability, read result, number of tools, and capabilities relevant to the requested operation. A tool's presence is not account permission or a successful write.
5. If unavailable, report whether the blocker is transport/authentication, absent tool, permission, or unknown. Do not fabricate fallback tools or IDs.
