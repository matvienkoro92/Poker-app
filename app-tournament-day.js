var HOME_TOURNAMENT_MONDAY_BANNER_FILE = "home-tournament-mystery-bounty-130k.webp";
var HOME_TOURNAMENT_TUESDAY_BANNER_FILE = "home-tournament-tuesday-tractor-120k.webp";
var HOME_TOURNAMENT_WEDNESDAY_BANNER_FILE = "home-tournament-wednesday-stolnik-70k.webp";
var HOME_TOURNAMENT_THURSDAY_BANNER_FILE = "home-tournament-thursday-mystery-plus-220k.webp";
var HOME_TOURNAMENT_FRIDAY_BANNER_FILE = "home-tournament-friday-knockout-progressive-130k.webp";
var HOME_TOURNAMENT_SATURDAY_BANNER_FILE = "home-tournament-saturday-freeroll-200k.webp";
var HOME_TOURNAMENT_SUNDAY_BANNER_FILE = "home-tournament-sunday-knockout-week-300k.webp";

var TOURNAMENT_OF_DAY_BY_WEEKDAY = [
  {
    name: "Нокаут недели",
    buyin: "2 000₽",
    guarantee: "300 000₽",
    banner: HOME_TOURNAMENT_SUNDAY_BANNER_FILE,
    bannerAlt: "Poker21 Нокаут недели воскресенья — вход 2 000 ₽, призовые 300 000 ₽",
    bannerWidth: 640,
    bannerHeight: 915
  },
  {
    name: "Magic MKO",
    buyin: "500₽",
    guarantee: "130 000₽",
    banner: HOME_TOURNAMENT_MONDAY_BANNER_FILE,
    bannerAlt: "Poker21 Magic MKO понедельника — Мистери Баунти 130 000 ₽",
    bannerWidth: 640,
    bannerHeight: 915
  },
  {
    name: "Турнир Тракториста",
    buyin: "300₽",
    guarantee: "120 000₽",
    banner: HOME_TOURNAMENT_TUESDAY_BANNER_FILE,
    bannerAlt: "Poker21 Турнир Тракториста вторника — призовые 120 000 ₽",
    bannerWidth: 640,
    bannerHeight: 915
  },
  {
    name: "Турнир Стольник",
    buyin: "100₽",
    guarantee: "70 000₽",
    banner: HOME_TOURNAMENT_WEDNESDAY_BANNER_FILE,
    bannerAlt: "Poker21 Турнир Стольник среды — призовые 70 000 ₽",
    bannerWidth: 640,
    bannerHeight: 915
  },
  {
    name: "Мистери+",
    buyin: "1 200₽",
    guarantee: "220 000₽",
    banner: HOME_TOURNAMENT_THURSDAY_BANNER_FILE,
    bannerAlt: "Poker21 Мистери+ четверга — призовые 220 000 ₽",
    bannerWidth: 640,
    bannerHeight: 915
  },
  {
    name: "Нокаут Прогрессив",
    buyin: "500₽",
    guarantee: "130 000₽",
    banner: HOME_TOURNAMENT_FRIDAY_BANNER_FILE,
    bannerAlt: "Poker21 Нокаут Прогрессив пятницы — вход 500 ₽, призовые 130 000 ₽",
    bannerWidth: 640,
    bannerHeight: 915
  },
  {
    name: "Фриролл",
    buyin: "0₽ · R:400₽ / A:800₽",
    guarantee: "200 000₽",
    banner: HOME_TOURNAMENT_SATURDAY_BANNER_FILE,
    bannerAlt: "Poker21 Фриролл субботы — ребай 400 ₽, аддон 800 ₽, призовые 200 000 ₽",
    bannerWidth: 640,
    bannerHeight: 915
  }
];

var HOME_FREEROLL_SCHEDULE = [
  {
    day: "Еж",
    daily: true,
    title: "Приз 9 000₽",
    meta: "Poker21 · 16:00 МСК",
    time: "16:00 МСК",
    hour: 16,
    minute: 0,
    room: "Poker21",
    roomPage: "poker21",
    buyin: "0₽",
    guarantee: "9 000₽",
    desc: "Ежедневный фриролл-сателлит в Poker21. Старт в 16:00 МСК, вход 0₽, гарантия 9 000₽: 3 билета по 3 000₽."
  },
  { day: "Сб", dow: 6, title: "Приз 200 000₽", meta: "Poker21 · 18:00 МСК", time: "18:00 МСК", hour: 18, minute: 0, room: "Poker21", roomPage: "poker21", desc: "Субботний фриролл в Poker21. Старт в 18:00 МСК, вход 0₽, R:400₽ / A:800₽, гарантия 200 000₽." }
];

var DOWNLOAD_XPOKER_FREEROLL_SCHEDULE = [];

