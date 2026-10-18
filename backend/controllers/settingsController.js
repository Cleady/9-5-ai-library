const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const db = require('../config/db');
const { recordAudit } = require('../utils/audit');

// Cache in-memory cho public settings (5 phút)
let publicSettingsCache = null;
let publicSettingsCacheTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

function invalidateCache() {
  publicSettingsCache = null;
  publicSettingsCacheTime = 0;
}

// Helper đọc kích thước ảnh từ buffer không cần thư viện bên ngoài
function parseImageDimensions(buf) {
  try {
    // 1. PNG (Chữ ký: 89 50 4E 47 0D 0A 1A 0A)
    if (buf.length >= 24 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) {
      const width = buf.readUInt32BE(16);
      const height = buf.readUInt32BE(20);
      return { width, height, type: 'png' };
    }

    // 2. JPEG (Chữ ký: FF D8 FF)
    if (buf.length >= 4 && buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF) {
      let offset = 2;
      while (offset < buf.length) {
        if (buf[offset] !== 0xFF) break;
        const marker = buf[offset + 1];
        // SOF markers: 0xC0 .. 0xC3, 0xC5 .. 0xC7, 0xC9 .. 0xCB, 0xCD .. 0xCF
        if ((marker >= 0xC0 && marker <= 0xC3) || (marker >= 0xC5 && marker <= 0xC7) ||
            (marker >= 0xC9 && marker <= 0xCB) || (marker >= 0xCD && marker <= 0xCF)) {
          if (offset + 9 <= buf.length) {
            const height = buf.readUInt16BE(offset + 5);
            const width = buf.readUInt16BE(offset + 7);
            return { width, height, type: 'jpeg' };
          }
          break;
        }
        if (marker === 0xD9 || marker === 0xDA) break; // EOI or SOS
        const length = buf.readUInt16BE(offset + 2);
        offset += 2 + length;
      }
      return { width: 100, height: 100, type: 'jpeg' }; // Fallback nếu JPEG hợp lệ
    }

    // 3. WEBP (RIFF....WEBP)
    if (buf.length >= 30 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
      const chunk = buf.toString('ascii', 12, 16);
      if (chunk === 'VP8 ' && buf.length >= 30) {
        const width = buf.readUInt16LE(26) & 0x3fff;
        const height = buf.readUInt16LE(28) & 0x3fff;
        return { width, height, type: 'webp' };
      }
      if (chunk === 'VP8L' && buf.length >= 25) {
        const b1 = buf[21];
        const b2 = buf[22];
        const b3 = buf[23];
        const b4 = buf[24];
        const width = 1 + (((b2 & 0x3f) << 8) | b1);
        const height = 1 + (((b4 & 0xf) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6));
        return { width, height, type: 'webp' };
      }
      if (chunk === 'VP8X' && buf.length >= 30) {
        const width = 1 + buf.readUIntLE(24, 3);
        const height = 1 + buf.readUIntLE(27, 3);
        return { width, height, type: 'webp' };
      }
      return { width: 100, height: 100, type: 'webp' };
    }
  } catch (e) {}
  return null;
}

// 1. GET /api/settings/public (Công khai)
exports.getPublicSettings = async (req, res) => {
  try {
    const now = Date.now();
    if (publicSettingsCache && now - publicSettingsCacheTime < CACHE_TTL_MS) {
      res.setHeader('Cache-Control', 'public, max-age=60');
      return res.json(publicSettingsCache);
    }

    const [rows] = await db.query('SELECT setting_key, setting_value FROM site_settings');
    const map = {};
    rows.forEach(r => { map[r.setting_key] = r.setting_value; });

    let socialLinks = {};
    try {
      const raw = JSON.parse(map.social_links || '{}');
      // Lọc bỏ các liên kết rỗng
      for (const [k, v] of Object.entries(raw)) {
        if (v && typeof v === 'string' && v.trim()) {
          socialLinks[k] = v.trim();
        }
      }
    } catch (e) {
      socialLinks = {};
    }

    const publicData = {
      website_name: map.website_name || '9.5 AI CLUB',
      short_description: map.short_description || 'AI Learning Platform & Community for Students',
      logo_url: map.logo_url || '/assets/icon/cool_book.png',
      favicon_url: map.favicon_url || '/assets/icon/cool_book.png',
      social_links: socialLinks,
      default_theme: map.default_theme || 'system',
      default_accent: map.default_accent || 'blue',
      allow_registration: map.allow_registration !== 'false'
    };

    publicSettingsCache = publicData;
    publicSettingsCacheTime = now;

    res.setHeader('Cache-Control', 'public, max-age=60');
    res.json(publicData);
  } catch (error) {
    console.error('Lỗi lấy public settings:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi lấy cấu hình công khai' });
  }
};

