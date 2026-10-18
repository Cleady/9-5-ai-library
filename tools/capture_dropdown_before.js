const puppeteer = require('./node_modules/puppeteer-core');
const path = require('path');
const fs = require('fs');
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

  const shotsDir = path.join(__dirname, 'shots');
  if (!fs.existsSync(shotsDir)) fs.mkdirSync(shotsDir, { recursive: true });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.evaluateOnNewDocument((tk, u) => {
    localStorage.setItem('token', tk);
    localStorage.setItem('user', JSON.stringify(u));
    localStorage.setItem('lib95:settings:data', JSON.stringify({
      settings: { appearance: { theme: 'dark', accentColor: 'blue' } }
    }));
  }, token, ownerUser);

  await page.goto('http://localhost:3000/pages/lectures/resources.html', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  // Click user menu to open dropdown
  const toggle = await page.$('.user-menu-toggle');
  if (toggle) {
    await toggle.click();
    await new Promise(r => setTimeout(r, 300));
  }

  // Screenshot user menu dropdown container
  const userMenu = await page.$('.user-menu');
  if (userMenu) {
    await userMenu.screenshot({ path: path.join(shotsDir, 'dropdown_before_resources_dark.png') });
  }

  // Also capture light mode dropdown before
  await page.evaluate(() => {
    localStorage.setItem('lib95:settings:data', JSON.stringify({
      settings: { appearance: { theme: 'light', accentColor: 'blue' } }
    }));
    document.documentElement.removeAttribute('data-theme');
  });
  await new Promise(r => setTimeout(r, 400));
  if (userMenu) {
    await userMenu.screenshot({ path: path.join(shotsDir, 'dropdown_before_resources_light.png') });
  }

  // Mobile 390px before
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  });
  await new Promise(r => setTimeout(r, 300));
  if (userMenu) {
    await userMenu.screenshot({ path: path.join(shotsDir, 'dropdown_before_resources_mobile_390.png') });
  }

  await page.close();
  await browser.close();
  await pool.end();
  console.log('Saved dropdown_before shots.');
})();
