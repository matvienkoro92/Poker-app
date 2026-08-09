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
    var raffleCompletedActiveRecentKey = "";
    var raffleCurrentWeekReturns = null;
    var raffleCurrentWeekIssueTotalsServer = null;

  function raffleCurrentWeekReturnsHtml() {
    if (!raffleCurrentWeekReturns || !isFinite(Number(raffleCurrentWeekReturns.amount))) return "";
    var amount = Math.max(0, Math.round(Number(raffleCurrentWeekReturns.amount) || 0));
    return "<span class=\"raffle-winner-week-returns\" title=\"Все возвраты с розыгрышей за текущую неделю\">" +
      "Возвраты недели: <b>" + escapeHtml(amount.toLocaleString("ru-RU")) + " ₽</b></span>";
  }

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
    var retryUntilSettled = /:expired$/.test(key);
    if (!retryUntilSettled && key && raffleCompletedTimerRefreshMarks[key]) return;
    var now = Date.now();
    var retryState = retryUntilSettled && key && raffleCompletedTimerRefreshMarks[key];
    if (retryState && typeof retryState === "object" && now < retryState.nextAt) return;
    if (now < raffleCompletedTimerRefreshAfter) return;
    // Milestone refreshes only need to run once. An expired deadline must keep
    // polling: the first request can race the server-side reroll lock or fail
    // while the stale winner card is still displayed.
    if (retryUntilSettled && key) {
      var attempts = retryState && typeof retryState === "object" ? (parseInt(retryState.attempts, 10) || 0) + 1 : 1;
      var retryDelayMs = Math.min(30000, 7000 * Math.pow(2, Math.min(attempts - 1, 3)));
      raffleCompletedTimerRefreshMarks[key] = { attempts: attempts, nextAt: now + retryDelayMs };
    } else if (key) {
      raffleCompletedTimerRefreshMarks[key] = true;
    }
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
        var winnerRow = el.closest ? el.closest(".raffle-winner-row") : null;
        var readyBtn = winnerRow && winnerRow.querySelector ? winnerRow.querySelector(".raffle-winner-ready-btn") : null;
        if (readyBtn && !readyBtn.classList.contains("raffle-winner-ready-btn--active")) {
          readyBtn.disabled = true;
          readyBtn.setAttribute("aria-disabled", "true");
          readyBtn.textContent = "Время вышло";
        }
        var refreshKeyBase = el.getAttribute("data-raffle-ready-refresh-key") || raw;
        var timerVisible = typeof el.getClientRects !== "function" || el.getClientRects().length > 0;
        if (!document.hidden && timerVisible) requestRaffleTimerRefresh(refreshKeyBase + ":expired");
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
      var seatStatus = String(w.winnerSeatStatus || "");
      var cashoutStatus = String(w.winnerCashoutStatus || "");
      var cashoutAmount = Math.max(0, Number(w.winnerCashoutAmount) || 0);
      var followupAttrs =
        " data-raffle-id=\"" + escapeHtml(actionRaffleId) + "\"" +
        " data-winner-user-id=\"" + uidAttr + "\"" +
        " data-winner-slot-id=\"" + winnerSlotAttr + "\"";
      var followupHtml = "";
      var reminderSent = !!w.winnerReadyReminderSentAt;
      var reminderHtml = !winnerReady && !readyExpired && !prizeIssued && !prizeDeclined && raffleWinnerHasPendingReadyDeadline(w)
        ? "<button type=\"button\" class=\"raffle-winner-remind-btn" + (reminderSent ? " raffle-winner-remind-btn--sent" : "") + "\" data-raffle-winner-remind=\"1\"" +
          " data-raffle-id=\"" + escapeHtml(actionRaffleId) + "\"" +
          " data-winner-user-id=\"" + uidAttr + "\"" +
          " data-winner-slot-id=\"" + winnerSlotAttr + "\"" +
          (reminderSent ? " disabled aria-disabled=\"true\"" : "") + ">" +
          (reminderSent ? "✓ Отправлено" : "Напомнить") + "</button>"
        : "";
      if (prizeIssued) {
        var seatButton =
          "<button type=\"button\" class=\"raffle-winner-followup-btn raffle-winner-followup-btn--seat" +
          (seatStatus === "seated" ? " raffle-winner-followup-btn--seat-active" : "") +
          "\" data-raffle-winner-followup=\"seat\" data-followup-value=\"seated\"" +
          followupAttrs +
          ">" + (seatStatus === "seated" ? "✓ Сел" : "Сел") + "</button>";
        var noSeatButton =
          "<button type=\"button\" class=\"raffle-winner-followup-btn" +
          (seatStatus === "not_seated" ? " raffle-winner-followup-btn--not-seated" : "") +
          "\" data-raffle-winner-followup=\"seat\" data-followup-value=\"not_seated\"" +
          followupAttrs +
          ">" + (seatStatus === "not_seated" ? "✓ Не сел" : "Не сел") + "</button>";
        var weekReturnsHtml = seatStatus === "not_seated" ? raffleCurrentWeekReturnsHtml() : "";
        var outcomeButtons = "";
        if (seatStatus === "seated") {
          if (cashoutStatus === "plus") {
            outcomeButtons =
              "<button type=\"button\" class=\"raffle-winner-followup-btn raffle-winner-followup-btn--plus\" data-raffle-winner-followup=\"outcome\" data-followup-value=\"plus\" data-followup-current-amount=\"" +
              escapeHtml(Math.round(cashoutAmount)) +
              "\"" +
              followupAttrs +
              " aria-label=\"Изменить сумму выигрыша\" title=\"Нажмите, чтобы изменить сумму\">+ " +
              escapeHtml(Math.round(cashoutAmount).toLocaleString("ru-RU")) +
              "</button>";
          } else if (cashoutStatus === "minus") {
            outcomeButtons = "<button type=\"button\" class=\"raffle-winner-followup-btn raffle-winner-followup-btn--minus\" disabled>−</button>";
          } else {
            outcomeButtons =
              "<button type=\"button\" class=\"raffle-winner-followup-btn\" data-raffle-winner-followup=\"outcome\" data-followup-value=\"minus\"" + followupAttrs + " aria-label=\"Ничего не забрал\">−</button>" +
              "<button type=\"button\" class=\"raffle-winner-followup-btn\" data-raffle-winner-followup=\"outcome\" data-followup-value=\"plus\"" + followupAttrs + " aria-label=\"Забрал сумму\">+</button>";
          }
        }
        followupHtml =
          "<span class=\"raffle-winner-followup\">" +
          "<span class=\"raffle-winner-followup__seat\">" + seatButton + noSeatButton + weekReturnsHtml + "</span>" +
          outcomeButtons +
          "</span>";
      }
      var adminControls =
        "<span class=\"raffle-winner-row__controls\">" +
        statusHtml +
        readyAction +
        reminderHtml +
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
        "\" title=\"Отклонить\">✗</button></span>" +
        followupHtml +
        "</span>";
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

  function raffleCurrentMoscowWeekRange() {
    var shifted = new Date(Date.now() + 3 * 60 * 60 * 1000 - 6 * 60 * 60 * 1000);
    var mondayOffset = (shifted.getUTCDay() + 6) % 7;
    var startShifted = Date.UTC(
      shifted.getUTCFullYear(),
      shifted.getUTCMonth(),
      shifted.getUTCDate() - mondayOffset,
      6
    );
    var start = startShifted - 3 * 60 * 60 * 1000;
    return { start: start, end: start + 7 * 24 * 60 * 60 * 1000 };
  }

  function raffleDateIsInRange(value, range) {
    var timestamp = new Date(value || "").getTime();
    return isFinite(timestamp) && timestamp >= range.start && timestamp < range.end;
  }

  function raffleCurrentWeekIssueTotals(completed) {
    if (raffleCurrentWeekIssueTotalsServer &&
        raffleCurrentWeekIssueTotalsServer.ticket &&
        raffleCurrentWeekIssueTotalsServer.cash) {
      return raffleCurrentWeekIssueTotalsServer;
    }
    var range = raffleCurrentMoscowWeekRange();
    var totals = {
      ticket: { issued: 0, returned: 0 },
      cash: { issued: 0, returned: 0 }
    };
    (Array.isArray(completed) ? completed : []).forEach(function (raffle) {
      var kind = String(raffle && (raffle.prizeKind || raffle.prize_kind) || "").toLowerCase() === "cash"
        ? "cash"
        : "ticket";
      var raffleDate = raffle && (raffle.drawnAt || raffle.completedAt || raffle.endDate || raffle.createdAt);
      (Array.isArray(raffle && raffle.winners) ? raffle.winners : []).forEach(function (winner) {
        var prizeAmount = raffleWinnerPrizeAmount(raffleWinnerPrizeText(raffle, winner));
        if (String(winner && winner.winnerStatus || "") === "ok" &&
            raffleDateIsInRange(winner && winner.winnerStatusAt, range)) {
          totals[kind].issued += prizeAmount;
        }
        if (String(winner && winner.winnerSeatStatus || "") === "not_seated" &&
            raffleDateIsInRange(winner && winner.winnerSeatStatusAt || raffleDate, range)) {
          totals[kind].returned += prizeAmount;
        } else if (String(winner && winner.winnerCashoutStatus || "") === "plus" &&
            raffleDateIsInRange(winner && winner.winnerCashoutAt || raffleDate, range)) {
          totals[kind].returned += Math.max(0, Number(winner && winner.winnerCashoutAmount) || 0);
        }
      });
    });
    return totals;
  }

  function setRaffleCurrentWeekIssueTotals(totals) {
    raffleCurrentWeekIssueTotalsServer = totals && totals.ticket && totals.cash ? totals : null;
  }

  function raffleCurrentWeekIssueTotalsHtml(completed) {
    if (!rafflesIsAdmin) return "";
    var totals = raffleCurrentWeekIssueTotals(completed);
    function amount(value) {
      var rounded = Math.max(0, Math.round(Number(value) || 0));
      return typeof formatRaffleSum === "function"
        ? formatRaffleSum(rounded)
        : rounded.toLocaleString("ru-RU") + " ₽";
    }
    function row(label, values) {
      return "<div class=\"raffles-week-issue-summary__row\">" +
        "<strong>" + label + "</strong>" +
        "<span>Выдано <b>" + escapeHtml(amount(values.issued)) + "</b></span>" +
        "<span>Возврат <b>+" + escapeHtml(amount(values.returned)) + "</b></span>" +
        "</div>";
    }
    return "<section class=\"raffles-week-issue-summary\" aria-label=\"Выдачи и возвраты за текущую неделю\">" +
      row("Билеты", totals.ticket) +
      row("Кеш", totals.cash) +
      "</section>";
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

  function remindRaffleWinnerReady(btn) {
    if (!btn || btn.disabled || !base || !rafflesIsAdmin) return;
    var rid = btn.getAttribute("data-raffle-id") || "";
    var wid = btn.getAttribute("data-winner-user-id") || "";
    var winnerSlotId = btn.getAttribute("data-winner-slot-id") || "";
    if (!rid || (!wid && !winnerSlotId)) return;
    var idleText = btn.textContent || "Напомнить";
    btn.disabled = true;
    btn.textContent = "Отправляю…";
    rememberRaffleCompletedWinnerTab(btn);
    fetch(base + "/api/raffles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerGuestOrAuthedPostBody({
        action: "remindWinnerReady",
        raffleId: rid,
        winnerUserId: wid,
        winnerSlotId: winnerSlotId
      })),
    })
      .then(function (r) {
        return r.json().catch(function () { return { ok: false, error: "Ошибка ответа сервера" }; })
          .then(function (data) {
            if (!r.ok || !data || !data.ok) throw new Error(data && data.error ? data.error : "Напоминание не отправлено");
            return data;
          });
      })
      .then(function (data) {
        btn.textContent = "✓ Отправлено";
        btn.classList.add("raffle-winner-remind-btn--sent");
        btn.setAttribute("aria-disabled", "true");
        if (data && data.raffle) refreshRafflesAfterWinnerAction(data);
      })
      .catch(function (error) {
        btn.disabled = false;
        btn.textContent = idleText;
        if (tg && tg.showAlert) tg.showAlert(error && error.message ? error.message : POKER_NET_ERR);
        else window.alert(error && error.message ? error.message : POKER_NET_ERR);
      });
  }

  function setRaffleWinnerFollowup(btn) {
    if (!btn || btn.disabled || !base) return;
    var rid = btn.getAttribute("data-raffle-id") || "";
    var wid = btn.getAttribute("data-winner-user-id") || "";
    var winnerSlotId = btn.getAttribute("data-winner-slot-id") || "";
    var kind = btn.getAttribute("data-raffle-winner-followup") || "";
    var value = btn.getAttribute("data-followup-value") || "";
    if (!rid || (!wid && !winnerSlotId) || !kind || !value) return;
    var amount = 0;
    if (kind === "outcome" && value === "plus") {
      var currentAmount = Math.max(0, Number(btn.getAttribute("data-followup-current-amount")) || 0);
      var entered = window.prompt(currentAmount > 0 ? "Изменить сумму:" : "Сколько забрал?", currentAmount > 0 ? String(Math.round(currentAmount)) : "");
      if (entered == null) return;
      amount = Number(String(entered).replace(/\s+/g, "").replace(",", "."));
      if (!isFinite(amount) || amount <= 0) {
        window.alert("Введите сумму больше нуля");
        return;
      }
    }
    var group = btn.closest(".raffle-winner-followup");
    var buttons = group ? group.querySelectorAll("button") : [btn];
    var idleText = btn.textContent || "";
    var activeClass = value === "not_seated"
      ? "raffle-winner-followup-btn--not-seated"
      : value === "seated"
        ? "raffle-winner-followup-btn--seat-active"
        : value === "minus"
          ? "raffle-winner-followup-btn--minus"
          : value === "plus"
            ? "raffle-winner-followup-btn--plus"
            : "";
    var weekReturnsBadge = null;
    if (kind === "seat" && value === "not_seated" && group) {
      weekReturnsBadge = group.querySelector(".raffle-winner-week-returns");
      if (!weekReturnsBadge) {
        weekReturnsBadge = document.createElement("span");
        weekReturnsBadge.className = "raffle-winner-week-returns raffle-winner-week-returns--loading";
        var seatButtons = btn.closest(".raffle-winner-followup__seat");
        (seatButtons || btn).insertAdjacentElement("afterend", weekReturnsBadge);
      }
      weekReturnsBadge.textContent = "Возвраты недели: считаю…";
    }
    if (activeClass) btn.classList.add(activeClass);
    if (kind === "seat") btn.textContent = "Сохраняю…";
    var optimisticOutcomeButtons = [];
    if (kind === "seat" && value === "seated" && group && !group.querySelector('[data-raffle-winner-followup="outcome"]')) {
      ["minus", "plus"].forEach(function (outcome) {
        var outcomeButton = document.createElement("button");
        outcomeButton.type = "button";
        outcomeButton.className = "raffle-winner-followup-btn";
        outcomeButton.textContent = outcome === "minus" ? "−" : "+";
        outcomeButton.setAttribute("data-raffle-winner-followup", "outcome");
        outcomeButton.setAttribute("data-followup-value", outcome);
        outcomeButton.setAttribute("data-raffle-id", rid);
        outcomeButton.setAttribute("data-winner-user-id", wid);
        outcomeButton.setAttribute("data-winner-slot-id", winnerSlotId);
        outcomeButton.setAttribute("aria-label", outcome === "minus" ? "Ничего не забрал" : "Забрал сумму");
        outcomeButton.disabled = true;
        outcomeButton.hidden = true;
        outcomeButton.addEventListener("click", function (event) {
          if (event.__raffleFollowupHandled || outcomeButton.disabled) return;
          event.stopPropagation();
          setRaffleWinnerFollowup(outcomeButton);
        });
        group.appendChild(outcomeButton);
        optimisticOutcomeButtons.push(outcomeButton);
      });
    }
    buttons.forEach(function (item) { item.disabled = true; });
    if (kind !== "seat") btn.classList.add("raffle-winner-followup-btn--loading");
    rememberRaffleCompletedWinnerTab(btn);
    fetch(base + "/api/raffles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify(pokerGuestOrAuthedPostBody({
        action: "setWinnerFollowup",
        raffleId: rid,
        winnerUserId: wid,
        winnerSlotId: winnerSlotId,
        kind: kind,
        value: value,
        amount: amount
      })),
    })
      .then(function (r) {
        return r.json().catch(function () { return { ok: false, error: "Ошибка ответа сервера" }; })
          .then(function (data) {
            if (!r.ok || !data || !data.ok) throw new Error(data && data.error ? data.error : "Отметка не сохранилась");
            return data;
          });
      })
      .then(function (data) {
        // Show the outcome controls only once they are ready for interaction.
        // Previously they appeared disabled while the seat request was saving.
        optimisticOutcomeButtons.forEach(function (item) {
          item.disabled = false;
          item.hidden = false;
        });
        if (data && data.currentWeekIssueTotals) {
          setRaffleCurrentWeekIssueTotals(data.currentWeekIssueTotals);
        }
        if (data && data.currentWeekReturns) {
          raffleCurrentWeekReturns = data.currentWeekReturns;
          if (weekReturnsBadge) {
            weekReturnsBadge.classList.remove("raffle-winner-week-returns--loading");
            weekReturnsBadge.innerHTML = "Возвраты недели: <b>" +
              escapeHtml(Math.max(0, Math.round(Number(data.currentWeekReturns.amount) || 0)).toLocaleString("ru-RU")) +
              " ₽</b>";
          }
        }
        refreshRafflesAfterWinnerAction(data);
      })
      .catch(function (err) {
        optimisticOutcomeButtons.forEach(function (item) { item.remove(); });
        buttons.forEach(function (item) { item.disabled = false; });
        if (activeClass) btn.classList.remove(activeClass);
        btn.textContent = idleText;
        btn.classList.remove("raffle-winner-followup-btn--loading");
        if (weekReturnsBadge && weekReturnsBadge.classList.contains("raffle-winner-week-returns--loading")) {
          weekReturnsBadge.remove();
        }
        if (tg && tg.showAlert) tg.showAlert(err && err.message ? err.message : POKER_NET_ERR);
        else window.alert(err && err.message ? err.message : POKER_NET_ERR);
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

  function raffleArchiveLoadingHtml(count, text) {
    var rows = "";
    for (var i = 0; i < (count || 3); i++) {
      rows += "<span class=\"raffles-archive-skeleton__row\"><i></i><b></b></span>";
    }
    return "<div class=\"raffles-archive-skeleton\" aria-busy=\"true\">" +
      "<span class=\"raffles-archive-skeleton__label\">" + escapeHtml(text || "Загружаем") + "</span>" +
      rows +
      "</div>";
  }

  function raffleArchiveFetch(scope, params) {
    var query = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?";
    var suffix = Object.keys(params || {}).map(function (key) {
      return "&" + encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    }).join("");
    return fetch(base + "/api/raffles" + query + "&scope=" + encodeURIComponent(scope) + suffix + "&_t=" + Date.now())
      .then(function (response) {
        return response.json().catch(function () { return { ok: false, error: "Ошибка ответа сервера" }; })
          .then(function (data) {
            if (!response.ok || !data || !data.ok) throw new Error(data && data.error || "Ошибка загрузки архива");
            return data;
          });
      });
  }

  function raffleArchiveBadgeFromTotals(totals) {
    return raffleCompletedArchiveBadgeHtml([], totals || { count: 0, sum: 0 });
  }

  function raffleArchiveMonthLabelFromKey(key) {
    var parts = String(key || "").split("-");
    var date = new Date(Date.UTC(parseInt(parts[0], 10) || 2000, Math.max(0, (parseInt(parts[1], 10) || 1) - 1), 1));
    var label = date.toLocaleDateString("ru-RU", { month: "long", year: "numeric", timeZone: "UTC" });
    label = label.charAt(0).toUpperCase() + label.slice(1);
    return /г\.?$/.test(label) ? label : label + " г.";
  }

  function raffleArchiveShortDate(value) {
    var parts = String(value || "").split("-");
    var date = new Date(Date.UTC(parseInt(parts[0], 10), (parseInt(parts[1], 10) || 1) - 1, parseInt(parts[2], 10) || 1));
    return date.toLocaleDateString("ru-RU", { day: "numeric", month: "short", timeZone: "UTC" }).replace(/\.$/, "");
  }

  function raffleArchiveDayKey(raffle) {
    var date = raffleCompletedDate(raffle);
    if (!date) return "";
    var moscow = new Date(date.getTime() + 3 * 60 * 60 * 1000);
    return [
      moscow.getUTCFullYear(),
      String(moscow.getUTCMonth() + 1).padStart(2, "0"),
      String(moscow.getUTCDate()).padStart(2, "0")
    ].join("-");
  }

  function raffleArchiveWeekDays(weekKey) {
    var parts = String(weekKey || "").split("-");
    var start = Date.UTC(
      parseInt(parts[0], 10) || 2000,
      Math.max(0, (parseInt(parts[1], 10) || 1) - 1),
      parseInt(parts[2], 10) || 1
    );
    var weekdayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    return weekdayNames.map(function (name, index) {
      var date = new Date(start + index * 24 * 60 * 60 * 1000);
      return {
        key: [
          date.getUTCFullYear(),
          String(date.getUTCMonth() + 1).padStart(2, "0"),
          String(date.getUTCDate()).padStart(2, "0")
        ].join("-"),
        name: name,
        day: date.getUTCDate()
      };
    });
  }

  function raffleArchiveDayRaffleTabsHtml(items, dayKey) {
    var raffles = sortCompletedRafflesNewestFirst(items);
    if (!raffles.length) return "<div class=\"raffles-completed-empty\">В этот день розыгрышей не было.</div>";
    var tabs = raffles.map(function (raffle, index) {
      var kind = raffleRecentCompletedKindLabel(raffle);
      var time = raffleRecentCompletedResultTime(raffle);
      var active = index === 0;
      return "<button type=\"button\" class=\"raffles-archive-raffle-tab" +
        (active ? " raffles-archive-raffle-tab--active" : "") +
        "\" role=\"tab\" aria-selected=\"" + (active ? "true" : "false") +
        "\" data-raffles-archive-raffle-tab=\"" + index + "\">" +
        "<strong>" + escapeHtml(kind) + "</strong>" +
        (time ? "<span>" + escapeHtml(time) + "</span>" : "") +
        "</button>";
    }).join("");
    var panels = raffles.map(function (raffle, index) {
      var active = index === 0;
      return "<div class=\"raffles-archive-raffle-panel" +
        (active ? " raffles-archive-raffle-panel--active" : "") +
        "\" role=\"tabpanel\" data-raffles-archive-raffle-panel=\"" + index + "\"" +
        (active ? "" : " hidden") + ">" +
        buildCompletedRaffleCardHtml(raffle) +
        "</div>";
    }).join("");
    return "<section class=\"raffles-archive-raffle-tabs\" data-raffles-archive-raffle-tabs=\"" +
      escapeHtml(dayKey || "day") + "\">" +
      "<div class=\"raffles-archive-raffle-tabs__list\" role=\"tablist\" aria-label=\"Розыгрыши выбранного дня\">" +
      tabs +
      "</div>" +
      panels +
      "</section>";
  }

  function raffleArchiveWeekDaysHtml(weekKey, raffles) {
    var days = raffleArchiveWeekDays(weekKey);
    var byDay = {};
    sortCompletedRafflesNewestFirst(raffles).forEach(function (raffle) {
      var key = raffleArchiveDayKey(raffle);
      if (!byDay[key]) byDay[key] = [];
      byDay[key].push(raffle);
    });
    var activeKey = "";
    days.forEach(function (day) {
      if ((byDay[day.key] || []).length) activeKey = day.key;
    });
    if (!activeKey && days.length) activeKey = days[0].key;
    var domKey = String(weekKey || "week").replace(/[^a-zA-Z0-9_-]/g, "-");
    var tabs = days.map(function (day) {
      var count = (byDay[day.key] || []).length;
      var active = day.key === activeKey;
      return "<button type=\"button\" class=\"raffles-archive-day-tab" +
        (active ? " raffles-archive-day-tab--active" : "") +
        (count ? "" : " raffles-archive-day-tab--empty") +
        "\" role=\"tab\" aria-selected=\"" + (active ? "true" : "false") +
        "\" aria-controls=\"raffles-archive-day-panel-" + escapeHtml(domKey + "-" + day.key) +
        "\" data-raffles-archive-day-tab=\"" + escapeHtml(day.key) + "\">" +
        "<span>" + escapeHtml(day.name) + "</span><b>" + escapeHtml(day.day) + "</b>" +
        (count ? "<i>" + escapeHtml(count) + "</i>" : "") +
        "</button>";
    }).join("");
    var panels = days.map(function (day) {
      var items = byDay[day.key] || [];
      var active = day.key === activeKey;
      return "<div class=\"raffles-archive-day-panel" + (active ? " raffles-archive-day-panel--active" : "") +
        "\" id=\"raffles-archive-day-panel-" + escapeHtml(domKey + "-" + day.key) +
        "\" role=\"tabpanel\" data-raffles-archive-day-panel=\"" + escapeHtml(day.key) + "\"" +
        (active ? "" : " hidden") + ">" +
        raffleArchiveDayRaffleTabsHtml(items, day.key) +
        "</div>";
    }).join("");
    return "<div class=\"raffles-archive-days\" data-raffles-archive-days>" +
      "<div class=\"raffles-archive-day-tabs\" role=\"tablist\" aria-label=\"Дни недели\">" + tabs + "</div>" +
      panels +
      "</div>";
  }

  function raffleArchiveMonthHtml(month) {
    return "<details class=\"raffles-completed-archive-month\" data-raffles-archive-month=\"" + escapeHtml(month.key) + "\">" +
      "<summary class=\"raffles-completed-archive-month__summary\">" +
      "<span class=\"raffles-completed-archive-month__title\">" + escapeHtml(raffleArchiveMonthLabelFromKey(month.key)) + "</span>" +
      raffleArchiveBadgeFromTotals(month) +
      "</summary>" +
      "<div class=\"raffles-completed-archive-month__body\" data-raffles-archive-month-body>" +
      raffleArchiveLoadingHtml(3, "Загрузим недели после открытия") +
      "</div>" +
      "</details>";
  }

  function raffleArchiveWeekHtml(week) {
    return "<details class=\"raffles-completed-archive-week\" data-raffles-archive-week=\"" + escapeHtml(week.key) + "\">" +
      "<summary class=\"raffles-completed-archive-week__summary\">" +
      "<span class=\"raffles-completed-archive-week__title\">" +
      escapeHtml(raffleArchiveShortDate(week.key) + " — " + raffleArchiveShortDate(week.endKey)) +
      "</span>" +
      raffleArchiveBadgeFromTotals(week) +
      "</summary>" +
      "<div class=\"raffles-completed-archive-week__body\" data-raffles-archive-week-body>" +
      raffleArchiveLoadingHtml(2, "Загрузим розыгрыши после открытия") +
      "</div>" +
      "</details>";
  }

  function loadDeferredArchiveIndex(details) {
    if (!details || details.dataset.archiveLoaded === "1" || details.dataset.archiveLoading === "1") return;
    details.dataset.archiveLoading = "1";
    var body = details.querySelector(".raffles-completed-archive__body");
    if (body) body.innerHTML = raffleArchiveLoadingHtml(5, "Загружаем месяцы");
    raffleArchiveFetch("archive-index")
      .then(function (data) {
        details.dataset.archiveLoaded = "1";
        delete details.dataset.archiveLoading;
        var badge = details.querySelector(".raffles-completed-spoiler__count");
        if (badge) badge.outerHTML = raffleArchiveBadgeFromTotals(data.totals);
        if (body) body.innerHTML = (data.months || []).map(raffleArchiveMonthHtml).join("") ||
          "<div class=\"raffles-completed-empty\">Архив пока пуст.</div>";
      })
      .catch(function (error) {
        delete details.dataset.archiveLoading;
        if (body) body.innerHTML = "<button type=\"button\" class=\"raffles-archive-retry\" data-raffles-archive-retry=\"index\">" +
          escapeHtml(error && error.message || "Повторить загрузку") + "</button>";
      });
  }

  function loadDeferredArchiveMonth(details) {
    if (!details || details.dataset.loaded === "1" || details.dataset.loading === "1") return;
    details.dataset.loading = "1";
    var body = details.querySelector("[data-raffles-archive-month-body]");
    if (body) body.innerHTML = raffleArchiveLoadingHtml(4, "Загружаем недели");
    raffleArchiveFetch("archive-month", { month: details.getAttribute("data-raffles-archive-month") || "" })
      .then(function (data) {
        details.dataset.loaded = "1";
        delete details.dataset.loading;
        if (body) body.innerHTML = (data.weeks || []).map(raffleArchiveWeekHtml).join("") ||
          "<div class=\"raffles-completed-empty\">В этом месяце нет розыгрышей.</div>";
      })
      .catch(function () {
        delete details.dataset.loading;
        if (body) body.innerHTML = "<button type=\"button\" class=\"raffles-archive-retry\" data-raffles-archive-retry=\"month\">Повторить загрузку</button>";
      });
  }

  function loadDeferredArchiveWeek(details) {
    if (!details || details.dataset.loaded === "1" || details.dataset.loading === "1") return;
    details.dataset.loading = "1";
    var body = details.querySelector("[data-raffles-archive-week-body]");
    if (body) body.innerHTML = raffleArchiveLoadingHtml(3, "Загружаем розыгрыши");
    raffleArchiveFetch("archive-week", { week: details.getAttribute("data-raffles-archive-week") || "" })
      .then(function (data) {
        details.dataset.loaded = "1";
        delete details.dataset.loading;
        if (body) body.innerHTML = (data.raffles || []).length
          ? raffleArchiveWeekDaysHtml(data.week || details.getAttribute("data-raffles-archive-week") || "", data.raffles)
          : "<div class=\"raffles-completed-empty\">На этой неделе нет розыгрышей.</div>";
        syncRaffleCompletedTimers();
      })
      .catch(function () {
        delete details.dataset.loading;
        if (body) body.innerHTML = "<button type=\"button\" class=\"raffles-archive-retry\" data-raffles-archive-retry=\"week\">Повторить загрузку</button>";
      });
  }

  function handleDeferredArchiveClick(event) {
    var archiveRaffleTab = event && event.target && event.target.closest
      ? event.target.closest("[data-raffles-archive-raffle-tab]")
      : null;
    if (archiveRaffleTab) {
      var archiveRaffleRoot = archiveRaffleTab.closest("[data-raffles-archive-raffle-tabs]");
      var archiveRaffleIndex = archiveRaffleTab.getAttribute("data-raffles-archive-raffle-tab") || "0";
      if (archiveRaffleRoot) {
        archiveRaffleRoot.querySelectorAll("[data-raffles-archive-raffle-tab]").forEach(function (tab) {
          var active = tab === archiveRaffleTab;
          tab.classList.toggle("raffles-archive-raffle-tab--active", active);
          tab.setAttribute("aria-selected", active ? "true" : "false");
        });
        archiveRaffleRoot.querySelectorAll("[data-raffles-archive-raffle-panel]").forEach(function (panel) {
          var active = panel.getAttribute("data-raffles-archive-raffle-panel") === archiveRaffleIndex;
          panel.classList.toggle("raffles-archive-raffle-panel--active", active);
          panel.hidden = !active;
        });
        syncRaffleCompletedTimers();
      }
      return true;
    }
    var recentTab = event && event.target && event.target.closest
      ? event.target.closest("[data-raffles-recent-tab]")
      : null;
    if (recentTab) {
      var recentRoot = recentTab.closest("[data-raffles-recent-tabs]");
      var recentIndex = recentTab.getAttribute("data-raffles-recent-tab") || "0";
      if (recentRoot) {
        raffleCompletedActiveRecentKey = recentTab.getAttribute("data-raffles-recent-key") || "";
        recentRoot.querySelectorAll("[data-raffles-recent-tab]").forEach(function (tab) {
          var active = tab === recentTab;
          tab.classList.toggle("raffles-recent-tab--active", active);
          tab.setAttribute("aria-selected", active ? "true" : "false");
        });
        recentRoot.querySelectorAll("[data-raffles-recent-panel]").forEach(function (panel) {
          var active = panel.getAttribute("data-raffles-recent-panel") === recentIndex;
          panel.classList.toggle("raffles-recent-panel--active", active);
          panel.hidden = !active;
        });
        syncRaffleCompletedTimers();
      }
      return true;
    }
    var dayTab = event && event.target && event.target.closest
      ? event.target.closest("[data-raffles-archive-day-tab]")
      : null;
    if (dayTab) {
      var daysRoot = dayTab.closest("[data-raffles-archive-days]");
      var dayKey = dayTab.getAttribute("data-raffles-archive-day-tab") || "";
      if (daysRoot && dayKey) {
        daysRoot.querySelectorAll("[data-raffles-archive-day-tab]").forEach(function (tab) {
          var active = tab === dayTab;
          tab.classList.toggle("raffles-archive-day-tab--active", active);
          tab.setAttribute("aria-selected", active ? "true" : "false");
        });
        daysRoot.querySelectorAll("[data-raffles-archive-day-panel]").forEach(function (panel) {
          var active = panel.getAttribute("data-raffles-archive-day-panel") === dayKey;
          panel.classList.toggle("raffles-archive-day-panel--active", active);
          panel.hidden = !active;
        });
        syncRaffleCompletedTimers();
      }
      return true;
    }
    var retry = event && event.target && event.target.closest ? event.target.closest("[data-raffles-archive-retry]") : null;
    if (retry) {
      var retryKind = retry.getAttribute("data-raffles-archive-retry");
      var retryDetails = retry.closest("details");
      if (retryKind === "index") loadDeferredArchiveIndex(retryDetails);
      else if (retryKind === "month") loadDeferredArchiveMonth(retryDetails);
      else if (retryKind === "week") loadDeferredArchiveWeek(retryDetails);
      return true;
    }
    var summary = event && event.target && event.target.closest ? event.target.closest("summary") : null;
    var details = summary && summary.parentElement;
    if (!details) return false;
    if (details.getAttribute("data-raffles-archive-deferred") === "1") {
      setTimeout(function () { loadDeferredArchiveIndex(details); }, 0);
      return true;
    }
    if (details.hasAttribute("data-raffles-archive-month")) {
      setTimeout(function () { loadDeferredArchiveMonth(details); }, 0);
      return true;
    }
    if (details.hasAttribute("data-raffles-archive-week")) {
      setTimeout(function () { loadDeferredArchiveWeek(details); }, 0);
      return true;
    }
    return false;
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

  function raffleRecentCompletedKindLabel(raffle) {
    var explicit = String(raffle && (raffle.prizeKind || raffle.prize_kind) || "").toLowerCase();
    if (explicit === "cash") return "Кеш";
    if (explicit === "tournament_ticket" || explicit === "ticket") return "Билеты";
    var groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
    var text = String(raffle && (raffle.title || raffle.name) || "") + " " +
      groups.map(function (group) { return String(group && group.prize || ""); }).join(" ");
    return /(?:кеш|кэш|cash)/i.test(text) ? "Кеш" : "Билеты";
  }

  function raffleRecentCompletedResultTime(raffle) {
    var batchTime = String(raffle && raffle.resultBatchTime || "").trim();
    if (batchTime) return batchTime;
    var completed = raffleCompletedDate(raffle);
    if (!completed) return "";
    try {
      return completed.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/Moscow"
      });
    } catch (eResultTime) {
      return String(completed.getHours()).padStart(2, "0") + ":" +
        String(completed.getMinutes()).padStart(2, "0");
    }
  }

  function raffleRecentCompletedWasYesterday(raffle) {
    var completed = raffleCompletedDate(raffle);
    if (!completed) return false;
    function moscowDateKey(date) {
      try {
        return new Intl.DateTimeFormat("en-CA", {
          timeZone: "Europe/Moscow",
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        }).format(date);
      } catch (eMoscowDate) {
        return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
      }
    }
    return moscowDateKey(completed) === moscowDateKey(new Date(Date.now() - 24 * 60 * 60 * 1000));
  }

  function raffleRecentCompletedTabsHtml(items) {
    var recent = Array.isArray(items) ? items.slice(0, 2) : [];
    if (!recent.length) return "";
    if (recent.length === 1) return buildCompletedRaffleCardHtml(recent[0]);
    var recentKeys = recent.map(function (raffle) {
      return [raffle && raffle.id, raffle && raffle.completedNumber, raffle && (raffle.completedAt || raffle.endDate)]
        .map(function (value) { return String(value || "").trim(); })
        .join("|");
    });
    var activeIndex = recentKeys.indexOf(raffleCompletedActiveRecentKey);
    if (activeIndex < 0) activeIndex = 0;
    var tabs = recent.map(function (raffle, index) {
      var kind = raffleRecentCompletedKindLabel(raffle);
      var time = raffleRecentCompletedResultTime(raffle);
      var yesterday = raffleRecentCompletedWasYesterday(raffle);
      var active = index === activeIndex;
      return "<button type=\"button\" class=\"raffles-recent-tab" +
        (active ? " raffles-recent-tab--active" : "") +
        "\" role=\"tab\" aria-selected=\"" + (active ? "true" : "false") +
        "\" data-raffles-recent-tab=\"" + index + "\" data-raffles-recent-key=\"" + escapeHtml(recentKeys[index]) + "\">" +
        "<strong>" + escapeHtml(kind) + "</strong>" +
        (time ? "<span>" + escapeHtml(time + (yesterday ? " (вчера)" : "")) + "</span>" : "") +
        "</button>";
    }).join("");
    var panels = recent.map(function (raffle, index) {
      var active = index === activeIndex;
      return "<div class=\"raffles-recent-panel" + (active ? " raffles-recent-panel--active" : "") +
        "\" role=\"tabpanel\" data-raffles-recent-panel=\"" + index + "\"" +
        (active ? "" : " hidden") + ">" +
        buildCompletedRaffleCardHtml(raffle) +
        "</div>";
    }).join("");
    return "<section class=\"raffles-recent-tabs\" data-raffles-recent-tabs>" +
      "<div class=\"raffles-recent-tabs__list\" role=\"tablist\" aria-label=\"Последние завершённые розыгрыши\">" +
      tabs +
      "</div>" +
      panels +
      "</section>";
  }

  function buildCompletedRafflesListHtml(completed) {
    var list = sortCompletedRafflesNewestFirst(completed);
    if (list.length <= 0) return "";
    var currentHtml = raffleRecentCompletedTabsHtml(list);
    var archive = list.slice(2);
    return currentHtml +
      raffleCurrentWeekIssueTotalsHtml(list) +
      buildCompletedArchiveHtml(archive, raffleCompletedMonthTotalsByKey(list));
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
      var followupBtn = e.target.closest("[data-raffle-winner-followup]");
      if (followupBtn && rafflesIsAdmin) {
        if (followupBtn.disabled) return;
        if (!base || !pokerApiHasCredential()) {
          if (tg && tg.showAlert) tg.showAlert("Откройте приложение в Telegram.");
          return;
        }
        setRaffleWinnerFollowup(followupBtn);
        return;
      }
      var remindBtn = e.target.closest("[data-raffle-winner-remind]");
      if (remindBtn && rafflesIsAdmin) {
        if (!base || !pokerApiHasCredential()) {
          if (tg && tg.showAlert) tg.showAlert("Откройте приложение в Telegram.");
          return;
        }
        remindRaffleWinnerReady(remindBtn);
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
      setCurrentWeekIssueTotals: setRaffleCurrentWeekIssueTotals,
      buildWinnerRowHtml: buildRaffleWinnerRowHtml,
      bindWinnerStatusButtons: bindRaffleWinnerStatusButtons,
      handleDeferredArchiveClick: handleDeferredArchiveClick
    };
  }
}
