---
title: Friend Debt
status: final
created: 2026-10-28
updated: 2026-10-28
---

# PRD: Friend Debt

## 0. Document Purpose

This PRD is for the product owner, UX, architecture, and the epic breakdown. It states what the customer-facing debt record must do. Vocabulary is fixed in the Glossary. Features group the behavior, and each capability is a numbered FR. Open questions and assumptions were resolved. §13 and §14 are empty. The engineering contract is `docs/friend_debt_service.md`. Host embedding, the payment callback, the friend mock, and the record fields live in `addendum.md`. This PRD builds on that contract. It does not restate the package API. The Zoho source file named in the contract is not in this repo.

## 1. Vision

Friend Debt lets a verified merchant, or a bank customer, record what a Friend owes, inside the financial app that Friend already uses. The Debtor is told in that app and can pay through the Host app. The Debt stays. It cannot be deleted. A change to an Invoice line waits for the other partner. That change is not payable until the other partner approves it, or until the Approval wait ends and the change approves itself.

MVP does not earn a fee. This PRD sets no loyalty window and no success rate. A Waiver is shown as Waived. Cash the Creditor received outside the app is shown as Paid cash. Money confirmed from the Host app is shown on the invoice as "paid". Money the Creditor records from an app other than the Host app is shown as "paid from other app". Status Paid means Outstanding is zero. It does not, by itself, mean the Original amount was Collected cash.

The product is an invoice service on its own Invoice tenant, embedded in the Host app. Friend management stays in the Host app. The module only shows the Friends that tenant is allowed to show for the signed-in person. Until the friend API exists, that list is a mock.

## 2. Target User

### 2.1 Jobs To Be Done

- When a shopkeeper or a bank customer is owed money by someone who is already a Friend, they need a record the Debtor will see in the financial app, and a record that will still be there after settlement.
- When a Debtor is told they owe money, they need to see who claims it, accept or reject it, and pay inside the Host app without the record disappearing.
- When part of a Debt has been paid and the rest will not be collected, the Creditor needs to waive the rest and have both people see that the rest was Waived.
- When the Host app has taken the money and the phone dies, both people need the Debt to catch up from Backend verification, once, and not charge again.
- When a record is wrong, either person needs one written objection and one documented outcome, with the Debt still on the books.

### 2.2 Non-Users (v1)

- A person who is not already a Friend.
- An unverified merchant.
- Anyone whose job is to delete a Debt, hide it from the Debtor, or run a collections desk.
- A product owner who needs this feature to produce a fee.

### 2.3 Key User Journeys

Huda, Sami, and Nabil name the scenes below. They are not a customer list. A real person arrives from the friend import. On his own list he sees the Nickname he set, and the Imported name when he has not set one.

**UJ-1. Huda records what Sami owes the shop.**

- **Persona + context:** Huda is a verified shopkeeper. Sami is already her Friend in the Host app.
- **Entry state:** Huda is signed in to the Host app and opens Friend Debt.
- **Path:** She records a new Debt: amount, description, optional Due date. Sami is not told yet. She picks Sami from the Friend list, or scans his account QR, and sends.
- **Climax:** Sami receives an In-app notification with Huda's Creditor name, the amount, the description, the Registration date, and the Notification date. The Debt is Pending acceptance.
- **Resolution:** The Debt exists. Neither of them can delete it.
- **Edge case:** A QR or link for someone who is not a Friend is refused. The module does not offer to add a Friend. A bank-customer Creditor follows this same path. The In-app notification shows that person's Creditor name instead of a shop name.

**UJ-2. Sami pays part of the Debt in the Host app.**

- **Persona + context:** Sami was just told about Huda's Debt. He is signed in.
- **Entry state:** He opens the In-app notification.
- **Path:** He sees those fields, including the Notification date. He accepts. He pays an amount up to Outstanding. The Host app takes the money.
- **Climax:** Backend verification records one Host payment. The invoice label is "paid". If he paid less than Outstanding, the Debt is Partially paid. Both people are told the amount and which Debts were covered.
- **Resolution:** He can leave. If the phone dies after the Host app has taken the money, Backend verification still records that Payment once.
- **Edge case:** If he cancels, or the Host app fails, the Status stays as it was and he sees the reason when the Host app returned one. If the Due date has already passed when he accepts, the Debt becomes Overdue instead of Due.

**UJ-3. Huda waives the rest, then reads the invoice.**

- **Persona + context:** Sami has paid part of the Debt. Huda will not collect the rest.
- **Entry state:** Huda opens that Partially paid Debt.
- **Path:** She enters a Waiver up to Outstanding. She does not send him through the Host app payment. Later she opens Historical invoices.
- **Climax:** The remainder shows as Waived. If Outstanding reaches zero, the Status is Paid, and the invoice lists the Host payment as "paid" and the remainder as Waived. Collected cash includes the Host payment and excludes Waived.
- **Resolution:** Both people see those lines in History. The Debt remains.
- **Edge case:** Huda cannot use Waiver on a Due or Overdue Debt that has never had a Payment. That close is Unpaid close, not Waiver.

**UJ-4. Sami edits a line, and Huda approves it.**

- **Persona + context:** Sami was sent a Debt that is not Rejected and not Paid. A line's amount or quantity is wrong.
- **Entry state:** He opens the Debt.
- **Path:** He changes the description, the amount, or the quantity. The Debt becomes Disputed. He can still pay the approved amount, in part or in full. The new figures cannot be paid yet. Waiver, cash, other-app payment, and Reminder stop. Huda can approve the Edit or reject it.
- **Climax:** If Huda approves, the new line is the one that can be paid. If she does nothing, the Edit approves itself after 5 days, or after the period the backend specifies.
- **Resolution:** The Debt remains. Sami still cannot delete it or hide it.
- **Edge case:** If Huda rejects the Edit, the previous description, amount, and quantity return, and the Debt can be paid again on those figures.

**UJ-5. Nabil closes a Debt nobody has paid.**

- **Persona + context:** Nabil is operations. A Due Debt has no Payment and no Waiver, and it should not stay open.
- **Entry state:** Nabil opens Unpaid debts, signed in through the Host app with an operations session.
- **Path:** He opens the Debt, reads who owes whom, enters a required reason, and closes it.
- **Climax:** Outstanding becomes zero by Unpaid close. The Settlement source of that amount is Waived. The Status is Paid. Both people are told, and History keeps the reason.
- **Resolution:** The Debt remains. Collected cash does not include that amount. Huda does not get a Waiver action for this case.
- **Edge case:** A Debt that already has a Payment is not on this list. The rest of that Debt is a Waiver by the creating Creditor.

## 3. Glossary

- **Debt** — The record a Creditor keeps against one Debtor. It is never deleted. One Status at a time. One Currency.
- **Creditor** — The verified merchant or bank customer who creates the Debt. Only the creating Creditor may waive, remind, record Paid cash, cancel before acceptance, or resolve their own Dispute.
- **Debtor** — The Friend the Debt is recorded against. A bank customer. May accept, reject, pay, and propose an Edit. May not delete the Debt or hide it. A change to a line is not payable until the other partner approves it or the Approval wait ends.
- **Host app** — The financial app that embeds the module, signs the customer in, and moves money. Banky is the first Host app. Another app may embed the same module.
- **Invoice tenant** — The tenant that owns Debts. The Host app opens the module in this tenant. Friends are viewed here. They are not managed here.
- **Friend** — A person already linked to the signed-in customer by the Host app and supplied to this service by the friend import. The module can show Friends. It cannot add, approve, or remove them.
- **Imported name** — The name the friend import supplies for a Friend. This service does not edit it.
- **Nickname** — The signed-in user's own label for a Friend on his list. He can set it or change it. His list shows the Nickname when it is set, and the Imported name when it is empty. The other person does not see that Nickname. A Nickname change does not change the friend import.
- **Original amount** — The sum of the Invoice line totals. A line total is that line's amount times its quantity. The Debtor cannot change it except by an Edit the other partner must approve.
- **Invoice line** — One row on a Debt. It has a description, an amount, and a quantity. Currency and Debtor are not fields on the line.
- **Edit** — A change to the description, the amount, or the quantity of an Invoice line. It does not apply, and it is not payable, until the other partner approves it or the Approval wait ends.
- **Approval wait** — Five days, unless the backend specifies another period. At the end, an Edit that is still waiting approves itself.
- **Outstanding** — Original amount minus Payments minus Waived amounts. Never below zero.
- **Payment** — A reduction from money received. Settlement source is Paid cash, Host payment, or Other-app payment.
- **Paid cash** — Settlement source for money the creating Creditor records as cash received outside the Host app. It does not call the Host app. The invoice label is "paid cash".
- **Host payment** — Settlement source for money the Debtor pays in the Host app, after Backend verification. The invoice label is "paid". This is not the Status named Paid.
- **Other-app payment** — Settlement source for money the creating Creditor records as received through an app other than the Host app. It does not call the Host app. The invoice label is "paid from other app".
- **Waiver** — The creating Creditor's action on a Partially paid Debt that reduces Outstanding without a Payment.
- **Waived** — Settlement source for a Waiver or an Unpaid close. Not Collected cash. The invoice label is "waived".
- **Unpaid close** — A Documented correction that sets Outstanding to zero on a Due or Overdue Debt that has no Payment. The amount is Waived. It is not a Waiver.
- **Collected cash** — The sum of Paid cash, Host payment, and Other-app payment. Excludes Waived.
- **Settlement source** — Paid cash, Host payment, Other-app payment, or Waived. Every settled amount on a Historical invoice has exactly one.
- **Historical invoice** — A Debt as listed in the history report, with each settled amount and its Settlement source.
- **Currency** — The single currency stored on the Debt. The module does not convert.
- **Due date** — Optional date on the Debt. It does not, by itself, change Status.
- **Registration date** — The date the Debt was sent.
- **Notification date** — The date an In-app notification was created. Every notice shows it.
- **Creditor name** — Shop name for a merchant Creditor, or the Imported name for a bank-customer Creditor. It is not the viewer's private Nickname.
- **Status** — One of Draft, Pending acceptance, Due, Overdue, Partially paid, Paid, Rejected, Disputed. Arabic labels on screen are مسودة، بانتظار قبول العميل، مستحقة، متأخرة، مسددة جزئيًا، مسددة، مرفوضة، متنازع عليها.
- **Past due** — A mark on a Partially paid Debt whose Due date has passed. The Status stays Partially paid.
- **Abandoned draft** — A Draft the Creditor set aside before send. Status stays Draft. It cannot be sent.
- **Cancelled before acceptance** — A Pending acceptance Debt the Creditor withdrew. Status stays Pending acceptance. The list shows it as cancelled. It cannot be accepted, rejected, or paid.
- **Reminder** — One In-app notification from the creating Creditor about one or more payable Debts for the same Debtor. It does not change Status.
- **Dispute** — The Status while an Edit is waiting for the other partner. It is the only use of this Status. The Debtor can still pay the approved Outstanding, in part or in full. The proposed lines are not payable. Waiver, Paid cash, Other-app payment, and Reminder stop until the Edit is approved or rejected. There is no message thread.
- **Documented correction** — A reasoned change after acceptance, by the creating Creditor or a System admin. It never deletes the Debt.
- **In-app notification** — The notice inside the Host app. It shows its Notification date. It is the notice of record even when the phone shows no system push.
- **Backend verification** — The host backend and the invoice backend confirming a Host app payment with each other. The Debt updates from that confirmation.
- **System admin** — The operations role. May apply a Documented correction and may run Unpaid close. No other operations product in v1.
- **History** — The append-only account of the Debt, visible to the Creditor and the Debtor. Payment lines and Waived lines look different.

