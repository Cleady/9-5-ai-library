const puppeteer = require('./node_modules/puppeteer-core');

const BASE_URL = 'http://localhost:3000';

async function testPageFOUC(pageUrl, pageName) {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Pre-seed localStorage with Dark Theme
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('lib95:settings:data', JSON.stringify({
      settings: {
        appearance: {
          theme: 'dark',
          accentColor: 'blue',
          fontSize: 'medium',
          backgroundStyle: 'default'
        }
      }
    }));
  });

  let initialThemeAttr = null;
  let initialBodyBg = null;
  let initialHtmlBg = null;

  // Listen to document created / response
  page.on('domcontentloaded', async () => {
    try {
      const state = await page.evaluate(() => {
        const html = document.documentElement;
        const body = document.body;
        return {
          hasThemeAttr: html.hasAttribute('data-theme'),
          themeAttr: html.getAttribute('data-theme'),
          htmlBg: html ? window.getComputedStyle(html).backgroundColor : null,
          bodyBg: body ? window.getComputedStyle(body).backgroundColor : null
        };
      });
      initialThemeAttr = state.themeAttr;
      initialBodyBg = state.bodyBg;
      initialHtmlBg = state.htmlBg;
    } catch (e) {
      // Ignored if evaluating too early
    }
  });

  await page.goto(`${BASE_URL}${pageUrl}`, { waitUntil: 'load' });

  // Final state
  const finalState = await page.evaluate(() => {
    const html = document.documentElement;
    const body = document.body;
    return {
      hasThemeAttr: html.hasAttribute('data-theme'),
      themeAttr: html.getAttribute('data-theme'),
      htmlBg: html ? window.getComputedStyle(html).backgroundColor : null,
      bodyBg: body ? window.getComputedStyle(body).backgroundColor : null
    };
  });

  await browser.close();

  const isFoucProtected = initialThemeAttr === 'dark' || finalState.themeAttr === 'dark';
  const hasFlash = initialThemeAttr !== 'dark' && finalState.themeAttr !== 'dark';

  return {
    pageName,
    pageUrl,
    initialThemeAttr,
    initialBodyBg,
    finalThemeAttr: finalState.themeAttr,
    finalBodyBg: finalState.bodyBg,
    hasFlash,
    verdict: initialThemeAttr === 'dark' 
      ? 'KHÔNG CHỚP SÁNG (An toàn - theme-init.js gắn data-theme trước khi render)' 
      : 'BỊ CHỚP SÁNG / KHÔNG CÓ DARK (Vỡ - render nền sáng trước, hoặc hoàn toàn không dark)'
  };
}

async function run() {
  console.log('=== KIỂM TRA HIỆN TƯỢNG NHÁY GIAO DIỆN (FOUC) KHI MỞ TRANG Ở DARK THEME ===\n');

  // Test 1: Page with theme-init.js
  const pageWithInit = await testPageFOUC('/pages/lectures/lectures.html', 'Lectures Page (Có theme-init.js)');
  console.log(`1. [${pageWithInit.pageName}]`);
  console.log(`   - data-theme tại DOMContentLoaded: "${pageWithInit.initialThemeAttr}"`);
  console.log(`   - Màu nền body ban đầu: ${pageWithInit.initialBodyBg}`);
  console.log(`   - Đánh giá: ${pageWithInit.verdict}\n`);

  // Test 2: Auth page without theme-init.js
  const pageWithoutInit = await testPageFOUC('/pages/auth/login.html', 'Login Page (Chưa có theme-init.js)');
  console.log(`2. [${pageWithoutInit.pageName}]`);
  console.log(`   - data-theme tại DOMContentLoaded: "${pageWithoutInit.initialThemeAttr}"`);
  console.log(`   - Màu nền body ban đầu: ${pageWithoutInit.initialBodyBg}`);
  console.log(`   - Đánh giá: ${pageWithoutInit.verdict}\n`);

  // Test 3: Dashboard home_page.html
  const dashboardPage = await testPageFOUC('/home_page/home_page.html', 'Dashboard (Có theme-init.js)');
  console.log(`3. [${dashboardPage.pageName}]`);
  console.log(`   - data-theme tại DOMContentLoaded: "${dashboardPage.initialThemeAttr}"`);
  console.log(`   - Màu nền body ban đầu: ${dashboardPage.initialBodyBg}`);
  console.log(`   - Đánh giá: ${dashboardPage.verdict}\n`);
}

run().catch(console.error);
