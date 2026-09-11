"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

test("old leaderboard banner is absent from home and the current SNG CTA remains available", function () {
  const root = path.join(__dirname, "..");
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  assert.doesNotMatch(html, /class="home-leaderboard-winners-banner"/);
  assert.doesNotMatch(html, /home-mtt-leaderboard-winners\.webp/);
  assert.match(html, /id="sngChampionsOpen"/);
  assert.match(html, /data-sng-home-cta data-sng-open/);
});
