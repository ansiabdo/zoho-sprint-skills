# ملخص إعادة هيكلة Zoho — Banky Lite & Friend Debt

**التاريخ:** 2026-10-28  
**المستخدم المتصل:** Mohammed Alaqari — `120216000000359035` — Admin  
**المشروع:** Invoicing MService — `120216000000593007`  
**المساحة:** ykb — `767679505`

---

## 1. الـ Epic

| الحقل | القيمة |
|---|---|
| Epic ID | `120216000004657001` |
| Epic No | `3` |
| الاسم | بنكي لايت: الفواتير والأصدقاء والمديونية \| Banky Lite Invoicing, Friends & Debt |
| المالك | Mohammed Alaqari — `120216000000359035` |
| Business Requester | Nidhal |
| الوصف | Banky provider/tenant؛ فاتورة provider + issuer + subscriber؛ مشتركون/أصدقاء؛ Banky Lite APIs؛ Friend Debt حسب #122؛ دفع جزئي، قبول/رفض، سجل تاريخي. خارج النطاق: تسجيل الدخول المستقل، دفتر التسويات، النزاعات الكاملة، استيراد جهات الاتصال، API عام للمزودين. |

---

## 2. الـ Sprint

| الحقل | القيمة |
|---|---|
| Sprint ID | `120216000004656294` |
| الاسم | Sprint10: Nov-2026 — Banky Lite & Friend Debt |
| الحالة | Upcoming — لم يبدأ |
| البداية | 2026-10-31T21:00:00Z — 2026-11-01 00:00 بتوقيت عدن |
| النهاية | 2026-11-15T20:59:59Z — 2026-11-15 23:59 بتوقيت عدن |
| المدة | 11 يوم عمل |
| Scrum Master | Mohammed Alaqari — `120216000000359035` |
| عدد القصص | 8 |

---

## 3. قصص Sprint10

كل القصص: Story، To do، مرتبطة بالـ Epic `120216000004657001`، داخل Sprint `120216000004656294`. سبع قصص مسندة إلى Mohammed Alaqari، والثامنة (S3) مسندة إلى Mushtaq Alabbasi `120216000000293163`.

| # | Item No | Item ID | الاسم | الأولوية | UDF Arabic | UDF English | Requester |
|---|---|---|---|---|---|---|---|
| S1 | 129 | `120216000004655029` | تهيئة بنكي كمزود ومستأجر \| Banky Provider & Tenant Setup | High | تهيئة بنكي كمزود ومستأجر | Banky Provider & Tenant Setup | Nidhal |
| S2 | 132 | `120216000004657094` | نموذج أطراف الفاتورة: المزود والمصدر والمشترك \| Invoice Provider, Issuer & Subscriber | High | نموذج أطراف الفاتورة | Invoice Provider, Issuer & Subscriber | Nidhal |
| S3 | 131 | `120216000004655033` | المشتركون وتسجيل الأصدقاء \| Subscribers & Friend Registration | High | المشتركون وتسجيل الأصدقاء | Subscribers & Friend Registration | Nidhal |
| S4 | 128 | `120216000004656304` | تكامل API بنكي لايت \| Banky Lite API Integration | High | تكامل API بنكي لايت | Banky Lite API Integration | Nidhal |
| S5 | 133 | `120216000004656360` | تنفيذ خدمة مديونية الأصدقاء \| Friend Debt Service | High | تنفيذ خدمة مديونية الأصدقاء | Friend Debt Service | Nidhal |
| S6 | 130 | `120216000004657007` | الدفع الجزئي والتحقق الخلفي \| Partial Payment & Backend Verification | High | الدفع الجزئي والتحقق الخلفي | Partial Payment & Backend Verification | Nidhal |
| S7 | 126 | `120216000004656300` | قبول ورفض المديونية وتعديل البنود \| Debt Acceptance & Line Edit Approval | High | قبول ورفض المديونية وتعديل البنود | Debt Acceptance & Line Edit Approval | Nidhal |
| S8 | 134 | `120216000004655091` | سجل المديونية ومصادر التسوية \| Debt History & Settlement Sources | Medium | سجل المديونية ومصادر التسوية | Debt History & Settlement Sources | Nidhal |

كل قصة: `points = 1`. القصص السبع: `startdate = 2026-10-31T21:00:00Z`، `enddate = 2026-11-15T20:59:59Z`، `duration = 11d`. S3: `startdate = 2026-10-31T18:00:00Z`، `enddate = 2026-11-15T17:59:59Z`، `duration = 10d 6h 59m`. تم ضبط هذه الحقول لتلبية متطلبات UpdateItem الإلزامية.

