---
title: Friend Debt — addendum
status: final
created: 2026-10-28
updated: 2026-10-28
---

# Addendum

Mechanism and transport. These notes are not product requirements. Sources: `docs/friend_debt_service.md`, plus the decisions recorded in `.memlog.md` on 2026-10-28.

## Embedding

Standalone Flutter package `friend_debt`, sibling of Banky, embedded the same way as `world_cup`. Entry `FriendDebtModule`. Host input `FriendDebtHostInput`: `environment` (`tst` or `live`), `tenant`, `token` (host `encryptedProfileId`), `domain`, required `onPay`, optional `themeMode`. The package owns its navigation stack. The host token is not the debt API bearer token.

API base URLs and OAuth client secrets stay in the package environment catalog. `tst` and `live` catalog URLs are not assigned in the spec. An incoming debt link is passed as the full URI in `domain`, with the same tenant and token. The share-link payload identifies the debt request and does not contain `tenant` or `token`.

## Tenancy and money movement

Every read and write is scoped by ABP `tenant`. Another tenant’s debt is not returned.

The host `onPay` moves money into the creditor account. It returns success with `hostPaymentId`, failure with an optional reason, or cancel. A waiver does not call `onPay`. A cash record does not call `onPay`. Outstanding balance is `originalAmount - confirmedPayments - waivedAmounts`, never negative. Confirmed payments include host payments, recorded cash, and recorded other-app payments. Waived amounts include creditor waivers and an unpaid close. One currency per debt. A group pay requires the same currency and settles each debt’s full outstanding. The Dart decimal type is left to the implementation plan.

Payment truth is backend-to-backend. After `onPay` succeeds, the host backend and the debt backend verify that result with the idempotency key and `hostPaymentId`. The debt updates from that verification. A dead client does not leave a verified payment unrecorded, and the same key cannot charge the debtor again or write a second payment line. The engineering spec’s “retry confirm from the client” path is only a client convenience. It is not the source of truth.

## Host-owned systems

Friend management stays in the host app (the friends page already used by World Cup and Farqi). The debt product is an invoice service with its own tenant. The module only views friends for the signed-in user inside that tenant. The friend import is not available yet. Until it is, the module uses a mock friend source keyed by tenant and signed-in user. The mock is replaced later without changing picker behavior. This service stores a nickname per signed-in user and imported friend. Changing it does not call the friend import. The nickname is available while the import is still a mock. The host still owns `onPay`, optional OS push, merchant verification, core-banking accounts, and push-token registration. In-app notification does not depend on push.

The host passes a flag that the signed-in user is operations, so the module can show the unpaid-close screen. The module does not invent its own admin login.

## Record shape

Statuses: `draft`, `pending_acceptance`, `due`, `overdue`, `partially_paid`, `paid`, `rejected`, `disputed`. `disputed` stores `statusBeforeDispute`. Each money line also stores a settlement source: `paid_cash`, `host_payment`, `paid_from_other_app`, or `waived`. Report labels are "paid cash", "paid", "paid from other app", and "waived". `host_payment` is a host `onPay` result after backend verification. The report label "paid" is not the status `paid`. `paid_cash` and `paid_from_other_app` are creditor-recorded and do not call `onPay`. `waived` is a creditor waiver or an unpaid close. `settlementReason` remains `full_payment` when every reduction is `paid_cash`, `host_payment`, or `paid_from_other_app`, and `payment_plus_waiver` when any line is `waived`. Historical invoice totals sum the four sources separately. `waived` is never added to collected cash. Abandon-before-send sets `abandonedBeforeSend` and keeps `draft`. Cancel-before-acceptance sets `cancelledBeforeAcceptance` and is not a ninth status. `overdue` does not replace `partially_paid`; a paid-down debt stays `partially_paid` with `isPastDue`.

Audit lines: actor, action, amount when money or forgiveness is involved, time, correlation id. Actions include create, send, accept, reject, cancel-before-acceptance, payment confirmed, payment failed, cash recorded, waiver, unpaid close, reminder, edit proposed, edit approved, edit rejected, edit auto-approved, overdue, and documented correction. The engineering spec's word "forgiveness" is the waiver action.

An edit to a line's description, amount, or quantity waits for the other partner. The approval wait defaults to 5 days. The backend may set a different period. When the wait ends, the edit auto-approves.
