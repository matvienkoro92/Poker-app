function pokerPushOpenDebug(step, extra) {}

function pokerPushOpenSetCaller(label) {
  try {
    window.__pokerPushOpenCaller = label ? String(label) : "";
    window.__pokerPushOpenCallerAt = Date.now();
  } catch (e) {}
}

function pokerPushOpenConsumeCaller() {
  try {
    var label = window.__pokerPushOpenCaller ? String(window.__pokerPushOpenCaller) : "";
    var at = Number(window.__pokerPushOpenCallerAt || 0);
    window.__pokerPushOpenCaller = "";
    window.__pokerPushOpenCallerAt = 0;
    if (label && at && Date.now() - at > 2500) return "";
    return label;
  } catch (e) {
    return "";
  }
}

function pokerPushOpenStateDebug(step, extra) {}

function pokerPushOpenTraceTransition(step, extra) {}

/**
 * Автовысота textarea. Варианты, с которыми боремся в Telegram / iOS WKWebView:
 * - height:auto + scrollHeight у самого поля — часто +1 «фантомная» строка;
 * - height:0 + scrollHeight — лучше, но на части WebView всё ещё завышает;
 * - скрытый div с той же шириной колонки текста, font/line-height/padding/border — стабильный замер переносов;
 * - в Mini App дополнительный замер в requestAnimationFrame — догоняет ширину после раскладки/клавиатуры.
 */
function pokerAutosizeTextarea(ta, opts) {
  opts = opts || {};
  var maxH = opts.maxHeight != null && opts.maxHeight > 0 ? opts.maxHeight : 140;
  var minH = opts.minHeight != null && opts.minHeight > 0 ? opts.minHeight : 0;
  if (!ta || ta.nodeName !== "TEXTAREA") return;
  var win = ta.ownerDocument.defaultView || window;
  var doc = ta.ownerDocument;
  var mirrorId = "poker-textarea-autosize-mirror";
  var mirror = doc.getElementById(mirrorId);
  if (!mirror) {
    mirror = doc.createElement("div");
    mirror.id = mirrorId;
    mirror.setAttribute("aria-hidden", "true");
    mirror.style.cssText =
      "position:fixed;left:0;top:0;visibility:hidden;pointer-events:none;z-index:-9999;" +
      "overflow:hidden;white-space:pre-wrap;box-sizing:border-box;";
    doc.body.appendChild(mirror);
  }
  function measureApply() {
    var cs = win.getComputedStyle(ta);
    mirror.style.width = Math.max(1, ta.offsetWidth) + "px";
    mirror.style.boxSizing = cs.boxSizing || "border-box";
    mirror.style.padding = cs.padding;
    mirror.style.border = cs.border;
    var fSh = cs.font != null ? String(cs.font).trim() : "";
    if (fSh) mirror.style.font = cs.font;
    else {
      mirror.style.fontSize = cs.fontSize;
      mirror.style.fontFamily = cs.fontFamily;
      mirror.style.fontWeight = cs.fontWeight;
      mirror.style.fontStyle = cs.fontStyle;
    }
    mirror.style.lineHeight = cs.lineHeight;
    mirror.style.direction = cs.direction;
    mirror.style.letterSpacing = cs.letterSpacing;
    mirror.style.textTransform = cs.textTransform;
    mirror.style.wordBreak = cs.wordBreak;
    mirror.style.overflowWrap = cs.overflowWrap;
    try {
      mirror.style.tabSize = cs.tabSize;
    } catch (eTs) {}
    var val = ta.value;
    if (!val) {
      mirror.textContent = "\u00a0";
    } else if (val.slice(-1) === "\n") {
      mirror.textContent = val + "\u00a0";
    } else {
      mirror.textContent = val;
    }
    var h = mirror.scrollHeight;
    if (!(h > 0) || !isFinite(h)) h = minH;
    if (minH > 0 && h < minH) h = minH;
    ta.style.overflowY = "hidden";
    if (h > maxH) {
      ta.style.height = maxH + "px";
      ta.style.overflowY = "auto";
    } else {
      ta.style.height = h + "px";
    }
  }
  measureApply();
  var skipTelegramChatRemeasure = false;
  try {
    skipTelegramChatRemeasure =
      !!(
        win.Telegram &&
        win.Telegram.WebApp &&
        doc &&
        doc.documentElement &&
        doc.documentElement.classList &&
        doc.documentElement.classList.contains("app--telegram-miniapp") &&
        ta &&
        typeof ta.closest === "function" &&
        ta.closest('.view[data-view="chat"]')
      );
  } catch (eSkipRaf) {}
  if (win.Telegram && win.Telegram.WebApp && !skipTelegramChatRemeasure) {
    var raf = win.requestAnimationFrame || function (fn) {
      setTimeout(fn, 16);
    };
    raf(function () {
      measureApply();
    });
  }
}

