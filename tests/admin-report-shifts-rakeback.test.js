"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { _test } = require("../lib/api-handlers/admin-report-shifts");

test("period report filtering returns only reports inside the requested month", () => {
  const reports = [
    { id: "june", date: "30.06.2026" },
    { id: "july-start", date: "01.07.2026" },
    { id: "july-end", date: "31/07/2026" },
    { id: "august", createdAt: "2026-08-01T12:00:00.000Z" },
  ];

  assert.deepEqual(
    _test.filterReportsByDateRange(reports, "2026-07-01", "2026-07-31").map((report) => report.id),
    ["july-start", "july-end"]
  );
  assert.equal(_test.filterReportsByDateRange(reports, "bad", "2026-07-31"), null);
});

test("calculation date ranges use the 06:00 MSK business-day boundary", () => {
  const range = _test.calculationDateRangeMs("2026-07-27", "2026-08-02");
  assert.equal(new Date(range.fromMs).toISOString(), "2026-07-27T03:00:00.000Z");
  assert.equal(new Date(range.toMs).toISOString(), "2026-08-03T02:59:59.999Z");
});

test("Poker21 period rake uses the latest saved row in each group", () => {
  const inside = Date.parse("2026-07-28T12:00:00.000Z");
  const rows = [
    { groupId: "a", room: "P21", kind: "base", rake: 1000, saved: true, entryAddedAt: inside },
    { groupId: "a", room: "P21", kind: "addon", rake: 1400, saved: true, entryAddedAt: inside + 1000 },
    { groupId: "b", room: "P21", kind: "base", rake: 700, saved: true, entryAddedAt: inside + 2000 },
    { groupId: "draft", room: "P21", kind: "base", rake: 900, saved: false, entryAddedAt: inside },
    { groupId: "x", room: "X", kind: "base", rake: 500, saved: true, entryAddedAt: inside },
  ];
  const range = _test.calculationDateRangeMs("2026-07-27", "2026-08-02");
  assert.equal(_test.rakebackRoomRakeForRange(rows, "P21", range.fromMs, range.toMs), 2100);
});

test("Vika collects saved unreported rakeback rows for the date regardless of editor", () => {
  const sundayEntryAt = Date.parse("2026-07-12T15:00:00.000Z");
  const draft = {
    rows: [
      { groupId: "p21", room: "P21", playerId: "1", rake: 1000, percent: 30, amount: 300, saved: true, ownerId: "tg_1897001087", createdAt: sundayEntryAt, entryAddedAt: sundayEntryAt },
      { groupId: "x", room: "X", playerId: "2", rake: 2000, percent: 30, amount: 600, saved: true, ownerId: "tg_1897001087", createdAt: sundayEntryAt, entryAddedAt: sundayEntryAt },
      { groupId: "other-owner", room: "P21", playerId: "3", rake: 1000, percent: 30, amount: 300, saved: true, ownerId: "tg_2", createdAt: sundayEntryAt, entryAddedAt: sundayEntryAt },
      { groupId: "already-used", room: "P21", playerId: "4", rake: 1000, percent: 30, amount: 300, saved: true, accounted: true, reportId: "old", ownerId: "tg_1897001087", createdAt: sundayEntryAt, entryAddedAt: sundayEntryAt },
      { groupId: "monday", room: "P21", playerId: "5", rake: 1000, percent: 30, amount: 300, saved: true, ownerId: "tg_1897001087", createdAt: sundayEntryAt + 24 * 60 * 60 * 1000, entryAddedAt: sundayEntryAt + 24 * 60 * 60 * 1000 },
    ],
  };
  const report = { id: "report", date: "12.07.2026", createdAt: "2026-07-12T23:49:00.000Z", authorId: "tg_1897001087" };

  const matched = _test.collectDraftRakebackRowsForReport(draft, report, "tg_1897001087");

  assert.equal(matched.rows.length, 3);
  assert.equal(matched.rows.reduce((sum, row) => sum + row.amount, 0), 1200);
  assert.deepEqual(matched.rows.map((row) => row.room).sort(), ["P21", "P21", "X"]);
});

