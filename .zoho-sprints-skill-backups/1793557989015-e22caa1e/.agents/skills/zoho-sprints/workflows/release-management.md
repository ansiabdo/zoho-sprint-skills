# Workflow: Release management

Use [field completeness](../references/field-completeness.md), [write verification](../checks/write-verification.md), and the release tools exposed by the live registry (`GetReleases`, `GetReleaseDetails`, `GetReleaseStages`, `CreateRelease`, `UpdateRelease`, `UpdateReleaseStage`, `AssociateItemsWithRelease`).

## 1. Inventory before creating

1. Read every existing release and its stage. Page fully; names may collide across years.
2. For each candidate item, read its current release association. Do not create a duplicate release for an open train.
3. Identify the project's naming and numbering pattern from real past releases. Preserve it; do not import another project's pattern.
4. Resolve owner IDs, release stage ID and dates from live Zoho data. Do not guess stage names or IDs.

## 2. Determine the version

### Mobile

Read the version from the mobile project code before inventing a number. Check, in order:

- Flutter: `pubspec.yaml` → `version: <version>+<build>`
- Android: `android/app/build.gradle` or `.kts` → `versionName`, `versionCode`
- iOS: `ios/Runner/Info.plist` → `CFBundleShortVersionString`, `CFBundleVersion`
- React Native: `package.json`, then Android/iOS native files
- Other mobile stacks: the native manifest/plist or the documented version file

Use the **marketing version** for the release name and the **build number** for the build field/notes. If the code has no version, continue after the last mobile release number: `v12` → `v13`; never reset to `v1`. If the naming is semantic (`1.4.2`), increment the patch or minor according to the project's history; ask only when the rule is genuinely ambiguous.

### Web / backend / desktop

Use the repository's package/manifest version (for example `package.json`, `.csproj`, `Directory.Build.props`) or the project's historical `vN` sequence. Do not use the mobile number for a web release unless the project explicitly ships one version across surfaces.

### No code access

If the project folder is unavailable, use the last release in Zoho and continue its sequence. State that the number came from Zoho, not code.

## 3. Create or update

- Name follows the project pattern. For WorldCup mobile-style releases the observed pattern is `vN <theme>` (for example `v4 Multi Competition`); for Invoicing use its own historical pattern.
- Set start/end dates that match the delivery window, not the sprint dates by default.
- Set the owner to the release owner, not the analyst or every developer.
- Set the stage explicitly (`Planning` is the safe initial stage; do not mark `Released` before acceptance).
- Write a goal that names the business outcome, not a list of commits.
- Before creating, search by name and by date overlap. If a matching open release exists, update/associate it instead of creating a twin.

## 4. Associate items

`AssociateItemsWithRelease` requires `sprintid` and `rootitemidarr`. Run once per sprint/backlog group. Associate only root Stories (and standalone Tasks/Bugs that are genuinely part of the release); children inherit through the parent in normal reporting.

After writing, read back:

- release ID, name, stage, dates, owners;
- each item's release association;
- no duplicate association.

## 5. Readiness and closure

A release is not “released” because code exists or a sprint closed. Check:

- every associated Story is Done or explicitly accepted;
- acceptance criteria have evidence, not just commits;
- known defects are listed;
- mobile build number matches the code/build artefact;
- release notes are grouped by epic and written in Arabic/English where the project requires it.

Only then update the release stage. Do not change item status as a side effect of release creation.

## 6. Report

Return the exact release ID, name, stage, dates, owner IDs, associated item IDs, version source (code path or Zoho sequence), duplicate search, read-back result, and unresolved assumptions.
