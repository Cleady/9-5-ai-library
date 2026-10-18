const puppeteer = require('./node_modules/puppeteer-core');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });
const mysql = require('../backend/node_modules/mysql2/promise');

(async () => {
  // 1. Get user & token
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
    { name: 'home_page', url: 'http://localhost:3000/home_page/home_page.html' },
    { name: 'resources', url: 'http://localhost:3000/pages/lectures/resources.html' },
    { name: 'community_feed', url: 'http://localhost:3000/pages/community/community-feed.html' },
    { name: 'history', url: 'http://localhost:3000/pages/history.html' },
    { name: 'settings', url: 'http://localhost:3000/pages/settings/settings.html' },
    { name: 'index', url: 'http://localhost:3000/index.html' }
  ];

  const report = {};

  for (const p of pages) {
    report[p.name] = {};
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    await page.evaluateOnNewDocument((tk, u) => {
      localStorage.setItem('token', tk);
      localStorage.setItem('user', JSON.stringify(u));
      localStorage.setItem('lib95:settings:data', JSON.stringify({
        settings: { appearance: { theme: 'dark', accentColor: 'blue' } }
      }));
    }, token, ownerUser);

    await page.goto(p.url, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    // Capture header
    const headerSel = p.name === 'index' ? '.home-page__header' : '.topbar';
    const headerEl = await page.$(headerSel);
    if (headerEl) {
      await headerEl.screenshot({ path: path.join(__dirname, 'shots', `topbar_dark_before_${p.name}.png`) });
    }

    const data = await page.evaluate((pageName) => {
      function getProps(sel) {
        const el = document.querySelector(sel);
        if (!el) return null;
        const cs = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();

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
          selector: sel,
          tagName: el.tagName,
          className: el.className,
          width: rect.width + 'px',
          height: rect.height + 'px',
          padding: cs.padding,
          margin: cs.margin,
          gap: cs.gap,
          border: cs.border,
          borderRadius: cs.borderRadius,
          background: cs.background,
          backgroundColor: cs.backgroundColor,
          backdropFilter: cs.backdropFilter,
          boxShadow: cs.boxShadow,
          color: cs.color,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          matched
        };
      }

      if (pageName === 'index') {
        return {
          search: getProps('.home-page__search'),
          searchInput: getProps('.home-page__search input'),
          searchShortcut: getProps('.home-page__shortcut'),
          searchKbd: getProps('.home-page__shortcut kbd'),
          themeBtn: getProps('.home-page__theme-toggle'),
          bellBtn: getProps('.home-page__notification-button'),
          bellDot: getProps('.home-page__notification-badge'),
          userMenu: getProps('.home-page__guest-button'),
          userAvatar: getProps('.home-page__guest-avatar'),
          userChevron: getProps('.home-page__chevron')
        };
      }

      return {
        search: getProps('.search'),
        searchInput: getProps('.search-input'),
        searchShortcut: getProps('.search-shortcut'),
        searchKbd: getProps('.search-shortcut kbd'),
        themeBtn: getProps('.theme-quick-toggle'),
        bellBtn: getProps('.icon-button:not(.theme-quick-toggle)'),
        bellDot: getProps('.notification-dot'),
        userMenu: getProps('.user-menu-toggle'),
        userAvatar: getProps('.user-avatar'),
        userName: getProps('.user-name'),
        roleBadge: getProps('.role-badge'),
        userChevron: getProps('.user-chevron')
      };
    }, p.name);

    report[p.name] = data;
    await page.close();
  }

  await browser.close();
  await pool.end();

  console.log('=== TOPBAR MEASUREMENT REPORT ===');
  fs.writeFileSync(path.join(__dirname, 'topbar_measure_report.json'), JSON.stringify(report, null, 2));
  console.log('Saved topbar_measure_report.json');
})();
