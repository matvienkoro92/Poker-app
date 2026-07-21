"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { _test } = require("../lib/api-handlers/admin-report-shifts");

test("server collects every saved unreported rakeback row for the report author and date", () => {
  const sundayEntryAt = Date.parse("2026-07-12T15:00:00.000Z");
  const draft = {
    rows: [
      { groupId: "p21", room: "P21", playerId: "1", rake: 1000, percent: 30, amount: 300, saved: true, ownerId: "tg_1", createdAt: sundayEntryAt, entryAddedAt: sundayEntryAt },
      { groupId: "x", room: "X", playerId: "2", rake: 2000, percent: 30, amount: 600, saved: true, ownerId: "tg_1", createdAt: sundayEntryAt, entryAddedAt: sundayEntryAt },
      { groupId: "other-owner", room: "P21", playerId: "3", rake: 1000, percent: 30, amount: 300, saved: true, ownerId: "tg_2", createdAt: sundayEntryAt, entryAddedAt: sundayEntryAt },
      { groupId: "already-used", room: "P21", playerId: "4", rake: 1000, percent: 30, amount: 300, saved: true, accounted: true, reportId: "old", ownerId: "tg_1", createdAt: sundayEntryAt, entryAddedAt: sundayEntryAt },
      { groupId: "monday", room: "P21", playerId: "5", rake: 1000, percent: 30, amount: 300, saved: true, ownerId: "tg_1", createdAt: sundayEntryAt + 24 * 60 * 60 * 1000, entryAddedAt: sundayEntryAt + 24 * 60 * 60 * 1000 },
    ],
  };
  const report = { id: "report", date: "12.07.2026", createdAt: "2026-07-12T23:49:00.000Z", authorId: "tg_1" };

  const matched = _test.collectDraftRakebackRowsForReport(draft, report, "tg_1");

  assert.equal(matched.rows.length, 2);
  assert.equal(matched.rows.reduce((sum, row) => sum + row.amount, 0), 900);
  assert.deepEqual(matched.rows.map((row) => row.room).sort(), ["P21", "X"]);
});

test("matched draft rows are marked with the created report", () => {
  const row = { groupId: "g", room: "P21", playerId: "1", rake: 1000, percent: 30, amount: 300, saved: true, ownerId: "tg_1", createdAt: 1783868400000, entryAddedAt: 1783868400000 };
  const report = { id: "new-report", createdAt: "2026-07-12T23:49:00.000Z" };
  const matched = _test.collectDraftRakebackRowsForReport({ rows: [row] }, { ...report, date: "12.07.2026" }, "tg_1");

  const rows = _test.markDraftRakebackRowsReported(matched.draftRows, matched.matchedKeys, report);

  assert.equal(rows[0].accounted, true);
  assert.equal(rows[0].reportId, "new-report");
  assert.equal(rows[0].reportedAmount, 300);
});

test("a rakeback row created after an existing report is not attached to that old report", () => {
  const report = { createdAt: "2026-07-20T00:33:50.578Z", date: "19.07.2026" };
  const newRow = {
    createdAt: Date.parse("2026-07-20T18:05:13.377Z"),
    entryAddedAt: Date.parse("2026-07-20T18:05:13.377Z"),
  };
  const existingRow = {
    createdAt: Date.parse("2026-07-19T23:55:00.000Z"),
    entryAddedAt: Date.parse("2026-07-19T23:55:00.000Z"),
  };

  assert.equal(_test.shouldAttachRakebackRowToExistingReport(newRow, report), false);
  assert.equal(_test.shouldAttachRakebackRowToExistingReport(existingRow, report), true);
});

test("a new row created from a previous-week template gets the current entry date", () => {
  const now = Date.parse("2026-07-20T18:20:40.000Z");
  const createdAt = Date.parse("2026-07-20T18:20:24.566Z");
  const oldTemplateDate = Date.parse("2026-07-19T03:00:00.000Z");
  const rows = _test.normalizeNewTemplateEntryDates([{
    groupId: "shell_template_1784571624566_b302a02f2cd7",
    kind: "base",
    room: "P21",
    playerId: "590773",
    rake: 15545,
    percent: 65,
    saved: true,
    createdAt,
    standardAt: createdAt,
    entryAddedAt: oldTemplateDate,
  }], now);

  assert.equal(rows[0].entryAddedAt, createdAt);
  assert.equal(rows[0].accounted, false);
});

test("a new row created from a same-week template gets its actual creation date", () => {
  const now = Date.parse("2026-07-21T18:10:02.237Z");
  const createdAt = Date.parse("2026-07-21T18:10:02.135Z");
  const mondayTemplateDate = Date.parse("2026-07-20T03:00:00.000Z");
  const rows = _test.normalizeNewTemplateEntryDates([{
    groupId: "shell_template_1784657402135_deadbeef",
    kind: "base",
    room: "X",
    playerId: "2818330",
    rake: 240.61,
    percent: 55,
    saved: true,
    createdAt,
    standardAt: createdAt,
    entryAddedAt: mondayTemplateDate,
  }], now);

  assert.equal(rows[0].entryAddedAt, createdAt);
  assert.equal(rows[0].accounted, false);
});
