document.addEventListener("DOMContentLoaded", () => {
    // Chỉ hoạt động khi CHƯA đăng nhập
    const isLoggedIn = !!localStorage.getItem("token");
    if (isLoggedIn) {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                const guestBtn = document.querySelector(".home-page__guest-button");
                const guestMenu = document.getElementById("guest-menu");

                if (guestBtn) {
                    // Đổi tên "Guest" thành Username
                    const spans = guestBtn.querySelectorAll("span");
                    let nameSpan = null;
                    spans.forEach(s => {
                        if (s.textContent.trim() === "Guest") nameSpan = s;
                    });
                    
                    let displayName = user.full_name || (user.username ? user.username.split('@')[0] : "User");
                    // Viết hoa chữ cái đầu (VD: owner -> Owner)
                    displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
                    
                    if (nameSpan) {
                        nameSpan.textContent = displayName;
                    }

                    // Đổi Icon Avatar
                    const avatarSpan = guestBtn.querySelector(".home-page__guest-avatar");
                    if (avatarSpan) {
                        avatarSpan.innerHTML = "";
                        if (user.avatar_url) {
                            avatarSpan.style.backgroundImage = 'url(' + user.avatar_url + ')';
                            avatarSpan.style.backgroundSize = "cover";
                            avatarSpan.style.backgroundPosition = "center";
                        } else {
                            avatarSpan.textContent = displayName.charAt(0).toUpperCase();
                            avatarSpan.style.display = "flex";
                            avatarSpan.style.alignItems = "center";
                            avatarSpan.style.justifyContent = "center";
                            avatarSpan.style.background = "#e2e8f0";
                            avatarSpan.style.color = "#0f172a";
                            avatarSpan.style.fontWeight = "bold";
                            avatarSpan.style.fontSize = "14px";
                        }
                        // Đảm bảo khung tròn
                        avatarSpan.style.borderRadius = "50%";
                        avatarSpan.style.overflow = "hidden";
                    }
                }

                if (guestMenu) {
                    // Đổi menu thành nút Logout duy nhất
                    let menuHtml = '';
                    if (['owner', 'admin', 'staff'].includes(user.role)) {
                        menuHtml += '<a href="pages/admin/admin.html" style="font-weight: 500; color: #0d6efd; display: flex; align-items: center;"><img src="/assets/icon/Better_Icon/settings.png" alt="Manage" style="width: 18px; height: 18px; margin-right: 8px; vertical-align: middle;">Manage</a>';
                    }
                    menuHtml += '<a href="#" id="index-logout-btn" style="color: #dc3545; font-weight: 500;">Logout</a>';
                    guestMenu.innerHTML = menuHtml;
                    const logoutBtn = document.getElementById("index-logout-btn");
                    if (logoutBtn) {
                        logoutBtn.addEventListener("click", (e) => {
                            e.preventDefault();
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            window.location.reload();
                        });
                    }
                }
            }
        } catch(e) {
            console.error(e);
        }
        return;
    }

    // Appearance hộp thoại Modal
    const modalHtml = `
    <div id="auth-guard-overlay" class="auth-guard-overlay" style="display: none;">
        <div class="auth-guard-modal">
            <button id="auth-guard-close" class="auth-guard-close" aria-label="Close">&times;</button>
            <h2 class="auth-guard-title">Please log in to continue</h2>
            <p id="auth-guard-desc" class="auth-guard-desc">You need to log in to view this content.</p>
            <button id="auth-guard-login-btn" class="home-page__button home-page__button--primary" style="width: 100%; justify-content: center; margin-top: 15px; cursor: pointer; border: none; font-size: 1rem;">Log in</button>
            <div class="auth-guard-footer">
                Don't have an account? <a href="pages/auth/signup.html">Sign up</a>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const overlay = document.getElementById("auth-guard-overlay");
    const btnClose = document.getElementById("auth-guard-close");
    const btnLogin = document.getElementById("auth-guard-login-btn");
    const desc = document.getElementById("auth-guard-desc");
    let previouslyFocusedElement = null;

    function openModal(message, targetUrl) {
        previouslyFocusedElement = document.activeElement;
        desc.textContent = message;
        if (targetUrl) {
            sessionStorage.setItem("redirectUrl", targetUrl);
        }
        overlay.style.display = "flex";
        btnLogin.focus();
    }

    function closeModal() {
        overlay.style.display = "none";
        if (previouslyFocusedElement) {
            previouslyFocusedElement.focus();
        }
    }

    btnClose.addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.style.display === "flex") closeModal();
        // Bẫy phím Tab trong modal (cơ bản)
        if (e.key === "Tab" && overlay.style.display === "flex") {
            const focusable = overlay.querySelectorAll('button, [href]');
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });
    btnLogin.addEventListener("click", () => {
        window.location.href = "pages/auth/login.html";
    });

    // Event Delegation chặn click
    document.body.addEventListener("click", (e) => {
        // Bỏ qua nếu đang click vào chính modal
        if (e.target.closest('#auth-guard-overlay')) return;

        const a = e.target.closest("a");
        if (a) {
            const href = a.getAttribute("href") || "";
            // Bỏ qua các nút công khai: Log in, Sign up ở Guest Menu
            if (href.includes("login.html") || href.includes("signup.html")) return;

            if (href.includes("lectures.html")) {
                e.preventDefault();
                openModal("You need to log in to view Lectures.", href);
            } else if (href.includes("practice.html")) {
                e.preventDefault();
                openModal("You need to log in to do Practice.", href);
            } else if (href.includes("history.html")) {
                e.preventDefault();
                openModal("You need to log in to view History.", href);
            } else if (href.includes("settings.html")) {
                e.preventDefault();
                openModal("You need to log in to access Settings.", href);
            }
        }
        
        // Chặn thanh Search
        const searchInput = e.target.closest("#home-search");
        if (searchInput) {
            e.preventDefault();
            searchInput.blur();
            openModal("Please log in to use Search.", null);
        }

        // Chặn chuông thông báo
        const bell = e.target.closest(".home-page__notifications-btn");
        if (bell) {
            e.preventDefault();
            openModal("Please log in to view Notifications.", null);
        }
    });
});



