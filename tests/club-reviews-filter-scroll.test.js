"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

test("review list filters preserve scroll and restore focus without scrolling", function () {
  const source = fs.readFileSync(path.join(__dirname, "..", "app-club-reviews.js"), "utf8");
  const block = source.slice(source.indexOf("function renderListWithoutScrollJump"), source.indexOf("function loadList"));
  assert.match(block, /viewTop=view\?view\.scrollTop:0/);
  assert.match(block, /view\.scrollTop=viewTop/);
  assert.match(block, /focus\(\{preventScroll:true\}\)/);
  assert.match(source, /listMode=id;renderListWithoutScrollJump\(action,id\)/);
  assert.match(source, /listMetric=id;renderListWithoutScrollJump\(action,id\)/);
});
