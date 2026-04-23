(function initPwaServiceWorkerGlobal() {
  if (!("serviceWorker" in navigator)) return;
  try {
    navigator.serviceWorker.addEventListener("message", function (ev) {
      var d = ev.data;
      if (!d) return;
      if (d.pokerChatPushSound) {
        var url = d.url || "";
        if (url) {
          try {
            var a = new Audio(url);
            a.volume = typeof d.volume === "number" ? d.volume : 0.88;
            var p = a.play();
            if (p && typeof p.catch === "function") p.catch(function () {});
          } catch (ePlay) {}
        }
      }
      if (d.pokerChatPushEvent && typeof window.__pokerHandleIncomingChatPush === "function") {
        try {
          window.__pokerHandleIncomingChatPush(d);
        } catch (ePushUi) {}
      }
      if (d.pokerChatOpenUrl && typeof window.__pokerOpenChatFromPushUrl === "function") {
        try {
          if (typeof window.pokerPushOpenDebug === "function") {
            window.pokerPushOpenDebug("sw-message", d.pokerChatOpenUrl);
          }
          window.__pokerOpenChatFromPushUrl(d.pokerChatOpenUrl);
        } catch (ePushOpen) {}
      }
      if (d.pokerChatPushRepair) {
        try {
          if (typeof window.pokerChatPushForceRepair === "function") {
            window.pokerChatPushForceRepair(d.reason || "service_worker_message");
          }
        } catch (ePushRepair) {}
      }
    });
  } catch (eMsg) {}
  try {
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      setTimeout(function () {
        try {
          if (typeof window.pokerChatPushSyncIfNeeded === "function") {
            window.pokerChatPushSyncIfNeeded();
          }
          if (typeof window.pokerMaybeAutoEnrollChatPushInner === "function") {
            window.pokerMaybeAutoEnrollChatPushInner();
          }
        } catch (eCtlSync) {}
      }, 600);
    });
  } catch (eCtl) {}

  function pokerUnlockNotifyAudioFromGesture() {
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      var ctx = new Ctx();
      ctx.resume().then(function () {
        try {
          ctx.close();
        } catch (eC) {}
      });
    } catch (eA) {}
    try {
      document.removeEventListener("pointerdown", pokerUnlockNotifyAudioFromGesture, true);
    } catch (eR) {}
  }

  try {
    document.addEventListener("pointerdown", pokerUnlockNotifyAudioFromGesture, { capture: true, passive: true });
  } catch (eP) {}

  var swUrl = "./sw.js";
  try {
    var swBuild =
      document && document.documentElement
        ? String(
            document.documentElement.getAttribute("data-app-version") ||
              document.documentElement.getAttribute("data-build") ||
              ""
          ).trim()
        : "";
    if (swBuild) swUrl += "?v=" + encodeURIComponent(swBuild);
  } catch (eSwUrl) {}

  navigator.serviceWorker
    .register(swUrl, { updateViaCache: "none" })
    .then(function (reg) {
      try {
        if (reg && reg.waiting) {
          setTimeout(function () {
            try {
              if (typeof window.pokerChatPushSyncIfNeeded === "function") {
                window.pokerChatPushSyncIfNeeded();
              }
            } catch (eWaitSync) {}
          }, 800);
        }
      } catch (eWait) {}
      return reg;
    })
    .catch(function () {});
})();

(function initPwaInstall() {
  var btn = document.getElementById("pwaInstallBtn");
  if (!btn) return;
  var installPrompt = null;

  function isTelegramMini() {
    return !!(window.Telegram && window.Telegram.WebApp);
  }

  function isStandalone() {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true ||
      document.referrer.indexOf("android-app://") === 0
    );
  }

  function isIos() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  }

  function getAppUrl() {
    if (typeof window.getAppBaseUrlForLinks === "function") return window.getAppBaseUrlForLinks();
    return window.location.origin || "";
  }

  function copyShareLink() {
    var link = getAppUrl();
    if (typeof navigator.clipboard !== "undefined" && navigator.clipboard.writeText) {
      return navigator.clipboard
        .writeText(link)
        .then(function () {
          return true;
        })
        .catch(function () {
          return false;
        });
    }
    return Promise.resolve(false);
  }

  function nativeShare() {
    if (typeof navigator.share !== "function") return Promise.resolve(false);
    var link = getAppUrl();
    return navigator
      .share({
        title: "Клуб Два туза — Poker Club",
        text: "Присоединяйся к покерному клубу «Два туза»",
        url: link
      })
      .then(function () {
        return true;
      })
      .catch(function () {
        return false;
      });
  }

  function showMsg(msg) {
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (tg && tg.showAlert) tg.showAlert(msg);
    else alert(msg);
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
    if (installPrompt || isIos() || typeof navigator.share === "function") {
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
      return copyShareLink().then(function () {
        return nativeShare();
      });
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
          if (isIos()) {
            showMsg(
              "Ссылка скопирована. Добавить на экран: нажмите кнопку «Поделиться» в Safari (внизу экрана) → прокрутите вниз → «На экран Домой»."
            );
          } else {
            showMsg("Ссылка скопирована. Отправьте другу. Chrome: меню → Установить.");
          }
        } else {
          if (isIos()) {
            showMsg(
              "Добавить на экран: нажмите кнопку «Поделиться» в Safari (внизу экрана) → прокрутите вниз → «На экран Домой»."
            );
          } else {
            showMsg("Chrome или Edge: меню → Установить.");
          }
        }
      });
    });
  });
})();
