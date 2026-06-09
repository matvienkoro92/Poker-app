// Rating week tops: top lists, single-win screenshots, and rating notify admin actions.

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
function pokerInitWinterRatingWeekTops() {
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
  var hasWeekTopControls = !!(pastBtn && currentBtn && pastPreview && currentPreview && modal && modalTitle && listEl);
  var hasSingleTopTarget = !!((singleTopSummary && singleTopList) || (hallFameSingleTopSummary && hallFameSingleTopList));
  if (!hasWeekTopControls && !hasSingleTopTarget) return;
  var currentModalDates = null;
  var currentModalLinkType = null;
  var februaryDatesCache = null;
  var singleTopWinterLoadPromise = null;
  var singleTopWinterLoadAttempted = false;
  function escapePreview(s) {
    return String(s).replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function hasSingleTopWinterTournamentData() {
    return typeof WINTER_RATING_TOURNAMENTS_BY_DATE !== "undefined" &&
      WINTER_RATING_TOURNAMENTS_BY_DATE &&
      Object.keys(WINTER_RATING_TOURNAMENTS_BY_DATE).length > 0;
  }
  function ensureSingleTopWinterTournamentData() {
    if (hasSingleTopWinterTournamentData() || typeof window.pokerEnsureScriptDomains !== "function") return false;
    if (singleTopWinterLoadPromise) return true;
    if (singleTopWinterLoadAttempted) return false;
    singleTopWinterLoadAttempted = true;
    if (!singleTopWinterLoadPromise) {
      singleTopWinterLoadPromise = Promise.resolve(window.pokerEnsureScriptDomains(["rating-winter"]))
        .then(function () {
          singleTopWinterLoadPromise = null;
          updateButtonPreviews();
        })
        .catch(function () {
          singleTopWinterLoadPromise = null;
          updateButtonPreviews();
        });
    }
    return true;
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
    var seasonRegex = typeof getRatingSeasonMonthRegex === "function" ? getRatingSeasonMonthRegex() : /\.(03|04|05)\.2026$/;
    return Object.keys(byDate).filter(function (d) { return seasonRegex.test(d); });
  }
  function getSeasonalWeekTopDates(kind, fallbackDates) {
    if (typeof isSummerRatingMode === "function" && isSummerRatingMode() && typeof getActiveRatingSeasonDates === "function") {
      return getActiveRatingSeasonDates(kind);
    }
    return fallbackDates;
  }
  function getSingleTopActualSpringTournamentsByDate() {
    return typeof SPRING_RATING_TOURNAMENTS_BY_DATE !== "undefined" ? SPRING_RATING_TOURNAMENTS_BY_DATE || {} : {};
  }
  function getSingleTopActiveSeasonTournamentsByDate() {
    if (typeof isSummerRatingMode === "function" && isSummerRatingMode()) {
      if (typeof getSummerRatingTournamentsByDate === "function") return getSummerRatingTournamentsByDate() || {};
      return typeof SUMMER_RATING_TOURNAMENTS_BY_DATE !== "undefined" ? SUMMER_RATING_TOURNAMENTS_BY_DATE || {} : {};
    }
    if (typeof getSpringRatingTournamentsByDate === "function") return getSpringRatingTournamentsByDate() || {};
    return getSingleTopActualSpringTournamentsByDate();
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
    function pushSeasonTournaments(seasonByDate) {
      if (!seasonByDate || typeof seasonByDate !== "object") return;
      Object.keys(seasonByDate).forEach(function (dateStr) {
        if (!dateAllowed(dateStr)) return;
        var list = seasonByDate[dateStr];
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
    var actualSpringByDate = getSingleTopActualSpringTournamentsByDate();
    pushSeasonTournaments(actualSpringByDate);
    if (typeof isSummerRatingMode === "function" && isSummerRatingMode()) {
      pushSeasonTournaments(getSingleTopActiveSeasonTournamentsByDate());
    } else if (!actualSpringByDate || !Object.keys(actualSpringByDate).length) {
      pushSeasonTournaments(getSingleTopActiveSeasonTournamentsByDate());
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
        var line =
          '<span class="winter-rating__single-top-rank">' +
          place +
          ".</span>" +
          '<span class="winter-rating__single-top-nick">' +
          nickEscaped +
          "</span>" +
          '<span class="winter-rating__single-top-separator">—</span>' +
          '<span class="winter-rating__single-top-amount">' +
          sum +
          " ₽</span>";
        return '<li class="winter-rating__single-top-item">' + tags.open + line + tags.close + "</li>";
      })
      .join("");
  }
  function buildSingleTopLoadingHtml(count) {
    var rows = [];
    var total = count || 15;
    for (var i = 0; i < total; i++) {
      rows.push(
        '<li class="winter-rating__single-top-item winter-rating__single-top-item--loading">' +
          '<span class="winter-rating__single-top-static" aria-hidden="true">' +
            '<span class="winter-rating__single-top-rank">' + (i + 1) + ".</span>" +
            '<span class="winter-rating__single-top-nick"></span>' +
            '<span class="winter-rating__single-top-separator">—</span>' +
            '<span class="winter-rating__single-top-amount"></span>' +
          "</span>" +
        "</li>"
      );
    }
    return rows.join("");
  }
  function updateButtonPreviews() {
    var pastTop = getTopByDates(getSeasonalWeekTopDates("past", GAZETTE_DATES));
    var currentTop = getTopByDates(getSeasonalWeekTopDates("current", CURRENT_WEEK_DATES));
    var febDates = isSpringRatingMode() ? getMarchDatesFromData() : getFebruaryDatesFromData();
    var febTop = febDates.length ? getTopByDates(febDates) : [];
    if (currentPreview) currentPreview.innerHTML = currentTop.length ? previewHtml(currentTop) : "";
    if (pastPreview) pastPreview.innerHTML = pastTop.length ? previewHtml(pastTop) : "";
    if (febPreview) {
      febPreview.innerHTML = febTop.length ? previewHtml(febTop, 3) : "";
    }
    var hasMainSingleTop = singleTopSummary && singleTopList;
    var hasHallSingleTop = hallFameSingleTopSummary && hallFameSingleTopList;
    if (hasMainSingleTop || hasHallSingleTop) {
      var singleTopTitleText = "Топ выигрышей за один турнир (2026)";
      var isLoadingWinterSingleTop = ensureSingleTopWinterTournamentData();
      var listHtml = isLoadingWinterSingleTop
        ? buildSingleTopLoadingHtml(15)
        : buildSimpleSingleTopListHtml(getSingleTopWins(null, 15));
      if (hasMainSingleTop) {
        singleTopSummary.textContent = singleTopTitleText;
        singleTopList.setAttribute("aria-busy", isLoadingWinterSingleTop ? "true" : "false");
        singleTopList.innerHTML = listHtml;
      }
      if (hasHallSingleTop) {
        hallFameSingleTopSummary.textContent = singleTopTitleText;
        hallFameSingleTopList.setAttribute("aria-busy", isLoadingWinterSingleTop ? "true" : "false");
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
        var seasonConfig = typeof getRatingSeasonConfig === "function" ? getRatingSeasonConfig() : {};
        var maxWinLabel = seasonConfig.maxWinLabel || "за весну";
        var top3WinsLabel = seasonConfig.top3WinsLabel || "за весну";
        marchWrap.removeAttribute("hidden");
        marchWrap.style.display = "";
        if (marchData.max) {
          marchSummary.textContent = "Самый большой выигрыш " + maxWinLabel + ": " + escapePreview(marchData.max.nick) + " — " + formatRewardRound(marchData.max.reward) + " ₽";
        } else {
          marchSummary.textContent = "Самый большой выигрыш " + maxWinLabel + ": —";
        }
        if (marchTop3Caption) marchTop3Caption.textContent = marchData.top3 && marchData.top3.length ? "Топ-3 выигрыша " + top3WinsLabel + ":" : "";
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
    if (window.__pokerSingleTopLightboxClicksBound) return;
    window.__pokerSingleTopLightboxClicksBound = true;
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

    if (btn && btn.getAttribute("data-rating-notify-bound") !== "1") {
      btn.setAttribute("data-rating-notify-bound", "1");
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
    if (subsBtn && subsBtn.getAttribute("data-rating-subs-notify-bound") !== "1") {
      subsBtn.setAttribute("data-rating-subs-notify-bound", "1");
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
      var hideSeasonalShare = typeof isSummerRatingMode === "function" && isSummerRatingMode();
      shareRow.style.display = (typeof isSpringRatingMode === "function" && isSpringRatingMode() && (linkType === "past" || hideSeasonalShare)) ? "none" : "";
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
      pokerCopyTextToClipboard(link).then(function (copied) {
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (copied) {
          if (tg && tg.showAlert) tg.showAlert(msg); else alert("Ссылка скопирована.");
        } else if (tg && tg.showAlert) {
          tg.showAlert("Ссылка: " + link);
        } else {
          alert("Ссылка: " + link);
        }
      });
    });
  }
  // Кнопки «Поделиться» для весенних лиг находятся внутри блоков лиг (winter-rating__spring-league-share),
  // отдельная общая кнопка под итоговой таблицей отключена.
  if (hasWeekTopControls) {
    window.openWinterRatingWeekTopModal = function (kind) {
      if (kind === "current") openModal("Топы текущей недели", getSeasonalWeekTopDates("current", CURRENT_WEEK_DATES), "current");
      else if (kind === "past") openModal("Топы прошлой недели", getSeasonalWeekTopDates("past", GAZETTE_DATES), "past");
      else if (kind === "feb") {
        if (isSpringRatingMode()) {
          var seasonConfig = typeof getRatingSeasonConfig === "function" ? getRatingSeasonConfig() : {};
          openModal(seasonConfig.topLabel || "Топы весны", getMarchDatesFromData(), "mar");
        }
        else openModal("Топы Февраля", getFebruaryDatesFromData(), "feb");
      }
    };
  }
  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    if (document.body) document.body.style.overflow = "";
  }
  if (currentBtn && currentBtn.getAttribute("data-rating-week-top-bound") !== "1") {
    currentBtn.setAttribute("data-rating-week-top-bound", "1");
    currentBtn.addEventListener("click", function () {
    var topLinkBase = typeof getRatingSeasonTopLinkBase === "function" ? getRatingSeasonTopLinkBase() : (typeof SPRING_TOP_LINK_BASE !== "undefined" ? SPRING_TOP_LINK_BASE : "");
    if (isSpringRatingMode() && topLinkBase) {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var sep = topLinkBase.indexOf("?") >= 0 ? "&" : "?";
      var link = topLinkBase + sep + "Mart_week_1=1";
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tg && tg.openTelegramLink) tg.openTelegramLink(link);
      else window.open(link, "_blank");
      return;
    }
    openModal("Топы текущей недели", getSeasonalWeekTopDates("current", CURRENT_WEEK_DATES), "current");
    });
  }
  if (pastBtn && pastBtn.getAttribute("data-rating-week-top-bound") !== "1") {
    pastBtn.setAttribute("data-rating-week-top-bound", "1");
    pastBtn.addEventListener("click", function () {
      openModal("Топы прошлой недели", getSeasonalWeekTopDates("past", GAZETTE_DATES), "past");
    });
  }
  if (febBtn && febBtn.getAttribute("data-rating-week-top-bound") !== "1") {
    febBtn.setAttribute("data-rating-week-top-bound", "1");
    febBtn.addEventListener("click", function () {
      var topLinkBase = typeof getRatingSeasonTopLinkBase === "function" ? getRatingSeasonTopLinkBase() : (typeof SPRING_TOP_LINK_BASE !== "undefined" ? SPRING_TOP_LINK_BASE : "");
      if (isSpringRatingMode() && topLinkBase) {
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
        var sep = topLinkBase.indexOf("?") >= 0 ? "&" : "?";
        var link = topLinkBase + sep + "mart=1";
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.openTelegramLink) tg.openTelegramLink(link);
        else window.open(link, "_blank");
        return;
      }
      if (isSpringRatingMode()) {
        var seasonConfig = typeof getRatingSeasonConfig === "function" ? getRatingSeasonConfig() : {};
        openModal(seasonConfig.topLabel || "Топы весны", getMarchDatesFromData(), "mar");
      }
      else openModal("Топы Февраля", getFebruaryDatesFromData(), "feb");
    });
  }
  if (modalClose && modalClose.getAttribute("data-rating-week-top-bound") !== "1") {
    modalClose.setAttribute("data-rating-week-top-bound", "1");
    modalClose.addEventListener("click", closeModal);
  }
  if (modalBackdrop && modalBackdrop.getAttribute("data-rating-week-top-bound") !== "1") {
    modalBackdrop.setAttribute("data-rating-week-top-bound", "1");
    modalBackdrop.addEventListener("click", closeModal);
  }
  if (listEl && listEl.getAttribute("data-rating-week-top-bound") !== "1") {
    listEl.setAttribute("data-rating-week-top-bound", "1");
    listEl.addEventListener("click", function (e) {
    var btn = e.target && e.target.closest ? e.target.closest(".winter-rating__nick-btn") : null;
    if (!btn || !btn.dataset.nick) return;
    e.preventDefault();
    if (typeof openWinterRatingPlayerModalReady === "function") {
      openWinterRatingPlayerModalReady(btn.dataset.nick, { onlyDates: currentModalDates || GAZETTE_DATES, skipGazetteStyle: true });
    } else if (typeof openWinterRatingPlayerModal === "function") {
      openWinterRatingPlayerModal(btn.dataset.nick, { onlyDates: currentModalDates || GAZETTE_DATES, skipGazetteStyle: true });
    }
    });
  }
}
window.pokerInitWinterRatingWeekTops = pokerInitWinterRatingWeekTops;
pokerInitWinterRatingWeekTops();
