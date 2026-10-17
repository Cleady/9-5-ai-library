/**
 * File: settings-core.js
 * Mục đích: Manage Storage layer, định tuyến (hash routing), và các UI helpers (Toast, bẫy dirty form).
 * Dữ liệu được đọc/ghi qua localStorage với tiền tố 'lib95:settings:'.
 */

(function () {
  window.Lib95 = window.Lib95 || {};
  const S = window.Lib95.settings = window.Lib95.settings || {};
  
  const STORAGE_KEY = "lib95:settings:data";

  // ==========================================================================
  // STORAGE LAYER
  // ==========================================================================
  S.core = {
    /**
     * Lấy toàn bộ dữ liệu. Nếu chưa có thì khởi tạo từ data mặc định.
     */
    getData: function () {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.user) {
            delete parsed.user;
            this.saveData(parsed);
          }
          return parsed;
        }
      } catch (err) {
        console.error("Failed to parse settings data from localStorage", err);
      }
      
      // Nếu lỗi hoặc chưa có, lấy data mặc định
      const def = S.data.getDefault();
      this.saveData(def);
      return def;
    },

    /**
     * Ghi toàn bộ dữ liệu
     */
    saveData: function (data) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (err) {
        console.error("Failed to save settings data to localStorage", err);
      }
    },

    /**
     * Cập nhật một phần của object data (deep merge đơn giản ở cấp 1)
     */
    updateSection: function (sectionName, newData) {
      const data = this.getData();
      if (data[sectionName]) {
        data[sectionName] = { ...data[sectionName], ...newData };
      } else {
        data[sectionName] = newData;
      }
      this.saveData(data);
    },

    /**
     * Displaying thông báo Toast nhỏ (autosave)
     */
    showToast: function(message, duration = 3000) {
      const container = document.getElementById("set-toast-container");
      if (!container) return;

      const toast = document.createElement("div");
      toast.className = "set-toast";
      toast.textContent = message;
      container.appendChild(toast);

      setTimeout(() => {
        toast.classList.add("is-hiding");
        toast.addEventListener("animationend", () => {
          toast.remove();
        });
      }, duration);
    },

    /**
     * Helper quản lý Modals
     */
    openModal: function(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.hidden = false;
        // Bắt focus vào modal để accesibility
        const firstInput = modal.querySelector('input, button');
        if (firstInput) firstInput.focus();
      }
    },
    closeModal: function(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.hidden = true;
      }
    }
  };

  // ==========================================================================
  // ROUTING & SUB-MENU (Hash Navigation)
  // ==========================================================================
  
  const panelTitles = {
    "profile": { title: "Settings", subtitle: "Personalize your experience and make the most of 9.5 AI CLUB." },
    "account": { title: "Settings", subtitle: "Manage your account security and access." },
    "appearance": { title: "Settings", subtitle: "Customize the look and feel of 9.5 AI CLUB." },
    "notifications": { title: "Settings", subtitle: "Control how you receive updates and stay informed." },
    "privacy": { title: "Settings", subtitle: "Manage your privacy and data preferences." },
    "storage": { title: "Settings", subtitle: "View and manage your data usage." },
    "support": { title: "Settings", subtitle: "Get help or contact our support team." }
  };

  let currentHash = "";

  function handleHashChange() {
    let hash = window.location.hash.replace("#", "");
    if (!panelTitles[hash]) {
      hash = "profile"; // Mặc định
      window.history.replaceState(null, null, "#profile");
    }

    // Unsaved guard (nếu panel trước đó bị dirty thì chặn)
    // - sẽ cài đặt chi tiết trong settings-profile.js 
    if (S.core.onBeforeNavigate && !S.core.onBeforeNavigate(currentHash, hash)) {
      // Khôi phục hash cũ trên url nếu bị chặn
      const oldHash = currentHash || "profile";
      window.history.replaceState(null, null, "#" + oldHash);
      return; 
    }

    currentHash = hash;

    // Cập nhật tiêu đề trang
    const headerTitle = document.getElementById("set-page-title");
    const headerSub = document.getElementById("set-page-subtitle");
    if (headerTitle && headerSub) {
      headerTitle.textContent = panelTitles[hash].title;
      headerSub.textContent = panelTitles[hash].subtitle;
    }

    // Đổi active trên menu
    document.querySelectorAll(".set-nav-item").forEach(item => {
      item.classList.toggle("is-active", item.dataset.panel === hash);
    });

    // Hiện panel tương ứng
    document.querySelectorAll(".set-panel").forEach(panel => {
      panel.hidden = panel.id !== `panel-${hash}`;
    });
  }

  // Khởi tạo routing
  window.addEventListener("hashchange", handleHashChange);
  
  // Events đóng modal chung qua thuộc tính data-close
  document.addEventListener("click", (e) => {
    const closeBtn = e.target.closest("[data-close]");
    if (closeBtn) {
      const modalId = closeBtn.getAttribute("data-close");
      S.core.closeModal(modalId);
    }
  });

  // ESC đóng modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const visibleModal = document.querySelector(".set-modal:not([hidden])");
      if (visibleModal) {
        visibleModal.hidden = true;
      }
    }
  });

  // Gọi lần đầu khi load trang
  document.addEventListener("DOMContentLoaded", () => {
    handleHashChange();
  });

})();
