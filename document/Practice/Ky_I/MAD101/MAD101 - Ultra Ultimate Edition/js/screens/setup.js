/**
 * MAD101 STUDIO — SETUP & CONFIG SCREEN
 * js/screens/setup.js
 */

import { CHAPTERS, getAllQuestions, getQuestionsByChapter, getQuestionsByFilter } from '../data.js';
import { store } from '../store.js';
import { router } from '../router.js';

export function renderSetupScreen(container, params = {}) {
  const preSelectedChapter = params.chapter !== undefined ? Number(params.chapter) : 0;
  const preFilter = params.filter || (params.quick === 'random50' ? 'all' : 'all');
  const allQuestions = getAllQuestions();

  // Quick 50 preset
  const isQuick50 = params.quick === 'random50';
  const defaultCount = isQuick50 ? 50 : 25;
  const defaultMinutes = isQuick50 ? 45 : 30;
  const defaultMode = isQuick50 ? 'exam' : 'practice';

  const chapterOptionsHtml = `
    <option value="0" ${preSelectedChapter === 0 ? 'selected' : ''}>Toàn bộ đề thi (Tất cả 8 chương)</option>
    ${CHAPTERS.map(ch => `
      <option value="${ch.id}" ${preSelectedChapter === ch.id ? 'selected' : ''}>
        Chương ${ch.id}: ${ch.shortName}
      </option>
    `).join('')}
  `;

  container.innerHTML = `
    <div style="max-width:760px; margin:0 auto;">
      <div style="margin-bottom:var(--ui-space-6);">
        <a href="#/home" class="ui-btn ui-btn-ghost" style="padding-left:0;">← Về trang chủ</a>
        <h1 style="font-size:var(--ui-text-2xl); font-weight:800; margin-top:var(--ui-space-2);">
          Cấu Hình Bài Luyện Thi
        </h1>
        <p style="font-size:var(--ui-text-sm); color:var(--ui-text-muted);">
          Tùy chỉnh nội dung, số lượng câu và thời gian thi theo mục tiêu ôn tập của bạn
        </p>
      </div>

      <div class="ui-card" style="display:flex; flex-direction:column; gap:var(--ui-space-5);">
        <!-- Chapter selection -->
        <div>
          <label style="font-size:var(--ui-text-xs); font-weight:700; color:var(--ui-text-muted); text-transform:uppercase; letter-spacing:0.05em; display:block; margin-bottom:6px;">
            1. Phạm vi chương ôn tập
          </label>
          <select id="setupChapter" class="ui-btn ui-btn-secondary" style="width:100%; text-align:left; font-size:var(--ui-text-sm); cursor:pointer;">
            ${chapterOptionsHtml}
          </select>
        </div>

        <!-- Filter mode -->
        <div>
          <label style="font-size:var(--ui-text-xs); font-weight:700; color:var(--ui-text-muted); text-transform:uppercase; letter-spacing:0.05em; display:block; margin-bottom:6px;">
            2. Bộ lọc câu hỏi
          </label>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:var(--ui-space-2);">
            <label class="ui-btn ui-btn-secondary" style="justify-content:flex-start; cursor:pointer;">
              <input type="radio" name="setupFilter" value="all" ${preFilter === 'all' ? 'checked' : ''} style="margin-right:8px;">
              Tất cả câu
            </label>
            <label class="ui-btn ui-btn-secondary" style="justify-content:flex-start; cursor:pointer;">
              <input type="radio" name="setupFilter" value="flagged" ${preFilter === 'flagged' ? 'checked' : ''} style="margin-right:8px;">
              ⭐ Đã đánh dấu (${store.getBookmarks().length})
            </label>
            <label class="ui-btn ui-btn-secondary" style="justify-content:flex-start; cursor:pointer;">
              <input type="radio" name="setupFilter" value="wrong" ${preFilter === 'wrong' ? 'checked' : ''} style="margin-right:8px;">
              ❌ Từng làm sai (${store.getWrongQuestionIds().length})
            </label>
          </div>
        </div>

        <!-- Quiz Mode -->
        <div>
          <label style="font-size:var(--ui-text-xs); font-weight:700; color:var(--ui-text-muted); text-transform:uppercase; letter-spacing:0.05em; display:block; margin-bottom:6px;">
            3. Chế độ làm bài
          </label>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:var(--ui-space-3);">
            <label class="ui-card ui-card-interactive" style="padding:var(--ui-space-3); border-color:var(--ui-border-medium);">
              <div style="display:flex; align-items:center; gap:8px;">
                <input type="radio" name="setupMode" value="practice" ${defaultMode === 'practice' ? 'checked' : ''}>
                <strong>Luyện tập (Practice)</strong>
              </div>
              <p style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); margin-top:4px;">
                Xem đáp án và hướng dẫn giải chi tiết ngay sau mỗi câu.
              </p>
            </label>
            <label class="ui-card ui-card-interactive" style="padding:var(--ui-space-3); border-color:var(--ui-border-medium);">
              <div style="display:flex; align-items:center; gap:8px;">
                <input type="radio" name="setupMode" value="exam" ${defaultMode === 'exam' ? 'checked' : ''}>
                <strong>Thi thử (Exam)</strong>
              </div>
              <p style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); margin-top:4px;">
                Có tính giờ đếm ngược, chỉ biết điểm và giải thích sau khi nộp bài.
              </p>
            </label>
          </div>
        </div>

        <!-- Question count & Time limit -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:var(--ui-space-4);">
          <div>
            <label style="font-size:var(--ui-text-xs); font-weight:700; color:var(--ui-text-muted); text-transform:uppercase; letter-spacing:0.05em; display:block; margin-bottom:6px;">
              4. Số lượng câu
            </label>
            <div style="display:flex; gap:var(--ui-space-2);">
              <input type="number" id="setupCount" value="${defaultCount}" min="1" max="1131" class="ui-btn ui-btn-secondary" style="width:120px; font-size:var(--ui-text-base); text-align:center;">
              <button type="button" class="ui-btn ui-btn-secondary" id="btnMaxCount">Tất cả</button>
            </div>
            <span id="poolCountHint" style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); margin-top:4px; display:block;">
              Tổng số câu khả dụng: 1131 câu
            </span>
          </div>

          <div>
            <label style="font-size:var(--ui-text-xs); font-weight:700; color:var(--ui-text-muted); text-transform:uppercase; letter-spacing:0.05em; display:block; margin-bottom:6px;">
              5. Thời gian làm bài (Phút)
            </label>
            <input type="number" id="setupMinutes" value="${defaultMinutes}" min="0" max="180" class="ui-btn ui-btn-secondary" style="width:140px; font-size:var(--ui-text-base); text-align:center;">
            <span style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); margin-top:4px; display:block;">
              (Nhập 0 để không giới hạn thời gian)
            </span>
          </div>
        </div>

        <!-- Shuffle toggle -->
        <div>
          <label style="display:flex; align-items:center; gap:var(--ui-space-2); cursor:pointer;">
            <input type="checkbox" id="setupShuffle" checked style="width:18px; height:18px;">
            <span style="font-size:var(--ui-text-sm); font-weight:600;">Xáo trộn ngẫu nhiên thứ tự các câu hỏi</span>
          </label>
        </div>

        <!-- Start Button -->
        <div style="margin-top:var(--ui-space-3); border-top:1px solid var(--ui-border-subtle); padding-top:var(--ui-space-4);">
          <button type="button" class="ui-btn ui-btn-primary" id="startQuizBtn" style="width:100%; font-size:var(--ui-text-base); padding:var(--ui-space-3);">
            🚀 Bắt đầu làm bài ngay →
          </button>
        </div>
      </div>
    </div>
  `;

  // Dynamic pool count updater
  const chapterSelect = container.querySelector('#setupChapter');
  const countInput = container.querySelector('#setupCount');
  const maxBtn = container.querySelector('#btnMaxCount');
  const poolHint = container.querySelector('#poolCountHint');

  function updatePoolCount() {
    const chId = Number(chapterSelect.value);
    const filterVal = container.querySelector('input[name="setupFilter"]:checked')?.value || 'all';
    const mode = container.querySelector('input[name="setupMode"]:checked')?.value || 'practice';
    const showPending = store.getSettings().showPendingQuestions || false;

    let list = chId === 0 ? allQuestions : getQuestionsByChapter(chId);
    if (filterVal !== 'all') {
      list = getQuestionsByFilter(filterVal, store).filter(q => chId === 0 || q.chapterId === chId);
    }

    // Chế độ Thi thử: TUYỆT ĐỐI KHÔNG gồm câu pending
    // Chế độ Luyện tập: Chỉ gồm câu pending khi bật công tắc trong Cài đặt
    if (mode === 'exam' || !showPending) {
      list = list.filter(q => q.answer_status !== 'pending');
    }

    poolHint.textContent = `Tổng số câu khả dụng: ${list.length} câu${mode === 'exam' || !showPending ? ' (Đã lọc bỏ câu chưa xử lý)' : ''}`;
    countInput.max = Math.max(1, list.length);
    if (Number(countInput.value) > list.length) {
      countInput.value = Math.max(1, list.length);
    }
  }

  chapterSelect.addEventListener('change', updatePoolCount);
  container.querySelectorAll('input[name="setupFilter"]').forEach(r => r.addEventListener('change', updatePoolCount));
  container.querySelectorAll('input[name="setupMode"]').forEach(r => r.addEventListener('change', updatePoolCount));
  maxBtn.addEventListener('click', () => {
    const chId = Number(chapterSelect.value);
    const filterVal = container.querySelector('input[name="setupFilter"]:checked')?.value || 'all';
    const mode = container.querySelector('input[name="setupMode"]:checked')?.value || 'practice';
    const showPending = store.getSettings().showPendingQuestions || false;

    let list = chId === 0 ? allQuestions : getQuestionsByChapter(chId);
    if (filterVal !== 'all') {
      list = getQuestionsByFilter(filterVal, store).filter(q => chId === 0 || q.chapterId === chId);
    }
    if (mode === 'exam' || !showPending) {
      list = list.filter(q => q.answer_status !== 'pending');
    }
    countInput.value = Math.max(1, list.length);
  });

  updatePoolCount();

  // Start Quiz handler
  container.querySelector('#startQuizBtn').addEventListener('click', () => {
    const chId = Number(chapterSelect.value);
    const filterVal = container.querySelector('input[name="setupFilter"]:checked')?.value || 'all';
    const mode = container.querySelector('input[name="setupMode"]:checked')?.value || 'practice';
    const showPending = store.getSettings().showPendingQuestions || false;
    let count = Number(countInput.value) || 25;
    const minutes = Number(container.querySelector('#setupMinutes').value) || 0;
    const doShuffle = container.querySelector('#setupShuffle').checked;

    let pool = chId === 0 ? [...allQuestions] : getQuestionsByChapter(chId);
    if (filterVal !== 'all') {
      pool = getQuestionsByFilter(filterVal, store).filter(q => chId === 0 || q.chapterId === chId);
    }

    // Lọc theo chế độ và cài đặt
    if (mode === 'exam' || !showPending) {
      pool = pool.filter(q => q.answer_status !== 'pending');
    }

    if (pool.length === 0) {
      alert('Không tìm thấy câu hỏi phù hợp với bộ lọc đã chọn!');
      return;
    }

    if (doShuffle) {
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
    }

    const selectedQuestions = pool.slice(0, Math.min(count, pool.length));
    const chObj = CHAPTERS.find(c => c.id === chId);

    // Initialize new session in store
    const session = {
      questions: selectedQuestions,
      currentIndex: 0,
      answers: {},
      flags: [],
      mode: mode,
      chapterId: chId,
      chapterName: chObj ? chObj.shortName : 'Tất cả chương',
      durationMinutes: minutes,
      durationSec: minutes * 60,
      startedAt: Date.now(),
      submitted: false
    };

    store.saveActiveSession(session);
    router.navigate('quiz');
  });
}
