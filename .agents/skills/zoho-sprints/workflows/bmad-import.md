# Workflow: Approved BMAD planning → Zoho

Use [the policy contract](../references/policy-contract.md), [audit ledger](../references/audit-ledger.md), and [audit continuity](../checks/audit-continuity.md). Run only when the user or trusted project configuration identifies the project as BMAD-managed and points to accessible artifacts. Do not infer BMAD from a folder name alone.

1. Resolve the project's BMAD method/version, approved source artifacts and precedence. Separate approved requirements from drafts, design proposals and assumptions.
2. Map source artifact and stable section ID → capability/epic → independently valuable User Story and criteria → child Task/Bug → test evidence. Use repository-relative references; avoid pasting whole documents into Zoho.
3. Read existing Zoho scope and the local ledger. Compare title, outcome, criteria, parent and source references for duplicates. Present proposed mapping, confidence, eligible sprint and blockers before writes.
4. Apply the configured role rules. Developer children need assigned Stories; new Developer Stories need Zoho Active status and an eligible date window. An approved BMAD artifact is not by itself authorization for an external write.
5. After authorized writes, record actual Zoho IDs and read back. On later runs, compare stable artifact IDs/fingerprints; import only new or changed approved material. If source content changes, show a diff and preserve manual Zoho edits unless a merge is authorized.
6. Leave conflicting, unapproved or ambiguous requirements pending. Report imported, reused, skipped and unresolved mappings with exact source sections and verified Zoho IDs.

Before any create/update apply [field completeness](../references/field-completeness.md). If BMAD or code shows partial/different delivery against an existing Zoho description, use [actual delivery](document-actual-delivery.md): retain original requirements and append a marked evidence section; BMAD completion does not authorize changing product acceptance criteria.
