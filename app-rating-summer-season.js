// Summer rating season constants and external top links.

var SUMMER_HOME_JUNE_DAYS_1_7 = ["01.06.2026", "02.06.2026", "03.06.2026", "04.06.2026", "05.06.2026", "06.06.2026", "07.06.2026"];
var SUMMER_HOME_JUNE_DAYS_8_14 = ["08.06.2026", "09.06.2026", "10.06.2026", "11.06.2026", "12.06.2026", "13.06.2026", "14.06.2026"];
var SUMMER_HOME_JUNE_DAYS_15_21 = ["15.06.2026", "16.06.2026", "17.06.2026", "18.06.2026", "19.06.2026", "20.06.2026", "21.06.2026"];
var SUMMER_HOME_JUNE_DAYS_22_28 = ["22.06.2026", "23.06.2026", "24.06.2026", "25.06.2026", "26.06.2026", "27.06.2026", "28.06.2026"];
var SUMMER_HOME_JUNE_DAYS_29_30 = ["29.06.2026", "30.06.2026"];
var SUMMER_VIEW_JUNE_WEEK_BLOCKS = [
  { label: "1—7 июня", dates: SUMMER_HOME_JUNE_DAYS_1_7 },
  { label: "8—14 июня", dates: SUMMER_HOME_JUNE_DAYS_8_14 },
  { label: "15—21 июня", dates: SUMMER_HOME_JUNE_DAYS_15_21 },
  { label: "22—28 июня", dates: SUMMER_HOME_JUNE_DAYS_22_28 },
  { label: "29—30 июня", dates: SUMMER_HOME_JUNE_DAYS_29_30 }
];

var SUMMER_RATING_SEASON = {
  key: "summer",
  view: "summer-rating",
  placeholderId: "summerRatingSectionPlaceholder",
  scrollBtnId: "summerRatingViewScrollBtn",
  sectionClass: "summer-rating",
  icon: "☀",
  label: "Лето 2026",
  topLabel: "Топы лета",
  maxWinLabel: "за лето",
  top3WinsLabel: "за лето",
  updatedLabel: "9 июня",
  finalAt: new Date(2026, 7, 31, 23, 59, 59, 999),
  finalText: "Итоги 31-го августа",
  emptyDataText: "Данные с 1 июня",
  monthRegex: /\.(06|07|08)\.2026$/,
  monthToneRegex: /\.(06|07|08)\./,
  playerPrefix: "summer_rating_player_",
  datePrefix: "summer_rating_date_",
  leaguePrefix: "summer_rating_league_",
  topLinkBase: "",
  viewMonths: [
    { title: "Август", totalId: "springRatingViewMayTotal", weeksHostId: "springRatingViewMayWeeks", blocks: [] },
    { title: "Июль", totalId: "springRatingViewAprilTotal", weeksHostId: "springRatingViewAprilWeeks", blocks: [] },
    { title: "Июнь", totalId: "springRatingViewMarchTotal", weeksHostId: "springRatingViewMarchWeeks", blocks: SUMMER_VIEW_JUNE_WEEK_BLOCKS },
  ],
  pastWeekDates: [],
  currentWeekDates: SUMMER_HOME_JUNE_DAYS_1_7,
  nextWeekDates: [],
};
