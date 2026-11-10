---
title: Friend Debt brief addendum
status: draft
created: 2026-10-28
updated: 2026-10-28
---

# Addendum: Friend Debt

Detail that the brief should not carry. The brief is the story. The PRD remains the behavior. The service doc remains the engineering contract.

## Sources

- Product behavior: `_bmad-output/planning-artifacts/prds/prd-friend_debt-2026-10-28/prd.md`, status final, 28 October 2026.
- Engineering contract: `docs/friend_debt_service.md`.
- This addendum does not copy host embedding, the payment callback, or the record fields. Those stay in the PRD addendum.

## Wording the brief did not adopt

The jobs list still says that a wrong record needs one written objection and one documented outcome. The later decision, the glossary, the fourth journey, and the dispute requirements say the only dispute is an edit to a line's description, amount, or quantity. The other person approves it, rejects it, or the approval wait ends and the edit approves itself. The wait is five days unless the backend names another period. There is no message thread. The brief follows that later behavior.

An earlier decision said dispute resolution was one note and one outcome with no timer. The PRD memory records the line-edit decision after that note. The brief treats the timer as decided.

## Behavior parked out of the brief

- After the friendship ends, create and send stop. The debtor can still pay and can still approve or reject an edit. The creating creditor can still record cash, record an other-app payment, waive, remind, and propose an edit.
- While an edit waits, the debtor may pay the approved outstanding in part or in full. The proposed figures are not payable. A payment that brings the approved outstanding to zero rejects the waiting edit.
- A host payment for a total lands only on debts that are still open. It skips a debt that is disputed, or that received cash or a waiver while the transfer was in flight. Extra host money is not recorded as cash, as a waiver, or as a payment on a disputed debt.
- The nickname is private to the signed-in user's own list. The other person does not see it. The name on a notice is the shop name, or the imported name for a bank-customer creditor.
- Until the friend import exists, the list is a mock. Picker behavior stays when the import arrives.
- Every notice shows its notification date. On the send notice, that date is the registration date.
- A partially paid debt whose due date has passed stays partially paid and is marked past due. It does not become the overdue status.
- Cancel before acceptance is a flag on pending acceptance. It is not a ninth status.

## Left unknown on purpose

Country, a named currency, how people cope today, and the cost of coping were never supplied. Success metrics were deferred on purpose. The brief tags those gaps as assumptions instead of filling them.

## ملخص

هذه الإضافة تحفظ ما لا يحمله موجز المنتج. السلوك المفصل يبقى في وثيقة المتطلبات، والعقد الهندسي يبقى في وثيقة الخدمة.

جملة المهام القديمة تتحدث عن اعتراض مكتوب واحد. القرار اللاحق يجعل النزاع تعديلاً لوصف البند أو مبلغه أو كميته، يوافق عليه الطرف الآخر أو يرفضه أو يمضي بعد 5 أيام. الموجز يتبع القرار اللاحق.

ما أُخرج من الموجز: ما يبقى مسموحاً بعد قطع الصداقة، والدفع أثناء انتظار التعديل، وأين تستقر دفعة المجموعة، واللقب الخاص بالقائمة، والقائمة التجريبية إلى أن يصل الاستيراد، وتاريخ الإشعار، وعلامة التأخر على الدين المسدد جزئياً، وأن الإلغاء قبل القبول ليس حالة جديدة.

البلد واسم العملة وطريقة الناس اليوم وكلفة ذلك لم تُذكر عمداً. مقاييس النجاح أُجّلت عمداً.
