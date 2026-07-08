function updateProfileUserMeta() {
  var metaEl = document.getElementById("profileUserMeta");
  if (!metaEl) return;
  var parts = [];
  var dtId = (typeof sessionStorage !== "undefined" && sessionStorage.getItem("poker_dt_id")) || (typeof localStorage !== "undefined" && localStorage.getItem("poker_dt_id")) || "";
  if (dtId && !document.getElementById("profileUserId")) parts.push("ID: " + dtId);
  var user = typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser() : tg && tg.initDataUnsafe && tg.initDataUnsafe.user;
  var username = user && user.username ? user.username : "";
  if (username && !pokerHideRomanTelegramUsername(username)) parts.push("@" + String(username).replace(/^@+/, ""));
  var linkedEmail = "";
  try {
    linkedEmail = String(window.__pokerProfileLinkedEmail || "").trim();
  } catch (eEmailMeta) {}
  if (linkedEmail) parts.push(linkedEmail);
  if (parts.length) metaEl.textContent = " (" + parts.join(", ") + ")";
  else metaEl.textContent = "";
}

function updateProfileHeroPokerPlusId(value) {
  var el = document.getElementById("profileUserId");
  var row = el && el.closest ? el.closest(".profile-hero-card__id") : null;
  if (!el || !row) return;
  var text = "";
  try {
    text = typeof pokerPlusText === "function" ? pokerPlusText(value) : String(value || "").trim();
  } catch (eText) {
    text = String(value || "").trim();
  }
  el.textContent = text || "\u2014";
  row.hidden = !text;
  pokerScheduleProfileHeroTextFit();
}

function loadProfileDebugInfo() {
  return;
}

var pokerProfileUserInfoCache = null;
var pokerProfileUserInfoPromise = null;
var pokerProfileUserInfoCacheAt = 0;
var POKER_PROFILE_USER_INFO_CACHE_MS = 15000;
var POKER_PROFILE_USER_INFO_SESSION_CACHE_MS = 60000;
var POKER_PROFILE_USER_INFO_SESSION_CACHE_KEY = "poker_profile_user_info_v2";
var POKER_PROFILE_AUTH_LOADING_FALLBACK_MS = 12000;
var pokerProfileAuthLoadingSince = 0;
var POKER_PROFILE_LINKED_EMAIL_CACHE_KEY = "poker_profile_linked_email";
var POKER_PROFILE_TELEGRAM_USERNAME_CACHE_KEY = "poker_profile_telegram_username";
var POKER_PROFILE_TELEGRAM_VISIBLE_CACHE_KEY = "poker_profile_telegram_visible";
var POKER_PROFILE_CLICK_SOUND_MUTED_KEY = "poker_click_sound_muted";
var POKER_PROFILE_RESPECT_CACHE_KEY = "poker_profile_respect_score";
var pokerProfileTelegramVisible = false;

function pokerApplyProfileTelegramVisible(value) {
  pokerProfileTelegramVisible = value === true || value === 1 || value === "1" || value === "true";
  try {
    pokerWriteProfileStorage(POKER_PROFILE_TELEGRAM_VISIBLE_CACHE_KEY, pokerProfileTelegramVisible ? "1" : "0");
  } catch (eStorage) {}
  pokerRenderProfileTelegramVisibility();
}

function pokerApplyProfileDealsCount(value) {
  var badge = document.getElementById("profileDealsBadge");
  var countEl = document.getElementById("profileDealsCount");
  if (!badge || !countEl) return;
  var count = Math.max(0, parseInt(String(value == null ? 0 : value), 10) || 0);
  countEl.textContent = "+" + count;
  badge.setAttribute("aria-label", "Закрытые сделки: " + count);
}

