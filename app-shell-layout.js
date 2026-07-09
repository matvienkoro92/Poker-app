// Shell/layout helpers: Telegram/PWA viewport, tabbar padding, profile keyboard cleanup, and Telegram boot.

/** Верхний отступ #app: PWA — только CSS; в Telegram — contentSafeAreaInset; в обычном браузере — без лишних +52px под шапку TG */
function pokerApplyAppTopPadding() {
  var root = document.documentElement;
  var standalone =
    (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
    (window.matchMedia && window.matchMedia("(display-mode: fullscreen)").matches) ||
    !!(window.navigator && window.navigator.standalone);
  if (standalone) {
    root.classList.remove("app--telegram-miniapp");
    root.classList.remove("app--tg-content-inset");
    root.style.removeProperty("--app-top-from-tg");
    root.style.removeProperty("--app-extra-top-for-ui");
    return;
  }
  try {
    var twMini = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (twMini && twMini.initData && String(twMini.initData).trim() !== "") {
      root.classList.add("app--telegram-miniapp");
    } else {
      root.classList.remove("app--telegram-miniapp");
    }
  } catch (eTgMini) {}
  var tw = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  if (
    tw &&
    tw.contentSafeAreaInset != null &&
    typeof tw.contentSafeAreaInset.top === "number" &&
    tw.contentSafeAreaInset.top > 0
  ) {
    root.classList.add("app--tg-content-inset");
    /* Без +8: иначе после стабилизации viewport отступ заметно растёт относительно первого кадра */
    var px = Math.max(12, Math.round(tw.contentSafeAreaInset.top));
    root.style.setProperty("--app-top-from-tg", px + "px");
    root.style.removeProperty("--app-extra-top-for-ui");
    return;
  }
  root.classList.remove("app--tg-content-inset");
  root.style.removeProperty("--app-top-from-tg");
  /* Mini App без contentSafeAreaInset.top: не оставлять :root +52px — иначе огромный зазор под «шапку» */
  root.style.setProperty("--app-extra-top-for-ui", "12px");
}

function pokerApplyTelegramTopClearance() {
  var root = document.documentElement;
  var body = document.body;
  var isTelegramMini = !!(
    root &&
    root.classList &&
    root.classList.contains("app--telegram-miniapp")
  );
  var appEl = document.getElementById("app");
  var mainHeaderBtn = document.getElementById("headerClubWelcomeBtn");
  var mainHeader = mainHeaderBtn && mainHeaderBtn.closest ? mainHeaderBtn.closest(".card__header") : null;
  var viewName = body && body.getAttribute ? body.getAttribute("data-view") : "";
  var activeView = viewName ? document.querySelector('.view--active[data-view="' + viewName + '"]') : null;
  var activeCard = activeView && activeView.closest ? activeView.closest(".card") : null;
  var activeHeader = activeCard ? activeCard.querySelector(".card__header") : document.querySelector(".card__header");
  var homeView = document.querySelector('.view--active[data-view="home"]');
  var homeCard = homeView && homeView.closest ? homeView.closest(".card") : null;
  var homeHeader = homeCard ? homeCard.querySelector(".card__header") : null;
  var homeOutline = homeView ? homeView.querySelector(".home-welcome-outline") : null;
  var allHeaders = document.querySelectorAll(".card__header");
  var instructionModal = document.getElementById("siteHomeInstructionModal");
  var instructionSheet = instructionModal ? instructionModal.querySelector(".club-charter-modal__sheet") : null;
  var instructionClose = instructionModal ? instructionModal.querySelector(".club-charter-modal__close") : null;
  if (!isTelegramMini) {
    if (appEl) appEl.style.removeProperty("padding-top");
    if (allHeaders && allHeaders.length) {
      allHeaders.forEach(function (header) {
        header.style.removeProperty("margin-top");
        header.style.removeProperty("margin-bottom");
        header.style.removeProperty("transform");
      });
    }
    if (activeCard) {
      activeCard.style.removeProperty("margin-top");
      activeCard.style.removeProperty("padding-top");
    }
    if (mainHeader) {
      mainHeader.style.removeProperty("margin-top");
      mainHeader.style.removeProperty("margin-bottom");
      mainHeader.style.removeProperty("padding-top");
    }
    if (homeCard) {
      homeCard.style.removeProperty("margin-top");
      homeCard.style.removeProperty("padding-top");
    }
    if (homeHeader) {
      homeHeader.style.removeProperty("padding-top");
      homeHeader.style.removeProperty("margin-top");
      homeHeader.style.removeProperty("margin-bottom");
      homeHeader.style.removeProperty("transform");
    }
    if (homeOutline) {
      homeOutline.style.removeProperty("margin-top");
      homeOutline.style.removeProperty("padding-top");
    }
    if (instructionSheet) {
      instructionSheet.style.removeProperty("margin-top");
      instructionSheet.style.removeProperty("max-height");
    }
    if (instructionClose) {
      instructionClose.style.removeProperty("top");
      instructionClose.style.removeProperty("right");
    }
    return;
  }
  var tgTop = 0;
  try {
    tgTop = parseInt(
      root.style.getPropertyValue("--app-top-from-tg") ||
      getComputedStyle(root).getPropertyValue("--app-top-from-tg") ||
      "0",
      10
    ) || 0;
  } catch (eTgTop) {}
  var clearance = Math.max(76, tgTop + 28);
  if (appEl) appEl.style.paddingTop = clearance + "px";
  if (activeHeader && viewName !== "chat") {
    activeHeader.style.marginTop = "38px";
    activeHeader.style.marginBottom = "12px";
    activeHeader.style.transform = "translateY(0)";
  }
  if (mainHeader && viewName === "home") {
    mainHeader.style.marginTop = "46px";
    mainHeader.style.marginBottom = "14px";
    mainHeader.style.paddingTop = "0";
  }
  if (activeCard && viewName !== "chat") {
    activeCard.style.marginTop = "0";
    activeCard.style.paddingTop = "0";
  }
  if (viewName === "home") {
    if (homeCard) {
      homeCard.style.marginTop = "0";
      homeCard.style.paddingTop = "0";
    }
    if (homeHeader) {
      homeHeader.style.paddingTop = "0";
      homeHeader.style.marginTop = "42px";
      homeHeader.style.marginBottom = "14px";
    }
    if (homeOutline) {
      homeOutline.style.marginTop = "0";
      homeOutline.style.paddingTop = "6px";
    }
  }
  if (instructionSheet) {
    instructionSheet.style.marginTop = "40px";
    instructionSheet.style.maxHeight = "calc(100dvh - 84px)";
  }
  if (instructionClose) {
    instructionClose.style.top = "68px";
    instructionClose.style.right = "12px";
  }
}

/**
 * Запас под фиксированный .bottom-nav: реальная высота из layout (локальный Chrome, TG/WebView).
 * Чистый CSS (env safe-area) на десктопе даёт 0 снизу — панель перекрывала «Игры и приложения».
 * Скрытый таббар (visibility / уехал за низ) — снимаем inline, остаётся fallback и правила .app:has(…).
 * Зазор над таббаром: 15px (остальные экраны), на главной 5px — дублирует --app-tabbar-content-gap для #app.app--view-home.
 * Высоту берём из getBoundingClientRect (как fixed у низа экрана), без второго safe-area в pad — он уже внутри .bottom-nav.
 * viewportChanged не трогаем: при expand TG даёт ложные кадры и скачок pad через секунды; ResizeObserver на .bottom-nav — источник правды.
 */
function pokerApplyBottomTabbarPad() {
  try {
    if (typeof pokerSyncBottomNavTelegramInset === "function") pokerSyncBottomNavTelegramInset();
  } catch (eSn) {}
  try {
    if (typeof pokerSyncIosPwaRootClass === "function") pokerSyncIosPwaRootClass();
  } catch (eIosCls) {}
  /* В треде общий/личный таббар скрыт — inline pad с прошлого экрана не должен жить на :root (гонка после клавиатуры). */
  try {
    if (document.body && document.body.getAttribute("data-view") === "chat") {
      var gvPad = document.getElementById("chatGeneralView");
      var cvPad = document.getElementById("chatConvView");
      var visibleThreadInput = null;
      try {
        visibleThreadInput = document.querySelector(
          '.view--active[data-view="chat"] .chat-general-view:not(.chat-general-view--hidden) .chat-input-area, ' +
          '.view--active[data-view="chat"] .chat-conv-view:not(.chat-conv-view--hidden) .chat-container .chat-input-area, ' +
          'body[data-view="chat"] .chat-general-view:not(.chat-general-view--hidden) .chat-input-area, ' +
          'body[data-view="chat"] .chat-conv-view:not(.chat-conv-view--hidden) .chat-container .chat-input-area'
        );
      } catch (eChatPadQuery) {}
      var threadPad =
        !!(gvPad && !gvPad.classList.contains("chat-general-view--hidden")) ||
        !!(cvPad && !cvPad.classList.contains("chat-conv-view--hidden")) ||
        !!(visibleThreadInput && visibleThreadInput.getBoundingClientRect && visibleThreadInput.getBoundingClientRect().height > 0);
      if (threadPad) {
        document.documentElement.style.removeProperty("--app-bottom-tabbar-pad");
        pokerApplyBottomTabbarPad._lastPad = null;
        if (typeof pokerSyncPwaIosBottomNavGap === "function") pokerSyncPwaIosBottomNavGap();
        return;
      }
    }
  } catch (eChatPad) {}
  var tabbarGapPx =
    document.body && document.body.getAttribute && document.body.getAttribute("data-view") === "home" ? 5 : 15;
  if (pokerApplyBottomTabbarPad._lastGap !== tabbarGapPx) {
    pokerApplyBottomTabbarPad._lastGap = tabbarGapPx;
    pokerApplyBottomTabbarPad._lastPad = null;
  }
  try {
    var root = document.documentElement;
    var nav = document.querySelector(".bottom-nav");
    if (!nav || typeof nav.getBoundingClientRect !== "function") {
      root.style.removeProperty("--app-bottom-tabbar-pad");
      pokerApplyBottomTabbarPad._lastPad = null;
      return;
    }
    var st = window.getComputedStyle(nav);
    if (st.visibility === "hidden" || st.display === "none") {
      root.style.removeProperty("--app-bottom-tabbar-pad");
      pokerApplyBottomTabbarPad._lastPad = null;
      return;
    }
    var vh = window.innerHeight || 0;
    if (vh < 120) return;
    var rect = nav.getBoundingClientRect();
    /* Не сбрасываем inline на 0×0 при гонке вёрстки / expand TG — оставляем последний pad */
    if (!rect || !(rect.height > 0.5)) return;
    /* Таббар ещё за пределами вьюпорта (клавиатура / translate) — не держим устаревший pad на :root. */
    if (rect.top > vh - 20) {
      root.style.removeProperty("--app-bottom-tabbar-pad");
      pokerApplyBottomTabbarPad._lastPad = null;
      return;
    }
    var h = Math.round(rect.height);
    if (h < 36 || h > 240) return;
    root.style.setProperty("--app-bottom-tabbar-height", h + "px");
    var pad = Math.min(h + tabbarGapPx, 220);
    var prev = pokerApplyBottomTabbarPad._lastPad;
    if (prev != null && Math.abs(pad - prev) < 1) return;
    pokerApplyBottomTabbarPad._lastPad = pad;
    root.style.setProperty("--app-bottom-tabbar-pad", pad + "px");
  } catch (eBtp) {
    try {
      document.documentElement.style.removeProperty("--app-bottom-tabbar-pad");
      document.documentElement.style.removeProperty("--app-bottom-tabbar-height");
      pokerApplyBottomTabbarPad._lastPad = null;
    } catch (e2) {}
  } finally {
    try {
      if (typeof pokerSyncPwaIosBottomNavGap === "function") pokerSyncPwaIosBottomNavGap();
    } catch (eGap) {}
  }
}
pokerApplyBottomTabbarPad._lastPad = null;
pokerApplyBottomTabbarPad._lastGap = null;

/**
 * Telegram Mini App (Bot API 8+): на iOS нижний отступ надёжнее брать из contentSafeAreaInset/safeAreaInset,
 * иначе env(safe-area-inset-bottom) + раскладка WebView дают лишнюю полосу под таббаром. Standalone PWA не трогаем.
 */
function pokerSyncBottomNavTelegramInset() {
  try {
    var root = document.documentElement;
    if (typeof pokerIsPwaDisplayStandalone === "function" && pokerIsPwaDisplayStandalone()) {
      root.classList.remove("app--tg-bottom-nav-inset");
      root.style.removeProperty("--app-bottom-nav-inset-tg");
      return;
    }
    var tw = window.Telegram && window.Telegram.WebApp;
    if (!tw || !tw.initData) {
      root.classList.remove("app--tg-bottom-nav-inset");
      root.style.removeProperty("--app-bottom-nav-inset-tg");
      return;
    }
    var pick = -1;
    if (tw.contentSafeAreaInset != null && typeof tw.contentSafeAreaInset.bottom === "number") {
      pick = Math.round(tw.contentSafeAreaInset.bottom);
    }
    if (pick <= 0 && tw.safeAreaInset != null && typeof tw.safeAreaInset.bottom === "number") {
      pick = Math.round(tw.safeAreaInset.bottom);
    }
    if (pick > 0) {
      root.style.setProperty("--app-bottom-nav-inset-tg", Math.max(6, pick) + "px");
      root.classList.add("app--tg-bottom-nav-inset");
    } else {
      root.classList.remove("app--tg-bottom-nav-inset");
      root.style.removeProperty("--app-bottom-nav-inset-tg");
    }
  } catch (eTgBn) {}
}

/**
 * iOS PWA: нижний отступ таббара — в styles.css (standalone + env). Снимаем устаревшие inline-переменные с :root.
 */
function pokerSyncPwaIosBottomNavGap() {
  try {
    var root = document.documentElement;
    root.style.removeProperty("--pwa-ios-tabbar-bottom-gap");
    root.style.removeProperty("--pwa-ios-tabbar-pad-bottom");
  } catch (ePwaGap) {}
}

/**
 * Профиль (и др. с внутренним scrollport): после закрытия клавиатуры WK/TG иногда оставляют 100dvh/html
 * короче визуального окна — снизу полоса фона. Короткий inline-пульс по innerHeight (как в чате).
 */
function pokerPulseShellHeightToInnerHeightForProfile() {
  try {
    if (!document.body || document.body.getAttribute("data-view") !== "profile") return;
    if (document.body.classList.contains("chat-keyboard-open")) return;
    var touchLike =
      (navigator.maxTouchPoints || 0) > 0 ||
      /iPad|iPhone|iPod|Android/i.test(navigator.userAgent || "");
    if (!touchLike) return;
    var ih = window.innerHeight || 0;
    if (ih < 240) return;
    var target = ih;
    try {
      var vv0 = window.visualViewport;
      if (vv0) {
        var vvh = Number(vv0.height) || 0;
        var ot = Number(vv0.offsetTop) || 0;
        var pack = ot + vvh;
        if (pack > ih - 1 && vvh < ih - 10) {
          target = Math.max(target, Math.round(pack));
        }
      }
    } catch (eVvP) {}
    var body = document.body;
    var html = document.documentElement;
    body.style.setProperty("height", target + "px");
    body.style.setProperty("min-height", target + "px");
    body.style.setProperty("max-height", target + "px");
    html.style.setProperty("height", target + "px");
    html.style.setProperty("min-height", target + "px");
    html.style.setProperty("max-height", target + "px");
    var raf = window.requestAnimationFrame || function (fn) {
      setTimeout(fn, 16);
    };
    raf(function () {
      raf(function () {
        try {
          body.style.removeProperty("height");
          body.style.removeProperty("min-height");
          body.style.removeProperty("max-height");
          html.style.removeProperty("height");
          html.style.removeProperty("min-height");
          html.style.removeProperty("max-height");
        } catch (eR) {}
      });
    });
  } catch (ePulse) {}
}

function pokerFlushViewportAfterProfileFieldBlur() {
  if (!document.body || document.body.getAttribute("data-view") !== "profile") return;
  try {
    if (typeof window.__pokerClearChatKeyboardViewportState === "function") window.__pokerClearChatKeyboardViewportState();
  } catch (eKbProf) {}
  try {
    if (typeof pokerNukeIosKeyboardViewportArtifacts === "function") {
      pokerNukeIosKeyboardViewportArtifacts({ resetMainScroll: true });
    }
  } catch (e1) {}
  try {
    if (typeof pokerRepairIosStuckVisualViewportOffset === "function") {
      pokerRepairIosStuckVisualViewportOffset();
    }
  } catch (e2) {}
  try {
    if (typeof pokerPulseShellHeightToInnerHeightForProfile === "function") {
      pokerPulseShellHeightToInnerHeightForProfile();
    }
  } catch (eP) {}
  try {
    pokerApplyBottomTabbarPad._lastPad = null;
    if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
  } catch (e3) {}
  try {
    if (typeof pokerFlushBottomNavAndViewportAfterChatChrome === "function") {
      pokerFlushBottomNavAndViewportAfterChatChrome();
    }
  } catch (e4) {}
  setTimeout(function () {
    if (!document.body || document.body.getAttribute("data-view") !== "profile") return;
    try {
      if (typeof pokerNukeIosKeyboardViewportArtifacts === "function") {
        pokerNukeIosKeyboardViewportArtifacts({ resetMainScroll: true });
      }
    } catch (e5) {}
    try {
      if (typeof pokerRepairIosStuckVisualViewportOffset === "function") {
        pokerRepairIosStuckVisualViewportOffset();
      }
    } catch (e6) {}
    try {
      if (typeof pokerPulseShellHeightToInnerHeightForProfile === "function") {
        pokerPulseShellHeightToInnerHeightForProfile();
      }
    } catch (eP2) {}
    try {
      pokerApplyBottomTabbarPad._lastPad = null;
      if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
    } catch (e7) {}
    try {
      if (typeof pokerFlushBottomNavAndViewportAfterChatChrome === "function") {
        pokerFlushBottomNavAndViewportAfterChatChrome();
      }
    } catch (e8) {}
  }, 220);
}

function initProfileKeyboardViewportCleanup() {
  var profileRoot = document.querySelector('.view[data-view="profile"]');
  if (!profileRoot || profileRoot.getAttribute("data-kb-vv-bound") === "1") return;
  profileRoot.setAttribute("data-kb-vv-bound", "1");
  var flushTimer = null;
  function ensureProfileFieldVisible(target, behavior) {
    if (!target) return;
    try {
      if (document.activeElement !== target) return;
      target.scrollIntoView({ block: "center", inline: "nearest", behavior: behavior || "auto" });
    } catch (eScrollMid) {}
    try {
      var rect = target.getBoundingClientRect();
      var vv = window.visualViewport || null;
      var viewportH = vv ? Number(vv.height) || 0 : window.innerHeight || 0;
      var safeBottom = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--chat-ios-accessory-inset")) || 0;
      var desiredBottom = viewportH - safeBottom - 28;
      if (viewportH > 120 && rect.bottom > desiredBottom) {
        var delta = rect.bottom - desiredBottom;
        var scroller =
          document.querySelector('body[data-view="profile"] #app.app .card .card__content') ||
          document.scrollingElement ||
          document.documentElement;
        if (scroller && typeof scroller.scrollBy === "function") scroller.scrollBy({ top: delta, behavior: "auto" });
        else if (scroller) scroller.scrollTop += delta;
      }
    } catch (eScrollAdj) {}
  }
  function scheduleFlush() {
    if (flushTimer) clearTimeout(flushTimer);
    flushTimer = setTimeout(function () {
      flushTimer = null;
      var a = document.activeElement;
      if (
        a &&
        profileRoot.contains(a) &&
        (a.tagName === "INPUT" || a.tagName === "TEXTAREA")
      ) {
        return;
      }
      if (typeof pokerFlushViewportAfterProfileFieldBlur === "function") {
        pokerFlushViewportAfterProfileFieldBlur();
      }
    }, 60);
  }
  profileRoot.addEventListener(
    "focusin",
    function (ev) {
      var t = ev.target;
      if (!t || (t.tagName !== "INPUT" && t.tagName !== "TEXTAREA")) return;
      if (t.id === "profileAvatarInput") return;
      if (t.id === "profileFriendsSearchInput") return;
      if (t.id === "profileCityInput") {
        if (typeof ensureProfileFieldVisible === "function") {
          requestAnimationFrame(function () {
            ensureProfileFieldVisible(t, "smooth");
          });
        }
        return;
      }
      if (
        typeof window.__pokerIsChatPhysicalKeyboardContext === "function" &&
        window.__pokerIsChatPhysicalKeyboardContext()
      ) {
        return;
      }
      if (typeof window.__pokerActivateChatKeyboardViewport === "function") {
        window.__pokerActivateChatKeyboardViewport();
      } else {
        document.documentElement.classList.add("chat-keyboard-open");
        document.body.classList.add("chat-keyboard-open");
      }
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          try {
            ensureProfileFieldVisible(t, "smooth");
          } catch (eSi) {}
          try {
            if (typeof window.__pokerSyncPwaChatVisualViewportInset === "function") {
              window.__pokerSyncPwaChatVisualViewportInset();
            }
          } catch (eSyncP) {}
          [120, 260].forEach(function (ms) {
            setTimeout(function () {
              try {
                if (typeof window.__pokerSyncPwaChatVisualViewportInset === "function") {
                  window.__pokerSyncPwaChatVisualViewportInset();
                }
              } catch (eSyncP2) {}
              ensureProfileFieldVisible(t, "auto");
            }, ms);
          });
        });
      });
    },
    true
  );
  profileRoot.addEventListener(
    "focusout",
    function (ev) {
      var t = ev.target;
      if (!t || (t.tagName !== "INPUT" && t.tagName !== "TEXTAREA")) return;
      if (t.id === "profileAvatarInput") return;
      if (t.id === "profileFriendsSearchInput") return;
      if (t.id === "profileCityInput") {
        scheduleFlush();
        return;
      }
      scheduleFlush();
    },
    true
  );
  var vvDebounce = null;
  function onVvResizeProfile() {
    if (document.body.getAttribute("data-view") !== "profile") return;
    if (document.body.classList.contains("chat-keyboard-open")) return;
    var ih = window.innerHeight || 0;
    var vvh = window.visualViewport ? Number(window.visualViewport.height) || 0 : 0;
    if (!ih || vvh < ih - 12) return;
    clearTimeout(vvDebounce);
    vvDebounce = setTimeout(function () {
      vvDebounce = null;
      if (document.body.getAttribute("data-view") !== "profile") return;
      if (typeof pokerFlushViewportAfterProfileFieldBlur === "function") {
        pokerFlushViewportAfterProfileFieldBlur();
      }
    }, 110);
  }
  if (window.visualViewport && typeof window.visualViewport.addEventListener === "function") {
    window.visualViewport.addEventListener("resize", onVvResizeProfile, { passive: true });
  }
}

