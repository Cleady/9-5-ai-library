/**
 * =====================================================================
 * admin-lms.js — Quản lý LMS (Courses, Lectures, Materials, Overview)
 * =====================================================================
 * Dành riêng cho Owner, Admin và Staff.
 * Cho phép tạo môn học, tải lên video, soạn Overview (Feynman & KaTeX),
 * và đính kèm tài liệu học tập kết nối trực tiếp với Backend API.
 * =====================================================================
 */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. KIỂM TRA QUYỀN
  var token = localStorage.getItem('token');
  var userStr = localStorage.getItem('user');
  var currentUser = null;
  try {
    currentUser = JSON.parse(userStr);
  } catch (e) {}

  if (!currentUser || !['owner', 'admin', 'staff'].includes(currentUser.role)) {
    // Member không có quyền quản lý
    return;
  }

  // Helper Headers với Authorization
  function getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (token || '')
    };
  }

  // State
  var allCourses = [];
  var selectedCourseId = null;
  var currentLectures = [];
  var localVideos = [];
  var currentResources = [];
  var isEditingLecture = false;

  // DOM Elements - Courses
  var courseTbody = document.getElementById('lms-course-tbody');
  var courseSearchInput = document.getElementById('lms-course-search');
  var courseCountBadge = document.getElementById('lms-course-count-badge');
  var btnOpenCreateCourse = document.getElementById('lms-btn-open-create-course');

  // Modal Course Elements
  var modalCourse = document.getElementById('modal-course');
  var modalCourseTitle = document.getElementById('modal-course-title');
  var modalCourseForm = document.getElementById('modal-course-form');
  var modalCourseClose = document.getElementById('modal-course-close');
  var modalCourseCancel = document.getElementById('modal-course-btn-cancel');
  var modalCourseSave = document.getElementById('modal-course-btn-save');
  var inputCourseId = document.getElementById('modal-course-id');
  var inputCourseCode = document.getElementById('modal-course-code');
  var inputCourseTerm = document.getElementById('modal-course-term');
  var inputCourseTitle = document.getElementById('modal-course-title-input');
  var inputCourseDesc = document.getElementById('modal-course-desc');
  var inputCourseGradFrom = document.getElementById('modal-course-grad-from');
  var inputCourseGradTo = document.getElementById('modal-course-grad-to');

  // DOM Elements - Lectures & Editor
  var selectCourseFilter = document.getElementById('lms-course-filter-select');
  var currentCourseLabel = document.getElementById('lms-current-course-label');
  var lectureListEl = document.getElementById('lms-lecture-list');
  var btnNewLectureForCourse = document.getElementById('lms-btn-new-lecture-for-course');

  var editorTitle = document.getElementById('lms-editor-title');
  var editorSub = document.getElementById('lms-editor-sub');
  var btnResetForm = document.getElementById('lms-btn-reset-form');
  var btnCancelEdit = document.getElementById('lms-btn-cancel-edit');
  var btnSaveLecture = document.getElementById('lms-btn-save-lecture');

  var inputLecId = document.getElementById('lms-lec-id');
  var selectLecCourse = document.getElementById('lms-lec-course-select');
  var inputLecOrder = document.getElementById('lms-lec-order');
  var inputLecTitle = document.getElementById('lms-lec-title');
  var inputLecDuration = document.getElementById('lms-lec-duration');
  var durationAutoBadge = document.getElementById('lms-duration-auto-badge');
  var durationText = document.getElementById('lms-duration-text');
  var inputLecVideoUrl = document.getElementById('lms-lec-video-url');
  var selectLecVideoDetected = document.getElementById('lms-lec-video-detected');
  var inputLecDesc = document.getElementById('lms-lec-desc');
  var inputLecTakeaways = document.getElementById('lms-lec-takeaways');
  var inputLecOverview = document.getElementById('lms-lec-overview');
  var previewLecOverview = document.getElementById('lms-lec-overview-preview');
  var btnFeynmanTemplate = document.getElementById('lms-btn-feynman-template');
  var btnPreviewOverview = document.getElementById('lms-btn-preview-overview');
  var resourcesContainer = document.getElementById('lms-lec-resources-container');
  var btnAddResource = document.getElementById('lms-btn-add-resource');

  // Video Upload Elements
  var videoUploadArea = document.getElementById('lms-video-upload-area');
  var videoFileInput = document.getElementById('lms-video-file-input');
  var videoEmptyState = document.getElementById('lms-video-upload-empty');
  var videoSelectedState = document.getElementById('lms-video-upload-selected');
  var videoDisplayName = document.getElementById('lms-video-display-name');
  var videoDisplaySize = document.getElementById('lms-video-display-size');
  var videoDisplayDur = document.getElementById('lms-video-display-dur');
  var videoProgress = document.getElementById('lms-video-upload-progress');
  var uploadPercentText = document.getElementById('lms-upload-percent-text');
  var uploadPercentBar = document.getElementById('lms-upload-percent-bar');
  var btnChangeVideo = document.getElementById('lms-btn-change-video');
  var btnRemoveVideo = document.getElementById('lms-btn-remove-video');
  var videoPreview = document.getElementById('lms-video-preview');

  // Video Source Tabs & YouTube Elements
  var inputLecVideoSource = document.getElementById('lms-lec-video-source');
  var inputLecYoutubeId = document.getElementById('lms-lec-youtube-id');
  var tabSourceFile = document.getElementById('lms-tab-source-file');
  var tabSourceLocal = document.getElementById('lms-tab-source-local');
  var tabSourceYoutube = document.getElementById('lms-tab-source-youtube');
  var panelSourceFile = document.getElementById('lms-source-panel-file');
  var panelSourceLocal = document.getElementById('lms-source-panel-local');
  var panelSourceYoutube = document.getElementById('lms-source-panel-youtube');
  var inputYtUrl = document.getElementById('lms-lec-youtube-url');
  var btnCheckYt = document.getElementById('lms-btn-check-youtube');
  var ytStatusContainer = document.getElementById('lms-yt-status-container');
  var ytPreviewCard = document.getElementById('lms-yt-preview-card');
  var ytPreviewThumb = document.getElementById('lms-yt-preview-thumb');
  var ytPreviewTitle = document.getElementById('lms-yt-preview-title');
  var ytPreviewAuthor = document.getElementById('lms-yt-preview-author');
  var ytPreviewLink = document.getElementById('lms-yt-preview-link');
  var btnApplyYtTitle = document.getElementById('lms-btn-apply-yt-title');
  var currentVideoSource = 'file'; // 'file' | 'local' | 'youtube'
  var ytDebounceTimer = null;
  var currentYtTitle = '';

  // Mẫu bài giảng Feynman chuẩn có KaTeX
  var FEYNMAN_TEMPLATE = `<div class="lec-feynman-container">
  <div class="lec-feynman-banner">
    <div class="lec-feynman-tag"><span class="lec-tag-icon">⚡</span> PHƯƠNG PHÁP FEYNMAN · KIẾN THỨC CỐT LÕI</div>
    <h2 class="lec-feynman-headline">BÀI GIẢNG: [TIÊU ĐỀ CHƯƠNG / CHỦ ĐỀ]</h2>
    <p class="lec-feynman-desc">Tóm tắt ngắn gọn mục tiêu bài học: Bản chất nguyên lý, công thức toán và quy tắc áp dụng thực tế.</p>
  </div>

  <!-- PHẦN 1 -->
  <section class="lec-section-card">
    <div class="lec-section-header">
      <span class="lec-section-num">1</span>
      <div>
        <h3 class="lec-section-title">Khái niệm nền tảng</h3>
        <p class="lec-section-subtitle">Bản chất vấn đề giải thích đơn giản nhất</p>
      </div>
    </div>
    <div class="lec-card-body">
      <div class="lec-concept-box">
        <h4>💡 Khái niệm cơ bản</h4>
        <p>Giải thích khái niệm theo trực giác. Viết công thức toán học dùng dấu $ hoặc $$:</p>
      </div>
      <div class="lec-formula-card">
        <span class="lec-formula-label">Biểu thức tổng quát:</span>
        <div class="lec-math-display">
          $$N = \\sum_{i=-\\infty}^{+\\infty} a_i \\times r^i$$
        </div>
      </div>
    </div>
  </section>

  <!-- PHẦN 2 -->
  <section class="lec-section-card">
    <div class="lec-section-header">
      <span class="lec-section-num">2</span>
      <div>
        <h3 class="lec-section-title">Quy trình &amp; Thuật toán từng bước</h3>
        <p class="lec-section-subtitle">Phương pháp giải quyết bài toán cụ thể</p>
      </div>
    </div>
    <div class="lec-card-body">
      <div class="lec-algorithm-grid">
        <div class="lec-algo-card">
          <h4>Bước 1: Chia lặp tìm số dư</h4>
          <ol>
            <li>Thực hiện phép chia liên tiếp cho cơ số $r$.</li>
            <li>Ghi nhận số dư ở mỗi bước lặp.</li>
            <li><strong>Đọc kết quả:</strong> Từ dưới lên trên.</li>
          </ol>
        </div>
        <div class="lec-algo-card">
          <h4>Bước 2: Gom nhóm trọng số</h4>
          <ol>
            <li>Mỗi nhóm 4 bit tạo thành 1 ký tự Hexadecimal.</li>
            <li>Tra bảng quy đổi tương ứng.</li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</div>`;

  // Toast thông báo
  function showToast(msg, type) {
    var toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '10px';
    toast.style.color = '#fff';
    toast.style.fontWeight = '600';
    toast.style.fontSize = '14px';
    toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.18)';
    toast.style.zIndex = '99999';
    toast.style.transition = 'all .3s ease';
    toast.style.background = type === 'error' ? '#ef4444' : '#10b981';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(function () { toast.remove(); }, 300);
    }, 2800);
  }

  // =====================================================================
  // 2. KHÓA HỌC (COURSES) - SỬA LỖI TRÀN CHỮ BẰNG COVER ICON ĐỒNG BỘ
  // =====================================================================
  function loadCourses() {
    fetch('/api/lms/courses')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success && Array.isArray(data.courses)) {
          allCourses = data.courses;
          renderCourses(allCourses);
          populateCourseSelects(allCourses);

          // Nếu chưa chọn khóa học nào, chọn môn đầu tiên
          if (!selectedCourseId && allCourses.length > 0) {
            selectCourse(allCourses[0].id);
          } else if (selectedCourseId) {
            loadLectures(selectedCourseId);
          }
        }
      })
      .catch(function (err) {
        console.error('Lỗi tải môn học:', err);
        if (courseTbody) {
          courseTbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:red;">Lỗi kết nối máy chủ khi tải môn học</td></tr>';
        }
      });
  }

  function renderCourses(courses) {
    if (!courseTbody) return;
    if (courses.length === 0) {
      courseTbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 24px;">Chưa có môn học nào. Hãy bấm "+ Thêm khóa học" để tạo mới!</td></tr>';
      if (courseCountBadge) courseCountBadge.textContent = '0 khóa học';
      return;
    }

    if (courseCountBadge) courseCountBadge.textContent = courses.length + ' khóa học';

    var html = '';
    courses.forEach(function (c) {
      var isCurrent = selectedCourseId === c.id;
      var grad = 'linear-gradient(135deg, ' + (c.gradient_from || '#38bdf8') + ', ' + (c.gradient_to || '#0284c7') + ')';
      
      // Chọn icon chuẩn theo môn học, không nhồi chữ vào trong khung cover để tránh tràn viền
      var iconImg = '/assets/icon/chip.png';
      var codeUpper = (c.code || '').toUpperCase();
      if (codeUpper.indexOf('DB') !== -1 || codeUpper.indexOf('DATA') !== -1) iconImg = '/assets/icon/data.png';
      else if (codeUpper.indexOf('PRO') !== -1 || codeUpper.indexOf('WEB') !== -1) iconImg = '/assets/icon/program.png';
      else if (codeUpper.indexOf('MAS') !== -1 || codeUpper.indexOf('MATH') !== -1) iconImg = '/assets/icon/math.png';
      else if (codeUpper.indexOf('AI') !== -1 || codeUpper.indexOf('ML') !== -1) iconImg = '/assets/icon/Better_Icon/artificial-intellegence.png';

      html +=
        '<tr style="' + (isCurrent ? 'background: rgba(29, 78, 216, 0.04);' : '') + '">' +
          '<td>' +
            '<div style="display: flex; align-items: center; gap: 12px;">' +
              '<span class="course-cover" style="width: 40px; height: 36px; border-radius: 8px; background: url(\'' + iconImg + '\') center / 55% no-repeat, ' + grad + '; flex-shrink: 0; display: inline-block;"></span>' +
              '<span class="lms-course-code" style="font-weight: 700; font-size: 14px; letter-spacing: -0.2px;">' + c.code + '</span>' +
            '</div>' +
          '</td>' +
          '<td>' +
            '<strong>' + c.title + '</strong>' +
            (c.description ? '<br><small class="lms-course-desc">' + (c.description.length > 60 ? c.description.substring(0, 60) + '...' : c.description) + '</small>' : '') +
          '</td>' +
          '<td><span class="tag">' + (c.term || 'Kỳ II') + '</span></td>' +
          '<td><strong style="color: var(--color-primary);">' + (c.lecture_count || 0) + '</strong> bài giảng</td>' +
          '<td><span class="status ' + (c.status === 'active' ? 'active' : 'draft') + '">' + (c.status === 'active' ? 'Đang hoạt động' : 'Nháp') + '</span></td>' +
          '<td style="text-align: right;">' +
            '<div style="display: inline-flex; gap: 6px;">' +
              '<button type="button" class="mini-select lms-action-view" data-id="' + c.id + '" title="Xem danh sách bài giảng" style="cursor: pointer; background: rgba(29,78,216,0.08); color: var(--color-primary); font-weight: 600;">📖 Xem bài</button>' +
              '<button type="button" class="mini-select lms-action-edit" data-id="' + c.id + '" title="Sửa thông tin môn" style="cursor: pointer;">✏️</button>' +
              '<button type="button" class="mini-select lms-action-del" data-id="' + c.id + '" title="Xóa môn" style="cursor: pointer; color: #ef4444;">🗑️</button>' +
            '</div>' +
          '</td>' +
        '</tr>';
    });

    courseTbody.innerHTML = html;

    // Gắn sự kiện click
    courseTbody.querySelectorAll('.lms-action-view').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = parseInt(btn.getAttribute('data-id'), 10);
        selectCourse(id);
      });
    });

    courseTbody.querySelectorAll('.lms-action-edit').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = parseInt(btn.getAttribute('data-id'), 10);
        openEditCourseModal(id);
      });
    });

    courseTbody.querySelectorAll('.lms-action-del').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = parseInt(btn.getAttribute('data-id'), 10);
        deleteCourse(id);
      });
    });
  }

  function populateCourseSelects(courses) {
    var opts = '';
    courses.forEach(function (c) {
      opts += '<option value="' + c.id + '">' + c.code + ' – ' + c.title + '</option>';
    });

    if (selectCourseFilter) selectCourseFilter.innerHTML = opts;
    if (selectLecCourse) selectLecCourse.innerHTML = opts;

    if (selectedCourseId) {
      if (selectCourseFilter) selectCourseFilter.value = selectedCourseId;
      if (selectLecCourse) selectLecCourse.value = selectedCourseId;
    }
  }

  function selectCourse(courseId) {
    selectedCourseId = courseId;
    var course = allCourses.find(function (c) { return c.id === courseId; });
    if (course) {
      if (currentCourseLabel) currentCourseLabel.textContent = 'Đang xem: ' + course.code + ' – ' + course.title;
      if (selectCourseFilter) selectCourseFilter.value = courseId;
      if (selectLecCourse) selectLecCourse.value = courseId;
    }
    renderCourses(allCourses);
    loadLectures(courseId);
    resetLectureForm();
  }

  if (selectCourseFilter) {
    selectCourseFilter.addEventListener('change', function () {
      selectCourse(parseInt(selectCourseFilter.value, 10));
    });
  }

  // Tìm kiếm môn học
  if (courseSearchInput) {
    courseSearchInput.addEventListener('input', function () {
      var query = courseSearchInput.value.toLowerCase().trim();
      var filtered = allCourses.filter(function (c) {
        return c.code.toLowerCase().indexOf(query) !== -1 || c.title.toLowerCase().indexOf(query) !== -1;
      });
      renderCourses(filtered);
    });
  }

  // Modal Tạo / Sửa môn học
  function openCreateCourseModal() {
    inputCourseId.value = '';
    inputCourseCode.value = '';
    inputCourseTitle.value = '';
    inputCourseDesc.value = '';
    inputCourseTerm.value = 'Kỳ II';
    inputCourseGradFrom.value = '#38bdf8';
    inputCourseGradTo.value = '#0284c7';
    modalCourseTitle.textContent = 'Thêm môn học mới';
    modalCourse.style.display = 'flex';
  }

  function openEditCourseModal(courseId) {
    var course = allCourses.find(function (c) { return c.id === courseId; });
    if (!course) return;

    inputCourseId.value = course.id;
    inputCourseCode.value = course.code;
    inputCourseTitle.value = course.title;
    inputCourseDesc.value = course.description || '';
    inputCourseTerm.value = course.term || 'Kỳ II';
    inputCourseGradFrom.value = course.gradient_from || '#38bdf8';
    inputCourseGradTo.value = course.gradient_to || '#0284c7';
    modalCourseTitle.textContent = 'Chỉnh sửa môn học: ' + course.code;
    modalCourse.style.display = 'flex';
  }

  function closeCourseModal() {
    modalCourse.style.display = 'none';
  }

  if (btnOpenCreateCourse) btnOpenCreateCourse.addEventListener('click', openCreateCourseModal);
  if (modalCourseClose) modalCourseClose.addEventListener('click', closeCourseModal);
  if (modalCourseCancel) modalCourseCancel.addEventListener('click', closeCourseModal);

  if (modalCourseSave) {
    modalCourseSave.addEventListener('click', function () {
      var id = inputCourseId.value;
      var code = inputCourseCode.value.trim();
      var title = inputCourseTitle.value.trim();
      var term = inputCourseTerm.value.trim();
      var desc = inputCourseDesc.value.trim();
      var gradFrom = inputCourseGradFrom.value;
      var gradTo = inputCourseGradTo.value;

      if (!code || !title) {
        alert('Vui lòng điền đầy đủ Mã môn và Tên môn học!');
        return;
      }

      var payload = {
        code: code,
        name: code,
        title: title,
        term: term,
        description: desc,
        gradient_from: gradFrom,
        gradient_to: gradTo
      };

      var url = id ? '/api/lms/courses/' + id : '/api/lms/courses';
      var method = id ? 'PUT' : 'POST';

      fetch(url, {
        method: method,
        headers: getHeaders(),
        body: JSON.stringify(payload)
      })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          showToast(id ? 'Cập nhật môn học thành công!' : 'Tạo môn học mới thành công!');
          closeCourseModal();
          loadCourses();
        } else {
          alert('Lỗi: ' + (data.error || 'Không thể lưu môn học'));
        }
      })
      .catch(function (err) {
        console.error(err);
        alert('Lỗi kết nối khi lưu môn học');
      });
    });
  }

  function deleteCourse(courseId) {
    var course = allCourses.find(function (c) { return c.id === courseId; });
    if (!confirm('Bạn có chắc chắn muốn xóa môn học "' + (course ? course.code : courseId) + '" và tất cả bài giảng liên quan?')) {
      return;
    }

    fetch('/api/lms/courses/' + courseId, {
      method: 'DELETE',
      headers: getHeaders()
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (data.success) {
        showToast('Đã xóa môn học thành công!');
        if (selectedCourseId === courseId) selectedCourseId = null;
        loadCourses();
      } else {
        alert('Lỗi: ' + (data.error || 'Không thể xóa môn học'));
      }
    })
    .catch(function (err) {
      console.error(err);
      alert('Lỗi kết nối khi xóa môn học');
    });
  }

  // =====================================================================
  // 3. QUẢN LÝ VIDEO UPLOAD & LỰA CHỌN VIDEO BÀI GIẢNG
  // =====================================================================
  function formatSeconds(sec) {
    if (!sec || isNaN(sec)) return '';
    var totalSec = Math.round(sec);
    var m = Math.floor(totalSec / 60);
    var s = totalSec % 60;
    if (m > 0 && s > 0) return m + ' phút ' + (s < 10 ? '0' + s : s) + ' giây';
    if (m > 0) return m + ' phút';
    return s + ' giây';
  }

  function updateDurationUI(durationMin, formattedText, isAuto) {
    if (inputLecDuration) {
      inputLecDuration.value = durationMin || 0;
    }
    if (!durationAutoBadge || !durationText) return;

    if (!durationMin || durationMin <= 0) {
      durationAutoBadge.style.background = '#f1f5f9';
      durationAutoBadge.style.color = '#64748b';
      durationAutoBadge.style.borderColor = '#e2e8f0';
      durationText.textContent = 'Tự động nhận diện khi có video';
      if (videoDisplayDur) videoDisplayDur.textContent = '--';
    } else {
      durationAutoBadge.style.background = '#ecfdf5';
      durationAutoBadge.style.color = '#059669';
      durationAutoBadge.style.borderColor = '#a7f3d0';
      var label = formattedText || (durationMin + ' phút');
      durationText.textContent = label + (isAuto ? ' (Tự động)' : '');
      if (videoDisplayDur) videoDisplayDur.textContent = label;
    }
  }

  function setVideoAssigned(url, displayName, sizeText, durationMin, formattedText) {
    if (inputLecVideoUrl) inputLecVideoUrl.value = url || '';
    if (videoDisplayName) videoDisplayName.textContent = displayName || 'Video_bai_giang.mp4';
    if (videoDisplaySize) videoDisplaySize.textContent = sizeText || 'Video file';

    if (durationMin && durationMin > 0) {
      updateDurationUI(durationMin, formattedText, true);
    }

    if (videoPreview) {
      if (url) {
        videoPreview.src = url;
        videoPreview.style.display = 'block';
      } else {
        videoPreview.src = '';
        videoPreview.style.display = 'none';
      }
    }

    if (videoEmptyState) videoEmptyState.style.display = 'none';
    if (videoSelectedState) videoSelectedState.style.display = 'flex';
    if (videoProgress) videoProgress.style.display = 'none';

    // Đồng bộ với dropdown detected nếu khớp
    if (selectLecVideoDetected && url) {
      selectLecVideoDetected.value = url;
    }
  }

  function clearVideoAssigned() {
    if (inputLecVideoUrl) inputLecVideoUrl.value = '';
    if (videoFileInput) videoFileInput.value = '';
    if (videoPreview) {
      videoPreview.src = '';
      videoPreview.style.display = 'none';
    }
    if (videoEmptyState) videoEmptyState.style.display = 'flex';
    if (videoSelectedState) videoSelectedState.style.display = 'none';
    if (videoProgress) videoProgress.style.display = 'none';
    if (selectLecVideoDetected) selectLecVideoDetected.value = '';
    updateDurationUI(0, '', false);
  }

  function handleUploadVideoFile(file) {
    if (!file) return;

    var detectedMins = 0;
    var detectedFmt = '';

    // 1. Tự động kiểm tra thời lượng video ngay trên trình duyệt bằng HTMLVideoElement
    try {
      var tempVideo = document.createElement('video');
      tempVideo.preload = 'metadata';
      tempVideo.src = URL.createObjectURL(file);
      tempVideo.onloadedmetadata = function () {
        var durSec = tempVideo.duration;
        if (durSec && !isNaN(durSec)) {
          detectedMins = Math.ceil(durSec / 60);
          detectedFmt = formatSeconds(durSec);
          updateDurationUI(detectedMins, detectedFmt, true);
          if (videoDisplayDur) videoDisplayDur.textContent = detectedFmt;
        }
      };
    } catch (e) {}

    // Gợi ý tên bài giảng nếu chưa nhập
    if (inputLecTitle && !inputLecTitle.value.trim()) {
      var cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
      inputLecTitle.value = cleanTitle;
    }

    var sizeMB = (file.size / (1024 * 1024)).toFixed(1) + ' MB';

    // 2. Upload file lên backend
    if (videoEmptyState) videoEmptyState.style.display = 'none';
    if (videoSelectedState) videoSelectedState.style.display = 'none';
    if (videoProgress) videoProgress.style.display = 'block';
    if (uploadPercentBar) uploadPercentBar.style.width = '0%';
    if (uploadPercentText) uploadPercentText.textContent = '0%';

    var formData = new FormData();
    formData.append('video', file);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/lms/upload-video', true);
    if (token) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    }

    xhr.upload.onprogress = function (e) {
      if (e.lengthComputable) {
        var pct = Math.round((e.loaded / e.total) * 100);
        if (uploadPercentBar) uploadPercentBar.style.width = pct + '%';
        if (uploadPercentText) uploadPercentText.textContent = pct + '%';
      }
    };

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          var resp = JSON.parse(xhr.responseText);
          if (resp.success) {
            var finalMin = resp.duration_min || detectedMins || 1;
            var finalFmt = resp.formatted_duration || detectedFmt || (finalMin + ' phút');
            setVideoAssigned(resp.url, resp.filename || file.name, resp.size || sizeMB, finalMin, finalFmt);
            showToast('Tải lên video thành công! Đã tự động nhận diện thời lượng: ' + finalFmt);
            loadLocalVideos();
          } else {
            alert('Lỗi tải lên: ' + (resp.error || 'Thất bại'));
            clearVideoAssigned();
          }
        } catch (err) {
          alert('Lỗi phản hồi máy chủ khi tải video');
          clearVideoAssigned();
        }
      } else {
        alert('Lỗi tải video (mã ' + xhr.status + ')');
        clearVideoAssigned();
      }
    };

    xhr.onerror = function () {
      alert('Lỗi mạng khi tải lên video');
      clearVideoAssigned();
    };

    xhr.send(formData);
  }

  // Click vào vùng Upload Area
  if (videoUploadArea) {
    videoUploadArea.addEventListener('click', function (e) {
      if (e.target.closest('#lms-btn-remove-video') || e.target.closest('#lms-btn-change-video') || e.target.closest('#lms-video-preview')) return;
      if (videoFileInput) videoFileInput.click();
    });

    videoUploadArea.addEventListener('dragover', function (e) {
      e.preventDefault();
      videoUploadArea.style.borderColor = 'var(--color-primary)';
      videoUploadArea.style.background = 'rgba(29, 78, 216, 0.08)';
    });

    ['dragleave', 'dragend'].forEach(function (ev) {
      videoUploadArea.addEventListener(ev, function () {
        videoUploadArea.style.borderColor = '#93c5fd';
        videoUploadArea.style.background = 'rgba(59,130,246,0.03)';
      });
    });

    videoUploadArea.addEventListener('drop', function (e) {
      e.preventDefault();
      videoUploadArea.style.borderColor = '#93c5fd';
      videoUploadArea.style.background = 'rgba(59,130,246,0.03)';
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleUploadVideoFile(e.dataTransfer.files[0]);
      }
    });
  }

  if (videoFileInput) {
    videoFileInput.addEventListener('change', function () {
      if (videoFileInput.files && videoFileInput.files.length > 0) {
        handleUploadVideoFile(videoFileInput.files[0]);
      }
    });
  }

  if (btnRemoveVideo) {
    btnRemoveVideo.addEventListener('click', function (e) {
      e.stopPropagation();
      clearVideoAssigned();
    });
  }

  if (btnChangeVideo) {
    btnChangeVideo.addEventListener('click', function (e) {
      e.stopPropagation();
      if (videoFileInput) videoFileInput.click();
    });
  }

  // =====================================================================
  // 3.1. QUẢN LÝ NGUỒN VIDEO (TABS: FILE / LOCAL / YOUTUBE)
  // =====================================================================
  function setVideoSourceTab(source) {
    currentVideoSource = source;
    if (inputLecVideoSource) {
      inputLecVideoSource.value = (source === 'youtube') ? 'youtube' : 'file';
    }

    var tabs = [
      { btn: tabSourceFile, panel: panelSourceFile, key: 'file' },
      { btn: tabSourceLocal, panel: panelSourceLocal, key: 'local' },
      { btn: tabSourceYoutube, panel: panelSourceYoutube, key: 'youtube' }
    ];

    tabs.forEach(function (t) {
      if (t.btn) {
        if (t.key === source) {
          t.btn.classList.add('is-active');
          t.btn.setAttribute('aria-selected', 'true');
        } else {
          t.btn.classList.remove('is-active');
          t.btn.setAttribute('aria-selected', 'false');
        }
      }
      if (t.panel) {
        t.panel.style.display = (t.key === source) ? 'block' : 'none';
      }
    });
  }

  if (tabSourceFile) {
    tabSourceFile.addEventListener('click', function () { setVideoSourceTab('file'); });
  }
  if (tabSourceLocal) {
    tabSourceLocal.addEventListener('click', function () { setVideoSourceTab('local'); });
  }
  if (tabSourceYoutube) {
    tabSourceYoutube.addEventListener('click', function () { setVideoSourceTab('youtube'); });
  }

  function setYtStatus(type, message) {
    if (!ytStatusContainer) return;
    ytStatusContainer.className = 'lms-yt-status-badge ' + (type ? ('is-' + type) : '');
    ytStatusContainer.textContent = message || '';
  }

  function handleCheckYouTube() {
    if (!inputYtUrl) return;
    var raw = inputYtUrl.value.trim();
    if (!raw) {
      setYtStatus('', '');
      if (ytPreviewCard) ytPreviewCard.style.display = 'none';
      if (inputLecYoutubeId) inputLecYoutubeId.value = '';
      return;
    }

    if (!window.Lib95 || !window.Lib95.youtube) {
      setYtStatus('error', '⚠️ Thư viện YouTube chưa được tải');
      return;
    }

    var ytId = window.Lib95.youtube.extractYouTubeId(raw);
    if (!ytId) {
      setYtStatus('error', '⚠️ Link YouTube không hợp lệ. Chỉ chấp nhận link từ youtube.com hoặc youtu.be.');
      if (ytPreviewCard) ytPreviewCard.style.display = 'none';
      if (inputLecYoutubeId) inputLecYoutubeId.value = '';
      return;
    }

    setYtStatus('loading', '⏳ Đang kiểm tra video và nhận diện thời lượng...');

    var canonicalUrl = window.Lib95.youtube.canonicalWatchUrl(ytId);
    var thumbUrl = window.Lib95.youtube.thumbnailUrl(ytId);

    // Fetch oEmbed info from backend proxy
    fetch('/api/lms/youtube-info?url=' + encodeURIComponent(canonicalUrl), {
      headers: getHeaders()
    })
    .then(function (res) {
      return res.json().then(function (data) {
        return { status: res.status, data: data };
      });
    })
    .then(function (result) {
      if (result.status === 200 && result.data) {
        var info = result.data;
        currentYtTitle = info.title || '';
        if (inputLecYoutubeId) inputLecYoutubeId.value = info.youtubeId;
        if (inputLecVideoUrl) inputLecVideoUrl.value = info.canonicalUrl;

        // Display preview card safely using textContent and setAttribute
        if (ytPreviewThumb) {
          ytPreviewThumb.src = info.thumbnailUrl || thumbUrl;
          ytPreviewThumb.alt = info.title || 'YouTube Video';
        }
        if (ytPreviewTitle) {
          ytPreviewTitle.textContent = info.title || ('Video #' + info.youtubeId);
        }
        if (ytPreviewAuthor) {
          ytPreviewAuthor.textContent = 'Kênh: ' + (info.authorName || 'YouTube');
        }
        if (ytPreviewLink) {
          ytPreviewLink.href = info.canonicalUrl;
        }
        if (ytPreviewCard) {
          ytPreviewCard.style.display = 'flex';
        }

        // Tự động gợi ý tên bài giảng nếu chưa nhập
        if (inputLecTitle && !inputLecTitle.value.trim() && info.title) {
          inputLecTitle.value = info.title;
        }

        setYtStatus('success', '✓ Video hợp lệ: ' + (info.title || info.youtubeId));

        // Nhận diện thời lượng video bằng offscreen iframe player
        window.Lib95.youtube.detectDuration(info.youtubeId, { timeoutMs: 8000 })
          .then(function (mins) {
            if (mins && mins > 0) {
              updateDurationUI(mins, mins + ' phút', true);
              if (inputLecDuration) inputLecDuration.value = mins;
              setYtStatus('success', '✓ Đã nhận diện: ' + (info.title || info.youtubeId) + ' (' + mins + ' phút)');
            } else {
              var fallbackMin = parseInt(inputLecDuration.value, 10) || 15;
              updateDurationUI(fallbackMin, fallbackMin + ' phút', false);
              setYtStatus('success', '✓ Video hợp lệ. Vui lòng kiểm tra lại số phút bài giảng ở trên.');
            }
          })
          .catch(function () {
            var fallbackMin = parseInt(inputLecDuration.value, 10) || 15;
            updateDurationUI(fallbackMin, fallbackMin + ' phút', false);
          });

      } else {
        var errCode = result.data ? result.data.code : '';
        var errMsg = result.data ? result.data.error : 'Lỗi khi kiểm tra link YouTube';
        if (errCode === 'EMBED_DISABLED') {
          setYtStatus('error', '⚠️ Video riêng tư hoặc chủ sở hữu đã tắt tính năng nhúng.');
        } else if (errCode === 'NOT_FOUND') {
          setYtStatus('error', '⚠️ Video không tồn tại hoặc đã bị xóa trên YouTube.');
        } else {
          setYtStatus('error', '⚠️ ' + errMsg);
        }
        if (ytPreviewCard) ytPreviewCard.style.display = 'none';
        if (inputLecYoutubeId) inputLecYoutubeId.value = '';
      }
    })
    .catch(function (err) {
      setYtStatus('error', '⚠️ Không thể kết nối để kiểm tra link YouTube.');
    });
  }

  if (inputYtUrl) {
    inputYtUrl.addEventListener('input', function () {
      clearTimeout(ytDebounceTimer);
      ytDebounceTimer = setTimeout(handleCheckYouTube, 600);
    });
    inputYtUrl.addEventListener('paste', function () {
      setTimeout(handleCheckYouTube, 100);
    });
  }

  if (btnCheckYt) {
    btnCheckYt.addEventListener('click', function () {
      clearTimeout(ytDebounceTimer);
      handleCheckYouTube();
    });
  }

  if (btnApplyYtTitle) {
    btnApplyYtTitle.addEventListener('click', function () {
      if (currentYtTitle && inputLecTitle) {
        inputLecTitle.value = currentYtTitle;
        showToast('Đã áp dụng tiêu đề video từ YouTube!');
      }
    });
  }

  if (inputLecDuration) {
    inputLecDuration.addEventListener('input', function () {
      var val = parseInt(inputLecDuration.value, 10);
      if (val && val > 0 && durationAutoBadge && durationText) {
        durationAutoBadge.style.background = '#f1f5f9';
        durationAutoBadge.style.color = '#334155';
        durationAutoBadge.style.borderColor = '#cbd5e1';
        durationText.textContent = val + ' phút (Chỉnh sửa thủ công)';
      }
    });
  }


  // =====================================================================
  // 4. DANH SÁCH BÀI GIẢNG (LECTURES)
  // =====================================================================
  function loadLectures(courseId) {
    if (!courseId) return;
    fetch('/api/lms/courses/' + courseId + '/lectures')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          currentLectures = data.lectures || [];
          renderLectures(currentLectures);
        }
      })
      .catch(function (err) {
        console.error('Lỗi tải bài giảng:', err);
      });
  }

  function renderLectures(lectures) {
    if (!lectureListEl) return;
    if (lectures.length === 0) {
      lectureListEl.innerHTML = '<li style="color: #64748b; padding: 12px 0;">Môn học này chưa có bài giảng nào. Hãy điền form bên trái để thêm bài mới!</li>';
      return;
    }

    var html = '';
    lectures.forEach(function (l) {
      var isCurrent = isEditingLecture && parseInt(inputLecId.value, 10) === l.id;
      var ytBadge = (l.video_source === 'youtube' || l.youtube_id) ? '<span class="tag" style="background: rgba(239, 68, 68, 0.1); color: #dc2626; font-size: 10px; font-weight: 600; padding: 1px 5px; border-radius: 4px; margin-left: 6px;">YouTube</span>' : '';
      html +=
        '<li style="' + (isCurrent ? 'background: rgba(29, 78, 216, 0.06); border-radius: 8px;' : '') + '">' +
          '<span><strong>' + l.chapter_order + '.</strong> ' + l.title + ytBadge + '</span>' +
          '<time>' + l.duration_min + 'm</time>' +
          '<div style="display: flex; gap: 4px;">' +
            '<button type="button" class="lms-btn-edit-lec" data-id="' + l.id + '" title="Chỉnh sửa bài giảng" style="cursor: pointer;">✎</button>' +
            '<button type="button" class="lms-btn-del-lec" data-id="' + l.id + '" title="Xóa bài giảng" style="cursor: pointer; color: #ef4444;">✕</button>' +
          '</div>' +
        '</li>';
    });

    lectureListEl.innerHTML = html;

    // Gắn sự kiện sửa / xóa
    lectureListEl.querySelectorAll('.lms-btn-edit-lec').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = parseInt(btn.getAttribute('data-id'), 10);
        editLecture(id);
      });
    });

    lectureListEl.querySelectorAll('.lms-btn-del-lec').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = parseInt(btn.getAttribute('data-id'), 10);
        deleteLecture(id);
      });
    });
  }

  // =====================================================================
  // 5. FORM THÊM / SỬA BÀI GIẢNG
  // =====================================================================
  if (inputLecOrder) {
    inputLecOrder.addEventListener('input', function () {
      var val = parseInt(inputLecOrder.value, 10);
      var curLecId = inputLecId.value ? parseInt(inputLecId.value, 10) : null;
      var isDuplicate = currentLectures.some(function (l) {
        return l.chapter_order === val && l.id !== curLecId;
      });
      var warnEl = document.getElementById('lms-lec-order-warn');
      if (isDuplicate) {
        if (!warnEl) {
          warnEl = document.createElement('div');
          warnEl.id = 'lms-lec-order-warn';
          warnEl.style.cssText = 'color: #d97706; font-size: 11px; margin-top: 4px; font-weight: 500;';
          inputLecOrder.parentNode.appendChild(warnEl);
        }
        warnEl.textContent = '⚠️ Thứ tự ' + val + ' đã có trong môn học. Hệ thống sẽ sắp xếp hiển thị ổn định theo ID.';
      } else if (warnEl) {
        warnEl.remove();
      }
    });
  }

  function resetLectureForm() {
    isEditingLecture = false;
    inputLecId.value = '';
    inputLecTitle.value = '';
    inputLecOrder.value = (currentLectures.length + 1) || 1;
    var warnEl = document.getElementById('lms-lec-order-warn');
    if (warnEl) warnEl.remove();
    inputLecDuration.value = 15;
    inputLecDesc.value = '';
    inputLecTakeaways.value = '';
    inputLecOverview.value = '';
    clearVideoAssigned();
    updateDurationUI(0, '', false);
    currentResources = [];
    renderResources();

    // Reset YouTube & Source Tabs
    if (inputYtUrl) inputYtUrl.value = '';
    if (inputLecYoutubeId) inputLecYoutubeId.value = '';
    currentYtTitle = '';
    setYtStatus('', '');
    if (ytPreviewCard) ytPreviewCard.style.display = 'none';
    setVideoSourceTab('file');

    if (editorTitle) editorTitle.textContent = 'Thêm bài giảng mới';
    if (editorSub) editorSub.textContent = 'Điền thông tin chương bài giảng, video và nội dung tổng quan';
    if (btnCancelEdit) btnCancelEdit.style.display = 'none';
    if (btnSaveLecture) btnSaveLecture.textContent = '💾 Lưu bài giảng mới';
    if (previewLecOverview) previewLecOverview.style.display = 'none';
    renderLectures(currentLectures);
  }

  if (btnResetForm) btnResetForm.addEventListener('click', resetLectureForm);
  if (btnNewLectureForCourse) btnNewLectureForCourse.addEventListener('click', resetLectureForm);
  if (btnCancelEdit) btnCancelEdit.addEventListener('click', resetLectureForm);

  function editLecture(lectureId) {
    fetch('/api/lms/lectures/' + lectureId)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data.success || !data.lecture) return;
        var l = data.lecture;

        isEditingLecture = true;
        inputLecId.value = l.id;
        selectLecCourse.value = l.course_id;
        inputLecOrder.value = l.chapter_order;
        inputLecTitle.value = l.title;
        inputLecDuration.value = l.duration_min || 1;
        inputLecDesc.value = l.description || '';

        var isYoutube = (l.video_source === 'youtube') || Boolean(l.youtube_id);

        if (isYoutube) {
          setVideoSourceTab('youtube');
          var ytId = l.youtube_id || (window.Lib95 && window.Lib95.youtube ? window.Lib95.youtube.extractYouTubeId(l.video_url) : '');
          var canonical = l.video_url || (window.Lib95 && window.Lib95.youtube ? window.Lib95.youtube.canonicalWatchUrl(ytId) : '');
          if (inputYtUrl) inputYtUrl.value = canonical;
          if (inputLecVideoUrl) inputLecVideoUrl.value = canonical;
          if (inputLecYoutubeId) inputLecYoutubeId.value = ytId || '';

          // Display YouTube preview card safely
          var thumb = l.thumbnail_url || (window.Lib95 && window.Lib95.youtube ? window.Lib95.youtube.thumbnailUrl(ytId) : '');
          if (ytPreviewThumb) {
            ytPreviewThumb.src = thumb;
            ytPreviewThumb.alt = l.title;
          }
          if (ytPreviewTitle) {
            ytPreviewTitle.textContent = l.title;
          }
          if (ytPreviewAuthor) {
            ytPreviewAuthor.textContent = 'Nguồn: YouTube' + (ytId ? (' (' + ytId + ')') : '');
          }
          if (ytPreviewLink) {
            ytPreviewLink.href = canonical;
          }
          if (ytPreviewCard) {
            ytPreviewCard.style.display = 'flex';
          }
          currentYtTitle = l.title;
          setYtStatus('success', '✓ Bài giảng đang dùng nguồn YouTube');
          var savedMin = l.duration_min || 1;
          updateDurationUI(savedMin, savedMin + ' phút', false);
        } else {
          // File-based lecture
          var isLocalVideo = false;
          if (localVideos && localVideos.some(function (v) { return v.url === l.video_url; })) {
            isLocalVideo = true;
          }

          if (isLocalVideo) {
            setVideoSourceTab('local');
            if (selectLecVideoDetected) selectLecVideoDetected.value = l.video_url;
          } else {
            setVideoSourceTab('file');
          }

          if (l.video_url) {
            var fName = decodeURIComponent(l.video_url.split('/').pop() || 'Video.mp4');
            var savedMin = l.duration_min || 1;
            setVideoAssigned(l.video_url, fName, 'Đã lưu trên hệ thống', savedMin, savedMin + ' phút');
            updateDurationUI(savedMin, savedMin + ' phút', false);
          } else {
            clearVideoAssigned();
          }
        }

        // Takeaways
        if (Array.isArray(l.key_takeaways)) {
          inputLecTakeaways.value = l.key_takeaways.join('\n');
        } else if (typeof l.key_takeaways === 'string') {
          try {
            var parsed = JSON.parse(l.key_takeaways);
            inputLecTakeaways.value = Array.isArray(parsed) ? parsed.join('\n') : l.key_takeaways;
          } catch (e) {
            inputLecTakeaways.value = l.key_takeaways;
          }
        } else {
          inputLecTakeaways.value = '';
        }

        inputLecOverview.value = l.overview_html || '';

        // Resources
        currentResources = Array.isArray(l.resources) ? l.resources : [];
        renderResources();

        if (editorTitle) editorTitle.textContent = 'Sửa bài giảng: ' + l.title;
        if (editorSub) editorSub.textContent = 'Đang chỉnh sửa bài giảng ID #' + l.id;
        if (btnCancelEdit) btnCancelEdit.style.display = 'inline-block';
        if (btnSaveLecture) btnSaveLecture.textContent = '💾 Cập nhật bài giảng';

        // Cuộn nhẹ tới form
        var formCard = document.querySelector('.editor-panel');
        if (formCard) formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });

        renderLectures(currentLectures);
      })
      .catch(function (err) {
        console.error('Lỗi khi tải chi tiết bài giảng:', err);
      });
  }

  function deleteLecture(lectureId) {
    if (!confirm('Bạn có chắc chắn muốn xóa bài giảng này?')) return;
    fetch('/api/lms/lectures/' + lectureId, {
      method: 'DELETE',
      headers: getHeaders()
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (data.success) {
        showToast('Đã xóa bài giảng thành công!');
        if (isEditingLecture && parseInt(inputLecId.value, 10) === lectureId) {
          resetLectureForm();
        }
        loadCourses();
        loadLectures(selectedCourseId);
      } else {
        alert('Lỗi: ' + (data.error || 'Không thể xóa bài giảng'));
      }
    })
    .catch(function (err) {
      console.error(err);
      alert('Lỗi kết nối khi xóa bài giảng');
    });
  }

  // Lưu bài giảng (Create / Update)
  if (btnSaveLecture) {
    btnSaveLecture.addEventListener('click', function () {
      var courseId = parseInt(selectLecCourse.value, 10);
      var title = inputLecTitle.value.trim();
      var order = parseInt(inputLecOrder.value, 10) || 1;
      var duration = parseInt(inputLecDuration.value, 10) || 1;
      var desc = inputLecDesc.value.trim();
      var overview = inputLecOverview.value.trim();

      if (!courseId) {
        alert('Vui lòng chọn khóa học cho bài giảng!');
        return;
      }
      if (!title) {
        alert('Vui lòng nhập tên bài giảng / chương!');
        return;
      }

      var finalSource = inputLecVideoSource ? inputLecVideoSource.value : 'file';
      var videoUrl = '';
      var youtubeId = null;

      if (finalSource === 'youtube') {
        var ytInput = inputYtUrl ? inputYtUrl.value.trim() : '';
        var rawUrl = inputLecVideoUrl.value.trim() || ytInput;
        if (!window.Lib95 || !window.Lib95.youtube) {
          alert('Thư viện YouTube chưa sẵn sàng');
          return;
        }
        youtubeId = inputLecYoutubeId ? inputLecYoutubeId.value.trim() : '';
        if (!youtubeId) {
          youtubeId = window.Lib95.youtube.extractYouTubeId(rawUrl);
        }
        if (!youtubeId) {
          alert('Vui lòng nhập đường link YouTube hợp lệ!');
          if (inputYtUrl) inputYtUrl.focus();
          return;
        }
        videoUrl = window.Lib95.youtube.canonicalWatchUrl(youtubeId);
        if (!duration || duration < 1) {
          alert('Vui lòng nhập thời lượng bài giảng (số phút >= 1)!');
          if (inputLecDuration) inputLecDuration.focus();
          return;
        }
      } else {
        // File source (upload or local)
        if (currentVideoSource === 'local' && selectLecVideoDetected && selectLecVideoDetected.value) {
          videoUrl = selectLecVideoDetected.value;
        } else {
          videoUrl = inputLecVideoUrl ? inputLecVideoUrl.value.trim() : '';
        }

        if (!videoUrl) {
          alert('Vui lòng tải lên hoặc chọn video cho bài giảng!');
          return;
        }
      }

      // Tách takeaways theo từng dòng
      var takeaways = inputLecTakeaways.value
        .split('\n')
        .map(function (s) { return s.trim(); })
        .filter(function (s) { return s.length > 0; });

      var payload = {
        course_id: courseId,
        title: title,
        chapter_order: order,
        type: 'video',
        duration_min: duration,
        video_source: finalSource,
        video_url: videoUrl,
        youtube_id: youtubeId,
        description: desc,
        key_takeaways: takeaways,
        overview_html: overview,
        resources: currentResources
      };

      var lecId = inputLecId.value;
      var url = lecId ? '/api/lms/lectures/' + lecId : '/api/lms/courses/' + courseId + '/lectures';
      var method = lecId ? 'PUT' : 'POST';


      fetch(url, {
        method: method,
        headers: getHeaders(),
        body: JSON.stringify(payload)
      })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          showToast(lecId ? 'Cập nhật bài giảng thành công!' : 'Tạo bài giảng mới thành công!');
          resetLectureForm();
          loadCourses();
          loadLectures(courseId);
        } else {
          alert('Lỗi: ' + (data.error || 'Không thể lưu bài giảng'));
        }
      })
      .catch(function (err) {
        console.error(err);
        alert('Lỗi kết nối khi lưu bài giảng');
      });
    });
  }

  // =====================================================================
  // 6. VIDEO BROWSER (QUÉT TỆP VIDEO TỰ ĐỘNG)
  // =====================================================================
  function loadLocalVideos() {
    fetch('/api/lms/browse-videos', { headers: getHeaders() })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success && Array.isArray(data.videos)) {
          localVideos = data.videos;
          var opts = '<option value="">-- Chọn video có sẵn trong thư mục document/Lectures/ --</option>';
          localVideos.forEach(function (v) {
            var durLabel = v.formatted_duration ? (' · ' + v.formatted_duration) : '';
            opts += '<option value="' + v.url + '">' + v.name + ' (' + v.size + durLabel + ')</option>';
          });
          if (selectLecVideoDetected) selectLecVideoDetected.innerHTML = opts;
        }
      })
      .catch(function (err) {
        console.warn('Lỗi browse-videos:', err);
      });
  }

  if (selectLecVideoDetected) {
    selectLecVideoDetected.addEventListener('change', function () {
      var val = selectLecVideoDetected.value;
      if (val) {
        var matched = localVideos.find(function (v) { return v.url === val; });
        var displayName = matched ? matched.name : val.split('/').pop();
        var size = matched ? matched.size : 'Sẵn có';
        var preMin = matched && matched.duration_min ? matched.duration_min : 0;
        var preFmt = matched && matched.formatted_duration ? matched.formatted_duration : '';

        if (preMin > 0) {
          updateDurationUI(preMin, preFmt, true);
          setVideoAssigned(val, displayName, size, preMin, preFmt);
        } else {
          setVideoAssigned(val, displayName, size, 0, '');
        }

        // Nhận diện thời lượng video bằng in-memory video để lấy thời lượng chính xác
        try {
          var v = document.createElement('video');
          v.preload = 'metadata';
          v.src = val;
          v.onloadedmetadata = function () {
            if (v.duration && !isNaN(v.duration)) {
              var mins = Math.ceil(v.duration / 60);
              var fmt = formatSeconds(v.duration);
              updateDurationUI(mins, fmt, true);
              if (videoDisplayDur) videoDisplayDur.textContent = fmt;
            }
          };
        } catch (e) {}

        if (!inputLecTitle.value) {
          inputLecTitle.value = displayName.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
        }
      } else {
        clearVideoAssigned();
      }
    });
  }

  // =====================================================================
  // 7. TIỆN ÍCH OVERVIEW: CHÈN MẪU FEYNMAN & XEM TRƯỚC KATEX
  // =====================================================================
  if (btnFeynmanTemplate) {
    btnFeynmanTemplate.addEventListener('click', function () {
      if (inputLecOverview.value.trim().length > 0) {
        if (!confirm('Nội dung hiện tại sẽ được thay bằng mẫu bài giảng Feynman. Bạn có đồng ý không?')) {
          return;
        }
      }
      inputLecOverview.value = FEYNMAN_TEMPLATE;
      showToast('Đã chèn mẫu Feynman thành công!');
    });
  }

  if (btnPreviewOverview) {
    btnPreviewOverview.addEventListener('click', function () {
      if (previewLecOverview.style.display === 'none') {
        previewLecOverview.innerHTML = inputLecOverview.value || '<p><i>Chưa có nội dung để xem trước.</i></p>';
        previewLecOverview.style.display = 'block';
        btnPreviewOverview.textContent = '✕ Đóng xem trước';

        // Render KaTeX nếu có sẵn
        if (window.renderMathInElement) {
          try {
            window.renderMathInElement(previewLecOverview, {
              delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false },
                { left: '\\(', right: '\\)', display: false },
                { left: '\\[', right: '\\]', display: true }
              ],
              throwOnError: false
            });
          } catch (e) {
            console.warn('KaTeX preview warning:', e);
          }
        }
      } else {
        previewLecOverview.style.display = 'none';
        btnPreviewOverview.textContent = '👁️ Xem trước KaTeX';
      }
    });
  }

  // =====================================================================
  // 8. QUẢN LÝ RESOURCES (TÀI LIỆU ĐÍNH KÈM)
  // =====================================================================
  function renderResources() {
    if (!resourcesContainer) return;
    if (currentResources.length === 0) {
      resourcesContainer.innerHTML = '<p style="color: #64748b; font-size: 13px; margin: 0;">Chưa đính kèm tài liệu nào.</p>';
      return;
    }

    var html = '';
    currentResources.forEach(function (r, idx) {
      html +=
        '<div class="lms-attached-resource" style="display: flex; align-items: center; justify-content: space-between; padding: 6px 10px; border-radius: 8px; margin-bottom: 6px; font-size: 13px;">' +
          '<div>' +
            '<span class="tag" style="text-transform: uppercase; font-size: 10px; margin-right: 6px;">' + (r.type || 'PDF') + '</span>' +
            '<strong>' + r.title + '</strong> ' +
            '<small style="color: #64748b;">(' + (r.size || '1.0 MB') + ')</small>' +
          '</div>' +
          '<button type="button" class="mini-select lms-btn-remove-res" data-idx="' + idx + '" style="color: #ef4444; border: none; cursor: pointer;">✕</button>' +
        '</div>';
    });

    resourcesContainer.innerHTML = html;

    resourcesContainer.querySelectorAll('.lms-btn-remove-res').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.getAttribute('data-idx'), 10);
        currentResources.splice(idx, 1);
        renderResources();
      });
    });
  }

  if (btnAddResource) {
    btnAddResource.addEventListener('click', function () {
      var title = prompt('Nhập tên tài liệu đính kèm:', 'Tài liệu tóm tắt chương');
      if (!title) return;
      var url = prompt('Nhập đường dẫn URL hoặc file tải xuống:', '#');
      if (!url) return;
      var type = prompt('Định dạng file (pdf, mp4, zip, docx):', 'pdf') || 'pdf';
      var size = prompt('Kích thước hiển thị (VD: 1.5 MB):', '1.5 MB') || '1.0 MB';

      currentResources.push({
        title: title.trim(),
        url: url.trim(),
        type: type.trim().toLowerCase(),
        size: size.trim()
      });
      renderResources();
    });
  }

  // =====================================================================
  // 9. KHỞI CHẠY BAN ĐẦU
  // =====================================================================
  loadCourses();
  loadLocalVideos();
});