function pokerRenderProfileTelegramVisibility(saving) {
  var row = document.getElementById("profileTelegramVisibilityRow");
  var stateEl = document.getElementById("profileTelegramVisibilityState");
  if (!row) return;
  var visible = !!pokerProfileTelegramVisible;
  var linkedUsername = "";
  try {
    linkedUsername = String(window.__pokerProfileTelegramUsername || "").trim();
  } catch (eLinkedUsername) {}
  if (!linkedUsername) linkedUsername = pokerReadProfileStorage(POKER_PROFILE_TELEGRAM_USERNAME_CACHE_KEY);
  row.hidden = !linkedUsername;
  Array.prototype.slice.call(row.querySelectorAll("[data-profile-telegram-visible]")).forEach(function (btn) {
    var targetVisible = btn.dataset.profileTelegramVisible === "1";
    var active = visible === targetVisible;
    btn.classList.toggle("profile-telegram-visibility__btn--active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
    btn.disabled = !!saving;
  });
  if (stateEl) {
    stateEl.textContent = visible ? "Telegram показан другим игрокам." : "Telegram скрыт от игроков.";
    stateEl.classList.toggle("profile-telegram-visibility__state--visible", visible);
    stateEl.classList.toggle("profile-telegram-visibility__state--hidden", !visible);
  }
}

function pokerSaveProfileTelegramVisible(value) {
  var next = !!value;
  if (next === !!pokerProfileTelegramVisible) return;
  var prev = !!pokerProfileTelegramVisible;
  var base = typeof getApiBase === "function" ? getApiBase() : "";
  var body =
    typeof pokerGuestOrAuthedPostBody === "function"
      ? pokerGuestOrAuthedPostBody({ telegramVisible: next })
      : { telegramVisible: next };
  if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
  pokerProfileTelegramVisible = next;
  pokerRenderProfileTelegramVisibility(true);
  fetch(base + "/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then(function (r) { return r.json().catch(function () { return {}; }); })
    .then(function (data) {
      if (!data || !data.ok) {
        pokerProfileTelegramVisible = prev;
      } else {
        pokerClearProfileUserInfoCache();
      }
      pokerRenderProfileTelegramVisibility(false);
    })
    .catch(function () {
      pokerProfileTelegramVisible = prev;
      pokerRenderProfileTelegramVisibility(false);
    });
}

function pokerBindProfileTelegramVisibility() {
  var row = document.getElementById("profileTelegramVisibilityRow");
  if (!row || row.dataset.bound === "1") return;
  row.dataset.bound = "1";
  row.addEventListener("click", function (event) {
    var btn = event && event.target ? event.target.closest("[data-profile-telegram-visible]") : null;
    if (!btn || btn.disabled || !row.contains(btn)) return;
    pokerSaveProfileTelegramVisible(btn.dataset.profileTelegramVisible === "1");
  });
  pokerRenderProfileTelegramVisibility(false);
}

function pokerProfileIsClickSoundMuted() {
  try {
    if (typeof window.pokerIsClickSoundMuted === "function") return !!window.pokerIsClickSoundMuted();
  } catch (eGlobalSound) {}
  try {
    return typeof localStorage !== "undefined" && localStorage.getItem(POKER_PROFILE_CLICK_SOUND_MUTED_KEY) === "1";
  } catch (eStorage) {
    return false;
  }
}

function pokerProfileSetClickSoundMuted(muted) {
  var next = !!muted;
  try {
    if (typeof window.pokerSetClickSoundMuted === "function") {
      window.pokerSetClickSoundMuted(next);
      return next;
    }
  } catch (eGlobalSound) {}
  try {
    if (typeof localStorage !== "undefined") {
      if (next) localStorage.setItem(POKER_PROFILE_CLICK_SOUND_MUTED_KEY, "1");
      else localStorage.removeItem(POKER_PROFILE_CLICK_SOUND_MUTED_KEY);
    }
  } catch (eStorage) {}
  return next;
}

function pokerRenderProfileClickSound() {
  var row = document.getElementById("profileClickSoundRow");
  var btn = document.getElementById("profileClickSoundToggle");
  var stateEl = document.getElementById("profileClickSoundState");
  if (!row || !btn) return;
  var muted = pokerProfileIsClickSoundMuted();
  row.classList.toggle("profile-click-sound--muted", muted);
  btn.textContent = muted ? "Включить звук" : "Отключить звук";
  btn.setAttribute("aria-pressed", muted ? "true" : "false");
  if (stateEl) stateEl.textContent = muted ? "Звук кликов отключен." : "Звук кликов включен.";
}

function pokerBindProfileClickSound() {
  var row = document.getElementById("profileClickSoundRow");
  var btn = document.getElementById("profileClickSoundToggle");
  if (!row || !btn || row.dataset.bound === "1") return;
  row.dataset.bound = "1";
  btn.addEventListener("click", function () {
    pokerProfileSetClickSoundMuted(!pokerProfileIsClickSoundMuted());
    pokerRenderProfileClickSound();
  });
  pokerRenderProfileClickSound();
}

function pokerProfileSubscriptionHandle(raw, fallback) {
  var text = String(raw || fallback || "").trim();
  if (!text) return "";
  return "@" + text.replace(/^@+/, "").toLowerCase();
}
function pokerSetProfileSubscriptionItem(kind, checked, handle, url) {
  var item = document.getElementById(kind === "bot" ? "profileBotSubscriptionItem" : "profileChannelSubscriptionItem");
  var handleEl = item ? item.querySelector(".profile-subscription-checklist__handle") : null;
  if (!item) return;
  var visibleHandle = pokerProfileSubscriptionHandle(handle, kind === "bot" ? "@poker_dvatuza_bot" : "@dva_tuza_club");
  item.classList.toggle("profile-subscription-checklist__item--checked", !!checked);
  item.setAttribute(
    "aria-label",
    (checked ? "Подписан" : "Не подтверждена подписка") +
      (kind === "bot" ? " на бот " : " на канал клуба ") +
      visibleHandle
  );
  if (url) item.href = String(url);
  if (handleEl) handleEl.textContent = visibleHandle;
}
function pokerSetProfileSubscriptionStatus(status) {
  var data = status && status.telegramSubscriptions ? status.telegramSubscriptions : status || {};
  pokerSetProfileSubscriptionItem(
    "bot",
    data.botSubscribed === true,
    data.botHandle || "@poker_dvatuza_bot",
    data.botUrl || "https://t.me/Poker_dvatuza_bot"
  );
  pokerSetProfileSubscriptionItem(
    "channel",
    data.channelSubscribed === true,
    data.channelHandle || "@dva_tuza_club",
    data.channelUrl || "https://t.me/Dva_tuza_club"
  );
}
function pokerReadProfileStorage(key) {
  try {
    return (typeof sessionStorage !== "undefined" && sessionStorage.getItem(key)) ||
      (typeof localStorage !== "undefined" && localStorage.getItem(key)) ||
      "";
  } catch (e) {
    return "";
  }
}
function pokerWriteProfileStorage(key, value) {
  var text = value != null ? String(value).trim() : "";
  try {
    if (typeof sessionStorage !== "undefined") {
      if (text) sessionStorage.setItem(key, text);
      else sessionStorage.removeItem(key);
    }
  } catch (eSession) {}
  try {
    if (typeof localStorage !== "undefined") {
      if (text) localStorage.setItem(key, text);
      else localStorage.removeItem(key);
    }
  } catch (eLocal) {}
}

function pokerReadProfileUserInfoSessionCache() {
  try {
    if (typeof sessionStorage === "undefined") return null;
    var raw = sessionStorage.getItem(POKER_PROFILE_USER_INFO_SESSION_CACHE_KEY);
    if (!raw) return null;
    var entry = JSON.parse(raw);
    if (!entry || !entry.data || !entry.data.ok) return null;
    if (Date.now() - Number(entry.ts || 0) > POKER_PROFILE_USER_INFO_SESSION_CACHE_MS) return null;
    return entry.data;
  } catch (eProfileInfoSessionRead) {
    return null;
  }
}

function pokerWriteProfileUserInfoSessionCache(data) {
  try {
    if (typeof sessionStorage === "undefined" || !data || !data.ok) return;
    sessionStorage.setItem(POKER_PROFILE_USER_INFO_SESSION_CACHE_KEY, JSON.stringify({ ts: Date.now(), data: data }));
  } catch (eProfileInfoSessionWrite) {}
}
window.pokerWriteCurrentProfileUserInfoCache = pokerWriteProfileUserInfoSessionCache;

function pokerClearProfileUserInfoCache() {
  pokerProfileUserInfoCache = null;
  pokerProfileUserInfoCacheAt = 0;
  try {
    if (typeof sessionStorage !== "undefined") sessionStorage.removeItem(POKER_PROFILE_USER_INFO_SESSION_CACHE_KEY);
  } catch (eProfileInfoSessionClear) {}
}
window.pokerClearCurrentProfileUserInfoCache = pokerClearProfileUserInfoCache;

function pokerApplyProfileUserInfo(data) {
  if (!data || !data.ok) return;
  try {
    if (typeof pokerApiHasCredential === "function" && pokerApiHasCredential()) {
      pokerSetHomeAuthResolved(true);
    }
  } catch (eHomeAuth) {}
  try {
    var linkedEmail = data.email != null ? String(data.email).trim() : "";
    window.__pokerProfileLinkedEmail = linkedEmail;
    pokerWriteProfileStorage(POKER_PROFILE_LINKED_EMAIL_CACHE_KEY, linkedEmail);
  } catch (eEmail) {}
  try {
    var tgUsername = data.telegramUsername != null ? String(data.telegramUsername).trim().replace(/^@+/, "") : "";
    window.__pokerProfileTelegramUsername = tgUsername;
    pokerWriteProfileStorage(POKER_PROFILE_TELEGRAM_USERNAME_CACHE_KEY, tgUsername);
  } catch (eTgProfile) {}
  try {
    pokerApplyProfileTelegramVisible(data.telegramVisible === true || data.telegramVisible === 1 || data.telegramVisible === "1");
  } catch (eTgVisible) {}
  try {
    pokerApplyProfileDealsCount(data.transferDealsCount);
  } catch (eDealsCount) {}
  try {
    if (data.pokerPlusStatsVisibility != null && typeof window.pokerApplyPokerPlusStatsVisibility === "function") {
      window.pokerApplyPokerPlusStatsVisibility(data.pokerPlusStatsVisibility);
    } else if (data.pokerPlusStatsVisible != null && typeof window.pokerApplyPokerPlusStatsVisible === "function") {
      window.pokerApplyPokerPlusStatsVisible(data.pokerPlusStatsVisible);
    }
  } catch (ePpStatsVisible) {}
  try {
    pokerSetProfileSubscriptionStatus(data);
  } catch (eSubStatus) {}
}
function loadCurrentProfileUserInfo() {
  var now = Date.now();
  if (pokerProfileUserInfoCache && now - pokerProfileUserInfoCacheAt < POKER_PROFILE_USER_INFO_CACHE_MS) {
    return Promise.resolve(pokerProfileUserInfoCache);
  }
  if (pokerProfileUserInfoPromise) return pokerProfileUserInfoPromise;
  var base = getApiBase();
  var authQ = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
  if (!base || !authQ || authQ === "?initData=") return Promise.resolve(null);
  var cached = "";
  try {
    cached = (typeof sessionStorage !== "undefined" && sessionStorage.getItem("poker_dt_id")) ||
      (typeof localStorage !== "undefined" && localStorage.getItem("poker_dt_id")) ||
      "";
  } catch (eDtIdHint) {}
  var authQWithHint = authQ;
  if (cached && authQWithHint) authQWithHint += "&dtIdHint=" + encodeURIComponent(cached);
  var cachedInfo = pokerReadProfileUserInfoSessionCache();
  if (cachedInfo) {
    pokerProfileUserInfoCache = cachedInfo;
    pokerProfileUserInfoCacheAt = Date.now();
    pokerApplyProfileUserInfo(cachedInfo);
    pokerProfileUserInfoPromise = fetch(base + "/api/users" + authQWithHint)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        pokerProfileUserInfoCache = data || null;
        pokerProfileUserInfoCacheAt = Date.now();
        if (data && data.ok) pokerWriteProfileUserInfoSessionCache(data);
        pokerApplyProfileUserInfo(pokerProfileUserInfoCache);
        return pokerProfileUserInfoCache;
      })
      .catch(function () {
        return cachedInfo;
      })
      .finally(function () {
        pokerProfileUserInfoPromise = null;
      });
    return Promise.resolve(cachedInfo);
  }
  pokerProfileUserInfoPromise = fetch(base + "/api/users" + authQWithHint)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      pokerProfileUserInfoCache = data || null;
      pokerProfileUserInfoCacheAt = Date.now();
      if (data && data.ok) pokerWriteProfileUserInfoSessionCache(data);
      pokerApplyProfileUserInfo(pokerProfileUserInfoCache);
      return pokerProfileUserInfoCache;
    })
    .catch(function () {
      return null;
    })
    .finally(function () {
      pokerProfileUserInfoPromise = null;
    });
  return pokerProfileUserInfoPromise;
}

