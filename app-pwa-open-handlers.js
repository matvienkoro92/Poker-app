(function initPwaInstall() {
  var btn = document.getElementById("pwaInstallBtn");
  if (!btn) return;
  var installPrompt = null;
  function isTelegramMini() {
    return !!(window.Telegram && window.Telegram.WebApp);
  }
  function isStandalone() {
    return window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true ||
      document.referrer.indexOf("android-app://") === 0;
  }
  function isIos() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  }
  function getAppUrl() {
    return getAppBaseUrlForLinks();
  }
  function copyShareLink() {
    var link = getAppUrl();
    if (typeof navigator.clipboard !== "undefined" && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(link).then(function () { return true; }).catch(function () { return false; });
    }
    return Promise.resolve(false);
  }
  function nativeShare() {
    if (typeof navigator.share !== "function") return Promise.resolve(false);
    var link = getAppUrl();
    return navigator.share({
      title: "Клуб Два туза — Poker Club",
      text: "Присоединяйся к покерному клубу «Два туза»",
      url: link
    }).then(function () { return true; }).catch(function () { return false; });
  }
  function showMsg(msg) {
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (tg && tg.showAlert) tg.showAlert(msg); else alert(msg);
  }
  function isWebsiteShareMode() {
    return !isStandalone() && !(window.Telegram && window.Telegram.WebApp);
  }
  function syncPwaInstallBtnVisibility() {
    if (isTelegramMini()) {
      btn.hidden = true;
      return;
    }
    if (isStandalone()) {
      btn.hidden = true;
      return;
    }
    if (installPrompt || isIos() || (typeof navigator.share === "function")) {
      btn.hidden = false;
      return;
    }
    btn.hidden = true;
  }
  if (isStandalone()) return;
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    installPrompt = e;
    syncPwaInstallBtnVisibility();
  });
  syncPwaInstallBtnVisibility();
  btn.addEventListener("click", function () {
    if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
    function doShareAndCopy() {
      return copyShareLink().then(function () { return nativeShare(); });
    }
    if (isWebsiteShareMode()) {
      doShareAndCopy().then(function (shared) {
        if (shared) showMsg("Поделились!");
        else {
          copyShareLink().then(function (ok) {
            if (ok) showMsg("Ссылка скопирована. Отправьте другу.");
            else showMsg("Не удалось открыть меню «Поделиться».");
          });
        }
      });
      return;
    }
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then(function (r) {
        if (r.outcome === "accepted") installPrompt = null;
        doShareAndCopy().then(function (shared) {
          if (shared) showMsg("Поделились!");
          else showMsg("Ссылка скопирована. Отправьте другу.");
        });
      });
      return;
    }
    doShareAndCopy().then(function (shared) {
      if (shared) {
        showMsg("Поделились! Для добавления на экран: Safari → Поделиться → На экран Домой.");
        return;
      }
      copyShareLink().then(function (ok) {
        if (ok) {
          if (isIos()) showMsg("Ссылка скопирована. Добавить на экран: нажмите кнопку «Поделиться» в Safari (внизу экрана) → прокрутите вниз → «На экран Домой».");
          else showMsg("Ссылка скопирована. Отправьте другу. Chrome: меню → Установить.");
        } else {
          if (isIos()) showMsg("Добавить на экран: нажмите кнопку «Поделиться» в Safari (внизу экрана) → прокрутите вниз → «На экран Домой».");
          else showMsg("Chrome или Edge: меню → Установить.");
        }
      });
    });
  });
})();

window.addEventListener("poker-telegram-auth", function (ev) {
  try {
    var d = ev && ev.detail;
    if (!d || !d.verified) return;
    try {
      pokerRememberTransportMemberIdFromEnvironment();
    } catch (eAuthRememberEnv) {}
    if (typeof updateProfileUserName === "function") updateProfileUserName();
    if (typeof updateProfileUserMeta === "function") updateProfileUserMeta();
    if (typeof updateProfileDtId === "function") updateProfileDtId();
    try {
      if (typeof loadProfileDebugInfo === "function") loadProfileDebugInfo();
    } catch (eAuthDebug) {}
    try {
      if (typeof pokerHydrateChatSnapshotsFromDisk === "function") {
        pokerHydrateChatSnapshotsFromDisk();
      }
    } catch (eChatHydAuth) {}
    try {
      if (typeof window.__pokerScheduleChatBootstrapFetch === "function") {
        window.__pokerScheduleChatBootstrapFetch();
      }
    } catch (eChatBootAuth) {}
    try {
      if (typeof loadContacts === "function") loadContacts();
    } catch (eChatContactsAuth) {}
    try {
      if (typeof loadGeneral === "function") loadGeneral();
    } catch (eChatGeneralAuth) {}
    if (typeof window.chatRefresh === "function") window.chatRefresh();
    if (typeof window.pokerRecheckAdminFooter === "function") window.pokerRecheckAdminFooter();
    if (typeof pokerMaybeAutoEnrollChatPush === "function") pokerMaybeAutoEnrollChatPush();
    if (window.__pendingOpenChatPersonalFromDeepLink && typeof window.__pokerOpenChatFromPushUrl === "function") {
      pokerPushOpenDebug("auth-verified-retry", window.__pendingOpenChatPersonalFromDeepLink.userId || "");
      try {
        if (typeof setView === "function") setView("chat");
      } catch (eAuthPushView) {}
      setTimeout(function () {
        try {
          if (window.__pendingOpenChatPersonalFromDeepLink) {
            if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function") {
              window.__pokerEnsureOpenPendingChatPersonalFromDeepLink();
            }
          }
        } catch (eAuthPushOpen1) {}
      }, 60);
      setTimeout(function () {
        try {
          if (window.__pendingOpenChatPersonalFromDeepLink) {
            if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function") {
              window.__pokerEnsureOpenPendingChatPersonalFromDeepLink();
            }
          }
        } catch (eAuthPushOpen2) {}
      }, 420);
    }
  } catch (eVis) {}
});

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState !== "visible") return;
  setTimeout(function () {
    try {
      if (typeof pokerChatPushSyncIfNeeded === "function") pokerChatPushSyncIfNeeded();
    } catch (eVis2) {}
    try {
      var pwaFg =
        typeof window !== "undefined" &&
        ((window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
          window.navigator.standalone === true);
      if (pwaFg && typeof window.__pokerRefreshChatUnreadForPwaBadge === "function") {
        window.__pokerRefreshChatUnreadForPwaBadge();
      }
    } catch (ePwaFgUnread) {}
  }, 500);
});
