const puppeteer = require('./node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const REPORT_FILE = path.join(__dirname, 'contrast-report.json');

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

async function run() {
  console.log(`Starting WCAG 2.1 Contrast Scan in Dark Theme for ${PAGES.length} pages...\n`);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const allPageResults = [];

  for (const p of PAGES) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // Set dark theme and mock login
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('token', 'mock_jwt_token_for_contrast_scan');
      localStorage.setItem('user', JSON.stringify({
        id: 1,
        username: 'alex',
        full_name: 'Alex Pham',
        role: 'admin',
        email: 'alex@95ai.club'
      }));
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

    try {
      await page.goto(`${BASE_URL}${p.url}`, { waitUntil: 'networkidle2', timeout: 15000 });
      
      // Ensure dark theme attribute
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
      });

      await new Promise(r => setTimeout(r, 500));

      // Scan page elements for contrast
      const scanResults = await page.evaluate(() => {
        function parseRgba(str) {
          if (!str) return [0, 0, 0, 0];
          const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
          if (!m) return [0, 0, 0, 1];
          return [
            parseInt(m[1], 10),
            parseInt(m[2], 10),
            parseInt(m[3], 10),
            m[4] !== undefined ? parseFloat(m[4]) : 1
          ];
        }

        function sRGBtoLinear(c) {
          c = c / 255;
          return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        }

        function relativeLuminance(r, g, b) {
          return 0.2126 * sRGBtoLinear(r) + 0.7152 * sRGBtoLinear(g) + 0.0722 * sRGBtoLinear(b);
        }

        function getContrastRatio(l1, l2) {
          const lighter = Math.max(l1, l2);
          const darker = Math.min(l1, l2);
          return (lighter + 0.05) / (darker + 0.05);
        }

        function blendColors(fg, bg) {
          const [r1, g1, b1, a1] = fg;
          const [r2, g2, b2, a2] = bg;
          const a = a1 + a2 * (1 - a1);
          if (a === 0) return [0, 0, 0, 0];
          const r = Math.round((r1 * a1 + r2 * a2 * (1 - a1)) / a);
          const g = Math.round((g1 * a1 + g2 * a2 * (1 - a1)) / a);
          const b = Math.round((b1 * a1 + b2 * a2 * (1 - a1)) / a);
          return [r, g, b, a];
        }

        function getEffectiveBackgroundColor(el) {
          let curr = el;
          let blended = [0, 0, 0, 0];
          let hasBackgroundImage = false;

          while (curr && curr.nodeType === 1) {
            const cs = window.getComputedStyle(curr);
            const bg = parseRgba(cs.backgroundColor);
            if (cs.backgroundImage && cs.backgroundImage !== 'none') {
              hasBackgroundImage = true;
            }
            if (bg[3] > 0) {
              blended = blendColors(blended, bg);
              if (blended[3] >= 0.95) break; // opaque enough
            }
            curr = curr.parentElement;
          }

          // Fallback to dark theme default page bg (#030712)
          if (blended[3] < 0.95) {
            blended = blendColors(blended, [3, 7, 18, 1]);
          }

          return { color: blended, hasBackgroundImage };
        }

        function getUniqueSelector(el) {
          if (!el) return '';
          if (el.id) return `#${el.id}`;
          let path = [];
          while (el && el.nodeType === 1 && el !== document.body && el !== document.documentElement) {
            let selector = el.tagName.toLowerCase();
            if (el.className && typeof el.className === 'string') {
              const classes = el.className.trim().split(/\s+/).filter(c => c && !c.includes(':'));
              if (classes.length) {
                selector += '.' + classes.slice(0, 2).join('.');
              }
            }
            path.unshift(selector);
            if (path.length >= 3) break;
            el = el.parentElement;
          }
          return path.join(' > ');
        }

        // Walk DOM
        const violations = [];
        const seenText = new Set();
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;

        while ((node = walker.nextNode())) {
          const parent = node.parentElement;
          if (!parent) continue;
          const text = node.textContent.trim();
          if (!text || text.length < 2) continue;

          // Skip hidden elements or scripts
          const tagName = parent.tagName.toLowerCase();
          if (['script', 'style', 'noscript', 'template'].includes(tagName)) continue;

          const rect = parent.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) continue;

          const cs = window.getComputedStyle(parent);
          if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) continue;

          // Deduplicate identical adjacent nodes
          const key = `${parent.className}|${text.slice(0, 30)}`;
          if (seenText.has(key)) continue;
          seenText.add(key);

          const fg = parseRgba(cs.color);
          const { color: bg, hasBackgroundImage } = getEffectiveBackgroundColor(parent);

          const lFg = relativeLuminance(fg[0], fg[1], fg[2]);
          const lBg = relativeLuminance(bg[0], bg[1], bg[2]);
          const ratio = getContrastRatio(lFg, lBg);

          const fontSize = parseFloat(cs.fontSize) || 16;
          const fontWeight = parseInt(cs.fontWeight, 10) || 400;
          const isLarge = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
          const threshold = isLarge ? 3.0 : 4.5;

          const isLightOnLight = lFg > 0.45 && lBg > 0.45;
          const isDarkOnDark = lFg < 0.15 && lBg < 0.15;

          if (ratio < threshold || isLightOnLight || isDarkOnDark) {
            violations.push({
              selector: getUniqueSelector(parent),
              tagName,
              textSnippet: text.slice(0, 60),
              textColor: `rgb(${fg[0]}, ${fg[1]}, ${fg[2]})`,
              bgColor: `rgb(${bg[0]}, ${bg[1]}, ${bg[2]})`,
              ratio: Math.round(ratio * 100) / 100,
              threshold,
              isLarge,
              isLightOnLight,
              isDarkOnDark,
              hasBackgroundImage
            });
          }
        }

        return violations;
      });

      console.log(`[${p.id}] ${p.name}: ${scanResults.length} violations found.`);
      allPageResults.push({
        id: p.id,
        name: p.name,
        url: p.url,
        violationCount: scanResults.length,
        lightOnLightCount: scanResults.filter(v => v.isLightOnLight).length,
        darkOnDarkCount: scanResults.filter(v => v.isDarkOnDark).length,
        violations: scanResults
      });
    } catch (err) {
      console.error(`Error scanning ${p.id}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();

  // Save full JSON report
  fs.writeFileSync(REPORT_FILE, JSON.stringify(allPageResults, null, 2), 'utf-8');
  console.log(`\nReport successfully saved to ${REPORT_FILE}`);

  // Print Summary Table
  console.log('\n' + '='.repeat(80));
  console.log(`${'Page Name'.padEnd(35)} | ${'Violations'.padEnd(12)} | ${'Light-on-Light'.padEnd(16)} | Dark-on-Dark`);
  console.log('-'.repeat(80));
  
  // Sort by violation count descending
  allPageResults.sort((a, b) => b.violationCount - a.violationCount);
  for (const r of allPageResults) {
    console.log(`${r.name.padEnd(35)} | ${String(r.violationCount).padEnd(12)} | ${String(r.lightOnLightCount).padEnd(16)} | ${r.darkOnDarkCount}`);
  }
  console.log('='.repeat(80));
}

run().catch(console.error);
