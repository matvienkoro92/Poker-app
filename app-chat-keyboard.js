/**
 * После клавиатуры / смены «тред ↔ диалоги» на iOS иногда залипают transform таббара и visualViewport —
 * таббар висит выше низа с чёрной полосой. Сбрасываем инлайн, expand, resize, пересчитываем pad.
 */
function pokerFlushBottomNavAndViewportAfterChatChrome() {
  try {
    pokerApplyBottomTabbarPad._lastPad = null;
  } catch (eInvPad) {}
  try {
    var nav = document.querySelector(".bottom-nav");
    if (nav) {
      nav.classList.add("bottom-nav--no-transition");
      try {
        nav.style.removeProperty("transform");
        nav.style.removeProperty("opacity");
        nav.style.removeProperty("visibility");
      } catch (eRm) {}
      try {
        void nav.offsetHeight;
      } catch (eOh) {}
    }
  } catch (eN) {}
  try {
    if (window.visualViewport && typeof window.visualViewport.scrollTo === "function") {
      window.visualViewport.scrollTo(0, 0);
    }
  } catch (eVv) {}
  try {
    if (typeof scrollMainDocumentToTop === "function") scrollMainDocumentToTop();
  } catch (eScr) {}
  try {
    if (typeof pokerPulseChatFixedViewportHeightAfterKeyboard === "function") pokerPulseChatFixedViewportHeightAfterKeyboard();
  } catch (ePulVv) {}
  try {
    if (typeof pokerRepairIosStuckVisualViewportOffset === "function") pokerRepairIosStuckVisualViewportOffset();
  } catch (eRepVv) {}
  try {
    var tw = window.Telegram && window.Telegram.WebApp;
    if (tw && typeof tw.expand === "function") tw.expand();
  } catch (eTg) {}
  try {
    if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
  } catch (eTb) {}
  try {
    if (typeof window.dispatchEvent === "function") window.dispatchEvent(new Event("resize"));
  } catch (eRe) {}
  try {
    var nav2 = document.querySelector(".bottom-nav");
    if (nav2) {
      var raf = window.requestAnimationFrame || function (fn) {
        setTimeout(fn, 16);
      };
      raf(function () {
        raf(function () {
          try {
            nav2.classList.remove("bottom-nav--no-transition");
          } catch (eC) {}
          try {
            if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
          } catch (eTb2) {}
        });
      });
    }
  } catch (eRaf) {}
}

function pokerResetChatDialogsViewportArtifacts() {
  try {
    var root = document.documentElement;
    var body = document.body;
    var nodes = [
      body,
      document.getElementById("app"),
      document.querySelector(".app"),
      document.querySelector(".card"),
      document.querySelector(".card__content"),
      document.getElementById("chatDialogsView"),
      document.querySelector("#chatGeneralView .chat-messages-wrap"),
      document.querySelector("#chatConvView .chat-container .chat-messages-wrap"),
      document.querySelector(".chat-dialogs-list-wrap"),
      document.querySelector(".chat-dialogs-list"),
      document.querySelector(".chat-contacts"),
      document.querySelector(".chat-list-view")
    ];
    nodes.forEach(function (el) {
      if (!el || !el.style) return;
      try {
        el.style.removeProperty("height");
        el.style.removeProperty("min-height");
        el.style.removeProperty("max-height");
        el.style.removeProperty("padding-bottom");
        el.style.removeProperty("margin-bottom");
        el.style.removeProperty("bottom");
        el.style.removeProperty("top");
        el.style.removeProperty("transform");
      } catch (eNodeReset) {}
    });
    try {
      if (body && body.style) {
        body.style.removeProperty("min-height");
        body.style.removeProperty("height");
        body.style.removeProperty("max-height");
      }
    } catch (eBodyReset) {}
    try {
      if (root && root.style) {
        root.style.removeProperty("--chat-vv-inset");
        root.style.removeProperty("--chat-ios-accessory-inset");
      }
    } catch (eRootReset) {}
    try {
      if (typeof pokerApplyBottomTabbarPad === "function") {
        pokerApplyBottomTabbarPad._lastPad = null;
        pokerApplyBottomTabbarPad();
      }
    } catch (ePadReset) {}
  } catch (eResetChatDialogs) {}
}

/**
 * iOS/TG WKWebView: после закрытия клавиатуры visualViewport.offsetTop / высота dvh
 * иногда не совпадают с реальным экраном — снизу «воздух», таббар приподнят.
 */
