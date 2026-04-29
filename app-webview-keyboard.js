// WebView keyboard helpers: Telegram/iOS root lock and keyboard lab diagnostics.

var telegramIosKeyboardRootLockActive = false;
var telegramIosKeyboardRootLockRaf = null;
function isTelegramIosKeyboardRootLockCapable() {
  return false;
}
function getTelegramIosKeyboardRootLockScrollPorts() {
  var ports = [];
  try {
    var docScroller = document.scrollingElement || document.documentElement || document.body;
    if (docScroller) ports.push(docScroller);
  } catch (eTgKbDoc) {}
  try {
    var activeView = document.querySelector(".view--active[data-view]");
    var cardContent = activeView && activeView.closest ? activeView.closest(".card__content") : null;
    if (cardContent) ports.push(cardContent);
  } catch (eTgKbCard) {}
  return ports;
}
function getTelegramIosKeyboardRootShiftPx() {
  var maxShift = 0;
  getTelegramIosKeyboardRootLockScrollPorts().forEach(function (node) {
    try {
      if (!node) return;
      var top = Math.max(Number(node.scrollTop) || 0, Number(node.scrollY) || 0);
      if (top > maxShift) maxShift = top;
    } catch (eTgKbShiftNode) {}
  });
  try {
    var app = document.getElementById("app");
    if (app && app.getBoundingClientRect) {
      var rect = app.getBoundingClientRect();
      var drift = Math.max(0, Math.round(-rect.top || 0));
      if (drift > maxShift) maxShift = drift;
    }
  } catch (eTgKbShiftApp) {}
  return Math.round(maxShift || 0);
}
function syncTelegramIosKeyboardRootLockOffsetVar() {
  try {
    var shiftPx = telegramIosKeyboardRootLockActive ? getTelegramIosKeyboardRootShiftPx() : 0;
    document.documentElement.style.setProperty("--tg-ios-root-scroll-offset", shiftPx + "px");
    document.body.style.setProperty("--tg-ios-root-scroll-offset", shiftPx + "px");
  } catch (eTgKbOffset) {}
}
function syncTelegramIosKeyboardRootLockScroll() {
  if (!telegramIosKeyboardRootLockActive) return;
  try {
    window.scrollTo(0, 0);
  } catch (eTgKbWin) {}
  getTelegramIosKeyboardRootLockScrollPorts().forEach(function (node) {
    try {
      if (!node) return;
      node.scrollTop = 0;
      node.scrollLeft = 0;
    } catch (eTgKbNode) {}
  });
  syncTelegramIosKeyboardRootLockOffsetVar();
}
function scheduleTelegramIosKeyboardRootLockSync() {
  if (!telegramIosKeyboardRootLockActive || telegramIosKeyboardRootLockRaf != null) return;
  var raf = window.requestAnimationFrame || function (fn) {
    return setTimeout(fn, 0);
  };
  telegramIosKeyboardRootLockRaf = raf(function () {
    telegramIosKeyboardRootLockRaf = null;
    syncTelegramIosKeyboardRootLockScroll();
  });
}
function setTelegramIosKeyboardRootLock(active) {
  telegramIosKeyboardRootLockActive = false;
  document.documentElement.classList.remove("tg-ios-keyboard-root-lock");
  document.body.classList.remove("tg-ios-keyboard-root-lock");
  document.documentElement.style.setProperty("--tg-ios-root-scroll-offset", "0px");
  document.body.style.setProperty("--tg-ios-root-scroll-offset", "0px");
  if (telegramIosKeyboardRootLockRaf != null) {
    var caf = window.cancelAnimationFrame || clearTimeout;
    caf(telegramIosKeyboardRootLockRaf);
    telegramIosKeyboardRootLockRaf = null;
  }
}
window.addEventListener("scroll", function () {
  if (!telegramIosKeyboardRootLockActive) return;
  scheduleTelegramIosKeyboardRootLockSync();
}, true);
window.addEventListener("resize", function () {
  if (!telegramIosKeyboardRootLockActive) return;
  scheduleTelegramIosKeyboardRootLockSync();
});

