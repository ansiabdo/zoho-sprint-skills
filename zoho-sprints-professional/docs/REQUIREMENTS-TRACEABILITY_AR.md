# ربط متطلبات المحادثة بملفات المهارة

المصدر: `chat.txt` المحفوظ في مجلد `docu` بمشروع الإعداد. هذا الملف يلخص طلبات المستخدم التشغيلية، لا نتائج Zoho الحالية. سياسة التنفيذ في `references/policy-contract.md`، و`contract.json` يحدد المفردات البنيوية.

| طلب المستخدم في المحادثة | ملف التنفيذ | فحص النتيجة |
|---|---|---|
| المسؤول يدير المشاريع وSprints وأنواع العناصر، ويغلق Sprint عندما تتاح الأداة والصلاحية. | `workflows/admin-management.md` | `checks/read-coverage.md`, `checks/write-verification.md` |
| المطور يستعرض القصص والمهام المسندة إليه فقط. | `workflows/developer-browse.md` | `checks/read-coverage.md` وحدود العرض في `references/policy-contract.md` |
| إضافة Task/Bug تحت User Story مسندة للمطور. | `workflows/developer-child-item.md` | تحقق نوع الأب ومعرف المكلّف والتكرار وقراءة العنصر بعد الإنشاء. |
| إنشاء Story في Sprint Active وداخل البداية/النهاية فقط، مع فحص عدة Sprints متزامنة. | `workflows/developer-story.md` | حالة Zoho والوقت في المنطقة الموثقة، فحص التكرار، ثم read-back. |
| تنبيه عند Story مماثلة، واقتراح العمل تحت القائمة إن كانت مسندة إليه. | `workflows/developer-story.md`, `references/policy-contract.md` | تصنيف `exact/likely/related/none_in_scope/unknown_coverage` وحجب تفاصيل عمل الآخرين. |
| تحليل Git المحلي، بما يشمل commits وstaged وunstaged وuntracked، وربط التغييرات بقصص ومهام دقيقة. | `workflows/git-audit.md` | `checks/audit-continuity.md`, `assets/audit-report.template.md` |
| إنشاء Story جديدة فقط إذا كان العمل المستقل يستحقها وداخل Sprint مؤهلة، بلا تكرار. | `workflows/git-audit.md`, `workflows/developer-story.md` | تغطية البحث، صلاحية الدور، أهلية Sprint، ومراجعة المستخدم عند الالتباس. |
| سجل محلي دائم: تحديث حالات العناصر أولًا، تحليل الجديد فقط، وتجنب إعادة الإنشاء بعد انقطاع. | `references/audit-ledger.md` | `checks/audit-continuity.md`, حالات `contract.json`. |
| نقل مخرجات BMAD المعتمدة إلى Zoho دون تكرار. | `workflows/bmad-import.md` | مصدر/قسم ثابت، فحص Zoho والسجل، والتحقق بعد أي كتابة. |
| الحزمة تعمل عبر المحررات الداعمة للمهارات وMCP. | `tools/install.mjs`, `editor-adapters/`, `README_AR.md` | اختبارات التثبيت؛ تظل تهيئة MCP منفصلة لكل محرر. |

الحد المهم: مهارات Markdown تضبط سلوك المساعد ولا تنفذ مزامنة Git أو BMAD آليًا بمجرد تثبيتها. يبدأ كل تدقيق بطلب تشغيل في مستودع Git حقيقي وملف دور وهوية موثق. لا يوجد إنشاء أو تعديل في Zoho ضمن بناء هذه الحزمة.
