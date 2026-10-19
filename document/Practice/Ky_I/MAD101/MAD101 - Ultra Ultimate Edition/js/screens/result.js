/**
 * MAD101 STUDIO — RESULT & SCORE SCREEN
 * js/screens/result.js
 */

import { store } from '../store.js';
import { router } from '../router.js';
import { typesetElement } from '../mathjax-render.js';

export async function renderResultScreen(container) {
  // Try getting from session storage or latest history
  let record = null;
  const rawLast = sessionStorage.getItem('mad101_last_result');
  if (rawLast) {
    try { record = JSON.parse(rawLast); } catch (e) {}
  }

  if (!record) {
    const profile = store.getProfile();
    if (profile.history && profile.history.length > 0) {
      record = profile.history[0];
    }
  }

  if (!record) {
    container.innerHTML = `
      <div class="ui-card ui-empty-state">
        <div class="ui-empty-icon">📊</div>
        <h2>Chưa có kết quả thi nào</h2>
        <p style="margin-top:8px; font-size:var(--ui-text-sm); color:var(--ui-text-muted);">
          Hãy bắt đầu một bài thi để xem báo cáo điểm số và phân tích năng lực.
        </p>
        <div style="margin-top:var(--ui-space-6);">
          <a href="#/home" class="ui-btn ui-btn-primary">Về trang chủ</a>
        </div>
      </div>
    `;
    return;
  }

  const score10 = record.score !== undefined ? record.score : Math.round((record.correct / record.total) * 100) / 10;
  const scorePercent = record.scorePercent !== undefined ? record.scorePercent : Math.round((record.correct / record.total) * 100);
  const minutes = Math.floor((record.durationSec || 0) / 60);
  const seconds = (record.durationSec || 0) % 60;
  const avgSpeed = record.total > 0 ? ((record.durationSec || 0) / record.total).toFixed(1) : 0;

  // Status message
  let statusTitle = "Đạt Yêu Cầu";
  let statusDesc = "Bạn đã hoàn thành bài thi với kết quả tốt. Tiếp tục rèn luyện để nâng cao tốc độ!";
  if (scorePercent >= 85) {
    statusTitle = "Xuất Sắc! Tinh Hoa MAD101";
    statusDesc = "Khả năng tư duy logic và nắm vững thuật toán của bạn rất tốt, sẵn sàng cho kỳ thi cuối kỳ!";
  } else if (scorePercent < 50) {
    statusTitle = "Cần Củng Cố Kiến Thức";
    statusDesc = "Hãy xem kỹ hướng dẫn giải của các câu làm sai và luyện tập thêm các chương có độ chính xác thấp.";
  }

  // Chapter breakdown rows
  const breakdown = record.breakdown || {};
  const breakdownRowsHtml = Object.entries(breakdown).map(([chId, b]) => {
    const pct = b.total > 0 ? Math.round((b.correct / b.total) * 100) : 0;
    let barColor = 'var(--ui-accent)';
    if (pct >= 80) barColor = 'var(--ui-success)';
    else if (pct < 50) barColor = 'var(--ui-danger)';
    else barColor = 'var(--ui-warning)';

    return `
      <div style="display:flex; flex-direction:column; gap:6px;">
        <div style="display:flex; justify-content:space-between; font-size:var(--ui-text-xs); font-weight:700;">
          <span>${b.name || 'Chương ' + chId}</span>
          <span style="color:${barColor}; font-weight:800;">${b.correct}/${b.total} (${pct}%)</span>
        </div>
        <div class="ui-progress-bar">
          <div class="ui-progress-fill" style="width:${pct}%; background:${barColor};"></div>
        </div>
      </div>
    `;
  }).join('');

  // Wrong questions list
  const wrongIds = record.wrongQuestionIds || [];
  let wrongListHtml = '';
  if (wrongIds.length === 0) {
    wrongListHtml = `
      <div style="text-align:center; padding:var(--ui-space-6); color:var(--ui-success);">
        <div style="font-size:36px;">🎉</div>
        <p style="font-weight:700; margin-top:8px;">Tuyệt đỉnh! Bạn không làm sai câu nào!</p>
      </div>
    `;
  } else {
    wrongListHtml = wrongIds.map((qid, idx) => {
      const q = (record.questions || []).find(x => x.id === qid) || { id: qid, question: `Câu số ${qid}`, answer: '?' };
      const userAns = record.answers ? record.answers[qid] : 'Chưa chọn';

      return `
        <div style="background:var(--ui-bg-glass-card); border:1px solid var(--ui-border-subtle); border-left:4px solid var(--ui-danger); border-radius:var(--ui-radius-md); padding:var(--ui-space-3); margin-bottom:var(--ui-space-3);">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong>Câu ${q.id}</strong>
            <span class="ui-badge ui-badge-danger">Sai</span>
          </div>
          <div style="font-size:var(--ui-text-sm); line-height:1.5; margin:6px 0;">
            ${q.question}
          </div>
          <div style="font-size:var(--ui-text-xs); background:rgba(0,0,0,0.25); padding:var(--ui-space-2); border-radius:var(--ui-radius-sm);">
            <div>❌ Bạn đã chọn: <strong style="color:var(--ui-danger);">${userAns || '(Chưa làm)'}</strong></div>
            <div>✓ Đáp án đúng: <strong style="color:var(--ui-success);">${q.answer}</strong></div>
          </div>
        </div>
      `;
    }).join('');
  }

  container.innerHTML = `
    <div style="max-width:1100px; margin:0 auto;">
      <!-- Hero Score Summary Card -->
      <section class="ui-card" style="background:linear-gradient(135deg, rgba(249,115,22,0.14), rgba(17,28,51,0.9)); border-color:rgba(249,115,22,0.4); text-align:center; padding:var(--ui-space-8) var(--ui-space-4); margin-bottom:var(--ui-space-6);">
        <div style="display:inline-flex; flex-direction:column; align-items:center; justify-content:center; width:160px; height:160px; border-radius:50%; background:radial-gradient(circle, rgba(249,115,22,0.25) 0%, rgba(11,18,32,0.7) 70%); border:3px solid var(--ui-accent); box-shadow:0 0 30px rgba(249,115,22,0.45); margin-bottom:var(--ui-space-4);">
          <div style="font-size:var(--ui-text-4xl); font-weight:900; line-height:1; color:var(--ui-text-primary);">${score10}</div>
          <div style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); font-weight:700; margin-top:2px;">/ 10 ĐIỂM (${scorePercent}%)</div>
        </div>

        <h1 style="font-size:var(--ui-text-2xl); font-weight:800; margin-bottom:var(--ui-space-2);">${statusTitle}</h1>
        <p style="font-size:var(--ui-text-sm); color:var(--ui-text-secondary); max-width:600px; margin:0 auto;">
          ${statusDesc}
        </p>

        <!-- Actions -->
        <div style="margin-top:var(--ui-space-6); display:flex; justify-content:center; gap:var(--ui-space-3); flex-wrap:wrap;">
          ${wrongIds.length > 0 ? `
            <button class="ui-btn ui-btn-primary" id="btnRetryWrong">
              🔥 Làm lại ${wrongIds.length} câu sai ngay
            </button>
          ` : ''}
          <button class="ui-btn ui-btn-secondary" id="btnRetryAll">
            🔄 Thi lại toàn bộ đề này
          </button>
          <a href="#/home" class="ui-btn ui-btn-ghost">
            🏠 Về trang chủ
          </a>
        </div>
      </section>

      <!-- Quick Metrics -->
      <section style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:var(--ui-space-3); margin-bottom:var(--ui-space-6);">
        <div class="ui-card" style="text-align:center; padding:var(--ui-space-4);">
          <div style="font-size:var(--ui-text-2xl); font-weight:900; color:var(--ui-success);">${record.correct}</div>
          <div style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); text-transform:uppercase; margin-top:4px;">Số câu đúng</div>
        </div>
        <div class="ui-card" style="text-align:center; padding:var(--ui-space-4);">
          <div style="font-size:var(--ui-text-2xl); font-weight:900; color:var(--ui-danger);">${record.wrong}</div>
          <div style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); text-transform:uppercase; margin-top:4px;">Số câu sai</div>
        </div>
        <div class="ui-card" style="text-align:center; padding:var(--ui-space-4);">
          <div style="font-size:var(--ui-text-2xl); font-weight:900; color:var(--ui-info);">${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}</div>
          <div style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); text-transform:uppercase; margin-top:4px;">Thời gian thi</div>
        </div>
        <div class="ui-card" style="text-align:center; padding:var(--ui-space-4);">
          <div style="font-size:var(--ui-text-2xl); font-weight:900; color:var(--ui-accent);">${avgSpeed}s</div>
          <div style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); text-transform:uppercase; margin-top:4px;">Tốc độ TB / câu</div>
        </div>
      </section>

      <!-- 2 Columns: Chapter Breakdown & Wrong Questions -->
      <div class="ui-layout-2col">
        <!-- Left: Chapter Breakdown -->
        <section class="ui-card">
          <h2 style="font-size:var(--ui-text-lg); font-weight:800; margin-bottom:var(--ui-space-2);">
            Phân Tích Năng Lực Theo Chương
          </h2>
          <p style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); margin-bottom:var(--ui-space-4);">
            Tỷ lệ làm đúng trên từng phần kiến thức của bài thi
          </p>
          <div style="display:flex; flex-direction:column; gap:var(--ui-space-4);">
            ${breakdownRowsHtml || '<p style="color:var(--ui-text-muted);">Không có dữ liệu phân loại chương.</p>'}
          </div>
        </section>

        <!-- Right: Wrong Questions Review -->
        <section class="ui-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--ui-space-4);">
            <h2 style="font-size:var(--ui-text-lg); font-weight:800;">
              Sổ Tay Câu Sai (${wrongIds.length})
            </h2>
            ${wrongIds.length > 0 ? `<span class="ui-badge ui-badge-danger">${wrongIds.length} câu</span>` : ''}
          </div>
          <div style="max-height:450px; overflow-y:auto; padding-right:4px;" id="wrongQuestionsList">
            ${wrongListHtml}
          </div>
        </section>
      </div>
    </div>
  `;

  await typesetElement(container);

  // Button: Retry only wrong
  const btnRetryWrong = container.querySelector('#btnRetryWrong');
  if (btnRetryWrong && wrongIds.length > 0) {
    btnRetryWrong.addEventListener('click', () => {
      const wrongQuestions = (record.questions || []).filter(q => wrongIds.includes(q.id));
      const session = {
        questions: wrongQuestions,
        currentIndex: 0,
        answers: {},
        flags: [],
        mode: 'practice',
        chapterId: record.chapterId || 0,
        chapterName: `Luyện lại ${wrongQuestions.length} câu sai`,
        durationSec: 0,
        startedAt: Date.now(),
        submitted: false
      };
      store.saveActiveSession(session);
      router.navigate('quiz');
    });
  }

  // Button: Retry all
  const btnRetryAll = container.querySelector('#btnRetryAll');
  if (btnRetryAll) {
    btnRetryAll.addEventListener('click', () => {
      const session = {
        questions: record.questions || [],
        currentIndex: 0,
        answers: {},
        flags: [],
        mode: record.mode || 'exam',
        chapterId: record.chapterId || 0,
        chapterName: record.chapterName,
        durationSec: record.durationSec || 0,
        startedAt: Date.now(),
        submitted: false
      };
      store.saveActiveSession(session);
      router.navigate('quiz');
    });
  }
}
