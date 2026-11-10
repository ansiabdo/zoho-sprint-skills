# Zoho Fields and Sprint Rules (World Cup)

Project: **Sports Activities As A service**
- teamId `767679505`
- projectId `120216000004162606`
- item module `120216000000002031`
- layout `120216000000420523` — Standard Layout with Short Names
- Story item type `120216000004162630`

## Custom fields

| Label | API key | Values / notes |
|---|---|---|
| Story Arabic Name | `UDF_CHAR3` | short Arabic name |
| Story English Name | `UDF_CHAR4` | short English name |
| Business team (Requester) | `UDF_CHAR5` | real person/team |
| Business team (Tester) | `UDF_CHAR7` | real person/team |
| SME (Feature Product Owner) | `UDF_CHAR8` | optional |
| OKR | `UDF_CHAR6` | optional |
| الملاحظة الاسبوعية لاجتماع الطوارئ | `UDF_TEXT1` | optional |
| Story Feature Type | `UDF_RADIO1` | Mobile `120216000000851695`; Admin Portal `120216000000851697`; Third-party Portal `120216000000851699` |
| Definition of Ready | `UDF_CHKBOX2` | component `850745`; dependencies `850747`; inputs `850749`; AC `850751` |
| Definition of Done | `UDF_CHKBOX1` | AC `420553`; UAT `420555`; DB `420557`; BE `420559`; FE Mobile `420561`; FE Web `420563`; Integration `420565`; Big Flow `420567` |
| Analysis team | `UDF_MULTIUSERPKL1` | user picker; Abdullah Al-Measar `120216000000010017`, Mohammed Alaqari `120216000000359035` |
| Date of Live Launch | `UDF_DATE1` | date |

## Mandatory default fields

`RELEASE_ID`, `START_DATE`, `END_DATE`, `STATUS_ID`, `PROJ_PRIORITY_ID`, `OWNER_ID`, `POINTS`, `PROJ_ITEMTYPE_ID`, `DURATION`, `EPIC_ID`, `TOTAL_WORKHOURS`.

## Known IDs

- Status: To do `120216000000003629`; In progress `120216000000003631`; Done `120216000000003637`.
- Priority: None `120216000004162624`; Low `120216000004162625`; Medium `120216000004162626`; High `120216000004162627`.
- Epics: Predictions/points `120216000004208116`; Matches/sports news `120216000004208118`; Tenants & Integrations `120216000004220081`; DevOps `120216000004237129`; Multi Competition `120216000004557316`.
- Active sprint SP5: `120216000004192758`.
- Backlog: `120216000004162608`.
- Release v4 Multi Competition: `120216000004656366`.

## Sprint rule

- First half: 1st–15th.
- Second half: 16th–end of month.
- Do not create monthly sprints unless explicitly requested.
- Historical pattern was monthly `SP{n} {Mon} {YY} {Theme}`; preserve historical names, but use half-month names for new sprints.

## Project team routing

Read `GetProjectDetails` and map the project-level fields:

| Project detail | Project UDF | Story destination |
|---|---|---|
| Analyst | `UDF_USERPKL1` | Analysis team `UDF_MULTIUSERPKL1` |
| Analyst Backup | `UDF_USERPKL2` | Analysis team only if main unavailable |
| Main Mobile App Developer | `UDF_MULTIUSERPKL2` | Assignee for mobile surface |
| Mobile App Developer Backup | `UDF_USERPKL4` | backup only |
| Main Back End Developers | `UDF_MULTIUSERPKL1` | Assignee for backend surface |
| Back End Developer Backup | `UDF_USERPKL3` | backup only |
| Main Web Developer | `UDF_MULTIUSERPKL3` | Assignee for web/admin surface |
| Web Developer Backup | `UDF_USERPKL5` | backup only |

A Story spanning mobile + web + backend gets all applicable main owners. Analyst never replaces Assignee. Revalidate per project; the labels come from the project Details screen.

## Description format

Structured multi-line. Preserve old text byte-for-byte, then:

```text
##+=================================================##
```

then the new/actual-delivery section. The separator is exact and on its own line. Do not overwrite old business text.

## Estimation and priority

Use Fibonacci points and the nearest completed Stories in the same project as analogs (median + one-step adjustments, record IDs and confidence). Priority is impact/urgency/risk/dependency, not size. See [estimation by analogy](team-routing-and-estimation.md#estimation-by-analogy).

## Sprint close

Carried or cloned items get `Part n - ` in title, Arabic name and English name; link parts and preserve epic/release/parent.

## Write notes

- `UpdateItem` accepts UDF keys in `query_params` even though the live schema does not list them. This was verified by read-back.
- Dates must be `yyyy-MM-dd'T'HH:mm:ssZZ` (for example `2026-11-01T00:00:00+0300`). Milliseconds may be rejected by some endpoints.
- Items in completed sprints return `7401.14` and must not be edited through this path.
- `AssociateItemsWithRelease` needs `sprintid` plus `rootitemidarr`; run once per sprint/backlog group.
- No MCP attachment tool exists.
