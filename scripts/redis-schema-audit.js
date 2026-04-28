#!/usr/bin/env node

/**
 * Safe Redis schema audit for Upstash REST Redis.
 * This script is read-only: it scans known patterns, reports counts/types/samples,
 * and highlights likely legacy keys/fields for manual migration planning.
 */

const REDIS_URL = String(process.env.UPSTASH_REDIS_REST_URL || "").replace(/\/$/, "");
const REDIS_TOKEN = String(process.env.UPSTASH_REDIS_REST_TOKEN || "");

const PATTERNS = [
  "poker_app:visitor_dt_ids",
  "poker_app:id_to_user",
  "poker_app:visitor_usernames",
  "poker_app:visitor_chat_display_names",
  "poker_app:account_passwords",
  "poker_app:email_*",
  "poker_app:chat_messages",
  "poker_app:chat:*",
  "poker_app:chat_partners:*",
  "poker_app:chat_group_meta:*",
  "poker_app:chat_group_msgs:*",
  "poker_app:user_chat_groups:*",
  "poker_app:chat_thread_meta:*",
  "poker_app:chat_thread_msg_index:*",
  "poker_app:chat_thread_poll_gen",
  "poker_app:chat_seen_cursor",
  "poker_app:chat_general_seen",
  "poker_app:chat_unread:*",
  "poker_app:chat_general_unread",
  "poker_app:chat_online",
  "poker_app:chat_last_seen",
  "poker_app:chat_dm_focus:*",
  "poker_app:chat_typing:*",
  "poker_app:club_chat_*",
  "poker_app:general_chat_pinned",
  "poker_app:respect_score",
  "poker_app:respect_votes:*",
  "poker_app:friends:*",
  "poker_app:friend_alias:*",
  "poker_app:avatar:*",
  "poker_app:pokerplus*",
  "poker_app:chat_push_*",
  "poker_app:gazette*",
  "poker_app:track_links:*",
  "poker_app:pikhanina_claimed_count",
];

const MAX_SCAN_PER_PATTERN = 2000;
const SAMPLE_LIMIT = 8;

async function redisPipeline(commands) {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
  const res = await fetch(REDIS_URL + "/pipeline", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
  });
  if (!res.ok) {
    throw new Error(`Redis pipeline HTTP ${res.status}: ${await res.text().catch(() => "")}`);
  }
  return res.json();
}

function commandResult(row) {
  return row && Object.prototype.hasOwnProperty.call(row, "result") ? row.result : null;
}

async function scanPattern(pattern) {
  let cursor = "0";
  const keys = [];
  do {
    const rows = await redisPipeline([["SCAN", cursor, "MATCH", pattern, "COUNT", "200"]]);
    const result = commandResult(rows && rows[0]);
    if (!Array.isArray(result)) break;
    cursor = String(result[0] || "0");
    const batch = Array.isArray(result[1]) ? result[1] : [];
    for (const key of batch) {
      keys.push(String(key));
      if (keys.length >= MAX_SCAN_PER_PATTERN) return { keys, truncated: true };
    }
  } while (cursor !== "0");
  return { keys, truncated: false };
}

async function keyTypeAndSize(keys) {
  if (!keys.length) return {};
  const types = await redisPipeline(keys.map((key) => ["TYPE", key]));
  const typeByKey = {};
  keys.forEach((key, index) => {
    const raw = commandResult(types && types[index]);
    typeByKey[key] = typeof raw === "string" ? raw : raw && raw.ok ? raw.ok : String(raw || "unknown");
  });

  const sizeCommands = keys.map((key) => {
    const type = typeByKey[key];
    if (type === "hash") return ["HLEN", key];
    if (type === "set") return ["SCARD", key];
    if (type === "zset") return ["ZCARD", key];
    if (type === "list") return ["LLEN", key];
    if (type === "string") return ["STRLEN", key];
    return ["TTL", key];
  });
  const sizes = await redisPipeline(sizeCommands);
  const out = {};
  keys.forEach((key, index) => {
    out[key] = {
      type: typeByKey[key],
      size: commandResult(sizes && sizes[index]),
    };
  });
  return out;
}