// Инициализация Telegram WebApp (если открыто внутри Telegram)
const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

if (tg) {
  try {
    if (typeof tg.showAlert === "function" && !tg.__pokerSafeShowAlertWrapped) {
      var pokerRawTelegramShowAlert = tg.showAlert.bind(tg);
      tg.showAlert = function (message, callback) {
        try {
          return pokerRawTelegramShowAlert(message, callback);
        } catch (eAlert) {
          if (typeof callback === "function") {
            try {
              callback();
            } catch (eCb) {}
          }
          return null;
        }
      };
      tg.__pokerSafeShowAlertWrapped = true;
    }
  } catch (eWrapAlert) {}
  try {
    tg.ready();
  } catch (eTgReady) {}
  try {
    if (tg.expand) tg.expand();
  } catch (eTgExpandInit) {}
  try {
    if (typeof tg.disableVerticalSwipes === "function") tg.disableVerticalSwipes();
  } catch (eTgSwipes) {}
  var currentTheme = document.documentElement.getAttribute("data-theme");
  var isLight = currentTheme === "light";
  var isGold = currentTheme === "gold";
  var isNeon = currentTheme === "neon";
  /* Совпадает с --overscroll-canvas / initTheme (резинка сверху не белая) */
  try {
    if (tg.setBackgroundColor) tg.setBackgroundColor(isLight ? "#fff7ed" : isGold ? "#05070d" : isNeon ? "#020611" : "#0f172a");
  } catch (eTgBg) {}
  // По ссылке t.me/Poker_dvatuza_bot/DvaTuza всегда открываем в полный экран.
  // Повторные вызовы expand() с задержкой и при событиях помогают развернуть на части устройств.
  function tryExpand() {
    if (tg.expand) tg.expand();
  }
  setTimeout(tryExpand, 100);
  setTimeout(tryExpand, 400);
  setTimeout(tryExpand, 800);
  setTimeout(tryExpand, 1500);
  if (tg.onEvent && typeof tg.onEvent === "function") {
    tg.onEvent("viewportChanged", function (e) {
      /* Пока isStateStable === false, inset часто «раздувается» — потом лишний отступ сверху */
      if (!(e && e.isStateStable === false) && typeof pokerApplyAppTopPadding === "function") {
        pokerApplyAppTopPadding();
        if (typeof pokerApplyTelegramTopClearance === "function") pokerApplyTelegramTopClearance();
      }
      if (!(e && e.isStateStable === false) && typeof pokerSyncBottomNavTelegramInset === "function") {
        pokerSyncBottomNavTelegramInset();
      }
      /* Нижний pad — только ResizeObserver / resize */
      if (e && e.isStateStable) tryExpand();
    });
    ["contentSafeAreaChanged", "safeAreaChanged"].forEach(function (ev) {
      try {
        tg.onEvent(ev, function () {
          if (typeof pokerSyncBottomNavTelegramInset === "function") pokerSyncBottomNavTelegramInset();
          if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
        });
      } catch (eSafeEv) {}
    });
  }
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") tryExpand();
  });
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) tryExpand();
  });
  document.addEventListener("click", function expandOnFirstClick() {
    tryExpand();
    document.removeEventListener("click", expandOnFirstClick);
  }, { once: true, capture: true });
  document.addEventListener("touchstart", function expandOnFirstTouch() {
    tryExpand();
    document.removeEventListener("touchstart", expandOnFirstTouch);
  }, { once: true, passive: true, capture: true });
  // requestFullscreen() не вызываем: после него на части устройств (iOS) перестают работать клики по кнопкам
  // Адаптация под тему Telegram
  const themeParams = tg.themeParams || {};
  if (themeParams.bg_color) {
    document.documentElement.style.setProperty(
      "--bg-color",
      themeParams.bg_color
    );
  }
  // Не перенаправляем в чат бота при открытии — приложение должно запускаться с первого нажатия
  window.tryTelegramWebAppExpand = tryExpand;
  window.tryTelegramWebAppExpandBurst = function () {
    tryExpand();
    setTimeout(tryExpand, 100);
    setTimeout(tryExpand, 400);
    setTimeout(tryExpand, 800);
    setTimeout(tryExpand, 1500);
  };
} else {
  window.tryTelegramWebAppExpand = function () {};
  window.tryTelegramWebAppExpandBurst = function () {};
}

