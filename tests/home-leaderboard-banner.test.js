"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

test("leaderboard winners replace the interactive SNG home banner", function () {
  const root = path.join(__dirname, "..");
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const news = fs.readFileSync(path.join(root, "app-home-friend-news.js"), "utf8");
  assert.match(html, /class="home-leaderboard-winners-banner"/);
  assert.match(html, /home-mtt-leaderboard-winners\.webp/);
  assert.doesNotMatch(html, /id="sngChampionsOpen"/);
  assert.doesNotMatch(news, /home-friend-news-modal__pinned-banner/);
});
