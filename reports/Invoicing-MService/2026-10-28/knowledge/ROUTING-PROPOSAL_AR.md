# توجيه الفريق — Invoicing MService

> ✅ **تم التطبيق في 2026-10-28** على 13 قصة، وتم التحقق بالقراءة 13/13. الجدول أدناه هو التوجيه النهائي المطبّق، وليس اقتراحاً.

## جدول التوجيه المقترح

| # | القصة | السطح | Assignee مقترح | Analysis team |
|---:|---|---|---|---|
| 122 | خدمة تسجيل وإدارة مديونية الأصدقاء | Mobile + Backend | Mushtaq Alabbasi + Abdullah Al-Ansi | Mohammed Alaqari |
| 123 | هوية وتسجيل دخول مستقلان لفاتورتي | Web/Admin + Backend | Abdullah Al-Ansi | Mohammed Alaqari |
| 124 | ترحيل مستأجر بنكي واستمرارية الخدمة | Backend | Abdullah Al-Ansi | Mohammed Alaqari |
| 125 | دفتر التسويات المالية لمالك المستأجر | Web/Admin + Backend | Abdullah Al-Ansi | Mohammed Alaqari |
| 127 | إدارة النزاعات على الفواتير | Web/Admin + Backend | Abdullah Al-Ansi | Mohammed Alaqari |
| 126 | قبول ورفض المديونية وتعديل البنود | Mobile + Backend | Mushtaq Alabbasi + Abdullah Al-Ansi | Mohammed Alaqari |
| 128 | تكامل API بنكي لايت | Backend | Abdullah Al-Ansi | Mohammed Alaqari |
| 129 | تهيئة بنكي كمزود ومستأجر | Backend | Abdullah Al-Ansi | Mohammed Alaqari |
| 130 | الدفع الجزئي والتحقق الخلفي | Backend | Abdullah Al-Ansi | Mohammed Alaqari |
| 131 | المشتركون وتسجيل الأصدقاء | Mobile + Backend | Mushtaq Alabbasi + Abdullah Al-Ansi | Mohammed Alaqari |
| 132 | نموذج أطراف الفاتورة: المزود والمصدر والمشترك | Backend (+Admin) | Abdullah Al-Ansi | Mohammed Alaqari |
| 133 | تنفيذ خدمة مديونية الأصدقاء | Backend | Abdullah Al-Ansi | Mohammed Alaqari |
| 134 | سجل المديونية ومصادر التسوية | Mobile + Backend | Mushtaq Alabbasi + Abdullah Al-Ansi | Mohammed Alaqari |

## لماذا؟

- **Main Mobile** = Mushtaq؛ أي شاشة/تدفق في تطبيق الهاتف تحتاج إليه.
- **Main Back End** = Abdullah؛ أي API/DB/تكامل/ترحيل/تحقق خلفي يحتاج إليه.
- **Main Web** = Abdullah أيضًا؛ لذلك قصص Web/Admin + Backend لا تضيف شخصًا ثالثًا.
- **Analyst** = Mohammed؛ يوضع في `UDF_MULTIUSERPKL1` ولا يُسند كـ Assignee.
- **Backups** (Eissa Musleh، Ali Alshami، Amr Qadri) لا تُسند افتراضيًا.

## قرارات حُسمت أثناء التطبيق

- **122:** أُزيل Abdullah Al-Measar من Assignee؛ هو مالك/طالب وليس منفذاً. بقي Mushtaq + Abdullah Al-Ansi.
- **132:** اعتُبرت Backend + Admin، فأُسندت إلى Abdullah Al-Ansi مع Feature type = Admin Portal.
- **126–134:** نُقل Mohammed من Assignee إلى Analysis team. لم تُدمج القصص بعد؛ الدمج يحتاج موافقة لكل مجموعة.
- **Backups:** لم تُستخدم. Eissa وAli وAmr Qadri يبقون بدلاء عند تعذر الأساسي.
- **Backend-only:** 124/128/129/130/133 بلا Feature type لأن الحقل لا يوفّر خيار Backend. هذه فجوة في التصميم، وليست نقصاً في التوجيه.
