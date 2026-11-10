# MCP connection notes

MCP server configuration is implementation-specific. The current Zoho Sprints server may be supplied by a desktop host, a remote MCP connector, or a local process. This folder intentionally does **not** invent a server package name, command, URL, or authentication format.

Use the actual setup instructions provided by the Zoho Sprints MCP server you installed. Keep OAuth credentials in the host's secure credential store/environment variables. Never paste secrets into prompts, skills, or source control.

After connecting, inspect the tool registry and confirm it exposes the needed operations. Read access does not imply write access. The Admin/Developer policies in this pack are assistant-side guardrails; Zoho's own permissions must remain the enforcement layer.
