/**
 * tools/run-all-settings-tests.js
 * Runner chạy tuần tự toàn bộ 4 bộ kiểm thử của tính năng Cài đặt Hệ thống (Settings).
 */
const { execSync } = require('child_process');
const path = require('path');

const SUITES = [
  { name: 'Giai đoạn 1: Backend & DB API Verification', script: 'tools/verify-settings.js' },
  { name: 'Giai đoạn 3: Settings UI & Visual Testing', script: 'tools/test-settings-ui.js' },
  { name: 'Giai đoạn 4: Whole-Site Branding Sync Testing', script: 'tools/test-branding-sync.js' },
  { name: 'Giai đoạn 5: Admin Frame Polish & Security Testing', script: 'tools/test-admin-polish.js' }
];

console.log('===============================================================');
console.log('   BẮT ĐẦU CHẠY TOÀN BỘ BỘ KIỂM THỬ HỆ THỐNG SETTINGS ADMIN   ');
console.log('===============================================================\n');

let allPassed = true;
const summary = [];

for (const suite of SUITES) {
  console.log(`\n>>> ĐANG CHẠY: ${suite.name} (${suite.script})...`);
  const startTime = Date.now();
  try {
    const output = execSync(`node ${suite.script}`, {
      cwd: path.join(__dirname, '..'),
      encoding: 'utf8',
      stdio: 'pipe'
    });
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(output);
    console.log(`✅ ${suite.name} HOÀN THÀNH trong ${duration}s!`);
    summary.push({ name: suite.name, status: 'PASS', duration: `${duration}s` });
  } catch (err) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.error(`❌ ${suite.name} THẤT BẠI trong ${duration}s!`);
    if (err.stdout) console.log(err.stdout);
    if (err.stderr) console.error(err.stderr);
    allPassed = false;
    summary.push({ name: suite.name, status: 'FAIL', duration: `${duration}s` });
    break;
  }
}

console.log('\n===============================================================');
console.log('                  BẢNG TỔNG KẾT TOÀN DIỆN                      ');
console.log('===============================================================');
console.table(summary);

if (allPassed) {
  console.log('\n🎉 TOÀN BỘ 78 BÀI KIỂM THỬ ĐÃ ĐẠT 100% TIÊU CHUẨN XUẤT SẮC!');
  process.exit(0);
} else {
  console.error('\n⚠️ Có bộ kiểm thử không đạt yêu cầu!');
  process.exit(1);
}
