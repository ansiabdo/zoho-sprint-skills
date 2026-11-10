# Workflow: Preserve requirements and document actual delivery

Use [field completeness](../references/field-completeness.md), [read coverage](../checks/read-coverage.md), [write verification](../checks/write-verification.md), and [the delivery template](../assets/actual-delivery.template.md).

1. Read the current Zoho item and original description, source requirements/BMAD, actual code changes and available test evidence. Compare acceptance criteria one by one: `delivered`, `partial`, `not_delivered`, `delivered_differently`, or `unverified`. Code presence is implementation evidence; proven user value requires appropriate test/demo/release evidence. Do not infer deployment or completed acceptance from a commit or BMAD status.
2. Confirm that each observed change belongs to this item. Reference related items rather than importing unrelated changes. Explain whether a different mechanism preserves the intended outcome, changes it, or needs product acceptance; do not silently rewrite the original requirement to fit the implementation.
3. Keep the existing description byte-for-byte intact. Append a clearly visible section at its end using this exact shape:

   ```text
   <existing description, unchanged>
   ##+=================================================##
   --- [ZOHO-ACTUAL-DELIVERY v1 | <stable-entry-id>] ---
   ...
   --- [/ZOHO-ACTUAL-DELIVERY | <stable-entry-id>] ---
   ```

   The separator `##+=================================================##` must be on its own line, exactly as written, with the old text above it and the new/actual-delivery text below it. Do not replace, reformat or delete the old text. If the description already contains the separator, append a new separator + section after the last one; do not overwrite an earlier section. For rich text/HTML, preserve the existing markup and insert the separator as its own paragraph/line. If the description was empty, write the normal structured baseline description first; add the separator only when there is prior text to preserve. The helper [append-description.mjs](../scripts/append-description.mjs) can assemble the exact text and report before/after hashes. Fill the template with actual behavior, mechanism differences, partial criteria, observed value, remaining work, evidence, verification limits and required acceptance decisions.
4. Compute a stable entry ID from item ID and canonical evidence/criterion content, independent of the current run time. Record it plus the before/after description hashes and exact approved text in the local ledger. On repeat, search for the same entry ID in the live description: skip an identical entry; if the ID exists with different content, reconcile before writing. New evidence gets a new entry referencing the prior one; preserve prior entries. Do not use date alone as an idempotency key.
5. Present the native-field preflight, original-description preservation, exact appended text, before hash and target IDs for review. Honor the user's current approval requirement; in the WorldCup trial no external write is allowed until the user confirms the updated plan. This project-specific approval gate is not an automatic global requirement for every skill use.
6. Immediately before an authorized update, reread the latest description. Use a server-supported concurrency token if available; otherwise compare the before hash and abort/review on drift. Send latest original description + approved suffix as one update only when no drift is observed. Preserve existing rich text/HTML and earlier notes; avoid conversions that discard formatting or links. If lossless handling cannot be established, leave the update pending. Without server-side concurrency, disclose the residual race; do not claim atomic compare-and-swap.
7. Read back and verify the original prefix and entry marker/content, plus unchanged status, parent, sprint and assignees. An ambiguous response stays pending. Never change status or close the item merely because the delivery note was appended; status and product acceptance are separate authorized decisions.
