var HOME_TOURNAMENT_MONDAY_BANNER_FILE = "home-tournament-monday-mystery-bounty-170k.webp";
var HOME_TOURNAMENT_TUESDAY_BANNER_FILE = "home-tournament-tuesday-tractor-150k-r300-a500.webp";
var HOME_TOURNAMENT_WEDNESDAY_BANNER_FILE = "home-tournament-wednesday-knockout-300k.webp";
var HOME_TOURNAMENT_THURSDAY_BANNER_FILE = "home-tournament-thursday-mystery-100k.webp";
var HOME_TOURNAMENT_FRIDAY_BANNER_FILE = "home-tournament-friday-knockout-progressive-170k.webp";
var HOME_TOURNAMENT_SATURDAY_BANNER_FILE = HOME_TOURNAMENT_WEDNESDAY_BANNER_FILE;
var HOME_TOURNAMENT_SUNDAY_BANNER_FILE = "home-tournament-sunday-pko-progressive-300k.webp";
var HOME_TOURNAMENT_MONTH_KNOCKOUT_1M_BANNER_FILE = "home-tournament-month-knockout-1m-2026-07-19.webp";

var TOURNAMENT_OF_DAY_BY_WEEKDAY = [
  {
    name: "PKO Нокаут Прогрессив",
    buyin: "2 000₽",
    guarantee: "300 000₽",
    banner: HOME_TOURNAMENT_SUNDAY_BANNER_FILE,
    bannerAlt: "Poker21 PKO Нокаут Прогрессив воскресенья — вход 2 000 ₽, гарантия 300 000 ₽",
    bannerWidth: 640,
    bannerHeight: 915
  },
  {
    name: "Magic MKO",
    buyin: "500₽",
    guarantee: "170 000₽",
    banner: HOME_TOURNAMENT_MONDAY_BANNER_FILE,
    bannerAlt: "Poker21 Magic MKO понедельника — Мистери Баунти 170 000 ₽",
    bannerWidth: 640,
    bannerHeight: 915
  },
  {
    name: "Турнир Тракториста",
    buyin: "300₽",
    guarantee: "150 000₽",
    banner: HOME_TOURNAMENT_TUESDAY_BANNER_FILE,
    bannerAlt: "Poker21 Турнир Тракториста вторника — призовые 150 000 ₽",
    bannerWidth: 640,
    bannerHeight: 915
  },
  {
    name: "Нокаут",
    buyin: "5 000₽",
    guarantee: "300 000₽",
    banner: HOME_TOURNAMENT_WEDNESDAY_BANNER_FILE,
    bannerAlt: "Poker21 Нокаут среды — вход 5 000 ₽, гарантия 300 000 ₽",
    bannerWidth: 640,
    bannerHeight: 915
  },
  {
    name: "Мистери",
    buyin: "300₽",
    guarantee: "100 000₽",
    banner: HOME_TOURNAMENT_THURSDAY_BANNER_FILE,
    bannerAlt: "Poker21 Мистери четверга — вход 300 ₽, гарантия 100 000 ₽",
    bannerWidth: 640,
    bannerHeight: 915
  },
  {
    name: "Нокаут Прогрессив",
    buyin: "500₽",
    guarantee: "170 000₽",
    banner: HOME_TOURNAMENT_FRIDAY_BANNER_FILE,
    bannerAlt: "Poker21 Нокаут Прогрессив пятницы — вход 500 ₽, призовые 170 000 ₽",
    bannerWidth: 640,
    bannerHeight: 915
  },
  {
    name: "Субботний турнир",
    buyin: "350₽ · R:350₽ / A:350₽",
    guarantee: "5 билетов по 10 000₽ каждый",
    banner: HOME_TOURNAMENT_SATURDAY_BANNER_FILE,
    bannerAlt: "Poker21 Субботний турнир — вход, ребай и аддон по 350 ₽, 5 билетов по 10 000 ₽",
    bannerWidth: 640,
    bannerHeight: 915
  }
];

var HOME_TOURNAMENT_DATE_OVERRIDES = {
  "2026-07-19": {
    name: "Турнир месяца — Нокаут",
    buyin: "10 000₽",
    guarantee: "1 000 000₽",
    banner: HOME_TOURNAMENT_MONTH_KNOCKOUT_1M_BANNER_FILE,
    bannerAlt: "Poker21 Турнир месяца Нокаут — вход 10 000 ₽, гарантия 1 000 000 ₽",
    bannerWidth: 640,
    bannerHeight: 1280
  }
};

