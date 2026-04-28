// Rating core helpers: spring rating tabs, date constants and shared top calculations.

(function initSpringRatingLeagueTabs() {
  document.body.addEventListener("click", function (e) {
    var el = e.target;
    var tab = null;
    while (el && el !== document.body) {
      if (el.classList && el.classList.contains("spring-rating-date-league-tab")) {
        tab = el;
        break;
      }
      el = el.parentElement;
    }
    if (!tab) return;
    var wrap = tab.parentElement;
    while (wrap && wrap !== document.body) {
      if (wrap.classList && wrap.classList.contains("spring-rating-date-leagues")) break;
      wrap = wrap.parentElement;
    }
    if (!wrap || wrap === document.body) return;
    e.preventDefault();
    e.stopPropagation();
    var league = tab.getAttribute("data-league");
    if (!league) return;
    var tabs = wrap.querySelectorAll(".spring-rating-date-league-tab");
    var blocks = wrap.querySelectorAll(".spring-rating-date-league");
    for (var i = 0; i < tabs.length; i++) tabs[i].classList.toggle("spring-rating-date-league-tab--active", tabs[i].getAttribute("data-league") === league);
    for (var j = 0; j < blocks.length; j++) blocks[j].style.display = blocks[j].getAttribute("data-league") === league ? "" : "none";
  }, true);
})();

// Топы по выигрышу за набор дат (прошлая/текущая неделя)
/** Версия газеты для /api/deploy-hook + рассылки (номер последней опубликованной новости). */
var GAZETTE_VERSION = "20";
var GAZETTE_DATES = ["15.02.2026", "16.02.2026", "17.02.2026", "18.02.2026", "19.02.2026", "20.02.2026", "21.02.2026", "22.02.2026"];
var CURRENT_WEEK_DATES = ["23.02.2026", "24.02.2026", "25.02.2026", "26.02.2026", "27.02.2026", "28.02.2026", "29.02.2026"];
/** Рейтинг весны: даты прошлой недели по марту (9–15 марта) */
var MARCH_PAST_WEEK_DATES = ["09.03.2026", "10.03.2026", "11.03.2026", "12.03.2026", "13.03.2026", "14.03.2026", "15.03.2026"];
/** Рейтинг весны: даты текущей недели по марту (23–29 марта) */
var MARCH_CURRENT_WEEK_DATES = ["23.03.2026", "24.03.2026", "25.03.2026", "26.03.2026", "27.03.2026", "28.03.2026", "29.03.2026"];
/** Рейтинг весны: даты следующей недели по марту (16–22 марта) */
var MARCH_NEXT_WEEK_DATES = ["16.03.2026", "17.03.2026", "18.03.2026", "19.03.2026", "20.03.2026", "21.03.2026", "22.03.2026"];
/** Главная: сводка «Март / апрель» у кнопки рейтинга весны */
var SPRING_HOME_MARCH_WEEK1_DATES = ["01.03.2026", "02.03.2026", "03.03.2026", "04.03.2026", "05.03.2026", "06.03.2026", "07.03.2026", "08.03.2026"];
var SPRING_HOME_MARCH_TAIL_DATES = ["30.03.2026", "31.03.2026"];
/** Апрель: 1—5 число и календарные недели месяца */
var SPRING_HOME_APRIL_DAYS_1_5 = ["01.04.2026", "02.04.2026", "03.04.2026", "04.04.2026", "05.04.2026"];
var SPRING_HOME_APRIL_DAYS_6_12 = ["06.04.2026", "07.04.2026", "08.04.2026", "09.04.2026", "10.04.2026", "11.04.2026", "12.04.2026"];
var SPRING_HOME_APRIL_DAYS_13_19 = ["13.04.2026", "14.04.2026", "15.04.2026", "16.04.2026", "17.04.2026", "18.04.2026", "19.04.2026"];
var SPRING_HOME_APRIL_DAYS_20_26 = ["20.04.2026", "21.04.2026", "22.04.2026", "23.04.2026", "24.04.2026", "25.04.2026", "26.04.2026"];
var SPRING_HOME_APRIL_PROMO_TOTAL_DATES = SPRING_HOME_APRIL_DAYS_1_5
  .concat(SPRING_HOME_APRIL_DAYS_6_12)
  .concat(SPRING_HOME_APRIL_DAYS_13_19)
  .concat(SPRING_HOME_APRIL_DAYS_20_26);
