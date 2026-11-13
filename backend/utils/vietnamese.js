/**
 * backend/utils/vietnamese.js
 * Tiện ích chuẩn hoá và đối soát chuỗi tiếng Việt (có dấu / không dấu)
 * phục vụ tìm kiếm toàn cục chính xác và an toàn.
 */

/**
 * Loại bỏ dấu tiếng Việt và chuẩn hoá về chữ thường không dấu.
 * Ví dụ: "Cấu trúc dữ liệu & Giải thuật" -> "cau truc du lieu & giai thuat"
 * "Điện toán đám mây" -> "dien toan dam may"
 * @param {string} str
 * @returns {string}
 */
function removeVietnameseAccents(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, m => (m === 'đ' ? 'd' : 'D'))
    .toLowerCase()
    .trim();
}

/**
 * Thoát các ký tự đại diện đặc biệt của toán tử LIKE trong MySQL (\, %, _)
 * để ngăn chặn việc người dùng gõ % hoặc _ làm khớp sai hoặc duyệt toàn bộ bảng.
 * @param {string} str
 * @returns {string}
 */
function escapeLikePattern(str) {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/[\\%_]/g, '\\$&');
}

/**
 * Kiểm tra xem chuỗi nguồn (target) có chứa từ khóa tìm kiếm (query) hay không,
 * hỗ trợ cả so khớp có dấu và không dấu (kể cả chữ đ/d).
 * @param {string} target
 * @param {string} query
 * @returns {boolean}
 */
function matchesVietnamese(target, query) {
  if (!target || !query) return false;
  const tLower = target.toLowerCase();
  const qLower = query.toLowerCase();
  if (tLower.includes(qLower)) return true;

  const tNormalized = removeVietnameseAccents(target);
  const qNormalized = removeVietnameseAccents(query);
  return tNormalized.includes(qNormalized);
}

/**
 * Tính điểm tương quan (Relevance Score) để xếp hạng kết quả tìm kiếm
 * @param {string} text - Tiêu đề hoặc văn bản chính
 * @param {string} query - Từ khóa người dùng gõ
 * @param {object} [options] - Tuỳ chọn điểm bổ sung: code, isPinned, isRecent, engagement
 * @returns {number} Điểm tương quan
 */
function calculateRelevance(text, query, options = {}) {
  if (!text || !query) return 0;
  const qRaw = query.trim().toLowerCase();
  const qNorm = removeVietnameseAccents(query);
  const tRaw = text.toLowerCase();
  const tNorm = removeVietnameseAccents(text);

  let score = 0;

  // 1. Khớp chính xác mã môn / mã định danh
  if (options.code) {
    const codeRaw = options.code.toLowerCase();
    const codeNorm = removeVietnameseAccents(options.code);
    if (codeRaw === qRaw || codeNorm === qNorm) {
      score += 100;
    } else if (codeRaw.startsWith(qRaw) || codeNorm.startsWith(qNorm)) {
      score += 60;
    }
  }

  // 2. Khớp tiêu đề
  if (tRaw === qRaw || tNorm === qNorm) {
    score += 80;
  } else if (tRaw.startsWith(qRaw) || tNorm.startsWith(qNorm)) {
    score += 50;
  } else {
    // Kiểm tra ranh giới từ (word boundary)
    const escapedQuery = qNorm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    try {
      if (new RegExp(`(?:^|[\\s.,;!?])${escapedQuery}(?:$|[\\s.,;!?])`, 'i').test(tNorm)) {
        score += 35;
      } else if (tRaw.includes(qRaw) || tNorm.includes(qNorm)) {
        score += 20;
      }
    } catch (e) {
      if (tRaw.includes(qRaw) || tNorm.includes(qNorm)) {
        score += 20;
      }
    }
  }

  // 3. Khớp mô tả phụ
  if (options.description) {
    const dRaw = options.description.toLowerCase();
    const dNorm = removeVietnameseAccents(options.description);
    if (dRaw.includes(qRaw) || dNorm.includes(qNorm)) {
      score += 10;
    }
  }

  // 4. Các yếu tố cộng điểm ưu tiên
  if (options.isPinned) score += 20;
  if (options.isRecent) score += 5;
  if (typeof options.engagement === 'number' && options.engagement > 0) {
    score += Math.min(10, Math.floor(options.engagement / 2));
  }

  return score;
}

module.exports = {
  removeVietnameseAccents,
  escapeLikePattern,
  matchesVietnamese,
  calculateRelevance
};