(function initKeyboardLab() {
  var view = document.getElementById("keyboardLabView");
  var metricsEl = document.getElementById("keyboardLabMetrics");
  var streamEl = document.getElementById("keyboardLabStream");
  var textareaEl = document.getElementById("keyboardLabTextarea");
  var composerEl = document.getElementById("keyboardLabComposer");
  var sendBtnEl = document.getElementById("keyboardLabSendBtn");
  if (!view || !metricsEl || !streamEl || !textareaEl || !composerEl || !sendBtnEl) return;
  var ticker = null;
  function keyboardLabActiveLabel() {
    var active = document.activeElement;
    if (!active) return "none";
    var id = active.id ? "#" + active.id : "";
    var cls = active.classList && active.classList.length ? "." + Array.prototype.slice.call(active.classList, 0, 2).join(".") : "";
    return String((active.tagName || "node").toLowerCase()) + id + cls;
  }
  function keyboardLabUpdateMetrics(source) {
    try {
      var vv = window.visualViewport || null;
      var taRect = textareaEl.getBoundingClientRect();
      var composerRect = composerEl.getBoundingClientRect();
      var viewRect = view.getBoundingClientRect();
      var shell = document.getElementById("app");
      var shellRect = shell && shell.getBoundingClientRect ? shell.getBoundingClientRect() : null;
      var scrollEl = document.scrollingElement || document.documentElement || document.body;
      var bodyRect = document.body && document.body.getBoundingClientRect ? document.body.getBoundingClientRect() : null;
      var docRect = document.documentElement && document.documentElement.getBoundingClientRect ? document.documentElement.getBoundingClientRect() : null;
      var safeBottom = 0;
      var chatSafeBottom = 0;
      var rootStyle = null;
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      try {
        rootStyle = window.getComputedStyle ? getComputedStyle(document.documentElement) : null;
        safeBottom = Math.round(parseFloat(rootStyle && rootStyle.getPropertyValue("padding-bottom")) || 0);
        chatSafeBottom = Math.round(parseFloat(rootStyle && rootStyle.getPropertyValue("--chat-safe-area-bottom")) || 0);
      } catch (eKbLabCss) {}
      metricsEl.textContent = [
        "src: " + String(source || "tick"),
        "ih: " + (window.innerHeight || 0) +
          " iw: " + (window.innerWidth || 0),
        "vv: " +
          (vv ? Math.round(Number(vv.height) || 0) : 0) + "/" +
          (vv ? Math.round(Number(vv.offsetTop) || 0) : 0) + "/" +
          (vv ? Math.round(Number(vv.pageTop) || 0) : 0) + "/" +
          (vv ? Math.round(Number(vv.scale) || 0) : 0),
        "view: " + Math.round(viewRect.top) + "+" + Math.round(viewRect.height),
        "cmp: " + Math.round(composerRect.top) + "+" + Math.round(composerRect.height) +
          " ta: " + Math.round(taRect.top) + "+" + Math.round(taRect.height),
        "shell: " + (shellRect ? Math.round(shellRect.top) + "+" + Math.round(shellRect.height) : "n/a"),
        "body/doc: " +
          (bodyRect ? Math.round(bodyRect.top) + "+" + Math.round(bodyRect.height) : "n/a") +
          " / " +
          (docRect ? Math.round(docRect.top) + "+" + Math.round(docRect.height) : "n/a"),
        "scroll: " +
          Math.round((scrollEl && scrollEl.scrollTop) || 0) +
          " winY: " + Math.round(window.scrollY || 0),
        "tg: " +
          (tg ? "1" : "0") +
          " vh/vsh: " +
          (tg ? Math.round(Number(tg.viewportHeight) || 0) : 0) + "/" +
          (tg ? Math.round(Number(tg.viewportStableHeight) || 0) : 0),
        "css: safe=" + safeBottom + " chatSafe=" + chatSafeBottom,
        "active: " + keyboardLabActiveLabel()
      ].join("\n");
    } catch (eKbLabMetrics) {
      metricsEl.textContent = "keyboard-lab metrics error";
    }
  }
  function keyboardLabEnsureTicker() {
    if (ticker) return;
    ticker = window.setInterval(function () {
      keyboardLabUpdateMetrics("tick");
    }, 180);
  }
  function keyboardLabAppendBubble(text) {
    if (!text) return;
    var bubble = document.createElement("div");
    bubble.className = "keyboard-lab__bubble keyboard-lab__bubble--self";
    bubble.textContent = text;
    streamEl.appendChild(bubble);
    streamEl.scrollTop = streamEl.scrollHeight;
  }
  function keyboardLabAutosize() {
    textareaEl.style.height = "44px";
    var next = Math.max(44, Math.min(120, textareaEl.scrollHeight || 44));
    textareaEl.style.height = next + "px";
    keyboardLabUpdateMetrics("autosize");
  }
  textareaEl.addEventListener("input", function () {
    keyboardLabAutosize();
    keyboardLabUpdateMetrics("input");
  });
  textareaEl.addEventListener("focus", function () {
    keyboardLabEnsureTicker();
    keyboardLabUpdateMetrics("focus");
  });
  textareaEl.addEventListener("blur", function () {
    keyboardLabUpdateMetrics("blur");
  });
  textareaEl.addEventListener("touchstart", function () {
    keyboardLabEnsureTicker();
    keyboardLabUpdateMetrics("touch");
  }, { passive: true });
  sendBtnEl.addEventListener("click", function () {
    var value = (textareaEl.value || "").trim();
    if (!value) return;
    keyboardLabAppendBubble(value);
    textareaEl.value = "";
    keyboardLabAutosize();
    keyboardLabUpdateMetrics("send");
  });
  view.addEventListener("click", function (e) {
    if (e.target === view || e.target === streamEl) keyboardLabUpdateMetrics("view-click");
  });
  if (window.visualViewport && window.visualViewport.addEventListener) {
    window.visualViewport.addEventListener("resize", function () {
      keyboardLabEnsureTicker();
      keyboardLabUpdateMetrics("vv-resize");
    });
    window.visualViewport.addEventListener("scroll", function () {
      keyboardLabEnsureTicker();
      keyboardLabUpdateMetrics("vv-scroll");
    });
  }
  window.addEventListener("resize", function () {
    keyboardLabUpdateMetrics("win-resize");
  });
  window.addEventListener("scroll", function () {
    keyboardLabUpdateMetrics("win-scroll");
  }, true);
  keyboardLabAutosize();
  keyboardLabUpdateMetrics("init");
})();
