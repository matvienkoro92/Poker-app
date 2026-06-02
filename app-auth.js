function isTelegramWebApp() {
  try {
    var wtg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (!wtg) return false;
    if (wtg.initData && String(wtg.initData).trim()) return true;
    if (
      wtg.initDataUnsafe &&
      (wtg.initDataUnsafe.user ||
        (wtg.initDataUnsafe.start_param != null && String(wtg.initDataUnsafe.start_param).trim()))
    ) {
      return true;
    }
    var platform = String(wtg.platform || "").trim().toLowerCase();
    return !!(platform && platform !== "unknown");
  } catch (eTgEnv) {
    return false;
  }
}

function isTelegramChatRuntime() {
  try {
    if (
      (typeof pokerIsPwaDisplayStandalone === "function" && pokerIsPwaDisplayStandalone()) ||
      (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      !!(window.navigator && window.navigator.standalone) ||
      (document.documentElement &&
        document.documentElement.classList &&
        (document.documentElement.classList.contains("poker-ios-pwa") ||
          document.documentElement.classList.contains("poker-android-pwa")))
    ) {
      return false;
    }
  } catch (ePwaRuntimeGuard) {}
  try {
    var root = document.documentElement;
    if (
      root &&
      root.classList &&
      (root.classList.contains("app--telegram-miniapp") || root.classList.contains("poker-telegram-miniapp"))
    ) {
      return true;
    }
  } catch (eRootTgRuntime) {}
  try {
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (!tg) return false;
    if (tg.initData && String(tg.initData).trim()) return true;
    if (
      tg.initDataUnsafe &&
      (tg.initDataUnsafe.user ||
        (tg.initDataUnsafe.start_param != null && String(tg.initDataUnsafe.start_param).trim()))
    ) {
      return true;
    }
    var platform = String(tg.platform || "").trim().toLowerCase();
    return !!(platform && platform !== "unknown");
  } catch (eWebAppTgRuntime) {}
  return false;
}

/** Каноническая ссылка Mini App в Telegram (шаринг и ?startapp= — только с этим базисом, не с HTTPS сайта). */
var POKER_DEFAULT_TELEGRAM_MINI_APP_URL = "https://t.me/Poker_dvatuza_bot/DvaTuza";

/**
 * Канонический HTTPS-базис для шаринга вне Mini App: совпадает с start_url PWA (/) и даёт ?startapp= на корне.
 */
function getWebsiteOriginBaseForLinks() {
  try {
    var o = String(window.location.origin || "").replace(/\/$/, "");
    if (!o) return "";
    var p = String(window.location.pathname || "/");
    var pl = p.toLowerCase();
    if (pl === "/index.html") return o + "/";
    if (pl === "/" || p === "") return o + "/";
    return (o + p).replace(/\/$/, "");
  } catch (e) {
    return "";
  }
}

/**
 * Базовый URL для ссылок "в это же приложение" (добавляйте ?startapp=…).
 * - По умолчанию — канонический t.me (`POKER_DEFAULT_TELEGRAM_MINI_APP_URL`), не HTTPS сайта (шаринг и приглашения).
 * - Только в установленной PWA (standalone) — origin сайта, чтобы ?startapp= открывался в той же сессии PWA.
 */
function getAppBaseUrlForLinks() {
  try {
    if (typeof pokerIsPwaStandaloneForShare === "function" && pokerIsPwaStandaloneForShare()) {
      var web = getWebsiteOriginBaseForLinks();
      if (web) return web;
    }
  } catch (ePwaBase) {}
  return String(POKER_DEFAULT_TELEGRAM_MINI_APP_URL || "").replace(/\/$/, "");
}

/** Нормализация start_param / ?startapp= (декодирование, префикс startapp=). */
function pokerNormalizeWebAppStartParam(raw) {
  if (raw == null) return "";
  var s = String(raw).trim();
  if (!s) return "";
  try {
    s = decodeURIComponent(s.replace(/\+/g, " "));
  } catch (eDec) {}
  s = s.trim();
  var m = s.match(/^startapp=([^&]+)$/i);
  if (m && m[1]) {
    var inner = m[1].trim();
    try {
      inner = decodeURIComponent(inner);
    } catch (e2) {}
    return String(inner).trim();
  }
  return s;
}

function pokerNormalizeClubChatDmPeer(raw) {
  if (raw == null) return "";
  var s = String(raw).trim();
  if (!s) return "";
  try {
    s = decodeURIComponent(s.replace(/\+/g, " "));
  } catch (eDecPeer) {}
  s = s.trim();
  if (/^\d+$/.test(s)) s = "tg_" + s;
  if (/^(tg_\d+|vk_[A-Za-z0-9_-]+|guest_[A-Za-z0-9_-]+|group_[A-Za-z0-9_-]+|ID\d{6})$/.test(s)) return s;
  return "";
}

function pokerParseClubChatDmStartParam(rawStartParam, rawWithPeer) {
  var start = pokerNormalizeWebAppStartParam(rawStartParam);
  var peer = pokerNormalizeClubChatDmPeer(rawWithPeer);
  if (start === "club_chat_dm") return { match: true, peer: peer };
  var m = start.match(/^club_chat_dm[_-](.+)$/);
  if (!m) return { match: false, peer: "" };
  return { match: true, peer: peer || pokerNormalizeClubChatDmPeer(m[1]) };
}

function pokerNormalizeRaffleCompletedId(raw) {
  var s = String(raw || "").trim();
  if (!s) return "";
  return s.replace(/[^A-Za-z0-9_-]/g, "_").slice(0, 72);
}

function pokerBuildRaffleCompletedStartParam(raffleId) {
  var numberSource = raffleId && typeof raffleId === "object" ? raffleId.completedNumber || raffleId.completed_number : "";
  var n = parseInt(String(numberSource || ""), 10);
  if (Number.isFinite(n) && n > 0) return "raffle_" + n;
  var rawId = raffleId && typeof raffleId === "object" ? raffleId.id || raffleId.raffleId || raffleId.raffle_id : raffleId;
  var id = pokerNormalizeRaffleCompletedId(rawId);
  return id ? "raffle_" + id : "raffles";
}

function pokerParseRaffleCompletedStartParam(rawStartParam) {
  var start = pokerNormalizeWebAppStartParam(rawStartParam);
  if (!start || start === "raffles") return "";
  var m = start.match(/^raffle_(.+)$/) || start.match(/^raffles_(.+)$/);
  if (!m || !m[1]) return "";
  return pokerNormalizeRaffleCompletedId(m[1]);
}

try {
  if (typeof window !== "undefined") {
    window.pokerNormalizeRaffleCompletedId = pokerNormalizeRaffleCompletedId;
    window.pokerBuildRaffleCompletedStartParam = pokerBuildRaffleCompletedStartParam;
    window.pokerParseRaffleCompletedStartParam = pokerParseRaffleCompletedStartParam;
  }
} catch (eRaffleCompletedHelpers) {}

/**
 * Параметр ссылки ?startapp= / startattach: в hash приходит как tgWebAppStartParam (см. launch parameters Mini App).
 * Раньше читали только initDataUnsafe.start_param — на части клиентов он пустой, открывалась главная.
 * Дополнительно: query страницы, фрагмент после «?» в hash, initParams._path (если клиент отдал только «путь» без =).
 */
function pokerReadTelegramLaunchStartParam() {
  function startParamFromQueryChunk(chunk) {
    if (chunk == null) return "";
    try {
      var q = String(chunk).replace(/^\?/, "").trim();
      if (!q) return "";
      var sp = new URLSearchParams(q);
      var v = sp.get("tgWebAppStartParam");
      if (v != null && String(v).trim() !== "") return String(v).trim();
      v = pokerStartAppQueryFromUrlSearchParams(sp);
      return v ? String(v).trim() : "";
    } catch (eQ) {
      return "";
    }
  }
  try {
    if (window.Telegram && window.Telegram.WebView && window.Telegram.WebView.initParams) {
      var ip = window.Telegram.WebView.initParams;
      var lp = ip.tgWebAppStartParam;
      if (lp != null && String(lp).trim() !== "") return String(lp).trim();
      var pathV = ip._path;
      if (pathV != null && String(pathV).trim() !== "") {
        var pv = String(pathV).trim();
        if (
          pv.length >= 1 &&
          pv.length <= 160 &&
          /^[a-zA-Z0-9_.-]+$/.test(pv) &&
          !/^tgWebApp/i.test(pv)
        ) {
          return pv;
        }
      }
    }
  } catch (eLp) {}
  try {
    var searchRaw = typeof location !== "undefined" && location.search ? String(location.search) : "";
    var fromSearch = startParamFromQueryChunk(searchRaw);
    if (fromSearch) return fromSearch;
  } catch (eS) {}
  try {
    var h = typeof location !== "undefined" && location.hash ? String(location.hash).replace(/^#/, "") : "";
    if (h) {
      var qi = h.indexOf("?");
      var forParams = qi >= 0 ? h.slice(qi + 1) : h.indexOf("=") >= 0 ? h : "";
      var fromHash = startParamFromQueryChunk(forParams);
      if (fromHash) return fromHash;
    }
  } catch (eH) {}
  var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  if (tg && tg.initDataUnsafe && tg.initDataUnsafe.start_param != null && String(tg.initDataUnsafe.start_param).trim() !== "") {
    return String(tg.initDataUnsafe.start_param).trim();
  }
  if (tg && tg.initData) {
    try {
      var params = new URLSearchParams(tg.initData);
      var spData = params.get("start_param");
      if (spData != null && String(spData).trim() !== "") return String(spData).trim();
    } catch (eId) {}
  }
  if (tg && tg.startParam != null && String(tg.startParam).trim() !== "") return String(tg.startParam).trim();
  return "";
}

function pokerStartAppQueryFromUrlSearchParams(sp) {
  if (!sp || typeof sp.get !== "function") return "";
  var v = sp.get("startapp");
  if (v != null && String(v).trim() !== "") return String(v).trim();
  try {
    var found = "";
    sp.forEach(function (val, key) {
      if (found) return;
      if (key && String(key).toLowerCase() === "startapp") found = String(val || "").trim();
    });
    return found;
  } catch (eFor) {
    return "";
  }
}

/** Установленное PWA / standalone: для Web Share вне Telegram Mini App */
function pokerIsPwaStandaloneForShare() {
  try {
    if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) return true;
    if (window.matchMedia && window.matchMedia("(display-mode: minimal-ui)").matches) return true;
    if (window.matchMedia && window.matchMedia("(display-mode: window-controls-overlay)").matches) return true;
    if (window.navigator && window.navigator.standalone === true) return true;
    if (document.referrer && String(document.referrer).indexOf("android-app://") === 0) return true;
  } catch (e) {}
  return false;
}

/**
 * В standalone PWA без Telegram WebApp — системный диалог «Поделиться».
 * @param {{ title?: string, text?: string, url?: string }} payload
 * @returns {Promise<boolean>} true если share вызван (в т.ч. отмена пользователем); false — фолбэк на t.me/…
 */
function pokerTryPwaWebShare(payload) {
  if (!pokerIsPwaStandaloneForShare()) return Promise.resolve(false);
  if (isTelegramWebApp()) return Promise.resolve(false);
  var nav = typeof navigator !== "undefined" ? navigator : null;
  if (!nav || typeof nav.share !== "function") return Promise.resolve(false);
  payload = payload || {};
  var url = payload.url != null ? String(payload.url).trim() : "";
  var data = {};
  if (payload.title) data.title = String(payload.title);
  if (payload.text) data.text = String(payload.text);
  if (url) data.url = url;
  if (!data.text && !data.url) return Promise.resolve(false);
  try {
    if (typeof nav.canShare === "function" && !nav.canShare(data)) return Promise.resolve(false);
  } catch (eCan) {}
  return nav.share(data).then(function () {
    return true;
  }).catch(function (err) {
    if (err && err.name === "AbortError") return true;
    return false;
  });
}

/** Telegram Mini App: диалог «Поделиться» только с URL (без текста) — deep link в раздел мини‑аппа. */
function pokerOpenTelegramShareUrlOnly(url) {
  var u = url != null ? String(url).trim() : "";
  if (!u) return false;
  var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  if (!tg) return false;
  var shareUrl = "https://t.me/share/url?url=" + encodeURIComponent(u) + "&text=";
  if (typeof tg.openTelegramLink === "function") {
    tg.openTelegramLink(shareUrl);
    return true;
  }
  if (typeof tg.openLink === "function") {
    tg.openLink(shareUrl);
    return true;
  }
  return false;
}

/**
 * Диалог t.me/share/url: в query `url` должна быть полная ссылка на мини‑апп с ?startapp=…
 * Если оставить url пустым и вставить ссылку только в text — у получателя часто открывается главная, без раздела.
 */
function pokerBuildTelegramShareUrlDialog(link, textOpt) {
  var u = link != null ? String(link).trim() : "";
  if (!u) return "";
  var t = textOpt != null ? String(textOpt) : "";
  return "https://t.me/share/url?url=" + encodeURIComponent(u) + "&text=" + encodeURIComponent(t);
}

/** Copy text with a textarea fallback for older Telegram/PWA webviews. */
function pokerCopyTextToClipboard(text) {
  var value = text != null ? String(text) : "";
  if (!value) return Promise.resolve(false);
  function fallbackCopy() {
    return new Promise(function (resolve) {
      var textarea = null;
      try {
        textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.setAttribute("readonly", "readonly");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";
        var parent = document.body || document.documentElement;
        if (!parent) {
          resolve(false);
          return;
        }
        parent.appendChild(textarea);
        textarea.focus();
        textarea.select();
        if (typeof textarea.setSelectionRange === "function") textarea.setSelectionRange(0, textarea.value.length);
        var ok = typeof document.execCommand === "function" && document.execCommand("copy");
        if (textarea.parentNode) textarea.parentNode.removeChild(textarea);
        resolve(!!ok);
      } catch (eCopyFallback) {
        if (textarea && textarea.parentNode) textarea.parentNode.removeChild(textarea);
        resolve(false);
      }
    });
  }
  if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    return navigator.clipboard.writeText(value).then(function () {
      return true;
    }).catch(fallbackCopy);
  }
  return fallbackCopy();
}