function pokerNukeIosKeyboardViewportArtifacts(opts) {
  opts = opts || {};
  var resetMainScroll = opts.resetMainScroll === true;
  var isChatView = !!(document.body && document.body.getAttribute("data-view") === "chat");
  var chatThreadOpen = false;
  try {
    if (isChatView) {
      var gvN = document.getElementById("chatGeneralView");
      var cvN = document.getElementById("chatConvView");
      chatThreadOpen =
        !!(gvN && !gvN.classList.contains("chat-general-view--hidden")) ||
        !!(cvN && !cvN.classList.contains("chat-conv-view--hidden"));
    }
  } catch (eTh) {}
  /* vv.scrollTo / expand на каждом resize visualViewport ломают обычный скролл на главной и др. — только чат или явный сброс после клавиатуры. */
  var doVvRepair = resetMainScroll || isChatView;
  try {
    if (doVvRepair && window.visualViewport) {
      var vv = window.visualViewport;
      if (typeof vv.scrollTo === "function") {
        vv.scrollTo(0, 0);
      } else if (typeof vv.scroll === "function") {
        vv.scroll(0, 0);
      }
      /*
       * Не компенсируем vv.offsetTop через window.scrollTo здесь: при отложенном nuke без resetMainScroll
       * (finalizeChatKeyboardDismiss 80/220/520 ms) на iOS после клавиатуры offsetTop ещё ненулевой —
       * страница остаётся со сдвигом, чат визуально выше, снизу полоса «воздуха» над таббаром.
       * Сброс scroll делаем только в ветке resetMainScroll ниже.
       */
    }
  } catch (eVv) {}
  /* Сброс layout scroll только после клавиатуры в чате — иначе при каждом scroll visualViewport страница «прилипает» к верху. */
  if (resetMainScroll) {
    try {
      window.scrollTo(0, 0);
      var se = document.scrollingElement;
      if (se) se.scrollTop = 0;
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    } catch (eScr) {}
  }
  /*
   * minHeight + expand на каждом отложенном вызове без клавиатуры гоняли вёрстку WKWebView (14 Pro Max и др.):
   * innerHeight ещё «плавает» — строка ввода и чат не доезжали вниз, снизу оставался зазор.
   * Оставляем только при явном resetMainScroll (finalize / выход с клавиатуры).
   */
  if (resetMainScroll) {
    /*
     * Пульс minHeight по innerHeight в треде чата на iPhone после клавиатуры давал ложную высоту
     * (ih ещё не догнал закрытие) — снизу «воздух», весь блок визуально выше.
     * В списке диалогов оставляем — там другая вёрстка.
     */
    try {
      if (document.body && document.body.getAttribute("data-view") === "chat" && !chatThreadOpen) {
        var ih = window.innerHeight || 0;
        if (ih > 0) {
          document.body.style.minHeight = ih + "px";
          var raf = window.requestAnimationFrame || function (fn) {
            setTimeout(fn, 16);
          };
            raf(function () {
              raf(function () {
                try {
                  document.body.style.removeProperty("min-height");
                } catch (eMh) {}
              });
            });
        }
      }
    } catch (eBody) {}
    try {
      if (doVvRepair) {
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
        else if (typeof window.tryTelegramWebAppExpand === "function") window.tryTelegramWebAppExpand();
      }
    } catch (eTg) {}
  }
}

/**
 * После закрытия клавиатуры в треде WK/TG 100dvh на body иногда короче реального innerHeight —
 * flex-колонка сжимается, композер «уезжает вниз», сверху остаётся полоса / клип. Короткий inline-пульс
 * совмещает высоту с innerHeight (+ при необходимости vv), затем снимаем — пересчитывается dvh.
 */
