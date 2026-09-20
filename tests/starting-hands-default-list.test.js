"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test("hands tab immediately shows the hand list while breakdowns stay collapsed", function () {
  const source = fs.readFileSync(require.resolve("../starting-hands/screen.js"), "utf8");

  assert.match(source, /let currentHistoryTab='overview',handBreakdown='';/);
  assert.match(source, /detail\.hidden=false;/);
  assert.match(source, /handBreakdown=handBreakdown===button\.dataset\.handBreakdown\?'':button\.dataset\.handBreakdown/);
  assert.match(source, /const allHands = game!=='NLH' \|\| searching \|\| !selected;/);
});
