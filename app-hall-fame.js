function setHallOfFameSubtabActive(section) {
  var view = document.getElementById("hallOfFameView") || document.querySelector('[data-view="hall-of-fame"]');
  if (!view) return;
  var tabs = view.querySelectorAll(".hall-of-fame__subtab[data-hall-section]");
  tabs.forEach(function (btn) {
    var on = btn.getAttribute("data-hall-section") === section;
    btn.classList.toggle("hall-of-fame__subtab--active", on);
    btn.setAttribute("aria-selected", on ? "true" : "false");
  });
}

var HALL_TOP2026_QUOTES = [
  "Да какие проценты, это покер, ты хоть все проценты пересчитай тебе это не поможет, понимаю когда фул на каре, стрит флэш на флэш рояль вот это жëтское, а это так флэш закрыл сет, несчастный детский уровень (C) Владимир",
  "Ты пасть закрой башка лошадиная,чепушило ты (с) Морпех",
  "А почему ты а не Я?, ебать дахуище мозга, как дало так и дало, все одинаковые, мне вообще раз в год прет и че теперь, говорить что всё вокруг гавно а вот мне не повезло, иди умойся в себя приди, сколько соплей это пиздэсь,!!! (с) John",
  "Игру-то понимать надо (с) Кулер",
  "Ебаный дракон всю масть сбил (с) Зевс",
  "Перед тем как поставить 3333р и проиграть раздачу - Сколько бы поставить, чтобы было красиво? (с) Кулер"
];

function initHallTop2026Quotes() {
  var openBtn = document.getElementById("hallTop2026QuotesOpen");
  var wrap = document.getElementById("hallTop2026QuoteModal");
  var textEl = document.getElementById("hallTop2026QuoteText");
  var countEl = document.getElementById("hallTop2026QuoteCount");
  var prevBtn = document.getElementById("hallTop2026QuotePrev");
  var nextBtn = document.getElementById("hallTop2026QuoteNext");
  var closeBtn = document.getElementById("hallTop2026QuoteClose");
  if (!wrap || !openBtn || !textEl || !prevBtn || !nextBtn || !closeBtn) return;
  if (wrap.getAttribute("data-quote-bound") === "1") return;
  wrap.setAttribute("data-quote-bound", "1");
  var quoteIndex = 0;
  function renderQuote() {
    textEl.textContent = HALL_TOP2026_QUOTES[quoteIndex] || "";
    if (countEl) countEl.textContent = (quoteIndex + 1) + "/" + HALL_TOP2026_QUOTES.length;
  }
  function moveQuote(dir) {
    quoteIndex = (quoteIndex + dir + HALL_TOP2026_QUOTES.length) % HALL_TOP2026_QUOTES.length;
    renderQuote();
  }
  function setQuoteModalOpen(open) {
    if (open) {
      wrap.hidden = false;
      wrap.setAttribute("aria-hidden", "false");
      renderQuote();
      setTimeout(function () {
        try { closeBtn.focus({ preventScroll: true }); } catch (eFocus) {}
      }, 0);
      return;
    }
    wrap.hidden = true;
    wrap.setAttribute("aria-hidden", "true");
    try { openBtn.focus({ preventScroll: true }); } catch (eOpenFocus) {}
  }
  openBtn.addEventListener("click", function () { setQuoteModalOpen(true); });
  closeBtn.addEventListener("click", function () { setQuoteModalOpen(false); });
  wrap.addEventListener("click", function (e) {
    if (e && e.target === wrap) setQuoteModalOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (!wrap.hidden && e && e.key === "Escape") setQuoteModalOpen(false);
  });
  prevBtn.addEventListener("click", function () { moveQuote(-1); });
  nextBtn.addEventListener("click", function () { moveQuote(1); });
  renderQuote();
}

function getHallTop2026PlaqueNick(nick, place) {
  var text = String(nick || "").trim();
  if (place === 1 && /^sarmat1305$/i.test(text)) return "Сармат";
  return text;
}

function normalizeHallTop2026PlaqueAmount(text) {
  var value = String(text || "").replace(/\s*₽/g, "р").replace(/\s+/g, " ").trim();
  return value.replace(/\s+р$/i, "р");
}

function readHallTop2026Rows(list) {
  return Array.prototype.map.call(list.querySelectorAll(".winter-rating__single-top-item"), function (item) {
    var nickEl = item.querySelector(".winter-rating__single-top-nick");
    var amountEl = item.querySelector(".winter-rating__single-top-amount");
    return {
      nick: String(nickEl && nickEl.textContent || "").trim(),
      amount: normalizeHallTop2026PlaqueAmount(amountEl && amountEl.textContent)
    };
  }).filter(function (row) {
    return !!row.nick;
  });
}

function fitHallTop2026TextLine(el, minSize) {
  if (!el) return;
  el.style.fontSize = "";
  el.style.transform = "";
  if (!el.clientWidth) return;
  var size = parseFloat(window.getComputedStyle ? window.getComputedStyle(el).fontSize : "") || 10;
  while (el.scrollWidth > el.clientWidth && size > minSize) {
    size -= 0.25;
    el.style.fontSize = size.toFixed(2) + "px";
  }
  if (el.scrollWidth > el.clientWidth) {
    var scale = Math.max(0.78, Math.min(1, el.clientWidth / Math.max(1, el.scrollWidth)));
    el.style.transform = "scaleX(" + scale.toFixed(3) + ")";
  }
}

function fitHallTop2026PlaqueText(plaque) {
  var nameEl = plaque && plaque.querySelector("span:first-child");
  var amountEl = plaque && plaque.querySelector("small");
  fitHallTop2026TextLine(nameEl, 8.2);
  fitHallTop2026TextLine(amountEl, 7.2);
}

function fitHallTop2026Plaques() {
  Array.prototype.forEach.call(document.querySelectorAll("[data-hall-top2026-place]"), fitHallTop2026PlaqueText);
}

function updateHallTop2026Plaques() {
  var list = document.getElementById("hallFameSingleTopList");
  if (!list) return false;
  var rows = readHallTop2026Rows(list);
  if (!rows.length) return false;
  Array.prototype.forEach.call(document.querySelectorAll("[data-hall-top2026-place]"), function (plaque) {
    var place = Number(plaque.getAttribute("data-hall-top2026-place"));
    var fixedName = String(plaque.getAttribute("data-hall-top2026-fixed-name") || "").trim();
    if (!place || (!fixedName && !rows[place - 1])) return;
    var row = rows[place - 1] || {};
    var nameEl = plaque.querySelector("span:first-child");
    var amountEl = plaque.querySelector("small");
    var fixedAmount = String(plaque.getAttribute("data-hall-top2026-fixed-amount") || "").trim();
    var plaqueNick = fixedName || getHallTop2026PlaqueNick(row.nick, place);
    if (nameEl) nameEl.textContent = plaqueNick;
    if (amountEl) amountEl.textContent = fixedAmount || row.amount || "";
  });
  var raf = window.requestAnimationFrame || function (fn) { setTimeout(fn, 16); };
  raf(fitHallTop2026Plaques);
  return true;
}

function initHallTop2026PlaqueSync() {
  var list = document.getElementById("hallFameSingleTopList");
  if (!list) return;
  updateHallTop2026Plaques();
  if (list.getAttribute("data-hall-top2026-plaque-bound") === "1") return;
  list.setAttribute("data-hall-top2026-plaque-bound", "1");
  if (typeof MutationObserver === "function") {
    list.__hallTop2026PlaqueObserver = new MutationObserver(updateHallTop2026Plaques);
    list.__hallTop2026PlaqueObserver.observe(list, { childList: true, subtree: true });
  }
  [80, 240, 700, 1400].forEach(function (delay) {
    setTimeout(updateHallTop2026Plaques, delay);
  });
}

/**
 * Переключение разделов зала славы в одном экране (как лиги в рейтинге), без модалок.
 * @param {string} section
 * @param {{ activeSubtabBtn?: HTMLElement }} [opts] — кнопка вкладки для focus({ preventScroll }) после смены панели
 */
function showHallOfFamePanel(section, opts) {
  opts = opts || {};
  var view = document.getElementById("hallOfFameView");
  if (!view) return;
  var yBefore = getMainDocumentScrollY();
  var activePanel = view.querySelector(".hall-of-fame__panel.hall-of-fame__panel--active[data-hall-panel]");
  var prevSection = activePanel ? activePanel.getAttribute("data-hall-panel") : null;
  if (prevSection && prevSection !== section) {
    hallFamePanelScrollMemory[prevSection] = yBefore;
  }
  var restoreY = Object.prototype.hasOwnProperty.call(hallFamePanelScrollMemory, section)
    ? hallFamePanelScrollMemory[section]
    : yBefore;

  view.querySelectorAll(".hall-of-fame__panel[data-hall-panel]").forEach(function (panel) {
    var on = panel.getAttribute("data-hall-panel") === section;
    panel.classList.toggle("hall-of-fame__panel--active", on);
    if (on) panel.removeAttribute("hidden");
    else panel.setAttribute("hidden", "");
  });
  view.classList.toggle("hall-of-fame--top2026", section === "top2026");
  setHallOfFameSubtabActive(section);
  if (section === "top2026") {
    try {
      if (typeof window.pokerInitWinterRatingWeekTops === "function") window.pokerInitWinterRatingWeekTops();
      if (typeof window.updateWinterRatingWeekTopPreviews === "function") window.updateWinterRatingWeekTopPreviews();
    } catch (eTop2026Init) {}
    scheduleHallTop2026ViewerLoginUpdate();
    initHallTop2026Quotes();
    initHallTop2026PlaqueSync();
  }

  function applyHallFameScroll() {
    setMainDocumentScrollY(clampMainDocumentScrollY(restoreY));
  }
  applyHallFameScroll();
  var rafH = window.requestAnimationFrame || function (fn) {
    setTimeout(fn, 16);
  };
  rafH(function () {
    applyHallFameScroll();
    rafH(function () {
      applyHallFameScroll();
      rafH(applyHallFameScroll);
    });
  });
  [0, 48, 120, 220].forEach(function (ms) {
    setTimeout(applyHallFameScroll, ms);
  });

  var subBtn = opts.activeSubtabBtn;
  if (subBtn && typeof subBtn.focus === "function") {
    setTimeout(function () {
      try {
        subBtn.focus({ preventScroll: true });
      } catch (eFocus) {
        try {
          subBtn.focus();
        } catch (eFocus2) {}
      }
      applyHallFameScroll();
    }, 0);
    setTimeout(applyHallFameScroll, 32);
  }
}

window.pokerUpdateHallTop2026Plaques = updateHallTop2026Plaques;

window.showHallOfFamePanel = showHallOfFamePanel;
window.openHallOfFameSectionModal = showHallOfFamePanel;

function getHallTop2026ViewerLoginText() {
  var user = null;
  try {
    user = typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser() : null;
  } catch (eResolvedViewer) {}
  try {
    if (!user && window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
      user = window.Telegram.WebApp.initDataUnsafe.user || null;
    }
  } catch (eUnsafeViewer) {}
  try {
    if (!user && window.__pokerTelegramAuth && window.__pokerTelegramAuth.user) {
      user = window.__pokerTelegramAuth.user;
    }
  } catch (eAuthViewer) {}
  var username = user && user.username != null ? String(user.username).replace(/^@+/, "").trim() : "";
  return username ? "@" + username : "";
}

function fitHallTop2026ViewerLogin(el) {
  if (!el || !el.textContent) return;
  el.style.fontSize = "";
  var size = parseFloat(window.getComputedStyle ? window.getComputedStyle(el).fontSize : "") || 6;
  var minSize = 3.2;
  while (el.scrollWidth > el.clientWidth && size > minSize) {
    size -= 0.25;
    el.style.fontSize = size.toFixed(2) + "px";
  }
}

function updateHallTop2026ViewerLogin() {
  var text = getHallTop2026ViewerLoginText();
  var els = document.querySelectorAll(".hall-of-fame__top2026-trophy-login");
  if (!els.length) return;
  els.forEach(function (el) {
    if (!text) {
      el.textContent = "";
      el.setAttribute("hidden", "");
      return;
    }
    el.textContent = text;
    el.removeAttribute("hidden");
    el.setAttribute("title", text);
    var raf = window.requestAnimationFrame || function (fn) { setTimeout(fn, 16); };
    raf(function () { fitHallTop2026ViewerLogin(el); });
  });
}

function scheduleHallTop2026ViewerLoginUpdate() {
  [0, 180, 700].forEach(function (delay) {
    setTimeout(updateHallTop2026ViewerLogin, delay);
  });
}

window.pokerUpdateHallTop2026ViewerLogin = updateHallTop2026ViewerLogin;
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", scheduleHallTop2026ViewerLoginUpdate);
} else {
  scheduleHallTop2026ViewerLoginUpdate();
}
window.addEventListener("poker-telegram-auth", scheduleHallTop2026ViewerLoginUpdate);
window.addEventListener("resize", function () {
  setTimeout(updateHallTop2026ViewerLogin, 80);
  setTimeout(fitHallTop2026Plaques, 80);
});

/** Уникальный startapp для каждой вкладки зала славы (плюс legacy для топ‑15). */
var HALL_FAME_SECTION_STARTAPP = {
  legends: "hall_fame_legends",
  cups: "hall_fame_cups",
  top2026: "hall_fame_top2026",
  photos: "hall_fame_photos",
  shame: "hall_fame_shame"
};

var HALL_FAME_SHARE_INTRO = {
  legends: "Зал славы — Легенды клуба «Два туза»",
  cups: "Зал славы — Кубки",
  top2026: "Зал славы — Топ выигрышей за один турнир (2026)",
  photos: "Зал славы — Фотоальбом",
  shame: "Зал славы — Доска позора"
};

function getHallFameSectionStartParam(section) {
  return HALL_FAME_SECTION_STARTAPP[section] || null;
}

/** Прямая ссылка в мини‑апп на вкладку зала славы */
function getHallFameSectionShareUrl(section) {
  var p = getHallFameSectionStartParam(section);
  if (!p || typeof buildMiniAppStartLink !== "function") return "";
  return buildMiniAppStartLink(p);
}

function hallFishAchievementStartParam(key) {
  var value = String(key || "").trim() || "big50";
  return "hall_fame_achievements_" + value;
}

function hallFishAchievementShareUrl(key) {
  if (typeof buildMiniAppStartLink !== "function") return "";
  return buildMiniAppStartLink(hallFishAchievementStartParam(key));
}

function hallFishAchievementKeyFromStartParam(startParam) {
  var value = String(startParam || "").trim();
  var match = value.match(/^hall_fame_achievements(?:_([A-Za-z0-9_-]+))?$/);
  return match ? (match[1] || "big50") : "";
}

