// Chat view glue: refresh, manager opens, conversation header actions, and find-by-id open.

function initChatViewGlue(opts) {
  opts = opts || {};
  with (opts) {
    window.chatRefresh = function () {
      pokerPushOpenTraceTransition("chatRefresh-enter", "");
      try {
        var directPendingRefresh = window.__pendingOpenChatPersonalFromDeepLink;
        var directPendingPeerRefresh =
          directPendingRefresh && directPendingRefresh.userId != null
            ? String(directPendingRefresh.userId).trim()
            : "";
        if (directPendingPeerRefresh) {
          pokerPushOpenDebug("chatRefresh-direct-pending", directPendingPeerRefresh);
          chatActiveTab = "personal";
          window.__pokerForcePushDmPeer = normalizePeerIdForChat(directPendingPeerRefresh);
          window.__pokerForcePushDmPeerUntil = Date.now() + 15000;
          if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function" &&
              window.__pokerEnsureOpenPendingChatPersonalFromDeepLink()) {
            return;
          }
        }
        var hardPendingPeer = typeof pokerGetActivePushDmTarget === "function" ? pokerGetActivePushDmTarget() : "";
        if (hardPendingPeer) {
          pokerPushOpenDebug("chatRefresh-hard-reroute", hardPendingPeer);
          window.__pokerForcePushDmPeer = normalizePeerIdForChat(hardPendingPeer);
          window.__pokerForcePushDmPeerUntil = Date.now() + 15000;
          window.__pokerForceAllowPendingPushConvOpen = true;
          try {
            if (typeof pokerOpenResolvedChatPeer === "function" && pokerOpenResolvedChatPeer(hardPendingPeer, hardPendingPeer)) {
              return;
            }
            if (typeof pokerOpenChatPeerDirectFallback === "function" && pokerOpenChatPeerDirectFallback(hardPendingPeer, hardPendingPeer)) {
              return;
            }
            if (typeof pokerOpenPendingPushDmWithoutContacts === "function" && pokerOpenPendingPushDmWithoutContacts(hardPendingPeer, hardPendingPeer)) {
              return;
            }
            if (typeof pokerOpenPushDmHard === "function") {
              pokerOpenPushDmHard(hardPendingPeer, hardPendingPeer);
            }
            pokerPushOpenDebug("chatRefresh-hard-stop", hardPendingPeer);
            return;
          } finally {
            window.__pokerForceAllowPendingPushConvOpen = false;
          }
        }
        var forcedPeerRefresh = window.__pokerForcePushDmPeer;
        var forcedUntilRefresh = Number(window.__pokerForcePushDmPeerUntil || 0);
        if (
          forcedPeerRefresh &&
          forcedUntilRefresh > Date.now() &&
          typeof pokerOpenPendingPushDmWithoutContacts === "function"
        ) {
          pokerPushOpenDebug("chatRefresh-blocked", forcedPeerRefresh);
          pokerOpenPendingPushDmWithoutContacts(forcedPeerRefresh, forcedPeerRefresh);
          return;
        }
        if (window.__pendingOpenClubChatGeneral) {
          if (typeof window.__pokerFlushPendingChatDeepLink === "function" && window.__pokerFlushPendingChatDeepLink()) {
            return;
          }
        }
        if (window.__pendingOpenChatPersonalFromDeepLink) {
          if (typeof window.__pokerFlushPendingChatDeepLink === "function" && window.__pokerFlushPendingChatDeepLink()) {
            return;
          }
          if (
            typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function" &&
            window.__pokerEnsureOpenPendingChatPersonalFromDeepLink()
          ) {
            return;
          }
        }
      } catch (eChatRefreshPending) {}
      try {
        var refreshIntentAt = Number(window.__pokerChatDialogOpenIntentAt || 0);
        var refreshIntentPeer = String(window.__pokerChatDialogOpenIntentPeer || "");
        var refreshIntentFresh = !!(refreshIntentAt && Date.now() - refreshIntentAt < 3500);
        var refreshConvVisible = !!(convView && !convView.classList.contains("chat-conv-view--hidden"));
        var refreshHasPersonalPeer = !!(chatWithUserId || (refreshIntentFresh && refreshIntentPeer));
        if (chatActiveTab === "dialogs" && refreshHasPersonalPeer && (refreshConvVisible || refreshIntentFresh)) {
          pokerPushOpenTraceTransition("chatRefresh-keep-personal", String(chatWithUserId || refreshIntentPeer || ""));
          chatActiveTab = "personal";
          if (!chatWithUserId && refreshIntentPeer) chatWithUserId = refreshIntentPeer;
        }
      } catch (eChatRefreshKeepPersonal) {}
      /* Сначала setTab — для general выставится scrollGeneralToBottomOnNextRender; иначе отрисовка кэша шла с флагом false и лента мелькала «сверху», затем loadGeneral прокручивал вниз. */
      pokerPushOpenTraceTransition("chatRefresh-before-setTab", String(chatActiveTab || ""));
      setTab(chatActiveTab);
      if (chatWithUserId) showConv(chatWithUserId, chatWithUserName, undefined, chatWithPeerAvatarUrl);
      pokerPushOpenTraceTransition("chatRefresh-after-show", "");
      var genVis = generalView && !generalView.classList.contains("chat-general-view--hidden");
      if (
        chatActiveTab === "general" &&
        genVis &&
        generalMessages &&
        window._chatGeneralCache &&
        !window._chatGeneralCache.__fromDisk &&
        window._chatGeneralCache.messages &&
        window._chatGeneralCache.messages.length
      ) {
        scrollGeneralToBottomOnNextRender = true;
        renderGeneralMessages(window._chatGeneralCache.messages);
        try {
          lastGeneralMessagesSig = generalMessagesSignature(window._chatGeneralCache.messages);
        } catch (eSigSync) {}
        if (window._chatGeneralCache.participantsCount != null) {
          window.lastGeneralStats = String(window._chatGeneralCache.participantsCount) + " уч";
          updateChatHeaderStats();
        }
        try {
          syncClubChatRosterUi();
        } catch (eRosterRf) {}
      }
    };
    document.querySelectorAll(".chat-manager-btn--tg").forEach(function (link) {
      link.addEventListener("click", function (e) {
        var href = link.getAttribute("href");
        if (href && href.startsWith("tg://") && tg && tg.openTelegramLink) {
          e.preventDefault();
          if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
          tg.openTelegramLink(href);
        }
      });
    });
    document.querySelectorAll(".chat-manager-btn[data-chat-user-id]").forEach(function (btn) {
        btn.addEventListener("click", function () {
        var raw = (btn.dataset.chatUserId || "").trim();
        var userName = btn.dataset.chatUserName || "Менеджер";
        if (!raw) {
          if (tg && tg.showAlert) tg.showAlert("Укажите data-chat-user-id (ID приложения или Telegram ID)");
          return;
        }
        function doShow(tgUserId, peerP21) {
          window.__pokerSuppressSetTabPersonalLoad = true;
          try {
            setTab("personal");
          } finally {
            window.__pokerSuppressSetTabPersonalLoad = false;
          }
          showConv(tgUserId, userName, peerP21);
        }
        if (raw.startsWith("tg_")) {
          doShow(raw);
        } else if (/^ID\d{6}$/.test(raw.toUpperCase())) {
          var id = raw.toUpperCase();
          fetch(base + "/api/users?id=" + encodeURIComponent(id) + pokerApiAuthQuery("&"))
            .then(function (r) { return r.json(); })
            .then(function (data) {
              if (data && data.ok && data.userId) doShow(data.userId, data.p21Id);
              else if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Не найдено");
            })
            .catch(function () { if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR); });
        } else {
          doShow("tg_" + raw);
        }
      });
    });
    var lastConvBackAt = 0;
    function handleConvBack(e) {
      e.preventDefault();
      e.stopPropagation();
      var now = Date.now();
      if (now - lastConvBackAt < 450) return;
      if ((e.type === "touchend" || e.type === "pointerup") && window.__touchWasScroll && window.__touchWasScroll()) return;
      lastConvBackAt = now;
      try {
        window.__pokerChatConvBackSeq = (Number(window.__pokerChatConvBackSeq || 0) || 0) + 1;
      } catch (eConvBackSeq) {}
      pokerPushOpenSetCaller("conv-back-btn");
      showDialogs();
    }
    function handleConvBackFromHeader(e) {
      var target = e.target && e.target.closest ? e.target.closest("#chatBackBtn, .chat-conv-top__toolbar-back") : null;
      if (!target) return;
      handleConvBack(e);
    }
    if (backBtn) {
      backBtn.addEventListener("touchstart", handleConvBack, { passive: false });
      backBtn.addEventListener("touchend", handleConvBack, { passive: false });
      backBtn.addEventListener("click", handleConvBack);
    }
    var convTopEl = document.querySelector("#chatConvView .chat-conv-top");
    if (convTopEl) {
      convTopEl.addEventListener("click", handleConvBackFromHeader, true);
    }
    var convProfileOpenBtn = document.getElementById("chatConvProfileOpenBtn");
    if (convProfileOpenBtn) {
      convProfileOpenBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var uidP = chatWithUserId;
        if (!uidP) return;
        if (String(uidP).indexOf("group_") === 0) {
          if (typeof window.__pokerOpenChatGroupInfo === "function") window.__pokerOpenChatGroupInfo(uidP);
          return;
        }
        var myOpenP = resolveMyChatMemberId();
        if (myOpenP && peerChatIdsEqual(uidP, myOpenP)) {
          if (tg && tg.showAlert) tg.showAlert("Это вы — свой профиль смотрите в разделе «Профиль».");
          else if (typeof alert === "function") alert("Это вы — свой профиль смотрите в разделе «Профиль».");
          return;
        }
        var nameP = chatWithUserName || (convTitle && convTitle.textContent) || "Игрок";
        var avP = chatWithPeerAvatarUrl || null;
        if (typeof window.openChatUserModalById === "function") {
          window.openChatUserModalById(uidP, nameP, avP);
        }
      });
    }
    var convGroupAddBtn = document.getElementById("chatConvGroupAddMembersBtn");
    if (convGroupAddBtn) {
      convGroupAddBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var gidA = chatWithUserId;
        if (!gidA || String(gidA).indexOf("group_") !== 0) return;
        if (typeof window.__pokerOpenChatGroupAddMembers === "function") {
          window.__pokerOpenChatGroupAddMembers(gidA);
        }
      });
    }
    if (convPeerAvatarWrap && convGroupAvatarFile) {
      convPeerAvatarWrap.addEventListener("click", function (e) {
        if (!convGroupCanChangeAvatar || !chatWithUserId || String(chatWithUserId).indexOf("group_") !== 0) return;
        e.preventDefault();
        e.stopPropagation();
        convGroupAvatarFile.click();
      });
      convPeerAvatarWrap.addEventListener("keydown", function (e) {
        if (!convGroupCanChangeAvatar) return;
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        convGroupAvatarFile.click();
      });
    }
    if (convGroupAvatarFile) {
      convGroupAvatarFile.addEventListener("change", function () {
        var f = convGroupAvatarFile.files && convGroupAvatarFile.files[0];
        var gidCv = chatWithUserId;
        convGroupAvatarFile.value = "";
        if (!f || !gidCv || String(gidCv).indexOf("group_") !== 0 || !convGroupCanChangeAvatar) return;
        if (typeof pokerEnsureChatTelegramVerified === "function" && !pokerEnsureChatTelegramVerified()) return;
        if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
          if (tg && tg.showAlert) tg.showAlert("Войдите, чтобы сменить аватар");
          return;
        }
        resizeImage(f, 256, 256, 0.88)
          .then(function (dataUrl) {
            return fetch(base + "/api/chat", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(
                pokerApiAuthJsonBody({ action: "updateGroupAvatar", groupId: gidCv, avatar: dataUrl })
              ),
            }).then(function (r) {
              return r.json();
            });
          })
          .then(function (data) {
            if (data && data.ok && data.groupAvatar) {
              chatWithPeerAvatarUrl = data.groupAvatar;
              applyConvPeerAvatarHeader(data.groupAvatar, chatWithUserName || "");
              if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
              if (tg && tg.showToast) tg.showToast("Аватар обновлён");
            } else if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Ошибка");
            else if (typeof alert === "function") alert((data && data.error) || "Ошибка");
          })
          .catch(function () {
            if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
            else if (typeof alert === "function") alert(POKER_NET_ERR);
          });
      });
    }
    if (findByIdBtn && findByIdInput) {
      function findByIdAndOpen() {
        var raw = (findByIdInput.value || "").trim();
        var byId = false;
        var idPart = raw.replace(/^@/, "").toUpperCase();
        if (/^\d{6}$/.test(idPart) || (/^ID\d{6}$/.test(idPart))) {
          byId = true;
        } else if (idPart.startsWith("ID") && idPart.length === 8 && /^ID\d{6}$/.test(idPart)) {
          byId = true;
        }
        var url;
        if (byId) {
          var id = idPart.startsWith("ID") ? idPart : "ID" + idPart;
          url = base + "/api/users?id=" + encodeURIComponent(id) + pokerApiAuthQuery("&");
        } else {
          var nick = raw.replace(/^@/, "").trim();
          if (!nick) {
            if (tg && tg.showAlert) tg.showAlert("Введите ID (ID123456) или ник (@username)");
            return;
          }
          url = base + "/api/users?username=" + encodeURIComponent(nick) + pokerApiAuthQuery("&");
        }
        findByIdBtn.disabled = true;
        fetch(url)
          .then(function (r) { return r.json(); })
          .then(function (data) {
            findByIdBtn.disabled = false;
            findByIdInput.value = "";
            if (data && data.ok && data.userId) {
              showConv(data.userId, data.userName || data.userId, data.p21Id);
            } else {
              if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Не найдено");
            }
          })
          .catch(function () {
            findByIdBtn.disabled = false;
            if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
          });
      }
      findByIdBtn.addEventListener("click", findByIdAndOpen);
      if (findByIdInput) findByIdInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { e.preventDefault(); findByIdAndOpen(); }
      });
    }
      if (findByIdInput) {
        findByIdInput.addEventListener("focus", function () {
        if (
          typeof window.__pokerIsChatPhysicalKeyboardContext === "function" &&
          window.__pokerIsChatPhysicalKeyboardContext()
        ) {
          return;
        }
        if (typeof window.__pokerActivateChatKeyboardViewport === "function") {
          window.__pokerActivateChatKeyboardViewport();
        } else {
          if (!isTelegramChatRuntime()) {
            document.documentElement.classList.add("chat-keyboard-open");
            document.body.classList.add("chat-keyboard-open");
          }
        }
        try {
          findByIdInput.scrollIntoView({ block: "nearest", behavior: "smooth" });
        } catch (eSi2) {}
      });
      findByIdInput.addEventListener("blur", function () {
        try {
          if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
            window.__pokerFinalizeChatKeyboardDismiss();
          } else {
            if (typeof window.__pokerClearChatKeyboardViewportState === "function") {
              window.__pokerClearChatKeyboardViewportState();
            }
            if (typeof pokerNukeIosKeyboardViewportArtifacts === "function") {
              pokerNukeIosKeyboardViewportArtifacts({ resetMainScroll: true });
            }
          }
        } catch (eFindBlur) {}
      });
    }
  }
}
