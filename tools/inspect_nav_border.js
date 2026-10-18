const puppeteer = require('./node_modules/puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('lib95:settings:data', JSON.stringify({
      settings: { appearance: { theme: 'dark', accentColor: 'blue' } }
    }));
  });

  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle2', timeout: 15000 });
  await new Promise(r => setTimeout(r, 600));

  const navInfo = await page.evaluate(() => {
    const nav = document.querySelector('.home-page__nav');
    const header = document.querySelector('.home-page__header');
    const navLinkActive = document.querySelector('.home-page__nav-link--active');
    
    function getStyles(el) {
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      return {
        tagName: el.tagName,
        className: el.className,
        border: cs.border,
        borderTop: cs.borderTop,
        borderRight: cs.borderRight,
        borderBottom: cs.borderBottom,
        borderLeft: cs.borderLeft,
        outline: cs.outline,
        boxShadow: cs.boxShadow,
        background: cs.background,
        backgroundColor: cs.backgroundColor
      };
    }

    return {
      header: getStyles(header),
      nav: getStyles(nav),
      activeLink: getStyles(navLinkActive)
    };
  });

  console.log('--- COMPUTED STYLES IN DARK THEME ---');
  console.log(JSON.stringify(navInfo, null, 2));

  // Let's also inspect all CSS rules matched to .home-page__nav
  const matchedRules = await page.evaluate(() => {
    const nav = document.querySelector('.home-page__nav');
    const results = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules || []) {
          if (rule.selectorText && nav.matches(rule.selectorText)) {
            results.push({
              href: sheet.href,
              selectorText: rule.selectorText,
              cssText: rule.cssText
            });
          }
        }
      } catch (e) {}
    }
    return results;
  });

  console.log('--- MATCHED CSS RULES FOR .home-page__nav ---');
  console.log(JSON.stringify(matchedRules, null, 2));

  await browser.close();
})();
