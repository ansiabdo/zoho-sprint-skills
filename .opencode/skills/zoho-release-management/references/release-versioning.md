# Release versioning

## Choose the source

| Surface | Primary source | Fallback |
|---|---|---|
| Flutter mobile | `pubspec.yaml` → `version: x.y.z+build` | Android/iOS native version, then last Zoho mobile release |
| Android native | `versionName` + `versionCode` in `android/app/build.gradle(.kts)` | last Zoho mobile release |
| iOS native | `CFBundleShortVersionString` + `CFBundleVersion` in `Info.plist` | last Zoho mobile release |
| React Native | native Android/iOS version; `package.json` is secondary | last Zoho mobile release |
| Angular / web | `package.json` version | project's historical `vN` |
| .NET / backend | `.csproj` `<Version>` or `Directory.Build.props` | project's historical `vN` |

For a mobile release, the **marketing version** (for example `1.4.2`) goes in the release name and notes; the **build number** (`15`) goes in the build/notes field. If both Android and iOS differ, report both and ask which is authoritative; do not silently pick one.

## Naming

Use the project's real history:

- WorldCup mobile-style: `vN <theme>` (for example `v4 Multi Competition`).
- Semantic mobile: `1.4.2` or `v1.4.2` if that is the observed pattern.
- Invoicing: read its own release list; do not copy WorldCup's `vN`.

If the project has no release history, use `v1 <theme>` and state the assumption.

## Fallback without code

1. Read the last mobile release from Zoho.
2. Extract its numeric prefix (`v12`, `1.4.2`, `12`).
3. Increment the correct segment:
   - `vN` → `vN+1`;
   - `x.y.z` → patch +1 unless the change is a minor feature set, then minor +1;
   - build-only release → keep marketing version, increment build.
4. Record “continued from Zoho release <id/name>; code version unavailable”.

Never invent a lower number or reset to `v1`.

## Release notes

Group by epic, then Story. For each item state the user outcome, not the commit list. Separate:

- delivered and accepted;
- delivered but acceptance pending;
- known defects/limitations;
- upgrade/migration notes;
- mobile build number and minimum supported version.

Arabic and English names should match Zoho, not a new translation.
