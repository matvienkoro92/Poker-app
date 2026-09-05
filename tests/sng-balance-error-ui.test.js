"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test("SNG payment errors stay visible inside the modal", () => {
  const client = fs.readFileSync(require.resolve("../app-sng-champions"), "utf8");
  const css = fs.readFileSync(require.resolve("../styles-home-widget-modals.css"), "utf8");
  assert.match(client, /setStatus\(message, "error"\)/);
  assert.match(client, /statusEl\.scrollIntoView/);
  assert.match(css, /\.sng-champions-modal__panel > \.club-choice-vote-modal__status--error/);
});
