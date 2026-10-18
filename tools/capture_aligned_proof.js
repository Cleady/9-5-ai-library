const puppeteer = require('./node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\anhqu\\.gemini\\antigravity\\brain\\017b0809-a52b-4747-be93-fb4c154854d2';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new'
  });

  // Dark capture
  const pageDark = await browser.newPage();
  await pageDark.setViewport({ width: 1440, height: 900 });
  await pageDark.evaluateOnNewDocument(() => {
    localStorage.setItem('lib95:settings:data', JSON.stringify({ settings: { appearance: { theme: 'dark' } } }));
    localStorage.setItem('token', 'mock_token');
    localStorage.setItem('user', JSON.stringify({ id: 1, role: 'owner', full_name: 'Owner' }));
  });
  await pageDark.goto('http://localhost:3000/pages/admin/admin.html', { waitUntil: 'networkidle2' });
  await pageDark.evaluate(() => {
    const navItems = Array.from(document.querySelectorAll('.sidebar-link, .nav-link, [data-tab]'));
    const settingsNav = navItems.find(el => el.textContent.includes('Settings') || el.getAttribute('data-tab') === 'settings');
    if (settingsNav) settingsNav.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await pageDark.screenshot({ path: path.join(__dirname, 'shots', 'admin_settings_dark_aligned.png') });
  fs.copyFileSync(path.join(__dirname, 'shots', 'admin_settings_dark_aligned.png'), path.join(ARTIFACT_DIR, 'admin_settings_dark_aligned.png'));

  const tbDark = await pageDark.$('.topbar');
  if (tbDark) {
    await tbDark.screenshot({ path: path.join(ARTIFACT_DIR, 'topbar_dark_aligned.png') });
  }
  await pageDark.close();

  // Light capture topbar
  const pageLight = await browser.newPage();
  await pageLight.setViewport({ width: 1440, height: 900 });
  await pageLight.evaluateOnNewDocument(() => {
    localStorage.setItem('lib95:settings:data', JSON.stringify({ settings: { appearance: { theme: 'light' } } }));
    localStorage.setItem('token', 'mock_token');
    localStorage.setItem('user', JSON.stringify({ id: 1, role: 'owner', full_name: 'Owner' }));
  });
  await pageLight.goto('http://localhost:3000/pages/admin/admin.html', { waitUntil: 'networkidle2' });
  const tbLight = await pageLight.$('.topbar');
  if (tbLight) {
    await tbLight.screenshot({ path: path.join(ARTIFACT_DIR, 'topbar_light_aligned.png') });
  }
  await pageLight.close();

  await browser.close();
  console.log('Saved admin_settings_dark_aligned.png, topbar_dark_aligned.png, and topbar_light_aligned.png');
})();
