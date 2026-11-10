const fs = require('fs');
function strip(html) {
  return String(html || '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|h[1-6]|li|tr)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\r/g, '')
    .split('\n')
    .map((x) => x.replace(/[ \t]+/g, ' ').trim())
    .filter(Boolean)
    .join('\n');
}
for (const n of process.argv.slice(2)) {
  const d = JSON.parse(fs.readFileSync('./reports/detail-' + n + '.json', 'utf8'));
  const it = d.items[0];
  console.log('\n\n========== ' + it.itemId + ' | ' + it.itemName.slice(0, 140));
  console.log(strip(it.description).slice(0, 8000));
}