**تحديث S3:** أُضيف إلى وصف S3 أن قائمة الأصدقاء تأتي من بنكي/API (Mock حتى يتوفر)، وأن الوحدة لا تضيف/تعتمد/تحذف أصدقاء. وأُضيف معيار قبول صريح: نفس المستخدم يمكن أن يكون مشتركاً لدى أكثر من مزود/مصدر، ويمكن أن يكون مزوداً/مصدراً في تعامل آخر، بهوية واحدة دون تكرار المستخدم. نُقل «استيراد جهات الاتصال من الجهاز» و«واجهة الأدوار العامة» إلى خارج النطاق فقط، مع بقاء تعدد سجلات المشترك في النطاق.

---

## 4. قصة المتطلب التجاري #122

| الحقل | القيمة |
|---|---|
| Item ID | `120216000004656142` |
| Item No | `122` |
| الاسم | `[ Shared ] خدمة تسجيل وإدارة مديونية الاصدقاء` |
| الموقع | Backlog `120216000000593009` |
| الـ Epic | `120216000004657001` — تم الربط |
| المالكون | Abdullah Al-Measar `120216000000010017` + Mushtaq Alabbasi `120216000000293163` |
| الأولوية | None |
| النقاط | 6 (estimation 13) |
| التواريخ | 2026-10-05 → 2026-10-15 |
| الوصف | محفوظ كما هو (18,587 حرف) — لم يُعدّل |
| UDF_CHAR3/4/5 | خدمة تسجيل وإدارة المديونية / خدمة تسجيل وإدارة المديونية / nidhal |

**لم يتم تكرار نصها في أي قصة Sprint10.** القصص S5/S7/S8 تشير إليها كمتطلب تجاري وتغطي التنفيذ التقني فقط.

---

## 5. ما تم تأجيله إلى Backlog

هذه القصص خرجت من Sprint10 وما زالت مرتبطة بالـ Epic للمرجعية:

| Item No | Item ID | الاسم | الأولوية |
|---|---|---|---|
| 123 | `120216000004657003` | S2 — هوية وتسجيل دخول مستقلان لفاتورتي \| Standalone Fatoorati Identity & Login | High |
| 124 | `120216000004656296` | S3 — ترحيل مستأجر بنكي واستمرارية الخدمة \| Banky Tenant Migration & Continuity | Medium |
| 125 | `120216000004655019` | S4 — دفتر التسويات المالية لمالك المستأجر \| Tenant Owner Settlement Ledger | High |
| 127 | `120216000004655023` | S7 — إدارة النزاعات على الفواتير \| Invoice Disputes Management | Medium |

**غير موجود في Sprint10:** تسجيل الدخول المستقل، دفتر التسويات/القيود المالية، النزاعات الكاملة، استيراد جهات الاتصال، API عام للمزودين الخارجيين.

---

## 6. حالة الصوت والمراجع

- تم استخراج `_bmad-output.zip` إلى `reports/bmad-output/_bmad-output/`.
- PRD Friend Debt النهائي: `planning-artifacts/prds/prd-friend_debt-2026-10-28/prd.md`.
- محاولة النسخ الصوتي `small` فشلت بسبب تعارض `av` و`faster-whisper` (`metadata_errors`). تم تشغيل محاولة جديدة مع `av==12.3.0` في الخلفية؛ النتيجة لم تصل بعد.
- الاعتماد الحالي في المحتوى على: نص المستخدم + PRD + قصة #122. لم يتم الادعاء بمراجعة الصوت حتى يتوفر transcript.

---

## 7. الملفات

- `reports/fatoorati-epic-proposal-ar.md` — التصور الأولي (النسخة القديمة، مرجع تاريخي).
- `reports/zoho-created-summary.md` — ملخص الإنشاء القديم.
- `reports/zoho-restructure-summary.md` — هذا الملف.
- `reports/restructure-data.json` — نصوص الـEpic/Sprint/8 قصص.
- `reports/update-rest.json`، `reports/update-new-stories.json`، `reports/verify-items.json` — طلبات التحديث والتحقق.
- `reports/verify-final.out`، `reports/verify-items.out` — قراءة التحقق النهائية.
- `reports/bmad-output/_bmad-output/planning-artifacts/prds/prd-friend_debt-2026-10-28/` — PRD والملاحق.

---

## 8. الخطوات التالية

1. مراجعة Sprint10 والقصص الثماني في Zoho.
2. تأكيد ما إذا كانت القصص المؤجلة (123/124/125/127) تبقى مرتبطة بالـEpic أم تُفصل.
3. تعديل الإسناد أو النقاط أو التواريخ إذا لزم.
4. بدء الـSprint عند الجاهزية.
5. مراجعة transcript الصوتي عند اكتماله ومقارنته بالـPRD.