## 4. Features

### 4.1 The Debt record

**Description:** Every Debt has one Status, one Currency, and an Outstanding that both parties can trust. Realizes UJ-1, UJ-3, UJ-5.

**Functional Requirements:**

#### FR-1: Keep one standing for each Debt

The Debt shows one Status, computed from its Due date, Payments, and Waived amounts.

**Consequences (testable):**
- Outstanding equals Original amount minus Payments minus Waived amounts, and is never negative.
- Draft is unsent. Pending acceptance is sent and not yet accepted.
- Accept moves Pending acceptance to Due, or to Overdue when the Due date is already past.
- Due becomes Overdue when the Due date passes and Outstanding still equals the Original amount.
- A Payment greater than zero and less than the Outstanding at that moment moves Due or Overdue to Partially paid. A Waiver cannot be the event that creates Partially paid.
- Partially paid stays Partially paid while Outstanding remains above zero, including after the Due date, and then carries Past due.
- Paid means Outstanding is zero. Paid does not mean the Original amount is Collected cash.
- Rejected is only the Debtor's rejection before acceptance.
- Disputed means an Edit is waiting. The previous Invoice lines stay in force until the Edit is approved or rejected. The Debtor can still pay that approved Outstanding, in part or in full. The proposed lines are not payable. Disputed does not become Paid by itself.
- One Currency per Debt. A group of Debts can be paid together only when they share that Currency. There is no conversion.

#### FR-2: Keep the Debt

The Creditor, the Debtor, and the System admin cannot delete a Debt.

**Consequences (testable):**
- The Debtor is offered no delete and no hide. A change to description, amount, or quantity is an Edit under FR-16, not a silent change.
- Abandoned draft, Cancelled before acceptance, Paid, Rejected, Unpaid close, and loss of Friend all leave the Debt in place.
- History remains readable on that Debt for both parties.

### 4.2 Record and send

**Description:** The Creditor prepares a Debt and sends it to one Friend. The Debtor hears nothing until send. Realizes UJ-1.

**Functional Requirements:**

#### FR-3: Create a Draft

The Creditor can record a Draft with one or more Invoice lines, a Currency, and an optional Due date. Each line has a description, an amount above zero, and a quantity above zero.

**Consequences (testable):**
- The Draft is bound to the Creditor and the Invoice tenant.
- Original amount is the sum of the line totals.
- The Debtor is not notified.
- A line amount or quantity at zero or below, a missing Currency, or a missing description is refused.

#### FR-4: Send to a Friend

The Creditor can send a Draft to one Friend, chosen from the Friend list, that Friend's account QR, or a debt-request link.

**Consequences (testable):**
- Send requires an active Friend link. Otherwise the Debt stays unsent and the Creditor sees the refusal.
- Send moves the Debt to Pending acceptance and stores the Debtor.
- The Debtor gets one In-app notification containing the Creditor name, the amount, the description, the Registration date, and the Notification date. On this notice the Notification date is the Registration date. The Due date is not on the notice.
- The debt-request link identifies the Debt and does not carry the customer's session.

#### FR-5: Abandon a Draft

The Creditor can abandon a Draft before send.

**Consequences (testable):**
- The Debt becomes an Abandoned draft, stays Draft, and cannot be sent afterward.
- It stays on the Creditor's Debt list, marked abandoned, and is not shown to the Debtor.
- Abandon is not offered after send.

#### FR-6: Allow only a verified merchant

A merchant Creditor must already be verified. A bank-customer Creditor is allowed on the same record-and-send path.

**Consequences (testable):**
- An unverified merchant is refused.
- The module does not verify merchants.

### 4.3 Answer or withdraw

**Description:** The Debtor accepts or rejects. The Creditor can withdraw only before acceptance. Realizes UJ-2.

**Functional Requirements:**

#### FR-7: Accept

The Debtor can accept a Pending acceptance Debt that is not Cancelled before acceptance.

**Consequences (testable):**
- Acceptance follows FR-1.
- Rejection is no longer available after acceptance.

#### FR-8: Reject

The Debtor can reject only before acceptance.

**Consequences (testable):**
- The Status becomes Rejected.
- A Rejected Debt cannot be paid, waived, reminded, or accepted later.

#### FR-9: Cancel before acceptance

The creating Creditor can cancel only while the Debt is Pending acceptance.

**Consequences (testable):**
- The Debt becomes Cancelled before acceptance and is shown as cancelled on the list.
- It cannot be accepted, rejected, or paid.
- Cancel does not add a ninth Status.

### 4.4 Pay

**Description:** The screen may show many Invoice lines or many Debts. The Debtor pays the approved amount in part or in full. That action asks the Host app for one payment. The Invoice tenant believes that money only after Backend verification. Realizes UJ-2.

**Functional Requirements:**

#### FR-10: Pay one Debt

The Debtor can pay the approved Outstanding of one Debt in Due, Overdue, Partially paid, or Disputed, for an amount greater than zero and no greater than that approved Outstanding.

**Consequences (testable):**
- There is no Pay action on Draft, Pending acceptance, Rejected, or Paid.
- On a Disputed Debt the payable amount is the approved Outstanding. The proposed Invoice lines are not payable.
- The screen may show many Invoice lines. The Debtor still asks the Host app for one payment, not one payment per line.
- The Debtor sees the Creditor name and the amount before that one payment.

#### FR-11: Pay several Debts from one Creditor

The Debtor can select two or more payable Debts that share one Creditor and one Currency, including a Disputed Debt at its approved Outstanding, and pay them in one Host app payment.

**Consequences (testable):**
- The screen may show many Debts. The Host app is asked once.
- The amount is the sum of the approved Outstandings. The Debtor cannot type a different group amount.
- A selection that mixes Creditors, or mixes Currencies, is refused.
- The Debtor sees the Creditor name and the total before that one payment.
- After Backend verification, each selected Debt that is still open receives a Host payment for its approved Outstanding. Open means Due, Overdue, Partially paid, or Disputed.
- A proposed Edit is not part of that amount.
- A selected Debt that received Paid cash or a Waiver while the transfer was in flight is not included. That Host payment does not post onto it.

#### FR-12: Confirm payment by Backend verification

A successful Host app payment is recorded only by Backend verification between the host backend and the invoice backend.

**Consequences (testable):**
- The Debt changes only after verification succeeds. Failure or cancel leaves every selected Debt unchanged, and the Debtor sees the reason when the Host app returned one.
- If the phone dies after the Host app has taken the money, verification still records the Payment.
- The same payment is recorded once. It does not charge the Debtor again.
- Both parties receive an In-app notification with the amount and the Debts covered.
- Each verified Host app Payment is a Host payment on the still-open Debts only. The invoice label is "paid".
- If the host transferred more than the sum of those still-open Outstandings, the invoice service records only that open sum. The extra is not recorded as Paid cash, as a Waiver, or as a payment on a Disputed Debt.
- A retried verification does not add a second Payment.

#### FR-13: Record Paid cash

The creating Creditor can record cash received against one Debt in Due, Overdue, or Partially paid, for an amount greater than zero and no greater than Outstanding.

**Consequences (testable):**
- The record does not ask the Host app to move money.
- It is a Payment with Settlement source Paid cash, so it can move the Debt to Partially paid or to Paid under FR-1.
- The Debtor sees the line in History at once.
- It is refused while the Debt is Disputed, and it is refused for anyone other than the creating Creditor.
- A group payment cannot be recorded as Paid cash.

#### FR-24: Record an Other-app payment

The creating Creditor can record that the Debtor paid through an app other than the Host app, against one Debt in Due, Overdue, or Partially paid, for an amount greater than zero and no greater than Outstanding.

**Consequences (testable):**
- The record does not ask the Host app to move money.
- It is a Payment with Settlement source Other-app payment. The invoice label is "paid from other app". It can move the Debt to Partially paid or to Paid under FR-1.
- The Debtor sees the line in History at once.
- It is refused while the Debt is Disputed, and it is refused for anyone other than the creating Creditor.
- A group payment cannot be recorded as an Other-app payment.
- Another app does not submit this payment. The creating Creditor records it, the same way as Paid cash, with this Settlement source.

### 4.5 Waiver

**Description:** The creating Creditor waives part or all of what remains after at least one Payment. Realizes UJ-3.

**Functional Requirements:**

#### FR-14: Waive a Partially paid Debt

The creating Creditor can waive an amount greater than zero and no greater than Outstanding, only while Status is Partially paid.

**Consequences (testable):**
- The same rule applies to a merchant and to a bank-customer Creditor.
- A Debtor, anyone other than the creating Creditor, a Due Debt, and an Overdue Debt are refused.
- The amount is Waived. It is not a Payment and does not ask the Host app to move money.
- While Outstanding remains above zero, Status stays Partially paid.
- When Outstanding reaches zero, Status becomes Paid and the waived portion shows as Waived, not as money the Debtor transferred.
- History shows the Waiver on its own line, visually distinct from a Payment.

