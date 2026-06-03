// Spring rating season constants and external top links.

var SPRING_RATING_SEASON = {
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
  finalAt: new Date(2026, 4, 31, 23, 59, 59, 999),
  finalText: "Итоги 31-го мая",
  emptyDataText: "Данные с 1 марта",
  monthRegex: /\.(03|04|05)\.2026$/,
  monthToneRegex: /\.(03|04|05)\./,
  playerPrefix: "spring_rating_player_",
  datePrefix: "spring_rating_date_",
  leaguePrefix: "spring_rating_league_",
  topLinkBase: "https://t.me/Poker_dvatuza_bot/DvaTuza",
};

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
var SPRING_HOME_APRIL_DAYS_27_30 = ["27.04.2026", "28.04.2026", "29.04.2026", "30.04.2026"];
var SPRING_HOME_APRIL_PROMO_TOTAL_DATES = SPRING_HOME_APRIL_DAYS_1_5
  .concat(SPRING_HOME_APRIL_DAYS_6_12)
  .concat(SPRING_HOME_APRIL_DAYS_13_19)
  .concat(SPRING_HOME_APRIL_DAYS_20_26)
  .concat(SPRING_HOME_APRIL_DAYS_27_30);
/** Май: календарные недели месяца */
var SPRING_HOME_MAY_DAYS_1_3 = ["01.05.2026", "02.05.2026", "03.05.2026"];
var SPRING_HOME_MAY_DAYS_4_10 = ["04.05.2026", "05.05.2026", "06.05.2026", "07.05.2026", "08.05.2026", "09.05.2026", "10.05.2026"];
var SPRING_HOME_MAY_DAYS_11_17 = ["11.05.2026", "12.05.2026", "13.05.2026", "14.05.2026", "15.05.2026", "16.05.2026", "17.05.2026"];
var SPRING_HOME_MAY_DAYS_18_24 = ["18.05.2026", "19.05.2026", "20.05.2026", "21.05.2026", "22.05.2026", "23.05.2026", "24.05.2026"];
var SPRING_HOME_MAY_DAYS_25_31 = ["25.05.2026", "26.05.2026", "27.05.2026", "28.05.2026", "29.05.2026", "30.05.2026", "31.05.2026"];
var SPRING_HOME_MAY_PROMO_TOTAL_DATES = SPRING_HOME_MAY_DAYS_1_3
  .concat(SPRING_HOME_MAY_DAYS_4_10)
  .concat(SPRING_HOME_MAY_DAYS_11_17)
  .concat(SPRING_HOME_MAY_DAYS_18_24)
  .concat(SPRING_HOME_MAY_DAYS_25_31);
/** Экран рейтинга весны: недели внутри раскрывающихся «Апрель» / «Март · итоги» */
var SPRING_VIEW_MAY_WEEK_BLOCKS = [
  { label: "25—31 мая", dates: SPRING_HOME_MAY_DAYS_25_31 },
  { label: "18—24 мая", dates: SPRING_HOME_MAY_DAYS_18_24 },
  { label: "11—17 мая", dates: SPRING_HOME_MAY_DAYS_11_17 },
  { label: "4—10 мая", dates: SPRING_HOME_MAY_DAYS_4_10 },
  { label: "1—3 мая", dates: SPRING_HOME_MAY_DAYS_1_3 }
];
var SPRING_VIEW_APRIL_WEEK_BLOCKS = [
  { label: "27—30 апреля", dates: SPRING_HOME_APRIL_DAYS_27_30 },
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

SPRING_RATING_SEASON.viewMonths = [
  { title: "Май", totalId: "springRatingViewMayTotal", weeksHostId: "springRatingViewMayWeeks", blocks: SPRING_VIEW_MAY_WEEK_BLOCKS },
  { title: "Апрель", totalId: "springRatingViewAprilTotal", weeksHostId: "springRatingViewAprilWeeks", blocks: SPRING_VIEW_APRIL_WEEK_BLOCKS },
  { title: "Март", totalId: "springRatingViewMarchTotal", weeksHostId: "springRatingViewMarchWeeks", blocks: SPRING_VIEW_MARCH_WEEK_BLOCKS },
];
SPRING_RATING_SEASON.pastWeekDates = MARCH_PAST_WEEK_DATES;
SPRING_RATING_SEASON.currentWeekDates = MARCH_CURRENT_WEEK_DATES;
SPRING_RATING_SEASON.nextWeekDates = MARCH_NEXT_WEEK_DATES;

// Рейтинг весны: одна база для ссылок топов. Топы текущей недели = BASE?Mart_week_1=1, Топы Марта = BASE?mart=1
// Укажите сюда полный URL (например https://t.me/... или ссылку на пост), параметры допишутся автоматически
var SPRING_TOP_LINK_BASE = "https://t.me/Poker_dvatuza_bot/DvaTuza";
