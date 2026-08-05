#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function loadOptionalEnvFile(file) {
  if (!fs.existsSync(file)) return;
  fs.readFileSync(file, "utf8").split(/\r?\n/).forEach((line) => {
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

const redisBase = String(process.env.UPSTASH_REDIS_REST_URL).replace(/\/$/, "");
const nativeFetch = global.fetch;
let activeMetric = null;
global.fetch = async function measuredFetch(url, options) {
  const response = await nativeFetch(url, options);
  if (activeMetric && String(url || "").startsWith(redisBase)) {
    activeMetric.pipelineCalls += 1;
    try {
      const commands = JSON.parse(String(options && options.body || "[]"));
      activeMetric.redisCommands += Array.isArray(commands) ? commands.length : 1;
      (Array.isArray(commands) ? commands : []).forEach((command) => {
        const operation = String(command && command[0] || "UNKNOWN").toUpperCase();
        activeMetric.operations[operation] = (activeMetric.operations[operation] || 0) + 1;
      });
    } catch (_) {
      activeMetric.redisCommands += 1;
    }
    try {
      activeMetric.responseBytes += Buffer.byteLength(await response.clone().text());
    } catch (_) {}
  }
  return response;
};

const { pipeline: redisPipeline } = require("../lib/redis");
const { getBonusLedgerExpenseRangeSummary } = require("../lib/bonus-ledger");
const adminReports = require("../lib/api-handlers/admin-report-shifts")._test;
const { getRaffleCalculationSummary } = require("../lib/raffle-calculation-summary");

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
    { key: "current_week", from: currentWeekFrom, to: today, maxScanned: 1500, maxDailyKiB: 256 },
    { key: "last_week", from: addDays(lastWeekTo, -6), to: lastWeekTo, maxScanned: 2500, maxDailyKiB: 512 },
    { key: "current_month", from: today.slice(0, 8) + "01", to: today, maxScanned: 2500, maxDailyKiB: 512 },
    { key: "last_month", from: lastMonthTo.slice(0, 8) + "01", to: lastMonthTo, maxScanned: 5000, maxDailyKiB: 1024 },
  ];
}

async function measure(source, action) {
  const metric = { source, pipelineCalls: 0, redisCommands: 0, responseBytes: 0, operations: {}, elapsedMs: 0 };
  activeMetric = metric;
  const startedAt = Date.now();
  try {
    return { value: await action(), metric };
  } finally {
    metric.elapsedMs = Date.now() - startedAt;
    activeMetric = null;
  }
}

