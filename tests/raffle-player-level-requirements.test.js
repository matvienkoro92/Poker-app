"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { playerRaffleLevelError, playerRaffleRequiredLevel } = require("../lib/raffle-player-level-requirements");

test("salvatore_tm no longer has a personal requirement on either identity", () => {
  assert.equal(playerRaffleRequiredLevel("ID138504", ""), 0);
  assert.equal(playerRaffleRequiredLevel("", "508911"), 0);
  assert.equal(playerRaffleLevelError("ID138504", "508911", 1), null);
});

test("fixed requirement blocks below target and opens at target without moving it", () => {
  const error = playerRaffleLevelError("ID319715", "524129", 29);
  assert.equal(error.accessLevel, 30);
  assert.equal(error.error, "Чтобы участвовать в розыгрышах, достигните 30 уровня.");
  assert.equal(playerRaffleLevelError("ID319715", "524129", 30), null);
  assert.equal(playerRaffleLevelError("ID319715", "524129", 35), null);
});
test("switching either identity preserves the requirement", () => {
  assert.equal(playerRaffleRequiredLevel("ID319715", "different"), 30);
  assert.equal(playerRaffleRequiredLevel("different", "524129"), 30);
  assert.equal(playerRaffleRequiredLevel("ID727385", "644956"), 16);
  assert.equal(playerRaffleRequiredLevel("ID319715", "773051"), 30);
});
test("unlisted players unaffected; unknown level cannot bypass a requirement", () => {
  assert.equal(playerRaffleLevelError("ID111111", "111111", 1), null);
  assert.equal(playerRaffleLevelError("ID864019", "773051", NaN).accessLevel, 9);
});

const { playerDailyPokerLevelError } = require("../lib/raffle-player-level-requirements");
test("411042 must reach level 18 for raffles and spins under either identity", () => {
  for (const check of [playerRaffleLevelError, playerDailyPokerLevelError]) {
    for (const [account, poker] of [["ID862503", "different"], ["different", "411042"]]) {
      for (const level of [0, 13, 17, NaN]) assert.equal(check(account, poker, level).accessLevel, 18);
      assert.equal(check(account, poker, 18), null);
      assert.equal(check(account, poker, 19), null);
    }
  }
});