/** Оверлей загрузки: показать ошибку сети и кнопку «Повторить» (если оверлей ещё виден). Возвращает true, если панель переключена. */
function pokerTryBootOverlayNetworkError(message) {
  try {
    var el = document.getElementById("appBootOverlay");
    if (!el || el.classList.contains("app-boot-overlay--hidden")) return false;
    var main = document.getElementById("appBootOverlayMain");
    var errPanel = document.getElementById("appBootOverlayErrorPanel");
    var errMsg = document.getElementById("appBootOverlayErrMsg");
    if (!errPanel || !errMsg) return false;
    el.classList.add("app-boot-overlay--error");
    errMsg.textContent =
      message ||
      "Нет связи или таймаут. Проверьте интернет и нажмите «Повторить».";
    errPanel.hidden = false;
    if (main) main.hidden = true;
    el.setAttribute("aria-busy", "false");
    return true;
  } catch (eOv) {
    return false;
  }
}

function pokerResetBootOverlayLoading() {
  try {
    var el = document.getElementById("appBootOverlay");
    if (!el) return;
    var main = document.getElementById("appBootOverlayMain");
    var errPanel = document.getElementById("appBootOverlayErrorPanel");
    el.classList.remove("app-boot-overlay--error");
    if (errPanel) errPanel.hidden = true;
    if (main) {
      main.hidden = false;
      var t = main.querySelector(".app-boot-overlay__conn-title");
      if (t) t.textContent = "Соединение";
      var st = document.getElementById("appBootOverlayStatusText");
      if (st) st.textContent = "Загружаем интерфейс…";
    }
    el.setAttribute("aria-busy", "true");
  } catch (eR) {}
}

window.pokerTryBootOverlayNetworkError = pokerTryBootOverlayNetworkError;
window.pokerResetBootOverlayLoading = pokerResetBootOverlayLoading;

function pokerMaybeRememberMemberIdFromUser(user) {
  try {
    if (!user || user.id == null) return;
    if (user.memberId != null && String(user.memberId).trim() !== "") {
      pokerRememberLastMemberId(String(user.memberId).trim());
      return;
    }
    var raw = String(user.id).trim();
    if (!raw) return;
    if (raw.indexOf("tg_") === 0 || raw.indexOf("vk_") === 0) {
      pokerRememberLastMemberId(raw);
      return;
    }
    if (user.is_vk || user.vk) pokerRememberLastMemberId("vk_" + raw);
    else pokerRememberLastMemberId("tg_" + raw);
  } catch (e) {}
}
function pokerRememberTransportMemberIdFromEnvironment() {
  try {
    var resolved = typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser() : null;
    if (resolved && resolved.id != null) {
      pokerMaybeRememberMemberIdFromUser(resolved);
      if (pokerReadLastMemberIdHint()) return;
    }
  } catch (eResolved) {}
  try {
    var wtg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    var wu = wtg && wtg.initDataUnsafe && wtg.initDataUnsafe.user;
    if (wu && wu.id != null) {
      pokerRememberLastMemberId("tg_" + String(wu.id));
      return;
    }
  } catch (eTgUnsafe) {}
}
(function pokerBootstrapTransportMemberHint() {
  function tick() {
    try {
      pokerRememberTransportMemberIdFromEnvironment();
    } catch (eTick) {}
  }
  tick();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", tick, { once: true });
  }
  var attempts = 0;
  var timer = setInterval(function () {
    attempts += 1;
    tick();
    try {
      if (pokerReadLastMemberIdHint() || attempts >= 20) clearInterval(timer);
    } catch (eStop) {
      if (attempts >= 20) clearInterval(timer);
    }
  }, 500);
})();
