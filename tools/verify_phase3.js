const puppeteer = require('./node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASELINE_DIR = path.join(__dirname, 'shots', 'baseline');
const AFTER_DIR = path.join(__dirname, 'shots', 'phase3_after');

if (!fs.existsSync(AFTER_DIR)) {
  fs.mkdirSync(AFTER_DIR, { recursive: true });
}

async function verifyPhase3() {
  console.log('--- STARTING PHASE 3 VERIFICATION ---');

  // 1. Authenticate and get token
  let token = 'mock_token';
  let ownerUser = {
    id: 1,
    username: 'owner95aiclub@internal.edu.vn',
    full_name: 'Alex Pham',
    role: 'owner',
    email: 'owner95aiclub@internal.edu.vn',
    avatar_url: '/assets/icon/cool_book.png'
  };

  try {
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'owner95aiclub@internal.edu.vn', password: 'owner1234' })
    });
    if (loginRes.ok) {
      const data = await loginRes.json();
      token = data.token;
      if (data.user) ownerUser = data.user;
      console.log('Login successful.');
    }
  } catch (e) {
    console.log('Login error:', e.message);
  }

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const setupAuth = async (page, theme = 'dark') => {
    await page.evaluateOnNewDocument((tk, u, th) => {
      localStorage.setItem('token', tk);
      localStorage.setItem('user', JSON.stringify(u));
      localStorage.setItem('lib95:settings:data', JSON.stringify({
        settings: { appearance: { theme: th, accentColor: 'blue', fontSize: 'medium' } }
      }));
    }, token, ownerUser, theme);
  };

  // --- PART 1: MEASURE 7 SPECIFIC ISSUES ---
  console.log('Measuring the 7 fixed issues in Dark theme...');
  const measured = {};

  // Issue 1: Topbar
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await setupAuth(page, 'dark');
    await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 600));

    measured.issue1_admin_topbar = await page.evaluate(() => {
      const tb = document.querySelector('.topbar');
      const cs = window.getComputedStyle(tb);
      return {
        backgroundColor: cs.backgroundColor,
        backdropFilter: cs.backdropFilter || cs.webkitBackdropFilter || 'none',
        borderRadius: cs.borderRadius,
        padding: cs.padding
      };
    });

    await page.goto(`${BASE_URL}/pages/lectures/resources.html`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 600));

    measured.issue1_resources_topbar = await page.evaluate(() => {
      const tb = document.querySelector('.topbar');
      const cs = window.getComputedStyle(tb);
      return {
        backgroundColor: cs.backgroundColor,
        backdropFilter: cs.backdropFilter || cs.webkitBackdropFilter || 'none',
        borderRadius: cs.borderRadius,
        padding: cs.padding
      };
    });
    await page.close();
  }

  // Issue 2: Admin LMS Course code
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await setupAuth(page, 'dark');
    await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 600));

    // Switch to LMS tab
    await page.evaluate(() => {
      const lmsNav = Array.from(document.querySelectorAll('.admin-sidebar a, .admin-sidebar button, [data-tab], .sidebar-nav-item, .sidebar-item')).find(el => el.textContent.includes('LMS') || el.getAttribute('data-tab') === 'lms');
      if (lmsNav) lmsNav.click();
    });
    await new Promise(r => setTimeout(r, 800));

    measured.issue2_lms_course_code = await page.evaluate(() => {
      function parseRgb(c) {
        const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        return m ? [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])] : [0,0,0];
      }
      function lum(r,g,b) {
        const a = [r,g,b].map(v => {
          v /= 255;
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0]*0.2126 + a[1]*0.7152 + a[2]*0.0722;
      }
      function contrast(c1, c2) {
        const l1 = lum(c1[0], c1[1], c1[2]);
        const l2 = lum(c2[0], c2[1], c2[2]);
        return (Math.max(l1,l2) + 0.05) / (Math.min(l1,l2) + 0.05);
      }

      const el = document.querySelector('.lms-course-code');
      if (!el) return { error: 'Not found .lms-course-code' };
      const cs = window.getComputedStyle(el);
      const fg = parseRgb(cs.color);
      const bg = [3, 7, 18];
      return {
        text: el.textContent.trim(),
        color: cs.color,
        contrast: Math.round(contrast(fg, bg) * 100) / 100
      };
    });
    await page.close();
  }

  // Issue 3: Admin controls
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await setupAuth(page, 'dark');
    await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 600));

    measured.issue3_controls = await page.evaluate(() => {
      const res = {};
      const secBtn = document.querySelector('.button-secondary');
      if (secBtn) {
        const cs = window.getComputedStyle(secBtn);
        res.secondaryBtn = {
          text: secBtn.textContent.trim(),
          backgroundColor: cs.backgroundColor,
          color: cs.color,
          border: cs.border
        };
      }
      const inlineInput = document.querySelector('.inline-tool input');
      if (inlineInput) {
        const cs = window.getComputedStyle(inlineInput);
        res.inlineInput = {
          backgroundColor: cs.backgroundColor,
          color: cs.color
        };
      }
      const videoBar = document.querySelector('#lms-lec-video-detected');
      if (videoBar) {
        const cs = window.getComputedStyle(videoBar);
        res.videoBar = {
          backgroundColor: cs.backgroundColor,
          color: cs.color
        };
      }
      const dropzoneCircle = document.querySelector('#lms-video-upload-empty > div:first-child');
      if (dropzoneCircle) {
        const cs = window.getComputedStyle(dropzoneCircle);
        res.dropzoneCircle = {
          backgroundColor: cs.backgroundColor,
          border: cs.border
        };
      }
      return res;
    });
    await page.close();
  }

  // Issue 4: Role badge Owner
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await setupAuth(page, 'dark');
    await page.goto(`${BASE_URL}/pages/lectures/resources.html`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 600));

    measured.issue4_role_badge_owner = await page.evaluate(() => {
      const badge = document.querySelector('.user-role-badge, .role-badge');
      if (!badge) return null;
      const cs = window.getComputedStyle(badge);
      return {
        text: badge.textContent.trim(),
        backgroundColor: cs.backgroundColor,
        color: cs.color,
        border: cs.border
      };
    });
    await page.close();
  }

  // Issue 5: Sidebar active item
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await setupAuth(page, 'dark');

    await page.goto(`${BASE_URL}/pages/lectures/resources.html`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 600));
    measured.issue5_style_active = await page.evaluate(() => {
      const el = document.querySelector('.nav-link.is-active, .sidebar-nav-item.active');
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      return {
        background: cs.background,
        color: cs.color,
        border: cs.border
      };
    });

    await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 600));
    measured.issue5_admin_active = await page.evaluate(() => {
      const el = document.querySelector('.nav-link.is-active, .sidebar-link.is-active');
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      return {
        background: cs.background,
        color: cs.color,
        border: cs.border
      };
    });
    await page.close();
  }

  // Issue 6: Muted text contrast
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await setupAuth(page, 'dark');
    await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 600));

    measured.issue6_muted = await page.evaluate(() => {
      function parseRgb(c) {
        const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        return m ? [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])] : [0,0,0];
      }
      function lum(r,g,b) {
        const a = [r,g,b].map(v => {
          v /= 255;
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0]*0.2126 + a[1]*0.7152 + a[2]*0.0722;
      }
      function contrast(c1, c2) {
        const l1 = lum(c1[0], c1[1], c1[2]);
        const l2 = lum(c2[0], c2[1], c2[2]);
        return (Math.max(l1,l2) + 0.05) / (Math.min(l1,l2) + 0.05);
      }

      const footer = document.querySelector('.admin-footer');
      const csF = footer ? window.getComputedStyle(footer) : null;
      const bg = [3, 7, 18];

      return {
        footer: csF ? {
          color: csF.color,
          contrast: Math.round(contrast(parseRgb(csF.color), bg) * 100) / 100
        } : null
      };
    });
    await page.close();
  }

  // Issue 7: Slogan text
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await setupAuth(page, 'dark');
    await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle2' });
    measured.issue7_admin_slogan = await page.evaluate(() => {
      const el = document.querySelector('.sidebar-promo p');
      return el ? el.textContent.trim() : null;
    });
    await page.close();
  }

  fs.writeFileSync(path.join(__dirname, 'phase3_7_issues_result.json'), JSON.stringify(measured, null, 2));
  console.log('7 issues measurement complete.');

  // --- PART 2: LIGHT THEME REGRESSION AUDIT (IN-BROWSER CANVAS 0 DIFF CHECK) ---
  console.log('\nRunning Light Theme Pixel Diff Audit across 28 pages against Baseline...');
  const PAGES = [
    { id: '01_landing_index', url: '/index.html' },
    { id: '02_home_dashboard', url: '/home_page/home_page.html' },
    { id: '03_lectures_list', url: '/pages/lectures/lectures.html' },
    { id: '04_lectures_subject', url: '/pages/lectures/subject.html' },
    { id: '05_lectures_lecture', url: '/pages/lectures/lecture.html' },
    { id: '06_lectures_next', url: '/pages/lectures/next-lectures.html' },
    { id: '07_lectures_resources', url: '/pages/lectures/resources.html' },
    { id: '08_practice_list', url: '/pages/practice/practice.html' },
    { id: '09_practice_subject', url: '/pages/practice/practice-subject.html' },
    { id: '10_practice_quiz_intro', url: '/pages/practice/practice-quiz-intro.html' },
    { id: '11_practice_quiz', url: '/pages/practice/practice-quiz.html' },
    { id: '12_practice_result', url: '/pages/practice/practice-result.html' },
    { id: '13_history', url: '/pages/history.html' },
    { id: '14_favorites', url: '/pages/favorites.html' },
    { id: '15_community_feed', url: '/pages/community/community-feed.html' },
    { id: '16_community_discussions', url: '/pages/community/community-discussions.html' },
    { id: '17_community_detail', url: '/pages/community/discussion-detail.html' },
    { id: '18_community_groups', url: '/pages/community/community-groups.html' },
    { id: '19_community_leaderboard', url: '/pages/community/community-leaderboard.html' },
    { id: '20_community_notifications', url: '/pages/community/community-notifications.html' },
    { id: '21_community_search', url: '/pages/community/community-search.html' },
    { id: '22_settings', url: '/pages/settings/settings.html' },
    { id: '23_admin', url: '/pages/admin/admin.html' },
    { id: '24_auth_login', url: '/pages/auth/login.html' },
    { id: '25_auth_signup', url: '/pages/auth/signup.html' },
    { id: '26_auth_forgot_pass', url: '/pages/auth/forgot_pass.html' },
    { id: '27_auth_reset_pass', url: '/pages/auth/reset_pass.html' },
    { id: '28_auth_send_email', url: '/pages/auth/send_email.html' }
  ];

  const diffReport = [];
  let totalDiffPixels = 0;

  for (const p of PAGES) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await setupAuth(page, 'light');

    try {
      await page.goto(`${BASE_URL}${p.url}`, { waitUntil: 'networkidle2', timeout: 15000 });
      await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
      await new Promise(r => setTimeout(r, 600));

      const currentShotBuffer = await page.screenshot();
      const baselinePath = path.join(BASELINE_DIR, `${p.id}_desktop_light.png`);

      if (fs.existsSync(baselinePath)) {
        const baselineBuffer = fs.readFileSync(baselinePath);

        const diffResult = await page.evaluate(async (b64Base, b64Curr) => {
          function loadImage(src) {
            return new Promise((res, rej) => {
              const img = new Image();
              img.onload = () => res(img);
              img.onerror = rej;
              img.src = src;
            });
          }

          const imgA = await loadImage('data:image/png;base64,' + b64Base);
          const imgB = await loadImage('data:image/png;base64,' + b64Curr);

          const w = Math.min(imgA.width, imgB.width);
          const h = Math.min(imgA.height, imgB.height);

          const cA = document.createElement('canvas');
          cA.width = w; cA.height = h;
          const ctxA = cA.getContext('2d');
          ctxA.drawImage(imgA, 0, 0);
          const dA = ctxA.getImageData(0, 0, w, h).data;

          const cB = document.createElement('canvas');
          cB.width = w; cB.height = h;
          const ctxB = cB.getContext('2d');
          ctxB.drawImage(imgB, 0, 0);
          const dB = ctxB.getImageData(0, 0, w, h).data;

          let diffCount = 0;
          for (let i = 0; i < dA.length; i += 4) {
            const dr = Math.abs(dA[i] - dB[i]);
            const dg = Math.abs(dA[i+1] - dB[i+1]);
            const db = Math.abs(dA[i+2] - dB[i+2]);
            const da = Math.abs(dA[i+3] - dB[i+3]);
            if (dr > 3 || dg > 3 || db > 3 || da > 3) {
              diffCount++;
            }
          }
          return { totalPixels: w * h, diffPixels: diffCount };
        }, baselineBuffer.toString('base64'), currentShotBuffer.toString('base64'));

        diffReport.push({ page: p.id, diffPixels: diffResult.diffPixels });
        totalDiffPixels += diffResult.diffPixels;
        console.log(`[LIGHT AUDIT] ${p.id}: ${diffResult.diffPixels} diff pixels`);
      } else {
        console.log(`[LIGHT AUDIT] ${p.id}: Baseline not found`);
      }
    } catch (e) {
      console.log(`[LIGHT AUDIT] ${p.id} error:`, e.message);
    } finally {
      await page.close();
    }
  }

  console.log(`\nTOTAL LIGHT DIFF PIXELS ACROSS ALL PAGES: ${totalDiffPixels}`);
  fs.writeFileSync(path.join(__dirname, 'phase3_light_diff_report.json'), JSON.stringify({ totalDiffPixels, pages: diffReport }, null, 2));

  // --- PART 3: CAPTURE KEY PAGES BEFORE & AFTER DARK ---
  console.log('\nCapturing Dark Theme screenshots (Desktop & Mobile) of key pages...');
  const keyPages = [
    { id: 'admin', url: '/pages/admin/admin.html' },
    { id: 'resources', url: '/pages/lectures/resources.html' },
    { id: 'lecture', url: '/pages/lectures/lecture.html' },
    { id: 'community_search', url: '/pages/community/community-search.html' },
    { id: 'index', url: '/index.html' }
  ];

  const artifactDir = 'C:\\Users\\anhqu\\.gemini\\antigravity\\brain\\017b0809-a52b-4747-be93-fb4c154854d2';

  for (const kp of keyPages) {
    // Desktop 1440
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await setupAuth(page, 'dark');
      await page.goto(`${BASE_URL}${kp.url}`, { waitUntil: 'networkidle2' });
      await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
      await new Promise(r => setTimeout(r, 600));

      const shotPath = path.join(AFTER_DIR, `phase3_dark_1440_${kp.id}.png`);
      await page.screenshot({ path: shotPath });
      fs.copyFileSync(shotPath, path.join(artifactDir, `phase3_dark_1440_${kp.id}.png`));
      await page.close();
    }

    // Mobile 390
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
      await setupAuth(page, 'dark');
      await page.goto(`${BASE_URL}${kp.url}`, { waitUntil: 'networkidle2' });
      await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
      await new Promise(r => setTimeout(r, 600));

      const shotPath = path.join(AFTER_DIR, `phase3_dark_390_${kp.id}.png`);
      await page.screenshot({ path: shotPath });
      fs.copyFileSync(shotPath, path.join(artifactDir, `phase3_dark_390_${kp.id}.png`));
      await page.close();
    }
  }

  // Update theme-gallery captures as well
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/tools/theme-gallery.html`, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));

    const gShot1 = path.join(__dirname, 'shots', 'theme_gallery_after_topbar.png');
    await page.screenshot({ path: gShot1 });
    fs.copyFileSync(gShot1, path.join(artifactDir, 'theme_gallery_after_topbar.png'));

    await page.evaluate(() => {
      document.getElementById('frame-light').contentWindow.scrollTo(0, 1100);
      document.getElementById('frame-dark').contentWindow.scrollTo(0, 1100);
    });
    await new Promise(r => setTimeout(r, 600));

    const gShot2 = path.join(__dirname, 'shots', 'theme_gallery_after_inputs_tables.png');
    await page.screenshot({ path: gShot2 });
    fs.copyFileSync(gShot2, path.join(artifactDir, 'theme_gallery_after_inputs_tables.png'));

    await page.close();
  }

  await browser.close();
  console.log('--- PHASE 3 VERIFICATION COMPLETED ---');
}

verifyPhase3().catch(err => {
  console.error(err);
  process.exit(1);
});
