#!/usr/bin/env node

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const PRESET_AVATAR_IDS = [
  "tiger",
  "raccoon",
  "skull",
  "phoenix",
  "octopus",
  "cat",
  "robot",
  "bulldog",
  "fox",
  "chip",
  "koala",
  "raven",
  "crocodile",
  "rabbit",
  "chameleon",
  "panda",
  "wolf",
  "owl",
  "bat",
  "gorilla",
];

function usage() {
  console.log(
    [
      "Usage:",
      "  node scripts/assign-random-preset-avatars.js          # dry run",
      "  node scripts/assign-random-preset-avatars.js --apply  # write missing avatars",
    ].join("\n")
  );
}

function sanitizeRedisId(id) {
  return String(id || "").replace(/[^a-zA-Z0-9_-]/g, "_");
}

function avatarKey(id) {
  return "poker_app:avatar:" + sanitizeRedisId(id);
}

function parseHash(raw) {
  const out = {};
  if (Array.isArray(raw)) {
    for (let i = 0; i < raw.length; i += 2) {
      const key = raw[i] != null ? String(raw[i]).trim() : "";
      const value = raw[i + 1] != null ? String(raw[i + 1]).trim() : "";
      if (key && value) out[key] = value;
    }
  } else if (raw && typeof raw === "object") {
    for (const key of Object.keys(raw)) {
      const value = raw[key] != null ? String(raw[key]).trim() : "";
      if (key && value) out[String(key).trim()] = value;
    }
  }
  return out;
}

function isStoredAvatar(value) {
  const s = value != null ? String(value).trim() : "";
  return !!(s && (s.startsWith("preset:") || s.startsWith("data:")));
}

function accountIdForUserId(userId, dtIds) {
  const id = userId != null ? String(userId).trim() : "";
  if (!id) return "";
  if (/^ID\d{6}$/.test(id) || id.startsWith("guest_")) return id;
  if (/^(tg|vk)_ID\d{6}$/.test(id)) return id.slice(3);
  if (/^mail_ID\d{6}$/.test(id)) return id.slice(5);
  return dtIds[id] || id;
}

function deterministicPreset(accountId) {
  let hash = 0;
  const s = String(accountId || "");
  for (let i = 0; i < s.length; i += 1) {
    hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
  }
  return PRESET_AVATAR_IDS[hash % PRESET_AVATAR_IDS.length] || PRESET_AVATAR_IDS[0];
}

async function redisPipeline(commands) {
  if (!REDIS_URL || !REDIS_TOKEN) {
    throw new Error("Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN");
  }
  if (!commands.length) return [];
  const base = String(REDIS_URL).replace(/\/$/, "");
  const res = await fetch(base + "/pipeline", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error("Redis pipeline failed: HTTP " + res.status + (text ? " " + text.slice(0, 200) : ""));
  }
  return res.json();
}

async function main() {
  const args = process.argv.slice(2);
  const apply = args.includes("--apply");
  if (args.includes("--help") || args.includes("-h")) {
    usage();
    return;
  }

  const seed = await redisPipeline([
    ["SMEMBERS", "poker_app:visitors"],
    ["SMEMBERS", "poker_app:chat_users"],
    ["HGETALL", "poker_app:visitor_dt_ids"],
    ["HGETALL", "poker_app:id_to_user"],
  ]);

  const visitors = Array.isArray(seed[0] && seed[0].result) ? seed[0].result.map(String) : [];
  const chatUsers = Array.isArray(seed[1] && seed[1].result) ? seed[1].result.map(String) : [];
  const dtIds = parseHash(seed[2] && seed[2].result);
  const idToUser = parseHash(seed[3] && seed[3].result);

  const rawIds = new Set([...visitors, ...chatUsers, ...Object.keys(dtIds), ...Object.values(idToUser), ...Object.keys(idToUser)]);
  const accounts = new Set();
  for (const rawId of rawIds) {
    const accountId = accountIdForUserId(rawId, dtIds);
    if (accountId) accounts.add(accountId);
  }

  const accountList = [...accounts].sort();
  const checks = [];
  for (const accountId of accountList) {
    checks.push(["GET", avatarKey(accountId)]);
  }
  const checked = await redisPipeline(checks);

  const missing = [];
  const existing = [];
  for (let i = 0; i < accountList.length; i += 1) {
    const accountId = accountList[i];
    const current = checked[i] && checked[i].result != null ? String(checked[i].result) : "";
    if (isStoredAvatar(current)) existing.push(accountId);
    else missing.push(accountId);
  }

  const assignments = missing.map((accountId) => ({
    accountId,
    avatarId: deterministicPreset(accountId),
    key: avatarKey(accountId),
  }));

  console.log(
    JSON.stringify(
      {
        mode: apply ? "apply" : "dry-run",
        visitors: visitors.length,
        chatUsers: chatUsers.length,
        accounts: accountList.length,
        existingAvatars: existing.length,
        missingAvatars: missing.length,
        presetCount: PRESET_AVATAR_IDS.length,
        sampleAssignments: assignments.slice(0, 20),
      },
      null,
      2
    )
  );

  if (!apply || assignments.length === 0) return;

  const commands = assignments.map((row) => ["SET", row.key, "preset:" + row.avatarId]);
  const batchSize = 100;
  let written = 0;
  for (let i = 0; i < commands.length; i += batchSize) {
    const batch = commands.slice(i, i + batchSize);
    const res = await redisPipeline(batch);
    written += res.filter((x) => x && x.result != null).length;
  }
  console.log(JSON.stringify({ ok: true, written }, null, 2));
}

main().catch((err) => {
  console.error(err && err.message ? err.message : err);
  process.exit(1);
});
