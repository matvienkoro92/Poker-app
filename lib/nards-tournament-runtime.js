'use strict';
const crypto = require('node:crypto');
const PREFIX = 'poker_app:nards-tournaments:v1:';
const ACTIVE_KEY = PREFIX + 'active';
const ACTIVE_READY_KEY = PREFIX + 'active-initialized';
const ACTIVE_IDS = `
if redis.call('EXISTS', KEYS[1]) == 0 then
  for _, id in ipairs(redis.call('ZREVRANGE', KEYS[2], 0, 99)) do
    local raw = redis.call('GET', ARGV[1] .. id)
    if raw then
      local t = cjson.decode(raw)
      local pending = not t.paymentsSettled or (t.status ~= 'completed' and t.status ~= 'cancelled')
      if not pending then
        for _, notice in pairs(t.notices or {}) do
          if not notice.sent then pending = true; break end
        end
      end
      if pending then redis.call('SADD', KEYS[3], id) end
    end
  end
  redis.call('SET', KEYS[1], '1')
end
return redis.call('SMEMBERS', KEYS[3])`;
let singleton;
function runtime() {
  if (singleton) return singleton;
  const board = require('./board-games-service');
  const commands = (rows, action = 'storage') => board.commands(rows, 'nards-tournaments.'+action);
  const {storage} = board;
  const store = {
    async get(id) { const [raw] = await commands([['GET', PREFIX + id]]); return raw ? JSON.parse(raw) : null; },
    async create(t) {
      const [ok] = await commands([['EVAL', "if redis.call('EXISTS',KEYS[1])==1 then return 0 end;redis.call('SET',KEYS[1],ARGV[1],'EX',5184000);redis.call('ZADD',KEYS[2],ARGV[2],ARGV[3]);redis.call('SADD',KEYS[3],ARGV[3]);return 1", 3, PREFIX + t.id, PREFIX + 'index', ACTIVE_KEY, JSON.stringify(t), t.createdAt, t.id]]);
      return Number(ok) === 1;
    },
    async list() {
      const [ids] = await commands([['ZREVRANGE', PREFIX + 'index', 0, 99]]);
      if (!ids?.length) return [];
      const [rows] = await commands([['MGET', ...ids.map(id => PREFIX + id)]]);
      return rows.filter(Boolean).map(raw => JSON.parse(raw));
    },
    async activeIds() {
      const [ids] = await commands([['EVAL', ACTIVE_IDS, 3, ACTIVE_READY_KEY, PREFIX + 'index', ACTIVE_KEY, PREFIX]], 'cron-index');
      return ids || [];
    },
    async forgetActive(id) { await commands([['SREM', ACTIVE_KEY, id]]); },
    async claimRefresh(id) {
      const [claimed] = await commands([['SET', PREFIX + 'refresh:' + id, '1', 'NX', 'PX', 2000]]);
      return claimed === 'OK';
    },
    async withLock(id, fn) {
      const key = PREFIX + 'lock:' + id, token = crypto.randomUUID();
      const [locked] = await commands([['SET', key, token, 'NX', 'EX', 120]]);
      if (!locked) { const e = Error('Турнир обновляется. Повторите через секунду.'); e.status = 409; throw e; }
      try {
        const t = await store.get(id);
        if (!t) { const e = Error('Турнир не найден.'); e.status = 404; throw e; }
        let before = JSON.stringify(t);
        const checkpoint = async () => {
          const [held]=await commands([['EVAL',"if redis.call('GET',KEYS[1])~=ARGV[1] then return 0 end;redis.call('EXPIRE',KEYS[1],120);return 1",1,key,token]]);
          if(Number(held)!==1)throw Error('Tournament lock expired');
        if (JSON.stringify(t) !== before) {
          t.revision++;
          const pending = require('./nards-tournaments').needsSweep(t);
          const [saved] = await commands([['EVAL', "if redis.call('GET',KEYS[1])~=ARGV[1] then return 0 end;redis.call('SET',KEYS[2],ARGV[2],'EX',5184000);redis.call(ARGV[3],KEYS[3],ARGV[4]);return 1", 3, key, PREFIX + id, ACTIVE_KEY, token, JSON.stringify(t), pending ? 'SADD' : 'SREM', id]]);
          if (Number(saved) !== 1) throw Error('Tournament lock expired');
          before=JSON.stringify(t);
        }
        };
        const result=await fn(t,checkpoint);await checkpoint();
        return result;
      } finally {
        await commands([['EVAL', "if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end;return 0", 1, key, token]]);
      }
    }
  };
  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN;
  const notifications = require('./nards-tournament-notifications');
  const notify = token && (payload => notifications.send(payload, token));
  const notifyPlayer = token && ((entry, payload) => notifications.sendReady(entry, payload, token));
  singleton = require('./nards-tournaments')({ store, notify, notifyPlayer, attendance: require('./nards-tournament-attendance')(commands, PREFIX), rooms: {
    ...storage,
    async loadMany(ids) {
      const [rows] = await commands([['MGET', ...ids.map(id => 'poker_app:board-games:v1:' + id)]], 'bracket-rooms');
      return Object.fromEntries(ids.map((id, i) => [id, rows[i] ? JSON.parse(rows[i]) : null]));
    },
    async create(id, room) { const ttl=Math.max(3600,Math.ceil((room.expires-Date.now())/1000));const [ok] = await commands([['SET', 'poker_app:board-games:v1:' + id, JSON.stringify(room), 'NX', 'EX', ttl]]); return ok === 'OK'; },
    async savedEquipment(accountId) { const [raw] = await commands([['GET', 'poker_app:board-games:v1:equipment:' + accountId]]); return raw ? JSON.parse(raw) : {}; }
  }, payments:require('./nards-tournament-payments').createPayments(), profile: async (member,identity,action) => {
    if (action === 'get' || action === 'list') {
      return {accountId: await require('./api-handlers/friends').resolveNewsAccountId(identity, member)};
    }
    const person=await storage.profile(member,identity);
    const rows=await commands([['HGET','poker_app:pokerplus_user_ids',person.accountId],['HGET','poker_app:pokerplus_user_ids',member]]);
    return {...person,poker21Id:String(rows[0]||rows[1]||'').trim()};
  } });
  return singleton;
}
async function callRoom(member, body, identity, initialRoom) {
  const { regularService, base } = require('./board-games-service');
  const tournament = runtime();
  async function sync() {
    for(let attempt=0;;attempt++)try{return await tournament.synchronize(initialRoom.tournament.id,initialRoom.id);}
    catch(e){if(e.status!==409||attempt>=3)throw e;await new Promise(resolve=>setTimeout(resolve,50*(attempt+1)));}
  }
  const tm=initialRoom.tournament,time=Date.now();
  // Ordinary in-progress polls do not need the bracket mutex. Only a due start,
  // deadline or completed game can change tournament progression.
  const needsSync=initialRoom.state.allowUndo===false||initialRoom.state.winner!=null||
    initialRoom.turnDeadline&&initialRoom.turnDeadline<=time||tm.startsAt!=null&&tm.startsAt<=time&&!tm.active;
  if(needsSync)await sync();
  // A linked login needs the account ID, but not the rest of the player's profile.
  const accountId=await require('./api-handlers/friends').resolveNewsAccountId(identity,member);
  const index=initialRoom.playerProfiles.findIndex(p=>p?.accountId&&p.accountId===accountId);
  const actor=index>=0?initialRoom.players[index]:member;
  if(['room','watch'].includes(body.action)){
    // Tournament entry fees are managed by the tournament, outside room wagers.
    return base.call(actor,body,identity,needsSync?undefined:initialRoom);
  }
  const result=await regularService.call(actor,body,identity);
  if (['move', 'rematch'].includes(body.action) && result.state?.winner!=null) {
    await sync();
    return regularService.call(actor, { action: 'room', roomId: body.roomId }, identity);
  }
  return result;
}
module.exports = { runtime, callRoom };