/** PWA: сессия после входа через Telegram Login Widget (возврат в это же приложение) */
var POKER_PWA_TG_SESSION_KEY = "poker_pwa_tg_session";
/** PWA: сессия после OAuth ВКонтакте */
var POKER_PWA_VK_SESSION_KEY = "poker_pwa_vk_session";
/** PWA: режим «гость» (без авторизации, но можно смотреть). */
var POKER_PWA_GUEST_KEY = "poker_pwa_guest";
var POKER_PWA_GUEST_SESSION_KEY = "poker_pwa_guest_session";
var POKER_PWA_IDB_NAME = "poker_pwa_auth";
var POKER_PWA_IDB_STORE = "sessions";
var POKER_PWA_AUTH_COOKIE_MAX_AGE_SEC = 15552000;

function pokerReadAuthCookie(name) {
  try {
    var key = encodeURIComponent(name) + "=";
    var parts = String(document.cookie || "").split("; ");
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].indexOf(key) === 0) return decodeURIComponent(parts[i].slice(key.length));
    }
  } catch (e) {}
  return "";
}

function pokerWriteAuthCookie(name, value) {
  try {
    var secure = window.location && window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie =
      encodeURIComponent(name) +
      "=" +
      encodeURIComponent(String(value || "")) +
      "; Max-Age=" + POKER_PWA_AUTH_COOKIE_MAX_AGE_SEC + "; Path=/; SameSite=Lax" +
      secure;
  } catch (e) {}
}