pokerApplyAppTopPadding();
if (typeof pokerApplyTelegramTopClearance === "function") pokerApplyTelegramTopClearance();
pokerSyncBottomNavTelegramInset();
setTimeout(pokerSyncBottomNavTelegramInset, 0);
setTimeout(pokerSyncBottomNavTelegramInset, 120);
setTimeout(pokerSyncBottomNavTelegramInset, 400);
/* Повторы 250/700 ms давали второй проход после TG и рост padding-top; достаточно rAF + viewportChanged */
(function pokerApplyAppTopPaddingRaf() {
  var raf = window.requestAnimationFrame || function (fn) {
    setTimeout(fn, 16);
  };
  raf(function () {
    raf(function () {
      if (typeof pokerApplyAppTopPadding === "function") pokerApplyAppTopPadding();
      if (typeof pokerApplyTelegramTopClearance === "function") pokerApplyTelegramTopClearance();
    });
  });
})();
pokerApplyBottomTabbarPad();
setTimeout(pokerApplyBottomTabbarPad, 0);
setTimeout(pokerApplyBottomTabbarPad, 100);
setTimeout(pokerApplyBottomTabbarPad, 400);
/* Пара кадров до ResizeObserver; без load/fonts — поздние вызовы снова меняли pad */
(function pokerBottomTabbarPadEarlyFlush() {
  var run = function () {
    if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
  };
  var raf = window.requestAnimationFrame || function (fn) {
    setTimeout(fn, 16);
  };
  var n = 0;
  function rafBurst() {
    run();
    if (++n < 3) raf(rafBurst);
  }
  raf(rafBurst);
})();
(function pokerBindBottomTabbarPadResize() {
  var t = null;
  function schedule() {
    if (t) clearTimeout(t);
    t = setTimeout(function () {
      t = null;
      if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
    }, 60);
  }
  window.addEventListener("resize", schedule, { passive: true });
  window.addEventListener("orientationchange", schedule, { passive: true });
  if (window.visualViewport && typeof window.visualViewport.addEventListener === "function") {
    window.visualViewport.addEventListener("resize", schedule, { passive: true });
  }
})();
(function pokerBindBottomNavResizeObserver() {
  var nav = document.querySelector(".bottom-nav");
  if (!nav || typeof ResizeObserver === "undefined") return;
  var ro = new ResizeObserver(function () {
    if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
  });
  ro.observe(nav);
})();
/* iOS PWA: поздняя стабилизация — пересчёт --pwa-ios-tabbar-pad-bottom */
(function pokerPwaIosBottomNavGapBurst() {
  var ua = navigator.userAgent || "";
  var ios = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === "MacIntel" && (navigator.maxTouchPoints || 0) > 1);
  if (!ios || typeof pokerIsPwaDisplayStandalone !== "function" || !pokerIsPwaDisplayStandalone()) return;
  var n = 0;
  function tick() {
    if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
    if (++n < 30) setTimeout(tick, 90);
  }
  setTimeout(tick, 0);
})();
(function setRandomListenersCount() {
  var el = document.getElementById("headerRadioListenersCount");
  if (el) el.textContent = Math.floor(Math.random() * (15 - 7 + 1)) + 7;
})();

/** Имя для приветствия из Telegram User: сначала имя, иначе фамилия, иначе @username без @ */
// Оверлей загрузки: ранний inline-скрипт в index.html (до app.js), см. __pokerHideBootOverlay

updateProfileUserName();
