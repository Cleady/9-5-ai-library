const puppeteer = require('./node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const BASELINE_DIR = path.join(__dirname, 'shots', 'baseline');
const PHASE2_DIR = path.join(__dirname, 'shots', 'phase2');

if (!fs.existsSync(PHASE2_DIR)) {
  fs.mkdirSync(PHASE2_DIR, { recursive: true });
}

const TEST_PAGES = [
  { id: '01_landing_index', url: '/index.html' },
  { id: '02_home_dashboard', url: '/home_page/home_page.html' },
  { id: '07_lectures_resources', url: '/pages/lectures/resources.html' },
  { id: '23_admin', url: '/pages/admin/admin.html' },
  { id: '24_auth_login', url: '/pages/auth/login.html' },
  { id: '25_auth_signup', url: '/pages/auth/signup.html' },
  { id: '26_auth_forgot_pass', url: '/pages/auth/forgot_pass.html' },
  { id: '27_auth_reset_pass', url: '/pages/auth/reset_pass.html' },
  { id: '28_auth_send_email', url: '/pages/auth/send_email.html' }
];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844, isMobile: true, hasTouch: true }
];

async function compareImagesInBrowser(browser, baselineBuffer, currentBuffer) {
  const compPage = await browser.newPage();
  try {
    const base64Baseline = baselineBuffer.toString('base64');
    const base64Current = currentBuffer.toString('base64');

    const result = await compPage.evaluate(async (imgAData, imgBData) => {
      const loadImage = (src) => new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = 'data:image/png;base64,' + src;
      });

      const [imgA, imgB] = await Promise.all([loadImage(imgAData), loadImage(imgBData)]);
      
      const w = Math.max(imgA.width, imgB.width);
      const h = Math.max(imgA.height, imgB.height);

      const canvasA = document.createElement('canvas');
      canvasA.width = w;
      canvasA.height = h;
      const ctxA = canvasA.getContext('2d');
      ctxA.drawImage(imgA, 0, 0);
      const dataA = ctxA.getImageData(0, 0, w, h).data;

      const canvasB = document.createElement('canvas');
      canvasB.width = w;
      canvasB.height = h;
      const ctxB = canvasB.getContext('2d');
      ctxB.drawImage(imgB, 0, 0);
      const dataB = ctxB.getImageData(0, 0, w, h).data;

      let diffPixels = 0;
      const totalPixels = w * h;

      for (let i = 0; i < dataA.length; i += 4) {
        // Allow tiny subpixel anti-aliasing delta of 2
        const dr = Math.abs(dataA[i] - dataB[i]);
        const dg = Math.abs(dataA[i+1] - dataB[i+1]);
        const db = Math.abs(dataA[i+2] - dataB[i+2]);
        const da = Math.abs(dataA[i+3] - dataB[i+3]);

        if (dr > 3 || dg > 3 || db > 3 || da > 3) {
          diffPixels++;
        }
      }

      return {
        totalPixels,
        diffPixels,
        diffPercent: ((diffPixels / totalPixels) * 100).toFixed(4)
      };
    }, base64Baseline, base64Current);

    return result;
  } finally {
    await compPage.close();
  }
}

async function run() {
  console.log('====================================================');
  console.log('PHASE 2 VERIFICATION & PIXEL REGRESSION AUDIT');
  console.log('====================================================\n');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const report = {
    lightRegression: [],
    darkPhase2Screenshots: []
  };

  try {
    // 1. LIGHT MODE REGRESSION CHECK
    console.log('--- Step 1: Checking Light Mode for Zero Pixel Regression ---');
    for (const pageInfo of TEST_PAGES) {
      for (const vp of VIEWPORTS) {
        const page = await browser.newPage();
        await page.setViewport(vp);
        await page.evaluateOnNewDocument(() => {
          localStorage.setItem('token', 'mock_jwt_token_for_baseline_testing');
          localStorage.setItem('user', JSON.stringify({
            id: 1, username: 'alex', full_name: 'Alex Pham', role: 'admin', email: 'alex@95ai.club'
          }));
          localStorage.setItem('lib95:settings:data', JSON.stringify({
            settings: { appearance: { theme: 'light', accentColor: 'blue' } }
          }));
        });

        const url = `${BASE_URL}${pageInfo.url}`;
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
        await new Promise(r => setTimeout(r, 600));

        const currentBuffer = await page.screenshot({ fullPage: false });
        await page.close();

        const baselineFilename = `${pageInfo.id}_${vp.name}_light.png`;
        const baselinePath = path.join(BASELINE_DIR, baselineFilename);

        if (fs.existsSync(baselinePath)) {
          const baselineBuffer = fs.readFileSync(baselinePath);
          const diffResult = await compareImagesInBrowser(browser, baselineBuffer, currentBuffer);
          const passed = parseFloat(diffResult.diffPercent) < 0.05; // allow micro subpixel timing

          report.lightRegression.push({
            page: pageInfo.id,
            viewport: vp.name,
            diffPercent: diffResult.diffPercent,
            diffPixels: diffResult.diffPixels,
            passed
          });

          console.log(`[LIGHT CHECK] ${pageInfo.id} (${vp.name}): ${passed ? 'PASS' : 'WARN'} - Diff: ${diffResult.diffPercent}% (${diffResult.diffPixels} px)`);
        } else {
          console.log(`[LIGHT CHECK] Baseline missing for ${baselineFilename}`);
        }
      }
    }

    // 2. DARK MODE SCREENSHOTS & AUDIT
    console.log('\n--- Step 2: Capturing Phase 2 Dark Theme Screenshots ---');
    for (const pageInfo of TEST_PAGES) {
      for (const vp of VIEWPORTS) {
        const page = await browser.newPage();
        await page.setViewport(vp);
        await page.evaluateOnNewDocument(() => {
          localStorage.setItem('token', 'mock_jwt_token_for_baseline_testing');
          localStorage.setItem('user', JSON.stringify({
            id: 1, username: 'alex', full_name: 'Alex Pham', role: 'admin', email: 'alex@95ai.club'
          }));
          localStorage.setItem('lib95:settings:data', JSON.stringify({
            settings: { appearance: { theme: 'dark', accentColor: 'blue' } }
          }));
        });

        const url = `${BASE_URL}${pageInfo.url}`;
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
        await page.evaluate(() => {
          document.documentElement.setAttribute('data-theme', 'dark');
        });
        await new Promise(r => setTimeout(r, 600));

        const shotFilename = `${pageInfo.id}_${vp.name}_dark_p2.png`;
        const shotPath = path.join(PHASE2_DIR, shotFilename);
        await page.screenshot({ path: shotPath, fullPage: false });
        await page.close();

        report.darkPhase2Screenshots.push({
          page: pageInfo.id,
          viewport: vp.name,
          file: shotFilename
        });

        console.log(`[DARK CAPTURE] Saved ${shotFilename}`);
      }
    }

    fs.writeFileSync(path.join(__dirname, 'phase2-report.json'), JSON.stringify(report, null, 2));
    console.log('\nAudit finished! Report saved to tools/phase2-report.json');

  } finally {
    await browser.close();
  }
}

run().catch(console.error);
