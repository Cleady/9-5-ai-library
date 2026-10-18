const puppeteer = require('./node_modules/puppeteer-core');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });
const mysql = require('../backend/node_modules/mysql2/promise');

(async () => {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  const [rows] = await pool.query('SELECT id, username, full_name, role, avatar_url, status FROM users WHERE id=1');
  const user = rows[0];

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.evaluateOnNewDocument((u) => {
    localStorage.setItem('user', JSON.stringify(u));
    localStorage.setItem('token', 'real_token');
    localStorage.setItem('lib95:settings:data', JSON.stringify({
      settings: { appearance: { theme: 'dark', accentColor: 'blue' } }
    }));
  }, user);

  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  const info = await page.evaluate(() => {
    const el = document.querySelector('.home-page__guest-avatar');
    const cs = window.getComputedStyle(el);
    return {
      bgImage: cs.backgroundImage.substring(0, 60),
      bgColor: cs.backgroundColor,
      hasBgImage: cs.backgroundImage !== 'none'
    };
  });
  console.log('INDEX DARK WITH REAL USER:', info);

  const header = await page.$('.home-page__header');
  await header.screenshot({ path: path.join(__dirname, 'shots', 'index_dark_after_fix.png') });
  console.log('Saved index_dark_after_fix.png');

  // Also test dynamic theme toggling without reload
  console.log('Testing dynamic toggle to LIGHT:');
  await page.evaluate(() => {
    document.documentElement.removeAttribute('data-theme');
  });
  await new Promise(r => setTimeout(r, 200));
  const lightInfo = await page.evaluate(() => {
    const el = document.querySelector('.home-page__guest-avatar');
    const cs = window.getComputedStyle(el);
    return {
      hasBgImage: cs.backgroundImage !== 'none',
      bgImage: cs.backgroundImage.substring(0, 50)
    };
  });
  console.log('Dynamic LIGHT:', lightInfo);

  console.log('Testing dynamic toggle back to DARK:');
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  });
  await new Promise(r => setTimeout(r, 200));
  const darkInfo = await page.evaluate(() => {
    const el = document.querySelector('.home-page__guest-avatar');
    const cs = window.getComputedStyle(el);
    return {
      hasBgImage: cs.backgroundImage !== 'none',
      bgImage: cs.backgroundImage.substring(0, 50)
    };
  });
  console.log('Dynamic DARK:', darkInfo);

  await browser.close();
  await pool.end();
})();
