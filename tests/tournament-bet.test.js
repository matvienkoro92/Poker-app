"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const tournamentBet = require("../lib/api-handlers/tournament-bet");

test("tournament bet money accepts formatted ruble amounts", function () {
  assert.equal(tournamentBet.money("10 000 ₽"), 10000);
  assert.equal(tournamentBet.money("500р"), 500);
  assert.equal(tournamentBet.money("-20"), 20);
  assert.equal(tournamentBet.money(""), 0);
});

test("tournament bet bank is starting bank plus every confirmed stake", function () {
  assert.equal(tournamentBet.bankFor({ startingBank: 10000, stakePrice: 500, entries: [] }), 10000);
  assert.equal(tournamentBet.bankFor({ startingBank: 10000, stakePrice: 500, entries: [{}, {}, {}] }), 11500);
});

test("tournament bet keeps the selected evening tournament and safe banner", function () {
  assert.equal(tournamentBet.assetFile("home-tournament-card-friday-9x10.webp"), "home-tournament-card-friday-9x10.webp");
  assert.equal(tournamentBet.assetFile("https://example.com/banner.webp"), "");
  const state = tournamentBet.publicState({
    id: "tb_1",
    status: "open",
    title: "Нокаут Прогрессив",
    tournamentId: "weekly-5",
    tournamentBanner: "home-tournament-card-friday-9x10.webp",
    tournamentBannerWidth: 640,
    tournamentBannerHeight: 915,
    tournamentBuyin: "500₽",
    tournamentGuarantee: "170 000₽",
    startingBank: 10000,
    stakePrice: 500,
    entries: [],
  }, {});
  assert.equal(state.tournamentId, "weekly-5");
  assert.equal(state.tournamentBanner, "home-tournament-card-friday-9x10.webp");
  assert.equal(state.title, "Нокаут Прогрессив");
  assert.equal(state.entries.length, 0);
});

test("tournament bet participant exposes the SNG-style player data", function () {
  const state = tournamentBet.publicState({
    id: "tb_players",
    status: "open",
    startingBank: 10000,
    stakePrice: 500,
    entries: [{
      accountId: "ID1",
      poker21Id: "777",
      name: "ПокерМанки",
      avatar: "./assets/avatar-monkey.jpg",
      level: 70,
      profileCity: "Москва",
      stake: 500,
      joinedAt: "2026-09-03T17:00:00.000Z",
    }],
  }, { isAdmin: true, accountId: "ID1" });
  assert.deepEqual(state.entries[0], {
    accountId: "ID1",
    poker21Id: "777",
    name: "ПокерМанки",
    avatar: "./assets/avatar-monkey.jpg",
    level: 70,
    profileCity: "Москва",
    stake: 500,
    joinedAt: "2026-09-03T17:00:00.000Z",
    mine: true,
    winner: false,
  });
});

test("home widget loader can open the tournament bet modal", function () {
  const root = path.join(__dirname, "..");
  const bootstrap = fs.readFileSync(path.join(root, "app-home-widgets-bootstrap.js"), "utf8");
  const client = fs.readFileSync(path.join(root, "app-tournament-bet.js"), "utf8");
  assert.match(bootstrap, /selector:\s*"\[data-tournament-bet-open\]"/);
  assert.match(bootstrap, /opener:\s*"openTournamentBetModal"/);
  assert.match(client, /window\.openTournamentBetModal\s*=\s*open/);
});