function pokerClearAuthCookie(name) {
  try {
    var secure = window.location && window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = encodeURIComponent(name) + "=; Max-Age=0; Path=/; SameSite=Lax" + secure;
  } catch (e) {}
}

function pokerParsePwaSessionRaw(raw, requireUser) {
  if (!raw) return null;
  try {
    var o = JSON.parse(raw);
    if (!o || !o.token) return null;
    if (requireUser && (!o.user || o.user.id == null)) {
      var restoredUser = pokerBuildUserFromPwaSessionToken(o.token, o.authMethod === "vk");
      if (!restoredUser) return null;
      o.user = restoredUser;
    }
    try {
      var payload = pokerDecodePwaSessionPayload(o.token);
      if (payload && payload.rpt === true) o.adminReportAccess = true;
    } catch (eRpt) {}
    return o;
  } catch (e) {
    return null;
  }
}

function pokerDecodePwaSessionPayload(token) {
  try {
    var s = String(token || "");
    var dot = s.lastIndexOf(".");
    if (dot < 0) return null;
    var payload = s.slice(0, dot);
    var data = JSON.parse(payload);
    if (!data || data.exp == null) return null;
    if (Math.floor(Date.now() / 1000) > Number(data.exp)) return null;
    return data;
  } catch (e) {
    return null;
  }
}

