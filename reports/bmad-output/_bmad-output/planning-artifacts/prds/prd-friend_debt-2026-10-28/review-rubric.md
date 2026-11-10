# PRD Quality Review — Friend Debt

## Overall verdict

The ledger thesis holds together: the Debt is permanent, Status Paid means Outstanding is zero, and Collected cash excludes every Waived amount. The PRD is strong as a glossary, a scope cut, and a journey set, and only adequate as a build contract where an in-flight Host payment, a Documented correction, or removal of a Friend still needs a rule. Success metrics were deferred by decision on 2026-10-28, so this draft can brief a build and cannot judge whether the thesis held.

## Decision-readiness — adequate

A decision-maker can act on the product cut. Fee, friend management, money movement, merchant verification, and a ninth Status are refused in plain language: "MVP does not earn a fee," "Cancel does not add a ninth Status," and "v1 does not let Waiver close a Due or Overdue Debt that has no Payment." The status machine in FR-1 states what was given up when a partial payment meets a passed Due date: Status stays Partially paid and the record "carries Past due," so Overdue is reserved for a Debt whose Outstanding still equals the Original amount. §12 records the metrics deferral as a decision, with a date, and says the FR-20 display rule "is not a success measure." That is an honest limit on launch judgment. It is not an unfinished template section.

Two money decisions are stated in one place and walked back in another, so a reader who stops at Vision or at Non-Goals will approve a stricter product than FR-16 and FR-17 specify. Open Questions is the single word "None," which hides those tensions from anyone using §13 as the pushback list.

### Findings

- **high** Original amount can be rewritten (§1 Vision, FR-17) — Vision says the Debt "cannot be edited into a different story after the fact." FR-17 lets the creating Creditor or a System admin "adjust the Original amount" during resolution, with no new acceptance by the Debtor. The floor ("cannot be below Payments plus Waived amounts already recorded") bounds the number and does not reconcile the vision sentence. *Fix:* Rewrite the vision sentence so a documented amount correction is the one allowed edit, or forbid changing the Original amount and require a reversing entry. Leave one of those two in both §1 and FR-17.
- **high** Dispute freeze has no acknowledged cost (§4.7 FR-16, FR-17, §10, §13) — Opening a Dispute makes Pay, Waiver, Paid cash, Other-app payment, and Reminder unavailable. FR-17 and §10 state the given-up mechanism: "There is no reply thread, no assignee, and no timer." They do not state the cost: the freeze lasts until the creating Creditor or a System admin resolves it, including when that person never acts. §13 says "None," so the objection has no place to sit. *Fix:* Add a note that this open-ended freeze is accepted, or put a bound in Open Questions. Do not add a ticket queue in prose while §10 forbids one.
- **low** Working title is still unconfirmed (document header, §13) — The header says "Working title — confirm." §13 says "None." *Fix:* Confirm the title and delete the line, or add one open question.

## Substance over theater — strong

The named people do work. §2.3 says "Huda, Sami, and Nabil name the scenes below. They are not a customer list." Each journey changes a rule: Huda cannot waive a never-paid Debt, Sami's host payment is labeled "paid", Nabil's Unpaid close is Waived and excluded from Collected cash. §2.2 Non-Users excludes a person who is not already a Friend, an unverified merchant, "anyone whose job is to delete a Debt," and "a product owner who needs this feature to produce a fee." Those lines each match a later FR.

There is no novelty claim and no differentiation section. The six NFRs are product bounds: tenant isolation, exact decimal amounts, one charge per Host payment, In-app notification as the notice of record, retention through named events, and the same Outstanding on both sides. None of them says scalable, secure, or reliable. The vision names this Host app, this Friend list, and the split between Status Paid and Collected cash. It cannot be pasted onto a generic IOU product and still be true.

## Strategic coherence — strong

The bet is one sentence long: a Friend who already shares the financial app gets a permanent invoice, the module does not move money or own friendship, and money received is never labeled the same way as money forgiven. FR-2, FR-12, FR-14, FR-18, FR-20, FR-21, and FR-23 all follow that bet. MVP scope kind is problem-solving: the in-scope list is the record, the four Settlement sources, and the host embed. Out of scope is the fee, the live friend import, the Due date on the notice, and any second admin product. Prioritization is the thesis, not an ease ranking.

§12 is empty of numbers because the owner deferred them. Feature coherence does not depend on those numbers. A later metrics pass can still miss the thesis if it counts activity.

### Findings

- **low** Later metrics can miss the thesis (§1, §12, FR-20) — §12 "defines no loyalty window, no success rate, and no numeric target" and points at FR-20 as a display rule. The thesis to test, when the owner reopens this, is settlement honesty: Status Paid beside a Waived line, and Collected cash that excludes Unpaid close. *Fix:* When §12 is reopened, measure that honesty and name a counter-metric such as Disputes or Unpaid closes. Leave this draft deferred. An activity count would not test the bet.

