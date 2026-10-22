/* Dựng bảng tin, khung soạn bài đầy đủ (Photo/Link/Question/Poll), và các widget bên phải từ API thật. */
(function () {
  'use strict';

  var app = window.Lib95 && window.Lib95.community;
  if (!app) return;
  var make = app.makeElement;

  // Trạng thái đính kèm của Composer
  var composerState = {
    kind: 'post',
    photoFile: null,
    linkUrl: '',
    pollOptions: ['Lựa chọn 1', 'Lựa chọn 2']
  };

  // 1. Đồng bộ thông tin người dùng đang đăng nhập vào khung Composer
  function syncComposerUser() {
    var user = app.getCurrentUser();
    var composerAvatar = document.querySelector('.com-composer .com-avatar');
    var composerInput = document.querySelector('#com-post-content');

    if (user) {
      var displayName = user.full_name || (user.username ? user.username.split('@')[0] : 'User');
      var initial = displayName.charAt(0).toUpperCase();

      if (composerAvatar) {
        if (user.avatar_url) {
          composerAvatar.style.backgroundImage = 'url(' + user.avatar_url + ')';
          composerAvatar.style.backgroundSize = 'cover';
          composerAvatar.style.backgroundPosition = 'center';
          composerAvatar.textContent = '';
        } else {
          composerAvatar.style.backgroundImage = 'none';
          composerAvatar.textContent = initial;
        }
      }

      if (composerInput) {
        composerInput.placeholder = displayName + ' ơi, bạn muốn chia sẻ điều gì với cộng đồng?';
      }
    }
  }

  // 2. Tạo phần tử Avatar an toàn cho người dùng
  function createAvatar(author, extraClass) {
    var avatar = make('span', 'com-avatar' + (extraClass ? ' ' + extraClass : ''));
    var name = (author && (author.full_name || author.username)) || 'User';
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

  // Helper: Biến các từ dạng #hashtag trong nội dung thành nút lọc an toàn (chống XSS)
  function renderContentWithHashtags(container, text) {
    if (!text) return;
    var regex = /(^|\s)#([\p{L}\p{N}_-]+)/gu;
    var lastIndex = 0;
    var match;
    while ((match = regex.exec(text)) !== null) {
      var matchIndex = match.index + match[1].length;
      if (matchIndex > lastIndex) {
        container.appendChild(document.createTextNode(text.substring(lastIndex, matchIndex)));
      }
      var tag = match[2];
      var tagBtn = make('button', 'com-tag-inline', '#' + tag);
      tagBtn.type = 'button';
      tagBtn.dataset.comTagClick = tag.toLowerCase();
      container.appendChild(tagBtn);
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      container.appendChild(document.createTextNode(text.substring(lastIndex)));
    }
  }

  // 3. Render một bài viết (Card) hoàn chỉnh
  function renderPost(post) {
    var author = post.author || { full_name: 'Thành viên', role: 'member' };
    var card = make('article', 'com-card com-post' + (post.is_pinned ? ' com-post--pinned' : ''));
    card.dataset.comPostId = post.id;

    // Nhãn Ghim bài viết lên đầu trang
    if (post.is_pinned) {
      var pinnedPill = make('div', 'com-post-pinned-pill', '📌 Pinned Announcement');
      card.appendChild(pinnedPill);
    }

    // Header tác giả
    var header = make('header', 'com-post-header');
    header.appendChild(createAvatar(author));

    var person = make('div', 'com-post-person');
    var authorName = author.full_name || (author.username ? author.username.split('@')[0] : 'Thành viên');
    var roleLabel = author.role ? (author.role.charAt(0).toUpperCase() + author.role.slice(1)) : 'Member';
    person.appendChild(make('strong', '', authorName));
    person.appendChild(make('span', '', app.relativeTime(post.created_at) + ' · ' + roleLabel));
    header.appendChild(person);

    // Nút Menu ⋯
    var menuBtn = make('button', 'com-post-menu', '⋯');
    menuBtn.type = 'button';
    menuBtn.setAttribute('aria-label', 'Tùy chọn bài viết');
    menuBtn.dataset.comPostMenu = post.id;
    header.appendChild(menuBtn);
    card.appendChild(header);

    // Nhãn nhận diện dạng bài Question (Câu hỏi)
    if (post.kind === 'question') {
      var qBadge = make('div', 'com-badge-question', '? Câu hỏi cần giải đáp');
      card.appendChild(qBadge);
    }

    // Nội dung bài viết (Chống XSS: chỉ dùng textNode hoặc makeElement)
    var contentEl = make('p', 'com-post-content');
    contentEl.dataset.comPostContent = post.id;
    renderContentWithHashtags(contentEl, post.content);
    card.appendChild(contentEl);

    // Vùng chứa form sửa bài viết (ẩn ban đầu)
    var editBox = make('div', 'com-post-edit-box');
    editBox.dataset.comEditBox = post.id;
    editBox.hidden = true;
    card.appendChild(editBox);

    // Hiển thị ảnh đính kèm (nếu có)
    if (post.media_url) {
      var mediaContainer = make('div', 'com-post-media');
      mediaContainer.style.margin = '10px 0';
      mediaContainer.style.borderRadius = '12px';
      mediaContainer.style.overflow = 'hidden';
      var img = document.createElement('img');
      img.src = post.media_url;
      img.alt = 'Hình ảnh bài viết';
      img.style.maxWidth = '100%';
      img.style.maxHeight = '420px';
      img.style.display = 'block';
      img.style.borderRadius = '10px';
      mediaContainer.appendChild(img);
      card.appendChild(mediaContainer);
    }

    // Hiển thị liên kết đính kèm (nếu có)
    if (post.link_url) {
      var linkBox = make('a', 'com-post-preview');
      linkBox.href = post.link_url;
      linkBox.target = '_blank';
      linkBox.rel = 'noopener noreferrer';
      linkBox.appendChild(make('span', 'com-preview-art', '↗'));
      var linkCopy = make('div', 'com-preview-copy');
      linkCopy.appendChild(make('strong', '', 'Liên kết tham khảo'));
      linkCopy.appendChild(make('span', '', post.link_url));
      linkBox.appendChild(linkCopy);
      card.appendChild(linkBox);
    }

    // Hiển thị Poll (nếu có)
    if (post.kind === 'poll' && post.poll && Array.isArray(post.poll.options)) {
      var pollBox = make('div', 'com-post-poll');
      pollBox.style.margin = '12px 0';
      pollBox.style.padding = '12px 14px';
      pollBox.style.background = 'rgba(238, 244, 255, 0.6)';
      pollBox.style.borderRadius = '12px';
      pollBox.style.border = '1px solid rgba(210, 226, 249, 0.8)';

      var pollTitle = make('p', '', '📊 Bình chọn (' + post.poll.totalVotes + ' lượt tham gia):');
      pollTitle.style.fontWeight = '600';
      pollTitle.style.marginBottom = '8px';
      pollTitle.style.fontSize = '13px';
      pollBox.appendChild(pollTitle);

      var hasVoted = Boolean(post.poll.myVoteOptionId);

      post.poll.options.forEach(function (opt) {
        var optRow = make('div', 'com-poll-option-row');
        optRow.style.margin = '6px 0';

        var optButton = make('button', 'com-poll-vote-btn');
        optButton.type = 'button';
        optButton.dataset.comPollVote = post.id;
        optButton.dataset.comPollOption = opt.id;
        optButton.style.width = '100%';
        optButton.style.textAlign = 'left';
        optButton.style.padding = '8px 12px';
        optButton.style.borderRadius = '8px';
        optButton.style.border = '1px solid ' + (post.poll.myVoteOptionId === opt.id ? '#1d4ed8' : '#cbd5e1');
        optButton.style.background = post.poll.myVoteOptionId === opt.id ? '#eff6ff' : '#ffffff';
        optButton.style.cursor = hasVoted ? 'default' : 'pointer';
        optButton.style.display = 'flex';
        optButton.style.justifyContent = 'space-between';
        optButton.style.alignItems = 'center';
        if (hasVoted) optButton.disabled = true;

        var optLabel = make('span', '', opt.label);
        var optPct = make('span', '', opt.voteCount + ' phiếu (' + opt.percentage + '%)');
        optPct.style.fontSize = '12px';
        optPct.style.color = '#64748b';

        optButton.append(optLabel, optPct);
        optRow.appendChild(optButton);
        pollBox.appendChild(optRow);
      });
      card.appendChild(pollBox);
    }

    // Hiển thị Hashtags dạng nút bấm lọc
    if (post.tags && post.tags.length > 0) {
      var tagsContainer = make('div', 'com-post-tags');
      post.tags.forEach(function (tag) {
        var tagBtn = make('button', 'com-tag', '#' + tag);
        tagBtn.type = 'button';
        tagBtn.dataset.comTagClick = tag;
        tagBtn.style.cursor = 'pointer';
        tagBtn.style.border = 'none';
        tagsContainer.appendChild(tagBtn);
      });
      card.appendChild(tagsContainer);
    }

    // Số liệu thống kê Like / Comment
    var stats = make('div', 'com-post-stats');
    var likeSummary = make('span', 'com-like-summary', '♥ ' + post.likeCount + ' likes');
    likeSummary.dataset.comLikeCount = post.id;
    var commentSummary = make('span', 'com-comment-summary', post.commentCount + ' comments');
    commentSummary.dataset.comCommentCount = post.id;
    stats.append(likeSummary, commentSummary);
    card.appendChild(stats);

    // Các nút hành động (Like, Comment, Share)
    var actions = make('div', 'com-post-actions');

    var likeBtn = make('button', 'com-action-button', '♥ Like');
    likeBtn.type = 'button';
    likeBtn.dataset.comLike = post.id;
    likeBtn.setAttribute('aria-pressed', String(post.likedByMe));
    if (post.likedByMe) likeBtn.classList.add('is-liked');

    var commentBtn = make('button', 'com-action-button', '▢ Comment');
    commentBtn.type = 'button';
    commentBtn.dataset.comCommentToggle = post.id;

    var shareBtn = make('button', 'com-action-button', '↗ Share');
    shareBtn.type = 'button';
    shareBtn.dataset.comShare = post.id;

    actions.append(likeBtn, commentBtn, shareBtn);
    card.appendChild(actions);

    // Khung bình luận thu gọn
    var commentForm = make('form', 'com-comment-form');
    commentForm.dataset.comCommentForm = post.id;
    var commentInput = make('input');
    commentInput.name = 'comment';
    commentInput.maxLength = 500;
    commentInput.required = true;
    commentInput.placeholder = 'Viết bình luận...';
    commentInput.setAttribute('aria-label', 'Viết bình luận');
    var commentSubmit = make('button', 'com-comment-submit', 'Gửi');
    commentSubmit.type = 'submit';
    commentForm.append(commentInput, commentSubmit);
    card.appendChild(commentForm);

    // Vùng hiển thị toàn bộ danh sách bình luận (comment preview / list)
    var commentPreview = make('div', 'com-comment-preview');
    commentPreview.dataset.comCommentList = post.id;
    card.appendChild(commentPreview);

    return card;
  }

  // 4. Tải danh sách bài viết từ Backend API (hỗ trợ lọc theo Tag)
  async function loadFeed(page, isAppend, filterTag) {
    var feedTarget = document.querySelector('[data-com-feed]');
    if (!feedTarget) return;

    if (!isAppend) {
      feedTarget.replaceChildren();
      var loadingEl = make('div', 'com-feed-loading', 'Đang tải bảng tin cộng đồng...');
      loadingEl.style.padding = '30px';
      loadingEl.style.textAlign = 'center';
      loadingEl.style.color = '#64748b';
      feedTarget.appendChild(loadingEl);
      app.state.page = 1;
      app.state.posts = [];
    }

    // Hiển thị / ẩn thanh Filter Chip
    var filterBar = document.querySelector('[data-com-filter-bar]');
    if (filterBar) {
      var currentTag = filterTag !== undefined ? filterTag : app.state.currentTag;
      if (currentTag) {
        filterBar.hidden = false;
        filterBar.style.display = 'flex';
        filterBar.replaceChildren();
        var label = make('span', '', 'Đang lọc theo chủ đề: #' + currentTag);
        label.style.fontWeight = '600';
        var clearBtn = make('button', 'com-filter-chip-clear', '✕ Bỏ lọc');
        clearBtn.type = 'button';
        clearBtn.dataset.comClearTag = 'true';
        filterBar.append(label, clearBtn);
      } else {
        filterBar.hidden = true;
        filterBar.style.display = 'none';
        filterBar.replaceChildren();
      }
    }

    try {
      app.state.loading = true;
      var activeTag = filterTag !== undefined ? filterTag : app.state.currentTag;
      var query = '?page=' + (page || 1) + '&limit=' + app.state.limit;
      if (activeTag) {
        query += '&tag=' + encodeURIComponent(activeTag);
      }

      var data = await app.apiFetch('/api/community/posts' + query);

      if (!isAppend) {
        feedTarget.replaceChildren();
      }

      // Xóa nút Load more cũ nếu có
      var oldLoadMore = document.querySelector('[data-com-load-more-container]');
      if (oldLoadMore) oldLoadMore.remove();

      var newPosts = data.posts || [];
      if (!isAppend && newPosts.length === 0) {
        var emptyText = activeTag ? 'Không tìm thấy bài viết nào gắn thẻ #' + activeTag : 'Chưa có bài viết nào trong cộng đồng. Hãy là người đầu tiên chia sẻ nhé!';
        var emptyEl = make('div', 'com-card com-feed-empty', emptyText);
        emptyEl.style.padding = '36px 20px';
        emptyEl.style.textAlign = 'center';
        emptyEl.style.color = '#64748b';
        feedTarget.appendChild(emptyEl);
        return;
      }

      newPosts.forEach(function (post) {
        app.state.posts.push(post);
        feedTarget.appendChild(renderPost(post));
      });

      // Phân trang (Load more)
      var pagination = data.pagination || {};
      app.state.hasMore = pagination.page < pagination.totalPages;

      if (app.state.hasMore) {
        var loadMoreContainer = make('div', 'com-load-more-container');
        loadMoreContainer.dataset.comLoadMoreContainer = 'true';
        loadMoreContainer.style.textAlign = 'center';
        loadMoreContainer.style.margin = '16px 0 24px';

        var loadMoreBtn = make('button', 'com-button com-button--soft', 'Tải thêm bài viết');
        loadMoreBtn.type = 'button';
        loadMoreBtn.dataset.comLoadMore = 'true';
        loadMoreBtn.style.padding = '10px 24px';
        loadMoreBtn.style.cursor = 'pointer';

        loadMoreContainer.appendChild(loadMoreBtn);
        feedTarget.appendChild(loadMoreContainer);
      } else if (app.state.posts.length > 0) {
        var endNote = make('p', '', 'Đã hiển thị tất cả bài viết');
        endNote.style.textAlign = 'center';
        endNote.style.color = '#94a3b8';
        endNote.style.fontSize = '13px';
        endNote.style.margin = '16px 0 24px';
        feedTarget.appendChild(endNote);
      }

    } catch (err) {
      if (!isAppend) {
        feedTarget.replaceChildren();
        var errEl = make('div', 'com-card', 'Không thể tải bảng tin lúc này. Vui lòng thử lại sau.');
        errEl.style.padding = '24px';
        errEl.style.textAlign = 'center';
        errEl.style.color = '#dc3545';
        feedTarget.appendChild(errEl);
      }
    } finally {
      app.state.loading = false;
    }
  }

  // 5. Cập nhật giao diện Composer Attachment khi chuyển đổi loại bài
  function renderComposerAttachment() {
    var container = document.querySelector('[data-com-composer-attachment]');
    if (!container) return;

    container.replaceChildren();

    if (composerState.kind === 'photo' && composerState.photoFile) {
      container.hidden = false;
      var wrap = make('div', 'com-photo-preview-wrap');

      var thumb = document.createElement('img');
      thumb.className = 'com-photo-preview-img';
      thumb.src = URL.createObjectURL(composerState.photoFile);

      var fileInfo = make('div');
      fileInfo.style.flex = '1';
      var fileName = make('strong', '', composerState.photoFile.name);
      fileName.style.display = 'block';
      fileName.style.fontSize = '12px';
      var fileSize = make('span', '', (composerState.photoFile.size / (1024 * 1024)).toFixed(2) + ' MB');
      fileSize.style.fontSize = '11px';
      fileSize.style.color = '#64748b';
      fileInfo.append(fileName, fileSize);

      var removeBtn = make('button', 'com-attachment-clear', '✕ Gỡ ảnh');
      removeBtn.type = 'button';
      removeBtn.addEventListener('click', function () {
        composerState.photoFile = null;
        composerState.kind = 'post';
        renderComposerAttachment();
        resetKindButtons();
      });

      wrap.append(thumb, fileInfo, removeBtn);
      container.appendChild(wrap);

    } else if (composerState.kind === 'link') {
      container.hidden = false;
      var linkRow = make('div');
      linkRow.style.display = 'flex';
      linkRow.style.gap = '8px';

      var linkInput = make('input');
      linkInput.type = 'url';
      linkInput.id = 'com-composer-link-url';
      linkInput.placeholder = 'Dán đường dẫn liên kết (bắt đầu bằng https://)...';
      linkInput.style.flex = '1';
      linkInput.style.padding = '8px 12px';
      linkInput.style.border = '1px solid #cbd5e1';
      linkInput.style.borderRadius = '8px';
      linkInput.style.fontSize = '13px';
      linkInput.value = composerState.linkUrl;
      linkInput.addEventListener('input', function () {
        composerState.linkUrl = linkInput.value;
      });

      var cancelLinkBtn = make('button', 'com-attachment-clear', '✕ Bỏ liên kết');
      cancelLinkBtn.type = 'button';
      cancelLinkBtn.addEventListener('click', function () {
        composerState.linkUrl = '';
        composerState.kind = 'post';
        renderComposerAttachment();
        resetKindButtons();
      });

      linkRow.append(linkInput, cancelLinkBtn);
      container.appendChild(linkRow);

    } else if (composerState.kind === 'question') {
      container.hidden = false;
      var qRow = make('div');
      qRow.style.display = 'flex';
      qRow.style.alignItems = 'center';
      qRow.style.justifyContent = 'space-between';
      var qNotice = make('span', '', '❓ Bạn đang tạo bài viết dạng Câu hỏi cần hỗ trợ');
      qNotice.style.fontSize = '12px';
      qNotice.style.fontWeight = '600';
      qNotice.style.color = '#92400e';

      var cancelQBtn = make('button', 'com-attachment-clear', '✕ Chuyển về bài thường');
      cancelQBtn.type = 'button';
      cancelQBtn.addEventListener('click', function () {
        composerState.kind = 'post';
        renderComposerAttachment();
        resetKindButtons();
      });

      qRow.append(qNotice, cancelQBtn);
      container.appendChild(qRow);

    } else if (composerState.kind === 'poll') {
      container.hidden = false;
      var pollWrapper = make('div');

      var pollHeader = make('div');
      pollHeader.style.display = 'flex';
      pollHeader.style.justifyContent = 'space-between';
      pollHeader.style.marginBottom = '8px';
      var pollLabel = make('strong', '', '📊 Các lựa chọn bình chọn (2 - 6 lựa chọn):');
      pollLabel.style.fontSize = '12px';
      pollLabel.style.color = '#1e3a8a';

      var cancelPollBtn = make('button', 'com-attachment-clear', '✕ Hủy bình chọn');
      cancelPollBtn.type = 'button';
      cancelPollBtn.addEventListener('click', function () {
        composerState.kind = 'post';
        composerState.pollOptions = ['Lựa chọn 1', 'Lựa chọn 2'];
        renderComposerAttachment();
        resetKindButtons();
      });
      pollHeader.append(pollLabel, cancelPollBtn);
      pollWrapper.appendChild(pollHeader);

      var optionsList = make('div');
      optionsList.id = 'com-poll-inputs-list';
      optionsList.style.display = 'flex';
      optionsList.style.flexDirection = 'column';
      optionsList.style.gap = '6px';

      composerState.pollOptions.forEach(function (optText, idx) {
        var optInputRow = make('div');
        optInputRow.style.display = 'flex';
        optInputRow.style.gap = '6px';

        var input = make('input');
        input.type = 'text';
        input.className = 'com-poll-option-input';
        input.placeholder = 'Lựa chọn ' + (idx + 1);
        input.value = optText;
        input.style.flex = '1';
        input.style.padding = '6px 10px';
        input.style.border = '1px solid #cbd5e1';
        input.style.borderRadius = '6px';
        input.style.fontSize = '13px';
        input.addEventListener('input', function () {
          composerState.pollOptions[idx] = input.value;
        });

        optInputRow.appendChild(input);

        // Nút xóa lựa chọn (nếu > 2 options)
        if (composerState.pollOptions.length > 2) {
          var delOptBtn = make('button', '', '✕');
          delOptBtn.type = 'button';
          delOptBtn.style.padding = '4px 8px';
          delOptBtn.style.border = '1px solid #cbd5e1';
          delOptBtn.style.background = '#fff';
          delOptBtn.style.borderRadius = '6px';
          delOptBtn.style.cursor = 'pointer';
          delOptBtn.addEventListener('click', function () {
            composerState.pollOptions.splice(idx, 1);
            renderComposerAttachment();
          });
          optInputRow.appendChild(delOptBtn);
        }

        optionsList.appendChild(optInputRow);
      });

      pollWrapper.appendChild(optionsList);

      // Nút thêm lựa chọn (tối đa 6)
      if (composerState.pollOptions.length < 6) {
        var addOptBtn = make('button', 'com-button com-button--soft', '+ Thêm lựa chọn');
        addOptBtn.type = 'button';
        addOptBtn.style.marginTop = '8px';
        addOptBtn.style.fontSize = '12px';
        addOptBtn.style.padding = '4px 12px';
        addOptBtn.addEventListener('click', function () {
          composerState.pollOptions.push('');
          renderComposerAttachment();
        });
        pollWrapper.appendChild(addOptBtn);
      }

      container.appendChild(pollWrapper);

    } else {
      container.hidden = true;
    }
  }

  function resetKindButtons() {
    document.querySelectorAll('[data-com-post-kind]').forEach(function (button) {
      button.setAttribute('aria-pressed', 'false');
    });
  }

  // 6. Xử lý các nút chọn loại bài viết
  document.querySelectorAll('[data-com-post-kind]').forEach(function (button) {
    button.addEventListener('click', function () {
      var kind = button.dataset.comPostKind.toLowerCase();

      if (kind === 'photo') {
        var photoInput = document.querySelector('#com-photo-input');
        if (photoInput) {
          photoInput.click();
        }
      } else {
        composerState.kind = kind;
        document.querySelectorAll('[data-com-post-kind]').forEach(function (item) {
          item.setAttribute('aria-pressed', String(item === button));
        });
        renderComposerAttachment();
      }
    });
  });

  // Lắng nghe chọn ảnh
  var photoInput = document.querySelector('#com-photo-input');
  if (photoInput) {
    photoInput.addEventListener('change', function () {
      if (photoInput.files && photoInput.files[0]) {
        composerState.photoFile = photoInput.files[0];
        composerState.kind = 'photo';
        document.querySelectorAll('[data-com-post-kind]').forEach(function (item) {
          item.setAttribute('aria-pressed', String(item.dataset.comPostKind === 'Photo'));
        });
        renderComposerAttachment();
      }
    });
  }

  // 7. Xử lý Đăng bài (Submit Composer Form) lên API thật
  var postForm = document.querySelector('[data-com-post-form]');
  if (postForm) {
    postForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      var input = postForm.elements.content;
      var body = input.value.trim();
      var message = document.querySelector('[data-com-form-message]');

      if (!body) {
        if (message) message.textContent = 'Hãy nhập nội dung trước khi đăng nhé.';
        input.focus();
        return;
      }

      var submitBtn = postForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Đang xử lý...';
      }

      try {
        var mediaUrl = null;

        // Nếu có ảnh, upload ảnh trước
        if (composerState.kind === 'photo' && composerState.photoFile) {
          var formData = new FormData();
          formData.append('image', composerState.photoFile);

          var uploadRes = await app.apiFetch('/api/community/upload-image', {
            method: 'POST',
            body: formData
          });

          if (uploadRes.success && uploadRes.url) {
            mediaUrl = uploadRes.url;
          }
        }

        var payload = {
          content: body,
          kind: composerState.kind,
          media_url: mediaUrl,
          link_url: composerState.kind === 'link' ? composerState.linkUrl.trim() : null
        };

        if (composerState.kind === 'poll') {
          var cleanOptions = composerState.pollOptions.map(function (s) { return s.trim(); }).filter(Boolean);
          if (cleanOptions.length < 2) {
            app.showToast('Vui lòng nhập tối thiểu 2 lựa chọn bình chọn');
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Post'; }
            return;
          }
          payload.poll_options = cleanOptions;
        }

        var res = await app.apiFetch('/api/community/posts', {
          method: 'POST',
          body: payload
        });

        if (res.success && res.post) {
          input.value = '';
          if (message) message.textContent = '';
          composerState.kind = 'post';
          composerState.photoFile = null;
          composerState.linkUrl = '';
          composerState.pollOptions = ['Lựa chọn 1', 'Lựa chọn 2'];
          if (photoInput) photoInput.value = '';

          resetKindButtons();
          renderComposerAttachment();

          await loadFeed(1, false);
          loadTrending();
          loadContributors();
          app.showToast('Bài viết đã được đăng lên cộng đồng!');
        }
      } catch (err) {
        // Đã có toast trong apiFetch
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Post';
        }
      }
    });
  }

  // 8. Tải Trending Topics từ Backend API
  async function loadTrending() {
    var target = document.querySelector('[data-com-trending]');
    if (!target) return;

    try {
      var data = await app.apiFetch('/api/community/trending');
      target.replaceChildren();

      var list = data.trending || [];
      if (list.length === 0) {
        var emptyLi = make('li', '', 'Chưa có chủ đề nổi bật');
        emptyLi.style.color = '#94a3b8';
        emptyLi.style.fontSize = '13px';
        emptyLi.style.padding = '6px 0';
        target.appendChild(emptyLi);
        return;
      }

      list.forEach(function (item) {
        var row = make('li');
        var link = make('button', 'com-trending-link');
        link.type = 'button';
        link.dataset.comTagClick = item.tag;
        link.style.cursor = 'pointer';
        link.append(make('span', '', '#' + item.tag), make('span', '', String(item.count)));
        row.appendChild(link);
        target.appendChild(row);
      });
    } catch (err) {
      console.error('Lỗi tải trending topics:', err);
    }
  }

  // 9. Tải Top Contributors từ Backend API
  async function loadContributors() {
    var target = document.querySelector('[data-com-contributors]');
    if (!target) return;

    try {
      var data = await app.apiFetch('/api/community/top-contributors');
      target.replaceChildren();

      var list = data.contributors || [];
      if (list.length === 0) {
        var emptyLi = make('li', '', 'Chưa có dữ liệu thành viên');
        emptyLi.style.color = '#94a3b8';
        emptyLi.style.fontSize = '13px';
        target.appendChild(emptyLi);
        return;
      }

      list.slice(0, 5).forEach(function (user) {
        var row = make('li', 'com-contributor');
        row.appendChild(createAvatar(user));
        var copy = make('div', 'com-contributor-copy');
        var nameText = user.name || (user.username ? user.username.split('@')[0] : 'Member');
        copy.append(make('strong', '', nameText), make('span', '', user.post_count + ' bài · ' + user.score + ' điểm'));
        row.appendChild(copy);
        target.appendChild(row);
      });
    } catch (err) {
      console.error('Lỗi tải top contributors:', err);
    }
  }

  // Khởi chạy khi nạp trang
  app.state.currentTag = null;
  syncComposerUser();
  loadFeed(1, false);
  loadTrending();
  loadContributors();

  app.loadFeed = loadFeed;
  app.renderPost = renderPost;
  app.renderContentWithHashtags = renderContentWithHashtags;
  app.loadTrending = loadTrending;
  app.loadContributors = loadContributors;
}());
