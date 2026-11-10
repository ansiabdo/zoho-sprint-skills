# Project team routing

Read this before setting Assignee or Analysis team on a Story. The source is the project's **Details → Current Project Team** section, not the item creator, Git author, requester, or a guessed role.

## Field map

The project-details payload stores team members in project-level UDFs. The labels below were confirmed by comparing the Invoicing MService project screen with its live `GetProjectDetails` values; the same layout is used by Sports Activities. Revalidate after any project-layout change.

| Project detail label | Project UDF key | Use on a work item |
|---|---|---|
| Analyst | `UDF_USERPKL1` | Add to Story **Analysis team** `UDF_MULTIUSERPKL1`; not Assignee |
| Analyst Backup | `UDF_USERPKL2` | Add to Analysis team only when the main analyst is unavailable or the user explicitly asks |
| Main Mobile App Developer | `UDF_MULTIUSERPKL2` | Add to Assignee when the Story has a mobile surface |
| Mobile App Developer Backup | `UDF_USERPKL4` | Backup only; do not add by default |
| Main Back End Developers | `UDF_MULTIUSERPKL1` | Add to Assignee when the Story has API, DB, sync, job, provider, auth, cache, migration or other backend work |
| Back End Developer Backup | `UDF_USERPKL3` | Backup only |
| Main Web Developer | `UDF_MULTIUSERPKL3` | Add to Assignee when the Story has a web, admin-portal or third-party-portal surface |
| Web Developer Backup | `UDF_USERPKL5` | Backup only |
| Backend Technology Stack | `UDF_MULTIPKL1` (verify) | Classification only; never an assignee |

A project UDF may contain one ID or a list. Resolve every ID to a live workspace user before writing. Do not assume a person keeps the same project role across projects.

## Classify the Story

Use the description, acceptance criteria, required changes and feature type. Do not use the title alone.

| Surface | Evidence | Default assignees |
|---|---|---|
| Mobile | mobile app/PWA, push, deep link, mobile cache, `UDF_RADIO1 = Mobile` | Main Mobile + Main Back End if the mobile screen calls a new/changed API |
| Web / Admin / Third-party portal | Angular/React/admin screen, tenant console, reports, `UDF_RADIO1 = Admin Portal` or `Third-party Portal` | Main Web + Main Back End if the screen calls a new/changed API |
| Backend only | API, DTO, entity, migration, sync, job, provider, cache, permission, integration | Main Back End only |
| All three | separate mobile, web/admin and backend acceptance criteria or required changes | Main Mobile + Main Web + Main Back End |

If the scope is genuinely ambiguous, ask one short question or use the conservative set (backend + the named UI surface). Do not add every developer “just in case”.

## Write rules

- Preserve existing assignees unless the user explicitly asks to replace them.
- Add owners with `newusers` as a JSON array of exact Zoho user IDs. Remove with `delusers` only when the user asked for a replacement.
- Multiple assignees are allowed. Main Back End and Main Web may be the same person; send the ID once.
- Add the Analyst to `UDF_MULTIUSERPKL1` (Analysis team) even when the Analyst is not an Assignee.
- Do not put the Analyst in Assignee merely because the project screen labels the current user “Analyst”.
- Do not assign backups by default. Record the backup in the preflight matrix as available but unused.
- Read back Assignee IDs and Analysis team after the write. A successful response is not proof of the final owner set.
- Completed-sprint items remain locked (`7401.14`); record `unsupported_write` rather than faking the assignment elsewhere.

## Example: Sports Activities (WorldCup)

Live project-details values:

- Analyst: Mohammed Alaqari `120216000000359035`
- Analyst Backup: Abdullah Al-Measar `120216000000010017`
- Main Mobile: Ali Alshami `120216000000535177`
- Mobile Backup: Mushtaq Alabbasi `120216000000293163`
- Main Back End: Abdullah Al-Ansi `120216000000535227`
- Back End Backup: Younes Shamsan `120216000000535277`
- Main Web: Abdullah Al-Ansi `120216000000535227`
- Web Backup: Younes Shamsan `120216000000535277`

Therefore a mobile-only Story gets Ali + Abdullah (because it calls the backend); a web/admin Story gets Abdullah; a backend-only Story gets Abdullah; a three-surface Story gets Ali + Abdullah. Mohammed goes to Analysis team, not Assignee.

## Example: Invoicing MService

The project screen in the user's reference shows:

- Analyst: Mohammed Alaqari
- Analyst Backup: Eissa Musleh
- Main Mobile: Mushtaq Alabbasi
- Mobile Backup: Ali Alshami
- Main Back End: Abdullah Al-Ansi
- Back End Backup: Amr Qadri
- Main Web: Abdullah Al-Ansi
- Web Backup: Amr Qadri

Live project values match the corresponding UDF keys. Use the same classification table; do not copy the WorldCup assignee set into Invoicing.
