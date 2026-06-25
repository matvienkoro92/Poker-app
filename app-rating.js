// Spring seasonal data is eager but physically chunked; winter runtime and tables stay in lazy domain rating-winter.

function isSpringRatingMode() {
  return isSeasonalRatingMode();
}
function isActualSpringRatingMode() {
  return document.body && document.body.getAttribute("data-view") === "spring-rating";
}
function isSummerRatingMode() {
  return document.body && document.body.getAttribute("data-view") === "summer-rating";
}
function isSeasonalRatingMode() {
  var viewName = document.body && document.body.getAttribute("data-view");
  return viewName === "spring-rating" || viewName === "summer-rating";
}
function getRatingSeasonConfig() {
  if (isSummerRatingMode() && typeof SUMMER_RATING_SEASON !== "undefined") return SUMMER_RATING_SEASON;
  if (typeof SPRING_RATING_SEASON !== "undefined") return SPRING_RATING_SEASON;
  return {
    key: "spring",
    view: "spring-rating",
    placeholderId: "springRatingSectionPlaceholder",
    scrollBtnId: "springRatingViewScrollBtn",
    sectionClass: "spring-rating",
    icon: "🌿",
    label: "Весна 2026",
    topLabel: "Топы весны",
    maxWinLabel: "за весну",
    top3WinsLabel: "за весну",
    loadingDataText: "Загружаем рейтинг",
    emptyDataText: "Данные с 1 марта",
    monthRegex: /\.(03|04|05)\.2026$/,
    monthToneRegex: /\.(03|04|05)\./,
    playerPrefix: "spring_rating_player_",
    datePrefix: "spring_rating_date_",
    leaguePrefix: "spring_rating_league_",
    topLinkBase: typeof SPRING_TOP_LINK_BASE !== "undefined" ? SPRING_TOP_LINK_BASE : "",
  };
}
function getRatingSeasonMonthRegex() {
  var config = getRatingSeasonConfig();
  return config && config.monthRegex ? config.monthRegex : /\.(03|04|05)\.2026$/;
}
function getRatingSeasonMonthToneRegex() {
  var config = getRatingSeasonConfig();
  return config && config.monthToneRegex ? config.monthToneRegex : /\.(03|04|05)\./;
}
function getRatingSeasonStartAppPrefix(kind) {
  var config = getRatingSeasonConfig();
  if (kind === "date") return config.datePrefix || "spring_rating_date_";
  if (kind === "league") return config.leaguePrefix || "spring_rating_league_";
  if (kind === "player") return config.playerPrefix || "spring_rating_player_";
  return "";
}
function getRatingSeasonTopLinkBase() {
  var config = getRatingSeasonConfig();
  return config && config.topLinkBase ? config.topLinkBase : "";
}
/** Счётчик дней до финала весеннего рейтинга (31 мая, конец дня по локальному времени). */
function getRatingByDate() {
  if (isSpringRatingMode() && typeof pokerRatingBuildSpringRowsByDate === "function") {
    return pokerRatingBuildSpringRowsByDate();
  }
  return typeof pokerRatingGetWinterRowsByDate === "function"
    ? pokerRatingGetWinterRowsByDate()
    : typeof WINTER_RATING_BY_DATE !== "undefined"
      ? WINTER_RATING_BY_DATE
      : {};
}
function getRatingTournamentsByDate() {
  return typeof pokerRatingGetWinterTournamentsByDate === "function"
    ? pokerRatingGetWinterTournamentsByDate()
    : typeof WINTER_RATING_TOURNAMENTS_BY_DATE !== "undefined"
      ? WINTER_RATING_TOURNAMENTS_BY_DATE
      : {};
}
/** Сумма всех положительных призовых (все игроки, обе лиги) по списку дат DD.MM.YYYY */
/** Сводка март/апрель на экране рейтинга весны (перед «Таблица по датам»). На главной блок убран — элементы springRatingHomePromo* отсутствуют. */
/** Раскрывающиеся недели в блоке итогов на экране рейтинга весны (перед «Таблица по датам») */
/** Нижняя обводка welcome-блока: линия проходит по середине промо «Рейтинг турнирщиков» */
function pokerUpdateHomeWelcomeOutlineFrame() {
  try {
    if (!document.body || document.body.getAttribute("data-view") !== "home") return;
    var homeView = document.querySelector(".view--active[data-view=\"home\"]");
    var outline = homeView && homeView.querySelector(".home-welcome-outline");
    var header = outline && outline.querySelector(".spring-rating-home-promo-unified__header");
    if (!outline || !header) return;
    var oRect = outline.getBoundingClientRect();
    var hRect = header.getBoundingClientRect();
    if (!(oRect.height > 8) || !(hRect.height > 4)) return;
    var midY = hRect.top + hRect.height / 2;
    var hPx = midY - oRect.top;
    hPx = Math.max(56, Math.min(hPx, oRect.height - 4));
    outline.style.setProperty("--home-welcome-outline-frame-h", Math.round(hPx * 100) / 100 + "px");
    pokerEnsureHomeWelcomeOutlineFrameObserver(outline);
  } catch (e) {}
}
function pokerEnsureHomeWelcomeOutlineFrameObserver(outline) {
  try {
    if (!outline || outline._pokerWelcomeOutlineRo) return;
    if (typeof ResizeObserver === "undefined") return;
    outline._pokerWelcomeOutlineRo = new ResizeObserver(function () {
      if (typeof pokerUpdateHomeWelcomeOutlineFrame === "function") pokerUpdateHomeWelcomeOutlineFrame();
    });
    outline._pokerWelcomeOutlineRo.observe(outline);
    if (!window._pokerWelcomeOutlineResizeHook) {
      window._pokerWelcomeOutlineResizeHook = true;
      window.addEventListener("resize", function () {
        if (typeof pokerUpdateHomeWelcomeOutlineFrame === "function") pokerUpdateHomeWelcomeOutlineFrame();
      });
    }
  } catch (eRo) {}
}
function pokerScheduleHomeWelcomeOutlineFrameUpdates() {
  try {
    if (typeof pokerUpdateHomeWelcomeOutlineFrame !== "function") return;
    var raf = window.requestAnimationFrame || function (fn) { return setTimeout(fn, 16); };
    [0, 80, 180, 360, 700, 1200].forEach(function (ms) {
      setTimeout(function () {
        try {
          pokerUpdateHomeWelcomeOutlineFrame();
          raf(function () {
            try {
              pokerUpdateHomeWelcomeOutlineFrame();
            } catch (eRafHomeOutline) {}
          });
        } catch (eHomeOutlineTick) {}
      }, ms);
    });
  } catch (eHomeOutlineSchedule) {}
}
(function initHomeWelcomeOutlineFrameStartupSync() {
  try {
    pokerScheduleHomeWelcomeOutlineFrameUpdates();
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", pokerScheduleHomeWelcomeOutlineFrameUpdates, { once: true });
    } else {
      setTimeout(pokerScheduleHomeWelcomeOutlineFrameUpdates, 0);
    }
    window.addEventListener("load", pokerScheduleHomeWelcomeOutlineFrameUpdates, { once: true });
    if (document.fonts && document.fonts.ready && typeof document.fonts.ready.then === "function") {
      document.fonts.ready.then(pokerScheduleHomeWelcomeOutlineFrameUpdates).catch(function () {});
    }
    var heroImg = document.querySelector(".view[data-view=\"home\"] .hero__image");
    if (heroImg && !heroImg.complete) {
      heroImg.addEventListener("load", pokerScheduleHomeWelcomeOutlineFrameUpdates, { once: true });
      heroImg.addEventListener("error", pokerScheduleHomeWelcomeOutlineFrameUpdates, { once: true });
    }
  } catch (eHomeOutlineStartup) {}
})();
/** Топ-3 по сумме призовых за набор дат (неделя рейтинга весны) и общая сумма */
/** Топ-3 заносов за 1 турнир за набор дат */
/** Топ-3 по сумме призовых за прошлую неделю (март) и общая сумма за неделю */
/** Топ-3 занос за 1 турнир за прошлую неделю (март) — одни призовые на игрока, сортировка по убыванию */
/** Топ-3 по сумме призовых за текущую неделю (март) и общая сумма за неделю */
/** Топ-3 занос за 1 турнир за текущую неделю (март) */

