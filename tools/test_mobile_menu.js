const puppeteer = require('./node_modules/puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  // 1. Mobile Dark Mode
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('lib95:settings:data', JSON.stringify({
      settings: { appearance: { theme: 'dark', accentColor: 'blue' } }
    }));
  });

  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  // Click hamburger menu
  await page.click('[data-home-menu]');
  await new Promise(r => setTimeout(r, 300));

  await page.screenshot({ path: path.join(__dirname, 'shots', 'mobile_dark_menu_open.png'), fullPage: false });
  console.log('Saved mobile_dark_menu_open.png');

  // 2. Mobile Light Mode
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(__dirname, 'shots', 'mobile_light_menu_open.png'), fullPage: false });
  console.log('Saved mobile_light_menu_open.png');

  await browser.close();
})();
