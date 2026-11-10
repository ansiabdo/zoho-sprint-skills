import fs from "node:fs";

const SEP = "##+=================================================##";
const source = JSON.parse(fs.readFileSync("reports/Invoicing-MService/2026-10-28/open-story-details.out.json", "utf8"));
const originalByNo = {};
for (const call of source) {
  for (const item of call.data?.items || []) {
    originalByNo[item.itemNo] = item.description || "";
  }
}

const A = `
<p dir="ltr"><strong>${SEP}</strong></p>
<h2>تمكين Banky Lite: التكامل والتهيئة وأطراف الفاتورة | Banky Lite Enablement &amp; API Integration</h2>
<h3>1. ملخص القصة | Story Summary</h3>
<p dir="rtl">تمكين بنكي لايت كمنصة تكامل واحدة: تعريف المزود والمستأجر، إصدار بيانات اعتماد API، عزل البيانات، وإضافة أطراف الفاتورة (المزود والمصدر والمشترك) مع ترحيل الفواتير الحالية. تجمع هذه القصة ثلاث قصص سابقة: تكامل API، تهيئة المزود/المستأجر، ونموذج أطراف الفاتورة.</p>
<p dir="ltr">Enable Banky Lite as one integration foundation: provider/tenant setup, API credentials, data isolation, and invoice parties (provider, issuer, subscriber), including backfill of existing invoices. This consolidates three prior stories: API integration, provider/tenant setup, and invoice-party model.</p>
<h3>2. المستخدم والقيمة | User &amp; Value</h3>
<p dir="rtl"><strong>بصفتي</strong> مدير منصة/مطور تكامل، <strong>أرغب في</strong> تمكين بنكي لايت وتجهيز نموذج الأطراف والـ API، <strong>حتى يستطيع</strong> بنكي إصدار الفواتير وإدارتها بأمان دون تسريب بيانات بين المستأجرين.</p>
<p dir="ltr"><strong>As a</strong> platform administrator/integration developer, <strong>I want</strong> to enable Banky Lite and prepare the party model and API, <strong>so that</strong> Banky can issue and manage invoices securely without cross-tenant data leakage.</p>
<h3>3. معايير القبول | Acceptance Criteria</h3>
<ol>
<li><strong>AR:</strong> سجل مزود/مستأجر لبنكي لايت بحالة نشطة وعملة وبيانات اتصال.<br/><strong>EN:</strong> Provider/tenant record for Banky Lite with active status, currency and contact data.</li>
<li><strong>AR:</strong> إصدار API Client (Client ID/Secret أو مفتاح) وصلاحيات scopes محددة، مع تدوير المفاتيح وإبطال فوري.<br/><strong>EN:</strong> Issue an API client (client ID/secret or key) with defined scopes, key rotation and immediate revocation.</li>
<li><strong>AR:</strong> عزل كل قراءة/كتابة حسب tenant_id؛ رفض الوصول عبر المستأجرين 403/404.<br/><strong>EN:</strong> Isolate every read/write by tenant_id; reject cross-tenant access with 403/404.</li>
<li><strong>AR:</strong> حقول provider_id وissuer_id وsubscriber_id في نموذج الفاتورة وDTO وAPI؛ بنكي هو provider في Phase 1، المصدر تاجر/شخص، المشترك دافع/عميل.<br/><strong>EN:</strong> Add provider_id, issuer_id and subscriber_id to the invoice model, DTO and API; Banky is the provider in Phase 1, the issuer is a merchant/person, and the subscriber is the payer/customer.</li>
<li><strong>AR:</strong> ترحيل/backfill للفواتير الحالية دون فقدان بيانات، مع فهارس وقيود تكامل وtenant scoping.<br/><strong>EN:</strong> Backfill existing invoices without data loss, with indexes, integrity constraints and tenant scoping.</li>
<li><strong>AR:</strong> APIs موثقة: عرض الفواتير، إصدار فاتورة، سداد، استعلام الحالة، قائمة المشتركين، وWebhooks؛ مع Idempotency وRate limits وPagination ورموز أخطاء واضحة وOpenAPI/Sandbox.<br/><strong>EN:</strong> Documented APIs for listing invoices, issuing an invoice, payment, status, subscribers and webhooks, with idempotency, rate limits, pagination, clear error codes and OpenAPI/Sandbox.</li>
<li><strong>AR:</strong> التحقق من أن المشترك يتبع نفس المزود/المصدر، وتحديث الاستعلامات والتقارير والحقول المرجعية.<br/><strong>EN:</strong> Validate that the subscriber belongs to the same provider/issuer, and update queries, reports and reference fields.</li>
<li><strong>AR:</strong> Audit لإنشاء/تعديل/تعطيل بيانات الاعتماد، وتوقيع Webhooks وإعادة المحاولة، وعدم وجود واجهة تسجيل دخول مستقلة في هذه المرحلة.<br/><strong>EN:</strong> Audit credential creation/update/disablement, sign webhooks with retry, and no standalone login UI at this stage.</li>
</ol>
<h3>4. التفاصيل الوظيفية | Functional Details</h3>
<p dir="rtl">التهيئة تسبق أي تكامل: تعريف المزود/المستأجر ← إصدار بيانات الاعتماد ← تجهيز نموذج الأطراف ← ترحيل الفواتير ← تشغيل الـ APIs. لا يُسمح لأي طلب بالمرور قبل ربطه بمزود ومستأجر صالحين. واجهة الإدارة تعرض حالة التكامل وبيانات الاعتماد دون كشف الأسرار.</p>
<p dir="ltr">Setup precedes integration: define provider/tenant → issue credentials → prepare the party model → backfill invoices → enable APIs. No request passes before it is bound to a valid provider and tenant. The admin view shows integration status and credential metadata without exposing secrets.</p>
<h3>5. التفاصيل التقنية | Technical Notes</h3>
<p dir="rtl">كيانات Provider وTenant وApiClient وInvoiceParty، مع تشفير الأسرار وتدوير المفاتيح وعزل المخطط/قاعدة البيانات وAudit. ترحيل Backfill يجب أن يكون قابلاً لإعادة التشغيل (Idempotent) مع تقرير فروقات. APIs بعقود OpenAPI، وWebhooks موقعة، وحدود معدل، وIdempotency Keys.</p>
<p dir="ltr">Entities: Provider, Tenant, ApiClient and InvoiceParty, with secret encryption, key rotation, schema/database isolation and audit. Backfill must be re-runnable (idempotent) with a variance report. APIs use OpenAPI contracts, signed webhooks, rate limits and idempotency keys.</p>
<h3>6. خارج النطاق | Out of Scope</h3>
<p dir="rtl">دورة تأهيل مستأجرين عامة، تسجيل الدخول المستقل، التسويات، النزاعات، وAPI عام لمزودين خارجيين.</p>
<p dir="ltr">General tenant onboarding, standalone login, settlements, disputes, and a public API for external providers.</p>
<h3>7. التبعيات والروابط | Dependencies &amp; Links</h3>
<p dir="rtl">تعتمد على قصة المشتركين 131، وترحيل المستأجر 124، والمتطلب التجاري 122. القصص المدمجة: SNA-128 (تكامل API) وSNA-132 (أطراف الفاتورة). الأب: Epic 120216000004657001.</p>
<p dir="ltr">Depends on Story 131 (subscribers), Story 124 (tenant migration) and the business requirement 122. Merged stories: SNA-128 (API integration) and SNA-132 (invoice parties). Parent Epic: 120216000004657001.</p>
<h3>8. الجاهزية والاكتمال | Definition of Ready &amp; Done</h3>
<p dir="rtl">جاهز عندما: نموذج المزود/المستأجر معتمد، عقد الـ API وOpenAPI معتمد، خطة الترحيل والبيئات Sandbox/Production واضحة، ومراجعة الأمان مكتملة. مكتمل عندما: التهيئة والـ APIs ونموذج الأطراف تعمل في Sandbox، والترحيل تم التحقق منه، والاختبارات وAudit موثقة.</p>
<p dir="ltr">Ready when the provider/tenant model, API/OpenAPI contract, migration plan, sandbox/production environments and security review are approved. Done when setup, APIs and the party model work in sandbox, backfill is verified, and tests/audit are documented.</p>
<h3>9. التقدير والأولوية | Estimation &amp; Priority</h3>
<p dir="rtl">التقدير السابق كان 1 نقطة لكل قصة (3 نقاط إجمالاً)، وهو أقل من الحجم الفعلي. المرجع: القصة المكتملة 43 (تكامل الهوية المركزية) 6 نقاط، والقصة 67 (نموذج البيانات) 5 نقاط. التوصية <strong>8 نقاط</strong> لأن النطاق يشمل API وعزل مستأجرين وترحيلاً وأماناً. الأولوية High.</p>
<p dir="ltr">The prior estimate was 1 point per story (3 total), below the actual size. Analogs: completed Story 43 (central identity integration) at 6 and Story 67 (data model) at 5. Recommendation: <strong>8 points</strong> because the scope includes API, tenant isolation, backfill and security. Priority: High.</p>
`;

