/**
 * =====================================================================
 * lectures-core.js — Hàm dùng chung cho module Lectures
 * =====================================================================
 * Chứa: truy vấn dữ liệu (getLectures, getLectureById…), tính tiến độ,
 * quản lý localStorage, quy tắc mở khóa, định dạng thời gian, toast.
 *
 * Khi tích hợp API thật, chỉ cần sửa các hàm get* trong file này
 * (thay return đồng bộ bằng fetch), phần còn lại không đổi.
 *
 * Được dùng bởi: tất cả các trang lectures
 * =====================================================================
 */
;(function () {
  'use strict';

  window.Lib95 = window.Lib95 || {};
  window.Lib95.lectures = window.Lib95.lectures || {};

  var DATA = window.Lib95.lectures.data;

  /* Tiền tố localStorage — tránh xung đột với các module khác */
  var STORAGE_PREFIX = 'lib95:lectures:';

  /* ====== TRUY VẤN DỮ LIỆU ====== */
  /* Lấy tất cả subjects */
  function getSubjects() {
    return DATA.subjects.slice();
  }

  /* Lấy subject theo id */
  function getSubjectById(id) {
    return DATA.subjects.find(function (s) { return s.id === id; }) || null;
  }

  /* Lấy tất cả lectures, đã tính lại trạng thái mở khóa */
  function getLectures(subjectId) {
    var list = DATA.lectures.filter(function (l) {
      return subjectId ? l.subjectId === subjectId : true;
    });
    /* Sắp xếp theo order tăng dần */
    list.sort(function (a, b) { return a.order - b.order; });
    /* Apply quy tắc mở khóa: bài trước phải "completed" */
    return applyUnlockRule(list);
  }

  /* Lấy một bài giảng theo id */
  function getLectureById(id) {
    var lecture = DATA.lectures.find(function (l) { return l.id === id; }) || null;
    return lecture;
  }

  /* Lấy tài liệu theo lectureId (hoặc tất cả) */
  function getResources(lectureId) {
    if (!lectureId) return DATA.resources.slice();
    return DATA.resources.filter(function (r) { return r.lectureId === lectureId; });
  }

  /* Lấy câu hỏi quiz theo lectureId */
  function getQuizQuestions(lectureId) {
    return DATA.quizQuestions.filter(function (q) { return q.lectureId === lectureId; });
  }

  /* Lấy ghi chú mẫu */
  function getNotes(lectureId) {
    if (!lectureId) return DATA.notes.slice();
    return DATA.notes.filter(function (n) { return n.lectureId === lectureId; });
  }

  /* ====== QUY TẮC MỞ KHÓA ====== */
  /* Bài giảng chỉ mở khóa khi bài trước đã "completed".
     Bài đầu tiên luôn mở (completed hoặc in-progress). */
  function applyUnlockRule(sortedLectures) {
    var result = [];
    for (var i = 0; i < sortedLectures.length; i++) {
      var lec = Object.assign({}, sortedLectures[i]);
      if (i === 0) {
        /* Bài đầu tiên: nếu chưa completed thì là in-progress */
        if (lec.status === 'locked') lec.status = 'in-progress';
      } else {
        /* Bài sau: chỉ mở khóa khi bài trước completed */
        var prev = result[i - 1];
        if (prev.status !== 'completed') {
          lec.status = 'locked';
        }
      }
      result.push(lec);
    }
    return result;
  }

  /* ====== TÍNH TIẾN ĐỘ ====== */
  /* Trả về { completed, total, percent } cho một subject */
  function getSubjectProgress(subjectId) {
    var all = getLectures(subjectId);
    var completed = all.filter(function (l) { return l.status === 'completed'; }).length;
    var total = all.length;
    var percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed: completed, total: total, percent: percent };
  }

  /* Bài giảng tiếp theo chưa hoàn thành (dùng cho "Next lecture") */
  function getNextLecture(subjectId) {
    var all = getLectures(subjectId);
    return all.find(function (l) { return l.status !== 'completed'; }) || null;
  }

  /* Time còn lại (tổng durationMin của các bài chưa completed) */
  function getRemainingTime(subjectId) {
    var all = getLectures(subjectId);
    var minutes = 0;
    all.forEach(function (l) {
      if (l.status !== 'completed') minutes += l.durationMin;
    });
    return minutes;
  }

  /* ====== LOCALSTORAGE ====== */
  function storageGet(key) {
    try {
      var raw = localStorage.getItem(STORAGE_PREFIX + key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function storageSet(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      /* Bỏ qua nếu localStorage đầy hoặc bị chặn */
    }
  }

  /* Đánh dấu bài giảng đã hoàn thành — cập nhật trong data gốc */
  function markCompleted(lectureId) {
    var lec = DATA.lectures.find(function (l) { return l.id === lectureId; });
    if (lec) lec.status = 'completed';
    /* Lưu trạng thái vào localStorage để giữ giữa các lần reload */
    var completed = storageGet('completedIds') || [];
    if (completed.indexOf(lectureId) === -1) {
      completed.push(lectureId);
      storageSet('completedIds', completed);
    }
  }

  /* Khôi phục trạng thái từ localStorage khi khởi tạo */
  function restoreProgress() {
    var completed = storageGet('completedIds') || [];
    completed.forEach(function (id) {
      var lec = DATA.lectures.find(function (l) { return l.id === id; });
      if (lec) lec.status = 'completed';
    });
  }

  /* Helper lấy icon phù hợp cho môn học */
  function getSubjectIcon(code) {
    var c = (code || '').toUpperCase();
    if (c.indexOf('DB') !== -1 || c.indexOf('DATA') !== -1) return '/assets/icon/data.png';
    if (c.indexOf('PRO') !== -1 || c.indexOf('WEB') !== -1 || c.indexOf('PRJ') !== -1) return '/assets/icon/program.png';
    if (c.indexOf('MAS') !== -1 || c.indexOf('MATH') !== -1) return '/assets/icon/math.png';
    if (c.indexOf('AI') !== -1 || c.indexOf('ML') !== -1) return '/assets/icon/chip.png';
    return '/assets/icon/chip.png';
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
        if (data && data.success && Array.isArray(data.lectureCourses)) {
          favoriteSubjectIds = data.lectureCourses.map(function (c) { return Number(c.id); });
        } else {
          favoriteSubjectIds = [];
        }
        favoritesLoaded = true;
        updateFavButtonUI();
        if (callback) callback(favoriteSubjectIds);
      })
      .catch(function (err) {
        console.warn('Không thể tải danh sách yêu thích lectures:', err);
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

    // 1. Cập nhật lạc quan (Optimistic update) trong bộ nhớ
    if (idx !== -1) {
      favoriteSubjectIds.splice(idx, 1);
      nowFav = false;
    } else {
      favoriteSubjectIds.push(subjectId);
      nowFav = true;
    }

    // Cập nhật giao diện nút tức thì
    updateFavButtonUI();

    // 2. Gửi request lên máy chủ
    fetch('/api/favorites/toggle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        type: 'lecture_course',
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
        console.error('Lỗi khi lưu yêu thích môn học:', err);
        // Hoàn tác trạng thái sao (Rollback)
        var curIdx = favoriteSubjectIds.indexOf(subjectId);
        if (nowFav && curIdx !== -1) {
          favoriteSubjectIds.splice(curIdx, 1);
        } else if (!nowFav && curIdx === -1) {
          favoriteSubjectIds.push(subjectId);
        }
        updateFavButtonUI();
        showToast('Không thể cập nhật yêu thích: ' + (err.message || 'Lỗi kết nối'), 'error');
        if (callback) callback(err, !nowFav);
      });

    return nowFav;
  }

  /* ====== ĐỊNH DẠNG ====== */
  /* Chuyển type thành nhãn hiển thị: video → Video, quiz → Quiz... */
  function formatType(type) {
    var map = { video: 'Video', quiz: 'Quiz', reading: 'Reading' };
    return map[type] || type;
  }

  /* Định dạng meta dạng "Video · 12 min" */
  function formatMeta(lecture) {
    return formatType(lecture.type) + ' · ' + lecture.durationMin + ' min';
  }

  /* Nhãn trạng thái hiển thị */
  function formatStatus(status) {
    var map = {
      'completed': 'Completed',
      'in-progress': 'In progress',
      'locked': 'Locked'
    };
    return map[status] || status;
  }

  /* ====== TOAST THÔNG BÁO ====== */
  /* Hiện toast nhỏ ở góc dưới, tự biến mất sau 3 giây.
     Dùng thay alert() theo yêu cầu. */
  function showToast(message, type) {
    type = type || 'info';
    /* Tạo container nếu chưa có */
    var container = document.getElementById('lec-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'lec-toast-container';
      container.className = 'lec-toast-container';
      document.body.appendChild(container);
    }
    var toast = document.createElement('div');
    toast.className = 'lec-toast lec-toast--' + type;
    toast.textContent = message;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    container.appendChild(toast);

    /* Kích hoạt animation hiện */
    requestAnimationFrame(function () {
      toast.classList.add('lec-toast--visible');
    });

    /* Tự ẩn sau 3 giây */
    setTimeout(function () {
      toast.classList.remove('lec-toast--visible');
      toast.classList.add('lec-toast--hiding');
      /* Xóa khỏi DOM sau khi animation kết thúc */
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3000);
  }

  /* ====== DEBOUNCE ====== */
  /* Trì hoãn gọi hàm cho đến khi người dùng ngừng thao tác */
  function debounce(fn, delay) {
    var timer = null;
    return function () {
      var ctx = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(ctx, args);
      }, delay);
    };
  }

  /* ====== ĐỒNG BỘ DỮ LIỆU TỪ BACKEND API ====== */
  function syncWithBackend(callback) {
    fetch('/api/lms/courses')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success && Array.isArray(data.courses) && data.courses.length > 0) {
          DATA.subjects = data.courses.map(function (c) {
            return {
              id: c.id,
              name: c.code || c.name,
              title: c.title || c.description || c.name,
              code: c.code,
              term: c.term || 'Kỳ II',
              icon: c.icon || 'subject1-icon',
              gradientFrom: c.gradient_from || '#38bdf8',
              gradientTo: c.gradient_to || '#0284c7',
              lectureCount: c.lecture_count || 0
            };
          });

          var fetchPromises = data.courses.map(function (c) {
            return fetch('/api/lms/courses/' + c.id + '/lectures')
              .then(function (r) { return r.json(); })
              .then(function (ld) {
                if (ld.success && Array.isArray(ld.lectures)) {
                  return ld.lectures.map(function (l) {
                    return {
                      id: l.id,
                      subjectId: l.course_id,
                      order: l.chapter_order,
                      title: l.title,
                      type: l.type || 'video',
                      durationMin: l.duration_min || 15,
                      status: l.status || 'in-progress',
                      videoUrl: l.video_url,
                      description: l.description,
                      dateAdded: l.dateAdded
                    };
                  });
                }
                return [];
              });
          });

          Promise.all(fetchPromises).then(function (results) {
            var allLecs = [];
            results.forEach(function (list) { allLecs = allLecs.concat(list); });
            DATA.lectures = allLecs;
            restoreProgress();

            // Đồng bộ danh sách yêu thích từ máy chủ API
            loadFavoritesFromBackend(function () {
              updateFavButtonUI();
              if (callback) callback();
            });
          });
        } else {
          loadFavoritesFromBackend(function () {
            updateFavButtonUI();
            if (callback) callback();
          });
        }
      })
      .catch(function (err) {
        console.warn('Backend sync warning, using local cache:', err);
        loadFavoritesFromBackend(function () {
          updateFavButtonUI();
          if (callback) callback();
        });
      });
  }

  function fetchLectureDetail(id, callback) {
    fetch('/api/lms/lectures/' + id)
      .then(function (res) {
        if (!res.ok) {
          throw new Error('API returned ' + res.status);
        }
        return res.json();
      })
      .then(function (data) {
        if (data.success && data.lecture) {
          var l = data.lecture;
          var mapped = {
            id: l.id,
            subjectId: l.course_id,
            order: l.chapter_order,
            title: l.title,
            type: l.type || 'video',
            durationMin: l.duration_min || 15,
            status: l.status || 'in-progress',
            videoUrl: l.video_url,
            description: l.description,
            keyTakeaways: l.key_takeaways,
            overviewHtml: l.overview_html,
            resources: l.resources || [],
            comments: l.comments || [],
            courseName: l.course_name,
            courseTitle: l.course_title,
            gradientFrom: l.gradient_from,
            gradientTo: l.gradient_to
          };
          if (DATA && Array.isArray(DATA.lectures)) {
            var existingIndex = DATA.lectures.findIndex(function (item) { return item.id === mapped.id; });
            if (existingIndex !== -1) {
              DATA.lectures[existingIndex] = Object.assign({}, DATA.lectures[existingIndex], mapped);
            } else {
              DATA.lectures.push(mapped);
            }
          }
          if (callback) callback(mapped);
        } else {
          if (callback) callback(getLectureById(id));
        }
      })
      .catch(function () {
        if (callback) callback(getLectureById(id));
      });
  }

  /* ====== KHÔI PHỤC KHI LOAD ====== */
  restoreProgress();
  loadFavoritesFromBackend();

  /* ====== EXPORT ====== */
  window.Lib95.lectures.core = {
    getSubjects: getSubjects,
    getSubjectById: getSubjectById,
    getLectures: getLectures,
    getLectureById: getLectureById,
    getResources: getResources,
    getQuizQuestions: getQuizQuestions,
    getNotes: getNotes,
    getSubjectProgress: getSubjectProgress,
    getNextLecture: getNextLecture,
    getRemainingTime: getRemainingTime,
    storageGet: storageGet,
    storageSet: storageSet,
    markCompleted: markCompleted,
    formatType: formatType,
    formatMeta: formatMeta,
    formatStatus: formatStatus,
    showToast: showToast,
    debounce: debounce,
    syncWithBackend: syncWithBackend,
    fetchLectureDetail: fetchLectureDetail,
    getFavoriteSubjectIds: getFavoriteSubjectIds,
    isSubjectFavorited: isSubjectFavorited,
    toggleSubjectFavorite: toggleSubjectFavorite,
    loadFavoritesFromBackend: loadFavoritesFromBackend,
    getSubjectIcon: getSubjectIcon,
    STORAGE_PREFIX: STORAGE_PREFIX
  };

})();

