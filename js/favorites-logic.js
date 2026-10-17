/**
 * File: js/favorites-logic.js
 * Mục đích: Xử lý logic nghiệp vụ cho trang Favorites, kết nối API /api/favorites và /api/favorites/toggle.
 */
(function () {
  'use strict';
  window.Lib95 = window.Lib95 || {};
  window.Lib95.favorites = window.Lib95.favorites || {};

  const F = window.Lib95.favorites;

  // Xóa dọn một lần các key localStorage cũ không còn sử dụng
  try {
    localStorage.removeItem('lib95:favorites:data');
    localStorage.removeItem('lib95:favorites:subjects');
    localStorage.removeItem('lib95:favorites:lectures:subjects');
  } catch (e) {}

  // Quản lý trạng thái cục bộ
  const state = {
    data: [],          // Danh sách các mục yêu thích thật từ API
    currentTab: 'All', // 'All', 'Practices', 'Lectures', 'Resources'
    sortBy: 'newest',  // 'newest', 'oldest', 'az'
    searchQuery: '',   // Từ khóa tìm kiếm realtime
    loading: false,
    error: null
  };

  // Cung cấp các hàm truy vấn dữ liệu cho UI
  F.getData = function () {
    return state.data;
  };

  F.findItem = function (id) {
    return state.data.find(item => String(item.id) === String(id)) || null;
  };

  /**
   * Tải danh sách yêu thích từ máy chủ qua GET /api/favorites
   */
  async function loadFavorites() {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/pages/auth/login.html';
      return;
    }

    state.loading = true;
    state.error = null;
    renderLoadingState();

    try {
      const res = await fetch('/api/favorites', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/pages/auth/login.html';
        return;
      }

      if (!res.ok) {
        throw new Error('HTTP ' + res.status);
      }

      const result = await res.json();
      state.data = transformApiData(result);
      state.loading = false;
      applyState();
    } catch (err) {
      console.error('Lỗi khi tải danh sách yêu thích:', err);
      state.loading = false;
      state.error = err.message || 'Lỗi tải dữ liệu';
      renderErrorState();
    }
  }

  /**
   * Chuyển đổi dữ liệu trả về từ API thành danh sách chuẩn hiển thị trên trang
   */
  function transformApiData(result) {
    const items = [];
    const lectureCourses = Array.isArray(result.lectureCourses) ? result.lectureCourses : [];
    const practiceSubjects = Array.isArray(result.practiceSubjects) ? result.practiceSubjects : [];
    const resources = Array.isArray(result.resources) ? result.resources : [];

    // 1. Môn học bài giảng (Lectures - courses từ MySQL)
    lectureCourses.forEach(c => {
      const iconUrl = c.icon && c.icon.startsWith('/')
        ? c.icon
        : (F.getSubjectIcon ? F.getSubjectIcon(c.code || c.name) : '/assets/icon/chip.png');

      items.push({
        id: 'lec_sub_' + c.id,
        rawId: c.id,
        apiType: 'lecture_course',
        type: 'lecture',
        subType: 'course',
        subjectId: c.id,
        title: c.title || c.name || ('Course ' + c.id),
        subject: c.code || c.name || '',
        context: 'Lectures',
        link: '/pages/lectures/lectures.html?subject=' + c.id,
        icon: iconUrl,
        meta: (c.videoCount || 0) + ' video · ' + (c.term || 'Kỳ II'),
        addedAt: c.addedAt || new Date().toISOString()
      });
    });

    // 2. Môn thực hành (Practice - tra catalog js/practice-data.js)
    const catalogSubjects = (window.Lib95 && window.Lib95.practice && window.Lib95.practice.data && window.Lib95.practice.data.subjects) || [];
    const prcCore = (window.Lib95 && window.Lib95.practice && window.Lib95.practice.core) || null;

    practiceSubjects.forEach(ps => {
      const subId = Number(ps.item_id);
      const sub = catalogSubjects.find(s => s.id === subId);
      if (!sub) {
        // Bỏ qua nếu ID không nằm trong catalog hợp lệ, TUYỆT ĐỐI không sinh card giả
        return;
      }

      let qsCount = 12;
      let exsCount = 5;
      if (prcCore && prcCore.getQuizzes) {
        try {
          qsCount = prcCore.getQuizzes(subId).length;
          exsCount = prcCore.getExercises ? prcCore.getExercises(subId).length : 5;
        } catch (e) {}
      }

      const subIconMap = {
        1: '/assets/icon/chip.png',
        2: '/assets/icon/data.png',
        3: '/assets/icon/program.png',
        4: '/assets/icon/mas.png',
        5: '/assets/icon/soft.png'
      };
      const iconUrl = subIconMap[sub.id] || (F.getSubjectIcon ? F.getSubjectIcon(sub.title || sub.name) : '/assets/icon/chip.png');

      items.push({
        id: 'sub_' + sub.id,
        rawId: sub.id,
        apiType: 'practice_subject',
        type: 'practice',
        subType: 'subject',
        subjectId: sub.id,
        title: sub.name,
        subject: sub.title || sub.code || ('Môn ' + sub.id),
        context: 'Practice',
        link: '/pages/practice/practice-subject.html?subject=' + sub.id,
        icon: iconUrl,
        meta: qsCount + ' quizzes · ' + exsCount + ' exercises',
        addedAt: ps.addedAt || ps.created_at || new Date().toISOString()
      });
    });

    // 3. Tài nguyên tài liệu (Resources từ MySQL)
    resources.forEach(r => {
      const ext = (r.extension ? r.extension.toUpperCase().replace('.', '') : 'DOC');
      const sizeStr = r.sizeLabel ? ' · ' + r.sizeLabel : '';

      items.push({
        id: 'res_' + r.id,
        rawId: r.id,
        apiType: 'resource',
        type: 'resource',
        subType: r.type || 'document',
        resourceId: r.id,
        title: r.title,
        subject: r.subject || 'Chung',
        context: 'Resource',
        link: '/pages/lectures/resources.html',
        meta: ext + sizeStr,
        addedAt: r.addedAt || r.created_at || new Date().toISOString(),
        isRealResource: true
      });
    });

    return items;
  }

  /**
   * Hiển thị trạng thái đang tải (Loading state)
   */
  function renderLoadingState() {
    const gridEl = document.getElementById('fav-grid-container');
    const emptyEl = document.getElementById('fav-empty-state');
    const errorEl = document.getElementById('fav-error-state');

    if (emptyEl) emptyEl.hidden = true;
    if (errorEl) errorEl.hidden = true;

    if (gridEl) {
      gridEl.hidden = false;
      gridEl.innerHTML = `
        <div class="fav-loading">
          <div class="fav-spinner"></div>
          <p>Đang tải danh sách yêu thích...</p>
        </div>
      `;
    }
  }

  /**
   * Hiển thị trạng thái lỗi kết nối (Error state)
   */
  function renderErrorState() {
    const gridEl = document.getElementById('fav-grid-container');
    const emptyEl = document.getElementById('fav-empty-state');
    const errorEl = document.getElementById('fav-error-state');

    if (gridEl) {
      gridEl.hidden = true;
      gridEl.innerHTML = '';
    }
    if (emptyEl) emptyEl.hidden = true;
    if (errorEl) errorEl.hidden = false;
  }

  /**
   * Cập nhật số lượng đếm trên các tab
   */
  function updateCounts() {
    if (F.updateTabCounts) {
      const counts = {
        All: state.data.length,
        Practices: state.data.filter(i => i.type === 'practice').length,
        Lectures: state.data.filter(i => i.type === 'lecture').length,
        Resources: state.data.filter(i => i.type === 'resource').length
      };
      F.updateTabCounts(counts);
    }
  }

  /**
   * Lọc và sắp xếp dữ liệu theo state hiện tại
   */
  function applyState() {
    const errorEl = document.getElementById('fav-error-state');
    if (errorEl) errorEl.hidden = true;

    // Cập nhật số đếm trên các tab
    updateCounts();

    let filtered = state.data.slice();

    // 1. Lọc theo Tab
    if (state.currentTab !== 'All') {
      filtered = filtered.filter(item => {
        if (state.currentTab === 'Lectures') {
          return item.type === 'lecture';
        }
        if (state.currentTab === 'Practices') {
          return item.type === 'practice';
        }
        if (state.currentTab === 'Resources') {
          return item.type === 'resource';
        }
        return true;
      });
    }

    // 2. Lọc theo ô tìm kiếm (Search Query)
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      filtered = filtered.filter(item => {
        const title = (item.title || '').toLowerCase();
        const subject = (item.subject || '').toLowerCase();
        const meta = (item.meta || '').toLowerCase();
        const context = (item.context || '').toLowerCase();
        return title.includes(q) || subject.includes(q) || meta.includes(q) || context.includes(q);
      });
    }

    // 3. Sắp xếp
    filtered.sort((a, b) => {
      if (state.sortBy === 'newest') {
        return new Date(b.addedAt || 0) - new Date(a.addedAt || 0);
      } else if (state.sortBy === 'oldest') {
        return new Date(a.addedAt || 0) - new Date(b.addedAt || 0);
      } else if (state.sortBy === 'az') {
        return (a.title || '').localeCompare(b.title || '');
      }
      return 0;
    });

    // 4. Render ra UI
    if (F.renderGrid) {
      F.renderGrid(filtered, Boolean(state.searchQuery), state.searchQuery);
    }
  }

  /**
   * Xử lý xác nhận bỏ yêu thích
   */
  async function handleConfirmRemove(idToRemove) {
    const item = F.findItem(idToRemove);
    if (!item) {
      F.closeRemoveModal();
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/pages/auth/login.html';
      return;
    }

    const btnConfirm = document.getElementById('fav-btn-confirm');
    if (btnConfirm) btnConfirm.disabled = true;

    try {
      const res = await fetch('/api/favorites/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          type: item.apiType,
          id: item.rawId
        })
      });

      if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/pages/auth/login.html';
        return;
      }

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Lỗi khi bỏ yêu thích');
      }

      // Xóa khỏi danh sách dữ liệu bộ nhớ
      state.data = state.data.filter(i => String(i.id) !== String(idToRemove));

      // Đóng modal và render lại
      F.closeRemoveModal();
      applyState();
      F.showToast(result.message || 'Đã xóa khỏi danh sách yêu thích.');
    } catch (err) {
      console.error('Lỗi khi bỏ yêu thích:', err);
      F.showToast(err.message || 'Không thể bỏ yêu thích. Vui lòng thử lại.');
    } finally {
      if (btnConfirm) btnConfirm.disabled = false;
    }
  }

  /**
   * Gắn sự kiện và khởi tạo trang
   */
  function initLogic() {
    // Sự kiện chuyển Tab
    const tabs = document.querySelectorAll('.fav-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        state.currentTab = tab.dataset.tab || tab.textContent.replace(/\(.*?\)/, '').trim();
        applyState();
      });
    });

    // Sự kiện sắp xếp
    const sortSelect = document.getElementById('fav-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        applyState();
      });
    }

    // Sự kiện tìm kiếm trên Topbar
    const searchInput = document.getElementById('site-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.trim().toLowerCase();
        applyState();
      });

      // Ngăn form search reload trang khi nhấn Enter
      const searchForm = searchInput.closest('form');
      if (searchForm) {
        searchForm.addEventListener('submit', (e) => e.preventDefault());
      }
    }

    // Phím tắt tìm kiếm Ctrl + K hoặc Cmd + K, và Escape để xóa
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
      if (e.key === 'Escape') {
        if (searchInput && document.activeElement === searchInput) {
          searchInput.value = '';
          state.searchQuery = '';
          applyState();
          searchInput.blur();
        }
      }
    });

    // Sự kiện Đăng xuất (Logout) trên menu người dùng
    const logoutLink = document.getElementById('user-logout-link');
    if (logoutLink) {
      logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/pages/auth/login.html';
      });
    }

    // Sự kiện xác nhận xoá trong Modal
    const btnConfirm = document.getElementById('fav-btn-confirm');
    if (btnConfirm) {
      btnConfirm.addEventListener('click', () => {
        const idToRemove = btnConfirm.dataset.id;
        if (idToRemove) handleConfirmRemove(idToRemove);
      });
    }

    // Nút thử lại trên giao diện lỗi
    const btnRetry = document.getElementById('fav-btn-retry');
    if (btnRetry) {
      btnRetry.addEventListener('click', () => {
        loadFavorites();
      });
    }

    // Tải dữ liệu ban đầu
    loadFavorites();
  }

  F.loadFavorites = loadFavorites;
  F.applyState = applyState;

  document.addEventListener('DOMContentLoaded', () => {
    initLogic();
  });
})();
