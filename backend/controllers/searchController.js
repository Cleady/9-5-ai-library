/**
 * backend/controllers/searchController.js
 * Controller tìm kiếm toàn cục đa nguồn cho 9.5 AI CLUB.
 * Hỗ trợ tìm kiếm tiếng Việt có dấu / không dấu, xếp hạng độ tương quan,
 * phân quyền theo vai trò (Guest / Member / Staff / Admin / Owner),
 * và lọc theo từng danh mục.
 */

const fs = require('fs');
const path = require('path');
const db = require('../config/db');
const {
  removeVietnameseAccents,
  escapeLikePattern,
  matchesVietnamese,
  calculateRelevance
} = require('../utils/vietnamese');

// Nạp file chỉ mục nhẹ của Quiz sinh bởi tools/build-quiz-index.js (tự động cập nhật khi file trên đĩa thay đổi)
const quizzesIndexPath = path.resolve(__dirname, '../data/quizzes-index.json');
let cachedQuizzesIndex = { subjects: [], quizzes: [] };
let lastQuizzesMtime = 0;

function getQuizzesIndex() {
  try {
    if (fs.existsSync(quizzesIndexPath)) {
      const stats = fs.statSync(quizzesIndexPath);
      if (stats.mtimeMs !== lastQuizzesMtime) {
        cachedQuizzesIndex = JSON.parse(fs.readFileSync(quizzesIndexPath, 'utf8'));
        lastQuizzesMtime = stats.mtimeMs;
      }
    }
  } catch (e) {
    console.warn('⚠️ Cảnh báo: Lỗi đọc quizzes-index.json:', e.message);
  }
  return cachedQuizzesIndex;
}