### 4.6 Reminder

**Description:** The Creditor can nudge the Debtor once for one Debt or for several Debts against that same Debtor.

**Functional Requirements:**

#### FR-15: Send a Reminder

The creating Creditor can send one Reminder for one or more Debts in Due, Overdue, or Partially paid that share that Creditor and that Debtor.

**Consequences (testable):**
- The Creditor sees the count and the total Outstanding before sending.
- The In-app notification carries the Creditor name, the count, the total Outstanding, the Debt identities, and the Notification date.
- Status does not change.
- A Reminder is refused while any selected Debt is Disputed.
- A system push may repeat that notice. The In-app notification remains the notice of record if push is absent.

### 4.7 Dispute and Unpaid close

**Description:** An Edit to an Invoice line is the only Dispute. The other partner approves it or rejects it. If that partner does not act, the Edit approves itself when the Approval wait ends. A Due or Overdue Debt that nobody has paid is closed by System admin, not by Waiver. Realizes UJ-4, UJ-5.

**Functional Requirements:**

#### FR-16: Propose an Edit

Either partner can change the description, the amount, or the quantity of an Invoice line on a Debt that is not Rejected and not Paid.

**Consequences (testable):**
- Status becomes Disputed. The previous description, amount, and quantity stay in force until approval.
- The Debtor can still pay the approved Outstanding, in part or in full, in one payment to the Host app.
- The new figures are not payable until the Edit is approved or the Approval wait ends.
- Waiver, Paid cash, Other-app payment, and Reminder are unavailable until the Edit is approved or rejected.
- Currency and the Debtor do not change.
- An Edit that would put Original amount below Payments plus Waived amounts already recorded is refused.
- The other partner is told. There is no message thread.
- The Debtor still cannot delete or hide the Debt.

#### FR-17: Approve, reject, or auto-approve an Edit

The other partner can approve or reject the Edit. If that partner does not act, the Edit approves itself when the Approval wait ends.

**Consequences (testable):**
- Approve applies the new description, amount, and quantity, recomputes Outstanding under FR-1, and leaves Disputed. If Payments plus Waived amounts already recorded are above the new Original amount, Approve is refused and the Edit is rejected.
- When a payment brings the approved Outstanding to zero, the waiting Edit is rejected and the Debt leaves Disputed under FR-1.
- Reject restores the previous description, amount, and quantity, and leaves Disputed. The Debt is not deleted.
- Auto-approve has the same result as Approve. The Approval wait is 5 days unless the backend specifies another period.
- The partner who made the Edit cannot approve it himself.
- Both parties see the outcome in History and receive an In-app notification.
- System admin is not required to resolve an Edit. Unpaid close stays FR-18.

#### FR-18: Close an unpaid Debt

System admin can close a Due or Overdue Debt whose Outstanding still equals the Original amount, from the Unpaid debts screen inside the module.

**Consequences (testable):**
- The screen lists only those Debts.
- A required reason is stored in History.
- The full Outstanding is Waived by Unpaid close, Status becomes Paid, and the Debt remains.
- That amount is excluded from Collected cash.
- The creating Creditor does not receive a Waiver action for this case.
- A Debt that already has a Payment is absent from the list.
- Both parties receive an In-app notification and see the reason.
- The Debtor is not offered this action.

### 4.8 History and Historical invoices

**Description:** Both parties can read what happened. The report tells Collected cash apart from Waived. Realizes UJ-3.

**Functional Requirements:**

#### FR-19: Show History to both parties

The Creditor and the Debtor can each open History on the Debt.

**Consequences (testable):**
- History is append-only and includes create, send, accept, reject, cancel before acceptance, Host payment, failed payment, Paid cash, Other-app payment, Waiver, Unpaid close, Reminder, Dispute opened, Dispute resolved, Overdue, and Documented correction.
- Each entry shows who acted, what they did, the amount when money or a Waived amount is involved, and when it happened.
- Payment lines and Waived lines are visually distinct.

#### FR-20: List Historical invoices by Settlement source

Historical invoices list each settled amount with exactly one Settlement source: Paid cash, Host payment, Other-app payment, or Waived. The labels on the report are "paid cash", "paid", "paid from other app", and "waived".

**Consequences (testable):**
- The report shows one total per Settlement source. Collected cash is Paid cash plus Host payment plus Other-app payment.
- Waived is its own total and is never folded into Collected cash.
- A Paid Debt whose lines include Waived still shows those Waived lines. Status Paid is not displayed as proof that the Original amount was collected.
- The lines on a Debt sum to the Original amount once Outstanding is zero. A Partially paid Debt shows the remainder as still Outstanding, not as Waived, until a Waiver or Unpaid close exists.

### 4.9 Friends

**Description:** The Creditor picks a Friend the friend import supplied for this Invoice tenant. This service can change that Friend's Nickname. Friendship itself is managed in the Host app. Realizes UJ-1.

**Functional Requirements:**

#### FR-21: Show Friends, and do not manage them

The Debtor picker lists the current Friends the friend import supplied for the signed-in Creditor in this Invoice tenant.

**Consequences (testable):**
- Each row on his list shows his Nickname when this service has one, and the Imported name when it does not.
- The module has no add-Friend, approve-Friend, or remove-Friend action.
- A QR or link for a person outside that list is refused with the same refusal as send.
- Until the friend import is provided, the list is a mock for that Invoice tenant and that signed-in Creditor. Replacing the mock with the import does not change this behavior.
- An empty sign-in cannot record, pay, waive, record Paid cash, record an Other-app payment, or change a Nickname.

#### FR-22: Keep old Debts after a Friend is removed

New Debts between two people stop when either side removes the Friend. Debts that already exist stay.

**Consequences (testable):**
- Create and send are refused for a removed Friend.
- On an existing Debt, the Debtor can still pay, and can still approve or reject an Edit that is waiting for him.
- On an existing Debt, the Creditor can still record Paid cash, record an Other-app payment, waive, send a Reminder, and propose an Edit.
- Neither person gains the other person's actions.
- Status, Outstanding, History, and Historical invoices for existing Debts stay available. They are not frozen.
- A Nickname already stored for that Friend stays stored. It does not restore the Friend link.

#### FR-25: Change a Nickname

The signed-in user can set or change the Nickname of a Friend on his own list.

**Consequences (testable):**
- The friend import is not updated.
- An empty Nickname falls back to the Imported name on his list.
- His list uses his Nickname. The other person's list does not.
- An In-app notification uses the Creditor name, not his private Nickname.
- Amounts, Status, and History entries already written stay as they were.
- The other person does not have to accept the Nickname.

### 4.10 Open from the Host app

**Description:** The customer reaches the module from the Host app, already signed in. The module does not move money and does not hold the host's API secrets.

**Functional Requirements:**

#### FR-23: Open inside the Host app

A signed-in customer can open the module from the Host app in the Invoice tenant.

**Consequences (testable):**
- The Host app can open it without passing API secrets.
- An incoming debt link opens in the Host app for the signed-in customer. The link itself does not contain the session.
- Only the Host app moves money, and only when the Debtor pays.
- Waiver, Unpaid close, Paid cash, and Other-app payment do not move money.
- A Debt belonging to another Invoice tenant is not shown.

## 5. Cross-Cutting Quality

**NFR-1. Tenant isolation.** Every read and write is limited to the Invoice tenant. Another tenant's Debt is not returned.

**NFR-2. Exact amounts.** Amounts are exact decimal quantities. A binary floating-point value is not a valid amount.

**NFR-3. One payment, one record.** Backend verification is idempotent. One successful Host app payment produces one Payment on each covered Debt and one charge of the Debtor.

**NFR-4. Notice of record.** The In-app notification is authoritative, and every notice shows its Notification date. Absence of a system push does not remove it.

**NFR-5. Retention.** The Debt and its History are kept through abandon, cancel, payment, Waiver, Unpaid close, Dispute, and loss of Friend.

**NFR-6. Same numbers.** The Creditor and the Debtor see the same Outstanding, the same Status, and the same Settlement sources.

## 6. Constraints and Guardrails

- The module does not add Friends, does not verify merchants, does not own bank accounts, and does not register push tokens.
- The module does not move money. The Host app does, and only for a Debtor payment.
- MVP has no fee. This PRD sets no loyalty window and no success rate.
- A debt link identifies the Debt and does not carry the session.
- Collected cash excludes every Waived amount, including Unpaid close.
- Unpaid debts is shown only when the Host app marks the session as System admin. The module does not grow its own admin login.

## 7. Integration and Dependencies

- **Host app:** sign-in, Friend management, merchant verification already done, the payment the Debtor starts, and optional system push of an existing In-app notification.
- **Invoice tenant:** Debts, History, Historical invoices, In-app notifications, Waiver, and Unpaid close.
- **Friends:** viewed from the Invoice tenant. The API comes later. v1 reads a mock. The picker behavior in FR-21 stays when the API arrives.
- **Payments:** Backend verification between the host backend and the invoice backend, as FR-12. The transport is in `addendum.md`.

## 8. Information Architecture

Surfaces inside the module:

1. **Debt list** — Debts for the signed-in Creditor or Debtor. Cancelled before acceptance appears as cancelled.
2. **Record a Debt** — amount, description, optional Due date, then send.
3. **Choose a Friend** — the tenant's Friend list, a QR scan, or a debt-request link.
4. **Debt detail** — Status, Outstanding, History, and only the actions that person may take.
5. **Pay** — one amount, or a same-Creditor total, shown before the Host app is asked to move money.
6. **Historical invoices** — settled amounts with Settlement source, plus one total per source from FR-20.
7. **Unpaid debts** — System admin only.

Record cash, record an Other-app payment, Waiver, Reminder, and an Edit are actions on Debt detail, not separate products. The other partner approves or rejects the Edit on that Debt. There is no case queue.

## 9. Aesthetic and Tone

The module sounds like a bank record both people can read aloud. Sentences are short. Amounts carry the Currency. Names and dates are specific. The Arabic Status labels in the Glossary are the labels on screen.

A Waived amount is called Waived. It is never described as a transfer by the Debtor. Status Paid is allowed to sit next to a Waived line, and the line says Waived so the word مسددة is not doing that work alone.

