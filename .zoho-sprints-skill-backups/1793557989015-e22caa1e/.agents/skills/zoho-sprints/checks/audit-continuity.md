# Check: repeatable Git/BMAD audit

Before analysis, read `.zoho-sprints/audit-state.json`, `change-ledger.jsonl`, `pending-actions.json` and the configured project mapping. If absent/invalid, report a baseline; do not pretend earlier history was audited.

Re-read known Zoho IDs and current statuses. Resolve prior `pending_verification` actions before new creates. Check repository identity, branch and checkpoint ancestry; report divergences rather than choosing a guessed range. Distinguish committed changes from staged, unstaged and untracked fingerprints, and new/changed approved BMAD artifact IDs.

For each change group, confirm one of: mapped to an existing item, created and read-back verified, explicitly no action, or durably pending with a reason and replay plan. Append events before state changes. Advance the checkpoint only when every delta is accounted for or durably pending. Keep unresolved items visible on the next run and report statuses before analyzing new work.

At finish, report the inspected range, exclusions, mappings, reused/created IDs, ambiguous actions, pending queue and before/after checkpoint. Do not call a dry-run report an executed Zoho update.
