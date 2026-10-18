const db = require('../config/db');

// Helper: Chuyển đổi Date sang định dạng ISO với offset +07:00 (Asia/Saigon)
function formatSaigonISO(date) {
  if (!date) return null;
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return null;
  const tzOffset = 7 * 60; // phút (+07:00)
  const localTime = new Date(d.getTime() + tzOffset * 60 * 1000);
  return localTime.toISOString().replace('Z', '+07:00');
}

// Helper: Lấy chuỗi ngày YYYY-MM-DD theo giờ Asia/Saigon
function getSaigonDateString(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Saigon',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  return formatter.format(d); // Trả về dạng YYYY-MM-DD
}

// Helper: Cộng/trừ ngày theo chuỗi YYYY-MM-DD
function addDays(dateStr, days) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(Date.UTC(year, month - 1, day));
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

// Helper: Tính delta tăng trưởng so với kỳ trước
function calculateDelta(curr, prev) {
  if (prev === 0) {
    if (curr === 0) {
      return { percent: 0, text: 'Không đổi', direction: 'neutral', noBaseline: false };
    }
    return { percent: null, text: `+${curr} mới`, direction: 'up', noBaseline: true };
  }
  const pct = Math.round(((curr - prev) / prev) * 100);
  const sign = pct > 0 ? '↑ ' : pct < 0 ? '↓ ' : '';
  const dir = pct > 0 ? 'up' : pct < 0 ? 'down' : 'neutral';
  return {
    percent: pct,
    text: `${sign}${Math.abs(pct)}% so với kỳ trước`,
    direction: dir,
    noBaseline: false
  };
}

