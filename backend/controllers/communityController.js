const db = require('../config/db');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { recordAudit } = require('../utils/audit');

// Thư mục lưu trữ ảnh Community
const uploadDir = path.join(__dirname, '../../document/uploads/community');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Helper: Tự động trích xuất hashtag từ nội dung và kết hợp tags mảng
function extractAndNormalizeTags(content, explicitTags) {
  const set = new Set();
  if (Array.isArray(explicitTags)) {
    explicitTags.forEach(t => {
      if (typeof t === 'string') {
        const clean = t.replace(/^#/, '').trim().toLowerCase();
        if (clean && clean.length <= 50) set.add(clean);
      }
    });
  }
  if (content && typeof content === 'string') {
    // Hỗ trợ regex hashtag cho cả tiếng Việt có dấu và chữ số
    const regex = /(?:^|\s)#([\p{L}\p{N}_-]+)/gu;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const clean = match[1].trim().toLowerCase();
      if (clean && clean.length <= 50) set.add(clean);
    }
  }
  return Array.from(set);
}

// Import helper thông báo từ utils/notify
const { createNotification, notifyNewPost, notifyAllActive } = require('../utils/notify');

// ==========================================
// 1. POSTS (BÀI VIẾT)
// ==========================================

// GET /api/community/posts (?tag=, ?q=, ?page=, ?limit=)
exports.getPosts = async (req, res) => {
  try {
    const currentUserId = req.user ? req.user.id : null;
    const isStaffOrAdmin = req.user && ['staff', 'admin', 'owner'].includes(req.user.role);
    const { tag, q } = req.query;
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const offset = (page - 1) * limit;

    const whereClauses = [];
    const params = [];

    // Lọc bỏ bài viết bị ẩn nếu người dùng không phải staff/admin/owner
    if (!isStaffOrAdmin) {
      whereClauses.push('(p.is_hidden = 0 OR p.is_hidden IS NULL)');
    }

    if (tag && tag.trim()) {
      const cleanTag = tag.replace(/^#/, '').trim().toLowerCase();
      whereClauses.push('p.id IN (SELECT post_id FROM community_post_tags WHERE tag = ?)');
      params.push(cleanTag);
    }

    if (q && q.trim()) {
      whereClauses.push('(p.content LIKE ? OR u.full_name LIKE ?)');
      const searchTerm = `%${q.trim()}%`;
      params.push(searchTerm, searchTerm);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    // Đếm tổng số bài viết phù hợp
    const [countRows] = await db.query(
      `SELECT COUNT(*) AS total FROM community_posts p JOIN users u ON p.user_id = u.id ${whereSql}`,
      params
    );
    const totalPosts = countRows[0].total;
    const totalPages = Math.ceil(totalPosts / limit) || 1;

    // Lấy danh sách bài viết
    const queryParams = [...params, limit, offset];
    const [posts] = await db.query(
      `SELECT 
        p.id, p.user_id, p.kind, p.content, p.media_url, p.link_url, p.created_at, p.updated_at,
        p.is_pinned, p.pinned_at, p.pinned_by,
        u.full_name, u.username, u.avatar_url, u.role,
        (SELECT COUNT(*) FROM community_likes WHERE post_id = p.id) AS likeCount,
        (SELECT COUNT(*) FROM community_comments WHERE post_id = p.id) AS commentCount,
        EXISTS(SELECT 1 FROM community_likes WHERE post_id = p.id AND user_id = ?) AS likedByMe
      FROM community_posts p
      JOIN users u ON p.user_id = u.id
      ${whereSql}
      ORDER BY p.is_pinned DESC, p.pinned_at DESC, p.created_at DESC
      LIMIT ? OFFSET ?`,
      [currentUserId, ...queryParams]
    );

    if (posts.length === 0) {
      return res.json({
        success: true,
        posts: [],
        pagination: { page, limit, totalPosts, totalPages }
      });
    }

    const postIds = posts.map(p => p.id);

    // Lấy tags cho các bài viết
    const [tagRows] = await db.query(
      `SELECT post_id, tag FROM community_post_tags WHERE post_id IN (?)`,
      [postIds]
    );
    const tagsByPost = {};
    tagRows.forEach(row => {
      if (!tagsByPost[row.post_id]) tagsByPost[row.post_id] = [];
      tagsByPost[row.post_id].push(row.tag);
    });

    // Lấy thông tin poll cho các bài viết loại poll
    const pollPostIds = posts.filter(p => p.kind === 'poll').map(p => p.id);
    const pollDataByPost = {};

    if (pollPostIds.length > 0) {
      const [optRows] = await db.query(
        `SELECT o.id, o.post_id, o.label,
          (SELECT COUNT(*) FROM community_poll_votes WHERE option_id = o.id) AS voteCount
        FROM community_poll_options o
        WHERE o.post_id IN (?)`,
        [pollPostIds]
      );

      const [myVotes] = await db.query(
        `SELECT post_id, option_id FROM community_poll_votes WHERE post_id IN (?) AND user_id = ?`,
        [pollPostIds, currentUserId]
      );
      const myVoteMap = {};
      myVotes.forEach(mv => { myVoteMap[mv.post_id] = mv.option_id; });

      optRows.forEach(opt => {
        if (!pollDataByPost[opt.post_id]) {
          pollDataByPost[opt.post_id] = {
            options: [],
            totalVotes: 0,
            myVoteOptionId: myVoteMap[opt.post_id] || null
          };
        }
        const vCount = Number(opt.voteCount);
        pollDataByPost[opt.post_id].options.push({
          id: opt.id,
          label: opt.label,
          voteCount: vCount
        });
        pollDataByPost[opt.post_id].totalVotes += vCount;
      });
    }

    // Ghép dữ liệu hoàn chỉnh
    const formattedPosts = posts.map(p => {
      let pollInfo = null;
      if (p.kind === 'poll' && pollDataByPost[p.id]) {
        const pollObj = pollDataByPost[p.id];
        pollInfo = {
          totalVotes: pollObj.totalVotes,
          myVoteOptionId: pollObj.myVoteOptionId,
          options: pollObj.options.map(o => ({
            ...o,
            percentage: pollObj.totalVotes > 0 ? Math.round((o.voteCount / pollObj.totalVotes) * 100) : 0
          }))
        };
      }

      return {
        id: p.id,
        user_id: p.user_id,
        kind: p.kind,
        content: p.content,
        media_url: p.media_url,
        link_url: p.link_url,
        is_pinned: Boolean(p.is_pinned),
        pinned_at: p.pinned_at,
        pinned_by: p.pinned_by,
        created_at: p.created_at,
        updated_at: p.updated_at,
        author: {
          id: p.user_id,
          full_name: p.full_name,
          username: p.username,
          avatar_url: p.avatar_url,
          role: p.role
        },
        likeCount: Number(p.likeCount),
        commentCount: Number(p.commentCount),
        likedByMe: Boolean(p.likedByMe),
        tags: tagsByPost[p.id] || [],
        poll: pollInfo
      };
    });

    res.json({
      success: true,
      posts: formattedPosts,
      pagination: { page, limit, totalPosts, totalPages }
    });

  } catch (error) {
    console.error('Lỗi getPosts:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi lấy danh sách bài viết' });
  }
};

// POST /api/community/posts
exports.createPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { kind = 'post', content, media_url, link_url, tags, poll_options } = req.body;

    // Validate content
    if (!content || typeof content !== 'string' || !content.trim()) {
      return res.status(400).json({ error: 'Nội dung bài viết không được để trống' });
    }
    const cleanContent = content.trim();
    if (cleanContent.length > 2000) {
      return res.status(400).json({ error: 'Nội dung bài viết tối đa 2000 ký tự' });
    }

    // Validate kind
    const validKinds = ['post', 'photo', 'link', 'question', 'poll'];
    const postKind = validKinds.includes(kind) ? kind : 'post';

    // Validate link_url
    let validLinkUrl = null;
    if (link_url && typeof link_url === 'string' && link_url.trim()) {
      const trimmed = link_url.trim();
      if (!/^https?:\/\//i.test(trimmed)) {
        return res.status(400).json({ error: 'Đường dẫn liên kết phải bắt đầu bằng http:// hoặc https://' });
      }
      if (trimmed.length > 500) {
        return res.status(400).json({ error: 'Đường dẫn liên kết tối đa 500 ký tự' });
      }
      validLinkUrl = trimmed;
    }

    // Validate media_url
    let validMediaUrl = null;
    if (media_url && typeof media_url === 'string' && media_url.trim()) {
      validMediaUrl = media_url.trim().slice(0, 500);
    }

    // Validate poll_options nếu kind = poll
    if (postKind === 'poll') {
      if (!Array.isArray(poll_options) || poll_options.length < 2 || poll_options.length > 6) {
        return res.status(400).json({ error: 'Bài viết bình chọn cần có từ 2 đến 6 lựa chọn' });
      }
      for (const opt of poll_options) {
        if (!opt || typeof opt !== 'string' || !opt.trim()) {
          return res.status(400).json({ error: 'Các lựa chọn bình chọn không được để trống' });
        }
      }
    }

    // 1. Thêm bài viết vào CSDL
    const [result] = await db.query(
      `INSERT INTO community_posts (user_id, kind, content, media_url, link_url) VALUES (?, ?, ?, ?, ?)`,
      [userId, postKind, cleanContent, validMediaUrl, validLinkUrl]
    );
    const newPostId = result.insertId;

    // 2. Trích xuất và lưu tags
    const normalizedTags = extractAndNormalizeTags(cleanContent, tags);
    if (normalizedTags.length > 0) {
      const tagInserts = normalizedTags.map(tag => [newPostId, tag]);
      await db.query(
        `INSERT IGNORE INTO community_post_tags (post_id, tag) VALUES ?`,
        [tagInserts]
      );
    }

    // 3. Nếu là poll, thêm các options
    let createdPoll = null;
    if (postKind === 'poll' && Array.isArray(poll_options)) {
      const optionInserts = poll_options.map(opt => [newPostId, opt.trim().slice(0, 255)]);
      await db.query(
        `INSERT INTO community_poll_options (post_id, label) VALUES ?`,
        [optionInserts]
      );
      const [optRows] = await db.query(
        `SELECT id, label FROM community_poll_options WHERE post_id = ?`,
        [newPostId]
      );
      createdPoll = {
        options: optRows.map(o => ({ id: o.id, label: o.label, voteCount: 0, percentage: 0 })),
        totalVotes: 0,
        myVoteOptionId: null
      };
    }

    // 4. Lấy lại bài viết vừa tạo
    const [rows] = await db.query(
      `SELECT p.*, u.full_name, u.username, u.avatar_url, u.role
       FROM community_posts p
       JOIN users u ON p.user_id = u.id
       WHERE p.id = ?`,
      [newPostId]
    );

    const post = rows[0];

    // Tạo thông báo tự động (bọc try/catch bên trong, không làm vỡ luồng đăng bài)
    await notifyNewPost(post.id, post.user_id, post.role);

    res.status(201).json({
      success: true,
      message: 'Đăng bài thành công!',
      post: {
        id: post.id,
        user_id: post.user_id,
        kind: post.kind,
        content: post.content,
        media_url: post.media_url,
        link_url: post.link_url,
        is_pinned: Boolean(post.is_pinned),
        pinned_at: post.pinned_at,
        pinned_by: post.pinned_by,
        created_at: post.created_at,
        updated_at: post.updated_at,
        author: {
          id: post.user_id,
          full_name: post.full_name,
          username: post.username,
          avatar_url: post.avatar_url,
          role: post.role
        },
        likeCount: 0,
        commentCount: 0,
        likedByMe: false,
        tags: normalizedTags,
        poll: createdPoll
      }
    });

  } catch (error) {
    console.error('Lỗi createPost:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi đăng bài' });
  }
};

