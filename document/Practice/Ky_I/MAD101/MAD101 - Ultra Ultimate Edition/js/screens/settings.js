/**
 * MAD101 STUDIO — SETTINGS SCREEN
 * js/screens/settings.js
 */

import { store } from '../store.js';

export function renderSettingsScreen(container) {
  const settings = store.getSettings();
  const profile = store.getProfile();

  container.innerHTML = `
    <div style="max-width:760px; margin:0 auto;">
      <div style="margin-bottom:var(--ui-space-6);">
        <a href="#/home" class="ui-btn ui-btn-ghost" style="padding-left:0;">← Về trang chủ</a>
        <h1 style="font-size:var(--ui-text-2xl); font-weight:800; margin-top:var(--ui-space-2);">
          Cài Đặt Ứng Dụng
        </h1>
        <p style="font-size:var(--ui-text-sm); color:var(--ui-text-muted);">
          Tùy biến giao diện, công thức toán và quản lý dữ liệu học tập của bạn
        </p>
      </div>

      <div style="display:flex; flex-direction:column; gap:var(--ui-space-5);">
        <!-- Theme & Display Card -->
        <section class="ui-card">
          <h2 style="font-size:var(--ui-text-base); font-weight:800; margin-bottom:var(--ui-space-4);">
            🎨 Giao Diện & Hiển Thị
          </h2>

          <div style="display:flex; flex-direction:column; gap:var(--ui-space-4);">
            <!-- Theme Mode -->
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong>Chế độ màu (Theme)</strong>
                <p style="font-size:var(--ui-text-xs); color:var(--ui-text-muted);">
                  Mặc định giao diện tối công nghệ (Dark Tech) với điểm nhấn cam
                </p>
              </div>
              <select id="settingTheme" class="ui-btn ui-btn-secondary" style="font-size:var(--ui-text-sm);">
                <option value="dark" ${settings.theme === 'dark' ? 'selected' : ''}>Tối (Dark Tech)</option>
                <option value="light" ${settings.theme === 'light' ? 'selected' : ''}>Sáng (Light Clean)</option>
              </select>
            </div>

            <!-- Formula Font Size -->
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong>Cỡ chữ công thức MathJax</strong>
                <p style="font-size:var(--ui-text-xs); color:var(--ui-text-muted);">
                  Điều chỉnh kích thước ký hiệu toán học phù hợp với màn hình của bạn
                </p>
              </div>
              <select id="settingFontSize" class="ui-btn ui-btn-secondary" style="font-size:var(--ui-text-sm);">
                <option value="small" ${settings.fontSize === 'small' ? 'selected' : ''}>Nhỏ (90%)</option>
                <option value="normal" ${settings.fontSize === 'normal' ? 'selected' : ''}>Tiêu chuẩn (100%)</option>
                <option value="large" ${settings.fontSize === 'large' ? 'selected' : ''}>Lớn (115%)</option>
              </select>
            </div>
          </div>
        </section>

        <!-- Learning Preferences -->
        <section class="ui-card">
          <h2 style="font-size:var(--ui-text-base); font-weight:800; margin-bottom:var(--ui-space-4);">
            ⚙️ Tùy Chọn Làm Bài
          </h2>

          <div style="display:flex; flex-direction:column; gap:var(--ui-space-3);">
            <label style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
              <div>
                <strong>Tự động chuyển câu khi chọn đáp án</strong>
                <p style="font-size:var(--ui-text-xs); color:var(--ui-text-muted);">
                  Tiết kiệm thao tác bấm nút chuyển câu tiếp theo trong chế độ thi thử
                </p>
              </div>
              <input type="checkbox" id="settingAutoNext" ${settings.autoNext ? 'checked' : ''} style="width:20px; height:20px;">
            </label>

            <label style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
              <div>
                <strong>Xác nhận trước khi nộp bài</strong>
                <p style="font-size:var(--ui-text-xs); color:var(--ui-text-muted);">
                  Cảnh báo số câu chưa làm trước khi hoàn tất bài thi
                </p>
              </div>
              <input type="checkbox" id="settingConfirmSubmit" ${settings.confirmSubmit ? 'checked' : ''} style="width:20px; height:20px;">
            </label>

            <label style="display:flex; justify-content:space-between; align-items:center; cursor:pointer; padding-top:var(--ui-space-2); border-top:1px dashed var(--ui-border-subtle);">
              <div>
                <strong>Hiện câu chưa xử lý (chỉ ảnh gốc)</strong>
                <p style="font-size:var(--ui-text-xs); color:var(--ui-text-muted);">
                  Mặc định TẮT. Khi bật, cho phép đưa các câu hỏi chưa chuyển sang LaTeX vào chế độ Luyện tập (hiển thị ảnh gốc kèm nhãn xám). Chế độ Thi thử tuyệt đối không gồm câu chưa xử lý.
                </p>
              </div>
              <input type="checkbox" id="settingShowPending" ${settings.showPendingQuestions ? 'checked' : ''} style="width:20px; height:20px;">
            </label>
          </div>
        </section>

        <!-- Backup & Reset Data -->
        <section class="ui-card">
          <h2 style="font-size:var(--ui-text-base); font-weight:800; margin-bottom:var(--ui-space-4);">
            💾 Quản Lý Dữ Liệu & Bản Sao Lưu
          </h2>

          <p style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); margin-bottom:var(--ui-space-4);">
            Toàn bộ lịch sử làm bài, điểm thi và danh sách câu đánh dấu được lưu cục bộ an toàn trên trình duyệt của bạn (localStorage).
          </p>

          <div style="display:flex; gap:var(--ui-space-3); flex-wrap:wrap;">
            <button class="ui-btn ui-btn-secondary" id="btnExportBackup">
              📥 Xuất bản sao lưu JSON
            </button>
            <button class="ui-btn ui-btn-danger" id="btnResetData">
              ⚠️ Đặt lại toàn bộ dữ liệu
            </button>
          </div>
        </section>

        <!-- Legacy UI Switcher & App Info -->
        <section class="ui-card" style="border-color:rgba(148, 163, 184, 0.25);">
          <h2 style="font-size:var(--ui-text-base); font-weight:800; margin-bottom:var(--ui-space-2);">
            🏛️ Giao Diện Cũ (Legacy UI)
          </h2>
          <p style="font-size:var(--ui-text-xs); color:var(--ui-text-muted); margin-bottom:var(--ui-space-4);">
            Bản giao diện nguyên bản được lưu trữ dự phòng nguyên vẹn trong thư mục <code>legacy/</code>.
          </p>
          <div>
            <a href="legacy/index.html" class="ui-btn ui-btn-secondary ui-btn-sm" target="_blank">
              Mở Giao Diện Cũ (legacy/index.html) ↗
            </a>
          </div>

          <div style="margin-top:var(--ui-space-5); padding-top:var(--ui-space-4); border-top:1px solid var(--ui-border-subtle); font-size:var(--ui-text-xs); color:var(--ui-text-muted); line-height:1.6;">
            <div>• Ứng dụng: <strong>MAD101 Discrete Mathematics Studio 2.0</strong></div>
            <div>• Dữ liệu: <strong>1,131 câu hỏi</strong> phân chia theo 8 chương Toán Rời Rạc FPT University</div>
            <div>• Công nghệ: Thuần HTML5 / CSS Modern Glassmorphism / ES Modules / MathJax Cục bộ</div>
          </div>
        </section>
      </div>
    </div>
  `;

  // Change Theme handler
  const themeSelect = container.querySelector('#settingTheme');
  themeSelect.addEventListener('change', () => {
    store.saveSettings({ theme: themeSelect.value });
  });

  // Change Font size handler
  const fontSelect = container.querySelector('#settingFontSize');
  fontSelect.addEventListener('change', () => {
    store.saveSettings({ fontSize: fontSelect.value });
  });

  // Toggles
  const autoNextInput = container.querySelector('#settingAutoNext');
  autoNextInput.addEventListener('change', () => {
    store.saveSettings({ autoNext: autoNextInput.checked });
  });

  const confirmInput = container.querySelector('#settingConfirmSubmit');
  confirmInput.addEventListener('change', () => {
    store.saveSettings({ confirmSubmit: confirmInput.checked });
  });

  const showPendingInput = container.querySelector('#settingShowPending');
  if (showPendingInput) {
    showPendingInput.addEventListener('change', () => {
      store.saveSettings({ showPendingQuestions: showPendingInput.checked });
    });
  }

  // Export JSON Backup
  container.querySelector('#btnExportBackup').addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `mad101_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  });

  // Reset Data handler
  container.querySelector('#btnResetData').addEventListener('click', () => {
    const confirmed = prompt('CẢNH BÁO: Thao tác này sẽ xóa toàn bộ lịch sử điểm và câu đánh dấu.\nNhập "XOA" vào ô bên dưới để xác nhận:');
    if (confirmed === 'XOA') {
      store.resetAllData();
      alert('Đã đặt lại dữ liệu về mặc định.');
      renderSettingsScreen(container);
    }
  });
}