/** Экран рейтинга весны: недели внутри раскрывающихся «Апрель» / «Март · итоги» */
var SPRING_VIEW_APRIL_WEEK_BLOCKS = [
  { label: "20—26 апреля", dates: SPRING_HOME_APRIL_DAYS_20_26 },
  { label: "13—19 апреля", dates: SPRING_HOME_APRIL_DAYS_13_19 },
  { label: "6—12 апреля", dates: SPRING_HOME_APRIL_DAYS_6_12 },
  { label: "1—5 апреля", dates: SPRING_HOME_APRIL_DAYS_1_5 }
];
var SPRING_VIEW_MARCH_WEEK_BLOCKS = [
  { label: "1—8 марта", dates: SPRING_HOME_MARCH_WEEK1_DATES },
  { label: "9—15 марта", dates: MARCH_PAST_WEEK_DATES },
  { label: "16—22 марта", dates: MARCH_NEXT_WEEK_DATES },
  { label: "23—29 марта", dates: MARCH_CURRENT_WEEK_DATES },
  { label: "30—31 марта", dates: SPRING_HOME_MARCH_TAIL_DATES }
];

function updateSpringRatingPromoDateFromVar() {
  try {
    if (typeof SPRING_RATING_UPDATED === "undefined") return;
    var el = document.querySelector(".feature--rating-spring-promo .feature__title-updated");
    if (!el) return;
    el.textContent = "обновлено " + SPRING_RATING_UPDATED;
  } catch (e) {
    if (typeof console !== "undefined" && console.warn) console.warn("updateSpringRatingPromoDateFromVar", e);
  }
}
// Рейтинг весны: одна база для ссылок топов. Топы текущей недели = BASE?Mart_week_1=1, Топы Марта = BASE?mart=1
// Укажите сюда полный URL (например https://t.me/... или ссылку на пост), параметры допишутся автоматически
var SPRING_TOP_LINK_BASE = "https://t.me/Poker_dvatuza_bot/DvaTuza";

function normalizeWinterNick(n) {
  n = n != null ? String(n).trim() : "";
  if (!n) return n;
  var lower = n.toLowerCase();
  if (lower === "pryanik2la") return "Пряник";
  if (lower === "фокс") return "Фокс";
  if (lower === "waaarr" || lower === "waaar" || lower === "waaaar") return "Waaar";
  if (lower === "andrushamorf" || lower === "4ezzi") return "FrankL";
  return n;
}
function normalizeWinterNickForFinalTable(n) {
  return normalizeWinterNick(n);
}
function winterRatingSamePlayer(nickA, nickB) {
  var a = normalizeWinterNick(nickA);
  var b = normalizeWinterNick(nickB);
  if (!a || !b) return a === b;
  return a === b;
}
function getTopByDates(dates) {
  if (!dates || !dates.length) return [];
  var byNick = {};
  dates.forEach(function (dateStr) {
    var list = getRatingByDate()[dateStr];
    if (!list || !list.length) return;
    list.forEach(function (r) {
      var nick = normalizeWinterNick(r.nick);
      var reward = r.reward != null ? Number(r.reward) : 0;
      if (!byNick[nick]) byNick[nick] = 0;
      byNick[nick] += reward;
    });
  });
  return Object.keys(byNick)
    .map(function (nick) { return { nick: nick, totalReward: byNick[nick] }; })
    .filter(function (r) { return r.totalReward > 0; })
    .sort(function (a, b) { return b.totalReward - a.totalReward; })
    .slice(0, 15);
}
