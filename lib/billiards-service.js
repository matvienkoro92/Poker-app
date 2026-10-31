'use strict';
const crypto=require('node:crypto');
const redis=require('./redis');
const roomFactory=require('./billiards-room');
const PREFIX='poker_app:billiards:v1:',WAGERS=PREFIX+'wager:',DUE=PREFIX+'wagers-due';
async function commands(c){const rows=await redis.pipeline(c,{throwOnError:true,context:'billiards'});if(!rows||rows.some(r=>!r||r.error))throw Error('Game storage unavailable');return rows.map(r=>r.result);}
const storage={
 presence:require('./game-connection-protection').presence(commands,'billiards'),
 async profile(member,identity){const id=await require('./api-handlers/friends').resolveNewsAccountId(identity,member),p=await require('./club-social').memberProfile(id);return {name:p.nick||p.name,accountId:id,level:p.level};},
 async load(id){const [raw]=await commands([['GET',PREFIX+id]]);return raw?JSON.parse(raw):null;},
 async create(id,r){const [ok]=await commands([['SET',PREFIX+id,JSON.stringify(r),'NX','EX',7200]]);return !!ok;},
 async cas(id,revision,r){const [ok]=await commands([['EVAL',require('./billiards-stats').CAS,1,PREFIX+id,revision,JSON.stringify(r),require('./billiards-stats').PREFIX,Date.now()]]);return Number(ok)===1;}
};
const lockKey=id=>WAGERS+'lock:'+id;
const store={
 chunkSize:require('./pokerplus-transfer-limit'),
 async get(id){if(!/^[A-HJ-NP-Z2-9]{10}$/.test(id))return null;const [raw]=await commands([['GET',WAGERS+id]]);return raw?JSON.parse(raw):null;},
 async lock(id){const token=crypto.randomUUID();const [ok]=await commands([['SET',lockKey(id),token,'NX','EX',120]]);return ok==='OK'?token:null;},
 async unlock(id,token){await commands([['EVAL',"if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end return 0",1,lockKey(id),token]]);},
 async put(w,token){
  const done=['paid','refunded','cancelled'].includes(w.status);
  const [ok]=await commands([['EVAL',`if redis.call('GET',KEYS[1])~=ARGV[1] then return 0 end
redis.call('SET',KEYS[2],ARGV[2]);if ARGV[4]=='1' then redis.call('ZREM',KEYS[3],ARGV[3]);redis.call('EXPIRE',KEYS[4],2592000) else redis.call('ZADD',KEYS[3],ARGV[5],ARGV[3]) end;return 1`,4,lockKey(w.id),WAGERS+w.id,DUE,PREFIX+w.id,token,JSON.stringify(w),w.id,done?'1':'0',w.status==='waiting'?w.expires:Date.now()+60000]]);
  if(Number(ok)!==1)throw Error('Room lock expired; retry required');
 },
 async due(time,limit){const [ids]=await commands([['ZRANGEBYSCORE',DUE,'-inf',time,'LIMIT',0,limit]]);return ids||[];}
};
const base=roomFactory(storage);
const service=require('./billiards-wagers')({base,loadRoom:storage.load,store,grantSpins:require('./game-spin-rewards'),
 async createRoom(member,body,identity,id){
  const existing=await storage.load(id);if(existing){if(existing.players[0]!==member)throw Error('Room collision');return;}
  return roomFactory({...storage,random:()=>id,async create(code,r){r.wagered=true;const [ok]=await commands([['SET',PREFIX+code,JSON.stringify(r),'NX']]);return ok==='OK';}}).call(member,body,identity);
 },
 async resolve(member,identity){
  const accountId=await require('./api-handlers/friends').resolveNewsAccountId(identity,member);
  const rows=await commands([['HGET','poker_app:pokerplus_user_ids',accountId],['HGET','poker_app:pokerplus_user_ids',member]]);
  const poker21Id=String(rows[0]||rows[1]||'').trim();
  if(!poker21Id){const e=Error('Сначала привяжите аккаунт Poker21 в профиле.');e.status=403;throw e;}
  return {accountId,poker21Id};
 },
 async balance(userId){const p=await require('./pokerplus').getGroupMemberData({userId});return p.balance;},
 async change(input){try{return await require('./api-handlers/pokerplus-chips').processDirectChange(input);}catch(e){
  const err=Error(/balance|gold|insufficient|not enough|недостат/i.test(e.message)?'Недостаточно фишек. Пополните фишки в Poker21.':'Не удалось подтвердить операцию с фишками Poker21. Операция сохранена и будет проверена повторно.');err.status=503;throw err;
 }}
});
module.exports={service,commands};
