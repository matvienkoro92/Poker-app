const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const path = require("node:path");
const filename = require.resolve("../lib/api-handlers/club-choice-vote");
const mod = new Module(filename, module);
mod.filename = filename;
mod.paths = Module._nodeModulePaths(path.dirname(filename));
mod._compile(fs.readFileSync(filename, "utf8") + "\nmodule.exports.testHelpers = { normalizeState, achievementHistory };", filename);
const { normalizeState, achievementHistory } = mod.exports.testHelpers;

test("July winner keeps votes and moves from August without changing the active August ballot", () => {
  const state = normalizeState({ status: "active", monthKey: "2026-08", candidates: [{ id: "candidate" }],
    history: [{ month: "2026-08", completedAt: "2026-08-31", winners: [{ nick: "ПокерМанки", description: "Рекорд июля: 39 топ-3", votes: 42 }] }] });
  assert.equal(state.monthKey, "2026-08");
  assert.equal(state.status, "active");
  assert.equal(state.candidates[0].id, "candidate");
  const rows = achievementHistory(state);
  assert.equal(rows.filter(row => row.month === "2026-07").length, 1);
  assert.equal(rows.find(row => row.month === "2026-07").winners[0].votes, 42);
  assert.equal(rows.some(row => row.month === "2026-08"), false);
});

test("a future legitimate August award is not moved to July", () => {
  const rows = achievementHistory({ history: [{ month: "2026-08", winners: [{ nick: "ПокерМанки", description: "Достижение августа" }] }] });
  assert.equal(rows.find(row => row.month === "2026-08").winners[0].nick, "ПокерМанки");
});
