"use strict";

const { pipeline } = require("./redis");

// All commands are built by server code. Preflight types and integer operands before
// the first write: Redis scripts isolate execution, but do not roll back runtime errors.
const ATOMIC_WRITE_SCRIPT = `-- guarded-write-v1
local commands = cjson.decode(ARGV[1])
local locks = cjson.decode(ARGV[2])
local balances = cjson.decode(ARGV[3])
local totalKey = ARGV[4]
local balanceKey = ARGV[5]
local guards = cjson.decode(ARGV[6] or '[]')
local types = {DEL='any', HDEL='hash', HSETNX='hash', SET='string', HSET='hash', HINCRBY='hash', INCR='string', INCRBY='string', SADD='set', SREM='set', LPUSH='list', LTRIM='list'}
local numbers = {}
local function kind(key)
  local t = redis.call('TYPE', key)
  if type(t) == 'table' then return t.ok end
  return t
end
local function integer(value)
  local n = tonumber(value)
  if not n or n ~= math.floor(n) or math.abs(n) > 9007199254740991 then error('invalid_integer') end
  return n
end
for _, guard in ipairs(guards) do
  local current
  if guard.field then current = redis.call('HGET', guard.key, guard.field) else current = redis.call('GET', guard.key) end
  if (current or '') ~= guard.value then return redis.error_reply('value_changed') end
end
for _, lock in ipairs(locks) do
  if redis.call('get', lock.key) ~= lock.value then return redis.error_reply('lock_expired') end
end
for _, balance in ipairs(balances) do
  local current = redis.call('HGET', balance.key, balance.userId) or '0'
  if integer(current) ~= integer(balance.value) then return redis.error_reply('balance_changed') end
end
for _, cmd in ipairs(commands) do
  local expected = types[cmd[1]]
  if not expected then return redis.error_reply('unsupported_atomic_command') end
  local actual = kind(cmd[2])
  if expected ~= 'any' and actual ~= 'none' and actual ~= expected then return redis.error_reply('wrong_key_type') end
end
local initialTotal = nil
if totalKey ~= '' and redis.call('EXISTS', totalKey) == 0 then
  local pairs = redis.call('HGETALL', balanceKey)
  initialTotal = 0
  for i = 2, #pairs, 2 do initialTotal = integer(initialTotal + integer(pairs[i])) end
  numbers[totalKey] = initialTotal
end
for _, cmd in ipairs(commands) do
  if cmd[1] == 'INCR' or cmd[1] == 'INCRBY' or cmd[1] == 'HINCRBY' then
    local field = cmd[1] == 'HINCRBY' and cmd[3] or nil
    local id = field and (cmd[2] .. '\\n' .. field) or cmd[2]
    local current = numbers[id]
    if current == nil then
      if field then current = redis.call('HGET', cmd[2], field) or '0'
      else current = redis.call('GET', cmd[2]) or '0' end
    end
    local delta = cmd[1] == 'INCR' and 1 or integer(cmd[field and 4 or 3])
    numbers[id] = integer(integer(current) + delta)
  elseif cmd[1] == 'LTRIM' then
    integer(cmd[3]); integer(cmd[4])
  end
end
if initialTotal then redis.call('SET', totalKey, tostring(initialTotal)) end
for _, cmd in ipairs(commands) do redis.call(unpack(cmd)) end
return 1`;

async function atomicWrite(commands, options) {
  const opts = options || {};
  const locks = (opts.locks || []).filter(Boolean);
  const balances = opts.balances || [];
  const keys = [...new Set(commands.map((cmd) => cmd[1]).concat(locks.map((lock) => lock.key), balances.map((balance) => balance.key), (opts.values || []).map(value => value.key), [opts.totalKey, opts.balanceKey]).filter(Boolean))];
  const rows = await pipeline([["EVAL", ATOMIC_WRITE_SCRIPT, String(keys.length), ...keys,
    JSON.stringify(commands), JSON.stringify(locks), JSON.stringify(balances), opts.totalKey || "", opts.balanceKey || "", JSON.stringify(opts.values || []),
  ]], { context: opts.context || "redis.atomic-write", throwOnError: true });
  if (!rows || !rows[0] || rows[0].result !== 1) throw new Error("atomic_write_failed");
  return true;
}

module.exports = { atomicWrite, ATOMIC_WRITE_SCRIPT };
