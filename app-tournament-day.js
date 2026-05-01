/** Кастомный кубок «Турнир дня» на дату по МСК (ключ YYYY-MM-DD) — файл в assets/ */
var TOURNAMENT_DAY_IMAGE_OVERRIDE_BY_MSK_DATE = {
  "2026-03-20": "tournament-day-championship-500.png"
};

var TOURNAMENT_OF_DAY_BY_WEEKDAY = [
  { name: "Турнир Недели Нокаут Меджик", buyin: "2 000₽", guarantee: "300 000₽" },
  { name: "Magic MKO", buyin: "500₽", guarantee: "100 000₽" },
  { name: "Rebuy", buyin: "300₽", guarantee: "100 000₽" },
  { name: "Rebuy", buyin: "100₽", guarantee: "50 000₽" },
  { name: "Нокаут Мистери", buyin: "1 000₽", guarantee: "150 000₽" },
  { name: "Нокаут Прогрессив", buyin: "500₽", guarantee: "100 000₽" },
  { name: "Фриролл", buyin: "Бесплатно · R:250₽ / A:500₽", guarantee: "100 000₽" }
];

var HOME_FREEROLL_SCHEDULE = [
  { day: "Пн", dow: 1, title: "Приз 100 000₽", meta: "X-poker · 17:00 МСК", time: "17:00 МСК", hour: 17, minute: 0, room: "X-poker", roomPage: "xpoker", desc: "Фриролл в X-poker. Старт в 17:00 МСК, вход бесплатный, призовой фонд 100 000₽." },
  { day: "Вт", dow: 2, title: "Приз 100 000₽", meta: "X-poker · 17:00 МСК", time: "17:00 МСК", hour: 17, minute: 0, room: "X-poker", roomPage: "xpoker", desc: "Фриролл в X-poker. Старт в 17:00 МСК, вход бесплатный, призовой фонд 100 000₽." },
  { day: "Ср", dow: 3, title: "Приз 1 000 000₽", meta: "Poker21 · 18:00 МСК", time: "18:00 МСК", hour: 18, minute: 0, room: "Poker21", roomPage: "poker21", desc: "Главный недельный фриролл в Poker21. Старт в 18:00 МСК, вход бесплатный, гарантия 1 000 000₽." },
  { day: "Чт", dow: 4, title: "Приз 100 000₽", meta: "X-poker · 17:00 МСК", time: "17:00 МСК", hour: 17, minute: 0, room: "X-poker", roomPage: "xpoker", desc: "Фриролл в X-poker. Старт в 17:00 МСК, вход бесплатный, призовой фонд 100 000₽." },
  { day: "Сб", dow: 6, title: "Приз 100 000₽", meta: "Poker21 · 18:00 МСК", time: "18:00 МСК", hour: 18, minute: 0, room: "Poker21", roomPage: "poker21", desc: "Субботний фриролл в Poker21. Старт в 18:00 МСК, вход бесплатный, R:250₽ / A:500₽, гарантия 100 000₽." }
];

function pokerGetMskDowAndMinutes(now) {
  now = now || new Date();
  var dowMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  var dow = dowMap[now.toLocaleString("en-US", { timeZone: "Europe/Moscow", weekday: "short" })];
  var hm = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Moscow",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(now).split(":");
  return {
    dow: dow !== undefined ? dow : now.getDay(),
    minutes: Number(hm[0]) * 60 + Number(hm[1])
  };
}

function pokerFindNextFreerollItem(items, now) {
  items = Array.isArray(items) ? items : HOME_FREEROLL_SCHEDULE;
  if (!items.length) return null;
  var msk = pokerGetMskDowAndMinutes(now || new Date());
  var best = null;
  var bestDelta = Infinity;
  items.forEach(function (item) {
    var dayDelta = (Number(item.dow) - msk.dow + 7) % 7;
    var itemMinutes = Number(item.hour || 0) * 60 + Number(item.minute || 0);
    var totalDelta = dayDelta * 1440 + (itemMinutes - msk.minutes);
    if (totalDelta < 0) totalDelta += 7 * 1440;
    if (totalDelta < bestDelta) {
      bestDelta = totalDelta;
      best = item;
    }
  });
  return best;
}

function pokerGetDownloadTournamentDayInfo(now) {
  now = now || new Date();
  var msk = pokerGetMskDowAndMinutes(now);
  var dow = msk.dow;
  if (msk.minutes >= 21 * 60) dow = (dow + 1) % 7;
  var t = TOURNAMENT_OF_DAY_BY_WEEKDAY[dow] || TOURNAMENT_OF_DAY_BY_WEEKDAY[0];
  return t.name + " · " + t.guarantee + " · 18:00 МСК";
}

