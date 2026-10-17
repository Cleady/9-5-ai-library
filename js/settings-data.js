/**
 * File: settings-data.js
 * Mục đích: Lưu trữ dữ liệu giả lập (mock data) và cấu hình mặc định.
 * Định dạng giống phản hồi JSON từ API backend PHP để sau này dễ thay bằng fetch().
 */

(function () {
  // Tạo namespace Lib95 nếu chưa có, và thêm nhánh settings
  window.Lib95 = window.Lib95 || {};
  window.Lib95.settings = window.Lib95.settings || {};

  // Dữ liệu mock ban đầu dựa theo design
  const defaultData = {
    user: {
      name: "Alex",
      email: "alex@example.com",
      bio: "A passionate learner, building a better future.",
      avatarDataUrl: null, // Sẽ chứa base64 khi người dùng upload ảnh
      role: "Member"
    },
    settings: {
      appearance: {
        theme: "light", // light, dark, auto
        accentColor: "blue",
        fontSize: "medium", // small, medium, large
        backgroundStyle: "default" // default, blurred
      },
      notifications: {
        lectureUpdates: true,
        assignmentReminders: true,
        communityActivity: false,
        productUpdates: true,
        frequency: "Immediately" // Immediately, Daily digest, Weekly digest, Never
      },
      privacy: {
        profileVisibility: "Members only", // Members only, Only me
        learningActivity: true,
        dataUsage: true
      },
      account: {
        twoFactor: false
      }
    },
    connectedAccounts: [
      { provider: "Google", email: "alex@gmail.com", connected: true }
    ],
    storage: {
      quotaBytes: 10 * 1024 * 1024 * 1024, // 10 GB
      items: [
        { key: "lecture", label: "Lecture videos", bytes: 1.2 * 1024 * 1024 * 1024 }, // 1.2 GB
        { key: "docs", label: "Documents", bytes: 0.6 * 1024 * 1024 * 1024 }, // 0.6 GB
        { key: "images", label: "Images", bytes: 0.4 * 1024 * 1024 * 1024 }, // 0.4 GB
        { key: "other", label: "Other", bytes: 0.2 * 1024 * 1024 * 1024 }  // 0.2 GB (cache)
      ]
    },
    faq: [
      {
        q: "Làm thế nào để đổi mật khẩu?",
        a: "Vào tab Account, nhấn nút Change ở mục Password."
      },
      {
        q: "Tôi có thể xem bài giảng offline không?",
        a: "Hiện tại hệ thống yêu cầu kết nối mạng để xem và lưu tiến trình."
      },
      {
        q: "Làm sao để xóa tiến trình làm bài Quiz?",
        a: "Tiến trình Quiz không thể xóa để đảm bảo tính minh bạch."
      },
      {
        q: "Dung lượng bộ nhớ 'Other' là gì?",
        a: "Đó là các file đệm (cache) giúp ứng dụng tải nhanh hơn. You có thể xóa nó ở tab Data & Storage."
      },
      {
        q: "Tôi muốn báo cáo lỗi hệ thống?",
        a: "Vui lòng dùng tính năng Report a problem ở màn hình Help & Support."
      }
    ]
  };

  // Hàm xuất dữ liệu gốc
  window.Lib95.settings.data = {
    getDefault: function () {
      // Dùng parse/stringify để deep copy, tránh tham chiếu
      let data = JSON.parse(JSON.stringify(defaultData));
      const localUser = localStorage.getItem("user");
      if (localUser) {
        const u = JSON.parse(localUser);
        data.user.name = u.full_name || u.username.split('@')[0];
        data.user.email = u.username;
        data.user.bio = u.bio || "";
        data.user.avatarDataUrl = u.avatar_url || null;
        data.user.role = u.role;
      }
      return data;
    }
  };
})();
