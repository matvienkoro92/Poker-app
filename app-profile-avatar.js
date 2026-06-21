function initProfileAvatar() {
  var avatarEl = document.getElementById("profileAvatar");
  var inputEl = document.getElementById("profileAvatarInput");
  var feedbackEl = document.getElementById("profileAvatarFeedback");
  if (!avatarEl || !inputEl) return;

  var base = getApiBase();

  var uploadInProgress = false;
  var avatarPickSessionActive = false;
  var objectUrlPending = null;

  function revokePendingObjectUrl() {
    if (objectUrlPending) {
      try {
        URL.revokeObjectURL(objectUrlPending);
      } catch (eRevO) {}
      objectUrlPending = null;
    }
  }

  function setProfileAvatarPending() {
    avatarEl.classList.add("profile-avatar-block__img--pending");
    avatarEl.dataset.avatarId = "";
    try {
      avatarEl.removeAttribute("src");
    } catch (ePendingSrc) {}
    pokerApplyProfileAvatarMirror("");
  }

  function applyProfileAvatarSrc(src, avatarId) {
    var safeSrc = String(src || "").trim();
    if (!safeSrc) return;
    avatarEl.classList.remove("profile-avatar-block__img--pending");
    avatarEl.src = safeSrc;
    avatarEl.alt = "Аватар";
    avatarEl.dataset.avatarId = avatarId || pokerFindPresetAvatarIdBySrc(safeSrc) || "";
    pokerApplyProfileAvatarMirror(safeSrc);
    try {
      if (typeof refreshProfilePublicShowcase === "function") refreshProfilePublicShowcase();
    } catch (ePublicAvatarRefresh) {}
  }

  function fetchProfileAvatarFromServer() {
    if (uploadInProgress || avatarPickSessionActive) return;
    base = base || getApiBase();
    if (!base) {
      revokePendingObjectUrl();
      applyProfileAvatarSrc(POKER_PROFILE_AVATAR_PLACEHOLDER, "");
      return;
    }
    inputEl.value = "";
    var cached = pokerReadAvatarCacheEntry();
    if (cached) {
      if (uploadInProgress || avatarPickSessionActive) return;
      revokePendingObjectUrl();
      if (cached.avatar) {
        applyProfileAvatarSrc(cached.avatar, pokerFindPresetAvatarIdBySrc(cached.avatar) || "");
      } else {
        applyProfileAvatarSrc(POKER_PROFILE_AVATAR_PLACEHOLDER, "");
      }
      return;
    }
    setProfileAvatarPending();
    var aq = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
    var tsSep = aq.indexOf("?") === 0 ? "&" : "?";
    fetch(base + "/api/avatar" + aq + tsSep + "_ts=" + Date.now(), { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (uploadInProgress || avatarPickSessionActive) return;
        if (data && data.ok) {
          pokerWriteAvatarCacheEntry(data.avatar || "");
        }
        if (data && data.ok && data.avatar) {
          revokePendingObjectUrl();
          applyProfileAvatarSrc(data.avatar, data.avatarId || "");
        } else {
          revokePendingObjectUrl();
          applyProfileAvatarSrc(POKER_PROFILE_AVATAR_PLACEHOLDER, "");
        }
      })
      .catch(function () {
        if (!uploadInProgress && !avatarPickSessionActive) {
          revokePendingObjectUrl();
          applyProfileAvatarSrc(POKER_PROFILE_AVATAR_PLACEHOLDER, "");
        }
      });
  }

  if (avatarEl.getAttribute("data-poker-avatar-bound") === "1") {
    fetchProfileAvatarFromServer();
    return;
  }
  avatarEl.setAttribute("data-poker-avatar-bound", "1");

  function showAvatarFeedback(text, isError) {
    if (!feedbackEl) return;
    feedbackEl.textContent = text || "";
    feedbackEl.classList.toggle("profile-avatar-block__feedback--visible", !!text);
    feedbackEl.style.color = isError ? "#ef4444" : "";
    if (text && !isError && !/загрузк|сохранение/i.test(text)) {
      var hideMs = /сохранена|загружена|обновлена/i.test(text) ? 5200 : 3500;
      setTimeout(function () {
        if (feedbackEl.textContent === text) {
          feedbackEl.textContent = "";
          feedbackEl.classList.remove("profile-avatar-block__feedback--visible");
        }
      }, hideMs);
    }
  }

  function getProfileAvatarChoiceModal() {
    var modal = document.getElementById("profileAvatarChoiceModal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.id = "profileAvatarChoiceModal";
    modal.className = "profile-avatar-choice-modal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML =
      '<div class="profile-avatar-choice-modal__backdrop" data-avatar-close="1"></div>' +
      '<div class="profile-avatar-choice-modal__panel" role="dialog" aria-modal="true" aria-labelledby="profileAvatarChoiceTitle">' +
      '<div class="profile-avatar-choice-modal__head">' +
      '<h2 class="profile-avatar-choice-modal__title" id="profileAvatarChoiceTitle">Выберите аватар</h2>' +
      '<button type="button" class="profile-avatar-choice-modal__close" data-avatar-close="1" aria-label="Закрыть">×</button>' +
      "</div>" +
      '<div class="profile-avatar-choice-modal__grid" id="profileAvatarChoiceGrid"></div>' +
      '<div class="profile-avatar-choice-modal__actions">' +
      '<button type="button" class="profile-avatar-choice-modal__upload" data-avatar-upload="1">Загрузить своё фото</button>' +
      "</div>" +
      "</div>";
    document.body.appendChild(modal);
    modal.addEventListener("click", function (e) {
      var closeBtn = e.target && e.target.closest ? e.target.closest("[data-avatar-close]") : null;
      if (closeBtn) {
        closeProfileAvatarChoiceModal();
        return;
      }
      var uploadBtn = e.target && e.target.closest ? e.target.closest("[data-avatar-upload]") : null;
      if (uploadBtn) {
        closeProfileAvatarChoiceModal();
        openProfileAvatarFilePicker();
        return;
      }
      var btn = e.target && e.target.closest ? e.target.closest(".profile-avatar-choice-modal__item[data-avatar-id]") : null;
      if (!btn) return;
      var id = btn.getAttribute("data-avatar-id");
      if (!id) return;
      savePresetAvatar(id);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("profile-avatar-choice-modal--open")) {
        closeProfileAvatarChoiceModal();
      }
    });
    return modal;
  }

  function renderProfileAvatarChoiceGrid() {
    var modal = getProfileAvatarChoiceModal();
    var grid = document.getElementById("profileAvatarChoiceGrid");
    if (!grid) return;
    var currentId = avatarEl.dataset.avatarId || pokerFindPresetAvatarIdBySrc(avatarEl.getAttribute("src") || avatarEl.src || "");
    grid.innerHTML = POKER_PROFILE_AVATAR_PRESETS.map(function (preset) {
      var active = preset.id === currentId;
      return (
        '<button type="button" class="profile-avatar-choice-modal__item' +
        (active ? " profile-avatar-choice-modal__item--active" : "") +
        '" data-avatar-id="' +
        escapeHtml(preset.id) +
        '" aria-pressed="' +
        (active ? "true" : "false") +
        '" aria-label="' +
        escapeHtml(preset.label) +
        '">' +
        '<img class="profile-avatar-choice-modal__img" src="' +
        escapeHtml(preset.src) +
        '" alt="" loading="lazy" decoding="async" />' +
        '<span class="profile-avatar-choice-modal__check" aria-hidden="true">✓</span>' +
        "</button>"
      );
    }).join("");
    modal.classList.toggle("profile-avatar-choice-modal--has-active", !!currentId);
  }

  function openProfileAvatarChoiceModal() {
    if (uploadInProgress || avatarPickSessionActive) return;
    renderProfileAvatarChoiceGrid();
    var modal = getProfileAvatarChoiceModal();
    modal.classList.add("profile-avatar-choice-modal--open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("profile-avatar-choice-open");
  }

  window.__pokerOpenProfileAvatarChoiceModal = openProfileAvatarChoiceModal;

  function closeProfileAvatarChoiceModal() {
    var modal = document.getElementById("profileAvatarChoiceModal");
    if (!modal) return;
    modal.classList.remove("profile-avatar-choice-modal--open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("profile-avatar-choice-open");
  }

  function savePresetAvatar(id) {
    var preset = pokerFindPresetAvatarById(id);
    if (!preset || uploadInProgress) return;
    base = base || getApiBase();
    if (!base || (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential())) {
      if (tg && tg.showAlert) tg.showAlert("Войдите в приложение (Telegram или PWA).");
      else if (typeof alert === "function") alert("Войдите в приложение (Telegram или PWA).");
      return;
    }
    uploadInProgress = true;
    showAvatarFeedback("Сохранение…", false);
    var payload =
      typeof pokerApiAuthJsonBody === "function"
        ? pokerApiAuthJsonBody({ avatarId: preset.id })
        : { avatarId: preset.id, initData: tg && tg.initData ? tg.initData : "" };
    fetch(base + "/api/avatar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    })
      .then(function (r) {
        return r.json().catch(function () {
          return { ok: false, error: r.ok ? "Некорректный ответ" : "HTTP " + r.status };
        });
      })
      .then(function (data) {
        if (data && data.ok && data.avatar) {
          var newSrc = data.avatar;
          applyProfileAvatarSrc(newSrc, data.avatarId || preset.id);
          pokerWriteAvatarCacheEntry(newSrc);
          loadHeaderAvatar();
          renderProfileAvatarChoiceGrid();
          closeProfileAvatarChoiceModal();
          showAvatarFeedback("Аватар сохранён", false);
        } else {
          if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Ошибка сохранения");
          showAvatarFeedback((data && data.error) || "Ошибка сохранения", true);
        }
      })
      .catch(function () {
        if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        showAvatarFeedback(POKER_NET_ERR, true);
      })
      .finally(function () {
        uploadInProgress = false;
      });
  }

  function resizeImage(file, maxW, maxH, quality, cb) {
    var img = new Image();
    var canvas = document.createElement("canvas");
    var objUrl = URL.createObjectURL(file);
    img.onload = function () {
      try {
        URL.revokeObjectURL(objUrl);
      } catch (eRev) {}
      var w = img.width, h = img.height;
      if (w > maxW || h > maxH) {
        var r = Math.min(maxW / w, maxH / h);
        w = Math.round(w * r);
        h = Math.round(h * r);
      }
      canvas.width = w;
      canvas.height = h;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      try {
        var dataUrl = canvas.toDataURL("image/jpeg", quality);
        cb(dataUrl);
      } catch (e) {
        var reader = new FileReader();
        reader.onload = function () { cb(reader.result); };
        reader.readAsDataURL(file);
      }
    };
    img.onerror = function () {
      try {
        URL.revokeObjectURL(objUrl);
      } catch (eRev2) {}
      var reader = new FileReader();
      reader.onload = function () { cb(reader.result); };
      reader.readAsDataURL(file);
    };
    img.src = objUrl;
  }

  function openProfileAvatarFilePicker() {
    if (uploadInProgress || avatarPickSessionActive) return;
    base = base || getApiBase();
    if (!base || (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential())) {
      if (tg && tg.showAlert) tg.showAlert("Войдите в приложение (Telegram или PWA).");
      else if (typeof alert === "function") alert("Войдите в приложение (Telegram или PWA).");
      return;
    }
    /* Сброс перед click: иначе повторный выбор того же файла не даёт событие change (iOS / часть WebKit). */
    try {
      inputEl.value = "";
    } catch (eInp0) {}
    inputEl.click();
  }

  function uploadAvatar(dataUrl) {
    /* Обработка файла закончилась — сессия выбора снята; дальше только uploadInProgress блокирует повторный pick. */
    avatarPickSessionActive = false;
    uploadInProgress = true;
    showAvatarFeedback("Загрузка на сервер…", false);
    var payload =
      typeof pokerApiAuthJsonBody === "function"
        ? pokerApiAuthJsonBody({ image: dataUrl })
        : { image: dataUrl, initData: tg && tg.initData ? tg.initData : "" };
    fetch(base + "/api/avatar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    })
      .then(function (r) {
        return r.json().catch(function () {
          return { ok: false, error: r.ok ? "Некорректный ответ" : "HTTP " + r.status };
        });
      })
      .then(function (data) {
        if (data && data.ok && data.avatar) {
          revokePendingObjectUrl();
          var newSrc = data.avatar;
          pokerWriteAvatarCacheEntry(newSrc);
          try {
            /* Дважды подряд тот же data: URL — часть движков не перерисовывает img без сброса src. */
            if (String(avatarEl.src || "") === String(newSrc)) {
              avatarEl.removeAttribute("src");
              var rafA = window.requestAnimationFrame || function (fn) {
                setTimeout(fn, 16);
              };
              rafA(function () {
                applyProfileAvatarSrc(newSrc, "");
              });
            } else {
              applyProfileAvatarSrc(newSrc, "");
            }
          } catch (eSrcA) {
            applyProfileAvatarSrc(newSrc, "");
          }
          loadHeaderAvatar();
          showAvatarFeedback("Фотография сохранена", false);
        } else {
          if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Ошибка загрузки");
          showAvatarFeedback((data && data.error) || "Ошибка сохранения", true);
          fetchProfileAvatarFromServer();
          setTimeout(function () {
            feedbackEl.textContent = "";
            feedbackEl.classList.remove("profile-avatar-block__feedback--visible");
            feedbackEl.style.color = "";
          }, 4000);
        }
      })
      .catch(function () {
        if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        showAvatarFeedback(POKER_NET_ERR, true);
        fetchProfileAvatarFromServer();
        setTimeout(function () {
          feedbackEl.textContent = "";
          feedbackEl.classList.remove("profile-avatar-block__feedback--visible");
          feedbackEl.style.color = "";
        }, 4000);
      })
      .finally(function () {
        uploadInProgress = false;
        avatarPickSessionActive = false;
        try {
          inputEl.value = "";
        } catch (eFin) {}
      });
  }

  function uploadAvatarAfterPick(toSend) {
    var base64 = toSend.replace(/^data:image\/\w+;base64,/, "");
    if (base64.length > 430000) {
      var im = new Image();
      var settled = false;
      var tIm = setTimeout(function () {
        if (settled) return;
        settled = true;
        uploadAvatar(toSend);
      }, 12000);
      im.onload = function () {
        if (settled) return;
        clearTimeout(tIm);
        settled = true;
        var canvas = document.createElement("canvas");
        var w = im.width,
          h = im.height;
        var r = Math.min(420 / w, 420 / h, 1);
        w = Math.round(w * r);
        h = Math.round(h * r);
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(im, 0, 0, w, h);
        try {
          uploadAvatar(canvas.toDataURL("image/jpeg", 0.82));
        } catch (eSm) {
          uploadAvatar(toSend);
        }
      };
      im.onerror = function () {
        if (settled) return;
        clearTimeout(tIm);
        settled = true;
        uploadAvatar(toSend);
      };
      im.src = toSend;
    } else {
      uploadAvatar(toSend);
    }
  }

  avatarEl.addEventListener("click", function () {
    openProfileAvatarChoiceModal();
  });
  avatarEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openProfileAvatarChoiceModal();
    }
  });

  inputEl.addEventListener("change", function () {
    var file = inputEl.files && inputEl.files[0];
    if (!file || !file.type.match(/^image\/(jpeg|png|webp)$/)) {
      if (tg && tg.showAlert) tg.showAlert("Выберите изображение (JPG, PNG или WebP).");
      inputEl.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      if (tg && tg.showAlert) tg.showAlert("Файл не более 5 МБ.");
      inputEl.value = "";
      return;
    }
    avatarPickSessionActive = true;
    revokePendingObjectUrl();
    try {
      objectUrlPending = URL.createObjectURL(file);
      applyProfileAvatarSrc(objectUrlPending, "");
    } catch (eOb) {}
    resizeImage(file, 512, 512, 0.88, function (dataUrl) {
      try {
        var base64 = dataUrl.replace(/^data:image\/\w+;base64,/, "");
        if (base64.length > 430000) {
          resizeImage(file, 420, 420, 0.82, function (dataUrl2) {
            try {
              revokePendingObjectUrl();
              applyProfileAvatarSrc(dataUrl2, "");
              try {
                inputEl.value = "";
              } catch (eInp1) {}
              uploadAvatarAfterPick(dataUrl2);
            } catch (eRs2) {
              avatarPickSessionActive = false;
              try {
                inputEl.value = "";
              } catch (eInp2) {}
              showAvatarFeedback("Не удалось подготовить фото", true);
              fetchProfileAvatarFromServer();
            }
          });
        } else {
          revokePendingObjectUrl();
          applyProfileAvatarSrc(dataUrl, "");
          try {
            inputEl.value = "";
          } catch (eInp3) {}
          uploadAvatarAfterPick(dataUrl);
        }
      } catch (eRs) {
        avatarPickSessionActive = false;
        try {
          inputEl.value = "";
        } catch (eInp4) {}
        showAvatarFeedback("Не удалось подготовить фото", true);
        fetchProfileAvatarFromServer();
      }
    });
  });

  fetchProfileAvatarFromServer();
}

if (!window.__pokerProfileAvatarDelegatedOpenBound) {
  window.__pokerProfileAvatarDelegatedOpenBound = true;
  document.addEventListener(
    "click",
    function (e) {
      var target = e.target && e.target.closest ? e.target.closest("#profileAvatar") : null;
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();
      try {
        if (typeof initProfileAvatar === "function") initProfileAvatar();
      } catch (eInitAvatar) {}
      if (typeof window.__pokerOpenProfileAvatarChoiceModal === "function") {
        window.__pokerOpenProfileAvatarChoiceModal();
      }
    },
    true
  );
  document.addEventListener(
    "keydown",
    function (e) {
      var target = e.target && e.target.closest ? e.target.closest("#profileAvatar") : null;
      if (!target || (e.key !== "Enter" && e.key !== " ")) return;
      e.preventDefault();
      try {
        if (typeof initProfileAvatar === "function") initProfileAvatar();
      } catch (eInitAvatarKey) {}
      if (typeof window.__pokerOpenProfileAvatarChoiceModal === "function") {
        window.__pokerOpenProfileAvatarChoiceModal();
      }
    },
    true
  );
}
