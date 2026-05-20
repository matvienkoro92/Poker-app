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
  var pokerPlusStatsVisibilityToOthers = { cash: false, mtt: false, sng: false };
  var pokerPlusProfileLinked = false;
  var pokerPlusProfileLoading = false;
  var pokerPlusAccountId = "";
  var pokerPlusPostTimeoutCheckSeq = 0;
  var pokerPlusLastSyncedAt = 0;
  var pokerPlusLastStatsProfile = null;
  var pokerPlusStatsAvailableDateKeys = [];
  var pokerPlusStatsCalendarMonth = "";
  var pokerPlusStatsActivePeriod = "today";
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
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    setPokerPlusStatsVisibilityMap(nextMap);
    renderPokerPlusStatsVisibilityToggle(savingKind);
    fetch(base + "/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerGuestOrAuthedPostBody({
        pokerPlusStatsVisibility: nextMap,
        pokerPlusStatsVisible: pokerPlusStatsVisibilityAny(nextMap),
      })),
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

  function pokerPlusPercentText(value, totalValue) {
    var n = Number(value);
    var total = Number(totalValue);
    if (!isFinite(n) || !isFinite(total)) return "—";
    if (n <= 0 || total <= 0) return "0%";
    var percent = Math.min(100, Math.max(0, (n / total) * 100));
    var fixed = percent > 0 && percent < 10 ? percent.toFixed(1) : percent.toFixed(0);
    return fixed.replace(/\.?0+$/, "") + "%";
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
    var cashMetrics = [];
    var mttMetrics = [];
    var sngMetrics = [];
    var sections = [];
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
    if (includeEmptyCore || feeStat != null) cashMetrics.push(pokerPlusStatMetricHtml("Рейк", feeStat, pokerPlusStatTone(feeStat), "%"));
    if (includeEmptyCore || handsStat != null) cashMetrics.push(pokerPlusStatMetricHtml("Раздач", handsStat, "", "♠"));
    if (includeEmptyCore || winningsStat != null) cashMetrics.push(pokerPlusStatMetricHtml("Выигрыш", winningsStat, pokerPlusStatTone(winningsStat), "⌁"));
    mttMetrics.push(pokerPlusStatMetricHtml("Выигрыш", mttStat, pokerPlusStatTone(mttStat), "🏆"));
    mttMetrics.push(pokerPlusStatMetricHtml("MTT игр", mttCountStat, "", "#"));
    mttMetrics.push(pokerPlusItmMetricHtml("MTT ITM", mttItmStat, mttCountStat));
    mttMetrics.push(pokerPlusStatMetricHtml("MTT 1-е", mttFirstStat, "", "1"));
    sngMetrics.push(pokerPlusStatMetricHtml("Выигрыш", sngStat, pokerPlusStatTone(sngStat), "♦"));
    sngMetrics.push(pokerPlusStatMetricHtml("SNG игр", sngCountStat, "", "#"));
    sngMetrics.push(pokerPlusItmMetricHtml("SNG ITM", sngItmStat, sngCountStat));
    sngMetrics.push(pokerPlusStatMetricHtml("SNG 1-е", sngFirstStat, "", "1"));
    sections.push(pokerPlusStatsSectionHtml("cash", "Кеш", cashMetrics));
    sections.push(pokerPlusStatsSectionHtml("mtt", "МТТ", mttMetrics));
    sections.push(pokerPlusStatsSectionHtml("sng", "СНГ", sngMetrics));
    sections = sections.filter(Boolean);
    if (!sections.length) return "";
    return (
      '<span class="profile-pokerplus-stats-period" data-profile-pokerplus-stats-title="' +
      escapeHtml(title || "Статистика") +
      '"><span class="profile-pokerplus-stats-period__sections">' +
      sections.join("") +
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

  function renderPokerPlusStats(profileSource) {
    if (!statsValue) return;
    setProfileStatusLoading(false);
    var source = profileSource && typeof profileSource === "object" ? profileSource : {};
    pokerPlusLastStatsProfile = source;
    var total = source.totalCounter && typeof source.totalCounter === "object" ? source.totalCounter : (source.total_counter && typeof source.total_counter === "object" ? source.total_counter : source);
    var today = source.todayCounter && typeof source.todayCounter === "object" ? source.todayCounter : (source.today_counter && typeof source.today_counter === "object" ? source.today_counter : null);
    var week = source.weekCounter && typeof source.weekCounter === "object" ? source.weekCounter : (source.week_counter && typeof source.week_counter === "object" ? source.week_counter : null);
    syncPokerPlusStatsDateFilterBounds(source, today);
    var feeStat = pokerPlusPickStat(total, "fee", "fee");
    setProfileStatusFromRake(feeStat);
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
          groups.push(pokerPlusStatsGroupHtml(selected.title, selected.counter, false));
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
      if (["today", "week", "total"].indexOf(pokerPlusStatsActivePeriod) === -1) pokerPlusStatsActivePeriod = "today";
      setPokerPlusStatsPeriodTabs(pokerPlusStatsActivePeriod);
      var periodInfo = pokerPlusStatsPeriodInfo(pokerPlusStatsActivePeriod, today, week, total);
      if (periodInfo.counter && pokerPlusCounterHasValue(periodInfo.counter)) {
        groups.push(pokerPlusStatsGroupHtml(periodInfo.title, periodInfo.counter, false));
      } else if (pokerPlusStatsActivePeriod === "total") {
        groups.push(pokerPlusStatsGroupHtml(periodInfo.title, total, true));
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
    if (activeProfileTab === "poker21" && !section.classList.contains("profile-pokerplus-card--linked")) setPokerPlusInitialLoading(true);
    loadProfile(false).catch(function () {
      section.dataset.profilePokerPlusLoaded = "";
    });
  }
}