The voice does not shame, joke, count down, or celebrate. Overdue is the Status label and the Past due mark, not a collections banner. Actions the person cannot take are absent. The module uses the Host app's visual language so it feels like the same app the customer came to stay in.

Anti-references: a collections poster, a chat thread on the Dispute, a celebratory "you got paid" moment when the source is Waived.

## 10. Non-Goals (Explicit)

- v1 does not add, approve, or remove Friends.
- v1 does not move money inside the module, convert Currency, verify merchants, or register push tokens.
- v1 does not delete a Debt or hide it from the Debtor.
- v1 does not run a ticket queue, a message thread, or an assignee. The Approval wait is the only timer, and it auto-approves an Edit.
- v1 does not charge a fee or report a revenue target.
- v1 does not add a Status for cancel. Cancelled before acceptance stays Pending acceptance.
- v1 does not let Waiver close a Due or Overdue Debt that has no Payment.
- v1 does not build an operations product beyond the Unpaid debts screen.

## 11. MVP Scope

### 11.1 In Scope

- Draft, send, accept, reject, abandon, and cancel before acceptance.
- Single pay, group pay, and Backend verification.
- Paid cash and Other-app payment recorded by the creating Creditor.
- Waiver on Partially paid Debts.
- Reminder for one Debtor.
- An Edit to description, amount, or quantity, approved by the other partner, rejected by that partner, or auto-approved after 5 days or the period the backend specifies.
- Unpaid close for System admin, on the Unpaid debts screen.
- History and Historical invoices with the four Settlement sources.
- Friend list from the friend import, backed by a mock until that import exists, plus a Nickname this service can change.
- Open from the Host app with no fee.

### 11.2 Out of Scope for MVP

- Live friend import. The mock stands in until that import is provided. Picker behavior does not change when it arrives. The Nickname change is in scope while the import is still a mock.
- Loyalty window, success rate, and any numeric success target.
- Due date on the In-app notification. The notice shows its Notification date instead.
- Ticketing, currency conversion, debt deletion, and any fee.
- A System admin product beyond the Unpaid debts screen.

## 12. Success Metrics

Deferred by decision on 2026-10-28. This PRD defines no loyalty window, no success rate, and no numeric target. How a Paid Debt is shown stays a product rule in FR-20. It is not a success measure.

## 13. Open Questions

None.

## 14. Assumptions Index

None.

## ملخص

### 0. غرض المستند

يبين هذا المستند ما يجب أن يفعله سجل الدين الظاهر للعميل. المفردات مثبتة في المسرد، والسلوك مجموع في قدرات مرقمة. يبني المستند على عقد الخدمة الهندسي ولا يعيد واجهة الحزمة. حقول السجل وربط التطبيق المضيف واستدعاء الدفع ونسخة الأصدقاء التجريبية تعيش في الملحق. ملف المصدر المسمى في العقد، زوهو، غير موجود في هذا المستودع.

### 1. الرؤية

يتيح دين الأصدقاء لتاجر موثق، أو لعميل مصرف، أن يسجل ما يدين به صديق داخل التطبيق المالي الذي يستخدمه ذلك الصديق أصلاً. يُبلَّغ المدين في ذلك التطبيق ويستطيع السداد عبر التطبيق المضيف. يبقى الدين. لا يُحذف. تعديل وصف سطر الفاتورة أو مبلغه أو كميته ينتظر الشريك الآخر. لا يُسدد ذلك التعديل حتى يوافق الشريك الآخر، أو حتى تنتهي مهلة الموافقة فيُعتمد التعديل من تلقاء نفسه.

لا تربح النسخة الأولى رسماً. لا يحدد هذا المستند نافذة ولاء ولا معدل نجاح. يظهر الإعفاء بوصفه معفى. النقد الذي تسلمه الدائن خارج التطبيق يظهر بوصفه نقداً مدفوعاً. المال المؤكد من التطبيق المضيف يظهر على الفاتورة بوصفه مدفوعاً. المال الذي يسجله الدائن من تطبيق غير التطبيق المضيف يظهر بوصفه مدفوعاً من تطبيق آخر. تعني حالة المسددة أن المتبقي صفر. لا تعني وحدها أن أصل المبلغ صار نقداً محصلاً.

المنتج خدمة فواتير على مستأجر فاتورة خاص به، مضمّن في التطبيق المضيف. تبقى إدارة الأصدقاء في التطبيق المضيف. تعرض الوحدة الأصدقاء الذين يُسمح لهذا المستأجر بعرضهم للشخص الموقع. إلى أن يوجد استيراد الأصدقاء، تبقى تلك القائمة نسخة تجريبية.

### 2. المستخدم المستهدف

#### 2.1 الأعمال المطلوبة

- حين يكون صاحب متجر أو عميل مصرف دائناً لشخص هو صديق أصلاً، يحتاج سجلاً يراه المدين في التطبيق المالي، وسجلاً يبقى بعد التسوية.
- حين يُبلَّغ المدين بأنه مدين، يحتاج أن يرى من يطالب، وأن يقبل أو يرفض، وأن يسدد داخل التطبيق المضيف من غير أن يختفي السجل.
- حين يُسدد جزء من الدين ولن يُحصَّل الباقي، يحتاج الدائن أن يعفي الباقي وأن يرى الشخصان أن الباقي معفى.
- حين يأخذ التطبيق المضيف المال ثم ينطفئ الهاتف، يحتاج الشخصان أن يلحق الدين من تحقق الخادمين، مرة واحدة، وألا يُخصم مرة أخرى.
- حين يكون السجل خاطئاً، يحتاج أي طرف اعتراضاً مكتوباً واحداً ونتيجة موثقة واحدة، مع بقاء الدين في الدفاتر.

#### 2.2 من ليس مستخدماً في النسخة الأولى

- شخص ليس صديقاً أصلاً.
- تاجر غير موثق.
- من عمله حذف دين، أو إخفاؤه عن المدين، أو إدارة مكتب تحصيل.
- صاحب منتج يحتاج هذه القدرة لإنتاج رسم.

#### 2.3 الرحلات الأساسية

هدى وسامي ونبيل يسمون المشاهد أدناه. هم ليسوا قائمة عملاء. الشخص الحقيقي يأتي من استيراد الأصدقاء. على قائمته الخاصة يرى اللقب الذي وضعه، والاسم المستورد حين لم يضع لقباً.

**الرحلة 1. تسجل هدى ما يدين به سامي للمتجر.**

- **الشخصية والسياق:** هدى صاحبة متجر موثقة. سامي صديقها أصلاً في التطبيق المضيف.
- **حالة الدخول:** هدى موقعة في التطبيق المضيف وتفتح دين الأصدقاء.
- **المسار:** تسجل ديناً جديداً: مبلغاً ووصفاً وتاريخ استحقاق اختيارياً. لا يُبلَّغ سامي بعد. تختاره من قائمة الأصدقاء، أو تمسح رمز حسابه، ثم ترسل.
- **الذروة:** يتلقى سامي إشعاراً داخل التطبيق باسم هدى بوصفها دائنة، والمبلغ، والوصف، وتاريخ التسجيل، وتاريخ الإشعار. الدين بانتظار قبول العميل.
- **النتيجة:** الدين موجود. لا يستطيع أي منهما حذفه.
- **الحافة:** يُرفض رمز أو رابط لشخص ليس صديقاً. لا تعرض الوحدة إضافة صديق. يتبع دائن هو عميل مصرف المسار نفسه. يظهر في الإشعار اسم ذلك الشخص بوصفه دائناً بدلاً من اسم المتجر.

**الرحلة 2. يسدد سامي جزءاً من الدين في التطبيق المضيف.**

- **الشخصية والسياق:** أُبلغ سامي لتوه بدين هدى. هو موقع.
- **حالة الدخول:** يفتح الإشعار داخل التطبيق.
- **المسار:** يرى تلك الحقول، ومنها تاريخ الإشعار. يقبل. يسدد مبلغاً لا يزيد على المتبقي. يأخذ التطبيق المضيف المال.
- **الذروة:** يسجل تحقق الخادمين سداداً واحداً من التطبيق المضيف. تسمية الفاتورة مدفوع. إن دفع أقل من المتبقي صار الدين مسدداً جزئياً. يُبلَّغ الشخصان بالمبلغ وبالديون التي غطاها.
- **النتيجة:** يستطيع المغادرة. إن انطفأ الهاتف بعد أن أخذ التطبيق المضيف المال، يظل التحقق يسجل ذلك السداد مرة واحدة.
- **الحافة:** إن ألغى، أو فشل التطبيق المضيف، تبقى الحالة كما كانت ويرى السبب حين أعاده التطبيق المضيف. إن كان تاريخ الاستحقاق قد مضى حين يقبل، يصير الدين متأخراً بدلاً من مستحق.

**الرحلة 3. تعفي هدى الباقي ثم تقرأ الفاتورة.**

- **الشخصية والسياق:** سدد سامي جزءاً من الدين. لن تحصّل هدى الباقي.
- **حالة الدخول:** تفتح هدى ذلك الدين المسدد جزئياً.
- **المسار:** تدخل إعفاء لا يزيد على المتبقي. لا ترسله عبر دفع التطبيق المضيف. لاحقاً تفتح الفواتير التاريخية.
- **الذروة:** يظهر الباقي معفى. إن بلغ المتبقي صفراً صارت الحالة مسددة، وتسرد الفاتورة سداد التطبيق المضيف بوصفه مدفوعاً والباقي بوصفه معفى. يشمل النقد المحصل سداد التطبيق المضيف ويستبعد المعفى.
- **النتيجة:** يرى الشخصان تلك الأسطر في السجل. يبقى الدين.
- **الحافة:** لا تستطيع هدى استخدام الإعفاء على دين مستحق أو متأخر لم يكن له أي سداد. ذلك الإغلاق إغلاق غير مدفوع، وليس إعفاء.

**الرحلة 4. يعدّل سامي سطراً، وتوافق هدى.**

