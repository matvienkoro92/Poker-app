// Рейтинг Турнирщиков зимы — 01.12 по конец февраля. Логика баллов: см. «Хпокер баллы» (XPOKER_BALLS / winterRatingPointsForPlace).
// Учитывать данные и с синих, и с красных скринов. Синий скрин («Игровые данные»): призовые в наших единицах = выигрыш из скрина × 100. Красный скрин: призовые так же (выигрыш × 100), места и игроки — как на скрине.
var WINTER_RATING_START = new Date(2025, 11, 1);  // 01.12.2025
var WINTER_RATING_END = new Date(2026, 1, 28);    // последний день февраля 2026

function getWinterRatingCounters() {
  var startMs, endMs;
  if (isSpringRatingMode()) {
    startMs = new Date(2026, 2, 1).getTime();
    endMs = new Date(2026, 4, 31).getTime();
  } else {
    startMs = WINTER_RATING_START.getTime();
    endMs = WINTER_RATING_END.getTime();
  }
  var oneDay = 24 * 3600 * 1000;
  var totalDays = Math.round((endMs - startMs) / oneDay) + 1;
  var today;
  try {
    var moscowDateStr = new Date().toLocaleString("en-CA", { timeZone: "Europe/Moscow" }).slice(0, 10);
    var parts = moscowDateStr.split("-");
    today = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  } catch (e) {
    today = new Date();
  }
  var todayMs = today.getTime();
  var daysPassed, daysLeft;
  if (todayMs < startMs) {
    daysPassed = 0;
    daysLeft = totalDays;
  } else if (todayMs > endMs) {
    daysPassed = totalDays;
    daysLeft = 0;
  } else {
    daysPassed = Math.round((todayMs - startMs) / oneDay) + 1;
    daysLeft = Math.round((endMs - todayMs) / oneDay);
  }
  return { daysPassed: daysPassed, daysLeft: daysLeft, totalDays: totalDays };
}
// Таблицы WINTER_RATING_BY_DATE / WINTER_RATING_IMAGES / WINTER_RATING_TOURNAMENTS_BY_DATE — в winter-rating-data.js (defer сразу после этого файла).

