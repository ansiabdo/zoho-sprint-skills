# Story Template — Arabic / English

## English description

```markdown
## Goal
[One sentence: the business outcome.]

## User and value
As a [role], I want [capability], so that [business value].

## Acceptance Criteria
1. Given [context], when [action], then [observable result].
2. Given [error/permission edge], when [action], then [safe behavior].
3. ...

## Required Changes
- [ ] [entity / DTO / permission / endpoint / UI / cache / job]
- [ ] [migration / seed / configuration]
- [ ] [tests / telemetry]

## Dependencies
- [BE01 / BE03 / external decision / data / provider quota]
```

Do not write the description as one line. Preserve any existing business text; append implementation notes only after the exact separator `##+=================================================##`.

## Arabic fields

- **Story Arabic Name:** 3–8 كلمات، بلا اختصارات غامضة.
- **Business team (Requester):** اسم شخص/فريق حقيقي.
- **Business team (Tester):** اسم شخص/فريق حقيقي.
- **SME:** مالك المنتج أو الخبير، إن وجد.
- **Analysis team:** المحلل من فريق المشروع، وليس بالضرورة الـ Assignee.

## Assignee routing

| Story surface | Assignee |
|---|---|
| Mobile | Main Mobile + Main Back End if API changes |
| Web / Admin / Third-party portal | Main Web + Main Back End if API changes |
| Backend only | Main Back End |
| Mobile + Web + Backend | Main Mobile + Main Web + Main Back End |

Backups are not default assignees. Analyst goes to Analysis team (`UDF_MULTIUSERPKL1`). See [team routing](team-routing-and-estimation.md#assignee-routing).

## Estimation

Use 3 completed analogs from the same project; median points; adjust one Fibonacci step per material difference; record analog IDs and confidence. Never use 0 for a real Story.

## Priority

High = critical/revenue/security/release blocker; Medium = important with workaround; Low = nice-to-have; None = untriaged. Record one sentence of rationale.

## Naming examples

| English title | Short English | Arabic |
|---|---|---|
| Competition and Season Catalog | Competition Season Catalog | كتالوج المسابقات والمواسم |
| Tenant Competition Entitlements | Tenant Competition Entitlements | استحقاقات المسابقات للمستأجرين |
| Player Competition and Season Navigation | Player Competition Navigation | تنقل اللاعب بين المسابقات والمواسم |
| Fixture List API — League Filter | Fixture List API - League Filter | واجهة قائمة المباريات — فلترة الدوري |

## Acceptance criteria patterns

### Permission

```text
Given a user without WorldCup.TenantLeagues.Manage
When the user calls the save endpoint directly
Then the API returns 403 and no settings change is persisted.
```

### Empty selection

```text
Given SelectionMode = Selected and the selected list is empty
When the tenant bootstrap is requested
Then no competitions are returned.
```

Do not leave this ambiguous. If the product uses “empty means all”, write that explicitly and do not also claim “empty means none”.

### Provider failure

```text
Given the provider returns 429
When the sync job runs
Then the job backs off, records the failure, and does not increase the provider call count for that cycle.
```

### Cache

```text
Given a tenant entitlement is saved
When the next bootstrap request arrives
Then the cached entitlement for that tenant is invalidated and the new version is returned.
```

## Actual delivery

Preserve the original description above. Append:

```text
##+=================================================##
--- [ZOHO-ACTUAL-DELIVERY v1 | <stable-id>] ---
### ما تم تنفيذه فعلياً
...
### تغطية معايير القبول
| # | المعيار | الحكم | الدليل |
|---|---|---|---|
...
--- [/ZOHO-ACTUAL-DELIVERY | <stable-id>] ---
```

## Story vs Task

- Story: user-visible capability with business value.
- Task: implementation step under a Story.
- Bug: observed behavior differs from an existing requirement.

If the item is a task but the team wants a user-facing outcome, rewrite it as a story first; do not relabel a task as a story without a role/value/AC.
