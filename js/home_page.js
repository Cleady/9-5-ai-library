/* Ghi chú: chỉ xử lý các tương tác nhẹ của trang Home, không cần thư viện ngoài. */
(function () {
  'use strict';

  var header = document.querySelector('[data-home-header]');
  var searchInput = document.querySelector('#home-search');
  var menuButton = document.querySelector('[data-home-menu]');
  var navigation = document.querySelector('[data-home-nav]');

  // Ghi chú: tạo dropdown theo cùng cách với chuông và menu tài khoản ở trang chính.
  function createDropdown(toggle, list, container) {
    if (!toggle || !list || !container) return; // Trang không có dropdown này thì bỏ qua.

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function isOpen() {
      return toggle.getAttribute('aria-expanded') === 'true';
    }

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open)); // Báo trạng thái cho trình đọc màn hình.

      if (open) {
        list.classList.remove('is-closing');
        list.hidden = false;
        return;
      }

      if (list.hidden) return;
      if (prefersReducedMotion.matches) {
        list.hidden = true; // Chế độ giảm chuyển động thì ẩn ngay.
        return;
      }
      list.classList.add('is-closing'); // Chạy animation đóng rồi mới ẩn thật.
    }

    // Ghi chú: chỉ ẩn sau khi animation đóng đã chạy xong.
    list.addEventListener('animationend', function (event) {
      if (event.animationName === 'menu-lift') {
        list.hidden = true;
        list.classList.remove('is-closing');
      }
    });

    toggle.addEventListener('click', function () { setOpen(!isOpen()); });

    // Ghi chú: click ngoài vùng nút và menu sẽ đóng dropdown.
    document.addEventListener('click', function (event) {
      if (!container.contains(event.target)) setOpen(false);
    });

    // Ghi chú: Escape đóng dropdown đang mở.
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setOpen(false);
    });
  }

  createDropdown(
    document.querySelector('[data-home-notifications]'),
    document.querySelector('#home-notification-panel'),
    document.querySelector('.home-page__notification-wrap')
  );
  createDropdown(
    document.querySelector('[data-home-guest]'),
    document.querySelector('#guest-menu'),
    document.querySelector('.home-page__guest-wrap')
  );

  // Ghi chú: phím tắt hỗ trợ cả Windows/Linux (Ctrl) và macOS (Command).
  document.addEventListener('keydown', function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (searchInput) searchInput.focus();
    }
    if (event.key === 'Escape') {
      closeMobileMenu();
    }
  });

  // Ghi chú: thanh đầu trang đậm bóng hơn một chút sau khi cuộn khỏi mép trang.
  function updateHeader() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  function closeMobileMenu() {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    navigation.classList.remove('is-open');
  }

  if (menuButton && navigation) {
    menuButton.addEventListener('click', function () {
      var isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
      navigation.classList.toggle('is-open', !isOpen);
    });

    navigation.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMobileMenu();
    });

    window.addEventListener('resize', function () {
      if (window.matchMedia('(min-width: 901px)').matches) closeMobileMenu();
    });
  }

  // Ghi chú: chỉ bật trạng thái ẩn khi trình duyệt có IntersectionObserver.
  // Nếu API này không có, toàn bộ nội dung vẫn hiện bình thường.
  var revealItems = document.querySelectorAll('.home-page__reveal');
  if ('IntersectionObserver' in window && revealItems.length) {
    document.body.classList.add('home-page--motion-ready');
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });

    revealItems.forEach(function (item) { revealObserver.observe(item); });
  }
}());
