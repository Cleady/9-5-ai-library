/**
 * js/community-report.js - Modal Báo Cáo Vi Phạm Cộng Đồng
 * Hỗ trợ báo cáo bài viết (post), bình luận (comment), thảo luận (discussion), câu trả lời (reply).
 * Tự động đồng bộ giao diện Light & Dark Theme qua CSS variables.
 */
(function () {
  'use strict';

  var MODAL_ID = 'community-report-modal';

  function getAuthToken() {
    return localStorage.getItem('token') || sessionStorage.getItem('token') || '';
  }

  function getCurrentUser() {
    try {
      var userStr = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      return null;
    }
  }

  function showToast(message, type) {
    if (window.Lib95 && window.Lib95.community && window.Lib95.community.showToast) {
      window.Lib95.community.showToast(message);
      return;
    }
    // Fallback toast nếu không ở trang community feed
    var existingToast = document.getElementById('report-quick-toast');
    if (existingToast) existingToast.remove();

    var toast = document.createElement('div');
    toast.id = 'report-quick-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.zIndex = '99999';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '10px';
    toast.style.fontSize = '14px';
    toast.style.fontWeight = '500';
    toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    toast.style.transition = 'all 0.3s ease';

    if (type === 'error') {
      toast.style.background = '#ef4444';
      toast.style.color = '#ffffff';
    } else {
      toast.style.background = '#10b981';
      toast.style.color = '#ffffff';
    }
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(function () {
      toast.style.opacity = '0';
      setTimeout(function () { toast.remove(); }, 300);
    }, 3500);
  }

  // Khởi tạo HTML Modal nếu chưa có trong DOM
  function ensureModal() {
    var modal = document.getElementById(MODAL_ID);
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = MODAL_ID;
    modal.className = 'com-report-modal-backdrop';
    modal.hidden = true;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'com-report-modal-title');

    modal.innerHTML = `
      <div class="com-report-modal-card">
        <div class="com-report-modal-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 20px;">🚩</span>
            <h3 id="com-report-modal-title" style="margin: 0; font-size: 17px; font-weight: 700;">Báo cáo vi phạm</h3>
          </div>
          <button type="button" class="com-report-modal-close" aria-label="Đóng">&times;</button>
        </div>

        <form id="com-report-form" class="com-report-modal-body">
          <input type="hidden" id="report-target-type" name="targetType" value="">
          <input type="hidden" id="report-target-id" name="targetId" value="">

          <div id="report-target-preview-box" class="com-report-preview" style="display: none;">
            <span style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b;" id="report-preview-label">Nội dung</span>
            <p id="report-target-preview-text" style="margin: 4px 0 0; font-size: 13px; font-style: italic;"></p>
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px;">
              Lý do báo cáo vi phạm <span style="color: #ef4444;">*</span>
            </label>
            <div class="com-report-reasons-grid">
              <label class="com-report-radio-label">
                <input type="radio" name="reason" value="spam" checked>
                <span><strong>Spam / Quảng cáo</strong><small>Tin rác, quảng cáo bán hàng không phù hợp</small></span>
              </label>
              <label class="com-report-radio-label">
                <input type="radio" name="reason" value="harassment">
                <span><strong>Quấy rối / Công kích</strong><small>Xúc phạm, lăng mạ hoặc đe dọa thành viên khác</small></span>
              </label>
              <label class="com-report-radio-label">
                <input type="radio" name="reason" value="inappropriate">
                <span><strong>Nội dung không lành mạnh</strong><small>Bạo lực, khiêu dâm, kích động thù địch</small></span>
              </label>
              <label class="com-report-radio-label">
                <input type="radio" name="reason" value="misinformation">
                <span><strong>Thông tin sai lệch</strong><small>Lừa đảo, tin giả mạo gây hiểu lầm nghiêm trọng</small></span>
              </label>
              <label class="com-report-radio-label">
                <input type="radio" name="reason" value="other">
                <span><strong>Lý do khác</strong><small>Các vấn đề vi phạm tiêu chuẩn cộng đồng khác</small></span>
              </label>
            </div>
          </div>

          <div style="margin-bottom: 20px;">
            <label for="report-note" style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px;">
              Mô tả chi tiết (Tùy chọn)
            </label>
            <textarea id="report-note" name="note" rows="3" maxlength="500"
              placeholder="Cung cấp thêm ngữ cảnh để Ban quản trị xử lý nhanh hơn (tối đa 500 ký tự)..."
              class="com-report-textarea"></textarea>
          </div>

          <div class="com-report-modal-footer">
            <button type="button" class="com-report-btn com-report-btn-cancel">Hủy bỏ</button>
            <button type="submit" class="com-report-btn com-report-btn-submit" id="report-submit-btn">Gửi báo cáo</button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);

    // Event listeners cho đóng modal
    var closeBtn = modal.querySelector('.com-report-modal-close');
    var cancelBtn = modal.querySelector('.com-report-btn-cancel');

    function closeModal() {
      modal.hidden = true;
      modal.classList.remove('is-open');
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
    });

    // Form submit
    var form = modal.querySelector('#com-report-form');
    if (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();

        var token = getAuthToken();
        if (!token) {
          showToast('Vui lòng đăng nhập để gửi báo cáo vi phạm.', 'error');
          return;
        }

        var targetType = form.elements.targetType.value;
        var targetId = parseInt(form.elements.targetId.value, 10);
        var reason = form.elements.reason.value;
        var note = form.elements.note.value.trim();

        if (!targetType || !targetId) {
          showToast('Thông tin đối tượng báo cáo không hợp lệ.', 'error');
          return;
        }

        var submitBtn = modal.querySelector('#report-submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Đang gửi...';

        try {
          var response = await fetch('/api/community/report', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
              targetType: targetType,
              targetId: targetId,
              reason: reason,
              note: note || undefined
            })
          });

          var result = await response.json();

          if (!response.ok) {
            showToast(result.error || 'Có lỗi xảy ra khi gửi báo cáo.', 'error');
            return;
          }

          showToast(result.message || 'Báo cáo vi phạm đã được gửi tới Ban quản trị.', 'success');
          closeModal();
          form.reset();

        } catch (err) {
          console.error('Lỗi gửi báo cáo:', err);
          showToast('Lỗi mạng khi kết nối tới máy chủ.', 'error');
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Gửi báo cáo';
        }
      });
    }

    return modal;
  }

  // Mở modal báo cáo
  function openReportModal(options) {
    var opts = options || {};
    var targetType = opts.targetType || 'post';
    var targetId = opts.targetId;
    var preview = opts.preview || '';
    var authorId = opts.authorId;

    var currentUser = getCurrentUser();
    if (currentUser && authorId && Number(currentUser.id) === Number(authorId)) {
      showToast('Bạn không thể tự báo cáo nội dung của chính mình.', 'error');
      return;
    }

    var modal = ensureModal();
    var form = modal.querySelector('#com-report-form');
    form.reset();

    form.elements.targetType.value = targetType;
    form.elements.targetId.value = targetId;

    var previewBox = modal.querySelector('#report-target-preview-box');
    var previewLabel = modal.querySelector('#report-preview-label');
    var previewText = modal.querySelector('#report-target-preview-text');

    var typeNames = {
      post: 'Bài viết',
      comment: 'Bình luận',
      discussion: 'Thảo luận',
      reply: 'Câu trả lời'
    };

    if (preview) {
      previewBox.style.display = 'block';
      previewLabel.textContent = typeNames[targetType] || 'Nội dung';
      previewText.textContent = preview.length > 120 ? preview.slice(0, 120) + '...' : preview;
    } else {
      previewBox.style.display = 'none';
    }

    modal.hidden = false;
    modal.classList.add('is-open');
  }

  // Inject CSS style cho modal báo cáo (tương thích Light & Dark Theme)
  function injectStyles() {
    if (document.getElementById('community-report-styles')) return;

    var style = document.createElement('style');
    style.id = 'community-report-styles';
    style.textContent = `
      .com-report-modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.65);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
      }
      .com-report-modal-backdrop.is-open {
        opacity: 1;
        pointer-events: auto;
      }
      .com-report-modal-card {
        background: var(--card-bg, #ffffff);
        color: var(--text-primary, #0f172a);
        width: 100%;
        max-width: 480px;
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
        border: 1px solid var(--border-subtle, rgba(226, 232, 240, 0.8));
        overflow: hidden;
        animation: comReportSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }
      @keyframes comReportSlideIn {
        from { transform: translateY(16px) scale(0.98); opacity: 0; }
        to { transform: translateY(0) scale(1); opacity: 1; }
      }
      .com-report-modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-bottom: 1px solid var(--border-subtle, rgba(226, 232, 240, 0.8));
      }
      .com-report-modal-close {
        background: transparent;
        border: none;
        font-size: 24px;
        line-height: 1;
        color: var(--text-secondary, #64748b);
        cursor: pointer;
        border-radius: 6px;
        padding: 2px 6px;
        transition: color 0.15s;
      }
      .com-report-modal-close:hover {
        color: var(--text-primary, #0f172a);
      }
      .com-report-modal-body {
        padding: 20px;
      }
      .com-report-preview {
        padding: 10px 14px;
        border-radius: 8px;
        background: var(--surface-secondary, rgba(241, 245, 249, 0.7));
        border-left: 3px solid var(--accent-bright, #2563eb);
        margin-bottom: 16px;
      }
      .com-report-reasons-grid {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .com-report-radio-label {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 10px 12px;
        border-radius: 8px;
        border: 1px solid var(--border-subtle, rgba(226, 232, 240, 0.8));
        background: var(--surface-card, transparent);
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .com-report-radio-label:hover {
        border-color: var(--accent-bright, #2563eb);
        background: rgba(37, 99, 235, 0.04);
      }
      .com-report-radio-label input[type="radio"] {
        margin-top: 3px;
        accent-color: var(--accent-bright, #2563eb);
      }
      .com-report-radio-label span {
        display: flex;
        flex-direction: column;
        gap: 2px;
        font-size: 13px;
      }
      .com-report-radio-label small {
        color: var(--text-secondary, #64748b);
        font-size: 11px;
      }
      .com-report-textarea {
        width: 100%;
        box-sizing: border-box;
        border-radius: 8px;
        border: 1px solid var(--border-subtle, #cbd5e1);
        background: var(--input-bg, #ffffff);
        color: var(--text-primary, #0f172a);
        padding: 10px 12px;
        font-size: 13px;
        resize: vertical;
        font-family: inherit;
      }
      .com-report-textarea:focus {
        outline: none;
        border-color: var(--accent-bright, #2563eb);
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
      }
      .com-report-modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
      }
      .com-report-btn {
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .com-report-btn-cancel {
        background: transparent;
        border: 1px solid var(--border-subtle, #cbd5e1);
        color: var(--text-secondary, #64748b);
      }
      .com-report-btn-cancel:hover {
        background: rgba(100, 116, 139, 0.08);
        color: var(--text-primary, #0f172a);
      }
      .com-report-btn-submit {
        background: #ef4444;
        border: 1px solid #ef4444;
        color: #ffffff;
      }
      .com-report-btn-submit:hover:not(:disabled) {
        background: #dc2626;
      }
      .com-report-btn-submit:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `;
    document.head.appendChild(style);
  }

  // Khởi động khi tải xong DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      injectStyles();
    });
  } else {
    injectStyles();
  }

  // Expose ra window
  window.openCommunityReportModal = openReportModal;
  window.Lib95 = window.Lib95 || {};
  window.Lib95.openReportModal = openReportModal;

  // Lắng nghe sự kiện click delegating cho các nút [data-com-report]
  document.addEventListener('click', function (e) {
    var reportTrigger = e.target.closest('[data-com-report]');
    if (reportTrigger) {
      e.preventDefault();
      var targetType = reportTrigger.dataset.comReportType || 'post';
      var targetId = reportTrigger.dataset.comReportId;
      var preview = reportTrigger.dataset.comReportPreview || '';
      var authorId = reportTrigger.dataset.comReportAuthor;

      openReportModal({
        targetType: targetType,
        targetId: targetId,
        preview: preview,
        authorId: authorId
      });
    }
  });

})();