function resolveHallFameSectionFromStartParam(startParam) {
  if (!startParam) return null;
  var p = String(startParam).trim();
  /* Литералы: эта функция вызывается из раннего runGazetteAndTasksInit до присвоения HALL_FAME_SECTION_STARTAPP */
  if (p === "hall_fame" || p === "blog_top15" || p === "hall_top15" || p === "hall_fame_top2026") return "top2026";
  if (p === "hall_fame_legends") return "legends";
  if (p === "hall_fame_cups") return "cups";
  if (p === "hall_fame_photos") return "photos";
  if (p === "hall_fame_shame") return "shame";
  if (hallFishAchievementKeyFromStartParam(p)) return "achievements";
  return null;
}

/**
 * Открыть зал славы на нужной вкладке (deep link + кнопки «Поделиться»).
 */
function navigateToHallFameSection(section) {
  if (typeof setView === "function") setView("hall-of-fame");
  setTimeout(function () {
    if (section === "achievements") {
      openHallFishAchievementTab();
      return;
    }
    if (section === "top2026") {
      try {
        if (typeof window.updateWinterRatingWeekTopPreviews === "function") {
          window.updateWinterRatingWeekTopPreviews();
        }
      } catch (ePrev) {}
    }
    if (typeof showHallOfFamePanel === "function") showHallOfFamePanel(section || "top2026");
  }, 480);
}

/**
 * Зал славы → блок «Топ выигрышей за один турнир» (топ‑15).
 * Legacy: …?startapp=blog_top15 | hall_top15; новая ссылка: hall_fame_top2026
 */
function navigateToHallFameBlogTop15() {
  navigateToHallFameSection("top2026");
}

/** Обратная совместимость: теперь отдаём каноническую ссылку hall_fame_top2026 */
function getHallFameBlogTop15ShareUrl() {
  return getHallFameSectionShareUrl("top2026");
}

function hallFameCopyDone(ok) {
  var tgLocal = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  if (tgLocal && tgLocal.showAlert) {
    tgLocal.showAlert(ok ? "Ссылка скопирована" : "Не удалось скопировать");
  } else if (ok) {
    alert("Ссылка скопирована");
  } else {
    alert("Не удалось скопировать");
  }
}

function hallFameCopyUrlToClipboard(url) {
  if (!url) {
    hallFameCopyDone(false);
    return;
  }
  pokerCopyTextToClipboard(url).then(function (copied) {
    hallFameCopyDone(copied);
  });
}

function hallFameOpenTelegramShareForSection(section) {
  var url = getHallFameSectionShareUrl(section);
  if (!url) {
    var tg0 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (tg0 && tg0.showAlert) {
      tg0.showAlert("Задайте в index.html атрибут data-telegram-app-url у #app.");
    } else {
      alert("Не задан URL мини‑приложения (data-telegram-app-url).");
    }
    return;
  }
  var intro = HALL_FAME_SHARE_INTRO[section] || "Зал славы «Два туза»";
  var text = intro + "\n\n" + url;
  var shareUrl =
    typeof pokerBuildTelegramShareUrlDialog === "function" ? pokerBuildTelegramShareUrlDialog(url, intro) : "";
  if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
  pokerTryPwaWebShare({ title: intro, text: text, url: url }).then(function (pwaOk) {
    if (pwaOk) return;
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (tg && tg.openTelegramLink) tg.openTelegramLink(shareUrl);
    else if (tg && tg.openLink) tg.openLink(shareUrl);
    else window.open(shareUrl, "_blank", "noopener,noreferrer");
  });
}

function initHallOfFamePanelShareButtons() {
  var root = document.getElementById("hallOfFameView");
  if (!root || root.dataset.hallShareBound === "1") return;
  root.dataset.hallShareBound = "1";
  root.addEventListener("click", function (e) {
    var btn = e.target && e.target.closest ? e.target.closest("[data-hall-fame-share][data-hall-fame-action]") : null;
    if (!btn) return;
    var section = btn.getAttribute("data-hall-fame-share");
    var action = btn.getAttribute("data-hall-fame-action");
    if (!section || (action !== "copy" && action !== "share")) return;
    e.preventDefault();
    if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
    if (action === "share") {
      hallFameOpenTelegramShareForSection(section);
    } else {
      var url = getHallFameSectionShareUrl(section);
      if (!url) {
        var tg0 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg0 && tg0.showAlert) {
          tg0.showAlert("Задайте в index.html атрибут data-telegram-app-url у #app.");
        } else {
          alert("Не задан URL мини‑приложения (data-telegram-app-url).");
        }
        return;
      }
      hallFameCopyUrlToClipboard(url);
    }
  });
}
window.pokerInitHallOfFamePanelShareButtons = initHallOfFamePanelShareButtons;
initHallOfFamePanelShareButtons();

var hallFishRatingRowsCache = null;
var hallFishRatingRowsPromise = null;
var hallFishAchievementRowsCache = null;
var hallFishAchievementRowsPromise = null;
var hallFishBirthdayRowsCache = null;
var hallFishBirthdayRowsPromise = null;
var hallFishCalendarEventsCache = null;
var hallFishCalendarEventsPromise = null;
var hallFishCurrentIdsCache = null;
var hallFishCurrentIdsPromise = null;
var hallFishProfileLoadingObserver = null;
var hallFishActiveTab = "levels";
var hallFishActiveAchievementTab = "big50";
var hallFishCalendarMonthOffset = 0;
var hallFishUpcomingFilter = "all";
var hallFishUpcomingExpanded = false;
var hallFishPrefetchedProfiles = Object.create(null);
var HALL_FISH_LINK_HINT = "Чтобы попасть в рейтинг уровней, привяжите профиль из Покер21 в графе «Профиль».";
var HALL_FISH_ROWS_SESSION_CACHE_KEY = "poker_hall_fish_level_rows_v2";
var HALL_FISH_ROWS_SESSION_CACHE_MS = 60000;
var HALL_FISH_BIRTHDAYS_SESSION_CACHE_KEY = "poker_hall_fish_birthdays_v1";
var HALL_FISH_CALENDAR_EVENTS_LOCAL_KEY = "poker_hall_fish_calendar_events_v1";
var HALL_FISH_PRESET_AVATAR_SRC = {
  tiger: "./assets/avatar-tiger.jpg",
  raccoon: "./assets/avatar-raccoon.jpg",
  skull: "./assets/avatar-skull.jpg",
  phoenix: "./assets/avatar-phoenix.jpg",
  octopus: "./assets/avatar-octopus.jpg",
  cat: "./assets/avatar-cat.jpg",
  robot: "./assets/avatar-robot.jpg",
  bulldog: "./assets/avatar-bulldog.jpg",
  fox: "./assets/avatar-fox.jpg",
  chip: "./assets/avatar-chip.jpg",
  koala: "./assets/avatar-koala.jpg",
  raven: "./assets/avatar-raven.jpg",
  crocodile: "./assets/avatar-crocodile.jpg",
  rabbit: "./assets/avatar-rabbit.jpg",
  chameleon: "./assets/avatar-chameleon.jpg",
  panda: "./assets/avatar-panda.jpg",
  wolf: "./assets/avatar-wolf.jpg",
  owl: "./assets/avatar-owl.jpg",
  bat: "./assets/avatar-bat.jpg",
  gorilla: "./assets/avatar-gorilla.jpg",
};

function hallFishEsc(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function hallFishEncodeData(value) {
  try {
    return encodeURIComponent(JSON.stringify(value == null ? null : value));
  } catch (eEncodeHallFishData) {
    return "";
  }
}

function hallFishDecodeData(value) {
  try {
    return JSON.parse(decodeURIComponent(String(value || "")));
  } catch (eDecodeHallFishData) {
    return null;
  }
}

function hallFishResolveAvatarSrc(value) {
  var raw = String(value || "").trim();
  if (!raw) return "";
  if (raw.indexOf("preset:") === 0) {
    return HALL_FISH_PRESET_AVATAR_SRC[raw.slice("preset:".length)] || "";
  }
  return raw;
}

function hallFishLevelFishSrc(level) {
  var n = Math.max(1, Math.min(55, Math.round(Number(level) || 1)));
  var suffix = n < 10 ? "0" + n : String(n);
  return "./assets/profile-status-fish-level-" + suffix + ".png";
}

function hallFishDateStamp(dateStr) {
  var parts = String(dateStr || "").split(".");
  if (parts.length < 3) return 0;
  return (parseInt(parts[2], 10) || 0) * 10000 +
    (parseInt(parts[1], 10) || 0) * 100 +
    (parseInt(parts[0], 10) || 0);
}

function hallFishGetApiBase() {
  try {
    return typeof getApiBase === "function" ? getApiBase() : "";
  } catch (eBase) {
    return "";
  }
}

function hallFishFetch(url, init, timeoutMs) {
  if (typeof pokerFetchWithTimeout === "function") {
    return pokerFetchWithTimeout(url, init, timeoutMs || 9000);
  }
  return fetch(url, init);
}

function hallFishReadRowsSessionCache() {
  try {
    if (typeof sessionStorage === "undefined") return null;
    var raw = sessionStorage.getItem(HALL_FISH_ROWS_SESSION_CACHE_KEY);
    if (!raw) return null;
    var entry = JSON.parse(raw);
    if (!entry || !Array.isArray(entry.rows)) return null;
    if (Date.now() - Number(entry.ts || 0) > HALL_FISH_ROWS_SESSION_CACHE_MS) return null;
    return entry.rows;
  } catch (eHallFishRowsCacheRead) {
    return null;
  }
}

function hallFishWriteRowsSessionCache(rows) {
  try {
    if (typeof sessionStorage === "undefined" || !Array.isArray(rows)) return;
    sessionStorage.setItem(HALL_FISH_ROWS_SESSION_CACHE_KEY, JSON.stringify({ ts: Date.now(), rows: rows }));
  } catch (eHallFishRowsCacheWrite) {}
}

function hallFishReadBirthdaysSessionCache() {
  try {
    if (typeof sessionStorage === "undefined") return null;
    var raw = sessionStorage.getItem(HALL_FISH_BIRTHDAYS_SESSION_CACHE_KEY);
    if (!raw) return null;
    var entry = JSON.parse(raw);
    if (!entry || !Array.isArray(entry.rows)) return null;
    if (Date.now() - Number(entry.ts || 0) > HALL_FISH_ROWS_SESSION_CACHE_MS) return null;
    return entry.rows;
  } catch (eHallFishBirthdaysCacheRead) {
    return null;
  }
}

function hallFishWriteBirthdaysSessionCache(rows) {
  try {
    if (typeof sessionStorage === "undefined" || !Array.isArray(rows)) return;
    sessionStorage.setItem(HALL_FISH_BIRTHDAYS_SESSION_CACHE_KEY, JSON.stringify({ ts: Date.now(), rows: rows }));
  } catch (eHallFishBirthdaysCacheWrite) {}
}

function hallFishReadCalendarEventsLocal() {
  try {
    if (typeof localStorage === "undefined") return [];
    var raw = localStorage.getItem(HALL_FISH_CALENDAR_EVENTS_LOCAL_KEY);
    var arr = raw ? JSON.parse(raw) : [];
    return hallFishSanitizeCalendarEvents(arr);
  } catch (eHallFishCalendarLocalRead) {
    return [];
  }
}

function hallFishWriteCalendarEventsLocal(events) {
  try {
    if (typeof localStorage === "undefined" || !Array.isArray(events)) return;
    localStorage.setItem(HALL_FISH_CALENDAR_EVENTS_LOCAL_KEY, JSON.stringify(hallFishSanitizeCalendarEvents(events)));
  } catch (eHallFishCalendarLocalWrite) {}
}

function hallFishRefreshVisibleRows(rows) {
  try {
    var modal = document.getElementById("hallFishRatingModal");
    if (!modal || modal.hidden) return;
    if (hallFishActiveTab === "birthdays") {
      hallFishSetBirthdaysState("", rows);
      return;
    }
    if (hallFishActiveTab === "achievements") {
      hallFishAchievementRowsCache = null;
      return;
    }
    hallFishLoadCurrentIds()
      .then(function (ids) {
        hallFishSetModalState("", rows, ids);
      })
      .catch(function () {});
  } catch (eHallFishVisibleRefresh) {}
}

function hallFishFetchRows() {
  if (hallFishRatingRowsPromise) return hallFishRatingRowsPromise;
  var base = hallFishGetApiBase();
  if (!base) return Promise.reject(new Error("no-api-base"));
  var q = "?publicLevels=1";
  hallFishRatingRowsPromise = hallFishFetch(base + "/api/player-crm" + q, { cache: "default" })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (!data || !data.ok) throw new Error((data && data.error) || "bad-response");
      hallFishRatingRowsCache = hallFishRowsFromCrmData(data);
      hallFishAchievementRowsCache = null;
      hallFishBirthdayRowsCache = null;
      hallFishWriteRowsSessionCache(hallFishRatingRowsCache);
      return hallFishRatingRowsCache;
    })
    .finally(function () {
      hallFishRatingRowsPromise = null;
    });
  return hallFishRatingRowsPromise;
}

function hallFishEnsureModal() {
  var modal = document.getElementById("hallFishRatingModal");
  if (modal) {
    modal.classList.remove("hall-fish-modal--bootstrap-loading");
    return modal;
  }
  modal = document.createElement("div");
  modal.className = "hall-fish-modal";
  modal.id = "hallFishRatingModal";
  modal.hidden = true;
  modal.innerHTML =
    '<div class="hall-fish-modal__backdrop" data-hall-fish-close></div>' +
    '<section class="hall-fish-modal__panel" role="dialog" aria-modal="true" aria-label="Рейтинги игроков">' +
      '<button type="button" class="hall-fish-modal__close" data-hall-fish-close aria-label="Закрыть">×</button>' +
      '<div class="hall-fish-modal__tabs" role="tablist" aria-label="Рейтинги игроков">' +
        '<button type="button" class="hall-fish-modal__tab hall-fish-modal__tab--active" data-hall-fish-tab="levels" role="tab" aria-selected="true">Игроки по уровню</button>' +
        '<button type="button" class="hall-fish-modal__tab" data-hall-fish-tab="achievements" role="tab" aria-selected="false">Топы по ачивкам</button>' +
        '<button type="button" class="hall-fish-modal__tab" data-hall-fish-tab="birthdays" role="tab" aria-selected="false">Клубный календарь</button>' +
      '</div>' +
      '<div class="hall-fish-modal__body" id="hallFishRatingBody"></div>' +
    '</section>';
  document.body.appendChild(modal);
  return modal;
}

