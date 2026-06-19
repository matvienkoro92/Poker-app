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

function resolveHallFameSectionFromStartParam(startParam) {
  if (!startParam) return null;
  var p = String(startParam).trim();
  /* Литералы: эта функция вызывается из раннего runGazetteAndTasksInit до присвоения HALL_FAME_SECTION_STARTAPP */
  if (p === "hall_fame" || p === "blog_top15" || p === "hall_top15" || p === "hall_fame_top2026") return "top2026";
  if (p === "hall_fame_legends") return "legends";
  if (p === "hall_fame_cups") return "cups";
  if (p === "hall_fame_photos") return "photos";
  if (p === "hall_fame_shame") return "shame";
  return null;
}

/**
 * Открыть зал славы на нужной вкладке (deep link + кнопки «Поделиться»).
 */
function navigateToHallFameSection(section) {
  if (typeof setView === "function") setView("hall-of-fame");
  setTimeout(function () {
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
var hallFishCurrentIdsCache = null;
var hallFishCurrentIdsPromise = null;
var hallFishProfileLoadingObserver = null;
var HALL_FISH_LINK_HINT = "Чтобы попасть в рейтинг уровней, привяжите профиль из Покер21 в графе «Профиль».";

function hallFishEsc(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function hallFishGetApiBase() {
  try {
    return typeof getApiBase === "function" ? getApiBase() : "";
  } catch (eBase) {
    return "";
  }
}

function hallFishEnsureModal() {
  var modal = document.getElementById("hallFishRatingModal");
  if (modal) return modal;
  modal = document.createElement("div");
  modal.className = "hall-fish-modal";
  modal.id = "hallFishRatingModal";
  modal.hidden = true;
  modal.innerHTML =
    '<div class="hall-fish-modal__backdrop" data-hall-fish-close></div>' +
    '<section class="hall-fish-modal__panel" role="dialog" aria-modal="true" aria-labelledby="hallFishRatingTitle">' +
      '<div class="hall-fish-modal__head">' +
        '<div><h3 class="hall-fish-modal__title" id="hallFishRatingTitle">Игроки по уровню</h3><span class="hall-fish-modal__subtitle" id="hallFishRatingSubtitle">—</span><span class="hall-fish-modal__my-rank" id="hallFishRatingMyRank">Ваш рейтинг —/—</span></div>' +
        '<button type="button" class="hall-fish-modal__close" data-hall-fish-close aria-label="Закрыть">×</button>' +
      '</div>' +
      '<div class="hall-fish-modal__body" id="hallFishRatingBody"></div>' +
    '</section>';
  document.body.appendChild(modal);
  return modal;
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
  hallFishCurrentIdsPromise = fetch(base + "/api/users" + q, { cache: "no-store" })
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

function hallFishMyRankText(rows, currentIds) {
  rows = Array.isArray(rows) ? rows : [];
  var total = rows.length;
  if (!total) return "Ваш рейтинг —/—";
  var rank = hallFishFindMyRank(rows, currentIds);
  return "Ваш рейтинг " + (rank ? String(rank) : "—") + "/" + String(total);
}

function hallFishRenderRows(rows) {
  if (!rows.length) return '<div class="hall-fish-modal__notice">Пока нет игроков с уровнем.</div>';
  return '<div class="hall-fish-level-list">' + rows.map(function (row, idx) {
    var userId = String(row.accountId || "").trim();
    var name = row.name || row.telegram || "Игрок";
    var sub = row.telegram ? String(row.telegram) : ((userId ? userId + " / " : "") + "без TG");
    return '<button type="button" class="hall-fish-level-row" data-user-id="' + hallFishEsc(userId) + '" data-user-name="' + hallFishEsc(name) + '" aria-label="Открыть профиль ' + hallFishEsc(name) + '">' +
      '<span class="hall-fish-level-row__rank">' + hallFishEsc(idx + 1) + '</span>' +
      '<span><span class="hall-fish-level-row__name">' + hallFishEsc(row.name || "—") + '</span>' +
      '<span class="hall-fish-level-row__tg">' + hallFishEsc(sub) + '</span></span>' +
      '<span class="hall-fish-level-row__level">' + hallFishEsc(row.level) + ' ур.</span>' +
    '</button>';
  }).join("") + '</div>';
}

function hallFishClearProfileLoadingRows() {
  if (hallFishProfileLoadingObserver) {
    try {
      hallFishProfileLoadingObserver.disconnect();
    } catch (eHallFishDisconnect) {}
    hallFishProfileLoadingObserver = null;
  }
  document.querySelectorAll(".hall-fish-level-row--loading").forEach(function (row) {
    row.classList.remove("hall-fish-level-row--loading");
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
  row.setAttribute("aria-busy", "true");
  row.disabled = true;
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

function hallFishSetModalState(message, rows, currentIds) {
  var modal = hallFishEnsureModal();
  var subtitle = document.getElementById("hallFishRatingSubtitle");
  var myRank = document.getElementById("hallFishRatingMyRank");
  var body = document.getElementById("hallFishRatingBody");
  hallFishSetSubtitle(subtitle);
  if (myRank) myRank.textContent = rows ? hallFishMyRankText(rows, currentIds) : "Ваш рейтинг —/—";
  if (body) body.innerHTML = rows ? hallFishRenderRows(rows) : '<div class="hall-fish-modal__notice">' + hallFishEsc(message || "Загрузка…") + '</div>';
  modal.hidden = false;
  if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
}

function hallFishCloseModal() {
  hallFishClearProfileLoadingRows();
  var modal = document.getElementById("hallFishRatingModal");
  if (modal) modal.hidden = true;
  if (document.body) document.body.classList.remove("player-crm-dialog-modal-open");
}

function hallFishLoadRows() {
  if (hallFishRatingRowsCache) return Promise.resolve(hallFishRatingRowsCache);
  var base = hallFishGetApiBase();
  if (!base) return Promise.reject(new Error("no-api-base"));
  var q = "?publicLevels=1";
  return fetch(base + "/api/player-crm" + q)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (!data || !data.ok) throw new Error((data && data.error) || "bad-response");
      hallFishRatingRowsCache = hallFishRowsFromCrmData(data);
      return hallFishRatingRowsCache;
    });
}

function openHallFishRatingModal() {
  hallFishSetModalState("Загрузка…");
  Promise.all([hallFishLoadRows(), hallFishLoadCurrentIds()])
    .then(function (result) {
      hallFishSetModalState("", result[0], result[1]);
    })
    .catch(function () {
      var body = document.getElementById("hallFishRatingBody");
      var subtitle = document.getElementById("hallFishRatingSubtitle");
      var myRank = document.getElementById("hallFishRatingMyRank");
      hallFishSetSubtitle(subtitle);
      if (myRank) myRank.textContent = "Ваш рейтинг —/—";
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
    var row = e.target && e.target.closest ? e.target.closest(".hall-fish-level-row[data-user-id]") : null;
    if (!row) return;
    var userId = String(row.getAttribute("data-user-id") || "").trim();
    if (!userId || !hallFishEnsureProfileModal()) return;
    e.preventDefault();
    e.stopPropagation();
    hallFishSetProfileRowLoading(row);
    window.openChatUserModalById(userId, row.getAttribute("data-user-name") || "Игрок", null);
    hallFishClearLoadingWhenProfileOpens();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") hallFishCloseModal();
  });
}

window.pokerInitHallFishRatingModal = initHallFishRatingModal;
initHallFishRatingModal();

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
  if (!section) return;
  var view = document.getElementById("hallOfFameView");
  if (!view || !view.classList.contains("view--active")) return;
  var activePanel = view.querySelector(".hall-of-fame__panel--active[data-hall-panel]");
  if (activePanel && activePanel.getAttribute("data-hall-panel") === section) return;
  showHallOfFamePanel(section);
}

setTimeout(syncInitialHallFameSectionFromStartParam, 0);
setTimeout(syncInitialHallFameSectionFromStartParam, 640);

window.navigateToHallFameSection = navigateToHallFameSection;
window.getHallFameSectionShareUrl = getHallFameSectionShareUrl;