async function inspectLegacyFields() {
  const findings = [];

  const rows = await redisPipeline([
    ["HGETALL", "poker_app:visitor_dt_ids"],
    ["HGETALL", "poker_app:id_to_user"],
    ["HGETALL", "poker_app:respect_score"],
    ["SMEMBERS", "poker_app:chat_partners:tg_388008256"],
  ]);
  const dtRaw = commandResult(rows && rows[0]);
  const reverseRaw = commandResult(rows && rows[1]);
  const respectRaw = commandResult(rows && rows[2]);
  const romanPartners = commandResult(rows && rows[3]);

  const dtPairs = arrayPairs(dtRaw);
  const reversePairs = arrayPairs(reverseRaw);
  const reverseDtIds = new Set(reversePairs.map(([dtId]) => dtId));

  for (const [userId, dtId] of dtPairs) {
    if (!/^ID\d{6}$/.test(dtId)) {
      findings.push({ kind: "identity", key: "poker_app:visitor_dt_ids", field: userId, issue: `non-standard dtId ${dtId}` });
    }
    if (/^(tg|vk)_ID\d{6}$/.test(userId) || /^mail_ID\d{6}$/.test(userId)) {
      findings.push({ kind: "identity", key: "poker_app:visitor_dt_ids", field: userId, issue: "legacy ID-prefixed runtime id" });
    }
    if (/^ID\d{6}$/.test(dtId) && !reverseDtIds.has(dtId)) {
      findings.push({ kind: "identity", key: "poker_app:id_to_user", field: dtId, issue: "missing reverse mapping" });
    }
  }

  for (const [field] of arrayPairs(respectRaw)) {
    if (/^(tg|vk|mail)_/.test(field)) {
      findings.push({ kind: "respect", key: "poker_app:respect_score", field, issue: "runtime-id score should migrate to dtId" });
    }
  }

  if (Array.isArray(romanPartners) && romanPartners.includes("tg_roman")) {
    findings.push({ kind: "chat", key: "poker_app:chat_partners:tg_388008256", field: "tg_roman", issue: "legacy Roman alias" });
  }

  return findings;
}

function arrayPairs(raw) {
  if (Array.isArray(raw)) {
    const pairs = [];
    for (let i = 0; i < raw.length; i += 2) pairs.push([String(raw[i] || ""), String(raw[i + 1] || "")]);
    return pairs;
  }
  if (raw && typeof raw === "object") return Object.keys(raw).map((key) => [String(key), String(raw[key] || "")]);
  return [];
}

async function main() {
  if (!REDIS_URL || !REDIS_TOKEN) {
    console.log("Redis audit skipped: UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are not set.");
    return;
  }

  const report = {
    generatedAt: new Date().toISOString(),
    patterns: [],
    findings: [],
  };

  for (const pattern of PATTERNS) {
    const scan = await scanPattern(pattern);
    const sample = scan.keys.slice(0, SAMPLE_LIMIT);
    const meta = await keyTypeAndSize(sample);
    report.patterns.push({
      pattern,
      count: scan.keys.length,
      truncated: scan.truncated,
      sample: sample.map((key) => ({ key, type: meta[key] && meta[key].type, size: meta[key] && meta[key].size })),
    });
  }

  report.findings = await inspectLegacyFields();

  if (process.argv.includes("--json")) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log(`Redis schema audit ${report.generatedAt}`);
  for (const row of report.patterns) {
    const suffix = row.truncated ? " (truncated)" : "";
    console.log(`- ${row.pattern}: ${row.count}${suffix}`);
    row.sample.forEach((item) => {
      console.log(`  ${item.key} [${item.type || "unknown"} size=${item.size == null ? "?" : item.size}]`);
    });
  }
  if (report.findings.length) {
    console.log("\nFindings:");
    report.findings.forEach((f) => {
      console.log(`- ${f.kind}: ${f.key} ${f.field ? `field=${f.field} ` : ""}${f.issue}`);
    });
  } else {
    console.log("\nFindings: none");
  }
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