/** Топ-3 по сумме призовых за следующую неделю (16–22 марта) и общая сумма за неделю */

/** Топ-3 занос за 1 турнир за следующую неделю (16–22 марта) */
function getRatingImages() {
  if (isSpringRatingMode() && typeof pokerRatingGetSpringImagesByLeague === "function") return pokerRatingGetSpringImagesByLeague(1);
  return typeof pokerRatingGetWinterImages === "function"
    ? pokerRatingGetWinterImages()
    : typeof WINTER_RATING_IMAGES !== "undefined"
      ? WINTER_RATING_IMAGES
      : {};
}




/** Форматирует сумму без копеек (округление до целого) */

/** Хпокер баллы: логика подсчёта баллов рейтинга. Баллы за места 1–8 только при ненулевой награде (reward > 0). Место → баллы: 1=135, 2=110, 3=90, 4=70, 5=60, 6=50, 7=40, 8=30. */
var XPOKER_BALLS = { 1: 135, 2: 110, 3: 90, 4: 70, 5: 60, 6: 50, 7: 40, 8: 30 };
/** Явные баллы в данных турнира (весна/ручная правка) перекрывают таблицу мест. */







window.openWinterRatingPlayerModalReady = openWinterRatingPlayerModalReady;




function openAutumnRating2025Modal() {
  var modal = document.getElementById("autumnRating2025Modal");
  if (!modal) return;
  initAutumnRating2025Modal();
  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("autumn-rating-2025-modal--open");
  document.body.style.overflow = "hidden";
}

