/**
 * File: settings-support.js
 * Mục đích: Resolve logic tab Support (FAQ, Contact) và tab Data & Storage.
 */

(function () {
    const S = window.Lib95.settings;

    // --- DATA & STORAGE ---
    const storageTotal = document.getElementById("storage-text-total");
    const storageBar = document.getElementById("storage-bar-fill");
    const storageList = document.getElementById("storage-list");
    const btnClearCache = document.getElementById("btn-clear-cache");

    // Helper chuyển đổi Byte -> GB
    function bytesToGB(bytes) {
        return (bytes / (1024 * 1024 * 1024)).toFixed(1) + " GB";
    }

    function loadStorage() {
        if (!storageList) return;
        const storageData = S.core.getData().storage;

        // Tính tổng used
        let usedBytes = 0;
        storageData.items.forEach(item => usedBytes += item.bytes);

        // Phần trăm tổng
        const totalPercent = Math.min(100, Math.round((usedBytes / storageData.quotaBytes) * 100));

        // Cập nhật giao diện tổng quan
        if (storageTotal) storageTotal.textContent = `${bytesToGB(usedBytes)} / ${bytesToGB(storageData.quotaBytes)}`;
        if (storageBar) storageBar.style.width = `${totalPercent}%`;

        // Render danh sách (bằng cách xóa cũ, tạo mới)
        storageList.innerHTML = "";
        storageData.items.forEach(item => {
            // Icon động theo từng loại
            let svg = "";
            if (item.key === "lecture") svg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
            else if (item.key === "docs") svg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`;
            else if (item.key === "images") svg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`;
            else svg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`;

            const itemPercent = usedBytes > 0 ? Math.round((item.bytes / usedBytes) * 100) : 0;

            const div = document.createElement("div");
            div.className = "set-storage-item";
            div.innerHTML = `
        <div class="set-storage-icon">${svg}</div>
        <div class="set-storage-name">${item.label}</div>
        <div class="set-storage-size">${bytesToGB(item.bytes)}</div>
        <div class="set-storage-percent">${itemPercent}%</div>
      `;
            storageList.appendChild(div);
        });
    }

    // Clear cache (giả lập xóa thuộc tính "other")
    if (btnClearCache) {
        btnClearCache.addEventListener("click", () => {
            const ok = window.confirm("Are you sure you want to clear cache?");
            if (ok) {
                const data = S.core.getData();
                const otherItem = data.storage.items.find(i => i.key === "other");
                if (otherItem && otherItem.bytes > 0) {
                    otherItem.bytes = 0;
                    S.core.saveData(data);
                    loadStorage();
                    S.core.showToast("Cache cleared successfully!");
                } else {
                    S.core.showToast("Cache is already empty.");
                }
            }
        });
    }

    // --- HELP & SUPPORT ---
    const mainView = document.getElementById("support-main-view");
    const faqView = document.getElementById("support-faq-view");
    const btnOpenFaq = document.getElementById("btn-open-faq");
    const btnFaqBack = document.getElementById("btn-faq-back");
    const faqList = document.getElementById("faq-list");

    // Load FAQ data
    function loadFaq() {
        if (!faqList) return;
        const faqs = S.core.getData().faq;
        faqList.innerHTML = "";
        faqs.forEach(f => {
            const div = document.createElement("div");
            div.className = "set-faq-item";
            div.innerHTML = `
        <button class="set-faq-q">
          ${f.q}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="set-chevron-icon" style="transition: transform 0.2s;"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="set-faq-a">${f.a}</div>
      `;
            const btn = div.querySelector(".set-faq-q");
            btn.addEventListener("click", () => {
                div.classList.toggle("is-open");
            });
            faqList.appendChild(div);
        });
    }

    // Toggle View
    if (btnOpenFaq) {
        btnOpenFaq.addEventListener("click", () => {
            mainView.hidden = true;
            faqView.hidden = false;
        });
    }
    if (btnFaqBack) {
        btnFaqBack.addEventListener("click", () => {
            faqView.hidden = true;
            mainView.hidden = false;
        });
    }

    // Mở các modal
    document.querySelectorAll("[data-modal]").forEach(btn => {
        btn.addEventListener("click", () => {
            const modalId = btn.getAttribute("data-modal");
            if (modalId === "modal-privacy-doc" || modalId === "modal-terms") {
                // Dùng chung một modal doc
                const title = document.getElementById("modal-doc-title");
                const content = document.getElementById("modal-doc-content");
                if (modalId === "modal-privacy-doc") {
                    title.textContent = "Privacy Policy";
                    content.textContent = "This is a placeholder for the Privacy Policy. We take your privacy seriously and ensure that your data is encrypted and securely stored. We do not sell your personal information to third parties.";
                } else {
                    title.textContent = "Terms of Service";
                    content.textContent = "This is a placeholder for the Terms of Service. By using 9.5 AI CLUB, you agree to comply with our community guidelines. You are responsible for the content you post and must respect the intellectual property of others.";
                }
                S.core.openModal("modal-doc");
            } else {
                S.core.openModal(modalId);
            }
        });
    });

    // Submit Contact Form
    const formContact = document.getElementById("form-contact");
    if (formContact) {
        formContact.addEventListener("submit", (e) => {
            e.preventDefault();
            S.core.closeModal("modal-contact");
            formContact.reset();
            S.core.showToast("Message sent! Support will contact you soon.");
        });
    }

    // Submit Report Form
    const formReport = document.getElementById("form-report");
    if (formReport) {
        formReport.addEventListener("submit", (e) => {
            e.preventDefault();
            S.core.closeModal("modal-report");
            formReport.reset();
            S.core.showToast("Report submitted! Thanks for helping us improve.");
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        loadStorage();
        loadFaq();
    });

})();
