// Summer rating season constants and external top links.

var SUMMER_HOME_JUNE_DAYS_1_7 = ["01.06.2026", "02.06.2026", "03.06.2026", "04.06.2026", "05.06.2026", "06.06.2026", "07.06.2026"];
var SUMMER_VIEW_JUNE_WEEK_BLOCKS = [
  { label: "1—7 июня", dates: SUMMER_HOME_JUNE_DAYS_1_7 }
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