function pokerBuildUserFromPwaSessionToken(token, isVk) {
  var data = pokerDecodePwaSessionPayload(token);
  if (!data) return null;
  if (isVk) {
    if (data.vid == null) return null;
    return {
      id: Number(data.vid),
      memberId: "vk_" + String(data.vid),
      username: data.dm || "",
      first_name: data.fn || "",
      last_name: data.ln || "",
      photo_url: data.ph || "",
      is_vk: true
    };
  }
  if (data.uid == null) return null;
  return {
    id: Number(data.uid),
    memberId: data.mid || ("tg_" + String(data.uid)),
    username: data.un || "",
    first_name: data.fn || "",
    last_name: data.ln || "",
    photo_url: "",
    language_code: "",
    is_premium: false
  };
}

function pokerMinimalPwaSessionCookiePayload(token, authMethod, sessionExtra) {
  var rec = { token: token };
  var method = String(authMethod || "").trim().toLowerCase();
  if (method) rec.authMethod = method;
  if (sessionExtra && sessionExtra.gazettePlannerAccess) rec.gazettePlannerAccess = true;
  if (sessionExtra && sessionExtra.adminAccess) rec.adminAccess = true;
  if (sessionExtra && sessionExtra.adminReportAccess) rec.adminReportAccess = true;
  return JSON.stringify(rec);
}

function pokerOpenPwaAuthDb() {
  return new Promise(function (resolve) {
    try {
      if (!("indexedDB" in window)) {
        resolve(null);
        return;
      }
      var req = indexedDB.open(POKER_PWA_IDB_NAME, 1);
      req.onupgradeneeded = function () {
        try {
          var db = req.result;
          if (db && !db.objectStoreNames.contains(POKER_PWA_IDB_STORE)) db.createObjectStore(POKER_PWA_IDB_STORE);
        } catch (eUpgrade) {}
      };
      req.onsuccess = function () { resolve(req.result || null); };
      req.onerror = function () { resolve(null); };
      req.onblocked = function () { resolve(null); };
    } catch (e) {
      resolve(null);
    }
  });
}

function pokerWritePwaSessionToIdb(key, payload) {
  try {
    pokerOpenPwaAuthDb().then(function (db) {
      if (!db) return;
      try {
        var tx = db.transaction(POKER_PWA_IDB_STORE, "readwrite");
        tx.objectStore(POKER_PWA_IDB_STORE).put(String(payload || ""), key);
        tx.oncomplete = tx.onerror = tx.onabort = function () {
          try { db.close(); } catch (eClose) {}
        };
      } catch (eTx) {
        try { db.close(); } catch (eClose2) {}
      }
    });
  } catch (e) {}
}

function pokerReadPwaSessionFromIdb(key) {
  return pokerOpenPwaAuthDb().then(function (db) {
    if (!db) return "";
    return new Promise(function (resolve) {
      try {
        var tx = db.transaction(POKER_PWA_IDB_STORE, "readonly");
        var req = tx.objectStore(POKER_PWA_IDB_STORE).get(key);
        req.onsuccess = function () { resolve(req.result != null ? String(req.result) : ""); };
        req.onerror = function () { resolve(""); };
        tx.oncomplete = tx.onerror = tx.onabort = function () {
          try { db.close(); } catch (eClose) {}
        };
      } catch (eTx) {
        try { db.close(); } catch (eClose2) {}
        resolve("");
      }
    });
  }).catch(function () { return ""; });
}

function pokerClearPwaSessionFromIdb(key) {
  try {
    pokerOpenPwaAuthDb().then(function (db) {
      if (!db) return;
      try {
        var tx = db.transaction(POKER_PWA_IDB_STORE, "readwrite");
        tx.objectStore(POKER_PWA_IDB_STORE).delete(key);
        tx.oncomplete = tx.onerror = tx.onabort = function () {
          try { db.close(); } catch (eClose) {}
        };
      } catch (eTx) {
        try { db.close(); } catch (eClose2) {}
      }
    });
  } catch (e) {}
}

function pokerReadPwaSessionRecordAsync(key) {
  return pokerReadPwaSessionFromIdb(key).then(function (raw) {
    return pokerParsePwaSessionRaw(raw, true);
  }).catch(function () {
    return null;
  });
}

function pokerHasStoredPwaSessionTokenRaw() {
  try {
    if (window.__pokerPwaTgSessionToken || window.__pokerPwaVkSessionToken) return true;
  } catch (eMemorySessionRaw) {}
  var keys = [POKER_PWA_TG_SESSION_KEY, POKER_PWA_VK_SESSION_KEY];
  for (var i = 0; i < keys.length; i += 1) {
    var key = keys[i];
    var o = null;
    try {
      o = pokerParsePwaSessionRaw(localStorage.getItem(key), false);
      if (o && o.token) return true;
    } catch (eLocalSessionRaw) {}
    try {
      o = pokerParsePwaSessionRaw(sessionStorage.getItem(key), false);
      if (o && o.token) return true;
    } catch (eSessionSessionRaw) {}
    try {
      o = pokerParsePwaSessionRaw(pokerReadAuthCookie(key), false);
      if (o && o.token) return true;
    } catch (eCookieSessionRaw) {}
  }
  return false;
}

function pokerReadPwaTgSessionToken() {
  try {
    if (pokerReadPwaGuestMode()) return "";
  } catch (eGuestToken) {}
  try {
    var memTok = String(window.__pokerPwaTgSessionToken || "").trim();
    if (memTok) return memTok;
  } catch (eMemoryTgToken) {}
  var o = null;
  try {
    o = pokerParsePwaSessionRaw(localStorage.getItem(POKER_PWA_TG_SESSION_KEY), false);
    if (o && o.token) return String(o.token);
  } catch (e) {}
  try {
    o = pokerParsePwaSessionRaw(sessionStorage.getItem(POKER_PWA_TG_SESSION_KEY), false);
    if (o && o.token) return String(o.token);
  } catch (e2) {}
  o = pokerParsePwaSessionRaw(pokerReadAuthCookie(POKER_PWA_TG_SESSION_KEY), false);
  return o && o.token ? String(o.token) : "";
}

