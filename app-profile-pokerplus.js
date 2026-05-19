function initProfilePokerPlus() {
  var section = document.getElementById("profilePokerPlusSection");
  var title = document.getElementById("profilePokerPlusTitle");
  var input = document.getElementById("profilePokerPlusCiphertextInput");
  var bindBtn = document.getElementById("profilePokerPlusBindBtn");
  var refreshBtn = document.getElementById("profilePokerPlusRefreshBtn");
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
  var statsVisibleYes = document.getElementById("profilePokerPlusStatsVisibleYes");
  var statsVisibleNo = document.getElementById("profilePokerPlusStatsVisibleNo");
  var statsVisibilityState = document.getElementById("profilePokerPlusStatsVisibilityState");
  var statsDateFilter = document.getElementById("profilePokerPlusStatsDateFilter");
  var statsDateFromInput = document.getElementById("profilePokerPlusStatsDateFrom");
  var statsDateToInput = document.getElementById("profilePokerPlusStatsDateTo");
  var statsDateResetBtn = document.getElementById("profilePokerPlusStatsDateResetBtn");
  var statsDateState = document.getElementById("profilePokerPlusStatsDateState");
  var statusLinkHint = document.getElementById("profileStatusLinkHint");
  var profileStatusProgressText = document.getElementById("profileStatusProgressText");
  var profileStatusTitle = document.getElementById("profileStatusTitle");
  if (!section || !input || !bindBtn || !refreshBtn || !unbindBtn) return;
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
  var pokerPlusStatsVisibleToOthers = false;
  var pokerPlusProfileLinked = false;
  var pokerPlusProfileLoading = false;
  var pokerPlusAccountId = "";
  var pokerPlusPostTimeoutCheckSeq = 0;
  var pokerPlusLastSyncedAt = 0;
  var pokerPlusLastStatsProfile = null;
  var POKERPLUS_LOCAL_CIPHERTEXT_KEY = "poker_profile_pokerplus_ciphertext";

  function setFeedback(text, tone) {
    if (!feedback) return;
    feedback.textContent = text || "";
    feedback.style.color = tone === "warn" ? "#f59e0b" : tone ? "#ef4444" : "";
  }

  function notifyPokerPlusStatusChange(linked, profile) {
    var detail = { linked: !!linked };
    var p = profile && typeof profile === "object" ? profile : null;
    if (p && p.pokerPlusUserId) detail.p21Id = String(p.pokerPlusUserId);
    if (linked && p && typeof pokerProfileStatusFromRake === "function") {
      var total = p.totalCounter && typeof p.totalCounter === "object" ? p.totalCounter : (p.total_counter && typeof p.total_counter === "object" ? p.total_counter : null);
      var fee = total && total.fee != null ? total.fee : null;
      var status = pokerProfileStatusFromRake(fee);
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

  function auth() {
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

  function setPokerPlusRefreshButtonText(linked) {
    if (!refreshBtn) return;
    refreshBtn.textContent = linked ? (pokerPlusLocale() === "en" ? "Refresh" : "Обновить") : "";
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
    if (profileStatusTitle) profileStatusTitle.hidden = !!pokerPlusProfileLoading;
    if (!pokerPlusProfileLinked && profileStatusTitle) profileStatusTitle.textContent = "Статус Poker21";
    if (profileStatusProgressText) profileStatusProgressText.hidden = !!pokerPlusProfileLoading || !pokerPlusProfileLinked;
    if (!pokerPlusProfileLinked && profileStatusProgressText) profileStatusProgressText.textContent = "";
    if (statusLinkHint) {
      var state = auth();
      statusLinkHint.hidden = !!pokerPlusProfileLoading || !!pokerPlusProfileLinked || !state.isVerified || !!state.isGuest;
    }
  }

  function pokerPlusWholeNumber(value) {
    var raw = pokerPlusText(value);
    if (!raw) return "";
    var n = Number(String(raw).replace(/\s+/g, "").replace(",", "."));
    if (!isFinite(n)) return raw.replace(/([.,]\d+)\b/, "");
    return String(n < 0 ? Math.ceil(n) : Math.floor(n));
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

  function renderPokerPlusStatsVisibilityToggle(saving) {
    if (!statsVisibleYes || !statsVisibleNo) return;
    statsVisibleYes.classList.toggle("profile-pokerplus-stats-visibility__btn--active", pokerPlusStatsVisibleToOthers);
    statsVisibleNo.classList.toggle("profile-pokerplus-stats-visibility__btn--active", !pokerPlusStatsVisibleToOthers);
    statsVisibleYes.setAttribute("aria-pressed", pokerPlusStatsVisibleToOthers ? "true" : "false");
    statsVisibleNo.setAttribute("aria-pressed", pokerPlusStatsVisibleToOthers ? "false" : "true");
    statsVisibleYes.disabled = !!saving;
    statsVisibleNo.disabled = !!saving;
    if (statsVisibilityState) {
      statsVisibilityState.textContent = pokerPlusStatsVisibleToOthers
        ? "Статистика доступна другим игрокам."
        : "Статистика скрыта от других игроков.";
      statsVisibilityState.classList.toggle("profile-pokerplus-stats-visibility__state--visible", pokerPlusStatsVisibleToOthers);
      statsVisibilityState.classList.toggle("profile-pokerplus-stats-visibility__state--hidden", !pokerPlusStatsVisibleToOthers);
    }
  }

  function applyPokerPlusStatsVisible(value) {
    pokerPlusStatsVisibleToOthers = value === true || value === 1 || value === "1" || value === "true";
    renderPokerPlusStatsVisibilityToggle(false);
  }

  window.pokerApplyPokerPlusStatsVisible = applyPokerPlusStatsVisible;

  function savePokerPlusStatsVisible(value) {
    var nextVisible = !!value;
    if (nextVisible === pokerPlusStatsVisibleToOthers) return;
    var prevVisible = pokerPlusStatsVisibleToOthers;
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    pokerPlusStatsVisibleToOthers = nextVisible;
    renderPokerPlusStatsVisibilityToggle(true);
    fetch(base + "/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerGuestOrAuthedPostBody({ pokerPlusStatsVisible: nextVisible })),
    })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (!data || !data.ok) {
          pokerPlusStatsVisibleToOthers = prevVisible;
          setFeedback((data && data.error) || "Не удалось сохранить видимость статистики.", true);
        } else {
          pokerProfileUserInfoCache = null;
          pokerProfileUserInfoCacheAt = 0;
          setFeedback("", false);
        }
      })
      .catch(function () {
        pokerPlusStatsVisibleToOthers = prevVisible;
        setFeedback(POKER_NET_ERR, true);
      })
      .finally(function () {
        renderPokerPlusStatsVisibilityToggle(false);
      });
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

  function pokerPlusStatMetricHtml(label, value, tone, icon) {
    var raw = pokerPlusText(value);
    var hasValue = !!raw;
    var rawDisplay = hasValue ? pokerPlusWholeNumber(raw) : "—";
    var cls = "profile-pokerplus-stat";
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

  function pokerPlusStatsGroupHtml(title, totalSource, includeEmptyCore) {
    var total = totalSource && typeof totalSource === "object" ? totalSource : {};
    var metrics = [];
    var handsStat = pokerPlusPickStat(total, "hands", "hands");
    var winningsStat = pokerPlusPickStat(total, "winnings", "winnings");
    var mttStat = pokerPlusStatOrZero(pokerPlusPickStat(total, "mttWinnings", "mtt_winnings"));
    var mttCountStat = pokerPlusStatOrZero(pokerPlusPickStat(total, "mttCount", "mtt_count"));
    var mttItmStat = pokerPlusStatOrZero(pokerPlusPickStat(total, "mttItmCount", "mtt_itm_count"));
    var mttFirstStat = pokerPlusStatOrZero(pokerPlusPickStat(total, "mttFirstCount", "mtt_1st_count"));
    var sngStat = pokerPlusStatOrZero(pokerPlusPickStat(total, "sngWinnings", "sng_winnings"));
    var sngCountStat = pokerPlusStatOrZero(pokerPlusPickStat(total, "sngCount", "sng_count"));
    var sngItmStat = pokerPlusStatOrZero(pokerPlusPickStat(total, "sngItmCount", "sng_itm_count"));
    var sngFirstStat = pokerPlusStatOrZero(pokerPlusPickStat(total, "sngFirstCount", "sng_1st_count"));
    var feeStat = pokerPlusPickStat(total, "fee", "fee");
    if (includeEmptyCore || feeStat != null) metrics.push(pokerPlusStatMetricHtml("Рейк", feeStat, pokerPlusStatTone(feeStat), "%"));
    if (includeEmptyCore || handsStat != null) metrics.push(pokerPlusStatMetricHtml("Хендс", handsStat, "", "♠"));
    if (includeEmptyCore || winningsStat != null) metrics.push(pokerPlusStatMetricHtml("Кеш", winningsStat, pokerPlusStatTone(winningsStat), "⌁"));
    metrics.push(pokerPlusStatMetricHtml("MTT", mttStat, pokerPlusStatTone(mttStat), "🏆"));
    metrics.push(pokerPlusStatMetricHtml("MTT игр", mttCountStat, "", "#"));
    metrics.push(pokerPlusStatMetricHtml("MTT ITM", mttItmStat, "", "ITM"));
    metrics.push(pokerPlusStatMetricHtml("MTT 1-е", mttFirstStat, "", "1"));
    metrics.push(pokerPlusStatMetricHtml("SNG", sngStat, pokerPlusStatTone(sngStat), "♦"));
    metrics.push(pokerPlusStatMetricHtml("SNG игр", sngCountStat, "", "#"));
    metrics.push(pokerPlusStatMetricHtml("SNG ITM", sngItmStat, "", "ITM"));
    metrics.push(pokerPlusStatMetricHtml("SNG 1-е", sngFirstStat, "", "1"));
    if (!metrics.length) return "";
    return (
      '<span class="profile-pokerplus-stats-period"><span class="profile-pokerplus-stats-period__title">' +
      escapeHtml(title || "Статистика") +
      '</span><span class="profile-pokerplus-stats">' +
      metrics.join("") +
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
    return { mode: "range", from: from, to: to };
  }

  function setPokerPlusStatsDateState(text, tone) {
    if (!statsDateState) return;
    statsDateState.textContent = text || "";
    statsDateState.hidden = !text;
    statsDateState.classList.toggle("profile-pokerplus-stats-date-filter__state--warn", tone === "warn");
  }

  function syncPokerPlusStatsDateFilterBounds() {
    var todayKey = pokerPlusLocalDateKey(new Date());
    if (statsDateFromInput) statsDateFromInput.max = todayKey;
    if (statsDateToInput) statsDateToInput.max = todayKey;
  }

  function pokerPlusSelectedStatsGroup(selection, today, week) {
    var todayKey = pokerPlusLocalDateKey(new Date());
    var weekStartKey = pokerPlusWeekStartDateKey();
    if (selection.from === todayKey && selection.to === todayKey) {
      return {
        title: "Выбранный день",
        counter: today,
        state: "Период: " + pokerPlusDateKeyToDisplay(todayKey),
      };
    }
    if (selection.from === weekStartKey && selection.to === todayKey) {
      return {
        title: "Выбранная неделя",
        counter: week,
        state: "Период: " + pokerPlusDateKeyToDisplay(weekStartKey) + " — " + pokerPlusDateKeyToDisplay(todayKey),
      };
    }
    return {
      title: "",
      counter: null,
      state: "Нет точной статистики за выбранные даты.",
      warn: true,
    };
  }

  function renderPokerPlusStats(profileSource) {
    if (!statsValue) return;
    setProfileStatusLoading(false);
    pokerPlusLastStatsProfile = profileSource && typeof profileSource === "object" ? profileSource : {};
    syncPokerPlusStatsDateFilterBounds();
    var source = profileSource && typeof profileSource === "object" ? profileSource : {};
    var total = source.totalCounter && typeof source.totalCounter === "object" ? source.totalCounter : (source.total_counter && typeof source.total_counter === "object" ? source.total_counter : source);
    var today = source.todayCounter && typeof source.todayCounter === "object" ? source.todayCounter : (source.today_counter && typeof source.today_counter === "object" ? source.today_counter : null);
    var week = source.weekCounter && typeof source.weekCounter === "object" ? source.weekCounter : (source.week_counter && typeof source.week_counter === "object" ? source.week_counter : null);
    var feeStat = pokerPlusPickStat(total, "fee", "fee");
    setProfileStatusFromRake(feeStat);
    var groups = [];
    var selection = pokerPlusStatsDateSelection();
    if (selection.mode === "error") {
      groups.push(pokerPlusStatsEmptyHtml(selection.message));
      setPokerPlusStatsDateState(selection.message, "warn");
    } else if (selection.mode === "range") {
      var selected = pokerPlusSelectedStatsGroup(selection, today, week);
      if (selected.counter && pokerPlusCounterHasValue(selected.counter)) {
        groups.push(pokerPlusStatsGroupHtml(selected.title, selected.counter, false));
        setPokerPlusStatsDateState(selected.state, false);
      } else {
        groups.push(pokerPlusStatsEmptyHtml(selected.state));
        setPokerPlusStatsDateState(selected.state, selected.warn ? "warn" : false);
      }
    } else {
      if (pokerPlusCounterHasValue(today)) groups.push(pokerPlusStatsGroupHtml("Сегодня", today, false));
      if (pokerPlusCounterHasValue(week)) groups.push(pokerPlusStatsGroupHtml("Неделя", week, false));
      if (pokerPlusCounterHasValue(total) || !groups.length) groups.push(pokerPlusStatsGroupHtml(groups.length ? "Всего" : "Статистика", total, !groups.length));
      setPokerPlusStatsDateState("", false);
    }
    statsValue.innerHTML = groups.join("");
    if (statsRow) statsRow.hidden = false;
    if (statsDateFilter) statsDateFilter.hidden = false;
  }

  function rerenderPokerPlusStatsDateFilter() {
    if (pokerPlusLastStatsProfile) renderPokerPlusStats(pokerPlusLastStatsProfile);
  }

  function hidePokerPlusStats() {
    if (statsRow) statsRow.hidden = true;
    if (statsDateFilter) statsDateFilter.hidden = true;
    setPokerPlusStatsDateState("", false);
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

  function setPokerPlusLinkedMode(linked) {
    pokerPlusProfileLinked = !!linked;
    if (section && section.classList) section.classList.toggle("profile-pokerplus-card--linked", !!linked);
    if (section && section.classList && !linked) section.classList.remove("profile-pokerplus-card--needs-key");
    if (!linked) removePokerPlusRefreshKeyInlineForm();
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
    bottomActions.insertBefore(wrap, refreshBtn || unbindBtn || null);
    return keyInput;
  }

  function setPokerPlusRefreshNeedsKeyMode() {
    if (!pokerPlusProfileLinked) return;
    if (section && section.classList) section.classList.add("profile-pokerplus-card--needs-key");
    input.hidden = false;
    if (form) form.style.setProperty("display", "flex", "important");
    ensurePokerPlusRefreshKeyInlineForm();
    input.placeholder = "Ключ из Poker21 для обновления";
    input.setAttribute("aria-label", "Ключ из Poker21 для обновления");
    bindBtn.hidden = false;
    bindBtn.style.setProperty("display", "inline-flex", "important");
    bindBtn.textContent = "Обновить по ключу";
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
    refreshBtn.disabled = !state.isVerified || !!state.isGuest;
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
    if (controller) {
      options.signal = controller.signal;
      timer = setTimeout(function () {
        try { controller.abort(); } catch (eAbort) {}
      }, timeoutMs);
    }
    return fetch(url, options)
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .finally(function () {
        if (timer) clearTimeout(timer);
      });
  }

  function isPokerPlusAbortError(err) {
    return !!(err && (err.name === "AbortError" || /abort/i.test(String(err.message || ""))));
  }

  function readPokerPlusCachedProfile() {
    var state = syncVisibility();
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    if (!state.isVerified || state.isGuest || !base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return Promise.resolve(null);
    var body = typeof pokerGuestOrAuthedPostBody === "function" ? pokerGuestOrAuthedPostBody({}) : {};
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

  function loadProfile(refresh) {
    var state = syncVisibility();
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    if (!state.isVerified || state.isGuest || !base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      setProfileStatusLoading(false);
      return Promise.resolve();
    }
    setProfileStatusLoading(true);
    var body = typeof pokerGuestOrAuthedPostBody === "function" ? pokerGuestOrAuthedPostBody({}) : {};
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
    return pokerPlusFetchJsonWithTimeout(base + "/api/pokerplus-player", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify(body),
    }, 15000)
      .then(function (data) {
        if (!data || !data.ok) {
          renderProfile(null, false);
          setProfileStatusLoading(false);
          if (data && data.error) setFeedback(data.error, true);
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
          setFeedback("", false);
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
          setFeedback("Показаны сохранённые данные Poker21. Свежее обновление не прошло: " + syncError + keyHint, "warn");
        } else if (refresh && refreshCiphertext) {
          if (section && section.classList) section.classList.remove("profile-pokerplus-card--needs-key");
          removePokerPlusRefreshKeyInlineForm();
          input.value = "";
          setFeedback("Данные Poker21 обновлены, ключ сохранён.", false);
        } else if (refresh) {
          setFeedback("Данные Poker21 обновлены.", false);
        } else {
          setFeedback("", false);
        }
      })
      .catch(function (err) {
        var aborted = isPokerPlusAbortError(err);
        if (refresh && aborted) {
          schedulePokerPlusSavedProfileCheck(
            refreshCiphertext ? "Данные Poker21 обновлены, ключ сохранён." : "Данные Poker21 обновлены.",
            "Poker21 ответил поздно. Проверяем, сохранилось ли свежее обновление...",
            "Пока не увидели свежее обновление Poker21. Старые данные оставили.",
            refreshCiphertext,
            refreshPreviousSyncedAt ? refreshPreviousSyncedAt + 1 : refreshStartedAt
          );
        } else {
          setFeedback(refresh ? "Не удалось обновить Poker21: сервер обновления не ответил. Старые данные показаны ниже." : POKER_NET_ERR, true);
          renderPokerPlusStatsFallbackIfVisible();
        }
      })
      .finally(function () {
        setPokerPlusInitialLoading(false);
        setProfileStatusLoading(false);
      });
  }

  function bindPokerPlus() {
    pokerPlusPostTimeoutCheckSeq += 1;
    var state = syncVisibility();
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    if (!state.isVerified || state.isGuest) {
      setFeedback("Сначала войдите в аккаунт.", true);
      return;
    }
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      setFeedback("Откройте приложение в Telegram или войдите в PWA.", true);
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
    refreshBtn.disabled = true;
    unbindBtn.disabled = true;
    setFeedback(wasLinked ? "Обновляем Poker21 по ключу…" : "Привязываем Poker21…", false);
    pokerPlusFetchJsonWithTimeout(base + "/api/pokerplus-bind", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerApiAuthJsonBody({ ciphertext: ciphertext })),
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
      })
      .finally(function () {
        bindBtn.disabled = false;
        refreshBtn.disabled = false;
        unbindBtn.disabled = false;
      });
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
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      setFeedback("Откройте приложение в Telegram или войдите в PWA.", true);
      return;
    }
    bindBtn.disabled = true;
    refreshBtn.disabled = true;
    unbindBtn.disabled = true;
    setFeedback("Отвязываем Poker21...", false);
    pokerPlusFetchJsonWithTimeout(base + "/api/pokerplus-unbind", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerApiAuthJsonBody({})),
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
      })
      .finally(function () {
        bindBtn.disabled = false;
        refreshBtn.disabled = false;
        unbindBtn.disabled = false;
      });
  }

  if (bindBtn.dataset.bound !== "1") {
    bindBtn.dataset.bound = "1";
    bindBtn.addEventListener("click", bindPokerPlus);
  }
  if (refreshBtn.dataset.bound !== "1") {
    refreshBtn.dataset.bound = "1";
    refreshBtn.addEventListener("click", function () {
      setFeedback("Обновляем данные Poker21...", false);
      loadProfile(true).finally(function () {});
    });
  }
  if (unbindBtn.dataset.bound !== "1") {
    unbindBtn.dataset.bound = "1";
    unbindBtn.addEventListener("click", unbindPokerPlus);
  }
  if (statsVisibleYes && statsVisibleYes.dataset.bound !== "1") {
    statsVisibleYes.dataset.bound = "1";
    statsVisibleYes.addEventListener("click", function () {
      savePokerPlusStatsVisible(true);
    });
  }
  if (statsVisibleNo && statsVisibleNo.dataset.bound !== "1") {
    statsVisibleNo.dataset.bound = "1";
    statsVisibleNo.addEventListener("click", function () {
      savePokerPlusStatsVisible(false);
    });
  }
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
      if (data && data.ok && data.pokerPlusStatsVisible != null) applyPokerPlusStatsVisible(data.pokerPlusStatsVisible);
    });
  }
  var initialState = syncVisibility();
  var profileRoot = document.getElementById("profileView");
  var activeProfileTab = profileRoot && profileRoot.dataset ? profileRoot.dataset.profileActiveTab : "";
  if (initialState.isVerified && !initialState.isGuest && section.dataset.profilePokerPlusLoaded !== "1") {
    section.dataset.profilePokerPlusLoaded = "1";
    if (activeProfileTab === "poker21" && !section.classList.contains("profile-pokerplus-card--linked")) setPokerPlusInitialLoading(true);
    loadProfile(false).catch(function () {
      section.dataset.profilePokerPlusLoaded = "";
    });
  }
}
