// Summer rating runtime hooks. The shared rating renderer reads this season config when summer is active.

function isSummerRatingMode() {
  return document.body && document.body.getAttribute("data-view") === "summer-rating";
}

function getSummerRatingTournamentsByDate() {
  if (typeof pokerRatingGetSummerTournamentsByDate === "function") return pokerRatingGetSummerTournamentsByDate();
  return typeof SUMMER_RATING_TOURNAMENTS_BY_DATE !== "undefined" ? SUMMER_RATING_TOURNAMENTS_BY_DATE : {};
}

function getSummerRatingImagesByLeague(leagueNum) {
  if (typeof pokerRatingGetSummerImagesByLeague === "function") return pokerRatingGetSummerImagesByLeague(leagueNum);
  if (leagueNum === 1 && typeof SUMMER_RATING_IMAGES_LEAGUE1 !== "undefined") return SUMMER_RATING_IMAGES_LEAGUE1 || {};
  if (leagueNum === 2 && typeof SUMMER_RATING_IMAGES_LEAGUE2 !== "undefined") return SUMMER_RATING_IMAGES_LEAGUE2 || {};
  return {};
}
