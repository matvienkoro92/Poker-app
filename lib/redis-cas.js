"use strict";

const { pipeline } = require("./redis");

// A conflict is distinct from a storage failure. Never retry an ambiguous write:
// the first request may already have committed before its response was lost.
const STRING_CAS = `-- poker_string_cas_v1
local current = redis.call('GET', KEYS[1])
if (ARGV[1] == '0' and current) or (ARGV[1] == '1' and current ~= ARGV[2]) then return 0 end
local commands = cjson.decode(ARGV[4])
local kinds = {HINCRBY='hash', LPUSH='list', LTRIM='list', DEL='any'}
for _, cmd in ipairs(commands) do
  local expected = kinds[cmd[1]]
  if not expected then return redis.error_reply('Unsupported CAS command') end
  local actual = redis.call('TYPE', cmd[2])
  if type(actual) == 'table' then actual = actual.ok end
  if expected ~= 'any' and actual ~= 'none' and actual ~= expected then return redis.error_reply('Wrong CAS key type') end
  if cmd[1] == 'LTRIM' and (not tonumber(cmd[3]) or not tonumber(cmd[4])) then return redis.error_reply('Invalid trim bounds') end
end
for _, cmd in ipairs(commands) do
  if cmd[1] == 'HINCRBY' then
    local v = redis.call('HGET', cmd[2], cmd[3])
    if v and (not string.match(v, '^%-?%d+$') or not tonumber(v) or math.abs(tonumber(v)) > 9007199254740000) then
      return redis.error_reply('Invalid deal counter')
    end
  end
end
for _, cmd in ipairs(commands) do redis.call(unpack(cmd)) end
redis.call('SET', KEYS[1], ARGV[3])
return 1`;

const HASH_CAS = `-- poker_hash_cas_v1
if redis.call('GET', KEYS[2]) ~= ARGV[1] then return 0 end
local expected = cjson.decode(ARGV[2])
if redis.call('HLEN', KEYS[1]) * 2 ~= #expected then return 0 end
for i = 1, #expected, 2 do
  if redis.call('HGET', KEYS[1], expected[i]) ~= expected[i + 1] then return 0 end
end
redis.call('HSET', KEYS[1], ARGV[3], ARGV[4])
return 1`;

async function compareAndSet(key, expected, value, commands = []) {
  const rows = await pipeline([["EVAL", STRING_CAS, "1", key,
    expected == null ? "0" : "1", expected == null ? "" : String(expected), value, JSON.stringify(commands)]],
  { context: "redis.cas" });
  if (!rows) return null;
  return Number(rows[0].result) === 1;
}

async function compareHashAndSet(key, eventKey, eventRaw, pairs, field, value) {
  if (!Array.isArray(pairs) || eventRaw == null) return null;
  const rows = await pipeline([["EVAL", HASH_CAS, "2", key, eventKey,
    eventRaw, JSON.stringify(pairs), field, value]], { context: "redis.hash-cas" });
  if (!rows) return null;
  return Number(rows[0].result) === 1;
}

module.exports = { compareAndSet, compareHashAndSet, STRING_CAS, HASH_CAS };