function pokerReadPwaVkSessionToken() {
  try {
    if (pokerReadPwaGuestMode()) return "";
  } catch (eGuestToken) {}
  try {
    var memTok = String(window.__pokerPwaVkSessionToken || "").trim();
    if (memTok) return memTok;
  } catch (eMemoryVkToken) {}
  var o = null;
  try {
    o = pokerParsePwaSessionRaw(localStorage.getItem(POKER_PWA_VK_SESSION_KEY), false);
    if (o && o.token) return String(o.token);
  } catch (e) {}
  try {
    o = pokerParsePwaSessionRaw(sessionStorage.getItem(POKER_PWA_VK_SESSION_KEY), false);
    if (o && o.token) return String(o.token);
  } catch (e2) {}
  o = pokerParsePwaSessionRaw(pokerReadAuthCookie(POKER_PWA_VK_SESSION_KEY), false);
  return o && o.token ? String(o.token) : "";
}

function pokerMarkAdminAccess(source) {
  try {
    var auth = window.__pokerTelegramAuth || {};
    auth.adminAccess = true;
    if (!auth.status) auth.status = "verified";
    window.__pokerTelegramAuth = auth;
  } catch (eAuth) {}
  try {
    window.dispatchEvent(new CustomEvent("poker-admin-access", { detail: { source: source || "" } }));
  } catch (eAdminEvent) {}
  try {
    if (typeof window.pokerRecheckAdminFooter === "function") window.pokerRecheckAdminFooter();
  } catch (eRecheck) {}
  try {
    if (typeof window.__pokerSyncRomanTaskPlanner === "function") window.__pokerSyncRomanTaskPlanner();
  } catch (ePlanner) {}
}

try {
  window.pokerMarkAdminAccess = pokerMarkAdminAccess;
} catch (eExportAdmin) {}

function pokerSavePwaTgSession(token, userObj, sessionExtra) {
  var rec = { token: token, user: userObj };
  try {
    window.__pokerPwaTgSessionToken = String(token || "");
    window.__pokerPwaVkSessionToken = "";
  } catch (eMemorySaveTg) {}
  if (sessionExtra && sessionExtra.gazettePlannerAccess) rec.gazettePlannerAccess = true;
  if (sessionExtra && sessionExtra.adminAccess) rec.adminAccess = true;
  if (sessionExtra && sessionExtra.adminReportAccess) rec.adminReportAccess = true;
  if (sessionExtra && sessionExtra.authMethod) rec.authMethod = String(sessionExtra.authMethod).trim().toLowerCase();
  var payload = JSON.stringify(rec);
  var ok = false;
  pokerWriteAuthCookie(POKER_PWA_TG_SESSION_KEY, pokerMinimalPwaSessionCookiePayload(token, rec.authMethod || "telegram", sessionExtra));
  pokerClearAuthCookie(POKER_PWA_VK_SESSION_KEY);
  pokerWritePwaSessionToIdb(POKER_PWA_TG_SESSION_KEY, payload);
  pokerClearPwaSessionFromIdb(POKER_PWA_VK_SESSION_KEY);
  try {
    localStorage.removeItem(POKER_PWA_VK_SESSION_KEY);
    localStorage.setItem(POKER_PWA_TG_SESSION_KEY, payload);
    ok = !!pokerReadPwaTgSessionToken();
    if (ok) {
      try {
        sessionStorage.removeItem(POKER_PWA_TG_SESSION_KEY);
      } catch (eCl) {}
    }
  } catch (e) {}
  if (!ok) {
    try {
      sessionStorage.removeItem(POKER_PWA_VK_SESSION_KEY);
      sessionStorage.setItem(POKER_PWA_TG_SESSION_KEY, payload);
      ok = !!pokerReadPwaTgSessionToken();
    } catch (e2) {}
  }
  return ok;
}

function pokerSavePwaVkSession(token, userObj) {
  var payload = JSON.stringify({ token: token, user: userObj, authMethod: "vk" });
  var ok = false;
  try {
    window.__pokerPwaVkSessionToken = String(token || "");
    window.__pokerPwaTgSessionToken = "";
  } catch (eMemorySaveVk) {}
  pokerWriteAuthCookie(POKER_PWA_VK_SESSION_KEY, pokerMinimalPwaSessionCookiePayload(token, "vk"));
  pokerClearAuthCookie(POKER_PWA_TG_SESSION_KEY);
  pokerWritePwaSessionToIdb(POKER_PWA_VK_SESSION_KEY, payload);
  pokerClearPwaSessionFromIdb(POKER_PWA_TG_SESSION_KEY);
  try {
    localStorage.removeItem(POKER_PWA_TG_SESSION_KEY);
    localStorage.setItem(POKER_PWA_VK_SESSION_KEY, payload);
    ok = !!pokerReadPwaVkSessionToken();
    if (ok) {
      try {
        sessionStorage.removeItem(POKER_PWA_VK_SESSION_KEY);
      } catch (eCl2) {}
    }
  } catch (e) {}
  if (!ok) {
    try {
      sessionStorage.removeItem(POKER_PWA_TG_SESSION_KEY);
      sessionStorage.setItem(POKER_PWA_VK_SESSION_KEY, payload);
      ok = !!pokerReadPwaVkSessionToken();
    } catch (e2) {}
  }
  return ok;
}

