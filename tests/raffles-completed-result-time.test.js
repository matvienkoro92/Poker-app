"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

test("completed cash tab uses the last drawn batch time", () => {
  const source = fs.readFileSync(require.resolve("../app-raffles-completed"), "utf8");
  const start = source.indexOf("  function raffleRecentCompletedResultTime(");
  const end = source.indexOf("\n  function ", start + 12);
  const context = {};
  vm.createContext(context);
  vm.runInContext(source.slice(start, end), context);
  assert.equal(context.raffleRecentCompletedResultTime({
    endDate: "2026-09-05T17:15:00.000Z",
    resultBatches: [
      { time: "10:45", drawnAt: "2026-09-05T07:45:19.047Z" },
      { time: "17:45", drawnAt: "2026-09-05T14:45:08.901Z" },
    ],
  }), "17:45");
});
