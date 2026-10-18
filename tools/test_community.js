const puppeteer = require('./node_modules/puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const pagesToTest = [
    { name: 'community_feed', url: 'http://localhost:3000/pages/community/community-feed.html' },
    { name: 'community_discussions', url: 'http://localhost:3000/pages/community/community-discussions.html' },
    { name: 'community_leaderboard', url: 'http://localhost:3000/pages/community/community-leaderboard.html' }
  ];

  for (const item of pagesToTest) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('token', 'mock_jwt_token_for_baseline_testing');
      localStorage.setItem('user', JSON.stringify({
        id: 1, username: 'alex', full_name: 'Alex Pham', role: 'admin', email: 'alex@95ai.club'
      }));
      localStorage.setItem('lib95:settings:data', JSON.stringify({
        settings: { appearance: { theme: 'dark', accentColor: 'blue' } }
      }));
    });

    await page.setRequestInterception(true);
    page.on('request', req => {
      const url = req.url();
      if (url.includes('/api/auth/me') || url.includes('/api/community')) {
        req.respond({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, data: [] })
        });
      } else {
        req.continue();
      }
    });

    try {
      await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 15000 });
      await new Promise(r => setTimeout(r, 600));
      const outPath = path.join(__dirname, 'shots', 'phase2', `test_${item.name}_dark.png`);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`Saved screenshot: ${outPath}`);
    } catch (e) {
      console.error(`Error on ${item.name}:`, e.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('Done testing community pages.');
})();