// PUT /api/community/posts/:id/pin (Chỉ Admin hoặc Owner)
exports.pinPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const { pinned } = req.body;
    const shouldPin = Boolean(pinned);

    // 1. Kiểm tra bài viết tồn tại
    const [rows] = await db.query('SELECT * FROM community_posts WHERE id = ?', [postId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy bài viết' });
    }
    const post = rows[0];

    // 2. Nếu ghim bài viết
    if (shouldPin) {
      // Giới hạn tối đa 3 bài ghim cùng lúc
      const [countRows] = await db.query(
        'SELECT COUNT(*) AS count FROM community_posts WHERE is_pinned = 1 AND id != ?',
        [postId]
      );
      if (countRows[0].count >= 3) {
        return res.status(400).json({
          error: 'Tối đa chỉ được ghim 3 bài viết cùng lúc. Vui lòng bỏ ghim một bài khác trước khi ghim bài mới.'
        });
      }

      // Cập nhật trạng thái ghim
      await db.query(
        'UPDATE community_posts SET is_pinned = 1, pinned_at = CURRENT_TIMESTAMP, pinned_by = ? WHERE id = ?',
        [userId, postId]
      );

      // Đảm bảo MỌI user active đều có thông báo type 'post' cho bài đó (trừ người ghim):
      // 2a. Đặt lại is_read = 0 và cập nhật created_at cho những user đã có thông báo (trừ người ghim)
      await db.query(
        "UPDATE community_notifications SET is_read = 0, created_at = CURRENT_TIMESTAMP WHERE post_id = ? AND type = 'post' AND user_id != ?",
        [postId, userId]
      );

      // 2b. Thêm thông báo cho các user active chưa có thông báo của post này (trừ tác giả và người ghim)
      await db.query(`
        INSERT INTO community_notifications (user_id, actor_id, type, post_id)
        SELECT u.id, ?, 'post', ?
        FROM users u
        WHERE u.status = 'active' AND u.id != ? AND u.id != ?
          AND NOT EXISTS (
            SELECT 1 FROM community_notifications n
            WHERE n.user_id = u.id AND n.post_id = ? AND n.type = 'post'
          )
      `, [post.user_id, postId, post.user_id, userId, postId]);

    } else {
      // Bỏ ghim bài viết (không xóa thông báo cũ)
      await db.query(
        'UPDATE community_posts SET is_pinned = 0, pinned_at = NULL, pinned_by = NULL WHERE id = ?',
        [postId]
      );
    }

    // 3. Ghi nhật ký quản trị (Audit Log)
    recordAudit({
      actorId: userId,
      action: shouldPin ? 'post.pin' : 'post.unpin',
      targetType: 'community_post',
      targetId: postId,
      details: { is_pinned: shouldPin },
      req
    });

    res.json({
      success: true,
      is_pinned: shouldPin,
      message: shouldPin ? 'Đã ghim bài viết lên đầu trang' : 'Đã bỏ ghim bài viết'
    });

  } catch (error) {
    console.error('Lỗi pinPost:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi ghim/bỏ ghim bài viết' });
  }
};