function pokerProfileStoredSessionAuth() {
  try {
    if (typeof pokerReadPwaTgSessionRecord === "function") {
      var tgRecord = pokerReadPwaTgSessionRecord();
      if (tgRecord && tgRecord.token && tgRecord.user && tgRecord.user.id != null) {
        return { record: tgRecord, user: tgRecord.user, method: tgRecord.authMethod || "telegram", vk: false };
      }
    }
  } catch (eProfileTgRecord) {}
  try {
    if (typeof pokerReadPwaVkSessionRecord === "function") {
      var vkRecord = pokerReadPwaVkSessionRecord();
      if (vkRecord && vkRecord.token && vkRecord.user && vkRecord.user.id != null) {
        return { record: vkRecord, user: vkRecord.user, method: vkRecord.authMethod || "vk", vk: true };
      }
    }
  } catch (eProfileVkRecord) {}
  return null;
}

function pokerProfileRehydrateStoredAuthIfNeeded() {
  var current = null;
  try {
    current = window.__pokerTelegramAuth;
    if (current && current.user && (current.status === "verified" || current.status === "dev_skip")) return null;
  } catch (eCurrentAuth) {}
  var stored = pokerProfileStoredSessionAuth();
  if (!stored || !stored.user) return null;
  try {
    var nextAuth = { status: "verified", user: stored.user, error: null };
    if (stored.record && stored.record.gazettePlannerAccess === true) nextAuth.gazettePlannerAccess = true;
    if (stored.record && stored.record.adminAccess === true) nextAuth.adminAccess = true;
    if (stored.record && stored.record.adminReportAccess === true) nextAuth.adminReportAccess = true;
    window.__pokerTelegramAuth = nextAuth;
  } catch (eSetStoredAuth) {}
  try {
    if (typeof pokerSetAuthMethod === "function") pokerSetAuthMethod(stored.method || (stored.vk ? "vk" : "telegram"));
  } catch (eStoredMethod) {}
  return stored;
}