function pokerGetHomeTournamentItem(dow, now) {
  var parts = pokerGetMskDatePartsAt(now || new Date());
  var key = String(parts.y) + "-" + String(parts.m + 1).padStart(2, "0") + "-" + String(parts.d).padStart(2, "0");
  var override = HOME_TOURNAMENT_DATE_OVERRIDES[key];
  var currentDow = new Date(Date.UTC(parts.y, parts.m, parts.d, 12, 0, 0, 0)).getUTCDay();
  if (override && Number(dow) === currentDow) return override;
  return TOURNAMENT_OF_DAY_BY_WEEKDAY[dow] || TOURNAMENT_OF_DAY_BY_WEEKDAY[0];
}

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
  { day: "Сб", dow: 6, name: "Субботний турнир", title: "5 билетов по 10 000₽", meta: "Poker21 · 18:00 МСК", time: "18:00 МСК", hour: 18, minute: 0, room: "Poker21", roomPage: "poker21", buyin: "350₽ · R:350₽ / A:350₽", guarantee: "5 билетов по 10 000₽ каждый", desc: "Субботний турнир в Poker21. Старт в 18:00 МСК, вход 350₽, ребай 350₽, аддон 350₽, призы: 5 билетов по 10 000₽ каждый." }
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
  { repeat: "weekly", dow: 1, category: "Турнир дня", name: "Magic MKO", buyin: "500₽", rebuy: "R:500₽", guarantee: "170 000₽", hour: 18, minute: 0, durationMinutes: 180, priority: 90 },
  { repeat: "weekly", dow: 2, category: "Турнир дня", name: "Турнир Тракториста", buyin: "300₽", rebuy: "R:300₽ / A:500₽", guarantee: "150 000₽", hour: 18, minute: 0, durationMinutes: 180, priority: 90 },
  { repeat: "weekly", dow: 3, category: "Турнир дня", name: "Нокаут", buyin: "5 000₽", rebuy: "R:5 000₽", guarantee: "300 000₽", hour: 18, minute: 0, durationMinutes: 180, priority: 90 },
  { repeat: "weekly", dow: 3, category: "Турнир дня", name: "Нокаут MKO", buyin: "500₽", rebuy: "R:500₽", guarantee: "50 000₽", hour: 19, minute: 0, durationMinutes: 180, priority: 89, levels: "12/10/8" },
  { repeat: "weekly", dow: 4, category: "Турнир дня", name: "Мистери", buyin: "300₽", rebuy: "R:300₽", guarantee: "100 000₽", hour: 18, minute: 0, durationMinutes: 180, priority: 90 },
  { repeat: "weekly", dow: 5, category: "Турнир дня", name: "Нокаут Прогрессив", buyin: "500₽", rebuy: "R:500₽", guarantee: "170 000₽", hour: 18, minute: 0, durationMinutes: 180, priority: 90 },
  { repeat: "weekly", dow: 6, category: "Турнир дня", name: "Субботний турнир", buyin: "350₽", rebuy: "R:350₽ / A:350₽", guarantee: "5 билетов по 10 000₽ каждый", hour: 18, minute: 0, durationMinutes: 180, priority: 90 },
  { repeat: "weekly", dow: 6, category: "Сателлит", name: "Субботний САТ 1М · NLH", buyin: "350₽", rebuy: "—", guarantee: "Сателлит к турниру с гарантией 1 000 000₽", hour: 18, minute: 0, durationMinutes: 180, priority: 91 },
  { repeat: "weekly", dow: 0, category: "Турнир недели", name: "PKO Нокаут Прогрессив", buyin: "2 000₽", rebuy: "R:2 000₽", guarantee: "300 000₽", hour: 18, minute: 0, durationMinutes: 180, priority: 100 },
  { repeat: "weekly", dow: 0, category: "Ежедневный", name: "PKO", buyin: "1 000₽", rebuy: "—", guarantee: "100 000₽", hour: 19, minute: 0, durationMinutes: 180, priority: 58 },
  { repeat: "weekly", dow: 1, category: "Ежедневный", name: "PKO", buyin: "1 000₽", rebuy: "—", guarantee: "100 000₽", hour: 19, minute: 0, durationMinutes: 180, priority: 58 },
  { repeat: "weekly", dow: 2, category: "Ежедневный", name: "PKO", buyin: "1 000₽", rebuy: "—", guarantee: "100 000₽", hour: 19, minute: 0, durationMinutes: 180, priority: 58 },
  { repeat: "weekly", dow: 3, category: "Ежедневный", name: "PKO", buyin: "1 000₽", rebuy: "—", guarantee: "100 000₽", hour: 19, minute: 0, durationMinutes: 180, priority: 58 },
  { repeat: "weekly", dow: 4, category: "Ежедневный", name: "PKO", buyin: "1 000₽", rebuy: "—", guarantee: "100 000₽", hour: 19, minute: 0, durationMinutes: 180, priority: 58 },
  { repeat: "weekly", dow: 5, category: "Ежедневный", name: "Фризаут", buyin: "1 000₽", rebuy: "Без ребая и аддона", guarantee: "40 000₽", hour: 19, minute: 0, durationMinutes: 180, priority: 58 },
  { repeat: "weekly", dow: 6, category: "Ежедневный", name: "Фризаут", buyin: "1 000₽", rebuy: "Без ребая и аддона", guarantee: "70 000₽", hour: 19, minute: 0, durationMinutes: 180, priority: 58 },
  { repeat: "daily", category: "Сателлит", name: "Сателлит к Нокауту за 5 000₽", buyin: "250₽", rebuy: "R:250₽ / A:250₽", guarantee: "1 билет за 5 000₽", hour: 19, minute: 0, durationMinutes: 180, priority: 35 },
  { repeat: "daily", category: "Сателлит", name: "Сателлит к Нокауту на 1 000 000₽", buyin: "300₽", rebuy: "R:300₽ / A:300₽", guarantee: "1 билет за 10 000₽", hour: 19, minute: 0, durationMinutes: 180, priority: 36 },
  { repeat: "daily", category: "Ежедневный", name: "PLO4", buyin: "300₽", rebuy: "—", guarantee: "10 000₽", hour: 20, minute: 0, durationMinutes: 180, priority: 50 },
  { repeat: "daily", category: "Ежедневный", name: "Energetic Tournament", buyin: "200₽", rebuy: "R:200₽ / A:200₽", guarantee: "10 000₽", hour: 22, minute: 0, durationMinutes: 180, priority: 50 },
  { repeat: "daily", category: "Ежедневный", name: "MKO", buyin: "50₽", rebuy: "—", guarantee: "3 000₽", hour: 23, minute: 0, durationMinutes: 180, priority: 45 },
  { date: "2026-05-31", category: "Турнир месяца", name: "Турнир месяца — Нокаут", buyin: "10 000₽", rebuy: "R:10 000₽", guarantee: "500 000₽", hour: 18, minute: 0, durationMinutes: 240, priority: 120 },
  { date: "2026-06-28", category: "Турнир месяца", name: "Турнир месяца", buyin: "3 000₽", rebuy: "R:3 000₽ / A:3 000₽", guarantee: "1 000 000₽", hour: 18, minute: 0, durationMinutes: 240, priority: 120 },
  { date: "2026-07-19", category: "Турнир месяца", name: "Турнир месяца — Нокаут", buyin: "10 000₽", rebuy: "R:10 000₽", guarantee: "1 000 000₽", hour: 18, minute: 0, durationMinutes: 240, priority: 120 }
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
var HOME_TOURNAMENT_BUBBLE_BONUSES = { 0: "1000 ₽", 1: "1000 ₽", 2: "1000 ₽", 3: "2000 ₽", 4: "1200 ₽", 5: "1000 ₽" };
var HOME_TOURNAMENT_BUBBLE_COUNTS = { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 };
var HOME_TOURNAMENT_BANNER_VERSION = "2026071401";
var HOME_TOURNAMENT_BANNER_PRELOADS = {};

function getHomeTournamentBannerUrl(file) {
  if (!file) return "";
  var base = typeof getAssetUrl === "function" ? getAssetUrl(file) : "./assets/" + file;
  return base + (base.indexOf("?") === -1 ? "?v=" : "&v=") + HOME_TOURNAMENT_BANNER_VERSION;
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

function bindHomeTournamentImageRecovery(img) {
  if (!img || img.dataset.homeTournamentRecoveryBound === "1") return;
  img.dataset.homeTournamentRecoveryBound = "1";
  img.addEventListener("load", function () {
    img.removeAttribute("data-home-tournament-retry-src");
  });
  img.addEventListener("error", function () {
    var expected = img.getAttribute("data-home-tournament-banner-src") || "";
    if (!expected || img.getAttribute("data-home-tournament-retry-src") === expected) return;
    img.setAttribute("data-home-tournament-retry-src", expected);
    img.src = expected + (expected.indexOf("?") === -1 ? "?" : "&") + "retry=1";
  });
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
  var preferred = pokerGetHomeTournamentItem(preferredWeekday, new Date());
  if (preferred && preferred.banner) preloadHomeTournamentBanner(preferred.banner, "high");
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

var HOME_TOURNAMENT_NOTIFY_STATE = {
  subscribed: false,
  selectedIds: [],
  busy: false,
  loaded: false
};

function homeTournamentNotifySlug(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^a-z0-9а-я]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function homeTournamentReminderId(item) {
  if (!item) return "";
  var scope = item.date
    ? "date-" + item.date
    : item.repeat === "weekly"
      ? "weekly-" + String(item.dow)
      : "daily";
  return [
    scope,
    pokerFormatScheduleTime(item).replace(":", ""),
    homeTournamentNotifySlug(item.name || "tournament")
  ].join("-");
}

function getHomeTournamentNotifyItems() {
  var now = new Date();
  var list = (Array.isArray(POKER_FULL_TOURNAMENT_SCHEDULE) ? POKER_FULL_TOURNAMENT_SCHEDULE : []).filter(function (item) {
    if (!item || !item.name) return false;
    if (!item.date) return true;
    var start = new Date(String(item.date) + "T" + pokerFormatScheduleTime(item) + ":00+03:00");
    return !(start && Number.isFinite(start.getTime()) && start.getTime() < now.getTime() - 3600000);
  });
  return list.map(function (item) {
    return Object.assign({ reminderId: homeTournamentReminderId(item) }, item);
  });
}

function homeTournamentNotifyApiBase() {
  return typeof getApiBase === "function" ? getApiBase().replace(/\/$/, "") : "";
}

function homeTournamentNotifyAuthBody(extra) {
  return typeof pokerGuestOrAuthedPostBody === "function" ? pokerGuestOrAuthedPostBody(extra || {}) : extra || {};
}

function homeTournamentNotifyHasCredential() {
  return typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
}

function homeTournamentNotifyReadJson(r) {
  return r.text().then(function (text) {
    if (!text) return {};
    try {
      return JSON.parse(text);
    } catch (e) {
      throw new Error("Сервер вернул неожиданный ответ.");
    }
  });
}

function homeTournamentNotifyMessage(text, isError) {
  text = String(text || "").trim();
  if (!text) return;
  var tgw = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  if (tgw && typeof tgw.showPopup === "function") {
    tgw.showPopup({ title: isError ? "Не получилось" : "Готово", message: text, buttons: [{ type: "ok" }] });
  } else {
    window.alert(text);
  }
}

function setHomeTournamentNotifyBusy(busy) {
  HOME_TOURNAMENT_NOTIFY_STATE.busy = !!busy;
  ["homeTournamentNotifyBtn", "homeTournamentPickBtn", "homeTournamentNotifySaveBtn"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.disabled = !!busy;
  });
}

function renderHomeTournamentNotifyState() {
  var notifyBtn = document.getElementById("homeTournamentNotifyBtn");
  var countEl = document.getElementById("homeTournamentNotifyCount");
  var selectedCount = HOME_TOURNAMENT_NOTIFY_STATE.selectedIds.length;
  if (notifyBtn) {
    notifyBtn.dataset.subscribed = HOME_TOURNAMENT_NOTIFY_STATE.subscribed ? "1" : "0";
    notifyBtn.textContent = HOME_TOURNAMENT_NOTIFY_STATE.subscribed ? "Уведомления включены" : "Подписаться на уведомления о турнирах";
    notifyBtn.setAttribute(
      "aria-label",
      HOME_TOURNAMENT_NOTIFY_STATE.subscribed
        ? "Отключить уведомления о турнирах"
        : "Подписаться на уведомления о турнирах"
    );
  }
  if (countEl) {
    if (HOME_TOURNAMENT_NOTIFY_STATE.subscribed && selectedCount > 0) {
      countEl.textContent = "Выбрано: " + selectedCount;
    } else {
      countEl.textContent = "";
    }
  }
}

function syncHomeTournamentNotifyFromResponse(data) {
  if (!data) return;
  HOME_TOURNAMENT_NOTIFY_STATE.subscribed = data.subscribed === true;
  HOME_TOURNAMENT_NOTIFY_STATE.selectedIds = Array.isArray(data.selectedTournamentIds)
    ? data.selectedTournamentIds.map(String).filter(Boolean)
    : [];
  HOME_TOURNAMENT_NOTIFY_STATE.loaded = true;
  renderHomeTournamentNotifyState();
}

function postHomeTournamentNotify(payload) {
  var base = homeTournamentNotifyApiBase();
  if (!base || !homeTournamentNotifyHasCredential()) {
    return Promise.reject(new Error("Войдите через Telegram, чтобы включить уведомления."));
  }
  return fetch(base + "/api/tournament-reminder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(homeTournamentNotifyAuthBody(payload || {})),
  }).then(function (r) {
    return homeTournamentNotifyReadJson(r).then(function (data) {
      if (!r.ok || !data || data.ok === false) {
        throw new Error(data && data.error ? data.error : "Не удалось обновить уведомления.");
      }
      return data;
    });
  });
}

