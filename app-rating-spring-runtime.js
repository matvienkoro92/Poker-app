// Spring rating runtime: spring-specific totals, league rows, modals, and scroll controls.

function pluralRuDays(n) {
  var abs = Math.abs(n) % 100;
  var d = abs % 10;
  if (abs >= 11 && abs <= 14) return "дней";
  if (d === 1) return "день";
  if (d >= 2 && d <= 4) return "дня";
  return "дней";
}

function getActiveRatingSeasonConfigSafe() {
  if (typeof getRatingSeasonConfig === "function") return getRatingSeasonConfig();
  return typeof SPRING_RATING_SEASON !== "undefined" ? SPRING_RATING_SEASON : {};
}

function getActiveRatingSeasonViewMonths() {
  var config = getActiveRatingSeasonConfigSafe();
  if (config && Array.isArray(config.viewMonths)) return config.viewMonths;
  return [
    {
      title: "Май",
      totalId: "springRatingViewMayTotal",
      weeksHostId: "springRatingViewMayWeeks",
      blocks: typeof SPRING_VIEW_MAY_WEEK_BLOCKS !== "undefined" ? SPRING_VIEW_MAY_WEEK_BLOCKS : [],
    },
    {
      title: "Апрель",
      totalId: "springRatingViewAprilTotal",
      weeksHostId: "springRatingViewAprilWeeks",
      blocks: typeof SPRING_VIEW_APRIL_WEEK_BLOCKS !== "undefined" ? SPRING_VIEW_APRIL_WEEK_BLOCKS : [],
    },
    {
      title: "Март",
      totalId: "springRatingViewMarchTotal",
      weeksHostId: "springRatingViewMarchWeeks",
      blocks: typeof SPRING_VIEW_MARCH_WEEK_BLOCKS !== "undefined" ? SPRING_VIEW_MARCH_WEEK_BLOCKS : [],
    },
  ];
}

function getActiveRatingSeasonDates(kind) {
  var config = getActiveRatingSeasonConfigSafe();
  var field = kind === "past" ? "pastWeekDates" : kind === "current" ? "currentWeekDates" : "nextWeekDates";
  if (config && Array.isArray(config[field])) return config[field];
  if (kind === "past") return typeof MARCH_PAST_WEEK_DATES !== "undefined" ? MARCH_PAST_WEEK_DATES : [];
  if (kind === "current") return typeof MARCH_CURRENT_WEEK_DATES !== "undefined" ? MARCH_CURRENT_WEEK_DATES : [];
  return typeof MARCH_NEXT_WEEK_DATES !== "undefined" ? MARCH_NEXT_WEEK_DATES : [];
}

function getActiveRatingSeasonMonthRegex() {
  if (typeof getRatingSeasonMonthRegex === "function") return getRatingSeasonMonthRegex();
  var config = getActiveRatingSeasonConfigSafe();
  return config && config.monthRegex ? config.monthRegex : /\.(03|04|05)\.2026$/;
}

function getActiveRatingSeasonScrollBtn() {
  var config = getActiveRatingSeasonConfigSafe();
  var id = config && config.scrollBtnId ? config.scrollBtnId : "springRatingViewScrollBtn";
  return document.getElementById(id);
}

function getActiveRatingSeasonViewName() {
  var config = getActiveRatingSeasonConfigSafe();
  return config && config.view ? config.view : "spring-rating";
}

function updateSpringRatingFinalCountdown() {
  var els = document.querySelectorAll(".spring-rating-final-countdown__days");
  if (!els.length) return;
  var config = getActiveRatingSeasonConfigSafe();
  var end = config && config.finalAt instanceof Date ? config.finalAt : new Date(2026, 4, 31, 23, 59, 59, 999);
  var now = new Date();
  var diffMs = end.getTime() - now.getTime();
  var days = diffMs <= 0 ? 0 : Math.ceil(diffMs / (24 * 60 * 60 * 1000));
  var text = days <= 0 ? "сезон завершён" : days + " " + pluralRuDays(days);
  for (var i = 0; i < els.length; i++) els[i].textContent = text;
  var finalLines = document.querySelectorAll(".spring-rating-final-countdown__line:first-child");
  var finalText = config && config.finalText ? config.finalText : "Итоги 31-го мая";
  for (var j = 0; j < finalLines.length; j++) finalLines[j].textContent = finalText;
}