function isSpringRatingMode() {
  return document.body && document.body.getAttribute("data-view") === "spring-rating";
}
function pluralRuDays(n) {
  var abs = Math.abs(n) % 100;
  var d = abs % 10;
  if (abs >= 11 && abs <= 14) return "дней";
  if (d === 1) return "день";
  if (d >= 2 && d <= 4) return "дня";
  return "дней";
}
/** Счётчик дней до финала весеннего рейтинга (31 мая, конец дня по локальному времени). */
function updateSpringRatingFinalCountdown() {
  var els = document.querySelectorAll(".spring-rating-final-countdown__days");
  if (!els.length) return;
  var end = new Date(2026, 4, 31, 23, 59, 59, 999);
  var now = new Date();
  var diffMs = end.getTime() - now.getTime();
  var days = diffMs <= 0 ? 0 : Math.ceil(diffMs / (24 * 60 * 60 * 1000));
  var text = days <= 0 ? "сезон завершён" : days + " " + pluralRuDays(days);
  for (var i = 0; i < els.length; i++) els[i].textContent = text;
}
function getRatingByDate() {
  if (isSpringRatingMode() && typeof SPRING_RATING_TOURNAMENTS_BY_DATE !== "undefined" && SPRING_RATING_TOURNAMENTS_BY_DATE && Object.keys(SPRING_RATING_TOURNAMENTS_BY_DATE).length) {
    var byDate = {};
    var dates = Object.keys(SPRING_RATING_TOURNAMENTS_BY_DATE);
    for (var di = 0; di < dates.length; di++) {
      var dateStr = dates[di];
      var byNick = {};
      var list = SPRING_RATING_TOURNAMENTS_BY_DATE[dateStr];
      if (!Array.isArray(list)) continue;
      for (var ti = 0; ti < list.length; ti++) {
        var t = list[ti];
        var players = t.players || [];
        for (var pi = 0; pi < players.length; pi++) {
          var p = players[pi];
          var n = normalizeWinterNick(p && p.nick);
          if (!n) continue;
          var pts = winterRatingTournamentPlayerPoints(p);
          var rew = p.reward != null ? Number(p.reward) : 0;
          if (rew !== rew) rew = 0;
          if (!byNick[n]) byNick[n] = { nick: n, points: 0, reward: 0 };
          byNick[n].points += pts;
          byNick[n].reward += rew;
        }
      }
      byDate[dateStr] = Object.keys(byNick).map(function (k) { return byNick[k]; }).filter(function (r) { return (r.points || 0) !== 0 || (r.reward || 0) !== 0; }).sort(function (a, b) { return (b.points - a.points) || (b.reward - a.reward); });
    }
    return byDate;
  }
  return typeof WINTER_RATING_BY_DATE !== "undefined" ? WINTER_RATING_BY_DATE : {};
}
function getRatingTournamentsByDate() {
  return typeof WINTER_RATING_TOURNAMENTS_BY_DATE !== "undefined" ? WINTER_RATING_TOURNAMENTS_BY_DATE : {};
}
function getSpringRatingTournamentsByDate() {
  return typeof SPRING_RATING_TOURNAMENTS_BY_DATE !== "undefined" ? SPRING_RATING_TOURNAMENTS_BY_DATE : {};
}
/** Сумма всех положительных призовых (все игроки, обе лиги) по списку дат DD.MM.YYYY */
function getSpringRatingTotalRewardSumForDates(dateStrs) {
  var tournamentsByDate = getSpringRatingTournamentsByDate() || {};
  var total = 0;
  if (!dateStrs || !dateStrs.length) return 0;
  for (var di = 0; di < dateStrs.length; di++) {
    var list = tournamentsByDate[dateStrs[di]];
    if (!Array.isArray(list)) continue;
    for (var ti = 0; ti < list.length; ti++) {
      var players = list[ti].players || [];
      for (var pi = 0; pi < players.length; pi++) {
        var rew = players[pi].reward != null ? Number(players[pi].reward) : 0;
        if (rew === rew && rew > 0) total += rew;
      }
    }
  }
  return total;
}
/** Сводка март/апрель на экране рейтинга весны (перед «Таблица по датам»). На главной блок убран — элементы springRatingHomePromo* отсутствуют. */
function updateSpringRatingHomePromoStats() {
  var wrap = document.getElementById("springRatingHomePromoStats");
  var viewWrap = document.getElementById("springRatingViewTotals");
  if (!wrap && !viewWrap) return;
  try {
    if (typeof SPRING_RATING_TOURNAMENTS_BY_DATE === "undefined") {
      if (wrap) wrap.setAttribute("hidden", "");
      if (viewWrap) viewWrap.setAttribute("hidden", "");
      return;
    }
    var fmt = typeof formatRewardRound === "function" ? formatRewardRound : function (n) { return String(Math.round(Number(n) || 0)); };
    var aprTot = document.getElementById("springRatingHomePromoAprilTotal");
    var marTot = document.getElementById("springRatingHomePromoMarchTotal");
    var aprView = document.getElementById("springRatingViewAprilTotal");
    var marView = document.getElementById("springRatingViewMarchTotal");
    var w1 = document.getElementById("springRatingHomePromoMarchW1");
    var w2 = document.getElementById("springRatingHomePromoMarchW2");
    var w3 = document.getElementById("springRatingHomePromoMarchW3");
    var w4 = document.getElementById("springRatingHomePromoMarchW4");
    var w5 = document.getElementById("springRatingHomePromoMarchW5");
    var aprSum = getSpringRatingTotalRewardSumForDates(typeof SPRING_HOME_APRIL_PROMO_TOTAL_DATES !== "undefined" ? SPRING_HOME_APRIL_PROMO_TOTAL_DATES : []);
    var aprText = aprSum > 0 ? fmt(aprSum) + " ₽" : "—";
    if (aprTot) aprTot.textContent = aprText;
    if (aprView) aprView.textContent = aprText;
    var s1 = getSpringRatingTotalRewardSumForDates(typeof SPRING_HOME_MARCH_WEEK1_DATES !== "undefined" ? SPRING_HOME_MARCH_WEEK1_DATES : []);
    var s2 = getSpringRatingTotalRewardSumForDates(typeof MARCH_PAST_WEEK_DATES !== "undefined" ? MARCH_PAST_WEEK_DATES : []);
    var s3 = getSpringRatingTotalRewardSumForDates(typeof MARCH_NEXT_WEEK_DATES !== "undefined" ? MARCH_NEXT_WEEK_DATES : []);
    var s4 = getSpringRatingTotalRewardSumForDates(typeof MARCH_CURRENT_WEEK_DATES !== "undefined" ? MARCH_CURRENT_WEEK_DATES : []);
    var s5 = getSpringRatingTotalRewardSumForDates(typeof SPRING_HOME_MARCH_TAIL_DATES !== "undefined" ? SPRING_HOME_MARCH_TAIL_DATES : []);
    var marchAll = s1 + s2 + s3 + s4 + s5;
    var marText = marchAll > 0 ? fmt(marchAll) + " ₽" : "—";
    if (marTot) marTot.textContent = marText;
    if (marView) marView.textContent = marText;
    function line(period, sum) {
      return period + " · общий выигрыш " + (sum > 0 ? fmt(sum) + " ₽" : "—");
    }
    if (w1) w1.textContent = line("1—8 марта", s1);
    if (w2) w2.textContent = line("9—15 марта", s2);
    if (w3) w3.textContent = line("16—22 марта", s3);
    if (w4) w4.textContent = line("23—29 марта", s4);
    if (w5) w5.textContent = line("30—31 марта", s5);
    if (wrap) wrap.removeAttribute("hidden");
    if (viewWrap) viewWrap.removeAttribute("hidden");
    if (typeof renderSpringRatingViewTotalsWeeks === "function") renderSpringRatingViewTotalsWeeks();
  } catch (e) {
    if (typeof console !== "undefined" && console.warn) console.warn("updateSpringRatingHomePromoStats", e);
    if (wrap) wrap.setAttribute("hidden", "");
    if (viewWrap) viewWrap.setAttribute("hidden", "");
  }
}
/** Раскрывающиеся недели в блоке итогов на экране рейтинга весны (перед «Таблица по датам») */
function renderSpringRatingViewTotalsWeeks() {
  var aprilHost = document.getElementById("springRatingViewAprilWeeks");
  var marchHost = document.getElementById("springRatingViewMarchWeeks");
  if (!aprilHost || !marchHost) return;
  if (typeof getSpringRatingWeekTopSumForDates !== "function") return;
  var fmt = typeof formatRewardRound === "function" ? formatRewardRound : function (n) { return String(Math.round(Number(n) || 0)); };
  function escNick(s) {
    return typeof escapeHtmlRating === "function" ? escapeHtmlRating(s) : String(s == null ? "" : s).replace(/</g, "&lt;");
  }
  function weekDetailsHtml(block, openWeeks, monthTotals) {
    var dates = block.dates;
    if (!Array.isArray(dates)) dates = [];
    var sumData = getSpringRatingWeekTopSumForDates(dates);
    var winData = getSpringRatingWeekTopWinsForDates(dates);
    var totalWeek = sumData.totalWeek > 0 ? sumData.totalWeek : 0;
    var totalText = totalWeek > 0 ? fmt(totalWeek) + " ₽" : "—";
    var sumList = sumData.top3 && sumData.top3.length
      ? sumData.top3.map(function (r, i) {
          return "<li class=\"winter-rating__single-top-item\">" + (i + 1) + ". " + escNick(r.nick) + " — " + fmt(r.reward) + " ₽</li>";
        }).join("")
      : "<li class=\"winter-rating__single-top-item\">—</li>";
    var winList = winData.top3 && winData.top3.length
      ? winData.top3.map(function (r, i) {
          return "<li class=\"winter-rating__single-top-item\">" + (i + 1) + ". " + escNick(r.nick) + " — " + fmt(r.reward) + " ₽</li>";
        }).join("")
      : "<li class=\"winter-rating__single-top-item\">—</li>";
    var openAttr = openWeeks ? " open" : "";
    var sumTitle = monthTotals ? "Топ суммарный выигрыш за март" : "Топ суммарный выигрыш за неделю";
    var detailClass = "spring-rating-view-week" + (monthTotals ? " spring-rating-view-week--march-month" : "");
    return (
      "<details class=\"" + detailClass + "\"" + openAttr + ">" +
      "<summary class=\"spring-rating-view-week__summary\">" +
      "<span class=\"spring-rating-view-week__label\">" + block.label + "</span>" +
      "<span class=\"spring-rating-view-week__meta\">Общий выигрыш: " + totalText + "</span>" +
      "</summary>" +
      "<div class=\"spring-rating-view-week__inner\">" +
      "<div class=\"winter-rating__past-week-row\">" +
      "<div class=\"winter-rating__past-week-wrap winter-rating__single-top-wrap--march\">" +
      "<h4 class=\"winter-rating__past-week-title\">" + sumTitle + "</h4>" +
      "<ul class=\"winter-rating__single-top-list\">" + sumList + "</ul>" +
      "</div>" +
      "<div class=\"winter-rating__past-week-wrap winter-rating__single-top-wrap--march\">" +
      "<h4 class=\"winter-rating__past-week-title\">Топ занос за 1 турнир</h4>" +
      "<ul class=\"winter-rating__single-top-list\">" + winList + "</ul>" +
      "</div>" +
      "</div>" +
      "<p class=\"winter-rating__past-week-total winter-rating__past-week-total--below\">Всего выиграно игроками: " + totalText + "</p>" +
      "</div>" +
      "</details>"
    );
  }
  var aprBlocks = typeof SPRING_VIEW_APRIL_WEEK_BLOCKS !== "undefined" ? SPRING_VIEW_APRIL_WEEK_BLOCKS : [];
  var marBlocks = typeof SPRING_VIEW_MARCH_WEEK_BLOCKS !== "undefined" ? SPRING_VIEW_MARCH_WEEK_BLOCKS : [];
  var marchAllSeen = {};
  var marchAllDates = [];
  marBlocks.forEach(function (blk) {
    if (!Array.isArray(blk.dates)) return;
    blk.dates.forEach(function (d) {
      if (d && !marchAllSeen[d]) {
        marchAllSeen[d] = 1;
        marchAllDates.push(d);
      }
    });
  });
  aprilHost.innerHTML = aprBlocks.map(function (b) {
    return weekDetailsHtml(b, true, false);
  }).join("");
  var marchMonthHtml = marchAllDates.length
    ? weekDetailsHtml({ label: "Итого за март", dates: marchAllDates }, true, true)
    : "";
  marchHost.innerHTML =
    marchMonthHtml +
    marBlocks
      .map(function (b) {
        return weekDetailsHtml(b, false, false);
      })
      .join("");
}
/** Нижняя обводка welcome-блока: линия проходит ниже промо «Рейтинг турнирщиков», чтобы кнопка не лежала на рамке */
function pokerUpdateHomeWelcomeOutlineFrame() {
  try {
    if (!document.body || document.body.getAttribute("data-view") !== "home") return;
    var homeView = document.querySelector(".view--active[data-view=\"home\"]");
    var outline = homeView && homeView.querySelector(".home-welcome-outline");
    var promo = outline && outline.querySelector(".spring-rating-home-promo-unified");
    if (!outline || !promo) return;
    var oRect = outline.getBoundingClientRect();
    var pRect = promo.getBoundingClientRect();
    if (!(oRect.height > 8) || !(pRect.height > 4)) return;
    var hPx = pRect.bottom - oRect.top + 12;
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
function getSpringRatingMarchTopWins() {
  var tournamentsByDate = getSpringRatingTournamentsByDate() || {};
  var allWins = [];
  Object.keys(tournamentsByDate).forEach(function (dateStr) {
    if (!/\.(03|04|05)\.2026$/.test(dateStr)) return;
    var list = tournamentsByDate[dateStr];
    if (!Array.isArray(list)) return;
    list.forEach(function (t) {
      var players = t.players || [];
      players.forEach(function (p) {
        var rew = p.reward != null ? Number(p.reward) : 0;
        if (rew !== rew || rew <= 0) return;
        var nick = normalizeWinterNick(p && p.nick);
        if (!nick) return;
        allWins.push({ nick: nick, reward: rew });
      });
    });
  });
  allWins.sort(function (a, b) { return b.reward - a.reward; });
  var max = allWins.length ? allWins[0] : null;
  var top3 = allWins.slice(0, 3);
  return { max: max, top3: top3 };
}
/** Топ-3 по сумме выигрышей за набор дат (неделя рейтинга весны) и общая сумма */
function getSpringRatingWeekTopSumForDates(allowedDates) {
  var tournamentsByDate = getSpringRatingTournamentsByDate() || {};
  if (!Array.isArray(allowedDates)) allowedDates = [];
  var byNick = {};
  var totalWeek = 0;
  allowedDates.forEach(function (dateStr) {
    var list = tournamentsByDate[dateStr];
    if (!Array.isArray(list)) return;
    list.forEach(function (t) {
      var players = t.players || [];
      players.forEach(function (p) {
        var rew = p.reward != null ? Number(p.reward) : 0;
        if (rew !== rew || rew <= 0) return;
        var nick = normalizeWinterNick(p && p.nick);
        if (!nick) return;
        if (!byNick[nick]) byNick[nick] = 0;
        byNick[nick] += rew;
        totalWeek += rew;
      });
    });
  });
  var sorted = Object.keys(byNick).map(function (n) { return { nick: n, reward: byNick[n] }; }).sort(function (a, b) { return b.reward - a.reward; });
  return { top3: sorted.slice(0, 3), totalWeek: totalWeek };
}
/** Топ-3 заносов за 1 турнир за набор дат */
function getSpringRatingWeekTopWinsForDates(allowedDates) {
  var tournamentsByDate = getSpringRatingTournamentsByDate() || {};
  if (!Array.isArray(allowedDates)) allowedDates = [];
  var allWins = [];
  var totalWeek = 0;
  allowedDates.forEach(function (dateStr) {
    var list = tournamentsByDate[dateStr];
    if (!Array.isArray(list)) return;
    list.forEach(function (t) {
      var players = t.players || [];
      players.forEach(function (p) {
        var rew = p.reward != null ? Number(p.reward) : 0;
        if (rew !== rew || rew <= 0) return;
        var nick = normalizeWinterNick(p && p.nick);
        if (!nick) return;
        allWins.push({ nick: nick, reward: rew });
        totalWeek += rew;
      });
    });
  });
  allWins.sort(function (a, b) { return b.reward - a.reward; });
  return { top3: allWins.slice(0, 3), totalWeek: totalWeek };
}
/** Топ-3 по сумме выигрышей за прошлую неделю (март) и общая сумма за неделю */
function getSpringRatingPastWeekTopSum() {
  return getSpringRatingWeekTopSumForDates(typeof MARCH_PAST_WEEK_DATES !== "undefined" ? MARCH_PAST_WEEK_DATES : []);
}
/** Топ-3 занос за 1 турнир за прошлую неделю (март) — один выигрыш на игрока, сортировка по убыванию */
function getSpringRatingPastWeekTopWins() {
  return getSpringRatingWeekTopWinsForDates(typeof MARCH_PAST_WEEK_DATES !== "undefined" ? MARCH_PAST_WEEK_DATES : []);
}
/** Топ-3 по сумме выигрышей за текущую неделю (март) и общая сумма за неделю */
function getSpringRatingCurrentWeekTopSum() {
  return getSpringRatingWeekTopSumForDates(typeof MARCH_CURRENT_WEEK_DATES !== "undefined" ? MARCH_CURRENT_WEEK_DATES : []);
}
/** Топ-3 занос за 1 турнир за текущую неделю (март) */
function getSpringRatingCurrentWeekTopWins() {
  return getSpringRatingWeekTopWinsForDates(typeof MARCH_CURRENT_WEEK_DATES !== "undefined" ? MARCH_CURRENT_WEEK_DATES : []);
}

/** Топ-3 по сумме выигрышей за следующую неделю (16–22 марта) и общая сумма за неделю */
function getSpringRatingNextWeekTopSum() {
  return getSpringRatingWeekTopSumForDates(typeof MARCH_NEXT_WEEK_DATES !== "undefined" ? MARCH_NEXT_WEEK_DATES : []);
}

/** Топ-3 занос за 1 турнир за следующую неделю (16–22 марта) */
function getSpringRatingNextWeekTopWins() {
  return getSpringRatingWeekTopWinsForDates(typeof MARCH_NEXT_WEEK_DATES !== "undefined" ? MARCH_NEXT_WEEK_DATES : []);
}
function getRatingImages() {
  if (isSpringRatingMode() && typeof SPRING_RATING_IMAGES_LEAGUE1 !== "undefined" && SPRING_RATING_IMAGES_LEAGUE1) return SPRING_RATING_IMAGES_LEAGUE1;
  return typeof WINTER_RATING_IMAGES !== "undefined" ? WINTER_RATING_IMAGES : {};
}
function getSpringRatingImagesByLeague(leagueNum) {
  if (leagueNum === 1 && typeof SPRING_RATING_IMAGES_LEAGUE1 !== "undefined") return SPRING_RATING_IMAGES_LEAGUE1 || {};
  if (leagueNum === 2 && typeof SPRING_RATING_IMAGES_LEAGUE2 !== "undefined") return SPRING_RATING_IMAGES_LEAGUE2 || {};
  return {};
}
function getSpringRatingRowsForDateLeague(dateStr, leagueNum) {
  var tournamentsByDate = getSpringRatingTournamentsByDate() || {};
  var list = tournamentsByDate[dateStr];
  if (!Array.isArray(list) || !list.length) return [];
  var byNick = {};
  for (var j = 0; j < list.length; j++) {
    var t = list[j];
    var forcedLeague = t.league != null ? Number(t.league) : NaN;
    var buyin = t.buyin != null ? Number(t.buyin) : NaN;
    var inLeague1 = forcedLeague === 1 || (forcedLeague !== forcedLeague && (buyin >= 500 || (buyin !== buyin)));
    var inLeague2 = forcedLeague === 2 || (forcedLeague !== forcedLeague && buyin >= 100 && buyin < 500);
    var include = (leagueNum === 1 && inLeague1) || (leagueNum === 2 && inLeague2);
    if (!include) continue;
    var players = t.players || [];
    for (var k = 0; k < players.length; k++) {
      var p = players[k];
      var n = normalizeWinterNick(p && p.nick);
      if (!n) continue;
      var pts = winterRatingTournamentPlayerPoints(p);
      var rew = p.reward != null ? Number(p.reward) : 0;
      if (rew !== rew) rew = 0;
      if (!byNick[n]) byNick[n] = { nick: n, points: 0, reward: 0 };
      byNick[n].points += pts;
      byNick[n].reward += rew;
    }
  }
  return Object.keys(byNick).map(function (n) { return byNick[n]; });
}
function syncWinterRatingLightboxSingleClass(box) {
  if (!box) return;
  var single = !!(box.dataset.lightboxOverrideFile || box.dataset.lightboxSingleOnly === "1");
  box.classList.toggle("winter-rating-lightbox--single", single);
}
function openWinterRatingLightbox(dateStr, index, leagueNum, opts) {
  opts = opts || {};
  var box = document.getElementById("winterRatingLightbox");
  var img = box && box.querySelector(".winter-rating-lightbox__img");
  if (!box || !img) return;
  if (opts.overrideFile) {
    delete box.dataset.lightboxSingleOnly;
    box.dataset.lightboxOverrideFile = opts.overrideFile;
    box.dataset.lightboxDate = dateStr || "";
    box.dataset.lightboxIndex = "0";
    box.dataset.lightboxLeague = "";
    box.dataset.lightboxWinterImages = "";
    img.src = getAssetUrl(opts.overrideFile) + "?v=19";
    img.alt = "Скрин турнира";
    box.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    syncWinterRatingLightboxSingleClass(box);
    updateWinterRatingLightboxArrows();
    return;
  }
  delete box.dataset.lightboxOverrideFile;
  var files;
  if (opts.winterImages === true && typeof WINTER_RATING_IMAGES !== "undefined") {
    files = (WINTER_RATING_IMAGES[dateStr] || []);
  } else if (leagueNum === 1 || leagueNum === 2) {
    // Скрины марта/весны по лиге — всегда из SPRING_RATING_IMAGES_LEAGUE*, даже на экране «Рейтинг зимы»
    // (иначе для мартовских дат подставлялись зимние файлы или пустой список → «не те» картинки).
    files = (getSpringRatingImagesByLeague(leagueNum)[dateStr] || []);
  } else {
    files = (getRatingImages()[dateStr] || []);
  }
  if (!files || !files.length) return;
  if (index < 0) index = 0;
  if (index >= files.length) index = files.length - 1;
  box.dataset.lightboxDate = dateStr;
  box.dataset.lightboxIndex = String(index);
  box.dataset.lightboxLeague = leagueNum != null ? String(leagueNum) : "";
  box.dataset.lightboxWinterImages = opts.winterImages ? "1" : "";
  if (opts.singleImageOnly) box.dataset.lightboxSingleOnly = "1";
  else delete box.dataset.lightboxSingleOnly;
  img.src = getAssetUrl(files[index]) + "?v=19";
  img.alt = "Скрин рейтинга " + dateStr + " (" + (index + 1) + ")";
  box.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  syncWinterRatingLightboxSingleClass(box);
  updateWinterRatingLightboxArrows();
}

function getWinterRatingLightboxFiles(box) {
  if (!box) return null;
  if (box.dataset.lightboxOverrideFile) {
    return [box.dataset.lightboxOverrideFile];
  }
  if (!box.dataset.lightboxDate) return null;
  var dateStr = box.dataset.lightboxDate;
  var full;
  if (box.dataset.lightboxWinterImages === "1" && typeof WINTER_RATING_IMAGES !== "undefined") {
    full = WINTER_RATING_IMAGES[dateStr] || [];
  } else {
    var leagueStr = box.dataset.lightboxLeague;
    var leagueNum = leagueStr === "1" || leagueStr === "2" ? parseInt(leagueStr, 10) : null;
    if (leagueNum === 1 || leagueNum === 2) {
      full = getSpringRatingImagesByLeague(leagueNum)[dateStr] || [];
    } else {
      full = getRatingImages()[dateStr] || [];
    }
  }
  if (box.dataset.lightboxSingleOnly === "1") {
    var idx = parseInt(box.dataset.lightboxIndex, 10) || 0;
    if (idx < 0 || idx >= full.length) return full.length ? [full[0]] : [];
    return [full[idx]];
  }
  return full;
}
function updateWinterRatingLightboxArrows() {
  var box = document.getElementById("winterRatingLightbox");
  if (!box || box.getAttribute("aria-hidden") === "true") return;
  var prevBtn = box.querySelector(".winter-rating-lightbox__prev");
  var nextBtn = box.querySelector(".winter-rating-lightbox__next");
  var counter = box.querySelector(".winter-rating-lightbox__counter");
  if (box.dataset.lightboxSingleOnly === "1") {
    if (prevBtn) prevBtn.style.display = "none";
    if (nextBtn) nextBtn.style.display = "none";
    if (counter) counter.textContent = "";
    return;
  }
  var index = parseInt(box.dataset.lightboxIndex, 10) || 0;
  var files = getWinterRatingLightboxFiles(box);
  if (prevBtn) prevBtn.style.display = files && index > 0 ? "" : "none";
  if (nextBtn) nextBtn.style.display = files && index < files.length - 1 ? "" : "none";
  if (counter && files) counter.textContent = (index + 1) + " / " + files.length;
}

function closeWinterRatingLightbox() {
  var box = document.getElementById("winterRatingLightbox");
  if (box) {
    box.setAttribute("aria-hidden", "true");
    delete box.dataset.lightboxSingleOnly;
    box.classList.remove("winter-rating-lightbox--single");
    document.body.style.overflow = "";
  }
}

function initWinterRatingLightbox() {
  var box = document.getElementById("winterRatingLightbox");
  if (!box || box.getAttribute("data-inited") === "1") return;
  box.setAttribute("data-inited", "1");
  var closeBtn = box.querySelector(".winter-rating-lightbox__close");
  var backBtn = box.querySelector(".winter-rating-lightbox__back");
  var prevBtn = box.querySelector(".winter-rating-lightbox__prev");
  var nextBtn = box.querySelector(".winter-rating-lightbox__next");
  if (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeWinterRatingLightbox();
    });
  }
  if (backBtn) {
    backBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeWinterRatingLightbox();
    });
  }
  if (prevBtn) prevBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (box.dataset.lightboxSingleOnly === "1") return;
    var dateStr = box.dataset.lightboxDate;
    var index = parseInt(box.dataset.lightboxIndex, 10) || 0;
    var leagueStr = box.dataset.lightboxLeague;
    var leagueNum = leagueStr === "1" || leagueStr === "2" ? parseInt(leagueStr, 10) : undefined;
    var lbOpts = { winterImages: box.dataset.lightboxWinterImages === "1" };
    if (index > 0) openWinterRatingLightbox(dateStr, index - 1, leagueNum, lbOpts);
  });
  if (nextBtn) nextBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (box.dataset.lightboxSingleOnly === "1") return;
    var dateStr = box.dataset.lightboxDate;
    var index = parseInt(box.dataset.lightboxIndex, 10) || 0;
    var leagueStr = box.dataset.lightboxLeague;
    var leagueNum = leagueStr === "1" || leagueStr === "2" ? parseInt(leagueStr, 10) : undefined;
    var files = getWinterRatingLightboxFiles(box);
    var lbOpts = { winterImages: box.dataset.lightboxWinterImages === "1" };
    if (files && index < files.length - 1) openWinterRatingLightbox(dateStr, index + 1, leagueNum, lbOpts);
  });
  box.addEventListener("click", function (e) {
    var t = e.target;
    if (t === box || (t && t.classList && t.classList.contains("winter-rating-lightbox__img"))) {
      closeWinterRatingLightbox();
    }
  });
  document.addEventListener("keydown", function (e) {
    if (box.getAttribute("aria-hidden") !== "false") return;
    if (e.key === "Escape") closeWinterRatingLightbox();
    else if (e.key === "ArrowLeft") {
      if (box.dataset.lightboxSingleOnly === "1") return;
      var dateStr = box.dataset.lightboxDate;
      var idx = parseInt(box.dataset.lightboxIndex, 10) || 0;
      var leagueStr = box.dataset.lightboxLeague;
      var leagueNum = leagueStr === "1" || leagueStr === "2" ? parseInt(leagueStr, 10) : undefined;
      var kbOpts = { winterImages: box.dataset.lightboxWinterImages === "1" };
      if (idx > 0) openWinterRatingLightbox(dateStr, idx - 1, leagueNum, kbOpts);
    } else if (e.key === "ArrowRight") {
      if (box.dataset.lightboxSingleOnly === "1") return;
      var dateStr = box.dataset.lightboxDate;
      var idx = parseInt(box.dataset.lightboxIndex, 10) || 0;
      var leagueStr = box.dataset.lightboxLeague;
      var leagueNum = leagueStr === "1" || leagueStr === "2" ? parseInt(leagueStr, 10) : undefined;
      var files = getWinterRatingLightboxFiles(box);
      var kbOptsR = { winterImages: box.dataset.lightboxWinterImages === "1" };
      if (files && idx < files.length - 1) openWinterRatingLightbox(dateStr, idx + 1, leagueNum, kbOptsR);
    }
  });
}

function winterRatingRowClass(place) {
  if (place === 1) return "winter-rating__row--gold";
  if (place === 2) return "winter-rating__row--silver";
  if (place === 3) return "winter-rating__row--bronze";
  return "";
}
/** Форматирует сумму без копеек (округление до целого) */
function formatRewardRound(val) {
  return Math.round(Number(val) || 0).toLocaleString("ru-RU");
}
function winterRatingPrizeByPlace(place) {
  var prizes = { 1: 110000, 2: 60000, 3: 30000, 4: 20000, 5: 10000, 6: 10000, 7: 10000 };
  var amount = prizes[place];
  return amount != null ? formatRewardRound(amount) + " ₽" : "<span class=\"winter-rating__prize-respect\">уважение</span>";
}

