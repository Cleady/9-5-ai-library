/**
 * File: js/sidebar-toggle.js
 * Tính năng: Thu/hiện thanh bên (Sidebar Toggle) cho 9.5 AI Club.
 * - Nút toggle nằm đè đúng vị trí logo (.brand-logo) khi mở.
 * - Chỉ hiện khi rê chuột vào khu vực header sidebar (.sidebar-brand) hoặc nút/hot-zone.
 * - Lưu trạng thái vào localStorage ('lib95:sidebar_collapsed').
 * - Phím tắt Ctrl+B (hoặc Cmd+B).
 * - Không can thiệp màn hình mobile (<= 768px).
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'lib95:sidebar_collapsed';
  var hideTimer = null;
  var toggleBtn = null;
  var hotzone = null;

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function updateAriaState(isCollapsed) {
    if (!toggleBtn) return;
    if (isCollapsed) {
      toggleBtn.setAttribute('aria-label', 'Mở rộng thanh bên');
      toggleBtn.setAttribute('title', 'Mở rộng thanh bên (Ctrl+B)');
      toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      toggleBtn.setAttribute('aria-label', 'Thu gọn thanh bên');
      toggleBtn.setAttribute('title', 'Thu gọn thanh bên (Ctrl+B)');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  }

  function showButton() {
    if (isMobile()) return;
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
    document.documentElement.classList.add('sidebar-toggle-active');
  }

  function hideButton() {
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      if (toggleBtn && document.activeElement === toggleBtn) return;
      document.documentElement.classList.remove('sidebar-toggle-active');
    }, 40);
  }

  function updatePositions() {
    if (isMobile()) return;
    var brandLogo = document.querySelector('.sidebar .brand-logo');
    if (brandLogo && !document.documentElement.classList.contains('sidebar-collapsed')) {
      var rect = brandLogo.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        var top = Math.round(rect.top + (rect.height - 36) / 2);
        var left = Math.round(rect.left + (rect.width - 36) / 2);
        document.documentElement.style.setProperty('--sidebar-toggle-top', top + 'px');
        document.documentElement.style.setProperty('--sidebar-toggle-left', left + 'px');
      }
    }
  }

  function toggleSidebar() {
    if (isMobile()) return;
    var html = document.documentElement;
    var isCollapsed = html.classList.toggle('sidebar-collapsed');

    try {
      localStorage.setItem(STORAGE_KEY, isCollapsed ? 'true' : 'false');
    } catch (e) {
      console.warn('sidebar-toggle: save error', e);
    }

    updateAriaState(isCollapsed);

    if (!isCollapsed) {
      setTimeout(updatePositions, 320);
    }
  }

  function createToggleButton() {
    if (document.querySelector('.sidebar-toggle-btn')) return;

    // 1. Tạo nút toggle chính
    toggleBtn = document.createElement('button');
    toggleBtn.className = 'sidebar-toggle-btn';
    toggleBtn.type = 'button';
    toggleBtn.setAttribute('aria-controls', 'main-sidebar');

    toggleBtn.innerHTML =
      '<svg class="sidebar-toggle-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<rect x="3" y="3" width="18" height="18" rx="2"></rect>' +
      '<path d="M9 3v18"></path>' +
      '</svg>';

    // 2. Tạo vùng hot-zone vô hình ở góc trên bên trái khi sidebar thu gọn
    hotzone = document.createElement('div');
    hotzone.className = 'sidebar-hotzone';
    hotzone.setAttribute('aria-hidden', 'true');

    var html = document.documentElement;
    var isCollapsed = html.classList.contains('sidebar-collapsed');
    updateAriaState(isCollapsed);

    // Gắn sự kiện cho nút toggle
    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleSidebar();
    });
    toggleBtn.addEventListener('mouseenter', showButton);
    toggleBtn.addEventListener('mouseleave', hideButton);
    toggleBtn.addEventListener('focus', showButton);
    toggleBtn.addEventListener('blur', hideButton);

    // Gắn sự kiện cho vùng hot-zone khi thu gọn
    hotzone.addEventListener('mouseenter', showButton);
    hotzone.addEventListener('mouseleave', hideButton);
    hotzone.addEventListener('click', function () {
      toggleSidebar();
      showButton();
    });

    // Rê chuột vào khu vực header logo (.sidebar-brand)
    var sidebarBrand = document.querySelector('.sidebar .sidebar-brand');
    if (sidebarBrand) {
      sidebarBrand.addEventListener('mouseenter', showButton);
      sidebarBrand.addEventListener('mouseleave', hideButton);
    }

    document.body.appendChild(hotzone);
    document.body.appendChild(toggleBtn);

    updatePositions();
  }

  function initKeyboardShortcut() {
    document.addEventListener('keydown', function (event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'b') {
        var activeEl = document.activeElement;
        if (activeEl) {
          var tag = activeEl.tagName ? activeEl.tagName.toLowerCase() : '';
          if (tag === 'input' || tag === 'textarea' || tag === 'select' || activeEl.isContentEditable) {
            return;
          }
        }
        event.preventDefault();
        toggleSidebar();
        showButton();
      }
    });
  }

  function init() {
    var sidebar = document.querySelector('.sidebar');
    // Không làm gì nếu trang không có .sidebar hoặc là trang Admin (đã có toggle riêng)
    if (!sidebar || document.querySelector('.admin-app')) return;

    createToggleButton();
    initKeyboardShortcut();

    // Kích hoạt transition sau 2 frame đầu tiên để tránh chớp nháy khi vừa tải trang
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.documentElement.classList.add('sidebar-anim-ready');
      });
    });

    window.addEventListener('resize', function () {
      updatePositions();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
