/**
 * File: settings-profile.js
 * Logic: Cắt ảnh Facebook style, Camera, Upload, Fetch API.
 * 1 Nguồn dữ liệu duy nhất từ localStorage('user').
 */
(function () {
  const S = window.Lib95.settings;

  const form = document.getElementById("form-profile");
  const inputName = document.getElementById("profile-name");
  const inputEmail = document.getElementById("profile-email");
  const inputBio = document.getElementById("profile-bio");
  const bioCount = document.getElementById("profile-bio-count");
  const btnSave = document.getElementById("btn-save-profile");
  const avatarPreview = document.getElementById("profile-avatar-preview");
  
  const btnChangePhoto = document.getElementById("btn-change-photo");
  const photoUploadInput = document.getElementById("photo-upload-input");
  const btnPhotoCamera = document.getElementById("btn-photo-camera");
  const btnPhotoRemove = document.getElementById("btn-photo-remove");
  const modalPhotoPreview = document.getElementById("modal-photo-preview");
  
  const cameraContainer = document.getElementById("camera-container");
  const cameraVideo = document.getElementById("camera-video");
  const btnCameraCapture = document.getElementById("btn-camera-capture");
  const btnCameraCancel = document.getElementById("btn-camera-cancel");

  const cropContainer = document.getElementById("crop-container");
  const cropWorkspace = document.getElementById("crop-workspace");
  const btnCropApply = document.getElementById("btn-crop-apply");
  const btnCropCancel = document.getElementById("btn-crop-cancel");
  const modalError = document.getElementById("modal-photo-error");
  
  let initialData = {};
  let tempAvatarDataUrl = null; 
  let cropper = null;
  let stream = null;

  function setDirty(state) {
      if (btnSave) btnSave.disabled = !state;
  }

  function loadProfile() {
    // [FIX]: 1 Nguồn dữ liệu duy nhất từ user login data
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem('user'));
    } catch(e) {}
    
    if (!user) return; // Chưa đăng nhập hoặc mất data

    let displayName = user.full_name;
    if (!displayName && user.username) {
        displayName = user.username.split('@')[0];
        displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
    }

    initialData = {
      name: displayName || "",
      email: user.username || "",
      bio: user.bio || "",
      avatarDataUrl: user.avatar_url || null
    };

    if (inputName) inputName.value = initialData.name;
    if (inputEmail) inputEmail.value = initialData.email;
    if (inputBio) {
        inputBio.value = initialData.bio;
        // [FIX]: Cập nhật bộ đếm ký tự ngay khi load
        if (bioCount) bioCount.textContent = initialData.bio.length;
    }
    
    updatePreviewUI(initialData.avatarDataUrl);
    setDirty(false);
  }

  function updatePreviewUI(url) {
    if (!avatarPreview) return;
    if (url) {
        avatarPreview.style.backgroundImage = 'url(' + url + ')';
        avatarPreview.style.backgroundSize = "cover";
        avatarPreview.style.backgroundPosition = "center";
        avatarPreview.textContent = "";
    } else {
        avatarPreview.style.backgroundImage = "none";
        const n = (inputName && inputName.value) ? inputName.value : "A";
        avatarPreview.textContent = n.charAt(0).toUpperCase();
    }
  }

  function showError(msg) {
      if (!modalError) return;
      if (msg) {
          modalError.textContent = msg;
          modalError.style.display = "block";
      } else {
          modalError.style.display = "none";
      }
  }

  function resetModal() {
      stopCamera();
      if (cropper) { cropper.destroy(); cropper = null; }
      if (cameraContainer) cameraContainer.style.display = "none";
      if (cropContainer) cropContainer.style.display = "none";
      showError(null);
  }

  if (btnChangePhoto) {
    btnChangePhoto.addEventListener("click", () => {
      resetModal();
      if (modalPhotoPreview) {
          modalPhotoPreview.style.backgroundImage = "none";
          modalPhotoPreview.innerHTML = "";
          const n = (inputName && inputName.value) ? inputName.value : "A";
          modalPhotoPreview.textContent = n.charAt(0).toUpperCase();
      }
      if (S && S.core) S.core.openModal("modal-photo");
    });
  }

  document.querySelectorAll('[data-close="modal-photo"]').forEach(btn => {
      btn.addEventListener('click', resetModal);
  });

  function startCrop(imgSrc) {
      resetModal();
      if (cropContainer) cropContainer.style.display = "flex";
      if (cropWorkspace) cropWorkspace.innerHTML = '<img id="cropper-img" src="' + imgSrc + '" style="max-width: 100%; display: block;">';
      
      const imgEl = document.getElementById('cropper-img');
      if (imgEl && window.Cropper) {
          cropper = new Cropper(imgEl, {
              aspectRatio: 1,
              viewMode: 1,
              dragMode: 'move',
              autoCropArea: 1,
              background: false
          });
      }
  }

  if (photoUploadInput) {
    photoUploadInput.addEventListener("change", function(e) {
      const file = e.target.files[0];
      if (!file) return;
      showError(null);

      if (!file.type.startsWith("image/")) {
          e.target.value = "";
          return showError("Lỗi: Chỉ chấp nhận ảnh JPG, PNG, GIF.");
      }
      if (file.size > 5 * 1024 * 1024) {
          e.target.value = "";
          return showError("Lỗi: Kích thước ảnh tối đa là 5MB.");
      }

      const reader = new FileReader();
      reader.onload = (event) => startCrop(event.target.result);
      reader.readAsDataURL(file);
      e.target.value = ""; 
    });
  }

  function stopCamera() {
      if (stream) {
          stream.getTracks().forEach(track => track.stop());
          stream = null;
      }
  }

  if (btnPhotoCamera) {
      btnPhotoCamera.addEventListener("click", async () => {
          resetModal();
          showError(null);
          try {
              stream = await navigator.mediaDevices.getUserMedia({ video: true });
              if (cameraVideo) cameraVideo.srcObject = stream;
              if (cameraContainer) cameraContainer.style.display = "flex";
          } catch (err) {
              showError("Không thể truy cập camera. Vui lòng cấp quyền.");
          }
      });
  }

  if (btnCameraCancel) {
      btnCameraCancel.addEventListener("click", resetModal);
  }

  if (btnCameraCapture) {
      btnCameraCapture.addEventListener("click", () => {
          if (!cameraVideo) return;
          const canvas = document.createElement("canvas");
          canvas.width = cameraVideo.videoWidth;
          canvas.height = cameraVideo.videoHeight;
          const ctx = canvas.getContext("2d");
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1); // Flip mirror
          ctx.drawImage(cameraVideo, 0, 0, canvas.width, canvas.height);
          stopCamera();
          startCrop(canvas.toDataURL("image/jpeg"));
      });
  }

  if (btnCropCancel) {
      btnCropCancel.addEventListener("click", resetModal);
  }

  if (btnCropApply) {
      btnCropApply.addEventListener("click", () => {
          if (cropper) {
              tempAvatarDataUrl = cropper.getCroppedCanvas({ width: 256, height: 256 }).toDataURL("image/jpeg", 0.9);
              initialData.avatarDataUrl = tempAvatarDataUrl;
              updatePreviewUI(tempAvatarDataUrl);
              setDirty(true);
              if (S && S.core) S.core.closeModal("modal-photo");
              resetModal();
          }
      });
  }

  if (btnPhotoRemove) {
      btnPhotoRemove.addEventListener("click", () => {
          tempAvatarDataUrl = null;
          initialData.avatarDataUrl = null;
          updatePreviewUI(null);
          setDirty(true);
          if (S && S.core) S.core.closeModal("modal-photo");
          resetModal();
      });
  }

  [inputName, inputBio].forEach(input => {
      if(input) {
          input.addEventListener("input", () => {
              if (inputName.value !== initialData.name || inputBio.value !== initialData.bio) {
                  setDirty(true);
              }
          });
      }
  });

  if (inputBio) {
      inputBio.addEventListener("input", () => {
          if (bioCount) bioCount.textContent = inputBio.value.length;
      });
  }

  if (btnSave) {
      btnSave.addEventListener("click", async (e) => {
          e.preventDefault();
          const token = localStorage.getItem("token");
          if(!token) return alert("Vui lòng đăng nhập lại!");

          const btnOrigText = btnSave.textContent;
          btnSave.textContent = "Saving...";
          btnSave.disabled = true;

          try {
              const res = await fetch("http://localhost:3000/api/users/profile", {
                  method: "PUT",
                  headers: { 
                      "Content-Type": "application/json",
                      "Authorization": 'Bearer ' + token
                  },
                  body: JSON.stringify({
                      full_name: inputName.value,
                      bio: inputBio.value,
                      avatar_url: initialData.avatarDataUrl
                  })
              });

              const data = await res.json();
              if(res.ok) {
                  localStorage.setItem("user", JSON.stringify(data.user));
                  
                  // Kích hoạt lại module đồng bộ Avatar toàn cục
                  if(typeof renderProfile === 'function') renderProfile();
                  
                  initialData.name = inputName.value;
                  initialData.bio = inputBio.value;
                  setDirty(false);
                  if (S && S.core) if (S && S.core) S.core.openModal("set-overlay-saved"); else document.getElementById("set-overlay-saved").hidden = false;
              } else {
                  alert(data.error || "Lỗi lưu cấu hình");
              }
          } catch(err) {
              alert("Lỗi kết nối máy chủ");
          }
          btnSave.textContent = btnOrigText;
      });
  }

  // Khởi chạy khi load
  setTimeout(loadProfile, 100);
})();

