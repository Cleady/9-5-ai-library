const puppeteer = require('./node_modules/puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('lib95:settings:data', JSON.stringify({
      settings: { appearance: { theme: 'dark', accentColor: 'blue' } }
    }));
  });

  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  // Current (Before)
  const headerEl = await page.$('.home-page__header');
  await headerEl.screenshot({ path: path.join(__dirname, 'shots', 'header_dark_before.png') });
  console.log('Saved header_dark_before.png');

  // Test Option A: border: none !important (keep background & box-shadow)
  await page.evaluate(() => {
    const el = document.querySelector('.home-page__nav');
    el.style.border = 'none';
  });
  await headerEl.screenshot({ path: path.join(__dirname, 'shots', 'header_dark_optA_border_none.png') });
  console.log('Saved header_dark_optA_border_none.png');

  // Test Option B: border: none !important; background: transparent !important; box-shadow: none !important;
  await page.evaluate(() => {
    const el = document.querySelector('.home-page__nav');
    el.style.border = 'none';
    el.style.background = 'transparent';
    el.style.boxShadow = 'none';
  });
  await headerEl.screenshot({ path: path.join(__dirname, 'shots', 'header_dark_optB_fully_seamless.png') });
  console.log('Saved header_dark_optB_fully_seamless.png');

  // Also check light theme (baseline reference)
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    const el = document.querySelector('.home-page__nav');
    el.style.border = '';
    el.style.background = '';
    el.style.boxShadow = '';
  });
  await new Promise(r => setTimeout(r, 300));
  await headerEl.screenshot({ path: path.join(__dirname, 'shots', 'header_light_ref.png') });
  console.log('Saved header_light_ref.png');

  await browser.close();
})();
