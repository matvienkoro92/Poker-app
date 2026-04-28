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
    if (window.Telegram && window.Telegram.WebApp) return true;
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

/** PWA: сессия после входа через Telegram Login Widget (возврат в это же приложение) */
var POKER_PWA_TG_SESSION_KEY = "poker_pwa_tg_session";
/** PWA: сессия после OAuth ВКонтакте */
var POKER_PWA_VK_SESSION_KEY = "poker_pwa_vk_session";
/** PWA: режим «гость» (без авторизации, но можно смотреть). */
var POKER_PWA_GUEST_KEY = "poker_pwa_guest";

function pokerReadPwaTgSessionToken() {
  try {
    var raw = localStorage.getItem(POKER_PWA_TG_SESSION_KEY);
    if (!raw) return "";
    var o = JSON.parse(raw);
    return o && o.token ? String(o.token) : "";
  } catch (e) {
    // Падение localStorage (например, приватный режим / запрет хранения).
    try {
      var rawS = sessionStorage.getItem(POKER_PWA_TG_SESSION_KEY);
      if (!rawS) return "";
      var oS = JSON.parse(rawS);
      return oS && oS.token ? String(oS.token) : "";
    } catch (e2) {
      return "";
    }
  }
}

function pokerReadPwaVkSessionToken() {
  try {
    var raw = localStorage.getItem(POKER_PWA_VK_SESSION_KEY);
    if (!raw) return "";
    var o = JSON.parse(raw);
    return o && o.token ? String(o.token) : "";
  } catch (e) {
    try {
      var rawS = sessionStorage.getItem(POKER_PWA_VK_SESSION_KEY);
      if (!rawS) return "";
      var oS = JSON.parse(rawS);
      return oS && oS.token ? String(oS.token) : "";
    } catch (e2) {
      return "";
    }
  }
}

function pokerSavePwaTgSession(token, userObj, sessionExtra) {
  var rec = { token: token, user: userObj };
  if (sessionExtra && sessionExtra.gazettePlannerAccess) rec.gazettePlannerAccess = true;
  if (sessionExtra && sessionExtra.authMethod) rec.authMethod = String(sessionExtra.authMethod).trim().toLowerCase();
  var payload = JSON.stringify(rec);
  var ok = false;
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
  var payload = JSON.stringify({ token: token, user: userObj, authMethod: "telegram" });
  var ok = false;
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

/** Полная запись сессии TG для восстановления при старте (localStorage и, при откате save, sessionStorage). */
function pokerReadPwaTgSessionRecord() {
  function parseRaw(raw) {
    if (!raw) return null;
    try {
      var o = JSON.parse(raw);
      if (o && o.token && o.user && o.user.id != null) return o;
    } catch (eP) {}
    return null;
  }
  try {
    var oL = parseRaw(localStorage.getItem(POKER_PWA_TG_SESSION_KEY));
    if (oL) return oL;
  } catch (e1) {}
  try {
    return parseRaw(sessionStorage.getItem(POKER_PWA_TG_SESSION_KEY));
  } catch (e2) {}
  return null;
}
function pokerReadPwaVkSessionRecord() {
  function parseRaw(raw) {
    if (!raw) return null;
    try {
      var o = JSON.parse(raw);
      if (o && o.token && o.user && o.user.id != null) return o;
    } catch (eP) {}
    return null;
  }
  try {
    var oL = parseRaw(localStorage.getItem(POKER_PWA_VK_SESSION_KEY));
    if (oL) return oL;
  } catch (e1) {}
  try {
    return parseRaw(sessionStorage.getItem(POKER_PWA_VK_SESSION_KEY));
  } catch (e2) {}
  return null;
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

/** Режим гостя только на время сессии вкладки (без записи в storage). */
function pokerReadPwaGuestMode() {
  try {
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
    return !!(auth && auth.status === "guest");
  } catch (e) {
    return false;
  }
}

/** false — сбросить устаревший флаг в localStorage (раньше гость сохранялся там). */
function pokerSavePwaGuestMode(v) {
  try {
    if (!v) localStorage.removeItem(POKER_PWA_GUEST_KEY);
  } catch (e) {}
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
