"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

test("old leaderboard banner is absent from home and the completed third SNG battle CTA is removed", function () {
  const root = path.join(__dirname, "..");
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  assert.doesNotMatch(html, /class="home-leaderboard-winners-banner"/);
  assert.doesNotMatch(html, /home-mtt-leaderboard-winners\.webp/);
  assert.doesNotMatch(html, /id="sngChampionsOpen"/);
  assert.doesNotMatch(html, /data-sng-home-cta data-sng-open/);
});