function hallFishEnsureAchievementDetailModal() {
  var modal = document.getElementById("hallFishAchievementDetailModal");
  if (modal) return modal;
  modal = document.createElement("div");
  modal.className = "hall-fish-achievement-detail";
  modal.id = "hallFishAchievementDetailModal";
  modal.hidden = true;
  modal.innerHTML =
    '<div class="hall-fish-achievement-detail__backdrop" data-hall-fish-achievement-detail-close></div>' +
    '<section class="hall-fish-achievement-detail__panel" role="dialog" aria-modal="true" aria-labelledby="hallFishAchievementDetailTitle">' +
      '<button type="button" class="hall-fish-achievement-detail__close" data-hall-fish-achievement-detail-close aria-label="Закрыть">×</button>' +
      '<p class="hall-fish-achievement-detail__eyebrow" id="hallFishAchievementDetailPlayer"></p>' +
      '<h3 class="hall-fish-achievement-detail__title" id="hallFishAchievementDetailTitle"></h3>' +
      '<div class="hall-fish-achievement-detail__list" id="hallFishAchievementDetailList"></div>' +
    '</section>';
  document.body.appendChild(modal);
  return modal;
}

function hallFishOpenAchievementDetail(row) {
  if (!row) return;
  var details = hallFishDecodeData(row.getAttribute("data-hall-fish-achievement-details")) || [];
  if (!Array.isArray(details)) details = [];
  var modal = hallFishEnsureAchievementDetailModal();
  var playerEl = document.getElementById("hallFishAchievementDetailPlayer");
  var titleEl = document.getElementById("hallFishAchievementDetailTitle");
  var listEl = document.getElementById("hallFishAchievementDetailList");
  var name = String(row.getAttribute("data-user-name") || "Игрок").trim();
  var title = String(row.getAttribute("data-hall-fish-achievement-title") || "Ачивка").trim();
  if (playerEl) playerEl.textContent = name;
  if (titleEl) titleEl.textContent = title;
  if (listEl) {
    listEl.innerHTML = details.length ? details.map(function (item, index) {
      var title = hallFishAchievementDetailTitleHtml(item && item.title || "Запись");
      return '<article class="hall-fish-achievement-detail__item">' +
        '<span class="hall-fish-achievement-detail__rank">' + hallFishEsc(index + 1) + '</span>' +
        '<span class="hall-fish-achievement-detail__text">' +
          '<strong>' + title + '</strong>' +
          (item && item.meta ? '<small>' + hallFishEsc(item.meta) + '</small>' : '') +
        '</span>' +
      '</article>';
    }).join("") : '<div class="hall-fish-modal__notice hall-fish-modal__notice--compact">Записей пока нет.</div>';
  }
  modal.hidden = false;
  modal.classList.add("hall-fish-achievement-detail--open");
}

function hallFishCloseAchievementDetail() {
  var modal = document.getElementById("hallFishAchievementDetailModal");
  if (!modal) return;
  modal.classList.remove("hall-fish-achievement-detail--open");
  modal.hidden = true;
}

function hallFishEnsureCalendarDetailModal() {
  var modal = document.getElementById("hallFishCalendarDetailModal");
  if (modal) return modal;
  modal = document.createElement("div");
  modal.className = "hall-fish-achievement-detail";
  modal.id = "hallFishCalendarDetailModal";
  modal.hidden = true;
  modal.innerHTML =
    '<div class="hall-fish-achievement-detail__backdrop" data-hall-fish-calendar-detail-close></div>' +
    '<section class="hall-fish-achievement-detail__panel" role="dialog" aria-modal="true" aria-labelledby="hallFishCalendarDetailTitle">' +
      '<button type="button" class="hall-fish-achievement-detail__close" data-hall-fish-calendar-detail-close aria-label="Закрыть">×</button>' +
      '<p class="hall-fish-achievement-detail__eyebrow">Клубный календарь</p>' +
      '<h3 class="hall-fish-achievement-detail__title" id="hallFishCalendarDetailTitle"></h3>' +
      '<div class="hall-fish-achievement-detail__list" id="hallFishCalendarDetailList"></div>' +
    '</section>';
  document.body.appendChild(modal);
  return modal;
}

function hallFishCalendarDateLabel(dateKey) {
  var parts = hallFishCalendarDateParts(dateKey);
  if (!parts) return "Дата";
  return (new Date(parts.year, parts.month - 1, parts.day)).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function hallFishOpenCalendarDetail(dateKey, details) {
  var rows = Array.isArray(details) ? details : [];
  if (!rows.length && hallFishCanManageCalendarEvents()) {
    hallFishAddCalendarEvent(dateKey);
    return;
  }
  if (!rows.length) return;
  var modal = hallFishEnsureCalendarDetailModal();
  var titleEl = document.getElementById("hallFishCalendarDetailTitle");
  var listEl = document.getElementById("hallFishCalendarDetailList");
  if (titleEl) titleEl.textContent = hallFishCalendarDateLabel(dateKey);
  if (listEl) {
    listEl.innerHTML = rows.map(function (item, index) {
      var title = String(item && item.title || "Событие").trim();
      var meta = String(item && item.meta || "").trim();
      var note = String(item && item.note || "").trim();
      return '<article class="hall-fish-achievement-detail__item">' +
        '<span class="hall-fish-achievement-detail__rank">' + hallFishEsc(index + 1) + '</span>' +
        '<span class="hall-fish-achievement-detail__text">' +
          '<strong>' + hallFishEsc(title) + '</strong>' +
          (meta ? '<small>' + hallFishEsc(meta) + '</small>' : '') +
          (note ? '<small>' + hallFishEsc(note) + '</small>' : '') +
        '</span>' +
      '</article>';
    }).join("") + (hallFishCanManageCalendarEvents()
      ? '<button type="button" class="hall-fish-calendar-detail__add" data-hall-fish-calendar-add-date="' + hallFishEsc(dateKey) + '">Добавить событие</button>'
      : "");
  }
  modal.hidden = false;
  modal.classList.add("hall-fish-achievement-detail--open");
}

function hallFishCloseCalendarDetail() {
  var modal = document.getElementById("hallFishCalendarDetailModal");
  if (!modal) return;
  modal.classList.remove("hall-fish-achievement-detail--open");
  modal.hidden = true;
}

function hallFishRegistrationMap(rows) {
  var map = {};
  (Array.isArray(rows) ? rows : []).forEach(function (row) {
    var id = String((row && (row.accountId || row.dtId)) || "").trim();
    if (id) map[id] = row;
  });
  return map;
}

function hallFishTelegramLabel(row) {
  if (!row) return "";
  if (row.telegramUsername) return String(row.telegramUsername).replace(/^@?/, "@");
  if (Array.isArray(row.telegramIds) && row.telegramIds.length) return row.telegramIds[0];
  return "";
}

function hallFishRowsFromCrmData(data) {
  if (Array.isArray(data && data.levelRows)) {
    return data.levelRows
      .map(function (row) {
        var poker21Nick = String((row && (row.pokerPlusNickname || row.poker21Nickname || row.nickname)) || "").trim();
        return {
          accountId: String((row && row.accountId) || "").trim(),
          name: String(poker21Nick || (row && row.name) || "").trim(),
          pokerPlusNickname: poker21Nick,
          telegram: String((row && row.telegram) || "").trim(),
          profileBirthDate: String((row && row.profileBirthDate) || "").trim(),
          profileCity: String((row && (row.profileCity || row.city)) || "").trim(),
          avatarUrl: String((row && (row.avatarUrl || row.avatar || row.photoUrl || row.photo_url)) || "").trim(),
          level: Number(row && row.level) || 0,
          fee: Number(row && row.fee) || 0,
        };
      })
      .filter(function (row) { return row.level > 0; })
      .sort(function (a, b) {
        return b.level - a.level || b.fee - a.fee || String(a.name).localeCompare(String(b.name), "ru");
      });
  }
  var registrations = hallFishRegistrationMap(data && data.registeredAccounts);
  return (Array.isArray(data && data.pokerPlusAccounts) ? data.pokerPlusAccounts : [])
    .map(function (row) {
      var accountId = String((row && row.accountId) || "").trim();
      var reg = registrations[accountId] || null;
      var level = Number(row && row.level) || 0;
      var poker21Nick = String((row && (row.pokerPlusNickname || row.poker21Nickname || row.nickname)) || "").trim();
      return {
        accountId: accountId,
        name: String(poker21Nick || (reg && reg.name) || accountId || "").trim(),
        pokerPlusNickname: poker21Nick,
        telegram: hallFishTelegramLabel(reg),
        profileBirthDate: String((row && row.profileBirthDate) || "").trim(),
        profileCity: String((row && (row.profileCity || row.city)) || "").trim(),
        avatarUrl: String((row && (row.avatarUrl || row.avatar || row.photoUrl || row.photo_url)) || "").trim(),
        level: level,
        fee: Number(row && row.fee) || 0,
      };
    })
    .filter(function (row) { return row.level > 0; })
    .sort(function (a, b) {
      return b.level - a.level || b.fee - a.fee || String(a.name).localeCompare(String(b.name), "ru");
    });
}

function hallFishIdVariants(id) {
  var raw = String(id || "").trim();
  var out = [];
  function add(value) {
    var s = String(value || "").trim();
    if (!s) return;
    if (out.indexOf(s) === -1) out.push(s);
    var up = s.toUpperCase();
    if (out.indexOf(up) === -1) out.push(up);
  }
  add(raw);
  var noPrefix = raw.replace(/^(tg_|mail_)/i, "").replace(/^ID/i, "");
  add(noPrefix);
  if (/^\d+$/.test(noPrefix)) add("ID" + noPrefix);
  return out;
}

function hallFishReadLocalCurrentIds() {
  var ids = [];
  function add(value) {
    var s = String(value || "").trim();
    if (s && ids.indexOf(s) === -1) ids.push(s);
  }
  try { add(window.__pokerPlusUserId); } catch (eWinP21) {}
  try {
    var profileId = document.getElementById("profileUserId");
    add(profileId && profileId.textContent);
  } catch (eProfileId) {}
  try { add(sessionStorage.getItem("poker_dt_id")); } catch (eSessId) {}
  try { add(localStorage.getItem("poker_dt_id")); } catch (eLocalId) {}
  return ids;
}

function hallFishCurrentPoker21Linked() {
  try {
    if (window.__pokerHallFishPoker21Linked === true) return true;
    if (window.__pokerHeaderPoker21Linked === true) return true;
    if (String(window.__pokerPlusUserId || "").trim()) return true;
  } catch (eLinked) {}
  return false;
}

function hallFishSetSubtitle(subtitle) {
  if (!subtitle) return;
  var linked = hallFishCurrentPoker21Linked();
  subtitle.hidden = !!linked;
  subtitle.textContent = linked ? "" : HALL_FISH_LINK_HINT;
}

function hallFishLoadCurrentIds() {
  if (hallFishCurrentIdsCache) return Promise.resolve(hallFishCurrentIdsCache.slice());
  if (hallFishCurrentIdsPromise) return hallFishCurrentIdsPromise;
  var localIds = hallFishReadLocalCurrentIds();
  var base = hallFishGetApiBase();
  var hasCred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
  if (!base || !hasCred || typeof pokerApiAuthQuery !== "function") {
    hallFishCurrentIdsCache = localIds;
    return Promise.resolve(localIds.slice());
  }
  var q = pokerApiAuthQuery("?");
  try {
    var cached = sessionStorage.getItem("poker_dt_id") || (typeof localStorage !== "undefined" && localStorage.getItem("poker_dt_id"));
    if (cached) q += "&dtIdHint=" + encodeURIComponent(cached);
  } catch (eHint) {}
  hallFishCurrentIdsPromise = hallFishFetch(base + "/api/users" + q, { cache: "no-store" })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var ids = localIds.slice();
      function add(value) {
        var s = String(value || "").trim();
        if (s && ids.indexOf(s) === -1) ids.push(s);
      }
      if (data && data.ok) {
        try {
          window.__pokerHallFishPoker21Linked = !!(data.pokerPlusVerified || data.p21Id || data.pokerPlusUserId);
        } catch (eLinkedFlag) {}
        add(data.p21Id);
        add(data.pokerPlusUserId);
        add(data.dtId);
        add(data.accountId);
      }
      hallFishCurrentIdsCache = ids;
      return ids.slice();
    })
    .catch(function () {
      hallFishCurrentIdsCache = localIds;
      return localIds.slice();
    })
    .finally(function () {
      hallFishCurrentIdsPromise = null;
    });
  return hallFishCurrentIdsPromise;
}

function hallFishFindMyRank(rows, currentIds) {
  var variants = {};
  (Array.isArray(currentIds) ? currentIds : []).forEach(function (id) {
    hallFishIdVariants(id).forEach(function (v) { variants[v] = true; });
  });
  if (!Object.keys(variants).length) return 0;
  for (var i = 0; i < rows.length; i += 1) {
    var rowVariants = hallFishIdVariants(rows[i] && rows[i].accountId);
    for (var j = 0; j < rowVariants.length; j += 1) {
      if (variants[rowVariants[j]]) return i + 1;
    }
  }
  return 0;
}

function hallFishFindMyLevelRow(rows, currentIds) {
  rows = Array.isArray(rows) ? rows : [];
  var variants = {};
  (Array.isArray(currentIds) ? currentIds : []).forEach(function (id) {
    hallFishIdVariants(id).forEach(function (v) { variants[v] = true; });
  });
  if (!Object.keys(variants).length) return null;
  for (var i = 0; i < rows.length; i += 1) {
    var rowVariants = hallFishIdVariants(rows[i] && rows[i].accountId);
    for (var j = 0; j < rowVariants.length; j += 1) {
      if (variants[rowVariants[j]]) return { row: rows[i], rank: i + 1 };
    }
  }
  return null;
}

function hallFishMyRankText(rows, currentIds) {
  rows = Array.isArray(rows) ? rows : [];
  var total = rows.length;
  if (!total) return "Ваш рейтинг —/—";
  var rank = hallFishFindMyRank(rows, currentIds);
  return "Ваш рейтинг " + (rank ? String(rank) : "—") + "/" + String(total);
}

function hallFishLevelPlayerImage(row) {
  var nick = String((row && (row.pokerPlusNickname || row.name || row.nick)) || "").trim();
  if (nick && typeof window.pokerGetSummerRatingPlayerArt === "function") {
    try {
      var art = window.pokerGetSummerRatingPlayerArt(nick);
      if (art && art.src) return { src: art.src, kind: "art" };
    } catch (eHallFishArt) {}
  }
  var avatar = hallFishResolveAvatarSrc(row && (row.avatarUrl || row.avatar || row.photoUrl || row.photo_url));
  if (avatar) return { src: avatar, kind: "avatar" };
  return { src: hallFishLevelFishSrc(row && row.level), kind: "fish" };
}

function hallFishLevelAgeText(value) {
  var parts = hallFishBirthDateParts(value);
  if (!parts) return "";
  var now = new Date();
  var age = now.getFullYear() - parts.year;
  var month = now.getMonth() + 1;
  var day = now.getDate();
  if (month < parts.month || (month === parts.month && day < parts.day)) age -= 1;
  if (!isFinite(age) || age < 0 || age > 130) return "";
  return String(age) + " " + hallFishAgeWord(age);
}

