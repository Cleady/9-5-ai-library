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
  console.log('📸 Taking screenshots of attention icons...');
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

  // Load page and set credentials
  await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle0' });
  await page.evaluate((t, u) => {
    localStorage.setItem('token', t);
    localStorage.setItem('user', JSON.stringify(u));
    localStorage.setItem('currentUser', JSON.stringify(u));
    localStorage.setItem('lib95:settings:data', JSON.stringify({ settings: { appearance: { theme: 'dark' } } }));
  }, token, owner);

  // 1. Dark theme screenshot
  await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({ path: path.join(__dirname, 'shots/attention_dark.png') });
  console.log('Saved tools/shots/attention_dark.png');

  // Also take close-up screenshot of attention panel
  const attentionPanel = await page.$('#dashboard-attention-panel');
  if (attentionPanel) {
    await attentionPanel.screenshot({ path: path.join(__dirname, 'shots/attention_panel_dark_zoom.png') });
    console.log('Saved tools/shots/attention_panel_dark_zoom.png');
  }

  // 2. Light theme screenshot
  await page.evaluate(() => {
    localStorage.setItem('lib95:settings:data', JSON.stringify({ settings: { appearance: { theme: 'light' } } }));
    document.documentElement.removeAttribute('data-theme');
  });
  await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({ path: path.join(__dirname, 'shots/attention_light.png') });
  console.log('Saved tools/shots/attention_light.png');

  const attentionPanelLight = await page.$('#dashboard-attention-panel');
  if (attentionPanelLight) {
    await attentionPanelLight.screenshot({ path: path.join(__dirname, 'shots/attention_panel_light_zoom.png') });
    console.log('Saved tools/shots/attention_panel_light_zoom.png');
  }

  // 3. Mobile 390px dark screenshot
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.evaluate(() => {
    localStorage.setItem('lib95:settings:data', JSON.stringify({ settings: { appearance: { theme: 'dark' } } }));
    document.documentElement.setAttribute('data-theme', 'dark');
  });
  await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({ path: path.join(__dirname, 'shots/attention_390_dark.png') });
  console.log('Saved tools/shots/attention_390_dark.png');

  await browser.close();
  await db.end();
  console.log('Done!');
}

run().catch(console.error);
