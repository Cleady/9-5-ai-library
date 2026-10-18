const puppeteer = require('./node_modules/puppeteer-core');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to theme gallery...');
  await page.goto('http://localhost:3000/tools/theme-gallery.html', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  const shotPath = path.join(__dirname, 'shots', 'theme_gallery_desktop.png');
  await page.screenshot({ path: shotPath, fullPage: false });
  console.log('Saved screenshot to:', shotPath);

  // Copy to artifact directory
  const artifactPath = path.join('C:\\Users\\anhqu\\.gemini\\antigravity\\brain\\017b0809-a52b-4747-be93-fb4c154854d2', 'theme_gallery_desktop.png');
  fs.copyFileSync(shotPath, artifactPath);
  console.log('Copied to artifact:', artifactPath);

  // Scroll down a bit to capture inputs and tables
  await page.evaluate(() => {
    const f1 = document.getElementById('frame-light');
    const f2 = document.getElementById('frame-dark');
    f1.contentWindow.scrollTo(0, 1100);
    f2.contentWindow.scrollTo(0, 1100);
  });
  await new Promise(r => setTimeout(r, 800));

  const shotPath2 = path.join(__dirname, 'shots', 'theme_gallery_inputs_tables.png');
  await page.screenshot({ path: shotPath2, fullPage: false });
  const artifactPath2 = path.join('C:\\Users\\anhqu\\.gemini\\antigravity\\brain\\017b0809-a52b-4747-be93-fb4c154854d2', 'theme_gallery_inputs_tables.png');
  fs.copyFileSync(shotPath2, artifactPath2);
  console.log('Copied second shot to artifact:', artifactPath2);

  await browser.close();
  console.log('Theme gallery capture complete!');
})();
