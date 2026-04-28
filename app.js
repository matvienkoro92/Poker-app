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
  var THEMES = ["dark", "light", "gold", "neon"];
  function normalizeTheme(value) {
    return THEMES.indexOf(value) !== -1 ? value : "dark";
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

/** Единый текст при проблемах с сетью (показываем пользователю) */
var POKER_NET_ERR =
  "Нет связи с сервером. Проверьте интернет и попробуйте снова или перезайдите в приложение.";

/** Таймаут одного HTTP-запроса (мс): обрывает «зависшие» соединения без смены Wi‑Fi/LTE. */
var POKER_FETCH_TIMEOUT_MS = 20000;

function pokerPushOpenDebug(step, extra) {}

function pokerPushOpenSetCaller(label) {}

function pokerPushOpenConsumeCaller() {
  return "";
}

function pokerPushOpenStateDebug(step, extra) {}

function pokerPushOpenTraceTransition(step, extra) {}

/**
 * fetch с таймаутом (AbortController). Не дублирует signal из init — перезапись signal.
 */
function pokerFetchWithTimeout(url, init, timeoutMs) {
  var ms = timeoutMs != null && timeoutMs > 0 ? timeoutMs : POKER_FETCH_TIMEOUT_MS;
  var ac = new AbortController();
  var timer = setTimeout(function () {
    try {
      ac.abort();
    } catch (eAb) {}
  }, ms);
  var baseInit = init || {};
  var merged = {};
  var k;
  for (k in baseInit) {
    if (Object.prototype.hasOwnProperty.call(baseInit, k)) merged[k] = baseInit[k];
  }
  merged.signal = ac.signal;
  return fetch(url, merged).finally(function () {
    try {
      clearTimeout(timer);
    } catch (eCl) {}
  });
}

/**
 * Повтор при сетевой ошибке / таймауте / abort (1 попытка + повторы).
 * Успешный HTTP-ответ не разбирается — возвращается как у fetch.
 */
function pokerFetchRetry(url, init, opts) {
  opts = opts || {};
  var timeoutMs = opts.timeoutMs != null && opts.timeoutMs > 0 ? opts.timeoutMs : POKER_FETCH_TIMEOUT_MS;
  var maxAttempts = opts.maxAttempts != null && opts.maxAttempts > 0 ? opts.maxAttempts : 3;
  var retryDelayMs = opts.retryDelayMs != null && opts.retryDelayMs >= 0 ? opts.retryDelayMs : 650;
  function sleep(d) {
    return new Promise(function (resolve) {
      setTimeout(resolve, d);
    });
  }
  function run(attemptIndex) {
    return pokerFetchWithTimeout(url, init, timeoutMs).catch(function (err) {
      if (attemptIndex + 1 < maxAttempts) {
        return sleep(retryDelayMs * (attemptIndex + 1)).then(function () {
          return run(attemptIndex + 1);
        });
      }
      return Promise.reject(err);
    });
  }
  return run(0);
}

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

function getAssetUrl(relativePath) {
  try {
    var base = typeof document !== "undefined" && document.baseURI ? document.baseURI : (typeof location !== "undefined" && location.href) || "";
    if (!base) return "./assets/" + relativePath;
    var href = new URL("assets/" + relativePath, base).href;
    return href || "./assets/" + relativePath;
  } catch (e) {
    return "./assets/" + relativePath;
  }
}

// Лайтбокс: одиночные фото + галереи (МТТ 6 скринов, ученики тренера, сетка отзывов) со стрелками и ←/→
(function initImageLightbox() {
  var lightbox = document.getElementById("imageLightbox");
  var lightboxImg = lightbox ? lightbox.querySelector(".image-lightbox__img") : null;
  var lightboxCaption = lightbox ? lightbox.querySelector(".image-lightbox__caption") : null;
  var backdrop = lightbox ? lightbox.querySelector(".image-lightbox__backdrop") : null;
  var closeBtn = lightbox ? lightbox.querySelector(".image-lightbox__close") : null;
  var prevBtn = lightbox ? lightbox.querySelector(".image-lightbox__prev") : null;
  var nextBtn = lightbox ? lightbox.querySelector(".image-lightbox__next") : null;
  var counterEl = lightbox ? lightbox.querySelector(".image-lightbox__counter") : null;
  if (!lightbox || !lightboxImg) return;

  var galleryList = null;
  var galleryIndex = 0;

  function syncGalleryNav() {
    var multi = galleryList && galleryList.length > 1;
    if (prevBtn) {
      prevBtn.hidden = !multi;
      prevBtn.disabled = !multi || galleryIndex <= 0;
    }
    if (nextBtn) {
      nextBtn.hidden = !multi;
      nextBtn.disabled = !multi || galleryIndex >= (galleryList ? galleryList.length - 1 : 0);
    }
    if (counterEl) counterEl.textContent = multi ? galleryIndex + 1 + " / " + galleryList.length : "";
  }

  function setLightboxCaption(text) {
    if (!lightboxCaption) return;
    var cap = text != null ? String(text).replace(/\s+/g, " ").trim() : "";
    if (cap) {
      lightboxCaption.textContent = cap;
      lightboxCaption.hidden = false;
    } else {
      lightboxCaption.textContent = "";
      lightboxCaption.hidden = true;
    }
  }

  function showGallerySlide() {
    if (!galleryList || !galleryList.length) return;
    var item = galleryList[galleryIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt ? item.alt : "Фото";
    setLightboxCaption(item.caption);
    syncGalleryNav();
  }

  function openSingle(src, alt, caption, fromAvatar) {
    galleryList = null;
    galleryIndex = 0;
    lightboxImg.src = src;
    var a = alt != null ? String(alt).trim() : "";
    lightboxImg.alt = a ? a : "Увеличено";
    setLightboxCaption(caption);
    syncGalleryNav();
    lightbox.classList.toggle("image-lightbox--avatar-preview", !!fromAvatar);
    lightbox.classList.add("image-lightbox--open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function getAvatarPreviewSrc(img) {
    if (!img) return "";
    return img.getAttribute("data-avatar-full") || img.currentSrc || img.src || "";
  }

  function openGallery(items, startIndex) {
    var arr = (items || []).filter(function (x) {
      return x && x.src;
    });
    if (!arr.length) return;
    lightbox.classList.remove("image-lightbox--avatar-preview");
    galleryList = arr;
    var si = startIndex == null || isNaN(Number(startIndex)) ? 0 : Number(startIndex);
    galleryIndex = Math.max(0, Math.min(si, arr.length - 1));
    showGallerySlide();
    lightbox.classList.add("image-lightbox--open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function openGalleryFromNodeList(imgs, clicked) {
    var arr = [];
    var idx = 0;
    for (var i = 0; i < imgs.length; i++) {
      var im = imgs[i];
      if (!im || !im.src) continue;
      if (clicked && im === clicked) idx = arr.length;
      arr.push({ src: im.src, alt: im.alt ? String(im.alt).trim() : "" });
    }
    openGallery(arr, idx);
  }

  function closeLightbox() {
    galleryList = null;
    galleryIndex = 0;
    lightbox.classList.remove("image-lightbox--open");
    lightbox.classList.remove("image-lightbox--avatar-preview");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.removeAttribute("src");
    setLightboxCaption("");
    syncGalleryNav();
  }

  function stepGallery(delta) {
    if (!galleryList || galleryList.length < 2) return;
    var n = galleryIndex + delta;
    if (n < 0 || n >= galleryList.length) return;
    galleryIndex = n;
    showGallerySlide();
  }

  if (backdrop) backdrop.addEventListener("click", closeLightbox);
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) {
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      stepGallery(-1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      stepGallery(1);
    });
  }
  /* В списке чатов клик по аватарке должен открывать сам диалог, а не лайтбокс. */
  document.body.addEventListener(
    "click",
    function (e) {
      var t = e.target;
      if (!t || !t.classList || !t.classList.contains("chat-contact__avatar") || !t.src) return;
      if (!t.closest || !t.closest(".chat-contact")) return;
      var rowBtn = t.closest(".chat-contact");
      if (rowBtn && typeof rowBtn.click === "function") {
        e.preventDefault();
        e.stopPropagation();
        rowBtn.click();
      }
    },
    true
  );
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("image-lightbox--open")) return;
    if (e.key === "Escape") {
      closeLightbox();
      return;
    }
    if (!galleryList || galleryList.length < 2) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      stepGallery(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      stepGallery(1);
    }
  });

  document.body.addEventListener("click", function (e) {
    var t = e.target;
    var hallAlb = t.closest && t.closest(".hall-photo-album__btn");
    if (hallAlb) {
      var himg = hallAlb.querySelector("img");
      var hallGrid = hallAlb.closest(".hall-photo-album__grid");
      if (himg && himg.src && hallGrid) {
        e.preventDefault();
        var hallBtns = hallGrid.querySelectorAll(".hall-photo-album__btn");
        var hallArr = [];
        var hallIdx = 0;
        for (var hbi = 0; hbi < hallBtns.length; hbi++) {
          var hb = hallBtns[hbi];
          var him = hb.querySelector("img");
          if (!him || !him.src) continue;
          if (hb === hallAlb) hallIdx = hallArr.length;
          var hBody = hb.parentElement;
          var hCapEl = hBody && hBody.querySelector(".hall-photo-album__caption");
          var hCap = hCapEl ? String(hCapEl.textContent || "").replace(/\s+/g, " ").trim() : "";
          hallArr.push({
            src: him.src,
            alt: him.alt ? String(him.alt).trim() : "",
            caption: hCap,
          });
        }
        if (hallArr.length) openGallery(hallArr, hallIdx);
      } else if (himg && himg.src) {
        e.preventDefault();
        var soloBody = hallAlb.parentElement;
        var soloCapEl = soloBody && soloBody.querySelector(".hall-photo-album__caption");
        var soloCap = soloCapEl ? String(soloCapEl.textContent || "").replace(/\s+/g, " ").trim() : "";
        openSingle(himg.src, himg.alt, soloCap);
      }
      return;
    }
    var shameTh = t.closest && t.closest(".hall-shame-board__thumb-btn");
    if (shameTh) {
      var sImg = shameTh.querySelector("img");
      if (sImg && sImg.src) {
        e.preventDefault();
        openSingle(sImg.src);
      }
      return;
    }
    var gazetteArticleOut = t.closest && t.closest("a[data-gazette-article-link]");
    if (
      gazetteArticleOut &&
      !gazetteArticleOut.closest("#gazetteModal") &&
      typeof window.openGazette === "function"
    ) {
      e.preventDefault();
      var gIdx = gazetteArticleOut.getAttribute("data-gazette-article-link");
      var gNum = gIdx ? parseInt(gIdx, 10) : NaN;
      window.openGazette("news", isNaN(gNum) ? undefined : gNum);
      return;
    }
    var mttGrid = t.closest && t.closest(".video-lessons__mtt-grid");
    if (t.nodeName === "IMG" && mttGrid && t.src) {
      e.preventDefault();
      openGalleryFromNodeList(mttGrid.querySelectorAll("img"), t);
      return;
    }
    var coachGal = t.closest && t.closest(".video-lessons__coach-student-gallery");
    if (t.nodeName === "IMG" && coachGal && t.src) {
      e.preventDefault();
      openGalleryFromNodeList(coachGal.querySelectorAll("img"), t);
      return;
    }
    var revGrid = t.closest && t.closest(".video-lessons__coach-reviews-grid");
    if (t.nodeName === "IMG" && revGrid && t.src) {
      e.preventDefault();
      openGalleryFromNodeList(revGrid.querySelectorAll("img"), t);
      return;
    }
    if (t.classList && t.classList.contains("chat-msg__image") && t.src) {
      e.preventDefault();
      openSingle(t.src);
      return;
    }
    if (t.classList && t.classList.contains("chat-msg__avatar") && t.src) {
      e.preventDefault();
      openSingle(getAvatarPreviewSrc(t), t.alt, "", true);
      return;
    }
    if (t.classList && t.classList.contains("chat-pinned-self__thumb") && t.src) {
      e.preventDefault();
      openSingle(t.src, t.alt, "", true);
      return;
    }
    if (t.classList && t.classList.contains("chat-contact__avatar") && t.src && !(t.closest && t.closest(".chat-contact"))) {
      e.preventDefault();
      e.stopPropagation();
      openSingle(getAvatarPreviewSrc(t), t.alt, "", true);
    }
  });
  document.body.addEventListener("click", function (e) {
    var link = e.target && e.target.closest ? e.target.closest(".chat-msg__tg-link, .chat-msg__link") : null;
    if (!link || !link.href) return;
    e.preventDefault();

    // Внутренние ссылки с параметром startapp — не открываем приложение заново,
    // а переключаемся внутри текущего web-app.
    try {
      var urlObj = new URL(link.href, window.location.href);
      var sp = new URLSearchParams(urlObj.search || "");
      var startApp = pokerNormalizeWebAppStartParam(pokerStartAppQueryFromUrlSearchParams(sp));
      if (startApp === "raffles" && typeof setView === "function") {
        setView("raffles");
        return;
      }
      if (startApp === "video_lessons" && typeof setView === "function") {
        setView("video-lessons");
        return;
      }
      if (
        (startApp === "vl_reviews_nikolay" || startApp === "video_lessons_reviews_nikolay") &&
        typeof setView === "function"
      ) {
        window.__pendingVideoLessonsOpenReviews = true;
        setView("video-lessons");
        return;
      }
      if (startApp === "club_chat" && typeof setView === "function") {
        window.__pendingOpenClubChatGeneral = true;
        setView("chat");
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
        return;
      }
      if (startApp === "club_chat_dm" && typeof setView === "function") {
        var peerDm = (sp.get("with") || "").trim();
        if (peerDm) {
          window.__pendingOpenChatPersonalFromDeepLink = {
            userId: peerDm,
            userName: null,
            peerP21Id: null,
          };
        }
        setView("chat");
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
        return;
      }
      var hallFromLink = resolveHallFameSectionFromStartParam(startApp);
      if (hallFromLink && typeof navigateToHallFameSection === "function") {
        navigateToHallFameSection(hallFromLink);
        return;
      }
      if (startApp && (startApp === "news" || startApp.indexOf("news_") === 0) && typeof openGazette === "function") {
        var articleNum = startApp === "news" ? undefined : parseInt(startApp.replace("news_", ""), 10);
        if (startApp !== "news" && (Number.isNaN(articleNum) || articleNum < 0)) articleNum = undefined;
        openGazette("news", articleNum);
        return;
      }
      if (startApp && (startApp === "spring_rating_league_1" || startApp === "spring_rating_league_2") && typeof setView === "function") {
        var leagueNum = startApp === "spring_rating_league_1" ? "1" : "2";
        setView("spring-rating");
        setTimeout(function () {
          if (typeof window.switchSpringRatingMainTab === "function") window.switchSpringRatingMainTab(leagueNum);
        }, 400);
        return;
      }
    } catch (ignore) {}

    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (link.classList && link.classList.contains("chat-msg__tg-link") && tg && tg.openTelegramLink) {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      tg.openTelegramLink(link.href);
    } else if (tg && tg.openLink) {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      tg.openLink(link.href);
    } else {
      window.open(link.href, "_blank", "noopener,noreferrer");
    }
  });

  var pdfViewer = document.getElementById("pdfViewer");
  var pdfViewerIframe = document.getElementById("pdfViewerIframe");
  var pdfViewerBackdrop = pdfViewer ? pdfViewer.querySelector(".pdf-viewer__backdrop") : null;
  var pdfViewerClose = pdfViewer ? pdfViewer.querySelector(".pdf-viewer__close") : null;
  function openPdfViewer(url) {
    if (!pdfViewer || !pdfViewerIframe) return;
    pdfViewerIframe.src = url;
    pdfViewer.classList.add("pdf-viewer--open");
    pdfViewer.setAttribute("aria-hidden", "false");
  }
  function closePdfViewer() {
    if (!pdfViewer || !pdfViewerIframe) return;
    pdfViewer.classList.remove("pdf-viewer--open");
    pdfViewer.setAttribute("aria-hidden", "true");
    pdfViewerIframe.removeAttribute("src");
  }
  if (pdfViewer && pdfViewerIframe) {
    if (pdfViewerBackdrop) pdfViewerBackdrop.addEventListener("click", closePdfViewer);
    if (pdfViewerClose) pdfViewerClose.addEventListener("click", closePdfViewer);
    window.closePdfViewer = closePdfViewer;
  }

  var POKER_BLOB_DOWNLOAD_CLEANUP_MS = 180000;
  function pokerHiddenDownloadAnchorStyle() {
    /* Не off-screen display:none: часть WebView режет программный клик; не revoke сразу — iOS срывает «Сохранить». */
    return "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0.01;pointer-events:none;";
  }
  function pokerSaveBlobAsFileDownload(blob, fileName) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = (fileName && String(fileName).trim()) || "document.pdf";
    a.rel = "noopener";
    a.style.cssText = pokerHiddenDownloadAnchorStyle();
    document.body.appendChild(a);
    try {
      a.click();
    } catch (eClick) {
      try {
        document.body.removeChild(a);
      } catch (eRm0) {}
      try {
        URL.revokeObjectURL(url);
      } catch (eRv0) {}
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.showAlert)
        window.Telegram.WebApp.showAlert("Не удалось скачать. Попробуйте ещё раз.");
      return;
    }
    setTimeout(function () {
      try {
        document.body.removeChild(a);
      } catch (eRmA) {}
      try {
        URL.revokeObjectURL(url);
      } catch (eRv) {}
    }, POKER_BLOB_DOWNLOAD_CLEANUP_MS);
  }
  /** Скачивание PDF из чата: нативный download в том же жесте пользователя, без раннего revokeObjectURL. */
  function pokerTriggerChatPdfDownload(href, fileName) {
    var name = (fileName && String(fileName).trim()) || "document.pdf";
    var failAlert = function () {
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.showAlert)
        window.Telegram.WebApp.showAlert("Не удалось скачать. Попробуйте ещё раз.");
    };
    if (!href) {
      failAlert();
      return false;
    }
    href = String(href);
    try {
      if (href.indexOf("blob:") === 0) {
        var ab = document.createElement("a");
        ab.href = href;
        ab.download = name;
        ab.rel = "noopener";
        ab.style.cssText = pokerHiddenDownloadAnchorStyle();
        document.body.appendChild(ab);
        try {
          ab.click();
        } catch (eBl) {
          try {
            document.body.removeChild(ab);
          } catch (eAb0) {}
          failAlert();
          return false;
        }
        setTimeout(function () {
          try {
            document.body.removeChild(ab);
          } catch (eAb) {}
        }, POKER_BLOB_DOWNLOAD_CLEANUP_MS);
        return true;
      }
      if (/^https?:\/\//i.test(href)) {
        /* fetch().then(blob) теряет user activation — на iOS/Telegram скачивание «вспыхивает» и отменяется. */
        var tgH = window.Telegram && window.Telegram.WebApp;
        if (tgH && typeof tgH.openLink === "function") {
          try {
            tgH.openLink(href);
          } catch (eTg) {
            var ox = window.open(href, "_blank", "noopener,noreferrer");
            if (!ox) failAlert();
          }
        } else {
          var ox2 = window.open(href, "_blank", "noopener,noreferrer");
          if (!ox2) failAlert();
        }
        return true;
      }
      if (href.indexOf("data:") === 0) {
        var m = href.match(/^data:([^;]+);base64,(.+)$/);
        if (!m || !m[2]) {
          failAlert();
          return false;
        }
        var binary = atob(m[2]);
        var arr = new Uint8Array(binary.length);
        for (var i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);
        var blob = new Blob([arr], { type: (m[1] || "application/pdf").split(";")[0] });
        pokerSaveBlobAsFileDownload(blob, name);
        return true;
      }
    } catch (err) {
      failAlert();
      return false;
    }
    failAlert();
    return false;
  }
  document.body.addEventListener("click", function (e) {
    var dlBtn = e.target && e.target.closest ? e.target.closest("button[data-chat-pdf-download]") : null;
    if (dlBtn) {
      e.preventDefault();
      e.stopPropagation();
      var wrapDl = dlBtn.closest(".chat-msg__document-wrap");
      var viewDl = wrapDl && wrapDl.querySelector("a.chat-msg__document-link--view");
      var hrefDl = viewDl && (viewDl.href || viewDl.getAttribute("href"));
      var fnDl = (wrapDl && wrapDl.getAttribute("data-document-name")) || "document.pdf";
      pokerTriggerChatPdfDownload(hrefDl, fnDl);
      return;
    }
    var shBtn = e.target && e.target.closest ? e.target.closest("button[data-chat-pdf-share]") : null;
    if (shBtn) {
      e.preventDefault();
      e.stopPropagation();
      var wrapSh = shBtn.closest(".chat-msg__document-wrap");
      var viewSh = wrapSh && wrapSh.querySelector("a.chat-msg__document-link--view");
      var hrefSh = viewSh && viewSh.getAttribute("href");
      var fnSh = (wrapSh && wrapSh.getAttribute("data-document-name")) || "document.pdf";
      if (!hrefSh || hrefSh.indexOf("data:") !== 0) return;
      try {
        var mSh = hrefSh.match(/^data:([^;]+);base64,(.+)$/);
        if (!mSh || !mSh[2]) throw new Error("bad_pdf_data");
        var binSh = atob(mSh[2]);
        var u8 = new Uint8Array(binSh.length);
        for (var j = 0; j < binSh.length; j++) u8[j] = binSh.charCodeAt(j);
        var mimeSh = (mSh[1] || "application/pdf").split(";")[0];
        var blobSh = new Blob([u8], { type: mimeSh });
        var fileSh = new File([blobSh], fnSh || "document.pdf", { type: mimeSh, lastModified: Date.now() });
        if (navigator.share && typeof navigator.canShare === "function" && navigator.canShare({ files: [fileSh] })) {
          navigator
            .share({ files: [fileSh], title: fnSh })
            .catch(function (ex) {
              if (ex && ex.name === "AbortError") return;
              if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.showAlert)
                window.Telegram.WebApp.showAlert("Не удалось поделиться. Попробуйте «Скачать».");
            });
          return;
        }
      } catch (eShare) {}
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.showAlert)
        window.Telegram.WebApp.showAlert("Поделиться файлом здесь не поддерживается. Сохраните через «Скачать».");
      else if (typeof alert === "function") alert("Поделиться файлом не поддерживается. Используйте «Скачать».");
      return;
    }
    var link = e.target && e.target.closest ? e.target.closest("a.chat-msg__document-link--view") : null;
    if (!link || !link.href) return;
    var href = link.getAttribute("href");
    if (!href || href.indexOf("data:") !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    if (pdfViewer && pdfViewerIframe) {
      openPdfViewer(href);
    } else {
      var w = window.open(href, "_blank", "noopener,noreferrer");
      if (!w && window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.showAlert) {
        window.Telegram.WebApp.showAlert("Нажмите «Скачать» и откройте файл в приложении для PDF.");
      }
    }
  }, true);
})();

(function initSpringRatingLeagueTabs() {
  document.body.addEventListener("click", function (e) {
    var el = e.target;
    var tab = null;
    while (el && el !== document.body) {
      if (el.classList && el.classList.contains("spring-rating-date-league-tab")) {
        tab = el;
        break;
      }
      el = el.parentElement;
    }
    if (!tab) return;
    var wrap = tab.parentElement;
    while (wrap && wrap !== document.body) {
      if (wrap.classList && wrap.classList.contains("spring-rating-date-leagues")) break;
      wrap = wrap.parentElement;
    }
    if (!wrap || wrap === document.body) return;
    e.preventDefault();
    e.stopPropagation();
    var league = tab.getAttribute("data-league");
    if (!league) return;
    var tabs = wrap.querySelectorAll(".spring-rating-date-league-tab");
    var blocks = wrap.querySelectorAll(".spring-rating-date-league");
    for (var i = 0; i < tabs.length; i++) tabs[i].classList.toggle("spring-rating-date-league-tab--active", tabs[i].getAttribute("data-league") === league);
    for (var j = 0; j < blocks.length; j++) blocks[j].style.display = blocks[j].getAttribute("data-league") === league ? "" : "none";
  }, true);
})();

// Топы по выигрышу за набор дат (прошлая/текущая неделя)
/** Версия газеты для /api/deploy-hook + рассылки (номер последней опубликованной новости). */
var GAZETTE_VERSION = "20";
var GAZETTE_DATES = ["15.02.2026", "16.02.2026", "17.02.2026", "18.02.2026", "19.02.2026", "20.02.2026", "21.02.2026", "22.02.2026"];
var CURRENT_WEEK_DATES = ["23.02.2026", "24.02.2026", "25.02.2026", "26.02.2026", "27.02.2026", "28.02.2026", "29.02.2026"];
/** Рейтинг весны: даты прошлой недели по марту (9–15 марта) */
var MARCH_PAST_WEEK_DATES = ["09.03.2026", "10.03.2026", "11.03.2026", "12.03.2026", "13.03.2026", "14.03.2026", "15.03.2026"];
/** Рейтинг весны: даты текущей недели по марту (23–29 марта) */
var MARCH_CURRENT_WEEK_DATES = ["23.03.2026", "24.03.2026", "25.03.2026", "26.03.2026", "27.03.2026", "28.03.2026", "29.03.2026"];
/** Рейтинг весны: даты следующей недели по марту (16–22 марта) */
var MARCH_NEXT_WEEK_DATES = ["16.03.2026", "17.03.2026", "18.03.2026", "19.03.2026", "20.03.2026", "21.03.2026", "22.03.2026"];
/** Главная: сводка «Март / апрель» у кнопки рейтинга весны */
var SPRING_HOME_MARCH_WEEK1_DATES = ["01.03.2026", "02.03.2026", "03.03.2026", "04.03.2026", "05.03.2026", "06.03.2026", "07.03.2026", "08.03.2026"];
var SPRING_HOME_MARCH_TAIL_DATES = ["30.03.2026", "31.03.2026"];
/** Апрель: 1—5 число и календарные недели месяца */
var SPRING_HOME_APRIL_DAYS_1_5 = ["01.04.2026", "02.04.2026", "03.04.2026", "04.04.2026", "05.04.2026"];
var SPRING_HOME_APRIL_DAYS_6_12 = ["06.04.2026", "07.04.2026", "08.04.2026", "09.04.2026", "10.04.2026", "11.04.2026", "12.04.2026"];
var SPRING_HOME_APRIL_DAYS_13_19 = ["13.04.2026", "14.04.2026", "15.04.2026", "16.04.2026", "17.04.2026", "18.04.2026", "19.04.2026"];
var SPRING_HOME_APRIL_DAYS_20_26 = ["20.04.2026", "21.04.2026", "22.04.2026", "23.04.2026", "24.04.2026", "25.04.2026", "26.04.2026"];
var SPRING_HOME_APRIL_PROMO_TOTAL_DATES = SPRING_HOME_APRIL_DAYS_1_5
  .concat(SPRING_HOME_APRIL_DAYS_6_12)
  .concat(SPRING_HOME_APRIL_DAYS_13_19)
  .concat(SPRING_HOME_APRIL_DAYS_20_26);
/** Экран рейтинга весны: недели внутри раскрывающихся «Апрель» / «Март · итоги» */
var SPRING_VIEW_APRIL_WEEK_BLOCKS = [
  { label: "20—26 апреля", dates: SPRING_HOME_APRIL_DAYS_20_26 },
  { label: "13—19 апреля", dates: SPRING_HOME_APRIL_DAYS_13_19 },
  { label: "6—12 апреля", dates: SPRING_HOME_APRIL_DAYS_6_12 },
  { label: "1—5 апреля", dates: SPRING_HOME_APRIL_DAYS_1_5 }
];
var SPRING_VIEW_MARCH_WEEK_BLOCKS = [
  { label: "1—8 марта", dates: SPRING_HOME_MARCH_WEEK1_DATES },
  { label: "9—15 марта", dates: MARCH_PAST_WEEK_DATES },
  { label: "16—22 марта", dates: MARCH_NEXT_WEEK_DATES },
  { label: "23—29 марта", dates: MARCH_CURRENT_WEEK_DATES },
  { label: "30—31 марта", dates: SPRING_HOME_MARCH_TAIL_DATES }
];

function updateSpringRatingPromoDateFromVar() {
  try {
    if (typeof SPRING_RATING_UPDATED === "undefined") return;
    var el = document.querySelector(".feature--rating-spring-promo .feature__title-updated");
    if (!el) return;
    el.textContent = "обновлено " + SPRING_RATING_UPDATED;
  } catch (e) {
    if (typeof console !== "undefined" && console.warn) console.warn("updateSpringRatingPromoDateFromVar", e);
  }
}
// Рейтинг весны: одна база для ссылок топов. Топы текущей недели = BASE?Mart_week_1=1, Топы Марта = BASE?mart=1
// Укажите сюда полный URL (например https://t.me/... или ссылку на пост), параметры допишутся автоматически
var SPRING_TOP_LINK_BASE = "https://t.me/Poker_dvatuza_bot/DvaTuza";

function normalizeWinterNick(n) {
  n = n != null ? String(n).trim() : "";
  if (!n) return n;
  var lower = n.toLowerCase();
  if (lower === "pryanik2la") return "Пряник";
  if (lower === "фокс") return "Фокс";
  if (lower === "waaarr" || lower === "waaar" || lower === "waaaar") return "Waaar";
  if (lower === "andrushamorf" || lower === "4ezzi") return "FrankL";
  return n;
}
function normalizeWinterNickForFinalTable(n) {
  return normalizeWinterNick(n);
}
function winterRatingSamePlayer(nickA, nickB) {
  var a = normalizeWinterNick(nickA);
  var b = normalizeWinterNick(nickB);
  if (!a || !b) return a === b;
  return a === b;
}
function getTopByDates(dates) {
  if (!dates || !dates.length) return [];
  var byNick = {};
  dates.forEach(function (dateStr) {
    var list = getRatingByDate()[dateStr];
    if (!list || !list.length) return;
    list.forEach(function (r) {
      var nick = normalizeWinterNick(r.nick);
      var reward = r.reward != null ? Number(r.reward) : 0;
      if (!byNick[nick]) byNick[nick] = 0;
      byNick[nick] += reward;
    });
  });
  return Object.keys(byNick)
    .map(function (nick) { return { nick: nick, totalReward: byNick[nick] }; })
    .filter(function (r) { return r.totalReward > 0; })
    .sort(function (a, b) { return b.totalReward - a.totalReward; })
    .slice(0, 15);
}

// Газета «Вестник Два туза» — только горячие новости (инициализация при DOMContentLoaded для надёжности)
function runGazetteAndTasksInit() {
(function initGazetteModal() {
  var GAZETTE_READ_KEY = "poker_gazette_read";
  var modal = document.getElementById("gazetteModal");
  var pickEl = document.getElementById("gazetteModalPick");
  var newsEl = document.getElementById("gazetteModalNews");
  var gazetteAdminRow = document.getElementById("gazetteAdminRow");
  var gazetteNotifySubsBtn = document.getElementById("gazetteNotifySubsBtn");
  var gazetteNotifySubsHint = document.getElementById("gazetteNotifySubsHint");
  var openBtn = document.getElementById("gazetteOpenBtn");
  var closeBtn = document.getElementById("gazetteModalClose");
  var backdrop = document.getElementById("gazetteModalBackdrop");
  var unreadDot = document.getElementById("gazetteUnreadDot");

  function pokerGacEsc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function pokerGacTrimUrlTrailing(s) {
    return String(s || "").replace(/[),.;:!?]+$/g, "");
  }
  function pokerGacLinkifyUrls(raw) {
    var s = String(raw || "");
    var re = /(https?:\/\/\S+)/gi;
    var parts = s.split(re);
    var out = "";
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      if (i % 2 === 1 && /^https?:\/\//i.test(p)) {
        var safeHref = pokerGacTrimUrlTrailing(p);
        var href = pokerGacEsc(safeHref);
        out +=
          '<a href="' +
          href +
          '" target="_blank" rel="noopener noreferrer" class="vpn-proxy-modal__text-link">' +
          pokerGacEsc(p) +
          "</a>";
      } else {
        out += pokerGacEsc(p);
      }
    }
    return out;
  }
  function pokerGacMyMemberId() {
    try {
      if (typeof window.pokerResolveMyChatMemberId === "function") return window.pokerResolveMyChatMemberId();
    } catch (eMid) {}
    return null;
  }
  function pokerReloadGazetteOrVpnCommentFeed(feed) {
    if (!feed) return;
    var vpnM = document.getElementById("vpnProxyModal");
    if (vpnM && vpnM.contains(feed)) {
      if (typeof window.__pokerVpnProxyReloadCommentFeed === "function") window.__pokerVpnProxyReloadCommentFeed(feed);
      return;
    }
    if (typeof window.__pokerGazetteReloadCommentFeed === "function") window.__pokerGazetteReloadCommentFeed(feed);
  }
  function pokerBuildGazetteCommentItemHtml(c, aidAttrEscaped, isAdmin, useLinkify) {
    var esc = pokerGacEsc;
    var textPlain = String((c && c.text) || "");
    var textBody = useLinkify ? pokerGacLinkifyUrls(textPlain) : esc(textPlain);
    var cd = c.chatDisplayName != null ? String(c.chatDisplayName).trim() : "";
    var slug = c.userNameSlug != null ? String(c.userNameSlug).replace(/^@+/, "").trim() : "";
    var authorPlain = cd
      ? cd
      : slug
        ? "@" + slug
        : c.author != null
          ? String(c.author)
          : "Читатель";
    var authorEsc = esc(authorPlain);
    var midRaw = c.memberId != null ? String(c.memberId).trim() : "";
    var authorNode =
      midRaw && (/^tg_\d+$/.test(midRaw) || /^vk_\d+$/.test(midRaw))
        ? '<button type="button" class="gazette-article-comments__author gazette-article-comments__author--profile" data-gazette-comment-member-id="' +
          esc(midRaw) +
          '" data-gazette-comment-display-name="' +
          esc(authorPlain) +
          '">' +
          authorEsc +
          "</button>"
        : '<span class="gazette-article-comments__author">' + authorEsc + "</span>";
    var ds = "";
    try {
      var d = new Date(c.at);
      if (!isNaN(d.getTime())) {
        ds = d.toLocaleString("ru-RU", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    } catch (eDs) {}
    var meta = ds ? '<time class="gazette-article-comments__time">' + esc(ds) + "</time>" : "";
    var editedBadge = c.editedAt
      ? '<span class="gazette-article-comments__edited" title="Отредактировано">изм.</span>'
      : "";
    var cid = c.id != null ? String(c.id) : "";
    var myMid = pokerGacMyMemberId();
    var cm = midRaw;
    var own = !!(myMid && cm && String(myMid).trim() === String(cm).trim());
    var showMods = !!cid && (isAdmin || own);
    var modActions = "";
    if (showMods) {
      modActions =
        '<span class="gazette-article-comments__mod-actions">' +
        '<button type="button" class="gazette-article-comments__edit">Изменить</button>' +
        '<button type="button" class="gazette-article-comments__delete" data-gazette-comment-delete="' +
        esc(cid) +
        '" data-gazette-comment-article="' +
        aidAttrEscaped +
        '">Удалить</button>' +
        "</span>";
    }
    var textEnc = esc(encodeURIComponent(textPlain));
    return (
      '<article class="gazette-article-comments__item" data-gazette-text-enc="' +
      textEnc +
      '"><header class="gazette-article-comments__item-head">' +
      authorNode +
      meta +
      editedBadge +
      modActions +
      '</header><div class="gazette-article-comments__body">' +
      '<p class="gazette-article-comments__text">' +
      textBody +
      '</p><div class="gazette-article-comments__edit-box" hidden>' +
      '<textarea class="gazette-article-comments__edit-textarea" maxlength="2000" rows="4" aria-label="Редактирование комментария"></textarea>' +
      '<div class="gazette-article-comments__edit-btns">' +
      '<button type="button" class="gazette-article-comments__edit-save">Сохранить</button>' +
      '<button type="button" class="gazette-article-comments__edit-cancel">Отмена</button>' +
      "</div></div></div></article>"
    );
  }
  function pokerGacGlobalCommentClick(ev) {
    var t = ev.target;
    if (!t || !t.closest) return;
    var delEl = t.closest("[data-gazette-comment-delete]");
    if (delEl) {
      var feedDel = delEl.closest(".gazette-article-comments__feed");
      if (!feedDel) return;
      ev.preventDefault();
      var cid = delEl.getAttribute("data-gazette-comment-delete");
      var artId = delEl.getAttribute("data-gazette-comment-article");
      if (!cid || !artId) return;
      if (!confirm("Удалить комментарий?")) return;
      var baseDel = typeof getApiBase === "function" ? getApiBase() : "";
      if (!baseDel || typeof pokerApiAuthJsonBody !== "function") return;
      if (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) return;
      delEl.disabled = true;
      fetch(baseDel + "/api/gazette-article-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          pokerApiAuthJsonBody({
            action: "delete",
            commentId: cid,
            articleId: parseInt(artId, 10),
          })
        ),
      })
        .then(function (r) {
          return r.json().then(function (data) {
            return { ok: r.ok, data: data };
          });
        })
        .then(function (res) {
          delEl.disabled = false;
          if (res.ok && res.data && res.data.ok) {
            pokerReloadGazetteOrVpnCommentFeed(feedDel);
            return;
          }
          var msg = res.data && res.data.error ? String(res.data.error) : "Не удалось удалить";
          var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tg && tg.showAlert) tg.showAlert(msg);
          else alert(msg);
        })
        .catch(function () {
          delEl.disabled = false;
          var tg2 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tg2 && tg2.showAlert) tg2.showAlert("Сеть недоступна");
          else alert("Сеть недоступна");
        });
      return;
    }
    var editBtn = t.closest(".gazette-article-comments__edit");
    if (editBtn && !t.closest(".gazette-article-comments__edit-save") && !t.closest(".gazette-article-comments__edit-cancel")) {
      var feedE = editBtn.closest(".gazette-article-comments__feed");
      if (!feedE) return;
      ev.preventDefault();
      var art = editBtn.closest(".gazette-article-comments__item");
      if (!art) return;
      var enc = art.getAttribute("data-gazette-text-enc") || "";
      var raw = "";
      try {
        raw = decodeURIComponent(enc);
      } catch (eDec) {
        raw = "";
      }
      var p = art.querySelector(".gazette-article-comments__text");
      var box = art.querySelector(".gazette-article-comments__edit-box");
      var taEd = art.querySelector(".gazette-article-comments__edit-textarea");
      if (taEd) taEd.value = raw;
      if (p) p.hidden = true;
      if (box) box.hidden = false;
      art.classList.add("gazette-article-comments__item--editing");
      try {
        taEd.focus();
      } catch (eF) {}
      return;
    }
    var cancelBtn = t.closest(".gazette-article-comments__edit-cancel");
    if (cancelBtn) {
      var feedC = cancelBtn.closest(".gazette-article-comments__feed");
      if (!feedC) return;
      ev.preventDefault();
      var artC = cancelBtn.closest(".gazette-article-comments__item");
      if (!artC) return;
      var pC = artC.querySelector(".gazette-article-comments__text");
      var boxC = artC.querySelector(".gazette-article-comments__edit-box");
      if (pC) pC.hidden = false;
      if (boxC) boxC.hidden = true;
      artC.classList.remove("gazette-article-comments__item--editing");
      return;
    }
    var saveBtn = t.closest(".gazette-article-comments__edit-save");
    if (saveBtn) {
      var feedS = saveBtn.closest(".gazette-article-comments__feed");
      if (!feedS) return;
      ev.preventDefault();
      var artS = saveBtn.closest(".gazette-article-comments__item");
      if (!artS) return;
      var delBtnS = artS.querySelector("[data-gazette-comment-delete]");
      var cidS = delBtnS ? delBtnS.getAttribute("data-gazette-comment-delete") : "";
      var artIdS = delBtnS ? delBtnS.getAttribute("data-gazette-comment-article") : "";
      if (!cidS || !artIdS) return;
      var taS = artS.querySelector(".gazette-article-comments__edit-textarea");
      var textS = taS && taS.value ? taS.value.trim() : "";
      if (!textS) {
        var tgE = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tgE && tgE.showAlert) tgE.showAlert("Введите текст");
        else alert("Введите текст");
        return;
      }
      if (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) return;
      var baseS = typeof getApiBase === "function" ? getApiBase() : "";
      if (!baseS || typeof pokerApiAuthJsonBody !== "function") return;
      saveBtn.disabled = true;
      fetch(baseS + "/api/gazette-article-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          pokerApiAuthJsonBody({
            action: "edit",
            commentId: cidS,
            articleId: parseInt(artIdS, 10),
            text: textS,
          })
        ),
      })
        .then(function (r) {
          return r.json().then(function (data) {
            return { ok: r.ok, data: data };
          });
        })
        .then(function (res) {
          saveBtn.disabled = false;
          if (res.ok && res.data && res.data.ok) {
            pokerReloadGazetteOrVpnCommentFeed(feedS);
            return;
          }
          var msgS = res.data && res.data.error ? String(res.data.error) : "Не удалось сохранить";
          var tgS = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tgS && tgS.showAlert) tgS.showAlert(msgS);
          else alert(msgS);
        })
        .catch(function () {
          saveBtn.disabled = false;
          var tgSc = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tgSc && tgSc.showAlert) tgSc.showAlert("Сеть недоступна");
          else alert("Сеть недоступна");
        });
    }
  }

  if (!window.__pokerGacCommentUiBound) {
    window.__pokerGacCommentUiBound = true;
    document.addEventListener("click", pokerGacGlobalCommentClick);
  }

  if (modal && pickEl && newsEl) {
  function getGazetteVersion() {
    var articles = document.querySelectorAll("[data-gazette-article]");
    var max = 0;
    for (var i = 0; i < articles.length; i++) {
      if (articles[i].getAttribute("data-gazette-draft") === "1") continue;
      var n = parseInt(articles[i].getAttribute("data-gazette-article"), 10);
      if (!isNaN(n) && n > max) max = n;
    }
    return max > 0 ? String(max) : "0";
  }
  function hasUnreadGazette() {
    try {
      var current = getGazetteVersion();
      var read = localStorage.getItem(GAZETTE_READ_KEY) || "0";
      return read !== current;
    } catch (e) {
      return true;
    }
  }
  function updateGazetteUnreadDot() {
    if (!unreadDot) return;
    unreadDot.classList.toggle("welcome-gazette-icon__unread--visible", hasUnreadGazette());
  }
  function markGazetteRead() {
    try {
      localStorage.setItem(GAZETTE_READ_KEY, getGazetteVersion());
    } catch (e) {}
    updateGazetteUnreadDot();
  }
  updateGazetteUnreadDot();
  var paperEl = modal && modal.querySelector(".gazette-modal__paper");
  // Админская рассылка по подписчикам газеты
  window.updateGazetteSubsCount = function () {
    if (!gazetteNotifySubsBtn) return;
    var base = getApiBase && getApiBase();
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
    fetch(base + "/api/gazette-manual-subscribers?stats=1" + q.replace("?", "&"))
      .then(function (r) {
        if (!r.ok) return Promise.reject(new Error("http " + r.status));
        return r.json();
      })
      .then(function (data) {
        if (!data || !data.ok || typeof data.total !== "number") return;
        var total = data.total;
        var baseText = "Разослать подписчикам газеты";
        var current = gazetteNotifySubsBtn.textContent || baseText;
        var idx = current.indexOf(" (");
        if (idx !== -1) current = current.slice(0, idx);
        gazetteNotifySubsBtn.textContent = current + " (" + total + ")";
      })
      .catch(function () {});
  };
  function showGazetteView(view) {
    pickEl.hidden = view !== "pick";
    newsEl.hidden = view !== "news";
    if (view === "pick" && newsEl) newsEl.removeAttribute("data-reveal-draft");
    if (paperEl) paperEl.scrollTop = 0;
  }

  (function initGazetteAdminNotify() {
    if (!gazetteNotifySubsBtn) return;
    gazetteNotifySubsBtn.addEventListener("click", function () {
      var base = getApiBase && getApiBase();
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
        if (tg && tg.showAlert) tg.showAlert("Войдите в приложение (Telegram или PWA).");
        return;
      }
      var btn = gazetteNotifySubsBtn;
      var originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Рассылаем…";
      if (gazetteNotifySubsHint) gazetteNotifySubsHint.textContent = "";
      var payload = typeof pokerGuestOrAuthedPostBody === "function" ? pokerGuestOrAuthedPostBody({}) : {};
      if (newsEl) {
        var firstArticle = newsEl.querySelector(
          ".gazette-modal__lead[data-gazette-article]:not([data-gazette-draft='1'])"
        );
        var headlineEl = firstArticle && firstArticle.querySelector(".gazette-modal__headline");
        if (headlineEl) {
          var headlineText = headlineEl.textContent.trim();
          if (headlineText) payload.headline = headlineText;
        }
        if (firstArticle) {
          var articleIdx = firstArticle.getAttribute("data-gazette-article");
          if (articleIdx) payload.articleIndex = parseInt(articleIdx, 10);
        }
      }
      fetch(base + "/api/gazette-manual-subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (r) {
          return r
            .json()
            .catch(function () {
              return { ok: false, error: "Ошибка ответа сервера" };
            });
        })
        .then(function (data) {
          if (data && data.ok) {
            var sent =
              data && typeof data.sent === "number" && data.sent >= 0 ? data.sent : 0;
            var total =
              data && typeof data.total === "number" && data.total >= 0
                ? data.total
                : 0;
            if (gazetteNotifySubsHint) {
              var chatLine =
                data && data.chatPosted === true
                  ? " Также опубликовано в общем чате клуба."
                  : data && data.chatPosted === false
                    ? " Запись в общий чат не создана (ошибка Redis)."
                    : "";
              gazetteNotifySubsHint.textContent =
                "Личные сообщения отправлены: " +
                sent +
                " из " +
                total +
                " подписчиков газеты." +
                chatLine;
            }
          } else if (gazetteNotifySubsHint) {
            gazetteNotifySubsHint.textContent =
              "Ошибка рассылки: " +
              (data && data.error ? data.error : "не удалось отправить");
          }
        })
        .catch(function () {
          if (gazetteNotifySubsHint) gazetteNotifySubsHint.textContent = POKER_NET_ERR;
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = originalText;
        });
    });
  })();
  function openGazette(goToNews, articleIndex) {
    if (goToNews === "news") {
      if (newsEl) {
        newsEl.removeAttribute("data-reveal-draft");
        if (typeof articleIndex === "number" && articleIndex >= 0) {
          var draftCheck = newsEl.querySelector(
            '.gazette-modal__lead[data-gazette-article="' + articleIndex + '"]'
          );
          if (draftCheck && draftCheck.getAttribute("data-gazette-draft") === "1") {
            newsEl.setAttribute("data-reveal-draft", String(articleIndex));
          }
        }
      }
      showGazetteView("news");
      if (typeof articleIndex === "number" && articleIndex >= 0 && newsEl) {
        var article = newsEl.querySelector('.gazette-modal__lead[data-gazette-article="' + articleIndex + '"]');
        if (article) {
          setTimeout(function () {
            article.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }
    } else {
    showGazetteView("pick");
    }
    modal.setAttribute("aria-hidden", "false");
    markGazetteRead();
  }
  window.openGazette = openGazette;
  function closeGazette() {
    modal.setAttribute("aria-hidden", "true");
    showGazetteView("pick");
    try {
      document.documentElement.classList.remove("gazette-comment-keyboard");
    } catch (eGk) {}
    try {
      if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
        window.__pokerFinalizeChatKeyboardDismiss();
      }
    } catch (eKb) {}
  }
  modal.addEventListener("click", function (e) {
    var card = e.target && e.target.closest ? e.target.closest(".gazette-modal__page-card") : null;
    if (card && card.dataset.gazettePage === "news") {
      e.preventDefault();
      if (newsEl) newsEl.removeAttribute("data-reveal-draft");
      showGazetteView("news");
      return;
    }
    if (e.target && e.target.id === "gazetteModalBackToHome") {
      e.preventDefault();
      closeGazette();
      return;
    }
    if (e.target && e.target.id === "gazetteModalBackNews" || (e.target.closest && e.target.closest(".gazette-modal__back"))) {
      e.preventDefault();
      showGazetteView("pick");
    }
  });
  if (openBtn) openBtn.addEventListener("click", openGazette);
  if (closeBtn) closeBtn.addEventListener("click", closeGazette);
  if (backdrop) backdrop.addEventListener("click", closeGazette);

  modal.addEventListener("click", function (e) {
    var ratingLink = e.target && e.target.closest ? e.target.closest("a[data-close-gazette][data-view-target]") : null;
    if (ratingLink) {
      e.preventDefault();
      e.stopPropagation();
      closeGazette();
      var view = ratingLink.getAttribute("data-view-target");
      if (view && typeof setView === "function") setView(view);
      if (ratingLink.getAttribute("data-hall-shame") === "1" && typeof showHallOfFamePanel === "function") {
        setTimeout(function () {
          showHallOfFamePanel("shame");
        }, 520);
      }
      return;
    }
    var articleLink = e.target && e.target.closest ? e.target.closest("a[data-gazette-article-link]") : null;
    if (articleLink) {
      e.preventDefault();
      var idxStr = articleLink.getAttribute("data-gazette-article-link");
      if (newsEl) {
        newsEl.removeAttribute("data-reveal-draft");
        if (idxStr) {
          var draftTgt = newsEl.querySelector('.gazette-modal__lead[data-gazette-article="' + idxStr + '"]');
          if (draftTgt && draftTgt.getAttribute("data-gazette-draft") === "1") {
            newsEl.setAttribute("data-reveal-draft", idxStr);
          }
        }
      }
      showGazetteView("news");
      if (idxStr && newsEl) {
        var target = newsEl.querySelector('.gazette-modal__lead[data-gazette-article="' + idxStr + '"]');
        if (target) {
          setTimeout(function () {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }
      return;
    }
    var shareBtn = e.target && e.target.closest ? e.target.closest(".gazette-modal__share-btn") : null;
    if (shareBtn && shareBtn.dataset.gazetteShare !== undefined) {
      e.preventDefault();
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var idx = shareBtn.dataset.gazetteShare;
      var link =
        idx !== undefined && idx !== ""
          ? buildMiniAppStartLink("news_" + idx)
          : buildMiniAppStartLink("news");
      var isTelegramShare = shareBtn.classList && shareBtn.classList.contains("gazette-modal__share-telegram");
      if (isTelegramShare) {
        if (isTelegramWebApp() && typeof pokerOpenTelegramShareUrlOnly === "function" && pokerOpenTelegramShareUrlOnly(link)) {
          if (typeof recordShareButtonClick === "function") recordShareButtonClick("gazette_article");
          return;
        }
        var article = shareBtn.closest && shareBtn.closest("article");
        var headlineEl = article && article.querySelector(".gazette-modal__headline");
        var headline = headlineEl ? headlineEl.textContent.trim() : "";
        var shareText = headline.length > 0 ? headline : "Новая новость в газете «Вестник Два туза»";
        var shareUrl = typeof pokerBuildTelegramShareUrlDialog === "function" ? pokerBuildTelegramShareUrlDialog(link, shareText) : "";
        pokerTryPwaWebShare({ text: shareText + "\n" + link, url: link }).then(function (pwaOk) {
          if (pwaOk) {
            if (typeof recordShareButtonClick === "function") recordShareButtonClick("gazette_article");
            return;
          }
          var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tg && tg.openTelegramLink) tg.openTelegramLink(shareUrl);
          else if (tg && tg.openLink) tg.openLink(shareUrl);
          else window.open(shareUrl, "_blank");
          if (typeof recordShareButtonClick === "function") recordShareButtonClick("gazette_article");
        });
      } else {
        if (typeof navigator.clipboard !== "undefined" && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(link).then(function () {
            var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            if (tg && tg.showAlert) tg.showAlert("Ссылка скопирована. Отправьте её другу — по ней откроется эта новость."); else alert("Ссылка скопирована.");
          }).catch(function () {
            var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            if (tg && tg.showAlert) tg.showAlert("Ссылка: " + link); else alert("Ссылка: " + link);
          });
        } else {
          var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tg && tg.showAlert) tg.showAlert("Ссылка: " + link); else alert("Ссылка: " + link);
        }
      }
    }
  });

  var subscribeBtn = document.getElementById("gazetteSubscribeBtn");
  var subscribeBtnNews = document.getElementById("gazetteSubscribeBtnNews");
  var subscribeWrap = modal && modal.querySelector(".gazette-modal__subscribe-wrap");
  var GAZETTE_SUBSCRIBED_KEY = "poker_gazette_subscribed";
  var inDevHtml = "";
  function setSubscribeButtonState(subscribed) {
    var textPick = subscribed ? "Отписаться от газеты" : "Подписаться на газету";
    var textArticle = subscribed ? "Отписаться" : "Подписаться на газету";
    if (subscribeBtn) {
      subscribeBtn.disabled = false;
      subscribeBtn.innerHTML = textPick + inDevHtml;
      subscribeBtn.dataset.subscribed = subscribed ? "1" : "0";
    }
    if (subscribeBtnNews) {
      subscribeBtnNews.disabled = false;
      subscribeBtnNews.innerHTML = textPick + inDevHtml;
      subscribeBtnNews.dataset.subscribed = subscribed ? "1" : "0";
    }
    var articleBtns = modal && modal.querySelectorAll(".gazette-modal__subscribe-in-article-btn");
    if (articleBtns) {
      for (var i = 0; i < articleBtns.length; i++) {
        var btn = articleBtns[i];
        btn.disabled = false;
        btn.textContent = textArticle;
        btn.dataset.subscribed = subscribed ? "1" : "0";
      }
    }
  }
  function updateSubscribeButtonFromStorage() {
    try {
      setSubscribeButtonState(localStorage.getItem(GAZETTE_SUBSCRIBED_KEY) === "1");
    } catch (e) {
      setSubscribeButtonState(false);
    }
  }
  updateSubscribeButtonFromStorage();
  if (subscribeBtn || subscribeBtnNews) {
    var gazetteSubscribeHandledInTouchend = false;
    function runGazetteSubscribe() {
      if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
        var tgNeed = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        var msgNeed =
          "Войдите в приложение (Telegram в мини‑аппе или через кнопку входа на сайте), чтобы подписаться на газету.";
        if (tgNeed && tgNeed.showAlert) tgNeed.showAlert(msgNeed);
        else alert(msgNeed);
        return;
      }
      var activeBtn = subscribeBtn || subscribeBtnNews;
      var articleBtn = modal && modal.querySelector(".gazette-modal__subscribe-in-article-btn");
      var anyBtn = activeBtn || articleBtn;
      var subscribed = (anyBtn && anyBtn.dataset.subscribed === "1") || false;
      var appEl = document.getElementById("app");
      var base = (appEl && appEl.getAttribute("data-api-base")) || (typeof location !== "undefined" && location.origin) || "";
      var apiUrl = (base ? base.replace(/\/$/, "") : "") + "/api/gazette-subscribe";
      var payload =
        typeof pokerApiAuthJsonBody === "function"
          ? pokerApiAuthJsonBody({ unsubscribe: subscribed })
          : {
              initData: (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData) || "",
              unsubscribe: subscribed,
            };
      if (!payload.initData && !payload.pwaSession && !payload.pwaVkSession) {
        var tgEmpty = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tgEmpty && tgEmpty.showAlert) tgEmpty.showAlert("Не удалось определить аккаунт. Обновите страницу или войдите снова.");
        else alert("Не удалось определить аккаунт. Обновите страницу или войдите снова.");
        return;
      }
      if (subscribeBtn) {
        subscribeBtn.disabled = true;
        subscribeBtn.textContent = "Подписываем…";
      }
      if (subscribeBtnNews) {
        subscribeBtnNews.disabled = true;
        subscribeBtnNews.textContent = "Подписываем…";
      }
      var allArticleBtns = modal && modal.querySelectorAll(".gazette-modal__subscribe-in-article-btn");
      if (allArticleBtns) {
        for (var j = 0; j < allArticleBtns.length; j++) {
          allArticleBtns[j].disabled = true;
          allArticleBtns[j].textContent = "Подписываем…";
        }
      }
      fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (r) {
          return r.json().catch(function () { return { ok: false, error: "Ошибка ответа сервера" }; });
        })
        .then(function (data) {
          if (data && data.ok) {
            try {
              localStorage.setItem(GAZETTE_SUBSCRIBED_KEY, data.subscribed ? "1" : "0");
            } catch (e) {}
            setSubscribeButtonState(!!data.subscribed);
            var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            if (tg && tg.showAlert) {
              tg.showAlert(data.subscribed ? "Подписка оформлена. Пуши о новых новостях будут приходить в Telegram." : "Вы отписаны от уведомлений газеты.");
            } else {
              alert(data.subscribed ? "Подписка оформлена." : "Вы отписаны.");
            }
          } else {
            var msg = (data && data.error) || "Ошибка. Попробуйте позже.";
            var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            if (tg && tg.showAlert) tg.showAlert(msg); else alert(msg);
            setSubscribeButtonState(subscribed);
          }
        })
        .catch(function () {
          var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR); else alert(POKER_NET_ERR);
          setSubscribeButtonState(subscribed);
        });
    }
    function bindSubscribeClick(btn) {
      if (!btn) return;
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (gazetteSubscribeHandledInTouchend) {
          gazetteSubscribeHandledInTouchend = false;
          return;
        }
        if (window.__touchWasScroll && window.__touchWasScroll()) return;
        runGazetteSubscribe();
      });
      btn.addEventListener("touchend", function (e) {
        if (e.target !== btn && !btn.contains(e.target)) return;
        if (window.__touchWasScroll && window.__touchWasScroll()) return;
        e.preventDefault();
        gazetteSubscribeHandledInTouchend = true;
        runGazetteSubscribe();
      }, { passive: false });
    }
    bindSubscribeClick(subscribeBtn);
    bindSubscribeClick(subscribeBtnNews);
    var articleSubscribeBtns = modal && modal.querySelectorAll(".gazette-modal__subscribe-in-article-btn");
    if (articleSubscribeBtns) {
      for (var k = 0; k < articleSubscribeBtns.length; k++) bindSubscribeClick(articleSubscribeBtns[k]);
    }
  }


  (function initGazetteArticleComments() {
    var shareRowSelector = ".gazette-modal__share-row";
    function esc(s) {
      return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }
    function renderGazetteCommentsFeed(feed, items, isAdmin) {
      if (!feed) return;
      if (!items || !items.length) {
        feed.innerHTML =
          '<p class="gazette-article-comments__empty">Пока нет комментариев — напишите первым.</p>';
        return;
      }
      var aidAttrG = esc(String(feed.getAttribute("data-gazette-article-comments-article-id") || ""));
      feed.innerHTML = items
        .map(function (c) {
          return pokerBuildGazetteCommentItemHtml(c, aidAttrG, isAdmin, false);
        })
        .join("");
    }
    function loadGazetteCommentsFeed(feed) {
      var aid = feed.getAttribute("data-gazette-article-comments-article-id");
      if (!aid) return;
      var base = typeof getApiBase === "function" ? getApiBase() : "";
      if (!base) {
        renderGazetteCommentsFeed(feed, [], false);
        return;
      }
      feed.innerHTML = '<p class="gazette-article-comments__loading">Загрузка…</p>';
      var q =
        "?articleId=" +
        encodeURIComponent(aid) +
        (typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("&") : "");
      fetch(base + "/api/gazette-article-comments" + q)
        .then(function (r) {
          return r.json().then(function (data) {
            return { ok: r.ok, data: data };
          });
        })
        .then(function (res) {
          if (res.ok && res.data && res.data.ok && Array.isArray(res.data.comments)) {
            renderGazetteCommentsFeed(feed, res.data.comments, !!res.data.isAdmin);
          } else {
            renderGazetteCommentsFeed(feed, [], false);
          }
        })
        .catch(function () {
          renderGazetteCommentsFeed(feed, [], false);
        });
    }
    function refreshAllGazetteCommentFeeds() {
      var feeds = newsEl.querySelectorAll(".gazette-article-comments__feed[data-gazette-article-comments-article-id]");
      for (var i = 0; i < feeds.length; i++) loadGazetteCommentsFeed(feeds[i]);
    }
    function injectGazetteCommentsForArticle(article) {
      if (!article || article.getAttribute("data-gazette-comments-injected") === "1") return;
      if (article.getAttribute("data-gazette-draft") === "1") return;
      var aid = article.getAttribute("data-gazette-article");
      if (!aid || !/^\d+$/.test(aid)) return;
      article.setAttribute("data-gazette-comments-injected", "1");
      var shareRow = article.querySelector(shareRowSelector);
      var wrap = document.createElement("section");
      wrap.className = "gazette-article-comments gazette-article-comments--panel";
      wrap.setAttribute("aria-label", "Комментарии к новости");
      var cred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
      var hintText =
        "Чтобы оставить комментарий, войдите через Telegram или ВКонтакте (PWA) либо откройте приложение в Telegram.";
      wrap.innerHTML =
        '<header class="gazette-article-comments__panel-head">' +
        '<h4 class="gazette-article-comments__title">Комментарии читателей</h4>' +
        '<p class="gazette-article-comments__panel-sub">Лента ниже; своё сообщение можно набрать в отдельном поле.</p>' +
        "</header>" +
        '<p class="gazette-article-comments__hint gazette-article-comments__hint--login"' +
        (cred ? " hidden" : "") +
        ">" +
        esc(hintText) +
        '</p>' +
        '<div class="gazette-article-comments__feed" data-gazette-article-comments-article-id="' +
        esc(aid) +
        '"></div>' +
        '<div class="gazette-article-comments__composer-card"' +
        (cred ? "" : " hidden") +
        '>' +
        '<form class="gazette-article-comments__form"' +
        (cred ? "" : " hidden") +
        ' novalidate aria-label="Новый комментарий">' +
        '<textarea id="gazetteCommentInput_' +
        esc(aid) +
        '" class="gazette-article-comments__textarea" maxlength="2000" rows="4" placeholder="Введите текст — он появится в ленте после отправки." aria-label="Текст комментария"></textarea>' +
        '<button type="submit" class="gazette-article-comments__submit">Отправить</button>' +
        '<p class="gazette-article-comments__form-status" aria-live="polite"></p>' +
        "</form></div>";
      var actionsCard = article.querySelector("[data-gazette-article-actions]");
      if (actionsCard) {
        actionsCard.appendChild(wrap);
      } else {
        var shareRow = article.querySelector(shareRowSelector);
        if (shareRow && shareRow.parentNode) {
          shareRow.parentNode.insertBefore(wrap, shareRow);
        } else {
          article.appendChild(wrap);
        }
      }
      loadGazetteCommentsFeed(wrap.querySelector(".gazette-article-comments__feed"));
    }
    function injectAllGazetteArticleComments() {
      var arts = newsEl.querySelectorAll("article[data-gazette-article]");
      for (var a = 0; a < arts.length; a++) injectGazetteCommentsForArticle(arts[a]);
    }
    injectAllGazetteArticleComments();
    if (typeof MutationObserver !== "undefined" && newsEl) {
      var moGac = new MutationObserver(function () {
        if (newsEl.hidden) return;
        injectAllGazetteArticleComments();
        refreshAllGazetteCommentFeeds();
      });
      try {
        moGac.observe(newsEl, { attributes: true, attributeFilter: ["hidden"] });
      } catch (eMoGac) {}
    }
    var gacDelegatedBound = false;
    function bindGazetteCommentsDelegated() {
      if (gacDelegatedBound || !newsEl) return;
      gacDelegatedBound = true;
      newsEl.addEventListener("submit", function (ev) {
        var form = ev.target;
        if (!form || !form.classList || !form.classList.contains("gazette-article-comments__form")) return;
        if (!newsEl.contains(form)) return;
        ev.preventDefault();
        var section = form.closest(".gazette-article-comments");
        var feed = section && section.querySelector(".gazette-article-comments__feed");
        var ta = form.querySelector(".gazette-article-comments__textarea");
        var st = form.querySelector(".gazette-article-comments__form-status");
        var sub = form.querySelector(".gazette-article-comments__submit");
        if (!feed || !ta) return;
        var aid = feed.getAttribute("data-gazette-article-comments-article-id");
        var text = ta.value ? ta.value.trim() : "";
        if (!text) {
          if (st) st.textContent = "Введите текст комментария.";
          return;
        }
        if (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) {
          if (st) st.textContent = "Войдите в приложение, чтобы комментировать.";
          return;
        }
        var basePost = typeof getApiBase === "function" ? getApiBase() : "";
        if (!basePost || typeof pokerApiAuthJsonBody !== "function") {
          if (st) st.textContent = "Не удалось отправить.";
          return;
        }
        if (sub) sub.disabled = true;
        if (st) st.textContent = "Отправляем…";
        var profileHint = {};
        try {
          var authG = window.__pokerTelegramAuth;
          if (authG && authG.status === "verified" && authG.user) {
            var uG = authG.user;
            if (uG.first_name) profileHint.profileFirstName = String(uG.first_name).trim().slice(0, 64);
            if (uG.last_name) profileHint.profileLastName = String(uG.last_name).trim().slice(0, 64);
          }
        } catch (eHint) {}
        var payload = pokerApiAuthJsonBody(
          Object.assign({ articleId: parseInt(aid, 10), text: text }, profileHint)
        );
        fetch(basePost + "/api/gazette-article-comments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
          .then(function (r) {
            return r.json().then(function (data) {
              return { ok: r.ok, data: data };
            });
          })
          .then(function (res) {
            if (sub) sub.disabled = false;
            if (res.ok && res.data && res.data.ok) {
              ta.value = "";
              if (st) st.textContent = "Комментарий опубликован.";
              loadGazetteCommentsFeed(feed);
              return;
            }
            var msg =
              res.data && res.data.error ? String(res.data.error) : "Не удалось отправить.";
            if (st) st.textContent = msg;
          })
          .catch(function () {
            if (sub) sub.disabled = false;
            if (st) st.textContent = "Сеть недоступна.";
          });
      });
      newsEl.addEventListener("click", function (ev) {
        var profBtn = ev.target && ev.target.closest && ev.target.closest("[data-gazette-comment-member-id]");
        if (profBtn && newsEl.contains(profBtn)) {
          ev.preventDefault();
          ev.stopPropagation();
          var midP = profBtn.getAttribute("data-gazette-comment-member-id");
          if (!midP) return;
          var nameP =
            (profBtn.getAttribute("data-gazette-comment-display-name") || "").trim() ||
            (profBtn.textContent || "").trim() ||
            "Игрок";
          if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
          if (typeof window.openChatUserModalById === "function") {
            window.openChatUserModalById(midP, nameP, null);
          }
          return;
        }
      });
    }
    bindGazetteCommentsDelegated();
    (function bindGazetteCommentKeyboardRepair() {
      if (!modal) return;
      var blurTimer = null;
      function scheduleFinalizeGazetteKb() {
        clearTimeout(blurTimer);
        blurTimer = setTimeout(function () {
          blurTimer = null;
          var active = document.activeElement;
          if (
            active &&
            active.classList &&
            active.classList.contains("gazette-article-comments__textarea") &&
            modal.contains(active)
          ) {
            return;
          }
          try {
            document.documentElement.classList.remove("gazette-comment-keyboard");
          } catch (eRm) {}
          try {
            if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
              window.__pokerFinalizeChatKeyboardDismiss();
            }
          } catch (eFin) {}
        }, 120);
      }
      modal.addEventListener(
        "focusin",
        function (ev) {
          var t = ev.target;
          if (!t || !t.classList || !t.classList.contains("gazette-article-comments__textarea")) return;
          if (!modal.contains(t)) return;
          try {
            document.documentElement.classList.add("gazette-comment-keyboard");
          } catch (eIn) {}
        },
        true
      );
      modal.addEventListener(
        "focusout",
        function (ev) {
          var t = ev.target;
          if (!t || !t.classList || !t.classList.contains("gazette-article-comments__textarea")) return;
          if (!modal.contains(t)) return;
          scheduleFinalizeGazetteKb();
        },
        true
      );
    })();
    window.__pokerGazetteReloadCommentFeed = loadGazetteCommentsFeed;
  })();
  }

  (function initRomanGazetteTaskPlanner() {
    var plannerModal = document.getElementById("romanTaskPlannerModal");
    var plannerBackdrop = document.getElementById("romanTaskPlannerModalBackdrop");
    var plannerClose = document.getElementById("romanTaskPlannerModalClose");
    var openBtn = document.getElementById("romanTaskPlannerOpenBtn");
    var boardEl = document.getElementById("romanTaskPlannerBoard");
    var listAll = document.getElementById("romanTaskListAll");
    var form = document.getElementById("romanTaskAddForm");
    var input = document.getElementById("romanTaskInput");
    var importantCheckbox = document.getElementById("romanTaskImportantCheckbox");
    if (!plannerModal || !boardEl || !listAll || !form || !input || !openBtn) return;
    var PLANNER_TAB_STORAGE_KEY = "poker_gazette_planner_tab_v1";
    function readPlannerTabStorage() {
      try {
        var s = sessionStorage.getItem(PLANNER_TAB_STORAGE_KEY);
        if (s === "important" || s === "normal" || s === "done") return s;
        if (s === "tasks") return "important";
      } catch (eRd) {}
      return "important";
    }
    var plannerTab = readPlannerTabStorage();
    function writePlannerTabStorage(v) {
      try {
        sessionStorage.setItem(PLANNER_TAB_STORAGE_KEY, v);
      } catch (eWr) {}
    }
    var tabImportantBtn = document.getElementById("romanPlannerTabImportant");
    var tabNormalBtn = document.getElementById("romanPlannerTabNormal");
    var tabDoneBtn = document.getElementById("romanPlannerTabDone");
    var tabImportantCount = document.getElementById("romanPlannerTabImportantCount");
    var tabNormalCount = document.getElementById("romanPlannerTabNormalCount");
    var tabDoneCount = document.getElementById("romanPlannerTabDoneCount");
    function setPlannerTabUi() {
      var isDone = plannerTab === "done";
      var showAddForm = !isDone;
      if (tabImportantBtn) {
        tabImportantBtn.classList.toggle("roman-task-planner__tab--active", plannerTab === "important");
        tabImportantBtn.setAttribute("aria-selected", plannerTab === "important" ? "true" : "false");
      }
      if (tabNormalBtn) {
        tabNormalBtn.classList.toggle("roman-task-planner__tab--active", plannerTab === "normal");
        tabNormalBtn.setAttribute("aria-selected", plannerTab === "normal" ? "true" : "false");
      }
      if (tabDoneBtn) {
        tabDoneBtn.classList.toggle("roman-task-planner__tab--active", isDone);
        tabDoneBtn.setAttribute("aria-selected", isDone ? "true" : "false");
      }
      if (form) form.classList.toggle("roman-task-planner__add--hidden", !showAddForm);
    }
    var PLANNER_COMPOSER_MIN_PX = 52;
    var PLANNER_COMPOSER_MAX_PX = 280;
    var PLANNER_ORDER_STEP = 1000;
    function resizePlannerComposer() {
      if (!input || input.tagName !== "TEXTAREA") return;
      if (typeof pokerAutosizeTextarea === "function") {
        pokerAutosizeTextarea(input, {
          maxHeight: PLANNER_COMPOSER_MAX_PX,
          minHeight: PLANNER_COMPOSER_MIN_PX,
        });
      }
    }
    /** Общий планер двух Романов. */
    var PLANNER_ROMAN_SHARED_USERNAMES = { roman1787443: true, roman1_matvienko: true };
    /** Отдельный список задач (не общий с Романами). */
    var PLANNER_SOLO_USERNAMES = { polyapineapple: true };
    /**
     * Доступ по числовому Telegram id, если username в WebApp пустой (скрыт в настройках).
     * 388008256 — @roman1_matvienko (см. TELEGRAM_ADMIN / чат). Для @Roman1787443 при необходимости
     * добавьте его user id из @userinfobot в этот объект.
     * Для @polyapineapple при скрытом username задайте тот же id, что в env GAZETTE_EDITOR_PLANNER_POLY_TELEGRAM_ID на сервере.
     */
    var PLANNER_ALLOWED_TELEGRAM_IDS = { 388008256: true };
    /** Числовой id Telegram для @polyapineapple, если username скрыт (должен совпадать с серверным env). */
    var PLANNER_POLY_TELEGRAM_ID = null;
    var LEGACY_PLANNER_STORAGE_KEY = "poker_roman1787443_planner_v1";
    var PLANNER_SHARED_STORAGE_KEY = "poker_gazette_editor_planner_shared_v1";
    var PLANNER_OLD_KEYS_TO_MIGRATE = [
      LEGACY_PLANNER_STORAGE_KEY,
      "poker_gazette_editor_planner_v1_roman1787443",
      "poker_gazette_editor_planner_v1_roman1_matvienko",
    ];
    function getPlannerTelegramUser() {
      var user =
        typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser() : null;
      if (!user && window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
        user = window.Telegram.WebApp.initDataUnsafe.user;
      }
      return user || null;
    }
    function plannerAuthUsernameLower() {
      try {
        var _ap = window.__pokerTelegramAuth;
        if (_ap && _ap.user && _ap.user.username != null) {
          return String(_ap.user.username).replace(/^@+/, "").trim().toLowerCase();
        }
      } catch (eAu) {}
      try {
        var _rec = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
        if (_rec && _rec.user && _rec.user.username != null) {
          return String(_rec.user.username).replace(/^@+/, "").trim().toLowerCase();
        }
      } catch (eRec) {}
      return "";
    }
    function normUser() {
      var user = getPlannerTelegramUser();
      var u = user && user.username ? String(user.username) : "";
      var n = u.replace(/^@+/, "").trim().toLowerCase();
      if (n) return n;
      return plannerAuthUsernameLower();
    }
    function isPlannerSoloUser() {
      var u = normUser();
      if (u && PLANNER_SOLO_USERNAMES[u]) return true;
      var user = getPlannerTelegramUser();
      if (user && user.id != null && PLANNER_POLY_TELEGRAM_ID != null) {
        if (Number(user.id) === PLANNER_POLY_TELEGRAM_ID) return true;
      }
      try {
        var _ap = window.__pokerTelegramAuth;
        if (_ap && _ap.user && _ap.user.id != null && PLANNER_POLY_TELEGRAM_ID != null) {
          if (Number(_ap.user.id) === PLANNER_POLY_TELEGRAM_ID) return true;
        }
        var _recTg = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
        if (_recTg && _recTg.user && _recTg.user.id != null && PLANNER_POLY_TELEGRAM_ID != null) {
          if (Number(_recTg.user.id) === PLANNER_POLY_TELEGRAM_ID) return true;
        }
      } catch (eSo) {}
      return false;
    }
    function isPlannerAllowedUser() {
      try {
        var _ap = window.__pokerTelegramAuth;
        if (_ap && _ap.gazettePlannerAccess === true) return true;
        var _recTg = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
        if (_recTg && _recTg.gazettePlannerAccess === true) return true;
      } catch (ePlAllow) {}
      var ua = plannerAuthUsernameLower();
      if (ua && (PLANNER_SOLO_USERNAMES[ua] || PLANNER_ROMAN_SHARED_USERNAMES[ua])) return true;
      var user = getPlannerTelegramUser();
      if (!user) return false;
      var u = user.username != null ? String(user.username).replace(/^@+/, "").trim().toLowerCase() : "";
      if (u && PLANNER_SOLO_USERNAMES[u]) return true;
      if (u && PLANNER_ROMAN_SHARED_USERNAMES[u]) return true;
      if (user.id == null) return false;
      var idNum = Number(user.id);
      if (isNaN(idNum)) return false;
      if (PLANNER_POLY_TELEGRAM_ID != null && idNum === PLANNER_POLY_TELEGRAM_ID) return true;
      return !!PLANNER_ALLOWED_TELEGRAM_IDS[idNum];
    }
    function plannerStorageKey() {
      if (!isPlannerAllowedUser()) return null;
      if (isPlannerSoloUser()) {
        var u = normUser();
        if ((!u || !PLANNER_SOLO_USERNAMES[u]) && PLANNER_POLY_TELEGRAM_ID != null) {
          var userK = getPlannerTelegramUser();
          var idK = userK && userK.id != null ? Number(userK.id) : NaN;
          if (idK === PLANNER_POLY_TELEGRAM_ID) u = "polyapineapple";
        }
        if (!u || !PLANNER_SOLO_USERNAMES[u]) u = plannerAuthUsernameLower();
        if (u && PLANNER_SOLO_USERNAMES[u]) return "poker_gazette_editor_planner_solo_" + u + "_v1";
        return "poker_gazette_editor_planner_solo_polyapineapple_v1";
      }
      return PLANNER_SHARED_STORAGE_KEY;
    }
    function updatePlannerHintText(rawOpt) {
      var el = document.getElementById("romanTaskPlannerHint");
      if (!el) return;
      if (!isPlannerAllowedUser()) {
        el.textContent =
          "Планер задач редакторов: общий список или личный — подсказка обновится после входа.";
        return;
      }
      var raw = rawOpt != null ? rawOpt : loadTasks();
      if (!Array.isArray(raw)) raw = [];
      var total = 0;
      var imp = 0;
      var norm = 0;
      var doneC = 0;
      for (var hi = 0; hi < raw.length; hi++) {
        var t = raw[hi];
        if (!t) continue;
        if (t.done) {
          doneC++;
          continue;
        }
        total++;
        if (t.important) imp++;
        else norm++;
      }
      el.textContent = "Всего задач: " + total;
      if (tabImportantCount) tabImportantCount.textContent = "(" + imp + ")";
      if (tabNormalCount) tabNormalCount.textContent = "(" + norm + ")";
      if (tabDoneCount) tabDoneCount.textContent = "(" + doneC + ")";
      if (tabImportantBtn) tabImportantBtn.setAttribute("aria-label", "Важные (" + imp + ")");
      if (tabNormalBtn) tabNormalBtn.setAttribute("aria-label", "Не важные (" + norm + ")");
      if (tabDoneBtn) tabDoneBtn.setAttribute("aria-label", "Выполненные (" + doneC + ")");
    }
    var romanPlannerDirtySinceOpen = false;
    var romanPlannerPushTimer = null;
    var romanPlannerSaveGeneration = 0;
    var romanPlannerPullInFlight = false;
    var romanPlannerLiveSyncInterval = null;
    var romanPlannerLastAmbientPullMs = 0;
    function romanPlannerApiOk() {
      if (!isPlannerAllowedUser()) return false;
      if (typeof getApiBase !== "function" || !getApiBase()) return false;
      if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return false;
      return true;
    }
    function romanPlannerApplyServerTasksIfClean(tasks) {
      if (romanPlannerDirtySinceOpen) return;
      var key = plannerStorageKey();
      if (!key) return;
      try {
        localStorage.setItem(key, JSON.stringify(tasks));
      } catch (eSet) {}
      if (plannerModal.getAttribute("aria-hidden") === "false") renderTasks();
    }
    function romanPlannerPostFullList(tasks, onDone) {
      if (!romanPlannerApiOk()) {
        if (onDone) onDone(false);
        return;
      }
      var base = getApiBase();
      var body =
        typeof pokerApiAuthJsonBody === "function" ? pokerApiAuthJsonBody({ tasks: tasks }) : { tasks: tasks };
      fetch(base + "/api/gazette-editor-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
      })
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          var ok = !!(data && data.ok);
          if (ok && Array.isArray(data.tasks) && !romanPlannerDirtySinceOpen) {
            try {
              var k = plannerStorageKey();
              if (k) localStorage.setItem(k, JSON.stringify(data.tasks));
            } catch (eSync) {}
            if (plannerModal.getAttribute("aria-hidden") === "false") renderTasks();
          }
          if (onDone) onDone(ok);
        })
        .catch(function () {
          if (onDone) onDone(false);
        });
    }
    function romanPlannerPullFromServer() {
      if (!romanPlannerApiOk()) return;
      if (romanPlannerPullInFlight) return;
      romanPlannerPullInFlight = true;
      var base = getApiBase();
      var q = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
      fetch(base + "/api/gazette-editor-planner" + q, { cache: "no-store" })
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          if (!data || !data.ok || data.offline) return;
          var serverTasks = Array.isArray(data.tasks) ? data.tasks : [];
          if (serverTasks.length === 0) {
            var seed = loadTasks();
            if (seed.length) {
              romanPlannerPostFullList(seed, function () {});
            }
            return;
          }
          romanPlannerApplyServerTasksIfClean(serverTasks);
        })
        .catch(function () {})
        .then(function () {
          romanPlannerPullInFlight = false;
        });
    }
    /** Повторный GET с паузой — при возврате во вкладку / Mini App, чтобы второе устройство подтянуло список. */
    function romanPlannerPullAmbient() {
      var now = Date.now();
      if (now - romanPlannerLastAmbientPullMs < 1200) return;
      romanPlannerLastAmbientPullMs = now;
      romanPlannerPullFromServer();
    }
    function romanPlannerStopLiveSync() {
      if (romanPlannerLiveSyncInterval != null) {
        clearInterval(romanPlannerLiveSyncInterval);
        romanPlannerLiveSyncInterval = null;
      }
    }
    /** Пока модалка открыта — периодически синхронизировать с Redis (два телефона без смены вкладки). */
    function romanPlannerStartLiveSync() {
      romanPlannerStopLiveSync();
      if (!romanPlannerApiOk()) return;
      romanPlannerLiveSyncInterval = setInterval(function () {
        if (!plannerModal || plannerModal.getAttribute("aria-hidden") !== "false") {
          romanPlannerStopLiveSync();
          return;
        }
        romanPlannerPullFromServer();
      }, 18000);
    }
    function mergeRomanPlannerArraysFromKeys() {
      var arrs = [];
      for (var i = 0; i < PLANNER_OLD_KEYS_TO_MIGRATE.length; i++) {
        try {
          var r = localStorage.getItem(PLANNER_OLD_KEYS_TO_MIGRATE[i]);
          if (!r) continue;
          var a = JSON.parse(r);
          if (Array.isArray(a) && a.length) arrs.push(a);
        } catch (eK) {}
      }
      if (!arrs.length) return [];
      var seen = {};
      var out = [];
      for (var j = 0; j < arrs.length; j++) {
        var arr = arrs[j];
        for (var k = 0; k < arr.length; k++) {
          var t = arr[k];
          if (!t || t.id == null) continue;
          var id = String(t.id);
          if (seen[id]) continue;
          seen[id] = true;
          out.push(t);
        }
      }
      return out;
    }
    function cleanupRomanPlannerLegacyKeys() {
      for (var ci = 0; ci < PLANNER_OLD_KEYS_TO_MIGRATE.length; ci++) {
        try {
          localStorage.removeItem(PLANNER_OLD_KEYS_TO_MIGRATE[ci]);
        } catch (eRm) {}
      }
    }
    function mergeLegacyPlannerIntoList(list) {
      var key = plannerStorageKey();
      if (!key || key !== PLANNER_SHARED_STORAGE_KEY) return list;
      var merged = mergeRomanPlannerArraysFromKeys();
      if (!merged.length) return list;
      var base = Array.isArray(list) ? list : [];
      var byId = {};
      for (var i = 0; i < base.length; i++) {
        if (base[i] && base[i].id != null) byId[String(base[i].id)] = true;
      }
      var out = base.slice();
      var added = false;
      for (var j = 0; j < merged.length; j++) {
        var t = merged[j];
        if (!t || t.id == null) continue;
        var id = String(t.id);
        if (byId[id]) continue;
        byId[id] = true;
        out.push(t);
        added = true;
      }
      if (added) {
        try {
          localStorage.setItem(key, JSON.stringify(out));
          cleanupRomanPlannerLegacyKeys();
        } catch (eMg) {}
      }
      return out;
    }
    function escHtml(s) {
      return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }
    function loadTasks() {
      var key = plannerStorageKey();
      if (!key) return [];
      try {
        var raw = localStorage.getItem(key);
        if (!raw) {
          if (key === PLANNER_SHARED_STORAGE_KEY) {
            var merged = mergeRomanPlannerArraysFromKeys();
            if (merged.length) {
              try {
                ensurePlannerOrdersMutateTasks(merged);
                localStorage.setItem(key, JSON.stringify(merged));
                cleanupRomanPlannerLegacyKeys();
              } catch (eMig) {}
              return merged;
            }
          }
          return [];
        }
        var arr = JSON.parse(raw);
        var list = Array.isArray(arr) ? arr : [];
        list = mergeLegacyPlannerIntoList(list);
        if (ensurePlannerOrdersMutateTasks(list)) {
          try {
            localStorage.setItem(key, JSON.stringify(list));
          } catch (eOrd) {}
        }
        return list;
      } catch (eLoad) {
        return [];
      }
    }
    function saveTasks(tasks) {
      var key = plannerStorageKey();
      if (!key) return;
      try {
        localStorage.setItem(key, JSON.stringify(tasks));
      } catch (eSave) {}
      romanPlannerDirtySinceOpen = true;
      if (!romanPlannerApiOk()) return;
      romanPlannerSaveGeneration++;
      var gen = romanPlannerSaveGeneration;
      var snapshot = tasks;
      clearTimeout(romanPlannerPushTimer);
      romanPlannerPushTimer = setTimeout(function () {
        romanPlannerPushTimer = null;
        romanPlannerPostFullList(snapshot, function (ok) {
          if (ok && gen === romanPlannerSaveGeneration) romanPlannerDirtySinceOpen = false;
        });
      }, 450);
    }
    function sortTasksByCreatedAsc(arr) {
      var copy = arr.slice();
      copy.sort(function (a, b) {
        var ta = a && a.createdAt ? Number(a.createdAt) : 0;
        var tb = b && b.createdAt ? Number(b.createdAt) : 0;
        return ta - tb;
      });
      return copy;
    }
    /** Порядок внутри вкладки «Важные» / «Не важные»: plannerOrder, затем «Выполняется», затем дата. */
    function sortBucketActiveTasks(arr) {
      var copy = arr.slice();
      copy.sort(function (a, b) {
        var oa = a && a.plannerOrder != null && !isNaN(Number(a.plannerOrder)) ? Number(a.plannerOrder) : Number.MAX_SAFE_INTEGER;
        var ob = b && b.plannerOrder != null && !isNaN(Number(b.plannerOrder)) ? Number(b.plannerOrder) : Number.MAX_SAFE_INTEGER;
        if (oa !== ob) return oa - ob;
        var da = a && a.doing ? 1 : 0;
        var db = b && b.doing ? 1 : 0;
        if (da !== db) return db - da;
        var ta = a && a.createdAt ? Number(a.createdAt) : 0;
        var tb = b && b.createdAt ? Number(b.createdAt) : 0;
        return ta - tb;
      });
      return copy;
    }
    function ensurePlannerOrdersMutateTasks(tasks) {
      if (!Array.isArray(tasks)) return false;
      var changed = false;
      function fix(pred) {
        var sub = [];
        for (var i = 0; i < tasks.length; i++) {
          var t = tasks[i];
          if (!t || t.done) continue;
          if (!pred(t)) continue;
          sub.push(t);
        }
        if (!sub.length) return;
        var missing = false;
        for (var k = 0; k < sub.length; k++) {
          var po = sub[k].plannerOrder;
          if (po == null || isNaN(Number(po))) {
            missing = true;
            break;
          }
        }
        if (!missing) return;
        sub.sort(function (a, b) {
          var da = a && a.doing ? 1 : 0;
          var db = b && b.doing ? 1 : 0;
          if (da !== db) return db - da;
          return (Number(a.createdAt) || 0) - (Number(b.createdAt) || 0);
        });
        for (var j = 0; j < sub.length; j++) {
          var want = j * PLANNER_ORDER_STEP;
          if (Number(sub[j].plannerOrder) !== want) {
            sub[j].plannerOrder = want;
            changed = true;
          }
        }
      }
      fix(function (t) {
        return !!t.important;
      });
      fix(function (t) {
        return !t.important;
      });
      return changed;
    }
    function nextPlannerOrderInBucket(tasks, wantImportant) {
      var max = 0;
      for (var i = 0; i < tasks.length; i++) {
        var t = tasks[i];
        if (!t || t.done) continue;
        if (!!t.important !== !!wantImportant) continue;
        var o = Number(t.plannerOrder);
        if (!isNaN(o) && o > max) max = o;
      }
      return max + PLANNER_ORDER_STEP;
    }
    function movePlannerTaskInList(taskId, delta) {
      var tid = taskId != null ? String(taskId) : "";
      if (!tid || (delta !== -1 && delta !== 1)) return;
      if (plannerTab !== "important" && plannerTab !== "normal") return;
      var keepListScrollTop = listAll ? listAll.scrollTop || 0 : 0;
      var keepPageScrollTop =
        (document.scrollingElement && document.scrollingElement.scrollTop) ||
        (document.documentElement && document.documentElement.scrollTop) ||
        (document.body && document.body.scrollTop) ||
        0;
      var tasks = loadTasks();
      ensurePlannerOrdersMutateTasks(tasks);
      var pred =
        plannerTab === "important"
          ? function (t) {
              return t && !t.done && !!t.important;
            }
          : function (t) {
              return t && !t.done && !t.important;
            };
      var bucket = [];
      for (var i = 0; i < tasks.length; i++) {
        if (pred(tasks[i])) bucket.push(tasks[i]);
      }
      bucket = sortBucketActiveTasks(bucket);
      var idx = -1;
      for (var j = 0; j < bucket.length; j++) {
        if (bucket[j] && String(bucket[j].id) === tid) {
          idx = j;
          break;
        }
      }
      if (idx < 0) return;
      var j2 = idx + delta;
      if (j2 < 0 || j2 >= bucket.length) return;
      var a = bucket[idx];
      var b = bucket[j2];
      var oa = Number(a.plannerOrder);
      var ob = Number(b.plannerOrder);
      if (isNaN(oa) || isNaN(ob)) {
        ensurePlannerOrdersMutateTasks(tasks);
        oa = Number(a.plannerOrder);
        ob = Number(b.plannerOrder);
      }
      a.plannerOrder = ob;
      b.plannerOrder = oa;
      saveTasks(tasks);
      try {
        if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
      } catch (eBlur) {}
      renderTasks();
      function restorePlannerMoveScroll() {
        if (listAll) listAll.scrollTop = keepListScrollTop;
        var se = document.scrollingElement || document.documentElement || document.body;
        if (se) se.scrollTop = keepPageScrollTop;
      }
      restorePlannerMoveScroll();
      try {
        requestAnimationFrame(restorePlannerMoveScroll);
      } catch (eRaf) {
        setTimeout(restorePlannerMoveScroll, 0);
      }
    }
    function findTaskById(tasks, id) {
      var sid = String(id);
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i] && String(tasks[i].id) === sid) return i;
      }
      return -1;
    }
    function renderTaskRow(t, columnDone, displayNum, reorderOpts) {
      var id = t.id != null ? String(t.id) : "";
      var text = t.text != null ? String(t.text) : "";
      var important = !!(t && t.important);
      var doing = !!(t && t.doing);
      var stage = t && (t.stage === "waiting" || t.stage === "checking") ? t.stage : "";
      var completeBtn =
        '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--complete" data-roman-task-complete="' +
        escHtml(id) +
        '">Выполнено</button>';
      var uncompleteBtn =
        '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--ghost" data-roman-task-uncomplete="' +
        escHtml(id) +
        '">Вернуть</button>';
      var badges = "";
      if (important && !columnDone) {
        badges += '<span class="roman-task-planner__badge roman-task-planner__badge--important">Важно</span>';
      }
      if (doing && !columnDone) {
        badges += '<span class="roman-task-planner__badge roman-task-planner__badge--doing">Выполняется</span>';
      }
      if (stage === "waiting" && !columnDone) {
        badges += '<span class="roman-task-planner__badge roman-task-planner__badge--waiting">Ожидаю выполнения</span>';
      }
      if (stage === "checking" && !columnDone) {
        badges += '<span class="roman-task-planner__badge roman-task-planner__badge--checking">Проверяю выполнение</span>';
      }
      var badgesRow = "";
      if (badges) badgesRow = '<div class="roman-task-planner__meta-badges">' + badges + "</div>";
      var numberBadge =
        displayNum != null && displayNum > 0
          ? '<span class="roman-task-planner__num-cell" aria-label="Номер в списке">' + displayNum + ".</span>"
          : "";
      var taskTopLine = numberBadge || badgesRow ? '<div class="roman-task-planner__top-line">' + numberBadge + badgesRow + "</div>" : "";
      var reorderBtns =
        !columnDone && reorderOpts
          ? '<div class="roman-task-planner__reorder-col">' +
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--reorder" data-roman-task-move-up="' +
            escHtml(id) +
            '"' +
            (reorderOpts.canUp ? "" : " disabled") +
            ' aria-label="Выше в списке">↑</button>' +
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--reorder" data-roman-task-move-down="' +
            escHtml(id) +
            '"' +
            (reorderOpts.canDown ? "" : " disabled") +
            ' aria-label="Ниже в списке">↓</button>' +
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--reorder-edit" data-roman-task-edit="' +
            escHtml(id) +
            '">Изм.</button>' +
            "</div>"
          : "";
      var bodyContent = "";
      if (displayNum != null && displayNum > 0) {
        bodyContent =
          '<div class="roman-task-planner__body-row">' +
          '<div class="roman-task-planner__main-col">' +
          taskTopLine +
          '<div class="roman-task-planner__text">' +
          escHtml(text) +
          "</div>" +
          "</div>" +
          reorderBtns +
          "</div>";
      } else {
        bodyContent =
          taskTopLine +
          '<div class="roman-task-planner__text">' +
          escHtml(text) +
          "</div>";
      }
      var statusBtns = "";
      if (!columnDone) {
        if (doing) {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--ghost" data-roman-task-clear-doing="' +
            escHtml(id) +
            '">Стоп</button>';
        } else {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--doing" data-roman-task-set-doing="' +
            escHtml(id) +
            '">В работе</button>';
        }
        if (important) {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--ghost" data-roman-task-clear-important="' +
            escHtml(id) +
            '">Не важно</button>';
        } else {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--important" data-roman-task-set-important="' +
            escHtml(id) +
            '">Важно</button>';
        }
        if (stage === "waiting") {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--ghost" data-roman-task-clear-stage="' +
            escHtml(id) +
            '">Не жду</button>';
        } else {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--waiting" data-roman-task-set-stage="' +
            escHtml(id) +
            '" data-roman-task-stage="waiting">Ожидаю</button>';
        }
        if (stage === "checking") {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--ghost" data-roman-task-clear-stage="' +
            escHtml(id) +
            '">Не провер.</button>';
        } else {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--checking" data-roman-task-set-stage="' +
            escHtml(id) +
            '" data-roman-task-stage="checking">Проверяю</button>';
        }
      }
      var actionsHtml =
        (columnDone ? uncompleteBtn : statusBtns + completeBtn) +
        '<button type="button" class="roman-task-planner__btn" data-roman-task-edit="' +
        escHtml(id) +
        '">Изм.</button>' +
        '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--danger" data-roman-task-delete="' +
        escHtml(id) +
        '">Удалить</button>';
      var itemClass =
        "roman-task-planner__item" +
        (columnDone ? " roman-task-planner__item--done" : "") +
        (important && !columnDone ? " roman-task-planner__item--flag-important" : "") +
        (doing && !columnDone ? " roman-task-planner__item--in-progress" : "");
      return (
        '<li class="' +
        itemClass +
        '" data-roman-task-id="' +
        escHtml(id) +
        '">' +
        '<div class="roman-task-planner__swipe-clip">' +
        '<div class="roman-task-planner__swipe-track">' +
        '<div class="roman-task-planner__swipe-front">' +
        '<div class="roman-task-planner__body">' +
        bodyContent +
        "</div></div>" +
        '<div class="roman-task-planner__swipe-actions">' +
        actionsHtml +
        "</div></div></div></li>"
      );
    }
    function romanPlannerCloseAllSwipes(exceptClip) {
      if (!boardEl) return;
      var tracks = boardEl.querySelectorAll(".roman-task-planner__swipe-track");
      var exceptId = "";
      for (var i = 0; i < tracks.length; i++) {
        var tr = tracks[i];
        var c = tr && tr.closest ? tr.closest(".roman-task-planner__swipe-clip") : null;
        if (exceptClip && c === exceptClip) {
          var exceptItem = c.closest(".roman-task-planner__item[data-roman-task-id]");
          exceptId = exceptItem ? String(exceptItem.getAttribute("data-roman-task-id") || "") : "";
          continue;
        }
        tr.style.transform = "";
        tr.classList.remove("roman-task-planner__swipe-track--open");
      }
      romanPlannerOpenSwipeTaskId = exceptId;
    }
    var romanPlannerSwipeActive = null;
    var romanPlannerReorderActive = null;
    var romanPlannerOpenSwipeTaskId = "";
    /** passive: false — иначе preventDefault на pointermove не гасит скролл во время горизонтального свайпа (iOS / часть WebView). */
    var romanPlannerSwipeDocListenerOpts = { capture: true, passive: false };
    var romanPlannerSwipeDocEndOpts = { capture: true, passive: true };
    /** Touch: в части WebView (TG / iOS) pointermove для касания не идёт, пока скроллит родитель — ведём жест через touch*. */
    var romanPlannerSwipeTouchDocMoveOpts = { capture: true, passive: false };
    var romanPlannerSwipeTouchDocEndOpts = { capture: true, passive: true };
    function romanPlannerApplyOpenForClip(clip) {
      var track = clip.querySelector(".roman-task-planner__swipe-track");
      var front = clip.querySelector(".roman-task-planner__swipe-front");
      var actionsEl = clip.querySelector(".roman-task-planner__swipe-actions");
      if (!track || !front) return null;
      var cw = clip.offsetWidth || 0;
      var openPx = cw > 0 ? Math.max(120, cw - 8) : 0;
      if (actionsEl && cw > 0) {
        actionsEl.style.width = openPx + "px";
        actionsEl.style.flex = "0 0 " + openPx + "px";
      }
      if (cw > 0) {
        track.style.width = cw + openPx + "px";
        front.style.flex = "0 0 " + cw + "px";
        if (actionsEl) {
          actionsEl.style.width = openPx + "px";
          actionsEl.style.flex = "0 0 " + openPx + "px";
        }
      }
      return { track: track, openPx: openPx };
    }
    function romanPlannerSwipeGetTx(track) {
      var m = (track.style.transform || "").match(/translateX\((-?[0-9.]+)px\)/);
      return m ? parseFloat(m[1], 10) || 0 : 0;
    }
    function romanPlannerSwipeSetTx(track, openPx, px) {
      var min = -openPx;
      var max = 0;
      var x = px;
      if (x < min) x = min;
      if (x > max) x = max;
      track.style.transform = "translateX(" + x + "px)";
    }
    function romanPlannerSwipeSnap(track, openPx) {
      var cur = romanPlannerSwipeGetTx(track);
      var frac = 0.35;
      var wasOpen = track.classList.contains("roman-task-planner__swipe-track--open");
      var item = track.closest ? track.closest(".roman-task-planner__item[data-roman-task-id]") : null;
      var taskId = item ? String(item.getAttribute("data-roman-task-id") || "") : "";
      if (wasOpen) {
        /* Уже открыто: закрываем, если увели полосу правее чем (1−frac) пути к 0 — иначе тот же порог, что «влево», ломал свайп вправо. */
        var closeThreshold = -openPx * (1 - frac);
        if (cur > closeThreshold) {
          track.classList.remove("roman-task-planner__swipe-track--open");
          romanPlannerSwipeSetTx(track, openPx, 0);
          if (romanPlannerOpenSwipeTaskId === taskId) romanPlannerOpenSwipeTaskId = "";
        } else {
          track.classList.add("roman-task-planner__swipe-track--open");
          romanPlannerSwipeSetTx(track, openPx, -openPx);
          romanPlannerOpenSwipeTaskId = taskId;
        }
      } else {
        var openThreshold = -openPx * frac;
        if (cur < openThreshold) {
          track.classList.add("roman-task-planner__swipe-track--open");
          romanPlannerSwipeSetTx(track, openPx, -openPx);
          romanPlannerOpenSwipeTaskId = taskId;
        } else {
          track.classList.remove("roman-task-planner__swipe-track--open");
          romanPlannerSwipeSetTx(track, openPx, 0);
          if (romanPlannerOpenSwipeTaskId === taskId) romanPlannerOpenSwipeTaskId = "";
        }
      }
    }
    function romanPlannerSwipeRemoveDocListeners() {
      if (!romanPlannerSwipeActive || !romanPlannerSwipeActive._docBound) return;
      var st = romanPlannerSwipeActive;
      if (st._touchDocBound) {
        document.removeEventListener("touchmove", romanPlannerSwipeTouchDocMove, romanPlannerSwipeTouchDocMoveOpts);
        document.removeEventListener("touchend", romanPlannerSwipeTouchDocEnd, romanPlannerSwipeTouchDocEndOpts);
        document.removeEventListener("touchcancel", romanPlannerSwipeTouchDocEnd, romanPlannerSwipeTouchDocEndOpts);
        st._touchDocBound = false;
      } else {
        document.removeEventListener("pointermove", romanPlannerSwipeDocMove, romanPlannerSwipeDocListenerOpts);
        document.removeEventListener("pointerup", romanPlannerSwipeDocEnd, romanPlannerSwipeDocEndOpts);
        document.removeEventListener("pointercancel", romanPlannerSwipeDocEnd, romanPlannerSwipeDocEndOpts);
      }
      if (st.clip && st._lostCapBound) {
        try {
          st.clip.removeEventListener("lostpointercapture", romanPlannerSwipeLostCap);
        } catch (eRm) {}
        st._lostCapBound = false;
      }
      st._docBound = false;
    }
    function romanPlannerSwipeEnd(doSnap) {
      var st = romanPlannerSwipeActive;
      if (!st) return;
      romanPlannerSwipeRemoveDocListeners();
      var pid = st.pointerId;
      var clip = st.clip;
      var track = st.track;
      var openPx = st.openPx;
      var hadCapture = st.pointerCaptureSet;
      romanPlannerSwipeActive = null;
      if (clip != null && pid != null && hadCapture) {
        try {
          clip.releasePointerCapture(pid);
        } catch (eRel) {}
      }
      if (doSnap && track) romanPlannerSwipeSnap(track, openPx);
    }
    function romanPlannerSwipeLostCap(evLost) {
      var st = romanPlannerSwipeActive;
      if (!st || !st.dragging || st.pointerId == null) return;
      if (evLost.pointerId !== st.pointerId) return;
      st.dragging = false;
      romanPlannerSwipeEnd(true);
    }
    function romanPlannerSwipeFindTouch(ev, id) {
      var i;
      for (i = 0; i < ev.touches.length; i++) {
        if (ev.touches[i].identifier === id) return ev.touches[i];
      }
      return null;
    }
    function romanPlannerSwipeFindTouchChanged(ev, id) {
      var i;
      for (i = 0; i < ev.changedTouches.length; i++) {
        if (ev.changedTouches[i].identifier === id) return ev.changedTouches[i];
      }
      return null;
    }
    /**
     * @param {number} clientX
     * @param {number} clientY
     * @param {Event} evPrevent — для preventDefault и setPointerCapture (PointerEvent); у TouchEvent capture не нужен.
     * @param {boolean} isMouse
     */
    function romanPlannerSwipeApplyMove(clientX, clientY, evPrevent, isMouse) {
      if (romanPlannerReorderActive && romanPlannerReorderActive.active) return;
      var st = romanPlannerSwipeActive;
      if (!st || !st.dragging) return;
      var dx = clientX - st.startX;
      var dy = clientY - st.startY;
      var adx = Math.abs(dx);
      var ady = Math.abs(dy);
      /** Пока палец не вышел из «мёртвой зоны», не трогаем скролл и не двигаем ряд — иначе preventDefault ломает вертикальный скролл списка. */
      var slop = isMouse ? 5 : 10;
      /** На тачскрине чуть шире допуск по диагонали — иначе вертикальный скролл списка часто «перебивает» свайп. */
      var tilt = isMouse ? 4 : 6;
      if (!st.swipeAxisLocked) {
        if (Math.max(adx, ady) < slop) return;
        /** Только явная вертикаль уступает скроллу списка; иначе — горизонтальный свайп (диагональ «влево» не обрываем). */
        if (ady > adx + tilt) {
          romanPlannerSwipeSetTx(st.track, st.openPx, st.baseTx);
          st.dragging = false;
          romanPlannerSwipeEnd(false);
          return;
        }
        st.swipeAxisLocked = true;
        if (romanPlannerReorderActive && !romanPlannerReorderActive.active) {
          romanPlannerReorderCancel();
        }
        if (!st.pointerCaptureSet && st.pointerId != null && evPrevent && typeof evPrevent.pointerId === "number") {
          st.pointerCaptureSet = true;
          try {
            st.clip.setPointerCapture(evPrevent.pointerId);
          } catch (eCap) {}
          if (!st._lostCapBound) {
            st._lostCapBound = true;
            try {
              st.clip.addEventListener("lostpointercapture", romanPlannerSwipeLostCap);
            } catch (eL) {}
          }
        }
      }
      try {
        evPrevent.preventDefault();
      } catch (ePm) {}
      romanPlannerSwipeSetTx(st.track, st.openPx, st.baseTx + dx);
    }
    function romanPlannerSwipeDocMove(ev) {
      var st = romanPlannerSwipeActive;
      if (!st || !st.dragging || ev.pointerId !== st.pointerId) return;
      var isMouse = ev.pointerType === "mouse";
      romanPlannerSwipeApplyMove(ev.clientX, ev.clientY, ev, isMouse);
    }
    function romanPlannerSwipeTouchDocMove(ev) {
      var reorder = romanPlannerReorderActive;
      if (reorder && reorder.active && reorder.touchId != null) {
        var dragTouch = romanPlannerSwipeFindTouch(ev, reorder.touchId);
        if (dragTouch) {
          try { ev.preventDefault(); } catch (eReorderTouchPd) {}
          romanPlannerReorderMoveTo(dragTouch.clientY);
          return;
        }
      }
      var st = romanPlannerSwipeActive;
      if (!st || !st.dragging || st.touchId == null) return;
      var touch = romanPlannerSwipeFindTouch(ev, st.touchId);
      if (!touch) return;
      romanPlannerSwipeApplyMove(touch.clientX, touch.clientY, ev, false);
    }
    function romanPlannerSwipeDocEnd(ev) {
      var st = romanPlannerSwipeActive;
      if (!st || ev.pointerId !== st.pointerId) return;
      if (!st.dragging) return;
      st.dragging = false;
      romanPlannerSwipeEnd(true);
    }
    function romanPlannerSwipeTouchDocEnd(ev) {
      var reorder = romanPlannerReorderActive;
      if (reorder && reorder.touchId != null && romanPlannerSwipeFindTouchChanged(ev, reorder.touchId)) {
        var wasReorderActive = reorder.active;
        var keepReorderScrollTop = reorder.keepScrollTop;
        var keepReorderPageScrollTop = reorder.keepPageScrollTop;
        if (wasReorderActive) {
          romanPlannerReorderClearTimer();
          reorder.item.classList.remove("roman-task-planner__item--dragging");
          if (listAll) listAll.classList.remove("roman-task-planner__list--dragging");
          document.body.classList.remove("tasks-drag-active");
          romanPlannerReorderActive = null;
          romanPlannerReorderSaveDomOrder(keepReorderScrollTop, keepReorderPageScrollTop);
          if (romanPlannerSwipeActive) romanPlannerSwipeEnd(false);
          return;
        }
        romanPlannerReorderCancel();
      }
      var st = romanPlannerSwipeActive;
      if (!st || st.touchId == null) return;
      if (!romanPlannerSwipeFindTouchChanged(ev, st.touchId)) return;
      if (!st.dragging) return;
      st.dragging = false;
      romanPlannerSwipeEnd(true);
    }
    function romanPlannerSwipeStartOnClip(clip, clientX, clientY, pointerId, touchId) {
      if (romanPlannerReorderActive && romanPlannerReorderActive.active) return false;
      romanPlannerCloseAllSwipes(clip);
      var layout = romanPlannerApplyOpenForClip(clip);
      if (!layout) return false;
      var track = layout.track;
      var openPx = layout.openPx;
      var useTouch = touchId != null;
      romanPlannerSwipeActive = {
        clip: clip,
        track: track,
        openPx: openPx,
        pointerId: pointerId,
        touchId: touchId,
        startX: clientX,
        startY: clientY,
        baseTx: romanPlannerSwipeGetTx(track),
        dragging: true,
        swipeAxisLocked: false,
        pointerCaptureSet: false,
        _lostCapBound: false,
        _docBound: true,
        _touchDocBound: useTouch,
      };
      if (useTouch) {
        document.addEventListener("touchmove", romanPlannerSwipeTouchDocMove, romanPlannerSwipeTouchDocMoveOpts);
        document.addEventListener("touchend", romanPlannerSwipeTouchDocEnd, romanPlannerSwipeTouchDocEndOpts);
        document.addEventListener("touchcancel", romanPlannerSwipeTouchDocEnd, romanPlannerSwipeTouchDocEndOpts);
      } else {
        document.addEventListener("pointermove", romanPlannerSwipeDocMove, romanPlannerSwipeDocListenerOpts);
        document.addEventListener("pointerup", romanPlannerSwipeDocEnd, romanPlannerSwipeDocEndOpts);
        document.addEventListener("pointercancel", romanPlannerSwipeDocEnd, romanPlannerSwipeDocEndOpts);
      }
      return true;
    }
    function romanPlannerReorderClearTimer() {
      if (romanPlannerReorderActive && romanPlannerReorderActive.timer) {
        clearTimeout(romanPlannerReorderActive.timer);
        romanPlannerReorderActive.timer = null;
      }
    }
    function romanPlannerReorderItemAt(clientY, draggingItem) {
      var items = Array.prototype.slice.call(listAll.querySelectorAll(".roman-task-planner__item[data-roman-task-id]"));
      var closest = { offset: Number.NEGATIVE_INFINITY, element: null };
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item === draggingItem) continue;
        var rect = item.getBoundingClientRect();
        var offset = clientY - rect.top - rect.height / 2;
        if (offset < 0 && offset > closest.offset) closest = { offset: offset, element: item };
      }
      return closest.element;
    }
    function romanPlannerReorderMoveTo(clientY) {
      var st = romanPlannerReorderActive;
      if (!st || !st.active || !st.item) return;
      var beforeEl = romanPlannerReorderItemAt(clientY, st.item);
      if (beforeEl) listAll.insertBefore(st.item, beforeEl);
      else listAll.appendChild(st.item);
    }
    function romanPlannerReorderSaveDomOrder(keepScrollTop, keepPageScrollTop) {
      var tasks = loadTasks();
      var byId = {};
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i] && tasks[i].id != null) byId[String(tasks[i].id)] = tasks[i];
      }
      var cards = Array.prototype.slice.call(listAll.querySelectorAll(".roman-task-planner__item[data-roman-task-id]"));
      var order = 0;
      for (var j = 0; j < cards.length; j++) {
        var id = cards[j].getAttribute("data-roman-task-id");
        if (!byId[id]) continue;
        if (plannerTab === "important") byId[id].important = true;
        if (plannerTab === "normal") byId[id].important = false;
        byId[id].plannerOrder = order * PLANNER_ORDER_STEP;
        order++;
      }
      saveTasks(tasks);
      renderTasks();
      function restore() {
        if (listAll) listAll.scrollTop = keepScrollTop || 0;
        var se = document.scrollingElement || document.documentElement || document.body;
        if (se) se.scrollTop = keepPageScrollTop || 0;
      }
      restore();
      try { requestAnimationFrame(restore); } catch (eRaf) { setTimeout(restore, 0); }
    }
    function romanPlannerReorderCancel() {
      romanPlannerReorderClearTimer();
      if (romanPlannerReorderActive && romanPlannerReorderActive.item) {
        romanPlannerReorderActive.item.classList.remove("roman-task-planner__item--dragging");
        try {
          if (romanPlannerReorderActive.pointerId != null) {
            romanPlannerReorderActive.item.releasePointerCapture(romanPlannerReorderActive.pointerId);
          }
        } catch (eRel) {}
      }
      if (listAll) listAll.classList.remove("roman-task-planner__list--dragging");
      document.body.classList.remove("tasks-drag-active");
      romanPlannerReorderActive = null;
    }
    function romanPlannerReorderStart() {
      var st = romanPlannerReorderActive;
      if (!st || st.active || !st.item) return;
      romanPlannerReorderClearTimer();
      if (romanPlannerSwipeActive) romanPlannerSwipeEnd(false);
      romanPlannerCloseAllSwipes();
      st.active = true;
      st.item.classList.add("roman-task-planner__item--dragging");
      listAll.classList.add("roman-task-planner__list--dragging");
      document.body.classList.add("tasks-drag-active");
    }
    function romanPlannerReorderPointerDown(ev) {
      if (!listAll || plannerTab === "done") return;
      if (ev.pointerType === "mouse" && ev.button !== 0) return;
      if (romanPlannerReorderActive) return;
      var t = ev.target;
      if (!t || !t.closest) return;
      if (t.closest(".roman-task-planner__btn, .roman-task-planner__edit-ta, input, textarea, select, a")) return;
      var item = t.closest(".roman-task-planner__item[data-roman-task-id]");
      if (!item || !listAll.contains(item)) return;
      romanPlannerReorderActive = {
        item: item,
        pointerId: ev.pointerId,
        startX: ev.clientX,
        startY: ev.clientY,
        startedAt: Date.now(),
        active: false,
        timer: setTimeout(romanPlannerReorderStart, 220),
        keepScrollTop: listAll.scrollTop || 0,
        keepPageScrollTop:
          (document.scrollingElement && document.scrollingElement.scrollTop) ||
          (document.documentElement && document.documentElement.scrollTop) ||
          (document.body && document.body.scrollTop) ||
          0,
      };
      try { item.setPointerCapture(ev.pointerId); } catch (eCap) {}
    }
    function romanPlannerReorderPointerMove(ev) {
      var st = romanPlannerReorderActive;
      if (!st || st.pointerId !== ev.pointerId) return;
      var dx = ev.clientX - st.startX;
      var dy = ev.clientY - st.startY;
      if (!st.active) {
        var elapsed = Date.now() - st.startedAt;
        if (Math.abs(dx) > 14 || (Math.abs(dy) > 14 && elapsed < 180)) {
          romanPlannerReorderCancel();
          return;
        }
        return;
      }
      try { ev.preventDefault(); } catch (ePd) {}
      romanPlannerReorderMoveTo(ev.clientY);
    }
    function romanPlannerReorderPointerUp(ev) {
      var st = romanPlannerReorderActive;
      if (!st || st.pointerId !== ev.pointerId) return;
      var wasActive = st.active;
      var keepScrollTop = st.keepScrollTop;
      var keepPageScrollTop = st.keepPageScrollTop;
      if (wasActive) {
        try { ev.preventDefault(); } catch (ePd) {}
        romanPlannerReorderClearTimer();
        st.item.classList.remove("roman-task-planner__item--dragging");
        try { st.item.releasePointerCapture(ev.pointerId); } catch (eRel) {}
        listAll.classList.remove("roman-task-planner__list--dragging");
        document.body.classList.remove("tasks-drag-active");
        romanPlannerReorderActive = null;
        romanPlannerReorderSaveDomOrder(keepScrollTop, keepPageScrollTop);
        return;
      }
      romanPlannerReorderCancel();
    }
    function romanPlannerListTouchStart(ev) {
      if (!listAll || !boardEl) return;
      if (ev.touches.length !== 1) return;
      var touch = ev.touches[0];
      var t = ev.target;
      if (!t || !t.closest) return;
      var clip = t.closest(".roman-task-planner__swipe-clip");
      if (!clip || !listAll.contains(clip)) return;
      if (t.closest(".roman-task-planner__btn")) return;
      if (t.closest(".roman-task-planner__edit-ta")) return;
      if (romanPlannerSwipeActive) return;
      if (romanPlannerReorderActive && romanPlannerReorderActive.active) return;
      var item = t.closest(".roman-task-planner__item[data-roman-task-id]");
      if (!romanPlannerReorderActive && item && listAll.contains(item) && plannerTab !== "done") {
        romanPlannerReorderActive = {
          item: item,
          pointerId: null,
          touchId: touch.identifier,
          startX: touch.clientX,
          startY: touch.clientY,
          startedAt: Date.now(),
          active: false,
          timer: setTimeout(romanPlannerReorderStart, 220),
          keepScrollTop: listAll.scrollTop || 0,
          keepPageScrollTop:
            (document.scrollingElement && document.scrollingElement.scrollTop) ||
            (document.documentElement && document.documentElement.scrollTop) ||
            (document.body && document.body.scrollTop) ||
            0,
        };
      }
      if (romanPlannerReorderActive && !romanPlannerReorderActive.active) {
        romanPlannerReorderActive.touchId = touch.identifier;
      }
      romanPlannerSwipeStartOnClip(clip, touch.clientX, touch.clientY, null, touch.identifier);
    }
    function romanPlannerListPointerDown(ev) {
      if (!listAll || !boardEl) return;
      var t = ev.target;
      if (!t || !t.closest) return;
      var clip = t.closest(".roman-task-planner__swipe-clip");
      if (!clip || !listAll.contains(clip)) return;
      if (t.closest(".roman-task-planner__btn")) return;
      if (t.closest(".roman-task-planner__edit-ta")) return;
      if (ev.pointerType === "mouse" && ev.button !== 0) return;
      if (romanPlannerSwipeActive) return;
      if (romanPlannerReorderActive && romanPlannerReorderActive.active) return;
      /** Касание уже обработано touchstart (там touchmove с passive:false). */
      if (ev.pointerType === "touch") return;
      try {
        ev.preventDefault();
      } catch (ePd) {}
      romanPlannerSwipeStartOnClip(clip, ev.clientX, ev.clientY, ev.pointerId, null);
    }
    function initRomanPlannerSwipeRows() {
      if (!boardEl) return;
      if (listAll && listAll.dataset.romanPlannerSwipeDelegation !== "1") {
        listAll.dataset.romanPlannerSwipeDelegation = "1";
        listAll.addEventListener("pointerdown", romanPlannerReorderPointerDown, true);
        listAll.addEventListener("pointermove", romanPlannerReorderPointerMove, true);
        listAll.addEventListener("pointerup", romanPlannerReorderPointerUp, true);
        listAll.addEventListener("pointercancel", romanPlannerReorderCancel, true);
        listAll.addEventListener("touchstart", romanPlannerListTouchStart, { capture: true, passive: true });
        listAll.addEventListener("pointerdown", romanPlannerListPointerDown);
        listAll.addEventListener(
          "dragstart",
          function (eDg) {
            if (eDg.target && eDg.target.closest && eDg.target.closest(".roman-task-planner__swipe-clip")) eDg.preventDefault();
          },
          true
        );
      }
      var clips = boardEl.querySelectorAll(".roman-task-planner__swipe-clip");
      for (var c = 0; c < clips.length; c++) {
        romanPlannerApplyOpenForClip(clips[c]);
      }
    }
    function romanPlannerRestoreOpenSwipe() {
      if (!romanPlannerOpenSwipeTaskId || !boardEl) return;
      var item = boardEl.querySelector(
        '.roman-task-planner__item[data-roman-task-id="' + cssEscape(romanPlannerOpenSwipeTaskId) + '"]'
      );
      var clip = item ? item.querySelector(".roman-task-planner__swipe-clip") : null;
      if (!clip) {
        romanPlannerOpenSwipeTaskId = "";
        return;
      }
      var layout = romanPlannerApplyOpenForClip(clip);
      if (!layout || !layout.track) {
        romanPlannerOpenSwipeTaskId = "";
        return;
      }
      layout.track.classList.add("roman-task-planner__swipe-track--open");
      romanPlannerSwipeSetTx(layout.track, layout.openPx, -layout.openPx);
    }
    function renderTasks() {
      setPlannerTabUi();
      var raw = loadTasks();
      var activeRaw = raw.filter(function (x) {
        return !x.done;
      });
      var importantActive = sortBucketActiveTasks(
        activeRaw.filter(function (x) {
          return !!x.important;
        })
      );
      var normalActive = sortBucketActiveTasks(
        activeRaw.filter(function (x) {
          return !x.important;
        })
      );
      var doneCol = sortTasksByCreatedAsc(raw.filter(function (x) {
        return !!x.done;
      }));
      var parts = [];
      parts.push('<li class="roman-task-planner__list-hint">Свайп влево открывает меню действий</li>');
      if (plannerTab === "important") {
        if (importantActive.length) {
          for (var ai = 0; ai < importantActive.length; ai++) {
            parts.push(
              renderTaskRow(importantActive[ai], false, ai + 1, {
                canUp: ai > 0,
                canDown: ai < importantActive.length - 1,
              })
            );
          }
        } else {
          parts.push(
            '<li class="roman-task-planner__empty roman-task-planner__empty--stacked">Нет важных задач</li>'
          );
        }
      } else if (plannerTab === "normal") {
        if (normalActive.length) {
          for (var ni = 0; ni < normalActive.length; ni++) {
            parts.push(
              renderTaskRow(normalActive[ni], false, ni + 1, {
                canUp: ni > 0,
                canDown: ni < normalActive.length - 1,
              })
            );
          }
        } else {
          parts.push(
            '<li class="roman-task-planner__empty roman-task-planner__empty--stacked">Нет неважных задач</li>'
          );
        }
      } else {
        if (doneCol.length) {
          for (var di = 0; di < doneCol.length; di++) {
            parts.push(renderTaskRow(doneCol[di], true, di + 1, null));
          }
        } else {
          parts.push(
            '<li class="roman-task-planner__empty roman-task-planner__empty--stacked">Нет выполненных</li>'
          );
        }
      }
      listAll.innerHTML = parts.join("");
      initRomanPlannerSwipeRows();
      romanPlannerRestoreOpenSwipe();
      updatePlannerHintText(raw);
    }
    function openPlannerModal() {
      if (!isPlannerAllowedUser() || !plannerModal) return;
      romanPlannerDirtySinceOpen = false;
      plannerTab = readPlannerTabStorage();
      renderTasks();
      plannerModal.setAttribute("aria-hidden", "false");
      romanPlannerPullFromServer();
      romanPlannerStartLiveSync();
      try {
        var raf = window.requestAnimationFrame || function (fn) {
          setTimeout(fn, 0);
        };
        raf(function () {
          resizePlannerComposer();
        });
      } catch (eRz) {}
    }
    function closePlannerModal() {
      romanPlannerStopLiveSync();
      if (plannerModal) plannerModal.setAttribute("aria-hidden", "true");
      if (plannerModal) plannerModal.classList.remove("roman-task-planner-modal--keyboard");
      try {
        var ae = document.activeElement;
        if (ae && plannerModal && plannerModal.contains(ae) && ae.blur) ae.blur();
      } catch (eB) {}
      try {
        document.documentElement.classList.remove("gazette-comment-keyboard");
      } catch (eGk) {}
      try {
        if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
          window.__pokerFinalizeChatKeyboardDismiss();
        }
      } catch (eKb) {}
    }
    function syncVisibility() {
      if (!isPlannerAllowedUser()) {
        openBtn.classList.add("welcome-planner-icon--hidden");
        closePlannerModal();
        return;
      }
      openBtn.classList.remove("welcome-planner-icon--hidden");
      if (plannerModal.getAttribute("aria-hidden") === "false") {
        renderTasks();
        romanPlannerPullFromServer();
        romanPlannerStartLiveSync();
      }
    }
    try {
      document.addEventListener("visibilitychange", function () {
        if (typeof document.visibilityState !== "undefined" && document.visibilityState !== "visible") return;
        if (!plannerModal || plannerModal.getAttribute("aria-hidden") !== "false") return;
        romanPlannerPullAmbient();
      });
    } catch (eVis) {}
    try {
      window.addEventListener("pageshow", function () {
        if (!plannerModal || plannerModal.getAttribute("aria-hidden") !== "false") return;
        romanPlannerPullAmbient();
      });
    } catch (ePs) {}
    if (tabImportantBtn) {
      tabImportantBtn.addEventListener("click", function () {
        plannerTab = "important";
        writePlannerTabStorage("important");
        renderTasks();
      });
    }
    if (tabNormalBtn) {
      tabNormalBtn.addEventListener("click", function () {
        plannerTab = "normal";
        writePlannerTabStorage("normal");
        renderTasks();
      });
    }
    if (tabDoneBtn) {
      tabDoneBtn.addEventListener("click", function () {
        plannerTab = "done";
        writePlannerTabStorage("done");
        renderTasks();
      });
    }
    openBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (!isPlannerAllowedUser()) return;
      openPlannerModal();
    });
    if (plannerBackdrop) {
      plannerBackdrop.addEventListener("click", function () {
        closePlannerModal();
      });
    }
    if (plannerClose) {
      plannerClose.addEventListener("click", function () {
        closePlannerModal();
      });
    }
    (function bindPlannerModalKeyboardRepair() {
      if (!plannerModal) return;
      var blurTimer = null;
      function updatePlannerKeyboardLayout() {
        var vv = window.visualViewport || null;
        var h = vv && vv.height ? Math.round(vv.height) : window.innerHeight || 0;
        var top = vv && vv.offsetTop ? Math.round(vv.offsetTop) : 0;
        if (h > 0) plannerModal.style.setProperty("--roman-planner-viewport-height", h + "px");
        plannerModal.style.setProperty("--roman-planner-viewport-top", top + "px");
      }
      function keepPlannerFieldVisible(field) {
        if (!field || !plannerModal.contains(field)) return;
        updatePlannerKeyboardLayout();
        try {
          field.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" });
        } catch (eSv) {
          try { field.scrollIntoView(false); } catch (eSv2) {}
        }
      }
      function scheduleKeepPlannerFieldVisible(field) {
        keepPlannerFieldVisible(field);
        setTimeout(function () { keepPlannerFieldVisible(field); }, 180);
        setTimeout(function () { keepPlannerFieldVisible(field); }, 420);
      }
      function scheduleFinalizePlannerKb() {
        clearTimeout(blurTimer);
        blurTimer = setTimeout(function () {
          blurTimer = null;
          var active = document.activeElement;
          var kbField =
            active &&
            active.classList &&
            (active.classList.contains("roman-task-planner__input") ||
              active.classList.contains("roman-task-planner__edit-ta"));
          if (kbField && plannerModal.contains(active)) return;
          plannerModal.classList.remove("roman-task-planner-modal--keyboard");
          try {
            document.documentElement.classList.remove("gazette-comment-keyboard");
          } catch (eRm) {}
          try {
            if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
              window.__pokerFinalizeChatKeyboardDismiss();
            }
          } catch (eFin) {}
        }, 120);
      }
      plannerModal.addEventListener(
        "focusin",
        function (ev) {
          var t = ev.target;
          if (
            !t ||
            !t.classList ||
            (!t.classList.contains("roman-task-planner__input") &&
              !t.classList.contains("roman-task-planner__edit-ta"))
          ) {
            return;
          }
          if (!plannerModal.contains(t)) return;
          try {
            document.documentElement.classList.add("gazette-comment-keyboard");
          } catch (eIn) {}
          plannerModal.classList.add("roman-task-planner-modal--keyboard");
          scheduleKeepPlannerFieldVisible(t);
        },
        true
      );
      plannerModal.addEventListener(
        "focusout",
        function (ev) {
          var t = ev.target;
          if (
            !t ||
            !t.classList ||
            (!t.classList.contains("roman-task-planner__input") &&
              !t.classList.contains("roman-task-planner__edit-ta"))
          ) {
            return;
          }
          if (!plannerModal.contains(t)) return;
          scheduleFinalizePlannerKb();
        },
        true
      );
      try {
        if (window.visualViewport) {
          window.visualViewport.addEventListener("resize", function () {
            var active = document.activeElement;
            var kbField =
              active &&
              active.classList &&
              (active.classList.contains("roman-task-planner__input") ||
                active.classList.contains("roman-task-planner__edit-ta"));
            if (!kbField || !plannerModal.contains(active)) return;
            scheduleKeepPlannerFieldVisible(active);
          });
        }
      } catch (eVv) {}
    })();
    window.addEventListener("poker-telegram-auth", function () {
      syncVisibility();
    });
    window.__pokerSyncRomanTaskPlanner = syncVisibility;
    input.addEventListener("input", function () {
      resizePlannerComposer();
    });
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!isPlannerAllowedUser()) return;
      var text = input.value ? input.value.trim() : "";
      if (!text) return;
      var wantImportant = !!(importantCheckbox && importantCheckbox.checked);
      var tasks = loadTasks();
      tasks.push({
        id: "t_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9),
        text: text,
        done: false,
        doing: false,
        important: wantImportant,
        createdAt: Date.now(),
        plannerOrder: nextPlannerOrderInBucket(tasks, wantImportant),
      });
      saveTasks(tasks);
      input.value = "";
      if (importantCheckbox) importantCheckbox.checked = false;
      if (wantImportant && plannerTab !== "important") {
        plannerTab = "important";
        writePlannerTabStorage("important");
        setPlannerTabUi();
      }
      renderTasks();
      resizePlannerComposer();
    });
    boardEl.addEventListener("click", function (ev) {
      if (!isPlannerAllowedUser()) return;
      var t = ev.target;
      if (!t || !t.closest) return;
      var setDoing = t.closest("[data-roman-task-set-doing]");
      if (setDoing) {
        var idSd = setDoing.getAttribute("data-roman-task-set-doing");
        var tasksSd = loadTasks();
        var ixSd = findTaskById(tasksSd, idSd);
        if (ixSd >= 0 && !tasksSd[ixSd].done) {
          tasksSd[ixSd].doing = true;
          saveTasks(tasksSd);
          renderTasks();
        }
        return;
      }
      var clearDoing = t.closest("[data-roman-task-clear-doing]");
      if (clearDoing) {
        var idCd = clearDoing.getAttribute("data-roman-task-clear-doing");
        var tasksCd = loadTasks();
        var ixCd = findTaskById(tasksCd, idCd);
        if (ixCd >= 0) {
          tasksCd[ixCd].doing = false;
          saveTasks(tasksCd);
          renderTasks();
        }
        return;
      }
      var setImp = t.closest("[data-roman-task-set-important]");
      if (setImp) {
        var idSi = setImp.getAttribute("data-roman-task-set-important");
        var tasksSi = loadTasks();
        var ixSi = findTaskById(tasksSi, idSi);
        if (ixSi >= 0 && !tasksSi[ixSi].done) {
          tasksSi[ixSi].important = true;
          tasksSi[ixSi].plannerOrder = nextPlannerOrderInBucket(tasksSi, true);
          saveTasks(tasksSi);
          renderTasks();
        }
        return;
      }
      var clearImp = t.closest("[data-roman-task-clear-important]");
      if (clearImp) {
        var idCi = clearImp.getAttribute("data-roman-task-clear-important");
        var tasksCi = loadTasks();
        var ixCi = findTaskById(tasksCi, idCi);
        if (ixCi >= 0) {
          tasksCi[ixCi].important = false;
          tasksCi[ixCi].plannerOrder = nextPlannerOrderInBucket(tasksCi, false);
          saveTasks(tasksCi);
          renderTasks();
        }
        return;
      }
      var setStage = t.closest("[data-roman-task-set-stage]");
      if (setStage) {
        var idSt = setStage.getAttribute("data-roman-task-set-stage");
        var nextStage = setStage.getAttribute("data-roman-task-stage") || "";
        var tasksSt = loadTasks();
        var ixSt = findTaskById(tasksSt, idSt);
        if (ixSt >= 0 && !tasksSt[ixSt].done && (nextStage === "waiting" || nextStage === "checking")) {
          tasksSt[ixSt].stage = nextStage;
          saveTasks(tasksSt);
          renderTasks();
        }
        return;
      }
      var clearStage = t.closest("[data-roman-task-clear-stage]");
      if (clearStage) {
        var idCs = clearStage.getAttribute("data-roman-task-clear-stage");
        var tasksCs = loadTasks();
        var ixCs = findTaskById(tasksCs, idCs);
        if (ixCs >= 0) {
          delete tasksCs[ixCs].stage;
          saveTasks(tasksCs);
          renderTasks();
        }
        return;
      }
      var moveUpEl = t.closest("[data-roman-task-move-up]");
      if (moveUpEl) {
        if (moveUpEl.disabled) return;
        var idMu = moveUpEl.getAttribute("data-roman-task-move-up");
        movePlannerTaskInList(idMu, -1);
        return;
      }
      var moveDownEl = t.closest("[data-roman-task-move-down]");
      if (moveDownEl) {
        if (moveDownEl.disabled) return;
        var idMd = moveDownEl.getAttribute("data-roman-task-move-down");
        movePlannerTaskInList(idMd, 1);
        return;
      }
      var completeBtn = t.closest("[data-roman-task-complete]");
      if (completeBtn) {
        var idC = completeBtn.getAttribute("data-roman-task-complete");
        var tasksC = loadTasks();
        var ixC = findTaskById(tasksC, idC);
        if (ixC >= 0) {
          tasksC[ixC].done = true;
          saveTasks(tasksC);
          renderTasks();
        }
        return;
      }
      var uncompleteBtn = t.closest("[data-roman-task-uncomplete]");
      if (uncompleteBtn) {
        var idU = uncompleteBtn.getAttribute("data-roman-task-uncomplete");
        var tasksU = loadTasks();
        var ixU = findTaskById(tasksU, idU);
        if (ixU >= 0) {
          tasksU[ixU].done = false;
          tasksU[ixU].plannerOrder = nextPlannerOrderInBucket(tasksU, !!tasksU[ixU].important);
          saveTasks(tasksU);
          renderTasks();
        }
        return;
      }
      var del = t.closest("[data-roman-task-delete]");
      if (del) {
        var idD = del.getAttribute("data-roman-task-delete");
        if (!confirm("Удалить задачу?")) return;
        var tasksD = loadTasks();
        var ixD = findTaskById(tasksD, idD);
        if (ixD >= 0) {
          tasksD.splice(ixD, 1);
          saveTasks(tasksD);
          renderTasks();
        }
        return;
      }
      var saveB = t.closest("[data-roman-task-save]");
      if (saveB) {
        var idS = saveB.getAttribute("data-roman-task-save");
        var liS = saveB.closest(".roman-task-planner__item");
        var taS = liS && liS.querySelector(".roman-task-planner__edit-ta");
        var newText = taS && taS.value ? taS.value.trim() : "";
        if (!newText) {
          var tg0 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tg0 && tg0.showAlert) tg0.showAlert("Введите текст задачи.");
          else alert("Введите текст задачи.");
          return;
        }
        var tasksS = loadTasks();
        var ixS = findTaskById(tasksS, idS);
        if (ixS >= 0) {
          tasksS[ixS].text = newText;
          saveTasks(tasksS);
          renderTasks();
        }
        return;
      }
      var cancelB = t.closest("[data-roman-task-cancel]");
      if (cancelB) {
        renderTasks();
        return;
      }
      var edit = t.closest("[data-roman-task-edit]");
      if (!edit) return;
      var idE = edit.getAttribute("data-roman-task-edit");
      var li = edit.closest(".roman-task-planner__item");
      if (!li || li.getAttribute("data-roman-editing") === "1") return;
      var tasksE = loadTasks();
      var ixE = findTaskById(tasksE, idE);
      if (ixE < 0) return;
      var body = li.querySelector(".roman-task-planner__body");
      if (!body) return;
      var editClip = li.querySelector(".roman-task-planner__swipe-clip");
      romanPlannerCloseAllSwipes();
      if (editClip) romanPlannerApplyOpenForClip(editClip);
      li.setAttribute("data-roman-editing", "1");
      var cur = tasksE[ixE].text != null ? String(tasksE[ixE].text) : "";
      body.innerHTML =
        '<textarea class="roman-task-planner__edit-ta" maxlength="500" aria-label="Редактирование задачи"></textarea>' +
        '<div class="roman-task-planner__edit-actions">' +
        '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--primary" data-roman-task-save="' +
        escHtml(idE) +
        '">Сохранить</button>' +
        '<button type="button" class="roman-task-planner__btn" data-roman-task-cancel="' +
        escHtml(idE) +
        '">Отмена</button>' +
        "</div>";
      var taEd = body.querySelector(".roman-task-planner__edit-ta");
      if (taEd) taEd.value = cur;
      if (editClip) romanPlannerApplyOpenForClip(editClip);
      try {
        taEd.focus();
      } catch (eFoc) {}
    });
    syncVisibility();
    updatePlannerHintText();
    resizePlannerComposer();
  })();

  (function initPartnershipModal() {
    var modal = document.getElementById("partnershipModal");
    var backdrop = document.getElementById("partnershipModalBackdrop");
    var closeBtn = document.getElementById("partnershipModalClose");
    var track = document.getElementById("partnershipModalTrack");
    var indicator = document.getElementById("partnershipPageIndicator");
    var openBtn = document.getElementById("partnershipOpenBtn");
    if (!modal || !track || !indicator) return;
    var partnershipAssets = ["partnership-intro.jpg", "partnership-step1.jpg", "partnership-step2.jpg", "partnership-step3.jpg", "partnership-cost.jpg"];
    var imgs = modal.querySelectorAll(".partnership-modal__img");
    for (var i = 0; i < imgs.length && i < partnershipAssets.length; i++) {
      imgs[i].src = getAssetUrl(partnershipAssets[i]);
    }
    var currentIndex = 0;
    var totalSheets = 5;
    function setSlide(index) {
      currentIndex = Math.max(0, Math.min(index, totalSheets - 1));
      track.style.transform = "translateX(-" + currentIndex * 20 + "%)";
      indicator.textContent = (currentIndex + 1) + " / " + totalSheets;
    }
    function openPartnership() {
      setSlide(0);
      modal.setAttribute("aria-hidden", "false");
    }
    function closePartnership() {
      modal.setAttribute("aria-hidden", "true");
    }
    if (openBtn) openBtn.addEventListener("click", function (e) { e.preventDefault(); openPartnership(); });
    if (closeBtn) closeBtn.addEventListener("click", closePartnership);
    if (backdrop) backdrop.addEventListener("click", closePartnership);
    modal.addEventListener("click", function (e) {
      var nextBtn = e.target && e.target.closest ? e.target.closest(".partnership-modal__next") : null;
      var prevBtn = e.target && e.target.closest ? e.target.closest(".partnership-modal__prev") : null;
      if (nextBtn) {
        e.preventDefault();
        if (currentIndex < totalSheets - 1) setSlide(currentIndex + 1);
      }
      if (prevBtn) {
        e.preventDefault();
        if (currentIndex > 0) setSlide(currentIndex - 1);
      }
      var link = e.target && e.target.closest ? e.target.closest("a.partnership-modal__link[href^=\"https://t.me/\"]") : null;
      if (link && link.href) {
        e.preventDefault();
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.openTelegramLink) {
          if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
          tg.openTelegramLink(link.href);
        } else window.open(link.href, "_blank");
      }
    });
  })();

  (function initPokerTasksMtt() {
    var startScreen = document.getElementById("pokerTasksStartScreen");
    var startBtn = document.getElementById("pokerTasksStartBtn");
    var leaderboardBody = document.getElementById("pokerTasksLeaderboardBody");
    if (!startScreen || !startBtn) return;
    startBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (typeof window.startMttChallenge === "function") {
        window.startMttChallenge();
      } else {
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.showAlert) tg.showAlert("Задачи ещё загружаются. Обновите страницу."); else alert("Задачи ещё загружаются. Обновите страницу.");
      }
    });
    function renderMttLeaderboard() {
      if (!leaderboardBody) return;
      var list = (typeof MTT_LEADERBOARD !== "undefined" && Array.isArray(MTT_LEADERBOARD)) ? MTT_LEADERBOARD : [];
      var levels = typeof MTT_LEVELS !== "undefined" ? MTT_LEVELS : [];
      leaderboardBody.innerHTML = list.map(function (r) {
        var lvl = r.level != null ? r.level : 1;
        var lvlName = levels[lvl - 1] ? levels[lvl - 1].name : "Ур." + lvl;
        return "<tr><td>" + (r.place || "") + "</td><td>" + (r.nick || "—") + "</td><td>" + lvlName + "</td><td>" + (r.points != null ? r.points : "—") + "</td></tr>";
      }).join("") || "<tr><td colspan=\"4\">Пока пусто</td></tr>";
    }
    renderMttLeaderboard();
    window.refreshMttStats = function () {
      var levelEl = document.getElementById("mttStatLevel");
      var pointsEl = document.getElementById("mttStatPoints");
      var dailyEl = document.getElementById("mttStatDaily");
      if (!levelEl || !pointsEl || !dailyEl) return;
      var data = { totalPoints: 0, dailyCompleted: 0, dailyDate: "" };
      try {
        var raw = localStorage.getItem("mtt_challenge_progress");
        if (raw) data = JSON.parse(raw);
      } catch (e) {}
      var today = new Date().toDateString();
      if (data.dailyDate !== today) {
        data.dailyCompleted = 0;
        data.dailyDate = today;
        try { localStorage.setItem("mtt_challenge_progress", JSON.stringify(data)); } catch (e) {}
      }
      var level = 1;
      var nextRequired = 100;
      if (typeof MTT_LEVELS !== "undefined" && MTT_LEVELS.length) {
        for (var i = MTT_LEVELS.length - 1; i >= 0; i--) {
          if (data.totalPoints >= MTT_LEVELS[i].requiredPoints) {
            level = MTT_LEVELS[i].level;
            nextRequired = i < MTT_LEVELS.length - 1 ? MTT_LEVELS[i + 1].requiredPoints : MTT_LEVELS[i].requiredPoints;
            break;
          }
        }
      }
      var levelName = "Новичок";
      if (typeof MTT_LEVELS !== "undefined") {
        for (var j = 0; j < MTT_LEVELS.length; j++) {
          if (MTT_LEVELS[j].level === level) { levelName = MTT_LEVELS[j].name; break; }
        }
      }
      levelEl.textContent = level + " — " + levelName;
      pointsEl.textContent = data.totalPoints + " / " + nextRequired;
      dailyEl.textContent = data.dailyCompleted + " / 5";
    };
  })();

  (function initMttChallenge() {
    var streakScreen = document.getElementById("pokerStreakScreen");
    var startScreen = document.getElementById("pokerTasksStartScreen");
    var resultScreen = document.getElementById("pokerStreakResultScreen");
    var view = document.querySelector('[data-view="poker-tasks"]');
    var timerEl = document.getElementById("pokerStreakTimer");
    var streakEl = document.getElementById("pokerStreakStreak");
    var levelEl = document.getElementById("pokerStreakLevel");
    var pointsEl = document.getElementById("pokerStreakPoints");
    var dailyEl = document.getElementById("pokerStreakDaily");
    var multiplierEl = document.getElementById("pokerStreakMultiplier");
    var progressEl = document.getElementById("pokerStreakProgress");
    var situationEl = document.getElementById("pokerStreakSituation");
    var cardsEl = document.getElementById("pokerStreakCards");
    var questionEl = document.getElementById("pokerStreakQuestion");
    var optionsEl = document.getElementById("pokerStreakOptions");
    var feedbackEl = document.getElementById("pokerStreakFeedback");
    var feedbackResultEl = document.getElementById("pokerStreakFeedbackResult");
    var feedbackScoreEl = document.getElementById("pokerStreakFeedbackScore");
    var feedbackExplanationEl = document.getElementById("pokerStreakFeedbackExplanation");
    var nextBtn = document.getElementById("pokerStreakNextBtn");
    var backBtn = document.getElementById("pokerStreakBackBtn");
    var playAgainBtn = document.getElementById("pokerStreakPlayAgainBtn");
    var resultStatsEl = document.getElementById("pokerStreakResultStats");
    if (!streakScreen || !timerEl || !optionsEl) return;
    var tasks = [];
    var taskIndex = 0;
    var sessionScore = 0;
    var streak = 0;
    var correctCount = 0;
    var timerId = null;
    var timeElapsed = 0;
    var answered = false;
    var SPEED_BONUS_REF = 30;
    var DAILY_LIMIT = 5;
    var SUIT_SYMBOLS = { s: "\u2660", h: "\u2665", d: "\u2666", c: "\u2663" };
    var RANK_DISPLAY = { T: "10", J: "J", Q: "Q", K: "K", A: "A" };
    function esc(s) {
      if (s == null) return "";
      return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    function parseCard(cardStr) {
      if (!cardStr || cardStr.length < 1) return { rank: cardStr, suit: "", red: false };
      var r = cardStr.charAt(0);
      var s = cardStr.length >= 2 ? cardStr.charAt(1) : "";
      var red = s === "h" || s === "d";
      var rank = RANK_DISPLAY[r] || r;
      var suit = SUIT_SYMBOLS[s] || s;
      return { rank: rank, suit: suit, red: red };
    }
    function renderCard(cardStr) {
      var c = parseCard(String(cardStr));
      var cls = "poker-streak-card";
      if (c.red) cls += " poker-streak-card--red";
      return "<span class=\"" + cls + "\">" + esc(c.rank) + (c.suit ? "<span class=\"poker-streak-card__suit\">" + c.suit + "</span>" : "") + "</span>";
    }
    function shuffle(arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }
    function clearTimer() {
      if (timerId) { clearInterval(timerId); timerId = null; }
    }
    function getMttProgress() {
      var data = { totalPoints: 0, dailyCompleted: 0, dailyDate: "" };
      try {
        var raw = localStorage.getItem("mtt_challenge_progress");
        if (raw) data = JSON.parse(raw);
      } catch (e) {}
      var today = new Date().toDateString();
      if (data.dailyDate !== today) {
        data.dailyCompleted = 0;
        data.dailyDate = today;
      }
      return data;
    }
    function saveMttProgress(data) {
      try { localStorage.setItem("mtt_challenge_progress", JSON.stringify(data)); } catch (e) {}
    }
    function getLevelForPoints(points) {
      var lvl = 1;
      var nextReq = 100;
      if (typeof MTT_LEVELS !== "undefined" && MTT_LEVELS.length) {
        for (var i = MTT_LEVELS.length - 1; i >= 0; i--) {
          if (points >= MTT_LEVELS[i].requiredPoints) {
            lvl = MTT_LEVELS[i].level;
            nextReq = i < MTT_LEVELS.length - 1 ? MTT_LEVELS[i + 1].requiredPoints : MTT_LEVELS[i].requiredPoints;
            break;
          }
        }
      }
      return { level: lvl, nextRequired: nextReq };
    }
    function getLevelName(level) {
      if (typeof MTT_LEVELS !== "undefined") {
        for (var j = 0; j < MTT_LEVELS.length; j++) {
          if (MTT_LEVELS[j].level === level) return MTT_LEVELS[j].name;
        }
      }
      return "Новичок";
    }
    function calculateMttScore(isCorrect, timeTaken, streakBefore, taskLevel, playerLevel) {
      taskLevel = Math.max(1, taskLevel || 1);
      playerLevel = Math.max(1, playerLevel || 1);
      if (!isCorrect) {
        var penalty = -20 * Math.pow(1.03, playerLevel - 1);
        return Math.round(penalty);
      }
      var basePoints = 50 * Math.pow(1.05, taskLevel - 1);
      var speedBonus = basePoints * 0.5 * Math.max(0, 1 - timeTaken / SPEED_BONUS_REF);
      var streakBonus = Math.min(streakBefore * 0.1 * basePoints, basePoints);
      var diff = taskLevel - playerLevel;
      var difficultyMultiplier = diff <= -5 ? 0.5 : diff <= -2 ? 0.75 : diff <= 2 ? 1.0 : diff <= 5 ? 1.25 : 1.5;
      return Math.round((basePoints + speedBonus + streakBonus) * difficultyMultiplier);
    }
    function updateHeader() {
      var prog = getMttProgress();
      var lvlInfo = getLevelForPoints(prog.totalPoints);
      if (levelEl) levelEl.textContent = "Ур. " + lvlInfo.level + " — " + getLevelName(lvlInfo.level);
      if (pointsEl) pointsEl.textContent = prog.totalPoints + "/" + lvlInfo.nextRequired;
      if (dailyEl) dailyEl.textContent = "Задачи: " + prog.dailyCompleted + "/5";
      if (streakEl) streakEl.textContent = "Стрик: " + streak;
      if (multiplierEl) multiplierEl.textContent = "\u00D7" + (1 + streak * 0.1).toFixed(1);
    }
    function showTask() {
      if (taskIndex >= tasks.length) {
        endGame();
        return;
      }
      answered = false;
      clearTimer();
      var task = tasks[taskIndex];
      timeElapsed = 0;
      if (situationEl) situationEl.textContent = task.situation || "";
      if (questionEl) questionEl.textContent = task.question || "";
      if (progressEl) progressEl.textContent = "Задача " + (taskIndex + 1) + " из " + tasks.length;
      if (cardsEl) {
        var cardsHtml = "<div class=\"poker-streak-cards__player\">Ваши карты: ";
        if (task.player_cards && task.player_cards.length) {
          for (var i = 0; i < task.player_cards.length; i++) {
            cardsHtml += renderCard(task.player_cards[i]);
          }
        } else {
          cardsHtml += "—";
        }
        cardsHtml += "</div>";
        if (task.board_cards && task.board_cards.length) {
          cardsHtml += "<div class=\"poker-streak-cards__board\">Стол: ";
          for (var j = 0; j < task.board_cards.length; j++) {
            cardsHtml += renderCard(task.board_cards[j]);
          }
          cardsHtml += "</div>";
        }
        cardsEl.innerHTML = cardsHtml;
      }
      if (optionsEl) {
        optionsEl.innerHTML = "";
        optionsEl.classList.remove("poker-streak-options--disabled");
        if (task.options && task.options.length) {
          for (var k = 0; k < task.options.length; k++) {
            var opt = task.options[k];
            var btn = document.createElement("button");
            btn.type = "button";
            btn.className = "poker-streak-option";
            btn.textContent = opt.text || "";
            btn.dataset.answerId = opt.id || "";
            btn.dataset.correct = (opt.id === task.correct_answer) ? "1" : "0";
            optionsEl.appendChild(btn);
          }
        }
      }
      if (feedbackEl) feedbackEl.classList.add("poker-streak-feedback--hidden");
      if (timerEl) timerEl.textContent = "0.0";
      var startTime = Date.now();
      timerId = setInterval(function () {
        timeElapsed = (Date.now() - startTime) / 1000;
        if (timerEl) timerEl.textContent = timeElapsed.toFixed(1);
      }, 100);
    }
    function handleAnswer(answerId, isCorrect) {
      if (answered) return;
      answered = true;
      clearTimer();
      if (optionsEl) optionsEl.classList.add("poker-streak-options--disabled");
      var task = tasks[taskIndex];
      var timeTaken = timeElapsed;
      var streakBefore = streak;
      var progCur = getMttProgress();
      var lvlCur = getLevelForPoints(progCur.totalPoints);
      var pts = calculateMttScore(isCorrect, timeTaken, streakBefore, task.level || 1, lvlCur.level);
      if (isCorrect) {
        streak++;
        correctCount++;
        sessionScore += pts;
      } else {
        streak = 0;
      }
      var prog = getMttProgress();
      prog.totalPoints = Math.max(0, prog.totalPoints + pts);
      prog.dailyCompleted++;
      saveMttProgress(prog);
      updateHeader();
      if (feedbackEl) {
        feedbackEl.classList.remove("poker-streak-feedback--hidden");
        if (feedbackResultEl) {
          feedbackResultEl.textContent = isCorrect ? "Правильно!" : "Неправильно";
          feedbackResultEl.className = "poker-streak-feedback__result " + (isCorrect ? "poker-streak-feedback__result--correct" : "poker-streak-feedback__result--wrong");
        }
        if (feedbackScoreEl) feedbackScoreEl.textContent = isCorrect ? "+" + pts + " баллов" : pts + " баллов";
        if (feedbackExplanationEl) feedbackExplanationEl.textContent = task.explanation || "";
      }
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tg && tg.HapticFeedback) tg.HapticFeedback.notificationOccurred(isCorrect ? "success" : "error");
    }
    function nextTask() {
      taskIndex++;
      showTask();
    }
    function endGame() {
      if (streakScreen) streakScreen.classList.add("poker-streak-screen--hidden");
      if (resultScreen) {
        resultScreen.classList.remove("poker-streak-result-screen--hidden");
        resultScreen.style.display = "";
        var prog = getMttProgress();
        var lvlInfo = getLevelForPoints(prog.totalPoints);
        if (resultStatsEl) {
          resultStatsEl.innerHTML = "<p><strong>Баллов за сессию:</strong> " + sessionScore + "</p><p><strong>Правильно:</strong> " + correctCount + " / " + tasks.length + "</p><p><strong>Всего баллов:</strong> " + prog.totalPoints + "</p><p><strong>Уровень:</strong> " + lvlInfo.level + " — " + getLevelName(lvlInfo.level) + "</p>";
        }
      }
      if (typeof window.refreshMttStats === "function") window.refreshMttStats();
    }
    function bindOptions() {
      if (!optionsEl) return;
      optionsEl.addEventListener("click", function (e) {
        var btn = e.target && e.target.closest ? e.target.closest(".poker-streak-option") : null;
        if (!btn || answered) return;
        var correct = btn.dataset.correct === "1";
        handleAnswer(btn.dataset.answerId, correct);
      });
    }
    window.startMttChallenge = function () {
      if (typeof MTT_TASKS === "undefined" || !MTT_TASKS.length) {
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.showAlert) tg.showAlert("Задачи не загружены."); else alert("Задачи не загружены.");
        return;
      }
      var prog = getMttProgress();
      if (prog.dailyCompleted >= DAILY_LIMIT) {
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.showAlert) tg.showAlert("Сегодня вы уже выполнили 5 задач. Завтра лимит обновится."); else alert("Сегодня вы уже выполнили 5 задач. Завтра лимит обновится.");
        return;
      }
      var lvlInfo = getLevelForPoints(prog.totalPoints);
      var filtered = MTT_TASKS.filter(function (t) { return t.level <= lvlInfo.level + 1; });
      if (!filtered.length) filtered = MTT_TASKS;
      var toTake = Math.min(DAILY_LIMIT - prog.dailyCompleted, 5, filtered.length);
      tasks = shuffle(filtered).slice(0, toTake);
      taskIndex = 0;
      sessionScore = 0;
      streak = 0;
      correctCount = 0;
      if (startScreen) startScreen.style.display = "none";
      if (resultScreen) { resultScreen.classList.add("poker-streak-result-screen--hidden"); resultScreen.style.display = "none"; }
      streakScreen.classList.remove("poker-streak-screen--hidden");
      streakScreen.style.display = "flex";
      if (view) view.classList.add("poker-tasks--task-visible");
      updateHeader();
      showTask();
    };
    if (nextBtn) nextBtn.addEventListener("click", function (e) { e.preventDefault(); nextTask(); });
    if (backBtn) {
      backBtn.addEventListener("click", function (e) {
        e.preventDefault();
        clearTimer();
        streakScreen.classList.add("poker-streak-screen--hidden");
        if (startScreen) startScreen.style.display = "";
        if (view) view.classList.remove("poker-tasks--task-visible");
        if (typeof window.refreshMttStats === "function") window.refreshMttStats();
      });
    }
    if (playAgainBtn && resultScreen) {
      playAgainBtn.addEventListener("click", function (e) {
        e.preventDefault();
        resultScreen.classList.add("poker-streak-result-screen--hidden");
        resultScreen.style.display = "none";
        window.startMttChallenge();
      });
    }
    bindOptions();
  })();

  (function initRatingSubscribe() {
    var ratingSubscribeBtns = Array.prototype.slice.call(document.querySelectorAll(".rating-subscribe-btn"));
    var RATING_SUBSCRIBED_KEY = "poker_rating_subscribed";
    var ratingInDevHtml = "";
    function setRatingSubscribeButtonState(subscribed) {
      if (!ratingSubscribeBtns.length) return;
      ratingSubscribeBtns.forEach(function (btn) {
        var league = btn.getAttribute("data-spring-league") || "";
        var label;
        if (league === "1") {
          label = subscribed ? "Отписаться от Лиги 1" : "Подписаться на Лигу 1";
        } else if (league === "2") {
          label = subscribed ? "Отписаться от Лиги 2" : "Подписаться на Лигу 2";
        } else {
          label = subscribed ? "Отписаться" : "Подписаться";
        }
        btn.disabled = false;
        btn.innerHTML = "<span>" + label + "</span>" + ratingInDevHtml;
        btn.dataset.subscribed = subscribed ? "1" : "0";
      });
    }
    function updateRatingSubscribeFromStorage() {
      try {
        setRatingSubscribeButtonState(localStorage.getItem(RATING_SUBSCRIBED_KEY) === "1");
      } catch (e) {
        setRatingSubscribeButtonState(false);
      }
    }
    updateRatingSubscribeFromStorage();
    if (ratingSubscribeBtns.length) {
      ratingSubscribeBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          if (window.__touchWasScroll && window.__touchWasScroll()) return;
          if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
            var tgCred = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            var msgCred =
              "Войдите в приложение (Telegram в мини‑аппе или через кнопку входа на сайте), чтобы подписаться.";
            if (tgCred && tgCred.showAlert) tgCred.showAlert(msgCred);
            else alert(msgCred);
            return;
          }
          var subscribed = btn.dataset.subscribed === "1";
          var payload =
            typeof pokerApiAuthJsonBody === "function"
              ? pokerApiAuthJsonBody({ unsubscribe: subscribed })
              : {
                  initData: (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData) || "",
                  unsubscribe: subscribed,
                };
          if (!payload.initData && !payload.pwaSession && !payload.pwaVkSession) {
            var tgEmpty = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            if (tgEmpty && tgEmpty.showAlert) tgEmpty.showAlert("Не удалось определить аккаунт. Обновите страницу или войдите снова.");
            else alert("Не удалось определить аккаунт. Обновите страницу или войдите снова.");
            return;
          }
          var appEl = document.getElementById("app");
          var base = (appEl && appEl.getAttribute("data-api-base")) || (typeof location !== "undefined" && location.origin) || "";
          var apiUrl = (base ? base.replace(/\/$/, "") : "") + "/api/rating-subscribe";
          ratingSubscribeBtns.forEach(function (b) {
            b.disabled = true;
            b.innerHTML = "<span>Подписываем…</span>" + ratingInDevHtml;
          });
          fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
            .then(function (r) { return r.json().catch(function () { return { ok: false, error: "Ошибка ответа сервера" }; }); })
            .then(function (data) {
              if (data && data.ok) {
                try {
                  localStorage.setItem(RATING_SUBSCRIBED_KEY, data.subscribed ? "1" : "0");
                } catch (e) {}
                setRatingSubscribeButtonState(!!data.subscribed);
                var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
                if (tg && tg.showAlert) {
                  tg.showAlert(data.subscribed ? "Подписка оформлена. Уведомления об обновлении рейтинга будут приходить в Telegram." : "Вы отписаны от уведомлений рейтинга.");
                } else {
                  alert(data.subscribed ? "Подписка оформлена." : "Вы отписаны.");
                }
              } else {
                var msg = (data && data.error) || "Ошибка. Попробуйте позже.";
                var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
                if (tg && tg.showAlert) tg.showAlert(msg); else alert(msg);
                setRatingSubscribeButtonState(subscribed);
              }
            })
            .catch(function () {
              var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
              if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR); else alert(POKER_NET_ERR);
              setRatingSubscribeButtonState(subscribed);
            })
            .finally(function () {
              ratingSubscribeBtns.forEach(function (b) { b.disabled = false; });
            });
        });
      });
    }
  })();

  var startParam = pokerReadTelegramLaunchStartParam();
  startParam = pokerNormalizeWebAppStartParam(startParam);
  function parseStreamsRoomIdFromStartParam(val) {
    if (!val) return null;
    val = String(val).trim();
    if (!val) return null;
    var m =
      val.match(/^streams_(\d{6})$/) ||
      val.match(/startapp=streams_(\d{6})/i);
    if (m && m[1]) return m[1];
    if (/^\d{6}$/.test(val)) return val;
    return null;
  }
  /**
   * Один вход для deep link: Telegram start_param и PWA/браузер ?startapp=… (+ ?with= для club_chat_dm).
   * Раньше почти всё обрабатывалось только из Telegram — ссылки с query открывали главную.
   */
  function pokerApplyStartAppDeepLink(startParamRaw, opts) {
    opts = opts || {};
    var withPeerOpt = opts.withPeer != null ? String(opts.withPeer).trim() : "";
    var startParam = startParamRaw != null ? String(startParamRaw).trim() : "";
    if (!startParam) return;
    if (startParam === "news" || startParam.indexOf("news_") === 0) {
      var articleNum = startParam === "news" ? undefined : parseInt(startParam.replace("news_", ""), 10);
      if (startParam !== "news" && (Number.isNaN(articleNum) || articleNum < 0)) articleNum = undefined;
      setTimeout(function () {
        if (typeof openGazette === "function") openGazette("news", articleNum);
      }, 300);
      return;
    }
    if (startParam === "winter_rating") {
      setTimeout(function () {
        if (typeof setView === "function") setView("winter-rating");
      }, 0);
      return;
    }
    if (startParam === "spring_rating") {
      setTimeout(function () {
        if (typeof setView === "function") setView("spring-rating");
      }, 0);
      return;
    }
    if (startParam === "spring_rating_league_1" || startParam === "spring_rating_league_2") {
      var leagueNum = startParam === "spring_rating_league_1" ? "1" : "2";
      setTimeout(function () {
        if (typeof setView === "function") setView("spring-rating");
        setTimeout(function () {
          if (typeof window.switchSpringRatingMainTab === "function") window.switchSpringRatingMainTab(leagueNum);
        }, 400);
      }, 0);
      return;
    }
    if (startParam.indexOf("winter_rating_player_") === 0) {
      var playerNickW = decodeURIComponent(startParam.replace("winter_rating_player_", "").replace(/\+/g, " "));
      if (playerNickW) {
        setTimeout(function () {
          if (typeof setView === "function") setView("winter-rating");
          setTimeout(function () {
            if (typeof openWinterRatingPlayerModal === "function") openWinterRatingPlayerModal(playerNickW);
          }, 400);
        }, 0);
      }
      return;
    }
    if (startParam.indexOf("spring_rating_player_") === 0) {
      var playerNickS = decodeURIComponent(startParam.replace("spring_rating_player_", "").replace(/\+/g, " "));
      if (playerNickS) {
        setTimeout(function () {
          if (typeof setView === "function") setView("spring-rating");
          setTimeout(function () {
            if (typeof openWinterRatingPlayerModal === "function") openWinterRatingPlayerModal(playerNickS);
          }, 400);
        }, 0);
      }
      return;
    }
    if (startParam.indexOf("rating_") === 0 && startParam.indexOf("spring_rating_date_") !== 0) {
      var dateParamR = startParam.replace("rating_", "").replace(/_/g, ".");
      setTimeout(function () {
        if (typeof setView === "function") setView("winter-rating");
        setTimeout(function () {
          if (typeof window.openWinterRatingDatePanel === "function") window.openWinterRatingDatePanel(dateParamR);
        }, 400);
      }, 0);
      return;
    }
    if (startParam.indexOf("spring_rating_date_") === 0) {
      var dateParamSp = startParam.replace("spring_rating_date_", "").replace(/_/g, ".");
      setTimeout(function () {
        if (typeof setView === "function") setView("spring-rating");
        setTimeout(function () {
          if (typeof window.openWinterRatingDatePanel === "function") window.openWinterRatingDatePanel(dateParamSp);
        }, 400);
      }, 0);
      return;
    }
    if (
      startParam === "rating_top_past" ||
      startParam === "rating_top_current" ||
      startParam === "rating_top_february" ||
      startParam === "rating_top_mar"
    ) {
      var ratingTopKind =
        startParam === "rating_top_current" ? "current" : startParam === "rating_top_february" ? "feb" : startParam === "rating_top_mar" ? "feb" : "past";
      var viewForTop = startParam === "rating_top_mar" ? "spring-rating" : "winter-rating";
      setTimeout(function () {
        if (typeof setView === "function") setView(viewForTop);
        setTimeout(function () {
          if (typeof window.openWinterRatingWeekTopModal === "function") window.openWinterRatingWeekTopModal(ratingTopKind);
        }, 350);
      }, 0);
      return;
    }
    if (startParam === "daily_prediction") {
      setTimeout(function () {
        if (typeof setView === "function") setView("home");
        setTimeout(function () {
          if (typeof openDailyPredictionModal === "function") openDailyPredictionModal();
        }, 400);
      }, 0);
      return;
    }
    var hallSecStart = resolveHallFameSectionFromStartParam(startParam);
    if (hallSecStart) {
      setTimeout(function () {
        navigateToHallFameSection(hallSecStart);
      }, 0);
      return;
    }
    if (startParam === "raffles") {
      setTimeout(function () {
        if (typeof setView === "function") setView("raffles");
      }, 0);
      return;
    }
    if (startParam === "video_lessons") {
      setTimeout(function () {
        if (typeof setView === "function") setView("video-lessons");
      }, 0);
      return;
    }
    if (startParam === "vl_reviews_nikolay" || startParam === "video_lessons_reviews_nikolay") {
      window.__pendingVideoLessonsOpenReviews = true;
      setTimeout(function () {
        if (typeof setView === "function") setView("video-lessons");
      }, 0);
      return;
    }
    if (startParam === "club_chat") {
      window.__pendingOpenClubChatGeneral = true;
      setTimeout(function () {
        if (typeof setView === "function") setView("chat");
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      }, 0);
      return;
    }
    if (startParam === "club_chat_dm") {
      if (withPeerOpt) {
        window.__pendingOpenChatPersonalFromDeepLink = {
          userId: withPeerOpt,
          userName: null,
          peerP21Id: null,
        };
      }
      setTimeout(function () {
        if (typeof setView === "function") setView("chat");
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      }, 0);
      return;
    }
    if (startParam === "club_charter") {
      setTimeout(function () {
        if (typeof window.openClubCharterModal === "function") window.openClubCharterModal();
      }, 0);
      return;
    }
    if (startParam === "vpn_proxy" || startParam === "vpn_proxy_vpn") {
      setTimeout(function () {
        if (typeof window.openVpnProxyModal === "function") window.openVpnProxyModal({ tab: "vpn" });
      }, 0);
      return;
    }
    if (startParam === "vpn_proxy_proxy" || startParam === "vpn_proxy_tab_proxy") {
      setTimeout(function () {
        if (typeof window.openVpnProxyModal === "function") window.openVpnProxyModal({ tab: "proxy" });
      }, 0);
      return;
    }
    if (startParam === "stream") {
      setTimeout(function () {
        if (typeof setView === "function") setView("streams");
      }, 0);
      return;
    }
    var streamsRoomId = parseStreamsRoomIdFromStartParam(startParam);
    if (streamsRoomId) {
      window.__pendingStreamsRoomId = streamsRoomId;
      setTimeout(function () {
        if (typeof setView === "function") setView("streams");
      }, 0);
      return;
    }
    if (startParam.indexOf("poker_task_") === 0) {
      setTimeout(function () {
        if (typeof setView === "function") setView("poker-tasks");
        setTimeout(function () {
          if (typeof window.startMttChallenge === "function") window.startMttChallenge();
        }, 400);
      }, 0);
      return;
    }
    var simpleViewByStartApp = {
      schedule: "schedule",
      download: "download",
      equilator: "equilator",
      cashout: "cashout",
      profile: "profile",
      learn_play_hub: "learn-play-hub",
      bonus_game: "bonus-game",
      plasterer_game: "plasterer-game",
      cooler_game: "cooler-game",
    };
    if (simpleViewByStartApp[startParam]) {
      var vn = simpleViewByStartApp[startParam];
      setTimeout(function () {
        if (typeof setView === "function") setView(vn);
      }, 0);
    }
  }
  function pokerFindChatContactByPeerId(peerId) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid) return null;
    var data = window.__pokerLastContactsApiData;
    if ((!data || !Array.isArray(data.contacts) || data.contacts.length === 0) && typeof pokerTryReadContactsCache === "function") {
      try {
        var cached = pokerTryReadContactsCache();
        if (cached && cached.ok && Array.isArray(cached.contacts)) data = cached;
      } catch (eCtFind) {}
    }
    if (!data || !Array.isArray(data.contacts)) return null;
    for (var i = 0; i < data.contacts.length; i++) {
      var c = data.contacts[i];
      if (!c || !c.id) continue;
      if (peerChatIdsEqual(c.id, pid)) return c;
    }
    return null;
  }
  function pokerResolveChatPeerLabel(peerId, fallbackName) {
    var pid = peerId != null ? String(peerId).trim() : "";
    var fallback = fallbackName != null ? String(fallbackName).trim() : "";
    if (!pid) return fallback;
    try {
      var found = pokerFindChatContactByPeerId(pid);
      if (found) {
        var contactLabel = found.contactName != null && String(found.contactName).trim() ? String(found.contactName).trim() : "";
        var baseLabel = found.name != null && String(found.name).trim() ? String(found.name).trim() : "";
        if (contactLabel) return contactLabel;
        if (baseLabel) return baseLabel;
      }
      if (chatWithUserId && peerChatIdsEqual(chatWithUserId, pid) && chatWithUserName && String(chatWithUserName).trim()) {
        return String(chatWithUserName).trim();
      }
    } catch (ePeerLbl) {}
    return fallback || pid;
  }
  function pokerOpenResolvedChatPeer(peerId, fallbackName) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid || typeof pokerOpenPushDmHard !== "function") return false;
    var found = pokerFindChatContactByPeerId(pid);
    if (found) {
      try {
        pokerPushOpenDebug("openConv-resolved", pid);
      } catch (eOpenResolvedDbg) {}
      return pokerOpenPushDmHard(
        found.id,
        found.contactName || found.name || fallbackName || found.id,
          found.p21Id != null ? found.p21Id : undefined,
          found.avatar || undefined
      );
    }
    return false;
  }
  function pokerPendingPushDmNeedsContacts(peerId) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid) return false;
    return !pokerFindChatContactByPeerId(pid);
  }
  function pokerHydrateOpenDmHeaderFromContacts(peerId) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid) return false;
    var found = pokerFindChatContactByPeerId(pid);
    if (!found) return false;
    try {
      var resolvedName = found.contactName || found.name || "";
      if (resolvedName) {
        chatWithUserName = resolvedName;
        if (convTitle) setTextContentIfChanged(convTitle, resolvedName);
      }
      setChatConvTitleIdText(found.p21Id != null ? found.p21Id : "");
      var resolvedAvatar = found.avatar != null && String(found.avatar).trim() ? String(found.avatar).trim() : "";
      if (resolvedAvatar) {
        chatWithPeerAvatarUrl = resolvedAvatar;
        applyConvPeerAvatarHeader(resolvedAvatar, chatWithUserName || resolvedName || pid);
      } else if (chatWithUserName || resolvedName) {
        applyConvPeerAvatarHeader("", chatWithUserName || resolvedName || pid);
      }
      pokerPushOpenDebug("header-hydrated", pid);
      return true;
    } catch (eHdrHydrate) {}
    return false;
  }
  function pokerSchedulePushDmHeaderHydrate(peerId) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid || typeof loadContacts !== "function") return;
    try {
      if (pokerHydrateOpenDmHeaderFromContacts(pid)) return;
    } catch (eHdrHydrateCache) {}
    try {
      clearTimeout(window.__pokerPushDmHeaderHydrateTimer || 0);
    } catch (eHdrHydrateClr) {}
    window.__pokerPushDmHeaderHydrateTimer = setTimeout(function () {
      try {
        if (pokerHydrateOpenDmHeaderFromContacts(pid)) return;
        loadContacts({
          metaOnly: true,
          onLoaded: function () {
            try {
              if (pokerHydrateOpenDmHeaderFromContacts(pid)) return;
              if (typeof pokerHydrateOpenDmHeaderFromProfile === "function") pokerHydrateOpenDmHeaderFromProfile(pid);
            } catch (eHdrHydrateLoaded) {}
          },
        });
      } catch (eHdrHydrateLoad) {}
    }, 80);
  }
  function pokerHydrateOpenDmHeaderFromProfile(peerId) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid) return false;
    fetch(base + "/api/users?userId=" + encodeURIComponent(pid) + pokerApiAuthQuery("&"))
      .then(function (r) {
        return r.json().catch(function () { return { ok: false }; });
      })
      .then(function (data) {
        try {
          if (!data || !data.ok) return;
          if (!chatWithUserId || !peerChatIdsEqual(chatWithUserId, pid)) return;
          var profileName =
            data.contactName != null && String(data.contactName).trim()
              ? String(data.contactName).trim()
              : data.chatDisplayName != null && String(data.chatDisplayName).trim()
                ? String(data.chatDisplayName).trim()
                : data.userName != null && String(data.userName).trim()
                  ? String(data.userName).trim()
                  : "";
          if (profileName) {
            chatWithUserName = profileName;
            if (convTitle) setTextContentIfChanged(convTitle, profileName);
          }
          setChatConvTitleIdText(data.p21Id != null ? data.p21Id : "");
          var profileAvatar = data.avatar != null && String(data.avatar).trim() ? String(data.avatar).trim() : "";
          if (profileAvatar) {
            chatWithPeerAvatarUrl = profileAvatar;
            applyConvPeerAvatarHeader(profileAvatar, chatWithUserName || profileName || pid);
          } else if (profileName) {
            applyConvPeerAvatarHeader("", profileName);
          }
          pokerPushOpenDebug("header-profile-hydrated", pid);
        } catch (eHdrProfileApply) {}
      })
      .catch(function () {});
    return true;
  }
  function pokerSchedulePendingPushDmContactsReload(peerId, fallbackName) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid || typeof loadContacts !== "function") return;
    if (window.__pokerPendingChatDeepLinkContactsLoading) return;
    window.__pokerPendingChatDeepLinkContactsLoading = true;
    loadContacts({
      metaOnly: !pokerPendingPushDmNeedsContacts(pid),
      onLoaded: function () {
        window.__pokerPendingChatDeepLinkContactsLoading = false;
        try {
          if (!window.__pendingOpenChatPersonalFromDeepLink) return;
          if (pokerOpenResolvedChatPeer(pid, fallbackName || pid)) {
            window.__pendingOpenChatPersonalFromDeepLink = null;
            return;
          }
          if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function") {
            window.__pokerEnsureOpenPendingChatPersonalFromDeepLink();
          }
        } catch (ePendingReload) {}
      },
    });
  }
  function pokerGetActivePushDmTarget() {
    var pending = window.__pendingOpenChatPersonalFromDeepLink;
    if (pending && pending.userId != null && String(pending.userId).trim()) {
      return String(pending.userId).trim();
    }
    var forcedPeer = window.__pokerForcePushDmPeer ? String(window.__pokerForcePushDmPeer).trim() : "";
    var forcedUntil = Number(window.__pokerForcePushDmPeerUntil || 0);
    if (forcedPeer && forcedUntil > Date.now()) return forcedPeer;
    return "";
  }
  function pokerGuardDefaultDialogsOpen() {
    var activePeer = pokerGetActivePushDmTarget();
    if (!activePeer) return false;
    pokerPushOpenDebug("dialogs-guard-reroute", activePeer);
    try {
      if (typeof window.closeChatNavDropdown === "function") window.closeChatNavDropdown();
      if (dialogsView) dialogsView.classList.add("chat-dialogs-view--hidden");
      if (generalView) {
        generalView.classList.add("chat-general-view--hidden");
        generalView.style.display = "none";
      }
      if (personalView) personalView.classList.remove("chat-personal-view--hidden");
      if (listView) listView.classList.add("chat-list-view--hidden");
      if (convView) convView.classList.remove("chat-conv-view--hidden");
      chatActiveTab = "personal";
      if (!chatWithUserId) chatWithUserId = normalizePeerIdForChat(activePeer);
      if (!chatWithUserName) chatWithUserName = activePeer;
      updateChatHeaderStats();
      updateUnreadDots();
    } catch (eGuardShell) {}
    if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function") {
      if (window.__pokerEnsureOpenPendingChatPersonalFromDeepLink()) return true;
    }
    if (typeof pokerOpenChatPeerDirectFallback === "function") {
      pokerOpenChatPeerDirectFallback(activePeer, activePeer);
    }
    return true;
  }
  function pokerOpenPushDmHard(peerId, fallbackName, peerP21Id, peerAvatarOpt) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid || typeof showConv !== "function") return false;
    try {
      pokerPushOpenDebug("openConv-hard", pid);
      window.__pokerForcePushDmPeer = normalizePeerIdForChat(pid);
      window.__pokerForcePushDmPeerUntil = Date.now() + 15000;
      window.__pokerForceAllowPendingPushConvOpen = true;
      if (typeof window.closeChatNavDropdown === "function") window.closeChatNavDropdown();
      if (dialogsView) dialogsView.classList.add("chat-dialogs-view--hidden");
      if (generalView) {
        generalView.classList.add("chat-general-view--hidden");
        generalView.style.display = "none";
      }
      if (personalView) personalView.classList.remove("chat-personal-view--hidden");
      if (listView) listView.classList.add("chat-list-view--hidden");
      if (convView) convView.classList.remove("chat-conv-view--hidden");
      chatActiveTab = "personal";
      chatWithUserId = normalizePeerIdForChat(pid);
      chatWithUserName = fallbackName || pid;
      showConv(
        normalizePeerIdForChat(pid),
        fallbackName || pid,
        peerP21Id != null ? peerP21Id : undefined,
        peerAvatarOpt || undefined
      );
      try {
        pokerSchedulePushDmHeaderHydrate(pid);
      } catch (ePushHdrHydrate) {}
      return true;
    } catch (eOpenHard) {}
    finally {
      window.__pokerForceAllowPendingPushConvOpen = false;
    }
    return false;
  }
  function pokerSchedulePushDmHardStabilize(peerId, fallbackName, peerP21Id, peerAvatarOpt) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid) return;
    try {
      clearTimeout(window.__pokerPushDmHardStabilizeTimer || 0);
    } catch (eHardStableClr) {}
    window.__pokerPushDmHardStabilizeTimer = setTimeout(function () {
      try {
        var samePeer = !!(chatWithUserId && peerChatIdsEqual(chatWithUserId, pid));
        var convVisible = !!(convView && !convView.classList.contains("chat-conv-view--hidden"));
        if (samePeer && convVisible) return;
        pokerPushOpenDebug("openConv-hard-stabilize", pid);
        pokerOpenPushDmHard(pid, fallbackName || pid, peerP21Id, peerAvatarOpt);
      } catch (eHardStable) {}
    }, 500);
  }
  function pokerOpenChatPeerDirectFallback(peerId, fallbackName) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid) return false;
    try {
      pokerPushOpenDebug("openConv-direct", pid);
      if (typeof pokerOpenPushDmHard === "function") {
        if (!pokerOpenPushDmHard(normalizePeerIdForChat(pid), fallbackName || pid)) return false;
      } else if (typeof window.__pokerOpenPushDmImmediate === "function") {
        window.__pokerOpenPushDmImmediate(normalizePeerIdForChat(pid), fallbackName || pid);
      } else {
        return false;
      }
      try {
        clearTimeout(window.__pokerPushDmOpenRetryTimer || 0);
      } catch (eRetryClr) {}
      window.__pokerPushDmOpenRetryTimer = setTimeout(function retryPushDmOpen() {
        try {
          var convVisible = !!(convView && !convView.classList.contains("chat-conv-view--hidden"));
          var samePeer = !!(chatWithUserId && peerChatIdsEqual(chatWithUserId, pid));
          if (convVisible && samePeer) return;
          pokerPushOpenDebug("openConv-retry", pid);
          if (typeof pokerOpenPushDmHard === "function") {
            pokerOpenPushDmHard(normalizePeerIdForChat(pid), fallbackName || pid);
          } else if (typeof window.__pokerOpenPushDmImmediate === "function") {
            window.__pokerOpenPushDmImmediate(normalizePeerIdForChat(pid), fallbackName || pid);
          }
          setTimeout(function () {
            try {
              var convVisible2 = !!(convView && !convView.classList.contains("chat-conv-view--hidden"));
              var samePeer2 = !!(chatWithUserId && peerChatIdsEqual(chatWithUserId, pid));
              if (convVisible2 && samePeer2) return;
              pokerPushOpenDebug("openConv-retry2", pid);
              if (typeof pokerOpenPushDmHard === "function") {
                pokerOpenPushDmHard(normalizePeerIdForChat(pid), fallbackName || pid);
              } else if (typeof window.__pokerOpenPushDmImmediate === "function") {
                window.__pokerOpenPushDmImmediate(normalizePeerIdForChat(pid), fallbackName || pid);
              }
            } catch (eRetry2) {}
          }, 700);
        } catch (eRetry1) {}
      }, 350);
      return true;
    } catch (eOpenPeerFallback) {}
    return false;
  }
  function pokerOpenPendingPushDmWithoutContacts(peerId, fallbackName) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid || (typeof pokerOpenPushDmHard !== "function" && typeof window.__pokerOpenPushDmImmediate !== "function")) return false;
    try {
      pokerPushOpenDebug("openPendingNoContacts", pid);
      if (typeof pokerOpenPushDmHard === "function") {
        if (!pokerOpenPushDmHard(normalizePeerIdForChat(pid), fallbackName || pid)) return false;
      } else {
        window.__pokerOpenPushDmImmediate(normalizePeerIdForChat(pid), fallbackName || pid);
      }
      try {
        clearTimeout(window.__pokerPushDmNoContactsRetryTimer || 0);
      } catch (eNoContactsClr) {}
      window.__pokerPushDmNoContactsRetryTimer = setTimeout(function () {
        try {
          var convVisible = !!(convView && !convView.classList.contains("chat-conv-view--hidden"));
          var samePeer = !!(chatWithUserId && peerChatIdsEqual(chatWithUserId, pid));
          if (convVisible && samePeer) return;
          pokerPushOpenDebug("openPendingNoContacts-retry", pid);
          if (typeof pokerOpenPushDmHard === "function") {
            pokerOpenPushDmHard(normalizePeerIdForChat(pid), fallbackName || pid);
          } else {
            window.__pokerOpenPushDmImmediate(normalizePeerIdForChat(pid), fallbackName || pid);
          }
        } catch (eNoContactsRetry) {}
      }, 400);
      return true;
    } catch (eOpenNoContacts) {
    }
    return false;
  }
  function pokerEnsureOpenPendingChatPersonalFromDeepLink() {
    try {
      var pending = window.__pendingOpenChatPersonalFromDeepLink;
      if (!pending) return false;
      var peerId = pending.userId != null ? String(pending.userId).trim() : "";
      if (!peerId) return false;
      pokerPushOpenDebug("pending-dm", peerId);
      if (
        typeof pokerOpenPushDmHard === "function" &&
        pokerOpenPushDmHard(peerId, pending.userName || peerId, pending.peerP21Id, pending.avatar || pending.peerAvatar)
      ) {
        try {
          pokerSchedulePushDmHardStabilize(
            peerId,
            pending.userName || peerId,
            pending.peerP21Id,
            pending.avatar || pending.peerAvatar
          );
        } catch (ePendingHardStable) {}
        try {
          pokerSchedulePendingPushDmContactsReload(peerId, pending.userName || peerId);
        } catch (ePendingHardBg) {}
        return true;
      }
      if (pokerOpenResolvedChatPeer(peerId, pending.userName || peerId)) {
        window.__pendingOpenChatPersonalFromDeepLink = null;
        return true;
      }
      if (typeof window.__pokerOpenPushDmImmediate === "function") {
        if (pokerOpenPendingPushDmWithoutContacts(peerId, pending.userName || peerId)) {
          try {
            pokerSchedulePendingPushDmContactsReload(peerId, pending.userName || peerId);
          } catch (ePendingDmNoContactsBg) {}
          return true;
        }
      }
      if (window.chatListenersAttached && typeof window.chatOpenConvFromDialogs === "function") {
        if (pokerOpenChatPeerDirectFallback(peerId, pending.userName || peerId)) {
          try {
            pokerSchedulePendingPushDmContactsReload(peerId, pending.userName || peerId);
          } catch (ePendingDmContactsBg) {}
          return true;
        }
      }
      if (!window.chatListenersAttached) {
        pokerSchedulePendingPushDmContactsReload(peerId, pending.userName || peerId);
      }
      if (pokerOpenChatPeerDirectFallback(peerId, pending.userName || peerId)) {
        pokerSchedulePendingPushDmContactsReload(peerId, pending.userName || peerId);
        return true;
      }
    } catch (eEnsurePendingDm) {}
    return false;
  }
  window.__pokerEnsureOpenPendingChatPersonalFromDeepLink = pokerEnsureOpenPendingChatPersonalFromDeepLink;
  function pokerOpenChatFromCurrentUrlIfAny() {
    try {
      if (typeof location === "undefined" || !location.search) return false;
      var sp = new URLSearchParams(String(location.search || ""));
      var startApp = pokerNormalizeWebAppStartParam(pokerStartAppQueryFromUrlSearchParams(sp));
      var withPeer = (sp.get("with") || "").trim();
      if (startApp === "club_chat" && typeof window.openClubChat === "function") {
        window.openClubChat();
        return true;
      }
      if (startApp === "club_chat_dm" && withPeer) {
        if (pokerOpenResolvedChatPeer(withPeer, withPeer)) {
          return true;
        }
        window.__pendingOpenChatPersonalFromDeepLink = {
          userId: withPeer,
          userName: withPeer,
        };
        if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function") {
          window.__pokerEnsureOpenPendingChatPersonalFromDeepLink();
        }
        if (typeof setView === "function") setView("chat");
        return true;
      }
    } catch (eCurPushUrl) {}
    return false;
  }
  window.__pokerApplyStartAppDeepLink = pokerApplyStartAppDeepLink;
  window.__pokerFlushPendingChatDeepLink = function () {
    try {
      if (pokerOpenChatFromCurrentUrlIfAny()) return true;
      if (window.__pendingOpenClubChatGeneral) {
        window.__pendingOpenClubChatGeneral = false;
        if (typeof window.openClubChat === "function") {
          window.openClubChat();
          return true;
        }
      }
      if (window.__pendingOpenChatPersonalFromDeepLink && typeof window.chatOpenConvFromDialogs === "function") {
        if (
          typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function" &&
          window.__pokerEnsureOpenPendingChatPersonalFromDeepLink()
        ) {
          return true;
        }
      }
    } catch (eFlushDeep) {}
    return false;
  };
  window.__pokerOpenChatFromPushUrl = function (rawUrl) {
    try {
      var urlObj = new URL(String(rawUrl || "").trim() || "./?startapp=club_chat", window.location.href);
      var sp = new URLSearchParams(urlObj.search || "");
      var startApp = pokerNormalizeWebAppStartParam(pokerStartAppQueryFromUrlSearchParams(sp));
      var withPeer = (sp.get("with") || "").trim();
      if (!startApp) return;
      pokerPushOpenDebug("push-url", startApp + (withPeer ? " with=" + withPeer : ""));
      try {
        window.__pokerLastPushOpenUrl = String(rawUrl || "");
        window.__pokerLastPushOpenAt = Date.now();
      } catch (ePushMark) {}
      try {
        if (startApp === "club_chat" || startApp === "club_chat_dm") {
          window.__pokerPushNeedsFullChatBootstrap = true;
        }
      } catch (ePushBootstrapMark) {}
      try {
        if (typeof history !== "undefined" && history && typeof history.replaceState === "function") {
          history.replaceState(history.state, "", urlObj.href);
        }
      } catch (ePushHistory) {}
      pokerApplyStartAppDeepLink(startApp, { withPeer: withPeer });
      if (startApp === "club_chat_dm" && withPeer) {
        try {
          if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function") {
            window.__pokerEnsureOpenPendingChatPersonalFromDeepLink();
          }
        } catch (ePushOpenDmEnsure) {}
      }
      setTimeout(function () {
        try {
          if (typeof setView === "function") setView("chat");
        } catch (ePushView) {}
        try {
          if (typeof window.__pokerFlushPendingChatDeepLink === "function") window.__pokerFlushPendingChatDeepLink();
        } catch (ePushFlush1) {}
        setTimeout(function () {
          try {
            if (typeof window.__pokerFlushPendingChatDeepLink === "function") window.__pokerFlushPendingChatDeepLink();
          } catch (ePushFlush2) {}
        }, 180);
      }, 0);
    } catch (ePushDeep) {}
  };
  var qStartApp = "";
  var qWithParam = "";
  try {
    var qsDeep = new URLSearchParams(typeof location !== "undefined" && location.search ? location.search : "");
    qStartApp = pokerNormalizeWebAppStartParam(pokerStartAppQueryFromUrlSearchParams(qsDeep));
    qWithParam = (qsDeep.get("with") || "").trim();
  } catch (eQsDeep) {}
  var deepLinkParam = (startParam && String(startParam).trim()) || qStartApp;
  var hadDeepLinkAtInit = !!deepLinkParam;
  if (deepLinkParam) {
    pokerApplyStartAppDeepLink(deepLinkParam, { withPeer: qWithParam });
  }
  if (isTelegramWebApp()) {
    setTimeout(function () {
      try {
        var normLate = pokerNormalizeWebAppStartParam(pokerReadTelegramLaunchStartParam());
        var qsLate = new URLSearchParams(typeof location !== "undefined" && location.search ? location.search : "");
        var qStartLate = pokerNormalizeWebAppStartParam(pokerStartAppQueryFromUrlSearchParams(qsLate));
        var qWithLate = (qsLate.get("with") || "").trim();
        var deepLate = (normLate && String(normLate).trim()) || qStartLate;
        if (deepLate && !hadDeepLinkAtInit) {
          pokerApplyStartAppDeepLink(deepLate, { withPeer: qWithLate });
          return;
        }
        if (normLate === "raffles") {
          var vNow = document.body && document.body.getAttribute("data-view");
          if (vNow === "raffles") return;
          pokerApplyStartAppDeepLink("raffles", { withPeer: qWithParam });
        }
      } catch (eTgRaffleRetry) {}
    }, 220);
  }
  if (window.location.hash === "#streams") {
    setTimeout(function () {
      if (typeof setView === "function") setView("streams");
    }, 0);
  }
  if (window.location.hash === "#stream") {
    setTimeout(function () {
      if (typeof setView === "function") setView("streams");
    }, 0);
  }
  if (window.location.hash && window.location.hash.indexOf("#poker_task_") === 0) {
    setTimeout(function () {
      if (typeof setView === "function") setView("poker-tasks");
      setTimeout(function () {
        if (typeof window.startMttChallenge === "function") window.startMttChallenge();
      }, 400);
    }, 0);
  }
  (function initClubCharterModal() {
    var CLUB_CHARTER_HASH = "#club-charter";
    var modal = document.getElementById("clubCharterModal");
    var openBtn = document.getElementById("clubCharterOpenBtn");
    var closeBtn = document.getElementById("clubCharterModalClose");
    var backBtn = document.getElementById("clubCharterModalBack");
    var shareBtn = document.getElementById("clubCharterShareBtn");
    var copyBtn = document.getElementById("clubCharterCopyBtn");
    var backdrop = document.getElementById("clubCharterModalBackdrop");
    var paper = modal && modal.querySelector(".club-charter-modal__paper");
    var tabRaffle = document.getElementById("clubCharterTabRaffle");
    var tabComm = document.getElementById("clubCharterTabComm");
    var panelRaffle = document.getElementById("clubCharterPanelRaffle");
    var panelComm = document.getElementById("clubCharterPanelComm");
    var charterScrollLockY = 0;
    var charterBehindLocked = false;
    function lockCharterBehindScroll() {
      if (charterBehindLocked) return;
      charterScrollLockY =
        window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop) || 0;
      charterBehindLocked = true;
      try {
        document.documentElement.classList.add("club-charter-modal-open");
        var b = document.body;
        if (b) {
          b.style.overflow = "hidden";
          b.style.position = "fixed";
          b.style.top = "-" + charterScrollLockY + "px";
          b.style.left = "0";
          b.style.right = "0";
          b.style.width = "100%";
        }
      } catch (eLock) {}
    }
    function unlockCharterBehindScroll() {
      if (!charterBehindLocked) return;
      charterBehindLocked = false;
      try {
        document.documentElement.classList.remove("club-charter-modal-open");
        var b = document.body;
        if (b) {
          b.style.overflow = "";
          b.style.position = "";
          b.style.top = "";
          b.style.left = "";
          b.style.right = "";
          b.style.width = "";
        }
        window.scrollTo(0, charterScrollLockY);
      } catch (eUnlock) {}
    }
    if (!modal || !openBtn) return;
    function setCharterTab(which) {
      var isRaffle = which === "raffle";
      if (tabRaffle) {
        tabRaffle.setAttribute("aria-selected", isRaffle ? "true" : "false");
        tabRaffle.classList.toggle("club-charter-modal__menu-item--active", isRaffle);
      }
      if (tabComm) {
        tabComm.setAttribute("aria-selected", isRaffle ? "false" : "true");
        tabComm.classList.toggle("club-charter-modal__menu-item--active", !isRaffle);
      }
      if (panelRaffle) {
        panelRaffle.hidden = !isRaffle;
        panelRaffle.setAttribute("aria-hidden", isRaffle ? "false" : "true");
      }
      if (panelComm) {
        panelComm.hidden = isRaffle;
        panelComm.setAttribute("aria-hidden", isRaffle ? "true" : "false");
      }
    }
    function openCharter(opts) {
      opts = opts || {};
      try {
        if (typeof window.closeVpnProxyModal === "function") window.closeVpnProxyModal();
      } catch (eVpnClose) {}
      try {
        if (typeof window.closeClubWelcomeModal === "function") window.closeClubWelcomeModal();
      } catch (eWelClose) {}
      lockCharterBehindScroll();
      modal.setAttribute("aria-hidden", "false");
      setCharterTab("raffle");
      if (paper) paper.scrollTop = 0;
      if (!opts.skipHistory) {
        try {
          if (String(window.location.hash || "") !== CLUB_CHARTER_HASH) {
            window.history.replaceState({}, "", window.location.pathname + window.location.search + CLUB_CHARTER_HASH);
          }
        } catch (eHist) {}
      }
    }
    function closeCharter() {
      modal.setAttribute("aria-hidden", "true");
      unlockCharterBehindScroll();
      try {
        if (String(window.location.hash || "") === CLUB_CHARTER_HASH) {
          window.history.replaceState({}, "", window.location.pathname + window.location.search);
        }
      } catch (eCloseHist) {}
    }
    function getCharterShareText() {
      return "Устав клуба «Два туза»";
    }
    function getCharterShareLink() {
      if (typeof buildMiniAppStartLink === "function") {
        var tgl = buildMiniAppStartLink("club_charter");
        if (tgl) return tgl;
      }
      var fb = String(POKER_DEFAULT_TELEGRAM_MINI_APP_URL || "")
        .trim()
        .replace(/\/+$/, "");
      if (!fb) return "";
      var sep = fb.indexOf("?") >= 0 ? "&" : "?";
      var needSlash = sep === "?" && /^https?:\/\/[^/?#]+$/i.test(fb);
      return fb + (needSlash ? "/" : "") + sep + "startapp=" + encodeURIComponent("club_charter");
    }
    function notifyUser(text) {
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tg && typeof tg.showAlert === "function") tg.showAlert(text);
      else if (typeof alert === "function") alert(text);
    }
    function runCharterShare() {
      var link = getCharterShareLink();
      var shareText = getCharterShareText();
      var shareUrl = "https://t.me/share/url?url=" + encodeURIComponent(link) + "&text=" + encodeURIComponent(shareText);
      pokerTryPwaWebShare({ title: shareText, text: shareText + "\n" + link, url: link }).then(function (pwaOk) {
        if (pwaOk) return;
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && typeof tg.openTelegramLink === "function") tg.openTelegramLink(shareUrl);
        else if (tg && typeof tg.openLink === "function") tg.openLink(shareUrl);
        else window.open(shareUrl, "_blank");
      });
    }
    function runCharterCopy() {
      var link = getCharterShareLink();
      var shareText = getCharterShareText();
      var textToCopy = link;
      try {
        if (typeof navigator !== "undefined" && navigator && typeof navigator.clipboard !== "undefined" && typeof navigator.clipboard.writeText === "function") {
          navigator.clipboard.writeText(textToCopy).then(function () {
            notifyUser("Ссылка скопирована.");
          }).catch(function () {
            notifyUser("Не удалось скопировать ссылку.");
          });
        } else {
          notifyUser("Скопируйте ссылку вручную: " + shareText);
        }
      } catch (eCopy) {
        notifyUser("Не удалось скопировать ссылку.");
      }
    }
    window.openClubCharterModal = openCharter;
    window.closeClubCharterModal = closeCharter;
    openBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openCharter();
    });
    if (closeBtn) closeBtn.addEventListener("click", closeCharter);
    if (backBtn) {
      backBtn.addEventListener("click", function (e) {
        e.preventDefault();
        closeCharter();
      });
    }
    if (backdrop) backdrop.addEventListener("click", closeCharter);
    if (shareBtn) {
      shareBtn.addEventListener("click", function (e) {
        e.preventDefault();
        runCharterShare();
      });
    }
    if (copyBtn) {
      copyBtn.addEventListener("click", function (e) {
        e.preventDefault();
        runCharterCopy();
      });
    }
    if (tabRaffle) {
      tabRaffle.addEventListener("click", function (e) {
        e.preventDefault();
        setCharterTab("raffle");
      });
    }
    if (tabComm) {
      tabComm.addEventListener("click", function (e) {
        e.preventDefault();
        setCharterTab("comm");
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (modal.getAttribute("aria-hidden") !== "false") return;
      closeCharter();
    });
    window.addEventListener("hashchange", function () {
      if (window.location.hash === CLUB_CHARTER_HASH) {
        openCharter({ skipHistory: true });
      } else if (modal.getAttribute("aria-hidden") === "false") {
        closeCharter();
      }
    });
    setTimeout(function () {
      if (window.location.hash === CLUB_CHARTER_HASH) openCharter({ skipHistory: true });
    }, 0);
  })();

  (function initClubWelcomeModal() {
    var modal = document.getElementById("clubWelcomeModal");
    var openBtn = document.getElementById("headerClubWelcomeBtn");
    var closeBtn = document.getElementById("clubWelcomeModalClose");
    var backdrop = document.getElementById("clubWelcomeModalBackdrop");
    var paper = modal && modal.querySelector(".club-welcome-modal__paper");
    var welcomeLockY = 0;
    var welcomeBehindLocked = false;
    function lockWelcomeBehindScroll() {
      if (welcomeBehindLocked) return;
      welcomeLockY =
        window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop) || 0;
      welcomeBehindLocked = true;
      try {
        document.documentElement.classList.add("club-charter-modal-open");
        var b = document.body;
        if (b) {
          b.style.overflow = "hidden";
          b.style.position = "fixed";
          b.style.top = "-" + welcomeLockY + "px";
          b.style.left = "0";
          b.style.right = "0";
          b.style.width = "100%";
        }
      } catch (eLock) {}
    }
    function unlockWelcomeBehindScroll() {
      if (!welcomeBehindLocked) return;
      welcomeBehindLocked = false;
      try {
        document.documentElement.classList.remove("club-charter-modal-open");
        var b = document.body;
        if (b) {
          b.style.overflow = "";
          b.style.position = "";
          b.style.top = "";
          b.style.left = "";
          b.style.right = "";
          b.style.width = "";
        }
        window.scrollTo(0, welcomeLockY);
      } catch (eUnlock) {}
    }
    if (!modal) return;
    function openWelcome() {
      try {
        if (typeof window.closeClubCharterModal === "function") window.closeClubCharterModal();
      } catch (eC) {}
      try {
        if (typeof window.closeVpnProxyModal === "function") window.closeVpnProxyModal();
      } catch (eV) {}
      lockWelcomeBehindScroll();
      modal.setAttribute("aria-hidden", "false");
      if (paper) paper.scrollTop = 0;
    }
    function closeWelcome() {
      modal.setAttribute("aria-hidden", "true");
      unlockWelcomeBehindScroll();
    }
    window.closeClubWelcomeModal = closeWelcome;
    window.openClubWelcomeModal = openWelcome;
    function bindWelcomeOpen(el) {
      if (!el) return;
      el.addEventListener("click", function (e) {
        e.preventDefault();
        if (window.__touchWasScroll && window.__touchWasScroll()) return;
        openWelcome();
      });
    }
    bindWelcomeOpen(openBtn);
    bindWelcomeOpen(document.getElementById("homeWelcomeTitleBtn"));
    if (closeBtn) closeBtn.addEventListener("click", closeWelcome);
    if (backdrop) backdrop.addEventListener("click", closeWelcome);
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (!modal || modal.getAttribute("aria-hidden") !== "false") return;
      closeWelcome();
    });
  })();

  (function initVpnProxyModal() {
    var VPN_PROXY_HASH = "#vpn-proxy";
    var VPN_PROXY_HASH_PROXY = "#vpn-proxy-proxy";
    var modal = document.getElementById("vpnProxyModal");
    var openBtn = document.getElementById("vpnProxyOpenBtn");
    var closeBtn = document.getElementById("vpnProxyModalClose");
    var backdrop = document.getElementById("vpnProxyModalBackdrop");
    var paper = modal && modal.querySelector(".club-charter-modal__paper");
    var tabVpn = document.getElementById("vpnProxyTabVpn");
    var tabProxy = document.getElementById("vpnProxyTabProxy");
    var panelVpn = document.getElementById("vpnProxyPanelVpn");
    var panelProxy = document.getElementById("vpnProxyPanelProxy");
    var feedVpn = document.getElementById("vpnProxyFeedVpn");
    var feedProxy = document.getElementById("vpnProxyFeedProxy");
    var hintVpn = document.getElementById("vpnProxyHintVpn");
    var hintProxy = document.getElementById("vpnProxyHintProxy");
    var compVpn = document.getElementById("vpnProxyComposerVpn");
    var compProxy = document.getElementById("vpnProxyComposerProxy");
    var lockY = 0;
    var behindLocked = false;

    function esc(s) {
      return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }
    function renderVpnProxyFeed(feed, items, isAdmin) {
      if (!feed) return;
      var linkify = feed.getAttribute("data-vpn-proxy-linkify") === "1";
      if (!items || !items.length) {
        feed.innerHTML =
          '<p class="gazette-article-comments__empty">Пока нет сообщений — напишите первым.</p>';
        return;
      }
      var aidAttrV = esc(String(feed.getAttribute("data-gazette-article-comments-article-id") || ""));
      feed.innerHTML = items
        .map(function (c) {
          return pokerBuildGazetteCommentItemHtml(c, aidAttrV, isAdmin, !!linkify);
        })
        .join("");
    }
    function loadVpnProxyFeed(feed) {
      if (!feed) return;
      var aid = feed.getAttribute("data-gazette-article-comments-article-id");
      if (!aid) return;
      var base = typeof getApiBase === "function" ? getApiBase() : "";
      if (!base) {
        renderVpnProxyFeed(feed, [], false);
        return;
      }
      feed.innerHTML = '<p class="gazette-article-comments__loading">Загрузка…</p>';
      var q =
        "?articleId=" +
        encodeURIComponent(aid) +
        (typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("&") : "");
      fetch(base + "/api/gazette-article-comments" + q)
        .then(function (r) {
          return r.json().then(function (data) {
            return { ok: r.ok, data: data };
          });
        })
        .then(function (res) {
          if (res.ok && res.data && res.data.ok && Array.isArray(res.data.comments)) {
            renderVpnProxyFeed(feed, res.data.comments, !!res.data.isAdmin);
          } else {
            renderVpnProxyFeed(feed, [], false);
          }
        })
        .catch(function () {
          renderVpnProxyFeed(feed, [], false);
        });
    }
    function refreshVpnProxyAuthUi() {
      var cred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
      if (hintVpn) {
        if (cred) hintVpn.setAttribute("hidden", "");
        else hintVpn.removeAttribute("hidden");
      }
      if (hintProxy) {
        if (cred) hintProxy.setAttribute("hidden", "");
        else hintProxy.removeAttribute("hidden");
      }
      if (compVpn) {
        if (cred) compVpn.removeAttribute("hidden");
        else compVpn.setAttribute("hidden", "");
      }
      if (compProxy) {
        if (cred) compProxy.removeAttribute("hidden");
        else compProxy.setAttribute("hidden", "");
      }
    }
    function lockBehind() {
      if (behindLocked || !modal) return;
      behindLocked = true;
      lockY =
        window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop) || 0;
      try {
        document.documentElement.classList.add("vpn-proxy-modal-open");
        var b = document.body;
        if (b) {
          b.style.overflow = "hidden";
          b.style.position = "fixed";
          b.style.top = "-" + lockY + "px";
          b.style.left = "0";
          b.style.right = "0";
          b.style.width = "100%";
        }
      } catch (eL) {}
    }
    function unlockBehind() {
      if (!behindLocked) return;
      behindLocked = false;
      try {
        document.documentElement.classList.remove("vpn-proxy-modal-open");
        var b = document.body;
        if (b) {
          b.style.overflow = "";
          b.style.position = "";
          b.style.top = "";
          b.style.left = "";
          b.style.right = "";
          b.style.width = "";
        }
        window.scrollTo(0, lockY);
      } catch (eU) {}
    }
    function vpnProxyHashToTab(h) {
      return h === VPN_PROXY_HASH_PROXY ? "proxy" : "vpn";
    }
    function isVpnProxyHash(h) {
      return h === VPN_PROXY_HASH || h === VPN_PROXY_HASH_PROXY;
    }
    function syncVpnProxyLocationHashForTab(which) {
      try {
        var want = which === "proxy" ? VPN_PROXY_HASH_PROXY : VPN_PROXY_HASH;
        if (String(window.location.hash || "") !== want) {
          window.history.replaceState({}, "", window.location.pathname + window.location.search + want);
        }
      } catch (eHash) {}
    }
    function vpnProxyCurrentHash() {
      return panelProxy && !panelProxy.hidden ? VPN_PROXY_HASH_PROXY : VPN_PROXY_HASH;
    }
    function vpnProxyShareAbsoluteUrl() {
      try {
        if (typeof buildMiniAppStartLink === "function") {
          var hTg = vpnProxyCurrentHash();
          return buildMiniAppStartLink(hTg === VPN_PROXY_HASH_PROXY ? "vpn_proxy_proxy" : "vpn_proxy");
        }
      } catch (eU) {}
      return "";
    }
    function setVpnProxyTab(which) {
      var isVpn = which === "vpn";
      if (tabVpn) {
        tabVpn.setAttribute("aria-selected", isVpn ? "true" : "false");
        tabVpn.classList.toggle("club-charter-modal__menu-item--active", isVpn);
      }
      if (tabProxy) {
        tabProxy.setAttribute("aria-selected", isVpn ? "false" : "true");
        tabProxy.classList.toggle("club-charter-modal__menu-item--active", !isVpn);
      }
      if (panelVpn) {
        panelVpn.hidden = !isVpn;
        panelVpn.setAttribute("aria-hidden", isVpn ? "false" : "true");
      }
      if (panelProxy) {
        panelProxy.hidden = isVpn;
        panelProxy.setAttribute("aria-hidden", isVpn ? "true" : "false");
      }
    }
    function openModal(opts) {
      opts = opts || {};
      if (!modal) return;
      try {
        if (typeof window.closeClubCharterModal === "function") window.closeClubCharterModal();
      } catch (eCh) {}
      try {
        if (typeof window.closeClubWelcomeModal === "function") window.closeClubWelcomeModal();
      } catch (eWel) {}
      var tab = opts.tab === "proxy" ? "proxy" : "vpn";
      lockBehind();
      modal.setAttribute("aria-hidden", "false");
      refreshVpnProxyAuthUi();
      setVpnProxyTab(tab);
      if (paper) paper.scrollTop = 0;
      loadVpnProxyFeed(feedVpn);
      loadVpnProxyFeed(feedProxy);
      if (!opts.skipHistory) {
        syncVpnProxyLocationHashForTab(tab);
      }
    }
    function closeModal() {
      if (!modal) return;
      modal.setAttribute("aria-hidden", "true");
      unlockBehind();
      try {
        var h = String(window.location.hash || "");
        if (h === VPN_PROXY_HASH || h === VPN_PROXY_HASH_PROXY) {
          window.history.replaceState({}, "", window.location.pathname + window.location.search);
        }
      } catch (eCloseH) {}
    }
    window.__pokerVpnProxyReloadCommentFeed = loadVpnProxyFeed;
    window.closeVpnProxyModal = closeModal;
    window.openVpnProxyModal = function (opts) {
      openModal(opts || {});
    };
    if (!modal) return;
    if (openBtn) {
      openBtn.addEventListener("click", function (e) {
        e.preventDefault();
        openModal({ tab: "vpn" });
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        closeModal();
      });
    }
    if (backdrop) backdrop.addEventListener("click", closeModal);
    if (tabVpn) {
      tabVpn.addEventListener("click", function (e) {
        e.preventDefault();
        setVpnProxyTab("vpn");
        if (modal.getAttribute("aria-hidden") === "false") syncVpnProxyLocationHashForTab("vpn");
      });
    }
    if (tabProxy) {
      tabProxy.addEventListener("click", function (e) {
        e.preventDefault();
        setVpnProxyTab("proxy");
        if (modal.getAttribute("aria-hidden") === "false") syncVpnProxyLocationHashForTab("proxy");
      });
    }
    var vpnProxyCopyBtn = document.getElementById("vpnProxyCopyLinkBtn");
    if (vpnProxyCopyBtn && vpnProxyCopyBtn.getAttribute("data-vpn-proxy-share-bound") !== "1") {
      vpnProxyCopyBtn.setAttribute("data-vpn-proxy-share-bound", "1");
      vpnProxyCopyBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
        var linkCp = vpnProxyShareAbsoluteUrl();
        if (!linkCp) return;
        var msgCp = "Ссылка скопирована. Отправьте другу — откроется подборка ВПН и прокси.";
        if (typeof navigator.clipboard !== "undefined" && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(linkCp).then(function () {
            var tgCp = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            if (tgCp && tgCp.showAlert) tgCp.showAlert(msgCp);
            else alert("Ссылка скопирована.");
            if (typeof recordShareButtonClick === "function") recordShareButtonClick("vpn_proxy_modal_copy");
          }).catch(function () {
            var tgCp2 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            if (tgCp2 && tgCp2.showAlert) tgCp2.showAlert("Ссылка: " + linkCp);
            else alert("Ссылка: " + linkCp);
          });
        } else {
          var tgCp3 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tgCp3 && tgCp3.showAlert) tgCp3.showAlert("Ссылка: " + linkCp);
          else alert("Ссылка: " + linkCp);
        }
      });
    }
    var vpnProxyShareBtn = document.getElementById("vpnProxyShareBtn");
    if (vpnProxyShareBtn && vpnProxyShareBtn.getAttribute("data-vpn-proxy-share-bound") !== "1") {
      vpnProxyShareBtn.setAttribute("data-vpn-proxy-share-bound", "1");
      vpnProxyShareBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
        var linkSh = vpnProxyShareAbsoluteUrl();
        if (!linkSh) return;
        var shareBody =
          "Подборка ВПН и прокси от игроков клуба «Два туза»:\n" + linkSh;
        var shareCaption = "Подборка ВПН и прокси от игроков клуба «Два туза».";
        var shareUrl =
          typeof pokerBuildTelegramShareUrlDialog === "function"
            ? pokerBuildTelegramShareUrlDialog(linkSh, shareCaption)
            : "";
        pokerTryPwaWebShare({ text: shareBody, url: linkSh }).then(function (pwaOk) {
          if (pwaOk) {
            if (typeof recordShareButtonClick === "function") recordShareButtonClick("vpn_proxy_modal");
            return;
          }
          var tgSh = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tgSh && tgSh.openTelegramLink) tgSh.openTelegramLink(shareUrl);
          else window.open(shareUrl, "_blank");
          if (typeof recordShareButtonClick === "function") recordShareButtonClick("vpn_proxy_modal");
        });
      });
    }
    window.addEventListener("hashchange", function () {
      var h = String(window.location.hash || "");
      if (isVpnProxyHash(h)) {
        openModal({ skipHistory: true, tab: vpnProxyHashToTab(h) });
      } else if (modal.getAttribute("aria-hidden") === "false") {
        closeModal();
      }
    });
    setTimeout(function () {
      var h0 = String(window.location.hash || "");
      if (isVpnProxyHash(h0)) openModal({ skipHistory: true, tab: vpnProxyHashToTab(h0) });
    }, 0);
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (!modal || modal.getAttribute("aria-hidden") !== "false") return;
      closeModal();
    });
    modal.addEventListener("submit", function (ev) {
      var form = ev.target;
      if (!form || !form.classList || !form.classList.contains("gazette-article-comments__form")) return;
      if (!modal.contains(form)) return;
      ev.preventDefault();
      var section = form.closest(".gazette-article-comments");
      var feed = section && section.querySelector(".gazette-article-comments__feed");
      var ta = form.querySelector(".gazette-article-comments__textarea");
      var st = form.querySelector(".gazette-article-comments__form-status");
      var sub = form.querySelector(".gazette-article-comments__submit");
      if (!feed || !ta) return;
      var aid = feed.getAttribute("data-gazette-article-comments-article-id");
      var text = ta.value ? ta.value.trim() : "";
      if (!text) {
        if (st) st.textContent = "Введите текст.";
        return;
      }
      if (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) {
        if (st) st.textContent = "Войдите в приложение.";
        return;
      }
      var basePost = typeof getApiBase === "function" ? getApiBase() : "";
      if (!basePost || typeof pokerApiAuthJsonBody !== "function") {
        if (st) st.textContent = "Не удалось отправить.";
        return;
      }
      if (sub) sub.disabled = true;
      if (st) st.textContent = "Отправляем…";
      var profileHint = {};
      try {
        var authG = window.__pokerTelegramAuth;
        if (authG && authG.status === "verified" && authG.user) {
          var uG = authG.user;
          if (uG.first_name) profileHint.profileFirstName = String(uG.first_name).trim().slice(0, 64);
          if (uG.last_name) profileHint.profileLastName = String(uG.last_name).trim().slice(0, 64);
        }
      } catch (eHint) {}
      var payload = pokerApiAuthJsonBody(
        Object.assign({ articleId: parseInt(aid, 10), text: text }, profileHint)
      );
      fetch(basePost + "/api/gazette-article-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (r) {
          return r.json().then(function (data) {
            return { ok: r.ok, data: data };
          });
        })
        .then(function (res) {
          if (sub) sub.disabled = false;
          if (res.ok && res.data && res.data.ok) {
            ta.value = "";
            if (st) st.textContent = "Опубликовано.";
            loadVpnProxyFeed(feed);
            return;
          }
          var msg =
            res.data && res.data.error ? String(res.data.error) : "Не удалось отправить.";
          if (st) st.textContent = msg;
        })
        .catch(function () {
          if (sub) sub.disabled = false;
          if (st) st.textContent = "Сеть недоступна.";
        });
    });
    modal.addEventListener("click", function (ev) {
      var profBtn = ev.target && ev.target.closest && ev.target.closest("[data-gazette-comment-member-id]");
      if (profBtn && modal.contains(profBtn)) {
        ev.preventDefault();
        ev.stopPropagation();
        var midP = profBtn.getAttribute("data-gazette-comment-member-id");
        if (!midP) return;
        var nameP =
          (profBtn.getAttribute("data-gazette-comment-display-name") || "").trim() ||
          (profBtn.textContent || "").trim() ||
          "Игрок";
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
        if (typeof window.openChatUserModalById === "function") {
          window.openChatUserModalById(midP, nameP, null);
        }
        return;
      }
    });
    (function bindVpnProxyKbRepair() {
      if (!modal) return;
      var blurTimer = null;
      function scheduleFin() {
        clearTimeout(blurTimer);
        blurTimer = setTimeout(function () {
          blurTimer = null;
          var active = document.activeElement;
          if (
            active &&
            active.classList &&
            active.classList.contains("gazette-article-comments__textarea") &&
            modal.contains(active)
          ) {
            return;
          }
          try {
            document.documentElement.classList.remove("gazette-comment-keyboard");
          } catch (eRm) {}
          try {
            if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
              window.__pokerFinalizeChatKeyboardDismiss();
            }
          } catch (eFin) {}
        }, 120);
      }
      modal.addEventListener(
        "focusin",
        function (ev) {
          var t = ev.target;
          if (!t || !t.classList || !t.classList.contains("gazette-article-comments__textarea")) return;
          if (!modal.contains(t)) return;
          try {
            document.documentElement.classList.add("gazette-comment-keyboard");
          } catch (eIn) {}
        },
        true
      );
      modal.addEventListener(
        "focusout",
        function (ev) {
          var t = ev.target;
          if (!t || !t.classList || !t.classList.contains("gazette-article-comments__textarea")) return;
          if (!modal.contains(t)) return;
          scheduleFin();
        },
        true
      );
    })();
  })();
})();
}

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

/**
 * Привязка лайтбокса к паре ник + сумма (после normalizeWinterNick для nick).
 * Порядок важен: первое совпадение выигрывает.
 */
var SINGLE_TOP_PREMIUM_LIGHTBOX_OVERRIDES = [
  { nick: "Sarmat1305", reward: 491248, png: "rating-single-top-1-sarmat.png" },
  { nickLower: true, nick: "botezgambit", reward: 270000, png: "rating-single-top-3-botezgambit.png" },
  { nick: "Дикий", reward: 144305, png: "rating-single-top-8-dikiy.png" },
  { nick: "Фокс", reward: 182268, png: "rating-single-top-6-fox.png" },
  { nick: "Фокс", reward: 182142, png: "rating-single-top-9-fox.png" },
  { nick: "Фокс", reward: 130072, png: "rating-single-top-11-fox.png" },
  { nick: "Waaar", reward: 105559, png: "rating-single-top-13-waaar.png" },
  { nick: "FrankL", reward: 110300, png: "rating-single-top-11-frankl.png" }
];

/**
 * @param {function(string): string} esc — экранирование для HTML (escapePreview из замыкания)
 */
function singleTopResolveLightboxControlTags(esc, r, nickN, rewN, nickEscaped) {
  var i;
  var o;
  var nMatch;
  for (i = 0; i < SINGLE_TOP_PREMIUM_LIGHTBOX_OVERRIDES.length; i++) {
    o = SINGLE_TOP_PREMIUM_LIGHTBOX_OVERRIDES[i];
    if (o.nickLower) {
      nMatch = String(nickN || "").toLowerCase() === String(o.nick || "").toLowerCase();
    } else {
      nMatch = nickN === o.nick;
    }
    if (nMatch && Number(rewN) === Number(o.reward)) {
      return {
        open:
          '<button type="button" class="winter-rating__single-top-link" data-lightbox-override="' +
          o.png +
          '" aria-label="Скрин турнира: ' +
          nickEscaped +
          '">',
        close: "</button>"
      };
    }
  }
  var lbIdx = r.lightboxIndex != null ? r.lightboxIndex : 0;
  var lbLeague = r.lightboxLeague === 1 || r.lightboxLeague === 2 ? ' data-lightbox-league="' + r.lightboxLeague + '"' : "";
  var lbWinter = r.winterImages ? ' data-lightbox-winter="1"' : "";
  return {
    open:
      '<button type="button" class="winter-rating__single-top-link" data-lightbox-date="' +
      esc(r.date) +
      '" data-lightbox-index="' +
      lbIdx +
      '"' +
      lbLeague +
      lbWinter +
      ' aria-label="Скрин турнира: ' +
      nickEscaped +
      '">',
    close: "</button>"
  };
}

// Рейтинг: кнопки «Топы прошлой недели» и «Топы текущей недели» (в кнопке — топ-3, по клику — модалка с полным списком)
(function initWinterRatingWeekTops() {
  var pastBtn = document.getElementById("winterRatingTopPastWeekBtn");
  var currentBtn = document.getElementById("winterRatingTopCurrentWeekBtn");
  var febBtn = document.getElementById("winterRatingTopFebruaryBtn");
  var pastPreview = document.getElementById("winterRatingTopPastWeekPreview");
  var currentPreview = document.getElementById("winterRatingTopCurrentWeekPreview");
  var febPreview = document.getElementById("winterRatingTopFebruaryPreview");
  var singleTopSummary = document.getElementById("winterRatingSingleTopSummary");
  var singleTopList = document.getElementById("winterRatingSingleTopList");
  var hallFameSingleTopSummary = document.getElementById("hallFameSingleTopSummary");
  var hallFameSingleTopList = document.getElementById("hallFameSingleTopList");
  var modal = document.getElementById("winterRatingWeekTopModal");
  var modalTitle = document.getElementById("winterRatingWeekTopModalTitle");
  var listEl = document.getElementById("winterRatingWeekTopList");
  var modalClose = document.getElementById("winterRatingWeekTopModalClose");
  var modalBackdrop = document.getElementById("winterRatingWeekTopModalBackdrop");
  var shareBtn = document.getElementById("winterRatingWeekTopShareBtn");
  var prizeInfo = document.getElementById("winterRatingWeekTopPrizeInfo");
  if (!pastBtn || !currentBtn || !pastPreview || !currentPreview || !modal || !modalTitle || !listEl) return;
  var currentModalDates = null;
  var currentModalLinkType = null;
  var februaryDatesCache = null;
  function escapePreview(s) {
    return String(s).replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function previewHtml(top, max) {
    max = max || 3;
    if (!top || !top.length) return "";
    var lines = top.slice(0, max).map(function (r, i) {
      var sum = formatRewardRound(r.totalReward);
      return "<span class=\"winter-rating__week-top-preview-line\">" + (i + 1) + ". " + escapePreview(r.nick) + " — " + sum + " ₽</span>";
    }).join("");
    var ellipsis = top.length > max ? "<span class=\"winter-rating__week-top-preview-ellipsis\">…</span>" : "";
    return lines + ellipsis;
  }
  function getFebruaryDatesFromData() {
    if (februaryDatesCache) return februaryDatesCache;
    var byDate = getRatingByDate();
    if (typeof byDate !== "object" || !Object.keys(byDate).length) return [];
    februaryDatesCache = Object.keys(byDate).filter(function (d) {
      return /\.02\.2026$/.test(d);
    });
    return februaryDatesCache;
  }
  function getMarchDatesFromData() {
    var byDate = getRatingByDate();
    if (typeof byDate !== "object" || !Object.keys(byDate).length) return [];
    return Object.keys(byDate).filter(function (d) { return /\.(03|04|05)\.2026$/.test(d); });
  }
  /**
   * Топ заносов за один турнир: зима и весна отдельно. Индекс скрина = порядок турнира в массиве
   * WINTER_RATING_TOURNAMENTS_BY_DATE / SPRING (должен совпадать с порядком файлов в *_IMAGES).
   * У турнира можно задать lightboxImageIndex (число) — индекс файла в массиве скринов за день, если порядок турниров ≠ порядок PNG.
   */
  function getSingleTopWins(allowedDates, limit) {
    /** Каждый занос = отдельная строка (один турнир). Один игрок может быть в топе несколько раз. */
    var wins = [];
    function dateAllowed(dateStr) {
      if (!/\.2026$/.test(dateStr)) return false;
      if (allowedDates && allowedDates.length && allowedDates.indexOf(dateStr) === -1) return false;
      return true;
    }
    function pushWin(nickRaw, reward, dateStr, tournamentLabel, lb) {
      var rewardN = reward != null ? Number(reward) : 0;
      if (!rewardN || rewardN !== rewardN) return;
      var nick = normalizeWinterNick(nickRaw);
      if (!nick) return;
      wins.push({
        nick: nick,
        reward: rewardN,
        date: dateStr,
        tournament: tournamentLabel,
        lightboxIndex: lb.index,
        lightboxLeague: lb.league,
        winterImages: lb.winterImages === true
      });
    }
    var winterByDate = getRatingTournamentsByDate();
    if (winterByDate && typeof winterByDate === "object") {
      Object.keys(winterByDate).forEach(function (dateStr) {
        if (!dateAllowed(dateStr)) return;
        var list = winterByDate[dateStr];
        if (!Array.isArray(list) || !list.length) return;
        list.forEach(function (t, j) {
          var lbIdx = t.lightboxImageIndex != null && !isNaN(Number(t.lightboxImageIndex)) ? Number(t.lightboxImageIndex) : j;
          var players = t.players || [];
          players.forEach(function (p) {
            pushWin(p.nick, p.reward, dateStr, t.name || t.time || "", { index: lbIdx, league: undefined, winterImages: true });
          });
        });
      });
    }
    if (typeof getSpringRatingTournamentsByDate === "function") {
      var springByDate = getSpringRatingTournamentsByDate() || {};
      Object.keys(springByDate).forEach(function (dateStr) {
        if (!dateAllowed(dateStr)) return;
        var list = springByDate[dateStr];
        if (!Array.isArray(list) || !list.length) return;
        var l1 = 0;
        var l2 = 0;
        for (var j = 0; j < list.length; j++) {
          var t = list[j];
          var forcedLeague = t.league != null ? Number(t.league) : NaN;
          var buyin = t.buyin != null ? Number(t.buyin) : NaN;
          var inLeague1 = forcedLeague === 1 || (forcedLeague !== forcedLeague && (buyin >= 500 || (buyin !== buyin)));
          var inLeague2 = forcedLeague === 2 || (forcedLeague !== forcedLeague && buyin >= 100 && buyin < 500);
          var leagueNum;
          var lbIndex;
          if (inLeague1 && !inLeague2) {
            leagueNum = 1;
            lbIndex = l1++;
          } else if (inLeague2 && !inLeague1) {
            leagueNum = 2;
            lbIndex = l2++;
          } else if (inLeague1 && inLeague2) {
            if (forcedLeague === 2) {
              leagueNum = 2;
              lbIndex = l2++;
            } else {
              leagueNum = 1;
              lbIndex = l1++;
            }
          } else {
            leagueNum = 1;
            lbIndex = 0;
          }
          var lbIndexFinal = t.lightboxImageIndex != null && !isNaN(Number(t.lightboxImageIndex)) ? Number(t.lightboxImageIndex) : lbIndex;
          var players = t.players || [];
          for (var k = 0; k < players.length; k++) {
            pushWin(players[k].nick, players[k].reward, dateStr, t.name || t.time || "", { index: lbIndexFinal, league: leagueNum, winterImages: false });
          }
        }
      });
    }
    if (!wins.length) return [];
    wins.sort(function (a, b) {
      var dr = (b.reward || 0) - (a.reward || 0);
      if (dr) return dr;
      return String(a.date).localeCompare(String(b.date));
    });
    var lim = limit != null ? limit : 15;
    return wins.slice(0, lim);
  }
  function buildSimpleSingleTopListHtml(wins) {
    if (!wins || !wins.length) return "";
    return wins
      .map(function (r, indexZeroBased) {
        var place = indexZeroBased + 1;
        var sum = formatRewardRound(r.reward);
        var nickN = normalizeWinterNick(r.nick);
        var rewN = r.reward != null ? Number(r.reward) : 0;
        if (rewN !== rewN) rewN = 0;
        var nickEscaped = escapePreview(r.nick);
        var tags = singleTopResolveLightboxControlTags(escapePreview, r, nickN, rewN, nickEscaped);
        var line = place + ". " + nickEscaped + " — " + sum + " ₽";
        return '<li class="winter-rating__single-top-item">' + tags.open + line + tags.close + "</li>";
      })
      .join("");
  }
  function updateButtonPreviews() {
    var pastTop = getTopByDates(GAZETTE_DATES);
    var currentTop = getTopByDates(CURRENT_WEEK_DATES);
    var febDates = isSpringRatingMode() ? getMarchDatesFromData() : getFebruaryDatesFromData();
    var febTop = febDates.length ? getTopByDates(febDates) : [];
    currentPreview.innerHTML = currentTop.length ? previewHtml(currentTop) : "";
    pastPreview.innerHTML = pastTop.length ? previewHtml(pastTop) : "";
    if (febPreview) {
      febPreview.innerHTML = febTop.length ? previewHtml(febTop, 3) : "";
    }
    var hasMainSingleTop = singleTopSummary && singleTopList;
    var hasHallSingleTop = hallFameSingleTopSummary && hallFameSingleTopList;
    if (hasMainSingleTop || hasHallSingleTop) {
      var fullSingleTop = getSingleTopWins(null, 15);
      var singleTopTitleText = "Топ выигрышей за один турнир (2026)";
      var listHtml = buildSimpleSingleTopListHtml(fullSingleTop);
      if (hasMainSingleTop) {
        singleTopSummary.textContent = singleTopTitleText;
        singleTopList.innerHTML = listHtml;
      }
      if (hasHallSingleTop) {
        hallFameSingleTopSummary.textContent = singleTopTitleText;
        hallFameSingleTopList.innerHTML = listHtml;
      }
    }
    var marchWrap = document.getElementById("winterRatingMarchWinsWrap");
    var marchSummary = document.getElementById("winterRatingMarchWinsSummary");
    var marchTop3Caption = document.getElementById("winterRatingMarchWinsTop3Caption");
    var marchList = document.getElementById("winterRatingMarchWinsList");
    if (marchWrap && marchSummary && marchList) {
      if (isSpringRatingMode()) {
        var marchData = getSpringRatingMarchTopWins();
        marchWrap.removeAttribute("hidden");
        marchWrap.style.display = "";
        if (marchData.max) {
          marchSummary.textContent = "Самый большой выигрыш за весну: " + escapePreview(marchData.max.nick) + " — " + formatRewardRound(marchData.max.reward) + " ₽";
        } else {
          marchSummary.textContent = "Самый большой выигрыш за весну: —";
        }
        if (marchTop3Caption) marchTop3Caption.textContent = marchData.top3 && marchData.top3.length ? "Топ-3 выигрыша за весну:" : "";
        if (marchData.top3 && marchData.top3.length) {
          marchList.innerHTML = marchData.top3.map(function (r, i) {
            var sum = formatRewardRound(r.reward);
            return "<li class=\"winter-rating__single-top-item\">" + (i + 1) + ". " + escapePreview(r.nick) + " — " + sum + " ₽</li>";
          }).join("");
        } else {
          marchList.innerHTML = "";
        }
      } else {
        marchWrap.setAttribute("hidden", "");
        marchWrap.style.display = "none";
      }
    }
  }
  (function initSingleTopLightboxClicks() {
    document.addEventListener("click", function (e) {
      var t = e.target;
      if (!t || !t.closest) return;
      var link = t.closest(".winter-rating__single-top-link");
      if (!link) return;
      var block = document.getElementById("winterRatingSingleTopWrap");
      var hallBlock = document.getElementById("hallFameSingleTopWrap");
      var inSingleTop =
        (block && block.contains(link)) || (hallBlock && hallBlock.contains(link));
      if (!inSingleTop) return;
      var overrideFile = link.getAttribute("data-lightbox-override");
      if (overrideFile) {
        e.preventDefault();
        if (typeof openWinterRatingLightbox === "function") {
          openWinterRatingLightbox("", 0, undefined, { overrideFile: overrideFile });
        }
        return;
      }
      if (!link.getAttribute("data-lightbox-date")) return;
      e.preventDefault();
      var dateStr = link.getAttribute("data-lightbox-date");
      var idx = parseInt(link.getAttribute("data-lightbox-index"), 10);
      if (idx !== idx) idx = 0;
      var leagueStr = link.getAttribute("data-lightbox-league");
      var leagueNum = leagueStr === "1" || leagueStr === "2" ? parseInt(leagueStr, 10) : undefined;
      var winter = link.getAttribute("data-lightbox-winter") === "1";
      if (typeof openWinterRatingLightbox === "function") {
        openWinterRatingLightbox(dateStr, idx, leagueNum, { winterImages: winter, singleImageOnly: true });
      }
    });
  })();
  window.updateWinterRatingWeekTopPreviews = updateButtonPreviews;
  var scheduleWeekTopIdle = window.requestIdleCallback
    ? function (fn) { window.requestIdleCallback(fn, { timeout: 1800 }); }
    : function (fn) { setTimeout(fn, 1); };
  scheduleWeekTopIdle(function () {
    if (window.updateWinterRatingWeekTopPreviews) window.updateWinterRatingWeekTopPreviews();
    if (typeof updateSpringRatingHomePromoStats === "function") updateSpringRatingHomePromoStats();
    if (typeof pokerUpdateHomeWelcomeOutlineFrame === "function") pokerUpdateHomeWelcomeOutlineFrame();
  });

  // Админская кнопка «Сообщить в чат об обновлении рейтинга»
  (function initWinterRatingAdminNotify() {
    var btn = document.getElementById("winterRatingNotifyBtn");
    var subsBtn = document.getElementById("winterRatingNotifySubsBtn");
    var hint = document.getElementById("winterRatingNotifyHint");
    if (!btn && !subsBtn) return;
    function updateSpringRatingPromoDateToToday() {
      var el = document.querySelector(".feature--rating-spring-promo .feature__title-updated");
      if (!el) return;
      var now = new Date();
      var dd = String(now.getDate()).padStart(2, "0");
      var mm = String(now.getMonth() + 1).padStart(2, "0");
      var yyyy = now.getFullYear();
      var dateStr = dd + "." + mm + "." + yyyy;
      el.textContent = "обновлено " + dateStr;
      if (typeof SPRING_RATING_UPDATED !== "undefined") {
        SPRING_RATING_UPDATED = dateStr;
      }
    }
    function sendRequest(button, url, body, pendingText, successText, errorPrefix, onSuccess) {
      var base = getApiBase();
      if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
        if (hint) hint.textContent = "Нет соединения с сервером или сессии (войдите в Telegram / PWA).";
        return;
      }
      var originalText = button.textContent;
      button.disabled = true;
      button.textContent = pendingText;
      if (hint) hint.textContent = "";
      var extra = typeof body === "object" && body ? body : {};
      var payload = typeof pokerGuestOrAuthedPostBody === "function" ? pokerGuestOrAuthedPostBody(extra) : Object.assign({}, extra);
      fetch(base + url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          if (data && data.ok) {
            if (typeof onSuccess === "function") {
              onSuccess(data);
            } else if (hint) {
              hint.textContent = successText;
            }
          } else {
            if (hint)
              hint.textContent =
                (errorPrefix || "Ошибка") +
                ": " +
                (data && data.error ? data.error : "не удалось отправить");
          }
        })
        .catch(function () {
          if (hint) hint.textContent = (errorPrefix || "Ошибка") + " сети при отправке.";
        })
        .finally(function () {
          button.disabled = false;
          button.textContent = originalText;
        });
    }
    // Обновление текста кнопки подписчиков количеством — вызывается только после проверки админа
    window.updateRatingSubsCount = function () {
      if (!subsBtn) return;
      var base = getApiBase();
      if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
      var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
      fetch(base + "/api/rating-manual-subscribers?stats=1" + q.replace("?", "&"))
        .then(function (r) {
          if (!r.ok) return Promise.reject(new Error("http " + r.status));
          return r.json();
        })
        .then(function (data) {
          if (!data || !data.ok || typeof data.total !== "number") return;
          var total = data.total;
          var baseText = "Разослать подписчикам рейтинга";
          var current = subsBtn.textContent || baseText;
          var idx = current.indexOf(" (");
          if (idx !== -1) current = current.slice(0, idx);
          subsBtn.textContent = current + " (" + total + ")";
        })
        .catch(function () {});
    };

    if (btn) {
      btn.addEventListener("click", function () {
        sendRequest(
          btn,
          "/api/rating-manual",
          { action: "spring_rating_notify" },
          "Отправляем…",
          "Сообщение отправлено в общий чат.",
          "Ошибка",
          function (data) {
            if (hint) {
              hint.textContent = "Сообщение отправлено в общий чат.";
            }
            updateSpringRatingPromoDateToToday();
          }
        );
      });
    }
    if (subsBtn) {
      subsBtn.addEventListener("click", function () {
        sendRequest(
          subsBtn,
          "/api/rating-manual-subscribers",
          {},
          "Рассылаем…",
          "",
          "Ошибка рассылки",
          function (data) {
            if (!hint) return;
            var sent =
              data && typeof data.sent === "number" && data.sent >= 0 ? data.sent : 0;
            var total =
              data && typeof data.total === "number" && data.total >= 0 ? data.total : 0;
            hint.textContent =
              "Личные сообщения отправлены: " + sent + " из " + total + " подписчиков.";
          }
        );
      });
    }
  })();

  function prizeForPlace(place) {
    if (place === 1) return "5 000 ₽";
    if (place === 2) return "3 000 ₽";
    if (place === 3) return "1 000 ₽";
    return "—";
  }
  function renderTopList(top, dates) {
    currentModalDates = dates;
    var isCurrentWeek = dates === CURRENT_WEEK_DATES;
    if (!top.length) {
      listEl.innerHTML = "<p class=\"winter-rating__week-top-empty\">Нет данных за выбранный период.</p>";
      listEl.classList.remove("winter-rating-week-top-modal__list--with-prize");
      return;
    }
    if (isCurrentWeek) {
      listEl.classList.add("winter-rating-week-top-modal__list--with-prize");
      listEl.innerHTML = "<div class=\"winter-rating__week-top-header\"><span class=\"winter-rating__week-top-num\">№</span><span class=\"winter-rating__week-top-header-nick\">Ник</span><span class=\"winter-rating__week-top-header-reward\">Выигрыш</span><span class=\"winter-rating__week-top-header-prize\">Приз</span></div>" + top.map(function (r, i) {
        var nickEsc = String(r.nick).replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        var nickAttr = String(r.nick).replace(/"/g, "&quot;");
        var sum = formatRewardRound(r.totalReward);
        var prize = prizeForPlace(i + 1);
        return "<div class=\"winter-rating__week-top-item\"><span class=\"winter-rating__week-top-num\">" + (i + 1) + ".</span><button type=\"button\" class=\"winter-rating__nick-btn\" data-nick=\"" + nickAttr + "\">" + nickEsc + "</button><span class=\"winter-rating__week-top-reward\">" + sum + " ₽</span><span class=\"winter-rating__week-top-prize\">" + prize + "</span></div>";
      }).join("");
    } else {
      listEl.classList.remove("winter-rating-week-top-modal__list--with-prize");
      listEl.innerHTML = top.map(function (r, i) {
      var nickEsc = String(r.nick).replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
      var nickAttr = String(r.nick).replace(/"/g, "&quot;");
      var sum = formatRewardRound(r.totalReward);
      return "<div class=\"winter-rating__week-top-item\"><span class=\"winter-rating__week-top-num\">" + (i + 1) + ".</span><button type=\"button\" class=\"winter-rating__nick-btn\" data-nick=\"" + nickAttr + "\">" + nickEsc + "</button><span class=\"winter-rating__week-top-reward\">" + sum + " ₽</span></div>";
      }).join("");
  }
  }
  function openModal(panelTitle, dates, linkType) {
    var top = getTopByDates(dates);
    modalTitle.textContent = panelTitle;
    renderTopList(top, dates);
    if (linkType) {
      currentModalLinkType = linkType;
    } else {
      currentModalLinkType = dates === CURRENT_WEEK_DATES ? "current" : "past";
    }
    if (prizeInfo) {
      var isCurrent = currentModalLinkType === "current";
      prizeInfo.style.display = isCurrent ? "" : "none";
      prizeInfo.setAttribute("aria-hidden", isCurrent ? "false" : "true");
    }
    var shareRow = shareBtn ? shareBtn.closest(".winter-rating-week-top-modal__share-row") : null;
    if (shareRow) {
      shareRow.style.display = (typeof isSpringRatingMode === "function" && isSpringRatingMode() && linkType === "past") ? "none" : "";
    }
    modal.setAttribute("aria-hidden", "false");
    if (document.body) document.body.style.overflow = "hidden";
  }
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var type = currentModalLinkType === "current"
        ? "rating_top_current"
        : currentModalLinkType === "mar"
          ? "rating_top_mar"
          : currentModalLinkType === "feb"
            ? "rating_top_february"
            : "rating_top_past";
      var link = typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink(type) : "";
      var msg = type === "rating_top_current"
        ? "Ссылка скопирована. Отправьте другу — откроется блок «Топы текущей недели»."
        : "Ссылка скопирована. Отправьте другу — откроется этот топ.";
      if (typeof navigator.clipboard !== "undefined" && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link).then(function () {
          var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tg && tg.showAlert) tg.showAlert(msg); else alert("Ссылка скопирована.");
        }).catch(function () {
          var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tg && tg.showAlert) tg.showAlert("Ссылка: " + link); else alert("Ссылка: " + link);
        });
      } else {
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.showAlert) tg.showAlert("Ссылка: " + link); else alert("Ссылка: " + link);
      }
    });
  }
  // Кнопки «Поделиться» для весенних лиг находятся внутри блоков лиг (winter-rating__spring-league-share),
  // отдельная общая кнопка под итоговой таблицей отключена.
  window.openWinterRatingWeekTopModal = function (kind) {
    if (kind === "current") openModal("Топы текущей недели", CURRENT_WEEK_DATES, "current");
    else if (kind === "past") openModal("Топы прошлой недели", GAZETTE_DATES, "past");
    else if (kind === "feb") {
      if (isSpringRatingMode()) openModal("Топы весны", getMarchDatesFromData(), "mar");
      else openModal("Топы Февраля", getFebruaryDatesFromData(), "feb");
    }
  };
  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    if (document.body) document.body.style.overflow = "";
  }
  currentBtn.addEventListener("click", function () {
    if (isSpringRatingMode() && SPRING_TOP_LINK_BASE) {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var sep = SPRING_TOP_LINK_BASE.indexOf("?") >= 0 ? "&" : "?";
      var link = SPRING_TOP_LINK_BASE + sep + "Mart_week_1=1";
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tg && tg.openTelegramLink) tg.openTelegramLink(link);
      else window.open(link, "_blank");
      return;
    }
    openModal("Топы текущей недели", CURRENT_WEEK_DATES, "current");
  });
  pastBtn.addEventListener("click", function () {
    openModal("Топы прошлой недели", GAZETTE_DATES, "past");
  });
  if (febBtn) {
    febBtn.addEventListener("click", function () {
      if (isSpringRatingMode() && SPRING_TOP_LINK_BASE) {
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
        var sep = SPRING_TOP_LINK_BASE.indexOf("?") >= 0 ? "&" : "?";
        var link = SPRING_TOP_LINK_BASE + sep + "mart=1";
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.openTelegramLink) tg.openTelegramLink(link);
        else window.open(link, "_blank");
        return;
      }
      if (isSpringRatingMode()) openModal("Топы весны", getMarchDatesFromData(), "mar");
      else openModal("Топы Февраля", getFebruaryDatesFromData(), "feb");
    });
  }
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
  listEl.addEventListener("click", function (e) {
    var btn = e.target && e.target.closest ? e.target.closest(".winter-rating__nick-btn") : null;
    if (!btn || !btn.dataset.nick) return;
    e.preventDefault();
    if (typeof openWinterRatingPlayerModal === "function") openWinterRatingPlayerModal(btn.dataset.nick, { onlyDates: currentModalDates || GAZETTE_DATES, skipGazetteStyle: true });
  });
})();

// Восстановление скролла при «Назад» (чтобы body не оставался overflow: hidden после модалок)
window.addEventListener("popstate", function () {
  try {
    if (typeof pokerClearBodyDocumentScrollLockInline === "function") pokerClearBodyDocumentScrollLockInline();
  } catch (ePop) {}
});

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
  tg.ready();
  if (tg.expand) tg.expand();
  if (typeof tg.disableVerticalSwipes === "function") tg.disableVerticalSwipes();
  var currentTheme = document.documentElement.getAttribute("data-theme");
  var isLight = currentTheme === "light";
  var isGold = currentTheme === "gold";
  var isNeon = currentTheme === "neon";
  /* Совпадает с --overscroll-canvas / initTheme (резинка сверху не белая) */
  if (tg.setBackgroundColor) tg.setBackgroundColor(isLight ? "#fff7ed" : isGold ? "#05070d" : isNeon ? "#020611" : "#0f172a");
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

// Простая навигация по разделам (вкладки внизу)
const views = document.querySelectorAll("[data-view]");
const navItems = document.querySelectorAll("[data-view-target]:not(.bonus-game-back)");
const footer = document.querySelector(".card__footer");

/** Inert только у экранов .view — не у body[data-view] и пр., иначе весь документ (в т.ч. .bottom-nav) перестаёт получать клики. */
function pokerSyncInertForViewScreensOnly() {
  try {
    if (typeof HTMLElement === "undefined" || !("inert" in HTMLElement.prototype)) return;
    /* Снять ошибочный inert с body после старых сборок */
    if (document.body) document.body.removeAttribute("inert");
    views.forEach(function (view) {
      if (!view.classList || !view.classList.contains("view")) return;
      if (view.classList.contains("view--active")) view.removeAttribute("inert");
      else view.setAttribute("inert", "");
    });
  } catch (e) {}
}

(function pokerInitInactiveViewsInert() {
  function apply() {
    pokerSyncInertForViewScreensOnly();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply);
  else apply();
})();

// При запуске: главная / локальный браузер (скролл на body на всех не-chat экранах без initData)
(function () {
  var initialView = document.querySelector(".view--active[data-view]");
  var viewName = initialView ? initialView.getAttribute("data-view") : "";
  if (viewName === "home") {
    document.documentElement.classList.add("app-view-home");
  }
  document.documentElement.classList.toggle("app-view-home-html-scroll", viewName === "home");
  document.documentElement.classList.toggle("app-view-download-html-scroll", viewName === "download");
  document.documentElement.classList.toggle("app-view-cashout-html-scroll", viewName === "cashout");
  document.documentElement.classList.toggle("app-view-spring-rating-html-scroll", viewName === "spring-rating");
  document.documentElement.classList.toggle("app-view-profile-html-scroll", viewName === "profile");
  document.documentElement.classList.toggle("app-view-video-lessons-html-scroll", viewName === "video-lessons");
  document.documentElement.classList.toggle("app-view-raffles-html-scroll", viewName === "raffles");
  document.documentElement.classList.remove("app-view-vl-html-scroll");
  document.documentElement.classList.toggle("app-view-browser-local", viewName !== "chat");
  /* long-scroll без главной и без «Скачать»: внутренний scrollport в .card__content (как у главной). */
  var longScrollInit =
    viewName === "learn-play-hub" ||
    viewName === "poker-tasks" ||
    viewName === "hall-of-fame";
  document.documentElement.classList.toggle("app-view-long-scroll", longScrollInit);
  if (document.body) document.body.classList.toggle("app-view-long-scroll", longScrollInit);
})();

/** Сброс inline-блокировки фона (модалки «Устав», чат и т.п.) — иначе залипает position:fixed + top */
function pokerClearBodyDocumentScrollLockInline() {
  try {
    var b = document.body;
    if (!b || !b.style) return;
    b.style.overflow = "";
    b.style.position = "";
    b.style.removeProperty("top");
    b.style.removeProperty("left");
    b.style.removeProperty("right");
    b.style.removeProperty("width");
  } catch (eClr) {}
}

/** Страховка: после чата/модалки вернуть скролл документа (не трогаем экран чата). */
function pokerEnsureUnlockedDocumentScrollForNonChat() {
  try {
    var view = document.body && document.body.getAttribute ? String(document.body.getAttribute("data-view") || "") : "";
    if (view === "chat") return;
    if (typeof window.__pokerClearChatKeyboardViewportState === "function") window.__pokerClearChatKeyboardViewportState();
    if (document.body) {
      pokerClearBodyDocumentScrollLockInline();
    }
    if (document.documentElement && document.documentElement.style && document.documentElement.style.overflow === "hidden") {
      document.documentElement.style.overflow = "";
    }
  } catch (eDocUnlock) {}
}

/* На старте страницы сразу снимаем возможный залипший lock (актуально для локального браузера после reload). */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", pokerEnsureUnlockedDocumentScrollForNonChat);
} else {
  pokerEnsureUnlockedDocumentScrollForNonChat();
}

function pokerIsDownloadViewActive() {
  try {
    return !!(document.body && document.body.getAttribute && document.body.getAttribute("data-view") === "download");
  } catch (eDv) {
    return false;
  }
}

/** Скролл документа перенесён в .card__content на «Скачать», главную, депозит, рейтинг весны, розыгрыши, профиль, видеоуроки и «Зал славы» (локальный Chrome / единый UX). */
function pokerGetPanelScrollCardContentEl() {
  try {
    var v = document.body && document.body.getAttribute ? String(document.body.getAttribute("data-view") || "") : "";
    if (v !== "download" && v !== "hall-of-fame" && v !== "home" && v !== "cashout" && v !== "spring-rating" && v !== "raffles" && v !== "profile" && v !== "video-lessons") return null;
    var card = document.querySelector("main.card");
    return card ? card.querySelector(".card__content") : null;
  } catch (ePan) {
    return null;
  }
}

function pokerGetDownloadCardContentScrollEl() {
  try {
    if (!pokerIsDownloadViewActive()) return null;
    return pokerGetPanelScrollCardContentEl();
  } catch (eDl) {
    return null;
  }
}

/** Сброс прокрутки окна (html/body) — при смене экрана иначе остаётся Y с предыдущей страницы. */
function scrollMainDocumentToTop() {
  try {
    var dl = pokerGetPanelScrollCardContentEl();
    if (dl) dl.scrollTop = 0;
    if (typeof window.scrollTo === "function") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } else {
      window.scrollTo(0, 0);
    }
    var se = document.scrollingElement || document.documentElement;
    if (se) se.scrollTop = 0;
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  } catch (e) {}
}

function getMainDocumentScrollY() {
  try {
    var dl = pokerGetPanelScrollCardContentEl();
    if (dl) return dl.scrollTop || 0;
    var se = document.scrollingElement || document.documentElement;
    return (se && se.scrollTop) || document.documentElement.scrollTop || document.body.scrollTop || 0;
  } catch (eY) {
    return 0;
  }
}

function setMainDocumentScrollY(y) {
  try {
    y = Math.max(0, y);
    var dl = pokerGetPanelScrollCardContentEl();
    if (dl) {
      var maxY = Math.max(0, (dl.scrollHeight || 0) - (dl.clientHeight || 0));
      dl.scrollTop = Math.min(y, maxY);
      return;
    }
    if (typeof window.scrollTo === "function") {
      window.scrollTo({ top: y, left: 0, behavior: "auto" });
    } else {
      window.scrollTo(0, y);
    }
    var se = document.scrollingElement || document.documentElement;
    if (se) se.scrollTop = y;
    if (document.documentElement) document.documentElement.scrollTop = y;
    if (document.body) document.body.scrollTop = y;
  } catch (e2) {}
}

function clampMainDocumentScrollY(y) {
  try {
    y = Math.max(0, Number(y) || 0);
    var dl = pokerGetPanelScrollCardContentEl();
    if (dl) {
      var maxPanel = Math.max(0, (dl.scrollHeight || 0) - (dl.clientHeight || 0));
      return Math.min(y, maxPanel);
    }
    var h = Math.max(
      document.documentElement.scrollHeight || 0,
      document.body.scrollHeight || 0
    );
    var se = document.scrollingElement;
    if (se && se.scrollHeight) h = Math.max(h, se.scrollHeight);
    var vh = window.innerHeight || document.documentElement.clientHeight || 0;
    var maxY = Math.max(0, h - vh);
    return Math.min(y, maxY);
  } catch (eClamp) {
    return Math.max(0, y);
  }
}

/** Запоминание scrollY по имени экрана; восстановление только при setView(..., { fromBack: true }) */
var viewScrollMemory = Object.create(null);
/** Прокрутка окна отдельно по каждой вкладке зала славы */
var hallFamePanelScrollMemory = Object.create(null);

function scrollHomeToTop() {
  if (!document.body || (document.body.getAttribute && document.body.getAttribute("data-view") !== "home")) return;
  scrollMainDocumentToTop();
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    scrollHomeToTop();
    setTimeout(scrollHomeToTop, 50);
    setTimeout(scrollHomeToTop, 300);
  });
} else {
  scrollHomeToTop();
  setTimeout(scrollHomeToTop, 50);
  setTimeout(scrollHomeToTop, 300);
}
window.addEventListener("pageshow", function (e) {
  if (e && e.persisted) scrollHomeToTop();
});

// PWA: короткий звук при новых сообщениях в чате.
function pokerReadChatMessageSoundEnabled() {
  try {
    var v = localStorage.getItem("poker_chat_msg_sound");
    if (v === null) return true;
    return v === "1" || String(v).toLowerCase() === "true" || String(v).toLowerCase() === "on";
  } catch (e) {
    // В приватных режимах/ограничениях localStorage может падать — тогда считаем, что звук включен.
    return true;
  }
}
function pokerPlayChatMessageNotificationSound() {
  try {
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    var ctx = window.__msgAudioCtx;
    if (!ctx) ctx = window.__msgAudioCtx = new Ctx();
    if (ctx.state === "suspended") ctx.resume();
    var now = ctx.currentTime;
    // Два быстрых тона: коротко и заметно, но без долгого "пищания".
    var mkTone = function (freq, t0, dur, g0) {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t0);
      gain.gain.setValueAtTime(g0, t0);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
      osc.start(t0);
      osc.stop(t0 + dur);
    };
    mkTone(740, now, 0.06, 0.05);
    mkTone(520, now + 0.08, 0.07, 0.04);
  } catch (err) {}
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    try {
      if (typeof window.__pokerInitSiteHomeInstructionModal === "function") window.__pokerInitSiteHomeInstructionModal();
      if (typeof window.__pokerSyncSiteHomeInstructionMode === "function") window.__pokerSyncSiteHomeInstructionMode();
      if (typeof window.__pokerSyncProfileGuestWebsiteMode === "function") window.__pokerSyncProfileGuestWebsiteMode();
    } catch (eSiteHomeInit) {}
  });
} else {
  try {
    if (typeof window.__pokerInitSiteHomeInstructionModal === "function") window.__pokerInitSiteHomeInstructionModal();
    if (typeof window.__pokerSyncSiteHomeInstructionMode === "function") window.__pokerSyncSiteHomeInstructionMode();
    if (typeof window.__pokerSyncProfileGuestWebsiteMode === "function") window.__pokerSyncProfileGuestWebsiteMode();
  } catch (eSiteHomeInitNow) {}
}

/** Состояние верификации Telegram для доступа к чату (см. __pokerTelegramAuth в initTelegramAuth) */
function getPokerChatTelegramAuthState() {
  try {
    var a = window.__pokerTelegramAuth;
    if (!a || !a.status) return "pending";
    if (a.status === "verified" || a.status === "dev_skip") {
      return a.user != null && a.user.id != null ? "ok" : "blocked";
    }
    if (a.status === "verifying" || a.status === "unknown") return "pending";
    return "blocked";
  } catch (e) {
    return "pending";
  }
}

/** Сообщение при попытке писать в чат без входа (браузер / PWA). */
var POKER_CHAT_NEED_AUTH_PWA_MSG =
  "Чтобы общаться в чатах, сначала авторизуйтесь.\n1. Добавьте ярлык на экран «Домой» (из Safari или Google Chrome).\n2. Зайдите с ярлыка и авторизуйтесь.";

function pokerSafeChatAlert(msg) {
  var text = msg != null ? String(msg) : "";
  try {
    var w = window.Telegram && window.Telegram.WebApp;
    if (w && typeof w.showAlert === "function") {
      w.showAlert(text);
      return;
    }
  } catch (eTgChatAlert) {}
  try {
    if (typeof alert === "function") alert(text);
  } catch (eBrowserChatAlert) {}
}

function pokerNotifyChatVerificationRequired() {
  var msg = isTelegramWebApp()
    ? "Чтобы общаться в чатах, сначала войдите: откройте Mini App из бота Telegram."
    : POKER_CHAT_NEED_AUTH_PWA_MSG;
  pokerSafeChatAlert(msg);
}

function pokerNotifyChatAuthPending() {
  var msg = "Выполняется проверка входа через Telegram… Повторите через несколько секунд.";
  pokerSafeChatAlert(msg);
}

/** false — прервать действие в чате (показано уведомление) */
function pokerEnsureChatTelegramVerified() {
  var st = getPokerChatTelegramAuthState();
  if (st === "pending") {
    pokerNotifyChatAuthPending();
    return false;
  }
  if (st !== "ok") {
    pokerNotifyChatVerificationRequired();
    return false;
  }
  return true;
}

/** Открытие диалога менеджера из депозита после setView("chat"): не полагаться на фиксированный таймаут. */
function pokerTryConsumePendingManagerFromCashout() {
  var pm = window.__pendingOpenManagerFromCashout;
  if (!pm || !pm.userId) return;
  if (typeof window.chatOpenConvFromDialogs !== "function") return;
  window.__pendingOpenManagerFromCashout = null;
  window.chatOpenConvFromDialogs(pm.userId, pm.userName || "Менеджер");
}

function setView(viewName, navOpts) {
  navOpts = navOpts || {};
  try {
    pokerPushOpenStateDebug("setView-enter", String(viewName || ""));
  } catch (eSetViewDbg0) {}
  var restoreScrollOnEnter = navOpts.fromBack === true;
  try {
    if (viewName !== "chat" && viewName !== "keyboard-lab") {
      setTelegramIosKeyboardRootLock(false);
    }
  } catch (eTgKbUnlockView) {}
  /* Чаты всегда открываются (нижнее меню). Верификация — pokerEnsure на диалогах/отправке. */
  var prevView = "";
  try {
    if (document.body && document.body.getAttribute) prevView = document.body.getAttribute("data-view") || "";
  } catch (ePrev) {}
  /* Уход с чата по таббару/жесту: blur и полный сброс клавиатуры/ visualViewport — иначе на iOS залипают
     html.chat-keyboard-open (overflow:hidden), inset и таббар «парит» с зазором снизу до главной. */
  if (prevView === "chat" && viewName !== "chat") {
    try {
      var compLeave = document.getElementById("chatSharedComposer");
      if (compLeave && document.activeElement === compLeave && typeof compLeave.blur === "function") compLeave.blur();
      var dlgLeave = document.getElementById("chatFindByIdInputDialogs");
      if (dlgLeave && document.activeElement === dlgLeave && typeof dlgLeave.blur === "function") dlgLeave.blur();
      var findLeave = document.getElementById("chatFindByIdInput");
      if (findLeave && document.activeElement === findLeave && typeof findLeave.blur === "function") findLeave.blur();
    } catch (eBlurLeaveChat) {}
    try {
      if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
        window.__pokerFinalizeChatKeyboardDismiss();
      } else {
        if (typeof window.__pokerClearChatKeyboardViewportState === "function") {
          window.__pokerClearChatKeyboardViewportState();
        }
        if (typeof window.__pokerChatDetachVisualViewportListeners === "function") {
          window.__pokerChatDetachVisualViewportListeners();
        }
      }
    } catch (eFinKb) {}
    try {
      var twLeave = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (twLeave && typeof twLeave.expand === "function") twLeave.expand();
    } catch (eTwExp) {}
    try {
      if (typeof window.dispatchEvent === "function") window.dispatchEvent(new Event("resize"));
    } catch (eRes) {}
    try {
      if (typeof pokerApplyAppTopPadding === "function") pokerApplyAppTopPadding();
    } catch (ePadL) {}
    try {
      var bnavLeaveChat = document.querySelector(".bottom-nav");
      if (bnavLeaveChat) {
        bnavLeaveChat.classList.add("bottom-nav--no-transition");
        var rafLvc = window.requestAnimationFrame || function (fn) {
          setTimeout(fn, 16);
        };
        rafLvc(function () {
          rafLvc(function () {
            bnavLeaveChat.classList.remove("bottom-nav--no-transition");
          });
        });
      }
    } catch (eNavLvc) {}
    setTimeout(function () {
      try {
        if (document.body.classList.contains("chat-keyboard-open")) return;
        if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") window.__pokerFinalizeChatKeyboardDismiss();
      } catch (eKb2) {}
      try {
        if (typeof pokerNukeIosKeyboardViewportArtifacts === "function") pokerNukeIosKeyboardViewportArtifacts({ resetMainScroll: true });
      } catch (eNk2) {}
      try {
        var tw2 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tw2 && typeof tw2.expand === "function") tw2.expand();
      } catch (eTw2) {}
      try {
        if (typeof pokerFlushBottomNavAndViewportAfterChatChrome === "function") pokerFlushBottomNavAndViewportAfterChatChrome();
      } catch (eFlLv) {}
    }, 120);
    setTimeout(function () {
      try {
        if (document.body.classList.contains("chat-keyboard-open")) return;
        if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") window.__pokerFinalizeChatKeyboardDismiss();
      } catch (eKb3) {}
      try {
        if (typeof pokerNukeIosKeyboardViewportArtifacts === "function") pokerNukeIosKeyboardViewportArtifacts({ resetMainScroll: true });
      } catch (eNk3) {}
      try {
        if (typeof pokerFlushBottomNavAndViewportAfterChatChrome === "function") pokerFlushBottomNavAndViewportAfterChatChrome();
      } catch (eFlLv2) {}
    }, 380);
  }
  if (prevView && prevView !== viewName) {
    viewScrollMemory[prevView] = getMainDocumentScrollY();
  }
  if (document.body) {
    pokerClearBodyDocumentScrollLockInline();
    document.body.setAttribute("data-view", viewName || "");
    try {
      if (typeof window.__pokerSyncProfileGuestWebsiteMode === "function") {
        window.__pokerSyncProfileGuestWebsiteMode();
      }
    } catch (eProfileGuestSync) {}
    try {
      if (viewName !== "home" && prevView === "home") {
        var olH = document.querySelector(".view[data-view=\"home\"] .home-welcome-outline");
        if (olH) olH.style.removeProperty("--home-welcome-outline-frame-h");
      }
    } catch (eHof) {}
  }
  try {
    if (typeof window.__pokerSyncSiteHomeInstructionMode === "function") window.__pokerSyncSiteHomeInstructionMode();
  } catch (eSiteHomeHdrView) {}
  try {
    if (viewName === "chat") {
      var guestChatGate = document.getElementById("chatDialogsGuestGate");
      var isTelegramMiniView = !!(window.Telegram && window.Telegram.WebApp);
      if (
        guestChatGate &&
        document.documentElement &&
        document.documentElement.classList &&
        (isTelegramMiniView ||
          document.documentElement.classList.contains("poker-ios-pwa") ||
          document.documentElement.classList.contains("poker-android-pwa"))
      ) {
        guestChatGate.hidden = true;
      }
    }
  } catch (eGuestGatePwaHide) {}
  /* После data-view: иначе при выходе из чата ensure видел data-view=chat и выходил раньше времени */
  if (viewName !== "chat") pokerEnsureUnlockedDocumentScrollForNonChat();
  if (prevView === "chat" && viewName !== "chat") {
    try {
      if (typeof window.__pokerStopChatDmFocusSession === "function") window.__pokerStopChatDmFocusSession();
    } catch (eDmLv) {}
    try {
      var rafPostChat = window.requestAnimationFrame || function (fn) {
        setTimeout(fn, 16);
      };
      rafPostChat(function () {
        try {
          if (typeof pokerNukeIosKeyboardViewportArtifacts === "function") pokerNukeIosKeyboardViewportArtifacts({ resetMainScroll: true });
        } catch (ePostNv) {}
      });
    } catch (ePostChat) {}
  }
  views.forEach(function (view) {
    if (view.dataset.view === viewName) {
      view.classList.add("view--active");
    } else {
      view.classList.remove("view--active");
    }
  });
  try {
    pokerSyncInertForViewScreensOnly();
  } catch (eInactiveViewsInert) {}
  // Мгновенный финальный вид нижней навигации при возврате на главную (без 250ms «доезда» поверх контента).
  if (viewName === "home" && prevView !== "home") {
    try {
      var bnavNt = document.querySelector(".bottom-nav");
      if (bnavNt) {
        bnavNt.classList.add("bottom-nav--no-transition");
        var rafNavNt = window.requestAnimationFrame || function (fn) { setTimeout(fn, 16); };
        rafNavNt(function () {
          rafNavNt(function () {
            bnavNt.classList.remove("bottom-nav--no-transition");
          });
        });
      }
    } catch (eNavNt) {}
  }
  navItems.forEach(function (item) {
    if (item.dataset.viewTarget === viewName) {
      item.classList.add("bottom-nav__item--active");
    } else {
      item.classList.remove("bottom-nav__item--active");
    }
  });
  if (footer) {
    if (viewName === "home") {
      footer.classList.remove("card__footer--hidden");
      fetchVisitorStatsOnly();
      fetchRaffleBadge();
      tryChillRadioPlay();
    } else {
      footer.classList.add("card__footer--hidden");
    }
  }
  if (viewName === "home") {
    initPokerShowsPlayer();
    if (typeof updateTournamentDayBlock === "function") updateTournamentDayBlock();
    try {
      var runHomeChatBoot = function () {
        if (typeof window.__pokerScheduleChatBootstrapFetch === "function") {
          window.__pokerScheduleChatBootstrapFetch();
        }
      };
      if (typeof isTelegramWebApp === "function" && isTelegramWebApp()) {
        setTimeout(runHomeChatBoot, 0);
      } else {
        var idleChatBoot = window.requestIdleCallback || function (cb) { setTimeout(cb, 80); };
        idleChatBoot(runHomeChatBoot);
      }
    } catch (eChatBootHome) {}
    if (!window.chatListenersAttached && typeof initChat === "function") {
      var idle = window.requestIdleCallback || function (cb) { setTimeout(cb, 100); };
      idle(function () { initChat(); });
    }
    try {
      if (typeof pokerUpdateHomeWelcomeOutlineFrame === "function") {
        var rafHof = window.requestAnimationFrame || function (fn) { setTimeout(fn, 0); };
        rafHof(function () {
          rafHof(function () {
            pokerUpdateHomeWelcomeOutlineFrame();
          });
        });
      }
    } catch (eHomeOf) {}
  }
  if (viewName === "chat") {
    try {
      pokerPushOpenStateDebug("setView-chat-branch", "");
    } catch (eSetViewDbg1) {}
    try {
      if (typeof window.__pokerClearChatKeyboardViewportState === "function") window.__pokerClearChatKeyboardViewportState();
    } catch (eChatKbCls) {}
    /* Один expand вместо burst: повторы дергали viewportChanged/padding и таббар подпрыгивал */
    if (prevView !== "chat" && typeof window.tryTelegramWebAppExpand === "function") {
      window.tryTelegramWebAppExpand();
    }
    try {
      if (prevView !== "chat") {
        var bnavChat = document.querySelector(".bottom-nav");
        if (bnavChat) {
          bnavChat.classList.add("bottom-nav--no-transition");
          var rafNavChat = window.requestAnimationFrame || function (fn) {
            setTimeout(fn, 16);
          };
          rafNavChat(function () {
            rafNavChat(function () {
              bnavChat.classList.remove("bottom-nav--no-transition");
            });
          });
        }
      }
    } catch (eNavChat) {}
    if (prevView !== "chat") {
      try {
        var rafDmEnter = window.requestAnimationFrame || function (fn) {
          setTimeout(fn, 16);
        };
        rafDmEnter(function () {
          try {
            if (typeof window.pokerUpdateChatDmFocusFromUiState === "function") window.pokerUpdateChatDmFocusFromUiState();
          } catch (eDmEnt) {}
        });
      } catch (eRafDm) {}
    }
    if (!window.chatListenersAttached && typeof initChat === "function") {
      try {
        pokerPushOpenStateDebug("setView-chat-initChat", "listeners=0");
      } catch (eSetViewDbg2) {}
      var runChatInit = function () {
        if (!window.chatListenersAttached && typeof initChat === "function") initChat();
      };
      if (typeof isTelegramWebApp === "function" && isTelegramWebApp()) {
        setTimeout(runChatInit, 0);
      } else {
        var idleChat = window.requestIdleCallback || function (cb) { setTimeout(cb, 100); };
        idleChat(runChatInit);
      }
    } else if (window.chatListenersAttached) {
      try {
        pokerPushOpenStateDebug("setView-chat-refresh-path", "listeners=1");
      } catch (eSetViewDbg3) {}
      if (window.__pendingOpenClubChatGeneral) {
        window.__pendingOpenClubChatGeneral = false;
        if (typeof window.tryOpenClubChatFromDialogs === "function") window.tryOpenClubChatFromDialogs();
        else if (typeof window.openClubChat === "function") window.openClubChat();
      } else if (window.__pendingOpenChatPersonalFromDeepLink && typeof window.chatOpenConvFromDialogs === "function") {
        try {
          var pendingDmSetView = window.__pendingOpenChatPersonalFromDeepLink;
          var pendingPeerSetView =
            pendingDmSetView && pendingDmSetView.userId != null ? String(pendingDmSetView.userId).trim() : "";
          pokerPushOpenStateDebug("setView-chat-open-pending", pendingPeerSetView || "");
          if (
            pendingPeerSetView &&
            typeof pokerOpenResolvedChatPeer === "function" &&
            pokerOpenResolvedChatPeer(
              pendingPeerSetView,
              pendingDmSetView.userName || pendingPeerSetView
            )
          ) {
            window.__pendingOpenChatPersonalFromDeepLink = null;
          } else if (
            pendingPeerSetView &&
            typeof pokerOpenPendingPushDmWithoutContacts === "function" &&
            pokerOpenPendingPushDmWithoutContacts(
              pendingPeerSetView,
              pendingDmSetView.userName || pendingPeerSetView
            )
          ) {
            pokerSchedulePendingPushDmContactsReload(
              pendingPeerSetView,
              pendingDmSetView.userName || pendingPeerSetView
            );
          } else if (
            pendingPeerSetView &&
            typeof pokerOpenChatPeerDirectFallback === "function" &&
            pokerOpenChatPeerDirectFallback(
              pendingPeerSetView,
              pendingDmSetView.userName || pendingPeerSetView
            )
          ) {
            pokerSchedulePendingPushDmContactsReload(
              pendingPeerSetView,
              pendingDmSetView.userName || pendingPeerSetView
            );
          } else {
            if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function") {
              window.__pokerEnsureOpenPendingChatPersonalFromDeepLink();
            }
          }
        } catch (eSetViewOpenPending) {
          try {
            window.__pokerForceAllowPendingPushConvOpen = false;
          } catch (eSetViewForceReset) {}
          if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function") {
            window.__pokerEnsureOpenPendingChatPersonalFromDeepLink();
          }
        }
      } else if (window.__pendingOpenChatPersonalFromDeepLink) {
        try {
          pokerPushOpenStateDebug(
            "setView-chat-wait-exports",
            "openConv=" + (typeof window.chatOpenConvFromDialogs) + " pushImm=" + (typeof window.__pokerOpenPushDmImmediate)
          );
        } catch (eSetViewDbg4) {}
        window.__pokerPendingChatDeepLinkNeedsLateFlush = true;
      } else if (typeof pokerGuardDefaultDialogsOpen === "function" && pokerGuardDefaultDialogsOpen()) {
      } else if (typeof window.chatShowDialogs === "function") {
        window.chatShowDialogs();
      }
    }
  }
  if (viewName === "winter-rating") {
    var winterView = document.querySelector('[data-view="winter-rating"]');
    var springView = document.querySelector('[data-view="spring-rating"]');
    var ratingSection = document.getElementById("winterRatingSection");
    var springPlaceholder = document.getElementById("springRatingSectionPlaceholder");
    if (ratingSection && springPlaceholder && ratingSection.classList.contains("spring-rating")) {
      ratingSection.classList.remove("spring-rating");
      if (winterView) winterView.appendChild(ratingSection);
    }
    try {
      initWinterRating();
    } catch (err) {
      if (typeof console !== "undefined" && console.error) console.error("initWinterRating", err);
    }
  }
  if (viewName === "spring-rating") {
    var winterView = document.querySelector('[data-view="winter-rating"]');
    var ratingSection = document.getElementById("winterRatingSection");
    var springPlaceholder = document.getElementById("springRatingSectionPlaceholder");
    if (ratingSection && springPlaceholder && winterView && ratingSection.parentNode === winterView) {
      winterView.removeChild(ratingSection);
      ratingSection.classList.add("spring-rating");
      springPlaceholder.appendChild(ratingSection);
    } else if (ratingSection && !ratingSection.classList.contains("spring-rating")) {
      ratingSection.classList.add("spring-rating");
    }
    try {
      initWinterRating();
    } catch (err) {
      if (typeof console !== "undefined" && console.error) console.error("initWinterRating", err);
    }
    if (typeof initSpringRatingViewScrollButton === "function") {
      initSpringRatingViewScrollButton();
      requestAnimationFrame(updateSpringRatingViewScrollButton);
    }
  }
  if (viewName === "profile") {
    try {
      pokerRememberTransportMemberIdFromEnvironment();
    } catch (eRememberEnvProfile) {}
    updateProfileUserName();
    updateProfileExitBtnVisibility();
    updateProfileDtId();
    try {
      if (typeof loadProfileDebugInfo === "function") loadProfileDebugInfo();
    } catch (eProfileDebugInit) {}
    try {
      if (typeof pokerRefreshFriendsCountFromApi === "function") pokerRefreshFriendsCountFromApi();
    } catch (eFrC) {}
    initProfileKeyboardViewportCleanup();
    initProfileTabs();
    initProfileP21Id();
    initProfilePokerPlus();
    initProfileEmailAuth();
    initProfilePersonal();
    initProfileAvatar();
    syncProfileStatusVisual();
    initProfileFishCollectionModal();
    loadProfileRespect();
    initProfileRespectVotersButton();
    initProfileFriends();
    initProfileExitBtn();
    initProfileChatPush();
  }
  if (viewName === "cashout") {
    initCashoutDepositForm();
  }
  if (viewName === "streams") {
    initStreams();
    // После initStreams: и при первом полном init, и при раннем return (__streamsInitAttached)
    // нужно съесть __pendingStreamsRoomId (deep link из Telegram / ?startapp=streams_…).
    if (typeof consumePendingStreamsWatchRoom === "function") consumePendingStreamsWatchRoom();
  } else {
    if (typeof streamsCleanup === "function") streamsCleanup();
  }
  if (viewName === "bonus-game") {
    initBonusGame();
    if (bonusPikhaninaInterval) clearInterval(bonusPikhaninaInterval);
    bonusPikhaninaInterval = setInterval(function () {
      updatePikhaninaStats();
      updateBonusStats();
    }, 60000);
  } else if (bonusPikhaninaInterval) {
    clearInterval(bonusPikhaninaInterval);
    bonusPikhaninaInterval = null;
  }
  if (viewName === "cooler-game") initCoolerGame();
  if (viewName === "plasterer-game") initPlastererGame();
  if (viewName === "raffles") {
    if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
    initRaffles();
  }
  if (viewName === "equilator") initEquilator();
  if (viewName === "video-lessons") {
    initVideoLessons();
    if (window.__pendingVideoLessonsOpenReviews) {
      window.__pendingVideoLessonsOpenReviews = false;
      try {
        if (typeof trackLinkSessionEvent === "function") trackLinkSessionEvent("deep:vl_reviews_nikolay", "");
      } catch (eVlDeep) {}
      var rafVlReviews = window.requestAnimationFrame || function (cb) {
        setTimeout(cb, 16);
      };
      rafVlReviews(function () {
        rafVlReviews(function () {
          var revOpenBtn = document.getElementById("videoLessonsReviewsOpenBtn");
          if (revOpenBtn && typeof revOpenBtn.click === "function") revOpenBtn.click();
        });
      });
    }
  }
  if (viewName === "poker-tasks") {
    var startScreen = document.getElementById("pokerTasksStartScreen");
    var streakScreen = document.getElementById("pokerStreakScreen");
    var resultScreen = document.getElementById("pokerStreakResultScreen");
    var pokerTasksView = document.querySelector('[data-view="poker-tasks"]');
    if (startScreen) startScreen.style.display = "";
    if (streakScreen) {
      streakScreen.classList.add("poker-streak-screen--hidden");
      streakScreen.style.display = "none";
    }
    if (resultScreen) {
      resultScreen.classList.add("poker-streak-result-screen--hidden");
      resultScreen.style.display = "none";
    }
    if (pokerTasksView) pokerTasksView.classList.remove("poker-tasks--task-visible");
    if (typeof window.refreshMttStats === "function") window.refreshMttStats();
    initClubTasksPlanner();
  }
  var headerGreeting = document.getElementById("headerGreeting");
  var headerSwitcherWrap = document.getElementById("headerChatSwitcherWrap");
  var greetingWrap = headerGreeting && headerGreeting.closest(".header-greeting-wrap");
  if (greetingWrap) greetingWrap.classList.toggle("header-greeting--hidden", viewName === "chat");
  if (headerSwitcherWrap) headerSwitcherWrap.classList.toggle("header-chat-switcher--hidden", viewName !== "chat");
  if (viewName === "chat") {
    document.documentElement.classList.add("app-view-chat");
    document.documentElement.classList.remove("app-view-winter-rating", "app-view-home");
    if (typeof updateChatNavDot === "function") updateChatNavDot();
    if (window.chatListenersAttached && typeof window.chatRefresh === "function") {
      window.chatRefresh();
    } else {
      initChat();
    }
    try {
      [0, 250, 900].forEach(function (delay) {
        setTimeout(function () {
          try {
            var contacts = document.getElementById("chatContacts");
            if (!contacts || !contacts.querySelector || !contacts.querySelector(".chat-empty--skeleton")) return;
            if (typeof window.__pokerKickChatContactsLoad === "function") {
              window.__pokerKickChatContactsLoad({ forceRerender: true });
            } else if (typeof window.__pokerReloadChatContacts === "function") {
              window.__pokerReloadChatContacts({ forceRerender: true });
            } else if (typeof window.chatShowDialogs === "function") {
              window.chatShowDialogs();
            }
          } catch (eChatContactsKick) {}
        }, delay);
      });
    } catch (eChatContactsKickSetup) {}
    try {
      pokerTryConsumePendingManagerFromCashout();
    } catch (eCashoutMgr) {}
    try {
      if (window.__pokerPushNeedsFullChatBootstrap) {
        pokerPushOpenStateDebug("setView-chat-full-bootstrap", "");
        window.__pokerPushNeedsFullChatBootstrap = false;
        try {
          window.__pokerContactsMetaPollRev = null;
          window.__pokerGeneralPollRev = "";
          window.__pokerPersonalPollRev = "";
        } catch (eChatBootstrapRevReset) {}
        setTimeout(function () {
          try {
            if (typeof loadContacts === "function") loadContacts();
          } catch (eChatBootstrapContacts) {}
          try {
            if (typeof loadGeneral === "function") loadGeneral();
          } catch (eChatBootstrapGeneral) {}
          try {
            if (typeof window.__pokerScheduleChatBootstrapFetch === "function") {
              window.__pokerScheduleChatBootstrapFetch();
            }
          } catch (eChatBootstrapFetch) {}
        }, 0);
      }
    } catch (eChatBootstrapWrap) {}
    try {
      if (window.__pendingOpenChatPersonalFromDeepLink) {
        var pendingAfterChatRefresh = window.__pendingOpenChatPersonalFromDeepLink;
        var pendingAfterChatPeer =
          pendingAfterChatRefresh && pendingAfterChatRefresh.userId != null
            ? String(pendingAfterChatRefresh.userId).trim()
            : "";
        if (pendingAfterChatPeer) {
          setTimeout(function () {
            try {
              pokerPushOpenStateDebug("setView-chat-post-refresh-open", pendingAfterChatPeer);
              if (
                window.__pendingOpenChatPersonalFromDeepLink &&
                typeof pokerOpenResolvedChatPeer === "function" &&
                pokerOpenResolvedChatPeer(
                  pendingAfterChatPeer,
                  pendingAfterChatRefresh.userName || pendingAfterChatPeer
                )
              ) {
                window.__pendingOpenChatPersonalFromDeepLink = null;
                return;
              }
              if (
                window.__pendingOpenChatPersonalFromDeepLink &&
                typeof pokerOpenPendingPushDmWithoutContacts === "function" &&
                pokerOpenPendingPushDmWithoutContacts(
                  pendingAfterChatPeer,
                  pendingAfterChatRefresh.userName || pendingAfterChatPeer
                )
              ) {
                pokerSchedulePendingPushDmContactsReload(
                  pendingAfterChatPeer,
                  pendingAfterChatRefresh.userName || pendingAfterChatPeer
                );
                return;
              }
              if (
                window.__pendingOpenChatPersonalFromDeepLink &&
                typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function"
              ) {
                if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function") {
                  window.__pokerEnsureOpenPendingChatPersonalFromDeepLink();
                }
              }
            } catch (eChatPostRefreshOpen) {}
          }, 0);
        }
      }
    } catch (eChatPostRefreshWrap) {}
  } else if (viewName === "winter-rating") {
    document.documentElement.classList.remove("app-view-chat", "app-view-home", "app-view-spring-rating");
    document.documentElement.classList.add("app-view-winter-rating");
  } else if (viewName === "spring-rating") {
    document.documentElement.classList.remove("app-view-chat", "app-view-home", "app-view-winter-rating");
    document.documentElement.classList.add("app-view-spring-rating");
  } else if (viewName === "home") {
    document.documentElement.classList.remove("app-view-chat", "app-view-winter-rating", "app-view-spring-rating");
    document.documentElement.classList.add("app-view-home");
    var ratingSection = document.getElementById("winterRatingSection");
    var winterView = document.querySelector('[data-view="winter-rating"]');
    var springPlaceholder = document.getElementById("springRatingSectionPlaceholder");
    if (ratingSection && ratingSection.classList.contains("spring-rating") && winterView && springPlaceholder && ratingSection.parentNode === springPlaceholder) {
      ratingSection.classList.remove("spring-rating");
      springPlaceholder.removeChild(ratingSection);
      winterView.appendChild(ratingSection);
    }
  } else {
    document.documentElement.classList.remove("app-view-chat", "app-view-winter-rating", "app-view-spring-rating", "app-view-home");
    var ratingSection = document.getElementById("winterRatingSection");
    var winterView = document.querySelector('[data-view="winter-rating"]');
    var springPlaceholder = document.getElementById("springRatingSectionPlaceholder");
    if (ratingSection && ratingSection.classList.contains("spring-rating") && winterView && springPlaceholder && ratingSection.parentNode === springPlaceholder) {
      ratingSection.classList.remove("spring-rating");
      springPlaceholder.removeChild(ratingSection);
      winterView.appendChild(ratingSection);
    }
  }
  document.documentElement.classList.toggle("app-view-browser-local", viewName !== "chat");
  /* Длинные экраны без :has() в CSS — часть WebView Telegram не крутит страницу; главную сюда не включать (ломает скролл). */
  var longScroll =
    viewName === "learn-play-hub" ||
    viewName === "poker-tasks" ||
    viewName === "hall-of-fame";
  document.documentElement.classList.toggle("app-view-long-scroll", longScroll);
  if (document.body) document.body.classList.toggle("app-view-long-scroll", longScroll);
  /* Видеоуроки: внутренний scrollport в .card__content (как профиль); класс app-view-video-lessons-html-scroll — см. styles.css */
  document.documentElement.classList.remove("app-view-vl-html-scroll");
  /* Зал славы: класс на html — внутренний scrollport в .card__content (как «Скачать»); раньше был scroll на <html>. */
  document.documentElement.classList.toggle("app-view-hall-html-scroll", viewName === "hall-of-fame");
  /* Скачать: scrollport в .card__content (локальный Chrome + TG); класс на html — цепочка высот/overflow */
  document.documentElement.classList.toggle("app-view-download-html-scroll", viewName === "download");
  /* Главная, депозит, рейтинг весны, профиль, видеоуроки: тот же внутренний scrollport в .card__content, что и у «Скачать». */
  document.documentElement.classList.toggle("app-view-home-html-scroll", viewName === "home");
  document.documentElement.classList.toggle("app-view-cashout-html-scroll", viewName === "cashout");
  document.documentElement.classList.toggle("app-view-spring-rating-html-scroll", viewName === "spring-rating");
  document.documentElement.classList.toggle("app-view-profile-html-scroll", viewName === "profile");
  document.documentElement.classList.toggle("app-view-video-lessons-html-scroll", viewName === "video-lessons");
  document.documentElement.classList.toggle("app-view-raffles-html-scroll", viewName === "raffles");
  var appEl = document.getElementById("app");
  if (appEl) appEl.classList.toggle("app--view-home", viewName === "home");
  try {
    if (typeof pokerApplyTelegramTopClearance === "function") pokerApplyTelegramTopClearance();
  } catch (eTgClear) {}
  if (viewName === "hall-of-fame") {
    var rafHall = window.requestAnimationFrame || function (fn) {
      setTimeout(fn, 16);
    };
    rafHall(function () {
      rafHall(function () {
        if (typeof showHallOfFamePanel === "function") showHallOfFamePanel("legends");
      });
    });
  }
  try {
    if (typeof trackLinkSessionEvent === "function") trackLinkSessionEvent("view:" + (viewName || "unknown"), "");
  } catch (eTrackView) {}
  if (viewName && viewName !== prevView) {
    try {
      if (typeof window.pokerRecordSectionViewOpen === "function") window.pokerRecordSectionViewOpen(viewName);
      if (typeof window.pokerAdminRefreshSectionViewsDebounced === "function") window.pokerAdminRefreshSectionViewsDebounced();
    } catch (eSecView) {}
  }
  /* С верха при обычной навигации; по «Назад» — восстанавливаем сохранённый Y (после смены классов на html/body). */
  if (viewName !== prevView) {
    var rafScroll = window.requestAnimationFrame || function (fn) {
      setTimeout(fn, 16);
    };
    if (restoreScrollOnEnter && Object.prototype.hasOwnProperty.call(viewScrollMemory, viewName)) {
      var yBack = viewScrollMemory[viewName];
      rafScroll(function () {
        setMainDocumentScrollY(yBack);
        rafScroll(function () {
          setMainDocumentScrollY(yBack);
        });
      });
      setTimeout(function () {
        setMainDocumentScrollY(yBack);
      }, 0);
      setTimeout(function () {
        setMainDocumentScrollY(yBack);
      }, 50);
      setTimeout(function () {
        setMainDocumentScrollY(yBack);
      }, 120);
    } else {
      scrollMainDocumentToTop();
      /* Чат: только синхронный сброс — повторный rAF доводил окно и давал «вверх—вниз» в первые сотни мс вместе с лентой. */
      if (viewName !== "chat") {
        rafScroll(function () {
          scrollMainDocumentToTop();
        });
        setTimeout(scrollMainDocumentToTop, 0);
        setTimeout(scrollMainDocumentToTop, 50);
      }
    }
  }
  try {
    pokerApplyBottomTabbarPad();
    if (viewName === "home") {
      var rafBtp = window.requestAnimationFrame || function (fn) {
        setTimeout(fn, 16);
      };
      rafBtp(function () {
        rafBtp(function () {
          if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
        });
      });
      setTimeout(function () {
        if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
      }, 150);
    }
  } catch (eBtpSetView) {}
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

navItems.forEach(function (item) {
  item.addEventListener("click", function (e) {
    if (window.__touchWasScroll && window.__touchWasScroll()) {
      e.preventDefault();
      return;
    }
    var target = item.dataset.viewTarget;
    if (target) {
      setView(target);
      if (target === "download") setDownloadPage("main");
    }
  });
});

document.addEventListener("click", function (e) {
  var interactive = e.target.closest("button, a[href], .feature--link, .home-mini-icon-item, .hero__link, .bottom-nav__item, [data-view-target], .feature, [role=\"button\"]");
  if (interactive && !e.target.closest("audio, [aria-hidden=\"true\"]")) playClickSound();
}, true);

(function scrollVsTap() {
  var touchStartX = 0;
  var touchStartY = 0;
  var touchMoved = false;
  var scrollThreshold = 12;
  document.addEventListener("touchstart", function (e) {
    if (e.touches.length) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchMoved = false;
    }
  }, { passive: true });
  document.addEventListener("touchmove", function (e) {
    if (e.touches.length && !touchMoved) {
      var dx = e.touches[0].clientX - touchStartX;
      var dy = e.touches[0].clientY - touchStartY;
      if (Math.abs(dx) > scrollThreshold || Math.abs(dy) > scrollThreshold) touchMoved = true;
    }
  }, { passive: true });
  window.__touchWasScroll = function () { return touchMoved; };
  document.addEventListener("touchend", function () {
    setTimeout(function () { touchMoved = false; }, 0);
  }, { passive: true });
})();

var viewHandledInTouchend = false;

/** Клик по UI голоса в чате: <audio class="chat-msg__voice"> (в т.ч. кнопка play внутри UA shadow) или обёртка .chat-msg__voice-wrap. */
function pokerEventPathHasChatVoiceUi(e) {
  try {
    if (e && e.target && e.target.closest) {
      if (e.target.closest(".chat-msg__voice-wrap")) return true;
      if (e.target.closest("audio.chat-msg__voice")) return true;
    }
  } catch (e0) {}
  try {
    var path = typeof e.composedPath === "function" ? e.composedPath() : [];
    for (var i = 0; i < path.length; i++) {
      var n = path[i];
      if (!n || !n.nodeName) continue;
      if (n.nodeName === "AUDIO" && n.classList && n.classList.contains("chat-msg__voice")) return true;
      if (n.classList && n.classList.contains("chat-msg__voice-wrap")) return true;
    }
  } catch (e1) {}
  return false;
}

function handleViewLinkClick(e) {
  if (e.target && e.target.closest && e.target.closest("#chatDialogsView")) return;
  if (pokerEventPathHasChatVoiceUi(e)) return;
  var hallTop15Link = e.target.closest("a[data-hall-top15]");
  if (hallTop15Link) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof navigateToHallFameBlogTop15 === "function") navigateToHallFameBlogTop15();
    return;
  }
  if (viewHandledInTouchend) {
    viewHandledInTouchend = false;
    e.preventDefault();
    return;
  }
  var hallSubEarly = e.target.closest(".hall-of-fame__subtab[data-hall-section]");
  if (hallSubEarly) {
    e.preventDefault();
    e.stopPropagation();
    var secEarly = hallSubEarly.getAttribute("data-hall-section");
    if (secEarly && typeof showHallOfFamePanel === "function") {
      showHallOfFamePanel(secEarly, { activeSubtabBtn: hallSubEarly });
    }
    return;
  }
  if (window.__touchWasScroll && window.__touchWasScroll()) {
    e.preventDefault();
    return;
  }
  var spring2024Btn = e.target.closest("#springRating2024InfoBtn");
  if (spring2024Btn) {
    e.preventDefault();
    e.stopPropagation();
    openSpringRating2024Modal();
    return;
  }
  var summer2024Btn = e.target.closest("#summerRating2024InfoBtn");
  if (summer2024Btn) {
    e.preventDefault();
    e.stopPropagation();
    openSummerRating2024Modal();
    return;
  }
  var summer2025Btn = e.target.closest("#summerRating2025InfoBtn");
  if (summer2025Btn) {
    e.preventDefault();
    e.stopPropagation();
    openSummerRating2025Modal();
    return;
  }
  var autumn2025Btn = e.target.closest("#autumnRating2025InfoBtn");
  if (autumn2025Btn) {
    e.preventDefault();
    e.stopPropagation();
    openAutumnRating2025Modal();
    return;
  }
  var springBtn = e.target.closest("#springRatingInfoBtn");
  if (springBtn) {
    e.preventDefault();
    e.stopPropagation();
    openSpringRatingInfoModal();
    return;
  }
  var backBtn = e.target.closest(".bonus-game-back[data-view-target]");
  if (backBtn) {
    e.preventDefault();
    e.stopPropagation();
    var target = backBtn.getAttribute("data-view-target");
    if (target) setView(target, { fromBack: true });
    return;
  }
  var link = e.target.closest("a[data-view-target]");
  if (!link || link.getAttribute("data-download-page")) return;
  e.preventDefault();
  var view = link.getAttribute("data-view-target");
  if (view) setView(view);
}

document.addEventListener("click", handleViewLinkClick);

/* Зал славы: mousedown по подвкладке без preventDefault даёт фокус кнопке → WebKit скроллит к табам. */
document.addEventListener("mousedown", function (e) {
  var sub = e.target && e.target.closest && e.target.closest(".hall-of-fame__subtab[data-hall-section]");
  if (!sub || e.button !== 0) return;
  e.preventDefault();
}, true);

document.addEventListener("touchend", function (e) {
  var top15 = e.target.closest("a[data-hall-top15]");
  if (top15) {
    if (window.__touchWasScroll && window.__touchWasScroll()) return;
    e.preventDefault();
    viewHandledInTouchend = true;
    if (typeof navigateToHallFameBlogTop15 === "function") navigateToHallFameBlogTop15();
    return;
  }
  var link = e.target.closest("a[data-view-target]");
  if (!link || link.getAttribute("data-download-page")) return;
  if (window.__touchWasScroll && window.__touchWasScroll()) return;
  e.preventDefault();
  var view = link.getAttribute("data-view-target");
  if (view) {
    viewHandledInTouchend = true;
    setView(view);
  }
}, { passive: false });

document.addEventListener("click", function (e) {
  var link = e.target.closest("[data-view-target][data-download-page]");
  if (!link) return;
  e.preventDefault();
  var view = link.getAttribute("data-view-target");
  var page = link.getAttribute("data-download-page");
  if (view) setView(view);
  if (page) setDownloadPage(page);
});

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
// Чат: общий + личные сообщения

var chatPollInterval = null;
var chatIsEditingMessage = false;
window.chatGeneralUnread = false;
window.chatPersonalUnread = false;
var chatWithUserId = null;
var chatWithUserPokerPlusVerified = false;
/** Один кадр перед сетью — достаточно для отрисовки optimistic-пузыря; два кадра добавляли лишнюю микрозадержку. */
function pokerChatRunAfterPaint(fn) {
  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(fn);
  } else {
    setTimeout(fn, 0);
  }
}
var personalMessagesCache = {};
var personalMessagesCacheMeta = {};
var personalHasMoreBeforeByPeer = {};
var generalHasMoreBefore = false;
var chatWithUserName = null;
var chatWithPeerAvatarUrl = null;
/* "dialogs" = список чатов; иначе loadGeneral() перерисовывал скрытый общий чат и сбрасывал scroll */
var chatActiveTab = "dialogs";
var chatIsAdmin = false;
/** Доступ к главному чату: open | member | pending | need_apply (с сервера) */
var clubChatAccess = "open";
/** Для админа: сколько заявок в очереди (бейдж у «Главный чат») */
window.chatClubPendingReviewCount = 0;
var chatClubAdminLongPressTimer = null;
var chatListenersAttached = false;

function initChat() {
  var dialogsView = document.getElementById("chatDialogsView");
  var dialogsGuestGate = document.getElementById("chatDialogsGuestGate");
  var dialogsGuestAuthBtn = document.getElementById("chatDialogsGuestAuthBtn");
  var dialogsPrimaryBlock = document.getElementById("chatDialogsPrimaryBlock");
  var generalView = document.getElementById("chatGeneralView");
  var personalView = document.getElementById("chatPersonalView");
  var adminsView = document.getElementById("chatAdminsView");
  var generalMessages = document.getElementById("chatGeneralMessages");
  var chatSharedComposerEl = document.getElementById("chatSharedComposer");
  var chatComposerEl = chatSharedComposerEl;
  var chatGeneralComposerMount = document.getElementById("chatGeneralComposerMount");
  var chatPersonalComposerMount = document.getElementById("chatPersonalComposerMount");
  var chatComposerPool = document.getElementById("chatComposerPool");
  var chatGeneralInputArea = document.getElementById("chatGeneralInputArea");
  var chatPersonalInputArea = document.getElementById("chatPersonalInputArea");
  var chatGeneralComposerEl = null;
  var chatPersonalComposerEl = null;
  var chatKeyboardDebugLog = [];
  var chatKeyboardDebugPanel = null;
  var chatKeyboardDebugObserver = null;
  var chatKeyboardDebugFocusBound = false;
  var chatKeyboardDebugTickerStarted = false;
  var chatKeyboardDebugLastSnapshotKey = "";
  var chatGeneralKeyboardDebugEl = document.getElementById("chatGeneralKeyboardDebug");
  var chatPersonalKeyboardDebugEl = document.getElementById("chatPersonalKeyboardDebug");
  function ensureChatKeyboardDebugFloatingPanel() {
    return null;
  }
  var chatIosComposeOverlay = document.getElementById("chatIosComposeOverlay");
  var chatIosComposeOverlayBackdrop = document.getElementById("chatIosComposeOverlayBackdrop");
  var chatIosComposeOverlayClose = document.getElementById("chatIosComposeOverlayClose");
  var chatIosComposeOverlayCancel = document.getElementById("chatIosComposeOverlayCancel");
  var chatIosComposeOverlaySend = document.getElementById("chatIosComposeOverlaySend");
  var chatIosComposeOverlayTextarea = document.getElementById("chatIosComposeOverlayTextarea");
  var chatIosComposeOverlayTitle = document.getElementById("chatIosComposeOverlayTitle");
  var chatIosComposeOverlayMode = "";
  var chatIosComposeOverlayOpening = false;
  var chatComposerDrafts = { general: "", personal: "" };
  var chatComposerMounted = "detached";
  var chatTmaIosComposerOverlayHost = null;
  var chatTmaIosComposerOverlaySyncQueued = false;
  var chatTmaIosComposerOverlayActiveKey = null;
  var chatTmaIosComposerOverlayViewportHandler = null;
  var chatTmaIosComposerOverlayViewportRaf = null;
  var chatTmaIosComposerOverlayLastTop = null;
  var chatTmaIosComposerOverlayLastInnerHeight = 0;
  var chatTmaIosComposerPortalStates = {
    general: chatGeneralInputArea
      ? { key: "general", area: chatGeneralInputArea, spacer: null, portaled: false }
      : null,
    personal: chatPersonalInputArea
      ? { key: "personal", area: chatPersonalInputArea, spacer: null, portaled: false }
      : null
  };
  var generalSendBtn = document.getElementById("chatGeneralSendBtn");
  var listView = document.getElementById("chatListView");
  var convView = document.getElementById("chatConvView");
  var contactsEl = document.getElementById("chatContacts");
  var findByIdInput = document.getElementById("chatFindByIdInput");
  var findByIdBtn = document.getElementById("chatFindByIdBtn");
  var findByIdInputDialogs = document.getElementById("chatFindByIdInputDialogs");
  var chatNewGroupBtn = document.getElementById("chatNewGroupBtn");
  var backBtn = document.getElementById("chatBackBtn");
  var chatGeneralBackBtn = document.getElementById("chatGeneralBackBtn");
  var chatDialogClub = document.getElementById("chatDialogClub");
  var convTitle = document.getElementById("chatConvTitle");
  var convTitleFish = document.getElementById("chatConvTitleFish");
  var convTitleId = document.getElementById("chatConvTitleId");
  var convVerifiedBadge = document.getElementById("chatConvVerifiedBadge");
  var convGroupDescEl = document.getElementById("chatConvGroupDesc");
  /** Описание группы не дублируем под шапкой чата — только в модалке «Информация о группе». */
  function applyConvGroupDescription() {
    if (!convGroupDescEl) return;
    convGroupDescEl.textContent = "";
    convGroupDescEl.classList.add("chat-conv-group-desc--hidden");
    convGroupDescEl.setAttribute("aria-hidden", "true");
  }
  function setChatConvTitleFish(level) {
    if (!convTitleFish) return;
    var fishLevel = level != null && level !== "" ? pokerProfileStatusFishLevel(level) : 0;
    if (!fishLevel) {
      convTitleFish.hidden = true;
      convTitleFish.removeAttribute("src");
      convTitleFish.removeAttribute("data-status-fish-level");
      return;
    }
    convTitleFish.src = pokerProfileStatusFishSrc(fishLevel);
    convTitleFish.setAttribute("data-status-fish-level", String(fishLevel));
    convTitleFish.hidden = false;
  }
  function syncChatConvTitleMetaVisibility() {
    var wrap = convTitleId && convTitleId.closest ? convTitleId.closest(".chat-conv-peer-title-chip__id") : null;
    if (!wrap) return;
    var hasId = !!(convTitleId && String(convTitleId.textContent || "").trim());
    var hasVerified = !!(convVerifiedBadge && !convVerifiedBadge.classList.contains("chat-verified-badge--hidden"));
    wrap.hidden = !(hasId || hasVerified);
  }
  function setChatConvTitleIdText(value) {
    if (!convTitleId) return;
    var clean = value != null ? String(value).trim() : "";
    setTextContentIfChanged(convTitleId, clean);
    syncChatConvTitleMetaVisibility();
  }
  var convPeerAvatar = document.getElementById("chatConvPeerAvatar");
  var convPeerAvatarPh = document.getElementById("chatConvPeerAvatarPh");
  var convPeerAvatarWrap = document.getElementById("chatConvPeerAvatarWrap");
  var convGroupAvatarFile = document.getElementById("chatConvGroupAvatarFile");
  var convGroupCanChangeAvatar = false;
  function setChatPeerVerified(on) {
    chatWithUserPokerPlusVerified = !!on;
    if (convVerifiedBadge) convVerifiedBadge.classList.toggle("chat-verified-badge--hidden", !chatWithUserPokerPlusVerified);
    syncChatConvTitleMetaVisibility();
  }
  function getInlineChatHeaderTopOffsetPx() {
    try {
      var root = document.documentElement;
      if (
        root &&
        root.classList &&
        (root.classList.contains("poker-ios-pwa") || root.classList.contains("poker-android-pwa"))
      ) {
        return "0px";
      }
    } catch (ePwaHeaderClassTop) {}
    try {
      if (typeof isPwaStandaloneMode === "function" && isPwaStandaloneMode()) return "0px";
    } catch (ePwaHeadTop) {}
    try {
      if (typeof window.__pokerIsChatPhysicalKeyboardContext === "function" && window.__pokerIsChatPhysicalKeyboardContext()) {
        return "0px";
      }
    } catch (eDeskHeadTop) {}
    return "50px";
  }
  function syncConvGroupAvatarEditUi() {
    if (!convPeerAvatarWrap) return;
    var on = !!(
      convGroupCanChangeAvatar &&
      chatWithUserId &&
      String(chatWithUserId).indexOf("group_") === 0
    );
    convPeerAvatarWrap.classList.toggle("chat-conv-peer-avatar-wrap--editable", on);
    if (on) {
      convPeerAvatarWrap.setAttribute("aria-hidden", "false");
      convPeerAvatarWrap.setAttribute("aria-label", "Сменить аватар группы");
      convPeerAvatarWrap.setAttribute("role", "button");
      convPeerAvatarWrap.setAttribute("tabindex", "0");
    } else {
      convPeerAvatarWrap.setAttribute("aria-hidden", "true");
      convPeerAvatarWrap.removeAttribute("aria-label");
      convPeerAvatarWrap.setAttribute("role", "presentation");
      convPeerAvatarWrap.setAttribute("tabindex", "-1");
    }
  }
  function applyConvPeerAvatarHeader(url, displayName) {
    if (!convPeerAvatar || !convPeerAvatarPh) return;
    var nm = displayName != null && String(displayName).trim() ? String(displayName).trim() : "";
    convPeerAvatarPh.textContent = nm ? nm.charAt(0) : "?";
    var u = url != null && String(url).trim() ? String(url).trim() : "";
    convPeerAvatar.onload = null;
    convPeerAvatar.onerror = null;
    if (!u) {
      convPeerAvatar.removeAttribute("src");
      try {
        convPeerAvatar.removeAttribute("fetchpriority");
      } catch (eRmFp) {}
      convPeerAvatar.classList.add("chat-conv-peer-avatar--hidden");
      convPeerAvatarPh.classList.remove("chat-conv-peer-avatar--hidden");
      convPeerAvatar.alt = "";
      return;
    }
    convPeerAvatar.alt = nm || "";
    try {
      convPeerAvatar.setAttribute("decoding", "async");
      convPeerAvatar.setAttribute("fetchpriority", "high");
    } catch (eFp) {}
    convPeerAvatar.onload = function () {
      convPeerAvatar.classList.remove("chat-conv-peer-avatar--hidden");
      convPeerAvatarPh.classList.add("chat-conv-peer-avatar--hidden");
    };
    convPeerAvatar.onerror = function () {
      convPeerAvatar.classList.add("chat-conv-peer-avatar--hidden");
      convPeerAvatarPh.classList.remove("chat-conv-peer-avatar--hidden");
    };
    convPeerAvatar.src = u;
    if (convPeerAvatar.complete) {
      if (convPeerAvatar.naturalWidth > 0) convPeerAvatar.onload();
      else convPeerAvatar.onerror();
    }
  }
  function clearConvPeerAvatarHeader() {
    chatWithPeerAvatarUrl = null;
    convGroupCanChangeAvatar = false;
    syncConvGroupAvatarEditUi();
    applyConvPeerAvatarHeader("", "");
    applyConvGroupDescription("");
  }
  function isWebsiteGuestChatGateMode() {
    var isTelegramMini = !!(window.Telegram && window.Telegram.WebApp);
    if (isTelegramMini) return false;
    var hasSession = !!(pokerReadPwaTgSessionToken() || pokerReadPwaVkSessionToken());
    var isPwaGuest = false;
    try {
      isPwaGuest = !!pokerReadPwaGuestMode();
    } catch (ePwaGuestChat) {}
    var isPwaLike = false;
    try {
      isPwaLike =
        !!(
          document.documentElement &&
          document.documentElement.classList &&
          (document.documentElement.classList.contains("poker-ios-pwa") ||
            document.documentElement.classList.contains("poker-android-pwa"))
        );
    } catch (ePwaLikeChat) {}
    var hasTelegramIdentity = false;
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
        hasTelegramIdentity = true;
      }
    } catch (eResolvedChatUser) {}
    try {
      if (!hasTelegramIdentity) {
        var tgChat = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        var tgUser = tgChat && tgChat.initDataUnsafe ? tgChat.initDataUnsafe.user : null;
        if (
          tgUser &&
          ((tgUser.username && String(tgUser.username).trim()) ||
            (tgUser.first_name && String(tgUser.first_name).trim()) ||
            (tgUser.last_name && String(tgUser.last_name).trim()))
        ) {
          hasTelegramIdentity = true;
        }
      }
    } catch (eTelegramChatUser) {}
    var isStandaloneMode =
      (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      window.navigator.standalone === true ||
      document.referrer.indexOf("android-app://") === 0;
    return !hasSession && !hasTelegramIdentity && !isStandaloneMode && !isPwaGuest && !isPwaLike;
  }
  function forceHideChatGuestGateForTelegram() {
    var isTelegramMini = !!(window.Telegram && window.Telegram.WebApp);
    if (!isTelegramMini) return false;
    var isGuestTelegram = false;
    try {
      isGuestTelegram = typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode();
    } catch (eGuestTelegram) {}
    if (isGuestTelegram) return false;
    try {
      if (dialogsGuestGate) {
        dialogsGuestGate.hidden = true;
        dialogsGuestGate.style.display = "none";
        if (dialogsGuestGate.parentNode) dialogsGuestGate.parentNode.removeChild(dialogsGuestGate);
        dialogsGuestGate = null;
      }
    } catch (eDlgGateHide) {}
    try {
      if (contactsEl) {
        var guestBlocks = contactsEl.querySelectorAll(".chat-guest-cta");
        var i;
        for (i = 0; i < guestBlocks.length; i++) {
          guestBlocks[i].hidden = true;
          guestBlocks[i].style.display = "none";
          if (guestBlocks[i].parentNode) guestBlocks[i].parentNode.removeChild(guestBlocks[i]);
        }
      }
    } catch (eContactsGateHide) {}
    return true;
  }
  function syncChatWebsiteGuestGate() {
    if (forceHideChatGuestGateForTelegram()) return false;
    var isPwaGuest = false;
    try {
      isPwaGuest = typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode();
    } catch (eChatPwaGuestMode) {}
    var guestMode = isWebsiteGuestChatGateMode();
    var contactsFilter = document.getElementById("chatContactsFilter");
    var findWrap = findByIdInputDialogs ? findByIdInputDialogs.closest(".chat-find-by-id") : null;
    if (isPwaGuest) {
      if (dialogsGuestGate) dialogsGuestGate.hidden = true;
      if (dialogsPrimaryBlock) dialogsPrimaryBlock.classList.remove("profile-guest-hidden");
      if (contactsFilter) contactsFilter.classList.remove("profile-guest-hidden");
      if (contactsEl) contactsEl.classList.remove("profile-guest-hidden");
      if (findWrap) findWrap.classList.remove("profile-guest-hidden");
      if (chatNewGroupBtn) chatNewGroupBtn.classList.remove("profile-guest-hidden");
      return false;
    }
    if (dialogsGuestGate) dialogsGuestGate.hidden = !guestMode;
    if (dialogsPrimaryBlock) dialogsPrimaryBlock.classList.toggle("profile-guest-hidden", guestMode);
    if (contactsFilter) contactsFilter.classList.toggle("profile-guest-hidden", guestMode);
    if (contactsEl) contactsEl.classList.toggle("profile-guest-hidden", guestMode);
    if (findWrap) findWrap.classList.toggle("profile-guest-hidden", guestMode);
    if (chatNewGroupBtn) chatNewGroupBtn.classList.toggle("profile-guest-hidden", guestMode);
    if (!guestMode) return false;
    if (contactsEl) {
      contactsEl.innerHTML = "";
    }
    return true;
  }
  if (dialogsGuestAuthBtn && dialogsGuestAuthBtn.dataset.bound !== "1") {
    dialogsGuestAuthBtn.dataset.bound = "1";
    dialogsGuestAuthBtn.addEventListener("click", function () {
      if (typeof window.__pokerOpenSiteHomeInstructionModal === "function") {
        window.__pokerOpenSiteHomeInstructionModal();
      }
    });
  }
  try {
    syncChatWebsiteGuestGate();
  } catch (eGuestGateInit) {}
  var messagesEl = document.getElementById("chatMessages");
  var sendBtn = document.getElementById("chatSendBtn");
  var switcherBtn = document.getElementById("chatSwitcherBtn");
  var switcherDropdown = document.getElementById("chatSwitcherDropdown");
  var switcherLabel = document.getElementById("chatSwitcherLabel");
  var switcherOptions = document.querySelectorAll(".chat-switcher-option");
  var templatesHintGeneral = document.getElementById("chatTemplatesHintGeneral");
  var templatesHintPersonal = document.getElementById("chatTemplatesHintPersonal");
  if (!generalView || !personalView || !generalMessages) return;
  if (!chatComposerEl || !chatGeneralComposerMount || !chatPersonalComposerMount || !chatComposerPool) return;
  function shouldShowChatKeyboardDebugPanel() {
    return false;
  }
  function isChatKeyboardDebugTarget(node) {
    try {
      if (!node || !node.closest) return false;
      return !!node.closest(
        ".chat-input-area, .chat-input-wrap, .chat-tma-ios-minimal-block, .chat-messages, .chat-messages-wrap, .chat-general-view, .chat-conv-view, .chat-container"
      );
    } catch (eDbgTarget) {
      return false;
    }
  }
  function getChatKeyboardDebugNodeLabel(node) {
    try {
      if (!node) return "none";
      var id = node.id ? "#" + node.id : "";
      var cls = "";
      if (node.classList && node.classList.length) cls = "." + Array.prototype.slice.call(node.classList, 0, 3).join(".");
      return String((node.tagName || "node").toLowerCase()) + id + cls;
    } catch (eDbgLabel) {
      return "node";
    }
  }
  function getChatKeyboardDebugRenderedInfo(area, wrap, ta, msgs) {
    try {
      var areaRect = area && area.getBoundingClientRect ? area.getBoundingClientRect() : null;
      var wrapRect = wrap && wrap.getBoundingClientRect ? wrap.getBoundingClientRect() : null;
      var taRect = ta && ta.getBoundingClientRect ? ta.getBoundingClientRect() : null;
      var msgsRect = msgs && msgs.getBoundingClientRect ? msgs.getBoundingClientRect() : null;
      return {
        areaTop: areaRect ? Math.round(areaRect.top) : 0,
        areaH: areaRect ? Math.round(areaRect.height) : 0,
        wrapTop: wrapRect ? Math.round(wrapRect.top) : 0,
        wrapH: wrapRect ? Math.round(wrapRect.height) : 0,
        taTop: taRect ? Math.round(taRect.top) : 0,
        taH: taRect ? Math.round(taRect.height) : 0,
        msgsTop: msgsRect ? Math.round(msgsRect.top) : 0,
        msgsH: msgsRect ? Math.round(msgsRect.height) : 0,
        msgPad: msgs && msgs.style ? String(msgs.style.paddingBottom || "") : "",
        msgScroll: msgs ? Math.round(msgs.scrollTop || 0) : 0,
        msgScrollH: msgs ? Math.round(msgs.scrollHeight || 0) : 0,
        msgClientH: msgs ? Math.round(msgs.clientHeight || 0) : 0,
        areaPos: area ? String(getComputedStyle(area).position || "") : "",
        areaBottom: area ? String(getComputedStyle(area).bottom || "") : "",
        areaTransform: area ? String(getComputedStyle(area).transform || "") : "",
        areaDisplay: area ? String(getComputedStyle(area).display || "") : "",
        areaVis: area ? String(getComputedStyle(area).visibility || "") : "",
        taBottom: taRect ? Math.round(taRect.bottom) : 0
      };
    } catch (eDbgGeom) {
      return null;
    }
  }
  function getActiveChatInputArea() {
    if (chatActiveTab === "general" && generalView && !generalView.classList.contains("chat-general-view--hidden")) {
      return chatGeneralInputArea || null;
    }
    if (chatActiveTab === "personal" && convView && !convView.classList.contains("chat-conv-view--hidden")) {
      return chatPersonalInputArea || null;
    }
    return null;
  }
  function getChatKeyboardDebugSnapshot() {
    try {
      var area = getActiveChatInputArea();
      if (!area) {
        area =
          (chatGeneralInputArea && !chatGeneralInputArea.closest(".chat-general-view--hidden") && chatGeneralInputArea) ||
          (chatPersonalInputArea && !chatPersonalInputArea.closest(".chat-conv-view--hidden") && chatPersonalInputArea) ||
          chatGeneralInputArea ||
          chatPersonalInputArea ||
          null;
      }
      var wrap = area && area.querySelector ? area.querySelector(".chat-input-wrap, .chat-tma-ios-minimal-block") : null;
      var ta =
        (area && area.querySelector ? area.querySelector("textarea") : null) ||
        chatGeneralComposerEl ||
        chatPersonalComposerEl ||
        chatComposerEl ||
        null;
      var msgs = null;
      if (area && area === chatGeneralInputArea) msgs = generalMessages || null;
      else if (area && area === chatPersonalInputArea) msgs = messagesEl || null;
      else if (getVisibleMessagesEl && typeof getVisibleMessagesEl === "function") msgs = getVisibleMessagesEl() || null;
      var vv = window.visualViewport || null;
      var tw = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      var active = document.activeElement || null;
      var appEl = document.getElementById("app");
      var appRect = appEl && appEl.getBoundingClientRect ? appEl.getBoundingClientRect() : null;
      var bodyRect = document.body && document.body.getBoundingClientRect ? document.body.getBoundingClientRect() : null;
      var docRect = document.documentElement && document.documentElement.getBoundingClientRect ? document.documentElement.getBoundingClientRect() : null;
      var container =
        area && area.closest
          ? area.closest(".chat-container, .chat-general-view, .chat-dialogs-view")
          : null;
      var containerRect = container && container.getBoundingClientRect ? container.getBoundingClientRect() : null;
      var safeBottom = 0;
      try {
        var rootStyle = window.getComputedStyle ? getComputedStyle(document.documentElement) : null;
        safeBottom = Math.round(parseFloat(rootStyle && rootStyle.getPropertyValue("--chat-safe-area-bottom")) || 0);
      } catch (eDbgSafe) {}
      var geom = getChatKeyboardDebugRenderedInfo(area, wrap, ta, msgs) || {};
      return {
        ih: window.innerHeight || 0,
        iw: window.innerWidth || 0,
        vvh: vv ? Math.round(Number(vv.height) || 0) : 0,
        vvTop: vv ? Math.round(Number(vv.offsetTop) || 0) : 0,
        vvPageTop: vv ? Math.round(Number(vv.pageTop) || 0) : 0,
        tgVh: tw ? Math.round(Number(tw.viewportHeight) || 0) : 0,
        tgVs: tw ? Math.round(Number(tw.viewportStableHeight) || 0) : 0,
        appTop: appRect ? Math.round(appRect.top) : 0,
        appH: appRect ? Math.round(appRect.height) : 0,
        bodyTop: bodyRect ? Math.round(bodyRect.top) : 0,
        bodyH: bodyRect ? Math.round(bodyRect.height) : 0,
        docTop: docRect ? Math.round(docRect.top) : 0,
        docH: docRect ? Math.round(docRect.height) : 0,
        contTop: containerRect ? Math.round(containerRect.top) : 0,
        contH: containerRect ? Math.round(containerRect.height) : 0,
        areaTop: geom.areaTop || 0,
        areaH: geom.areaH || 0,
        wrapTop: geom.wrapTop || 0,
        wrapH: geom.wrapH || 0,
        msgsTop: geom.msgsTop || 0,
        msgsH: geom.msgsH || 0,
        taTop: geom.taTop || 0,
        taH: geom.taH || 0,
        taBottom: geom.taBottom || 0,
        msgPad: geom.msgPad || "",
        msgScroll: geom.msgScroll || 0,
        msgScrollH: geom.msgScrollH || 0,
        msgClientH: geom.msgClientH || 0,
        areaPos: geom.areaPos || "",
        areaBottom: geom.areaBottom || "",
        areaTransform: geom.areaTransform || "",
        areaDisplay: geom.areaDisplay || "",
        areaVis: geom.areaVis || "",
        safeBottom: safeBottom,
        winY: Math.round(window.scrollY || 0),
        active: getChatKeyboardDebugNodeLabel(active),
        areaNode: getChatKeyboardDebugNodeLabel(area),
        containerNode: getChatKeyboardDebugNodeLabel(container),
        wrapNode: getChatKeyboardDebugNodeLabel(wrap),
        taNode: getChatKeyboardDebugNodeLabel(ta),
        htmlKb: document.documentElement.classList.contains("chat-keyboard-open") ? 1 : 0,
        bodyKb: document.body.classList.contains("chat-keyboard-open") ? 1 : 0
      };
    } catch (eDbgSnap) {
      return null;
    }
  }
  function renderChatKeyboardDebugPanel() {
    if (!shouldShowChatKeyboardDebugPanel()) return;
    var snap = getChatKeyboardDebugSnapshot();
    var tail = chatKeyboardDebugLog.slice(-6);
    var lines = [];
    if (snap) {
      lines.push(
        "ih:" + snap.ih + " iw:" + snap.iw +
          " vv:" + snap.vvh + "/" + snap.vvTop + "/" + snap.vvPageTop +
          " tg:" + snap.tgVh + "/" + snap.tgVs
      );
      lines.push(
        "app:" + snap.appTop + "+" + snap.appH +
          " body:" + snap.bodyTop + "+" + snap.bodyH +
          " doc:" + snap.docTop + "+" + snap.docH
      );
      lines.push(
        "cont:" + snap.contTop + "+" + snap.contH +
        " msgs:" + snap.msgsTop + "+" + snap.msgsH +
        " area:" + snap.areaTop + "+" + snap.areaH +
          " wrap:" + snap.wrapTop + "+" + snap.wrapH +
          " ta:" + snap.taTop + "+" + snap.taH + "/" + snap.taBottom
      );
      lines.push(
        "pos:" + snap.areaPos +
          " bottom:" + snap.areaBottom +
          " pad:" + snap.msgPad +
          " scr:" + snap.msgScroll + "/" + snap.msgScrollH + "/" + snap.msgClientH +
          " winY:" + snap.winY
      );
      lines.push(
        "tr:" + snap.areaTransform +
          " dsp:" + snap.areaDisplay +
          " vis:" + snap.areaVis +
          " kb:" + snap.htmlKb + "/" + snap.bodyKb +
          " safe:" + snap.safeBottom
      );
      lines.push(
        "act:" + snap.active
      );
      lines.push(
        "areaN:" + snap.areaNode
      );
      lines.push(
        "contN:" + snap.containerNode
      );
    }
    tail.forEach(function (item) {
      lines.push(item);
    });
    var floatingPanel = ensureChatKeyboardDebugFloatingPanel();
    if (floatingPanel) {
      floatingPanel.textContent = lines.join("\n");
      floatingPanel.hidden = false;
      floatingPanel.setAttribute("aria-hidden", "false");
    }
    [chatGeneralKeyboardDebugEl, chatPersonalKeyboardDebugEl].forEach(function (panel) {
      if (!panel) return;
      panel.hidden = false;
      panel.setAttribute("aria-hidden", "false");
      panel.textContent = lines.join("\n");
    });
  }
  function logChatKeyboardDebug(source, extra) {
    if (!shouldShowChatKeyboardDebugPanel()) return;
    try {
      var snap = getChatKeyboardDebugSnapshot() || {};
      var line =
        String(source || "evt") +
        " ih=" + (snap.ih || 0) +
        " vv=" + (snap.vvh || 0) + "/" + (snap.vvTop || 0) +
        " area=" + (snap.areaTop || 0) + "+" + (snap.areaH || 0) +
        " ta=" + (snap.taTop || 0) + "+" + (snap.taH || 0);
      if (extra) line += " " + extra;
      chatKeyboardDebugLog.push(line);
      if (chatKeyboardDebugLog.length > 40) chatKeyboardDebugLog = chatKeyboardDebugLog.slice(-40);
    } catch (eDbgLog) {}
    renderChatKeyboardDebugPanel();
  }
  function pumpChatKeyboardDebugSnapshot(source) {
    if (!shouldShowChatKeyboardDebugPanel()) return;
    try {
      var snap = getChatKeyboardDebugSnapshot();
      if (!snap) return;
      var key = [
        snap.ih,
        snap.vvh,
        snap.vvTop,
        snap.tgVh,
        snap.tgVs,
        snap.areaTop,
        snap.areaH,
        snap.wrapTop,
        snap.wrapH,
        snap.taTop,
        snap.taH,
        snap.msgPad,
        snap.msgScroll,
        snap.areaPos,
        snap.areaBottom,
        snap.areaTransform,
        snap.active,
        snap.areaNode
      ].join("|");
      if (key !== chatKeyboardDebugLastSnapshotKey) {
        chatKeyboardDebugLastSnapshotKey = key;
        chatKeyboardDebugLog.push(
          String(source || "tick") +
            " ih=" + snap.ih +
            " vv=" + snap.vvh + "/" + snap.vvTop +
            " area=" + snap.areaTop + "+" + snap.areaH +
            " ta=" + snap.taTop + "+" + snap.taH +
            " act=" + snap.active
        );
        if (chatKeyboardDebugLog.length > 40) chatKeyboardDebugLog = chatKeyboardDebugLog.slice(-40);
      }
    } catch (eDbgPump) {}
    renderChatKeyboardDebugPanel();
  }
  function installChatKeyboardDebugObservers() {
    if (!shouldShowChatKeyboardDebugPanel()) return;
    try {
      if (chatKeyboardDebugObserver) chatKeyboardDebugObserver.disconnect();
    } catch (eDbgObsOff) {}
    try {
      chatKeyboardDebugObserver = new MutationObserver(function (records) {
        var parts = [];
        records.forEach(function (rec) {
          if (!rec || !rec.target) return;
          if (!isChatKeyboardDebugTarget(rec.target)) return;
          var id = getChatKeyboardDebugNodeLabel(rec.target);
          parts.push(id + ":" + rec.attributeName);
        });
        if (parts.length) logChatKeyboardDebug("mut", parts.join(","));
      });
      [
        document.documentElement,
        document.body,
        document.querySelector('.view[data-view="chat"]'),
        chatGeneralInputArea,
        chatPersonalInputArea,
        generalView,
        convView,
        generalMessages,
        messagesEl
      ].forEach(function (node) {
        if (!node || !chatKeyboardDebugObserver) return;
        chatKeyboardDebugObserver.observe(node, {
          attributes: true,
          attributeFilter: ["class", "style"],
          childList: true,
          subtree: true
        });
      });
    } catch (eDbgObs) {}
    try {
      if (!chatKeyboardDebugFocusBound) {
        chatKeyboardDebugFocusBound = true;
        document.addEventListener(
          "focusin",
          function (event) {
            var target = event && event.target ? event.target : null;
            if (!isChatKeyboardDebugTarget(target) && !(target && target.closest && target.closest('.view[data-view="chat"]'))) return;
            logChatKeyboardDebug("focusin*", getChatKeyboardDebugNodeLabel(target));
          },
          true
        );
        document.addEventListener(
          "focusout",
          function (event) {
            var target = event && event.target ? event.target : null;
            if (!isChatKeyboardDebugTarget(target) && !(target && target.closest && target.closest('.view[data-view="chat"]'))) return;
            logChatKeyboardDebug("focusout*", getChatKeyboardDebugNodeLabel(target));
          },
          true
        );
        document.addEventListener(
          "touchstart",
          function (event) {
            var target = event && event.target ? event.target : null;
            if (!target) return;
            if (!isChatKeyboardDebugTarget(target) && !(target.closest && target.closest('.view[data-view="chat"]'))) return;
            logChatKeyboardDebug("touch*", getChatKeyboardDebugNodeLabel(target));
          },
          true
        );
        document.addEventListener(
          "selectionchange",
          function () {
            pumpChatKeyboardDebugSnapshot("sel*");
          },
          true
        );
      }
    } catch (eDbgFocusBind) {}
    try {
      if (window.visualViewport && window.visualViewport.addEventListener && !window.__pokerChatKeyboardDebugVvBound) {
        window.__pokerChatKeyboardDebugVvBound = true;
        window.visualViewport.addEventListener("resize", function () {
          logChatKeyboardDebug("vv-resize");
        });
        window.visualViewport.addEventListener("scroll", function () {
          logChatKeyboardDebug("vv-scroll");
        });
      }
    } catch (eDbgVv) {}
    try {
      if (!window.__pokerChatKeyboardDebugWinBound) {
        window.__pokerChatKeyboardDebugWinBound = true;
        window.addEventListener("resize", function () {
          logChatKeyboardDebug("win-resize");
        });
        window.addEventListener("scroll", function () {
          logChatKeyboardDebug("win-scroll");
        }, true);
      }
    } catch (eDbgWin) {}
    try {
      if (!chatKeyboardDebugTickerStarted) {
        chatKeyboardDebugTickerStarted = true;
        window.setInterval(function () {
          pumpChatKeyboardDebugSnapshot("tick");
        }, 180);
      }
    } catch (eDbgTicker) {}
  }
  renderChatKeyboardDebugPanel();
  function ensureTelegramIosChatComposerOverlayHost() {
    return null;
  }
  function syncTelegramIosChatComposerSpacerHeight(state) {
    if (!state || !state.spacer || !state.area) return;
    try {
      var rect = state.area.getBoundingClientRect();
      var h = Math.max(56, Math.round(rect && rect.height ? rect.height : state.area.offsetHeight || 0));
      state.spacer.style.height = h + "px";
    } catch (eTmaSpacerH) {}
  }
  function portalTelegramIosChatComposerState(state) {
    restoreTelegramIosChatComposerState(state);
  }
  function restoreTelegramIosChatComposerState(state) {
    if (!state || !state.area || !state.portaled) return;
    try {
      if (state.spacer && state.spacer.parentNode) {
        state.spacer.parentNode.insertBefore(state.area, state.spacer);
        state.spacer.parentNode.removeChild(state.spacer);
      }
    } catch (eTmaRestoreArea) {}
    try {
      state.area.removeAttribute("data-chat-overlay-mode");
    } catch (eTmaRestoreAttr) {}
    state.portaled = false;
  }
  function setTelegramIosChatComposerOverlayClasses(active) {
    try {
      document.documentElement.classList.remove("chat-tma-ios-composer-overlay-active");
      document.body.classList.remove("chat-tma-ios-composer-overlay-active");
      var host = document.getElementById("chatTmaIosComposerOverlay");
      if (host && host.parentNode) host.parentNode.removeChild(host);
    } catch (eTmaOverlayCls) {}
  }
  function clearTelegramIosChatComposerOverlayViewportPosition() {
    chatTmaIosComposerOverlayLastTop = null;
    chatTmaIosComposerOverlayLastInnerHeight = 0;
  }
  function syncTelegramIosChatComposerOverlayViewportPosition() {
    clearTelegramIosChatComposerOverlayViewportPosition();
  }
  function scheduleTelegramIosChatComposerOverlayViewportPositionSync() {
    if (chatTmaIosComposerOverlayViewportRaf != null) return;
    var raf = window.requestAnimationFrame || function (fn) {
      return setTimeout(fn, 0);
    };
    chatTmaIosComposerOverlayViewportRaf = raf(function () {
      chatTmaIosComposerOverlayViewportRaf = null;
      syncTelegramIosChatComposerOverlayViewportPosition();
    });
  }
  function detachTelegramIosChatComposerOverlayViewportSync() {
    try {
      if (chatTmaIosComposerOverlayViewportRaf != null) {
        (window.cancelAnimationFrame || clearTimeout)(chatTmaIosComposerOverlayViewportRaf);
        chatTmaIosComposerOverlayViewportRaf = null;
      }
    } catch (eTmaOverlayRafOff) {}
    chatTmaIosComposerOverlayViewportHandler = null;
    clearTelegramIosChatComposerOverlayViewportPosition();
  }
  function attachTelegramIosChatComposerOverlayViewportSync() {
    detachTelegramIosChatComposerOverlayViewportSync();
  }
  function getTelegramIosChatComposerOverlayTargetKey() {
    if (String(document.body.getAttribute("data-view") || "") !== "chat") return null;
    if (chatActiveTab === "general" && generalView && !generalView.classList.contains("chat-general-view--hidden")) {
      return "general";
    }
    if (
      chatActiveTab === "personal" &&
      convView &&
      !convView.classList.contains("chat-conv-view--hidden") &&
      personalView &&
      !personalView.classList.contains("chat-personal-view--hidden")
    ) {
      return "personal";
    }
    return null;
  }
  function syncTelegramIosChatComposerOverlayMount() {
    restoreTelegramIosChatComposerState(chatTmaIosComposerPortalStates.general);
    restoreTelegramIosChatComposerState(chatTmaIosComposerPortalStates.personal);
    chatTmaIosComposerOverlayActiveKey = null;
    setTelegramIosChatComposerOverlayClasses(false);
    try {
      clearChatMessagesKeyboardPad();
      clearChatComposerDockClass();
      stripChatInputAreaTransforms();
      setChatKeyboardOpenClasses(false);
    } catch (eTmaOverlayMount) {}
  }
  function scheduleTelegramIosChatComposerOverlaySync() {
    if (chatTmaIosComposerOverlaySyncQueued) return;
    chatTmaIosComposerOverlaySyncQueued = true;
    var raf = window.requestAnimationFrame || function (fn) {
      setTimeout(fn, 0);
    };
    raf(function () {
      chatTmaIosComposerOverlaySyncQueued = false;
      syncTelegramIosChatComposerOverlayMount();
    });
  }
  function syncTelegramIosChatComposerOverlayFromArea(area) {}
  try {
    if (typeof ResizeObserver !== "undefined") {
      var tmaComposerOverlayResizeObserver = new ResizeObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry && entry.target) syncTelegramIosChatComposerOverlayFromArea(entry.target);
        });
      });
      if (chatGeneralInputArea) tmaComposerOverlayResizeObserver.observe(chatGeneralInputArea);
      if (chatPersonalInputArea) tmaComposerOverlayResizeObserver.observe(chatPersonalInputArea);
    }
  } catch (eTmaRo) {}
  function shouldUseDedicatedTelegramIosChatComposer() {
    return isTelegramChatRuntime();
  }
  function ensureTelegramIosMinimalComposerBlock(area, mount, sendButton) {
    if (isTelegramChatRuntime()) return;
    if (!area || !mount || !sendButton) return;
    var shell = area.querySelector(".chat-tma-ios-minimal-block");
    if (!shell) {
      shell = document.createElement("div");
      shell.className = "chat-tma-ios-minimal-block";
      area.appendChild(shell);
    }
    var composerSlot = shell.querySelector(".chat-tma-ios-minimal-block__composer");
    if (!composerSlot) {
      composerSlot = document.createElement("div");
      composerSlot.className = "chat-tma-ios-minimal-block__composer";
      shell.appendChild(composerSlot);
    }
    var actionSlot = shell.querySelector(".chat-tma-ios-minimal-block__action");
    if (!actionSlot) {
      actionSlot = document.createElement("div");
      actionSlot.className = "chat-tma-ios-minimal-block__action";
      shell.appendChild(actionSlot);
    }
    if (!composerSlot.contains(mount)) composerSlot.appendChild(mount);
    if (!actionSlot.contains(sendButton)) actionSlot.appendChild(sendButton);
    area.classList.add("chat-input-area--tma-minimal-block");
    var legacyWrap = area.querySelector(".chat-input-wrap");
    if (legacyWrap) legacyWrap.classList.add("chat-input-wrap--tma-hidden");
  }
  function createDedicatedChatComposer(id, placeholder, ariaLabel) {
    if (!chatSharedComposerEl) return null;
    var ta = chatSharedComposerEl.cloneNode(false);
    ta.id = id;
    ta.value = "";
    ta.placeholder = placeholder || "";
    if (ariaLabel) ta.setAttribute("aria-label", ariaLabel);
    else ta.removeAttribute("aria-label");
    ta.removeAttribute("tabindex");
    return ta;
  }
  function ensureDirectChatComposers() {
    if (!chatGeneralComposerEl) {
      chatGeneralComposerEl = createDedicatedChatComposer("chatGeneralComposer", "Сообщение в общий чат...", "Сообщение в общий чат");
      if (chatGeneralComposerEl && chatGeneralComposerMount && !chatGeneralComposerMount.contains(chatGeneralComposerEl)) {
        chatGeneralComposerMount.appendChild(chatGeneralComposerEl);
      }
      try {
        if (typeof bindChatComposerInputEvents === "function") bindChatComposerInputEvents(chatGeneralComposerEl);
      } catch (eBindGenComposer) {}
    }
    if (!chatPersonalComposerEl) {
      chatPersonalComposerEl = createDedicatedChatComposer("chatPersonalComposer", "Сообщение...", "");
      if (chatPersonalComposerEl && chatPersonalComposerMount && !chatPersonalComposerMount.contains(chatPersonalComposerEl)) {
        chatPersonalComposerMount.appendChild(chatPersonalComposerEl);
      }
      try {
        if (typeof bindChatComposerInputEvents === "function") bindChatComposerInputEvents(chatPersonalComposerEl);
      } catch (eBindPersonalComposer) {}
    }
    try {
      if (typeof updateGeneralSendBtnIcon === "function") updateGeneralSendBtnIcon();
    } catch (eUpdGenComposer) {}
    try {
      if (typeof updatePersonalSendBtnIcon === "function") updatePersonalSendBtnIcon();
    } catch (eUpdPersonalComposer) {}
    return !!(chatGeneralComposerEl && chatPersonalComposerEl);
  }
  function ensureTelegramDedicatedChatComposers() {
    if (!isTelegramChatRuntime()) return false;
    if (!ensureDirectChatComposers()) return false;
    try {
      if (chatComposerPool) {
        chatComposerPool.setAttribute("hidden", "hidden");
        chatComposerPool.setAttribute("aria-hidden", "true");
      }
      if (chatSharedComposerEl) {
        chatSharedComposerEl.value = "";
        chatSharedComposerEl.blur();
        chatSharedComposerEl.disabled = true;
        chatSharedComposerEl.hidden = true;
        chatSharedComposerEl.setAttribute("tabindex", "-1");
        chatSharedComposerEl.setAttribute("aria-hidden", "true");
        chatSharedComposerEl.style.setProperty("display", "none", "important");
        chatSharedComposerEl.style.setProperty("pointer-events", "none", "important");
      }
    } catch (eTgEnsurePool) {}
    return !!(chatGeneralComposerEl && chatPersonalComposerEl);
  }
  if (shouldUseDedicatedTelegramIosChatComposer()) {
    ensureTelegramDedicatedChatComposers();
    ensureTelegramIosMinimalComposerBlock(chatGeneralInputArea, chatGeneralComposerMount, generalSendBtn);
    ensureTelegramIosMinimalComposerBlock(chatPersonalInputArea, chatPersonalComposerMount, sendBtn);
  }
  function getDirectTelegramChatComposer(mode) {
    if (mode === "general") {
      return chatGeneralComposerEl || null;
    }
    if (mode === "personal") {
      return chatPersonalComposerEl || null;
    }
    return null;
  }
  function getDirectChatComposer(mode) {
    if (!ensureDirectChatComposers()) return null;
    if (mode === "general") return chatGeneralComposerEl || null;
    if (mode === "personal") return chatPersonalComposerEl || null;
    return chatActiveTab === "personal" ? chatPersonalComposerEl : chatGeneralComposerEl;
  }
  function shouldUseTelegramIosComposeOverlay() {
    return false;
  }
  function closeTelegramIosComposeOverlay(opts) {
    if (!chatIosComposeOverlay) return;
    opts = opts || {};
    chatIosComposeOverlay.classList.add("chat-ios-compose-overlay--hidden");
    chatIosComposeOverlay.setAttribute("aria-hidden", "true");
    if (chatIosComposeOverlayTextarea) {
      if (!opts.keepDraft) {
        if (chatIosComposeOverlayMode === "general") chatComposerDrafts.general = String(chatIosComposeOverlayTextarea.value || "");
        else if (chatIosComposeOverlayMode === "personal") chatComposerDrafts.personal = String(chatIosComposeOverlayTextarea.value || "");
      }
      try { chatIosComposeOverlayTextarea.blur(); } catch (eBlurOv) {}
    }
    if (chatIosComposeOverlayMode === "general" && chatGeneralInputArea) {
      chatGeneralInputArea.classList.remove("chat-input-area--ios-overlay-gate");
    } else if (chatIosComposeOverlayMode === "personal" && chatPersonalInputArea) {
      chatPersonalInputArea.classList.remove("chat-input-area--ios-overlay-gate");
    }
    chatIosComposeOverlayMode = "";
    chatIosComposeOverlayOpening = false;
    setTelegramIosKeyboardRootLock(false);
  }
  function openTelegramIosComposeOverlay(mode) {
    if (!shouldUseTelegramIosComposeOverlay()) return false;
    if (mode !== "general" && mode !== "personal") return false;
    chatIosComposeOverlayMode = mode;
    chatIosComposeOverlayOpening = true;
    if (chatIosComposeOverlayTitle) {
      chatIosComposeOverlayTitle.textContent = mode === "general" ? "Сообщение в общий чат" : "Сообщение собеседнику";
    }
    var currentDraft = mode === "general" ? getChatGeneralText() : getChatPersonalText();
    if (chatIosComposeOverlayTextarea) {
      chatIosComposeOverlayTextarea.value = currentDraft || "";
    }
    if (mode === "general" && chatGeneralInputArea) {
      chatGeneralInputArea.classList.add("chat-input-area--ios-overlay-gate");
    } else if (mode === "personal" && chatPersonalInputArea) {
      chatPersonalInputArea.classList.add("chat-input-area--ios-overlay-gate");
    }
    chatIosComposeOverlay.classList.remove("chat-ios-compose-overlay--hidden");
    chatIosComposeOverlay.setAttribute("aria-hidden", "false");
    setTelegramIosKeyboardRootLock(true);
    setTimeout(function () {
      chatIosComposeOverlayOpening = false;
      try {
        if (chatIosComposeOverlayTextarea) chatIosComposeOverlayTextarea.focus();
      } catch (eFocusOverlay) {}
    }, 30);
    return true;
  }
  function submitTelegramIosComposeOverlay() {
    if (!chatIosComposeOverlayMode || !chatIosComposeOverlayTextarea) return;
    var text = String(chatIosComposeOverlayTextarea.value || "");
    if (chatIosComposeOverlayMode === "general") {
      chatComposerDrafts.general = text;
      if (chatGeneralComposerEl) chatGeneralComposerEl.value = text;
      if (chatComposerMounted === "general" && chatComposerEl) chatComposerEl.value = text;
      closeTelegramIosComposeOverlay({ keepDraft: true });
      sendGeneral(text);
      return;
    }
    if (chatIosComposeOverlayMode === "personal") {
      chatComposerDrafts.personal = text;
      if (chatPersonalComposerEl) chatPersonalComposerEl.value = text;
      if (chatComposerMounted === "personal" && chatComposerEl) chatComposerEl.value = text;
      closeTelegramIosComposeOverlay({ keepDraft: true });
      sendMessage(text);
    }
  }
  [chatIosComposeOverlayBackdrop, chatIosComposeOverlayClose, chatIosComposeOverlayCancel].forEach(function (btn) {
    if (!btn) return;
    btn.addEventListener("click", function () {
      closeTelegramIosComposeOverlay();
    });
  });
  if (chatIosComposeOverlaySend) {
    chatIosComposeOverlaySend.addEventListener("click", function () {
      submitTelegramIosComposeOverlay();
    });
  }
  if (chatIosComposeOverlayTextarea) {
    chatIosComposeOverlayTextarea.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeTelegramIosComposeOverlay();
        return;
      }
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        submitTelegramIosComposeOverlay();
      }
    });
  }
  function bindTelegramIosComposeOverlayGate(area, mode) {
    if (isTelegramChatRuntime()) return;
    if (!area || area.__pokerIosOverlayGateBound) return;
    area.__pokerIosOverlayGateBound = true;
    function gateOpen(event) {
      if (!shouldUseTelegramIosComposeOverlay()) return;
      if (chatIosComposeOverlay && !chatIosComposeOverlay.classList.contains("chat-ios-compose-overlay--hidden")) return;
      var target = event && event.target ? event.target : null;
      if (target && target.closest) {
        if (target.closest(".chat-attach-btn, .chat-emoji-btn, .chat-send-btn, .chat-voice-preview, .chat-image-preview, .chat-reply-preview, .chat-scroll-bottom-btn")) {
          return;
        }
      }
      if (openTelegramIosComposeOverlay(mode)) {
        if (event) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    }
    area.addEventListener("touchstart", gateOpen, { passive: false, capture: true });
    area.addEventListener("click", gateOpen, true);
  }
  bindTelegramIosComposeOverlayGate(chatGeneralInputArea, "general");
  bindTelegramIosComposeOverlayGate(chatPersonalInputArea, "personal");
  function forceDetachSharedChatComposerForTelegram() {
    if (!chatSharedComposerEl || !chatComposerPool) return;
    try {
      if (!chatComposerPool.contains(chatSharedComposerEl)) chatComposerPool.appendChild(chatSharedComposerEl);
    } catch (eComposerPoolMove) {}
    try {
      chatSharedComposerEl.blur();
      chatSharedComposerEl.disabled = true;
      chatSharedComposerEl.hidden = true;
      chatSharedComposerEl.value = "";
      chatSharedComposerEl.setAttribute("tabindex", "-1");
      chatSharedComposerEl.setAttribute("aria-hidden", "true");
      chatSharedComposerEl.style.setProperty("display", "none", "important");
      chatSharedComposerEl.style.setProperty("pointer-events", "none", "important");
    } catch (eComposerPoolHide) {}
  }
  function bindChatComposerAreaDirectFocus(area, mode) {
    if (!area || area.__pokerDirectComposerAreaFocusBound) return;
    if (isTelegramChatRuntime()) return;
    area.__pokerDirectComposerAreaFocusBound = true;
    function shouldIgnoreAreaFocusTarget(target) {
      if (!target || !target.closest) return false;
      return !!target.closest(
        ".chat-attach-btn, .chat-attach-dropdown, .chat-emoji-btn, .chat-send-btn, .chat-scroll-bottom-btn, .chat-reply-preview__cancel, .chat-image-preview, .chat-voice-preview, .chat-upload-progress"
      );
    }
    function focusDirectComposerFromArea(event) {
      if (String(document.body.getAttribute("data-view") || "") !== "chat") return;
      if (mode === "general" && chatActiveTab !== "general") return;
      if (mode === "personal" && chatActiveTab !== "personal") return;
      var target = event && event.target ? event.target : null;
      if (shouldIgnoreAreaFocusTarget(target)) return;
      if (!ensureTelegramDedicatedChatComposers()) return;
      forceDetachSharedChatComposerForTelegram();
      var directComposer = getDirectTelegramChatComposer(mode);
      if (!directComposer) return;
      chatComposerEl = directComposer;
      try {
        directComposer.disabled = false;
        directComposer.hidden = false;
        directComposer.removeAttribute("tabindex");
        directComposer.removeAttribute("aria-hidden");
        directComposer.style.removeProperty("display");
        directComposer.style.removeProperty("pointer-events");
      } catch (eComposerAreaPrep) {}
      if (target === directComposer || (target && directComposer.contains && directComposer.contains(target))) return;
      var isEarlyGesture = !!(event && (event.type === "touchstart" || event.type === "pointerdown"));
      try {
        if (directComposer.focus) directComposer.focus({ preventScroll: true });
        if (!isEarlyGesture) {
          var len = String(directComposer.value || "").length;
          if (typeof directComposer.setSelectionRange === "function") directComposer.setSelectionRange(len, len);
        }
      } catch (eComposerAreaFocus1) {
        try {
          if (directComposer && directComposer.focus) directComposer.focus();
        } catch (eComposerAreaFocus2) {}
      }
    }
    area.addEventListener("pointerdown", focusDirectComposerFromArea, true);
    area.addEventListener("touchstart", focusDirectComposerFromArea, { passive: false, capture: true });
    area.addEventListener("click", focusDirectComposerFromArea, true);
  }
  bindChatComposerAreaDirectFocus(chatGeneralInputArea, "general");
  bindChatComposerAreaDirectFocus(chatPersonalInputArea, "personal");

  var chatGeneralScrollBottomBtn = document.getElementById("chatGeneralScrollBottomBtn");
  var chatPersonalScrollBottomBtn = document.getElementById("chatPersonalScrollBottomBtn");
  var CHAT_SCROLL_BOTTOM_NEAR_PX = 100;
  var chatScrollBottomBtnRaf = null;
  function chatMessagesNearBottom(el, thresholdPx) {
    if (!el) return true;
    try {
      var th = thresholdPx != null ? thresholdPx : CHAT_SCROLL_BOTTOM_NEAR_PX;
      var max = el.scrollHeight - el.clientHeight;
      if (max <= 8) return true;
      return max - el.scrollTop <= th;
    } catch (e) {
      return true;
    }
  }
  /** Snap вниз только если пользователь у низа ленты (или идёт анимация первого открытия). Иначе догрузка img не дёргает окно. */
  function snapChatMessagesToBottomIfPinned(messagesScrollEl) {
    if (!messagesScrollEl) return;
    try {
      var wrap = messagesScrollEl.parentElement;
      if (wrap && wrap.classList && wrap.classList.contains("chat-messages-wrap--settling")) {
        messagesScrollEl.scrollTop = messagesScrollEl.scrollHeight;
        return;
      }
    } catch (eW) {}
    if (!chatMessagesNearBottom(messagesScrollEl, CHAT_SCROLL_BOTTOM_NEAR_PX)) {
      try {
        if (messagesScrollEl.__pokerChatOpeningStickBottom) {
          messagesScrollEl.scrollTop = messagesScrollEl.scrollHeight;
        }
      } catch (eStickSnap) {}
      return;
    }
    try {
      messagesScrollEl.scrollTop = messagesScrollEl.scrollHeight;
    } catch (eS) {}
  }
  /** Пока открыт диалог с «липким» низом — любой рост scrollHeight (картинки, вёрстка) снова уводит scrollTop от низа; подтягиваем. */
  function pokerSnapChatOpeningStickToBottomIfActive(el, which) {
    if (!el || !el.__pokerChatOpeningStickBottom) return;
    try {
      if (which === "general") {
        if (chatActiveTab !== "general" || !generalView || generalView.classList.contains("chat-general-view--hidden")) return;
      } else if (which === "personal") {
        if (chatActiveTab !== "personal" || !convView || convView.classList.contains("chat-conv-view--hidden")) return;
      }
      el.scrollTop = el.scrollHeight;
    } catch (eSnapStick) {}
  }
  /** Сброс «липкого» низа только по явному жесту: иначе сравнение scrollTop с предыдущим кадром ловило ложные срабатывания при ResizeObserver/картинках. */
  function pokerBindOpeningStickClearOnUserIntent(el) {
    if (!el || el.__pokerOpeningStickIntentBound) return;
    try {
      el.__pokerOpeningStickIntentBound = true;
    } catch (eB) {}
    el.addEventListener(
      "wheel",
      function (ev) {
        if (!el.__pokerChatOpeningStickBottom) return;
        var dy = ev.deltaY;
        if (typeof dy === "number" && dy < -1) el.__pokerChatOpeningStickBottom = false;
      },
      { passive: true }
    );
    var ty0 = null;
    el.addEventListener(
      "touchstart",
      function (ev) {
        ty0 = ev.touches && ev.touches[0] ? ev.touches[0].clientY : null;
      },
      { passive: true }
    );
    el.addEventListener(
      "touchmove",
      function (ev) {
        if (!el.__pokerChatOpeningStickBottom || ty0 == null) return;
        var y = ev.touches && ev.touches[0] ? ev.touches[0].clientY : null;
        if (y != null && y - ty0 > 14) {
          el.__pokerChatOpeningStickBottom = false;
          ty0 = null;
        }
      },
      { passive: true }
    );
    el.addEventListener(
      "touchend",
      function () {
        ty0 = null;
      },
      { passive: true }
    );
  }
  function syncChatScrollBottomButtons() {
    try {
      if (
        chatGeneralScrollBottomBtn &&
        chatActiveTab === "general" &&
        generalView &&
        !generalView.classList.contains("chat-general-view--hidden") &&
        generalMessages
      ) {
        var showG = !chatMessagesNearBottom(generalMessages, CHAT_SCROLL_BOTTOM_NEAR_PX);
        chatGeneralScrollBottomBtn.classList.toggle("chat-scroll-bottom-btn--hidden", !showG);
        chatGeneralScrollBottomBtn.setAttribute("aria-hidden", showG ? "false" : "true");
      } else if (chatGeneralScrollBottomBtn) {
        chatGeneralScrollBottomBtn.classList.add("chat-scroll-bottom-btn--hidden");
        chatGeneralScrollBottomBtn.setAttribute("aria-hidden", "true");
      }
    } catch (eG) {}
    try {
      if (
        chatPersonalScrollBottomBtn &&
        chatActiveTab === "personal" &&
        convView &&
        !convView.classList.contains("chat-conv-view--hidden") &&
        messagesEl
      ) {
        var showP = !chatMessagesNearBottom(messagesEl, CHAT_SCROLL_BOTTOM_NEAR_PX);
        chatPersonalScrollBottomBtn.classList.toggle("chat-scroll-bottom-btn--hidden", !showP);
        chatPersonalScrollBottomBtn.setAttribute("aria-hidden", showP ? "false" : "true");
      } else if (chatPersonalScrollBottomBtn) {
        chatPersonalScrollBottomBtn.classList.add("chat-scroll-bottom-btn--hidden");
        chatPersonalScrollBottomBtn.setAttribute("aria-hidden", "true");
      }
    } catch (eP) {}
  }
  function scheduleSyncChatScrollBottomButtons() {
    if (chatScrollBottomBtnRaf != null) return;
    chatScrollBottomBtnRaf = requestAnimationFrame(function () {
      chatScrollBottomBtnRaf = null;
      syncChatScrollBottomButtons();
    });
  }
  try {
    window.__pokerSyncChatScrollBottomButtons = syncChatScrollBottomButtons;
    window.__pokerScheduleSyncChatScrollBottomButtons = scheduleSyncChatScrollBottomButtons;
  } catch (eSbWin) {}
  if (generalMessages) {
    generalMessages.addEventListener("scroll", scheduleSyncChatScrollBottomButtons, { passive: true });
  }
  if (messagesEl) {
    messagesEl.addEventListener("scroll", scheduleSyncChatScrollBottomButtons, { passive: true });
  }
  if (generalMessages) pokerBindOpeningStickClearOnUserIntent(generalMessages);
  if (messagesEl) pokerBindOpeningStickClearOnUserIntent(messagesEl);
  if (typeof ResizeObserver !== "undefined" && generalMessages) {
    try {
      var roG = new ResizeObserver(function () {
        pokerSnapChatOpeningStickToBottomIfActive(generalMessages, "general");
        scheduleSyncChatScrollBottomButtons();
      });
      roG.observe(generalMessages);
    } catch (eRoG) {}
  }
  if (typeof ResizeObserver !== "undefined" && messagesEl) {
    try {
      var roP = new ResizeObserver(function () {
        pokerSnapChatOpeningStickToBottomIfActive(messagesEl, "personal");
        scheduleSyncChatScrollBottomButtons();
      });
      roP.observe(messagesEl);
    } catch (eRoP) {}
  }
  window.addEventListener("resize", scheduleSyncChatScrollBottomButtons, { passive: true });
  if (chatGeneralScrollBottomBtn) {
    chatGeneralScrollBottomBtn.addEventListener("click", function () {
      try {
        if (generalMessages) {
          generalMessages.scrollTop = generalMessages.scrollHeight;
        }
      } catch (eCG) {}
      var twHg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (twHg && twHg.HapticFeedback && typeof twHg.HapticFeedback.impactOccurred === "function") {
        try {
          twHg.HapticFeedback.impactOccurred("light");
        } catch (eHg) {}
      }
      scheduleSyncChatScrollBottomButtons();
    });
  }
  if (chatPersonalScrollBottomBtn) {
    chatPersonalScrollBottomBtn.addEventListener("click", function () {
      try {
        if (messagesEl) {
          messagesEl.scrollTop = messagesEl.scrollHeight;
        }
      } catch (eCP) {}
      var twHp = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (twHp && twHp.HapticFeedback && typeof twHp.HapticFeedback.impactOccurred === "function") {
        try {
          twHp.HapticFeedback.impactOccurred("light");
        } catch (eHp) {}
      }
      scheduleSyncChatScrollBottomButtons();
    });
  }

  function flushChatComposerToDrafts() {
    var directGeneralComposer = getDirectTelegramChatComposer("general");
    var directPersonalComposer = getDirectTelegramChatComposer("personal");
    if (directGeneralComposer || directPersonalComposer) {
      if (directGeneralComposer) chatComposerDrafts.general = directGeneralComposer.value != null ? String(directGeneralComposer.value) : "";
      if (directPersonalComposer) chatComposerDrafts.personal = directPersonalComposer.value != null ? String(directPersonalComposer.value) : "";
      return;
    }
    if (!chatComposerEl) return;
    try {
      if (chatGeneralComposerMount && chatGeneralComposerMount.contains(chatComposerEl)) {
        chatComposerDrafts.general = chatComposerEl.value != null ? String(chatComposerEl.value) : "";
        return;
      }
      if (chatPersonalComposerMount && chatPersonalComposerMount.contains(chatComposerEl)) {
        chatComposerDrafts.personal = chatComposerEl.value != null ? String(chatComposerEl.value) : "";
        return;
      }
    } catch (eFlushDom) {}
    if (chatComposerMounted === "general") chatComposerDrafts.general = chatComposerEl.value != null ? String(chatComposerEl.value) : "";
    else if (chatComposerMounted === "personal") chatComposerDrafts.personal = chatComposerEl.value != null ? String(chatComposerEl.value) : "";
  }
  /** Текст для отправки: сначала реальный родитель textarea в DOM (флажок chatComposerMounted иногда рассинхронен с mount). */
  function getChatGeneralText() {
    var directComposer = getDirectTelegramChatComposer("general");
    if (directComposer) return directComposer.value != null ? String(directComposer.value) : "";
    if (!chatComposerEl) return chatComposerDrafts.general != null ? String(chatComposerDrafts.general) : "";
    try {
      if (chatGeneralComposerMount && chatGeneralComposerMount.contains(chatComposerEl)) {
        return chatComposerEl.value != null ? String(chatComposerEl.value) : "";
      }
    } catch (eGG) {}
    if (chatComposerMounted === "general") return chatComposerEl.value != null ? String(chatComposerEl.value) : "";
    return chatComposerDrafts.general != null ? String(chatComposerDrafts.general) : "";
  }
  function getChatPersonalText() {
    var directComposer = getDirectTelegramChatComposer("personal");
    if (directComposer) return directComposer.value != null ? String(directComposer.value) : "";
    if (!chatComposerEl) return chatComposerDrafts.personal != null ? String(chatComposerDrafts.personal) : "";
    try {
      if (chatPersonalComposerMount && chatPersonalComposerMount.contains(chatComposerEl)) {
        return chatComposerEl.value != null ? String(chatComposerEl.value) : "";
      }
    } catch (eGP) {}
    if (chatComposerMounted === "personal") return chatComposerEl.value != null ? String(chatComposerEl.value) : "";
    return chatComposerDrafts.personal != null ? String(chatComposerDrafts.personal) : "";
  }
  function shouldAutoFocusChatComposerOnDesktop() {
    try {
      if (typeof window.__pokerIsChatPhysicalKeyboardContext === "function") {
        return !!window.__pokerIsChatPhysicalKeyboardContext();
      }
    } catch (ePkCtx) {}
    try {
      if ((navigator.maxTouchPoints || 0) > 0) return false;
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "")) return false;
    } catch (eAfUa) {}
    return true;
  }
  function focusChatComposerForDesktop() {
    if (!chatComposerEl || !shouldAutoFocusChatComposerOnDesktop()) return;
    setTimeout(function () {
      try {
        if (!chatComposerEl || chatComposerMounted === "detached" || chatComposerEl.disabled) return;
        if (chatComposerEl.focus) chatComposerEl.focus({ preventScroll: true });
      } catch (eFocusDesk1) {
        try {
          if (chatComposerEl && chatComposerEl.focus) chatComposerEl.focus();
        } catch (eFocusDesk2) {}
      }
    }, 0);
  }
  function focusChatComposerForReply(mode, messagesScrollEl) {
    var replyMode = mode === "personal" ? "personal" : "general";
    try {
      mountChatComposer(replyMode);
    } catch (eMountReplyComposer) {}
    var targetComposer = null;
    try {
      targetComposer = isTelegramChatRuntime() ? getDirectTelegramChatComposer(replyMode) : chatComposerEl;
      if (!targetComposer) targetComposer = chatComposerEl;
    } catch (eReplyComposerFind) {
      targetComposer = chatComposerEl;
    }
    if (!targetComposer) return;
    chatComposerEl = targetComposer;
    try {
      targetComposer.disabled = false;
      targetComposer.hidden = false;
      targetComposer.removeAttribute("tabindex");
      targetComposer.removeAttribute("aria-hidden");
      targetComposer.style.removeProperty("display");
      targetComposer.style.removeProperty("pointer-events");
    } catch (eReplyComposerPrep) {}
    var prevScrollTop = messagesScrollEl ? messagesScrollEl.scrollTop : null;
    try {
      targetComposer.focus({ preventScroll: true });
    } catch (eReplyFocus1) {
      try {
        targetComposer.focus();
      } catch (eReplyFocus2) {}
    }
    try {
      var len = String(targetComposer.value || "").length;
      if (typeof targetComposer.setSelectionRange === "function") targetComposer.setSelectionRange(len, len);
    } catch (eReplyCaret) {}
    try {
      if (typeof window.__pokerActivateChatKeyboardViewport === "function") {
        window.__pokerActivateChatKeyboardViewport(targetComposer);
      }
    } catch (eReplyKb) {}
    requestAnimationFrame(function () {
      try {
        if (messagesScrollEl && prevScrollTop != null) messagesScrollEl.scrollTop = prevScrollTop;
      } catch (eReplyScroll) {}
      try {
        if (typeof updateChatMessagesKeyboardPad === "function") updateChatMessagesKeyboardPad();
      } catch (eReplyPad) {}
      try {
        if (typeof window.__pokerSyncPwaChatVisualViewportInset === "function") {
          window.__pokerSyncPwaChatVisualViewportInset();
        }
      } catch (eReplyVv) {}
    });
  }
  function mountChatComposer(mode) {
    if (!chatSharedComposerEl || !chatComposerPool) return;
    mode = mode || "detached";
    var nextMounted = mode === "general" || mode === "personal" ? mode : "detached";
    var useDedicated = (nextMounted === "general" || nextMounted === "personal") && ensureTelegramDedicatedChatComposers();
    if (useDedicated) {
      flushChatComposerToDrafts();
      chatComposerMounted = nextMounted;
      if (nextMounted === "general") {
        chatComposerEl = chatGeneralComposerEl;
        chatComposerEl.placeholder = "Сообщение в общий чат...";
        chatComposerEl.setAttribute("aria-label", "Сообщение в общий чат");
        chatComposerEl.value = chatComposerDrafts.general || "";
        chatComposerEl.disabled = false;
        chatComposerEl.removeAttribute("tabindex");
        chatPersonalComposerEl.setAttribute("tabindex", "-1");
        chatSharedComposerEl.setAttribute("tabindex", "-1");
        chatSharedComposerEl.disabled = true;
      } else if (nextMounted === "personal") {
        chatComposerEl = chatPersonalComposerEl;
        chatComposerEl.placeholder = "Сообщение...";
        chatComposerEl.removeAttribute("aria-label");
        chatComposerEl.value = chatComposerDrafts.personal || "";
        chatComposerEl.disabled = false;
        chatComposerEl.removeAttribute("tabindex");
        chatGeneralComposerEl.setAttribute("tabindex", "-1");
        chatSharedComposerEl.setAttribute("tabindex", "-1");
        chatSharedComposerEl.disabled = true;
      } else {
        chatComposerEl = chatActiveTab === "personal" ? chatPersonalComposerEl : chatGeneralComposerEl;
        chatSharedComposerEl.value = "";
        chatSharedComposerEl.placeholder = "";
        chatSharedComposerEl.blur();
        chatSharedComposerEl.disabled = true;
        chatSharedComposerEl.setAttribute("tabindex", "-1");
        chatGeneralComposerEl.setAttribute("tabindex", "-1");
        chatPersonalComposerEl.setAttribute("tabindex", "-1");
      }
      try {
        if (nextMounted === "general" && typeof resizeChatTextarea === "function") resizeChatTextarea(chatGeneralComposerEl);
        if (nextMounted === "personal" && typeof resizeChatTextarea === "function") resizeChatTextarea(chatPersonalComposerEl);
      } catch (eRtDed) {}
      try {
        if (typeof updateGeneralSendBtnIcon === "function") updateGeneralSendBtnIcon();
      } catch (eGd) {}
      try {
        if (typeof updatePersonalSendBtnIcon === "function") updatePersonalSendBtnIcon();
      } catch (ePd) {}
      scheduleTelegramIosChatComposerOverlaySync();
      return;
    }
    if (isTelegramChatRuntime()) {
      chatComposerMounted = "detached";
      chatComposerEl = chatActiveTab === "personal" ? chatPersonalComposerEl : chatGeneralComposerEl;
      return;
    }
    chatComposerEl = chatSharedComposerEl;
    var contained =
      nextMounted === "detached"
        ? chatComposerPool.contains(chatSharedComposerEl)
        : nextMounted === "general"
          ? chatGeneralComposerMount && chatGeneralComposerMount.contains(chatSharedComposerEl)
          : chatPersonalComposerMount && chatPersonalComposerMount.contains(chatSharedComposerEl);
    var same = nextMounted === chatComposerMounted && contained;
    if (!same) {
      flushChatComposerToDrafts();
      chatComposerMounted = nextMounted;
      if (nextMounted === "general" && chatGeneralComposerMount) {
        chatGeneralComposerMount.appendChild(chatSharedComposerEl);
        chatComposerEl.placeholder = "Сообщение в общий чат...";
        chatComposerEl.setAttribute("aria-label", "Сообщение в общий чат");
        chatComposerEl.value = chatComposerDrafts.general || "";
        chatComposerEl.disabled = false;
        chatComposerEl.removeAttribute("tabindex");
      } else if (nextMounted === "personal" && chatPersonalComposerMount) {
        chatPersonalComposerMount.appendChild(chatSharedComposerEl);
        chatComposerEl.placeholder = "Сообщение...";
        chatComposerEl.removeAttribute("aria-label");
        chatComposerEl.value = chatComposerDrafts.personal || "";
        chatComposerEl.disabled = false;
        chatComposerEl.removeAttribute("tabindex");
      } else {
        chatComposerMounted = "detached";
        chatComposerPool.appendChild(chatSharedComposerEl);
        chatComposerEl.value = "";
        chatComposerEl.placeholder = "";
        chatComposerEl.blur();
        chatComposerEl.disabled = false;
        chatComposerEl.setAttribute("tabindex", "-1");
      }
    } else {
      if (nextMounted === "general") {
        chatComposerEl.placeholder = "Сообщение в общий чат...";
        chatComposerEl.setAttribute("aria-label", "Сообщение в общий чат");
        chatComposerEl.removeAttribute("tabindex");
      } else if (nextMounted === "personal") {
        chatComposerEl.placeholder = "Сообщение...";
        chatComposerEl.removeAttribute("aria-label");
        chatComposerEl.removeAttribute("tabindex");
      } else {
        chatComposerEl.setAttribute("tabindex", "-1");
      }
    }
    try {
      if (typeof resizeChatTextarea === "function") resizeChatTextarea(chatComposerEl);
    } catch (eR) {}
    try {
      if (typeof updateGeneralSendBtnIcon === "function") updateGeneralSendBtnIcon();
    } catch (eG) {}
    try {
      if (typeof updatePersonalSendBtnIcon === "function") updatePersonalSendBtnIcon();
    } catch (eP) {}
    scheduleTelegramIosChatComposerOverlaySync();
    if (nextMounted === "general" || nextMounted === "personal") focusChatComposerForDesktop();
  }

  function setGeneralSendBusy(busy) {
    if (!generalSendBtn) return;
    /* Мгновенный UX: не уводим кнопку в "..." и не гасим её opacity во время сетевого ожидания. */
    generalSendBtn.disabled = false;
    generalSendBtn.classList.remove("chat-send-btn--waiting");
    generalSendBtn.setAttribute("aria-busy", busy ? "true" : "false");
    if (busy) {
      generalSendBtn.textContent = "\u2191";
      generalSendBtn.title = "Отправка…";
      generalSendBtn.setAttribute("aria-label", "Отправка…");
      generalSendBtn.classList.remove("chat-send-btn--mic");
    } else {
      updateGeneralSendBtnIcon();
    }
  }

  function setPersonalSendBusy(busy) {
    if (!sendBtn) return;
    /* Мгновенный UX: не уводим кнопку в "..." и не гасим её opacity во время сетевого ожидания. */
    sendBtn.disabled = false;
    sendBtn.classList.remove("chat-send-btn--waiting");
    sendBtn.setAttribute("aria-busy", busy ? "true" : "false");
    if (busy) {
      sendBtn.textContent = "\u2191";
      sendBtn.title = "Отправка…";
      sendBtn.setAttribute("aria-label", "Отправка…");
      sendBtn.classList.remove("chat-send-btn--mic");
    } else {
      updatePersonalSendBtnIcon();
    }
  }

  var base = getApiBase();
  /* учётные данные чата: pokerApiAuth* (Mini App initData или PWA pwaSession) */

  function syncClubChatRosterUi() {
    var title = document.getElementById("chatDialogClubTitle");
    var titleMeta = document.getElementById("chatDialogClubParticipantsMeta");
    var sub = document.getElementById("chatGeneralHeaderRosterMeta");
    var access = clubChatAccess;
    if (access === "need_apply" || access === "pending") {
      if (title) setTextContentIfChanged(title, "Главный чат");
      if (titleMeta) setTextContentIfChanged(titleMeta, "");
      if (sub) {
        sub.hidden = true;
        sub.textContent = "";
      }
      return;
    }
    var c = window._chatGeneralCache;
    var t = c && c.participantsCount != null ? c.participantsCount : null;
    if (t == null) {
      if (title) setTextContentIfChanged(title, "Главный чат");
      if (titleMeta) setTextContentIfChanged(titleMeta, "");
      if (sub) {
        sub.hidden = true;
        sub.textContent = "";
      }
      return;
    }
    if (title) setTextContentIfChanged(title, "Главный чат");
    if (titleMeta) setTextContentIfChanged(titleMeta, String(t) + " участника");
    if (sub) {
      sub.textContent = "Участников: " + String(t);
      sub.hidden = false;
    }
  }
  try {
    window.__pokerSyncClubChatRosterUi = syncClubChatRosterUi;
  } catch (eSyncRoster) {}

  try {
    pokerHydrateChatSnapshotsFromDisk();
    syncClubChatRosterUi();
  } catch (eHydInit) {}

  /** Пока экран лички/группы с peer открыт и вкладка видна — сервер не шлёт Web Push по этому треду (Redis TTL продлевается пингом). */
  var chatDmFocusPingTimer = null;
  var chatDmFocusSessionHeld = false;
  var CHAT_DM_FOCUS_PING_MS = 22000;
  /** Фон/передний план для dmFocusPing: иначе в Redis залипает «открыт тред» и сервер режет Web Push по ЛС. */
  function pokerChatDmFocusBrowserForegroundOk() {
    try {
      if (typeof document === "undefined" || document.visibilityState !== "visible") return false;
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      /* В Mini App надёжнее isActive, чем document.hasFocus() (часто ложный false — не шлём пинг и не сбрасываем peer; либо наоборот). */
      if (tg && typeof tg.isActive === "boolean") return tg.isActive;
      if (typeof document.hasFocus === "function" && !document.hasFocus()) return false;
      return true;
    } catch (eFg) {
      return false;
    }
  }
  function postChatDmFocusPing(peerId) {
    if (!peerId || typeof fetch !== "function") return;
    if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    try {
      fetch(base + "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokerApiAuthJsonBody({ action: "dmFocusPing", with: peerId })),
      }).catch(function () {});
    } catch (ePing) {}
  }
  function stopChatDmFocusSession() {
    if (chatDmFocusPingTimer) {
      clearInterval(chatDmFocusPingTimer);
      chatDmFocusPingTimer = null;
    }
    if (!chatDmFocusSessionHeld) return;
    chatDmFocusSessionHeld = false;
    if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    try {
      fetch(base + "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokerApiAuthJsonBody({ action: "dmFocusClear" })),
      }).catch(function () {});
    } catch (eClr) {}
  }
  function pokerUpdateChatDmFocusFromUiState() {
    var viewChat = false;
    try {
      viewChat = document.body && document.body.getAttribute("data-view") === "chat";
    } catch (eVw) {}
    var convOpen = !!(convView && !convView.classList.contains("chat-conv-view--hidden"));
    var peer = chatWithUserId && String(chatWithUserId).trim() ? String(chatWithUserId).trim() : "";
    var shouldPing =
      viewChat && pokerChatDmFocusBrowserForegroundOk() && chatActiveTab === "personal" && convOpen && !!peer;
    if (!shouldPing) {
      stopChatDmFocusSession();
      return;
    }
    postChatDmFocusPing(peer);
    if (!chatDmFocusPingTimer) {
      chatDmFocusSessionHeld = true;
      chatDmFocusPingTimer = setInterval(function () {
        var v2 = false;
        try {
          v2 = document.body && document.body.getAttribute("data-view") === "chat";
        } catch (eV2) {}
        var fg2 = pokerChatDmFocusBrowserForegroundOk();
        var co2 = !!(convView && !convView.classList.contains("chat-conv-view--hidden"));
        var p2 = chatWithUserId && String(chatWithUserId).trim() ? String(chatWithUserId).trim() : "";
        if (!v2 || !fg2 || chatActiveTab !== "personal" || !co2 || !p2) {
          stopChatDmFocusSession();
          return;
        }
        postChatDmFocusPing(p2);
      }, CHAT_DM_FOCUS_PING_MS);
    }
  }
  window.__pokerStopChatDmFocusSession = stopChatDmFocusSession;
  window.pokerUpdateChatDmFocusFromUiState = pokerUpdateChatDmFocusFromUiState;

  initChatUserModals({
    base: base,
    tg: tg,
    escapeHtml: escapeHtml,
    openConversation: function (userId, userName, avatarUrl) {
      setTab("personal");
      showConv(userId, userName, undefined, avatarUrl);
    },
    updateCurrentPeerTitle: function (userId, title) {
      if (chatWithUserId && typeof peerChatIdsEqual === "function" && peerChatIdsEqual(chatWithUserId, userId)) {
        chatWithUserName = title;
        if (convTitle) convTitle.textContent = title;
        applyConvPeerAvatarHeader(chatWithPeerAvatarUrl, title);
      }
    },
  });
  var chatNameBtnLongPressHandled = false;
  var chatNameBtnLongPressTimer = null;

  if (!base) {
    var wrapNoBase = generalMessages.parentElement;
    if (wrapNoBase && wrapNoBase.classList) wrapNoBase.classList.remove("chat-messages-wrap--settling");
    generalMessages.innerHTML = "<p class=\"chat-empty\">Не задан адрес API.</p>";
    return;
  }

  /** Id участника чата (tg_… / vk_…), как на сервере в поле from — пересчитываем при каждом рендере: в PWA initChat часто раньше, чем завершился вход. */
  function resolveMyChatMemberId() {
    try {
      var _auth = window.__pokerTelegramAuth;
      if (_auth && _auth.user && _auth.user.id != null && (_auth.status === "verified" || _auth.status === "dev_skip")) {
        var u = _auth.user;
        if (u.memberId != null && String(u.memberId).trim() !== "") return String(u.memberId).trim();
        var raw = String(u.id);
        if (raw.indexOf("tg_") === 0 || raw.indexOf("vk_") === 0) return raw;
        if (u.is_vk || u.vk) return "vk_" + raw;
        return "tg_" + raw;
      }
    } catch (eA) {}
    try {
      var wtg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (wtg && wtg.initDataUnsafe && wtg.initDataUnsafe.user && wtg.initData && String(wtg.initData).trim()) {
        var u0 = wtg.initDataUnsafe.user;
        if (u0 && u0.id != null) return "tg_" + String(u0.id);
      }
    } catch (eT) {}
    return null;
  }
  try {
    window.__pokerResolveMyChatMemberId = resolveMyChatMemberId;
  } catch (eExposeMyChatMemberId) {}

  try {
    window.pokerResolveMyChatMemberId = resolveMyChatMemberId;
  } catch (ePubMy) {}
  function syncChatConvGroupAddMembersBtn() {
    var b = document.getElementById("chatConvGroupAddMembersBtn");
    if (!b) return;
    var grp = !!(chatWithUserId && String(chatWithUserId).indexOf("group_") === 0);
    var cred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
    b.hidden = !grp || !cred;
  }
  function resolveMyChatDisplayName() {
    try {
      var _cdn = window.__pokerChatDisplayName;
      if (_cdn != null && String(_cdn).trim()) return String(_cdn).trim();
    } catch (eCdn) {}
    try {
      var _auth2 = window.__pokerTelegramAuth;
      if (_auth2 && _auth2.user && (_auth2.status === "verified" || _auth2.status === "dev_skip")) {
        if (typeof telegramUserDisplayName === "function") {
          var nm = telegramUserDisplayName(_auth2.user);
          if (nm) return nm;
        }
        var u2 = _auth2.user;
        if (u2.first_name) return String(u2.first_name);
        if (u2.username && typeof pokerHideRomanTelegramUsername === "function" && !pokerHideRomanTelegramUsername(u2.username)) {
          return String(u2.username);
        }
        if (u2.username) return String(u2.username);
      }
    } catch (eN) {}
    try {
      var wtgN = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (wtgN && wtgN.initDataUnsafe && wtgN.initDataUnsafe.user) {
        var uCh = wtgN.initDataUnsafe.user;
        return (
          uCh.first_name ||
          (uCh.username && typeof pokerHideRomanTelegramUsername === "function" && !pokerHideRomanTelegramUsername(uCh.username)
            ? uCh.username
            : "") ||
          "Вы"
        );
      }
    } catch (eTN) {}
    return "Вы";
  }

  function escapeHtml(s) {
    if (!s) return "";
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  var POKER_CHAT_VOICE_RATE_LS = "poker_chat_voice_playback_rate";
  function pokerNormalizeChatVoiceRate(x) {
    var n = typeof x === "number" ? x : parseFloat(String(x != null ? x : ""), 10);
    if (n === 2 || n > 1.75) return 2;
    if (Math.abs(n - 1.5) < 0.01 || (n > 1.25 && n < 1.75)) return 1.5;
    return 1;
  }
  function pokerGetSavedVoicePlaybackRate() {
    try {
      return pokerNormalizeChatVoiceRate(localStorage.getItem(POKER_CHAT_VOICE_RATE_LS));
    } catch (eR) {
      return 1;
    }
  }
  function pokerSetSavedVoicePlaybackRate(rate) {
    try {
      localStorage.setItem(POKER_CHAT_VOICE_RATE_LS, String(pokerNormalizeChatVoiceRate(rate)));
    } catch (eW) {}
  }
  function pokerApplyChatVoicePlaybackRateGlobally(rate) {
    var r = pokerNormalizeChatVoiceRate(rate);
    var auds = document.querySelectorAll("audio.chat-msg__voice");
    for (var ai = 0; ai < auds.length; ai++) {
      try {
        auds[ai].playbackRate = r;
      } catch (eA) {}
    }
    var btns = document.querySelectorAll(".chat-msg__voice-speed-btn");
    for (var bi = 0; bi < btns.length; bi++) {
      var b = btns[bi];
      var br = pokerNormalizeChatVoiceRate(b.getAttribute("data-voice-rate"));
      var on = br === r;
      b.classList.toggle("chat-msg__voice-speed-btn--active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    }
  }
  function pokerApplySavedRateToChatVoiceAudio(audioEl) {
    if (!audioEl || !audioEl.classList || !audioEl.classList.contains("chat-msg__voice")) return;
    try {
      audioEl.playbackRate = pokerGetSavedVoicePlaybackRate();
    } catch (eAudioRate) {}
  }
  /** FileReader/WebKit часто отдаёт data:application/octet-stream или data:video/webm — сервер ждёт data:audio/… */
  function pokerNormalizeVoiceDataUrl(dataUrl, recorderMime) {
    if (typeof dataUrl !== "string" || dataUrl.indexOf("data:") !== 0) return dataUrl;
    var comma = dataUrl.indexOf(",");
    if (comma < 0) return dataUrl;
    var header = dataUrl.slice(0, comma);
    var low = header.toLowerCase();
    if (low.indexOf("audio/") !== -1) return dataUrl;
    var payload = dataUrl.slice(comma);
    var pickAudio = "audio/webm";
    try {
      var rm = recorderMime != null ? String(recorderMime).trim() : "";
      if (/^audio\//i.test(rm)) pickAudio = rm.split(";")[0].trim();
      else if (/mp4|m4a|aac|caf|mp4a|mpeg/i.test(rm)) pickAudio = "audio/mp4";
    } catch (ePick) {}
    if (/^data:video\/webm/i.test(header)) {
      return header.replace(/^data:video\/webm/i, "data:audio/webm") + payload;
    }
    if (/^data:video\/mp4/i.test(header)) {
      return header.replace(/^data:video\/mp4/i, "data:audio/mp4") + payload;
    }
    if (/^data:video\/quicktime/i.test(header)) {
      return header.replace(/^data:video\/quicktime/i, "data:audio/mp4") + payload;
    }
    if (low.indexOf("application/octet-stream") !== -1) {
      return "data:" + pickAudio + ";base64," + dataUrl.slice(comma + 1);
    }
    return dataUrl;
  }
  /** opts.footerToolbarHtml — время/галочки в одну строку с 1×…2× (только голос без подписи). */
  function chatVoiceMessageHtml(voiceSrc, opts) {
    if (!voiceSrc) return "";
    opts = opts || {};
    var src = escapeHtml(String(voiceSrc));
    var r = pokerGetSavedVoicePlaybackRate();
    function speedBtn(rate, label) {
      var active = pokerNormalizeChatVoiceRate(rate) === r;
      return (
        '<button type="button" class="chat-msg__voice-speed-btn' +
        (active ? " chat-msg__voice-speed-btn--active" : "") +
        '" data-voice-rate="' +
        rate +
        '" aria-pressed="' +
        (active ? "true" : "false") +
        '">' +
        label +
        "</button>"
      );
    }
    var speedInner =
      speedBtn(1, "1×") +
      speedBtn(1.5, "1.5×") +
      speedBtn(2, "2×");
    var foot = opts.footerToolbarHtml != null && String(opts.footerToolbarHtml).trim() !== ""
      ? '<div class="chat-msg__footer chat-msg__footer--voice-toolbar">' + opts.footerToolbarHtml + "</div>"
      : "";
    return (
      '<div class="chat-msg__voice-wrap">' +
      '<audio class="chat-msg__voice" controls preload="metadata" src="' +
      src +
      '"></audio>' +
      '<div class="chat-msg__voice-toolbar">' +
      '<div class="chat-msg__voice-speed" role="group" aria-label="Скорость воспроизведения">' +
      speedInner +
      "</div>" +
      foot +
      "</div></div>"
    );
  }
  function appendChatVoiceToTextWrap(textWrap, voiceUrl, voiceOpts) {
    if (!textWrap || !voiceUrl) return;
    voiceOpts = voiceOpts || {};
    var wrap = document.createElement("div");
    wrap.className = "chat-msg__voice-wrap";
    var aud = document.createElement("audio");
    aud.className = "chat-msg__voice";
    aud.controls = true;
    aud.preload = "metadata";
    aud.src = voiceUrl;
    pokerApplySavedRateToChatVoiceAudio(aud);
    aud.addEventListener(
      "loadedmetadata",
      function onVoiceMeta() {
        aud.removeEventListener("loadedmetadata", onVoiceMeta);
        pokerApplySavedRateToChatVoiceAudio(aud);
      },
      false
    );
    wrap.appendChild(aud);
    var toolbar = document.createElement("div");
    toolbar.className = "chat-msg__voice-toolbar";
    var speed = document.createElement("div");
    speed.className = "chat-msg__voice-speed";
    speed.setAttribute("role", "group");
    speed.setAttribute("aria-label", "Скорость воспроизведения");
    var r0 = pokerGetSavedVoicePlaybackRate();
    function addRateBtn(rate, label) {
      var bb = document.createElement("button");
      bb.type = "button";
      bb.className = "chat-msg__voice-speed-btn";
      if (pokerNormalizeChatVoiceRate(rate) === r0) bb.className += " chat-msg__voice-speed-btn--active";
      bb.setAttribute("data-voice-rate", String(rate));
      bb.setAttribute("aria-pressed", pokerNormalizeChatVoiceRate(rate) === r0 ? "true" : "false");
      bb.textContent = label;
      speed.appendChild(bb);
    }
    addRateBtn(1, "1×");
    addRateBtn(1.5, "1.5×");
    addRateBtn(2, "2×");
    toolbar.appendChild(speed);
    if (voiceOpts.footerToolbarHtml != null && String(voiceOpts.footerToolbarHtml).trim() !== "") {
      var ft = document.createElement("div");
      ft.className = "chat-msg__footer chat-msg__footer--voice-toolbar";
      ft.innerHTML = voiceOpts.footerToolbarHtml;
      toolbar.appendChild(ft);
    }
    wrap.appendChild(toolbar);
    textWrap.appendChild(wrap);
  }
  /** Голос без текста/картинки/PDF — время ставим в строку с 1×…2× под плеером. */
  function chatMsgVoiceOnlyNoCaption(m) {
    if (!m || !m.voice) return false;
    if (m.image) return false;
    if (m.document) return false;
    var tx = m.text != null ? String(m.text).trim() : "";
    return tx === "";
  }
  (function bindChatVoicePlaybackSpeed() {
    if (window.__pokerChatVoiceRateUiBound) return;
    window.__pokerChatVoiceRateUiBound = true;
    document.addEventListener("click", function (e) {
      var btn = e.target && e.target.closest && e.target.closest(".chat-msg__voice-speed-btn");
      if (!btn) return;
      var rate = pokerNormalizeChatVoiceRate(btn.getAttribute("data-voice-rate"));
      e.preventDefault();
      e.stopPropagation();
      pokerSetSavedVoicePlaybackRate(rate);
      pokerApplyChatVoicePlaybackRateGlobally(rate);
    });
    document.addEventListener("loadedmetadata", function (ev) {
      var t = ev.target;
      pokerApplySavedRateToChatVoiceAudio(t);
    }, true);
    document.addEventListener("canplay", function (ev) {
      var t = ev.target;
      pokerApplySavedRateToChatVoiceAudio(t);
    }, true);
    // WebKit / TG WebView: установка playbackRate в capture на «play» может срывать старт — после начала воспроизведения безопаснее.
    document.addEventListener("play", function (ev) {
      var t = ev.target;
      if (!t || !t.classList || !t.classList.contains("chat-msg__voice")) return;
      setTimeout(function () {
        pokerApplySavedRateToChatVoiceAudio(t);
      }, 0);
    }, true);
    document.addEventListener("playing", function (ev) {
      var t = ev.target;
      if (!t || !t.classList || !t.classList.contains("chat-msg__voice")) return;
      function apply() {
        pokerApplySavedRateToChatVoiceAudio(t);
      }
      try {
        if (typeof requestAnimationFrame === "function") requestAnimationFrame(apply);
        else setTimeout(apply, 0);
      } catch (eRaf) {
        apply();
      }
    });
  })();
  function linkTgUsernames(escapedText) {
    if (!escapedText) return "";
    return String(escapedText).replace(/@([a-zA-Z0-9_]{5,32})(?![a-zA-Z0-9_])/g, function (_, u) {
      return '<a href="https://t.me/' + escapeHtml(u) + '" class="chat-msg__tg-link">@' + escapeHtml(u) + '</a>';
    });
  }
  function linkUrls(escapedText) {
    if (!escapedText) return "";
    return String(escapedText).replace(/(https?:\/\/[^\s<>&"']+)/g, function (url) {
      var href = url.replace(/&amp;/g, "&");
      return '<a href="' + escapeHtml(href).replace(/"/g, "&quot;") + '" class="chat-msg__link" target="_blank" rel="noopener noreferrer">' + url + '</a>';
    });
  }
  function linkAppIds(escapedText) {
    if (!escapedText) return "";
    return String(escapedText).replace(/\b(ID\d{6})\b/gi, function (_, id) {
      var idUp = id.toUpperCase();
      return '<button type="button" class="chat-msg__id-link" data-app-id="' + escapeHtml(idUp) + '">' + escapeHtml(idUp) + '</button>';
    });
  }
  function chatMessageBodyHtml(m) {
    var raw = (m.text || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;");
    return linkTgUsernames(linkAppIds(linkUrls(raw)));
  }

  window.lastGeneralStats = "";
  window.lastListStats = "";
  window.lastConvStats = "";
  window.__pokerChatNetworkOnline = !(typeof navigator !== "undefined" && navigator.onLine === false);
  var chatPeerTypingActive = false;
  var chatTypingLastSentAt = 0;
  var chatTypingStopTimer = 0;
  function setTextContentIfChanged(el, txt) {
    if (!el) return;
    var next = txt != null ? String(txt) : "";
    if (el.textContent !== next) el.textContent = next;
  }
  function scheduleChatPostRenderSync(fn) {
    if (typeof fn !== "function") return;
    var run = function () {
      try {
        fn();
      } catch (ePostRender) {}
    };
    if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
      window.requestAnimationFrame(function () {
        setTimeout(run, 0);
      });
      return;
    }
    setTimeout(run, 0);
  }
  function updateChatHeaderStats() {
    var el = document.getElementById("chatHeaderStats");
    if (!el) return;
    if (window.__pokerChatNetworkOnline === false) {
      setTextContentIfChanged(el, "Нет сети");
      return;
    }
    var txt = "";
    if (chatActiveTab === "general") txt = window.lastGeneralStats || "";
    else if (chatActiveTab === "admins") txt = "Админы";
    else if (chatWithUserId && convView && !convView.classList.contains("chat-conv-view--hidden")) txt = window.lastConvStats || "";
    else txt = window.lastListStats || "";
    setTextContentIfChanged(el, txt);
  }
  function updateConvTypingUi() {
    if (!convTitleId) return;
    if (chatActiveTab !== "personal" || !chatWithUserId || !convView || convView.classList.contains("chat-conv-view--hidden")) return;
    if (String(chatWithUserId).indexOf("group_") === 0) return;
    if (chatPeerTypingActive) {
      setTextContentIfChanged(convTitleId, "печатает…");
      syncChatConvTitleMetaVisibility();
    }
  }
  function pokerChatSendTypingState(active) {
    var on = !!active;
    if (!chatWithUserId || String(chatWithUserId).indexOf("group_") === 0) return;
    if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    var now = Date.now();
    if (on && now - chatTypingLastSentAt < 2500) return;
    chatTypingLastSentAt = now;
    fetch(base + "/api/chat", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        pokerApiAuthJsonBody({
          action: "typing",
          with: chatWithUserId,
          active: on ? 1 : 0,
        })
      ),
    }).catch(function () {});
  }
  function pokerChatScheduleTypingStop() {
    if (chatTypingStopTimer) clearTimeout(chatTypingStopTimer);
    chatTypingStopTimer = setTimeout(function () {
      chatTypingStopTimer = 0;
      pokerChatSendTypingState(false);
    }, 3200);
  }
  function closeSwitcherDropdown() {}
  /** iOS WKWebView: навигация между полями над клавиатурой. Один textarea переносится mountChatComposer; inert на поддеревьях чата при списке диалогов / общем / переписке. */
  function syncChatInertForIosAccessory() {
    try {
      var dlg = document.getElementById("chatDialogsView");
      var gen = document.getElementById("chatGeneralView");
      var per = document.getElementById("chatPersonalView");
      if (!dlg || !gen || !per) return;
      var dialogsShown = !dlg.classList.contains("chat-dialogs-view--hidden");
      var generalShown = !gen.classList.contains("chat-general-view--hidden");
      var convShown = !!(convView && !convView.classList.contains("chat-conv-view--hidden"));
      var supportsInert = typeof HTMLElement !== "undefined" && "inert" in HTMLElement.prototype;
      if (supportsInert) {
        if (dialogsShown) {
          dlg.removeAttribute("inert");
          gen.setAttribute("inert", "");
          per.setAttribute("inert", "");
        } else if (generalShown) {
          dlg.setAttribute("inert", "");
          gen.removeAttribute("inert");
          per.setAttribute("inert", "");
        } else if (convShown) {
          dlg.setAttribute("inert", "");
          gen.setAttribute("inert", "");
          per.removeAttribute("inert");
        } else {
          dlg.setAttribute("inert", "");
          gen.setAttribute("inert", "");
          per.setAttribute("inert", "");
        }
      } else {
        if (chatComposerEl) {
          var composerFocus =
            !dialogsShown &&
            ((generalShown && chatComposerMounted === "general") || (convShown && chatComposerMounted === "personal"));
          chatComposerEl.tabIndex = composerFocus ? 0 : -1;
        }
      }
      /* Вне экрана диалогов поле поиска скрыто (display:none), но на части iOS WK всё равно попадает в «цепочку» клавиатуры ◀ ▶ — убираем из tab order. Тап по полю на экране «Чаты» остаётся (focus по клику для tabindex=-1). */
      var findDlg = document.getElementById("chatFindByIdInputDialogs");
      if (findDlg && typeof findDlg.setAttribute === "function") {
        if (dialogsShown) findDlg.removeAttribute("tabindex");
        else findDlg.setAttribute("tabindex", "-1");
      }
    } catch (eInert) {}
  }
  var chatTabDialogShell = initChatTabDialogShell({
    getChatActiveTab: function () { return chatActiveTab; },
    setChatActiveTab: function (value) { chatActiveTab = value; },
    getChatWithUserId: function () { return chatWithUserId; },
    setChatWithUserId: function (value) { chatWithUserId = value; },
    getChatWithUserName: function () { return chatWithUserName; },
    setChatWithUserName: function (value) { chatWithUserName = value; },
    setChatPeerTypingActive: function (value) { chatPeerTypingActive = !!value; },
    getDialogsView: function () { return dialogsView; },
    getGeneralView: function () { return generalView; },
    getPersonalView: function () { return personalView; },
    getAdminsView: function () { return adminsView; },
    getListView: function () { return listView; },
    getConvView: function () { return convView; },
    getConvTitle: function () { return convTitle; },
    getChatComposerEl: function () { return chatComposerEl; },
    setScrollGeneralToBottomOnNextRender: function (value) { scrollGeneralToBottomOnNextRender = !!value; },
    setScrollPersonalToBottomOnNextRender: function (value) { scrollPersonalToBottomOnNextRender = !!value; },
    pokerPushOpenTraceTransition: pokerPushOpenTraceTransition,
    pokerPushOpenDebug: pokerPushOpenDebug,
    pokerPushOpenSetCaller: pokerPushOpenSetCaller,
    pokerPushOpenConsumeCaller: pokerPushOpenConsumeCaller,
    pokerPushOpenStateDebug: pokerPushOpenStateDebug,
    normalizePeerIdForChat: normalizePeerIdForChat,
    pokerOpenResolvedChatPeer: typeof pokerOpenResolvedChatPeer === "function" ? pokerOpenResolvedChatPeer : null,
    pokerOpenChatPeerDirectFallback: typeof pokerOpenChatPeerDirectFallback === "function" ? pokerOpenChatPeerDirectFallback : null,
    pokerOpenPendingPushDmWithoutContacts: typeof pokerOpenPendingPushDmWithoutContacts === "function" ? pokerOpenPendingPushDmWithoutContacts : null,
    pokerOpenPushDmHard: typeof pokerOpenPushDmHard === "function" ? pokerOpenPushDmHard : null,
    pokerGetActivePushDmTarget: function () {
      if (typeof pokerGetActivePushDmTarget === "function") return pokerGetActivePushDmTarget();
      return "";
    },
    pokerGuardDefaultDialogsOpen: typeof pokerGuardDefaultDialogsOpen === "function" ? pokerGuardDefaultDialogsOpen : null,
    pokerHydrateChatSnapshotsFromDisk: pokerHydrateChatSnapshotsFromDisk,
    paintGeneralFromMemoryBeforeFetch: paintGeneralFromMemoryBeforeFetch,
    loadGeneral: function (opts) { return loadGeneral(opts); },
    loadMessages: function (opts) { return loadMessages(opts); },
    loadAdminsOnline: function () { return loadAdminsOnline(); },
    loadContacts: function (opts) { return loadContacts(opts); },
    updateChatHeaderStats: updateChatHeaderStats,
    updateUnreadDots: updateUnreadDots,
    mountChatComposer: mountChatComposer,
    syncChatInertForIosAccessory: syncChatInertForIosAccessory,
    scheduleSyncChatScrollBottomButtons: scheduleSyncChatScrollBottomButtons,
    pokerUpdateChatDmFocusFromUiState: pokerUpdateChatDmFocusFromUiState,
    pokerChatRefreshLongPollTargets: pokerChatRefreshLongPollTargets,
    pokerResetChatDialogsViewportArtifacts: function () {
      if (typeof pokerResetChatDialogsViewportArtifacts === "function") return pokerResetChatDialogsViewportArtifacts();
    },
    scrollMainDocumentToTop: typeof scrollMainDocumentToTop === "function" ? scrollMainDocumentToTop : null,
    pokerApplyAppTopPadding: typeof pokerApplyAppTopPadding === "function" ? pokerApplyAppTopPadding : null,
    setChatPeerVerified: setChatPeerVerified,
    setChatConvTitleIdText: setChatConvTitleIdText,
    clearConvPeerAvatarHeader: clearConvPeerAvatarHeader,
    syncChatConvGroupAddMembersBtn: syncChatConvGroupAddMembersBtn,
    pokerPrefetchDiskPeersWarmup: pokerPrefetchDiskPeersWarmup,
    updateClubChatPreview: function (messages) {
      if (typeof updateClubChatPreview === "function") return updateClubChatPreview(messages);
    },
    updateAdminShiftOnline: updateAdminShiftOnline,
    getInlineChatHeaderTopOffsetPx: getInlineChatHeaderTopOffsetPx,
    refreshChatSelfPinBars: function () {
      if (typeof refreshChatSelfPinBars === "function") return refreshChatSelfPinBars();
    },
    pokerFlushBottomNavAndViewportAfterChatChrome: typeof pokerFlushBottomNavAndViewportAfterChatChrome === "function" ? pokerFlushBottomNavAndViewportAfterChatChrome : null,
    closeSwitcherDropdown: closeSwitcherDropdown,
  });
  var setTab = chatTabDialogShell.setTab;
  var showDialogs = chatTabDialogShell.showDialogs;

  var scrollGeneralToBottomOnNextRender = false;
  var scrollPersonalToBottomOnNextRender = false;
  var chatDialogsMeta = initChatDialogsMeta({
    getChatIsAdmin: function () { return chatIsAdmin; },
    getClubChatAccess: function () { return clubChatAccess; },
    getDialogsView: function () { return dialogsView; },
    setTextContentIfChanged: setTextContentIfChanged,
    peerChatIdsEqual: peerChatIdsEqual,
  });
  var updateClubChatPendingBadge = chatDialogsMeta.updateClubChatPendingBadge;
  var updateDialogUnreadBadges = chatDialogsMeta.updateDialogUnreadBadges;
  var updateClubChatPreview = chatDialogsMeta.updateClubChatPreview;
  var updateClubChatPreviewText = chatDialogsMeta.updateClubChatPreviewText;
  var enrichPersonalThreadPeerMeta = chatDialogsMeta.enrichPersonalThreadPeerMeta;

  var chatContactsLoader = initChatContactsLoader({
    base: base,
    CHAT_LONG_POLL_TIMEOUT_MS: CHAT_LONG_POLL_TIMEOUT_MS,
    getContactsEl: function () { return contactsEl; },
    getLastViewedPersonal: function () { return lastViewedPersonal; },
    getLastViewedGeneral: function () { return lastViewedGeneral; },
    setChatIsAdmin: function (value) { chatIsAdmin = !!value; },
    setClubChatAccess: function (value) { clubChatAccess = value; },
    pokerApiAuthQuery: pokerApiAuthQuery,
    forceHideChatGuestGateForTelegram: forceHideChatGuestGateForTelegram,
    getPokerResolvedTelegramUser: typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser : null,
    pokerReadPwaGuestMode: typeof pokerReadPwaGuestMode === "function" ? pokerReadPwaGuestMode : null,
    pokerHydrateChatSnapshotsFromDisk: pokerHydrateChatSnapshotsFromDisk,
    syncChatWebsiteGuestGate: syncChatWebsiteGuestGate,
    updateDialogUnreadBadges: updateDialogUnreadBadges,
    updateChatNavDot: function () {
      if (typeof updateChatNavDot === "function") return updateChatNavDot();
    },
    pokerSanitizeContactsPayloadForUi: typeof pokerSanitizeContactsPayloadForUi === "function" ? pokerSanitizeContactsPayloadForUi : null,
    tryOpenClubChatFromDialogs: function () {
      if (typeof tryOpenClubChatFromDialogs === "function") return tryOpenClubChatFromDialogs();
    },
    openClubChat: function () {
      if (typeof openClubChat === "function") return openClubChat();
    },
    pokerApiHasCredential: pokerApiHasCredential,
    pokerSyncChatContactsFilterTabs: pokerSyncChatContactsFilterTabs,
    pokerApplyChatContactsUnreadState: pokerApplyChatContactsUnreadState,
    prefetchTopPersonalDialogs: prefetchTopPersonalDialogs,
    pokerBuildChatContactsListState: pokerBuildChatContactsListState,
    pokerBuildChatContactsFriendSet: pokerBuildChatContactsFriendSet,
    pokerRefreshChatContactsGroupPickers: pokerRefreshChatContactsGroupPickers,
    pokerBuildGroupModalContactList: typeof pokerBuildGroupModalContactList === "function" ? pokerBuildGroupModalContactList : null,
    chatCachedFriendRows: chatCachedFriendRows,
    pokerApplyChatContactsFriendsOnlyList: pokerApplyChatContactsFriendsOnlyList,
    pokerApplyChatContactsMetaState: pokerApplyChatContactsMetaState,
    updateChatHeaderStats: updateChatHeaderStats,
    syncClubChatRosterUi: syncClubChatRosterUi,
    updateClubChatPreviewText: updateClubChatPreviewText,
    pokerRenderChatContactsListResult: pokerRenderChatContactsListResult,
    pokerBindChatContactsFilterHandler: pokerBindChatContactsFilterHandler,
    pokerHydrateChatContactsFromInstantCache: pokerHydrateChatContactsFromInstantCache,
    pokerPrepareChatContactsFetchData: pokerPrepareChatContactsFetchData,
    pokerCompleteChatContactsFetchData: pokerCompleteChatContactsFetchData,
    pokerHandleChatContactsFetchError: pokerHandleChatContactsFetchError,
    pokerChatRecordTrace: pokerChatRecordTrace,
    pokerChatScheduleLongPoll: pokerChatScheduleLongPoll,
  });
  var buildContactsRequestUrl = chatContactsLoader.buildContactsRequestUrl;
  var mergeContactsMetaPayload = chatContactsLoader.mergeContactsMetaPayload;
  var loadContacts = chatContactsLoader.loadContacts;
  try {
    window.__pokerReloadChatContacts = loadContacts;
    window.__pokerKickChatContactsLoad = function (opts) {
      return loadContacts(opts || {});
    };
  } catch (eExposeContactsKick) {}

  var chatClubGate = initChatClubGate({
    base: base,
    tg: tg,
    POKER_NET_ERR: POKER_NET_ERR,
    getOpenClubChat: function () { return openClubChat; },
    getChatIsAdmin: function () { return chatIsAdmin; },
    getClubChatAccess: function () { return clubChatAccess; },
    setClubChatAccess: function (value) { clubChatAccess = value; },
    getGeneralView: function () { return generalView; },
    getChatActiveTab: function () { return chatActiveTab; },
    getGeneralMessages: function () { return generalMessages; },
    getChatComposerEl: function () { return chatComposerEl; },
    getChatComposerMounted: function () { return chatComposerMounted; },
    pokerEnsureChatTelegramVerified: typeof pokerEnsureChatTelegramVerified === "function" ? pokerEnsureChatTelegramVerified : null,
    pokerApiHasCredential: pokerApiHasCredential,
    pokerApiAuthJsonBody: pokerApiAuthJsonBody,
    loadContacts: function (opts) { return loadContacts(opts); },
    loadGeneral: function (opts) { return loadGeneral(opts); },
    updateClubChatPreview: function (messages) {
      if (typeof updateClubChatPreview === "function") return updateClubChatPreview(messages);
    },
    escapeHtml: escapeHtml,
  });
  var tryOpenClubChatFromDialogs = chatClubGate.tryOpenClubChatFromDialogs;
  var submitClubChatApplication = chatClubGate.submitClubChatApplication;
  var updateGeneralInputLocked = chatClubGate.updateGeneralInputLocked;
  var renderGeneralAccessGate = chatClubGate.renderGeneralAccessGate;
  window.tryOpenClubChatFromDialogs = tryOpenClubChatFromDialogs;

  var chatOpenShell = initChatOpenShell({
    POKER_CHAT_NEED_AUTH_PWA_MSG: POKER_CHAT_NEED_AUTH_PWA_MSG,
    POKER_NET_ERR: POKER_NET_ERR,
    getDialogsView: function () { return dialogsView; },
    getGeneralView: function () { return generalView; },
    getPersonalView: function () { return personalView; },
    getListView: function () { return listView; },
    getConvView: function () { return convView; },
    getChatActiveTab: function () { return chatActiveTab; },
    setChatActiveTab: function (value) { chatActiveTab = value; },
    getChatWithUserId: function () { return chatWithUserId; },
    setChatWithUserId: function (value) { chatWithUserId = value; },
    getChatWithUserName: function () { return chatWithUserName; },
    setChatWithUserName: function (value) { chatWithUserName = value; },
    setChatPeerTypingActive: function (value) { chatPeerTypingActive = !!value; },
    getConvTitle: function () { return convTitle; },
    getChatWithPeerAvatarUrl: function () { return chatWithPeerAvatarUrl; },
    setChatWithPeerAvatarUrl: function (value) { chatWithPeerAvatarUrl = value; },
    getGeneralMessages: function () { return generalMessages; },
    getMessagesEl: function () { return messagesEl; },
    getPersonalMessagesCache: function () { return personalMessagesCache; },
    getChatComposerEl: function () { return chatComposerEl; },
    getChatComposerDrafts: function () { return chatComposerDrafts; },
    setScrollGeneralToBottomOnNextRender: function (value) { scrollGeneralToBottomOnNextRender = !!value; },
    setScrollPersonalToBottomOnNextRender: function (value) { scrollPersonalToBottomOnNextRender = !!value; },
    getInlineChatHeaderTopOffsetPx: getInlineChatHeaderTopOffsetPx,
    pokerResetChatDialogsViewportArtifacts: function () {
      if (typeof pokerResetChatDialogsViewportArtifacts === "function") return pokerResetChatDialogsViewportArtifacts();
    },
    updateGeneralInputLocked: updateGeneralInputLocked,
    updateChatHeaderStats: updateChatHeaderStats,
    mountChatComposer: mountChatComposer,
    syncChatInertForIosAccessory: syncChatInertForIosAccessory,
    scheduleSyncChatScrollBottomButtons: scheduleSyncChatScrollBottomButtons,
    pokerUpdateChatDmFocusFromUiState: pokerUpdateChatDmFocusFromUiState,
    pokerChatRefreshLongPollTargets: pokerChatRefreshLongPollTargets,
    getPokerChatTelegramAuthState: typeof getPokerChatTelegramAuthState === "function" ? getPokerChatTelegramAuthState : null,
    escapeHtml: escapeHtml,
    isTelegramWebApp: typeof isTelegramWebApp === "function" ? isTelegramWebApp : null,
    pokerNotifyChatAuthPending: typeof pokerNotifyChatAuthPending === "function" ? pokerNotifyChatAuthPending : null,
    pokerNotifyChatVerificationRequired: typeof pokerNotifyChatVerificationRequired === "function" ? pokerNotifyChatVerificationRequired : null,
    paintGeneralFromMemoryBeforeFetch: paintGeneralFromMemoryBeforeFetch,
    loadGeneral: function (opts) { return loadGeneral(opts); },
    pokerPushOpenStateDebug: pokerPushOpenStateDebug,
    setChatConvTitleIdText: setChatConvTitleIdText,
    applyConvPeerAvatarHeader: applyConvPeerAvatarHeader,
    syncChatConvGroupAddMembersBtn: syncChatConvGroupAddMembersBtn,
    updateUnreadDots: updateUnreadDots,
    pokerApiHasCredential: pokerApiHasCredential,
    loadMessages: function (opts) { return loadMessages(opts); },
    pokerPushOpenDebug: pokerPushOpenDebug,
    peerChatIdsEqual: peerChatIdsEqual,
    pokerEnsureChatTelegramVerified: typeof pokerEnsureChatTelegramVerified === "function" ? pokerEnsureChatTelegramVerified : null,
    resolveMyChatMemberId: resolveMyChatMemberId,
    pokerSafeChatAlert: pokerSafeChatAlert,
    setTab: setTab,
    showConv: function (userId, userName, peerP21Id, peerAvatarOpt, peerVerifiedOpt, peerStatusLevelOpt) {
      if (typeof showConv === "function") {
        return showConv(userId, userName, peerP21Id, peerAvatarOpt, peerVerifiedOpt, peerStatusLevelOpt);
      }
    },
    resizeChatTextarea: resizeChatTextarea,
  });
  var openClubChat = chatOpenShell.openClubChat;
  var openPushDmImmediate = chatOpenShell.openPushDmImmediate;
  var openConvFromDialogs = chatOpenShell.openConvFromDialogs;

  window.chatSetTab = setTab;
  window.chatShowDialogs = showDialogs;
  window.chatOpenConvFromDialogs = openConvFromDialogs;
  window.__pokerOpenPushDmImmediate = openPushDmImmediate;
  window.openClubChat = openClubChat;
  try {
    if (window.__pendingOpenChatPersonalFromDeepLink || window.__pokerPendingChatDeepLinkNeedsLateFlush) {
      pokerPushOpenStateDebug("chat-exports-ready", "");
      setTimeout(function () {
        try {
          if (
            window.__pendingOpenChatPersonalFromDeepLink &&
            typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function"
          ) {
            pokerPushOpenStateDebug("chat-exports-flush", "");
            window.__pokerEnsureOpenPendingChatPersonalFromDeepLink();
          }
          window.__pokerPendingChatDeepLinkNeedsLateFlush = false;
        } catch (eLateFlushChatExports) {}
      }, 0);
    }
  } catch (eChatExportsReady) {}



  var openChatClubAccessModal = initChatClubAccessModal({
    base: base,
    tg: tg,
    escapeHtml: escapeHtml,
    updateClubChatPendingBadge: updateClubChatPendingBadge,
    refreshGeneralAfterClubAccessChange: function () {
      loadGeneral();
    },
    reloadContactsAfterClubAccessChange: function () {
      loadContacts();
    },
  });

  var showTemplatesMenu = initChatTemplatesModal({
    escapeHtml: escapeHtml,
    applyTemplateToComposer: function (channel, text) {
      if (!chatComposerEl || (channel !== "general" && channel !== "personal")) return;
      if (channel === "general") chatComposerDrafts.general = text;
      else chatComposerDrafts.personal = text;
      chatComposerEl.value = text;
      if (typeof resizeChatTextarea === "function") resizeChatTextarea(chatComposerEl);
    },
    sendTemplateMessage: function (channel, text) {
      try {
        if (channel === "general") sendGeneral(text);
        else if (channel === "personal") sendMessage(text);
        else if (chatComposerEl) chatComposerEl.focus();
      } catch (e) {
        if (chatComposerEl) chatComposerEl.focus();
      }
    },
  });

  var CHAT_LAST_VIEWED_KEY = "chat_last_viewed";
  var stored = null;
  try {
    stored = JSON.parse(localStorage.getItem(CHAT_LAST_VIEWED_KEY) || "{}");
  } catch (e) { stored = {}; }
  var lastViewedGeneral = stored && stored.general != null ? stored.general : null;
  try {
    if (lastViewedGeneral !== null && lastViewedGeneral !== undefined && String(lastViewedGeneral).trim() === "") lastViewedGeneral = null;
    else if (lastViewedGeneral != null && isNaN(Date.parse(String(lastViewedGeneral).trim()))) lastViewedGeneral = null;
  } catch (eLvGen) {
    lastViewedGeneral = null;
  }
  var lastViewedPersonal = {};
  try {
    var rawPersonal = stored && stored.personal && typeof stored.personal === "object" ? stored.personal : {};
    Object.keys(rawPersonal).forEach(function (k) {
      var v = rawPersonal[k];
      if (v == null || String(v).trim() === "") return;
      if (isNaN(Date.parse(String(v).trim()))) return;
      lastViewedPersonal[normalizePeerIdForChat(k)] = v;
    });
  } catch (ePers) {
    lastViewedPersonal = {};
  }
  function saveChatLastViewed() {
    try {
      localStorage.setItem(CHAT_LAST_VIEWED_KEY, JSON.stringify({ general: lastViewedGeneral, personal: lastViewedPersonal }));
    } catch (e) {}
  }
  var lastGeneralMessagesSig = null;
  var lastPersonalMessagesSig = null;
  var chatRenderFrameGeneral = 0;
  var chatRenderFramePersonal = 0;

  function scheduleGeneralRender(messages, sig) {
    if (chatRenderFrameGeneral) {
      try { cancelAnimationFrame(chatRenderFrameGeneral); } catch (eCancelG) {}
      chatRenderFrameGeneral = 0;
    }
    var run = function () {
      chatRenderFrameGeneral = 0;
      lastGeneralMessagesSig = sig;
      renderGeneralMessages(messages);
    };
    if (typeof requestAnimationFrame === "function") {
      chatRenderFrameGeneral = requestAnimationFrame(run);
    } else {
      setTimeout(run, 0);
    }
  }
  function schedulePersonalRender(messages, sig) {
    if (chatRenderFramePersonal) {
      try { cancelAnimationFrame(chatRenderFramePersonal); } catch (eCancelP) {}
      chatRenderFramePersonal = 0;
    }
    var run = function () {
      chatRenderFramePersonal = 0;
      lastPersonalMessagesSig = sig;
      renderMessages(messages);
    };
    if (typeof requestAnimationFrame === "function") {
      chatRenderFramePersonal = requestAnimationFrame(run);
    } else {
      setTimeout(run, 0);
    }
  }

  function chatProfileStatusLevelHtml(level) {
    if (level == null || level === "") return "";
    var statusLevel = pokerProfileStatusFishLevel(level);
    return '<span class="chat-msg__status-level">Уровень: ' + escapeHtml(String(statusLevel)) + "</span>";
  }
  function chatContactStatusLevelHtml(level) {
    if (level == null || level === "") return "";
    var statusLevel = pokerProfileStatusFishLevel(level);
    if (!statusLevel) return "";
    return '<span class="chat-contact__status-level">Уровень: ' + escapeHtml(String(statusLevel)) + "</span>";
  }
  var chatMessageBodyBuilders = initChatMessageBodyBuilders({
    escapeHtml: escapeHtml,
    resolveMyChatMemberId: resolveMyChatMemberId,
    peerChatIdsEqual: peerChatIdsEqual,
    pokerChatMessageHasPersistedId: pokerChatMessageHasPersistedId,
    pokerChatDisplayImageSrc: pokerChatDisplayImageSrc,
    chatMsgImageAttrs: chatMsgImageAttrs,
    chatMsgVoiceOnlyNoCaption: chatMsgVoiceOnlyNoCaption,
    chatVoiceMessageHtml: chatVoiceMessageHtml,
    chatDocumentBlockHtml: chatDocumentBlockHtml,
    chatDayDividerHtmlBeforeMessage: chatDayDividerHtmlBeforeMessage,
    chatMessageBodyHtml: chatMessageBodyHtml,
    chatProfileStatusLevelHtml: chatProfileStatusLevelHtml,
    pokerProfileStatusFishLevel: pokerProfileStatusFishLevel,
    pokerProfileStatusFishIconHtml: pokerProfileStatusFishIconHtml,
    chatPokerPlusVerifiedBadgeHtml: chatPokerPlusVerifiedBadgeHtml,
    sortChatReactionEmojiKeys: sortChatReactionEmojiKeys,
    getChatWithUserId: function () { return chatWithUserId; },
    getChatMsgAvatarImgAttrs: function () { return CHAT_MSG_AVATAR_IMG_ATTRS; },
  });
  var buildGeneralMessagesBodyHtml = chatMessageBodyBuilders.buildGeneralMessagesBodyHtml;
  var buildPersonalMessagesBodyHtml = chatMessageBodyBuilders.buildPersonalMessagesBodyHtml;
  var renderLoadOlderButtonHtml = chatMessageBodyBuilders.renderLoadOlderButtonHtml;
  var getPersonalReceiptState = chatMessageBodyBuilders.getPersonalReceiptState;

  function fastAppendChatMessages(targetEl, newMessages, buildHtml, sigSetter) {
    if (!targetEl || !Array.isArray(newMessages) || !newMessages.length) return false;
    var wrap = targetEl.parentElement;
    if (wrap && wrap.classList) wrap.classList.remove("chat-messages-wrap--settling");
    var prevScrollTop = targetEl.scrollTop;
    var prevScrollHeight = targetEl.scrollHeight;
    var wasNearBottom = prevScrollHeight - prevScrollTop - targetEl.clientHeight < 80;
    var emptyEl = targetEl.querySelector(".chat-empty");
    if (emptyEl) targetEl.innerHTML = "";
    targetEl.insertAdjacentHTML("beforeend", buildHtml(newMessages));
    try {
      applyChatMsgTallTextTimeBelowLayout(targetEl);
    } catch (eFastLayout) {}
    if (wasNearBottom || scrollGeneralToBottomOnNextRender || scrollPersonalToBottomOnNextRender) {
      targetEl.scrollTop = targetEl.scrollHeight;
    } else {
      targetEl.scrollTop = prevScrollTop;
    }
    if (typeof sigSetter === "function") sigSetter();
    return true;
  }
  function fastPrependChatMessages(targetEl, oldMessages, buildHtml, loadOlderSource, sigSetter) {
    if (!targetEl || !Array.isArray(oldMessages) || !oldMessages.length) return false;
    var prevTop = targetEl.scrollTop;
    var prevHeight = targetEl.scrollHeight;
    var firstChild = targetEl.firstChild;
    var html = (loadOlderSource ? renderLoadOlderButtonHtml(loadOlderSource) : "") + buildHtml(oldMessages);
    targetEl.insertAdjacentHTML("afterbegin", html);
    if (firstChild && firstChild.parentNode === targetEl) {
      var dupOlder = targetEl.querySelectorAll('[data-chat-load-older="' + loadOlderSource + '"]');
      if (dupOlder.length > 1) {
        try { dupOlder[dupOlder.length - 1].closest(".chat-load-older").remove(); } catch (eDupOlder) {}
      }
    }
    try {
      applyChatMsgTallTextTimeBelowLayout(targetEl);
    } catch (eFastPreLayout) {}
    targetEl.scrollTop = Math.max(0, targetEl.scrollHeight - prevHeight + prevTop);
    if (typeof sigSetter === "function") sigSetter();
    return true;
  }

  /** Сразу показать последний известный общий чат из памяти/disk до ответа /api/chat — без «пустого» ожидания. */
  function paintGeneralFromMemoryBeforeFetch() {
    try {
      if (!generalMessages || !generalView) return;
      if (generalView.classList.contains("chat-general-view--hidden")) return;
      if (chatActiveTab !== "general") return;
      if (!document.querySelector('[data-view="chat"].view--active')) return;
      var cache = window._chatGeneralCache;
      if (!cache || !Array.isArray(cache.messages) || cache.messages.length === 0) return;
      if (cache.__fromDisk) return;
      if (typeof getPokerChatTelegramAuthState === "function" && getPokerChatTelegramAuthState() !== "ok") return;
      scrollGeneralToBottomOnNextRender = true;
      updateGeneralInputLocked(false);
      renderGeneralMessages(cache.messages);
      try {
        lastGeneralMessagesSig = generalMessagesSignature(cache.messages);
      } catch (eSigP) {}
      if (cache.participantsCount != null) {
        window.lastGeneralStats = String(cache.participantsCount) + " уч";
        updateChatHeaderStats();
      }
      try {
        syncClubChatRosterUi();
      } catch (eRosterP) {}
      try {
        refreshChatSelfPinBars();
      } catch (ePinP) {}
    } catch (ePaintG) {}
  }

  /** Пока POST в полёте, любая перезагрузка ленты с сервера снова рисует исходный список — без этого optimistic пропадает до ответа API. */
  var chatOutgoingHelpers = initChatOutgoingHelpers({
    tg: tg,
    escapeHtml: escapeHtml,
    peerChatIdsEqual: peerChatIdsEqual,
    pokerChatMessageHasPersistedId: pokerChatMessageHasPersistedId,
    resolveMyChatMemberId: resolveMyChatMemberId,
    resolveMyChatDisplayName: resolveMyChatDisplayName,
    getSendingGeneral: function () { return sendingGeneral; },
    getSendingPrivate: function () { return sendingPrivate; },
    getChatWithUserId: function () { return chatWithUserId; },
    getGeneralMessagesEl: function () { return generalMessages; },
    getMessagesEl: function () { return messagesEl; },
    sendGeneral: function (payload) { return sendGeneral(payload); },
    sendMessage: function (payload) { return sendMessage(payload); },
  });
  var chatOutgoingState = chatOutgoingHelpers.state;
  var chatCloneRetryPayload = chatOutgoingHelpers.chatCloneRetryPayload;
  var buildChatFailedActionsHtml = chatOutgoingHelpers.buildChatFailedActionsHtml;
  var attachFailedChatActions = chatOutgoingHelpers.attachFailedChatActions;
  var markLatestOptimisticMessageFailed = chatOutgoingHelpers.markLatestOptimisticMessageFailed;
  var retryFailedOutgoingChat = chatOutgoingHelpers.retryFailedOutgoingChat;
  var chatPushPlaceholderFromPayload = chatOutgoingHelpers.chatPushPlaceholderFromPayload;
  var mergeIncomingPushGeneralIntoMessages = chatOutgoingHelpers.mergeIncomingPushGeneralIntoMessages;
  var mergeIncomingPushPersonalIntoMessages = chatOutgoingHelpers.mergeIncomingPushPersonalIntoMessages;
  var mergeOptimisticGeneralIntoMessages = chatOutgoingHelpers.mergeOptimisticGeneralIntoMessages;
  var mergeOptimisticPersonalIntoMessages = chatOutgoingHelpers.mergeOptimisticPersonalIntoMessages;
  var dedupeGeneralMessagesForRender = chatOutgoingHelpers.dedupeGeneralMessagesForRender;
  var dedupePersonalMessagesForRender = chatOutgoingHelpers.dedupePersonalMessagesForRender;

  function updateUnreadDots() {
    if (typeof updateChatNavDot === "function") updateChatNavDot();
  }
  window.chatGeneralUnread = false;
  window.chatPersonalUnread = false;
  window.chatGeneralUnreadCount = 0;
  window.chatPersonalUnreadCount = 0;
  /** Сумма непрочитанных по всем личным диалогам из ответа mode=contacts (для бейджа таббара и PWA icon). */
  window.chatPersonalUnreadTotalFromContacts = undefined;

  var reactionPickerEl = document.getElementById("chatReactionPicker");
  var currentReactionPickerClose = null;

  /** Порядок плашек реакций (как в пикере; 🔥 первым). Синхронизировать с CHAT_REACTION_EMOJI_* в lib/api-handlers/chat.js */
  var CHAT_REACTION_DISPLAY_ORDER = [
    "🔥",
    "✅",
    "👍",
    "👎",
    "❤️",
    "😂",
    "🤣",
    "😮",
    "😢",
    "🙏",
    "😍",
    "🥰",
    "😊",
    "🎉",
    "👏",
    "🙌",
    "💯",
    "✨",
    "⭐",
    "🤔",
    "😤",
    "🥳",
    "🤝",
    "💪",
    "😉",
    "😎",
    "🤩",
    "😭",
    "🤯",
    "♠️",
    "♥️",
    "♦️",
    "♣️",
    "🃏",
    "🎲",
    "🎰",
    "💰",
    "🤑",
    "🏆",
    "👑",
    "🧠",
  ];
  var CHAT_REACTION_ORDER_IDX = {};
  CHAT_REACTION_DISPLAY_ORDER.forEach(function (emOrd, idxOrd) {
    CHAT_REACTION_ORDER_IDX[emOrd] = idxOrd;
  });
  function sortChatReactionEmojiKeys(keys) {
    return keys.slice().sort(function (a, b) {
      var ia = Object.prototype.hasOwnProperty.call(CHAT_REACTION_ORDER_IDX, a) ? CHAT_REACTION_ORDER_IDX[a] : 10000;
      var ib = Object.prototype.hasOwnProperty.call(CHAT_REACTION_ORDER_IDX, b) ? CHAT_REACTION_ORDER_IDX[b] : 10000;
      if (ia !== ib) return ia - ib;
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  }

  var chatReactionHandlers = initChatReactionHandlers({
    base: base,
    tg: tg,
    POKER_NET_ERR: POKER_NET_ERR,
    escapeHtml: escapeHtml,
    pokerApiAuthQuery: pokerApiAuthQuery,
    pokerApiAuthJsonBody: pokerApiAuthJsonBody,
    pokerApiHasCredential: pokerApiHasCredential,
    pokerEnsureChatTelegramVerified: typeof pokerEnsureChatTelegramVerified === "function" ? pokerEnsureChatTelegramVerified : null,
    resolveMyChatMemberId: resolveMyChatMemberId,
    sortChatReactionEmojiKeys: sortChatReactionEmojiKeys,
    peerChatIdsEqual: peerChatIdsEqual,
    pokerChatMessageHasPersistedId: pokerChatMessageHasPersistedId,
    getChatWithUserId: function () { return chatWithUserId; },
    getMessagesEl: function () { return messagesEl; },
    getGeneralMessagesEl: function () { return generalMessages; },
    getPersonalMessagesCache: function () { return personalMessagesCache; },
    setLastGeneralMessagesSig: function (value) { lastGeneralMessagesSig = value; },
    setLastPersonalMessagesSig: function (value) { lastPersonalMessagesSig = value; },
    loadGeneral: function () { return loadGeneral(); },
    loadMessages: function () { return loadMessages(); },
    openConversation: function (userId, userName, p21Id) {
      showConv(userId, userName, p21Id);
      setTab("personal");
    },
  });
  var buildChatReactionsPillsHtml = chatReactionHandlers.buildChatReactionsPillsHtml;
  var syncChatMessageReactionsDom = chatReactionHandlers.syncChatMessageReactionsDom;
  var patchCachedMessageReactions = chatReactionHandlers.patchCachedMessageReactions;
  var patchCachedEditedMessage = chatReactionHandlers.patchCachedEditedMessage;
  var patchCachedDeletedMessage = chatReactionHandlers.patchCachedDeletedMessage;
  var chatMsgElById = chatReactionHandlers.chatMsgElById;
  var optimisticToggleChatReaction = chatReactionHandlers.optimisticToggleChatReaction;
  var sendReaction = chatReactionHandlers.sendReaction;

  var chatPolling = initChatPolling({
    getDialogsView: function () { return dialogsView; },
    getChatActiveTab: function () { return chatActiveTab; },
    getGeneralView: function () { return generalView; },
    getConvView: function () { return convView; },
    getChatWithUserId: function () { return chatWithUserId; },
    pokerApiHasCredential: pokerApiHasCredential,
    loadGeneral: function (opts) { return loadGeneral(opts); },
    loadContacts: function (opts) { return loadContacts(opts); },
    loadMessages: function (opts) { return loadMessages(opts); },
  });
  var CHAT_POLL_TICK_MS = chatPolling.constants.CHAT_POLL_TICK_MS;
  var CHAT_HIDDEN_IDLE_MS = chatPolling.constants.CHAT_HIDDEN_IDLE_MS;
  var CHAT_LONG_POLL_TIMEOUT_MS = chatPolling.constants.CHAT_LONG_POLL_TIMEOUT_MS;
  var chatBurstUntilByScope = chatPolling.state.chatBurstUntilByScope;
  var chatLastPollAt = chatPolling.state.chatLastPollAt;
  var pokerChatRequestPollBurst = chatPolling.pokerChatRequestPollBurst;
  var pokerChatPollIntervalForScope = chatPolling.pokerChatPollIntervalForScope;
  var pokerChatShouldRunPoll = chatPolling.pokerChatShouldRunPoll;
  var pokerChatCanRunLongPoll = chatPolling.pokerChatCanRunLongPoll;
  var pokerChatStopLongPoll = chatPolling.pokerChatStopLongPoll;
  var pokerChatScheduleLongPoll = chatPolling.pokerChatScheduleLongPoll;
  var pokerChatRefreshLongPollTargets = chatPolling.pokerChatRefreshLongPollTargets;
  var pokerChatRecordTrace = chatPolling.pokerChatRecordTrace;


  var chatSelfPins = initChatSelfPins({
    tg: tg,
    normalizePeerIdForChat: normalizePeerIdForChat,
    pokerChatMessageHasPersistedId: pokerChatMessageHasPersistedId,
    resolveMyChatDisplayName: resolveMyChatDisplayName,
    linkTgUsernames: linkTgUsernames,
    linkAppIds: linkAppIds,
    linkUrls: linkUrls,
    escapeHtml: escapeHtml,
    pokerChatDisplayImageSrc: pokerChatDisplayImageSrc,
    getChatWithUserId: function () { return chatWithUserId; },
    getGeneralMessagesEl: function () { return generalMessages; },
    getMessagesEl: function () { return messagesEl; },
    attachContextMenuForOthers: function (container, source, scrollParentOpt) {
      if (typeof attachContextMenuForOthers === "function") return attachContextMenuForOthers(container, source, scrollParentOpt);
    },
  });
  var pokerSelfPinStorageKey = chatSelfPins.pokerSelfPinStorageKey;
  var pokerLoadSelfPinsBucket = chatSelfPins.pokerLoadSelfPinsBucket;
  var pokerPersistSelfPinsBucket = chatSelfPins.pokerPersistSelfPinsBucket;
  var pokerGetSelfPin = chatSelfPins.pokerGetSelfPin;
  var pokerSetSelfPin = chatSelfPins.pokerSetSelfPin;
  var pokerClearSelfPin = chatSelfPins.pokerClearSelfPin;
  var pokerMaybeClearSelfPinIfIdMissing = chatSelfPins.pokerMaybeClearSelfPinIfIdMissing;
  var pokerBuildSelfPinRecord = chatSelfPins.pokerBuildSelfPinRecord;
  var pokerRenderSelfPinnedInnerHtml = chatSelfPins.pokerRenderSelfPinnedInnerHtml;
  var scrollChatListToMessageById = chatSelfPins.scrollChatListToMessageById;
  var bindChatPinnedBarNavigate = chatSelfPins.bindChatPinnedBarNavigate;
  var refreshChatSelfPinBars = chatSelfPins.refreshChatSelfPinBars;

  var chatGeneralLoader = initChatGeneralLoader({
    base: base,
    escapeHtml: escapeHtml,
    pokerApiAuthQuery: pokerApiAuthQuery,
    getPokerChatTelegramAuthState: typeof getPokerChatTelegramAuthState === "function" ? getPokerChatTelegramAuthState : null,
    getChatLongPollTimeoutMs: function () { return CHAT_LONG_POLL_TIMEOUT_MS; },
    getChatActiveTab: function () { return chatActiveTab; },
    getGeneralView: function () { return generalView; },
    getGeneralMessagesEl: function () { return generalMessages; },
    getGeneralBurstUntil: function () { return chatBurstUntilByScope.general || 0; },
    getGeneralHasMoreBefore: function () { return generalHasMoreBefore; },
    setGeneralHasMoreBefore: function (value) { generalHasMoreBefore = !!value; },
    setChatIsAdmin: function (value) { chatIsAdmin = !!value; },
    setClubChatAccess: function (value) { clubChatAccess = value; },
    getLastViewedGeneral: function () { return lastViewedGeneral; },
    setLastViewedGeneral: function (value) { lastViewedGeneral = value; },
    saveChatLastViewed: saveChatLastViewed,
    getLastGeneralMessagesSig: function () { return lastGeneralMessagesSig; },
    setLastGeneralMessagesSig: function (value) { lastGeneralMessagesSig = value; },
    getScrollGeneralToBottomOnNextRender: function () { return scrollGeneralToBottomOnNextRender; },
    getChatIsEditingMessage: function () { return chatIsEditingMessage; },
    getOptimisticGeneralPayload: function () { return chatOutgoingState.optimisticGeneralPayload; },
    POKER_NET_ERR: POKER_NET_ERR,
    mergeOptimisticGeneralIntoMessages: mergeOptimisticGeneralIntoMessages,
    mergeIncomingPushGeneralIntoMessages: mergeIncomingPushGeneralIntoMessages,
    dedupeGeneralMessagesForRender: dedupeGeneralMessagesForRender,
    peerChatIdsEqual: peerChatIdsEqual,
    resolveMyChatMemberId: resolveMyChatMemberId,
    pokerChatMessageIsNewerThanViewed: pokerChatMessageIsNewerThanViewed,
    isTelegramWebApp: isTelegramWebApp,
    pokerApiHasCredential: pokerApiHasCredential,
    pokerReadChatMessageSoundEnabled: pokerReadChatMessageSoundEnabled,
    pokerPlayChatMessageNotificationSound: pokerPlayChatMessageNotificationSound,
    pokerWriteGeneralSnapshotToDisk: pokerWriteGeneralSnapshotToDisk,
    refreshChatSelfPinBars: refreshChatSelfPinBars,
    pokerChatRequestPollBurst: pokerChatRequestPollBurst,
    generalRenderSignature: generalRenderSignature,
    chatMessagesDomHasOptimisticNode: chatMessagesDomHasOptimisticNode,
    canFastAppendMessages: canFastAppendMessages,
    fastAppendChatMessages: fastAppendChatMessages,
    buildGeneralMessagesBodyHtml: buildGeneralMessagesBodyHtml,
    bindChatMsgNameProfileButtons: bindChatMsgNameProfileButtons,
    attachContextMenuForOthers: attachContextMenuForOthers,
    scheduleSyncChatScrollBottomButtons: scheduleSyncChatScrollBottomButtons,
    scheduleGeneralRender: scheduleGeneralRender,
    renderGeneralAccessGate: renderGeneralAccessGate,
    updateGeneralInputLocked: updateGeneralInputLocked,
    scheduleChatPostRenderSync: scheduleChatPostRenderSync,
    updateChatHeaderStats: updateChatHeaderStats,
    syncClubChatRosterUi: syncClubChatRosterUi,
    updateUnreadDots: updateUnreadDots,
    updateDialogUnreadBadges: typeof updateDialogUnreadBadges === "function" ? updateDialogUnreadBadges : null,
    updateClubChatPreview: typeof updateClubChatPreview === "function" ? updateClubChatPreview : null,
    pokerChatScheduleLongPoll: pokerChatScheduleLongPoll,
    pokerChatRecordTrace: pokerChatRecordTrace,
    renderGeneralMessages: renderGeneralMessages,
    fastPrependChatMessages: fastPrependChatMessages,
    generalMessagesSignature: generalMessagesSignature,
  });
  var loadGeneral = chatGeneralLoader.loadGeneral;

  var generalReplyTo = null;
  var personalReplyTo = null;
  var generalImage = null;
  var personalImage = null;
  var generalDocument = null;
  var personalDocument = null;
  var generalVoice = null;
  var personalVoice = null;


  // Редактирование сообщения через окно ввода:
  // - по кнопке "Изменить" (в контекстном меню) заполняем input заново
  // - по "Отправить" выполняем PATCH и обновляем список сообщений
  var chatEditMode = false;
  var chatEditMessageId = null;
  var chatEditSource = null; // "general" | "personal"
  var chatEditWith = null; // используется для PATCH personal
  var chatEditFromName = null;

  var chatEditDeleteUi = initChatEditDeleteUi({
    escapeHtml: escapeHtml,
    linkTgUsernames: linkTgUsernames,
    linkAppIds: linkAppIds,
    linkUrls: linkUrls,
    getMessagesEl: function () { return messagesEl; },
    getGeneralMessagesEl: function () { return generalMessages; },
    getChatWithUserId: function () { return chatWithUserId; },
    getChatComposerEl: function () { return chatComposerEl; },
    getChatComposerDraft: function (mode) { return chatComposerDrafts[mode] || ""; },
    setChatComposerDraft: function (mode, value) { chatComposerDrafts[mode] = value; },
    setChatEditMode: function (value) { chatEditMode = !!value; },
    setChatEditMessageId: function (value) { chatEditMessageId = value; },
    setChatEditSource: function (value) { chatEditSource = value; },
    setChatEditWith: function (value) { chatEditWith = value; },
    getChatEditFromName: function () { return chatEditFromName; },
    setChatEditFromName: function (value) { chatEditFromName = value; },
    setChatIsEditingMessage: function (value) { chatIsEditingMessage = !!value; },
    setGeneralReplyTo: function (value) { generalReplyTo = value; },
    setPersonalReplyTo: function (value) { personalReplyTo = value; },
    setGeneralImage: function (value) { generalImage = value; },
    setGeneralVoice: function (value) { generalVoice = value; },
    setGeneralDocument: function (value) { generalDocument = value; },
    setPersonalImage: function (value) { personalImage = value; },
    setPersonalVoice: function (value) { personalVoice = value; },
    setPersonalDocument: function (value) { personalDocument = value; },
    resizeChatTextarea: resizeChatTextarea,
    updateGeneralSendBtnIcon: function () { if (typeof updateGeneralSendBtnIcon === "function") updateGeneralSendBtnIcon(); },
    updatePersonalSendBtnIcon: function () { if (typeof updatePersonalSendBtnIcon === "function") updatePersonalSendBtnIcon(); },
    mountChatComposer: mountChatComposer,
    applyChatMsgTallTextTimeBelowLayout: applyChatMsgTallTextTimeBelowLayout,
    chatMsgElById: chatMsgElById,
  });
  var clearChatEditUI = chatEditDeleteUi.clearChatEditUI;
  var applyEditedMessageToDom = chatEditDeleteUi.applyEditedMessageToDom;
  var applyDeletedMessageToDom = chatEditDeleteUi.applyDeletedMessageToDom;
  var startChatEdit = chatEditDeleteUi.startChatEdit;


  function resizeImage(file, maxW, maxH, quality) {
    maxW = maxW || 800;
    maxH = maxH || 800;
    if (quality == null || isNaN(quality)) quality = 0.92;
    /* Цель по длине base64 — укладываться в лимит chat.js (450k), без обрыва на q=0.6 */
    var JPEG_MAX_B64 = 400000;
    function jpegBase64Len(dataUrl) {
      var c = dataUrl.indexOf(",");
      return c >= 0 ? dataUrl.length - c - 1 : dataUrl.length;
    }
    return new Promise(function (resolve, reject) {
      var img = new Image();
      var url = URL.createObjectURL(file);
      img.onload = function () {
        URL.revokeObjectURL(url);
        var w = img.width, h = img.height;
        if (w > maxW || h > maxH) {
          if (w > h) { h = Math.round(h * maxW / w); w = maxW; } else { w = Math.round(w * maxH / h); h = maxH; }
        }
        var canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        var ctx = canvas.getContext("2d");
        if (!ctx) { resolve(url); return; }
        function encodeUnderLimit() {
          var q = quality;
          var dataUrl = null;
          var a;
          for (a = 0; a < 12; a++) {
            dataUrl = canvas.toDataURL("image/jpeg", q);
            if (jpegBase64Len(dataUrl) <= JPEG_MAX_B64) return dataUrl;
            q = Math.max(0.74, q - 0.04);
          }
          return dataUrl;
        }
        ctx.drawImage(img, 0, 0, w, h);
        try {
          var out = encodeUnderLimit();
          if (jpegBase64Len(out) > JPEG_MAX_B64) {
            var w2 = Math.max(480, Math.round(w * 0.85));
            var h2 = Math.max(480, Math.round(h * 0.85));
            canvas.width = w2;
            canvas.height = h2;
            ctx = canvas.getContext("2d");
            if (!ctx) { resolve(out); return; }
            ctx.drawImage(img, 0, 0, w2, h2);
            quality = 0.92;
            out = encodeUnderLimit();
          }
          resolve(out);
        } catch (e) { reject(e); }
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error("Не удалось загрузить")); };
      img.src = url;
    });
  }

  // Уровень 1 из 55 = двойка треф (2♣), уровень 2 = тройка треф (3♣), и т.д. параллельно по колоде (трефы 1–13, бубны 14–26, черви 27–39, пики 40–52, джокеры 53–54, 55 = Бог покера).
  function levelToStatusText(level) {
    var n = parseInt(level, 10);
    if (isNaN(n) || n < 1) return null;
    if (n === 53) return "джокер обычный";
    if (n === 54) return "джокер сияющий";
    if (n >= 55) return "Бог покера";
    var value = ((n - 1) % 13) + 2;
    var cardName = value <= 10 ? String(value) : value === 11 ? "валет" : value === 12 ? "дама" : value === 13 ? "король" : "туз";
    var suit = n <= 13 ? "треф" : n <= 26 ? "бубны" : n <= 39 ? "черви" : "пики";
    return cardName + " " + suit;
  }
  /** Догрузка img: лёгкий snap по load/error (без скрытия ленты и ожидания стабилизации высоты). */
  function pinChatMessagesToBottomImagesOnly(el) {
    if (!el) return;
    var imgs = el.querySelectorAll("img.chat-msg__image");
    for (var ii = 0; ii < imgs.length; ii++) {
      (function (im) {
        if (im.complete && im.naturalHeight) return;
        function onImg() {
          im.removeEventListener("load", onImg);
          im.removeEventListener("error", onImg);
          requestAnimationFrame(function () {
            /* Открытие: scrollHeight растёт по load картинок, scrollTop не догоняет — snapIfPinned молчит.
               Пока пользователь не отмотал вверх, __pokerChatOpeningStickBottom держит низ. */
            try {
              if (el.__pokerChatOpeningStickBottom) {
                el.scrollTop = el.scrollHeight;
              } else {
                snapChatMessagesToBottomIfPinned(el);
              }
            } catch (eSnapImg) {}
          });
        }
        im.addEventListener("load", onImg);
        im.addEventListener("error", onImg);
      })(imgs[ii]);
    }
  }
  function settleChatOpeningMediaLayout(el, wrapEl, onDone) {
    if (!el) {
      if (typeof onDone === "function") onDone();
      return;
    }
    var doneCalled = false;
    function finish() {
      if (doneCalled) return;
      doneCalled = true;
      try {
        if (wrapEl && wrapEl.classList) wrapEl.classList.remove("chat-messages-wrap--settling");
      } catch (eWrapDone) {}
      try {
        if (typeof onDone === "function") onDone();
      } catch (eDoneCb) {}
    }
    var imgs = [];
    try {
      imgs = Array.prototype.slice.call(el.querySelectorAll("img.chat-msg__image"));
    } catch (eImgs) {
      finish();
      return;
    }
    if (!imgs.length) {
      finish();
      return;
    }
    var pending = 0;
    function markReady() {
      pending -= 1;
      if (pending <= 0) finish();
    }
    for (var i = 0; i < imgs.length; i++) {
      var im = imgs[i];
      if (im.complete && im.naturalHeight) continue;
      pending += 1;
      (function (imgNode) {
        var settled = false;
        function doneOne() {
          if (settled) return;
          settled = true;
          try {
            imgNode.removeEventListener("load", onLoad);
            imgNode.removeEventListener("error", onLoad);
          } catch (eImgOff) {}
          markReady();
        }
        function onLoad() {
          var raf = window.requestAnimationFrame || function (fn) { setTimeout(fn, 16); };
          raf(doneOne);
        }
        try {
          imgNode.addEventListener("load", onLoad);
          imgNode.addEventListener("error", onLoad);
        } catch (eImgOn) {
          doneOne();
        }
      })(im);
    }
    if (!pending) {
      finish();
      return;
    }
    setTimeout(finish, 260);
  }
  /** Удерживаем низ ленты: после lazy-картинок / перерасчёта вёрстки scrollTop иначе «отстаёт» и лента прыгает вверх. */
  function pinChatMessagesToBottom(el, aggressive) {
    if (!el) return;
    function snap() {
      try {
        el.scrollTop = el.scrollHeight;
      } catch (eSnap) {}
    }
    /* Тройной snap при открытии без клавиатуры даёт лишний «вверх—вниз» после renderGeneralMessages (уже выставил scroll). */
    var tripleSnap = !aggressive || document.body.classList.contains("chat-keyboard-open");
    if (tripleSnap) {
      snap();
      requestAnimationFrame(function () {
        snap();
        requestAnimationFrame(snap);
      });
    }
    var imgs = el.querySelectorAll("img.chat-msg__image");
    for (var ii = 0; ii < imgs.length; ii++) {
      (function (im) {
        if (im.complete && im.naturalHeight) return;
        function onImg() {
          im.removeEventListener("load", onImg);
          im.removeEventListener("error", onImg);
          snapChatMessagesToBottomIfPinned(el);
          /* У низа ленты подтянуть после смещения вёрстки; при прокрутке вверх не трогаем scrollTop. */
          if (document.body.classList.contains("chat-keyboard-open")) {
            requestAnimationFrame(function () {
              snapChatMessagesToBottomIfPinned(el);
              requestAnimationFrame(function () {
                snapChatMessagesToBottomIfPinned(el);
              });
            });
          } else {
            requestAnimationFrame(function () {
              snapChatMessagesToBottomIfPinned(el);
            });
          }
        }
        im.addEventListener("load", onImg);
        im.addEventListener("error", onImg);
      })(imgs[ii]);
    }
    if (aggressive) {
      /* На открытой клавиатуре оставляем «догоняющие» snap; без клавиатуры они дёргают первый вход в общий чат. */
      if (document.body.classList.contains("chat-keyboard-open")) {
        function snapPinned() {
          snapChatMessagesToBottomIfPinned(el);
        }
        setTimeout(snapPinned, 60);
        setTimeout(snapPinned, 200);
        setTimeout(snapPinned, 500);
        if (typeof window.visualViewport !== "undefined" && window.visualViewport.addEventListener) {
          var vvPin = function () {
            snapChatMessagesToBottomIfPinned(el);
          };
          window.visualViewport.addEventListener("resize", vvPin);
          setTimeout(function () {
            try {
              window.visualViewport.removeEventListener("resize", vvPin);
            } catch (eVv) {}
          }, 1200);
        }
      }
    }
  }
  /** При длинном тексте время внизу пузыря (колонка), а не справа от последней строки. */
  var CHAT_MSG_TALL_TEXT_LINE_THRESHOLD = 5;
  var CHAT_MSG_TALL_TEXT_MEASURE_TAIL_LIMIT = 90;
  function applyChatMsgTallTextTimeBelowLayout(root) {
    if (!root || !root.querySelectorAll) return;
    var mains = root.querySelectorAll(".chat-msg__body-main");
    var startIndex = Math.max(0, mains.length - CHAT_MSG_TALL_TEXT_MEASURE_TAIL_LIMIT);
    for (var i = startIndex; i < mains.length; i++) {
      var main = mains[i];
      if (
        main.classList.contains("chat-msg__body-main--with-image") ||
        main.classList.contains("chat-msg__body-main--solo-footer") ||
        main.classList.contains("chat-msg__body-main--voice-inline-time")
      ) {
        main.classList.remove("chat-msg__body-main--time-below");
        continue;
      }
      var textEl = main.querySelector(".chat-msg__text");
      if (!textEl) {
        main.classList.remove("chat-msg__body-main--time-below");
        continue;
      }
      var lh = parseFloat(window.getComputedStyle(textEl).lineHeight);
      if (!isFinite(lh) || lh <= 0) {
        var fs = parseFloat(window.getComputedStyle(textEl).fontSize) || 14;
        lh = fs * 1.35;
      }
      var lines = Math.max(1, Math.round(textEl.scrollHeight / lh));
      if (lines >= CHAT_MSG_TALL_TEXT_LINE_THRESHOLD) main.classList.add("chat-msg__body-main--time-below");
      else main.classList.remove("chat-msg__body-main--time-below");
    }
  }
  function chatMessageCalendarDayKey(ts) {
    if (ts == null || ts === "") return "";
    var d = new Date(ts);
    if (isNaN(d.getTime())) return "";
    var mo = d.getMonth() + 1;
    var da = d.getDate();
    return d.getFullYear() + "-" + (mo < 10 ? "0" : "") + mo + "-" + (da < 10 ? "0" : "") + da;
  }
  var CHAT_MONTH_GENITIVE_RU = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  /** Подпись разделителя: «6 апреля» (локальная дата сообщения). */
  function chatMessageDateLabelRu(ts) {
    if (ts == null || ts === "") return "";
    var d = new Date(ts);
    if (isNaN(d.getTime())) return "";
    var day = d.getDate();
    var mo = d.getMonth();
    if (mo < 0 || mo > 11) return "";
    return day + " " + CHAT_MONTH_GENITIVE_RU[mo];
  }
  /** Разделитель при смене дня относительно предыдущего сообщения в ленте (локальный календарь). */
  function chatDayDividerHtmlBeforeMessage(prevMsg, msg) {
    if (!msg || !msg.time) return "";
    var kCur = chatMessageCalendarDayKey(msg.time);
    if (!kCur) return "";
    if (!prevMsg || !prevMsg.time) return "";
    var kPrev = chatMessageCalendarDayKey(prevMsg.time);
    if (kPrev === kCur) return "";
    var lab = chatMessageDateLabelRu(msg.time);
    if (!lab) return "";
    return '<div class="chat-day-divider" role="separator" aria-label="' + escapeHtml(lab) + '"><span class="chat-day-divider__label">' + escapeHtml(lab) + "</span></div>";
  }

  /** Низ ленты — сразу и с высоким приоритетом; старые фото — lazy, без перегруза канала. */
  var CHAT_MSG_IMG_TAIL_PRIORITIZED = 5;
  function chatMsgImageAttrs(idx, len) {
    if (len <= CHAT_MSG_IMG_TAIL_PRIORITIZED || idx >= len - CHAT_MSG_IMG_TAIL_PRIORITIZED) {
      return ' loading="eager" decoding="async" fetchpriority="high"';
    }
    return ' loading="lazy" decoding="async"';
  }
  var CHAT_MSG_AVATAR_IMG_ATTRS = ' width="36" height="36" loading="lazy" decoding="async"';

  function chatDocumentBlockHtml(documentUrl, documentName) {
    var rawUrl = documentUrl != null ? String(documentUrl) : "";
    if (!rawUrl) return "";
    var name = documentName != null && String(documentName).trim() ? String(documentName).trim() : "document.pdf";
    var docHref = escapeHtml(rawUrl);
    var docNameEsc = escapeHtml(name);
    return (
      '<span class="chat-msg__document chat-msg__document-wrap" data-document-name="' +
      docNameEsc +
      '">' +
      '<a class="chat-msg__document-link chat-msg__document-link--view" href="' +
      docHref +
      '">📄 ' +
      docNameEsc +
      '</a>' +
      '<div class="chat-msg__document-actions">' +
      '<button type="button" class="chat-msg__document-btn chat-msg__document-btn--download" data-chat-pdf-download="1">Скачать</button>' +
      '<button type="button" class="chat-msg__document-btn chat-msg__document-btn--share" data-chat-pdf-share="1">Поделиться</button>' +
      "</div></span>"
    );
  }

  function bindChatMsgNameProfileButtons(rootEl) {
    if (!rootEl || typeof window.openChatUserModalById !== "function") return;
    rootEl.querySelectorAll(".chat-msg__name-btn").forEach(function (btn) {
      var avatar = btn.dataset.pmAvatar || "";
      function openUserModal() {
        window.openChatUserModalById(btn.dataset.pmId, btn.dataset.pmName, avatar);
      }
      btn.addEventListener("click", function () {
        if (chatNameBtnLongPressHandled) {
          chatNameBtnLongPressHandled = false;
          return;
        }
        openUserModal();
      });
      btn.addEventListener(
        "touchstart",
        function () {
          if (chatNameBtnLongPressTimer) return;
          chatNameBtnLongPressTimer = setTimeout(function () {
            chatNameBtnLongPressTimer = null;
            chatNameBtnLongPressHandled = true;
            if (tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred("medium");
            openUserModal();
          }, 500);
        },
        { passive: true }
      );
      btn.addEventListener("touchend", function () {
        if (chatNameBtnLongPressTimer) {
          clearTimeout(chatNameBtnLongPressTimer);
          chatNameBtnLongPressTimer = null;
        }
      });
      btn.addEventListener("touchcancel", function () {
        if (chatNameBtnLongPressTimer) {
          clearTimeout(chatNameBtnLongPressTimer);
          chatNameBtnLongPressTimer = null;
        }
      });
      btn.addEventListener("mousedown", function () {
        if (chatNameBtnLongPressTimer) return;
        chatNameBtnLongPressTimer = setTimeout(function () {
          chatNameBtnLongPressTimer = null;
          chatNameBtnLongPressHandled = true;
          if (tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred("medium");
          openUserModal();
        }, 500);
      });
      btn.addEventListener("mouseup", function () {
        if (chatNameBtnLongPressTimer) {
          clearTimeout(chatNameBtnLongPressTimer);
          chatNameBtnLongPressTimer = null;
        }
      });
      btn.addEventListener("mouseleave", function () {
        if (chatNameBtnLongPressTimer) {
          clearTimeout(chatNameBtnLongPressTimer);
          chatNameBtnLongPressTimer = null;
        }
      });
    });
  }

  function renderGeneralMessages(messages) {
    messages = (messages || []).filter(function (m) {
      return !(m && m.clubAdmissionNotice);
    });
    var generalMsgWrapEarly = generalMessages ? generalMessages.parentElement : null;
    var openingForceBottomG = scrollGeneralToBottomOnNextRender;
    try {
      pokerMaybeClearSelfPinIfIdMissing("general", null, messages);
    } catch (ePinG) {}
    if (!messages || messages.length === 0) {
      if (generalMsgWrapEarly && generalMsgWrapEarly.classList) {
        generalMsgWrapEarly.classList.remove("chat-messages-wrap--settling");
      }
      generalMessages.innerHTML = '<p class="chat-empty">Нет сообщений. Напишите первым!</p>';
      try {
        refreshChatSelfPinBars();
      } catch (ePinG2) {}
      try {
        scheduleSyncChatScrollBottomButtons();
      } catch (eSbGE) {}
      return;
    }
    var bodyHtml = buildGeneralMessagesBodyHtml(messages);
    var html = (generalHasMoreBefore ? renderLoadOlderButtonHtml("general") : "") + bodyHtml;
    if (generalMsgWrapEarly && generalMsgWrapEarly.classList) {
      generalMsgWrapEarly.classList.remove("chat-messages-wrap--settling");
    }
    var prevScrollTop = generalMessages.scrollTop;
    var prevScrollHeight = generalMessages.scrollHeight;
    var wasNearBottom = prevScrollHeight - prevScrollTop - generalMessages.clientHeight < 80;
    generalMessages.innerHTML = html;
    function restoreScroll(clearScrollFlag) {
      var maxScroll = generalMessages.scrollHeight - generalMessages.clientHeight;
      if (openingForceBottomG || wasNearBottom || maxScroll <= 0) {
        generalMessages.scrollTop = generalMessages.scrollHeight;
        if (clearScrollFlag && openingForceBottomG) scrollGeneralToBottomOnNextRender = false;
      } else {
        generalMessages.scrollTop = Math.min(prevScrollTop, Math.max(0, maxScroll));
      }
    }
    if (openingForceBottomG) {
      try {
        if (generalMsgWrapEarly && generalMsgWrapEarly.classList && /chat-msg__image/.test(bodyHtml)) {
          generalMsgWrapEarly.classList.add("chat-messages-wrap--settling");
        }
      } catch (eSettleGFlag) {}
      try {
        generalMessages.scrollTop = generalMessages.scrollHeight;
      } catch (eScG0) {}
      var rafOpenG = requestAnimationFrame || function (fn) { setTimeout(fn, 16); };
      rafOpenG(function () {
        applyChatMsgTallTextTimeBelowLayout(generalMessages);
        try {
          generalMessages.scrollTop = generalMessages.scrollHeight;
        } catch (eScG1) {}
        scrollGeneralToBottomOnNextRender = false;
        try {
          generalMessages.__pokerChatOpeningStickBottom = true;
        } catch (eStickOG) {}
        pinChatMessagesToBottomImagesOnly(generalMessages);
        try {
          if (typeof window.__pokerScheduleSyncChatScrollBottomButtons === "function") {
            window.__pokerScheduleSyncChatScrollBottomButtons();
          }
        } catch (eSbG) {}
        settleChatOpeningMediaLayout(generalMessages, generalMsgWrapEarly, function () {
          try {
            generalMessages.scrollTop = generalMessages.scrollHeight;
          } catch (eScG2) {}
        });
        rafOpenG(function () {
          try {
            generalMessages.scrollTop = generalMessages.scrollHeight;
          } catch (eScG3) {}
        });
      });
    } else {
      restoreScroll(false);
      requestAnimationFrame(function () {
        applyChatMsgTallTextTimeBelowLayout(generalMessages);
        restoreScroll(true);
        if (wasNearBottom) {
          pinChatMessagesToBottom(generalMessages, false);
        }
      });
    }
    bindChatMsgNameProfileButtons(generalMessages);
    generalMessages.querySelectorAll("[data-chat-load-older=\"general\"]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (typeof window.__pokerLoadOlderGeneralMessages === "function") window.__pokerLoadOlderGeneralMessages();
      });
    });
    generalMessages.querySelectorAll(".chat-msg__respect-row[data-user-id]").forEach(function (row) {
      row.addEventListener("click", function () {
        var id = row.dataset.userId;
        if (!id || !pokerApiHasCredential() || !base) return;
        if (typeof window.pokerOpenRespectVotersModal === "function") {
          window.pokerOpenRespectVotersModal(id);
        }
      });
    });
    generalMessages.querySelectorAll(".chat-msg__delete").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.dataset.msgId;
        if (!id) return;
        prepareChatDeleteConfirm();
        if (!confirm("Удалить сообщение?")) return;
        fetch(base + "/api/chat", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pokerApiAuthJsonBody({ messageId: id })),
        }).then(function (r) { return r.json(); }).then(function (d) {
          if (d && d.ok) loadGeneral();
        });
      });
    });
    generalMessages.querySelectorAll(".chat-msg__edit").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var msgId = btn.dataset.msgId;
        var oldText = (btn.dataset.msgText || "").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        if (!msgId) return;
        startChatEdit("general", msgId, oldText, resolveMyChatDisplayName() || "Игрок");
      });
    });
    attachContextMenuForOthers(generalMessages, "general", generalMessages);
    try {
      refreshChatSelfPinBars();
    } catch (ePinRfG) {}
    try {
      scheduleSyncChatScrollBottomButtons();
    } catch (eSbG) {}
  }

  var chatContextMenuHandlers = initChatContextMenuHandlers({
    base: base,
    tg: tg,
    pokerApiAuthJsonBody: pokerApiAuthJsonBody,
    pokerChatMessageHasPersistedId: pokerChatMessageHasPersistedId,
    pokerEventPathHasChatVoiceUi: pokerEventPathHasChatVoiceUi,
    getChatIsAdmin: function () { return chatIsAdmin; },
    getChatWithUserId: function () { return chatWithUserId; },
    getMessagesEl: function () { return messagesEl; },
    getGeneralMessagesEl: function () { return generalMessages; },
    setGeneralReplyTo: function (value) { generalReplyTo = value; },
    setPersonalReplyTo: function (value) { personalReplyTo = value; },
    focusChatComposerForReply: focusChatComposerForReply,
    sendReaction: sendReaction,
    clearChatEditUI: clearChatEditUI,
    startChatEdit: startChatEdit,
    prepareChatDeleteConfirm: prepareChatDeleteConfirm,
    patchCachedDeletedMessage: patchCachedDeletedMessage,
    applyDeletedMessageToDom: applyDeletedMessageToDom,
    loadGeneral: function () { return loadGeneral(); },
    loadMessages: function () { return loadMessages(); },
    refreshChatSelfPinBars: refreshChatSelfPinBars,
    pokerBuildSelfPinRecord: pokerBuildSelfPinRecord,
    pokerSetSelfPin: pokerSetSelfPin,
    pokerClearSelfPin: pokerClearSelfPin,
  });
  var pokerChatFinePointerLikeDesktop = chatContextMenuHandlers.pokerChatFinePointerLikeDesktop;
  var attachContextMenuForOthers = chatContextMenuHandlers.attachContextMenuForOthers;


  var sendingGeneral = false;
  var sendingGeneralSince = 0;
  var chatGeneralSender = initChatGeneralSender({
    base: base,
    tg: tg,
    POKER_NET_ERR: POKER_NET_ERR,
    chatOutgoingState: chatOutgoingState,
    escapeHtml: escapeHtml,
    getGeneralMessagesEl: function () { return generalMessages; },
    getChatMsgAvatarImgAttrs: function () { return CHAT_MSG_AVATAR_IMG_ATTRS; },
    getSendingGeneral: function () { return sendingGeneral; },
    setSendingGeneral: function (value) { sendingGeneral = !!value; },
    getSendingGeneralSince: function () { return sendingGeneralSince; },
    setSendingGeneralSince: function (value) { sendingGeneralSince = Number(value) || 0; },
    getGeneralImage: function () { return generalImage; },
    setGeneralImage: function (value) { generalImage = value; },
    getGeneralVoice: function () { return generalVoice; },
    setGeneralVoice: function (value) { generalVoice = value; },
    getGeneralDocument: function () { return generalDocument; },
    setGeneralDocument: function (value) { generalDocument = value; },
    getGeneralReplyTo: function () { return generalReplyTo; },
    setGeneralReplyTo: function (value) { generalReplyTo = value; },
    getChatEditMode: function () { return chatEditMode; },
    getChatEditSource: function () { return chatEditSource; },
    getChatEditMessageId: function () { return chatEditMessageId; },
    getChatActiveTab: function () { return chatActiveTab; },
    getChatIsEditingMessage: function () { return chatIsEditingMessage; },
    getChatComposerMounted: function () { return chatComposerMounted; },
    getChatComposerEl: function () { return chatComposerEl; },
    clearGeneralComposerDraft: function () { chatComposerDrafts.general = ""; },
    pokerEnsureChatTelegramVerified: typeof pokerEnsureChatTelegramVerified === "function" ? pokerEnsureChatTelegramVerified : null,
    getChatGeneralText: getChatGeneralText,
    pokerApiHasCredential: pokerApiHasCredential,
    setGeneralSendBusy: setGeneralSendBusy,
    pokerApiAuthJsonBody: pokerApiAuthJsonBody,
    patchCachedEditedMessage: patchCachedEditedMessage,
    applyEditedMessageToDom: applyEditedMessageToDom,
    clearChatEditUI: clearChatEditUI,
    chatMsgElById: chatMsgElById,
    loadGeneral: function (opts) { return loadGeneral(opts); },
    pokerChatDisplayImageSrc: pokerChatDisplayImageSrc,
    chatVoiceMessageHtml: chatVoiceMessageHtml,
    chatDocumentBlockHtml: chatDocumentBlockHtml,
    linkTgUsernames: linkTgUsernames,
    linkAppIds: linkAppIds,
    linkUrls: linkUrls,
    appendChatVoiceToTextWrap: appendChatVoiceToTextWrap,
    applyChatMsgTallTextTimeBelowLayout: applyChatMsgTallTextTimeBelowLayout,
    resolveMyChatDisplayName: resolveMyChatDisplayName,
    resolveMyChatMemberId: resolveMyChatMemberId,
    pinChatMessagesToBottom: typeof pinChatMessagesToBottom === "function" ? pinChatMessagesToBottom : null,
    pokerChatRunAfterPaint: pokerChatRunAfterPaint,
    resizeChatTextarea: resizeChatTextarea,
    updateGeneralSendBtnIcon: updateGeneralSendBtnIcon,
    shouldAutoFocusChatComposerOnDesktop: shouldAutoFocusChatComposerOnDesktop,
    focusChatComposerForDesktop: focusChatComposerForDesktop,
    pokerChatRecordTrace: pokerChatRecordTrace,
    pokerChatRequestPollBurst: pokerChatRequestPollBurst,
    pokerChatRefreshLongPollTargets: pokerChatRefreshLongPollTargets,
    pokerChatMessageHasPersistedId: pokerChatMessageHasPersistedId,
    setLastGeneralMessagesSig: function (value) { lastGeneralMessagesSig = value; },
    generalMessagesSignature: generalMessagesSignature,
    renderGeneralMessages: renderGeneralMessages,
    chatCloneRetryPayload: chatCloneRetryPayload,
    markLatestOptimisticMessageFailed: markLatestOptimisticMessageFailed,
  });
  var appendOptimisticGeneralMessage = chatGeneralSender.appendOptimisticGeneralMessage;
  var sendGeneral = chatGeneralSender.sendGeneral;

  var chatConversationShell = initChatConversationShell({
    tg: tg,
    getChatWithUserId: function () { return chatWithUserId; },
    setChatWithUserId: function (value) { chatWithUserId = value; },
    getChatWithUserName: function () { return chatWithUserName; },
    setChatWithUserName: function (value) { chatWithUserName = value; },
    getChatWithPeerAvatarUrl: function () { return chatWithPeerAvatarUrl; },
    setChatWithPeerAvatarUrl: function (value) { chatWithPeerAvatarUrl = value; },
    getConvTitle: function () { return convTitle; },
    getListView: function () { return listView; },
    getConvView: function () { return convView; },
    getConvPeerAvatarPh: function () { return convPeerAvatarPh; },
    getConvPeerAvatar: function () { return convPeerAvatar; },
    getMessagesEl: function () { return messagesEl; },
    setPersonalReplyTo: function (value) { personalReplyTo = value; },
    setPersonalImage: function (value) { personalImage = value; },
    setPersonalVoice: function (value) { personalVoice = value; },
    setConvGroupCanChangeAvatar: function (value) { convGroupCanChangeAvatar = !!value; },
    setScrollPersonalToBottomOnNextRender: function (value) { scrollPersonalToBottomOnNextRender = !!value; },
    setLastPersonalMessagesSig: function (value) { lastPersonalMessagesSig = value; },
    pokerPushOpenStateDebug: pokerPushOpenStateDebug,
    pokerGetActivePushDmTarget: function () {
      if (typeof pokerGetActivePushDmTarget === "function") return pokerGetActivePushDmTarget();
      return "";
    },
    pokerPushOpenDebug: pokerPushOpenDebug,
    pokerGuardDefaultDialogsOpen: typeof pokerGuardDefaultDialogsOpen === "function" ? pokerGuardDefaultDialogsOpen : null,
    pokerPushOpenTraceTransition: pokerPushOpenTraceTransition,
    setChatConvTitleIdText: setChatConvTitleIdText,
    clearConvPeerAvatarHeader: clearConvPeerAvatarHeader,
    syncChatConvGroupAddMembersBtn: syncChatConvGroupAddMembersBtn,
    updateChatHeaderStats: updateChatHeaderStats,
    loadContacts: loadContacts,
    refreshChatSelfPinBars: refreshChatSelfPinBars,
    pokerUpdateChatDmFocusFromUiState: pokerUpdateChatDmFocusFromUiState,
    pokerEnsureChatTelegramVerified: typeof pokerEnsureChatTelegramVerified === "function" ? pokerEnsureChatTelegramVerified : null,
    resolveMyChatMemberId: resolveMyChatMemberId,
    setChatConvTitleFish: setChatConvTitleFish,
    peerChatIdsEqual: peerChatIdsEqual,
    setChatPeerVerified: setChatPeerVerified,
    normalizePeerIdForChat: normalizePeerIdForChat,
    syncConvGroupAvatarEditUi: syncConvGroupAvatarEditUi,
    applyConvPeerAvatarHeader: applyConvPeerAvatarHeader,
    applyConvGroupDescription: applyConvGroupDescription,
    getInlineChatHeaderTopOffsetPx: getInlineChatHeaderTopOffsetPx,
    pokerHydrateOpenDmHeaderFromContacts: function (peerId) {
      if (typeof pokerHydrateOpenDmHeaderFromContacts === "function") return pokerHydrateOpenDmHeaderFromContacts(peerId);
    },
    getPersonalMessagesSnapshotForOpen: getPersonalMessagesSnapshotForOpen,
    pokerMessagesForFastOpenSnapshot: pokerMessagesForFastOpenSnapshot,
    personalRenderSignature: personalRenderSignature,
    renderMessages: renderMessages,
    pokerSchedulePushDmHeaderHydrate: function (peerId) {
      if (typeof pokerSchedulePushDmHeaderHydrate === "function") return pokerSchedulePushDmHeaderHydrate(peerId);
    },
    loadMessages: loadMessages,
    mountChatComposer: mountChatComposer,
    syncChatInertForIosAccessory: syncChatInertForIosAccessory,
  });
  var showList = chatConversationShell.showList;
  var showConv = chatConversationShell.showConv;






  var chatFriendActions = initChatFriendActions({
    base: base,
    tg: tg,
    POKER_NET_ERR: POKER_NET_ERR,
    resolveMyChatMemberId: resolveMyChatMemberId,
    pokerApiHasCredential: pokerApiHasCredential,
    peerChatIdsEqual: peerChatIdsEqual,
    pokerChatPeerIdIsFriend: typeof pokerChatPeerIdIsFriend === "function" ? pokerChatPeerIdIsFriend : null,
    pokerApplyLocalFriendToChatContacts: typeof pokerApplyLocalFriendToChatContacts === "function" ? pokerApplyLocalFriendToChatContacts : null,
    pokerRemoveLocalFriendFromChatContacts: typeof pokerRemoveLocalFriendFromChatContacts === "function" ? pokerRemoveLocalFriendFromChatContacts : null,
    pokerApiAuthJsonBody: pokerApiAuthJsonBody,
  });
  var pokerDebugChatFriendAction = chatFriendActions.pokerDebugChatFriendAction;
  var syncChatDialogPreviewAddFriendBtn = chatFriendActions.syncChatDialogPreviewAddFriendBtn;
  var pokerChatAddFriendWithPrompt = chatFriendActions.pokerChatAddFriendWithPrompt;
  try {
    window.__pokerDebugChatFriendAction = pokerDebugChatFriendAction;
  } catch (eDbgExpose) {}


  function pokerDebugChatOverscroll(stage, payload) {
    if (!shouldShowChatKeyboardDebugPanel()) return;
    try {
      var suffix = "";
      if (payload && typeof payload === "object") {
        var parts = [];
        Object.keys(payload).forEach(function (key) {
          var value = payload[key];
          if (value == null || value === "") return;
          parts.push(String(key) + "=" + String(value));
        });
        if (parts.length) suffix = parts.join(" ");
      }
      logChatKeyboardDebug(String(stage || "overscroll"), suffix);
    } catch (eDbgOver) {}
  }
  function collectChatOverscrollSnapshot(stage, focusTarget, extra) {
    if (!shouldShowChatKeyboardDebugPanel()) return;
    try {
      var snap = getChatKeyboardDebugSnapshot() || {};
      var rootStyle = null;
      try {
        rootStyle = window.getComputedStyle ? getComputedStyle(document.documentElement) : null;
      } catch (eDbgRootStyle) {}
      var viewChat = document.querySelector('.view[data-view="chat"]');
      var viewRect = viewChat && viewChat.getBoundingClientRect ? viewChat.getBoundingClientRect() : null;
      var generalRect = generalView && generalView.getBoundingClientRect ? generalView.getBoundingClientRect() : null;
      var convRect = convView && convView.getBoundingClientRect ? convView.getBoundingClientRect() : null;
      var msgs = typeof getVisibleMessagesEl === "function" ? getVisibleMessagesEl() : null;
      var msgsRect = msgs && msgs.getBoundingClientRect ? msgs.getBoundingClientRect() : null;
      var area = getActiveChatInputArea();
      var areaRect = area && area.getBoundingClientRect ? area.getBoundingClientRect() : null;
      var ta =
        (area && area.querySelector ? area.querySelector("textarea") : null) ||
        chatGeneralComposerEl ||
        chatPersonalComposerEl ||
        chatComposerEl ||
        null;
      var taRect = ta && ta.getBoundingClientRect ? ta.getBoundingClientRect() : null;
      var scrollEl = document.scrollingElement || document.documentElement || document.body;
      var payload = {
        stage: stage || "",
        focus: getChatKeyboardDebugNodeLabel(focusTarget || document.activeElement),
        activeTab: chatActiveTab || "",
        mounted: chatComposerMounted || "",
        runtimeTg: isTelegramChatRuntime() ? 1 : 0,
        activeShared: ta === chatSharedComposerEl ? 1 : 0,
        activeGeneral: ta === chatGeneralComposerEl ? 1 : 0,
        activePersonal: ta === chatPersonalComposerEl ? 1 : 0,
        view: viewRect ? Math.round(viewRect.top) + "+" + Math.round(viewRect.height) : "",
        gen: generalRect ? Math.round(generalRect.top) + "+" + Math.round(generalRect.height) : "",
        conv: convRect ? Math.round(convRect.top) + "+" + Math.round(convRect.height) : "",
        msgs: msgsRect ? Math.round(msgsRect.top) + "+" + Math.round(msgsRect.height) : "",
        area: areaRect ? Math.round(areaRect.top) + "+" + Math.round(areaRect.height) : "",
        ta: taRect ? Math.round(taRect.top) + "+" + Math.round(taRect.height) : "",
        msgScr: msgs ? Math.round(msgs.scrollTop || 0) : 0,
        msgH: msgs ? Math.round(msgs.scrollHeight || 0) + "/" + Math.round(msgs.clientHeight || 0) : "",
        rootScr: scrollEl ? Math.round(scrollEl.scrollTop || 0) : 0,
        winY: Math.round(window.scrollY || 0),
        vv: snap.vvh ? snap.vvh + "/" + snap.vvTop + "/" + snap.vvPageTop : "",
        tgV: snap.tgVh ? snap.tgVh + "/" + snap.tgVs : "",
        kb: (document.documentElement.classList.contains("chat-keyboard-open") ? 1 : 0) + "/" + (document.body.classList.contains("chat-keyboard-open") ? 1 : 0),
        areaPos: snap.areaPos || "",
        areaBottom: snap.areaBottom || "",
        areaTf: snap.areaTransform || "",
        areaCls: area && area.className ? String(area.className).replace(/\s+/g, ".") : "",
        taId: ta && ta.id ? ta.id : "",
        docVv: rootStyle ? String(rootStyle.getPropertyValue("--chat-vv-inset") || "").trim() : "",
        docAcc: rootStyle ? String(rootStyle.getPropertyValue("--chat-ios-accessory-inset") || "").trim() : "",
        dockBottom: Number(window.__pokerChatThreadDockBottomCssPx) || 0,
        lastPad: Number(window.__pokerChatMessagesKeyboardPadLast) || 0,
        lastCover: Number(window.__pokerChatTgKeyboardCoverLast) || 0,
        lastDock: Number(window.__pokerChatLastAppliedDockBottom) || 0,
        focusAge: Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0)),
        openingUntil: Math.max(0, (Number(window.__pokerChatKeyboardOpeningUntil) || 0) - Date.now())
      };
      if (extra && typeof extra === "object") {
        Object.keys(extra).forEach(function (key) {
          payload[key] = extra[key];
        });
      }
      pokerDebugChatOverscroll("snap", payload);
    } catch (eDbgCollect) {
      logChatKeyboardDebug("snap-err", String((eDbgCollect && eDbgCollect.message) || eDbgCollect || ""));
    }
  }


  (function bindChatContactSwipeAndPinList() {
    if (!contactsEl || contactsEl._chatContactSwipePinInit) return;
    contactsEl._chatContactSwipePinInit = true;
    function getSwipeRevealPx(panel) {
      if (!panel) return 52;
      var w = panel.closest(".chat-contact-swipe");
      return w && w.classList.contains("chat-contact-swipe--wide-actions") ? 104 : 52;
    }
    var swipeState = null;
    function getPanelTx(panel) {
      if (!panel || !panel.style || !panel.style.transform) return 0;
      var m = String(panel.style.transform).match(/translateX\(\s*(-?[0-9.]+)px\s*\)/);
      return m ? parseFloat(m[1], 10) : 0;
    }
    function closeOtherSwipePanels(exceptPanel) {
      if (!contactsEl) return;
      contactsEl.querySelectorAll(".chat-contact-swipe__panel").forEach(function (p) {
        if (exceptPanel && p === exceptPanel) return;
        p.style.transform = "";
        p.classList.remove("chat-contact-swipe__panel--open");
        p.classList.remove("chat-contact-swipe__panel--dragging");
        var w0 = p.closest(".chat-contact-swipe");
        if (w0) w0.classList.remove("chat-contact-swipe--show-actions");
      });
    }
    function snapPanel(panel, open) {
      if (!panel) return;
      var rev = getSwipeRevealPx(panel);
      panel.style.transform = open ? "translateX(-" + rev + "px)" : "";
      panel.classList.toggle("chat-contact-swipe__panel--open", !!open);
    }
    contactsEl.addEventListener(
      "click",
      function (e) {
        var cbtn = e.target && e.target.closest ? e.target.closest(".chat-contact") : null;
        if (!cbtn || !contactsEl.contains(cbtn)) return;
        var u = cbtn._suppressNextClickUntil;
        if (u != null && Date.now() < Number(u)) {
          e.preventDefault();
          e.stopPropagation();
          cbtn._suppressNextClickUntil = 0;
          return;
        }
      },
      true
    );
    contactsEl.addEventListener(
      "click",
      function (e) {
        var pinB = e.target && e.target.closest ? e.target.closest(".chat-contact-swipe__pin") : null;
        if (!pinB || !contactsEl.contains(pinB)) return;
        e.preventDefault();
        e.stopPropagation();
        var wrap = pinB.closest(".chat-contact-swipe");
        var cbtn = wrap && wrap.querySelector(".chat-contact");
        var cid = cbtn && cbtn.dataset.chatId;
        if (!cid) return;
        var removing = pokerContactIsDialogListPinned(cid);
        pokerToggleChatDialogListPin(cid, removing);
        closeOtherSwipePanels(null);
        try {
          if (window.__pokerLastContactsApiData && typeof window.__pokerApplyContactsApiResponse === "function") {
            window.__pokerApplyContactsApiResponse(window.__pokerLastContactsApiData);
          }
        } catch (ePinApplyFast) {}
        if (typeof loadContacts === "function") loadContacts({ metaOnly: true });
      },
      true
    );
    contactsEl.addEventListener(
      "click",
      function (e) {
        var frB = e.target && e.target.closest ? e.target.closest(".chat-contact-swipe__friend") : null;
        pokerDebugChatFriendAction("click:add:received", {
          targetClassName: e.target && e.target.className ? String(e.target.className) : "",
          foundButton: !!frB,
          buttonClassName: frB && frB.className ? String(frB.className) : "",
          contactsContainsButton: !!(frB && contactsEl.contains(frB)),
        });
        if (!frB || !contactsEl.contains(frB)) return;
        if (frB.classList && frB.classList.contains("chat-contact-swipe__friend--remove")) {
          pokerDebugChatFriendAction("click:add:skipRemoveButton", {
            buttonClassName: frB.className ? String(frB.className) : "",
          });
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        var wrap = frB.closest(".chat-contact-swipe");
        var cbtn = wrap && wrap.querySelector(".chat-contact");
        var cid = cbtn && cbtn.dataset.chatId;
        var cnm = cbtn && cbtn.getAttribute("data-chat-name");
        pokerDebugChatFriendAction("click:add:resolved", {
          chatId: cid || "",
          chatName: cnm || "",
          isFriendNow: cbtn && cbtn.getAttribute("data-chat-friend") === "1",
          wrapClassName: wrap && wrap.className ? String(wrap.className) : "",
          contactButtonFound: !!cbtn,
          chatGroup: cbtn && cbtn.getAttribute ? cbtn.getAttribute("data-chat-group") : "",
        });
        if (!cid) return;
        closeOtherSwipePanels(null);
        if (typeof pokerChatAddFriendWithPrompt === "function") pokerChatAddFriendWithPrompt(cid, cnm || "", null);
      },
      true
    );
    contactsEl.addEventListener(
      "click",
      function (e) {
        var rmB = e.target && e.target.closest ? e.target.closest(".chat-contact-swipe__friend--remove") : null;
        pokerDebugChatFriendAction("click:remove:received", {
          targetClassName: e.target && e.target.className ? String(e.target.className) : "",
          foundButton: !!rmB,
          buttonClassName: rmB && rmB.className ? String(rmB.className) : "",
          contactsContainsButton: !!(rmB && contactsEl.contains(rmB)),
        });
        if (!rmB || !contactsEl.contains(rmB)) return;
        e.preventDefault();
        e.stopPropagation();
        var wrap = rmB.closest(".chat-contact-swipe");
        var cbtn = wrap && wrap.querySelector(".chat-contact");
        var cid = cbtn && cbtn.dataset.chatId;
        var prevName = cbtn && cbtn.getAttribute("data-chat-name");
        pokerDebugChatFriendAction("click:remove:resolved", {
          chatId: cid || "",
          prevName: prevName || "",
          isFriendNow: cbtn && cbtn.getAttribute("data-chat-friend") === "1",
          wrapClassName: wrap && wrap.className ? String(wrap.className) : "",
          contactButtonFound: !!cbtn,
          hasBase: !!base,
          base: base || "",
        });
        if (!cid) return;
        pokerDebugChatFriendAction("click:remove:beforeCloseOtherPanels", {
          chatId: cid || "",
        });
        try {
          closeOtherSwipePanels(null);
          pokerDebugChatFriendAction("click:remove:afterCloseOtherPanels", {
            chatId: cid || "",
          });
        } catch (eClosePanels) {
          pokerDebugChatFriendAction("click:remove:closeOtherPanelsError", {
            chatId: cid || "",
            error: eClosePanels && eClosePanels.message ? eClosePanels.message : String(eClosePanels || ""),
          });
          throw eClosePanels;
        }
        pokerDebugChatFriendAction("click:remove:beforeRemoveLocal", {
          chatId: cid || "",
        });
        try {
          pokerRemoveLocalFriendFromChatContacts(cid);
          pokerDebugChatFriendAction("click:remove:afterRemoveLocal", {
            chatId: cid || "",
          });
        } catch (eRemoveLocal) {
          pokerDebugChatFriendAction("click:remove:removeLocalError", {
            chatId: cid || "",
            error: eRemoveLocal && eRemoveLocal.message ? eRemoveLocal.message : String(eRemoveLocal || ""),
          });
          throw eRemoveLocal;
        }
        pokerDebugChatFriendAction("click:remove:afterOptimistic", {
          chatId: cid || "",
          isFriendAfterOptimistic:
            typeof pokerChatPeerIdIsFriend === "function" ? !!pokerChatPeerIdIsFriend(cid) : false,
          requestUrl: base + "/api/friends",
        });
        fetch(base + "/api/friends", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pokerApiAuthJsonBody({ targetUserId: cid })),
        })
          .then(function (r) {
            return r.json();
          })
          .then(function (d) {
            pokerDebugChatFriendAction("click:remove:response", {
              chatId: cid || "",
              ok: !!(d && d.ok),
              response: d || null,
              isFriendAfterResponse:
                typeof pokerChatPeerIdIsFriend === "function" ? !!pokerChatPeerIdIsFriend(cid) : false,
            });
            if (d && d.ok) {
              if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
              if (typeof window.chatRefresh === "function") window.chatRefresh();
            } else if (tg && tg.showAlert) {
              pokerApplyLocalFriendToChatContacts(cid, prevName || "");
              tg.showAlert((d && d.error) || "Ошибка");
            }
          })
          .catch(function () {
            pokerDebugChatFriendAction("click:remove:error", {
              chatId: cid || "",
              requestUrl: base + "/api/friends",
            });
            pokerApplyLocalFriendToChatContacts(cid, prevName || "");
            if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
          });
      },
      true
    );
    function onDocMove(e) {
      if (!swipeState || e.pointerId !== swipeState.ptrId) return;
      var dx = e.clientX - swipeState.startX;
      var dy = e.clientY - swipeState.startY;
      if (swipeState.mode == null) {
        var adx = Math.abs(dx);
        var ady = Math.abs(dy);
        /* Вертикаль только при явном скролле — иначе легкий наклон перехватывал список и срывал свайп. */
        if (ady > 22 && ady > adx * 1.35) {
          swipeState.mode = "vert";
          return;
        }
        /* Горизонталь при доминировании по X (в т.ч. диагональ «в сторону»). */
        if (adx > 10 && adx >= ady * 0.92) {
          swipeState.mode = "horiz";
          swipeState.panel.classList.add("chat-contact-swipe__panel--dragging");
          var wHoriz = swipeState.panel.closest(".chat-contact-swipe");
          if (wHoriz) wHoriz.classList.add("chat-contact-swipe--show-actions");
          closeOtherSwipePanels(swipeState.panel);
          try {
            swipeState.panel.setPointerCapture(e.pointerId);
          } catch (eCap) {}
        } else {
          return;
        }
      }
      if (swipeState.mode !== "horiz") return;
      e.preventDefault();
      var rev = swipeState.revealPx || 52;
      var tx = Math.max(-rev, Math.min(0, swipeState.startTx + dx));
      swipeState.panel.style.transform = "translateX(" + tx + "px)";
      if (Math.abs(dx) > 14) swipeState.didAxisDrag = true;
    }
    function onDocUp(e) {
      if (!swipeState || e.pointerId !== swipeState.ptrId) return;
      var st = swipeState;
      swipeState = null;
      try {
        if (st.panel && st.panel.releasePointerCapture) st.panel.releasePointerCapture(e.pointerId);
      } catch (eRel) {}
      document.removeEventListener("pointermove", onDocMove, true);
      document.removeEventListener("pointerup", onDocUp, true);
      document.removeEventListener("pointercancel", onDocUp, true);
      if (st.mode !== "horiz") return;
      if (st.panel) st.panel.classList.remove("chat-contact-swipe__panel--dragging");
      var txNow = getPanelTx(st.panel);
      var revUp = st.revealPx || 52;
      var snapOpen = txNow <= -revUp / 2;
      snapPanel(st.panel, snapOpen);
      var wUp = st.panel.closest(".chat-contact-swipe");
      if (wUp) wUp.classList.toggle("chat-contact-swipe--show-actions", !!snapOpen);
      if (st.didAxisDrag) {
        var cInner = st.panel.querySelector(".chat-contact");
        if (cInner) cInner._suppressNextClickUntil = Date.now() + 420;
      }
    }
    contactsEl.addEventListener(
      "pointerdown",
      function (e) {
        if (e.pointerType === "mouse" && e.button != null && e.button !== 0) return;
        var panel = e.target && e.target.closest ? e.target.closest(".chat-contact-swipe__panel") : null;
        if (!panel || !contactsEl.contains(panel)) return;
        if (e.target.closest && e.target.closest(".chat-contact-swipe__pin")) return;
        if (e.target.closest && e.target.closest(".chat-contact-swipe__friend")) return;
        var revealPx = getSwipeRevealPx(panel);
        if (swipeState) {
          document.removeEventListener("pointermove", onDocMove, true);
          document.removeEventListener("pointerup", onDocUp, true);
          document.removeEventListener("pointercancel", onDocUp, true);
          if (swipeState.panel) {
            swipeState.panel.classList.remove("chat-contact-swipe__panel--dragging");
            var wPr = swipeState.panel.closest(".chat-contact-swipe");
            if (wPr && !swipeState.panel.classList.contains("chat-contact-swipe__panel--open")) {
              wPr.classList.remove("chat-contact-swipe--show-actions");
            }
          }
          swipeState = null;
        }
        swipeState = {
          ptrId: e.pointerId,
          startX: e.clientX,
          startY: e.clientY,
          startTx: getPanelTx(panel),
          panel: panel,
          mode: null,
          didAxisDrag: false,
          revealPx: revealPx,
        };
        document.addEventListener("pointermove", onDocMove, true);
        document.addEventListener("pointerup", onDocUp, true);
        document.addEventListener("pointercancel", onDocUp, true);
      },
      { passive: true }
    );
    var listScroll = document.querySelector(".chat-dialogs-list");
    if (listScroll && !listScroll._chatSwipeScrollCloseBound) {
      listScroll._chatSwipeScrollCloseBound = true;
      listScroll.addEventListener(
        "scroll",
        function () {
          closeOtherSwipePanels(null);
        },
        { passive: true }
      );
    }
  })();

  function loadAdminsOnline() {
    if (!adminsView || !pokerApiHasCredential()) return;
    var url = base + "/api/chat" + pokerApiAuthQuery("?") + "&mode=adminOnline";
    fetch(url, { cache: "no-store" }).then(function (r) { return r.json(); }).then(function (data) {
      if (!data || !data.ok || !Array.isArray(data.onlineAdminIds)) return;
      var onlineSet = new Set(data.onlineAdminIds);
      adminsView.querySelectorAll(".chat-manager-btn[data-chat-user-id]").forEach(function (btn) {
        var id = btn.dataset.chatUserId;
        var onEl = btn.querySelector(".chat-admins-view__online");
        if (onEl) onEl.classList.toggle("chat-admins-view__online--visible", onlineSet.has(id));
      });
    }).catch(function () {});
  }

  function prepareChatDeleteConfirm() {
    try {
      var active = document.activeElement;
      if (active && active === chatComposerEl && typeof active.blur === "function") {
        active.blur();
      }
    } catch (e) {}
    if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
      window.__pokerFinalizeChatKeyboardDismiss();
    } else {
      if (typeof window.__pokerClearChatKeyboardViewportState === "function") {
        window.__pokerClearChatKeyboardViewportState();
      }
    }
  }

  function renderMessages(messages) {
    if (!messagesEl) return;
    if (Array.isArray(messages) && messages.length > POKER_CHAT_DISK_PERSONAL_MAX_MSG) {
      messages = messages.slice(-POKER_CHAT_DISK_PERSONAL_MAX_MSG);
      if (chatWithUserId) personalMessagesCache[chatWithUserId] = messages;
    }
    var personalMsgWrapEarly = messagesEl.parentElement;
    var openingForceBottomP = scrollPersonalToBottomOnNextRender;
    try {
      pokerMaybeClearSelfPinIfIdMissing("personal", chatWithUserId, messages);
    } catch (ePinPM) {}
    if (!messages || messages.length === 0) {
      if (personalMsgWrapEarly && personalMsgWrapEarly.classList) {
        personalMsgWrapEarly.classList.remove("chat-messages-wrap--settling");
      }
      messagesEl.innerHTML = '<p class="chat-empty">Нет сообщений.</p>';
      try {
        refreshChatSelfPinBars();
      } catch (ePinPM2) {}
      try {
        scheduleSyncChatScrollBottomButtons();
      } catch (eSbPE) {}
      return;
    }
    var activePeerForRender = chatWithUserId ? String(chatWithUserId) : "";
    var hasMoreBeforePersonal = !!(activePeerForRender && personalHasMoreBeforeByPeer[activePeerForRender]);
    var bodyHtml = buildPersonalMessagesBodyHtml(messages);
    var html = (hasMoreBeforePersonal ? renderLoadOlderButtonHtml("personal") : "") + bodyHtml;
    if (personalMsgWrapEarly && personalMsgWrapEarly.classList) {
      personalMsgWrapEarly.classList.remove("chat-messages-wrap--settling");
    }
    var prevScrollTopP = messagesEl.scrollTop;
    var prevScrollHeightP = messagesEl.scrollHeight;
    var wasNearBottomP = prevScrollHeightP - prevScrollTopP - messagesEl.clientHeight < 80;
    messagesEl.innerHTML = html;
    function restoreScrollP(clearScrollFlag) {
      var maxScrollP = messagesEl.scrollHeight - messagesEl.clientHeight;
      if (openingForceBottomP || wasNearBottomP || maxScrollP <= 0) {
        messagesEl.scrollTop = messagesEl.scrollHeight;
        if (clearScrollFlag && openingForceBottomP) scrollPersonalToBottomOnNextRender = false;
      } else {
        messagesEl.scrollTop = Math.min(prevScrollTopP, Math.max(0, maxScrollP));
      }
    }
    if (openingForceBottomP) {
      try {
        if (personalMsgWrapEarly && personalMsgWrapEarly.classList && /chat-msg__image/.test(bodyHtml)) {
          personalMsgWrapEarly.classList.add("chat-messages-wrap--settling");
        }
      } catch (eSettlePFlag) {}
      try {
        messagesEl.scrollTop = messagesEl.scrollHeight;
      } catch (eScP0) {}
      var rafOpenP = requestAnimationFrame || function (fn) { setTimeout(fn, 16); };
      rafOpenP(function () {
        applyChatMsgTallTextTimeBelowLayout(messagesEl);
        try {
          messagesEl.scrollTop = messagesEl.scrollHeight;
        } catch (eScP1) {}
        scrollPersonalToBottomOnNextRender = false;
        try {
          messagesEl.__pokerChatOpeningStickBottom = true;
        } catch (eStickOP) {}
        pinChatMessagesToBottomImagesOnly(messagesEl);
        try {
          if (typeof window.__pokerScheduleSyncChatScrollBottomButtons === "function") {
            window.__pokerScheduleSyncChatScrollBottomButtons();
          }
        } catch (eSbP) {}
        settleChatOpeningMediaLayout(messagesEl, personalMsgWrapEarly, function () {
          try {
            messagesEl.scrollTop = messagesEl.scrollHeight;
          } catch (eScP2) {}
        });
        rafOpenP(function () {
          try {
            messagesEl.scrollTop = messagesEl.scrollHeight;
          } catch (eScP3) {}
        });
      });
    } else {
      restoreScrollP(false);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          applyChatMsgTallTextTimeBelowLayout(messagesEl);
          restoreScrollP(true);
          if (wasNearBottomP) {
            pinChatMessagesToBottom(messagesEl, false);
          }
        });
      });
    }
    messagesEl.querySelectorAll(".chat-msg__delete").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.dataset.msgId;
        if (!id) return;
        prepareChatDeleteConfirm();
        if (!confirm("Удалить сообщение?")) return;
        fetch(base + "/api/chat", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pokerApiAuthJsonBody({ messageId: id, with: chatWithUserId })),
        }).then(function (r) { return r.json(); }).then(function (d) {
          if (d && d.ok) loadMessages();
        });
      });
    });
    messagesEl.querySelectorAll("[data-chat-load-older=\"personal\"]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (typeof window.__pokerLoadOlderPersonalMessages === "function") window.__pokerLoadOlderPersonalMessages();
      });
    });
    messagesEl.querySelectorAll(".chat-msg__edit").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var msgId = btn.dataset.msgId;
        var oldText = (btn.dataset.msgText || "").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        if (!msgId) return;
        startChatEdit("personal", msgId, oldText, resolveMyChatDisplayName() || "Игрок");
      });
    });
    messagesEl.querySelectorAll(".chat-msg__respect-row[data-user-id]").forEach(function (row) {
      row.addEventListener("click", function () {
        var id = row.dataset.userId;
        if (!id || !pokerApiHasCredential() || !base) return;
        if (typeof window.pokerOpenRespectVotersModal === "function") {
          window.pokerOpenRespectVotersModal(id);
        }
      });
    });
    attachContextMenuForOthers(messagesEl, "personal", messagesEl);
    try {
      refreshChatSelfPinBars();
    } catch (ePinRfP) {}
    try {
      scheduleSyncChatScrollBottomButtons();
    } catch (eSbP) {}
    bindChatMsgNameProfileButtons(messagesEl);
  }

  function renderDialogPreviewMessagesInto(targetEl, messages) {
    if (!targetEl) return;
    var CHAT_DIALOG_PREVIEW_MAX = 50;
    var slice =
      messages && messages.length > CHAT_DIALOG_PREVIEW_MAX ? messages.slice(-CHAT_DIALOG_PREVIEW_MAX) : messages;
    if (!slice || slice.length === 0) {
      targetEl.innerHTML = '<p class="chat-empty">Нет сообщений.</p>';
      return;
    }
    function personalReceiptHtmlPrev(m, isOwn) {
      if (!isOwn) return "";
      var receipt = typeof getPersonalReceiptState === "function"
        ? getPersonalReceiptState(m, isOwn)
        : { delivered: false, read: false };
      var textTicks = receipt.delivered ? "✓✓" : "✓";
      var cls =
        "chat-msg__ticks" +
        (receipt.delivered ? " chat-msg__ticks--delivered" : " chat-msg__ticks--sent") +
        (receipt.read ? " chat-msg__ticks--read" : "");
      return '<div class="' + cls + '" aria-hidden="true">' + textTicks + "</div>";
    }
    var myIdRenderP = resolveMyChatMemberId();
    var html = slice
      .map(function (m, i) {
        var prev = i > 0 ? slice[i - 1] : null;
        var next = i < slice.length - 1 ? slice[i + 1] : null;
        var sameUser = function (a, b) {
          if (!a || !b || a.from == null || a.from === "" || b.from == null || b.from === "") return false;
          return peerChatIdsEqual(a.from, b.from);
        };
        var isFirstInGroup = !prev || !sameUser(prev, m);
        var isLastInGroup = !next || !sameUser(next, m);
        var isOwn = !!(myIdRenderP && peerChatIdsEqual(m.from, myIdRenderP));
        var cls = (isOwn ? "chat-msg chat-msg--own" : "chat-msg chat-msg--other") + " chat-msg--dialog-preview";
        var time = m.time ? new Date(m.time).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }) : "";
        var text = chatMessageBodyHtml(m);
        var imgBlock = m.image
          ? '<img class="chat-msg__image" src="' +
            escapeHtml(pokerChatDisplayImageSrc(m.image)) +
            '" alt="Картинка"' +
            chatMsgImageAttrs(i, slice.length) +
            " />"
          : "";
        var editedBadge = m.edited ? '<span class="chat-msg__edited">(отредактировано)</span>' : "";
        var ticksPrevDlg = personalReceiptHtmlPrev(m, isOwn);
        var voiceOnlyPrevDlg = chatMsgVoiceOnlyNoCaption(m);
        var voiceBlock = m.voice
          ? chatVoiceMessageHtml(
              m.voice,
              voiceOnlyPrevDlg
                ? { footerToolbarHtml: '<span class="chat-msg__time">' + time + "</span>" + editedBadge + ticksPrevDlg }
                : undefined
            )
          : "";
        var documentBlock = m.document ? chatDocumentBlockHtml(m.document, m.documentName || "document.pdf") : "";
        var replyBlock = m.replyTo
          ? '<div class="chat-msg__reply"><strong>' +
            escapeHtml(m.replyTo.fromName || "Игрок") +
            ":</strong> " +
            escapeHtml(String(m.replyTo.text || "").slice(0, 80)) +
            (String(m.replyTo.text || "").length > 80 ? "…" : "") +
            "</div>"
          : "";
        var adminBadge = m.fromAdmin ? '<span class="chat-msg__admin">(админ)</span>' : "";
        var avLetter = (m.fromName && m.fromName.charAt(0)) || (m.from && m.from.charAt(1)) || "И";
        var avatarEl = isLastInGroup
          ? m.fromAvatar
            ? '<img class="chat-msg__avatar" src="' +
              escapeHtml(m.fromAvatar) +
              '" alt=""' +
              CHAT_MSG_AVATAR_IMG_ATTRS +
              " />"
            : '<span class="chat-msg__avatar chat-msg__avatar--placeholder">' + escapeHtml(avLetter) + "</span>"
          : '<span class="chat-msg__avatar-spacer"></span>';
        var nameElP = "";
        if (!isOwn) {
          var nameStrP = escapeHtml(m.fromName || "Игрок");
          var statusLevelP = m.fromStatusLevel != null && m.fromStatusLevel !== "" ? pokerProfileStatusFishLevel(m.fromStatusLevel) : "";
          var levelStrP = chatProfileStatusLevelHtml(statusLevelP);
          var fishIconStrP = pokerProfileStatusFishIconHtml(statusLevelP, "chat-msg__status-fish");
          var verifiedStrP = chatPokerPlusVerifiedBadgeHtml(m.fromPokerPlusVerified);
          var respectValP =
            m.fromRespect !== undefined && m.fromRespect !== null
              ? m.fromRespect === 0
                ? "\u2014"
                : String(m.fromRespect)
              : "\u2014";
          var respectClassP = "chat-msg__respect";
          if (m.fromRespect > 0) respectClassP += " chat-msg__respect--positive";
          else if (m.fromRespect < 0) respectClassP += " chat-msg__respect--negative";
          var metaLineTopP =
            '<div class="chat-msg__meta-line">' +
            '<span class="chat-msg__name">' +
            nameStrP +
            "</span>" +
            verifiedStrP +
            levelStrP +
            fishIconStrP +
            "</div>";
          var respectPartP =
            '<span class="chat-msg__respect-row chat-msg__respect-inline"><span class="' +
            respectClassP +
            '" title="Уважение в чате">Ув: ' +
            escapeHtml(respectValP) +
            "</span></span>";
          var metaLineRespectP = '<div class="chat-msg__meta-line chat-msg__meta-sub">' + respectPartP + "</div>";
          var pmAvatarAttrPrev = m.fromAvatar ? ' data-pm-avatar="' + escapeHtml(m.fromAvatar) + '"' : "";
          nameElP =
            '<div class="chat-msg__meta-stack"><button type="button" class="chat-msg__name-btn" data-pm-id="' +
            escapeHtml(m.from || "") +
            '" data-pm-name="' +
            escapeHtml(m.fromName || m.fromDtId || "Игрок") +
            '"' +
            pmAvatarAttrPrev +
            ">" +
            metaLineTopP +
            "</button>" +
            metaLineRespectP +
            "</div>";
        }
        var textBlock =
          text || imgBlock || voiceBlock || documentBlock
            ? '<div class="chat-msg__text">' + imgBlock + voiceBlock + documentBlock + text + "</div>"
            : "";
        var reactionsHtmlP = "";
        if (m.id && m.reactions && typeof m.reactions === "object") {
          var emKeysPrev = [];
          for (var emp in m.reactions) {
            if (
              Object.prototype.hasOwnProperty.call(m.reactions, emp) &&
              Array.isArray(m.reactions[emp]) &&
              m.reactions[emp].length > 0
            ) {
              emKeysPrev.push(emp);
            }
          }
          var pillsP = [];
          sortChatReactionEmojiKeys(emKeysPrev).forEach(function (emp) {
            var countP = m.reactions[emp].length;
            pillsP.push(
              '<span class="chat-dialog-preview__reaction-pill">' +
                escapeHtml(emp) +
                ' <span class="chat-msg__reaction-count">' +
                countP +
                "</span></span>"
            );
          });
          reactionsHtmlP = pillsP.join("");
        }
        var reactionsRowP = reactionsHtmlP
          ? '<div class="chat-msg__reactions-wrap"><span class="chat-msg__reactions">' + reactionsHtmlP + "</span></div>"
          : "";
        var metaBlockP = isFirstInGroup ? nameElP + adminBadge : "";
        var bodyClassP =
          "chat-msg__body" +
          (text && text.trim() ? " chat-msg__body--has-text" : "") +
          (isOwn && m.image ? " chat-msg__body--own-image" : "");
        var footerHtmlP = voiceOnlyPrevDlg
          ? ""
          : '<div class="chat-msg__footer">' +
            '<span class="chat-msg__time">' +
            time +
            "</span>" +
            editedBadge +
            ticksPrevDlg +
            "</div>";
        var bodyMainClsP =
          "chat-msg__body-main" +
          (!textBlock ? " chat-msg__body-main--solo-footer" : "") +
          (m.image ? " chat-msg__body-main--with-image" : "") +
          (voiceOnlyPrevDlg ? " chat-msg__body-main--voice-inline-time" : "");
        var bodyMainHtmlP = '<div class="' + bodyMainClsP + '">' + textBlock + footerHtmlP + "</div>";
        var dayDividerP = chatDayDividerHtmlBeforeMessage(prev, m);
        return (
          dayDividerP +
          '<div class="' +
          cls +
          '"><div class="chat-msg__row">' +
          avatarEl +
          '<div class="' +
          bodyClassP +
          '"><div class="chat-msg__meta">' +
          metaBlockP +
          "</div>" +
          replyBlock +
          bodyMainHtmlP +
          reactionsRowP +
          "</div></div></div>"
        );
      })
      .join("");
    targetEl.innerHTML = html;
    bindChatMsgNameProfileButtons(targetEl);
    try {
      applyChatMsgTallTextTimeBelowLayout(targetEl);
    } catch (eLayoutPrev) {}
    requestAnimationFrame(function () {
      targetEl.scrollTop = targetEl.scrollHeight;
    });
  }

  function closeChatDialogPreviewModal() {
    var modal = document.getElementById("chatDialogPreviewModal");
    if (!modal) return;
    modal.classList.remove("chat-dialog-preview-modal--open");
    modal.setAttribute("aria-hidden", "true");
    try {
      syncChatDialogPreviewAddFriendBtn();
    } catch (eClsPrev) {}
  }

  function openChatDialogPreviewModal(userId, userName, peerP21Id) {
    var modal = document.getElementById("chatDialogPreviewModal");
    var titleEl = document.getElementById("chatDialogPreviewTitle");
    var subEl = document.getElementById("chatDialogPreviewSub");
    var prevMsgEl = document.getElementById("chatDialogPreviewMessages");
    var avatarEl = document.getElementById("chatDialogPreviewAvatar");
    var avatarPh = document.getElementById("chatDialogPreviewAvatarPlaceholder");
    if (!modal || !prevMsgEl || !userId || !base) return;
    if (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) return;
    modal.dataset.previewUserId = userId;
    modal.dataset.previewUserName = userName || "";
    modal.dataset.previewP21Id = peerP21Id || "";
    if (titleEl) titleEl.textContent = userName || userId;
    if (subEl) {
      subEl.textContent = "";
    }
    if (avatarEl) {
      avatarEl.style.display = "none";
      avatarEl.removeAttribute("src");
      avatarEl.onerror = null;
    }
    if (avatarPh) {
      var ini = (userName || userId || "?").trim().charAt(0) || "?";
      avatarPh.textContent = ini.toUpperCase();
      avatarPh.style.display = "flex";
    }
    var previewSnapshot = getPersonalMessagesSnapshotForOpen(userId);
    if (previewSnapshot && Array.isArray(previewSnapshot.messages) && previewSnapshot.messages.length) {
      renderDialogPreviewMessagesInto(prevMsgEl, previewSnapshot.messages);
    } else {
      prevMsgEl.innerHTML = '<p class="chat-empty">Загрузка…</p>';
    }
    modal.classList.add("chat-dialog-preview-modal--open");
    modal.setAttribute("aria-hidden", "false");
    try {
      syncChatDialogPreviewAddFriendBtn();
    } catch (eSyncPrev0) {}
    var url =
      base + "/api/chat" + pokerApiAuthQuery("?") + "&with=" + encodeURIComponent(userId) + "&trackSeen=0&fastOpen=1";
    fetch(url, { cache: "no-store" })
      .then(function (r) {
        return r.json().catch(function () {
          return { ok: false, error: "Ошибка ответа" };
        });
      })
      .then(function (data) {
        if (!modal.classList.contains("chat-dialog-preview-modal--open")) return;
        if (modal.dataset.previewUserId !== userId) return;
        if (!data || !data.ok) {
          prevMsgEl.innerHTML =
            '<p class="chat-empty">' + escapeHtml((data && data.error) || "Не удалось загрузить сообщения") + "</p>";
          return;
        }
        var p21v = data.otherP21Id != null && String(data.otherP21Id).trim() !== "" ? String(data.otherP21Id).trim() : "";
        if (p21v) modal.dataset.previewP21Id = p21v;
        if (subEl) {
          subEl.textContent = "";
        }
        var av = data.otherAvatar != null && String(data.otherAvatar).trim() ? String(data.otherAvatar).trim() : "";
        if (av && avatarEl && avatarPh) {
          avatarEl.onerror = function () {
            avatarEl.style.display = "none";
            avatarPh.style.display = "flex";
          };
          avatarEl.src = av;
          avatarEl.style.display = "";
          avatarPh.style.display = "none";
        }
        renderDialogPreviewMessagesInto(prevMsgEl, data.messages || []);
        try {
          syncChatDialogPreviewAddFriendBtn();
        } catch (eSyncPrev1) {}
      })
      .catch(function () {
        if (!modal.classList.contains("chat-dialog-preview-modal--open")) return;
        if (modal.dataset.previewUserId !== userId) return;
        prevMsgEl.innerHTML = '<p class="chat-empty">Ошибка сети</p>';
      });
  }

  (function bindChatDialogPreviewModalOnce() {
    var modal = document.getElementById("chatDialogPreviewModal");
    if (!modal || modal._chatDialogPreviewModalBound) return;
    modal._chatDialogPreviewModalBound = true;
    var backdrop = document.getElementById("chatDialogPreviewBackdrop");
    var closeBtn = document.getElementById("chatDialogPreviewClose");
    var openBtn = document.getElementById("chatDialogPreviewOpenBtn");
    function onBackdrop(e) {
      if (e.target === backdrop) closeChatDialogPreviewModal();
    }
    if (backdrop) backdrop.addEventListener("click", onBackdrop);
    if (closeBtn) closeBtn.addEventListener("click", closeChatDialogPreviewModal);
    if (openBtn) {
      openBtn.addEventListener("click", function () {
        var uid = modal.dataset.previewUserId;
        var uname = modal.dataset.previewUserName;
        var p21 = modal.dataset.previewP21Id;
        if (!uid) return;
        closeChatDialogPreviewModal();
        openConvFromDialogs(uid, uname, p21);
      });
    }
    var addFrPrev = document.getElementById("chatDialogPreviewAddFriendBtn");
    if (addFrPrev) {
      addFrPrev.addEventListener("click", function () {
        var uid = modal.dataset.previewUserId;
        var uname = modal.dataset.previewUserName || "";
        if (!uid || addFrPrev.disabled) return;
        addFrPrev.disabled = true;
        pokerChatAddFriendWithPrompt(uid, uname, function () {
          try {
            addFrPrev.disabled = false;
          } catch (eEn) {}
        });
      });
    }
  })();

  var chatPersonalLoader = initChatPersonalLoader({
    base: base,
    POKER_NET_ERR: POKER_NET_ERR,
    escapeHtml: escapeHtml,
    pokerApiAuthQuery: pokerApiAuthQuery,
    getChatWithUserId: function () { return chatWithUserId; },
    getChatWithUserName: function () { return chatWithUserName; },
    setChatWithUserName: function (value) { chatWithUserName = value; },
    getChatWithPeerAvatarUrl: function () { return chatWithPeerAvatarUrl; },
    setChatWithPeerAvatarUrl: function (value) { chatWithPeerAvatarUrl = value; },
    getMessagesEl: function () { return messagesEl; },
    getConvView: function () { return convView; },
    getConvTitle: function () { return convTitle; },
    getConvTitleId: function () { return convTitleId; },
    getConvPeerAvatarPh: function () { return convPeerAvatarPh; },
    getConvPeerAvatar: function () { return convPeerAvatar; },
    getChatLongPollTimeoutMs: function () { return CHAT_LONG_POLL_TIMEOUT_MS; },
    getPersonalBurstUntil: function () { return chatBurstUntilByScope.personal || 0; },
    getPersonalHasMoreBefore: function (peerId) { return !!personalHasMoreBeforeByPeer[peerId]; },
    setPersonalHasMoreBefore: function (peerId, value) { personalHasMoreBeforeByPeer[peerId] = !!value; },
    setChatIsAdmin: function (value) { chatIsAdmin = !!value; },
    setChatPeerTypingActive: function (value) { chatPeerTypingActive = !!value; },
    setConvGroupCanChangeAvatar: function (value) { convGroupCanChangeAvatar = !!value; },
    getChatActiveTab: function () { return chatActiveTab; },
    getChatIsEditingMessage: function () { return chatIsEditingMessage; },
    getLastPersonalMessagesSig: function () { return lastPersonalMessagesSig; },
    setLastPersonalMessagesSig: function (value) { lastPersonalMessagesSig = value; },
    getOptimisticPersonalPayload: function () { return chatOutgoingState.optimisticPersonalPayload; },
    peerChatIdsEqual: peerChatIdsEqual,
    pokerChatRecordTrace: pokerChatRecordTrace,
    pokerChatScheduleLongPoll: pokerChatScheduleLongPoll,
    mergeOptimisticPersonalIntoMessages: mergeOptimisticPersonalIntoMessages,
    mergeIncomingPushPersonalIntoMessages: mergeIncomingPushPersonalIntoMessages,
    dedupePersonalMessagesForRender: dedupePersonalMessagesForRender,
    pokerChatMessageHasPersistedId: pokerChatMessageHasPersistedId,
    setTextContentIfChanged: setTextContentIfChanged,
    resolveMyChatMemberId: resolveMyChatMemberId,
    enrichPersonalThreadPeerMeta: enrichPersonalThreadPeerMeta,
    setChatConvTitleIdText: setChatConvTitleIdText,
    setChatPeerVerified: setChatPeerVerified,
    setChatConvTitleFish: setChatConvTitleFish,
    updateConvTypingUi: updateConvTypingUi,
    syncConvGroupAvatarEditUi: syncConvGroupAvatarEditUi,
    applyConvPeerAvatarHeader: applyConvPeerAvatarHeader,
    pokerChatRequestPollBurst: pokerChatRequestPollBurst,
    normalizePeerIdForChat: normalizePeerIdForChat,
    lastViewedPersonal: lastViewedPersonal,
    pokerChatMessageIsNewerThanViewed: pokerChatMessageIsNewerThanViewed,
    pokerApiHasCredential: pokerApiHasCredential,
    pokerReadChatMessageSoundEnabled: pokerReadChatMessageSoundEnabled,
    pokerPlayChatMessageNotificationSound: pokerPlayChatMessageNotificationSound,
    saveChatLastViewed: saveChatLastViewed,
    personalRenderSignature: personalRenderSignature,
    pokerWritePersonalPeerSnapshotToDisk: pokerWritePersonalPeerSnapshotToDisk,
    chatMessagesDomHasOptimisticNode: chatMessagesDomHasOptimisticNode,
    canFastAppendMessages: canFastAppendMessages,
    fastAppendChatMessages: fastAppendChatMessages,
    buildPersonalMessagesBodyHtml: buildPersonalMessagesBodyHtml,
    bindChatMsgNameProfileButtons: bindChatMsgNameProfileButtons,
    attachContextMenuForOthers: attachContextMenuForOthers,
    refreshChatSelfPinBars: refreshChatSelfPinBars,
    scheduleSyncChatScrollBottomButtons: scheduleSyncChatScrollBottomButtons,
    schedulePersonalRender: schedulePersonalRender,
    scheduleChatPostRenderSync: scheduleChatPostRenderSync,
    updateChatHeaderStats: updateChatHeaderStats,
    applyConvGroupDescription: applyConvGroupDescription,
    updateUnreadDots: updateUnreadDots,
    renderMessages: renderMessages,
    fastPrependChatMessages: fastPrependChatMessages,
  });
  var loadMessages = chatPersonalLoader.loadMessages;

  var sendingPrivate = false;
  var chatPersonalSender = initChatPersonalSender({
    base: base,
    tg: tg,
    POKER_NET_ERR: POKER_NET_ERR,
    chatOutgoingState: chatOutgoingState,
    escapeHtml: escapeHtml,
    getMessagesEl: function () { return messagesEl; },
    getChatMsgAvatarImgAttrs: function () { return CHAT_MSG_AVATAR_IMG_ATTRS; },
    getSendingPrivate: function () { return sendingPrivate; },
    setSendingPrivate: function (value) { sendingPrivate = !!value; },
    getChatWithUserId: function () { return chatWithUserId; },
    getPersonalImage: function () { return personalImage; },
    setPersonalImage: function (value) { personalImage = value; },
    getPersonalVoice: function () { return personalVoice; },
    setPersonalVoice: function (value) { personalVoice = value; },
    getPersonalDocument: function () { return personalDocument; },
    setPersonalDocument: function (value) { personalDocument = value; },
    getPersonalReplyTo: function () { return personalReplyTo; },
    setPersonalReplyTo: function (value) { personalReplyTo = value; },
    getChatEditMode: function () { return chatEditMode; },
    getChatEditSource: function () { return chatEditSource; },
    getChatEditMessageId: function () { return chatEditMessageId; },
    getChatComposerMounted: function () { return chatComposerMounted; },
    getChatComposerEl: function () { return chatComposerEl; },
    clearPersonalComposerDraft: function () { chatComposerDrafts.personal = ""; },
    getChatTypingStopTimer: function () { return chatTypingStopTimer; },
    setChatTypingStopTimer: function (value) { chatTypingStopTimer = value; },
    pokerEnsureChatTelegramVerified: typeof pokerEnsureChatTelegramVerified === "function" ? pokerEnsureChatTelegramVerified : null,
    getChatPersonalText: getChatPersonalText,
    pokerApiHasCredential: pokerApiHasCredential,
    pokerReadPwaGuestMode: pokerReadPwaGuestMode,
    setPersonalSendBusy: setPersonalSendBusy,
    pokerApiAuthJsonBody: pokerApiAuthJsonBody,
    patchCachedEditedMessage: patchCachedEditedMessage,
    applyEditedMessageToDom: applyEditedMessageToDom,
    clearChatEditUI: clearChatEditUI,
    chatMsgElById: chatMsgElById,
    loadMessages: function (opts) { return loadMessages(opts); },
    pokerChatDisplayImageSrc: pokerChatDisplayImageSrc,
    chatVoiceMessageHtml: chatVoiceMessageHtml,
    chatDocumentBlockHtml: chatDocumentBlockHtml,
    linkTgUsernames: linkTgUsernames,
    linkAppIds: linkAppIds,
    linkUrls: linkUrls,
    appendChatVoiceToTextWrap: appendChatVoiceToTextWrap,
    applyChatMsgTallTextTimeBelowLayout: applyChatMsgTallTextTimeBelowLayout,
    resolveMyChatDisplayName: resolveMyChatDisplayName,
    resolveMyChatMemberId: resolveMyChatMemberId,
    pokerChatSendTypingState: pokerChatSendTypingState,
    pinChatMessagesToBottom: typeof pinChatMessagesToBottom === "function" ? pinChatMessagesToBottom : null,
    pokerChatRunAfterPaint: pokerChatRunAfterPaint,
    resizeChatTextarea: resizeChatTextarea,
    updatePersonalSendBtnIcon: updatePersonalSendBtnIcon,
    shouldAutoFocusChatComposerOnDesktop: shouldAutoFocusChatComposerOnDesktop,
    focusChatComposerForDesktop: focusChatComposerForDesktop,
    pokerChatRecordTrace: pokerChatRecordTrace,
    pokerChatRequestPollBurst: pokerChatRequestPollBurst,
    pokerChatRefreshLongPollTargets: pokerChatRefreshLongPollTargets,
    pokerChatMessageHasPersistedId: pokerChatMessageHasPersistedId,
    setLastPersonalMessagesSig: function (value) { lastPersonalMessagesSig = value; },
    chatCloneRetryPayload: chatCloneRetryPayload,
    markLatestOptimisticMessageFailed: markLatestOptimisticMessageFailed,
  });
  var appendOptimisticPersonalMessage = chatPersonalSender.appendOptimisticPersonalMessage;
  var sendMessage = chatPersonalSender.sendMessage;

  /**
   * Фоновое обновление кэшей чата (contacts + general, trackSeen=0) до захода на вкладку «Чат».
   * Не трогает lastViewed / звук; DOM списка обновляет только если уже data-view=chat.
   */
  function ingestBootstrapGeneralSnapshot(data) {
    if (!data || !data.ok) return;
    chatIsAdmin = !!data.isAdmin;
    if (data.clubChatAccess != null) clubChatAccess = data.clubChatAccess;
    if (data.clubChatPendingReviewCount != null) {
      window.chatClubPendingReviewCount = Math.max(0, parseInt(data.clubChatPendingReviewCount, 10) || 0);
    } else if (!data.isAdmin) {
      window.chatClubPendingReviewCount = 0;
    }
    var access = data.clubChatAccess != null ? data.clubChatAccess : "open";
    var noGeneralAccess = !chatIsAdmin && (access === "need_apply" || access === "pending" || access === "revoked");
    var messages = data.messages || [];
    if (noGeneralAccess) messages = [];
    var pendingBg = window._pendingGeneralMessage;
    if (pendingBg && pendingBg.id && !messages.some(function (m) { return m.id === pendingBg.id; })) {
      messages = messages.concat([pendingBg]);
    } else if (pendingBg && pendingBg.id) {
      window._pendingGeneralMessage = null;
    }
    messages = mergeOptimisticGeneralIntoMessages(messages);
    window._chatGeneralCache = {
      messages: messages,
      participantsCount: data.participantsCount,
      onlineCount: data.onlineCount,
      generalPinned: data.generalPinned != null ? data.generalPinned : null,
      generalMembers: Array.isArray(data.generalMembers) ? data.generalMembers : [],
    };
    if (!noGeneralAccess) {
      try {
        pokerWriteGeneralSnapshotToDisk(window._chatGeneralCache);
      } catch (eSnapB) {}
    }
    try {
      refreshChatSelfPinBars();
    } catch (ePinB) {}
    var totalB = data.participantsCount != null ? data.participantsCount : "—";
    window.lastGeneralStats = totalB !== "—" ? String(totalB) + " уч" : "";
    try {
      updateChatHeaderStats();
    } catch (eHdrB) {}
    try {
      syncClubChatRosterUi();
    } catch (eRosterB) {}
    try {
      if (typeof updateClubChatPreview === "function") updateClubChatPreview(messages);
    } catch (ePrevB) {}
    try {
      if (typeof updateDialogUnreadBadges === "function") updateDialogUnreadBadges();
    } catch (eDlgB) {}
  }

  function pokerPrefetchDiskPeersWarmup() {
    try {
      pokerHydrateChatSnapshotsFromDisk();
    } catch (eHydW) {}
    var idx = 0;
    for (var pk in personalMessagesCache) {
      if (!Object.prototype.hasOwnProperty.call(personalMessagesCache, pk)) continue;
      if (idx >= 20) break;
      var pid = String(pk);
      if (!pid) continue;
      if (chatWithUserId && peerChatIdsEqual(chatWithUserId, pid)) continue;
      (function (idWarm, delayMs) {
        setTimeout(function () {
          try {
            prefetchPersonalMessages(idWarm);
          } catch (ePf) {}
        }, delayMs);
      })(pid, idx * 40);
      idx++;
    }
  }

  function scheduleChatBootstrapFetch() {
    try {
      if (typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode()) return;
      if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
      if (!pokerChatContactsAuthFingerprint()) return;
      if (!base) return;
      var nowB = Date.now();
      if (window.__pokerChatBootstrapCooldownUntil && nowB < window.__pokerChatBootstrapCooldownUntil) return;
      window.__pokerChatBootstrapCooldownUntil = nowB + 2800;
      var genB = (window.__pokerChatBootstrapGen || 0) + 1;
      window.__pokerChatBootstrapGen = genB;
      var lastVP = "";
      try {
        var lvB = Object.assign({}, lastViewedPersonal || {});
        if (lastViewedGeneral != null) lvB.general = lastViewedGeneral;
        lastVP = "&lastViewed=" + encodeURIComponent(JSON.stringify(lvB));
      } catch (eLvB) {}
      var qB = pokerApiAuthQuery("?");
      var urlContactsB = base + "/api/chat" + qB + "&mode=contacts" + lastVP;
      var urlGeneralB = base + "/api/chat" + qB + "&mode=general&trackSeen=0";
      fetch(urlContactsB, { cache: "no-store" })
        .then(function (r) {
          return r.json();
        })
        .then(function (dc) {
          if (genB !== window.__pokerChatBootstrapGen) return;
          if (dc && dc.ok) {
            try {
              pokerWriteContactsCache(dc);
            } catch (eWrC) {}
            var onChatV = document.body && document.body.getAttribute("data-view") === "chat";
            if (onChatV) {
              try {
                applyContactsApiResponse(dc);
              } catch (eAppC) {}
            }
            try {
              if (Array.isArray(dc.contacts)) prefetchTopPersonalDialogs(dc.contacts);
            } catch (ePreC) {}
          }
        })
        .catch(function () {});
      fetch(urlGeneralB, { cache: "no-store" })
        .then(function (r) {
          return r.json();
        })
        .then(function (dg) {
          if (genB !== window.__pokerChatBootstrapGen) return;
          ingestBootstrapGeneralSnapshot(dg);
        })
        .catch(function () {});
    } catch (eBoot) {}
  }
  try {
    window.__pokerScheduleChatBootstrapFetch = scheduleChatBootstrapFetch;
  } catch (eExBoot) {}

  if (!chatListenersAttached) {
    chatListenersAttached = true;
    window.chatListenersAttached = true;
    document.addEventListener("visibilitychange", function () {
      try {
        if (typeof window.pokerUpdateChatDmFocusFromUiState === "function") window.pokerUpdateChatDmFocusFromUiState();
      } catch (eVisDm) {}
    });
    try {
      window.addEventListener("blur", function () {
        try {
          if (typeof window.pokerUpdateChatDmFocusFromUiState === "function") window.pokerUpdateChatDmFocusFromUiState();
        } catch (eBl) {}
      });
      window.addEventListener("focus", function () {
        try {
          if (typeof window.pokerUpdateChatDmFocusFromUiState === "function") window.pokerUpdateChatDmFocusFromUiState();
        } catch (eFo) {}
      });
      window.addEventListener("pagehide", function () {
        try {
          if (typeof window.__pokerStopChatDmFocusSession === "function") window.__pokerStopChatDmFocusSession();
        } catch (ePh) {}
      });
    } catch (eWinDm) {}
    (function schedulePrefetchChatContactsCache() {
      var runBoot = function () {
        try {
          if (typeof window.__pokerScheduleChatBootstrapFetch === "function") {
            window.__pokerScheduleChatBootstrapFetch();
          }
        } catch (ePf) {}
      };
      if (typeof isTelegramWebApp === "function" && isTelegramWebApp()) {
        setTimeout(runBoot, 0);
      } else {
        var idle = window.requestIdleCallback || function (cb) {
          setTimeout(cb, 120);
        };
        idle(runBoot);
      }
    })();
    (function () {
      function getVisibleMessagesEl() {
        if (chatActiveTab === "general" && generalView && !generalView.classList.contains("chat-general-view--hidden")) return generalMessages;
        if (chatActiveTab === "personal" && convView && !convView.classList.contains("chat-conv-view--hidden")) return messagesEl;
        return null;
      }
      function clearChatMessagesKeyboardPad() {
        try {
          /* На всех лентах чата — иначе после dismiss остаётся inline padding-bottom. */
          document.querySelectorAll(".chat-messages").forEach(function (el) {
            if (el && el.style) el.style.removeProperty("padding-bottom");
          });
        } catch (ePadClr) {}
        try {
          if (typeof window.__pokerScheduleSyncChatScrollBottomButtons === "function") {
            window.__pokerScheduleSyncChatScrollBottomButtons();
          }
        } catch (eSbClr) {}
      }
      function hardResetTelegramChatMessagesKeyboardPad() {
        if (!isTelegramChatRuntime()) return;
        try {
          [generalMessages, messagesEl].forEach(function (el) {
            if (!el || !el.style) return;
            el.style.setProperty("padding-bottom", "0px", "important");
            el.style.removeProperty("padding-bottom");
          });
        } catch (eTgPadHard) {}
        try {
          document.documentElement.style.removeProperty("--chat-vv-inset");
          document.documentElement.style.removeProperty("--chat-ios-accessory-inset");
        } catch (eTgPadVars) {}
      }
      /**
       * Нижний отступ ленты: при position:fixed композера — только высота полосы + bottom (реальные пиксели),
       * без max() с --chat-vv-inset (иначе двойной учёт с dock bottom и «прыжки» при вводе).
       * Без fixed — lift по переменным (translate в потоке).
       */
      function updateChatMessagesKeyboardPad() {
        logChatKeyboardDebug("pad-enter");
        collectChatOverscrollSnapshot("pad:enter");
        if (isTelegramChatRuntime()) {
          clearChatMessagesKeyboardPad();
          hardResetTelegramChatMessagesKeyboardPad();
          logChatKeyboardDebug("pad-tg-hardoff");
          collectChatOverscrollSnapshot("pad:tg-hardoff");
          return;
        }
        if (enforceTelegramChatDefaultComposerState()) return;
        if (isPassiveTelegramIosChatThread()) {
          clearChatMessagesKeyboardPad();
          logChatKeyboardDebug("pad-passive");
          return;
        }
        if (shouldUseNativeTelegramIosChatComposerFlow()) {
          clearChatMessagesKeyboardPad();
          logChatKeyboardDebug("pad-native");
          return;
        }
        if (!document.body.classList.contains("chat-keyboard-open")) return;
        var box0 = getVisibleMessagesEl();
        if (!box0) return;
        var isIosPwaPad =
          !isTelegramChatRuntime() &&
          typeof pokerPwaStandaloneForKeyboardInset === "function" &&
          pokerPwaStandaloneForKeyboardInset() &&
          typeof isIosLikeForChatViewport === "function" &&
          isIosLikeForChatViewport();
        /* До смены padding: иначе после роста pad расстояние до низа > CHAT_SCROLL_BOTTOM_NEAR_PX и snap «у низа» не сработает. */
        var nearBeforeLift = false;
        try {
          if (!isChatPhysicalKeyboardContext()) {
            nearBeforeLift = chatMessagesNearBottom(box0, CHAT_SCROLL_BOTTOM_NEAR_PX);
          }
        } catch (eNear0) {}
        if (!isIosPwaPad) clearChatMessagesKeyboardPad();
        var box = getVisibleMessagesEl();
        if (!box) return;
        if (!document.body.classList.contains("chat-keyboard-open")) return;
        var gap = Math.max(3, Math.round(13 / 3));
        var barEl = null;
        try {
          if (chatActiveTab === "general" && generalView && !generalView.classList.contains("chat-general-view--hidden")) {
            barEl = document.getElementById("chatGeneralInputArea");
          } else if (chatActiveTab === "personal" && convView && !convView.classList.contains("chat-conv-view--hidden")) {
            barEl = document.getElementById("chatPersonalInputArea") || convView.querySelector(".chat-container .chat-input-area");
          }
        } catch (eBarFind) {}
        var barFixed = false;
        var bh = 0;
        var btm = 0;
        var tmaFlowPad = false;
        try {
          if (barEl) {
            tmaFlowPad = isTelegramMiniAppChatThreadIos() && isChatThreadComposerKeyboardDom();
            barFixed = !tmaFlowPad && window.getComputedStyle(barEl).position === "fixed";
            if (barFixed) {
              bh = barEl.offsetHeight || 72;
              btm = parseFloat(window.getComputedStyle(barEl).bottom) || 0;
              /*
               * TMA + fixed-композер: padding ленты совпадает с bottom из applyChatThreadComposerKeyboardDockFromCover (__pokerChatThreadDockBottomCssPx).
               * Иначе getComputedStyle даёт 0 на кадре или подмешивается сырой vv — лента и строка дёргаются разными величинами.
               */
              var dockPxStore = Number(window.__pokerChatThreadDockBottomCssPx);
              var isTmaPad = isTelegramChatRuntime();
              if (
                isTmaPad &&
                barEl.classList.contains("chat-input-area--vv-dock") &&
                dockPxStore >= 8
              ) {
                btm = dockPxStore;
              } else if (btm < 8 && !isChatPhysicalKeyboardContext()) {
                /* TMA/WK: иногда bottom ещё 0 на кадре — TG API; сырой vv не подмешиваем в Mini App (глючные кадры vvh). */
                try {
                  if (isTmaPad) {
                    var twPad = window.Telegram && window.Telegram.WebApp;
                    if (twPad && twPad.viewportStableHeight != null && twPad.viewportHeight != null) {
                      var tsPad = Number(twPad.viewportStableHeight);
                      var thPad = Number(twPad.viewportHeight);
                      if (tsPad > 0 && thPad > 0 && tsPad > thPad + 5) {
                        var kbdPad = Math.round(tsPad - thPad);
                        if (kbdPad > 32) btm = kbdPad;
                      }
                    }
                  } else {
                    if (isTelegramChatRuntime()) {
                      var twPad2 = window.Telegram && window.Telegram.WebApp;
                      if (twPad2 && twPad2.viewportStableHeight != null && twPad2.viewportHeight != null) {
                        var tsP2 = Number(twPad2.viewportStableHeight);
                        var thP2 = Number(twPad2.viewportHeight);
                        if (tsP2 > 0 && thP2 > 0 && tsP2 > thP2 + 5) {
                          var kbdP2 = Math.round(tsP2 - thP2);
                          if (kbdP2 > 32) btm = kbdP2;
                        }
                      }
                    }
                    if (btm < 8 && window.visualViewport) {
                      var ihPad = window.innerHeight || 0;
                      var vvPad = Number(window.visualViewport.height) || 0;
                      var otPad = Number(window.visualViewport.offsetTop) || 0;
                      var covPad = Math.max(0, Math.round(ihPad - otPad - vvPad));
                      if (covPad > 32) btm = covPad;
                    }
                  }
                } catch (eBtmFb) {}
              }
            } else if (tmaFlowPad) {
              bh = barEl.offsetHeight || 72;
              btm = 0;
            }
          }
        } catch (eBarPad) {}
        var pad;
        if (barFixed) {
          var isThreadComposerDock =
            typeof isChatThreadComposerKeyboardDom === "function" &&
            isChatThreadComposerKeyboardDom() &&
            typeof isTelegramMiniAppChatThreadIos === "function" &&
            isTelegramMiniAppChatThreadIos();
          if (isThreadComposerDock) {
            pad = Math.round(bh + gap);
            if (pad < 28) pad = 28;
          } else {
            pad = Math.round(bh + btm + gap);
            if (pad < 28) pad = 28;
          }
          try {
            var screenSafeBottomPad = getChatScreenSafeAreaBottomPx();
            if (isIosPwaPad) {
              /* Для iOS PWA считаем запас от реальной видимой строки ввода, а не от клавиатурного cover:
               * иначе снизу появляется лишний резерв и последнее сообщение не доезжает до нужной позиции. */
              var pwaViewportHeight = window.innerHeight || 0;
              var pwaComposerLift = bh;
              try {
                if (barEl && barEl.getBoundingClientRect) {
                  var pwaRect = barEl.getBoundingClientRect();
                  if (pwaRect && isFinite(pwaRect.top) && isFinite(pwaRect.bottom)) {
                    var pwaVisibleBottom = Math.min(pwaViewportHeight || pwaRect.bottom, pwaRect.bottom);
                    var pwaVisibleTop = Math.max(0, pwaRect.top);
                    var pwaOccupied = Math.max(0, pwaVisibleBottom - pwaVisibleTop);
                    if (pwaOccupied > 0) pwaComposerLift = pwaOccupied;
                  }
                }
              } catch (ePwaRectPad) {}
              /* Для scroll range нужен не только видимый блок composer, но и его фиксированный bottom:
               * иначе последнее сообщение визуально уходит под строку и не докручивается до края. */
              pad = Math.max(10, Math.round(Math.max(bh, pwaComposerLift) + Math.max(0, btm) - 18));
            } else if (isThreadComposerDock) {
              pad = Math.max(28, Math.round(bh + gap));
            } else {
              pad = Math.max(pad, Math.round(bh + screenSafeBottomPad + 24));
            }
          } catch (ePwaPadCap) {}
        } else if (tmaFlowPad) {
          pad = Math.round(bh + gap + 8);
          if (pad < 44) pad = 44;
        } else {
          var cs = getComputedStyle(document.documentElement);
          var lift = (parseFloat(cs.getPropertyValue("--chat-vv-inset")) || 0) + (parseFloat(cs.getPropertyValue("--chat-ios-accessory-inset")) || 0);
          pad = Math.round(lift + gap);
          if (window.visualViewport && document.body.classList.contains("chat-keyboard-open")) {
            try {
              var ihWin = window.innerHeight || 0;
              var vvh = Number(window.visualViewport.height) || 0;
              var offTop = Number(window.visualViewport.offsetTop) || 0;
              var overlap = Math.max(0, Math.round(ihWin - offTop - vvh));
              if (overlap > 48) {
                var slack = Math.max(0, overlap - lift);
                pad = Math.max(pad, Math.round(lift + gap + Math.min((slack * 0.22) / 3, 56 / 3)));
              }
            } catch (eVv) {}
          }
          if (pad < 28) pad = 28;
          if (isIosLikeForChatViewport()) {
            pad += Math.round(8 / 3);
            try {
              var sw = window.screen && window.screen.width ? Number(window.screen.width) : 0;
              var sh = window.screen && window.screen.height ? Number(window.screen.height) : 0;
              var longSide = Math.max(sw, sh);
              var shortSide = sw > 0 && sh > 0 ? Math.min(sw, sh) : 0;
              var tabletish = shortSide >= 600;
              if (!tabletish && longSide >= 890) pad += Math.round(24 / 3);
              else if (!tabletish && longSide <= 834) pad -= Math.round(6 / 3);
            } catch (ePhPad) {}
          }
        }
        try {
          window.__pokerChatMessagesKeyboardPadLast = pad;
          updateTelegramMiniAppChatThreadDebugOverlay("pad", {
            pad: pad,
            bottom: btm,
            cover: Number(window.__pokerChatTgKeyboardCoverLast) || 0
          });
        } catch (eDbgPad) {}
        box.style.paddingBottom = pad + "px";
        logChatKeyboardDebug("pad-set", "pad=" + pad + " btm=" + btm + " fixed=" + (barFixed ? 1 : 0));
        collectChatOverscrollSnapshot("pad:set", {
          pad: pad,
          btm: btm,
          fixed: barFixed ? 1 : 0
        });
        try {
          if (typeof window.__pokerScheduleSyncChatScrollBottomButtons === "function") {
            window.__pokerScheduleSyncChatScrollBottomButtons();
          }
        } catch (eSbKb) {}
        /* Поднять ленту над композером/клавиатурой (не десктоп): после pad иначе «у низа» ложно ломается и низ остаётся под полем. */
        var shouldSnapAfterLift = !isChatPhysicalKeyboardContext() && nearBeforeLift;
        try {
          var pwaIosNear =
            !isTelegramChatRuntime() &&
            typeof pokerPwaStandaloneForKeyboardInset === "function" &&
            pokerPwaStandaloneForKeyboardInset() &&
            typeof isIosLikeForChatViewport === "function" &&
            isIosLikeForChatViewport();
          if (pwaIosNear) shouldSnapAfterLift = false;
        } catch (ePwaNear) {}
        if (shouldSnapAfterLift) {
          var rafLift = window.requestAnimationFrame || function (fn) {
            setTimeout(fn, 0);
          };
          rafLift(function () {
            rafLift(function () {
              try {
                var bx = getVisibleMessagesEl();
                if (bx) bx.scrollTop = bx.scrollHeight;
              } catch (eLift) {}
            });
          });
        }
      }
      function scrollDocumentToZero() {
        var se = document.scrollingElement;
        if (se && se.scrollTop !== 0) se.scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop !== 0) document.documentElement.scrollTop = 0;
        if (document.body && document.body.scrollTop !== 0) document.body.scrollTop = 0;
      }
      function clearChatKeyboardViewportState(options) {
        var opts = options || {};
        var doc = document.documentElement;
        try {
          doc.classList.remove("chat-keyboard-open", "chat-vv-lift", "chat-keyboard-open--tma-flow");
        } catch (eDocCls) {}
        try {
          document.body.classList.remove("chat-keyboard-open", "chat-keyboard-open--tma-flow");
        } catch (eBodyCls) {}
        if (opts.keepInsets) return;
        try {
          doc.style.removeProperty("--chat-vv-inset");
          doc.style.removeProperty("--chat-ios-accessory-inset");
        } catch (eDocVars) {}
      }
      window.__pokerClearChatKeyboardViewportState = clearChatKeyboardViewportState;
      function isTelegramChatDefaultMode() {
        try {
          return (
            isTelegramChatRuntime() &&
            document.body &&
            String(document.body.getAttribute("data-view") || "") === "chat"
          );
        } catch (eTgChatDefault) {
          return false;
        }
      }
      function enforceTelegramChatDefaultComposerState() {
        if (!isTelegramChatDefaultMode()) return false;
        try {
          clearChatKeyboardViewportState();
        } catch (eTgDefKb) {}
        try {
          clearChatMessagesKeyboardPad();
        } catch (eTgDefPad) {}
        try {
          stripChatInputAreaTransforms();
        } catch (eTgDefTf) {}
        try {
          resetChatKeyboardDockRuntimeState();
        } catch (eTgDefDock) {}
        try {
          var root = document.documentElement;
          if (root && root.style) {
            root.style.removeProperty("--chat-vv-inset");
            root.style.removeProperty("--chat-ios-accessory-inset");
          }
        } catch (eTgDefVars) {}
        return true;
      }
      function setChatKeyboardOpen(open) {
        logChatKeyboardDebug(open ? "kb-open" : "kb-close");
        if (open && hardDisableChatComposerViewportLift(document.activeElement, "kb:hard-disabled")) {
          scrollDocumentToZero();
          return;
        }
        if (enforceTelegramChatDefaultComposerState()) {
          scrollDocumentToZero();
          return;
        }
        if (typeof setChatKeyboardOpenClasses === "function") {
          setChatKeyboardOpenClasses(open);
          scrollDocumentToZero();
          return;
        }
        if (isPassiveTelegramIosChatThread()) {
          clearChatKeyboardViewportState();
          scrollDocumentToZero();
          return;
        }
        var el = getVisibleMessagesEl();
        var savedScroll = el ? el.scrollTop : 0;
        if (open) {
          document.documentElement.classList.add("chat-keyboard-open");
          document.body.classList.add("chat-keyboard-open");
        } else {
          clearChatKeyboardViewportState({ keepInsets: true });
        }
        scrollDocumentToZero();
        if (el && savedScroll > 0) {
          requestAnimationFrame(function () {
            el.scrollTop = savedScroll;
            requestAnimationFrame(function () { el.scrollTop = savedScroll; });
          });
        }
      }
      function pokerPwaStandaloneForKeyboardInset() {
        return (
          !!(window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
          !!(window.navigator && window.navigator.standalone)
        );
      }
      function isIosLikeForChatViewport() {
        return (
          /iPad|iPhone|iPod/.test(navigator.userAgent || "") ||
          (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
        );
      }
      /**
       * Десктопный Telegram / ПК-браузер: нет виртуальной клавиатуры, перекрывающей низ —
       * не ставим chat-keyboard-open (иначе visualViewport даёт ложный inset и композер уезжает вверх).
       */
      function isChatPhysicalKeyboardContext() {
        try {
          var tg = window.Telegram && window.Telegram.WebApp;
          if (tg && tg.platform) {
            var p = String(tg.platform).toLowerCase();
            if (p === "tdesktop" || p === "macos" || p === "unigram") return true;
            if (p === "weba" || p === "web" || p === "webk") {
              return (navigator.maxTouchPoints || 0) === 0;
            }
          }
        } catch (ePk) {}
        if ((navigator.maxTouchPoints || 0) > 0) return false;
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "")) return false;
        return true;
      }
      window.__pokerIsChatPhysicalKeyboardContext = isChatPhysicalKeyboardContext;
      function shouldUseChatVisualViewportLift() {
        if (isPassiveTelegramIosChatThread()) return false;
        if (shouldUseNativeTelegramIosChatComposerFlow()) return false;
        if (!window.visualViewport) return false;
        if (pokerPwaStandaloneForKeyboardInset() || isIosLikeForChatViewport()) return true;
        /* Android Chrome / PWA */
        if (/Android/i.test(navigator.userAgent || "") && navigator.maxTouchPoints > 0) return true;
        /* Telegram: окно частично поджимается, но без translate поле часто остаётся под клавиатурой — подъём нужен; inset ниже чуть смягчён под TG. */
        if (isTelegramChatRuntime()) return true;
        /* Мобильный Safari/Chrome вне TG: иначе при открытой клавиатуре sync обнулял inset и поле не поднималось. */
        try {
          if (
            (navigator.maxTouchPoints || 0) > 0 &&
            /Mobile|iPhone|Android|webOS|BlackBerry|Opera Mini/i.test(navigator.userAgent || "") &&
            document.body &&
            document.body.classList.contains("chat-keyboard-open") &&
            String(document.body.getAttribute("data-view") || "") === "chat"
          ) {
            return true;
          }
        } catch (eMobLift) {}
        return false;
      }
      /**
       * Доп. подъём только на iOS над системной панелью «стрелки / Готово».
       * На Android панели нет — inset 0, подъём только через --chat-vv-inset.
       */
      function applyChatIosAccessoryInsetFromViewport() {
        var doc = document.documentElement;
        if (!document.body.classList.contains("chat-keyboard-open")) {
          doc.style.removeProperty("--chat-ios-accessory-inset");
          return;
        }
        if (isTelegramChatRuntime()) {
          doc.style.removeProperty("--chat-ios-accessory-inset");
          return;
        }
        if (!isIosLikeForChatViewport() || !window.visualViewport) {
          doc.style.removeProperty("--chat-ios-accessory-inset");
          return;
        }
        var tgAcc = isTelegramChatRuntime();
        var vv = window.visualViewport;
        var ih = window.innerHeight || 0;
        var vvh = Number(vv.height) || 0;
        var offsetTop = Number(vv.offsetTop) || 0;
        var belowVv = Math.max(0, Math.round(ih - offsetTop - vvh));
        /* Полоса под vv — input accessory / предиктив / «Готово» (на новых iOS иногда >62px; раньше >62 давало acc=0 и поле перекрывалось). */
        var acc = 0;
        if (belowVv >= 8) {
          acc = Math.min(92, Math.round(Math.min(belowVv, 130) * 0.94));
        } else if (
          !tgAcc &&
          pokerPwaStandaloneForKeyboardInset() &&
          ih > 0 &&
          vvh > 0 &&
          ih - vvh > 55
        ) {
          acc = 44;
        } else if (tgAcc || belowVv > 0) {
          /* TG / WK: vv на одном уровне с клавиатурой, belowVv почти 0 — всё равно нужен зазор под системную строку над клавишами. */
          acc = tgAcc ? 40 : 44;
        }
        if (acc < 34 && ih > 0 && vvh > 0 && ih - vvh > 96) {
          acc = Math.max(acc, tgAcc ? 38 : 42);
        }
        doc.style.setProperty("--chat-ios-accessory-inset", acc + "px");
      }
      function getPwaChatThreadAccessoryInsetPx() {
        try {
          if (isTelegramChatRuntime()) return 0;
          if (!isIosLikeForChatViewport()) return 0;
          if (!pokerPwaStandaloneForKeyboardInset()) return 0;
          if (!document.body.classList.contains("chat-keyboard-open")) return 0;
          if (!isChatThreadComposerKeyboardDom()) return 0;
          var vv = window.visualViewport || null;
          var ih = window.innerHeight || 0;
          var acc = 0;
          if (vv && ih > 0) {
            var vvh = Number(vv.height) || 0;
            var offsetTop = Number(vv.offsetTop) || 0;
            var belowVv = Math.max(0, Math.round(ih - offsetTop - vvh));
            if (belowVv >= 8) {
              acc = Math.min(92, Math.round(Math.min(belowVv, 130) * 0.94));
            } else if (ih > 0 && vvh > 0 && ih - vvh > 55) {
              acc = 44;
            }
          }
          if (acc < 34) {
            var baseIh = Number(window.__pokerChatInnerHBaseline) || 0;
            var curIh = window.innerHeight || 0;
            var winLoss = baseIh > 260 && curIh > 0 ? Math.max(0, Math.round(baseIh - curIh)) : 0;
            if (winLoss > 96) acc = 42;
          }
          return Math.max(0, acc);
        } catch (ePwaAcc) {
          return 0;
        }
      }
      /** PWA/WK: pokerPulseChatFixedViewportHeightAfterKeyboard или гонка кадров оставляют height/min-height на html/body — «отступ» снизу и весь экран сжат до смены раздела */
      function pokerStripForcedViewportShellHeights() {
        try {
          var b = document.body;
          var rootEl = document.documentElement;
          if (b && b.style) {
            b.style.removeProperty("height");
            b.style.removeProperty("min-height");
            b.style.removeProperty("max-height");
            b.style.removeProperty("padding-bottom");
            b.style.removeProperty("padding-top");
          }
          if (rootEl && rootEl.style) {
            rootEl.style.removeProperty("height");
            rootEl.style.removeProperty("min-height");
            rootEl.style.removeProperty("max-height");
            rootEl.style.removeProperty("padding-bottom");
            rootEl.style.removeProperty("padding-top");
          }
          try {
            var appShell = document.getElementById("app");
            if (appShell && appShell.style) {
              appShell.style.removeProperty("padding-bottom");
              appShell.style.removeProperty("padding-top");
              appShell.style.removeProperty("transform");
              appShell.style.removeProperty("margin-bottom");
            }
          } catch (eAppSh) {}
        } catch (eSh) {}
      }
      function stripChatInputAreaTransforms() {
        try {
          document.querySelectorAll(".chat-general-view .chat-input-area, .chat-container .chat-input-area").forEach(function (node) {
            if (!node || !node.style) return;
            /* Явный ноль + reflow — иначе на части WK/TG слой остаётся сдвинутым, снизу «лишнее» место. */
            node.style.setProperty("transform", "translate3d(0, 0, 0)", "");
            try {
              node.style.setProperty("-webkit-transform", "translate3d(0, 0, 0)", "");
            } catch (eW) {}
            try {
              void node.offsetHeight;
            } catch (eOh) {}
            node.style.removeProperty("transform");
            node.style.removeProperty("-webkit-transform");
            node.style.removeProperty("will-change");
            /* Старые inline-смещения после клавиатуры перебивали CSS после dismiss, поэтому чистим margin-bottom явно. */
            node.style.removeProperty("margin-bottom");
            node.style.removeProperty("padding-bottom");
            node.style.removeProperty("padding-top");
            node.style.removeProperty("position");
            node.style.removeProperty("left");
            node.style.removeProperty("width");
            node.style.removeProperty("right");
            node.style.removeProperty("bottom");
            node.style.removeProperty("top");
            node.style.removeProperty("z-index");
            node.style.removeProperty("max-width");
            node.style.removeProperty("box-sizing");
            try {
              node.classList.remove("chat-input-area--vv-dock");
            } catch (eClsDock) {}
          });
        } catch (eSt) {}
      }
      function clearChatComposerDockClass() {
        try {
          var g = document.getElementById("chatGeneralInputArea");
          var p = document.getElementById("chatPersonalInputArea") || (convView && convView.querySelector ? convView.querySelector(".chat-container .chat-input-area") : null);
          if (g) g.classList.remove("chat-input-area--vv-dock");
          if (p) p.classList.remove("chat-input-area--vv-dock");
        } catch (eDockCls) {}
      }
      function resetChatKeyboardDockRuntimeState() {
        try {
          window.__pokerChatKeyboardFocusAtMs = 0;
          window.__pokerChatLastAppliedDockBottom = null;
          window.__pokerChatTgKeyboardCoverLast = null;
          window.__pokerChatThreadDockBottomCssPx = null;
          window.__pokerChatTmaDockTabKey = null;
          window.__pokerChatTmaThreadLastInnerHeight = null;
          window.__pokerChatTmaThreadFocusSession = null;
          if (window.__pokerChatTmaThreadSyncTimer) {
            clearTimeout(window.__pokerChatTmaThreadSyncTimer);
            window.__pokerChatTmaThreadSyncTimer = null;
          }
          window.__pokerChatTmaThreadSyncRafPending = false;
          clearChatComposerDockClass();
          if (window.__pokerChatVvInsetDebounceTimer) {
            clearTimeout(window.__pokerChatVvInsetDebounceTimer);
            window.__pokerChatVvInsetDebounceTimer = null;
          }
        } catch (eDockReset) {}
      }
      function scrubTelegramIosChatInputAreaDock(node) {
        if (!node) return;
        try {
          node.classList.remove("chat-input-area--vv-dock");
        } catch (eDockClsScrub) {}
        try {
          if (node.style) {
            node.style.removeProperty("position");
            node.style.removeProperty("left");
            node.style.removeProperty("right");
            node.style.removeProperty("top");
            node.style.removeProperty("bottom");
            node.style.removeProperty("width");
            node.style.removeProperty("max-width");
            node.style.removeProperty("box-sizing");
            node.style.removeProperty("z-index");
          }
        } catch (eDockStyleScrub) {}
      }
      function attachTelegramIosChatInputAreaDockGuard() {
        return;
      }
      function updateChatKeyboardInnerHeightBaseline() {
        try {
          var ihNow = window.innerHeight || 0;
          if (ihNow > 200) {
            var prev = Number(window.__pokerChatInnerHBaseline) || 0;
            window.__pokerChatInnerHBaseline = Math.max(prev, ihNow);
          }
        } catch (eBase) {}
      }
      function setTelegramIosShellFocusOverrides(active) {
        window.__pokerTelegramIosShellFocusOverridesActive = false;
      }
      function setNativeTelegramIosComposerFocusClasses(active) {
        try {
          document.documentElement.classList.remove("chat-tma-ios-composer-minimal", "chat-tma-ios-shell-native");
          document.body.classList.remove("chat-tma-ios-composer-minimal", "chat-tma-ios-shell-native");
        } catch (eTmaNativeCls) {}
        setTelegramIosShellFocusOverrides(false);
      }
      function setChatKeyboardOpenClasses(open) {
        try {
          if (enforceTelegramChatDefaultComposerState()) return;
          if (isTelegramChatRuntime()) {
            clearChatKeyboardViewportState({ keepInsets: true });
            clearChatMessagesKeyboardPad();
            stripChatInputAreaTransforms();
            return;
          }
          if (open) {
            document.documentElement.classList.add("chat-keyboard-open");
            document.body.classList.add("chat-keyboard-open");
          } else {
            clearChatKeyboardViewportState({ keepInsets: true });
          }
          document.documentElement.classList.remove("chat-keyboard-open--tma-flow");
          document.body.classList.remove("chat-keyboard-open--tma-flow");
        } catch (eKbCls) {}
      }
      function scrollVisibleChatMessagesToBottom(options) {
        var isTelegramChat = isTelegramChatRuntime();
        var opts = options || {};
        var shouldSnap = !!opts.force;
        try {
          var visibleBeforePad = getVisibleMessagesEl();
          shouldSnap =
            shouldSnap ||
            !visibleBeforePad ||
            chatMessagesNearBottom(visibleBeforePad, CHAT_SCROLL_BOTTOM_NEAR_PX);
        } catch (eSnapCheck) {
          shouldSnap = true;
        }
        updateChatMessagesKeyboardPad();
        if (!isTelegramChat) {
          try {
            var se = document.scrollingElement;
            if (se && se.scrollTop !== 0) se.scrollTop = 0;
            if (document.documentElement && document.documentElement.scrollTop !== 0) document.documentElement.scrollTop = 0;
            if (document.body && document.body.scrollTop !== 0) document.body.scrollTop = 0;
          } catch (eDocSc) {}
        }
        try {
          var visibleMessages = getVisibleMessagesEl();
          if (visibleMessages && !isTelegramChat && shouldSnap) visibleMessages.scrollTop = visibleMessages.scrollHeight;
        } catch (eMsgSc) {}
      }
      function detachTelegramMiniAppChatThreadRootScrollLock() {
        window.__pokerChatTmaRootScrollLockHandler = null;
        window.__pokerChatTmaRootScrollLockRaf = null;
        window.__pokerChatTmaRootScrollLockTimer = null;
      }
      function attachTelegramMiniAppChatThreadRootScrollLock() {
        return;
      }
      function repairChatFocusViewportOverscroll(focusTarget) {
        return;
      }
      function scheduleChatKeyboardPostDismissPasses(delays) {
        if (!Array.isArray(delays)) return;
        delays.forEach(function (ms) {
          var timerId = setTimeout(function () {
            if (document.body.classList.contains("chat-keyboard-open")) return;
            try {
              if (typeof pokerNukeIosKeyboardViewportArtifacts === "function") {
                pokerNukeIosKeyboardViewportArtifacts({ resetMainScroll: true });
              }
            } catch (eD) {}
            try {
              if (typeof scrollMainDocumentToTop === "function") scrollMainDocumentToTop();
            } catch (eScD) {}
            try {
              if (typeof pokerRepairIosStuckVisualViewportOffset === "function") {
                pokerRepairIosStuckVisualViewportOffset();
              }
            } catch (eVvD) {}
            try {
              if (typeof pokerPulseChatFixedViewportHeightAfterKeyboard === "function") {
                pokerPulseChatFixedViewportHeightAfterKeyboard();
              }
            } catch (ePulD) {}
            stripChatInputAreaTransforms();
            pokerStripForcedViewportShellHeights();
            try {
              if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
            } catch (eTbD) {}
            try {
              if (typeof window.dispatchEvent === "function") window.dispatchEvent(new Event("resize"));
            } catch (eR2) {}
          }, ms);
          try {
            if (!Array.isArray(window.__pokerChatDismissTimers)) window.__pokerChatDismissTimers = [];
            window.__pokerChatDismissTimers.push(timerId);
          } catch (eDismissTrack) {}
        });
      }
      function clearPendingChatKeyboardDismissTimers() {
        try {
          var timers = window.__pokerChatDismissTimers;
          if (!Array.isArray(timers)) {
            window.__pokerChatDismissTimers = [];
            return;
          }
          timers.forEach(function (id) {
            try { clearTimeout(id); } catch (eClrTm) {}
          });
          window.__pokerChatDismissTimers = [];
        } catch (eDismissClear) {}
      }
      function finalizeChatKeyboardDismiss() {
        clearPendingChatKeyboardDismissTimers();
        try {
          window.__pokerChatKeyboardOpeningUntil = 0;
        } catch (eOpenReset) {}
        setNativeTelegramIosComposerFocusClasses(false);
        resetChatKeyboardDockRuntimeState();
        try {
          if (typeof window.__pokerChatDetachVisualViewportListeners === "function") {
            window.__pokerChatDetachVisualViewportListeners();
          }
        } catch (eDet) {}
        var doc = document.documentElement;
          try {
            setChatKeyboardOpenClasses(false);
            /* Сначала явный 0 — сброс кэша calc()/композитинга; remove на следующем кадре. */
            doc.style.setProperty("--chat-vv-inset", "0px");
            doc.style.setProperty("--chat-ios-accessory-inset", "0px");
        } catch (eCls) {}
        try {
          if (document.body && document.body.getAttribute("data-view") === "chat") {
            doc.style.removeProperty("--app-bottom-tabbar-pad");
            if (typeof pokerApplyBottomTabbarPad !== "undefined" && pokerApplyBottomTabbarPad) {
              pokerApplyBottomTabbarPad._lastPad = null;
            }
          }
        } catch (eTbRoot) {}
        stripChatInputAreaTransforms();
        pokerStripForcedViewportShellHeights();
        clearChatMessagesKeyboardPad();
        updateChatKeyboardInnerHeightBaseline();
        try {
          var taKbDone =
            isTelegramChatRuntime()
              ? (chatActiveTab === "personal" ? chatPersonalComposerEl : chatGeneralComposerEl)
              : document.getElementById("chatSharedComposer");
          if (taKbDone && typeof resizeChatTextarea === "function") resizeChatTextarea(taKbDone);
        } catch (eTaKb) {}
        try {
          syncPwaChatVisualViewportInset();
        } catch (eSync) {}
        try {
          clearChatKeyboardViewportState();
        } catch (eRm) {}
        stripChatInputAreaTransforms();
        pokerStripForcedViewportShellHeights();
        try {
          if (typeof scrollMainDocumentToTop === "function") scrollMainDocumentToTop();
        } catch (eScr0) {}
        try {
          if (typeof pokerRepairIosStuckVisualViewportOffset === "function") pokerRepairIosStuckVisualViewportOffset();
        } catch (eVvRep) {}
        try {
          var tw = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tw && typeof tw.expand === "function") tw.expand();
        } catch (eTg) {}
        try {
          if (typeof pokerNukeIosKeyboardViewportArtifacts === "function") pokerNukeIosKeyboardViewportArtifacts({ resetMainScroll: true });
        } catch (eNuke) {}
        try {
          if (typeof pokerPulseChatFixedViewportHeightAfterKeyboard === "function") pokerPulseChatFixedViewportHeightAfterKeyboard();
        } catch (ePulKb) {}
        try {
          [100, 320].forEach(function (ms) {
            setTimeout(function () {
              try {
                if (document.body.classList.contains("chat-keyboard-open")) return;
              } catch (eKbChk) {}
              pokerStripForcedViewportShellHeights();
            }, ms);
          });
        } catch (ePulStrip) {}
        try {
          if (typeof window.dispatchEvent === "function") window.dispatchEvent(new Event("resize"));
        } catch (eRe) {}
        try {
          if (typeof pokerApplyAppTopPadding === "function") pokerApplyAppTopPadding();
        } catch (ePad) {}
        try {
          if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
        } catch (eTb) {}
        try {
          var raf = window.requestAnimationFrame || function (fn) {
            setTimeout(fn, 16);
          };
          raf(function () {
            stripChatInputAreaTransforms();
            pokerStripForcedViewportShellHeights();
            try {
              doc.style.removeProperty("--chat-vv-inset");
              doc.style.removeProperty("--chat-ios-accessory-inset");
            } catch (e2) {}
            try {
              if (typeof scrollMainDocumentToTop === "function") scrollMainDocumentToTop();
            } catch (eScr1) {}
            try {
              if (typeof pokerRepairIosStuckVisualViewportOffset === "function") pokerRepairIosStuckVisualViewportOffset();
            } catch (eVv2) {}
            try {
              if (typeof pokerNukeIosKeyboardViewportArtifacts === "function") pokerNukeIosKeyboardViewportArtifacts({ resetMainScroll: true });
            } catch (eNuke2) {}
            try {
              if (typeof pokerPulseChatFixedViewportHeightAfterKeyboard === "function") pokerPulseChatFixedViewportHeightAfterKeyboard();
            } catch (ePulKb2) {}
            try {
              if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
            } catch (eTb2) {}
          });
        } catch (eRaf) {}
        scheduleChatKeyboardPostDismissPasses([80, 220, 520]);
        try {
          if (typeof pokerFlushBottomNavAndViewportAfterChatChrome === "function") pokerFlushBottomNavAndViewportAfterChatChrome();
        } catch (eFlushKb) {}
        try {
          setTimeout(function () {
            if (document.body.classList.contains("chat-keyboard-open")) return;
            if (typeof pokerFlushBottomNavAndViewportAfterChatChrome === "function") pokerFlushBottomNavAndViewportAfterChatChrome();
          }, 180);
        } catch (eFlushKb2) {}
      }
      window.__pokerFinalizeChatKeyboardDismiss = finalizeChatKeyboardDismiss;
      function forcePwaChatKeyboardCleanupIfClosed() {
        try {
          if (!document.body || String(document.body.getAttribute("data-view") || "") !== "chat") return false;
          if (!document.body.classList.contains("chat-keyboard-open")) return false;
          var openingUntil = Number(window.__pokerChatKeyboardOpeningUntil) || 0;
          if (openingUntil > Date.now()) return false;
          var pwaLike =
            (typeof pokerPwaStandaloneForKeyboardInset === "function" && pokerPwaStandaloneForKeyboardInset()) ||
            (typeof pokerIsPwaDisplayStandalone === "function" && pokerIsPwaDisplayStandalone());
          if (!pwaLike) return false;
          if (!isChatKeyboardLayoutEffectivelyClosed()) return false;
          finalizeChatKeyboardDismiss();
          try {
            if (typeof pokerFlushBottomNavAndViewportAfterChatChrome === "function") {
              pokerFlushBottomNavAndViewportAfterChatChrome();
            }
          } catch (eForceFl) {}
          return true;
        } catch (eForcePwaKb) {
          return false;
        }
      }
      window.__pokerForcePwaChatKeyboardCleanupIfClosed = forcePwaChatKeyboardCleanupIfClosed;
      /* iOS/WKWebView: blur и высота visualViewport обновляются с задержкой — снимаем «хвост» подъёма, когда vv снова полноэкранный */
      if (!window.__pokerChatVvPostKeyboardCleanupAttached && window.visualViewport && window.visualViewport.addEventListener) {
        window.__pokerChatVvPostKeyboardCleanupAttached = true;
        var vvPostKbTimer = null;
        function onVvAfterKeyboardMaybeClosed() {
          if (forcePwaChatKeyboardCleanupIfClosed()) return;
          if (document.body.classList.contains("chat-keyboard-open")) return;
          var ih = window.innerHeight || 0;
          var vvh = Number(window.visualViewport.height) || 0;
          /* iPhone 15: vv иногда близок к полной высоте, но 28px порог не срабатывает — ловим с 12px. */
          if (!ih || vvh < ih - 12) return;
          clearTimeout(vvPostKbTimer);
          vvPostKbTimer = setTimeout(function () {
            if (document.body.classList.contains("chat-keyboard-open")) return;
            var ih2 = window.innerHeight || 0;
            var vvh2 = Number(window.visualViewport.height) || 0;
            if (!ih2 || vvh2 < ih2 - 12) return;
            document.documentElement.classList.remove("chat-vv-lift");
            document.documentElement.style.removeProperty("--chat-vv-inset");
            document.documentElement.style.removeProperty("--chat-ios-accessory-inset");
            stripChatInputAreaTransforms();
            try {
              clearChatMessagesKeyboardPad();
            } catch (ePadVv) {}
            try {
              var ihVvUp = window.innerHeight || 0;
              if (ihVvUp > 240) {
                var prevVvB = Number(window.__pokerChatInnerHBaseline) || 0;
                window.__pokerChatInnerHBaseline = Math.max(prevVvB, ihVvUp);
              }
            } catch (eVvBl) {}
            try {
              if (typeof scrollMainDocumentToTop === "function") scrollMainDocumentToTop();
            } catch (eScVv) {}
            try {
              if (typeof pokerRepairIosStuckVisualViewportOffset === "function") pokerRepairIosStuckVisualViewportOffset();
            } catch (eVvP) {}
            try {
              if (typeof pokerPulseChatFixedViewportHeightAfterKeyboard === "function") pokerPulseChatFixedViewportHeightAfterKeyboard();
            } catch (ePulVv) {}
            try {
              if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
            } catch (eTbV) {}
            try {
              var twP = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
              if (twP && typeof twP.expand === "function") twP.expand();
            } catch (eEx) {}
            try {
              if (typeof pokerFlushBottomNavAndViewportAfterChatChrome === "function") pokerFlushBottomNavAndViewportAfterChatChrome();
            } catch (eFlVv) {}
          }, 110);
        }
        window.visualViewport.addEventListener("resize", onVvAfterKeyboardMaybeClosed);
      }
      window.addEventListener(
        "focus",
        function () {
          try {
            forcePwaChatKeyboardCleanupIfClosed();
          } catch (ePwaFocusCleanup) {}
        },
        true
      );

      /** Фокус в общем/личном треде: не тянуть --chat-vv-inset для «подъёма» композера (переделывается отдельно). */
      function isChatThreadComposerKeyboardDom(focusTarget) {
        if (String(document.body.getAttribute("data-view") || "") !== "chat") return false;
        var target = focusTarget || document.activeElement;
        if (!target) return false;
        var isComposerTarget = false;
        try {
          isComposerTarget =
            target === chatComposerEl ||
            target === chatGeneralComposerEl ||
            target === chatPersonalComposerEl ||
            (!!chatGeneralComposerMount && chatGeneralComposerMount.contains(target)) ||
            (!!chatPersonalComposerMount && chatPersonalComposerMount.contains(target));
        } catch (eTgt) {}
        if (!isComposerTarget) return false;
        var gen = generalView && !generalView.classList.contains("chat-general-view--hidden");
        var cv = convView && !convView.classList.contains("chat-conv-view--hidden");
        return !!(gen || cv);
      }
      function isHardDisabledChatComposerFlowTarget(focusTarget) {
        if (!isTelegramChatRuntime()) return false;
        if (String(document.body.getAttribute("data-view") || "") !== "chat") return false;
        var target = focusTarget || document.activeElement;
        if (!target) return false;
        try {
          if (target === chatSharedComposerEl) return true;
          if (target === chatGeneralComposerEl || target === chatPersonalComposerEl) return true;
          var activeArea =
            chatActiveTab === "personal"
              ? document.getElementById("chatPersonalInputArea") || (convView && convView.querySelector ? convView.querySelector(".chat-container .chat-input-area") : null)
              : document.getElementById("chatGeneralInputArea");
          if (activeArea && activeArea.contains && activeArea.contains(target)) return true;
        } catch (eHardChatTarget) {}
        return false;
      }
      function hardDisableChatComposerViewportLift(focusTarget, stageLabel) {
        if (!isTelegramChatRuntime()) return false;
        if (!isHardDisabledChatComposerFlowTarget(focusTarget)) return false;
        var directComposer = null;
        var shouldSnapToLatest = false;
        try {
          directComposer = getDirectChatComposer(chatActiveTab);
          if (!directComposer) directComposer = getDirectChatComposer(chatActiveTab === "personal" ? "general" : "personal");
        } catch (eHardDirectFind) {}
        try {
          var focusMessagesEl = getVisibleMessagesEl();
          if (focusMessagesEl) {
            shouldSnapToLatest = chatMessagesNearBottom(focusMessagesEl, Math.max(CHAT_SCROLL_BOTTOM_NEAR_PX, 240));
          }
        } catch (eHardNearBottom) {}
        try {
          if (directComposer && focusTarget === chatSharedComposerEl) {
            var carried = chatSharedComposerEl && chatSharedComposerEl.value != null ? String(chatSharedComposerEl.value) : "";
            if (carried && directComposer.value !== carried) directComposer.value = carried;
          }
        } catch (eHardCarry) {}
        try {
          clearPendingChatKeyboardDismissTimers();
          resetChatKeyboardDockRuntimeState();
          window.__pokerChatKeyboardFocusAtMs = Date.now();
          window.__pokerChatKeyboardOpeningUntil = 0;
        } catch (eHardTgReset) {}
        try {
          window.__pokerChatPwaSettleToBottomAfterKeyboard = false;
        } catch (eHardSettle) {}
        try {
          if (typeof window.__pokerChatDetachVisualViewportListeners === "function") {
            window.__pokerChatDetachVisualViewportListeners();
          }
        } catch (eHardDetach) {}
        try {
          setChatKeyboardOpenClasses(false);
          clearChatMessagesKeyboardPad();
          hardResetTelegramChatMessagesKeyboardPad();
          stripChatInputAreaTransforms();
        } catch (eHardClear) {}
        try {
          clearTelegramChatRootShiftCompensation();
          ensureTelegramChatRootShiftCompensationBindings();
          applyTelegramChatRootShiftCompensation();
          setTimeout(applyTelegramChatRootShiftCompensation, 60);
          setTimeout(applyTelegramChatRootShiftCompensation, 180);
        } catch (eHardShift) {}
        try {
          if (chatSharedComposerEl) {
            chatSharedComposerEl.blur();
            chatSharedComposerEl.disabled = true;
            chatSharedComposerEl.hidden = true;
            chatSharedComposerEl.setAttribute("tabindex", "-1");
            chatSharedComposerEl.setAttribute("aria-hidden", "true");
            chatSharedComposerEl.style.setProperty("display", "none", "important");
            chatSharedComposerEl.style.setProperty("pointer-events", "none", "important");
          }
        } catch (eHardShared) {}
        try {
          if (directComposer) {
            chatComposerEl = directComposer;
            directComposer.disabled = false;
            directComposer.hidden = false;
            directComposer.removeAttribute("tabindex");
            directComposer.removeAttribute("aria-hidden");
            directComposer.style.removeProperty("display");
            directComposer.style.removeProperty("pointer-events");
            if (document.activeElement !== directComposer) {
              setTimeout(function () {
                try {
                  if (!directComposer || document.activeElement === directComposer) return;
                  if (directComposer.focus) directComposer.focus({ preventScroll: true });
                  var len = String(directComposer.value || "").length;
                  if (typeof directComposer.setSelectionRange === "function") directComposer.setSelectionRange(len, len);
                } catch (eHardRefocus1) {
                  try {
                    if (directComposer && directComposer.focus) directComposer.focus();
                  } catch (eHardRefocus2) {}
                }
              }, 0);
            }
          }
        } catch (eHardDirect) {}
        try {
          if (shouldSnapToLatest) {
            var settleToLatest = function () {
              try {
                var focusMessagesLate = getVisibleMessagesEl();
                if (focusMessagesLate) focusMessagesLate.scrollTop = focusMessagesLate.scrollHeight;
              } catch (eHardScrollLate) {}
            };
            var rafSnap = window.requestAnimationFrame || function (fn) {
              setTimeout(fn, 16);
            };
            setTimeout(settleToLatest, 0);
            setTimeout(settleToLatest, 120);
            rafSnap(function () {
              settleToLatest();
              rafSnap(settleToLatest);
            });
          }
        } catch (eHardScroll) {}
        collectChatOverscrollSnapshot(stageLabel || "focus:hard-disabled", focusTarget);
        return true;
      }
      /** Зазор между низом полосы ввода и верхом клавиатуры (TMA — ровно 5px по UX). */
      function getChatComposerKeyboardGapPx() {
        if (isTelegramChatRuntime()) return 5;
        if (
          isIosLikeForChatViewport() &&
          typeof pokerPwaStandaloneForKeyboardInset === "function" &&
          pokerPwaStandaloneForKeyboardInset()
        ) return 2;
        return isIosLikeForChatViewport() ? 6 : 4;
      }
      function getChatScreenSafeAreaBottomPx() {
        var rootStyle = null;
        var safeBottom = 0;
        try {
          rootStyle = window.getComputedStyle ? getComputedStyle(document.documentElement) : null;
          safeBottom = Math.max(0, Math.round(parseFloat(rootStyle && rootStyle.getPropertyValue("--chat-safe-area-bottom")) || 0));
        } catch (eSafeBottomRead) {}
        return safeBottom;
      }
      function getChatComposerMandatoryBottomOffsetPx() {
        var safeBottom = getChatScreenSafeAreaBottomPx();
        if (
          !isTelegramChatRuntime() &&
          typeof isIosLikeForChatViewport === "function" &&
          isIosLikeForChatViewport() &&
          typeof pokerPwaStandaloneForKeyboardInset === "function" &&
          pokerPwaStandaloneForKeyboardInset()
        ) {
          /* Отрицательный bottom (-safe area) провоцировал первый плохой кадр при focus:
           * строка уезжала вниз ещё до vv-sync, а затем WK/WebView уже сам прокручивал документ вверх/вниз.
           * Для thread composer нижняя граница должна быть неотрицательной. */
          return 0;
        }
        return Math.max(0, safeBottom);
      }
      function isTelegramMiniAppChatThreadIos() {
        return false;
      }
      function isPassiveTelegramIosChatThread() {
        return false;
      }
      function shouldDisableTelegramIosChatKeyboardDock(target) {
        return false;
      }
      function shouldUseNativeTelegramIosChatComposerFlow(focusTarget) {
        return false;
      }
      function getTelegramChatRootShiftPx() {
        var shift = 0;
        try {
          shift = Math.max(shift, Math.round(window.scrollY || 0));
        } catch (eTgShiftWin) {}
        try {
          var scrollEl = document.scrollingElement || document.documentElement || document.body;
          shift = Math.max(shift, Math.round((scrollEl && scrollEl.scrollTop) || 0));
        } catch (eTgShiftDoc) {}
        try {
          var appEl = document.getElementById("app");
          if (appEl && appEl.getBoundingClientRect) {
            var appRect = appEl.getBoundingClientRect();
            shift = Math.max(shift, Math.round(Math.max(0, -(appRect.top || 0))));
          }
        } catch (eTgShiftApp) {}
        try {
          if (document.body && document.body.getBoundingClientRect) {
            var bodyRect = document.body.getBoundingClientRect();
            shift = Math.max(shift, Math.round(Math.max(0, -(bodyRect.top || 0))));
          }
        } catch (eTgShiftBody) {}
        return Math.max(0, shift);
      }
      function clearTelegramChatRootShiftCompensation() {
        [generalView, convView].forEach(function (node) {
          if (!node || !node.style) return;
          try {
            node.style.removeProperty("transform");
            node.style.removeProperty("will-change");
          } catch (eTgShiftClear) {}
        });
        window.__pokerTelegramChatRootShiftCompensationActive = false;
      }
      function applyTelegramChatRootShiftCompensation() {
        var hardChatTarget = false;
        try {
          hardChatTarget = isHardDisabledChatComposerFlowTarget();
        } catch (eHardShiftTarget) {}
        if (!isTelegramChatRuntime() && !hardChatTarget) {
          clearTelegramChatRootShiftCompensation();
          return;
        }
        if (String(document.body.getAttribute("data-view") || "") !== "chat") {
          clearTelegramChatRootShiftCompensation();
          return;
        }
        var shiftPx = getTelegramChatRootShiftPx();
        var target =
          chatActiveTab === "personal" && convView && !convView.classList.contains("chat-conv-view--hidden")
            ? convView
            : generalView && !generalView.classList.contains("chat-general-view--hidden")
              ? generalView
              : null;
        [generalView, convView].forEach(function (node) {
          if (!node || !node.style) return;
          if (node === target && shiftPx > 8) {
            try {
              node.style.setProperty("transform", "translateY(" + shiftPx + "px)", "important");
              node.style.setProperty("will-change", "transform");
            } catch (eTgShiftApply) {}
          } else {
            try {
              node.style.removeProperty("transform");
              node.style.removeProperty("will-change");
            } catch (eTgShiftIdle) {}
          }
        });
        window.__pokerTelegramChatRootShiftCompensationActive = !!(target && shiftPx > 8);
      }
      function ensureTelegramChatRootShiftCompensationBindings() {
        if (window.__pokerTelegramChatRootShiftCompensationBound) return;
        window.__pokerTelegramChatRootShiftCompensationBound = true;
        window.addEventListener(
          "scroll",
          function () {
            if (!window.__pokerTelegramChatRootShiftCompensationActive) return;
            applyTelegramChatRootShiftCompensation();
          },
          true
        );
        window.addEventListener("resize", function () {
          if (!window.__pokerTelegramChatRootShiftCompensationActive) return;
          applyTelegramChatRootShiftCompensation();
        });
        try {
          if (window.visualViewport && window.visualViewport.addEventListener) {
            window.visualViewport.addEventListener("resize", function () {
              if (!window.__pokerTelegramChatRootShiftCompensationActive) return;
              applyTelegramChatRootShiftCompensation();
            });
            window.visualViewport.addEventListener("scroll", function () {
              if (!window.__pokerTelegramChatRootShiftCompensationActive) return;
              applyTelegramChatRootShiftCompensation();
            });
          }
        } catch (eTgShiftBindVv) {}
      }
      function getTelegramMiniAppChatThreadFocusSession() {
        var session = window.__pokerChatTmaThreadFocusSession;
        if (!session || typeof session !== "object") {
          session = {
            focusAtMs: Number(window.__pokerChatKeyboardFocusAtMs) || Date.now(),
            lockedCover: 0,
            lastInnerHeight: window.innerHeight || 0,
            lastWinLoss: 0
          };
          window.__pokerChatTmaThreadFocusSession = session;
        }
        return session;
      }
      function shouldShowTelegramMiniAppChatThreadDebugOverlay() {
        return false;
      }
      function ensureTelegramMiniAppChatThreadDebugOverlay() {
        return null;
      }
      function hideTelegramMiniAppChatThreadDebugOverlay() {
        var existing = document.getElementById("chatTmaKeyboardDebug");
        if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
        try {
          var genMetaHide = document.getElementById("chatGeneralHeaderRosterMeta");
          if (genMetaHide && genMetaHide.getAttribute("data-debug-owned") === "1") {
            genMetaHide.textContent = "";
            genMetaHide.hidden = true;
            genMetaHide.removeAttribute("data-debug-owned");
          }
        } catch (eDbgMetaHide) {}
        try {
          var convIdHide = document.getElementById("chatConvTitleId");
          if (convIdHide && convIdHide.getAttribute("data-debug-owned") === "1") {
            convIdHide.textContent = "—";
            convIdHide.removeAttribute("data-debug-owned");
          }
        } catch (eDbgConvHide) {}
      }
      function updateTelegramMiniAppChatThreadDebugOverlay(source, extra) {
        hideTelegramMiniAppChatThreadDebugOverlay();
      }
      function computeTelegramMiniAppIosThreadCover(ih, winLossTma, tgDiffRaw, prevCover, focusAgeMs) {
        var session = getTelegramMiniAppChatThreadFocusSession();
        var cap = Math.min(176, Math.max(64, Math.round(ih * 0.235)));
        var cover = 0;
        var haveCover = false;
        if (winLossTma >= 18) {
          cover = winLossTma;
          haveCover = true;
        } else if (session.lockedCover >= 18) {
          cover = session.lockedCover;
          haveCover = true;
        } else if (prevCover >= 18) {
          cover = prevCover;
          haveCover = true;
        } else if (focusAgeMs < 260 && tgDiffRaw >= 24) {
          cover = Math.round(tgDiffRaw * 0.52);
          haveCover = true;
        }
        if (!haveCover) return 0;
        if (cover > cap) cover = cap;
        if (cover < 0) cover = 0;
        if (session.lockedCover >= 18) {
          var ihDelta = Math.abs((session.lastInnerHeight || ih) - ih);
          var minLocked = Math.max(0, session.lockedCover - (ihDelta >= 18 ? 10 : 4));
          var maxLocked = Math.min(cap, session.lockedCover + (ihDelta >= 18 ? 14 : 6));
          if (cover < minLocked) cover = minLocked;
          if (cover > maxLocked) cover = maxLocked;
        }
        if (focusAgeMs > 0 && focusAgeMs < 1000 && prevCover >= 18) {
          var minCover = Math.max(0, prevCover - 4);
          var maxCover = Math.min(cap, prevCover + 6);
          if (cover < minCover) cover = minCover;
          if (cover > maxCover) cover = maxCover;
        }
        if (winLossTma >= 18) {
          session.lockedCover = cover;
          session.lastWinLoss = winLossTma;
          session.lastInnerHeight = ih;
        } else if (session.lockedCover < 18 && cover >= 18) {
          session.lockedCover = cover;
          session.lastInnerHeight = ih;
        }
        window.__pokerChatTmaThreadFocusSession = session;
        return cover;
      }
      function clampTelegramMiniAppIosThreadCover(ih, winLossTma, tgDiffRaw, prevCover, focusAgeMs) {
        return computeTelegramMiniAppIosThreadCover(ih, winLossTma, tgDiffRaw, prevCover, focusAgeMs);
      }
      function scheduleTelegramMiniAppChatThreadKeyboardSync(delayMs) {
        if (!isTelegramMiniAppChatThreadIos() || !isChatThreadComposerKeyboardDom()) return;
        var delay = Math.max(0, Number(delayMs) || 0);
        if (window.__pokerChatTmaThreadSyncTimer) {
          clearTimeout(window.__pokerChatTmaThreadSyncTimer);
          window.__pokerChatTmaThreadSyncTimer = null;
        }
        var run = function () {
          if (window.__pokerChatTmaThreadSyncRafPending) return;
          window.__pokerChatTmaThreadSyncRafPending = true;
          var raf = window.requestAnimationFrame || function (fn) {
            setTimeout(fn, 16);
          };
          raf(function () {
            window.__pokerChatTmaThreadSyncRafPending = false;
            try {
              if (!document.body.classList.contains("chat-keyboard-open")) return;
              if (!isTelegramMiniAppChatThreadIos() || !isChatThreadComposerKeyboardDom()) return;
              syncTelegramMiniAppChatThreadKeyboard();
              scrollVisibleChatMessagesToBottom();
            } catch (eTmaSched) {}
          });
        };
        if (delay > 0) {
          window.__pokerChatTmaThreadSyncTimer = setTimeout(function () {
            window.__pokerChatTmaThreadSyncTimer = null;
            run();
          }, delay);
          return;
        }
        run();
      }
      /**
       * coverPx — высота полосы под visual viewport (клавиатура / IME), от низа layout viewport.
       * bottom = coverPx + getChatComposerKeyboardGapPx().
       */
      function applyChatThreadComposerKeyboardDockFromCover(coverPx) {
        collectChatOverscrollSnapshot("dock:enter", { cover: Math.max(0, Math.round(Number(coverPx) || 0)) });
        if (hardDisableChatComposerViewportLift(document.activeElement, "dock:hard-disabled")) return;
        if (enforceTelegramChatDefaultComposerState()) return;
        if (isTelegramChatRuntime()) {
          stripChatInputAreaTransforms();
          try {
            window.__pokerChatThreadDockBottomCssPx = 0;
            window.__pokerChatLastAppliedDockBottom = 0;
            window.__pokerChatTmaDockTabKey = null;
          } catch (eTgDockOff) {}
          return;
        }
        if (isPassiveTelegramIosChatThread() || shouldDisableTelegramIosChatKeyboardDock()) {
          stripChatInputAreaTransforms();
          try {
            window.__pokerChatThreadDockBottomCssPx = 0;
            window.__pokerChatLastAppliedDockBottom = 0;
            window.__pokerChatTmaDockTabKey = null;
          } catch (ePassiveDock) {}
          return;
        }
        var g = document.getElementById("chatGeneralInputArea");
        var p = document.getElementById("chatPersonalInputArea") || (convView && convView.querySelector ? convView.querySelector(".chat-container .chat-input-area") : null);
        if (!document.body.classList.contains("chat-keyboard-open") || isChatPhysicalKeyboardContext()) {
          stripChatInputAreaTransforms();
          try {
            window.__pokerChatTmaDockTabKey = null;
          } catch (eTk0) {}
          return;
        }
        if (!isChatThreadComposerKeyboardDom()) {
          stripChatInputAreaTransforms();
          try {
            window.__pokerChatTmaDockTabKey = null;
          } catch (eTk1) {}
          return;
        }
        if (shouldDisableTelegramIosChatKeyboardDock()) {
          stripChatInputAreaTransforms();
          try {
            window.__pokerChatThreadDockBottomCssPx = 0;
            window.__pokerChatLastAppliedDockBottom = 0;
            window.__pokerChatTmaDockTabKey = null;
          } catch (eTmaFlow) {}
          try {
            updateTelegramMiniAppChatThreadDebugOverlay("apply-flow", { cover: 0, bottom: 0 });
          } catch (eDbgFlow) {}
          return;
        }
        var gap = getChatComposerKeyboardGapPx();
        var coverNum = Math.max(0, Math.round(Number(coverPx) || 0));
        var bottomPx = coverNum + gap;
        var pwaAccessoryInset = 0;
        var prevB = null;
        try {
          pwaAccessoryInset = getPwaChatThreadAccessoryInsetPx();
        } catch (ePwaDockAcc) {}
        try {
          var ihLim = window.innerHeight || 0;
          var isTgDock = isTelegramChatRuntime();
          var iosDock = typeof isIosLikeForChatViewport === "function" && isIosLikeForChatViewport();
          var focusAgeDock = Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0));
          var isPwaIosDockFinal =
            !isTgDock &&
            iosDock &&
            typeof pokerPwaStandaloneForKeyboardInset === "function" &&
            pokerPwaStandaloneForKeyboardInset();
          /*
           * Telegram iOS: не пересчитывать bottom из живого vv/tg здесь — syncPwaChatVisualViewportInset уже выбрал cover.
           * Второй пересчёт + сглаживание давали заметный «второй рывок» строки вверх.
           */
          if (isTgDock && iosDock && ihLim > 200) {
            var hardMaxTg = Math.min(148, Math.max(74, Math.round(ihLim * 0.18)));
            bottomPx = Math.min(hardMaxTg, coverNum + gap);
            if (focusAgeDock > 0 && focusAgeDock < 720) {
              var baseDock = Number(window.__pokerChatInnerHBaseline) || 0;
              var winLossDockFocus = baseDock > 260 && ihLim > 0 ? Math.max(0, Math.round(baseDock - ihLim)) : 0;
              if (winLossDockFocus >= 24) {
                bottomPx = Math.min(bottomPx, Math.max(74, Math.min(136, winLossDockFocus + Math.max(10, gap + 4))));
              }
            }
          } else if (ihLim > 280 && !isTgDock) {
            var bottomMax = Math.min(380, Math.max(200, Math.round(ihLim * 0.4)));
            if (bottomPx > bottomMax) bottomPx = bottomMax;
          } else if (ihLim > 200 && isTgDock && !iosDock) {
            var bottomMaxAnd = Math.min(380, Math.max(160, Math.round(ihLim * 0.44)));
            if (bottomPx > bottomMaxAnd) bottomPx = bottomMaxAnd;
          }
          if (isPwaIosDockFinal) {
            /*
             * iOS PWA: WKWebView обычно уже поднимает layout viewport вместе с клавиатурой.
             * Если ещё и добавлять высоту клавиатуры в fixed bottom, композер «улетает» сильно вверх.
             * Здесь докуем строку почти к текущему низу viewport, с постоянным маленьким зазором.
             * Так мы убираем дёргания от повторных пересчётов coverPx во время анимации клавиатуры.
             */
            bottomPx = getChatComposerMandatoryBottomOffsetPx();
          }
        } catch (eBm) {}
        try {
          prevB = window.__pokerChatLastAppliedDockBottom;
          var isPwaIosDock =
            !isTelegramChatRuntime() &&
            typeof pokerPwaStandaloneForKeyboardInset === "function" &&
            pokerPwaStandaloneForKeyboardInset() &&
            typeof isIosLikeForChatViewport === "function" &&
            isIosLikeForChatViewport();
          var dockEps =
            isTelegramChatRuntime() &&
            typeof isIosLikeForChatViewport === "function" &&
            isIosLikeForChatViewport()
              ? 12
              : 2;
          if (prevB != null && prevB > 0 && isPwaIosDock) {
            var focusAgePwaDock = Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0));
            if (focusAgePwaDock > 0 && focusAgePwaDock < 900) {
              var minBottomPwa = Math.max(0, prevB - 1);
              var maxBottomPwa = prevB + 1;
              if (bottomPx < minBottomPwa) bottomPx = minBottomPwa;
              if (bottomPx > maxBottomPwa) bottomPx = maxBottomPwa;
            }
            if (focusAgePwaDock > 0 && focusAgePwaDock < 1400 && Math.abs(bottomPx - prevB) < 4) {
              bottomPx = prevB;
            }
          }
          if (
            prevB != null &&
            prevB > 0 &&
            isTelegramChatRuntime() &&
            typeof isIosLikeForChatViewport === "function" &&
            isIosLikeForChatViewport()
          ) {
            var focusAgeGrow = Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0));
            if (focusAgeGrow > 0 && focusAgeGrow < 720 && bottomPx > prevB + 12) {
              bottomPx = prevB + 12;
            }
          }
          if (
            prevB != null &&
            prevB > 0 &&
            isTelegramChatRuntime() &&
            typeof isIosLikeForChatViewport === "function" &&
            isIosLikeForChatViewport()
          ) {
            var focusAgeStab = Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0));
            if (focusAgeStab > 0 && focusAgeStab < 1200) {
              var minBottom = Math.max(0, prevB - 6);
              var maxBottom = prevB + 8;
              if (bottomPx < minBottom) bottomPx = minBottom;
              if (bottomPx > maxBottom) bottomPx = maxBottom;
            }
          }
          if (prevB != null && prevB > 0 && Math.abs(bottomPx - prevB) < dockEps) {
            bottomPx = prevB;
          } else {
            window.__pokerChatLastAppliedDockBottom = bottomPx;
          }
        } catch (eStabB) {}
        if (pwaAccessoryInset > 0) {
          try {
            var isPwaIosAcc =
              !isTelegramChatRuntime() &&
              typeof pokerPwaStandaloneForKeyboardInset === "function" &&
              pokerPwaStandaloneForKeyboardInset() &&
              typeof isIosLikeForChatViewport === "function" &&
              isIosLikeForChatViewport();
            if (isPwaIosAcc) pwaAccessoryInset = 0;
          } catch (ePwaAccCap) {}
          bottomPx += Math.min(4, pwaAccessoryInset);
        }
        try {
          var mandatoryBottomOffset = getChatComposerMandatoryBottomOffsetPx();
          if (mandatoryBottomOffset >= 0 && bottomPx < mandatoryBottomOffset) bottomPx = mandatoryBottomOffset;
        } catch (eMandatoryBottom) {}
        try {
          window.__pokerChatThreadDockBottomCssPx = bottomPx;
        } catch (eDockPx) {}
          try {
            updateTelegramMiniAppChatThreadDebugOverlay("apply", { cover: coverNum, bottom: bottomPx });
          } catch (eDbgApply) {}
        collectChatOverscrollSnapshot("dock:apply", {
          cover: coverNum,
          bottom: bottomPx
        });
        /*
         * Каждый sync вызывал stripChatInputAreaTransforms: снимались position/bottom и класс vv-dock — на кадр полоса
         * теряла fixed и визуально «прыгала». В TMA+iOS при том же табе обновляем только bottom.
         */
        var tabKey = "";
        if (chatActiveTab === "general" && generalView && !generalView.classList.contains("chat-general-view--hidden")) {
          tabKey = "g";
        } else if (chatActiveTab === "personal" && convView && !convView.classList.contains("chat-conv-view--hidden")) {
          tabKey = "p";
        }
        var target0 = tabKey === "g" ? g : tabKey === "p" ? p : null;
        var reuseFixedDock =
          !!tabKey &&
          target0 &&
          target0.classList.contains("chat-input-area--vv-dock") &&
          window.getComputedStyle(target0).position === "fixed" &&
          (
            (
              isTelegramChatRuntime() &&
              typeof isIosLikeForChatViewport === "function" &&
              isIosLikeForChatViewport() &&
              window.__pokerChatTmaDockTabKey === tabKey
            ) ||
            (
              !isTelegramChatRuntime() &&
              typeof pokerPwaStandaloneForKeyboardInset === "function" &&
              pokerPwaStandaloneForKeyboardInset()
            )
          );
        try {
          if (reuseFixedDock) {
            target0.style.setProperty("bottom", bottomPx + "px", "important");
            window.__pokerChatThreadDockBottomCssPx = bottomPx;
            return;
          }
        } catch (eLightDock) {}
        stripChatInputAreaTransforms();
        var target = target0;
        if (!target) return;
        target.classList.add("chat-input-area--vv-dock");
        target.style.setProperty("position", "fixed", "important");
        target.style.setProperty("left", "0", "important");
        target.style.setProperty("right", "0", "important");
        target.style.setProperty("width", "100%", "important");
        target.style.setProperty("max-width", "100%", "important");
        target.style.setProperty("box-sizing", "border-box", "important");
        target.style.setProperty("z-index", "120", "important");
        target.style.setProperty("bottom", bottomPx + "px", "important");
        try {
          window.__pokerChatTmaDockTabKey = tabKey;
        } catch (eTkSet) {}
      }
      /**
       * Telegram Mini App: общий/личный тред с фокусом на композере — отдельный конвейер без visualViewport.
       * Высота перекрытия: viewportStableHeight − viewportHeight; резервы winLoss / lastGood; dock + pad.
       */
      function syncTelegramMiniAppChatThreadKeyboard() {
        return false;
      }
      function resetChatVisualViewportState(options) {
        var opts = options || {};
        var doc = document.documentElement;
        hideTelegramMiniAppChatThreadDebugOverlay();
        doc.style.removeProperty("--chat-vv-inset");
        doc.style.removeProperty("--chat-ios-accessory-inset");
        if (opts.clearPad) clearChatMessagesKeyboardPad();
        if (opts.stripComposer) stripChatInputAreaTransforms();
        if (opts.closeKeyboardState) setChatKeyboardOpenClasses(false);
        if (opts.updateBaseline) {
          try {
            var hIdle = window.innerHeight || 0;
            if (hIdle > 200) window.__pokerChatInnerHBaseline = hIdle;
          } catch (eIdleH) {}
        }
      }
      function applyChatVisualViewportFallbackWithoutVv(doc) {
        if (enforceTelegramChatDefaultComposerState()) return;
        var dvNoVv = String(document.body.getAttribute("data-view") || "");
        var useThreadDockFallback =
          isChatThreadComposerKeyboardDom() && !isTelegramChatRuntime();
        var ihFb = window.innerHeight || 0;
        var capFb = Math.min(520, Math.round(ihFb * 0.55));
        var baseFb = Number(window.__pokerChatInnerHBaseline) || 0;
        var lossFb = baseFb > 260 && ihFb > 0 ? Math.max(0, Math.round(baseFb - ihFb)) : 0;
        var insetFb = Math.min(capFb, Math.max(140, Math.round(lossFb * 0.92)));
        if (insetFb < 170) insetFb = Math.min(capFb, Math.max(insetFb, Math.round(ihFb * 0.36)));
        if (chatComposerEl && document.activeElement === chatComposerEl) {
          insetFb = Math.min(capFb, Math.max(insetFb, Math.round(ihFb * 0.38)));
        }
        if (dvNoVv === "profile") {
          doc.style.setProperty("--chat-vv-inset", insetFb + "px");
          if (isIosLikeForChatViewport()) doc.style.setProperty("--chat-ios-accessory-inset", "44px");
          else doc.style.removeProperty("--chat-ios-accessory-inset");
          updateChatMessagesKeyboardPad();
          return;
        }
        if (dvNoVv === "chat") {
          if (useThreadDockFallback) {
            doc.style.setProperty("--chat-vv-inset", "0px");
            doc.style.removeProperty("--chat-ios-accessory-inset");
            var coverNv = baseFb > 260 && ihFb > 0 ? Math.max(0, Math.round(baseFb - ihFb)) : 0;
            applyChatThreadComposerKeyboardDockFromCover(coverNv);
          } else {
            doc.style.setProperty("--chat-vv-inset", insetFb + "px");
            if (isIosLikeForChatViewport()) doc.style.setProperty("--chat-ios-accessory-inset", "44px");
            else doc.style.removeProperty("--chat-ios-accessory-inset");
          }
          updateChatMessagesKeyboardPad();
        }
      }
      function computeChatVisualViewportMetrics() {
        var vv = window.visualViewport;
        var vvh = Number(vv.height) || 0;
        var ih = window.innerHeight || 0;
        var offsetTop = Number(vv.offsetTop) || 0;
        var heightLoss = Math.max(0, Math.round(ih - vvh));
        var overlap = Math.max(0, Math.round(ih - vvh - offsetTop));
        if (overlap < 20 && heightLoss > overlap + 6) {
          overlap = Math.max(overlap, Math.round(heightLoss - Math.max(0, offsetTop)));
        }
        if (overlap < 8 && vvh + 24 < ih) {
          overlap = Math.max(overlap, heightLoss);
        }
        return { vv: vv, vvh: vvh, ih: ih, offsetTop: offsetTop, heightLoss: heightLoss, overlap: overlap };
      }
      function syncPwaChatVisualViewportInset() {
        logChatKeyboardDebug("vv-sync-enter");
        collectChatOverscrollSnapshot("vv:enter");
        var doc = document.documentElement;
        if (hardDisableChatComposerViewportLift(document.activeElement, "vv:hard-disabled")) {
          logChatKeyboardDebug("vv-sync-hard-disabled");
          return;
        }
        if (enforceTelegramChatDefaultComposerState()) return;
        if (isTelegramChatRuntime()) {
          clearChatMessagesKeyboardPad();
          hardResetTelegramChatMessagesKeyboardPad();
          stripChatInputAreaTransforms();
          clearTelegramChatRootShiftCompensation();
          applyTelegramChatRootShiftCompensation();
          logChatKeyboardDebug("vv-sync-tg-hardoff");
          collectChatOverscrollSnapshot("vv:tg-hardoff");
          return;
        }
        if (isPassiveTelegramIosChatThread() || shouldDisableTelegramIosChatKeyboardDock()) {
          resetChatVisualViewportState({ clearPad: true, stripComposer: true, closeKeyboardState: true });
          return;
        }
        if (shouldUseNativeTelegramIosChatComposerFlow()) {
          resetChatVisualViewportState({ clearPad: true, stripComposer: true });
          return;
        }
        if (!document.body.classList.contains("chat-keyboard-open")) {
          resetChatVisualViewportState({ stripComposer: true, updateBaseline: true });
          return;
        }
        try {
          if (syncTelegramMiniAppChatThreadKeyboard()) return;
        } catch (eTmaSync) {}
        /* Раньше при !visualViewport сразу снимали переменные — при открытой клавиатуре поле оставалось под клавишами. */
        if (!window.visualViewport) {
          applyChatVisualViewportFallbackWithoutVv(doc);
          return;
        }
        if (!shouldUseChatVisualViewportLift()) {
          resetChatVisualViewportState({ stripComposer: true });
          return;
        }
        var metrics = computeChatVisualViewportMetrics();
        var vv = metrics.vv;
        var vvh = metrics.vvh;
        var ih = metrics.ih;
        if (!ih) return;
        var offsetTop = metrics.offsetTop;
        var heightLoss = metrics.heightLoss;
        var overlap = metrics.overlap;
        var tg = isTelegramChatRuntime();
        var tw = tg && window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        var useThreadDock =
          isChatThreadComposerKeyboardDom() && !tg;
        /* Telegram: innerHeight иногда совпадает с visualViewport — overlap≈0; stable−height даёт высоту клавиатуры. */
        if (tg && tw) {
          var tgvH = Number(tw.viewportHeight);
          var tgvS = Number(tw.viewportStableHeight);
          if (tgvS > 0 && tgvH > 0 && tgvS > tgvH + 8) {
            var dTg = Math.round(tgvS - tgvH);
            overlap = Math.max(overlap, dTg);
            heightLoss = Math.max(heightLoss, dTg);
          }
        }
        var cap = Math.min(480, Math.round(ih * 0.52));
        if (isIosLikeForChatViewport()) cap = Math.min(520, Math.round(ih * 0.58));
        var rawInset = Math.max(0, Math.min(overlap, cap));
        /* iOS (в т.ч. iPhone 15): innerHeight/vv часто недооценивают клавиатуру — меньший factor оставляет зазор над клавишами. */
        var factor = tg ? 0.84 : 0.88;
        if (isIosLikeForChatViewport()) factor = tg ? 0.9 : 0.93;
        var inset = Math.max(0, Math.round(rawInset * factor));
        var vvRatio = vvh / ih;
        if (vvRatio > 0 && vvRatio < 0.88 && ih > 0) {
          var fromVv = Math.round((ih - vvh) * 0.82);
          inset = Math.max(inset, Math.min(cap, fromVv));
        }
        if (heightLoss >= 40) {
          inset = Math.max(inset, Math.min(cap, Math.round(heightLoss * 0.78)));
        }
        if (vvRatio > 0 && vvRatio < 0.8 && heightLoss >= 48 && inset < 120) {
          inset = Math.max(inset, Math.min(cap, Math.round(heightLoss * (tg ? 0.58 : 0.65))));
        }
        /* iOS: accessory bar + WKWebView недооценивают overlap — доп. подъём (в PWA без TG accessory не дублируем с --chat-ios-accessory-inset). */
        if (isIosLikeForChatViewport()) {
          var iosBoost = tg ? 40 : 46;
          /* PWA: iosBoost=0 + отключённый accessory оставляли поле под клавиатурой; небольшой boost + --chat-ios-accessory-inset (см. applyChatIosAccessoryInsetFromViewport). */
          if (pokerPwaStandaloneForKeyboardInset() && !tg) iosBoost = 20;
          inset = Math.min(cap, inset + iosBoost);
        }
        /*
         * Android (Infinix/XOS и др.): innerHeight падает при клавиатуре, а visualViewport.height остаётся ≈ innerHeight — overlap≈0.
         * Базовая высота — в момент focus (onChatInputFocus) и при закрытой клавиатуре (ветка return выше).
         */
        if (/Android/i.test(navigator.userAgent || "") && navigator.maxTouchPoints > 0 && !isIosLikeForChatViewport()) {
          try {
            var baseH = Number(window.__pokerChatInnerHBaseline) || 0;
            var curH = window.innerHeight || 0;
            if (baseH > 260 && curH > 0) {
              var winLoss = Math.round(baseH - curH);
              if (winLoss > 72) {
                var fromWin = Math.min(cap, Math.round(winLoss * 0.92));
                inset = Math.max(inset, fromWin);
              }
            }
          } catch (eAndKb) {}
        }
        /*
         * iOS/PWA (в т.ч. Safari WKWebView): при открытой клавиатуре vv иногда даёт overlap≈0, iosBoost для standalone обнулён —
         * --chat-vv-inset остаётся 0, поле под клавиатурой. Baseline innerHeight в момент focus + падение высоты даёт оценку клавиатуры (без дубля с TG API).
         */
        if (isIosLikeForChatViewport() && !tg) {
          try {
            var baseIh = Number(window.__pokerChatInnerHBaseline) || 0;
            var curIh = window.innerHeight || 0;
            if (baseIh > 260 && curIh > 0) {
              var winLossIh = Math.round(baseIh - curIh);
              if (winLossIh > 64) {
                var fromWinIh = Math.min(cap, Math.round(winLossIh * 0.88));
                inset = Math.max(inset, fromWinIh);
              }
            }
          } catch (eIosIh) {}
        }
        /* Экран чата: vv иногда даёт overlap≈0 и heightLoss≈0 — без фокуса композера kbLikely ложен и поле под клавиатурой. */
        if (String(document.body.getAttribute("data-view") || "") === "chat") {
          var composerKb = chatComposerEl && document.activeElement === chatComposerEl;
          var findDlgEl = document.getElementById("chatFindByIdInputDialogs");
          var findDlgKb = !!(findDlgEl && document.activeElement === findDlgEl);
          var findByIdEl = document.getElementById("chatFindByIdInput");
          var findByIdKb = !!(findByIdEl && document.activeElement === findByIdEl);
          var kbLikely =
            composerKb ||
            findDlgKb ||
            findByIdKb ||
            heightLoss > 48 ||
            (vvh > 0 && ih > 0 && vvh + 100 < ih);
          if (kbLikely) {
            var softFloor = Math.min(cap, Math.max(150, Math.round(ih * 0.32)));
            if (inset < 110) {
              inset = Math.max(inset, softFloor);
            } else if (isIosLikeForChatViewport() && inset < 140 && heightLoss > 88) {
              inset = Math.max(inset, Math.min(cap, Math.round(heightLoss * 0.88)));
            }
            if ((composerKb || findDlgKb || findByIdKb) && inset < Math.min(cap, Math.max(200, Math.round(ih * 0.36)))) {
              inset = Math.min(cap, Math.max(inset, Math.round(ih * 0.38)));
            }
          }
        }
        if (String(document.body.getAttribute("data-view") || "") === "profile") {
          var aeProf = document.activeElement;
          var profRootKb = document.querySelector('.view[data-view="profile"]');
          var profKb = !!(
            aeProf &&
            profRootKb &&
            profRootKb.contains(aeProf) &&
            (aeProf.tagName === "INPUT" || aeProf.tagName === "TEXTAREA") &&
            aeProf.id !== "profileAvatarInput"
          );
          if (profKb) {
            var softFloorProf = Math.min(cap, Math.max(150, Math.round(ih * 0.32)));
            if (inset < 110) inset = Math.max(inset, softFloorProf);
            if (inset < Math.min(cap, Math.max(200, Math.round(ih * 0.36)))) {
              inset = Math.min(cap, Math.max(inset, Math.round(ih * 0.36)));
            }
          }
        }
        var coverPxDock = Math.max(0, Math.round(ih - offsetTop - vvh));
        coverPxDock = Math.max(coverPxDock, overlap);
        if (tg && tw) {
          var tgvHd = Number(tw.viewportHeight);
          var tgvSd = Number(tw.viewportStableHeight);
          if (tgvSd > 0 && tgvHd > 0 && tgvSd > tgvHd + 8) {
            coverPxDock = Math.max(coverPxDock, Math.round(tgvSd - tgvHd));
          }
        }
        if (/Android/i.test(navigator.userAgent || "") && navigator.maxTouchPoints > 0 && !isIosLikeForChatViewport()) {
          try {
            var baseHd = Number(window.__pokerChatInnerHBaseline) || 0;
            var curHd = window.innerHeight || 0;
            if (baseHd > 260 && curHd > 0) {
              var winLossD = Math.round(baseHd - curHd);
              if (winLossD > 48) coverPxDock = Math.max(coverPxDock, winLossD);
            }
          } catch (eDockAnd) {}
        }
        /* iOS: падение innerHeight относительно baseline — и для PWA, и для Telegram; иначе при глючном vv только max() раздувает cover */
        if (isIosLikeForChatViewport()) {
          try {
            var baseId = Number(window.__pokerChatInnerHBaseline) || 0;
            var curId = window.innerHeight || 0;
            if (baseId > 260 && curId > 0) {
              var winLossId = Math.round(baseId - curId);
              if (winLossId > 48) coverPxDock = Math.max(coverPxDock, winLossId);
            }
          } catch (eDockIos) {}
        }
        if (chatComposerEl && document.activeElement === chatComposerEl && coverPxDock < 72 && ih > 0 && vvh > 0) {
          coverPxDock = Math.max(coverPxDock, heightLoss);
        }
        if (useThreadDock) {
          /*
           * iOS PWA: в standalone/WK visualViewport и innerHeight иногда схлопываются вместе,
           * raw cover остаётся около 0, хотя inset выше уже распознал открытую клавиатуру.
           * Для thread-composer используем этот inset как страховку, иначе полоса не поднимается вовсе.
           */
          if (
            !tg &&
            isIosLikeForChatViewport() &&
            pokerPwaStandaloneForKeyboardInset() &&
            chatComposerEl &&
            document.activeElement === chatComposerEl
          ) {
            var focusAgePwaFloor = Math.max(0, Date.now() - (Number(window.__pokerChatKeyboardFocusAtMs) || 0));
            var baseFloorIh = Number(window.__pokerChatInnerHBaseline) || 0;
            var winLossFloor = baseFloorIh > 260 && ih > 0 ? Math.max(0, Math.round(baseFloorIh - ih)) : 0;
            var pwaThreadDockFloor = Math.max(0, Math.round(inset));
            if (focusAgePwaFloor > 0 && focusAgePwaFloor < 420) {
              if (winLossFloor > 32) pwaThreadDockFloor = Math.max(0, Math.round(winLossFloor));
              else pwaThreadDockFloor = Math.max(0, Math.round(Math.min(inset, heightLoss)));
            }
            if (pwaThreadDockFloor >= 96 && coverPxDock < pwaThreadDockFloor) {
              coverPxDock = pwaThreadDockFloor;
            }
          }
          /* TMA + тред: syncTelegramMiniAppChatThreadKeyboard() в начале sync — без дубля здесь. */
          /*
           * iOS: взрыв vv подрезаем относительно winLoss. Пошаговое уменьшение cover убрано — давало 2 видимых шага
           * «выше нормы → вниз → вниз». Верхняя граница от падения innerHeight: первые кадры vv часто раздувают cover.
           */
          if (isIosLikeForChatViewport() && !isChatPhysicalKeyboardContext()) {
            try {
              var rawVvGap = Math.max(0, Math.round(ih - offsetTop - vvh));
              var bSt = Number(window.__pokerChatInnerHBaseline) || 0;
              var cSt = window.innerHeight || 0;
              var winSt = bSt > 260 && cSt > 0 ? Math.max(0, Math.round(bSt - cSt)) : 0;
              if (winSt > 70 && rawVvGap > winSt + 55) {
                var capFromWin = Math.max(winSt + 32, winSt + Math.round((rawVvGap - winSt) * 0.2));
                coverPxDock = Math.min(coverPxDock, capFromWin);
              }
              if (winSt > 72) {
                var gapKb = Math.round(getChatComposerKeyboardGapPx());
                var slackTop =
                  tg
                    ? Math.max(36, gapKb + 28)
                    : Math.max(44, gapKb + 26);
                if (coverPxDock > winSt + slackTop) coverPxDock = winSt + slackTop;
              }
            } catch (eDockStab) {}
          }
          if (
            !tg &&
            isIosLikeForChatViewport() &&
            pokerPwaStandaloneForKeyboardInset() &&
            chatComposerEl &&
            document.activeElement === chatComposerEl
          ) {
            try {
              var pwaMinCover = Math.max(0, Math.round(inset - getPwaChatThreadAccessoryInsetPx()));
              if (pwaMinCover >= 72 && coverPxDock < pwaMinCover) coverPxDock = pwaMinCover;
            } catch (ePwaCoverFloor) {}
          }
          /*
           * TG iOS / WKWebView: при наборе vv.height иногда кратковременно сильно занижен → ih - offsetTop - vvh
           * даёт сотни пикселей → fixed bottom огромный → полоса ввода в центре экрана над клавиатурой.
           * Потолок ~52% ih (с запасом под клавиатуру + accessory), не ниже 200px.
           */
          if (!isChatPhysicalKeyboardContext() && ih > 280) {
            var ihRefDock = Math.max(ih, Number(window.__pokerChatInnerHBaseline) || 0);
            if (ihRefDock < 320) ihRefDock = ih;
            var twCap = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            var tgKbHint = 0;
            if (tg && twCap) {
              var tghC = Number(twCap.viewportHeight);
              var tgsC = Number(twCap.viewportStableHeight);
              if (tgsC > 0 && tghC > 0 && tgsC > tghC + 12) {
                tgKbHint = Math.round(tgsC - tghC);
              }
            }
            var winLossDock =
              Number(window.__pokerChatInnerHBaseline) > 260 && ih > 0
                ? Math.max(0, Math.round(Number(window.__pokerChatInnerHBaseline) - ih))
                : 0;
            var pctCap = isIosLikeForChatViewport() ? 0.36 : 0.4;
            var coverDockCap = Math.min(340, Math.max(140, Math.round(ihRefDock * pctCap)));
            if (tgKbHint > 48) {
              coverDockCap = Math.min(coverDockCap, Math.max(140, tgKbHint + 32));
            }
            if (winLossDock > 64) {
              coverDockCap = Math.min(coverDockCap, Math.max(140, winLossDock + 36));
            }
            if (coverPxDock > coverDockCap) coverPxDock = coverDockCap;
          }
          doc.style.setProperty("--chat-vv-inset", "0px");
          doc.style.removeProperty("--chat-ios-accessory-inset");
          applyChatThreadComposerKeyboardDockFromCover(coverPxDock);
        } else {
          doc.style.setProperty("--chat-vv-inset", inset + "px");
          applyChatIosAccessoryInsetFromViewport();
        }
        if (document.body.classList.contains("chat-keyboard-open")) updateChatMessagesKeyboardPad();
        collectChatOverscrollSnapshot("vv:exit", {
          inset: inset,
          cover: coverPxDock,
          tg: tg ? 1 : 0,
          threadDock: useThreadDock ? 1 : 0
        });
      }
      window.__pokerSyncPwaChatVisualViewportInset = syncPwaChatVisualViewportInset;
      try {
        if (!window.__pokerChatTmaViewportEvAttached) {
          var twVp = window.Telegram && window.Telegram.WebApp;
          if (twVp && typeof twVp.onEvent === "function") {
            window.__pokerChatTmaViewportEvAttached = true;
            twVp.onEvent("viewportChanged", function () {
              try {
                if (!document.body.classList.contains("chat-keyboard-open")) return;
                if (isTelegramMiniAppChatThreadIos() && isChatThreadComposerKeyboardDom()) {
                  scheduleTelegramMiniAppChatThreadKeyboardSync(0);
                  return;
                }
                syncPwaChatVisualViewportInset();
              } catch (eVpCh) {}
            });
          }
        }
      } catch (eVpAtt) {}
      var viewportResizeScrollHandler = null;
      var chatWindowResizeHandler = null;
      window.__pokerChatDetachVisualViewportListeners = function () {
        try {
          if (window.__pokerChatVvInsetDebounceTimer) {
            clearTimeout(window.__pokerChatVvInsetDebounceTimer);
            window.__pokerChatVvInsetDebounceTimer = null;
          }
        } catch (eDebDet) {}
        if (
          viewportResizeScrollHandler &&
          typeof window.visualViewport !== "undefined" &&
          window.visualViewport.removeEventListener
        ) {
          try {
            window.visualViewport.removeEventListener("resize", viewportResizeScrollHandler);
            window.visualViewport.removeEventListener("scroll", viewportResizeScrollHandler);
          } catch (eVvDet) {}
          viewportResizeScrollHandler = null;
        }
        if (chatWindowResizeHandler) {
          try {
            window.removeEventListener("resize", chatWindowResizeHandler);
          } catch (eWinDet) {}
          chatWindowResizeHandler = null;
        }
      };
      function onChatInputFocus(focusTarget) {
        logChatKeyboardDebug("focus", focusTarget && focusTarget.id ? focusTarget.id : "");
        collectChatOverscrollSnapshot("focus:start", focusTarget);
        if (hardDisableChatComposerViewportLift(focusTarget, "focus:hard-disabled")) return;
        if (enforceTelegramChatDefaultComposerState()) return;
        if (isTelegramChatRuntime()) {
          try {
            clearPendingChatKeyboardDismissTimers();
            resetChatKeyboardDockRuntimeState();
            window.__pokerChatKeyboardFocusAtMs = Date.now();
          } catch (eTgFocusReset) {}
          try {
            if (typeof window.__pokerChatDetachVisualViewportListeners === "function") {
              window.__pokerChatDetachVisualViewportListeners();
            }
          } catch (eTgFocusDet) {}
          try {
            setChatKeyboardOpenClasses(false);
            clearChatMessagesKeyboardPad();
            hardResetTelegramChatMessagesKeyboardPad();
            stripChatInputAreaTransforms();
          } catch (eTgFocusClear) {}
          try {
            ensureTelegramChatRootShiftCompensationBindings();
            applyTelegramChatRootShiftCompensation();
            setTimeout(applyTelegramChatRootShiftCompensation, 60);
            setTimeout(applyTelegramChatRootShiftCompensation, 180);
          } catch (eTgShiftFocus) {}
          collectChatOverscrollSnapshot("focus:telegram-native", focusTarget);
          return;
        }
        try {
          if (typeof attachTelegramMiniAppChatThreadRootScrollLock === "function") {
            attachTelegramMiniAppChatThreadRootScrollLock();
          }
        } catch (eRootLockOnFocus) {}
        if (isTelegramMiniAppChatThreadIos()) {
          setTelegramIosKeyboardRootLock(true);
          attachTelegramIosChatInputAreaDockGuard();
        }
        updateChatKeyboardInnerHeightBaseline();
        if (isChatPhysicalKeyboardContext()) {
          var elDesk = getVisibleMessagesEl();
          if (elDesk) {
            requestAnimationFrame(function () {
              try {
                elDesk.scrollTop = elDesk.scrollHeight;
              } catch (eSc) {}
            });
          }
          collectChatOverscrollSnapshot("focus:physicalKeyboard", focusTarget);
          return;
        }
        if (shouldDisableTelegramIosChatKeyboardDock(focusTarget) || shouldUseNativeTelegramIosChatComposerFlow(focusTarget)) {
          try {
            resetChatKeyboardDockRuntimeState();
            window.__pokerChatKeyboardFocusAtMs = Date.now();
          } catch (eTmaPassive) {}
          try {
            if (typeof window.__pokerChatDetachVisualViewportListeners === "function") {
              window.__pokerChatDetachVisualViewportListeners();
            }
          } catch (eTmaDet) {}
          try {
            setChatKeyboardOpenClasses(false);
            clearChatMessagesKeyboardPad();
            stripChatInputAreaTransforms();
          } catch (eTmaClr) {}
          try {
            var visibleMessagesNative = getVisibleMessagesEl();
            if (visibleMessagesNative && chatMessagesNearBottom(visibleMessagesNative, CHAT_SCROLL_BOTTOM_NEAR_PX)) {
              visibleMessagesNative.scrollTop = visibleMessagesNative.scrollHeight;
            }
          } catch (eTmaNativeScroll) {}
          collectChatOverscrollSnapshot("focus:nativeTgFlow", focusTarget);
          return;
        }
        setChatKeyboardOpenClasses(true);
        try {
          clearPendingChatKeyboardDismissTimers();
          resetChatKeyboardDockRuntimeState();
          window.__pokerChatKeyboardFocusAtMs = Date.now();
          window.__pokerChatKeyboardOpeningUntil = Date.now() + 1200;
        } catch (eDockOn) {}
        try {
          updateTelegramMiniAppChatThreadDebugOverlay("focus");
        } catch (eDbgFocus) {}
        requestAnimationFrame(function () {
          collectChatOverscrollSnapshot("focus:raf1", focusTarget);
          requestAnimationFrame(function () {
            collectChatOverscrollSnapshot("focus:raf2", focusTarget);
          });
        });
        setTimeout(function () {
          collectChatOverscrollSnapshot("focus:t+120", focusTarget);
        }, 120);
        setTimeout(function () {
          collectChatOverscrollSnapshot("focus:t+320", focusTarget);
        }, 320);
        setTimeout(function () {
          collectChatOverscrollSnapshot("focus:t+700", focusTarget);
        }, 700);
        var isIosChatKb = isIosLikeForChatViewport();
        var isIosPwaChatKb =
          isIosChatKb &&
          !isTelegramChatRuntime() &&
          typeof pokerPwaStandaloneForKeyboardInset === "function" &&
          pokerPwaStandaloneForKeyboardInset();
        try {
          window.__pokerChatPwaSettleToBottomAfterKeyboard =
            false;
        } catch (ePwaSettleFlag) {
          window.__pokerChatPwaSettleToBottomAfterKeyboard = false;
        }
        var isTelegramChatFocus = isTelegramChatRuntime();
        if (!isIosPwaChatKb) {
          syncPwaChatVisualViewportInset();
          if (!isTelegramChatFocus) {
            scrollVisibleChatMessagesToBottom();
            requestAnimationFrame(function () {
              syncPwaChatVisualViewportInset();
              scrollVisibleChatMessagesToBottom();
            });
          }
        }
        if (isIosChatKb) {
          if (isIosPwaChatKb) {
            requestAnimationFrame(function () {
              syncPwaChatVisualViewportInset();
            });
          } else if (!isTelegramChatFocus) {
            setTimeout(function () {
              syncPwaChatVisualViewportInset();
              scrollVisibleChatMessagesToBottom();
            }, 200);
          }
        } else if (!isIosChatKb && !isTelegramChatFocus) {
          setTimeout(function () {
            syncPwaChatVisualViewportInset();
            scrollVisibleChatMessagesToBottom();
          }, 100);
        }
        /*
         * window.resize на iOS (в т.ч. PWA) часто бьёт раньше/между кадрами visualViewport — overlap на мгновение 0,
         * при iosBoost=0 для standalone inset обнуляется и поле остаётся под клавиатурой. Resize оставляем только под Android.
         */
        if (/Android/i.test(navigator.userAgent || "") && navigator.maxTouchPoints > 0) {
          if (chatWindowResizeHandler) {
            try {
              window.removeEventListener("resize", chatWindowResizeHandler);
            } catch (eWr0) {}
            chatWindowResizeHandler = null;
          }
          chatWindowResizeHandler = function () {
            syncPwaChatVisualViewportInset();
          };
          window.addEventListener("resize", chatWindowResizeHandler);
        } else if (chatWindowResizeHandler) {
          try {
            window.removeEventListener("resize", chatWindowResizeHandler);
          } catch (eWr0b) {}
          chatWindowResizeHandler = null;
        }
        if (typeof window.visualViewport !== "undefined" && window.visualViewport.addEventListener) {
          if (viewportResizeScrollHandler) {
            window.visualViewport.removeEventListener("resize", viewportResizeScrollHandler);
            window.visualViewport.removeEventListener("scroll", viewportResizeScrollHandler);
          }
          if (isIosChatKb) {
            /* Две позиции композера: без сглаживания и без частых пересчётов — coalesce в один кадр + один «добор» после конца анимации клавиатуры. */
            var vvCoalesceRaf = null;
            viewportResizeScrollHandler = function () {
              collectChatOverscrollSnapshot("vv:event", focusTarget);
              if (hardDisableChatComposerViewportLift(focusTarget, "vv:event-hard-disabled")) return;
              if (!vvCoalesceRaf) {
                var rafVv = window.requestAnimationFrame || function (fn) {
                  setTimeout(fn, 0);
                };
                vvCoalesceRaf = rafVv(function () {
                  vvCoalesceRaf = null;
                  try {
                    syncPwaChatVisualViewportInset();
                  } catch (eVvIm) {}
                  try {
                    repairChatFocusViewportOverscroll(focusTarget);
                  } catch (eVvRepairRaf) {}
                  collectChatOverscrollSnapshot("vv:raf", focusTarget);
                });
              }
              var skipVv220 =
                isTelegramChatRuntime() &&
                document.body.classList.contains("chat-keyboard-open") &&
                typeof isChatThreadComposerKeyboardDom === "function" &&
                isChatThreadComposerKeyboardDom();
              if (!skipVv220 && isHardDisabledChatComposerFlowTarget(focusTarget)) skipVv220 = true;
              if (!skipVv220) {
                if (window.__pokerChatVvInsetDebounceTimer) clearTimeout(window.__pokerChatVvInsetDebounceTimer);
                window.__pokerChatVvInsetDebounceTimer = setTimeout(function () {
                  window.__pokerChatVvInsetDebounceTimer = null;
                  try {
                    syncPwaChatVisualViewportInset();
                  } catch (eVvIos) {}
                  try {
                    if (
                      window.__pokerChatPwaSettleToBottomAfterKeyboard &&
                      !isTelegramChatRuntime() &&
                      !(
                        typeof pokerPwaStandaloneForKeyboardInset === "function" &&
                        pokerPwaStandaloneForKeyboardInset() &&
                        typeof isIosLikeForChatViewport === "function" &&
                        isIosLikeForChatViewport()
                      )
                    ) {
                      var settleBox = getVisibleMessagesEl();
                      if (settleBox) settleBox.scrollTop = settleBox.scrollHeight;
                      var settleRaf = window.requestAnimationFrame || function (fn) {
                        setTimeout(fn, 16);
                      };
                      settleRaf(function () {
                        settleRaf(function () {
                          try {
                            var settleBoxLate = getVisibleMessagesEl();
                            if (settleBoxLate) settleBoxLate.scrollTop = settleBoxLate.scrollHeight;
                          } catch (eVvSettleBottomLate) {}
                        });
                      });
                    }
                    window.__pokerChatPwaSettleToBottomAfterKeyboard = false;
                  } catch (eVvSettleBottom) {}
                  try {
                    repairChatFocusViewportOverscroll(focusTarget);
                  } catch (eVvRepairDeb) {}
                  collectChatOverscrollSnapshot("vv:debounced", focusTarget);
                }, 220);
              }
            };
            window.visualViewport.addEventListener("resize", viewportResizeScrollHandler);
          } else {
            var vvSyncPending = false;
            viewportResizeScrollHandler = function () {
              collectChatOverscrollSnapshot("vv:event", focusTarget);
              if (hardDisableChatComposerViewportLift(focusTarget, "vv:event-hard-disabled")) return;
              if (vvSyncPending) return;
              vvSyncPending = true;
              var raf = window.requestAnimationFrame || function (fn) {
                setTimeout(fn, 16);
              };
              raf(function () {
                vvSyncPending = false;
                try {
                  syncPwaChatVisualViewportInset();
                } catch (eVvSyn) {}
                try {
                  repairChatFocusViewportOverscroll(focusTarget);
                } catch (eVvRepair) {}
                collectChatOverscrollSnapshot("vv:raf", focusTarget);
              });
            };
            window.visualViewport.addEventListener("resize", viewportResizeScrollHandler);
            window.visualViewport.addEventListener("scroll", viewportResizeScrollHandler);
          }
        }
      }
      window.__pokerActivateChatKeyboardViewport = onChatInputFocus;
      function isAnyChatKeyboardChromeFocus(el) {
        if (!el || (el.tagName !== "INPUT" && el.tagName !== "TEXTAREA")) return false;
        if (chatComposerEl && el === chatComposerEl) return true;
        var id = el.id || "";
        if (id === "chatFindByIdInputDialogs" || id === "chatFindByIdInput") return true;
        return false;
      }
      /** PWA: WK оставляет фокус на textarea при закрытой клавиатуре; по visualViewport видно, что клавиатуры нет — не блокировать finalize. */
      function pokerPwaBlurProceedDespiteDomFocus() {
        try {
          if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return false;
          if (typeof isChatPhysicalKeyboardContext === "function" && isChatPhysicalKeyboardContext()) return false;
          var vv = window.visualViewport;
          var ih = window.innerHeight || 0;
          if (!vv || ih < 240) return false;
          var vvh = Number(vv.height) || 0;
          var loss = Math.max(0, Math.round(ih - vvh));
          var ratio = ih > 0 ? vvh / ih : 1;
          /* iOS PWA: пороги жёстче ломали blur-cleanup — finalize откладывался, залипали fixed-композер и высота shell */
          return loss < 120 && ratio > 0.78;
        } catch (ePwaBf) {
          return false;
        }
      }
      /**
       * iOS TG/WK: после отправки или скрытия клавиатуры document.activeElement иногда остаётся на композере,
       * хотя клавиатура уже закрыта — тогда отложенные finalize отменялись и залипали fixed/bottom + таббар.
       */
      function isChatKeyboardLayoutEffectivelyClosed() {
        try {
          if (typeof isChatPhysicalKeyboardContext === "function" && isChatPhysicalKeyboardContext()) return true;
          var ih = window.innerHeight || 0;
          if (ih < 200) return false;
          var tw = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          var tg = isTelegramChatRuntime();
          if (tw && tg) {
            var tgvH = Number(tw.viewportHeight);
            var tgvS = Number(tw.viewportStableHeight);
            if (tgvS > 0 && tgvH > 0 && tgvS > tgvH + 20) return false;
          }
          var vv = window.visualViewport;
          if (vv) {
            var vvh = Number(vv.height) || 0;
            var offsetTop = Number(vv.offsetTop) || 0;
            var heightLoss = Math.max(0, Math.round(ih - vvh));
            var pwaShell =
              (typeof pokerPwaStandaloneForKeyboardInset === "function" && pokerPwaStandaloneForKeyboardInset()) ||
              (typeof pokerIsPwaDisplayStandalone === "function" && pokerIsPwaDisplayStandalone());
            if (pwaShell && String(document.body.getAttribute("data-view") || "") === "chat" && isChatThreadComposerKeyboardDom()) {
              var baseLinePwa = Number(window.__pokerChatInnerHBaseline) || 0;
              var winLossPwa = baseLinePwa > 260 && ih > 0 ? Math.max(0, Math.round(baseLinePwa - ih)) : 0;
              var dockBottomPwa = Number(window.__pokerChatThreadDockBottomCssPx) || 0;
              if (winLossPwa > 36 || heightLoss > 90 || dockBottomPwa > 24) return false;
            }
            if (!pwaShell && heightLoss > 72) return false;
            if (pwaShell && heightLoss > 118) return false;
            var ratio = ih > 0 ? vvh / ih : 1;
            if (!pwaShell && ratio > 0 && ratio < 0.84) return false;
            if (pwaShell && ratio > 0 && ratio < 0.76) return false;
            if (offsetTop > 16 && heightLoss > 20) return false;
            /* TG: иногда innerHeight совпадает с vv.height при открытой клавиатуре — сверяем с базовой высотой окна. */
            var baseLineVv = Number(window.__pokerChatInnerHBaseline) || 0;
            if (baseLineVv > 260 && ih > 0 && ih < baseLineVv - 64) {
              /*
               * Установленная PWA (iOS/Android WK): после blur innerHeight иногда долго ниже «доклавиатурного» baseline,
               * хотя visualViewport уже почти на весь экран — откладывается finalize, залипает fixed + bottom у композера и отступ снизу.
               */
              var pwaLike =
                (typeof pokerPwaStandaloneForKeyboardInset === "function" && pokerPwaStandaloneForKeyboardInset()) ||
                (typeof pokerIsPwaDisplayStandalone === "function" && pokerIsPwaDisplayStandalone());
              var vvRatio = ih > 0 && vvh > 0 ? vvh / ih : 0;
              if (!(pwaLike && vvRatio > 0.84)) return false;
            }
            return true;
          }
          var baseFb = Number(window.__pokerChatInnerHBaseline) || 0;
          if (baseFb > 260 && ih > 0 && ih < baseFb - 80) {
            var pwaLikeFb =
              (typeof pokerPwaStandaloneForKeyboardInset === "function" && pokerPwaStandaloneForKeyboardInset()) ||
              (typeof pokerIsPwaDisplayStandalone === "function" && pokerIsPwaDisplayStandalone());
            if (!pwaLikeFb) return false;
          }
          return true;
        } catch (eClsKb) {
          return true;
        }
      }
      function shouldDeferChatKeyboardFinalizeForFocus() {
        if (shouldUseNativeTelegramIosChatComposerFlow()) return false;
        if (!isAnyChatKeyboardChromeFocus(document.activeElement)) return false;
        if (pokerPwaBlurProceedDespiteDomFocus()) return false;
        return !isChatKeyboardLayoutEffectivelyClosed();
      }
      window.__pokerIsChatKeyboardLayoutEffectivelyClosed = isChatKeyboardLayoutEffectivelyClosed;
      function onChatInputBlur() {
        logChatKeyboardDebug("blur");
        collectChatOverscrollSnapshot("blur:start");
        try {
          clearTelegramChatRootShiftCompensation();
        } catch (eTgShiftBlur) {}
        if (isTelegramMiniAppChatThreadIos()) {
          setTelegramIosKeyboardRootLock(false);
        }
        if (isTelegramMiniAppChatThreadIos()) {
          hideTelegramMiniAppChatThreadDebugOverlay();
          detachTelegramMiniAppChatThreadRootScrollLock();
          try {
            resetChatKeyboardDockRuntimeState();
          } catch (eTmaBlurReset) {}
          try {
            if (typeof window.__pokerChatDetachVisualViewportListeners === "function") {
              window.__pokerChatDetachVisualViewportListeners();
            }
          } catch (eTmaBlurDet) {}
          try {
            setChatKeyboardOpenClasses(false);
            clearChatMessagesKeyboardPad();
            stripChatInputAreaTransforms();
          } catch (eTmaBlurClr) {}
          return;
        }
        hideTelegramMiniAppChatThreadDebugOverlay();
        detachTelegramIosChatComposerOverlayViewportSync();
        if (chatWindowResizeHandler) {
          try {
            window.removeEventListener("resize", chatWindowResizeHandler);
          } catch (eWr1) {}
          chatWindowResizeHandler = null;
        }
        if (viewportResizeScrollHandler && typeof window.visualViewport !== "undefined" && window.visualViewport.removeEventListener) {
          window.visualViewport.removeEventListener("resize", viewportResizeScrollHandler);
          window.visualViewport.removeEventListener("scroll", viewportResizeScrollHandler);
          viewportResizeScrollHandler = null;
        }
        function runBlurCleanup() {
          var active = document.activeElement;
          var deferBlur = isAnyChatKeyboardChromeFocus(active) && !isChatKeyboardLayoutEffectivelyClosed();
          if (deferBlur && pokerPwaBlurProceedDespiteDomFocus()) deferBlur = false;
          if (deferBlur) return;
          var el = getVisibleMessagesEl();
          var anchorFromBottom = 0;
          var scrollTopBefore = 0;
          var nearBottomBefore = false;
          var hadKeyboardLayoutShift = false;
          if (el) {
            try {
              anchorFromBottom = Math.max(0, el.scrollHeight - el.clientHeight - el.scrollTop);
              scrollTopBefore = Math.max(0, el.scrollTop || 0);
              nearBottomBefore = chatMessagesNearBottom(el, CHAT_SCROLL_BOTTOM_NEAR_PX);
              hadKeyboardLayoutShift =
                document.body.classList.contains("chat-keyboard-open") ||
                document.documentElement.classList.contains("chat-keyboard-open") ||
                !!(el.style && el.style.paddingBottom);
            } catch (eAnc) {}
          }
          var inChat = !!el;
          if (!inChat) scrollDocumentToZero();
          finalizeChatKeyboardDismiss();
          if (!inChat) scrollDocumentToZero();
          /* После dismiss сохраняем позицию: якорь от низа нужен только когда пользователь был у последних сообщений. */
          if (el && hadKeyboardLayoutShift) {
            var rafB = window.requestAnimationFrame || function (fn) {
              setTimeout(fn, 16);
            };
            rafB(function () {
              rafB(function () {
                try {
                  var max = Math.max(0, el.scrollHeight - el.clientHeight);
                  if (nearBottomBefore) {
                    el.scrollTop = Math.max(0, max - anchorFromBottom);
                  } else {
                    el.scrollTop = Math.min(scrollTopBefore, max);
                  }
                } catch (e3) {}
              });
            });
          }
        }
        try {
          if (!Array.isArray(window.__pokerChatDismissTimers)) window.__pokerChatDismissTimers = [];
          window.__pokerChatDismissTimers.push(setTimeout(runBlurCleanup, 0));
        } catch (eBlurTimer0) {
          setTimeout(runBlurCleanup, 0);
        }
        /* iOS: blur и visualViewport обновляются не синхронно — повторяем сброс, иначе поле ввода «остаётся выше». */
        [90, 280, 520, 880, 1350, 2200].forEach(function (ms) {
          var timerId = setTimeout(function () {
            if (shouldDeferChatKeyboardFinalizeForFocus()) return;
            finalizeChatKeyboardDismiss();
          }, ms);
          try {
            if (!Array.isArray(window.__pokerChatDismissTimers)) window.__pokerChatDismissTimers = [];
            window.__pokerChatDismissTimers.push(timerId);
          } catch (eBlurTimerN) {}
        });
        try {
          if (!Array.isArray(window.__pokerChatDismissTimers)) window.__pokerChatDismissTimers = [];
          window.__pokerChatDismissTimers.push(setTimeout(function () {
            try {
              if (typeof pokerPwaStandaloneForKeyboardInset === "function" && pokerPwaStandaloneForKeyboardInset()) {
                finalizeChatKeyboardDismiss();
              }
            } catch (eKbFs) {}
          }, 3200));
        } catch (eBlurTimerLong) {
          setTimeout(function () {
            try {
              if (typeof pokerPwaStandaloneForKeyboardInset === "function" && pokerPwaStandaloneForKeyboardInset()) {
                finalizeChatKeyboardDismiss();
              }
            } catch (eKbFs) {}
          }, 3200);
        }
        /* PWA: повтор без shouldDefer — иначе при «залипшем» activeElement finalize не вызывался до смены экрана */
        [550, 1100].forEach(function (ms) {
          var timerId = setTimeout(function () {
            try {
              if (typeof pokerPwaStandaloneForKeyboardInset !== "function" || !pokerPwaStandaloneForKeyboardInset()) return;
              finalizeChatKeyboardDismiss();
            } catch (ePwaFin) {}
          }, ms);
          try {
            if (!Array.isArray(window.__pokerChatDismissTimers)) window.__pokerChatDismissTimers = [];
            window.__pokerChatDismissTimers.push(timerId);
          } catch (ePwaTimer) {}
        });
      }
      function bindChatComposerKeyboardEvents(ta) {
        if (!ta || ta.__pokerChatKeyboardEventsBound) return;
        ta.__pokerChatKeyboardEventsBound = true;
        ta.addEventListener(
          "touchstart",
          function (event) {
            chatComposerEl = ta;
            if (shouldUseTelegramIosComposeOverlay() && !chatIosComposeOverlayOpening) {
              var modeTouch = ta === chatGeneralComposerEl ? "general" : ta === chatPersonalComposerEl ? "personal" : chatActiveTab;
              if (openTelegramIosComposeOverlay(modeTouch === "general" ? "general" : "personal")) {
                if (event) {
                  event.preventDefault();
                  event.stopPropagation();
                }
                try { ta.blur(); } catch (eTgOvBlur) {}
                return;
              }
            }
            try {
              var ihTs = window.innerHeight || 0;
              if (ihTs > 200) window.__pokerChatInnerHBaseline = ihTs;
            } catch (eTsBl) {}
          },
          { passive: false }
        );
        ta.addEventListener("focus", function () {
          chatComposerEl = ta;
          if (shouldUseTelegramIosComposeOverlay() && !chatIosComposeOverlayOpening) {
            var modeFocus = ta === chatGeneralComposerEl ? "general" : ta === chatPersonalComposerEl ? "personal" : chatActiveTab;
            if (openTelegramIosComposeOverlay(modeFocus === "general" ? "general" : "personal")) {
              try { ta.blur(); } catch (eTgOvBlur2) {}
              return;
            }
          }
          onChatInputFocus(ta);
        });
        ta.addEventListener("blur", function () {
          chatComposerEl = ta;
          onChatInputBlur();
        });
      }
    (function () {
      var chatComposerKeyboardTargets =
        isTelegramChatRuntime()
          ? [chatGeneralComposerEl, chatPersonalComposerEl]
          : [chatSharedComposerEl, chatGeneralComposerEl, chatPersonalComposerEl];
      chatComposerKeyboardTargets.forEach(bindChatComposerKeyboardEvents);
    })();
    })();
    window.chatRefresh = function () {
      pokerPushOpenTraceTransition("chatRefresh-enter", "");
      try {
        var directPendingRefresh = window.__pendingOpenChatPersonalFromDeepLink;
        var directPendingPeerRefresh =
          directPendingRefresh && directPendingRefresh.userId != null
            ? String(directPendingRefresh.userId).trim()
            : "";
        if (directPendingPeerRefresh) {
          pokerPushOpenDebug("chatRefresh-direct-pending", directPendingPeerRefresh);
          chatActiveTab = "personal";
          window.__pokerForcePushDmPeer = normalizePeerIdForChat(directPendingPeerRefresh);
          window.__pokerForcePushDmPeerUntil = Date.now() + 15000;
          if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function" &&
              window.__pokerEnsureOpenPendingChatPersonalFromDeepLink()) {
            return;
          }
        }
        var hardPendingPeer = typeof pokerGetActivePushDmTarget === "function" ? pokerGetActivePushDmTarget() : "";
        if (hardPendingPeer) {
          pokerPushOpenDebug("chatRefresh-hard-reroute", hardPendingPeer);
          window.__pokerForcePushDmPeer = normalizePeerIdForChat(hardPendingPeer);
          window.__pokerForcePushDmPeerUntil = Date.now() + 15000;
          window.__pokerForceAllowPendingPushConvOpen = true;
          try {
            if (typeof pokerOpenResolvedChatPeer === "function" && pokerOpenResolvedChatPeer(hardPendingPeer, hardPendingPeer)) {
              return;
            }
            if (typeof pokerOpenChatPeerDirectFallback === "function" && pokerOpenChatPeerDirectFallback(hardPendingPeer, hardPendingPeer)) {
              return;
            }
            if (typeof pokerOpenPendingPushDmWithoutContacts === "function" && pokerOpenPendingPushDmWithoutContacts(hardPendingPeer, hardPendingPeer)) {
              return;
            }
            if (typeof pokerOpenPushDmHard === "function") {
              pokerOpenPushDmHard(hardPendingPeer, hardPendingPeer);
            }
            pokerPushOpenDebug("chatRefresh-hard-stop", hardPendingPeer);
            return;
          } finally {
            window.__pokerForceAllowPendingPushConvOpen = false;
          }
        }
        var forcedPeerRefresh = window.__pokerForcePushDmPeer;
        var forcedUntilRefresh = Number(window.__pokerForcePushDmPeerUntil || 0);
        if (
          forcedPeerRefresh &&
          forcedUntilRefresh > Date.now() &&
          typeof pokerOpenPendingPushDmWithoutContacts === "function"
        ) {
          pokerPushOpenDebug("chatRefresh-blocked", forcedPeerRefresh);
          pokerOpenPendingPushDmWithoutContacts(forcedPeerRefresh, forcedPeerRefresh);
          return;
        }
        if (window.__pendingOpenClubChatGeneral) {
          if (typeof window.__pokerFlushPendingChatDeepLink === "function" && window.__pokerFlushPendingChatDeepLink()) {
            return;
          }
        }
        if (window.__pendingOpenChatPersonalFromDeepLink) {
          if (typeof window.__pokerFlushPendingChatDeepLink === "function" && window.__pokerFlushPendingChatDeepLink()) {
            return;
          }
          if (
            typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function" &&
            window.__pokerEnsureOpenPendingChatPersonalFromDeepLink()
          ) {
            return;
          }
        }
      } catch (eChatRefreshPending) {}
      /* Сначала setTab — для general выставится scrollGeneralToBottomOnNextRender; иначе отрисовка кэша шла с флагом false и лента мелькала «сверху», затем loadGeneral прокручивал вниз. */
      pokerPushOpenTraceTransition("chatRefresh-before-setTab", String(chatActiveTab || ""));
      setTab(chatActiveTab);
      if (chatWithUserId) showConv(chatWithUserId, chatWithUserName, undefined, chatWithPeerAvatarUrl);
      pokerPushOpenTraceTransition("chatRefresh-after-show", "");
      var genVis = generalView && !generalView.classList.contains("chat-general-view--hidden");
      if (
        chatActiveTab === "general" &&
        genVis &&
        generalMessages &&
        window._chatGeneralCache &&
        !window._chatGeneralCache.__fromDisk &&
        window._chatGeneralCache.messages &&
        window._chatGeneralCache.messages.length
      ) {
        scrollGeneralToBottomOnNextRender = true;
        renderGeneralMessages(window._chatGeneralCache.messages);
        try {
          lastGeneralMessagesSig = generalMessagesSignature(window._chatGeneralCache.messages);
        } catch (eSigSync) {}
        if (window._chatGeneralCache.participantsCount != null) {
          window.lastGeneralStats = String(window._chatGeneralCache.participantsCount) + " уч";
          updateChatHeaderStats();
        }
        try {
          syncClubChatRosterUi();
        } catch (eRosterRf) {}
      }
    };
    document.querySelectorAll(".chat-manager-btn--tg").forEach(function (link) {
      link.addEventListener("click", function (e) {
        var href = link.getAttribute("href");
        if (href && href.startsWith("tg://") && tg && tg.openTelegramLink) {
          e.preventDefault();
          if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
          tg.openTelegramLink(href);
        }
      });
    });
    document.querySelectorAll(".chat-manager-btn[data-chat-user-id]").forEach(function (btn) {
        btn.addEventListener("click", function () {
        var raw = (btn.dataset.chatUserId || "").trim();
        var userName = btn.dataset.chatUserName || "Менеджер";
        if (!raw) {
          if (tg && tg.showAlert) tg.showAlert("Укажите data-chat-user-id (ID приложения или Telegram ID)");
          return;
        }
        function doShow(tgUserId, peerP21) {
          window.__pokerSuppressSetTabPersonalLoad = true;
          try {
            setTab("personal");
          } finally {
            window.__pokerSuppressSetTabPersonalLoad = false;
          }
          showConv(tgUserId, userName, peerP21);
        }
        if (raw.startsWith("tg_")) {
          doShow(raw);
        } else if (/^ID\d{6}$/.test(raw.toUpperCase())) {
          var id = raw.toUpperCase();
          fetch(base + "/api/users?id=" + encodeURIComponent(id) + pokerApiAuthQuery("&"))
            .then(function (r) { return r.json(); })
            .then(function (data) {
              if (data && data.ok && data.userId) doShow(data.userId, data.p21Id);
              else if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Не найдено");
            })
            .catch(function () { if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR); });
        } else {
          doShow("tg_" + raw);
        }
      });
    });
    if (backBtn) backBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      pokerPushOpenSetCaller("conv-back-btn");
      showDialogs();
    });
    var convProfileOpenBtn = document.getElementById("chatConvProfileOpenBtn");
    if (convProfileOpenBtn) {
      convProfileOpenBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var uidP = chatWithUserId;
        if (!uidP) return;
        if (String(uidP).indexOf("group_") === 0) {
          if (typeof window.__pokerOpenChatGroupInfo === "function") window.__pokerOpenChatGroupInfo(uidP);
          return;
        }
        var myOpenP = resolveMyChatMemberId();
        if (myOpenP && peerChatIdsEqual(uidP, myOpenP)) {
          if (tg && tg.showAlert) tg.showAlert("Это вы — свой профиль смотрите в разделе «Профиль».");
          else if (typeof alert === "function") alert("Это вы — свой профиль смотрите в разделе «Профиль».");
          return;
        }
        var nameP = chatWithUserName || (convTitle && convTitle.textContent) || "Игрок";
        var avP = chatWithPeerAvatarUrl || null;
        if (typeof window.openChatUserModalById === "function") {
          window.openChatUserModalById(uidP, nameP, avP);
        }
      });
    }
    var convGroupAddBtn = document.getElementById("chatConvGroupAddMembersBtn");
    if (convGroupAddBtn) {
      convGroupAddBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var gidA = chatWithUserId;
        if (!gidA || String(gidA).indexOf("group_") !== 0) return;
        if (typeof window.__pokerOpenChatGroupAddMembers === "function") {
          window.__pokerOpenChatGroupAddMembers(gidA);
        }
      });
    }
    if (convPeerAvatarWrap && convGroupAvatarFile) {
      convPeerAvatarWrap.addEventListener("click", function (e) {
        if (!convGroupCanChangeAvatar || !chatWithUserId || String(chatWithUserId).indexOf("group_") !== 0) return;
        e.preventDefault();
        e.stopPropagation();
        convGroupAvatarFile.click();
      });
      convPeerAvatarWrap.addEventListener("keydown", function (e) {
        if (!convGroupCanChangeAvatar) return;
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        convGroupAvatarFile.click();
      });
    }
    if (convGroupAvatarFile) {
      convGroupAvatarFile.addEventListener("change", function () {
        var f = convGroupAvatarFile.files && convGroupAvatarFile.files[0];
        var gidCv = chatWithUserId;
        convGroupAvatarFile.value = "";
        if (!f || !gidCv || String(gidCv).indexOf("group_") !== 0 || !convGroupCanChangeAvatar) return;
        if (typeof pokerEnsureChatTelegramVerified === "function" && !pokerEnsureChatTelegramVerified()) return;
        if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
          if (tg && tg.showAlert) tg.showAlert("Войдите, чтобы сменить аватар");
          return;
        }
        resizeImage(f, 256, 256, 0.88)
          .then(function (dataUrl) {
            return fetch(base + "/api/chat", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(
                pokerApiAuthJsonBody({ action: "updateGroupAvatar", groupId: gidCv, avatar: dataUrl })
              ),
            }).then(function (r) {
              return r.json();
            });
          })
          .then(function (data) {
            if (data && data.ok && data.groupAvatar) {
              chatWithPeerAvatarUrl = data.groupAvatar;
              applyConvPeerAvatarHeader(data.groupAvatar, chatWithUserName || "");
              if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
              if (tg && tg.showToast) tg.showToast("Аватар обновлён");
            } else if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Ошибка");
            else if (typeof alert === "function") alert((data && data.error) || "Ошибка");
          })
          .catch(function () {
            if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
            else if (typeof alert === "function") alert(POKER_NET_ERR);
          });
      });
    }
    if (findByIdBtn && findByIdInput) {
      function findByIdAndOpen() {
        var raw = (findByIdInput.value || "").trim();
        var byId = false;
        var idPart = raw.replace(/^@/, "").toUpperCase();
        if (/^\d{6}$/.test(idPart) || (/^ID\d{6}$/.test(idPart))) {
          byId = true;
        } else if (idPart.startsWith("ID") && idPart.length === 8 && /^ID\d{6}$/.test(idPart)) {
          byId = true;
        }
        var url;
        if (byId) {
          var id = idPart.startsWith("ID") ? idPart : "ID" + idPart;
          url = base + "/api/users?id=" + encodeURIComponent(id) + pokerApiAuthQuery("&");
        } else {
          var nick = raw.replace(/^@/, "").trim();
          if (!nick) {
            if (tg && tg.showAlert) tg.showAlert("Введите ID (ID123456) или ник (@username)");
            return;
          }
          url = base + "/api/users?username=" + encodeURIComponent(nick) + pokerApiAuthQuery("&");
        }
        findByIdBtn.disabled = true;
        fetch(url)
          .then(function (r) { return r.json(); })
          .then(function (data) {
            findByIdBtn.disabled = false;
            findByIdInput.value = "";
            if (data && data.ok && data.userId) {
              showConv(data.userId, data.userName || data.userId, data.p21Id);
            } else {
              if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Не найдено");
            }
          })
          .catch(function () {
            findByIdBtn.disabled = false;
            if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
          });
      }
      findByIdBtn.addEventListener("click", findByIdAndOpen);
      if (findByIdInput) findByIdInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { e.preventDefault(); findByIdAndOpen(); }
      });
    }
      if (findByIdInput) {
        findByIdInput.addEventListener("focus", function () {
        if (
          typeof window.__pokerIsChatPhysicalKeyboardContext === "function" &&
          window.__pokerIsChatPhysicalKeyboardContext()
        ) {
          return;
        }
        if (typeof window.__pokerActivateChatKeyboardViewport === "function") {
          window.__pokerActivateChatKeyboardViewport();
        } else {
          if (!isTelegramChatRuntime()) {
            document.documentElement.classList.add("chat-keyboard-open");
            document.body.classList.add("chat-keyboard-open");
          }
        }
        try {
          findByIdInput.scrollIntoView({ block: "nearest", behavior: "smooth" });
        } catch (eSi2) {}
      });
      findByIdInput.addEventListener("blur", function () {
        try {
          if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
            window.__pokerFinalizeChatKeyboardDismiss();
          } else {
            if (typeof window.__pokerClearChatKeyboardViewportState === "function") {
              window.__pokerClearChatKeyboardViewportState();
            }
            if (typeof pokerNukeIosKeyboardViewportArtifacts === "function") {
              pokerNukeIosKeyboardViewportArtifacts({ resetMainScroll: true });
            }
          }
        } catch (eFindBlur) {}
      });
    }
    var generalFileInput = document.getElementById("chatGeneralFileInput");
    var generalPdfInput = document.getElementById("chatGeneralPdfInput");
    var generalAttachBtn = document.getElementById("chatGeneralAttachBtn");
    var generalAttachDropdown = document.getElementById("chatGeneralAttachDropdown");
    var generalImagePreview = document.getElementById("chatGeneralImagePreview");
    function closeGeneralAttachDropdown() {
      if (generalAttachDropdown) { generalAttachDropdown.classList.add("chat-attach-dropdown--hidden"); generalAttachDropdown.setAttribute("aria-hidden", "true"); }
      if (generalAttachBtn) generalAttachBtn.setAttribute("aria-expanded", "false");
      document.removeEventListener("click", generalAttachDropdownOutside);
    }
    function generalAttachDropdownOutside(e) {
      if (generalAttachDropdown && !generalAttachDropdown.contains(e.target) && generalAttachBtn && !generalAttachBtn.contains(e.target)) closeGeneralAttachDropdown();
    }
    if (generalAttachBtn && generalFileInput) {
      generalAttachBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (generalAttachDropdown && generalAttachDropdown.classList.contains("chat-attach-dropdown--hidden")) {
          generalAttachDropdown.classList.remove("chat-attach-dropdown--hidden");
          generalAttachDropdown.setAttribute("aria-hidden", "false");
          generalAttachBtn.setAttribute("aria-expanded", "true");
          setTimeout(function () { document.addEventListener("click", generalAttachDropdownOutside); }, 0);
        } else closeGeneralAttachDropdown();
      });
      if (generalAttachDropdown) {
        generalAttachDropdown.querySelectorAll(".chat-attach-dropdown__item").forEach(function (item) {
          item.addEventListener("click", function (e) {
            e.stopPropagation();
            var action = item.getAttribute("data-action");
            if (action === "photo") generalFileInput.click();
            else if (action === "document" && generalPdfInput) generalPdfInput.click();
            else if (action === "contact" && typeof openConvFromDialogs === "function") openConvFromDialogs(item.getAttribute("data-user-id"), item.getAttribute("data-user-name"));
            closeGeneralAttachDropdown();
          });
        });
      }
      generalFileInput.addEventListener("change", function () {
        var f = generalFileInput.files && generalFileInput.files[0];
        if (!f || !f.type.startsWith("image/")) return;
        generalDocument = null;
        // До 800px по длинной стороне, JPEG ~0.92; при перегрузе лимита API плавно снижаем q (не «мыло» 0.6).
        resizeImage(f, 800, 800, 0.92).then(function (dataUrl) {
          generalImage = dataUrl;
          updateGeneralSendBtnIcon();
          if (generalImagePreview) {
            generalImagePreview.innerHTML = '<img class="chat-image-preview__thumb" src="' + dataUrl.replace(/"/g, "&quot;") + '" alt="" /><button type="button" class="chat-image-preview__remove">Убрать</button>';
            generalImagePreview.classList.add("chat-image-preview--visible");
            generalImagePreview.querySelector(".chat-image-preview__remove").addEventListener("click", function () {
              generalImage = null; generalFileInput.value = "";
              updateGeneralSendBtnIcon();
              generalImagePreview.classList.remove("chat-image-preview--visible"); generalImagePreview.innerHTML = "";
            });
          }
        }).catch(function () { if (tg && tg.showAlert) tg.showAlert("Не удалось обработать изображение"); });
        generalFileInput.value = "";
      });
      if (generalPdfInput) {
        generalPdfInput.addEventListener("change", function () {
          var f = generalPdfInput.files && generalPdfInput.files[0];
          if (!f || f.type !== "application/pdf") return;
          if (f.size > 8 * 1024 * 1024) {
            if (tg && tg.showAlert) tg.showAlert("Файл слишком большой. Максимум 8 МБ.");
            generalPdfInput.value = "";
            return;
          }
          generalImage = null;
          var reader = new FileReader();
          reader.onload = function () {
            var dataUrl = reader.result;
            if (dataUrl && typeof dataUrl === "string" && dataUrl.indexOf("data:application/pdf") === 0) {
              generalDocument = { dataUrl: dataUrl, fileName: (f.name || "document.pdf").replace(/[^\w\s.-]/g, "") || "document.pdf" };
              updateGeneralSendBtnIcon();
              if (generalImagePreview) {
                generalImagePreview.innerHTML = '<span class="chat-image-preview__doc">📄 ' + escapeHtml(generalDocument.fileName) + '</span><button type="button" class="chat-image-preview__remove">Убрать</button>';
                generalImagePreview.classList.add("chat-image-preview--visible");
                generalImagePreview.querySelector(".chat-image-preview__remove").addEventListener("click", function () {
                  generalDocument = null; generalPdfInput.value = "";
                  updateGeneralSendBtnIcon();
                  generalImagePreview.classList.remove("chat-image-preview--visible"); generalImagePreview.innerHTML = "";
                });
              }
            } else if (tg && tg.showAlert) tg.showAlert("Не удалось прочитать файл");
          };
          reader.onerror = function () { if (tg && tg.showAlert) tg.showAlert("Не удалось прочитать файл"); };
          reader.readAsDataURL(f);
          generalPdfInput.value = "";
        });
      }
    }
    var CHAT_EMOJIS = ["🔥","✅","😀","😃","😄","😁","😅","😂","🤣","😊","😇","🙂","😉","😍","🥰","😘","😗","😋","😛","😜","🤪","😎","🤩","🥳","👍","👎","👏","🙌","🤝","🙏","❤️","🧡","💛","💚","💙","💜","🖤","🤍","💔","⭐","✨","💯","🎉","🎊","🤔","😐","😑","😶","🙄","😏","😣","😢","😭","😤","😡","🤬","😈","💀","👋","✌️","🤞","💪","🐶","🐱","🎲","♠️","♥️","♦️","♣️"];
    var chatEmojiPicker = document.getElementById("chatEmojiPicker");
    var chatEmojiPickerGrid = document.getElementById("chatEmojiPickerGrid");
    var chatGeneralEmojiBtn = document.getElementById("chatGeneralEmojiBtn");
    var chatPersonalEmojiBtn = document.getElementById("chatPersonalEmojiBtn");
    var chatEmojiPickerTargetInput = null;
    var chatEmojiPickerOpenedVia = null;
    var chatEmojiPickerClose = null;
    function insertEmojiAtCursor(ta, emoji) {
      if (!ta) return;
      var start = ta.selectionStart != null ? ta.selectionStart : ta.value.length;
      var end = ta.selectionEnd != null ? ta.selectionEnd : start;
      var text = ta.value;
      var maxLen = ta.getAttribute("maxlength") ? parseInt(ta.getAttribute("maxlength"), 10) : 500;
      var newText = text.slice(0, start) + emoji + text.slice(end);
      if (newText.length > maxLen) newText = newText.slice(0, maxLen);
      ta.value = newText;
      ta.selectionStart = ta.selectionEnd = Math.min(start + emoji.length, newText.length);
      ta.focus();
      if (typeof resizeChatTextarea === "function") resizeChatTextarea(ta);
      if (ta === chatComposerEl) flushChatComposerToDrafts();
    }
    function hideChatEmojiPicker() {
      if (!chatEmojiPicker) return;
      chatEmojiPicker.classList.add("chat-emoji-picker--hidden");
      chatEmojiPicker.setAttribute("aria-hidden", "true");
      chatEmojiPickerTargetInput = null;
      chatEmojiPickerOpenedVia = null;
      if (chatEmojiPickerClose) {
        document.removeEventListener("click", chatEmojiPickerClose);
        chatEmojiPickerClose = null;
      }
    }
    if (chatEmojiPickerGrid && CHAT_EMOJIS.length) {
      CHAT_EMOJIS.forEach(function (emoji) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "chat-emoji-picker__emoji";
        btn.textContent = emoji;
        btn.setAttribute("aria-label", "Вставить " + emoji);
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          if (chatEmojiPickerTargetInput) insertEmojiAtCursor(chatEmojiPickerTargetInput, emoji);
          hideChatEmojiPicker();
        });
        chatEmojiPickerGrid.appendChild(btn);
      });
    }
    // Одиночный клик/тап по смайлу — открыть пикер, долгое нажатие — открыть шаблоны.
    function bindEmojiButton(btn, templatesChannel) {
      if (!btn || !chatEmojiPicker || !chatComposerEl) return;
      if (templatesChannel !== "general" && templatesChannel !== "personal") return;
      var longPressTimer = null;
      var longPressTriggered = false;
      var LONG_PRESS_MS = 550;
      function clearLongPressTimer() {
        if (longPressTimer) {
          clearTimeout(longPressTimer);
          longPressTimer = null;
        }
      }
      function toggleEmojiPicker() {
        if (chatEmojiPicker.classList.contains("chat-emoji-picker--hidden")) {
          chatEmojiPickerTargetInput = chatComposerEl;
          chatEmojiPickerOpenedVia = btn;
          var rect = btn.getBoundingClientRect();
          chatEmojiPicker.style.left = Math.max(8, Math.min(rect.right - 160, window.innerWidth - 268)) + "px";
          chatEmojiPicker.style.top = (rect.top - 206) + "px";
          chatEmojiPicker.classList.remove("chat-emoji-picker--hidden");
          chatEmojiPicker.setAttribute("aria-hidden", "false");
          chatEmojiPickerClose = function (ev) {
            if (ev.target && !chatEmojiPicker.contains(ev.target) && ev.target !== btn && !btn.contains(ev.target)) {
              hideChatEmojiPicker();
            }
          };
          setTimeout(function () { document.addEventListener("click", chatEmojiPickerClose); }, 0);
        } else if (chatEmojiPickerOpenedVia === btn) {
          hideChatEmojiPicker();
        }
      }
      function startLongPress() {
        clearLongPressTimer();
        longPressTriggered = false;
        longPressTimer = setTimeout(function () {
          longPressTimer = null;
          longPressTriggered = true;
          hideChatEmojiPicker();
          if (typeof tg !== "undefined" && tg && tg.HapticFeedback && tg.HapticFeedback.impactOccurred) {
            try { tg.HapticFeedback.impactOccurred("light"); } catch (eH) {}
          }
          showTemplatesMenu(templatesChannel);
        }, LONG_PRESS_MS);
      }
      btn.addEventListener("touchstart", function () { startLongPress(); }, { passive: true });
      btn.addEventListener("touchend", function () { clearLongPressTimer(); }, { passive: true });
      btn.addEventListener("touchcancel", function () { clearLongPressTimer(); }, { passive: true });
      btn.addEventListener("mousedown", function () { startLongPress(); });
      btn.addEventListener("mouseup", function () { clearLongPressTimer(); });
      btn.addEventListener("mouseleave", function () { clearLongPressTimer(); });
      btn.addEventListener("contextmenu", function (e) {
        e.preventDefault();
      });
      btn.addEventListener("click", function (e) {
        if (longPressTriggered) {
          longPressTriggered = false;
          e.preventDefault();
          return;
        }
        e.stopPropagation();
        toggleEmojiPicker();
      });
    }
    bindEmojiButton(chatGeneralEmojiBtn, "general");
    bindEmojiButton(chatPersonalEmojiBtn, "personal");
    var generalVoiceBtn = document.getElementById("chatGeneralVoiceBtn");
    var generalVoiceRemove = document.getElementById("chatGeneralVoiceRemove");
    var generalVoicePreviewEl = document.getElementById("chatGeneralVoicePreview");
    var generalSendBtnRef = generalSendBtn;
    var sendBtnRef = sendBtn;
    /** Один тап = одно действие: в TG/WKWebView touchend+preventDefault часто убивает click; pointerup(не-mouse)+click дают дубль — режем по времени. */
    function bindChatSendTap(btn, run) {
      if (!btn || typeof run !== "function") return;
      var key = "_pokerChatSendTapBound";
      if (btn[key]) return;
      btn[key] = true;
      var lastInvoke = 0;
      function invoke(e) {
        if (e && typeof e.preventDefault === "function") e.preventDefault();
        var now = Date.now();
        if (now - lastInvoke < 520) return;
        lastInvoke = now;
        try {
          flushChatComposerToDrafts();
        } catch (eInv) {}
        run();
      }
      btn.addEventListener("click", function (e) {
        invoke(e);
      });
      btn.addEventListener(
        "pointerup",
        function (e) {
          if (!e.isPrimary) return;
          if (e.pointerType === "mouse") return;
          invoke(e);
        },
        { passive: false }
      );
    }
    (function initVoiceRecording() {
      var voiceTarget = null;
      var voiceStream = null;
      var voiceChunks = [];
      var voiceRecorder = null;
      /** true с начала onstop до сборки blob или discard — иначе второй тап даёт ветку «!voiceRecorder» и срывает превью. */
      var voiceFinalizeInProgress = false;
      var voiceRecordStartTime = null;
      var voiceRecordTimerInterval = null;
      var generalTimerEl = document.getElementById("chatGeneralVoiceTimer");
      var personalTimerEl = document.getElementById("chatPersonalVoiceTimer");
      var generalBtn = generalVoiceBtn || generalSendBtnRef;
      var personalBtn = document.getElementById("chatPersonalVoiceBtn") || sendBtnRef;
      function stopVoiceTimer() {
        if (voiceRecordTimerInterval) {
          clearInterval(voiceRecordTimerInterval);
          voiceRecordTimerInterval = null;
        }
        voiceRecordStartTime = null;
      }
      function updateVoiceTimer() {
        if (voiceRecordStartTime == null) return;
        var sec = Math.floor((Date.now() - voiceRecordStartTime) / 1000);
        if (generalTimerEl) generalTimerEl.textContent = String(sec);
        if (personalTimerEl) personalTimerEl.textContent = String(sec);
      }
      function startVoiceTimer() {
        stopVoiceTimer();
        voiceRecordStartTime = Date.now();
        if (generalTimerEl) generalTimerEl.textContent = "0";
        if (personalTimerEl) personalTimerEl.textContent = "0";
        updateVoiceTimer();
        voiceRecordTimerInterval = setInterval(updateVoiceTimer, 1000);
      }
      function stopAndDiscard() {
        voiceFinalizeInProgress = false;
        voiceTarget = null;
        stopVoiceTimer();
        if (voiceRecorder && voiceRecorder.state !== "inactive") voiceRecorder.stop();
        voiceRecorder = null;
        if (voiceStream) {
          voiceStream.getTracks().forEach(function (t) { t.stop(); });
          voiceStream = null;
        }
        voiceChunks = [];
      }
      function startRecording(target) {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          if (tg && tg.showAlert) tg.showAlert("Микрофон не поддерживается");
          return;
        }
        voiceFinalizeInProgress = false;
        voiceTarget = target;
        if (target === "general") {
          if (generalBtn) { generalBtn.classList.add("chat-voice-btn--recording"); generalBtn.title = "Остановить запись"; }
          if (generalVoicePreviewEl) {
            generalVoicePreviewEl.classList.remove("chat-voice-preview--hidden");
            generalVoicePreviewEl.classList.add("chat-voice-preview--recording");
          }
        }
        if (target === "personal") {
          if (personalBtn) { personalBtn.classList.add("chat-voice-btn--recording"); personalBtn.title = "Остановить запись"; }
          var pvPrev = document.getElementById("chatPersonalVoicePreview");
          if (pvPrev) {
            pvPrev.classList.remove("chat-voice-preview--hidden");
            pvPrev.classList.add("chat-voice-preview--recording");
          }
        }
        navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
          if (voiceTarget !== target) {
            stream.getTracks().forEach(function (t) { t.stop(); });
            return;
          }
          voiceStream = stream;
          voiceChunks = [];
          var opts = { audioBitsPerSecond: 64000 };
          try {
            voiceRecorder = new MediaRecorder(stream, opts);
          } catch (e) {
            voiceRecorder = new MediaRecorder(stream);
          }
          var savedTarget = target;
          voiceRecorder.ondataavailable = function (e) { if (e.data && e.data.size > 0) voiceChunks.push(e.data); };
          voiceRecorder.onstop = function () {
            stopVoiceTimer();
            var mime = (voiceRecorder && voiceRecorder.mimeType) ? voiceRecorder.mimeType : "audio/webm";
            voiceFinalizeInProgress = true;
            voiceRecorder = null;
            if (voiceStream) {
              voiceStream.getTracks().forEach(function (t) { t.stop(); });
              voiceStream = null;
            }
            var dest = savedTarget;
            var voiceFinalizeDone = false;
            var voiceAssembleDelaysMs = [0, 40, 100, 220, 450, 800];
            function discardEmptyVoiceUi() {
              voiceFinalizeInProgress = false;
              if (dest === "general") {
                if (generalBtn) { generalBtn.classList.remove("chat-voice-btn--recording"); generalBtn.title = "Голосовое сообщение"; }
                if (generalVoicePreviewEl) {
                  generalVoicePreviewEl.classList.remove("chat-voice-preview--recording");
                  generalVoicePreviewEl.classList.add("chat-voice-preview--hidden");
                }
              }
              if (dest === "personal") {
                if (personalBtn) { personalBtn.classList.remove("chat-voice-btn--recording"); personalBtn.title = "Голосовое сообщение"; }
                var pvH = document.getElementById("chatPersonalVoicePreview");
                if (pvH) { pvH.classList.remove("chat-voice-preview--recording"); pvH.classList.add("chat-voice-preview--hidden"); }
              }
              voiceTarget = null;
            }
            function tryAssembleVoiceBlob(attemptIdx) {
              if (voiceFinalizeDone) return;
              if (voiceChunks.length === 0) {
                if (attemptIdx < voiceAssembleDelaysMs.length) {
                  setTimeout(function () {
                    tryAssembleVoiceBlob(attemptIdx + 1);
                  }, voiceAssembleDelaysMs[attemptIdx]);
                } else {
                  voiceFinalizeDone = true;
                  discardEmptyVoiceUi();
                }
                return;
              }
              voiceFinalizeDone = true;
              var blob = new Blob(voiceChunks, { type: mime });
              voiceChunks = [];
              var reader = new FileReader();
              reader.onerror = function () {
                discardEmptyVoiceUi();
              };
              reader.onloadend = function () {
                voiceFinalizeInProgress = false;
                var dataUrl = reader.result;
                if (typeof dataUrl === "string") dataUrl = pokerNormalizeVoiceDataUrl(dataUrl, mime);
                if (dest === "general") {
                  generalVoice = dataUrl;
                  if (typeof updateGeneralSendBtnIcon === "function") updateGeneralSendBtnIcon();
                  if (generalVoicePreviewEl) {
                    generalVoicePreviewEl.classList.remove("chat-voice-preview--recording");
                    generalVoicePreviewEl.classList.remove("chat-voice-preview--hidden");
                  }
                } else if (dest === "personal") {
                  personalVoice = dataUrl;
                  if (typeof updatePersonalSendBtnIcon === "function") updatePersonalSendBtnIcon();
                  var pv = document.getElementById("chatPersonalVoicePreview");
                  if (pv) {
                    pv.classList.remove("chat-voice-preview--recording");
                    pv.classList.remove("chat-voice-preview--hidden");
                  }
                }
                voiceTarget = null;
              };
              reader.readAsDataURL(blob);
            }
            /* WebKit/TG WebView: dataavailable может прийти с задержкой после onstop. */
            setTimeout(function () {
              tryAssembleVoiceBlob(0);
            }, 0);
          };
          try {
            voiceRecorder.start(250);
          } catch (eStartSlice) {
            voiceRecorder.start();
          }
          startVoiceTimer();
        }).catch(function () {
          voiceTarget = null;
          stopVoiceTimer();
          if (target === "general" && generalBtn) { generalBtn.classList.remove("chat-voice-btn--recording"); generalBtn.title = "Голосовое сообщение"; if (generalVoicePreviewEl) { generalVoicePreviewEl.classList.remove("chat-voice-preview--recording"); generalVoicePreviewEl.classList.add("chat-voice-preview--hidden"); } }
          if (target === "personal") {
            if (personalBtn) { personalBtn.classList.remove("chat-voice-btn--recording"); personalBtn.title = "Голосовое сообщение"; }
            var pvErr = document.getElementById("chatPersonalVoicePreview");
            if (pvErr) { pvErr.classList.remove("chat-voice-preview--recording"); pvErr.classList.add("chat-voice-preview--hidden"); }
          }
          if (tg && tg.showAlert) tg.showAlert("Нет доступа к микрофону");
        });
      }
      function runGeneralSendAction() {
        if (voiceTarget === "general") {
          stopVoiceTimer();
          if (voiceRecorder) {
            try {
              if (voiceRecorder.state === "recording" && voiceRecorder.requestData) voiceRecorder.requestData();
              voiceRecorder.stop();
            } catch (err) {}
          } else if (!voiceFinalizeInProgress && !voiceStream) {
            voiceTarget = null;
            if (generalVoicePreviewEl) { generalVoicePreviewEl.classList.remove("chat-voice-preview--recording"); generalVoicePreviewEl.classList.add("chat-voice-preview--hidden"); }
          }
          if (generalBtn) {
            generalBtn.classList.remove("chat-voice-btn--recording");
            generalBtn.title = "Голосовое сообщение";
          }
          if (generalSendBtnRef && typeof updateGeneralSendBtnIcon === "function") updateGeneralSendBtnIcon();
        } else if (voiceTarget === "personal") {
          stopAndDiscard();
          if (personalBtn) personalBtn.classList.remove("chat-voice-btn--recording");
          var pvPrev = document.getElementById("chatPersonalVoicePreview");
          if (pvPrev) { pvPrev.classList.remove("chat-voice-preview--recording"); pvPrev.classList.add("chat-voice-preview--hidden"); }
          startRecording("general");
        } else if (getChatGeneralText().trim() || generalImage || generalVoice || generalDocument) {
          sendGeneral();
        } else {
          startRecording("general");
        }
      }
      bindChatSendTap(generalBtn, runGeneralSendAction);
      if (generalVoiceRemove && generalVoicePreviewEl) {
        generalVoiceRemove.addEventListener("click", function () {
          generalVoice = null;
          generalVoicePreviewEl.classList.add("chat-voice-preview--hidden");
          if (typeof updateGeneralSendBtnIcon === "function") updateGeneralSendBtnIcon();
        });
      }
      var generalVoiceSend = document.getElementById("chatGeneralVoiceSend");
      if (generalVoiceSend) generalVoiceSend.addEventListener("click", function () { sendGeneral(); });
      var generalVoiceStop = document.getElementById("chatGeneralVoiceStop");
      if (generalVoiceStop) generalVoiceStop.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (voiceTarget === "general") {
          stopVoiceTimer();
          if (voiceRecorder) {
            try {
              if (voiceRecorder.state === "recording" && voiceRecorder.requestData) voiceRecorder.requestData();
              voiceRecorder.stop();
            } catch (err) {}
          } else if (!voiceFinalizeInProgress && !voiceStream) {
            voiceTarget = null;
            if (generalVoicePreviewEl) { generalVoicePreviewEl.classList.remove("chat-voice-preview--recording"); generalVoicePreviewEl.classList.add("chat-voice-preview--hidden"); }
          }
          if (generalBtn) { generalBtn.classList.remove("chat-voice-btn--recording"); generalBtn.title = "Голосовое сообщение"; }
          if (generalSendBtnRef && typeof updateGeneralSendBtnIcon === "function") updateGeneralSendBtnIcon();
        }
      });
      var personalVoiceRemove = document.getElementById("chatPersonalVoiceRemove");
      var personalVoicePreviewEl = document.getElementById("chatPersonalVoicePreview");
      function runPersonalSendAction() {
        if (voiceTarget === "personal") {
          stopVoiceTimer();
          if (voiceRecorder) {
            try {
              if (voiceRecorder.state === "recording" && voiceRecorder.requestData) voiceRecorder.requestData();
              voiceRecorder.stop();
            } catch (err) {}
          } else if (!voiceFinalizeInProgress && !voiceStream) {
            voiceTarget = null;
            var pvPrev = document.getElementById("chatPersonalVoicePreview");
            if (pvPrev) { pvPrev.classList.remove("chat-voice-preview--recording"); pvPrev.classList.add("chat-voice-preview--hidden"); }
          }
          if (personalBtn) {
            personalBtn.classList.remove("chat-voice-btn--recording");
            personalBtn.title = "Голосовое сообщение";
          }
          if (sendBtnRef && typeof updatePersonalSendBtnIcon === "function") updatePersonalSendBtnIcon();
        } else if (voiceTarget === "general") {
          stopAndDiscard();
          if (generalBtn) generalBtn.classList.remove("chat-voice-btn--recording");
          if (generalVoicePreviewEl) { generalVoicePreviewEl.classList.remove("chat-voice-preview--recording"); generalVoicePreviewEl.classList.add("chat-voice-preview--hidden"); }
          startRecording("personal");
        } else if (getChatPersonalText().trim() || personalImage || personalVoice || personalDocument) {
          sendMessage();
        } else {
          startRecording("personal");
        }
      }
      bindChatSendTap(personalBtn, runPersonalSendAction);
      if (personalVoiceRemove && personalVoicePreviewEl) {
        personalVoiceRemove.addEventListener("click", function () {
          personalVoice = null;
          personalVoicePreviewEl.classList.add("chat-voice-preview--hidden");
          if (typeof updatePersonalSendBtnIcon === "function") updatePersonalSendBtnIcon();
        });
      }
      var personalVoiceSend = document.getElementById("chatPersonalVoiceSend");
      if (personalVoiceSend) personalVoiceSend.addEventListener("click", function () { sendMessage(); });
      var personalVoiceStop = document.getElementById("chatPersonalVoiceStop");
      if (personalVoiceStop) personalVoiceStop.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (voiceTarget === "personal") {
          stopVoiceTimer();
          if (voiceRecorder) {
            try {
              if (voiceRecorder.state === "recording" && voiceRecorder.requestData) voiceRecorder.requestData();
              voiceRecorder.stop();
            } catch (err) {}
          } else if (!voiceFinalizeInProgress && !voiceStream) {
            voiceTarget = null;
            var pvPrev = document.getElementById("chatPersonalVoicePreview");
            if (pvPrev) { pvPrev.classList.remove("chat-voice-preview--recording"); pvPrev.classList.add("chat-voice-preview--hidden"); }
          }
          if (personalBtn) { personalBtn.classList.remove("chat-voice-btn--recording"); personalBtn.title = "Голосовое сообщение"; }
          if (sendBtnRef && typeof updatePersonalSendBtnIcon === "function") updatePersonalSendBtnIcon();
        }
      });
    })();

    // Личный чат: запасной touchend только если есть отдельная кнопка 🎤 (personalBtn внутри IIFE выше — снаружи не видна; иначе ReferenceError и обрыв всего app.js после initChat).
    if (sendBtn && chatComposerEl && document.getElementById("chatPersonalVoiceBtn")) {
      sendBtn.addEventListener("touchend", function (e) {
        var hasContentP = getChatPersonalText().trim() || personalImage || personalVoice || personalDocument;
        if (!hasContentP) return;
        e.preventDefault();
        e.stopPropagation();
        sendMessage();
      }, { passive: false });
    }
    function updateGeneralSendBtnIcon() {
      if (!generalSendBtn) return;
      if (sendingGeneral) return;
      var hasContent = getChatGeneralText().trim() || generalImage || generalVoice || generalDocument;
      generalSendBtn.textContent = hasContent ? "\u2191" : "\uD83C\uDFA4";
      generalSendBtn.title = hasContent ? "Отправить" : "Голосовое сообщение";
      generalSendBtn.setAttribute("aria-label", hasContent ? "Отправить" : "Записать голосовое");
      generalSendBtn.classList.toggle("chat-send-btn--mic", !hasContent);
    }
    function updatePersonalSendBtnIcon() {
      if (!sendBtn) return;
      if (sendingPrivate) return;
      var hasContent = getChatPersonalText().trim() || personalImage || personalVoice || personalDocument;
      sendBtn.textContent = hasContent ? "\u2191" : "\uD83C\uDFA4";
      sendBtn.title = hasContent ? "Отправить" : "Голосовое сообщение";
      sendBtn.setAttribute("aria-label", hasContent ? "Отправить" : "Записать голосовое");
      sendBtn.classList.toggle("chat-send-btn--mic", !hasContent);
    }
    function resizeChatTextarea(ta) {
      if (
        ta &&
        (
          isTelegramChatRuntime() ||
          (
            typeof shouldUseNativeTelegramIosChatComposerFlow === "function" &&
            shouldUseNativeTelegramIosChatComposerFlow(ta)
          )
        )
      ) {
        try {
          ta.style.height = "44px";
          ta.style.minHeight = "44px";
          ta.style.maxHeight = "44px";
          ta.style.overflowY = "hidden";
        } catch (eTmaFreezeTa) {}
        return;
      }
      if (typeof pokerAutosizeTextarea === "function") {
        pokerAutosizeTextarea(ta, { maxHeight: 140, minHeight: 44 });
      }
    }
    function isDirectMountedChatComposer(ta, mode) {
      if (!ta) return false;
      if (mode === "general") return ta === chatGeneralComposerEl || (!!chatGeneralComposerMount && chatGeneralComposerMount.contains(ta));
      if (mode === "personal") return ta === chatPersonalComposerEl || (!!chatPersonalComposerMount && chatPersonalComposerMount.contains(ta));
      return false;
    }
    function bindChatComposerInputEvents(ta) {
      if (!ta || ta.__pokerChatInputEventsBound) return;
      ta.__pokerChatInputEventsBound = true;
      ta.addEventListener("input", function () {
        chatComposerEl = ta;
        flushChatComposerToDrafts();
        resizeChatTextarea(ta);
        try {
          if (document.body.classList.contains("chat-keyboard-open") && !shouldUseNativeTelegramIosChatComposerFlow(ta)) {
            var rafI = window.requestAnimationFrame || function (fn) {
              setTimeout(fn, 16);
            };
            rafI(function () {
              try {
                updateChatMessagesKeyboardPad();
              } catch (eSynI) {}
            });
          }
        } catch (ePadSyn) {}
        updateGeneralSendBtnIcon();
        updatePersonalSendBtnIcon();
        if (isDirectMountedChatComposer(ta, "personal") || chatComposerMounted === "personal") {
          if ((ta.value || "").trim()) {
            pokerChatSendTypingState(true);
            pokerChatScheduleTypingStop();
          } else {
            if (chatTypingStopTimer) {
              clearTimeout(chatTypingStopTimer);
              chatTypingStopTimer = 0;
            }
            pokerChatSendTypingState(false);
          }
        }
        try {
          var rawV = ta.value || "";
          var trimmedV = rawV.trim();
          var modalOpen = chatTemplatesModal && chatTemplatesModal.getAttribute("aria-hidden") === "false";
          if (!modalOpen && trimmedV === "/") {
            ta.value = "";
            flushChatComposerToDrafts();
            updateGeneralSendBtnIcon();
            updatePersonalSendBtnIcon();
            resizeChatTextarea(ta);
            if (isDirectMountedChatComposer(ta, "general") || chatComposerMounted === "general") showTemplatesMenu("general");
            else if (isDirectMountedChatComposer(ta, "personal") || chatComposerMounted === "personal") showTemplatesMenu("personal");
          }
        } catch (err) {}
      });
      ta.addEventListener("focus", function () {
        chatComposerEl = ta;
        resizeChatTextarea(ta);
        if ((isDirectMountedChatComposer(ta, "personal") || chatComposerMounted === "personal") && (ta.value || "").trim()) {
          pokerChatSendTypingState(true);
          pokerChatScheduleTypingStop();
        }
      });
      ta.addEventListener("change", function () {
        chatComposerEl = ta;
        flushChatComposerToDrafts();
        updateGeneralSendBtnIcon();
        updatePersonalSendBtnIcon();
      });
      ta.addEventListener("blur", function () {
        if (isDirectMountedChatComposer(ta, "personal") || chatComposerMounted === "personal") {
          if (chatTypingStopTimer) {
            clearTimeout(chatTypingStopTimer);
            chatTypingStopTimer = 0;
          }
          pokerChatSendTypingState(false);
        }
      });
      ta.addEventListener("keydown", function (e) {
        chatComposerEl = ta;
        if (e.key !== "Enter" || e.shiftKey) return;
        try {
          if (chatPersonalComposerMount && chatPersonalComposerMount.contains(ta)) {
            e.preventDefault();
            sendMessage();
            return;
          }
          if (chatGeneralComposerMount && chatGeneralComposerMount.contains(ta)) {
            e.preventDefault();
            sendGeneral();
            return;
          }
        } catch (eKd) {}
        if (isDirectMountedChatComposer(ta, "personal") || chatComposerMounted === "personal") {
          e.preventDefault();
          sendMessage();
        } else if (isDirectMountedChatComposer(ta, "general") || chatComposerMounted === "general") {
          e.preventDefault();
          sendGeneral();
        }
      });
      resizeChatTextarea(ta);
    }
    (function () {
      var chatComposerInputTargets = [
        chatSharedComposerEl,
        chatGeneralComposerEl,
        chatPersonalComposerEl
      ];
      chatComposerInputTargets.forEach(bindChatComposerInputEvents);
    })();
    updateGeneralSendBtnIcon();
    var generalReplyCancel = document.querySelector("#chatGeneralReplyPreview .chat-reply-preview__cancel");
    if (generalReplyCancel) generalReplyCancel.addEventListener("click", function () {
      if (chatEditMode && chatEditSource === "general") {
        clearChatEditUI();
        return;
      }
      generalReplyTo = null;
      var p = document.getElementById("chatGeneralReplyPreview");
      if (p) { p.classList.remove("chat-reply-preview--visible"); p.querySelector(".chat-reply-preview__text").textContent = ""; }
    });
    var personalFileInput = document.getElementById("chatPersonalFileInput");
    var personalPdfInput = document.getElementById("chatPersonalPdfInput");
    var personalAttachBtn = document.getElementById("chatPersonalAttachBtn");
    var personalAttachDropdown = document.getElementById("chatPersonalAttachDropdown");
    var personalImagePreview = document.getElementById("chatPersonalImagePreview");
    function closePersonalAttachDropdown() {
      if (personalAttachDropdown) { personalAttachDropdown.classList.add("chat-attach-dropdown--hidden"); personalAttachDropdown.setAttribute("aria-hidden", "true"); }
      if (personalAttachBtn) personalAttachBtn.setAttribute("aria-expanded", "false");
      document.removeEventListener("click", personalAttachDropdownOutside);
    }
    function personalAttachDropdownOutside(e) {
      if (personalAttachDropdown && !personalAttachDropdown.contains(e.target) && personalAttachBtn && !personalAttachBtn.contains(e.target)) closePersonalAttachDropdown();
    }
    if (personalAttachBtn && personalFileInput) {
      personalAttachBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (personalAttachDropdown && personalAttachDropdown.classList.contains("chat-attach-dropdown--hidden")) {
          personalAttachDropdown.classList.remove("chat-attach-dropdown--hidden");
          personalAttachDropdown.setAttribute("aria-hidden", "false");
          personalAttachBtn.setAttribute("aria-expanded", "true");
          setTimeout(function () { document.addEventListener("click", personalAttachDropdownOutside); }, 0);
        } else closePersonalAttachDropdown();
      });
      if (personalAttachDropdown) {
        personalAttachDropdown.querySelectorAll(".chat-attach-dropdown__item").forEach(function (item) {
          item.addEventListener("click", function (e) {
            e.stopPropagation();
            var action = item.getAttribute("data-action");
            if (action === "photo") personalFileInput.click();
            else if (action === "document" && personalPdfInput) personalPdfInput.click();
            closePersonalAttachDropdown();
          });
        });
      }
      personalFileInput.addEventListener("change", function () {
        var f = personalFileInput.files && personalFileInput.files[0];
        if (!f || !f.type.startsWith("image/")) return;
        personalDocument = null;
        resizeImage(f, 800, 800, 0.92).then(function (dataUrl) {
          personalImage = dataUrl;
          updatePersonalSendBtnIcon();
          if (personalImagePreview) {
            personalImagePreview.innerHTML = '<img class="chat-image-preview__thumb" src="' + dataUrl.replace(/"/g, "&quot;") + '" alt="" /><button type="button" class="chat-image-preview__remove">Убрать</button>';
            personalImagePreview.classList.add("chat-image-preview--visible");
            personalImagePreview.querySelector(".chat-image-preview__remove").addEventListener("click", function () {
              personalImage = null; personalFileInput.value = "";
              updatePersonalSendBtnIcon();
              personalImagePreview.classList.remove("chat-image-preview--visible"); personalImagePreview.innerHTML = "";
            });
          }
        }).catch(function () { if (tg && tg.showAlert) tg.showAlert("Не удалось обработать изображение"); });
        personalFileInput.value = "";
      });
      if (personalPdfInput) {
        personalPdfInput.addEventListener("change", function () {
          var f = personalPdfInput.files && personalPdfInput.files[0];
          if (!f || f.type !== "application/pdf") return;
          if (f.size > 8 * 1024 * 1024) {
            if (tg && tg.showAlert) tg.showAlert("Файл слишком большой. Максимум 8 МБ.");
            personalPdfInput.value = "";
            return;
          }
          personalImage = null;
          var reader = new FileReader();
          reader.onload = function () {
            var dataUrl = reader.result;
            if (dataUrl && typeof dataUrl === "string" && dataUrl.indexOf("data:application/pdf") === 0) {
              personalDocument = { dataUrl: dataUrl, fileName: (f.name || "document.pdf").replace(/[^\w\s.-]/g, "") || "document.pdf" };
              updatePersonalSendBtnIcon();
              if (personalImagePreview) {
                personalImagePreview.innerHTML = '<span class="chat-image-preview__doc">📄 ' + escapeHtml(personalDocument.fileName) + '</span><button type="button" class="chat-image-preview__remove">Убрать</button>';
                personalImagePreview.classList.add("chat-image-preview--visible");
                personalImagePreview.querySelector(".chat-image-preview__remove").addEventListener("click", function () {
                  personalDocument = null; personalPdfInput.value = "";
                  updatePersonalSendBtnIcon();
                  personalImagePreview.classList.remove("chat-image-preview--visible"); personalImagePreview.innerHTML = "";
                });
              }
            } else if (tg && tg.showAlert) tg.showAlert("Не удалось прочитать файл");
          };
          reader.onerror = function () { if (tg && tg.showAlert) tg.showAlert("Не удалось прочитать файл"); };
          reader.readAsDataURL(f);
          personalPdfInput.value = "";
        });
      }
    }
    updatePersonalSendBtnIcon();
    var personalReplyCancel = document.querySelector("#chatPersonalReplyPreview .chat-reply-preview__cancel");
    if (personalReplyCancel) personalReplyCancel.addEventListener("click", function () {
      if (chatEditMode && chatEditSource === "personal") {
        clearChatEditUI();
        return;
      }
      personalReplyTo = null;
      var p = document.getElementById("chatPersonalReplyPreview");
      if (p) { p.classList.remove("chat-reply-preview--visible"); p.querySelector(".chat-reply-preview__text").textContent = ""; }
    });
    if (generalMessages) {
      generalMessages.addEventListener("click", function (e) {
        var retryBtn = e.target && e.target.closest ? e.target.closest("[data-chat-retry]") : null;
        if (!retryBtn) return;
        e.preventDefault();
        e.stopPropagation();
        retryFailedOutgoingChat(String(retryBtn.getAttribute("data-chat-retry") || "general"));
      });
    }
    if (messagesEl) {
      messagesEl.addEventListener("click", function (e) {
        var retryBtn = e.target && e.target.closest ? e.target.closest("[data-chat-retry]") : null;
        if (!retryBtn) return;
        e.preventDefault();
        e.stopPropagation();
        retryFailedOutgoingChat(String(retryBtn.getAttribute("data-chat-retry") || "personal"));
      });
    }
  }

  if (window.__pendingOpenClubChatGeneral) {
    window.__pendingOpenClubChatGeneral = false;
    window.__openClubChatAfterNextContacts = true;
  }
  if (window.__pendingOpenChatPersonalFromDeepLink && typeof openConvFromDialogs === "function") {
    pokerPushOpenDebug("initChat-branch", window.__pendingOpenChatPersonalFromDeepLink.userId || "");
    var pdlInit = window.__pendingOpenChatPersonalFromDeepLink;
    if (
      pdlInit &&
      pdlInit.userId &&
      typeof pokerOpenChatPeerDirectFallback === "function" &&
      pokerOpenChatPeerDirectFallback(pdlInit.userId, pdlInit.userName || pdlInit.userId)
    ) {
      try {
        pokerSchedulePendingPushDmContactsReload(pdlInit.userId, pdlInit.userName || pdlInit.userId);
      } catch (ePdlInitMeta) {}
    } else {
      if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function") {
        window.__pokerEnsureOpenPendingChatPersonalFromDeepLink();
      }
    }
  } else if (window.__pendingOpenManagerFromCashout && typeof openConvFromDialogs === "function") {
    var pcm = window.__pendingOpenManagerFromCashout;
    window.__pendingOpenManagerFromCashout = null;
    openConvFromDialogs(pcm.userId, pcm.userName || "Менеджер");
  } else if (typeof pokerGuardDefaultDialogsOpen === "function" && pokerGuardDefaultDialogsOpen()) {
  } else {
    pokerPushOpenSetCaller("initChat-default");
    showDialogs();
  }

  if (dialogsView) {
    var assetPath = (window.location.pathname || "").replace(/\/[^/]*$/, "") || "/";
    var assetBase = assetPath.replace(/\/?$/, "/") + "assets/";
    dialogsView.querySelectorAll(".chat-dialog-item img.chat-dialog-item__avatar[src]").forEach(function (img) {
      var s = img.getAttribute("src") || "";
      if (s.indexOf("dep-manager") !== -1) img.src = assetBase + (s.indexOf("vika") !== -1 ? "dep-manager-vika.jpg" : "dep-manager.jpg");
      else if (s.indexOf("logo-two-aces") !== -1) img.src = assetBase + "logo-two-aces.png";
    });
  }

  function updateAdminShiftOnline() {
    if (!dialogsView) return;
    var moscowHour = parseInt(new Date().toLocaleString("en-GB", { timeZone: "Europe/Moscow", hour: "2-digit", hour12: false }), 10);
    if (isNaN(moscowHour)) moscowHour = new Date().getUTCHours() + 3;
    if (moscowHour < 0) moscowHour += 24;
    if (moscowHour >= 24) moscowHour -= 24;
    dialogsView.querySelectorAll(".chat-dialog-item[data-shift-start][data-shift-end]").forEach(function (btn) {
      var start = parseInt(btn.dataset.shiftStart, 10);
      var end = parseInt(btn.dataset.shiftEnd, 10);
      var onShift = false;
      if (start <= end) onShift = moscowHour >= start && moscowHour < end;
      else onShift = moscowHour >= start || moscowHour < end;
      var onEl = btn.querySelector(".chat-dialog-item__online");
      if (!onEl) return;
      var currentlyVisible = onEl.classList.contains("chat-dialog-item__online--visible");
      if (currentlyVisible !== !!onShift) {
        onEl.classList.toggle("chat-dialog-item__online--visible", !!onShift);
      }
    });
  }
  updateAdminShiftOnline();

  if (chatGeneralBackBtn) chatGeneralBackBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    pokerPushOpenSetCaller("general-back-btn");
    showDialogs();
  });
  var chatGeneralTitleBtn = document.getElementById("chatGeneralTitleBtn");
  if (chatGeneralTitleBtn) {
    chatGeneralTitleBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof window.__pokerOpenChatGeneralMembersModal === "function") {
        window.__pokerOpenChatGeneralMembersModal();
      }
    });
  }

  (function initChatGeneralInviteFriendBtn() {
    var inviteBtn = document.getElementById("chatGeneralInviteFriendBtn");
    if (!inviteBtn || inviteBtn.getAttribute("data-invite-bound") === "1") return;
    inviteBtn.setAttribute("data-invite-bound", "1");
    inviteBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var link = typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink("club_chat") : "";
      if (!link) return;
      if (isTelegramWebApp() && typeof pokerOpenTelegramShareUrlOnly === "function" && pokerOpenTelegramShareUrlOnly(link)) {
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("chat_general_invite_friend");
        return;
      }
      var text = "Заходи в общий чат клуба «Два туза» в приложении:\n" + link;
      var shareCaption = "Заходи в общий чат клуба «Два туза» в приложении:";
      var shareUrl =
        typeof pokerBuildTelegramShareUrlDialog === "function" ? pokerBuildTelegramShareUrlDialog(link, shareCaption) : "";
      pokerTryPwaWebShare({ text: text, url: link }).then(function (pwaOk) {
        if (pwaOk) {
          if (typeof recordShareButtonClick === "function") recordShareButtonClick("chat_general_invite_friend");
          return;
        }
        var tgw = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tgw && tgw.openTelegramLink) tgw.openTelegramLink(shareUrl);
        else if (tgw && tgw.openLink) tgw.openLink(shareUrl);
        else window.open(shareUrl, "_blank");
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("chat_general_invite_friend");
      });
    });
  })();

  (function initChatGeneralCopyLinkBtn() {
    var copyBtn = document.getElementById("chatGeneralCopyLinkBtn");
    if (!copyBtn || copyBtn.getAttribute("data-copy-bound") === "1") return;
    copyBtn.setAttribute("data-copy-bound", "1");
    copyBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var link =
        typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink("club_chat") : "";
      if (!link) return;
      var msg = "Ссылка на общий чат скопирована. Отправь другу — откроется этот чат в приложении.";
      if (typeof navigator.clipboard !== "undefined" && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link).then(function () {
          var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tg && tg.showAlert) tg.showAlert(msg);
          else alert("Ссылка скопирована.");
        }).catch(function () {
          var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tg && tg.showAlert) tg.showAlert("Ссылка: " + link);
          else alert("Ссылка: " + link);
        });
      } else {
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.showAlert) tg.showAlert("Ссылка: " + link);
        else alert("Ссылка: " + link);
      }
      if (typeof recordShareButtonClick === "function") recordShareButtonClick("chat_general_copy_link");
    });
  })();

  function runDialogActionForBtn(btn) {
    var raw = (btn.dataset.chatUserId || "").trim();
    var userName = btn.dataset.chatUserName || "Менеджер";
    if (!raw) return;
    function doShow(tgUserId) { openConvFromDialogs(tgUserId, userName); }
    if (raw.startsWith("tg_") && raw !== "tg_roman") {
      doShow(raw);
    } else if (raw === "tg_roman") {
      var romanUsername = "roman1787443";
      fetch(base + "/api/users?username=" + encodeURIComponent(romanUsername) + pokerApiAuthQuery("&"))
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data && data.ok && data.userId) doShow(data.userId);
          else if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Не найдено");
        })
        .catch(function () { if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR); });
      return;
    } else if (/^ID\d{6}$/.test(raw.toUpperCase())) {
      var id = raw.toUpperCase();
      fetch(base + "/api/users?id=" + encodeURIComponent(id) + pokerApiAuthQuery("&"))
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data && data.ok && data.userId) doShow(data.userId);
          else if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Не найдено");
        })
        .catch(function () { if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR); });
    } else {
      doShow("tg_" + raw);
    }
  }

  if (dialogsView) {
    function openDialogsViewItem(el) {
      if (!el || !dialogsView.contains(el)) return;
      if (el.blur) el.blur();
      if (el.classList && el.classList.contains("chat-dialog-item--find-user")) {
        if (findByIdInputDialogs) findByIdInputDialogs.focus();
        return;
      }
      if (el.classList && el.classList.contains("chat-dialog-item--club")) {
        if (el._clubLongPressHandled) {
          el._clubLongPressHandled = false;
          return;
        }
        tryOpenClubChatFromDialogs();
        return;
      }
      if (el.classList && el.classList.contains("chat-contact") && el.dataset.chatId) {
        var rowAv = "";
        var imgRow = el.querySelector("img.chat-contact__avatar");
        if (imgRow) {
          try {
            rowAv = imgRow.getAttribute("src") || imgRow.src || "";
          } catch (eRowAv) {
            rowAv = "";
          }
        }
        openConvFromDialogs(el.dataset.chatId, el.dataset.chatName, "", rowAv || undefined, el.dataset.chatVerified === "1", el.dataset.chatStatusLevel || "");
        return;
      }
      if (el.getAttribute && el.getAttribute("data-chat-user-id")) {
        runDialogActionForBtn(el);
      }
    }
    var dialogsSelector = ".chat-dialog-item--club, .chat-dialog-item--find-user, .chat-dialog-item[data-chat-user-id], .chat-contact";
    /** Долгое нажатие на строку личного диалога: превью переписки (игроки и админы; не клуб / не поиск). */
    function dialogRowEligibleForPlayerPreview(btn) {
      if (!btn || !btn.classList) return false;
      if (btn.classList.contains("chat-dialog-item--find-user")) return false;
      if (btn.classList.contains("chat-dialog-item--club")) return false;
      if (btn.classList.contains("chat-contact") && btn.dataset.chatId) {
        if (btn.getAttribute("data-chat-group") === "1") return false;
        return true;
      }
      if (btn.getAttribute && btn.getAttribute("data-chat-user-id")) return true;
      return false;
    }
    function getDialogPreviewPeerFromBtn(btn) {
      if (!btn) return null;
      if (btn.classList.contains("chat-contact") && btn.dataset.chatId) {
        if (btn.getAttribute("data-chat-group") === "1") return null;
        return {
          userId: btn.dataset.chatId,
          userName: btn.dataset.chatName || "",
          p21Id: "",
        };
      }
      var uid = btn.getAttribute("data-chat-user-id");
      if (uid) {
        var uname = btn.getAttribute("data-chat-user-name") || "";
        if (!uname) {
          var lab = btn.querySelector(".chat-dialog-item__label");
          if (lab) uname = (lab.textContent || "").trim();
        }
        return { userId: uid, userName: uname, p21Id: "" };
      }
      return null;
    }
    /** Порог в px: если палец сдвинулся больше — считаем жест скроллом, не открываем диалог. */
    var CHAT_DIALOG_TAP_MOVE_THRESHOLD = 18;
    function attachChatDialogButton(btn) {
      if (btn._chatDialogAttached) return;
      btn._chatDialogAttached = true;
      function detachMoveListeners() {
        document.removeEventListener("pointermove", onDocMove, true);
        document.removeEventListener("pointerup", onDocUp, true);
        document.removeEventListener("pointercancel", onDocUp, true);
      }
      function onDocMove(e) {
        if (!btn._chatTapTracking || e.pointerId !== btn._chatTapPtrId) return;
        if (
          Math.abs(e.clientX - btn._chatTapStartX) > CHAT_DIALOG_TAP_MOVE_THRESHOLD ||
          Math.abs(e.clientY - btn._chatTapStartY) > CHAT_DIALOG_TAP_MOVE_THRESHOLD
        ) {
          btn._chatTapWasScroll = true;
          if (btn._dialogPreviewLpTimer) {
            clearTimeout(btn._dialogPreviewLpTimer);
            btn._dialogPreviewLpTimer = null;
          }
        }
      }
      function onDocUp(e) {
        if (e.pointerId !== btn._chatTapPtrId) return;
        btn._chatTapTracking = false;
        if (btn._dialogPreviewLpTimer) {
          clearTimeout(btn._dialogPreviewLpTimer);
          btn._dialogPreviewLpTimer = null;
        }
        detachMoveListeners();
      }
      btn.addEventListener(
        "pointerdown",
        function (e) {
          if (e.button != null && e.button !== 0) return;
          btn._chatTapWasScroll = false;
          btn._chatTapTracking = true;
          btn._chatTapPtrId = e.pointerId;
          btn._chatTapStartX = e.clientX;
          btn._chatTapStartY = e.clientY;
          try {
            if (typeof prefetchPersonalMessages === "function") {
              var preId = null;
              if (btn.classList.contains("chat-contact") && btn.dataset.chatId) {
                preId = String(btn.dataset.chatId);
              } else {
                var duPre = btn.getAttribute("data-chat-user-id");
                if (duPre && !btn.classList.contains("chat-dialog-item--club")) preId = String(duPre);
              }
              if (preId) prefetchPersonalMessages(preId);
            }
          } catch (eWarmTap) {}
          if (dialogRowEligibleForPlayerPreview(btn)) {
            if (btn._dialogPreviewLpTimer) {
              clearTimeout(btn._dialogPreviewLpTimer);
              btn._dialogPreviewLpTimer = null;
            }
            btn._dialogPreviewLpTimer = setTimeout(function () {
              btn._dialogPreviewLpTimer = null;
              if (!dialogRowEligibleForPlayerPreview(btn)) return;
              var peer = getDialogPreviewPeerFromBtn(btn);
              if (!peer || !peer.userId) return;
              btn._dialogPreviewLongPressHandled = true;
              btn._chatTapWasScroll = false;
              if (typeof tg !== "undefined" && tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred("medium");
              openChatDialogPreviewModal(peer.userId, peer.userName, peer.p21Id);
            }, 550);
          }
          document.addEventListener("pointermove", onDocMove, true);
          document.addEventListener("pointerup", onDocUp, true);
          document.addEventListener("pointercancel", onDocUp, true);
        },
        { passive: true }
      );
      btn.addEventListener(
        "click",
        function (e) {
          if (btn._dialogPreviewLongPressHandled) {
            e.preventDefault();
            e.stopPropagation();
            btn._dialogPreviewLongPressHandled = false;
            return;
          }
          if (btn._chatTapWasScroll) {
            e.preventDefault();
            e.stopPropagation();
            btn._chatTapWasScroll = false;
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          try {
            openDialogsViewItem(btn);
          } catch (eOpenDialogItem) {
            try {
              console.error("chat dialog open failed", eOpenDialogItem);
            } catch (eLogOpenDialog) {}
            try {
              if (typeof showDialogs === "function") showDialogs();
            } catch (eRecoverDialog) {}
          }
        },
        { capture: true }
      );
    }
    function attachAllChatDialogButtons() {
      if (!dialogsView) return;
      dialogsView.querySelectorAll(dialogsSelector).forEach(attachChatDialogButton);
    }
    attachAllChatDialogButtons();
    window.chatAttachDialogButtons = attachAllChatDialogButtons;

    (function bindClubChatAdminLongPress() {
      var btn = document.getElementById("chatDialogClub");
      if (!btn || btn._clubAdminLpBound) return;
      btn._clubAdminLpBound = true;
      function clearT() {
        if (chatClubAdminLongPressTimer) {
          clearTimeout(chatClubAdminLongPressTimer);
          chatClubAdminLongPressTimer = null;
        }
      }
      function startPress() {
        clearT();
        chatClubAdminLongPressTimer = setTimeout(function () {
          chatClubAdminLongPressTimer = null;
          if (!chatIsAdmin) return;
          btn._clubLongPressHandled = true;
          if (tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred("medium");
          openChatClubAccessModal();
        }, 650);
      }
      btn.addEventListener("touchstart", startPress, { passive: true });
      btn.addEventListener("touchend", clearT);
      btn.addEventListener("touchcancel", clearT);
      btn.addEventListener("mousedown", startPress);
      btn.addEventListener("mouseup", clearT);
      btn.addEventListener("mouseleave", clearT);
    })();
  }
  if (findByIdInputDialogs) {
    var suggestEl = document.getElementById("chatFindSuggest");
    var suggestListEl = document.getElementById("chatFindSuggestList");
    var findSuggestDebounce = null;
    var lastSuggestions = [];

    function hideSuggest() {
      if (suggestEl) {
        suggestEl.classList.add("chat-find-suggest--hidden");
        suggestEl.setAttribute("aria-hidden", "true");
        if (findByIdInputDialogs) findByIdInputDialogs.setAttribute("aria-expanded", "false");
      }
      lastSuggestions = [];
    }
    function openFromSuggestItem(btn) {
      if (!btn || !btn.dataset.userId) return;
      openConvFromDialogs(btn.dataset.userId, btn.dataset.userName);
      findByIdInputDialogs.value = "";
      hideSuggest();
    }
    /** Как у .chat-dialog-item: если палец сдвинулся — скролл, не открываем диалог по pointerdown. */
    var CHAT_SUGGEST_TAP_MOVE_THRESHOLD = 18;
    function attachSuggestItemButton(btn) {
      if (!btn || btn._chatSuggestAttached) return;
      btn._chatSuggestAttached = true;
      function detachMoveListeners() {
        document.removeEventListener("pointermove", onDocMove, true);
        document.removeEventListener("pointerup", onDocUp, true);
        document.removeEventListener("pointercancel", onDocUp, true);
      }
      function onDocMove(e) {
        if (!btn._chatSuggestTapTracking || e.pointerId !== btn._chatSuggestPtrId) return;
        if (
          Math.abs(e.clientX - btn._chatSuggestStartX) > CHAT_SUGGEST_TAP_MOVE_THRESHOLD ||
          Math.abs(e.clientY - btn._chatSuggestStartY) > CHAT_SUGGEST_TAP_MOVE_THRESHOLD
        ) {
          btn._chatSuggestTapWasScroll = true;
        }
      }
      function onDocUp(e) {
        if (e.pointerId !== btn._chatSuggestPtrId) return;
        btn._chatSuggestTapTracking = false;
        detachMoveListeners();
      }
      btn.addEventListener(
        "pointerdown",
        function (e) {
          if (e.button != null && e.button !== 0) return;
          btn._chatSuggestTapWasScroll = false;
          btn._chatSuggestTapTracking = true;
          btn._chatSuggestPtrId = e.pointerId;
          btn._chatSuggestStartX = e.clientX;
          btn._chatSuggestStartY = e.clientY;
          document.addEventListener("pointermove", onDocMove, true);
          document.addEventListener("pointerup", onDocUp, true);
          document.addEventListener("pointercancel", onDocUp, true);
        },
        { passive: true }
      );
      btn.addEventListener(
        "click",
        function (e) {
          if (btn._chatSuggestTapWasScroll) {
            e.preventDefault();
            e.stopPropagation();
            btn._chatSuggestTapWasScroll = false;
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          openFromSuggestItem(btn);
        },
        { capture: true }
      );
    }
    function showSuggest(items) {
      lastSuggestions = items || [];
      if (!suggestListEl || !suggestEl) return;
      if (!items || items.length === 0) {
        hideSuggest();
        return;
      }
      suggestListEl.innerHTML = items.map(function (s) {
        var name = (s.userName || s.userId || "").replace(/^@/, "");
        return '<button type="button" class="chat-find-suggest__item" data-user-id="' + escapeHtml(s.userId) + '" data-user-name="' + escapeHtml(s.userName || s.userId) + '">' + escapeHtml(s.userName || s.userId) + '</button>';
      }).join("");
      suggestListEl.querySelectorAll(".chat-find-suggest__item").forEach(attachSuggestItemButton);
      suggestEl.classList.remove("chat-find-suggest--hidden");
      suggestEl.setAttribute("aria-hidden", "false");
      if (findByIdInputDialogs) findByIdInputDialogs.setAttribute("aria-expanded", "true");
    }
    function fetchSuggest() {
      var raw = (findByIdInputDialogs.value || "").trim().replace(/^@/, "");
      if (raw.length < 1) { hideSuggest(); return; }
      var byId = /^\d{6}$/.test(raw) || /^ID\d{6}$/i.test(raw);
      if (byId) { hideSuggest(); return; }
      var url = base + "/api/users?username=" + encodeURIComponent(raw) + "&suggest=1" + pokerApiAuthQuery("&");
      fetch(url).then(function (r) { return r.json(); }).then(function (data) {
        if (data && data.ok && Array.isArray(data.suggestions)) showSuggest(data.suggestions);
        else hideSuggest();
      }).catch(function () { hideSuggest(); });
    }

    findByIdInputDialogs.addEventListener("input", function () {
      clearTimeout(findSuggestDebounce);
      var raw = (findByIdInputDialogs.value || "").trim();
      if (raw.length < 1) { hideSuggest(); return; }
      findSuggestDebounce = setTimeout(fetchSuggest, 280);
    });
    findByIdInputDialogs.addEventListener("focus", function () {
      if (
        typeof window.__pokerIsChatPhysicalKeyboardContext === "function" &&
        window.__pokerIsChatPhysicalKeyboardContext()
      ) {
        if (lastSuggestions.length) showSuggest(lastSuggestions);
        return;
      }
      if (typeof window.__pokerActivateChatKeyboardViewport === "function") {
        window.__pokerActivateChatKeyboardViewport();
      } else {
        if (!isTelegramChatRuntime()) {
          document.documentElement.classList.add("chat-keyboard-open");
          document.body.classList.add("chat-keyboard-open");
        }
      }
      try {
        findByIdInputDialogs.scrollIntoView({ block: "nearest", behavior: "smooth" });
      } catch (eSi) {}
      if (lastSuggestions.length) showSuggest(lastSuggestions);
    });
    findByIdInputDialogs.addEventListener("blur", function (e) {
      try {
        if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
          window.__pokerFinalizeChatKeyboardDismiss();
        } else {
          if (typeof window.__pokerClearChatKeyboardViewportState === "function") {
            window.__pokerClearChatKeyboardViewportState();
          }
          if (typeof pokerNukeIosKeyboardViewportArtifacts === "function") pokerNukeIosKeyboardViewportArtifacts({ resetMainScroll: true });
        }
      } catch (eDlgFin) {}
      var relatedTarget = e.relatedTarget;
      setTimeout(function () {
        if (document.activeElement && suggestEl && suggestEl.contains(document.activeElement)) return;
        if (relatedTarget && suggestEl && suggestEl.contains(relatedTarget)) return;
        hideSuggest();
      }, 380);
    });
    if (suggestEl) {
      suggestEl.addEventListener("mousedown", function (e) {
        if (e.target && e.target.closest && e.target.closest(".chat-find-suggest__item")) return;
        e.preventDefault();
      });
      /* Только мышь: на таче не preventDefault — иначе не скроллится выпадающий список */
      suggestEl.addEventListener("pointerdown", function (e) {
        if (e.target && e.target.closest && e.target.closest(".chat-find-suggest__item")) return;
        if (e.pointerType === "mouse") e.preventDefault();
      }, { passive: false });
    }

    function findByIdAndOpenDialogs() {
      var raw = (findByIdInputDialogs.value || "").trim();
      var idPart = raw.replace(/^@/, "").toUpperCase();
      var byId = /^\d{6}$/.test(idPart) || /^ID\d{6}$/.test(idPart) || (idPart.startsWith("ID") && idPart.length === 8 && /^ID\d{6}$/.test(idPart));
      var url;
      if (byId) {
        var id = idPart.startsWith("ID") ? idPart : "ID" + idPart;
        url = base + "/api/users?id=" + encodeURIComponent(id) + "&initData=" + encodeURIComponent(initData);
      } else {
        var nick = raw.replace(/^@/, "").trim();
        if (!nick) {
          if (tg && tg.showAlert) tg.showAlert("Введите ID (ID123456) или ник в Telegram");
          return;
        }
        url = base + "/api/users?username=" + encodeURIComponent(nick) + "&initData=" + encodeURIComponent(initData);
      }
      hideSuggest();
      fetch(url)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          findByIdInputDialogs.value = "";
          if (data && data.ok && data.userId) openConvFromDialogs(data.userId, data.userName || data.userId, data.p21Id);
          else if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Не найдено");
        })
        .catch(function () {
          if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        });
    }
    findByIdInputDialogs.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        if (suggestEl && !suggestEl.classList.contains("chat-find-suggest--hidden") && lastSuggestions.length > 0) {
          openConvFromDialogs(lastSuggestions[0].userId, lastSuggestions[0].userName || lastSuggestions[0].userId);
          findByIdInputDialogs.value = "";
          hideSuggest();
        } else {
          findByIdAndOpenDialogs();
        }
      }
    });
  }

  initChatGroupAddMembersModal({
    base: base,
    tg: tg,
    escapeHtml: escapeHtml,
    resolveMyChatMemberId: resolveMyChatMemberId,
    loadMessages: loadMessages,
    getChatWithUserId: function () { return chatWithUserId; },
  });

  initChatGroupInfoModal({
    base: base,
    tg: tg,
    escapeHtml: escapeHtml,
    resolveMyChatMemberId: resolveMyChatMemberId,
    resizeImage: resizeImage,
    syncClubChatRosterUi: syncClubChatRosterUi,
    updateCurrentGroupMeta: function (groupId, title) {
      if (chatWithUserId && typeof peerChatIdsEqual === "function" && peerChatIdsEqual(chatWithUserId, groupId)) {
        chatWithUserName = title;
        if (convTitle) convTitle.textContent = title;
        applyConvGroupDescription();
      }
    },
    updateCurrentGroupAvatar: function (groupId, avatarUrl, title) {
      if (chatWithUserId && typeof peerChatIdsEqual === "function" && peerChatIdsEqual(chatWithUserId, groupId)) {
        chatWithPeerAvatarUrl = avatarUrl;
        applyConvPeerAvatarHeader(avatarUrl, chatWithUserName || title);
      }
    },
    handleGroupRemoved: function (groupId, caller) {
      try {
        delete personalMessagesCache[groupId];
      } catch (eC) {}
      try {
        delete personalMessagesCacheMeta[groupId];
      } catch (eC2) {}
      lastPersonalMessagesSig = null;
      if (chatWithUserId && typeof peerChatIdsEqual === "function" && peerChatIdsEqual(chatWithUserId, groupId)) {
        pokerPushOpenSetCaller(caller);
        showDialogs();
      }
    },
  });

  initChatCreateGroupModal({
    base: base,
    tg: tg,
    escapeHtml: escapeHtml,
    resolveMyChatMemberId: resolveMyChatMemberId,
    openConvFromDialogs: openConvFromDialogs,
    resizeImage: resizeImage,
  });

  /** Базовый тик таймера: сеть ходит только по динамическим интервалам ниже. */
  var CHAT_POLL_MS = CHAT_POLL_TICK_MS;
  if (chatPollInterval) clearInterval(chatPollInterval);
  chatPollInterval = setInterval(function () {
    var hidden = typeof document !== "undefined" && document.visibilityState !== "visible";
    var chatViewOn = typeof document !== "undefined" && !!document.querySelector('[data-view="chat"].view--active');
    var guestPoll = typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode();
    var credPoll = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
    var nowPoll = Date.now();

    if (hidden) {
      if (credPoll && !guestPoll && typeof loadContacts === "function") {
        if (!chatLastPollAt.contacts || nowPoll - chatLastPollAt.contacts >= CHAT_HIDDEN_IDLE_MS) {
          chatLastPollAt.contacts = nowPoll;
          loadContacts({ metaOnly: true });
        }
      }
      return;
    }

    if (!chatViewOn) {
      if (credPoll && !guestPoll && typeof loadContacts === "function" && !pokerChatCanRunLongPoll("contacts") && pokerChatShouldRunPoll("contacts", nowPoll)) {
        loadContacts({ metaOnly: true });
      }
      return;
    }

    if (
      chatActiveTab === "general" &&
      generalView &&
      !generalView.classList.contains("chat-general-view--hidden") &&
      typeof loadGeneral === "function" &&
      !pokerChatCanRunLongPoll("general") &&
      pokerChatShouldRunPoll("general", nowPoll)
    ) {
      loadGeneral();
    }
    if (chatWithUserId && typeof loadMessages === "function" && !pokerChatCanRunLongPoll("personal") && pokerChatShouldRunPoll("personal", nowPoll)) loadMessages();
    if (credPoll && !guestPoll && typeof loadContacts === "function") {
      if (!pokerChatCanRunLongPoll("contacts") && pokerChatShouldRunPoll("contacts", nowPoll)) loadContacts({ metaOnly: true });
    } else if (
      chatActiveTab === "admins" &&
      adminsView &&
      !adminsView.classList.contains("chat-admins-view--hidden") &&
      typeof loadAdminsOnline === "function" &&
      pokerChatShouldRunPoll("admins", nowPoll)
    ) {
      loadAdminsOnline();
    }
  }, CHAT_POLL_MS);

  document.addEventListener("visibilitychange", function pokerChatPollFlushOnVisible() {
    if (typeof document === "undefined") return;
    if (document.visibilityState !== "visible") {
      pokerChatStopLongPoll("general");
      pokerChatStopLongPoll("personal");
      pokerChatStopLongPoll("contacts");
      return;
    }
    try {
      if (
        chatActiveTab === "general" &&
        generalView &&
        !generalView.classList.contains("chat-general-view--hidden") &&
        typeof loadGeneral === "function"
      ) {
        loadGeneral();
      }
      var guestV = typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode();
      var credV = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
      if (credV && !guestV && typeof loadContacts === "function") loadContacts({ metaOnly: true });
      if (chatWithUserId && typeof loadMessages === "function") loadMessages();
    } catch (eVisPoll) {}
    pokerChatRefreshLongPollTargets();
  });
  window.addEventListener("online", function () {
    window.__pokerChatNetworkOnline = true;
    updateChatHeaderStats();
    pokerChatRefreshLongPollTargets();
  });
  window.addEventListener("offline", function () {
    window.__pokerChatNetworkOnline = false;
    pokerChatStopLongPoll("general");
    pokerChatStopLongPoll("personal");
    pokerChatStopLongPoll("contacts");
    updateChatHeaderStats();
  });

  window.__pokerHandleIncomingChatPush = function (payload) {
    try {
      if (typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode()) return;
      if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
      try {
        var rawUrl = payload && payload.openUrl ? String(payload.openUrl) : "./?startapp=club_chat";
        var urlObj = new URL(rawUrl, window.location.href);
        var sp = new URLSearchParams(urlObj.search || "");
        var startApp = pokerNormalizeWebAppStartParam(pokerStartAppQueryFromUrlSearchParams(sp));
        var withPeer = (sp.get("with") || "").trim();
        var isDmPush = startApp === "club_chat_dm" && !!withPeer;
        var isGeneralPush = startApp === "club_chat";
        var pushPlaceholder = chatPushPlaceholderFromPayload(payload);
        var chatViewActiveNow = !!document.querySelector('[data-view="chat"].view--active');
        if (pushPlaceholder && chatViewActiveNow && isGeneralPush) {
          chatOutgoingState.incomingPushGeneralPayload = pushPlaceholder;
          if (
            chatActiveTab === "general" &&
            generalView &&
            !generalView.classList.contains("chat-general-view--hidden") &&
            window._chatGeneralCache &&
            Array.isArray(window._chatGeneralCache.messages)
          ) {
            renderGeneralMessages(mergeIncomingPushGeneralIntoMessages(window._chatGeneralCache.messages.slice()));
          }
        } else if (pushPlaceholder && chatViewActiveNow && isDmPush) {
          var resolvedPushDmName = pokerResolveChatPeerLabel(withPeer, pushPlaceholder.fromName || withPeer);
          chatOutgoingState.incomingPushPersonalPayloadByPeer[withPeer] = Object.assign({}, pushPlaceholder, {
            from: withPeer,
            fromName: resolvedPushDmName,
          });
          if (
            chatWithUserId &&
            peerChatIdsEqual(chatWithUserId, withPeer) &&
            convView &&
            !convView.classList.contains("chat-conv-view--hidden")
          ) {
            var cacheNow = personalMessagesCache[withPeer] && Array.isArray(personalMessagesCache[withPeer]) ? personalMessagesCache[withPeer] : [];
            renderMessages(mergeIncomingPushPersonalIntoMessages(cacheNow.slice(), withPeer));
          }
        }
      } catch (ePushPlaceholder) {}
      var now = Date.now();
      window.__pokerLastIncomingChatPushAt = now;
      pokerChatRecordTrace("push-incoming", {
        startApp: startApp || "",
        peer: withPeer || "",
      });
      if (startApp === "club_chat") pokerChatRequestPollBurst("general");
      else if (startApp === "club_chat_dm") pokerChatRequestPollBurst("personal");
      pokerChatRequestPollBurst("contacts");
      pokerChatRefreshLongPollTargets();
      try {
        var dialogsListVisibleNow = !!(
          chatViewActiveNow &&
          dialogsView &&
          !dialogsView.classList.contains("chat-dialogs-view--hidden") &&
          listView &&
          !listView.classList.contains("chat-list-view--hidden")
        );
        if (dialogsListVisibleNow && typeof loadContacts === "function") loadContacts({ metaOnly: true });
      } catch (ePushDialogsRefresh) {}
      if (window.__pokerChatPushRefetchTimer) return;
      window.__pokerChatPushRefetchTimer = setTimeout(function () {
        window.__pokerChatPushRefetchTimer = 0;
        try {
          if (typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode()) return;
          if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
          if (typeof loadContacts === "function") loadContacts({ metaOnly: true });
          if (
            startApp === "club_chat" &&
            chatActiveTab === "general" &&
            generalView &&
            !generalView.classList.contains("chat-general-view--hidden") &&
            typeof loadGeneral === "function"
          ) {
            loadGeneral();
          }
          if (
            startApp === "club_chat_dm" &&
            chatWithUserId &&
            withPeer &&
            peerChatIdsEqual(chatWithUserId, withPeer) &&
            convView &&
            !convView.classList.contains("chat-conv-view--hidden") &&
            typeof loadMessages === "function"
          ) {
            loadMessages();
          }
        } catch (eChatPushFlush) {}
      }, 120);
    } catch (eChatPushRefetch) {}
  };

  window.__pokerRefreshChatUnreadForPwaBadge = function () {
    try {
      if (typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode()) return;
      if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
      loadGeneral();
      loadContacts({ metaOnly: true });
    } catch (eUnreadRef) {}
  };
}

function isLocalEnv() {
  if (typeof window === "undefined" || !window.location) return true;
  const hostname = window.location.hostname || "";
  const protocol = window.location.protocol || "";
  if (protocol === "file:") return true;
  if (!hostname) return true;
  if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0") return true;
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) return true;
  return false;
}

function getApiBase() {
  const app = document.getElementById("app");
  const dataBase = app && app.getAttribute("data-api-base");
  if (dataBase && dataBase.trim()) return dataBase.trim().replace(/\/$/, "");
  if (typeof window !== "undefined" && window.location && window.location.origin) return window.location.origin;
  return "";
}

/** Код ссылки вида ref_xxxxxxxx (8 hex) из Telegram start_param или ?startapp= / ?ref= */
function getPokerTrackingRefFromEnv() {
  try {
    var sp =
      typeof pokerReadTelegramLaunchStartParam === "function" ? pokerReadTelegramLaunchStartParam() : "";
    if (!sp) {
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      sp = (tg && tg.initDataUnsafe && tg.initDataUnsafe.start_param) || "";
      if (!sp && tg && tg.initData) {
        try {
          var p = new URLSearchParams(tg.initData);
          sp = p.get("start_param") || "";
        } catch (e1) {}
      }
    }
    if (sp && /^ref_[a-f0-9]{8}$/i.test(String(sp).trim())) return String(sp).trim().toLowerCase();
    if (typeof location !== "undefined" && location.search) {
      var q = new URLSearchParams(location.search);
      var qsp = q.get("startapp") || q.get("ref") || "";
      if (qsp && /^ref_[a-f0-9]{8}$/i.test(String(qsp).trim())) return String(qsp).trim().toLowerCase();
    }
  } catch (e) {}
  return "";
}

function recordTrackingLinkHit(ref) {
  if (!ref) return;
  var slug = ref.replace(/^ref_/, "");
  try {
    if (sessionStorage.getItem("poker_track_ref_" + slug)) return;
  } catch (e) {}
  var base = getApiBase();
  if (!base) return;
  var visitorId = getVisitorId();
  var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  var initData = tg && tg.initData ? tg.initData : "";
  try {
    fetch(base + "/api/tracking-link-hit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ref: ref, visitor_id: visitorId, initData: initData || undefined }),
    })
      .then(function (res) {
        return res.json().catch(function () {
          return {};
        });
      })
      .then(function (data) {
        if (data && data.recorded) {
          try {
            sessionStorage.setItem("poker_track_ref_" + slug, "1");
          } catch (e2) {}
        }
      })
      .catch(function () {});
  } catch (e3) {}
}

var pokerTrackingEventThrottle = {};
/** События после перехода по ref_-ссылке (см. sessionStorage poker_session_tracking_ref). */
function trackLinkSessionEvent(action, detail) {
  if (!action) return;
  try {
    var ref = sessionStorage.getItem("poker_session_tracking_ref");
    if (!ref) return;
    var throttleKey = action + "|" + String(detail || "");
    var now = Date.now();
    if (pokerTrackingEventThrottle[throttleKey] && now - pokerTrackingEventThrottle[throttleKey] < 1200) return;
    pokerTrackingEventThrottle[throttleKey] = now;
    var base = getApiBase();
    if (!base) return;
    var visitorId = getVisitorId();
    var tgEv = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    var initDataEv = tgEv && tgEv.initData ? tgEv.initData : "";
    fetch(base + "/api/tracking-link-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ref: ref,
        visitor_id: visitorId,
        action: action,
        detail: detail ? String(detail).slice(0, 200) : undefined,
        initData: initDataEv || undefined,
      }),
    }).catch(function () {});
  } catch (e) {}
}

(function initTrackingLinkActivityCapture() {
  if (typeof document === "undefined" || !document.addEventListener) return;
  document.addEventListener(
    "click",
    function (ev) {
      var t = ev.target;
      if (!t || !t.closest) return;
      if (t.closest("#trackingLinksAdminModal") || t.closest("#trackingLinksVisitorsModal")) return;
      var el = t.closest("[data-view-target]");
      if (!el) return;
      var tgt = el.getAttribute("data-view-target");
      if (!tgt) return;
      var hint = el.getAttribute("aria-label") || el.getAttribute("title") || "";
      if (typeof trackLinkSessionEvent === "function") trackLinkSessionEvent("open:" + tgt, hint);
    },
    true
  );
})();

function recordShareButtonClick(buttonId) {
  var base = getApiBase();
  if (!base) return;
  try {
    fetch(base + "/api/share-button-stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ buttonId: buttonId })
    }).catch(function () {});
  } catch (e) {}
}

function updateVisitorCounter() {
  const elTotal = document.getElementById("visitorTotal");
  const elUnique = document.getElementById("visitorUnique");
  const elReturning = document.getElementById("visitorReturning");
  const hasCounterEls = !!(elUnique && elReturning);

  const setDash = function () {
    if (elTotal) elTotal.textContent = "—";
    if (elUnique) elUnique.textContent = "—";
    if (elReturning) elReturning.textContent = "—";
  };

  const base = getApiBase();
  const isLocal = isLocalEnv();
  if (isLocal && !(document.getElementById("app") && document.getElementById("app").getAttribute("data-api-base"))) {
    if (hasCounterEls) setDash();
    return;
  }

  if (!base) {
    if (hasCounterEls) setDash();
    return;
  }

  const visitorId = getVisitorId();
  (function tryTrackRef() {
    var ref = getPokerTrackingRefFromEnv();
    if (ref) {
      try {
        sessionStorage.setItem("poker_session_tracking_ref", ref);
      } catch (eRef) {}
      recordTrackingLinkHit(ref);
    }
  })();
  var authLeading =
    typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?";
  const apiUrl =
    base +
    "/api/visit" +
    (authLeading === "?" ? "?" : authLeading + "&") +
    "visitor_id=" +
    encodeURIComponent(visitorId);
  const hasCred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
  const fetchOpts = hasCred
    ? {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          typeof pokerGuestOrAuthedPostBody === "function"
            ? pokerGuestOrAuthedPostBody({ visitor_id: visitorId })
            : { visitor_id: visitorId }
        ),
      }
    : { method: "GET" };

  function doFetch(retryCount) {
    fetch(apiUrl, fetchOpts)
      .then(function (res) {
        if (!res.ok) return Promise.reject(new Error("visit api " + res.status));
        return res.json();
      })
      .then(function (data) {
        if (hasCounterEls) applyVisitorCounts(data, elTotal, elUnique, elReturning);
        if (data && data.dtId) sessionStorage.setItem("poker_dt_id", data.dtId);
        if (data && data.ok === false && hasCounterEls) fetchVisitorStatsOnly();
      })
      .catch(function () {
        if (hasCounterEls) setDash();
        if (retryCount > 0) {
          setTimeout(function () { doFetch(retryCount - 1); }, 1500);
        } else {
          if (hasCounterEls) {
            fetchVisitorStatsOnly();
            setTimeout(updateVisitorCounter, 5000);
          }
        }
      });
  }
  doFetch(1);
}

function applyVisitorCounts(data, elTotal, elUnique, elReturning) {
  if (data && data.ok === false) {
    if (elTotal) elTotal.textContent = "—";
    elUnique.textContent = "—";
    elReturning.textContent = "—";
    return;
  }
  if (data && typeof data.unique === "number" && typeof data.returning === "number") {
    if (elTotal) elTotal.textContent = typeof data.total === "number" ? data.total : data.unique + data.returning;
    elUnique.textContent = String(data.unique);
    elReturning.textContent = String(data.returning);
  } else {
    if (elTotal) elTotal.textContent = "—";
    elUnique.textContent = "—";
    elReturning.textContent = "—";
  }
}

function fetchVisitorStatsOnly() {
  const elTotal = document.getElementById("visitorTotal");
  const elUnique = document.getElementById("visitorUnique");
  const elReturning = document.getElementById("visitorReturning");
  if (!elUnique || !elReturning) return;
  const setDash = function () {
    if (elTotal) elTotal.textContent = "—";
    elUnique.textContent = "—";
    elReturning.textContent = "—";
  };
  const base = getApiBase();
  const isLocal = isLocalEnv();
  if (isLocal && !(document.getElementById("app") && document.getElementById("app").getAttribute("data-api-base"))) {
    setDash();
    return;
  }
  if (!base) {
    setDash();
    return;
  }
  var authLeadingSt =
    typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?";
  var statsUrl =
    base +
    "/api/visit" +
    (authLeadingSt === "?" ? "?stats=1" : authLeadingSt + "&stats=1");
  fetch(statsUrl)
    .then(function (res) {
      if (!res.ok) return Promise.reject(new Error("stats " + res.status));
      return res.json();
    })
    .then((data) => applyVisitorCounts(data, elTotal, elUnique, elReturning))
    .catch(function () {
      setDash();
    });
}

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