function hallFishLevelRowHtml(row, rank, extraClass) {
  var userId = String(row && row.accountId || "").trim();
  var name = row && (row.name || row.telegram) || "Игрок";
  var sub = row && row.telegram ? String(row.telegram) : ((userId ? userId + " / " : "") + "без TG");
  var image = hallFishLevelPlayerImage(row);
  var age = hallFishLevelAgeText(row && row.profileBirthDate);
  var city = String((row && (row.profileCity || row.city)) || "").trim();
  var meta = [age, city].filter(Boolean).join(" · ");
  return '<button type="button" class="hall-fish-level-row hall-fish-level-row--player' + (extraClass ? " " + hallFishEsc(extraClass) : "") + '" data-user-id="' + hallFishEsc(userId) + '" data-user-name="' + hallFishEsc(name) + '" data-user-level="' + hallFishEsc(row && row.level) + '" aria-label="Открыть профиль ' + hallFishEsc(name) + '">' +
    '<span class="hall-fish-level-row__rank">' + hallFishEsc(rank) + '</span>' +
    '<span class="hall-fish-level-row__media hall-fish-level-row__media--' + hallFishEsc(image.kind) + '"><img src="' + hallFishEsc(image.src) + '" alt="" loading="lazy" decoding="async"></span>' +
    '<span class="hall-fish-level-row__main"><span class="hall-fish-level-row__name">' + hallFishEsc(row && row.name || "—") + '</span>' +
    '<span class="hall-fish-level-row__tg">' + hallFishEsc(sub) + '</span>' +
    (meta ? '<span class="hall-fish-level-row__meta">' + hallFishEsc(meta) + '</span>' : '') + '</span>' +
    '<span class="hall-fish-level-row__level">' + hallFishEsc(row && row.level) + ' ур.</span>' +
  '</button>';
}

function hallFishRenderRows(rows, currentIds) {
  if (!rows.length) return '<div class="hall-fish-modal__notice">Пока нет игроков с уровнем.</div>';
  var mine = hallFishFindMyLevelRow(rows, currentIds);
  return '<div class="hall-fish-level-list">' + rows.map(function (row, idx) {
    var isMine = mine && mine.rank === idx + 1;
    return hallFishLevelRowHtml(row, idx + 1, isMine ? "hall-fish-level-row--mine" : "");
  }).join("") + '</div>' +
    (mine ? '<div class="hall-fish-level-sticky-mine" aria-label="Ваша строка рейтинга">' +
      hallFishLevelRowHtml(mine.row, mine.rank, "hall-fish-level-row--mine hall-fish-level-row--sticky") +
    '</div>' : '');
}

function hallFishRenderLevelSkeleton() {
  var rows = [];
  for (var i = 1; i <= 6; i += 1) {
    rows.push(
      '<div class="hall-fish-level-row hall-fish-level-row--skeleton" aria-hidden="true">' +
        '<span class="hall-fish-level-row__rank">' + i + '</span>' +
        '<span><span class="hall-fish-skeleton-line hall-fish-skeleton-line--name"></span>' +
        '<span class="hall-fish-skeleton-line hall-fish-skeleton-line--sub"></span></span>' +
        '<span class="hall-fish-skeleton-line hall-fish-skeleton-line--value"></span>' +
      '</div>'
    );
  }
  return '<div class="hall-fish-level-list hall-fish-level-list--skeleton" role="status" aria-live="polite" aria-label="Загрузка рейтинга">' + rows.join("") + '</div>';
}

function hallFishRenderAchievementSkeleton() {
  return '<div class="hall-fish-achievement-shell hall-fish-achievement-shell--skeleton" role="status" aria-live="polite" aria-label="Загрузка топов по ачивкам">' +
    '<div class="hall-fish-achievement-subtabs hall-fish-achievement-subtabs--skeleton">' +
      '<span class="hall-fish-skeleton-pill"></span><span class="hall-fish-skeleton-pill"></span><span class="hall-fish-skeleton-pill"></span>' +
    '</div>' +
    hallFishRenderLevelSkeleton() +
  '</div>';
}

function hallFishRenderBirthdaysSkeleton() {
  var cells = [];
  for (var i = 0; i < 35; i += 1) cells.push('<span class="hall-fish-birthday-calendar__cell hall-fish-birthday-calendar__cell--skeleton"></span>');
  return '<div class="hall-fish-birthdays hall-fish-birthdays--skeleton" role="status" aria-live="polite" aria-label="Загрузка дней рождения">' +
    '<div class="hall-fish-birthday-calendar">' +
      '<div class="hall-fish-skeleton-line hall-fish-skeleton-line--calendar-title"></div>' +
      '<div class="hall-fish-birthday-calendar__grid">' + cells.join("") + '</div>' +
    '</div>' +
  '</div>';
}

function hallFishNormalizeNick(nick) {
  if (typeof normalizeWinterNick === "function") return normalizeWinterNick(nick);
  return String(nick || "").trim().replace(/^@+/, "").replace(/\s+/g, " ").toLowerCase();
}

function hallFishFormatNumber(value) {
  var n = Number(value) || 0;
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function hallFishFormatRub(value) {
  if (typeof formatRewardRound === "function") return formatRewardRound(value) + " ₽";
  return hallFishFormatNumber(value) + " ₽";
}

function hallFishLevelRowsByNick(rows) {
  var map = {};
  (Array.isArray(rows) ? rows : []).forEach(function (row) {
    var names = [row && row.name, row && row.pokerPlusNickname, row && row.telegram];
    names.forEach(function (name) {
      var key = hallFishNormalizeNick(String(name || "").replace(/^@+/, ""));
      if (key && !map[key]) map[key] = row;
    });
  });
  return map;
}

function hallFishPlayerMetaByNick(nick, map) {
  var key = hallFishNormalizeNick(nick);
  var row = key && map ? map[key] : null;
  if (!row) return { nick: nick || "Игрок", accountId: "", telegram: "", profileBirthDate: "", profileCity: "", avatarUrl: "", level: 0 };
  return {
    nick: row.name || row.pokerPlusNickname || nick || "Игрок",
    accountId: String(row.accountId || "").trim(),
    telegram: String(row.telegram || "").trim(),
    profileBirthDate: String((row && row.profileBirthDate) || "").trim(),
    profileCity: String((row && (row.profileCity || row.city)) || "").trim(),
    avatarUrl: String((row && (row.avatarUrl || row.avatar || row.photoUrl || row.photo_url)) || "").trim(),
    level: Number(row && row.level) || 0,
  };
}

function hallFishRowsWithRank(rows) {
  return (Array.isArray(rows) ? rows : [])
    .filter(function (row) { return row && (Number(row.value) || 0) > 0; })
    .sort(function (a, b) {
      return (Number(b.value) || 0) - (Number(a.value) || 0) ||
        (Number(b.tie) || 0) - (Number(a.tie) || 0) ||
        String(a.nick || "").localeCompare(String(b.nick || ""), "ru");
    })
    .slice(0, 10)
    .map(function (row, index) {
      return Object.assign({ rank: index + 1 }, row);
    });
}

function hallFishAggregateTournamentAchievements(levelRows) {
  var allRows = typeof pokerRatingAchievementAllTournamentRows === "function" ? pokerRatingAchievementAllTournamentRows() : [];
  var byNick = {};
  var byMonth = {};
  var metaByNick = hallFishLevelRowsByNick(levelRows);
  function entry(nick) {
    var key = hallFishNormalizeNick(nick);
    if (!key) return null;
    if (!byNick[key]) {
      var meta = hallFishPlayerMetaByNick(nick, metaByNick);
      byNick[key] = {
        key: key,
        nick: meta.nick || nick || "Игрок",
        accountId: meta.accountId,
        telegram: meta.telegram,
        profileBirthDate: meta.profileBirthDate,
        profileCity: meta.profileCity,
        avatarUrl: meta.avatarUrl,
        level: meta.level,
        big50: 0,
        big50Best: 0,
        big100: 0,
        big100Best: 0,
        firstPlaces: 0,
        monthChampion: 0,
        monthChampionBest: 0,
        viceChampion: 0,
        viceChampionBest: 0,
        big50Rows: [],
        big100Rows: [],
        firstPlaceRows: [],
        monthChampionRows: [],
        viceChampionRows: [],
      };
    }
    return byNick[key];
  }
  (Array.isArray(allRows) ? allRows : []).forEach(function (row) {
    var nick = row && row.nick;
    var item = entry(nick);
    if (!item) return;
    var reward = Number(row && row.reward) || 0;
    if (reward >= 100000) {
      item.big100 += 1;
      if (reward > item.big100Best) item.big100Best = reward;
      item.big100Rows.push(row);
    } else if (reward >= 50000) {
      item.big50 += 1;
      if (reward > item.big50Best) item.big50Best = reward;
      item.big50Rows.push(row);
    }
    if (Number(row && row.place) === 1) {
      item.firstPlaces += 1;
      item.firstPlaceRows.push(row);
    }
    var parts = String((row && row.date) || "").split(".");
    if (parts.length === 3) {
      var monthKey = parts[1] + "." + parts[2];
      if (!byMonth[monthKey]) byMonth[monthKey] = {};
      if (!byMonth[monthKey][item.key]) byMonth[monthKey][item.key] = { key: item.key, reward: 0 };
      byMonth[monthKey][item.key].reward += reward;
    }
  });
  Object.keys(byMonth).forEach(function (monthKey) {
    var monthRows = Object.keys(byMonth[monthKey]).map(function (key) { return byMonth[monthKey][key]; })
      .filter(function (row) { return (Number(row.reward) || 0) > 0; })
      .sort(function (a, b) {
        return (Number(b.reward) || 0) - (Number(a.reward) || 0) ||
          String(a.key || "").localeCompare(String(b.key || ""), "ru");
      });
    if (!monthRows.length) return;
    monthRows.slice(0, 2).forEach(function (row, index) {
      var item = byNick[row.key];
      if (!item) return;
      if (index === 0) {
        item.monthChampion += 1;
        if ((Number(row.reward) || 0) > item.monthChampionBest) item.monthChampionBest = Number(row.reward) || 0;
        item.monthChampionRows.push({
          monthKey: monthKey,
          place: 1,
          reward: Number(row.reward) || 0,
        });
      } else if (index === 1) {
        item.viceChampion += 1;
        if ((Number(row.reward) || 0) > item.viceChampionBest) item.viceChampionBest = Number(row.reward) || 0;
        item.viceChampionRows.push({
          monthKey: monthKey,
          place: 2,
          reward: Number(row.reward) || 0,
        });
      }
    });
  });
  var list = Object.keys(byNick).map(function (key) { return byNick[key]; });
  function tournamentDetails(rows) {
    return (Array.isArray(rows) ? rows : []).slice().sort(function (a, b) {
      return hallFishDateStamp(b && b.date) - hallFishDateStamp(a && a.date) ||
        (Number(b && b.reward) || 0) - (Number(a && a.reward) || 0);
    }).map(function (row) {
      var amount = hallFishFormatRub(row && row.reward);
      var parts = [amount, row && row.date].filter(Boolean).join(" · ");
      var place = row && row.place ? String(row.place) + " место" : "";
      var tournament = String(row && row.tournamentLabel || "").trim();
      return {
        title: parts || "Турнир",
        meta: [place, tournament].filter(Boolean).join(" · "),
      };
    });
  }
  function monthChampionDetails(rows) {
    return (Array.isArray(rows) ? rows : []).slice().sort(function (a, b) {
      var am = String(a && a.monthKey || "").split(".");
      var bm = String(b && b.monthKey || "").split(".");
      return ((parseInt(bm[1], 10) || 0) * 12 + (parseInt(bm[0], 10) || 0)) -
        ((parseInt(am[1], 10) || 0) * 12 + (parseInt(am[0], 10) || 0));
    }).map(function (row) {
      var month = typeof pokerRatingAchievementMonthLabel === "function"
        ? pokerRatingAchievementMonthLabel(row && row.monthKey)
        : String(row && row.monthKey || "");
      return {
        title: month ? "Месяц: " + month : "Месяц",
        meta: (row && row.place ? String(row.place) + " место" : "топ-3") + " · " + hallFishFormatRub(row && row.reward),
      };
    });
  }
  return {
    big50: hallFishRowsWithRank(list.map(function (row) {
      return Object.assign({}, row, { value: row.big50, tie: row.big50Best, valueText: row.big50 + " зан.", extraText: row.big50Best ? "лучший " + hallFishFormatRub(row.big50Best) : "", detailRows: tournamentDetails(row.big50Rows) });
    })),
    big100: hallFishRowsWithRank(list.map(function (row) {
      return Object.assign({}, row, { value: row.big100, tie: row.big100Best, valueText: row.big100 + " зан.", extraText: row.big100Best ? "лучший " + hallFishFormatRub(row.big100Best) : "", detailRows: tournamentDetails(row.big100Rows) });
    })),
    king: hallFishRowsWithRank(list.map(function (row) {
      return Object.assign({}, row, { value: row.firstPlaces, tie: row.big100Best || row.big50Best, valueText: row.firstPlaces + " побед", extraText: "1 место в турнирах", detailRows: tournamentDetails(row.firstPlaceRows) });
    })),
    monthChampion: hallFishRowsWithRank(list.map(function (row) {
      return Object.assign({}, row, { value: row.monthChampion, tie: row.monthChampionBest, valueText: row.monthChampion + " раз", extraText: "топ-1 месяца по заносам", detailRows: monthChampionDetails(row.monthChampionRows) });
    })),
    viceChampion: hallFishRowsWithRank(list.map(function (row) {
      return Object.assign({}, row, { value: row.viceChampion, tie: row.viceChampionBest, valueText: row.viceChampion + " раз", extraText: "топ-2 месяца по заносам", detailRows: monthChampionDetails(row.viceChampionRows) });
    })),
  };
}

function hallFishAggregateClubChoiceRows(rows, levelRows) {
  var map = {};
  var metaByNick = hallFishLevelRowsByNick(levelRows);
  (Array.isArray(rows) ? rows : []).forEach(function (month) {
    var monthKey = String(month && (month.month || month.monthKey || month.period || month.key) || "").trim();
    var monthLabel = hallFishCalendarMonthLabel(monthKey);
    (Array.isArray(month && month.winners) ? month.winners : []).forEach(function (winner) {
      var nick = String((winner && winner.nick) || "").trim();
      var key = hallFishNormalizeNick(nick);
      if (!key) return;
      if (!map[key]) {
        var meta = hallFishPlayerMetaByNick(nick, metaByNick);
        map[key] = {
          nick: meta.nick || nick,
          accountId: String((winner && winner.accountId) || meta.accountId || "").trim(),
          telegram: meta.telegram,
          profileBirthDate: meta.profileBirthDate,
          profileCity: meta.profileCity,
          avatarUrl: meta.avatarUrl,
          level: meta.level,
          value: 0,
          tie: 0,
          months: [],
          descriptions: [],
          detailRows: [],
        };
      }
      map[key].value += 1;
      map[key].tie += Number(winner && winner.votes) || 0;
      if (monthLabel && map[key].months.indexOf(monthLabel) === -1) map[key].months.push(monthLabel);
      var description = hallFishClubChoiceDescription(nick, monthKey, winner && winner.description);
      if (description && map[key].descriptions.indexOf(description) === -1) map[key].descriptions.push(description);
      map[key].detailRows.push({
        title: monthLabel ? monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1) : "Народный герой",
        meta: [
          "Топ" + (parseInt(winner && winner.place, 10) || 1),
          winner && winner.votes != null ? String(parseInt(winner.votes, 10) || 0) + " голосов" : "",
          description,
        ].filter(Boolean).join(" · "),
      });
    });
  });
  return hallFishRowsWithRank(Object.keys(map).map(function (key) {
    var row = map[key];
    var monthText = row.months && row.months.length ? row.months.join(", ") : "";
    return Object.assign({}, row, {
      valueText: row.value + " раз",
      extraText: monthText || (row.tie ? row.tie + " голосов" : "Народный герой"),
      description: row.descriptions && row.descriptions.length ? row.descriptions.join("\n") : "",
      detailRows: row.detailRows,
    });
  }));
}