const B = `
<p dir="ltr"><strong>${SEP}</strong></p>
<h2>المشتركون وتسجيل الأصدقاء | Subscribers &amp; Friend Registration</h2>
<h3>1. ملخص القصة | Story Summary</h3>
<p dir="rtl">سجل مشتركين موحد يربط المستخدم بالمزود/المصدر، مع منع التكرار، ودعم تسجيل الأصدقاء عبر قائمة الأصدقاء أو QR/رابط الدعوة، وعزل كامل حسب المستأجر.</p>
<p dir="ltr">A unified subscriber registry linking a user to a provider/issuer, with duplicate prevention, friend registration through the friend list or QR/invite link, and full tenant isolation.</p>
<h3>2. المستخدم والقيمة | User &amp; Value</h3>
<p dir="rtl"><strong>بصفتي</strong> تاجراً/مصدراً، <strong>أرغب في</strong> تسجيل الأصدقاء كمشتركين وربطهم بحسابي، <strong>حتى أستطيع</strong> إصدار فواتير ومديونيات لهم دون تكرار المستخدم أو خلط البيانات.</p>
<p dir="ltr"><strong>As a</strong> merchant/issuer, <strong>I want</strong> to register friends as subscribers and link them to my account, <strong>so that</strong> I can issue invoices and debts for them without duplicating users or mixing data.</p>
<h3>3. معايير القبول | Acceptance Criteria</h3>
<ol>
<li><strong>AR:</strong> جدول/API للمشتركين: user_id, provider_id, issuer_id, status, nickname, contact_ref.<br/><strong>EN:</strong> Subscriber table/API with user_id, provider_id, issuer_id, status, nickname and contact_ref.</li>
<li><strong>AR:</strong> نفس المستخدم يمكن أن يملك أكثر من سجل مشترك حسب المصدر/المزود، دون تكرار المستخدم.<br/><strong>EN:</strong> The same user can have multiple subscriber records per provider/issuer without duplicating the user.</li>
<li><strong>AR:</strong> قيد فريد (user_id, provider_id, issuer_id) ومنع التكرار.<br/><strong>EN:</strong> Unique constraint (user_id, provider_id, issuer_id) and duplicate prevention.</li>
<li><strong>AR:</strong> ربط مشترك موجود بدل إنشاء مستخدم جديد.<br/><strong>EN:</strong> Link an existing subscriber instead of creating a new user.</li>
<li><strong>AR:</strong> تسجيل صديق عبر قائمة الأصدقاء أو QR/رابط دعوة حسب سياسة بنكي؛ قائمة الأصدقاء تأتي من Banky/API الأصدقاء (mock حتى يتوفر)، ولا إضافة/موافقة/حذف صديق من هذه الوحدة.<br/><strong>EN:</strong> Register a friend via the friend list or QR/invite link per Banky policy; the friend list comes from the Banky friends API (mock until available), with no add/approve/delete friend action in this module.</li>
<li><strong>AR:</strong> بحث/قائمة/تفعيل/تعليق؛ عزل حسب المستأجر.<br/><strong>EN:</strong> Search/list/activate/suspend with tenant isolation.</li>
<li><strong>AR:</strong> نفس المستخدم يمكن أن يكون مشتركاً لدى أكثر من مزود/مصدر، ويمكن أن يكون مزوداً/مصدراً في تعامل آخر؛ الهوية واحدة ولا تتكرر.<br/><strong>EN:</strong> The same user can be a subscriber for multiple providers/issuers and a provider/issuer in another transaction; identity remains single and is not duplicated.</li>
<li><strong>AR:</strong> لا استيراد جهات اتصال من الجهاز الآن.<br/><strong>EN:</strong> No device contact import at this stage.</li>
</ol>
<h3>4. التفاصيل الوظيفية | Functional Details</h3>
<p dir="rtl">التدفق: البحث عن مستخدم/صديق ← ربطه كمشترك بالمصدر والمزود ← تفعيله ← استخدامه في الفواتير والمديونيات. لا تُنشأ هوية جديدة عند وجود هوية مطابقة. تُعرض حالة المشترك (نشط/معلق) وسجل ارتباطه.</p>
<p dir="ltr">Flow: find a user/friend → link as a subscriber to the issuer and provider → activate → use in invoices and debts. No new identity is created when a matching identity exists. Subscriber status (active/suspended) and linkage history are shown.</p>
<h3>5. التفاصيل التقنية | Technical Notes</h3>
<p dir="rtl">جدول Subscriber بفهرس فريد مركب، وربط منطقي بـ User وProvider وIssuer. تحقق من الملكية قبل الإدراج، ومنع التكرار على مستوى قاعدة البيانات، وAudit للتغييرات. لا تُخزّن جهات اتصال الجهاز.</p>
<p dir="ltr">Subscriber table with a composite unique index, logically linked to User, Provider and Issuer. Validate ownership before insert, enforce duplicate prevention at the database level, and audit changes. Device contacts are not stored.</p>
<h3>6. خارج النطاق | Out of Scope</h3>
<p dir="rtl">استيراد جهات الاتصال من الجهاز، وواجهة إدارة الأدوار العامة، وإضافة/حذف الأصدقاء من هذه الوحدة.</p>
<p dir="ltr">Device contact import, a general role-management UI, and adding/deleting friends from this module.</p>
<h3>7. التبعيات والروابط | Dependencies &amp; Links</h3>
<p dir="rtl">تعتمد على تمكين Banky Lite (SNA-129) ونموذج أطراف الفاتورة (SNA-132). مرتبطة بالمتطلب 122. الأب: Epic 120216000004657001.</p>
<p dir="ltr">Depends on Banky Lite enablement (SNA-129) and the invoice-party model (SNA-132). Related to requirement 122. Parent Epic: 120216000004657001.</p>
<h3>8. الجاهزية والاكتمال | Definition of Ready &amp; Done</h3>
<p dir="rtl">جاهز عندما: نموذج المشترك وقيد التفرد معتمد، وسياسة الأصدقاء/QR واضحة، وواجهة Banky للأصدقاء محددة. مكتمل عندما: التسجيل والربط والتفعيل تعمل، ومنع التكرار مختبر، والعزل بين المستأجرين مثبت.</p>
<p dir="ltr">Ready when the subscriber model and uniqueness constraint are approved, friend/QR policy is clear, and the Banky friends interface is defined. Done when registration, linking and activation work, duplicate prevention is tested, and tenant isolation is proven.</p>
<h3>9. التقدير والأولوية | Estimation &amp; Priority</h3>
<p dir="rtl">التقدير السابق 1 نقطة، وهو منخفض. المرجع: القصة المكتملة 14 (إدارة Parties) 6 نقاط، لكن نطاق هذه القصة أضيق (سجل مشترك وربط فقط). التوصية <strong>3 نقاط</strong>. الأولوية High.</p>
<p dir="ltr">The prior estimate was 1 point, which is low. Analog: completed Story 14 (party management) at 6, but this story is narrower (subscriber registry and linking only). Recommendation: <strong>3 points</strong>. Priority: High.</p>
`;