// Danh sách các trang chính và hành động nhanh (Navigation & Quick Actions)
const NAVIGATION_ITEMS = [
  {
    id: 'nav-dashboard',
    title: 'Trang chủ (Dashboard)',
    subtitle: 'Bảng điều khiển học tập • Tiến độ cá nhân',
    url: '/home_page/home_page.html',
    icon: 'home',
    keywords: 'trang chu bang dieu khien dashboard home tong quan tong hop'
  },
  {
    id: 'nav-lectures',
    title: 'Bài giảng & Khóa học (LMS)',
    subtitle: 'Thư viện bài giảng video và lộ trình khóa học',
    url: '/pages/lectures/lectures.html',
    icon: 'lectures',
    keywords: 'bai giang khoa hoc lms lectures courses video lo trinh hoc tap'
  },
  {
    id: 'nav-practice',
    title: 'Luyện tập & Thi thử (Practice)',
    subtitle: 'Ngân hàng đề trắc nghiệm chia theo môn học và chương',
    url: '/pages/practice/practice.html',
    icon: 'practice',
    keywords: 'luyen tap thi thu quiz practice trac nghiem de thi trac nghiem chuong'
  },
  {
    id: 'nav-resources',
    title: 'Thư viện Tài nguyên (Resources)',
    subtitle: 'Tài liệu, giáo trình, slide bài giảng tải về',
    url: '/pages/lectures/resources.html',
    icon: 'resources',
    keywords: 'tai nguyen tai lieu giao trinh slide download sach tham khao'
  },
  {
    id: 'nav-favorites',
    title: 'Mục Yêu thích (Favorites)',
    subtitle: 'Danh sách bài giảng và câu hỏi đã đánh dấu sao',
    url: '/pages/favorites.html',
    icon: 'favorite',
    keywords: 'yeu thich da luu favorites bookmark danh dau sao'
  },
  {
    id: 'nav-history',
    title: 'Lịch sử học tập (History)',
    subtitle: 'Nhật ký bài giảng đã xem và đề thi đã làm',
    url: '/pages/history.html',
    icon: 'history',
    keywords: 'lich su da xem history gan day nhat ky tien do'
  },
  {
    id: 'nav-community-feed',
    title: 'Bảng tin Cộng đồng (Community Feed)',
    subtitle: 'Cập nhật tin tức, bài viết và chia sẻ từ bạn học',
    url: '/pages/community/community-feed.html',
    icon: 'community',
    keywords: 'bang tin cong dong dien dan community feed bai dang chia se'
  },
  {
    id: 'nav-discussions',
    title: 'Thảo luận & Hỏi đáp (Discussions)',
    subtitle: 'Diễn đàn trao đổi học thuật và giải đáp thắc mắc',
    url: '/pages/community/community-discussions.html',
    icon: 'discussion',
    keywords: 'thao luan hoi dap dien dan discussions forum cau hoi thac mac'
  },
  {
    id: 'nav-groups',
    title: 'Nhóm học tập (Study Groups)',
    subtitle: 'Hội nhóm ôn thi và cùng nhau học nhóm',
    url: '/pages/community/community-groups.html',
    icon: 'group',
    keywords: 'nhom hoc tap hoi nhom study groups on thi trao doi'
  },
  {
    id: 'nav-settings',
    title: 'Cài đặt hệ thống (Settings)',
    subtitle: 'Trung tâm thiết lập tài khoản và tuỳ biến trải nghiệm',
    url: '/pages/settings/settings.html',
    icon: 'settings',
    keywords: 'cai dat cau hinh thiet lap settings options he thong'
  },
  {
    id: 'nav-settings-profile',
    title: 'Cài đặt Hồ sơ cá nhân',
    subtitle: 'Chỉnh sửa họ tên, tiểu sử bio và avatar',
    url: '/pages/settings/settings.html#profile',
    icon: 'user',
    keywords: 'ho so ca nhan profile avatar bio doi ten thong tin ca nhan'
  },
  {
    id: 'nav-settings-security',
    title: 'Bảo mật & Mật khẩu',
    subtitle: 'Đổi mật khẩu tài khoản và phiên đăng nhập',
    url: '/pages/settings/settings.html#security',
    icon: 'security',
    keywords: 'bao mat mat khau security password doi pass doi mat khau phien'
  },
  {
    id: 'nav-settings-appearance',
    title: 'Giao diện & Màu sắc (Appearance)',
    subtitle: 'Tuỳ chỉnh Light/Dark mode và 5 màu nhấn Accent',
    url: '/pages/settings/settings.html#appearance',
    icon: 'palette',
    keywords: 'giao dien mau sac appearance theme dark mode che do toi mau nhan accent'
  },
  {
    id: 'nav-settings-privacy',
    title: 'Quyền riêng tư & Dữ liệu',
    subtitle: 'Thiết lập hiển thị tài khoản và lịch sử tìm kiếm',
    url: '/pages/settings/settings.html#privacy',
    icon: 'privacy',
    keywords: 'quyen rieng tu du lieu privacy an danh lich su xoa du lieu'
  },
  {
    id: 'nav-admin',
    title: 'Trang Quản trị (Admin Portal)',
    subtitle: 'Kiểm duyệt nội dung, quản lý người dùng và số liệu',
    url: '/pages/admin/admin.html',
    icon: 'admin',
    keywords: 'quan tri vien admin portal dashboard kiem duyet nguoi dung he thong',
    requiredRole: ['owner', 'admin', 'staff']
  },
  {
    id: 'action-toggle-theme',
    title: 'Bật / Tắt Giao diện tối (Toggle Dark Mode)',
    subtitle: 'Chuyển đổi tức thì giữa chế độ Sáng và Tối',
    url: 'action:toggle_theme',
    icon: 'theme',
    keywords: 'bat tat che do toi dark mode toggle theme sang toi che do sang light mode'
  }
];