// PUT /api/community/posts/:id
exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const { content, media_url, link_url, tags } = req.body;

    const [rows] = await db.query('SELECT * FROM community_posts WHERE id = ?', [postId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy bài viết' });
    }
    const post = rows[0];

    // Chỉ tác giả mới có quyền sửa nội dung bài viết
    if (post.user_id !== userId) {
      return res.status(403).json({ error: 'You chỉ có quyền chỉnh sửa bài viết của chính mình' });
    }

    if (!content || typeof content !== 'string' || !content.trim()) {
      return res.status(400).json({ error: 'Nội dung bài viết không được để trống' });
    }
    const cleanContent = content.trim();
    if (cleanContent.length > 2000) {
      return res.status(400).json({ error: 'Nội dung bài viết tối đa 2000 ký tự' });
    }

    let validLinkUrl = post.link_url;
    if (link_url !== undefined) {
      if (link_url && typeof link_url === 'string' && link_url.trim()) {
        const trimmed = link_url.trim();
        if (!/^https?:\/\//i.test(trimmed)) {
          return res.status(400).json({ error: 'Đường dẫn liên kết phải bắt đầu bằng http:// hoặc https://' });
        }
        validLinkUrl = trimmed.slice(0, 500);
      } else {
        validLinkUrl = null;
      }
    }

    let validMediaUrl = post.media_url;
    if (media_url !== undefined) {
      validMediaUrl = media_url ? String(media_url).trim().slice(0, 500) : null;
    }

    await db.query(
      `UPDATE community_posts SET content = ?, media_url = ?, link_url = ? WHERE id = ?`,
      [cleanContent, validMediaUrl, validLinkUrl, postId]
    );

    // Cập nhật lại tags
    const normalizedTags = extractAndNormalizeTags(cleanContent, tags);
    await db.query(`DELETE FROM community_post_tags WHERE post_id = ?`, [postId]);
    if (normalizedTags.length > 0) {
      const tagInserts = normalizedTags.map(tag => [postId, tag]);
      await db.query(`INSERT IGNORE INTO community_post_tags (post_id, tag) VALUES ?`, [tagInserts]);
    }

    res.json({
      success: true,
      message: 'Cập nhật bài viết thành công!',
      tags: normalizedTags
    });

  } catch (error) {
    console.error('Lỗi updatePost:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi cập nhật bài viết' });
  }
};

// DELETE /api/community/posts/:id
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const user = req.user;

    const [rows] = await db.query('SELECT * FROM community_posts WHERE id = ?', [postId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy bài viết' });
    }
    const post = rows[0];

    // Quyền: Tác giả hoặc Admin hoặc Owner
    const isAuthor = post.user_id === user.id;
    const isAdmin = user.role === 'admin' || user.role === 'owner';

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ error: 'You không có quyền xóa bài viết này' });
    }

    await db.query('DELETE FROM community_posts WHERE id = ?', [postId]);
    res.json({ success: true, message: 'Đã xóa bài viết thành công' });

  } catch (error) {
    console.error('Lỗi deletePost:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi xóa bài viết' });
  }
};

// ==========================================
// 2. LIKE & COMMENTS
// ==========================================

// POST /api/community/posts/:id/like (Toggle)
exports.toggleLike = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const [postRows] = await db.query('SELECT id, user_id FROM community_posts WHERE id = ?', [postId]);
    if (postRows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy bài viết' });
    }
    const post = postRows[0];

    const [likeRows] = await db.query(
      'SELECT * FROM community_likes WHERE post_id = ? AND user_id = ?',
      [postId, userId]
    );

    let liked = false;
    if (likeRows.length > 0) {
      // Đã like -> Hủy like
      await db.query('DELETE FROM community_likes WHERE post_id = ? AND user_id = ?', [postId, userId]);
      liked = false;
    } else {
      // Chưa like -> Thêm like
      await db.query('INSERT INTO community_likes (post_id, user_id) VALUES (?, ?)', [postId, userId]);
      liked = true;
      // Tạo thông báo cho chủ bài viết
      await createNotification(post.user_id, userId, 'like', postId);
    }

    const [countRows] = await db.query(
      'SELECT COUNT(*) as likeCount FROM community_likes WHERE post_id = ?',
      [postId]
    );

    res.json({
      success: true,
      liked: liked,
      likeCount: Number(countRows[0].likeCount)
    });

  } catch (error) {
    console.error('Lỗi toggleLike:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi thực hiện like bài viết' });
  }
};

// GET /api/community/posts/:id/comments
exports.getComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const isStaffOrAdmin = req.user && ['staff', 'admin', 'owner'].includes(req.user.role);
    const hiddenFilter = !isStaffOrAdmin ? 'AND (c.is_hidden = 0 OR c.is_hidden IS NULL)' : '';

    const [comments] = await db.query(
      `SELECT c.id, c.post_id, c.user_id, c.content, c.created_at,
              u.full_name, u.username, u.avatar_url, u.role
       FROM community_comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.post_id = ? ${hiddenFilter}
       ORDER BY c.created_at ASC`,
      [postId]
    );

    const formatted = comments.map(c => ({
      id: c.id,
      post_id: c.post_id,
      user_id: c.user_id,
      content: c.content,
      created_at: c.created_at,
      author: {
        id: c.user_id,
        full_name: c.full_name,
        username: c.username,
        avatar_url: c.avatar_url,
        role: c.role
      }
    }));

    res.json({ success: true, comments: formatted });

  } catch (error) {
    console.error('Lỗi getComments:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi lấy danh sách bình luận' });
  }
};

