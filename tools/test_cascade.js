const puppeteer = require('./node_modules/puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new'
  });
  const page = await browser.newPage();
  const html = `
    <!DOCTYPE html>
    <html data-theme="dark">
    <head>
      <style>
        .home-page__guest-avatar {
          width: 27px; height: 27px; border-radius: 50%;
          background: linear-gradient(145deg, #5bb3ff, #2563eb);
          color: white;
        }
        html[data-theme="dark"] .home-page__guest-avatar {
          background: rgba(56, 189, 248, 0.2);
          color: #38bdf8;
        }
      </style>
    </head>
    <body>
      <span id="guest" class="home-page__guest-avatar">Guest</span>
      <span id="with-img" class="home-page__guest-avatar" style="background-image: url('http://example.com/pic.jpg'); background-size: cover;"></span>
      <span id="letter" class="home-page__guest-avatar" style="background: #e2e8f0; color: #0f172a;">O</span>
    </body>
    </html>
  `;
  await page.setContent(html);
  const res = await page.evaluate(() => {
    const g = document.getElementById('guest');
    const w = document.getElementById('with-img');
    const l = document.getElementById('letter');
    return {
      guest: {
        bgImage: window.getComputedStyle(g).backgroundImage,
        bgColor: window.getComputedStyle(g).backgroundColor,
        color: window.getComputedStyle(g).color
      },
      withImg: {
        bgImage: window.getComputedStyle(w).backgroundImage,
        bgColor: window.getComputedStyle(w).backgroundColor,
        color: window.getComputedStyle(w).color
      },
      letter: {
        bgImage: window.getComputedStyle(l).backgroundImage,
        bgColor: window.getComputedStyle(l).backgroundColor,
        color: window.getComputedStyle(l).color
      }
    };
  });
  console.log(res);
  await browser.close();
})();