function pokerClearPwaAuthSessions() {
  try {
    window.__pokerPwaTgSessionToken = "";
    window.__pokerPwaVkSessionToken = "";
  } catch (eMemoryClear) {}
  try {
    localStorage.removeItem(POKER_PWA_TG_SESSION_KEY);
    localStorage.removeItem(POKER_PWA_VK_SESSION_KEY);
  } catch (eLocalClear) {}
  try {
    sessionStorage.removeItem(POKER_PWA_TG_SESSION_KEY);
    sessionStorage.removeItem(POKER_PWA_VK_SESSION_KEY);
  } catch (eSessionClear) {}
  try {
    pokerClearAuthCookie(POKER_PWA_TG_SESSION_KEY);
    pokerClearAuthCookie(POKER_PWA_VK_SESSION_KEY);
  } catch (eCookieClear) {}
  try {
    pokerClearPwaSessionFromIdb(POKER_PWA_TG_SESSION_KEY);
    pokerClearPwaSessionFromIdb(POKER_PWA_VK_SESSION_KEY);
  } catch (eIdbClear) {}
  try {
    pokerSetAuthMethod("");
  } catch (eMethodClear) {}
}

/** Полная запись сессии TG для восстановления при старте (localStorage и, при откате save, sessionStorage). */
function pokerReadPwaTgSessionRecord() {
  try {
    var oL = pokerParsePwaSessionRaw(localStorage.getItem(POKER_PWA_TG_SESSION_KEY), true);
    if (oL) return oL;
  } catch (e1) {}
  try {
    var oS = pokerParsePwaSessionRaw(sessionStorage.getItem(POKER_PWA_TG_SESSION_KEY), true);
    if (oS) return oS;
  } catch (e2) {}
  return pokerParsePwaSessionRaw(pokerReadAuthCookie(POKER_PWA_TG_SESSION_KEY), true);
}
function pokerReadPwaVkSessionRecord() {
  try {
    var oL = pokerParsePwaSessionRaw(localStorage.getItem(POKER_PWA_VK_SESSION_KEY), true);
    if (oL) return oL;
  } catch (e1) {}
  try {
    var oS = pokerParsePwaSessionRaw(sessionStorage.getItem(POKER_PWA_VK_SESSION_KEY), true);
    if (oS) return oS;
  } catch (e2) {}
  return pokerParsePwaSessionRaw(pokerReadAuthCookie(POKER_PWA_VK_SESSION_KEY), true);
}

function pwaSessionPersistenceWarning() {
  // Аккуратный баннер вместо alert: не блокирует интерфейс и не раздражает.
  var msg =
    "Не удалось сохранить вход на устройстве. " +
    "Обычно браузер запрещает хранение данных (приватный режим / ограничения Safari). " +
    "Вход будет действовать только до закрытия приложения.";
  try {
    // В PWA standalone показываем внутри экрана входа.
    if (typeof isPwaStandaloneAuth === "function" && isPwaStandaloneAuth()) {
      var screen = document.getElementById("pwaAuthScreen");
      var inner = screen ? screen.querySelector(".pwa-auth-screen__inner") : null;
      if (inner) {
        var el = inner.querySelector(".pwa-auth-screen__notice");
        if (!el) {
          el = document.createElement("div");
          el.className = "pwa-auth-screen__notice";
          el.setAttribute("role", "status");
          el.setAttribute("aria-live", "polite");
          inner.appendChild(el);
        }
        el.textContent = msg;
        return;
      }
    }
  } catch (e1) {}
  try {
    // В обычном режиме используем существующий hint в auth banner.
    var hintEl = document.getElementById("authBannerHint");
    if (hintEl) {
      hintEl.textContent = msg;
      hintEl.style.display = "block";
      return;
    }
  } catch (e2) {}
}

/** Режим гостя только на время сессии вкладки (без записи в localStorage). */
function pokerHasVerifiedAuthContextForGuestMode() {
  try {
    if (pokerHasStoredPwaSessionTokenRaw()) return true;
  } catch (eStoredAuthContext) {}
  try {
    var tg0 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (tg0 && tg0.initData && String(tg0.initData).trim()) return true;
  } catch (eInitDataAuthContext) {}
  try {
    var auth = window.__pokerTelegramAuth;
    if (
      auth &&
      auth.user &&
      auth.status &&
      auth.status !== "guest" &&
      (auth.user.id != null || auth.user.memberId || auth.user.email)
    ) {
      return true;
    }
  } catch (eVerifiedAuthContext) {}
  return false;
}

function pokerReadPwaGuestMode() {
  try {
    if (pokerHasVerifiedAuthContextForGuestMode()) {
      pokerSavePwaGuestMode(false);
      return false;
    }
    try {
      if (sessionStorage.getItem(POKER_PWA_GUEST_SESSION_KEY) === "1") {
        window.__pokerTelegramAuth = { status: "guest", user: null, error: null };
        return true;
      }
    } catch (eSessionGuestReadEarly) {}
    var resolvedUser =
      typeof getPokerResolvedTelegramUser === "function"
        ? getPokerResolvedTelegramUser()
        : null;
    if (
      resolvedUser &&
      ((resolvedUser.username && String(resolvedUser.username).trim()) ||
        (resolvedUser.first_name && String(resolvedUser.first_name).trim()) ||
        (resolvedUser.last_name && String(resolvedUser.last_name).trim()))
    ) {
      try {
        var authResolved = window.__pokerTelegramAuth;
        if (authResolved && authResolved.status === "guest") {
          window.__pokerTelegramAuth = {
            status: "verified",
            user: resolvedUser,
            error: null
          };
        }
      } catch (eUpgradeGuest) {}
      return false;
    }
    var auth = window.__pokerTelegramAuth;
    if (auth && auth.status === "guest") return true;
    return false;
  } catch (e) {
    return false;
  }
}

/** false — сбросить гостя; true — запомнить гостя до закрытия вкладки/PWA-сессии. */
function pokerSavePwaGuestMode(v) {
  if (v) {
    try {
      pokerClearPwaAuthSessions();
    } catch (eClearSessions) {}
    try {
      sessionStorage.setItem(POKER_PWA_GUEST_SESSION_KEY, "1");
    } catch (eGuestSession) {}
    try {
      window.__pokerTelegramAuth = { status: "guest", user: null, error: null };
    } catch (eGuestAuth) {}
    try {
      delete window.__pokerChatDisplayName;
    } catch (eGuestName) {
      try {
        window.__pokerChatDisplayName = "";
      } catch (eGuestNameSet) {}
    }
  } else {
    try {
      sessionStorage.removeItem(POKER_PWA_GUEST_SESSION_KEY);
    } catch (eGuestSessionClear) {}
  }
  try {
    if (!v) localStorage.removeItem(POKER_PWA_GUEST_KEY);
  } catch (e2) {}
}

