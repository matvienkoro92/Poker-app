'use strict';

// One shared sequence counts actual starts of free tournaments, including
// tournaments the player never tried to enter.
const SCRIPT = `
local operation = ARGV[1]
local started = tonumber(redis.call('GET', KEYS[1]) or '0')
local function player(id)
  local raw = redis.call('HGET', KEYS[2], id)
  return raw and cjson.decode(raw) or { strikes = 0, untilStart = 0 }
end
if operation == 'remaining' then
  return math.max(0, player(ARGV[2]).untilStart - started)
end
local previous = redis.call('GET', KEYS[3])
if previous then return previous end
local ids = cjson.decode(ARGV[2])
if operation == 'miss' then
  for _, id in ipairs(ids) do
    local state = player(id)
    if state.untilStart <= started then
      state.strikes = state.strikes + 1
      if state.strikes >= 2 then
        state.strikes = 0
        state.untilStart = started + 3
      end
      redis.call('HSET', KEYS[2], id, cjson.encode(state))
    end
  end
  redis.call('SET', KEYS[3], '1', 'EX', ARGV[3])
  return '1'
end
local excluded = {}
for _, id in ipairs(ids) do
  if player(id).untilStart > started then table.insert(excluded, id) end
end
if #ids - #excluded >= 2 then redis.call('INCR', KEYS[1]) end
local result = #excluded == 0 and '[]' or cjson.encode(excluded)
redis.call('SET', KEYS[3], result, 'EX', ARGV[3])
return result
`;

module.exports = function createAttendance(commands, prefix) {
  const key = prefix + 'attendance:';
  const run = async (operation, event, value) => {
    const [result] = await commands([['EVAL', SCRIPT, 3, key + 'starts', key + 'players',
      key + operation + ':' + event, operation, value, '5184000']], 'attendance-' + operation);
    return result;
  };
  return {
    async remaining(accountId) { return Number(await run('remaining', '', accountId)); },
    async recordMiss(tournamentId, accounts) { await run('miss', tournamentId, JSON.stringify(accounts)); },
    async start(tournamentId, accounts) { return JSON.parse(await run('start', tournamentId, JSON.stringify(accounts))); }
  };
};
