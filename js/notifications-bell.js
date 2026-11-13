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

  // Phát hiện trang Admin để bản địa hóa tiếng Việt
  const isAdminPage = window.location.pathname.includes('/pages/admin/') ||
    (window.location.pathname.includes('admin') && document.documentElement.lang === 'vi');

  // Đọc cài đặt thông báo an toàn từ settings (try/catch)
  function getMuteParam() {
    try {
      const raw = localStorage.getItem('lib95:settings:data');
      if (!raw) return '';
      const data = JSON.parse(raw);
      const notifSettings = data?.notifications || {};
      const mutes = [];
      if (notifSettings.lectureUpdates === false) {
        mutes.push('lecture');
      }
      if (notifSettings.communityActivity === false) {
        mutes.push('community');
      }
      return mutes.length > 0 ? mutes.join(',') : '';
    } catch (e) {
      return '';
    }
  }

  function appendMuteParam(url) {
    const mute = getMuteParam();
    if (!mute) return url;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}mute=${encodeURIComponent(mute)}`;
  }

  // Helper tính thời gian tương đối
  function formatRelativeTime(dateInput, isVietnamese = false) {
    if (!dateInput) return '';
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '';
    const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);

    if (isVietnamese) {
      if (diffSec < 45) return 'Vừa xong';
      if (diffSec < 90) return '1 phút trước';
      if (diffSec < 3600) return `${Math.floor(diffSec / 60)} phút trước`;
      if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} giờ trước`;
      if (diffSec < 2592000) return `${Math.floor(diffSec / 86400)} ngày trước`;
      return date.toLocaleDateString('vi-VN', { month: 'numeric', day: 'numeric' });
    }

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
  function getNotificationMeta(notif, isVietnamese = false) {
    const actorName = (notif.actor && notif.actor.name) || (isVietnamese ? 'Một thành viên' : 'A member');
    let icon = '🔔';
    let text = isVietnamese ? `${actorName} đã tương tác với bạn` : `${actorName} interacted with you`;
    let url = '/pages/community/community-feed.html';

    if (notif.type === 'lecture') {
      icon = '🎓';
      const lectureTitle = notif.lecture_title || notif.meta || (isVietnamese ? 'Bài giảng mới' : 'New Lecture');
      text = isVietnamese
        ? `${actorName} đã thêm bài giảng mới: ${lectureTitle}`
        : `${actorName} added a new lecture: ${lectureTitle}`;
      url = notif.lecture_id ? `/pages/lectures/lecture.html?id=${notif.lecture_id}` : '/pages/lectures/lectures.html';
    } else if (notif.type === 'resource') {
      icon = '📁';
      const resourceTitle = notif.resource_title || notif.meta || (isVietnamese ? 'Tài nguyên mới' : 'New Resource');
      text = isVietnamese
        ? `${actorName} đã tải lên tài nguyên: ${resourceTitle}`
        : `${actorName} uploaded a resource: ${resourceTitle}`;
      url = '/pages/lectures/resources.html';
    } else if (notif.type === 'moderation') {
      icon = '🛡️';
      text = notif.meta || (isVietnamese ? 'Thông báo kiểm duyệt từ hệ thống' : 'System moderation notice');
      url = '/pages/community/community-notifications.html';
    } else if (notif.type === 'post') {
      icon = notif.is_pinned ? '📌' : '📝';
      text = isVietnamese ? `${actorName} đã đăng một bài viết mới` : `${actorName} published a new post`;
      url = notif.post_id ? `/pages/community/community-feed.html#post-${notif.post_id}` : '/pages/community/community-feed.html';
    } else if (notif.type === 'like') {
      icon = '♥';
      text = isVietnamese ? `${actorName} đã thích bài viết của bạn` : `${actorName} liked your post`;
      url = notif.post_id ? `/pages/community/community-feed.html#post-${notif.post_id}` : '/pages/community/community-feed.html';
    } else if (notif.type === 'comment') {
      icon = '💬';
      text = isVietnamese ? `${actorName} đã bình luận về bài viết của bạn` : `${actorName} commented on your post`;
      url = notif.post_id ? `/pages/community/community-feed.html#post-${notif.post_id}` : '/pages/community/community-feed.html';
    } else if (notif.type === 'reply') {
      icon = '↩';
      text = isVietnamese ? `${actorName} đã trả lời thảo luận của bạn` : `${actorName} replied to your discussion`;
      url = '/pages/community/community-discussions.html';
    } else if (notif.type === 'mention') {
      icon = '@';
      text = isVietnamese ? `${actorName} đã nhắc đến bạn` : `${actorName} mentioned you`;
      url = notif.post_id ? `/pages/community/community-feed.html#post-${notif.post_id}` : '/pages/community/community-feed.html';
    } else if (notif.type === 'group') {
      icon = '👥';
      text = isVietnamese ? `${actorName} đã cập nhật hoạt động nhóm` : `${actorName} updated group activity`;
      url = '/pages/community/community-groups.html';
    }

    return { icon, text, url };
  }

  // Kênh đồng bộ đa tab (BroadcastChannel + storage fallback)
  let notifChannel = null;
  if (typeof BroadcastChannel !== 'undefined') {
    try {
      notifChannel = new BroadcastChannel('lib95_notifications');
    } catch (e) {
      notifChannel = null;
    }
  }

  function broadcastChange(payload = { type: 'REFRESH' }) {
    if (notifChannel) {
      try {
        notifChannel.postMessage(payload);
      } catch (e) {}
    }
    try {
      localStorage.setItem('lib95:notif:update', Date.now().toString());
    } catch (e) {}
  }

  function handleExternalNotificationChange() {
    updateUnreadBadge();
    const panel = document.querySelector('#notification-panel, #home-notification-panel');
    if (panel && !panel.hidden) {
      renderDropdown(panel, true);
    }
  }

  if (notifChannel) {
    notifChannel.onmessage = (event) => {
      if (event && event.data && event.data.type === 'REFRESH') {
        handleExternalNotificationChange();
      }
    };
  }

  window.addEventListener('storage', (event) => {
    if (event.key === 'lib95:notif:update') {
      handleExternalNotificationChange();
    }
  });

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
      const data = await apiFetch(appendMuteParam('/api/community/notifications/unread-count'));
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
        if (isAdminPage) {
          bell.setAttribute(
            'aria-label',
            unreadCount > 0 ? `Thông báo (${unreadCount > 9 ? '9+' : unreadCount} chưa đọc)` : 'Thông báo'
          );
        } else {
          bell.setAttribute(
            'aria-label',
            unreadCount > 0 ? `Notifications (${unreadCount > 9 ? '9+' : unreadCount} unread)` : 'Notifications'
          );
        }
      });
    } catch (e) {
      // Bỏ qua lỗi mạng nền
    }
  }

  // Nạp và render danh sách thông báo vào dropdown
  async function renderDropdown(panelEl, isSilent = false) {
    if (!panelEl) return;

    const titleText = isAdminPage ? 'Thông báo' : 'Notifications';
    const markAllText = isAdminPage ? 'Đánh dấu tất cả đã đọc' : 'Mark all as read';
    const viewAllText = isAdminPage ? 'Xem tất cả thông báo' : 'View all notifications';

    // Nếu không phải silent render, hiển thị skeleton loading
    if (!isSilent) {
      panelEl.innerHTML = `
        <header class="notification-header">
          <p class="notification-title">${escapeHtml(titleText)}</p>
          <button type="button" class="notification-clear" data-notif-mark-all>${escapeHtml(markAllText)}</button>
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
        <a href="/pages/community/community-notifications.html" class="notification-footer">${escapeHtml(viewAllText)}</a>
      `;
    }

    const listEl = panelEl.querySelector('.notification-list');
    const markAllBtn = panelEl.querySelector('[data-notif-mark-all]');

    if (markAllBtn) {
      markAllBtn.onclick = async (e) => {
        e.stopPropagation();
        markAllBtn.disabled = true;
        try {
          await apiFetch('/api/community/notifications/read-all', { method: 'POST' });
          panelEl.querySelectorAll('.notif-item.is-unread').forEach(el => el.classList.remove('is-unread'));
          panelEl.querySelectorAll('.notif-unread-dot').forEach(el => el.remove());
          updateUnreadBadge();
          broadcastChange({ type: 'REFRESH' });
        } catch (err) {
          console.error('Failed to mark all read:', err);
        } finally {
          markAllBtn.disabled = false;
        }
      };
    }

    try {
      const data = await apiFetch(appendMuteParam('/api/community/notifications?page=1&limit=8'));
      const notifications = data.notifications || [];

      // Cập nhật badge
      updateUnreadBadge();

      if (notifications.length === 0) {
        listEl.innerHTML = `
          <li class="notif-empty">
            <span class="notif-empty-icon" aria-hidden="true">🔔</span>
            <p>${isAdminPage ? 'Bạn đã xem hết thông báo!' : "You're all caught up!"}</p>
            <small style="color: var(--color-text-muted);">${isAdminPage ? 'Không có thông báo mới lúc này.' : 'No new notifications right now.'}</small>
          </li>
        `;
        return;
      }

      listEl.innerHTML = '';

      const hasPinned = notifications.some(n => Boolean(n.is_pinned));
      let renderedPinnedHeader = false;
      let renderedRecentHeader = false;

      notifications.forEach(n => {
        const isPinned = Boolean(n.is_pinned);

        // Hiển thị nhãn nhóm bài ghim / bài gần đây
        if (hasPinned && isPinned && !renderedPinnedHeader) {
          const pinnedHeaderLi = document.createElement('li');
          pinnedHeaderLi.className = 'notif-section-label';
          pinnedHeaderLi.setAttribute('role', 'presentation');
          pinnedHeaderLi.textContent = isAdminPage ? '📌 Thông báo đã ghim' : '📌 Pinned Announcements';
          listEl.appendChild(pinnedHeaderLi);
          renderedPinnedHeader = true;
        } else if (hasPinned && !isPinned && !renderedRecentHeader) {
          const recentHeaderLi = document.createElement('li');
          recentHeaderLi.className = 'notif-section-label';
          recentHeaderLi.setAttribute('role', 'presentation');
          recentHeaderLi.textContent = isAdminPage ? 'Gần đây' : 'Recent';
          listEl.appendChild(recentHeaderLi);
          renderedRecentHeader = true;
        }

        const meta = getNotificationMeta(n, isAdminPage);
        const li = document.createElement('li');
        li.className = `notif-item${!n.is_read ? ' is-unread' : ''}${isPinned ? ' notif-item--pinned' : ''}`;
        li.setAttribute('role', 'button');
        li.setAttribute('tabindex', '0');

        // Avatar
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'notif-avatar';
        const actorName = (n.actor && n.actor.name) || (isAdminPage ? 'Thành viên' : 'User');
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

        const remainingText = meta.text.replace(actorName, '').trim();
        textP.innerHTML = `<span class="notif-actor-name">${escapeHtml(actorName)}</span>${roleBadgeHtml} ${escapeHtml(remainingText)}`;
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
        timeSpan.textContent = formatRelativeTime(n.created_at, isAdminPage);
        metaRow.appendChild(timeSpan);

        if (isPinned) {
          const pinnedBadge = document.createElement('span');
          pinnedBadge.className = 'notif-badge-pinned';
          pinnedBadge.textContent = isAdminPage ? '📌 Đã ghim' : '📌 Pinned';
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
              broadcastChange({ type: 'REFRESH' });
            } catch (e) {
              // Tiếp tục chuyển trang kể cả khi API đánh dấu đọc lỗi mạng
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
          <p>${isAdminPage ? 'Không thể tải thông báo' : 'Failed to load notifications'}</p>
          <small style="color: var(--color-text-muted);">${isAdminPage ? 'Vui lòng kiểm tra mạng và thử lại.' : 'Please check your network and try again.'}</small>
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

  // Tự động nạp CSS và JS cho Global Search nếu trang có ô tìm kiếm topbar
  function autoLoadGlobalSearch() {
    if (window.Lib95GlobalSearchInitialized) return;
    const hasSearch = document.getElementById('site-search') ||
      document.getElementById('admin-search') ||
      document.querySelector('.topbar .search, .search');

    if (hasSearch) {
      if (!document.querySelector('link[href*="global-search.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/css/global-search.css';
        document.head.appendChild(link);
      }
      if (!document.querySelector('script[src*="global-search.js"]')) {
        const script = document.createElement('script');
        script.src = '/js/global-search.js';
        script.defer = true;
        document.head.appendChild(script);
      }
    }
  }

  // Chạy khi DOM sẵn sàng
  function onDOMReady() {
    initBellComponent();
    autoLoadGlobalSearch();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onDOMReady);
  } else {
    onDOMReady();
  }

  // Cung cấp API toàn cục để các script khác có thể tương tác
  window.Lib95Notifications = {
    refreshBadge: updateUnreadBadge,
    renderDropdown: renderDropdown,
    broadcastChange: broadcastChange
  };
})();