function hallFishReferralsRows(data) {
  return hallFishRowsWithRank((Array.isArray(data && data.ranking) ? data.ranking : []).map(function (row) {
    var nick = String((row && (row.name || row.telegramLogin || row.accountId)) || "Игрок").trim();
    var login = String((row && row.telegramLogin) || "").trim();
    return {
      nick: nick,
      accountId: String((row && row.accountId) || "").trim(),
      telegram: login ? "@" + login.replace(/^@+/, "") : "",
      value: Number(row && row.invitedCount) || 0,
      tie: Number(row && row.totalPoker21Level) || 0,
      valueText: (Number(row && row.invitedCount) || 0) + " чел.",
      extraText: row && row.poker21LinkedInvited ? "Покер21: " + row.poker21LinkedInvited : "",
    };
  }));
}

function hallFishAchievementSpecs(data) {
  return [
    { key: "big50", title: "Заносы 50-100к", sectionTitle: "Заносы от 50 до 100к", description: "Считаются турнирные заносы от 50 000 ₽ до 99 999 ₽. В топе выше игроки с большим количеством таких заносов.", rows: data && data.big50 },
    { key: "big100", title: "Заносы 100к+", sectionTitle: "Заносы от 100к", description: "Считаются турнирные заносы от 100 000 ₽ и выше. При равенстве выше игрок с более крупным лучшим заносом.", rows: data && data.big100 },
    { key: "king", title: "Король МТТ", sectionTitle: "Король турниров", description: "Даётся за первые места в турнирах клуба. Чем больше побед, тем выше позиция в топе.", rows: data && data.king },
    { key: "monthChampion", title: "Чемп месяца", sectionTitle: "Чемпион месяца", description: "Начисляется игроку, который занял топ-1 месяца по сумме заносов. В зачёт идёт каждый месяц отдельно.", rows: data && data.monthChampion },
    { key: "viceChampion", title: "Вице-чемп", sectionTitle: "Вице-чемпион месяца", description: "Начисляется игроку, который занял топ-2 месяца по сумме заносов. В зачёт идёт каждый месяц отдельно.", rows: data && data.viceChampion },
    { key: "clubChoice", title: "Народный герой", sectionTitle: "Народный герой", description: "Даётся победителям голосования клуба за достижение месяца. В топе учитывается количество побед и голоса.", rows: data && data.clubChoice },
  ];
}

function hallFishAchievementShareLabel(key, title) {
  return "Зал славы — Топы по ачивкам: " + (title || key || "ачивка");
}

function hallFishAchievementShareHtml(key, title) {
  var label = hallFishAchievementShareLabel(key, title);
  return '<div class="hall-fish-achievement-share" data-hall-fish-achievement-share-row>' +
    '<button type="button" class="hall-fish-achievement-share__btn" data-hall-fish-achievement-share="' + hallFishEsc(key) + '" data-hall-fish-achievement-action="share" data-hall-fish-achievement-text="' + hallFishEsc(label) + '">Поделиться</button>' +
    '<button type="button" class="hall-fish-achievement-share__btn hall-fish-achievement-share__btn--copy" data-hall-fish-achievement-share="' + hallFishEsc(key) + '" data-hall-fish-achievement-action="copy" data-hall-fish-achievement-text="' + hallFishEsc(label) + '" aria-label="' + hallFishEsc("Скопировать ссылку: " + label) + '">Скопировать</button>' +
  '</div>';
}

function hallFishAchievementSectionHtml(title, rows, description, key) {
  var list = Array.isArray(rows) ? rows : [];
  return '<section class="hall-fish-achievement-section">' +
    '<h4 class="hall-fish-achievement-section__title">' + hallFishEsc(title) + '</h4>' +
    (description ? '<p class="hall-fish-achievement-section__description">' + hallFishEsc(description) + '</p>' : '') +
    (list.length ? '<div class="hall-fish-level-list hall-fish-achievement-list">' + list.map(function (row) {
      var userId = String(row.accountId || "").trim();
      var name = row.nick || "Игрок";
      var sub = row.telegram || row.extraText || "";
      var image = hallFishLevelPlayerImage(row);
      var age = hallFishLevelAgeText(row && row.profileBirthDate);
      var city = String((row && (row.profileCity || row.city)) || "").trim();
      var meta = [age, city].filter(Boolean).join(" · ");
      var story = String(row.description || "").trim();
      var details = Array.isArray(row.detailRows) ? row.detailRows : [];
      var attrs = userId
        ? ' data-user-id="' + hallFishEsc(userId) + '" data-user-name="' + hallFishEsc(name) + '" data-user-level="' + hallFishEsc(row && row.level || "") + '"'
        : ' data-user-name="' + hallFishEsc(name) + '"';
      attrs += ' data-hall-fish-achievement-title="' + hallFishEsc(title) + '" data-hall-fish-achievement-details="' + hallFishEsc(hallFishEncodeData(details)) + '"';
      return '<button type="button" class="hall-fish-level-row hall-fish-level-row--player hall-fish-achievement-row"' + attrs + ' aria-label="' + hallFishEsc("Открыть ачивку " + title + " — " + name) + '">' +
        '<span class="hall-fish-level-row__rank">' + hallFishEsc(row.rank) + '</span>' +
        '<span class="hall-fish-level-row__media hall-fish-level-row__media--' + hallFishEsc(image.kind) + '"><img src="' + hallFishEsc(image.src) + '" alt="" loading="lazy" decoding="async"></span>' +
        '<span class="hall-fish-level-row__main"><span class="hall-fish-level-row__name">' + hallFishEsc(name) + '</span>' +
        '<span class="hall-fish-level-row__tg">' + hallFishEsc(sub) + '</span>' +
        (meta ? '<span class="hall-fish-level-row__meta">' + hallFishEsc(meta) + '</span>' : '') +
        (story ? '<span class="hall-fish-achievement-row__story">' + hallFishEsc(story) + '</span>' : '') + '</span>' +
        '<span class="hall-fish-level-row__level">' + hallFishEsc(row.valueText || row.value) + '</span>' +
      '</button>';
    }).join("") + '</div>' : '<div class="hall-fish-modal__notice hall-fish-modal__notice--compact">Пока нет данных.</div>') +
    hallFishAchievementShareHtml(key || hallFishActiveAchievementTab || "big50", title) +
  '</section>';
}

function hallFishRenderAchievementRows(data) {
  var specs = hallFishAchievementSpecs(data);
  var active = specs.some(function (spec) { return spec.key === hallFishActiveAchievementTab; })
    ? hallFishActiveAchievementTab
    : "big50";
  hallFishActiveAchievementTab = active;
  var activeSpec = specs.filter(function (spec) { return spec.key === active; })[0] || specs[0];
  return '<div class="hall-fish-achievements">' +
    '<div class="hall-fish-achievement-tabs-shell" aria-label="Фильтры топов по ачивкам">' +
      '<div class="hall-fish-achievement-tabs-shell__head">' +
        '<span class="hall-fish-achievement-tabs-shell__eyebrow">Топы по ачивкам</span>' +
        '<span class="hall-fish-achievement-tabs-shell__hint">выберите достижение</span>' +
      '</div>' +
    '<div class="hall-fish-achievement-tabs" role="tablist" aria-label="Топы по ачивкам">' +
      specs.map(function (spec) {
        var isActive = spec.key === active;
        return '<button type="button" class="hall-fish-achievement-tab' + (isActive ? " hall-fish-achievement-tab--active" : "") + '" data-hall-fish-achievement-tab="' + hallFishEsc(spec.key) + '" role="tab" aria-selected="' + (isActive ? "true" : "false") + '">' + hallFishEsc(spec.title) + '</button>';
      }).join("") +
    '</div>' +
    '</div>' +
    hallFishAchievementSectionHtml(activeSpec.sectionTitle || activeSpec.title, activeSpec.rows, activeSpec.description, activeSpec.key) +
  '</div>';
}

function hallFishBirthDateParts(value) {
  var m = String(value || "").trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  var year = parseInt(m[1], 10);
  var month = parseInt(m[2], 10);
  var day = parseInt(m[3], 10);
  if (!year || year < 1900 || year > 2100) return null;
  if (!month || month < 1 || month > 12 || !day || day < 1 || day > 31) return null;
  return { year: year, month: month, day: day };
}

function hallFishBirthdayRows(rows) {
  return (Array.isArray(rows) ? rows : [])
    .map(function (row) {
      var parts = hallFishBirthDateParts(row && (row.profileBirthDate || row.birthDate || row.birthday));
      if (!parts) return null;
      return {
        accountId: String((row && row.accountId) || "").trim(),
        nick: String((row && (row.name || row.pokerPlusNickname || row.telegram)) || "Игрок").trim(),
        telegram: String((row && row.telegram) || "").trim(),
        birthYear: parts.year,
        month: parts.month,
        day: parts.day,
      };
    })
    .filter(Boolean);
}

function hallFishBirthdayDateForYear(row, year) {
  var date = new Date(year, Number(row && row.month) - 1, Number(row && row.day));
  if (date.getMonth() !== Number(row && row.month) - 1) return null;
  date.setHours(0, 0, 0, 0);
  return date;
}

function hallFishFormatBirthdayDate(row, year) {
  var date = hallFishBirthdayDateForYear(row, year || (new Date()).getFullYear());
  if (!date) return "";
  return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
}

function hallFishAgeWord(age) {
  var value = Math.abs(Number(age) || 0);
  var lastTwo = value % 100;
  var last = value % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return "лет";
  if (last === 1) return "год";
  if (last >= 2 && last <= 4) return "года";
  return "лет";
}

function hallFishBirthdayAgeText(row, targetDate, today) {
  var birthYear = Number(row && row.birthYear);
  var date = targetDate instanceof Date ? targetDate : null;
  var targetYear = date ? date.getFullYear() : NaN;
  if (!birthYear || !targetYear || targetYear <= birthYear) return "";
  var age = targetYear - birthYear;
  var base = today instanceof Date ? new Date(today.getFullYear(), today.getMonth(), today.getDate()) : new Date();
  base.setHours(0, 0, 0, 0);
  var compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  compareDate.setHours(0, 0, 0, 0);
  var verb = compareDate < base ? "Исполнилось" : compareDate > base ? "Исполнится" : "Исполняется";
  return verb + " " + String(age) + " " + hallFishAgeWord(age);
}

function hallFishCalendarDateKey(year, monthIndex, day) {
  var mm = String(Number(monthIndex) + 1).padStart(2, "0");
  var dd = String(Number(day) || 0).padStart(2, "0");
  return String(year) + "-" + mm + "-" + dd;
}

function hallFishCalendarMonthLabel(key) {
  var parts = String(key || "").split("-");
  if (parts.length !== 2) return "";
  var year = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10);
  if (!year || !month) return "";
  var date = new Date(year, month - 1, 1);
  if (!isFinite(date.getTime())) return "";
  return date.toLocaleDateString("ru-RU", { month: "long" });
}

function hallFishClubChoiceDescription(nick, monthKey, description) {
  var text = String(description || "").trim();
  if (text) return text;
  if (String(monthKey || "") === "2026-05" && hallFishNormalizeNick(nick) === hallFishNormalizeNick("Em13!!")) {
    return "Выигрыш 2 300 000р в мейне в Калининграде за 1е место. Отобрался с сателлита за 300р в сателлит за 1200р, там выиграл путевку за 120 000р в Калининград, включающую билет на мейн, и выиграл Мейн.";
  }
  return "";
}

function hallFishCalendarDateParts(dateKey) {
  var m = String(dateKey || "").trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  var year = parseInt(m[1], 10);
  var month = parseInt(m[2], 10);
  var day = parseInt(m[3], 10);
  var d = new Date(year, month - 1, day);
  if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) return null;
  return { year: year, month: month, day: day };
}

function hallFishSanitizeCalendarEvents(input) {
  var seen = {};
  return (Array.isArray(input) ? input : []).map(function (event) {
    var parts = hallFishCalendarDateParts(event && event.date);
    var title = String((event && event.title) || "").replace(/\s+/g, " ").trim().slice(0, 80);
    if (!parts || !title) return null;
    var id = String((event && event.id) || "").trim().slice(0, 80) || (event.date + ":" + title.toLowerCase());
    if (seen[id]) return null;
    seen[id] = true;
    var row = {
      id: id,
      date: String(event.date),
      title: title,
      createdAt: Number(event && event.createdAt) || Date.now(),
    };
    var note = String((event && event.note) || "").replace(/\s+/g, " ").trim().slice(0, 180);
    if (note) row.note = note;
    return row;
  }).filter(Boolean).sort(function (a, b) {
    return String(a.date).localeCompare(String(b.date)) || String(a.title).localeCompare(String(b.title), "ru");
  });
}

function hallFishCanManageCalendarEvents() {
  try {
    var auth = window.__pokerTelegramAuth;
    if (auth && auth.adminAccess === true) return true;
    var rec = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
    if (rec && rec.adminAccess === true) return true;
  } catch (eHallFishAdminFlag) {}
  return false;
}

function hallFishCalendarEventDate(event) {
  var parts = hallFishCalendarDateParts(event && event.date);
  if (!parts) return null;
  var d = new Date(parts.year, parts.month - 1, parts.day);
  d.setHours(0, 0, 0, 0);
  return d;
}

function hallFishUpcomingCalendarEvents(events) {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  return hallFishSanitizeCalendarEvents(events).map(function (event) {
    var date = hallFishCalendarEventDate(event);
    if (!date || date < today) return null;
    return Object.assign({}, event, {
      nextDate: date,
      daysLeft: Math.round((date - today) / 86400000),
    });
  }).filter(Boolean).sort(function (a, b) {
    return a.daysLeft - b.daysLeft || String(a.title || "").localeCompare(String(b.title || ""), "ru");
  });
}

