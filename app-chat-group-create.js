// Create group modal wiring.

function initChatCreateGroupModal(opts) {
  opts = opts || {};
  var base = opts.base || (typeof getApiBase === "function" ? getApiBase() : "");
  var tg = opts.tg || (window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null);
  var escapeHtml = typeof opts.escapeHtml === "function"
    ? opts.escapeHtml
    : function (s) {
        return String(s == null ? "" : s)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");
      };
  var resolveMyChatMemberId = typeof opts.resolveMyChatMemberId === "function"
    ? opts.resolveMyChatMemberId
    : function () {
        return typeof window.__pokerResolveMyChatMemberId === "function" ? window.__pokerResolveMyChatMemberId() : "";
      };
  var openConvFromDialogs = typeof opts.openConvFromDialogs === "function"
    ? opts.openConvFromDialogs
    : function (userId, userName, peerP21Id, peerAvatarOpt) {
        if (typeof window.chatOpenConvFromDialogs === "function") {
          window.chatOpenConvFromDialogs(userId, userName, peerP21Id, peerAvatarOpt);
        }
      };
  var resizeImage = typeof opts.resizeImage === "function" ? opts.resizeImage : null;
  var modal = document.getElementById("chatCreateGroupModal");
  var btnOpen = document.getElementById("chatNewGroupBtn");
  if (!modal || !btnOpen) return;
  var backdrop = document.getElementById("chatCreateGroupModalBackdrop");
  var btnClose = document.getElementById("chatCreateGroupModalClose");
  var btnCancel = document.getElementById("chatCreateGroupCancelBtn");
  var btnSubmit = document.getElementById("chatCreateGroupSubmitBtn");
  var titleInp = document.getElementById("chatCreateGroupTitleInput");
  var descInp = document.getElementById("chatCreateGroupDescInput");
  var pickerAll = document.getElementById("chatCreateGroupPickerAll");
  var pickerFriends = document.getElementById("chatCreateGroupPickerFriends");
  var paneAll = document.getElementById("chatCreateGroupPaneAll");
  var paneFriends = document.getElementById("chatCreateGroupPaneFriends");
  var paneManual = document.getElementById("chatCreateGroupPaneManual");
  var manualInp = document.getElementById("chatCreateGroupManualInput");
  var manualHint = document.getElementById("chatCreateGroupManualHint");
  var manualAdd = document.getElementById("chatCreateGroupManualAddBtn");
  var selectedEl = document.getElementById("chatCreateGroupSelected");
  var selectedMap = Object.create(null);
  var avatarInp = document.getElementById("chatCreateGroupAvatarInput");
  var avatarBtn = document.getElementById("chatCreateGroupAvatarBtn");
  var avatarPreview = document.getElementById("chatCreateGroupAvatarPreview");
  var avatarPh = document.getElementById("chatCreateGroupAvatarPh");
  var avatarClear = document.getElementById("chatCreateGroupAvatarClear");
  var createGroupAvatarDataUrl = null;
  function resetGroupCreateAvatar() {
    createGroupAvatarDataUrl = null;
    if (avatarPreview) {
      avatarPreview.classList.add("chat-create-group-modal__avatar-img--hidden");
      try {
        avatarPreview.removeAttribute("src");
      } catch (eAv) {}
    }
    if (avatarPh) avatarPh.style.display = "";
    if (avatarClear) avatarClear.hidden = true;
    if (avatarInp) avatarInp.value = "";
  }

  function closeModal() {
    modal.classList.add("chat-create-group-modal--hidden");
    modal.setAttribute("aria-hidden", "true");
  }
  function openModal() {
    window.__pokerGroupPickContactsRetryOnce = true;
    selectedMap = Object.create(null);
    resetGroupCreateAvatar();
    if (titleInp) titleInp.value = "";
    if (descInp) descInp.value = "";
    if (manualInp) manualInp.value = "";
    if (manualHint) manualHint.textContent = "";
    setTabCreateGroup("all");
    /* Сначала показываем модалку: иначе быстрый ответ mode=contacts приходит до снятия --hidden и refresh пикеров в applyContactsApiResponse пропускается — пустые «Все»/«Друзья». */
    modal.classList.remove("chat-create-group-modal--hidden");
    modal.setAttribute("aria-hidden", "false");
    function paintCreateGroupAfterContacts() {
      try {
        renderPickers();
        renderSelected();
      } catch (ePaintCg) {}
    }
    paintCreateGroupAfterContacts();
    if (typeof window.__pokerReloadChatContacts === "function") {
      try {
        window.__pokerReloadChatContacts({ onLoaded: paintCreateGroupAfterContacts });
      } catch (eRelCg) {}
    }
    try {
      if (typeof window.__pokerFetchFriendsForGroupPick === "function") {
        window.__pokerFetchFriendsForGroupPick(paintCreateGroupAfterContacts);
      }
    } catch (eFrCg) {}
    try {
      var rafCg = window.requestAnimationFrame || function (fn) {
        setTimeout(fn, 0);
      };
      rafCg(function () {
        try {
          if (typeof window.__pokerRefreshCreateGroupPickers === "function") {
            window.__pokerRefreshCreateGroupPickers();
          }
        } catch (eRafCg) {}
      });
    } catch (eRafCg0) {}
    setTimeout(function () {
      try {
        var mCg = document.getElementById("chatCreateGroupModal");
        if (!mCg || mCg.classList.contains("chat-create-group-modal--hidden")) return;
        if (typeof pokerBuildGroupModalContactList !== "function") return;
        if (pokerBuildGroupModalContactList().length > 0) return;
        if (typeof window.__pokerFetchGeneralRosterForGroupPickIfEmpty !== "function") return;
        window.__pokerFetchGeneralRosterForGroupPickIfEmpty(function () {
          try {
            if (typeof window.__pokerRefreshCreateGroupPickers === "function") {
              window.__pokerRefreshCreateGroupPickers();
            }
          } catch (eBrCg) {}
        });
      } catch (eTcg) {}
    }, 560);
    try {
      if (titleInp) titleInp.focus();
    } catch (eFoc) {}
  }
  function renderSelected() {
    if (!selectedEl) return;
    var ids = Object.keys(selectedMap);
    if (!ids.length) {
      selectedEl.innerHTML = '<span class="chat-create-group-modal__selected-empty">Пока никого</span>';
      return;
    }
    selectedEl.innerHTML = ids
      .map(function (id) {
        return (
          '<span class="chat-create-group-modal__chip"><span>' +
          escapeHtml(selectedMap[id] || id) +
          '</span><button type="button" class="chat-create-group-modal__chip-remove" data-remove-id="' +
          escapeHtml(id) +
          '" aria-label="Убрать">×</button></span>'
        );
      })
      .join("");
  }
  function contactListFromApi() {
    return pokerBuildGroupModalContactList();
  }
  function paintPicker(container, arr) {
    if (!container) return;
    if (!arr.length) {
      container.innerHTML =
        '<p class="chat-create-group-modal__empty">Нет личных диалогов. Сначала напишите человеку в чате клуба — он появится здесь и во вкладке «Все».</p>';
      return;
    }
    container.innerHTML = arr
      .map(function (c) {
        var id = c.id;
        var nm =
          c.contactName != null && String(c.contactName).trim()
            ? String(c.contactName).trim()
            : c.name || id;
        var on = !!selectedMap[id];
        return (
          '<button type="button" class="chat-create-group-modal__pick' +
          (on ? " chat-create-group-modal__pick--on" : "") +
          '" data-pick-id="' +
          escapeHtml(id) +
          '" data-pick-name="' +
          escapeHtml(nm) +
          '">' +
          escapeHtml(nm) +
          "</button>"
        );
      })
      .join("");
  }
  function renderPickers() {
    var list = contactListFromApi();
    var fr = list.filter(function (c) {
      return c && c.id && typeof pokerChatPeerIdIsFriend === "function" && pokerChatPeerIdIsFriend(c.id);
    });
    paintPicker(pickerAll, list);
    paintPicker(pickerFriends, fr);
  }
  window.__pokerRefreshCreateGroupPickers = function () {
    try {
      renderPickers();
    } catch (eRfCg) {}
  };
  function setTabCreateGroup(tab) {
    var tabs = modal.querySelectorAll("[data-create-group-tab]");
    for (var ti = 0; ti < tabs.length; ti++) {
      var t = tabs[ti];
      var on = t.getAttribute("data-create-group-tab") === tab;
      t.classList.toggle("chat-create-group-modal__tab--active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    }
    if (paneAll) {
      var showA = tab === "all";
      paneAll.classList.toggle("chat-create-group-modal__pane--hidden", !showA);
      if (showA) paneAll.removeAttribute("hidden");
      else paneAll.setAttribute("hidden", "hidden");
    }
    if (paneFriends) {
      var showF = tab === "friends";
      paneFriends.classList.toggle("chat-create-group-modal__pane--hidden", !showF);
      if (showF) paneFriends.removeAttribute("hidden");
      else paneFriends.setAttribute("hidden", "hidden");
    }
    if (paneManual) {
      var showM = tab === "manual";
      paneManual.classList.toggle("chat-create-group-modal__pane--hidden", !showM);
      if (showM) paneManual.removeAttribute("hidden");
      else paneManual.setAttribute("hidden", "hidden");
    }
  }
  modal.querySelectorAll("[data-create-group-tab]").forEach(function (t) {
    t.addEventListener("click", function () {
      var v = t.getAttribute("data-create-group-tab");
      if (v) setTabCreateGroup(v);
    });
  });
  function attachPickerDel(container) {
    if (!container || container._cgPickDel) return;
    container._cgPickDel = true;
    container.addEventListener("click", function (e) {
      var b = e.target && e.target.closest ? e.target.closest("[data-pick-id]") : null;
      if (!b || !container.contains(b)) return;
      e.preventDefault();
      var pid = b.getAttribute("data-pick-id");
      var pn = b.getAttribute("data-pick-name") || pid;
      if (!pid) return;
      if (selectedMap[pid]) delete selectedMap[pid];
      else selectedMap[pid] = pn;
      renderSelected();
      renderPickers();
    });
  }
  attachPickerDel(pickerAll);
  attachPickerDel(pickerFriends);
  if (selectedEl && !selectedEl._cgChipDel) {
    selectedEl._cgChipDel = true;
    selectedEl.addEventListener("click", function (e) {
      var b = e.target && e.target.closest ? e.target.closest("[data-remove-id]") : null;
      if (!b || !selectedEl.contains(b)) return;
      e.preventDefault();
      var rid = b.getAttribute("data-remove-id");
      if (rid) delete selectedMap[rid];
      renderSelected();
      renderPickers();
    });
  }
  function tryAddManual() {
    if (!manualInp || !manualHint) return;
    manualHint.textContent = "";
    var raw = (manualInp.value || "").trim().replace(/^@/, "");
    if (!raw) {
      manualHint.textContent = "Введите ник или ID";
      return;
    }
    var idPart = raw.toUpperCase();
    var byId =
      /^\d{6}$/.test(idPart) ||
      /^ID\d{6}$/.test(idPart) ||
      (idPart.startsWith("ID") && idPart.length === 8 && /^ID\d{6}$/.test(idPart));
    var url;
    if (byId) {
      var id = idPart.startsWith("ID") ? idPart : "ID" + idPart;
      url = base + "/api/users?id=" + encodeURIComponent(id) + pokerApiAuthQuery("&");
    } else {
      url = base + "/api/users?username=" + encodeURIComponent(raw) + pokerApiAuthQuery("&");
    }
    fetch(url)
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        if (data && data.ok && data.userId) {
          var uid = data.userId;
          var unm = data.userName || uid;
          var myIdX = resolveMyChatMemberId();
          if (myIdX && peerChatIdsEqual(uid, myIdX)) {
            manualHint.textContent = "Нельзя добавить себя";
            return;
          }
          if (typeof pokerPeerIsInMyChatPartnerList === "function" && !pokerPeerIsInMyChatPartnerList(uid)) {
            manualHint.textContent = "Можно добавить только того, с кем был личный диалог в чате клуба";
            return;
          }
          selectedMap[uid] = unm;
          manualInp.value = "";
          renderSelected();
          renderPickers();
          return;
        }
        manualHint.textContent = (data && data.error) || "Не найдено";
      })
      .catch(function () {
        manualHint.textContent = POKER_NET_ERR;
      });
  }
  if (manualAdd) manualAdd.addEventListener("click", tryAddManual);
  if (manualInp) {
    manualInp.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        tryAddManual();
      }
    });
  }
  if (btnSubmit) {
    btnSubmit.addEventListener("click", function () {
      var title = titleInp ? String(titleInp.value || "").trim() : "";
      if (!title) {
        if (tg && tg.showAlert) tg.showAlert("Введите название группы");
        else if (typeof alert === "function") alert("Введите название группы");
        return;
      }
      var ids = Object.keys(selectedMap);
      if (ids.length < 1) {
        if (tg && tg.showAlert) tg.showAlert("Добавьте хотя бы одного участника");
        else if (typeof alert === "function") alert("Добавьте хотя бы одного участника");
        return;
      }
      if (typeof pokerEnsureChatTelegramVerified === "function" && !pokerEnsureChatTelegramVerified()) return;
      if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
        if (tg && tg.showAlert) tg.showAlert("Войдите, чтобы создать группу");
        return;
      }
      btnSubmit.disabled = true;
      var createBody = { action: "createGroup", title: title, memberIds: ids };
      if (descInp) {
        var d0 = String(descInp.value || "").trim();
        if (d0) createBody.description = d0;
      }
      if (createGroupAvatarDataUrl) createBody.avatar = createGroupAvatarDataUrl;
      fetch(base + "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokerApiAuthJsonBody(createBody)),
      })
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          btnSubmit.disabled = false;
          if (data && data.ok && data.group && data.group.id) {
            closeModal();
            openConvFromDialogs(data.group.id, data.group.title || title, undefined, data.group.avatar);
            if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
          } else if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Ошибка");
          else if (typeof alert === "function") alert((data && data.error) || "Ошибка");
        })
        .catch(function () {
          btnSubmit.disabled = false;
          if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
          else if (typeof alert === "function") alert(POKER_NET_ERR);
        });
    });
  }
  btnOpen.addEventListener("click", function (e) {
    e.preventDefault();
    if (typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode()) {
      if (tg && tg.showAlert) tg.showAlert("Войдите в аккаунт");
      return;
    }
    if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      if (tg && tg.showAlert) tg.showAlert("Войдите, чтобы создать группу");
      return;
    }
    openModal();
  });
  if (backdrop) backdrop.addEventListener("click", closeModal);
  if (btnClose) btnClose.addEventListener("click", closeModal);
  if (btnCancel) btnCancel.addEventListener("click", closeModal);
  if (avatarBtn && avatarInp) {
    avatarBtn.addEventListener("click", function (e) {
      e.preventDefault();
      avatarInp.click();
    });
  }
  if (avatarClear) {
    avatarClear.addEventListener("click", function (e) {
      e.preventDefault();
      resetGroupCreateAvatar();
    });
  }
  if (avatarInp) {
    avatarInp.addEventListener("change", function () {
      var f = avatarInp.files && avatarInp.files[0];
      if (!f) return;
      resizeImage(f, 256, 256, 0.88)
        .then(function (dataUrl) {
          createGroupAvatarDataUrl = dataUrl;
          if (avatarPreview) {
            avatarPreview.src = dataUrl;
            avatarPreview.classList.remove("chat-create-group-modal__avatar-img--hidden");
          }
          if (avatarPh) avatarPh.style.display = "none";
          if (avatarClear) avatarClear.hidden = false;
        })
        .catch(function () {
          if (tg && tg.showAlert) tg.showAlert("Не удалось обработать изображение");
          else if (typeof alert === "function") alert("Не удалось обработать изображение");
          resetGroupCreateAvatar();
        });
      avatarInp.value = "";
    });
  }
}
