#!/usr/bin/env node
"use strict";
// One explicitly selected thread, dry-run by default. Never deletes a legacy copy without a verified backup.
const fs = require("node:fs");
const crypto = require("node:crypto");
const { pipeline, isConfigured } = require("../lib/redis");
const { threadMessageIndexKey } = require("../lib/chat-storage");
const APPLY = `-- chat_history_recover_v1
local expected = cjson.decode(ARGV[1])
local legacy = cjson.decode(ARGV[2])
local merged = cjson.decode(ARGV[3])
if redis.call('LLEN', KEYS[1]) ~= #expected or redis.call('HLEN', KEYS[2]) * 2 ~= #legacy then return 0 end
for i, raw in ipairs(expected) do if redis.call('LINDEX', KEYS[1], i - 1) ~= raw then return 0 end end
for i = 1, #legacy, 2 do if redis.call('HGET', KEYS[2], legacy[i]) ~= legacy[i + 1] then return 0 end end
redis.call('DEL', KEYS[1])
for _, raw in ipairs(merged) do redis.call('RPUSH', KEYS[1], raw) end
redis.call('DEL', KEYS[2])
return 1`;
async function recover(thread, options = {}) {
  if (!/^(poker_app:chat_messages|poker_app:chat:[A-Za-z0-9_-]+|poker_app:chat_group_msgs:group_[A-Za-z0-9_]+)$/.test(thread)) throw Error("Specify one valid --thread Redis key");
  if (!isConfigured()) throw Error("Redis credentials are required");
  const run = commands => pipeline(commands, { context: "chat.history.recover", throwOnError: true });
  const index = threadMessageIndexKey(thread), list = [], pairs = new Map();
  let size = 0;
  const accountSize = raw => { size += Buffer.byteLength(raw); if (size > 32 * 1024 * 1024) throw Error("32 MB safety limit reached; no changes made"); };
  for (let offset = 0; ; offset += 40) {
    if (offset >= 10000) throw Error("History limit reached; no changes made");
    const batch = (await run([["LRANGE", thread, String(offset), String(offset + 39)]]))[0].result;
    batch.forEach(raw => { accountSize(raw); list.push(raw); });
    if (batch.length < 40) break;
  }
  let cursor = "0", pages = 0;
  do {
    if (++pages > 10000) throw Error("Index scan limit reached; no changes made");
    const r = (await run([["HSCAN", index, cursor, "COUNT", "40"]]))[0].result;
    cursor = String(r[0]);
    for (let i = 0; i < r[1].length; i += 2) { accountSize(r[1][i + 1]); pairs.set(r[1][i], r[1][i + 1]); }
  } while (cursor !== "0");
  const byId = new Map();
  function parse(raw) { const m = JSON.parse(raw); if (!m || !m.id || !Number.isFinite(Date.parse(m.time))) throw Error("Invalid message; recovery stopped"); return m; }
  for (const raw of list) { const m = parse(raw); if (byId.has(String(m.id))) throw Error("Duplicate live IDs; manual review required"); byId.set(String(m.id), {raw,m}); }
  let recovered = 0;
  for (const [id,raw] of pairs) { const m = parse(raw); if (String(m.id) !== id) throw Error("Index ID mismatch"); if (!byId.has(id)) { byId.set(id,{raw,m}); recovered++; } }
  const summary = {thread, mode: options.apply ? "apply" : "dry-run", currentMessages:list.length, legacyMessages:pairs.size, recoverableMessages:recovered};
  if (!options.apply) return summary;
  if (!options.backup) throw Error("--apply requires --backup PATH for an exclusive local backup");
  const backup = JSON.stringify({thread,list,index:[...pairs],createdAt:new Date().toISOString()});
  fs.writeFileSync(options.backup,backup,{flag:"wx",mode:0o600});
  if (crypto.createHash("sha256").update(fs.readFileSync(options.backup)).digest("hex") !== crypto.createHash("sha256").update(backup).digest("hex")) throw Error("Backup verification failed");
  const merged = [...byId.values()].sort((a,b)=>Date.parse(b.m.time)-Date.parse(a.m.time)||String(b.m.id).localeCompare(String(a.m.id))).map(x=>x.raw);
  const result = await run([["EVAL",APPLY,"2",thread,index,JSON.stringify(list),JSON.stringify([...pairs].flat()),JSON.stringify(merged)]]);
  if (Number(result[0].result)!==1) throw Error("Thread changed during recovery; nothing overwritten. Rerun dry-run.");
  return {...summary,backup:options.backup,totalMessages:merged.length};
}
if (require.main === module) {
  const arg = name => { const i=process.argv.indexOf(name); return i<0?"":process.argv[i+1]||""; };
  recover(arg("--thread"),{apply:process.argv.includes("--apply"),backup:arg("--backup")}).then(result=>console.log(JSON.stringify(result))).catch(e=>{console.error(e.message);process.exitCode=1;});
}
module.exports={recover,APPLY};
