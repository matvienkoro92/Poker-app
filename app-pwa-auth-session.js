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
  try {
    var auth = window.__pokerTelegramAuth;
    if (auth && auth.status === "guest") return "";
    if (typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode()) return "";
  } catch (eGuestProfileName) {}
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
  var opts = {};
  var source = init || {};
  var key;
  opts.cache = "no-store";
  for (key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) opts[key] = source[key];
  }
  function sameOriginFallbackUrl(rawUrl) {
    try {
      if (isPwaAuthLocalHost()) return "";
      if (typeof window === "undefined" || !window.location || !window.location.origin) return "";
      var parsed = new URL(rawUrl, window.location.href);
      if (parsed.origin === window.location.origin) return "";
      if (parsed.pathname.indexOf("/api/") !== 0) return "";
      return window.location.origin.replace(/\/$/, "") + parsed.pathname + parsed.search;
    } catch (eFallbackUrl) {
      return "";
    }
  }
  function responseFromXhr(xhr) {
    var body = xhr && xhr.responseText != null ? String(xhr.responseText) : "";
    var status = xhr && xhr.status != null ? Number(xhr.status) : 0;
    return {
      ok: status >= 200 && status < 300,
      status: status,
      statusText: xhr && xhr.statusText ? xhr.statusText : "",
      text: function () { return Promise.resolve(body); },
      json: function () {
        return Promise.resolve().then(function () {
          return body ? JSON.parse(body) : {};
        });
      },
    };
  }
  function pokerAuthFetchXhr(targetUrl, xhrOpts, timeoutMs) {
    return new Promise(function (resolve, reject) {
      var xhr;
      try {
        xhr = new XMLHttpRequest();
      } catch (eXhrNew) {
        reject(eXhrNew);
        return;
      }
      xhr.open(xhrOpts.method || "GET", targetUrl, true);
      xhr.timeout = timeoutMs || 8000;
      var headers = xhrOpts.headers || {};
      try {
        if (headers && typeof headers.forEach === "function") {
          headers.forEach(function (value, name) {
            xhr.setRequestHeader(name, value);
          });
        } else {
          for (var h in headers) {
            if (Object.prototype.hasOwnProperty.call(headers, h)) xhr.setRequestHeader(h, headers[h]);
          }
        }
      } catch (eHeaders) {}
      xhr.onload = function () {
        resolve(responseFromXhr(xhr));
      };
      xhr.onerror = function () {
        reject(new Error("auth xhr network error"));
      };
      xhr.ontimeout = function () {
        reject(new Error("auth xhr timeout"));
      };
      xhr.onabort = function () {
        reject(new Error("auth xhr aborted"));
      };
      try {
        xhr.send(xhrOpts.body != null ? xhrOpts.body : null);
      } catch (eSend) {
        reject(eSend);
      }
    });
  }
  var fallbackUrl = sameOriginFallbackUrl(url);
  function runAuthFetch(targetUrl) {
    return Promise.resolve().then(function () {
      if (typeof XMLHttpRequest !== "undefined") {
        return pokerAuthFetchXhr(targetUrl, opts, 8000);
      }
      if (typeof pokerFetchRetry === "function") {
        return pokerFetchRetry(targetUrl, opts, { timeoutMs: 6000, maxAttempts: 1, retryDelayMs: 0 });
      }
      return fetch(targetUrl, opts);
    });
  }
  return runAuthFetch(url).catch(function (err) {
    if (!fallbackUrl) return Promise.reject(err);
    return runAuthFetch(fallbackUrl);
  });
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
