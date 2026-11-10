# Zoho Sprints MCP Skills Pack

A cross-editor instruction pack for assistants that operate Zoho Sprints through MCP. It defines two distinct operating profiles:

1. **Admin** — manages projects, sprints, and work items only where the connected Zoho account and exposed MCP tools permit it.
2. **Developer** — works only with assigned stories/items and follows active-sprint date rules, parent-story assignment rules, and duplicate detection.

> **Important:** These files guide the assistant; they are not an authorization boundary. Zoho Sprints and the connected MCP account remain authoritative. Never commit OAuth tokens, passwords, or secrets.

See `README_AR.md` for Arabic setup instructions and the full file map.


## New: Local Git-to-Zoho Sprints Reconciliation
This enhanced release analyzes commits and working-tree changes, maps them to existing stories/tasks, maintains a local idempotency ledger and checkpoint, and supports explicit BMAD artifact-to-Zoho mapping.

Start with:
- `workflows/git-change-audit.md`
- `workflows/git-change-ledger.md`
- `workflows/bmad-to-zoho.md`
- `prompts/EN_git_change_audit.md`
- `templates/zoho-git-audit-config.example.yaml`

Default mode is dry-run. Obtain approval before writes unless the user has explicitly pre-authorized them. Actual execution is constrained by available MCP tools and Zoho permissions.
