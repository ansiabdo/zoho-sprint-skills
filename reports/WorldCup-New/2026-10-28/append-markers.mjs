import fs from 'node:fs';

const src = JSON.parse(fs.readFileSync('reports/WorldCup-New/2026-10-28/readback-116-133.out.json', 'utf8'));
const byNo = new Map(src.map(x => [x.data.items[0].itemNo, x.data.items[0]]));

const notes = {
  '116': {
    sprint: '120216000004192758',
    text: `--- [ZOHO-ACTUAL-DELIVERY v1 | SNA-116-2026-10-28-01] ---
ملحق مراجعة التنفيذ (لا يغيّر الحالة أو معايير القبول): مراجعة BMAD 10.1 والكود تشير إلى أن التنفيذ الفعلي يستخدم آلية catalog قائمة على League/config typed options، بينما هذه القصة تطلب Competition وCompetitionSeason entities ومزود identifiers. لذلك التنفيذ مختلف/جزئي مقارنة بعقد القصة، ولم يُتحقق تشغيليًا في هذه الجولة. الأدلة: BMAD 10.1؛ commits 1030f85e و71df6def و289d044c؛ SportMonksOptions. لا يدّعي هذا الملحق اكتمال القصة.
--- [/ZOHO-ACTUAL-DELIVERY | SNA-116-2026-10-28-01] ---`
  },
  '120': {
    sprint: '120216000004192758',
    html: true,
    text: `--- [ZOHO-ACTUAL-DELIVERY v1 | SNA-120-2026-10-28-01] ---
ملحق مراجعة التنفيذ (لا يغيّر الحالة أو معايير القبول): مراجعة BMAD 10.3 وTenantLeagueService تشير إلى أن الاختيار الفارغ قد يُعامل كـ default-all في التنفيذ/الوثائق، بينما هذه القصة تشترط أن Selected بقائمة فارغة لا تعرض أي مسابقة وأن AllEntitled وحدها تعرض المسابقات المصرح بها. التعارض يحتاج قرار منتج ولا يُعد السلوك الحالي مطابقًا. لم يُتحقق تشغيليًا في هذه الجولة. الأدلة: BMAD 10.3؛ commits a81f9e40 و50565d34؛ TenantLeagueService.cs وTenantLeagueSettingsAppService.
--- [/ZOHO-ACTUAL-DELIVERY | SNA-120-2026-10-28-01] ---`
  },
  '130': {
    sprint: '120216000004162608',
    text: `--- [ZOHO-ACTUAL-DELIVERY v1 | SNA-130-2026-10-28-01] ---
ملحق مراجعة التنفيذ (لا يغيّر الحالة أو معايير القبول): مراجعة BMAD 10.6 تشير إلى سياق افتراضي/All في تنفيذ PWA، بينما القصة تشترط آخر سياق صالح ثم default المستأجر، مع All كخيار صريح لا يتعارض مع افتراضي الدوري الأول. التنفيذ الحالي مختلف/غير محسوم، ولم يُتحقق تشغيليًا في هذه الجولة. الأدلة: BMAD 10.6؛ sprint-status.yaml وepics.md.
--- [/ZOHO-ACTUAL-DELIVERY | SNA-130-2026-10-28-01] ---`
  }
};

const calls = [];
for (const [no, n] of Object.entries(notes)) {
  const item = byNo.get(no);
  let desc = item.description || '';
  if (n.html) {
    desc += `\n<hr/><div dir="rtl">${n.text.replace(/\n/g, '<br/>')}</div>`;
  } else {
    desc += `\n\n${n.text}`;
  }
  calls.push({
    tool: 'ZohoSprints_UpdateItem',
    args: {
      headers: { 'x-za-ui-version': 'v2', 'X-convert-response': 'true' },
      path_variables: {
        teamId: '767679505',
        projectId: '120216000004162606',
        sprintId: n.sprint,
        itemId: item.itemId
      },
      query_params: { description: desc }
    }
  });
}
fs.writeFileSync('reports/WorldCup-New/2026-10-28/write-116-120-130-markers.json', JSON.stringify(calls, null, 2), 'utf8');
console.log(JSON.stringify(calls.map(c => ({ no: c.args.path_variables.itemId, len: c.args.query_params.description.length })), null, 2));
