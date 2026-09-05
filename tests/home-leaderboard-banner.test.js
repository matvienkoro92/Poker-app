"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

test("leaderboard winners are pinned in club news and absent from home", function () {
  const root = path.join(__dirname, "..");
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const news = fs.readFileSync(path.join(root, "app-home-friend-news.js"), "utf8");
  assert.doesNotMatch(html, /class="home-leaderboard-winners-banner"/);
  assert.doesNotMatch(html, /home-mtt-leaderboard-winners\.webp/);
  assert.match(news, /home-mtt-leaderboard-winners\.webp/);
  assert.doesNotMatch(html, /id="sngChampionsOpen"/);
  assert.match(news, /home-friend-news-modal__pinned-banner/);
});
