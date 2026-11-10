---
name: zoho-release-management
description: Plan, create, update and verify Zoho Sprints releases, including release stages, item association and mobile version numbers read from the project code or continued from the last mobile release. Use when preparing a release, deciding its version, or closing a release train.
---

# Zoho Release Management

Use this skill for release trains, version numbers, release stages and associating work items. For any Zoho write, also load `zoho-sprints` and follow its role, coverage and read-back rules.

## Rules

- A release is a deployable version, not a sprint and not a status label.
- Inventory existing releases, stages and item associations before creating anything. Reuse an open matching release; do not create a twin.
- Follow the project's own naming/numbering pattern. Never import another project's pattern.
- For mobile, read the version from the mobile code first. If no code is available, continue after the last mobile release number; never reset to `v1`.
- Do not mark a release `Released` because code exists, a sprint closed, or BMAD says done. Release closure needs acceptance evidence.
- Do not change item status as a side effect of creating or associating a release.
- Resolve owner IDs, stage IDs and dates from live Zoho data; do not guess.
- Read back the release and every association after writing.

## Workflow

1. **Inventory**: `GetReleases` and `GetReleaseStages`. Page fully. Note names, versions, stages, dates and owners.
2. **Version**: run `node scripts/detect-mobile-version.mjs <project-root>` when the code is available. Use its `recommended` value. Ignore placeholder `0.0.0` versions; if no mobile version is found, continue from the last mobile release in Zoho. Read [release-versioning.md](references/release-versioning.md) for the decision table.
3. **Duplicate check**: search by name and overlapping dates. If a matching open release exists, update/associate it.
4. **Create/update**: name, start/end, owner IDs, stage (normally `Planning`), goal. Use the live `CreateRelease`/`UpdateRelease` schema.
5. **Associate**: `AssociateItemsWithRelease` with `sprintid` + `rootitemidarr`; run once per sprint/backlog group. Associate root Stories, not every child.
6. **Read back**: release ID, name, stage, dates, owners, item associations, no duplicates.
7. **Readiness**: check Done/acceptance evidence, known defects, build number, release notes. Only then advance the stage.
8. **Report**: version source, exact IDs, associations, read-back, assumptions and blockers.

## References

- [Version decision table](references/release-versioning.md)
- [Mobile version detector](scripts/detect-mobile-version.mjs)
- [Zoho field completeness](../zoho-sprints/references/field-completeness.md)

For a multi-stage workflow, add one evidence-based next action using the `zoho-workflow` handoff format. A planned release usually leads to verified item association or readiness evidence; recommend advancing to `Released` only when acceptance evidence and the user's requested scope support it.
