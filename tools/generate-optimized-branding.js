const puppeteer = require('./node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

async function main() {
  const sourcePath = path.join(__dirname, '../assets/icon/cool_book.png');
  if (!fs.existsSync(sourcePath)) {
    console.error('Source icon not found:', sourcePath);
    process.exit(1);
  }

  const srcBase64 = fs.readFileSync(sourcePath).toString('base64');
  const dataUri = `data:image/png;base64,${srcBase64}`;

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setContent('<html><body><div id="container"></div></body></html>');

  const targets = [
    { name: 'cool_book_128.png', width: 128, height: 128, maxKb: 40 },
    { name: 'favicon-64.png', width: 64, height: 64, maxKb: 25 },
    { name: 'favicon-32.png', width: 32, height: 32, maxKb: 15 }
  ];

  for (const target of targets) {
    const pngBase64 = await page.evaluate(async ({ dataUri, width, height }) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/png');
          resolve(dataUrl.split(',')[1]);
        };
        img.onerror = (e) => reject(e);
        img.src = dataUri;
      });
    }, { dataUri, width: target.width, height: target.height });

    const outPath = path.join(__dirname, '../assets/icon', target.name);
    const buf = Buffer.from(pngBase64, 'base64');
    fs.writeFileSync(outPath, buf);
    const kb = (buf.length / 1024).toFixed(2);
    console.log(`Generated ${target.name}: ${target.width}x${target.height}px, ${kb} KB (limit <= ${target.maxKb} KB)`);
    if (buf.length > target.maxKb * 1024) {
      console.warn(`Warning: ${target.name} exceeds ${target.maxKb} KB limit`);
    }
  }

  await browser.close();
  console.log('Branding icons generation completed successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
