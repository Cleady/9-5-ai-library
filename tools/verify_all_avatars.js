const puppeteer = require('./node_modules/puppeteer-core');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });
const mysql = require('../backend/node_modules/mysql2/promise');

(async () => {
  // 1. Fetch real Owner user from DB
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  const [rows] = await pool.query('SELECT id, username, full_name, role, avatar_url, status FROM users WHERE id=1');
  const ownerUser = rows[0];

  // 2. Fetch real JWT token from login API
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

  const pagesToTest = [
    { name: 'index', url: 'http://localhost:3000/index.html', avatarSelector: '.home-page__guest-avatar', headerSelector: '.home-page__header' },
    { name: 'home_page', url: 'http://localhost:3000/home_page/home_page.html', avatarSelector: '.user-avatar', headerSelector: '.topbar' },
    { name: 'resources', url: 'http://localhost:3000/pages/lectures/resources.html', avatarSelector: '.user-avatar', headerSelector: '.topbar' },
    { name: 'community_feed', url: 'http://localhost:3000/pages/community/community-feed.html', avatarSelector: '.user-menu .user-avatar', headerSelector: '.topbar' },
    { name: 'settings', url: 'http://localhost:3000/pages/settings/settings.html', avatarSelector: '.user-avatar', headerSelector: '.topbar' },
    { name: 'admin', url: 'http://localhost:3000/pages/admin/admin.html', avatarSelector: '.user-avatar', headerSelector: '.topbar' }
  ];

  const shotsDir = path.join(__dirname, 'shots');
  if (!fs.existsSync(shotsDir)) fs.mkdirSync(shotsDir, { recursive: true });

  const auditReport = {
    pages: {},
    threeCases: {},
    dynamicToggle: {}
  };

  // --- PART 1: Capture 1440px and 390px in Light & Dark for all 6 pages ---
  for (const p of pagesToTest) {
    auditReport.pages[p.name] = {};

    for (const view of [
      { mode: 'desktop', width: 1440, height: 900, isMobile: false },
      { mode: 'mobile', width: 390, height: 844, isMobile: true }
    ]) {
      for (const theme of ['light', 'dark']) {
        const page = await browser.newPage();
        await page.setViewport({
          width: view.width,
          height: view.height,
          isMobile: view.isMobile,
          hasTouch: view.isMobile
        });

        await page.evaluateOnNewDocument((tk, u, th) => {
          localStorage.setItem('token', tk);
          localStorage.setItem('user', JSON.stringify(u));
          localStorage.setItem('lib95:settings:data', JSON.stringify({
            settings: { appearance: { theme: th, accentColor: 'blue' } }
          }));
        }, token, ownerUser, theme);

        await page.goto(p.url, { waitUntil: 'networkidle2', timeout: 15000 });
        await new Promise(r => setTimeout(r, 600));

        const avatarState = await page.evaluate((sel) => {
          const el = document.querySelector(sel);
          if (!el) return { error: 'Not found: ' + sel };
          const cs = window.getComputedStyle(el);
          return {
            tagName: el.tagName,
            hasBgImage: cs.backgroundImage !== 'none',
            bgImage: cs.backgroundImage ? cs.backgroundImage.substring(0, 45) + '...' : 'none',
            bgColor: cs.backgroundColor,
            display: cs.display,
            width: cs.width,
            height: cs.height,
            textContent: el.textContent.trim()
          };
        }, p.avatarSelector);

        // Header screenshot
        const headerEl = await page.$(p.headerSelector);
        const shotName = `avatar_${p.name}_${view.mode}_${theme}.png`;
        if (headerEl) {
          await headerEl.screenshot({ path: path.join(shotsDir, shotName) });
        } else {
          await page.screenshot({ path: path.join(shotsDir, shotName) });
        }

        const key = `${view.mode}_${theme}`;
        auditReport.pages[p.name][key] = {
          shot: shotName,
          avatar: avatarState
        };

        await page.close();
      }
    }
  }

  // --- PART 2: Test 3 avatar scenarios in Dark Theme ---
  // Case 1: Uploaded avatar (tested in part 1)
  // Case 2: No avatar (avatar_url = null)
  // Case 3: Broken image URL (avatar_url = '/assets/nonexistent-404.png')
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // Case 2: No avatar
    const noAvatarUser = { ...ownerUser, avatar_url: null };
    await page.evaluateOnNewDocument((tk, u) => {
      localStorage.setItem('token', tk);
      localStorage.setItem('user', JSON.stringify(u));
      localStorage.setItem('lib95:settings:data', JSON.stringify({
        settings: { appearance: { theme: 'dark', accentColor: 'blue' } }
      }));
    }, token, noAvatarUser);

    await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    const case2Index = await page.evaluate(() => {
      const el = document.querySelector('.home-page__guest-avatar');
      const cs = window.getComputedStyle(el);
      return {
        textContent: el.textContent.trim(),
        color: cs.color,
        bgColor: cs.backgroundColor,
        hasBgImage: cs.backgroundImage !== 'none'
      };
    });
    const header2 = await page.$('.home-page__header');
    await header2.screenshot({ path: path.join(shotsDir, 'avatar_case2_no_avatar_dark.png') });

    // Also check on home_page.html
    await page.goto('http://localhost:3000/home_page/home_page.html', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));
    const case2HomePage = await page.evaluate(() => {
      const el = document.querySelector('.user-avatar');
      const cs = window.getComputedStyle(el);
      return {
        textContent: el.textContent.trim(),
        color: cs.color,
        bgColor: cs.backgroundColor,
        hasBgImage: cs.backgroundImage !== 'none'
      };
    });
    const header2Home = await page.$('.topbar');
    await header2Home.screenshot({ path: path.join(shotsDir, 'avatar_case2_home_page_no_avatar_dark.png') });

    auditReport.threeCases.case2_no_avatar = {
      index: case2Index,
      home_page: case2HomePage
    };

    // Case 3: Broken image URL
    const brokenUser = { ...ownerUser, avatar_url: '/assets/nonexistent_image_404.jpg' };
    await page.evaluate((tk, u) => {
      localStorage.setItem('token', tk);
      localStorage.setItem('user', JSON.stringify(u));
    }, token, brokenUser);

    await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    const case3Index = await page.evaluate(() => {
      const el = document.querySelector('.home-page__guest-avatar');
      const cs = window.getComputedStyle(el);
      return {
        textContent: el.textContent.trim(),
        color: cs.color,
        bgColor: cs.backgroundColor,
        bgImage: cs.backgroundImage
      };
    });
    const header3 = await page.$('.home-page__header');
    await header3.screenshot({ path: path.join(shotsDir, 'avatar_case3_broken_img_dark.png') });

    auditReport.threeCases.case3_broken_img = {
      index: case3Index
    };

    await page.close();
  }

  // --- PART 3: Dynamic Theme Switching without reload ---
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    await page.evaluateOnNewDocument((tk, u) => {
      localStorage.setItem('token', tk);
      localStorage.setItem('user', JSON.stringify(u));
      localStorage.setItem('lib95:settings:data', JSON.stringify({
        settings: { appearance: { theme: 'light', accentColor: 'blue' } }
      }));
    }, token, ownerUser);

    await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    // 1. Initial Light
    const step1 = await page.evaluate(() => {
      const el = document.querySelector('.home-page__guest-avatar');
      return {
        theme: document.documentElement.getAttribute('data-theme') || 'light',
        hasBgImage: window.getComputedStyle(el).backgroundImage !== 'none'
      };
    });

    // 2. Switch to Dark
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await new Promise(r => setTimeout(r, 200));
    const step2 = await page.evaluate(() => {
      const el = document.querySelector('.home-page__guest-avatar');
      return {
        theme: document.documentElement.getAttribute('data-theme') || 'light',
        hasBgImage: window.getComputedStyle(el).backgroundImage !== 'none'
      };
    });

    // 3. Switch back to Light
    await page.evaluate(() => {
      document.documentElement.removeAttribute('data-theme');
    });
    await new Promise(r => setTimeout(r, 200));
    const step3 = await page.evaluate(() => {
      const el = document.querySelector('.home-page__guest-avatar');
      return {
        theme: document.documentElement.getAttribute('data-theme') || 'light',
        hasBgImage: window.getComputedStyle(el).backgroundImage !== 'none'
      };
    });

    auditReport.dynamicToggle = { step1, step2, step3 };
    await page.close();
  }

  await browser.close();
  await pool.end();

  console.log('=== AUDIT COMPLETE ===');
  console.log(JSON.stringify(auditReport, null, 2));
  fs.writeFileSync(path.join(__dirname, 'final_avatar_audit.json'), JSON.stringify(auditReport, null, 2));
})();
