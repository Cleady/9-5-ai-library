/**
 * ==========================================================================
 * Universal Notification Bell Component (js/notifications-bell.js)
 * Đồng bộ chuông thông báo, dropdown popup, ghim bài và polling trên mọi trang
 * ==========================================================================
 */
(function () {
  'use strict';

  if (window.Lib95BellInitialized) return;
  window.Lib95BellInitialized = true;

  // Helper tính thời gian tương đối
  function formatRelativeTime(dateInput) {
    if (!dateInput) return '';
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '';
    const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diffSec < 45) return 'Just now';
    if (diffSec < 90) return '1m ago';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    if (diffSec < 2592000) return `${Math.floor(diffSec / 86400)}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  // Helper an toàn escape HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Định nghĩa metadata theo loại thông báo
  function getNotificationMeta(notif) {
    const actorName = (notif.actor && notif.actor.name) || 'A member';
    let icon = '🔔';
    let text = `${actorName} interacted with you`;
    let url = '/pages/community/community-feed.html';

    if (notif.type === 'post') {
      icon = notif.is_pinned ? '📌' : '📝';
      text = `${actorName} published a new post`;
      url = notif.post_id ? `/pages/community/community-feed.html#post-${notif.post_id}` : '/pages/community/community-feed.html';
    } else if (notif.type === 'like') {
      icon = '♥';
      text = `${actorName} liked your post`;
      url = notif.post_id ? `/pages/community/community-feed.html#post-${notif.post_id}` : '/pages/community/community-feed.html';
    } else if (notif.type === 'comment') {
      icon = '💬';
      text = `${actorName} commented on your post`;
      url = notif.post_id ? `/pages/community/community-feed.html#post-${notif.post_id}` : '/pages/community/community-feed.html';
    } else if (notif.type === 'reply') {
      icon = '↩';
      text = `${actorName} replied to your discussion`;
      url = '/pages/community/community-discussions.html';
    } else if (notif.type === 'mention') {
      icon = '@';
      text = `${actorName} mentioned you`;
      url = notif.post_id ? `/pages/community/community-feed.html#post-${notif.post_id}` : '/pages/community/community-feed.html';
    } else if (notif.type === 'group') {
      icon = '👥';
      text = `${actorName} updated group activity`;
      url = '/pages/community/community-groups.html';
    }

    return { icon, text, url };
  }

  // Helper gọi API có kèm token
  async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = Object.assign(
      { 'Content-Type': 'application/json' },
      token ? { Authorization: `Bearer ${token}` } : {},
      options.headers || {}
    );
    const res = await fetch(endpoint, { credentials: 'same-origin', ...options, headers });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Network response was not ok' }));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    return res.json();
  }

  // Quản lý polling
  let pollingTimer = null;

  function stopPolling() {
    if (pollingTimer) {
      clearInterval(pollingTimer);
      pollingTimer = null;
    }
  }

  function startPolling() {
    stopPolling();
    // Chạy mỗi 60 giây khi tab đang hiển thị
    pollingTimer = setInterval(() => {
      if (!document.hidden && localStorage.getItem('token')) {
        updateUnreadBadge();
      }
    }, 60000);
  }

  // Cập nhật chấm đỏ badge
  async function updateUnreadBadge() {
    if (!localStorage.getItem('token')) return;
    try {
      const data = await apiFetch('/api/community/notifications/unread-count');
      const unreadCount = data.unread_count || data.unreadCount || 0;
      const dots = document.querySelectorAll('.notification-dot, .home-page__notification-dot');
      const bells = document.querySelectorAll('.notification .icon-button, [data-home-notifications]');

      dots.forEach(dot => {
        if (unreadCount > 0) {
          dot.hidden = false;
          dot.style.display = 'block';
        } else {
          dot.hidden = true;
          dot.style.display = 'none';
        }
      });

      bells.forEach(bell => {
        bell.setAttribute(
          'aria-label',
          unreadCount > 0 ? `Notifications (${unreadCount > 9 ? '9+' : unreadCount} unread)` : 'Notifications'
        );
      });
    } catch (e) {
      // Bỏ qua lỗi mạng nền
    }
  }

  // Nạp và render danh sách thông báo vào dropdown
  async function renderDropdown(panelEl) {
    if (!panelEl) return;

    // Cấu trúc khung panel chuẩn
    panelEl.innerHTML = `
      <header class="notification-header">
        <p class="notification-title">Notifications</p>
        <button type="button" class="notification-clear" data-notif-mark-all>Mark all as read</button>
      </header>
      <ul class="notification-list" role="list">
        <li class="notif-skeleton-item">
          <div class="notif-skeleton-avatar"></div>
          <div class="notif-skeleton-lines">
            <div class="notif-skeleton-line" style="width: 75%"></div>
            <div class="notif-skeleton-line" style="width: 50%"></div>
          </div>
        </li>
        <li class="notif-skeleton-item">
          <div class="notif-skeleton-avatar"></div>
          <div class="notif-skeleton-lines">
            <div class="notif-skeleton-line" style="width: 60%"></div>
            <div class="notif-skeleton-line" style="width: 40%"></div>
          </div>
        </li>
      </ul>
      <a href="/pages/community/community-notifications.html" class="notification-footer">View all notifications</a>
    `;

    const listEl = panelEl.querySelector('.notification-list');
    const markAllBtn = panelEl.querySelector('[data-notif-mark-all]');

    if (markAllBtn) {
      markAllBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        markAllBtn.disabled = true;
        try {
          await apiFetch('/api/community/notifications/read-all', { method: 'POST' });
          panelEl.querySelectorAll('.notif-item.is-unread').forEach(el => el.classList.remove('is-unread'));
          panelEl.querySelectorAll('.notif-unread-dot').forEach(el => el.remove());
          updateUnreadBadge();
        } catch (err) {
          console.error('Failed to mark all read:', err);
        } finally {
          markAllBtn.disabled = false;
        }
      });
    }

    try {
      const data = await apiFetch('/api/community/notifications?page=1&limit=8');
      const notifications = data.notifications || [];
      const unreadCount = data.unreadCount || data.unread_count || 0;

      // Cập nhật badge
      updateUnreadBadge();

      if (notifications.length === 0) {
        listEl.innerHTML = `
          <li class="notif-empty">
            <span class="notif-empty-icon" aria-hidden="true">🔔</span>
            <p>You're all caught up!</p>
            <small style="color: var(--color-text-muted);">No new notifications right now.</small>
          </li>
        `;
        return;
      }

      listEl.innerHTML = '';

      notifications.forEach(n => {
        const meta = getNotificationMeta(n);
        const li = document.createElement('li');
        li.className = `notif-item${!n.is_read ? ' is-unread' : ''}${n.is_pinned ? ' notif-item--pinned' : ''}`;
        li.setAttribute('role', 'button');
        li.setAttribute('tabindex', '0');

        // Avatar
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'notif-avatar';
        const actorName = (n.actor && n.actor.name) || 'User';
        if (n.actor && n.actor.avatar_url) {
          avatarDiv.style.backgroundImage = `url(${n.actor.avatar_url})`;
        } else {
          avatarDiv.textContent = actorName.charAt(0).toUpperCase();
        }

        const bubble = document.createElement('span');
        bubble.className = 'notif-type-bubble';
        bubble.textContent = meta.icon;
        avatarDiv.appendChild(bubble);

        // Content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'notif-content';

        const textP = document.createElement('p');
        textP.className = 'notif-text';

        let roleBadgeHtml = '';
        if (n.actor_role && ['owner', 'admin', 'staff'].includes(n.actor_role)) {
          roleBadgeHtml = `<span class="notif-role-badge notif-role-badge--${escapeHtml(n.actor_role)}">${escapeHtml(n.actor_role)}</span>`;
        }

        textP.innerHTML = `<span class="notif-actor-name">${escapeHtml(actorName)}</span>${roleBadgeHtml} ${escapeHtml(meta.text.replace(actorName, '').trim())}`;
        contentDiv.appendChild(textP);

        // Excerpt
        if (n.post_excerpt) {
          const excerptP = document.createElement('p');
          excerptP.className = 'notif-excerpt';
          excerptP.textContent = `"${n.post_excerpt}"`;
          contentDiv.appendChild(excerptP);
        }

        // Meta row: Time & Pinned badge
        const metaRow = document.createElement('div');
        metaRow.className = 'notif-meta-row';

        const timeSpan = document.createElement('time');
        timeSpan.className = 'notif-time';
        timeSpan.textContent = formatRelativeTime(n.created_at);
        metaRow.appendChild(timeSpan);

        if (n.is_pinned) {
          const pinnedBadge = document.createElement('span');
          pinnedBadge.className = 'notif-badge-pinned';
          pinnedBadge.innerHTML = '📌 Pinned';
          metaRow.appendChild(pinnedBadge);
        }

        contentDiv.appendChild(metaRow);

        li.appendChild(avatarDiv);
        li.appendChild(contentDiv);

        if (!n.is_read) {
          const dot = document.createElement('span');
          dot.className = 'notif-unread-dot';
          dot.setAttribute('aria-hidden', 'true');
          li.appendChild(dot);
        }

        // Click handler: Mark as read and navigate
        const handleItemClick = async () => {
          if (!n.is_read) {
            try {
              await apiFetch(`/api/community/notifications/${n.id}/read`, { method: 'POST' });
              n.is_read = true;
              li.classList.remove('is-unread');
              const unreadDot = li.querySelector('.notif-unread-dot');
              if (unreadDot) unreadDot.remove();
              updateUnreadBadge();
            } catch (e) {
              // Tiếp tục chuyển trang kể cả khi API đánh dấu đọc thất bại
            }
          }
          window.location.href = meta.url;
        };

        li.addEventListener('click', handleItemClick);
        li.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleItemClick();
          }
        });

        listEl.appendChild(li);
      });

    } catch (err) {
      console.error('Failed to load notifications in dropdown:', err);
      listEl.innerHTML = `
        <li class="notif-empty" style="color: var(--status-error, #dc2626);">
          <span class="notif-empty-icon" aria-hidden="true">⚠️</span>
          <p>Failed to load notifications</p>
          <small style="color: var(--color-text-muted);">Please check your network and try again.</small>
        </li>
      `;
    }
  }

  // Khởi tạo chuông trên trang
  function initBellComponent() {
    const bellBtn = document.querySelector('.notification .icon-button, [data-home-notifications]');
    const panel = document.querySelector('#notification-panel, #home-notification-panel');

    if (!bellBtn || !panel) return;

    // Xử lý khi click vào nút chuông
    bellBtn.addEventListener('click', function (e) {
      const token = localStorage.getItem('token');

      // Khách chưa đăng nhập: Chặn mở dropdown, bật auth modal
      if (!token) {
        e.stopImmediatePropagation();
        e.preventDefault();
        panel.hidden = true;
        bellBtn.setAttribute('aria-expanded', 'false');

        const authModal = document.getElementById('auth-guard-overlay');
        if (authModal) {
          const desc = document.getElementById('auth-guard-desc');
          if (desc) desc.textContent = 'Please log in to view Notifications.';
          authModal.style.display = 'flex';
          const loginBtn = document.getElementById('auth-guard-login-btn');
          if (loginBtn) loginBtn.focus();
        } else {
          window.location.href = '/pages/auth/login.html';
        }
        return;
      }

      // Đã đăng nhập: Render danh sách khi mở
      const willOpen = panel.hidden;
      if (willOpen) {
        renderDropdown(panel);
      }
    }, true); // useCapture để chặn trước listener của main.js

    // Khởi tạo badge ban đầu
    updateUnreadBadge();
    startPolling();
  }

  // Dọn dẹp khi đổi tab hoặc unload
  window.addEventListener('beforeunload', stopPolling);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopPolling();
    } else {
      updateUnreadBadge();
      startPolling();
    }
  });

  // Chạy khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBellComponent);
  } else {
    initBellComponent();
  }

  // Cung cấp API toàn cục để các script khác có thể tương tác
  window.Lib95Notifications = {
    refreshBadge: updateUnreadBadge,
    renderDropdown: renderDropdown
  };
})();