function pokerHasLiveTelegramWebViewTransport() {
  try {
    if (typeof window.TelegramWebviewProxy !== "undefined") return true;
    if (window.external && "notify" in window.external) return true;
    if (window.parent && window.parent !== window) return true;
  } catch (eTgTransport) {}
  return false;
}

function pokerCurrentUrlHasTelegramInitData() {
  try {
    var raw = String(window.location.hash || "") + "&" + String(window.location.search || "");
    return raw.indexOf("tgWebAppData=") !== -1 || raw.indexOf("tgWebAppData%3D") !== -1;
  } catch (eTgUrl) {
    return false;
  }
}

function pokerShouldPreferSavedPwaAuth(tg0) {
  if (!tg0 || !tg0.initData) return false;
  if (!pokerReadPwaTgSessionToken() && !pokerReadPwaVkSessionToken()) return false;
  try {
    if (typeof pokerIsPwaDisplayStandalone === "function" && pokerIsPwaDisplayStandalone()) return true;
  } catch (ePwaStandalone) {}
  return !pokerHasLiveTelegramWebViewTransport() && !pokerCurrentUrlHasTelegramInitData();
}

/** Для запросов к API: Mini App — initData; PWA — pwaSession (Telegram) или pwaVkSession (ВКонтакте) */
function pokerApiAuthQuery(lead) {
  try {
    if (pokerReadPwaGuestMode()) return lead + "initData=";
  } catch (eGuestQuery) {}
  var tok = pokerReadPwaTgSessionToken();
  var vkt = pokerReadPwaVkSessionToken();
  try {
    if (typeof pokerIsPwaDisplayStandalone === "function" && pokerIsPwaDisplayStandalone()) {
      if (tok) return lead + "pwaSession=" + encodeURIComponent(tok);
      if (vkt) return lead + "pwaVkSession=" + encodeURIComponent(vkt);
    }
  } catch (eQ) {}
  var tg0 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  if (pokerShouldPreferSavedPwaAuth(tg0)) {
    if (tok) return lead + "pwaSession=" + encodeURIComponent(tok);
    if (vkt) return lead + "pwaVkSession=" + encodeURIComponent(vkt);
  }
  if (tg0 && tg0.initData) return lead + "initData=" + encodeURIComponent(tg0.initData);
  if (tok) return lead + "pwaSession=" + encodeURIComponent(tok);
  if (vkt) return lead + "pwaVkSession=" + encodeURIComponent(vkt);
  return lead + "initData=";
}

/** URL для <img> в чате. Vercel Blob: в Mini App прямой HTTPS (прокси с initData раздувает URL); в PWA standalone прямой URL часто не грузится — короткий pwaSession/pwaVkSession в /api/chat-image. */
function pokerChatDisplayImageSrc(raw) {
  if (raw == null || raw === "") return raw;
  var s = String(raw).trim();
  if (s.indexOf("data:") === 0) return s;
  if (s.indexOf("http://") !== 0 && s.indexOf("https://") !== 0) return s;
  var hostname = "";
  try {
    hostname = new URL(s).hostname || "";
  } catch (e) {
    return s;
  }
  if (!/blob\.vercel-storage\.com$/i.test(hostname)) return s;
  /*
   * Прокси /api/chat-image: в PWA прямой blob URL часто 403/пусто в <img>.
   * Важно: pokerApiAuthQuery("?") даёт «?pwaSession=…» — второй параметр только с «&src=», иначе получается
   * «?pwaSession=TOKENsrc=…», сервер не авторизует и не находит src — картинки «пропадают» после перезахода.
   * Прокси включаем для любой сохранённой pwaSession/pwaVkSession (не только display-mode: standalone).
   */
  try {
    var apb = typeof getApiBase === "function" ? getApiBase() : "";
    if (!apb) return s;
    var authQs = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("") : "";
    if (!authQs) return s;
    var pwaAuth =
      authQs.indexOf("pwaSession=") === 0 ||
      authQs.indexOf("pwaVkSession=") === 0;
    if (!pwaAuth) {
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData) return s;
      return s;
    }
    return apb + "/api/chat-image?" + authQs + "&src=" + encodeURIComponent(s);
  } catch (ePwaImg) {}
  return s;
}

function pokerApiAuthJsonBody(extra) {
  var o = Object.assign({}, extra || {});
  try {
    if (pokerReadPwaGuestMode()) {
      delete o.initData;
      delete o.pwaSession;
      delete o.pwaVkSession;
      return o;
    }
  } catch (eGuestBody) {}
  var tg0 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  var tok = pokerReadPwaTgSessionToken();
  var vkt = pokerReadPwaVkSessionToken();
  /** PWA с «Домой»: при сохранённой pwaSession не шлём initData из скрипта WebApp — иначе на сервере раньше брался чужой tg id и пуш писался не в тот Redis-ключ, что чат. */
  try {
    if (typeof pokerIsPwaDisplayStandalone === "function" && pokerIsPwaDisplayStandalone()) {
      if (tok) {
        o.pwaSession = tok;
        delete o.initData;
        delete o.pwaVkSession;
        return o;
      }
      if (vkt) {
        o.pwaVkSession = vkt;
        delete o.initData;
        delete o.pwaSession;
        return o;
      }
    }
  } catch (ePwaBody) {}
  if (pokerShouldPreferSavedPwaAuth(tg0)) {
    if (tok) {
      o.pwaSession = tok;
      delete o.initData;
      delete o.pwaVkSession;
      return o;
    }
    if (vkt) {
      o.pwaVkSession = vkt;
      delete o.initData;
      delete o.pwaSession;
      return o;
    }
  }
  if (tg0 && tg0.initData) {
    o.initData = tg0.initData;
    delete o.pwaSession;
    delete o.pwaVkSession;
  } else {
    if (tok) {
      o.pwaSession = tok;
      delete o.initData;
      delete o.pwaVkSession;
    } else {
      if (vkt) {
        o.pwaVkSession = vkt;
        delete o.initData;
        delete o.pwaSession;
      } else {
        delete o.pwaSession;
        delete o.pwaVkSession;
      }
    }
  }
  return o;
}