var POKER_FULL_TOURNAMENT_SCHEDULE = [
  { repeat: "daily", category: "Сателлит", name: "К турниру недели", buyin: "0₽", rebuy: "R:100₽ / A:150₽", guarantee: "1 билет за 2 000₽", hour: 10, minute: 0, durationMinutes: 180, priority: 30 },
  { repeat: "daily", category: "Ежедневный", name: "Rebuy DV", buyin: "800₽", rebuy: "R:800₽ / A:800₽", guarantee: "30 000₽", hour: 12, minute: 0, durationMinutes: 180, priority: 45 },
  { repeat: "daily", category: "Ежедневный", name: "Tournament Rebuy", buyin: "100₽", rebuy: "R:100₽ / A:100₽", guarantee: "5 000₽", hour: 14, minute: 0, durationMinutes: 180, priority: 45 },
  { repeat: "daily", category: "Сателлит", name: "К турниру месяца Нокаут", buyin: "50₽", rebuy: "R:200₽ / A:200₽", guarantee: "1 билет за 10 000₽", hour: 15, minute: 0, durationMinutes: 180, priority: 35 },
  { repeat: "daily", category: "Сателлит", name: "Бесплатный сателлит к турниру месяца", buyin: "0₽", rebuy: "—", guarantee: "9 000₽ — 3 билета за 3 000₽", hour: 16, minute: 0, durationMinutes: 180, priority: 35 },
  { repeat: "daily", category: "Ежедневный", name: "Magic Chest", buyin: "50₽", rebuy: "R:50₽", guarantee: "3 000₽", hour: 16, minute: 0, durationMinutes: 180, priority: 50 },
  { repeat: "daily", category: "Ежедневный", name: "PKO/MKO", buyin: "300₽", rebuy: "R:300₽", guarantee: "25 000₽", hour: 17, minute: 0, durationMinutes: 180, priority: 55 },
  { repeat: "weekly", dow: 1, category: "Турнир дня", name: "Magic MKO", buyin: "500₽", rebuy: "R:500₽", guarantee: "130 000₽", hour: 18, minute: 0, durationMinutes: 180, priority: 90 },
  { repeat: "weekly", dow: 2, category: "Турнир дня", name: "Турнир Тракториста", buyin: "300₽", rebuy: "R:300₽ / A:300₽", guarantee: "120 000₽", hour: 18, minute: 0, durationMinutes: 180, priority: 90 },
  { repeat: "weekly", dow: 3, category: "Турнир дня", name: "Турнир Стольник", buyin: "100₽", rebuy: "R:100₽ / A:100₽", guarantee: "70 000₽", hour: 18, minute: 0, durationMinutes: 180, priority: 90 },
  { repeat: "weekly", dow: 4, category: "Турнир дня", name: "Мистери+", buyin: "1 200₽", rebuy: "R:1 200₽", guarantee: "220 000₽", hour: 18, minute: 0, durationMinutes: 180, priority: 90 },
  { repeat: "weekly", dow: 5, category: "Турнир дня", name: "Нокаут Прогрессив", buyin: "500₽", rebuy: "R:500₽", guarantee: "130 000₽", hour: 18, minute: 0, durationMinutes: 180, priority: 90 },
  { repeat: "weekly", dow: 6, category: "Турнир дня", name: "Фриролл", buyin: "0₽", rebuy: "R:400₽ / A:800₽", guarantee: "200 000₽", hour: 18, minute: 0, durationMinutes: 180, priority: 90 },
  { repeat: "weekly", dow: 0, category: "Турнир недели", name: "Нокаут недели", buyin: "2 000₽", rebuy: "R:2 000₽", guarantee: "300 000₽", hour: 18, minute: 0, durationMinutes: 180, priority: 100 },
  { repeat: "daily", category: "Сателлит", name: "К турниру месяца Нокаут", buyin: "300₽", rebuy: "R:300₽ / A:300₽", guarantee: "1 билет за 10 000₽", hour: 19, minute: 0, durationMinutes: 180, priority: 35 },
  { repeat: "daily", category: "Ежедневный", name: "PLO4", buyin: "300₽", rebuy: "—", guarantee: "10 000₽", hour: 20, minute: 0, durationMinutes: 180, priority: 50 },
  { repeat: "daily", category: "Ежедневный", name: "Energetic Tournament", buyin: "200₽", rebuy: "R:200₽ / A:200₽", guarantee: "10 000₽", hour: 22, minute: 0, durationMinutes: 180, priority: 50 },
  { repeat: "daily", category: "Ежедневный", name: "MKO", buyin: "50₽", rebuy: "—", guarantee: "3 000₽", hour: 23, minute: 0, durationMinutes: 180, priority: 45 },
  { date: "2026-05-31", category: "Турнир месяца", name: "Турнир месяца — Нокаут", buyin: "10 000₽", rebuy: "R:10 000₽", guarantee: "500 000₽", hour: 18, minute: 0, durationMinutes: 240, priority: 120 },
  { date: "2026-06-28", category: "Турнир месяца", name: "Турнир месяца", buyin: "3 000₽", rebuy: "R:3 000₽ / A:3 000₽", guarantee: "1 000 000₽", hour: 18, minute: 0, durationMinutes: 240, priority: 120 }
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

function pokerGetFreerollItemDeltaMinutes(item, msk) {
  if (!item || !msk) return Infinity;
  var itemMinutes = Number(item.hour || 0) * 60 + Number(item.minute || 0);
  if (item.daily) {
    var dailyDelta = itemMinutes - msk.minutes;
    if (dailyDelta < 0) dailyDelta += 1440;
    return dailyDelta;
  }
  var dayDelta = (Number(item.dow) - msk.dow + 7) % 7;
  var totalDelta = dayDelta * 1440 + (itemMinutes - msk.minutes);
  if (totalDelta < 0) totalDelta += 7 * 1440;
  return totalDelta;
}

function pokerFindNextFreerollItem(items, now) {
  items = Array.isArray(items) ? items : HOME_FREEROLL_SCHEDULE;
  if (!items.length) return null;
  var msk = pokerGetMskDowAndMinutes(now || new Date());
  var best = null;
  var bestDelta = Infinity;
  items.forEach(function (item) {
    var totalDelta = pokerGetFreerollItemDeltaMinutes(item, msk);
    if (totalDelta < bestDelta) {
      bestDelta = totalDelta;
      best = item;
    }
  });
  return best;
}

var HOME_TOURNAMENT_WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];
var HOME_TOURNAMENT_WEEK_DAY_LABELS = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
var HOME_FREEROLL_DAY_LABELS = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
var HOME_TOURNAMENT_BUBBLE_BONUSES = { 0: "1500 ₽", 1: "500 ₽", 2: "500 ₽", 3: "300 ₽", 4: "1200 ₽", 5: "500 ₽" };
var HOME_TOURNAMENT_ACES_PREFLOP_BONUSES = { 0: "1500 ₽", 1: "500 ₽", 2: "500 ₽", 3: "300 ₽", 4: "1200 ₽", 5: "500 ₽" };
var HOME_TOURNAMENT_BANNER_PRELOADS = {};
var HOME_TOURNAMENT_BANNERS_PRELOAD_STARTED = false;

