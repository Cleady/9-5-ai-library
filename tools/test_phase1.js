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

  const testPages = [
    { name: 'home_page', url: 'http://localhost:3000/home_page/home_page.html', headerSel: '.topbar' },
    { name: 'resources', url: 'http://localhost:3000/pages/lectures/resources.html', headerSel: '.topbar' },
    { name: 'community_feed', url: 'http://localhost:3000/pages/community/community-feed.html', headerSel: '.topbar' },
    { name: 'history', url: 'http://localhost:3000/pages/history.html', headerSel: '.topbar' },
    { name: 'settings', url: 'http://localhost:3000/pages/settings/settings.html', headerSel: '.topbar' },
    { name: 'admin', url: 'http://localhost:3000/pages/admin/admin.html', headerSel: '.topbar' },
    { name: 'index', url: 'http://localhost:3000/index.html', headerSel: '.home-page__header' },
    { name: 'login', url: 'http://localhost:3000/pages/auth/login.html', headerSel: null }
  ];

  const results = {};

  for (const tp of testPages) {
    const page = await browser.newPage();
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', err => consoleErrors.push(err.message));

    await page.setViewport({ width: 1440, height: 900 });
    await page.evaluateOnNewDocument((tk, u) => {
      localStorage.setItem('token', tk);
      localStorage.setItem('user', JSON.stringify(u));
      localStorage.setItem('lib95:settings:data', JSON.stringify({
        settings: { appearance: { theme: 'dark', accentColor: 'blue' } }
      }));
    }, token, ownerUser);

    await page.goto(tp.url, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    // Measure buttons & check user menu
    const pageInfo = await page.evaluate((pageName) => {
      const topbarThemeBtns = document.querySelectorAll('.theme-quick-toggle, .home-page__theme-toggle, .auth-theme-toggle');
      const userMenuThemeItems = document.querySelectorAll('.user-menu-theme-item');
      const userMenuList = document.getElementById('user-menu-list');

      let menuItems = [];
      if (userMenuList) {
        menuItems = Array.from(userMenuList.querySelectorAll('li a')).map(a => a.textContent.trim());
      }

      let btnDetails = null;
      if (topbarThemeBtns.length > 0) {
        const b = topbarThemeBtns[0];
        btnDetails = {
          className: b.className,
          ariaLabel: b.getAttribute('aria-label'),
          ariaPressed: b.getAttribute('aria-pressed'),
          title: b.getAttribute('title'),
          hasSvg: !!b.querySelector('svg'),
          isLeftOfBell: false
        };

        if (pageName === 'index') {
          const next = b.nextElementSibling;
          btnDetails.isLeftOfBell = next && next.classList.contains('home-page__notification-wrap');
        } else if (pageName !== 'login') {
          const next = b.nextElementSibling;
          btnDetails.isLeftOfBell = next && (next.classList.contains('icon-button') || next.classList.contains('notification'));
        }
      }

      return {
        topbarThemeBtnCount: topbarThemeBtns.length,
        userMenuThemeItemCount: userMenuThemeItems.length,
        userMenuItems: menuItems,
        btnDetails
      };
    }, tp.name);

    pageInfo.consoleErrors = consoleErrors;
    results[tp.name] = pageInfo;

    // Capture dropdown after on resources
    if (tp.name === 'resources') {
      const toggle = await page.$('.user-menu-toggle');
      if (toggle) {
        await toggle.click();
        await new Promise(r => setTimeout(r, 300));
        const userMenu = await page.$('.user-menu');
        if (userMenu) {
          await userMenu.screenshot({ path: path.join(shotsDir, 'dropdown_after_resources_dark.png') });
        }
      }

      // Mobile 390px dropdown after
      await page.setViewport({ width: 390, height: 844 });
      await new Promise(r => setTimeout(r, 300));
      const userMenuM = await page.$('.user-menu');
      if (userMenuM) {
        await userMenuM.screenshot({ path: path.join(shotsDir, 'dropdown_after_resources_mobile_390.png') });
      }

      // Restore 1440px
      await page.setViewport({ width: 1440, height: 900 });
    }

    // Capture light dropdown after on resources
    if (tp.name === 'resources') {
      await page.evaluate(() => {
        localStorage.setItem('lib95:settings:data', JSON.stringify({
          settings: { appearance: { theme: 'light', accentColor: 'blue' } }
        }));
        document.documentElement.removeAttribute('data-theme');
      });
      await new Promise(r => setTimeout(r, 400));
      const userMenuL = await page.$('.user-menu');
      if (userMenuL) {
        await userMenuL.screenshot({ path: path.join(shotsDir, 'dropdown_after_resources_light.png') });
      }
    }

    await page.close();
  }

  // 2. Test toggle behavior & two-way sync on Settings page
  const settingsPage = await browser.newPage();
  await settingsPage.setViewport({ width: 1440, height: 900 });
  await settingsPage.evaluateOnNewDocument((tk, u) => {
    localStorage.setItem('token', tk);
    localStorage.setItem('user', JSON.stringify(u));
    localStorage.setItem('lib95:settings:data', JSON.stringify({
      settings: { appearance: { theme: 'light', accentColor: 'blue' } }
    }));
  }, token, ownerUser);

  await settingsPage.goto('http://localhost:3000/pages/settings/settings.html#appearance', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  // Switch to appearance tab
  await settingsPage.evaluate(() => {
    const btn = document.querySelector('a[data-panel="panel-appearance"], button[data-panel="panel-appearance"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 300));

  const behaviorTests = {};

  // Test A: click topbar theme button when light -> switches to dark
  const themeBtn = await settingsPage.$('.theme-quick-toggle');
  if (themeBtn) {
    await themeBtn.click();
    await new Promise(r => setTimeout(r, 300));
    behaviorTests.clickFromLightToDark = await settingsPage.evaluate(() => {
      const data = JSON.parse(localStorage.getItem('lib95:settings:data'));
      const hasDarkAttr = document.documentElement.getAttribute('data-theme') === 'dark';
      const darkRadioChecked = document.querySelector('input[name="app-theme"][value="dark"]')?.checked;
      const btn = document.querySelector('.theme-quick-toggle');
      return {
        themeInStorage: data?.settings?.appearance?.theme,
        hasDarkAttr,
        darkRadioChecked,
        ariaLabel: btn?.getAttribute('aria-label'),
        ariaPressed: btn?.getAttribute('aria-pressed')
      };
    });

    // Test B: click topbar theme button when dark -> switches to light
    await themeBtn.click();
    await new Promise(r => setTimeout(r, 300));
    behaviorTests.clickFromDarkToLight = await settingsPage.evaluate(() => {
      const data = JSON.parse(localStorage.getItem('lib95:settings:data'));
      const hasDarkAttr = document.documentElement.getAttribute('data-theme') === 'dark';
      const lightRadioChecked = document.querySelector('input[name="app-theme"][value="light"]')?.checked;
      const btn = document.querySelector('.theme-quick-toggle');
      return {
        themeInStorage: data?.settings?.appearance?.theme,
        hasDarkAttr,
        lightRadioChecked,
        ariaLabel: btn?.getAttribute('aria-label'),
        ariaPressed: btn?.getAttribute('aria-pressed')
      };
    });

    // Test C: click "Auto" in settings -> then click topbar theme button
    await settingsPage.evaluate(() => {
      const autoRadio = document.querySelector('input[name="app-theme"][value="auto"]');
      if (autoRadio) {
        autoRadio.click();
        autoRadio.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    await new Promise(r => setTimeout(r, 300));

    await themeBtn.click();
    await new Promise(r => setTimeout(r, 300));
    behaviorTests.clickFromAuto = await settingsPage.evaluate(() => {
      const data = JSON.parse(localStorage.getItem('lib95:settings:data'));
      const btn = document.querySelector('.theme-quick-toggle');
      return {
        themeInStorage: data?.settings?.appearance?.theme,
        hasDarkAttr: document.documentElement.getAttribute('data-theme') === 'dark',
        ariaLabel: btn?.getAttribute('aria-label'),
        ariaPressed: btn?.getAttribute('aria-pressed')
      };
    });
  }

  // Check the hint text in settings
  behaviorTests.hintTextPresent = await settingsPage.evaluate(() => {
    const hintEl = document.querySelector('.set-form-group .set-row-desc');
    return hintEl ? hintEl.textContent.trim() : null;
  });

  await settingsPage.close();
  await browser.close();
  await pool.end();

  const finalOutput = {
    pagesAudit: results,
    behaviorTests
  };

  fs.writeFileSync(path.join(__dirname, 'phase1_test_results.json'), JSON.stringify(finalOutput, null, 2));
  console.log('Phase 1 test finished successfully.');
})();
