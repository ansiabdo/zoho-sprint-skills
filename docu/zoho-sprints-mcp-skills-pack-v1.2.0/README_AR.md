# Zoho Sprints MCP Skills Pack v1.2.0

حزمة مهارة واحدة قابلة للتثبيت للتعامل مع Zoho Sprints عبر MCP، مع قواعد منفصلة للمسؤول والمطور، وتدقيق Git وBMAD عند الطلب. اقرأ [تحليل الفجوات](GAP_ANALYSIS_AR.md) لمعرفة ما تغير عن v1.1.0.

## المحتويات

- `skills/zoho-sprints/SKILL.md`: نقطة الدخول الوحيدة للمهارة.
- `skills/zoho-sprints/references/`: قواعد الهوية، الأدوار، العمليات، Git، السجل المحلي، وBMAD.
- `skills/zoho-sprints/assets/`: قوالب محلية خالية من بيانات المصادقة.
- `scripts/install.mjs`: نسخ المهارة كاملة إلى مسار المحرر المختار، مع رفض استبدال نسخة موجودة إلا بـ `--force`.
- `scripts/validate-package.mjs` و`tests/`: فحص بنية الحزمة والتثبيت.
- `editor-guides/README_AR.md`: حدود دعم المحررات وخطوات الربط.

## تثبيت المهارة في مشروع Codex

من داخل مجلد هذه الحزمة، استخدم Node.js ثم استبدل مسار الهدف بمجلد مشروعك:

```powershell
node .\scripts\install.mjs --editor codex --target "F:\zoho sprint skills"
```

ينسخ هذا الأمر المهارة إلى `.agents/skills/zoho-sprints` عند التثبيت الأول. إذا كانت نسخة موجودة، توقف الأداة دون تغييرها؛ راجعها ثم استخدم `--force` للتحديث مع حفظ نسخة احتياطية. لا يغير الأمر اتصال MCP أو بيانات Zoho. قد تحتاج إلى بدء محادثة جديدة إذا لم تظهر المهارة فورًا.

لتثبيت المحررات الأخرى، اقرأ [دليل المحررات](editor-guides/README_AR.md). تشغيل ChatGPT على الويب يحتاج طريقة استيراد/إضافة مناسبة لبيئته؛ نسخ ملفات محلية وحده لا يربطه بالخادم.

## تشغيل آمن

1. اربط خادم Zoho MCP في بيئة المحرر أو العميل، وجرّب قراءة مساحة العمل أولًا. احتفظ بعنوان الاتصال الخاص وبيانات OAuth خارج ZIP وخارج المستودعات المشتركة.
2. انسخ `skills/zoho-sprints/assets/profile.example.yaml` إلى `.zoho-sprints/profile.yaml` داخل المشروع، واضبط `role` و`workspace_id` و`current_user_id` بعد التحقق من Zoho. أضف أسطر `assets/gitignore-zoho-sprints.txt` إلى `.gitignore` إذا كان السجل محليًا. لا تفترض أن اسم العرض يكفي لتحديد المستخدم.
3. اطلب قراءة عناصر محددة أو تحليل Git/ملفات BMAD. تحليل Git وBMAD يبدأ بتقرير مراجعة، ثم تُنفذ الكتابات المصرح بها فقط بعد فحص التكرار والصلاحيات.

## التحقق

```powershell
node --test .\tests\*.test.mjs
node .\scripts\validate-package.mjs .
```

هذه الحزمة ليست خادم MCP ولا تضيف صلاحيات للحساب. أداة التثبيت تنسخ المهارة فقط؛ كل عمليات Zoho الفعلية تستخدم الخادم المتصل ومخططات أدواته الحالية.