function getSpringRatingTournamentsByDate() {
  if (typeof pokerRatingGetSpringTournamentsByDate === "function") return pokerRatingGetSpringTournamentsByDate();
  return typeof SPRING_RATING_TOURNAMENTS_BY_DATE !== "undefined" ? SPRING_RATING_TOURNAMENTS_BY_DATE : {};
}

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

function updateSpringRatingHomePromoStats() {
  var wrap = document.getElementById("springRatingHomePromoStats");
  var viewWrap = document.getElementById("springRatingViewTotals");
  if (!wrap && !viewWrap) return;
  try {
    var tournamentsByDate = getSpringRatingTournamentsByDate();
    if (!tournamentsByDate || typeof tournamentsByDate !== "object") {
      if (wrap) wrap.setAttribute("hidden", "");
      if (viewWrap) viewWrap.setAttribute("hidden", "");
      return;
    }
    var fmt = typeof formatRewardRound === "function" ? formatRewardRound : function (n) { return String(Math.round(Number(n) || 0)); };
    var months = getActiveRatingSeasonViewMonths();
    function collectDates(blocks) {
      var seen = {};
      var dates = [];
      (blocks || []).forEach(function (block) {
        (block && Array.isArray(block.dates) ? block.dates : []).forEach(function (dateStr) {
          if (dateStr && !seen[dateStr]) {
            seen[dateStr] = 1;
            dates.push(dateStr);
          }
        });
      });
      return dates;
    }
    months.forEach(function (month) {
      var totalEl = month && month.totalId ? document.getElementById(month.totalId) : null;
      var sum = getSpringRatingTotalRewardSumForDates(collectDates(month && month.blocks));
      if (totalEl) totalEl.textContent = sum > 0 ? fmt(sum) + " ₽" : "—";
    });
    var aprTot = document.getElementById("springRatingHomePromoAprilTotal");
    var marTot = document.getElementById("springRatingHomePromoMarchTotal");
    var w1 = document.getElementById("springRatingHomePromoMarchW1");
    var w2 = document.getElementById("springRatingHomePromoMarchW2");
    var w3 = document.getElementById("springRatingHomePromoMarchW3");
    var w4 = document.getElementById("springRatingHomePromoMarchW4");
    var w5 = document.getElementById("springRatingHomePromoMarchW5");
    var aprSum = getSpringRatingTotalRewardSumForDates(typeof SPRING_HOME_APRIL_PROMO_TOTAL_DATES !== "undefined" ? SPRING_HOME_APRIL_PROMO_TOTAL_DATES : []);
    var aprText = aprSum > 0 ? fmt(aprSum) + " ₽" : "—";
    if (aprTot) aprTot.textContent = aprText;
    var s1 = getSpringRatingTotalRewardSumForDates(typeof SPRING_HOME_MARCH_WEEK1_DATES !== "undefined" ? SPRING_HOME_MARCH_WEEK1_DATES : []);
    var s2 = getSpringRatingTotalRewardSumForDates(typeof MARCH_PAST_WEEK_DATES !== "undefined" ? MARCH_PAST_WEEK_DATES : []);
    var s3 = getSpringRatingTotalRewardSumForDates(typeof MARCH_NEXT_WEEK_DATES !== "undefined" ? MARCH_NEXT_WEEK_DATES : []);
    var s4 = getSpringRatingTotalRewardSumForDates(typeof MARCH_CURRENT_WEEK_DATES !== "undefined" ? MARCH_CURRENT_WEEK_DATES : []);
    var s5 = getSpringRatingTotalRewardSumForDates(typeof SPRING_HOME_MARCH_TAIL_DATES !== "undefined" ? SPRING_HOME_MARCH_TAIL_DATES : []);
    var marchAll = s1 + s2 + s3 + s4 + s5;
    var marText = marchAll > 0 ? fmt(marchAll) + " ₽" : "—";
    if (marTot) marTot.textContent = marText;
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

function renderSpringRatingViewTotalsWeeks() {
  var mayHost = document.getElementById("springRatingViewMayWeeks");
  var aprilHost = document.getElementById("springRatingViewAprilWeeks");
  var marchHost = document.getElementById("springRatingViewMarchWeeks");
  if (!mayHost || !aprilHost || !marchHost) return;
  if (typeof getSpringRatingWeekTopSumForDates !== "function") return;
  var fmt = typeof formatRewardRound === "function" ? formatRewardRound : function (n) { return String(Math.round(Number(n) || 0)); };
  function escNick(s) {
    return typeof escapeHtmlRating === "function" ? escapeHtmlRating(s) : String(s == null ? "" : s).replace(/</g, "&lt;");
  }
  function bindSpringRatingWeekMoreButtons(host) {
    if (!host || host.getAttribute("data-spring-rating-week-more-bound") === "1") return;
    host.setAttribute("data-spring-rating-week-more-bound", "1");
    host.addEventListener("click", function (e) {
      var btn = e.target && e.target.closest ? e.target.closest("[data-spring-rating-week-more]") : null;
      if (!btn || !host.contains(btn)) return;
      e.preventDefault();
      e.stopPropagation();
      var wrap = btn.closest ? btn.closest(".winter-rating__past-week-wrap") : null;
      if (!wrap) return;
      var expanded = btn.getAttribute("aria-expanded") !== "true";
      var extraRows = wrap.querySelectorAll(".spring-rating-view-week__extra-item");
      for (var i = 0; i < extraRows.length; i++) extraRows[i].hidden = !expanded;
      btn.setAttribute("aria-expanded", expanded ? "true" : "false");
      btn.textContent = expanded ? "Скрыть" : "Еще";
    });
  }
  bindSpringRatingWeekMoreButtons(mayHost);
  bindSpringRatingWeekMoreButtons(aprilHost);
  bindSpringRatingWeekMoreButtons(marchHost);
  function rowsFromTopData(data) {
    if (data && Array.isArray(data.top10) && data.top10.length) return data.top10;
    if (data && Array.isArray(data.top3)) return data.top3;
    return [];
  }
  function listHtml(rows) {
    if (!rows.length) return "<li class=\"winter-rating__single-top-item\">—</li>";
    return rows.slice(0, 10).map(function (r, i) {
      var extraClass = i >= 3 ? " spring-rating-view-week__extra-item" : "";
      var hiddenAttr = i >= 3 ? " hidden" : "";
      return "<li class=\"winter-rating__single-top-item" + extraClass + "\"" + hiddenAttr + ">" + (i + 1) + ". " + escNick(r.nick) + " — " + fmt(r.reward) + " ₽</li>";
    }).join("");
  }
  function moreButtonHtml(rows) {
    return rows.length > 3
      ? "<button type=\"button\" class=\"spring-rating-view-week__more-btn\" data-spring-rating-week-more aria-expanded=\"false\">Еще</button>"
      : "";
  }
  function weekDetailsHtml(block, openWeeks, monthTotals) {
    var dates = block.dates;
    if (!Array.isArray(dates)) dates = [];
    var sumData = getSpringRatingWeekTopSumForDates(dates);
    var winData = getSpringRatingWeekTopWinsForDates(dates);
    var totalWeek = sumData.totalWeek > 0 ? sumData.totalWeek : 0;
    var totalText = totalWeek > 0 ? fmt(totalWeek) + " ₽" : "—";
    var sumRows = rowsFromTopData(sumData);
    var winRows = rowsFromTopData(winData);
    var sumList = listHtml(sumRows);
    var winList = listHtml(winRows);
    var openAttr = openWeeks ? " open" : "";
    var sumTitle = monthTotals ? "Итого суммарный выигрыш за месяц" : "Топ суммарный выигрыш за неделю";
    var winTitle = monthTotals ? "Итого топ за 1 турнир за месяц" : "Топ занос за 1 турнир";
    var totalLabel = monthTotals ? "Всего выиграно игроками: " : "Всего выиграно игроками за неделю: ";
    var detailClass = "spring-rating-view-week" + (monthTotals ? " spring-rating-view-week--march-month spring-rating-view-week--month-total" : "");
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
      moreButtonHtml(sumRows) +
      "</div>" +
      "<div class=\"winter-rating__past-week-wrap winter-rating__single-top-wrap--march\">" +
      "<h4 class=\"winter-rating__past-week-title\">" + winTitle + "</h4>" +
      "<ul class=\"winter-rating__single-top-list\">" + winList + "</ul>" +
      moreButtonHtml(winRows) +
      "</div>" +
      "</div>" +
      "<p class=\"winter-rating__past-week-total winter-rating__past-week-total--below\">" + totalLabel + totalText + "</p>" +
      "</div>" +
      "</details>"
    );
  }
  var months = getActiveRatingSeasonViewMonths();
  function monthAt(index, fallbackTitle) {
    return months[index] || { title: fallbackTitle, blocks: [] };
  }
  var mayMonth = monthAt(0, "Май");
  var aprMonth = monthAt(1, "Апрель");
  var marMonth = monthAt(2, "Март");
  var mayBlocks = Array.isArray(mayMonth.blocks) ? mayMonth.blocks : [];
  var aprBlocks = Array.isArray(aprMonth.blocks) ? aprMonth.blocks : [];
  var marBlocks = Array.isArray(marMonth.blocks) ? marMonth.blocks : [];
  function setMonthPanelTitle(panelClass, title, suffix) {
    var titleEl = document.querySelector(panelClass + " .spring-rating-view-totals__month-title");
    if (!titleEl) return;
    titleEl.innerHTML = "<strong>" + escNick(title) + "</strong>" + (suffix || "");
  }
  setMonthPanelTitle(".spring-rating-view-totals-panel--may", mayMonth.title || "Май", "");
  setMonthPanelTitle(".spring-rating-view-totals-panel--april", aprMonth.title || "Апрель", "");
  setMonthPanelTitle(
    ".spring-rating-view-totals-panel--march",
    marMonth.title || "Март",
    typeof isSummerRatingMode === "function" && isSummerRatingMode() ? "" : " · итоги"
  );
  function collectMonthDates(blocks) {
    var seen = {};
    var dates = [];
    blocks.forEach(function (blk) {
      if (!Array.isArray(blk.dates)) return;
      blk.dates.forEach(function (d) {
        if (d && !seen[d]) {
          seen[d] = 1;
          dates.push(d);
        }
      });
    });
    return dates;
  }
  var mayAllDates = collectMonthDates(mayBlocks);
  var aprAllDates = collectMonthDates(aprBlocks);
  var marchAllDates = collectMonthDates(marBlocks);
  var mayMonthHtml = mayAllDates.length
    ? weekDetailsHtml({ label: "Итого", dates: mayAllDates }, false, true)
    : "";
  var aprMonthHtml = aprAllDates.length
    ? weekDetailsHtml({ label: "Итого", dates: aprAllDates }, false, true)
    : "";
  var marchMonthHtml = marchAllDates.length
    ? weekDetailsHtml({ label: "Итого", dates: marchAllDates }, false, true)
    : "";
  mayHost.innerHTML =
    mayMonthHtml +
    mayBlocks.map(function (b, i) {
      return weekDetailsHtml(b, i === 0, false);
    }).join("");
  aprilHost.innerHTML =
    aprMonthHtml +
    aprBlocks.map(function (b, i) {
      return weekDetailsHtml(b, i === 0, false);
    }).join("");
  marchHost.innerHTML =
    marchMonthHtml +
    marBlocks
      .map(function (b) {
        return weekDetailsHtml(b, false, false);
      })
      .join("");
}

function getSpringRatingMarchTopWins() {
  var tournamentsByDate = getSpringRatingTournamentsByDate() || {};
  var allWins = [];
  var seasonRegex = getActiveRatingSeasonMonthRegex();
  Object.keys(tournamentsByDate).forEach(function (dateStr) {
    if (seasonRegex && !seasonRegex.test(dateStr)) return;
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
  return { top3: sorted.slice(0, 3), top10: sorted.slice(0, 10), totalWeek: totalWeek };
}

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
  return { top3: allWins.slice(0, 3), top10: allWins.slice(0, 10), totalWeek: totalWeek };
}

function getSpringRatingPastWeekTopSum() {
  return getSpringRatingWeekTopSumForDates(getActiveRatingSeasonDates("past"));
}

function getSpringRatingPastWeekTopWins() {
  return getSpringRatingWeekTopWinsForDates(getActiveRatingSeasonDates("past"));
}

function getSpringRatingCurrentWeekTopSum() {
  return getSpringRatingWeekTopSumForDates(getActiveRatingSeasonDates("current"));
}

function getSpringRatingCurrentWeekTopWins() {
  return getSpringRatingWeekTopWinsForDates(getActiveRatingSeasonDates("current"));
}

function getSpringRatingNextWeekTopSum() {
  return getSpringRatingWeekTopSumForDates(getActiveRatingSeasonDates("next"));
}

function getSpringRatingNextWeekTopWins() {
  return getSpringRatingWeekTopWinsForDates(getActiveRatingSeasonDates("next"));
}

function getSpringRatingImagesByLeague(leagueNum) {
  if (typeof pokerRatingGetSpringImagesByLeague === "function") return pokerRatingGetSpringImagesByLeague(leagueNum);
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

function openSpringRatingInfoModal() {
  var modal = document.getElementById("springRatingInfoModal");
  if (!modal) return;
  initSpringRatingInfoModal();
  var config = getActiveRatingSeasonConfigSafe();
  var title = modal.querySelector(".spring-rating-info-modal__title");
  var subtitle = modal.querySelector(".spring-rating-info-modal__subtitle");
  if (title) title.textContent = config && config.key === "summer" ? "Рейтинг турнирщиков лета" : "Рейтинг турнирщиков весны";
  if (subtitle) subtitle.textContent = config && config.key === "summer" ? "Стартуем 1го июня" : "Стартуем 1го марта";
  modal.setAttribute("aria-label", config && config.key === "summer" ? "Рейтинг турнирщиков лета" : "Рейтинг турнирщиков весны");
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
  if (typeof isSpringRatingMode === "function" && isSpringRatingMode()) {
    var panel = document.querySelector("main.card .card__content") || document.querySelector(".card__content");
    if (panel) return panel;
  }
  var targets = getSpringRatingViewScrollTargets();
  return targets.length ? targets[0] : (document.scrollingElement || document.documentElement);
}

function getSpringRatingViewScrollTargets() {
  var viewName = getActiveRatingSeasonViewName();
  var view = document.querySelector(".view--active[data-view=\"" + viewName + "\"]") || document.getElementById(viewName === "summer-rating" ? "summerRatingView" : "springRatingView");
  var cardContent = view && view.closest ? view.closest(".card__content") : null;
  var card = view && view.closest ? view.closest(".card") : null;
  var candidates = [
    cardContent,
    card,
    view,
    document.getElementById((getActiveRatingSeasonConfigSafe() && getActiveRatingSeasonConfigSafe().placeholderId) || "springRatingSectionPlaceholder"),
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
  var btn = getActiveRatingSeasonScrollBtn();
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
  var btn = getActiveRatingSeasonScrollBtn();
  if (!btn) return;
  var isSpringView = typeof isSpringRatingMode === "function" && isSpringRatingMode();
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

function getSpringRatingOverallByLeague(leagueNum) {
  if (!isSpringRatingMode()) return [];
  var tournamentsByDate = getSpringRatingTournamentsByDate() || {};
  var byNick = {};
  var springOverallRegex = getActiveRatingSeasonMonthRegex();
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
