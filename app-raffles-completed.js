function initRafflesCompletedRuntime(opts) {
  opts = opts || {};
  with (opts) {
    var rafflesCompleted = document.getElementById("rafflesCompleted");
    var rafflesCompletedEmpty = document.getElementById("rafflesCompletedEmpty");
    var raffleWinnerLeaders = document.getElementById("raffleWinnerLeaders");
    var raffleWinnerLeadersEmpty = document.getElementById("raffleWinnerLeadersEmpty");
    var raffleWinnerLeadersList = document.getElementById("raffleWinnerLeadersList");
    var raffleWinnerLeadersMonths = document.getElementById("raffleWinnerLeadersMonths");
    var raffleWinnerLeadersExpandBtn = document.getElementById("raffleWinnerLeadersExpandBtn");
    var raffleWinnerLeadersModal = document.getElementById("raffleWinnerLeadersModal");
    var raffleWinnerLeadersModalBackdrop = document.getElementById("raffleWinnerLeadersModalBackdrop");
    var raffleWinnerLeadersModalClose = document.getElementById("raffleWinnerLeadersModalClose");
    var raffleWinnerLeadersModalList = document.getElementById("raffleWinnerLeadersModalList");
    var raffleWinnerLeaderRows = [];
    var RAFFLE_WINNER_LEADERS_PREVIEW_LIMIT = 3;
    var RAFFLE_READY_WINDOW_FALLBACK_MS = 15 * 60 * 1000;
    var raffleCompletedTimersInterval = null;
    var raffleCompletedTimerRefreshAfter = 0;
    var raffleCompletedTimerRefreshMarks = {};
    var raffleCompletedActiveWinnerTabs = {};

  function raffleCompletedWinnerTabsKey(raffle) {
    return String((raffle && (raffle.id || raffle.completedNumber)) || "completed");
  }

  function raffleCompletedWinnerTabsDomKey(element) {
    if (!element || !element.closest) return "";
    var tabsRoot = element.closest(".raffle-winner-groups-tabs");
    var card = element.closest(".raffle-completed-card");
    return String(
      (tabsRoot && tabsRoot.getAttribute("data-raffle-winner-tabs-key")) ||
      (card && (card.getAttribute("data-raffle-id") || card.getAttribute("data-raffle-number"))) ||
      ""
    );
  }

  function raffleCompletedWinnerTabIndex(index, count) {
    var value = parseInt(index, 10);
    var max = parseInt(count, 10) || 0;
    if (!isFinite(value) || value < 0) return 0;
    if (max > 0 && value >= max) return 0;
    return value;
  }

  function rememberRaffleCompletedWinnerTab(element) {
    if (!element || !element.closest) return;
    var tabsRoot = element.closest(".raffle-winner-groups-tabs");
    if (!tabsRoot) return;
    var key = raffleCompletedWinnerTabsDomKey(element);
    if (!key) return;
    var activeTab = tabsRoot.querySelector(".raffle-winner-groups-tabs__tab--active");
    var tabIndex = activeTab ? activeTab.getAttribute("data-raffle-winner-tab") : "";
    if (tabIndex === "") {
      var activePanel = tabsRoot.querySelector(".raffle-winner-groups-tabs__panel--active");
      tabIndex = activePanel ? activePanel.getAttribute("data-raffle-winner-panel") : "";
    }
    raffleCompletedActiveWinnerTabs[key] = String(raffleCompletedWinnerTabIndex(tabIndex, tabsRoot.querySelectorAll("[data-raffle-winner-tab]").length));
  }

  function raffleWinnerReadyExpired(w) {
    if (!w) return false;
    var state = String(w.winnerReadyState || "").toLowerCase();
    return w.winnerReadyExpired === true || w.winnerBurned === true || state === "missed" || state === "burned";
  }

  function raffleWinnerIsReady(w) {
    return !!(w && (w.winnerReady === true || String(w.winnerReady || "").toLowerCase() === "true"));
  }

  function raffleWinnerIsReroll(w) {
    if (!w) return false;
    var round = parseInt(w.winnerReadyRound, 10);
    return w.winnerReroll === true || (isFinite(round) && round > 0);
  }

  function raffleWinnerRenderKey(type, value) {
    var v = String(value == null ? "" : value).trim();
    return v ? type + ":" + v.toLowerCase() : "";
  }

  function raffleWinnerRenderKeys(w) {
    if (!w) return [];
    var keys = [];
    var add = function (type, value) {
      var key = raffleWinnerRenderKey(type, value);
      if (key && keys.indexOf(key) === -1) keys.push(key);
    };
    add("account", w.accountId);
    add("user", w.userId);
    add("p21", w.p21Id);
    add("tg", w.telegramUsername);
    return keys;
  }

  function raffleWinnerPrimaryRenderKey(w) {
    var keys = raffleWinnerRenderKeys(w);
    return keys.length ? keys[0] : "";
  }

  function raffleWinnerRerollSourceKeys(w) {
    if (!w) return [];
    var keys = [];
    var add = function (type, value) {
      var key = raffleWinnerRenderKey(type, value);
      if (key && keys.indexOf(key) === -1) keys.push(key);
    };
    add("account", w.winnerRerollFromAccountId);
    add("user", w.winnerRerollFromUserId);
    add("p21", w.winnerRerollFromP21Id);
    add("tg", w.winnerRerollFromTelegramUsername);
    add("name", w.winnerRerollFromName);
    add("slot", w.winnerRerollFromSlotId);
    return keys;
  }

  function raffleWinnerReadyDeadlineMs(w) {
    if (!w || !w.winnerReadyDeadlineAt) return 0;
    var d = new Date(w.winnerReadyDeadlineAt);
    var ms = d.getTime();
    return isFinite(ms) ? ms : 0;
  }

  function raffleWinnerReadyStartMs(w, deadlineMs) {
    var dMs = parseInt(deadlineMs, 10) || raffleWinnerReadyDeadlineMs(w);
    var raw = w && w.winnerReadyWindowStartedAt ? new Date(w.winnerReadyWindowStartedAt).getTime() : 0;
    if (isFinite(raw) && raw > 0 && (!dMs || raw < dMs)) return raw;
    return dMs ? Math.max(0, dMs - RAFFLE_READY_WINDOW_FALLBACK_MS) : 0;
  }

  function raffleWinnerReadyTimerKey(w, raffleId, mode, deadlineMs, startMs) {
    var parts = [
      String(raffleId || ""),
      mode === "burn" ? "burn" : "reroll",
      String(w && (w.winnerReadySlotId || w.userId || w.accountId || w.p21Id || w.name) || ""),
      String(startMs || ""),
      String(deadlineMs || "")
    ];
    return parts.join(":");
  }

  function raffleWinnerReadyTimerInfo(w, raffleId, mode) {
    var deadlineMs = raffleWinnerReadyDeadlineMs(w);
    if (!deadlineMs) return null;
    var startMs = raffleWinnerReadyStartMs(w, deadlineMs);
    return {
      deadlineMs: deadlineMs,
      startMs: startMs,
      key: raffleWinnerReadyTimerKey(w, raffleId, mode, deadlineMs, startMs)
    };
  }

  function raffleWinnerHasPendingReadyDeadline(w) {
    if (!w) return false;
    var status = String(w.winnerStatus || "").toLowerCase();
    if (status === "ok" || status === "fail") return false;
    if (raffleWinnerIsReady(w) || raffleWinnerReadyExpired(w)) return false;
    return raffleWinnerReadyDeadlineMs(w) > 0;
  }

  function raffleReadyCountdownText(deadlineMs) {
    var d = new Date(deadlineMs);
    if (!isFinite(d.getTime())) return "";
    if (d.getTime() <= Date.now()) return "0 сек.";
    if (typeof pokerRafflesFormatCountdown === "function") {
      return pokerRafflesFormatCountdown(d).replace(/^Завершён$/, "0 сек.");
    }
    var ms = Math.max(0, d.getTime() - Date.now());
    var sec = Math.floor(ms / 1000) % 60;
    var min = Math.floor(ms / 60000) % 60;
    var hours = Math.floor(ms / 3600000) % 24;
    var days = Math.floor(ms / 86400000);
    var parts = [];
    if (days > 0) parts.push(days + " д.");
    if (hours > 0 || parts.length) parts.push(hours + " ч.");
    if (min > 0 || parts.length) parts.push(min + " мин.");
    parts.push(sec + " сек.");
    return parts.join(" ");
  }

  function raffleReadyTimerLabel(mode) {
    return mode === "burn" ? "До сгорания" : "До рерола";
  }

  function raffleReadyTimerHtml(timerInfo, mode, className) {
    var info = timerInfo && typeof timerInfo === "object" ? timerInfo : { deadlineMs: timerInfo };
    var deadlineMs = parseInt(info.deadlineMs, 10) || 0;
    if (!deadlineMs) return "";
    var d = new Date(deadlineMs);
    if (!isFinite(d.getTime())) return "";
    var startMs = parseInt(info.startMs, 10) || 0;
    var timerAttrs = " data-raffle-ready-deadline=\"" + escapeHtml(d.toISOString()) + "\"";
    if (startMs) {
      var startDate = new Date(startMs);
      if (isFinite(startDate.getTime())) timerAttrs += " data-raffle-ready-start=\"" + escapeHtml(startDate.toISOString()) + "\"";
    }
    if (info.key) timerAttrs += " data-raffle-ready-refresh-key=\"" + escapeHtml(info.key) + "\"";
    var label = raffleReadyTimerLabel(mode);
    var baseClass = className || "raffle-winner-ready-timer";
    return "<span class=\"" +
      escapeHtml(baseClass + " " + baseClass + "--" + (mode === "burn" ? "burn" : "reroll")) +
      "\"" +
      timerAttrs +
      " data-raffle-ready-timer-mode=\"" +
      escapeHtml(mode === "burn" ? "burn" : "reroll") +
      "\" data-raffle-ready-timer-label=\"" +
      escapeHtml(label) +
      "\" aria-live=\"polite\">" +
      escapeHtml(label + ": " + raffleReadyCountdownText(d.getTime())) +
      "</span>";
  }

  function nearestRaffleReadyTimerInfo(rows, raffleId, mode) {
    var nearest = null;
    (Array.isArray(rows) ? rows : []).forEach(function (w) {
      if (!raffleWinnerHasPendingReadyDeadline(w)) return;
      var info = raffleWinnerReadyTimerInfo(w, raffleId, mode);
      if (info && info.deadlineMs && (!nearest || info.deadlineMs < nearest.deadlineMs)) nearest = info;
    });
    return nearest;
  }

  function requestRaffleTimerRefresh(refreshKey) {
    var key = String(refreshKey || "");
    if (key && raffleCompletedTimerRefreshMarks[key]) return;
    var now = Date.now();
    if (now < raffleCompletedTimerRefreshAfter) return;
    if (key) raffleCompletedTimerRefreshMarks[key] = true;
    raffleCompletedTimerRefreshAfter = now + 7000;
    setTimeout(function () {
      if (typeof clearRafflesCache === "function") clearRafflesCache();
      if (typeof loadRaffles === "function") {
        loadRaffles(false, { skipCache: true, keepCurrentOnLoading: true, deadlineRefresh: true });
      }
    }, 250);
  }

  function refreshRaffleTimerAtMilestones(el, now, deadlineMs) {
    var startRaw = el.getAttribute("data-raffle-ready-start") || "";
    var startMs = startRaw ? new Date(startRaw).getTime() : 0;
    if (!isFinite(startMs) || startMs <= 0 || startMs >= deadlineMs) {
      startMs = Math.max(0, deadlineMs - RAFFLE_READY_WINDOW_FALLBACK_MS);
    }
    if (!startMs || startMs >= deadlineMs) return;
    var refreshKeyBase = el.getAttribute("data-raffle-ready-refresh-key") || el.getAttribute("data-raffle-ready-deadline") || "";
    var midpointMs = startMs + Math.floor((deadlineMs - startMs) / 2);
    var minuteBeforeMs = deadlineMs - 60000;
    var hasMinuteBefore = minuteBeforeMs > startMs && minuteBeforeMs < deadlineMs;
    if (now >= midpointMs && now < deadlineMs && (!hasMinuteBefore || now < minuteBeforeMs)) {
      requestRaffleTimerRefresh(refreshKeyBase + ":midpoint");
    }
    if (hasMinuteBefore && now >= minuteBeforeMs && now < deadlineMs) {
      requestRaffleTimerRefresh(refreshKeyBase + ":minute-before");
    }
  }

  function updateRaffleCompletedTimers() {
    var timers = document.querySelectorAll("[data-raffle-ready-deadline]");
    if (!timers.length) {
      if (raffleCompletedTimersInterval) {
        clearInterval(raffleCompletedTimersInterval);
        raffleCompletedTimersInterval = null;
      }
      return;
    }
    var now = Date.now();
    timers.forEach(function (el) {
      var raw = el.getAttribute("data-raffle-ready-deadline") || "";
      var deadlineMs = new Date(raw).getTime();
      if (!isFinite(deadlineMs)) return;
      var mode = el.getAttribute("data-raffle-ready-timer-mode") || "reroll";
      var label = el.getAttribute("data-raffle-ready-timer-label") || raffleReadyTimerLabel(mode);
      var expired = deadlineMs <= now;
      el.textContent = label + ": " + (expired ? "0 сек." : raffleReadyCountdownText(deadlineMs));
      el.classList.toggle("raffle-ready-timer--expired", expired);
      if (expired) {
        var refreshKeyBase = el.getAttribute("data-raffle-ready-refresh-key") || raw;
        requestRaffleTimerRefresh(refreshKeyBase + ":expired");
      } else {
        refreshRaffleTimerAtMilestones(el, now, deadlineMs);
      }
    });
  }

  function syncRaffleCompletedTimers() {
    updateRaffleCompletedTimers();
    if (!raffleCompletedTimersInterval && document.querySelector("[data-raffle-ready-deadline]")) {
      raffleCompletedTimersInterval = setInterval(updateRaffleCompletedTimers, 1000);
    }
  }

  function openRafflePrivateCashSection() {
    if (typeof setView === "function") setView("home");
    if (typeof window.openPrivateCashModal === "function") {
      window.openPrivateCashModal();
      return true;
    }
    var link = typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink("private_cash") : "";
    if (link) {
      window.location.href = link;
      return true;
    }
    return false;
  }

  function buildRaffleWinnerRowHtml(w, raffleId, isAdmin, winnerNumber) {
    var actionRaffleId = String((w && w.sourceRaffleId) || raffleId || "").trim();
    var uidRaw = String(w.userId != null ? w.userId : "").trim();
    var isManualPlaceholderUserId = typeof pokerRafflesIsManualPlaceholderUserId === "function"
      ? pokerRafflesIsManualPlaceholderUserId(uidRaw)
      : /^manual_raffle_[a-f0-9]+$/i.test(uidRaw);
    var uidAttr = escapeHtml(uidRaw);
    var fallbackWinnerNumber = parseInt(winnerNumber, 10);
    var winnerSlotId = String((w && (w.winnerReadySlotId || w.winnerSlotId)) || "").trim();
    if (!winnerSlotId && isFinite(fallbackWinnerNumber) && fallbackWinnerNumber > 0 && !raffleWinnerIsReroll(w)) {
      winnerSlotId = "initial_" + String(fallbackWinnerNumber - 1);
    }
    var winnerSlotAttr = escapeHtml(winnerSlotId);
    var status = w.winnerStatus;
    var statusIcon = status === "ok" ? " ✓" : status === "fail" ? " ✗" : "";
    var statusClass = status === "ok" ? "raffle-winner-status--ok" : status === "fail" ? "raffle-winner-status--fail" : "";
    var prizeIssued = status === "ok";
    var prizeDeclined = status === "fail";
    var winnerReady = raffleWinnerIsReady(w);
    var privateCashRegistered = !!(w && w.privateCashRegistered);
    var readyExpired = !prizeIssued && !winnerReady && raffleWinnerReadyExpired(w);
    var viewerIds = [];
    try {
      viewerIds = typeof collectRaffleIdentityIds === "function" ? collectRaffleIdentityIds() : [];
    } catch (eViewerIds) {
      viewerIds = [];
    }
    var isMyWin = !!(uidRaw && viewerIds.indexOf(uidRaw) !== -1);
    var readyBadge = prizeIssued
      ? "<span class=\"raffle-winner-ready-badge raffle-winner-ready-badge--issued\">Выдано</span>"
      : prizeDeclined
      ? "<span class=\"raffle-winner-ready-badge raffle-winner-ready-badge--declined\">Отказано</span>"
      : winnerReady
      ? "<span class=\"raffle-winner-ready-badge\">Готов</span>"
      : readyExpired
        ? "<span class=\"raffle-winner-ready-badge raffle-winner-ready-badge--missed\">Не успел</span>"
        : (isAdmin ? "<span class=\"raffle-winner-ready-badge raffle-winner-ready-badge--pending\">Не готов</span>" : "");
    var privateCashAction = isMyWin && privateCashRegistered
      ? "<span class=\"raffle-winner-private-cash-state\"><span>Заявка в резерв приватного кеша отправлена</span><button type=\"button\" class=\"raffle-winner-private-cash-btn\" data-raffle-private-cash-open=\"1\">Перейти в раздел</button></span>"
      : "";
    var readyAction = !privateCashAction && isMyWin && status !== "ok" && status !== "fail" && !readyExpired
      ? "<button type=\"button\" class=\"raffle-winner-ready-btn" +
        (winnerReady ? " raffle-winner-ready-btn--active" : "") +
        "\" data-raffle-id=\"" +
        escapeHtml(actionRaffleId) +
        "\" data-winner-user-id=\"" +
        uidAttr +
        "\" data-winner-slot-id=\"" +
        winnerSlotAttr +
        "\"" +
        (winnerReady ? " disabled aria-disabled=\"true\"" : "") +
        ">" +
        (winnerReady ? "Готов" : "Я готов") +
        "</button>"
      : "";
    var raffleIdText = w.p21Id != null && String(w.p21Id).trim()
      ? String(w.p21Id).trim()
      : (w.accountId != null && String(w.accountId).trim()
        ? String(w.accountId).trim()
        : (isManualPlaceholderUserId ? "" : uidRaw));
    var rawName = String(w.name || "").trim();
    if (rawName === "Участник") rawName = "";
    if (!isAdmin && typeof pokerRafflesLooksLikeTelegramLogin === "function" && pokerRafflesLooksLikeTelegramLogin(rawName, w.telegramUsername)) rawName = "";
    var primaryHtml = "";
    if (typeof raffleParticipantDisplayLine === "function") {
      primaryHtml = raffleParticipantDisplayLine(w, false);
    }
    if (!primaryHtml) {
      var primaryLabel = rawName || raffleIdText || (isManualPlaceholderUserId ? "" : uidRaw) || "Игрок";
      primaryHtml = escapeHtml(raffleIdText && primaryLabel !== raffleIdText ? primaryLabel + " — " + raffleIdText : primaryLabel);
    }
    var tgLogin = w.telegramUsername != null ? String(w.telegramUsername).trim().replace(/^@+/g, "") : "";
    if (!/^[A-Za-z0-9_]{5,32}$/.test(tgLogin)) tgLogin = "";
    var tgOpen = isAdmin && tgLogin
      ? "<a class=\"raffle-winner-row__tg\" href=\"https://t.me/" +
        escapeHtml(tgLogin) +
        "\" target=\"_blank\" rel=\"noopener noreferrer\">@" +
        escapeHtml(tgLogin) +
        "</a>"
      : "";
    var adminPrimaryHtml = "";
    var adminLevelLine = "";
    if (isAdmin) {
      var adminPokerNick = w && w.pokerPlusNickname != null ? String(w.pokerPlusNickname).trim() : "";
      if (adminPokerNick === "Участник") adminPokerNick = "";
      if (adminPokerNick && raffleIdText && adminPokerNick === raffleIdText) adminPokerNick = "";
      if (adminPokerNick && rawName && adminPokerNick.toLowerCase() === rawName.toLowerCase()) adminPokerNick = "";
      var adminNamePart = rawName
        ? escapeHtml(rawName) + (adminPokerNick ? " (" + escapeHtml(adminPokerNick) + ")" : "")
        : (adminPokerNick ? escapeHtml(adminPokerNick) : "");
      var adminMainLine = adminNamePart || escapeHtml(raffleIdText || (isManualPlaceholderUserId ? "" : uidRaw) || "Игрок");
      var adminIdLine = adminNamePart && raffleIdText
        ? '<span class="raffle-participant-line__id">' + escapeHtml(raffleIdText) + "</span>"
        : "";
      var adminFishLevelHtml = typeof pokerRafflesParticipantFishLevelHtml === "function"
        ? pokerRafflesParticipantFishLevelHtml(w)
        : "";
      adminPrimaryHtml =
        '<span class="raffle-participant-line raffle-participant-line--admin-compact">' +
        '<span class="raffle-participant-line__main">' +
        adminMainLine +
        "</span>" +
        adminIdLine +
        "</span>";
      adminLevelLine = adminFishLevelHtml || tgOpen
        ?
        '<span class="raffle-winner-row__admin-level-line">' +
        (adminFishLevelHtml ? '<span class="raffle-participant-line__level">' + adminFishLevelHtml + "</span>" : "") +
        tgOpen +
        "</span>"
        : "";
    }
    var profileOpen =
      uidRaw && (uidRaw.indexOf("tg_") === 0 || uidRaw.indexOf("vk_") === 0)
        ? "<button type=\"button\" class=\"raffle-participants__profile-btn raffle-winner-row__profile\" data-user-id=\"" +
          uidAttr +
          "\" data-user-name=\"" +
          escapeHtml(rawName || "") +
          "\">" +
          "<span class=\"raffle-winner-row__primary\">" +
          (adminPrimaryHtml || primaryHtml) +
          "</span>" +
          "</button>"
        : "<span class=\"raffle-winner-row__primary\">" + (adminPrimaryHtml || primaryHtml) + "</span>";
    var readyTimer = raffleWinnerHasPendingReadyDeadline(w)
      ? raffleReadyTimerHtml(
          raffleWinnerReadyTimerInfo(w, raffleId, raffleWinnerIsReroll(w) ? "burn" : "reroll"),
          raffleWinnerIsReroll(w) ? "burn" : "reroll",
          "raffle-winner-ready-timer"
        )
      : "";
    var readyTimerLine = readyTimer ? '<span class="raffle-winner-row__ready-timer-line">' + readyTimer + "</span>" : "";
    var metaItems = readyBadge;
    var profileMeta = metaItems ? "<span class=\"raffle-winner-row__meta\">" + metaItems + "</span>" : "";
    var identityClass = "raffle-winner-row__identity" + (isAdmin ? " raffle-winner-row__identity--admin" : "");
    var profileBlock = "<span class=\"raffle-winner-row__person\"><span class=\"" + identityClass + "\">" + profileOpen + (adminLevelLine || tgOpen) + readyTimerLine + "</span></span>";
    var statusHtml = "<span class=\"raffle-winner-status " + statusClass + "\">" + statusIcon + "</span>";
    var rowClass = "raffle-winner-row" +
      (isAdmin ? " raffle-winner-row--admin" : "") +
      (winnerReady && !prizeIssued ? " raffle-winner-row--ready" : "") +
      (prizeIssued ? " raffle-winner-row--issued" : "") +
      (prizeDeclined ? " raffle-winner-row--declined" : "") +
      (readyExpired ? " raffle-winner-row--missed" : "") +
      (raffleWinnerIsReroll(w) ? " raffle-winner-row--reroll" : "");
    var numberValue = parseInt(winnerNumber, 10);
    var numberHtml = isFinite(numberValue) && numberValue > 0
      ? "<span class=\"raffle-winner-row__number\" aria-hidden=\"true\">" + escapeHtml(numberValue) + "</span>"
      : "";
    if (isAdmin) {
      var okActive = status === "ok" ? " raffle-winner-btn--active" : "";
      var failActive = status === "fail" ? " raffle-winner-btn--active" : "";
      var adminControls =
        "<span class=\"raffle-winner-row__controls\">" +
        statusHtml +
        readyAction +
        "<span class=\"raffle-winner-btns\"><button type=\"button\" class=\"raffle-winner-btn raffle-winner-btn--ok" +
        okActive +
        "\" data-raffle-id=\"" +
        escapeHtml(actionRaffleId) +
        "\" data-winner-user-id=\"" +
        uidAttr +
        "\" data-winner-slot-id=\"" +
        winnerSlotAttr +
        "\" title=\"Подтвердить\">✓</button>" +
        "<button type=\"button\" class=\"raffle-winner-btn raffle-winner-btn--fail" +
        failActive +
        "\" data-raffle-id=\"" +
        escapeHtml(actionRaffleId) +
        "\" data-winner-user-id=\"" +
        uidAttr +
        "\" data-winner-slot-id=\"" +
        winnerSlotAttr +
        "\" title=\"Отклонить\">✗</button></span></span>";
      return (
        "<li class=\"" + rowClass + "\">" +
        numberHtml +
        profileBlock +
        "<span class=\"raffle-winner-row__actions raffle-winner-row__actions--admin\">" +
        profileMeta +
        adminControls +
        "</span></li>"
      );
    }
    var userActions = profileMeta || privateCashAction || readyAction || statusIcon
      ? "<span class=\"raffle-winner-row__actions raffle-winner-row__actions--user\">" +
        profileMeta +
        privateCashAction +
        "<span class=\"raffle-winner-row__controls\">" +
        statusHtml +
        readyAction +
        "</span></span>"
      : "";
    return (
      "<li class=\"" + rowClass + "\">" +
      numberHtml +
      profileBlock +
      userActions +
      "</li>"
    );
  }

  function raffleWinCountText(n) {
    var v = Math.abs(parseInt(n, 10) || 0) % 100;
    var d = v % 10;
    if (v >= 11 && v <= 19) return n + " раз";
    if (d === 1) return n + " раз";
    if (d >= 2 && d <= 4) return n + " раза";
    return n + " раз";
  }

  function raffleWinnerPrizeAmount(prize) {
    var text = prize != null ? String(prize).replace(/\u00a0|\u202f/g, " ") : "";
    if (!text) return 0;
    var currencyMatch = text.match(/(\d[\d\s]*(?:[.,]\d+)?)\s*(?:₽|р\.?|руб\.?)/i);
    if (!currencyMatch) return 0;
    var normalized = currencyMatch[1].replace(/\s+/g, "").replace(",", ".");
    var value = parseFloat(normalized);
    return isFinite(value) && value > 0 ? value : 0;
  }

  function raffleWinnerPrizeText(raffle, winner) {
    if (winner && winner.prize) return winner.prize;
    var groupIndex = winner && winner.groupIndex != null ? parseInt(winner.groupIndex, 10) : -1;
    var groups = raffle && Array.isArray(raffle.groups) ? raffle.groups : [];
    if (groupIndex >= 0 && groups[groupIndex] && groups[groupIndex].prize) return groups[groupIndex].prize;
    return "";
  }

  function raffleWinnerLeaderTotalText(amount) {
    var n = Math.round(parseFloat(amount) || 0);
    if (n <= 0) return "";
    if (typeof formatRaffleSum === "function") return formatRaffleSum(n);
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f") + " ₽";
  }

  function raffleWinnerLeaderId(w) {
    if (!w) return "";
    var p21 = w.p21Id != null ? String(w.p21Id).trim() : "";
    if (p21) return p21;
    var accountId = w.accountId != null ? String(w.accountId).trim() : "";
    if (accountId) return accountId;
    var uid = w.userId != null ? String(w.userId).trim() : "";
    return uid;
  }

  function raffleWinnerLeaderMetaText(row) {
    if (!row) return "";
    var parts = [];
    var login = row.telegramUsername != null ? String(row.telegramUsername).trim().replace(/^@+/g, "") : "";
    if (rafflesIsAdmin && login) parts.push("@" + login);
    var name = row.name != null ? String(row.name).trim() : "";
    if (!rafflesIsAdmin && typeof pokerRafflesLooksLikeTelegramLogin === "function" && pokerRafflesLooksLikeTelegramLogin(name, row.telegramUsername)) name = "";
    if (name && name !== "Участник" && parts.indexOf(name) === -1) parts.push(name);
    return parts.join(" · ");
  }

  function raffleWinnerLeaderPokerNick(row) {
    if (!row) return "";
    var nick = row.pokerPlusNickname != null ? String(row.pokerPlusNickname).trim() : "";
    if (!nick) return "";
    if (row.id != null && nick === String(row.id).trim()) return "";
    return nick;
  }

  function buildRaffleWinnerLeaderRows(completed) {
    var byId = {};
    (completed || []).forEach(function (raffle) {
      var winners = raffle && Array.isArray(raffle.winners) ? raffle.winners : [];
      winners.forEach(function (w) {
        if (raffleWinnerReadyExpired(w)) return;
        var id = raffleWinnerLeaderId(w);
        if (!id) return;
        if (!byId[id]) {
          byId[id] = {
            id: id,
            userId: w.userId != null ? String(w.userId).trim() : "",
            name: w.name != null ? String(w.name).trim() : "",
            telegramUsername: w.telegramUsername != null ? String(w.telegramUsername).trim() : "",
            pokerPlusNickname: w.pokerPlusNickname != null ? String(w.pokerPlusNickname).trim() : "",
            count: 0,
            totalPrize: 0
          };
        } else {
          if (!byId[id].name && w.name != null && String(w.name).trim()) byId[id].name = String(w.name).trim();
          if (!byId[id].telegramUsername && w.telegramUsername != null && String(w.telegramUsername).trim()) byId[id].telegramUsername = String(w.telegramUsername).trim();
          if (!byId[id].pokerPlusNickname && w.pokerPlusNickname != null && String(w.pokerPlusNickname).trim()) byId[id].pokerPlusNickname = String(w.pokerPlusNickname).trim();
          if (!byId[id].userId && w.userId != null && String(w.userId).trim()) byId[id].userId = String(w.userId).trim();
        }
        byId[id].count += 1;
        byId[id].totalPrize += raffleWinnerPrizeAmount(raffleWinnerPrizeText(raffle, w));
      });
    });
    return Object.keys(byId)
      .map(function (id) { return byId[id]; })
      .sort(function (a, b) {
        if (b.count !== a.count) return b.count - a.count;
        if ((b.totalPrize || 0) !== (a.totalPrize || 0)) return (b.totalPrize || 0) - (a.totalPrize || 0);
        return String(a.id).localeCompare(String(b.id), "ru");
      });
  }

  function raffleWinnerLeaderMonthlyGroups(completed) {
    var byMonth = {};
    var order = [];
    (completed || []).forEach(function (raffle) {
      if (!raffle || raffle.status === "cancelled") return;
      var key = raffleCompletedMonthKey(raffle);
      if (!byMonth[key]) {
        byMonth[key] = {
          key: key,
          label: raffleCompletedMonthLabel(key, raffle),
          raffles: []
        };
        order.push(key);
      }
      byMonth[key].raffles.push(raffle);
    });
    return order
      .sort(function (a, b) {
        if (a === "unknown") return 1;
        if (b === "unknown") return -1;
        return String(b).localeCompare(String(a));
      })
      .map(function (key) {
        var group = byMonth[key];
        var rows = buildRaffleWinnerLeaderRows(group.raffles);
        var totalWins = rows.reduce(function (sum, row) { return sum + (parseInt(row.count, 10) || 0); }, 0);
        return {
          key: key,
          label: group.label,
          rows: rows,
          totalWins: totalWins,
          totalPrize: raffleCompletedArchiveSum(group.raffles)
        };
      })
      .filter(function (group) {
        return group.rows.length > 0;
      });
  }

  function raffleWinnerLeadersMonthHtml(group) {
    var totalText = raffleWinnerLeaderTotalText(group.totalPrize) || "0 ₽";
    var topRows = group.rows.slice(0, RAFFLE_WINNER_LEADERS_PREVIEW_LIMIT);
    return (
      '<details class="raffle-winner-leaders-month">' +
        '<summary class="raffle-winner-leaders-month__summary">' +
          '<span class="raffle-winner-leaders-month__name">' + escapeHtml(group.label) + '</span>' +
          '<span class="raffle-winner-leaders-month__meta">' +
            '<span>' + escapeHtml(raffleWinCountText(group.totalWins)) + '</span>' +
            '<strong>Сумма ' + escapeHtml(totalText) + '</strong>' +
          '</span>' +
        '</summary>' +
        '<ol class="raffle-winner-leaders__list raffle-winner-leaders__list--month">' +
          raffleWinnerLeaderRowsHtml(topRows) +
        '</ol>' +
      '</details>'
    );
  }

  function renderRaffleWinnerLeaderMonths(completed) {
    if (!raffleWinnerLeadersMonths) return;
    var groups = raffleWinnerLeaderMonthlyGroups(completed);
    raffleWinnerLeadersMonths.innerHTML = groups.map(raffleWinnerLeadersMonthHtml).join("");
  }

  function raffleWinnerLeaderRowsHtml(rows) {
    return (rows || []).map(function (row) {
      var pokerNick = raffleWinnerLeaderPokerNick(row);
      var meta = raffleWinnerLeaderMetaText(row);
      var totalText = raffleWinnerLeaderTotalText(row.totalPrize);
      return (
        '<li class="raffle-winner-leaders__item"><span class="raffle-winner-leaders__id">' +
        escapeHtml(row.id) +
        (pokerNick ? '<span class="raffle-winner-leaders__poker-nick">Poker21: ' + escapeHtml(pokerNick) + "</span>" : "") +
        (meta ? '<span class="raffle-winner-leaders__meta">' + escapeHtml(meta) + "</span>" : "") +
        '</span><span class="raffle-winner-leaders__stats"><span class="raffle-winner-leaders__count">— ' +
        escapeHtml(raffleWinCountText(row.count)) +
        "</span>" +
        (totalText ? '<span class="raffle-winner-leaders__total">Итого: ' + escapeHtml(totalText) + "</span>" : "") +
        "</span></li>"
      );
    }).join("");
  }

  function renderRaffleWinnerLeaders(completed) {
    raffleWinnerLeaderRows = buildRaffleWinnerLeaderRows(completed);
    var hasRows = raffleWinnerLeaderRows.length > 0;
    if (raffleWinnerLeaders) {
      raffleWinnerLeaders.hidden = !hasRows;
      raffleWinnerLeaders.classList.toggle("raffle-winner-leaders--hidden", !hasRows);
    }
    if (raffleWinnerLeadersEmpty) {
      raffleWinnerLeadersEmpty.textContent = "Пока нет данных о победителях.";
      raffleWinnerLeadersEmpty.classList.toggle("raffle-empty--hidden", hasRows);
    }
    if (raffleWinnerLeadersList) {
      raffleWinnerLeadersList.innerHTML = hasRows ? raffleWinnerLeaderRowsHtml(raffleWinnerLeaderRows.slice(0, RAFFLE_WINNER_LEADERS_PREVIEW_LIMIT)) : "";
    }
    renderRaffleWinnerLeaderMonths(completed);
    if (raffleWinnerLeadersExpandBtn) {
      raffleWinnerLeadersExpandBtn.hidden = raffleWinnerLeaderRows.length <= RAFFLE_WINNER_LEADERS_PREVIEW_LIMIT;
      raffleWinnerLeadersExpandBtn.textContent = raffleWinnerLeaderRows.length > RAFFLE_WINNER_LEADERS_PREVIEW_LIMIT ? "Развернуть" : "Все показаны";
    }
  }

  function openRaffleWinnerLeadersModal() {
    if (!raffleWinnerLeadersModal || !raffleWinnerLeaderRows.length) return;
    if (raffleWinnerLeadersModalList) {
      raffleWinnerLeadersModalList.innerHTML = raffleWinnerLeaderRowsHtml(raffleWinnerLeaderRows);
    }
    raffleWinnerLeadersModal.classList.remove("raffle-winner-leaders-modal--hidden");
    raffleWinnerLeadersModal.setAttribute("aria-hidden", "false");
  }

  function closeRaffleWinnerLeadersModal() {
    if (!raffleWinnerLeadersModal) return;
    raffleWinnerLeadersModal.classList.add("raffle-winner-leaders-modal--hidden");
    raffleWinnerLeadersModal.setAttribute("aria-hidden", "true");
  }

  function raffleWinnerStatusSetButtonPending(btn, pending) {
    if (!btn) return;
    var row = btn.closest ? btn.closest(".raffle-winner-row") : null;
    var buttons = row && row.querySelectorAll ? row.querySelectorAll(".raffle-winner-btn") : [];
    if (pending) {
      if (!btn.dataset.statusIdleText) btn.dataset.statusIdleText = btn.textContent || "";
      if (row) {
        row.classList.add("raffle-winner-row--status-pending");
        row.setAttribute("aria-busy", "true");
      }
      buttons.forEach(function (item) {
        item.disabled = true;
        item.classList.toggle("raffle-winner-btn--pending", item === btn);
        if (item === btn) item.setAttribute("aria-busy", "true");
      });
      btn.textContent = "";
      btn.setAttribute("aria-busy", "true");
      return;
    }
    btn.textContent = btn.dataset.statusIdleText || "";
    if (row) {
      row.classList.remove("raffle-winner-row--status-pending");
      row.removeAttribute("aria-busy");
    }
    buttons.forEach(function (item) {
      item.disabled = false;
      item.classList.remove("raffle-winner-btn--pending");
      item.removeAttribute("aria-busy");
    });
  }

  function raffleWinnerStatusApplyLocal(btn, newStatus) {
    var row = btn && btn.closest ? btn.closest(".raffle-winner-row") : null;
    if (!row) return;
    var statusEl = row.querySelector(".raffle-winner-status");
    var okBtn = row.querySelector(".raffle-winner-btn--ok");
    var failBtn = row.querySelector(".raffle-winner-btn--fail");
    var badge = row.querySelector(".raffle-winner-ready-badge");
    if (statusEl) {
      statusEl.textContent = newStatus === "ok" ? "✓" : newStatus === "fail" ? "✗" : "";
      statusEl.classList.toggle("raffle-winner-status--ok", newStatus === "ok");
      statusEl.classList.toggle("raffle-winner-status--fail", newStatus === "fail");
    }
    if (okBtn) okBtn.classList.toggle("raffle-winner-btn--active", newStatus === "ok");
    if (failBtn) failBtn.classList.toggle("raffle-winner-btn--active", newStatus === "fail");
    row.classList.toggle("raffle-winner-row--issued", newStatus === "ok");
    row.classList.toggle("raffle-winner-row--declined", newStatus === "fail");
    if (badge) {
      if (newStatus === "ok") badge.textContent = "Выдано";
      else if (newStatus === "fail") badge.textContent = "Отказано";
      badge.classList.toggle("raffle-winner-ready-badge--issued", newStatus === "ok");
      badge.classList.toggle("raffle-winner-ready-badge--declined", newStatus === "fail");
    }
  }

  function refreshRafflesAfterWinnerAction(data) {
    if (data && data.raffle && typeof updateCompletedRaffleCache === "function") {
      updateCompletedRaffleCache(data.raffle);
    }
    if (typeof clearRafflesCache === "function") clearRafflesCache();
    loadRaffles({
      includeArchive: typeof shouldReloadCompletedArchiveAfterWinnerAction === "function" && shouldReloadCompletedArchiveAfterWinnerAction(),
      skipCache: true,
      keepCurrentOnLoading: true
    });
  }

  function setRaffleWinnerStatus(rid, wid, winnerSlotId, btnIsOk, currentStatus, onDone, btn, attempt) {
    var newStatus = btnIsOk ? "ok" : "fail";
    if ((btnIsOk && currentStatus === "ok") || (!btnIsOk && currentStatus === "fail")) newStatus = null;
    var tryIndex = Math.max(0, parseInt(attempt, 10) || 0);
    raffleWinnerStatusSetButtonPending(btn, true);
    fetch(base + "/api/raffles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerGuestOrAuthedPostBody({ action: "setWinnerStatus", raffleId: rid, winnerUserId: wid, winnerSlotId: winnerSlotId || "", status: newStatus })),
    })
      .then(function (r) {
        return r.json().catch(function () { return { ok: false, error: "Ошибка ответа сервера" }; })
          .then(function (data) {
            if (data && typeof data === "object") data.httpStatus = r.status;
            return data;
          });
      })
      .then(function (data) {
        if (data && data.ok) {
          raffleWinnerStatusApplyLocal(btn, newStatus);
          raffleWinnerStatusSetButtonPending(btn, false);
          refreshRafflesAfterWinnerAction(data);
        } else if (data && data.httpStatus === 409 && tryIndex < 2) {
          window.setTimeout(function () {
            setRaffleWinnerStatus(rid, wid, winnerSlotId, btnIsOk, currentStatus, onDone, btn, tryIndex + 1);
          }, 800 + tryIndex * 700);
          return;
        } else if (tg && tg.showAlert) {
          tg.showAlert((data && data.error) || "Не удалось обновить статус победителя.");
        }
        if (!(data && data.ok)) raffleWinnerStatusSetButtonPending(btn, false);
        if (onDone) onDone(!!(data && data.ok));
      })
      .catch(function () {
        if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        raffleWinnerStatusSetButtonPending(btn, false);
        if (onDone) onDone(false);
      });
  }

  function raffleWinnerReadySetButtonPending(btn, pending) {
    if (!btn) return;
    if (pending) {
      if (!btn.dataset.readyIdleText) btn.dataset.readyIdleText = btn.textContent || "Я готов";
      btn.textContent = "Отправляем...";
      btn.classList.add("raffle-winner-ready-btn--pending");
      btn.disabled = true;
      btn.setAttribute("aria-busy", "true");
      return;
    }
    btn.textContent = btn.dataset.readyIdleText || "Я готов";
    btn.classList.remove("raffle-winner-ready-btn--pending");
    btn.disabled = false;
    btn.removeAttribute("aria-busy");
  }

  function raffleWinnerReadyApplySuccess(btn) {
    if (!btn) return;
    var row = btn.closest ? btn.closest(".raffle-winner-row") : null;
    var badge = row && row.querySelector ? row.querySelector(".raffle-winner-ready-badge") : null;
    btn.textContent = "Готов";
    btn.disabled = true;
    btn.setAttribute("aria-disabled", "true");
    btn.removeAttribute("aria-busy");
    btn.classList.remove("raffle-winner-ready-btn--pending");
    btn.classList.add("raffle-winner-ready-btn--active");
    if (row) {
      row.classList.add("raffle-winner-row--ready");
      row.classList.remove("raffle-winner-row--missed");
    }
    if (badge) {
      badge.textContent = "Готов";
      badge.classList.remove("raffle-winner-ready-badge--pending", "raffle-winner-ready-badge--missed");
    }
  }

  function setRaffleWinnerReady(rid, wid, winnerSlotId, btn, onDone, attempt) {
    if (!rid || (!wid && !winnerSlotId) || !base) {
      if (onDone) onDone(false);
      return;
    }
    var tryIndex = Math.max(0, parseInt(attempt, 10) || 0);
    raffleWinnerReadySetButtonPending(btn, true);
    fetch(base + "/api/raffles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerGuestOrAuthedPostBody({ action: "setWinnerReady", raffleId: rid, winnerUserId: wid, winnerSlotId: winnerSlotId || "" })),
    })
      .then(function (r) {
        return r.json().catch(function () { return { ok: false, error: "Ошибка ответа сервера" }; })
          .then(function (data) {
            if (data && typeof data === "object") data.httpStatus = r.status;
            return data;
          });
      })
      .then(function (data) {
        if (data && data.ok) {
          raffleWinnerReadyApplySuccess(btn);
          refreshRafflesAfterWinnerAction(data);
        } else if (data && data.httpStatus === 409 && tryIndex < 2) {
          window.setTimeout(function () {
            setRaffleWinnerReady(rid, wid, winnerSlotId, btn, onDone, tryIndex + 1);
          }, 800 + tryIndex * 700);
          return;
        } else if (tg && tg.showAlert) {
          tg.showAlert((data && data.error) || "Не удалось подтвердить готовность.");
        }
        if (!(data && data.ok)) raffleWinnerReadySetButtonPending(btn, false);
        if (onDone) onDone(!!(data && data.ok));
      })
      .catch(function () {
        if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        raffleWinnerReadySetButtonPending(btn, false);
        if (onDone) onDone(false);
      });
  }

  function bindRaffleWinnerStatusButtons(container, raffleId) {
    if (!container || !base) return;
    syncRaffleCompletedTimers();
    container.querySelectorAll(".raffle-winner-ready-btn").forEach(function (btn) {
      if (btn.dataset.readyBound === "1") return;
      btn.dataset.readyBound = "1";
      btn.addEventListener("click", function () {
        if (btn.disabled) return;
        var rid = this.getAttribute("data-raffle-id") || raffleId;
        var wid = this.getAttribute("data-winner-user-id");
        var winnerSlotId = this.getAttribute("data-winner-slot-id") || "";
        if (!rid || (!wid && !winnerSlotId)) return;
        btn.disabled = true;
        setRaffleWinnerReady(rid, wid, winnerSlotId, btn, function (ok) { if (!ok) btn.disabled = false; });
      });
    });
    if (!rafflesIsAdmin) return;
    container.querySelectorAll(".raffle-winner-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var rid = this.getAttribute("data-raffle-id");
        var wid = this.getAttribute("data-winner-user-id");
        var winnerSlotId = this.getAttribute("data-winner-slot-id") || "";
        var row = this.closest(".raffle-winner-row");
        var statusEl = row && row.querySelector(".raffle-winner-status");
        var currentStatus = statusEl && statusEl.classList.contains("raffle-winner-status--ok") ? "ok" : statusEl && statusEl.classList.contains("raffle-winner-status--fail") ? "fail" : null;
        if (!rid || (!wid && !winnerSlotId)) return;
        setRaffleWinnerStatus(rid, wid, winnerSlotId, this.classList.contains("raffle-winner-btn--ok"), currentStatus, function (ok) { if (!ok) btn.disabled = false; }, btn);
      });
    });
  }


  function raffleCompletedRerollPlacement(originalWinners, rerollWinners) {
    var identityToPrimary = {};
    var byOriginal = {};
    var attachToPrimary = function (winner, primary) {
      if (!winner || !primary) return;
      raffleWinnerRenderKeys(winner).forEach(function (key) {
        identityToPrimary[key] = primary;
      });
      var slotKey = raffleWinnerRenderKey("slot", winner.winnerReadySlotId || winner.winnerSlotId);
      if (slotKey) identityToPrimary[slotKey] = primary;
    };
    (Array.isArray(originalWinners) ? originalWinners : []).forEach(function (winner) {
      var primary = raffleWinnerPrimaryRenderKey(winner);
      if (!primary) return;
      byOriginal[primary] = [];
      attachToPrimary(winner, primary);
    });
    var orphanRerolls = [];
    var pending = (Array.isArray(rerollWinners) ? rerollWinners : []).slice();
    while (pending.length) {
      var nextPending = [];
      var placedAny = false;
      pending.forEach(function (winner) {
        var sourceKeys = raffleWinnerRerollSourceKeys(winner);
        var primary = "";
        sourceKeys.some(function (key) {
          if (identityToPrimary[key]) {
            primary = identityToPrimary[key];
            return true;
          }
          return false;
        });
        if (primary) {
          byOriginal[primary].push(winner);
          attachToPrimary(winner, primary);
          placedAny = true;
        } else {
          nextPending.push(winner);
        }
      });
      if (!placedAny) {
        orphanRerolls = orphanRerolls.concat(nextPending);
        break;
      }
      pending = nextPending;
    }
    return {
      byOriginal: byOriginal,
      orphanRerolls: orphanRerolls
    };
  }

  function raffleCompletedRerollRowsHtml(raffle, rows, winnerNumber) {
    if (!Array.isArray(rows) || !rows.length) return "";
    var actionRaffleId = raffle && (raffle.sourceRaffleId || raffle.id);
    var html =
      "<li class=\"raffle-winner-reroll-nest\">" +
      "<span class=\"raffle-winner-reroll-arrow\" aria-hidden=\"true\">" +
      "<span class=\"raffle-winner-reroll-arrow__label\">Рерролл</span>" +
      "</span><ul class=\"raffle-winner-reroll-list\">";
    rows.forEach(function (w) {
      html += buildRaffleWinnerRowHtml(w, actionRaffleId, rafflesIsAdmin, winnerNumber);
    });
    html += "</ul></li>";
    return html;
  }

  function raffleCompletedGroupResultTime(raffle, groupIndex, fallbackIndex) {
    var batches = Array.isArray(raffle && raffle.resultBatches) ? raffle.resultBatches : [];
    if (!batches.length) {
      return String(raffle && raffle.resultBatchTime || "").trim();
    }
    var targetGroupIndex = parseInt(String(groupIndex != null ? groupIndex : fallbackIndex), 10);
    var matched = batches.find(function (batch, index) {
      if (!batch) return false;
      var indexes = Array.isArray(batch.groupIndexes) ? batch.groupIndexes : [index];
      return indexes.map(function (value) { return parseInt(String(value), 10); }).indexOf(targetGroupIndex) !== -1;
    }) || batches[fallbackIndex] || null;
    return String(matched && matched.time || "").trim();
  }

  function raffleCompletedGroupTabLabel(groupName, prize) {
    var text = prize ? raffleDisplayPrizeText(prize) : groupName;
    text = String(text || groupName || "Группа").trim();
    text = text
      .replace(/\s+бонус\s+гейм\b/ig, "")
      .replace(/\s+/g, " ")
      .trim();
    return text || groupName || "Группа";
  }

  function raffleCompletedGroupTabContentHtml(raffle, group, index) {
    var label = raffleCompletedGroupTabLabel(group.name, group.prize);
    var time = raffleCompletedGroupResultTime(raffle, group.groupIndex, index);
    return '<span class="raffle-winner-groups-tabs__tab-text">' +
      escapeHtml(label) +
      "</span>" +
      (time
        ? '<span class="raffle-winner-groups-tabs__tab-time">Итоги ' + escapeHtml(time) + "</span>"
        : "");
  }

  function raffleCompletedWinnerGroupRowsHtml(raffle, rows, rerollsByOriginal) {
    var html = "";
    var actionRaffleId = raffle && (raffle.sourceRaffleId || raffle.id);
    (Array.isArray(rows) ? rows : []).forEach(function (w, index) {
      var winnerNumber = index + 1;
      html += buildRaffleWinnerRowHtml(w, actionRaffleId, rafflesIsAdmin, winnerNumber);
      if (!raffleWinnerIsReroll(w)) {
        var key = raffleWinnerPrimaryRenderKey(w);
        html += raffleCompletedRerollRowsHtml(raffle, key && rerollsByOriginal ? rerollsByOriginal[key] : [], winnerNumber);
      }
    });
    return html;
  }

  function raffleCompletedWinnerGroupsTabsHtml(raffle, groups, rerollsByOriginal) {
    var raffleKey = String((raffle && (raffle.id || raffle.completedNumber)) || "completed").replace(/[^A-Za-z0-9_-]/g, "-");
    var rawRaffleKey = raffleCompletedWinnerTabsKey(raffle);
    var activeIndex = raffleCompletedWinnerTabIndex(raffleCompletedActiveWinnerTabs[rawRaffleKey], groups.length);
    var tabsHtml = "";
    var panelsHtml = "";
    groups.forEach(function (group, index) {
      var active = index === activeIndex;
      var tabId = "raffleWinnersTab-" + raffleKey + "-" + index;
      var panelId = "raffleWinnersPanel-" + raffleKey + "-" + index;
      tabsHtml += "<button type=\"button\" class=\"raffle-winner-groups-tabs__tab" +
        (active ? " raffle-winner-groups-tabs__tab--active" : "") +
        "\" id=\"" +
        escapeHtml(tabId) +
        "\" role=\"tab\" aria-selected=\"" +
        (active ? "true" : "false") +
        "\" aria-controls=\"" +
        escapeHtml(panelId) +
        "\" data-raffle-winner-tab=\"" +
        escapeHtml(String(index)) +
        "\">" +
        raffleCompletedGroupTabContentHtml(raffle, group, index) +
        "</button>";
      panelsHtml += "<div class=\"raffle-winner-groups-tabs__panel" +
        (active ? " raffle-winner-groups-tabs__panel--active" : "") +
        "\" id=\"" +
        escapeHtml(panelId) +
        "\" role=\"tabpanel\" aria-labelledby=\"" +
        escapeHtml(tabId) +
        "\"" +
        (active ? "" : " hidden") +
        " data-raffle-winner-panel=\"" +
        escapeHtml(String(index)) +
        "\"><ul>" +
        raffleCompletedWinnerGroupRowsHtml(raffle, group.rows, rerollsByOriginal) +
        "</ul></div>";
    });
    return "<li class=\"raffle-winner-groups-tabs\" data-raffle-winner-tabs-key=\"" +
      escapeHtml(rawRaffleKey) +
      "\"><div class=\"raffle-winner-groups-tabs__tabs\" role=\"tablist\">" +
      tabsHtml +
      "</div><div class=\"raffle-winner-groups-tabs__panels\">" +
      panelsHtml +
      "</div></li>";
  }

  function raffleCompletedWinnerGroupsHtml(raffle, winners, rerollsByOriginal, orphanRerolls) {
    var rows = Array.isArray(winners) ? winners : [];
    var fallbackRerolls = Array.isArray(orphanRerolls) ? orphanRerolls : [];
    var byGroup = {};
    rows.concat(fallbackRerolls).forEach(function (w) {
      var g = w.groupIndex >= 0 ? "Группа " + (w.groupIndex + 1) : "Без группы";
      if (!byGroup[g]) byGroup[g] = [];
      byGroup[g].push(w);
    });
    var groupKeys = Object.keys(byGroup);
    var groups = groupKeys.map(function (g) {
      var groupRows = byGroup[g] || [];
      var firstGroupIndex = groupRows[0] && groupRows[0].groupIndex >= 0 ? parseInt(String(groupRows[0].groupIndex), 10) : -1;
      return {
        name: g,
        prize: groupRows[0] && groupRows[0].prize ? groupRows[0].prize : "",
        groupIndex: firstGroupIndex,
        rows: groupRows
      };
    });
    if (groups.length > 1) return raffleCompletedWinnerGroupsTabsHtml(raffle, groups, rerollsByOriginal);
    return groups.map(function (group) {
      return "<li class=\"raffle-winner-group\"><strong>" +
        escapeHtml(group.name) +
        (group.prize ? ": " + escapeHtml(raffleDisplayPrizeText(group.prize)) : "") +
        "</strong><ul>" +
        raffleCompletedWinnerGroupRowsHtml(raffle, group.rows, rerollsByOriginal) +
        "</ul></li>";
    }).join("");
  }

  function raffleCompletedBurnedSummaryHtml(raffle) {
    var summary = raffle && raffle.readyBurned && typeof raffle.readyBurned === "object" ? raffle.readyBurned : null;
    if (!summary) return "";
    var items = Array.isArray(summary.items) ? summary.items : [];
    var count = parseInt(summary.count, 10) || items.length || 0;
    if (count <= 0) return "";
    var amount = parseFloat(summary.totalPrizeAmount);
    if (!isFinite(amount) && items.length) {
      amount = items.reduce(function (sum, item) { return sum + (parseFloat(item && item.prizeAmount) || 0); }, 0);
    }
    if (!isFinite(amount)) amount = 0;
    var amountText = typeof formatRaffleSum === "function"
      ? formatRaffleSum(amount)
      : String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f") + " ₽";
    return "<div class=\"raffle-burned-summary\"><span>Выигрыши сгорели</span><strong>" +
      escapeHtml(count) +
      "</strong><span>Сумма</span><strong>" +
      escapeHtml(amountText) +
      "</strong></div>";
  }

  function completedRaffleBatchFromSource(sourceRaffle, batchIndex, fallbackBatch) {
    var source = sourceRaffle || {};
    var batches = Array.isArray(source.resultBatches) ? source.resultBatches : [];
    var index = parseInt(batchIndex, 10);
    if (!isFinite(index) || index < 0 || !batches[index]) return fallbackBatch || source;
    var batch = batches[index];
    var groupIndexes = Array.isArray(batch && batch.groupIndexes) ? batch.groupIndexes : [index];
    var groups = {};
    groupIndexes.forEach(function (rawIndex) {
      var n = parseInt(String(rawIndex), 10);
      if (isFinite(n)) groups[n] = true;
    });
    var winners = (Array.isArray(source.winners) ? source.winners : []).filter(function (winner) {
      var n = parseInt(String(winner && winner.groupIndex != null ? winner.groupIndex : ""), 10);
      return isFinite(n) && groups[n];
    }).map(function (winner) {
      return Object.assign({}, winner, { sourceRaffleId: source.id });
    });
    return Object.assign({}, source, {
      id: (fallbackBatch && fallbackBatch.id) || (String(source.id || "raffle") + "__batch_" + index),
      sourceRaffleId: source.id,
      status: "completed",
      completedAt: batch.drawnAt || batch.endDate || source.completedAt || source.endDate,
      drawnAt: batch.drawnAt || batch.endDate || source.drawnAt || source.endDate,
      endDate: batch.endDate || source.endDate,
      resultBatchLabel: String(batch.label || "").trim(),
      resultBatchTime: String(batch.time || "").trim(),
      resultBatchIndex: index,
      winners: winners
    });
  }

  function buildCompletedRaffleCardHtml(raffle) {
    var created = raffle.createdAt ? new Date(raffle.createdAt).toLocaleDateString("ru-RU") : "";
    var completedAt = raffleCompletedDate(raffle);
    var end = completedAt ? completedAt.toLocaleString("ru-RU") : "";
    var batchLabel = String(raffle && raffle.resultBatchLabel || "").trim();
    var batchTime = String(raffle && raffle.resultBatchTime || "").trim();
    var meta = (batchLabel || "Розыгрыш") + (batchTime ? " · " + batchTime + " МСК" : "") + (created ? " от " + created : "") + (end ? " · Завершён " + end : "");
    var winners = raffle.winners || [];
    var originalWinners = [];
    var rerollWinners = [];
    winners.forEach(function (w) {
      if (raffleWinnerIsReroll(w)) rerollWinners.push(w);
      else originalWinners.push(w);
    });
    var rerollPlacement = raffleCompletedRerollPlacement(originalWinners, rerollWinners);
    var winHtml = raffleCompletedWinnerGroupsHtml(raffle, originalWinners, rerollPlacement.byOriginal, rerollPlacement.orphanRerolls);
    var rerollTimerInfo = nearestRaffleReadyTimerInfo(originalWinners, raffle.id, "reroll");
    var rerollTimerHtml = rerollTimerInfo
      ? raffleReadyTimerHtml(rerollTimerInfo, "reroll", "raffle-completed-card__timer")
      : "";
    var burnedHtml = raffleCompletedBurnedSummaryHtml(raffle);
    var refreshRaffleId = String((raffle && (raffle.sourceRaffleId || raffle.id)) || "");
    var batchIndex = raffle && raffle.resultBatchIndex != null ? String(raffle.resultBatchIndex) : "";
    var deleteHtml = rafflesIsAdmin && !raffle.resultBatchLabel
      ? "<button type=\"button\" class=\"raffle-completed-card__delete-btn\" data-raffle-id=\"" +
        escapeHtml(raffle.id || "") + "\">Удалить розыгрыш (админ)</button>"
      : "";
    var adminActionsHtml = rafflesIsAdmin
      ? "<div class=\"raffle-completed-card__actions\"><button type=\"button\" class=\"raffle-completed-card__refresh-btn\" data-raffle-id=\"" +
        escapeHtml(refreshRaffleId) +
        "\" data-raffle-batch-index=\"" +
        escapeHtml(batchIndex) +
        "\">Обновить</button>" + deleteHtml + "</div>"
      : "";
    return "<div class=\"raffle-completed-card\" data-raffle-id=\"" + escapeHtml(raffle.id || "") + "\" data-raffle-number=\"" + escapeHtml(raffle.completedNumber || "") + "\"><p class=\"raffle-completed-card__meta\">" + escapeHtml(meta) + "</p>" +
      rerollTimerHtml +
      adminActionsHtml +
      (winHtml ? "<p class=\"raffle-completed-card__winners-title\">Победители</p><ul class=\"raffle-completed-card__winners\">" + winHtml + "</ul>" : "") +
      burnedHtml + "</div>";
  }

  function raffleCompletedDate(raffle) {
    var raw = raffle && (raffle.drawnAt || raffle.completedAt || raffle.completed_at || raffle.endDate || raffle.createdAt);
    if (!raw) return null;
    var d = new Date(raw);
    return isFinite(d.getTime()) ? d : null;
  }

  function raffleCompletedSortValue(raffle) {
    var d = raffleCompletedDate(raffle);
    return d ? d.getTime() : 0;
  }

  function sortCompletedRafflesNewestFirst(items) {
    return (Array.isArray(items) ? items.slice() : []).sort(function (a, b) {
      var timeDiff = raffleCompletedSortValue(b) - raffleCompletedSortValue(a);
      if (timeDiff) return timeDiff;
      return (parseInt(b && b.completedNumber, 10) || 0) - (parseInt(a && a.completedNumber, 10) || 0);
    });
  }

  function raffleCompletedMonthKey(raffle) {
    var d = raffleCompletedDate(raffle);
    if (!d) return "unknown";
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
  }

  function raffleCompletedMonthLabel(key, raffle) {
    var d = raffleCompletedDate(raffle);
    if (!d && key !== "unknown") {
      var parts = String(key || "").split("-");
      if (parts.length === 2) d = new Date(parseInt(parts[0], 10), (parseInt(parts[1], 10) || 1) - 1, 1);
    }
    if (!d || !isFinite(d.getTime())) return "Без даты";
    try {
      var label = d.toLocaleDateString("ru-RU", { month: "long", year: "numeric" });
      return label ? label.charAt(0).toUpperCase() + label.slice(1) : "Без даты";
    } catch (eMonthLabel) {
      return String(d.getMonth() + 1).padStart(2, "0") + "." + d.getFullYear();
    }
  }

  function raffleCompletedArchiveSum(items) {
    return (Array.isArray(items) ? items : []).reduce(function (sum, raffle) {
      var amount = raffleCompletedPrizeSum(raffle);
      return sum + (isFinite(amount) ? amount : 0);
    }, 0);
  }

  function raffleCompletedMonthTotalsByKey(items) {
    var byMonth = {};
    (Array.isArray(items) ? items : []).forEach(function (raffle) {
      var key = raffleCompletedMonthKey(raffle);
      if (!byMonth[key]) byMonth[key] = { count: 0, sum: 0 };
      byMonth[key].count += 1;
      byMonth[key].sum += raffleCompletedPrizeSum(raffle);
    });
    return byMonth;
  }

  function raffleCompletedPrizeSum(raffle) {
    var amount = typeof getRaffleTotalPrize === "function" ? parseFloat(getRaffleTotalPrize(raffle)) : 0;
    if (isFinite(amount) && amount > 0) return amount;
    var winners = raffle && Array.isArray(raffle.winners) ? raffle.winners : [];
    var total = winners.reduce(function (sum, winner) {
      if (raffleWinnerIsReroll(winner)) return sum;
      return sum + raffleWinnerPrizeAmount(raffleWinnerPrizeText(raffle, winner));
    }, 0);
    if (total > 0) return total;
    var groups = raffle && Array.isArray(raffle.groups) ? raffle.groups : [];
    return groups.reduce(function (sum, group) {
      var count = Math.max(0, parseInt(group && group.count, 10) || 0);
      var nominal = raffleWinnerPrizeAmount(group && group.prize);
      return sum + (nominal > 0 ? nominal * (count || 1) : 0);
    }, 0);
  }

  function raffleCompletedArchiveBadgeHtml(items, totals) {
    var list = Array.isArray(items) ? items : [];
    var count = totals && isFinite(parseFloat(totals.count)) ? Math.max(0, parseInt(totals.count, 10) || 0) : list.length;
    var sum = totals && isFinite(parseFloat(totals.sum)) ? parseFloat(totals.sum) : raffleCompletedArchiveSum(list);
    var sumText = typeof formatRaffleSum === "function"
      ? formatRaffleSum(sum)
      : String(Math.round(sum)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f") + " ₽";
    return "<span class=\"raffles-completed-spoiler__count\">" +
      "<span class=\"raffles-completed-spoiler__count-number\">" + escapeHtml(count) + "</span>" +
      "<span class=\"raffles-completed-spoiler__sum\">" + escapeHtml(sumText) + "</span>" +
      "</span>";
  }

  function buildCompletedArchiveHtml(archive, monthTotalsByKey) {
    archive = sortCompletedRafflesNewestFirst(archive);
    if (!archive.length) return "";
    var byMonth = {};
    var order = [];
    archive.forEach(function (raffle) {
      var key = raffleCompletedMonthKey(raffle);
      if (!byMonth[key]) {
        byMonth[key] = [];
        order.push(key);
      }
      byMonth[key].push(raffle);
    });
    var monthsHtml = order.map(function (key) {
      var items = byMonth[key] || [];
      var first = items[0] || null;
      return "<details class=\"raffles-completed-archive-month\">" +
        "<summary class=\"raffles-completed-archive-month__summary\">" +
        "<span class=\"raffles-completed-archive-month__title\">" + escapeHtml(raffleCompletedMonthLabel(key, first)) + "</span>" +
        raffleCompletedArchiveBadgeHtml(items, monthTotalsByKey && monthTotalsByKey[key]) +
        "</summary>" +
        "<div class=\"raffles-completed-archive-month__body\">" +
        items.map(buildCompletedRaffleCardHtml).join("") +
        "</div>" +
        "</details>";
    }).join("");
    return "<details class=\"raffles-completed-spoiler raffles-completed-archive\">" +
      "<summary class=\"raffles-completed-spoiler__summary\">" +
      "<span class=\"raffles-completed-spoiler__title\">Архив</span>" +
      raffleCompletedArchiveBadgeHtml(archive) +
      "</summary>" +
      "<div class=\"raffles-completed-spoiler__body raffles-completed-archive__body\">" +
      monthsHtml +
      "</div>" +
      "</details>";
  }

  function buildCompletedRafflesListHtml(completed) {
    var list = sortCompletedRafflesNewestFirst(completed);
    if (list.length <= 0) return "";
    var currentHtml = list.slice(0, 2).map(buildCompletedRaffleCardHtml).join("");
    var archive = list.slice(2);
    return currentHtml + buildCompletedArchiveHtml(archive, raffleCompletedMonthTotalsByKey(list));
  }

  function refreshCompletedRaffleCard(refreshBtn) {
    if (!refreshBtn || refreshBtn.disabled) return;
    if (!base || !pokerApiHasCredential()) {
      if (tg && tg.showAlert) tg.showAlert("Откройте приложение в Telegram.");
      return;
    }
    var raffleId = refreshBtn.getAttribute("data-raffle-id") || "";
    var batchIndex = refreshBtn.getAttribute("data-raffle-batch-index") || "";
    var card = refreshBtn.closest(".raffle-completed-card");
    if (!raffleId || !card) return;
    refreshBtn.disabled = true;
    refreshBtn.textContent = "Обновляю";
    var query = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
    var url = base + "/api/raffles" + query + "&id=" + encodeURIComponent(raffleId) + "&_t=" + Date.now();
    fetch(url)
      .then(function (r) {
        return r.json().catch(function () { return { ok: false, error: "Ошибка ответа сервера" }; });
      })
      .then(function (data) {
        if (!data || !data.ok || !data.raffle) {
          refreshBtn.disabled = false;
          refreshBtn.textContent = "Обновить";
          if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Не удалось обновить розыгрыш");
          return;
        }
        if (typeof updateCompletedRaffleCache === "function") updateCompletedRaffleCache(data.raffle);
        var currentBatch = null;
        if (batchIndex !== "") {
          currentBatch = {
            id: card.getAttribute("data-raffle-id") || "",
            completedNumber: card.getAttribute("data-raffle-number") || ""
          };
        }
        var nextRaffle = batchIndex !== ""
          ? completedRaffleBatchFromSource(data.raffle, batchIndex, currentBatch)
          : data.raffle;
        var nextHtml = buildCompletedRaffleCardHtml(nextRaffle);
        var wrap = document.createElement("div");
        wrap.innerHTML = nextHtml;
        var nextCard = wrap.firstElementChild;
        if (nextCard) {
          card.replaceWith(nextCard);
          syncRaffleCompletedTimers();
        }
      })
      .catch(function () {
        refreshBtn.disabled = false;
        refreshBtn.textContent = "Обновить";
        if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
      });
  }

        function renderCompletedRafflesPanel(completed) {
          renderRaffleWinnerLeaders(completed);
          if (!rafflesCompleted) return;
          if (completed.length > 0) {
            if (rafflesCompletedEmpty) rafflesCompletedEmpty.classList.add("raffle-empty--hidden");
            rafflesCompleted.innerHTML = buildCompletedRafflesListHtml(completed);
            syncRaffleCompletedTimers();
          } else {
            rafflesCompleted.innerHTML = "";
            if (rafflesCompletedEmpty) rafflesCompletedEmpty.classList.remove("raffle-empty--hidden");
            syncRaffleCompletedTimers();
          }
        }


    if (raffleWinnerLeadersExpandBtn) raffleWinnerLeadersExpandBtn.addEventListener("click", openRaffleWinnerLeadersModal);
    if (raffleWinnerLeadersModalClose) raffleWinnerLeadersModalClose.addEventListener("click", closeRaffleWinnerLeadersModal);
    if (raffleWinnerLeadersModalBackdrop) raffleWinnerLeadersModalBackdrop.addEventListener("click", closeRaffleWinnerLeadersModal);

  if (rafflesCompleted) {
    rafflesCompleted.addEventListener("click", function (e) {
      var groupTab = e.target.closest("[data-raffle-winner-tab]");
      if (groupTab) {
        var tabsRoot = groupTab.closest(".raffle-winner-groups-tabs");
        var tabIndex = groupTab.getAttribute("data-raffle-winner-tab") || "0";
        if (!tabsRoot) return;
        var tabsKey = raffleCompletedWinnerTabsDomKey(groupTab);
        if (tabsKey) raffleCompletedActiveWinnerTabs[tabsKey] = String(raffleCompletedWinnerTabIndex(tabIndex, tabsRoot.querySelectorAll("[data-raffle-winner-tab]").length));
        tabsRoot.querySelectorAll("[data-raffle-winner-tab]").forEach(function (tab) {
          var active = tab === groupTab;
          tab.classList.toggle("raffle-winner-groups-tabs__tab--active", active);
          tab.setAttribute("aria-selected", active ? "true" : "false");
        });
        tabsRoot.querySelectorAll("[data-raffle-winner-panel]").forEach(function (panel) {
          var activePanel = panel.getAttribute("data-raffle-winner-panel") === tabIndex;
          panel.classList.toggle("raffle-winner-groups-tabs__panel--active", activePanel);
          panel.hidden = !activePanel;
        });
        return;
      }
      var privateCashBtn = e.target.closest("[data-raffle-private-cash-open]");
      if (privateCashBtn) {
        openRafflePrivateCashSection();
        return;
      }
      var readyBtn = e.target.closest(".raffle-winner-ready-btn");
      if (readyBtn) {
        if (readyBtn.disabled) return;
        var readyRid = readyBtn.getAttribute("data-raffle-id");
        var readyWid = readyBtn.getAttribute("data-winner-user-id");
        var readySlotId = readyBtn.getAttribute("data-winner-slot-id") || "";
        if (!readyRid || (!readyWid && !readySlotId)) return;
        try {
          if (typeof window.playPokerDailyDealSound === "function") window.playPokerDailyDealSound();
          else if (typeof window.playDailyPokerDealSound === "function") window.playDailyPokerDealSound();
        } catch (eReadySound) {}
        rememberRaffleCompletedWinnerTab(readyBtn);
        readyBtn.disabled = true;
        setRaffleWinnerReady(readyRid, readyWid, readySlotId, readyBtn, function (ok) { if (!ok) readyBtn.disabled = false; });
        return;
      }
      var winnerBtn = e.target.closest(".raffle-winner-btn");
      if (winnerBtn && rafflesIsAdmin) {
        if (!base || !pokerApiHasCredential()) {
          if (tg && tg.showAlert) tg.showAlert("Откройте приложение в Telegram.");
          return;
        }
        var rid = winnerBtn.getAttribute("data-raffle-id");
        var wid = winnerBtn.getAttribute("data-winner-user-id");
        var winnerSlotId = winnerBtn.getAttribute("data-winner-slot-id") || "";
        var row = winnerBtn.closest(".raffle-winner-row");
        var statusEl = row && row.querySelector(".raffle-winner-status");
        var currentStatus = statusEl && statusEl.classList.contains("raffle-winner-status--ok") ? "ok" : statusEl && statusEl.classList.contains("raffle-winner-status--fail") ? "fail" : null;
        if (rid && (wid || winnerSlotId)) {
          rememberRaffleCompletedWinnerTab(winnerBtn);
          winnerBtn.disabled = true;
          setRaffleWinnerStatus(rid, wid, winnerSlotId, winnerBtn.classList.contains("raffle-winner-btn--ok"), currentStatus, function (ok) { if (!ok) winnerBtn.disabled = false; }, winnerBtn);
        }
        return;
      }
      if (!rafflesIsAdmin) return;
      var refreshBtn = e.target.closest(".raffle-completed-card__refresh-btn");
      if (refreshBtn) {
        refreshCompletedRaffleCard(refreshBtn);
        return;
      }
      var btn = e.target.closest(".raffle-completed-card__delete-btn");
      if (!btn) return;
      if (!base || !pokerApiHasCredential()) {
        if (tg && tg.showAlert) tg.showAlert("Откройте приложение в Telegram.");
        return;
      }
      var raffleId = btn.getAttribute("data-raffle-id") || "";
      if (!raffleId) return;
      var doDelete = function () {
        var deletingRaffleId = raffleId;
        btn.disabled = true;
        fetch(base + "/api/raffles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pokerGuestOrAuthedPostBody({ action: "delete", raffleId: deletingRaffleId })),
        })
          .then(function (r) {
            return r.json().catch(function () { return { ok: false, error: "Ошибка ответа сервера" }; });
          })
          .then(function (data) {
            btn.disabled = false;
            if (data && data.ok) {
              if (rafflesFocusedActiveId === deletingRaffleId) focusRaffleAfterMutation(null);
              clearRafflesCache();
              if (tg && tg.showAlert) tg.showAlert("Розыгрыш удалён");
              loadRaffles();
            } else if (tg && tg.showAlert) {
              tg.showAlert((data && data.error) || "Ошибка удаления розыгрыша");
            }
          })
          .catch(function () {
            btn.disabled = false;
            if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
          });
      };
      confirmRaffleAdminAction("Удалить этот завершённый розыгрыш окончательно?", doDelete);
    });
  }





    return {
      renderPanel: renderCompletedRafflesPanel,
      buildWinnerRowHtml: buildRaffleWinnerRowHtml,
      bindWinnerStatusButtons: bindRaffleWinnerStatusButtons
    };
  }
}
