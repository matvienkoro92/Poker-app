(function () {
  "use strict";

  function $(id) {
    return document.getElementById(id);
  }

  function safeCall(fn, fallback) {
    try {
      return fn();
    } catch (e) {
      return fallback;
    }
  }

  function summarizeRaw(raw) {
    if (!raw) return { present: false, length: 0 };
    var s = String(raw);
    return {
      present: true,
      length: s.length,
      preview: s.slice(0, 80),
    };
  }

  function readStorage(storage, key) {
    return safeCall(function () {
      return summarizeRaw(storage && storage.getItem ? storage.getItem(key) : "");
    }, { present: false, error: "blocked" });
  }

  function readCookie(name) {
    return safeCall(function () {
      if (typeof pokerReadAuthCookie === "function") return summarizeRaw(pokerReadAuthCookie(name));
      var prefix = encodeURIComponent(name) + "=";
      var parts = String(document.cookie || "").split(/;\s*/);
      for (var i = 0; i < parts.length; i += 1) {
        if (parts[i].indexOf(prefix) === 0) return summarizeRaw(decodeURIComponent(parts[i].slice(prefix.length)));
      }
      return summarizeRaw("");
    }, { present: false, error: "blocked" });
  }

  function readIdb(key) {
    if (typeof pokerReadPwaSessionRecordAsync !== "function") return Promise.resolve({ available: false });
    return pokerReadPwaSessionRecordAsync(key)
      .then(function (record) {
        return {
          available: true,
          present: !!(record && record.token),
          userId: record && record.user ? record.user.id || null : null,
          authMethod: record && record.authMethod ? record.authMethod : null,
          hasGazettePlannerAccess: !!(record && record.gazettePlannerAccess),
        };
      })
      .catch(function (err) {
        return { available: true, error: err && err.message ? err.message : "read_failed" };
      });
  }

  function collectAuthDebug() {
    var tgKey = typeof POKER_PWA_TG_SESSION_KEY !== "undefined" ? POKER_PWA_TG_SESSION_KEY : "poker_pwa_tg_session";
    var vkKey = typeof POKER_PWA_VK_SESSION_KEY !== "undefined" ? POKER_PWA_VK_SESSION_KEY : "poker_pwa_vk_session";
    var tg = safeCall(function () {
      return window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    }, null);
    var auth = safeCall(function () {
      return window.__pokerTelegramAuth || null;
    }, null);
    return Promise.all([readIdb(tgKey), readIdb(vkKey)]).then(function (idb) {
      return {
        at: new Date().toISOString(),
        url: safeCall(function () { return window.location.href; }, ""),
        appVersion: safeCall(function () { return document.documentElement.getAttribute("data-app-version"); }, null),
        display: {
          standaloneBoot: window.__pokerDisplayStandaloneBoot === true,
          matchStandalone: safeCall(function () { return !!(window.matchMedia && window.matchMedia("(display-mode: standalone)").matches); }, false),
          navigatorStandalone: safeCall(function () { return !!(window.navigator && window.navigator.standalone); }, false),
        },
        telegram: {
          hasWebApp: !!tg,
          platform: tg && tg.platform ? tg.platform : null,
          version: tg && tg.version ? tg.version : null,
          initData: summarizeRaw(tg && tg.initData ? tg.initData : ""),
          unsafeUserId: tg && tg.initDataUnsafe && tg.initDataUnsafe.user ? tg.initDataUnsafe.user.id || null : null,
          unsafeUsername: tg && tg.initDataUnsafe && tg.initDataUnsafe.user ? tg.initDataUnsafe.user.username || null : null,
        },
        authState: {
          status: auth && auth.status ? auth.status : null,
          userId: auth && auth.user ? auth.user.id || null : null,
          username: auth && auth.user ? auth.user.username || null : null,
          error: auth && auth.error ? auth.error : null,
        },
        pwaSessions: {
          telegram: {
            token: summarizeRaw(typeof pokerReadPwaTgSessionToken === "function" ? pokerReadPwaTgSessionToken() : ""),
            localStorage: readStorage(window.localStorage, tgKey),
            sessionStorage: readStorage(window.sessionStorage, tgKey),
            cookie: readCookie(tgKey),
            indexedDb: idb[0],
          },
          vk: {
            token: summarizeRaw(typeof pokerReadPwaVkSessionToken === "function" ? pokerReadPwaVkSessionToken() : ""),
            localStorage: readStorage(window.localStorage, vkKey),
            sessionStorage: readStorage(window.sessionStorage, vkKey),
            cookie: readCookie(vkKey),
            indexedDb: idb[1],
          },
        },
      };
    });
  }

  function setOpen(open) {
    var modal = $("adminAuthDebugModal");
    if (!modal) return;
    modal.setAttribute("aria-hidden", open ? "false" : "true");
    if (open) refresh();
  }

  function refresh() {
    var output = $("adminAuthDebugOutput");
    if (output) output.textContent = "Загрузка…";
    collectAuthDebug().then(function (data) {
      if (output) output.textContent = JSON.stringify(data, null, 2);
    });
  }

  function copyDebug() {
    var output = $("adminAuthDebugOutput");
    var text = output ? output.textContent || "" : "";
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).catch(function () {});
  }

  function bind() {
    var btn = $("adminAuthDebugBtn");
    if (!btn) return;
    if (btn.dataset.authDebugBound === "1") return;
    btn.dataset.authDebugBound = "1";
    btn.addEventListener("click", function () { setOpen(true); });
    var closeBtn = $("adminAuthDebugModalClose");
    var backdrop = $("adminAuthDebugModalBackdrop");
    var refreshBtn = $("adminAuthDebugRefreshBtn");
    var copyBtn = $("adminAuthDebugCopyBtn");
    if (closeBtn) closeBtn.addEventListener("click", function () { setOpen(false); });
    if (backdrop) backdrop.addEventListener("click", function () { setOpen(false); });
    if (refreshBtn) refreshBtn.addEventListener("click", refresh);
    if (copyBtn) copyBtn.addEventListener("click", copyDebug);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
  window.pokerInitAuthDebugModal = bind;
  window.__pokerCollectAuthDebug = collectAuthDebug;
})();