test("matched draft rows are marked with the created report", () => {
  const row = { groupId: "g", room: "P21", playerId: "1", rake: 1000, percent: 30, amount: 300, saved: true, ownerId: "tg_1897001087", createdAt: 1783868400000, entryAddedAt: 1783868400000 };
  const report = { authorId: "tg_1897001087", id: "new-report", createdAt: "2026-07-12T23:49:00.000Z" };
  const matched = _test.collectDraftRakebackRowsForReport({ rows: [row] }, { ...report, date: "12.07.2026" }, "tg_1897001087");

  const rows = _test.markDraftRakebackRowsReported(matched.draftRows, matched.matchedKeys, report);

  assert.equal(rows[0].accounted, true);
  assert.equal(rows[0].reportId, "new-report");
  assert.equal(rows[0].reportedAmount, 300);
});

test("a rakeback row created after an existing report is not attached to that old report", () => {
  const report = { authorId: "tg_1897001087", createdAt: "2026-07-20T00:33:50.578Z", date: "19.07.2026" };
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

 test("Anya report cannot receive submitted or draft rakeback", () => {
  const report = { authorId: "tg_2144406710", date: "04.10.2026", deposit: 91000, rakebackRows: [{ amount: 500 }] };
  assert.equal(_test.canReceiveReportRakeback(report), false);
  assert.equal(_test.canReceiveReportRakeback({ authorId: "tg_1897001087" }), true);
  assert.equal(_test.collectDraftRakebackRowsForReport({ rows: [{ saved: true, amount: 500 }] }, report, report.authorId).rows.length, 0);
  assert.equal(_test.shouldAttachRakebackRowToExistingReport({}, report), false);
  const result = _test.recalcReportTotalsFromRows(report);
  assert.equal(result.rakeback, 0);
  assert.deepEqual(result.rakebackRows, []);
  assert.equal(result.total, 91000);
});

test("Sunday reconciliation selects Vika even when Anya report is first", async () => {
  const previousFetch = global.fetch;
  const previousUrl = process.env.UPSTASH_REDIS_REST_URL;
  const previousToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  process.env.UPSTASH_REDIS_REST_URL = "https://redis.invalid";
  process.env.UPSTASH_REDIS_REST_TOKEN = "test";
  const reports = [
    { id: "anya", authorId: "tg_2144406710", date: "04.10.2026", rakeback: -7197, total: 100 },
    { id: "vika", authorId: "tg_1897001087", date: "04.10.2026", rakeback: 0, total: 200 },
    { id: "saturday", authorId: "tg_1897001087", date: "03.10.2026", rakeback: 200, total: 300 },
  ];
  const writes = [];
  global.fetch = async (url, options) => ({ ok: true, json: async () => JSON.parse(options.body).map(command => {
    if (command[0] === "LRANGE") return { result: reports.map(JSON.stringify) };
    if (command[0] === "LSET") writes.push(command);
    return { result: "OK" };
  }) });
  try {
    const result = await _test.reconcileClosingRakebackReport([{
      groupId: "g", room: "P21", playerId: "1", rake: 1000, percent: 50,
      amount: 500, saved: true, entryAddedAt: Date.parse("2026-10-04T12:00:00Z"),
    }], Date.parse("2026-09-28T03:00:00Z"));
    assert.equal(result.reportId, "vika");
    assert.equal(result.desired, 300);
    assert.equal(writes.length, 1);
    assert.equal(writes[0][2], "1");
    assert.equal(JSON.parse(writes[0][3]).total, 500);
  } finally {
    global.fetch = previousFetch;
    if (previousUrl == null) delete process.env.UPSTASH_REDIS_REST_URL; else process.env.UPSTASH_REDIS_REST_URL = previousUrl;
    if (previousToken == null) delete process.env.UPSTASH_REDIS_REST_TOKEN; else process.env.UPSTASH_REDIS_REST_TOKEN = previousToken;
  }
});
