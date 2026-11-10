# بيانات المشروع والفريق — Invoicing MService

## هوية المشروع

| الحقل | القيمة |
|---|---|
| الاسم | UP- Invoicing MService |
| projectId | `120216000000593007` |
| Backlog | `120216000000593009` |
| النوع | Scrum Project |
| الحالة | In-Progress |
| المالك | Abdullah Al-Ansi |
| المجموعة | ANA & BAS & DevsecOp... |
| Backend Stack | Dot Net |
| تاريخ الإنشاء | 2024-02-20 03:38 AM |
| منشئ المشروع | Abdullah Al-Measar |

## Current Project Team (من شاشة Project Details)

| الدور | العضو | userId |
|---|---|---|
| Analyst | Mohammed Alaqari (Me) | `120216000000359035` |
| Analyst Backup | Eissa Musleh | `120216000000175003` |
| Main Mobile App Developer | Mushtaq Alabbasi | `120216000000293163` |
| Mobile App Developer Backup | Ali Alshami | `120216000000535177` |
| Main Back End Developers | Abdullah Al-Ansi | `120216000000535227` |
| Back End Developer Backup | Amr Qadri | `120216000000015559` |
| Main Web Developer | Abdullah Al-Ansi | `120216000000535227` |
| Web Developer Backup | Amr Qadri | `120216000000015559` |

## قاعدة التوجيه

- **Analyst** → حقل **Analysis team** (`UDF_MULTIUSERPKL1`)، وليس Assignee.
- **Analyst Backup** → لا يُضاف إلا إذا كان المحلل الأساسي غير متاح.
- **Main Mobile App Developer** → Assignee لأي قصة Mobile.
- **Main Back End Developers** → Assignee لأي قصة Backend/API/DB/Sync/Integration.
- **Main Web Developer** → Assignee لأي قصة Web/Admin Portal.
- إذا كانت القصة تغطي أكثر من سطح (Mobile + Backend، أو Web + Backend)، يُضاف كل مالك رئيسي معني.
- **Backups لا تُسند افتراضيًا.** تُستخدم فقط عند تعذر المالك الرئيسي وبتسجيل السبب.
- في هذا المشروع Main Back End وMain Web هما نفس الشخص (Abdullah Al-Ansi)، لذلك قصص Web + Backend غالبًا تعني Abdullah فقط.

## التوجيه المطبّق (2026-10-28)

| # | السطح | Assignee النهائي | Analysis team | Feature type |
|---:|---|---|---|---|
| 122 | Mobile + Backend | Mushtaq + Abdullah Al-Ansi | Mohammed | Mobile |
| 123 | Web/Admin + Backend | Abdullah Al-Ansi | Mohammed | Admin Portal |
| 124 | Backend | Abdullah Al-Ansi | Mohammed | — |
| 125 | Web/Admin + Backend | Abdullah Al-Ansi | Mohammed | Admin Portal |
| 127 | Web/Admin + Backend | Abdullah Al-Ansi | Mohammed | Admin Portal |
| 126 | Mobile + Backend | Mushtaq + Abdullah Al-Ansi | Mohammed | Mobile |
| 128 | Backend | Abdullah Al-Ansi | Mohammed | — |
| 129 | Backend | Abdullah Al-Ansi | Mohammed | — |
| 130 | Backend | Abdullah Al-Ansi | Mohammed | — |
| 131 | Mobile + Backend | Mushtaq + Abdullah Al-Ansi | Mohammed | Mobile |
| 132 | Backend + Admin | Abdullah Al-Ansi | Mohammed | Admin Portal |
| 133 | Backend | Abdullah Al-Ansi | Mohammed | — |
| 134 | Mobile + Backend | Mushtaq + Abdullah Al-Ansi | Mohammed | Mobile |

**ملاحظات:**

- `Abdullah Al-Measar` أُزيل من Assignee القصة 122؛ دوره مالك/طالب وليس منفذاً.
- `Mohammed Alaqari` أُزيل من Assignee القصص 126–134، ووُضع في **Analysis team** (`UDF_MULTIUSERPKL1`) فقط.
- `Mushtaq` يأخذ قصص الموبايل، و`Abdullah Al-Ansi` يأخذ الباك إند والويب/الإدارة.
- القصص الباك إند فقط (124/128/129/130/133) بلا Feature type لأن الخيارات المتاحة لا تشمل Backend. هذه فجوة في الحقل، وليست خطأ توجيه.
- Backups (`Eissa`، `Ali`، `Amr Qadri`) لم تُستخدم؛ تبقى للطوارئ فقط.

## ملاحظة

القيم مأخوذة من Project Details كما في صورة المستخدم، مع مطابقة userIds من Zoho. لا تفترض أن هذه الأدوار ثابتة في مشاريع أخرى؛ كل مشروع له Team خاص.
