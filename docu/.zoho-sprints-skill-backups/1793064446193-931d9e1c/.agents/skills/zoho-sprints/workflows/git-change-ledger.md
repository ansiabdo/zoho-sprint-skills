# Git → Zoho Local Ledger and Checkpoint

## Purpose
Define a durable local memory for repeatable audits. The ledger records evidence and confirmed Zoho actions; it is not a replacement for Zoho's source of truth.

## Default files
- `.zoho-sprints/audit-state.json` — current repository checkpoint and last run status.
- `.zoho-sprints/change-ledger.jsonl` — append-only event log.
- `.zoho-sprints/pending-actions.json` — writes requiring verification, approval, or recovery.
- `.zoho-sprints/reports/` — human-readable reports.

Add these paths to `.gitignore` if they contain private work details or local-only state. If the team wants shared traceability, create a reviewed sanitized report in a dedicated documentation location; do not commit raw diffs, secrets, or sensitive paths by default.

## State schema example
```json
{
  "schema_version": 1,
  "repository_id": "stable-local-repository-identifier",
  "repository_root_hint": "relative-or-redacted-path",
  "workspace_id": "configured-zoho-workspace-id",
  "project_mappings": [],
  "timezone": "Asia/Aden",
  "last_successful_run_id": null,
  "last_successful_run_at": null,
  "last_accounted_commit_sha": null,
  "last_accounted_branch": null,
  "last_accounted_worktree_fingerprint": null,
  "run_status": "not_initialized",
  "pending_action_count": 0
}
```

## Ledger JSONL event schema
Each line is a complete JSON object. Suggested fields:
```json
{
  "schema_version": 1,
  "event_id": "stable-unique-event-id",
  "run_id": "run-identifier",
  "event_type": "change_group_observed|mapping_decided|zoho_item_create_requested|zoho_item_created|zoho_item_verified|duplicate_skipped|action_failed|checkpoint_advanced",
  "observed_at": "ISO-8601 timestamp with offset",
  "repository_id": "stable-local-repository-identifier",
  "branch": "branch-name",
  "commit_shas": ["sha"],
  "change_fingerprint": "hash-of-safe-normalized-change-metadata",
  "file_paths": ["src/feature/file.cs"],
  "change_summary": "brief evidence-based summary",
  "zoho_project_id": "if known",
  "sprint_id": "if known",
  "user_story_id": "if known",
  "item_id": "if known",
  "item_type": "Task|Bug|User Story",
  "item_title": "title",
  "action_status": "proposed|awaiting_approval|requested|confirmed|pending_verification|failed|skipped_duplicate",
  "verification": {
    "checked_at": null,
    "zoho_status": null,
    "result": "not_checked"
  },
  "evidence": ["commit SHA", "diff summary", "relevant file references"],
  "notes": []
}
```

## Identity and fingerprint
Build a stable repository identifier from a non-sensitive repo identity such as normalized remote URL (redact embedded credentials) or a locally configured ID. Do not store secrets.

Build a change fingerprint from safe normalized metadata, for example:
- repository ID;
- commit SHA(s), if committed;
- sorted file paths;
- change type and line-count metadata;
- normalized diff hash only if policy permits storing it locally and it contains no secrets.
For uncommitted changes, calculate a separate working-tree fingerprint. Never treat a commit SHA as covering uncommitted edits.

## State transitions
`observed → mapped → proposed → awaiting_approval → create_requested → confirmed → verified`

Failure/recovery:
- `create_requested → pending_verification` if the tool times out or response is ambiguous.
- `pending_verification → verified` only after querying Zoho and matching the item.
- `pending_verification → retry_approved` only after confirming no matching item exists and retry is authorized.
- `proposed → skipped_duplicate` if a semantically equivalent Zoho item or ledger record exists.
- `any unresolved → pending` when the sprint window, permission, assignment, or project mapping is not valid.

## When a run starts
1. Read and validate state, ledger tail, and pending queue.
2. Query Zoho for all known item IDs whose status needs refreshing, within available tool capabilities.
3. Show current statuses and reconcile missing/changed items.
4. Determine the new Git delta from the last fully accounted checkpoint.
5. Do not advance the checkpoint if any delta is neither accounted for nor explicitly marked pending with a safe replay strategy.
6. Append new events; never erase history.

## Crash safety
Before a Zoho create call, append `zoho_item_create_requested` with the proposed title, parent, sprint, and fingerprint. After the call, append the returned ID and status. If the process crashes between request and response, query by exact title/parent/type and inspect recent items before retrying. Exact-title search alone is insufficient; compare semantic purpose and creation time when available.

## Privacy
Do not store full diffs, tokens, `.env` contents, customer data, credentials, or sensitive financial information in ledger/report. Store a concise summary and file references instead.
