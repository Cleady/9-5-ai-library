/**
 * File: settings-account.js
 * Mục đích: Resolve logic tab Account (Email, Password, 2FA, Connected Accounts).
 */

(function () {
  const S = window.Lib95.settings;

  // DOM Elements
  const emailText = document.getElementById("acc-email-text");
  const btnEditEmail = document.getElementById("btn-edit-email");
  const btnChangePwd = document.getElementById("btn-change-password");
  const toggle2FA = document.getElementById("acc-2fa-toggle");
  const connectedList = document.getElementById("acc-connected-list");
  
  // Form đổi mật khẩu
  const formPwd = document.getElementById("form-password");
  const pwdCurrent = document.getElementById("pwd-current");
  const pwdNew = document.getElementById("pwd-new");
  const pwdConfirm = document.getElementById("pwd-confirm");
  const pwdError = document.getElementById("pwd-error");

  function loadAccount() {
    let localUser = null;
    try {
        localUser = JSON.parse(localStorage.getItem('user'));
    } catch(e) {}

    const settings = S.core.getData().settings;

    // Render Email (đồng bộ 1 nguồn dữ liệu)
    if (emailText) {
        if (localUser && localUser.username) {
            emailText.textContent = localUser.username;
        } else {
            emailText.textContent = "Chưa có dữ liệu";
        }
    }

    // 2FA
    if (toggle2FA) toggle2FA.checked = settings.account.twoFactor;

    // Connected Accounts (Chuyển Google về trạng thái chưa dùng)
    const connections = [
        { provider: "Google", email: "Chưa liên kết", connected: false }
    ];

    if (connectedList) {
      connectedList.innerHTML = "";
      connections.forEach(acc => {
        const row = document.createElement("div");
        row.className = "set-list-row";
        
        let iconHtml = `<div class="set-row-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg></div>`;
        if (acc.provider === "Google") {
          iconHtml = `<div class="set-row-icon" style="filter: grayscale(1); opacity: 0.5;"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg></div>`;
        }

        row.innerHTML = `
          ${iconHtml}
          <div class="set-row-content">
            <div class="set-row-title">${acc.provider}</div>
            <div class="set-row-desc" style="color: #94a3b8; font-style: italic;">${acc.email}</div>
          </div>
          <button type="button" class="set-pill-disconnect" style="pointer-events: none; opacity: 0.5;">
            Not connected
          </button>
        `;
        
        connectedList.appendChild(row);
      });
    }
  }

  // --- SỰ KIỆN EMAIL ---
  if (btnEditEmail) {
    btnEditEmail.addEventListener("click", () => {
      // Mock
      S.core.showToast("Chức năng đổi Email sẽ gọi API thực tế.");
    });
  }

  // --- SỰ KIỆN ĐỔI PASSWORD ---
  if (btnChangePwd) {
    btnChangePwd.addEventListener("click", () => {
      formPwd.reset();
      pwdError.textContent = "";
      S.core.openModal("modal-password");
    });
  }

  if (formPwd) {
    formPwd.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const pCurrent = pwdCurrent.value;
      const pNew = pwdNew.value;
      const pConfirm = pwdConfirm.value;
      
      if (pNew.length < 8 || !/\d/.test(pNew)) {
        pwdError.textContent = "Password mới phải từ 8 kí tự và chứa chữ số.";
        return;
      }
      
      if (pNew !== pConfirm) {
        pwdError.textContent = "Password xác nhận không khớp.";
        return;
      }
      
      if (pNew === pCurrent) {
        pwdError.textContent = "Password mới phải khác mật khẩu hiện tại.";
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        pwdError.textContent = "Vui lòng đăng nhập lại để đổi mật khẩu.";
        return;
      }

      const submitBtn = formPwd.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      try {
        const res = await fetch("/api/users/change-password", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            current_password: pCurrent,
            new_password: pNew
          })
        });

        const data = await res.json();
        if (!res.ok) {
          pwdError.textContent = data.error || data.message || "Đổi mật khẩu thất bại.";
          return;
        }

        S.core.closeModal("modal-password");
        formPwd.reset();
        S.core.showToast("Đổi mật khẩu thành công!", 3000);
      } catch (err) {
        console.error("Change password error:", err);
        pwdError.textContent = "Lỗi kết nối máy chủ. Vui lòng thử lại sau.";
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  // --- SỰ KIỆN 2FA Tự lưu ---
  if (toggle2FA) {
    toggle2FA.addEventListener("change", (e) => {
      const data = S.core.getData();
      data.settings.account.twoFactor = e.target.checked;
      S.core.saveData(data);
      if (e.target.checked) {
        S.core.showToast("Two-factor authentication enabled.", 2000);
      } else {
        S.core.showToast("Two-factor authentication disabled.", 2000);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadAccount();
  });
})();