function updateProfileDtId() {
  pokerBindProfileClickSound();
  pokerRenderProfileClickSound();
  var el = document.getElementById("profileUserId");
  if (el) updateProfileHeroPokerPlusId(typeof window !== "undefined" ? window.__pokerPlusUserId : "");
  var base = getApiBase();
  var authQ = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
  var cached = sessionStorage.getItem("poker_dt_id") || (typeof localStorage !== "undefined" && localStorage.getItem("poker_dt_id"));
  var authQWithHint = authQ;
  if (cached && authQWithHint && authQWithHint !== "?initData=") {
    authQWithHint += "&dtIdHint=" + encodeURIComponent(cached);
  }
  if (cached) {
    if (!base || !authQ || authQ === "?initData=") return;
  }
  if (!base || !authQ || authQ === "?initData=") {
    return;
  }
  loadCurrentProfileUserInfo()
    .then(function (data) {
      if (data && data.ok && data.dtId) {
        sessionStorage.setItem("poker_dt_id", data.dtId);
        if (typeof localStorage !== "undefined") localStorage.setItem("poker_dt_id", data.dtId);
        try {
          if (typeof window.pokerResolveMyChatMemberId === "function") {
            pokerRememberLastMemberId(window.pokerResolveMyChatMemberId());
          }
        } catch (eRememberMid) {}
        if (typeof updateProfileUserMeta === "function") updateProfileUserMeta();
      }
      if (data && data.ok) {
        pokerApplyProfileUserInfo(data);
        if (data.p21Id) updateProfileHeroPokerPlusId(data.p21Id);
        if (typeof syncProfileEmailAuthUi === "function") syncProfileEmailAuthUi();
        if (typeof updateProfileUserMeta === "function") updateProfileUserMeta();
        if (typeof refreshProfilePublicShowcase === "function") refreshProfilePublicShowcase(data);
        if (typeof refreshProfileAchievementsShowcase === "function") refreshProfileAchievementsShowcase(data);
      }
      if (data && data.ok && data.personalInfo != null) {
        var personalInput = document.getElementById("profilePersonalInput");
        if (personalInput) personalInput.value = data.personalInfo;
      }
      if (data && data.ok) {
        var birthInput = document.getElementById("profileBirthDateInput");
        var birthSave = document.getElementById("profileBirthDateSaveBtn");
        var birthWrap = document.getElementById("profileHeroBirthDate");
        var birthDate = data.profileBirthDate || data.birthDate || "";
        if (birthWrap) birthWrap.classList.toggle("profile-hero-birth--saved", !!birthDate);
        if (birthInput && birthDate) {
          birthInput.value = birthDate;
          birthInput.disabled = true;
        }
        if (birthSave && birthDate) {
          birthSave.hidden = true;
          birthSave.disabled = true;
        }
        var specialty = String(data.profileSpecialty || data.specialty || "").trim().toLowerCase();
        document.querySelectorAll("[data-profile-specialty]").forEach(function (btn) {
          var active = specialty && btn.getAttribute("data-profile-specialty") === specialty;
          btn.classList.toggle("profile-player-details__toggle-btn--active", !!active);
          btn.classList.toggle("profile-hero-specialty__btn--active", !!active);
          btn.setAttribute("aria-pressed", active ? "true" : "false");
        });
      }
      if (data && data.ok) {
        try {
          var cdn = data.chatDisplayName != null && String(data.chatDisplayName).trim() ? String(data.chatDisplayName).trim() : "";
          window.__pokerChatDisplayName = cdn;
          pokerWriteStoredProfileDisplayName(cdn);
          var cdnEl = document.getElementById("profileChatDisplayNameInput");
          if (cdnEl) cdnEl.value = cdn;
          if (typeof updateProfileUserName === "function") updateProfileUserName();
          if (typeof updateHeaderGreeting === "function") updateHeaderGreeting();
        } catch (eCdn2) {}
      }
      try {
        if (typeof updateHeaderGreeting === "function") updateHeaderGreeting();
      } catch (eHdrAfterUsers) {}
    })
    .catch(function () {
      updateProfileHeroPokerPlusId(typeof window !== "undefined" ? window.__pokerPlusUserId : "");
    });
  loadProfileDebugInfo();
}