// 2. GET /api/admin/settings (Admin hoặc Owner)
exports.getAdminSettings = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT s.setting_key, s.setting_value, s.updated_at, u.full_name AS updated_by_name, u.username AS updated_by_username
      FROM site_settings s
      LEFT JOIN users u ON s.updated_by = u.id
    `);

    const map = {};
    let latestUpdatedAt = null;
    let latestUpdatedBy = null;

    rows.forEach(r => {
      map[r.setting_key] = r.setting_value;
      if (!latestUpdatedAt || new Date(r.updated_at) > new Date(latestUpdatedAt)) {
        latestUpdatedAt = r.updated_at;
        latestUpdatedBy = r.updated_by_name || r.updated_by_username || null;
      }
    });

    let socialLinks = { facebook: '', discord: '', youtube: '', x: '', github: '' };
    try {
      if (map.social_links) {
        socialLinks = { ...socialLinks, ...JSON.parse(map.social_links) };
      }
    } catch (e) {}

    const response = {
      website_name: map.website_name || '9.5 AI CLUB',
      short_description: map.short_description || 'AI Learning Platform & Community for Students',
      logo_url: map.logo_url || '/assets/icon/cool_book.png',
      favicon_url: map.favicon_url || '/assets/icon/cool_book.png',
      social_links: socialLinks,
      default_theme: map.default_theme || 'system',
      default_accent: map.default_accent || 'blue',
      allow_registration: map.allow_registration !== 'false',
      require_approval: map.require_approval !== 'false',
      min_password_length: parseInt(map.min_password_length, 10) || 6,
      session_days: parseInt(map.session_days, 10) || 1,
      updatedAt: latestUpdatedAt,
      updatedBy: latestUpdatedBy,
      canEdit: req.user && req.user.role === 'owner'
    };

    res.json(response);
  } catch (error) {
    console.error('Lỗi lấy admin settings:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi lấy cấu hình quản trị' });
  }
};

// 3. PUT /api/admin/settings (Chỉ Owner)
exports.updateAdminSettings = async (req, res) => {
  const body = req.body || {};
  const errors = {};
  const updates = [];

  // 1. website_name (1 - 60 ký tự, không rỗng)
  if (body.website_name !== undefined) {
    if (typeof body.website_name !== 'string') {
      errors.website_name = 'Tên website phải là chuỗi ký tự.';
    } else {
      const trimmed = body.website_name.trim();
      if (!trimmed) {
        errors.website_name = 'Tên website không được để trống.';
      } else if (trimmed.length > 60) {
        errors.website_name = 'Tên website không được vượt quá 60 ký tự.';
      } else if (/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(trimmed)) {
        errors.website_name = 'Tên website chứa ký tự điều khiển không hợp lệ.';
      } else {
        updates.push(['website_name', trimmed]);
      }
    }
  }

  // 2. short_description (tối đa 160 ký tự)
  if (body.short_description !== undefined) {
    if (typeof body.short_description !== 'string') {
      errors.short_description = 'Mô tả ngắn phải là chuỗi ký tự.';
    } else {
      const trimmed = body.short_description.trim();
      if (trimmed.length > 160) {
        errors.short_description = 'Mô tả ngắn không được vượt quá 160 ký tự.';
      } else if (/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(trimmed)) {
        errors.short_description = 'Mô tả chứa ký tự điều khiển không hợp lệ.';
      } else {
        updates.push(['short_description', trimmed]);
      }
    }
  }

  // 3. social_links
  if (body.social_links !== undefined) {
    if (typeof body.social_links !== 'object' || body.social_links === null || Array.isArray(body.social_links)) {
      errors.social_links = 'Liên kết mạng xã hội phải là một đối tượng.';
    } else {
      const allowedKeys = ['facebook', 'discord', 'youtube', 'x', 'github'];
      const cleanLinks = {};
      for (const k of allowedKeys) {
        const urlVal = body.social_links[k];
        if (urlVal === undefined || urlVal === null || urlVal === '') {
          cleanLinks[k] = '';
          continue;
        }
        if (typeof urlVal !== 'string') {
          errors[`social_links.${k}`] = `Liên kết ${k} phải là chuỗi URL.`;
          continue;
        }
        const trimmedUrl = urlVal.trim();
        if (trimmedUrl === '') {
          cleanLinks[k] = '';
          continue;
        }
        if (trimmedUrl.length > 255) {
          errors[`social_links.${k}`] = `Liên kết ${k} không được vượt quá 255 ký tự.`;
          continue;
        }
        // Kiểm tra Scheme nguy hiểm
        if (/^(javascript|data|vbscript):/i.test(trimmedUrl)) {
          errors[`social_links.${k}`] = `Liên kết ${k} không được dùng giao thức nguy hiểm.`;
          continue;
        }
        try {
          const parsed = new URL(trimmedUrl);
          if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
            errors[`social_links.${k}`] = `Liên kết ${k} phải bắt đầu bằng http:// hoặc https://`;
            continue;
          }
          cleanLinks[k] = trimmedUrl;
        } catch (e) {
          errors[`social_links.${k}`] = `Định dạng URL của ${k} không hợp lệ.`;
        }
      }
      if (Object.keys(errors).length === 0) {
        updates.push(['social_links', JSON.stringify(cleanLinks)]);
      }
    }
  }

  // 4. default_theme ('system' | 'light' | 'dark')
  if (body.default_theme !== undefined) {
    if (!['system', 'light', 'dark'].includes(body.default_theme)) {
      errors.default_theme = 'Giao diện mặc định phải là: system, light hoặc dark.';
    } else {
      updates.push(['default_theme', body.default_theme]);
    }
  }

  // 5. default_accent ('blue' | 'purple' | 'green' | 'orange' | 'pink')
  if (body.default_accent !== undefined) {
    if (!['blue', 'purple', 'green', 'orange', 'pink'].includes(body.default_accent)) {
      errors.default_accent = 'Màu nhấn mặc định phải là: blue, purple, green, orange hoặc pink.';
    } else {
      updates.push(['default_accent', body.default_accent]);
    }
  }

  // 6. allow_registration (boolean)
  if (body.allow_registration !== undefined) {
    if (typeof body.allow_registration !== 'boolean') {
      errors.allow_registration = 'Giá trị cho phép đăng ký phải là true hoặc false.';
    } else {
      updates.push(['allow_registration', String(body.allow_registration)]);
    }
  }

  // 7. require_approval (boolean)
  if (body.require_approval !== undefined) {
    if (typeof body.require_approval !== 'boolean') {
      errors.require_approval = 'Giá trị yêu cầu duyệt tài khoản phải là true hoặc false.';
    } else {
      updates.push(['require_approval', String(body.require_approval)]);
    }
  }

  // 8. min_password_length (6 | 8 | 10 | 12)
  if (body.min_password_length !== undefined) {
    const val = parseInt(body.min_password_length, 10);
    if (![6, 8, 10, 12].includes(val)) {
      errors.min_password_length = 'Độ dài mật khẩu tối thiểu phải là: 6, 8, 10 hoặc 12.';
    } else {
      updates.push(['min_password_length', String(val)]);
    }
  }

  // 9. session_days (1 | 7 | 30)
  if (body.session_days !== undefined) {
    const val = parseInt(body.session_days, 10);
    if (![1, 7, 30].includes(val)) {
      errors.session_days = 'Thời hạn phiên đăng nhập phải là: 1, 7 hoặc 30 ngày.';
    } else {
      updates.push(['session_days', String(val)]);
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      error: 'Dữ liệu cấu hình không hợp lệ',
      details: errors
    });
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'Không có trường dữ liệu hợp lệ nào để cập nhật' });
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const changedKeys = [];
    for (const [key, val] of updates) {
      await conn.query(`
        INSERT INTO site_settings (setting_key, setting_value, updated_by)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value), updated_by = VALUES(updated_by)
      `, [key, val, req.user.id]);
      changedKeys.push(key);
    }

    await conn.commit();
    invalidateCache();

    // Ghi nhật ký quản trị
    recordAudit({
      actorId: req.user.id,
      action: 'settings.update',
      targetType: 'site_settings',
      details: {
        changedKeys,
        updatedFields: updates.map(([k]) => k)
      },
      req
    });

    res.json({
      success: true,
      message: 'Lưu cài đặt hệ thống thành công!',
      updatedKeys: changedKeys
    });
  } catch (error) {
    await conn.rollback();
    console.error('Lỗi lưu admin settings:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi lưu cài đặt' });
  } finally {
    conn.release();
  }
};