function loadHomeTournamentNotifyStatus(force) {
  if (!force && HOME_TOURNAMENT_NOTIFY_STATE.loaded) return;
  if (!document.getElementById("homeTournamentPickBtn")) return;
  if (!homeTournamentNotifyApiBase() || !homeTournamentNotifyHasCredential()) {
    renderHomeTournamentNotifyState();
    return;
  }
  postHomeTournamentNotify({ action: "status" })
    .then(syncHomeTournamentNotifyFromResponse)
    .catch(function () {
      HOME_TOURNAMENT_NOTIFY_STATE.loaded = true;
      renderHomeTournamentNotifyState();
    });
}

function closeHomeTournamentNotifyModal() {
  var modal = document.getElementById("homeTournamentNotifyModal");
  if (!modal) return;
  modal.classList.add("home-tournament-notify-modal--hidden");
  modal.setAttribute("aria-hidden", "true");
}

function openHomeTournamentNotifyModal() {
  var modal = document.getElementById("homeTournamentNotifyModal");
  var listEl = document.getElementById("homeTournamentNotifyList");
  if (!modal || !listEl) return;
  var items = getHomeTournamentNotifyItems();
  var selected = HOME_TOURNAMENT_NOTIFY_STATE.selectedIds.length
    ? HOME_TOURNAMENT_NOTIFY_STATE.selectedIds
    : items.map(function (item) { return item.reminderId; });
  listEl.innerHTML = "";
  items.forEach(function (item) {
    var label = document.createElement("label");
    label.className = "home-tournament-notify-modal__item";
    var input = document.createElement("input");
    input.type = "checkbox";
    input.value = item.reminderId;
    input.checked = selected.indexOf(item.reminderId) !== -1;
    var body = document.createElement("span");
    var title = document.createElement("span");
    title.className = "home-tournament-notify-modal__item-title";
    title.textContent = item.name || "Турнир";
    var meta = document.createElement("span");
    meta.className = "home-tournament-notify-modal__item-meta";
    meta.textContent =
      (item.category || "Турнир") +
      " · " +
      pokerFormatScheduleTime(item) +
      " МСК · " +
      pokerFormatRubSpacing(item.buyin || "—") +
      " · приз " +
      pokerFormatRubSpacing(item.guarantee || "—");
    body.appendChild(title);
    body.appendChild(meta);
    label.appendChild(input);
    label.appendChild(body);
    listEl.appendChild(label);
  });
  modal.classList.remove("home-tournament-notify-modal--hidden");
  modal.setAttribute("aria-hidden", "false");
}

function saveHomeTournamentNotifySelection(unsubscribe, ids) {
  setHomeTournamentNotifyBusy(true);
  return postHomeTournamentNotify({
    action: unsubscribe ? "unsubscribe" : "subscribe",
    unsubscribe: !!unsubscribe,
    selectedTournamentIds: Array.isArray(ids) ? ids : []
  })
    .then(function (data) {
      syncHomeTournamentNotifyFromResponse(data);
      if (data.subscribed && typeof window.playPokerSubscribeSound === "function") window.playPokerSubscribeSound();
      homeTournamentNotifyMessage(
        data.subscribed ? "Уведомления о турнирах включены." : "Уведомления о турнирах отключены.",
        false
      );
      return data;
    })
    .catch(function (err) {
      homeTournamentNotifyMessage(err && err.message ? err.message : "Не удалось обновить уведомления.", true);
    })
    .finally(function () {
      setHomeTournamentNotifyBusy(false);
    });
}

function initHomeTournamentNotifyControls() {
  var notifyBtn = document.getElementById("homeTournamentNotifyBtn");
  var pickBtn = document.getElementById("homeTournamentPickBtn");
  var saveBtn = document.getElementById("homeTournamentNotifySaveBtn");
  var modal = document.getElementById("homeTournamentNotifyModal");
  if (notifyBtn && notifyBtn.dataset.bound !== "1") {
    notifyBtn.dataset.bound = "1";
    notifyBtn.addEventListener("click", function () {
      if (HOME_TOURNAMENT_NOTIFY_STATE.busy) return;
      if (HOME_TOURNAMENT_NOTIFY_STATE.subscribed) {
        saveHomeTournamentNotifySelection(true, []);
        return;
      }
      var allIds = getHomeTournamentNotifyItems().map(function (item) { return item.reminderId; });
      var ids = HOME_TOURNAMENT_NOTIFY_STATE.selectedIds.length ? HOME_TOURNAMENT_NOTIFY_STATE.selectedIds : allIds;
      saveHomeTournamentNotifySelection(false, ids);
    });
  }
  if (pickBtn && pickBtn.dataset.bound !== "1") {
    pickBtn.dataset.bound = "1";
    pickBtn.addEventListener("click", openHomeTournamentNotifyModal);
  }
  if (saveBtn && saveBtn.dataset.bound !== "1") {
    saveBtn.dataset.bound = "1";
    saveBtn.addEventListener("click", function () {
      var checked = Array.prototype.slice.call(document.querySelectorAll("#homeTournamentNotifyList input:checked"))
        .map(function (input) { return input.value; })
        .filter(Boolean);
      if (!checked.length) {
        homeTournamentNotifyMessage("Выберите хотя бы один турнир.", true);
        return;
      }
      saveHomeTournamentNotifySelection(false, checked).then(function (data) {
        if (data && data.ok) closeHomeTournamentNotifyModal();
      });
    });
  }
  if (modal && modal.dataset.bound !== "1") {
    modal.dataset.bound = "1";
    modal.addEventListener("click", function (e) {
      var closeBtn = e.target && e.target.closest ? e.target.closest("[data-home-tournament-notify-close]") : null;
      if (!closeBtn) return;
      e.preventDefault();
      closeHomeTournamentNotifyModal();
    });
  }
  renderHomeTournamentNotifyState();
  loadHomeTournamentNotifyStatus(false);
}