function pokerProfileAuthState() {
  var state = {
    isGuest: false,
    isVerified: false,
    isLoading: false,
    hasStoredSession: false,
    hasCredential: false,
  };
  var storedAuth = null;
  try {
    storedAuth = pokerProfileRehydrateStoredAuthIfNeeded() || pokerProfileStoredSessionAuth();
  } catch (eStoredProfileAuth) {}
  try {
    var auth = window.__pokerTelegramAuth;
    state.isGuest = !!(auth && auth.status === "guest");
    state.isVerified = !!(auth && (auth.status === "verified" || auth.status === "dev_skip"));
    state.isLoading = !auth || auth.status === "unknown" || auth.status === "verifying";
  } catch (eAuthState) {}
  try {
    if (!state.isGuest && typeof pokerReadPwaGuestMode === "function") state.isGuest = !!pokerReadPwaGuestMode();
  } catch (eGuestModeState) {}
  try {
    state.hasStoredSession = !!storedAuth;
    if (!state.hasStoredSession && typeof pokerReadPwaTgSessionRecord !== "function" && typeof pokerReadPwaVkSessionRecord !== "function") {
      state.hasStoredSession = !!(pokerReadPwaTgSessionToken() || pokerReadPwaVkSessionToken());
    }
  } catch (eSessionState) {}
  try {
    state.hasCredential = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
  } catch (eCredentialState) {}
  try {
    if (!state.hasCredential && typeof pokerReadEmailPwaSessionToken === "function") {
      state.hasCredential = !!pokerReadEmailPwaSessionToken();
    }
  } catch (eEmailCredentialState) {}
  if (state.isLoading) {
    if (!pokerProfileAuthLoadingSince) pokerProfileAuthLoadingSince = Date.now();
    if (state.hasCredential && Date.now() - pokerProfileAuthLoadingSince > POKER_PROFILE_AUTH_LOADING_FALLBACK_MS) {
      state.isLoading = false;
      state.isVerified = true;
      state.usedCredentialFallback = true;
    }
  } else {
    pokerProfileAuthLoadingSince = 0;
  }
  state.hasAccountSession = !state.isGuest && (state.hasStoredSession || state.hasCredential || state.isVerified);
  state.showProfileShell = state.hasAccountSession;
  return state;
}

