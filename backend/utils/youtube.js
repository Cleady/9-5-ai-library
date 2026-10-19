/**
 * YouTube Utility Helper
 * Validates YouTube URLs, extracts video IDs securely, and builds canonical URLs.
 */

const ALLOWED_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'youtu.be',
  'www.youtu.be',
  'youtube-nocookie.com',
  'www.youtube-nocookie.com'
]);

const YT_ID_REGEX = /^[A-Za-z0-9_-]{11}$/;

/**
 * Extracts an 11-character YouTube video ID from an arbitrary input string.
 * Uses exact hostname matching against a whitelist to prevent SSRF and phishing attacks.
 *
 * @param {string} input - YouTube URL or raw video ID
 * @returns {string|null} - 11-char video ID or null if invalid
 */
function extractYouTubeId(input) {
  if (typeof input !== 'string') return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  // 1. Check if input is already a raw 11-character video ID
  if (YT_ID_REGEX.test(trimmed)) {
    return trimmed;
  }

  // 2. Normalize URL scheme
  let urlStr = trimmed;
  if (urlStr.startsWith('//')) {
    urlStr = 'https:' + urlStr;
  } else if (!urlStr.includes('://')) {
    // If no scheme present, prepend https://
    urlStr = 'https://' + urlStr;
  }

  // 3. Parse URL safely
  let parsed;
  try {
    parsed = new URL(urlStr);
  } catch (e) {
    return null;
  }

  // 4. Strict protocol validation (only http and https allowed)
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return null;
  }

  // 5. Strict hostname validation using exact match (=== via Set.has)
  // Rejects evil subdomains (e.g. youtube.com.evil.com) and spoofed names (e.g. evilyoutube.com)
  const hostname = parsed.hostname.toLowerCase();
  if (!ALLOWED_HOSTS.has(hostname)) {
    return null;
  }

  // 6. Extract ID based on hostname and path structure
  if (hostname === 'youtu.be' || hostname === 'www.youtu.be') {
    // Short link: https://youtu.be/<ID>
    const pathParts = parsed.pathname.split('/').filter(Boolean);
    if (pathParts.length > 0) {
      const candidate = pathParts[0];
      if (YT_ID_REGEX.test(candidate)) {
        return candidate;
      }
    }
    return null;
  }

  // Standard YouTube domains (youtube.com, m.youtube.com, youtube-nocookie.com, etc.)
  // Case A: Query parameter v=... (e.g. /watch?v=<ID>)
  const vParam = parsed.searchParams.get('v');
  if (vParam && YT_ID_REGEX.test(vParam)) {
    return vParam;
  }

  // Case B: Path segments /embed/<ID>, /shorts/<ID>, /live/<ID>, /v/<ID>
  const pathParts = parsed.pathname.split('/').filter(Boolean);
  if (pathParts.length >= 2) {
    const prefix = pathParts[0].toLowerCase();
    if (['embed', 'shorts', 'live', 'v'].includes(prefix)) {
      const candidate = pathParts[1];
      if (YT_ID_REGEX.test(candidate)) {
        return candidate;
      }
    }
  }

  // If link only has list= without valid video ID, or unsupported format, reject
  return null;
}

/**
 * Returns canonical watch URL for a given video ID.
 *
 * @param {string} id - 11-char YouTube video ID
 * @returns {string|null}
 */
function canonicalWatchUrl(id) {
  if (!id || typeof id !== 'string' || !YT_ID_REGEX.test(id)) {
    return null;
  }
  return `https://www.youtube.com/watch?v=${id}`;
}

/**
 * Returns standard HQ thumbnail URL for a given video ID.
 *
 * @param {string} id - 11-char YouTube video ID
 * @returns {string|null}
 */
function thumbnailUrl(id) {
  if (!id || typeof id !== 'string' || !YT_ID_REGEX.test(id)) {
    return null;
  }
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

module.exports = {
  extractYouTubeId,
  canonicalWatchUrl,
  thumbnailUrl,
  ALLOWED_HOSTS,
  YT_ID_REGEX
};