function winterRatingPlaceCell(place) {
  if (place === 1) return "🥇 1";
  if (place === 2) return "🥈 2";
  if (place === 3) return "🥉 3";
  return String(place);
}
/** Хпокер баллы: логика подсчёта баллов рейтинга. Баллы за места 1–8 только при ненулевой награде (reward > 0). Место → баллы: 1=135, 2=110, 3=90, 4=70, 5=60, 6=50, 7=40, 8=30. */
var XPOKER_BALLS = { 1: 135, 2: 110, 3: 90, 4: 70, 5: 60, 6: 50, 7: 40, 8: 30 };
function winterRatingPointsForPlace(place, reward) {
  if (reward == null || reward <= 0) return 0;
  var pts = XPOKER_BALLS[place];
  return pts != null ? pts : 0;
}
/** Явные баллы в данных турнира (весна/ручная правка) перекрывают таблицу мест. */
function winterRatingTournamentPlayerPoints(p) {
  if (!p) return 0;
  if (p.points != null) {
    var ex = Number(p.points);
    if (ex === ex) return ex;
  }
  return winterRatingPointsForPlace(p.place, p.reward);
}
function mergeWinterRatingRowsByNick(rows) {
  if (!rows || !rows.length) return [];
  var byNick = {};
  rows.forEach(function (r) {
    var n = normalizeWinterNick(r && r.nick);
    var pts = Number(r.points);
    var rew = Number(r.reward);
    if (!byNick[n]) byNick[n] = { nick: n, points: 0, reward: 0 };
    byNick[n].points += (pts === pts ? pts : 0);
    byNick[n].reward += (rew === rew ? rew : 0);
  });
  return Object.keys(byNick).map(function (n) { return byNick[n]; });
}
function renderWinterRatingTable(rows) {
  if (!rows || !rows.length) return "";
  rows = mergeWinterRatingRowsByNick(rows);
  var filtered = rows.filter(function (r) { return r.points !== 0 || r.reward !== 0; });
  var sorted = filtered.slice().sort(function (a, b) { return (b.points - a.points) || (b.reward - a.reward); });
  var place = 0;
  var totalReward = sorted.reduce(function (sum, r) { return sum + (Number(r.reward) || 0); }, 0);
  var tfoot = "<tfoot><tr class=\"winter-rating__table-total-row\"><td colspan=\"3\">Сумма призовых за день</td><td>" + (totalReward ? formatRewardRound(totalReward) : "0") + "</td></tr></tfoot>";
  return "<table class=\"winter-rating__table\"><thead><tr><th>Место</th><th>Ник</th><th>Баллы</th><th>Выигрыш в<br>турнирах</th></tr></thead><tbody>" +
    sorted.map(function (r) {
      place++;
      var trClass = winterRatingRowClass(place);
      var rewardNum = Number(String(r.reward || 0).replace(/\s/g, "")) || 0;
      if (rewardNum > 100000) trClass = (trClass ? trClass + " " : "") + "winter-rating__tr--reward-high";
      else if (rewardNum > 50000) trClass = (trClass ? trClass + " " : "") + "winter-rating__tr--reward-mid";
      var placeCell = winterRatingPlaceCell(place);
      return "<tr" + (trClass ? " class=\"" + trClass + "\"" : "") + "><td>" + placeCell + "</td><td>" + String(r.nick).replace(/</g, "&lt;") + "</td><td>" + r.points + "</td><td>" + (r.reward ? formatRewardRound(r.reward) : "0") + "</td></tr>";
    }).join("") + "</tbody>" + tfoot + "</table>";
}

function escapeHtmlRating(s) {
  if (s == null) return "";
  return String(s).replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;");
}

