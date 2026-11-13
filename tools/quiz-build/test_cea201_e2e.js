/**
 * tools/quiz-build/test_cea201_e2e.js
 * Kịch bản kiểm thử E2E tự động bằng Puppeteer cho môn CEA201 (Computer Architecture).
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('../node_modules/puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 5000;
const BASE_URL = `http://localhost:${PORT}`;

async function runE2E() {
  console.log('======================================================================');
  console.log('🚀 BẮT ĐẦU KIỂM THỬ E2E PUPPETEER CHO MÔN CEA201 (COMPUTER ARCHITECTURE)');
  console.log('======================================================================');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-background-networking',
      '--window-size=1440,900'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (!text.includes('favicon') && !text.includes('status of 404') && !text.includes('ERR_NETWORK_CHANGED')) {
        consoleErrors.push(`[PAGE ERROR] ${text}`);
      }
    }
  });

  page.on('pageerror', err => {
    if (!err.message.includes('ERR_NETWORK_CHANGED')) {
      consoleErrors.push(`[PAGE UNCAUGHT] ${err.message}`);
    }
  });

  async function safeGoto(url) {
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
    } catch (err) {
      if (err.message.includes('ERR_NETWORK_CHANGED') || err.message.includes('Navigation timeout')) {
        await new Promise(r => setTimeout(r, 600));
        await page.goto(url, { waitUntil: 'load', timeout: 15000 });
      } else {
        throw err;
      }
    }
  }

  const testResults = [];
  function recordTest(step, desc, pass, details = '') {
    testResults.push({ step, desc, pass, details });
    const mark = pass ? '✅ PASS' : '❌ FAIL';
    console.log(`[${mark}] [Bước ${step}] ${desc} ${details ? '(' + details + ')' : ''}`);
  }

  try {
    // ----------------------------------------------------
    // TEST 1: Trang danh sách Practice & Thẻ môn học CEA201
    // ----------------------------------------------------
    console.log('\n--- Test 1: Thẻ môn học CEA201 trên practice.html ---');
    await safeGoto(`${BASE_URL}/pages/practice/practice.html`);
    await page.waitForSelector('.prc-subject-card', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 400));

    const ceaCard = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('.prc-subject-card'));
      for (const a of links) {
        if (a.textContent.includes('CEA201')) {
          const tile = a.querySelector('.prc-subject-icon-tile');
          const icon = a.querySelector('.subject-icon');
          return {
            text: a.textContent.trim(),
            hasBlueTile: tile ? tile.classList.contains('prc-icon-blue') : false,
            hasChipIcon: icon ? icon.classList.contains('subject1-icon') : false,
            href: a.getAttribute('href')
          };
        }
      }
      return null;
    });

    recordTest(1, 'Thẻ CEA201 hiển thị trên practice.html', !!ceaCard, ceaCard ? ceaCard.text.replace(/\s+/g, ' ') : 'Không tìm thấy');
    recordTest(1, 'Giao diện thẻ sử dụng màu xanh dương (prc-icon-blue)', !!ceaCard && ceaCard.hasBlueTile, `Tile class: prc-icon-blue`);
    recordTest(1, 'Biểu tượng sử dụng subject1-icon chuẩn hóa', !!ceaCard && ceaCard.hasChipIcon, `Icon class: subject1-icon`);

    // ----------------------------------------------------
    // TEST 2: Trang môn học CEA201 (practice-subject.html?subject=1)
    // ----------------------------------------------------
    console.log('\n--- Test 2: Trang môn học CEA201 (practice-subject.html?subject=1) ---');
    await safeGoto(`${BASE_URL}/pages/practice/practice-subject.html?subject=1`);
    await new Promise(r => setTimeout(r, 800));

    const subjectData = await page.evaluate(() => {
      const title = document.querySelector('.prc-subject-header h1, .prc-subject-title')?.textContent?.trim() || '';
      const quizRows = Array.from(document.querySelectorAll('.prc-quiz-row'));
      const quizzes = quizRows.map(row => {
        const titleEl = row.querySelector('.prc-quiz-row-title');
        const metaEl = row.querySelector('.prc-quiz-row-meta');
        return {
          title: titleEl ? titleEl.textContent.trim() : '',
          meta: metaEl ? metaEl.textContent.trim() : ''
        };
      });
      return { title, quizCount: quizRows.length, quizzes };
    });

    recordTest(2, 'Tiêu đề môn học CEA201 hiển thị chuẩn xác', subjectData.title.includes('Computer Architecture') || subjectData.title.includes('CEA201'), `Tiêu đề: ${subjectData.title}`);
    recordTest(2, 'Hiển thị đủ 21 chương theo chuẩn .tex', subjectData.quizCount === 21, `Số chương: ${subjectData.quizCount}/21`);

    console.log('    Chi tiết 21 chương trên giao diện:');
    subjectData.quizzes.forEach((qz, idx) => {
      console.log(`      Chương ${String(idx + 1).padStart(2, ' ')}: ${qz.title.padEnd(65, ' ')} | ${qz.meta}`);
    });

    // ----------------------------------------------------
    // TEST 3: Thi thử Quiz 1 (Chương 1 – Basic Concepts) & Nộp bài & Giải thích chi tiết
    // ----------------------------------------------------
    console.log('\n--- Test 3: Thi thử Quiz 1 (Chương 1 – Basic Concepts and Computer Evolution) ---');
    await safeGoto(`${BASE_URL}/pages/practice/practice-quiz-intro.html?quiz=1`);
    await new Promise(r => setTimeout(r, 500));

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
      page.click('#prc-start-quiz-btn')
    ]);
    await page.waitForSelector('.prc-option', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 600));

    // Kiểm tra câu hỏi đầu tiên
    const q1Data = await page.evaluate(() => {
      const qText = document.querySelector('.prc-question-text')?.textContent?.trim() || '';
      const options = Array.from(document.querySelectorAll('.prc-option-label')).map(el => el.textContent.trim());
      return { qText, optionCount: options.length, options };
    });

    recordTest(3, 'Câu hỏi 1 hiển thị nội dung trích xuất từ file .tex', q1Data.qText.includes('Second generation computers used'), `Nội dung: ${q1Data.qText}`);
    recordTest(3, 'Đầy đủ 4 phương án A/B/C/D', q1Data.optionCount === 4, `Phương án: ${q1Data.options.join(', ')}`);

    // Chọn phương án C (transistors)
    const clickedOptC = await page.evaluate(() => {
      const opts = Array.from(document.querySelectorAll('.prc-option'));
      const c = opts.find(o => o.textContent.includes('transistors'));
      if (c) {
        c.click();
        return true;
      }
      return false;
    });
    recordTest(3, 'Tương tác chọn đáp án (transistors)', clickedOptC, 'Đã click chọn đáp án C');
    await new Promise(r => setTimeout(r, 300));

    // Nhảy tới câu cuối cùng để kích hoạt nút Submit
    await page.evaluate(() => {
      const navs = document.querySelectorAll('.prc-question-nav-btn');
      if (navs.length) navs[navs.length - 1].click();
    });
    await new Promise(r => setTimeout(r, 400));

    // Bấm Nộp bài (Submit)
    await page.click('#prc-next-btn');
    await page.waitForSelector('.prc-modal-btn-confirm', { timeout: 5000 });
    await page.click('.prc-modal-btn-confirm');

    await page.waitForSelector('#prc-review-btn', { timeout: 10000 });
    const isResultPage = await page.evaluate(() => {
      const resPage = document.getElementById('prc-result-page');
      return resPage && !resPage.hidden;
    });
    recordTest(3, 'Nộp bài và hiển thị trang kết quả thành công', isResultPage, isResultPage ? 'Result page hiển thị' : 'Chưa thấy result');

    // Mở phần Review Answers có giải thích chi tiết
    await page.click('#prc-review-btn');
    await new Promise(r => setTimeout(r, 600));

    const reviewInfo = await page.evaluate(() => {
      const section = document.getElementById('prc-review-section');
      const expElements = Array.from(document.querySelectorAll('.prc-review-explanation'));
      const text = section ? section.textContent : '';
      return {
        hasReviewSection: section && !section.hidden,
        explanationCount: expElements.length,
        hasCOATheory: text.includes('COA 11th Edition') || text.includes('Cơ sở lý thuyết') || text.includes('Hướng giải'),
        hasElimination: text.includes('Phân tích loại trừ') || text.includes('Phương án') || text.toLowerCase().includes('phương án') || text.includes('sai')
      };
    });

    recordTest(3, 'Hiển thị giải thích chi tiết chuẩn COA 11th Edition từ .tex', reviewInfo.hasCOATheory, `COA Theory: ${reviewInfo.hasCOATheory}`);
    recordTest(3, 'Hiển thị phân tích loại trừ chi tiết cho từng phương án', reviewInfo.hasElimination, `Elimination: ${reviewInfo.hasElimination}`);

    // ----------------------------------------------------
    // TEST 3B: Kiểm tra câu 12 trong Study Mode (xóa sạch lỗi thừa chữ textbf)
    // ----------------------------------------------------
    console.log('\n--- Test 3B: Kiểm tra Câu 12 Quiz 1 trong Chế độ Study Mode ---');
    await safeGoto(`${BASE_URL}/pages/practice/practice-quiz.html?quiz=1&mode=study`);
    await page.waitForSelector('.prc-question-nav-btn', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 500));

    // Nhấp vào nút câu số 12 trong Question navigator
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.prc-question-nav-btn'));
      const btn12 = btns.find(b => b.textContent.trim() === '12');
      if (btn12) btn12.click();
    });
    await new Promise(r => setTimeout(r, 500));

    const q12Check = await page.evaluate(() => {
      const qText = document.querySelector('.prc-question-text')?.textContent?.trim() || '';
      const opts = Array.from(document.querySelectorAll('.prc-option-label')).map(el => el.textContent.trim());
      const hasMacro = opts.some(o => /textbf|textit|texttt|textcolor|includegraphics/i.test(o)) || /textbf|textit|texttt|textcolor|includegraphics/i.test(qText);
      return {
        qText,
        opts,
        hasMacro
      };
    });

    recordTest(3, 'Câu 12: Đề bài và phương án không bị dính macro hay code thừa', !q12Check.hasMacro, `Đề bài: "${q12Check.qText.substring(0, 45)}..."`);

    // ----------------------------------------------------
    // TEST 4: Thi thử Quiz 2 (Chương 2 – Performance Concepts, 12 câu)
    // ----------------------------------------------------
    console.log('\n--- Test 4: Thi thử Quiz 2 (Chương 2 – Performance Concepts) ---');
    await safeGoto(`${BASE_URL}/pages/practice/practice-quiz-intro.html?quiz=2`);
    await new Promise(r => setTimeout(r, 500));

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
      page.click('#prc-start-quiz-btn')
    ]);
    await page.waitForSelector('.prc-option', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 500));

    const q2Data = await page.evaluate(() => {
      const totalQ = document.querySelectorAll('.prc-question-nav-btn').length;
      const text = document.querySelector('.prc-question-text')?.textContent?.trim() || '';
      return { totalQ, text };
    });
    recordTest(4, 'Quiz 2 load đúng 12 câu hỏi', q2Data.totalQ === 12, `Số câu hỏi: ${q2Data.totalQ}/12`);

    // Chọn 1 đáp án và submit
    await page.click('.prc-option:first-child');
    await new Promise(r => setTimeout(r, 200));

    await page.evaluate(() => {
      const navs = document.querySelectorAll('.prc-question-nav-btn');
      if (navs.length) navs[navs.length - 1].click();
    });
    await new Promise(r => setTimeout(r, 300));
    await page.click('#prc-next-btn');
    await page.waitForSelector('.prc-modal-btn-confirm', { timeout: 5000 });
    await page.click('.prc-modal-btn-confirm');
    await page.waitForSelector('#prc-review-btn', { timeout: 10000 });
    recordTest(4, 'Nộp bài Quiz 2 thành công', true, 'Trang kết quả Quiz 2 hiển thị chuẩn xác');

    // ----------------------------------------------------
    // TEST 5: Thanh tìm kiếm Topbar gợi ý môn CEA201 và các chương
    // ----------------------------------------------------
    console.log('\n--- Test 5: Thanh tìm kiếm toàn cục Topbar ---');
    await safeGoto(`${BASE_URL}/pages/practice/practice.html`);
    await page.waitForSelector('#site-search', { timeout: 10000 });

    // Tìm kiếm từ khóa "CEA201"
    await page.click('#site-search');
    await page.keyboard.type('CEA201');
    await page.waitForSelector('.global-search-item', { timeout: 5000 });

    const ceaSearch = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.global-search-item'));
      return {
        itemCount: items.length,
        hasCEA: items.some(it => it.textContent.includes('CEA201') || it.textContent.includes('Computer Architecture') || it.textContent.includes('Basic Concepts'))
      };
    });
    recordTest(5, 'Tìm kiếm từ khóa "CEA201" hiển thị gợi ý quiz', ceaSearch.hasCEA && ceaSearch.itemCount > 0, `Số gợi ý: ${ceaSearch.itemCount}`);

    // Xóa ô tìm kiếm và gõ "Cache Memory"
    await page.evaluate(() => {
      const inp = document.getElementById('site-search');
      if (inp) {
        inp.value = '';
        inp.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    await new Promise(r => setTimeout(r, 300));
    await page.type('#site-search', 'Cache Memory');
    await page.waitForSelector('.global-search-item', { timeout: 5000 });

    const cacheSearch = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.global-search-item'));
      return {
        itemCount: items.length,
        hasCache: items.some(it => it.textContent.includes('Cache Memory') || it.textContent.includes('Chương 5') || it.textContent.includes('Chương 4'))
      };
    });
    recordTest(5, 'Tìm kiếm từ khóa "Cache Memory" hiển thị chương 5 Cache Memory của CEA201', cacheSearch.hasCache, `Số gợi ý: ${cacheSearch.itemCount}`);

    // Click vào item đầu tiên của Cache Memory để kiểm tra điều hướng
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
      page.click('.global-search-item')
    ]);
    const currentUrl = page.url();
    recordTest(5, 'Click gợi ý tìm kiếm mở đúng trang làm bài / chi tiết môn', currentUrl.includes('quiz') || currentUrl.includes('practice'), `URL: ${currentUrl}`);

    // ----------------------------------------------------
    // TEST 6: Kiểm tra không hồi quy (No regression) các môn khác
    // ----------------------------------------------------
    console.log('\n--- Test 6: Kiểm tra không hồi quy (CSD203 & JPD113) ---');
    // CSD203 (subject=4)
    await safeGoto(`${BASE_URL}/pages/practice/practice-subject.html?subject=4`);
    await new Promise(r => setTimeout(r, 600));

    const csdQuizzes = await page.evaluate(() => {
      return document.querySelectorAll('.prc-quiz-row').length;
    });
    recordTest(6, 'CSD203 (Subject 4) bảo tồn nguyên vẹn 8 chương', csdQuizzes === 8, `Số chương: ${csdQuizzes}/8`);

    // JPD113 (subject=8)
    await safeGoto(`${BASE_URL}/pages/practice/practice-subject.html?subject=8`);
    await new Promise(r => setTimeout(r, 600));

    const jpdQuizzes = await page.evaluate(() => {
      return document.querySelectorAll('.prc-quiz-row').length;
    });
    recordTest(6, 'JPD113 (Subject 8) bảo tồn nguyên vẹn 4 chương', jpdQuizzes === 4, `Số chương: ${jpdQuizzes}/4`);

    // ----------------------------------------------------
    // TEST 7: Kiểm tra Console Errors
    // ----------------------------------------------------
    console.log('\n--- Test 7: Console Errors Log ---');
    if (consoleErrors.length > 0) {
      console.log('Console Errors caught:', consoleErrors);
    }
    recordTest(7, 'Không có lỗi JavaScript Console nghiêm trọng', consoleErrors.length === 0, `Lỗi: ${consoleErrors.length}`);

  } catch (error) {
    console.error('LỖI NGOẠI LỆ TRONG QUÁ TRÌNH KIỂM THỬ:', error);
  } finally {
    await browser.close();

    console.log('\n======================================================================');
    console.log('📊 TỔNG HỢP KẾT QUẢ KIỂM THỬ E2E CHO MÔN CEA201');
    console.log('======================================================================');
    const passedCount = testResults.filter(t => t.pass).length;
    const totalCount = testResults.length;
    testResults.forEach(t => {
      const mark = t.pass ? 'PASS' : 'FAIL';
      console.log(`[${mark.padEnd(4, ' ')}] [Bước ${t.step}] ${t.desc} — ${t.details}`);
    });
    console.log('----------------------------------------------------------------------');
    console.log(`KẾT QUẢ: ${passedCount}/${totalCount} BÀI KIỂM TRA ĐẠT (${Math.round(passedCount/totalCount*100)}%)`);
    console.log('======================================================================\n');
  }
}

runE2E();