- **الشخصية والسياق:** أُرسل إلى سامي دين ليس مرفوضاً ولا مسدداً. مبلغ سطر أو كميته خاطئة.
- **حالة الدخول:** يفتح الدين.
- **المسار:** يغير الوصف أو المبلغ أو الكمية. يصير الدين متنازع عليه. يستطيع سداد المبلغ المعتمد جزئياً أو كلياً. لا تُسدد الأرقام الجديدة بعد. يتوقف الإعفاء والنقد وسداد التطبيق الآخر والتذكير. تستطيع هدى اعتماد التعديل أو رفضه.
- **الذروة:** إن وافقت هدى صار السطر الجديد هو الذي يُسدد. إن لم تفعل شيئاً، يُعتمد التعديل بعد خمسة أيام، أو بعد المدة التي يحددها الخادم.
- **النتيجة:** يبقى الدين. ما زال سامي لا يستطيع حذفه أو إخفاءه.
- **الحافة:** إن رفضت هدى التعديل، يعود الوصف والمبلغ والكمية السابقة، ويمكن سداد الدين من جديد على تلك الأرقام.

**الرحلة 5. يغلق نبيل ديناً لم يسدده أحد.**

- **الشخصية والسياق:** نبيل من التشغيل. دين مستحق بلا سداد وبلا إعفاء، ولا ينبغي أن يبقى مفتوحاً.
- **حالة الدخول:** يفتح نبيل الديون غير المدفوعة، موقعاً عبر التطبيق المضيف بجلسة تشغيل.
- **المسار:** يفتح الدين، ويقرأ من يدين لمن، ويدخل سبباً مطلوباً، ويغلقه.
- **الذروة:** يصير المتبقي صفراً بالإغلاق غير المدفوع. مصدر تسوية ذلك المبلغ معفى. الحالة مسددة. يُبلَّغ الشخصان، ويحفظ السجل السبب.
- **النتيجة:** يبقى الدين. لا يشمل النقد المحصل ذلك المبلغ. لا تحصل هدى على فعل إعفاء لهذه الحالة.
- **الحافة:** الدين الذي له سداد أصلاً ليس في هذه القائمة. باقي ذلك الدين إعفاء من الدائن الذي أنشأه.

### 3. المسرد

- **الدين** — السجل الذي يبقيه الدائن على مدين واحد. لا يُحذف أبداً. حالة واحدة في كل مرة. عملة واحدة.
- **الدائن** — التاجر الموثق أو عميل المصرف الذي ينشئ الدين. وحده الدائن المنشئ يعفي ويذكّر ويسجل النقد المدفوع ويلغي قبل القبول أو يحسم اعتراضه.
- **المدين** — الصديق الذي سُجل الدين عليه. عميل مصرف. يجوز له القبول والرفض والسداد واقتراح تعديل. لا يجوز له حذف الدين ولا إخفاؤه. لا يُسدد تعديل السطر حتى يوافق الشريك الآخر أو تنتهي مهلة الموافقة.
- **سطر الفاتورة** — صف واحد على الدين. له وصف ومبلغ وكمية. ليست العملة ولا المدين حقلين على السطر.
- **التعديل** — تغيير وصف سطر الفاتورة أو مبلغه أو كميته. لا يسري ولا يُسدد حتى يوافق الشريك الآخر أو تنتهي مهلة الموافقة.
- **مهلة الموافقة** — خمسة أيام، ما لم يحدد الخادم مدة أخرى. في نهايتها يُعتمد التعديل المنتظر من تلقاء نفسه.
- **التطبيق المضيف** — التطبيق المالي الذي يضمّن الوحدة ويوقّع العميل وينقل المال. بانكي هو أول تطبيق مضيف. يجوز لتطبيق آخر أن يضمّن الوحدة نفسها.
- **مستأجر الفاتورة** — المستأجر الذي يملك الديون. يفتح التطبيق المضيف الوحدة في هذا المستأجر. تُعرض الأصدقاء هنا. لا تُدار هنا.
- **الصديق** — شخص مربوط أصلاً بالعميل الموقع عبر التطبيق المضيف وتورده هذه الخدمة من استيراد الأصدقاء. تستطيع الوحدة عرض الأصدقاء. لا تستطيع إضافتهم ولا اعتمادهم ولا إزالتهم.
- **الاسم المستورد** — الاسم الذي يورده استيراد الأصدقاء لصديق. لا تعدله هذه الخدمة.
- **اللقب** — تسمية المستخدم الموقع لصديق على قائمته. يستطيع وضعها أو تغييرها. تعرض قائمته اللقب حين يكون موجوداً، والاسم المستورد حين يكون فارغاً. لا يرى الشخص الآخر ذلك اللقب. تغيير اللقب لا يغير استيراد الأصدقاء.
- **أصل المبلغ** — مجموع إجماليات أسطر الفاتورة. إجمالي السطر هو مبلغه مضروباً في كميته. لا يغير المدين أصل المبلغ إلا بتعديل يجب أن يوافق عليه الشريك الآخر.
- **المتبقي** — أصل المبلغ ناقص المدفوعات وناقص المبالغ المعفاة. لا ينزل تحت الصفر.
- **السداد** — تخفيض من مال مقبوض. مصدر التسوية نقد مدفوع، أو سداد التطبيق المضيف، أو سداد تطبيق آخر.
- **النقد المدفوع** — مصدر تسوية لمال يسجله الدائن المنشئ بوصفه نقداً قُبض خارج التطبيق المضيف. لا يستدعي التطبيق المضيف. تسمية الفاتورة نقد مدفوع.
- **سداد التطبيق المضيف** — مصدر تسوية لمال يدفعه المدين في التطبيق المضيف بعد تحقق الخادمين. تسمية الفاتورة مدفوع. هذه ليست الحالة المسماة مسددة.
- **سداد تطبيق آخر** — مصدر تسوية لمال يسجله الدائن المنشئ بوصفه مقبوضاً عبر تطبيق غير التطبيق المضيف. لا يستدعي التطبيق المضيف. تسمية الفاتورة مدفوع من تطبيق آخر.
- **الإعفاء** — فعل الدائن المنشئ على دين مسدد جزئياً يخفض المتبقي من غير سداد.
- **المعفى** — مصدر تسوية لإعفاء أو لإغلاق غير مدفوع. ليس نقداً محصلاً. تسمية الفاتورة معفى.
- **الإغلاق غير المدفوع** — تصحيح موثق يجعل المتبقي صفراً على دين مستحق أو متأخر بلا سداد. المبلغ معفى. هو ليس إعفاء.
- **النقد المحصل** — مجموع النقد المدفوع وسداد التطبيق المضيف وسداد التطبيق الآخر. يستبعد المعفى.
- **مصدر التسوية** — نقد مدفوع، أو سداد التطبيق المضيف، أو سداد تطبيق آخر، أو معفى. لكل مبلغ مسوّى على فاتورة تاريخية مصدر واحد بالضبط.
- **الفاتورة التاريخية** — الدين كما يُسرد في تقرير السجل، مع كل مبلغ مسوّى ومصدر تسويته.
- **العملة** — العملة الوحيدة المخزنة على الدين. لا تحول الوحدة العملة.
- **تاريخ الاستحقاق** — تاريخ اختياري على الدين. لا يغير الحالة وحده.
- **تاريخ التسجيل** — تاريخ إرسال الدين.
- **تاريخ الإشعار** — تاريخ إنشاء إشعار داخل التطبيق. يظهر على كل إشعار.
- **اسم الدائن** — اسم المتجر لدائن تاجر، أو الاسم المستورد لدائن هو عميل مصرف. ليس اللقب الخاص بمن يشاهد.
- **الحالة** — واحدة من: مسودة، بانتظار قبول العميل، مستحقة، متأخرة، مسددة جزئياً، مسددة، مرفوضة، متنازع عليها.
- **علامة التأخر** — علامة على دين مسدد جزئياً مضى تاريخ استحقاقه. تبقى الحالة مسددة جزئياً.
- **المسودة المتروكة** — مسودة وضعها الدائن جانباً قبل الإرسال. تبقى الحالة مسودة. لا يمكن إرسالها.
- **الملغى قبل القبول** — دين بانتظار قبول العميل سحبه الدائن. تبقى الحالة بانتظار قبول العميل. تظهر القائمة أنه ملغى. لا يمكن قبوله ولا رفضه ولا سداده.
- **التذكير** — إشعار واحد داخل التطبيق من الدائن المنشئ عن دين واحد أو أكثر قابل للسداد للمدين نفسه. لا يغير الحالة.
- **الاعتراض** — الحالة أثناء انتظار تعديل لموافقة الشريك الآخر. هذا هو الاستعمال الوحيد لهذه الحالة. يستطيع المدين سداد المتبقي المعتمد جزئياً أو كلياً. لا تُسدد الأسطر المقترحة. يتوقف الإعفاء والنقد المدفوع وسداد التطبيق الآخر والتذكير حتى يُعتمد التعديل أو يُرفض. لا خيط رسائل.
- **التصحيح الموثق** — تغيير مسبب بعد القبول، من الدائن المنشئ أو مسؤول التشغيل. لا يحذف الدين أبداً.
- **الإشعار داخل التطبيق** — التنبيه داخل التطبيق المضيف. يظهر تاريخ إشعاره. هو إشعار السجل حتى حين لا يظهر دفع على نظام الهاتف.
- **تحقق الخادمين** — تأكيد خادم المضيف وخادم الفاتورة لسداد التطبيق المضيف فيما بينهما. يتحدث الدين من ذلك التأكيد.
- **مسؤول التشغيل** — دور التشغيل. يجوز له تطبيق تصحيح موثق وتنفيذ إغلاق غير مدفوع. لا منتج تشغيل آخر في النسخة الأولى.
- **السجل** — حساب الدين الذي يُضاف إليه فقط، ظاهر للدائن والمدين. أسطر السداد وأسطر المعفى تبدو مختلفة.

### 4. القدرات

#### 4.1 سجل الدين

لكل دين حالة واحدة وعملة واحدة ومتبقٍ يثق به الطرفان. يحقق الرحلات 1 و 3 و 5.

**المتطلب 1: إبقاء وضع واحد لكل دين**

يعرض الدين حالة واحدة تُحسب من تاريخ استحقاقه ومدفوعاته ومبالغه المعفاة.