function renderHomeTournamentWeekList(activeWeekday) {
  var el = document.getElementById("homeTournamentWeekList");
  if (!el) return;
  el.innerHTML = "";
  HOME_TOURNAMENT_WEEK_ORDER.forEach(function (dow) {
    var item = pokerGetHomeTournamentItem(dow, new Date()) || {};
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
    name.textContent = item.guarantee && item.guarantee !== "—"
      ? "Приз " + pokerFormatRubSpacing(item.guarantee)
      : (item.rebuy || "Приз —");

    var meta = document.createElement("span");
    meta.className = "home-tournament-week-row__meta";
    var itemHour = Number.isFinite(Number(item.hour)) ? Math.floor(Number(item.hour)) : 18;
    var itemMinute = Number.isFinite(Number(item.minute)) ? Math.floor(Number(item.minute)) : 0;
    var itemTime = String(itemHour).padStart(2, "0") + ":" + String(itemMinute).padStart(2, "0");
    meta.textContent =
      (item.name || "Турнир дня") +
      " · " +
      pokerFormatRubSpacing(item.buyin) +
      " · " + itemTime + " МСК";

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
  var bonusSections = document.querySelectorAll(".home-tournament-bonuses");
  var isFreeroll = Number(activeWeekday) === 6;
  bonusSections.forEach(function (bonusesSection) {
    bonusesSection.hidden = isFreeroll;
    bonusesSection.style.display = isFreeroll ? "none" : "";
    bonusesSection.setAttribute("aria-hidden", isFreeroll ? "true" : "false");
  });
  var league2Active = activeWeekday === 2;
  var leagueNum = league2Active ? 2 : 1;
  var bonuses = document.querySelectorAll(".home-tournament-bonus[data-home-tournament-bonus]");
  bonuses.forEach(function (bonus) {
    var kind = bonus.getAttribute("data-home-tournament-bonus");
    if (kind === "league1" || kind === "league2") {
      var amountEl = bonus.querySelector(".home-tournament-bonus__amount");
      var labelEl = bonus.querySelector(".home-tournament-bonus__label");
      var amount = "500-1500 ₽";
      bonus.setAttribute("data-home-tournament-bonus", "league" + leagueNum);
      bonus.setAttribute("data-home-tournament-league-top", String(leagueNum));
      bonus.setAttribute("aria-label", "Актуальный топ-10 Лиги " + leagueNum);
      bonus.classList.remove("home-tournament-bonus--inactive");
      bonus.setAttribute("aria-disabled", "false");
      if (amountEl) amountEl.textContent = amount;
      if (labelEl) labelEl.textContent = "за нокаут топ10 Лиги" + leagueNum;
    }
  });
}

function syncHomeTournamentBubbleBuyinLabel(activeWeekday) {
  var bonusEl = document.querySelector(".home-tournament-bonus--bubble-buyin");
  var gridEl = document.querySelector(".home-tournament-bonuses__grid--lower");
  var amountEl = document.getElementById("homeTournamentBubbleBuyinAmount");
  var labelEl = document.getElementById("homeTournamentBubbleBuyinLabel");
  if (!amountEl || !labelEl) return;
  var amount = HOME_TOURNAMENT_BUBBLE_BONUSES[Number(activeWeekday)] || "";
  var count = Number(HOME_TOURNAMENT_BUBBLE_COUNTS[Number(activeWeekday)] || 1);
  if (!Number.isFinite(count) || count < 1) count = 1;
  var active = !!amount;
  amountEl.textContent = amount || "—";
  labelEl.textContent = count === 2 ? "2 баббла" : "бабблу";
  if (gridEl) gridEl.classList.toggle("home-tournament-bonuses__grid--has-bubble", active);
  if (bonusEl) {
    bonusEl.hidden = !active;
    if (active) bonusEl.style.removeProperty("display");
    else bonusEl.style.display = "none";
    bonusEl.setAttribute("data-home-tournament-bubble-amount", amount || "");
    bonusEl.setAttribute("data-home-tournament-bubble-count", String(count));
    bonusEl.classList.toggle("home-tournament-bonus--inactive", !active);
    bonusEl.setAttribute("aria-disabled", active ? "false" : "true");
    bonusEl.setAttribute("aria-label", active ? "Условия бонуса: " + amount + " за " + (count === 2 ? "2 баббла" : "баббл") : "Бонус бабблу недоступен в этот день");
  }
}

var HOME_TOURNAMENT_BONUS_INFO = {
  "four-kind": { title: "Бонус за каре", amount: "1000 ₽" },
  "straight-flush": { title: "Бонус за стрит-флеш", amount: "2500 ₽" },
  "royal-flush": { title: "Бонус за роял", amount: "10 000 ₽" }
};

function fillHomeTournamentBonusModal(kind) {
  var info = HOME_TOURNAMENT_BONUS_INFO[kind] || HOME_TOURNAMENT_BONUS_INFO["four-kind"];
  var title = document.getElementById("homeTournamentBonusModalTitle");
  var meta = document.getElementById("homeTournamentBonusModalMeta");
  var fourKindRule = document.getElementById("homeTournamentBonusModalFourKindRule");
  if (title) title.textContent = info.title;
  if (meta) meta.textContent = "Выплата: " + info.amount;
  if (fourKindRule) fourKindRule.hidden = kind !== "four-kind";
}

function closeHomeTournamentBonusModal() {
  var modal = document.getElementById("homeTournamentBonusModal");
  if (!modal) return;
  modal.classList.add("home-bonus-modal--hidden");
  modal.setAttribute("aria-hidden", "true");
}

function openHomeTournamentBonusModal(kind) {
  function show() {
    var modal = document.getElementById("homeTournamentBonusModal");
    if (!modal) return;
    initHomeTournamentBonusModal();
    fillHomeTournamentBonusModal(kind);
    modal.classList.remove("home-bonus-modal--hidden");
    modal.setAttribute("aria-hidden", "false");
    var closeBtn = modal.querySelector("[data-home-bonus-close]");
    if (closeBtn && closeBtn.focus) {
      setTimeout(function () {
        try {
          closeBtn.focus({ preventScroll: true });
        } catch (eFocus) {
          closeBtn.focus();
        }
      }, 0);
    }
  }
  if (document.getElementById("homeTournamentBonusModal")) {
    show();
    return;
  }
  if (typeof window.pokerEnsureGlobalModalsHtml === "function") {
    window.pokerEnsureGlobalModalsHtml().then(show).catch(function () {});
  }
}

function initHomeTournamentBonusModal() {
  var modal = document.getElementById("homeTournamentBonusModal");
  if (!modal || modal.__initedHomeTournamentBonus) return;
  modal.__initedHomeTournamentBonus = true;
  modal.addEventListener("click", function (e) {
    var closeBtn = e.target && e.target.closest ? e.target.closest("[data-home-bonus-close]") : null;
    if (closeBtn) {
      e.preventDefault();
      closeHomeTournamentBonusModal();
    }
  });
  if (!window.__homeTournamentBonusEscBound) {
    window.__homeTournamentBonusEscBound = true;
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      var activeModal = document.getElementById("homeTournamentBonusModal");
      if (activeModal && activeModal.getAttribute("aria-hidden") === "false") closeHomeTournamentBonusModal();
    });
  }
}

function initHomeTournamentBonusButtons() {
  var buttons = document.querySelectorAll("[data-home-tournament-bonus-info]");
  buttons.forEach(function (btn) {
    if (btn.__homeTournamentBonusButtonBound) return;
    btn.__homeTournamentBonusButtonBound = true;
    btn.addEventListener("click", function () {
      openHomeTournamentBonusModal(btn.getAttribute("data-home-tournament-bonus-info"));
    });
  });
}

function fillHomeTournamentBubbleModal(amount, count) {
  amount = amount || "—";
  count = Number(count) === 2 ? 2 : 1;
  var title = document.getElementById("homeTournamentBubbleModalTitle");
  var meta = document.getElementById("homeTournamentBubbleModalMeta");
  var zone = document.getElementById("homeTournamentBubbleModalZone");
  var condition = document.getElementById("homeTournamentBubbleModalCondition");
  if (title) title.textContent = "Бонус бабблу";
  if (meta) meta.textContent = "Выплата: " + amount;
  if (zone) zone.textContent = count === 2 ? "2 баббла" : "1 баббл";
  if (condition) {
    condition.textContent =
      count === 2
        ? "Если вы вылетели в шаге или в двух шагах от призов, вы получаете бонус " + amount + "."
        : "Если вы вылетели в шаге от призов, вы получаете бонус " + amount + ".";
  }
}

function closeHomeTournamentBubbleModal() {
  var modal = document.getElementById("homeTournamentBubbleModal");
  if (!modal) return;
  modal.classList.add("home-bonus-modal--hidden");
  modal.setAttribute("aria-hidden", "true");
}