function getHomeTournamentBannerUrl(file) {
  if (!file) return "";
  return typeof getAssetUrl === "function" ? getAssetUrl(file) : "./assets/" + file;
}

function setHomeTournamentImagePriority(img, priority) {
  if (!img) return;
  try {
    img.loading = "eager";
  } catch (e) {}
  try {
    img.fetchPriority = priority || "low";
  } catch (e2) {}
}

function preloadHomeTournamentBanner(file, priority) {
  if (!file || typeof Image === "undefined") return null;
  var url = getHomeTournamentBannerUrl(file);
  if (!url) return null;
  if (HOME_TOURNAMENT_BANNER_PRELOADS[url]) {
    if (priority === "high") setHomeTournamentImagePriority(HOME_TOURNAMENT_BANNER_PRELOADS[url].img, "high");
    return HOME_TOURNAMENT_BANNER_PRELOADS[url];
  }
  var img = new Image();
  var state = { img: img, loaded: false, failed: false, url: url };
  HOME_TOURNAMENT_BANNER_PRELOADS[url] = state;
  img.decoding = "async";
  setHomeTournamentImagePriority(img, priority || "low");
  img.onload = function () {
    state.loaded = true;
  };
  img.onerror = function () {
    state.failed = true;
  };
  img.src = url;
  return state;
}

function preloadHomeTournamentBanners(preferredWeekday) {
  if (HOME_TOURNAMENT_BANNERS_PRELOAD_STARTED) {
    var preferred = TOURNAMENT_OF_DAY_BY_WEEKDAY[preferredWeekday];
    if (preferred && preferred.banner) preloadHomeTournamentBanner(preferred.banner, "high");
    return;
  }
  HOME_TOURNAMENT_BANNERS_PRELOAD_STARTED = true;
  var order = [];
  if (TOURNAMENT_OF_DAY_BY_WEEKDAY[preferredWeekday]) order.push(preferredWeekday);
  HOME_TOURNAMENT_WEEK_ORDER.forEach(function (dow) {
    if (order.indexOf(dow) === -1) order.push(dow);
  });
  order.forEach(function (dow) {
    var item = TOURNAMENT_OF_DAY_BY_WEEKDAY[dow];
    if (item && item.banner) preloadHomeTournamentBanner(item.banner, dow === preferredWeekday ? "high" : "low");
  });
}

function pokerGetFreerollDayLabel(item) {
  if (!item) return "—";
  if (item.daily) return "Ежедневный";
  return HOME_FREEROLL_DAY_LABELS[Number(item.dow)] || item.day || "—";
}

function pokerFormatRubSpacing(value) {
  return String(value || "—").replace(/₽/g, " ₽");
}

function pokerGetMskDatePartsAt(now) {
  now = now || new Date();
  try {
    var parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Moscow",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(now);
    var map = {};
    parts.forEach(function (part) {
      if (part.type !== "literal") map[part.type] = part.value;
    });
    return {
      y: parseInt(map.year, 10),
      m: parseInt(map.month, 10) - 1,
      d: parseInt(map.day, 10)
    };
  } catch (eMskParts) {
    return { y: now.getFullYear(), m: now.getMonth(), d: now.getDate() };
  }
}

function pokerAddDaysToYmd(y, m0, d, add) {
  var dt = new Date(Date.UTC(y, m0, d, 12, 0, 0, 0));
  dt.setUTCDate(dt.getUTCDate() + add);
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth(), d: dt.getUTCDate() };
}

function pokerYmdKey(parts) {
  var mo = parts.m + 1;
  return parts.y + "-" + (mo < 10 ? "0" : "") + mo + "-" + (parts.d < 10 ? "0" : "") + parts.d;
}

function pokerMskYmdDow(parts) {
  return new Date(Date.UTC(parts.y, parts.m, parts.d, 12, 0, 0, 0)).getUTCDay();
}

function pokerMskDateTimeToUtc(parts, hour, minute) {
  return new Date(Date.UTC(parts.y, parts.m, parts.d, Number(hour || 0) - 3, Number(minute || 0), 0, 0));
}

function pokerFullScheduleSlotForDate(item, parts) {
  var start = pokerMskDateTimeToUtc(parts, item.hour, item.minute);
  var end = new Date(start.getTime() + Number(item.durationMinutes || 180) * 60000);
  return {
    item: item,
    start: start,
    end: end,
    key: pokerYmdKey(parts),
    dow: pokerMskYmdDow(parts)
  };
}

