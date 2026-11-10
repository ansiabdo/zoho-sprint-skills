---
title: Friend Debt
status: draft
created: 2026-10-28
updated: 2026-10-28
---

# Product Brief: Friend Debt

## Executive Summary

Friend Debt is a record of what one person owes another, kept inside the financial app that person already uses. A verified shopkeeper, or a bank customer, writes the debt against someone who is already a Friend and sends it. The friend is told in that app, accepts or rejects the claim, and can pay through the host. The record stays after it is settled. It cannot be deleted, and the debtor cannot hide it.

Money collected through the host, cash the creditor received, money the creditor records from another app, and amounts that were waived stay on separate lines. When the status is Paid, the outstanding balance is zero. That status does not mean the original amount was collected. The module does not move money, does not add friends, and does not charge a fee. Banky is the first host. Another app may embed the same module.

This brief is the product story for the product owner, UX, architecture, and the epic breakdown. The decided behavior sits in the PRD of 28 October 2026. This page does not restate that PRD.

[ASSUMPTION] The reason to ship is that the shared record should live where the friend already banks. The PRD states the jobs. It does not say why this moment is the moment to build.

## The Problem

[ASSUMPTION] The pain below is taken from the jobs in the PRD. No customer described it, and no workaround was observed.

A shopkeeper or a bank customer is owed money by someone already on their friend list. They need a record that person will see inside the financial app, and a record that is still there after the debt is settled. The person who owes needs to see who claims the money, accept or reject it, and pay in the host app without the record disappearing. When part has been paid and the rest will not be collected, both people need the rest labeled waived. When the host has taken the money and the phone dies, both people need the record to catch up once, and not to charge again. When a line is wrong, either person needs a correction the other person must accept, with the debt still on the books.

How people handle this today is unknown. What that costs them is unknown. No country is decided. Each debt stores one currency, and no currency is named.

## The Solution

Inside the host app, the creditor drafts one or more lines, each with a description, an amount, and a quantity, in a single currency, with an optional due date. Nothing is sent until the creditor chooses one existing friend from the list, that friend's account QR, or a debt link. The friend hears nothing before send. The notice then shows the creditor's name, the amount, the description, and the date of the notice. The due date stays off the notice.

The friend accepts or rejects. After acceptance the debt is due, or overdue if the due date has already passed. The friend pays one debt in part or in full, or pays the full outstanding of several debts that share one creditor and one currency, in one transfer. The host moves the money. The record updates only after the two backends agree, once. The creditor can record cash, or money received in another app, without sending the friend through the host. The creditor can waive a remainder only after some payment, and can send one reminder for that debtor. A line can be changed by either person. Until the other person approves it, rejects it, or five days pass and it approves itself, the new figures cannot be paid. The approved balance can still be paid. Operations can close a due or overdue debt that nobody has paid, with a required reason. That amount is waived, and it is not collected cash. The row and its history remain.

The voice is a short bank record in the host's visual language. On-screen status labels are the Arabic glossary labels. A waived amount is called waived.

## What Makes This Different

The record is accepted before it is due, and it cannot be deleted or hidden. Collected money and waived money stay distinct, including after the status is Paid. A host payment is confirmed between backends, so a dead phone does not lose it and does not charge it twice. A correction is a change to a line, resolved by the other person or by the approval wait. There is no message thread and no collections voice.

The advantage the PRD names is placement. The friend already uses the host, Banky is the first host, and the module can be embedded again. [ASSUMPTION] That placement is why someone would use this instead of a private notebook or a chat message. Nothing in the sources shows that preference.

## Who This Serves

The person who is owed is either a verified shopkeeper or a bank customer. The PRD puts both on the same path and does not rank them. The person who owes is a bank customer already linked as a Friend. Operations, in one screen, closes a debt that was never paid. People who are not already friends, unverified merchants, and anyone whose job is to delete a debt, hide it, or run a collections desk are outside this version. A fee is outside it too. Huda, Sami, and Nabil are names for scenes. They are not a segment.

## Success Criteria

On 28 October 2026 the success metrics were deferred. This version has no loyalty window, no success rate, and no numeric target. Showing a paid debt correctly is a product rule. It is not a measure of success.

[ASSUMPTION] Until a business result is named, this version is working when both people see the same outstanding, the same status, and the same settlement sources; a host payment is stored once; waived amounts stay out of collected cash; and the row survives settlement and the end of the friendship.

## Scope

In this version: draft, send, accept, reject, abandon, and cancel before acceptance; pay one debt or a same-creditor group, confirmed by the backends; cash and other-app payments recorded by the creating creditor; waiver only after a partial payment; one reminder; a line edit approved, rejected, or auto-approved; unpaid close on one operations screen; history with four settlement sources; a friend list, mocked until the import exists, plus a private nickname; open from the host, with no fee.