function openHomeTournamentBubbleModal(trigger) {
  trigger = trigger || document.querySelector("[data-home-tournament-bubble-bonus]");
  if (trigger && trigger.getAttribute("aria-disabled") === "true") return;
  var amount = trigger ? trigger.getAttribute("data-home-tournament-bubble-amount") : "";
  var count = trigger ? trigger.getAttribute("data-home-tournament-bubble-count") : "1";
  function show() {
    var modal = document.getElementById("homeTournamentBubbleModal");
    if (!modal) return;
    initHomeTournamentBubbleModal();
    fillHomeTournamentBubbleModal(amount, count);
    modal.classList.remove("home-bonus-modal--hidden");
    modal.setAttribute("aria-hidden", "false");
    var closeBtn = modal.querySelector("[data-home-bubble-close]");
    if (closeBtn && closeBtn.focus) {
      setTimeout(function () {
        try {
          closeBtn.focus({ preventScroll: true });
        } catch (eFocus) {
          closeBtn.focus();
        }
      }, 0);
    }
  }
  if (document.getElementById("homeTournamentBubbleModal")) {
    show();
    return;
  }
  if (typeof window.pokerEnsureGlobalModalsHtml === "function") {
    window.pokerEnsureGlobalModalsHtml().then(show).catch(function () {});
  }
}

function initHomeTournamentBubbleModal() {
  var modal = document.getElementById("homeTournamentBubbleModal");
  if (!modal || modal.__initedHomeTournamentBubble) return;
  modal.__initedHomeTournamentBubble = true;
  modal.addEventListener("click", function (e) {
    var closeBtn = e.target && e.target.closest ? e.target.closest("[data-home-bubble-close]") : null;
    if (closeBtn) {
      e.preventDefault();
      closeHomeTournamentBubbleModal();
    }
  });
  if (!window.__homeTournamentBubbleEscBound) {
    window.__homeTournamentBubbleEscBound = true;
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      var activeModal = document.getElementById("homeTournamentBubbleModal");
      if (activeModal && activeModal.getAttribute("aria-hidden") === "false") closeHomeTournamentBubbleModal();
    });
  }
}

function initHomeTournamentBubbleButtons() {
  var buttons = document.querySelectorAll("[data-home-tournament-bubble-bonus]");
  buttons.forEach(function (btn) {
    if (btn.__homeTournamentBubbleButtonBound) return;
    btn.__homeTournamentBubbleButtonBound = true;
    btn.addEventListener("click", function () {
      openHomeTournamentBubbleModal(btn);
    });
  });
}

var HOME_TOURNAMENT_RAFFLE_BONUS_CACHE_MS = 30 * 60 * 1000;
var homeTournamentRaffleBonusLoadedAt = 0;
var homeTournamentRaffleBonusInFlight = false;
var homeTournamentRaffleBonusData = null;
var homeTournamentRaffleBonusTimer = null;
var homeTournamentRaffleBonusRefreshTimer = null;

function homeTournamentRaffleBonusText(raffle) {
  var parts = [];
  if (!raffle || typeof raffle !== "object") return "";
  parts.push(raffle.title, raffle.cardTitle, raffle.cardSubtitle);
  if (Array.isArray(raffle.groups)) {
    raffle.groups.forEach(function (group) {
      if (group) parts.push(group.prize, group.title);
    });
  }
  return parts.join(" ").replace(/\s+/g, " ").trim();
}

function homeTournamentRaffleBonusIsCash(raffle) {
  if (!raffle) return false;
  if (typeof pokerRafflesIsCashPrize === "function") return pokerRafflesIsCashPrize(raffle);
  var explicit = String(raffle.prizeKind || raffle.prize_kind || "").trim().toLowerCase();
  if (explicit === "cash" || explicit === "cash_buyin" || explicit === "cash_buyins" || explicit === "other") return true;
  if (explicit === "tournament_ticket" || explicit === "ticket" || explicit === "tickets") return false;
  var text = homeTournamentRaffleBonusText(raffle).toLowerCase();
  return text.indexOf("на кеш") !== -1 || text.indexOf("кеш") !== -1 || text.indexOf("cash") !== -1 || text.indexOf("бонус гейм") !== -1 || text.indexOf("bonus game") !== -1;
}

function homeTournamentRaffleBonusTicketWord(count) {
  var n = Math.abs(parseInt(String(count || 0), 10) || 0);
  var mod100 = n % 100;
  var mod10 = n % 10;
  if (mod100 >= 11 && mod100 <= 19) return "билетов";
  if (mod10 === 1) return "билет";
  if (mod10 >= 2 && mod10 <= 4) return "билета";
  return "билетов";
}

function homeTournamentRaffleBonusFormatCountdown(diff) {
  if (diff <= 0) return "Скоро";
  var h = Math.floor(diff / 3600000);
  var m = Math.floor((diff % 3600000) / 60000);
  var s = Math.floor((diff % 60000) / 1000);
  return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
}

function homeTournamentRaffleBonusTicketCount(raffle) {
  var total = Math.max(0, parseInt(String(raffle && raffle.totalWinners || ""), 10) || 0);
  var groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
  if (!total && groups.length) {
    total = groups.reduce(function (sum, group) {
      return sum + Math.max(0, parseInt(String(group && group.count || ""), 10) || 0);
    }, 0);
  }
  return total;
}

function homeTournamentRaffleBonusScore(raffle) {
  var text = homeTournamentRaffleBonusText(raffle).toLowerCase();
  var score = 0;
  if (text.indexOf("турнир дня") !== -1) score += 20;
  if (text.indexOf("турнир вечера") !== -1 || text.indexOf("вечер") !== -1) score += 18;
  if (text.indexOf("турнир") !== -1) score += 6;
  if (text.indexOf("билет") !== -1 || text.indexOf("беккинг") !== -1) score += 6;
  var currentNames = [];
  try {
    TOURNAMENT_OF_DAY_BY_WEEKDAY.forEach(function (item) {
      var name = String(item && item.name || "").trim().toLowerCase();
      if (name && currentNames.indexOf(name) === -1) currentNames.push(name);
    });
  } catch (eNames) {}
  currentNames.forEach(function (name) {
    if (name && text.indexOf(name) !== -1) score += 4;
  });
  return score;
}

function chooseHomeTournamentRaffleBonus(activeRaffles) {
  var now = Date.now();
  var rows = Array.isArray(activeRaffles) ? activeRaffles : [];
  var candidates = rows.filter(function (raffle) {
    if (!raffle || raffle.status !== "active") return false;
    if (homeTournamentRaffleBonusIsCash(raffle)) return false;
    if (homeTournamentRaffleBonusTicketCount(raffle) <= 0) return false;
    if (!raffle.endDate) return false;
    var end = new Date(raffle.endDate).getTime();
    return isFinite(end) && end > now;
  });
  candidates.sort(function (a, b) {
    var scoreDiff = homeTournamentRaffleBonusScore(b) - homeTournamentRaffleBonusScore(a);
    if (scoreDiff) return scoreDiff;
    return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
  });
  return candidates[0] || null;
}

function hideHomeTournamentRaffleBonus() {
  var btn = document.getElementById("homeTournamentRaffleBonus");
  if (btn) {
    btn.hidden = true;
    btn.style.display = "none";
    btn.removeAttribute("data-raffle-id");
  }
  if (homeTournamentRaffleBonusTimer) {
    clearInterval(homeTournamentRaffleBonusTimer);
    homeTournamentRaffleBonusTimer = null;
  }
}

function renderHomeTournamentRaffleBonus() {
  var btn = document.getElementById("homeTournamentRaffleBonus");
  var ticketsEl = document.getElementById("homeTournamentRaffleBonusTickets");
  var timerEl = document.getElementById("homeTournamentRaffleBonusTimer");
  var raffle = homeTournamentRaffleBonusData;
  if (!btn || !ticketsEl || !timerEl || !raffle) return;
  var end = new Date(raffle.endDate);
  var diff = end.getTime() - Date.now();
  if (!isFinite(diff) || diff <= 0) {
    hideHomeTournamentRaffleBonus();
    return;
  }
  var count = homeTournamentRaffleBonusTicketCount(raffle);
  ticketsEl.textContent = String(count) + " " + homeTournamentRaffleBonusTicketWord(count);
  timerEl.textContent = homeTournamentRaffleBonusFormatCountdown(diff);
  btn.hidden = false;
  btn.style.removeProperty("display");
  btn.setAttribute("data-raffle-id", String(raffle.id || ""));
  btn.setAttribute("aria-label", "Открыть розыгрыш " + count + " " + homeTournamentRaffleBonusTicketWord(count));
}