function pokerGetDownloadXpokerFreerollInfo(now) {
  var item = pokerFindNextFreerollItem(HOME_FREEROLL_SCHEDULE.filter(function (slot) {
    return slot && slot.roomPage === "xpoker";
  }), now || new Date());
  if (!item) return "X-poker · 17:00 МСК";
  return item.day + ", " + item.time + " · " + item.title;
}

function pokerUpdateDownloadInfoSubsections() {
  var poker21El = document.getElementById("downloadPoker21TournamentInfo");
  var xpokerEl = document.getElementById("downloadXpokerFreerollInfo");
  if (poker21El) poker21El.textContent = pokerGetDownloadTournamentDayInfo(new Date());
  if (xpokerEl) xpokerEl.textContent = pokerGetDownloadXpokerFreerollInfo(new Date());
}
window.pokerUpdateDownloadInfoSubsections = pokerUpdateDownloadInfoSubsections;

/** Короткое имя дня недели по календарю Москвы для момента utcMs (Date или число). */
function pokerMskWeekdayShortAt(utcMs) {
  var wk = new Date(utcMs).toLocaleDateString("en-US", { timeZone: "Europe/Moscow", weekday: "short" });
  var map = { Sun: "вс", Mon: "пн", Tue: "вт", Wed: "ср", Thu: "чт", Fri: "пт", Sat: "сб" };
  var ru = map[wk];
  return ru ? ru.charAt(0).toUpperCase() + ru.slice(1) : "—";
}

function renderHomeFreerollSchedule() {
  var el = document.getElementById("freerollHomeScheduleList");
  if (!el) return;
  el.innerHTML = "";
  var nextIndex = -1;
  try {
    var nextItem = pokerFindNextFreerollItem(HOME_FREEROLL_SCHEDULE, new Date());
    nextIndex = HOME_FREEROLL_SCHEDULE.indexOf(nextItem);
  } catch (eNextFreeroll) {}
  HOME_FREEROLL_SCHEDULE.forEach(function (item) {
    var row = document.createElement("div");
    row.className = "home-freeroll-schedule__row";
    row.setAttribute("role", "button");
    row.setAttribute("tabindex", "0");
    if (nextIndex >= 0 && HOME_FREEROLL_SCHEDULE[nextIndex] === item) {
      row.classList.add("home-freeroll-schedule__row--next");
    }
    var day = document.createElement("span");
    day.className = "home-freeroll-schedule__day";
    day.textContent = item.day;
    var main = document.createElement("span");
    main.className = "home-freeroll-schedule__main";
    var title = document.createElement("span");
    title.className = "home-freeroll-schedule__title";
    title.textContent = item.title;
    var meta = document.createElement("span");
    meta.className = "home-freeroll-schedule__meta";
    meta.textContent = item.meta;
    main.appendChild(title);
    main.appendChild(meta);
    row.appendChild(day);
    row.appendChild(main);
    row.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      openHomeFreerollModal(item);
    });
    row.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openHomeFreerollModal(item);
      }
    });
    el.appendChild(row);
  });
}

