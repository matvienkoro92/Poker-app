function initProfilePokerPlus() {
  var section = document.getElementById("profilePokerPlusSection");
  var title = document.getElementById("profilePokerPlusTitle");
  var input = document.getElementById("profilePokerPlusCiphertextInput");
  var bindBtn = document.getElementById("profilePokerPlusBindBtn");
  var refreshBtn = document.getElementById("profilePokerPlusRefreshBtn");
  var unbindBtn = document.getElementById("profilePokerPlusUnbindBtn");
  var feedback = document.getElementById("profilePokerPlusFeedback");
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
  var statusLinkHint = document.getElementById("profileStatusLinkHint");
  var profileStatusProgressText = document.getElementById("profileStatusProgressText");
  var profileStatusTitle = document.getElementById("profileStatusTitle");
  if (!section || !input || !bindBtn || !refreshBtn || !unbindBtn) return;
  var POKERPLUS_BALANCE_VISIBLE_KEY = "poker_profile_pokerplus_balance_visible";
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
  var pokerPlusBalanceRaw = "";
  var pokerPlusBalanceVisible = false;
  var pokerPlusStatsVisibleToOthers = false;
  var pokerPlusProfileLinked = false;
  var pokerPlusProfileLoading = false;
  try {
    pokerPlusBalanceVisible = localStorage.getItem(POKERPLUS_BALANCE_VISIBLE_KEY) === "1";
  } catch (eReadPpBalanceVisible) {}

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
      .replace(/\s+/g, "")
      .trim()
      .replace(/[\u0410\u0412\u0415\u041A\u041C\u041D\u041E\u0420\u0421\u0422\u0423\u0425\u0430\u0432\u0435\u043A\u043C\u043D\u043E\u0440\u0441\u0442\u0443\u0445]/g, function (ch) {
        return POKERPLUS_KEY_LOOKALIKE_MAP[ch] || ch;
      })
      .slice(0, 64);
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
    if (linked) refreshBtn.textContent = pokerPlusLocale() === "en" ? "Refresh" : "Обновить";
    else refreshBtn.textContent = pokerPlusLocale() === "en" ? "Check by email" : "Проверить по почте";
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
    var hasBalance = !!pokerPlusBalanceRaw;
    if (balanceRow) balanceRow.hidden = !hasBalance;
    if (balanceValue) balanceValue.textContent = hasBalance ? (pokerPlusBalanceVisible ? pokerPlusWholeNumber(pokerPlusBalanceRaw) + " ₽" : "••••") : "—";
    if (balanceToggle) {
      balanceToggle.hidden = !hasBalance;
      balanceToggle.textContent = pokerPlusBalanceVisible ? "Скрыть" : "Показать";
      balanceToggle.setAttribute("aria-pressed", pokerPlusBalanceVisible ? "true" : "false");
      balanceToggle.setAttribute("aria-label", pokerPlusBalanceVisible ? "Скрыть баланс Poker21" : "Показать баланс Poker21");
    }
  }

  function setPokerPlusBalanceVisible(visible) {
    pokerPlusBalanceVisible = !!visible;
    try {
      if (pokerPlusBalanceVisible) localStorage.setItem(POKERPLUS_BALANCE_VISIBLE_KEY, "1");
      else localStorage.removeItem(POKERPLUS_BALANCE_VISIBLE_KEY);
    } catch (eSavePpBalanceVisible) {}
    renderPokerPlusBalance();
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

  function pokerPlusCounterHasValue(total) {
    if (!total || typeof total !== "object") return false;
    var keys = ["fee", "hands", "winnings", "mttWinnings", "mtt_winnings", "sngWinnings", "sng_winnings", "bb", "ofcWinnings", "ofc_winnings"];
    for (var i = 0; i < keys.length; i += 1) {
      var v = total[keys[i]];
      if (v != null && v === v && String(v).trim() !== "") return true;
    }
    return false;
  }

  function pokerPlusStatsGroupHtml(title, totalSource, includeEmptyCore) {
    var total = totalSource && typeof totalSource === "object" ? totalSource : {};
    var metrics = [];
    var handsStat = pokerPlusPickStat(total, "hands", "hands");
    var winningsStat = pokerPlusPickStat(total, "winnings", "winnings");
    var mttStat = pokerPlusPickStat(total, "mttWinnings", "mtt_winnings");
    var sngStat = pokerPlusPickStat(total, "sngWinnings", "sng_winnings");
    var feeStat = pokerPlusPickStat(total, "fee", "fee");
    if (includeEmptyCore || feeStat != null) metrics.push(pokerPlusStatMetricHtml("Рейк", feeStat, pokerPlusStatTone(feeStat), "%"));
    if (includeEmptyCore || handsStat != null) metrics.push(pokerPlusStatMetricHtml("Раздачи", handsStat, "", "♠"));
    if (includeEmptyCore || winningsStat != null) metrics.push(pokerPlusStatMetricHtml("Кеш", winningsStat, pokerPlusStatTone(winningsStat), "⌁"));
    if (includeEmptyCore || mttStat != null) metrics.push(pokerPlusStatMetricHtml("MTT", mttStat, pokerPlusStatTone(mttStat), "🏆"));
    if (includeEmptyCore || sngStat != null) metrics.push(pokerPlusStatMetricHtml("SNG", sngStat, pokerPlusStatTone(sngStat), "♦"));
    if (!metrics.length) return "";
    return (
      '<span class="profile-pokerplus-stats-period"><span class="profile-pokerplus-stats-period__title">' +
      escapeHtml(title || "Статистика") +
      '</span><span class="profile-pokerplus-stats">' +
      metrics.join("") +
      "</span></span>"
    );
  }

  function renderPokerPlusStats(profileSource) {
    if (!statsValue) return;
    setProfileStatusLoading(false);
    var source = profileSource && typeof profileSource === "object" ? profileSource : {};
    var total = source.totalCounter && typeof source.totalCounter === "object" ? source.totalCounter : (source.total_counter && typeof source.total_counter === "object" ? source.total_counter : source);
    var today = source.todayCounter && typeof source.todayCounter === "object" ? source.todayCounter : (source.today_counter && typeof source.today_counter === "object" ? source.today_counter : null);
    var week = source.weekCounter && typeof source.weekCounter === "object" ? source.weekCounter : (source.week_counter && typeof source.week_counter === "object" ? source.week_counter : null);
    var feeStat = pokerPlusPickStat(total, "fee", "fee");
    setProfileStatusFromRake(feeStat);
    var groups = [];
    if (pokerPlusCounterHasValue(today)) groups.push(pokerPlusStatsGroupHtml("Сегодня", today, false));
    if (pokerPlusCounterHasValue(week)) groups.push(pokerPlusStatsGroupHtml("Неделя", week, false));
    if (pokerPlusCounterHasValue(total) || !groups.length) groups.push(pokerPlusStatsGroupHtml(groups.length ? "Всего" : "Статистика", total, !groups.length));
    statsValue.innerHTML = groups.join("");
    if (statsRow) statsRow.hidden = false;
  }

  function hidePokerPlusStats() {
    if (statsRow) statsRow.hidden = true;
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
    updateProfileStatusTextVisibility();
    input.hidden = false;
    bindBtn.hidden = !!linked;
    input.placeholder = linked ? "Ключ из Poker21 для обновления" : "Ключ из Poker21";
    input.setAttribute("aria-label", linked ? "Ключ из Poker21 для обновления" : "Ключ из Poker21");
    bindBtn.textContent = "Привязать по ключу из Poker21";
    refreshBtn.hidden = false;
    setPokerPlusRefreshButtonText(!!linked);
    unbindBtn.hidden = !linked;
  }

  function renderProfile(profile, linked) {
    var p = profile && typeof profile === "object" ? profile : null;
    setPokerPlusInitialLoading(false);
    if (!linked || !p) {
      setPokerPlusLinkedMode(false);
      if (title) title.textContent = pokerPlusLocale() === "en" ? "Verification via Poker21" : "Верификация через Poker21";
      if (emailRow) emailRow.hidden = true;
      if (linkedRow) linkedRow.hidden = true;
      if (linkedRow) linkedRow.removeAttribute("data-register-date");
      if (balanceRow) balanceRow.hidden = true;
      pokerPlusBalanceRaw = "";
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
    pokerPlusBalanceRaw = pokerPlusText(p.balance);
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
    if (refresh) {
      body.refresh = "1";
      refreshCiphertext = normalizePokerPlusKeyInput(input && input.value ? input.value : "");
      if (refreshCiphertext) {
        input.value = refreshCiphertext;
        body.ciphertext = refreshCiphertext;
      }
    }
    return fetch(base + "/api/pokerplus-player", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify(body),
    })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (!data || !data.ok) {
          renderProfile(null, false);
          setProfileStatusLoading(false);
          if (data && data.error) setFeedback(data.error, true);
          return;
        }
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
          var keyHint = /binding failed|bind failed/i.test(syncError) ? ". Вставьте ключ из Poker21 и нажмите «Обновить»." : "";
          setFeedback("Показаны сохранённые данные Poker21. Свежее обновление не прошло: " + syncError + keyHint, "warn");
        } else if (refresh && refreshCiphertext) {
          input.value = "";
          setFeedback("Данные Poker21 обновлены, ключ сохранён.", false);
        } else if (refresh) {
          setFeedback("Данные Poker21 обновлены.", false);
        } else {
          setFeedback("", false);
        }
      })
      .catch(function () {
        setFeedback(refresh ? "Не удалось обновить Poker21: сервер обновления не ответил. Старые данные показаны ниже." : POKER_NET_ERR, true);
        renderPokerPlusStatsFallbackIfVisible();
      })
      .finally(function () {
        setPokerPlusInitialLoading(false);
        setProfileStatusLoading(false);
      });
  }

  function bindPokerPlus() {
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
    fetch(base + "/api/pokerplus-bind", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerApiAuthJsonBody({ ciphertext: ciphertext })),
    })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (!data || !data.ok) {
          setFeedback((data && data.error) || "Не удалось привязать Poker21.", true);
          return;
        }
        renderProfile(data.profile, true);
        notifyPokerPlusStatusChange(true, data.profile);
        setFeedback(wasLinked ? "Данные Poker21 обновлены, ключ сохранён." : "Poker21 привязан.", false);
        input.value = "";
      })
      .catch(function () {
        setFeedback(POKER_NET_ERR, true);
      })
      .finally(function () {
        bindBtn.disabled = false;
        refreshBtn.disabled = false;
        unbindBtn.disabled = false;
      });
  }

  function unbindPokerPlus() {
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
    fetch(base + "/api/pokerplus-unbind", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerApiAuthJsonBody({})),
    })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (!data || !data.ok) {
          setFeedback((data && data.error) || "Не удалось отвязать Poker21.", true);
          return;
        }
        renderProfile(null, false);
        notifyPokerPlusStatusChange(false, null);
        input.value = "";
        setFeedback("Poker21 отвязан.", false);
      })
      .catch(function () {
        setFeedback(POKER_NET_ERR, true);
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
  if (balanceToggle && balanceToggle.dataset.bound !== "1") {
    balanceToggle.dataset.bound = "1";
    balanceToggle.addEventListener("click", function () {
      setPokerPlusBalanceVisible(!pokerPlusBalanceVisible);
    });
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
  if (input.dataset.bound !== "1") {
    input.dataset.bound = "1";
    input.addEventListener("input", function () {
      input.value = String(input.value || "").replace(/\s+/g, "").slice(0, 64);
    });
  }
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
