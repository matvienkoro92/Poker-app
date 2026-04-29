// Темы: тёмная / светлая / золотая клубная / неоновая
(function initTheme() {
  /** Сплошной слой под градиентом: при верхнем/нижнем overscroll WebView рисует именно его, не белый */
  var LIGHT_OVERSCROLL = "#fff7ed";
  var DARK_OVERSCROLL = "#0f172a";
  var GOLD_OVERSCROLL = "#05070d";
  var NEON_OVERSCROLL = "#020611";
  var LIGHT_GRAD =
    "linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fed7aa 100%)";
  var DARK_GRAD = "radial-gradient(circle at top, #0f172a 0, #020617 55%, #000 100%)";
  var GOLD_GRAD =
    "radial-gradient(circle at 18% 0%, rgba(180, 121, 34, 0.22), transparent 34%), radial-gradient(circle at 86% 12%, rgba(245, 158, 11, 0.12), transparent 36%), linear-gradient(145deg, #05070d 0%, #09111f 48%, #02040a 100%)";
  var NEON_GRAD =
    "radial-gradient(circle at 15% 8%, rgba(255, 38, 96, 0.22), transparent 30%), radial-gradient(circle at 82% 4%, rgba(34, 211, 238, 0.2), transparent 34%), radial-gradient(circle at 50% 92%, rgba(168, 85, 247, 0.16), transparent 38%), linear-gradient(145deg, #020611 0%, #071126 46%, #02030a 100%)";
  var DEFAULT_THEME = "gold";
  var THEMES = ["gold", "dark", "light", "neon"];
  function normalizeTheme(value) {
    return THEMES.indexOf(value) !== -1 ? value : DEFAULT_THEME;
  }
  function applyBg() {
    var current = normalizeTheme(document.documentElement.getAttribute("data-theme"));
    var isLight = current === "light";
    var isGold = current === "gold";
    var isNeon = current === "neon";
    var canvas = isLight ? LIGHT_OVERSCROLL : isGold ? GOLD_OVERSCROLL : isNeon ? NEON_OVERSCROLL : DARK_OVERSCROLL;
    var grad = isLight ? LIGHT_GRAD : isGold ? GOLD_GRAD : isNeon ? NEON_GRAD : DARK_GRAD;
    function paintRoot(el) {
      if (!el) return;
      el.style.background = "";
      el.style.backgroundColor = canvas;
      el.style.backgroundImage = grad;
    }
    paintRoot(document.documentElement);
    paintRoot(document.body);
    paintRoot(document.getElementById("app"));
  }
  var stored = localStorage.getItem("poker_theme");
  var theme = normalizeTheme(stored);
  document.documentElement.setAttribute("data-theme", theme);
  applyBg();
  var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  if (tg && tg.setBackgroundColor) {
    tg.setBackgroundColor(theme === "light" ? LIGHT_OVERSCROLL : theme === "gold" ? GOLD_OVERSCROLL : theme === "neon" ? NEON_OVERSCROLL : DARK_OVERSCROLL);
  }
  var btn = document.getElementById("themeToggle");
  if (btn) {
    function syncThemeButton() {
      btn.setAttribute("data-theme-current", theme);
      btn.title = theme === "dark" ? "Тема: тёмная" : theme === "light" ? "Тема: светлая" : theme === "gold" ? "Тема: золотая" : "Тема: неон";
      btn.setAttribute("aria-label", btn.title);
    }
    syncThemeButton();
    btn.addEventListener("click", function () {
      var idx = THEMES.indexOf(theme);
      theme = THEMES[(idx + 1) % THEMES.length];
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("poker_theme", theme);
      syncThemeButton();
      applyBg();
      if (tg && tg.setBackgroundColor) tg.setBackgroundColor(theme === "light" ? LIGHT_OVERSCROLL : theme === "gold" ? GOLD_OVERSCROLL : theme === "neon" ? NEON_OVERSCROLL : DARK_OVERSCROLL);
    });
  }
})();

function pokerPushOpenDebug(step, extra) {}

function pokerPushOpenSetCaller(label) {}