// 4. POST /api/admin/settings/branding/:kind (Upload Logo hoặc Favicon, Chỉ Owner)
exports.uploadBranding = async (req, res) => {
  const kind = req.params.kind;
  if (kind !== 'logo' && kind !== 'favicon') {
    if (req.file && req.file.path) try { fs.unlinkSync(req.file.path); } catch (e) {}
    return res.status(400).json({ error: 'Loại ảnh không hợp lệ (chỉ hỗ trợ logo hoặc favicon).' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'Vui lòng chọn tệp ảnh để tải lên.' });
  }

  const filePath = req.file.path;

  try {
    const buf = fs.readFileSync(filePath);

    // Kiểm tra Magic Numbers / File Signature
    const dims = parseImageDimensions(buf);
    if (!dims) {
      try { fs.unlinkSync(filePath); } catch (e) {}
      return res.status(400).json({ error: 'Tệp tải lên không phải định dạng ảnh hợp lệ (PNG, JPG, WEBP).' });
    }

    // Kiểm tra kích thước điểm ảnh
    if (dims.width < 16 || dims.height < 16) {
      try { fs.unlinkSync(filePath); } catch (e) {}
      return res.status(400).json({ error: 'Kích thước ảnh quá nhỏ (tối thiểu 16x16px).' });
    }
    if (dims.width > 1024 || dims.height > 1024) {
      try { fs.unlinkSync(filePath); } catch (e) {}
      return res.status(400).json({ error: 'Kích thước ảnh quá lớn (tối đa 1024x1024px).' });
    }

    const settingKey = kind === 'logo' ? 'logo_url' : 'favicon_url';
    const relativeUrl = `/document/uploads/branding/${req.file.filename}`;

    // Lấy URL cũ để dọn rác
    const [[oldRow]] = await db.query('SELECT setting_value FROM site_settings WHERE setting_key = ?', [settingKey]);
    const oldUrl = oldRow ? oldRow.setting_value : null;

    await db.query(`
      INSERT INTO site_settings (setting_key, setting_value, updated_by)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value), updated_by = VALUES(updated_by)
    `, [settingKey, relativeUrl, req.user.id]);

    invalidateCache();

    // Dọn file branding cũ nếu là file trong thư mục document/uploads/branding/
    if (oldUrl && oldUrl.startsWith('/document/uploads/branding/')) {
      const oldPath = path.join(__dirname, '../../', oldUrl);
      if (fs.existsSync(oldPath)) {
        try { fs.unlinkSync(oldPath); } catch (e) {}
      }
    }

    recordAudit({
      actorId: req.user.id,
      action: `branding.update_${kind}`,
      targetType: 'site_settings',
      details: { kind, newUrl: relativeUrl, width: dims.width, height: dims.height },
      req
    });

    res.json({
      success: true,
      message: `Tải lên ${kind === 'logo' ? 'Logo' : 'Favicon'} thành công!`,
      url: relativeUrl,
      width: dims.width,
      height: dims.height
    });
  } catch (error) {
    try { fs.unlinkSync(filePath); } catch (e) {}
    console.error(`Lỗi xử lý upload ${kind}:`, error);
    res.status(500).json({ error: 'Lỗi máy chủ khi xử lý tệp ảnh' });
  }
};

