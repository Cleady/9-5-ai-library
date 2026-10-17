/* Điều hướng Community: Tìm kiếm (Ctrl+K & real-time), Thảo luận (Discussions) và Chi tiết thảo luận từ API thật */
(function () {
  'use strict';

  var app = window.Lib95 && window.Lib95.community;
  if (!app) return;
  var make = app.makeElement;
  var params = new URLSearchParams(window.location.search);
  var pageQuery = params.get('q') || '';

  // Helper tạo avatar người dùng an toàn
  function makeAvatar(author, extraClass) {
    var avatar = make('span', 'com-avatar' + (extraClass ? ' ' + extraClass : ''));
    var name = (author && (author.full_name || author.username || author.name)) || 'User';
    var initial = name.charAt(0).toUpperCase();

    if (author && author.avatar_url) {
      avatar.style.backgroundImage = 'url(' + author.avatar_url + ')';
      avatar.style.backgroundSize = 'cover';
      avatar.style.backgroundPosition = 'center';
      avatar.textContent = '';
    } else {
      avatar.classList.add('com-avatar--blue');
      avatar.textContent = initial;
    }
    return avatar;
  }

  // Chuyển hướng đến trang tìm kiếm
  function goToSearch(value) {
    var q = (value || '').trim();
    window.location.href = '/pages/community/community-search.html' + (q ? '?q=' + encodeURIComponent(q) : '');
  }

  // ==========================================
  // 1. THANH TÌM KIẾM DÙNG CHUNG TRÊN TOPBAR & PHÍM TẮT CTRL+K
  // ==========================================
  document.querySelectorAll('[data-com-search]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var input = form.querySelector('input[type="search"]');
      goToSearch(input ? input.value : '');
    });
  });

  document.addEventListener('keydown', function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      var searchInput = document.querySelector('#com-search-query') || document.querySelector('[data-com-search] input[type="search"]');
      if (searchInput) {
        searchInput.focus();
        if (searchInput.select) searchInput.select();
      }
    }
  });

  // ==========================================
  // 2. TRANG DANH SÁCH THẢO LUẬN (community-discussions.html)
  // ==========================================
  var discState = {
    tag: 'all',
    query: ''
  };

  async function loadDiscussions(tag, query) {
    var target = document.querySelector('[data-com-discussions]');
    if (!target) return;

    target.replaceChildren();
    var loading = make('p', 'com-discussion-empty', 'Đang tải danh sách cuộc thảo luận...');
    target.appendChild(loading);

    var endpoint = '/api/community/discussions?limit=50';
    if (tag && tag !== 'all') {
      endpoint += '&tag=' + encodeURIComponent(tag);
    }
    if (query && query.trim()) {
      endpoint += '&q=' + encodeURIComponent(query.trim());
    }

    try {
      var res = await app.apiFetch(endpoint);
      target.replaceChildren();

      var list = res.discussions || [];
      if (list.length === 0) {
        target.appendChild(make('p', 'com-discussion-empty', 'Chưa tìm thấy cuộc thảo luận nào. Bạn có thể là người đầu tiên tạo thảo luận mới!'));
        return;
      }

      list.forEach(function (item) {
        var author = item.author || {};
        var authorName = author.full_name || (author.username ? author.username.split('@')[0] : 'Thành viên');

        var row = make('a', 'com-discussion-row');
        row.href = 'discussion-detail.html?id=' + encodeURIComponent(item.id);

        var icon = make('span', 'com-discussion-icon', '▣');
        var copy = make('span', 'com-discussion-copy');

        copy.appendChild(make('strong', '', item.title));
        var excerpt = item.body.length > 130 ? item.body.slice(0, 130) + '...' : item.body;
        copy.appendChild(make('p', '', excerpt));

        var meta = make('span', 'com-discussion-meta');
        meta.append(
          make('span', '', authorName),
          make('span', '', app.relativeTime(item.created_at)),
          make('span', 'com-discussion-tag', item.tag || 'general')
        );
        copy.appendChild(meta);

        var count = make('span', 'com-discussion-count');
        count.append(make('strong', '', String(item.replyCount || 0)), make('small', '', 'replies'));

        row.append(icon, copy, count);
        target.appendChild(row);
      });

    } catch (err) {
      target.replaceChildren();
      target.appendChild(make('p', 'com-discussion-empty', 'Lỗi khi tải danh sách thảo luận. Vui lòng thử lại.'));
    }
  }

  // Tải Trending Tags cho Sidebar thảo luận
  async function loadPopularTags() {
    var trends = document.querySelector('[data-com-trending]');
    if (!trends) return;

    try {
      var data = await app.apiFetch('/api/community/trending');
      trends.replaceChildren();

      var list = data.trending || [];
      if (list.length === 0) {
        var empty = make('li', '', 'Chưa có chủ đề nổi bật');
        empty.style.color = '#94a3b8';
        empty.style.fontSize = '12px';
        trends.appendChild(empty);
        return;
      }

      list.forEach(function (item) {
        var row = make('li');
        var btn = make('button', 'com-trending-link');
        btn.type = 'button';
        btn.append(make('span', '', '#' + item.tag), make('span', '', String(item.count)));
        btn.addEventListener('click', function () {
          goToSearch(item.tag);
        });
        row.appendChild(btn);
        trends.appendChild(row);
      });
    } catch (err) {
      console.error('Lỗi tải trending tags:', err);
    }
  }

  function initDiscussionsPage() {
    var target = document.querySelector('[data-com-discussions]');
    if (!target) return;

    // Filter tabs
    document.querySelectorAll('[data-com-discussion-filter]').forEach(function (button) {
      button.addEventListener('click', function () {
        discState.tag = button.dataset.comDiscussionFilter;
        document.querySelectorAll('[data-com-discussion-filter]').forEach(function (tab) {
          tab.classList.toggle('is-active', tab === button);
          tab.setAttribute('aria-selected', String(tab === button));
        });
        loadDiscussions(discState.tag, discState.query);
      });
    });

    // Form tìm kiếm trong thảo luận
    var searchForm = document.querySelector('[data-com-discussion-search]');
    if (searchForm) {
      var debounceTimer;
      searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        discState.query = searchForm.elements.q.value;
        loadDiscussions(discState.tag, discState.query);
      });
      searchForm.elements.q.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () {
          discState.query = searchForm.elements.q.value;
          loadDiscussions(discState.tag, discState.query);
        }, 300);
      });
    }

    // Modal tạo thảo luận mới
    var newDiscBtn = document.querySelector('[data-com-new-discussion-btn]');
    var modal = document.querySelector('#com-new-discussion-modal');
    var createForm = document.querySelector('[data-com-discussion-create-form]');

    if (newDiscBtn && modal) {
      newDiscBtn.addEventListener('click', function () {
        if (typeof modal.showModal === 'function') {
          modal.showModal();
        } else {
          modal.setAttribute('open', '');
        }
      });
    }

    if (modal) {
      modal.querySelectorAll('[data-com-modal-close]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (typeof modal.close === 'function') {
            modal.close();
          } else {
            modal.removeAttribute('open');
          }
        });
      });
    }

    if (createForm) {
      createForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        var title = createForm.elements.title.value.trim();
        var tag = createForm.elements.tag.value;
        var body = createForm.elements.body.value.trim();

        if (!title || !body) {
          app.showToast('Vui lòng điền đầy đủ tiêu đề và nội dung thảo luận');
          return;
        }

        var submitBtn = createForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Đang đăng...';
        }

        try {
          var res = await app.apiFetch('/api/community/discussions', {
            method: 'POST',
            body: { title: title, tag: tag, body: body }
          });

          if (res.success) {
            createForm.reset();
            if (typeof modal.close === 'function') {
              modal.close();
            } else {
              modal.removeAttribute('open');
            }
            app.showToast('Tạo cuộc thảo luận thành công!');
            loadDiscussions(discState.tag, discState.query);
          }
        } catch (err) {
          // apiFetch đã hiển thị toast
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Đăng thảo luận';
          }
        }
      });
    }

    loadDiscussions('all', '');
    loadPopularTags();
  }

  // ==========================================
  // 3. TRANG CHI TIẾT THẢO LUẬN (discussion-detail.html)
  // ==========================================
  async function renderDiscussionDetail() {
    var target = document.querySelector('[data-com-discussion-detail]');
    if (!target) return;

    var discussionId = params.get('id');
    if (!discussionId) {
      target.replaceChildren();
      target.appendChild(make('p', 'com-discussion-empty', 'Không tìm thấy ID cuộc thảo luận trong đường dẫn.'));
      return;
    }

    target.replaceChildren();
    var loading = make('div', 'com-discussion-empty', 'Đang nạp chi tiết thảo luận...');
    target.appendChild(loading);

    try {
      var res = await app.apiFetch('/api/community/discussions/' + encodeURIComponent(discussionId));
      target.replaceChildren();

      var discussion = res.discussion;
      var replies = res.replies || [];
      var user = app.getCurrentUser();

      // Cập nhật tiêu đề trang và breadcrumb
      document.title = discussion.title + ' | Discussions | 9.5 AI CLUB';
      var crumb = document.querySelector('[data-com-breadcrumb-title]');
      if (crumb) crumb.textContent = discussion.title;

      var card = make('article', 'com-card com-detail-card');

      // Kicker: tag & thời gian
      var kicker = make('div', 'com-detail-kicker');
      var tagBadge = make('span', 'com-discussion-tag', '#' + (discussion.tag || 'general'));
      var timeNote = make('span', '', ' · Đăng ' + app.relativeTime(discussion.created_at));
      kicker.append(tagBadge, timeNote);
      card.appendChild(kicker);

      // Tiêu đề
      card.appendChild(make('h1', '', discussion.title));

      // Thông tin tác giả + Nút xóa thảo luận (nếu có quyền)
      var authorSection = make('div', 'com-detail-author');
      var authorAvatar = makeAvatar(discussion.author);
      authorSection.appendChild(authorAvatar);

      var authorCopy = make('div', 'com-detail-author-copy');
      var aName = (discussion.author && (discussion.author.full_name || discussion.author.username)) || 'Thành viên';
      var aRole = (discussion.author && discussion.author.role) ? (discussion.author.role.charAt(0).toUpperCase() + discussion.author.role.slice(1)) : 'Member';
      authorCopy.append(make('strong', '', aName), make('span', '', aRole));
      authorSection.appendChild(authorCopy);

      // Phân quyền xóa thảo luận: Tác giả HOẶC Admin/Owner
      var canDeleteDiscussion = user && (Number(user.id) === Number(discussion.author.id) || user.role === 'admin' || user.role === 'owner');
      if (canDeleteDiscussion) {
        var delDiscBtn = make('button', 'com-btn-delete-discussion', '🗑️ Xóa thảo luận');
        delDiscBtn.type = 'button';
        delDiscBtn.style.marginLeft = 'auto';
        delDiscBtn.addEventListener('click', async function () {
          if (!window.confirm('Bạn có chắc chắn muốn xóa cuộc thảo luận này không? Tất cả câu trả lời cũng sẽ bị xóa.')) {
            return;
          }
          delDiscBtn.disabled = true;
          try {
            var delRes = await app.apiFetch('/api/community/discussions/' + discussion.id, {
              method: 'DELETE'
            });
            if (delRes.success) {
              app.showToast('Đã xóa cuộc thảo luận thành công!');
              setTimeout(function () {
                window.location.href = 'community-discussions.html';
              }, 600);
            }
          } catch (err) {
            delDiscBtn.disabled = false;
          }
        });
        authorSection.appendChild(delDiscBtn);
      }
      card.appendChild(authorSection);

      // Nội dung chi tiết thảo luận
      var bodyEl = make('p', 'com-detail-body', discussion.body);
      card.appendChild(bodyEl);

      // Phần bình luận / phản hồi
      var commentsSection = make('section', 'com-detail-comments');
      var commentCountTitle = make('h2', '', 'Câu trả lời & Thảo luận (' + replies.length + ')');
      commentsSection.appendChild(commentCountTitle);

      var repliesList = make('div', 'com-detail-replies-list');
      if (replies.length === 0) {
        var emptyReplies = make('p', '', 'Chưa có câu trả lời nào. Hãy là người đầu tiên chia sẻ góc nhìn của bạn nhé!');
        emptyReplies.style.color = '#94a3b8';
        emptyReplies.style.fontSize = '13px';
        emptyReplies.style.padding = '8px 0';
        repliesList.appendChild(emptyReplies);
      } else {
        replies.forEach(function (reply) {
          var row = make('article', 'com-detail-comment');
          row.dataset.comReplyId = reply.id;
          row.appendChild(makeAvatar(reply.author));

          var commentCopy = make('div', 'com-detail-comment-copy');
          var rName = (reply.author && (reply.author.full_name || reply.author.username)) || 'Thành viên';

          var topRow = make('div');
          topRow.style.display = 'flex';
          topRow.style.justifyContent = 'space-between';
          topRow.style.alignItems = 'center';
          topRow.append(
            make('strong', '', rName),
            make('time', '', app.relativeTime(reply.created_at))
          );

          var replyBody = make('div', '', reply.content);
          replyBody.style.marginTop = '4px';
          replyBody.style.color = '#334155';

          commentCopy.append(topRow, replyBody);
          row.appendChild(commentCopy);

          // Quyền xóa câu trả lời: Tác giả reply HOẶC Admin/Owner
          var canDeleteReply = user && (Number(user.id) === Number(reply.user_id) || user.role === 'admin' || user.role === 'owner');
          if (canDeleteReply) {
            var delReplyBtn = make('button', 'com-reply-delete-btn', 'Xóa');
            delReplyBtn.type = 'button';
            delReplyBtn.addEventListener('click', async function () {
              if (!window.confirm('Bạn có muốn xóa phản hồi này không?')) return;
              try {
                var delRRes = await app.apiFetch('/api/community/discussions/replies/' + reply.id, {
                  method: 'DELETE'
                });
                if (delRRes.success) {
                  app.showToast('Đã xóa phản hồi!');
                  renderDiscussionDetail();
                }
              } catch (err) {
                // apiFetch đã hiển thị toast
              }
            });
            row.appendChild(delReplyBtn);
          }

          repliesList.appendChild(row);
        });
      }
      commentsSection.appendChild(repliesList);

      // Form gửi câu trả lời mới
      var replyForm = make('form', 'com-detail-reply');
      replyForm.style.marginTop = '16px';
      replyForm.style.display = 'flex';
      replyForm.style.gap = '10px';
      replyForm.style.alignItems = 'center';

      replyForm.appendChild(makeAvatar(user));

      var replyInput = make('input');
      replyInput.type = 'text';
      replyInput.name = 'content';
      replyInput.maxLength = 1000;
      replyInput.placeholder = 'Viết câu trả lời hoặc thảo luận...';
      replyInput.setAttribute('aria-label', 'Viết câu trả lời');
      replyInput.required = true;
      replyInput.style.flex = '1';
      replyInput.style.padding = '10px 14px';
      replyInput.style.border = '1px solid #cbd5e1';
      replyInput.style.borderRadius = '8px';
      replyInput.style.fontSize = '13px';

      var replySubmit = make('button', 'com-comment-submit', 'Gửi');
      replySubmit.type = 'submit';

      replyForm.append(replyInput, replySubmit);

      replyForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        var content = replyInput.value.trim();
        if (!content) return;

        replySubmit.disabled = true;
        replySubmit.textContent = '...';

        try {
          var postReplyRes = await app.apiFetch('/api/community/discussions/' + discussion.id + '/replies', {
            method: 'POST',
            body: { content: content }
          });

          if (postReplyRes.success) {
            replyInput.value = '';
            app.showToast('Phản hồi đã được đăng!');
            renderDiscussionDetail();
          }
        } catch (err) {
          // apiFetch đã hiển thị toast
        } finally {
          replySubmit.disabled = false;
          replySubmit.textContent = 'Gửi';
        }
      });

      commentsSection.appendChild(replyForm);
      card.appendChild(commentsSection);
      target.appendChild(card);

      // Tải Related discussions ở Aside
      loadRelatedDiscussions(discussion.id);

    } catch (err) {
      target.replaceChildren();
      target.appendChild(make('p', 'com-discussion-empty', 'Không tìm thấy cuộc thảo luận này hoặc đã bị xóa.'));
    }
  }

  // Tải danh sách thảo luận liên quan cho sidebar chi tiết
  async function loadRelatedDiscussions(currentId) {
    var related = document.querySelector('[data-com-related]');
    if (!related) return;

    try {
      var data = await app.apiFetch('/api/community/discussions?limit=5');
      related.replaceChildren();

      var items = (data.discussions || []).filter(function (d) {
        return String(d.id) !== String(currentId);
      }).slice(0, 3);

      if (items.length === 0) {
        var empty = make('p', '', 'Chưa có thảo luận liên quan');
        empty.style.color = '#94a3b8';
        empty.style.fontSize = '12px';
        related.appendChild(empty);
        return;
      }

      items.forEach(function (item) {
        var link = make('a', 'com-related-link');
        link.href = 'discussion-detail.html?id=' + encodeURIComponent(item.id);
        link.append(
          make('strong', '', item.title),
          make('span', '', (item.replyCount || 0) + ' replies · ' + app.relativeTime(item.created_at))
        );
        related.appendChild(link);
      });
    } catch (err) {
      console.error('Lỗi loadRelatedDiscussions:', err);
    }
  }

  // ==========================================
  // 4. TRANG TÌM KIẾM (community-search.html)
  // ==========================================
  var searchState = {
    category: 'all',
    query: ''
  };

  async function performSearch(query, category) {
    var list = document.querySelector('[data-com-search-results]');
    if (!list) return;

    var input = document.querySelector('#com-search-query');
    var title = document.querySelector('[data-com-results-title]');
    var empty = document.querySelector('[data-com-no-results]');

    if (input && input.value !== query) {
      input.value = query;
    }

    var normalized = (query || '').trim();
    searchState.query = normalized;
    searchState.category = category;

    if (!normalized) {
      if (title) title.textContent = 'Popular searches / Trending';
      list.replaceChildren();
      if (empty) empty.hidden = true;
      list.hidden = false;

      // Nạp trending topics khi chưa nhập từ khóa
      try {
        var trendData = await app.apiFetch('/api/community/trending');
        var trends = trendData.trending || [];
        if (trends.length === 0) {
          list.appendChild(make('p', 'com-discussion-empty', 'Chưa có xu hướng tìm kiếm nào.'));
        } else {
          trends.forEach(function (topic) {
            var row = make('a', 'com-search-result');
            row.href = '/pages/community/community-feed.html?tag=' + encodeURIComponent(topic.tag);
            row.appendChild(make('span', 'com-result-icon', '#'));
            var copy = make('span', 'com-result-copy');
            copy.append(make('strong', '', '#' + topic.tag), make('span', '', topic.count + ' bài viết'));
            row.append(copy, make('span', 'com-result-type', 'Topic'));
            list.appendChild(row);
          });
        }
      } catch (e) {}
      return;
    }

    if (title) title.textContent = 'Kết quả tìm kiếm cho “' + normalized + '”';
    list.replaceChildren();
    var loading = make('p', 'com-discussion-empty', 'Đang tìm kiếm...');
    list.appendChild(loading);

    try {
      var res = await app.apiFetch('/api/community/search?q=' + encodeURIComponent(normalized));
      list.replaceChildren();

      var results = res.results || { members: [], groups: [], discussions: [], topics: [] };
      var allItems = [];

      // Phân loại kết quả
      (results.members || []).forEach(function (m) {
        allItems.push({
          type: 'members',
          title: m.name || m.username,
          detail: (m.role ? m.role.toUpperCase() : 'MEMBER') + (m.bio ? ' · ' + m.bio : ''),
          url: '#',
          raw: m
        });
      });

      (results.groups || []).forEach(function (g) {
        allItems.push({
          type: 'groups',
          title: g.name,
          detail: (g.memberCount || 0) + ' thành viên' + (g.description ? ' · ' + g.description : ''),
          url: 'community-groups.html?id=' + g.id,
          raw: g
        });
      });

      (results.discussions || []).forEach(function (d) {
        allItems.push({
          type: 'discussions',
          title: d.title,
          detail: (d.replyCount || 0) + ' replies · ' + (d.author_name || 'Thành viên'),
          url: 'discussion-detail.html?id=' + d.id,
          raw: d
        });
      });

      (results.topics || []).forEach(function (t) {
        allItems.push({
          type: 'topics',
          title: '#' + t.tag,
          detail: t.count + ' bài viết liên quan',
          url: 'community-feed.html?tag=' + encodeURIComponent(t.tag),
          raw: t
        });
      });

      var visibleItems = category === 'all' ? allItems : allItems.filter(function (it) {
        return it.type === category;
      });

      if (visibleItems.length === 0) {
        if (empty) empty.hidden = false;
        list.hidden = true;
      } else {
        if (empty) empty.hidden = true;
        list.hidden = false;

        visibleItems.forEach(function (item) {
          var link = make('a', 'com-search-result');
          link.href = item.url;

          if (item.type === 'members') {
            link.appendChild(makeAvatar(item.raw));
          } else if (item.type === 'discussions') {
            link.appendChild(make('span', 'com-result-icon', '▣'));
          } else if (item.type === 'groups') {
            link.appendChild(make('span', 'com-result-icon', '♧'));
          } else {
            link.appendChild(make('span', 'com-result-icon', '#'));
          }

          var copy = make('span', 'com-result-copy');
          copy.append(make('strong', '', item.title), make('span', '', item.detail));

          var typeBadge = make('span', 'com-result-type', item.type.toUpperCase());
          link.append(copy, typeBadge);
          list.appendChild(link);
        });
      }

    } catch (err) {
      list.replaceChildren();
      list.appendChild(make('p', 'com-discussion-empty', 'Lỗi khi tìm kiếm dữ liệu.'));
    }
  }

  function initSearchPage() {
    var form = document.querySelector('[data-com-search-form]');
    if (!form) return;

    var input = form.elements.q;
    input.value = pageQuery;

    var debounceSearch;
    input.addEventListener('input', function () {
      clearTimeout(debounceSearch);
      debounceSearch = setTimeout(function () {
        performSearch(input.value, searchState.category);
      }, 300);
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      clearTimeout(debounceSearch);
      performSearch(input.value, searchState.category);
    });

    document.querySelectorAll('[data-com-result-filter]').forEach(function (button) {
      button.addEventListener('click', function () {
        searchState.category = button.dataset.comResultFilter;
        document.querySelectorAll('[data-com-result-filter]').forEach(function (tab) {
          tab.classList.toggle('is-active', tab === button);
          tab.setAttribute('aria-selected', String(tab === button));
        });
        performSearch(input.value, searchState.category);
      });
    });

    performSearch(pageQuery, 'all');
  }

  // ==========================================
  // 5. COPY LINK TO CLIPBOARD DÙNG CHUNG
  // ==========================================
  document.addEventListener('click', function (event) {
    if (event.target.closest('[data-com-copy-link]')) {
      var url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          app.showToast('Đã sao chép liên kết vào bộ nhớ tạm!');
        }).catch(function () {
          app.showToast('Liên kết: ' + url);
        });
      } else {
        app.showToast('Liên kết: ' + url);
      }
    }
  });

  // Khởi tạo các trang tương ứng
  initDiscussionsPage();
  renderDiscussionDetail();
  initSearchPage();

}());
