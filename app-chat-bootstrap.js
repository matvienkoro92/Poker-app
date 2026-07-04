// Chat bootstrap: initial open branch, static dialog bindings, and polling loop wiring.

function pokerUpdateChatAdminShiftOnline(dialogsView) {
    if (!dialogsView) return;
    var moscowHour = parseInt(new Date().toLocaleString("en-GB", { timeZone: "Europe/Moscow", hour: "2-digit", hour12: false }), 10);
    if (isNaN(moscowHour)) moscowHour = new Date().getUTCHours() + 3;
    if (moscowHour < 0) moscowHour += 24;
    if (moscowHour >= 24) moscowHour -= 24;
    dialogsView.querySelectorAll(".chat-dialog-item[data-shift-start][data-shift-end]").forEach(function (btn) {
      var start = parseInt(btn.dataset.shiftStart, 10);
      var end = parseInt(btn.dataset.shiftEnd, 10);
      var onShift = false;
      if (start <= end) onShift = moscowHour >= start && moscowHour < end;
      else onShift = moscowHour >= start || moscowHour < end;
      var onEl = btn.querySelector(".chat-dialog-item__online");
      if (!onEl) return;
      var currentlyVisible = onEl.classList.contains("chat-dialog-item__online--visible");
      if (currentlyVisible !== !!onShift) {
        onEl.classList.toggle("chat-dialog-item__online--visible", !!onShift);
      }
    });
  }

function initChatBootstrap(opts) {
  opts = opts || {};
  var dialogsView = opts.dialogsView || null;
  var chatGeneralBackBtn = opts.chatGeneralBackBtn || null;
  var tg = opts.tg || null;
  var openConvFromDialogs = typeof opts.openConvFromDialogs === "function" ? opts.openConvFromDialogs : function () {};
  var showDialogs = typeof opts.showDialogs === "function" ? opts.showDialogs : function () {};
  var pokerPushOpenSetCaller = typeof opts.pokerPushOpenSetCaller === "function" ? opts.pokerPushOpenSetCaller : function () {};
  var pokerPushOpenDebug = typeof opts.pokerPushOpenDebug === "function" ? opts.pokerPushOpenDebug : function () {};

  if (window.__pendingOpenClubChatGeneral) {
    window.__pendingOpenClubChatGeneral = false;
    window.__openClubChatAfterNextContacts = true;
  }
  if (window.__pendingOpenChatPersonalFromDeepLink && typeof openConvFromDialogs === "function") {
    pokerPushOpenDebug("initChat-branch", window.__pendingOpenChatPersonalFromDeepLink.userId || "");
    var pdlInit = window.__pendingOpenChatPersonalFromDeepLink;
    if (
      pdlInit &&
      pdlInit.userId &&
      typeof pokerOpenChatPeerDirectFallback === "function" &&
      pokerOpenChatPeerDirectFallback(pdlInit.userId, pdlInit.userName || pdlInit.userId)
    ) {
      try {
        pokerSchedulePendingPushDmContactsReload(pdlInit.userId, pdlInit.userName || pdlInit.userId);
      } catch (ePdlInitMeta) {}
    } else {
      if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function") {
        window.__pokerEnsureOpenPendingChatPersonalFromDeepLink();
      }
    }
  } else if (window.__pendingOpenManagerFromCashout && typeof openConvFromDialogs === "function") {
    var pcm = window.__pendingOpenManagerFromCashout;
    window.__pendingOpenManagerFromCashout = null;
    openConvFromDialogs(pcm.userId, pcm.userName || "Менеджер");
  } else if (typeof pokerGuardDefaultDialogsOpen === "function" && pokerGuardDefaultDialogsOpen()) {
  } else {
    pokerPushOpenSetCaller("initChat-default");
    showDialogs();
  }

  if (dialogsView) {
    var assetPath = (window.location.pathname || "").replace(/\/[^/]*$/, "") || "/";
    var assetBase = assetPath.replace(/\/?$/, "/") + "assets/";
    dialogsView.querySelectorAll(".chat-dialog-item img.chat-dialog-item__avatar[src]").forEach(function (img) {
      var s = img.getAttribute("src") || "";
      if (s.indexOf("dep-manager") !== -1) img.src = assetBase + (s.indexOf("vika") !== -1 ? "dep-manager-vika.jpg" : "dep-manager.jpg");
      else if (s.indexOf("logo-two-aces") !== -1) img.src = assetBase + "logo-two-aces.png";
    });
  }

  function updateAdminShiftOnline() {
    pokerUpdateChatAdminShiftOnline(dialogsView);
  }
  updateAdminShiftOnline();

  var lastChatGeneralBackAt = 0;
  function handleChatGeneralBack(e) {
    e.preventDefault();
    e.stopPropagation();
    var now = Date.now();
    if (now - lastChatGeneralBackAt < 450) return;
    if (e.type === "touchend" && window.__touchWasScroll && window.__touchWasScroll()) return;
    lastChatGeneralBackAt = now;
    pokerPushOpenSetCaller("general-back-btn");
    showDialogs();
  }
  if (chatGeneralBackBtn) {
    chatGeneralBackBtn.addEventListener("touchstart", handleChatGeneralBack, { passive: false });
    chatGeneralBackBtn.addEventListener("touchend", handleChatGeneralBack, { passive: false });
    chatGeneralBackBtn.addEventListener("click", handleChatGeneralBack);
  }
  var chatGeneralTitleBtn = document.getElementById("chatGeneralTitleBtn");
  if (chatGeneralTitleBtn) {
    chatGeneralTitleBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof window.__pokerOpenChatGeneralMembersModal === "function") {
        window.__pokerOpenChatGeneralMembersModal();
      }
    });
  }

  (function initChatGeneralInviteFriendBtn() {
    var inviteBtn = document.getElementById("chatGeneralInviteFriendBtn");
    if (!inviteBtn || inviteBtn.getAttribute("data-invite-bound") === "1") return;
    inviteBtn.setAttribute("data-invite-bound", "1");
    inviteBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var link = typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink("club_chat") : "";
      if (!link) return;
      if (isTelegramWebApp() && typeof pokerOpenTelegramShareUrlOnly === "function" && pokerOpenTelegramShareUrlOnly(link)) {
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("chat_general_invite_friend");
        return;
      }
      var text = "Заходи в общий чат клуба «Два туза» в приложении:\n" + link;
      var shareCaption = "Заходи в общий чат клуба «Два туза» в приложении:";
      var shareUrl =
        typeof pokerBuildTelegramShareUrlDialog === "function" ? pokerBuildTelegramShareUrlDialog(link, shareCaption) : "";
      pokerTryPwaWebShare({ text: text, url: link }).then(function (pwaOk) {
        if (pwaOk) {
          if (typeof recordShareButtonClick === "function") recordShareButtonClick("chat_general_invite_friend");
          return;
        }
        var tgw = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tgw && tgw.openTelegramLink) tgw.openTelegramLink(shareUrl);
        else if (tgw && tgw.openLink) tgw.openLink(shareUrl);
        else window.open(shareUrl, "_blank");
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("chat_general_invite_friend");
      });
    });
  })();

  (function initChatGeneralCopyLinkBtn() {
    var copyBtn = document.getElementById("chatGeneralCopyLinkBtn");
    if (!copyBtn || copyBtn.getAttribute("data-copy-bound") === "1") return;
    copyBtn.setAttribute("data-copy-bound", "1");
    copyBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var link =
        typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink("club_chat") : "";
      if (!link) return;
      var msg = "Ссылка на общий чат скопирована. Отправь другу — откроется этот чат в приложении.";
      pokerCopyTextToClipboard(link).then(function (copied) {
        var tgLocal = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (copied) {
          if (tgLocal && tgLocal.showAlert) tgLocal.showAlert(msg);
          else alert("Ссылка скопирована.");
        } else if (tgLocal && tgLocal.showAlert) {
          tgLocal.showAlert("Ссылка: " + link);
        } else {
          alert("Ссылка: " + link);
        }
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("chat_general_copy_link");
      });
    });
  })();

  return {
    updateAdminShiftOnline: updateAdminShiftOnline,
  };
}

