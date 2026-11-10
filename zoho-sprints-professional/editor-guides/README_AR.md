# تثبيت المهارة في المحررات

انسخ المجلد كاملاً، ثم شغّل من داخله (Node.js 22+):

```powershell
node tools/install.mjs --editor codex --target "C:\path\to\project"
```

استبدل اسم المحرر بالقيمة المناسبة:

| المحرر | القيمة | مكان المهارة داخل المشروع |
|---|---|---|
| Codex | codex | .agents/skills/zoho-sprints |
| Antigravity | antigravity | .agents/skills/zoho-sprints |
| Cursor | cursor | .cursor/skills/zoho-sprints |
| Kiro | kiro | .kiro/skills/zoho-sprints |
| OpenCode | opencode | .opencode/skills/zoho-sprints |
| Claude Code | claude | .claude/skills/zoho-sprints |
| محرر متوافق مع .agents/skills | generic | .agents/skills/zoho-sprints |

لا تحتاج أداة التثبيت إلى بيانات اتصال. عند وجود نسخة سابقة ترفض الاستبدال؛ --force يحفظ نسخة احتياطية قبل التحديث. مجلد editor-adapters يحتوي مؤشرات اختيارية للإصدارات القديمة؛ عدّل مسار المؤشر عند استخدامه مع تثبيت مختلف. لا تحتاجها الإصدارات التي تكتشف المهارة مباشرة.

## ChatGPT وأي محرر آخر

دعم MCP وحده لا يعني دعم تحميل SKILL.md. إذا توفرت آلية استيراد Skills، استورد مجلد skills/zoho-sprints كاملاً. وإلا أتح ملفات المهارة كمراجع للمشروع وأضف التعليمات التالية إلى تعليماته:

> عند التعامل مع Zoho Sprints اقرأ SKILL.md من مجلد zoho-sprints كاملاً، ثم policy-contract.md والـ workflow والـ checks الخاصة بالطلب. اكتشف أدوات MCP الفعلية، والتزم بدور المستخدم وبقيود الإسناد والتواريخ والتكرار. لا تدعِ قراءة ملف غير متاح.

في ChatGPT الويب يلزم اتصال MCP متاح للحساب وإتاحة الملفات فعليًا؛ رفع المهارة وحده لا يربط Zoho ولا يتيح Git المحلي. تحليل Git يحتاج بيئة لها وصول للمستودع وتشغيل أوامر Git، أو أدلة مصدرة يتيحها المستخدم مع التصريح بأن التغطية محدودة. لذلك لا يوجد تثبيت مضمون لكل محرر بمجرد دعمه MCP.

## التشغيل الأول

1. اربط خادم Zoho MCP في إعدادات المحرر وأكمل المصادقة، دون وضع العنوان الخاص أو الرموز داخل المهارة.
2. انسخ assets/profile.example.yaml من المهارة إلى .zoho-sprints/profile.yaml في مشروع العمل؛ حدد admin أو developer ثم تحقق من معرف المستخدم والمشروع والمنطقة الزمنية عبر Zoho.
3. اطلب: «استخدم zoho-sprints وافحص الاتصال والأدوات للقراءة فقط».
4. للمطور: «اعرض القصص المسندة لي فقط»، ثم «حلل تغييرات Git واربطها بالقصص مع مراجعة السجل السابق».
5. للإنشاء: «أضف العناصر الجديدة وفق الربط الذي تحققته وسجل نتائج الإنشاء محليًا». لا يتجاوز هذا الطلب شروط الإسناد والتكرار والتاريخ.
6. لـ BMAD: «اقرأ مخرجات BMAD المعتمدة، طابقها مع Zoho، وأضف العناصر غير الموجودة ضمن صلاحياتي».

## مصادر مسارات التثبيت

راجعت بتاريخ 2026-10-27: [Cursor](https://cursor.com/help/customization/skills)، [Kiro](https://kiro.dev/docs/skills/)، [OpenCode](https://opencode.ai/docs/skills/)، [Antigravity](https://antigravity.google/docs/skills). اختبارات الحزمة تختبر نسخ الملفات؛ لم تُختبر جلسة حية في كل محرر.