function closeAutumnRating2025Modal() {
  var modal = document.getElementById("autumnRating2025Modal");
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  modal.classList.remove("autumn-rating-2025-modal--open");
  document.body.style.overflow = "";
}

function initAutumnRating2025Modal() {
  var modal = document.getElementById("autumnRating2025Modal");
  if (!modal || modal.getAttribute("data-inited") === "1") return;
  modal.setAttribute("data-inited", "1");
  var closeBtn = modal.querySelector(".autumn-rating-2025-modal__close");
  var backdrop = modal.querySelector(".autumn-rating-2025-modal__backdrop");
  if (closeBtn) closeBtn.addEventListener("click", closeAutumnRating2025Modal);
  if (backdrop) backdrop.addEventListener("click", closeAutumnRating2025Modal);
  document.addEventListener("keydown", function autumn2025Esc(e) {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeAutumnRating2025Modal();
  });
}

function openSpringRating2024Modal() {
  var modal = document.getElementById("springRating2024Modal");
  if (!modal) return;
  initSpringRating2024Modal();
  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("spring-rating-2024-modal--open");
  document.body.style.overflow = "hidden";
}

function closeSpringRating2024Modal() {
  var modal = document.getElementById("springRating2024Modal");
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  modal.classList.remove("spring-rating-2024-modal--open");
  document.body.style.overflow = "";
}

function initSpringRating2024Modal() {
  var modal = document.getElementById("springRating2024Modal");
  if (!modal || modal.getAttribute("data-inited") === "1") return;
  modal.setAttribute("data-inited", "1");
  var closeBtn = modal.querySelector(".spring-rating-2024-modal__close");
  var backdrop = modal.querySelector(".spring-rating-2024-modal__backdrop");
  if (closeBtn) closeBtn.addEventListener("click", closeSpringRating2024Modal);
  if (backdrop) backdrop.addEventListener("click", closeSpringRating2024Modal);
  document.addEventListener("keydown", function spring2024Esc(e) {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeSpringRating2024Modal();
  });
}

function openSummerRating2024Modal() {
  var modal = document.getElementById("summerRating2024Modal");
  if (!modal) return;
  initSummerRating2024Modal();
  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("summer-rating-2024-modal--open");
  document.body.style.overflow = "hidden";
}

function closeSummerRating2024Modal() {
  var modal = document.getElementById("summerRating2024Modal");
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  modal.classList.remove("summer-rating-2024-modal--open");
  document.body.style.overflow = "";
}