## Done-ness clarity — adequate

An engineer can write tests for the main lifecycle from the consequences already on the page. FR-1's bullets are verifiable transitions. FR-14 refuses Waiver unless Status is Partially paid. FR-18's screen "lists only those Debts" whose Outstanding still equals the Original amount. FR-20 states the four report labels and the invariant that Waived "is never folded into Collected cash." NFR-2 forbids a binary float. NFR-3 states idempotency: "A retried verification does not add a second Payment." Adjectives such as graceful, reasonable, and user-friendly do not appear.

The holes are interactions between those FRs. Happy-path consequences do not say what "done" is when two settlement paths meet, when a correction changes the Original amount, or when the Friend link disappears. Those are the stories a ledger gets wrong.

### Findings

- **high** Verification can settle a different amount (§4.4 FR-10, FR-11, FR-12) — FR-11 shows the Debtor "the total before the Host app is asked to move money," and that total "is the sum of those Outstandings." The next bullet pays each Debt "its own Outstanding at verification time." FR-12 says a failed or cancelled Host result "leaves every selected Debt unchanged" and that the same payment "is recorded once." Nothing says what happens when verification succeeds and that Outstanding has moved: the creating Creditor recorded Paid cash or an Other-app payment, a Waiver reduced the remainder, or one selected Debt became Disputed while `onPay` was in flight. A single-Debt payment in FR-10 has the same gap. The addendum repeats the rule ("settles each debt's full outstanding") and does not add a mismatch outcome. *Fix:* Pick one mismatch rule and apply it to FR-10 and FR-11: fail verification, cap each Debt at the amount the Debtor was shown, or record a partial. State that a Debt which is no longer payable at verification time is skipped or fails the whole confirmation.
- **high** Documented correction has no field bounds (FR-17, FR-19) — FR-17 says a correction "may adjust the Original amount" and that Outstanding "is recomputed under FR-1." It does not say whether description, Due date, Currency, or Debtor can change. It does not say the Status that results when the Original amount is raised on a Partially paid Debt, or when the recomputed Outstanding returns to zero. FR-19 shows "the amount when money or a Waived amount is involved," which does not require the previous and new Original amount on the correction line. *Fix:* List the fields a correction may change, the Status that follows a raise and a reduction to the floor, and the History fields (previous amount, new amount, note, actor).
- **high** Friend removal freezes or continues (FR-22, FR-2) — FR-22 says "Debts that already exist stay" and that "Status, Outstanding, History, and Historical invoices for existing Debts stay as they were." Create and send are refused. Pay, Waiver, Paid cash, Other-app payment, Reminder, and Dispute are not named. "Stay as they were" can mean the row is retained, or that no later money action applies. FR-2 only says loss of Friend leaves the Debt "in place." *Fix:* State that those actions continue for an existing Debt after the Friend link is gone, or list the ones that stop. Keep create and send refused.
- **medium** Reminder cardinality is two readings (§4.6, FR-15) — The section says the Creditor can "nudge the Debtor once for one Debt or for several Debts." FR-15's consequences cover one In-app notification with a count and a total. They do not say whether a second Reminder on a later day is refused. "Once" can mean one notice for many Debts, or one Reminder ever. *Fix:* State that the Creditor may send another Reminder later, or state that a payable Debt accepts only one Reminder.
- **medium** Two links are one sentence (UJ-1, FR-4, §6, FR-23) — UJ-1 sends by picking a Friend "or scans his account QR." FR-4 adds "a debt-request link" as a third way to choose the Friend, then says "The debt-request link identifies the Debt." §6 and FR-23 use "debt link" for an incoming open of an existing Debt, and the link "does not carry the session." A link that identifies a Debt cannot also be how the Creditor chooses a Friend before send, unless a Draft already has a share link. The addendum's "share-link payload identifies the debt request" matches the incoming-open reading. *Fix:* Split the terms. Account QR selects a Friend at send. The debt link opens one existing Debt and never carries the session. Say whether a Draft can be shared before send.
- **medium** Settlement words have no Arabic screen labels (§9, FR-20, Glossary Status) — §9 says "The Arabic Status labels in the Glossary are the labels on screen," and that a Waived line must say Waived so "مسددة" is not doing that work alone. FR-20 gives the report labels only as "paid cash", "paid", "paid from other app", and "waived". Those four strings are the thesis on the screen. It is unspecified whether they are the on-screen words in every locale or canonical tokens awaiting Arabic copy. *Fix:* Declare the English strings to be the screen copy, or add four Arabic labels beside the Status list.
- **medium** Verified merchant has no host signal (FR-6, §7, addendum Embedding) — FR-6: "An unverified merchant is refused. The module does not verify merchants." §7 puts "merchant verification already done" on the Host app. The addendum's `FriendDebtHostInput` is `environment`, `tenant`, `token`, `domain`, `onPay`, and optional `themeMode`. No field distinguishes a verified merchant, an unverified merchant, and a bank-customer Creditor. *Fix:* Name the host input the module reads. Keep verification itself in the Host app.
- **low** Abandoned drafts have no list rule (FR-5, §8) — FR-5 keeps an Abandoned draft as Status Draft and forbids send. §8's Debt list calls out Cancelled before acceptance "as cancelled" and does not say where an Abandoned draft appears. *Fix:* Say it stays on the Creditor's Debt list as Draft, marked abandoned, and is absent from the Debtor's list.

