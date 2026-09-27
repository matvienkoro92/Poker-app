"use strict";

const { createHash } = require("node:crypto");
const { AsyncLocalStorage } = require("node:async_hooks");
const { pipeline: rawPipeline } = require("./redis");
const scope = new AsyncLocalStorage();
const REPORTS = "poker_app:admin_report_shifts";
const SCRIPT = `-- report_transaction_v1
local snapshots = cjson.decode(ARGV[1])
local commands = cjson.decode(ARGV[2])
for _, item in ipairs(snapshots) do
  if item.kind == 'list' then
    if redis.call('LLEN', item.key) ~= #item.hashes then return 0 end
    local current = {}
    if #item.hashes > 0 then current = redis.call('LRANGE', item.key, 0, #item.hashes - 1) end
    for i, value in ipairs(current) do if redis.sha1hex(value) ~= item.hashes[i] then return 0 end end
  else
    local current = redis.call('GET', item.key)
    if item.exists then
      if not current or redis.sha1hex(current) ~= item.hash then return 0 end
    elseif current then return 0 end
  end
end
-- Commands are generated and simulated by the server before this script is called.
for _, command in ipairs(commands) do redis.call(unpack(command)) end
return 1`;

function core(key) {
  return key === REPORTS || /^poker_app:admin_report_rakeback_draft:[^:]+(?::meta)?$/.test(key) || key.startsWith("poker_app:admin_report_request:");
}
function failure(status = 503) {
  return Object.assign(new Error(status === 409
    ? "Данные изменились в другом запросе. Обновите раздел и повторите сохранение."
    : "Не удалось подтвердить сохранение. Обновите раздел перед повторной попыткой."), { status });
}
async function snapshot(tx, key) {
  if (tx.values.has(key)) return tx.values.get(key);
  const kind = key === REPORTS ? "list" : "string";
  const result = await rawPipeline([[kind === "list" ? "LRANGE" : "GET", key, ...(kind === "list" ? ["0", "500"] : [])]], { throwOnError: true });
  const value = result[0].result;
  if (kind === "list" && (!Array.isArray(value) || value.length > 500)) throw failure();
  // Corruption must never be interpreted as an empty draft or collection.
  if (kind === "string" && value != null) {
    try { if (!JSON.parse(value) || typeof JSON.parse(value) !== "object") throw failure(); }
    catch (_) { throw failure(); }
  }
  // Compare digests atomically instead of sending the entire archive twice.
  // The original values remain local for simulating commands.
  const digest = text => createHash("sha1").update(text).digest("hex");
  tx.snapshots.push(kind === "list"
    ? { key, kind, hashes: value.map(digest) }
    : { key, kind, exists: value != null, hash: value == null ? "" : digest(value) });
  const state = { kind, value: Array.isArray(value) ? value.slice() : value };
  tx.values.set(key, state);
  return state;
}
function range(list, start, end) {
  start = Number(start); end = Number(end);
  if (start < 0) start = Math.max(0, list.length + start);
  if (end < 0) end = list.length + end;
  return end < start ? [] : list.slice(start, end + 1);
}
async function pipeline(commands, options) {
  const tx = scope.getStore();
  if (!tx) return rawPipeline(commands, options);
  // Keep unrelated reads batched, including profile lookups and optional caches.
  if (commands.every((cmd) => !core(String(cmd[1])))) {
    if (commands.every((cmd) => ["SET", "DEL"].includes(String(cmd[0])))) {
      tx.after.push(() => rawPipeline(commands, options));
      return commands.map((cmd) => ({ result: cmd[0] === "SET" ? "OK" : 0 }));
    }
    if (commands.every((cmd) => !["SET", "DEL"].includes(String(cmd[0])))) return rawPipeline(commands, options);
  }
  const rows = [];
  for (const input of commands) {
    const cmd = input.map(String), [op, key] = cmd;
    if (!core(key)) {
      if (["SET", "DEL"].includes(op)) { tx.after.push(() => rawPipeline([cmd], options)); rows.push({ result: "OK" }); }
      else { const result = await rawPipeline([cmd], options); if (!result) throw failure(); rows.push(result[0]); }
      continue;
    }
    const state = await snapshot(tx, key);
    let result;
    if (op === "GET") result = state.value;
    else if (op === "LRANGE") result = range(state.value || [], cmd[2], cmd[3]);
    else {
      if (op === "SET" && state.kind === "string" && cmd.length === 3) { state.value = cmd[2]; result = "OK"; }
      else if (op === "DEL" && cmd.length === 2) { result = state.value == null ? 0 : 1; state.value = state.kind === "list" ? [] : null; }
      else if (op === "LPUSH" || op === "RPUSH") { state.value ||= []; for (const value of cmd.slice(2)) state.value[op === "LPUSH" ? "unshift" : "push"](value); result = state.value.length; }
      else if (op === "LTRIM") { state.value = range(state.value || [], cmd[2], cmd[3]); result = "OK"; }
      else if (op === "LSET" && Number.isInteger(Number(cmd[2])) && Number(cmd[2]) >= 0 && Number(cmd[2]) < state.value.length) { state.value[Number(cmd[2])] = cmd[3]; result = "OK"; }
      else if (op === "LREM" && cmd[2] === "1") { const i = state.value.indexOf(cmd[3]); result = i < 0 ? 0 : 1; if (i >= 0) state.value.splice(i, 1); }
      else throw failure();
      tx.commands.push(cmd);
    }
    rows.push({ result });
  }
  return rows;
}
function afterCommit(work) {
  const tx = scope.getStore();
  if (!tx) return work();
  const result = {};
  tx.after.push(async () => Object.assign(result, await work()));
  return result;
}
async function run(work) {
  const tx = { snapshots: [], values: new Map(), commands: [], after: [] };
  return scope.run(tx, async () => {
    const result = await work();
    if (result.status >= 400) return result;
    if (tx.commands.length) {
      // Carry-forward and the user's edit can SET the same archive in one
      // transaction. Only the final value needs to cross the wire.
      const lastStringWrite = new Map();
      tx.commands.forEach((cmd, index) => {
        if (tx.values.get(cmd[1]).kind === "string") lastStringWrite.set(cmd[1], index);
      });
      const commands = tx.commands.filter((cmd, index) =>
        !lastStringWrite.has(cmd[1]) || lastStringWrite.get(cmd[1]) === index);
      const keys = tx.snapshots.map((item) => item.key);
      const rows = await rawPipeline([["EVAL", SCRIPT, String(keys.length), ...keys, JSON.stringify(tx.snapshots), JSON.stringify(commands)]]);
      if (!rows) throw failure();
      if (rows[0].result !== 1) throw failure(409);
    }
    result.committed = tx.commands.length > 0;
    for (const effect of tx.after) await effect();
    return result;
  });
}
module.exports = { pipeline, run, afterCommit, SCRIPT };