function initSummerRating2024Modal() {
  var modal = document.getElementById("summerRating2024Modal");
  if (!modal || modal.getAttribute("data-inited") === "1") return;
  modal.setAttribute("data-inited", "1");
  var closeBtn = modal.querySelector(".summer-rating-2024-modal__close");
  var backdrop = modal.querySelector(".summer-rating-2024-modal__backdrop");
  if (closeBtn) closeBtn.addEventListener("click", closeSummerRating2024Modal);
  if (backdrop) backdrop.addEventListener("click", closeSummerRating2024Modal);
  document.addEventListener("keydown", function summer2024Esc(e) {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeSummerRating2024Modal();
  });
}

function openSummerRating2025Modal() {
  var modal = document.getElementById("summerRating2025Modal");
  if (!modal) return;
  initSummerRating2025Modal();
  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("summer-rating-2025-modal--open");
  document.body.style.overflow = "hidden";
}

function closeSummerRating2025Modal() {
  var modal = document.getElementById("summerRating2025Modal");
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  modal.classList.remove("summer-rating-2025-modal--open");
  document.body.style.overflow = "";
}

function initSummerRating2025Modal() {
  var modal = document.getElementById("summerRating2025Modal");
  if (!modal || modal.getAttribute("data-inited") === "1") return;
  modal.setAttribute("data-inited", "1");
  var closeBtn = modal.querySelector(".summer-rating-2025-modal__close");
  var backdrop = modal.querySelector(".summer-rating-2025-modal__backdrop");
  if (closeBtn) closeBtn.addEventListener("click", closeSummerRating2025Modal);
  if (backdrop) backdrop.addEventListener("click", closeSummerRating2025Modal);
  document.addEventListener("keydown", function summer2025Esc(e) {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeSummerRating2025Modal();
  });
}














// Зал славы: клик по легенде открывает профиль игрока в рейтинге
(function () {
  document.addEventListener("click", function (e) {
    var link = e.target && e.target.closest ? e.target.closest(".hall-of-fame__legend-link") : null;
    if (!link || !link.dataset.nick) return;
    e.preventDefault();
    if (typeof window.pokerOpenTournamentRatingPlayer === "function") window.pokerOpenTournamentRatingPlayer(link.dataset.nick);
    else if (typeof openWinterRatingPlayerModalReady === "function") openWinterRatingPlayerModalReady(link.dataset.nick);
  });
})();

// Итоговая таблица рейтинга (декабрь, январь, февраль).
// Бонусы к итогу: Coo1er91 +55, Waaar +325 (ручные доп. очки). Доп. в итог (не по датам): Waaar +765 очков, +588225 призы; EM13!! +135 очков.



function fetchRaffleBadge() {
  var base = getApiBase();
  if (!base) return;
  var q = pokerRafflesApiQueryLeading();
  if (q === "?initData=" && !pokerCanSyncGuestProfileToServer()) return;
  fetch(base + "/api/raffles" + q + "&_t=" + Date.now())
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (data && data.ok) {
        var activeList = Array.isArray(data.activeRaffles)
          ? data.activeRaffles
          : (data.activeRaffle ? [data.activeRaffle] : []);
        updateRaffleBadge(activeList);
        if (typeof window !== "undefined") window._rafflesCache = { data: data, time: Date.now() };
      }
    })
    .catch(function () {});
}

/** Не показываем логин Telegram у админа Романа (@Roman1787443) в профиле и списках. */
function pokerHideRomanTelegramUsername(username) {
  if (username == null || username === "") return false;
  var u = String(username).replace(/^@+/, "").trim().toLowerCase();
  return u === "roman1787443";
}

function pokerShouldShowHomeTopVersionForSpecialUser() {
  var user =
    typeof getPokerResolvedTelegramUser === "function"
      ? getPokerResolvedTelegramUser()
      : tg && tg.initDataUnsafe && tg.initDataUnsafe.user;
  var username = user && user.username ? String(user.username).replace(/^@+/, "").trim().toLowerCase() : "";
  return username === "roman1787443";
}
