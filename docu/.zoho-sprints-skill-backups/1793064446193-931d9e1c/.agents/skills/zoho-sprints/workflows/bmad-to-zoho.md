# BMAD Workflow → Zoho Sprints

## Purpose
Support projects whose requirements and planning are produced through BMAD (Business Model / Analysis / Design / Development workflow, or the team's configured BMAD method). Once a project is explicitly identified as BMAD-managed, map approved BMAD artifacts to Zoho Sprints rather than duplicating the planning process.

## Trigger
Use this workflow only when the user or repository configuration identifies the project as using BMAD and provides accessible artifacts. Do not infer BMAD usage from folder names alone.

## Workflow
1. Identify the project root and the configured BMAD method/version. Locate the artifacts actually present, such as product brief, PRD, architecture/design documents, epics, stories, implementation plans, and test plans.
2. Read artifacts using the project's own workflow guidance. Establish source-of-truth precedence and note conflicting or incomplete requirements.
3. Build a traceability map:
   `BMAD artifact → epic/capability → user story → acceptance criteria → implementation task/bug → test evidence`.
4. Read existing Zoho projects, date-eligible sprints, stories, and child items. Search duplicates across all accessible relevant stories before creating anything.
5. Present a proposed import/mapping table with source artifact and section, proposed Zoho title/type, parent story, sprint, duplicate result, and confidence.
6. Create/update Zoho items only when:
   - the project/workspace mapping is verified;
   - the user has appropriate permissions and the required MCP operation exists;
   - the item is not already present;
   - sprint eligibility rules are satisfied;
   - write actions are authorized.
7. Keep BMAD source references in descriptions using repository-relative paths and headings/IDs. Avoid pasting entire documents into Zoho.
8. Record each imported item and its source reference in the local ledger. On later runs, import only new or changed BMAD artifacts; compare artifact IDs/content fingerprints and current Zoho items first.
9. If BMAD artifacts change, do not blindly overwrite a story's edited description. Show a diff and propose a controlled update, preserving manual Zoho edits unless the user approves a merge.
10. If a source artifact is ambiguous or a requirement conflicts with existing Zoho scope, leave it pending and ask for a decision.

## Mapping guidance
- Business value, actor, outcome, and acceptance criteria belong primarily in a User Story.
- Implementation steps, code changes, migrations, test additions, and documentation updates normally become child tasks under a suitable story.
- Defects against expected behavior may be Bugs, not new stories, if the Zoho project supports that type.
- Architecture spikes or technical enablers should use the team's agreed work-item taxonomy; do not mislabel them as business stories just to fit the tool.
- Keep story granularity independently valuable and testable. Do not create one story per file, commit, class, endpoint, or BMAD paragraph.
