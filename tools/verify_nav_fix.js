const puppeteer = require('./node_modules/puppeteer-core');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = {
    desktopDarkStyles: {},
    desktopLightStyles: {},
    mobileDarkStyles: {},
    mobileLightStyles: {},
    pixelDiffs: {},
    focusVisible: {}
  };

  const shotsDir = path.join(__dirname, 'shots');
  if (!fs.existsSync(shotsDir)) fs.mkdirSync(shotsDir, { recursive: true });

  // 1. DESKTOP (1440x900) - DARK MODE
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('lib95:settings:data', JSON.stringify({
        settings: { appearance: { theme: 'dark', accentColor: 'blue' } }
      }));
    });
    await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    results.desktopDarkStyles = await page.evaluate(() => {
      const nav = document.querySelector('.home-page__nav');
      const cs = window.getComputedStyle(nav);
      return {
        border: cs.border,
        backgroundColor: cs.backgroundColor,
        boxShadow: cs.boxShadow,
        outline: cs.outline
      };
    });

    const header = await page.$('.home-page__header');
    await header.screenshot({ path: path.join(shotsDir, 'header_dark_after_1440.png') });

    // Test hover on Lectures link
    await page.hover('.home-page__nav-link[href="pages/lectures/lectures.html"]');
    await new Promise(r => setTimeout(r, 300));
    await header.screenshot({ path: path.join(shotsDir, 'header_dark_hover_lectures.png') });

    // Test Keyboard Tab Focus-visible
    // Reset focus to top
    await page.evaluate(() => document.activeElement && document.activeElement.blur());
    await page.keyboard.press('Tab'); // Usually logo
    await page.keyboard.press('Tab'); // Nav link 1 (Home)
    const activeFocus1 = await page.evaluate(() => document.activeElement.textContent.trim());
    await header.screenshot({ path: path.join(shotsDir, 'header_dark_focus_home.png') });

    await page.keyboard.press('Tab'); // Nav link 2 (Lectures)
    const activeFocus2 = await page.evaluate(() => document.activeElement.textContent.trim());
    await header.screenshot({ path: path.join(shotsDir, 'header_dark_focus_lectures.png') });

    results.focusVisible = { tab1: activeFocus1, tab2: activeFocus2 };
    await page.close();
  }

  // 2. DESKTOP (1440x900) - LIGHT MODE (Compare with baseline)
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('lib95:settings:data', JSON.stringify({
        settings: { appearance: { theme: 'light', accentColor: 'blue' } }
      }));
    });
    await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    results.desktopLightStyles = await page.evaluate(() => {
      const nav = document.querySelector('.home-page__nav');
      const cs = window.getComputedStyle(nav);
      return {
        border: cs.border,
        backgroundColor: cs.backgroundColor,
        boxShadow: cs.boxShadow,
        outline: cs.outline
      };
    });

    const header = await page.$('.home-page__header');
    await header.screenshot({ path: path.join(shotsDir, 'header_light_after_1440.png') });
    await page.close();
  }

  // 3. MOBILE (390x844) - DARK MODE
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('lib95:settings:data', JSON.stringify({
        settings: { appearance: { theme: 'dark', accentColor: 'blue' } }
      }));
    });
    await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({ path: path.join(shotsDir, 'mobile_dark_closed_390.png') });

    // Open mobile menu
    await page.click('[data-home-menu]');
    await new Promise(r => setTimeout(r, 400));

    results.mobileDarkStyles = await page.evaluate(() => {
      const nav = document.querySelector('.home-page__nav');
      const cs = window.getComputedStyle(nav);
      return {
        border: cs.border,
        backgroundColor: cs.backgroundColor,
        boxShadow: cs.boxShadow,
        display: cs.display
      };
    });

    await page.screenshot({ path: path.join(shotsDir, 'mobile_dark_open_390.png') });
    await page.close();
  }

  // 4. MOBILE (390x844) - LIGHT MODE
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('lib95:settings:data', JSON.stringify({
        settings: { appearance: { theme: 'light', accentColor: 'blue' } }
      }));
    });
    await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    // Open mobile menu
    await page.click('[data-home-menu]');
    await new Promise(r => setTimeout(r, 400));

    results.mobileLightStyles = await page.evaluate(() => {
      const nav = document.querySelector('.home-page__nav');
      const cs = window.getComputedStyle(nav);
      return {
        border: cs.border,
        backgroundColor: cs.backgroundColor,
        boxShadow: cs.boxShadow,
        display: cs.display
      };
    });

    await page.screenshot({ path: path.join(shotsDir, 'mobile_light_open_390.png') });
    await page.close();
  }

  await browser.close();

  console.log('=== VERIFICATION RESULTS ===');
  console.log(JSON.stringify(results, null, 2));
})();
