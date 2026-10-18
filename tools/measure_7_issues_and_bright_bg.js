const puppeteer = require('./node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runAudit() {
  console.log('Fetching real auth token from API...');
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
      console.log('Login successful, token acquired.');
    } else {
      console.log('Login status not OK:', loginRes.status);
    }
  } catch (e) {
    console.log('Login fetch error:', e.message);
  }

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const report = {
    issue1_topbar_scroll: {},
    issue2_lms_course_code: {},
    issue3_admin_controls: {},
    issue4_role_badge_owner: {},
    issue5_sidebar_active: {},
    issue6_muted_text: {},
    issue7_sidebar_banner: {},
    bright_bg_by_page: {},
  };

  const setupAuth = async (page, theme = 'dark') => {
    await page.evaluateOnNewDocument((tk, u, th) => {
      localStorage.setItem('token', tk);
      localStorage.setItem('user', JSON.stringify(u));
      localStorage.setItem('lib95:settings:data', JSON.stringify({
        settings: { appearance: { theme: th, accentColor: 'blue', fontSize: 'medium' } }
      }));
    }, token, ownerUser, theme);
  };

  // 1. Issue 1: Topbar scroll & transparency on Admin and standard pages
  console.log('Measuring Issue 1: Topbar scroll & transparency...');
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await setupAuth(page, 'dark');
    await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 600));

    const adminTopbar = await page.evaluate(() => {
      const tb = document.querySelector('.topbar');
      if (!tb) return { error: 'topbar not found' };
      const cs = window.getComputedStyle(tb);
      return {
        background: cs.background,
        backgroundColor: cs.backgroundColor,
        backdropFilter: cs.backdropFilter || cs.webkitBackdropFilter || 'none',
        position: cs.position,
        borderBottom: cs.borderBottom,
        boxShadow: cs.boxShadow
      };
    });

    // Check resources topbar
    await page.goto(`${BASE_URL}/pages/lectures/resources.html`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 600));

    const resTopbar = await page.evaluate(() => {
      const tb = document.querySelector('.topbar');
      if (!tb) return { error: 'topbar not found' };
      const cs = window.getComputedStyle(tb);
      return {
        background: cs.background,
        backgroundColor: cs.backgroundColor,
        backdropFilter: cs.backdropFilter || cs.webkitBackdropFilter || 'none',
        position: cs.position,
        borderBottom: cs.borderBottom,
        boxShadow: cs.boxShadow
      };
    });

    // Scroll test on resources
    await page.evaluate(() => window.scrollBy(0, 500));
    await new Promise(r => setTimeout(r, 300));
    const scrolledTopbar = await page.evaluate(() => {
      const tb = document.querySelector('.topbar');
      if (!tb) return { error: 'topbar not found after scroll' };
      const cs = window.getComputedStyle(tb);
      return {
        scrollY: window.scrollY,
        backgroundColor: cs.backgroundColor,
        backdropFilter: cs.backdropFilter || cs.webkitBackdropFilter || 'none'
      };
    });

    report.issue1_topbar_scroll = {
      admin: adminTopbar,
      resources: resTopbar,
      scrolledResources: scrolledTopbar
    };
    await page.close();
  }

  // 2. Issue 2: Admin LMS Course code column (CEA201, DBI202T)
  console.log('Measuring Issue 2: Admin LMS course code contrast...');
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await setupAuth(page, 'dark');
    await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 600));

    // Switch to LMS tab if present
    await page.evaluate(() => {
      const lmsNav = Array.from(document.querySelectorAll('.admin-sidebar a, .admin-sidebar button, [data-tab], .sidebar-nav-item, .sidebar-item')).find(el => el.textContent.includes('LMS') || el.getAttribute('data-tab') === 'lms');
      if (lmsNav) lmsNav.click();
    });
    await new Promise(r => setTimeout(r, 800));

    const lmsCodes = await page.evaluate(() => {
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

      const spans = Array.from(document.querySelectorAll('#lms-courses-tbody td span, #lms-courses-tbody td strong, td[data-col="code"], td'));
      const results = [];
      for (const td of spans) {
        const text = td.textContent.trim();
        if (text.match(/^[A-Z]{3}\d{3}[A-Z]?$/)) {
          const cs = window.getComputedStyle(td);
          const fg = parseRgb(cs.color);
          const bg = [3, 7, 18]; // default page dark bg
          results.push({
            code: text,
            inlineStyle: td.getAttribute('style') || '',
            color: cs.color,
            fontSize: cs.fontSize,
            fontWeight: cs.fontWeight,
            contrastVsDarkBg: Math.round(contrast(fg, bg) * 100) / 100
          });
        }
      }
      return results;
    });

    report.issue2_lms_course_code = lmsCodes;
    await page.close();
  }

  // 3. Issue 3: Admin controls
  console.log('Measuring Issue 3: Admin controls (selects, inputs, dropzone, unban)...');
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await setupAuth(page, 'dark');
    await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 600));

    const controls = await page.evaluate(() => {
      const res = {};
      const selectAllRoles = document.querySelector('select[name="roleFilter"], #user-filter-role, select[style*="rgba"], .admin-filter select');
      if (selectAllRoles) {
        const cs = window.getComputedStyle(selectAllRoles);
        res.selectAllRoles = {
          tag: selectAllRoles.tagName,
          inlineStyle: selectAllRoles.getAttribute('style'),
          backgroundColor: cs.backgroundColor,
          color: cs.color,
          border: cs.border
        };
      }

      const inlineSelectRole = document.querySelector('.inline-tool select');
      if (inlineSelectRole) {
        const cs = window.getComputedStyle(inlineSelectRole);
        res.inlineSelectRole = {
          selector: '.inline-tool select',
          backgroundColor: cs.backgroundColor,
          color: cs.color,
          fontSize: cs.fontSize
        };
      }

      const inlineInput = document.querySelector('.inline-tool input');
      if (inlineInput) {
        const cs = window.getComputedStyle(inlineInput);
        res.inlineInput = {
          selector: '.inline-tool input',
          placeholder: inlineInput.placeholder,
          backgroundColor: cs.backgroundColor,
          color: cs.color,
          fontSize: cs.fontSize
        };
      }

      const videoDetectedBar = document.querySelector('#lms-lec-video-detected, [id*="video-detected"]');
      if (videoDetectedBar) {
        const cs = window.getComputedStyle(videoDetectedBar);
        res.videoDetectedBar = {
          id: videoDetectedBar.id,
          inlineStyle: videoDetectedBar.getAttribute('style'),
          backgroundColor: cs.backgroundColor,
          color: cs.color
        };
      }

      const courseFilterSelect = document.querySelector('#lms-course-filter-select');
      if (courseFilterSelect) {
        const cs = window.getComputedStyle(courseFilterSelect);
        res.courseFilterSelect = {
          id: courseFilterSelect.id,
          backgroundColor: cs.backgroundColor,
          color: cs.color,
          border: cs.border
        };
      }

      const allSecondaryBtns = Array.from(document.querySelectorAll('.button-secondary, .btn-secondary')).map(btn => {
        const cs = window.getComputedStyle(btn);
        return {
          text: btn.textContent.trim(),
          backgroundColor: cs.backgroundColor,
          color: cs.color,
          border: cs.border
        };
      });
      res.secondaryButtons = allSecondaryBtns;

      const dropzoneFolderCircle = document.querySelector('#lms-lec-dropzone div[style*="background"], .dropzone div[style*="background"], #lms-lec-dropzone div');
      if (dropzoneFolderCircle) {
        const cs = window.getComputedStyle(dropzoneFolderCircle);
        res.dropzoneFolderCircle = {
          inlineStyle: dropzoneFolderCircle.getAttribute('style'),
          textContent: dropzoneFolderCircle.textContent.trim(),
          backgroundColor: cs.backgroundColor,
          borderRadius: cs.borderRadius
        };
      }

      return res;
    });

    report.issue3_admin_controls = controls;
    await page.close();
  }

  // 4. Issue 4: Role badge Owner
  console.log('Measuring Issue 4: Role badge Owner color comparison...');
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await setupAuth(page, 'dark');

    // Resources page role badge in user-menu
    await page.goto(`${BASE_URL}/pages/lectures/resources.html`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 600));

    const resBadge = await page.evaluate(() => {
      const badge = document.querySelector('.user-role-badge, .role-badge, .user-badge');
      if (!badge) return null;
      const cs = window.getComputedStyle(badge);
      return {
        text: badge.textContent.trim(),
        inlineStyle: badge.getAttribute('style'),
        backgroundColor: cs.backgroundColor,
        color: cs.color,
        border: cs.border
      };
    });

    // Admin page role badge in user-menu & table
    await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 600));

    const adminBadges = await page.evaluate(() => {
      const topBadge = document.querySelector('.user-role-badge, .role-badge, .user-badge');
      const tableBadges = Array.from(document.querySelectorAll('.badge, .role-badge, [class*="badge"], td span')).map(b => {
        const cs = window.getComputedStyle(b);
        return {
          selector: b.className,
          text: b.textContent.trim(),
          inlineStyle: b.getAttribute('style'),
          backgroundColor: cs.backgroundColor,
          color: cs.color
        };
      }).filter(b => b.text.toLowerCase() === 'owner' || b.text.toLowerCase() === 'admin');

      const csTop = topBadge ? window.getComputedStyle(topBadge) : null;
      return {
        topbarBadge: topBadge ? {
          text: topBadge.textContent.trim(),
          inlineStyle: topBadge.getAttribute('style'),
          backgroundColor: csTop.backgroundColor,
          color: csTop.color,
          border: csTop.border
        } : null,
        tableBadges
      };
    });

    report.issue4_role_badge_owner = {
      standardPageUserMenu: resBadge,
      adminPage: adminBadges
    };
    await page.close();
  }

  // 5. Issue 5: Sidebar active item comparison (style.css vs admin.css)
  console.log('Measuring Issue 5: Sidebar active item comparison...');
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await setupAuth(page, 'dark');

    // Resources sidebar active item (style.css)
    await page.goto(`${BASE_URL}/pages/lectures/resources.html`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 600));

    const styleActive = await page.evaluate(() => {
      const activeItem = document.querySelector('.sidebar-nav-item.active, .sidebar-menu-link.active, .nav-item.active, .sidebar-item.active');
      if (!activeItem) return null;
      const cs = window.getComputedStyle(activeItem);
      return {
        tag: activeItem.tagName,
        className: activeItem.className,
        background: cs.background,
        backgroundColor: cs.backgroundColor,
        backgroundImage: cs.backgroundImage,
        border: cs.border,
        borderColor: cs.borderColor,
        borderRadius: cs.borderRadius,
        color: cs.color,
        boxShadow: cs.boxShadow
      };
    });

    // Admin sidebar active item (admin.css)
    await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 600));

    const adminActive = await page.evaluate(() => {
      const activeItem = document.querySelector('.sidebar-nav-item.active, .sidebar-item.active, .admin-sidebar .active');
      if (!activeItem) return null;
      const cs = window.getComputedStyle(activeItem);
      return {
        tag: activeItem.tagName,
        className: activeItem.className,
        background: cs.background,
        backgroundColor: cs.backgroundColor,
        backgroundImage: cs.backgroundImage,
        border: cs.border,
        borderColor: cs.borderColor,
        borderRadius: cs.borderRadius,
        color: cs.color,
        boxShadow: cs.boxShadow
      };
    });

    report.issue5_sidebar_active = {
      standardPage_styleCss: styleActive,
      adminPage_adminCss: adminActive
    };
    await page.close();
  }

  // 6. Issue 6: Muted text contrast (Footer, (You), Done)
  console.log('Measuring Issue 6: Muted text contrast...');
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await setupAuth(page, 'dark');
    await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 600));

    const mutedItems = await page.evaluate(() => {
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

      const res = {};
      const footer = document.querySelector('.admin-footer, footer');
      if (footer) {
        const cs = window.getComputedStyle(footer);
        const fg = parseRgb(cs.color);
        const bg = [3, 7, 18]; // default dark bg
        res.adminFooter = {
          color: cs.color,
          fontSize: cs.fontSize,
          contrast: Math.round(contrast(fg, bg) * 100) / 100
        };
      }

      // Find (You) text
      const allSpans = Array.from(document.querySelectorAll('span, small, td, p'));
      const youEl = allSpans.find(s => s.textContent.includes('(You)'));
      if (youEl) {
        const cs = window.getComputedStyle(youEl);
        const fg = parseRgb(cs.color);
        const bg = [3, 7, 18];
        res.youLabel = {
          inlineStyle: youEl.getAttribute('style'),
          color: cs.color,
          contrast: Math.round(contrast(fg, bg) * 100) / 100
        };
      }

      // Find Done status
      const doneEl = allSpans.find(s => s.textContent.trim() === 'Done');
      if (doneEl) {
        const cs = window.getComputedStyle(doneEl);
        const fg = parseRgb(cs.color);
        const bg = [3, 7, 18];
        res.doneStatus = {
          inlineStyle: doneEl.getAttribute('style'),
          color: cs.color,
          contrast: Math.round(contrast(fg, bg) * 100) / 100
        };
      }

      return res;
    });

    report.issue6_muted_text = mutedItems;
    await page.close();
  }

  // 7. Issue 7: Sidebar banner text
  console.log('Measuring Issue 7: Sidebar promo banners...');
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await setupAuth(page, 'dark');

    await page.goto(`${BASE_URL}/pages/lectures/resources.html`, { waitUntil: 'networkidle2' });
    const resPromo = await page.evaluate(() => {
      const promo = document.querySelector('.sidebar-promo, .promo-card');
      return promo ? promo.innerText.trim() : 'NONE';
    });

    await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle2' });
    const adminPromo = await page.evaluate(() => {
      const promo = document.querySelector('.sidebar-promo, .promo-card');
      return promo ? promo.innerText.trim() : 'NONE';
    });

    report.issue7_sidebar_banner = {
      standardPage_resources: resPromo,
      adminPage: adminPromo
    };
    await page.close();
  }

  // 8. Scan for bright/white backgrounds across all 28 pages in Dark mode
  console.log('Scanning for bright/white backgrounds across all 28 pages in Dark mode...');
  const PAGES = [
    { id: 'index', name: 'Landing Page (index.html)', url: '/index.html' },
    { id: 'home_page', name: 'Dashboard (home_page.html)', url: '/home_page/home_page.html' },
    { id: 'lectures', name: 'Lectures List', url: '/pages/lectures/lectures.html' },
    { id: 'subject', name: 'Lectures Subject', url: '/pages/lectures/subject.html' },
    { id: 'lecture', name: 'Lecture Player', url: '/pages/lectures/lecture.html' },
    { id: 'next_lectures', name: 'Next Lectures', url: '/pages/lectures/next-lectures.html' },
    { id: 'resources', name: 'Resources', url: '/pages/lectures/resources.html' },
    { id: 'practice', name: 'Practice List', url: '/pages/practice/practice.html' },
    { id: 'practice_subject', name: 'Practice Subject', url: '/pages/practice/practice-subject.html' },
    { id: 'practice_quiz_intro', name: 'Practice Quiz Intro', url: '/pages/practice/practice-quiz-intro.html' },
    { id: 'practice_quiz', name: 'Practice Quiz Active', url: '/pages/practice/practice-quiz.html' },
    { id: 'practice_result', name: 'Practice Result', url: '/pages/practice/practice-result.html' },
    { id: 'history', name: 'History', url: '/pages/history.html' },
    { id: 'favorites', name: 'Favorites', url: '/pages/favorites.html' },
    { id: 'community_feed', name: 'Community Feed', url: '/pages/community/community-feed.html' },
    { id: 'community_discussions', name: 'Community Discussions', url: '/pages/community/community-discussions.html' },
    { id: 'community_detail', name: 'Discussion Detail', url: '/pages/community/discussion-detail.html' },
    { id: 'community_groups', name: 'Community Groups', url: '/pages/community/community-groups.html' },
    { id: 'community_leaderboard', name: 'Community Leaderboard', url: '/pages/community/community-leaderboard.html' },
    { id: 'community_notifications', name: 'Community Notifications', url: '/pages/community/community-notifications.html' },
    { id: 'community_search', name: 'Community Search', url: '/pages/community/community-search.html' },
    { id: 'settings', name: 'Settings', url: '/pages/settings/settings.html' },
    { id: 'admin', name: 'Admin Dashboard', url: '/pages/admin/admin.html' },
    { id: 'login', name: 'Auth Login', url: '/pages/auth/login.html' },
    { id: 'signup', name: 'Auth Signup', url: '/pages/auth/signup.html' },
    { id: 'forgot_pass', name: 'Auth Forgot Password', url: '/pages/auth/forgot_pass.html' },
    { id: 'reset_pass', name: 'Auth Reset Password', url: '/pages/auth/reset_pass.html' },
    { id: 'send_email', name: 'Auth Send Email', url: '/pages/auth/send_email.html' }
  ];

  for (const p of PAGES) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await setupAuth(page, 'dark');
    try {
      await page.goto(`${BASE_URL}${p.url}`, { waitUntil: 'networkidle2', timeout: 12000 });
      await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
      await new Promise(r => setTimeout(r, 400));

      const brightEls = await page.evaluate(() => {
        function parseRgba(str) {
          if (!str) return [0, 0, 0, 0];
          const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
          if (!m) return [0, 0, 0, 0];
          return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3]), m[4] !== undefined ? parseFloat(m[4]) : 1];
        }

        const bad = [];
        const all = document.querySelectorAll('*');
        for (const el of all) {
          if (['script', 'style', 'link', 'meta', 'svg', 'path'].includes(el.tagName.toLowerCase())) continue;
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) continue;

          const cs = window.getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden') continue;

          const [r, g, b, a] = parseRgba(cs.backgroundColor);
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;
          if (brightness > 200 && a > 0.3) {
            let sel = el.id ? `#${el.id}` : el.className && typeof el.className === 'string' ? `${el.tagName.toLowerCase()}.${el.className.split(' ').filter(c => c && !c.includes(':')).slice(0,2).join('.')}` : el.tagName.toLowerCase();
            bad.push({
              selector: sel,
              tagName: el.tagName.toLowerCase(),
              bg: cs.backgroundColor,
              inlineStyle: el.getAttribute('style') || '',
              textSnippet: el.textContent.trim().slice(0, 30),
              width: Math.round(rect.width),
              height: Math.round(rect.height)
            });
          }
        }
        return bad;
      });

      report.bright_bg_by_page[p.id] = brightEls;
    } catch (e) {
      report.bright_bg_by_page[p.id] = { error: e.message };
    } finally {
      await page.close();
    }
  }

  fs.writeFileSync(path.join(__dirname, 'detailed_audit_results.json'), JSON.stringify(report, null, 2));
  console.log('Audit completed and saved to tools/detailed_audit_results.json');

  await browser.close();
}

runAudit().catch(err => {
  console.error(err);
  process.exit(1);
});
