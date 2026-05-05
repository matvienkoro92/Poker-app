// PWA auth session helpers shared by Telegram, email, VK, and profile UI.

function telegramUserDisplayName(u) {
  if (!u || typeof u !== "object") return "";
  var fn = u.first_name != null ? String(u.first_name).trim() : "";
  if (fn) return fn;
  var ln = u.last_name != null ? String(u.last_name).trim() : "";
  if (ln) return ln;
  var un = u.username != null ? String(u.username).trim() : "";
  if (un) return un.replace(/^@+/, "");
  return "";
}

var POKER_PROFILE_DISPLAY_NAME_KEY = "poker_profile_display_name";

function pokerReadStoredProfileDisplayName() {
  try {
    var raw = typeof localStorage !== "undefined" ? localStorage.getItem(POKER_PROFILE_DISPLAY_NAME_KEY) : "";
    return String(raw || "").trim();
  } catch (eProfileNameRead) {
    return "";
  }
}

function pokerWriteStoredProfileDisplayName(name) {
  try {
    if (typeof localStorage === "undefined") return;
    var value = String(name || "").trim();
    if (value) localStorage.setItem(POKER_PROFILE_DISPLAY_NAME_KEY, value);
    else localStorage.removeItem(POKER_PROFILE_DISPLAY_NAME_KEY);
  } catch (eProfileNameWrite) {}
}

function pokerPreferredProfileDisplayName() {
  var profileName = "";
  try {
    profileName = String(window.__pokerChatDisplayName || "").trim();
  } catch (eStoredProfileName) {}
  if (profileName) return profileName;
  profileName = pokerReadStoredProfileDisplayName();
  if (profileName) return profileName;
  try {
    var input = document.getElementById("profileChatDisplayNameInput");
    var typed = input && input.value != null ? String(input.value).trim() : "";
    if (typed) return typed;
  } catch (eInputProfileName) {}
  return "";
}

function getPokerResolvedTelegramUser() {
  var webApp = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  var unsafeUser = webApp && webApp.initDataUnsafe && webApp.initDataUnsafe.user;
  if (unsafeUser && unsafeUser.id != null) return unsafeUser;
  try {
    var auth = window.__pokerTelegramAuth;
    if (auth && auth.user && auth.user.id != null && (auth.status === "verified" || auth.status === "dev_skip")) return auth.user;
  } catch (eAuthUser) {}
  return null;
}

function getTelegramAuthApiBase() {
  var el = document.getElementById("app");
  var dataBase = el && el.getAttribute("data-api-base");
  if (dataBase && String(dataBase).trim()) return String(dataBase).trim().replace(/\/$/, "");
  if (typeof window !== "undefined" && window.location && window.location.origin) return window.location.origin;
  return "";
}

function pokerAuthFetch(url, init) {
  var opts = Object.assign({ cache: "no-store" }, init || {});
  if (typeof pokerFetchRetry === "function") {
    return pokerFetchRetry(url, opts, { timeoutMs: 15000, maxAttempts: 3, retryDelayMs: 500 });
  }
  return fetch(url, opts);
}

function isPwaAuthLocalHost() {
  try {
    var protocol = window.location.protocol || "";
    var host = (window.location.hostname || "").toLowerCase();
    if (protocol === "file:") return true;
    if (!host) return true;
    if (host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0") return true;
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) return true;
    return false;
  } catch (eLocation) {
    return true;
  }
}

function getTelegramWidgetAuthCallbackUrl() {
  try {
    var page = new URL(window.location.href);
    page.search = "";
    page.hash = "";
    return page.toString();
  } catch (eUrl) {
    try {
      return window.location.origin.replace(/\/$/, "") + "/";
    } catch (eOrigin) {
      return "";
    }
  }
}

function parseTelegramWidgetTgAuthResultFromHash() {
  try {
    var locationHash = String(window.location.hash || "");
    var match = locationHash.match(/[#?&]tgAuthResult=([A-Za-z0-9\-_=]*)$/);
    if (!match) return null;
    var data = (match[1] || "").replace(/-/g, "+").replace(/_/g, "/");
    var pad = data.length % 4;
    if (pad > 1) data += new Array(5 - pad).join("=");
    return JSON.parse(window.atob(data));
  } catch (eHash) {
    return null;
  }
}

function normalizeVerifiedUser(serverUser, fallbackUnsafe) {
  if (serverUser && serverUser.id != null) {
    return {
      id: serverUser.id,
      memberId: serverUser.memberId != null ? String(serverUser.memberId).trim() : "",
      email: serverUser.email != null ? String(serverUser.email).trim() : "",
      first_name: serverUser.first_name != null ? serverUser.first_name : "",
      last_name: serverUser.last_name != null ? serverUser.last_name : "",
      username: serverUser.username != null ? serverUser.username : "",
      photo_url: serverUser.photo_url || (fallbackUnsafe && fallbackUnsafe.photo_url) || "",
      language_code: serverUser.language_code || "",
      is_premium: !!serverUser.is_premium,
      is_vk: !!serverUser.vk,
    };
  }
  return fallbackUnsafe || null;
}