function setHomeTournamentRaffleBonus(raffle) {
  homeTournamentRaffleBonusData = raffle || null;
  if (!homeTournamentRaffleBonusData) {
    hideHomeTournamentRaffleBonus();
    return;
  }
  renderHomeTournamentRaffleBonus();
  if (!homeTournamentRaffleBonusTimer) {
    homeTournamentRaffleBonusTimer = setInterval(renderHomeTournamentRaffleBonus, 1000);
  }
}

function loadHomeTournamentRaffleBonus(force) {
  if (homeTournamentRaffleBonusInFlight) return;
  var btn = document.getElementById("homeTournamentRaffleBonus");
  if (!btn) return;
  var now = Date.now();
  if (homeTournamentRaffleBonusLoadedAt && now - homeTournamentRaffleBonusLoadedAt < HOME_TOURNAMENT_RAFFLE_BONUS_CACHE_MS) {
    renderHomeTournamentRaffleBonus();
    return;
  }
  var cached = null;
  try {
    var cacheRoot = window._rafflesCache || null;
    var homeBonusCache = cacheRoot && cacheRoot.homeBonus ? cacheRoot.homeBonus : null;
    cached = homeBonusCache && homeBonusCache.data && homeBonusCache.data.ok && homeBonusCache.time && now - homeBonusCache.time < HOME_TOURNAMENT_RAFFLE_BONUS_CACHE_MS ? homeBonusCache.data : null;
    if (!cached) {
      var raffleCache = window._rafflesCache || null;
      cached = raffleCache && raffleCache.data && raffleCache.data.ok && !raffleCache.data.homeBonus && raffleCache.time && now - raffleCache.time < HOME_TOURNAMENT_RAFFLE_BONUS_CACHE_MS ? raffleCache.data : null;
    }
  } catch (eCache) {}
  if (cached) {
    homeTournamentRaffleBonusLoadedAt = now;
    setHomeTournamentRaffleBonus(chooseHomeTournamentRaffleBonus(cached.activeRaffles || cached.raffles || []));
    return;
  }
  var base = typeof getApiBase === "function" ? getApiBase() : "";
  if (!base) return;
  var q = typeof pokerRafflesApiQueryLeading === "function"
    ? pokerRafflesApiQueryLeading()
    : (typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=");
  var isLocal = false;
  try {
    isLocal = /localhost|127\.0\.0\.1|0\.0\.0\.0/i.test(window.location.hostname || "");
  } catch (eLocal) {}
  homeTournamentRaffleBonusInFlight = true;
  fetch(base + "/api/raffles" + q + "&homeBonus=1" + (isLocal ? "&demo=1" : ""))
    .then(function (r) { return r.json().catch(function () { return null; }); })
    .then(function (data) {
      homeTournamentRaffleBonusLoadedAt = Date.now();
      if (data && data.ok) {
        try {
          window._rafflesCache = window._rafflesCache || {};
          window._rafflesCache.homeBonus = { data: data, time: Date.now() };
        } catch (eSetCache) {}
        setHomeTournamentRaffleBonus(chooseHomeTournamentRaffleBonus(data.activeRaffles || data.raffles || []));
      } else {
        hideHomeTournamentRaffleBonus();
      }
    })
    .catch(function () {
      hideHomeTournamentRaffleBonus();
    })
    .finally(function () {
      homeTournamentRaffleBonusInFlight = false;
    });
}

function initHomeTournamentRaffleBonus() {
  var btn = document.getElementById("homeTournamentRaffleBonus");
  if (!btn) return;
  if (btn.__homeTournamentRaffleBonusBound !== "1") {
    btn.__homeTournamentRaffleBonusBound = "1";
    btn.addEventListener("click", function () {
      var raffleId = btn.getAttribute("data-raffle-id") || "";
      if (raffleId) window.__pendingRaffleActiveId = raffleId;
      if (typeof setView === "function") setView("raffles");
    });
  }
  if (!window.__homeTournamentRaffleBonusRefreshBound) {
    window.__homeTournamentRaffleBonusRefreshBound = true;
    window.addEventListener("focus", function () {
      loadHomeTournamentRaffleBonus(true);
    });
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) loadHomeTournamentRaffleBonus(true);
    });
  }
  if (!homeTournamentRaffleBonusRefreshTimer) {
    homeTournamentRaffleBonusRefreshTimer = setInterval(function () {
      loadHomeTournamentRaffleBonus(true);
    }, HOME_TOURNAMENT_RAFFLE_BONUS_CACHE_MS);
  }
  loadHomeTournamentRaffleBonus();
}

function initHomeTournamentRaffleBonusWhenReady() {
  try {
    initHomeTournamentRaffleBonus();
  } catch (eHomeTournamentRaffleReady) {}
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHomeTournamentRaffleBonusWhenReady);
} else {
  initHomeTournamentRaffleBonusWhenReady();
}
window.addEventListener("load", initHomeTournamentRaffleBonusWhenReady);

function getHomeTournamentLeagueLabel(leagueNum) {
  return "Лига " + (Number(leagueNum) === 2 ? "2" : "1");
}

function getHomeTournamentLeagueUpdatedLabel() {
  if (typeof SUMMER_RATING_UPDATED !== "undefined" && SUMMER_RATING_UPDATED) return SUMMER_RATING_UPDATED;
  var season = typeof SUMMER_RATING_SEASON !== "undefined" ? SUMMER_RATING_SEASON : null;
  if (season && season.updatedLabel) return season.updatedLabel;
  return "актуально сейчас";
}

function getHomeTournamentSummerTournamentsByDateFallback() {
  if (typeof SUMMER_RATING_TOURNAMENTS_BY_DATE !== "undefined" && SUMMER_RATING_TOURNAMENTS_BY_DATE) {
    return SUMMER_RATING_TOURNAMENTS_BY_DATE;
  }
  var merged = {};
  [
    typeof SUMMER_RATING_TOURNAMENTS_JUNE_BY_DATE !== "undefined" ? SUMMER_RATING_TOURNAMENTS_JUNE_BY_DATE : null,
    typeof SUMMER_RATING_TOURNAMENTS_JULY_BY_DATE !== "undefined" ? SUMMER_RATING_TOURNAMENTS_JULY_BY_DATE : null,
    typeof SUMMER_RATING_TOURNAMENTS_AUGUST_BY_DATE !== "undefined" ? SUMMER_RATING_TOURNAMENTS_AUGUST_BY_DATE : null
  ].forEach(function (monthData) {
    if (!monthData) return;
    Object.keys(monthData).forEach(function (dateStr) {
      merged[dateStr] = monthData[dateStr];
    });
  });
  return merged;
}

function sortHomeTournamentLeagueTopRows(rows) {
  rows.sort(function (a, b) {
    var ap = Number(a && a.points);
    var bp = Number(b && b.points);
    var aw = Number(a && a.reward);
    var bw = Number(b && b.reward);
    if (ap !== ap) ap = 0;
    if (bp !== bp) bp = 0;
    if (aw !== aw) aw = 0;
    if (bw !== bw) bw = 0;
    return (bp - ap) || (bw - aw);
  });
  return rows;
}

