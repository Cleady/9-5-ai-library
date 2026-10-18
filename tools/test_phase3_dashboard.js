const puppeteer = require('./node_modules/puppeteer-core');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SHOTS_DIR = path.join(__dirname, 'shots');
if (!fs.existsSync(SHOTS_DIR)) fs.mkdirSync(SHOTS_DIR, { recursive: true });

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const ownerToken = jwt.sign(
  { id: 1, username: 'owner95aiclub@internal.edu.vn', role: 'owner', status: 'active', full_name: 'Owner' },
  JWT_SECRET,
  { expiresIn: '1h' }
);

async function runPhase3VisualTest() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const consoleLogs = [];
  const errors = [];

  try {
    const page = await browser.newPage();
    page.on('console', msg => {
      const txt = msg.text();
      consoleLogs.push(`[${msg.type()}] ${txt}`);
      if (msg.type() === 'error') errors.push(txt);
    });
    page.on('pageerror', err => errors.push(err.message));

    // Thiết lập localStorage ban đầu
    await page.goto('http://localhost:3000/index.html', { waitUntil: 'domcontentloaded' });
    await page.evaluate((tok) => {
      localStorage.setItem('token', tok);
      localStorage.setItem('user', JSON.stringify({
        id: 1,
        username: 'owner95aiclub@internal.edu.vn',
        full_name: 'Owner',
        role: 'owner',
        status: 'active'
      }));
      localStorage.setItem('theme', 'light');
    }, ownerToken);

    console.log('=== 1. KIỂM THỬ DESKTOP 1440PX - LIGHT THEME ===');
    await page.setViewport({ width: 1440, height: 950 });
    await page.goto('http://localhost:3000/pages/admin/admin.html', { waitUntil: 'networkidle2' });
    await page.waitForSelector('#metric-users-val');
    await new Promise(r => setTimeout(r, 1000));

    const domData = await page.evaluate(() => {
      return {
        greeting: document.getElementById('dashboard-title')?.textContent.trim(),
        users: document.getElementById('metric-users-val')?.textContent.trim(),
        courses: document.getElementById('metric-courses-val')?.textContent.trim(),
        posts: document.getElementById('metric-posts-val')?.textContent.trim(),
        resources: document.getElementById('metric-resources-val')?.textContent.trim(),
        donutTotal: document.getElementById('donut-total-users')?.textContent.trim(),
        legendItems: Array.from(document.querySelectorAll('#donut-legend-list li')).map(li => li.textContent.trim()),
        recentActivities: Array.from(document.querySelectorAll('#dashboard-activity-list li')).map(li => li.textContent.trim())
      };
    });

    console.log('DOM Data:', domData);
    await page.screenshot({ path: path.join(SHOTS_DIR, 'dashboard_1440_light.png'), fullPage: false });
    console.log('Đã chụp: tools/shots/dashboard_1440_light.png');

    console.log('\n=== 2. KIỂM THỬ DESKTOP 1440PX - DARK THEME ===');
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(SHOTS_DIR, 'dashboard_1440_dark.png'), fullPage: false });
    console.log('Đã chụp: tools/shots/dashboard_1440_dark.png');

    console.log('\n=== 3. KIỂM THỬ MOBILE 390PX - LIGHT THEME ===');
    await page.setViewport({ width: 390, height: 844, isMobile: true });
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(SHOTS_DIR, 'dashboard_390_light.png'), fullPage: true });
    console.log('Đã chụp: tools/shots/dashboard_390_light.png');

    console.log('\n=== 4. KIỂM THỬ MOBILE 390PX - DARK THEME ===');
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(SHOTS_DIR, 'dashboard_390_dark.png'), fullPage: true });
    console.log('Đã chụp: tools/shots/dashboard_390_dark.png');

    console.log('\n=== 5. KIỂM THỬ DỮ LIỆU LỚN (MOCK DATA) ===');
    await page.setViewport({ width: 1440, height: 950 });
    const mockData = JSON.parse(fs.readFileSync(path.join(__dirname, 'dashboard-mock.json'), 'utf8'));
    await page.evaluate((mock) => {
      // Mock fetch trả về dữ liệu lớn
      const origFetch = window.fetch;
      window.fetch = async (url, opts) => {
        if (typeof url === 'string' && url.includes('/api/admin/dashboard')) {
          return {
            ok: true,
            status: 200,
            json: async () => mock
          };
        }
        return origFetch(url, opts);
      };
      // Gọi lại dropdown để kích hoạt nạp
      const btn = document.getElementById('dash-range-toggle');
      if (btn) btn.click();
      const item30 = document.querySelector('[data-value="30d"]');
      if (item30) item30.click();
    }, mockData);

    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SHOTS_DIR, 'dashboard_mock_large.png'), fullPage: false });
    console.log('Đã chụp: tools/shots/dashboard_mock_large.png');

    console.log('\n=== TỔNG HỢP KIỂM THỬ GIAI ĐOẠN 3 ===');
    console.log('- Số lỗi console phát hiện:', errors.length);
    if (errors.length > 0) {
      console.warn('Các lỗi console:', errors);
    }
    const numbersMatch = domData.users === '5' && domData.courses === '2' && domData.posts === '20';
    console.log('- Số liệu trên DOM khớp DB (users=5, courses=2, posts=20):', numbersMatch ? 'ĐẠT' : 'CHƯA ĐẠT');

    return errors.length === 0 && numbersMatch;
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  runPhase3VisualTest().then(ok => {
    process.exitCode = ok ? 0 : 1;
  });
}

module.exports = { runPhase3VisualTest };
