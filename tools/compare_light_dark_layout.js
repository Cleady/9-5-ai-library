const puppeteer = require('./node_modules/puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new'
  });

  async function getLayout(theme) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.evaluateOnNewDocument((th) => {
      localStorage.setItem('lib95:settings:data', JSON.stringify({ settings: { appearance: { theme: th } } }));
      localStorage.setItem('token', 'mock_token');
      localStorage.setItem('user', JSON.stringify({ id: 1, role: 'owner', full_name: 'Owner' }));
    }, theme);
    await page.goto('http://localhost:3000/pages/admin/admin.html', { waitUntil: 'networkidle2' });
    await page.evaluate(() => {
      const navItems = Array.from(document.querySelectorAll('.sidebar-link, .nav-link, [data-tab]'));
      const settingsNav = navItems.find(el => el.textContent.includes('Settings') || el.getAttribute('data-tab') === 'settings');
      if (settingsNav) settingsNav.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const data = await page.evaluate(() => {
      const getStyles = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const cs = window.getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
          rect: { top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) },
          backgroundColor: cs.backgroundColor,
          border: cs.border,
          borderRadius: cs.borderRadius,
          padding: cs.padding,
          margin: cs.margin,
          backdropFilter: cs.backdropFilter || cs.webkitBackdropFilter || 'none',
          boxShadow: cs.boxShadow
        };
      };

      return {
        topbar: getStyles('.topbar'),
        search: getStyles('.search'),
        topbarActions: getStyles('.topbar-actions'),
        themeBtn: getStyles('.theme-quick-toggle'),
        bellBtn: getStyles('.topbar-actions .icon-button:not(.theme-quick-toggle)'),
        userMenu: getStyles('.user-menu'),
        settingsContent: getStyles('.settings-form')
      };
    });
    await page.close();
    return data;
  }

  const lightData = await getLayout('light');
  const darkData = await getLayout('dark');

  console.log('=== TOPBAR COMPARISON ===');
  console.log('Light Topbar:', lightData.topbar);
  console.log('Dark Topbar:', darkData.topbar);

  console.log('\n=== SEARCH COMPARISON ===');
  console.log('Light Search:', lightData.search);
  console.log('Dark Search:', darkData.search);

  console.log('\n=== THEME BTN COMPARISON ===');
  console.log('Light ThemeBtn:', lightData.themeBtn);
  console.log('Dark ThemeBtn:', darkData.themeBtn);

  console.log('\n=== BELL BTN COMPARISON ===');
  console.log('Light BellBtn:', lightData.bellBtn);
  console.log('Dark BellBtn:', darkData.bellBtn);

  console.log('\n=== USER MENU COMPARISON ===');
  console.log('Light UserMenu:', lightData.userMenu);
  console.log('Dark UserMenu:', darkData.userMenu);

  await browser.close();
})();
