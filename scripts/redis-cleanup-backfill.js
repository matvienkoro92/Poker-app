#!/usr/bin/env node
"use strict";

/**
 * Safe Redis cleanup/backfill helper for Upstash REST Redis.
 *
 * Default mode is dry-run. `--apply` writes only canonical/backfill data.
 * Destructive legacy deletion additionally requires `--delete-legacy`.
 */

const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../lib/redis");
const APPLY = process.argv.includes("--apply");
const DELETE_LEGACY = APPLY && process.argv.includes("--delete-legacy");
const JSON_OUT = process.argv.includes("--json");

const DT_IDS_KEY = "poker_app:visitor_dt_ids";
const ID_TO_USER_KEY = "poker_app:id_to_user";
const RESPECT_SCORE_KEY = "poker_app:respect_score";
const ROMAN_CHAT_PARTNERS_KEY = "poker_app:chat_partners:tg_388008256";
const ROMAN_LEGACY_ALIAS = "tg_roman";

function commandResult(row) {
  return row && Object.prototype.hasOwnProperty.call(row, "result") ? row.result : null;
}

function arrayPairs(raw) {
  if (Array.isArray(raw)) {
    const pairs = [];
    for (let i = 0; i < raw.length; i += 2) {
      pairs.push([String(raw[i] || ""), String(raw[i + 1] || "")]);
    }
    return pairs;
  }
  if (raw && typeof raw === "object") return Object.keys(raw).map((key) => [String(key), String(raw[key] || "")]);
  return [];
}

function legacyIdToDtId(value) {
  const raw = String(value || "").trim();
  if (/^ID\d{6}$/.test(raw)) return raw;
  const m = raw.match(/^(?:tg|vk|mail)_(ID\d{6})$/);
  return m ? m[1] : "";
}

function resolveLegacyRuntimeToDtId(field, dtByUser) {
  const raw = String(field || "").trim();
  return dtByUser[raw] || legacyIdToDtId(raw);
}

function planCommand(plans, kind, description, command, options) {
  plans.push({
    kind,
    description,
    command,
    destructive: !!(options && options.destructive),
  });
}

async function buildPlan() {
  const rows = await redisPipeline([
    ["HGETALL", DT_IDS_KEY],
    ["HGETALL", ID_TO_USER_KEY],
    ["HGETALL", RESPECT_SCORE_KEY],
    ["SMEMBERS", ROMAN_CHAT_PARTNERS_KEY],
  ]);
  const dtPairs = arrayPairs(commandResult(rows && rows[0]));
  const reversePairs = arrayPairs(commandResult(rows && rows[1]));
  const respectPairs = arrayPairs(commandResult(rows && rows[2]));
  const romanPartners = commandResult(rows && rows[3]);

  const dtByUser = {};
  const userByDt = {};
  dtPairs.forEach(([userId, dtId]) => {
    if (userId) dtByUser[userId] = dtId;
  });
  reversePairs.forEach(([dtId, userId]) => {
    if (dtId) userByDt[dtId] = userId;
  });

  const plans = [];

  dtPairs.forEach(([userId, dtId]) => {
    if (!/^ID\d{6}$/.test(dtId)) return;
    if (!userByDt[dtId]) {
      planCommand(
        plans,
        "identity",
        `Backfill missing ${ID_TO_USER_KEY} ${dtId} -> ${userId}`,
        ["HSET", ID_TO_USER_KEY, dtId, userId]
      );
    }
  });

  respectPairs.forEach(([field, scoreRaw]) => {
    if (!/^(tg|vk|mail)_/.test(field)) return;
    const targetDtId = resolveLegacyRuntimeToDtId(field, dtByUser);
    if (!/^ID\d{6}$/.test(targetDtId) || targetDtId === field) return;
    const score = parseInt(scoreRaw, 10);
    if (!Number.isFinite(score) || score === 0) return;
    planCommand(
      plans,
      "respect",
      `Backfill respect score ${field} -> ${targetDtId}`,
      ["HSETNX", RESPECT_SCORE_KEY, targetDtId, String(score)]
    );
    planCommand(
      plans,
      "respect",
      `Delete legacy respect score field ${field}`,
      ["HDEL", RESPECT_SCORE_KEY, field],
      { destructive: true }
    );
  });

  if (Array.isArray(romanPartners) && romanPartners.includes(ROMAN_LEGACY_ALIAS)) {
    planCommand(
      plans,
      "chat",
      `Remove legacy chat partner alias ${ROMAN_LEGACY_ALIAS}`,
      ["SREM", ROMAN_CHAT_PARTNERS_KEY, ROMAN_LEGACY_ALIAS],
      { destructive: true }
    );
  }

  return plans;
}

async function applyPlan(plans) {
  const commands = plans
    .filter((plan) => !plan.destructive || DELETE_LEGACY)
    .map((plan) => plan.command);
  if (!commands.length) return [];
  const results = await redisPipeline(commands);
  return commands.map((command, index) => ({
    command,
    result: commandResult(results && results[index]),
    error: results && results[index] && results[index].error ? results[index].error : null,
  }));
}

async function main() {
  if (!redisConfigured()) {
    console.log("Redis cleanup skipped: UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are not set.");
    return;
  }

  const plans = await buildPlan();
  const applied = APPLY ? await applyPlan(plans) : [];
  const report = {
    mode: APPLY ? (DELETE_LEGACY ? "apply-with-delete-legacy" : "apply") : "dry-run",
    generatedAt: new Date().toISOString(),
    planned: plans,
    applied,
  };

  if (JSON_OUT) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log(`Redis cleanup/backfill ${report.generatedAt}`);
  console.log(`Mode: ${report.mode}`);
  if (!plans.length) {
    console.log("Plan: nothing to do");
    return;
  }
  console.log("Plan:");
  plans.forEach((plan, idx) => {
    const suffix = plan.destructive ? " [delete-legacy]" : "";
    console.log(`${idx + 1}. ${plan.description}${suffix}`);
    console.log("   " + JSON.stringify(plan.command));
  });
  if (!APPLY) {
    console.log("\nDry-run only. Re-run with --apply to write backfills.");
    console.log("Legacy deletion requires --apply --delete-legacy.");
  } else {
    console.log(`\nApplied commands: ${applied.length}`);
  }
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
