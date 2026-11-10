import fs from 'node:fs';

const base = JSON.parse(fs.readFileSync('reports/worldcup-story-details.json', 'utf8')).map(x => x.data.items[0]);
const byNo = new Map(base.map(i => [i.itemNo, i]));

function overlay(file) {
  if (!fs.existsSync(file)) return;
  const arr = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const x of arr) {
    const i = x.data.items[0];
    if (i.itemTypeName === 'Story' || i.projItemTypeId === '120216000004162630') byNo.set(i.itemNo, { ...(byNo.get(i.itemNo) || {}), ...i });
  }
}
overlay('reports/WorldCup-New/2026-10-28/readback-116-133.out.json');
overlay('reports/WorldCup-New/2026-10-28/readback-53-141-142-123-124.out.json');
overlay('reports/WorldCup-New/2026-10-28/readback-125.out.json');
overlay('reports/WorldCup-New/2026-10-28/readback-markers.out.json');

const users = {
  '120216000000535227': 'Abdullah Al-Ansi',
  '120216000000535177': 'Ali Alshami',
  '120216000000359035': 'Mohammed Alaqari',
  '120216000000010017': 'Abdullah Al-Measar',
  '120216000000809729': 'مستخدم غير معروف (809729)',
  '120216000000902039': 'مستخدم غير معروف (902039)',
  '120216000000002005': 'Unassigned',
  '120216000000015575': 'Ammar Alraimy',
  '120216000000293163': 'Mushtaq Alabbasi',
  '120216000000015647': 'Mohammed Qamhan',
  '120216000000600001': 'Marwan Wahas',
};
const statuses = {
  '120216000000003637': 'Done',
  '120216000000003631': 'In progress',
  '120216000000003629': 'To do',
};
const priorities = {
  '120216000004162624': 'None',
  '120216000004162625': 'Low',
  '120216000004162626': 'Medium',
  '120216000004162627': 'High',
  '120216000004162633': 'غير معروف (633)',
};
const sprints = {
  '120216000004184188': 'SP0 Apr 26',
  '120216000004208120': 'SP1 May 26',
  '120216000004271001': 'SP2 Jun 26',
  '120216000004324026': 'SP3 Jul 26',
  '120216000004512167': 'SP4 Sep 26',
  '120216000004192758': 'SP5 Oct 26 (Active)',
  '120216000004162608': 'Backlog',
};
const epics = {
  '120216000004208116': 'Predictions, points',
  '120216000004208118': 'Matches, sports news',
  '120216000004220081': 'Tenants & Integrations',
  '120216000004237129': 'S:DEVOPS & ENVIROMENT',
  '120216000004557316': 'Multi Competition',
};
const rows = [...byNo.values()].sort((a, b) => Number(a.itemNo) - Number(b.itemNo));
const out = [];
out.push('# كتالوج قصص المستخدم — مشروع Sports Activities As A service\n');
out.push(`تاريخ السحب: 2026-10-28. العدد: **${rows.length} قصة**. المصدر: Zoho Sprints GetItemDetails + تحديثات هذه الجلسة.\n`);
out.push('> الحالة والأسماء والحقول تعكس ما تم التحقق منه بعد الكتابة. القصص 106/111/113 في سبرنتات مكتملة ولا يمكن تعديلها بهذه الصلاحية؛ لذلك قد تبقى حقولها ناقصة.\n');
out.push('| # | العنوان الإنجليزي | الاسم العربي | الاسم الإنجليزي المختصر | الحالة | الأولوية | المسندون | السبرنت | Epic | نقاط | الطالب | المختبر | وصف |');
out.push('|---:|---|---|---|---|---|---|---|---|---:|---|---|---|---|');
for (const i of rows) {
  const owners = (i.ownerId || []).map(id => users[id] || id).join(' + ') || '—';
  const desc = (i.description || '').replace(/\s+/g, ' ').trim();
  const descCell = desc ? `${desc.length} حرف` : '**فارغ**';
  const ar = (i.UDF_CHAR3 || '').replace(/\|/g, '\\|');
  const en = (i.UDF_CHAR4 || '').replace(/\|/g, '\\|');
  const req = (i.UDF_CHAR5 || '').replace(/\|/g, '\\|') || '—';
  const tester = (i.UDF_CHAR7 || '').replace(/\|/g, '\\|') || '—';
  out.push(`| ${i.itemNo} | ${i.itemName.replace(/\|/g, '\\|')} | ${ar || '—'} | ${en || '—'} | ${statuses[i.statusId] || i.statusId} | ${priorities[i.projPriorityId] || i.projPriorityId} | ${owners} | ${sprints[i.sprintId] || i.sprintId} | ${epics[i.epicId] || '—'} | ${i.points ?? 0} | ${req} | ${tester} | ${descCell} |`);
}
out.push('\n## ملاحظات التحليل\n');
out.push('- القصص 116–133 هي حزمة **Multi Competition**، وكلها من إنشاء Mohammed Alaqari، ومرتبطة بـ Epic Multi Competition.');
out.push('- القصص 116–122 في SP5 (Active)، والقصص 123–133 في Backlog (بعد التحديث ظهرت 123–125 في Backlog أيضًا).');
out.push('- القصص 126–133 كانت بلا Assignee/تواريخ/نقاط/Epic/Release؛ تم ضبطها في هذه الجلسة مع إسنادها إلى Mohammed Alaqari وربطها بـ v4 Multi Competition.');
out.push('- القصص 116–125 كانت تملك حقولًا أساسية، وتم استكمال الاسم العربي/الإنجليزي والطالب/المختبر وربط Release؛ 124/125 كانا بلا تواريخ فتم ضبطهما.');
out.push('- 120 كان حقل الطالب فيه خطأً (اسم القصة الإنجليزية) وتم تصحيحه إلى «محمد الاخفش وعبدالله المعصار».');
out.push('- 106 و111 و113: وصف فارغ وحقول ناقصة، لكنها في سبرنتات مكتملة والصلاحية تمنع التعديل (7401.14).');
out.push('- 53: وصف فارغ، وتمت إضافة وصف ومعايير قبول مقترحة + ملحق تسليم فعلي (الكود موجود بينما الحالة To do).');
out.push('- 141/142: Task وليست Story، وتمت إضافة ملحق التسليم الفعلي لهما؛ 142 أضيف له الاسم العربي/الإنجليزي أيضًا.');
out.push('\n## فجوات متبقية\n');
for (const i of rows) {
  const gaps = [];
  if (!i.description) gaps.push('وصف فارغ');
  if (!i.UDF_CHAR3) gaps.push('اسم عربي فارغ');
  if (!i.UDF_CHAR4) gaps.push('اسم إنجليزي فارغ');
  if (!i.UDF_CHAR5) gaps.push('الطالب فارغ');
  if (!i.UDF_CHAR7) gaps.push('المختبر فارغ');
  if (!i.epicId) gaps.push('Epic فارغ');
  if (!i.releaseCount) gaps.push('لا Release');
  if (!i.startDate || i.startDate === '-1') gaps.push('لا تاريخ بداية');
  if (!i.points) gaps.push('نقاط 0');
  if (gaps.length) out.push(`- **SNA-${i.itemNo}** (${i.itemName}): ${gaps.join('، ')}.`);
}
fs.writeFileSync('reports/WorldCup-New/2026-10-28/knowledge/USER-STORIES-CATALOG_AR.md', out.join('\n'), 'utf8');
console.log(out.join('\n'));