function number(value) {
  const parsed = Number(String(value == null ? "" : value).replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}
function extraTotal(report, matcher) {
  return (Array.isArray(report && report.extraFields) ? report.extraFields : []).reduce((sum, field) => {
    const name = String(field && (field.name != null ? field.name : field.extraName) || "").toLowerCase();
    return matcher.test(name) ? sum + number(field && (field.amount != null ? field.amount : field.extraAmount)) : sum;
  }, 0);
}
function reportTotals(reports) {
  return (reports || []).reduce((totals, report) => {
    totals.count += 1;
    totals.bonuses += number(report && report.bonuses);
    totals.rakeback += report && report.rakeback != null && report.rakeback !== ""
      ? number(report.rakeback)
      : (Array.isArray(report && report.rakebackRows) ? report.rakebackRows.reduce((sum, row) => sum + number(row && (row.reportedAmount != null ? row.reportedAmount : row.amount)), 0) : 0);
    totals.previousRakeback += extraTotal(report, /(?:рб|рейкбек).*прош|прош.*(?:рб|рейкбек)/i);
    totals.salary += extraTotal(report, /(?:зп|зарплат)/i);
    return totals;
  }, { count: 0, bonuses: 0, rakeback: 0, previousRakeback: 0, salary: 0 });
}
function metricRow(metric) {
  return {
    source: metric.source,
    commands: metric.redisCommands,
    pipelines: metric.pipelineCalls,
    responseKiB: Math.round(metric.responseBytes / 1024),
    elapsedMs: metric.elapsedMs,
    operations: Object.keys(metric.operations).sort().map((key) => key + ":" + metric.operations[key]).join(" "),
  };
}

(async () => {
  const selectedPeriods = periods(new Date());
  const failures = [];
  const sourceMetrics = [];
  const reportsRead = await measure("reports", () => redisPipeline([["LRANGE", "poker_app:admin_report_shifts", "0", "9999"]], {
    allowLargeRedisRead: true, context: "calculation-health.reports",
  }));
  sourceMetrics.push(metricRow(reportsRead.metric));
  const rawReports = reportsRead.value && reportsRead.value[0] && Array.isArray(reportsRead.value[0].result) ? reportsRead.value[0].result : [];
  const reports = rawReports.map((raw) => { try { return JSON.parse(String(raw)); } catch (_) { return null; } }).filter(Boolean);
  if (!reports.length) failures.push("reports: source returned no reports");

  const rakebackRead = await measure("rakeback_draft", () => redisPipeline([["GET", "poker_app:admin_report_rakeback_draft:shared"]], {
    allowLargeRedisRead: true, context: "calculation-health.rakeback",
  }));
  sourceMetrics.push(metricRow(rakebackRead.metric));
  let rakebackDraft = {};
  try { rakebackDraft = JSON.parse(String(rakebackRead.value && rakebackRead.value[0] && rakebackRead.value[0].result || "{}")); } catch (_) {}
  const rakebackRows = Array.isArray(rakebackDraft.rows) ? rakebackDraft.rows : [];
  if (!rakebackRows.length) failures.push("rakeback: source returned no rows");

  const resultRows = [];
  for (const period of selectedPeriods) {
    const scopedReports = adminReports.filterReportsByDateRange(reports, period.from, period.to) || [];
    const totals = reportTotals(scopedReports);
    const range = adminReports.calculationDateRangeMs(period.from, period.to);
    const poker21Rake = adminReports.rakebackRoomRakeForRange(rakebackRows, "P21", range.fromMs, range.toMs);

    const raffleRead = await measure("raffles:" + period.key, () => getRaffleCalculationSummary(period.from, period.to));
    sourceMetrics.push(metricRow(raffleRead.metric));
    const raffle = raffleRead.value || {};

    const dailyRead = await measure("daily:" + period.key, () => getBonusLedgerExpenseRangeSummary(5000, period.from, period.to, "Europe/Moscow", {
      diagnostics: true, bypassCache: true,
    }));
    sourceMetrics.push(metricRow(dailyRead.metric));
    const daily = dailyRead.value || {};
    const dailyDiagnostics = daily.diagnostics || {};
    const dailyKiB = Math.round(dailyRead.metric.responseBytes / 1024);
    resultRows.push({
      period: period.key,
      reports: totals.count,
      p21Rake: poker21Rake,
      rakeback: totals.rakeback,
      bonuses: totals.bonuses,
      previousRb: totals.previousRakeback,
      salary: totals.salary,
      raffleTickets: number(raffle.issuedTicketAmount),
      raffleCash: number(raffle.issuedCashAmount),
      raffleReturns: number(raffle.returnedTicketAmount) + number(raffle.returnedCashAmount),
      daily: number(daily.debitedDuringRange),
      dailyReturns: number(daily.returnedDuringRange),
    });
    if (!totals.count) failures.push(period.key + ": no reports in selected period");
    if (!Number.isFinite(poker21Rake) || poker21Rake < 0) failures.push(period.key + ": invalid Poker21 rake");
    if (dailyDiagnostics.scannedEntries <= 0 || dailyDiagnostics.scannedEntries > period.maxScanned) failures.push(period.key + ": daily scanned " + dailyDiagnostics.scannedEntries);
    if (dailyRead.metric.redisCommands > 45) failures.push(period.key + ": daily Redis commands " + dailyRead.metric.redisCommands + " > 45");
    if (dailyKiB > period.maxDailyKiB) failures.push(period.key + ": daily response " + dailyKiB + " KiB > " + period.maxDailyKiB + " KiB");
    if (raffleRead.metric.redisCommands > 80) failures.push(period.key + ": raffle Redis commands " + raffleRead.metric.redisCommands + " > 80");
    if (raffleRead.metric.elapsedMs > 15000 || dailyRead.metric.elapsedMs > 15000) failures.push(period.key + ": source exceeded 15s");
  }

  const totalCommands = sourceMetrics.reduce((sum, row) => sum + row.commands, 0);
  const totalKiB = sourceMetrics.reduce((sum, row) => sum + row.responseKiB, 0);
  if (reportsRead.metric.redisCommands > 2 || reportsRead.metric.elapsedMs > 10000) failures.push("reports: load is too heavy");
  if (rakebackRead.metric.redisCommands > 2 || rakebackRead.metric.elapsedMs > 10000) failures.push("rakeback: load is too heavy");
  if (totalCommands > 500) failures.push("page total Redis commands " + totalCommands + " > 500");
  if (totalKiB > 16384) failures.push("page total response " + totalKiB + " KiB > 16384 KiB");

  console.log("\nCalculation values");
  console.table(resultRows);
  console.log("\nRedis source impact");
  console.table(sourceMetrics);
  console.log("TOTAL commands=" + totalCommands + " responseKiB=" + totalKiB);
  if (failures.length) {
    failures.forEach((failure) => console.error("FAIL " + failure));
    process.exitCode = 1;
    return;
  }
  console.log("OK full calculation health check passed");
})().catch((error) => {
  console.error("calculation health check failed:", error && error.stack ? error.stack : error);
  process.exitCode = 1;
});
