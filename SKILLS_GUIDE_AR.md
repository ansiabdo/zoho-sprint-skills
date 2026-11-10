# دليل المهارات (Skills) — Zoho Sprints Professional

> **الهدف:** شرح تشغيل مهارات Zoho وآلية التنسيق الشبيهة بـ BMAD، مع توصية عملية بالخطوة التالية بناءً على نتيجة كل مرحلة.

> **الوضع الحالي:** مهارة `zoho-workflow` موجودة الآن في `.agents/skills/` و`.opencode/skills/`. هي نقطة الدخول للطلبات متعددة المراحل؛ يمكن استدعاء مهارة متخصصة مباشرة لطلب محدد. المسارات أدناه أمثلة مشروطة، وليست سلسلة إلزامية. أداة `zoho-sprints-professional/tools/install.mjs` الحالية تثبّت `zoho-sprints` فقط من الحزمة القديمة، ولا تثبّت المهارات الست الموجودة في هذا المستودع.

---

## 📑 جدول المحتويات

1. [لماذا لا تظهر المهارات في المحرر (التشخيص + الحل)](#1-لماذا-لا-تظهر-المهارات-في-المحرر-التشخيص--الحل)
2. [ما هي المهارات (6 مهارات)](#2-ما-هي-المهارات-6-مهارات)
3. [سلسلة العمل (Orchestration) — نمط BMAD](#3-سلسلة-العمل-orchestration--نمط-bmad)
4. [نوع 1: مشروع موجود (مع كود)](#4-نوع-1-مشروع-موجود-مع-كود)
5. [نوع 2: مشروع جديد (تحليل وتجهيز)](#5-نوع-2-مشروع-جديد-تحليل-وتجهيز)
6. [كيف تستخدم المهارات (Quick Start)](#6-كيف-تستخدم-المهارات-quick-start)
7. [القواعد غير القابلة للتفاوض (Professional Standards)](#7-القواعد-غير-القابلة-للتفاوض-professional-standards)
8. [استكشاف الأخطاء (Troubleshooting)](#8-استكشاف-الأخطاء-troubleshooting)
9. [الملفات والمراجع](#9-الملفات-والمراجع)

---

## 1. لماذا لا تظهر المهارات في المحرر (التشخيص + الحل)

### مسارات التحميل

النسخة النشطة في هذا المستودع موجودة في:

```
.agents/skills/<skill-name>/SKILL.md
```

وتوجد نسخة مطابقة في `.opencode/skills/`. تختلف آلية اكتشاف المهارات بين المحررات؛ تحقق من المسار المدعوم في المحرر المستهدف:

| المحرر | المجلد الذي يبحث فيه | ظهور المهارات |
|---|---|---|
| OpenCode | `.opencode/skills/<skill>/` | ✅ موجود |
| Claude Code | `.claude/skills/<skill>/` | ❌ غير موجود |
| Cursor | `.cursor/skills/<skill>/` | ❌ غير موجود |
| Kiro | `.kiro/skills/<skill>/` | ❌ غير موجود |
| Codex / Antigravity / Generic | `.agents/skills/<skill>/` | ✅ (موجود) |

إذا لم تظهر المهارات في محرر آخر، ثبّت **المهارات الست** في مساره المدعوم أو اربط المسار `.agents/skills/` إن كان المحرر يدعمه. تحقق من المسار واسم المهارة بعد النسخ.

### الحل (خطوة واحدة)

المثبّت `tools/install.mjs` داخل حزمة `zoho-sprints-professional` ينسخ مهارة `zoho-sprints` وحدها من الحزمة. لتشغيل التنسيق الكامل في هذا المستودع، استخدم `.agents/skills/` أو `.opencode/skills/` الموجودتين بالفعل؛ وللنقل إلى محرر آخر انسخ مجلدات المهارات الست كاملة مع مراجعها:

```powershell
# مثال: نسخة كاملة لمحرر يدعم .claude/skills
New-Item -ItemType Directory -Path .claude\skills -Force | Out-Null
Copy-Item -Path .agents\skills\* -Destination .claude\skills -Recurse
```

لا تستخدم مثبّت الحزمة لاستبدال `.agents/skills/zoho-sprints` هنا؛ مصدره أقدم من النسخة النشطة. عند النسخ إلى محرر جديد، أنشئ مجلد الوجهة أولًا وتحقق من عدم الكتابة فوق تعديلات محلية فيه.

**التحقق بعد التثبيت:**

```powershell
# OpenCode
Get-ChildItem -Path .opencode\skills -Recurse -Filter "SKILL.md"

# Claude Code
Get-ChildItem -Path .claude\skills -Recurse -Filter "SKILL.md"
```

> **ملاحظة:** ظهور المهارة في قائمة المحرر قد يتطلب إعادة تحميل المشروع أو جلسة جديدة بعد إضافة الملفات.

---

## 2. ما هي المهارات (6 مهارات)

| # | المهارة | الغرض | متى تستخدم | يعتمد على |
|---|---|---|---|---|
| 1 | **zoho-workflow** | اختيار المرحلة والمهارة التالية وتسجيل التقدم والتوصية التالية | طلب متعدد المراحل أو «ما الخطوة التالية؟» | المهارات المتخصصة حسب الحاجة |
| 2 | **zoho-sprints** | قراءة/إدارة Zoho Sprints وتدقيق Git/BMAD | أي عملية Zoho | MCP connection, profile.yaml |
| 3 | **user-story-authoring** | صياغة وتحليل User Stories ومعايير قبولها | إنشاء/مراجعة Story | zoho-sprints للقراءة/الكتابة |
| 4 | **zoho-project-knowledge** | قاعدة معرفة منفصلة لكل مشروع | فهم المشروع وأنماطه | zoho-sprints عند الحاجة |
| 5 | **zoho-release-management** | تخطيط وإدارة الإصدارات | إصدار قابل للنشر | zoho-sprints |
| 6 | **zoho-work-item-linking** | علاقات العناصر وترحيل العمل | تبعيات، parent/child، carry-over | zoho-sprints |

**القاعدة:** `zoho-sprints` هي **القاعدة (base)** — كل المهارات الأخرى تُحمّلها للقراءة/الكتابة.

---

## 3. سلسلة العمل (Orchestration) — نمط BMAD

### المبدأ

> **"نفّذ المرحلة المناسبة للطلب، ثم أوصِ بالخطوة التالية بناءً على نتيجتها."**

تبدأ `zoho-workflow` بتحديد الهدف والمشروع والمصادر الحالية، ثم تختار المهارة المتخصصة. بعد كل نتيجة تُقيّم ما ينقص: تغطية القراءة، تعارض أو تكرار، مسودة Story، كتابة مصرح بها، تحقق بعد الكتابة، ربط، أو إصدار. يمكن تخطي المراحل غير اللازمة وتكرار مرحلة إذا تغيّر الدليل. الطلب المحدد يستدعي مهارته مباشرة.

كل تسليم متعدد المراحل ينتهي بتوصية واحدة: **الفعل + المهارة + السبب المدعوم بالدليل + الشرط/العائق**. إذا كان الطلب انتهى، يقال ذلك صراحة. التوصية ليست إذنًا لعملية كتابة جديدة. مخططا المشروع الموجود والجديد أدناه أمثلة لمسارات ممكنة وليسا شروطًا لكل طلب.

### مخطط القرار (Decision Tree)

```
┌─────────────────────────────────────────────────────────────┐
│  ما نوع المشروع؟                                            │
├────────────────────────┬────────────────────────────────────┤
│  مشروع موجود (مع كود)  │  مشروع جديد (تحليل وتجهيز)         │
└──────────┬─────────────┴──────────────┬─────────────────────┘
           │                            │
           ▼                            ▼
   ┌───────────────┐            ┌──────────────────┐
   │ 1. zoho-      │            │ 1. zoho-project- │
   │ project-      │            │ knowledge        │
   │ knowledge     │            │ (build KB from   │
   │ (build KB     │            │  empty project)  │
   │  from history)│            └────────┬─────────┘
   └───────┬───────┘                     │
           │                             ▼
           ▼                    ┌──────────────────┐
   ┌───────────────┐            │ 2. zoho-sprints  │
   │ 2. zoho-      │            │ (create project, │
   │ sprints       │            │  sprints, items) │
   │ (git-audit /  │            └────────┬─────────┘
   │  bmad-import) │                     │
   └───────┬───────┘                     ▼
           │                    ┌──────────────────┐
           ▼                    │ 3. user-story-   │
   ┌───────────────┐            │ authoring        │
   │ 3. user-story-│            │ (draft stories)  │
   │ authoring     │            └────────┬─────────┘
   │ (audit / fill │                     │
   │  delivery)    │                     ▼
   └───────┬───────┘            ┌──────────────────┐
           │                    │ 4. zoho-release- │
           ▼                    │ management       │
   ┌───────────────┐            │ (release train)  │
   │ 4. zoho-work- │            └────────┬─────────┘
   │ item-linking  │                     │
   │ (Part n at    │                     ▼
   │  sprint close)│            ┌──────────────────┐
   └───────────────┘            │ 5. zoho-work-    │
                                │ item-linking     │
                                │ (structure)      │
                                └──────────────────┘
```

### أمثلة مشروطة للتوصية التالية

| المهارة (الحالية) | المخرج | المهارة التالية (مقترحة) |
|---|---|---|
| zoho-project-knowledge | KB بمصادر وتغطية معروفة | zoho-sprints (audit / import) إذا وُجد Git أو BMAD معتمد؛ وإلا user-story-authoring عند وجود متطلب جديد |
| zoho-sprints (git-audit / bmad-import) | audit report + write intent | user-story-authoring (fill delivery) |
| zoho-sprints (document-actual-delivery) | appended evidence sections | zoho-work-item-linking إذا بقي عمل يحتاج ترحيلًا |
| user-story-authoring | draft story (bilingual) | zoho-sprints (create story) |
| zoho-sprints (create story) | new story ID | zoho-work-item-linking (parent/child) |
| zoho-release-management | release + version | zoho-sprints (associate items) إذا لم ترتبط العناصر بعد |
| zoho-work-item-linking (sprint close) | Part n items + links | zoho-sprints (close sprint) |

---

## 4. نوع 1: مشروع موجود (مع كود)

**السيناريو:** المشروع (مثل `WorldCup-New`) موجود، имеет код، имеет историю в Zoho.

### التسلسل (أولاً → ثم)

| الخطوة | المهارة | الإجراء | المخرج |
|---|---|---|---|
| 1 | **zoho-project-knowledge** | بناء KB من تاريخ Zoho + BMAD/Git | `INDEX.md`, `PATTERNS.md`, `STORIES.md` |
| 2 | **zoho-sprints** (git-audit) | مطابقة Git commits ↔ Zoho items | audit report + write intent |
| 3 | **zoho-sprints** (bmad-import) | مطابقة BMAD artifacts ↔ Zoho | consolidated micro-stories |
| 4 | **user-story-authoring** | مراجعة/تدقيق stories (AC, تقدير, sprint) | story review notes |
| 5 | **zoho-sprints** (document-actual-delivery) | إلحاق إثبات التسليم (separator + evidence) | updated descriptions |
| 6 | **zoho-work-item-linking** | Part n naming at sprint close | linked carry-over items |

### مثال (WorldCup-New — هذا المشروع)

```
1. zoho-project-knowledge  →  KB للمشروع 120216000004162606
2. zoho-sprints (git-audit)  →  audit against branch "test", HEAD 026d2741
3. zoho-sprints (bmad-import) →  BMAD 10.1-10.5 done, 10.6 backlog
4. user-story-authoring     →  audit stories 116-133, AC comparison
5. zoho-sprints (actual-delivery) →  append evidence to 116-122, 126-128, 53
6. zoho-work-item-linking   →  Part 2 for 118/119/121/122 carry-over to SP6
```

---

## 5. نوع 2: مشروع جديد (تحليل وتجهيز)

**السيناريو:** مشروع جديد — لا كود، لا تاريخ. يجب **تحليله وتجهيزه** أولاً.

### "أولاً تحليل، ثم تجهيز"

| المرحلة | المهارة | الإجراء | المخرج |
|---|---|---|---|
| **تحليل** | zoho-project-knowledge | إنشاء KB (من قالب فارغ، من requirements) | هيكل KB |
| **تحليل** | zoho-sprints (connection) | اختبار MCP + إعداد profile.yaml | اتصال مُتحقق |
| **تجهيز** | zoho-sprints (admin-management) | إنشاء project, sprints, epics | project ID, sprint IDs |
| **تجهيز** | user-story-authoring | صياغة stories (bilingual, AC, estimation) | draft stories |
| **تجهيز** | zoho-sprints (developer-story) | إنشاء stories في Zoho | story IDs |
| **تجهيز** | zoho-work-item-linking | parent/child, dependencies | linked structure |
| **تجهيز** | zoho-release-management | release train + version | release ID |

### الفرق (موجود vs جديد)

| البند | مشروع موجود | مشروع جديد |
|---|---|---|
| نقطة البداية | KB من تاريخ Zoho | KB من requirements (فارغة) |
| التدقيق | git-audit / bmad-import | لا يوجد (لا كود بعد) |
| الـStories | مراجعة existing | صياغة from scratch |
| التسليم (actual delivery) | إلحاق evidence | غير منطبق (لا execution بعد) |
| carry-over (Part n) | عند sprint close | N/A (sprint 1) |

---

## 6. كيف تستخدم المهارات (Quick Start)

### 6.1 التثبيت (مرة واحدة)

```powershell
Get-ChildItem .agents\skills -Directory | Select-Object -ExpandProperty Name
Get-ChildItem .opencode\skills -Directory | Select-Object -ExpandProperty Name
```

### 6.2 إعداد Profile

```powershell
# نسخ القالب
Copy-Item .agents\skills\zoho-sprints\assets\profile.example.yaml .zoho-sprints\profile.yaml
# عدّل role (admin/developer) و user identity
```

### 6.3 اختبار الاتصال

```powershell
# في المحادثة، اطلب:
# "connection test" → zoho-sprints (checks/connection.md)
```

### 6.4 بدء التنسيق وطلب التوصية

ابدأ مثلًا بـ: «استخدم `zoho-workflow` لمراجعة المشروع X وتحديد المرحلة الحالية والخطوة التالية». أو اسأل: «ما الخطوة التالية لمشروع X بناءً على Zoho وGit؟». إذا كان طلبك محددًا، مثل «اكتب Story لهذه الميزة»، استخدم المهارة المتخصصة مباشرة.

صيغة التسليم: **الخطوة التالية الموصى بها: الفعل باستخدام المهارة — السبب. الشرط: ما يلزم قبل التنفيذ أو لا يوجد.** وعندما تكون الخطوة ضمن التفويض الحالي، يكملها الوكيل قبل التسليم بدل الاكتفاء باقتراحها.

### 6.5 تدفق عمل نموذجي (موجود)

```
1. "Build KB for project X"          → zoho-project-knowledge
2. "Git audit against branch Y"      → zoho-sprints (git-audit)
3. "BMAD import for sprint Z"        → zoho-sprints (bmad-import)
4. "Audit story 116 ACs"             → user-story-authoring
5. "Document actual delivery for 116" → zoho-sprints (actual-delivery)
6. "Carry over 118 to SP6"           → zoho-work-item-linking
```

### 6.6 تدفق عمل نموذجي (جديد)

```
1. "Create KB skeleton for new project"  → zoho-project-knowledge
2. "Test MCP connection"                 → zoho-sprints (connection)
3. "Create project + SP1"                → zoho-sprints (admin-management)
4. "Draft story: As a player..."         → user-story-authoring
5. "Create story in Zoho"                → zoho-sprints (developer-story)
6. "Link story to epic"                  → zoho-work-item-linking
7. "Create release v1.0"                 → zoho-release-management
```

---

## 7. القواعد غير القابلة للتفاوض (Professional Standards)

### من `zoho-sprints`

1. **الكتابة وفق التفويض الحالي** — الطلب المحدد من المستخدم قد يفوّض الكتابة؛ المقترح أو القراءة وحدهما لا يفوّضانها. طبّق فحوصات الدور والصلاحيات والتكرار والحقول والتحقق بعد الكتابة.
2. **لا تخمين IDs** — resolve من Zoho reads (teamId, projectId, sprintId, itemId, userId).
3. **لا استبدال الوصف** — preserve byte-for-byte، append after `##+=================================================##`.
4. **لا تغيير حالة** لأن الكود موجود — status changes require acceptance evidence.
5. **لا duplicate** — search Backlog + sprints before create.
6. **Read back** — بعد كل write، اقرأ وأثبت.
7. **Hash before/after** — for descriptions (large writes use form-urlencoded fallback).

### من `user-story-authoring`

8. **Story = role + capability + value + AC** — task list ≠ story.
9. **لا اختراع requester/tester/assignee/points** — resolve from Zoho/BMAD/human.
10. **Assignee from Current Project Team** — Analyst → Analysis team; Main Mobile/Web/Back End → Assignee.
11. **Estimate by analogy** — record analog IDs, median, adjustment, confidence.
12. **Half-month sprint rule** — 1st–15th and 16th–end. Don't copy monthly pattern.
13. **Part n naming** at sprint close for carried/cloned items.

### من `zoho-release-management`

14. **Release ≠ sprint ≠ status** — release is a deployable version.
15. **Mobile version from code first** — else continue from last mobile release; never reset to v1.
16. **No "Released" without acceptance evidence** — even if code exists.

### من `zoho-project-knowledge`

17. **One project = one KB** — never merge projects.
18. **KB is not authority** — read back before claiming a change.

### من `zoho-work-item-linking`

19. **No link without reading both items** — confirm project/sprint/type/parent/status.
20. **Resolve real linktypeid** — never invent or reuse across workspaces.

---

## 8. استكشاف الأخطاء (Troubleshooting)

| المشكلة | السبب | الحل |
|---|---|---|
| المهارات لا تظهر في المحرر | مسار التحميل مختلف أو الجلسة قديمة | تحقق من المسار المدعوم، انسخ المهارات الست كاملة، ثم أعد تحميل الجلسة |
| "role missing" | `.zoho-sprints/profile.yaml` غير موجود | انسخ `profile.example.yaml` واملأ role/user |
| 414 / Error in executing tool (description) | وصف كبير | استخدم fallback form-urlencoded + read back (see `large-description-writes.md`) |
| "completed sprint not writable" (7401.14) | عنصر في sprint مكتمل | سجّل `unsupported_write`، لا تزيف الحقل |
| MCP terminated | session expired | أعد تشغيل zoho-batch.mjs |
| skill not listed in `available_skills` | مسار `.agents/skills/` غير موجود | تحقق من أن المستودع يحتوي `.agents/skills/` |
| duplicate match found | عنصر مشابه موجود | أوقف الإنشاء، راجع مع Owner/Admin |

---

## 9. الملفات والمراجع

### المهارات (Skills)

```
.agents/skills/
├── zoho-sprints/              # القاعدة (base)
│   ├── SKILL.md
│   ├── references/            # policy-contract, contract.json, field-completeness, ...
│   ├── workflows/             # admin-management, developer-story, git-audit, bmad-import, ...
│   ├── checks/                # connection, read-coverage, write-verification, audit-continuity
│   └── assets/                # templates, profile.example.yaml
├── user-story-authoring/
├── zoho-project-knowledge/
├── zoho-release-management/
├── zoho-work-item-linking/
└── zoho-workflow/           # تنسيق المراحل والتوصية التالية
```

### حزمة التوزيع (Professional)

```
zoho-sprints-professional/
├── tools/install.mjs          # مثبّت المحررات
├── editor-guides/README_AR.md # دليل المحررات
├── manifest.json              # manifest (sha256 hashes)
├── skills/zoho-sprints/       # نسخة التوزيع
├── docs/                      # ARCHITECTURE_AR, REQUIREMENTS-TRACEABILITY_AR, COMPARISON-AND-GAPS_AR
└── tests/                     # اختبارات
```

### مستندات إضافية

- `docu/INDEX_AR.md` — فهرس التوثيق (27 Oct 2026)
- `docu/zoho-sprints-mcp-skills-pack*/` — حزم MCP (v1.0, v1.1, v1.2)
- `.zoho-sprints-skill-backups/` — نسخ احتياطية من التثبيتات
- `.zoho-sprints-skill-staging/` — staging أثناء التثبيت

### التوثيق (Docs)

- `docs/ARCHITECTURE_AR.md` — 架构
- `docs/REQUIREMENTS-TRACEABILITY_AR.md` — تتبّع المتطلبات
- `docs/COMPARISON-AND-GAPS_AR.md` — المقارنة والفجوات

---

## ✅ الخلاصة (TL;DR)

1. `zoho-workflow` يحدد المرحلة المناسبة للهدف والمشروع والأدلة الحالية، ثم يستدعي المهارة المتخصصة.
2. كل نتيجة متعددة المراحل تعرض فعلًا واحدًا موصى به، المهارة، السبب والشرط؛ ولا تفرض مسارًا ثابتًا.
3. المهارات الست موجودة في `.agents/skills/` و`.opencode/skills/`؛ مثبّت الحزمة القديم ينسخ `zoho-sprints` وحدها.
4. أي كتابة في Zoho تخضع للتفويض الحالي، قواعد الدور والصلاحية، بحث التكرار، والتحقق بعد الكتابة.

---

*حُدّث هذا الدليل بعد فحص المستودع `F:\zoho sprint skills` في 2026-11-08.*