function hallFishCalendarYearEvents(events, year) {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  return hallFishSanitizeCalendarEvents(events).map(function (event) {
    var parts = hallFishCalendarDateParts(event && event.date);
    if (!parts || parts.year !== year) return null;
    var date = hallFishCalendarEventDate(event);
    if (!date) return null;
    return Object.assign({}, event, {
      nextDate: date,
      daysLeft: Math.round((date - today) / 86400000),
    });
  }).filter(Boolean).sort(function (a, b) {
    return a.nextDate - b.nextDate || String(a.title || "").localeCompare(String(b.title || ""), "ru");
  });
}

function hallFishCalendarRelativeLabel(daysLeft) {
  if (daysLeft === 0) return "сегодня";
  if (daysLeft === 1) return "завтра";
  if (daysLeft > 1) return "через " + daysLeft + " дн.";
  if (daysLeft === -1) return "вчера";
  return Math.abs(daysLeft) + " дн. назад";
}

function hallFishCalendarMonthEvents(events, year, monthIndex) {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  return hallFishSanitizeCalendarEvents(events).map(function (event) {
    var parts = hallFishCalendarDateParts(event && event.date);
    if (!parts || parts.year !== year || parts.month !== monthIndex + 1) return null;
    var date = hallFishCalendarEventDate(event);
    if (!date) return null;
    return Object.assign({}, event, {
      nextDate: date,
      daysLeft: Math.round((date - today) / 86400000),
    });
  }).filter(Boolean).sort(function (a, b) {
    return a.nextDate - b.nextDate || String(a.title || "").localeCompare(String(b.title || ""), "ru");
  });
}

function hallFishUpcomingBirthdays(rows) {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  return hallFishBirthdayRows(rows).map(function (row) {
    var next = hallFishBirthdayDateForYear(row, today.getFullYear());
    if (!next) return null;
    if (next < today) next = hallFishBirthdayDateForYear(row, today.getFullYear() + 1);
    if (!next) return null;
    return Object.assign({}, row, {
      nextDate: next,
      daysLeft: Math.round((next - today) / 86400000),
    });
  }).filter(Boolean).sort(function (a, b) {
    return a.daysLeft - b.daysLeft || String(a.nick || "").localeCompare(String(b.nick || ""), "ru");
  });
}

function hallFishRenderBirthdays(rows, calendarEvents) {
  var birthdays = hallFishBirthdayRows(rows);
  var events = hallFishSanitizeCalendarEvents(calendarEvents);
  if (!birthdays.length && !events.length) return '<div class="hall-fish-modal__notice">Пока нет событий в клубном календаре.</div>';
  var canManage = hallFishCanManageCalendarEvents();
  var now = new Date();
  var viewDate = new Date(now.getFullYear(), now.getMonth() + hallFishCalendarMonthOffset, 1);
  var year = viewDate.getFullYear();
  var month = viewDate.getMonth();
  var monthRowsByDay = {};
  var monthEventsByDay = {};
  birthdays.forEach(function (row) {
    if (Number(row.month) !== month + 1) return;
    if (!monthRowsByDay[row.day]) monthRowsByDay[row.day] = [];
    monthRowsByDay[row.day].push(row);
  });
  events.forEach(function (event) {
    var parts = hallFishCalendarDateParts(event.date);
    if (!parts || parts.year !== year || parts.month !== month + 1) return;
    if (!monthEventsByDay[parts.day]) monthEventsByDay[parts.day] = [];
    monthEventsByDay[parts.day].push(event);
  });
  Object.keys(monthRowsByDay).forEach(function (day) {
    monthRowsByDay[day].sort(function (a, b) { return String(a.nick || "").localeCompare(String(b.nick || ""), "ru"); });
  });
  Object.keys(monthEventsByDay).forEach(function (day) {
    monthEventsByDay[day].sort(function (a, b) { return String(a.title || "").localeCompare(String(b.title || ""), "ru"); });
  });
  var first = new Date(year, month, 1);
  var daysInMonth = new Date(year, month + 1, 0).getDate();
  var offset = (first.getDay() + 6) % 7;
  var cells = [];
  for (var empty = 0; empty < offset; empty += 1) cells.push('<span class="hall-fish-birthday-calendar__cell hall-fish-birthday-calendar__cell--empty"></span>');
  for (var day = 1; day <= daysInMonth; day += 1) {
    var marked = monthRowsByDay[day] || [];
    var dayEvents = monthEventsByDay[day] || [];
    var isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
    var dateKey = hallFishCalendarDateKey(year, month, day);
    var cellDate = new Date(year, month, day);
    cellDate.setHours(0, 0, 0, 0);
    var detailRows = marked.map(function (row) {
      var ageText = hallFishBirthdayAgeText(row, cellDate, now);
      return {
        kind: "birthday",
        title: row.nick || "Игрок",
        meta: "День рождения" + (ageText ? " · " + ageText : ""),
      };
    }).concat(dayEvents.map(function (event) {
      return {
        kind: "event",
        title: event.title,
        meta: "Праздник клуба",
        note: event.note || "",
      };
    }));
    var isClickable = canManage || detailRows.length;
    var tag = isClickable ? "button" : "span";
    var attrs = isClickable
      ? ' type="button" data-hall-fish-calendar-date="' + hallFishEsc(dateKey) + '" data-hall-fish-calendar-details="' + hallFishEsc(hallFishEncodeData(detailRows)) + '" aria-label="' + hallFishEsc(detailRows.length ? "Открыть события на " + day + " число" : "Добавить событие на " + day + " число") + '"'
      : "";
    cells.push(
      '<' + tag + attrs + ' class="hall-fish-birthday-calendar__cell' + (marked.length ? " hall-fish-birthday-calendar__cell--marked" : "") + (dayEvents.length ? " hall-fish-birthday-calendar__cell--event" : "") + (isToday ? " hall-fish-birthday-calendar__cell--today" : "") + (isClickable ? " hall-fish-birthday-calendar__cell--editable" : "") + '">' +
        '<span class="hall-fish-birthday-calendar__day">' + hallFishEsc(day) + '</span>' +
        (isToday ? '<span class="hall-fish-birthday-calendar__today-label">Сегодня</span>' : "") +
        (marked.length ? '<span class="hall-fish-birthday-calendar__names">' + marked.slice(0, 3).map(function (row) { return hallFishEsc(row.nick); }).join("<br>") + (marked.length > 3 ? "<br>+" + hallFishEsc(marked.length - 3) : "") + '</span>' : "") +
        (dayEvents.length ? '<span class="hall-fish-birthday-calendar__events">' + dayEvents.slice(0, 2).map(function (event) { return hallFishEsc(event.title); }).join("<br>") + (dayEvents.length > 2 ? "<br>+" + hallFishEsc(dayEvents.length - 2) : "") + '</span>' : "") +
      '</' + tag + '>'
    );
  }
  var upcomingAll = hallFishUpcomingBirthdays(rows).map(function (row) {
    return Object.assign({ kind: "birthday", title: row.nick || "Игрок" }, row);
  }).concat(hallFishUpcomingCalendarEvents(events).map(function (event) {
    return Object.assign({ kind: "event" }, event);
  })).sort(function (a, b) {
    return a.daysLeft - b.daysLeft || String(a.title || a.nick || "").localeCompare(String(b.title || b.nick || ""), "ru");
  });
  var yearEnd = new Date(year, 11, 31);
  yearEnd.setHours(23, 59, 59, 999);
  var filteredUpcoming = hallFishUpcomingFilter === "club"
    ? hallFishCalendarYearEvents(events, year).map(function (event) { return Object.assign({ kind: "event" }, event); })
    : upcomingAll.filter(function (row) {
    if (hallFishUpcomingFilter === "birthdays") return row.kind === "birthday";
    return true;
  });
  var upcomingUntilYearEnd = filteredUpcoming.filter(function (row) {
    return row.nextDate && row.nextDate <= yearEnd;
  });
  var canShowMore = upcomingUntilYearEnd.length > 10;
  var upcoming = hallFishUpcomingExpanded ? upcomingUntilYearEnd : filteredUpcoming.slice(0, 10);
  var upcomingTabs = [
    { key: "all", label: "Все ближайшие события" },
    { key: "birthdays", label: "Дни рождения" },
    { key: "club", label: "Праздники клуба" },
  ];
  var upcomingHtml = upcoming.length
    ? upcoming.map(function (row) {
        var label = hallFishCalendarRelativeLabel(Number(row.daysLeft) || 0);
        if (row.kind === "event") {
          var detailRows = [{ kind: "event", title: row.title, meta: "Праздник клуба", note: row.note || "" }];
          return '<button type="button" class="hall-fish-birthday-next__row hall-fish-birthday-next__row--event" data-hall-fish-calendar-date="' + hallFishEsc(row.date) + '" data-hall-fish-calendar-details="' + hallFishEsc(hallFishEncodeData(detailRows)) + '" aria-label="' + hallFishEsc("Открыть событие " + row.title) + '">' +
            '<strong>' + hallFishEsc(row.title) + '</strong>' +
            '<span>' + hallFishEsc(row.nextDate.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })) + ' · ' + hallFishEsc(label) + '</span>' +
          '</button>';
        }
        var userId = String(row.accountId || "").trim();
        var name = row.nick || "Игрок";
        var ageText = hallFishBirthdayAgeText(row, row.nextDate, now);
        var attrs = userId
          ? ' data-user-id="' + hallFishEsc(userId) + '" data-user-name="' + hallFishEsc(name) + '" data-user-level=""'
          : ' disabled aria-disabled="true"';
        return '<button type="button" class="hall-fish-birthday-next__row"' + attrs + ' aria-label="' + hallFishEsc("Открыть профиль " + name) + '">' +
          '<span class="hall-fish-birthday-next__main">' +
            '<strong>' + hallFishEsc(row.nick) + '</strong>' +
            '<span>' + hallFishEsc(hallFishFormatBirthdayDate(row, row.nextDate.getFullYear())) + ' · ' + hallFishEsc(label) + '</span>' +
          '</span>' +
          (ageText ? '<span class="hall-fish-birthday-next__age">' + hallFishEsc(ageText) + '</span>' : '') +
        '</button>';
      }).join("")
    : '<div class="hall-fish-modal__notice hall-fish-modal__notice--compact">' + (hallFishUpcomingFilter === "club" ? "Ближайших праздников клуба нет." : "Ближайших событий нет.") + '</div>';
  var upcomingMoreHtml = canShowMore
    ? '<button type="button" class="hall-fish-birthday-next__more" data-hall-fish-upcoming-more aria-expanded="' + (hallFishUpcomingExpanded ? "true" : "false") + '">' + (hallFishUpcomingExpanded ? "Свернуть" : "Еще") + '</button>'
    : "";
  return '<div class="hall-fish-birthdays">' +
    '<div class="hall-fish-birthday-calendar">' +
      '<div class="hall-fish-birthday-calendar__head">' +
        '<button type="button" class="hall-fish-birthday-calendar__nav" data-hall-fish-calendar-month="-1" aria-label="Предыдущий месяц">‹</button>' +
        '<div class="hall-fish-birthday-calendar__title">' + hallFishEsc(viewDate.toLocaleDateString("ru-RU", { month: "long", year: "numeric" })) + '</div>' +
        '<button type="button" class="hall-fish-birthday-calendar__nav" data-hall-fish-calendar-month="1" aria-label="Следующий месяц">›</button>' +
      '</div>' +
      '<div class="hall-fish-birthday-calendar__weekdays"><span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span></div>' +
      '<div class="hall-fish-birthday-calendar__grid">' + cells.join("") + '</div>' +
    '</div>' +
    '<section class="hall-fish-birthday-next">' +
      '<h4 class="hall-fish-achievement-section__title">Ближайшие события</h4>' +
      '<div class="hall-fish-birthday-next__tabs" role="tablist" aria-label="Фильтр ближайших событий">' +
        upcomingTabs.map(function (tab) {
          var active = hallFishUpcomingFilter === tab.key;
          return '<button type="button" class="hall-fish-birthday-next__tab' + (active ? " hall-fish-birthday-next__tab--active" : "") + '" data-hall-fish-upcoming-filter="' + hallFishEsc(tab.key) + '" role="tab" aria-selected="' + (active ? "true" : "false") + '">' + hallFishEsc(tab.label) + '</button>';
        }).join("") +
      '</div>' +
      upcomingHtml +
      upcomingMoreHtml +
    '</section>' +
  '</div>';
}

function hallFishClearProfileLoadingRows() {
  if (hallFishProfileLoadingObserver) {
    try {
      hallFishProfileLoadingObserver.disconnect();
    } catch (eHallFishDisconnect) {}
    hallFishProfileLoadingObserver = null;
  }
  document.querySelectorAll(".hall-fish-level-row--loading,.hall-fish-birthday-next__row--loading").forEach(function (row) {
    row.classList.remove("hall-fish-level-row--loading");
    row.classList.remove("hall-fish-birthday-next__row--loading");
    row.removeAttribute("aria-busy");
    row.disabled = false;
    var level = row.querySelector(".hall-fish-level-row__level");
    if (level && level.dataset.originalText) {
      level.textContent = level.dataset.originalText;
      delete level.dataset.originalText;
    }
  });
}

function hallFishSetProfileRowLoading(row) {
  if (!row) return;
  hallFishClearProfileLoadingRows();
  var level = row.querySelector(".hall-fish-level-row__level");
  if (level && !level.dataset.originalText) level.dataset.originalText = level.textContent || "";
  if (level) level.textContent = "Загрузка...";
  row.classList.add("hall-fish-level-row--loading");
  if (row.classList && row.classList.contains("hall-fish-birthday-next__row")) row.classList.add("hall-fish-birthday-next__row--loading");
  row.setAttribute("aria-busy", "true");
  row.disabled = true;
}

function hallFishLevelFromRow(row) {
  if (!row) return "";
  var attr = String(row.getAttribute("data-user-level") || "").trim();
  if (attr) return attr;
  var level = row.querySelector(".hall-fish-level-row__level");
  var text = String((level && (level.dataset.originalText || level.textContent)) || "").trim();
  var match = text.match(/\d+/);
  return match && match[0] ? match[0] : "";
}

function hallFishClearLoadingWhenProfileOpens() {
  var modal = document.getElementById("chatUserModal");
  function isOpen() {
    return !!(modal && modal.classList.contains("chat-user-modal--open"));
  }
  if (isOpen()) {
    hallFishClearProfileLoadingRows();
    return;
  }
  if (modal && typeof MutationObserver !== "undefined") {
    hallFishProfileLoadingObserver = new MutationObserver(function () {
      if (isOpen()) hallFishClearProfileLoadingRows();
    });
    hallFishProfileLoadingObserver.observe(modal, { attributes: true, attributeFilter: ["class", "aria-hidden"] });
  }
}

