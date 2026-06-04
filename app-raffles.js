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
  var rafflesTabCreate = document.getElementById("rafflesTabCreate");
  var rafflesTabActive = document.getElementById("rafflesTabActive");
  var rafflesTabCompleted = document.getElementById("rafflesTabCompleted");
  var rafflesPanelCreate = document.getElementById("rafflesPanelCreate");
  var rafflesPanelActive = document.getElementById("rafflesPanelActive");
  var rafflesPanelCompleted = document.getElementById("rafflesPanelCompleted");
  var rafflesTabActiveCount = document.getElementById("rafflesTabActiveCount");
  var rafflesTabActiveSum = document.getElementById("rafflesTabActiveSum");
  var rafflesTabCompletedCount = document.getElementById("rafflesTabCompletedCount");
  var rafflesTabCompletedSum = document.getElementById("rafflesTabCompletedSum");
  var rafflesCompleted = document.getElementById("rafflesCompleted");
  var raffleCard = document.getElementById("raffleCard");
  var raffleCardHeading = document.getElementById("raffleCardHeading");
  var raffleCardSubheading = document.getElementById("raffleCardSubheading");
  var raffleCompleteBtn = document.getElementById("raffleCompleteBtn");
  var raffleCancelBtn = document.getElementById("raffleCancelBtn");
  var raffleUpdateEndBtn = document.getElementById("raffleUpdateEndBtn");
  var raffleDeleteBtn = document.getElementById("raffleDeleteBtn");
  var raffleStatWinners = document.getElementById("raffleStatWinners");
  var raffleStatPrize = document.getElementById("raffleStatPrize");
  var raffleStatPrizeValue = document.getElementById("raffleStatPrizeValue");
  var raffleStatGroups = document.getElementById("raffleStatGroups");
  var raffleEnd = document.getElementById("raffleEnd");
  var rafflePrizes = document.getElementById("rafflePrizes");
  var raffleSubscribeRequirements = document.getElementById("raffleSubscribeRequirements");
  var raffleJoinToggleBtn = document.getElementById("raffleJoinToggleBtn");
  var raffleJoinedMsg = document.getElementById("raffleJoinedMsg");
  var raffleGuestGate = document.getElementById("raffleGuestGate");
  var raffleParticipantsCount = document.getElementById("raffleParticipantsCount");
  var raffleParticipantsChance = document.getElementById("raffleParticipantsChance");
  var raffleParticipants = document.getElementById("raffleParticipants");
  var raffleWinnersWrap = document.getElementById("raffleWinnersWrap");
  var raffleWinners = document.getElementById("raffleWinners");
  var raffleActionFeedback = document.getElementById("raffleActionFeedback");
  var rafflesNotifySubsBtn = document.getElementById("rafflesNotifySubsBtn");
  var rafflesNotifySubsHint = document.getElementById("rafflesNotifySubsHint");
  var rafflesActiveChooser = document.getElementById("rafflesActiveChooser");
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
  var rafflesActiveBroadcastList = [];

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

  if (adminWrap && rafflesPanelCreate && adminWrap.parentNode !== rafflesPanelCreate) {
    rafflesPanelCreate.appendChild(adminWrap);
  }

  function setRafflesSubscribersRowVisible(visible) {
    if (!rafflesSubscribersRow) return;
    rafflesSubscribersRow.classList.toggle("raffles-admin-row--hidden", !visible);
    rafflesSubscribersRow.setAttribute("aria-hidden", visible ? "false" : "true");
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
        loadRaffles(true, { skipCache: true, keepCurrentOnLoading: true, deadlineRefresh: true });
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
      if (typeof window !== "undefined") window._rafflesCache = null;
    } catch (e) {}
  }

  function focusRaffleAfterMutation(raffleId) {
    rafflesFocusedActiveId = raffleId ? String(raffleId) : null;
  }

  function activeRaffleShortTitle(raffle) {
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

  function renderRafflesActiveChooser(activeList, activeId) {
    if (!rafflesActiveChooser) return;
    var list = Array.isArray(activeList) ? activeList : [];
    if (list.length <= 1) {
      rafflesActiveChooser.innerHTML = "";
      rafflesActiveChooser.classList.add("raffles-active-chooser--hidden");
      rafflesActiveChooser.hidden = true;
      return;
    }
    var selectedId = String(activeId || "");
    rafflesActiveChooser.hidden = false;
    rafflesActiveChooser.classList.remove("raffles-active-chooser--hidden");
    rafflesActiveChooser.innerHTML = list
      .map(function (raffle, index) {
        var id = String((raffle && raffle.id) || "");
        var selected = selectedId && id === selectedId;
        return (
          '<button type="button" class="raffles-active-chooser__item' +
          (selected ? " raffles-active-chooser__item--active" : "") +
          '" data-raffle-active-id="' +
          escapeHtml(id) +
          '" aria-selected="' +
          (selected ? "true" : "false") +
          '">' +
          '<span class="raffles-active-chooser__index">' +
          (index + 1) +
          "</span>" +
          '<span class="raffles-active-chooser__text">' +
          '<span class="raffles-active-chooser__title">' +
          escapeHtml(activeRaffleShortTitle(raffle)) +
          "</span>" +
          '<span class="raffles-active-chooser__meta">' +
          escapeHtml(activeRaffleMetaText(raffle)) +
          "</span>" +
          "</span>" +
          "</button>"
        );
      })
      .join("");
  }

  if (rafflesActiveChooser && rafflesActiveChooser.dataset.bound !== "1") {
    rafflesActiveChooser.dataset.bound = "1";
    rafflesActiveChooser.addEventListener("click", function (e) {
      var btn = e.target && e.target.closest ? e.target.closest("[data-raffle-active-id]") : null;
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

  function renderStoredCompletedRafflesPanel() {
    renderCompletedRafflesPanel(rafflesLastCompleted || []);
    rafflesCompletedDirty = false;
    schedulePendingCompletedRaffleFocus();
  }

  function updateCompletedRaffleCache(raffle) {
    if (!raffle || !raffle.id) return;
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
      return rafflesActiveViewRuntime.renderRaffle(raffle);
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
      raffleSubscribeRequirements: raffleSubscribeRequirements,
      raffleJoinToggleBtn: raffleJoinToggleBtn,
      raffleJoinedMsg: raffleJoinedMsg,
      raffleGuestGate: raffleGuestGate,
      raffleParticipantsCount: raffleParticipantsCount,
      raffleParticipantsChance: raffleParticipantsChance,
      raffleParticipants: raffleParticipants,
      raffleWinnersWrap: raffleWinnersWrap,
      raffleWinners: raffleWinners,
      buildActiveRaffleCardHeading: buildActiveRaffleCardHeading,
      updateRaffleEndText: updateRaffleEndText,
      getRaffleTotalPrize: getRaffleTotalPrize,
      collectRaffleIdentityIds: collectRaffleIdentityIds,
      rafflesViewerIsGuestOnly: rafflesViewerIsGuestOnly,
      rafflesViewerNeedsLoginForParticipation: rafflesViewerNeedsLoginForParticipation,
      raffleParticipantLineHtml: raffleParticipantLineHtml,
      raffleDisplayPrizeText: raffleDisplayPrizeText,
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
    } else {
      showRafflesLoading();
    }

    function startFetch() {
      var url = base + "/api/raffles" + qLead + "&_t=" + Date.now() + (isLocal ? "&demo=1" : "");
      fetch(url)
        .then(function (r) {
          return r.json().catch(function () {
            return { ok: false, error: "bad_json" };
          }).then(function (data) {
            if (data && typeof data === "object") data.__status = r.status;
            return data;
          });
        })
        .then(function (data) {
          if (loadOptions.deadlineRefresh) rafflesDeadlineRefreshInFlight = false;
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
        var pendingCompletedId = readPendingCompletedRaffleId();
        if (pendingCompletedId) {
          rafflesPendingCompletedId = pendingCompletedId;
          switchToCompleted = true;
        }
        rafflesIsAdmin = !!data.isAdmin;
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
        var seen = {};
        var allRaffles = raw.filter(function (r) {
          var id = r && r.id;
          if (!id || seen[id]) return false;
          seen[id] = true;
          return true;
        });
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
        var completed = allRaffles.filter(function (r) {
          if (r.status !== "active") return true;
          var end = r.endDate ? new Date(r.endDate) : null;
          return end && end <= now;
        });
        completed.sort(function (a, b) {
          var endA = a.endDate ? new Date(a.endDate).getTime() : 0;
          var endB = b.endDate ? new Date(b.endDate).getTime() : 0;
          return endB - endA;
        });

        // Вкладка «Активные»: карточка показывает выбранный розыгрыш, а переключатель
        // выше даёт доступ ко всем текущим активным.
        var active = null;
        if (rafflesFocusedActiveId) {
          for (var afi = 0; afi < activeList.length; afi++) {
            if (String(activeList[afi].id || "") === rafflesFocusedActiveId) {
              active = activeList[afi];
              break;
            }
          }
          if (!active) rafflesFocusedActiveId = null;
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
        if (rafflesTabActiveCount) rafflesTabActiveCount.textContent = String(activeCount);
        if (rafflesTabActiveSum) rafflesTabActiveSum.textContent = formatRaffleSum(activeSumRub);

        if (active) {
          renderRafflesActiveChooser(activeList, active.id);
          setRafflesSubscribersRowVisible(rafflesIsAdmin);
          if (raffleCurrent) raffleCurrent.classList.remove("raffle-current--hidden");
          if (raffleEmpty) raffleEmpty.classList.add("raffle-empty--hidden");
          renderRaffle(active);
        } else {
          renderRafflesActiveChooser([], "");
          setRafflesSubscribersRowVisible(false);
          if (raffleCurrent) raffleCurrent.classList.add("raffle-current--hidden");
          if (raffleEmpty) {
            raffleEmpty.textContent = "Нет активных розыгрышей.";
            raffleEmpty.classList.remove("raffle-empty--login");
            raffleEmpty.classList.remove("raffle-empty--hidden");
          }
          var rgGate = document.getElementById("raffleGuestGate");
          if (rgGate) {
            rgGate.classList.add("raffle-guest-gate--hidden");
            rgGate.hidden = true;
          }
          currentRaffleId = null;
          currentRaffleEndDate = null;
          rafflesActiveBroadcastList = [];
          if (raffleTimerInterval) {
            clearInterval(raffleTimerInterval);
            raffleTimerInterval = null;
          }
        }
        updateRaffleBadge(activeList.length, activeSumRub);

        if (switchToCompleted && typeof setRafflesTab === "function") setRafflesTab("completed");

        // Вкладка «Завершённые»: счётчики обновляем сразу, а тяжёлую разметку списка
        // откладываем, чтобы активный розыгрыш появлялся без ожидания большого архива.
        var completedCount = completed.length;
        var completedSumRub = completed.reduce(function (s, r) { return s + getRaffleTotalPrize(r); }, 0);
        if (rafflesTabCompletedCount) rafflesTabCompletedCount.textContent = String(completedCount);
        if (rafflesTabCompletedSum) rafflesTabCompletedSum.textContent = formatRaffleSum(completedSumRub);

        var completedPanelVisible =
          !!(
            switchToCompleted ||
            (rafflesPanelCompleted && !rafflesPanelCompleted.classList.contains("raffles-panel--hidden"))
          );
        rafflesLastCompleted = completed;
        if (completedPanelVisible) {
          renderStoredCompletedRafflesPanel();
        } else {
          rafflesCompletedDirty = true;
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
    if (!isCreate && !isActive && !isCompleted) {
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
    if (isCreate && typeof window !== "undefined" && typeof window.pokerRafflesOpenCreateActionTab === "function") {
      window.pokerRafflesOpenCreateActionTab();
    }
    rafflesCurrentTab = tab;
    if (isCompleted && rafflesCompletedDirty) renderStoredCompletedRafflesPanel();
    if (isCompleted) schedulePendingCompletedRaffleFocus();
    if (tabChanged) restoreRafflesTabScroll(yBefore, tabsTopBefore);
  }
  if (rafflesTabCreate) rafflesTabCreate.addEventListener("click", function () { setRafflesTab("create"); });
  if (rafflesTabActive) rafflesTabActive.addEventListener("click", function () { setRafflesTab("active"); });
  if (rafflesTabCompleted) rafflesTabCompleted.addEventListener("click", function () { setRafflesTab("completed"); });

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
      renderRaffle: renderRaffle,
      rafflesViewerIsGuestOnly: rafflesViewerIsGuestOnly,
      rafflesViewerApiReady: rafflesViewerApiReady,
      getRaffleDeviceId: getRaffleDeviceId,
      getRaffleTotalPrize: getRaffleTotalPrize,
      raffleDisplayPrizeText: raffleDisplayPrizeText,
      buildActiveRaffleCardHeading: buildActiveRaffleCardHeading
    });
    initRafflesPublicRuntime(rafflesPublicRuntimeDeps);
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
              loadRaffles(true);
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
    if (consumeRafflesOpenActiveTabRequest()) setRafflesTab("active");
  };
  initRaffles.__reload = function () {
    loadRaffles();
  };
  initRaffles.__openRequestedActiveTab();
  loadRaffles();
}
