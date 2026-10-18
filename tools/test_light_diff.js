const puppeteer = require('./node_modules/puppeteer-core');
const path = require('path');
require('../backend/node_modules/dotenv').config({ path: path.join(__dirname, '../backend/.env') });
const mysql = require('../backend/node_modules/mysql2/promise');

(async () => {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  const [rows] = await pool.query('SELECT id, username, full_name, role, avatar_url, status FROM users WHERE id=1');
  const ownerUser = rows[0];

  const loginRes = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'owner95aiclub@internal.edu.vn', password: 'owner1234' })
  });
  const { token } = await loginRes.json();

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const pages = [
    { name: 'home_page', url: 'http://localhost:3000/home_page/home_page.html', headerSel: '.topbar' },
    { name: 'resources', url: 'http://localhost:3000/pages/lectures/resources.html', headerSel: '.topbar' },
    { name: 'community_feed', url: 'http://localhost:3000/pages/community/community-feed.html', headerSel: '.topbar' },
    { name: 'settings', url: 'http://localhost:3000/pages/settings/settings.html', headerSel: '.topbar' },
    { name: 'admin', url: 'http://localhost:3000/pages/admin/admin.html', headerSel: '.topbar' }
  ];

  for (const p of pages) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    await page.evaluateOnNewDocument((tk, u) => {
      localStorage.setItem('token', tk);
      localStorage.setItem('user', JSON.stringify(u));
      localStorage.setItem('lib95:settings:data', JSON.stringify({
        settings: { appearance: { theme: 'light', accentColor: 'blue' } }
      }));
    }, token, ownerUser);

    await page.goto(p.url, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    const h = await page.$(p.headerSel);
    if (h) {
      await h.screenshot({ path: path.join(__dirname, 'shots', 'phase1_light_' + p.name + '.png') });
    }
    await page.close();
  }

  await browser.close();
  await pool.end();
  console.log('Phase 1 light screenshots captured with authenticated user.');
})();
