// Rating data registry. Keeps runtimes coupled to accessors instead of raw season globals.

function pokerRatingGetSpringTournamentsByDate() {
  if (typeof isSummerRatingMode === "function" && isSummerRatingMode()) return pokerRatingGetSummerTournamentsByDate();
  return typeof SPRING_RATING_TOURNAMENTS_BY_DATE !== "undefined" ? SPRING_RATING_TOURNAMENTS_BY_DATE || {} : {};
}

function pokerRatingGetSpringImagesByLeague(leagueNum) {
  if (typeof isSummerRatingMode === "function" && isSummerRatingMode()) return pokerRatingGetSummerImagesByLeague(leagueNum);
  if (Number(leagueNum) === 1 && typeof SPRING_RATING_IMAGES_LEAGUE1 !== "undefined") return SPRING_RATING_IMAGES_LEAGUE1 || {};
  if (Number(leagueNum) === 2 && typeof SPRING_RATING_IMAGES_LEAGUE2 !== "undefined") return SPRING_RATING_IMAGES_LEAGUE2 || {};
  return {};
}

function pokerRatingGetSummerTournamentsByDate() {
  return typeof SUMMER_RATING_TOURNAMENTS_BY_DATE !== "undefined" ? SUMMER_RATING_TOURNAMENTS_BY_DATE || {} : {};
}

function pokerRatingGetSummerImagesByLeague(leagueNum) {
  if (Number(leagueNum) === 1 && typeof SUMMER_RATING_IMAGES_LEAGUE1 !== "undefined") return SUMMER_RATING_IMAGES_LEAGUE1 || {};
  if (Number(leagueNum) === 2 && typeof SUMMER_RATING_IMAGES_LEAGUE2 !== "undefined") return SUMMER_RATING_IMAGES_LEAGUE2 || {};
  return {};
}

function pokerRatingGetWinterRowsByDate() {
  return typeof WINTER_RATING_BY_DATE !== "undefined" ? WINTER_RATING_BY_DATE || {} : {};
}

function pokerRatingGetWinterTournamentsByDate() {
  return typeof WINTER_RATING_TOURNAMENTS_BY_DATE !== "undefined" ? WINTER_RATING_TOURNAMENTS_BY_DATE || {} : {};
}

function pokerRatingGetWinterImages() {
  return typeof WINTER_RATING_IMAGES !== "undefined" ? WINTER_RATING_IMAGES || {} : {};
}

function pokerRatingGetSpringMonthDates(monthNum) {
  var byDate = pokerRatingGetSpringTournamentsByDate();
  var month = Number(monthNum) || 0;
  return Object.keys(byDate).filter(function (dateStr) {
    var parts = String(dateStr || "").split(".");
    return Number(parts[1]) === month;
  });
}

function pokerRatingBuildSpringRowsByDate() {
  var tournaments = pokerRatingGetSpringTournamentsByDate();
  var byDate = {};
  var dates = Object.keys(tournaments);
  for (var di = 0; di < dates.length; di++) {
    var dateStr = dates[di];
    var byNick = {};
    var list = tournaments[dateStr];
    if (!Array.isArray(list)) continue;
    for (var ti = 0; ti < list.length; ti++) {
      var t = list[ti];
      var players = t.players || [];
      for (var pi = 0; pi < players.length; pi++) {
        var p = players[pi];
        var nick = normalizeWinterNick(p && p.nick);
        if (!nick) continue;
        var points = winterRatingTournamentPlayerPoints(p);
        var reward = p.reward != null ? Number(p.reward) : 0;
        if (reward !== reward) reward = 0;
        if (!byNick[nick]) byNick[nick] = { nick: nick, points: 0, reward: 0 };
        byNick[nick].points += points;
        byNick[nick].reward += reward;
      }
    }
    byDate[dateStr] = Object.keys(byNick)
      .map(function (key) { return byNick[key]; })
      .filter(function (row) { return (row.points || 0) !== 0 || (row.reward || 0) !== 0; })
      .sort(function (a, b) { return (b.points - a.points) || (b.reward - a.reward); });
  }
  return byDate;
}
