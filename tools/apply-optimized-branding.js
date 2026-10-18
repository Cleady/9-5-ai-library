const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// 1. Update CSS files
const cssFiles = [
  'css/admin.css',
  'css/login.css',
  'css/reset_pass.css',
  'css/signup.css',
  'css/style.css'
];

let modifiedCount = 0;

for (const relPath of cssFiles) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) continue;
  let content = fs.readFileSync(fullPath, 'utf8');
  if (content.includes('cool_book.png')) {
    content = content.replace(/cool_book\.png/g, 'cool_book_128.png');
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated CSS: ${relPath}`);
    modifiedCount++;
  }
}

// 2. Update index.html
const indexPath = path.join(rootDir, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');
indexContent = indexContent.replace(
  '<link rel="icon" type="image/png" href="assets/icon/cool_book.png">',
  '<link rel="icon" type="image/png" href="assets/icon/favicon-32.png">'
);
indexContent = indexContent.replace(
  '<img class="home-page__brand-icon" src="assets/icon/cool_book.png" alt="">',
  '<img class="home-page__brand-icon" src="assets/icon/cool_book_128.png" alt="">'
);
indexContent = indexContent.replace(
  '<img src="assets/icon/cool_book.png" alt=""><span><strong>9.5 AI CLUB</strong>',
  '<img src="assets/icon/cool_book_128.png" alt=""><span><strong>9.5 AI CLUB</strong>'
);
fs.writeFileSync(indexPath, indexContent, 'utf8');
console.log('Updated: index.html');
modifiedCount++;

// 3. Update admin.html
const adminPath = path.join(rootDir, 'pages/admin/admin.html');
let adminContent = fs.readFileSync(adminPath, 'utf8');
adminContent = adminContent.replace(
  '<link rel="icon" type="image/png" href="../../assets/icon/cool_book.png">',
  '<link rel="icon" type="image/png" href="../../assets/icon/favicon-32.png">'
);
adminContent = adminContent.replace(
  '<img src="../../assets/icon/cool_book.png" alt="Logo" class="logo-img"',
  '<img src="../../assets/icon/cool_book_128.png" alt="Logo" class="logo-img"'
);
fs.writeFileSync(adminPath, adminContent, 'utf8');
console.log('Updated: pages/admin/admin.html');
modifiedCount++;

// 4. Update all other HTML files for <link rel="icon">
function walkHtml(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        walkHtml(full);
      }
    } else if (file.endsWith('.html')) {
      const rel = path.relative(rootDir, full);
      if (rel === 'index.html' || rel === path.join('pages', 'admin', 'admin.html')) continue;
      
      let html = fs.readFileSync(full, 'utf8');
      let changed = false;
      // Match any <link rel="icon" ... href="...cool_book.png" ...>
      const newHtml = html.replace(/(<link[^>]*rel=["']icon["'][^>]*href=["'][^"']*?)cool_book\.png(["'][^>]*>)/gi, (m, p1, p2) => {
        changed = true;
        return `${p1}favicon-32.png${p2}`;
      });
      // Also check if any theme-gallery has inline background-image
      const finalHtml = newHtml.replace(/url\(['"]?\/assets\/icon\/cool_book\.png['"]?\)/g, "url('/assets/icon/cool_book_128.png')");
      if (finalHtml !== newHtml) changed = true;

      if (changed) {
        fs.writeFileSync(full, finalHtml, 'utf8');
        console.log(`Updated favicon/logo: ${rel}`);
        modifiedCount++;
      }
    }
  }
}

walkHtml(rootDir);
console.log(`Total files updated: ${modifiedCount}`);
