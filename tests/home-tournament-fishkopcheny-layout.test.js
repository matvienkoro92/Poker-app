"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test("FishKopcheny day uses one table and keeps its live labels readable", function () {
  const css = fs.readFileSync(require.resolve("../styles-home-tournament-scene.css"), "utf8");
  const sunday = css.slice(css.lastIndexOf("/* Sunday: keep one continuous felt surface"));

  assert.match(sunday, /home-tournament-bonuses--table::before\s*\{\s*display:none!important;/);
  assert.match(sunday, /home-tournament-bonus--pokermanki-knockout::before/);
  assert.match(sunday, /home-tournament-bonus__glove-label\s*\{[\s\S]*width:16\.5cqw!important/);
  assert.match(sunday, /home-last-longer-dock__bar\s*\{\s*display:flex!important;top:74%!important;/);
  assert.match(sunday, /aspect-ratio:900 \/ 1015!important/);
  assert.match(sunday, /background-size:100% auto!important/);
  assert.match(sunday, /home-tournament-bonuses__note-arc text[\s\S]*font:900 38px/);
  assert.match(sunday, /stroke-width:3px!important/);
});
