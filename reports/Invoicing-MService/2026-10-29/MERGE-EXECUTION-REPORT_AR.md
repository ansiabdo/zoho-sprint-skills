# تقرير تنفيذ دمج قصص Sprint10 — Invoicing MService

- **التاريخ:** 2026-10-29
- **المشروع:** `UP- Invoicing MService` — `projectId 120216000000593007`
- **السبرنت:** `Sprint10: Nov-2026 — Banky Lite & Friend Debt` — `120216000004656294`
- **Backlog:** `120216000000593009`
- **نطاق الكتابة:** هذا المشروع فقط. لا تغييرات في WorldCup أو أي مشروع آخر.

## 1. لماذا الدمج؟

كانت قصص Sprint10 ثماني قصص، كلها بنقطة واحدة:

`126, 128, 129, 130, 131, 132, 133, 134`

العدد الفعلي **8 قصص**، وليس 7 كما ذُكر في الطلب. القصص كانت أجزاء من تدفقين أكبر، وليست وحدات قيمة مستقلة.

## 2. القصص النهائية

| القصة الجامعة | السجلات المدمجة | النطاق | النقاط | Assignee | Feature type |
|---|---|---|---:|---|---|
| **SNA-129** `120216000004655029` | 128 + 129 + 132 | تمكين Banky Lite: التكامل والتهيئة وأطراف الفاتورة | 8 | Abdullah Al-Ansi | — (Backend/Admin) |
| **SNA-131** `120216000004655033` | 131 | المشتركون وتسجيل الأصدقاء | 3 | Mushtaq + Abdullah | Mobile |
| **SNA-126** `120216000004656300` | 126 + 130 + 133 + 134 | دورة حياة مديونية الأصدقاء | 8 | Mushtaq + Abdullah | Mobile |

## 3. ما تم في Zoho

### تحديث القصص الثلاث
- **SNA-129:** الاسم العربي `تمكين Banky Lite: التكامل والتهيئة وأطراف الفاتورة`، English `Banky Lite Enablement & API Integration`، النقاط 8.
- **SNA-131:** الاسم العربي `المشتركون وتسجيل الأصدقاء`، English `Subscribers & Friend Registration`، النقاط 3، وإضافة Abdullah إلى Assignee.
- **SNA-126:** الاسم العربي `دورة حياة مديونية الأصدقاء`، English `Friend Debt End-to-End Lifecycle`، النقاط 8.

### السجلات المدمجة
| # | itemId | الاسم بعد الدمج | دُمجت في |
|---:|---|---|---|
| 128 | `120216000004656304` | `[Merged into SNA-129] تكامل API بنكي لايت \| Banky Lite API Integration` | 129 |
| 132 | `120216000004657094` | `[Merged into SNA-129] نموذج أطراف الفاتورة: المزود والمصدر والمشترك \| Invoice Provider, Issuer & Subscriber` | 129 |
| 130 | `120216000004657007` | `[Merged into SNA-126] الدفع الجزئي والتحقق الخلفي \| Partial Payment & Backend Verification` | 126 |
| 133 | `120216000004656360` | `[Merged into SNA-126] تنفيذ خدمة مديونية الأصدقاء \| Friend Debt Service` | 126 |
| 134 | `120216000004655091` | `[Merged into SNA-126] سجل المديونية ومصادر التسوية \| Debt History & Settlement Sources` | 126 |

- نُقلت السجلات الخمسة من Sprint10 إلى Backlog.
- **لم تُحذف أي قصة.**
- لا يوجد Delete/Merge tool في MCP، ولا حالة Cancelled في المشروع.

### ما لم يتغيّر
- **الحالة:** القصص الثلاث `To do`.
- **التواريخ:** 2026-11-01 → 2026-11-15.
- **Status / Sprint / Release:** لا تغيير في Release؛ كل السجلات `releaseCount=0`.
- **الروابط:** لم تُنشأ روابط Zoho بسبب فشل اكتشاف `linktypeid`.

## 4. الأوصاف

تمت كتابة وصف جديد لكل قصة جامعة، مع الحفاظ على النص القديم ثم الفاصل:

```text
##+=================================================##
```

| القصة | طول الوصف | الفاصل | النص القديم محفوظ |
|---|---:|---|---|
| 126 | 9,138 | ✅ | ✅ |
| 129 | 7,585 | ✅ | ✅ |
| 131 | 6,409 | ✅ | ✅ |

**SNA-131:** الوصف السابق كان 990 حرفاً فقط بلا فاصل — أي أن محاولة الوصف السابقة لم تُحفظ. تم إصلاح ذلك في هذه الجولة.

**طريقة الكتابة:** Zoho Sprints API مباشرة مع `application/x-www-form-urlencoded`. إرسال JSON يرجع 200 لكنه لا يحفظ الوصف.

## 5. التحقق بعد الكتابة

- **Sprint10:** 3 قصص فقط — 126، 129، 131.
- **Backlog:** 10 قصص — 5 مستقلة (122/123/124/125/127) + 5 سجلات مدمجة (128/132/130/133/134).
- **النقاط:** 126 = 8، 129 = 8، 131 = 3.
- **Assignees:** 126 و131 = Mushtaq + Abdullah؛ 129 = Abdullah.
- **الأسماء:** عربية وإنجليزية مطابقة.
- **الوصف:** الفاصل موجود والنص القديم محفوظ في 3/3.

## 6. الملفات والأدلة

- `pre-merge-backup.json`
- `current-13-correct.json`
- `merge-updates.json` / `merge-updates.out.json`
- `move-128-test.json` / `move-128-test.out.json`
- `move-rest.json` / `move-rest.out.json`
- `build-merge-descriptions.mjs`
- `merge-description-payloads.json`
- `apply-merge-descriptions.mjs`
- `merge-descriptions.out.json`
- `read-sprint-backlog.json` / `read-sprint-backlog.out.json`

## 7. نقاط مفتوحة

1. **123/124/125/127 = 0 نقاط** — تحتاج تقديراً قبل Sprint Planning.
2. **122 = 6 نقاط** — لكن وصفها 18.5k حرف (PRD)؛ قد تحتاج مراجعة.
3. **لا Release** — القصص الثلاث بلا Release؛ الحقل الإلزامي غير مكتمل.
4. **لا روابط Zoho** — الربط موثق بالاسم والوصف فقط.
5. **Backend Feature type** — لا يوجد خيار Backend في `UDF_RADIO1`.
6. **حالة To do** — لم تُغيّر؛ لا تدّعِ أنها جاهزة أو منفذة.