function escapeHtml(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function winterRatingDateKeyToStamp(dateStr) {
  var parts = dateStr.split(".");
  if (parts.length !== 3) return 0;
  var d = parseInt(parts[0], 10), m = parseInt(parts[1], 10), y = parseInt(parts[2], 10);
  return (y * 10000 + m * 100 + d) || 0;
}

function getWinterRatingPlayerSummary(nick) {
  nick = normalizeWinterNick(nick);
  var dateSet = {};
  var tournamentsByDate;
  if (isSpringRatingMode()) {
    tournamentsByDate = {};
    var winterT = typeof WINTER_RATING_TOURNAMENTS_BY_DATE !== "undefined" ? WINTER_RATING_TOURNAMENTS_BY_DATE : {};
    var springT = getSpringRatingTournamentsByDate() || {};
    Object.keys(winterT).forEach(function (k) { tournamentsByDate[k] = winterT[k]; });
    Object.keys(springT).forEach(function (k) { tournamentsByDate[k] = springT[k]; });
  } else {
    tournamentsByDate = getRatingTournamentsByDate();
  }
  var byDate = getRatingByDate();
  if (isSpringRatingMode() && typeof WINTER_RATING_BY_DATE !== "undefined") {
    var mergedByDate = {};
    Object.keys(WINTER_RATING_BY_DATE || {}).forEach(function (k) { mergedByDate[k] = WINTER_RATING_BY_DATE[k]; });
    Object.keys(byDate || {}).forEach(function (k) { mergedByDate[k] = byDate[k]; });
    byDate = mergedByDate;
  }
  if (typeof tournamentsByDate === "object") {
    Object.keys(tournamentsByDate).forEach(function (k) { dateSet[k] = true; });
  }
  if (typeof byDate === "object") {
    Object.keys(byDate).forEach(function (k) { dateSet[k] = true; });
  }
  var dates = Object.keys(dateSet).sort(function (a, b) {
    return winterRatingDateKeyToStamp(b) - winterRatingDateKeyToStamp(a);
  });
  var out = [];
  dates.forEach(function (dateStr) {
    var tournaments = tournamentsByDate && tournamentsByDate[dateStr];
    if (tournaments && tournaments.length) {
      tournaments.forEach(function (t) {
        var p = t.players && t.players.find(function (r) { return winterRatingSamePlayer(r.nick, nick); });
        if (p) {
          var reward = p.reward != null ? p.reward : 0;
          var league = t.league != null ? Number(t.league) : null;
          if (league == null && isSpringRatingMode() && /\.(03|04|05)\./.test(String(dateStr)) && t.buyin != null) {
            var buyin = Number(t.buyin);
            if (buyin === buyin) {
              league = buyin >= 500 ? 1 : (buyin >= 100 ? 2 : 1);
            }
          }
          out.push({
            date: dateStr,
            time: t.time || "",
            tournamentLabel: t.name || t.time || "",
            place: p.place,
            points: winterRatingTournamentPlayerPoints(p),
            reward: reward,
            league: league,
          });
        }
      });
      return;
    }
    var list = byDate && byDate[dateStr];
    if (!list || !list.length) return;
    var filtered = list.filter(function (r) { return r.points !== 0 || r.reward !== 0; });
    var sorted = filtered.slice().sort(function (a, b) { return (b.points - a.points) || (b.reward - a.reward); });
    var idx = sorted.findIndex(function (r) { return winterRatingSamePlayer(r.nick, nick); });
    if (idx === -1) return;
    var row = sorted[idx];
    out.push({
      date: dateStr,
      time: "",
      tournamentLabel: "",
      place: idx + 1,
      points: row.points,
      reward: row.reward != null ? row.reward : 0,
    });
  });
  return out.filter(function (s) {
    var p = Number(s.points);
    var w = Number(s.reward);
    return (p === p && p !== 0) || (w === w && w !== 0);
  });
}

function applyWinterRatingPlayerModalFilterAndRender(modal) {
  var fullSummary = modal._winterPlayerModalFullSummary;
  var showPoints = modal._winterPlayerModalShowPoints;
  var tableWrap = modal.querySelector(".winter-rating-player-modal__table-wrap");
  var summaryBlock = document.getElementById("winterRatingPlayerModalSummary");
  var monthSelect = document.getElementById("winterRatingPlayerModalMonth");
  var sortByBtn = document.getElementById("winterRatingPlayerModalSortBy");
  var sortDirBtn = document.getElementById("winterRatingPlayerModalSortDir");
  var monthVal = monthSelect && monthSelect.value ? monthSelect.value : "all";
  modal.classList.toggle("winter-rating-player-modal--all-time", monthVal === "all");
  if (!fullSummary || !tableWrap) return;
  var leagueSelect = document.getElementById("winterRatingPlayerModalLeague");
  var leagueVal = leagueSelect && leagueSelect.value ? leagueSelect.value : "all";
  var sortBy = (sortByBtn && sortByBtn.textContent.indexOf("выигрыш") !== -1) ? "reward" : "date";
  var sortDesc = (sortDirBtn && sortDirBtn.textContent.indexOf("↑") === -1);
  var list = monthVal === "all" ? fullSummary.slice() : fullSummary.filter(function (s) {
    var parts = String(s.date).split(".");
    return parts.length === 3 && parts[1] + "." + parts[2] === monthVal;
  });
  if (leagueVal === "1" || leagueVal === "2") {
    var leagueNum = parseInt(leagueVal, 10);
    list = list.filter(function (s) { return s.league === leagueNum; });
  }
  list.sort(function (a, b) {
    var cmp = 0;
    if (sortBy === "date") {
      cmp = winterRatingDateKeyToStamp(a.date) - winterRatingDateKeyToStamp(b.date);
    } else {
      cmp = (Number(a.reward) || 0) - (Number(b.reward) || 0);
    }
    return sortDesc ? -cmp : cmp;
  });
  if (list.length) {
    var PLAYER_MODAL_TOURNAMENTS_LIMIT = 15;
    var expanded = !!modal._winterPlayerModalTableExpanded;
    var displayList = list.length > PLAYER_MODAL_TOURNAMENTS_LIMIT && !expanded
      ? list.slice(0, PLAYER_MODAL_TOURNAMENTS_LIMIT)
      : list;
    var totalPointsFiltered = 0;
    for (var pi = 0; pi < list.length; pi++) { totalPointsFiltered += Number(list[pi].points) || 0; }
    var totalRewardFiltered = 0;
    for (var ri = 0; ri < list.length; ri++) { totalRewardFiltered += Number(list[ri].reward) || 0; }
    if (monthVal === "all" && modal._winterPlayerModalNick === "Waaar" && !isSpringRatingMode()) totalRewardFiltered += 588225;
    var totalRewardFilteredStr = totalRewardFiltered ? formatRewardRound(totalRewardFiltered) : "0";
    var headers = "<th>Дата</th><th class=\"winter-rating-player-modal__th-tournament\">Турнир</th><th>Место</th>";
    if (showPoints) headers += "<th>Баллы</th>";
    headers += "<th>Выигрыш</th>";
    var footerCells = "<td colspan=\"3\" class=\"winter-rating-player-modal__total-label\">Итого</td>";
    if (showPoints) footerCells += "<td class=\"winter-rating-player-modal__total-value\">" + totalPointsFiltered + "</td>";
    footerCells += "<td class=\"winter-rating-player-modal__total-value\">" + totalRewardFilteredStr + "</td>";
    var tableHtml = "<table class=\"winter-rating__table winter-rating-player-modal__table\"><thead><tr>" + headers + "</tr></thead><tbody>" +
      displayList.map(function (s, i) {
        var placeStr = winterRatingPlaceCell(s.place);
        var rewardStr = s.reward ? formatRewardRound(s.reward) : "0";
        var showDate = (i === 0 || displayList[i - 1].date !== s.date);
        var dateCell = showDate ? escapeHtmlRating(s.date) : "";
        var tourCell = escapeHtmlRating(s.tournamentLabel || s.time || "—");
        var ptsCell = showPoints ? "<td>" + (s.points || 0) + "</td>" : "";
        var dateParts = String(s.date || "").split(".");
        var monthKey = dateParts.length >= 3 ? dateParts[1] + "." + dateParts[2] : "";
        var prevParts = i > 0 ? String(displayList[i - 1].date || "").split(".") : [];
        var prevMonthKey = prevParts.length >= 3 ? prevParts[1] + "." + prevParts[2] : "";
        var isNewMonth = i > 0 && monthKey && monthKey !== prevMonthKey;
        var rewardNum = Number(String(s.reward || 0).replace(/\s/g, "")) || 0;
        var rewardClass = rewardNum > 100000 ? " winter-rating-player-modal__tr--reward-high" : (rewardNum > 50000 ? " winter-rating-player-modal__tr--reward-mid" : "");
        var trClass = (isNewMonth ? " winter-rating-player-modal__tr--month-start" : "") + rewardClass;
        return "<tr class=\"" + trClass.replace(/^ /, "") + "\"><td>" + dateCell + "</td><td class=\"winter-rating-player-modal__td-tournament\">" + tourCell + "</td><td>" + placeStr + "</td>" + ptsCell + "<td>" + rewardStr + "</td></tr>";
      }).join("") + "</tbody><tfoot><tr class=\"winter-rating-player-modal__total-row\">" + footerCells + "</tr></tfoot></table>";
    var showAllHtml = list.length > PLAYER_MODAL_TOURNAMENTS_LIMIT
      ? "<div class=\"winter-rating-player-modal__show-all-wrap\"><button type=\"button\" class=\"winter-rating-player-modal__show-all-btn\" aria-label=\"Раскрыть или свернуть список\">" + (expanded ? "Свернуть" : "Показать все (" + list.length + ")") + "</button></div>"
      : "";
    tableWrap.innerHTML = tableHtml + showAllHtml;
    var firstsList = list.filter(function (s) { return Number(s.place) === 1; });
    var firsts = firstsList.length;
    var firstsReward = 0;
    for (var fi = 0; fi < firstsList.length; fi++) { firstsReward += Number(firstsList[fi].reward) || 0; }
    var firstsRewardStr = firstsReward ? formatRewardRound(firstsReward) : "0";
    var secondsList = list.filter(function (s) { return Number(s.place) === 2; });
    var seconds = secondsList.length;
    var secondsReward = 0;
    for (var si = 0; si < secondsList.length; si++) { secondsReward += Number(secondsList[si].reward) || 0; }
    var secondsRewardStr = secondsReward ? formatRewardRound(secondsReward) : "0";
    var thirdsList = list.filter(function (s) { return Number(s.place) === 3; });
    var thirds = thirdsList.length;
    var thirdsReward = 0;
    for (var ti = 0; ti < thirdsList.length; ti++) { thirdsReward += Number(thirdsList[ti].reward) || 0; }
    var thirdsRewardStr = thirdsReward ? formatRewardRound(thirdsReward) : "0";
    var totalReward = 0;
    for (var i = 0; i < list.length; i++) { totalReward += Number(list[i].reward) || 0; }
    if (monthVal === "all" && modal._winterPlayerModalNick === "Waaar" && !isSpringRatingMode()) totalReward += 588225;
    var totalStr = totalReward ? formatRewardRound(totalReward) : "0";
    var topReward = 0;
    for (var ri = 0; ri < list.length; ri++) {
      var r = Number(list[ri].reward) || 0;
      if (r > topReward) topReward = r;
    }
    var topRewardStr = topReward ? formatRewardRound(topReward) : "0";
    var monthNames = { "12": "Декабрь", "01": "Январь", "02": "Февраль", "03": "Март", "04": "Апрель", "05": "Май", "06": "Июнь", "07": "Июль", "08": "Август", "09": "Сентябрь", "10": "Октябрь", "11": "Ноябрь" };
    var fullSummaryForMonths = modal._winterPlayerModalFullSummary || [];
    var byMonth = {};
    for (var mi = 0; mi < fullSummaryForMonths.length; mi++) {
      var parts = String(fullSummaryForMonths[mi].date).split(".");
      if (parts.length === 3) {
        var monthKey = parts[1] + "." + parts[2];
        if (!byMonth[monthKey]) byMonth[monthKey] = { key: monthKey, sum: 0 };
        byMonth[monthKey].sum += Number(fullSummaryForMonths[mi].reward) || 0;
      }
    }
    var monthOrder = ["12.2025", "01.2026", "02.2026", "03.2026", "04.2026", "05.2026", "06.2026", "07.2026", "08.2026", "09.2026", "10.2026", "11.2026"];
    var monthRows = "";
    monthOrder.forEach(function (monthKey) {
      if (byMonth[monthKey] && byMonth[monthKey].sum) {
        var p = monthKey.split(".");
        var monthLabel = (monthNames[p[0]] || p[0]) + " " + p[1];
        monthRows += "<tr><td class=\"winter-rating-player-modal__summary-label\">" + escapeHtmlRating(monthLabel) + "</td><td class=\"winter-rating-player-modal__summary-value\">" + formatRewardRound(byMonth[monthKey].sum) + "</td></tr>";
      }
    });
    modal._winterPlayerModalTotalStr = totalStr;
    if (summaryBlock) {
      summaryBlock.innerHTML = "<table class=\"winter-rating-player-modal__summary-table\"><tbody>" +
        "<tr class=\"winter-rating-player-modal__summary-total-row\"><td class=\"winter-rating-player-modal__summary-label\">Общие призовые</td><td class=\"winter-rating-player-modal__summary-value\">" + totalStr + "</td></tr>" +
        "<tr><td class=\"winter-rating-player-modal__summary-label\">Топ выигрыш</td><td class=\"winter-rating-player-modal__summary-value\">" + topRewardStr + "</td></tr>" +
        "<tr><td class=\"winter-rating-player-modal__summary-label\">Первых мест</td><td class=\"winter-rating-player-modal__summary-value\">" + firsts + " (призовые — " + firstsRewardStr + ")</td></tr>" +
        "<tr><td class=\"winter-rating-player-modal__summary-label\">Вторых мест</td><td class=\"winter-rating-player-modal__summary-value\">" + seconds + " (призовые — " + secondsRewardStr + ")</td></tr>" +
        "<tr><td class=\"winter-rating-player-modal__summary-label\">Третьих мест</td><td class=\"winter-rating-player-modal__summary-value\">" + thirds + " (призовые — " + thirdsRewardStr + ")</td></tr>" +
        (monthRows ? "<tr class=\"winter-rating-player-modal__summary-months-sep\"><td colspan=\"2\">Выигрыши по месяцам</td></tr>" + monthRows : "") +
        "</tbody></table>";
      summaryBlock.style.display = "";
    }
  } else {
    modal._winterPlayerModalTotalStr = "0";
    tableWrap.innerHTML = "<p class=\"winter-rating-player-modal__empty\">Нет данных за выбранный период</p>";
    if (summaryBlock) { summaryBlock.innerHTML = ""; summaryBlock.style.display = "none"; }
  }
}

function openWinterRatingPlayerModal(nick, options) {
  options = options || {};
  var modal = document.getElementById("winterRatingPlayerModal");
  if (modal) initWinterRatingPlayerModal();
  var titleEl = modal && modal.querySelector(".winter-rating-player-modal__title");
  var tableWrap = modal && modal.querySelector(".winter-rating-player-modal__table-wrap");
  var summaryBlock = modal && document.getElementById("winterRatingPlayerModalSummary");
  var monthSelect = document.getElementById("winterRatingPlayerModalMonth");
  var sortByBtn = document.getElementById("winterRatingPlayerModalSortBy");
  var sortDirBtn = document.getElementById("winterRatingPlayerModalSortDir");
  if (!modal || !titleEl || !tableWrap) return;
  var summary = getWinterRatingPlayerSummary(nick);
  var fromGazette = options.onlyDates && Array.isArray(options.onlyDates) && options.onlyDates.length;
  if (fromGazette) {
    var allowedSet = {};
    options.onlyDates.forEach(function (d) { allowedSet[d] = true; });
    summary = summary.filter(function (s) { return allowedSet[s.date]; });
  }
  var useGazetteStyle = fromGazette && !options.skipGazetteStyle;
  modal.classList.toggle("winter-rating-player-modal--gazette", !!useGazetteStyle);
  titleEl.textContent = nick;
  modal._winterPlayerModalFullSummary = summary;
  modal._winterPlayerModalTableExpanded = false;
  modal._winterPlayerModalShowPoints = !useGazetteStyle;
  modal._winterPlayerModalNick = normalizeWinterNick(nick);
  if (monthSelect) monthSelect.value = "all";
  var leagueWrap = document.getElementById("winterRatingPlayerModalLeagueWrap");
  var leagueSelect = document.getElementById("winterRatingPlayerModalLeague");
  if (leagueWrap) leagueWrap.style.display = (isSpringRatingMode() && summary.length) ? "" : "none";
  if (leagueSelect) leagueSelect.value = "all";
  if (sortByBtn) sortByBtn.textContent = "Сортировать: По дате";
  if (sortDirBtn) { sortDirBtn.textContent = "↓"; sortDirBtn.title = "По убыванию"; }
  var toolbar = modal.querySelector(".winter-rating-player-modal__toolbar");
  var tableLabel = document.getElementById("winterRatingPlayerModalTableLabel");
  if (toolbar) toolbar.style.display = summary.length ? "" : "none";
  if (tableLabel) tableLabel.style.display = summary.length ? "" : "none";
  if (summary.length) {
    applyWinterRatingPlayerModalFilterAndRender(modal);
    var shareWrap = modal.querySelector(".winter-rating-player-modal__share-wrap");
    if (shareWrap) shareWrap.style.display = "";
  } else {
    tableWrap.innerHTML = "<p class=\"winter-rating-player-modal__empty\">Нет данных по датам</p>";
    if (summaryBlock) { summaryBlock.innerHTML = ""; summaryBlock.style.display = "none"; }
    var shareWrap = modal.querySelector(".winter-rating-player-modal__share-wrap");
    if (shareWrap) shareWrap.style.display = "none";
  }
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeWinterRatingPlayerModal() {
  var modal = document.getElementById("winterRatingPlayerModal");
  if (modal) {
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
}

function openSpringRatingInfoModal() {
  var modal = document.getElementById("springRatingInfoModal");
  if (!modal) return;
  initSpringRatingInfoModal();
  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("spring-rating-info-modal--open");
  document.body.style.overflow = "hidden";
}

function closeSpringRatingInfoModal() {
  var modal = document.getElementById("springRatingInfoModal");
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  modal.classList.remove("spring-rating-info-modal--open");
  document.body.style.overflow = "";
}

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

function initSpringRatingInfoModal() {
  var modal = document.getElementById("springRatingInfoModal");
  if (!modal || modal.getAttribute("data-inited") === "1") return;
  modal.setAttribute("data-inited", "1");
  var closeBtn = modal.querySelector(".spring-rating-info-modal__close");
  var backdrop = modal.querySelector(".spring-rating-info-modal__backdrop");
  if (closeBtn) closeBtn.addEventListener("click", closeSpringRatingInfoModal);
  if (backdrop) backdrop.addEventListener("click", closeSpringRatingInfoModal);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeSpringRatingInfoModal();
  });
}

function getSpringRatingViewScrollTarget() {
  if (document.body && document.body.getAttribute("data-view") === "spring-rating") {
    var panel = document.querySelector("main.card .card__content") || document.querySelector(".card__content");
    if (panel) return panel;
  }
  var targets = getSpringRatingViewScrollTargets();
  return targets.length ? targets[0] : (document.scrollingElement || document.documentElement);
}

function getSpringRatingViewScrollTargets() {
  var view = document.querySelector(".view--active[data-view=\"spring-rating\"]") || document.getElementById("springRatingView");
  var cardContent = view && view.closest ? view.closest(".card__content") : null;
  var card = view && view.closest ? view.closest(".card") : null;
  var candidates = [
    cardContent,
    card,
    view,
    document.getElementById("springRatingSectionPlaceholder"),
    document.getElementById("winterRatingSection"),
    document.getElementById("app"),
    document.querySelector(".app"),
    document.scrollingElement,
    document.documentElement,
    document.body
  ];
  var targets = [];
  for (var i = 0; i < candidates.length; i++) {
    var el = candidates[i];
    if (!el) continue;
    var duplicate = false;
    for (var j = 0; j < i; j++) {
      if (candidates[j] === el) duplicate = true;
    }
    if (duplicate) continue;
    var maxScroll = getSpringRatingViewMaxScroll(el);
    if (maxScroll <= 4) continue;
    targets.push(el);
  }
  return targets;
}

function getSpringRatingViewMaxScroll(target) {
  if (!target) return 0;
  if (target === document.body || target === document.documentElement || target === document.scrollingElement) {
    var doc = document.documentElement;
    var body = document.body;
    var scrollHeight = Math.max(
      doc ? doc.scrollHeight : 0,
      body ? body.scrollHeight : 0
    );
    var clientHeight = window.visualViewport && window.visualViewport.height ? window.visualViewport.height : window.innerHeight;
    return Math.max(0, scrollHeight - clientHeight);
  }
  return Math.max(0, target.scrollHeight - target.clientHeight);
}

function getSpringRatingViewScrollTop(target) {
  if (!target) return 0;
  if (target === document.body || target === document.documentElement || target === document.scrollingElement) {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }
  return target.scrollTop || 0;
}

function setSpringRatingViewScrollTop(target, value) {
  if (!target) return;
  if (target === document.body || target === document.documentElement || target === document.scrollingElement) {
    window.scrollTo(0, value);
    if (document.scrollingElement) document.scrollingElement.scrollTop = value;
    return;
  }
  target.scrollTop = value;
}

function springRatingViewScrollBy(target, delta, behavior) {
  if (!target) return;
  if (target === document.body || target === document.documentElement || target === document.scrollingElement) {
    try {
      window.scrollBy({ top: delta, left: 0, behavior: behavior || "auto" });
    } catch (eWinScroll) {
      window.scrollTo(0, getSpringRatingViewScrollTop(target) + delta);
    }
    return;
  }
  try {
    target.scrollBy({ top: delta, left: 0, behavior: behavior || "auto" });
  } catch (eElScroll) {
    target.scrollTop = (target.scrollTop || 0) + delta;
  }
}

function setSpringRatingViewScrollProgress(progress) {
  var targets = getSpringRatingViewScrollTargets();
  for (var i = 0; i < targets.length; i++) {
    var target = targets[i];
    var maxScroll = getSpringRatingViewMaxScroll(target);
    if (maxScroll <= 4) continue;
    setSpringRatingViewScrollTop(target, maxScroll * progress);
  }
}

function springRatingViewScrollToNextBlock(direction) {
  var dir = direction < 0 ? -1 : 1;
  var selectors = [
    ".winter-rating__spring-main-tabs",
    "#winterRatingSpringLeagues",
    "#winterRatingLeague1Body tr:nth-child(6)",
    "#winterRatingLeague1Body tr:nth-child(11)",
    "#winterRatingLeague1SearchWrap",
    "#springRatingViewTotals",
    "#springRatingViewAprilWeeks",
    ".spring-rating-view-week",
    "#winterRatingCalendarWrap",
    "#winterRatingDates",
    ".winter-rating__date-item",
    "#winterRatingLeague2Body",
    "#winterRatingLeague2Body tr:nth-child(6)",
    "#winterRatingLeague2Body tr:nth-child(11)",
    "#winterRatingLeague2SearchWrap",
    ".winter-rating__actions-row"
  ];
  var viewportTop = window.visualViewport && window.visualViewport.offsetTop ? window.visualViewport.offsetTop : 0;
  var viewportHeight = window.visualViewport && window.visualViewport.height ? window.visualViewport.height : window.innerHeight;
  var line = dir > 0 ? viewportTop + viewportHeight * 0.72 : viewportTop + viewportHeight * 0.28;
  var anchors = [];
  for (var i = 0; i < selectors.length; i++) {
    var els = document.querySelectorAll(selectors[i]);
    for (var ei = 0; ei < els.length; ei++) {
      var el = els[ei];
      if (!el) continue;
      var rect = el.getBoundingClientRect();
      if (rect.height <= 0 || rect.width <= 0) continue;
      var duplicate = false;
      for (var ai = 0; ai < anchors.length; ai++) {
        if (anchors[ai].el === el) duplicate = true;
      }
      if (!duplicate) anchors.push({ el: el, rect: rect });
    }
  }
  anchors.sort(function (a, b) { return a.rect.top - b.rect.top; });
  var target = null;
  if (dir > 0) {
    for (var j = 0; j < anchors.length; j++) {
      if (anchors[j].rect.top > line) {
        target = anchors[j].el;
        break;
      }
    }
  } else {
    for (var k = anchors.length - 1; k >= 0; k--) {
      if (anchors[k].rect.bottom < line) {
        target = anchors[k].el;
        break;
      }
    }
  }
  if (target && target.scrollIntoView) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }
  var targets = getSpringRatingViewScrollTargets();
  for (var t = 0; t < targets.length; t++) {
    springRatingViewScrollBy(targets[t], Math.round(viewportHeight * 0.62) * dir, "smooth");
  }
  return targets.length > 0;
}

function springRatingViewScrollOnePage(direction) {
  var dir = direction < 0 ? -1 : 1;
  var target = getSpringRatingViewScrollTarget();
  var maxScroll = getSpringRatingViewMaxScroll(target);
  if (!target || maxScroll <= 4) return false;
  var current = getSpringRatingViewScrollTop(target);
  var viewportHeight =
    target === document.body || target === document.documentElement || target === document.scrollingElement
      ? ((window.visualViewport && window.visualViewport.height) || window.innerHeight || 0)
      : (target.clientHeight || window.innerHeight || 0);
  var step = Math.max(220, Math.round((viewportHeight || 0) * 0.72));
  var next = current + step * dir;
  if (dir > 0 && current >= maxScroll - 12) next = 0;
  next = Math.max(0, Math.min(maxScroll, next));
  setSpringRatingViewScrollTop(target, next);
  try {
    updateSpringRatingViewScrollButton();
  } catch (eUpd) {}
  return true;
}