// Helper định dạng kích thước tệp
function formatFileSize(bytes) {
  if (!bytes || bytes <= 0) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Xây dựng mệnh đề SQL LIKE hỗ trợ cả tiếng Việt có dấu và chuẩn hoá đ/d
function buildSearchClause(columns, query) {
  const rawEscaped = escapeLikePattern(query);
  const dNormalized = escapeLikePattern(query.replace(/[đĐ]/g, 'd'));

  const clauses = [];
  const params = [];

  for (const col of columns) {
    clauses.push(`${col} LIKE ?`);
    params.push(`%${rawEscaped}%`);
    clauses.push(`REPLACE(LOWER(${col}), 'đ', 'd') LIKE ?`);
    params.push(`%${dNormalized}%`);
  }

  return {
    sql: `(${clauses.join(' OR ')})`,
    params
  };
}

/**
 * Controller chính: GET /api/search
 * Tham số query:
 * - q: Từ khóa tìm kiếm (bắt buộc)
 * - types: Danh mục cần tìm (courses, lectures, quizzes, resources, community, users, navigation hoặc all)
 * - limit: Số lượng tối đa mỗi danh mục (mặc định 4)
 */
exports.globalSearch = async (req, res) => {
  const startTime = Date.now();
  const rawQuery = (req.query.q || req.query.query || '').trim();
  const limit = Math.max(1, Math.min(50, parseInt(req.query.limit, 10) || 4));
  const rawTypes = req.query.types ? req.query.types.split(',').map(t => t.trim().toLowerCase()) : ['all'];
  const searchAllTypes = rawTypes.includes('all');

  const shouldSearch = (category) => searchAllTypes || rawTypes.includes(category);

  // Nếu chuỗi tìm kiếm rỗng, trả về cấu trúc rỗng nhanh
  if (!rawQuery) {
    return res.json({
      query: '',
      total: 0,
      counts: {},
      results: {},
      tookMs: 0
    });
  }

  // Giới hạn độ dài từ khóa tối đa 100 ký tự để chống DoS
  const safeQuery = rawQuery.slice(0, 100);

  // Thông tin phân quyền người dùng
  const user = req.user;
  const isStaffOrAdmin = user && ['owner', 'admin', 'staff'].includes(user.role);

  try {
    const searchTasks = [];

    // ==========================================
    // 1. MÔN HỌC (COURSES & PRACTICE SUBJECTS)
    // ==========================================
    let searchCourses = async () => {
      if (!shouldSearch('courses')) return [];

      const results = [];

      // A. Môn học trong Database LMS (courses)
      try {
        const whereStatus = isStaffOrAdmin ? '1=1' : "COALESCE(status, 'active') NOT IN ('draft', 'hidden')";
        const clause = buildSearchClause(['title', 'name', 'code', 'description'], safeQuery);
        const [rows] = await db.query(
          `SELECT id, code, name, title, description, icon, status
           FROM courses
           WHERE ${whereStatus} AND ${clause.sql}
           LIMIT ?`,
          [...clause.params, limit * 2]
        );

        for (const row of rows) {
          const itemTitle = row.title || row.name || row.code;
          const score = calculateRelevance(itemTitle, safeQuery, {
            code: row.code,
            description: row.description
          });
          results.push({
            id: row.id,
            category: 'courses',
            type: 'lms_course',
            title: itemTitle,
            subtitle: `Khóa học LMS • Mã môn: ${row.code}`,
            url: `/pages/lectures/subject.html?id=${row.id}`,
            icon: row.icon || 'subject1-icon',
            status: row.status,
            score
          });
        }
      } catch (err) {
        console.error('Lỗi tìm kiếm courses DB:', err.message);
      }

      // B. Môn học trong chỉ mục Quiz (practice subjects)
      const quizzesIndex = getQuizzesIndex();
      if (quizzesIndex && quizzesIndex.subjects) {
        for (const sub of quizzesIndex.subjects) {
          if (matchesVietnamese(sub.name, safeQuery) || matchesVietnamese(sub.code, safeQuery)) {
            // Tránh trùng mã môn với khóa học LMS đã có ở trên
            const exists = results.some(r => r.subtitle && r.subtitle.includes(sub.code));
            if (!exists) {
              const score = calculateRelevance(sub.name, safeQuery, { code: sub.code });
              results.push({
                id: sub.id,
                category: 'courses',
                type: 'practice_subject',
                title: sub.name,
                subtitle: `Luyện tập • Mã môn: ${sub.code}`,
                url: `/pages/practice/practice-subject.html?subject=${sub.id}`,
                icon: sub.icon || 'subject1-icon',
                score
              });
            }
          }
        }
      }

      results.sort((a, b) => b.score - a.score);
      return results;
    };
    searchTasks.push(searchCourses());

    // ==========================================
    // 2. BÀI GIẢNG LMS (LECTURES)
    // ==========================================
    let searchLectures = async () => {
      if (!shouldSearch('lectures')) return [];

      try {
        const whereStatus = isStaffOrAdmin
          ? '1=1'
          : "COALESCE(l.status, 'in-progress') NOT IN ('draft', 'hidden') AND COALESCE(c.status, 'active') NOT IN ('draft', 'hidden')";
        const clause = buildSearchClause(['l.title', 'l.description', 'l.key_takeaways'], safeQuery);
        const [rows] = await db.query(
          `SELECT l.id, l.title, l.description, l.duration_min, l.thumbnail_url, l.status,
                  c.code AS course_code, c.name AS course_name
           FROM lectures l
           JOIN courses c ON l.course_id = c.id
           WHERE ${whereStatus} AND ${clause.sql}
           LIMIT ?`,
          [...clause.params, limit * 2]
        );

        const results = rows.map(row => {
          const score = calculateRelevance(row.title, safeQuery, {
            description: row.description,
            code: row.course_code
          });
          return {
            id: row.id,
            category: 'lectures',
            title: row.title,
            subtitle: `${row.course_code || 'LMS'} • ${row.duration_min ? row.duration_min + ' phút' : 'Bài giảng video'}`,
            url: `/pages/lectures/lecture.html?id=${row.id}`,
            icon: 'video',
            thumbnail: row.thumbnail_url || null,
            status: row.status,
            score
          };
        });

        results.sort((a, b) => b.score - a.score);
        return results;
      } catch (err) {
        console.error('Lỗi tìm kiếm lectures DB:', err.message);
        return [];
      }
    };
    searchTasks.push(searchLectures());

    // ==========================================
    // 3. ĐỀ THI & QUIZ (QUIZZES)
    // ==========================================
    let searchQuizzes = async () => {
      const quizzesIndex = getQuizzesIndex();
      if (!shouldSearch('quizzes') || !quizzesIndex || !quizzesIndex.quizzes) return [];

      const results = [];
      for (const qz of quizzesIndex.quizzes) {
        if (
          matchesVietnamese(qz.title, safeQuery) ||
          matchesVietnamese(qz.subjectName, safeQuery) ||
          matchesVietnamese(qz.subjectCode, safeQuery)
        ) {
          const score = calculateRelevance(qz.title, safeQuery, {
            code: qz.subjectCode,
            description: qz.subjectName
          });
          results.push({
            id: qz.id,
            category: 'quizzes',
            title: qz.title,
            subtitle: `${qz.subjectCode} • ${qz.questionCount} câu • ${qz.durationMin} phút`,
            url: `/pages/practice/practice-quiz-intro.html?quiz=${qz.id}`,
            icon: 'quiz',
            score
          });
        }
      }

      results.sort((a, b) => b.score - a.score);
      return results;
    };
    searchTasks.push(searchQuizzes());

    // ==========================================
    // 4. TÀI NGUYÊN HỌC TẬP (RESOURCES)
    // ==========================================
    let searchResources = async () => {
      if (!shouldSearch('resources')) return [];

      try {
        const clause = buildSearchClause(['title', 'description', 'original_name', 'subject'], safeQuery);
        const [rows] = await db.query(
          `SELECT id, title, description, original_name, extension, file_size_bytes, subject, downloads
           FROM resources
           WHERE ${clause.sql}
           LIMIT ?`,
          [...clause.params, limit * 2]
        );

        const results = rows.map(row => {
          const itemTitle = row.title || row.original_name;
          const score = calculateRelevance(itemTitle, safeQuery, {
            code: row.subject,
            description: row.description,
            engagement: row.downloads
          });
          const ext = row.extension ? row.extension.toUpperCase().replace('.', '') : 'FILE';
          const sizeStr = formatFileSize(row.file_size_bytes);
          return {
            id: row.id,
            category: 'resources',
            title: itemTitle,
            subtitle: `${row.subject || 'Chung'} • ${ext}${sizeStr ? ' • ' + sizeStr : ''}`,
            url: `/pages/lectures/resources.html?q=${encodeURIComponent(itemTitle)}`,
            icon: 'file',
            score
          };
        });

        results.sort((a, b) => b.score - a.score);
        return results;
      } catch (err) {
        console.error('Lỗi tìm kiếm resources DB:', err.message);
        return [];
      }
    };
    searchTasks.push(searchResources());

    // ==========================================
    // 5. CỘNG ĐỒNG (POSTS, DISCUSSIONS, GROUPS)
    // ==========================================
    let searchCommunity = async () => {
      if (!shouldSearch('community')) return [];

      const results = [];

      try {
        // A. Bài đăng Feed (community_posts)
        const postHiddenFilter = isStaffOrAdmin ? '1=1' : 'p.is_hidden = 0';
        const postClause = buildSearchClause(['p.content'], safeQuery);
        const [posts] = await db.query(
          `SELECT p.id, p.content, p.is_pinned, p.is_hidden, p.created_at,
                  u.username, u.full_name, u.avatar_url
           FROM community_posts p
           LEFT JOIN users u ON p.user_id = u.id
           WHERE ${postHiddenFilter} AND ${postClause.sql}
           ORDER BY p.is_pinned DESC, p.created_at DESC
           LIMIT ?`,
          [...postClause.params, limit]
        );

        for (const p of posts) {
          // Cắt ngắn nội dung làm snippet
          const snippet = p.content.length > 80 ? p.content.slice(0, 80) + '...' : p.content;
          const authorName = p.full_name || p.username || 'Thành viên';
          const score = calculateRelevance(p.content, safeQuery, {
            isPinned: p.is_pinned === 1
          });
          results.push({
            id: p.id,
            category: 'community',
            type: 'post',
            title: snippet,
            subtitle: `Bài đăng • Tác giả: ${authorName}${p.is_hidden ? ' [Đã ẩn]' : ''}`,
            url: `/pages/community/community-feed.html#post-${p.id}`,
            icon: 'post',
            avatar: p.avatar_url || null,
            score
          });
        }

        // B. Thảo luận (community_discussions)
        const discHiddenFilter = isStaffOrAdmin ? '1=1' : 'd.is_hidden = 0';
        const discClause = buildSearchClause(['d.title', 'd.body', 'd.tag'], safeQuery);
        const [discussions] = await db.query(
          `SELECT d.id, d.title, d.body, d.tag, d.is_hidden, d.created_at,
                  u.username, u.full_name
           FROM community_discussions d
           LEFT JOIN users u ON d.user_id = u.id
           WHERE ${discHiddenFilter} AND ${discClause.sql}
           ORDER BY d.created_at DESC
           LIMIT ?`,
          [...discClause.params, limit]
        );

        for (const d of discussions) {
          const authorName = d.full_name || d.username || 'Thành viên';
          const score = calculateRelevance(d.title, safeQuery, {
            description: d.body,
            code: d.tag
          });
          results.push({
            id: d.id,
            category: 'community',
            type: 'discussion',
            title: d.title,
            subtitle: `Thảo luận • Tác giả: ${authorName}${d.tag ? ' • #' + d.tag : ''}${d.is_hidden ? ' [Đã ẩn]' : ''}`,
            url: `/pages/community/discussion-detail.html?id=${d.id}`,
            icon: 'discussion',
            score
          });
        }

        // C. Nhóm học tập (community_groups)
        const groupClause = buildSearchClause(['name', 'description'], safeQuery);
        const [groups] = await db.query(
          `SELECT id, name, description, created_at
           FROM community_groups
           WHERE ${groupClause.sql}
           LIMIT ?`,
          [...groupClause.params, limit]
        );

        for (const g of groups) {
          const score = calculateRelevance(g.name, safeQuery, {
            description: g.description
          });
          results.push({
            id: g.id,
            category: 'community',
            type: 'group',
            title: g.name,
            subtitle: `Nhóm học tập • ${g.description ? g.description.slice(0, 50) : 'Cùng học tập'}`,
            url: `/pages/community/community-groups.html?id=${g.id}`,
            icon: 'group',
            score
          });
        }

        results.sort((a, b) => b.score - a.score);
        return results;
      } catch (err) {
        console.error('Lỗi tìm kiếm community DB:', err.message);
        return [];
      }
    };
    searchTasks.push(searchCommunity());

    // ==========================================
    // 6. NGƯỜI DÙNG (USERS)
    // ==========================================
    let searchUsers = async () => {
      if (!shouldSearch('users')) return [];

      try {
        const statusFilter = isStaffOrAdmin ? '1=1' : "status = 'active'";
        const clause = buildSearchClause(['username', 'full_name', 'bio'], safeQuery);
        const [rows] = await db.query(
          `SELECT id, username, full_name, role, status, avatar_url, bio
           FROM users
           WHERE ${statusFilter} AND ${clause.sql}
           LIMIT ?`,
          [...clause.params, limit * 2]
        );

        const results = rows.map(row => {
          const displayName = row.full_name || row.username;
          const score = calculateRelevance(displayName, safeQuery, {
            code: row.username,
            description: row.bio
          });
          return {
            id: row.id,
            category: 'users',
            title: displayName,
            subtitle: `@${row.username}${row.role !== 'member' ? ' • ' + row.role.toUpperCase() : ''}${row.status !== 'active' ? ' [' + row.status + ']' : ''}`,
            url: `/pages/community/community-feed.html?author=${row.id}`,
            avatar: row.avatar_url || null,
            icon: 'user',
            score
          };
        });

        results.sort((a, b) => b.score - a.score);
        return results;
      } catch (err) {
        console.error('Lỗi tìm kiếm users DB:', err.message);
        return [];
      }
    };
    searchTasks.push(searchUsers());

    // ==========================================
    // 7. TRANG & CÀI ĐẶT NHANH (NAVIGATION)
    // ==========================================
    let searchNavigation = async () => {
      if (!shouldSearch('navigation')) return [];

      const results = [];
      for (const item of NAVIGATION_ITEMS) {
        // Kiểm tra phân quyền truy cập mục điều hướng
        if (item.requiredRole && (!user || !item.requiredRole.includes(user.role))) {
          continue;
        }

        if (
          matchesVietnamese(item.title, safeQuery) ||
          matchesVietnamese(item.subtitle, safeQuery) ||
          matchesVietnamese(item.keywords, safeQuery)
        ) {
          const score = calculateRelevance(item.title, safeQuery, {
            description: item.keywords
          });
          results.push({
            id: item.id,
            category: 'navigation',
            title: item.title,
            subtitle: item.subtitle,
            url: item.url,
            icon: item.icon,
            score
          });
        }
      }

      results.sort((a, b) => b.score - a.score);
      return results;
    };
    searchTasks.push(searchNavigation());

    // ==========================================
    // ĐỢI TẤT CẢ CÁC TÁC VỤ HOÀN THÀNH ĐỒNG THỜI
    // ==========================================
    const [courses, lectures, quizzes, resources, community, users, navigation] = await Promise.all(searchTasks);

    const fullResults = {
      courses: courses || [],
      lectures: lectures || [],
      quizzes: quizzes || [],
      resources: resources || [],
      community: community || [],
      users: users || [],
      navigation: navigation || []
    };

    const counts = {
      courses: fullResults.courses.length,
      lectures: fullResults.lectures.length,
      quizzes: fullResults.quizzes.length,
      resources: fullResults.resources.length,
      community: fullResults.community.length,
      users: fullResults.users.length,
      navigation: fullResults.navigation.length
    };

    const total = Object.values(counts).reduce((sum, c) => sum + c, 0);

    // Cắt bớt theo giới hạn limit cho từng danh mục
    const limitedResults = {};
    for (const [cat, items] of Object.entries(fullResults)) {
      if (items.length > 0) {
        limitedResults[cat] = items.slice(0, limit);
      }
    }

    const tookMs = Date.now() - startTime;

    return res.json({
      query: safeQuery,
      total,
      counts,
      results: limitedResults,
      tookMs
    });
  } catch (error) {
    console.error('Lỗi hệ thống trong globalSearch:', error);
    return res.status(500).json({
      error: 'Đã xảy ra lỗi máy chủ trong quá trình tìm kiếm',
      tookMs: Date.now() - startTime
    });
  }
};