function initChatPollingLoop(opts) {
  opts = opts || {};
  var currentInterval = opts.currentInterval || null;
  var constants = opts.constants || {};
  var state = opts.state || {};
  var getChatActiveTab = typeof opts.getChatActiveTab === "function" ? opts.getChatActiveTab : function () { return ""; };
  var getChatWithUserId = typeof opts.getChatWithUserId === "function" ? opts.getChatWithUserId : function () { return ""; };
  var getGeneralView = typeof opts.getGeneralView === "function" ? opts.getGeneralView : function () { return null; };
  var getConvView = typeof opts.getConvView === "function" ? opts.getConvView : function () { return null; };
  var getAdminsView = typeof opts.getAdminsView === "function" ? opts.getAdminsView : function () { return null; };
  var loadGeneral = typeof opts.loadGeneral === "function" ? opts.loadGeneral : function () {};
  var loadMessages = typeof opts.loadMessages === "function" ? opts.loadMessages : function () {};
  var loadContacts = typeof opts.loadContacts === "function" ? opts.loadContacts : function () {};
  var loadChatHomeSummary = typeof opts.loadChatHomeSummary === "function" ? opts.loadChatHomeSummary : null;
  var loadAdminsOnline = typeof opts.loadAdminsOnline === "function" ? opts.loadAdminsOnline : function () {};
  var updateChatHeaderStats = typeof opts.updateChatHeaderStats === "function" ? opts.updateChatHeaderStats : function () {};
  var pokerChatCanRunLongPoll = typeof opts.pokerChatCanRunLongPoll === "function" ? opts.pokerChatCanRunLongPoll : function () { return false; };
  var pokerChatShouldRunPoll = typeof opts.pokerChatShouldRunPoll === "function" ? opts.pokerChatShouldRunPoll : function () { return false; };
  var pokerChatStopLongPoll = typeof opts.pokerChatStopLongPoll === "function" ? opts.pokerChatStopLongPoll : function () {};
  var pokerChatRefreshLongPollTargets = typeof opts.pokerChatRefreshLongPollTargets === "function" ? opts.pokerChatRefreshLongPollTargets : function () {};
  var chatLastPollAt = state.chatLastPollAt || {};
  var CHAT_POLL_TICK_MS = constants.CHAT_POLL_TICK_MS || 1000;
  var CHAT_HIDDEN_IDLE_MS = constants.CHAT_HIDDEN_IDLE_MS || 60000;
  var CHAT_PRESENCE_IDLE_MS = constants.CHAT_PRESENCE_IDLE_MS || 45000;

  if (currentInterval) clearInterval(currentInterval);
  var nextInterval = setInterval(function () {
    var hidden = typeof document !== "undefined" && document.visibilityState !== "visible";
    var chatViewOn = typeof document !== "undefined" && !!document.querySelector('[data-view="chat"].view--active');
    var guestPoll = typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode();
    var credPoll = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
    var nowPoll = Date.now();

    if (hidden) {
      if (credPoll && !guestPoll) {
        if (!chatLastPollAt.contacts || nowPoll - chatLastPollAt.contacts >= CHAT_HIDDEN_IDLE_MS) {
          chatLastPollAt.contacts = nowPoll;
          if (loadChatHomeSummary) loadChatHomeSummary();
          else loadContacts({ metaOnly: true });
        }
      }
      return;
    }

    if (!chatViewOn) {
      if (credPoll && !guestPoll && !pokerChatCanRunLongPoll("contacts") && pokerChatShouldRunPoll("contacts", nowPoll)) {
        if (loadChatHomeSummary) loadChatHomeSummary();
        else loadContacts({ metaOnly: true });
      }
      return;
    }

    var activeTab = getChatActiveTab();
    var generalView = getGeneralView();
    var convView = getConvView();
    var adminsView = getAdminsView();
    var dialogsVisible = !!(
      typeof document !== "undefined" &&
      document.querySelector('[data-view="chat"].view--active') &&
      document.querySelector(".chat-dialogs-view:not(.chat-dialogs-view--hidden)")
    );
    if (
      activeTab === "general" &&
      generalView &&
      !generalView.classList.contains("chat-general-view--hidden") &&
      typeof loadGeneral === "function" &&
      !pokerChatCanRunLongPoll("general") &&
      pokerChatShouldRunPoll("general", nowPoll)
    ) {
      loadGeneral();
    }
    if (getChatWithUserId() && typeof loadMessages === "function" && !pokerChatCanRunLongPoll("personal") && pokerChatShouldRunPoll("personal", nowPoll)) loadMessages();
    if (credPoll && !guestPoll && typeof loadContacts === "function") {
      if (!pokerChatCanRunLongPoll("contacts") && pokerChatShouldRunPoll("contacts", nowPoll)) loadContacts({ metaOnly: true });
      if (dialogsVisible && (!chatLastPollAt.presence || nowPoll - chatLastPollAt.presence >= CHAT_PRESENCE_IDLE_MS)) {
        chatLastPollAt.presence = nowPoll;
        loadContacts({ presenceOnly: true });
      }
    } else if (
      activeTab === "admins" &&
      adminsView &&
      !adminsView.classList.contains("chat-admins-view--hidden") &&
      typeof loadAdminsOnline === "function" &&
      pokerChatShouldRunPoll("admins", nowPoll)
    ) {
      loadAdminsOnline();
    }
  }, CHAT_POLL_TICK_MS);

  document.addEventListener("visibilitychange", function pokerChatPollFlushOnVisible() {
    if (typeof document === "undefined") return;
    if (document.visibilityState !== "visible") {
      pokerChatStopLongPoll("general");
      pokerChatStopLongPoll("personal");
      pokerChatStopLongPoll("contacts");
      return;
    }
    try {
      var activeTab = getChatActiveTab();
      var generalView = getGeneralView();
      if (
        activeTab === "general" &&
        generalView &&
        !generalView.classList.contains("chat-general-view--hidden") &&
        typeof loadGeneral === "function"
      ) {
        loadGeneral();
      }
      var guestV = typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode();
      var credV = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
      if (credV && !guestV && typeof loadContacts === "function") loadContacts({ metaOnly: true });
      if (getChatWithUserId() && typeof loadMessages === "function") loadMessages();
    } catch (eVisPoll) {}
    pokerChatRefreshLongPollTargets();
  });
  window.addEventListener("online", function () {
    window.__pokerChatNetworkOnline = true;
    updateChatHeaderStats();
    pokerChatRefreshLongPollTargets();
  });
  window.addEventListener("offline", function () {
    window.__pokerChatNetworkOnline = false;
    pokerChatStopLongPoll("general");
    pokerChatStopLongPoll("personal");
    pokerChatStopLongPoll("contacts");
    updateChatHeaderStats();
  });

  return {
    chatPollInterval: nextInterval,
  };
}