function updateProfileExitBtnVisibility() {
  var btn = document.getElementById("profileExitBtn");
  if (!btn) return;
  var authState = pokerProfileAuthState();
  var show = true;
  btn.classList.toggle("profile-exit-btn--hidden", !show);
  btn.hidden = !show;
  btn.classList.toggle("profile-exit-btn--auth-cta", !authState.hasAccountSession);
  btn.textContent = authState.hasAccountSession ? "Выйти из аккаунта" : "Войти в аккаунт";
  try {
    if (typeof window.__pokerSyncHeaderAuthMenuButton === "function") window.__pokerSyncHeaderAuthMenuButton();
  } catch (eHeaderAuthMenu) {}
  syncProfileStatusVisibility(authState.showProfileShell);
  syncProfileVerifiedContentVisibility(authState.showProfileShell);
  syncProfileLoadingVisibility(!!(authState.hasAccountSession && authState.isLoading && !authState.isVerified));
  if (authState.hasAccountSession && authState.isLoading && !authState.isVerified && !btn.dataset.profileLoadingFallbackTimer) {
    btn.dataset.profileLoadingFallbackTimer = "1";
    setTimeout(function () {
      btn.dataset.profileLoadingFallbackTimer = "";
      updateProfileExitBtnVisibility();
      try {
        var root = document.getElementById("profileView");
        if (
          root &&
          root.dataset &&
          root.dataset.profileActiveTab === "poker21" &&
          typeof initProfilePokerPlus === "function"
        ) {
          initProfilePokerPlus();
        }
      } catch (eProfileLoadingFallbackP21) {}
    }, POKER_PROFILE_AUTH_LOADING_FALLBACK_MS + 250);
  }
}

