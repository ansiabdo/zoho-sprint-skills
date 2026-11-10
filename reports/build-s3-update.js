const fs = require('fs');
const d = JSON.parse(fs.readFileSync('reports/restructure-data.json', 'utf8'));
const s = d.stories.find(x => x.key === 'S3');

const desc = `Business Requester: Nidhal
Epic: بنكي لايت: الفواتير والأصدقاء والمديونية

كـ تاجر/مصدر، أريد تسجيل الأصدقاء كمشتركين وربطهم بالمستخدم الحالي، حتى أستطيع إصدار فواتير ومديونيات لهم.

معايير القبول:
1. جدول/API للمشتركين: user_id, provider_id, issuer_id, status, nickname, contact ref.
2. نفس المستخدم يمكن أن يملك أكثر من سجل مشترك حسب المصدر/المزود، دون تكرار المستخدم.
3. قيد فريد (user_id, provider_id, issuer_id) ومنع التكرار.
4. ربط مشترك موجود بدل إنشاء مستخدم جديد.
5. تسجيل صديق عبر قائمة الأصدقاء أو QR/رابط دعوة حسب سياسة بنكي.
6. قائمة الأصدقاء تأتي من Banky/API الأصدقاء (mock حتى يتوفر)؛ لا إضافة/موافقة/حذف صديق من هذه الوحدة.
7. بحث/قائمة/تفعيل/تعليق؛ عزل حسب المستأجر.
8. نفس المستخدم يمكن أن يكون مشتركاً لدى أكثر من مزود/مصدر، ويمكن أن يكون مزوداً/مصدراً في تعامل آخر؛ الهوية واحدة ولا تتكرر.
9. لا استيراد جهات اتصال من الجهاز الآن.
خارج النطاق: استيراد جهات الاتصال من الجهاز، وواجهة إدارة الأدوار العامة. داخل النطاق: تعدد سجلات المشترك لنفس المستخدم حسب المزود/المصدر.`;

const base = {
  headers: { 'X-convert-response': 'true', 'x-za-ui-version': 'v2' },
  path_variables: {
    teamId: '767679505',
    projectId: '120216000000593007',
    sprintId: '120216000004656294',
    itemId: '120216000004655033'
  },
  query_params: {
    name: s.name,
    description: desc,
    epicid: '120216000004657001',
    projitemtypeid: '120216000000593045',
    projpriorityid: '120216000000593039',
    statusid: '120216000000003629',
    point: 1,
    startdate: '2026-10-31T21:00:00+0000',
    enddate: '2026-11-15T20:59:59+0000',
    duration: '11d',
    UDF_CHAR5: 'Nidhal',
    UDF_CHAR3: 'المشتركون وتسجيل الأصدقاء',
    UDF_CHAR4: 'Subscribers & Friend Registration'
  }
};

const add = JSON.parse(JSON.stringify(base));
add.query_params.newusers = '["120216000000535227"]';
const rem = JSON.parse(JSON.stringify(base));
rem.query_params.delusers = '["120216000000535227"]';

fs.writeFileSync('reports/update-s3.json', JSON.stringify([
  { tool: 'ZohoSprints_UpdateItem', args: add },
  { tool: 'ZohoSprints_UpdateItem', args: rem }
], null, 2));

console.log('desc len', desc.length, 'encoded', encodeURIComponent(desc).length);
console.log('wrote reports/update-s3.json');
