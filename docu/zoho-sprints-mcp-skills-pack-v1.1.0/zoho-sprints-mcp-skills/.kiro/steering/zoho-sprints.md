# Zoho Sprints MCP project steering

Follow `skills/zoho-sprints/SKILL.md` and the role policy configured in `templates/zoho-sprints-profile.example.yaml`.

Use only actual MCP tools. Admin operations require verified IDs, permissions, duplicate checks, and post-write verification. Developer browsing is restricted to the configured user's assigned stories and active-sprint work. A child Task/Bug may be created only under a story assigned to the developer. A new story may be created only in an Active sprint when the current time falls inside the inclusive sprint dates. Search relevant active sprints for duplicates first; pause on likely overlap.


## Git Change Audit
For local Git-to-Zoho reconciliation, follow `workflows/git-change-audit.md` and `workflows/git-change-ledger.md`. Read the local checkpoint and pending queue first, refresh prior Zoho item statuses, process only unaccounted changes, check duplicates, respect current-user assignment and inclusive sprint date windows, default to dry-run, verify writes, and never blindly retry an ambiguous create.