test("tournament bet client is eager so a stale widget bootstrap cannot swallow the click", function () {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  assert.match(html, /<script defer src="\.\/app-tournament-bet\.js\?v=[^"]+"><\/script>/);
  assert.doesNotMatch(html, /type="application\/poker-lazy"[^>]+src="\.\/app-tournament-bet\.js/);
});

test("tournament bet admin create form selects an evening tournament and previews its banner", function () {
  const root = path.join(__dirname, "..");
  const client = fs.readFileSync(path.join(root, "app-tournament-bet.js"), "utf8");
  const schedule = fs.readFileSync(path.join(root, "app-tournament-day.js"), "utf8");
  assert.match(schedule, /window\.pokerGetEveningTournamentOptions\s*=\s*pokerGetEveningTournamentOptions/);
  assert.match(client, /name="tournamentId" data-tournament-bet-tournament/);
  assert.match(client, /tournamentBannerHtml\(first, true\)/);
});

test("bet action is a single horizontal half-text half-art card", function () {
  const root = path.join(__dirname, "..");
  const client = fs.readFileSync(path.join(root, "app-tournament-bet.js"), "utf8");
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const css = fs.readFileSync(path.join(root, "styles-tournament-bet.css"), "utf8");
  assert.match(client, /tournament-bet-modal__offer/);
  assert.match(client, /tournament-bet-modal__feature-art/);
  assert.match(client, /tournament-bet-self-hero-v2\.jpg/);
  assert.match(html, /<link rel="stylesheet" href="\.\/styles-tournament-bet\.css\?v=[^"]+"/);
  assert.match(css, /\.tournament-bet-modal__offer \.tournament-bet-modal__bet/);
  assert.match(css, /\.tournament-bet-modal__feature\s*\{[^}]*grid-template-columns:\s*repeat\(2,/s);
  assert.match(client, /id="tournamentBetTitle">Ставка на себя<\/h2>/);
  assert.match(client, /Пройдите дальше тех, кто сделал ставку на себя, и заберите весь банк\./);
  assert.match(client, /ID Poker21/);
  assert.match(client, /tournament-bet-modal__entry-stake/);
  assert.match(css, /Participant cards mirror the data-rich SNG battle list/);
  assert.match(client, /pokerGetSummerRatingPlayerArt/);
  assert.match(client, /tournament-bet-modal__participants-grid/);
  assert.match(css, /\.tournament-bet-modal__participants-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,/s);
  assert.match(client, /sng-champions-modal__entry-avatar-img--art/);
});

test("tournament bet hydrates the level from the same cached Poker21 profile as SNG", function () {
  const server = fs.readFileSync(path.join(__dirname, "..", "lib/api-handlers/tournament-bet.js"), "utf8");
  assert.match(server, /PROFILE_HASH_KEY/);
  assert.match(server, /pokerProfileStatusFromCachedProfile\(profile, \{ pokerPlusLinked: true \}\)/);
  assert.match(server, /\[entry\.poker21Id, entry\.accountId, entry\.memberId\]/);
});

test("bettor rating aggregates participation, wins, stakes, prizes and net result", function () {
  const settled = {
    id: "old", status: "settled", startingBank: 10000, stakePrice: 500,
    winnerAccountId: "A", winnerPaidAmount: 11000,
    entries: [
      { accountId: "A", name: "Альфа", stake: 500 },
      { accountId: "B", name: "Бета", stake: 500 },
    ],
  };
  const current = {
    id: "new", status: "open", startingBank: 10000, stakePrice: 500,
    entries: [{ accountId: "A", name: "Альфа", stake: 500 }],
  };
  const rating = tournamentBet.ratingFor([settled], current, { accountId: "A" });
  assert.equal(rating[0].name, "Альфа");
  assert.equal(rating[0].participations, 2);
  assert.equal(rating[0].wins, 1);
  assert.equal(rating[0].totalStaked, 1000);
  assert.equal(rating[0].totalWon, 11000);
  assert.equal(rating[0].net, 10000);
  assert.equal(rating[0].winRate, 50);
  assert.equal(rating[0].mine, true);
});

test("bettor rating does not count the current settled event twice", function () {
  const event = { id: "same", status: "settled", stakePrice: 500, winnerAccountId: "A", winnerPaidAmount: 1500, entries: [{ accountId: "A", name: "Альфа", stake: 500 }] };
  const rating = tournamentBet.ratingFor([event], event, {});
  assert.equal(rating[0].participations, 1);
  assert.equal(rating[0].wins, 1);
});

test("tournament bet has a separate bettor rating tab with full stats", function () {
  const root = path.join(__dirname, "..");
  const client = fs.readFileSync(path.join(root, "app-tournament-bet.js"), "utf8");
  const css = fs.readFileSync(path.join(root, "styles-tournament-bet.css"), "utf8");
  assert.match(client, /data-tournament-bet-tab="rating"/);
  assert.match(client, /Рейтинг ставочников/);
  assert.match(client, /Участий/);
  assert.match(client, /Внесено/);
  assert.match(client, /Выиграно/);
  assert.match(client, /Результат/);
  assert.match(client, /Винрейт/);
  assert.match(css, /\.tournament-bet-modal__rating-row/);
  assert.match(css, /\.tournament-bet-modal__rating-avatar \.sng-champions-modal__entry-avatar-img\s*\{[^}]*position:\s*static\s*!important[^}]*max-width:\s*100%\s*!important[^}]*transform:\s*none\s*!important/s);
});

test("players can create a zero-starting-bank bet from tournaments costing at least 300 rubles", function () {
  const root = path.join(__dirname, "..");
  const client = fs.readFileSync(path.join(root, "app-tournament-bet.js"), "utf8");
  const schedule = fs.readFileSync(path.join(root, "app-tournament-day.js"), "utf8");
  const server = fs.readFileSync(path.join(root, "lib/api-handlers/tournament-bet.js"), "utf8");
  assert.match(schedule, /function pokerGetStakeTournamentOptions/);
  assert.match(schedule, /buyin >= 300/);
  assert.match(schedule, /category\.indexOf\("сателлит"\) >= 0/);
  assert.match(schedule, /!isSatellite/);
  assert.match(client, /data-tournament-bet-tab="create"/);
  assert.match(client, /Выберите турнир, в котором хотите поставить на себя/);
  assert.match(client, /action: "create_player"/);
  assert.match(server, /action === "create_player"/);
  assert.match(server, /startingBank: 0/);
  assert.match(server, /createdByPlayer: true/);
  assert.match(client, /tournament-bet-modal__feature/);
});