// GET /api/admin/dashboard?range=7d|30d|90d
exports.getDashboardStats = async (req, res) => {
  try {
    const range = (req.query.range || '7d').toLowerCase();
    const daysMap = { '7d': 7, '30d': 30, '90d': 90 };

    if (!daysMap[range]) {
      return res.status(400).json({
        error: 'Khoảng thời gian không hợp lệ. Chỉ chấp nhận: 7d, 30d, 90d.'
      });
    }

    const numDays = daysMap[range];
    const todayStr = getSaigonDateString(new Date());
    const fromStr = addDays(todayStr, -(numDays - 1));
    const prevTo = addDays(fromStr, -1);
    const prevFrom = addDays(prevTo, -(numDays - 1));

    const fromTs = fromStr + ' 00:00:00';
    const toTs = todayStr + ' 23:59:59';
    const prevFromTs = prevFrom + ' 00:00:00';
    const prevToTs = prevTo + ' 23:59:59';

    // 1. Thẻ Users
    const [[{ totalUsers }]] = await db.query('SELECT COUNT(*) as totalUsers FROM users');
    const [[{ newUsersCurr }]] = await db.query(
      'SELECT COUNT(*) as newUsersCurr FROM users WHERE created_at >= ? AND created_at <= ?',
      [fromTs, toTs]
    );
    const [[{ newUsersPrev }]] = await db.query(
      'SELECT COUNT(*) as newUsersPrev FROM users WHERE created_at >= ? AND created_at <= ?',
      [prevFromTs, prevToTs]
    );

    // 2. Thẻ Courses
    const [[{ totalCourses }]] = await db.query('SELECT COUNT(*) as totalCourses FROM courses');
    const [[{ newCoursesCurr }]] = await db.query(
      'SELECT COUNT(*) as newCoursesCurr FROM courses WHERE created_at >= ? AND created_at <= ?',
      [fromTs, toTs]
    );
    const [[{ newCoursesPrev }]] = await db.query(
      'SELECT COUNT(*) as newCoursesPrev FROM courses WHERE created_at >= ? AND created_at <= ?',
      [prevFromTs, prevToTs]
    );

    // 3. Thẻ Posts (Bài viết cộng đồng)
    const [[{ totalPosts }]] = await db.query('SELECT COUNT(*) as totalPosts FROM community_posts');
    const [[{ newPostsCurr }]] = await db.query(
      'SELECT COUNT(*) as newPostsCurr FROM community_posts WHERE created_at >= ? AND created_at <= ?',
      [fromTs, toTs]
    );
    const [[{ newPostsPrev }]] = await db.query(
      'SELECT COUNT(*) as newPostsPrev FROM community_posts WHERE created_at >= ? AND created_at <= ?',
      [prevFromTs, prevToTs]
    );

    // 4. Thẻ Resources (Tài liệu thư viện & Lượt tải)
    const [[resSummary]] = await db.query(
      'SELECT COUNT(*) as totalResources, COALESCE(SUM(downloads), 0) as totalDownloads FROM resources'
    );
    const [[{ newResCurr }]] = await db.query(
      'SELECT COUNT(*) as newResCurr FROM resources WHERE created_at >= ? AND created_at <= ?',
      [fromTs, toTs]
    );
    const [[{ newResPrev }]] = await db.query(
      'SELECT COUNT(*) as newResPrev FROM resources WHERE created_at >= ? AND created_at <= ?',
      [prevFromTs, prevToTs]
    );

    // 5. Phân bố vai trò (Roles)
    const [roleRows] = await db.query('SELECT role, COUNT(*) as count FROM users GROUP BY role');
    const roleCountMap = { owner: 0, admin: 0, staff: 0, member: 0 };
    roleRows.forEach((r) => {
      if (roleCountMap[r.role] !== undefined) roleCountMap[r.role] = Number(r.count);
    });

    const totalUsersNum = Number(totalUsers) || 1;
    const roles = [
      {
        role: 'owner',
        label: 'Owner',
        count: roleCountMap.owner,
        percent: Math.round((roleCountMap.owner / totalUsersNum) * 100)
      },
      {
        role: 'admin',
        label: 'Admin',
        count: roleCountMap.admin,
        percent: Math.round((roleCountMap.admin / totalUsersNum) * 100)
      },
      {
        role: 'staff',
        label: 'Staff',
        count: roleCountMap.staff,
        percent: Math.round((roleCountMap.staff / totalUsersNum) * 100)
      },
      {
        role: 'member',
        label: 'Member',
        count: roleCountMap.member,
        percent: Math.round((roleCountMap.member / totalUsersNum) * 100)
      }
    ];

    // 6. Needs attention (Tài khoản chờ duyệt + Báo cáo vi phạm mở)
    const [[{ pendingAccounts }]] = await db.query(
      "SELECT COUNT(*) as pendingAccounts FROM users WHERE status = 'pending'"
    );

    let openReports = 0;
    try {
      const [[rep]] = await db.query(
        "SELECT COUNT(*) as openReports FROM community_reports WHERE status = 'open'"
      );
      if (rep) openReports = Number(rep.openReports);
    } catch (e) {
      // Bảng community_reports chưa được tạo (Giai đoạn 4 sẽ tạo)
      openReports = 0;
    }

    // 7. Tạo danh sách các ngày trong kỳ
    const dateList = [];
    for (let i = 0; i < numDays; i++) {
      dateList.push(addDays(fromStr, i));
    }

    // Lấy thống kê đăng ký theo ngày
    const [userRegRows] = await db.query(
      `SELECT DATE_FORMAT(created_at, '%Y-%m-%d') as reg_date, COUNT(*) as count
       FROM users
       WHERE created_at >= ? AND created_at <= ?
       GROUP BY reg_date`,
      [fromTs, toTs]
    );
    const userRegMap = {};
    userRegRows.forEach((r) => (userRegMap[r.reg_date] = Number(r.count)));

    // Lấy hoạt động nội dung (Posts + Comments + Discussions + Replies + Resources + Courses + Lectures + User Registrations)
    const [contentRows] = await db.query(
      `SELECT act_date, COUNT(*) as count FROM (
        (SELECT DATE_FORMAT(created_at, '%Y-%m-%d') as act_date FROM community_posts WHERE created_at >= ? AND created_at <= ?)
        UNION ALL
        (SELECT DATE_FORMAT(created_at, '%Y-%m-%d') as act_date FROM community_comments WHERE created_at >= ? AND created_at <= ?)
        UNION ALL
        (SELECT DATE_FORMAT(created_at, '%Y-%m-%d') as act_date FROM community_discussions WHERE created_at >= ? AND created_at <= ?)
        UNION ALL
        (SELECT DATE_FORMAT(created_at, '%Y-%m-%d') as act_date FROM community_discussion_replies WHERE created_at >= ? AND created_at <= ?)
        UNION ALL
        (SELECT DATE_FORMAT(created_at, '%Y-%m-%d') as act_date FROM resources WHERE created_at >= ? AND created_at <= ?)
        UNION ALL
        (SELECT DATE_FORMAT(created_at, '%Y-%m-%d') as act_date FROM courses WHERE created_at >= ? AND created_at <= ?)
        UNION ALL
        (SELECT DATE_FORMAT(created_at, '%Y-%m-%d') as act_date FROM lectures WHERE created_at >= ? AND created_at <= ?)
        UNION ALL
        (SELECT DATE_FORMAT(created_at, '%Y-%m-%d') as act_date FROM users WHERE created_at >= ? AND created_at <= ?)
      ) as combined_activity
      GROUP BY act_date`,
      [fromTs, toTs, fromTs, toTs, fromTs, toTs, fromTs, toTs, fromTs, toTs, fromTs, toTs, fromTs, toTs, fromTs, toTs]
    );
    const contentMap = {};
    contentRows.forEach((r) => (contentMap[r.act_date] = Number(r.count)));

    // Active Users (Người dùng hoạt động)
    let activeMap = {};
    let activeSince = null;
    try {
      const [actRows] = await db.query(
        `SELECT DATE_FORMAT(activity_date, '%Y-%m-%d') as act_date, COUNT(DISTINCT user_id) as count
         FROM user_activity_daily
         WHERE activity_date >= ? AND activity_date <= ?
         GROUP BY act_date`,
        [fromStr, todayStr]
      );
      actRows.forEach((r) => (activeMap[r.act_date] = Number(r.count)));

      const [[firstRow]] = await db.query(
        'SELECT MIN(activity_date) as firstDate FROM user_activity_daily'
      );
      if (firstRow && firstRow.firstDate) {
        activeSince = getSaigonDateString(firstRow.firstDate);
      }
    } catch (e) {
      // Bảng chưa có trước Giai đoạn 2
      activeMap = {};
    }

    const series = {
      newUsers: dateList.map((d) => ({ date: d, count: userRegMap[d] || 0 })),
      contentActivity: dateList.map((d) => ({ date: d, count: contentMap[d] || 0 })),
      activeUsers: dateList.map((d) => ({ date: d, count: activeMap[d] || 0 })),
      activeSince: activeSince
    };

    return res.json({
      success: true,
      generatedAt: formatSaigonISO(new Date()),
      range: {
        code: range,
        from: fromStr,
        to: todayStr,
        days: numDays,
        label: `${fromStr.slice(5)} đến ${todayStr.slice(5)}`
      },
      cards: {
        users: {
          total: Number(totalUsers),
          newInRange: Number(newUsersCurr),
          newPrev: Number(newUsersPrev),
          delta: calculateDelta(Number(newUsersCurr), Number(newUsersPrev))
        },
        courses: {
          total: Number(totalCourses),
          newInRange: Number(newCoursesCurr),
          newPrev: Number(newCoursesPrev),
          delta: calculateDelta(Number(newCoursesCurr), Number(newCoursesPrev))
        },
        posts: {
          total: Number(totalPosts),
          newInRange: Number(newPostsCurr),
          newPrev: Number(newPostsPrev),
          delta: calculateDelta(Number(newPostsCurr), Number(newPostsPrev))
        },
        resources: {
          total: Number(resSummary.totalResources || 0),
          downloads: Number(resSummary.totalDownloads || 0),
          newInRange: Number(newResCurr),
          newPrev: Number(newResPrev),
          delta: calculateDelta(Number(newResCurr), Number(newResPrev))
        }
      },
      roles,
      series,
      needsAttention: {
        pendingAccounts: Number(pendingAccounts),
        openReports: Number(openReports)
      }
    });
  } catch (error) {
    console.error('Lỗi getDashboardStats:', error);
    return res.status(500).json({ error: 'Lỗi máy chủ khi lấy dữ liệu dashboard' });
  }
};

