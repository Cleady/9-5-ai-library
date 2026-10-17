/**
 * =====================================================================
 * practice-core.js — Hàm dùng chung cho module Practice
 * =====================================================================
 * Chứa: truy vấn dữ liệu (getSubjects, getQuizById…), tính tiến độ,
 * quản lý localStorage, tính điểm, định dạng thời gian, toast, modal.
 *
 * Khi tích hợp API thật, chỉ cần sửa các hàm get* trong file này
 * (thay return đồng bộ bằng fetch), phần còn lại không đổi.
 *
 * Được dùng bởi: tất cả các trang practice
 * =====================================================================
 */
;(function () {
  'use strict';

  window.Lib95 = window.Lib95 || {};
  window.Lib95.practice = window.Lib95.practice || {};

  var DATA = window.Lib95.practice.data;

  /* Tiền tố localStorage — tránh xung đột với các module khác */
  var STORAGE_PREFIX = 'lib95:practice:';

  /* ====== TIỆN ÍCH URL ====== */

  /* Lấy tham số từ URL, trả về giá trị hoặc null */
  function getUrlParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  /* Lấy hash không có dấu # */
  function getUrlHash() {
    return window.location.hash.replace('#', '') || '';
  }

  /* ====== LOCALSTORAGE ====== */

  /* Lưu dữ liệu vào localStorage với prefix */
  function storageSet(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      /* Nếu localStorage đầy, bỏ qua lỗi để không làm crash ứng dụng */
    }
  }

  /* Đọc dữ liệu từ localStorage, trả về null nếu không tìm thấy */
  function storageGet(key) {
    try {
      var raw = localStorage.getItem(STORAGE_PREFIX + key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  /* Xóa một key khỏi localStorage */
  function storageRemove(key) {
    localStorage.removeItem(STORAGE_PREFIX + key);
  }

  /* ====== TRUY VẤN DỮ LIỆU ====== */

  /* Lấy tất cả subjects */
  function getSubjects() {
    return DATA.subjects.slice();
  }

  /* Lấy subject theo id */
  function getSubjectById(id) {
    return DATA.subjects.find(function (s) { return s.id === Number(id); }) || null;
  }

  /* Lấy tất cả quizzes, có thể lọc theo subjectId */
  function getQuizzes(subjectId) {
    var list = DATA.quizzes.filter(function (q) {
      return subjectId ? q.subjectId === Number(subjectId) : true;
    });
    list.sort(function (a, b) { return a.order - b.order; });
    return list;
  }

  /* Lấy quiz theo id */
  function getQuizById(id) {
    return DATA.quizzes.find(function (q) { return q.id === Number(id); }) || null;
  }

  /* Lấy câu hỏi cho một quiz */
  function getQuestionsByQuizId(quizId) {
    return DATA.questions.filter(function (q) { return q.quizId === Number(quizId); });
  }

  /* Lấy tất cả exercises, có thể lọc theo subjectId */
  function getExercises(subjectId) {
    var list = DATA.exercises.filter(function (e) {
      return subjectId ? e.subjectId === Number(subjectId) : true;
    });
    list.sort(function (a, b) { return a.order - b.order; });
    return list;
  }

  /* Lấy exercise theo id */
  function getExerciseById(id) {
    return DATA.exercises.find(function (e) { return e.id === Number(id); }) || null;
  }

  /* Lấy flashcards, có thể lọc theo subjectId */
  function getFlashcards(subjectId) {
    return DATA.flashcards.filter(function (f) {
      return subjectId ? f.subjectId === Number(subjectId) : true;
    });
  }

  /* ====== ATTEMPTS (LỊCH SỬ LÀM BÀI) ====== */

  /* Lấy tất cả attempts = dữ liệu seed + dữ liệu lưu trong localStorage */
  function getAttempts() {
    var saved = storageGet('attempts') || [];
    /* Gộp seed data và dữ liệu đã lưu, ưu tiên dữ liệu lưu nếu trùng id */
    var merged = DATA.attempts.slice();
    saved.forEach(function (s) {
      var exists = merged.find(function (m) { return m.id === s.id; });
      if (!exists) {
        merged.push(s);
      }
    });
    /* Sắp xếp theo thời gian mới nhất trước */
    merged.sort(function (a, b) {
      return new Date(b.finishedAt) - new Date(a.finishedAt);
    });
    return merged;
  }

  /* Lưu một attempt mới vào localStorage */
  function saveAttempt(attempt) {
    var saved = storageGet('attempts') || [];
    saved.push(attempt);
    storageSet('attempts', saved);
  }

  /* Tạo id duy nhất cho attempt mới */
  function generateAttemptId() {
    return 'att-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
  }

  /* ====== TÍNH TOÁN TIẾN ĐỘ ====== */

  /* Lấy trạng thái quiz: completed / in-progress / not-started */
  /* Dựa trên attempts đã hoàn thành hoặc đang làm trong localStorage */
  function getQuizStatus(quizId) {
    var attempts = getAttempts();
    var completed = attempts.find(function (a) {
      return a.type === 'quiz' && a.refId === Number(quizId);
    });
    if (completed) return 'completed';

    /* Kiểm tra xem có đang làm dở không */
    var inProgress = storageGet('quiz-progress-' + quizId);
    if (inProgress) return 'in-progress';

    return 'not-started';
  }

  /* Lấy điểm cao nhất của quiz từ attempts */
  function getQuizBestScore(quizId) {
    var attempts = getAttempts();
    var quizAttempts = attempts.filter(function (a) {
      return a.type === 'quiz' && a.refId === Number(quizId);
    });
    if (quizAttempts.length === 0) return null;
    return Math.max.apply(null, quizAttempts.map(function (a) { return a.score; }));
  }

  /* Lấy tiến độ quiz đang làm (số câu đã trả lời / tổng) */
  function getQuizProgress(quizId) {
    var progress = storageGet('quiz-progress-' + quizId);
    if (!progress) return 0;
    var answered = progress.answers.filter(function (a) { return a !== null; }).length;
    var total = progress.answers.length;
    return total > 0 ? Math.round((answered / total) * 100) : 0;
  }

  /* Lấy trạng thái exercise */
  function getExerciseStatus(exerciseId) {
    var attempts = getAttempts();
    var completed = attempts.find(function (a) {
      return a.type === 'exercise' && a.refId === Number(exerciseId);
    });
    return completed ? 'completed' : 'not-started';
  }

  /* Tính điểm trung bình của một subject dựa trên tất cả attempts */
  function getSubjectAverageScore(subjectId) {
    var attempts = getAttempts();
    var subjectAttempts = attempts.filter(function (a) {
      return a.subjectId === Number(subjectId);
    });
    if (subjectAttempts.length === 0) return 0;
    var total = subjectAttempts.reduce(function (sum, a) { return sum + a.score; }, 0);
    return Math.round(total / subjectAttempts.length);
  }

  /* Tìm attempt đang làm dở gần nhất để hiện "Continue practicing" */
  function getLatestInProgress() {
    /* Kiểm tra tất cả quiz xem có progress nào không */
    var quizzes = DATA.quizzes;
    var latest = null;
    quizzes.forEach(function (q) {
      var progress = storageGet('quiz-progress-' + q.id);
      if (progress) {
        if (!latest || new Date(progress.startedAt) > new Date(latest.startedAt)) {
          latest = {
            type: 'quiz',
            refId: q.id,
            title: q.title,
            subjectId: q.subjectId,
            startedAt: progress.startedAt,
            progress: getQuizProgress(q.id)
          };
        }
      }
    });
    return latest;
  }

  /* ====== ĐỊNH DẠNG ====== */

  /* Định dạng thời gian từ giây sang "MM:SS" */
  function formatTime(seconds) {
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  /* Định dạng ngày tháng sang "Sep 14, 2025" */
  function formatDate(dateStr) {
    var d = new Date(dateStr);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  /* Định dạng ngày ngắn cho biểu đồ: "Sep 14" */
  function formatDateShort(dateStr) {
    var d = new Date(dateStr);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[d.getMonth()] + ' ' + d.getDate();
  }

  /* Lấy class màu cho score badge dựa trên phạm vi điểm */
  function getScoreClass(score) {
    if (score >= 80) return 'prc-score-high';
    if (score >= 60) return 'prc-score-mid';
    return 'prc-score-low';
  }

  /* ====== TOAST — thông báo nhỏ phía dưới màn hình ====== */

  /* Hiện toast với nội dung text trong duration (ms) */
  function showToast(text, duration) {
    duration = duration || 3000;
    /* Tìm hoặc tạo container cho toast */
    var container = document.getElementById('prc-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'prc-toast-container';
      container.className = 'prc-toast-container';
      document.body.appendChild(container);
    }
    var toast = document.createElement('div');
    toast.className = 'prc-toast';
    toast.textContent = text;
    container.appendChild(toast);

    /* Cho phép CSS transition chạy: thêm class sau 1 frame */
    requestAnimationFrame(function () {
      toast.classList.add('prc-toast-visible');
    });

    /* Tự động ẩn sau duration */
    setTimeout(function () {
      toast.classList.remove('prc-toast-visible');
      toast.addEventListener('transitionend', function () {
        toast.remove();
      });
    }, duration);
  }

  /* ====== MODAL — hộp thoại xác nhận tùy chỉnh ====== */

  /* Hiện modal xác nhận: title, message, onConfirm callback
     Trả về object {close} để có thể đóng bằng code nếu cần */
  function showModal(options) {
    var title = options.title || 'Xác nhận';
    var message = options.message || '';
    var confirmText = options.confirmText || 'OK';
    var cancelText = options.cancelText || 'Hủy';
    var onConfirm = options.onConfirm || function () {};
    var onCancel = options.onCancel || function () {};

    /* Tạo overlay */
    var overlay = document.createElement('div');
    overlay.className = 'prc-modal-overlay';

    /* Tạo hộp thoại */
    var modal = document.createElement('div');
    modal.className = 'prc-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', title);

    modal.innerHTML =
      '<h3 class="prc-modal-title">' + title + '</h3>' +
      '<p class="prc-modal-message">' + message + '</p>' +
      '<div class="prc-modal-actions">' +
        '<button type="button" class="prc-modal-btn prc-modal-btn-cancel">' + cancelText + '</button>' +
        '<button type="button" class="prc-modal-btn prc-modal-btn-confirm">' + confirmText + '</button>' +
      '</div>';

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    /* Focus vào nút xác nhận */
    var confirmBtn = modal.querySelector('.prc-modal-btn-confirm');
    var cancelBtn = modal.querySelector('.prc-modal-btn-cancel');
    confirmBtn.focus();

    function close() {
      overlay.classList.add('prc-modal-closing');
      overlay.addEventListener('animationend', function () {
        overlay.remove();
      });
    }

    confirmBtn.addEventListener('click', function () {
      close();
      onConfirm();
    });

    cancelBtn.addEventListener('click', function () {
      close();
      onCancel();
    });

    /* Đóng khi bấm overlay bên ngoài */
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        close();
        onCancel();
      }
    });

    /* Đóng bằng Escape */
    function onKeydown(e) {
      if (e.key === 'Escape') {
        close();
        onCancel();
        document.removeEventListener('keydown', onKeydown);
      }
    }
    document.addEventListener('keydown', onKeydown);

    return { close: close };
  }

  /* ====== RENDER HELPERS ====== */

  /* Tạo vòng điểm (score ring) bằng SVG — dùng cho trang kết quả và performance */
  /* value: 0-100, size: kích thước px, strokeWidth: độ dày vành */
  function createScoreRingSVG(value, size, strokeWidth) {
    size = size || 120;
    strokeWidth = strokeWidth || 8;
    var radius = (size - strokeWidth) / 2;
    var circumference = 2 * Math.PI * radius;
    var offset = circumference - (value / 100) * circumference;
    var cx = size / 2;
    var cy = size / 2;

    var svg = '<svg class="prc-score-ring-svg" width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '">' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + radius + '" fill="none" stroke="#dbeafe" stroke-width="' + strokeWidth + '"/>' +
      '<circle class="prc-score-ring-progress" cx="' + cx + '" cy="' + cy + '" r="' + radius + '" fill="none" ' +
        'stroke="#3b82f6" stroke-width="' + strokeWidth + '" stroke-linecap="round" ' +
        'stroke-dasharray="' + circumference + '" stroke-dashoffset="' + offset + '" ' +
        'transform="rotate(-90 ' + cx + ' ' + cy + ')" />' +
      '</svg>';

    return svg;
  }

  /* Username — lấy từ topbar hoặc hardcode */
  function getUserName() {
    var el = document.querySelector('.user-name');
    return el ? el.textContent.trim() : 'Alex';
  }

  /* ====== FAVORITES ====== */
  var favoriteSubjectIds = [];
  var favoritesLoaded = false;

  // Dọn dẹp dữ liệu cũ phía client một lần (chỉ xóa 3 key này, không ảnh hưởng token/user)
  try {
    localStorage.removeItem('lib95:favorites:data');
    localStorage.removeItem('lib95:favorites:subjects');
    localStorage.removeItem('lib95:favorites:lectures:subjects');
  } catch (e) {}

  function getFavoriteSubjectIds() {
    return favoriteSubjectIds.slice();
  }

  function isSubjectFavorited(subjectId) {
    return favoriteSubjectIds.indexOf(Number(subjectId)) !== -1;
  }

  function updateFavButtonUI() {
    var btns = document.querySelectorAll('.subject-fav-btn');
    btns.forEach(function (btn) {
      var subId = Number(btn.getAttribute('data-subject-id'));
      if (!isNaN(subId)) {
        var isFav = isSubjectFavorited(subId);
        btn.classList.toggle('is-favorited', isFav);
        btn.title = isFav ? 'Bỏ yêu thích' : 'Yêu thích môn học';
      }
    });
  }

  function loadFavoritesFromBackend(callback) {
    var token = localStorage.getItem('token');
    if (!token) {
      favoriteSubjectIds = [];
      favoritesLoaded = true;
      if (callback) callback(favoriteSubjectIds);
      return;
    }

    fetch('/api/favorites', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(function (res) {
        if (res.status === 401) {
          favoriteSubjectIds = [];
          return null;
        }
        return res.json();
      })
      .then(function (data) {
        if (data && data.success && Array.isArray(data.practiceSubjects)) {
          favoriteSubjectIds = data.practiceSubjects.map(function (p) { return Number(p.item_id); });
        } else {
          favoriteSubjectIds = [];
        }
        favoritesLoaded = true;
        updateFavButtonUI();
        if (callback) callback(favoriteSubjectIds);
      })
      .catch(function (err) {
        console.warn('Không thể tải danh sách yêu thích practice:', err);
        favoritesLoaded = true;
        if (callback) callback(favoriteSubjectIds);
      });
  }

  function toggleSubjectFavorite(subjectId, callback) {
    var token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/pages/auth/login.html';
      return false;
    }

    subjectId = Number(subjectId);
    var idx = favoriteSubjectIds.indexOf(subjectId);
    var nowFav = false;

    // 1. Cập nhật lạc quan (Optimistic update)
    if (idx !== -1) {
      favoriteSubjectIds.splice(idx, 1);
      nowFav = false;
    } else {
      favoriteSubjectIds.push(subjectId);
      nowFav = true;
    }

    updateFavButtonUI();

    // 2. Gửi request lên máy chủ API
    fetch('/api/favorites/toggle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        type: 'practice_subject',
        id: subjectId
      })
    })
      .then(function (res) {
        if (res.status === 401) {
          window.location.href = '/pages/auth/login.html';
          return;
        }
        return res.json().then(function (data) {
          if (!res.ok || !data.success) {
            throw new Error(data.error || 'Lỗi khi cập nhật yêu thích');
          }
          if (callback) callback(null, data.favorited);
        });
      })
      .catch(function (err) {
        console.error('Lỗi khi lưu yêu thích môn thực hành:', err);
        var curIdx = favoriteSubjectIds.indexOf(subjectId);
        if (nowFav && curIdx !== -1) {
          favoriteSubjectIds.splice(curIdx, 1);
        } else if (!nowFav && curIdx === -1) {
          favoriteSubjectIds.push(subjectId);
        }
        updateFavButtonUI();
        showToast('Không thể cập nhật yêu thích: ' + (err.message || 'Lỗi kết nối'), 3000);
        if (callback) callback(err, !nowFav);
      });

    return nowFav;
  }

  // Nạp danh sách yêu thích từ máy chủ khi script tải
  loadFavoritesFromBackend();

  /* ====== EXPORT ====== */
  /* Gán tất cả hàm vào namespace để các file khác sử dụng */
  var core = {
    getUrlParam: getUrlParam,
    getUrlHash: getUrlHash,
    storageSet: storageSet,
    storageGet: storageGet,
    storageRemove: storageRemove,
    getSubjects: getSubjects,
    getSubjectById: getSubjectById,
    getQuizzes: getQuizzes,
    getQuizById: getQuizById,
    getQuestionsByQuizId: getQuestionsByQuizId,
    getExercises: getExercises,
    getExerciseById: getExerciseById,
    getFlashcards: getFlashcards,
    getAttempts: getAttempts,
    saveAttempt: saveAttempt,
    generateAttemptId: generateAttemptId,
    getQuizStatus: getQuizStatus,
    getQuizBestScore: getQuizBestScore,
    getQuizProgress: getQuizProgress,
    getExerciseStatus: getExerciseStatus,
    getSubjectAverageScore: getSubjectAverageScore,
    getLatestInProgress: getLatestInProgress,
    formatTime: formatTime,
    formatDate: formatDate,
    formatDateShort: formatDateShort,
    getScoreClass: getScoreClass,
    showToast: showToast,
    showModal: showModal,
    createScoreRingSVG: createScoreRingSVG,
    getUserName: getUserName,
    getFavoriteSubjectIds: getFavoriteSubjectIds,
    isSubjectFavorited: isSubjectFavorited,
    toggleSubjectFavorite: toggleSubjectFavorite,
    loadFavoritesFromBackend: loadFavoritesFromBackend
  };

  window.Lib95.practice.core = core;

})();
