# Durable audit ledger and recovery

The ledger is local traceability for Git/BMAD audits, not a replacement for Zoho. Default location in the audited repository is `.zoho-sprints/`, not inside this distributable skill. Put it in `.gitignore` when it contains private work details.

## Files

- `audit-state.json`: schema version, non-secret repository ID, workspace/project mapping, branch, last fully accounted commit SHA, last accounted worktree fingerprint, last run ID/time/status, and pending count.
- `change-ledger.jsonl`: append-only events for observed groups, mappings, duplicate decisions, requested writes, responses, verification, and checkpoint changes.
- `pending-actions.json`: unresolved approval, ambiguous write, missing permission/tool, sprint eligibility, and reconciliation items.
- `reports/<timestamp>-audit.md`: human-readable scope, mapping, evidence, and result.

Use [audit-config.example.yaml](../assets/audit-config.example.yaml) as a local configuration starting point. It contains no credentials.

## Stable identity and idempotency

Use a configured repository ID or a normalized remote URL with embedded credentials removed. Record branch and commit SHA. Keep separate fingerprints for committed, staged, unstaged, and untracked work. Derive fingerprints from stable safe metadata and, for allowed text changes, a hash of the normalized diff; never store full diffs or inspect excluded secret files. A fingerprint helps detect repeats but does not prove semantic equivalence.

Key each proposed Zoho action to the change group, intended type, exact parent/sprint, and semantic purpose. Compare that key with the ledger **and** current Zoho records before creating. Refresh previously confirmed item IDs at the start of each run; report missing or changed items rather than silently recreating them.

## Events and write-ahead rule

Each JSONL line is one JSON object with `schema_version`, `event_id`, `run_id`, `observed_at`, `event_type`, `repository_id`, `change_fingerprint`, optional commit/file references, exact Zoho IDs when known, and `action_status`. Never rewrite old events; append a correcting event.

Before a non-idempotent Zoho create, append `zoho_item_create_requested` with title, type, target IDs, and fingerprint. After a confirmed response, append `zoho_item_created` with the returned ID; after read-back, append `zoho_item_verified`. If the response is absent or ambiguous, append `pending_verification` and search Zoho by parent/type/title/creation context. A negative search can reflect indexing delay or an in-flight request; it is **not** proof that creation failed. Keep the action pending and do not retry automatically. Retry only with a server-supported idempotency guarantee, or after later reconciliation and explicit user authorization that acknowledges the remaining duplicate risk. A title match alone is insufficient.

## Checkpoint and crash safety

Write `audit-state.json` and `pending-actions.json` through temporary files in the same directory followed by atomic rename where the filesystem supports it. Keep the append-only ledger flushed before advancing state. Only advance a commit checkpoint after every delta is either accounted for or represented by a durable pending action with its fingerprint and safe replay plan. Never let a checkpoint silently skip unresolved work. If a crash leaves a requested write without a response, reconcile it before any new create attempt.

Never store credentials, OAuth tokens, raw customer data, or full sensitive diffs in these files. Avoid concurrent audit writers for the same repository; if another run is active, stop and reconcile rather than interleave ledger events.