// GET /api/admin/activity?limit=10&page=1&type=
exports.getSystemActivity = async (req, res) => {
  try {
    let limit = parseInt(req.query.limit, 10) || 10;
    if (limit < 1) limit = 10;
    if (limit > 50) limit = 50;

    let page = parseInt(req.query.page, 10) || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * limit;

    const filterType = req.query.type ? req.query.type.trim() : null;

    // Subqueries định nghĩa hoạt động (sử dụng CAST để chuẩn hóa kiểu dữ liệu và collation tránh lỗi collation mix)
    const queries = [
      `SELECT CAST('user_registered' AS CHAR(50)) as type, CAST(u.id AS SIGNED) as actor_id, CAST(COALESCE(u.full_name, SUBSTRING_INDEX(u.username, '@', 1)) AS CHAR(100)) as actor_name, CAST(u.avatar_url AS CHAR(255)) as actor_avatar, CAST('đã đăng ký tài khoản mới' AS CHAR(100)) as action_desc, CAST(NULL AS CHAR(255)) as target, CAST('/pages/admin/admin.html?tab=users' AS CHAR(100)) as href, u.created_at as at FROM users u`,
      `SELECT CAST('course_created' AS CHAR(50)) as type, CAST(NULL AS SIGNED) as actor_id, CAST('Hệ thống' AS CHAR(100)) as actor_name, CAST(NULL AS CHAR(255)) as actor_avatar, CAST('đã tạo môn học mới' AS CHAR(100)) as action_desc, CAST(c.name AS CHAR(255)) as target, CAST('/pages/lectures/lectures.html' AS CHAR(100)) as href, c.created_at as at FROM courses c`,
      `SELECT CAST('lecture_created' AS CHAR(50)) as type, CAST(NULL AS SIGNED) as actor_id, CAST('Hệ thống' AS CHAR(100)) as actor_name, CAST(NULL AS CHAR(255)) as actor_avatar, CAST('đã thêm bài giảng' AS CHAR(100)) as action_desc, CAST(l.title AS CHAR(255)) as target, CAST('/pages/lectures/lectures.html' AS CHAR(100)) as href, l.created_at as at FROM lectures l`,
      `SELECT CAST('post_created' AS CHAR(50)) as type, CAST(u.id AS SIGNED) as actor_id, CAST(COALESCE(u.full_name, SUBSTRING_INDEX(u.username, '@', 1)) AS CHAR(100)) as actor_name, CAST(u.avatar_url AS CHAR(255)) as actor_avatar, CAST('đã đăng bài viết mới' AS CHAR(100)) as action_desc, CAST(SUBSTRING(p.content, 1, 60) AS CHAR(255)) as target, CAST('/pages/community/community_feed.html' AS CHAR(100)) as href, p.created_at as at FROM community_posts p JOIN users u ON p.user_id = u.id`,
      `SELECT CAST('comment_created' AS CHAR(50)) as type, CAST(u.id AS SIGNED) as actor_id, CAST(COALESCE(u.full_name, SUBSTRING_INDEX(u.username, '@', 1)) AS CHAR(100)) as actor_name, CAST(u.avatar_url AS CHAR(255)) as actor_avatar, CAST('đã bình luận bài viết' AS CHAR(100)) as action_desc, CAST(SUBSTRING(c.content, 1, 60) AS CHAR(255)) as target, CAST('/pages/community/community_feed.html' AS CHAR(100)) as href, c.created_at as at FROM community_comments c JOIN users u ON c.user_id = u.id`,
      `SELECT CAST('discussion_created' AS CHAR(50)) as type, CAST(u.id AS SIGNED) as actor_id, CAST(COALESCE(u.full_name, SUBSTRING_INDEX(u.username, '@', 1)) AS CHAR(100)) as actor_name, CAST(u.avatar_url AS CHAR(255)) as actor_avatar, CAST('đã tạo chủ đề thảo luận' AS CHAR(100)) as action_desc, CAST(SUBSTRING(d.title, 1, 60) AS CHAR(255)) as target, CAST('/pages/community/community_discussion.html' AS CHAR(100)) as href, d.created_at as at FROM community_discussions d JOIN users u ON d.user_id = u.id`,
      `SELECT CAST('reply_created' AS CHAR(50)) as type, CAST(u.id AS SIGNED) as actor_id, CAST(COALESCE(u.full_name, SUBSTRING_INDEX(u.username, '@', 1)) AS CHAR(100)) as actor_name, CAST(u.avatar_url AS CHAR(255)) as actor_avatar, CAST('đã phản hồi thảo luận' AS CHAR(100)) as action_desc, CAST(SUBSTRING(r.content, 1, 60) AS CHAR(255)) as target, CAST('/pages/community/community_discussion.html' AS CHAR(100)) as href, r.created_at as at FROM community_discussion_replies r JOIN users u ON r.user_id = u.id`,
      `SELECT CAST('group_joined' AS CHAR(50)) as type, CAST(u.id AS SIGNED) as actor_id, CAST(COALESCE(u.full_name, SUBSTRING_INDEX(u.username, '@', 1)) AS CHAR(100)) as actor_name, CAST(u.avatar_url AS CHAR(255)) as actor_avatar, CAST('đã tham gia nhóm' AS CHAR(100)) as action_desc, CAST(g.name AS CHAR(255)) as target, CAST('/pages/community/community_groups.html' AS CHAR(100)) as href, gm.joined_at as at FROM community_group_members gm JOIN users u ON gm.user_id = u.id JOIN community_groups g ON gm.group_id = g.id`,
      `SELECT CAST('resource_uploaded' AS CHAR(50)) as type, CAST(u.id AS SIGNED) as actor_id, CAST(COALESCE(u.full_name, SUBSTRING_INDEX(u.username, '@', 1)) AS CHAR(100)) as actor_name, CAST(u.avatar_url AS CHAR(255)) as actor_avatar, CAST('đã tải lên tài liệu' AS CHAR(100)) as action_desc, CAST(r.title AS CHAR(255)) as target, CAST('/pages/resources/resources.html' AS CHAR(100)) as href, r.created_at as at FROM resources r LEFT JOIN users u ON r.user_id = u.id`,
      `SELECT CAST('lecture_comment_created' AS CHAR(50)) as type, CAST(lc.user_id AS SIGNED) as actor_id, CAST(lc.user_name AS CHAR(100)) as actor_name, CAST(lc.user_avatar AS CHAR(255)) as actor_avatar, CAST('đã bình luận bài giảng' AS CHAR(100)) as action_desc, CAST(SUBSTRING(lc.content, 1, 60) AS CHAR(255)) as target, CAST('/pages/lectures/lectures.html' AS CHAR(100)) as href, lc.created_at as at FROM lecture_comments lc`
    ];

    const unionAllSql = queries.join(' UNION ALL ');

    let dataSql = `SELECT * FROM (${unionAllSql}) as combined`;
    let countSql = `SELECT COUNT(*) as total FROM (${unionAllSql}) as combined`;
    const params = [];
    const countParams = [];

    if (filterType) {
      dataSql += ` WHERE type = ?`;
      countSql += ` WHERE type = ?`;
      params.push(filterType);
      countParams.push(filterType);
    }

    dataSql += ` ORDER BY at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [[{ total }]] = await db.query(countSql, countParams);
    const [rows] = await db.query(dataSql, params);

    const formattedActivities = rows.map((a) => ({
      type: a.type,
      actor: {
        id: a.actor_id,
        name: a.actor_name || 'Người dùng',
        avatarUrl: a.actor_avatar || null
      },
      actionDesc: a.action_desc,
      target: a.target ? (a.target.length > 60 ? a.target.slice(0, 60) + '...' : a.target) : null,
      href: a.href,
      at: formatSaigonISO(a.at)
    }));

    return res.json({
      success: true,
      total: Number(total),
      page,
      limit,
      totalPages: Math.ceil(Number(total) / limit) || 1,
      activities: formattedActivities
    });
  } catch (error) {
    console.error('Lỗi getSystemActivity:', error);
    return res.status(500).json({ error: 'Lỗi máy chủ khi lấy nhật ký hoạt động' });
  }
};
