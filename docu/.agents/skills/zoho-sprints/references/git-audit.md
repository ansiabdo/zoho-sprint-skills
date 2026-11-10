# Local Git work → Zoho Sprints

Use this only when asked to reconcile development work with Zoho. Start with a review report. A direct instruction to add the mapped items authorizes the specified writes after the checks below; otherwise keep the run read-only until the user accepts a concrete list.

## Establish the delta

1. Identify the repository root and current branch. Read [ledger and recovery](ledger.md) before choosing a commit range; refresh the status of previously recorded Zoho item IDs and reconcile pending writes first.
2. Read HEAD, recent commits since the verified checkpoint, staged changes, unstaged changes, and untracked files separately. A commit SHA does not cover the working tree. Record commit authors when available; a local change is not proof of its author.
3. If there is no valid checkpoint, label the run as a baseline and state the commit range and working-tree snapshot being analyzed. If history diverged or the branch changed, compare ancestry and report an unresolved range rather than guessing `HEAD~N`.
4. Exclude credential files, private keys, tokens, generated outputs, dependencies, binaries, and customer secrets from content inspection. Paths and safe metadata can still identify excluded changes. Do not commit, reset, stash, checkout, or rewrite the developer's Git state as part of an audit.
5. Read allowed diffs and surrounding code. Group related behavior changes and describe actual effects, affected modules/APIs/data/UI/tests, evidence, and uncertainty. A file or commit alone does not justify a Zoho item.

## Map work

Read only the user's permitted Zoho scope under the configured role, but scan every relevant accessible sprint/page needed to avoid duplicates. Compare behavior and business outcome with existing User Stories and child items. Assign high, medium, or low confidence and state why. Weak matches remain proposed for review.

For a mapped change, propose a precise child Task or Bug only if the verified parent User Story is assigned to the Developer, the item type is supported, and no equivalent child already records the work. Include context, expected work, observable acceptance criteria, test expectation, source commit/fingerprint, and assumptions. Use a Bug for a demonstrated defect, not merely because a file changed.

For work with independent user or business value, propose a new User Story only after a broad duplicate check and the Active plus date-window rule in [role and operation rules](roles-and-operations.md). Refactoring or an implementation step usually maps to an existing story or an agreed technical item; do not create one story per file or commit.

## Review before writes

Show a table with change evidence, candidate story and confidence, existing matching item, proposed action and title, eligible sprint, and any blocker. Use actions such as reuse, add child Task/Bug, propose story, or no action. For each authorized write, record intent before the MCP call; after it returns, record the actual ID and read back. Treat timeouts as unknown results and reconcile before retrying.

At the end, report analyzed commit range and working-tree fingerprint, mapped and unmatched changes, created/reused items with verified IDs, pending decisions, exclusions, search coverage, and checkpoint before/after. Advance the checkpoint only under the rules in [ledger and recovery](ledger.md).