Out of this version: a live friend import, any success target, the due date on the notice, ticketing, currency conversion, deletion, fees, and any operations product beyond that one screen. Waiver cannot close a debt that was never paid.

## Vision

The debt between a shop, or a customer, and a friend is a standing record in the app they already share. The friend can pay it through the host. Both people can still read it after it is settled, including what was waived.

[ASSUMPTION] No horizon past this version was decided. This brief does not add one.

## Assumptions to correct

- The problem and the reason to ship are inferred from the jobs. Coping, cost, country, and a named currency were never supplied.
- Shop credit and a debt between two customers stay one path, because the PRD refused to rank them.
- Placement in the host is treated as the reason to prefer this over a notebook or a chat. That preference is not evidenced.
- The stand-in for success is a sound record, because numeric success was explicitly deferred.
- A line edit with a five-day approval wait is the dispute, following the finalized PRD behavior. An older jobs sentence still says "one written objection." That wording is parked in the addendum.

## ملخص

هذا الموجز يروي منتج دين الأصدقاء لمن يقرر المنتج، ولتصميم التجربة، وللهيكلة، ولتقسيم العمل. السلوك المفصل مثبت في وثيقة المتطلبات بتاريخ 28 أكتوبر 2026، وهذه الصفحة لا تعيد تلك الوثيقة.

يسجّل تاجر موثّق، أو عميل لدى البنك، ديناً على شخص هو صديق أصلاً داخل التطبيق المالي الذي يستخدمه ذلك الصديق. يصل الإشعار بعد الإرسال. يقبل الصديق أو يرفض، ثم يدفع عبر التطبيق المضيف. السجل يبقى ولا يُحذف ولا يُخفى. بانكي هو التطبيق المضيف الأول، ويمكن لتطبيق آخر أن يضمّن الوحدة نفسها. الوحدة لا تحرّك المال ولا تضيف الأصدقاء ولا تأخذ رسماً.

الافتراض أن الألم مأخوذ من المهام لا من مشاهدة العملاء: صاحب الدين يحتاج سجلاً يراه المدين داخل التطبيق ويبقى بعد التسوية، والمدين يحتاج أن يرى صاحب المطالبة ويقبل أو يرفض ويدفع دون أن يختفي السجل. طريقة الناس اليوم، وكلفة ذلك، والبلد، واسم العملة، كلها غير معروفة. كل دين بعملة واحدة.

يبني الدائن بنوداً بوصف ومبلغ وكمية وتاريخ استحقاق اختياري، ثم يرسل إلى صديق واحد من القائمة أو برمز الحساب أو برابط. تاريخ الاستحقاق لا يظهر في الإشعار. بعد القبول يكون الدين مستحقاً أو متأخراً. الدفع جزئي أو كامل، أو لمجموعة ديون لصاحب واحد وبعملة واحدة في تحويل واحد. يسجّل الدائن النقد وما وصل عبر تطبيق آخر. الإعفاء لباقي المبلغ بعد دفعة فقط. تصحيح البند ينتظر موافقة الطرف الآخر أو يمضي بعد 5 أيام. يستطيع المسؤول إغلاق دين مستحق أو متأخر لم يُدفع قط، ويُقيَّد المبلغ معفياً لا نقداً محصلاً. النبرة سجل بنكي قصير، وعناوين الحالة على الشاشة بالعربية.

ما يميّز السجل أنه يُقبل قبل الاستحقاق، وأن المحصّل والمُعفى يبقيان سطرين مختلفين، وأن دفعة التطبيق المضيف تُثبت مرة واحدة بين الخادمين. الافتراض أن وجود السجل داخل التطبيق المضيف هو سبب تفضيله على دفتر خاص أو رسالة. لا دليل من العملاء على ذلك التفضيل.

يخدم الموجز التاجر الموثق وعميل البنك على مسار واحد بلا أولوية. المدين عميل بنك وهو صديق. الأسماء في المشاهد ليست شريحة. أُجّلت مقاييس النجاح: لا نافذة ولاء ولا نسبة ولا رقم مستهدف. الافتراض أن النسخة تعمل عندما يرى الطرفان الرصيد والحالة ومصادر التسوية نفسها، وتُحفظ الدفعة مرة واحدة، ويبقى السجل بعد انتهاء الصداقة.

النطاق هو المسودة والإرسال والقبول والرفض والدفع والإعفاء والتذكير وتصحيح البند وإغلاق غير المدفوع والسجل. خارج النطاق استيراد الأصدقاء الحي، وهدف نجاح رقمي، والرسوم، وحذف الدين.
