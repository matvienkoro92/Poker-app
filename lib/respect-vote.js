"use strict";
const { pipeline } = require("./redis");
const SCRIPT = `-- respect_vote_v1
local current = redis.call('HGET', KEYS[2], ARGV[2])
local action = ARGV[3]
if action ~= 'up' and action ~= 'down' and action ~= 'withdraw' then return redis.error_reply('invalid_action') end
if action == current then return {action == 'up' and 'already_raised' or 'already_lowered'} end
if action == 'withdraw' and current ~= 'up' and current ~= 'down' then return {'no_vote'} end
if current and current ~= 'up' and current ~= 'down' then return redis.error_reply('invalid_vote') end
local raw = redis.call('HGET', KEYS[1], ARGV[1]) or '0'
local score = tonumber(raw)
if not string.match(raw, '^%-?%d+$') or not score or math.abs(score) > 9007199254740000 then return redis.error_reply('invalid_score') end
local before = current == 'up' and 1 or (current == 'down' and -1 or 0)
local after = action == 'up' and 1 or (action == 'down' and -1 or 0)
score = redis.call('HINCRBY', KEYS[1], ARGV[1], after - before)
if action == 'withdraw' then redis.call('HDEL', KEYS[2], ARGV[2])
else redis.call('HSET', KEYS[2], ARGV[2], action) end
return {'ok', score}`;
async function vote(scoreKey, votesKey, target, voter, action) {
  const rows = await pipeline([["EVAL", SCRIPT, "2", scoreKey, votesKey, target, voter, action]]);
  return rows ? rows[0].result : null;
}
module.exports = { vote, SCRIPT };
