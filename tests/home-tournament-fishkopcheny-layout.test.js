"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test("FishKopcheny day uses one table and keeps its live labels readable", function () {
  const css = fs.readFileSync(require.resolve("../styles-home-tournament-scene.css"), "utf8");
  const character = '[data-tournament-character="fishkopcheny"]';
  const rules = css.split("}").filter(rule => rule.includes(character));
  assert.ok(rules.some(rule => rule.includes("::after") && rule.includes("home-tournament-fishkopcheny-head-mask.svg")));
  assert.ok(rules.some(rule => rule.includes("> .home-tournament-bonuses--table {") && rule.includes("aspect-ratio:3/1!important")));
  assert.ok(rules.some(rule => rule.includes(".home-last-longer-dock__bar") && rule.includes("display:flex!important")));
  assert.ok(rules.some(rule => rule.includes(".home-tournament-bonuses__note-arc text") && rule.includes("font-size:28px")));
});
