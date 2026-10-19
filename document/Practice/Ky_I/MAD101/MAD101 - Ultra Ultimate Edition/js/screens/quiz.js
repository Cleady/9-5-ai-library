/**
 * MAD101 STUDIO — QUIZ SCREEN (CORE ENGINE)
 * js/screens/quiz.js
 * 
 * High-performance, accessible, keyboard-driven quiz experience.
 * Typesets MathJax per question, auto-saves continuously, and matches legacy grading.
 */

import { store } from '../store.js';
import { router } from '../router.js';
import { typesetElement, escapeHtml } from '../mathjax-render.js';

let timerInterval = null;
let currentKeyHandler = null;

export function cleanupQuizScreen() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  if (currentKeyHandler && typeof document !== 'undefined' && document.removeEventListener) {
    document.removeEventListener('keydown', currentKeyHandler);
    currentKeyHandler = null;
  }
}

export function renderFigureSVG(fig) {
  if (!fig) return '';
  if (fig.type === 'raw_svg' && fig.svg) {
    return `
      <figure class="ui-figure-item" style="display:inline-flex; flex-direction:column; align-items:center; margin:8px;">
        ${fig.svg}
        ${fig.caption ? `<figcaption style="font-size:var(--ui-text-sm); font-weight:700; color:var(--ui-text-secondary); margin-top:6px;">${escapeHtml(fig.caption)}</figcaption>` : ''}
      </figure>
    `;
  }

  const width = fig.width || 240;
  const height = fig.height || 220;
  const isDirectedGlobal = !!fig.directed;

  const vMap = new Map();
  (fig.vertices || []).forEach(v => {
    vMap.set(v.id, v);
  });

  let edgesSvg = '';
  (fig.edges || []).forEach((e) => {
    const v1 = vMap.get(e.from);
    const v2 = vMap.get(e.to);
    if (!v1 || !v2) return;

    const strokeColor = e.stroke || 'var(--ui-text-primary, #1e293b)';
    const strokeWidth = e.strokeWidth || 2;
    const isDirected = e.directed !== undefined ? e.directed : isDirectedGlobal;
    const markerAttr = isDirected ? `marker-end="url(#arrow-${fig.id || 'fig'})"` : '';
    const strokeDash = e.dashed ? 'stroke-dasharray="4,4"' : '';

    edgesSvg += `<line x1="${v1.x}" y1="${v1.y}" x2="${v2.x}" y2="${v2.y}" stroke="${strokeColor}" stroke-width="${strokeWidth}" ${strokeDash} ${markerAttr} />`;

    const edgeLabel = e.weight !== undefined ? e.weight : e.label;
    if (edgeLabel !== undefined && edgeLabel !== null && edgeLabel !== '') {
      const mx = (v1.x + v2.x) / 2;
      const my = (v1.y + v2.y) / 2 - 8;
      edgesSvg += `<text x="${mx}" y="${my}" fill="var(--ui-accent, #ea580c)" font-size="12" font-weight="700" text-anchor="middle">${escapeHtml(String(edgeLabel))}</text>`;
    }
  });

  let verticesSvg = '';
  (fig.vertices || []).forEach(v => {
    const r = v.radius || 6;
    const fill = v.fill || 'var(--ui-text-primary, #0f172a)';
    const stroke = v.stroke || 'var(--ui-bg-surface, #ffffff)';
    const strokeWidth = v.strokeWidth || 1.5;

    verticesSvg += `<circle cx="${v.x}" cy="${v.y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;

    if (v.label) {
      const lx = v.labelX !== undefined ? v.labelX : v.x;
      const ly = v.labelY !== undefined ? v.labelY : (v.y - (r + 8));
      verticesSvg += `<text x="${lx}" y="${ly}" fill="var(--ui-text-primary, #1e293b)" font-size="13" font-weight="700" text-anchor="middle" dominant-baseline="central">${escapeHtml(String(v.label))}</text>`;
    }
  });

  const markerDef = isDirectedGlobal || (fig.edges || []).some(e => e.directed)
    ? `<defs>
        <marker id="arrow-${fig.id || 'fig'}" viewBox="0 0 10 10" refX="16" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--ui-text-primary, #1e293b)" />
        </marker>
      </defs>`
    : '';

  return `
    <figure class="ui-figure-item" style="display:inline-flex; flex-direction:column; align-items:center; margin:8px;">
      <svg class="ui-figure-svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="background:var(--ui-bg-surface); border:1px solid var(--ui-border-subtle); border-radius:var(--ui-radius-md); box-shadow:0 1px 3px rgba(0,0,0,0.05);" role="img" aria-label="${escapeHtml(fig.caption || 'Graph figure')}">
        ${markerDef}
        <g class="ui-figure-edges">${edgesSvg}</g>
        <g class="ui-figure-vertices">${verticesSvg}</g>
      </svg>
      ${fig.caption ? `<figcaption style="font-size:var(--ui-text-sm); font-weight:800; color:var(--ui-text-primary); margin-top:8px;">${escapeHtml(fig.caption)}</figcaption>` : ''}
    </figure>
  `;
}

export async function renderQuizScreen(container, params = {}) {
  cleanupQuizScreen();

  let session = store.getActiveSession();
  if (!session || !session.questions || session.questions.length === 0) {
    // No active session found, redirect to setup
    container.innerHTML = `
      <div class="ui-card ui-empty-state">
        <div class="ui-empty-icon">📝</div>
        <h2>Chưa có bài thi nào đang làm</h2>
        <p style="margin-top:8px; font-size:var(--ui-text-sm); color:var(--ui-text-muted);">
          Vui lòng chọn cấu hình để bắt đầu một bài thi mới.
        </p>
        <div style="margin-top:var(--ui-space-6);">
          <a href="#/setup" class="ui-btn ui-btn-primary">Tạo đề thi mới →</a>
        </div>
      </div>
    `;
    return;
  }

  let questions = session.questions;
  let idx = session.currentIndex || 0;
  if (idx >= questions.length) idx = 0;
  let userAnswers = session.answers || {};
  let flags = new Set(session.flags || []);
  let isPracticeMode = session.mode === 'practice';
  let checkedQuestions = session.checked || {}; // For practice mode instant check
  let submitted = session.submitted || false;

  // Render Shell
  container.innerHTML = `
    <!-- Quiz Top Control Bar -->
    <header class="ui-card" style="padding:var(--ui-space-3) var(--ui-space-4); margin-bottom:var(--ui-space-5); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:var(--ui-space-3);">
      <div style="display:flex; align-items:center; gap:var(--ui-space-2);">
        <button class="ui-btn ui-btn-ghost ui-btn-sm" id="btnBackToHome" title="Tạm dừng và về trang chủ">
          ← Tạm dừng
        </button>
        <span class="ui-badge ui-badge-accent">${session.chapterName || 'Toán rời rạc'}</span>
        <span class="ui-badge ui-badge-info" style="text-transform:uppercase;">${session.mode || 'practice'}</span>
      </div>

      <div id="quizTimerBox" style="display:flex; align-items:center; gap:var(--ui-space-2); font-size:var(--ui-text-lg); font-weight:800; color:var(--ui-accent); background:var(--ui-accent-light); padding:4px 14px; border-radius:var(--ui-radius-full); border:1px solid rgba(249,115,22,0.3); font-family:var(--ui-font-mono);">
        <span>⏱️</span>
        <span id="quizTimerText">--:--</span>
      </div>

      <div style="display:flex; align-items:center; gap:var(--ui-space-2);">
        <button class="ui-btn ui-btn-secondary ui-btn-sm" id="btnToggleFlag" title="Đánh dấu câu hỏi này (Phím F)">
          <span id="flagIcon">☆</span> <span id="flagText">Đánh dấu</span>
        </button>
        <button class="ui-btn ui-btn-danger ui-btn-sm" id="btnSubmitQuiz">
          Nộp bài
        </button>
      </div>
    </header>

    <!-- Main Layout: 2 Columns on Desktop -->
    <div class="ui-layout-2col">
      <!-- Left Column: Question Card -->
      <main id="questionMainArea">
        <div class="ui-card" id="questionCard">
          <!-- Dynamic Question rendered here -->
        </div>
      </main>

      <!-- Right Column: Question Navigator Matrix -->
      <aside>
        <div class="ui-card" style="position:sticky; top:var(--ui-space-4);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--ui-space-3);">
            <h3 style="font-size:var(--ui-text-sm); font-weight:800; text-transform:uppercase; letter-spacing:0.05em;">
              Bảng câu hỏi
            </h3>
            <span class="ui-badge ui-badge-accent" id="progressBadge">
              0/${questions.length} Đã làm
            </span>
          </div>

          <!-- Nav Matrix Grid -->
          <div class="ui-nav-grid" id="questionNavGrid" style="max-height:360px; overflow-y:auto; padding-right:2px;">
            <!-- Cells generated here -->
          </div>

          <!-- Legend -->
          <div style="margin-top:var(--ui-space-4); padding-top:var(--ui-space-3); border-top:1px solid var(--ui-border-subtle); display:grid; grid-template-columns:repeat(2,1fr); gap:var(--ui-space-2); font-size:var(--ui-text-xs); color:var(--ui-text-secondary);">
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="width:10px; height:10px; background:var(--ui-accent); border-radius:2px;"></span> Đang xem
            </div>
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="width:10px; height:10px; background:rgba(16,185,129,0.3); border:1px solid #10b981; border-radius:2px;"></span> Đã chọn
            </div>
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="width:10px; height:10px; background:#f59e0b; border-radius:50%;"></span> Đánh dấu
            </div>
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="width:10px; height:10px; background:var(--ui-bg-surface); border:1px solid var(--ui-border-subtle); border-radius:2px;"></span> Chưa làm
            </div>
          </div>
        </div>
      </aside>
    </div>

    <!-- Lightbox Modal for Original Image -->
    <div class="ui-modal-overlay" id="lightboxModal">
      <div class="ui-modal-card" onclick="event.stopPropagation()">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3 style="font-size:var(--ui-text-base); font-weight:800;" id="lightboxTitle">Ảnh câu hỏi gốc</h3>
          <button class="ui-btn ui-btn-ghost ui-btn-sm" id="btnCloseLightbox">✕ Đóng</button>
        </div>
        <p style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); margin-top:4px;" id="lightboxFilename"></p>
        <div style="text-align:center; margin-top:var(--ui-space-4);">
          <img id="lightboxImage" src="" alt="Ảnh câu hỏi gốc" style="max-width:100%; height:auto; border-radius:var(--ui-radius-md); border:1px solid var(--ui-border-subtle);">
        </div>
      </div>
    </div>
  `;

  // Timer Logic
  const timerText = container.querySelector('#quizTimerText');
  const durationSec = session.durationSec || 0;
  const startedAt = session.startedAt || Date.now();

  function updateTimer() {
    if (durationSec <= 0 || submitted) {
      if (timerText) timerText.textContent = 'Không giới hạn';
      return;
    }
    const elapsed = Math.floor((Date.now() - startedAt) / 1000);
    const remain = Math.max(0, durationSec - elapsed);
    const m = Math.floor(remain / 60);
    const s = remain % 60;
    if (timerText) {
      timerText.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    if (remain <= 0 && !submitted) {
      cleanupQuizScreen();
      alert('Đã hết thời gian làm bài! Hệ thống tự động nộp bài.');
      finishAndSubmit();
    }
  }

  if (durationSec > 0 && !submitted) {
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
  } else {
    updateTimer();
  }

  // Save session state to Store
  function persistSession() {
    session.currentIndex = idx;
    session.answers = userAnswers;
    session.flags = Array.from(flags);
    session.checked = checkedQuestions;
    session.submitted = submitted;
    store.saveActiveSession(session);
  }

  // Update Nav Matrix
  function updateNavGrid() {
    const navGrid = container.querySelector('#questionNavGrid');
    const badge = container.querySelector('#progressBadge');
    if (!navGrid) return;

    const doneCount = Object.keys(userAnswers).length;
    if (badge) badge.textContent = `${doneCount}/${questions.length} Đã làm`;

    navGrid.innerHTML = '';
    questions.forEach((q, i) => {
      const cell = document.createElement('button');
      cell.className = 'ui-nav-cell';
      cell.type = 'button';
      cell.setAttribute('aria-label', `Câu hỏi số ${i + 1}`);

      if (i === idx) cell.classList.add('current');
      if (userAnswers[q.id] !== undefined) cell.classList.add('answered');
      if (flags.has(q.id)) cell.classList.add('flagged');

      // Check practice verified styling
      if (checkedQuestions[q.id] || submitted) {
        const isCorr = userAnswers[q.id] === q.answer;
        cell.classList.add(isCorr ? 'correct' : 'wrong');
      }

      cell.textContent = i + 1;
      cell.onclick = () => {
        idx = i;
        renderCurrentQuestion();
      };
      navGrid.appendChild(cell);
    });
  }

  // Render Question
  async function renderCurrentQuestion() {
    const q = questions[idx];
    if (!q) return;

    persistSession();
    updateNavGrid();

    // Update Flag button state
    const flagBtn = container.querySelector('#btnToggleFlag');
    const flagIcon = container.querySelector('#flagIcon');
    const flagText = container.querySelector('#flagText');
    const isCurFlagged = flags.has(q.id);
    if (flagIcon) flagIcon.textContent = isCurFlagged ? '⭐' : '☆';
    if (flagText) flagText.textContent = isCurFlagged ? 'Đã đánh dấu' : 'Đánh dấu';
    if (flagBtn) flagBtn.classList.toggle('ui-btn-primary', isCurFlagged);

    const questionCard = container.querySelector('#questionCard');
    if (!questionCard) return;

    // Check verification status badge
    let statusBadgeHtml = '';
    const isPending = q.answer_status === 'pending';
    if (q.answer_status === 'verified') {
      statusBadgeHtml = `<span class="ui-badge ui-badge-success">✓ Đã kiểm chứng (Verified)</span>`;
    } else if (isPending) {
      statusBadgeHtml = `<span class="ui-badge" style="background:#64748b; color:#ffffff;">⏳ Chưa xử lý</span>`;
    } else {
      statusBadgeHtml = `<span class="ui-badge ui-badge-warning">⚠️ Đang chờ xác minh</span>`;
    }

    // Code block if present
    const codeBlockHtml = q.code
      ? `<pre class="ui-code"><code>${escapeHtml(q.code)}</code></pre>`
      : '';

    // Image display logic:
    // - Pending question: displays image directly because it has no LaTeX yet
    // - Converted question: hides image by default behind an accordion toggle
    let imageContainerHtml = '';
    if (q.image) {
      if (isPending) {
        imageContainerHtml = `
          <div style="margin:var(--ui-space-3) 0; text-align:center; background:rgba(0,0,0,0.02); padding:var(--ui-space-3); border-radius:var(--ui-radius-md); border:1px solid var(--ui-border-subtle);">
            <img src="${q.image}" alt="Đề bài gốc câu ${q.id}" style="max-width:100%; max-height:480px; border-radius:var(--ui-radius-sm);" onerror="this.style.display='none'">
          </div>
        `;
      } else {
        imageContainerHtml = `
          <details style="margin:var(--ui-space-3) 0;">
            <summary class="ui-btn ui-btn-ghost ui-btn-sm" style="cursor:pointer; display:inline-flex; align-items:center; gap:6px; user-select:none;">
              🖼️ Xem ảnh đề gốc (đối chiếu)
            </summary>
            <div style="margin-top:var(--ui-space-2); text-align:center; padding:var(--ui-space-2); background:rgba(0,0,0,0.02); border-radius:var(--ui-radius-md); border:1px solid var(--ui-border-subtle);">
              <img src="${q.image}" alt="Ảnh đối chiếu câu ${q.id}" style="max-width:100%; max-height:420px; border-radius:var(--ui-radius-sm);">
            </div>
          </details>
        `;
      }
    }

    // Figures rendering (Graphs / Trees / Diagrams rendered via vector SVG)
    let figuresHtml = '';
    if (Array.isArray(q.figures) && q.figures.length > 0) {
      figuresHtml = `
        <div class="ui-figures-container" style="display:flex; justify-content:center; align-items:flex-start; gap:var(--ui-space-6); flex-wrap:wrap; margin:var(--ui-space-4) 0; padding:var(--ui-space-4); background:rgba(0,0,0,0.015); border-radius:var(--ui-radius-lg); border:1px dashed var(--ui-border-subtle);">
          ${q.figures.map(fig => renderFigureSVG(fig)).join('')}
        </div>
      `;
    }

    // Options rendering
    const userSelected = userAnswers[q.id] || null;
    const isChecked = checkedQuestions[q.id] || submitted;

    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const optCount = (Array.isArray(q.options) && q.options.length > 0) ? q.options.length : 4;
    const optionsLetters = alphabet.slice(0, Math.max(2, optCount));
    const optionsHtml = optionsLetters.map((letter, optIdx) => {
      let optText = q.options && q.options[optIdx] !== undefined 
        ? q.options[optIdx] 
        : `<span style="color:var(--ui-text-muted); font-style:italic;">Phương án ${letter} (Xem nội dung trong ảnh đề gốc)</span>`;
      let itemCls = 'ui-option-item';
      if (userSelected === letter) itemCls += ' selected';
      if (isChecked) {
        if (letter === q.answer) itemCls += ' correct';
        else if (userSelected === letter && userSelected !== q.answer) itemCls += ' wrong';
      }

      return `
        <div class="${itemCls}" data-opt="${letter}" tabindex="0" role="button" aria-label="Đáp án ${letter}">
          <div class="ui-option-key">${letter}</div>
          <div class="ui-option-content">${optText}</div>
        </div>
      `;
    }).join('');

    // Explanation Section
    let explanationHtml = '';
    const hasExplanation = Array.isArray(q.explanation) && q.explanation.length > 0;
    const showExplanation = isChecked && hasExplanation;

    if (hasExplanation) {
      const stepsHtml = q.explanation.map(step => `
        <div class="ui-step-item">
          <div>${step}</div>
        </div>
      `).join('');

      explanationHtml = `
        <div class="ui-accordion" id="explanationAccordion" style="${showExplanation ? 'display:block;' : 'display:none;'}">
          <div class="ui-accordion-header" id="accordionToggle">
            <span style="display:flex; align-items:center; gap:var(--ui-space-2); color:var(--ui-success);">
              <span>💡</span> Hướng Dẫn Giải Chi Tiết Từng Bước
            </span>
            <span id="accordionArrow">▼</span>
          </div>
          <div class="ui-accordion-content" id="accordionBody">
            ${stepsHtml}
          </div>
        </div>
      `;
    } else if (isPending && isChecked) {
      explanationHtml = `
        <div class="ui-card" style="margin-top:var(--ui-space-4); background:var(--ui-bg-subtle, #f8fafc); border-left:4px solid var(--ui-accent); padding:var(--ui-space-3);">
          <div style="font-weight:700; color:var(--ui-accent); margin-bottom:4px;">
            Đáp án theo ngân hàng đề gốc: ${q.answer}
          </div>
          <p style="margin:0; font-size:var(--ui-text-xs); color:var(--ui-text-muted);">
            Câu hỏi này đang ở trạng thái "Chưa xử lý" (chưa được chép sang LaTeX và chưa giải chi tiết từng bước).
          </p>
        </div>
      `;
    }

    questionCard.innerHTML = `
      <!-- Header -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:var(--ui-space-4); padding-bottom:var(--ui-space-3); border-bottom:1px solid var(--ui-border-subtle); flex-wrap:wrap; gap:var(--ui-space-2);">
        <div>
          <div style="font-size:var(--ui-text-xl); font-weight:800;">
            Câu ${q.id} <span style="font-size:var(--ui-text-sm); font-weight:500; color:var(--ui-text-muted);">(Câu ${idx + 1} / ${questions.length})</span>
          </div>
          <div style="margin-top:6px; display:flex; gap:var(--ui-space-2); align-items:center; flex-wrap:wrap;">
            <span class="ui-badge ui-badge-accent">${q.chapterShort || 'Toán rời rạc'}</span>
            ${statusBadgeHtml}
          </div>
        </div>

        <button class="ui-btn ui-btn-secondary ui-btn-sm" id="btnOpenLightbox">
          🔍 Xem ảnh đề gốc
        </button>
      </div>

      <!-- Question Text -->
      <div style="font-size:var(--ui-text-base); line-height:1.7; margin-bottom:var(--ui-space-4);" id="questionTextContainer">
        ${isPending 
          ? `<div style="padding:var(--ui-space-3); background:var(--ui-bg-subtle, #f8fafc); border-radius:var(--ui-radius-sm); border:1px solid var(--ui-border-subtle); color:var(--ui-text-muted); font-size:var(--ui-text-sm);">
               ⏳ <strong>Câu hỏi chưa xử lý:</strong> Đang hiển thị ảnh đề bài gốc bên dưới để bạn luyện tập đối chiếu.
             </div>`
          : (q.question || '')
        }
      </div>

      <!-- Figures Container (Graphs / Trees rendered via vector SVG) -->
      ${figuresHtml}

      <!-- Code Block -->
      ${codeBlockHtml}

      <!-- Image -->
      ${imageContainerHtml}

      <!-- Options List -->
      <div class="ui-options-list" id="optionsContainer">
        ${optionsHtml}
      </div>

      <!-- Actions -->
      <div style="display:flex; justify-content:space-between; align-items:center; gap:var(--ui-space-2); margin-top:var(--ui-space-6); flex-wrap:wrap;">
        <div style="display:flex; gap:var(--ui-space-2);">
          <button class="ui-btn ui-btn-secondary" id="btnPrev" ${idx === 0 ? 'disabled' : ''}>
            ← Câu trước
          </button>
          <button class="ui-btn ui-btn-secondary" id="btnNext" ${idx === questions.length - 1 ? 'disabled' : ''}>
            Câu sau →
          </button>
        </div>

        <div style="display:flex; gap:var(--ui-space-2);">
          ${isPracticeMode ? `
            <button class="ui-btn ui-btn-success" id="btnCheckAnswer">
              💡 Kiểm tra đáp án
            </button>
          ` : ''}
          <button class="ui-btn ui-btn-primary" id="btnQuickNext">
            ${idx === questions.length - 1 ? 'Nộp bài ngay' : 'Tiếp tục →'}
          </button>
        </div>
      </div>

      <!-- Shortcuts hint -->
      <div style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); display:flex; gap:var(--ui-space-2); align-items:center; margin-top:var(--ui-space-5); flex-wrap:wrap;">
        <span>Phím tắt:</span>
        <span class="kbd-chip">1-4 / A-D</span>: Chọn đáp án |
        <span class="kbd-chip">← / →</span>: Chuyển câu |
        <span class="kbd-chip">F</span>: Đánh dấu |
        <span class="kbd-chip">Enter</span>: Tiếp tục
      </div>

      <!-- Explanation Box -->
      ${explanationHtml}
    `;

    // Typeset MathJax on question container
    await typesetElement(questionCard);

    // Attach Option Click Listeners
    questionCard.querySelectorAll('.ui-option-item').forEach(item => {
      item.addEventListener('click', () => {
        const selectedLetter = item.getAttribute('data-opt');
        userAnswers[q.id] = selectedLetter;
        persistSession();
        renderCurrentQuestion();
      });
    });

    // Check Answer in Practice Mode
    const checkBtn = questionCard.querySelector('#btnCheckAnswer');
    if (checkBtn) {
      checkBtn.addEventListener('click', () => {
        if (!userAnswers[q.id]) {
          alert('Vui lòng chọn một phương án trước khi kiểm tra!');
          return;
        }
        checkedQuestions[q.id] = true;
        persistSession();
        renderCurrentQuestion();
      });
    }

    // Prev / Next Buttons
    const prevBtn = questionCard.querySelector('#btnPrev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (idx > 0) {
          idx--;
          renderCurrentQuestion();
        }
      });
    }

    const nextBtn = questionCard.querySelector('#btnNext');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (idx < questions.length - 1) {
          idx++;
          renderCurrentQuestion();
        }
      });
    }

    const quickNextBtn = questionCard.querySelector('#btnQuickNext');
    if (quickNextBtn) {
      quickNextBtn.addEventListener('click', () => {
        if (idx < questions.length - 1) {
          idx++;
          renderCurrentQuestion();
        } else {
          finishAndSubmit();
        }
      });
    }

    // Lightbox triggers
    const openLightboxBtn = questionCard.querySelector('#btnOpenLightbox');
    if (openLightboxBtn) {
      openLightboxBtn.addEventListener('click', () => {
        const modal = container.querySelector('#lightboxModal');
        const img = container.querySelector('#lightboxImage');
        const fname = container.querySelector('#lightboxFilename');
        const title = container.querySelector('#lightboxTitle');
        if (modal && img) {
          img.src = q.image;
          if (fname) fname.textContent = `Tệp: ${q.image}`;
          if (title) title.textContent = `Ảnh đề gốc câu ${q.id}`;
          modal.classList.add('active');
        }
      });
    }

    // Accordion toggle
    const accToggle = questionCard.querySelector('#accordionToggle');
    if (accToggle) {
      accToggle.addEventListener('click', () => {
        const body = questionCard.querySelector('#accordionBody');
        const arrow = questionCard.querySelector('#accordionArrow');
        if (body && arrow) {
          const isHidden = body.style.display === 'none';
          body.style.display = isHidden ? 'block' : 'none';
          arrow.textContent = isHidden ? '▲' : '▼';
        }
      });
    }
  }

  // Finish and Submit Quiz
  function finishAndSubmit() {
    const answeredCount = Object.keys(userAnswers).length;
    const unanswered = questions.length - answeredCount;

    if (unanswered > 0 && !confirm(`Bạn còn ${unanswered} câu chưa làm. Bạn có chắc chắn muốn nộp bài không?`)) {
      return;
    }

    cleanupQuizScreen();
    submitted = true;

    // Calculate score using EXACT legacy grading logic
    let correctCount = 0;
    const wrongQIds = [];
    const breakdown = {};

    questions.forEach(q => {
      const uAns = userAnswers[q.id];
      const isCorrect = uAns && (uAns === q.answer || (Array.isArray(q.answer) && q.answer.includes(uAns)));
      
      if (isCorrect) {
        correctCount++;
      } else {
        wrongQIds.push(q.id);
      }

      // Breakdown by chapter
      const chId = q.chapterId || 0;
      if (!breakdown[chId]) {
        breakdown[chId] = { total: 0, correct: 0, name: q.chapterShort || 'Chương ' + chId };
      }
      breakdown[chId].total++;
      if (isCorrect) breakdown[chId].correct++;
    });

    const elapsedSec = Math.floor((Date.now() - startedAt) / 1000);
    const scorePercent = Math.round((correctCount / questions.length) * 100);
    const score10 = Math.round((correctCount / questions.length) * 100) / 10;

    // Record in history store
    const resultRecord = {
      score: score10,
      scorePercent: scorePercent,
      total: questions.length,
      correct: correctCount,
      wrong: questions.length - correctCount,
      durationSec: elapsedSec,
      mode: session.mode,
      chapterName: session.chapterName,
      chapterId: session.chapterId,
      breakdown: breakdown,
      wrongQuestionIds: wrongQIds,
      answers: userAnswers,
      questions: questions
    };

    store.addHistory(resultRecord);
    store.clearActiveSession();

    // Store last result temporarily for result screen
    sessionStorage.setItem('mad101_last_result', JSON.stringify(resultRecord));
    router.navigate('result');
  }

  // Bind Top Bar Actions
  container.querySelector('#btnBackToHome').addEventListener('click', () => {
    persistSession();
    cleanupQuizScreen();
    router.navigate('home');
  });

  container.querySelector('#btnToggleFlag').addEventListener('click', () => {
    const q = questions[idx];
    if (!q) return;
    if (flags.has(q.id)) {
      flags.delete(q.id);
      store.toggleBookmark(q.id); // Also sync with profile bookmarks
    } else {
      flags.add(q.id);
      store.toggleBookmark(q.id);
    }
    persistSession();
    renderCurrentQuestion();
  });

  container.querySelector('#btnSubmitQuiz').addEventListener('click', finishAndSubmit);

  // Lightbox close listeners
  const lightboxModal = container.querySelector('#lightboxModal');
  const btnCloseLightbox = container.querySelector('#btnCloseLightbox');
  if (btnCloseLightbox && lightboxModal) {
    btnCloseLightbox.addEventListener('click', () => lightboxModal.classList.remove('active'));
    lightboxModal.addEventListener('click', () => lightboxModal.classList.remove('active'));
  }

  // Keyboard Shortcuts Listener
  currentKeyHandler = (e) => {
    // If modal is active, close on Escape
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'Escape') lightboxModal.classList.remove('active');
      return;
    }

    const key = e.key.toUpperCase();
    const q = questions[idx];
    if (!q) return;

    if (['1', 'A'].includes(key)) {
      userAnswers[q.id] = 'A';
      persistSession();
      renderCurrentQuestion();
    } else if (['2', 'B'].includes(key)) {
      userAnswers[q.id] = 'B';
      persistSession();
      renderCurrentQuestion();
    } else if (['3', 'C'].includes(key)) {
      userAnswers[q.id] = 'C';
      persistSession();
      renderCurrentQuestion();
    } else if (['4', 'D'].includes(key)) {
      userAnswers[q.id] = 'D';
      persistSession();
      renderCurrentQuestion();
    } else if (key === 'F') {
      container.querySelector('#btnToggleFlag').click();
    } else if (e.key === 'ArrowRight' || key === 'N') {
      if (idx < questions.length - 1) {
        idx++;
        renderCurrentQuestion();
      }
    } else if (e.key === 'ArrowLeft' || key === 'P') {
      if (idx > 0) {
        idx--;
        renderCurrentQuestion();
      }
    } else if (e.key === 'Enter') {
      if (isPracticeMode && !checkedQuestions[q.id]) {
        checkedQuestions[q.id] = true;
        persistSession();
        renderCurrentQuestion();
      } else if (idx < questions.length - 1) {
        idx++;
        renderCurrentQuestion();
      }
    }
  };

  document.addEventListener('keydown', currentKeyHandler);

  // Initial render
  renderCurrentQuestion();
}
