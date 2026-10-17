/**
 * =====================================================================
 * lectures-list.js — Logic cho danh sách bài giảng
 * =====================================================================
 * File này xử lý: tìm kiếm (debounce 200ms), lọc tabs, sắp xếp,
 * render danh sách bài giảng, render thẻ tiến độ subject, và
 * hiện toast khi bấm bài bị khóa.
 *
 * Được dùng bởi: lectures.html, subject.html, next-lectures.html
 * Đọc dữ liệu từ: Lib95.lectures.core (lectures-core.js)
 * =====================================================================
 */
;(function () {
  'use strict';

  window.Lib95 = window.Lib95 || {};
  window.Lib95.lectures = window.Lib95.lectures || {};

  var core = window.Lib95.lectures.core;

  /* ====== BIẾN TRẠNG THÁI ====== */
  var currentFilter = 'all';     /* all | completed | in-progress | locked */
  var currentSort = 'newest';    /* newest | oldest | a-z */
  var currentSearch = '';

  /* ====== ICON SVG NỘI TUYẾN ====== */
  /* Dùng inline SVG cho các icon mà thư mục assets/icon chưa có */
  var TYPE_ICONS = {
    video: '<svg class="lec-type-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    quiz: '<svg class="lec-type-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>',
    reading: '<svg class="lec-type-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>'
  };

  var STATUS_ICONS = {
    completed: '<svg class="lec-status-svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>',
    'in-progress': '<svg class="lec-status-svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10" cy="10" r="8"/><path d="M10 6v4l2.5 2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    locked: '<svg class="lec-status-svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/></svg>'
  };

  /* ====== HELPER LẤY ICON CHUẨN CHO MÔN HỌC ====== */
  function getSubjectIcon(code) {
    var c = (code || '').toUpperCase();
    if (c.indexOf('DB') !== -1 || c.indexOf('DATA') !== -1) return '/assets/icon/data.png';
    if (c.indexOf('PRO') !== -1 || c.indexOf('WEB') !== -1 || c.indexOf('PRJ') !== -1) return '/assets/icon/program.png';
    if (c.indexOf('MAS') !== -1 || c.indexOf('MATH') !== -1) return '/assets/icon/math.png';
    if (c.indexOf('AI') !== -1 || c.indexOf('ML') !== -1) return '/assets/icon/chip.png';
    return '/assets/icon/chip.png';
  }

  /* ====== RENDER GRID CÁC KHÓA HỌC (COURSE SUBJECTS) ====== */
  function renderCourseSubjectsGrid(containerId, activeSubjectId, onSelectCourse) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var subjects = core.getSubjects();
    var countBadge = document.getElementById('lec-subjects-count-badge');
    if (countBadge) {
      countBadge.textContent = subjects.length + ' môn học';
    }

    if (subjects.length === 0) {
      container.innerHTML = '<p style="color: #64748b; font-size: 13px; grid-column: 1 / -1; padding: 12px 0;">Chưa có môn học nào trên hệ thống.</p>';
      return;
    }

    var html = '';
    subjects.forEach(function (sub) {
      var isActive = sub.id === activeSubjectId;
      var iconImg = getSubjectIcon(sub.code || sub.name);
      var grad = 'linear-gradient(135deg, ' + (sub.gradientFrom || '#38bdf8') + ', ' + (sub.gradientTo || '#0284c7') + ')';
      var allSubLectures = core.getLectures(sub.id);
      var progress = core.getSubjectProgress(sub.id);
      var lecCount = allSubLectures.length;
      var isFav = core.isSubjectFavorited ? core.isSubjectFavorited(sub.id) : false;

      html +=
        '<div class="lec-course-wrapper">' +
          '<div class="lec-course-card ' + (isActive ? 'is-active' : '') + '" data-subject-id="' + sub.id + '">' +
            '<div class="lec-course-icon-badge" style="background: url(\'' + iconImg + '\') center / 55% no-repeat, ' + grad + ';"></div>' +
            '<div class="lec-course-card-body">' +
              '<div class="lec-course-top-row">' +
                '<h3 class="lec-course-code">' + (sub.code || sub.name) + '</h3>' +
                '<span class="lec-course-active-pill">Đang chọn</span>' +
              '</div>' +
              '<p class="lec-course-title" title="' + (sub.title || sub.name) + '">' + (sub.title || sub.name) + '</p>' +
              '<p class="lec-course-meta">' +
                '<span>' + (sub.term || 'Kỳ II') + '</span>' +
                '<span>•</span>' +
                '<span>' + lecCount + ' video</span>' +
                '<span>•</span>' +
                '<span>' + progress.percent + '%</span>' +
              '</p>' +
            '</div>' +
          '</div>' +
          '<button type="button" class="subject-fav-btn ' + (isFav ? 'is-favorited' : '') + '" data-subject-id="' + sub.id + '" aria-label="Yêu thích môn ' + (sub.code || sub.name) + '" title="' + (isFav ? 'Bỏ yêu thích' : 'Yêu thích môn học') + '">' +
            '<svg class="star-icon" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' +
          '</button>' +
        '</div>';
    });

    container.innerHTML = html;

    // Gắn sự kiện chọn môn học (bấm vào card)
    container.querySelectorAll('.lec-course-card').forEach(function (card) {
      card.addEventListener('click', function (e) {
        e.preventDefault();
        var id = parseInt(card.getAttribute('data-subject-id'), 10);
        if (onSelectCourse) onSelectCourse(id);
      });
    });

    // Gắn sự kiện bấm nút ngôi sao yêu thích (Favorite)
    container.querySelectorAll('.subject-fav-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var subId = Number(btn.getAttribute('data-subject-id'));
        if (core.toggleSubjectFavorite) {
          var nowFav = core.toggleSubjectFavorite(subId);
          btn.classList.toggle('is-favorited', nowFav);
          btn.title = nowFav ? 'Bỏ yêu thích' : 'Yêu thích môn học';
          var sub = core.getSubjectById(subId);
          var subName = sub ? (sub.code || sub.name) : 'môn học';
          core.showToast(nowFav ? 'Đã thêm ' + subName + ' vào mục Yêu thích' : 'Đã xóa ' + subName + ' khỏi mục Yêu thích', 'info');
        }
      });
    });
  }

  /* ====== RENDER THẺ TIẾN ĐỘ SUBJECT ====== */
  /* Vẽ thẻ ở đầu trang lectures.html hiện tiến độ của subject */
  function renderSubjectProgress(containerId, subjectId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var subject = core.getSubjectById(subjectId);
    if (!subject) {
      container.innerHTML = '';
      return;
    }

    var progress = core.getSubjectProgress(subjectId);
    var iconImg = getSubjectIcon(subject.code || subject.name);
    var grad = 'linear-gradient(135deg, ' + (subject.gradientFrom || '#38bdf8') + ', ' + (subject.gradientTo || '#0284c7') + ')';

    container.innerHTML =
      '<div class="lec-subject-card card">' +
        '<div class="lec-subject-info">' +
          '<div class="lec-subject-badge">' +
            '<span class="lec-subject-icon" style="background: url(\'' + iconImg + '\') center / 55% no-repeat, ' + grad + '; display: inline-block;" aria-hidden="true"></span>' +
          '</div>' +
          '<div class="lec-subject-text">' +
            '<h2 class="lec-subject-name">' + subject.name + ' – ' + subject.title + '</h2>' +
            '<p class="lec-subject-meta">' + progress.completed + ' / ' + progress.total + ' lectures completed' + (subject.term ? ' · ' + subject.term : '') + '</p>' +
            '<div class="progress-row">' +
              '<progress class="progress" value="' + progress.percent + '" max="100" aria-label="Tiến độ ' + subject.name + '">' + progress.percent + '%</progress>' +
              '<span class="progress-label">' + progress.percent + '%</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="lec-subject-right">' +
          '<div class="score-ring" style="--value: ' + progress.percent + '" role="img" aria-label="' + progress.percent + ' phần trăm hoàn thành">' +
            '<span class="score-value">' + progress.percent + '%</span>' +
          '</div>' +
          '<a href="subject.html?id=' + subjectId + '" class="card-link">View details →</a>' +
        '</div>' +
      '</div>';
  }

  /* ====== RENDER DANH SÁCH BÀI GIẢNG ====== */
  /* Lọc, sắp xếp, tìm kiếm, rồi render ra containerId */
  function renderLectureList(containerId, subjectId, options) {
    var container = document.getElementById(containerId);
    if (!container) return;

    options = options || {};
    var lectures = core.getLectures(subjectId);

    /* Bước 1: Lọc theo trạng thái */
    if (currentFilter !== 'all') {
      lectures = lectures.filter(function (l) { return l.status === currentFilter; });
    }

    /* Bước 2: Tìm kiếm theo title (không phân biệt hoa/thường) */
    if (currentSearch) {
      var query = currentSearch.toLowerCase();
      lectures = lectures.filter(function (l) {
        return l.title.toLowerCase().indexOf(query) !== -1;
      });
    }

    /* Bước 3: Sắp xếp */
    if (currentSort === 'newest') {
      lectures.sort(function (a, b) { return new Date(b.dateAdded) - new Date(a.dateAdded); });
    } else if (currentSort === 'oldest') {
      lectures.sort(function (a, b) { return new Date(a.dateAdded) - new Date(b.dateAdded); });
    } else if (currentSort === 'a-z') {
      lectures.sort(function (a, b) { return a.title.localeCompare(b.title); });
    }

    /* Cập nhật số lượng kết quả */
    var countEl = document.getElementById('lec-result-count');
    if (countEl) {
      countEl.textContent = lectures.length + ' lecture' + (lectures.length !== 1 ? 's' : '');
    }

    /* Status rỗng */
    if (lectures.length === 0) {
      var subject = core.getSubjectById(subjectId);
      var subName = subject ? subject.name : 'môn học này';
      var userStr = localStorage.getItem('user');
      var canManage = false;
      try {
        var u = JSON.parse(userStr);
        canManage = u && ['owner', 'admin', 'staff'].includes(u.role);
      } catch (e) {}

      container.innerHTML =
        '<div class="lec-empty" style="padding: 36px 20px; text-align: center; background: rgba(255, 255, 255, 0.7); border-radius: 16px; border: 1.5px dashed #cbd5e1; margin-top: 10px;">' +
          '<div style="font-size: 32px; margin-bottom: 8px;">🎬</div>' +
          '<h3 style="font-size: 16px; font-weight: 700; color: #1e293b; margin: 0 0 6px;">Môn ' + subName + ' chưa có bài giảng video</h3>' +
          '<p style="font-size: 13px; color: #64748b; margin: 0 0 16px;">Các bài giảng và video của môn này sẽ sớm được cập nhật.</p>' +
          (canManage ? '<a href="../admin/admin.html#page-lms" class="lec-btn lec-btn--start" style="text-decoration: none; display: inline-flex; align-items: center; gap: 6px; font-size: 13px; padding: 8px 18px; margin: 0 auto;">⚙️ Thêm video vào ' + subName + ' trong LMS Manager</a>' : '') +
        '</div>';
      return;
    }

    /* Render từng hàng bài giảng */
    var html = '';
    lectures.forEach(function (lec, index) {
      var isLocked = lec.status === 'locked';
      var statusClass = 'lec-status--' + lec.status;
      var lockedClass = isLocked ? ' lec-row--locked' : '';

      /* Gradient thumbnail dựa trên subject */
      var subject = core.getSubjectById(lec.subjectId);
      var gradFrom = subject ? subject.gradientFrom : '#dbeafe';
      var gradTo = subject ? subject.gradientTo : '#bfdbfe';

      /* Thanh tiến độ cho bài in-progress (giả lập 60%) */
      var progressHtml = '';
      if (lec.status === 'in-progress') {
        var watchPct = core.storageGet('watch:' + lec.id) || 60;
        progressHtml =
          '<div class="progress-row lec-row-progress">' +
            '<progress class="progress" value="' + watchPct + '" max="100">' + watchPct + '%</progress>' +
            '<span class="progress-label">' + watchPct + '%</span>' +
          '</div>';
      }

      /* URL đích — nếu bị khóa thì không điều hướng */
      var href = isLocked ? '#' : (lec.type === 'quiz' ? 'quiz.html?id=' + lec.id : 'lecture.html?id=' + lec.id);

      html +=
        '<a href="' + href + '" class="lec-row' + lockedClass + '" data-lecture-id="' + lec.id + '" data-status="' + lec.status + '"' +
          (isLocked ? ' aria-disabled="true"' : '') + '>' +
          '<div class="lec-row-thumb" style="background: linear-gradient(135deg, ' + gradFrom + ', ' + gradTo + ')">' +
            '<span class="lec-row-type-badge lec-badge--' + lec.type + '">' + TYPE_ICONS[lec.type] + '</span>' +
          '</div>' +
          '<div class="lec-row-body">' +
            '<h3 class="lec-row-title">Lecture ' + lec.order + ' – ' + lec.title + '</h3>' +
            '<p class="lec-row-meta">' + core.formatMeta(lec) + '</p>' +
            progressHtml +
          '</div>' +
          '<div class="lec-row-end">' +
            '<span class="lec-status ' + statusClass + '">' +
              STATUS_ICONS[lec.status] +
              '<span>' + core.formatStatus(lec.status) + '</span>' +
            '</span>' +
            '<span class="lec-row-chevron" aria-hidden="true"></span>' +
          '</div>' +
        '</a>';
    });

    container.innerHTML = html;

    /* Gắn sự kiện click cho các hàng bị khóa — hiện toast */
    container.querySelectorAll('.lec-row--locked').forEach(function (row) {
      row.addEventListener('click', function (e) {
        e.preventDefault();
        core.showToast('Complete the previous lecture to unlock this one.', 'warning');
      });
    });
  }

  /* ====== FILTER TABS ====== */
  function initFilterTabs(containerId, renderCallback) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var tabs = container.querySelectorAll('[role="tab"]');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        /* Bỏ active cũ, đặt active mới */
        tabs.forEach(function (t) { t.setAttribute('aria-selected', 'false'); });
        tab.setAttribute('aria-selected', 'true');

        currentFilter = tab.dataset.filter || 'all';
        if (renderCallback) renderCallback();
      });
    });
  }

  /* ====== SORT DROPDOWN ====== */
  function initSortDropdown(selectId, renderCallback) {
    var select = document.getElementById(selectId);
    if (!select) return;

    select.addEventListener('change', function () {
      currentSort = select.value;
      if (renderCallback) renderCallback();
    });
  }

  /* ====== SEARCH ====== */
  function initSearch(inputId, renderCallback) {
    var input = document.getElementById(inputId);
    if (!input) return;

    var debouncedRender = core.debounce(function () {
      currentSearch = input.value.trim();
      if (renderCallback) renderCallback();
    }, 200);

    input.addEventListener('input', debouncedRender);
  }

  /* ====== KHỞI TẠO TRANG LECTURES LIST ====== */
  function initLecturesPage() {
    var params = new URLSearchParams(window.location.search);
    var currentSubjectId = parseInt(params.get('subject'), 10) || 1;

    function rerender() {
      var subjects = core.getSubjects();
      var exists = subjects.some(function (s) { return s.id === currentSubjectId; });
      if (!exists && subjects.length > 0) {
        currentSubjectId = subjects[0].id;
      }

      // 1. Render danh sách môn học Course Subjects
      renderCourseSubjectsGrid('lec-subjects-grid', currentSubjectId, function (selectedId) {
        currentSubjectId = selectedId;
        try {
          var newUrl = window.location.pathname + '?subject=' + currentSubjectId;
          window.history.replaceState(null, '', newUrl);
        } catch (e) {}
        rerender();
      });

      // 2. Render thẻ tiến độ của môn học đang được chọn
      renderSubjectProgress('lec-subject-progress', currentSubjectId);

      // 3. Render danh sách bài giảng video của môn học đang được chọn
      renderLectureList('lec-list', currentSubjectId);
    }

    // Hiển thị nút LMS Manager nếu là Owner, Admin hoặc Staff
    var userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        var user = JSON.parse(userStr);
        if (['owner', 'admin', 'staff'].includes(user.role)) {
          var toolbar = document.querySelector('.lec-toolbar');
          if (toolbar && !document.getElementById('lec-btn-goto-lms')) {
            var lmsBtn = document.createElement('a');
            lmsBtn.id = 'lec-btn-goto-lms';
            lmsBtn.href = '../admin/admin.html#page-lms';
            lmsBtn.className = 'lec-btn lec-btn--start';
            lmsBtn.style.padding = '8px 16px';
            lmsBtn.style.display = 'inline-flex';
            lmsBtn.style.alignItems = 'center';
            lmsBtn.style.gap = '6px';
            lmsBtn.style.textDecoration = 'none';
            lmsBtn.innerHTML = '⚙️ LMS Manager';
            toolbar.appendChild(lmsBtn);
          }
        }
      } catch (e) {}
    }

    /* Vẽ ban đầu */
    rerender();

    /* Gắn sự kiện toolbar */
    initFilterTabs('lec-filter-tabs', rerender);
    initSortDropdown('lec-sort', rerender);
    initSearch('lec-search', rerender);

    /* Đồng bộ với Backend API để tự động cập nhật nếu có khóa học/bài giảng mới */
    core.syncWithBackend(function () {
      rerender();
    });
  }

  /* ====== KHỞI TẠO TRANG SUBJECT ====== */
  function initSubjectPage() {
    var params = new URLSearchParams(window.location.search);
    var subjectId = parseInt(params.get('id'), 10) || 1;

    function rerender() {
      var subject = core.getSubjectById(subjectId);
      var progress = core.getSubjectProgress(subjectId);
      var allLectures = core.getLectures(subjectId);

      /* Cập nhật breadcrumb và page title */
      if (subject) {
        var breadcrumbCurrent = document.querySelector('.lec-breadcrumb-current');
        if (breadcrumbCurrent) breadcrumbCurrent.textContent = subject.name;
        var pageTitle = document.querySelector('.lec-page-title');
        if (pageTitle) pageTitle.textContent = subject.name + ' – ' + subject.title;
        var pageSub = document.querySelector('.lec-page-subtitle');
        if (pageSub) pageSub.textContent = subject.title + (subject.term ? ' (' + subject.term + ')' : '');
      }

      /* Render header */
      var headerEl = document.getElementById('lec-subject-header');
      if (headerEl && subject) {
        var remaining = core.getRemainingTime(subjectId);
        var totalLectures = allLectures.length;
        var completedCount = allLectures.filter(function (l) { return l.status === 'completed'; }).length;
        var inProgressCount = allLectures.filter(function (l) { return l.status === 'in-progress'; }).length;
        var totalDuration = allLectures.reduce(function (sum, l) { return sum + l.durationMin; }, 0);
        var iconImg = getSubjectIcon(subject.code || subject.name);
        var grad = 'linear-gradient(135deg, ' + (subject.gradientFrom || '#38bdf8') + ', ' + (subject.gradientTo || '#0284c7') + ')';

        headerEl.innerHTML =
          '<div class="lec-subj-header card">' +
            '<div class="lec-subj-top">' +
              '<div class="lec-subj-info">' +
                '<span class="lec-subject-icon" style="background: url(\'' + iconImg + '\') center / 55% no-repeat, ' + grad + '; display: inline-block;" aria-hidden="true"></span>' +
                '<div>' +
                  '<h1 class="lec-subj-title">' + subject.name + '</h1>' +
                  '<p class="lec-subj-subtitle">' + subject.title + '</p>' +
                  '<div class="progress-row">' +
                    '<progress class="progress" value="' + progress.percent + '" max="100">' + progress.percent + '%</progress>' +
                    '<span class="progress-label">' + progress.percent + '%</span>' +
                  '</div>' +
                  '<p class="lec-subj-completed">' + progress.completed + ' / ' + progress.total + ' lectures completed</p>' +
                '</div>' +
              '</div>' +
              '<div class="lec-subj-ring">' +
                '<div class="score-ring" style="--value: ' + progress.percent + '" role="img" aria-label="' + progress.percent + '%">' +
                  '<span class="score-value">' + progress.percent + '%</span>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="lec-quick-stats">' +
              '<h3 class="lec-quick-title">Quick stats</h3>' +
              '<div class="lec-stats-grid">' +
                renderStatItem('📚', totalLectures, 'Lectures') +
                renderStatItem('✅', completedCount, 'Completed') +
                renderStatItem('⏱️', remaining + ' min', 'Remaining') +
                renderStatItem('📖', totalDuration + ' min', 'Total time') +
              '</div>' +
            '</div>' +
          '</div>';
      }

      /* Render danh sách bài giảng */
      renderLectureList('lec-list', subjectId);
    }

    rerender();
    core.syncWithBackend(function () {
      rerender();
    });
  }

  /* Hàm phụ: render 1 stat item cho Quick stats */
  function renderStatItem(icon, value, label) {
    return (
      '<div class="lec-stat-item">' +
        '<span class="lec-stat-icon" aria-hidden="true">' + icon + '</span>' +
        '<span class="lec-stat-value">' + value + '</span>' +
        '<span class="lec-stat-label">' + label + '</span>' +
      '</div>'
    );
  }

  /* ====== KHỞI TẠO TRANG NEXT LECTURES ====== */
  function initNextLecturesPage() {
    var subjectId = 1;
    var allLectures = core.getLectures(subjectId);

    /* Chỉ lấy các bài chưa completed */
    var upcoming = allLectures.filter(function (l) { return l.status !== 'completed'; });

    var container = document.getElementById('lec-next-list');
    if (!container) return;

    if (upcoming.length === 0) {
      container.innerHTML =
        '<div class="lec-empty">' +
          '<p class="lec-empty-text">🎉 All lectures completed! Great job!</p>' +
        '</div>';
      return;
    }

    var html = '';
    upcoming.forEach(function (lec) {
      var isLocked = lec.status === 'locked';
      var href = isLocked ? '#' : (lec.type === 'quiz' ? 'quiz.html?id=' + lec.id : 'lecture.html?id=' + lec.id);
      var btnClass = isLocked ? 'lec-btn--locked' : 'lec-btn--start';
      var btnText = isLocked ? 'Locked' : 'Start';

      var subject = core.getSubjectById(lec.subjectId);
      var gradFrom = subject ? subject.gradientFrom : '#dbeafe';
      var gradTo = subject ? subject.gradientTo : '#bfdbfe';

      html +=
        '<div class="lec-next-row' + (isLocked ? ' lec-row--locked' : '') + '" data-lecture-id="' + lec.id + '">' +
          '<div class="lec-row-thumb" style="background: linear-gradient(135deg, ' + gradFrom + ', ' + gradTo + ')">' +
            '<span class="lec-row-type-badge lec-badge--' + lec.type + '">' + TYPE_ICONS[lec.type] + '</span>' +
          '</div>' +
          '<div class="lec-row-body">' +
            '<h3 class="lec-row-title">Lecture ' + lec.order + ' – ' + lec.title + '</h3>' +
            '<p class="lec-row-meta">' + core.formatMeta(lec) + '</p>' +
            '<p class="lec-next-date">' + lec.dateAdded + '</p>' +
          '</div>' +
          '<div class="lec-row-end">' +
            '<a href="' + href + '" class="lec-btn ' + btnClass + '"' + (isLocked ? ' tabindex="-1"' : '') + '>' +
              btnText + (isLocked ? ' 🔒' : ' →') +
            '</a>' +
          '</div>' +
        '</div>';
    });

    container.innerHTML = html;

    /* Toast cho nút Locked */
    container.querySelectorAll('.lec-btn--locked').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        core.showToast('Complete the previous lecture to unlock this one.', 'warning');
      });
    });
  }

  /* ====== EXPORT ====== */
  window.Lib95.lectures.list = {
    initLecturesPage: initLecturesPage,
    initSubjectPage: initSubjectPage,
    initNextLecturesPage: initNextLecturesPage,
    renderLectureList: renderLectureList,
    renderSubjectProgress: renderSubjectProgress
  };

})();
