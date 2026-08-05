#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function loadOptionalEnvFile(file) {
  if (!fs.existsSync(file)) return;
  const text = fs.readFileSync(file, "utf8");
  text.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)=(.*)\s*$/);
    if (!match || process.env[match[1]]) return;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    process.env[match[1]] = value;
  });
}

loadOptionalEnvFile(path.join(__dirname, "..", ".vercel", ".env.preview.local"));

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  console.error("calculation health check: Redis credentials are missing");
  process.exit(2);
}

const { getBonusLedgerExpenseRangeSummary } = require("../lib/bonus-ledger");

const DAY_MS = 86400000;
function businessDateKey(now) {
  return new Date(now.getTime() + 3 * 3600000 - 6 * 3600000).toISOString().slice(0, 10);
}
function addDays(key, days) {
  return new Date(Date.parse(key + "T00:00:00.000Z") + days * DAY_MS).toISOString().slice(0, 10);
}
function periods(now) {
  const today = businessDateKey(now);
  const weekday = new Date(today + "T00:00:00.000Z").getUTCDay() || 7;
  const currentWeekFrom = addDays(today, -weekday + 1);
  const lastWeekTo = addDays(currentWeekFrom, -1);
  const lastMonthTo = new Date(Date.UTC(Number(today.slice(0, 4)), Number(today.slice(5, 7)) - 1, 0)).toISOString().slice(0, 10);
  return [
    { key: "current_week", from: currentWeekFrom, to: today, maxScanned: 1500, maxResponseKiB: 256 },
    { key: "last_week", from: addDays(lastWeekTo, -6), to: lastWeekTo, maxScanned: 2500, maxResponseKiB: 512 },
    { key: "current_month", from: today.slice(0, 8) + "01", to: today, maxScanned: 2500, maxResponseKiB: 512 },
    { key: "last_month", from: lastMonthTo.slice(0, 8) + "01", to: lastMonthTo, maxScanned: 5000, maxResponseKiB: 1024 },
  ];
}

(async () => {
  const rows = [];
  const failures = [];
  for (const period of periods(new Date())) {
    const startedAt = Date.now();
    const summary = await getBonusLedgerExpenseRangeSummary(5000, period.from, period.to, "Europe/Moscow", {
      diagnostics: true,
      bypassCache: true,
    });
    const elapsedMs = Date.now() - startedAt;
    const diagnostics = summary.diagnostics || {};
    const row = {
      period: period.key,
      range: period.from + ".." + period.to,
      debited: summary.debitedDuringRange,
      returned: summary.returnedDuringRange,
      scanned: diagnostics.scannedEntries,
      matchedDebits: diagnostics.matchedDebits,
      redisCommands: diagnostics.redisCommands,
      responseKiB: Math.round((Number(diagnostics.responseBytes) || 0) / 1024),
      elapsedMs,
    };
    rows.push(row);
    if (!Number.isFinite(row.debited) || row.debited < 0 || !Number.isFinite(row.returned) || row.returned < 0) failures.push(period.key + ": invalid totals");
    if (row.scanned <= 0) failures.push(period.key + ": ledger source returned no entries");
    if (row.scanned > period.maxScanned) failures.push(period.key + ": scanned " + row.scanned + " > " + period.maxScanned);
    if (row.redisCommands > 45) failures.push(period.key + ": Redis commands " + row.redisCommands + " > 45");
    if (row.responseKiB > period.maxResponseKiB) failures.push(period.key + ": response " + row.responseKiB + " KiB > " + period.maxResponseKiB + " KiB");
    if (elapsedMs > 15000) failures.push(period.key + ": elapsed " + elapsedMs + "ms > 15000ms");
  }
  console.table(rows);
  if (failures.length) {
    failures.forEach((failure) => console.error("FAIL " + failure));
    process.exitCode = 1;
    return;
  }
  console.log("OK calculation Redis health check passed");
})().catch((error) => {
  console.error("calculation health check failed:", error && error.message ? error.message : error);
  process.exitCode = 1;
});
