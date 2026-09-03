"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

test("club news viewport does not use the iOS-breaking multilayer mask", function () {
  const css = fs.readFileSync(path.join(__dirname, "..", "styles-home-overrides.css"), "utf8");
  const rule = css.match(/\.app\.app--view-home \.home-club-news__ticker \.home-friend-news__viewport\s*\{([^}]+)\}/);
  assert.ok(rule);
  assert.match(rule[1], /-webkit-mask-image:\s*none/);
  assert.match(rule[1], /mask-image:\s*none/);
});

test("club news track does not clip slides before they rotate into view", function () {
  const css = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");
  const rule = css.match(/\.home-club-news__ticker \.home-friend-news__track\s*\{([^}]+)\}/);
  assert.ok(rule);
  assert.match(rule[1], /display:\s*flex/);
  assert.match(rule[1], /overflow:\s*visible/);
});