const C = `
<p dir="ltr"><strong>${SEP}</strong></p>
<h2>دورة حياة مديونية الأصدقاء | Friend Debt End-to-End Lifecycle</h2>
<h3>1. ملخص القصة | Story Summary</h3>
<p dir="rtl">دورة كاملة لمديونية الصديق: إنشاء المسودة والبنود، الإرسال، القبول أو الرفض، اقتراح تعديل البنود والموافقة، الدفع الجزئي أو الكامل، والسجل التاريخي ومصادر التسوية. تجمع هذه القصة أربع قصص سابقة: قبول/رفض المديونية، الدفع الجزئي، خدمة المديونية، وسجل التسويات.</p>
<p dir="ltr">A complete friend-debt lifecycle: create a draft with lines, send it, accept or reject, propose and approve line edits, make partial or full payments, and keep the full history and settlement sources. This consolidates four prior stories: debt acceptance, partial payment, debt service, and settlement history.</p>
<h3>2. المستخدم والقيمة | User &amp; Value</h3>
<p dir="rtl"><strong>بصفتي</strong> مديناً/دائناً، <strong>أرغب في</strong> إنشاء المديونية والاتفاق على بنودها وسدادها وتوثيق كل حركة، <strong>حتى تكون</strong> العلاقة المالية واضحة وقابلة للتتبع دون حذف أو نزاع غير موثق.</p>
<p dir="ltr"><strong>As a</strong> debtor/creditor, <strong>I want</strong> to create the debt, agree on its lines, pay it and document every action, <strong>so that</strong> the financial relationship is clear, traceable, and free of undocumented deletion or dispute.</p>
<h3>3. معايير القبول | Acceptance Criteria</h3>
<ol>
<li><strong>AR:</strong> إنشاء مسودة ببنود (وصف، مبلغ، كمية، عملة، استحقاق اختياري).<br/><strong>EN:</strong> Create a draft with lines (description, amount, quantity, currency, optional due date).</li>
<li><strong>AR:</strong> إرسال لصديق واحد عبر القائمة/QR/رابط؛ إشعار داخل التطبيق.<br/><strong>EN:</strong> Send to one friend via list/QR/link; in-app notification.</li>
<li><strong>AR:</strong> حالات: مسودة، بانتظار القبول، مستحقة، متأخرة، مسددة جزئياً، مسددة، مرفوضة، متنازع عليها.<br/><strong>EN:</strong> States: draft, pending acceptance, due, overdue, partially paid, paid, rejected, disputed.</li>
<li><strong>AR:</strong> قبول/رفض؛ الرفض ينهيها مع سبب؛ المصدر يلغي قبل القبول فقط؛ لا حذف.<br/><strong>EN:</strong> Accept/reject; rejection closes with a reason; the issuer may cancel before acceptance only; no deletion.</li>
<li><strong>AR:</strong> أي طرف يقترح تعديل وصف/مبلغ/كمية بند؛ الطرف الآخر يوافق/يرفض؛ الموافقة التلقائية بعد 5 أيام.<br/><strong>EN:</strong> Either party may propose an edit to a line description/amount/quantity; the counterparty approves/rejects; auto-approval after 5 days.</li>
<li><strong>AR:</strong> أثناء التعديل: الحالة متنازع عليها؛ البنود السابقة قابلة للدفع، الجديدة لا.<br/><strong>EN:</strong> During edit: status is disputed; previous lines remain payable, new lines do not.</li>
<li><strong>AR:</strong> لا يمكن خفض المبلغ الأصلي تحت المدفوع + المتنازل عنه؛ إذا وصل المتبقي المعتمد إلى صفر يُرفض التعديل المعلق.<br/><strong>EN:</strong> The original amount cannot be reduced below paid + waived; if approved remaining reaches zero, the pending edit is rejected.</li>
<li><strong>AR:</strong> دفع فردي/جماعي، جزئي/كامل، بمبلغ &gt;0 و≤ المتبقي المعتمد؛ تحقق خلفي وIdempotency؛ خصم واحد فقط.<br/><strong>EN:</strong> Single/bulk, partial/full payment with amount &gt;0 and ≤ approved remaining; backend verification and idempotency; one deduction only.</li>
<li><strong>AR:</strong> نجاح: تحديث المتبقي والحالة (مسددة جزئياً/مسددة) وإشعار الطرفين؛ فشل: لا تغيير في الحالة، سبب واضح، وإعادة محاولة.<br/><strong>EN:</strong> Success: update remaining and status (partially paid/paid) and notify both parties; failure: no status change, clear reason, and retry.</li>
<li><strong>AR:</strong> المديونية المتنازع عليها: فقط المتبقي المعتمد قابل للدفع؛ البنود المعدلة غير المعتمدة غير قابلة للدفع.<br/><strong>EN:</strong> Disputed debt: only the approved remaining is payable; unapproved edited lines are not payable.</li>
<li><strong>AR:</strong> سجل append-only للطرفين: إنشاء، إرسال، قبول، رفض، إلغاء، دفع، فشل، نقدي، تطبيق آخر، تنازل، إغلاق غير مدفوع، تذكير، نزاع.<br/><strong>EN:</strong> Append-only history for both parties: creation, send, accept, reject, cancel, payment, failure, cash, other app, waiver, unpaid closure, reminder, dispute.</li>
<li><strong>AR:</strong> مصادر التسوية: Paid cash، Host payment، Other-app payment، Waived؛ النقد المحصل = نقدي + host + other-app، ويستثنى waived.<br/><strong>EN:</strong> Settlement sources: paid cash, host payment, other-app payment, waived; cash collected = cash + host + other-app, excluding waived.</li>
<li><strong>AR:</strong> التنازل فقط بعد دفع جزئي ومن المصدر؛ لا لإغلاق مديونية لم تُدفع. إغلاق غير مدفوع بواسطة System Admin مع سبب؛ المتبقي waived؛ الحالة مسددة؛ لا يظهر في النقد المحصل. تمييز الدفع عن التنازل في السجل.<br/><strong>EN:</strong> Waiver only after partial payment and by the issuer; not to close an unpaid debt. System Admin unpaid closure with a reason; remaining is waived; status is paid; it is excluded from cash collected. Distinguish payment from waiver in history.</li>
<li><strong>AR:</strong> تقارير/تصدير حسب المستأجر؛ لا حذف؛ عزل المستأجر؛ لا حركة أموال من الوحدة، بنكي ينفذ الدفع.<br/><strong>EN:</strong> Reports/export by tenant; no deletion; tenant isolation; no money movement in the module, Banky executes payment.</li>
</ol>
<h3>4. التفاصيل الوظيفية | Functional Details</h3>
<p dir="rtl">التدفق: مسودة ← إرسال ← قبول/رفض ← (اختياري) اقتراح تعديل ← موافقة/رفض أو مهلة 5 أيام ← دفع جزئي/كامل ← إغلاق. كل تغيير يُسجل، والنسخة السابقة من البند لا تُستبدل. المديونية المتنازع عليها تظل قابلة لدفع المتبقي المعتمد فقط.</p>
<p dir="ltr">Flow: draft → send → accept/reject → (optional) propose edit → approve/reject or 5-day timeout → partial/full payment → close. Every change is recorded and the previous line version is never overwritten. A disputed debt remains payable only for the approved remaining amount.</p>
<h3>5. التفاصيل التقنية | Technical Notes</h3>
<p dir="rtl">State Machine صريحة، Line Versioning، Approval Expiry Job (5 أيام)، Idempotency للدفع، قيود على مجموع البنود مقابل المدفوع/المتنازل عنه، Append-only Ledger، وAudit. يجب منع أي خصم مزدوج وفصل الدفع عن التنازل.</p>
<p dir="ltr">Explicit state machine, line versioning, approval-expiry job (5 days), payment idempotency, constraints on line totals versus paid/waived amounts, append-only ledger and audit. Double deduction must be prevented, and payment must be separated from waiver.</p>
<h3>6. خارج النطاق | Out of Scope</h3>
<p dir="rtl">تسوية الأموال، وحدة النزاعات الكاملة (SNA-127)، دفتر التسويات (SNA-125)، الهوية (SNA-123)، والترحيل (SNA-124).</p>
<p dir="ltr">Money settlement, the full disputes module (SNA-127), settlement ledger (SNA-125), identity (SNA-123) and migration (SNA-124).</p>
<h3>7. التبعيات والروابط | Dependencies &amp; Links</h3>
<p dir="rtl">تعتمد على المتطلب التجاري 122، وتمكين Banky Lite (SNA-129)، والمشتركين (SNA-131)، ودفتر التسويات (SNA-125)، والنزاعات (SNA-127). القصص المدمجة: SNA-130 (الدفع الجزئي)، SNA-133 (خدمة المديونية)، SNA-134 (السجل). الأب: Epic 120216000004657001.</p>
<p dir="ltr">Depends on business requirement 122, Banky Lite enablement (SNA-129), subscribers (SNA-131), settlement ledger (SNA-125) and disputes (SNA-127). Merged stories: SNA-130 (partial payment), SNA-133 (debt service) and SNA-134 (history). Parent Epic: 120216000004657001.</p>
<h3>8. الجاهزية والاكتمال | Definition of Ready &amp; Done</h3>
<p dir="rtl">جاهز عندما: نموذج البنود والحالات معتمد، سياسة التعديل والمهلة معتمدة، سياسة الدفع/التنازل/الإغلاق غير المدفوع معتمدة، ومالك الاختبار محدد. مكتمل عندما: الدورة الكاملة تعمل في Sandbox، والدفع Idempotent، والسجل والتقارير مطابقة، والعزل مثبت.</p>
<p dir="ltr">Ready when the line/state model, edit/timeout policy, payment/waiver/unpaid-closure policy and test ownership are approved. Done when the full lifecycle works in sandbox, payment is idempotent, history/reports reconcile, and isolation is proven.</p>
<h3>9. التقدير والأولوية | Estimation &amp; Priority</h3>
<p dir="rtl">التقدير السابق كان 1 نقطة لكل قصة (4 نقاط إجمالاً)، وهو غير واقعي لدورة كاملة تشمل State Machine ودفعاً وسجلاً. المرجع: القصة المكتملة 43 (تكامل) 6 نقاط، والقصة 14 (إدارة) 6 نقاط. التوصية <strong>8 نقاط</strong>. الأولوية High.</p>
<p dir="ltr">The prior estimate was 1 point per story (4 total), unrealistic for a full lifecycle with a state machine, payments and history. Analogs: completed Story 43 (integration) at 6 and Story 14 (management) at 6. Recommendation: <strong>8 points</strong>. Priority: High.</p>
`;

const specs = [
  { no: "129", itemId: "120216000004655029", sprintId: "120216000004656294", html: A },
  { no: "131", itemId: "120216000004655033", sprintId: "120216000004656294", html: B },
  { no: "126", itemId: "120216000004656300", sprintId: "120216000004656294", html: C },
];

const payloads = specs.map((s) => {
  const original = originalByNo[s.no] || "";
  return {
    no: s.no,
    itemId: s.itemId,
    sprintId: s.sprintId,
    description: `${original.trimEnd()}\n${SEP}\n${s.html.trim()}`,
  };
});

fs.writeFileSync("reports/Invoicing-MService/2026-10-29/merge-description-payloads.json", JSON.stringify(payloads, null, 2), "utf8");
for (const p of payloads) {
  console.log(p.no, p.itemId, p.description.length, p.description.includes(SEP), p.description.startsWith(originalByNo[p.no].trimEnd()));
}
