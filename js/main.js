// Mỗi tính năng trong json là một hàm riêng. Cuối file gọi từng hàm một lần

// Hàm tiện ích - rút gọn document.querySelector, dùng lại nhiều lần
const $ = (selector) => document.querySelector(selector);

// Hàm dùng chung cho mọi khung thả xuống (menu user, thông báo)
// toggle = nút bấm, list = khung hiện ra, container = vùng bao cả hai (để biết bấm ra ngoài hay không)
function createDropdown(toggle, list, container) {
    if (!toggle || !list || !container) return; // trang khong co thi bo qua

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function isOpen() {
        return toggle.getAttribute("aria-expanded") === "true";
    }

    function setOpen(open) {
        toggle.setAttribute("aria-expanded", String(open)); // báo cho trình đọc màn hình

        if (open) {
            list.classList.remove("is-closing");
            list.hidden = false;
            return;
        }

        if (list.hidden) return;
        if (prefersReducedMotion.matches) {
            list.hidden = true; // không có animation thì ẩn
            return;
        }
        list.classList.add("is-closing"); // chạy animation và ẩn khi nó kết thúc
    }

    // Animation đóng chạy xong thì mới ẩn thật
    list.addEventListener("animationend", (event) => {
        if (event.animationName === "menu-lift") {
            list.hidden = true;
            list.classList.remove("is-closing");
        }
    });

    toggle.addEventListener("click", () => setOpen(!isOpen()));

    // bấm ra ngoài thì đóng
    document.addEventListener("click", (event) => {
        if (!container.contains(event.target)) setOpen(false);
    });

    // bấm esc thì đóng
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setOpen(false);
    });
}

// Menu user profile
function initUserMenu() {
    createDropdown($(".user-menu-toggle"), $("#user-menu-list"), $(".user-menu"));
}

// Notifications
function initNotifications() {
    const bell = $(".notification .icon-button");
    createDropdown(bell, $("#notification-panel"), $(".notification"));

    // Nút "Mark as read": bỏ nền xanh của các mục chưa đọc và ẩn chấm đỏ
    const clearButton = $(".notification-clear");
    const dot = $(".notification-dot");
    if (!clearButton || !dot || !bell) return;

    clearButton.addEventListener("click", () => {
        document.querySelectorAll(".notification-item.is-unread").forEach((item) => {
            item.classList.remove("is-unread");
        });
        dot.hidden = true;
        bell.setAttribute("aria-label", "Notifications (không có thông báo mới)");
    });
}

// Phím tắt tìm kiếm Ctrl+K toàn trang
function initSearchShortcut() {
    document.addEventListener("keydown", (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
            const searchInput = document.querySelector(".search-input") || document.querySelector("input[type='search']");
            if (searchInput) {
                event.preventDefault();
                searchInput.focus();
            }
        }
    });
}

// khởi chạy - gọi từng tính năng
initUserMenu();
initNotifications();
initSearchShortcut();

