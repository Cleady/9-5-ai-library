/**
 * MAD101 STUDIO — HOME SCREEN
 * js/screens/home.js
 */

import { store } from '../store.js';
import { CHAPTERS, getAllQuestions } from '../data.js';

export function renderHomeScreen(container) {
  const profile = store.getProfile();
  const activeSession = store.getActiveSession();
  const allQuestions = getAllQuestions();
  const totalQuestionsCount = allQuestions.length || 1131;

  // Calculate overall stats
  let totalAnswered = 0;
  let totalCorrect = 0;
  const history = profile.history || [];
  
  history.forEach(h => {
    totalAnswered += h.total || 0;
    totalCorrect += h.correct || 0;
  });

  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const bookmarksCount = (profile.bookmarks || []).length;
  const wrongCount = (profile.wrongQuestionIds || []).length;

  let sessionBannerHtml = '';
  if (activeSession && activeSession.questions && activeSession.questions.length > 0) {
    const answeredInSession = Object.keys(activeSession.answers || {}).length;
    const totalInSession = activeSession.questions.length;
    const chName = activeSession.config?.chapterName || 'Bài thi đang làm';
    
    sessionBannerHtml = `
      <section class="ui-card" style="background:linear-gradient(135deg, rgba(249,115,22,0.12), rgba(17,28,51,0.85)); border-color:rgba(249,115,22,0.4); margin-bottom:var(--ui-space-6); display:flex; flex-direction:column; gap:var(--ui-space-4);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:var(--ui-space-2);">
          <div>
            <div style="font-size:var(--ui-text-lg); font-weight:800; display:flex; align-items:center; gap:var(--ui-space-2);">
              <span>⏳</span> Tiếp tục bài thi đang dở
              <span class="ui-badge ui-badge-accent">${chName}</span>
            </div>
            <p style="font-size:var(--ui-text-sm); color:var(--ui-text-secondary); margin-top:4px;">
              Đã làm <strong>${answeredInSession}/${totalInSession}</strong> câu • Câu hiện tại: <strong>${(activeSession.currentIndex || 0) + 1}</strong>
            </p>
          </div>
          <div style="display:flex; gap:var(--ui-space-2);">
            <button class="ui-btn ui-btn-secondary ui-btn-sm" id="discardSessionBtn">Hủy bài</button>
            <a href="#/quiz" class="ui-btn ui-btn-primary ui-btn-sm">Tiếp tục ngay →</a>
          </div>
        </div>
        <div class="ui-progress-bar">
          <div class="ui-progress-fill" style="width:${Math.round((answeredInSession / totalInSession) * 100)}%;"></div>
        </div>
      </section>
    `;
  }

  // Render chapters cards
  const chapterCardsHtml = CHAPTERS.map(ch => {
    const chQuestions = allQuestions.filter(q => q.chapterId === ch.id);
    const count = chQuestions.length || (ch.range[1] - ch.range[0] + 1);
    
    // Check user history for this chapter
    let chDone = 0;
    let chCorrect = 0;
    history.forEach(h => {
      if (h.chapterId === ch.id) {
        chDone += h.total || 0;
        chCorrect += h.correct || 0;
      }
    });

    const chAcc = chDone > 0 ? Math.round((chCorrect / chDone) * 100) : 0;
    const progressPercent = Math.min(100, Math.round((chDone / count) * 100));

    return `
      <div class="ui-card" style="display:flex; flex-direction:column; justify-content:space-between; gap:var(--ui-space-4);">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <span style="font-size:var(--ui-text-xs); font-weight:800; color:var(--ui-accent); text-transform:uppercase;">Chương ${ch.id}</span>
            <span class="ui-badge ui-badge-info">${count} câu</span>
          </div>
          <div style="font-size:var(--ui-text-base); font-weight:800; margin-top:4px; line-height:1.35;">${ch.name}</div>
          <div style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); margin-top:2px;">${ch.english}</div>
        </div>

        <div>
          <div style="display:flex; justify-content:space-between; font-size:var(--ui-text-xs); color:var(--ui-text-secondary); margin-bottom:6px;">
            <span>Tiến độ: ${chDone}/${count}</span>
            <span style="color:var(--ui-success); font-weight:700;">${chAcc > 0 ? chAcc + '% đúng' : 'Chưa học'}</span>
          </div>
          <div class="ui-progress-bar">
            <div class="ui-progress-fill" style="width:${progressPercent}%;"></div>
          </div>
          <div style="margin-top:var(--ui-space-4);">
            <a href="#/setup?chapter=${ch.id}" class="ui-btn ui-btn-secondary" style="width:100%;">
              Luyện chương này →
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <!-- Hero Stats Grid -->
    <section style="display:grid; grid-template-columns:repeat(2,1fr); gap:var(--ui-space-3); margin-bottom:var(--ui-space-6);" class="hero-stats">
      <div class="ui-card" style="text-align:center; padding:var(--ui-space-4);">
        <div style="font-size:var(--ui-text-3xl); font-weight:900; color:var(--ui-accent);">${totalQuestionsCount}</div>
        <div style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); text-transform:uppercase; margin-top:4px;">Tổng câu hỏi</div>
      </div>
      <div class="ui-card" style="text-align:center; padding:var(--ui-space-4);">
        <div style="font-size:var(--ui-text-3xl); font-weight:900; color:var(--ui-info);">${totalAnswered}</div>
        <div style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); text-transform:uppercase; margin-top:4px;">Lượt câu đã ôn</div>
      </div>
      <div class="ui-card" style="text-align:center; padding:var(--ui-space-4);">
        <div style="font-size:var(--ui-text-3xl); font-weight:900; color:var(--ui-success);">${accuracy}%</div>
        <div style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); text-transform:uppercase; margin-top:4px;">Độ chính xác TB</div>
      </div>
      <div class="ui-card" style="text-align:center; padding:var(--ui-space-4);">
        <div style="font-size:var(--ui-text-3xl); font-weight:900; color:#a855f7;">${bookmarksCount}</div>
        <div style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); text-transform:uppercase; margin-top:4px;">Câu đã đánh dấu</div>
      </div>
    </section>

    <!-- Resume Session if exists -->
    ${sessionBannerHtml}

    <!-- Quick Action Cards -->
    <section style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:var(--ui-space-3); margin-bottom:var(--ui-space-8);">
      <a href="#/setup?quick=random50" class="ui-card ui-card-interactive" style="display:flex; flex-direction:column; gap:var(--ui-space-2);">
        <div style="font-size:24px;">⚡</div>
        <div style="font-weight:800; font-size:var(--ui-text-sm);">Thi thử nhanh</div>
        <div style="font-size:var(--ui-text-xs); color:var(--ui-text-muted);">50 câu ngẫu nhiên • 45 phút</div>
      </a>
      <a href="#/setup?filter=flagged" class="ui-card ui-card-interactive" style="display:flex; flex-direction:column; gap:var(--ui-space-2);">
        <div style="font-size:24px;">⭐</div>
        <div style="font-weight:800; font-size:var(--ui-text-sm);">Câu đã đánh dấu</div>
        <div style="font-size:var(--ui-text-xs); color:var(--ui-text-muted);">${bookmarksCount} câu cần ôn tập</div>
      </a>
      <a href="#/setup?filter=wrong" class="ui-card ui-card-interactive" style="display:flex; flex-direction:column; gap:var(--ui-space-2);">
        <div style="font-size:24px;">❌</div>
        <div style="font-weight:800; font-size:var(--ui-text-sm);">Sổ tay câu sai</div>
        <div style="font-size:var(--ui-text-xs); color:var(--ui-text-muted);">${wrongCount} câu từng làm sai</div>
      </a>
      <a href="#/setup" class="ui-card ui-card-interactive" style="display:flex; flex-direction:column; gap:var(--ui-space-2);">
        <div style="font-size:24px;">⚙️</div>
        <div style="font-weight:800; font-size:var(--ui-text-sm);">Tùy chỉnh đề thi</div>
        <div style="font-size:var(--ui-text-xs); color:var(--ui-text-muted);">Chọn chương, số lượng, thời gian</div>
      </a>
    </section>

    <!-- Chapter Grid Section -->
    <section>
      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:var(--ui-space-4); flex-wrap:wrap; gap:var(--ui-space-2);">
        <div>
          <h2 style="font-size:var(--ui-text-xl); font-weight:800;">Danh mục 8 Chương Giáo Trình</h2>
          <p style="font-size:var(--ui-text-xs); color:var(--ui-text-muted);">Discrete Mathematics and Its Applications (Kenneth H. Rosen)</p>
        </div>
        <a href="#/setup?chapter=0" class="ui-btn ui-btn-primary">
          Luyện toàn bộ (${totalQuestionsCount} câu) →
        </a>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:var(--ui-space-4);">
        ${chapterCardsHtml}
      </div>
    </section>
  `;

  // Discard session event
  const discardBtn = container.querySelector('#discardSessionBtn');
  if (discardBtn) {
    discardBtn.addEventListener('click', () => {
      if (confirm('Bạn có chắc chắn muốn hủy bài thi đang làm dở không?')) {
        store.clearActiveSession();
        renderHomeScreen(container);
      }
    });
  }
}