**نتائج قابلة للاختبار:**
- المتبقي يساوي أصل المبلغ ناقص المدفوعات وناقص المبالغ المعفاة، ولا يكون سالباً.
- المسودة غير مرسلة. بانتظار قبول العميل مرسلة ولم تُقبل بعد.
- القبول ينقل بانتظار قبول العميل إلى مستحقة، أو إلى متأخرة حين يكون تاريخ الاستحقاق قد مضى.
- تصير المستحقة متأخرة حين يمضي تاريخ الاستحقاق وما زال المتبقي يساوي أصل المبلغ.
- سداد أكبر من صفر وأصغر من المتبقي في تلك اللحظة ينقل المستحقة أو المتأخرة إلى مسددة جزئياً. لا يجوز أن يكون الإعفاء هو الحدث الذي ينشئ المسددة جزئياً.
- تبقى المسددة جزئياً مسددة جزئياً ما دام المتبقي فوق الصفر، بما في ذلك بعد تاريخ الاستحقاق، ثم تحمل علامة التأخر.
- المسددة تعني أن المتبقي صفر. لا تعني المسددة أن أصل المبلغ نقد محصل.
- المرفوضة هي رفض المدين قبل القبول فقط.
- المتنازع عليها تعني أن تعديلاً ينتظر. تبقى أسطر الفاتورة السابقة سارية حتى يُعتمد التعديل أو يُرفض. يستطيع المدين سداد المتبقي المعتمد جزئياً أو كلياً. لا تُسدد الأسطر المقترحة، ولا تصير المتنازع عليها مسددة من تلقاء نفسها.
- عملة واحدة لكل دين. لا تُسدد مجموعة ديون معاً إلا حين تشترك في تلك العملة. لا تحويل.

**المتطلب 2: إبقاء الدين**

لا يستطيع الدائن ولا المدين ولا مسؤول التشغيل حذف دين.

**نتائج قابلة للاختبار:**
- لا يُعرض على المدين حذف ولا إخفاء. تغيير الوصف أو المبلغ أو الكمية تعديل وفق المتطلب 16، وليس تغييراً صامتاً.
- المسودة المتروكة، والملغى قبل القبول، والمسددة، والمرفوضة، والإغلاق غير المدفوع، وفقدان الصداقة، كلها تُبقي الدين في مكانه.
- يبقى السجل مقروءاً على ذلك الدين للطرفين.

#### 4.2 التسجيل والإرسال

يجهز الدائن الدين ويرسله إلى صديق واحد. لا يسمع المدين شيئاً حتى الإرسال. يحقق الرحلة 1.

**المتطلب 3: إنشاء مسودة**

يستطيع الدائن تسجيل مسودة بمبلغ فوق الصفر، وعملة، ووصف، وتاريخ استحقاق اختياري.

**نتائج قابلة للاختبار:**
- المسودة مربوطة بالدائن ومستأجر الفاتورة.
- لا يُبلَّغ المدين.
- يُرفض مبلغ صفر أو دونه، أو عملة ناقصة، أو وصف ناقص.

**المتطلب 4: الإرسال إلى صديق**

يستطيع الدائن إرسال مسودة إلى صديق واحد، يختاره من قائمة الأصدقاء، أو من رمز حساب ذلك الصديق، أو من رابط طلب الدين.

**نتائج قابلة للاختبار:**
- يتطلب الإرسال ربط صداقة نشطاً. وإلا يبقى الدين غير مرسل ويرى الدائن الرفض.
- ينقل الإرسال الدين إلى بانتظار قبول العميل ويخزن المدين.
- يحصل المدين على إشعار واحد داخل التطبيق فيه اسم الدائن والمبلغ والوصف وتاريخ التسجيل وتاريخ الإشعار. في هذا الإشعار تاريخ الإشعار هو تاريخ التسجيل. تاريخ الاستحقاق ليس على الإشعار.
- يحدد رابط طلب الدين الدين ولا يحمل جلسة العميل.

**المتطلب 5: ترك المسودة**

يستطيع الدائن ترك مسودة قبل الإرسال.

**نتائج قابلة للاختبار:**
- يصير الدين مسودة متروكة، وتبقى الحالة مسودة، ولا يمكن إرساله بعد ذلك.
- لا يُعرض الترك بعد الإرسال.

**المتطلب 6: السماح للتاجر الموثق فقط**

يجب أن يكون الدائن التاجر موثقاً أصلاً. يُسمح لدائن هو عميل مصرف على مسار التسجيل والإرسال نفسه.

**نتائج قابلة للاختبار:**
- يُرفض التاجر غير الموثق.
- لا توثق الوحدة التجار.

#### 4.3 الإجابة أو السحب

يقبل المدين أو يرفض. لا يستطيع الدائن السحب إلا قبل القبول. يحقق الرحلة 2.

**المتطلب 7: القبول**

يستطيع المدين قبول دين بانتظار قبول العميل وليس ملغى قبل القبول.

**نتائج قابلة للاختبار:**
- يتبع القبول المتطلب 1.
- لا يعود الرفض متاحاً بعد القبول.

**المتطلب 8: الرفض**

لا يستطيع المدين الرفض إلا قبل القبول.

**نتائج قابلة للاختبار:**
- تصير الحالة مرفوضة.
- لا يمكن لاحقاً سداد دين مرفوض ولا إعفاؤه ولا تذكيره ولا قبوله.

**المتطلب 9: الإلغاء قبل القبول**

لا يستطيع الدائن المنشئ الإلغاء إلا والدين بانتظار قبول العميل.

**نتائج قابلة للاختبار:**
- يصير الدين ملغى قبل القبول ويظهر ملغى في القائمة.
- لا يمكن قبوله ولا رفضه ولا سداده.
- لا يضيف الإلغاء حالة تاسعة.

#### 4.4 السداد

قد تعرض الشاشة أسطر فاتورة كثيرة أو ديوناً كثيرة. يسدد المدين المبلغ المعتمد جزئياً أو كلياً. يطلب ذلك الفعل من التطبيق المضيف دفعة واحدة. لا يصدق مستأجر الفاتورة ذلك المال إلا بعد تحقق الخادمين. يحقق الرحلة 2.

**المتطلب 10: سداد دين واحد**

يستطيع المدين سداد المتبقي المعتمد لدين واحد في حالة مستحقة أو متأخرة أو مسددة جزئياً أو متنازع عليها، بمبلغ أكبر من صفر ولا يزيد على ذلك المتبقي المعتمد.

**نتائج قابلة للاختبار:**
- لا فعل سداد على مسودة، ولا على بانتظار قبول العميل، ولا على مرفوضة، ولا على مسددة.
- على دين متنازع عليه المبلغ القابل للسداد هو المتبقي المعتمد. لا تُسدد أسطر الفاتورة المقترحة.
- قد تعرض الشاشة أسطر فاتورة كثيرة. يطلب المدين من التطبيق المضيف دفعة واحدة، لا دفعة لكل سطر.
- يرى المدين اسم الدائن والمبلغ قبل تلك الدفعة الواحدة.

**المتطلب 11: سداد عدة ديون من دائن واحد**

يستطيع المدين اختيار دينين أو أكثر قابلة للسداد تشترك في دائن واحد وعملة واحدة، وسدادها في تحويل واحد عبر التطبيق المضيف.

**نتائج قابلة للاختبار:**
- المبلغ هو مجموع تلك المتبقيات. لا يستطيع المدين كتابة مبلغ مجموعة مختلف.
- يُرفض اختيار يخلط الدائنين، أو يخلط العملات.
- يرى المدين اسم الدائن والمجموع قبل أن يُطلب من التطبيق المضيف نقل المال.
- بعد تحقق الخادمين، يتلقى كل دين مختار سداد التطبيق المضيف لمتبقيه الخاص وقت التحقق. تسمية الفاتورة مدفوع.

**المتطلب 12: تأكيد السداد بتحقق الخادمين**

لا يُسجل سداد ناجح من التطبيق المضيف إلا بتحقق بين خادم المضيف وخادم الفاتورة.

**نتائج قابلة للاختبار:**
- لا يتغير الدين إلا بعد نجاح التحقق. الفشل أو الإلغاء يُبقي كل دين مختار بلا تغيير، ويرى المدين السبب حين أعاده التطبيق المضيف.
- إن انطفأ الهاتف بعد أن أخذ التطبيق المضيف المال، يظل التحقق يسجل السداد.
- يُسجل السداد نفسه مرة واحدة. لا يُخصم المدين مرة أخرى.
- يتلقى الطرفان إشعاراً داخل التطبيق بالمبلغ وبالديون المغطاة.
- كل سداد متحقق من التطبيق المضيف هو سداد التطبيق المضيف. تسمية الفاتورة مدفوع.
- لا يضيف إعادة التحقق سداداً ثانياً.

**المتطلب 13: تسجيل النقد المدفوع**

يستطيع الدائن المنشئ تسجيل نقد مقبوض على دين واحد في حالة مستحقة أو متأخرة أو مسددة جزئياً، بمبلغ أكبر من صفر ولا يزيد على المتبقي.

**نتائج قابلة للاختبار:**
- لا يطلب السجل من التطبيق المضيف نقل المال.
- هو سداد بمصدر تسوية نقد مدفوع، فيستطيع نقل الدين إلى مسددة جزئياً أو إلى مسددة وفق المتطلب 1.
- يرى المدين السطر في السجل فوراً ويستطيع فتح اعتراض عليه.
- يُرفض والدين متنازع عليه، ويُرفض لغير الدائن المنشئ.
- لا يمكن تسجيل سداد مجموعة بوصفه نقداً مدفوعاً.

**المتطلب 24: تسجيل سداد من تطبيق آخر**

يستطيع الدائن المنشئ تسجيل أن المدين دفع عبر تطبيق غير التطبيق المضيف، على دين واحد في حالة مستحقة أو متأخرة أو مسددة جزئياً، بمبلغ أكبر من صفر ولا يزيد على المتبقي.

**نتائج قابلة للاختبار:**
- لا يطلب السجل من التطبيق المضيف نقل المال.
- هو سداد بمصدر تسوية سداد تطبيق آخر. تسمية الفاتورة مدفوع من تطبيق آخر. يستطيع نقل الدين إلى مسددة جزئياً أو إلى مسددة وفق المتطلب 1.
- يرى المدين السطر في السجل فوراً ويستطيع فتح اعتراض عليه.
- يُرفض والدين متنازع عليه، ويُرفض لغير الدائن المنشئ.
- لا يمكن تسجيل سداد مجموعة بوصفه سداد تطبيق آخر.
- لا يقدّم التطبيق الآخر هذا السداد. يسجله الدائن المنشئ، بالطريقة نفسها التي يسجل بها النقد المدفوع، مع مصدر التسوية هذا.

