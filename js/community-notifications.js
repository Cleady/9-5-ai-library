/* Quản lý Thông báo cộng đồng: Chuông thông báo topbar và Trang danh sách tất cả thông báo */
(function () {
  'use strict';

  var app = window.Lib95 && window.Lib95.community;
  if (!app) return;
  var make = app.makeElement;

  // Lấy icon và mô tả thân thiện theo loại thông báo
  function getNotificationMeta(notif) {
    var actorName = (notif.actor && notif.actor.name) || 'Một thành viên';
    var icon = '🔔';
    var text = actorName + ' đã tương tác với bạn';
    var iconClass = '';
    var url = '#';

    if (notif.type === 'like') {
      icon = '♥';
      iconClass = 'like';
      text = actorName + ' đã thích bài viết của bạn' + (notif.post_preview ? ': "' + notif.post_preview + '"' : '');
      url = '/pages/community/community-feed.html' + (notif.post_id ? '#' + notif.post_id : '');
    } else if (notif.type === 'comment') {
      icon = '💬';
      iconClass = 'comment';
      text = actorName + ' đã bình luận vào bài viết của bạn' + (notif.post_preview ? ': "' + notif.post_preview + '"' : '');
      url = '/pages/community/community-feed.html' + (notif.post_id ? '#' + notif.post_id : '');
    } else if (notif.type === 'reply') {
      icon = '↩';
      iconClass = 'reply';
      text = actorName + ' đã trả lời câu hỏi / thảo luận của bạn';
      url = '/pages/community/community-discussions.html';
    } else if (notif.type === 'mention') {
      icon = '@';
      iconClass = 'mention';
      text = actorName + ' đã nhắc đến bạn trong một bài viết';
      url = '/pages/community/community-feed.html';
    } else if (notif.type === 'group') {
      icon = '👥';
      iconClass = 'group';
      text = actorName + ' đã cập nhật hoạt động nhóm mới';
      url = '/pages/community/community-groups.html';
    }

    return { icon: icon, iconClass: iconClass, text: text, url: url };
  }

  // ==========================================
  // 1. CHUÔNG THÔNG BÁO VÀ PANEL TRÊN TOPBAR
  // ==========================================
  var bellButton = document.querySelector('.notification .icon-button');
  var notifPanel = document.querySelector('#notification-panel');
  var notifDot = document.querySelector('.notification-dot');
  var notifList = document.querySelector('.notification-list');
  var notifClear = document.querySelector('.notification-clear');

  // Cập nhật số lượng thông báo chưa đọc và nạp danh sách
  async function refreshTopbarNotifications() {
    try {
      var data = await app.apiFetch('/api/community/notifications');
      var unreadCount = data.unreadCount || 0;
      var notifications = data.notifications || [];

      // Cập nhật chấm đỏ
      if (notifDot) {
        if (unreadCount > 0) {
          notifDot.hidden = false;
          notifDot.style.display = 'block';
          if (bellButton) {
            bellButton.setAttribute('aria-label', 'Notifications (có ' + unreadCount + ' thông báo mới)');
          }
        } else {
          notifDot.hidden = true;
          notifDot.style.display = 'none';
          if (bellButton) {
            bellButton.setAttribute('aria-label', 'Notifications');
          }
        }
      }

      // Nạp danh sách vào panel
      if (notifList) {
        notifList.replaceChildren();

        if (notifications.length === 0) {
          var emptyLi = make('li', '', 'Chưa có thông báo nào');
          emptyLi.style.padding = '16px';
          emptyLi.style.textAlign = 'center';
          emptyLi.style.color = '#94a3b8';
          emptyLi.style.fontSize = '12px';
          notifList.appendChild(emptyLi);
          return;
        }

        notifications.slice(0, 8).forEach(function (n) {
          var meta = getNotificationMeta(n);
          var li = make('li', 'notification-item' + (!n.is_read ? ' is-unread' : ''));
          li.style.cursor = 'pointer';

          var iconSpan = make('span', 'notification-item-icon', meta.icon);
          if (meta.iconClass === 'like') iconSpan.style.color = '#ef4444';
          else if (meta.iconClass === 'comment' || meta.iconClass === 'reply') iconSpan.style.color = '#2563eb';

          var textDiv = make('div');
          var pText = make('p', 'notification-text', meta.text);
          var timeEl = make('time', 'notification-time', app.relativeTime(n.created_at));
          textDiv.append(pText, timeEl);

          li.append(iconSpan, textDiv);

          // Click chuyển đến bài viết và đánh dấu đã đọc
          li.addEventListener('click', async function () {
            if (!n.is_read) {
              try {
                await app.apiFetch('/api/community/notifications/' + n.id + '/read', { method: 'POST' });
              } catch (e) {}
            }
            window.location.href = meta.url;
          });

          notifList.appendChild(li);
        });
      }

    } catch (err) {
      // Bỏ qua lỗi mạng nền khi chưa đăng nhập
    }
  }

  // Đóng mở Notification Panel khi click chuông
  if (bellButton && notifPanel) {
    bellButton.addEventListener('click', function (event) {
      event.stopPropagation();
      var isHidden = notifPanel.hidden;
      notifPanel.hidden = !isHidden;
      bellButton.setAttribute('aria-expanded', String(isHidden));
      if (isHidden) {
        refreshTopbarNotifications();
      }
    });

    document.addEventListener('click', function (event) {
      if (!event.target.closest('.notification')) {
        notifPanel.hidden = true;
        bellButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Nút "Mark as read" trong panel
  if (notifClear) {
    notifClear.addEventListener('click', async function (event) {
      event.stopPropagation();
      notifClear.disabled = true;

      try {
        var res = await app.apiFetch('/api/community/notifications/read-all', { method: 'POST' });
        if (res.success) {
          if (notifDot) notifDot.style.display = 'none';
          document.querySelectorAll('.notification-item.is-unread').forEach(function (item) {
            item.classList.remove('is-unread');
          });
          app.showToast('Đã đánh dấu tất cả là đã đọc');
        }
      } catch (err) {
        // apiFetch đã hiển thị toast
      } finally {
        notifClear.disabled = false;
      }
    });
  }

  // ==========================================
  // 2. TRANG TẤT CẢ THÔNG BÁO (community-notifications.html)
  // ==========================================
  var fullListTarget = document.querySelector('[data-com-notif-full-list]');
  var markAllFullBtn = document.querySelector('[data-com-mark-all-read]');

  async function loadFullNotifications() {
    if (!fullListTarget) return;

    fullListTarget.replaceChildren();
    var loading = make('p', 'com-discussion-empty', 'Đang tải thông báo...');
    fullListTarget.appendChild(loading);

    try {
      var data = await app.apiFetch('/api/community/notifications');
      fullListTarget.replaceChildren();

      var list = data.notifications || [];
      if (list.length === 0) {
        fullListTarget.appendChild(make('p', 'com-discussion-empty', 'Bạn chưa có thông báo nào.'));
        return;
      }

      list.forEach(function (n) {
        var meta = getNotificationMeta(n);
        var itemLink = make('a', 'com-notif-full-item' + (!n.is_read ? ' is-unread' : ''));
        itemLink.href = meta.url;

        var iconBox = make('div', 'com-notif-type-icon ' + (meta.iconClass || ''), meta.icon);

        var copy = make('div');
        copy.style.flex = '1';

        var strongText = make('strong', '', meta.text);
        strongText.style.display = 'block';
        strongText.style.fontSize = '14px';
        strongText.style.color = '#1e293b';

        var timeSpan = make('span', '', app.relativeTime(n.created_at));
        timeSpan.style.fontSize = '12px';
        timeSpan.style.color = '#94a3b8';

        copy.append(strongText, timeSpan);
        itemLink.append(iconBox, copy);

        if (!n.is_read) {
          var dot = make('span');
          dot.style.width = '8px';
          dot.style.height = '8px';
          dot.style.borderRadius = '50%';
          dot.style.background = '#2563eb';
          itemLink.appendChild(dot);
        }

        itemLink.addEventListener('click', async function () {
          if (!n.is_read) {
            try {
              await app.apiFetch('/api/community/notifications/' + n.id + '/read', { method: 'POST' });
            } catch (e) {}
          }
        });

        fullListTarget.appendChild(itemLink);
      });

    } catch (err) {
      fullListTarget.replaceChildren();
      fullListTarget.appendChild(make('p', 'com-discussion-empty', 'Lỗi khi tải danh sách thông báo.'));
    }
  }

  if (markAllFullBtn) {
    markAllFullBtn.addEventListener('click', async function () {
      markAllFullBtn.disabled = true;
      try {
        var res = await app.apiFetch('/api/community/notifications/read-all', { method: 'POST' });
        if (res.success) {
          app.showToast('Đã đánh dấu tất cả thông báo là đã đọc');
          loadFullNotifications();
          refreshTopbarNotifications();
        }
      } catch (err) {
        // apiFetch đã hiển thị toast
      } finally {
        markAllFullBtn.disabled = false;
      }
    });
  }

  // Khởi chạy khi nạp trang
  refreshTopbarNotifications();
  loadFullNotifications();

  app.refreshTopbarNotifications = refreshTopbarNotifications;
}());
