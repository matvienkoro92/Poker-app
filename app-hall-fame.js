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
  setHallOfFameSubtabActive(section);
  if (section === "top2026") {
    try {
      if (typeof window.pokerInitWinterRatingWeekTops === "function") window.pokerInitWinterRatingWeekTops();
      if (typeof window.updateWinterRatingWeekTopPreviews === "function") window.updateWinterRatingWeekTopPreviews();
    } catch (eTop2026Init) {}
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

window.showHallOfFamePanel = showHallOfFamePanel;
window.openHallOfFameSectionModal = showHallOfFamePanel;

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
  if (p === "blog_top15" || p === "hall_top15" || p === "hall_fame_top2026") return "top2026";
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
    if (typeof showHallOfFamePanel === "function") showHallOfFamePanel(section || "legends");
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
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(url)
      .then(function () {
        hallFameCopyDone(true);
      })
      .catch(function () {
        hallFameCopyDone(false);
      });
  } else {
    try {
      var ta = document.createElement("textarea");
      ta.value = url;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      hallFameCopyDone(true);
    } catch (e) {
      hallFameCopyDone(false);
    }
  }
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
        '<div><h3 class="hall-fish-modal__title" id="hallFishRatingTitle">Игроки по уровню</h3><span class="hall-fish-modal__subtitle" id="hallFishRatingSubtitle">—</span></div>' +
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
        return {
          accountId: String((row && row.accountId) || "").trim(),
          name: String((row && row.name) || "").trim(),
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
      return {
        accountId: accountId,
        name: String((reg && reg.name) || (row && row.nickname) || accountId || "").trim(),
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

function hallFishRenderRows(rows) {
  if (!rows.length) return '<div class="hall-fish-modal__notice">Пока нет игроков с уровнем.</div>';
  return '<div class="hall-fish-level-list">' + rows.map(function (row, idx) {
    var userId = String(row.accountId || "").trim();
    var name = row.name || row.telegram || "Игрок";
    return '<button type="button" class="hall-fish-level-row" data-user-id="' + hallFishEsc(userId) + '" data-user-name="' + hallFishEsc(name) + '" aria-label="Открыть профиль ' + hallFishEsc(name) + '">' +
      '<span class="hall-fish-level-row__rank">' + hallFishEsc(idx + 1) + '</span>' +
      '<span><span class="hall-fish-level-row__name">' + hallFishEsc(row.name || "—") + '</span>' +
      '<span class="hall-fish-level-row__tg">' + hallFishEsc(row.telegram || "без TG") + '</span></span>' +
      '<span class="hall-fish-level-row__level">' + hallFishEsc(row.level) + ' ур.</span>' +
      '<img class="hall-fish-level-row__fish" src="' + hallFishEsc(hallFishStatusFishSrc(row.level)) + '" alt="" aria-hidden="true" loading="lazy" decoding="async" data-status-fish-level="' + hallFishEsc(hallFishStatusFishLevel(row.level)) + '" />' +
    '</button>';
  }).join("") + '</div>';
}

function hallFishStatusFishLevel(level) {
  if (typeof pokerProfileStatusFishLevel === "function") return pokerProfileStatusFishLevel(level);
  var n = parseInt(level, 10);
  if (!isFinite(n) || n < 1) n = 1;
  return Math.min(55, n);
}

function hallFishStatusFishSrc(level) {
  if (typeof pokerProfileStatusFishSrc === "function") return pokerProfileStatusFishSrc(level);
  var fishLevel = hallFishStatusFishLevel(level);
  return "./assets/profile-status-fish-level-" + (fishLevel < 10 ? "0" : "") + fishLevel + ".png";
}

function hallFishSetModalState(message, rows) {
  var modal = hallFishEnsureModal();
  var subtitle = document.getElementById("hallFishRatingSubtitle");
  var body = document.getElementById("hallFishRatingBody");
  if (subtitle) subtitle.textContent = "Чтобы попасть в рейтинг уровней, привяжите профиль из Покер21 в графе «Профиль».";
  if (body) body.innerHTML = rows ? hallFishRenderRows(rows) : '<div class="hall-fish-modal__notice">' + hallFishEsc(message || "Загрузка…") + '</div>';
  modal.hidden = false;
  if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
}

function hallFishCloseModal() {
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
  hallFishLoadRows()
    .then(function (rows) {
      hallFishSetModalState("", rows);
    })
    .catch(function () {
      var body = document.getElementById("hallFishRatingBody");
      var subtitle = document.getElementById("hallFishRatingSubtitle");
      if (subtitle) subtitle.textContent = "Чтобы попасть в рейтинг уровней, привяжите профиль из Покер21 в графе «Профиль».";
      if (body) body.innerHTML = '<div class="hall-fish-modal__notice">Не удалось загрузить уровни. Попробуйте ещё раз позже.</div>';
    });
}

function initHallFishRatingModal() {
  if (window.__pokerHallFishRatingBound) return;
  window.__pokerHallFishRatingBound = true;
  document.addEventListener("click", function (e) {
    var openBtn = e.target && e.target.closest ? e.target.closest("#hallFishRatingBtn") : null;
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
    if (!userId || typeof window.openChatUserModalById !== "function") return;
    e.preventDefault();
    hallFishCloseModal();
    window.openChatUserModalById(userId, row.getAttribute("data-user-name") || "Игрок", null);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") hallFishCloseModal();
  });
}

window.pokerInitHallFishRatingModal = initHallFishRatingModal;
initHallFishRatingModal();

window.navigateToHallFameSection = navigateToHallFameSection;
window.getHallFameSectionShareUrl = getHallFameSectionShareUrl;
