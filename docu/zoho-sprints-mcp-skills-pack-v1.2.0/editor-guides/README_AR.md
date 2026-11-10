# تثبيت المهارة وربط MCP حسب المحرر

الحزمة لها مصدر واحد في `skills/zoho-sprints/`. أداة التثبيت تنسخ المجلد كاملًا، بما فيه `references` و`assets`، إلى مسار المحرر. نفّذ الأوامر من مجلد الحزمة، وبدّل `--target` بمجلد المشروع المطلوب. لا تنقل ملف `SKILL.md` وحده لأن روابطه النسبية ستنكسر.

| المحرر | أمر التثبيت | حالة التحقق في هذه الحزمة |
|---|---|---|
| Codex | `node scripts/install.mjs --editor codex --target <project>` | اختُبر نسخ الملفات إلى `.agents/skills/zoho-sprints` محليًا. |
| Claude Code | `node scripts/install.mjs --editor claude --target <project>` | مسار نسخ مدعوم؛ لم تُختبر جلسة Claude فعلية هنا. |
| OpenCode | `node scripts/install.mjs --editor opencode --target <project>` | مسار نسخ مدعوم؛ لم تُختبر جلسة OpenCode فعلية هنا. |
| Cursor | `node scripts/install.mjs --editor cursor --target <project>` | اختُبر نسخ المهارة ومؤشر `.cursor/rules/zoho-sprints.mdc`؛ لم تُختبر جلسة Cursor فعلية. |
| Kiro | `node scripts/install.mjs --editor kiro --target <project>` | ينسخ المهارة ومؤشر `.kiro/steering/zoho-sprints.md`؛ لم تُختبر جلسة Kiro فعلية. |

استخدم `--force` فقط إذا أردت استبدال نسخة مثبتة. تتحقق الأداة من بقاء أهداف النسخ داخل مجلد المشروع وترفض الاستبدال الافتراضي. كل محرر يحتاج إعداد MCP الخاص به بصورة منفصلة؛ المهارة لا تتضمن رابطًا خاصًا أو OAuth.

**ChatGPT وAntigravity ومحررات أخرى:** استخدم طريقة استيراد المهارات وإضافة خوادم MCP التي يوفرها المنتج والإصدار المستخدم، ثم انقل مجلد المهارة كاملًا حيث يدعم ذلك. لا توجد طريقة ملفات محلية موحدة تضمن عملها في كل هذه البيئات؛ تحقق من ظهور المهارة والأدوات بطلب قراءة فقط قبل أي كتابة.

بعد التثبيت، تحقق من ظهور المهارة، ومن وصول MCP، ومن نجاح أداة قراءة، ثم اضبط ملف الدور والهوية محليًا. نجاح الاتصال لا يثبت صلاحية الكتابة أو اكتمال البحث عبر الصفحات.