function hallFishAchievementDetailTitleHtml(title) {
  var text = String(title || "").trim();
  var match = text.match(/^([\d\s]+₽)(\s*·\s*.+)?$/);
  if (!match) return hallFishEsc(text || "Запись");
  return '<span class="hall-fish-achievement-detail__amount">' + hallFishEsc(match[1]) + '</span>' +
    (match[2] ? hallFishEsc(match[2]) : "");
}

function hallFishStatusFishLevel(level) {
  if (typeof pokerProfileStatusFishLevel === "function") return pokerProfileStatusFishLevel(level);
  var n = parseInt(level, 10);
  if (!isFinite(n) || n < 1) n = 1;
  return Math.min(100, n);
}

function hallFishStatusFishSrc(level) {
  if (typeof pokerProfileStatusFishSrc === "function") return pokerProfileStatusFishSrc(level);
  var fishLevel = hallFishStatusFishLevel(level);
  return "./assets/profile-status-fish-level-" + (fishLevel < 10 ? "0" : "") + fishLevel + ".png";
}

function hallFishEnsureProfileModal() {
  if (typeof window.openChatUserModalById === "function") return true;
  if (typeof initChatUserModals !== "function") return false;
  initChatUserModals({
    base: hallFishGetApiBase(),
    tg: window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null,
  });
  return typeof window.openChatUserModalById === "function";
}

function hallFishEnsureProfileModalReady() {
  if (hallFishEnsureProfileModal()) return Promise.resolve(true);
  if (typeof window.pokerEnsureScriptDomains !== "function") return Promise.resolve(false);
  return Promise.resolve(window.pokerEnsureScriptDomains(["chat"]))
    .then(function () { return hallFishEnsureProfileModal(); })
    .catch(function () { return hallFishEnsureProfileModal(); });
}

function hallFishPrefetchProfile(userId) {
  var id = String(userId || "").trim();
  if (!id || hallFishPrefetchedProfiles[id]) return;
  var base = hallFishGetApiBase();
  if (!base || typeof fetch !== "function") return;
  if (typeof pokerApiAuthQuery !== "function") return;
  hallFishPrefetchedProfiles[id] = true;
  hallFishFetch(base + "/api/users?userId=" + encodeURIComponent(id) + pokerApiAuthQuery("&"), { cache: "default" })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      try {
        if (data && data.ok && typeof sessionStorage !== "undefined") {
          sessionStorage.setItem("poker_chat_user_profile_v2:" + encodeURIComponent(id), JSON.stringify({ ts: Date.now(), data: data }));
        }
      } catch (eProfilePrefetchCache) {}
    })
    .catch(function () {});
}

function hallFishPrefetchTopProfiles(rows) {
  if (!Array.isArray(rows) || !rows.length) return;
  rows.slice(0, 4).forEach(function (row, index) {
    setTimeout(function () {
      hallFishPrefetchProfile(row && row.accountId);
    }, 350 + index * 180);
  });
}

function hallFishSetModalState(message, rows, currentIds) {
  var modal = hallFishEnsureModal();
  var subtitle = document.getElementById("hallFishRatingSubtitle");
  var myRank = document.getElementById("hallFishRatingMyRank");
  var body = document.getElementById("hallFishRatingBody");
  hallFishSetSubtitle(subtitle);
  hallFishUpdateTabs("levels");
  if (myRank) {
    myRank.hidden = false;
    myRank.textContent = rows ? hallFishMyRankText(rows, currentIds) : "Ваш рейтинг —/—";
  }
  if (body) body.innerHTML = rows ? hallFishRenderRows(rows, currentIds) : hallFishRenderLevelSkeleton();
  if (rows) hallFishPrefetchTopProfiles(rows);
  modal.hidden = false;
  if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
}

function hallFishSetAchievementState(message, data) {
  var modal = hallFishEnsureModal();
  var subtitle = document.getElementById("hallFishRatingSubtitle");
  var myRank = document.getElementById("hallFishRatingMyRank");
  var body = document.getElementById("hallFishRatingBody");
  hallFishSetSubtitle(subtitle);
  hallFishUpdateTabs("achievements");
  if (myRank) myRank.hidden = true;
  if (body) body.innerHTML = data ? hallFishRenderAchievementRows(data) : hallFishRenderAchievementSkeleton();
  modal.hidden = false;
  if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
}

function hallFishSetBirthdaysState(message, rows, events) {
  var modal = hallFishEnsureModal();
  var subtitle = document.getElementById("hallFishRatingSubtitle");
  var myRank = document.getElementById("hallFishRatingMyRank");
  var body = document.getElementById("hallFishRatingBody");
  hallFishSetSubtitle(subtitle);
  hallFishUpdateTabs("birthdays");
  if (myRank) myRank.hidden = true;
  if (body) body.innerHTML = rows ? hallFishRenderBirthdays(rows, events || hallFishCalendarEventsCache || []) : hallFishRenderBirthdaysSkeleton();
  modal.hidden = false;
  if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
}

function hallFishMoveCalendarMonth(delta) {
  var d = parseInt(delta, 10);
  if (!d) return;
  hallFishCalendarMonthOffset += d;
  hallFishSetBirthdaysState("", hallFishBirthdayRowsCache || hallFishReadBirthdaysSessionCache() || [], hallFishCalendarEventsCache || hallFishReadCalendarEventsLocal());
}

function hallFishSetUpcomingFilter(filter) {
  var next = String(filter || "all").trim();
  var body = document.getElementById("hallFishRatingBody");
  var anchor = body ? body.querySelector(".hall-fish-birthday-next") : null;
  var anchorViewportOffset = anchor && body ? anchor.offsetTop - body.scrollTop : null;
  hallFishUpcomingFilter = next === "birthdays" || next === "club" ? next : "all";
  hallFishUpcomingExpanded = false;
  hallFishSetBirthdaysState("", hallFishBirthdayRowsCache || hallFishReadBirthdaysSessionCache() || [], hallFishCalendarEventsCache || hallFishReadCalendarEventsLocal());
  body = document.getElementById("hallFishRatingBody");
  anchor = body ? body.querySelector(".hall-fish-birthday-next") : null;
  if (body && anchor && anchorViewportOffset !== null) body.scrollTop = Math.max(0, anchor.offsetTop - anchorViewportOffset);
}

function hallFishToggleUpcomingExpanded() {
  var body = document.getElementById("hallFishRatingBody");
  var anchor = body ? body.querySelector(".hall-fish-birthday-next") : null;
  var anchorViewportOffset = anchor && body ? anchor.offsetTop - body.scrollTop : null;
  hallFishUpcomingExpanded = !hallFishUpcomingExpanded;
  hallFishSetBirthdaysState("", hallFishBirthdayRowsCache || hallFishReadBirthdaysSessionCache() || [], hallFishCalendarEventsCache || hallFishReadCalendarEventsLocal());
  body = document.getElementById("hallFishRatingBody");
  anchor = body ? body.querySelector(".hall-fish-birthday-next") : null;
  if (body && anchor && anchorViewportOffset !== null) body.scrollTop = Math.max(0, anchor.offsetTop - anchorViewportOffset);
}

function hallFishUpdateTabs(activeTab) {
  hallFishActiveTab = activeTab === "achievements" || activeTab === "birthdays" ? activeTab : "levels";
  var modal = hallFishEnsureModal();
  var panel = modal ? modal.querySelector(".hall-fish-modal__panel") : null;
  if (panel) {
    panel.classList.toggle("hall-fish-modal__panel--achievements", hallFishActiveTab === "achievements");
    panel.classList.toggle("hall-fish-modal__panel--birthdays", hallFishActiveTab === "birthdays");
    panel.classList.toggle("hall-fish-modal__panel--levels", hallFishActiveTab === "levels");
  }
  document.querySelectorAll("[data-hall-fish-tab]").forEach(function (tab) {
    var isActive = tab.getAttribute("data-hall-fish-tab") === hallFishActiveTab;
    tab.classList.toggle("hall-fish-modal__tab--active", isActive);
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
  });
}

function hallFishCloseModal() {
  hallFishClearProfileLoadingRows();
  var modal = document.getElementById("hallFishRatingModal");
  if (modal) modal.hidden = true;
  if (document.body) document.body.classList.remove("player-crm-dialog-modal-open");
}

function hallFishLoadRows() {
  if (hallFishRatingRowsCache) return Promise.resolve(hallFishRatingRowsCache);
  var cachedRows = hallFishReadRowsSessionCache();
  if (cachedRows) {
    hallFishRatingRowsCache = cachedRows;
    hallFishFetchRows()
      .then(function (freshRows) {
        hallFishRefreshVisibleRows(freshRows);
      })
      .catch(function () {});
    return Promise.resolve(cachedRows);
  }
  return hallFishFetchRows();
}

function hallFishLoadBirthdayRows() {
  if (hallFishBirthdayRowsCache) return Promise.resolve(hallFishBirthdayRowsCache);
  if (hallFishBirthdayRowsPromise) return hallFishBirthdayRowsPromise;
  var cachedRows = hallFishReadBirthdaysSessionCache();
  if (cachedRows) {
    hallFishBirthdayRowsCache = cachedRows;
    return Promise.resolve(cachedRows);
  }
  var base = hallFishGetApiBase();
  if (!base) return hallFishLoadRows();
  hallFishBirthdayRowsPromise = hallFishFetch(base + "/api/player-crm?publicBirthdays=1", { cache: "default" })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (!data || !data.ok || !Array.isArray(data.birthdayRows)) throw new Error((data && data.error) || "bad-response");
      hallFishBirthdayRowsCache = data.birthdayRows;
      hallFishWriteBirthdaysSessionCache(hallFishBirthdayRowsCache);
      return hallFishBirthdayRowsCache;
    })
    .catch(function () {
      return hallFishLoadRows();
    })
    .finally(function () {
      hallFishBirthdayRowsPromise = null;
    });
  return hallFishBirthdayRowsPromise;
}

function hallFishLoadCalendarEvents() {
  if (hallFishCalendarEventsCache) return Promise.resolve(hallFishCalendarEventsCache);
  if (hallFishCalendarEventsPromise) return hallFishCalendarEventsPromise;
  var base = hallFishGetApiBase();
  if (!base) {
    hallFishCalendarEventsCache = hallFishReadCalendarEventsLocal();
    return Promise.resolve(hallFishCalendarEventsCache);
  }
  hallFishCalendarEventsPromise = hallFishFetch(base + "/api/club-calendar-events?_t=" + Date.now(), { cache: "no-store" })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (!data || !data.ok || !Array.isArray(data.events)) throw new Error((data && data.error) || "bad-response");
      hallFishCalendarEventsCache = hallFishSanitizeCalendarEvents(data.events);
      hallFishWriteCalendarEventsLocal(hallFishCalendarEventsCache);
      return hallFishCalendarEventsCache;
    })
    .catch(function () {
      hallFishCalendarEventsCache = hallFishReadCalendarEventsLocal();
      return hallFishCalendarEventsCache;
    })
    .finally(function () {
      hallFishCalendarEventsPromise = null;
    });
  return hallFishCalendarEventsPromise;
}

function hallFishSaveCalendarEvents(events) {
  var sanitized = hallFishSanitizeCalendarEvents(events);
  var base = hallFishGetApiBase();
  hallFishCalendarEventsCache = sanitized;
  hallFishWriteCalendarEventsLocal(sanitized);
  if (!base || typeof pokerApiAuthJsonBody !== "function") return Promise.resolve(sanitized);
  return hallFishFetch(base + "/api/club-calendar-events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pokerApiAuthJsonBody({ events: sanitized })),
  }, 9000)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (!data || !data.ok || !Array.isArray(data.events)) throw new Error((data && data.error) || "bad-response");
      hallFishCalendarEventsCache = hallFishSanitizeCalendarEvents(data.events);
      hallFishWriteCalendarEventsLocal(hallFishCalendarEventsCache);
      return hallFishCalendarEventsCache;
    });
}

function hallFishLoadClubChoiceAchievementRows() {
  var base = hallFishGetApiBase();
  if (!base) return Promise.resolve([]);
  return hallFishFetch(base + "/api/club-choice-vote?mode=achievements", { cache: "default" })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      return data && data.ok && Array.isArray(data.rows) ? data.rows : [];
    })
    .catch(function () {
      return Array.isArray(window.POKER_CLUB_CHOICE_ACHIEVEMENTS) ? window.POKER_CLUB_CHOICE_ACHIEVEMENTS : [];
    });
}

function hallFishLoadReferralRows() {
  var base = hallFishGetApiBase();
  var hasCred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
  if (!base || !hasCred || typeof pokerApiAuthQuery !== "function") return Promise.resolve([]);
  return hallFishFetch(base + "/api/referrals" + pokerApiAuthQuery("?") + "&_t=" + Date.now(), { cache: "no-store" })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      return data && data.ok ? hallFishReferralsRows(data) : [];
    })
    .catch(function () { return []; });
}

function hallFishAchievementRatingDataReady() {
  return typeof WINTER_RATING_TOURNAMENTS_BY_DATE !== "undefined" &&
    typeof SPRING_RATING_TOURNAMENTS_BY_DATE !== "undefined" &&
    typeof SUMMER_RATING_TOURNAMENTS_BY_DATE !== "undefined";
}

function hallFishEnsureAchievementRatingData() {
  if (hallFishAchievementRatingDataReady()) return Promise.resolve(true);
  if (typeof window.pokerEnsureScriptDomains !== "function") return Promise.resolve(false);
  return Promise.resolve(window.pokerEnsureScriptDomains(["rating-winter", "rating-spring", "rating-summer"]))
    .then(function () { return hallFishAchievementRatingDataReady(); })
    .catch(function () { return hallFishAchievementRatingDataReady(); });
}

function hallFishEnsureLevelPlayerArtData() {
  if (typeof window.pokerGetSummerRatingPlayerArt === "function") return Promise.resolve(true);
  if (typeof window.pokerEnsureScriptDomains !== "function") return Promise.resolve(false);
  return Promise.resolve(window.pokerEnsureScriptDomains(["rating-summer"]))
    .then(function () { return typeof window.pokerGetSummerRatingPlayerArt === "function"; })
    .catch(function () { return typeof window.pokerGetSummerRatingPlayerArt === "function"; });
}

function hallFishLoadAchievementRows() {
  if (hallFishAchievementRowsCache && hallFishAchievementRatingDataReady()) return Promise.resolve(hallFishAchievementRowsCache);
  if (hallFishAchievementRowsCache && !hallFishAchievementRatingDataReady()) hallFishAchievementRowsCache = null;
  if (hallFishAchievementRowsPromise) return hallFishAchievementRowsPromise;
  hallFishAchievementRowsPromise = hallFishEnsureAchievementRatingData()
    .then(function () {
      if (hallFishAchievementRowsCache && hallFishAchievementRatingDataReady()) return hallFishAchievementRowsCache;
      return hallFishLoadRows()
        .catch(function () {
          return hallFishRatingRowsCache || hallFishReadRowsSessionCache() || [];
        })
        .then(function (levelRows) {
          var tournamentData = hallFishAggregateTournamentAchievements(levelRows);
          return Promise.all([hallFishLoadClubChoiceAchievementRows(), hallFishLoadReferralRows()])
            .then(function (parts) {
              hallFishAchievementRowsCache = Object.assign({}, tournamentData, {
                clubChoice: hallFishAggregateClubChoiceRows(parts[0], levelRows),
                referrals: parts[1],
              });
              return hallFishAchievementRowsCache;
            });
          });
    })
    .finally(function () {
      hallFishAchievementRowsPromise = null;
    });
  return hallFishAchievementRowsPromise;
}

