const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync(require.resolve("../../summer-rating-data-september.js"), "utf8");
const day = vm.runInNewContext(source + '\nSUMMER_RATING_TOURNAMENTS_SEPTEMBER_BY_DATE["09.09.2026"]');
module.exports = day.flatMap(tournament => tournament.players.map(player => ({
  ...player, dateLabel: "09.09.2026", date: "2026-09-09T" + tournament.time + ":00",
  tournament: tournament.name, tournamentId: tournament.time + "|" + tournament.name
})));