function openHomeFreerollModal(item) {
  var modal = document.getElementById("homeFreerollModal");
  if (!modal || !item) return;
  initHomeFreerollModal();
  var dayEl = document.getElementById("homeFreerollModalDay");
  var titleEl = document.getElementById("homeFreerollModalTitle");
  var metaEl = document.getElementById("homeFreerollModalMeta");
  var descEl = document.getElementById("homeFreerollModalDesc");
  var playBtn = document.getElementById("homeFreerollModalPlayBtn");
  if (dayEl) dayEl.textContent = item.day;
  if (titleEl) titleEl.textContent = "Фриролл";
  if (metaEl) metaEl.textContent = item.title + " · " + item.time + " · " + item.room;
  if (descEl) descEl.textContent = item.desc || "";
  if (playBtn) playBtn.dataset.roomPage = item.roomPage || "poker21";
  modal.classList.remove("home-freeroll-modal--hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeHomeFreerollModal() {
  var modal = document.getElementById("homeFreerollModal");
  if (!modal) return;
  modal.classList.add("home-freeroll-modal--hidden");
  modal.setAttribute("aria-hidden", "true");
}

function initHomeFreerollModal() {
  var modal = document.getElementById("homeFreerollModal");
  var playBtn = document.getElementById("homeFreerollModalPlayBtn");
  if (!modal || modal.__initedHomeFreeroll) return;
  modal.__initedHomeFreeroll = true;
  modal.addEventListener("click", function (e) {
    var closeBtn = e.target && e.target.closest ? e.target.closest("[data-home-freeroll-close]") : null;
    if (closeBtn) {
      e.preventDefault();
      closeHomeFreerollModal();
    }
  });
  if (playBtn) {
    playBtn.addEventListener("click", function () {
      var roomPage = playBtn.dataset.roomPage || "poker21";
      closeHomeFreerollModal();
      if (typeof setView === "function") setView("download");
      if (typeof setDownloadPage === "function") {
        setDownloadPage(roomPage);
        requestAnimationFrame(function () {
          setDownloadPage(roomPage);
        });
      }
    });
  }
}
window.initHomeFreerollModal = initHomeFreerollModal;

function updateTournamentDayBlock() {
  try {
    initHomeFreerollModal();
    renderHomeFreerollSchedule();
    pokerUpdateDownloadInfoSubsections();
  } catch (eHomeFreerolls) {}
  var buyinEls = [document.getElementById("tournamentDayBuyin"), document.getElementById("scheduleTournamentDayBuyin")].filter(Boolean);
  var guaranteeEls = [document.getElementById("tournamentDayGuarantee"), document.getElementById("scheduleTournamentDayGuarantee")].filter(Boolean);
  var timerLabelEls = [document.getElementById("tournamentDayTimerLabel"), document.getElementById("scheduleTournamentDayTimerLabel")].filter(Boolean);
  var timerEls = [document.getElementById("tournamentDayTimer"), document.getElementById("scheduleTournamentDayTimer")].filter(Boolean);
  if (buyinEls.length === 0 || guaranteeEls.length === 0 || timerEls.length === 0) return;
  var MSK_START_UTC_HOUR = 15;
  var MSK_END_REG_UTC_HOUR = 18;
  function getMskDateParts() {
    var s = new Date().toLocaleString("en-CA", { timeZone: "Europe/Moscow" });
    var parts = s.slice(0, 10).split("-");
    return { y: parseInt(parts[0], 10), m: parseInt(parts[1], 10) - 1, d: parseInt(parts[2], 10) };
  }
  function getMskDayOfWeek() {
    var s = new Date().toLocaleString("en-US", { timeZone: "Europe/Moscow", weekday: "short" });
    var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return map[s] !== undefined ? map[s] : new Date().getDay();
  }
  /** Календарная дата МСК, к которой относится показываемый «турнир дня» (после конца рег — уже завтра). */
  function getDisplayedTournamentMskParts(now) {
    var p = getMskDateParts();
    var endRegToday = new Date(Date.UTC(p.y, p.m, p.d, MSK_END_REG_UTC_HOUR, 0, 0, 0));
    if (now < endRegToday) return p;
    var nextUtc = new Date(Date.UTC(p.y, p.m, p.d, 12, 0, 0, 0));
    nextUtc.setUTCDate(nextUtc.getUTCDate() + 1);
    return { y: nextUtc.getUTCFullYear(), m: nextUtc.getUTCMonth(), d: nextUtc.getUTCDate() };
  }
  function getTournamentDayState(now) {
    var p = getMskDateParts();
    var mskDow = getMskDayOfWeek();
    var startToday = new Date(Date.UTC(p.y, p.m, p.d, MSK_START_UTC_HOUR, 0, 0, 0));
    var endRegToday = new Date(Date.UTC(p.y, p.m, p.d, MSK_END_REG_UTC_HOUR, 0, 0, 0));
    if (now < startToday) {
      return { t: TOURNAMENT_OF_DAY_BY_WEEKDAY[mskDow], target: startToday, label: "", weekday: mskDow };
    }
    if (now < endRegToday) {
      return { t: TOURNAMENT_OF_DAY_BY_WEEKDAY[mskDow], target: endRegToday, label: "до конца рег ", weekday: mskDow };
    }
    var nextDate = new Date(p.y, p.m, p.d + 1);
    var nextStart = new Date(Date.UTC(nextDate.getFullYear(), nextDate.getMonth(), nextDate.getDate(), MSK_START_UTC_HOUR, 0, 0, 0));
    var nextMskDow = nextDate.getDay();
    return { t: TOURNAMENT_OF_DAY_BY_WEEKDAY[nextMskDow], target: nextStart, label: "", weekday: nextMskDow };
  }
  function addDaysToYmd(y, m0, d, add) {
    var dt = new Date(Date.UTC(y, m0, d, 12, 0, 0, 0));
    dt.setUTCDate(dt.getUTCDate() + add);
    return { y: dt.getUTCFullYear(), m: dt.getUTCMonth(), d: dt.getUTCDate() };
  }
  /**
   * Слот фриролла в заданный день недели (МСК), та же логика старта / конца рег, что у турнира дня.
   * @param {{ startUtcHour?: number, endRegUtcHour?: number }} [hourOpts] — часы UTC; по умолчанию 18:00 / 21:00 МСК.
   */
  function getNextWeekdayFreerollSlot(now, targetDow, tInfo, hourOpts) {
    hourOpts = hourOpts || {};
    var startUtcH = hourOpts.startUtcHour != null ? hourOpts.startUtcHour : MSK_START_UTC_HOUR;
    var endRegUtcH = hourOpts.endRegUtcHour != null ? hourOpts.endRegUtcHour : MSK_END_REG_UTC_HOUR;
    var p = getMskDateParts();
    var mskDow = getMskDayOfWeek();
    var offset = (targetDow - mskDow + 7) % 7;
    var day = addDaysToYmd(p.y, p.m, p.d, offset);
    var startSlot = new Date(Date.UTC(day.y, day.m, day.d, startUtcH, 0, 0, 0));
    var endRegSlot = new Date(Date.UTC(day.y, day.m, day.d, endRegUtcH, 0, 0, 0));
    if (now < startSlot) return { t: tInfo, target: startSlot, label: "" };
    if (now < endRegSlot) return { t: tInfo, target: endRegSlot, label: "до конца рег " };
    var nextDay = addDaysToYmd(day.y, day.m, day.d, 7);
    var nextStart = new Date(Date.UTC(nextDay.y, nextDay.m, nextDay.d, startUtcH, 0, 0, 0));
    return { t: tInfo, target: nextStart, label: "" };
  }
  function getFreerollTournamentInfo(item) {
    if (!item) return TOURNAMENT_OF_DAY_BY_WEEKDAY[6];
    return {
      name: item.room === "X-poker" ? "Фриролл X-poker" : "Фриролл",
      buyin: item.room === "Poker21" && item.dow === 6 ? "Бесплатно · R:250₽ / A:500₽" : "0₽",
      guarantee: item.dow === 3 ? "1 000 000₽" : "100 000₽"
    };
  }
  /** Карточка «Следующий фриролл»: ближайший слот из списка фрироллов на главной. */
  function getNextFreerollState(now) {
    var best = null;
    HOME_FREEROLL_SCHEDULE.forEach(function (item) {
      var startUtcH = Number(item.hour) - 3;
      var slot = getNextWeekdayFreerollSlot(now, item.dow, getFreerollTournamentInfo(item), {
        startUtcHour: startUtcH,
        endRegUtcHour: startUtcH + 3
      });
      if (!best || slot.target < best.target) best = slot;
    });
    return best || getNextWeekdayFreerollSlot(now, 6, TOURNAMENT_OF_DAY_BY_WEEKDAY[6]);
  }
  function formatMskHmForDate(utcDate) {
    try {
      return new Intl.DateTimeFormat("ru-RU", {
        timeZone: "Europe/Moscow",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }).format(utcDate);
    } catch (eFmt) {
      return "18:00";
    }
  }
  function formatTimer() {
    var n = new Date();
    var state = getTournamentDayState(n);
    var nameStr = state.t ? state.t.name : "";
    var buyinStr = state.t ? state.t.buyin : "";
    var guaranteeStr = state.t ? state.t.guarantee : "";
    window._tournamentDayShare = {
      name: nameStr,
      time: "18:00",
      guarantee: guaranteeStr
    };
    var scheduleTdName = document.getElementById("scheduleTournamentDayName");
    if (scheduleTdName) {
      scheduleTdName.textContent = nameStr === "Нокаут Мистери" ? "" : nameStr;
      if (nameStr === "Фриролл") {
        scheduleTdName.classList.add("tournament-day-name--freeroll");
      } else {
        scheduleTdName.classList.remove("tournament-day-name--freeroll");
      }
    }
    buyinEls.forEach(function (el) { el.textContent = buyinStr; });
    guaranteeEls.forEach(function (el) { el.textContent = guaranteeStr; });
    timerLabelEls.forEach(function (el) {
      el.textContent = state.label ? state.label : "Старт через: ";
    });
    var diff = state.target - n;
    var timerStr = diff <= 0 ? "Скоро" : (function () {
      var h = Math.floor(diff / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    })();
    timerEls.forEach(function (el) { el.textContent = timerStr; });
    var tdWeekTime = document.getElementById("tournamentDayHomeWeekTime");
    if (tdWeekTime && state.target) {
      tdWeekTime.textContent = pokerMskWeekdayShortAt(state.target.getTime()) + ", 18:00 МСК";
    }
    var frBuy = document.getElementById("freerollHomeBuyin");
    var frGuar = document.getElementById("freerollHomeGuarantee");
    var frLab = document.getElementById("freerollHomeTimerLabel");
    var frTime = document.getElementById("freerollHomeTimer");
    if (frLab && frTime) {
      var frState = getNextFreerollState(n);
      var frT = frState.t;
      if (frBuy) frBuy.textContent = frT.buyin || "0₽";
      if (frGuar) frGuar.textContent = frT.guarantee;
      frLab.textContent = frState.label ? frState.label : "Старт через: ";
      var frDiff = frState.target - n;
      var frTimerStr =
        frDiff <= 0
          ? "Скоро"
          : (function () {
              var frDayMs = 86400000;
              if (frDiff > frDayMs) {
                var fd = Math.floor(frDiff / frDayMs);
                var fhRem = Math.floor((frDiff % frDayMs) / 3600000);
                return fd + "д " + fhRem + "ч";
              }
              var fh = Math.floor(frDiff / 3600000);
              var fm = Math.floor((frDiff % 3600000) / 60000);
              var fs = Math.floor((frDiff % 60000) / 1000);
              return (fh < 10 ? "0" : "") + fh + ":" + (fm < 10 ? "0" : "") + fm + ":" + (fs < 10 ? "0" : "") + fs;
            })();
      frTime.textContent = frTimerStr;
      var frWeekTime = document.getElementById("freerollHomeWeekTime");
      if (frWeekTime && frState.target) {
        frWeekTime.textContent =
          pokerMskWeekdayShortAt(frState.target.getTime()) + ", " + formatMskHmForDate(frState.target) + " МСК";
      }
    }
    var scheduleTrophyImg = document.getElementById("scheduleTournamentDayTrophyImg");
    var weekday = state.weekday;
    var pToday = getDisplayedTournamentMskParts(n);
    var moNum = pToday.m + 1;
    var daNum = pToday.d;
    var mskDateKey =
      pToday.y +
      "-" +
      (moNum < 10 ? "0" : "") +
      moNum +
      "-" +
      (daNum < 10 ? "0" : "") +
      daNum;
    var dayImageOverride =
      typeof TOURNAMENT_DAY_IMAGE_OVERRIDE_BY_MSK_DATE !== "undefined"
        ? TOURNAMENT_DAY_IMAGE_OVERRIDE_BY_MSK_DATE[mskDateKey]
        : null;
    var trophyFile;
    if (dayImageOverride) {
      trophyFile = dayImageOverride;
    } else if (nameStr === "Фриролл") {
      trophyFile = "tournament-day-trophy.png";
    } else if (weekday === 0) {
      // Воскресный турнир недели — промо с перчаткой / 300k
      trophyFile = "tournament-day-glove-champion-300k.png";
    } else if (weekday === 1) {
      // Понедельник — Magic MKO 500₽ (кастом: кубок с шаром и «500»)
      trophyFile = "tournament-day-monday-magic-500.png";
    } else if (weekday === 2) {
      // Вторник — трактор
      trophyFile = "tournament-day-tuesday.png";
    } else if (weekday === 3) {
      // Среда — Moscow Poker Open 100₽
      trophyFile = "tournament-day-moscow-open-100.png";
    } else if (weekday === 5) {
      // Пятница — Нокаут Прогрессив 500₽
      trophyFile = "tournament-day-championship-500.png";
    } else {
      // Чт, сб (не фриролл) — классический кубок клуба
      trophyFile = "tournament-day-two-aces.png";
    }
    var trophySrc = typeof getAssetUrl === "function" ? getAssetUrl(trophyFile) : "";
    if (scheduleTrophyImg && trophySrc) scheduleTrophyImg.src = trophySrc;
    var homeTrophyImg = document.getElementById("tournamentDayHomeTrophyImg");
    var homeTrophyFile = dayImageOverride || trophyFile;
    var homeTrophySrc = typeof getAssetUrl === "function" ? getAssetUrl(homeTrophyFile) : "";
    if (homeTrophyImg && homeTrophySrc) {
      homeTrophyImg.src = homeTrophySrc;
      homeTrophyImg.alt = nameStr ? "Турнир дня: " + nameStr : "";
    }
    var schedTbody = document.querySelector(".schedule-table-wrap--tournament-day tbody");
    if (schedTbody) {
      var schedRows = schedTbody.querySelectorAll("tr");
      var trophyRowIdx = (state.weekday + 6) % 7;
      for (var ri = 0; ri < schedRows.length; ri++) {
        var tr = schedRows[ri];
        var nameCell = tr.querySelector("td:nth-child(2)");
        if (!nameCell) continue;
        var inlineTrophy = nameCell.querySelector(".schedule-tournament-day-trophy-inline");
        if (ri === trophyRowIdx && dayImageOverride && trophySrc) {
          if (!inlineTrophy) {
            inlineTrophy = document.createElement("img");
            inlineTrophy.className = "schedule-tournament-day-trophy-inline";
            inlineTrophy.alt = "";
            inlineTrophy.width = 56;
            inlineTrophy.height = 56;
            nameCell.insertBefore(inlineTrophy, nameCell.firstChild);
          }
          inlineTrophy.src = trophySrc;
        } else if (inlineTrophy) {
          inlineTrophy.remove();
        }
      }
    }
  }
  formatTimer();
  if (window._tournamentDayTimer) clearInterval(window._tournamentDayTimer);
  window._tournamentDayTimer = setInterval(formatTimer, 1000);
}

function initTournamentDayBlock() {
  updateTournamentDayBlock();
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTournamentDayBlock);
} else {
  initTournamentDayBlock();
}

// Поделиться турниром дня (если на странице есть кнопка с id scheduleTournamentDayShareBtn)
function handleTournamentDayShare() {
    if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
    var share = window._tournamentDayShare || {};
    var name = (share.name || "").trim() || "турнир клуба";
    var guarantee = (share.guarantee || "").trim();
    var time = (share.time || "18:00").trim();
    var link = typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink("schedule") : "";
    var text;
    var textForDialog;
    if (name === "Фриролл" && guarantee) {
      textForDialog =
        "Привет, сегодня Фриролл на " + guarantee + " в Poker21. Скачать можно здесь:";
      text =
        "Привет, сегодня Фриролл на " +
        guarantee +
        " в Poker21. Скачать можно здесь:\n" +
        link;
    } else {
      textForDialog =
        "Привет, сегодня " +
        name +
        " в " +
        time +
        " в Poker21." +
        (guarantee ? " Призовой фонд " + guarantee + "." : "") +
        " Скачать можно здесь:";
      text =
        "Привет, сегодня " +
        name +
        " в " +
        time +
        " в Poker21." +
        (guarantee ? " Призовой фонд " + guarantee + "." : "") +
        " Скачать можно здесь:\n" +
        link;
    }
    var shareUrl =
      typeof pokerBuildTelegramShareUrlDialog === "function" ? pokerBuildTelegramShareUrlDialog(link, textForDialog) : "";
    pokerTryPwaWebShare({ text: text, url: link }).then(function (pwaOk) {
      if (pwaOk) {
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("tournament_day");
        return;
      }
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tg && tg.openTelegramLink) tg.openTelegramLink(shareUrl);
      else if (tg && tg.openLink) tg.openLink(shareUrl);
      else window.open(shareUrl, "_blank");
      if (typeof recordShareButtonClick === "function") recordShareButtonClick("tournament_day");
    });
}
(function initTournamentDayShareButton() {
  var shareBtns = [document.getElementById("scheduleTournamentDayShareBtn")];
  shareBtns.forEach(function (btn) {
    if (btn) btn.addEventListener("click", handleTournamentDayShare);
  });
})();

(function initScheduleTournamentDayToday() {
  var wrap = document.querySelector(".schedule-table-wrap--tournament-day");
  if (!wrap) return;
  var rows = wrap.querySelectorAll("tbody tr");
  if (rows.length !== 7) return;
  var dayIndex = (new Date().getDay() + 6) % 7;
  var todayRow = rows[dayIndex];
  if (todayRow) {
    todayRow.classList.add("schedule-row--today");
    var firstCell = todayRow.querySelector("td");
    if (firstCell) firstCell.textContent = "СЕГОДНЯ";
  }
})();