function pokerPushOpenConsumeCaller() {
  return "";
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

(function initRadioToggle() {
  var radio = document.getElementById("chillRadio");
  var btn = document.getElementById("radioToggle");
  if (!radio || !btn) return;
  var STATIONS = {
    chill: "https://ice2.somafm.com/groovesalad-128-mp3",
    lounge: "https://ice5.somafm.com/illstreet-128-mp3",
    "90s": "https://nostalgiafm.hostingradio.ru:8014/nostalgiafm.mp3",
    radio7: "https://stream.rcast.net/263744"
  };
  var MODES = ["", "chill", "lounge", "90s", "radio7"];
  function getMode() {
    var m = localStorage.getItem("chill_radio_mode") || "";
    return MODES.indexOf(m) >= 0 ? m : "";
  }
  var shortLabels = { "": "Выкл", chill: "Чил", lounge: "Lounge", "90s": "90е РФ", radio7: "Радио7" };
  function setMode(mode) {
    localStorage.setItem("chill_radio_mode", mode);
    btn.classList.remove("radio-toggle--chill", "radio-toggle--lounge", "radio-toggle--90s", "radio-toggle--radio7");
    if (mode === "chill") btn.classList.add("radio-toggle--chill");
    if (mode === "lounge") btn.classList.add("radio-toggle--lounge");
    if (mode === "90s") btn.classList.add("radio-toggle--90s");
    if (mode === "radio7") btn.classList.add("radio-toggle--radio7");
    var labelEl = btn.querySelector(".radio-toggle__label");
    if (labelEl) labelEl.textContent = shortLabels[mode] !== undefined ? shortLabels[mode] : shortLabels[""];
    var listenEl = document.getElementById("radioToggleListen");
    if (listenEl) {
      listenEl.setAttribute("aria-hidden", mode ? "false" : "true");
    }
    var titles = { "": "Радио: выкл", chill: "Радио: чил", lounge: "Радио: Lounge", "90s": "Радио: русские 90‑е", radio7: "Радио 7 на семи холмах" };
    btn.title = titles[mode] || titles[""];
    btn.setAttribute("aria-label", btn.title);
  }
  function applyAndPlay(mode) {
    setMode(mode);
    if (!mode) {
      radio.pause();
      radio.removeAttribute("src");
      return;
    }
    var url = STATIONS[mode];
    if (url) {
      radio.src = url;
      var p = radio.play();
      if (p && typeof p.then === "function") p.catch(function () {});
    }
  }
  setMode(getMode());
  if (getMode()) {
    radio.src = STATIONS[getMode()];
    var p = radio.play();
    if (p && typeof p.then === "function") p.catch(function () {});
  }
  var firstPlayHintKey = "poker_radio_first_play_hint";
  btn.addEventListener("click", function () {
    var cur = getMode();
    var idx = MODES.indexOf(cur);
    var next = MODES[(idx + 1) % MODES.length];
    applyAndPlay(next);
    if (next && !cur && !localStorage.getItem(firstPlayHintKey)) {
      try {
        localStorage.setItem(firstPlayHintKey, "1");
      } catch (e) {}
      alert("Если радио не играет, подождите немного.");
    }
  });
})();

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

/** Лайтбокс скринов топ‑15: слушатели ×/«Назад» должны быть до первого открытия из зала славы (раньше они вешались только из initWinterRating при заходе в рейтинг зимы/весны). */
function tryInitWinterRatingLightboxEarly() {
  try {
    if (typeof initWinterRatingLightbox === "function") initWinterRatingLightbox();
  } catch (e) {
    if (typeof console !== "undefined" && console.warn) console.warn("initWinterRatingLightbox early", e);
  }
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    runGazetteAndTasksInit();
    updateSpringRatingPromoDateFromVar();
    tryInitWinterRatingLightboxEarly();
  });
} else {
  runGazetteAndTasksInit();
  updateSpringRatingPromoDateFromVar();
  tryInitWinterRatingLightboxEarly();
}

setTimeout(function () {
  if (typeof fetchRaffleBadge === "function") fetchRaffleBadge();
}, 300);

// Восстановление скролла при «Назад» (чтобы body не оставался overflow: hidden после модалок)
window.addEventListener("popstate", function () {
  try {
    if (typeof pokerClearBodyDocumentScrollLockInline === "function") pokerClearBodyDocumentScrollLockInline();
  } catch (ePop) {}
});

// Логика кнопки "Начать игру"
const startButton = document.getElementById("startButton");

if (startButton) {
  startButton.addEventListener("click", () => {
    if (tg) {
      tg.HapticFeedback && tg.HapticFeedback.impactOccurred("medium");
      tg.sendData(JSON.stringify({ action: "enter_club" }));
    } else {
      console.log("Start club mini app (local preview mode)");
      alert(
        "Здесь будет переход к лобби клуба «Два туза». В Telegram Mini App кнопка отправит событие боту."
      );
    }
  });
}



function updateRaffleBadge(hasActive) {
  var badge = document.getElementById("raffleActiveBadge");
  if (badge) {
    badge.classList.toggle("feature__badge--hidden", !hasActive);
    badge.setAttribute("aria-hidden", hasActive ? "false" : "true");
  }
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("poker_raffle_active_badge", hasActive ? "1" : "0");
    }
  } catch (eRaffleHint) {}
  var cache = (typeof window !== "undefined" && window._rafflesCache && window._rafflesCache.data && window._rafflesCache.data.activeRaffle) ? window._rafflesCache.data.activeRaffle : null;
  var hasTournamentDayTickets = false;
  if (cache) {
    var title = (cache.title || "").toLowerCase();
    if (title.indexOf("турнир дня") !== -1) {
      hasTournamentDayTickets = true;
    } else if (Array.isArray(cache.groups)) {
      for (var i = 0; i < cache.groups.length; i++) {
        var g = cache.groups[i];
        if (g && typeof g.prize === "string" && g.prize.toLowerCase().indexOf("турнир дня") !== -1) {
          hasTournamentDayTickets = true;
          break;
        }
      }
    }
  }
  // Кнопку "Розыгрыш 30 билетов" убрали из главной.
}



