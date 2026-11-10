# Zoho Sprints Professional Skills

ابدأ من [الدليل التفصيلي لربط MCP وتحديد المشروع واستخدام المهارة](GETTING_STARTED_MCP_AR.md).

مهارة Zoho Sprints عبر MCP، مبنية من متطلبات [المحادثة الأصلية](docs/REQUIREMENTS-TRACEABILITY_AR.md). تشمل دورَي Admin وDeveloper، فحص Sprint النشطة والتواريخ والتكرار، ربط Git وBMAD، وسجلًا محليًا لتجنب تكرار العناصر عند التشغيل اللاحق.

## التثبيت

يتطلب بناء الحزمة Node.js 22 أو أحدث. من داخل هذا المجلد:

```powershell
npm run check
node tools/install.mjs --editor codex --target "F:\zoho sprint skills"
```

إذا كانت نسخة مثبتة مسبقًا، توقف الأداة دون تغييرها. بعد مراجعتها، أضف `--force` للتحديث مع حفظ نسخة احتياطية في `.zoho-sprints-skill-backups/` داخل المشروع الهدف. المحررات المدعومة في أداة التثبيت: `codex`, `claude`, `opencode`, `cursor`, `kiro`, `antigravity`, `generic`. اختُبر مسار التثبيت برمجيًا؛ ظهور المهارة فعليًا في كل محرر يحتاج اختبارًا في بيئته.

## إعداد Zoho

اربط MCP وOAuth في المحرر بصورة منفصلة؛ الحزمة لا تتضمن عنوان الخادم الخاص أو الرموز. في مشروع الإعداد الحالي، المشغّل موجود في `mcp/` ويقرأ إعداد الاتصال من `docu/`، وقد نجح طلب قراءة مساحة العمل بعد النقل. في أي مشروع عمل، انسخ `.agents/skills/zoho-sprints/assets/profile.example.yaml` إلى `.zoho-sprints/profile.yaml`، ثم تحقق من الدور ومعرف مساحة العمل ومعرف مستخدم Zoho والمنطقة الزمنية. أضف أسطر `.agents/skills/zoho-sprints/assets/gitignore-zoho-sprints.txt` إذا أردت أن يبقى السجل محليًا.

## التطوير والتحقق

حرر المصدر داخل `.agents/skills/zoho-sprints/` فقط، ثم نفذ:

```powershell
npm run sync
npm run check
```

`sync` يولد `skills/zoho-sprints/` و`manifest.json` بصورة حتمية. `check` يشغّل الاختبارات ثم يتحقق من تطابق المصدر والنسخة الموزعة والروابط والعقد. ملف [تصميم الحزمة](docs/ARCHITECTURE_AR.md) يشرح المسؤوليات، و[مصفوفة المتطلبات](docs/REQUIREMENTS-TRACEABILITY_AR.md) تبين تغطية طلبات المحادثة.

## حدود مهمة

المهارة ليست خادم MCP ولا نظام صلاحيات. عمليات Zoho تعتمد على الأدوات والصلاحيات الحية. تدقيق Git أو BMAD لا يبدأ تلقائيًا بمجرد التثبيت، ولا تُنشأ أي عناصر في Zoho أثناء بناء الحزمة.

