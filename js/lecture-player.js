/**
 * =====================================================================
 * lecture-player.js — Logic cho trang chi tiết bài giảng (Player, Tabs)
 * =====================================================================
 * File này xử lý:
 * - Trình phát video tùy chỉnh (play/pause, seek, speed, fullscreen)
 * - Lưu tiến độ xem, tự động đánh dấu completed khi xem >= 90%
 * - Chuyển đổi các tabs (Overview, Resources, Notes) đồng bộ với URL hash
 * - Cập nhật sidebar (Your progress, Next lecture, Course materials)
 * - Mini player: tự hiện khi cuộn qua video
 *
 * Được dùng bởi: lecture.html
 * =====================================================================
 */
;(function () {
  'use strict';

  window.Lib95 = window.Lib95 || {};
  window.Lib95.lectures = window.Lib95.lectures || {};

  var core = window.Lib95.lectures.core;

  /* ====== QUẢN LÝ TABS ====== */
  function initTabs() {
    var tabBtns = document.querySelectorAll('.lec-tab');
    var tabPanels = document.querySelectorAll('.lec-tabpanel');

    function switchTab(targetId) {
      /* Cập nhật ARIA và class cho nút */
      tabBtns.forEach(function (btn) {
        var isSelected = btn.getAttribute('aria-controls') === targetId;
        btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      });

      /* Ẩn/hiện panel */
      tabPanels.forEach(function (panel) {
        panel.hidden = panel.id !== targetId;
      });
    }

    /* Đọc hash từ URL khi load */
    var hash = window.location.hash.substring(1);
    var validTabs = ['overview', 'resources', 'notes', 'discussion'];
    if (validTabs.indexOf(hash) !== -1) {
      switchTab('tab-' + hash);
    } else {
      switchTab('tab-overview'); /* Mặc định */
    }

    /* Gắn sự kiện click */
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var targetId = btn.getAttribute('aria-controls');
        switchTab(targetId);
        /* Cập nhật URL hash không reload */
        window.history.replaceState(null, null, '#' + targetId.replace('tab-', ''));
      });
    });
  }

  /* ====== TIỆN ÍCH CHUẨN HÓA URL VIDEO (TRÁNH DOUBLE ENCODE) ====== */
  function formatVideoUrl(rawUrl) {
    if (!rawUrl || typeof rawUrl !== 'string') return '';
    rawUrl = rawUrl.trim();
    var prefix = '';
    var pathPart = rawUrl;
    if (/^https?:\/\//i.test(rawUrl)) {
      var match = rawUrl.match(/^(https?:\/\/[^/]+)(\/.*)?$/);
      if (match) {
        prefix = match[1];
        pathPart = match[2] || '';
      }
    }
    var segments = pathPart.split('/');
    var encodedSegments = segments.map(function (seg) {
      if (!seg) return seg;
      try {
        var decoded = decodeURIComponent(seg);
        return encodeURIComponent(decoded);
      } catch (e) {
        return encodeURI(seg);
      }
    });
    return prefix + encodedSegments.join('/');
  }

  /* Biến trạng thái khởi tạo player & bài giảng hiện tại */
  var isPlayerInitialized = false;
  var currentPlayingLecture = null;
  var ytPlayerInstance = null;
  var ytProgressInterval = null;

  function cleanupYouTubePlayer() {
    if (ytProgressInterval) {
      clearInterval(ytProgressInterval);
      ytProgressInterval = null;
    }
    if (ytPlayerInstance && typeof ytPlayerInstance.destroy === 'function') {
      try {
        ytPlayerInstance.destroy();
      } catch (e) {}
      ytPlayerInstance = null;
    }
    var ytContainer = document.getElementById('lec-youtube-player');
    if (ytContainer) {
      ytContainer.innerHTML = '';
      ytContainer.style.display = 'none';
    }
    var ytError = document.getElementById('lec-youtube-error');
    if (ytError) {
      ytError.style.display = 'none';
    }
  }

  function initYouTubePlayer(lecture) {
    var wrapper = document.getElementById('lec-player-wrapper');
    var video = document.getElementById('lec-video');
    var ytContainer = document.getElementById('lec-youtube-player');
    var ytError = document.getElementById('lec-youtube-error');
    var ytErrorLink = document.getElementById('lec-yt-error-link');
    var ytErrorTitle = document.getElementById('lec-yt-error-title');
    var ytErrorDesc = document.getElementById('lec-yt-error-desc');

    if (video) {
      video.pause();
      video.style.display = 'none';
    }

    if (wrapper) {
      wrapper.classList.add('is-youtube');
    }

    if (ytError) ytError.style.display = 'none';
    cleanupYouTubePlayer();
    if (ytContainer) ytContainer.style.display = 'block';

    var ytId = lecture.youtubeId;
    if (!ytId && window.Lib95 && window.Lib95.youtube) {
      ytId = window.Lib95.youtube.extractYouTubeId(lecture.videoUrl);
    }

    if (!ytId) {
      if (ytContainer) ytContainer.style.display = 'none';
      if (ytError) {
        if (ytErrorTitle) ytErrorTitle.textContent = 'Link video YouTube không hợp lệ';
        if (ytErrorDesc) ytErrorDesc.textContent = 'Không thể trích xuất ID video từ đường link bài giảng.';
        if (ytErrorLink) ytErrorLink.style.display = 'none';
        ytError.style.display = 'flex';
      }
      return;
    }

    if (ytErrorLink) {
      ytErrorLink.href = 'https://www.youtube.com/watch?v=' + ytId;
      ytErrorLink.style.display = 'inline-block';
    }

    if (!window.Lib95 || !window.Lib95.youtube) {
      console.warn('YouTube utils library not loaded');
      return;
    }

    window.Lib95.youtube.loadApi().then(function (YT) {
      ytPlayerInstance = new YT.Player('lec-youtube-player', {
        height: '100%',
        width: '100%',
        videoId: ytId,
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
          autoplay: 0,
          controls: 1,
          fs: 1,
          playsinline: 1,
          rel: 0,
          modestbranding: 1
        },
        events: {
          onReady: function () {
            // Restore saved progress
            var savedPct = core.storageGet('watch:' + lecture.id);
            if (savedPct && typeof savedPct === 'number' && savedPct > 0 && savedPct < 90) {
              try {
                var dur = ytPlayerInstance.getDuration();
                if (dur && dur > 0) {
                  var seekSec = Math.round((savedPct / 100) * dur);
                  ytPlayerInstance.seekTo(seekSec, true);
                }
              } catch (e) {}
            }
          },
          onStateChange: function (event) {
            if (event.data === YT.PlayerState.PLAYING) {
              if (!ytProgressInterval) {
                ytProgressInterval = setInterval(function () {
                  if (!ytPlayerInstance || typeof ytPlayerInstance.getCurrentTime !== 'function') return;
                  try {
                    var cur = ytPlayerInstance.getCurrentTime();
                    var dur = ytPlayerInstance.getDuration();
                    if (dur && dur > 0) {
                      var pct = Math.min(100, Math.round((cur / dur) * 100));
                      core.storageSet('watch:' + lecture.id, pct);
                      if (pct >= 90) {
                        core.markCompleted(lecture.id);
                        updateSidebarProgress(lecture.id);
                      }
                    }
                  } catch (e) {}
                }, 1000);
              }
            } else {
              if (ytProgressInterval) {
                clearInterval(ytProgressInterval);
                ytProgressInterval = null;
              }
              if (event.data === YT.PlayerState.ENDED) {
                core.storageSet('watch:' + lecture.id, 100);
                core.markCompleted(lecture.id);
                updateSidebarProgress(lecture.id);
              }
            }
          },
          onError: function (event) {
            if (ytContainer) ytContainer.style.display = 'none';
            if (ytError) {
              var code = event.data;
              if (code === 101 || code === 150) {
                if (ytErrorTitle) ytErrorTitle.textContent = 'Chủ sở hữu đã tắt cho phép nhúng video';
                if (ytErrorDesc) ytErrorDesc.textContent = 'Video này không cho phép phát trên các trang web bên ngoài. Vui lòng xem trực tiếp trên YouTube.';
              } else if (code === 100) {
                if (ytErrorTitle) ytErrorTitle.textContent = 'Video không tồn tại hoặc đã bị xóa';
                if (ytErrorDesc) ytErrorDesc.textContent = 'Không tìm thấy video này trên YouTube.';
              } else {
                if (ytErrorTitle) ytErrorTitle.textContent = 'Không thể phát video YouTube này';
                if (ytErrorDesc) ytErrorDesc.textContent = 'Đã xảy ra lỗi khi tải trình phát YouTube.';
              }
              ytError.style.display = 'flex';
            }
          }
        }
      });
    }).catch(function (err) {
      console.warn('Failed to load YouTube API for player:', err);
      if (ytContainer) ytContainer.style.display = 'none';
      if (ytError) ytError.style.display = 'flex';
    });
  }

  /* ====== TRÌNH PHÁT VIDEO ====== */
  function initPlayer(lecture) {
    if (!lecture) return;

    currentPlayingLecture = lecture;

    var isYoutube = (lecture.videoSource === 'youtube') || Boolean(lecture.youtubeId);

    if (isYoutube) {
      initYouTubePlayer(lecture);
      return;
    }

    // Video file: Dọn dẹp YouTube player nếu có, phục hồi chế độ HTML5 video
    cleanupYouTubePlayer();
    var wrapper = document.getElementById('lec-player-wrapper');
    if (wrapper) wrapper.classList.remove('is-youtube');
    var video = document.getElementById('lec-video');
    if (video) video.style.display = 'block';

    if (!video) return;

    var timeDisplay = document.getElementById('lec-time-display');

    /* Cập nhật nguồn video (URL-encoded an toàn, tránh double encode) */
    var rawUrl = lecture.videoUrl || lecture.video_url || '';
    var safeUrl = formatVideoUrl(rawUrl);
    var curSrc = video.src || '';
    if (safeUrl && curSrc !== safeUrl && !curSrc.endsWith(safeUrl)) {
      video.src = safeUrl;
    }

    /* Hiển thị thời lượng ban đầu nếu chưa có metadata */
    var durMin = lecture.durationMin || 15;
    if (timeDisplay && (!video.duration || isNaN(video.duration))) {
      timeDisplay.textContent = '0:00 / ' + durMin + ':00';
    }


    /* Đảm bảo event listener chỉ được gắn DUY NHẤT 1 LẦN */
    if (isPlayerInitialized) return;
    isPlayerInitialized = true;

    var playBtn = document.getElementById('lec-btn-play');
    var bigPlayBtn = document.getElementById('lec-btn-play-big');
    var overlay = document.getElementById('lec-player-overlay');
    var seek = document.getElementById('lec-seek');
    var speedBtn = document.getElementById('lec-btn-speed');
    var fullscreenBtn = document.getElementById('lec-btn-fullscreen');
    
    var miniPlayer = document.getElementById('lec-mini-player');
    var miniPlayBtn = document.getElementById('lec-mini-play');
    var miniCloseBtn = document.getElementById('lec-mini-close');
    var miniTime = document.getElementById('lec-mini-time');

    /* Lưu tiến độ với debounce */
    var saveProgress = core.debounce(function (currentTime) {
      if (!currentPlayingLecture || !video.duration) return;
      var curId = currentPlayingLecture.id;
      var percent = Math.round((currentTime / video.duration) * 100) || 0;
      core.storageSet('watch:' + curId, percent);
      
      /* Đánh dấu hoàn thành nếu xem >= 90% */
      if (percent >= 90) {
        core.markCompleted(curId);
        updateSidebarProgress(curId);
      }
    }, 1000);
    
    /* Play / Pause an toàn với Promise .catch */
    function togglePlay() {
      if (video.paused) {
        var playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(function (err) {
            console.warn('Video play interrupted or failed:', err);
          });
        }
      } else {
        video.pause();
      }
    }

    function updatePlayIcon() {
      var isPaused = video.paused;
      var playSvg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
      var pauseSvg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
      
      if (playBtn) playBtn.innerHTML = isPaused ? playSvg : pauseSvg;
      if (miniPlayBtn) miniPlayBtn.innerHTML = isPaused ? playSvg : pauseSvg;
      if (overlay) overlay.hidden = !isPaused;
    }

    if (playBtn) playBtn.addEventListener('click', togglePlay);
    if (bigPlayBtn) bigPlayBtn.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);
    video.addEventListener('play', updatePlayIcon);
    video.addEventListener('pause', updatePlayIcon);
    
    if (miniPlayBtn) miniPlayBtn.addEventListener('click', togglePlay);

    /* Format thời gian mm:ss */
    function formatTime(seconds) {
      if (isNaN(seconds)) return '0:00';
      var m = Math.floor(seconds / 60);
      var s = Math.floor(seconds % 60);
      return m + ':' + (s < 10 ? '0' : '') + s;
    }

    /* Cập nhật duration khi metadata video được tải */
    video.addEventListener('loadedmetadata', function () {
      if (video.duration && !isNaN(video.duration)) {
        var text = formatTime(video.currentTime) + ' / ' + formatTime(video.duration);
        if (timeDisplay) timeDisplay.textContent = text;
        if (miniTime) miniTime.textContent = text;
      }
    });

    /* Cập nhật seek bar và thời gian */
    video.addEventListener('timeupdate', function () {
      if (!video.duration) return;
      var curr = video.currentTime;
      var dur = video.duration;
      
      if (seek) seek.value = (curr / dur) * 100;
      var text = formatTime(curr) + ' / ' + formatTime(dur);
      if (timeDisplay) timeDisplay.textContent = text;
      if (miniTime) miniTime.textContent = text;
      
      saveProgress(curr);
    });

    /* Kéo thanh thời gian */
    if (seek) {
      seek.addEventListener('input', function () {
        if (!video.duration) return;
        var time = (seek.value / 100) * video.duration;
        video.currentTime = time;
      });
    }

    /* Đổi tốc độ */
    var speeds = [1, 1.25, 1.5, 2];
    var speedIndex = 0;
    if (speedBtn) {
      speedBtn.addEventListener('click', function () {
        speedIndex = (speedIndex + 1) % speeds.length;
        video.playbackRate = speeds[speedIndex];
        speedBtn.textContent = speeds[speedIndex] + 'x';
      });
    }

    /* Fullscreen */
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', function () {
        if (!document.fullscreenElement) {
          if (video.requestFullscreen) video.requestFullscreen();
        } else {
          if (document.exitFullscreen) document.exitFullscreen();
        }
      });
    }

    /* Phím tắt: Space, Trái, Phải */
    document.addEventListener('keydown', function (e) {
      var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea' || (document.activeElement && document.activeElement.isContentEditable)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowRight') {
        video.currentTime = Math.min(video.currentTime + 10, video.duration || 0);
      } else if (e.code === 'ArrowLeft') {
        video.currentTime = Math.max(video.currentTime - 10, 0);
      }
    });

    /* ====== MINI PLAYER ====== */
    var playerWrapper = document.getElementById('lec-player-wrapper');
    if (playerWrapper && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        var isVisible = entries[0].isIntersecting;
        if (!isVisible && !video.paused && miniPlayer) {
          miniPlayer.classList.add('lec-mini-player--visible');
        } else if (miniPlayer) {
          miniPlayer.classList.remove('lec-mini-player--visible');
        }
      }, { threshold: 0.1 });
      
      observer.observe(playerWrapper);
    }

    if (miniCloseBtn) {
      miniCloseBtn.addEventListener('click', function () {
        video.pause();
        if (miniPlayer) miniPlayer.classList.remove('lec-mini-player--visible');
      });
    }
  }

  /* ====== CẬP NHẬT SIDEBAR ====== */
  function renderSidebar(subjectId, lectureId) {
    var subjectProgress = core.getSubjectProgress(subjectId);
    
    /* 1. Your progress */
    var progCard = document.getElementById('lec-sidebar-progress');
    if (progCard) {
      progCard.innerHTML = 
        '<div class="score-ring" style="--value: ' + subjectProgress.percent + '" role="img" aria-label="' + subjectProgress.percent + '%">' +
          '<span class="score-value">' + subjectProgress.percent + '%</span>' +
        '</div>' +
        '<p class="lec-progress-text">' + subjectProgress.completed + ' / ' + subjectProgress.total + ' lectures completed</p>';
    }

    /* 2. Next lecture */
    var nextCard = document.getElementById('lec-sidebar-next');
    var nextLec = core.getNextLecture(subjectId);
    if (nextCard) {
      if (nextLec) {
        var subject = core.getSubjectById(subjectId);
        var isLocked = nextLec.status === 'locked';
        var href = isLocked ? '#' : (nextLec.type === 'quiz' ? 'quiz.html?id=' + nextLec.id : 'lecture.html?id=' + nextLec.id);
        
        nextCard.innerHTML =
          '<a href="' + href + '" class="lec-next-card-item' + (isLocked ? ' lec-row--locked' : '') + '">' +
            '<div class="lec-next-card-thumb" style="background: linear-gradient(135deg, ' + subject.gradientFrom + ', ' + subject.gradientTo + ')">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 3l14 9-14 9V3z"/></svg>' +
            '</div>' +
            '<div class="lec-next-card-info">' +
              '<h4 class="lec-next-card-title">' + nextLec.title + '</h4>' +
              '<p class="lec-next-card-meta">' + core.formatType(nextLec.type) + ' · ' + nextLec.durationMin + ' min</p>' +
            '</div>' +
          '</a>';
      } else {
        nextCard.innerHTML = '<p class="lec-progress-text">All completed!</p>';
      }
    }

    /* 3. Course materials (giới hạn 2-3 mục) */
    var matCard = document.getElementById('lec-sidebar-materials');
    var resources = core.getResources(lectureId);
    if (matCard) {
      if (resources.length > 0) {
        var html = '';
        resources.slice(0, 3).forEach(function (res) {
          var iconClass = 'lec-material-icon--' + res.type;
          var iconText = res.type.toUpperCase();
          html +=
            '<div class="lec-material-item">' +
              '<div class="lec-material-icon ' + iconClass + '">' + iconText.substring(0,3) + '</div>' +
              '<div class="lec-material-info">' +
                '<h4 class="lec-material-name">' + res.title + '</h4>' +
                '<p class="lec-material-size">' + res.size + '</p>' +
              '</div>' +
              '<a href="' + res.url + '" download class="lec-material-dl" aria-label="Tải xuống ' + res.title + '">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>' +
              '</a>' +
            '</div>';
        });
        matCard.innerHTML = html;
      } else {
        matCard.innerHTML = '<p class="lec-progress-text">No materials for this lecture.</p>';
      }
    }
  }

  function updateSidebarProgress(lectureId) {
    var lec = core.getLectureById(lectureId);
    if (lec) renderSidebar(lec.subjectId, lectureId);
  }

  /* ====== HỖ TRỢ RENDER TOÁN KA-TEX ====== */
  function renderMath(container) {
    if (!container) return;
    function tryRender() {
      if (window.renderMathInElement) {
        try {
          window.renderMathInElement(container, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false },
              { left: '\\(', right: '\\)', display: false },
              { left: '\\[', right: '\\]', display: true }
            ],
            throwOnError: false
          });
        } catch (err) {
          console.warn('KaTeX render warning:', err);
        }
      }
    }

    if (window.renderMathInElement) {
      tryRender();
    } else {
      window.addEventListener('load', tryRender);
      setTimeout(tryRender, 200);
      setTimeout(tryRender, 600);
      setTimeout(tryRender, 1200);
    }
  }

  /* ====== QUẢN LÝ BÌNH LUẬN / THẢO LUẬN (DISCUSSION) ====== */
  function initComments(lectureId) {
    var commentsListEl = document.getElementById('lec-comments-list');
    var countEl = document.getElementById('lec-comments-count');
    var inputEl = document.getElementById('lec-comment-input');
    var btnSubmit = document.getElementById('lec-btn-submit-comment');
    var avatarEl = document.getElementById('lec-my-avatar');

    var token = localStorage.getItem('token');
    var userStr = localStorage.getItem('user');
    var currentUser = null;
    try { currentUser = JSON.parse(userStr); } catch (e) {}

    if (avatarEl && currentUser) {
      avatarEl.textContent = (currentUser.username || 'U').substring(0, 1).toUpperCase();
    }

    function loadComments() {
      fetch('/api/lms/lectures/' + lectureId + '/comments')
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.success && Array.isArray(data.comments)) {
            renderComments(data.comments);
          }
        })
        .catch(function (err) {
          console.warn('Lỗi load comments:', err);
        });
    }

    function renderComments(comments) {
      if (!commentsListEl) return;
      if (countEl) countEl.textContent = comments.length + ' bình luận';

      if (comments.length === 0) {
        commentsListEl.innerHTML = '<p style="color: #64748b; font-size: 14px; text-align: center; padding: 20px;">Chưa có bình luận nào. Hãy là người đầu tiên đặt câu hỏi hoặc chia sẻ ý kiến về bài học này!</p>';
        return;
      }

      var html = '';
      comments.forEach(function (c) {
        var isAuthor = currentUser && currentUser.id === c.user_id;
        var isPrivileged = currentUser && ['owner', 'admin', 'staff'].includes(currentUser.role);
        var canDelete = isAuthor || isPrivileged;

        var roleBadge = '';
        if (c.user_role === 'owner') roleBadge = '<span class="role-badge" style="background: #ef4444; color: #fff; font-size: 10px; padding: 2px 6px; border-radius: 4px; margin-left: 6px;">Owner</span>';
        else if (c.user_role === 'admin') roleBadge = '<span class="role-badge" style="background: #3b82f6; color: #fff; font-size: 10px; padding: 2px 6px; border-radius: 4px; margin-left: 6px;">Admin</span>';
        else if (c.user_role === 'staff') roleBadge = '<span class="role-badge" style="background: #10b981; color: #fff; font-size: 10px; padding: 2px 6px; border-radius: 4px; margin-left: 6px;">Staff</span>';

        html +=
          '<div class="lec-comment-item" style="display: flex; gap: 12px; margin-bottom: 16px; padding-bottom: 14px; border-bottom: 1px solid #f1f5f9;">' +
            '<div style="width: 36px; height: 36px; border-radius: 50%; background: #e2e8f0; color: #1e293b; font-weight: 700; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0;">' +
              (c.user_avatar || (c.user_name ? c.user_name.substring(0,1).toUpperCase() : 'U')) +
            '</div>' +
            '<div style="flex: 1;">' +
              '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">' +
                '<div>' +
                  '<strong style="font-size: 14px; color: #0f172a;">' + c.user_name + '</strong>' +
                  roleBadge +
                  '<span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">' + c.created_at + '</span>' +
                '</div>' +
                (canDelete ? '<button type="button" class="lec-btn-del-cmt" data-id="' + c.id + '" style="background: none; border: none; color: #94a3b8; font-size: 12px; cursor: pointer;" title="Xóa bình luận">✕</button>' : '') +
              '</div>' +
              '<div style="font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-wrap;">' + c.content + '</div>' +
            '</div>' +
          '</div>';
      });

      commentsListEl.innerHTML = html;

      commentsListEl.querySelectorAll('.lec-btn-del-cmt').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var cId = btn.getAttribute('data-id');
          if (!confirm('Bạn có muốn xóa bình luận này?')) return;
          fetch('/api/lms/comments/' + cId, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + (token || '')
            }
          })
          .then(function (res) { return res.json(); })
          .then(function (d) {
            if (d.success) loadComments();
            else alert(d.error || 'Lỗi khi xóa bình luận');
          });
        });
      });
    }

    if (btnSubmit) {
      btnSubmit.addEventListener('click', function () {
        var content = inputEl.value.trim();
        if (!content) {
          alert('Vui lòng nhập nội dung bình luận!');
          return;
        }

        var headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = 'Bearer ' + token;

        var body = { content: content };
        if (!token && currentUser) {
          body.userName = currentUser.username;
          body.userRole = currentUser.role;
        }

        fetch('/api/lms/lectures/' + lectureId + '/comments', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body)
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.success) {
            inputEl.value = '';
            loadComments();
          } else {
            alert('Lỗi: ' + (data.error || 'Không thể gửi bình luận'));
          }
        })
        .catch(function (err) {
          console.error(err);
          alert('Lỗi kết nối khi gửi bình luận');
        });
      });
    }

    loadComments();
  }

  /* ====== KHỞI TẠO TRANG ====== */
  function initPage() {
    /* Lấy ID từ URL, mặc định 1 */
    var params = new URLSearchParams(window.location.search);
    var lectureId = parseInt(params.get('id'), 10) || 1;

    function renderLectureContent(lecture) {
      if (!lecture) return;

      var subject = core.getSubjectById(lecture.subjectId) || {
        id: lecture.subjectId,
        name: lecture.courseName || 'Khóa học',
        title: lecture.courseTitle || 'Bài giảng',
        gradientFrom: lecture.gradientFrom || '#38bdf8',
        gradientTo: lecture.gradientTo || '#0284c7'
      };

      /* Render header bài giảng */
      var subjectLink = document.getElementById('lec-nav-subject');
      var titleEl = document.getElementById('lec-nav-title');
      var mainTitleEl = document.getElementById('lec-detail-title');
      var metaEl = document.getElementById('lec-detail-meta');
      
      if (subjectLink) {
        subjectLink.textContent = subject.name;
        subjectLink.href = 'subject.html?id=' + subject.id;
      }
      if (titleEl) titleEl.textContent = 'Lecture ' + (lecture.order || 1);
      if (mainTitleEl) mainTitleEl.textContent = 'Lecture ' + (lecture.order || 1) + ' - ' + lecture.title;
      if (metaEl) metaEl.textContent = core.formatType(lecture.type) + ' · ' + (lecture.durationMin || 15) + ' min';

      /* Render About (Overview tab) */
      var descEl = document.getElementById('lec-about-desc');
      var takeawayEl = document.getElementById('lec-takeaway-list');
      var articleEl = document.getElementById('lec-overview-article');
      
      if (descEl) descEl.textContent = lecture.description || '';
      if (takeawayEl) {
        var takeaways = Array.isArray(lecture.keyTakeaways) ? lecture.keyTakeaways : [];
        takeawayEl.innerHTML = takeaways.map(function (k) {
          return '<li>' + k + '</li>';
        }).join('');
      }
      if (articleEl && lecture.overviewHtml) {
        articleEl.innerHTML = lecture.overviewHtml;
        renderMath(articleEl);
      }

      /* Render resources cho Resources tab */
      var resTabContent = document.getElementById('lec-tab-resources');
      if (resTabContent) {
        var res = lecture.resources && lecture.resources.length > 0 ? lecture.resources : core.getResources(lecture.id);
        if (res && res.length > 0) {
          var resHtml = '<div class="lec-resources-list">';
          res.forEach(function (r) {
            resHtml +=
              '<div class="lec-resource-row">' +
                '<div class="lec-resource-icon lec-resource-icon--' + (r.type || 'file') + '">' + (r.type || 'FILE').toUpperCase().substring(0,3) + '</div>' +
                '<div class="lec-resource-body">' +
                  '<h3 class="lec-resource-name">' + r.title + '</h3>' +
                  '<p class="lec-resource-meta">' + (r.size || '') + '</p>' +
                '</div>' +
                '<div class="lec-resource-action">' +
                  '<a href="' + r.url + '" download class="lec-resource-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg> Download</a>' +
                '</div>' +
              '</div>';
          });
          resHtml += '</div>';
          resTabContent.innerHTML = resHtml;
        } else {
          resTabContent.innerHTML = '<p class="lec-empty-text">Chưa có tài liệu đính kèm cho bài giảng này.</p>';
        }
      }

      /* Gắn tên cho Mini player */
      var miniTitle = document.getElementById('lec-mini-title');
      if (miniTitle) miniTitle.textContent = lecture.title;

      initPlayer(lecture);
      renderSidebar(subject.id, lecture.id);
    }

    /* 1. Hiển thị ngay từ local cache nếu có */
    var initialLecture = core.getLectureById(lectureId);
    if (initialLecture) {
      renderLectureContent(initialLecture);
    } else {
      /* Nếu chưa có trong cache tĩnh, hiển thị trạng thái đang tải, TUYỆT ĐỐI không xóa DOM thẻ video */
      var mainTitleEl = document.getElementById('lec-detail-title');
      var metaEl = document.getElementById('lec-detail-meta');
      if (mainTitleEl) mainTitleEl.textContent = 'Đang tải bài giảng...';
      if (metaEl) metaEl.textContent = 'Vui lòng đợi trong giây lát...';
    }

    /* 2. Tải dữ liệu tươi từ Backend API */
    core.fetchLectureDetail(lectureId, function (liveLecture) {
      if (liveLecture) {
        renderLectureContent(liveLecture);
      } else if (!initialLecture) {
        /* Chỉ khi API trả 404 / lỗi và cache cũng không có thì mới thay nội dung */
        var mainEl = document.querySelector('.main');
        if (mainEl) {
          mainEl.innerHTML =
            '<div class="lec-empty" style="text-align: center; padding: 60px 20px;">' +
              '<div style="font-size: 48px; margin-bottom: 12px;">⚠️</div>' +
              '<h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Không tìm thấy bài giảng</h2>' +
              '<p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">Bài giảng bạn đang tìm không tồn tại hoặc đã bị xóa khỏi hệ thống.</p>' +
              '<a href="lectures.html" class="button-primary" style="text-decoration: none; display: inline-block; padding: 8px 18px;">← Quay lại danh sách bài giảng</a>' +
            '</div>';
        }
      }
    });

    initTabs();
    initComments(lectureId);
  }

  /* EXPORT */
  window.Lib95.lectures.player = {
    initPage: initPage
  };

})();
