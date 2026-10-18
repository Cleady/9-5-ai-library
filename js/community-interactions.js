/* Xử lý tương tác bài viết: Menu bài viết (Sửa/Xóa/Copy link), Like, Comment đầy đủ (có xóa comment), Poll Vote, Lọc Hashtag. */
(function () {
  'use strict';

  var app = window.Lib95 && window.Lib95.community;
  if (!app) return;
  var make = app.makeElement;

  // Đóng mọi dropdown menu bài viết đang mở
  function closeAllDropdowns() {
    document.querySelectorAll('.com-post-dropdown').forEach(function (el) {
      el.remove();
    });
  }

  // Helper render một item bình luận kèm nút Xóa (nếu có quyền)
  function renderCommentItem(comment) {
    var user = app.getCurrentUser();
    var item = make('div', 'com-comment-item');
    item.dataset.comCommentId = comment.id;
    item.style.padding = '8px 0';
    item.style.fontSize = '13px';
    item.style.borderBottom = '1px solid rgba(226, 232, 240, 0.6)';
    item.style.display = 'flex';
    item.style.alignItems = 'flex-start';
    item.style.justifyContent = 'space-between';

    var leftWrap = make('div');
    leftWrap.style.flex = '1';

    var authorName = (comment.author && (comment.author.full_name || comment.author.username)) || 'Thành viên';
    var authorBold = make('strong', '', authorName + ': ');
    authorBold.style.color = '#1e293b';

    var bodySpan = make('span', '', comment.content);
    bodySpan.style.color = '#334155';

    var timeSpan = make('span', '', ' · ' + app.relativeTime(comment.created_at));
    timeSpan.style.fontSize = '11px';
    timeSpan.style.color = '#94a3b8';

    leftWrap.append(authorBold, bodySpan, timeSpan);
    item.appendChild(leftWrap);

    // Quyền xóa bình luận: Tác giả bình luận HOẶC Admin/Owner
    var canDelete = user && (user.id === comment.user_id || user.role === 'admin' || user.role === 'owner');
    if (canDelete) {
      var delBtn = make('button', 'com-comment-delete-btn', 'Xóa');
      delBtn.type = 'button';
      delBtn.dataset.comDeleteComment = comment.id;
      delBtn.dataset.comPostParent = comment.post_id;
      item.appendChild(delBtn);
    } else if (user && user.id !== comment.user_id) {
      var repCommentBtn = make('button', 'com-comment-report-btn', '🚩 Báo cáo');
      repCommentBtn.type = 'button';
      repCommentBtn.title = 'Báo cáo bình luận';
      repCommentBtn.style.background = 'transparent';
      repCommentBtn.style.border = 'none';
      repCommentBtn.style.cursor = 'pointer';
      repCommentBtn.style.fontSize = '11px';
      repCommentBtn.style.color = '#ef4444';
      repCommentBtn.style.opacity = '0.7';
      repCommentBtn.dataset.comReport = 'true';
      repCommentBtn.dataset.comReportType = 'comment';
      repCommentBtn.dataset.comReportId = comment.id;
      repCommentBtn.dataset.comReportAuthor = comment.user_id;
      repCommentBtn.dataset.comReportPreview = comment.content;
      item.appendChild(repCommentBtn);
    }

    return item;
  }

  // Tải danh sách bình luận đầy đủ của bài viết
  async function loadComments(postId) {
    var container = document.querySelector('[data-com-comment-list="' + postId + '"]');
    if (!container) return;

    try {
      container.replaceChildren();
      var loading = make('div', '', 'Đang tải bình luận...');
      loading.style.fontSize = '12px';
      loading.style.color = '#94a3b8';
      loading.style.padding = '8px 0';
      container.appendChild(loading);

      var res = await app.apiFetch('/api/community/posts/' + postId + '/comments');
      container.replaceChildren();

      var comments = res.comments || [];
      if (comments.length === 0) {
        var empty = make('div', '', 'Chưa có bình luận nào. Hãy là người đầu tiên bình luận!');
        empty.style.fontSize = '12px';
        empty.style.color = '#94a3b8';
        empty.style.padding = '8px 0';
        container.appendChild(empty);
        return;
      }

      comments.forEach(function (c) {
        container.appendChild(renderCommentItem(c));
      });
    } catch (err) {
      console.error('Lỗi loadComments:', err);
    }
  }

  // Bắt sự kiện bàn phím Esc để đóng menu dropdown
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAllDropdowns();
    }
  });

  // 1. Sự kiện CLICK trên toàn trang
  document.addEventListener('click', async function (event) {

    // === A. XỬ LÝ MENU "⋯" (DROPDOWN TÙY CHỌN BÀI VIẾT) ===
    var menuBtn = event.target.closest('[data-com-post-menu]');
    if (menuBtn) {
      var postId = menuBtn.dataset.comPostMenu;
      var header = menuBtn.closest('.com-post-header');

      // Nếu menu của chính nút này đang mở thì đóng lại
      var existingMenu = header.querySelector('.com-post-dropdown');
      if (existingMenu) {
        existingMenu.remove();
        return;
      }

      closeAllDropdowns();

      var post = app.state.posts.find(function (p) { return String(p.id) === String(postId); });
      var user = app.getCurrentUser();

      var dropdown = make('div', 'com-post-dropdown');

      var isAuthor = user && post && (Number(user.id) === Number(post.user_id));
      var isAdmin = user && (user.role === 'admin' || user.role === 'owner');

      if (isAuthor) {
        var editBtn = make('button', '', '✏️ Chỉnh sửa bài viết');
        editBtn.type = 'button';
        editBtn.dataset.comEditPost = postId;
        dropdown.appendChild(editBtn);

        var delBtn = make('button', 'com-dropdown-danger', '🗑️ Xóa bài viết');
        delBtn.type = 'button';
        delBtn.dataset.comDeletePost = postId;
        dropdown.appendChild(delBtn);
      } else if (isAdmin) {
        var adminDelBtn = make('button', 'com-dropdown-danger', '🗑️ Xóa bài viết (Quản trị)');
        adminDelBtn.type = 'button';
        adminDelBtn.dataset.comDeletePost = postId;
        dropdown.appendChild(adminDelBtn);
      }

      var copyLinkBtn = make('button', '', '↗️ Sao chép liên kết');
      copyLinkBtn.type = 'button';
      copyLinkBtn.dataset.comShare = postId;
      dropdown.appendChild(copyLinkBtn);

      if (!isAuthor) {
        var reportBtn = make('button', '', '🚩 Báo cáo vi phạm');
        reportBtn.type = 'button';
        reportBtn.dataset.comReport = 'true';
        reportBtn.dataset.comReportType = 'post';
        reportBtn.dataset.comReportId = postId;
        reportBtn.dataset.comReportAuthor = post ? post.user_id : '';
        reportBtn.dataset.comReportPreview = post ? post.content : '';
        dropdown.appendChild(reportBtn);
      }

      header.appendChild(dropdown);
      return;
    }

    // Đóng dropdown nếu click ra ngoài
    if (!event.target.closest('.com-post-dropdown')) {
      closeAllDropdowns();
    }

    // === B. XỬ LÝ SỬA BÀI VIẾT (EDIT POST) ===
    var editBtnClick = event.target.closest('[data-com-edit-post]');
    if (editBtnClick) {
      var ePostId = editBtnClick.dataset.comEditPost;
      closeAllDropdowns();

      var postCard = document.querySelector('[data-com-post-id="' + ePostId + '"]');
      if (!postCard) return;

      var contentEl = postCard.querySelector('[data-com-post-content="' + ePostId + '"]');
      var editBox = postCard.querySelector('[data-com-edit-box="' + ePostId + '"]');
      if (!contentEl || !editBox) return;

      contentEl.hidden = true;
      editBox.hidden = false;
      editBox.replaceChildren();

      var textarea = document.createElement('textarea');
      textarea.value = contentEl.textContent;
      textarea.maxLength = 2000;

      var actionsRow = make('div', 'com-post-edit-actions');

      var cancelBtn = make('button', 'com-button com-button--soft', 'Hủy');
      cancelBtn.type = 'button';
      cancelBtn.addEventListener('click', function () {
        editBox.hidden = true;
        contentEl.hidden = false;
      });

      var saveBtn = make('button', 'com-button com-button--primary', 'Lưu thay đổi');
      saveBtn.type = 'button';
      saveBtn.addEventListener('click', async function () {
        var newBody = textarea.value.trim();
        if (!newBody) {
          app.showToast('Nội dung bài viết không được để trống');
          return;
        }

        saveBtn.disabled = true;
        saveBtn.textContent = 'Đang lưu...';

        try {
          var updateRes = await app.apiFetch('/api/community/posts/' + ePostId, {
            method: 'PUT',
            body: { content: newBody }
          });

          if (updateRes.success) {
            contentEl.replaceChildren();
            if (typeof app.renderContentWithHashtags === 'function') {
              app.renderContentWithHashtags(contentEl, newBody);
            } else {
              contentEl.textContent = newBody;
            }
            editBox.hidden = true;
            contentEl.hidden = false;
            app.showToast('Cập nhật bài viết thành công!');

            // Cập nhật lại post trong state
            var pObj = app.state.posts.find(function (p) { return String(p.id) === String(ePostId); });
            if (pObj) {
              pObj.content = newBody;
              if (updateRes.tags) pObj.tags = updateRes.tags;
            }
          }
        } catch (err) {
          // Đã có toast
        } finally {
          saveBtn.disabled = false;
          saveBtn.textContent = 'Lưu thay đổi';
        }
      });

      actionsRow.append(cancelBtn, saveBtn);
      editBox.append(textarea, actionsRow);
      textarea.focus();
      return;
    }

    // === C. XỬ LÝ XÓA BÀI VIẾT (DELETE POST) ===
    var delBtnClick = event.target.closest('[data-com-delete-post]');
    if (delBtnClick) {
      var dPostId = delBtnClick.dataset.comDeletePost;
      closeAllDropdowns();

      if (!window.confirm('Bạn có chắc chắn muốn xóa bài viết này không? Hành động này không thể hoàn tác.')) {
        return;
      }

      try {
        var delRes = await app.apiFetch('/api/community/posts/' + dPostId, {
          method: 'DELETE'
        });

        if (delRes.success) {
          var cardToRemove = document.querySelector('[data-com-post-id="' + dPostId + '"]');
          if (cardToRemove) {
            cardToRemove.remove();
          }
          app.state.posts = app.state.posts.filter(function (p) { return String(p.id) !== String(dPostId); });
          app.showToast('Đã xóa bài viết thành công!');
        }
      } catch (err) {
        // Đã có toast
      }
      return;
    }

    // === D. XỬ LÝ XÓA BÌNH LUẬN (DELETE COMMENT) ===
    var delCommentBtn = event.target.closest('[data-com-delete-comment]');
    if (delCommentBtn) {
      var commId = delCommentBtn.dataset.comDeleteComment;
      var parentPostId = delCommentBtn.dataset.comPostParent;

      if (!window.confirm('Bạn có muốn xóa bình luận này không?')) {
        return;
      }

      try {
        var delCRes = await app.apiFetch('/api/community/comments/' + commId, {
          method: 'DELETE'
        });

        if (delCRes.success) {
          var commentRow = document.querySelector('[data-com-comment-id="' + commId + '"]');
          if (commentRow) {
            commentRow.remove();
          }

          // Giảm số lượng comment trên card
          var countEl = document.querySelector('[data-com-comment-count="' + parentPostId + '"]');
          if (countEl) {
            var curr = parseInt(countEl.textContent, 10) || 1;
            countEl.textContent = Math.max(0, curr - 1) + ' comments';
          }
          app.showToast('Đã xóa bình luận!');
        }
      } catch (err) {
        // Đã có toast
      }
      return;
    }

    // === E. XỬ LÝ LIKE ===
    var likeButton = event.target.closest('[data-com-like]');
    if (likeButton) {
      var lPostId = likeButton.dataset.comLike;
      likeButton.disabled = true;

      try {
        var res = await app.apiFetch('/api/community/posts/' + lPostId + '/like', {
          method: 'POST'
        });

        if (res.success) {
          likeButton.setAttribute('aria-pressed', String(res.liked));
          if (res.liked) {
            likeButton.classList.add('is-liked');
          } else {
            likeButton.classList.remove('is-liked');
          }

          var lCountEl = document.querySelector('[data-com-like-count="' + lPostId + '"]');
          if (lCountEl) {
            lCountEl.textContent = '♥ ' + res.likeCount + ' likes';
          }
        }
      } catch (err) {
        // Đã có toast
      } finally {
        likeButton.disabled = false;
      }
      return;
    }

    // === F. XỬ LÝ ĐÓNG / MỞ BÌNH LUẬN ===
    var toggleButton = event.target.closest('[data-com-comment-toggle]');
    if (toggleButton) {
      var cPostId = toggleButton.dataset.comCommentToggle;
      var form = document.querySelector('[data-com-comment-form="' + cPostId + '"]');
      if (form) {
        form.classList.toggle('is-open');
        if (form.classList.contains('is-open')) {
          form.elements.comment.focus();
          loadComments(cPostId);
        }
      }
      return;
    }

    // === G. XỬ LÝ SHARE (COPY LINK BÀI VIẾT) ===
    var shareButton = event.target.closest('[data-com-share]');
    if (shareButton) {
      closeAllDropdowns();
      var sPostId = shareButton.dataset.comShare;
      var url = window.location.origin + window.location.pathname + '#' + encodeURIComponent(sPostId);

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          app.showToast('Đã sao chép liên kết bài viết!');
        }).catch(function () {
          app.showToast('Liên kết bài viết: ' + url);
        });
      } else {
        app.showToast('Liên kết bài viết: ' + url);
      }
      return;
    }

    // === H. XỬ LÝ BÌNH CHỌN (POLL VOTE) ===
    var pollBtn = event.target.closest('[data-com-poll-vote]');
    if (pollBtn && !pollBtn.disabled) {
      var pPostId = pollBtn.dataset.comPollVote;
      var optId = pollBtn.dataset.comPollOption;

      try {
        var vRes = await app.apiFetch('/api/community/posts/' + pPostId + '/vote', {
          method: 'POST',
          body: { option_id: optId }
        });

        if (vRes.success) {
          app.showToast('Bình chọn thành công!');
          app.loadFeed(1, false);
        }
      } catch (err) {
        // Đã có toast
      }
      return;
    }

    // === I. XỬ LÝ NÚT TẢI THÊM (LOAD MORE) ===
    var loadMoreBtn = event.target.closest('[data-com-load-more]');
    if (loadMoreBtn) {
      loadMoreBtn.disabled = true;
      loadMoreBtn.textContent = 'Đang tải...';
      app.state.page += 1;
      await app.loadFeed(app.state.page, true);
      return;
    }

    // === J. XỬ LÝ LỌC FEED THEO HASHTAG TRỰC TIẾP TRÊN TRANG ===
    var tagBtn = event.target.closest('[data-com-tag-click]');
    if (tagBtn) {
      var tag = tagBtn.dataset.comTagClick;
      if (tag) {
        app.state.currentTag = tag;
        app.loadFeed(1, false, tag);
      }
      return;
    }

    // === K. XỬ LÝ BỎ LỌC HASHTAG ===
    var clearTagBtn = event.target.closest('[data-com-clear-tag]');
    if (clearTagBtn) {
      app.state.currentTag = null;
      app.loadFeed(1, false, null);
      return;
    }
  });

  // 2. Sự kiện SUBMIT BÌNH LUẬN (Gửi comment lên API)
  document.addEventListener('submit', async function (event) {
    var form = event.target.closest('[data-com-comment-form]');
    if (!form) return;

    event.preventDefault();
    var postId = form.dataset.comCommentForm;
    var input = form.elements.comment;
    var body = input.value.trim();

    if (!body) return;

    var submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = '...';
    }

    try {
      var res = await app.apiFetch('/api/community/posts/' + postId + '/comments', {
        method: 'POST',
        body: { content: body }
      });

      if (res.success && res.comment) {
        input.value = '';
        app.showToast('Bình luận đã được gửi!');

        // Cập nhật số lượng comment trên bài
        var countEl = document.querySelector('[data-com-comment-count="' + postId + '"]');
        if (countEl) {
          var current = parseInt(countEl.textContent, 10) || 0;
          countEl.textContent = (current + 1) + ' comments';
        }

        // Thêm bình luận mới vào danh sách hiển thị
        var container = document.querySelector('[data-com-comment-list="' + postId + '"]');
        if (container) {
          // Xóa thông báo rỗng nếu có
          if (container.children.length === 1 && container.firstElementChild.textContent.includes('Chưa có bình luận')) {
            container.replaceChildren();
          }
          container.appendChild(renderCommentItem(res.comment));
        }
      }
    } catch (err) {
      // Đã có toast
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Gửi';
      }
    }
  });
}());