function pokerCollectFullScheduleSlots(now) {
  now = now || new Date();
  var today = pokerGetMskDatePartsAt(now);
  var slots = [];
  POKER_FULL_TOURNAMENT_SCHEDULE.forEach(function (item) {
    for (var offset = -1; offset <= 8; offset++) {
      var parts = pokerAddDaysToYmd(today.y, today.m, today.d, offset);
      var key = pokerYmdKey(parts);
      var dow = pokerMskYmdDow(parts);
      if (item.date && item.date !== key) continue;
      if (item.repeat === "daily" || item.date || (item.repeat === "weekly" && Number(item.dow) === dow)) {
        slots.push(pokerFullScheduleSlotForDate(item, parts));
      }
    }
  });
  return slots;
}

function pokerGuaranteeSortValue(value) {
  var n = Number(String(value || "").replace(/[^\d]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function pokerSortTournamentSlots(a, b) {
  var startDelta = b.start - a.start;
  if (startDelta !== 0) return startDelta;
  var priorityDelta = Number(b.item.priority || 0) - Number(a.item.priority || 0);
  if (priorityDelta !== 0) return priorityDelta;
  return pokerGuaranteeSortValue(b.item.guarantee) - pokerGuaranteeSortValue(a.item.guarantee);
}

function pokerGetCurrentTournamentSlot(now) {
  now = now || new Date();
  var slots = pokerCollectFullScheduleSlots(now);
  var active = slots.filter(function (slot) {
    return now >= slot.start && now < slot.end;
  });
  if (active.length) {
    active.sort(pokerSortTournamentSlots);
    return { status: "live", slot: active[0] };
  }
  var upcoming = slots.filter(function (slot) {
    return slot.start > now;
  });
  upcoming.sort(function (a, b) {
    var startDelta = a.start - b.start;
    if (startDelta !== 0) return startDelta;
    var priorityDelta = Number(b.item.priority || 0) - Number(a.item.priority || 0);
    if (priorityDelta !== 0) return priorityDelta;
    return pokerGuaranteeSortValue(b.item.guarantee) - pokerGuaranteeSortValue(a.item.guarantee);
  });
  return upcoming.length ? { status: "upcoming", slot: upcoming[0] } : { status: "empty", slot: null };
}
window.pokerGetCurrentTournamentSlot = pokerGetCurrentTournamentSlot;

function pokerFormatDurationMs(ms) {
  if (!Number.isFinite(ms) || ms <= 0) return "Скоро";
  var totalSeconds = Math.floor(ms / 1000);
  var days = Math.floor(totalSeconds / 86400);
  var h = Math.floor((totalSeconds % 86400) / 3600);
  var m = Math.floor((totalSeconds % 3600) / 60);
  var s = totalSeconds % 60;
  if (days > 0) return days + "д " + h + "ч";
  return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
}

function pokerFormatScheduleTime(item) {
  var h = Number(item && item.hour);
  var m = Number(item && item.minute);
  if (!Number.isFinite(h)) h = 0;
  if (!Number.isFinite(m)) m = 0;
  return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m;
}

function renderHomeLiveTournament(now) {
  var card = document.getElementById("homeLiveTournament");
  if (!card) return;
  now = now || new Date();
  var state = pokerGetCurrentTournamentSlot(now);
  if (!state.slot) {
    card.hidden = true;
    return;
  }
  card.hidden = false;
  var item = state.slot.item;
  var isLive = state.status === "live";
  card.classList.toggle("home-live-tournament--upcoming", !isLive);
  var titleEl = document.getElementById("homeLiveTournamentTitle");
  var badgeEl = document.getElementById("homeLiveTournamentBadge");
  var nameEl = document.getElementById("homeLiveTournamentName");
  var roomEl = document.getElementById("homeLiveTournamentRoom");
  var prizeEl = document.getElementById("homeLiveTournamentPrize");
  var metaEl = document.getElementById("homeLiveTournamentMeta");
  var timerLabelEl = document.getElementById("homeLiveTournamentTimerLabel");
  var timerEl = document.getElementById("homeLiveTournamentTimer");
  var buyinEl = document.getElementById("homeLiveTournamentBuyin");
  var progressEl = document.getElementById("homeLiveTournamentProgress");
  if (titleEl) titleEl.textContent = isLive ? "Идет сейчас" : "Скоро стартует";
  if (badgeEl) badgeEl.innerHTML = '<span aria-hidden="true"></span>' + (isLive ? "LIVE" : "СКОРО");
  if (nameEl) nameEl.textContent = item.name || "Турнир";
  if (roomEl) roomEl.textContent = item.category || "Poker21+";
  if (prizeEl) prizeEl.textContent = pokerFormatRubSpacing(item.guarantee || "—");
  if (metaEl) metaEl.textContent = pokerFormatScheduleTime(item) + " МСК · " + (item.rebuy || "без ребая");
  if (timerLabelEl) timerLabelEl.textContent = isLive ? "До конца регистрации" : "До старта";
  if (timerEl) timerEl.textContent = pokerFormatDurationMs((isLive ? state.slot.end : state.slot.start) - now);
  if (buyinEl) buyinEl.textContent = "Вход: " + pokerFormatRubSpacing(item.buyin || "—");
  if (progressEl) {
    var progress = isLive ? (now - state.slot.start) / (state.slot.end - state.slot.start) : 0;
    progressEl.style.width = Math.max(0, Math.min(100, Math.round(progress * 100))) + "%";
  }
}

function renderHomeTournamentWeekList(activeWeekday) {
  var el = document.getElementById("homeTournamentWeekList");
  if (!el) return;
  el.innerHTML = "";
  HOME_TOURNAMENT_WEEK_ORDER.forEach(function (dow) {
    var item = TOURNAMENT_OF_DAY_BY_WEEKDAY[dow] || {};
    var row = document.createElement("button");
    row.type = "button";
    row.className = "home-tournament-week-row";
    if (dow === activeWeekday) row.classList.add("home-tournament-week-row--active");
    row.setAttribute("aria-pressed", dow === activeWeekday ? "true" : "false");
    if (item.name === "Фриролл") row.classList.add("home-tournament-week-row--freeroll");
    row.setAttribute(
      "aria-label",
      HOME_TOURNAMENT_WEEK_DAY_LABELS[dow] + ": " + (item.name || "Турнир дня") + ", приз " + (item.guarantee || "—")
    );

    var day = document.createElement("span");
    day.className = "home-tournament-week-row__day";
    day.textContent = HOME_TOURNAMENT_WEEK_DAY_LABELS[dow];

    var main = document.createElement("span");
    main.className = "home-tournament-week-row__main";

    var name = document.createElement("span");
    name.className = "home-tournament-week-row__name";
    name.textContent = "Приз " + pokerFormatRubSpacing(item.guarantee);

    var meta = document.createElement("span");
    meta.className = "home-tournament-week-row__meta";
    meta.textContent =
      (item.name || "Турнир дня") +
      " · " +
      pokerFormatRubSpacing(item.buyin) +
      " · 18:00 МСК";

    main.appendChild(name);
    main.appendChild(meta);

    row.appendChild(day);
    row.appendChild(main);
    row.addEventListener("pointerenter", function () {
      if (item.banner) preloadHomeTournamentBanner(item.banner, "high");
    });
    row.addEventListener("pointerdown", function () {
      if (item.banner) preloadHomeTournamentBanner(item.banner, "high");
    });
    row.addEventListener("click", function () {
      if (item.banner) preloadHomeTournamentBanner(item.banner, "high");
      window._homeTournamentSelectedWeekday = dow;
      updateTournamentDayBlock();
    });
    el.appendChild(row);
  });
}

function syncHomeTournamentBonusAvailability(activeWeekday) {
  var league2Active = activeWeekday === 2 || activeWeekday === 3;
  var bonuses = document.querySelectorAll(".home-tournament-bonus[data-home-tournament-bonus]");
  bonuses.forEach(function (bonus) {
    var kind = bonus.getAttribute("data-home-tournament-bonus");
    var active = kind === "league2" ? league2Active : !league2Active;
    bonus.classList.toggle("home-tournament-bonus--inactive", !active);
    bonus.setAttribute("aria-disabled", active ? "false" : "true");
  });
}

function syncHomeTournamentBubbleBuyinLabel(activeWeekday) {
  var bonusEl = document.querySelector(".home-tournament-bonus--bubble-buyin");
  var amountEl = document.getElementById("homeTournamentBubbleBuyinAmount");
  var labelEl = document.getElementById("homeTournamentBubbleBuyinLabel");
  if (!amountEl || !labelEl) return;
  var amount = HOME_TOURNAMENT_BUBBLE_BONUSES[Number(activeWeekday)] || "";
  var active = !!amount;
  amountEl.textContent = amount || "—";
  labelEl.textContent = "бабблу";
  if (bonusEl) {
    bonusEl.classList.toggle("home-tournament-bonus--inactive", !active);
    bonusEl.setAttribute("aria-disabled", active ? "false" : "true");
    bonusEl.setAttribute("aria-label", active ? amount + " бабблу" : "Бонус бабблу недоступен в этот день");
  }
}

function syncHomeTournamentAcesPreflopBonus(activeWeekday) {
  var bonusEl = document.getElementById("homeTournamentAcesPreflopBonus");
  var amountEl = document.getElementById("homeTournamentAcesPreflopAmount");
  var labelEl = document.getElementById("homeTournamentAcesPreflopLabel");
  if (!bonusEl || !amountEl || !labelEl) return;
  var amount = HOME_TOURNAMENT_ACES_PREFLOP_BONUSES[Number(activeWeekday)] || "";
  var active = !!amount;
  amountEl.textContent = amount || "—";
  labelEl.textContent = "за вылет на тузах префлоп";
  bonusEl.classList.toggle("home-tournament-bonus--inactive", !active);
  bonusEl.setAttribute("aria-disabled", active ? "false" : "true");
  bonusEl.setAttribute("aria-label", active ? amount + " за вылет на тузах префлоп" : "Бонус за вылет на тузах префлоп недоступен в этот день");
}

function updateHomeTournamentFocusFlow() {
  var section = document.querySelector(".tournament-day-home-dual--tournament-focus");
  if (!section) return;
  var flow = section.querySelector(".home-tournament-flow");
  var svg = flow ? flow.querySelector(".home-tournament-flow__svg") : null;
  var activeRow = section.querySelector(".home-tournament-week-row--active");
  var target =
    section.querySelector(".home-tournament-detail--has-banner .home-tournament-detail__media") ||
    section.querySelector(".home-tournament-detail--no-banner .home-tournament-detail__content") ||
    section.querySelector(".home-tournament-detail__media");
  if (!flow || !svg || !activeRow || !target) return;
  window.requestAnimationFrame(function () {
    var sectionRect = section.getBoundingClientRect();
    var rowRect = activeRow.getBoundingClientRect();
    var targetRect = target.getBoundingClientRect();
    var gap = targetRect.left - rowRect.right;
    if (sectionRect.width < 360 || gap < 24 || rowRect.height <= 0 || targetRect.height <= 0) {
      flow.classList.remove("home-tournament-flow--ready");
      return;
    }
    var startX = rowRect.right - sectionRect.left - 3;
    var startY = rowRect.top + rowRect.height * 0.5 - sectionRect.top;
    var endX = targetRect.left - sectionRect.left + Math.min(20, targetRect.width * 0.09);
    var endY = targetRect.top + targetRect.height * 0.55 - sectionRect.top;
    var dx = endX - startX;
    var dy = endY - startY;
    var c1x = startX + dx * 0.22;
    var c2x = startX + dx * 0.54;
    var c1y = startY - Math.max(12, Math.abs(dy) * 0.22);
    var c2y = endY + Math.max(8, Math.abs(dy) * 0.18);
    var path = "M " + startX + " " + startY + " C " + c1x + " " + c1y + " " + c2x + " " + c2y + " " + endX + " " + endY;
    var upperPath =
      "M " +
      startX +
      " " +
      (startY - 8) +
      " C " +
      c1x +
      " " +
      (c1y - 10) +
      " " +
      c2x +
      " " +
      (c2y - 8) +
      " " +
      endX +
      " " +
      (endY - 7);
    var lowerPath =
      "M " +
      startX +
      " " +
      (startY + 8) +
      " C " +
      c1x +
      " " +
      (c1y + 8) +
      " " +
      c2x +
      " " +
      (c2y + 10) +
      " " +
      endX +
      " " +
      (endY + 7);
    svg.setAttribute("viewBox", "0 0 " + Math.max(1, Math.round(sectionRect.width)) + " " + Math.max(1, Math.round(sectionRect.height)));
    var halo = svg.querySelector(".home-tournament-flow__trail--halo");
    var core = svg.querySelector(".home-tournament-flow__trail--core");
    var strandA = svg.querySelector(".home-tournament-flow__trail--strand-a");
    var strandB = svg.querySelector(".home-tournament-flow__trail--strand-b");
    if (halo) halo.setAttribute("d", path);
    if (core) core.setAttribute("d", path);
    if (strandA) strandA.setAttribute("d", upperPath);
    if (strandB) strandB.setAttribute("d", lowerPath);
    var midX = startX + dx * 0.48;
    var midY = startY + dy * 0.44 - 10;
    [
      [".home-tournament-flow__spark--start", startX, startY],
      [".home-tournament-flow__spark--mid", midX, midY],
      [".home-tournament-flow__spark--end", endX, endY]
    ].forEach(function (spark) {
      var el = svg.querySelector(spark[0]);
      if (!el) return;
      el.setAttribute("cx", spark[1]);
      el.setAttribute("cy", spark[2]);
    });
    flow.classList.add("home-tournament-flow--ready");
  });
}

if (!window._homeTournamentFocusFlowResizeBound) {
  window._homeTournamentFocusFlowResizeBound = true;
  window.addEventListener("resize", updateHomeTournamentFocusFlow);
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
  var item = pokerFindNextFreerollItem(DOWNLOAD_XPOKER_FREEROLL_SCHEDULE, now || new Date());
  if (!item) return "Фрироллов нет в расписании";
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
  var displayItems = HOME_FREEROLL_SCHEDULE.slice();
  var nearestItem = null;
  var followingItem = null;
  try {
    var now = new Date();
    var msk = pokerGetMskDowAndMinutes(now);
    var nextItem = pokerFindNextFreerollItem(HOME_FREEROLL_SCHEDULE, now);
    nextIndex = HOME_FREEROLL_SCHEDULE.indexOf(nextItem);
    displayItems.sort(function (a, b) {
      var deltaA = pokerGetFreerollItemDeltaMinutes(a, msk);
      var deltaB = pokerGetFreerollItemDeltaMinutes(b, msk);
      if (deltaA !== deltaB) return deltaA - deltaB;
      return HOME_FREEROLL_SCHEDULE.indexOf(a) - HOME_FREEROLL_SCHEDULE.indexOf(b);
    });
    nearestItem = displayItems[0] || null;
    followingItem = displayItems[1] || null;
  } catch (eNextFreeroll) {}
  displayItems.forEach(function (item) {
    var card = document.createElement("div");
    card.className = "home-freeroll-schedule__item";
    var row = document.createElement("div");
    row.className = "home-freeroll-schedule__row";
    row.setAttribute("role", "button");
    row.setAttribute("tabindex", "0");
    if (item.room === "Poker21") {
      card.classList.add("home-freeroll-schedule__item--poker21");
      row.classList.add("home-freeroll-schedule__row--poker21");
    }
    if (item.daily) {
      card.classList.add("home-freeroll-schedule__item--daily");
      row.classList.add("home-freeroll-schedule__row--daily");
    } else if (item.dow === 6) {
      card.classList.add("home-freeroll-schedule__item--saturday");
      row.classList.add("home-freeroll-schedule__row--saturday");
    }
    if (nextIndex >= 0 && HOME_FREEROLL_SCHEDULE[nextIndex] === item) {
      card.classList.add("home-freeroll-schedule__item--next");
      row.classList.add("home-freeroll-schedule__row--next");
    }
    var stampText = "";
    if (nearestItem === item) {
      card.classList.add("home-freeroll-schedule__item--nearest");
      row.classList.add("home-freeroll-schedule__row--nearest");
      stampText = "Ближайший";
    } else if (followingItem === item) {
      card.classList.add("home-freeroll-schedule__item--following");
      row.classList.add("home-freeroll-schedule__row--following");
      stampText = "Следующий";
    }
    var day = document.createElement("span");
    day.className = "home-freeroll-schedule__day";
    day.textContent = pokerGetFreerollDayLabel(item);
    var main = document.createElement("span");
    main.className = "home-freeroll-schedule__main";
    var title = document.createElement("span");
    title.className = "home-freeroll-schedule__title";
    title.textContent = pokerFormatRubSpacing(item.title);
    var meta = document.createElement("span");
    meta.className = "home-freeroll-schedule__meta";
    meta.textContent = item.meta;
    var entry = document.createElement("span");
    entry.className = "home-freeroll-schedule__entry";
    entry.textContent = "Вход: " + pokerFormatRubSpacing(item.buyin || "0₽");
    main.appendChild(title);
    main.appendChild(meta);
    main.appendChild(entry);
    row.appendChild(day);
    row.appendChild(main);
    if (stampText) {
      var stamp = document.createElement("span");
      stamp.className = "home-freeroll-schedule__stamp";
      stamp.textContent = stampText;
      card.appendChild(stamp);
    }
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
    card.appendChild(row);
    el.appendChild(card);
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
  var timerLabelEls = [
    document.getElementById("tournamentDayTimerLabel"),
    document.getElementById("tournamentDayWeekTimerLabel"),
    document.getElementById("scheduleTournamentDayTimerLabel")
  ].filter(Boolean);
  var timerEls = [
    document.getElementById("tournamentDayTimer"),
    document.getElementById("tournamentDayWeekTimer"),
    document.getElementById("scheduleTournamentDayTimer")
  ].filter(Boolean);
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
    var fallbackBuyin = item.room === "Poker21" && item.dow === 6 ? "0₽ · R:400₽ / A:800₽" : "0₽";
    var fallbackGuarantee = item.daily ? "9 000₽" : "200 000₽";
    return {
      name: item.room === "X-poker" ? "Фриролл X-poker" : "Фриролл",
      buyin: item.buyin || fallbackBuyin,
      guarantee: item.guarantee || fallbackGuarantee
    };
  }
  function getNextDailyFreerollSlot(now, tInfo, hourOpts) {
    hourOpts = hourOpts || {};
    var startUtcH = hourOpts.startUtcHour != null ? hourOpts.startUtcHour : MSK_START_UTC_HOUR;
    var endRegUtcH = hourOpts.endRegUtcHour != null ? hourOpts.endRegUtcHour : MSK_END_REG_UTC_HOUR;
    var p = getMskDateParts();
    var startToday = new Date(Date.UTC(p.y, p.m, p.d, startUtcH, 0, 0, 0));
    var endRegToday = new Date(Date.UTC(p.y, p.m, p.d, endRegUtcH, 0, 0, 0));
    if (now < startToday) return { t: tInfo, target: startToday, label: "" };
    if (now < endRegToday) return { t: tInfo, target: endRegToday, label: "до конца рег " };
    var nextDay = addDaysToYmd(p.y, p.m, p.d, 1);
    var nextStart = new Date(Date.UTC(nextDay.y, nextDay.m, nextDay.d, startUtcH, 0, 0, 0));
    return { t: tInfo, target: nextStart, label: "" };
  }
  /** Карточка «Следующий фриролл»: ближайший слот из списка фрироллов на главной. */
  function getNextFreerollState(now) {
    var best = null;
    HOME_FREEROLL_SCHEDULE.forEach(function (item) {
      var startUtcH = Number(item.hour) - 3;
      var slotOpts = {
        startUtcHour: startUtcH,
        endRegUtcHour: startUtcH + 3
      };
      var slot = item.daily
        ? getNextDailyFreerollSlot(now, getFreerollTournamentInfo(item), slotOpts)
        : getNextWeekdayFreerollSlot(now, item.dow, getFreerollTournamentInfo(item), slotOpts);
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
  function formatCountdownDiff(diff) {
    if (diff <= 0) return "Скоро";
    var h = Math.floor(diff / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);
    return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }
  function formatTimer() {
    var n = new Date();
    var state = getTournamentDayState(n);
    var currentNameStr = state.t ? state.t.name : "";
    var currentBuyinStr = state.t ? state.t.buyin : "";
    var currentGuaranteeStr = state.t ? state.t.guarantee : "";
    var selectedWeekday = Number(window._homeTournamentSelectedWeekday);
    if (!Number.isFinite(selectedWeekday) || !TOURNAMENT_OF_DAY_BY_WEEKDAY[selectedWeekday]) {
      selectedWeekday = state.weekday;
    }
    preloadHomeTournamentBanners(selectedWeekday);
    var detailState =
      selectedWeekday === state.weekday
        ? state
        : getNextWeekdayFreerollSlot(n, selectedWeekday, TOURNAMENT_OF_DAY_BY_WEEKDAY[selectedWeekday]);
    var detailNameStr = detailState.t ? detailState.t.name : "";
    var detailBuyinStr = detailState.t ? detailState.t.buyin : "";
    var detailGuaranteeStr = detailState.t ? detailState.t.guarantee : "";
    renderHomeTournamentWeekList(selectedWeekday);
    renderHomeLiveTournament(n);
    var homeTournamentName = document.getElementById("tournamentDayHomeName");
    if (homeTournamentName) homeTournamentName.textContent = detailNameStr || "Турнир дня";
    window._tournamentDayShare = {
      name: detailNameStr,
      time: "18:00",
      guarantee: detailGuaranteeStr
    };
    var scheduleTdName = document.getElementById("scheduleTournamentDayName");
    if (scheduleTdName) {
      scheduleTdName.textContent = currentNameStr === "Нокаут Мистери" ? "" : currentNameStr;
      if (currentNameStr === "Фриролл") {
        scheduleTdName.classList.add("tournament-day-name--freeroll");
      } else {
        scheduleTdName.classList.remove("tournament-day-name--freeroll");
      }
    }
    var homeBuyin = document.getElementById("tournamentDayBuyin");
    var scheduleBuyin = document.getElementById("scheduleTournamentDayBuyin");
    if (homeBuyin) homeBuyin.textContent = detailBuyinStr;
    if (scheduleBuyin) scheduleBuyin.textContent = currentBuyinStr;
    var homeGuarantee = document.getElementById("tournamentDayGuarantee");
    var scheduleGuarantee = document.getElementById("scheduleTournamentDayGuarantee");
    if (homeGuarantee) homeGuarantee.textContent = detailGuaranteeStr;
    if (scheduleGuarantee) scheduleGuarantee.textContent = currentGuaranteeStr;
    var detailTimerLabel = detailState.label ? detailState.label : "Старт через: ";
    var detailTimerStr = formatCountdownDiff(detailState.target - n);
    var currentTimerLabel = state.label ? state.label : "Старт через: ";
    var currentTimerStr = formatCountdownDiff(state.target - n);
    var homeTimerLabel = document.getElementById("tournamentDayTimerLabel");
    var homeWeekTimerLabel = document.getElementById("tournamentDayWeekTimerLabel");
    var scheduleTimerLabel = document.getElementById("scheduleTournamentDayTimerLabel");
    if (homeTimerLabel) homeTimerLabel.textContent = detailTimerLabel;
    if (homeWeekTimerLabel) homeWeekTimerLabel.textContent = detailTimerLabel;
    if (scheduleTimerLabel) scheduleTimerLabel.textContent = currentTimerLabel;
    var homeTimer = document.getElementById("tournamentDayTimer");
    var homeWeekTimer = document.getElementById("tournamentDayWeekTimer");
    var scheduleTimer = document.getElementById("scheduleTournamentDayTimer");
    if (homeTimer) homeTimer.textContent = detailTimerStr;
    if (homeWeekTimer) homeWeekTimer.textContent = detailTimerStr;
    if (scheduleTimer) scheduleTimer.textContent = currentTimerStr;
    var tdWeekTime = document.getElementById("tournamentDayHomeWeekTime");
    if (tdWeekTime && detailState.target) {
      tdWeekTime.textContent = pokerMskWeekdayShortAt(detailState.target.getTime()) + ", 18:00 МСК";
    }
    syncHomeTournamentBonusAvailability(selectedWeekday);
    syncHomeTournamentBubbleBuyinLabel(selectedWeekday);
    syncHomeTournamentAcesPreflopBonus(selectedWeekday);
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
    var homeTournamentDetail = document.querySelector(".home-tournament-detail");
    var homeTrophyMedia = document.querySelector(".home-tournament-detail__media");
    var homeTrophyImg = document.getElementById("tournamentDayHomeTrophyImg");
    var detailBannerFile = detailState.t && detailState.t.banner ? detailState.t.banner : "";
    var hasDetailBanner = !!detailBannerFile;
    if (homeTournamentDetail) {
      homeTournamentDetail.classList.toggle("home-tournament-detail--has-banner", hasDetailBanner);
      homeTournamentDetail.classList.toggle("home-tournament-detail--no-banner", !hasDetailBanner);
    }
    if (homeTrophyMedia) {
      homeTrophyMedia.hidden = !hasDetailBanner;
      if (hasDetailBanner && detailState.t.bannerWidth && detailState.t.bannerHeight) {
        homeTrophyMedia.style.setProperty("--home-tournament-banner-aspect", detailState.t.bannerWidth + " / " + detailState.t.bannerHeight);
      } else {
        homeTrophyMedia.style.removeProperty("--home-tournament-banner-aspect");
      }
    }
    if (homeTrophyImg) {
      if (hasDetailBanner) {
        var homeTrophySrc = getHomeTournamentBannerUrl(detailBannerFile);
        setHomeTournamentImagePriority(homeTrophyImg, "high");
        preloadHomeTournamentBanner(detailBannerFile, "high");
        if (homeTrophyImg.getAttribute("data-home-tournament-banner-src") !== homeTrophySrc) {
          homeTrophyImg.setAttribute("data-home-tournament-banner-src", homeTrophySrc);
          homeTrophyImg.src = homeTrophySrc;
        }
        homeTrophyImg.alt = detailState.t.bannerAlt || detailNameStr || "Турнир дня";
        if (detailState.t.bannerWidth) homeTrophyImg.width = detailState.t.bannerWidth;
        if (detailState.t.bannerHeight) homeTrophyImg.height = detailState.t.bannerHeight;
      } else {
        homeTrophyImg.removeAttribute("data-home-tournament-banner-src");
        homeTrophyImg.removeAttribute("src");
        homeTrophyImg.alt = "";
      }
    }
    updateHomeTournamentFocusFlow();
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
