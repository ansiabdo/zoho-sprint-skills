# Local ledger contract

The audited repository owns `.zoho-sprints/`; the distributable skill does not store project records. Default files are `audit-state.json`, append-only `change-ledger.jsonl`, `pending-actions.json`, and timestamped `reports/*.md`. Add them to `.gitignore` unless the team deliberately reviews a sanitized shared artifact. See [audit config](../assets/audit-config.example.yaml).

## State

`audit-state.json` stores schema version, non-secret repository ID, workspace/project map, verified timezone, last fully accounted commit SHA and branch, separate last accounted working-tree fingerprint, last run ID/time/status, and pending count. Never treat HEAD as covering uncommitted work.

Each JSONL event stores schema version, unique event/run IDs, timestamp, event type, repository ID, change fingerprint, safe commit/file references, target IDs when known, and one [contract action state](contract.json). Suggested event types: observed, mapping-decided, duplicate-skipped, create-requested, create-returned, item-verified, action-failed, checkpoint-advanced. Corrections append new events; old lines stay immutable.

`pending-actions.json` stores unknown results, missing permission/tool/identity, duplicate review, sprint eligibility, and user decisions. Keep target IDs, title/type/parent, fingerprint, last search time and reason sufficient to reconcile without a blind retry.

## Fingerprints and crash safety

Use a configured repository ID or normalized remote URL with embedded credentials removed. Build separate stable fingerprints for committed, staged, unstaged and untracked groups from safe metadata and hashes of allowed text diffs. Exclude secret-file contents; do not store full diffs. A fingerprint is an idempotency aid, not semantic proof.

Append `create-requested` **before** a non-idempotent Zoho call. Append returned ID and verification only when observed. If the call times out, keep `pending_verification`: an immediate negative search may reflect indexing delay or an in-flight request. Do not retry automatically. Use a server-supported idempotency guarantee, or later reconciliation followed by explicit user authorization that acknowledges duplicate risk.

Write state and pending JSON through a same-directory temporary file and atomic rename where supported. Flush ledger events before checkpoint advancement. Avoid concurrent writers for one repository; if a run is active, reconcile instead of interleaving events. Advance only after every delta has an accounted or durable pending outcome with a replay plan. Never store tokens, private endpoint URLs, customer secrets or raw sensitive diffs.
