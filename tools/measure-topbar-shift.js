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

async function measurePage(page, url, theme) {
  // Set theme
  await page.evaluate((t) => {
    localStorage.setItem('lib95:settings:data', JSON.stringify({ settings: { appearance: { theme: t } } }));
    if (t === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, theme);

  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  const metrics = await page.evaluate(() => {
    function getBox(selector) {
      const el = document.querySelector(selector);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        selector,
        x: Math.round(rect.x * 100) / 100,
        y: Math.round(rect.y * 100) / 100,
        width: Math.round(rect.width * 100) / 100,
        height: Math.round(rect.height * 100) / 100,
        paddingTop: cs.paddingTop,
        paddingRight: cs.paddingRight,
        paddingBottom: cs.paddingBottom,
        paddingLeft: cs.paddingLeft,
        marginTop: cs.marginTop,
        marginRight: cs.marginRight,
        marginBottom: cs.marginBottom,
        marginLeft: cs.marginLeft,
        borderTopWidth: cs.borderTopWidth,
        borderRightWidth: cs.borderRightWidth,
        borderBottomWidth: cs.borderBottomWidth,
        borderLeftWidth: cs.borderLeftWidth,
        borderRadius: cs.borderRadius,
        display: cs.display,
        alignItems: cs.alignItems,
        justifyContent: cs.justifyContent,
        gap: cs.gap,
        boxSizing: cs.boxSizing
      };
    }

    const selectors = [
      '.topbar',
      '.topbar .search',
      '.topbar .search-input',
      '.topbar .search-shortcut',
      '.topbar .topbar-actions',
      '.topbar .theme-quick-toggle',
      '.topbar .notification',
      '.topbar .notification .icon-button',
      '.topbar .user-menu',
      '.topbar .user-menu-toggle',
      '.topbar .user-avatar',
      '.topbar .user-name',
      '.topbar .role-badge'
    ];

    const results = {};
    for (const sel of selectors) {
      results[sel] = getBox(sel);
    }
    return results;
  });

  return metrics;
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

  // Init auth
  await page.goto(`${BASE_URL}/pages/settings/settings.html#profile`, { waitUntil: 'domcontentloaded' });
  await page.evaluate((t, u) => {
    localStorage.setItem('token', t);
    localStorage.setItem('user', JSON.stringify(u));
    localStorage.setItem('currentUser', JSON.stringify(u));
  }, token, owner);

  const pagesToTest = [
    `${BASE_URL}/pages/settings/settings.html#profile`,
    `${BASE_URL}/pages/admin/admin.html`,
    `${BASE_URL}/pages/lectures/resources.html`,
    `${BASE_URL}/pages/community/community-feed.html`,
    `${BASE_URL}/pages/lectures/lectures.html`,
    `${BASE_URL}/home_page/home_page.html`
  ];

  for (const pageUrl of pagesToTest) {
    console.log(`\n======================================================`);
    console.log(`MEASURING URL: ${pageUrl}`);
    console.log(`======================================================`);

    const lightMetrics = await measurePage(page, pageUrl, 'light');
    const darkMetrics = await measurePage(page, pageUrl, 'dark');

    console.log('\n--- COMPARISON (LIGHT vs DARK) ---');
    console.log(
      'Selector'.padEnd(35) +
      'Light (x, y, w, h)'.padEnd(30) +
      'Dark (x, y, w, h)'.padEnd(30) +
      'Delta (dx, dy, dw, dh)'
    );
    console.log('-'.repeat(120));

    let hasDiff = false;
    for (const sel in lightMetrics) {
      const l = lightMetrics[sel];
      const d = darkMetrics[sel];
      if (!l || !d) {
        console.log(`${sel.padEnd(35)} MISSING: l=${!!l}, d=${!!d}`);
        continue;
      }
      const dx = Math.round((d.x - l.x) * 100) / 100;
      const dy = Math.round((d.y - l.y) * 100) / 100;
      const dw = Math.round((d.width - l.width) * 100) / 100;
      const dh = Math.round((d.height - l.height) * 100) / 100;

      const lStr = `(${l.x}, ${l.y}, ${l.width}, ${l.height})`;
      const dStr = `(${d.x}, ${d.y}, ${d.width}, ${d.height})`;
      const deltaStr = `(${dx}, ${dy}, ${dw}, ${dh})`;

      const diffAlert = (dx !== 0 || dy !== 0 || dw !== 0 || dh !== 0) ? ' ⚠️ SHIFT!' : ' ✓ MATCH';
      if (dx !== 0 || dy !== 0 || dw !== 0 || dh !== 0) {
        hasDiff = true;
      }
      console.log(sel.padEnd(35) + lStr.padEnd(30) + dStr.padEnd(30) + deltaStr + diffAlert);

      if (dx !== 0 || dy !== 0 || dw !== 0 || dh !== 0) {
        console.log(`   Detailed styles for ${sel}:`);
        console.log(`   Light: border=[${l.borderTopWidth}, ${l.borderRightWidth}, ${l.borderBottomWidth}, ${l.borderLeftWidth}], pad=[${l.paddingTop}, ${l.paddingRight}, ${l.paddingBottom}, ${l.paddingLeft}], mar=[${l.marginTop}, ${l.marginRight}, ${l.marginBottom}, ${l.marginLeft}], radius=${l.borderRadius}`);
        console.log(`   Dark:  border=[${d.borderTopWidth}, ${d.borderRightWidth}, ${d.borderBottomWidth}, ${d.borderLeftWidth}], pad=[${d.paddingTop}, ${d.paddingRight}, ${d.paddingBottom}, ${d.paddingLeft}], mar=[${d.marginTop}, ${d.marginRight}, ${d.marginBottom}, ${d.marginLeft}], radius=${d.borderRadius}`);
      }
    }
  }

  await browser.close();
  await db.end();
}

run().catch(console.error);