// POST /api/community/posts/:id/comments
exports.createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const { content } = req.body;

    if (!content || typeof content !== 'string' || !content.trim()) {
      return res.status(400).json({ error: 'Nội dung bình luận không được để trống' });
    }
    const cleanContent = content.trim();
    if (cleanContent.length > 1000) {
      return res.status(400).json({ error: 'Nội dung bình luận tối đa 1000 ký tự' });
    }

    const [postRows] = await db.query('SELECT id, user_id FROM community_posts WHERE id = ?', [postId]);
    if (postRows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy bài viết' });
    }
    const post = postRows[0];

    const [result] = await db.query(
      'INSERT INTO community_comments (post_id, user_id, content) VALUES (?, ?, ?)',
      [postId, userId, cleanContent]
    );

    // Gửi thông báo cho chủ bài viết
    await createNotification(post.user_id, userId, 'comment', postId);

    // Lấy lại comment vừa tạo
    const [cRows] = await db.query(
      `SELECT c.id, c.post_id, c.user_id, c.content, c.created_at,
              u.full_name, u.username, u.avatar_url, u.role
       FROM community_comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.id = ?`,
      [result.insertId]
    );

    const c = cRows[0];
    res.status(201).json({
      success: true,
      message: 'Bình luận thành công!',
      comment: {
        id: c.id,
        post_id: c.post_id,
        user_id: c.user_id,
        content: c.content,
        created_at: c.created_at,
        author: {
          id: c.user_id,
          full_name: c.full_name,
          username: c.username,
          avatar_url: c.avatar_url,
          role: c.role
        }
      }
    });

  } catch (error) {
    console.error('Lỗi createComment:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi gửi bình luận' });
  }
};

// DELETE /api/community/comments/:id
exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const user = req.user;

    const [rows] = await db.query('SELECT * FROM community_comments WHERE id = ?', [commentId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy bình luận' });
    }
    const comment = rows[0];

    const isAuthor = comment.user_id === user.id;
    const isAdmin = user.role === 'admin' || user.role === 'owner';

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ error: 'You không có quyền xóa bình luận này' });
    }

    await db.query('DELETE FROM community_comments WHERE id = ?', [commentId]);
    res.json({ success: true, message: 'Đã xóa bình luận thành công' });

  } catch (error) {
    console.error('Lỗi deleteComment:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi xóa bình luận' });
  }
};

// ==========================================
// 3. POLL (BÌNH CHỌN)
// ==========================================

// POST /api/community/posts/:id/vote
exports.votePoll = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const { option_id } = req.body;

    if (!option_id) {
      return res.status(400).json({ error: 'Vui lòng chọn một phương án bình chọn' });
    }

    const [postRows] = await db.query('SELECT * FROM community_posts WHERE id = ?', [postId]);
    if (postRows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy bài viết' });
    }
    const post = postRows[0];
    if (post.kind !== 'poll') {
      return res.status(400).json({ error: 'Bài viết này không phải loại bình chọn' });
    }

    // Kiểm tra option_id có thuộc về post_id này không
    const [optRows] = await db.query(
      'SELECT id FROM community_poll_options WHERE id = ? AND post_id = ?',
      [option_id, postId]
    );
    if (optRows.length === 0) {
      return res.status(400).json({ error: 'Lựa chọn bình chọn không hợp lệ' });
    }

    // Kiểm tra xem user đã vote chưa (mỗi user 1 phiếu/poll)
    const [existingVote] = await db.query(
      'SELECT id, option_id FROM community_poll_votes WHERE post_id = ? AND user_id = ?',
      [postId, userId]
    );

    if (existingVote.length > 0) {
      return res.status(400).json({ error: 'You đã tham gia bình chọn cho bài viết này rồi' });
    }

    // Ghi nhận phiếu bầu
    await db.query(
      'INSERT INTO community_poll_votes (option_id, post_id, user_id) VALUES (?, ?, ?)',
      [option_id, postId, userId]
    );

    // Tính lại kết quả poll
    const [allOptions] = await db.query(
      `SELECT o.id, o.label,
        (SELECT COUNT(*) FROM community_poll_votes WHERE option_id = o.id) AS voteCount
       FROM community_poll_options o
       WHERE o.post_id = ?`,
      [postId]
    );

    let totalVotes = 0;
    const formattedOptions = allOptions.map(o => {
      const count = Number(o.voteCount);
      totalVotes += count;
      return { id: o.id, label: o.label, voteCount: count };
    });

    res.json({
      success: true,
      message: 'Bình chọn thành công!',
      poll: {
        totalVotes,
        myVoteOptionId: option_id,
        options: formattedOptions.map(o => ({
          ...o,
          percentage: totalVotes > 0 ? Math.round((o.voteCount / totalVotes) * 100) : 0
        }))
      }
    });

  } catch (error) {
    console.error('Lỗi votePoll:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi bỏ phiếu bình chọn' });
  }
};

// ==========================================
// 4. TRENDING & TOP CONTRIBUTORS
// ==========================================

// GET /api/community/trending
exports.getTrending = async (req, res) => {
  try {
    // 1. Thử lấy top tags trong 7 ngày gần nhất
    const [recentTags] = await db.query(
      `SELECT t.tag, COUNT(*) AS count
       FROM community_post_tags t
       JOIN community_posts p ON t.post_id = p.id
       WHERE p.created_at >= NOW() - INTERVAL 7 DAY
       GROUP BY t.tag
       ORDER BY count DESC
       LIMIT 10`
    );

    if (recentTags.length >= 5) {
      return res.json({ success: true, trending: recentTags });
    }

    // 2. Fallback toàn thời gian nếu trong 7 ngày ít dữ liệu
    const [allTimeTags] = await db.query(
      `SELECT t.tag, COUNT(*) AS count
       FROM community_post_tags t
       JOIN community_posts p ON t.post_id = p.id
       GROUP BY t.tag
       ORDER BY count DESC
       LIMIT 10`
    );

    res.json({ success: true, trending: allTimeTags });

  } catch (error) {
    console.error('Lỗi getTrending:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi lấy trending topics' });
  }
};

// GET /api/community/top-contributors
// Điểm = bài*3 + comment*2 + like nhận được
exports.getTopContributors = async (req, res) => {
  try {
    const [contributors] = await db.query(
      `SELECT 
        u.id, u.full_name, u.username, u.avatar_url, u.role,
        COALESCE(p.post_count, 0) AS post_count,
        COALESCE(c.comment_count, 0) AS comment_count,
        COALESCE(l.like_received_count, 0) AS like_received_count,
        (COALESCE(p.post_count, 0) * 3 + COALESCE(c.comment_count, 0) * 2 + COALESCE(l.like_received_count, 0)) AS score
      FROM users u
      LEFT JOIN (
        SELECT user_id, COUNT(*) AS post_count FROM community_posts GROUP BY user_id
      ) p ON u.id = p.user_id
      LEFT JOIN (
        SELECT user_id, COUNT(*) AS comment_count FROM community_comments GROUP BY user_id
      ) c ON u.id = c.user_id
      LEFT JOIN (
        SELECT cp.user_id, COUNT(*) AS like_received_count 
        FROM community_likes cl
        JOIN community_posts cp ON cl.post_id = cp.id
        GROUP BY cp.user_id
      ) l ON u.id = l.user_id
      WHERE u.status = 'active'
      ORDER BY score DESC, post_count DESC, u.id ASC
      LIMIT 10`
    );

    const formatted = contributors.map(c => ({
      id: c.id,
      name: c.full_name || c.username.split('@')[0],
      username: c.username,
      avatar_url: c.avatar_url,
      role: c.role,
      post_count: Number(c.post_count),
      comment_count: Number(c.comment_count),
      like_received_count: Number(c.like_received_count),
      score: Number(c.score)
    }));

    res.json({ success: true, contributors: formatted });

  } catch (error) {
    console.error('Lỗi getTopContributors:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi lấy danh sách top contributors' });
  }
};

