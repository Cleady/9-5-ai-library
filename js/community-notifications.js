/* Quản lý Trang danh sách tất cả thông báo (pages/community/community-notifications.html) */
(function () {
  'use strict';

  var app = window.Lib95 && window.Lib95.community;
  if (!app) return;
  var make = app.makeElement;

  // Lấy icon và mô tả thân thiện theo loại thông báo
  function getNotificationMeta(notif) {
    var actorName = (notif.actor && notif.actor.name) || 'A member';
    var icon = '🔔';
    var text = actorName + ' interacted with you';
    var url = '/pages/community/community-feed.html';

    if (notif.type === 'post') {
      icon = notif.is_pinned ? '📌' : '📝';
      text = actorName + ' published a new post';
      url = notif.post_id ? '/pages/community/community-feed.html#post-' + notif.post_id : '/pages/community/community-feed.html';
    } else if (notif.type === 'like') {
      icon = '♥';
      text = actorName + ' liked your post';
      url = notif.post_id ? '/pages/community/community-feed.html#post-' + notif.post_id : '/pages/community/community-feed.html';
    } else if (notif.type === 'comment') {
      icon = '💬';
      text = actorName + ' commented on your post';
      url = notif.post_id ? '/pages/community/community-feed.html#post-' + notif.post_id : '/pages/community/community-feed.html';
    } else if (notif.type === 'reply') {
      icon = '↩';
      text = actorName + ' replied to your discussion';
      url = '/pages/community/community-discussions.html';
    } else if (notif.type === 'mention') {
      icon = '@';
      text = actorName + ' mentioned you';
      url = notif.post_id ? '/pages/community/community-feed.html#post-' + notif.post_id : '/pages/community/community-feed.html';
    } else if (notif.type === 'group') {
      icon = '👥';
      text = actorName + ' updated group activity';
      url = '/pages/community/community-groups.html';
    }

    return { icon: icon, text: text, url: url };
  }

  // ==========================================
  // TRANG TẤT CẢ THÔNG BÁO (community-notifications.html)
  // ==========================================
  var fullListTarget = document.querySelector('[data-com-notif-full-list]');
  var markAllFullBtn = document.querySelector('[data-com-mark-all-read]');
  var tabButtons = document.querySelectorAll('[data-notif-tab]');

  if (!fullListTarget) {
    // Nếu không phải trang danh sách thông báo đầy đủ, kết thúc sớm
    return;
  }

  var currentFilter = 'all';
  var currentPage = 1;
  var isLoading = false;
  var hasMore = false;
  var notificationsList = [];

  // Tạo phần tử card thông báo
  function createNotificationCard(n) {
    var meta = getNotificationMeta(n);
    var card = make('a', 'notif-full-card' + (!n.is_read ? ' is-unread' : '') + (n.is_pinned ? ' notif-full-card--pinned' : ''));
    card.href = meta.url;

    // Avatar
    var avatarDiv = make('div', 'notif-avatar');
    var actorName = (n.actor && n.actor.name) || 'User';
    if (n.actor && n.actor.avatar_url) {
      avatarDiv.style.backgroundImage = 'url(' + n.actor.avatar_url + ')';
    } else {
      avatarDiv.textContent = actorName.charAt(0).toUpperCase();
    }

    var bubble = make('span', 'notif-type-bubble', meta.icon);
    avatarDiv.appendChild(bubble);

    // Content
    var contentDiv = make('div', 'notif-content');
    var textP = make('p', 'notif-text');

    var actorSpan = make('span', 'notif-actor-name', actorName);
    textP.appendChild(actorSpan);

    if (n.actor_role && ['owner', 'admin', 'staff'].includes(n.actor_role)) {
      var roleBadge = make('span', 'notif-role-badge notif-role-badge--' + n.actor_role, n.actor_role);
      textP.appendChild(roleBadge);
    }

    var actionSpan = document.createTextNode(' ' + meta.text.replace(actorName, '').trim());
    textP.appendChild(actionSpan);
    contentDiv.appendChild(textP);

    if (n.post_excerpt) {
      var excerptP = make('p', 'notif-excerpt', '"' + n.post_excerpt + '"');
      contentDiv.appendChild(excerptP);
    }

    var metaRow = make('div', 'notif-meta-row');
    var timeEl = make('time', 'notif-time', app.relativeTime(n.created_at));
    metaRow.appendChild(timeEl);

    if (n.is_pinned) {
      var pinnedBadge = make('span', 'notif-badge-pinned', '📌 Pinned');
      metaRow.appendChild(pinnedBadge);
    }

    contentDiv.appendChild(metaRow);

    card.appendChild(avatarDiv);
    card.appendChild(contentDiv);

    if (!n.is_read) {
      var dot = make('span', 'notif-unread-dot');
      card.appendChild(dot);
    }

    // Đánh dấu đã đọc khi click
    card.addEventListener('click', async function (e) {
      if (!n.is_read) {
        try {
          await app.apiFetch('/api/community/notifications/' + n.id + '/read', { method: 'POST' });
          n.is_read = true;
          card.classList.remove('is-unread');
          var dotEl = card.querySelector('.notif-unread-dot');
          if (dotEl) dotEl.remove();
          if (window.Lib95Notifications && window.Lib95Notifications.refreshBadge) {
            window.Lib95Notifications.refreshBadge();
          }
        } catch (err) {}
      }
    });

    return card;
  }

  // Render danh sách thông báo ra DOM
  function renderNotificationsView() {
    fullListTarget.replaceChildren();

    if (notificationsList.length === 0) {
      var emptyBox = make('div', 'notif-empty');
      emptyBox.innerHTML = '<span class="notif-empty-icon">🔔</span><p>No notifications found.</p><small style="color: var(--color-text-muted);">You do not have any notifications in this section.</small>';
      fullListTarget.appendChild(emptyBox);
      return;
    }

    // Tách bài ghim lên section trên (chỉ khi đang ở tab All)
    var pinnedItems = [];
    var normalItems = [];

    if (currentFilter === 'all') {
      notificationsList.forEach(function (n) {
        if (n.is_pinned) pinnedItems.push(n);
        else normalItems.push(n);
      });
    } else {
      normalItems = notificationsList;
    }

    // Render khu vực Pinned
    if (pinnedItems.length > 0) {
      var pinnedSec = make('section', 'notif-pinned-section');
      var heading = make('div', 'notif-pinned-section-heading', '📌 Pinned Announcements');
      pinnedSec.appendChild(heading);

      pinnedItems.forEach(function (n) {
        pinnedSec.appendChild(createNotificationCard(n));
      });

      fullListTarget.appendChild(pinnedSec);
    }

    // Render danh sách thường
    var regularContainer = make('div');
    normalItems.forEach(function (n) {
      regularContainer.appendChild(createNotificationCard(n));
    });
    fullListTarget.appendChild(regularContainer);

    // Nút Load more
    if (hasMore) {
      var loadMoreBtn = make('button', 'notif-load-more-btn', 'Load more notifications');
      loadMoreBtn.type = 'button';
      loadMoreBtn.addEventListener('click', function () {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = 'Loading...';
        loadNotifications(currentPage + 1, true);
      });
      fullListTarget.appendChild(loadMoreBtn);
    }
  }

  // Tải thông báo từ API
  async function loadNotifications(page, append) {
    if (isLoading) return;
    isLoading = true;

    if (!append) {
      fullListTarget.replaceChildren();
      var skeleton = make('div');
      skeleton.innerHTML = `
        <div class="notif-skeleton-item notif-full-card">
          <div class="notif-skeleton-avatar"></div>
          <div class="notif-skeleton-lines"><div class="notif-skeleton-line" style="width: 70%"></div><div class="notif-skeleton-line" style="width: 40%"></div></div>
        </div>
        <div class="notif-skeleton-item notif-full-card">
          <div class="notif-skeleton-avatar"></div>
          <div class="notif-skeleton-lines"><div class="notif-skeleton-line" style="width: 80%"></div><div class="notif-skeleton-line" style="width: 50%"></div></div>
        </div>
      `;
      fullListTarget.appendChild(skeleton);
    }

    try {
      var url = '/api/community/notifications?page=' + page + '&limit=15&filter=' + currentFilter;
      var data = await app.apiFetch(url);

      currentPage = page;
      var newItems = data.notifications || [];
      hasMore = Boolean(data.pagination && data.pagination.has_more);

      if (append) {
        notificationsList = notificationsList.concat(newItems);
      } else {
        notificationsList = newItems;
      }

      renderNotificationsView();

      // Cập nhật badge
      if (window.Lib95Notifications && window.Lib95Notifications.refreshBadge) {
        window.Lib95Notifications.refreshBadge();
      }

    } catch (err) {
      fullListTarget.replaceChildren();
      var errBox = make('div', 'notif-empty');
      errBox.innerHTML = '<span class="notif-empty-icon" style="color: var(--status-error,#dc2626);">⚠️</span><p>Failed to load notifications</p><small style="color: var(--color-text-muted);">Please check your network connection and try again.</small>';
      fullListTarget.appendChild(errBox);
    } finally {
      isLoading = false;
    }
  }

  // Gắn sự kiện chuyển tab
  tabButtons.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var filterValue = tab.getAttribute('data-notif-tab') || 'all';
      if (filterValue === currentFilter) return;

      tabButtons.forEach(function (t) {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      currentFilter = filterValue;
      currentPage = 1;
      loadNotifications(1, false);
    });
  });

  // Nút Mark all as read ở đầu trang
  if (markAllFullBtn) {
    markAllFullBtn.addEventListener('click', async function () {
      markAllFullBtn.disabled = true;
      try {
        var res = await app.apiFetch('/api/community/notifications/read-all', { method: 'POST' });
        if (res.success) {
          app.showToast('Marked all notifications as read');
          notificationsList.forEach(function (n) { n.is_read = true; });
          renderNotificationsView();
          if (window.Lib95Notifications && window.Lib95Notifications.refreshBadge) {
            window.Lib95Notifications.refreshBadge();
          }
        }
      } catch (err) {
        // apiFetch đã hiển thị toast
      } finally {
        markAllFullBtn.disabled = false;
      }
    });
  }

  // Khởi chạy khi nạp trang
  loadNotifications(1, false);

})();
