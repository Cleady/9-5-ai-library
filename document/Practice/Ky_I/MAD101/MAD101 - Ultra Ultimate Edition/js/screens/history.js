/**
 * MAD101 STUDIO — HISTORY & STATS SCREEN
 * js/screens/history.js
 */

import { store } from '../store.js';
import { router } from '../router.js';

export function renderHistoryScreen(container) {
  const profile = store.getProfile();
  const history = profile.history || [];
  const bookmarks = store.getBookmarks();
  const wrongIds = store.getWrongQuestionIds();

  // Metrics
  const totalExams = history.length;
  let maxScore = 0;
  let sumScore = 0;
  let totalTimeSec = 0;

  history.forEach(h => {
    const sc = h.scorePercent || 0;
    if (sc > maxScore) maxScore = sc;
    sumScore += sc;
    totalTimeSec += h.durationSec || 0;
  });

  const avgScore = totalExams > 0 ? Math.round(sumScore / totalExams) : 0;
  const totalHours = (totalTimeSec / 3600).toFixed(1);

  // History entries list
  let historyListHtml = '';
  if (history.length === 0) {
    historyListHtml = `
      <div class="ui-card ui-empty-state">
        <div class="ui-empty-icon">📅</div>
        <h3>Chưa có lịch sử làm bài</h3>
        <p style="font-size:var(--ui-text-sm); color:var(--ui-text-muted); margin-top:4px;">
          Kết quả các bài thi của bạn sẽ được lưu tự động tại đây để theo dõi tiến trình ôn tập.
        </p>
      </div>
    `;
  } else {
    historyListHtml = history.map((item, index) => {
      const dateStr = new Date(item.date).toLocaleString('vi-VN', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });
      const pct = item.scorePercent || 0;
      let badgeCls = 'ui-badge-success';
      if (pct < 50) badgeCls = 'ui-badge-danger';
      else if (pct < 80) badgeCls = 'ui-badge-warning';

      return `
        <div class="ui-card" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:var(--ui-space-3); margin-bottom:var(--ui-space-3);">
          <div>
            <div style="display:flex; align-items:center; gap:var(--ui-space-2);">
              <strong>${item.chapterName || 'Bài thi trắc nghiệm'}</strong>
              <span class="ui-badge ${badgeCls}">${item.score || (pct / 10).toFixed(1)}/10 (${pct}%)</span>
              <span class="ui-badge ui-badge-info" style="text-transform:uppercase;">${item.mode || 'exam'}</span>
            </div>
            <div style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); margin-top:4px;">
              <span>📅 ${dateStr}</span> • 
              <span>Đúng: <strong style="color:var(--ui-success);">${item.correct}/${item.total}</strong> câu</span> • 
              <span>Thời gian: ${Math.floor((item.durationSec || 0) / 60)} phút</span>
            </div>
          </div>

          <button class="ui-btn ui-btn-secondary ui-btn-sm" data-idx="${index}">
            Xem chi tiết →
          </button>
        </div>
      `;
    }).join('');
  }

  container.innerHTML = `
    <div style="max-width:960px; margin:0 auto;">
      <div style="margin-bottom:var(--ui-space-6); display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:var(--ui-space-3);">
        <div>
          <a href="#/home" class="ui-btn ui-btn-ghost" style="padding-left:0;">← Về trang chủ</a>
          <h1 style="font-size:var(--ui-text-2xl); font-weight:800; margin-top:var(--ui-space-2);">
            Lịch Sử & Nhật Ký Học Tập
          </h1>
          <p style="font-size:var(--ui-text-sm); color:var(--ui-text-muted);">
            Thống kê quá trình làm bài và lưu trữ kết quả của bạn
          </p>
        </div>

        <div style="display:flex; gap:var(--ui-space-2);">
          <a href="#/setup?filter=flagged" class="ui-btn ui-btn-secondary">
            ⭐ Luyện ${bookmarks.length} câu đánh dấu
          </a>
          <a href="#/setup?filter=wrong" class="ui-btn ui-btn-secondary">
            ❌ Luyện ${wrongIds.length} câu sai
          </a>
        </div>
      </div>

      <!-- Quick Metrics -->
      <section style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:var(--ui-space-3); margin-bottom:var(--ui-space-6);">
        <div class="ui-card" style="text-align:center; padding:var(--ui-space-4);">
          <div style="font-size:var(--ui-text-3xl); font-weight:900; color:var(--ui-accent);">${totalExams}</div>
          <div style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); text-transform:uppercase; margin-top:4px;">Tổng bài thi đã nộp</div>
        </div>
        <div class="ui-card" style="text-align:center; padding:var(--ui-space-4);">
          <div style="font-size:var(--ui-text-3xl); font-weight:900; color:var(--ui-success);">${maxScore}%</div>
          <div style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); text-transform:uppercase; margin-top:4px;">Điểm cao nhất</div>
        </div>
        <div class="ui-card" style="text-align:center; padding:var(--ui-space-4);">
          <div style="font-size:var(--ui-text-3xl); font-weight:900; color:var(--ui-info);">${avgScore}%</div>
          <div style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); text-transform:uppercase; margin-top:4px;">Điểm trung bình</div>
        </div>
        <div class="ui-card" style="text-align:center; padding:var(--ui-space-4);">
          <div style="font-size:var(--ui-text-3xl); font-weight:900; color:#a855f7;">${totalHours}h</div>
          <div style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); text-transform:uppercase; margin-top:4px;">Tổng thời lượng luyện</div>
        </div>
      </section>

      <!-- History List -->
      <section>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--ui-space-4);">
          <h2 style="font-size:var(--ui-text-lg); font-weight:800;">Các Bài Thi Gần Đây</h2>
          ${history.length > 0 ? `
            <button class="ui-btn ui-btn-danger ui-btn-sm" id="btnClearHistory">
              Xóa toàn bộ lịch sử
            </button>
          ` : ''}
        </div>

        <div>
          ${historyListHtml}
        </div>
      </section>
    </div>
  `;

  // Details button handler
  container.querySelectorAll('button[data-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-idx'));
      const item = history[idx];
      if (item) {
        sessionStorage.setItem('mad101_last_result', JSON.stringify(item));
        router.navigate('result');
      }
    });
  });

  // Clear history handler
  const clearBtn = container.querySelector('#btnClearHistory');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Bạn có chắc chắn muốn xóa tất cả lịch sử thi không? Dữ liệu câu đánh dấu sẽ vẫn được giữ lại.')) {
        profile.history = [];
        store.saveProfile();
        renderHistoryScreen(container);
      }
    });
  }
}
