const puppeteer = require('./node_modules/puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const pagesToTest = [
    { name: 'auth_login', url: 'http://localhost:3000/pages/auth/login.html' },
    { name: 'auth_signup', url: 'http://localhost:3000/pages/auth/signup.html' },
    { name: 'auth_forgot_pass', url: 'http://localhost:3000/pages/auth/forgot_pass.html' },
    { name: 'auth_reset_pass', url: 'http://localhost:3000/pages/auth/reset_pass.html' },
    { name: 'auth_send_email', url: 'http://localhost:3000/pages/auth/send_email.html' }
  ];

  for (const item of pagesToTest) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('lib95:settings:data', JSON.stringify({
        settings: { appearance: { theme: 'dark', accentColor: 'blue' } }
      }));
    });

    try {
      await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 15000 });
      await new Promise(r => setTimeout(r, 600));
      const outPath = path.join(__dirname, 'shots', 'phase2', `test_${item.name}_dark_fixed.png`);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`Saved screenshot: ${outPath}`);
    } catch (e) {
      console.error(`Error on ${item.name}:`, e.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('Done testing Nhóm 6 auth pages.');
})();
