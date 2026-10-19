/**
 * =====================================================================
 * youtube-utils.js — YouTube Utilities for 9.5 AI Library LMS
 * =====================================================================
 * Provides secure client-side YouTube URL parsing, video ID extraction,
 * IFrame API dynamic loading singleton, and off-screen duration detection.
 * =====================================================================
 */
(function (global) {
  'use strict';

  var ALLOWED_HOSTS = [
    'youtube.com',
    'www.youtube.com',
    'm.youtube.com',
    'youtu.be',
    'www.youtu.be',
    'youtube-nocookie.com',
    'www.youtube-nocookie.com'
  ];

  var YT_ID_REGEX = /^[A-Za-z0-9_-]{11}$/;

  /**
   * Securely extracts an 11-char YouTube ID using exact domain matching.
   * Never uses indexOf/includes/endsWith on hostnames.
   *
   * @param {string} input - YouTube URL or raw ID
   * @returns {string|null} - 11-char ID or null
   */
  function extractYouTubeId(input) {
    if (typeof input !== 'string') return null;
    var trimmed = input.trim();
    if (!trimmed) return null;

    // 1. Bare 11-char ID
    if (YT_ID_REGEX.test(trimmed)) {
      return trimmed;
    }

    // 2. Normalize scheme
    var urlStr = trimmed;
    if (urlStr.indexOf('//') === 0) {
      urlStr = 'https:' + urlStr;
    } else if (urlStr.indexOf('://') === -1) {
      urlStr = 'https://' + urlStr;
    }

    // 3. Parse URL safely
    var parsed;
    try {
      parsed = new URL(urlStr);
    } catch (e) {
      return null;
    }

    // 4. Validate protocol
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null;
    }

    // 5. Exact match against whitelist
    var hostname = parsed.hostname.toLowerCase();
    var isAllowed = false;
    for (var i = 0; i < ALLOWED_HOSTS.length; i++) {
      if (hostname === ALLOWED_HOSTS[i]) {
        isAllowed = true;
        break;
      }
    }
    if (!isAllowed) return null;

    // 6. Extract ID based on hostname
    if (hostname === 'youtu.be' || hostname === 'www.youtu.be') {
      var segments = parsed.pathname.split('/').filter(Boolean);
      if (segments.length > 0 && YT_ID_REGEX.test(segments[0])) {
        return segments[0];
      }
      return null;
    }

    // Standard hosts
    var vParam = parsed.searchParams.get('v');
    if (vParam && YT_ID_REGEX.test(vParam)) {
      return vParam;
    }

    var parts = parsed.pathname.split('/').filter(Boolean);
    if (parts.length >= 2) {
      var prefix = parts[0].toLowerCase();
      if (prefix === 'embed' || prefix === 'shorts' || prefix === 'live' || prefix === 'v') {
        if (YT_ID_REGEX.test(parts[1])) {
          return parts[1];
        }
      }
    }

    return null;
  }

  /**
   * Returns canonical watch URL for a video ID.
   */
  function canonicalWatchUrl(id) {
    if (!id || typeof id !== 'string' || !YT_ID_REGEX.test(id)) return null;
    return 'https://www.youtube.com/watch?v=' + id;
  }

  /**
   * Returns HQ thumbnail URL for a video ID.
   */
  function thumbnailUrl(id) {
    if (!id || typeof id !== 'string' || !YT_ID_REGEX.test(id)) return null;
    return 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
  }

  // Singleton Promise for YouTube IFrame API loading
  var ytApiPromise = null;

  function loadApi() {
    if (global.YT && global.YT.Player) {
      return Promise.resolve(global.YT);
    }
    if (ytApiPromise) {
      return ytApiPromise;
    }

    ytApiPromise = new Promise(function (resolve, reject) {
      // Check if already defined while promise was created
      if (global.YT && global.YT.Player) {
        return resolve(global.YT);
      }

      var prevHandler = global.onYouTubeIframeAPIReady;
      global.onYouTubeIframeAPIReady = function () {
        if (typeof prevHandler === 'function') {
          try { prevHandler(); } catch (e) { console.warn(e); }
        }
        resolve(global.YT);
      };

      var existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]');
      if (!existingScript) {
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.async = true;
        tag.onerror = function (err) {
          ytApiPromise = null;
          reject(new Error('Không thể tải YouTube IFrame API'));
        };
        var firstScript = document.getElementsByTagName('script')[0];
        if (firstScript && firstScript.parentNode) {
          firstScript.parentNode.insertBefore(tag, firstScript);
        } else {
          (document.head || document.documentElement).appendChild(tag);
        }
      }
    });

    return ytApiPromise;
  }

  /**
   * Detects video duration in minutes via an offscreen YouTube Player.
   *
   * @param {string} youtubeId - 11-char video ID
   * @param {Object} [options]
   * @param {number} [options.timeoutMs=8000]
   * @returns {Promise<number|null>} duration in minutes (>= 1) or null
   */
  function detectDuration(youtubeId, options) {
    options = options || {};
    var timeoutMs = options.timeoutMs || 8000;

    return loadApi().then(function (YT) {
      return new Promise(function (resolve) {
        var resolved = false;
        var pollInterval = null;
        var timeoutTimer = null;
        var player = null;

        var tempContainer = document.createElement('div');
        tempContainer.id = 'yt-temp-duration-' + Date.now();
        tempContainer.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:200px;height:150px;pointer-events:none;opacity:0;';
        document.body.appendChild(tempContainer);

        function cleanup() {
          if (pollInterval) clearInterval(pollInterval);
          if (timeoutTimer) clearTimeout(timeoutTimer);
          if (player && typeof player.destroy === 'function') {
            try { player.destroy(); } catch (e) {}
          }
          if (tempContainer && tempContainer.parentNode) {
            tempContainer.parentNode.removeChild(tempContainer);
          }
        }

        function finish(result) {
          if (resolved) return;
          resolved = true;
          cleanup();
          resolve(result);
        }

        timeoutTimer = setTimeout(function () {
          finish(null);
        }, timeoutMs);

        try {
          player = new YT.Player(tempContainer.id, {
            height: '150',
            width: '200',
            videoId: youtubeId,
            host: 'https://www.youtube-nocookie.com',
            playerVars: {
              autoplay: 0,
              controls: 0,
              disablekb: 1,
              fs: 0,
              rel: 0
            },
            events: {
              onReady: function () {
                pollInterval = setInterval(function () {
                  try {
                    var dur = player.getDuration();
                    if (dur && dur > 0) {
                      var mins = Math.max(1, Math.ceil(dur / 60));
                      finish(mins);
                    }
                  } catch (err) {
                    finish(null);
                  }
                }, 300);
              },
              onError: function () {
                finish(null);
              }
            }
          });
        } catch (e) {
          finish(null);
        }
      });
    }).catch(function () {
      return null;
    });
  }

  // Export to window.Lib95.youtube
  global.Lib95 = global.Lib95 || {};
  global.Lib95.youtube = {
    ALLOWED_HOSTS: ALLOWED_HOSTS,
    extractYouTubeId: extractYouTubeId,
    canonicalWatchUrl: canonicalWatchUrl,
    thumbnailUrl: thumbnailUrl,
    loadApi: loadApi,
    detectDuration: detectDuration
  };

})(typeof window !== 'undefined' ? window : this);