// 5. DELETE /api/admin/settings/branding/:kind (Khôi phục ảnh mặc định, Chỉ Owner)
exports.resetBranding = async (req, res) => {
  const kind = req.params.kind;
  if (kind !== 'logo' && kind !== 'favicon') {
    return res.status(400).json({ error: 'Loại ảnh không hợp lệ (chỉ hỗ trợ logo hoặc favicon).' });
  }

  try {
    const settingKey = kind === 'logo' ? 'logo_url' : 'favicon_url';
    const defaultUrl = kind === 'logo' ? '/assets/icon/cool_book_128.png' : '/assets/icon/favicon-32.png';

    const [[oldRow]] = await db.query('SELECT setting_value FROM site_settings WHERE setting_key = ?', [settingKey]);
    const oldUrl = oldRow ? oldRow.setting_value : null;

    await db.query(`
      UPDATE site_settings SET setting_value = ?, updated_by = ? WHERE setting_key = ?
    `, [defaultUrl, req.user.id, settingKey]);

    invalidateCache();

    if (oldUrl && oldUrl.startsWith('/document/uploads/branding/')) {
      const oldPath = path.join(__dirname, '../../', oldUrl);
      if (fs.existsSync(oldPath)) {
        try { fs.unlinkSync(oldPath); } catch (e) {}
      }
    }

    recordAudit({
      actorId: req.user.id,
      action: `branding.reset_${kind}`,
      targetType: 'site_settings',
      details: { kind, resetTo: defaultUrl },
      req
    });

    res.json({
      success: true,
      message: `Đã khôi phục ${kind === 'logo' ? 'Logo' : 'Favicon'} về mặc định.`,
      url: defaultUrl
    });
  } catch (error) {
    console.error(`Lỗi khôi phục branding ${kind}:`, error);
    res.status(500).json({ error: 'Lỗi máy chủ khi khôi phục ảnh mặc định' });
  }
};

// Helper cho các controller khác đọc cấu hình hệ thống an toàn có fallback
exports.getSettingValue = async (key, fallback) => {
  try {
    const [[row]] = await db.query('SELECT setting_value FROM site_settings WHERE setting_key = ?', [key]);
    if (row && row.setting_value !== undefined && row.setting_value !== null) {
      return row.setting_value;
    }
  } catch (e) {
    console.warn(`Lỗi đọc setting ${key}:`, e.message);
  }
  return fallback;
};
