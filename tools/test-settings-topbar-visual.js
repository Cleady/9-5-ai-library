const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });
const puppeteer = require('../tools/node_modules/puppeteer-core');
const jwt = require('../backend/node_modules/jsonwebtoken');
const db = require('../backend/config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production';
const BASE_URL = 'http://localhost:3000';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function generateToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role, status: user.status },
    JWT_SECRET,
    { expiresIn: '2h' }
  );
}

async function run() {
  const [users] = await db.query("SELECT id, username, full_name, role, status FROM users WHERE role = 'owner' LIMIT 1");
  const owner = users[0];
  const token = generateToken(owner);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Dark theme topbar screenshot
  await page.evaluateOnNewDocument((tok, u) => {
    localStorage.setItem('lib95:settings:data', JSON.stringify({ settings: { appearance: { theme: 'dark' } } }));
    localStorage.setItem('token', tok);
    localStorage.setItem('user', JSON.stringify(u));
    localStorage.setItem('currentUser', JSON.stringify(u));
  }, token, owner);

  await page.goto(`${BASE_URL}/pages/settings/settings.html#profile`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  const topbar = await page.$('.topbar');
  if (topbar) {
    await topbar.screenshot({ path: path.join(__dirname, 'shots/settings_topbar_dark_perfect.png') });
    console.log('Saved tools/shots/settings_topbar_dark_perfect.png');
  }

  // 2. Light theme topbar screenshot
  await page.evaluate(() => {
    localStorage.setItem('lib95:settings:data', JSON.stringify({ settings: { appearance: { theme: 'light' } } }));
    document.documentElement.removeAttribute('data-theme');
  });
  await page.goto(`${BASE_URL}/pages/settings/settings.html#profile`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  const topbarLight = await page.$('.topbar');
  if (topbarLight) {
    await topbarLight.screenshot({ path: path.join(__dirname, 'shots/settings_topbar_light_perfect.png') });
    console.log('Saved tools/shots/settings_topbar_light_perfect.png');
  }

  await browser.close();
  await db.end();
  console.log('All visual verification screenshots captured!');
}

run().catch(console.error);
