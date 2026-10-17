/* Hàm nền dùng chung: gọi API backend, tạo phần tử DOM an toàn và hiển thị toast/thời gian. */
(function () {
  'use strict';

  window.Lib95 = window.Lib95 || {};
  window.Lib95.community = window.Lib95.community || {};
  var root = window.Lib95.community;

  // 1. Lấy token và thông tin người dùng từ localStorage
  function getAuthToken() {
    return window.localStorage.getItem('token') || '';
  }

  function getCurrentUser() {
    try {
      var saved = window.localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  // 2. Helper gọi API tập trung: tự động đính kèm token, xử lý 401 và bắt lỗi mạng
  async function apiFetch(endpoint, options) {
    options = options || {};
    options.headers = options.headers || {};

    var token = getAuthToken();
    if (token) {
      options.headers['Authorization'] = 'Bearer ' + token;
    }

    // Nếu body là object thường thì chuyển thành JSON
    if (options.body && !(options.body instanceof FormData) && typeof options.body === 'object') {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(options.body);
    }

    try {
      var res = await fetch(endpoint, options);

      // Xử lý hết hạn phiên hoặc chưa đăng nhập (401/403)
      if (res.status === 401) {
        showToast('Phiên đăng nhập đã hết hạn. Đang chuyển hướng...');
        setTimeout(function () {
          window.location.href = '/pages/auth/login.html';
        }, 1200);
        throw new Error('Unauthorized');
      }

      var data = {};
      try {
        data = await res.json();
      } catch (e) {
        data = { error: 'Phản hồi từ máy chủ không hợp lệ' };
      }

      if (!res.ok) {
        showToast(data.error || 'Yêu cầu không thành công');
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (err) {
      if (err.message !== 'Unauthorized') {
        showToast(err.message || 'Lỗi kết nối máy chủ');
      }
      throw err;
    }
  }

  // 3. Tạo phần tử DOM chống XSS (chỉ dùng textContent)
  function makeElement(tagName, className, text) {
    var element = document.createElement(tagName);
    if (className) element.className = className;
    if (text !== undefined && text !== null) element.textContent = text;
    return element;
  }

  // 4. Tính toán thời gian tương đối
  function relativeTime(timestamp) {
    var time = new Date(timestamp).getTime();
    var diffMs = Date.now() - (isNaN(time) ? Date.now() : time);
    var minutes = Math.max(0, Math.floor(diffMs / 60000));
    if (minutes < 1) return 'vừa xong';
    if (minutes < 60) return minutes + ' phút trước';
    var hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + ' giờ trước';
    var days = Math.floor(hours / 24);
    if (days < 7) return days + ' ngày trước';
    return new Date(timestamp).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' });
  }

  // 5. Toast thông báo
  var toastTimer;
  function showToast(message) {
    var toast = document.querySelector('[data-com-toast]');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 2800);
  }

  // 6. Kiểm tra đăng nhập bắt buộc khi truy cập phân hệ Community (Auth Guard)
  function checkAuthGuard() {
    var token = getAuthToken();
    if (!token) {
      window.location.replace('/pages/auth/login.html');
      return false;
    }
    return true;
  }

  // 7. Đăng xuất an toàn (Xóa token/user và về trang login)
  function logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    window.location.href = '/pages/auth/login.html';
  }

  // Bắt sự kiện click vào các nút/link Logout trên header menu
  document.addEventListener('click', function (e) {
    var logoutLink = e.target.closest('[data-com-logout], a[href*="login.html"]');
    if (logoutLink) {
      e.preventDefault();
      logout();
    }
  });

  checkAuthGuard();

  root.state = {
    posts: [],
    trending: [],
    contributors: [],
    page: 1,
    limit: 10,
    hasMore: true,
    loading: false
  };

  root.getAuthToken = getAuthToken;
  root.getCurrentUser = getCurrentUser;
  root.checkAuthGuard = checkAuthGuard;
  root.logout = logout;
  root.apiFetch = apiFetch;
  root.makeElement = makeElement;
  root.relativeTime = relativeTime;
  root.showToast = showToast;
}());
