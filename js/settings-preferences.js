/**
 * File: settings-preferences.js
 * Mục đích: Resolve tab Notifications và Privacy (toggles, dropdown, mock delete).
 */

(function () {
  const S = window.Lib95.settings;

  // DOM Elements - Notifications
  const nLec = document.getElementById("notif-lecture");
  const nAss = document.getElementById("notif-assignment");
  const nCom = document.getElementById("notif-community");
  const nPro = document.getElementById("notif-product");
  const nFreq = document.getElementById("notif-frequency");

  // DOM Elements - Privacy
  const pVis = document.getElementById("priv-visibility");
  const pLearn = document.getElementById("priv-learning");
  const pData = document.getElementById("priv-data");
  const btnDelete = document.getElementById("btn-delete-account");
  
  // Delete Modal
  const formDelete = document.getElementById("form-delete");
  const inputDelEmail = document.getElementById("del-confirm-email");
  const delError = document.getElementById("del-error");

  function loadPreferences() {
    const sets = S.core.getData().settings;

    if(nLec) nLec.checked = sets.notifications.lectureUpdates;
    if(nAss) nAss.checked = sets.notifications.assignmentReminders;
    if(nCom) nCom.checked = sets.notifications.communityActivity;
    if(nPro) nPro.checked = sets.notifications.productUpdates;
    if(nFreq) nFreq.value = sets.notifications.frequency;

    if(pVis) pVis.value = sets.privacy.profileVisibility;
    if(pLearn) pLearn.checked = sets.privacy.learningActivity;
    if(pData) pData.checked = sets.privacy.dataUsage;
  }

  function savePref(category, key, value) {
    const data = S.core.getData();
    data.settings[category][key] = value;
    S.core.saveData(data);
    S.core.showToast("Tuỳ chọn đã được lưu", 1500);
  }

  // --- BINDING EVENTS ---
  const bindSwitch = (el, cat, key) => {
    if(el) {
      // Bắt sự kiện change (dùng chuột click hoặc phím Space khi đang focus)
      el.addEventListener("change", (e) => savePref(cat, key, e.target.checked));
      
      // Accessibility: Hỗ trợ phím Space/Enter trên switch container nếu có role=switch
      el.addEventListener("keydown", (e) => {
        if(e.key === "Enter") {
          e.preventDefault();
          el.checked = !el.checked;
          el.dispatchEvent(new Event('change'));
        }
      });
    }
  };

  const bindSelect = (el, cat, key) => {
    if(el) el.addEventListener("change", (e) => savePref(cat, key, e.target.value));
  };

  bindSwitch(nLec, "notifications", "lectureUpdates");
  bindSwitch(nAss, "notifications", "assignmentReminders");
  bindSwitch(nCom, "notifications", "communityActivity");
  bindSwitch(nPro, "notifications", "productUpdates");
  bindSelect(nFreq, "notifications", "frequency");

  bindSelect(pVis, "privacy", "profileVisibility");
  bindSwitch(pLearn, "privacy", "learningActivity");
  bindSwitch(pData, "privacy", "dataUsage");

  // --- XÓA TÀI KHOẢN (MOCK) ---
  if(btnDelete) {
    btnDelete.addEventListener("click", () => {
      if(formDelete) formDelete.reset();
      if(delError) delError.textContent = "";
      S.core.openModal("modal-delete");
    });
  }

  if(formDelete) {
    formDelete.addEventListener("submit", (e) => {
      e.preventDefault();
      const userEmail = S.core.getData().user.email;
      
      if(inputDelEmail.value !== userEmail) {
        delError.textContent = "Email xác nhận không khớp.";
        return;
      }

      // Xóa thành công (mock)
      localStorage.removeItem("lib95:settings:data");
      S.core.closeModal("modal-delete");
      
      // Chuyển về trang chủ
      S.core.showToast("Tài khoản đã bị xoá! Đang chuyển hướng... (TẠM THỜI)", 3000);
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    });
  }

  document.addEventListener("DOMContentLoaded", loadPreferences);

})();
