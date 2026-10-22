// Shared dropdown behavior for the admin header.
function createDropdown(toggle, list, container) {
  if (!toggle || !list || !container) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function isOpen() {
    return toggle.getAttribute('aria-expanded') === 'true';
  }

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));

    if (open) {
      list.classList.remove('is-closing');
      list.hidden = false;
      return;
    }

    if (list.hidden) return;
    if (prefersReducedMotion.matches) {
      list.hidden = true;
      return;
    }
    list.classList.add('is-closing');
  }

  list.addEventListener('animationend', (event) => {
    if (event.animationName === 'menu-lift') {
      list.hidden = true;
      list.classList.remove('is-closing');
    }
  });

  toggle.addEventListener('click', () => setOpen(!isOpen()));

  document.addEventListener('click', (event) => {
    if (!container.contains(event.target)) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}

function initSidebar() {
  const app = document.querySelector('.admin-app');
  const toggle = document.querySelector('.sidebar-toggle');
  if (!app || !toggle) return;

  function updateExpanded() {
    const isMobile = window.matchMedia('(max-width: 560px)').matches;
    const isCompact = window.matchMedia('(max-width: 760px)').matches;
    const open = isMobile
      ? app.classList.contains('is-sidebar-open')
      : isCompact
        ? app.classList.contains('is-sidebar-expanded')
        : !app.classList.contains('is-sidebar-collapsed');
    toggle.setAttribute('aria-expanded', String(open));
  }

  toggle.addEventListener('click', () => {
    if (window.matchMedia('(max-width: 560px)').matches) {
      app.classList.toggle('is-sidebar-open');
    } else if (window.matchMedia('(max-width: 760px)').matches) {
      app.classList.toggle('is-sidebar-expanded');
    } else {
      app.classList.toggle('is-sidebar-collapsed');
    }
    updateExpanded();
  });

  document.querySelectorAll('[data-page-target]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const pageName = button.dataset.pageTarget;
      document.querySelectorAll('[data-page-target]').forEach((item) => {
        const selected = item === button;
        item.classList.toggle('is-active', selected);
        if (selected) item.setAttribute('aria-current', 'page');
        else item.removeAttribute('aria-current');
      });
      document.querySelectorAll('[data-page-panel]').forEach((panel) => {
        const selected = panel.dataset.pagePanel === pageName;
        panel.hidden = !selected;
        panel.classList.toggle('is-visible', selected);
      });
      if (window.matchMedia('(max-width: 560px)').matches) {
        app.classList.remove('is-sidebar-open');
        updateExpanded();
      }
    });
  });

  window.addEventListener('resize', updateExpanded);
  updateExpanded();
}

function initHeaderDropdowns() {
  const bell = document.querySelector('.notification .icon-button');
  createDropdown(bell, document.querySelector('#notification-panel'), document.querySelector('.notification'));
  createDropdown(
    document.querySelector('.user-menu-toggle'),
    document.querySelector('#user-menu-list'),
    document.querySelector('.user-menu')
  );

  // Nếu notifications-bell.js quản lý chuông, bỏ qua xử lý tĩnh cũ
  if (window.Lib95BellInitialized) return;

  const clearButton = document.querySelector('.notification-clear');
  const dot = document.querySelector('.notification-dot');
  if (!clearButton || !dot || !bell) return;

  clearButton.addEventListener('click', () => {
    document.querySelectorAll('.notification-item.is-unread').forEach((item) => {
      item.classList.remove('is-unread');
    });
    dot.hidden = true;
    bell.setAttribute('aria-label', 'Notifications (không có thông báo mới)');
  });
}

initSidebar();
initHeaderDropdowns();
