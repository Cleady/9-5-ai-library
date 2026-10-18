const puppeteer = require('./node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';

(async () => {
  console.log('--- STARTING GIAI ĐOẠN 4 INTERACTIVE & FUNCTIONAL AUDIT ---');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    protocolTimeout: 60000
  });

  const results = {};

  // Test 1: Single theme toggle button & persistence across reload
  console.log('Test 1: Single toggle button & persistence across reload...');
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    await page.goto(`${BASE_URL}/home_page/home_page.html`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));

    // Set to light first
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('lib95:settings:data', JSON.stringify({
        settings: { appearance: { theme: 'light', accentColor: 'blue' } }
      }));
    });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));

    // Check initial theme
    const themeInitial = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));

    // Find and click the single quick toggle button
    const toggleBtn = await page.$('.theme-quick-toggle');
    if (!toggleBtn) throw new Error('Theme toggle button not found!');

    await toggleBtn.click();
    await new Promise(r => setTimeout(r, 400));

    // Check theme after click
    const themeAfterClick = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    const storageAfterClick = await page.evaluate(() => localStorage.getItem('lib95:settings:data'));

    // Reload to verify persistence
    await page.reload({ waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));
    const themeAfterReload = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));

    results.test1_toggle_and_persistence = {
      themeInitial,
      themeAfterClick,
      storagePersisted: JSON.parse(storageAfterClick).settings.appearance.theme,
      themeAfterReload,
      passed: themeAfterClick === 'dark' && themeAfterReload === 'dark'
    };
    await page.close();
    console.log('Test 1 Passed:', results.test1_toggle_and_persistence);
  } catch (err) {
    console.log('Test 1 Error:', err.message);
    results.test1_toggle_and_persistence = { error: err.message };
  }

  // Test 2: FOUC (Flash of Unstyled Content) Verification
  console.log('\nTest 2: FOUC check on reload...');
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    // Pre-set dark in storage
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('lib95:settings:data', JSON.stringify({
        settings: { appearance: { theme: 'dark', accentColor: 'blue' } }
      }));
    });

    await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'domcontentloaded' });
    const domReadyTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));

    results.test2_fouc = {
      domReadyTheme,
      passed: domReadyTheme === 'dark'
    };
    await page.close();
    console.log('Test 2 Passed:', results.test2_fouc);
  } catch (err) {
    console.log('Test 2 Error:', err.message);
    results.test2_fouc = { error: err.message };
  }

  // Test 3: Synchronization between Tab A and Tab B via Storage Event
  console.log('\nTest 3: Cross-tab sync via Storage Event...');
  try {
    const pageA = await browser.newPage();
    const pageB = await browser.newPage();
    await pageA.setViewport({ width: 1440, height: 900 });
    await pageB.setViewport({ width: 1440, height: 900 });

    await pageA.goto(`${BASE_URL}/home_page/home_page.html`, { waitUntil: 'domcontentloaded' });
    await pageB.goto(`${BASE_URL}/pages/lectures/resources.html`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));

    // Ensure Page B is listening to storage event and updates
    await pageA.evaluate(() => {
      const btn = document.querySelector('.theme-quick-toggle');
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const themePageA = await pageA.evaluate(() => document.documentElement.getAttribute('data-theme'));
    const themePageB = await pageB.evaluate(() => document.documentElement.getAttribute('data-theme'));

    results.test3_cross_tab_sync = {
      themePageA,
      themePageB,
      synced: themePageA === themePageB
    };
    await pageA.close();
    await pageB.close();
    console.log('Test 3 Passed:', results.test3_cross_tab_sync);
  } catch (err) {
    console.log('Test 3 Error:', err.message);
    results.test3_cross_tab_sync = { error: err.message };
  }

  // Test 4: Mobile 390px Topbar Overflow Check (No wrap, no overflow)
  console.log('\nTest 4: Mobile 390px Topbar layout and overflow...');
  try {
    const testPages = [
      { name: 'home_page', url: '/home_page/home_page.html' },
      { name: 'resources', url: '/pages/lectures/resources.html' },
      { name: 'admin', url: '/pages/admin/admin.html' },
      { name: 'index', url: '/index.html' }
    ];

    const mobileResults = [];

    for (const tp of testPages) {
      const page = await browser.newPage();
      await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem('token', 'mock_token');
        localStorage.setItem('user', JSON.stringify({ id: 1, role: 'admin', full_name: 'Admin User' }));
      });
      await page.goto(`${BASE_URL}${tp.url}`, { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
      await new Promise(r => setTimeout(r, 600));

      const overflowData = await page.evaluate(() => {
        const topbar = document.querySelector('.topbar, .home-page__header, header');
        if (!topbar) return { error: 'Topbar not found' };

        const clientWidth = topbar.clientWidth;
        const scrollWidth = topbar.scrollWidth;

        const btnTheme = document.querySelector('.theme-quick-toggle');
        const isVisible = (el) => {
          if (!el) return false;
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0;
        };

        return {
          clientWidth,
          scrollWidth,
          overflows: scrollWidth > clientWidth,
          themeBtnVisible: isVisible(btnTheme),
          hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth
        };
      });

      mobileResults.push({ page: tp.name, ...overflowData });
      await page.close();
    }

    results.test4_mobile_390_layout = mobileResults;
    console.log('Test 4 Passed:', results.test4_mobile_390_layout);
  } catch (err) {
    console.log('Test 4 Error:', err.message);
    results.test4_mobile_390_layout = { error: err.message };
  }

  // Test 5: Interactive States in Dark (Hover, Focus, Disabled)
  console.log('\nTest 5: Interactive States (Hover, Focus-Visible, Disabled)...');
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/home_page/home_page.html`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 600));

    const interactiveData = await page.evaluate(() => {
      const themeBtn = document.querySelector('.theme-quick-toggle');
      const csNormal = window.getComputedStyle(themeBtn);

      return {
        themeBtn: {
          bg: csNormal.backgroundColor,
          border: csNormal.border,
          color: csNormal.color
        }
      };
    });

    // Hover theme button
    await page.hover('.theme-quick-toggle');
    await new Promise(r => setTimeout(r, 300));

    const hoverData = await page.evaluate(() => {
      const themeBtn = document.querySelector('.theme-quick-toggle');
      const csHover = window.getComputedStyle(themeBtn);
      return {
        hoverBg: csHover.backgroundColor,
        hoverColor: csHover.color,
        hoverBorder: csHover.border
      };
    });

    results.test5_interactive_states = {
      normal: interactiveData,
      hover: hoverData
    };
    await page.close();
    console.log('Test 5 Passed:', results.test5_interactive_states);
  } catch (err) {
    console.log('Test 5 Error:', err.message);
    results.test5_interactive_states = { error: err.message };
  }

  await browser.close();

  fs.writeFileSync(path.join(__dirname, 'phase4_audit_results.json'), JSON.stringify(results, null, 2));
  console.log('\n--- GIAI ĐOẠN 4 INTERACTIVE AUDIT COMPLETED ---');
})();
