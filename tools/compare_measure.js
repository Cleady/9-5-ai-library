const fs = require('fs');
const b = JSON.parse(fs.readFileSync('tools/topbar_measure_report.json', 'utf8'));
const a = JSON.parse(fs.readFileSync('tools/topbar_measure_after.json', 'utf8'));

for (const p of Object.keys(a)) {
  console.log(`\n=================== PAGE: ${p} ===================`);
  const beforePage = b[p] || {};
  const afterPage = a[p] || {};

  for (const k of ['search', 'themeBtn', 'bellBtn', 'userMenu']) {
    const elB = beforePage[k];
    const elA = afterPage[k];
    if (!elA) continue;
    console.log(`--- [${k}] ---`);
    console.log(`  BEFORE: Size: ${elB ? elB.width + ' x ' + elB.height : 'N/A'} | Border: ${elB ? elB.border : 'N/A'} | Bg: ${elB ? (elB.backgroundColor || elB.background.slice(0, 35)) : 'N/A'}`);
    console.log(`  AFTER:  Size: ${elA.width} x ${elA.height} | Border: ${elA.border} | Bg: ${elA.backgroundColor || elA.background.slice(0, 35)}`);
  }
}