function getHomeTournamentLeagueTopRows(leagueNum) {
  leagueNum = Number(leagueNum) === 2 ? 2 : 1;
  if (typeof getTournamentRatingOverallByLeagueForSeason === "function") {
    try {
      var adapterRows = getTournamentRatingOverallByLeagueForSeason("summer", leagueNum);
      if (Array.isArray(adapterRows) && adapterRows.length) return adapterRows.slice(0, 10);
    } catch (eAdapterRows) {}
  }
  var tournamentsByDate = {};
  if (typeof pokerRatingGetSummerTournamentsByDate === "function") tournamentsByDate = pokerRatingGetSummerTournamentsByDate() || {};
  else tournamentsByDate = getHomeTournamentSummerTournamentsByDateFallback() || {};
  var byNick = {};
  var monthRegex = /\.(06|07|08)\.2026$/;
  Object.keys(tournamentsByDate || {}).forEach(function (dateStr) {
    if (!monthRegex.test(dateStr)) return;
    var list = tournamentsByDate[dateStr];
    if (!Array.isArray(list)) return;
    list.forEach(function (t) {
      var forcedLeague = t && t.league != null ? Number(t.league) : NaN;
      var buyin = t && t.buyin != null ? Number(t.buyin) : NaN;
      var inLeague1 = forcedLeague === 1 || (forcedLeague !== forcedLeague && (buyin >= 500 || (buyin !== buyin)));
      var inLeague2 = forcedLeague === 2 || (forcedLeague !== forcedLeague && buyin >= 100 && buyin < 500);
      var include = (leagueNum === 1 && inLeague1) || (leagueNum === 2 && inLeague2);
      if (!include) return;
      var players = t.players || [];
      players.forEach(function (p) {
        var nick = typeof normalizeWinterNickForFinalTable === "function" ? normalizeWinterNickForFinalTable(p && p.nick) : String((p && p.nick) || "").trim();
        if (!nick) return;
        var points = typeof winterRatingTournamentPlayerPoints === "function" ? winterRatingTournamentPlayerPoints(p) : Number(p && p.points);
        var reward = p && p.reward != null ? Number(p.reward) : 0;
        if (points !== points) points = 0;
        if (reward !== reward) reward = 0;
        if (!byNick[nick]) byNick[nick] = { nick: nick, points: 0, reward: 0 };
        byNick[nick].points += points;
        byNick[nick].reward += reward;
      });
    });
  });
  return sortHomeTournamentLeagueTopRows(Object.keys(byNick).map(function (nick) {
    return byNick[nick];
  }).filter(function (row) {
    return Number(row.points || 0) !== 0 || Number(row.reward || 0) !== 0;
  })).slice(0, 10);
}

function ensureHomeTournamentLeagueTopData(leagueNum) {
  var rows = getHomeTournamentLeagueTopRows(leagueNum);
  if (rows.length) return Promise.resolve(rows);
  if (typeof window.pokerEnsureScriptDomains !== "function") return Promise.resolve(rows);
  var ready = null;
  try {
    ready = window.pokerEnsureScriptDomains(["rating-summer"]);
  } catch (eEnsureLeagueTop) {
    return Promise.resolve(rows);
  }
  if (!ready || typeof ready.then !== "function") return Promise.resolve(getHomeTournamentLeagueTopRows(leagueNum));
  return ready.then(function () {
    return getHomeTournamentLeagueTopRows(leagueNum);
  }).catch(function () {
    return rows;
  });
}

function formatHomeTournamentLeagueTopNumber(value) {
  var n = Number(value);
  if (n !== n || !isFinite(n)) n = 0;
  return Math.round(n).toLocaleString("ru-RU");
}

function escapeHomeTournamentLeagueTopText(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getHomeTournamentLeagueTopBounty(index, leagueNum) {
  var place = Number(index) + 1;
  if (place >= 1 && place <= 3) return "1500 ₽";
  if (place >= 4 && place <= 5) return "1000 ₽";
  if (place >= 6 && place <= 10) return "500 ₽";
  return "";
}

function renderHomeTournamentLeagueTopList(leagueNum) {
  var title = document.getElementById("homeTournamentLeagueTopModalTitle");
  var updated = document.getElementById("homeTournamentLeagueTopModalUpdated");
  var list = document.getElementById("homeTournamentLeagueTopList");
  var leagueLabel = getHomeTournamentLeagueLabel(leagueNum);
  if (title) title.textContent = "Топ-10 Лиги " + (Number(leagueNum) === 2 ? "2" : "1");
  if (updated) updated.textContent = getHomeTournamentLeagueUpdatedLabel();
  if (!list) return;
  var rows = getHomeTournamentLeagueTopRows(leagueNum);
  if (!rows.length) {
    list.innerHTML = "<li class=\"home-league-top-modal__empty\">Список пока загружается</li>";
    return;
  }
  list.innerHTML = rows.map(function (row, index) {
    var nick = String(row && row.nick ? row.nick : "—");
    var points = formatHomeTournamentLeagueTopNumber(row && row.points);
    var reward = formatHomeTournamentLeagueTopNumber(row && row.reward);
    var bounty = getHomeTournamentLeagueTopBounty(index, leagueNum);
    var bountyHtml = bounty
      ? "<span class=\"home-league-top-modal__bounty\"><span aria-hidden=\"true\">🎯</span>" + bounty + "</span>"
      : "";
    return "<li class=\"home-league-top-modal__item" + (bounty ? " home-league-top-modal__item--with-bounty" : "") + "\">" +
      "<span class=\"home-league-top-modal__place\">" + (index + 1) + "</span>" +
      "<span class=\"home-league-top-modal__player\">" +
        "<span class=\"home-league-top-modal__nick\">" + escapeHomeTournamentLeagueTopText(nick) + "</span>" +
        "<span class=\"home-league-top-modal__stats\">" + points + " очк. · " + reward + " ₽</span>" +
      "</span>" +
      bountyHtml +
    "</li>";
  }).join("");
}

function closeHomeTournamentLeagueTopModal() {
  var modal = document.getElementById("homeTournamentLeagueTopModal");
  if (!modal) return;
  modal.classList.add("home-league-top-modal--hidden");
  modal.setAttribute("aria-hidden", "true");
}

function openHomeTournamentLeagueTopModal(leagueNum) {
  function show() {
    var modal = document.getElementById("homeTournamentLeagueTopModal");
    if (!modal) return;
    initHomeTournamentLeagueTopModal();
    renderHomeTournamentLeagueTopList(leagueNum);
    ensureHomeTournamentLeagueTopData(leagueNum).then(function (rows) {
      var activeModal = document.getElementById("homeTournamentLeagueTopModal");
      if (!rows.length || !activeModal || activeModal.getAttribute("aria-hidden") === "true") return;
      renderHomeTournamentLeagueTopList(leagueNum);
    });
    modal.classList.remove("home-league-top-modal--hidden");
    modal.setAttribute("aria-hidden", "false");
    var closeBtn = modal.querySelector("[data-home-league-top-close]");
    if (closeBtn && closeBtn.focus) {
      setTimeout(function () {
        try {
          closeBtn.focus({ preventScroll: true });
        } catch (eFocusLeagueTop) {
          closeBtn.focus();
        }
      }, 0);
    }
  }
  if (document.getElementById("homeTournamentLeagueTopModal")) {
    show();
    return;
  }
  if (typeof window.pokerEnsureGlobalModalsHtml === "function") {
    window.pokerEnsureGlobalModalsHtml().then(show).catch(function () {});
  }
}

function initHomeTournamentLeagueTopModal() {
  var modal = document.getElementById("homeTournamentLeagueTopModal");
  if (!modal || modal.__initedHomeTournamentLeagueTop) return;
  modal.__initedHomeTournamentLeagueTop = true;
  modal.addEventListener("click", function (e) {
    var closeBtn = e.target && e.target.closest ? e.target.closest("[data-home-league-top-close]") : null;
    if (closeBtn) {
      e.preventDefault();
      closeHomeTournamentLeagueTopModal();
    }
  });
  if (!window.__homeTournamentLeagueTopEscBound) {
    window.__homeTournamentLeagueTopEscBound = true;
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      var activeModal = document.getElementById("homeTournamentLeagueTopModal");
      if (activeModal && activeModal.getAttribute("aria-hidden") === "false") closeHomeTournamentLeagueTopModal();
    });
  }
}