#### 4.5 الإعفاء

يعفي الدائن المنشئ بعض ما تبقى أو كله بعد سداد واحد على الأقل. يحقق الرحلة 3.

**المتطلب 14: إعفاء دين مسدد جزئياً**

يستطيع الدائن المنشئ إعفاء مبلغ أكبر من صفر ولا يزيد على المتبقي، فقط والحالة مسددة جزئياً.

**نتائج قابلة للاختبار:**
- تنطبق القاعدة نفسها على التاجر وعلى الدائن الذي هو عميل مصرف.
- يُرفض المدين، وأي شخص غير الدائن المنشئ، والدين المستحق، والدين المتأخر.
- المبلغ معفى. ليس سداداً ولا يطلب من التطبيق المضيف نقل المال.
- ما دام المتبقي فوق الصفر تبقى الحالة مسددة جزئياً.
- حين يبلغ المتبقي صفراً تصير الحالة مسددة ويظهر الجزء المعفى معفى، لا بوصفه مالاً حوله المدين.
- يظهر السجل الإعفاء في سطر خاص، مميز بصرياً عن السداد.

#### 4.6 التذكير

يستطيع الدائن تنبيه المدين مرة واحدة لدين واحد أو لعدة ديون على ذلك المدين نفسه.

**المتطلب 15: إرسال تذكير**

يستطيع الدائن المنشئ إرسال تذكير واحد لدين واحد أو أكثر في حالة مستحقة أو متأخرة أو مسددة جزئياً تشترك في ذلك الدائن وذلك المدين.

**نتائج قابلة للاختبار:**
- يرى الدائن العدد ومجموع المتبقي قبل الإرسال.
- يحمل الإشعار داخل التطبيق اسم الدائن والعدد ومجموع المتبقي وهويات الديون وتاريخ الإشعار.
- لا تتغير الحالة.
- يُرفض التذكير ما دام أي دين مختار متنازع عليه.
- قد يكرر دفع النظام ذلك التنبيه. يبقى الإشعار داخل التطبيق هو إشعار السجل إن غاب الدفع.

#### 4.7 الاعتراض والإغلاق غير المدفوع

يستطيع أي طرف تعديل وصف سطر الفاتورة أو مبلغه أو كميته. موافقة الشريك الآخر تعتمد التعديل، ورفضه يعيد السطر السابق. إن لم يفعل الشريك شيئاً، يُعتمد التعديل حين تنتهي مهلة الموافقة. يغلق مسؤول التشغيل الدين المستحق أو المتأخر الذي لم يسدده أحد، لا بالإعفاء. يحقق الرحلتين 4 و 5.

**المتطلب 16: اقتراح تعديل**

يستطيع أي شريك تغيير وصف سطر فاتورة أو مبلغه أو كميته على دين ليس مرفوضاً وليس مسدداً.

**نتائج قابلة للاختبار:**
- تصير الحالة متنازع عليها. يبقى الوصف والمبلغ والكمية السابقة سارية حتى الموافقة.
- يستطيع المدين سداد المتبقي المعتمد جزئياً أو كلياً، بدفعة واحدة إلى التطبيق المضيف.
- لا تُسدد الأرقام الجديدة حتى يُعتمد التعديل أو تنتهي مهلة الموافقة.
- يتعطل الإعفاء والنقد المدفوع وسداد التطبيق الآخر والتذكير حتى يُعتمد التعديل أو يُرفض.
- لا تتغير العملة ولا المدين.
- يُرفض تعديل يجعل أصل المبلغ دون المدفوعات زائد المبالغ المعفاة المسجلة أصلاً.
- يُبلَّغ الشريك الآخر. لا خيط رسائل.
- ما زال المدين لا يستطيع حذف الدين أو إخفاءه.

**المتطلب 17: اعتماد التعديل أو رفضه أو اعتماده تلقائياً**

يستطيع الشريك الآخر اعتماد التعديل أو رفضه. إن لم يفعل، يُعتمد التعديل حين تنتهي مهلة الموافقة.

**نتائج قابلة للاختبار:**
- الاعتماد يطبق الوصف والمبلغ والكمية الجديدة، ويعيد حساب المتبقي وفق المتطلب 1، ويغادر المتنازع عليها. يصير الدين قابلاً للسداد وفق المتطلب 1.
- الرفض يعيد الوصف والمبلغ والكمية السابقة، ويغادر المتنازع عليها. لا يُحذف الدين.
- الاعتماد التلقائي له نتيجة الاعتماد نفسها. مهلة الموافقة خمسة أيام ما لم يحدد الخادم مدة أخرى.
- لا يستطيع الشريك الذي أجرى التعديل اعتماده بنفسه.
- يرى الطرفان النتيجة في السجل ويتلقيان إشعاراً داخل التطبيق.
- لا يُطلب من مسؤول التشغيل حسم التعديل. يبقى الإغلاق غير المدفوع المتطلب 18.

**المتطلب 18: إغلاق دين غير مدفوع**

يستطيع مسؤول التشغيل إغلاق دين مستحق أو متأخر ما زال متبقيه يساوي أصل المبلغ، من شاشة الديون غير المدفوعة داخل الوحدة.

**نتائج قابلة للاختبار:**
- لا تسرد الشاشة إلا تلك الديون.
- يُخزن سبب مطلوب في السجل.
- يُعفى كامل المتبقي بالإغلاق غير المدفوع، وتصير الحالة مسددة، ويبقى الدين.
- يُستبعد ذلك المبلغ من النقد المحصل.
- لا يتلقى الدائن المنشئ فعل إعفاء لهذه الحالة.
- الدين الذي له سداد أصلاً غائب عن القائمة.
- يتلقى الطرفان إشعاراً داخل التطبيق ويريان السبب.
- لا يُعرض هذا الفعل على المدين.

#### 4.8 السجل والفواتير التاريخية

يستطيع الطرفان قراءة ما حدث. يفرق التقرير النقد المحصل عن المعفى. يحقق الرحلة 3.

**المتطلب 19: إظهار السجل للطرفين**

يستطيع كل من الدائن والمدين فتح السجل على الدين.

**نتائج قابلة للاختبار:**
- السجل يُضاف إليه فقط، ويشمل الإنشاء والإرسال والقبول والرفض والإلغاء قبل القبول وسداد التطبيق المضيف والسداد الفاشل والنقد المدفوع وسداد التطبيق الآخر والإعفاء والإغلاق غير المدفوع والتذكير وفتح الاعتراض وحسم الاعتراض والتأخر والتصحيح الموثق.
- يظهر كل قيد من فعل، وما فعل، والمبلغ حين يتعلق المال أو مبلغ معفى، ومتى حدث.
- أسطر السداد وأسطر المعفى مميزة بصرياً.

**المتطلب 20: سرد الفواتير التاريخية حسب مصدر التسوية**

تسرد الفواتير التاريخية كل مبلغ مسوّى بمصدر تسوية واحد بالضبط: نقد مدفوع، أو سداد التطبيق المضيف، أو سداد تطبيق آخر، أو معفى. تسميات التقرير: نقد مدفوع، ومدفوع، ومدفوع من تطبيق آخر، ومعفى.

**نتائج قابلة للاختبار:**
- يظهر التقرير مجموعاً واحداً لكل مصدر تسوية. النقد المحصل هو النقد المدفوع زائد سداد التطبيق المضيف زائد سداد التطبيق الآخر.
- للمعفى مجموعه الخاص ولا يُطوى أبداً في النقد المحصل.
- الدين المسدد الذي تشمل أسطره معفى ما زال يظهر تلك الأسطر المعفاة. لا تُعرض حالة المسددة بوصفها دليلاً على أن أصل المبلغ حُصّل.
- تبلغ أسطر الدين أصل المبلغ حين يصير المتبقي صفراً. يظهر الدين المسدد جزئياً الباقي بوصفه ما زال متبقياً، لا بوصفه معفى، إلى أن يوجد إعفاء أو إغلاق غير مدفوع.

#### 4.9 الأصدقاء

يختار الدائن صديقاً ورده استيراد الأصدقاء لهذا المستأجر. تستطيع هذه الخدمة تغيير لقب ذلك الصديق. تُدار الصداقة نفسها في التطبيق المضيف. يحقق الرحلة 1.

**المتطلب 21: عرض الأصدقاء وعدم إدارتهم**

يسرد منتقي المدين الأصدقاء الحاليين الذين وردهم استيراد الأصدقاء للدائن الموقع في مستأجر الفاتورة هذا.

**نتائج قابلة للاختبار:**
- يظهر كل صف في قائمته لقبه حين يكون لدى هذه الخدمة لقب، والاسم المستورد حين لا يكون.
- ليس في الوحدة فعل إضافة صديق ولا اعتماد صديق ولا إزالة صديق.
- يُرفض رمز أو رابط لشخص خارج تلك القائمة بالرفض نفسه الذي يرفض الإرسال.
- إلى أن يُوفَّر استيراد الأصدقاء، تكون القائمة نسخة تجريبية لذلك المستأجر ولذلك الدائن الموقع. استبدال النسخة التجريبية بالاستيراد لا يغير هذا السلوك.
- لا يستطيع دخول فارغ التسجيل ولا السداد ولا الإعفاء ولا تسجيل النقد المدفوع ولا تسجيل سداد تطبيق آخر ولا تغيير لقب.

**المتطلب 22: إبقاء الديون القديمة بعد إزالة صديق**

تتوقف الديون الجديدة بين شخصين حين يزيل أي طرف الصديق. الديون الموجودة أصلاً تبقى.

**نتائج قابلة للاختبار:**
- يُرفض الإنشاء والإرسال لصديق مُزال.
- على دين موجود، يستطيع المدين السداد، ويستطيع اعتماد تعديل ينتظره أو رفضه.
- على دين موجود، يستطيع الدائن تسجيل النقد المدفوع وتسجيل سداد تطبيق آخر والإعفاء والتذكير واقتراح تعديل.
- لا يأخذ أي شخص أفعال الشخص الآخر.
- تبقى الحالة والمتبقي والسجل والفواتير التاريخية للديون الموجودة متاحة. لا تُجمد.
- يبقى لقب مخزون لذلك الصديق مخزوناً. لا يعيد ذلك ربط الصداقة.

