# Fixture List API — League Filter + LeagueId on DTOs

توثيق تتبع للعمل المسجل، استنادًا إلى BMAD Story 10.5 والتغييرات المحلية. لا يغير هذا التوثيق حالة المهمة الحالية أو معايير القصة الرئيسية.

## نطاق العمل المرصود

- دعم leagueId الاختياري في قراءة المباريات وواجهة الأدمن، وإرجاع LeagueId/LeagueName مع fallback مناسب.
- الحفاظ على تقييد الدوريات المسموح بها للمستأجر قبل فلتر الطلب.
- دعم فلتر leagueId في leaderboard وmy-rank، وفصل مفتاح cache الدوري مع إبقاء مسار الطلب دون فلتر متوافقًا.
- إضافة عمود/فلتر الدوري في واجهة الأدمن ومعالجة إدخال قيم الفلتر.

## معايير التحقق المرجعية

1. leagueId صالح يقيّد النتائج بالدوري المطلوب ضمن نطاق المستأجر.
2. حذف leagueId يحافظ على السلوك السابق للنطاق المسموح.
3. DTOs تعرض معرف واسم الدوري، وتتعامل مع الاسم غير المعروف دون استثناء.
4. cache الدوري منفصل عن cache الترتيب الإجمالي، ومسار الاستعلام يحترم حد Oracle عبر تقسيم المعرفات عند الحاجة.
5. لا تُعتبر هذه المهمة تغطية كاملة لمتطلبات season scoring أوentitlement redesign في القصص الأوسع.

## التتبع والأدلة

- BMAD: _bmad-output/implementation-artifacts/10-5-fixture-list-api-league-filter-dto.md.
- Git: 7d251dec و026d2741.
- الكود: FixtureAppService.cs وAdminFixtureAppService.Extended.cs وLeaderboardAppService.cs وGetAdminFixturesInput.cs.
- اختبارات مرتبطة في المصدر: TenantLeagueFixtureGatingTests وAdminFixtureListDetail2_13Tests وLeaderboardAppServiceTests.
- ملاحظة التحقق 2026-10-28: قرئت التغييرات والمصادر في تجربة المهارة؛ لم تُشغّل الاختبارات من جديد. تقارير نجاح التنفيذ السابقة محفوظة في ملف BMAD، ولا تُعد نتيجة اختبار جديدة لهذه الجولة.
