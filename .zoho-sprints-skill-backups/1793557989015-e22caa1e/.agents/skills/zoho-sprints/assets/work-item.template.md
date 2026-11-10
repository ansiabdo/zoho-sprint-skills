# Proposed work item

- Type: Task / Bug / User Story (resolve actual Zoho type ID)
- Title: specific action and observable result
- Arabic name: proposed/verified text → verified native field key
- Short English name: proposed/verified text → verified native field key
- Business requester: verified person/team and field-native value/ID; never infer from assignee
- Mandatory-field preflight: layout/type, required fields, current/proposed values, source and writable arguments; flag missing/unsupported fields
- Target: verified project, sprint, parent, epic and release IDs
- Assignee: resolved from the project's Current Project Team by surface (mobile/web/backend); Analyst goes to Analysis team; backups not default
- Priority: business impact/urgency/risk/dependency with one-sentence rationale
- Purpose: user/business need and affected behavior
- Evidence: safe commit/file references and mapping confidence
- Scope: included work and explicit exclusions
- Implementation: concrete changes supported by inspected code
- Existing description: preserve byte-for-byte; append a [structured actual-delivery section](actual-delivery.template.md) after the exact separator `##+=================================================##` for partial/different delivery
- Acceptance criteria: independently observable, testable outcomes
- Validation: checks actually run and results; separate untested proposals
- Bug only: reproduction, expected/actual behavior, affected environment
- Story only: independent outcome, duplicate search coverage, active/date eligibility
- Estimate: Fibonacci points by analogy to named completed Stories; record median, adjustment and confidence; never infer hours from commit timestamps
- Sprint close: carried/cloned item gets `Part n - ` in title, Arabic name and English name; link parts
- Traceability: Git fingerprint or approved BMAD ID and local run ID

Do not mark completed merely because code exists. Describe observed implementation and verification separately. Never include credentials or sensitive full diffs.