function pokerPulseChatFixedViewportHeightAfterKeyboard() {
  try {
    if (!document.body || document.body.getAttribute("data-view") !== "chat") return;
    if (document.body.classList.contains("chat-keyboard-open")) return;
    var touchLike =
      (navigator.maxTouchPoints || 0) > 0 ||
      /iPad|iPhone|iPod|Android/i.test(navigator.userAgent || "");
    if (!touchLike) return;
    var gv = document.getElementById("chatGeneralView");
    var cv = document.getElementById("chatConvView");
    var thread =
      !!(gv && !gv.classList.contains("chat-general-view--hidden")) ||
      !!(cv && !cv.classList.contains("chat-conv-view--hidden"));
    if (!thread) return;
    var ih = window.innerHeight || 0;
    if (ih < 240) return;
    var target = ih;
    try {
      var vv0 = window.visualViewport;
      if (vv0) {
        var vvh = Number(vv0.height) || 0;
        var ot = Number(vv0.offsetTop) || 0;
        var pack = ot + vvh;
        /*
         * После blur offsetTop часто ещё >0, а vvh уже почти ih — pack > ih раздувает target на один кадр,
         * ломается flex/100dvh и чат с композером визуально «поднимаются» с зазором снизу.
         * Учитываем pack только пока vv реально короче layout (клавиатура ещё жмёт окно).
         */
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
    /*
     * Первый кадр после blur: innerHeight ещё «клавиатурный» — повторяем короткий пульс (тот же touchLike, что выше).
     */
    if (touchLike) {
      [140, 420].forEach(function (ms) {
        setTimeout(function () {
          try {
            if (!document.body || document.body.getAttribute("data-view") !== "chat") return;
            if (document.body.classList.contains("chat-keyboard-open")) return;
            var gvP = document.getElementById("chatGeneralView");
            var cvP = document.getElementById("chatConvView");
            var threadP =
              !!(gvP && !gvP.classList.contains("chat-general-view--hidden")) ||
              !!(cvP && !cvP.classList.contains("chat-conv-view--hidden"));
            if (!threadP) return;
            var ihP = window.innerHeight || 0;
            if (ihP < 240) return;
            var bP = document.body;
            var hP = document.documentElement;
            bP.style.setProperty("height", ihP + "px");
            bP.style.setProperty("min-height", ihP + "px");
            bP.style.setProperty("max-height", ihP + "px");
            hP.style.setProperty("height", ihP + "px");
            hP.style.setProperty("min-height", ihP + "px");
            hP.style.setProperty("max-height", ihP + "px");
            var rafP = window.requestAnimationFrame || function (fn) {
              setTimeout(fn, 16);
            };
            rafP(function () {
              try {
                bP.style.removeProperty("height");
                bP.style.removeProperty("min-height");
                bP.style.removeProperty("max-height");
                hP.style.removeProperty("height");
                hP.style.removeProperty("min-height");
                hP.style.removeProperty("max-height");
              } catch (eRp) {}
            });
          } catch (ePl2) {}
        }, ms);
      });
    }
  } catch (ePulse) {}
}

/**
 * iOS WKWebView после blur input: visualViewport.offsetTop иногда остаётся > 0 без соответствующего scrollY —
 * контент «висячий», снизу пусто. Компенсация scroll + немедленный возврат в 0 на следующем кадре.
 */
function pokerRepairIosStuckVisualViewportOffset() {
  if (!window.visualViewport) return;
  if (document.body && document.body.classList.contains("chat-keyboard-open")) return;
  try {
    var ua = navigator.userAgent || "";
    var iosLike = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (!iosLike) return;
    var vv = window.visualViewport;
    var ot = Number(vv.offsetTop) || 0;
    try {
      if (typeof vv.scrollTo === "function") vv.scrollTo(0, 0);
      else if (typeof vv.scroll === "function") vv.scroll(0, 0);
    } catch (eVv0) {}
    var inChatFixed =
      document.documentElement.classList.contains("app-view-chat") ||
      String((document.body && document.body.getAttribute("data-view")) || "") === "chat";
    /*
     * У body в чате position:fixed — window.scrollTo(0, y+ot) с последующим 0 на iPhone 14/WK
     * давал «залипание»: страница визуально выше, снизу полоса. Ограничиваемся vv + сбросом scroll.
     * При ot>0 после клавиатуры без дожима vv композер / низ экрана остаются сдвинутыми — повторяем scrollTo на кадрах.
     */
    if (inChatFixed) {
      try {
        window.scrollTo(0, 0);
        var se0 = document.scrollingElement;
        if (se0) se0.scrollTop = 0;
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
      } catch (eSc0) {}
      if (ot > 0.5) {
        var rafFix = window.requestAnimationFrame || function (fn) {
          setTimeout(fn, 16);
        };
        rafFix(function () {
          try {
            if (document.body && document.body.classList.contains("chat-keyboard-open")) return;
            var vv1 = window.visualViewport;
            if (vv1 && typeof vv1.scrollTo === "function") vv1.scrollTo(0, 0);
            else if (vv1 && typeof vv1.scroll === "function") vv1.scroll(0, 0);
          } catch (eVv1) {}
        });
        rafFix(function () {
          rafFix(function () {
            try {
              if (document.body && document.body.classList.contains("chat-keyboard-open")) return;
              var vv2 = window.visualViewport;
              if (vv2 && typeof vv2.scrollTo === "function") vv2.scrollTo(0, 0);
              else if (vv2 && typeof vv2.scroll === "function") vv2.scroll(0, 0);
              var twF = window.Telegram && window.Telegram.WebApp;
              if (twF && typeof twF.expand === "function") twF.expand();
            } catch (eVv2) {}
          });
        });
      }
      return;
    }
    if (ot <= 0.5) return;
    var y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    window.scrollTo(0, y + ot);
    var raf = window.requestAnimationFrame || function (fn) {
      setTimeout(fn, 16);
    };
    raf(function () {
      try {
        window.scrollTo(0, 0);
        var se = document.scrollingElement;
        if (se) se.scrollTop = 0;
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
        if (window.visualViewport && typeof window.visualViewport.scrollTo === "function") {
          window.visualViewport.scrollTo(0, 0);
        }
      } catch (eZ) {}
    });
  } catch (eRep) {}
}