function initHomeTournamentLeagueTopButtons() {
  var buttons = document.querySelectorAll("[data-home-tournament-league-top]");
  buttons.forEach(function (btn) {
    if (btn.__homeTournamentLeagueTopButtonBound) return;
    btn.__homeTournamentLeagueTopButtonBound = true;
    btn.addEventListener("click", function () {
      openHomeTournamentLeagueTopModal(btn.getAttribute("data-home-tournament-league-top"));
    });
  });
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
  var current = TOURNAMENT_OF_DAY_BY_WEEKDAY[dow] || TOURNAMENT_OF_DAY_BY_WEEKDAY[0];
  var currentHour = Number.isFinite(Number(current.hour)) ? Math.floor(Number(current.hour)) : 18;
  if (msk.minutes >= (currentHour + 3) * 60) dow = (dow + 1) % 7;
  var t = TOURNAMENT_OF_DAY_BY_WEEKDAY[dow] || TOURNAMENT_OF_DAY_BY_WEEKDAY[0];
  var hour = Number.isFinite(Number(t.hour)) ? Math.floor(Number(t.hour)) : 18;
  var minute = Number.isFinite(Number(t.minute)) ? Math.floor(Number(t.minute)) : 0;
  return t.name + " · " + t.guarantee + " · " + String(hour).padStart(2, "0") + ":" + String(minute).padStart(2, "0") + " МСК";
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
  var lists = [
    document.getElementById("freerollHomeScheduleList"),
    document.getElementById("freerollModalScheduleList")
  ].filter(function (list) {
    return !!list;
  });
  if (!lists.length) return;
  lists.forEach(function (list) {
    list.innerHTML = "";
  });
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
  lists.forEach(function (el) {
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
  });
}

function openHomeFreerollsListModal() {
  var ensure =
    typeof window.pokerEnsureGlobalModalsHtml === "function"
      ? window.pokerEnsureGlobalModalsHtml()
      : Promise.resolve(true);
  ensure
    .catch(function () {
      return true;
    })
    .then(function () {
      var modal = document.getElementById("homeFreerollsListModal");
      if (!modal) return;
      initHomeFreerollsListModal();
      renderHomeFreerollSchedule();
      modal.classList.remove("home-freerolls-list-modal--hidden");
      modal.setAttribute("aria-hidden", "false");
    });
}

function closeHomeFreerollsListModal() {
  var modal = document.getElementById("homeFreerollsListModal");
  if (!modal) return;
  modal.classList.add("home-freerolls-list-modal--hidden");
  modal.setAttribute("aria-hidden", "true");
}

function initHomeFreerollsListModal() {
  var modal = document.getElementById("homeFreerollsListModal");
  if (!modal || modal.__initedHomeFreerollsList) return;
  modal.__initedHomeFreerollsList = true;
  modal.addEventListener("click", function (e) {
    var closeBtn = e.target && e.target.closest ? e.target.closest("[data-home-freerolls-list-close]") : null;
    if (closeBtn) {
      e.preventDefault();
      closeHomeFreerollsListModal();
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeHomeFreerollsListModal();
  });
}

function openHomeFreerollModal(item) {
  var modal = document.getElementById("homeFreerollModal");
  if (!modal || !item) return;
  closeHomeFreerollsListModal();
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
window.openHomeFreerollsListModal = openHomeFreerollsListModal;

(function initHomeFreerollsShortcut() {
  document.addEventListener("click", function (e) {
    var trigger = e.target && e.target.closest ? e.target.closest("[data-home-freerolls-open]") : null;
    if (!trigger) return;
    e.preventDefault();
    openHomeFreerollsListModal();
  });
})();

function updateTournamentDayBlock() {
  try {
    initHomeFreerollModal();
    initHomeTournamentBonusModal();
    initHomeTournamentBonusButtons();
    initHomeTournamentBubbleModal();
    initHomeTournamentBubbleButtons();
    initHomeTournamentLeagueTopModal();
    initHomeTournamentLeagueTopButtons();
    initHomeTournamentNotifyControls();
    renderHomeFreerollSchedule();
    pokerUpdateDownloadInfoSubsections();
  } catch (eHomeFreerolls) {}
  try {
    initHomeTournamentRaffleBonus();
  } catch (eHomeTournamentRaffleBonus) {}
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
  function tournamentDayStartUtcHour(item) {
    var mskHour = item && Number.isFinite(Number(item.hour)) ? Math.floor(Number(item.hour)) : 18;
    return mskHour - 3;
  }
  function tournamentDayEndRegUtcHour(item) {
    return tournamentDayStartUtcHour(item) + 3;
  }
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
    var todayItem = pokerGetHomeTournamentItem(getMskDayOfWeek(), now);
    var endRegToday = new Date(Date.UTC(p.y, p.m, p.d, tournamentDayEndRegUtcHour(todayItem), 0, 0, 0));
    if (now < endRegToday) return p;
    var nextUtc = new Date(Date.UTC(p.y, p.m, p.d, 12, 0, 0, 0));
    nextUtc.setUTCDate(nextUtc.getUTCDate() + 1);
    return { y: nextUtc.getUTCFullYear(), m: nextUtc.getUTCMonth(), d: nextUtc.getUTCDate() };
  }
  function getTournamentDayState(now) {
    var p = getMskDateParts();
    var mskDow = getMskDayOfWeek();
    var todayItem = pokerGetHomeTournamentItem(mskDow, now);
    var startToday = new Date(Date.UTC(p.y, p.m, p.d, tournamentDayStartUtcHour(todayItem), 0, 0, 0));
    var endRegToday = new Date(Date.UTC(p.y, p.m, p.d, tournamentDayEndRegUtcHour(todayItem), 0, 0, 0));
    if (now < startToday) {
      return { t: todayItem, target: startToday, label: "", weekday: mskDow };
    }
    if (now < endRegToday) {
      return { t: todayItem, target: endRegToday, label: "до конца рег ", weekday: mskDow };
    }
    var nextDate = new Date(p.y, p.m, p.d + 1);
    var nextMskDow = nextDate.getDay();
    var nextItem = pokerGetHomeTournamentItem(nextMskDow, new Date(Date.UTC(nextDate.getFullYear(), nextDate.getMonth(), nextDate.getDate(), 12, 0, 0, 0)));
    var nextStart = new Date(Date.UTC(nextDate.getFullYear(), nextDate.getMonth(), nextDate.getDate(), tournamentDayStartUtcHour(nextItem), 0, 0, 0));
    return { t: nextItem, target: nextStart, label: "", weekday: nextMskDow };
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
    var startUtcH = hourOpts.startUtcHour != null ? hourOpts.startUtcHour : tournamentDayStartUtcHour(tInfo);
    var endRegUtcH = hourOpts.endRegUtcHour != null ? hourOpts.endRegUtcHour : tournamentDayEndRegUtcHour(tInfo);
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
    var fallbackBuyin = item.room === "Poker21" && item.dow === 6 ? "350₽ · R:350₽ / A:350₽" : "0₽";
    var fallbackGuarantee = item.daily ? "9 000₽" : "5 билетов по 10 000₽ каждый";
    return {
      name: item.name || (item.room === "X-poker" ? "Фриролл X-poker" : "Фриролл"),
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
    var detailHour = detailState.t && Number.isFinite(Number(detailState.t.hour)) ? Math.floor(Number(detailState.t.hour)) : 18;
    var detailMinute = detailState.t && Number.isFinite(Number(detailState.t.minute)) ? Math.floor(Number(detailState.t.minute)) : 0;
    var detailTime = String(detailHour).padStart(2, "0") + ":" + String(detailMinute).padStart(2, "0");
    renderHomeTournamentWeekList(selectedWeekday);
    renderHomeLiveTournament(n);
    var homeTournamentName = document.getElementById("tournamentDayHomeName");
    if (homeTournamentName) homeTournamentName.textContent = detailNameStr || "Турнир дня";
    window._tournamentDayShare = {
      name: detailNameStr,
      time: detailTime,
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
      tdWeekTime.textContent = pokerMskWeekdayShortAt(detailState.target.getTime()) + ", " + detailTime + " МСК";
    }
    syncHomeTournamentBonusAvailability(selectedWeekday);
    syncHomeTournamentBubbleBuyinLabel(selectedWeekday);
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
      homeTrophyMedia.style.removeProperty("background-image");
      if (hasDetailBanner && detailState.t.bannerWidth && detailState.t.bannerHeight) {
        homeTrophyMedia.style.setProperty("--home-tournament-banner-aspect", detailState.t.bannerWidth + " / " + detailState.t.bannerHeight);
      } else {
        homeTrophyMedia.style.removeProperty("--home-tournament-banner-aspect");
      }
    }
    if (homeTrophyImg) {
      bindHomeTournamentImageRecovery(homeTrophyImg);
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