/** Тот же salt, что lib/guest-member-id.js */
var POKER_GUEST_DEVICE_SALT = "poker_guest_device:";
function pokerGetRaffleStableDeviceId() {
  try {
    var key = "poker_raffle_device_id";
    var id = typeof localStorage !== "undefined" && localStorage.getItem(key);
    if (!id) {
      id = "dev_" + Date.now() + "_" + Math.random().toString(36).slice(2, 14);
      if (typeof localStorage !== "undefined") localStorage.setItem(key, id);
    }
    return id;
  } catch (e) {
    return "";
  }
}
function pokerComputeGuestMemberId(deviceId) {
  if (!deviceId || String(deviceId).length < 8) return Promise.resolve(null);
  if (typeof crypto === "undefined" || !crypto.subtle || !crypto.subtle.digest) return Promise.resolve(null);
  var enc = new TextEncoder();
  return crypto.subtle.digest("SHA-256", enc.encode(POKER_GUEST_DEVICE_SALT + String(deviceId))).then(function (buf) {
    var hex = Array.from(new Uint8Array(buf))
      .map(function (b) {
        return ("0" + b.toString(16)).slice(-2);
      })
      .join("");
    return "guest_" + hex.slice(0, 20);
  });
}
/** Query для API: auth (initData / pwaSession / pwaVkSession) + guestDeviceId как запасной ключ на сервере, если подпись initData не прошла */
function pokerRafflesApiQueryLeading() {
  var q = pokerApiAuthQuery("?");
  var dev = pokerGetRaffleStableDeviceId();
  if (dev && dev.length >= 8) {
    if (q === "?") return "?guestDeviceId=" + encodeURIComponent(dev);
    return q + "&guestDeviceId=" + encodeURIComponent(dev);
  }
  return q;
}
function pokerGuestOrAuthedPostBody(extra) {
  var o = pokerApiAuthJsonBody(extra || {});
  var dev = pokerGetRaffleStableDeviceId();
  if (dev && dev.length >= 8) o.guestDeviceId = dev;
  return o;
}
function pokerCanSyncGuestProfileToServer() {
  var dev = pokerGetRaffleStableDeviceId();
  return !!(dev && dev.length >= 8);
}

function pokerApiHasCredential() {
  try {
    if (pokerReadPwaGuestMode()) return false;
  } catch (eGuestCred) {}
  var tg0 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  return !!(tg0 && tg0.initData) || !!pokerReadPwaTgSessionToken() || !!pokerReadPwaVkSessionToken();
}

function pokerSetHomeAuthResolved(value) {
  try {
    window.__pokerHomeAuthResolved = value === true;
  } catch (e) {}
}

var POKER_LAST_MEMBER_ID_KEY = "poker_last_member_id";
var POKER_AUTH_METHOD_KEY = "poker_auth_method";
var POKER_AUTH_PASSWORD_KEY = "poker_auth_password";
var POKER_AUTH_PASSWORD_REMEMBER_KEY = "poker_auth_password_remember";
function pokerRememberLastMemberId(memberId) {
  try {
    var v = String(memberId || "").trim();
    if (!v) return;
    if (!(v.indexOf("tg_") === 0 || v.indexOf("vk_") === 0)) return;
    localStorage.setItem(POKER_LAST_MEMBER_ID_KEY, v);
  } catch (e) {}
}
function pokerReadLastMemberIdHint() {
  try {
    var v = localStorage.getItem(POKER_LAST_MEMBER_ID_KEY);
    v = String(v || "").trim();
    return v.indexOf("tg_") === 0 || v.indexOf("vk_") === 0 ? v : "";
  } catch (e) {
    return "";
  }
}
function pokerSetAuthMethod(method) {
  try {
    var v = String(method || "").trim().toLowerCase();
    if (!v) localStorage.removeItem(POKER_AUTH_METHOD_KEY);
    else localStorage.setItem(POKER_AUTH_METHOD_KEY, v);
  } catch (e) {}
}
function pokerGetAuthMethod() {
  try {
    return String(localStorage.getItem(POKER_AUTH_METHOD_KEY) || "").trim().toLowerCase();
  } catch (e) {
    return "";
  }
}
function pokerReadSavedPassword() {
  try {
    return String(localStorage.getItem(POKER_AUTH_PASSWORD_KEY) || "");
  } catch (e) {
    return "";
  }
}
function pokerShouldRememberPassword() {
  try {
    return String(localStorage.getItem(POKER_AUTH_PASSWORD_REMEMBER_KEY) || "") === "1";
  } catch (e) {
    return false;
  }
}
function pokerPersistPasswordPreference(password, remember) {
  try {
    if (!remember) {
      localStorage.removeItem(POKER_AUTH_PASSWORD_KEY);
      localStorage.setItem(POKER_AUTH_PASSWORD_REMEMBER_KEY, "0");
      return;
    }
    localStorage.setItem(POKER_AUTH_PASSWORD_KEY, String(password || ""));
    localStorage.setItem(POKER_AUTH_PASSWORD_REMEMBER_KEY, "1");
  } catch (e) {}
}
