const fs = require('fs');
const r = JSON.parse(fs.readFileSync('tools/topbar_measure_report.json', 'utf8'));

const targetPage = process.argv[2];

for (const [page, data] of Object.entries(r)) {
  if (targetPage && page !== targetPage) continue;
  console.log(`\n=================== PAGE: ${page} ===================`);
  for (const [k, v] of Object.entries(data)) {
    if (!v) continue;
    console.log(`[${k}]`);
    console.log(`  Size: ${v.width} x ${v.height} | Radius: ${v.borderRadius} | Gap: ${v.gap}`);
    console.log(`  Border: ${v.border}`);
    console.log(`  Background: ${v.backgroundColor || (v.background ? v.background.slice(0, 50) : '')}`);
    console.log(`  BackdropFilter: ${v.backdropFilter} | BoxShadow: ${(v.boxShadow ? v.boxShadow.slice(0, 40) : '')}`);
    console.log(`  Color: ${v.color} | Font: ${v.fontSize} / ${v.fontWeight}`);
  }
}
