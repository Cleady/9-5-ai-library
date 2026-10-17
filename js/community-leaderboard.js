/* Xử lý Bảng xếp hạng thành viên theo tuần / tháng / toàn thời gian từ API thật */
(function () {
  'use strict';

  var app = window.Lib95 && window.Lib95.community;
  if (!app) return;
  var make = app.makeElement;

  var container = document.querySelector('[data-com-leaderboard-container]');
  if (!container) return;

  var currentRange = 'all';

  // Helper tạo avatar người dùng an toàn
  function makeAvatar(user) {
    var avatar = make('span', 'com-avatar com-avatar--blue');
    avatar.style.width = '32px';
    avatar.style.height = '32px';
    avatar.style.fontSize = '12px';

    var name = (user && (user.name || user.full_name || user.username)) || 'User';
    var initial = name.charAt(0).toUpperCase();

    if (user && user.avatar_url) {
      avatar.style.backgroundImage = 'url(' + user.avatar_url + ')';
      avatar.style.backgroundSize = 'cover';
      avatar.style.backgroundPosition = 'center';
      avatar.textContent = '';
    } else {
      avatar.textContent = initial;
    }
    return avatar;
  }

  // 1. Tải bảng xếp hạng từ API
  async function loadLeaderboard(range) {
    currentRange = range || 'all';
    container.replaceChildren();

    var loading = make('p', 'com-discussion-empty', 'Đang tải bảng xếp hạng...');
    container.appendChild(loading);

    try {
      var res = await app.apiFetch('/api/community/leaderboard?range=' + encodeURIComponent(currentRange));
      container.replaceChildren();

      var list = res.leaderboard || [];
      if (list.length === 0) {
        container.appendChild(make('p', 'com-discussion-empty', 'Chưa có dữ liệu xếp hạng trong khoảng thời gian này.'));
        return;
      }

      var table = make('table', 'com-leaderboard-table');
      var thead = make('thead');
      var headerRow = make('tr');

      var thRank = make('th', '', 'Thứ hạng');
      var thUser = make('th', '', 'Thành viên');
      var thPosts = make('th', 'text-right', 'Bài viết');
      var thComments = make('th', 'text-right', 'Bình luận');
      var thLikes = make('th', 'text-right', 'Lượt thích');
      var thScore = make('th', 'text-right', 'Tổng điểm');

      headerRow.append(thRank, thUser, thPosts, thComments, thLikes, thScore);
      thead.appendChild(headerRow);
      table.appendChild(thead);

      var tbody = make('tbody');

      list.forEach(function (item) {
        var tr = make('tr', 'com-lb-row');

        // Cột Rank
        var tdRank = make('td');
        var rankSpan = make('span', 'com-lb-rank');
        if (item.rank === 1) {
          rankSpan.classList.add('com-lb-rank--1');
          rankSpan.textContent = '🥇 1';
        } else if (item.rank === 2) {
          rankSpan.classList.add('com-lb-rank--2');
          rankSpan.textContent = '🥈 2';
        } else if (item.rank === 3) {
          rankSpan.classList.add('com-lb-rank--3');
          rankSpan.textContent = '🥉 3';
        } else {
          rankSpan.textContent = String(item.rank);
        }
        tdRank.appendChild(rankSpan);

        // Cột Thành viên
        var tdUser = make('td');
        var userWrap = make('div', 'com-lb-user');
        userWrap.appendChild(makeAvatar(item));

        var nameWrap = make('div');
        var nameStrong = make('strong', '', item.name);
        nameStrong.style.display = 'block';
        nameStrong.style.fontSize = '13px';
        nameStrong.style.color = '#1e293b';

        var roleLabel = item.role ? (item.role.charAt(0).toUpperCase() + item.role.slice(1)) : 'Member';
        var roleSpan = make('span', '', roleLabel);
        roleSpan.style.fontSize = '11px';
        roleSpan.style.color = '#94a3b8';

        nameWrap.append(nameStrong, roleSpan);
        userWrap.appendChild(nameWrap);
        tdUser.appendChild(userWrap);

        // Cột Bài viết
        var tdPosts = make('td', 'text-right', String(item.post_count));

        // Cột Bình luận
        var tdComments = make('td', 'text-right', String(item.comment_count));

        // Cột Likes nhận được
        var tdLikes = make('td', 'text-right', '♥ ' + item.like_received_count);
        tdLikes.style.color = '#ef4444';

        // Cột Điểm
        var tdScore = make('td', 'text-right');
        var scoreSpan = make('span', 'com-lb-score', item.score + ' pts');
        tdScore.appendChild(scoreSpan);

        tr.append(tdRank, tdUser, tdPosts, tdComments, tdLikes, tdScore);
        tbody.appendChild(tr);
      });

      table.appendChild(tbody);
      container.appendChild(table);

    } catch (err) {
      container.replaceChildren();
      container.appendChild(make('p', 'com-discussion-empty', 'Lỗi khi tải bảng xếp hạng. Vui lòng thử lại.'));
    }
  }

  // 2. Lắng nghe các tab thời gian
  document.querySelectorAll('[data-com-lb-range]').forEach(function (button) {
    button.addEventListener('click', function () {
      var range = button.dataset.comLbRange;
      document.querySelectorAll('[data-com-lb-range]').forEach(function (tab) {
        tab.classList.toggle('is-active', tab === button);
        tab.setAttribute('aria-selected', String(tab === button));
      });
      loadLeaderboard(range);
    });
  });

  loadLeaderboard('all');
  app.loadLeaderboard = loadLeaderboard;
}());
