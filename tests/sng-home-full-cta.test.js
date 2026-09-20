"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test("full SNG switches the home CTA from signup to watch", function () {
  const source = fs.readFileSync(require.resolve("../app-sng-champions.js"), "utf8");

  assert.match(source, /var isFull = approved >= homeCapacity;/);
  assert.match(source, /var canJoin = state\.status === "open" && !isFull;/);
  assert.match(source, /var canWatch = isFull \|\| state\.status === "bracket" \|\| state\.status === "completed";/);
  assert.match(source, /cta\.textContent = canJoin \? "Записаться" : "Смотреть";/);
});
