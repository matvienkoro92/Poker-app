// Group info and members modal wiring.

function initChatGroupInfoModal(opts) {
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
  var resizeImage = typeof opts.resizeImage === "function" ? opts.resizeImage : null;
  var syncClubChatRosterUi = typeof opts.syncClubChatRosterUi === "function" ? opts.syncClubChatRosterUi : function () {};
  var updateCurrentGroupMeta = typeof opts.updateCurrentGroupMeta === "function" ? opts.updateCurrentGroupMeta : function () {};
  var updateCurrentGroupAvatar = typeof opts.updateCurrentGroupAvatar === "function" ? opts.updateCurrentGroupAvatar : function () {};
  var handleGroupRemoved = typeof opts.handleGroupRemoved === "function" ? opts.handleGroupRemoved : function () {};
  var modal = document.getElementById("chatGroupInfoModal");
  if (!modal) {
    window.__pokerOpenChatGroupInfo = function () {};
    window.__pokerOpenChatGeneralMembersModal = function () {};
    return;
  }
  var openGroupInfoMode = "group";
  var backdrop = document.getElementById("chatGroupInfoModalBackdrop");
  var btnClose = document.getElementById("chatGroupInfoModalClose");
  var titleEl = document.getElementById("chatGroupInfoModalTitle");
  var metaEl = document.getElementById("chatGroupInfoMeta");
  var avImg = document.getElementById("chatGroupInfoAvatar");
  var avatarBtn = document.getElementById("chatGroupInfoAvatarBtn");
  var avatarFile = document.getElementById("chatGroupInfoAvatarFile");
  var avatarEditHint = document.getElementById("chatGroupInfoAvatarEditHint");
  var creatorBadge = document.getElementById("chatGroupInfoCreatorBadge");
  var titleLabel = document.getElementById("chatGroupInfoTitleLabel");
  var titleInput = document.getElementById("chatGroupInfoTitleInput");
  var descTa = document.getElementById("chatGroupInfoDescription");
  var descEditWrap = document.getElementById("chatGroupInfoDescEditWrap");
  var descViewWrap = document.getElementById("chatGroupInfoDescViewWrap");
  var descViewEl = document.getElementById("chatGroupInfoDescView");
  var saveBtn = document.getElementById("chatGroupInfoSaveProfileBtn");
  var saveFeedbackEl = document.getElementById("chatGroupInfoSaveFeedback");
  var saveProfileBtnDefaultText = "Сохранить изменения";
  var saveFeedbackClearTimer = null;
  var membersEl = document.getElementById("chatGroupInfoMembers");
  var addMembersBtnInfo = document.getElementById("chatGroupInfoAddMembersBtn");
  var openGroupId = "";
  var lastGroupInfoTitle = "";
  /** Создатель или админ: можно POST updateGroupAvatar (название/описание — по-прежнему только админ). */
  var groupInfoModalCanChangeAvatar = false;
  var dangerZone = document.getElementById("chatGroupInfoDanger");
  var deleteOpenBtn = document.getElementById("chatGroupInfoDeleteOpenBtn");
  var deletePanel = document.getElementById("chatGroupInfoDeletePanel");
  var deleteInput = document.getElementById("chatGroupInfoDeleteInput");
  var deleteFinalBtn = document.getElementById("chatGroupInfoDeleteFinalBtn");
  var deleteCancelBtn = document.getElementById("chatGroupInfoDeleteCancelBtn");
  var leaveWrap = document.getElementById("chatGroupInfoLeaveWrap");
  var leaveBtn = document.getElementById("chatGroupInfoLeaveBtn");
  function resetGroupDeleteUi() {
    if (deletePanel) deletePanel.hidden = true;
    if (deleteOpenBtn) deleteOpenBtn.hidden = false;
    if (deleteInput) deleteInput.value = "";
    if (deleteFinalBtn) deleteFinalBtn.disabled = true;
  }
  function closeModal() {
    openGroupInfoMode = "group";
    try {
      modal.classList.remove("chat-group-info-modal--can-manage");
      modal.classList.remove("chat-group-info-modal--can-change-avatar");
    } catch (eCm) {}
    groupInfoModalCanChangeAvatar = false;
    if (saveFeedbackClearTimer) {
      try {
        clearTimeout(saveFeedbackClearTimer);
      } catch (eClrFb) {}
      saveFeedbackClearTimer = null;
    }
    if (saveFeedbackEl) saveFeedbackEl.textContent = "";
    if (saveBtn) {
      try {
        saveBtn.textContent = saveProfileBtnDefaultText;
        saveBtn.removeAttribute("aria-busy");
        saveBtn.disabled = false;
      } catch (eSbRst) {}
    }
    modal.classList.add("chat-group-info-modal--hidden");
    modal.setAttribute("aria-hidden", "true");
  }
  function applySavedGroupMetaToModal(tOut, dOut) {
    var tStr = tOut != null ? String(tOut).trim() : "";
    var dRaw = dOut != null ? String(dOut) : "";
    if (tStr) lastGroupInfoTitle = tStr;
    if (titleInput && tStr) titleInput.value = tStr;
    if (descTa) descTa.value = dRaw;
    if (titleEl && !titleEl.hidden) titleEl.textContent = tStr || titleEl.textContent || "Группа";
    if (descViewEl) {
      var dvTrim = dRaw.trim();
      descViewEl.textContent = dvTrim || "Без описания";
      descViewEl.classList.toggle("chat-group-info-modal__desc-view-text--empty", !dvTrim);
    }
  }
  function showGroupInfoSaveOkFeedback() {
    var tw = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (tw && tw.HapticFeedback && typeof tw.HapticFeedback.notificationOccurred === "function") {
      try {
        tw.HapticFeedback.notificationOccurred("success");
      } catch (eH) {}
    }
    var toasted = false;
    if (tw && tw.showToast) {
      try {
        tw.showToast("Сохранено");
        toasted = true;
      } catch (eTst) {}
    }
    if (!toasted && saveFeedbackEl) {
      saveFeedbackEl.textContent = "Сохранено";
      if (saveFeedbackClearTimer) {
        try {
          clearTimeout(saveFeedbackClearTimer);
        } catch (eT0) {}
      }
      saveFeedbackClearTimer = setTimeout(function () {
        saveFeedbackClearTimer = null;
        if (saveFeedbackEl) saveFeedbackEl.textContent = "";
      }, 3200);
    }
  }
  function setGroupAvatar(url, title) {
    if (!avImg) return;
    var u = url && String(url).trim() ? String(url).trim() : "";
    avImg.onload = null;
    avImg.onerror = null;
    if (!u) {
      avImg.classList.add("chat-group-info-modal__avatar--hidden");
      try {
        avImg.removeAttribute("src");
      } catch (eRm) {}
      return;
    }
    avImg.alt = title || "";
    avImg.onload = function () {
      avImg.classList.remove("chat-group-info-modal__avatar--hidden");
    };
    avImg.onerror = function () {
      avImg.classList.add("chat-group-info-modal__avatar--hidden");
    };
    avImg.src = u;
    if (avImg.complete) avImg.classList.remove("chat-group-info-modal__avatar--hidden");
  }
  function ruParticipantsCount(n) {
    var k = Math.floor(Number(n)) || 0;
    var m10 = k % 10;
    var m100 = k % 100;
    if (m100 >= 11 && m100 <= 14) return String(k) + " участников";
    if (m10 === 1) return String(k) + " участник";
    if (m10 >= 2 && m10 <= 4) return String(k) + " участника";
    return String(k) + " участников";
  }
  function mapGeneralMembersForModal(arr) {
    return (arr || [])
      .map(function (m) {
        if (!m || !m.id) return null;
        return {
          id: m.id,
          name: m.name || m.id,
          avatar: m.avatar || null,
          online: !!m.online,
          isYou: !!m.isYou,
          admin: !!m.admin,
          isGroupCreator: false,
          contactName: m.contactName,
          telegramUsername: m.telegramUsername,
          telegramDisplayName: m.telegramDisplayName,
          lastSeenAt: m.lastSeenAt || null,
        };
      })
      .filter(Boolean);
  }
  function renderGeneralMembersModalFromList(raw) {
    var mm = mapGeneralMembersForModal(raw);
    renderGroup({
      title: "Главный чат",
      description: "Секретный чат участников клуба 2 туза",
      members: mm,
      iAmCreator: false,
      iCanManageGroupMeta: false,
      memberCount: mm.length,
      avatar: null,
      createdAt: null,
    });
  }
  function renderGroup(g) {
    if (!g) return;
    var t = g.title || "Группа";
    lastGroupInfoTitle = t;
    var creator = !!(g.iAmCreator);
    var canManageMeta = !!(g.iCanManageGroupMeta);
    var canChangeGroupAvatar = !!(
      g.iCanChangeGroupAvatar != null ? g.iCanChangeGroupAvatar : canManageMeta || creator
    );
    groupInfoModalCanChangeAvatar = canChangeGroupAvatar;
    if (creatorBadge) creatorBadge.hidden = !creator;
    if (canManageMeta) {
      if (titleEl) titleEl.hidden = true;
      if (titleLabel) titleLabel.hidden = false;
      if (titleInput) titleInput.value = t;
    } else {
      if (titleEl) {
        titleEl.hidden = false;
        titleEl.textContent = t;
      }
      if (titleLabel) titleLabel.hidden = true;
      if (titleInput) titleInput.value = "";
    }
    var gDesc = g.description != null ? String(g.description) : "";
    if (canManageMeta) {
      if (descEditWrap) descEditWrap.hidden = false;
      if (descViewWrap) descViewWrap.hidden = true;
      if (descTa) {
        descTa.value = gDesc;
        descTa.readOnly = false;
      }
    } else {
      if (descEditWrap) descEditWrap.hidden = true;
      if (descViewWrap) descViewWrap.hidden = false;
      if (descTa) descTa.value = "";
      if (descViewEl) {
        var dvTrim = gDesc.trim();
        descViewEl.textContent = dvTrim || "Без описания";
        descViewEl.classList.toggle("chat-group-info-modal__desc-view-text--empty", !dvTrim);
      }
    }
    if (saveBtn) saveBtn.hidden = !canManageMeta;
    var mems = (g.members || []).slice().sort(function (a, b) {
      var ao = a && a.online ? 1 : 0;
      var bo = b && b.online ? 1 : 0;
      if (bo !== ao) return bo - ao;
      return String((a && a.name) || "").localeCompare(String((b && b.name) || ""), "ru");
    });
    var onl = 0;
    for (var oi = 0; oi < mems.length; oi++) if (mems[oi] && mems[oi].online) onl++;
    var metaParts = [ruParticipantsCount(mems.length || g.memberCount || 0)];
    metaParts.push(onl + " онлайн");
    if (g.createdAt) {
      try {
        var d = new Date(g.createdAt);
        if (!isNaN(d.getTime())) {
          metaParts.push(
            "создана " + d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })
          );
        }
      } catch (eD) {}
    }
    if (metaEl) metaEl.textContent = metaParts.join(" · ");
    setGroupAvatar(g.avatar || "", t);
    if (membersEl) {
      if (!mems.length) {
        membersEl.innerHTML = '<p class="chat-empty">Нет данных</p>';
      } else {
        membersEl.innerHTML = mems
          .map(function (m) {
            if (!m || !m.id) return "";
            var contactNm = m.contactName && String(m.contactName).trim();
            var tgDisp = m.telegramDisplayName && String(m.telegramDisplayName).trim();
            var tgUser = m.telegramUsername && String(m.telegramUsername).trim();
            var nameLine = contactNm || tgDisp || "";
            var tgLine = tgUser ? "@" + tgUser : "";
            var nmRaw =
              [nameLine, tgLine].filter(Boolean).join(" ") || (m.name && String(m.name)) || m.id;
            var avPh = (nameLine || tgUser || nmRaw).charAt(0) || "?";
            var badges = [];
            if (m.isYou) badges.push("Вы");
            if (m.isGroupCreator) badges.push("Создатель");
            if (m.admin) badges.push("Админ");
            var nameBlock = "";
            if (nameLine) {
              nameBlock += '<span class="chat-group-info-modal__member-name">' + escapeHtml(nameLine) + "</span>";
            }
            if (tgLine) {
              nameBlock +=
                '<span class="chat-group-info-modal__member-tg">' + escapeHtml(tgLine) + "</span>";
            }
            if (!nameBlock) {
              nameBlock =
                '<span class="chat-group-info-modal__member-name">' +
                escapeHtml((m.name && String(m.name)) || m.id) +
                "</span>";
            }
            var lastSeenLine = "";
            if (!m.online && m.lastSeenAt) {
              var lsFn =
                typeof window.pokerFormatChatLastSeenRu === "function"
                  ? window.pokerFormatChatLastSeenRu(m.lastSeenAt)
                  : "";
              if (lsFn) {
                lastSeenLine =
                  '<span class="chat-group-info-modal__member-last-seen">' +
                  escapeHtml(lsFn) +
                  "</span>";
              }
            }
            var av =
              m.avatar
                ? '<img class="chat-group-info-modal__member-av" src="' +
                  escapeHtml(m.avatar) +
                  '" alt="" width="40" height="40" decoding="async" />'
                : '<span class="chat-group-info-modal__member-av-ph">' + escapeHtml(avPh) + "</span>";
            var showKickGeneral =
              openGroupInfoMode === "general" &&
              typeof chatIsAdmin !== "undefined" &&
              chatIsAdmin &&
              !m.admin &&
              !m.isYou;
            var showKick = (creator && !m.isYou) || showKickGeneral;
            var kickLabel = openGroupInfoMode === "general" ? "Убрать" : "Исключить";
            var kickAria =
              openGroupInfoMode === "general" ? "Убрать из главного чата" : "Исключить из группы";
            var memberBtn =
              '<button type="button" class="chat-group-info-modal__member" data-gi-user-id="' +
              escapeHtml(m.id) +
              '" data-gi-user-name="' +
              escapeHtml(nmRaw) +
              '">' +
              av +
              '<span class="chat-group-info-modal__member-main">' +
              nameBlock +
              (badges.length
                ? '<span class="chat-group-info-modal__member-badges">' + escapeHtml(badges.join(" · ")) + "</span>"
                : "") +
              (lastSeenLine ? lastSeenLine : "") +
              '</span><span class="chat-group-info-modal__member-online' +
              (m.online ? " chat-group-info-modal__member-online--on" : "") +
              '" aria-hidden="true"></span></button>';
            var kickBtn = showKick
              ? '<button type="button" class="chat-group-info-modal__member-kick" data-gi-kick="1" data-gi-user-id="' +
                escapeHtml(m.id) +
                '" data-gi-user-name="' +
                escapeHtml(nmRaw) +
                '" aria-label="' +
                escapeHtml(kickAria) +
                '">' +
                escapeHtml(kickLabel) +
                "</button>"
              : "";
            return (
              '<div class="chat-group-info-modal__member-row">' + memberBtn + kickBtn + "</div>"
            );
          })
          .join("");
      }
    }
    if (avatarBtn) {
      avatarBtn.disabled = !canChangeGroupAvatar;
      avatarBtn.setAttribute(
        "aria-label",
        canChangeGroupAvatar ? "Сменить аватар группы" : "Аватар группы"
      );
    }
    if (avatarEditHint) {
      avatarEditHint.hidden = !canChangeGroupAvatar;
      if (canChangeGroupAvatar) {
        avatarEditHint.textContent = canManageMeta
          ? "Администратор клуба: нажмите на фото, чтобы загрузить новый аватар"
          : "Создатель: нажмите на фото, чтобы сменить аватар группы";
      }
    }
    if (dangerZone) dangerZone.hidden = !canManageMeta;
    resetGroupDeleteUi();
    if (openGroupInfoMode === "general") {
      if (leaveWrap) leaveWrap.hidden = true;
      if (addMembersBtnInfo) addMembersBtnInfo.hidden = false;
      if (creatorBadge) creatorBadge.hidden = true;
      if (dangerZone) dangerZone.hidden = true;
      resetGroupDeleteUi();
      if (titleLabel) titleLabel.hidden = true;
      if (titleEl) {
        titleEl.hidden = false;
        titleEl.textContent = "Главный чат";
      }
      if (titleInput) titleInput.value = "";
      if (descEditWrap) descEditWrap.hidden = true;
      if (descViewWrap) descViewWrap.hidden = false;
      if (descTa) {
        descTa.value = "";
        descTa.readOnly = true;
      }
      if (descViewEl) {
        descViewEl.textContent =
          "Секретный чат участников клуба 2 туза";
        descViewEl.classList.remove("chat-group-info-modal__desc-view-text--empty");
      }
      if (saveBtn) saveBtn.hidden = true;
      groupInfoModalCanChangeAvatar = false;
      if (avatarBtn) {
        avatarBtn.disabled = true;
        avatarBtn.setAttribute("aria-label", "Главный чат");
      }
      if (avatarEditHint) avatarEditHint.hidden = true;
      setGroupAvatar("", "Главный чат");
      lastGroupInfoTitle = "Главный чат";
      if (metaEl) {
        var metaGen = [ruParticipantsCount(mems.length || g.memberCount || 0)];
        metaGen.push(onl + " онлайн");
        metaEl.textContent = metaGen.join(" · ");
      }
    } else {
      if (leaveWrap) leaveWrap.hidden = false;
      if (addMembersBtnInfo) addMembersBtnInfo.hidden = false;
    }
    try {
      modal.classList.toggle(
        "chat-group-info-modal--can-manage",
        openGroupInfoMode === "group" && !!canManageMeta
      );
      modal.classList.toggle(
        "chat-group-info-modal--can-change-avatar",
        openGroupInfoMode === "group" && !!canChangeGroupAvatar
      );
    } catch (eCm2) {}
  }
  window.__pokerOpenChatGroupInfo = function (groupId) {
    var gid = groupId != null ? String(groupId).trim() : "";
    if (!gid || gid.indexOf("group_") !== 0) return;
    openGroupInfoMode = "group";
    openGroupId = gid;
    lastGroupInfoTitle = "";
    try {
      modal.classList.remove("chat-group-info-modal--can-manage");
      modal.classList.remove("chat-group-info-modal--can-change-avatar");
    } catch (eCmO) {}
    groupInfoModalCanChangeAvatar = false;
    resetGroupDeleteUi();
    if (dangerZone) dangerZone.hidden = true;
    if (leaveWrap) leaveWrap.hidden = true;
    if (addMembersBtnInfo) addMembersBtnInfo.hidden = false;
    if (creatorBadge) creatorBadge.hidden = true;
    if (titleEl) {
      titleEl.hidden = false;
      titleEl.textContent = "Группа";
    }
    if (titleLabel) titleLabel.hidden = true;
    if (titleInput) titleInput.value = "";
    if (descEditWrap) descEditWrap.hidden = true;
    if (descViewWrap) descViewWrap.hidden = true;
    if (descTa) {
      descTa.value = "";
      descTa.readOnly = true;
    }
    if (descViewEl) {
      descViewEl.textContent = "";
      descViewEl.classList.remove("chat-group-info-modal__desc-view-text--empty");
    }
    if (saveBtn) saveBtn.hidden = true;
    if (metaEl) metaEl.textContent = "";
    setGroupAvatar("", "");
    if (avatarBtn) {
      avatarBtn.disabled = true;
      avatarBtn.setAttribute("aria-label", "Аватар группы");
    }
    if (avatarEditHint) avatarEditHint.hidden = true;
    if (membersEl) membersEl.innerHTML = '<p class="chat-empty">Загрузка...</p>';
    modal.classList.remove("chat-group-info-modal--hidden");
    modal.setAttribute("aria-hidden", "false");
    var q = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?";
    var urlMeta = base + "/api/chat" + q + "&with=" + encodeURIComponent(gid) + "&metaonly=1";
    var metaFetchGid = gid;
    fetch(urlMeta, { cache: "no-store" })
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        if (openGroupInfoMode !== "group" || openGroupId !== metaFetchGid) return;
        if (data && data.ok && data.group) {
          renderGroup(data.group);
          return;
        }
        if (data && data.ok && data.isGroupChat && !data.group) {
          if (membersEl) {
            membersEl.innerHTML =
              '<p class="chat-empty">Сервер не вернул состав группы. Обновите страницу или откройте чат позже.</p>';
          }
          return;
        }
        if (membersEl) {
          membersEl.innerHTML =
            '<p class="chat-empty">' + escapeHtml((data && data.error) || "Ошибка загрузки") + "</p>";
        }
      })
      .catch(function () {
        if (openGroupInfoMode !== "group" || openGroupId !== metaFetchGid) return;
        if (membersEl) membersEl.innerHTML = '<p class="chat-empty">' + escapeHtml(POKER_NET_ERR) + "</p>";
      });
  };
  window.__pokerOpenChatGeneralMembersModal = function () {
    var tgLoc = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (typeof clubChatAccess !== "undefined" && clubChatAccess === "need_apply") {
      var m1 = "Сначала получите доступ к главному чату.";
      if (tgLoc && tgLoc.showAlert) tgLoc.showAlert(m1);
      else if (typeof alert === "function") alert(m1);
      return;
    }
    if (typeof clubChatAccess !== "undefined" && clubChatAccess === "pending") {
      var m2 = "Состав будет доступен после одобрения заявки.";
      if (tgLoc && tgLoc.showAlert) tgLoc.showAlert(m2);
      else if (typeof alert === "function") alert(m2);
      return;
    }
    if (typeof clubChatAccess !== "undefined" && clubChatAccess === "revoked") {
      var mRev = "Доступ к главному чату отозван администратором.";
      if (tgLoc && tgLoc.showAlert) tgLoc.showAlert(mRev);
      else if (typeof alert === "function") alert(mRev);
      return;
    }
    openGroupInfoMode = "general";
    openGroupId = "";
    lastGroupInfoTitle = "Главный чат";
    try {
      modal.classList.remove("chat-group-info-modal--can-manage");
    } catch (eCmG) {}
    resetGroupDeleteUi();
    if (dangerZone) dangerZone.hidden = true;
    if (leaveWrap) leaveWrap.hidden = true;
    if (addMembersBtnInfo) addMembersBtnInfo.hidden = false;
    if (creatorBadge) creatorBadge.hidden = true;
    if (titleEl) {
      titleEl.hidden = false;
      titleEl.textContent = "Главный чат";
    }
    if (titleLabel) titleLabel.hidden = true;
    if (titleInput) titleInput.value = "";
    if (descEditWrap) descEditWrap.hidden = true;
    if (descViewWrap) descViewWrap.hidden = false;
    if (descTa) {
      descTa.value = "";
      descTa.readOnly = true;
    }
    if (descViewEl) {
      descViewEl.textContent =
        "Секретный чат участников клуба 2 туза";
      descViewEl.classList.remove("chat-group-info-modal__desc-view-text--empty");
    }
    if (saveBtn) saveBtn.hidden = true;
    if (metaEl) metaEl.textContent = "";
    setGroupAvatar("", "Главный чат");
    if (avatarBtn) {
      avatarBtn.disabled = true;
      avatarBtn.setAttribute("aria-label", "Главный чат");
    }
    if (avatarEditHint) avatarEditHint.hidden = true;
    modal.classList.remove("chat-group-info-modal--hidden");
    modal.setAttribute("aria-hidden", "false");
    var cachedGm =
      window._chatGeneralCache && Array.isArray(window._chatGeneralCache.generalMembers)
        ? window._chatGeneralCache.generalMembers
        : null;
    if (cachedGm && cachedGm.length) {
      renderGeneralMembersModalFromList(cachedGm);
      return;
    }
    if (membersEl) membersEl.innerHTML = '<p class="chat-empty">Загрузка...</p>';
    var qG = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?";
    fetch(base + "/api/chat" + qG + "&mode=general&trackSeen=0&includeRoster=1", { cache: "no-store" })
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        if (openGroupInfoMode !== "general") return;
        if (data && data.ok) {
          var gm = Array.isArray(data.generalMembers) ? data.generalMembers : [];
          if (window._chatGeneralCache && typeof window._chatGeneralCache === "object") {
            window._chatGeneralCache.generalMembers = gm;
            if (data.participantsCount != null) window._chatGeneralCache.participantsCount = data.participantsCount;
            if (data.onlineCount != null) window._chatGeneralCache.onlineCount = data.onlineCount;
          }
          renderGeneralMembersModalFromList(gm);
          try {
            if (typeof syncClubChatRosterUi === "function") syncClubChatRosterUi();
          } catch (eSynM) {}
          return;
        }
        if (membersEl) {
          membersEl.innerHTML =
            '<p class="chat-empty">' + escapeHtml((data && data.error) || "Не удалось загрузить список") + "</p>";
        }
      })
      .catch(function () {
        if (openGroupInfoMode !== "general") return;
        if (membersEl) membersEl.innerHTML = '<p class="chat-empty">' + escapeHtml(POKER_NET_ERR) + "</p>";
      });
  };
  if (saveBtn) {
    saveBtn.addEventListener("click", function (e) {
      e.preventDefault();
      var gidSv = openGroupId;
      if (!gidSv || !titleInput || !descTa) return;
      if (typeof chatIsAdmin !== "undefined" && !chatIsAdmin) {
        if (typeof tg !== "undefined" && tg && tg.showAlert) {
          tg.showAlert("Только администратор клуба может менять название и описание группы");
        } else if (typeof alert === "function") {
          alert("Только администратор клуба может менять название и описание группы");
        }
        return;
      }
      if (typeof pokerEnsureChatTelegramVerified === "function" && !pokerEnsureChatTelegramVerified()) return;
      if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
        if (typeof tg !== "undefined" && tg && tg.showAlert) tg.showAlert("Войдите в аккаунт");
        else if (typeof alert === "function") alert("Войдите в аккаунт");
        return;
      }
      var titleSv = String(titleInput.value || "").trim();
      if (!titleSv) {
        if (typeof tg !== "undefined" && tg && tg.showAlert) tg.showAlert("Название не может быть пустым");
        else if (typeof alert === "function") alert("Название не может быть пустым");
        return;
      }
      var descSv = String(descTa.value || "");
      applySavedGroupMetaToModal(titleSv, descSv);
      saveBtn.disabled = true;
      try {
        saveBtn.setAttribute("aria-busy", "true");
      } catch (eAb) {}
      saveBtn.textContent = "Сохранение…";
      if (saveFeedbackEl) saveFeedbackEl.textContent = "";
      fetch(base + "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          pokerApiAuthJsonBody({
            action: "updateGroupInfo",
            groupId: gidSv,
            title: titleSv,
            description: descSv,
          })
        ),
      })
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          saveBtn.disabled = false;
          try {
            saveBtn.removeAttribute("aria-busy");
          } catch (eAb2) {}
          saveBtn.textContent = saveProfileBtnDefaultText;
          if (data && data.ok) {
            var tOut = data.title != null ? String(data.title).trim() : titleSv;
            var dOut = data.description != null ? String(data.description) : descSv;
            applySavedGroupMetaToModal(tOut, dOut);
            showGroupInfoSaveOkFeedback();
            updateCurrentGroupMeta(gidSv, tOut);
            if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
          } else if (typeof tg !== "undefined" && tg && tg.showAlert) tg.showAlert((data && data.error) || "Ошибка");
          else if (typeof alert === "function") alert((data && data.error) || "Ошибка");
        })
        .catch(function () {
          saveBtn.disabled = false;
          try {
            saveBtn.removeAttribute("aria-busy");
          } catch (eAb3) {}
          saveBtn.textContent = saveProfileBtnDefaultText;
          if (typeof tg !== "undefined" && tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
          else if (typeof alert === "function") alert(POKER_NET_ERR);
        });
    });
  }
  if (avatarBtn && avatarFile) {
    avatarBtn.addEventListener("click", function (e) {
      if (avatarBtn.disabled) return;
      e.preventDefault();
      avatarFile.click();
    });
  }
  if (avatarFile) {
    avatarFile.addEventListener("change", function () {
      var f = avatarFile.files && avatarFile.files[0];
      var gidUp = openGroupId;
      if (!f || !gidUp) return;
      var canDoAvatarFile =
        (typeof chatIsAdmin !== "undefined" && chatIsAdmin) || groupInfoModalCanChangeAvatar;
      if (!canDoAvatarFile) {
        avatarFile.value = "";
        if (typeof tg !== "undefined" && tg && tg.showAlert) {
          tg.showAlert("Менять аватар может только создатель группы или администратор клуба");
        } else if (typeof alert === "function") {
          alert("Менять аватар может только создатель группы или администратор клуба");
        }
        return;
      }
      if (typeof pokerEnsureChatTelegramVerified === "function" && !pokerEnsureChatTelegramVerified()) return;
      if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
        if (typeof tg !== "undefined" && tg && tg.showAlert) tg.showAlert("Войдите, чтобы сменить аватар");
        else if (typeof alert === "function") alert("Войдите, чтобы сменить аватар");
        return;
      }
      resizeImage(f, 256, 256, 0.88)
        .then(function (dataUrl) {
          avatarFile.value = "";
          return fetch(base + "/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
              pokerApiAuthJsonBody({ action: "updateGroupAvatar", groupId: gidUp, avatar: dataUrl })
            ),
          }).then(function (r) {
            return r.json();
          });
        })
        .then(function (data) {
          if (data && data.ok && data.groupAvatar) {
            var tt = lastGroupInfoTitle || (titleEl && !titleEl.hidden ? titleEl.textContent : "") || "";
            if (!tt && titleInput) tt = String(titleInput.value || "").trim();
            setGroupAvatar(data.groupAvatar, tt || "Группа");
            updateCurrentGroupAvatar(gidUp, data.groupAvatar, tt);
            if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
          } else if (typeof tg !== "undefined" && tg && tg.showAlert) tg.showAlert((data && data.error) || "Ошибка");
          else if (typeof alert === "function") alert((data && data.error) || "Ошибка");
        })
        .catch(function () {
          avatarFile.value = "";
          if (typeof tg !== "undefined" && tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
          else if (typeof alert === "function") alert(POKER_NET_ERR);
        });
    });
  }
  function syncDeleteFinalEnabled() {
    if (!deleteFinalBtn || !deleteInput) return;
    deleteFinalBtn.disabled = deleteInput.value.trim().toLowerCase() !== "удалить";
  }
  if (deleteOpenBtn && deletePanel) {
    deleteOpenBtn.addEventListener("click", function (e) {
      e.preventDefault();
      deletePanel.hidden = false;
      deleteOpenBtn.hidden = true;
      syncDeleteFinalEnabled();
      try {
        if (deleteInput) deleteInput.focus();
      } catch (eF) {}
    });
  }
  if (deleteCancelBtn) {
    deleteCancelBtn.addEventListener("click", function (e) {
      e.preventDefault();
      resetGroupDeleteUi();
    });
  }
  if (deleteInput) {
    deleteInput.addEventListener("input", syncDeleteFinalEnabled);
    deleteInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && deleteFinalBtn && !deleteFinalBtn.disabled) {
        e.preventDefault();
        deleteFinalBtn.click();
      }
    });
  }
  function runLeaveGroupAfterConfirm() {
    var gidLv = openGroupId;
    if (!gidLv || !leaveBtn) return;
    if (typeof pokerEnsureChatTelegramVerified === "function" && !pokerEnsureChatTelegramVerified()) return;
    if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      if (typeof tg !== "undefined" && tg && tg.showAlert) tg.showAlert("Войдите в аккаунт");
      else if (typeof alert === "function") alert("Войдите в аккаунт");
      return;
    }
    leaveBtn.disabled = true;
    fetch(base + "/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerApiAuthJsonBody({ action: "leaveGroup", groupId: gidLv })),
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        leaveBtn.disabled = false;
        if (data && data.ok && data.left) {
          closeModal();
          handleGroupRemoved(gidLv, "group-leave-current");
          if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
          if (typeof tg !== "undefined" && tg && tg.showToast) tg.showToast("Вы вышли из группы");
        } else {
          if (typeof tg !== "undefined" && tg && tg.showAlert) tg.showAlert((data && data.error) || "Ошибка");
          else if (typeof alert === "function") alert((data && data.error) || "Ошибка");
        }
      })
      .catch(function () {
        leaveBtn.disabled = false;
        if (typeof tg !== "undefined" && tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        else if (typeof alert === "function") alert(POKER_NET_ERR);
      });
  }
  if (leaveBtn) {
    leaveBtn.addEventListener("click", function (e) {
      e.preventDefault();
      var msgLv =
        "Покинуть группу? Вы перестанете быть участником, диалог исчезнет из вашего списка. Если вы единственный участник, группа будет удалена.";
      if (typeof tg !== "undefined" && tg && typeof tg.showConfirm === "function") {
        tg.showConfirm(msgLv, function (ok) {
          if (ok) runLeaveGroupAfterConfirm();
        });
      } else if (typeof confirm === "function" && confirm(msgLv)) {
        runLeaveGroupAfterConfirm();
      }
    });
  }
  if (deleteFinalBtn) {
    deleteFinalBtn.addEventListener("click", function (e) {
      e.preventDefault();
      var gidDel = openGroupId;
      if (!gidDel || !deleteInput || deleteInput.value.trim().toLowerCase() !== "удалить") return;
      if (typeof chatIsAdmin !== "undefined" && !chatIsAdmin) {
        if (typeof tg !== "undefined" && tg && tg.showAlert) {
          tg.showAlert("Только администратор клуба может удалить группу");
        } else if (typeof alert === "function") {
          alert("Только администратор клуба может удалить группу");
        }
        return;
      }
      if (typeof pokerEnsureChatTelegramVerified === "function" && !pokerEnsureChatTelegramVerified()) return;
      if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
        if (typeof tg !== "undefined" && tg && tg.showAlert) tg.showAlert("Войдите в аккаунт");
        return;
      }
      deleteFinalBtn.disabled = true;
      fetch(base + "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          pokerApiAuthJsonBody({
            action: "deleteGroup",
            groupId: gidDel,
            confirm: deleteInput.value.trim(),
          })
        ),
      })
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          deleteFinalBtn.disabled = false;
          if (data && data.ok && data.deleted) {
            closeModal();
            resetGroupDeleteUi();
            handleGroupRemoved(gidDel, "group-delete-current");
            if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
          } else {
            syncDeleteFinalEnabled();
            if (typeof tg !== "undefined" && tg && tg.showAlert) tg.showAlert((data && data.error) || "Ошибка");
            else if (typeof alert === "function") alert((data && data.error) || "Ошибка");
          }
        })
        .catch(function () {
          deleteFinalBtn.disabled = false;
          syncDeleteFinalEnabled();
          if (typeof tg !== "undefined" && tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
          else if (typeof alert === "function") alert(POKER_NET_ERR);
        });
    });
  }
  if (backdrop) backdrop.addEventListener("click", closeModal);
  if (btnClose) btnClose.addEventListener("click", closeModal);
  if (addMembersBtnInfo) {
    addMembersBtnInfo.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (openGroupInfoMode === "general") {
        if (typeof window.__pokerOpenGeneralChatInviteMembers === "function") {
          window.__pokerOpenGeneralChatInviteMembers();
        }
        return;
      }
      var gida = openGroupId;
      if (!gida) return;
      if (typeof window.__pokerOpenChatGroupAddMembers === "function") {
        window.__pokerOpenChatGroupAddMembers(gida);
      }
    });
  }
  function refetchGroupInfoMeta() {
    var gid = openGroupId;
    if (!gid || openGroupInfoMode !== "group") return;
    var qMeta = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?";
    fetch(base + "/api/chat" + qMeta + "&with=" + encodeURIComponent(gid) + "&metaonly=1", { cache: "no-store" })
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        if (data && data.ok && data.group) renderGroup(data.group);
      })
      .catch(function () {});
  }
  if (membersEl) {
    membersEl.addEventListener("click", function (e) {
      var kickB =
        e.target && e.target.closest ? e.target.closest(".chat-group-info-modal__member-kick[data-gi-user-id]") : null;
      if (kickB && membersEl.contains(kickB)) {
        e.preventDefault();
        e.stopPropagation();
        var uidKick = kickB.getAttribute("data-gi-user-id");
        var nmKick = kickB.getAttribute("data-gi-user-name") || uidKick;
        if (!uidKick) return;
        if (typeof pokerEnsureChatTelegramVerified === "function" && !pokerEnsureChatTelegramVerified()) return;
        if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
          if (tg && tg.showAlert) tg.showAlert("Войдите в аккаунт");
          return;
        }
        var isGeneralKick = openGroupInfoMode === "general";
        var gidKick = openGroupId;
        if (!isGeneralKick && !gidKick) return;
        var msgKick = isGeneralKick
          ? "Убрать «" + String(nmKick || uidKick).slice(0, 80) + "» из главного чата?"
          : "Исключить «" + String(nmKick || uidKick).slice(0, 80) + "» из группы?";
        function doKick() {
          kickB.disabled = true;
          if (isGeneralKick) {
            fetch(base + "/api/chat", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(pokerApiAuthJsonBody({ action: "clubChatRevoke", userId: uidKick })),
            })
              .then(function (r) {
                return r.json();
              })
              .then(function (data) {
                kickB.disabled = false;
                if (data && data.ok) {
                  var qGr = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?";
                  fetch(base + "/api/chat" + qGr + "&mode=general&trackSeen=0&includeRoster=1", { cache: "no-store" })
                    .then(function (r2) {
                      return r2.json();
                    })
                    .then(function (d2) {
                      if (openGroupInfoMode !== "general") return;
                      if (d2 && d2.ok) {
                        var gm2 = Array.isArray(d2.generalMembers) ? d2.generalMembers : [];
                        if (window._chatGeneralCache && typeof window._chatGeneralCache === "object") {
                          window._chatGeneralCache.generalMembers = gm2;
                          if (d2.participantsCount != null) {
                            window._chatGeneralCache.participantsCount = d2.participantsCount;
                          }
                          if (d2.onlineCount != null) {
                            window._chatGeneralCache.onlineCount = d2.onlineCount;
                          }
                        }
                        renderGeneralMembersModalFromList(gm2);
                        try {
                          if (typeof syncClubChatRosterUi === "function") syncClubChatRosterUi();
                        } catch (eSynK) {}
                      }
                    })
                    .catch(function () {});
                  if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
                  if (tg && tg.showToast) tg.showToast("Участник убран из чата");
                } else if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Ошибка");
                else if (typeof alert === "function") alert((data && data.error) || "Ошибка");
              })
              .catch(function () {
                kickB.disabled = false;
                if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
                else if (typeof alert === "function") alert(POKER_NET_ERR);
              });
            return;
          }
          fetch(base + "/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
              pokerApiAuthJsonBody({ action: "removeGroupMember", groupId: gidKick, memberId: uidKick })
            ),
          })
            .then(function (r) {
              return r.json();
            })
            .then(function (data) {
              kickB.disabled = false;
              if (data && data.ok) {
                refetchGroupInfoMeta();
                if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
                if (tg && tg.showToast) tg.showToast("Участник исключён");
              } else if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Ошибка");
              else if (typeof alert === "function") alert((data && data.error) || "Ошибка");
            })
            .catch(function () {
              kickB.disabled = false;
              if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
              else if (typeof alert === "function") alert(POKER_NET_ERR);
            });
        }
        if (tg && typeof tg.showConfirm === "function") {
          tg.showConfirm(msgKick, function (ok) {
            if (ok) doKick();
          });
        } else if (typeof confirm === "function" && confirm(msgKick)) {
          doKick();
        }
        return;
      }
      var b = e.target && e.target.closest ? e.target.closest(".chat-group-info-modal__member[data-gi-user-id]") : null;
      if (!b || !membersEl.contains(b)) return;
      e.preventDefault();
      var uid = b.getAttribute("data-gi-user-id");
      var unm = b.getAttribute("data-gi-user-name") || uid;
      if (!uid) return;
      var myG = resolveMyChatMemberId();
      if (myG && peerChatIdsEqual(uid, myG)) {
        closeModal();
        return;
      }
      var imgM = b.querySelector("img.chat-group-info-modal__member-av");
      var uav = imgM && imgM.src ? imgM.src : null;
      if (typeof window.openChatUserModalById === "function") {
        window.openChatUserModalById(uid, unm, uav);
      }
    });
  }
}