document.addEventListener("click", function (e) {
  var hereBtn = e.target && e.target.closest ? e.target.closest(".cashout-manager-btn--here[data-cashout-chat-user-id]") : null;
  if (hereBtn) {
    e.preventDefault();
    var userId = hereBtn.getAttribute("data-cashout-chat-user-id");
    var userName = hereBtn.getAttribute("data-cashout-chat-user-name") || "Менеджер";
    if (userId && typeof setView === "function") {
      window.__pendingOpenManagerFromCashout = { userId: userId, userName: userName };
      setView("chat");
    }
    return;
  }
  var tgBtn = e.target && e.target.closest ? e.target.closest("a.cashout-manager-btn--tg[href^=\"https://t.me/\"]") : null;
  if (tgBtn) {
    var href = tgBtn.getAttribute("href");
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (href && tg && tg.openLink) {
      e.preventDefault();
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      tg.openLink(href);
    }
  }
});

document.addEventListener("click", function (e) {
  var btn = e.target && e.target.closest ? e.target.closest("#pokerTasksStartBtn") : null;
  if (!btn) return;
  e.preventDefault();
  e.stopPropagation();
  if (typeof window.startMttChallenge === "function") {
    window.startMttChallenge();
  } else {
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (tg && tg.showAlert) tg.showAlert("Задачи ещё загружаются. Обновите страницу."); else alert("Задачи ещё загружаются. Обновите страницу.");
  }
}, true);

// Розыгрыши: список, создание (админ), участие, жеребьёвка

// Счётчик уникальных и повторных посетителей (стабильный ID: Telegram → localStorage → sessionStorage)
function getVisitorId() {
  const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  if (tg && tg.initData) {
    const params = new URLSearchParams(tg.initData);
    const userStr = params.get("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.id) return "tg_" + user.id;
      } catch (e) {}
    }
  }
  /* Часть клиентов TG отдаёт user в initDataUnsafe раньше или без подписанной строки initData */
  if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user && tg.initDataUnsafe.user.id != null) {
    return "tg_" + tg.initDataUnsafe.user.id;
  }
  try {
    var _auth = window.__pokerTelegramAuth;
    if (_auth && _auth.user && _auth.user.id != null && (_auth.status === "verified" || _auth.status === "dev_skip")) {
      if (_auth.user.memberId != null && String(_auth.user.memberId).trim() !== "") return String(_auth.user.memberId).trim();
      return "tg_" + _auth.user.id;
    }
  } catch (eAuth) {}
  try {
    let id = localStorage.getItem("poker_visitor_id");
    if (id) return id;
    id = sessionStorage.getItem("poker_visitor_id");
    if (id) {
      try { localStorage.setItem("poker_visitor_id", id); } catch (e) {}
      return id;
    }
    id = "w_" + Date.now() + "_" + Math.random().toString(36).slice(2, 12);
    try { localStorage.setItem("poker_visitor_id", id); } catch (e) {}
    sessionStorage.setItem("poker_visitor_id", id);
    return id;
  } catch (e) {
    return "w_" + Date.now() + "_" + Math.random().toString(36).slice(2, 12);
  }
}

// Эквилятор: расчёт эквити (Монте-Карло + оценка руки)


(function pokerTrackVisitorOnceWithTelegramIdFix() {
  var v0 = typeof getVisitorId === "function" ? getVisitorId() : "";
  updateVisitorCounter();
  if (typeof isTelegramWebApp !== "function" || !isTelegramWebApp()) return;
  if (v0 && String(v0).indexOf("tg_") === 0) return;
  var start = Date.now();
  var upgraded = false;
  function tick() {
    if (upgraded) return;
    var v1 = typeof getVisitorId === "function" ? getVisitorId() : "";
    if (v1 && v1 !== v0 && String(v1).indexOf("tg_") === 0) {
      upgraded = true;
      updateVisitorCounter();
      return;
    }
    if (Date.now() - start < 3200) setTimeout(tick, 220);
  }
  setTimeout(tick, 200);
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

if (typeof initChat === "function") initChat();
if (typeof initPokerShowsPlayer === "function") initPokerShowsPlayer();

(function preinitChat() {
  var idle = window.requestIdleCallback || function (cb) { setTimeout(cb, 150); };
  idle(function () {
    if (window.chatListenersAttached) return;
    if (typeof initChat === "function") initChat();
  });
})();