**المتطلب 25: تغيير اللقب**

يستطيع المستخدم الموقع وضع لقب صديق على قائمته أو تغييره.

**نتائج قابلة للاختبار:**
- لا يُحدَّث استيراد الأصدقاء.
- اللقب الفارغ يرجع إلى الاسم المستورد على قائمته.
- تستخدم قائمته لقبه. لا تستخدمه قائمة الشخص الآخر.
- يستخدم الإشعار داخل التطبيق اسم الدائن، لا لقبه الخاص.
- المبالغ والحالة وقيود السجل المكتوبة أصلاً تبقى كما كانت.
- لا يلزم الشخص الآخر أن يقبل اللقب.

#### 4.10 الفتح من التطبيق المضيف

يبلغ العميل الوحدة من التطبيق المضيف وهو موقع أصلاً. لا تنقل الوحدة المال ولا تحتفظ بأسرار واجهة المضيف.

**المتطلب 23: الفتح داخل التطبيق المضيف**

يستطيع عميل موقع فتح الوحدة من التطبيق المضيف في مستأجر الفاتورة.

**نتائج قابلة للاختبار:**
- يستطيع التطبيق المضيف فتحها من غير تمرير أسرار الواجهة.
- يفتح رابط دين وارد في التطبيق المضيف للعميل الموقع. الرابط نفسه لا يحتوي الجلسة.
- التطبيق المضيف وحده ينقل المال، وعند سداد المدين فقط.
- الإعفاء والإغلاق غير المدفوع والنقد المدفوع وسداد التطبيق الآخر لا تنقل المال.
- لا يُعرض دين يخص مستأجر فاتورة آخر.

### 5. الجودة العابرة

**متطلب الجودة 1. عزل المستأجر.** كل قراءة وكتابة محصورة في مستأجر الفاتورة. لا يُعاد دين مستأجر آخر.

**متطلب الجودة 2. مبالغ مضبوطة.** المبالغ كميات عشرية مضبوطة. قيمة النقطة العائمة الثنائية ليست مبلغاً صالحاً.

**متطلب الجودة 3. سداد واحد، قيد واحد.** تحقق الخادمين لا يتكرر أثره. سداد واحد ناجح من التطبيق المضيف ينتج سداداً واحداً على كل دين مغطى وخصماً واحداً على المدين.

**متطلب الجودة 4. إشعار السجل.** الإشعار داخل التطبيق هو المعتمد، ويظهر كل إشعار تاريخ إشعاره. غياب دفع النظام لا يزيله.

**متطلب الجودة 5. الاحتفاظ.** يُحفظ الدين وسجله عبر الترك والإلغاء والسداد والإعفاء والإغلاق غير المدفوع والاعتراض وفقدان الصداقة.

**متطلب الجودة 6. الأرقام نفسها.** يرى الدائن والمدين المتبقي نفسه والحالة نفسها ومصادر التسوية نفسها.

### 6. القيود والحواجز

- لا تضيف الوحدة أصدقاء، ولا توثق التجار، ولا تملك حسابات مصرفية، ولا تسجل رموز الدفع.
- لا تنقل الوحدة المال. ينقله التطبيق المضيف، ولسداد المدين فقط.
- النسخة الأولى بلا رسم. لا يحدد هذا المستند نافذة ولاء ولا معدل نجاح.
- يحدد رابط الدين الدين ولا يحمل الجلسة.
- يستبعد النقد المحصل كل مبلغ معفى، بما فيه الإغلاق غير المدفوع.
- لا تظهر الديون غير المدفوعة إلا حين يعلّم التطبيق المضيف الجلسة بوصفها مسؤول تشغيل. لا تنشئ الوحدة دخول إدارة خاصاً بها.

### 7. التكامل والاعتمادات

- **التطبيق المضيف:** الدخول، وإدارة الأصدقاء، وتوثيق التاجر المنجز أصلاً، والسداد الذي يبدأه المدين، ودفع نظام اختياري لإشعار موجود داخل التطبيق.
- **مستأجر الفاتورة:** الديون، والسجل، والفواتير التاريخية، والإشعارات داخل التطبيق، والإعفاء، والإغلاق غير المدفوع.
- **الأصدقاء:** يُعرضون من مستأجر الفاتورة. تأتي واجهة الربط لاحقاً. تقرأ النسخة الأولى نسخة تجريبية. يبقى سلوك المنتقي في المتطلب 21 حين تصل الواجهة.
- **المدفوعات:** تحقق الخادمين بين خادم المضيف وخادم الفاتورة، كما في المتطلب 12. النقل موصوف في الملحق.

### 8. بنية المعلومات

السطوح داخل الوحدة:

1. **قائمة الديون** — ديون الدائن أو المدين الموقع. يظهر الملغى قبل القبول بوصفه ملغى.
2. **تسجيل دين** — مبلغ ووصف وتاريخ استحقاق اختياري، ثم الإرسال.
3. **اختيار صديق** — قائمة أصدقاء المستأجر، أو مسح رمز، أو رابط طلب دين.
4. **تفصيل الدين** — الحالة والمتبقي والسجل، والأفعال التي يجوز لذلك الشخص فقط.
5. **السداد** — مبلغ واحد، أو مجموع الدائن نفسه، يظهر قبل أن يُطلب من التطبيق المضيف نقل المال.
6. **الفواتير التاريخية** — المبالغ المسواة مع مصدر التسوية، زائد مجموع واحد لكل مصدر من المتطلب 20.
7. **الديون غير المدفوعة** — لمسؤول التشغيل فقط.

تسجيل النقد، وتسجيل سداد تطبيق آخر، والإعفاء، والتذكير، والتعديل أفعال على تفصيل الدين، وليست منتجات منفصلة. يوافق الشريك الآخر على التعديل أو يرفضه على ذلك الدين. لا طابور قضايا.

### 9. الشكل والنبرة

صوت الوحدة كسجل مصرفي يستطيع الشخصان قراءته جهراً. الجمل قصيرة. تحمل المبالغ العملة. الأسماء والتواريخ محددة. تسميات الحالة العربية في المسرد هي التسميات على الشاشة.

يُسمى المبلغ المعفى معفى. لا يُوصف أبداً بأنه تحويل من المدين. يجوز أن تجاور حالة المسددة سطراً معفى، ويقول السطر معفى حتى لا تقوم كلمة مسددة بذلك العمل وحدها.

لا يخجل الصوت ولا يمزح ولا يعد تنازلياً ولا يحتفل. المتأخرة هي تسمية الحالة وعلامة التأخر، وليست لافتة تحصيل. الأفعال التي لا يجوز للشخص أخذها غائبة. تستخدم الوحدة لغة التطبيق المضيف البصرية حتى تبدو التطبيق نفسه الذي جاء العميل ليبقى فيه.

مراجع مضادة: ملصق تحصيل، وخيط محادثة على الاعتراض، ولحظة احتفال بقبض المال حين يكون المصدر معفى.

### 10. ما ليس هدفاً

- لا تضيف النسخة الأولى أصدقاء ولا تعتمدهم ولا تزيلهم.
- لا تنقل النسخة الأولى المال داخل الوحدة، ولا تحول العملة، ولا توثق التجار، ولا تسجل رموز الدفع.
- لا تحذف النسخة الأولى ديناً ولا تخفيه عن المدين.
- لا تدير النسخة الأولى طابور تذاكر، ولا خيط رسائل، ولا مكلفاً. مهلة الموافقة هي المؤقت الوحيد، وتعتمد التعديل تلقائياً.
- لا تفرض النسخة الأولى رسماً ولا تبلغ هدف إيراد.
- لا تضيف النسخة الأولى حالة للإلغاء. يبقى الملغى قبل القبول بانتظار قبول العميل.
- لا تدع النسخة الأولى الإعفاء يغلق ديناً مستحقاً أو متأخراً بلا سداد.
- لا تبني النسخة الأولى منتج تشغيل أبعد من شاشة الديون غير المدفوعة.

### 11. نطاق النسخة الأولى

#### 11.1 داخل النطاق

- المسودة والإرسال والقبول والرفض والترك والإلغاء قبل القبول.
- السداد الفردي وسداد المجموعة وتحقق الخادمين.
- النقد المدفوع وسداد التطبيق الآخر يسجلهما الدائن المنشئ.
- الإعفاء على الديون المسددة جزئياً.
- التذكير لمدين واحد.
- تعديل الوصف أو المبلغ أو الكمية، يوافق عليه الشريك الآخر أو يرفضه، أو يُعتمد تلقائياً بعد خمسة أيام أو المدة التي يحددها الخادم.
- الإغلاق غير المدفوع لمسؤول التشغيل، على شاشة الديون غير المدفوعة.
- السجل والفواتير التاريخية بمصادر التسوية الأربعة.
- قائمة الأصدقاء من استيراد الأصدقاء، ونسخة تجريبية إلى أن يوجد ذلك الاستيراد، مع لقب تستطيع هذه الخدمة تغييره.
- الفتح من التطبيق المضيف بلا رسم.

#### 11.2 خارج نطاق النسخة الأولى

- استيراد الأصدقاء الحي. تقوم النسخة التجريبية مقامه إلى أن يُوفَّر ذلك الاستيراد. لا يتغير سلوك المنتقي حين يصل. تغيير اللقب داخل النطاق ما دام الاستيراد نسخة تجريبية.
- نافذة الولاء، ومعدل النجاح، وأي هدف نجاح رقمي.
- تاريخ الاستحقاق على الإشعار داخل التطبيق. يظهر الإشعار تاريخ إشعاره بدلاً من ذلك.
- التذاكر، وتحويل العملة، وحذف الدين، وأي رسم.
- منتج لمسؤول التشغيل أبعد من شاشة الديون غير المدفوعة.

### 12. مقاييس النجاح

مؤجلة بقرار في 2026-10-28. لا يحدد هذا المستند نافذة ولاء ولا معدل نجاح ولا هدفاً رقمياً. كيفية إظهار الدين المسدد تبقى قاعدة منتج في المتطلب 20. ليست مقياس نجاح.

### 13. الأسئلة المفتوحة

لا شيء.

### 14. فهرس الافتراضات

لا شيء.
