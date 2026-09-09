"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { playerRaffleLevelError, playerRaffleRequiredLevel } = require("../lib/raffle-player-level-requirements");

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
