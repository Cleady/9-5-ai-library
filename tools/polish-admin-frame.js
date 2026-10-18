const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// 1. Update pages/admin/admin.html
const adminHtmlPath = path.join(rootDir, 'pages/admin/admin.html');
let html = fs.readFileSync(adminHtmlPath, 'utf8');

// a) Update head guard
const oldGuardRegex = /<script>[\s\S]*?\/\/ Kiểm tra quyền truy cập Admin Dashboard[\s\S]*?<\/script>/;
const newGuard = `<script>
    // Kiểm tra quyền truy cập Admin Dashboard
    (function() {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            window.location.replace('../../index.html');
            return;
        }
        try {
            const user = JSON.parse(userStr);
            if (!user.role || user.role === 'member') {
                alert('Bạn không có quyền truy cập trang Quản trị!');
                window.location.replace('../../index.html');
            }
        } catch (e) {
            window.location.replace('../../index.html');
        }
    })();
</script>`;

if (oldGuardRegex.test(html)) {
  html = html.replace(oldGuardRegex, newGuard);
}

// b) Update Sidebar labels to Vietnamese
html = html.replace('class="nav-label">Dashboard</span>', 'class="nav-label">Tổng quan</span>');
html = html.replace('class="nav-label">LMS Manager</span>', 'class="nav-label">Quản lý học tập</span>');
html = html.replace('class="nav-label">Community Moderation</span>', 'class="nav-label">Kiểm duyệt cộng đồng</span>');
html = html.replace('class="nav-label">Settings</span>', 'class="nav-label">Cài đặt hệ thống</span>');
html = html.replace('aria-label="Manage tài khoản và cài đặt"', 'aria-label="Quản lý tài khoản và cài đặt"');
html = html.replace(/<p>Knowledge for a better tomorrow<\/p>/i, '<p>Tri thức vì một ngày mai tươi sáng</p>');

// c) Update Search and Notifications
html = html.replace('placeholder="Search anything..."', 'placeholder="Tìm kiếm mọi thứ..."');
html = html.replace('aria-label="Notifications (có 3 thông báo mới)"', 'aria-label="Thông báo (có 3 thông báo mới)"');
html = html.replace('<p class="notification-title">Notifications</p>', '<p class="notification-title">Thông báo</p>');
html = html.replace('<button type="button"\n                                    class="notification-clear">Mark as read</button>', '<button type="button"\n                                    class="notification-clear">Đánh dấu đã đọc</button>');
html = html.replace('<button type="button" class="notification-clear">Mark as read</button>', '<button type="button" class="notification-clear">Đánh dấu đã đọc</button>');
html = html.replace('View all notifications', 'Xem tất cả thông báo');

// d) Remove dead theme button
const deadBtnRegex = /<button class="icon-button theme-button"[\s\S]*?<\/button>\s*/;
html = html.replace(deadBtnRegex, '');

// e) Update User menu items to Vietnamese
html = html.replace('aria-hidden="true"></span>Profile</a>', 'aria-hidden="true"></span>Hồ sơ cá nhân</a>');
html = html.replace('aria-hidden="true"></span>Security tài khoản</a>', 'aria-hidden="true"></span>Bảo mật tài khoản</a>');
html = html.replace('aria-hidden="true"></span>Logout</a>', 'aria-hidden="true"></span>Đăng xuất</a>');
html = html.replace('<span class="role-badge">Administrator</span>', '<span class="role-badge">Quản trị viên</span>');

fs.writeFileSync(adminHtmlPath, html, 'utf8');
console.log('Updated: pages/admin/admin.html frame to 100% Vietnamese!');

// 2. Update js/admin-dashboard.js
const dashJsPath = path.join(rootDir, 'js/admin-dashboard.js');
let dashJs = fs.readFileSync(dashJsPath, 'utf8');

// Proactive redirection on 403
if (dashJs.includes("if (res.status === 403) {")) {
  dashJs = dashJs.replace(
    /if \(res\.status === 403\) \{[\s\S]*?return;\s*\}/,
    `if (res.status === 403) {
        showToast('Bạn không có quyền xem trang Quản trị!', true);
        setTimeout(() => { window.location.replace('../../index.html'); }, 1000);
        return;
      }`
  );
}

// User menu logout handler
if (!dashJs.includes('admin-logout-init')) {
  dashJs += `\n
// --- Bổ sung: Xử lý Đăng xuất Admin (admin-logout-init) ---
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.querySelector('a[href="#signout"]');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.replace('../../pages/auth/login.html');
    });
  }
});
`;
}

fs.writeFileSync(dashJsPath, dashJs, 'utf8');
console.log('Updated: js/admin-dashboard.js with proactive 403 redirect & logout!');
