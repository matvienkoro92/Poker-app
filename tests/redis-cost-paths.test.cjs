'use strict';

const assert = require('node:assert/strict');
const {test} = require('node:test');
const {lua, lauxlib, lualib, to_luastring, to_jsstring} = require('fengari');

function checkLua(source) {
  const state = lauxlib.luaL_newstate();
  lualib.luaL_openlibs(state);
  try {
    const status = lauxlib.luaL_dostring(state, to_luastring(source));
    assert.equal(status, lua.LUA_OK, status === lua.LUA_OK ? '' : to_jsstring(lua.lua_tostring(state, -1)));
  } finally {
    lua.lua_close(state);
  }
}

test('review badge reads one Redis result and preserves the existing unread semantics', async t => {
  const social = require('../lib/club-social');
  const commands = [];
  t.mock.method(social, 'redis', async rows => {
    commands.push(...rows);
    return [1];
  });
  const reviews = require('../lib/club-reviews');
  assert.equal(await reviews.unreadCount('me'), 1);
  assert.equal(commands.length, 1);
  const [operation, script] = commands[0];
  assert.equal(operation, 'EVAL');
  checkLua(`
local data = {
  unread={type='hand',authorId='other',replies={{authorId='me'},{authorId='other'}}},
  own={type='hand',authorId='me',replies={{authorId='other'}}},
  seen={type='hand',authorId='other',authors={other=1}},
  compactUnread={type='hand',authorId='other',authors={other=2,me=3}},
  removed={type='hand',authorId='other',replies={{authorId='other',deleted=true}}},
  question={type='question',authorId='other',replies={{authorId='other'}}},
}
KEYS={'all','seen','compact'}; ARGV={'me','thread:'}
cjson={decode=function(raw) return data[raw] end}
redis={call=function(cmd,key,start,stop)
  if cmd=='ZREVRANGE' then assert(start==0 and stop==19); return {'unread','own','seen','removed','question','compactUnread'} end
  if cmd=='GET' then return key:sub(8) end
  if cmd=='HGET' then
    if key=='compact' and (start=='seen' or start=='compactUnread') then return start end
    if key=='seen' and (start=='seen' or start=='compactUnread') then return '1' end
    return false
  end
  error(cmd)
end}
assert(assert(load(${JSON.stringify(script)}))()==2)`);
});

test('nards cron backfills pending tournaments once and skips the settled archive thereafter', async t => {
  const boardGames = require('../lib/board-games-service');
  let activeScript;
  t.mock.method(boardGames, 'commands', async rows => {
    assert.equal(rows.length, 1);
    assert.equal(rows[0][0], 'EVAL');
    activeScript = rows[0][1];
    return [[]];
  });
  assert.deepEqual(await require('../lib/nards-tournament-runtime').runtime().sweep(), {advanced:0});
  checkLua(`
local initialized=false
local scanned=0
local active={}
local data={
  live={status='running',paymentsSettled=false},
  archived={status='completed',paymentsSettled=true,notices={result={sent=true}}},
  unpaid={status='completed',paymentsSettled=false},
  retry={status='cancelled',paymentsSettled=true,notices={result={sent=false}}},
}
KEYS={'marker','archive','active'}; ARGV={'prefix:'}
cjson={decode=function(raw) return data[raw] end}
redis={call=function(cmd,key,a,b)
  if cmd=='EXISTS' then return initialized and 1 or 0 end
  if cmd=='ZREVRANGE' then scanned=scanned+1; return {'live','archived','unpaid','retry'} end
  if cmd=='GET' then return key:sub(8) end
  if cmd=='SADD' then active[a]=true; return 1 end
  if cmd=='SET' then initialized=true; return 'OK' end
  if cmd=='SMEMBERS' then
    local result={}; for id in pairs(active) do table.insert(result,id) end; return result
  end
  error(cmd)
end}
local run=assert(load(${JSON.stringify(activeScript)}))
assert(#run()==3 and active.live and active.unpaid and active.retry and not active.archived)
assert(#run()==3 and scanned==1)`);
});

test('rating badges verify legacy linked profiles through the index without a directory scan', async t => {
  const redis = require('../lib/redis');
  const poker = require('../lib/pokerplus');
  t.mock.method(redis, 'isConfigured', () => true);
  const commands = [];
  t.mock.method(redis, 'pipeline', async rows => rows.map(([operation,key,...fields]) => {
    commands.push(operation);
    assert.equal(operation,'HMGET');
    if (key === poker.NICKNAME_REVERSE_HASH_KEY) return {result:fields.map(name => name === 'em13!!' ? 'ID123456' : null)};
    if (key === poker.PROFILE_HASH_KEY) return {result:[JSON.stringify({nickname:'Em13',pokerPlusUserId:'777'})]};
    return {result:fields.map(() => null)};
  }));
  const handler = require('../lib/api-handlers/users');
  const req = {method:'GET',headers:{},query:{guestDeviceId:'device-123',ratingVerify:JSON.stringify(['Em13!!','Unknown'])}};
  const res = {setHeader(){},status(code){this.code=code;return this;},json(body){this.body=body;return this;}};
  await handler(req,res);
  assert.equal(res.code,200);
  assert.deepEqual(res.body.verified,[true,false]);
  assert.deepEqual(commands,['HMGET','HMGET','HMGET','HMGET']);
});

test('sampled Redis metrics count commands and bytes without exposing request credentials', async t => {
  t.mock.method(Math, 'random', () => 0);
  t.mock.method(globalThis, 'fetch', async () => ({
    ok:true,
    text:async () => '[{"result":42}]',
  }));
  const logs = [];
  t.mock.method(console, 'info', (...args) => logs.push(args));
  const original = {};
  const settings = {REDIS_ROUTE_AUDIT_SAMPLE_RATE:'1', UPSTASH_REDIS_REST_URL:'https://redis.test',
    UPSTASH_REDIS_REST_TOKEN:'test-secret', REDIS_BANDWIDTH_AUDIT:'0'};
  for (const [key,value] of Object.entries(settings)) {
    original[key] = process.env[key];
    process.env[key] = value;
  }
  try {
    const redis = require('../lib/redis');
    await redis.withRouteAudit('nards-tournaments', {query:{},body:{action:'get',initData:'private-session'}},
      {statusCode:200}, () => redis.pipeline([['GET','private-key']], {context:'nards-tournaments.storage'}));
    assert.equal(logs.length,1);
    const [tag, metrics] = logs[0];
    assert.equal(tag,'[redis-route-audit]');
    assert.equal(metrics.action,'get');
    assert.equal(metrics.commands,1);
    assert.equal(metrics.responseBytes,Buffer.byteLength('[{"result":42}]'));
    assert.equal(metrics.nards.commands,1);
    assert.doesNotMatch(JSON.stringify(logs),/private-|test-secret/);
  } finally {
    for (const [key,value] of Object.entries(original)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
