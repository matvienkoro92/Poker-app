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

test("home widget loader opens the lazily loaded tournament bet modal", function () {
  const root = path.join(__dirname, "..");
  const bootstrap = fs.readFileSync(path.join(root, "app-home-widgets-bootstrap.js"), "utf8");
  const client = fs.readFileSync(path.join(root, "app-tournament-bet.js"), "utf8");
  assert.match(bootstrap, /selector:\s*"\[data-tournament-bet-open\]"/);
  assert.match(bootstrap, /opener:\s*"openTournamentBetModal"/);
  assert.match(client, /window\.openTournamentBetModal\s*=\s*open/);
});
