'use strict';
const crypto = require('node:crypto');
const PREFIX = 'poker_app:nards-tournaments:v1:';
let singleton;
function runtime() {
  if (singleton) return singleton;
  const { commands, storage } = require('./board-games-service');
  const store = {
    async get(id) { const [raw] = await commands([['GET', PREFIX + id]]); return raw ? JSON.parse(raw) : null; },
    async create(t) {
      const [ok] = await commands([['EVAL', "if redis.call('EXISTS',KEYS[1])==1 then return 0 end;redis.call('SET',KEYS[1],ARGV[1],'EX',5184000);redis.call('ZADD',KEYS[2],ARGV[2],ARGV[3]);return 1", 2, PREFIX + t.id, PREFIX + 'index', JSON.stringify(t), t.createdAt, t.id]]);
      return Number(ok) === 1;
    },
    async list() {
      const [ids] = await commands([['ZREVRANGE', PREFIX + 'index', 0, 99]]);
      if (!ids?.length) return [];
      const rows = await commands(ids.map(id => ['GET', PREFIX + id]));
      return rows.filter(Boolean).map(raw => JSON.parse(raw));
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
          const [saved] = await commands([['EVAL', "if redis.call('GET',KEYS[1])~=ARGV[1] then return 0 end;redis.call('SET',KEYS[2],ARGV[2],'EX',5184000);return 1", 2, key, PREFIX + id, token, JSON.stringify(t)]]);
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
  singleton = require('./nards-tournaments')({ store, rooms: {
    ...storage,
    async loadMany(ids) { const rows = await commands(ids.map(id => ['GET', 'poker_app:board-games:v1:' + id])); return Object.fromEntries(ids.map((id, i) => [id, rows[i] ? JSON.parse(rows[i]) : null])); },
    async create(id, room) { const ttl=Math.max(3600,Math.ceil((room.expires-Date.now())/1000));const [ok] = await commands([['SET', 'poker_app:board-games:v1:' + id, JSON.stringify(room), 'NX', 'EX', ttl]]); return ok === 'OK'; },
    async savedEquipment(accountId) { const [raw] = await commands([['GET', 'poker_app:board-games:v1:equipment:' + accountId]]); return raw ? JSON.parse(raw) : {}; }
  }, payments:require('./nards-tournament-payments').createPayments(), profile: async (member,identity) => {
    const person=await storage.profile(member,identity);
    const rows=await commands([['HGET','poker_app:pokerplus_user_ids',person.accountId],['HGET','poker_app:pokerplus_user_ids',member]]);
    return {...person,poker21Id:String(rows[0]||rows[1]||'').trim()};
  } });
  return singleton;
}
async function callRoom(member, body, identity, initialRoom) {
  const { regularService, storage } = require('./board-games-service');
  const tournament = runtime();
  async function sync() {
    for(let attempt=0;;attempt++)try{return await tournament.synchronize(initialRoom.tournament.id,initialRoom.id);}
    catch(e){if(e.status!==409||attempt>=3)throw e;await new Promise(resolve=>setTimeout(resolve,50*(attempt+1)));}
  }
  const tm=initialRoom.tournament,time=Date.now();
  // Ordinary in-progress polls do not need the bracket mutex. Only a due start,
  // deadline or completed game can change tournament progression.
  if(initialRoom.state.allowUndo===false||initialRoom.state.winner!=null||initialRoom.turnDeadline&&initialRoom.turnDeadline<=time||tm.startsAt!=null&&tm.startsAt<=time&&!tm.active)await sync();
  // A linked login for the same canonical account resumes its original seat.
  const person = await storage.profile(member, identity);
  const index = initialRoom.playerProfiles.findIndex(p => p?.accountId && p.accountId === person?.accountId);
  const actor = index >= 0 ? initialRoom.players[index] : member;
  const result = await regularService.call(actor, body, identity);
  if (['move', 'rematch'].includes(body.action) && result.state?.winner!=null) {
    await sync();
    return regularService.call(actor, { action: 'room', roomId: body.roomId }, identity);
  }
  return result;
}
module.exports = { runtime, callRoom };
