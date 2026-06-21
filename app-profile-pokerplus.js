function initProfilePokerPlus() {
  var section = document.getElementById("profilePokerPlusSection");
  var title = document.getElementById("profilePokerPlusTitle");
  var input = document.getElementById("profilePokerPlusCiphertextInput");
  var bindBtn = document.getElementById("profilePokerPlusBindBtn");
  var refreshBtn = document.getElementById("profilePokerPlusRefreshBtn");
  var statusRefreshBtn = document.getElementById("profileStatusRefreshBtn");
  var refreshAction = document.getElementById("profilePokerPlusRefreshAction");
  var unbindBtn = document.getElementById("profilePokerPlusUnbindBtn");
  var feedback = document.getElementById("profilePokerPlusFeedback");
  var form = document.getElementById("profilePokerPlusForm");
  var bottomActions = document.getElementById("profilePokerPlusBottomActions");
  var emailRow = document.getElementById("profilePokerPlusEmailRow");
  var emailValue = document.getElementById("profilePokerPlusEmailValue");
  var linkedRow = document.getElementById("profilePokerPlusLinkedRow");
  var linkedValue = document.getElementById("profilePokerPlusLinkedValue");
  var avatarRow = document.getElementById("profilePokerPlusAvatarRow");
  var avatarImg = document.getElementById("profilePokerPlusAvatarImg");
  var balanceRow = document.getElementById("profilePokerPlusBalanceRow");
  var balanceValue = document.getElementById("profilePokerPlusBalanceValue");
  var balanceToggle = document.getElementById("profilePokerPlusBalanceToggle");
  var registerRow = document.getElementById("profilePokerPlusRegisterRow");
  var registerValue = document.getElementById("profilePokerPlusRegisterValue");
  var positionRow = document.getElementById("profilePokerPlusPositionRow");
  var positionValue = document.getElementById("profilePokerPlusPositionValue");
  var leagueRow = document.getElementById("profilePokerPlusLeagueRow");
  var leagueLabel = document.getElementById("profilePokerPlusLeagueLabel");
  var leagueValue = document.getElementById("profilePokerPlusLeagueValue");
  var groupRow = document.getElementById("profilePokerPlusGroupRow");
  var groupValue = document.getElementById("profilePokerPlusGroupValue");
  var countryRow = document.getElementById("profilePokerPlusCountryRow");
  var countryValue = document.getElementById("profilePokerPlusCountryValue");
  var roleRow = document.getElementById("profilePokerPlusRoleRow");
  var roleValue = document.getElementById("profilePokerPlusRoleValue");
  var lastLoginRow = document.getElementById("profilePokerPlusLastLoginRow");
  var lastLoginValue = document.getElementById("profilePokerPlusLastLoginValue");
  var lastIpRow = document.getElementById("profilePokerPlusLastIpRow");
  var lastIpValue = document.getElementById("profilePokerPlusLastIpValue");
  var statsRow = document.getElementById("profilePokerPlusStatsRow");
  var statsValue = document.getElementById("profilePokerPlusStatsValue");
  var statsKindTabs = Array.prototype.slice.call(document.querySelectorAll("[data-profile-pokerplus-stats-tab]"));
  var statsPeriodTabs = Array.prototype.slice.call(document.querySelectorAll("[data-profile-pokerplus-stats-period]"));
  var statsDateFilter = document.getElementById("profilePokerPlusStatsDateFilter");
  var statsDateFromInput = document.getElementById("profilePokerPlusStatsDateFrom");
  var statsDateToInput = document.getElementById("profilePokerPlusStatsDateTo");
  var statsDateResetBtn = document.getElementById("profilePokerPlusStatsDateResetBtn");
  var statsCalendarTitle = document.getElementById("profilePokerPlusStatsCalendarTitle");
  var statsCalendarRange = document.getElementById("profilePokerPlusStatsCalendarRange");
  var statsCalendarDays = document.getElementById("profilePokerPlusStatsCalendarDays");
  var statsCalendarPrev = document.getElementById("profilePokerPlusStatsCalendarPrev");
  var statsCalendarNext = document.getElementById("profilePokerPlusStatsCalendarNext");
  var statsDateState = document.getElementById("profilePokerPlusStatsDateState");
  var statusLinkHint = document.getElementById("profileStatusLinkHint");
  var profileStatusProgressText = document.getElementById("profileStatusProgressText");
  var profileStatusTitle = document.getElementById("profileStatusTitle");
  if (!section || !input || !bindBtn || !refreshBtn || !unbindBtn) return;
  var refreshBtnHome = refreshBtn.parentNode;
  var refreshBtnHomeNext = refreshBtn.nextSibling;
  var POKERPLUS_KEY_INVISIBLE_RE = /[\u200B-\u200D\u2060\uFEFF]/g;
  var POKERPLUS_KEY_LOOKALIKE_MAP = {
    "\u0410": "A",
    "\u0412": "B",
    "\u0415": "E",
    "\u041a": "K",
    "\u041c": "M",
    "\u041d": "H",
    "\u041e": "O",
    "\u0420": "P",
    "\u0421": "C",
    "\u0422": "T",
    "\u0423": "Y",
    "\u0425": "X",
    "\u0430": "a",
    "\u0432": "b",
    "\u0435": "e",
    "\u043a": "k",
    "\u043c": "m",
    "\u043d": "h",
    "\u043e": "o",
    "\u0440": "p",
    "\u0441": "c",
    "\u0442": "t",
    "\u0443": "y",
    "\u0445": "x",
  };
  var POKERPLUS_STATS_KINDS = ["cash", "mtt", "sng"];
  var POKERPLUS_STATS_KIND_TITLES = { cash: "Кеш", mtt: "МТТ", sng: "СНГ" };
  var POKERPLUS_AUTO_REFRESH_INTERVAL_MS = 24 * 60 * 60 * 1000;
  var pokerPlusStatsVisibilityToOthers = { cash: false, mtt: false, sng: false };
  var pokerPlusProfileLinked = false;
  var pokerPlusProfileLoading = false;
  var pokerPlusAutoRefreshPromise = null;
  var pokerPlusAccountId = "";
  var pokerPlusPostTimeoutCheckSeq = 0;
  var pokerPlusLastSyncedAt = 0;
  var pokerPlusLastStatsProfile = null;
  var pokerPlusStatsAvailableDateKeys = [];
  var pokerPlusStatsCalendarMonth = "";
  var pokerPlusStatsActiveKind = "cash";
  var pokerPlusStatsActivePeriod = "week";
  var POKERPLUS_LOCAL_CIPHERTEXT_KEY = "poker_profile_pokerplus_ciphertext";
  var POKERPLUS_AUTO_REFRESH_AT_KEY = "poker_profile_pokerplus_auto_refresh_at";
  var pokerPlusRatingRetryTimer = null;

  function setFeedback(text, tone) {
    if (!feedback) return;
    feedback.textContent = text || "";
    feedback.style.color = tone === "warn" ? "#f59e0b" : tone ? "#ef4444" : "";
  }

  function pokerPlusRunFinally(promise, cleanup) {
    return Promise.resolve(promise).then(function (value) {
      try { cleanup(); } catch (eCleanup) {}
      return value;
    }, function (err) {
      try { cleanup(); } catch (eCleanup) {}
      throw err;
    });
  }

  function pokerPlusAuthBody(extra) {
    var body = typeof pokerGuestOrAuthedPostBody === "function"
      ? pokerGuestOrAuthedPostBody(extra || {})
      : typeof pokerApiAuthJsonBody === "function"
        ? pokerApiAuthJsonBody(extra || {})
        : Object.assign({}, extra || {});
    var emailSessionToken = pokerPlusEmailSessionToken();
    if (emailSessionToken) {
      body.pwaSession = emailSessionToken;
      delete body.initData;
      delete body.pwaVkSession;
    }
    return body;
  }

  function pokerPlusEmailSessionToken() {
    try {
      if (typeof pokerReadEmailPwaSessionToken === "function") return pokerReadEmailPwaSessionToken();
    } catch (eSharedEmailSession) {}
    var method = "";
    try {
      method = typeof pokerGetAuthMethod === "function" ? pokerGetAuthMethod() : "";
    } catch (eMethod) {}
    try {
      var record = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
      var recordMethod = record && record.authMethod ? String(record.authMethod || "").trim().toLowerCase() : "";
      if (recordMethod) method = recordMethod;
      if (method !== "email") return "";
      return typeof pokerReadPwaTgSessionToken === "function" ? String(pokerReadPwaTgSessionToken() || "").trim() : "";
    } catch (eEmailSession) {
      return "";
    }
  }

  function pokerPlusAuthBodyHasCredential(body) {
    return !!(body && (body.initData || body.pwaSession || body.pwaVkSession));
  }

  function pokerPlusMissingAuthMessage() {
    return "Сессия входа не передалась. Нажмите «Выйти из аккаунта» и войдите снова.";
  }

  function pokerPlusUnlinkedHint() {
    var method = "";
    try {
      method = typeof pokerGetAuthMethod === "function" ? pokerGetAuthMethod() : "";
    } catch (eMethod) {}
    if (method === "telegram") {
      return "Poker21 не привязан к этому Telegram. Если вы регистрировались через email, откройте «Профиль в клубе» и привяжите Telegram к той же почте. Или вставьте ключ из Poker21 ниже.";
    }
    if (method === "email") {
      return "Poker21 ещё не привязан к этой почте. Вставьте ключ из Poker21 ниже; после привязки профиль будет открываться в этом аккаунте.";
    }
    return "Poker21 ещё не привязан. Вставьте ключ из Poker21 ниже.";
  }

  function notifyPokerPlusStatusChange(linked, profile) {
    var detail = { linked: !!linked };
    if (!linked) detail.level = 0;
    var p = profile && typeof profile === "object" ? profile : null;
    if (p && p.pokerPlusUserId) detail.p21Id = String(p.pokerPlusUserId);
    if (linked && p) {
      var nickname = p.nickname || p.Nike || p.nick || p.name || "";
      if (nickname) detail.pokerPlusNickname = String(nickname).trim();
    }
    if (linked && p && (typeof pokerProfileStatusFromProfile === "function" || typeof pokerProfileStatusFromRake === "function")) {
      var total = p.totalCounter && typeof p.totalCounter === "object" ? p.totalCounter : (p.total_counter && typeof p.total_counter === "object" ? p.total_counter : null);
      var status = typeof pokerProfileStatusFromProfile === "function" ? pokerProfileStatusFromProfile(p, true) : pokerProfileStatusFromRake(total && total.fee != null ? total.fee : null);
      if (status && status.level != null) detail.level = status.level;
    }
    try {
      window.dispatchEvent(new CustomEvent("poker-pokerplus-status-change", { detail: detail }));
    } catch (eNotifyPpStatus) {}
  }

  function normalizePokerPlusKeyInput(value) {
    return String(value || "")
      .replace(POKERPLUS_KEY_INVISIBLE_RE, "")
      .replace(/\s+/g, "")
      .trim()
      .replace(/[\u0410\u0412\u0415\u041A\u041C\u041D\u041E\u0420\u0421\u0422\u0423\u0425\u0430\u0432\u0435\u043A\u043C\u043D\u043E\u0440\u0441\u0442\u0443\u0445]/g, function (ch) {
        return POKERPLUS_KEY_LOOKALIKE_MAP[ch] || ch;
      })
      .slice(0, 64);
  }

  function pokerPlusLocalCiphertextKey(accountId) {
    var id = String(accountId || "").trim();
    return id ? POKERPLUS_LOCAL_CIPHERTEXT_KEY + ":" + id : POKERPLUS_LOCAL_CIPHERTEXT_KEY;
  }

  function pokerPlusAutoRefreshAtKey(accountId) {
    var id = String(accountId || "").trim();
    return id ? POKERPLUS_AUTO_REFRESH_AT_KEY + ":" + id : POKERPLUS_AUTO_REFRESH_AT_KEY;
  }

  function savePokerPlusLocalCiphertext(accountId, ciphertext) {
    var normalized = normalizePokerPlusKeyInput(ciphertext || "");
    if (!normalized) return;
    try {
      localStorage.setItem(POKERPLUS_LOCAL_CIPHERTEXT_KEY, normalized);
      localStorage.setItem(pokerPlusLocalCiphertextKey(accountId), normalized);
    } catch (eSaveLocalP21Key) {}
  }

  function readPokerPlusLocalCiphertext(accountId) {
    try {
      return normalizePokerPlusKeyInput(
        localStorage.getItem(pokerPlusLocalCiphertextKey(accountId)) ||
        localStorage.getItem(POKERPLUS_LOCAL_CIPHERTEXT_KEY) ||
        ""
      );
    } catch (eReadLocalP21Key) {
      return "";
    }
  }

  function clearPokerPlusLocalCiphertext(accountId) {
    try {
      localStorage.removeItem(pokerPlusLocalCiphertextKey(accountId));
      localStorage.removeItem(POKERPLUS_LOCAL_CIPHERTEXT_KEY);
    } catch (eClearLocalP21Key) {}
  }

  function readPokerPlusAutoRefreshAt(accountId) {
    try {
      var raw = localStorage.getItem(pokerPlusAutoRefreshAtKey(accountId)) || localStorage.getItem(POKERPLUS_AUTO_REFRESH_AT_KEY) || "";
      var n = Number(raw);
      return isFinite(n) ? n : 0;
    } catch (eReadP21AutoRefresh) {
      return 0;
    }
  }

  function writePokerPlusAutoRefreshAt(accountId, value) {
    var n = Number(value) || Date.now();
    try {
      localStorage.setItem(POKERPLUS_AUTO_REFRESH_AT_KEY, String(n));
      localStorage.setItem(pokerPlusAutoRefreshAtKey(accountId), String(n));
    } catch (eWriteP21AutoRefresh) {}
  }

  function shouldAutoRefreshPokerPlus() {
    if (!pokerPlusProfileLinked || pokerPlusProfileLoading || pokerPlusAutoRefreshPromise) return false;
    if (!readPokerPlusLocalCiphertext(pokerPlusAccountId)) return false;
    var now = Date.now();
    if (pokerPlusLastSyncedAt && now - pokerPlusLastSyncedAt < POKERPLUS_AUTO_REFRESH_INTERVAL_MS) return false;
    var lastAttemptAt = readPokerPlusAutoRefreshAt(pokerPlusAccountId);
    if (lastAttemptAt && now - lastAttemptAt < POKERPLUS_AUTO_REFRESH_INTERVAL_MS) return false;
    return true;
  }

  function auth() {
    try {
      if (typeof pokerProfileAuthState === "function") {
        var profileState = pokerProfileAuthState();
        if (profileState) {
          return {
            isGuest: !!profileState.isGuest,
            isVerified: !!profileState.isVerified,
          };
        }
      }
    } catch (eProfileAuthState) {}
    var authState = window.__pokerTelegramAuth;
    var isGuest = !!(authState && authState.status === "guest");
    if (!isGuest) {
      try {
        isGuest = typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode();
      } catch (eGuestMode) {}
    }
    var isVerified = !!(authState && (authState.status === "verified" || authState.status === "dev_skip"));
    return { isGuest: isGuest, isVerified: isVerified };
  }

  function pokerPlusText(value) {
    return value != null && String(value).trim() ? String(value).trim() : "";
  }

  function pokerPlusLocale() {
    return typeof getPwaAuthLocale === "function" && getPwaAuthLocale() === "en" ? "en" : "ru";
  }

  function pokerPlusRatingNumberText(value) {
    var n = Number(value);
    if (n !== n || !isFinite(n)) n = 0;
    return Math.round(n).toLocaleString("ru-RU");
  }

  function pokerPlusRatingNickKey(nick) {
    var text = pokerPlusText(nick);
    if (typeof normalizeWinterNickForFinalTable === "function") text = normalizeWinterNickForFinalTable(text);
    else if (typeof normalizeWinterNick === "function") text = normalizeWinterNick(text);
    return pokerPlusText(text).toLowerCase();
  }

  function pokerPlusRatingNickMatches(a, b) {
    var ak = pokerPlusRatingNickKey(a);
    var bk = pokerPlusRatingNickKey(b);
    return !!ak && !!bk && ak === bk;
  }

  function pokerPlusProfileRatingNick(profile) {
    var p = profile && typeof profile === "object" ? profile : {};
    return pokerPlusText(p.nickname || p.Nike || p.nick || p.name || p.displayName || p.display_name);
  }

  function pokerPlusSummerRatingRowsByLeague(leagueNum) {
    if (typeof SUMMER_RATING_TOURNAMENTS_BY_DATE === "undefined") return null;
    var tournamentsByDate = SUMMER_RATING_TOURNAMENTS_BY_DATE || {};
    var season = typeof SUMMER_RATING_SEASON !== "undefined" ? SUMMER_RATING_SEASON : {};
    var monthRegex = season.monthRegex || /\.(06|07|08)\.2026$/;
    var dateStrs = Object.keys(tournamentsByDate).filter(function (d) { return monthRegex.test(d); });
    var byNick = {};
    for (var i = 0; i < dateStrs.length; i++) {
      var list = tournamentsByDate[dateStrs[i]];
      if (!Array.isArray(list) || !list.length) continue;
      for (var j = 0; j < list.length; j++) {
        var t = list[j] || {};
        var forcedLeague = t.league != null ? Number(t.league) : NaN;
        var buyin = t.buyin != null ? Number(t.buyin) : NaN;
        var inLeague1 = forcedLeague === 1 || (forcedLeague !== forcedLeague && (buyin >= 500 || (buyin !== buyin)));
        var inLeague2 = forcedLeague === 2 || (forcedLeague !== forcedLeague && buyin >= 100 && buyin < 500);
        var include = (leagueNum === 1 && inLeague1) || (leagueNum === 2 && inLeague2);
        if (!include) continue;
        var players = t.players || [];
        for (var k = 0; k < players.length; k++) {
          var player = players[k] || {};
          var nick = typeof normalizeWinterNickForFinalTable === "function" ? normalizeWinterNickForFinalTable(player.nick) : pokerPlusText(player.nick);
          if (!nick) continue;
          var points = typeof winterRatingTournamentPlayerPoints === "function" ? winterRatingTournamentPlayerPoints(player) : 0;
          var reward = player.reward != null ? Number(player.reward) : 0;
          if (points !== points || !isFinite(points)) points = 0;
          if (reward !== reward || !isFinite(reward)) reward = 0;
          if (!byNick[nick]) byNick[nick] = { nick: nick, points: 0, reward: 0 };
          byNick[nick].points += points;
          byNick[nick].reward += reward;
        }
      }
    }
    return Object.keys(byNick).map(function (nick) {
      return byNick[nick];
    }).filter(function (row) {
      return Number(row.points) !== 0 || Number(row.reward) !== 0;
    }).sort(function (a, b) {
      return (Number(b.points) - Number(a.points)) || (Number(b.reward) - Number(a.reward));
    });
  }

  function pokerPlusFindSummerRatings(profile) {
    var targetNick = pokerPlusProfileRatingNick(profile);
    if (!targetNick) return { state: "no-nick" };
    var leagueRows1 = pokerPlusSummerRatingRowsByLeague(1);
    var leagueRows2 = pokerPlusSummerRatingRowsByLeague(2);
    if (!leagueRows1 || !leagueRows2) return { state: "loading" };
    var leagues = [
      { league: 1, rows: leagueRows1 },
      { league: 2, rows: leagueRows2 },
    ];
    var results = [];
    for (var i = 0; i < leagues.length; i++) {
      var rows = leagues[i].rows || [];
      var found = null;
      for (var j = 0; j < rows.length; j++) {
        if (pokerPlusRatingNickMatches(rows[j].nick, targetNick)) {
          found = {
            league: leagues[i].league,
            place: j + 1,
            points: rows[j].points,
            reward: rows[j].reward,
          };
          break;
        }
      }
      results.push(found || { league: leagues[i].league, missing: true });
    }
    return {
      state: results.some(function (row) { return row && !row.missing; }) ? "found" : "missing",
      leagues: results,
    };
  }

  function pokerPlusSummerRatingLeagueHtml(row) {
    var league = row && row.league ? Number(row.league) : 0;
    if (!row || row.missing) {
      return (
        '<span class="profile-pokerplus-summer-rating__league profile-pokerplus-summer-rating__league--missing">' +
          '<span class="profile-pokerplus-summer-rating__league-name">Лига ' + escapeHtml(league || "") + "</span>" +
          '<span class="profile-pokerplus-summer-rating__place">нет места</span>' +
          '<span class="profile-pokerplus-summer-rating__meta">0 баллов · 0 ₽</span>' +
        "</span>"
      );
    }
    return (
      '<span class="profile-pokerplus-summer-rating__league">' +
        '<span class="profile-pokerplus-summer-rating__league-name">Лига ' + escapeHtml(league) + "</span>" +
        '<span class="profile-pokerplus-summer-rating__place">место ' + escapeHtml(row.place) + "</span>" +
        '<span class="profile-pokerplus-summer-rating__meta">' +
          escapeHtml(pokerPlusRatingNumberText(row.points)) +
          " баллов · " +
          escapeHtml(pokerPlusRatingNumberText(row.reward)) +
          " ₽" +
        "</span>" +
      "</span>"
    );
  }

  function renderPokerPlusSummerRating(profile) {
    if (!leagueRow || !leagueValue) return;
    if (leagueLabel) leagueLabel.textContent = "Рейтинг лета 2026";
    leagueRow.hidden = false;
    var rating = pokerPlusFindSummerRatings(profile);
    if (rating.state === "found" || rating.state === "missing") {
      var leagues = Array.isArray(rating.leagues) ? rating.leagues : [];
      leagueValue.innerHTML =
        '<span class="profile-pokerplus-summer-rating">' +
          '<span class="profile-pokerplus-summer-rating__leagues">' +
            leagues.map(pokerPlusSummerRatingLeagueHtml).join("") +
          "</span>" +
        "</span>";
      return;
    }
    if (rating.state === "loading") {
      leagueValue.textContent = "Рейтинг загружается";
      if (!pokerPlusRatingRetryTimer) {
        pokerPlusRatingRetryTimer = setTimeout(function () {
          pokerPlusRatingRetryTimer = null;
          renderPokerPlusSummerRating(profile);
        }, 900);
      }
      return;
    }
    leagueValue.textContent = rating.state === "no-nick" ? "Ник Poker21 не найден" : "Нет в летнем рейтинге";
  }

  function setPokerPlusRefreshButtonText(linked) {
    var text = linked ? (pokerPlusLocale() === "en" ? "Refresh" : "Обновить") : "";
    if (refreshBtn) refreshBtn.textContent = text;
    if (statusRefreshBtn) statusRefreshBtn.textContent = text;
  }

  function setPokerPlusRefreshButtonsState(state) {
    var buttons = [refreshBtn, statusRefreshBtn].filter(Boolean);
    var text = "";
    if (state === "loading") text = pokerPlusLocale() === "en" ? "Refreshing..." : "Обновляем...";
    else if (state === "done") text = pokerPlusLocale() === "en" ? "Updated" : "Обновлено";
    buttons.forEach(function (btn) {
      btn.classList.toggle("profile-status__refresh-btn--loading", state === "loading");
      btn.classList.toggle("profile-status__refresh-btn--done", state === "done");
      btn.setAttribute("aria-busy", state === "loading" ? "true" : "false");
      if (text) btn.textContent = text;
    });
  }

  function setPokerPlusRefreshButtonsDisabled(disabled) {
    if (refreshBtn) refreshBtn.disabled = !!disabled;
    if (statusRefreshBtn) statusRefreshBtn.disabled = !!disabled;
  }

  function setPokerPlusInitialLoading(loading) {
    if (!section || !section.classList) return;
    section.classList.toggle("profile-pokerplus-card--loading", !!loading);
    if (loading && title) title.textContent = pokerPlusLocale() === "en" ? "Poker21 Profile" : "Профиль в Poker21";
  }

  function setProfileStatusLoading(loading) {
    var statusSection = document.getElementById("profileStatusSection");
    var statusLoading = document.getElementById("profileStatusLoading");
    pokerPlusProfileLoading = !!loading;
    if (statusSection && statusSection.classList) {
      statusSection.classList.toggle("profile-status--loading", !!loading);
    }
    if (statusLoading) statusLoading.hidden = !loading;
    updateProfileStatusTextVisibility();
  }

  function updateProfileStatusTextVisibility() {
    var statusSection = document.getElementById("profileStatusSection");
    if (statusSection && statusSection.classList) {
      statusSection.classList.toggle("profile-status--unlinked", !pokerPlusProfileLinked);
    }
    var canRenderUnlinkedStatus = !pokerPlusProfileLinked && !pokerPlusProfileLoading && typeof setProfileStatusUnlinked === "function";
    if (canRenderUnlinkedStatus) setProfileStatusUnlinked();
    if (profileStatusTitle) profileStatusTitle.hidden = !!pokerPlusProfileLoading;
    if (!pokerPlusProfileLinked && !canRenderUnlinkedStatus && profileStatusTitle) profileStatusTitle.textContent = "Привяжите ваш аккаунт";
    if (profileStatusProgressText) profileStatusProgressText.hidden = !!pokerPlusProfileLoading || (!pokerPlusProfileLinked && !canRenderUnlinkedStatus);
    if (!pokerPlusProfileLinked && !canRenderUnlinkedStatus && profileStatusProgressText) profileStatusProgressText.textContent = "";
    if (statusLinkHint) {
      statusLinkHint.hidden = true;
    }
  }

  function pokerPlusWholeNumber(value) {
    var raw = pokerPlusText(value);
    if (!raw) return "";
    var n = Number(String(raw).replace(/\s+/g, "").replace(",", "."));
    if (!isFinite(n)) return raw.replace(/([.,]\d+)\b/, "");
    return String(n < 0 ? Math.ceil(n) : Math.floor(n));
  }

  function pokerPlusNumber(value) {
    var raw = pokerPlusText(value);
    if (!raw) return null;
    var n = Number(String(raw).replace(/\s+/g, "").replace(",", "."));
    return isFinite(n) ? n : null;
  }

  function pokerPlusBool(value) {
    return value === true || value === 1 || value === "1" || value === "true";
  }

  function pokerPlusStatsKindTitle(kind) {
    return POKERPLUS_STATS_KIND_TITLES[kind] || "Статистика";
  }

  function pokerPlusStatsVisibilityAny(map) {
    var source = map && typeof map === "object" ? map : {};
    return POKERPLUS_STATS_KINDS.some(function (kind) {
      return !!source[kind];
    });
  }

  function normalizePokerPlusStatsVisibility(value) {
    var map = {};
    if (value && typeof value === "object" && !Array.isArray(value)) {
      POKERPLUS_STATS_KINDS.forEach(function (kind) {
        map[kind] = pokerPlusBool(value[kind]);
      });
      return map;
    }
    var visible = pokerPlusBool(value);
    POKERPLUS_STATS_KINDS.forEach(function (kind) {
      map[kind] = visible;
    });
    return map;
  }

  function clonePokerPlusStatsVisibility(map) {
    return normalizePokerPlusStatsVisibility(map);
  }

  function pokerPlusStatsVisibilityEquals(a, b) {
    return POKERPLUS_STATS_KINDS.every(function (kind) {
      return !!(a && a[kind]) === !!(b && b[kind]);
    });
  }

  function setPokerPlusStatsVisibilityMap(map) {
    pokerPlusStatsVisibilityToOthers = normalizePokerPlusStatsVisibility(map);
  }

  function renderPokerPlusBalance() {
    if (balanceRow) balanceRow.hidden = true;
    if (balanceValue) balanceValue.textContent = "—";
    if (balanceToggle) {
      balanceToggle.hidden = true;
      balanceToggle.setAttribute("aria-pressed", "false");
      balanceToggle.setAttribute("aria-label", "Баланс Poker21 скрыт");
    }
  }

  function pokerPlusStatsVisibilityStateText(kind, visible) {
    return "Блок " + pokerPlusStatsKindTitle(kind) + (visible ? " доступен другим игрокам." : " скрыт от других игроков.");
  }

  function renderPokerPlusStatsVisibilityToggle(savingKind) {
    if (!section) return;
    var buttons = Array.prototype.slice.call(section.querySelectorAll("[data-profile-pokerplus-stats-kind][data-profile-pokerplus-stats-visible]"));
    buttons.forEach(function (btn) {
      var kind = btn.dataset.profilePokerplusStatsKind || "";
      if (POKERPLUS_STATS_KINDS.indexOf(kind) === -1) return;
      var targetVisible = btn.dataset.profilePokerplusStatsVisible === "1";
      var active = !!pokerPlusStatsVisibilityToOthers[kind] === targetVisible;
      btn.classList.toggle("profile-pokerplus-stats-visibility__btn--active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.disabled = !!savingKind && savingKind === kind;
    });
    var states = Array.prototype.slice.call(section.querySelectorAll("[data-profile-pokerplus-stats-state]"));
    states.forEach(function (stateEl) {
      var kind = stateEl.dataset.profilePokerplusStatsState || "";
      if (POKERPLUS_STATS_KINDS.indexOf(kind) === -1) return;
      var visible = !!pokerPlusStatsVisibilityToOthers[kind];
      stateEl.textContent = pokerPlusStatsVisibilityStateText(kind, visible);
      stateEl.classList.toggle("profile-pokerplus-stats-visibility__state--visible", visible);
      stateEl.classList.toggle("profile-pokerplus-stats-visibility__state--hidden", !visible);
    });
  }

  function applyPokerPlusStatsVisible(value) {
    setPokerPlusStatsVisibilityMap(value);
    renderPokerPlusStatsVisibilityToggle(false);
  }

  function applyPokerPlusStatsVisibility(value) {
    setPokerPlusStatsVisibilityMap(value);
    renderPokerPlusStatsVisibilityToggle(false);
  }

  window.pokerApplyPokerPlusStatsVisible = applyPokerPlusStatsVisible;
  window.pokerApplyPokerPlusStatsVisibility = applyPokerPlusStatsVisibility;

  function savePokerPlusStatsVisible(kind, value) {
    var nextMap = clonePokerPlusStatsVisibility(pokerPlusStatsVisibilityToOthers);
    var savingKind = "";
    if (arguments.length === 1) {
      nextMap = normalizePokerPlusStatsVisibility(kind);
    } else {
      if (POKERPLUS_STATS_KINDS.indexOf(kind) === -1) return;
      savingKind = kind;
      nextMap[kind] = !!value;
    }
    if (pokerPlusStatsVisibilityEquals(nextMap, pokerPlusStatsVisibilityToOthers)) return;
    var prevMap = clonePokerPlusStatsVisibility(pokerPlusStatsVisibilityToOthers);
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    var body = pokerPlusAuthBody({
      pokerPlusStatsVisibility: nextMap,
      pokerPlusStatsVisible: pokerPlusStatsVisibilityAny(nextMap),
    });
    if (!base || !pokerPlusAuthBodyHasCredential(body)) return;
    setPokerPlusStatsVisibilityMap(nextMap);
    renderPokerPlusStatsVisibilityToggle(savingKind);
    pokerPlusRunFinally(
      fetch(base + "/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function (data) {
          if (!data || !data.ok) {
            setPokerPlusStatsVisibilityMap(prevMap);
            setFeedback((data && data.error) || "Не удалось сохранить видимость статистики.", true);
          } else {
            pokerProfileUserInfoCache = null;
            pokerProfileUserInfoCacheAt = 0;
            setFeedback("", false);
          }
        })
        .catch(function () {
          setPokerPlusStatsVisibilityMap(prevMap);
          setFeedback(POKER_NET_ERR, true);
        }),
      function () {
        renderPokerPlusStatsVisibilityToggle(false);
      }
    );
  }

  function pokerPlusShortStat(value) {
    var n = Number(value);
    if (!isFinite(n)) return pokerPlusText(value);
    var abs = Math.abs(n);
    var sign = n < 0 ? "-" : "";
    if (abs >= 1000000) return sign + (abs / 1000000).toFixed(abs >= 10000000 ? 0 : 1).replace(/\.?0+$/, "") + "M";
    if (abs >= 1000) return sign + Math.round(abs / 1000) + "K";
    return String(value);
  }

  function pokerPlusStatMetricHtml(label, value, tone, icon, options) {
    var raw = pokerPlusText(value);
    var hasValue = !!raw;
    var rawDisplay = hasValue ? pokerPlusWholeNumber(raw) : "—";
    var cls = "profile-pokerplus-stat";
    var opts = options && typeof options === "object" ? options : {};
    if (opts.extraClass) cls += " " + String(opts.extraClass || "");
    if (tone) cls += " profile-pokerplus-stat--" + tone;
    return (
      '<span class="' +
      cls +
      '"><span class="profile-pokerplus-stat__label">' +
      escapeHtml(label) +
      '</span><span class="profile-pokerplus-stat__ring"><span class="profile-pokerplus-stat__icon">' +
      escapeHtml(icon || "") +
      '</span></span><span class="profile-pokerplus-stat__value">' +
      escapeHtml(hasValue ? pokerPlusShortStat(value) : "—") +
      '</span><span class="profile-pokerplus-stat__raw">' +
      escapeHtml(rawDisplay) +
      "</span></span>"
    );
  }

  function pokerPlusPercentText(value, totalValue) {
    var raw = pokerPlusText(value);
    var rawTotal = pokerPlusText(totalValue);
    if (!raw || !rawTotal) return "—";
    var n = Number(String(raw).replace(/\s+/g, "").replace(",", "."));
    var total = Number(String(rawTotal).replace(/\s+/g, "").replace(",", "."));
    if (!isFinite(n) || !isFinite(total)) return "—";
    if (n <= 0 || total <= 0) return "0%";
    var percent = Math.min(100, Math.max(0, (n / total) * 100));
    var fixed = percent > 0 && percent < 10 ? percent.toFixed(1) : percent.toFixed(0);
    return (fixed.indexOf(".") === -1 ? fixed : fixed.replace(/0+$/, "").replace(/\.$/, "")) + "%";
  }

  function pokerPlusTournamentCountStat(countValue, itmValue, firstValue) {
    var count = pokerPlusNumber(countValue);
    var itm = pokerPlusNumber(itmValue);
    var first = pokerPlusNumber(firstValue);
    var minCount = Math.max(0, itm != null ? Math.floor(itm) : 0, first != null ? Math.floor(first) : 0);
    if (minCount > 0 && (count == null || count < minCount)) {
      return { value: String(minCount) + "+", percentTotal: null };
    }
    return { value: countValue, percentTotal: countValue };
  }

  function pokerPlusItmMetricHtml(label, itmValue, totalValue) {
    var raw = pokerPlusText(itmValue);
    var hasValue = !!raw;
    var itmDisplay = hasValue ? pokerPlusWholeNumber(raw) : "—";
    var percentDisplay = hasValue ? pokerPlusPercentText(itmValue, totalValue) : "—";
    return (
      '<span class="profile-pokerplus-stat profile-pokerplus-stat--detail"><span class="profile-pokerplus-stat__label">' +
      escapeHtml(label) +
      '</span><span class="profile-pokerplus-stat__ring"><span class="profile-pokerplus-stat__icon">ITM</span></span><span class="profile-pokerplus-stat__lines">' +
      '<span class="profile-pokerplus-stat__line"><span class="profile-pokerplus-stat__line-label">Кол-во ITM:</span><span class="profile-pokerplus-stat__line-value">' +
      escapeHtml(itmDisplay) +
      '</span></span><span class="profile-pokerplus-stat__line"><span class="profile-pokerplus-stat__line-label">Процент ITM:</span><span class="profile-pokerplus-stat__line-value">' +
      escapeHtml(percentDisplay) +
      "</span></span></span></span>"
    );
  }

  function pokerPlusStatsVisibilityHtml(kind, title) {
    if (POKERPLUS_STATS_KINDS.indexOf(kind) === -1) return "";
    var visible = !!pokerPlusStatsVisibilityToOthers[kind];
    var activeYes = visible ? " profile-pokerplus-stats-visibility__btn--active" : "";
    var activeNo = visible ? "" : " profile-pokerplus-stats-visibility__btn--active";
    return (
      '<span class="profile-pokerplus-stats-visibility profile-pokerplus-stats-visibility--section" data-profile-pokerplus-stats-visibility-kind="' +
      escapeHtml(kind) +
      '"><span class="profile-pokerplus-stats-visibility__label">Показывать другим</span><span class="profile-pokerplus-stats-visibility__switch" role="group" aria-label="Показывать блок ' +
      escapeHtml(title || pokerPlusStatsKindTitle(kind)) +
      ' другим"><button type="button" class="profile-pokerplus-stats-visibility__btn' +
      activeYes +
      '" data-profile-pokerplus-stats-kind="' +
      escapeHtml(kind) +
      '" data-profile-pokerplus-stats-visible="1" aria-pressed="' +
      (visible ? "true" : "false") +
      '">Да</button><button type="button" class="profile-pokerplus-stats-visibility__btn' +
      activeNo +
      '" data-profile-pokerplus-stats-kind="' +
      escapeHtml(kind) +
      '" data-profile-pokerplus-stats-visible="0" aria-pressed="' +
      (visible ? "false" : "true") +
      '">Нет</button></span><span class="profile-pokerplus-stats-visibility__state' +
      (visible ? " profile-pokerplus-stats-visibility__state--visible" : " profile-pokerplus-stats-visibility__state--hidden") +
      '" data-profile-pokerplus-stats-state="' +
      escapeHtml(kind) +
      '" aria-live="polite">' +
      escapeHtml(pokerPlusStatsVisibilityStateText(kind, visible)) +
      "</span></span>"
    );
  }

  function pokerPlusStatsSectionHtml(kind, title, metrics) {
    if (!metrics || !metrics.length) return "";
    return (
      '<span class="profile-pokerplus-stats-section profile-pokerplus-stats-section--' +
      escapeHtml(kind || "default") +
      '"><span class="profile-pokerplus-stats-section__title">' +
      escapeHtml(title || "Статистика") +
      '</span><span class="profile-pokerplus-stats">' +
      metrics.join("") +
      "</span>" +
      pokerPlusStatsVisibilityHtml(kind || "default", title || "Статистика") +
      "</span>"
    );
  }

  function pokerPlusStatTone(value) {
    var n = Number(value);
    if (!isFinite(n) || n === 0) return "";
    return n > 0 ? "good" : "bad";
  }

  function pokerPlusPickStat(total, camelKey, snakeKey) {
    if (!total || typeof total !== "object") return null;
    if (total[camelKey] != null && total[camelKey] === total[camelKey]) return total[camelKey];
    if (snakeKey && total[snakeKey] != null && total[snakeKey] === total[snakeKey]) return total[snakeKey];
    return null;
  }

  var POKERPLUS_COUNTER_SUM_KEYS = [
    ["fee", "fee"],
    ["mttRound", "mtt_round"],
    ["mttWinnings", "mtt_winnings"],
    ["mttCountedWinnings", "mtt_counted_winnings"],
    ["sngRound", "sng_round"],
    ["sngWinnings", "sng_winnings"],
    ["hands", "hands"],
    ["winnings", "winnings"],
    ["bb", "bb"],
    ["ofcWinnings", "ofc_winnings"],
    ["mttCount", "mtt_count"],
    ["mttItmCount", "mtt_itm_count"],
    ["mttFirstCount", "mtt_1st_count"],
    ["sngCount", "sng_count"],
    ["sngItmCount", "sng_itm_count"],
    ["sngFirstCount", "sng_1st_count"],
  ];

  function pokerPlusCanonicalCounter(total) {
    var out = {};
    POKERPLUS_COUNTER_SUM_KEYS.forEach(function (keys) {
      var value = pokerPlusPickStat(total, keys[0], keys[1]);
      if (value == null || value !== value || String(value).trim() === "") return;
      var n = Number(value);
      if (isFinite(n)) out[keys[0]] = n;
    });
    return out;
  }

  function pokerPlusAddCounter(target, source) {
    var normalized = pokerPlusCanonicalCounter(source);
    POKERPLUS_COUNTER_SUM_KEYS.forEach(function (keys) {
      var key = keys[0];
      if (normalized[key] == null) return;
      target[key] = (Number(target[key]) || 0) + normalized[key];
    });
    return target;
  }

  function pokerPlusTournamentCountFloor(counter, kind) {
    var prefix = kind === "sng" ? "sng" : "mtt";
    var snake = prefix;
    var count = pokerPlusNumber(pokerPlusPickStat(counter, prefix + "Count", snake + "_count"));
    var itm = pokerPlusNumber(pokerPlusPickStat(counter, prefix + "ItmCount", snake + "_itm_count"));
    var first = pokerPlusNumber(pokerPlusPickStat(counter, prefix + "FirstCount", snake + "_1st_count"));
    return Math.max(0, count != null ? Math.floor(count) : 0, itm != null ? Math.floor(itm) : 0, first != null ? Math.floor(first) : 0);
  }

  function pokerPlusCountedTournamentWinningsFromSnapshots(source, todayCounter, kind) {
    var prefix = kind === "sng" ? "sng" : "mtt";
    var snake = prefix;
    var snapshots = pokerPlusStatsSnapshots(source);
    var dates = snapshots.dates.slice();
    var todayKey = pokerPlusLocalDateKey(new Date());
    var total = 0;
    var count = 0;
    var hasWinnings = false;
    function addCounter(counter) {
      if (!counter || !pokerPlusTournamentCountFloor(counter, prefix)) return;
      var raw = pokerPlusPickStat(counter, prefix + "Winnings", snake + "_winnings");
      if (raw == null || raw !== raw || String(raw).trim() === "") return;
      var n = pokerPlusNumber(raw);
      if (n == null) return;
      total += n;
      count += pokerPlusTournamentCountFloor(counter, prefix);
      hasWinnings = true;
    }
    dates.forEach(function (date) {
      addCounter(snapshots.dailyCounters[date]);
    });
    if (dates.indexOf(todayKey) === -1 && pokerPlusCounterHasValue(todayCounter)) {
      addCounter(todayCounter);
    }
    return hasWinnings ? { winnings: total, count: count } : null;
  }

  function pokerPlusStatOrZero(value) {
    if (value == null || value !== value || String(value).trim() === "") return 0;
    return value;
  }

  function pokerPlusCounterHasValue(total) {
    if (!total || typeof total !== "object") return false;
    var keys = [
      "fee",
      "hands",
      "winnings",
      "bb",
      "ofcWinnings",
      "ofc_winnings",
      "mttRound",
      "mtt_round",
      "mttWinnings",
      "mtt_winnings",
      "mttCountedWinnings",
      "mtt_counted_winnings",
      "mttCount",
      "mtt_count",
      "mttItmCount",
      "mtt_itm_count",
      "mttFirstCount",
      "mtt_1st_count",
      "sngRound",
      "sng_round",
      "sngWinnings",
      "sng_winnings",
      "sngCount",
      "sng_count",
      "sngItmCount",
      "sng_itm_count",
      "sngFirstCount",
      "sng_1st_count",
    ];
    for (var i = 0; i < keys.length; i += 1) {
      var v = total[keys[i]];
      if (v != null && v === v && String(v).trim() !== "") return true;
    }
    return false;
  }

  function pokerPlusProfileHasOnlyZeroStats(profile) {
    var p = profile && typeof profile === "object" ? profile : null;
    if (!p) return false;
    var counters = [
      p.todayCounter || p.today_counter,
      p.weekCounter || p.week_counter,
      p.totalCounter || p.total_counter,
    ];
    var keys = [
      "fee",
      "hands",
      "winnings",
      "bb",
      "ofcWinnings",
      "ofc_winnings",
      "mttRound",
      "mtt_round",
      "mttWinnings",
      "mtt_winnings",
      "mttCountedWinnings",
      "mtt_counted_winnings",
      "mttCount",
      "mtt_count",
      "mttItmCount",
      "mtt_itm_count",
      "mttFirstCount",
      "mtt_1st_count",
      "sngRound",
      "sng_round",
      "sngWinnings",
      "sng_winnings",
      "sngCount",
      "sng_count",
      "sngItmCount",
      "sng_itm_count",
      "sngFirstCount",
      "sng_1st_count",
    ];
    var hasValue = false;
    for (var c = 0; c < counters.length; c += 1) {
      var counter = counters[c];
      if (!counter || typeof counter !== "object") continue;
      for (var i = 0; i < keys.length; i += 1) {
        var raw = counter[keys[i]];
        if (raw == null || raw !== raw || String(raw).trim() === "") continue;
        var n = Number(raw);
        if (!isFinite(n)) return false;
        hasValue = true;
        if (n !== 0) return false;
      }
    }
    return hasValue;
  }

  function pokerPlusProfileWithoutStats(profile) {
    var p = profile && typeof profile === "object" ? profile : null;
    if (!p) return profile;
    var next = {};
    Object.keys(p).forEach(function (key) {
      if (key === "todayCounter" || key === "today_counter" || key === "weekCounter" || key === "week_counter" || key === "totalCounter" || key === "total_counter") return;
      next[key] = p[key];
    });
    next.statsPending = true;
    return next;
  }

  function pokerPlusStatsGroupHtml(title, totalSource, includeEmptyCore, options) {
    var total = totalSource && typeof totalSource === "object" ? totalSource : {};
    var opts = options && typeof options === "object" ? options : {};
    var activeKind = POKERPLUS_STATS_KINDS.indexOf(opts.kind) !== -1 ? opts.kind : pokerPlusStatsActiveKind;
    var cashMetrics = [];
    var mttMetrics = [];
    var sngMetrics = [];
    var handsStat = pokerPlusPickStat(total, "hands", "hands");
    var winningsStat = pokerPlusPickStat(total, "winnings", "winnings");
    var mttStat = pokerPlusStatOrZero(pokerPlusPickStat(total, "mttWinnings", "mtt_winnings"));
    var mttCountedWinnings = opts.mttCountedWinnings != null
      ? opts.mttCountedWinnings
      : pokerPlusPickStat(total, "mttCountedWinnings", "mtt_counted_winnings");
    var mttCountRaw = pokerPlusPickStat(total, "mttCount", "mtt_count");
    var mttItmStat = pokerPlusPickStat(total, "mttItmCount", "mtt_itm_count");
    var mttFirstStat = pokerPlusPickStat(total, "mttFirstCount", "mtt_1st_count");
    var mttCountStat = pokerPlusTournamentCountStat(mttCountRaw, mttItmStat, mttFirstStat);
    var sngStat = pokerPlusStatOrZero(pokerPlusPickStat(total, "sngWinnings", "sng_winnings"));
    var sngCountRaw = pokerPlusPickStat(total, "sngCount", "sng_count");
    var sngItmStat = pokerPlusPickStat(total, "sngItmCount", "sng_itm_count");
    var sngFirstStat = pokerPlusPickStat(total, "sngFirstCount", "sng_1st_count");
    var sngCountStat = pokerPlusTournamentCountStat(sngCountRaw, sngItmStat, sngFirstStat);
    var feeStat = pokerPlusPickStat(total, "fee", "fee");
    if (includeEmptyCore || feeStat != null) cashMetrics.push(pokerPlusStatMetricHtml("Рейк", feeStat, pokerPlusStatTone(feeStat), "%"));
    if (includeEmptyCore || handsStat != null) cashMetrics.push(pokerPlusStatMetricHtml("Раздач", handsStat, "", "♠"));
    if (includeEmptyCore || winningsStat != null) cashMetrics.push(pokerPlusStatMetricHtml("Выигрыш", winningsStat, pokerPlusStatTone(winningsStat), "⌁"));
    mttMetrics.push(pokerPlusStatMetricHtml(opts.isTotalPeriod ? "Выигрыш в МТТ за все время" : "Выигрыш", mttStat, pokerPlusStatTone(mttStat), "🏆", opts.isTotalPeriod ? { extraClass: "profile-pokerplus-stat--long-label" } : null));
    if (opts.isTotalPeriod) {
      mttMetrics.push(pokerPlusStatMetricHtml("Выигрыш с момента ведения статистики", mttCountedWinnings, pokerPlusStatTone(mttCountedWinnings), "🏆", { extraClass: "profile-pokerplus-stat--long-label" }));
    }
    mttMetrics.push(pokerPlusStatMetricHtml("MTT игр", mttCountStat.value, "", "#"));
    mttMetrics.push(pokerPlusItmMetricHtml("MTT ITM", mttItmStat, mttCountStat.percentTotal));
    mttMetrics.push(pokerPlusStatMetricHtml("MTT 1-е", mttFirstStat, "", "1"));
    sngMetrics.push(pokerPlusStatMetricHtml("Выигрыш", sngStat, pokerPlusStatTone(sngStat), "♦"));
    sngMetrics.push(pokerPlusStatMetricHtml("SNG игр", sngCountStat.value, "", "#"));
    sngMetrics.push(pokerPlusItmMetricHtml("SNG ITM", sngItmStat, sngCountStat.percentTotal));
    sngMetrics.push(pokerPlusStatMetricHtml("SNG 1-е", sngFirstStat, "", "1"));
    var metricsByKind = { cash: cashMetrics, mtt: mttMetrics, sng: sngMetrics };
    var section = pokerPlusStatsSectionHtml(activeKind, pokerPlusStatsKindTitle(activeKind), metricsByKind[activeKind] || "");
    if (!section) return pokerPlusStatsEmptyHtml("Нет данных в разделе " + pokerPlusStatsKindTitle(activeKind) + " за выбранный период.");
    return (
      '<span class="profile-pokerplus-stats-period" data-profile-pokerplus-stats-title="' +
      escapeHtml(title || "Статистика") +
      '"><span class="profile-pokerplus-stats-period__sections">' +
      section +
      "</span></span>"
    );
  }

  function pokerPlusStatsEmptyHtml(text) {
    return '<span class="profile-pokerplus-stats-empty">' + escapeHtml(text || "Нет данных за выбранный период.") + "</span>";
  }

  function pokerPlusPad2(value) {
    var n = Number(value) || 0;
    return n < 10 ? "0" + n : String(n);
  }

  function pokerPlusLocalDateKey(date) {
    var d = date instanceof Date ? date : new Date();
    return d.getFullYear() + "-" + pokerPlusPad2(d.getMonth() + 1) + "-" + pokerPlusPad2(d.getDate());
  }

  function pokerPlusDateKeyIsValid(value) {
    var raw = String(value || "").trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return false;
    var parts = raw.split("-");
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return pokerPlusLocalDateKey(d) === raw;
  }

  function pokerPlusDateKeyToDisplay(value) {
    var raw = String(value || "").trim();
    if (!pokerPlusDateKeyIsValid(raw)) return raw;
    return raw.slice(8, 10) + "." + raw.slice(5, 7) + "." + raw.slice(0, 4);
  }

  function pokerPlusDateKeyAddDays(value, days) {
    if (!pokerPlusDateKeyIsValid(value)) return "";
    var parts = String(value).split("-");
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    d.setDate(d.getDate() + (Number(days) || 0));
    return pokerPlusLocalDateKey(d);
  }

  function pokerPlusDateKeysInRange(from, to) {
    if (!pokerPlusDateKeyIsValid(from) || !pokerPlusDateKeyIsValid(to) || from > to) return [];
    var out = [];
    var current = from;
    var guard = 0;
    while (current && current <= to && guard < 740) {
      out.push(current);
      current = pokerPlusDateKeyAddDays(current, 1);
      guard += 1;
    }
    return out;
  }

  function pokerPlusStatsSnapshots(source) {
    var raw = source && typeof source === "object"
      ? (source.statsSnapshots && typeof source.statsSnapshots === "object" ? source.statsSnapshots : source.stats_snapshots)
      : null;
    raw = raw && typeof raw === "object" ? raw : {};
    var dailyRaw = raw.dailyCounters && typeof raw.dailyCounters === "object" ? raw.dailyCounters : raw.daily_counters;
    dailyRaw = dailyRaw && typeof dailyRaw === "object" ? dailyRaw : {};
    var dailyCounters = {};
    var dates = [];
    Object.keys(dailyRaw).forEach(function (date) {
      if (!pokerPlusDateKeyIsValid(date)) return;
      var counter = pokerPlusCanonicalCounter(dailyRaw[date]);
      if (!Object.keys(counter).length) return;
      dailyCounters[date] = counter;
      if (dates.indexOf(date) === -1) dates.push(date);
    });
    (Array.isArray(raw.dates) ? raw.dates : []).forEach(function (date) {
      var key = String(date || "").trim();
      if (pokerPlusDateKeyIsValid(key) && dates.indexOf(key) === -1 && dailyCounters[key]) dates.push(key);
    });
    dates.sort();
    return { dates: dates, dailyCounters: dailyCounters };
  }

  function pokerPlusStatsAvailableDates(source, todayCounter) {
    var snapshots = pokerPlusStatsSnapshots(source);
    var dates = snapshots.dates.slice();
    var todayKey = pokerPlusLocalDateKey(new Date());
    if (pokerPlusCounterHasValue(todayCounter) && dates.indexOf(todayKey) === -1) dates.push(todayKey);
    dates.sort();
    return dates;
  }

  function pokerPlusStatsAvailableDatesText(source, todayCounter) {
    var dates = pokerPlusStatsAvailableDates(source, todayCounter);
    if (!dates.length) return "";
    if (dates.length === 1) return "Доступна дата: " + pokerPlusDateKeyToDisplay(dates[0]) + ".";
    return "Доступны даты: " + pokerPlusDateKeyToDisplay(dates[0]) + " — " + pokerPlusDateKeyToDisplay(dates[dates.length - 1]) + ".";
  }

  function pokerPlusMonthKeyFromDateKey(dateKey) {
    var raw = pokerPlusDateKeyIsValid(dateKey) ? dateKey : pokerPlusLocalDateKey(new Date());
    return raw.slice(0, 7);
  }

  function pokerPlusMonthKeyAdd(value, months) {
    var raw = /^\d{4}-\d{2}$/.test(String(value || "")) ? String(value) : pokerPlusMonthKeyFromDateKey("");
    var parts = raw.split("-");
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, 1);
    d.setMonth(d.getMonth() + (Number(months) || 0));
    return d.getFullYear() + "-" + pokerPlusPad2(d.getMonth() + 1);
  }

  function pokerPlusMonthLabel(value) {
    var raw = /^\d{4}-\d{2}$/.test(String(value || "")) ? String(value) : pokerPlusMonthKeyFromDateKey("");
    var parts = raw.split("-");
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, 1);
    try {
      return d.toLocaleDateString("ru-RU", { month: "long", year: "numeric" });
    } catch (e) {
      return pokerPlusDateKeyToDisplay(raw + "-01").slice(3);
    }
  }

  function pokerPlusCalendarDateState(date) {
    var from = statsDateFromInput ? String(statsDateFromInput.value || "").trim() : "";
    var to = statsDateToInput ? String(statsDateToInput.value || "").trim() : "";
    if (!pokerPlusDateKeyIsValid(from) || !pokerPlusDateKeyIsValid(to)) return "";
    if (date === from && date === to) return "single";
    if (date === from) return "start";
    if (date === to) return "end";
    if (from < date && date < to) return "inside";
    return "";
  }

  function renderPokerPlusStatsCalendar(dates) {
    if (!statsCalendarDays) return;
    var list = Array.isArray(dates) ? dates.slice() : [];
    var firstDate = list[0] || pokerPlusLocalDateKey(new Date());
    var lastDate = list.length ? list[list.length - 1] : firstDate;
    if (!pokerPlusStatsCalendarMonth) pokerPlusStatsCalendarMonth = pokerPlusMonthKeyFromDateKey(lastDate);
    var minMonth = pokerPlusMonthKeyFromDateKey(firstDate);
    var maxMonth = pokerPlusMonthKeyFromDateKey(lastDate);
    if (pokerPlusStatsCalendarMonth < minMonth) pokerPlusStatsCalendarMonth = minMonth;
    if (pokerPlusStatsCalendarMonth > maxMonth) pokerPlusStatsCalendarMonth = maxMonth;
    if (statsCalendarTitle) statsCalendarTitle.textContent = pokerPlusMonthLabel(pokerPlusStatsCalendarMonth);
    if (statsCalendarPrev) statsCalendarPrev.disabled = pokerPlusStatsCalendarMonth <= minMonth;
    if (statsCalendarNext) statsCalendarNext.disabled = pokerPlusStatsCalendarMonth >= maxMonth;
    var from = statsDateFromInput ? String(statsDateFromInput.value || "").trim() : "";
    var to = statsDateToInput ? String(statsDateToInput.value || "").trim() : "";
    if (statsCalendarRange) {
      if (pokerPlusDateKeyIsValid(from) && pokerPlusDateKeyIsValid(to)) {
        statsCalendarRange.textContent = from === to
          ? "Период: " + pokerPlusDateKeyToDisplay(from)
          : "Период: " + pokerPlusDateKeyToDisplay(from) + " — " + pokerPlusDateKeyToDisplay(to);
      } else {
        statsCalendarRange.textContent = list.length ? "Выберите начало периода" : "Нет доступных дат";
      }
    }
    statsCalendarDays.innerHTML = "";
    var parts = pokerPlusStatsCalendarMonth.split("-");
    var year = Number(parts[0]);
    var month = Number(parts[1]) - 1;
    var first = new Date(year, month, 1);
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var offset = (first.getDay() + 6) % 7;
    for (var blank = 0; blank < offset; blank += 1) {
      var spacer = document.createElement("span");
      spacer.className = "profile-pokerplus-stats-date-filter__day-spacer";
      statsCalendarDays.appendChild(spacer);
    }
    for (var day = 1; day <= daysInMonth; day += 1) {
      var date = pokerPlusStatsCalendarMonth + "-" + pokerPlusPad2(day);
      var available = list.indexOf(date) !== -1;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "profile-pokerplus-stats-date-filter__day";
      btn.textContent = String(day);
      btn.disabled = !available;
      btn.dataset.profilePokerplusStatsDate = date;
      if (available) btn.setAttribute("aria-label", "Выбрать " + pokerPlusDateKeyToDisplay(date));
      else btn.setAttribute("aria-label", pokerPlusDateKeyToDisplay(date) + " недоступна");
      var state = pokerPlusCalendarDateState(date);
      if (state) btn.classList.add("profile-pokerplus-stats-date-filter__day--" + state);
      statsCalendarDays.appendChild(btn);
    }
  }

  function applyPokerPlusStatsCalendarDate(date) {
    if (!pokerPlusDateKeyIsValid(date) || pokerPlusStatsAvailableDateKeys.indexOf(date) === -1) return;
    var from = statsDateFromInput ? String(statsDateFromInput.value || "").trim() : "";
    var to = statsDateToInput ? String(statsDateToInput.value || "").trim() : "";
    if (!from || (from && to && from !== to)) {
      from = date;
      to = date;
    } else if (from && to && from === to && date !== from) {
      if (date < from) {
        to = from;
        from = date;
      } else {
        to = date;
      }
    } else {
      from = date;
      to = date;
    }
    if (statsDateFromInput) statsDateFromInput.value = from;
    if (statsDateToInput) statsDateToInput.value = to;
    rerenderPokerPlusStatsDateFilter();
  }

  function pokerPlusSnapshotCounterForRange(source, selection, todayCounter) {
    var dates = pokerPlusDateKeysInRange(selection && selection.from, selection && selection.to);
    if (!dates.length) return null;
    var snapshots = pokerPlusStatsSnapshots(source);
    var todayKey = pokerPlusLocalDateKey(new Date());
    var counter = {};
    for (var i = 0; i < dates.length; i += 1) {
      var date = dates[i];
      var dayCounter = snapshots.dailyCounters[date];
      if (!dayCounter && date === todayKey && pokerPlusCounterHasValue(todayCounter)) dayCounter = todayCounter;
      if (!dayCounter || !pokerPlusCounterHasValue(dayCounter)) return null;
      pokerPlusAddCounter(counter, dayCounter);
    }
    return counter;
  }

  function pokerPlusWeekStartDateKey() {
    var d = new Date();
    var day = d.getDay();
    d.setDate(d.getDate() - ((day + 6) % 7));
    return pokerPlusLocalDateKey(d);
  }

  function pokerPlusStatsDateSelection() {
    var from = statsDateFromInput ? String(statsDateFromInput.value || "").trim() : "";
    var to = statsDateToInput ? String(statsDateToInput.value || "").trim() : "";
    if (!from && !to) return { mode: "all" };
    if (!from || !to) return { mode: "error", message: "Выберите даты начала и окончания периода." };
    if (!pokerPlusDateKeyIsValid(from) || !pokerPlusDateKeyIsValid(to)) return { mode: "error", message: "Проверьте выбранные даты." };
    if (from > to) return { mode: "error", message: "Дата начала должна быть не позже даты окончания." };
    if (pokerPlusStatsAvailableDateKeys.length && (pokerPlusStatsAvailableDateKeys.indexOf(from) === -1 || pokerPlusStatsAvailableDateKeys.indexOf(to) === -1)) {
      return { mode: "error", message: "Выберите даты из доступных для просмотра." };
    }
    return { mode: "range", from: from, to: to };
  }

  function setPokerPlusStatsDateState(text, tone) {
    if (!statsDateState) return;
    statsDateState.textContent = text || "";
    statsDateState.hidden = !text;
    statsDateState.classList.toggle("profile-pokerplus-stats-date-filter__state--warn", tone === "warn");
  }

  function setPokerPlusStatsPeriodTabs(activePeriod) {
    statsPeriodTabs.forEach(function (btn) {
      var period = btn.dataset.profilePokerplusStatsPeriod || "";
      var active = !!activePeriod && period === activePeriod;
      btn.classList.toggle("profile-pokerplus-stats-tabs__btn--active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  function setPokerPlusStatsKindTabs(activeKind) {
    statsKindTabs.forEach(function (btn) {
      var kind = btn.dataset.profilePokerplusStatsTab || "";
      var active = !!activeKind && kind === activeKind;
      btn.classList.toggle("profile-pokerplus-stats-kind-tabs__btn--active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });
    if (statsRow) {
      statsRow.classList.toggle("profile-pokerplus-stats-row--kind-cash", activeKind === "cash");
      statsRow.classList.toggle("profile-pokerplus-stats-row--kind-mtt", activeKind === "mtt");
      statsRow.classList.toggle("profile-pokerplus-stats-row--kind-sng", activeKind === "sng");
    }
  }

  function clearPokerPlusStatsDateInputs() {
    if (statsDateFromInput) statsDateFromInput.value = "";
    if (statsDateToInput) statsDateToInput.value = "";
  }

  function pokerPlusStatsPeriodInfo(period, today, week, total) {
    if (period === "week") return { title: "Неделя", counter: week, empty: "Нет данных за неделю." };
    if (period === "total") return { title: "Всего", counter: total, empty: "Нет общей статистики." };
    return { title: "Сегодня", counter: today, empty: "Нет данных за сегодня." };
  }

  function syncPokerPlusStatsDateFilterBounds(source, todayCounter) {
    var availableDates = pokerPlusStatsAvailableDates(source, todayCounter);
    pokerPlusStatsAvailableDateKeys = availableDates.slice();
    var todayKey = pokerPlusLocalDateKey(new Date());
    var minKey = availableDates[0] || todayKey;
    var maxKey = availableDates.length ? availableDates[availableDates.length - 1] : todayKey;
    [statsDateFromInput, statsDateToInput].forEach(function (inputEl) {
      if (!inputEl) return;
      inputEl.min = minKey;
      inputEl.max = maxKey;
      inputEl.disabled = false;
    });
    renderPokerPlusStatsCalendar(availableDates);
  }

  function pokerPlusSelectedStatsGroup(selection, today, week, source) {
    var todayKey = pokerPlusLocalDateKey(new Date());
    var weekStartKey = pokerPlusWeekStartDateKey();
    if (selection.from === todayKey && selection.to === todayKey && pokerPlusCounterHasValue(today)) {
      return {
        title: "Выбранный день",
        counter: today,
        state: "Период: " + pokerPlusDateKeyToDisplay(todayKey),
      };
    }
    if (selection.from === weekStartKey && selection.to === todayKey && pokerPlusCounterHasValue(week)) {
      return {
        title: "Выбранная неделя",
        counter: week,
        state: "Период: " + pokerPlusDateKeyToDisplay(weekStartKey) + " — " + pokerPlusDateKeyToDisplay(todayKey),
      };
    }
    var snapshotCounter = pokerPlusSnapshotCounterForRange(source, selection, today);
    if (snapshotCounter && pokerPlusCounterHasValue(snapshotCounter)) {
      return {
        title: selection.from === selection.to ? "Выбранный день" : "Выбранный период",
        counter: snapshotCounter,
        state: "Период: " + pokerPlusDateKeyToDisplay(selection.from) + " — " + pokerPlusDateKeyToDisplay(selection.to),
      };
    }
    var availableText = pokerPlusStatsAvailableDatesText(source, today);
    return {
      title: "",
      counter: null,
      state: availableText ? "Нет сохранённых снимков за весь выбранный период. " + availableText : "Пока нет сохранённых снимков для выбора дат.",
      warn: true,
    };
  }

  function renderPokerPlusProfileStatus(profileSource) {
    var source = profileSource && typeof profileSource === "object" ? profileSource : {};
    var total = source.totalCounter && typeof source.totalCounter === "object" ? source.totalCounter : (source.total_counter && typeof source.total_counter === "object" ? source.total_counter : source);
    if (typeof setProfileStatusFromProfile === "function") setProfileStatusFromProfile(source, true);
    else if (typeof setProfileStatusFromRake === "function") setProfileStatusFromRake(pokerPlusPickStat(total, "fee", "fee"));
    setProfileStatusLoading(false);
  }

  function renderPokerPlusStats(profileSource) {
    if (!statsValue) return;
    var source = profileSource && typeof profileSource === "object" ? profileSource : {};
    pokerPlusLastStatsProfile = source;
    var total = source.totalCounter && typeof source.totalCounter === "object" ? source.totalCounter : (source.total_counter && typeof source.total_counter === "object" ? source.total_counter : source);
    var today = source.todayCounter && typeof source.todayCounter === "object" ? source.todayCounter : (source.today_counter && typeof source.today_counter === "object" ? source.today_counter : null);
    var week = source.weekCounter && typeof source.weekCounter === "object" ? source.weekCounter : (source.week_counter && typeof source.week_counter === "object" ? source.week_counter : null);
    syncPokerPlusStatsDateFilterBounds(source, today);
    if (POKERPLUS_STATS_KINDS.indexOf(pokerPlusStatsActiveKind) === -1) pokerPlusStatsActiveKind = "cash";
    setPokerPlusStatsKindTabs(pokerPlusStatsActiveKind);
    renderPokerPlusProfileStatus(source);
    var groups = [];
    var selection = pokerPlusStatsDateSelection();
    if (pokerPlusStatsActivePeriod === "range") {
      setPokerPlusStatsPeriodTabs("range");
      if (selection.mode === "error") {
        groups.push(pokerPlusStatsEmptyHtml(selection.message));
        setPokerPlusStatsDateState(selection.message, "warn");
      } else if (selection.mode === "range") {
        var selected = pokerPlusSelectedStatsGroup(selection, today, week, source);
        if (selected.counter && pokerPlusCounterHasValue(selected.counter)) {
          groups.push(pokerPlusStatsGroupHtml(selected.title, selected.counter, false, { kind: pokerPlusStatsActiveKind }));
          setPokerPlusStatsDateState(selected.state, false);
        } else {
          groups.push(pokerPlusStatsEmptyHtml(selected.state));
          setPokerPlusStatsDateState(selected.state, selected.warn ? "warn" : false);
        }
      } else {
        groups.push(pokerPlusStatsEmptyHtml("Выберите период в календаре."));
        setPokerPlusStatsDateState("", false);
      }
    } else {
      if (["today", "week", "total"].indexOf(pokerPlusStatsActivePeriod) === -1) pokerPlusStatsActivePeriod = "week";
      setPokerPlusStatsPeriodTabs(pokerPlusStatsActivePeriod);
      var periodInfo = pokerPlusStatsPeriodInfo(pokerPlusStatsActivePeriod, today, week, total);
      var periodOptions = {};
      if (pokerPlusStatsActivePeriod === "total") {
        periodOptions.isTotalPeriod = true;
        periodOptions.kind = pokerPlusStatsActiveKind;
        var countedMtt = pokerPlusCountedTournamentWinningsFromSnapshots(source, today, "mtt");
        if (countedMtt && countedMtt.winnings != null) periodOptions.mttCountedWinnings = countedMtt.winnings;
      } else {
        periodOptions.kind = pokerPlusStatsActiveKind;
      }
      if (periodInfo.counter && pokerPlusCounterHasValue(periodInfo.counter)) {
        groups.push(pokerPlusStatsGroupHtml(periodInfo.title, periodInfo.counter, false, periodOptions));
      } else if (pokerPlusStatsActivePeriod === "total") {
        groups.push(pokerPlusStatsGroupHtml(periodInfo.title, total, true, periodOptions));
      } else {
        groups.push(pokerPlusStatsEmptyHtml(periodInfo.empty));
      }
      setPokerPlusStatsDateState("", false);
    }
    statsValue.innerHTML = groups.join("");
    renderPokerPlusStatsVisibilityToggle(false);
    if (statsRow) statsRow.hidden = false;
    if (statsDateFilter) statsDateFilter.hidden = pokerPlusStatsActivePeriod !== "range";
  }

  function rerenderPokerPlusStatsDateFilter() {
    if (pokerPlusLastStatsProfile) renderPokerPlusStats(pokerPlusLastStatsProfile);
  }

  function hidePokerPlusStats() {
    if (statsRow) statsRow.hidden = true;
    if (statsDateFilter) statsDateFilter.hidden = true;
    if (statsCalendarDays) statsCalendarDays.innerHTML = "";
    setPokerPlusStatsDateState("", false);
    pokerPlusStatsAvailableDateKeys = [];
    pokerPlusStatsCalendarMonth = "";
    pokerPlusLastStatsProfile = null;
    setProfileStatusLoading(false);
  }

  function renderPokerPlusStatsFallbackIfVisible() {
    if (!section || !section.classList || !section.classList.contains("profile-pokerplus-card--linked")) return;
    renderPokerPlusStats({});
  }

  function pokerPlusDate(value) {
    var raw = pokerPlusText(value);
    if (!raw) return "";
    var n = Number(raw);
    if (!n || n !== n) return raw;
    var ms = n > 100000000000 ? n : n * 1000;
    var d = new Date(ms);
    if (!d || d.getTime() !== d.getTime()) return raw;
    try {
      return d.toLocaleDateString(undefined, { year: "numeric", month: "2-digit", day: "2-digit" });
    } catch (e) {
      return d.toLocaleDateString();
    }
  }

  function setPokerPlusRow(row, valueEl, value) {
    var text = pokerPlusText(value);
    if (row) row.hidden = !text;
    if (valueEl) valueEl.textContent = text || "—";
  }

  function setPokerPlusRefreshButtonLocation(linked) {
    if (!refreshBtn) return;
    if (linked && bottomActions && unbindBtn) {
      if (refreshBtn.parentNode !== bottomActions) bottomActions.insertBefore(refreshBtn, unbindBtn);
      return;
    }
    if (refreshBtnHome && refreshBtn.parentNode !== refreshBtnHome) {
      refreshBtnHome.insertBefore(refreshBtn, refreshBtnHomeNext && refreshBtnHomeNext.parentNode === refreshBtnHome ? refreshBtnHomeNext : null);
    }
  }

  function setPokerPlusLinkedMode(linked) {
    pokerPlusProfileLinked = !!linked;
    if (section && section.classList) section.classList.toggle("profile-pokerplus-card--linked", !!linked);
    if (section && section.classList && !linked) section.classList.remove("profile-pokerplus-card--needs-key");
    if (!linked) removePokerPlusRefreshKeyInlineForm();
    setPokerPlusRefreshButtonLocation(!!linked);
    updateProfileStatusTextVisibility();
    input.hidden = !!linked;
    if (linked) input.value = "";
    if (form) form.style.removeProperty("display");
    bindBtn.hidden = !!linked;
    bindBtn.style.removeProperty("display");
    input.placeholder = "Ключ из Poker21";
    input.setAttribute("aria-label", "Ключ из Poker21");
    bindBtn.textContent = "Привязать по ключу из Poker21";
    refreshBtn.hidden = !linked;
    if (statusRefreshBtn) statusRefreshBtn.hidden = !linked;
    if (refreshAction) refreshAction.hidden = !linked;
    setPokerPlusRefreshButtonText(!!linked);
    unbindBtn.hidden = !linked;
  }

  function removePokerPlusRefreshKeyInlineForm() {
    var wrap = document.getElementById("profilePokerPlusRefreshKeyInline");
    if (wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
  }

  function ensurePokerPlusRefreshKeyInlineForm() {
    if (!bottomActions) return null;
    var existing = document.getElementById("profilePokerPlusRefreshKeyInline");
    if (existing) return existing.querySelector("[data-profile-pokerplus-refresh-key]");
    var wrap = document.createElement("div");
    wrap.id = "profilePokerPlusRefreshKeyInline";
    wrap.className = "profile-pokerplus-refresh-key-inline";
    wrap.style.cssText = "grid-column:1/-1;display:grid;grid-template-columns:1fr;gap:10px;width:100%;";
    var keyInput = document.createElement("input");
    keyInput.type = "text";
    keyInput.className = "profile-chat-name__input";
    keyInput.placeholder = "Ключ из Poker21";
    keyInput.setAttribute("aria-label", "Ключ из Poker21 для обновления");
    keyInput.setAttribute("autocomplete", "off");
    keyInput.setAttribute("autocapitalize", "none");
    keyInput.setAttribute("autocorrect", "off");
    keyInput.setAttribute("spellcheck", "false");
    keyInput.setAttribute("data-profile-pokerplus-refresh-key", "1");
    var keyBtn = document.createElement("button");
    keyBtn.type = "button";
    keyBtn.className = "profile-visible-to-others__p21-save";
    keyBtn.textContent = "Обновить по ключу";
    keyBtn.addEventListener("click", function () {
      if (input) input.value = normalizePokerPlusKeyInput(keyInput.value || "");
      bindPokerPlus();
    });
    wrap.appendChild(keyInput);
    wrap.appendChild(keyBtn);
    bottomActions.insertBefore(wrap, unbindBtn || null);
    return keyInput;
  }

  function setPokerPlusRefreshNeedsKeyMode() {
    if (!pokerPlusProfileLinked) return;
    if (section && section.classList) section.classList.remove("profile-pokerplus-card--needs-key");
    removePokerPlusRefreshKeyInlineForm();
    input.hidden = true;
    if (refreshBtn) refreshBtn.hidden = false;
    if (form) form.style.removeProperty("display");
    bindBtn.hidden = true;
    bindBtn.style.removeProperty("display");
  }

  function renderProfile(profile, linked) {
    var p = profile && typeof profile === "object" ? profile : null;
    if (linked && p && p.statsPending && pokerPlusProfileHasOnlyZeroStats(p)) {
      p = pokerPlusProfileWithoutStats(p);
    }
    setPokerPlusInitialLoading(false);
    if (!linked || !p) {
      setPokerPlusLinkedMode(false);
      if (title) title.textContent = pokerPlusLocale() === "en" ? "Verification via Poker21" : "Верификация через Poker21";
      if (emailRow) emailRow.hidden = true;
      if (linkedRow) linkedRow.hidden = true;
      if (linkedRow) linkedRow.removeAttribute("data-register-date");
      if (balanceRow) balanceRow.hidden = true;
      renderPokerPlusBalance();
      if (avatarRow) avatarRow.hidden = true;
      if (registerRow) registerRow.hidden = true;
      if (positionRow) positionRow.hidden = true;
      if (leagueRow) leagueRow.hidden = true;
      if (leagueLabel) leagueLabel.textContent = "Лига:";
      if (leagueValue) leagueValue.textContent = "—";
      if (groupRow) groupRow.hidden = true;
      if (countryRow) countryRow.hidden = true;
      if (roleRow) roleRow.hidden = true;
      if (lastLoginRow) lastLoginRow.hidden = true;
      if (lastIpRow) lastIpRow.hidden = true;
      hidePokerPlusStats();
      if (avatarImg) avatarImg.removeAttribute("src");
      try { window.__pokerPlusUserId = ""; } catch (eClearPpId) {}
      updateProfileHeroPokerPlusId("");
      return;
    }
    setPokerPlusLinkedMode(true);
    var syncedAt = pokerPlusSyncedAtValue(p);
    if (syncedAt) pokerPlusLastSyncedAt = Math.max(pokerPlusLastSyncedAt, syncedAt);
    if (title) title.textContent = pokerPlusLocale() === "en" ? "Poker21 Profile" : "Профиль в Poker21";
    renderPokerPlusProfileStatus(p);
    if (emailRow) emailRow.hidden = !(p.email && String(p.email).trim());
    if (emailValue) emailValue.textContent = p.email && String(p.email).trim() ? String(p.email).trim() : "—";
    if (linkedRow) linkedRow.hidden = false;
    if (linkedValue) {
      var playerName = pokerPlusText(p.nickname) || "—";
      var playerId = pokerPlusText(p.pokerPlusUserId);
      linkedValue.innerHTML =
        '<span class="profile-pokerplus-player-name">' +
        escapeHtml(playerName) +
        (playerId ? '<span class="profile-pokerplus-player-verified" aria-label="Аккаунт Poker21 подтвержден">✓</span>' : "") +
        '</span><span class="profile-pokerplus-player-id">' +
        escapeHtml(playerId ? "ID " + playerId : "ID —") +
        "</span>";
    }
    if (linkedRow) {
      var registerDateText = pokerPlusDate(p.registerDate);
      linkedRow.setAttribute("data-register-date", registerDateText ? "Дата регистрации: " + registerDateText : "");
    }
    try { window.__pokerPlusUserId = pokerPlusText(p.pokerPlusUserId); } catch (eSetPpId) {}
    updateProfileHeroPokerPlusId(p.pokerPlusUserId);
    renderPokerPlusBalance();
    var avatarUrl = pokerPlusText(p.avatarUrl);
    if (avatarRow) avatarRow.hidden = false;
    if (avatarImg) {
      if (avatarUrl) avatarImg.src = avatarUrl;
      else avatarImg.removeAttribute("src");
    }
    if (registerRow) registerRow.hidden = true;
    if (registerValue) registerValue.textContent = pokerPlusDate(p.registerDate) || "—";
    if (positionRow) positionRow.hidden = true;
    if (positionValue) positionValue.textContent = "—";
    if (leagueRow) leagueRow.hidden = true;
    if (leagueLabel) leagueLabel.textContent = "Лига:";
    if (leagueValue) leagueValue.textContent = "—";
    if (groupRow) groupRow.hidden = true;
    if (groupValue) groupValue.textContent = "—";
    setPokerPlusRow(countryRow, countryValue, p.country);
    if (roleRow) roleRow.hidden = true;
    if (roleValue) roleValue.textContent = "—";
    setPokerPlusRow(lastLoginRow, lastLoginValue, pokerPlusDate(p.lastLoginDate));
    setPokerPlusRow(lastIpRow, lastIpValue, p.lastLoginIp);
    renderPokerPlusStats(p);
  }

  function syncVisibility() {
    var state = auth();
    section.hidden = !state.isVerified || !!state.isGuest;
    if (state.isVerified && !state.isGuest && section.dataset.profilePokerPlusLoaded !== "1" && !section.classList.contains("profile-pokerplus-card--linked")) setPokerPlusLinkedMode(false);
    bindBtn.disabled = !state.isVerified || !!state.isGuest;
    setPokerPlusRefreshButtonsDisabled(!state.isVerified || !!state.isGuest);
    unbindBtn.disabled = !state.isVerified || !!state.isGuest;
    input.disabled = !state.isVerified || !!state.isGuest;
    if (!state.isVerified || state.isGuest) {
      setFeedback("", false);
      renderProfile(null, false);
    }
    return state;
  }

  function pokerPlusFetchJsonWithTimeout(url, options, timeoutMs) {
    options = options || {};
    timeoutMs = timeoutMs || 15000;
    var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = null;
    var timedOut = false;
    if (controller) {
      options.signal = controller.signal;
    }
    var timeoutPromise = new Promise(function (_, reject) {
      timer = setTimeout(function () {
        timedOut = true;
        try {
          if (controller) controller.abort();
        } catch (eAbort) {}
        var err = new Error("Poker21 profile request timeout");
        err.name = "AbortError";
        reject(err);
      }, timeoutMs);
    });
    var fetchPromise = fetch(url, options)
      .then(function (r) { return r.json().catch(function () { return {}; }); });
    return pokerPlusRunFinally(
      Promise.race([fetchPromise, timeoutPromise]),
      function () {
        if (timer) clearTimeout(timer);
        if (timedOut) {
          try { console.warn("Poker21 profile request timed out"); } catch (eLogTimeout) {}
        }
      }
    );
  }

  function isPokerPlusAbortError(err) {
    return !!(err && (err.name === "AbortError" || /abort/i.test(String(err.message || ""))));
  }

  function readPokerPlusCachedProfile() {
    var state = syncVisibility();
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    var body = pokerPlusAuthBody({});
    if (!state.isVerified || state.isGuest || !base || !pokerPlusAuthBodyHasCredential(body)) return Promise.resolve(null);
    return pokerPlusFetchJsonWithTimeout(base + "/api/pokerplus-player", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify(body),
    }, 7000)
      .then(function (data) {
        if (!data || !data.ok || !data.linked) return null;
        if (data.accountId) pokerPlusAccountId = String(data.accountId || "").trim();
        renderProfile(data.profile, true);
        notifyPokerPlusStatusChange(true, data.profile);
        return data;
      })
      .catch(function () {
        return null;
      });
  }

  function pokerPlusSyncedAtValue(profile) {
    var p = profile && typeof profile === "object" ? profile : null;
    var raw = p && p.syncedAt != null ? p.syncedAt : p && p.synced_at != null ? p.synced_at : null;
    var n = Number(raw);
    return isFinite(n) ? n : 0;
  }

  function pokerPlusSyncedAtFromProfile(data) {
    return pokerPlusSyncedAtValue(data && data.profile);
  }

  function schedulePokerPlusSavedProfileCheck(successText, pendingText, failText, ciphertext, minSyncedAt) {
    var seq = ++pokerPlusPostTimeoutCheckSeq;
    var delays = [1200, 3500, 8000, 14000, 22000];
    var freshAfter = Number(minSyncedAt) || 0;
    setFeedback(pendingText || "Проверяем, сохранилась ли привязка Poker21...", "warn");
    delays.forEach(function (delay, index) {
      setTimeout(function () {
        if (seq !== pokerPlusPostTimeoutCheckSeq) return;
        readPokerPlusCachedProfile().then(function (data) {
          if (seq !== pokerPlusPostTimeoutCheckSeq) return;
          if (data && data.linked && (!freshAfter || pokerPlusSyncedAtFromProfile(data) >= freshAfter)) {
            pokerPlusPostTimeoutCheckSeq += 1;
            if (ciphertext) savePokerPlusLocalCiphertext(pokerPlusAccountId, ciphertext);
            removePokerPlusRefreshKeyInlineForm();
            if (input) input.value = "";
            setFeedback(successText || "Poker21 привязан.", false);
            return;
          }
          if (index === delays.length - 1) {
            setFeedback(failText || "Пока не увидели привязку Poker21. Попробуйте еще раз.", "warn");
          }
        });
      }, delay);
    });
  }

  function refreshPokerPlusStatsAfterKeyBind(ciphertext, wasLinked) {
    var seq = pokerPlusPostTimeoutCheckSeq;
    setFeedback(wasLinked ? "Ключ сохранён. Загружаем статистику Poker21..." : "Poker21 привязан. Загружаем статистику...", false);
    setTimeout(function () {
      if (seq !== pokerPlusPostTimeoutCheckSeq || !pokerPlusProfileLinked) return;
      loadProfile(true).catch(function () {});
    }, 250);
  }

  function loadProfile(refresh, options) {
    options = options || {};
    var silentRefresh = !!options.silent;
    var state = syncVisibility();
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    var body = pokerPlusAuthBody({});
    if (!state.isVerified || state.isGuest || !base || !pokerPlusAuthBodyHasCredential(body)) {
      setPokerPlusInitialLoading(false);
      setProfileStatusLoading(false);
      if (section && section.dataset) section.dataset.profilePokerPlusLoaded = "";
      if (state.isVerified && !state.isGuest) {
        renderProfile(null, false);
        if (!base) setFeedback("Сервер профиля недоступен. Попробуйте обновить страницу.", "warn");
        else if (!pokerPlusAuthBodyHasCredential(body)) setFeedback(pokerPlusMissingAuthMessage(), "warn");
      }
      return Promise.resolve();
    }
    setProfileStatusLoading(true);
    var refreshCiphertext = "";
    var refreshPreviousSyncedAt = refresh ? pokerPlusLastSyncedAt : 0;
    var refreshStartedAt = refresh ? Date.now() : 0;
    if (refresh) {
      body.refresh = "1";
      refreshCiphertext = pokerPlusProfileLinked
        ? (readPokerPlusLocalCiphertext(pokerPlusAccountId) || normalizePokerPlusKeyInput(input && input.value ? input.value : "") || normalizePokerPlusKeyInput(document.querySelector("[data-profile-pokerplus-refresh-key]") && document.querySelector("[data-profile-pokerplus-refresh-key]").value ? document.querySelector("[data-profile-pokerplus-refresh-key]").value : ""))
        : normalizePokerPlusKeyInput(input && input.value ? input.value : "");
      if (refreshCiphertext) {
        if (!pokerPlusProfileLinked) input.value = refreshCiphertext;
        body.ciphertext = refreshCiphertext;
      }
    }
    return pokerPlusRunFinally(
      pokerPlusFetchJsonWithTimeout(base + "/api/pokerplus-player", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify(body),
      }, refresh ? 15000 : 9000)
        .then(function (data) {
          if (!data || !data.ok) {
            if (!refresh && section && section.dataset) section.dataset.profilePokerPlusLoaded = "";
            if (!silentRefresh) renderProfile(null, false);
            setProfileStatusLoading(false);
            if (!silentRefresh && data && data.error) setFeedback(data.error, true);
            return;
          }
          if (data && data.accountId) pokerPlusAccountId = String(data.accountId || "").trim();
          if (refreshCiphertext && data && data.linked) savePokerPlusLocalCiphertext(pokerPlusAccountId, refreshCiphertext);
          try {
            renderProfile(data.profile, !!data.linked);
            notifyPokerPlusStatusChange(!!data.linked, data.profile);
          } catch (renderErr) {
            try { console.error("PokerPlus profile render failed", renderErr); } catch (eLogPpRender) {}
            setProfileStatusLoading(false);
            setFeedback("Данные Poker21 пришли, но не удалось отобразить профиль. Обновите страницу.", true);
            return;
          }
          if (!data.linked) {
            if (!silentRefresh) setFeedback(pokerPlusUnlinkedHint(), "warn");
            if (emailRow) emailRow.hidden = true;
            unbindBtn.hidden = true;
            return;
          }
          if (data.syncError) {
            var syncError = String(data.syncError || "");
            if (data.needsCiphertext || /сохран[её]нн(?:ый|ого)\s+ключ|saved\s+key|нужен\s+ключ/i.test(syncError)) {
              setPokerPlusRefreshNeedsKeyMode();
            }
            var keyHint = /binding failed|bind failed/i.test(syncError) ? ". Если ошибка повторится, отвяжите Poker21 и привяжите заново." : "";
            if (!silentRefresh) setFeedback("Показаны сохранённые данные Poker21. Свежее обновление не прошло: " + syncError + keyHint, "warn");
          } else if (refresh && refreshCiphertext) {
            if (section && section.classList) section.classList.remove("profile-pokerplus-card--needs-key");
            removePokerPlusRefreshKeyInlineForm();
            input.value = "";
            if (refreshBtn) refreshBtn.hidden = false;
            if (!silentRefresh) setFeedback("Данные Poker21 обновлены, ключ сохранён.", false);
          } else if (refresh) {
            if (!silentRefresh) setFeedback("Данные Poker21 обновлены.", false);
          } else {
            setFeedback("", false);
          }
        })
        .catch(function (err) {
          var aborted = isPokerPlusAbortError(err);
          if (refresh && aborted && !silentRefresh) {
            schedulePokerPlusSavedProfileCheck(
              refreshCiphertext ? "Данные Poker21 обновлены, ключ сохранён." : "Данные Poker21 обновлены.",
              "Poker21 ответил поздно. Проверяем, сохранилось ли свежее обновление...",
              "Пока не увидели свежее обновление Poker21. Старые данные оставили.",
              refreshCiphertext,
              refreshPreviousSyncedAt ? refreshPreviousSyncedAt + 1 : refreshStartedAt
            );
          } else {
            if (!refresh && section && section.dataset) section.dataset.profilePokerPlusLoaded = "";
            if (!silentRefresh) {
              renderProfile(null, false);
              setFeedback(refresh ? "Не удалось обновить Poker21: сервер обновления не ответил. Старые данные показаны ниже." : "Poker21 не ответил. Проверьте сеть и попробуйте открыть профиль ещё раз.", true);
              renderPokerPlusStatsFallbackIfVisible();
            }
          }
        }),
      function () {
        setPokerPlusInitialLoading(false);
        setProfileStatusLoading(false);
      }
    );
  }

  function maybeAutoRefreshPokerPlus() {
    if (!shouldAutoRefreshPokerPlus()) return;
    var state = syncVisibility();
    if (!state.isVerified || state.isGuest) return;
    writePokerPlusAutoRefreshAt(pokerPlusAccountId, Date.now());
    try {
      pokerPlusAutoRefreshPromise = pokerPlusRunFinally(
        Promise.resolve(loadProfile(true, { silent: true, auto: true })).catch(function () {}),
        function () {
          pokerPlusAutoRefreshPromise = null;
        }
      );
    } catch (eAutoP21Refresh) {
      pokerPlusAutoRefreshPromise = null;
    }
  }

  function bindPokerPlus() {
    pokerPlusPostTimeoutCheckSeq += 1;
    var state = syncVisibility();
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    if (!state.isVerified || state.isGuest) {
      setFeedback("Сначала войдите в аккаунт.", true);
      return;
    }
    var body = pokerPlusAuthBody({});
    if (!base || !pokerPlusAuthBodyHasCredential(body)) {
      setFeedback(pokerPlusMissingAuthMessage(), true);
      return;
    }
    var ciphertext = normalizePokerPlusKeyInput(input.value || "");
    var wasLinked = !!pokerPlusProfileLinked;
    input.value = ciphertext;
    if (!ciphertext) {
      setFeedback("Вставьте ключ из Poker21.", true);
      return;
    }
    bindBtn.disabled = true;
    setPokerPlusRefreshButtonsDisabled(true);
    unbindBtn.disabled = true;
    setFeedback(wasLinked ? "Обновляем Poker21 по ключу…" : "Привязываем Poker21…", false);
    pokerPlusRunFinally(
      pokerPlusFetchJsonWithTimeout(base + "/api/pokerplus-bind", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.assign(body, { ciphertext: ciphertext })),
      }, 15000)
        .then(function (data) {
          if (!data || !data.ok) {
            var errorText = (data && data.error) || "Не удалось привязать Poker21.";
            if (/15\s*секунд|timeout|timed?\s*out|долго\s+не\s+отвечает/i.test(errorText)) {
              schedulePokerPlusSavedProfileCheck(
                wasLinked ? "Данные Poker21 обновлены, ключ сохранён." : "Poker21 привязан.",
                wasLinked ? "Poker21 ответил поздно. Проверяем, сохранилось ли обновление..." : "Poker21 ответил поздно. Проверяем, сохранилась ли привязка...",
                wasLinked ? "Пока не увидели обновление Poker21. Попробуйте еще раз." : "Пока не увидели привязку Poker21. Попробуйте еще раз.",
                ciphertext
              );
            } else {
              setFeedback(errorText, true);
            }
            return;
          }
          pokerPlusPostTimeoutCheckSeq += 1;
          pokerPlusAccountId = data && data.accountId ? String(data.accountId || "").trim() : pokerPlusAccountId;
          savePokerPlusLocalCiphertext(pokerPlusAccountId, ciphertext);
          var statsPending = pokerPlusProfileHasOnlyZeroStats(data.profile);
          renderProfile(statsPending ? pokerPlusProfileWithoutStats(data.profile) : data.profile, true);
          removePokerPlusRefreshKeyInlineForm();
          notifyPokerPlusStatusChange(true, data.profile);
          input.value = "";
          if (statsPending) {
            refreshPokerPlusStatsAfterKeyBind(ciphertext, wasLinked);
          } else {
            setFeedback(wasLinked ? "Данные Poker21 обновлены, ключ сохранён." : "Poker21 привязан.", false);
          }
        })
        .catch(function (err) {
          var aborted = isPokerPlusAbortError(err);
          if (aborted) {
            schedulePokerPlusSavedProfileCheck(
              wasLinked ? "Данные Poker21 обновлены, ключ сохранён." : "Poker21 привязан.",
              wasLinked ? "Poker21 ответил поздно. Проверяем, сохранилось ли обновление..." : "Poker21 ответил поздно. Проверяем, сохранилась ли привязка...",
              wasLinked ? "Пока не увидели обновление Poker21. Попробуйте еще раз." : "Пока не увидели привязку Poker21. Попробуйте еще раз.",
              ciphertext
            );
          } else {
            setFeedback(POKER_NET_ERR, true);
          }
        }),
      function () {
        bindBtn.disabled = false;
        setPokerPlusRefreshButtonsDisabled(false);
        unbindBtn.disabled = false;
      }
    );
  }

  function unbindPokerPlus() {
    pokerPlusPostTimeoutCheckSeq += 1;
    var state = syncVisibility();
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    var confirmed =
      typeof window.confirm !== "function" ||
      window.confirm("Отвязать аккаунт Poker21 от профиля?");
    if (!confirmed) return;
    if (!state.isVerified || state.isGuest) {
      setFeedback("Сначала войдите в аккаунт.", true);
      return;
    }
    var body = pokerPlusAuthBody({});
    if (!base || !pokerPlusAuthBodyHasCredential(body)) {
      setFeedback(pokerPlusMissingAuthMessage(), true);
      return;
    }
    bindBtn.disabled = true;
    setPokerPlusRefreshButtonsDisabled(true);
    unbindBtn.disabled = true;
    setFeedback("Отвязываем Poker21...", false);
    pokerPlusRunFinally(
      pokerPlusFetchJsonWithTimeout(base + "/api/pokerplus-unbind", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }, 10000)
        .then(function (data) {
          if (!data || !data.ok) {
            setFeedback((data && data.error) || "Не удалось отвязать Poker21.", true);
            return;
          }
          pokerPlusPostTimeoutCheckSeq += 1;
          clearPokerPlusLocalCiphertext(pokerPlusAccountId || (data && data.accountId));
          pokerPlusAccountId = "";
          renderProfile(null, false);
          notifyPokerPlusStatusChange(false, null);
          input.value = "";
          setFeedback("Poker21 отвязан.", false);
        })
        .catch(function (err) {
          var aborted = isPokerPlusAbortError(err);
          setFeedback(aborted ? "Не успели получить ответ за 10 секунд. Попробуйте еще раз." : POKER_NET_ERR, true);
        }),
      function () {
        bindBtn.disabled = false;
        setPokerPlusRefreshButtonsDisabled(false);
        unbindBtn.disabled = false;
      }
    );
  }

  if (bindBtn.dataset.bound !== "1") {
    bindBtn.dataset.bound = "1";
    bindBtn.addEventListener("click", bindPokerPlus);
  }
  function refreshPokerPlusFromButton() {
    setFeedback("Обновляем данные Poker21...", false);
    setPokerPlusRefreshButtonsState("loading");
    setPokerPlusRefreshButtonsDisabled(true);
    try {
      pokerPlusRunFinally(
        Promise.resolve(loadProfile(true)).catch(function () {}),
        function () {
          setPokerPlusRefreshButtonsState("done");
          setPokerPlusRefreshButtonsDisabled(false);
          setTimeout(function () {
            setPokerPlusRefreshButtonsState("");
            setPokerPlusRefreshButtonText(!!pokerPlusProfileLinked);
          }, 1200);
        }
      );
    } catch (eRefreshLoad) {
      setPokerPlusRefreshButtonsState("");
      setPokerPlusRefreshButtonText(!!pokerPlusProfileLinked);
      setPokerPlusRefreshButtonsDisabled(false);
    }
  }
  if (refreshBtn.dataset.bound !== "1") {
    refreshBtn.dataset.bound = "1";
    refreshBtn.addEventListener("click", refreshPokerPlusFromButton);
  }
  if (statusRefreshBtn && statusRefreshBtn.dataset.bound !== "1") {
    statusRefreshBtn.dataset.bound = "1";
    statusRefreshBtn.addEventListener("click", refreshPokerPlusFromButton);
  }
  if (unbindBtn.dataset.bound !== "1") {
    unbindBtn.dataset.bound = "1";
    unbindBtn.addEventListener("click", unbindPokerPlus);
  }
  if (statsValue && statsValue.dataset.visibilityBound !== "1") {
    statsValue.dataset.visibilityBound = "1";
    statsValue.addEventListener("click", function (event) {
      var btn = event && event.target ? event.target.closest("[data-profile-pokerplus-stats-kind][data-profile-pokerplus-stats-visible]") : null;
      if (!btn || btn.disabled) return;
      var kind = btn.dataset.profilePokerplusStatsKind || "";
      if (POKERPLUS_STATS_KINDS.indexOf(kind) === -1) return;
      savePokerPlusStatsVisible(kind, btn.dataset.profilePokerplusStatsVisible === "1");
    });
  }
  statsPeriodTabs.forEach(function (btn) {
    if (!btn || btn.dataset.bound === "1") return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", function () {
      var period = btn.dataset.profilePokerplusStatsPeriod || "";
      if (["today", "week", "total", "range"].indexOf(period) === -1) return;
      pokerPlusStatsActivePeriod = period;
      if (period !== "range") clearPokerPlusStatsDateInputs();
      rerenderPokerPlusStatsDateFilter();
    });
  });
  statsKindTabs.forEach(function (btn) {
    if (!btn || btn.dataset.bound === "1") return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", function () {
      var kind = btn.dataset.profilePokerplusStatsTab || "";
      if (POKERPLUS_STATS_KINDS.indexOf(kind) === -1) return;
      pokerPlusStatsActiveKind = kind;
      rerenderPokerPlusStatsDateFilter();
    });
  });
  if (statsDateFromInput && statsDateFromInput.dataset.bound !== "1") {
    statsDateFromInput.dataset.bound = "1";
    statsDateFromInput.addEventListener("change", rerenderPokerPlusStatsDateFilter);
  }
  if (statsDateToInput && statsDateToInput.dataset.bound !== "1") {
    statsDateToInput.dataset.bound = "1";
    statsDateToInput.addEventListener("change", rerenderPokerPlusStatsDateFilter);
  }
  if (statsDateResetBtn && statsDateResetBtn.dataset.bound !== "1") {
    statsDateResetBtn.dataset.bound = "1";
    statsDateResetBtn.addEventListener("click", function () {
      if (statsDateFromInput) statsDateFromInput.value = "";
      if (statsDateToInput) statsDateToInput.value = "";
      pokerPlusStatsActivePeriod = "range";
      rerenderPokerPlusStatsDateFilter();
    });
  }
  if (statsCalendarDays && statsCalendarDays.dataset.bound !== "1") {
    statsCalendarDays.dataset.bound = "1";
    statsCalendarDays.addEventListener("click", function (event) {
      var btn = event && event.target ? event.target.closest("[data-profile-pokerplus-stats-date]") : null;
      if (!btn || btn.disabled) return;
      pokerPlusStatsActivePeriod = "range";
      applyPokerPlusStatsCalendarDate(btn.dataset.profilePokerplusStatsDate || "");
    });
  }
  if (statsCalendarPrev && statsCalendarPrev.dataset.bound !== "1") {
    statsCalendarPrev.dataset.bound = "1";
    statsCalendarPrev.addEventListener("click", function () {
      pokerPlusStatsCalendarMonth = pokerPlusMonthKeyAdd(pokerPlusStatsCalendarMonth, -1);
      rerenderPokerPlusStatsDateFilter();
    });
  }
  if (statsCalendarNext && statsCalendarNext.dataset.bound !== "1") {
    statsCalendarNext.dataset.bound = "1";
    statsCalendarNext.addEventListener("click", function () {
      pokerPlusStatsCalendarMonth = pokerPlusMonthKeyAdd(pokerPlusStatsCalendarMonth, 1);
      rerenderPokerPlusStatsDateFilter();
    });
  }
  if (input.dataset.bound !== "1") {
    input.dataset.bound = "1";
    input.addEventListener("input", function () {
      input.value = String(input.value || "").replace(/\s+/g, "").slice(0, 64);
    });
  }
  syncPokerPlusStatsDateFilterBounds();
  renderPokerPlusStatsVisibilityToggle(false);
  if (typeof loadCurrentProfileUserInfo === "function") {
    loadCurrentProfileUserInfo().then(function (data) {
      if (data && data.ok && data.pokerPlusStatsVisibility != null) applyPokerPlusStatsVisibility(data.pokerPlusStatsVisibility);
      else if (data && data.ok && data.pokerPlusStatsVisible != null) applyPokerPlusStatsVisible(data.pokerPlusStatsVisible);
    });
  }
  var initialState = syncVisibility();
  var profileRoot = document.getElementById("profileView");
  var activeProfileTab = profileRoot && profileRoot.dataset ? profileRoot.dataset.profileActiveTab : "";
  if (initialState.isVerified && !initialState.isGuest && section.dataset.profilePokerPlusLoaded !== "1") {
    section.dataset.profilePokerPlusLoaded = "1";
    var showInitialPokerPlusLoading = activeProfileTab === "poker21" && !section.classList.contains("profile-pokerplus-card--linked");
    var initialPokerPlusLoadingTimer = null;
    if (showInitialPokerPlusLoading) {
      setPokerPlusInitialLoading(true);
      initialPokerPlusLoadingTimer = setTimeout(function () {
        if (!section.classList.contains("profile-pokerplus-card--loading")) return;
        renderProfile(null, false);
        setProfileStatusLoading(false);
        section.dataset.profilePokerPlusLoaded = "";
        setFeedback("Poker21 не ответил. Показали форму привязки; попробуйте открыть вкладку ещё раз или вставьте ключ из Poker21.", "warn");
      }, 11000);
    }
    try {
      pokerPlusRunFinally(
        Promise.resolve(loadProfile(false))
          .then(function () {
            maybeAutoRefreshPokerPlus();
          })
          .catch(function () {
            section.dataset.profilePokerPlusLoaded = "";
            setPokerPlusInitialLoading(false);
            setProfileStatusLoading(false);
            setFeedback("Не удалось загрузить Poker21. Попробуйте обновить страницу.", "warn");
          }),
        function () {
          if (initialPokerPlusLoadingTimer) clearTimeout(initialPokerPlusLoadingTimer);
        }
      );
    } catch (initialLoadErr) {
      if (initialPokerPlusLoadingTimer) clearTimeout(initialPokerPlusLoadingTimer);
      section.dataset.profilePokerPlusLoaded = "";
      setPokerPlusInitialLoading(false);
      setProfileStatusLoading(false);
      setFeedback("Не удалось загрузить Poker21. Обновите страницу.", "warn");
    }
  } else if (initialState.isVerified && !initialState.isGuest) {
    setTimeout(function () {
      try {
        maybeAutoRefreshPokerPlus();
      } catch (eRepeatAutoP21Refresh) {}
    }, 0);
  }
}
