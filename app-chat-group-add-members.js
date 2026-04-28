// Group add-members and general invite modal wiring.

function initChatGroupAddMembersModal(opts) {
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
  var loadMessages = typeof opts.loadMessages === "function" ? opts.loadMessages : function () {};
  var getChatWithUserId = typeof opts.getChatWithUserId === "function" ? opts.getChatWithUserId : function () { return ""; };
  var modal = document.getElementById("chatGroupAddMembersModal");
  if (!modal) {
    window.__pokerOpenChatGroupAddMembers = function () {};
    window.__pokerOpenGeneralChatInviteMembers = function () {};
    return;
  }
  var GROUP_MEMBERS_MAX_UI = 50;
  var backdropAm = document.getElementById("chatGroupAddMembersModalBackdrop");
  var btnCloseAm = document.getElementById("chatGroupAddMembersModalClose");
  var btnCancelAm = document.getElementById("chatGroupAddCancelBtn");
  var btnSubmitAm = document.getElementById("chatGroupAddSubmitBtn");
  var metaHintAm = document.getElementById("chatGroupAddMembersMetaHint");
  var pickerAllAm = document.getElementById("chatGroupAddPickerAll");
  var pickerFriendsAm = document.getElementById("chatGroupAddPickerFriends");
  var paneAllAm = document.getElementById("chatGroupAddPaneAll");
  var paneFriendsAm = document.getElementById("chatGroupAddPaneFriends");
  var paneManualAm = document.getElementById("chatGroupAddPaneManual");
  var manualInpAm = document.getElementById("chatGroupAddManualInput");
  var manualHintAm = document.getElementById("chatGroupAddManualHint");
  var manualAddAm = document.getElementById("chatGroupAddManualBtn");
  var selectedElAm = document.getElementById("chatGroupAddSelected");
  var targetGroupIdAm = "";
  var excludeKeysAm = Object.create(null);
  var slotsLeftAm = GROUP_MEMBERS_MAX_UI;
  var selectedMapAm = Object.create(null);
  var groupAddModalTitleEl = document.getElementById("chatGroupAddMembersModalTitle");
  var groupAddModalDefaultTitle = "Добавить участников";
  function closeModalAmFn() {
    modal.classList.add("chat-create-group-modal--hidden");
    modal.setAttribute("aria-hidden", "true");
    targetGroupIdAm = "";
    if (btnSubmitAm) btnSubmitAm.disabled = false;
    if (groupAddModalTitleEl) groupAddModalTitleEl.textContent = groupAddModalDefaultTitle;
  }
  function inGroupAlreadyAm(userId) {
    if (!userId) return true;
    var k = normalizePeerIdForChat(userId);
    return !!excludeKeysAm[k];
  }
  function contactListFromApiAm() {
    return pokerBuildGroupModalContactList();
  }
  function paintPickerAm(container, arr) {
    if (!container) return;
    var usable = arr.filter(function (c) {
      return c && c.id && !inGroupAlreadyAm(c.id);
    });
    if (!usable.length) {
      container.innerHTML =
        '<p class="chat-create-group-modal__empty">Некого добавить из личных диалогов — попробуйте «Вручную» (только если с человеком уже была переписка в чате клуба)</p>';
      return;
    }
    container.innerHTML = usable
      .map(function (c) {
        var id = c.id;
        var nm =
          c.contactName != null && String(c.contactName).trim()
            ? String(c.contactName).trim()
            : c.name || id;
        var on = !!selectedMapAm[id];
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
  function renderPickersAm() {
    var list = contactListFromApiAm();
    var fr = list.filter(function (c) {
      return c && c.id && typeof pokerChatPeerIdIsFriend === "function" && pokerChatPeerIdIsFriend(c.id);
    });
    paintPickerAm(pickerAllAm, list);
    paintPickerAm(pickerFriendsAm, fr);
  }
  window.__pokerRefreshGroupAddPickers = function () {
    try {
      renderPickersAm();
    } catch (eRfAm) {}
  };
  function renderSelectedAm() {
    if (!selectedElAm) return;
    var ids = Object.keys(selectedMapAm);
    if (!ids.length) {
      selectedElAm.innerHTML = '<span class="chat-create-group-modal__selected-empty">Пока никого</span>';
      return;
    }
    selectedElAm.innerHTML = ids
      .map(function (id) {
        return (
          '<span class="chat-create-group-modal__chip"><span>' +
          escapeHtml(selectedMapAm[id] || id) +
          '</span><button type="button" class="chat-create-group-modal__chip-remove" data-remove-id="' +
          escapeHtml(id) +
          '" aria-label="Убрать">×</button></span>'
        );
      })
      .join("");
  }
  function setTabAmFn(tab) {
    var tabs = modal.querySelectorAll("[data-group-add-tab]");
    for (var ti = 0; ti < tabs.length; ti++) {
      var t = tabs[ti];
      var on = t.getAttribute("data-group-add-tab") === tab;
      t.classList.toggle("chat-create-group-modal__tab--active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    }
    if (paneAllAm) {
      var showA = tab === "all";
      paneAllAm.classList.toggle("chat-create-group-modal__pane--hidden", !showA);
      if (showA) paneAllAm.removeAttribute("hidden");
      else paneAllAm.setAttribute("hidden", "hidden");
    }
    if (paneFriendsAm) {
      var showF = tab === "friends";
      paneFriendsAm.classList.toggle("chat-create-group-modal__pane--hidden", !showF);
      if (showF) paneFriendsAm.removeAttribute("hidden");
      else paneFriendsAm.setAttribute("hidden", "hidden");
    }
    if (paneManualAm) {
      var showM = tab === "manual";
      paneManualAm.classList.toggle("chat-create-group-modal__pane--hidden", !showM);
      if (showM) paneManualAm.removeAttribute("hidden");
      else paneManualAm.setAttribute("hidden", "hidden");
    }
  }
  modal.querySelectorAll("[data-group-add-tab]").forEach(function (t) {
    t.addEventListener("click", function () {
      var v = t.getAttribute("data-group-add-tab");
      if (v) setTabAmFn(v);
    });
  });
  function attachPickerAm(container) {
    if (!container || container._gaPickDel) return;
    container._gaPickDel = true;
    container.addEventListener("click", function (e) {
      var b = e.target && e.target.closest ? e.target.closest("[data-pick-id]") : null;
      if (!b || !container.contains(b)) return;
      e.preventDefault();
      if (slotsLeftAm <= 0) return;
      var pid = b.getAttribute("data-pick-id");
      var pn = b.getAttribute("data-pick-name") || pid;
      if (!pid || inGroupAlreadyAm(pid)) return;
      if (!selectedMapAm[pid]) {
        if (Object.keys(selectedMapAm).length >= slotsLeftAm) {
          if (tg && tg.showAlert) tg.showAlert("Достигнут лимит участников в группе");
          return;
        }
        selectedMapAm[pid] = pn;
      } else delete selectedMapAm[pid];
      renderSelectedAm();
      renderPickersAm();
    });
  }
  attachPickerAm(pickerAllAm);
  attachPickerAm(pickerFriendsAm);
  if (selectedElAm && !selectedElAm._gaChipDel) {
    selectedElAm._gaChipDel = true;
    selectedElAm.addEventListener("click", function (e) {
      var b = e.target && e.target.closest ? e.target.closest("[data-remove-id]") : null;
      if (!b || !selectedElAm.contains(b)) return;
      e.preventDefault();
      var rid = b.getAttribute("data-remove-id");
      if (rid) delete selectedMapAm[rid];
      renderSelectedAm();
      renderPickersAm();
    });
  }
  function tryAddManualAm() {
    if (!manualInpAm || !manualHintAm) return;
    manualHintAm.textContent = "";
    var raw = (manualInpAm.value || "").trim().replace(/^@/, "");
    if (!raw) {
      manualHintAm.textContent = "Введите ник или ID";
      return;
    }
    if (Object.keys(selectedMapAm).length >= slotsLeftAm) {
      manualHintAm.textContent = "Достигнут лимит участников";
      return;
    }
    var idPart = raw.toUpperCase();
    var byId =
      /^\d{6}$/.test(idPart) ||
      /^ID\d{6}$/.test(idPart) ||
      (idPart.startsWith("ID") && idPart.length === 8 && /^ID\d{6}$/.test(idPart));
    var urlU;
    if (byId) {
      var idV = idPart.startsWith("ID") ? idPart : "ID" + idPart;
      urlU = base + "/api/users?id=" + encodeURIComponent(idV) + pokerApiAuthQuery("&");
    } else {
      urlU = base + "/api/users?username=" + encodeURIComponent(raw) + pokerApiAuthQuery("&");
    }
    fetch(urlU)
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        if (data && data.ok && data.userId) {
          var uid = data.userId;
          var unm = data.userName || uid;
          var myIdX = resolveMyChatMemberId();
          if (myIdX && peerChatIdsEqual(uid, myIdX)) {
            manualHintAm.textContent = "Нельзя добавить себя";
            return;
          }
          if (inGroupAlreadyAm(uid)) {
            manualHintAm.textContent = "Уже в группе";
            return;
          }
          if (typeof pokerPeerIsInMyChatPartnerList === "function" && !pokerPeerIsInMyChatPartnerList(uid)) {
            manualHintAm.textContent = "Можно добавить только того, с кем был личный диалог в чате клуба";
            return;
          }
          selectedMapAm[uid] = unm;
          manualInpAm.value = "";
          renderSelectedAm();
          renderPickersAm();
          return;
        }
        manualHintAm.textContent = (data && data.error) || "Не найдено";
      })
      .catch(function () {
        manualHintAm.textContent = POKER_NET_ERR;
      });
  }
  if (manualAddAm) manualAddAm.addEventListener("click", tryAddManualAm);
  if (manualInpAm) {
    manualInpAm.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        tryAddManualAm();
      }
    });
  }
  if (btnSubmitAm) {
    btnSubmitAm.addEventListener("click", function () {
      var ids = Object.keys(selectedMapAm);
      if (!targetGroupIdAm || ids.length === 0) {
        if (tg && tg.showAlert) tg.showAlert("Выберите хотя бы одного человека");
        else if (typeof alert === "function") alert("Выберите хотя бы одного человека");
        return;
      }
      if (targetGroupIdAm === "__general__") {
        if (typeof pokerEnsureChatTelegramVerified === "function" && !pokerEnsureChatTelegramVerified()) return;
        if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
          if (tg && tg.showAlert) tg.showAlert("Войдите в аккаунт");
          return;
        }
        var linkGen =
          typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink("club_chat") : "";
        function doneGeneralInvite() {
          btnSubmitAm.disabled = false;
          closeModalAmFn();
        }
        if (!linkGen) {
          if (tg && tg.showAlert) tg.showAlert("Не удалось сформировать ссылку");
          return;
        }
        btnSubmitAm.disabled = true;
        function afterGeneralCopy() {
          if (ids.length === 1 && typeof window.chatOpenConvFromDialogs === "function") {
            window.chatOpenConvFromDialogs(ids[0], selectedMapAm[ids[0]] || ids[0]);
            if (tg && tg.showToast) tg.showToast("Вставьте ссылку из буфера в чат");
            else if (tg && tg.showAlert) tg.showAlert("Ссылка скопирована — вставьте её в открывшийся чат.");
          } else {
            if (tg && tg.showToast) tg.showToast("Ссылка скопирована — отправьте её выбранным контактам");
            else if (tg && tg.showAlert) tg.showAlert("Ссылка скопирована в буфер обмена.");
          }
          doneGeneralInvite();
        }
        if (typeof navigator.clipboard !== "undefined" && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(linkGen)
            .then(afterGeneralCopy)
            .catch(function () {
              afterGeneralCopy();
            });
        } else {
          afterGeneralCopy();
        }
        return;
      }
      if (typeof pokerEnsureChatTelegramVerified === "function" && !pokerEnsureChatTelegramVerified()) return;
      if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
        if (tg && tg.showAlert) tg.showAlert("Войдите в аккаунт");
        return;
      }
      btnSubmitAm.disabled = true;
      fetch(base + "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          pokerApiAuthJsonBody({ action: "addGroupMembers", groupId: targetGroupIdAm, memberIds: ids })
        ),
      })
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          btnSubmitAm.disabled = false;
          if (data && data.ok) {
            var gidDone = targetGroupIdAm;
            closeModalAmFn();
            if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
            var activeChatWithUserId = getChatWithUserId();
            if (gidDone && activeChatWithUserId && typeof peerChatIdsEqual === "function") {
              if (peerChatIdsEqual(activeChatWithUserId, gidDone)) {
                loadMessages();
              }
            }
            var infoModalEl = document.getElementById("chatGroupInfoModal");
            var infoOpenAm =
              infoModalEl && !infoModalEl.classList.contains("chat-group-info-modal--hidden");
            if (infoOpenAm && typeof window.__pokerOpenChatGroupInfo === "function" && gidDone) {
              window.__pokerOpenChatGroupInfo(gidDone);
            }
            if (tg && tg.showToast) tg.showToast("Участники добавлены");
          } else if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Ошибка");
          else if (typeof alert === "function") alert((data && data.error) || "Ошибка");
        })
        .catch(function () {
          btnSubmitAm.disabled = false;
          if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
          else if (typeof alert === "function") alert(POKER_NET_ERR);
        });
    });
  }
  if (backdropAm) backdropAm.addEventListener("click", closeModalAmFn);
  if (btnCloseAm) btnCloseAm.addEventListener("click", closeModalAmFn);
  if (btnCancelAm) btnCancelAm.addEventListener("click", closeModalAmFn);
  window.__pokerOpenChatGroupAddMembers = function (groupId) {
    window.__pokerGroupPickContactsRetryOnce = true;
    var gid = groupId != null ? String(groupId).trim() : "";
    if (gid.indexOf("group_") !== 0) return;
    if (typeof pokerEnsureChatTelegramVerified === "function" && !pokerEnsureChatTelegramVerified()) return;
    if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      if (tg && tg.showAlert) tg.showAlert("Войдите в аккаунт");
      return;
    }
    if (groupAddModalTitleEl) groupAddModalTitleEl.textContent = groupAddModalDefaultTitle;
    targetGroupIdAm = gid;
    selectedMapAm = Object.create(null);
    excludeKeysAm = Object.create(null);
    slotsLeftAm = GROUP_MEMBERS_MAX_UI;
    if (manualInpAm) manualInpAm.value = "";
    if (manualHintAm) manualHintAm.textContent = "";
    if (metaHintAm) metaHintAm.textContent = "Загрузка…";
    if (btnSubmitAm) btnSubmitAm.disabled = false;
    setTabAmFn("all");
    modal.classList.remove("chat-create-group-modal--hidden");
    modal.setAttribute("aria-hidden", "false");
    function paintGroupAddAfterContacts() {
      try {
        renderPickersAm();
        renderSelectedAm();
      } catch (ePaintAm) {}
    }
    paintGroupAddAfterContacts();
    if (typeof window.__pokerReloadChatContacts === "function") {
      try {
        window.__pokerReloadChatContacts({ onLoaded: paintGroupAddAfterContacts });
      } catch (eRelAm) {}
    }
    try {
      if (typeof window.__pokerFetchFriendsForGroupPick === "function") {
        window.__pokerFetchFriendsForGroupPick(paintGroupAddAfterContacts);
      }
    } catch (eFrAm2) {}
    setTimeout(function () {
      try {
        var mAm = document.getElementById("chatGroupAddMembersModal");
        if (!mAm || mAm.classList.contains("chat-create-group-modal--hidden")) return;
        if (typeof pokerBuildGroupModalContactList !== "function") return;
        if (pokerBuildGroupModalContactList().length > 0) return;
        if (typeof window.__pokerFetchGeneralRosterForGroupPickIfEmpty !== "function") return;
        window.__pokerFetchGeneralRosterForGroupPickIfEmpty(function () {
          try {
            if (typeof window.__pokerRefreshGroupAddPickers === "function") {
              window.__pokerRefreshGroupAddPickers();
            }
          } catch (eBrAm) {}
        });
      } catch (eTam) {}
    }, 560);
    var qAm = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?";
    fetch(base + "/api/chat" + qAm + "&with=" + encodeURIComponent(gid) + "&metaonly=1", { cache: "no-store" })
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        if (!data || !data.ok || !data.group) {
          closeModalAmFn();
          if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Нет доступа");
          return;
        }
        var mems = data.group.members || [];
        excludeKeysAm = Object.create(null);
        for (var mi = 0; mi < mems.length; mi++) {
          var mid = mems[mi] && mems[mi].id;
          if (mid) excludeKeysAm[normalizePeerIdForChat(mid)] = true;
        }
        slotsLeftAm = GROUP_MEMBERS_MAX_UI - mems.length;
        if (metaHintAm) {
          metaHintAm.textContent =
            slotsLeftAm > 0
              ? "Свободно мест: " +
                slotsLeftAm +
                " (максимум " +
                GROUP_MEMBERS_MAX_UI +
                " в группе)"
              : "В группе максимум участников";
        }
        if (btnSubmitAm) btnSubmitAm.disabled = slotsLeftAm <= 0;
        renderPickersAm();
        renderSelectedAm();
      })
      .catch(function () {
        closeModalAmFn();
        if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
      });
  };
  window.__pokerOpenGeneralChatInviteMembers = function () {
    window.__pokerGroupPickContactsRetryOnce = true;
    if (typeof pokerEnsureChatTelegramVerified === "function" && !pokerEnsureChatTelegramVerified()) return;
    if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      if (tg && tg.showAlert) tg.showAlert("Войдите в аккаунт");
      return;
    }
    if (groupAddModalTitleEl) groupAddModalTitleEl.textContent = "Пригласить в общий чат";
    targetGroupIdAm = "__general__";
    selectedMapAm = Object.create(null);
    excludeKeysAm = Object.create(null);
    var gm =
      window._chatGeneralCache && Array.isArray(window._chatGeneralCache.generalMembers)
        ? window._chatGeneralCache.generalMembers
        : [];
    for (var gi = 0; gi < gm.length; gi++) {
      var gmid = gm[gi] && gm[gi].id;
      if (!gmid) continue;
      var nk = typeof normalizePeerIdForChat === "function" ? normalizePeerIdForChat(gmid) : gmid;
      excludeKeysAm[nk] = true;
      try {
        if (nk && nk !== gmid) excludeKeysAm[gmid] = true;
      } catch (eGk) {}
    }
    slotsLeftAm = GROUP_MEMBERS_MAX_UI;
    if (manualInpAm) manualInpAm.value = "";
    if (manualHintAm) manualHintAm.textContent = "";
    if (metaHintAm) {
      metaHintAm.textContent =
        "Кого ещё нет в общем чате. По готово ссылка скопируется; при одном контакте откроется личный чат.";
    }
    if (btnSubmitAm) btnSubmitAm.disabled = false;
    setTabAmFn("all");
    modal.classList.remove("chat-create-group-modal--hidden");
    modal.setAttribute("aria-hidden", "false");
    function paintGenInv() {
      try {
        renderPickersAm();
        renderSelectedAm();
      } catch (ePgi) {}
    }
    paintGenInv();
    if (typeof window.__pokerReloadChatContacts === "function") {
      try {
        window.__pokerReloadChatContacts({ onLoaded: paintGenInv });
      } catch (eRlGi) {}
    }
    try {
      if (typeof window.__pokerFetchFriendsForGroupPick === "function") {
        window.__pokerFetchFriendsForGroupPick(paintGenInv);
      }
    } catch (eFrGi) {}
  };
}
