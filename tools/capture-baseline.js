const puppeteer = require('./node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, 'shots', 'baseline');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

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

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844, isMobile: true, hasTouch: true }
];

const THEMES = ['light', 'dark'];

async function run() {
  console.log(`Starting baseline capture for ${PAGES.length} pages across 2 viewports and 2 themes...`);
  console.log(`Output directory: ${OUTPUT_DIR}\n`);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  let totalCaptured = 0;

  for (const pageInfo of PAGES) {
    for (const vp of VIEWPORTS) {
      for (const theme of THEMES) {
        const page = await browser.newPage();
        
        // Mock auth and settings before page loads
        await page.evaluateOnNewDocument((targetTheme) => {
          localStorage.setItem('token', 'mock_jwt_token_for_baseline_testing');
          localStorage.setItem('user', JSON.stringify({
            id: 1,
            username: 'alex',
            full_name: 'Alex Pham',
            role: 'admin',
            email: 'alex@95ai.club',
            avatar_url: ''
          }));
          localStorage.setItem('lib95:settings:data', JSON.stringify({
            settings: {
              appearance: {
                theme: targetTheme,
                accentColor: 'blue',
                fontSize: 'medium',
                backgroundStyle: 'default'
              }
            }
          }));
        }, theme);

        await page.setViewport(vp);

        const pageUrl = `${BASE_URL}${pageInfo.url}`;
        try {
          await page.goto(pageUrl, { waitUntil: 'networkidle2', timeout: 15000 });
          
          // Ensure theme attribute on html
          await page.evaluate((t) => {
            if (t === 'dark') {
              document.documentElement.setAttribute('data-theme', 'dark');
            } else {
              document.documentElement.removeAttribute('data-theme');
            }
          }, theme);

          // Small wait for render/transitions
          await new Promise(r => setTimeout(r, 400));

          const filename = `${pageInfo.id}_${vp.name}_${theme}.png`;
          const filePath = path.join(OUTPUT_DIR, filename);
          
          await page.screenshot({ path: filePath, fullPage: false });
          totalCaptured++;
          process.stdout.write(`Captured [${totalCaptured}/${PAGES.length * 4}]: ${filename}\n`);
        } catch (err) {
          console.error(`Error capturing ${pageInfo.id} (${vp.name}, ${theme}):`, err.message);
        } finally {
          await page.close();
        }
      }
    }
  }

  await browser.close();
  console.log(`\nBaseline capture complete! Total screenshots saved: ${totalCaptured}`);
}

run().catch(console.error);
