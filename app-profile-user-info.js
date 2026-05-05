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
var POKER_PROFILE_LINKED_EMAIL_CACHE_KEY = "poker_profile_linked_email";
var POKER_PROFILE_TELEGRAM_USERNAME_CACHE_KEY = "poker_profile_telegram_username";
var POKER_PROFILE_RESPECT_CACHE_KEY = "poker_profile_respect_score";
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
    if (data.pokerPlusStatsVisible != null && typeof window.pokerApplyPokerPlusStatsVisible === "function") {
      window.pokerApplyPokerPlusStatsVisible(data.pokerPlusStatsVisible);
    }
  } catch (ePpStatsVisible) {}
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
  var cached = sessionStorage.getItem("poker_dt_id") || (typeof localStorage !== "undefined" && localStorage.getItem("poker_dt_id"));
  var authQWithHint = authQ;
  if (cached && authQWithHint) authQWithHint += "&dtIdHint=" + encodeURIComponent(cached);
  pokerProfileUserInfoPromise = fetch(base + "/api/users" + authQWithHint)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      pokerProfileUserInfoCache = data || null;
      pokerProfileUserInfoCacheAt = Date.now();
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

function updateProfileDtId() {
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
      }
      if (data && data.ok && data.personalInfo != null) {
        var personalInput = document.getElementById("profilePersonalInput");
        if (personalInput) personalInput.value = data.personalInfo;
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

function updateProfileExitBtnVisibility() {
  var btn = document.getElementById("profileExitBtn");
  if (!btn) return;
  var isGuest = false;
  var isVerified = false;
  var isLoading = false;
  try {
    var a = window.__pokerTelegramAuth;
    isGuest = !!(a && a.status === "guest");
    isVerified = !!(a && (a.status === "verified" || a.status === "dev_skip"));
    isLoading = !a || a.status === "unknown" || a.status === "verifying";
  } catch (e) {}
  var hasSession = !!(pokerReadPwaTgSessionToken() || pokerReadPwaVkSessionToken());
  var show = !!(hasSession && isVerified) || !isVerified;
  btn.classList.toggle("profile-exit-btn--hidden", !show);
  btn.hidden = !show;
  btn.classList.toggle("profile-exit-btn--auth-cta", !isVerified);
  btn.textContent = hasSession ? "Выйти из аккаунта" : "Войти в аккаунт";
  syncProfileStatusVisibility(hasSession || isVerified);
  syncProfileVerifiedContentVisibility(hasSession || isVerified);
  syncProfileLoadingVisibility(!!(hasSession && isLoading && !isVerified && !isGuest));
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
  pokerProfileUserInfoCache = null;
  pokerProfileUserInfoCacheAt = 0;
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
