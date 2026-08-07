function initRaffles() {
  if (initRaffles.__listenersBound === true) {
    var currentRoot = document.querySelector('.view[data-view="raffles"]');
    var sameRoot = currentRoot && initRaffles.__boundRoot === currentRoot;
    var sameControls =
      document.getElementById("raffleCancelBtn") === initRaffles.__boundRaffleCancelBtn &&
      document.getElementById("raffleDeleteBtn") === initRaffles.__boundRaffleDeleteBtn &&
      document.getElementById("raffleCompleteBtn") === initRaffles.__boundRaffleCompleteBtn &&
      document.getElementById("rafflesCompleted") === initRaffles.__boundRafflesCompleted;
    if (sameRoot && sameControls) {
      if (typeof initRaffles.__openRequestedActiveTab === "function") initRaffles.__openRequestedActiveTab();
      if (typeof initRaffles.__reload === "function") initRaffles.__reload();
      return;
    }
    if (initRaffles.__activeAdminFallbackRoot && initRaffles.__activeAdminFallbackHandler) {
      try {
        initRaffles.__activeAdminFallbackRoot.removeEventListener("click", initRaffles.__activeAdminFallbackHandler);
      } catch (eRemoveRaffleAdminFallback) {}
      initRaffles.__activeAdminFallbackRoot = null;
      initRaffles.__activeAdminFallbackHandler = null;
    }
    initRaffles.__listenersBound = false;
    initRaffles.__profileOpenDelegate = false;
  }
  var rafflesRoot = document.querySelector('.view[data-view="raffles"]');
  if (rafflesRoot && typeof window.pokerInitRafflesHeroShare === "function") window.pokerInitRafflesHeroShare();
  var base = getApiBase();
  var initData = (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData) || "";
  var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  var rafflesSubscribeBtn = document.getElementById("rafflesSubscribeBtn");
  var adminWrap = document.getElementById("rafflesAdminWrap");
  var rafflesSubscribersRow = document.getElementById("rafflesSubscribersRow");
  var raffleAdminActions = document.getElementById("raffleAdminActions");
  var raffleCurrent = document.getElementById("raffleCurrent");
  var raffleEmpty = document.getElementById("raffleEmpty");
  var rafflesTabs = document.getElementById("rafflesTabs");
  var rafflesHero = rafflesRoot ? rafflesRoot.querySelector(".raffles-hero") : null;
  var raffleInviteWideRow = rafflesRoot ? rafflesRoot.querySelector(".raffle-invite-wide-row") : null;
  if (
    raffleInviteWideRow &&
    rafflesHero &&
    raffleInviteWideRow.parentElement !== rafflesHero
  ) {
    rafflesHero.appendChild(raffleInviteWideRow);
  }
  var rafflesTabCreate = document.getElementById("rafflesTabCreate");
  var rafflesTabActive = document.getElementById("rafflesTabActive");
  var rafflesTabCompleted = document.getElementById("rafflesTabCompleted");
  var rafflesTabLeaders = document.getElementById("rafflesTabLeaders");
  var rafflesPanelCreate = document.getElementById("rafflesPanelCreate");
  var rafflesPanelActive = document.getElementById("rafflesPanelActive");
  var rafflesPanelCompleted = document.getElementById("rafflesPanelCompleted");
  var rafflesPanelLeaders = document.getElementById("rafflesPanelLeaders");
  var raffleWinnerLeadersEmpty = document.getElementById("raffleWinnerLeadersEmpty");
  var rafflesTabActiveCount = document.getElementById("rafflesTabActiveCount");
  var rafflesTabActiveSum = document.getElementById("rafflesTabActiveSum");
  var rafflesTabCompletedCount = document.getElementById("rafflesTabCompletedCount");
  var rafflesTabCompletedSum = document.getElementById("rafflesTabCompletedSum");
  var rafflesHeroDoneCount = document.getElementById("rafflesHeroDoneCount");
  var rafflesHeroPrizeSum = document.getElementById("rafflesHeroPrizeSum");
  var rafflesHeroUniqueParticipants = document.getElementById("rafflesHeroUniqueParticipants");
  var rafflesHeroWinnersCount = document.getElementById("rafflesHeroWinnersCount");
  var rafflesHelpBtn = document.getElementById("rafflesHelpBtn");
  var rafflesHelpModal = document.getElementById("rafflesHelpModal");
  var rafflesHelpModalBackdrop = document.getElementById("rafflesHelpModalBackdrop");
  var rafflesHelpModalClose = document.getElementById("rafflesHelpModalClose");
  var rafflesCompleted = document.getElementById("rafflesCompleted");
  var raffleCard = document.getElementById("raffleCard");
  var raffleCardHeading = document.getElementById("raffleCardHeading");
  var raffleCardSubheading = document.getElementById("raffleCardSubheading");
  var raffleCompleteBtn = document.getElementById("raffleCompleteBtn");
  var raffleCancelBtn = document.getElementById("raffleCancelBtn");
  var raffleUpdateEndBtn = document.getElementById("raffleUpdateEndBtn");
  var raffleDeleteBtn = document.getElementById("raffleDeleteBtn");
  var raffleAddPrizesToggleBtn = document.getElementById("raffleAddPrizesToggleBtn");
  var raffleAddPrizesForm = document.getElementById("raffleAddPrizesForm");
  var raffleAddPrizeModeExisting = document.getElementById("raffleAddPrizeModeExisting");
  var raffleAddPrizeModeNew = document.getElementById("raffleAddPrizeModeNew");
  var raffleAddPrizeGroupSelect = document.getElementById("raffleAddPrizeGroupSelect");
  var raffleAddPrizeExistingGroupWrap = document.getElementById("raffleAddPrizeExistingGroupWrap");
  var raffleAddPrizeNewGroupWrap = document.getElementById("raffleAddPrizeNewGroupWrap");
  var raffleAddPrizeCount = document.getElementById("raffleAddPrizeCount");
  var raffleAddPrizeText = document.getElementById("raffleAddPrizeText");
  var raffleAddPrizeAccess = document.getElementById("raffleAddPrizeAccess");
  var raffleAddPrizeAccessWrap = document.getElementById("raffleAddPrizeAccessWrap");
  var raffleAddPrizesSubmit = document.getElementById("raffleAddPrizesSubmit");
  var raffleStatWinners = document.getElementById("raffleStatWinners");
  var raffleStatPrize = document.getElementById("raffleStatPrize");
  var raffleStatPrizeValue = document.getElementById("raffleStatPrizeValue");
  var raffleStatGroups = document.getElementById("raffleStatGroups");
  var raffleEnd = document.getElementById("raffleEnd");
  var rafflePrizes = document.getElementById("rafflePrizes");
  var raffleIdNote = document.getElementById("raffleIdNote");
  var raffleAccessLevelNote = document.getElementById("raffleAccessLevelNote");
  var raffleSubscribeRequirements = document.getElementById("raffleSubscribeRequirements");
  var raffleInfoToggleBtn = document.getElementById("raffleInfoToggleBtn");
  var raffleInfoPanel = document.getElementById("raffleInfoPanel");
  var raffleJoinToggleBtn = document.getElementById("raffleJoinToggleBtn");
  var raffleJoinError = document.getElementById("raffleJoinError");
  var raffleJoinedMsg = document.getElementById("raffleJoinedMsg");
  var raffleGuestGate = document.getElementById("raffleGuestGate");
  var raffleParticipantsCount = document.getElementById("raffleParticipantsCount");
  var raffleParticipantsChance = document.getElementById("raffleParticipantsChance");
  var raffleParticipants = document.getElementById("raffleParticipants");
  var raffleAdminTicketForm = document.getElementById("raffleAdminTicketForm");
  var raffleAdminTicketP21Id = document.getElementById("raffleAdminTicketP21Id");
  var raffleAdminTicketName = document.getElementById("raffleAdminTicketName");
  var raffleAdminTicketTelegram = document.getElementById("raffleAdminTicketTelegram");
  var raffleAdminTicketCount = document.getElementById("raffleAdminTicketCount");
  var raffleWinnersWrap = document.getElementById("raffleWinnersWrap");
  var raffleWinners = document.getElementById("raffleWinners");
  var raffleActionFeedback = document.getElementById("raffleActionFeedback");
  var rafflesNotifySubsBtn = document.getElementById("rafflesNotifySubsBtn");
  var rafflesNotifySubsHint = document.getElementById("rafflesNotifySubsHint");
  var rafflesActiveChooser = document.getElementById("rafflesActiveChooser");
  var raffleActiveActions = document.getElementById("raffleActiveActions");
  var raffleActiveAdminFooter = document.getElementById("raffleActiveAdminFooter");
  var raffleActiveInfoModal = document.getElementById("raffleActiveInfoModal");
  var raffleActiveInfoModalBackdrop = document.getElementById("raffleActiveInfoModalBackdrop");
  var raffleActiveInfoModalClose = document.getElementById("raffleActiveInfoModalClose");
  var raffleActiveInfoModalContent = document.getElementById("raffleActiveInfoModalContent");
  var raffleActiveInfoModalTitle = document.getElementById("raffleActiveInfoModalTitle");
  var rafflesLastBroadcastReportBtn = document.getElementById(
    "rafflesLastBroadcastReportBtn"
  );
  var rafflesRetryFailedBroadcastBtn = document.getElementById(
    "rafflesRetryFailedBroadcastBtn"
  );
  var rafflesPurgeBlockedSubsBtn = document.getElementById("rafflesPurgeBlockedSubsBtn");
  var currentRaffleId = null;
  var currentRaffleEndDate = null;
  var currentRaffleData = null;
  var raffleTimerInterval = null;
  var rafflesActiveChooserTimerInterval = null;
  var rafflesCompletedRuntime = null;
  var rafflesIsAdmin = false;
  var myRaffleUserId = null;
  var raffleFeedbackTimer = null;
  var rafflesFocusedActiveId = null;
  var rafflesCurrentTab = "active";
  var rafflesLastCompleted = [];
  var rafflesCompletedDirty = false;
  var rafflesLoadSeq = 0;
  var rafflesDeadlineRefreshInFlight = false;
  var rafflesPendingCompletedId = "";
  var rafflesArchiveLoaded = false;
  var rafflesArchiveLoading = false;
  var rafflesWinnerReadyOverrides = {};
  var rafflesWinnerStatusOverrides = {};
  var rafflesActiveBroadcastList = [];
  var rafflesActiveInfoOpenId = "";
  var rafflesSubscriptionGate = null;
  var rafflesViewerPokerPlusStatusLevel = 0;
  var raffleCurrentHomeParent = raffleCurrent ? raffleCurrent.parentNode : null;
  var raffleCurrentHomeNext = raffleCurrent ? raffleCurrent.nextSibling : null;
  var raffleActiveInfoModalLastFocus = null;
  var rafflesHelpModalLastFocus = null;
  var RAFFLES_REFERRAL_PROMO_ID = "__referrals_ticket_10000";
  var RAFFLES_REFERRAL_PROMO_PRIZE_RUB = 10000;
  var RAFFLES_FULL_CACHE_TTL_MS = 60 * 1000;

  function consumeRafflesOpenActiveTabRequest() {
    try {
      if (typeof window === "undefined" || !window.__pokerRafflesOpenActiveTab) return false;
      window.__pokerRafflesOpenActiveTab = false;
      window.__pendingRaffleCompletedId = "";
      return true;
    } catch (eConsumeActiveTab) {
      return false;
    }
  }

  function consumeRafflesOpenCompletedTabRequest() {
    try {
      if (typeof window === "undefined" || !window.__pokerRafflesOpenCompletedTab) return false;
      window.__pokerRafflesOpenCompletedTab = false;
      window.__pokerRafflesOpenActiveTab = false;
      window.__pendingRaffleCompletedId = "";
      return true;
    } catch (eConsumeCompletedTab) {
      return false;
    }
  }

  if (adminWrap && rafflesPanelCreate && adminWrap.parentNode !== rafflesPanelCreate) {
    rafflesPanelCreate.appendChild(adminWrap);
  }

  function setRafflesSubscribersRowVisible(visible) {
    if (!rafflesSubscribersRow) return;
    rafflesSubscribersRow.classList.toggle("raffles-admin-row--hidden", !visible);
    rafflesSubscribersRow.setAttribute("aria-hidden", visible ? "false" : "true");
  }

  function setRaffleActiveActionsVisible(visible) {
    if (!raffleActiveActions) return;
    raffleActiveActions.classList.toggle("raffle-active-actions--hidden", !visible);
    raffleActiveActions.hidden = !visible;
    raffleActiveActions.setAttribute("aria-hidden", visible ? "false" : "true");
    syncRaffleActiveAdminFooterVisibility(visible);
  }

  function syncRaffleActiveAdminFooterVisibility(activeVisible) {
    if (!raffleActiveAdminFooter) return;
    var actionVisible = typeof activeVisible === "boolean"
      ? activeVisible
      : !!(raffleActiveActions && !raffleActiveActions.hidden);
    var show = !!(actionVisible && rafflesIsAdmin);
    raffleActiveAdminFooter.classList.toggle("raffle-active-admin-footer--hidden", !show);
    raffleActiveAdminFooter.hidden = !show;
    raffleActiveAdminFooter.setAttribute("aria-hidden", show ? "false" : "true");
  }

  function raffleFeedbackTelegramLink(url) {
    var raw = String(url || "").trim();
    var m = raw.match(/^https:\/\/t\.me\/([A-Za-z0-9_]{3,64})(?:[/?#].*)?$/i);
    if (!m || !m[1]) return null;
    return { text: "@" + m[1], url: "https://t.me/" + m[1] };
  }

  function raffleFeedbackLinks(options) {
    var opts = options && typeof options === "object" ? options : {};
    var links = [];
    function add(link) {
      if (!link || !link.text || !link.url) return;
      for (var i = 0; i < links.length; i++) {
        if (links[i].text === link.text) return;
      }
      links.push(link);
    }
    add(raffleFeedbackTelegramLink(opts.botUrl));
    add(raffleFeedbackTelegramLink(opts.channelUrl));
    add({ text: "@Poker_dvatuza_bot", url: "https://t.me/Poker_dvatuza_bot" });
    add({ text: "@dva_tuza_club", url: "https://t.me/dva_tuza_club" });
    return links;
  }

  function raffleFeedbackRequirementActions(options) {
    var opts = options && typeof options === "object" ? options : {};
    var actions = [];
    function add(text, url, key) {
      var raw = String(url || "").trim();
      if (!/^https:\/\/t\.me\/[A-Za-z0-9_]{3,64}(?:[/?#].*)?$/i.test(raw)) return;
      for (var i = 0; i < actions.length; i++) {
        if (actions[i].url === raw) return;
      }
      actions.push({ text: text, url: raw, key: key || "" });
    }
    if (Array.isArray(opts.missingRequirements)) {
      opts.missingRequirements.forEach(function (item) {
        if (!item || typeof item !== "object") return;
        add(item.action || item.label || "Открыть", item.url, item.key || item.type);
      });
    }
    if (!actions.length && Array.isArray(opts.missing)) {
      var missing = opts.missing.map(function (item) { return String(item || "").trim(); });
      if (missing.indexOf("telegram") !== -1 || missing.indexOf("bot") !== -1) {
        add("Открыть бота", opts.botUrl || "https://t.me/Poker_dvatuza_bot", "bot");
      }
      if (missing.indexOf("telegram") !== -1 || missing.indexOf("channel") !== -1) {
        add("Подписаться на канал", opts.channelUrl || "https://t.me/dva_tuza_club", "channel");
      }
    }
    if (opts.code === "TELEGRAM_REQUIRED") {
      actions.unshift({ text: "Привязать Telegram", internal: "profile-telegram", key: "telegram" });
    }
    return actions;
  }

  function appendRaffleFeedbackActions(target, options) {
    var actions = raffleFeedbackRequirementActions(options);
    if (!actions.length) return;
    target.appendChild(document.createElement("br"));
    var wrap = document.createElement("span");
    wrap.className = "raffle-feedback-actions";
    actions.forEach(function (action) {
      if (action.internal === "profile-telegram") {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "raffle-feedback-action raffle-feedback-auth-action";
        btn.textContent = action.text;
        btn.setAttribute("data-raffle-auth-action", action.internal);
        if (action.key) btn.setAttribute("data-raffle-requirement", action.key);
        wrap.appendChild(btn);
        return;
      }
      var a = document.createElement("a");
      a.className = "raffle-feedback-link raffle-feedback-action";
      a.href = action.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = action.text;
      if (action.key) a.setAttribute("data-raffle-requirement", action.key);
      wrap.appendChild(a);
    });
    target.appendChild(wrap);
  }

  function appendRaffleFeedbackMessage(target, message, options) {
    var text = String(message || "");
    var links = raffleFeedbackLinks(options);
    var pos = 0;
    while (pos < text.length) {
      var found = null;
      for (var i = 0; i < links.length; i++) {
        var idx = text.indexOf(links[i].text, pos);
        if (idx === -1) continue;
        if (!found || idx < found.idx) found = { idx: idx, link: links[i] };
      }
      if (!found) {
        target.appendChild(document.createTextNode(text.slice(pos)));
        break;
      }
      if (found.idx > pos) target.appendChild(document.createTextNode(text.slice(pos, found.idx)));
      var a = document.createElement("a");
      a.className = "raffle-feedback-link";
      a.href = found.link.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = text.slice(found.idx, found.idx + found.link.text.length);
      target.appendChild(a);
      pos = found.idx + found.link.text.length;
    }
    appendRaffleFeedbackActions(target, options);
  }

  function showRaffleFeedback(message, kind, options) {
    if (!message) return;
    var opts = options && typeof options === "object" ? options : {};
    if (raffleFeedbackTimer) {
      clearTimeout(raffleFeedbackTimer);
      raffleFeedbackTimer = null;
    }
    if (tg && tg.HapticFeedback && tg.HapticFeedback.notificationOccurred) {
      try {
        tg.HapticFeedback.notificationOccurred(kind === "err" ? "error" : "success");
      } catch (eH) {}
    }
    if (raffleActionFeedback) {
      raffleActionFeedback.textContent = "";
      appendRaffleFeedbackMessage(raffleActionFeedback, message, opts);
      raffleActionFeedback.classList.remove("raffle-action-feedback--hidden");
      raffleActionFeedback.classList.toggle("raffle-action-feedback--ok", kind !== "err");
      raffleActionFeedback.classList.toggle("raffle-action-feedback--err", kind === "err");
      if (!opts.sticky) {
        raffleFeedbackTimer = setTimeout(function () {
          if (raffleActionFeedback) raffleActionFeedback.classList.add("raffle-action-feedback--hidden");
          raffleFeedbackTimer = null;
        }, 5000);
      }
    } else if (typeof alert === "function") {
      alert(message);
    }
  }

  function clearRaffleJoinError() {
    if (!raffleJoinError) return;
    raffleJoinError.textContent = "";
    raffleJoinError.classList.add("raffle-join-error--hidden");
  }

  function showRaffleJoinError(message) {
    if (!message) return;
    if (tg && tg.HapticFeedback && tg.HapticFeedback.notificationOccurred) {
      try {
        tg.HapticFeedback.notificationOccurred("error");
      } catch (eH) {}
    }
    if (!raffleJoinError) {
      showRaffleFeedback(message, "err");
      return;
    }
    raffleJoinError.textContent = String(message || "");
    raffleJoinError.classList.remove("raffle-join-error--hidden");
  }

  function openRaffleTelegramLinkingFlow() {
    if (typeof setView === "function") setView("profile");
    var opened = false;
    [120, 420, 900].forEach(function (delay) {
      setTimeout(function () {
        if (opened) return;
        try {
          if (typeof setProfileTab === "function") setProfileTab("club");
        } catch (eProfileTab) {}
        try {
          if (typeof syncProfileEmailAuthUi === "function") syncProfileEmailAuthUi();
        } catch (eProfileEmailSync) {}
        try {
          var linkBtn = document.getElementById("profileTelegramLinkBtn");
          if (linkBtn && typeof linkBtn.click === "function") {
            opened = true;
            linkBtn.click();
            return;
          }
        } catch (eProfileTgBtn) {}
        try {
          if (typeof window.__pokerOpenPwaLoginScreen === "function") {
            opened = true;
            window.__pokerOpenPwaLoginScreen();
          }
        } catch (ePwaLoginOpen) {}
      }, delay);
    });
  }

  function setRaffleInfoPanelOpen(open) {
    if (!raffleInfoToggleBtn || !raffleInfoPanel) return;
    var shouldOpen = !!open;
    raffleInfoToggleBtn.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
    raffleInfoToggleBtn.classList.toggle("raffle-info-toggle-btn--open", shouldOpen);
    raffleInfoPanel.classList.toggle("raffle-info-panel--hidden", !shouldOpen);
    raffleInfoPanel.hidden = !shouldOpen;
  }

  function raffleActiveInfoPanelHasContent() {
    var hasIdNote = !!(
      raffleIdNote &&
      !raffleIdNote.hidden &&
      String(raffleIdNote.textContent || "").trim()
    );
    var hasSubscribeRequirements = !!(
      raffleSubscribeRequirements &&
      !raffleSubscribeRequirements.hidden &&
      String(raffleSubscribeRequirements.textContent || "").trim()
    );
    return hasIdNote || hasSubscribeRequirements;
  }

  function restoreRaffleCurrentHome() {
    if (!raffleCurrent || !raffleCurrentHomeParent) return;
    if (raffleCurrent.parentNode === raffleCurrentHomeParent) return;
    if (raffleCurrentHomeNext && raffleCurrentHomeNext.parentNode === raffleCurrentHomeParent) {
      raffleCurrentHomeParent.insertBefore(raffleCurrent, raffleCurrentHomeNext);
    } else {
      raffleCurrentHomeParent.appendChild(raffleCurrent);
    }
  }

  function getRafflesActiveById(raffleId) {
    var target = String(raffleId || "");
    if (!target) return null;
    for (var i = 0; i < rafflesActiveBroadcastList.length; i++) {
      if (String(rafflesActiveBroadcastList[i] && rafflesActiveBroadcastList[i].id || "") === target) {
        return rafflesActiveBroadcastList[i];
      }
    }
    return null;
  }

  function setRaffleActiveInfoModalTitle(raffleId) {
    if (!raffleActiveInfoModalTitle) return;
    var raffle = getRafflesActiveById(raffleId) || currentRaffleData;
    var title = "";
    if (raffle && activeRaffleIsKnockoutTicketCard(raffle)) {
      title = "Главный розыгрыш";
    } else if (raffle) {
      title = activeRaffleShortTitle(raffle);
    }
    raffleActiveInfoModalTitle.textContent = title ? "Инфо: " + title : "Инфо о розыгрыше";
  }

  function mountRaffleModalAtDocumentRoot(modal) {
    if (!modal || !document || !document.body || modal.parentNode === document.body) return;
    document.body.appendChild(modal);
  }

  function resetRaffleModalScroll(modal) {
    if (!modal) return;
    try {
      modal.scrollTop = 0;
      var box = modal.querySelector(".raffle-active-info-modal__box");
      if (box) box.scrollTop = 0;
    } catch (eModalScrollTop) {}
  }

  function setRaffleActiveInfoModalOpen(open) {
    if (!raffleActiveInfoModal) return;
    var shouldOpen = !!open;
    if (shouldOpen) mountRaffleModalAtDocumentRoot(raffleActiveInfoModal);
    raffleActiveInfoModal.classList.toggle("raffle-active-info-modal--hidden", !shouldOpen);
    raffleActiveInfoModal.hidden = !shouldOpen;
    raffleActiveInfoModal.setAttribute("aria-hidden", shouldOpen ? "false" : "true");
    try {
      if (document && document.body) {
        document.body.classList.toggle("raffle-active-info-modal-open", shouldOpen);
      }
    } catch (eBodyClass) {}
    if (shouldOpen) {
      resetRaffleModalScroll(raffleActiveInfoModal);
      try {
        raffleActiveInfoModalLastFocus = document.activeElement || null;
      } catch (eFocusRead) {
        raffleActiveInfoModalLastFocus = null;
      }
      setTimeout(function () {
        try {
          if (raffleActiveInfoModalClose && typeof raffleActiveInfoModalClose.focus === "function") {
            raffleActiveInfoModalClose.focus();
          }
        } catch (eFocusClose) {}
      }, 0);
    } else if (raffleActiveInfoModalLastFocus && typeof raffleActiveInfoModalLastFocus.focus === "function") {
      try {
        raffleActiveInfoModalLastFocus.focus();
      } catch (eRestoreFocus) {}
      raffleActiveInfoModalLastFocus = null;
    }
  }

  function setRafflesHelpModalOpen(open) {
    if (!rafflesHelpModal) return;
    var shouldOpen = !!open;
    if (shouldOpen) mountRaffleModalAtDocumentRoot(rafflesHelpModal);
    rafflesHelpModal.classList.toggle("raffle-active-info-modal--hidden", !shouldOpen);
    rafflesHelpModal.hidden = !shouldOpen;
    rafflesHelpModal.setAttribute("aria-hidden", shouldOpen ? "false" : "true");
    if (rafflesHelpBtn) rafflesHelpBtn.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
    try {
      if (document && document.body) {
        document.body.classList.toggle("raffles-help-modal-open", shouldOpen);
      }
    } catch (eHelpBodyClass) {}
    if (shouldOpen) {
      resetRaffleModalScroll(rafflesHelpModal);
      try {
        rafflesHelpModalLastFocus = document.activeElement || null;
      } catch (eHelpFocusRead) {
        rafflesHelpModalLastFocus = null;
      }
      setTimeout(function () {
        try {
          if (rafflesHelpModalClose && typeof rafflesHelpModalClose.focus === "function") {
            rafflesHelpModalClose.focus();
          }
        } catch (eHelpFocusClose) {}
      }, 0);
    } else if (rafflesHelpModalLastFocus && typeof rafflesHelpModalLastFocus.focus === "function") {
      try {
        rafflesHelpModalLastFocus.focus();
      } catch (eHelpRestoreFocus) {}
      rafflesHelpModalLastFocus = null;
    }
  }

  function closeRafflesHelpModal() {
    setRafflesHelpModalOpen(false);
  }

  function syncRafflesActiveInfoDetailsMount() {
    if (!raffleCurrent) return;
    if (rafflesActiveInfoOpenId && raffleActiveInfoModalContent) {
      if (raffleCurrent.parentNode !== raffleActiveInfoModalContent) {
        raffleActiveInfoModalContent.appendChild(raffleCurrent);
      }
      raffleCurrent.classList.add("raffle-current--inside-active-info");
      raffleCurrent.classList.add("raffle-current--inside-active-modal");
      raffleCurrent.classList.remove("raffle-current--hidden");
      setRaffleInfoPanelOpen(raffleActiveInfoPanelHasContent());
      setRaffleActiveInfoModalTitle(rafflesActiveInfoOpenId);
      setRaffleActiveInfoModalOpen(true);
      return;
    }
    restoreRaffleCurrentHome();
    raffleCurrent.classList.remove("raffle-current--inside-active-info");
    raffleCurrent.classList.remove("raffle-current--inside-active-modal");
    raffleCurrent.classList.add("raffle-current--hidden");
    setRaffleInfoPanelOpen(false);
    setRaffleActiveInfoModalOpen(false);
  }

  function closeRafflesActiveInfoModal() {
    if (!rafflesActiveInfoOpenId && (!raffleActiveInfoModal || raffleActiveInfoModal.classList.contains("raffle-active-info-modal--hidden"))) return;
    rafflesActiveInfoOpenId = "";
    syncRafflesActiveInfoDetailsMount();
    if (rafflesActiveBroadcastList.length) {
      renderRafflesActiveChooser(rafflesActiveBroadcastList, currentRaffleId || rafflesFocusedActiveId || "");
    }
  }

  function raffleCanUseTelegramPopup() {
    try {
      return !!(
        tg &&
        typeof tg.showConfirm === "function" &&
        typeof isTelegramWebApp === "function" &&
        isTelegramWebApp()
      );
    } catch (eRaffleTgPopup) {
      return false;
    }
  }

  function confirmRaffleAdminAction(message, onOk) {
    if (typeof onOk !== "function") return;
    if (raffleCanUseTelegramPopup()) {
      tg.showConfirm(message, function (ok) {
        if (ok) onOk();
      });
      return;
    }
    if (typeof window.confirm === "function") {
      if (window.confirm(message)) onOk();
      return;
    }
    onOk();
  }

  if (typeof initRafflesSubscribeRuntime === "function") {
    initRafflesSubscribeRuntime({ rafflesSubscribeBtn: rafflesSubscribeBtn, initData: initData });
  }

  var formatRaffleCountdown = pokerRafflesFormatCountdown;
  var escapeHtml = pokerRafflesEscapeHtml;
  var raffleParticipantDisplayLine = pokerRafflesParticipantDisplayLine;
  var raffleParticipantLineHtml = pokerRafflesParticipantLineHtml;
  var raffleDisplayPrizeText = pokerRafflesDisplayPrizeText;
  var parsePrizeValue = pokerRafflesParsePrizeValue;
  var getRaffleTotalPrize = pokerRafflesGetTotalPrize;
  var formatRaffleSum = pokerRafflesFormatSum;
  var buildActiveRaffleCardHeading = pokerRafflesBuildActiveCardHeading;

  function raffleMissingSubscriptionRequirements() {
    var gate = rafflesSubscriptionGate && typeof rafflesSubscriptionGate === "object" ? rafflesSubscriptionGate : null;
    if (!gate || gate.ok === true) return [];
    var rows = Array.isArray(gate.missingRequirements) ? gate.missingRequirements : [];
    var missingRaw = Array.isArray(gate.missing) ? gate.missing.map(function (item) {
      return String(item || "").trim();
    }) : [];
    var hasTelegramFallback = missingRaw.indexOf("telegram") !== -1;
    var out = [];
    var seen = {};

    function addRequirement(source, fallback) {
      var item = source && typeof source === "object" ? source : {};
      var key = String(item.key || item.type || fallback || "").trim();
      if (key !== "bot" && key !== "channel") return;
      if (seen[key]) return;
      seen[key] = true;
      out.push({
        key: key,
        label: item.label || (key === "bot" ? "бот клуба @Poker_dvatuza_bot" : "канал клуба @dva_tuza_club"),
        url: item.url || (key === "bot" ? gate.botUrl : gate.channelUrl) || (key === "bot" ? "https://t.me/Poker_dvatuza_bot" : "https://t.me/dva_tuza_club"),
        instruction: item.instruction || "",
      });
    }

    rows.forEach(function (item) {
      addRequirement(item, "");
    });
    if (!out.length || hasTelegramFallback) {
      if (missingRaw.indexOf("bot") !== -1 || hasTelegramFallback) addRequirement(null, "bot");
      if (missingRaw.indexOf("channel") !== -1 || hasTelegramFallback) addRequirement(null, "channel");
    }
    return out;
  }

  function renderRaffleSubscribeRequirements(target, requirements) {
    if (!target) return;
    var rows = Array.isArray(requirements) ? requirements : [];
    var title = target.querySelector(".raffle-subscribe-requirements__title");
    var list = target.querySelector(".raffle-subscribe-requirements__list");
    if (title) title.textContent = "Чтобы участвовать, подпишитесь";
    if (!list) return;
    list.innerHTML = rows.map(function (item) {
      var label = item && item.label ? String(item.label) : "";
      var url = item && item.url ? String(item.url) : "";
      var instruction = item && item.instruction ? String(item.instruction) : "";
      if (item && item.key === "bot") {
        instruction = "зайдите в бота и отправьте /start или нажмите «Старт» и вернитесь сюда";
      }
      return (
        "<li>" +
          "<span>на " +
            (url ? '<a href="' + escapeHtml(url) + '" target="_blank" rel="noopener">' + escapeHtml(label) + "</a>" : escapeHtml(label)) +
          "</span>" +
          (instruction ? '<small class="raffle-subscribe-requirements__hint">' + escapeHtml(instruction) + "</small>" : "") +
        "</li>"
      );
    }).join("");
  }

  function rafflePadTimerUnit(value) {
    var n = parseInt(value, 10);
    if (isNaN(n) || n < 0) n = 0;
    return n < 10 ? "0" + n : String(n);
  }

  function formatRaffleTimerValue(endDate) {
    if (!endDate) return "";
    var ms = endDate.getTime() - Date.now();
    if (ms <= 0) return "";
    var totalSeconds = Math.floor(ms / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;
    return (days > 0 ? days + " д " : "") + rafflePadTimerUnit(hours) + ":" + rafflePadTimerUnit(minutes) + ":" + rafflePadTimerUnit(seconds);
  }

  function setRaffleEndStatusText(text) {
    if (!raffleEnd) return;
    raffleEnd.classList.add("raffle-stat--timer-state");
    raffleEnd.innerHTML = "<span class=\"raffle-timer__value\">" + escapeHtml(text || "") + "</span>";
  }

  function setRaffleEndTimerValue(value) {
    if (!raffleEnd) return;
    raffleEnd.classList.remove("raffle-stat--timer-state");
    raffleEnd.innerHTML =
      "<span class=\"raffle-timer__label\">До итогов</span>" +
      "<span class=\"raffle-timer__value\">" + escapeHtml(value || "") + "</span>";
  }

  function updateRaffleEndText() {
    if (!raffleEnd || !currentRaffleEndDate) return;
    var text = formatRaffleCountdown(currentRaffleEndDate);
    if (text === "Завершён") {
      setRaffleEndStatusText(rafflesDeadlineRefreshInFlight ? "Подводим итоги…" : "Завершён");
      if (raffleTimerInterval) {
        clearInterval(raffleTimerInterval);
        raffleTimerInterval = null;
      }
      if (!rafflesDeadlineRefreshInFlight) {
        rafflesDeadlineRefreshInFlight = true;
        clearRafflesCache();
        loadRaffles({ skipCache: true, keepCurrentOnLoading: true, deadlineRefresh: true });
      }
      return;
    }
    setRaffleEndTimerValue(formatRaffleTimerValue(currentRaffleEndDate) || text);
  }

  /** Все варианты member id (tg/vk/guest) без одного «первого попавшегося» кэша — чтобы кнопка «Отменить участие» не терялась при гонке initData/PWA. */
  function collectRaffleIdentityIds() {
    var ids = [];
    function add(s) {
      if (s == null || s === "") return;
      s = String(s).trim();
      if (!s || ids.indexOf(s) !== -1) return;
      ids.push(s);
    }
    try {
      var uRes = typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser() : null;
      if (uRes && uRes.id != null) add("tg_" + uRes.id);
    } catch (e0) {}
    if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user && tg.initDataUnsafe.user.id != null) {
      add("tg_" + tg.initDataUnsafe.user.id);
    }
    try {
      var recTg = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
      if (recTg && recTg.user && recTg.user.memberId) add(recTg.user.memberId);
      if (recTg && recTg.user && recTg.user.id != null) add("tg_" + recTg.user.id);
    } catch (eT) {}
    try {
      var recVk = typeof pokerReadPwaVkSessionRecord === "function" ? pokerReadPwaVkSessionRecord() : null;
      if (recVk && recVk.user && recVk.user.id != null) add("vk_" + recVk.user.id);
    } catch (eV) {}
    if (myRaffleUserId) add(myRaffleUserId);
    return ids;
  }

  function rafflesViewerApiReady() {
    return !!(base && (pokerApiHasCredential() || pokerCanSyncGuestProfileToServer()));
  }

  function rafflesViewerIsGuestOnly() {
    var guestMode = false;
    try {
      guestMode = typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode();
    } catch (eGuest) {}
    if (!guestMode) return false;
    try {
      if (typeof pokerApiHasCredential === "function" && pokerApiHasCredential()) return false;
    } catch (eCred) {}
    try {
      var auth = window.__pokerTelegramAuth;
      if (auth && auth.user && auth.status && auth.status !== "guest") return false;
    } catch (eAuth) {}
    return true;
  }

  function rafflesViewerNeedsLoginForParticipation() {
    if (rafflesViewerIsGuestOnly()) return true;
    try {
      if (typeof pokerApiHasCredential === "function" && pokerApiHasCredential()) return false;
    } catch (eCredParticipation) {}
    try {
      var auth = window.__pokerTelegramAuth;
      if (auth && auth.user && auth.status && auth.status !== "guest") return false;
    } catch (eAuthParticipation) {}
    return true;
  }

  function parseMoscowDateTimeLocal(value) {
    if (!value) return null;
    if (/[zZ]$/.test(value) || /[+-]\d\d:\d\d$/.test(value)) return new Date(value);
    return new Date(value + ":00+03:00");
  }

  function clearRafflesCache() {
    try {
      if (typeof window !== "undefined") {
        window._rafflesCache = null;
        window.__rafflesBypassServerListCacheUntil = Date.now() + 15000;
      }
    } catch (e) {}
  }

  function raffleCacheIsFresh(cache) {
    var cacheTime = parseInt(cache && cache.time, 10);
    return !!(cache && cache.data && cache.data.ok && cacheTime && Date.now() - cacheTime < RAFFLES_FULL_CACHE_TTL_MS);
  }

  function focusRaffleAfterMutation(raffleId) {
    rafflesFocusedActiveId = raffleId ? String(raffleId) : null;
  }

  function raffleListHasId(list, raffleId) {
    var target = String(raffleId || "");
    if (!target || !Array.isArray(list)) return false;
    for (var i = 0; i < list.length; i++) {
      if (String(list[i] && list[i].id || "") === target) return true;
    }
    return false;
  }

  function activeRaffleShortTitle(raffle) {
    var cardTitle = String(raffle && (raffle.cardTitle || raffle.card_title) || "").trim();
    if (cardTitle) return cardTitle;
    var compact = activeRaffleChooserPrizeTitle(raffle);
    if (compact) return compact;
    var title = "";
    try {
      title =
        (typeof buildActiveRaffleCardHeading === "function" ? buildActiveRaffleCardHeading(raffle) : "") ||
        (raffle && raffle.title) ||
        (raffle && raffle.groups && raffle.groups[0] && raffle.groups[0].prize) ||
        "Розыгрыш";
    } catch (eTitle) {
      title = (raffle && raffle.title) || "Розыгрыш";
    }
    title = String(title || "Розыгрыш").replace(/\s+/g, " ").trim();
    var split = title.match(/^(.+?[.!?])\s+(.+)$/);
    if (split && split[1]) title = split[1];
    title = title.replace(/^Розыгрыш[:\s]+/i, "").trim();
    if (title.length > 78) title = title.slice(0, 77).trim() + "...";
    return title;
  }

  function activeRaffleChooserPrizeTitle(raffle) {
    if (!raffle) return "";
    var cardTitle = String(raffle.cardTitle || raffle.card_title || "").trim();
    if (cardTitle) return cardTitle;
    var groups = Array.isArray(raffle.groups) ? raffle.groups : [];
    if (!groups.length) return "";
    var totalCount = Math.max(0, parseInt(raffle.totalWinners, 10) || 0);
    if (!totalCount) {
      totalCount = groups.reduce(function (sum, g) {
        return sum + Math.max(0, parseInt(g && g.count, 10) || 0);
      }, 0);
    }
    if (!totalCount) return "";
    var isCashPrize = typeof pokerRafflesIsCashPrize === "function" && pokerRafflesIsCashPrize(raffle);
    if (isCashPrize) {
      return totalCount + " " + pokerRafflesPluralizeCashBuyinsForHeading(totalCount) + " на кеш";
    }
    var nominals = [];
    groups.forEach(function (g) {
      var nominal = parsePrizeValue(g && g.prize);
      if (nominal > 0 && nominals.indexOf(nominal) === -1) nominals.push(nominal);
    });
    var ticketWord = pokerRafflesPluralizeBackingTicketsForHeading(totalCount);
    if (nominals.length === 1) {
      return totalCount + " " + ticketWord + " за " + formatRaffleSum(nominals[0]);
    }
    return totalCount + " " + ticketWord;
  }

  function activeRaffleCashMainTitleText(raffle) {
    var groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
    var totalCount = Math.max(0, parseInt(raffle && raffle.totalWinners, 10) || 0);
    if (!totalCount) {
      totalCount = groups.reduce(function (sum, group) {
        return sum + Math.max(0, parseInt(group && group.count, 10) || 0);
      }, 0);
    }
    var amountText = "";
    var limitText = "";
    groups.some(function (group) {
      var prize = String(group && group.prize || "").replace(/\s+/g, " ").trim();
      var amountMatch = prize.match(/(\d[\d\s]*)\s*(?:₽|р|руб\.?)/i);
      var limitMatch = prize.match(/(?:кеш|cash)\s+(\d+\s*\/\s*\d+)/i) || prize.match(/\b(\d+\s*\/\s*\d+)\b/);
      if (amountMatch && amountMatch[1]) {
        amountText = activeRaffleBuyinAmountText(amountMatch[1].replace(/\s+/g, ""));
      }
      if (limitMatch && limitMatch[1]) {
        limitText = limitMatch[1].replace(/\s+/g, "");
      }
      return !!(amountText && limitText);
    });
    if (!totalCount || !amountText || !limitText) return "";
    return (
      totalCount +
      " беккинг-" +
      activeRaffleBuyinWord(totalCount) +
      " по " +
      amountText +
      " на кеш " +
      limitText
    );
  }

  function activeRaffleMetaText(raffle) {
    var parts = [];
    if (raffle && raffle.daily) parts.push("Ежедневный");
    var winners = parseInt(raffle && raffle.totalWinners, 10) || 0;
    if (winners > 0) parts.push("Победителей: " + winners);
    var prize = raffle ? getRaffleTotalPrize(raffle) : 0;
    if (prize > 0) parts.push(formatRaffleSum(prize));
    if (raffle && raffle.endDate) {
      var end = new Date(raffle.endDate);
      if (!isNaN(end.getTime())) {
        parts.push(
          "до " +
            end.toLocaleString("ru-RU", {
              timeZone: "Europe/Moscow",
              day: "2-digit",
              month: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })
        );
      }
    }
    return parts.join(" · ");
  }

  function activeRaffleBadgeText(raffle) {
    if (raffle && raffle.daily) return "Ежедневный";
    return "Сегодня";
  }

  function normalizeRaffleAccessLevel(value) {
    var n = parseInt(String(value == null ? "" : value), 10);
    if (!isFinite(n) || n < 0) return 0;
    return Math.max(0, Math.min(55, n));
  }

  function raffleAccessLevel(raffle) {
    if (!raffle || typeof raffle !== "object") return 0;
    var raw = raffle.accessLevel != null
      ? raffle.accessLevel
      : raffle.minAccessLevel != null
        ? raffle.minAccessLevel
        : raffle.requiredLevel != null
          ? raffle.requiredLevel
          : raffle.minimumLevel;
    return normalizeRaffleAccessLevel(raw);
  }

  function raffleHasGroupAccessLevels(raffle) {
    var groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
    return groups.some(function (group) {
      return !!(group && group.accessLevel != null && String(group.accessLevel) !== "");
    });
  }

  function raffleAccessLevelText(raffle) {
    var level = raffleAccessLevel(raffle);
    var groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
    var groupParts = [];
    groups.forEach(function (group, index) {
      if (!group || group.accessLevel == null || String(group.accessLevel) === "") return;
      var groupLevel = normalizeRaffleAccessLevel(group.accessLevel);
      var prize = String(group.prize || "").trim();
      var label = prize ? raffleDisplayPrizeText(prize) : "Группа " + (index + 1);
      if (label.length > 34) label = "Группа " + (index + 1);
      groupParts.push(label + ": " + (groupLevel > 0 ? "уровень " + groupLevel + "+" : "для всех"));
    });
    if (groupParts.length) return groupParts.join(" · ");
    return level > 0 ? "Уровень " + level + "+" : "для всех";
  }

  function raffleAccessLevelCompactLines(raffle) {
    var level = raffleAccessLevel(raffle);
    var groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
    var groupLevels = [];
    groups.forEach(function (group, index) {
      if (!group || group.accessLevel == null || String(group.accessLevel) === "") return;
      var groupLevel = normalizeRaffleAccessLevel(group.accessLevel);
      var compactLevel = groupLevel > 0 ? groupLevel + "+" : "ВСЕ";
      if (groupLevels.indexOf(compactLevel) === -1) groupLevels.push(compactLevel);
    });
    if (groupLevels.length) return [groupLevels.slice(0, 2).join("/") + (groupLevels.length > 2 ? "+" : "")];
    return [level > 0 ? level + "+" : "ВСЕ"];
  }

  function raffleLowestAccessLevelForViewer(raffle) {
    var fallback = raffleAccessLevel(raffle);
    var groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
    if (!groups.length) return fallback;
    var lowest = null;
    groups.forEach(function (group) {
      var raw = group && group.accessLevel != null && String(group.accessLevel) !== ""
        ? group.accessLevel
        : fallback;
      var level = normalizeRaffleAccessLevel(raw);
      lowest = lowest == null ? level : Math.min(lowest, level);
    });
    return lowest == null ? fallback : lowest;
  }

  function raffleAccessLevelCompactText(raffle) {
    var lines = raffleAccessLevelCompactLines(raffle);
    var value = String(lines[0] || "").trim();
    if (!value || value.toUpperCase() === "ВСЕ") return "Доступ: для всех";
    return "Доступ: уровень " + value;
  }

  function raffleAccessSelectOptionsHtml(includeInherit) {
    var html = includeInherit ? '<option value="">как общий доступ</option>' : "";
    html += '<option value="0">для всех</option>';
    for (var level = 1; level <= 55; level += 1) {
      html += '<option value="' + level + '">Уровень ' + level + '+</option>';
    }
    return html;
  }

  function setupRaffleAccessSelect(select) {
    if (!select || select.dataset.ready === "1") return;
    var current = String(select.value == null ? "" : select.value);
    select.dataset.ready = "1";
    select.innerHTML = raffleAccessSelectOptionsHtml(true);
    select.value = current;
  }

  setupRaffleAccessSelect(raffleAddPrizeAccess);

  function activeRaffleAccessLevelHtml(raffle) {
    var accessLabel = raffleAccessLevelText(raffle);
    var accessLines = raffleAccessLevelCompactLines(raffle);
    var accessValue = String(accessLines[0] || "").trim();
    var accessDisplay = !accessValue || accessValue.toUpperCase() === "ВСЕ" ? "для всех" : "Уровень " + accessValue;
    var requiredLevel = raffleLowestAccessLevelForViewer(raffle);
    var accessStateClass = rafflesViewerPokerPlusStatusLevel >= requiredLevel
      ? " raffles-active-chooser__access--allowed"
      : " raffles-active-chooser__access--denied";
    var accessHtml =
      '<span class="raffles-active-chooser__access-label">Доступ:</span>' +
      '<span class="raffles-active-chooser__access-line">' +
      escapeHtml(accessDisplay) +
      "</span>";
    return (
      '<span class="raffles-active-chooser__access' + accessStateClass + '" aria-label="Доступ к розыгрышу: ' +
      escapeHtml(accessLabel) +
      '">' +
      '<span class="raffles-active-chooser__access-value">' +
      accessHtml +
      "</span>" +
      "</span>"
    );
  }

  function syncRafflesViewerLevelFromResponse(data) {
    if (!data || data.viewerPokerPlusStatusLevel == null) return;
    var confirmedLevel = parseInt(data.viewerPokerPlusStatusLevel, 10);
    if (!isFinite(confirmedLevel) || confirmedLevel < 0) return;
    rafflesViewerPokerPlusStatusLevel = confirmedLevel;
  }

  function activeRaffleResultsTimeText(raffle) {
    if (!raffle || !raffle.endDate) return "";
    var end = new Date(raffle.endDate);
    if (isNaN(end.getTime())) return "";
    var weekday = ["воскресенье", "понедельник", "вторник", "среду", "четверг", "пятницу", "субботу"];
    var moscowWeekdayIndex = parseInt(end.toLocaleDateString("en-US", {
      timeZone: "Europe/Moscow",
      weekday: "short",
    }).replace(/^Sun$/, "0").replace(/^Mon$/, "1").replace(/^Tue$/, "2").replace(/^Wed$/, "3").replace(/^Thu$/, "4").replace(/^Fri$/, "5").replace(/^Sat$/, "6"), 10);
    if (!isFinite(moscowWeekdayIndex)) moscowWeekdayIndex = end.getDay();
    return (
      "Итоги в " + weekday[moscowWeekdayIndex] + ", " +
      end.toLocaleTimeString("ru-RU", {
        timeZone: "Europe/Moscow",
        hour: "2-digit",
        minute: "2-digit",
      }) +
      " МСК"
    );
  }

  function activeRaffleResultsTimePanelText(raffle) {
    if (!raffle) return "";
    var dates = [];
    var batches = Array.isArray(raffle.resultBatches) ? raffle.resultBatches : [];
    batches.forEach(function (batch) {
      if (!batch || !batch.endDate) return;
      var batchEnd = new Date(batch.endDate);
      if (!isNaN(batchEnd.getTime())) dates.push(batchEnd);
    });
    if (!dates.length && raffle.endDate) {
      var end = new Date(raffle.endDate);
      if (!isNaN(end.getTime())) dates.push(end);
    }
    var dateTimes = [];
    var weekday = ["воскресенье", "понедельник", "вторник", "среду", "четверг", "пятницу", "субботу"];
    dates.forEach(function (date) {
      var time = date.toLocaleTimeString("ru-RU", {
        timeZone: "Europe/Moscow",
        hour: "2-digit",
        minute: "2-digit",
      });
      var weekdayIndex = parseInt(date.toLocaleDateString("en-US", {
        timeZone: "Europe/Moscow",
        weekday: "short",
      }).replace(/^Sun$/, "0").replace(/^Mon$/, "1").replace(/^Tue$/, "2").replace(/^Wed$/, "3").replace(/^Thu$/, "4").replace(/^Fri$/, "5").replace(/^Sat$/, "6"), 10);
      if (!isFinite(weekdayIndex)) weekdayIndex = date.getDay();
      var dateTime = weekday[weekdayIndex] + ", " + time;
      if (dateTimes.indexOf(dateTime) === -1) dateTimes.push(dateTime);
    });
    if (!dateTimes.length) return "";
    return "Итоги в " + dateTimes.map(function (dateTime, index) {
      return (index > 0 ? "в " : "") + dateTime;
    }).join(" и ") + " МСК";
  }

  function activeRafflePrizeLabel(raffle) {
    var subtitle = String(raffle && (raffle.cardSubtitle || raffle.card_subtitle) || "").trim();
    if (subtitle) return subtitle;
    var isCashPrize = typeof pokerRafflesIsCashPrize === "function" && pokerRafflesIsCashPrize(raffle);
    return isCashPrize ? "Байинов на кеш" : "Турнирных билетов";
  }

  function activeRaffleTicketPrizeDetailsHtml(raffle) {
    var groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
    var details = [];
    groups.forEach(function (group) {
      var count = Math.max(0, parseInt(group && group.count, 10) || 0);
      var prize = String(group && group.prize || "").replace(/\s+/g, " ").trim();
      if (!count || !prize) return;
      details.push(escapeHtml(count + " × " + prize));
    });
    if (!details.length) return escapeHtml(activeRafflePrizeLabel(raffle));
    return details.join('<span class="raffles-active-chooser__label-separator"> · </span>');
  }

  function activeRaffleWinnersCount(raffle) {
    var total = Math.max(0, parseInt(raffle && raffle.totalWinners, 10) || 0);
    var groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
    if (!total && groups.length) {
      total = groups.reduce(function (sum, group) {
        return sum + Math.max(0, parseInt(group && group.count, 10) || 0);
      }, 0);
    }
    return total;
  }

  function activeRaffleEntryText(raffle) {
    var groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
    var nominals = [];
    groups.forEach(function (group) {
      var nominal = parsePrizeValue(group && group.prize);
      if (nominal > 0 && nominals.indexOf(nominal) === -1) nominals.push(nominal);
    });
    if (nominals.length === 1) return "за " + formatRaffleSum(nominals[0]);
    var isCashPrize = typeof pokerRafflesIsCashPrize === "function" && pokerRafflesIsCashPrize(raffle);
    return isCashPrize ? "на кеш" : "за билет";
  }

  function activeRaffleBuyinWord(count) {
    var n = Math.abs(parseInt(count, 10) || 0);
    var mod100 = n % 100;
    var mod10 = n % 10;
    if (mod100 >= 11 && mod100 <= 19) return "байинов";
    if (mod10 === 1) return "байин";
    if (mod10 >= 2 && mod10 <= 4) return "байина";
    return "байинов";
  }

  function activeRaffleBuyinAmountText(amount) {
    var n = Math.max(0, parseInt(amount, 10) || 0);
    return n > 0 ? String(n) + "р" : "";
  }

  function activeRaffleCashNominal(prize) {
    var text = String(prize || "");
    var m = text.match(/(\d+(?:[\s\u00a0\u202f]\d{3})*(?:[.,]\d+)?)\s*(?:₽|р|руб)/i);
    if (m && m[1]) {
      var normalized = m[1].replace(/[\s\u00a0\u202f]/g, "").replace(",", ".");
      var parsed = parseFloat(normalized);
      if (isFinite(parsed) && parsed > 0) return parsed;
    }
    return parsePrizeValue(prize);
  }

  function activeRaffleCashStakeText(prize, nominal) {
    var text = String(prize || "");
    var m = text.match(/(?:^|[^\d])(\d{1,3}\s*\/\s*\d{1,3})(?:[^\d]|$)/);
    if (m && m[1]) return m[1].replace(/\s+/g, "");
    if (nominal === 1000) return "20/40";
    if (nominal === 200) return "5/10";
    return "";
  }

  function activeRaffleBuyinChipLabels(raffle) {
    var isCashPrize = typeof pokerRafflesIsCashPrize === "function" && pokerRafflesIsCashPrize(raffle);
    if (!isCashPrize) return [];
    var groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
    return groups
      .map(function (group) {
        var count = Math.max(0, parseInt(group && group.count, 10) || 0);
        var nominal = activeRaffleCashNominal(group && group.prize);
        if (count <= 0 || nominal <= 0) return "";
        var stake = activeRaffleCashStakeText(group && group.prize, nominal);
        return (
          count +
          " " +
          activeRaffleBuyinWord(count) +
          " по " +
          activeRaffleBuyinAmountText(nominal) +
          (stake ? " на " + stake : "")
        );
      })
      .filter(Boolean);
  }

  function raffleParticipantTicketCount(row) {
    if (!row) return 1;
    var raw = row.ticketCount != null
      ? row.ticketCount
      : row.tickets != null
        ? row.tickets
        : row.entryTicketCount != null
          ? row.entryTicketCount
          : row.raffleTickets;
    var n = parseInt(String(raw == null ? "" : raw), 10);
    if (!isFinite(n) || n <= 0) return 1;
    return Math.max(1, Math.min(1000, n));
  }

  function raffleTicketWord(count) {
    var n = Math.abs(parseInt(count, 10) || 0);
    var mod100 = n % 100;
    var mod10 = n % 10;
    if (mod100 >= 11 && mod100 <= 19) return "билетов";
    if (mod10 === 1) return "билет";
    if (mod10 >= 2 && mod10 <= 4) return "билета";
    return "билетов";
  }

  function raffleParticipantsTotalTickets(parts) {
    return (Array.isArray(parts) ? parts : []).reduce(function (sum, row) {
      return sum + raffleParticipantTicketCount(row);
    }, 0);
  }

  function raffleViewerTicketCount(parts, raffleIds) {
    var ids = Array.isArray(raffleIds) ? raffleIds : [];
    if (!ids.length) return 0;
    return (Array.isArray(parts) ? parts : []).reduce(function (sum, row) {
      var uid = String(row && row.userId != null ? row.userId : "").trim();
      return uid && ids.indexOf(uid) !== -1 ? sum + raffleParticipantTicketCount(row) : sum;
    }, 0);
  }

  function raffleUsesTicketWeights(raffle) {
    if (!raffle) return false;
    var mode = String(raffle.drawMode || raffle.draw_mode || "").trim().toLowerCase();
    if (mode === "weighted_tickets" || mode === "ticket_pool" || mode === "tickets_weighted") return true;
    if (raffle.weightedTickets === true || raffle.weighted_tickets === true) return true;
    if (raffleHasGroupAccessLevels(raffle)) return false;
    var parts = Array.isArray(raffle.participants) ? raffle.participants : [];
    return parts.some(function (row) { return raffleParticipantTicketCount(row) > 1; });
  }

  function raffleUsesAdminTicketEntry(raffle) {
    if (!raffle) return false;
    var entryMode = String(raffle.ticketEntryMode || raffle.ticket_entry_mode || "").trim().toLowerCase();
    return entryMode === "admin" || entryMode === "manual" || entryMode === "admin_tickets";
  }

  function activeRaffleIsKnockoutTicketCard(raffle) {
    var cardTheme = String(raffle && (raffle.cardTheme || raffle.card_theme) || "").trim().toLowerCase();
    return cardTheme === "knockout_ticket";
  }

  function activeRaffleIsTrainingCard(raffle) {
    if (typeof pokerRafflesIsTrainingPrize === "function") return pokerRafflesIsTrainingPrize(raffle);
    if (!raffle) return false;
    var text = [
      raffle.title,
      raffle.cardTitle,
      raffle.card_title,
      raffle.cardSubtitle,
      raffle.card_subtitle,
    ].concat((Array.isArray(raffle.groups) ? raffle.groups : []).map(function (group) {
      return group && group.prize;
    })).join(" ").toLowerCase();
    return text.indexOf("трениров") !== -1 &&
      (text.indexOf("никола") !== -1 || text.indexOf("fishkopcheny") !== -1);
  }

  function activeRaffleRubText(amount) {
    return formatRaffleSum(amount).replace(/\s*₽/g, "р");
  }

  function activeRaffleTicketGroupShortLabel(count, prize) {
    var total = Math.max(0, parseInt(count, 10) || 0);
    if (!total) return "";
    var nominal = parsePrizeValue(prize);
    var label = total + " " + pokerRafflesTicketWord(total);
    if (nominal > 0) label += " за " + activeRaffleRubText(nominal).replace(/[\s\u00a0\u202f]/g, "");
    return label;
  }

  function activeRaffleLargeRubText(amount) {
    return activeRaffleRubText(amount).replace(/\s*р$/i, " Р");
  }

  function activeRaffleKnockoutTitle(raffle) {
    var totalPrize = getRaffleTotalPrize(raffle);
    return (
      '<span class="raffles-active-chooser__knockout-title-kicker">Розыгрыш</span>' +
      '<span class="raffles-active-chooser__knockout-title-amount">' +
      escapeHtml(activeRaffleRubText(totalPrize || 30000)) +
      "</span>"
    );
  }

  function activeRaffleKnockoutLabelHtml(raffle) {
    var winners = activeRaffleWinnersCount(raffle) || 3;
    var groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
    var nominal = groups.length ? parsePrizeValue(groups[0] && groups[0].prize) : 10000;
    if (!nominal) nominal = 10000;
    var guarantee = String(raffle && (raffle.promoGuarantee || raffle.promo_guarantee || raffle.guarantee) || "").trim() || "700 000р";
    var tournamentName = String(raffle && (raffle.promoTournamentName || raffle.promo_tournament_name) || "").trim() || "Нокаут";
    var ticketsWord = pokerRafflesTicketWord(winners);
    return (
      '<span class="raffles-active-chooser__knockout-prize">' +
      '<strong>' +
      escapeHtml(winners + " " + ticketsWord) +
      "</strong>" +
      '<span>за ' +
      escapeHtml(activeRaffleRubText(nominal)) +
      "</span>" +
      "</span>" +
      '<span class="raffles-active-chooser__knockout-guarantee">' +
      escapeHtml(tournamentName) +
      ' · гарантия <strong>' +
      escapeHtml(guarantee) +
      "</strong></span>"
    );
  }

  function activeRaffleKnockoutInfoHtml() {
    return (
      '<span class="raffles-active-chooser__knockout-info">' +
      '<span class="raffles-active-chooser__knockout-info-title">Как получить билеты</span>' +
      '<span class="raffles-active-chooser__knockout-rule">' +
      '<strong>100 раздач</strong>' +
      '<span>на 20/40 Бонус гейм</span>' +
      "</span>" +
      '<span class="raffles-active-chooser__knockout-rule">' +
      '<strong>250 раздач</strong>' +
      '<span>на 5/10 Бонус гейм</span>' +
      '<small>если вы не с беккинг-розыгрыша</small>' +
      "</span>" +
      "</span>"
    );
  }

  function activeRaffleParticipantsCount(raffle) {
    if (Array.isArray(raffle && raffle.participants)) {
      return typeof pokerRafflesGroupParticipantsForDisplay === "function"
        ? pokerRafflesGroupParticipantsForDisplay(raffle.participants).length
        : raffle.participants.length;
    }
    var raw = raffle && (
      raffle.participantsCount != null
        ? raffle.participantsCount
        : raffle.participants_count != null
          ? raffle.participants_count
          : raffle.participantCount
    );
    var count = parseInt(raw, 10);
    return isFinite(count) && count > 0 ? count : 0;
  }

  function activeRaffleParticipantWord(count) {
    var n = Math.abs(parseInt(count, 10) || 0);
    var mod100 = n % 100;
    var mod10 = n % 10;
    if (mod100 >= 11 && mod100 <= 19) return "участников";
    if (mod10 === 1) return "участник";
    if (mod10 >= 2 && mod10 <= 4) return "участника";
    return "участников";
  }

  function activeRaffleParticipantsScaleFill(count) {
    var n = Math.max(0, parseInt(count, 10) || 0);
    if (!n) return 8;
    return Math.max(18, Math.min(84, Math.round(18 + Math.log(n + 1) * 12)));
  }

  function activeRaffleSumTitleHtml(raffle, totalPrize) {
    var sum = Math.max(0, parseInt(totalPrize || getRaffleTotalPrize(raffle), 10) || 0);
    return (
      '<span class="raffles-active-chooser__sum-kicker">Розыгрыш</span> ' +
      '<span class="raffles-active-chooser__sum-amount">' +
      escapeHtml(sum > 0 ? activeRaffleRubText(sum) : activeRaffleShortTitle(raffle)) +
      "</span>"
    );
  }

  function activeRaffleHeroTitleHtml(raffle, totalPrize) {
    var sum = Math.max(0, parseInt(totalPrize || getRaffleTotalPrize(raffle), 10) || 0);
    var amountText = sum > 0 ? activeRaffleLargeRubText(sum) : activeRaffleShortTitle(raffle);
    var compactTitle = activeRaffleChooserPrizeTitle(raffle).replace(/\s+/g, " ").trim();
    var cashTitle = compactTitle.match(/^(.+?)\s+на\s+кеш$/i);
    if (cashTitle && cashTitle[1]) {
      return (
        '<span class="raffles-active-chooser__hero-title raffles-active-chooser__hero-title--cash">' +
        '<span class="raffles-active-chooser__hero-line raffles-active-chooser__hero-line--count">' +
        escapeHtml(cashTitle[1].trim()) +
        "</span>" +
        '<span class="raffles-active-chooser__hero-line raffles-active-chooser__hero-line--kind">На кеш</span>' +
        '<span class="raffles-active-chooser__hero-line raffles-active-chooser__hero-line--amount">' +
        escapeHtml(amountText) +
        "</span>" +
        "</span>"
      );
    }
    return (
      '<span class="raffles-active-chooser__hero-title">' +
      '<span class="raffles-active-chooser__hero-line raffles-active-chooser__hero-line--count">Розыгрыш</span>' +
      '<span class="raffles-active-chooser__hero-line raffles-active-chooser__hero-line--amount">' +
      escapeHtml(amountText) +
      "</span>" +
      "</span>"
    );
  }

  function activeRaffleDetailPillLabels(raffle) {
    var labels = [];
    if (activeRaffleIsTrainingCard(raffle)) {
      return ["Персональная тренировка · 1 час · 5 000 ₽"];
    }
    var groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
    var isCashPrize = typeof pokerRafflesIsCashPrize === "function" && pokerRafflesIsCashPrize(raffle);
    var knockoutCard = activeRaffleIsKnockoutTicketCard(raffle);
    if (knockoutCard) {
      var winners = activeRaffleWinnersCount(raffle) || 3;
      var nominal = groups.length ? parsePrizeValue(groups[0] && groups[0].prize) : 10000;
      if (!nominal) nominal = 10000;
      var guarantee = String(raffle && (raffle.promoGuarantee || raffle.promo_guarantee || raffle.guarantee) || "").trim() || "700 000р";
      var tournamentName = String(raffle && (raffle.promoTournamentName || raffle.promo_tournament_name) || "").trim() || "Нокаут";
      labels.push(winners + " " + pokerRafflesTicketWord(winners) + " за " + activeRaffleRubText(nominal));
      labels.push(tournamentName + " · гарантия " + guarantee);
      return labels;
    }
    if (isCashPrize) {
      var compactTitle = activeRaffleChooserPrizeTitle(raffle);
      if (compactTitle) labels.push(compactTitle.replace(/\s*₽/g, "р"));
      activeRaffleBuyinChipLabels(raffle).forEach(function (label) {
        if (labels.indexOf(label) === -1) labels.push(label);
      });
      return labels;
    }
    groups.forEach(function (group) {
      var count = Math.max(0, parseInt(group && group.count, 10) || 0);
      var label = activeRaffleTicketGroupShortLabel(count, group && group.prize);
      if (!label) return;
      if (labels.indexOf(label) === -1) labels.push(label);
    });
    if (!labels.length) {
      var fallbackTitle = activeRaffleChooserPrizeTitle(raffle);
      labels.push(fallbackTitle ? fallbackTitle.replace(/\s*₽/g, "р") : activeRafflePrizeLabel(raffle));
    }
    return labels;
  }

  function activeRaffleDetailPillsHtml(raffle) {
    var labels = activeRaffleDetailPillLabels(raffle);
    if (!labels.length) return "";
    return (
      '<span class="raffles-active-chooser__detail-pills">' +
      labels.map(function (label) {
        return '<span class="raffles-active-chooser__detail-pill">' + escapeHtml(label) + "</span>";
      }).join("") +
      "</span>"
    );
  }

  function activeRaffleBuyinTilesHtml(raffle) {
    var labels = activeRaffleBuyinChipLabels(raffle);
    if (!labels.length) return "";
    var batches = Array.isArray(raffle && raffle.resultBatches) ? raffle.resultBatches : [];
    function batchForGroup(index) {
      var byGroup = batches.find(function (batch) {
        var indexes = Array.isArray(batch && batch.groupIndexes) ? batch.groupIndexes : [];
        return indexes.map(function (value) { return parseInt(String(value), 10); }).indexOf(index) !== -1;
      });
      return byGroup || batches[index] || null;
    }
    function batchTimerHtml(index) {
      var batch = batchForGroup(index);
      if (!batch) return "";
      var endDate = batch.endDate ? new Date(batch.endDate) : null;
      var validEndDate = endDate && !isNaN(endDate.getTime()) ? endDate : null;
      var endMs = validEndDate ? validEndDate.getTime() : 0;
      var parts = activeRaffleCountdownParts(validEndDate);
      return (
        '<span class="raffles-active-chooser__buyin-tile-timer" data-raffle-active-batch-countdown="' +
        escapeHtml(endMs || 0) +
        '">' +
        '<span class="raffles-active-chooser__buyin-tile-timer-digits">' +
        '<span data-raffle-batch-hours>' +
        escapeHtml(parts.hours) +
        "</span>:<span data-raffle-batch-minutes>" +
        escapeHtml(parts.minutes) +
        "</span>:<span data-raffle-batch-seconds>" +
        escapeHtml(parts.seconds) +
        "</span>" +
        "</span>" +
        "</span>"
      );
    }
    return (
      '<span class="raffles-active-chooser__buyin-tiles">' +
      labels.map(function (label, index) {
        var split = String(label || "").match(/^(.+?)\s+(по\s+.+)$/i);
        var top = split && split[1] ? split[1] : label;
        var bottom = split && split[2] ? split[2] : "";
        var timerHtml = batchTimerHtml(index);
        var tileClass = "raffles-active-chooser__buyin-tile " + (timerHtml ? "raffles-active-chooser__buyin-tile--with-timer" : "raffles-active-chooser__buyin-tile--no-timer");
        return (
          '<span class="' + tileClass + '">' +
          '<span class="raffles-active-chooser__buyin-tile-side">' +
          '<span class="raffles-active-chooser__buyin-tile-group">Группа ' +
          (index + 1) +
          "</span>" +
          timerHtml +
          "</span>" +
          '<span class="raffles-active-chooser__buyin-tile-icon raffles-active-chooser__buyin-tile-icon--' +
          (index % 2 ? "gold" : "violet") +
          '" aria-hidden="true"></span>' +
          '<span class="raffles-active-chooser__buyin-tile-text">' +
          '<span>' +
          escapeHtml(top) +
          "</span>" +
          (bottom ? "<span>" + escapeHtml(bottom) + "</span>" : "") +
          "</span>" +
          "</span>"
        );
      }).join("") +
      "</span>"
    );
  }

  function activeRaffleCountdownParts(endDate) {
    if (!endDate) return { hours: "00", minutes: "00", seconds: "00" };
    var ms = endDate.getTime() - Date.now();
    if (ms <= 0) return { hours: "00", minutes: "00", seconds: "00" };
    var totalSeconds = Math.floor(ms / 1000);
    var totalHours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;
    return {
      hours: rafflePadTimerUnit(totalHours),
      minutes: rafflePadTimerUnit(minutes),
      seconds: rafflePadTimerUnit(seconds),
    };
  }

  function activeRaffleCountdownAria(parts) {
    return (
      "До окончания " +
      String(parts.hours || "00") +
      " часов " +
      String(parts.minutes || "00") +
      " минут " +
      String(parts.seconds || "00") +
      " секунд"
    );
  }

  function activeRaffleCountdownHtml(endDate, endMs) {
    var parts = activeRaffleCountdownParts(endDate);
    return (
      '<span class="raffles-active-chooser__fact raffles-active-chooser__fact--timer raffles-active-chooser__fact--countdown" data-raffle-active-countdown="' +
      escapeHtml(endMs || 0) +
      '" aria-label="' +
      escapeHtml(activeRaffleCountdownAria(parts)) +
      '">' +
      '<span class="raffles-active-chooser__countdown-label">До окончания</span>' +
      '<span class="raffles-active-chooser__countdown-digits" aria-hidden="true">' +
      '<span data-raffle-countdown-hours>' +
      escapeHtml(parts.hours) +
      "</span>" +
      '<span class="raffles-active-chooser__countdown-separator">:</span>' +
      '<span data-raffle-countdown-minutes>' +
      escapeHtml(parts.minutes) +
      "</span>" +
      '<span class="raffles-active-chooser__countdown-separator">:</span>' +
      '<span data-raffle-countdown-seconds>' +
      escapeHtml(parts.seconds) +
      "</span>" +
      "</span>" +
      '<span class="raffles-active-chooser__countdown-units" aria-hidden="true">' +
      "<span>Часов</span><span>Минут</span><span>Секунд</span>" +
      "</span>" +
      "</span>"
    );
  }

  function activeRaffleResultTimeFactHtml(raffle) {
    var text = activeRaffleResultsTimeText(raffle);
    if (!text) return "";
    return (
      '<span class="raffles-active-chooser__fact raffles-active-chooser__fact--result-time">' +
      '<span class="raffles-active-chooser__fact-icon" aria-hidden="true">◴</span>' +
      '<span class="raffles-active-chooser__fact-label">Итоги</span>' +
      '<span class="raffles-active-chooser__fact-value">' +
      escapeHtml(text.replace(/^Итоги\s+в\s+/i, "")) +
      "</span>" +
      "</span>"
    );
  }

  function activeRaffleResultBatchesHtml(raffle) {
    var batches = Array.isArray(raffle && raffle.resultBatches) ? raffle.resultBatches : [];
    if (!batches.length) return "";
    return (
      '<span class="raffles-active-chooser__batch-timers" aria-label="Таймеры итогов">' +
      batches.map(function (batch) {
        var endDate = batch && batch.endDate ? new Date(batch.endDate) : null;
        var endMs = endDate && !isNaN(endDate.getTime()) ? endDate.getTime() : 0;
        var parts = activeRaffleCountdownParts(endDate);
        var timeText = String(batch && batch.time || "").trim();
        var label = String(batch && batch.label || "Итоги").trim();
        return (
          '<span class="raffles-active-chooser__batch-timer" data-raffle-active-batch-countdown="' +
          escapeHtml(endMs || 0) +
          '">' +
          '<span class="raffles-active-chooser__batch-label">' +
          escapeHtml(label) +
          "</span>" +
          '<span class="raffles-active-chooser__batch-time">' +
          escapeHtml(timeText ? timeText + " МСК" : "Итоги") +
          "</span>" +
          '<span class="raffles-active-chooser__batch-digits">' +
          '<span data-raffle-batch-hours>' +
          escapeHtml(parts.hours) +
          "</span>:<span data-raffle-batch-minutes>" +
          escapeHtml(parts.minutes) +
          "</span>:<span data-raffle-batch-seconds>" +
          escapeHtml(parts.seconds) +
          "</span>" +
          "</span>" +
          "</span>"
        );
      }).join("") +
      "</span>"
    );
  }

  function activeRaffleInfoSummaryHtml(raffle) {
    return (
      '<span class="raffles-active-chooser__info-copy">' +
      '<span>' +
      escapeHtml("Инфо") +
      "</span>" +
      "</span>"
    );
  }

  function activeRaffleJoinCtaHtml(raffle, id, endDate) {
    if (!raffle || raffle.status !== "active") return "";
    var raffleIds = collectRaffleIdentityIds();
    var iAmIn = activeRaffleParticipantIn(raffle, raffleIds);
    var needsLogin =
      typeof rafflesViewerNeedsLoginForParticipation === "function"
        ? rafflesViewerNeedsLoginForParticipation()
        : rafflesViewerIsGuestOnly();
    var adminTicketEntry = typeof raffleUsesAdminTicketEntry === "function" && raffleUsesAdminTicketEntry(raffle);
    var pastEnd = !!(endDate && endDate <= new Date());
    var action = iAmIn ? "leave" : needsLogin ? "login" : "join";
    var label = iAmIn ? "Отменить участие" : needsLogin ? "Войти" : "Участвовать";
    var classes = "raffles-active-chooser__cta";
    if (iAmIn) classes += " raffles-active-chooser__cta--joined";
    if (adminTicketEntry || pastEnd) classes += " raffles-active-chooser__cta--locked";
    if (adminTicketEntry) {
      action = "locked";
      label = "Участников добавляет админ";
    } else if (pastEnd) {
      action = "locked";
      label = "Розыгрыш завершен";
    }
    return (
      '<button type="button" class="' +
      classes +
      '" data-raffle-active-action="' +
      escapeHtml(action) +
      '" data-raffle-active-id="' +
      escapeHtml(id) +
      '"' +
      (adminTicketEntry || pastEnd ? " disabled" : "") +
      ">" +
      escapeHtml(label) +
      "</button>"
    );
  }

  function activeRaffleMainTitleText(raffle) {
    if (activeRaffleIsTrainingCard(raffle)) return "Тренировка у Николая FishKopcheny стоимостью 5 000 ₽";
    var isCashPrize = typeof pokerRafflesIsCashPrize === "function" && pokerRafflesIsCashPrize(raffle);
    if (isCashPrize) {
      var detailedCashTitle = activeRaffleCashMainTitleText(raffle).replace(/\s+/g, " ").trim();
      if (detailedCashTitle) return detailedCashTitle;
      var cashTitle = activeRaffleChooserPrizeTitle(raffle).replace(/\s+/g, " ").trim();
      if (cashTitle) return cashTitle;
    }
    var explicitTitle = String(raffle && (raffle.cardTitle || raffle.card_title) || "").replace(/\s+/g, " ").trim();
    if (explicitTitle) return activeRaffleTitleWithTournament(raffle, explicitTitle);
    var ticketTitle = activeRaffleChooserPrizeTitle(raffle).replace(/\s+/g, " ").trim();
    if (ticketTitle) return activeRaffleTitleWithTournament(raffle, ticketTitle);
    return "Розыгрыш";
  }

  function activeRaffleTitleWithTournament(raffle, title) {
    var cleanTitle = String(title || "").replace(/\s+/g, " ").trim();
    if (!cleanTitle) return "";
    var groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
    var tournamentNames = [];
    groups.forEach(function (group) {
      var prize = String(group && group.prize || "").trim();
      var tournamentName =
        typeof pokerRafflesParsePrizeTournamentNameFromPrize === "function"
          ? pokerRafflesParsePrizeTournamentNameFromPrize(prize)
          : "";
      tournamentName = String(tournamentName || "").replace(/\s+/g, " ").trim();
      if (tournamentName && tournamentNames.indexOf(tournamentName) === -1) tournamentNames.push(tournamentName);
    });
    if (tournamentNames.length !== 1) return cleanTitle;
    var tournamentName = tournamentNames[0];
    if (cleanTitle.toLowerCase().indexOf(tournamentName.toLowerCase()) !== -1) return cleanTitle;
    return cleanTitle + " на " + tournamentName;
  }

  function activeRaffleSubtitleText(raffle) {
    if (activeRaffleIsTrainingCard(raffle)) return "Персональное занятие с практикующим тренером";
    var isCashPrize = typeof pokerRafflesIsCashPrize === "function" && pokerRafflesIsCashPrize(raffle);
    var hasResultBatches = Array.isArray(raffle && raffle.resultBatches) && raffle.resultBatches.length > 0;
    if (isCashPrize && hasResultBatches) return "";
    var subtitle = String(raffle && (raffle.cardSubtitle || raffle.card_subtitle) || "").replace(/\s+/g, " ").trim();
    if (subtitle) return subtitle;
    var groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
    if (isCashPrize) {
      var labels = activeRaffleBuyinChipLabels(raffle);
      return labels.length ? labels.join(" · ") : activeRafflePrizeLabel(raffle);
    }
    var labels = activeRaffleDetailPillLabels(raffle);
    if (labels.length === 1) return labels[0].replace(/\s*₽/g, "р");
    var total = activeRaffleWinnersCount(raffle);
    if (groups.length && total > 0) return total + " " + pokerRafflesTicketWord(total);
    return activeRafflePrizeLabel(raffle);
  }

  function activeRaffleCardTitleHtml(raffle) {
    var titleText = activeRaffleMainTitleText(raffle);
    var subtitleText = activeRaffleSubtitleText(raffle);
    if (subtitleText && titleText && subtitleText.toLowerCase() === titleText.toLowerCase()) {
      subtitleText = "";
    }
    var trainingCard = activeRaffleIsTrainingCard(raffle);
    var titleHtml = trainingCard
      ? '<button type="button" class="raffles-active-chooser__training-profile" data-raffle-training-profile="FishKopcheny"><span class="raffles-active-chooser__training-profile-copy"><span>Тренировка у</span><strong>Николая FishKopcheny</strong><small>Стоимость — 5 000 ₽</small></span></button>'
      : escapeHtml(titleText);
    var titleClass = "raffles-active-chooser__main-title";
    var cashMatch = titleText.match(/^(.+?)\s+(по\s+.+?\s+на\s+кеш(?:\s+\d+\s*\/\s*\d+)?)$/i) ||
      titleText.match(/^(.+?)\s+(на\s+кеш(?:\s+\d+\s*\/\s*\d+)?)$/i);
    if (cashMatch && cashMatch[1] && cashMatch[2]) {
      titleClass += " raffles-active-chooser__main-title--cash";
      titleHtml =
        '<span class="raffles-active-chooser__main-title-line">' +
        escapeHtml(cashMatch[1]) +
        "</span>" +
        '<span class="raffles-active-chooser__main-title-accent">' +
        escapeHtml(cashMatch[2]) +
        "</span>";
    }
    return (
      '<span class="raffles-active-chooser__title-block">' +
      '<span class="' +
      titleClass +
      '">' +
      titleHtml +
      "</span>" +
      (subtitleText
        ? '<span class="raffles-active-chooser__subtitle">' +
          escapeHtml(subtitleText) +
          "</span>"
        : "") +
      "</span>"
    );
  }

  function activeRaffleSpecificStartParam(id) {
    var rawId = String(id || "").trim();
    if (!rawId) return "raffles";
    if (typeof window !== "undefined" && typeof window.pokerBuildRaffleActiveStartParam === "function") {
      return window.pokerBuildRaffleActiveStartParam(rawId);
    }
    return "r_" + raffleActiveShortCode(rawId);
  }

  function activeRaffleSpecificShareLink(id) {
    var startParam = activeRaffleSpecificStartParam(id);
    if (typeof window !== "undefined" && typeof window.pokerBuildRaffleShareLink === "function") {
      return window.pokerBuildRaffleShareLink(startParam);
    }
    if (typeof buildMiniAppStartLink === "function") return buildMiniAppStartLink(startParam);
    return "";
  }

  function copyRaffleActiveText(text) {
    return new Promise(function (resolve) {
      var value = text != null ? String(text) : "";
      if (!value) {
        resolve(false);
        return;
      }
      function copyWithFallback() {
        var input = null;
        try {
          input = document.createElement("textarea");
          input.value = value;
          input.setAttribute("readonly", "readonly");
          input.style.position = "fixed";
          input.style.left = "-9999px";
          input.style.top = "0";
          document.body.appendChild(input);
          input.focus();
          input.select();
          input.setSelectionRange(0, input.value.length);
          var ok = typeof document.execCommand === "function" && document.execCommand("copy");
          if (input.parentNode) input.parentNode.removeChild(input);
          resolve(!!ok);
        } catch (e) {
          if (input && input.parentNode) input.parentNode.removeChild(input);
          resolve(false);
        }
      }
      if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        navigator.clipboard.writeText(value).then(function () {
          resolve(true);
        }).catch(copyWithFallback);
        return;
      }
      copyWithFallback();
    });
  }

  function handleRafflesActiveChooserCopy(copyBtn) {
    if (!copyBtn) return;
    if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
    var id = String(copyBtn.getAttribute("data-raffle-active-copy-id") || "").trim();
    var link = String(copyBtn.getAttribute("data-raffle-active-copy-link") || "").trim() || activeRaffleSpecificShareLink(id);
    var originalText = copyBtn.dataset.copyDefaultText || copyBtn.textContent || "Скопировать ссылку";
    copyBtn.dataset.copyDefaultText = originalText;
    copyRaffleActiveText(link).then(function (copied) {
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (copied) {
        copyBtn.classList.add("raffles-active-chooser__copy-btn--copied");
        copyBtn.textContent = "Готово";
        copyBtn.setAttribute("aria-label", "Ссылка на этот розыгрыш скопирована");
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("raffle_active_card_copy");
        if (handleRafflesActiveChooserCopy.timer) clearTimeout(handleRafflesActiveChooserCopy.timer);
        handleRafflesActiveChooserCopy.timer = setTimeout(function () {
          copyBtn.classList.remove("raffles-active-chooser__copy-btn--copied");
          copyBtn.textContent = copyBtn.dataset.copyDefaultText || "Скопировать ссылку";
          copyBtn.setAttribute("aria-label", "Скопировать ссылку на этот розыгрыш");
          handleRafflesActiveChooserCopy.timer = null;
        }, 1800);
        return;
      }
      if (tg && tg.showAlert) tg.showAlert("Ссылка: " + link);
      else alert("Ссылка: " + link);
    });
  }

  function activeRafflePrizePanelHtml(raffle, id, endDate, totalPrize, topPillsHtml) {
    var amount = Math.max(0, parseInt(totalPrize || getRaffleTotalPrize(raffle), 10) || 0);
    var shareLink = activeRaffleSpecificShareLink(id);
    var trainingCard = activeRaffleIsTrainingCard(raffle);
    return (
      '<span class="raffles-active-chooser__prize-panel">' +
      (topPillsHtml || "") +
      '<span class="raffles-active-chooser__prize-kicker">' + (trainingCard ? "Приз" : "Призовой фонд") + "</span>" +
      '<span class="raffles-active-chooser__prize-amount">' +
      (trainingCard
        ? '<span class="raffles-active-chooser__training-prize"><strong>1 час</strong><span>с Николаем</span><small>Стоимость 5 000 ₽</small></span>'
        : escapeHtml(amount > 0 ? formatRaffleSum(amount) : "Приз")) +
      "</span>" +
      activeRaffleJoinCtaHtml(raffle, id, endDate) +
      '<button type="button" class="raffles-active-chooser__prize-info-btn" data-raffle-active-info-id="' +
      escapeHtml(id) +
      '" aria-haspopup="dialog" aria-controls="raffleActiveInfoModal">ИНФО</button>' +
      '<button type="button" class="raffles-active-chooser__copy-btn" data-raffle-active-copy-id="' +
      escapeHtml(id) +
      '" data-raffle-active-copy-link="' +
      escapeHtml(shareLink) +
      '" aria-label="Скопировать ссылку на этот розыгрыш">Скопировать ссылку</button>' +
      "</span>"
    );
  }

  function activeRaffleCashTitleHtml(raffle, totalPrize) {
    var title = activeRaffleShortTitle(raffle).replace(/\s+/g, " ").trim();
    var amountText = formatRaffleSum(totalPrize || getRaffleTotalPrize(raffle));
    var lineOne = title || "Розыгрыш";
    var lineTwo = amountText;
    var cashTitle = lineOne.match(/^(.+?)\s+на\s+кеш$/i);
    if (cashTitle && cashTitle[1]) {
      lineOne = cashTitle[1].trim();
      lineTwo = "на кеш " + amountText;
    }
    return (
      '<span class="raffles-active-chooser__title-line">' +
      escapeHtml(lineOne) +
      "</span>" +
      '<span class="raffles-active-chooser__title-line raffles-active-chooser__title-line--amount">' +
      escapeHtml(lineTwo) +
      "</span>"
    );
  }

  function activeRaffleGuaranteeText(raffle) {
    var guarantee = String(raffle && (raffle.promoGuarantee || raffle.promo_guarantee || raffle.guarantee) || "").trim();
    if (guarantee) return "Гарантия " + guarantee;
    var text = String(raffle && (raffle.title || "") || "");
    var groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
    groups.forEach(function (group) {
      text += " " + String(group && group.prize || "");
    });
    var m = text.match(/гаранти[яиейю]\s+(\d[\d\s\u00a0\u202f]*(?:[.,]\d+)?)\s*(?:₽|р|руб)/i);
    return m && m[1] ? "Гарантия " + m[1].replace(/[\u00a0\u202f]/g, " ").trim() + "р" : "";
  }

  function activeRaffleParticipantIn(raffle, raffleIds) {
    var ids = Array.isArray(raffleIds) ? raffleIds : [];
    if (!ids.length || !raffle || !Array.isArray(raffle.participants)) return false;
    return raffle.participants.some(function (p) {
      var uid = String(p && p.userId != null ? p.userId : "").trim();
      return uid && ids.indexOf(uid) !== -1;
    });
  }

  function updateRafflesActiveChooserTimers() {
    if (!rafflesActiveChooser) return;
    var timers = rafflesActiveChooser.querySelectorAll("[data-raffle-active-timer]");
    timers.forEach(function (node) {
      var ms = parseInt(String(node.getAttribute("data-raffle-active-timer") || ""), 10);
      var end = Number.isFinite(ms) && ms > 0 ? new Date(ms) : null;
      node.textContent = end ? (formatRaffleTimerValue(end) || "Завершён") : "—";
    });
    var countdowns = rafflesActiveChooser.querySelectorAll("[data-raffle-active-countdown]");
    countdowns.forEach(function (node) {
      var ms = parseInt(String(node.getAttribute("data-raffle-active-countdown") || ""), 10);
      var end = Number.isFinite(ms) && ms > 0 ? new Date(ms) : null;
      var parts = activeRaffleCountdownParts(end);
      var hours = node.querySelector("[data-raffle-countdown-hours]");
      var minutes = node.querySelector("[data-raffle-countdown-minutes]");
      var seconds = node.querySelector("[data-raffle-countdown-seconds]");
      if (hours) hours.textContent = parts.hours;
      if (minutes) minutes.textContent = parts.minutes;
      if (seconds) seconds.textContent = parts.seconds;
      node.setAttribute("aria-label", activeRaffleCountdownAria(parts));
    });
    var batchCountdowns = rafflesActiveChooser.querySelectorAll("[data-raffle-active-batch-countdown]");
    batchCountdowns.forEach(function (node) {
      var ms = parseInt(String(node.getAttribute("data-raffle-active-batch-countdown") || ""), 10);
      var end = Number.isFinite(ms) && ms > 0 ? new Date(ms) : null;
      var parts = activeRaffleCountdownParts(end);
      var hours = node.querySelector("[data-raffle-batch-hours]");
      var minutes = node.querySelector("[data-raffle-batch-minutes]");
      var seconds = node.querySelector("[data-raffle-batch-seconds]");
      if (hours) hours.textContent = parts.hours;
      if (minutes) minutes.textContent = parts.minutes;
      if (seconds) seconds.textContent = parts.seconds;
    });
  }

  function ensureRafflesActiveChooserTimer() {
    if (rafflesActiveChooserTimerInterval) return;
    rafflesActiveChooserTimerInterval = setInterval(function () {
      if (typeof document !== "undefined" && (
        document.hidden || !document.querySelector('[data-view="raffles"].view--active')
      )) return;
      updateRafflesActiveChooserTimers();
    }, 1000);
  }

  function stopRafflesActiveChooserTimer() {
    if (!rafflesActiveChooserTimerInterval) return;
    clearInterval(rafflesActiveChooserTimerInterval);
    rafflesActiveChooserTimerInterval = null;
  }

  function openRafflesReferralPromo() {
    if (typeof window !== "undefined" && typeof window.openClubReferralsModal === "function") {
      window.openClubReferralsModal({
        tab: "invited",
        from: "raffles",
        returnToRaffles: true,
      });
      return;
    }
    if (typeof window !== "undefined" && typeof window.pokerOpenClubReferralsModal === "function") {
      window.pokerOpenClubReferralsModal({
        tab: "invited",
        from: "raffles",
        returnToRaffles: true,
      });
      return;
    }
    var fallbackBtn = document.getElementById("clubReferralsOpenBtn");
    if (fallbackBtn && typeof fallbackBtn.click === "function") {
      fallbackBtn.click();
      return;
    }
    if (typeof setView === "function") setView("profile");
  }

  function renderRafflesReferralPromoCard() {
    var selected = String(rafflesFocusedActiveId || "") === RAFFLES_REFERRAL_PROMO_ID;
    return (
      '<div class="raffles-active-chooser__item raffles-active-chooser__item--referrals' +
      (selected ? " raffles-active-chooser__item--active" : "") +
      '" role="button" tabindex="0" data-raffle-active-id="' +
      escapeHtml(RAFFLES_REFERRAL_PROMO_ID) +
      '" aria-selected="' +
      (selected ? "true" : "false") +
      '">' +
        '<span class="raffles-active-chooser__head">' +
          '<span class="raffles-active-chooser__badge raffles-active-chooser__badge--referrals">За приглашенных</span>' +
          '<span class="raffles-active-chooser__results-time">До 15 июля</span>' +
        "</span>" +
        '<span class="raffles-active-chooser__body">' +
          '<span class="raffles-active-chooser__hero-title raffles-active-chooser__hero-title--referrals">' +
            '<span class="raffles-active-chooser__hero-line raffles-active-chooser__hero-line--count">Розыгрыш</span>' +
            '<span class="raffles-active-chooser__hero-line raffles-active-chooser__hero-line--kind">за приглашенных</span>' +
            '<span class="raffles-active-chooser__hero-line raffles-active-chooser__hero-line--amount">Билет 10 000 ₽</span>' +
          "</span>" +
          '<span class="raffles-active-chooser__detail-pills raffles-active-chooser__detail-pills--referrals">' +
            '<span class="raffles-active-chooser__detail-pill">Нокаут</span>' +
            '<span class="raffles-active-chooser__detail-pill">Гарантия 1 000 000 ₽</span>' +
          "</span>" +
        "</span>" +
        '<span class="raffles-active-chooser__facts raffles-active-chooser__facts--referrals">' +
          '<span class="raffles-active-chooser__fact raffles-active-chooser__fact--referrals">Победит тот, кто приведет больше новых игроков.</span>' +
        "</span>" +
        '<button type="button" class="raffles-active-chooser__cta raffles-active-chooser__cta--referrals" data-raffle-referrals-open="1">Открыть</button>' +
        '<span class="raffles-active-chooser__info-toggle raffles-active-chooser__info-toggle--referrals" aria-hidden="true">' +
          '<span class="raffles-active-chooser__info-icon" aria-hidden="true">i</span>' +
          '<span class="raffles-active-chooser__info-copy"><span>Откроется модалка</span><span>Можно вернуться назад</span></span>' +
        "</span>" +
      "</div>"
    );
  }

  function formatRaffleHeroCount(value) {
    var n = Math.max(0, Math.round(parseFloat(value) || 0));
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f");
  }

  function raffleHeroPersonKey(row) {
    if (!row) return "";
    var accountId = String(row.accountId || row.dtId || "").trim();
    if (accountId) return "account:" + accountId;
    var userId = String(row.userId != null ? row.userId : "").trim();
    if (userId) return "user:" + userId;
    var p21Id = String(row.p21Id != null ? row.p21Id : "").trim();
    if (p21Id) return "p21:" + p21Id;
    var name = String(row.name || row.pokerPlusNickname || "").trim().toLowerCase();
    return name ? "name:" + name : "";
  }

  function updateRafflesHeroStats(allRaffles, completedRaffles, completedSumRub, summary) {
    var all = Array.isArray(allRaffles) ? allRaffles : [];
    var completedList = Array.isArray(completedRaffles) ? completedRaffles : [];
    var summaryData = summary && typeof summary === "object" ? summary : {};
    var participants = {};
    var winners = {};
    all.forEach(function (raffle) {
      (Array.isArray(raffle && raffle.participants) ? raffle.participants : []).forEach(function (row) {
        var key = raffleHeroPersonKey(row);
        if (key) participants[key] = true;
      });
      (Array.isArray(raffle && raffle.winners) ? raffle.winners : []).forEach(function (row) {
        var key = raffleHeroPersonKey(row);
        if (key) participants[key] = true;
      });
    });
    completedList.forEach(function (raffle) {
      (Array.isArray(raffle && raffle.winners) ? raffle.winners : []).forEach(function (row) {
        var key = raffleHeroPersonKey(row);
        if (key) winners[key] = true;
      });
    });
    var summaryParticipants = parseInt(summaryData.uniqueParticipantsCount, 10);
    var summaryWinners = parseInt(summaryData.uniqueWinnersCount, 10);
    var summaryCompletedCount = parseInt(summaryData.completedCount, 10);
    var summaryCompletedSum = parseFloat(summaryData.completedPrizeSumRub);
    if (rafflesHeroDoneCount) rafflesHeroDoneCount.textContent = formatRaffleHeroCount(isFinite(summaryCompletedCount) ? summaryCompletedCount : completedList.length);
    if (rafflesHeroPrizeSum) rafflesHeroPrizeSum.textContent = formatRaffleSum(isFinite(summaryCompletedSum) ? summaryCompletedSum : (completedSumRub || 0));
    if (rafflesHeroUniqueParticipants) rafflesHeroUniqueParticipants.textContent = formatRaffleHeroCount(isFinite(summaryParticipants) ? summaryParticipants : Object.keys(participants).length);
    if (rafflesHeroWinnersCount) rafflesHeroWinnersCount.textContent = formatRaffleHeroCount(isFinite(summaryWinners) ? summaryWinners : Object.keys(winners).length);
  }

  function rafflesSummaryNumber(summary, key) {
    var n = summary && typeof summary === "object" ? parseFloat(summary[key]) : NaN;
    return isFinite(n) ? n : null;
  }

  function parseRaffleActionResponse(r) {
    return r
      .json()
      .then(function (data) {
        if (data && typeof data === "object") return data;
        return { ok: false, error: "Пустой ответ сервера", code: "EMPTY_RESPONSE" };
      })
      .catch(function () {
        return {
          ok: false,
          error:
            "Сервер вернул некорректный ответ" +
            (r && r.status ? " (HTTP " + r.status + "). Перезайдите в мини-приложение и попробуйте снова через 10–30 секунд." : ". Перезайдите в мини-приложение и попробуйте снова через 10–30 секунд."),
          code: "INVALID_SERVER_RESPONSE",
        };
      });
  }

  function replaceRaffleInArray(list, raffle) {
    if (!Array.isArray(list) || !raffle || !raffle.id) return false;
    var targetId = String(raffle.id);
    for (var i = 0; i < list.length; i += 1) {
      if (list[i] && String(list[i].id || "") === targetId) {
        list[i] = raffle;
        return true;
      }
    }
    return false;
  }

  function mergeActiveRaffleState(raffle) {
    if (!raffle || !raffle.id) return false;
    var targetId = String(raffle.id);
    var touched = replaceRaffleInArray(rafflesActiveBroadcastList, raffle);
    if (!touched && raffle.status === "active") {
      rafflesActiveBroadcastList.push(raffle);
      touched = true;
    }
    if (currentRaffleData && String(currentRaffleData.id || "") === targetId) currentRaffleData = raffle;
    var cache = typeof window !== "undefined" ? window._rafflesCache : null;
    if (cache && cache.data) {
      touched = replaceRaffleInArray(cache.data.raffles, raffle) || touched;
      touched = replaceRaffleInArray(cache.data.activeRaffles, raffle) || touched;
      if (cache.data.activeRaffle && String(cache.data.activeRaffle.id || "") === targetId) {
        cache.data.activeRaffle = raffle;
        touched = true;
      }
      cache.time = Date.now();
    }
    return touched;
  }

  function refreshActiveChooserAfterAction(raffle) {
    if (raffle && raffle.id) mergeActiveRaffleState(raffle);
    var cache = typeof window !== "undefined" ? window._rafflesCache : null;
    if (cache && cache.data && cache.data.ok) {
      applyRafflesData(cache.data, false);
      return;
    }
    if (raffle && currentRaffleId && String(raffle.id || "") === String(currentRaffleId || "")) renderRaffle(raffle);
    renderRafflesActiveChooser(rafflesActiveBroadcastList, currentRaffleId || rafflesFocusedActiveId || (raffle && raffle.id) || "");
    syncRafflesActiveInfoDetailsMount();
  }

  function restoreActiveChooserActionButton(btn, label) {
    if (!btn || !btn.isConnected) return;
    btn.disabled = false;
    btn.removeAttribute("aria-busy");
    if (label) btn.textContent = label;
  }

  function showActiveChooserActionError(data, fallback) {
    var err = (data && data.error) || fallback || "Ошибка";
    var isRequirementError =
      data &&
      (data.code === "CHANNEL_REQUIRED" ||
        data.code === "BOT_REQUIRED" ||
        data.code === "SUBSCRIPTION_REQUIRED" ||
        data.code === "TELEGRAM_REQUIRED");
    var isJoinInlineError =
      data &&
      (data.code === "P21_REQUIRED" || data.code === "RAFFLE_LEVEL_REQUIRED");
    if (isRequirementError) {
      showRaffleFeedback(err, "err", {
        botUrl: data.botUrl,
        channelUrl: data.channelUrl,
        openUrl: data.openUrl,
        missing: data.missing,
        missingRequirements: data.missingRequirements,
        code: data.code,
        sticky: true,
      });
    } else if (isJoinInlineError) {
      showRaffleJoinError(err);
    } else {
      showRaffleFeedback(err, "err");
    }
    if (data && data.code === "P21_REQUIRED") {
      if (typeof setView === "function") setView("profile");
    } else if (isRequirementError) {
      if (tg && tg.showAlert) tg.showAlert(err);
    } else if (data && data.code === "AUTH_INVALID") {
      showRaffleFeedback(err || "Сессия входа не подтвердилась. Войдите ещё раз.", "err", { sticky: true });
      if (tg && tg.showAlert) tg.showAlert(err || "Сессия входа не подтвердилась. Войдите ещё раз.");
      if (typeof window.__pokerOpenSharedAccountAuthFlow === "function") window.__pokerOpenSharedAccountAuthFlow();
    } else if (data && data.code === "RAFFLE_LOGIN_REQUIRED") {
      if (tg && tg.showAlert) tg.showAlert(err || "Чтобы участвовать в розыгрышах, войдите в аккаунт.");
      else if (typeof alert === "function") alert(err || "Чтобы участвовать в розыгрышах, войдите в аккаунт.");
    } else if (data && (data.code === "SAME_IP" || data.code === "SAME_DEVICE")) {
      if (tg && tg.showAlert) tg.showAlert(err + " Если это ошибка, перезайдите в мини-приложение и повторите попытку.");
    } else if (data && data.code === "INVALID_SERVER_RESPONSE") {
      if (tg && tg.showAlert) tg.showAlert(err + " Если повторяется — напишите администратору.");
    } else if (tg && tg.showAlert) {
      tg.showAlert(err + " Попробуйте снова через 10–30 секунд. Если не поможет — перезайдите в мини-приложение.");
    } else if (typeof alert === "function") {
      alert(err);
    }
  }

  function handleRafflesActiveChooserAction(actionBtn) {
    if (!actionBtn) return;
    clearRaffleJoinError();
    var action = String(actionBtn.getAttribute("data-raffle-active-action") || "").trim();
    var raffleId = String(actionBtn.getAttribute("data-raffle-active-id") || "").trim();
    if (!raffleId) {
      var card = actionBtn.closest ? actionBtn.closest(".raffles-active-chooser__item[data-raffle-active-id]") : null;
      raffleId = card ? String(card.getAttribute("data-raffle-active-id") || "").trim() : "";
    }
    if (!raffleId) return;
    if (action === "login") {
      var loginBtn = document.getElementById("raffleGuestLoginBtn");
      if (loginBtn && typeof loginBtn.click === "function") loginBtn.click();
      else if (tg && tg.showAlert) tg.showAlert("Чтобы участвовать в розыгрышах, войдите в аккаунт.");
      else if (typeof alert === "function") alert("Чтобы участвовать в розыгрышах, войдите в аккаунт.");
      return;
    }
    if (action !== "join" && action !== "leave") return;
    if (action === "join" && rafflesViewerIsGuestOnly()) {
      if (tg && tg.showAlert) tg.showAlert("Чтобы участвовать в розыгрышах, войдите в аккаунт.");
      else if (typeof alert === "function") alert("Чтобы участвовать в розыгрышах, войдите в аккаунт.");
      return;
    }
    if (!base || !rafflesViewerApiReady()) {
      if (tg && tg.showAlert) tg.showAlert("Нет доступа к серверу. Проверьте сеть.");
      else if (typeof alert === "function") alert("Нет доступа к серверу. Проверьте сеть.");
      return;
    }
    var originalText = actionBtn.textContent;
    actionBtn.disabled = true;
    actionBtn.setAttribute("aria-busy", "true");
    actionBtn.textContent = action === "leave" ? "Отмена..." : "Отправка...";
    var body = { action: action, raffleId: raffleId };
    if (action === "join") body.deviceId = getRaffleDeviceId();
    fetch(base + "/api/raffles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerGuestOrAuthedPostBody(body)),
    })
      .then(parseRaffleActionResponse)
      .then(function (data) {
        if (data && data.ok) {
          syncRafflesViewerLevelFromResponse(data);
          if (action === "join" && !data.alreadyJoined && typeof pokerTrackAnalyticsEvent === "function") {
            pokerTrackAnalyticsEvent("raffle_joined", { name: String(raffleId), event_id: "evt_raffle_" + String(raffleId).replace(/[^a-zA-Z0-9_-]/g, "_") + "_" + (typeof getInstallationId === "function" ? getInstallationId() : "") });
          }
          if (data.raffle) refreshActiveChooserAfterAction(data.raffle);
          else {
            clearRafflesCache();
            loadRaffles(false, { skipCache: true, keepCurrentOnLoading: true });
          }
          clearRaffleJoinError();
          showRaffleFeedback(
            action === "leave"
              ? data.alreadyLeft
                ? "Вы не были в списке участников."
                : "Участие отменено."
              : data.alreadyJoined
                ? "Вы уже участвуете."
                : "Вы участвуете в розыгрыше.",
            "ok"
          );
        } else {
          restoreActiveChooserActionButton(actionBtn, originalText);
          showActiveChooserActionError(data, "Ошибка");
        }
      })
      .catch(function () {
        restoreActiveChooserActionButton(actionBtn, originalText);
        showRaffleFeedback(POKER_NET_ERR + " Попробуйте снова.", "err");
        if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR + " Перезайдите в мини-приложение и попробуйте снова.");
        else if (typeof alert === "function") alert(POKER_NET_ERR);
      });
  }

  function handleRafflesActiveChooserInfoToggle(infoBtn) {
    if (!infoBtn) return;
    var raffleId = String(infoBtn.getAttribute("data-raffle-active-info-id") || "").trim();
    if (!raffleId) return;
    rafflesActiveInfoOpenId = raffleId;
    focusRaffleAfterMutation(raffleId);
    var cache = typeof window !== "undefined" ? window._rafflesCache : null;
    if (cache && cache.data && cache.data.ok) {
      applyRafflesData(cache.data, false);
    } else if (rafflesActiveBroadcastList.length) {
      renderRafflesActiveChooser(rafflesActiveBroadcastList, raffleId);
      for (var i = 0; i < rafflesActiveBroadcastList.length; i++) {
        if (String(rafflesActiveBroadcastList[i] && rafflesActiveBroadcastList[i].id || "") === raffleId) {
          renderRaffle(rafflesActiveBroadcastList[i]);
          break;
        }
      }
      syncRafflesActiveInfoDetailsMount();
    } else {
      loadRaffles(false, { keepCurrentOnLoading: true });
    }
  }

  function renderRafflesActiveChooser(activeList, activeId) {
    if (!rafflesActiveChooser) return;
    var list = Array.isArray(activeList) ? activeList : [];
    var displayCount = list.length + 1;
    if (!displayCount) {
      rafflesActiveChooser.innerHTML = "";
      rafflesActiveChooser.classList.add("raffles-active-chooser--hidden");
      rafflesActiveChooser.hidden = true;
      stopRafflesActiveChooserTimer();
      return;
    }
    var selectedId = String(activeId || "");
    rafflesActiveChooser.hidden = false;
    rafflesActiveChooser.classList.remove("raffles-active-chooser--hidden");
    rafflesActiveChooser.classList.remove(
      "raffles-active-chooser--count-1",
      "raffles-active-chooser--count-2",
      "raffles-active-chooser--count-3"
    );
    if (displayCount <= 3) {
      rafflesActiveChooser.classList.add("raffles-active-chooser--count-" + displayCount);
    }
    rafflesActiveChooser.innerHTML =
      list
      .map(function (raffle, index) {
        var id = String((raffle && raffle.id) || "");
        var selected = selectedId && id === selectedId;
        var infoOpen = !!(id && rafflesActiveInfoOpenId === id);
        var isCashPrize = typeof pokerRafflesIsCashPrize === "function" && pokerRafflesIsCashPrize(raffle);
        var endDate = raffle && raffle.endDate ? new Date(raffle.endDate) : null;
        var endMs = endDate && !isNaN(endDate.getTime()) ? endDate.getTime() : 0;
        var totalPrize = getRaffleTotalPrize(raffle);
        var cardTheme = String(raffle && (raffle.cardTheme || raffle.card_theme) || "").trim().toLowerCase();
        var knockoutCard = activeRaffleIsKnockoutTicketCard(raffle);
        var trainingCard = activeRaffleIsTrainingCard(raffle);
        var participantCount = activeRaffleParticipantsCount(raffle);
        var participantWord = activeRaffleParticipantWord(participantCount);
        var resultsTimeText = activeRaffleResultsTimeText(raffle);
        var resultsTimePanelText = activeRaffleResultsTimePanelText(raffle);
        var hasResultBatches = Array.isArray(raffle && raffle.resultBatches) && raffle.resultBatches.length > 0;
        var moveHeadToPrize = isCashPrize || !knockoutCard;
        var badgeText = knockoutCard ? "Главный розыгрыш" : activeRaffleBadgeText(raffle);
        var prizePanelPillText = resultsTimePanelText || badgeText;
        var prizeTopPillsHtml = moveHeadToPrize && prizePanelPillText
          ? '<span class="raffles-active-chooser__prize-pills">' +
            '<span class="raffles-active-chooser__results-time raffles-active-chooser__results-time--panel">' +
            escapeHtml(prizePanelPillText) +
            "</span>" +
            "</span>"
          : "";
        var headHtml =
          moveHeadToPrize
            ? ""
            : '<span class="raffles-active-chooser__head">' +
              '<span class="raffles-active-chooser__badge' +
              (knockoutCard ? " raffles-active-chooser__badge--main" : "") +
              '">' +
              escapeHtml(badgeText) +
              "</span>" +
              (resultsTimeText
                ? '<span class="raffles-active-chooser__results-time">' +
                  escapeHtml(resultsTimeText) +
                  "</span>"
                : "") +
              "</span>";
        var titleHtml = activeRaffleCardTitleHtml(raffle);
        var detailPillsHtml = isCashPrize ? activeRaffleBuyinTilesHtml(raffle) : activeRaffleDetailPillsHtml(raffle);
        var resultTimeFactHtml = isCashPrize && hasResultBatches ? "" : activeRaffleResultTimeFactHtml(raffle);
        var participantsHtml =
          '<span class="raffles-active-chooser__fact raffles-active-chooser__fact--participants" aria-label="' +
          escapeHtml(participantCount + " " + participantWord) +
          '" style="--raffles-participants-fill: ' +
          escapeHtml(activeRaffleParticipantsScaleFill(participantCount)) +
          '%"><span class="raffles-active-chooser__participants-track" aria-hidden="true"><span></span></span><span class="raffles-active-chooser__participants-side"><span class="raffles-active-chooser__participants-count">' +
          escapeHtml(participantCount) +
          '</span><span class="raffles-active-chooser__participants-label">Участников</span><span class="raffles-active-chooser__participants-icon" aria-hidden="true">👥</span></span>' +
          "</span>";
        var timerHtml = isCashPrize && hasResultBatches ? "" : activeRaffleCountdownHtml(endDate, endMs);
        var accessHtml = activeRaffleAccessLevelHtml(raffle);
        var factsHtml = resultTimeFactHtml + timerHtml + participantsHtml + accessHtml;
        var prizePanelHtml = activeRafflePrizePanelHtml(
          raffle,
          id,
          endDate,
          totalPrize,
          prizeTopPillsHtml
        );
        var ticketRegistrationWarning = !isCashPrize && !trainingCard
          ? '<div class="raffles-ticket-registration-warning" role="note"><span><strong>Важно:</strong> если вы уже зарегистрированы в турнире, не участвуйте в розыгрыше билета на него. Второй билет выдать невозможно — не забирайте возможность у игроков, у которых билета ещё нет.</span><button type="button" class="raffles-ticket-registration-warning__rules" data-raffles-help-open>Все правила</button></div>'
          : "";
        var trainingLessonCta = trainingCard
          ? '<button type="button" class="raffles-active-chooser__training-lesson" data-raffle-training-lessons><span>Бесплатный видео-урок от Николая</span><strong aria-hidden="true">›</strong></button>'
          : "";
        return (
          '<div class="raffles-active-chooser__item' +
          (selected ? " raffles-active-chooser__item--active" : "") +
          (isCashPrize ? " raffles-active-chooser__item--cash" : " raffles-active-chooser__item--ticket") +
          (cardTheme === "knockout_ticket" ? " raffles-active-chooser__item--knockout" : "") +
          (trainingCard ? " raffles-active-chooser__item--training" : "") +
          '" role="button" tabindex="0" data-raffle-active-id="' +
          escapeHtml(id) +
          '" aria-selected="' +
          (selected ? "true" : "false") +
          '">' +
          '<span class="raffles-active-chooser__art" aria-hidden="true"><span></span></span>' +
          '<span class="raffles-active-chooser__body">' +
          '<span class="raffles-active-chooser__content">' +
          headHtml +
          titleHtml +
          detailPillsHtml +
          '<span class="raffles-active-chooser__facts raffles-active-chooser__facts--with-participants">' +
          factsHtml +
          "</span>" +
          "</span>" +
          prizePanelHtml +
          "</span>" +
          trainingLessonCta +
          '<button type="button" class="raffles-active-chooser__info-toggle' +
          (infoOpen ? " raffles-active-chooser__info-toggle--open" : "") +
          '" data-raffle-active-info-id="' +
          escapeHtml(id) +
          '" aria-expanded="' +
          (infoOpen ? "true" : "false") +
          '" aria-haspopup="dialog" aria-controls="raffleActiveInfoModal">' +
          '<span class="raffles-active-chooser__info-icon" aria-hidden="true">i</span>' +
          activeRaffleInfoSummaryHtml(raffle) +
          "</button>" +
          "</div>" +
          ticketRegistrationWarning
        );
      })
      .join("");
    updateRafflesActiveChooserTimers();
    if (list.length) ensureRafflesActiveChooserTimer();
    else stopRafflesActiveChooserTimer();
  }

  if (rafflesActiveChooser && rafflesActiveChooser.dataset.bound !== "1") {
    rafflesActiveChooser.dataset.bound = "1";
    rafflesActiveChooser.addEventListener("click", function (e) {
      var trainingLessons = e.target && e.target.closest ? e.target.closest("[data-raffle-training-lessons]") : null;
      if (trainingLessons && rafflesActiveChooser.contains(trainingLessons)) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof setView === "function") setView("video-lessons");
        return;
      }
      var trainingProfile = e.target && e.target.closest ? e.target.closest("[data-raffle-training-profile]") : null;
      if (trainingProfile && rafflesActiveChooser.contains(trainingProfile)) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof window.pokerOpenUnifiedPlayerProfileByRatingNick === "function") {
          window.pokerOpenUnifiedPlayerProfileByRatingNick("FishKopcheny", { season: "summer" });
        } else if (typeof window.pokerOpenChatUserModalSafe === "function") {
          window.pokerOpenChatUserModalSafe("371998", "FishKopcheny", "./assets/club-news-personal/fishkopcheny-coach-card.png");
        }
        return;
      }
      var helpBtn = e.target && e.target.closest ? e.target.closest("[data-raffles-help-open]") : null;
      if (helpBtn && rafflesActiveChooser.contains(helpBtn)) {
        e.preventDefault();
        e.stopPropagation();
        setRafflesHelpModalOpen(true);
        return;
      }
      var referralsBtn = e.target && e.target.closest ? e.target.closest("[data-raffle-referrals-open]") : null;
      if (referralsBtn && rafflesActiveChooser.contains(referralsBtn)) {
        e.preventDefault();
        e.stopPropagation();
        openRafflesReferralPromo();
        return;
      }
      var infoBtn = e.target && e.target.closest ? e.target.closest("[data-raffle-active-info-id]") : null;
      if (infoBtn && rafflesActiveChooser.contains(infoBtn)) {
        e.preventDefault();
        e.stopPropagation();
        handleRafflesActiveChooserInfoToggle(infoBtn);
        return;
      }
      var actionBtn = e.target && e.target.closest ? e.target.closest("[data-raffle-active-action]") : null;
      if (actionBtn && rafflesActiveChooser.contains(actionBtn)) {
        if (actionBtn.disabled) return;
        e.preventDefault();
        e.stopPropagation();
        handleRafflesActiveChooserAction(actionBtn);
        return;
      }
      var copyBtn = e.target && e.target.closest ? e.target.closest("[data-raffle-active-copy-id]") : null;
      if (copyBtn && rafflesActiveChooser.contains(copyBtn)) {
        e.preventDefault();
        e.stopPropagation();
        handleRafflesActiveChooserCopy(copyBtn);
        return;
      }
      var btn = e.target && e.target.closest ? e.target.closest(".raffles-active-chooser__item[data-raffle-active-id]") : null;
      if (!btn || !rafflesActiveChooser.contains(btn)) return;
      var id = String(btn.getAttribute("data-raffle-active-id") || "").trim();
      if (!id) return;
      focusRaffleAfterMutation(id);
      var cache = typeof window !== "undefined" ? window._rafflesCache : null;
      if (cache && cache.data && cache.data.ok) {
        applyRafflesData(cache.data, false);
      } else {
        loadRaffles(false, { keepCurrentOnLoading: true });
      }
    });
    rafflesActiveChooser.addEventListener("keydown", function (e) {
      var key = e && (e.key || e.code);
      if (key !== "Enter" && key !== " " && key !== "Spacebar") return;
      var referralsBtn = e.target && e.target.closest ? e.target.closest("[data-raffle-referrals-open]") : null;
      if (referralsBtn && rafflesActiveChooser.contains(referralsBtn)) {
        e.preventDefault();
        openRafflesReferralPromo();
        return;
      }
      var infoBtn = e.target && e.target.closest ? e.target.closest("[data-raffle-active-info-id]") : null;
      if (infoBtn && rafflesActiveChooser.contains(infoBtn)) return;
      var actionBtn = e.target && e.target.closest ? e.target.closest("[data-raffle-active-action]") : null;
      if (actionBtn && rafflesActiveChooser.contains(actionBtn)) return;
      var copyBtn = e.target && e.target.closest ? e.target.closest("[data-raffle-active-copy-id]") : null;
      if (copyBtn && rafflesActiveChooser.contains(copyBtn)) return;
      var btn = e.target && e.target.closest ? e.target.closest(".raffles-active-chooser__item[data-raffle-active-id]") : null;
      if (!btn || !rafflesActiveChooser.contains(btn)) return;
      e.preventDefault();
      if (typeof btn.click === "function") btn.click();
    });
  }

  if (raffleAdminTicketForm && raffleAdminTicketForm.dataset.bound !== "1") {
    raffleAdminTicketForm.dataset.bound = "1";
    raffleAdminTicketForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!rafflesIsAdmin || !currentRaffleId || !base) return;
      var p21Id = raffleAdminTicketP21Id ? raffleAdminTicketP21Id.value.trim() : "";
      var name = raffleAdminTicketName ? raffleAdminTicketName.value.trim() : "";
      var telegram = raffleAdminTicketTelegram ? raffleAdminTicketTelegram.value.trim() : "";
      var tickets = raffleAdminTicketCount ? parseInt(raffleAdminTicketCount.value, 10) || 1 : 1;
      tickets = Math.max(1, Math.min(1000, tickets));
      if (!p21Id && !name && !telegram) {
        if (tg && tg.showAlert) tg.showAlert("Укажите ID, имя или Telegram участника");
        else if (typeof alert === "function") alert("Укажите ID, имя или Telegram участника");
        return;
      }
      var submitBtn = raffleAdminTicketForm.querySelector("button[type='submit']");
      var prevText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Выдаём...";
      }
      fetch(base + "/api/raffles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          pokerGuestOrAuthedPostBody({
            action: "adminUpsertParticipant",
            raffleId: currentRaffleId,
            p21Id: p21Id,
            name: name,
            telegramUsername: telegram,
            ticketCount: tickets,
          })
        ),
      })
        .then(parseRaffleActionResponse)
        .then(function (data) {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = prevText || "Выдать билеты";
          }
          if (data && data.ok && data.raffle) {
            refreshActiveChooserAfterAction(data.raffle);
            renderRaffle(data.raffle);
            if (raffleAdminTicketP21Id) raffleAdminTicketP21Id.value = "";
            if (raffleAdminTicketName) raffleAdminTicketName.value = "";
            if (raffleAdminTicketTelegram) raffleAdminTicketTelegram.value = "";
            if (raffleAdminTicketCount) raffleAdminTicketCount.value = "1";
            showRaffleFeedback(data.updated ? "Билеты участнику добавлены." : "Билеты участнику выданы.", "ok");
            return;
          }
          var err = (data && data.error) || "Не удалось выдать билеты";
          showRaffleFeedback(err, "err");
          if (tg && tg.showAlert) tg.showAlert(err);
        })
        .catch(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = prevText || "Выдать билеты";
          }
          showRaffleFeedback(POKER_NET_ERR, "err");
          if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        });
    });
  }

  function handleRaffleParticipantRemove(btn) {
    if (!btn || !rafflesIsAdmin || !currentRaffleId || !base) return;
    var payload = {
      action: "adminRemoveParticipant",
      raffleId: currentRaffleId,
      userId: btn.getAttribute("data-user-id") || "",
      accountId: btn.getAttribute("data-account-id") || "",
      p21Id: btn.getAttribute("data-p21-id") || "",
      telegramUsername: btn.getAttribute("data-telegram-username") || "",
      name: btn.getAttribute("data-participant-name") || "",
    };
    if (!payload.userId && !payload.accountId && !payload.p21Id && !payload.telegramUsername && !payload.name) {
      var missingMsg = "Не удалось определить участника для удаления";
      showRaffleFeedback(missingMsg, "err");
      if (tg && tg.showAlert) tg.showAlert(missingMsg);
      return;
    }
    var label = (btn.getAttribute("data-participant-label") || "").trim() || "участника";
    confirmRaffleAdminAction("Удалить " + label + " из розыгрыша?", function () {
      var prevText = btn.textContent;
      btn.disabled = true;
      btn.textContent = "…";
      fetch(base + "/api/raffles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokerGuestOrAuthedPostBody(payload)),
      })
        .then(parseRaffleActionResponse)
        .then(function (data) {
          btn.disabled = false;
          btn.textContent = prevText || "×";
          if (data && data.ok && data.raffle) {
            refreshActiveChooserAfterAction(data.raffle);
            renderRaffle(data.raffle);
            showRaffleFeedback(data.alreadyRemoved ? "Участника уже нет в списке." : "Участник удалён из розыгрыша.", "ok");
            return;
          }
          var err = (data && data.error) || "Не удалось удалить участника";
          showRaffleFeedback(err, "err");
          if (tg && tg.showAlert) tg.showAlert(err);
        })
        .catch(function () {
          btn.disabled = false;
          btn.textContent = prevText || "×";
          showRaffleFeedback(POKER_NET_ERR, "err");
          if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        });
    });
  }

  if (raffleParticipants && raffleParticipants.dataset.removeBound !== "1") {
    raffleParticipants.dataset.removeBound = "1";
    raffleParticipants.addEventListener("click", function (e) {
      var btn = e.target && e.target.closest ? e.target.closest("[data-raffle-participant-remove]") : null;
      if (!btn || !raffleParticipants.contains(btn)) return;
      e.preventDefault();
      e.stopPropagation();
      handleRaffleParticipantRemove(btn);
    });
  }

  function normalizePendingCompletedRaffleId(raw) {
    var rawText = String(raw || "").trim();
    if (!rawText || rawText === "raffles") return "";
    if (typeof window !== "undefined" && typeof window.pokerParseRaffleCompletedStartParam === "function") {
      var parsed = window.pokerParseRaffleCompletedStartParam(rawText);
      if (parsed) return parsed;
    }
    if (typeof window !== "undefined" && typeof window.pokerNormalizeRaffleCompletedId === "function") {
      return window.pokerNormalizeRaffleCompletedId(rawText);
    }
    return rawText.replace(/[^A-Za-z0-9_-]/g, "_").slice(0, 72);
  }

  function readPendingCompletedRaffleId() {
    var raw = "";
    try {
      raw = typeof window !== "undefined" ? window.__pendingRaffleCompletedId || "" : "";
    } catch (ePendingRead) {}
    return normalizePendingCompletedRaffleId(raw);
  }

  function normalizePendingActiveRaffleId(raw) {
    var rawText = String(raw || "").trim();
    if (!rawText || rawText === "raffles") return "";
    if (typeof window !== "undefined" && typeof window.pokerParseRaffleActiveStartParam === "function") {
      var parsed = window.pokerParseRaffleActiveStartParam(rawText);
      if (parsed) return parsed;
    }
    if (typeof window !== "undefined" && typeof window.pokerNormalizeRaffleActiveId === "function") {
      return window.pokerNormalizeRaffleActiveId(rawText);
    }
    return rawText.replace(/[^A-Za-z0-9_-]/g, "_").slice(0, 72);
  }

  function readPendingActiveRaffleId() {
    var raw = "";
    try {
      raw = typeof window !== "undefined" ? window.__pendingRaffleActiveId || "" : "";
    } catch (ePendingActiveRead) {}
    return normalizePendingActiveRaffleId(raw);
  }

  function raffleActiveShortCode(raffleOrId) {
    var raw = raffleOrId && typeof raffleOrId === "object" ? raffleOrId.id || raffleOrId.raffleId || raffleOrId.raffle_id : raffleOrId;
    if (typeof window !== "undefined" && typeof window.pokerRaffleActiveShortCode === "function") {
      return window.pokerRaffleActiveShortCode(raw);
    }
    var id = String(raw || "").trim().replace(/[^A-Za-z0-9_-]/g, "_").slice(0, 72);
    var m = id.match(/^raffle_\d+_([A-Za-z0-9_-]+)$/);
    return m && m[1] ? m[1] : id;
  }

  function raffleIdMatchesTarget(raffle, targetId) {
    var target = normalizePendingActiveRaffleId(targetId);
    if (!raffle || !target) return false;
    var id = String(raffle.id || "").trim();
    var n = parseInt(String(raffle.shareNumber || raffle.activeShareNumber || raffle.active_number || raffle.activeNumber || ""), 10);
    if (/^\d+$/.test(target) && Number.isFinite(n) && n > 0 && String(n) === target) return true;
    return id === target || raffleActiveShortCode(id) === target;
  }

  function completedRaffleCardSelector(raffleId) {
    var id = normalizePendingCompletedRaffleId(raffleId);
    if (!id) return "";
    var escaped = id;
    try {
      if (typeof CSS !== "undefined" && CSS.escape) escaped = CSS.escape(id);
      else escaped = id.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
    } catch (eEsc) {
      escaped = id.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
    }
    var byId = ".raffle-completed-card[data-raffle-id=\"" + escaped + "\"]";
    if (/^\d+$/.test(id)) return ".raffle-completed-card[data-raffle-number=\"" + escaped + "\"], " + byId;
    return byId;
  }

  function scrollCompletedRaffleCardIntoView(card) {
    if (!card) return;
    try {
      var panel = getRafflesScrollElement();
      if (panel && panel.contains(card)) {
        var panelRect = panel.getBoundingClientRect();
        var cardRect = card.getBoundingClientRect();
        var target = (panel.scrollTop || 0) + (cardRect.top - panelRect.top) - Math.max(12, ((panel.clientHeight || 0) - (cardRect.height || 0)) / 2);
        panel.scrollTop = Math.max(0, target);
        return;
      }
    } catch (ePanelScroll) {}
    try {
      if (typeof card.scrollIntoView === "function") card.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (eScrollView) {
      try {
        card.scrollIntoView();
      } catch (eScrollFallback) {}
    }
  }

  function focusPendingCompletedRaffle() {
    var targetId = normalizePendingCompletedRaffleId(rafflesPendingCompletedId || readPendingCompletedRaffleId());
    if (!targetId || !rafflesCompleted) return false;
    var selector = completedRaffleCardSelector(targetId);
    var card = selector ? rafflesCompleted.querySelector(selector) : null;
    if (!card) return false;
    try {
      var node = card.parentNode;
      while (node && node !== rafflesCompleted) {
        if (node.tagName && String(node.tagName).toLowerCase() === "details") node.open = true;
        node = node.parentNode;
      }
    } catch (eOpenCompletedArchive) {}
    try {
      rafflesCompleted.querySelectorAll(".raffle-completed-card--target").forEach(function (node) {
        if (node !== card) node.classList.remove("raffle-completed-card--target");
      });
    } catch (eCleanTarget) {}
    card.classList.add("raffle-completed-card--target");
    rafflesPendingCompletedId = "";
    try {
      if (typeof window !== "undefined") window.__pendingRaffleCompletedId = "";
    } catch (eClearPending) {}
    setTimeout(function () {
      scrollCompletedRaffleCardIntoView(card);
    }, 0);
    return true;
  }

  function schedulePendingCompletedRaffleFocus() {
    var targetId = normalizePendingCompletedRaffleId(rafflesPendingCompletedId || readPendingCompletedRaffleId());
    if (!targetId) return;
    rafflesPendingCompletedId = targetId;
    setTimeout(focusPendingCompletedRaffle, 0);
    setTimeout(focusPendingCompletedRaffle, 120);
    setTimeout(focusPendingCompletedRaffle, 360);
  }

  function getRafflesScrollElement() {
    try {
      if (typeof pokerGetPanelScrollCardContentEl === "function") {
        var sharedPanel = pokerGetPanelScrollCardContentEl();
        if (sharedPanel) return sharedPanel;
      }
    } catch (eSharedPanel) {}
    try {
      var activeRafflesView = document.querySelector(".view--active[data-view=\"raffles\"]");
      var viewPanel = activeRafflesView && activeRafflesView.closest ? activeRafflesView.closest(".card__content") : null;
      if (viewPanel) return viewPanel;
      var card = document.querySelector("main.card");
      var cardPanel = card ? card.querySelector(".card__content") : null;
      if (cardPanel) return cardPanel;
    } catch (eRafflesScrollElement) {}
    return null;
  }

  function getRafflesScrollY() {
    try {
      var panel = getRafflesScrollElement();
      if (panel) return panel.scrollTop || 0;
      if (typeof getMainDocumentScrollY === "function") return getMainDocumentScrollY();
      var se = document.scrollingElement || document.documentElement;
      return (se && se.scrollTop) || document.documentElement.scrollTop || document.body.scrollTop || 0;
    } catch (eRafflesScrollY) {
      return 0;
    }
  }

  function setRafflesScrollY(y) {
    try {
      y = Math.max(0, Number(y) || 0);
      var panel = getRafflesScrollElement();
      if (panel) {
        var maxPanelY = Math.max(0, (panel.scrollHeight || 0) - (panel.clientHeight || 0));
        panel.scrollTop = Math.min(y, maxPanelY);
        return;
      }
      if (typeof setMainDocumentScrollY === "function") {
        setMainDocumentScrollY(y);
        return;
      }
      if (typeof window.scrollTo === "function") window.scrollTo(0, y);
      var se = document.scrollingElement || document.documentElement;
      if (se) se.scrollTop = y;
      if (document.documentElement) document.documentElement.scrollTop = y;
      if (document.body) document.body.scrollTop = y;
    } catch (eSetRafflesScrollY) {}
  }

  function clampRafflesScrollY(y) {
    try {
      var panel = getRafflesScrollElement();
      if (panel) {
        var maxPanelY = Math.max(0, (panel.scrollHeight || 0) - (panel.clientHeight || 0));
        return Math.min(Math.max(0, Number(y) || 0), maxPanelY);
      }
      if (typeof clampMainDocumentScrollY === "function") return clampMainDocumentScrollY(y);
    } catch (eClampRafflesScrollY) {}
    return Math.max(0, Number(y) || 0);
  }

  function getRafflesTabsViewportTop() {
    try {
      if (!rafflesTabs || typeof rafflesTabs.getBoundingClientRect !== "function") return null;
      return rafflesTabs.getBoundingClientRect().top;
    } catch (eRafflesTabsTop) {
      return null;
    }
  }

  function restoreRafflesTabScroll(targetY, tabsTopBefore) {
    function apply() {
      var y = Number(targetY) || 0;
      if (tabsTopBefore != null && rafflesTabs && typeof rafflesTabs.getBoundingClientRect === "function") {
        try {
          y = getRafflesScrollY() + rafflesTabs.getBoundingClientRect().top - tabsTopBefore;
        } catch (eTabsDelta) {}
      }
      setRafflesScrollY(clampRafflesScrollY(y));
    }
    apply();
    var raf = window.requestAnimationFrame || function (fn) {
      setTimeout(fn, 16);
    };
    raf(function () {
      apply();
      raf(function () {
        apply();
        raf(apply);
      });
    });
    [0, 48, 120, 220].forEach(function (ms) {
      setTimeout(apply, ms);
    });
  }
  function formatMoscowDateTimeLocalForInput(date) {
    if (!date) return "";
    try {
      // sv-SE даёт ISO-подобный формат: "YYYY-MM-DD HH:mm:ss"
      var s = date.toLocaleString("sv-SE", { timeZone: "Europe/Moscow", hour12: false });
      return s.replace(" ", "T").slice(0, 16);
    } catch (e) {
      return "";
    }
  }


  function renderCompletedRafflesPanel(completed) {
    if (rafflesCompletedRuntime && typeof rafflesCompletedRuntime.renderPanel === "function") {
      rafflesCompletedRuntime.renderPanel(completed || []);
    }
  }

  function deferredCompletedArchiveHtml() {
    return (
      "<details class=\"raffles-completed-spoiler raffles-completed-archive raffles-completed-archive--deferred\" data-raffles-archive-deferred=\"1\">" +
        "<summary class=\"raffles-completed-spoiler__summary\">" +
          "<span class=\"raffles-completed-spoiler__title\">Архив</span>" +
          "<span class=\"raffles-completed-spoiler__count\">" +
            "<span class=\"raffles-completed-spoiler__count-number\">—</span>" +
            "<span class=\"raffles-completed-spoiler__sum\">—</span>" +
          "</span>" +
        "</summary>" +
        "<div class=\"raffles-completed-spoiler__body raffles-completed-archive__body\">" +
          "<span class=\"raffle-loading__spinner\" aria-hidden=\"true\"></span><span class=\"raffle-loading__text\">Загружаем архив</span>" +
        "</div>" +
      "</details>"
    );
  }

  function renderDeferredCompletedArchivePanel(recentCompleted) {
    if (!rafflesCompleted || rafflesArchiveLoaded) return;
    var recent = Array.isArray(recentCompleted) ? recentCompleted.slice(0, 2) : [];
    if (recent.length) {
      renderCompletedRafflesPanel(recent);
      if (rafflesCompleted.insertAdjacentHTML) {
        rafflesCompleted.insertAdjacentHTML("beforeend", deferredCompletedArchiveHtml());
      }
      return;
    }
    if (rafflesCompleted.querySelector && rafflesCompleted.querySelector("[data-raffles-archive-deferred='1']")) return;
    if (rafflesCompletedEmpty) rafflesCompletedEmpty.classList.add("raffle-empty--hidden");
    rafflesCompleted.innerHTML = deferredCompletedArchiveHtml();
  }

  function requestCompletedArchiveLoad() {
    if (rafflesArchiveLoaded || rafflesArchiveLoading) return;
    loadRaffles({ includeArchive: true, skipCache: true, keepCurrentOnLoading: true, switchToCompleted: rafflesCurrentTab === "completed" });
  }

  function renderStoredCompletedRafflesPanel() {
    renderCompletedRafflesPanel(rafflesLastCompleted || []);
    rafflesCompletedDirty = false;
    schedulePendingCompletedRaffleFocus();
  }

  function raffleWinnerIsReadyLocally(winner) {
    return !!(winner && (winner.winnerReady === true || String(winner.winnerReady || "").toLowerCase() === "true"));
  }

  function raffleWinnerReadyOverrideKey(raffleId, winner) {
    var keys = raffleWinnerReadyOverrideKeys(raffleId, winner);
    return keys[0] || "";
  }

  function raffleWinnerReadyOverrideKeys(raffleId, winner) {
    var rid = String(raffleId || "").trim();
    if (!rid || !winner) return [];
    var keys = [];
    var slot = String((winner.winnerReadySlotId || winner.winnerSlotId) || "").trim();
    if (slot) keys.push(rid + "|slot:" + slot);
    var userId = String(winner.userId != null ? winner.userId : "").trim();
    if (userId) keys.push(rid + "|user:" + userId);
    var accountId = String((winner.accountId || winner.dtId) || "").trim();
    if (accountId) keys.push(rid + "|account:" + accountId);
    var p21Id = String(winner.p21Id != null ? winner.p21Id : "").trim();
    if (p21Id) keys.push(rid + "|p21:" + p21Id);
    return keys;
  }

  function rememberRaffleWinnerReadyOverrides(raffle) {
    if (!raffle || !Array.isArray(raffle.winners)) return;
    var rid = String(raffle.id || "").trim();
    if (!rid) return;
    var until = Date.now() + 10 * 60 * 1000;
    raffle.winners.forEach(function (winner) {
      if (!raffleWinnerIsReadyLocally(winner)) return;
      raffleWinnerReadyOverrideKeys(rid, winner).forEach(function (key) {
        if (key) rafflesWinnerReadyOverrides[key] = until;
      });
    });
  }

  function applyRaffleWinnerReadyOverrides(raffle) {
    if (!raffle || !Array.isArray(raffle.winners)) return raffle;
    var rid = String(raffle.id || "").trim();
    if (!rid) return raffle;
    var nowMs = Date.now();
    raffle.winners.forEach(function (winner) {
      var keys = raffleWinnerReadyOverrideKeys(rid, winner);
      var key = "";
      var until = 0;
      keys.some(function (candidateKey) {
        var candidateUntil = candidateKey ? parseInt(rafflesWinnerReadyOverrides[candidateKey], 10) || 0 : 0;
        if (!candidateUntil) return false;
        key = candidateKey;
        until = candidateUntil;
        return true;
      });
      if (!until) return;
      if (until <= nowMs) {
        delete rafflesWinnerReadyOverrides[key];
        return;
      }
      var state = String(winner && winner.winnerReadyState || "").toLowerCase();
      var status = String(winner && winner.winnerStatus || "").toLowerCase();
      if (winner.winnerReadyExpired === true || winner.winnerBurned === true || state === "missed" || state === "burned" || status === "ok" || status === "fail") return;
      winner.winnerReady = true;
      winner.winnerReadyState = "ready";
    });
    return raffle;
  }

  function applyRaffleWinnerReadyOverridesToList(list) {
    if (!Array.isArray(list)) return list;
    list.forEach(applyRaffleWinnerReadyOverrides);
    return list;
  }

  function winnerStatusOverrideValue(winner) {
    if (!winner || !Object.prototype.hasOwnProperty.call(winner, "winnerStatus")) return null;
    var status = String(winner.winnerStatus || "").toLowerCase();
    return status === "ok" || status === "fail" ? status : "";
  }

  function rememberRaffleWinnerStatusOverrides(raffle) {
    if (!raffle || !Array.isArray(raffle.winners)) return;
    var rid = String(raffle.id || "").trim();
    if (!rid) return;
    var until = Date.now() + 10 * 60 * 1000;
    raffle.winners.forEach(function (winner) {
      var status = winnerStatusOverrideValue(winner);
      if (status == null) return;
      raffleWinnerReadyOverrideKeys(rid, winner).forEach(function (key) {
        if (key) rafflesWinnerStatusOverrides[key] = { status: status, until: until };
      });
    });
  }

  function applyRaffleWinnerStatusOverrides(raffle) {
    if (!raffle || !Array.isArray(raffle.winners)) return raffle;
    var rid = String(raffle.id || "").trim();
    if (!rid) return raffle;
    var nowMs = Date.now();
    raffle.winners.forEach(function (winner) {
      var keys = raffleWinnerReadyOverrideKeys(rid, winner);
      var matchKey = "";
      var override = null;
      keys.some(function (candidateKey) {
        var candidate = candidateKey ? rafflesWinnerStatusOverrides[candidateKey] : null;
        if (!candidate || !candidate.until) return false;
        matchKey = candidateKey;
        override = candidate;
        return true;
      });
      if (!override) return;
      if (override.until <= nowMs) {
        delete rafflesWinnerStatusOverrides[matchKey];
        return;
      }
      winner.winnerStatus = override.status || null;
    });
    return raffle;
  }

  function applyRaffleWinnerStatusOverridesToList(list) {
    if (!Array.isArray(list)) return list;
    list.forEach(applyRaffleWinnerStatusOverrides);
    return list;
  }

  function updateCompletedRaffleCache(raffle) {
    if (!raffle || !raffle.id) return;
    rememberRaffleWinnerReadyOverrides(raffle);
    rememberRaffleWinnerStatusOverrides(raffle);
    applyRaffleWinnerReadyOverrides(raffle);
    applyRaffleWinnerStatusOverrides(raffle);
    var targetId = String(raffle.id);
    function replaceInList(list) {
      if (!Array.isArray(list)) return false;
      for (var i = 0; i < list.length; i += 1) {
        if (list[i] && String(list[i].id || "") === targetId) {
          list[i] = raffle;
          return true;
        }
      }
      return false;
    }
    replaceInList(rafflesLastCompleted);
    var cache = typeof window !== "undefined" ? window._rafflesCache : null;
    if (cache && cache.data) {
      replaceInList(cache.data.raffles);
      replaceInList(cache.data.activeRaffles);
      if (cache.data.activeRaffle && String(cache.data.activeRaffle.id || "") === targetId) {
        cache.data.activeRaffle = raffle;
      }
    }
  }

  if (typeof initRafflesCompletedRuntime === "function") {
    var rafflesCompletedRuntimeDeps = {};
    Object.defineProperties(rafflesCompletedRuntimeDeps, {
      rafflesIsAdmin: { get: function () { return rafflesIsAdmin; } },
      rafflesFocusedActiveId: { get: function () { return rafflesFocusedActiveId; } }
    });
    Object.assign(rafflesCompletedRuntimeDeps, {
      base: base,
      tg: tg,
      loadRaffles: loadRaffles,
      clearRafflesCache: clearRafflesCache,
      pokerRafflesApiQueryLeading: pokerRafflesApiQueryLeading,
      updateCompletedRaffleCache: updateCompletedRaffleCache,
      shouldReloadCompletedArchiveAfterWinnerAction: function () {
        return !!rafflesArchiveLoaded;
      },
      focusRaffleAfterMutation: focusRaffleAfterMutation,
      confirmRaffleAdminAction: confirmRaffleAdminAction,
      collectRaffleIdentityIds: collectRaffleIdentityIds,
      escapeHtml: escapeHtml,
      raffleParticipantDisplayLine: raffleParticipantDisplayLine,
      raffleDisplayPrizeText: raffleDisplayPrizeText,
      formatRaffleSum: formatRaffleSum
    });
    rafflesCompletedRuntime = initRafflesCompletedRuntime(rafflesCompletedRuntimeDeps);
  }
  var rafflesActiveViewRuntime = null;
  function renderRaffle(raffle) {
    if (rafflesActiveViewRuntime && typeof rafflesActiveViewRuntime.renderRaffle === "function") {
      var rendered = rafflesActiveViewRuntime.renderRaffle(raffle);
      if (raffleAddPrizesForm && !raffleAddPrizesForm.hidden) syncRaffleAddPrizesMode();
      return rendered;
    }
  }

  if (typeof initRafflesActiveViewRuntime === "function") {
    var rafflesActiveViewDeps = {};
    Object.defineProperties(rafflesActiveViewDeps, {
      currentRaffleId: { get: function () { return currentRaffleId; }, set: function (value) { currentRaffleId = value; } },
      currentRaffleEndDate: { get: function () { return currentRaffleEndDate; }, set: function (value) { currentRaffleEndDate = value; } },
      currentRaffleData: { get: function () { return currentRaffleData; }, set: function (value) { currentRaffleData = value; } },
      raffleTimerInterval: { get: function () { return raffleTimerInterval; }, set: function (value) { raffleTimerInterval = value; } },
      rafflesIsAdmin: { get: function () { return rafflesIsAdmin; } },
      rafflesCompletedRuntime: { get: function () { return rafflesCompletedRuntime; } }
    });
    Object.assign(rafflesActiveViewDeps, {
      raffleCard: raffleCard,
      raffleCardHeading: raffleCardHeading,
      raffleCardSubheading: raffleCardSubheading,
      raffleCompleteBtn: raffleCompleteBtn,
      raffleCancelBtn: raffleCancelBtn,
      raffleUpdateEndBtn: raffleUpdateEndBtn,
      raffleDeleteBtn: raffleDeleteBtn,
      raffleStatWinners: raffleStatWinners,
      raffleStatPrizeValue: raffleStatPrizeValue,
      raffleStatGroups: raffleStatGroups,
      raffleEnd: raffleEnd,
      setRaffleEndStatusText: setRaffleEndStatusText,
      rafflePrizes: rafflePrizes,
      raffleIdNote: raffleIdNote,
      raffleAccessLevelNote: raffleAccessLevelNote,
      raffleSubscribeRequirements: raffleSubscribeRequirements,
      raffleInfoToggleBtn: raffleInfoToggleBtn,
      raffleInfoPanel: raffleInfoPanel,
      raffleJoinToggleBtn: raffleJoinToggleBtn,
      clearRaffleJoinError: clearRaffleJoinError,
      raffleJoinedMsg: raffleJoinedMsg,
      raffleGuestGate: raffleGuestGate,
      raffleParticipantsCount: raffleParticipantsCount,
      raffleParticipantsChance: raffleParticipantsChance,
      raffleParticipants: raffleParticipants,
      raffleAdminTicketForm: raffleAdminTicketForm,
      raffleWinnersWrap: raffleWinnersWrap,
      raffleWinners: raffleWinners,
      buildActiveRaffleCardHeading: buildActiveRaffleCardHeading,
      updateRaffleEndText: updateRaffleEndText,
      getRaffleTotalPrize: getRaffleTotalPrize,
      collectRaffleIdentityIds: collectRaffleIdentityIds,
      rafflesViewerIsGuestOnly: rafflesViewerIsGuestOnly,
      rafflesViewerNeedsLoginForParticipation: rafflesViewerNeedsLoginForParticipation,
      raffleParticipantLineHtml: raffleParticipantLineHtml,
      raffleParticipantTicketCount: raffleParticipantTicketCount,
      raffleTicketWord: raffleTicketWord,
      raffleParticipantsTotalTickets: raffleParticipantsTotalTickets,
      raffleViewerTicketCount: raffleViewerTicketCount,
      raffleUsesTicketWeights: raffleUsesTicketWeights,
      raffleUsesAdminTicketEntry: raffleUsesAdminTicketEntry,
      raffleAccessLevel: raffleAccessLevel,
      raffleAccessLevelText: raffleAccessLevelText,
      raffleDisplayPrizeText: raffleDisplayPrizeText,
      raffleMissingSubscriptionRequirements: raffleMissingSubscriptionRequirements,
      renderRaffleSubscribeRequirements: renderRaffleSubscribeRequirements,
      setRaffleInfoPanelOpen: setRaffleInfoPanelOpen,
      escapeHtml: escapeHtml
    });
    rafflesActiveViewRuntime = initRafflesActiveViewRuntime(rafflesActiveViewDeps) || {};
  }

  function getRaffleDeviceId() {
    return pokerGetRaffleStableDeviceId();
  }

  function loadRaffles(switchToCompleted, options) {
    if (!base) return;
    var loadOptions = options && typeof options === "object" ? options : {};
    if (switchToCompleted && typeof switchToCompleted === "object") {
      loadOptions = switchToCompleted;
      switchToCompleted = !!loadOptions.switchToCompleted;
    }
    switchToCompleted = !!switchToCompleted;
    if (!loadOptions.includeArchive && readPendingActiveRaffleId()) {
      loadOptions.includeArchive = true;
    }
    var loadSeq = ++rafflesLoadSeq;
    var hostname = typeof window !== "undefined" && window.location && window.location.hostname ? window.location.hostname : "";
    var baseStr = (base || "").toString();
    var isLocal = /localhost|127\.0\.0\.1/i.test(hostname) || /localhost|127\.0\.0\.1/i.test(baseStr);
    var qLead = pokerRafflesApiQueryLeading();
    if (!isLocal && qLead === "?initData=" && !pokerCanSyncGuestProfileToServer()) {
      if (loadOptions.deadlineRefresh) rafflesDeadlineRefreshInFlight = false;
      return;
    }

    function showRafflesLoading() {
      if (loadOptions.keepCurrentOnLoading) {
        if (raffleEnd) raffleEnd.textContent = "Подводим итоги…";
        return;
      }
      setRaffleActiveActionsVisible(false);
      if (raffleEmpty) {
        raffleEmpty.innerHTML = "<span class=\"raffle-loading__spinner\" aria-hidden=\"true\"></span><span class=\"raffle-loading__text\">Подождите, Розыгрыш загружается</span>";
        raffleEmpty.classList.remove("raffle-empty--login");
        raffleEmpty.classList.remove("raffle-empty--hidden");
      }
      if (raffleCurrent) raffleCurrent.classList.add("raffle-current--hidden");
    }

    function raffleLoadErrorNeedsLogin(data) {
      if (rafflesViewerIsGuestOnly()) return true;
      var status = data && data.__status != null ? parseInt(data.__status, 10) : 0;
      if (status === 401) return true;
      var code = String((data && data.code) || "").toUpperCase();
      if (code.indexOf("AUTH") !== -1 || code === "LOGIN_REQUIRED") return true;
      var errorText = String((data && data.error) || "").toLowerCase();
      return /войдите|telegram|pwa|auth required|login required/.test(errorText);
    }

    function showRafflesError(data) {
      if (loadOptions.keepCurrentOnLoading) {
        if (raffleEnd) raffleEnd.textContent = "Не удалось обновить итоги. Обновите раздел.";
        return;
      }
      setRaffleActiveActionsVisible(false);
      if (raffleEmpty) {
        if (raffleLoadErrorNeedsLogin(data)) {
          raffleEmpty.innerHTML =
            "<span class=\"raffle-empty__title\">Войдите в аккаунт</span>" +
            "<span class=\"raffle-empty__text\">Чтобы открыть розыгрыши и участвовать, войдите в аккаунт.</span>" +
            "<button type=\"button\" class=\"profile-exit-btn\" data-poker-login-action=\"1\">Войти в аккаунт</button>";
          raffleEmpty.classList.add("raffle-empty--login");
        } else {
          raffleEmpty.textContent = "Ошибка загрузки. Проверьте сеть или перезайдите.";
          raffleEmpty.classList.remove("raffle-empty--login");
        }
        raffleEmpty.classList.remove("raffle-empty--hidden");
      }
      if (raffleCurrent) raffleCurrent.classList.add("raffle-current--hidden");
    }

    var cache = typeof window !== "undefined" ? window._rafflesCache : null;
    var cacheUsable = !loadOptions.skipCache && !!(cache && cache.data && cache.data.ok);
    if (cacheUsable) {
      applyRafflesData(cache.data, switchToCompleted);
      if (!loadOptions.includeArchive && raffleCacheIsFresh(cache) && !loadOptions.deadlineRefresh && !readPendingCompletedRaffleId() && !readPendingActiveRaffleId()) {
        return;
      }
    } else {
      showRafflesLoading();
    }

    function startFetch() {
      if (loadOptions.includeArchive) rafflesArchiveLoading = true;
      var bypassServerListCacheUntil = 0;
      try {
        bypassServerListCacheUntil = parseInt(window.__rafflesBypassServerListCacheUntil, 10) || 0;
      } catch (eBypassServerCache) {}
      var useActiveScope =
        !isLocal &&
        !loadOptions.includeArchive &&
        !readPendingActiveRaffleId();
      var bypassActiveScopeCache =
        useActiveScope &&
        (loadOptions.skipCache || loadOptions.deadlineRefresh || Date.now() < bypassServerListCacheUntil);
      var url =
        base +
        "/api/raffles" +
        qLead +
        "&_t=" +
        Date.now() +
        (useActiveScope ? "&scope=active" : "") +
        (bypassActiveScopeCache ? "&bypassListCache=1" : "") +
        (isLocal ? "&demo=1" : "");
      var pendingCompletedTarget = !loadOptions.includeArchive ? readPendingCompletedRaffleId() : "";
      var pendingCompletedFetch = pendingCompletedTarget
        ? fetch(
            base + "/api/raffles" + qLead + "&scope=completed-one&target=" +
            encodeURIComponent(pendingCompletedTarget) + "&_t=" + Date.now()
          ).then(function (r) {
            return r.json().catch(function () { return null; });
          }).catch(function () { return null; })
        : Promise.resolve(null);
      Promise.all([fetch(url), pendingCompletedFetch])
        .then(function (responses) {
          var r = responses[0];
          var pendingData = responses[1];
          return r.json().catch(function () {
            return { ok: false, error: "bad_json" };
          }).then(function (data) {
            if (data && data.ok && pendingData && pendingData.ok && pendingData.raffle) {
              var targetRaffle = pendingData.raffle;
              var recent = Array.isArray(data.recentCompletedRaffles) ? data.recentCompletedRaffles.slice() : [];
              if (!recent.some(function (raffle) { return raffle && raffle.id === targetRaffle.id; })) {
                recent.unshift(targetRaffle);
              }
              data.recentCompletedRaffles = recent;
              data.raffles = recent;
            }
            return { response: r, data: data };
          });
        })
        .then(function (result) {
          var data = result.data;
          if (data && typeof data === "object") data.__status = result.response.status;
          return data;
        })
        .then(function (data) {
          if (loadOptions.deadlineRefresh) rafflesDeadlineRefreshInFlight = false;
          if (loadOptions.includeArchive) rafflesArchiveLoading = false;
          if (loadSeq !== rafflesLoadSeq) return;
          if (!data || !data.ok) {
            if (!cacheUsable) showRafflesError(data);
            return;
          }
          if (typeof window !== "undefined") window._rafflesCache = { data: data, time: Date.now() };
          applyRafflesData(data, switchToCompleted);
        })
        .catch(function () {
          if (loadOptions.deadlineRefresh) rafflesDeadlineRefreshInFlight = false;
          if (loadOptions.includeArchive) rafflesArchiveLoading = false;
          if (loadSeq !== rafflesLoadSeq) return;
          if (!cacheUsable) showRafflesError();
        });
    }

    if (qLead.indexOf("guestDeviceId=") !== -1) {
      pokerComputeGuestMemberId(pokerGetRaffleStableDeviceId()).then(function (gid) {
        if (gid) myRaffleUserId = gid;
        if (currentRaffleData) renderRaffle(currentRaffleData);
        startFetch();
      });
    } else {
      startFetch();
    }
  }

  function applyRafflesData(data, switchToCompleted) {
        if (!data || !data.ok) return;
        rafflesViewerPokerPlusStatusLevel = Math.max(
          0,
          parseInt(data.viewerPokerPlusStatusLevel, 10) || 0
        );
        if (data.archiveDeferred !== true) rafflesArchiveLoaded = true;
        var pendingCompletedId = readPendingCompletedRaffleId();
        var pendingActiveId = readPendingActiveRaffleId();
        var switchToActive = false;
        if (pendingCompletedId) {
          rafflesPendingCompletedId = pendingCompletedId;
          switchToCompleted = true;
        }
        rafflesIsAdmin = !!data.isAdmin;
        if (rafflesCompletedRuntime && typeof rafflesCompletedRuntime.setCurrentWeekIssueTotals === "function") {
          rafflesCompletedRuntime.setCurrentWeekIssueTotals(data.currentWeekIssueTotals || null);
        }
        if (rafflesIsAdmin && typeof window.pokerMarkAdminAccess === "function") {
          window.pokerMarkAdminAccess("raffles");
        }
        if (adminWrap) adminWrap.classList.toggle("raffles-admin-wrap--hidden", !rafflesIsAdmin);
        if (!rafflesIsAdmin) setRafflesSubscribersRowVisible(false);
        if (rafflesTabs) rafflesTabs.classList.toggle("raffles-tabs--admin", rafflesIsAdmin);
        if (rafflesTabCreate) rafflesTabCreate.classList.toggle("raffles-tab--hidden", !rafflesIsAdmin);
        if (!rafflesIsAdmin && rafflesPanelCreate && !rafflesPanelCreate.classList.contains("raffles-panel--hidden")) {
          setRafflesTab("active");
        }
        var raw = data.raffles || [];
        if (data.activeOnly === true && Array.isArray(data.activeRaffles)) {
          raw = data.activeRaffles.concat(Array.isArray(data.recentCompletedRaffles) ? data.recentCompletedRaffles : raw);
        }
        var seen = {};
        var allRaffles = raw.filter(function (r) {
          var id = r && r.id;
          if (!id || seen[id]) return false;
          seen[id] = true;
          return true;
        });
        applyRaffleWinnerReadyOverridesToList(allRaffles);
        applyRaffleWinnerStatusOverridesToList(allRaffles);
        if (Array.isArray(data.activeRaffles)) applyRaffleWinnerReadyOverridesToList(data.activeRaffles);
        if (Array.isArray(data.activeRaffles)) applyRaffleWinnerStatusOverridesToList(data.activeRaffles);
        if (Array.isArray(data.recentCompletedRaffles)) applyRaffleWinnerReadyOverridesToList(data.recentCompletedRaffles);
        if (Array.isArray(data.recentCompletedRaffles)) applyRaffleWinnerStatusOverridesToList(data.recentCompletedRaffles);
        rafflesIsAdmin = !!data.isAdmin;
        if (rafflesIsAdmin && typeof window.pokerMarkAdminAccess === "function") {
          window.pokerMarkAdminAccess("raffles");
        }
        if (adminWrap) adminWrap.classList.toggle("raffles-admin-wrap--hidden", !rafflesIsAdmin);
        if (!rafflesIsAdmin) setRafflesSubscribersRowVisible(false);
        if (rafflesTabs) rafflesTabs.classList.toggle("raffles-tabs--admin", rafflesIsAdmin);
        if (rafflesTabCreate) rafflesTabCreate.classList.toggle("raffles-tab--hidden", !rafflesIsAdmin);
        if (raffleAdminActions) {
          raffleAdminActions.classList.toggle("raffle-admin-actions--hidden", !rafflesIsAdmin);
          raffleAdminActions.setAttribute("aria-hidden", rafflesIsAdmin ? "false" : "true");
        }
        syncRaffleActiveAdminFooterVisibility();
        if (raffleCompleteBtn) {
          raffleCompleteBtn.classList.toggle("raffle-cancel-btn--hidden", !rafflesIsAdmin);
          raffleCompleteBtn.disabled = !rafflesIsAdmin;
        }
        if (raffleCancelBtn) {
          raffleCancelBtn.classList.toggle("raffle-cancel-btn--hidden", !rafflesIsAdmin);
          raffleCancelBtn.disabled = !rafflesIsAdmin;
        }
        if (raffleDeleteBtn) {
          raffleDeleteBtn.classList.toggle("raffle-cancel-btn--hidden", !rafflesIsAdmin);
          raffleDeleteBtn.disabled = !rafflesIsAdmin;
        }
        if (rafflesIsAdmin && window.updateRaffleSubsCount) {
          window.updateRaffleSubsCount();
        }
        rafflesSubscriptionGate = data.subscriptionGate && typeof data.subscriptionGate === "object" ? data.subscriptionGate : null;

        var now = new Date();

        function isTournamentDayRaffle(r) {
          if (!r) return false;
          var title = (r.title || "").toLowerCase();
          if (title.indexOf("турнир дня") !== -1) return true;
          var groups = Array.isArray(r.groups) ? r.groups : [];
          for (var gi = 0; gi < groups.length; gi++) {
            var prizeStr = (groups[gi].prize || "").toLowerCase();
            if (prizeStr.indexOf("турнир дня") !== -1) return true;
          }
          return false;
        }

        function isSmallDailyCashBackingRaffle(r) {
          if (!r || !r.daily) return false;
          var title = String(r.title || r.cardTitle || r.name || "").toLowerCase();
          var groups = Array.isArray(r.groups) ? r.groups : [];
          var text = title;
          for (var gi = 0; gi < groups.length; gi++) {
            text += " " + String(groups[gi] && groups[gi].prize || "").toLowerCase();
          }
          return (
            text.indexOf("беккинг") !== -1 &&
            text.indexOf("кеш") !== -1 &&
            Math.round(getRaffleTotalPrize(r)) === 2000
          );
        }

        function moveSmallDailyCashBackingRaffle(activeRaffles) {
          if (!Array.isArray(activeRaffles) || activeRaffles.length < 4) return;
          var targetIndex = -1;
          for (var mi = 0; mi < activeRaffles.length; mi++) {
            if (isSmallDailyCashBackingRaffle(activeRaffles[mi])) {
              targetIndex = mi;
              break;
            }
          }
          if (targetIndex === -1) return;
          var item = activeRaffles.splice(targetIndex, 1)[0];
          var insertIndex = Math.max(0, activeRaffles.length - 2);
          activeRaffles.splice(insertIndex, 0, item);
        }

        function completedRaffleTime(r) {
          var raw = r && (r.drawnAt || r.completedAt || r.completed_at || r.endDate || r.createdAt);
          if (!raw) return 0;
          var t = new Date(raw).getTime();
          return isFinite(t) ? t : 0;
        }

        function completedBatchTime(batch) {
          var raw = batch && (batch.drawnAt || batch.endDate);
          if (!raw) return 0;
          var t = new Date(raw).getTime();
          return isFinite(t) ? t : 0;
        }

        function completedRaffleBatchResults(raffles, nowDate) {
          var out = [];
          var nowMs = nowDate && isFinite(nowDate.getTime()) ? nowDate.getTime() : Date.now();
          (Array.isArray(raffles) ? raffles : []).forEach(function (raffle) {
            var batches = Array.isArray(raffle && raffle.resultBatches) ? raffle.resultBatches : [];
            var winners = Array.isArray(raffle && raffle.winners) ? raffle.winners : [];
            if (!batches.length || !winners.length || raffle.status !== "active") return;
            batches.forEach(function (batch, index) {
              var batchMs = completedBatchTime(batch);
              if (!batchMs || batchMs > nowMs) return;
              var groupIndexes = Array.isArray(batch && batch.groupIndexes)
                ? batch.groupIndexes
                : (index >= 0 ? [index] : []);
              var groups = {};
              groupIndexes.forEach(function (rawIndex) {
                var n = parseInt(String(rawIndex), 10);
                if (isFinite(n)) groups[n] = true;
              });
              var batchWinners = winners.filter(function (winner) {
                var n = parseInt(String(winner && winner.groupIndex != null ? winner.groupIndex : ""), 10);
                return isFinite(n) && groups[n];
              }).map(function (winner) {
                return Object.assign({}, winner, { sourceRaffleId: raffle.id });
              });
              if (!batchWinners.length) return;
              out.push(Object.assign({}, raffle, {
                id: String(raffle.id || "raffle") + "__batch_" + index,
                sourceRaffleId: raffle.id,
                status: "completed",
                completedAt: batch.drawnAt || batch.endDate || raffle.completedAt || raffle.endDate,
                drawnAt: batch.drawnAt || batch.endDate || raffle.drawnAt || raffle.endDate,
                endDate: batch.endDate || raffle.endDate,
                resultBatchLabel: String(batch.label || "").trim(),
                resultBatchTime: String(batch.time || "").trim(),
                resultBatchIndex: index,
                winners: batchWinners
              }));
            });
          });
          return out;
        }

        var activeSeen = {};
        var activeSource = Array.isArray(data.activeRaffles) ? data.activeRaffles : allRaffles;
        var activeList = activeSource.filter(function (r) {
          var id = r && r.id;
          if (!id || activeSeen[id]) return false;
          activeSeen[id] = true;
          if (r.status !== "active") return false;
          if (Array.isArray(data.activeRaffles)) return true;
          var end = r.endDate ? new Date(r.endDate) : null;
          return !end || end > now;
        });
        // Турниры дня всегда первыми в списке активных розыгрышей
        activeList.sort(function (a, b) {
          var aTd = isTournamentDayRaffle(a) ? 1 : 0;
          var bTd = isTournamentDayRaffle(b) ? 1 : 0;
          if (aTd !== bTd) return bTd - aTd;
          var endA = a.endDate ? new Date(a.endDate).getTime() : 0;
          var endB = b.endDate ? new Date(b.endDate).getTime() : 0;
          return endA - endB;
        });
        moveSmallDailyCashBackingRaffle(activeList);
        activeList.forEach(function (raffle, index) {
          if (raffle && typeof raffle === "object") {
            raffle.shareNumber = index + 1;
            raffle.activeShareNumber = index + 1;
          }
        });
        var archiveDeferred = data.archiveDeferred === true;
        var archiveUnavailable = archiveDeferred && !rafflesArchiveLoaded;
        var completed = archiveDeferred && rafflesArchiveLoaded ? (rafflesLastCompleted || []).slice() : allRaffles.filter(function (r) {
          if (r.status !== "active") return true;
          var end = r.endDate ? new Date(r.endDate) : null;
          return end && end <= now;
        });
        if (!archiveDeferred || !rafflesArchiveLoaded) completed = completed.concat(completedRaffleBatchResults(allRaffles, now));
        completed.sort(function (a, b) {
          var timeDiff = completedRaffleTime(b) - completedRaffleTime(a);
          if (timeDiff) return timeDiff;
          return (parseInt(b && b.completedNumber, 10) || 0) - (parseInt(a && a.completedNumber, 10) || 0);
        });
        if (pendingActiveId) {
          var pendingActiveFound = false;
          var pendingResolvedRaffleId = "";
          for (var pai = 0; pai < activeList.length; pai++) {
            if (raffleIdMatchesTarget(activeList[pai], pendingActiveId)) {
              pendingActiveFound = true;
              pendingResolvedRaffleId = String(activeList[pai].id || "");
              break;
            }
          }
          if (pendingActiveFound) {
            focusRaffleAfterMutation(pendingResolvedRaffleId || pendingActiveId);
            switchToActive = true;
            switchToCompleted = false;
            try {
              if (typeof window !== "undefined") {
                window.__pendingRaffleActiveId = "";
                window.__pendingRaffleCompletedId = "";
              }
            } catch (eClearPendingActive) {}
          } else {
            var pendingCompletedFound = false;
            var pendingResolvedCompletedId = "";
            for (var pci = 0; pci < completed.length; pci++) {
              if (raffleIdMatchesTarget(completed[pci], pendingActiveId)) {
                pendingCompletedFound = true;
                pendingResolvedCompletedId = String(completed[pci].id || "");
                break;
              }
            }
            try {
              if (typeof window !== "undefined") window.__pendingRaffleActiveId = "";
            } catch (eClearStalePendingActive) {}
            if (pendingCompletedFound) {
              rafflesPendingCompletedId = pendingResolvedCompletedId || pendingActiveId;
              try {
                if (typeof window !== "undefined") window.__pendingRaffleCompletedId = pendingResolvedCompletedId || pendingActiveId;
              } catch (eSetPendingCompletedFromActive) {}
              switchToCompleted = true;
            }
          }
        }

        // Вкладка «Активные»: карточка показывает выбранный розыгрыш, а переключатель
        // выше даёт доступ ко всем текущим активным.
        var active = null;
        if (rafflesFocusedActiveId) {
          if (rafflesFocusedActiveId !== RAFFLES_REFERRAL_PROMO_ID) {
            for (var afi = 0; afi < activeList.length; afi++) {
              if (String(activeList[afi].id || "") === rafflesFocusedActiveId) {
                active = activeList[afi];
                break;
              }
            }
            if (!active) rafflesFocusedActiveId = null;
          }
        }
        if (!active && currentRaffleId) {
          for (var aci = 0; aci < activeList.length; aci++) {
            if (String(activeList[aci].id || "") === String(currentRaffleId || "")) {
              active = activeList[aci];
              break;
            }
          }
        }
        if (!active) active = activeList[0] || null;
        var activeCount = activeList.length;
        var activeSumRub = activeList.reduce(function (sum, r) { return sum + getRaffleTotalPrize(r); }, 0);
        rafflesActiveBroadcastList = activeList.slice();
        if (rafflesActiveInfoOpenId && !raffleListHasId(activeList, rafflesActiveInfoOpenId)) {
          rafflesActiveInfoOpenId = "";
        }
        if (rafflesTabActiveCount) rafflesTabActiveCount.textContent = String(activeCount);
        if (rafflesTabActiveSum) rafflesTabActiveSum.textContent = formatRaffleSum(activeSumRub);

        if (active) {
          renderRafflesActiveChooser(activeList, rafflesFocusedActiveId === RAFFLES_REFERRAL_PROMO_ID ? RAFFLES_REFERRAL_PROMO_ID : active.id);
          setRaffleActiveActionsVisible(true);
          setRafflesSubscribersRowVisible(rafflesIsAdmin);
          if (raffleEmpty) raffleEmpty.classList.add("raffle-empty--hidden");
          renderRaffle(active);
          syncRafflesActiveInfoDetailsMount();
        } else {
          renderRafflesActiveChooser(activeList, "");
          setRaffleActiveActionsVisible(false);
          setRafflesSubscribersRowVisible(false);
          rafflesActiveInfoOpenId = "";
          syncRafflesActiveInfoDetailsMount();
          if (raffleCurrent) raffleCurrent.classList.add("raffle-current--hidden");
          if (raffleEmpty) {
            raffleEmpty.textContent = "Нет активных розыгрышей.";
            raffleEmpty.classList.remove("raffle-empty--login");
            raffleEmpty.classList.add("raffle-empty--hidden");
          }
          var rgGate = document.getElementById("raffleGuestGate");
          if (rgGate) {
            rgGate.classList.add("raffle-guest-gate--hidden");
            rgGate.hidden = true;
          }
          currentRaffleId = null;
          currentRaffleEndDate = null;
          setRaffleInfoPanelOpen(false);
          if (raffleInfoToggleBtn) {
            raffleInfoToggleBtn.classList.add("raffle-info-toggle-btn--hidden");
            raffleInfoToggleBtn.hidden = true;
            raffleInfoToggleBtn.disabled = true;
          }
          if (raffleCard && raffleCard.dataset) delete raffleCard.dataset.raffleId;
          rafflesActiveBroadcastList = [];
          if (raffleTimerInterval) {
            clearInterval(raffleTimerInterval);
            raffleTimerInterval = null;
          }
        }
        updateRaffleBadge(activeCount, activeSumRub);

        if (switchToActive && typeof setRafflesTab === "function") setRafflesTab("active");
        else if (switchToCompleted && typeof setRafflesTab === "function") setRafflesTab("completed");

        // Вкладка «Завершённые»: счётчики обновляем сразу, а тяжёлую разметку списка
        // откладываем, чтобы активный розыгрыш появлялся без ожидания большого архива.
        var completedCount = completed.length;
        var completedSumRub = completed.reduce(function (s, r) { return s + getRaffleTotalPrize(r); }, 0);
        if (archiveUnavailable) {
          rafflesLastCompleted = completed.slice(0, 2);
          var summaryCompletedCount = rafflesSummaryNumber(data.rafflesSummary, "completedCount");
          var summaryCompletedSum = rafflesSummaryNumber(data.rafflesSummary, "completedPrizeSumRub");
          if (summaryCompletedCount != null || summaryCompletedSum != null || data.rafflesSummary) {
            if (rafflesTabCompletedCount) rafflesTabCompletedCount.textContent = summaryCompletedCount != null ? formatRaffleHeroCount(summaryCompletedCount) : "—";
            if (rafflesTabCompletedSum) rafflesTabCompletedSum.textContent = summaryCompletedSum != null ? formatRaffleSum(summaryCompletedSum) : "Архив";
            updateRafflesHeroStats(allRaffles, completed, completedSumRub, data.rafflesSummary);
          } else {
            if (rafflesTabCompletedCount) rafflesTabCompletedCount.textContent = "—";
            if (rafflesTabCompletedSum) rafflesTabCompletedSum.textContent = "Архив";
            if (rafflesHeroDoneCount) rafflesHeroDoneCount.textContent = "—";
            if (rafflesHeroPrizeSum) rafflesHeroPrizeSum.textContent = "—";
            if (rafflesHeroUniqueParticipants) rafflesHeroUniqueParticipants.textContent = "—";
            if (rafflesHeroWinnersCount) rafflesHeroWinnersCount.textContent = "—";
          }
        } else {
          if (rafflesTabCompletedCount) rafflesTabCompletedCount.textContent = String(completedCount);
          if (rafflesTabCompletedSum) rafflesTabCompletedSum.textContent = formatRaffleSum(completedSumRub);
          updateRafflesHeroStats(allRaffles, completed, completedSumRub, data.rafflesSummary);
        }

        var completedPanelVisible =
          !!(
            switchToCompleted ||
            (rafflesPanelCompleted && !rafflesPanelCompleted.classList.contains("raffles-panel--hidden")) ||
            (rafflesPanelLeaders && !rafflesPanelLeaders.classList.contains("raffles-panel--hidden"))
          );
        if (archiveUnavailable && completedPanelVisible && rafflesCurrentTab === "completed") {
          renderDeferredCompletedArchivePanel(completed);
        }
        if (!archiveUnavailable) {
          rafflesLastCompleted = completed;
          if (completedPanelVisible) {
            renderStoredCompletedRafflesPanel();
          } else {
            rafflesCompletedDirty = true;
          }
        }
        schedulePendingCompletedRaffleFocus();
  }

  if (typeof initRafflesBroadcastRuntime === "function") {
    var rafflesBroadcastRuntimeDeps = {};
    Object.defineProperties(rafflesBroadcastRuntimeDeps, {
      currentRaffleData: { get: function () { return currentRaffleData; } },
      rafflesActiveBroadcastList: { get: function () { return rafflesActiveBroadcastList; } }
    });
    Object.assign(rafflesBroadcastRuntimeDeps, {
      base: base,
      tg: tg,
      rafflesNotifySubsBtn: rafflesNotifySubsBtn,
      rafflesNotifySubsHint: rafflesNotifySubsHint,
      rafflesLastBroadcastReportBtn: rafflesLastBroadcastReportBtn,
      rafflesRetryFailedBroadcastBtn: rafflesRetryFailedBroadcastBtn,
      rafflesPurgeBlockedSubsBtn: rafflesPurgeBlockedSubsBtn,
      parsePrizeValue: parsePrizeValue,
      getRaffleTotalPrize: getRaffleTotalPrize,
      formatRaffleSum: formatRaffleSum,
      showRaffleFeedback: showRaffleFeedback,
      confirmRaffleAdminAction: confirmRaffleAdminAction
    });
    initRafflesBroadcastRuntime(rafflesBroadcastRuntimeDeps);
  }

  if (typeof initRafflesAdminCreateRuntime === "function") {
    initRafflesAdminCreateRuntime({
      base: base,
      tg: tg,
      parseMoscowDateTimeLocal: parseMoscowDateTimeLocal,
      formatMoscowDateTimeLocalForInput: formatMoscowDateTimeLocalForInput,
      clearRafflesCache: clearRafflesCache,
      focusRaffleAfterMutation: focusRaffleAfterMutation,
      loadRaffles: loadRaffles,
      setRafflesTab: setRafflesTab
    });
  }

  function setRafflesTab(tab) {
    if (tab === "create" && !rafflesIsAdmin) tab = "active";
    var isCreate = tab === "create";
    var isActive = tab === "active";
    var isCompleted = tab === "completed";
    var isLeaders = tab === "leaders";
    if (!isCreate && !isActive && !isCompleted && !isLeaders) {
      tab = "active";
      isActive = true;
    }
    var tabChanged = rafflesCurrentTab !== tab;
    var yBefore = getRafflesScrollY();
    var tabsTopBefore = getRafflesTabsViewportTop();
    if (rafflesTabCreate) {
      rafflesTabCreate.classList.toggle("raffles-tab--active", isCreate);
      rafflesTabCreate.setAttribute("aria-selected", isCreate ? "true" : "false");
    }
    if (rafflesTabActive) {
      rafflesTabActive.classList.toggle("raffles-tab--active", isActive);
      rafflesTabActive.setAttribute("aria-selected", isActive ? "true" : "false");
    }
    if (rafflesTabCompleted) {
      rafflesTabCompleted.classList.toggle("raffles-tab--active", isCompleted);
      rafflesTabCompleted.setAttribute("aria-selected", isCompleted ? "true" : "false");
    }
    if (rafflesTabLeaders) {
      rafflesTabLeaders.classList.toggle("raffles-tab--active", isLeaders);
      rafflesTabLeaders.setAttribute("aria-selected", isLeaders ? "true" : "false");
    }
    if (rafflesPanelCreate) {
      rafflesPanelCreate.classList.toggle("raffles-panel--active", isCreate);
      rafflesPanelCreate.classList.toggle("raffles-panel--hidden", !isCreate);
    }
    if (rafflesPanelActive) {
      rafflesPanelActive.classList.toggle("raffles-panel--active", isActive);
      rafflesPanelActive.classList.toggle("raffles-panel--hidden", !isActive);
    }
    if (rafflesPanelCompleted) {
      rafflesPanelCompleted.classList.toggle("raffles-panel--active", isCompleted);
      rafflesPanelCompleted.classList.toggle("raffles-panel--hidden", !isCompleted);
    }
    if (rafflesPanelLeaders) {
      rafflesPanelLeaders.classList.toggle("raffles-panel--active", isLeaders);
      rafflesPanelLeaders.classList.toggle("raffles-panel--hidden", !isLeaders);
    }
    if (isCreate && typeof window !== "undefined" && typeof window.pokerRafflesOpenCreateActionTab === "function") {
      window.pokerRafflesOpenCreateActionTab();
    }
    if (!isActive) closeRafflesActiveInfoModal();
    rafflesCurrentTab = tab;
    if ((isCompleted || isLeaders) && !rafflesArchiveLoaded) {
      if (isCompleted) renderDeferredCompletedArchivePanel(rafflesLastCompleted || []);
      if (isLeaders) {
        if (raffleWinnerLeadersEmpty) {
          raffleWinnerLeadersEmpty.textContent = "Загружаем статистику победителей…";
          raffleWinnerLeadersEmpty.classList.remove("raffle-empty--hidden");
        }
        requestCompletedArchiveLoad();
      }
      if (tabChanged) restoreRafflesTabScroll(yBefore, tabsTopBefore);
      return;
    }
    if ((isCompleted || isLeaders) && rafflesCompletedDirty) renderStoredCompletedRafflesPanel();
    if (isCompleted) schedulePendingCompletedRaffleFocus();
    if (tabChanged) restoreRafflesTabScroll(yBefore, tabsTopBefore);
  }
  if (rafflesTabCreate) rafflesTabCreate.addEventListener("click", function () { setRafflesTab("create"); });
  if (rafflesTabActive) rafflesTabActive.addEventListener("click", function () { setRafflesTab("active"); });
  if (rafflesTabCompleted) rafflesTabCompleted.addEventListener("click", function () { setRafflesTab("completed"); });
  if (rafflesTabLeaders) rafflesTabLeaders.addEventListener("click", function () { setRafflesTab("leaders"); });
  if (rafflesCompleted && rafflesCompleted.dataset.archiveDeferredBound !== "1") {
    rafflesCompleted.dataset.archiveDeferredBound = "1";
    rafflesCompleted.addEventListener("click", function (e) {
      if (rafflesCompletedRuntime && typeof rafflesCompletedRuntime.handleDeferredArchiveClick === "function" &&
          rafflesCompletedRuntime.handleDeferredArchiveClick(e)) return;
      var summary = e && e.target && e.target.closest ? e.target.closest("summary") : null;
      var details = summary && summary.parentElement;
      if (!details || details.getAttribute("data-raffles-archive-deferred") !== "1") return;
      setTimeout(requestCompletedArchiveLoad, 0);
    });
  }
  if (raffleInfoToggleBtn) {
    raffleInfoToggleBtn.addEventListener("click", function () {
      if (raffleInfoToggleBtn.disabled) return;
      setRaffleInfoPanelOpen(raffleInfoToggleBtn.getAttribute("aria-expanded") !== "true");
    });
  }
  if (raffleActiveInfoModal && raffleActiveInfoModal.dataset.bound !== "1") {
    raffleActiveInfoModal.dataset.bound = "1";
    if (raffleActiveInfoModalClose) {
      raffleActiveInfoModalClose.addEventListener("click", function () {
        closeRafflesActiveInfoModal();
      });
    }
    if (raffleActiveInfoModalBackdrop) {
      raffleActiveInfoModalBackdrop.addEventListener("click", function () {
        closeRafflesActiveInfoModal();
      });
    }
    raffleActiveInfoModal.addEventListener("keydown", function (e) {
      var key = e && (e.key || e.code);
      if (key !== "Escape" && key !== "Esc") return;
      e.preventDefault();
      closeRafflesActiveInfoModal();
    });
  }
  if (rafflesHelpBtn && !rafflesHelpBtn.getAttribute("aria-expanded")) {
    rafflesHelpBtn.setAttribute("aria-expanded", "false");
  }
  if (rafflesHelpBtn && rafflesHelpBtn.dataset.bound !== "1") {
    rafflesHelpBtn.dataset.bound = "1";
    rafflesHelpBtn.addEventListener("click", function () {
      setRafflesHelpModalOpen(true);
    });
  }
  if (rafflesHelpModal && rafflesHelpModal.dataset.bound !== "1") {
    rafflesHelpModal.dataset.bound = "1";
    if (rafflesHelpModalClose) {
      rafflesHelpModalClose.addEventListener("click", function () {
        closeRafflesHelpModal();
      });
    }
    if (rafflesHelpModalBackdrop) {
      rafflesHelpModalBackdrop.addEventListener("click", function () {
        closeRafflesHelpModal();
      });
    }
    rafflesHelpModal.addEventListener("keydown", function (e) {
      var key = e && (e.key || e.code);
      if (key !== "Escape" && key !== "Esc") return;
      e.preventDefault();
      closeRafflesHelpModal();
    });
  }
  if (rafflesRoot && rafflesRoot.dataset.helpEscapeBound !== "1") {
    rafflesRoot.dataset.helpEscapeBound = "1";
    document.addEventListener("keydown", function (e) {
      var key = e && (e.key || e.code);
      if (key !== "Escape" && key !== "Esc") return;
      if (!rafflesHelpModal || rafflesHelpModal.classList.contains("raffle-active-info-modal--hidden")) return;
      e.preventDefault();
      closeRafflesHelpModal();
    });
  }

  if (typeof initRafflesPublicRuntime === "function") {
    var rafflesPublicRuntimeDeps = {};
    Object.defineProperties(rafflesPublicRuntimeDeps, {
      currentRaffleId: { get: function () { return currentRaffleId; } },
      currentRaffleData: { get: function () { return currentRaffleData; } }
    });
    Object.assign(rafflesPublicRuntimeDeps, {
      base: base,
      tg: tg,
      showRaffleFeedback: showRaffleFeedback,
      showRaffleJoinError: showRaffleJoinError,
      clearRaffleJoinError: clearRaffleJoinError,
      openRaffleTelegramLinkingFlow: openRaffleTelegramLinkingFlow,
      renderRaffle: renderRaffle,
      refreshActiveChooserAfterAction: refreshActiveChooserAfterAction,
      syncRafflesViewerLevelFromResponse: syncRafflesViewerLevelFromResponse,
      rafflesViewerIsGuestOnly: rafflesViewerIsGuestOnly,
      rafflesViewerApiReady: rafflesViewerApiReady,
      getRaffleDeviceId: getRaffleDeviceId,
      getRaffleTotalPrize: getRaffleTotalPrize,
      raffleDisplayPrizeText: raffleDisplayPrizeText,
      buildActiveRaffleCardHeading: buildActiveRaffleCardHeading
    });
    initRafflesPublicRuntime(rafflesPublicRuntimeDeps);
  }

  function raffleAddPrizeGroups() {
    return Array.isArray(currentRaffleData && currentRaffleData.groups) ? currentRaffleData.groups : [];
  }

  function raffleAddPrizeGroupOptionLabel(group, index) {
    var count = Math.max(0, parseInt(group && group.count, 10) || 0);
    var prize = raffleDisplayPrizeText(group && group.prize ? String(group.prize).trim() : "Приз");
    return "Группа " + (index + 1) + " · " + count + " мест · " + prize;
  }

  function getRaffleAddPrizeMode() {
    var groups = raffleAddPrizeGroups();
    if (!groups.length) return "new";
    return raffleAddPrizeModeNew && raffleAddPrizeModeNew.checked ? "new" : "existing";
  }

  function syncRaffleAddPrizesMode() {
    var groups = raffleAddPrizeGroups();
    if (raffleAddPrizeGroupSelect) {
      var previous = raffleAddPrizeGroupSelect.value;
      raffleAddPrizeGroupSelect.innerHTML = "";
      groups.forEach(function (group, index) {
        var opt = document.createElement("option");
        opt.value = String(index);
        opt.textContent = raffleAddPrizeGroupOptionLabel(group, index);
        raffleAddPrizeGroupSelect.appendChild(opt);
      });
      if (previous && raffleAddPrizeGroupSelect.querySelector('option[value="' + previous.replace(/"/g, '\\"') + '"]')) {
        raffleAddPrizeGroupSelect.value = previous;
      }
    }
    if (raffleAddPrizeModeExisting) {
      raffleAddPrizeModeExisting.disabled = !groups.length;
      if (!groups.length) raffleAddPrizeModeExisting.checked = false;
    }
    if (raffleAddPrizeModeNew && !groups.length) raffleAddPrizeModeNew.checked = true;
    var mode = getRaffleAddPrizeMode();
    if (raffleAddPrizeExistingGroupWrap) raffleAddPrizeExistingGroupWrap.hidden = mode !== "existing";
    if (raffleAddPrizeNewGroupWrap) raffleAddPrizeNewGroupWrap.hidden = mode !== "new";
    if (raffleAddPrizeAccessWrap) raffleAddPrizeAccessWrap.hidden = mode !== "new";
    if (raffleAddPrizeText) raffleAddPrizeText.disabled = mode !== "new";
    if (raffleAddPrizeAccess) raffleAddPrizeAccess.disabled = mode !== "new";
    var hint = raffleAddPrizesForm ? raffleAddPrizesForm.querySelector(".raffle-add-prizes-form__hint") : null;
    if (hint) {
      hint.textContent = mode === "existing"
        ? "Количество добавится в выбранную существующую группу призов."
        : "Добавится новая группа победителей в текущий активный розыгрыш.";
    }
  }

  function setRaffleAddPrizesFormVisible(visible) {
    if (!raffleAddPrizesForm) return;
    raffleAddPrizesForm.classList.toggle("raffle-add-prizes-form--hidden", !visible);
    raffleAddPrizesForm.hidden = !visible;
    raffleAddPrizesForm.setAttribute("aria-hidden", visible ? "false" : "true");
    if (raffleAddPrizesToggleBtn) raffleAddPrizesToggleBtn.setAttribute("aria-expanded", visible ? "true" : "false");
    if (!visible) return;
    if (raffleAddPrizeCount && (!raffleAddPrizeCount.value || parseInt(raffleAddPrizeCount.value, 10) <= 0)) {
      raffleAddPrizeCount.value = "1";
    }
    syncRaffleAddPrizesMode();
    if (raffleAddPrizeText && !raffleAddPrizeText.value.trim()) {
      var groups = raffleAddPrizeGroups();
      var fallbackPrize = groups.length && groups[groups.length - 1] && groups[groups.length - 1].prize
        ? String(groups[groups.length - 1].prize || "").trim()
        : "";
      if (!fallbackPrize) {
        var isCashPrize = typeof pokerRafflesIsCashPrize === "function" && pokerRafflesIsCashPrize(currentRaffleData);
        fallbackPrize = isCashPrize ? "Беккинг-байин на кеш 1000р" : "Беккинг-билет 300р";
      }
      raffleAddPrizeText.value = fallbackPrize;
    }
    if (getRaffleAddPrizeMode() === "existing" && raffleAddPrizeGroupSelect && typeof raffleAddPrizeGroupSelect.focus === "function") {
      raffleAddPrizeGroupSelect.focus();
    } else if (raffleAddPrizeText && typeof raffleAddPrizeText.focus === "function") {
      raffleAddPrizeText.focus();
    }
  }

  function resetRaffleAddPrizesSubmit() {
    if (!raffleAddPrizesSubmit) return;
    raffleAddPrizesSubmit.disabled = false;
    raffleAddPrizesSubmit.textContent = "Добавить";
  }

  function submitRaffleAddPrizes() {
    if (!rafflesIsAdmin) return;
    if (!currentRaffleId) {
      if (tg && tg.showAlert) tg.showAlert("Розыгрыш не выбран. Обновите страницу.");
      return;
    }
    if (!base || !pokerApiHasCredential()) {
      if (tg && tg.showAlert) tg.showAlert("Откройте приложение в Telegram.");
      return;
    }
    var count = Math.max(0, Math.min(100, parseInt(raffleAddPrizeCount && raffleAddPrizeCount.value, 10) || 0));
    var prize = String(raffleAddPrizeText && raffleAddPrizeText.value || "").replace(/\s+/g, " ").trim();
    if (count <= 0) {
      if (tg && tg.showAlert) tg.showAlert("Укажите количество призовых мест");
      return;
    }
    var mode = getRaffleAddPrizeMode();
    var selectedGroupIndex = -1;
    var selectedGroup = null;
    if (mode === "existing") {
      selectedGroupIndex = parseInt(raffleAddPrizeGroupSelect && raffleAddPrizeGroupSelect.value, 10);
      var groups = raffleAddPrizeGroups();
      selectedGroup = Number.isInteger(selectedGroupIndex) && selectedGroupIndex >= 0 ? groups[selectedGroupIndex] : null;
      if (!selectedGroup) {
        if (tg && tg.showAlert) tg.showAlert("Выберите группу призов");
        return;
      }
      prize = String(selectedGroup.prize || "").replace(/\s+/g, " ").trim();
    }
    if (mode === "new" && !prize) {
      if (tg && tg.showAlert) tg.showAlert("Укажите приз");
      return;
    }
    var groupLabel = mode === "existing"
      ? (count + " мест в " + raffleAddPrizeGroupOptionLabel(selectedGroup, selectedGroupIndex))
      : (activeRaffleTicketGroupShortLabel(count, prize) || (count + " приз(ов): " + prize));
    var doAdd = function () {
      if (raffleAddPrizesSubmit) {
        raffleAddPrizesSubmit.disabled = true;
        raffleAddPrizesSubmit.textContent = "Добавляем...";
      }
      var addPayload = {
        action: "addPrizeGroups",
        raffleId: currentRaffleId,
        count: count,
      };
      if (mode === "existing") {
        addPayload.targetGroupIndex = selectedGroupIndex;
      } else {
        var newGroup = { count: count, prize: prize };
        var accessRaw = raffleAddPrizeAccess ? String(raffleAddPrizeAccess.value == null ? "" : raffleAddPrizeAccess.value).trim() : "";
        if (accessRaw !== "") newGroup.accessLevel = normalizeRaffleAccessLevel(accessRaw);
        addPayload.groups = [newGroup];
      }
      fetch(base + "/api/raffles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokerGuestOrAuthedPostBody(addPayload)),
      })
        .then(function (r) {
          return r.json().catch(function () { return { ok: false, error: "Ошибка ответа сервера" }; });
        })
        .then(function (data) {
          resetRaffleAddPrizesSubmit();
          if (data && data.ok) {
            if (data.raffle && data.raffle.id) focusRaffleAfterMutation(data.raffle.id);
            clearRafflesCache();
            setRaffleAddPrizesFormVisible(false);
            if (raffleAddPrizeCount) raffleAddPrizeCount.value = "1";
            if (mode === "new" && raffleAddPrizeText) raffleAddPrizeText.value = "";
            if (tg && tg.showAlert) tg.showAlert("Призы добавлены");
            else showRaffleFeedback("Призы добавлены", "ok");
            loadRaffles();
          } else if (tg && tg.showAlert) {
            tg.showAlert((data && data.error) || "Ошибка добавления призов");
          } else {
            showRaffleFeedback((data && data.error) || "Ошибка добавления призов", "err");
          }
        })
        .catch(function () {
          resetRaffleAddPrizesSubmit();
          if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
          else showRaffleFeedback(POKER_NET_ERR, "err");
        });
    };
    confirmRaffleAdminAction("Добавить в текущий розыгрыш: " + groupLabel + "?", doAdd);
  }

  if (raffleAddPrizesToggleBtn) {
    raffleAddPrizesToggleBtn.addEventListener("click", function () {
      if (!rafflesIsAdmin) return;
      setRaffleAddPrizesFormVisible(!raffleAddPrizesForm || raffleAddPrizesForm.hidden);
    });
  }

  if (raffleAddPrizeModeExisting) {
    raffleAddPrizeModeExisting.addEventListener("change", syncRaffleAddPrizesMode);
  }
  if (raffleAddPrizeModeNew) {
    raffleAddPrizeModeNew.addEventListener("change", syncRaffleAddPrizesMode);
  }
  if (raffleAddPrizeGroupSelect) {
    raffleAddPrizeGroupSelect.addEventListener("change", syncRaffleAddPrizesMode);
  }

  if (raffleAddPrizesForm) {
    raffleAddPrizesForm.addEventListener("submit", function (e) {
      if (e) e.preventDefault();
      submitRaffleAddPrizes();
    });
  }


  if (raffleCompleteBtn) {
    raffleCompleteBtn.addEventListener("click", function () {
      if (!rafflesIsAdmin) return;
      if (!currentRaffleId) {
        if (tg && tg.showAlert) tg.showAlert("Розыгрыш не выбран. Обновите страницу.");
        return;
      }
      if (!base || !pokerApiHasCredential()) {
        if (tg && tg.showAlert) tg.showAlert("Откройте приложение в Telegram.");
        return;
      }
      var doComplete = function () {
        raffleCompleteBtn.disabled = true;
        fetch(base + "/api/raffles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pokerGuestOrAuthedPostBody({ action: "complete", raffleId: currentRaffleId })),
        })
          .then(function (r) {
            return r.json().catch(function () { return { ok: false, error: "Ошибка ответа сервера" }; });
          })
          .then(function (data) {
            raffleCompleteBtn.disabled = false;
            if (data && data.ok) {
              if (currentRaffleId) focusRaffleAfterMutation(null);
              clearRafflesCache();
              if (tg && tg.showAlert) tg.showAlert("Розыгрыш завершён. Победители определены.");
              loadRaffles({ skipCache: true });
            } else if (tg && tg.showAlert) {
              tg.showAlert((data && data.error) || "Ошибка завершения розыгрыша");
            }
          })
          .catch(function () {
            raffleCompleteBtn.disabled = false;
            if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
          });
      };
      confirmRaffleAdminAction(
        "Завершить розыгрыш сейчас и определить победителей? Приём заявок будет остановлен.",
        doComplete
      );
    });
  }

  function runActiveRaffleAdminAction(action, button, confirmMessage, successMessage, errorMessage, afterOk) {
    if (!rafflesIsAdmin) return;
    if (!currentRaffleId) {
      if (tg && tg.showAlert) tg.showAlert("Розыгрыш не выбран. Обновите страницу.");
      return;
    }
    if (!base || !pokerApiHasCredential()) {
      if (tg && tg.showAlert) tg.showAlert("Откройте приложение в Telegram.");
      return;
    }
    var doAction = function () {
      var raffleIdForAction = currentRaffleId;
      if (button) button.disabled = true;
      fetch(base + "/api/raffles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokerGuestOrAuthedPostBody({ action: action, raffleId: raffleIdForAction })),
      })
        .then(function (r) {
          return r.json().catch(function () { return { ok: false, error: "Ошибка ответа сервера" }; });
        })
        .then(function (data) {
          if (button) button.disabled = false;
          if (data && data.ok) {
            if (typeof afterOk === "function") afterOk(raffleIdForAction, data);
            clearRafflesCache();
            if (tg && tg.showAlert) tg.showAlert(successMessage);
            loadRaffles();
          } else if (tg && tg.showAlert) {
            tg.showAlert((data && data.error) || errorMessage);
          }
        })
        .catch(function () {
          if (button) button.disabled = false;
          if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        });
    };
    confirmRaffleAdminAction(confirmMessage, doAction);
  }

  function cancelActiveRaffle(button) {
    runActiveRaffleAdminAction(
      "cancel",
      button || raffleCancelBtn,
      "Отменить розыгрыш? Это действие нельзя будет отменить.",
      "Розыгрыш отменён",
      "Ошибка отмены розыгрыша",
      function () {
        if (currentRaffleId) focusRaffleAfterMutation(null);
      }
    );
  }

  function deleteActiveRaffle(button) {
    runActiveRaffleAdminAction(
      "delete",
      button || raffleDeleteBtn,
      "Удалить этот розыгрыш окончательно?",
      "Розыгрыш удалён",
      "Ошибка удаления розыгрыша",
      function (deletedRaffleId) {
        if (rafflesFocusedActiveId === deletedRaffleId) focusRaffleAfterMutation(null);
        if (currentRaffleId === deletedRaffleId) currentRaffleId = null;
      }
    );
  }

  if (raffleCancelBtn) {
    raffleCancelBtn.addEventListener("click", function (e) {
      if (e) e.__pokerRaffleAdminHandled = true;
      cancelActiveRaffle(raffleCancelBtn);
    });
  }

  if (raffleUpdateEndBtn) {
    raffleUpdateEndBtn.addEventListener("click", function () {
      if (!rafflesIsAdmin) return;
      if (!currentRaffleId) {
        if (tg && tg.showAlert) tg.showAlert("Розыгрыш не выбран. Обновите страницу.");
        return;
      }
      if (!base || !pokerApiHasCredential()) {
        if (tg && tg.showAlert) tg.showAlert("Откройте приложение в Telegram.");
        return;
      }
      var currentStr = currentRaffleEndDate ? formatMoscowDateTimeLocalForInput(currentRaffleEndDate) : "";
      var ans = prompt("Новое время завершения/итогов (МСК)\nФормат: ГГГГ-ММ-ДДTЧЧ:ММ", currentStr);
      if (ans == null) return;
      ans = String(ans).trim();
      if (!ans) return;
      var dt = parseMoscowDateTimeLocal(ans);
      if (!dt || !(dt instanceof Date) || isNaN(dt.getTime())) {
        if (tg && tg.showAlert) tg.showAlert("Не удалось распознать дату/время. Пример: 2026-03-17T21:00");
        return;
      }
      raffleUpdateEndBtn.disabled = true;
      fetch(base + "/api/raffles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          pokerGuestOrAuthedPostBody({ action: "updateEndDate", raffleId: currentRaffleId, endDate: dt.toISOString() })
        ),
      })
        .then(function (r) { return r.json().catch(function () { return { ok: false, error: "Ошибка ответа сервера" }; }); })
        .then(function (data) {
          raffleUpdateEndBtn.disabled = false;
          if (data && data.ok) {
            if (data.raffle && data.raffle.id) focusRaffleAfterMutation(data.raffle.id);
            clearRafflesCache();
            if (tg && tg.showAlert) tg.showAlert("Время итогов обновлено");
            loadRaffles();
          } else if (tg && tg.showAlert) {
            tg.showAlert((data && data.error) || "Ошибка обновления времени");
          }
        })
        .catch(function () {
          raffleUpdateEndBtn.disabled = false;
          if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        });
    });
  }

  if (raffleDeleteBtn) {
    raffleDeleteBtn.addEventListener("click", function (e) {
      if (e) e.__pokerRaffleAdminHandled = true;
      deleteActiveRaffle(raffleDeleteBtn);
    });
  }

  if (rafflesRoot) {
    var activeRaffleAdminFallbackHandler = function (e) {
      if (!e || e.__pokerRaffleAdminHandled) return;
      var btn = e.target && e.target.closest ? e.target.closest("#raffleCancelBtn, #raffleDeleteBtn") : null;
      if (!btn || !rafflesRoot.contains(btn)) return;
      e.__pokerRaffleAdminHandled = true;
      if (btn.id === "raffleCancelBtn") cancelActiveRaffle(btn);
      else if (btn.id === "raffleDeleteBtn") deleteActiveRaffle(btn);
    };
    rafflesRoot.addEventListener("click", activeRaffleAdminFallbackHandler);
    initRaffles.__activeAdminFallbackRoot = rafflesRoot;
    initRaffles.__activeAdminFallbackHandler = activeRaffleAdminFallbackHandler;
  }

  initRaffles.__listenersBound = true;
  initRaffles.__boundRoot = rafflesRoot;
  initRaffles.__boundRaffleCancelBtn = raffleCancelBtn;
  initRaffles.__boundRaffleDeleteBtn = raffleDeleteBtn;
  initRaffles.__boundRaffleCompleteBtn = raffleCompleteBtn;
  initRaffles.__boundRafflesCompleted = rafflesCompleted;
  initRaffles.__openRequestedActiveTab = function () {
    if (consumeRafflesOpenCompletedTabRequest()) setRafflesTab("completed");
    else if (consumeRafflesOpenActiveTabRequest()) setRafflesTab("active");
  };
  initRaffles.__reload = function () {
    loadRaffles();
  };
  initRaffles.__openRequestedActiveTab();
  loadRaffles();
}
