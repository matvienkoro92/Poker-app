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
  var base = getApiBase();
  var initData = (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData) || "";
  var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  var rafflesSubscribeBtn = document.getElementById("rafflesSubscribeBtn");
  var adminWrap = document.getElementById("rafflesAdminWrap");
  var raffleAdminActions = document.getElementById("raffleAdminActions");
  var raffleCurrent = document.getElementById("raffleCurrent");
  var raffleEmpty = document.getElementById("raffleEmpty");
  var rafflesTabActive = document.getElementById("rafflesTabActive");
  var rafflesTabCompleted = document.getElementById("rafflesTabCompleted");
  var rafflesPanelActive = document.getElementById("rafflesPanelActive");
  var rafflesPanelCompleted = document.getElementById("rafflesPanelCompleted");
  var rafflesTabActiveCount = document.getElementById("rafflesTabActiveCount");
  var rafflesTabActiveSum = document.getElementById("rafflesTabActiveSum");
  var rafflesTabCompletedCount = document.getElementById("rafflesTabCompletedCount");
  var rafflesTabCompletedSum = document.getElementById("rafflesTabCompletedSum");
  var rafflesCompleted = document.getElementById("rafflesCompleted");
  var raffleCard = document.getElementById("raffleCard");
  var raffleCardHeading = document.getElementById("raffleCardHeading");
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
  var rafflesCompletedRenderSeq = 0;

  function showRaffleFeedback(message, kind) {
    if (!message) return;
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
      raffleActionFeedback.textContent = message;
      raffleActionFeedback.classList.remove("raffle-action-feedback--hidden");
      raffleActionFeedback.classList.toggle("raffle-action-feedback--ok", kind !== "err");
      raffleActionFeedback.classList.toggle("raffle-action-feedback--err", kind === "err");
      raffleFeedbackTimer = setTimeout(function () {
        if (raffleActionFeedback) raffleActionFeedback.classList.add("raffle-action-feedback--hidden");
        raffleFeedbackTimer = null;
      }, 5000);
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

  function formatRaffleCountdown(endDate) {
    if (!endDate) return "";
    var now = new Date();
    var ms = endDate.getTime() - now.getTime();
    if (ms <= 0) return "Завершён";
    var sec = Math.floor(ms / 1000) % 60;
    var min = Math.floor(ms / 60000) % 60;
    var hours = Math.floor(ms / 3600000) % 24;
    var days = Math.floor(ms / 86400000);
    var parts = [];
    if (days > 0) parts.push(days + " д.");
    if (hours > 0 || parts.length) parts.push(hours + " ч.");
    parts.push(min + " мин.");
    parts.push(sec + " сек.");
    return parts.join(" ");
  }

  function updateRaffleEndText() {
    if (!raffleEnd || !currentRaffleEndDate) return;
    var text = formatRaffleCountdown(currentRaffleEndDate);
    if (text === "Завершён") {
      raffleEnd.textContent = "Завершён";
      if (raffleTimerInterval) {
        clearInterval(raffleTimerInterval);
        raffleTimerInterval = null;
      }
      loadRaffles();
      return;
    }
    raffleEnd.textContent = "Завершится через " + text;
  }

  function escapeHtml(s) {
    if (s == null) return "";
    var str = String(s);
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /** Текст строки: имя + (@tg_login) для tg_ из API + « — » + P21. */
  function raffleParticipantDisplayLine(p) {
    var namePart = escapeHtml(p.name);
    var uid0 = String(p.userId != null ? p.userId : "").trim();
    var raffleIdText = p.p21Id != null && String(p.p21Id).trim()
      ? String(p.p21Id).trim()
      : (p.accountId != null && String(p.accountId).trim() ? String(p.accountId).trim() : uid0);
    var un =
      p.telegramUsername != null ? String(p.telegramUsername).trim().replace(/^@+/g, "") : "";
    if (un && uid0.indexOf("tg_") === 0) {
      namePart += " (@" + escapeHtml(un) + ")";
    }
    return raffleIdText ? namePart + " — " + escapeHtml(raffleIdText) : namePart;
  }

  /** Строка участника: клик открывает карточку профиля (tg_/vk_). */
  function raffleParticipantLineHtml(p) {
    var uid = String(p.userId != null ? p.userId : "").trim();
    var line = raffleParticipantDisplayLine(p);
    if (!uid || (uid.indexOf("tg_") !== 0 && uid.indexOf("vk_") !== 0)) {
      return "<li class=\"raffle-participants-item\">" + line + "</li>";
    }
    return (
      "<li class=\"raffle-participants-item\"><button type=\"button\" class=\"raffle-participants__profile-btn\" data-user-id=\"" +
      escapeHtml(uid) +
      "\" data-user-name=\"" +
      escapeHtml(p.name || "") +
      "\">" +
      line +
      "</button></li>"
    );
  }

  /** Подмена старого «билет» на «беккинг-билет» при отображении (для данных из БД до переименования). */
  function raffleDisplayPrizeText(s) {
    if (s == null || typeof s !== "string") return s;
    var ph = "\x01BECKING_PH\x02";
    return s.replace(/беккинг-билет/gi, ph).replace(/Билет/g, "Беккинг-билет").replace(/билет/g, "беккинг-билет").split(ph).join("беккинг-билет");
  }

  function parsePrizeValue(prizeStr) {
    if (prizeStr == null || prizeStr === "") return 0;
    var m = String(prizeStr).trim().match(/\d+(?:[.,]\d+)?/);
    return m ? parseFloat(m[0].replace(",", ".")) : 0;
  }

  function getRaffleTotalPrize(raffle) {
    if (!raffle || !raffle.groups) return 0;
    return raffle.groups.reduce(function (sum, g) {
      var count = Math.max(0, parseInt(g.count, 10) || 0);
      var nominal = parsePrizeValue(g.prize);
      return sum + (nominal > 0 ? nominal * count : 0);
    }, 0);
  }

  function formatRaffleSum(rub) {
    var n = Math.round(rub);
    if (n === 0) return "0 ₽";
    return (n < 0 ? "-" : "") + String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f") + " ₽";
  }


  function pluralizeBackingTicketsForHeading(n) {
    var v = Math.abs(n) % 100;
    var d = v % 10;
    if (v >= 11 && v <= 19) return "беккинг-билетов";
    if (d === 1) return "беккинг-билет";
    if (d >= 2 && d <= 4) return "беккинг-билета";
    return "беккинг-билетов";
  }

  function parseRafflePrizeTournamentNameFromPrize(prizeStr) {
    var s = String(prizeStr || "").trim();
    var idx = s.indexOf(" — ");
    if (idx === -1) idx = s.search(/\s[–—-]\s/);
    if (idx === -1) return "";
    return s.slice(idx).replace(/^\s[–—-]\s/, "").trim();
  }

  function isGenericRaffleTitleForHeading(s) {
    var t = String(s || "").toLowerCase();
    return t.indexOf("розыгрыш") !== -1 && (t.indexOf("беккинг") !== -1 || t.indexOf("билет") !== -1);
  }

  /** Заголовок карточки активного розыгрыша (беккинг-билеты / призы). */
  function buildActiveRaffleCardHeading(raffle) {
    if (!raffle) return "";
    var groups = Array.isArray(raffle.groups) ? raffle.groups : [];
    var totalTickets = Math.max(0, parseInt(raffle.totalWinners, 10) || 0);
    if (!totalTickets && groups.length) {
      totalTickets = groups.reduce(function (s, g) {
        return s + Math.max(0, parseInt(g.count, 10) || 0);
      }, 0);
    }
    var totalPrize = getRaffleTotalPrize(raffle);
    var sumText = totalPrize > 0 ? formatRaffleSum(totalPrize) : "—";
    var rawTitle = (raffle.title || "").trim();
    var ticketWord = pluralizeBackingTicketsForHeading(totalTickets || 0);

    function tourPhraseFromNames(uniqueNames) {
      if (uniqueNames.length >= 2) return "на турниры «" + uniqueNames.join("», «") + "»";
      if (uniqueNames.length === 1) return "на турнир «" + uniqueNames[0] + "»";
      if (rawTitle && !isGenericRaffleTitleForHeading(rawTitle)) return "на турнир «" + rawTitle + "»";
      return "на турнир «турнир клуба»";
    }

    if (!groups.length) {
      if (rawTitle) return "Розыгрыш: " + rawTitle + ". Итого сумма розыгрыша " + sumText + ".";
      return "Розыгрыш. Итого сумма розыгрыша " + sumText + ".";
    }

    var rows = [];
    for (var i = 0; i < groups.length; i++) {
      var g = groups[i];
      var c = Math.max(0, parseInt(g.count, 10) || 0);
      var nom = parsePrizeValue(g.prize);
      var tname = parseRafflePrizeTournamentNameFromPrize(g.prize || "");
      rows.push({ count: c, nominal: nom, tournament: tname });
    }

    var uniqueNom = [];
    for (var ni = 0; ni < rows.length; ni++) {
      var nv = rows[ni].nominal;
      if (nv > 0 && uniqueNom.indexOf(nv) === -1) uniqueNom.push(nv);
    }

    var uniqueNames = [];
    for (var nj = 0; nj < rows.length; nj++) {
      var tn = rows[nj].tournament;
      if (tn && uniqueNames.indexOf(tn) === -1) uniqueNames.push(tn);
    }

    if (uniqueNom.length === 1) {
      var price = uniqueNom[0];
      var nomText = formatRaffleSum(price);
      var tourPhrase = tourPhraseFromNames(uniqueNames);
      return (
        "Розыгрыш " +
        totalTickets +
        " " +
        ticketWord +
        " за " +
        nomText +
        " (цена билета) " +
        tourPhrase +
        ". Итого сумма розыгрыша " +
        sumText +
        "."
      );
    }

    if (uniqueNom.length > 1) {
      var mixParts = [];
      for (var mk = 0; mk < rows.length; mk++) {
        var r = rows[mk];
        if (r.count > 0 && r.nominal > 0) mixParts.push(r.count + "×" + formatRaffleSum(r.nominal));
      }
      var mix = mixParts.join(", ");
      var tourPhraseM = tourPhraseFromNames(uniqueNames);
      return (
        "Розыгрыш " +
        totalTickets +
        " " +
        ticketWord +
        ": " +
        mix +
        ". " +
        tourPhraseM +
        ". Итого сумма розыгрыша " +
        sumText +
        "."
      );
    }

    var firstPrize = groups[0] && groups[0].prize ? String(groups[0].prize).trim() : "";
    var prizeLine = firstPrize ? raffleDisplayPrizeText(firstPrize) : "";
    var label = prizeLine || rawTitle || "приз";
    return "Розыгрыш " + totalTickets + " призов: " + label + ". Итого сумма розыгрыша " + sumText + ".";
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
      focusRaffleAfterMutation: focusRaffleAfterMutation,
      confirmRaffleAdminAction: confirmRaffleAdminAction,
      escapeHtml: escapeHtml,
      raffleParticipantDisplayLine: raffleParticipantDisplayLine,
      raffleDisplayPrizeText: raffleDisplayPrizeText
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
      raffleCompleteBtn: raffleCompleteBtn,
      raffleCancelBtn: raffleCancelBtn,
      raffleUpdateEndBtn: raffleUpdateEndBtn,
      raffleDeleteBtn: raffleDeleteBtn,
      raffleStatWinners: raffleStatWinners,
      raffleStatPrizeValue: raffleStatPrizeValue,
      raffleStatGroups: raffleStatGroups,
      raffleEnd: raffleEnd,
      rafflePrizes: rafflePrizes,
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
      raffleParticipantLineHtml: raffleParticipantLineHtml,
      raffleDisplayPrizeText: raffleDisplayPrizeText,
      escapeHtml: escapeHtml
    });
    rafflesActiveViewRuntime = initRafflesActiveViewRuntime(rafflesActiveViewDeps) || {};
  }

  function getRaffleDeviceId() {
    return pokerGetRaffleStableDeviceId();
  }

  function loadRaffles(switchToCompleted) {
    if (!base) return;
    var hostname = typeof window !== "undefined" && window.location && window.location.hostname ? window.location.hostname : "";
    var baseStr = (base || "").toString();
    var isLocal = /localhost|127\.0\.0\.1/i.test(hostname) || /localhost|127\.0\.0\.1/i.test(baseStr);
    var qLead = pokerRafflesApiQueryLeading();
    if (!isLocal && qLead === "?initData=" && !pokerCanSyncGuestProfileToServer()) return;

    function showRafflesLoading() {
      if (raffleEmpty) {
        raffleEmpty.innerHTML = "<span class=\"raffle-loading__spinner\" aria-hidden=\"true\"></span><span class=\"raffle-loading__text\">Подождите, Розыгрыш загружается</span>";
        raffleEmpty.classList.remove("raffle-empty--hidden");
      }
      if (raffleCurrent) raffleCurrent.classList.add("raffle-current--hidden");
    }
    function showRafflesError() {
      if (raffleEmpty) {
        raffleEmpty.textContent = "Ошибка загрузки. Проверьте сеть или перезайдите.";
        raffleEmpty.classList.remove("raffle-empty--hidden");
      }
      if (raffleCurrent) raffleCurrent.classList.add("raffle-current--hidden");
    }

    var cache = typeof window !== "undefined" ? window._rafflesCache : null;
    var cacheUsable = !!(cache && cache.data && cache.data.ok);
    if (cacheUsable) {
      applyRafflesData(cache.data, switchToCompleted);
    } else {
      showRafflesLoading();
    }

    function startFetch() {
      var url = base + "/api/raffles" + qLead + "&_t=" + Date.now() + (isLocal ? "&demo=1" : "");
      fetch(url)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (!data || !data.ok) {
            if (!cacheUsable) showRafflesError();
            return;
          }
          if (typeof window !== "undefined") window._rafflesCache = { data: data, time: Date.now() };
          applyRafflesData(data, switchToCompleted);
        })
        .catch(function () {
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
        rafflesIsAdmin = !!data.isAdmin;
        if (rafflesIsAdmin && typeof window.pokerMarkAdminAccess === "function") {
          window.pokerMarkAdminAccess("raffles");
        }
        if (adminWrap) adminWrap.classList.toggle("raffles-admin-wrap--hidden", !rafflesIsAdmin);
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

        var activeList = allRaffles.filter(function (r) {
          if (r.status !== "active") return false;
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

        // Вкладка «Активные»: показываем один розыгрыш. После админского создания держим
        // фокус на созданном id, иначе сортировка могла показать другой активный розыгрыш.
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
        if (!active) active = activeList[0] || null;
        var activeCount = active ? 1 : 0;
        var activeSumRub = active ? getRaffleTotalPrize(active) : 0;
        if (rafflesTabActiveCount) rafflesTabActiveCount.textContent = String(activeCount);
        if (rafflesTabActiveSum) rafflesTabActiveSum.textContent = formatRaffleSum(activeSumRub);

        if (active) {
          if (raffleCurrent) raffleCurrent.classList.remove("raffle-current--hidden");
          if (raffleEmpty) raffleEmpty.classList.add("raffle-empty--hidden");
          renderRaffle(active);
        } else {
          if (raffleCurrent) raffleCurrent.classList.add("raffle-current--hidden");
          if (raffleEmpty) {
            raffleEmpty.textContent = "Нет активных розыгрышей.";
            raffleEmpty.classList.remove("raffle-empty--hidden");
          }
          var rgGate = document.getElementById("raffleGuestGate");
          if (rgGate) {
            rgGate.classList.add("raffle-guest-gate--hidden");
            rgGate.hidden = true;
          }
          currentRaffleId = null;
          currentRaffleEndDate = null;
          if (raffleTimerInterval) {
            clearInterval(raffleTimerInterval);
            raffleTimerInterval = null;
          }
        }
        updateRaffleBadge(!!active);

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
        if (completedPanelVisible) {
          renderCompletedRafflesPanel(completed);
        } else {
          var completedRenderSeq = ++rafflesCompletedRenderSeq;
          setTimeout(function () {
            if (completedRenderSeq !== rafflesCompletedRenderSeq) return;
            renderCompletedRafflesPanel(completed);
          }, 0);
        }
  }

  if (typeof initRafflesBroadcastRuntime === "function") {
    var rafflesBroadcastRuntimeDeps = {};
    Object.defineProperties(rafflesBroadcastRuntimeDeps, {
      currentRaffleData: { get: function () { return currentRaffleData; } }
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
      loadRaffles: loadRaffles
    });
  }

  function setRafflesTab(tab) {
    var isActive = tab === "active";
    if (rafflesTabActive) rafflesTabActive.classList.toggle("raffles-tab--active", isActive);
    if (rafflesTabCompleted) rafflesTabCompleted.classList.toggle("raffles-tab--active", !isActive);
    if (rafflesPanelActive) rafflesPanelActive.classList.toggle("raffles-panel--active", isActive);
    if (rafflesPanelActive) rafflesPanelActive.classList.toggle("raffles-panel--hidden", !isActive);
    if (rafflesPanelCompleted) rafflesPanelCompleted.classList.toggle("raffles-panel--active", !isActive);
    if (rafflesPanelCompleted) rafflesPanelCompleted.classList.toggle("raffles-panel--hidden", isActive);
  }
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
  initRaffles.__reload = function () {
    loadRaffles();
  };
  loadRaffles();
}