function openHallFishAchievementTab() {
  hallFishSetAchievementState("Загрузка…");
  hallFishLoadAchievementRows()
    .then(function (data) {
      hallFishSetAchievementState("", data);
    })
    .catch(function () {
      var body = document.getElementById("hallFishRatingBody");
      var subtitle = document.getElementById("hallFishRatingSubtitle");
      var myRank = document.getElementById("hallFishRatingMyRank");
      hallFishSetSubtitle(subtitle);
      hallFishUpdateTabs("achievements");
      if (myRank) myRank.hidden = true;
      if (body) body.innerHTML = '<div class="hall-fish-modal__notice">Не удалось загрузить топы по ачивкам. Попробуйте ещё раз позже.</div>';
    });
}
window.openHallFishAchievementsModal = openHallFishAchievementTab;

function hallFishShareAchievementTop(key, text) {
  var url = hallFishAchievementShareUrl(key);
  if (!url) {
    hallFameCopyDone(false);
    return;
  }
  var intro = text || hallFishAchievementShareLabel(key, "ачивка");
  var shareUrl = typeof pokerBuildTelegramShareUrlDialog === "function" ? pokerBuildTelegramShareUrlDialog(url, intro) : "";
  if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
  pokerTryPwaWebShare({ title: intro, text: intro + "\n" + url, url: url }).then(function (pwaOk) {
    if (pwaOk) return;
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (shareUrl && tg && tg.openTelegramLink) tg.openTelegramLink(shareUrl);
    else if (shareUrl && tg && tg.openLink) tg.openLink(shareUrl);
    else if (shareUrl) window.open(shareUrl, "_blank", "noopener,noreferrer");
  });
}

function openHallFishBirthdaysTab() {
  hallFishSetBirthdaysState("Загрузка…");
  Promise.all([hallFishLoadBirthdayRows(), hallFishLoadCalendarEvents()])
    .then(function (parts) {
      hallFishSetBirthdaysState("", parts[0], parts[1]);
    })
    .catch(function () {
      var body = document.getElementById("hallFishRatingBody");
      var subtitle = document.getElementById("hallFishRatingSubtitle");
      var myRank = document.getElementById("hallFishRatingMyRank");
      hallFishSetSubtitle(subtitle);
      hallFishUpdateTabs("birthdays");
      if (myRank) myRank.hidden = true;
      if (body) body.innerHTML = '<div class="hall-fish-modal__notice">Не удалось загрузить дни рождения. Попробуйте ещё раз позже.</div>';
    });
}

function hallFishAddCalendarEvent(dateKey) {
  if (!hallFishCanManageCalendarEvents()) return;
  var parts = hallFishCalendarDateParts(dateKey);
  if (!parts) return;
  var label = (new Date(parts.year, parts.month - 1, parts.day)).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
  var title = "";
  try {
    title = window.prompt("Событие на " + label, "");
  } catch (ePrompt) {
    title = "";
  }
  title = String(title || "").replace(/\s+/g, " ").trim();
  if (!title) return;
  var events = hallFishSanitizeCalendarEvents(hallFishCalendarEventsCache || hallFishReadCalendarEventsLocal());
  events.push({
    id: dateKey + ":" + Date.now(),
    date: dateKey,
    title: title,
    createdAt: Date.now(),
  });
  hallFishCalendarEventsCache = hallFishSanitizeCalendarEvents(events);
  hallFishSetBirthdaysState("", hallFishBirthdayRowsCache || hallFishReadBirthdaysSessionCache() || [], hallFishCalendarEventsCache);
  hallFishSaveCalendarEvents(hallFishCalendarEventsCache)
    .then(function (savedEvents) {
      hallFishSetBirthdaysState("", hallFishBirthdayRowsCache || hallFishReadBirthdaysSessionCache() || [], savedEvents);
    })
    .catch(function () {
      hallFishSetBirthdaysState("", hallFishBirthdayRowsCache || hallFishReadBirthdaysSessionCache() || [], hallFishCalendarEventsCache);
      try {
        window.alert("Не удалось сохранить событие на сервере. Оно временно осталось на этом устройстве.");
      } catch (eAlert) {}
    });
}

function openHallFishRatingModal() {
  hallFishSetModalState("Загрузка…");
  Promise.all([
    hallFishEnsureLevelPlayerArtData().catch(function () { return false; }),
    hallFishLoadRows(),
    hallFishLoadCurrentIds().catch(function () { return hallFishReadLocalCurrentIds(); }),
  ])
    .then(function (result) {
      var rows = Array.isArray(result[1]) ? result[1] : [];
      hallFishSetModalState("", rows, Array.isArray(result[2]) ? result[2] : []);
    })
    .catch(function () {
      var body = document.getElementById("hallFishRatingBody");
      var subtitle = document.getElementById("hallFishRatingSubtitle");
      var myRank = document.getElementById("hallFishRatingMyRank");
      hallFishSetSubtitle(subtitle);
      hallFishUpdateTabs("levels");
      if (myRank) {
        myRank.hidden = false;
        myRank.textContent = "Ваш рейтинг —/—";
      }
      if (body) body.innerHTML = '<div class="hall-fish-modal__notice">Не удалось загрузить уровни. Попробуйте ещё раз позже.</div>';
    });
}
window.openHallFishRatingModal = openHallFishRatingModal;

function initHallFishRatingModal() {
  if (window.__pokerHallFishRatingBound) return;
  window.__pokerHallFishRatingBound = true;
  document.addEventListener("click", function (e) {
    var openBtn = e.target && e.target.closest ? e.target.closest("#headerPokerStatus,.header-greeting--status,[data-hall-fish-open]") : null;
    if (openBtn) {
      e.preventDefault();
      openHallFishRatingModal();
      return;
    }
  });
  document.addEventListener("click", function (e) {
    if (e.target && e.target.closest && e.target.closest("[data-hall-fish-close]")) hallFishCloseModal();
  });
  document.addEventListener("click", function (e) {
    var tab = e.target && e.target.closest ? e.target.closest("[data-hall-fish-tab]") : null;
    if (!tab) return;
    e.preventDefault();
    var tabKey = tab.getAttribute("data-hall-fish-tab");
    if (tabKey === "achievements") openHallFishAchievementTab();
    else if (tabKey === "birthdays") openHallFishBirthdaysTab();
    else openHallFishRatingModal();
  });
  document.addEventListener("pointerenter", function (e) {
    var row = e.target && e.target.closest ? e.target.closest(".hall-fish-level-row[data-user-id],.hall-fish-birthday-next__row[data-user-id]") : null;
    if (!row) return;
    if (row.classList && row.classList.contains("hall-fish-achievement-row")) return;
    hallFishPrefetchProfile(row.getAttribute("data-user-id"));
  }, true);
  document.addEventListener("touchstart", function (e) {
    var row = e.target && e.target.closest ? e.target.closest(".hall-fish-level-row[data-user-id],.hall-fish-birthday-next__row[data-user-id]") : null;
    if (!row) return;
    if (row.classList && row.classList.contains("hall-fish-achievement-row")) return;
    hallFishPrefetchProfile(row.getAttribute("data-user-id"));
  }, { passive: true });
  document.addEventListener("click", function (e) {
    var tab = e.target && e.target.closest ? e.target.closest("[data-hall-fish-achievement-tab]") : null;
    if (!tab) return;
    e.preventDefault();
    e.stopPropagation();
    hallFishActiveAchievementTab = String(tab.getAttribute("data-hall-fish-achievement-tab") || "big50").trim() || "big50";
    if (hallFishAchievementRowsCache) hallFishSetAchievementState("", hallFishAchievementRowsCache);
    else openHallFishAchievementTab();
  });
  document.addEventListener("click", function (e) {
    var shareBtn = e.target && e.target.closest ? e.target.closest("[data-hall-fish-achievement-share][data-hall-fish-achievement-action]") : null;
    if (!shareBtn) return;
    e.preventDefault();
    e.stopPropagation();
    var key = String(shareBtn.getAttribute("data-hall-fish-achievement-share") || hallFishActiveAchievementTab || "big50").trim() || "big50";
    var action = shareBtn.getAttribute("data-hall-fish-achievement-action") || "copy";
    var text = shareBtn.getAttribute("data-hall-fish-achievement-text") || hallFishAchievementShareLabel(key, "ачивка");
    if (action === "share") {
      hallFishShareAchievementTop(key, text);
      return;
    }
    hallFameCopyUrlToClipboard(hallFishAchievementShareUrl(key));
  });
  document.addEventListener("click", function (e) {
    var filterBtn = e.target && e.target.closest ? e.target.closest("[data-hall-fish-upcoming-filter]") : null;
    if (!filterBtn) return;
    e.preventDefault();
    e.stopPropagation();
    hallFishSetUpcomingFilter(filterBtn.getAttribute("data-hall-fish-upcoming-filter"));
  });
  document.addEventListener("click", function (e) {
    var moreBtn = e.target && e.target.closest ? e.target.closest("[data-hall-fish-upcoming-more]") : null;
    if (!moreBtn) return;
    e.preventDefault();
    e.stopPropagation();
    hallFishToggleUpcomingExpanded();
  });
  document.addEventListener("click", function (e) {
    var monthBtn = e.target && e.target.closest ? e.target.closest("[data-hall-fish-calendar-month]") : null;
    if (!monthBtn) return;
    e.preventDefault();
    e.stopPropagation();
    hallFishMoveCalendarMonth(monthBtn.getAttribute("data-hall-fish-calendar-month"));
  });
  document.addEventListener("click", function (e) {
    var day = e.target && e.target.closest ? e.target.closest("[data-hall-fish-calendar-date]") : null;
    if (!day) return;
    e.preventDefault();
    e.stopPropagation();
    hallFishOpenCalendarDetail(day.getAttribute("data-hall-fish-calendar-date"), hallFishDecodeData(day.getAttribute("data-hall-fish-calendar-details")) || []);
  });
  document.addEventListener("click", function (e) {
    if (e.target && e.target.closest && e.target.closest("[data-hall-fish-calendar-detail-close]")) {
      e.preventDefault();
      hallFishCloseCalendarDetail();
    }
  });
  document.addEventListener("click", function (e) {
    var addBtn = e.target && e.target.closest ? e.target.closest("[data-hall-fish-calendar-add-date]") : null;
    if (!addBtn) return;
    e.preventDefault();
    e.stopPropagation();
    var dateKey = addBtn.getAttribute("data-hall-fish-calendar-add-date");
    hallFishCloseCalendarDetail();
    hallFishAddCalendarEvent(dateKey);
  });
  document.addEventListener("click", function (e) {
    var achievementRow = e.target && e.target.closest ? e.target.closest(".hall-fish-achievement-row[data-hall-fish-achievement-title]") : null;
    if (!achievementRow) return;
    e.preventDefault();
    e.stopPropagation();
    hallFishOpenAchievementDetail(achievementRow);
  });
  document.addEventListener("click", function (e) {
    if (e.target && e.target.closest && e.target.closest("[data-hall-fish-achievement-detail-close]")) {
      e.preventDefault();
      hallFishCloseAchievementDetail();
    }
  });
  document.addEventListener("click", function (e) {
    var row = e.target && e.target.closest ? e.target.closest(".hall-fish-level-row[data-user-id],.hall-fish-birthday-next__row[data-user-id]") : null;
    if (!row) return;
    if (row.classList && row.classList.contains("hall-fish-achievement-row")) return;
    var userId = String(row.getAttribute("data-user-id") || "").trim();
    if (!userId) return;
    var rowLevel = hallFishLevelFromRow(row);
    e.preventDefault();
    e.stopPropagation();
    hallFishSetProfileRowLoading(row);
    hallFishEnsureProfileModalReady().then(function (ready) {
      if (!ready || typeof window.openChatUserModalById !== "function") {
        hallFishClearProfileLoadingRows();
        return;
      }
      window.openChatUserModalById(userId, row.getAttribute("data-user-name") || "Игрок", null, {
        level: rowLevel,
        ratingNick: row.getAttribute("data-user-name") || "",
      });
      hallFishClearLoadingWhenProfileOpens();
    });
  });
  document.addEventListener("keydown", function (e) {
    var detailModal = document.getElementById("hallFishAchievementDetailModal");
    if (e.key === "Escape" && detailModal && !detailModal.hidden) {
      hallFishCloseAchievementDetail();
      return;
    }
    if (e.key === "Escape") hallFishCloseModal();
  });
}

window.pokerInitHallFishRatingModal = initHallFishRatingModal;
initHallFishRatingModal();

window.pokerPrefetchHallFishRatingData = function () {
  hallFishLoadRows().catch(function () {});
  hallFishLoadBirthdayRows().catch(function () {});
  hallFishLoadCalendarEvents().catch(function () {});
  hallFishLoadCurrentIds().catch(function () {});
};

function syncInitialHallFameSectionFromStartParam() {
  var startParam = "";
  try {
    var qs = new URLSearchParams(typeof location !== "undefined" && location.search ? location.search : "");
    startParam =
      typeof pokerStartAppQueryFromUrlSearchParams === "function"
        ? pokerStartAppQueryFromUrlSearchParams(qs)
        : qs.get("startapp") || "";
    if (typeof pokerNormalizeWebAppStartParam === "function") startParam = pokerNormalizeWebAppStartParam(startParam);
  } catch (eHallStartParam) {}
  var section = resolveHallFameSectionFromStartParam(startParam) || window.__pendingHallFameSection || "";
  var achievementKey = hallFishAchievementKeyFromStartParam(startParam) || String(window.__pendingHallFishAchievementTab || "").trim();
  if (achievementKey) hallFishActiveAchievementTab = achievementKey;
  if (!section) return;
  var view = document.getElementById("hallOfFameView");
  if (!view || !view.classList.contains("view--active")) return;
  if (section === "achievements") {
    openHallFishAchievementTab();
    return;
  }
  var activePanel = view.querySelector(".hall-of-fame__panel--active[data-hall-panel]");
  if (activePanel && activePanel.getAttribute("data-hall-panel") === section) return;
  showHallOfFamePanel(section);
}

setTimeout(syncInitialHallFameSectionFromStartParam, 0);
setTimeout(syncInitialHallFameSectionFromStartParam, 640);

window.navigateToHallFameSection = navigateToHallFameSection;
window.getHallFameSectionShareUrl = getHallFameSectionShareUrl;
