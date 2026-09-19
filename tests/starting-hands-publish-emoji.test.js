"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

test("hand publication question provides a caret-aware poker emoji picker", function () {
  const source = fs.readFileSync(path.join(__dirname, "..", "starting-hands", "screen.js"), "utf8");
  const css = fs.readFileSync(path.join(__dirname, "..", "starting-hands", "screen.css"), "utf8");
  assert.match(source, /data-emoji-toggle/);
  assert.match(source, /data-emoji-picker/);
  assert.match(source, /textarea\.selectionStart/);
  assert.match(source, /textarea\.setSelectionRange\(caret,caret\)/);
  assert.match(source, /'♠️','♥️','♦️','♣️','🃏'/);
  assert.match(css, /\.hand-publish-comment__emoji-picker\[hidden\]\{display:none\}/);
});