function pokerClearSessionsAndReloadForLogin() {
  try { localStorage.removeItem(POKER_PWA_TG_SESSION_KEY); } catch (e) {}
  try { localStorage.removeItem(POKER_PWA_VK_SESSION_KEY); } catch (e2) {}
  try { sessionStorage.removeItem(POKER_PWA_TG_SESSION_KEY); } catch (eS) {}
  try { sessionStorage.removeItem(POKER_PWA_VK_SESSION_KEY); } catch (eS2) {}
  try {
    if (typeof pokerClearAuthCookie === "function") {
      pokerClearAuthCookie(POKER_PWA_TG_SESSION_KEY);
      pokerClearAuthCookie(POKER_PWA_VK_SESSION_KEY);
    }
  } catch (eCookie) {}
  try {
    if (typeof pokerClearPwaSessionFromIdb === "function") {
      pokerClearPwaSessionFromIdb(POKER_PWA_TG_SESSION_KEY);
      pokerClearPwaSessionFromIdb(POKER_PWA_VK_SESSION_KEY);
    }
  } catch (eIdb) {}
  try { localStorage.removeItem(POKER_PWA_GUEST_KEY); } catch (eGuest) {}
  try { sessionStorage.removeItem("poker_dt_id"); } catch (e3) {}
  try { sessionStorage.removeItem("poker_p21_id"); } catch (e4) {}
  try { localStorage.removeItem("poker_p21_id"); } catch (e6) {}
  pokerWriteProfileStorage(POKER_PROFILE_LINKED_EMAIL_CACHE_KEY, "");
  pokerWriteProfileStorage(POKER_PROFILE_TELEGRAM_USERNAME_CACHE_KEY, "");
  pokerWriteProfileStorage(POKER_PROFILE_RESPECT_CACHE_KEY, "");
  pokerClearProfileUserInfoCache();
  try { window.__pokerTelegramAuth = { status: "no_telegram", user: null, error: null }; } catch (e7) {}
  try {
    delete window.__pokerChatDisplayName;
  } catch (eCdnL) {}
  try {
    delete window.__pokerProfileLinkedEmail;
    delete window.__pokerProfileTelegramUsername;
  } catch (eProfileMetaL) {}
  try {
    pokerWriteStoredProfileDisplayName("");
  } catch (eCdnLs) {}
  try {
    if (typeof window.__pokerShowLoggedOutState === "function") {
      window.__pokerShowLoggedOutState();
      return;
    }
  } catch (eShowLogin) {}
  window.location.reload();
}
window.__pokerClearSessionsAndReloadForLogin = pokerClearSessionsAndReloadForLogin;
window.addEventListener("poker-telegram-auth", function () {
  pokerClearProfileUserInfoCache();
  try { updateProfileExitBtnVisibility(); } catch (eProfileAuthVisibility) {}
  try { if (typeof syncProfileEmailAuthUi === "function") syncProfileEmailAuthUi(); } catch (eProfileEmailSync) {}
  try {
    var root = document.getElementById("profileView");
    if (
      root &&
      root.dataset &&
      root.dataset.profileActiveTab === "poker21" &&
      typeof initProfilePokerPlus === "function"
    ) {
      initProfilePokerPlus();
    }
  } catch (eProfilePokerPlusAuthSync) {}
});
window.addEventListener("poker-raffle-subscription-change", function (ev) {
  var detail = ev && ev.detail ? ev.detail : {};
  pokerClearProfileUserInfoCache();
  if (detail.subscribed === true) {
    pokerSetProfileSubscriptionStatus({
      botSubscribed: true,
      channelSubscribed: true,
      botUrl: detail.botUrl || "https://t.me/Poker_dvatuza_bot",
      channelUrl: detail.channelUrl || "https://t.me/Dva_tuza_club",
    });
    return;
  }
  loadCurrentProfileUserInfo().then(function (data) {
    if (data && data.ok) pokerSetProfileSubscriptionStatus(data);
  });
});