## Scope honesty — adequate

§10 and §11.2 do real de-scoping. They name live friend import, the Due date on the In-app notification, ticketing, currency conversion, deletion, any fee, and "a System admin product beyond the Unpaid debts screen." The mock Friend list is in scope on purpose: "The Nickname change is in scope while the import is still a mock." Inline sentences carry several non-goals that a reader of a single FR might otherwise invent: FR-9 "does not add a ninth Status," FR-17 has "no reply thread, no assignee, and no timer," FR-21 has "no add-Friend, approve-Friend, or remove-Friend action."

The density problem is the reverse of a long open-items list. §13 and §14 are each "None." on a customer-facing ledger. The unspecified cases in Done-ness are written as permissions ("may adjust," "stay as they were," "once"), so a story breakdown will treat them as closed. §0 tells the reader "Assumptions are tagged inline and listed again in §14," and the body contains no `[ASSUMPTION]` tags. For this stakes level, an empty register is safe only when the money rules are actually complete.

### Findings

- **high** Open Questions says None (§0, §13, §14) — §13 is "None." §14 is "None." The header still says the title is unconfirmed, and FR-11, FR-17, FR-22, and §4.6 leave the verification mismatch, the correction fields, life after Friend removal, and Reminder cardinality unspecified. Downstream work that trusts §13 will not reopen them. *Fix:* Write the rule in the FR, or add one open question per case. Keep §14 empty only after a real pass for untagged inferences. The behavior fixes themselves are the Done-ness findings above.

## Downstream usability — adequate

This PRD is chain-top: §0 names the product owner, UX, architecture, and the epic breakdown. The Glossary can be extracted alone. Debt, Outstanding, Settlement source, Waiver, Unpaid close, Collected cash, and the Paid / "paid" homonym are used the same way in journeys and FRs. UJ-1 through UJ-5 each name a protagonist and carry context in the journey. FR, UJ, and NFR ids are unique and gap-free. There are no SM ids, which matches the deferred §12. Cross-references to FR-1, FR-12, and FR-20 resolve.

Two extractions will fork. The Debt list sentence does not say how a person who is Creditor on one Debt and Debtor on another is shown. The addendum, which §0 tells architecture to trust for transport, disagrees with FR-19 on the audit actions and introduces a field the PRD never defines.

### Findings

- **medium** Debt list role is ambiguous (§8) — "Debt list — Debts for the signed-in Creditor or Debtor." UJ-1's edge says a bank-customer Creditor uses the same record path, so one signed-in person can be Creditor on some Debts and Debtor on others. "Or" does not say whether the list is a union, a role switch, or two lists. *Fix:* State that one list shows every Debt where the signed-in person is Creditor or Debtor, and that each row shows which role they hold.
- **medium** Addendum audit list drops other-app payment (FR-19, addendum Record shape) — The addendum says "These notes are not product requirements," then defines `settlementReason` as `full_payment` or `payment_plus_waiver`. The PRD never uses those names. The addendum audit actions include "cash recorded" and omit the Other-app payment that FR-19 requires in History ("Paid cash, Other-app payment"). An architecture pass that treats the addendum as the field list will drop a line the thesis needs, or will surface a fifth classification. *Fix:* If `settlementReason` is an engineering rollup of the four Settlement sources, say so in the addendum in those words. Add the other-app action beside cash recorded. Do not create a new product source.

## Shape fit — strong

The product is a multi-party record inside a host financial app: merchant Creditor, bank-customer Creditor, Debtor, and System admin. User journeys with named protagonists are load-bearing here, and §2.3 provides them for record, host pay, waive, dispute, and unpaid close. The FR density matches a ledger. The tone section is an embedded-bank voice, with anti-references ("a collections poster, a chat thread on the Dispute") that match §10. The addendum is the right place for `FriendDebtHostInput`, ABP tenant, and `onPay`. Brownfield facts that the PRD itself needs are present and accurate relative to that addendum: Banky is the first Host app, friends stay on the host friends page, and v1 reads a mock. Existing journeys and new journeys do not need a split; the module is new, and the host capabilities it refuses to absorb are listed as dependencies in §7. One creditor money action is specified only as FRs, which is a small shape gap for UX and does not turn the document into a backlog.