function initSpringRatingViewScrollButton() {
  var btn = document.getElementById("springRatingViewScrollBtn");
  if (!btn || btn.getAttribute("data-inited") === "1") return;
  btn.setAttribute("data-inited", "1");
  if (btn.tagName === "INPUT") {
    var onRangeInput = function () {
      var max = Number(btn.max) || 1000;
      var val = Number(btn.value) || 0;
      setSpringRatingViewScrollProgress(Math.max(0, Math.min(1, val / max)));
    };
    var holdState = null;
    function startRangeHold(y, e) {
      holdState = {
        y: y,
        dir: 1,
        moved: false,
        timer: null
      };
      holdState.timer = setInterval(function () {
        if (!holdState) return;
        springRatingViewScrollToNextBlock(holdState.dir);
      }, 360);
      if (e && e.preventDefault) e.preventDefault();
    }
    function moveRangeHold(y, e) {
      if (!holdState) return;
      var dy = y - holdState.y;
      if (Math.abs(dy) > 16) {
        holdState.dir = dy > 0 ? 1 : -1;
        holdState.moved = true;
        springRatingViewScrollToNextBlock(holdState.dir);
        holdState.y = y;
      }
      if (e && e.preventDefault) e.preventDefault();
    }
    function endRangeHold(e) {
      if (!holdState) return;
      if (holdState.timer) clearInterval(holdState.timer);
      if (!holdState.moved) springRatingViewScrollToNextBlock(1);
      holdState = null;
      btn._springRatingTapScrollAt = Date.now();
      if (e && e.preventDefault) e.preventDefault();
    }
    btn.addEventListener("pointerdown", function (e) {
      startRangeHold(e.clientY, e);
      var onPointerMoveRange = function (moveEvent) {
        moveRangeHold(moveEvent.clientY, moveEvent);
      };
      var onPointerUpRange = function (upEvent) {
        document.removeEventListener("pointermove", onPointerMoveRange);
        document.removeEventListener("pointerup", onPointerUpRange);
        document.removeEventListener("pointercancel", onPointerCancelRange);
        endRangeHold(upEvent);
      };
      var onPointerCancelRange = function () {
        document.removeEventListener("pointermove", onPointerMoveRange);
        document.removeEventListener("pointerup", onPointerUpRange);
        document.removeEventListener("pointercancel", onPointerCancelRange);
        if (holdState && holdState.timer) clearInterval(holdState.timer);
        holdState = null;
      };
      document.addEventListener("pointermove", onPointerMoveRange);
      document.addEventListener("pointerup", onPointerUpRange);
      document.addEventListener("pointercancel", onPointerCancelRange);
    });
    btn.addEventListener("touchstart", function (e) {
      var touch = e.touches && e.touches[0];
      if (!touch) return;
      startRangeHold(touch.clientY, e);
      var onTouchMoveRange = function (moveEvent) {
        var moveTouch = moveEvent.touches && moveEvent.touches[0];
        if (!moveTouch) return;
        moveRangeHold(moveTouch.clientY, moveEvent);
      };
      var onTouchEndRange = function (endEvent) {
        document.removeEventListener("touchmove", onTouchMoveRange);
        document.removeEventListener("touchend", onTouchEndRange);
        document.removeEventListener("touchcancel", onTouchCancelRange);
        endRangeHold(endEvent);
      };
      var onTouchCancelRange = function () {
        document.removeEventListener("touchmove", onTouchMoveRange);
        document.removeEventListener("touchend", onTouchEndRange);
        document.removeEventListener("touchcancel", onTouchCancelRange);
        if (holdState && holdState.timer) clearInterval(holdState.timer);
        holdState = null;
      };
      document.addEventListener("touchmove", onTouchMoveRange, { passive: false });
      document.addEventListener("touchend", onTouchEndRange, { passive: false });
      document.addEventListener("touchcancel", onTouchCancelRange, { passive: false });
    }, { passive: false });
    btn.addEventListener("input", onRangeInput);
    btn.addEventListener("change", onRangeInput);
    document.addEventListener("scroll", updateSpringRatingViewScrollButton, true);
    window.addEventListener("resize", updateSpringRatingViewScrollButton);
    updateSpringRatingViewScrollButton();
    return;
  }
  btn.addEventListener("click", function (e) {
    springRatingViewScrollOnePage(1);
    if (e && e.preventDefault) e.preventDefault();
  });
  document.addEventListener("scroll", updateSpringRatingViewScrollButton, true);
  window.addEventListener("resize", updateSpringRatingViewScrollButton);
  updateSpringRatingViewScrollButton();
}

function updateSpringRatingViewScrollButton() {
  var btn = document.getElementById("springRatingViewScrollBtn");
  if (!btn) return;
  var isSpringView = document.body && document.body.getAttribute("data-view") === "spring-rating";
  var target = isSpringView ? getSpringRatingViewScrollTarget() : null;
  var maxScroll = target ? getSpringRatingViewMaxScroll(target) : 0;
  if (!isSpringView || !target) {
    btn.setAttribute("hidden", "");
    return;
  }
  btn.removeAttribute("hidden");
  var progress = maxScroll > 4 ? getSpringRatingViewScrollTop(target) / maxScroll : 0;
  if (progress !== progress) progress = 0;
  progress = Math.max(0, Math.min(1, progress));
  if (btn.tagName === "INPUT") {
    var max = Number(btn.max) || 1000;
    var nextValue = String(Math.round(progress * max));
    if (btn.value !== nextValue) btn.value = nextValue;
  }
}

function initWinterRatingPlayerModal() {
  var modal = document.getElementById("winterRatingPlayerModal");
  if (!modal || modal.getAttribute("data-inited") === "1") return;
  modal.setAttribute("data-inited", "1");
  var closeBtn = modal.querySelector(".winter-rating-player-modal__close");
  var backBtn = document.getElementById("winterRatingPlayerModalBack") || modal.querySelector(".winter-rating-player-modal__back");
  if (closeBtn) closeBtn.addEventListener("click", closeWinterRatingPlayerModal);
  if (backBtn) backBtn.addEventListener("click", closeWinterRatingPlayerModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeWinterRatingPlayerModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeWinterRatingPlayerModal();
  });
  var monthSelect = document.getElementById("winterRatingPlayerModalMonth");
  var sortByBtn = document.getElementById("winterRatingPlayerModalSortBy");
  var sortDirBtn = document.getElementById("winterRatingPlayerModalSortDir");
  if (monthSelect) {
    monthSelect.addEventListener("change", function () {
      if (modal._winterPlayerModalFullSummary) applyWinterRatingPlayerModalFilterAndRender(modal);
    });
  }
  var leagueSelect = document.getElementById("winterRatingPlayerModalLeague");
  if (leagueSelect) {
    leagueSelect.addEventListener("change", function () {
      if (modal._winterPlayerModalFullSummary) applyWinterRatingPlayerModalFilterAndRender(modal);
    });
  }
  if (sortByBtn) {
    sortByBtn.addEventListener("click", function () {
      if (sortByBtn.textContent.indexOf("дате") !== -1) {
        sortByBtn.textContent = "Сортировать: По выигрышам";
      } else {
        sortByBtn.textContent = "Сортировать: По дате";
      }
      if (modal._winterPlayerModalFullSummary) applyWinterRatingPlayerModalFilterAndRender(modal);
    });
  }
  if (sortDirBtn) {
    sortDirBtn.addEventListener("click", function () {
      if (sortDirBtn.textContent.indexOf("↑") !== -1) {
        sortDirBtn.textContent = "↓";
        sortDirBtn.title = "По убыванию";
      } else {
        sortDirBtn.textContent = "↑";
        sortDirBtn.title = "По возрастанию";
      }
      if (modal._winterPlayerModalFullSummary) applyWinterRatingPlayerModalFilterAndRender(modal);
    });
  }
  modal.addEventListener("click", function (e) {
    var btn = e.target && e.target.closest && e.target.closest(".winter-rating-player-modal__show-all-btn");
    if (btn && modal._winterPlayerModalFullSummary) {
      modal._winterPlayerModalTableExpanded = !modal._winterPlayerModalTableExpanded;
      applyWinterRatingPlayerModalFilterAndRender(modal);
    }
  });
  var shareBtn = document.getElementById("winterRatingPlayerModalShareBtn");
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var titleEl = modal.querySelector(".winter-rating-player-modal__title");
      var nick = modal._winterPlayerModalNick || (titleEl && titleEl.textContent) || "";
      if (!nick) return;
      var isSpring = typeof isSpringRatingMode === "function" && isSpringRatingMode();
      var startApp = isSpring ? "spring_rating_player_" : "winter_rating_player_";
      var link =
        typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink(startApp + nick) : "";
      if (typeof navigator.clipboard !== "undefined" && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link).then(function () {
          var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tg && tg.showAlert) tg.showAlert("Ссылка скопирована. Отправьте другу — откроется сводка по игроку " + nick + "."); else alert("Ссылка скопирована.");
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
  var shareTelegramBtn = document.getElementById("winterRatingPlayerModalShareTelegramBtn");
  if (shareTelegramBtn) {
    shareTelegramBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var titleEl = modal.querySelector(".winter-rating-player-modal__title");
      var nick = modal._winterPlayerModalNick || (titleEl && titleEl.textContent) || "";
      if (!nick) return;
      var isSpring = typeof isSpringRatingMode === "function" && isSpringRatingMode();
      var startApp = isSpring ? "spring_rating_player_" : "winter_rating_player_";
      var link =
        typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink(startApp + nick) : "";
      if (!link) return;
      if (isTelegramWebApp() && typeof pokerOpenTelegramShareUrlOnly === "function" && pokerOpenTelegramShareUrlOnly(link)) {
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("winter_rating_player_share");
        return;
      }
      var totalStr = modal._winterPlayerModalTotalStr || "0";
      var shareText = "Игрок " + nick + " уже выиграл " + totalStr + ". Посмотрите отчет по турнирам.";
      var shareUrl =
        typeof pokerBuildTelegramShareUrlDialog === "function" ? pokerBuildTelegramShareUrlDialog(link, shareText) : "";
      pokerTryPwaWebShare({ text: shareText + "\n" + link, url: link }).then(function (pwaOk) {
        if (pwaOk) {
          if (typeof recordShareButtonClick === "function") recordShareButtonClick("winter_rating_player_share");
          return;
        }
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.openTelegramLink) tg.openTelegramLink(shareUrl);
        else if (tg && tg.openLink) tg.openLink(shareUrl);
        else window.open(shareUrl, "_blank");
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("winter_rating_player_share");
      });
    });
  }
}

// Зал славы: клик по легенде открывает профиль игрока в рейтинге
(function () {
  document.addEventListener("click", function (e) {
    var link = e.target && e.target.closest ? e.target.closest(".hall-of-fame__legend-link") : null;
    if (!link || !link.dataset.nick) return;
    e.preventDefault();
    if (typeof openWinterRatingPlayerModal === "function") openWinterRatingPlayerModal(link.dataset.nick);
  });
})();

// Итоговая таблица рейтинга (декабрь, январь, февраль).
// Бонусы к итогу: Coo1er91 +55, Waaar +325 (ручные доп. очки). Доп. в итог (не по датам): Waaar +765 очков, +588225 призы; EM13!! +135 очков.
function getWinterRatingOverall() {
  if (isSpringRatingMode()) return [];
  var byNick = {};
  var data = getRatingByDate() || {};
  var dateStrs = Object.keys(data);
  for (var i = 0; i < dateStrs.length; i++) {
    var dateStr = dateStrs[i];
    var list = data[dateStr];
    if (!Array.isArray(list) || !list.length) continue;
    for (var j = 0; j < list.length; j++) {
      var r = list[j];
      var n = normalizeWinterNick(r && r.nick);
      if (!n) continue;
      var pts = Number(r.points);
      var rew = Number(r.reward);
      if (pts !== pts) pts = 0;
      if (rew !== rew) rew = 0;
      if (!byNick[n]) byNick[n] = { nick: n, points: 0, reward: 0 };
      byNick[n].points += pts;
      byNick[n].reward += rew;
    }
  }
  if (!isSpringRatingMode()) {
  if (byNick["Coo1er91"]) byNick["Coo1er91"].points += 55; else byNick["Coo1er91"] = { nick: "Coo1er91", points: 55, reward: 0 };
  if (byNick["Waaar"]) byNick["Waaar"].points += 325; else byNick["Waaar"] = { nick: "Waaar", points: 325, reward: 0 };
  if (byNick["Waaar"]) { byNick["Waaar"].points += 765; byNick["Waaar"].reward += 588225; } else { byNick["Waaar"] = { nick: "Waaar", points: 765, reward: 588225 }; }
  if (byNick["Waaar"]) { byNick["Waaar"].points -= 405; byNick["Waaar"].reward -= 475000; }
  if (byNick["Em13!!"]) byNick["Em13!!"].points += 135; else byNick["Em13!!"] = { nick: "Em13!!", points: 135, reward: 0 };
  }
  var arr = Object.keys(byNick).map(function (n) { return byNick[n]; });
  arr = arr.filter(function (r) {
    var p = Number(r.points);
    var w = Number(r.reward);
    return (p === p && p !== 0) || (w === w && w !== 0);
  });
  arr.sort(function (a, b) {
    var ap = Number(a.points);
    var bp = Number(b.points);
    var aw = Number(a.reward);
    var bw = Number(b.reward);
    if (ap !== ap) ap = 0;
    if (bp !== bp) bp = 0;
    if (aw !== aw) aw = 0;
    if (bw !== bw) bw = 0;
    return (bp - ap) || (bw - aw);
  });
  return arr;
}

function getSpringRatingOverallByLeague(leagueNum) {
  if (!isSpringRatingMode()) return [];
  var tournamentsByDate = getSpringRatingTournamentsByDate() || {};
  var byNick = {};
  var springOverallRegex = /\.(03|04|05)\.2026$/;
  var dateStrs = Object.keys(tournamentsByDate).filter(function (d) { return springOverallRegex.test(d); });
  for (var i = 0; i < dateStrs.length; i++) {
    var list = tournamentsByDate[dateStrs[i]];
    if (!Array.isArray(list) || !list.length) continue;
    for (var j = 0; j < list.length; j++) {
      var t = list[j];
      var forcedLeague = t.league != null ? Number(t.league) : NaN;
      var buyin = t.buyin != null ? Number(t.buyin) : NaN;
      var inLeague1 = forcedLeague === 1 || (forcedLeague !== forcedLeague && (buyin >= 500 || (buyin !== buyin)));
      var inLeague2 = forcedLeague === 2 || (forcedLeague !== forcedLeague && buyin >= 100 && buyin < 500);
      var include = (leagueNum === 1 && inLeague1) || (leagueNum === 2 && inLeague2);
      if (!include) continue;
      var players = t.players || [];
      for (var k = 0; k < players.length; k++) {
        var p = players[k];
        var n = normalizeWinterNickForFinalTable(p && p.nick);
        if (!n) continue;
        var pts = winterRatingTournamentPlayerPoints(p);
        var rew = p.reward != null ? Number(p.reward) : 0;
        if (rew !== rew) rew = 0;
        if (!byNick[n]) byNick[n] = { nick: n, points: 0, reward: 0 };
        byNick[n].points += pts;
        byNick[n].reward += rew;
      }
    }
  }
  var arr = Object.keys(byNick).map(function (n) { return byNick[n]; });
  arr = arr.filter(function (r) {
    var p = Number(r.points);
    var w = Number(r.reward);
    return (p === p && p !== 0) || (w === w && w !== 0);
  });
  arr.sort(function (a, b) {
    var ap = Number(a.points);
    var bp = Number(b.points);
    var aw = Number(a.reward);
    var bw = Number(b.reward);
    if (ap !== ap) ap = 0;
    if (bp !== bp) bp = 0;
    if (aw !== aw) aw = 0;
    if (bw !== bw) bw = 0;
    return (bp - ap) || (bw - aw);
  });
  return arr;
}

