# Reconcile: Friend debt service spec

Source: `docs/friend_debt_service.md`.
Compared with `prd.md` and `addendum.md` in this folder. Neither source was changed.

The PRD keeps the standing record, the status machine, send-then-notify, partial and group pay, waiver only after a payment, reminders, one-step dispute, history, and tenant isolation. Tone already lives in the PRD. The items below are the behavioral rules the FR structure drops or contradicts.

## Intentional departures

Already decided. Not gaps.

- No success metrics, loyalty window, or success rate.
- Unpaid-debts admin screen was added. System admin closes a Due or Overdue debt that has never had a payment.
- Paid cash and paid-from-other-app are recorded by the creating creditor and do not call the host payment.
- A host payment's invoice label is "paid". That word is not the status Paid.
- Nickname is a private list label. It does not change the imported name, the other person's list, or the creditor name on a notice.
- Every in-app notification shows its notification date. On the send notice, that date is the registration date.
- The due date stays off the notification.
- A dispute is one note and one resolution. No thread, assignee, or timer.
- Payment truth is backend-to-backend verification. The spec's client confirm retry is not the source of truth.

## Gaps

### 1. Abandoning a draft leaves no history event

Spec: Status model, Transitions. Abandon before send keeps the row as Draft, sets the abandoned flag, and appends an audit entry.

PRD: FR-5 records the abandoned flag and blocks a later send. FR-19's history list has no abandon action. The addendum's audit actions omit it too. The spec's own audit list also forgets the name; the transition is the requirement that did not survive.

### 2. Dispute resolution can cancel the debt

Spec: Dispute and documented correction. Resolution restores the status from before the dispute, or applies a documented correction. The correction is an amount adjustment or a cancel. The row is not deleted.

PRD: FR-17 restores the previous status or adjusts the original amount, and the new amount cannot fall below payments plus waived amounts. Cancel is not a resolution outcome. Unpaid close (FR-18) is a different path: system admin only, only when nothing has been paid, and it ends as Paid with the amount waived.

### 3. Friendship has to be a QR share or a friends-page approval

Spec: Actors and friend precondition, and the friends work breakdown. The backend rejects a new debt unless the two people are already friends. Friendship requires a prior QR share or an approval from the Banky friends page. A scanned QR or opened link for anyone else shows that backend rejection. The package has no add-friend flow.

PRD: Glossary, Friend, and FR-21. A friend is whoever the friend import supplies for this tenant, and until that import exists the list is a mock. FR-4 and FR-21 refuse someone outside that list. They never require the QR-share or friends-page approval. The mock is stated openly; the approval test is the part the FRs drop.

### 4. System admin correction stays off the package

Spec: Actors, and Dispute and documented correction. System admin may apply a documented correction after acceptance. That role has no package screen in v1. Admin correction is a backend operation.

PRD: FR-17 lets a system admin resolve a dispute with the same note as the creating creditor. UJ-4 puts that admin in the scene with Huda. Section 8 puts Resolve dispute on debt detail. This is separate from the unpaid-debts screen, which is an intentional departure. The non-goal that limits operations UI to that screen does not by itself keep dispute resolution on the backend.

### 5. Back from the module returns to the host

Spec: Package host contract, Open from the host. The module owns its navigation stack, and its back action pops the host route.

PRD: FR-23 covers opening the module and keeping API secrets out of the host input. The addendum, Embedding, says the package owns its navigation stack. The back action that returns to the host screen is not stated.

## Spec tension, not a gap

The status transitions allow a dispute only from Due, Overdue, or Partially paid. The dispute section and the acceptance criteria allow it on any sent debt that is not Rejected and not Paid, which includes Pending acceptance. FR-16 follows the wider rule. A dispute from Pending acceptance also removes Accept and Reject, because those actions require Pending acceptance and the status is then Disputed.

## Held in the addendum

Not FR text, and not gaps: audit correlation id, `settlementReason`, host token exchanged rather than used as the debt API bearer, host payment into the creditor account, and catalog URLs still unassigned.

## ملخص

يقارن هذا المستند عقد خدمة الدين بمتطلبات المنتج، من غير أن يغيّر أياً منهما. الفروق المقصودة مفصولة عن الفجوات، ومنها غياب مقياس النجاح، وشاشة الديون غير المسددة، وتسجيل النقد وسداد تطبيق آخر بيد الدائن، وتسمية سداد التطبيق المضيف، واللقب الخاص بالقائمة، وتاريخ الإشعار، وإبقاء تاريخ الاستحقاق خارج الإشعار، والاعتراض بملاحظة واحدة، والتحقق بين الخادمين. الفجوات خمس: ترك المسودة قبل الإرسال لا يُكتب في السجل، وحل النزاع لا يشمل إلغاء القيد مع بقائه، وشرط الصداقة عبر رمز المشاركة أو موافقة صفحة الأصدقاء غير مطلوب، وتصحيح المشرف للنزاع صار إجراءً داخل الوحدة بينما العقد يبقيه عملية في الخادم، وزر الرجوع لا يعيد المستخدم إلى شاشة التطبيق المضيف.