### Findings

- **low** Cash recording has no journey (UJ-3, FR-13, FR-24) — UJ-2 is Sami paying through the Host app. UJ-3 is Huda waiving and then reading Historical invoices, including a Host line labeled "paid". FR-13 and FR-24 let Huda record Paid cash or an Other-app payment, and the Debtor "sees the line in History at once and can open a Dispute about it." No journey walks that recording. *Fix:* Add one short journey, or an edge on UJ-3, in which the creating Creditor records the line, the invoice label is "paid cash" or "paid from other app", and the Debtor can dispute it.

## Mechanical notes

Ids. FR-1 through FR-25, UJ-1 through UJ-5, and NFR-1 through NFR-6 are unique and have no gaps. In the body, FR-24 sits between FR-13 and FR-14, and FR-25 sits between FR-22 and FR-23. Story extraction should follow the ids. No SM ids exist. That matches §12.

Assumptions roundtrip. There are no inline `[ASSUMPTION]`, `[NOTE FOR PM]`, or `[NON-GOAL for MVP]` tags. §14 "None." matches the absence of assumption tags. §0 still promises that assumptions "are tagged inline and listed again in §14." The title line "*Working title — confirm.*" is the stray open item; see Decision-readiness.

Glossary and cross-document words.

- §1 says "friend API." The Glossary, §7, and §11 say "friend import." §7 also says "The API comes later."
- UJ-1 says "account QR." FR-4 says "debt-request link." §6 and FR-23 say "debt link." The addendum says "incoming debt link" and "share-link payload." See the Done-ness finding before treating these as one noun.
- FR-12 says "invoice backend." The addendum says "debt backend."
- The addendum maps the engineering word "forgiveness" to the waiver action. The PRD does not use "forgiveness." Keep the PRD term Waiver.
- Status Paid and the invoice label "paid" are an intentional homonym. Glossary Host payment says "This is not the Status named Paid." A later edit should keep both.
- Glossary Nickname uses "his list" for the signed-in user. UJ-1's Creditor is Huda. The other-person rule is clear; the pronoun is the drift.
- NFR-2 requires "exact decimal quantities" and rejects a binary float. The addendum leaves "the Dart decimal type" to the implementation plan and does not state minor units. That is an implementation deferral sitting under a real product bound, not a second currency-conversion rule. §10 already forbids conversion.

UJ protagonists. Each journey names the person and the context in the block. Huda carries UJ-1 and UJ-3, Sami carries UJ-2 and UJ-4, Nabil carries UJ-5.

Cross-references that resolve. FR-7 "Acceptance follows FR-1." FR-13 and FR-24 cite FR-1. §7 cites FR-12. §8 and §12 cite FR-20. Feature lines "Realizes UJ-1" through "Realizes UJ-5" match journeys that exist. Reminder (FR-15), Paid cash (FR-13), and Other-app payment (FR-24) have no "Realizes" journey; the last two are the Shape fit finding.

Required sections for this stakes level are present: vision, users, non-users, journeys, glossary, FRs, NFRs, constraints, dependencies, information architecture, non-goals, MVP in and out, success metrics, open questions, assumptions index. §12 is present and explicitly deferred.

## ملخص

تراجع هذه الوثيقة جودة متطلبات سجل الدين بين الأصدقاء داخل التطبيق المالي المضيف على سبعة أبعاد. الحكم العام أن الأطروحة متماسكة: الدين يبقى، والحالة المسددة تعني أن المتبقي صفر، والنقد المحصّل يستبعد كل مبلغ معفى. المضمون والتماسك الاستراتيجي وملاءمة الشكل قوية. جاهزية القرار ووضوح الاكتمال وصدق النطاق وقابلية الاستخدام اللاحقة مقبولة. تأجيل مقاييس النجاح قرار مسجل في 2026-10-28 وليس فراغاً عارضاً، فالوثيقة تصلح لبدء البناء ولا تصلح للحكم على تحقق الأطروحة. أخطر الثغرات هي تعارض ثبات القصة مع تعديل المبلغ الأصلي، وتجميد الدين عند النزاع بلا حد زمني، واختلاف مبلغ السداد عند التحقق عن المبلغ الذي رآه المدين، وغموض التصحيح وما يبقى ممكناً بعد إزالة الصداقة، وادعاء أن الأسئلة المفتوحة لا شيء. عدد الملاحظات الحرجة 0، والمرتفعة 6، والمتوسطة 6، والمنخفضة 4.