// ==========================================
// 5. DISCUSSIONS (THẢO LUẬN)
// ==========================================

// GET /api/community/discussions (?tag=, ?q=, ?page=, ?limit=)
exports.getDiscussions = async (req, res) => {
  try {
    const isStaffOrAdmin = req.user && ['staff', 'admin', 'owner'].includes(req.user.role);
    const { tag, q } = req.query;
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const offset = (page - 1) * limit;

    const whereClauses = [];
    const params = [];

    // Lọc bỏ thảo luận bị ẩn nếu không phải staff/admin/owner
    if (!isStaffOrAdmin) {
      whereClauses.push('(d.is_hidden = 0 OR d.is_hidden IS NULL)');
    }

    if (tag && tag.trim() && tag.trim().toLowerCase() !== 'all') {
      whereClauses.push('d.tag = ?');
      params.push(tag.trim().toLowerCase());
    }

    if (q && q.trim()) {
      whereClauses.push('(d.title LIKE ? OR d.body LIKE ?)');
      const term = `%${q.trim()}%`;
      params.push(term, term);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const [countRows] = await db.query(
      `SELECT COUNT(*) AS total FROM community_discussions d ${whereSql}`,
      params
    );
    const totalDiscussions = countRows[0].total;
    const totalPages = Math.ceil(totalDiscussions / limit) || 1;

    const [discussions] = await db.query(
      `SELECT d.id, d.user_id, d.title, d.body, d.tag, d.created_at,
              u.full_name, u.username, u.avatar_url, u.role,
              (SELECT COUNT(*) FROM community_discussion_replies WHERE discussion_id = d.id) AS replyCount
       FROM community_discussions d
       JOIN users u ON d.user_id = u.id
       ${whereSql}
       ORDER BY d.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    const formatted = discussions.map(d => ({
      id: d.id,
      title: d.title,
      body: d.body,
      tag: d.tag,
      created_at: d.created_at,
      replyCount: Number(d.replyCount),
      author: {
        id: d.user_id,
        full_name: d.full_name,
        username: d.username,
        avatar_url: d.avatar_url,
        role: d.role
      }
    }));

    res.json({
      success: true,
      discussions: formatted,
      pagination: { page, limit, totalDiscussions, totalPages }
    });

  } catch (error) {
    console.error('Lỗi getDiscussions:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi lấy danh sách thảo luận' });
  }
};

// GET /api/community/discussions/:id
exports.getDiscussionDetail = async (req, res) => {
  try {
    const discussionId = req.params.id;
    const isStaffOrAdmin = req.user && ['staff', 'admin', 'owner'].includes(req.user.role);

    const [dRows] = await db.query(
      `SELECT d.id, d.user_id, d.title, d.body, d.tag, d.is_hidden, d.created_at,
              u.full_name, u.username, u.avatar_url, u.role
       FROM community_discussions d
       JOIN users u ON d.user_id = u.id
       WHERE d.id = ?`,
      [discussionId]
    );

    if (dRows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy cuộc thảo luận' });
    }
    const d = dRows[0];

    // Chặn người dùng thường xem thảo luận đã bị ẩn
    if (d.is_hidden && !isStaffOrAdmin) {
      return res.status(404).json({ error: 'Cuộc thảo luận này đã bị ẩn do vi phạm tiêu chuẩn cộng đồng.' });
    }

    const replyHiddenFilter = !isStaffOrAdmin ? 'AND (r.is_hidden = 0 OR r.is_hidden IS NULL)' : '';
    const [replies] = await db.query(
      `SELECT r.id, r.discussion_id, r.user_id, r.content, r.created_at,
              u.full_name, u.username, u.avatar_url, u.role
       FROM community_discussion_replies r
       JOIN users u ON r.user_id = u.id
       WHERE r.discussion_id = ? ${replyHiddenFilter}
       ORDER BY r.created_at ASC`,
      [discussionId]
    );

    res.json({
      success: true,
      discussion: {
        id: d.id,
        title: d.title,
        body: d.body,
        tag: d.tag,
        created_at: d.created_at,
        author: {
          id: d.user_id,
          full_name: d.full_name,
          username: d.username,
          avatar_url: d.avatar_url,
          role: d.role
        }
      },
      replies: replies.map(r => ({
        id: r.id,
        discussion_id: r.discussion_id,
        user_id: r.user_id,
        content: r.content,
        created_at: r.created_at,
        author: {
          id: r.user_id,
          full_name: r.full_name,
          username: r.username,
          avatar_url: r.avatar_url,
          role: r.role
        }
      }))
    });

  } catch (error) {
    console.error('Lỗi getDiscussionDetail:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi lấy chi tiết thảo luận' });
  }
};

// POST /api/community/discussions
exports.createDiscussion = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, body, tag = 'general' } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Tiêu đề thảo luận không được để trống' });
    }
    const cleanTitle = title.trim();
    if (cleanTitle.length > 255) {
      return res.status(400).json({ error: 'Tiêu đề tối đa 255 ký tự' });
    }

    if (!body || typeof body !== 'string' || !body.trim()) {
      return res.status(400).json({ error: 'Nội dung thảo luận không được để trống' });
    }
    const cleanBody = body.trim();
    if (cleanBody.length > 5000) {
      return res.status(400).json({ error: 'Nội dung thảo luận tối đa 5000 ký tự' });
    }

    const cleanTag = tag ? String(tag).trim().toLowerCase().slice(0, 50) : 'general';

    const [result] = await db.query(
      `INSERT INTO community_discussions (user_id, title, body, tag) VALUES (?, ?, ?, ?)`,
      [userId, cleanTitle, cleanBody, cleanTag]
    );

    res.status(201).json({
      success: true,
      message: 'Tạo cuộc thảo luận thành công!',
      discussionId: result.insertId
    });

  } catch (error) {
    console.error('Lỗi createDiscussion:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi tạo thảo luận' });
  }
};

// POST /api/community/discussions/:id/replies
exports.createDiscussionReply = async (req, res) => {
  try {
    const discussionId = req.params.id;
    const userId = req.user.id;
    const { content } = req.body;

    if (!content || typeof content !== 'string' || !content.trim()) {
      return res.status(400).json({ error: 'Nội dung phản hồi không được để trống' });
    }
    const cleanContent = content.trim();
    if (cleanContent.length > 1000) {
      return res.status(400).json({ error: 'Nội dung phản hồi tối đa 1000 ký tự' });
    }

    const [dRows] = await db.query('SELECT id, user_id FROM community_discussions WHERE id = ?', [discussionId]);
    if (dRows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy cuộc thảo luận' });
    }
    const discussion = dRows[0];

    const [result] = await db.query(
      'INSERT INTO community_discussion_replies (discussion_id, user_id, content) VALUES (?, ?, ?)',
      [discussionId, userId, cleanContent]
    );

    // Thông báo cho chủ topic
    await createNotification(discussion.user_id, userId, 'reply', null);

    const [rRows] = await db.query(
      `SELECT r.id, r.discussion_id, r.user_id, r.content, r.created_at,
              u.full_name, u.username, u.avatar_url, u.role
       FROM community_discussion_replies r
       JOIN users u ON r.user_id = u.id
       WHERE r.id = ?`,
      [result.insertId]
    );

    const reply = rRows[0];
    res.status(201).json({
      success: true,
      message: 'Gửi phản hồi thành công!',
      reply: {
        id: reply.id,
        discussion_id: reply.discussion_id,
        user_id: reply.user_id,
        content: reply.content,
        created_at: reply.created_at,
        author: {
          id: reply.user_id,
          full_name: reply.full_name,
          username: reply.username,
          avatar_url: reply.avatar_url,
          role: reply.role
        }
      }
    });

  } catch (error) {
    console.error('Lỗi createDiscussionReply:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi gửi phản hồi thảo luận' });
  }
};

// DELETE /api/community/discussions/:id
exports.deleteDiscussion = async (req, res) => {
  try {
    const discussionId = req.params.id;
    const user = req.user;

    const [rows] = await db.query('SELECT * FROM community_discussions WHERE id = ?', [discussionId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy cuộc thảo luận' });
    }
    const discussion = rows[0];

    const isAuthor = discussion.user_id === user.id;
    const isAdmin = user.role === 'admin' || user.role === 'owner';

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ error: 'You không có quyền xóa cuộc thảo luận này' });
    }

    await db.query('DELETE FROM community_discussions WHERE id = ?', [discussionId]);
    res.json({ success: true, message: 'Đã xóa cuộc thảo luận thành công' });

  } catch (error) {
    console.error('Lỗi deleteDiscussion:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi xóa thảo luận' });
  }
};

// DELETE /api/community/discussions/replies/:replyId
exports.deleteDiscussionReply = async (req, res) => {
  try {
    const replyId = req.params.replyId;
    const user = req.user;

    const [rows] = await db.query('SELECT * FROM community_discussion_replies WHERE id = ?', [replyId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy câu trả lời thảo luận' });
    }
    const reply = rows[0];

    const isAuthor = reply.user_id === user.id;
    const isAdmin = user.role === 'admin' || user.role === 'owner';

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ error: 'You không có quyền xóa phản hồi này' });
    }

    await db.query('DELETE FROM community_discussion_replies WHERE id = ?', [replyId]);
    res.json({ success: true, message: 'Đã xóa phản hồi thảo luận thành công' });

  } catch (error) {
    console.error('Lỗi deleteDiscussionReply:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi xóa phản hồi thảo luận' });
  }
};

// ==========================================
// 6. GROUPS (NHÓM)
// ==========================================

// GET /api/community/groups
exports.getGroups = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    const [groups] = await db.query(
      `SELECT g.id, g.name, g.description, g.created_by, g.created_at,
              (SELECT COUNT(*) FROM community_group_members WHERE group_id = g.id) AS memberCount,
              EXISTS(SELECT 1 FROM community_group_members WHERE group_id = g.id AND user_id = ?) AS isMember
       FROM community_groups g
       ORDER BY g.created_at DESC`,
      [currentUserId]
    );

    res.json({
      success: true,
      groups: groups.map(g => ({
        id: g.id,
        name: g.name,
        description: g.description,
        created_by: g.created_by,
        created_at: g.created_at,
        memberCount: Number(g.memberCount),
        isMember: Boolean(g.isMember)
      }))
    });

  } catch (error) {
    console.error('Lỗi getGroups:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi lấy danh sách nhóm' });
  }
};

// POST /api/community/groups (Chỉ Admin/Owner/Staff)
exports.createGroup = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, description } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Tên nhóm không được để trống' });
    }
    const cleanName = name.trim();
    if (cleanName.length > 100) {
      return res.status(400).json({ error: 'Tên nhóm tối đa 100 ký tự' });
    }

    const cleanDesc = description ? String(description).trim().slice(0, 1000) : '';

    const [result] = await db.query(
      'INSERT INTO community_groups (name, description, created_by) VALUES (?, ?, ?)',
      [cleanName, cleanDesc, userId]
    );
    const groupId = result.insertId;

    // Tự động thêm người tạo vào làm thành viên nhóm
    await db.query(
      'INSERT INTO community_group_members (group_id, user_id) VALUES (?, ?)',
      [groupId, userId]
    );

    res.status(201).json({
      success: true,
      message: 'Tạo nhóm thành công!',
      groupId: groupId
    });

  } catch (error) {
    console.error('Lỗi createGroup:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi tạo nhóm' });
  }
};

// GET /api/community/groups/:id
exports.getGroupDetail = async (req, res) => {
  try {
    const groupId = req.params.id;
    const currentUserId = req.user.id;

    const [gRows] = await db.query('SELECT * FROM community_groups WHERE id = ?', [groupId]);
    if (gRows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy nhóm' });
    }
    const group = gRows[0];

    const [members] = await db.query(
      `SELECT u.id, u.full_name, u.username, u.avatar_url, u.role, gm.joined_at
       FROM community_group_members gm
       JOIN users u ON gm.user_id = u.id
       WHERE gm.group_id = ?
       ORDER BY gm.joined_at ASC`,
      [groupId]
    );

    const isMember = members.some(m => m.id === currentUserId);

    res.json({
      success: true,
      group: {
        id: group.id,
        name: group.name,
        description: group.description,
        created_by: group.created_by,
        created_at: group.created_at,
        memberCount: members.length,
        isMember: isMember,
        members: members.map(m => ({
          id: m.id,
          full_name: m.full_name,
          username: m.username,
          avatar_url: m.avatar_url,
          role: m.role,
          joined_at: m.joined_at
        }))
      }
    });

  } catch (error) {
    console.error('Lỗi getGroupDetail:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi lấy chi tiết nhóm' });
  }
};

// POST /api/community/groups/:id/join
exports.joinGroup = async (req, res) => {
  try {
    const groupId = req.params.id;
    const userId = req.user.id;

    const [gRows] = await db.query('SELECT id FROM community_groups WHERE id = ?', [groupId]);
    if (gRows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy nhóm' });
    }

    await db.query(
      'INSERT IGNORE INTO community_group_members (group_id, user_id) VALUES (?, ?)',
      [groupId, userId]
    );

    res.json({ success: true, message: 'Tham gia nhóm thành công!' });

  } catch (error) {
    console.error('Lỗi joinGroup:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi tham gia nhóm' });
  }
};

// POST /api/community/groups/:id/leave
exports.leaveGroup = async (req, res) => {
  try {
    const groupId = req.params.id;
    const userId = req.user.id;

    await db.query(
      'DELETE FROM community_group_members WHERE group_id = ? AND user_id = ?',
      [groupId, userId]
    );

    res.json({ success: true, message: 'Đã rời khỏi nhóm' });

  } catch (error) {
    console.error('Lỗi leaveGroup:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi rời nhóm' });
  }
};

// ==========================================
// 7. LEADERBOARD (BẢNG XẾP HẠNG)
// ==========================================

// GET /api/community/leaderboard (?range=week|month|all)
// Điểm = bài*3 + comment*2 + like nhận được trong khoảng thời gian
exports.getLeaderboard = async (req, res) => {
  try {
    const range = req.query.range || 'all';

    let timeFilterPosts = '';
    let timeFilterComments = '';
    let timeFilterLikes = '';

    if (range === 'week') {
      timeFilterPosts = 'WHERE created_at >= NOW() - INTERVAL 7 DAY';
      timeFilterComments = 'WHERE created_at >= NOW() - INTERVAL 7 DAY';
      timeFilterLikes = 'WHERE cl.created_at >= NOW() - INTERVAL 7 DAY';
    } else if (range === 'month') {
      timeFilterPosts = 'WHERE created_at >= NOW() - INTERVAL 30 DAY';
      timeFilterComments = 'WHERE created_at >= NOW() - INTERVAL 30 DAY';
      timeFilterLikes = 'WHERE cl.created_at >= NOW() - INTERVAL 30 DAY';
    }

    const [rows] = await db.query(
      `SELECT 
        u.id, u.full_name, u.username, u.avatar_url, u.role,
        COALESCE(p.post_count, 0) AS post_count,
        COALESCE(c.comment_count, 0) AS comment_count,
        COALESCE(l.like_received_count, 0) AS like_received_count,
        (COALESCE(p.post_count, 0) * 3 + COALESCE(c.comment_count, 0) * 2 + COALESCE(l.like_received_count, 0)) AS score
      FROM users u
      LEFT JOIN (
        SELECT user_id, COUNT(*) AS post_count FROM community_posts ${timeFilterPosts} GROUP BY user_id
      ) p ON u.id = p.user_id
      LEFT JOIN (
        SELECT user_id, COUNT(*) AS comment_count FROM community_comments ${timeFilterComments} GROUP BY user_id
      ) c ON u.id = c.user_id
      LEFT JOIN (
        SELECT cp.user_id, COUNT(*) AS like_received_count 
        FROM community_likes cl
        JOIN community_posts cp ON cl.post_id = cp.id
        ${timeFilterLikes}
        GROUP BY cp.user_id
      ) l ON u.id = l.user_id
      WHERE u.status = 'active'
      ORDER BY score DESC, post_count DESC, u.id ASC
      LIMIT 50`
    );

    const leaderboard = rows.map((r, index) => ({
      rank: index + 1,
      id: r.id,
      name: r.full_name || r.username.split('@')[0],
      username: r.username,
      avatar_url: r.avatar_url,
      role: r.role,
      post_count: Number(r.post_count),
      comment_count: Number(r.comment_count),
      like_received_count: Number(r.like_received_count),
      score: Number(r.score)
    }));

    res.json({
      success: true,
      range: range,
      leaderboard: leaderboard
    });

  } catch (error) {
    console.error('Lỗi getLeaderboard:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi lấy bảng xếp hạng' });
  }
};

// ==========================================
// 8. NOTIFICATIONS (THÔNG BÁO)
// ==========================================

// Helper xây dựng bộ lọc thông báo dùng chung cho cả getNotifications và getUnreadCount
function buildNotificationFilter(userId, filter = 'all', mute = '') {
  const whereConditions = ['n.user_id = ?'];
  const whereParams = [userId];

  // Chỉ lấy thông báo mà bài viết liên quan còn hiển thị (chưa bị ẩn bởi kiểm duyệt)
  whereConditions.push('(p.id IS NULL OR p.is_hidden = 0 OR p.is_hidden IS NULL)');

  // Bộ lọc trạng thái tab
  if (filter === 'unread') {
    whereConditions.push('n.is_read = 0');
  } else if (filter === 'pinned') {
    whereConditions.push('COALESCE(p.is_pinned, 0) = 1');
  }

  // Bộ lọc mute (whitelist: lecture, community)
  if (mute && typeof mute === 'string') {
    const muteList = mute.split(',').map(m => m.trim().toLowerCase());
    if (muteList.includes('lecture')) {
      whereConditions.push("n.type != 'lecture'");
    }
    if (muteList.includes('community')) {
      // Mute các bài post/group từ thành viên thường và KHÔNG được ghim
      whereConditions.push("NOT (n.type IN ('post', 'group') AND u.role = 'member' AND COALESCE(p.is_pinned, 0) = 0)");
    }
  }

  return { whereConditions, whereParams };
}

// GET /api/community/notifications/unread-count (?mute=)
exports.getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const mute = req.query.mute || '';
    const { whereConditions, whereParams } = buildNotificationFilter(userId, 'unread', mute);
    const whereSql = `WHERE ${whereConditions.join(' AND ')}`;

    const [unreadRows] = await db.query(
      `SELECT COUNT(*) as unreadCount
       FROM community_notifications n
       JOIN users u ON n.actor_id = u.id
       LEFT JOIN community_posts p ON n.post_id = p.id
       ${whereSql}`,
      whereParams
    );
    const count = Number(unreadRows[0].unreadCount || 0);
    res.json({
      success: true,
      unreadCount: count,
      unread_count: count
    });
  } catch (error) {
    console.error('Lỗi getUnreadCount:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi lấy số thông báo chưa đọc' });
  }
};

// GET /api/community/notifications (?page=, ?limit=, ?filter=all|unread|pinned, ?mute=)
exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const offset = (page - 1) * limit;
    const filter = (req.query.filter || 'all').toLowerCase();
    const mute = req.query.mute || '';

    const { whereConditions, whereParams } = buildNotificationFilter(userId, filter, mute);
    const whereSql = `WHERE ${whereConditions.join(' AND ')}`;

    // 1. Đếm tổng số lượng thông báo phù hợp bộ lọc
    const [countRows] = await db.query(
      `SELECT COUNT(*) AS total
       FROM community_notifications n
       JOIN users u ON n.actor_id = u.id
       LEFT JOIN community_posts p ON n.post_id = p.id
       ${whereSql}`,
      whereParams
    );
    const total = Number(countRows[0].total || 0);

    // 2. Lấy danh sách thông báo: Ưu tiên bài ghim (is_pinned DESC, pinned_at DESC), sau đó đến created_at DESC
    const queryParams = [...whereParams, limit, offset];
    const [notifications] = await db.query(
      `SELECT n.id, n.user_id, n.actor_id, n.type, n.post_id, n.lecture_id, n.resource_id, n.meta, n.is_read, n.created_at,
              u.full_name AS actor_name, u.username AS actor_username, u.avatar_url AS actor_avatar, u.role AS actor_role,
              p.content AS post_preview, p.kind AS post_kind,
              COALESCE(p.is_pinned, 0) AS is_pinned, p.pinned_at,
              l.title AS lecture_title,
              r.title AS resource_title
       FROM community_notifications n
       JOIN users u ON n.actor_id = u.id
       LEFT JOIN community_posts p ON n.post_id = p.id
       LEFT JOIN lectures l ON n.lecture_id = l.id
       LEFT JOIN resources r ON n.resource_id = r.id
       ${whereSql}
       ORDER BY COALESCE(p.is_pinned, 0) DESC, p.pinned_at DESC, n.created_at DESC
       LIMIT ? OFFSET ?`,
      queryParams
    );

    // 3. Đếm tổng số thông báo chưa đọc theo cùng bộ lọc mute (để cập nhật badge chính xác)
    const { whereConditions: unreadWhereConds, whereParams: unreadWhereParams } = buildNotificationFilter(userId, 'unread', mute);
    const [unreadRows] = await db.query(
      `SELECT COUNT(*) as unreadCount
       FROM community_notifications n
       JOIN users u ON n.actor_id = u.id
       LEFT JOIN community_posts p ON n.post_id = p.id
       WHERE ${unreadWhereConds.join(' AND ')}`,
      unreadWhereParams
    );
    const unreadCount = Number(unreadRows[0].unreadCount || 0);

    const mappedNotifications = notifications.map(n => {
      let excerpt = n.post_preview || null;
      if (excerpt && excerpt.length > 100) {
        excerpt = excerpt.slice(0, 100) + '...';
      }
      const isPinned = Boolean(n.is_pinned);

      // Xác định tiêu đề hiển thị phù hợp loại thông báo
      let title = null;
      if (n.type === 'lecture' && n.lecture_title) {
        title = n.lecture_title;
      } else if (n.type === 'resource' && n.resource_title) {
        title = n.resource_title;
      } else if (excerpt) {
        title = excerpt;
      }

      return {
        id: n.id,
        type: n.type,
        post_id: n.post_id,
        lecture_id: n.lecture_id,
        resource_id: n.resource_id,
        meta: n.meta,
        title: title,
        lecture_title: n.lecture_title || null,
        resource_title: n.resource_title || null,
        is_read: Boolean(n.is_read),
        created_at: n.created_at,
        is_pinned: isPinned,
        pinned_at: n.pinned_at,
        post_kind: n.post_kind || 'post',
        post_excerpt: excerpt,
        post_preview: excerpt, // Tương thích ngược với frontend cũ
        actor: {
          id: n.actor_id,
          name: n.actor_name || (n.actor_username ? n.actor_username.split('@')[0] : 'User'),
          avatar_url: n.actor_avatar,
          role: n.actor_role
        },
        actor_role: n.actor_role
      };
    });

    res.json({
      success: true,
      unreadCount: unreadCount,      // Cho code cũ
      unread_count: unreadCount,     // Chuẩn mới
      notifications: mappedNotifications,
      pagination: {
        page,
        limit,
        total,
        has_more: offset + mappedNotifications.length < total
      }
    });

  } catch (error) {
    console.error('Lỗi getNotifications:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi lấy danh sách thông báo' });
  }
};

// POST /api/community/notifications/read-all
exports.markAllNotificationsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    await db.query('UPDATE community_notifications SET is_read = 1 WHERE user_id = ?', [userId]);
    res.json({ success: true, message: 'Đã đánh dấu tất cả thông báo là đã đọc' });
  } catch (error) {
    console.error('Lỗi markAllNotificationsRead:', error);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};

// POST /api/community/notifications/:id/read
exports.markNotificationRead = async (req, res) => {
  try {
    const notifId = req.params.id;
    const userId = req.user.id;
    const [result] = await db.query('UPDATE community_notifications SET is_read = 1 WHERE id = ? AND user_id = ?', [notifId, userId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Không tìm thấy thông báo hoặc bạn không có quyền' });
    }
    res.json({ success: true, message: 'Đã đánh dấu thông báo là đã đọc' });
  } catch (error) {
    console.error('Lỗi markNotificationRead:', error);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};

// ==========================================
// 9. SEARCH (TÌM KIẾM TỔNG HỢP)
// ==========================================

// GET /api/community/search?q=
exports.searchCommunity = async (req, res) => {
  try {
    const q = req.query.q ? req.query.q.trim() : '';

    if (!q) {
      return res.json({
        success: true,
        results: { members: [], groups: [], discussions: [], topics: [] }
      });
    }

    const searchTerm = `%${q}%`;

    // 1. Members
    const [members] = await db.query(
      `SELECT id, full_name, username, avatar_url, role, bio
       FROM users
       WHERE status = 'active' AND (full_name LIKE ? OR username LIKE ? OR bio LIKE ?)
       LIMIT 10`,
      [searchTerm, searchTerm, searchTerm]
    );

    // 2. Groups
    const [groups] = await db.query(
      `SELECT g.id, g.name, g.description, g.created_at,
              (SELECT COUNT(*) FROM community_group_members WHERE group_id = g.id) AS memberCount
       FROM community_groups g
       WHERE g.name LIKE ? OR g.description LIKE ?
       LIMIT 10`,
      [searchTerm, searchTerm]
    );

    // 3. Discussions
    const isStaffOrAdmin = req.user && ['staff', 'admin', 'owner'].includes(req.user.role);
    const searchHiddenFilter = !isStaffOrAdmin ? 'AND (d.is_hidden = 0 OR d.is_hidden IS NULL)' : '';
    const [discussions] = await db.query(
      `SELECT d.id, d.title, d.body, d.tag, d.created_at,
              u.full_name AS author_name,
              (SELECT COUNT(*) FROM community_discussion_replies WHERE discussion_id = d.id) AS replyCount
       FROM community_discussions d
       JOIN users u ON d.user_id = u.id
       WHERE (d.title LIKE ? OR d.body LIKE ? OR d.tag LIKE ?) ${searchHiddenFilter}
       LIMIT 10`,
      [searchTerm, searchTerm, searchTerm]
    );

    // 4. Topics
    const [topics] = await db.query(
      `SELECT tag, COUNT(*) AS count
       FROM community_post_tags
       WHERE tag LIKE ?
       GROUP BY tag
       ORDER BY count DESC
       LIMIT 10`,
      [searchTerm]
    );

    res.json({
      success: true,
      results: {
        members: members.map(m => ({
          id: m.id,
          name: m.full_name || m.username.split('@')[0],
          username: m.username,
          avatar_url: m.avatar_url,
          role: m.role,
          bio: m.bio
        })),
        groups: groups.map(g => ({
          id: g.id,
          name: g.name,
          description: g.description,
          memberCount: Number(g.memberCount),
          created_at: g.created_at
        })),
        discussions: discussions.map(d => ({
          id: d.id,
          title: d.title,
          excerpt: d.body.length > 120 ? d.body.slice(0, 120) + '...' : d.body,
          tag: d.tag,
          author_name: d.author_name,
          replyCount: Number(d.replyCount),
          created_at: d.created_at
        })),
        topics: topics.map(t => ({
          tag: t.tag,
          count: Number(t.count)
        }))
      }
    });

  } catch (error) {
    console.error('Lỗi searchCommunity:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi tìm kiếm' });
  }
};