function initWinterRating() {
  try {
    var schedPrev = window.requestIdleCallback
      ? function (fn) { window.requestIdleCallback(fn, { timeout: 600 }); }
      : function (fn) { setTimeout(fn, 0); };
    schedPrev(function () {
      if (typeof window.updateWinterRatingWeekTopPreviews === "function") window.updateWinterRatingWeekTopPreviews();
      if (typeof updateSpringRatingHomePromoStats === "function") updateSpringRatingHomePromoStats();
    });
  } catch (e) {}
  try {
    initWinterRatingLightbox();
    initWinterRatingPlayerModal();
  } catch (e) {
    if (typeof console !== "undefined" && console.error) console.error("initWinterRating lightbox/modal", e);
  }
  var conditionsBtn = document.getElementById("springRatingConditionsBtn");
  if (conditionsBtn && conditionsBtn.getAttribute("data-inited") !== "1") {
    conditionsBtn.setAttribute("data-inited", "1");
    conditionsBtn.addEventListener("click", function () { openSpringRatingInfoModal(); });
  }
  var febBtnLabel = document.querySelector("#winterRatingTopFebruaryBtn .winter-rating__week-top-btn-label");
  if (febBtnLabel) febBtnLabel.textContent = isSpringRatingMode() ? "Топы весны" : "Топы Февраля";
  var titleTextEl = document.querySelector("#winterRatingSection .winter-rating__title-text");
  if (titleTextEl) {
    titleTextEl.innerHTML = isSpringRatingMode()
      ? "Рейтинг Турнирщиков весны<br /><span class=\"winter-rating__title-accent\">На 250 000р</span>"
      : "Рейтинг Турнирщиков зимы<br /><span class=\"winter-rating__title-accent\">на 250 000₽</span>";
  }
  window.openWinterRatingDatePanel = function (dateStr) {
    var container = document.getElementById("winterRatingDates");
    if (!container) return;
    var item = container.querySelector(".winter-rating__date-item[data-rating-date=\"" + (dateStr || "") + "\"]");
    if (!item) return;
    var panel = item.querySelector(".winter-rating__date-panel");
    var btn = item.querySelector(".winter-rating__date-btn");
    if (panel) {
      panel.classList.remove("winter-rating__date-panel--hidden");
      var lwOpen = panel.querySelector(".spring-rating-date-leagues");
      if (lwOpen && typeof window.__pokerFillSpringDateLeagues === "function") window.__pokerFillSpringDateLeagues(lwOpen, dateStr);
    }
    if (btn) btn.setAttribute("aria-expanded", "true");
    try { item.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) {}
  };
  var countersEl = document.getElementById("winterRatingCounters");
  var tbody = document.getElementById("winterRatingTableBody");
  var tableCaption = document.querySelector("#winterRatingSection .winter-rating__table-caption");
  if (countersEl) {
    if (isSpringRatingMode()) {
      countersEl.innerHTML = "";
    } else {
      try {
        var c = getWinterRatingCounters();
        countersEl.innerHTML = "Сыграно дней <strong>" + c.daysPassed + "/" + c.totalDays + "</strong>";
      } catch (e) {
        if (typeof console !== "undefined" && console.error) console.error("getWinterRatingCounters", e);
        countersEl.innerHTML = "Сыграно дней <strong>—</strong>";
      }
    }
  }
  if (tableCaption) {
    tableCaption.innerHTML = isSpringRatingMode()
      ? "<span class=\"winter-rating__caption-icon\" aria-hidden=\"true\">🌿</span> Весна 2026"
      : "<span class=\"winter-rating__caption-icon\" aria-hidden=\"true\">❄</span> Итоговая таблица";
  }
  var tableCaptionRow = document.querySelector("#winterRatingSection .winter-rating__table-caption-row");
  var springLeaguesEl = document.getElementById("winterRatingSpringLeagues");
  var springMainTabsEl = document.getElementById("winterRatingSpringMainTabs");
  var winterRatingShareBtn = document.getElementById("winterRatingShareBtn");
  function filterTableByNick(tbody, searchStr, tableWrap, showAllBtn) {
    if (!tbody) return;
    var q = (searchStr || "").trim().toLowerCase();
    var trs = tbody.querySelectorAll("tr");
    var hadCollapsed = tableWrap && tableWrap.classList.contains("winter-rating__table-wrap--collapsed");
    var scrollTop = tableWrap && tableWrap.scrollTop != null ? tableWrap.scrollTop : 0;
    var docScrollTop = (document.scrollingElement && document.scrollingElement.scrollTop) || document.documentElement.scrollTop || 0;
    if (q) {
      if (tableWrap) tableWrap.classList.remove("winter-rating__table-wrap--collapsed");
      if (showAllBtn) showAllBtn.textContent = "Свернуть";
    } else if (hadCollapsed && tableWrap) {
      tableWrap.classList.add("winter-rating__table-wrap--collapsed");
      if (showAllBtn) showAllBtn.textContent = "Ещё";
    }
    for (var i = 0; i < trs.length; i++) {
      var tr = trs[i];
      var nickBtn = tr.querySelector(".winter-rating__nick-btn");
      var nick = (nickBtn && nickBtn.dataset.nick ? nickBtn.dataset.nick : (nickBtn ? nickBtn.textContent : "")).toLowerCase();
      var match = !q || (nick && nick.indexOf(q) >= 0);
      tr.style.display = match ? "" : "none";
    }
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (tableWrap && tableWrap.scrollTop !== scrollTop) tableWrap.scrollTop = scrollTop;
        var el = document.scrollingElement || document.documentElement;
        if (el && el.scrollTop !== docScrollTop) el.scrollTop = docScrollTop;
      });
    });
  }
  function debounceRatingSearch(fn, ms) {
    var t;
    return function () {
      var args = arguments;
      if (t) clearTimeout(t);
      t = setTimeout(function () { t = null; fn.apply(null, args); }, ms);
    };
  }
  if (isSpringRatingMode()) {
    if (tableCaptionRow) tableCaptionRow.style.display = "none";
    if (document.getElementById("winterRatingTableWrap")) document.getElementById("winterRatingTableWrap").style.display = "none";
    var winterShowAllWrap = document.getElementById("winterRatingShowAllWrap");
    if (winterShowAllWrap) winterShowAllWrap.style.display = "none";
    var winterSearchWrap = document.getElementById("winterRatingSearchWrap");
    if (winterSearchWrap) winterSearchWrap.style.display = "none";
    if (springLeaguesEl) { springLeaguesEl.removeAttribute("hidden"); springLeaguesEl.style.display = ""; }
    if (springMainTabsEl) { springMainTabsEl.removeAttribute("hidden"); springMainTabsEl.style.display = ""; }
    try {
      updateSpringRatingFinalCountdown();
    } catch (eCount) {
      if (typeof console !== "undefined" && console.warn) console.warn("updateSpringRatingFinalCountdown", eCount);
    }
  } else {
    if (tableCaptionRow) tableCaptionRow.style.display = "";
    if (document.getElementById("winterRatingTableWrap")) document.getElementById("winterRatingTableWrap").style.display = "";
    if (springLeaguesEl) { springLeaguesEl.setAttribute("hidden", ""); springLeaguesEl.style.display = "none"; }
    if (springMainTabsEl) { springMainTabsEl.setAttribute("hidden", ""); springMainTabsEl.style.display = "none"; }
    if (winterRatingShareBtn) { winterRatingShareBtn.style.display = ""; }
    var winterSearchWrapEl = document.getElementById("winterRatingSearchWrap");
    if (winterSearchWrapEl) winterSearchWrapEl.style.display = "";
  }
  function switchSpringRatingMainTab(league) {
    if (!springMainTabsEl || !springLeaguesEl) return;
    var tabs = springMainTabsEl.querySelectorAll(".winter-rating__spring-main-tab");
    var leagues = springLeaguesEl.querySelectorAll(".winter-rating__spring-league--main");
    for (var i = 0; i < tabs.length; i++) tabs[i].classList.toggle("winter-rating__spring-main-tab--active", tabs[i].dataset.springMainLeague === league);
    for (var j = 0; j < leagues.length; j++) leagues[j].style.display = leagues[j].getAttribute("data-spring-league") === league ? "" : "none";
  }
  window.switchSpringRatingMainTab = switchSpringRatingMainTab;
  if (springMainTabsEl && springMainTabsEl.getAttribute("data-inited") !== "1") {
    springMainTabsEl.setAttribute("data-inited", "1");
    springMainTabsEl.addEventListener("click", function (e) {
      var tab = e.target && e.target.closest ? e.target.closest(".winter-rating__spring-main-tab") : null;
      if (!tab || !tab.dataset.springMainLeague) return;
      var league = tab.dataset.springMainLeague;
      switchSpringRatingMainTab(league);
    });
  }
  if (document.body.getAttribute("data-rating-date-share-bound") !== "1") {
    document.body.setAttribute("data-rating-date-share-bound", "1");
    document.body.addEventListener("click", function (e) {
      var shareBtn = e.target && e.target.closest ? e.target.closest(".winter-rating__date-share-btn") : null;
      if (!shareBtn) return;
      var wrap = shareBtn.closest(".winter-rating__date-share");
      var dateStr = wrap && wrap.getAttribute("data-rating-date");
      if (!dateStr) return;
      e.preventDefault();
      e.stopPropagation();
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var isSpring = typeof isSpringRatingMode === "function" && isSpringRatingMode();
      var startApp = isSpring ? "spring_rating_date_" + String(dateStr).replace(/\./g, "_") : "rating_" + String(dateStr).replace(/\./g, "_");
      var link = typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink(startApp) : "";
      var msg = "Ссылка скопирована. Отправьте другу — откроется рейтинг за " + dateStr + ".";
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (typeof navigator.clipboard !== "undefined" && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link).then(function () {
          if (tg && tg.showAlert) tg.showAlert(msg); else alert("Ссылка скопирована.");
        }).catch(function () {
          if (tg && tg.showAlert) tg.showAlert("Ссылка: " + link); else alert("Ссылка: " + link);
        });
      } else {
        if (tg && tg.showAlert) tg.showAlert("Ссылка: " + link); else alert("Ссылка: " + link);
      }
    }, true);
  }
  if (document.body.getAttribute("data-spring-league-share-bound") !== "1") {
    document.body.setAttribute("data-spring-league-share-bound", "1");
    document.body.addEventListener("click", function (e) {
      var shareBtn = e.target && e.target.closest ? e.target.closest(".winter-rating__spring-league-share") : null;
      if (!shareBtn || !shareBtn.dataset.springLeague) return;
      e.preventDefault();
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var link =
        typeof buildMiniAppStartLink === "function"
          ? buildMiniAppStartLink("spring_rating_league_" + shareBtn.dataset.springLeague)
          : "";
      var msg = shareBtn.dataset.springLeague === "1" ? "Ссылка скопирована. Отправьте другу — откроется рейтинг Лиги 1." : "Ссылка скопирована. Отправьте другу — откроется рейтинг Лиги 2.";
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
  var allRows = [];
  try {
    allRows = getWinterRatingOverall();
  } catch (e) {
    if (typeof console !== "undefined" && console.error) console.error("getWinterRatingOverall", e);
  }
  if (!Array.isArray(allRows)) allRows = [];
  allRows = allRows.filter(function (r) {
    var p = r && r.points != null ? Number(r.points) : 0;
    var w = r && r.reward != null ? Number(r.reward) : 0;
    if (p !== p || !isFinite(p)) p = 0;
    if (w !== w || !isFinite(w)) w = 0;
    return p !== 0 || w !== 0;
  });
  var rows = [];
  try {
    for (var ri = 0; ri < allRows.length; ri++) {
      var r = allRows[ri];
      var rewardVal = r && r.reward != null ? Number(r.reward) : 0;
      if (rewardVal !== rewardVal || !isFinite(rewardVal)) rewardVal = 0;
      var rewardStr = formatRewardRound(rewardVal);
      var pointsVal = r && r.points != null ? Number(r.points) : 0;
      if (pointsVal !== pointsVal || !isFinite(pointsVal)) pointsVal = 0;
      if (pointsVal === 0 && rewardVal === 0) continue;
      rows.push({
        place: rows.length + 1,
        nick: r && r.nick != null ? String(r.nick) : "",
        points: pointsVal,
        reward: rewardStr
      });
    }
  } catch (e) {
    if (typeof console !== "undefined" && console.error) console.error("winter rating rows map", e);
  }
  if (isSpringRatingMode()) {
    var league1Body = document.getElementById("winterRatingLeague1Body");
    var league2Body = document.getElementById("winterRatingLeague2Body");
    var league1PrizesByPlace = { 1: 100000, 2: 50000, 3: 25000, 4: 10000, 5: 5000 };
    var league2PrizesByPlace = { 1: 30000, 2: 15000, 3: 7500, 4: 5000, 5: 2500 };
    function renderLeagueRows(leagueNum, bodyEl) {
      if (!bodyEl) return;
      var raw = [];
      try { raw = getSpringRatingOverallByLeague(leagueNum); } catch (e) {}
      if (!Array.isArray(raw)) raw = [];
      var leagueRows = [];
      for (var ri = 0; ri < raw.length; ri++) {
        var r = raw[ri];
        var rewardVal = r && r.reward != null ? Number(r.reward) : 0;
        if (rewardVal !== rewardVal || !isFinite(rewardVal)) rewardVal = 0;
        var rewardStr = formatRewardRound(rewardVal);
        var pointsVal = r && r.points != null ? Number(r.points) : 0;
        if (pointsVal !== pointsVal || !isFinite(pointsVal)) pointsVal = 0;
        if (pointsVal === 0 && rewardVal === 0) continue;
        leagueRows.push({ place: leagueRows.length + 1, nick: r && r.nick != null ? String(r.nick) : "", points: pointsVal, reward: rewardStr });
      }
      var hasPrizeColumn = leagueNum === 1 || leagueNum === 2;
      var colspan = hasPrizeColumn ? 5 : 4;
      var prizesByPlace = leagueNum === 1 ? league1PrizesByPlace : leagueNum === 2 ? league2PrizesByPlace : null;
      var parts = [];
      for (var wi = 0; wi < leagueRows.length; wi++) {
        var row = leagueRows[wi];
        var place = row.place != null ? parseInt(row.place, 10) : wi + 1;
        if (place !== place) place = wi + 1;
        var trClass = winterRatingRowClass(place);
        var placeCell = winterRatingPlaceCell(place);
        var nickStr = row.nick != null ? String(row.nick) : "";
        var nickEsc = escapeHtmlRating(nickStr);
        var nickAttr = nickStr.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var prizeCell = "";
        if (hasPrizeColumn) {
          var prizeVal = prizesByPlace && prizesByPlace[place] != null ? prizesByPlace[place] : null;
          var prizeStr = prizeVal != null && prizeVal >= 1000 ? (prizeVal / 1000) + "К₽" : (prizeVal != null && prizeVal > 0 ? prizeVal + "₽" : "—");
          prizeCell = "<td class=\"winter-rating__td-prize\" title=\"" + (prizeVal ? formatRewardRound(prizeVal) + " ₽" : "—") + "\">" + prizeStr + "</td>";
        }
        parts.push("<tr" + (trClass ? " class=\"" + trClass + "\"" : "") + "><td>" + placeCell + "</td><td><button type=\"button\" class=\"winter-rating__nick-btn\" data-nick=\"" + nickAttr + "\">" + nickEsc + "</button></td><td>" + (row.points != null ? row.points : "") + "</td><td>" + (row.reward != null ? row.reward : "0") + "</td>" + prizeCell + "</tr>");
      }
      bodyEl.innerHTML = parts.length ? parts.join("") : "<tr><td colspan=\"" + colspan + "\" class=\"winter-rating__spring-placeholder\">Данные с 1 марта</td></tr>";
      bodyEl.removeEventListener("click", bodyEl._leagueNickClick);
      bodyEl._leagueNickClick = function (e) {
        var btn = e.target && e.target.closest && e.target.closest(".winter-rating__nick-btn");
        if (btn && btn.dataset.nick && typeof openWinterRatingPlayerModal === "function") openWinterRatingPlayerModal(btn.dataset.nick);
      };
      bodyEl.addEventListener("click", bodyEl._leagueNickClick);
    }
    function setupLeagueCollapse(bodyEl, leagueNum) {
      if (!bodyEl) return;
      var rows = bodyEl.querySelectorAll("tr");
      var tableWrap = bodyEl.parentElement && bodyEl.parentElement.parentElement;
      var showAllWrap = document.getElementById("winterRatingLeague" + leagueNum + "ShowAllWrap");
      var showAllBtn = showAllWrap && showAllWrap.querySelector(".winter-rating__show-all-btn--league");
      var searchWrap = document.getElementById("winterRatingLeague" + leagueNum + "SearchWrap");
      var searchInput = document.getElementById("winterRatingLeague" + leagueNum + "SearchInput");
      var hasData = rows.length > 0 && !bodyEl.querySelector(".winter-rating__spring-placeholder");
      if (searchWrap) searchWrap.style.display = hasData ? "" : "none";
      if (rows.length > 10 && tableWrap && showAllWrap && showAllBtn) {
        tableWrap.classList.add("winter-rating__table-wrap--collapsed");
        showAllWrap.style.display = "";
        showAllBtn.textContent = "Ещё";
        showAllBtn.onclick = function () {
          var scrollTop = tableWrap && tableWrap.scrollTop != null ? tableWrap.scrollTop : 0;
          var docScrollTop = (document.scrollingElement && document.scrollingElement.scrollTop) || document.documentElement.scrollTop || 0;
          if (tableWrap.classList.contains("winter-rating__table-wrap--collapsed")) {
            tableWrap.classList.remove("winter-rating__table-wrap--collapsed");
            showAllBtn.textContent = "Свернуть";
          } else {
            tableWrap.classList.add("winter-rating__table-wrap--collapsed");
            showAllBtn.textContent = "Ещё";
          }
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              if (tableWrap && tableWrap.scrollTop !== scrollTop) tableWrap.scrollTop = scrollTop;
              var el = document.scrollingElement || document.documentElement;
              if (el && el.scrollTop !== docScrollTop) el.scrollTop = docScrollTop;
            });
          });
        };
      } else if (showAllWrap) {
        showAllWrap.style.display = "none";
      }
      if (searchInput && bodyEl) {
        searchInput.value = "";
        var doFilter = debounceRatingSearch(function () { filterTableByNick(bodyEl, searchInput.value, tableWrap, showAllBtn); }, 120);
        searchInput.oninput = doFilter;
        searchInput.onkeydown = function (e) {
          if (e.key === "Escape") { searchInput.value = ""; searchInput.blur(); filterTableByNick(bodyEl, "", tableWrap, showAllBtn); }
        };
      }
    }
    renderLeagueRows(1, league1Body);
    renderLeagueRows(2, league2Body);
    setupLeagueCollapse(league1Body, 1);
    setupLeagueCollapse(league2Body, 2);
  }
  function buildSpringTop3PodiumHtml(rowsForPodium, titleText) {
    if (!rowsForPodium || rowsForPodium.length < 3) return "";
    var top3 = [rowsForPodium[1], rowsForPodium[0], rowsForPodium[2]];
    var places = [2, 1, 3];
    var podiumHtml = titleText ? "<div class=\"spring-rating-top3__title\">" + escapeHtmlRating(titleText) + "</div>" : "";
    podiumHtml += "<div class=\"spring-rating-top3__podium\">";
    for (var pj = 0; pj < 3; pj++) {
      var r = top3[pj];
      var place = places[pj];
      var nickStr = r && r.nick != null ? String(r.nick) : "";
      var nickEsc = escapeHtmlRating(nickStr);
      var nickAttr = nickStr.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      var initial = nickStr.length ? nickStr.charAt(0).toUpperCase() : "?";
      var pointsStr = r && r.points != null ? String(r.points) : "0";
      var rewardStr = r && r.reward != null ? String(r.reward) : "0";
      var rewardFormatted = rewardStr + " ₽";
      var placeClass = place === 1 ? "spring-rating-top3__card--first" : "";
      podiumHtml += "<div class=\"spring-rating-top3__card " + placeClass + "\"><span class=\"spring-rating-top3__rank\">#" + place + "</span><div class=\"spring-rating-top3__avatar\" aria-hidden=\"true\">" + initial + "</div><span class=\"spring-rating-top3__nick\">" + nickEsc + "</span><div class=\"spring-rating-top3__stats\"><span class=\"spring-rating-top3__points\">" + pointsStr + " баллов</span><span class=\"spring-rating-top3__reward\">" + rewardFormatted + "</span></div><button type=\"button\" class=\"spring-rating-top3__nick-btn\" data-nick=\"" + nickAttr + "\" aria-label=\"Подробнее: " + nickEsc + "\"></button></div>";
    }
    podiumHtml += "</div>";
    return podiumHtml;
  }
  var podiumEl = document.getElementById("springRatingTop3Podium");
  var podiumLeague1El = document.getElementById("springRatingTop3PodiumLeague1");
  var podiumLeague2El = document.getElementById("springRatingTop3PodiumLeague2");
  if (podiumEl || podiumLeague1El || podiumLeague2El) {
    var sectionEl = document.getElementById("winterRatingSection");
    if (sectionEl && sectionEl.getAttribute("data-spring-top3-inited") !== "1") {
      sectionEl.setAttribute("data-spring-top3-inited", "1");
      sectionEl.addEventListener("click", function (e) {
        var btn = e.target && e.target.closest && e.target.closest(".spring-rating-top3__nick-btn");
        if (btn && btn.dataset.nick && typeof openWinterRatingPlayerModal === "function") openWinterRatingPlayerModal(btn.dataset.nick);
      });
    }
    if (isSpringRatingMode()) {
      if (podiumEl) { podiumEl.setAttribute("hidden", ""); podiumEl.innerHTML = ""; }
      var league1Raw = [], league2Raw = [];
      try { league1Raw = getSpringRatingOverallByLeague(1); } catch (e) {}
      try { league2Raw = getSpringRatingOverallByLeague(2); } catch (e) {}
      var toPodiumRows = function (raw) {
        var list = [];
        for (var pi = 0; pi < raw.length && pi < 3; pi++) {
          var r = raw[pi];
          var rewardVal = r && r.reward != null ? Number(r.reward) : 0;
          list.push({ place: pi + 1, nick: r && r.nick != null ? String(r.nick) : "", points: r && r.points != null ? r.points : 0, reward: formatRewardRound(rewardVal) });
        }
        return list;
      };
      var rows1 = toPodiumRows(league1Raw), rows2 = toPodiumRows(league2Raw);
      if (podiumLeague1El) {
        if (rows1.length >= 3) {
          podiumLeague1El.removeAttribute("hidden");
          podiumLeague1El.innerHTML = buildSpringTop3PodiumHtml(rows1, "");
        } else { podiumLeague1El.setAttribute("hidden", ""); podiumLeague1El.innerHTML = ""; }
      }
      if (podiumLeague2El) {
        if (rows2.length >= 3) {
          podiumLeague2El.removeAttribute("hidden");
          podiumLeague2El.innerHTML = buildSpringTop3PodiumHtml(rows2, "");
        } else { podiumLeague2El.setAttribute("hidden", ""); podiumLeague2El.innerHTML = ""; }
      }
    } else {
      var rowsForPodium = rows;
      if (rowsForPodium.length >= 3 && podiumEl) {
        podiumEl.removeAttribute("hidden");
        podiumEl.innerHTML = buildSpringTop3PodiumHtml(rowsForPodium, "Рейтинг Зимы");
      } else if (podiumEl) {
        podiumEl.setAttribute("hidden", "");
        podiumEl.innerHTML = "";
      }
    }
  }
  if (tbody) {
    try {
      if (isSpringRatingMode() && rows.length === 0) {
        tbody.innerHTML = "<tr><td colspan=\"4\" class=\"winter-rating__spring-placeholder\"></td></tr>";
      } else {
        var htmlParts = [];
        for (var wi = 0; wi < rows.length; wi++) {
          var row = rows[wi];
          var place = row.place != null ? parseInt(row.place, 10) : wi + 1;
          if (place !== place) place = wi + 1;
          var trClass = winterRatingRowClass(place);
          var placeCell = winterRatingPlaceCell(place);
          var nickStr = row.nick != null ? String(row.nick) : "";
          var nickEsc = escapeHtmlRating(nickStr);
          var nickAttr = nickStr.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          htmlParts.push("<tr" + (trClass ? " class=\"" + trClass + "\"" : "") + "><td>" + placeCell + "</td><td><button type=\"button\" class=\"winter-rating__nick-btn\" data-nick=\"" + nickAttr + "\">" + nickEsc + "</button></td><td>" + (row.points != null ? row.points : "") + "</td><td>" + (row.reward != null ? row.reward : "0") + "</td></tr>");
        }
        tbody.innerHTML = htmlParts.join("");
      }
    } catch (e) {
      if (typeof console !== "undefined" && console.error) console.error("winter rating table render", e);
      tbody.innerHTML = "<tr><td colspan=\"4\">Ошибка отображения рейтинга</td></tr>";
    }
    tbody.addEventListener("click", function (e) {
      var btn = e.target && e.target.closest(".winter-rating__nick-btn");
      if (btn && btn.dataset.nick) openWinterRatingPlayerModal(btn.dataset.nick);
    });
    var tableWrap = document.getElementById("winterRatingTableWrap");
    var showAllWrap = document.getElementById("winterRatingShowAllWrap");
    var showAllBtn = document.getElementById("winterRatingShowAllBtn");
    if (rows.length > 10 && tableWrap && showAllWrap && showAllBtn) {
      tableWrap.classList.add("winter-rating__table-wrap--collapsed");
      showAllWrap.style.display = "";
      showAllBtn.textContent = "Ещё";
      showAllBtn.onclick = function () {
        var scrollTop = tableWrap && tableWrap.scrollTop != null ? tableWrap.scrollTop : 0;
        var docScrollTop = (document.scrollingElement && document.scrollingElement.scrollTop) || document.documentElement.scrollTop || 0;
        if (tableWrap.classList.contains("winter-rating__table-wrap--collapsed")) {
          tableWrap.classList.remove("winter-rating__table-wrap--collapsed");
          showAllBtn.textContent = "Свернуть";
        } else {
          tableWrap.classList.add("winter-rating__table-wrap--collapsed");
          showAllBtn.textContent = "Ещё";
        }
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            if (tableWrap && tableWrap.scrollTop !== scrollTop) tableWrap.scrollTop = scrollTop;
            var el = document.scrollingElement || document.documentElement;
            if (el && el.scrollTop !== docScrollTop) el.scrollTop = docScrollTop;
          });
        });
      };
    } else if (showAllWrap) {
      showAllWrap.style.display = "none";
    }
  }
  var winterSearchInput = document.getElementById("winterRatingSearchInput");
  var winterTableWrap = document.getElementById("winterRatingTableWrap");
  if (winterSearchInput && tbody) {
    var winterDoFilter = debounceRatingSearch(function () {
      filterTableByNick(tbody, winterSearchInput.value, winterTableWrap, document.getElementById("winterRatingShowAllBtn"));
    }, 120);
    winterSearchInput.addEventListener("input", winterDoFilter);
    winterSearchInput.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { winterSearchInput.value = ""; winterSearchInput.blur(); filterTableByNick(tbody, "", winterTableWrap, document.getElementById("winterRatingShowAllBtn")); }
    });
  }
  var datesContainer = document.getElementById("winterRatingDates");
  if (!datesContainer) return;
  var alreadyInited = datesContainer.getAttribute("data-rating-inited") === "1";
  if (!alreadyInited) {
    datesContainer.setAttribute("data-rating-inited", "1");
    datesContainer.addEventListener("click", function (e) {
      var cell = e.target && e.target.closest ? e.target.closest(".winter-rating__screenshot") : null;
      if (!cell) return;
      var screensWrap = cell.parentElement;
      if (!screensWrap || !screensWrap.classList || !screensWrap.classList.contains("winter-rating__screenshots")) return;
      var dateStr = screensWrap.getAttribute("data-rating-date");
      if (!dateStr) return;
      var leagueAttr = screensWrap.getAttribute("data-league");
      var leagueNum = leagueAttr === "1" || leagueAttr === "2" ? parseInt(leagueAttr, 10) : undefined;
      var siblings = screensWrap.querySelectorAll(".winter-rating__screenshot");
      var idx = Array.prototype.indexOf.call(siblings, cell);
      if (idx < 0) return;
      e.preventDefault();
      if (typeof openWinterRatingLightbox === "function") openWinterRatingLightbox(dateStr, idx, leagueNum);
    });
  }
  var dateItems = datesContainer.querySelectorAll(".winter-rating__date-item");
  var byDate = getRatingByDate();
  if (typeof byDate === "object" && Object.keys(byDate).length) {
    var dates = Object.keys(byDate).sort(function (a, b) {
      var pa = a.split("."), pb = b.split(".");
      var ka = (pa[2] || "") + (pa[1] || "") + (pa[0] || "");
      var kb = (pb[2] || "") + (pb[1] || "") + (pb[0] || "");
      return kb.localeCompare(ka);
    });
    var existingDates = Array.prototype.map.call(dateItems, function (it) { return it.getAttribute("data-rating-date"); });
    var missingDates = dates.filter(function (d) { return existingDates.indexOf(d) === -1; });
    if (missingDates.length) {
      var firstExisting = datesContainer.querySelector(".winter-rating__date-item");
      missingDates.forEach(function (dateStr) {
        var parts = dateStr.split(".");
        var slug = (parts[0] || "") + (parts[1] || "");
        var item = document.createElement("div");
        item.className = "winter-rating__date-item";
        item.setAttribute("data-rating-date", dateStr);
        var panelInner = isSpringRatingMode()
          ? "<div class=\"spring-rating-date-leagues\">" +
            "<div class=\"spring-rating-date-league-tabs\"><button type=\"button\" class=\"spring-rating-date-league-tab spring-rating-date-league-tab--active\" data-league=\"1\">Лига 1</button><button type=\"button\" class=\"spring-rating-date-league-tab\" data-league=\"2\">Лига 2</button></div>" +
            "<div class=\"spring-rating-date-league spring-rating-date-league--1\" data-league=\"1\">" +
            "<div class=\"winter-rating__screenshots\" data-rating-date=\"" + dateStr + "\" data-league=\"1\"></div>" +
            "<div class=\"winter-rating__date-tournaments-list\" data-rating-date=\"" + dateStr + "\" data-league=\"1\"></div>" +
            "<div class=\"winter-rating__date-table-wrap spring-rating-date-table\" data-rating-date=\"" + dateStr + "\" data-league=\"1\"></div></div>" +
            "<div class=\"spring-rating-date-league spring-rating-date-league--2\" data-league=\"2\" style=\"display:none\">" +
            "<div class=\"winter-rating__screenshots\" data-rating-date=\"" + dateStr + "\" data-league=\"2\"></div>" +
            "<div class=\"winter-rating__date-tournaments-list\" data-rating-date=\"" + dateStr + "\" data-league=\"2\"></div>" +
            "<div class=\"winter-rating__date-table-wrap spring-rating-date-table\" data-rating-date=\"" + dateStr + "\" data-league=\"2\"></div></div></div>"
          : "<div class=\"winter-rating__screenshots\" data-rating-date=\"" + dateStr + "\"></div><div class=\"winter-rating__date-table-wrap\" id=\"winterRatingDateTable" + slug + "\"></div>";
        var shareIcon = "<span class=\"winter-rating__share-icon\" aria-hidden=\"true\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"/><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"/></svg></span>";
        var shareHtml = "<div class=\"winter-rating__date-share\" data-rating-date=\"" + (dateStr || "") + "\"><button type=\"button\" class=\"winter-rating__share-btn winter-rating__share-btn--copy-icon winter-rating__date-share-btn\" aria-label=\"Скопировать ссылку на рейтинг за " + (dateStr || "") + "\">" + shareIcon + "</button></div>";
        item.innerHTML = "<button type=\"button\" class=\"winter-rating__date-btn\" aria-expanded=\"false\" aria-controls=\"winterRatingPanel" + slug + "\">" + dateStr + "</button>" +
          "<div class=\"winter-rating__date-panel winter-rating__date-panel--hidden\" id=\"winterRatingPanel" + slug + "\" role=\"region\" aria-label=\"Рейтинг на " + dateStr + "\">" + panelInner + shareHtml + "</div>";
        var insertBefore = null;
        for (var i = 0; i < dates.length; i++) {
          if (dates[i] === dateStr && i + 1 < dates.length) {
            var nextDate = dates[i + 1];
            var nextEl = datesContainer.querySelector(".winter-rating__date-item[data-rating-date=\"" + nextDate + "\"]");
            if (nextEl) { insertBefore = nextEl; break; }
          }
        }
        if (insertBefore) datesContainer.insertBefore(item, insertBefore);
        else datesContainer.appendChild(item);
      });
      dateItems = datesContainer.querySelectorAll(".winter-rating__date-item");
    }
  }
  function fillScreensForDate(container, dStr, leagueNum) {
    if (!container) return;
    var files = leagueNum != null
      ? (getSpringRatingImagesByLeague(leagueNum)[dStr] || [])
      : (getRatingImages()[dStr] || []);
    if (!files || !files.length) return;
    var cacheV = "v=18";
    container.innerHTML = files.map(function (f, i) {
      return "<div class=\"winter-rating__screenshot\" role=\"button\" tabindex=\"0\"><img src=\"" + getAssetUrl(f) + "?" + cacheV + "\" alt=\"Скрин рейтинга " + dStr + " (" + (i + 1) + ")\" loading=\"lazy\" /></div>";
    }).join("");
    container.querySelectorAll(".winter-rating__screenshot").forEach(function (cell, idx) {
      var openLightbox = function (e) {
        if (e) e.preventDefault();
        openWinterRatingLightbox(dStr, idx, leagueNum);
      };
      cell.addEventListener("click", openLightbox);
      cell.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(); }
      });
    });
  }
  function fillSpringLeagueBlocks(leaguesWrap, dateStr) {
    if (!leaguesWrap || leaguesWrap.getAttribute("data-spring-filled") === "1") return;
    [1, 2].forEach(function (leagueNum) {
      var block = leaguesWrap.querySelector(".spring-rating-date-league--" + leagueNum);
      if (!block) return;
      var screensEl = block.querySelector(".winter-rating__screenshots[data-league=\"" + leagueNum + "\"]");
      var tournamentsEl = block.querySelector(".winter-rating__date-tournaments-list[data-league=\"" + leagueNum + "\"]");
      var tableEl = block.querySelector(".winter-rating__date-table-wrap[data-league=\"" + leagueNum + "\"]");
      if (screensEl) fillScreensForDate(screensEl, dateStr, leagueNum);
      if (tournamentsEl) {
        var label = leagueNum === 1 ? "Лига 1. Турниры от 500₽" : "Лига 2. Турниры от 100₽ до 500₽";
        tournamentsEl.innerHTML = "<p class=\"winter-rating__date-tournaments-caption\">" + label + "</p>";
      }
      if (tableEl) {
        var rows = getSpringRatingRowsForDateLeague(dateStr, leagueNum);
        tableEl.innerHTML = rows && rows.length ? renderWinterRatingTable(rows) : "<p class=\"winter-rating__spring-placeholder\">Нет данных за эту дату</p>";
      }
    });
    leaguesWrap.setAttribute("data-spring-filled", "1");
  }
  try {
    window.__pokerFillSpringDateLeagues = fillSpringLeagueBlocks;
  } catch (eSpringFill) {}
  dateItems.forEach(function (item) {
    try {
      var dateStr = item.getAttribute("data-rating-date");
      var btn = item.querySelector(".winter-rating__date-btn");
      var panel = item.querySelector(".winter-rating__date-panel");
      var leaguesWrap = panel && panel.querySelector(".spring-rating-date-leagues");
      var tableWrap = item.querySelector(".winter-rating__date-table-wrap:not(.spring-rating-date-table)");
      var screensContainer = item.querySelector(".winter-rating__screenshots:not([data-league])");
      if (!btn || !panel) return;
      if (leaguesWrap) {
        [1, 2].forEach(function (leagueNum) {
          var block = leaguesWrap.querySelector(".spring-rating-date-league--" + leagueNum);
          if (!block) return;
          var tournamentsEl = block.querySelector(".winter-rating__date-tournaments-list[data-league=\"" + leagueNum + "\"]");
          if (tournamentsEl) {
            var capLabel = leagueNum === 1 ? "Лига 1. Турниры от 500₽" : "Лига 2. Турниры от 100₽ до 500₽";
            tournamentsEl.innerHTML = "<p class=\"winter-rating__date-tournaments-caption\">" + capLabel + "</p>";
          }
        });
        if (leaguesWrap.getAttribute("data-tabs-bound") !== "1") {
          leaguesWrap.setAttribute("data-tabs-bound", "1");
          leaguesWrap.addEventListener("click", function (e) {
            var tab = e.target && e.target.closest ? e.target.closest(".spring-rating-date-league-tab") : null;
            if (!tab) return;
            e.preventDefault();
            e.stopPropagation();
            var league = tab.getAttribute("data-league");
            leaguesWrap.querySelectorAll(".spring-rating-date-league-tab").forEach(function (t) { t.classList.toggle("spring-rating-date-league-tab--active", t.getAttribute("data-league") === league); });
            leaguesWrap.querySelectorAll(".spring-rating-date-league").forEach(function (b) { b.style.display = b.getAttribute("data-league") === league ? "" : "none"; });
          });
        }
      } else {
        var data = getRatingByDate()[dateStr];
        if (data && data.length && tableWrap && !tableWrap.innerHTML) tableWrap.innerHTML = renderWinterRatingTable(data);
        if (screensContainer) fillScreensForDate(screensContainer, dateStr);
      }
      var shareWrap = panel.querySelector(".winter-rating__date-share");
      if (!shareWrap) {
        shareWrap = document.createElement("div");
        shareWrap.className = "winter-rating__date-share";
        shareWrap.setAttribute("data-rating-date", dateStr || "");
        var shareIcon = "<span class=\"winter-rating__share-icon\" aria-hidden=\"true\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"/><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"/></svg></span>";
        shareWrap.innerHTML = "<button type=\"button\" class=\"winter-rating__share-btn winter-rating__share-btn--copy-icon winter-rating__date-share-btn\" aria-label=\"Скопировать ссылку на рейтинг за " + (dateStr || "") + "\">" + shareIcon + "</button>";
        panel.appendChild(shareWrap);
      }
      if (!alreadyInited) {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          var scrollY = window.scrollY || window.pageYOffset;
          panel.classList.toggle("winter-rating__date-panel--hidden");
          var open = !panel.classList.contains("winter-rating__date-panel--hidden");
          btn.setAttribute("aria-expanded", open ? "true" : "false");
          if (open) {
            if (leaguesWrap) {
              fillSpringLeagueBlocks(leaguesWrap, dateStr);
            } else if (screensContainer) fillScreensForDate(screensContainer, dateStr);
          }
          requestAnimationFrame(function () { window.scrollTo(0, scrollY); });
        });
      }
    } catch (err) {
      if (typeof console !== "undefined" && console.error) console.error("winter rating date item", err);
    }
  });
  var calendarWrap = document.getElementById("winterRatingCalendarWrap");
  if (calendarWrap && dateItems.length) {
    var availableDates = Array.prototype.map.call(dateItems, function (it) { return it.getAttribute("data-rating-date"); });
    var monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    var monthSet = {};
    availableDates.forEach(function (d) {
      var p = d ? d.split(".") : [];
      if (p.length >= 3) {
        var y = parseInt(p[2], 10);
        var m = parseInt(p[1], 10);
        if (y && m) monthSet[y + "-" + (m < 10 ? "0" + m : m)] = { year: y, month: m };
      }
    });
    var availableMonths = Object.keys(monthSet).sort(function (a, b) {
      return b.localeCompare(a);
    }).map(function (k) { return monthSet[k]; });
    if (isSpringRatingMode()) {
      var springByDate = getSpringRatingTournamentsByDate();
      var springKeys = typeof springByDate === "object" && springByDate ? Object.keys(springByDate) : [];
      availableDates = springKeys
        .filter(function (d) { return /\.2026$/.test(d); })
        .sort(function (a, b) { return winterRatingDateKeyToStamp(b) - winterRatingDateKeyToStamp(a); });
      var monthSetSpring = {};
      availableDates.forEach(function (d) {
        var p = d ? d.split(".") : [];
        if (p.length >= 3) {
          var y = parseInt(p[2], 10);
          var m = parseInt(p[1], 10);
          if (y && m) monthSetSpring[y + "-" + (m < 10 ? "0" + m : m)] = { year: y, month: m };
        }
      });
      availableMonths = Object.keys(monthSetSpring)
        .sort(function (a, b) { return b.localeCompare(a); })
        .map(function (k) { return monthSetSpring[k]; });
    }
    if (!availableMonths.length) return;
    calendarWrap._availableMonths = availableMonths;
    calendarWrap._availableDates = availableDates;
    calendarWrap._calendarMonthIndex = typeof calendarWrap._calendarMonthIndex === "number" ? calendarWrap._calendarMonthIndex : 0;
    if (calendarWrap._calendarMonthIndex >= availableMonths.length) calendarWrap._calendarMonthIndex = availableMonths.length - 1;
    if (calendarWrap._calendarMonthIndex < 0) calendarWrap._calendarMonthIndex = 0;
    var dateModal = document.getElementById("winterRatingDateModal");
    var dateModalBackdrop = document.getElementById("winterRatingDateModalBackdrop");
    var dateModalClose = document.getElementById("winterRatingDateModalClose");
    var dateModalTitle = document.getElementById("winterRatingDateModalTitle");
    var dateModalBody = document.getElementById("winterRatingDateModalBody");
    function openDateModal(dateStr, panel) {
      if (!dateModal || !dateModalBody || !panel) return;
      var lwModal = panel.querySelector(".spring-rating-date-leagues");
      if (lwModal && typeof window.__pokerFillSpringDateLeagues === "function") window.__pokerFillSpringDateLeagues(lwModal, dateStr);
      dateModalBody.innerHTML = "";
      var clone = panel.cloneNode(true);
      clone.classList.remove("winter-rating__date-panel--hidden");
      dateModalBody.appendChild(clone);
      var cloneLeaguesWrap = clone.querySelector(".spring-rating-date-leagues");
      if (cloneLeaguesWrap) {
        cloneLeaguesWrap.addEventListener("click", function (e) {
          var tab = e.target && e.target.closest ? e.target.closest(".spring-rating-date-league-tab") : null;
          if (!tab) return;
          e.preventDefault();
          e.stopPropagation();
          var league = tab.getAttribute("data-league");
          cloneLeaguesWrap.querySelectorAll(".spring-rating-date-league-tab").forEach(function (t) { t.classList.toggle("spring-rating-date-league-tab--active", t.getAttribute("data-league") === league); });
          cloneLeaguesWrap.querySelectorAll(".spring-rating-date-league").forEach(function (b) { b.style.display = b.getAttribute("data-league") === league ? "" : "none"; });
        });
      }
      dateModalBody.querySelectorAll(".winter-rating__screenshot").forEach(function (cell) {
        var screensWrap = cell.parentElement;
        if (!screensWrap || !screensWrap.classList || !screensWrap.classList.contains("winter-rating__screenshots")) return;
        var dStr = screensWrap.getAttribute("data-rating-date") || dateStr;
        var leagueAttr = screensWrap.getAttribute("data-league");
        var leagueNum = leagueAttr === "1" || leagueAttr === "2" ? parseInt(leagueAttr, 10) : undefined;
        var siblings = screensWrap.querySelectorAll(".winter-rating__screenshot");
        var idx = Array.prototype.indexOf.call(siblings, cell);
        if (idx < 0 || typeof openWinterRatingLightbox !== "function") return;
        var handler = function (e) {
          if (e) e.preventDefault();
          openWinterRatingLightbox(dStr, idx, leagueNum);
        };
        cell.addEventListener("click", handler);
        cell.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handler(); }
        });
      });
      if (dateModalTitle) dateModalTitle.textContent = "Рейтинг на " + dateStr;
      dateModal.setAttribute("aria-hidden", "false");
      if (document.body) document.body.style.overflow = "hidden";
    }
    function closeDateModal() {
      if (!dateModal) return;
      dateModal.setAttribute("aria-hidden", "true");
      if (document.body) document.body.style.overflow = "";
    }
    if (dateModalBackdrop) dateModalBackdrop.addEventListener("click", closeDateModal);
    if (dateModalClose) dateModalClose.addEventListener("click", closeDateModal);
    function renderCalendarMonth(monthIndex) {
      calendarWrap._calendarMonthIndex = monthIndex;
      var am = calendarWrap._availableMonths;
      var avail = calendarWrap._availableDates;
      if (monthIndex < 0 || monthIndex >= am.length) return;
      var yearNum = am[monthIndex].year;
      var monthNum = am[monthIndex].month;
      var monthLabel = (monthNames[monthNum - 1] || "") + " " + yearNum;
      var firstDay = new Date(yearNum, monthNum - 1, 1);
      var dow = firstDay.getDay();
      var monFirst = (dow + 6) % 7;
      var daysInMonth = new Date(yearNum, monthNum, 0).getDate();
      var cells = [];
      var i;
      for (i = 0; i < monFirst; i++) cells.push({ empty: true });
      for (i = 1; i <= daysInMonth; i++) {
        var d = i < 10 ? "0" + i : "" + i;
        var m = monthNum < 10 ? "0" + monthNum : "" + monthNum;
        var dateStr = d + "." + m + "." + yearNum;
        cells.push({ empty: false, day: i, dateStr: dateStr, hasData: avail.indexOf(dateStr) !== -1 });
      }
      var weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
      var headerRow = "<div class=\"winter-rating__calendar-weekdays\">" + weekdays.map(function (w) { return "<span class=\"winter-rating__calendar-wday\">" + w + "</span>"; }).join("") + "</div>";
      var rowHtml = "";
      var rowsHtml = "";
      for (i = 0; i < cells.length; i++) {
        if (i > 0 && i % 7 === 0) {
          rowsHtml += "<div class=\"winter-rating__calendar-row\">" + rowHtml + "</div>";
          rowHtml = "";
        }
        var cell = cells[i];
        if (cell.empty) {
          rowHtml += "<span class=\"winter-rating__calendar-cell winter-rating__calendar-cell--empty\"></span>";
        } else if (cell.hasData) {
          rowHtml += "<button type=\"button\" class=\"winter-rating__calendar-cell winter-rating__calendar-cell--day\" data-rating-date=\"" + cell.dateStr.replace(/"/g, "&quot;") + "\" aria-label=\"Рейтинг на " + cell.dateStr + "\">" + cell.day + "</button>";
        } else {
          rowHtml += "<span class=\"winter-rating__calendar-cell winter-rating__calendar-cell--no-data\" aria-hidden=\"true\">" + cell.day + "</span>";
        }
      }
      if (cells.length % 7 !== 0) {
        for (i = cells.length % 7; i < 7; i++) rowHtml += "<span class=\"winter-rating__calendar-cell winter-rating__calendar-cell--empty\"></span>";
      }
      rowsHtml += "<div class=\"winter-rating__calendar-row\">" + rowHtml + "</div>";
      var canPrev = monthIndex < am.length - 1;
      var canNext = monthIndex > 0;
      var prevBtn = "<button type=\"button\" class=\"winter-rating__calendar-nav winter-rating__calendar-nav--prev\" aria-label=\"Предыдущий месяц\"" + (canPrev ? "" : " disabled") + ">←</button>";
      var nextBtn = "<button type=\"button\" class=\"winter-rating__calendar-nav winter-rating__calendar-nav--next\" aria-label=\"Следующий месяц\"" + (canNext ? "" : " disabled") + ">→</button>";
      var titleRow = "<div class=\"winter-rating__calendar-title-row\">" + prevBtn + "<span class=\"winter-rating__calendar-title\">" + monthLabel + "</span>" + nextBtn + "</div>";
      calendarWrap.innerHTML = "<div class=\"winter-rating__calendar\">" + titleRow + headerRow + "<div class=\"winter-rating__calendar-grid\">" + rowsHtml + "</div></div>";
      calendarWrap.querySelectorAll(".winter-rating__calendar-cell--day").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          var dateStr = btn.getAttribute("data-rating-date");
          var item = datesContainer.querySelector(".winter-rating__date-item[data-rating-date=\"" + dateStr + "\"]");
          if (!item) return;
          var panel = item.querySelector(".winter-rating__date-panel");
          if (panel) openDateModal(dateStr, panel);
        });
      });
      var prevEl = calendarWrap.querySelector(".winter-rating__calendar-nav--prev");
      var nextEl = calendarWrap.querySelector(".winter-rating__calendar-nav--next");
      if (prevEl && canPrev) prevEl.addEventListener("click", function () { renderCalendarMonth(monthIndex + 1); });
      if (nextEl && canNext) nextEl.addEventListener("click", function () { renderCalendarMonth(monthIndex - 1); });
    }
    renderCalendarMonth(calendarWrap._calendarMonthIndex);
    calendarWrap.setAttribute("aria-hidden", "false");
  }
}

function fetchRaffleBadge() {
  var base = getApiBase();
  if (!base) return;
  var q = pokerRafflesApiQueryLeading();
  if (q === "?initData=" && !pokerCanSyncGuestProfileToServer()) return;
  fetch(base + "/api/raffles" + q + "&_t=" + Date.now())
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (data && data.ok) {
        updateRaffleBadge(!!(data.activeRaffle));
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
