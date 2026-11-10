# مصادر قاعدة معرفة Invoicing MService

## قراءة وتحليل

- `reports/project-details-both.out.json` — تفاصيل المشروعين، بما فيها UDFs والفريق.
- `reports/invoicing-sprints.out.json` — 12 سبرنت.
- `reports/invoicing-items.out.json` — 112 عنصرًا عبر 13 صفحة.
- `reports/Invoicing-MService/2026-10-28/open-story-details.json` / `.out.json` — تفاصيل 13 قصة قبل التحديث.
- `reports/Invoicing-MService/2026-10-28/epic-release-read.json` / `.out.json` — الإيبكات والإصدارات.
- صورة Project Details المرفقة من المستخدم — Current Project Team.

## تنفيذ وكتابة

- `reports/Invoicing-MService/2026-10-28/routing-batch.json` / `.out.json` — 13 UpdateItem لتوجيه الفريق.
- `reports/Invoicing-MService/2026-10-28/build-descriptions.mjs` — مولّد الأوصاف.
- `reports/Invoicing-MService/2026-10-28/description-updates.json` — الأوصاف الجديدة قبل الإرسال.
- `reports/Invoicing-MService/2026-10-28/apply-descriptions-direct.mjs` — الكتابة المباشرة عبر Zoho Sprints API.
- `reports/Invoicing-MService/2026-10-28/description-direct.out.json` — نتائج الكتابة 13/13.
- `reports/Invoicing-MService/2026-10-28/readback-final.json` — تحقق الطول والفاصل والحفاظ على النص القديم.
- `reports/Invoicing-MService/2026-10-28/verify-all-mcp.out.json` — تحقق MCP النهائي 13/13 (Owner، Analysis، Feature type، UDF، الوصف).

## قاعدة الاستخدام

- هذه المصادر خاصة بمشروع **Invoicing MService** فقط.
- لا تُستخدم بيانات WorldCup أو أي مشروع آخر لملء حقول هذا المشروع.
- لا تُعاد الكتابة من هذه الملفات دون قراءة Zoho أولاً والتأكد من عدم وجود تغيير بشري لاحق.

تاريخ السحب والتنفيذ: 2026-10-28.
