const puppeteer = require('./node_modules/puppeteer-core');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });
const mysql = require('../backend/node_modules/mysql2/promise');

(async () => {
  // Fetch real owner user from DB
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  const [rows] = await pool.query('SELECT id, username, full_name, role, avatar_url, status FROM users WHERE id=1');
  const ownerUser = rows[0];

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const pagesToTest = [
    { name: 'index', url: 'http://localhost:3000/index.html', selector: '.home-page__guest-avatar' },
    { name: 'home_page', url: 'http://localhost:3000/home_page/home_page.html', selector: '.user-avatar' },
    { name: 'resources', url: 'http://localhost:3000/pages/lectures/resources.html', selector: '.user-avatar' },
    { name: 'community_feed', url: 'http://localhost:3000/pages/community/community-feed.html', selector: '.user-avatar' },
    { name: 'settings', url: 'http://localhost:3000/pages/settings/settings.html', selector: '.user-avatar' },
    { name: 'admin', url: 'http://localhost:3000/pages/admin/admin.html', selector: '.user-avatar' }
  ];

  const results = {};

  for (const p of pagesToTest) {
    results[p.name] = {};
    for (const theme of ['light', 'dark']) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });

      // Track network requests for images
      const imgRequests = [];
      page.on('request', req => {
        if (req.resourceType() === 'image') {
          imgRequests.push(req.url().substring(0, 100));
        }
      });

      await page.evaluateOnNewDocument((user, th) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', 'mock_jwt_token_for_test');
        localStorage.setItem('lib95:settings:data', JSON.stringify({
          settings: { appearance: { theme: th, accentColor: 'blue' } }
        }));
      }, ownerUser, theme);

      await page.goto(p.url, { waitUntil: 'networkidle2', timeout: 15000 });
      await new Promise(r => setTimeout(r, 600));

      const info = await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return { error: 'Element not found: ' + sel };

        const cs = window.getComputedStyle(el);
        const parent = el.parentElement;
        const parentCs = parent ? window.getComputedStyle(parent) : null;

        // Inspect matched CSS rules
        const matched = [];
        for (const sheet of document.styleSheets) {
          try {
            for (const rule of sheet.cssRules || []) {
              if (rule.selectorText && el.matches(rule.selectorText)) {
                matched.push({
                  href: sheet.href ? sheet.href.split('/').pop() : 'inline',
                  selector: rule.selectorText,
                  cssText: rule.cssText
                });
              }
            }
          } catch (e) {}
        }

        return {
          tagName: el.tagName,
          className: el.className,
          src: el.getAttribute('src'),
          inlineStyle: el.getAttribute('style'),
          textContent: el.textContent.trim(),
          computed: {
            backgroundImage: cs.backgroundImage ? cs.backgroundImage.substring(0, 60) + '...' : cs.backgroundImage,
            hasFullBackgroundImage: !!cs.backgroundImage && cs.backgroundImage !== 'none',
            backgroundColor: cs.backgroundColor,
            filter: cs.filter,
            opacity: cs.opacity,
            visibility: cs.visibility,
            display: cs.display,
            mixBlendMode: cs.mixBlendMode,
            zIndex: cs.zIndex,
            width: cs.width,
            height: cs.height,
            borderRadius: cs.borderRadius,
            overflow: cs.overflow
          },
          parent: parent ? {
            tagName: parent.tagName,
            className: parent.className,
            overflow: parentCs.overflow,
            opacity: parentCs.opacity,
            display: parentCs.display
          } : null,
          matchedRules: matched
        };
      }, p.selector);

      // Screenshot header
      const headerSelector = p.name === 'index' ? '.home-page__header' : '.topbar';
      const headerEl = await page.$(headerSelector);
      const shotPath = path.join(__dirname, 'shots', `avatar_measure_${p.name}_${theme}.png`);
      if (headerEl) {
        await headerEl.screenshot({ path: shotPath });
      }

      results[p.name][theme] = {
        ...info,
        imgRequestsCount: imgRequests.length
      };

      await page.close();
    }
  }

  await browser.close();
  await pool.end();

  console.log(JSON.stringify(results, null, 2));
  fs.writeFileSync(path.join(__dirname, 'avatar_measure_report.json'), JSON.stringify(results, null, 2));
})();
