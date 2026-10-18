/**
 * js/admin-moderation.js - Quản Lý Kiểm Duyệt Cộng Đồng (Admin Moderation)
 * Xử lý báo cáo vi phạm, ẩn/khôi phục/xóa nội dung và cập nhật số liệu theo thời gian thực.
 */
(function () {
  'use strict';

  var state = {
    status: 'open', // 'open' | 'actioned' | 'dismissed' | '' (all)
    type: '',       // '' | 'post' | 'comment' | 'discussion' | 'reply'
    page: 1,
    limit: 15,
    total: 0,
    totalPages: 1,
    reports: [],
    loading: false
  };

  function getAuthHeader() {
    var token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
  }

  function getCurrentUser() {
    try {
      var str = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
      return str ? JSON.parse(str) : null;
    } catch (e) {
      return null;
    }
  }

  function showToast(msg, isError) {
    var existing = document.getElementById('mod-quick-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.id = 'mod-quick-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.zIndex = '99999';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '10px';
    toast.style.fontSize = '14px';
    toast.style.fontWeight = '500';
    toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    toast.style.background = isError ? '#ef4444' : '#10b981';
    toast.style.color = '#ffffff';
    toast.style.transition = 'all 0.3s ease';
    toast.textContent = msg;

    document.body.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = '0';
      setTimeout(function () { toast.remove(); }, 300);
    }, 3500);
  }

  function formatRelativeSaigon(dateStr) {
    if (!dateStr) return '';
    var date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    var now = new Date();
    var diffMs = now.getTime() - date.getTime();
    var diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return 'Vừa xong';
    var diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return diffMin + ' phút trước';
    var diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return diffHours + ' giờ trước';
    var diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return diffDays + ' ngày trước';
    return date.toLocaleDateString('vi-VN');
  }

  var REASON_LABELS = {
    spam: 'Spam / Rác',
    harassment: 'Quấy rối / Công kích',
    inappropriate: 'Nội dung phản cảm',
    misinformation: 'Thông tin sai lệch',
    other: 'Lý do khác'
  };

  var TYPE_LABELS = {
    post: 'Bài viết',
    comment: 'Bình luận',
    discussion: 'Thảo luận',
    reply: 'Câu trả lời'
  };

  // Nạp danh sách báo cáo vi phạm từ backend API
  async function fetchReports() {
    var tbody = document.getElementById('moderation-table-body');
    var emptyEl = document.getElementById('moderation-empty-state');
    var loadingEl = document.getElementById('moderation-loading-state');
    var tableEl = document.getElementById('moderation-table-wrapper');

    if (!tbody) return;

    state.loading = true;
    if (loadingEl) loadingEl.style.display = 'block';
    if (emptyEl) emptyEl.style.display = 'none';

    try {
      var queryParams = ['page=' + state.page, 'limit=' + state.limit];
      if (state.status) queryParams.push('status=' + encodeURIComponent(state.status));
      if (state.type) queryParams.push('type=' + encodeURIComponent(state.type));

      var res = await fetch('/api/admin/reports?' + queryParams.join('&'), {
        headers: getAuthHeader()
      });

      if (res.status === 401) {
        window.location.href = '../../index.html';
        return;
      }
      if (res.status === 403) {
        showToast('Bạn không có quyền xem mục kiểm duyệt vi phạm!', true);
        return;
      }
      if (!res.ok) {
        throw new Error('Lỗi máy chủ (' + res.status + ')');
      }

      var data = await res.json();
      state.reports = data.reports || [];
      state.total = data.total || 0;
      state.totalPages = data.totalPages || 1;

      renderReportsTable();
      updateBadgeCounts();

    } catch (err) {
      console.error('Lỗi nạp báo cáo vi phạm:', err);
      showToast('Không thể tải danh sách báo cáo vi phạm.', true);
    } finally {
      state.loading = false;
      if (loadingEl) loadingEl.style.display = 'none';
    }
  }

  // Cập nhật số lượng trên các tab
  async function updateBadgeCounts() {
    try {
      var resOpen = await fetch('/api/admin/reports?status=open&limit=1', { headers: getAuthHeader() });
      if (resOpen.ok) {
        var dOpen = await resOpen.json();
        var badgeOpen = document.getElementById('mod-badge-open');
        if (badgeOpen) badgeOpen.textContent = dOpen.total || 0;

        // Cập nhật thẻ Attention trên Dashboard nếu có
        var dashAttReports = document.getElementById('attention-reports-count');
        if (dashAttReports) dashAttReports.textContent = dOpen.total || 0;
      }

      var resActioned = await fetch('/api/admin/reports?status=actioned&limit=1', { headers: getAuthHeader() });
      if (resActioned.ok) {
        var dAct = await resActioned.json();
        var badgeAct = document.getElementById('mod-badge-actioned');
        if (badgeAct) badgeAct.textContent = dAct.total || 0;
      }

      var resDismissed = await fetch('/api/admin/reports?status=dismissed&limit=1', { headers: getAuthHeader() });
      if (resDismissed.ok) {
        var dDis = await resDismissed.json();
        var badgeDis = document.getElementById('mod-badge-dismissed');
        if (badgeDis) badgeDis.textContent = dDis.total || 0;
      }
    } catch (e) {
      // Ignored
    }
  }

  // Render bảng báo cáo
  function renderReportsTable() {
    var tbody = document.getElementById('moderation-table-body');
    var emptyEl = document.getElementById('moderation-empty-state');
    var tableEl = document.getElementById('moderation-table-wrapper');
    var pageInfo = document.getElementById('mod-page-info');
    var prevBtn = document.getElementById('mod-prev-btn');
    var nextBtn = document.getElementById('mod-next-btn');

    if (!tbody) return;
    tbody.innerHTML = '';

    if (state.reports.length === 0) {
      if (tableEl) tableEl.style.display = 'none';
      if (emptyEl) emptyEl.style.display = 'block';
    } else {
      if (tableEl) tableEl.style.display = 'block';
      if (emptyEl) emptyEl.style.display = 'none';
    }

    var user = getCurrentUser();
    var canModerate = user && (user.role === 'admin' || user.role === 'owner');

    state.reports.forEach(function (rep) {
      var tr = document.createElement('tr');
      tr.id = 'mod-row-' + rep.id;

      // Cột 1: Loại & Preview nội dung
      var tdTarget = document.createElement('td');
      var typeClass = rep.targetType || 'post';
      var typeLabel = TYPE_LABELS[rep.targetType] || rep.targetType;

      var targetWrap = document.createElement('div');
      targetWrap.className = 'mod-preview-wrap';

      var typeSpan = document.createElement('span');
      typeSpan.className = 'mod-badge-type ' + typeClass;
      typeSpan.textContent = typeLabel + ' #' + rep.targetId;
      targetWrap.appendChild(typeSpan);

      var pText = document.createElement('p');
      pText.className = 'mod-preview-text';
      if (rep.isTargetHidden) {
        var hiddenSpan = document.createElement('span');
        hiddenSpan.className = 'mod-hidden-tag';
        hiddenSpan.textContent = 'ĐÃ ẨN';
        pText.appendChild(hiddenSpan);
      }
      pText.appendChild(document.createTextNode(rep.targetPreview || 'Không có bản xem trước'));
      targetWrap.appendChild(pText);

      tdTarget.appendChild(targetWrap);

      // Cột 2: Tác giả vi phạm
      var tdAuthor = document.createElement('td');
      tdAuthor.textContent = (rep.targetAuthor && rep.targetAuthor.name) || 'Chưa xác định';
      tdAuthor.style.fontWeight = '500';

      // Cột 3: Người báo cáo & Thời gian
      var tdReporter = document.createElement('td');
      var rName = document.createElement('div');
      rName.textContent = (rep.reporter && rep.reporter.name) || 'Người dùng';
      rName.style.fontWeight = '500';
      var rTime = document.createElement('div');
      rTime.textContent = formatRelativeSaigon(rep.createdAt);
      rTime.style.fontSize = '11px';
      rTime.style.color = 'var(--text-secondary, #64748b)';
      tdReporter.append(rName, rTime);

      // Cột 4: Lý do & Ghi chú
      var tdReason = document.createElement('td');
      var reasonSpan = document.createElement('span');
      reasonSpan.className = 'mod-badge-reason ' + rep.reason;
      reasonSpan.textContent = REASON_LABELS[rep.reason] || rep.reason;
      tdReason.appendChild(reasonSpan);

      if (rep.note) {
        var noteP = document.createElement('p');
        noteP.style.margin = '4px 0 0';
        noteP.style.fontSize = '12px';
        noteP.style.fontStyle = 'italic';
        noteP.style.color = 'var(--text-secondary, #64748b)';
        noteP.textContent = '“' + rep.note + '”';
        tdReason.appendChild(noteP);
      }

      // Cột 5: Trạng thái & Người xử lý
      var tdStatus = document.createElement('td');
      var statusSpan = document.createElement('span');
      statusSpan.className = 'mod-badge-status ' + rep.status;

      var statusTextMap = {
        open: 'Chờ xử lý',
        actioned: 'Đã ẩn/xử lý',
        dismissed: 'Đã bỏ qua'
      };
      statusSpan.textContent = statusTextMap[rep.status] || rep.status;
      tdStatus.appendChild(statusSpan);

      if (rep.handlerName) {
        var hP = document.createElement('p');
        hP.style.margin = '3px 0 0';
        hP.style.fontSize = '11px';
        hP.style.color = 'var(--text-secondary, #64748b)';
        hP.textContent = 'Bởi ' + rep.handlerName;
        tdStatus.appendChild(hP);
      }

      // Cột 6: Thao tác (Actions)
      var tdActions = document.createElement('td');
      var actionsWrap = document.createElement('div');
      actionsWrap.className = 'mod-actions-cell';

      if (!canModerate) {
        var noPerm = document.createElement('span');
        noPerm.style.fontSize = '12px';
        noPerm.style.color = '#94a3b8';
        noPerm.textContent = 'Chỉ xem';
        actionsWrap.appendChild(noPerm);
      } else {
        if (rep.status === 'open') {
          // Nút Ẩn nội dung
          var hideBtn = document.createElement('button');
          hideBtn.className = 'mod-btn mod-btn-hide';
          hideBtn.textContent = 'Ẩn nội dung';
          hideBtn.addEventListener('click', function () { handleAction(rep.id, 'hide'); });

          // Nút Bỏ qua
          var disBtn = document.createElement('button');
          disBtn.className = 'mod-btn mod-btn-dismiss';
          disBtn.textContent = 'Bỏ qua';
          disBtn.addEventListener('click', function () { handleAction(rep.id, 'dismiss'); });

          // Nút Xóa vĩnh viễn
          var delBtn = document.createElement('button');
          delBtn.className = 'mod-btn mod-btn-delete';
          delBtn.textContent = 'Xóa';
          delBtn.title = 'Xóa vĩnh viễn nội dung';
          delBtn.addEventListener('click', function () {
            if (confirm('Bạn có chắc chắn muốn xóa vĩnh viễn nội dung này khỏi hệ thống? Hành động này không thể hoàn tác!')) {
              handleAction(rep.id, 'delete');
            }
          });

          actionsWrap.append(hideBtn, disBtn, delBtn);

        } else if (rep.status === 'actioned') {
          // Nút Khôi phục
          var resBtn = document.createElement('button');
          resBtn.className = 'mod-btn mod-btn-restore';
          resBtn.textContent = 'Khôi phục';
          resBtn.addEventListener('click', function () { handleAction(rep.id, 'restore'); });

          // Nút Xóa vĩnh viễn
          var delBtn2 = document.createElement('button');
          delBtn2.className = 'mod-btn mod-btn-delete';
          delBtn2.textContent = 'Xóa';
          delBtn2.addEventListener('click', function () {
            if (confirm('Bạn có chắc chắn muốn xóa vĩnh viễn nội dung này khỏi hệ thống?')) {
              handleAction(rep.id, 'delete');
            }
          });

          actionsWrap.append(resBtn, delBtn2);

        } else if (rep.status === 'dismissed') {
          // Nút Ẩn nội dung
          var hideBtn2 = document.createElement('button');
          hideBtn2.className = 'mod-btn mod-btn-hide';
          hideBtn2.textContent = 'Ẩn nội dung';
          hideBtn2.addEventListener('click', function () { handleAction(rep.id, 'hide'); });

          actionsWrap.appendChild(hideBtn2);
        }
      }

      tdActions.appendChild(actionsWrap);

      tr.append(tdTarget, tdAuthor, tdReporter, tdReason, tdStatus, tdActions);
      tbody.appendChild(tr);
    });

    // Pagination info
    if (pageInfo) {
      pageInfo.textContent = 'Trang ' + state.page + ' / ' + state.totalPages + ' (' + state.total + ' báo cáo)';
    }
    if (prevBtn) prevBtn.disabled = state.page <= 1;
    if (nextBtn) nextBtn.disabled = state.page >= state.totalPages;
  }

  // Thực hiện thao tác kiểm duyệt (hide, dismiss, restore, delete)
  async function handleAction(reportId, action) {
    try {
      var res = await fetch('/api/admin/reports/' + reportId, {
        method: 'PUT',
        headers: getAuthHeader(),
        body: JSON.stringify({ action: action })
      });

      var data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Thao tác thất bại.', true);
        return;
      }

      showToast(data.message || 'Thao tác thành công!', false);
      await fetchReports();

    } catch (err) {
      console.error('Lỗi handleAction:', err);
      showToast('Lỗi mạng khi kết nối tới máy chủ.', true);
    }
  }

  // Khởi tạo các sự kiện và liên kết DOM
  function init() {
    var tabs = document.querySelectorAll('[data-mod-status]');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('is-active'); });
        tab.classList.add('is-active');
        state.status = tab.dataset.modStatus;
        state.page = 1;
        fetchReports();
      });
    });

    var typeSelect = document.getElementById('mod-type-select');
    if (typeSelect) {
      typeSelect.addEventListener('change', function () {
        state.type = typeSelect.value;
        state.page = 1;
        fetchReports();
      });
    }

    var prevBtn = document.getElementById('mod-prev-btn');
    var nextBtn = document.getElementById('mod-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        if (state.page > 1) {
          state.page--;
          fetchReports();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (state.page < state.totalPages) {
          state.page++;
          fetchReports();
        }
      });
    }

    // Khi người dùng bấm tab Community trên sidebar hoặc Attention card
    document.querySelectorAll('[data-page-target="community"]').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        state.status = 'open';
        var openTab = document.querySelector('[data-mod-status="open"]');
        if (openTab) {
          tabs.forEach(function (t) { t.classList.remove('is-active'); });
          openTab.classList.add('is-active');
        }
        fetchReports();
      });
    });

    // Lần đầu tải trang
    fetchReports();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.Lib95 = window.Lib95 || {};
  window.Lib95.moderation = {
    fetchReports: fetchReports,
    handleAction: handleAction
  };

})();
