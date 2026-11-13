'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function fixture(values={},names={}){
 const calls=[];let offline=false;
 const ctx={module:{exports:{}},require:id=>id==='./redis'?{pipeline:async commands=>{if(offline)throw Error('offline');calls.push(...commands);return commands.map(([,key,field])=>({result:values[key+'|'+field]||null}));}}:id==='./account-canonical'?{canonicalAccountId:async id=>id==='ID000001'?'ID000009':id}:id==='./deposit-player-directory'?{knownPlayerNick:(room,id)=>room==='P21'?names[id]||'':'',depositPlayerDirectory:state=>[{room:'P21',playerId:'123456',profileKey:'P21|123456'},...(state.playerAccounts||[])]}:require(id)};
 vm.runInNewContext(fs.readFileSync('lib/telegram-support-player.js','utf8'),ctx);
 return {...ctx.module.exports,calls,offline(){offline=true;}};
}
const user={id:777,first_name:'Telegram Name',username:'handle'};
test('uses an explicit Telegram binding, canonical account and authoritative Poker21 ID',async()=>{
 const f=fixture({'poker_app:visitor_dt_ids|tg_777':'ID000001','poker_app:pokerplus_user_ids|ID000009':'123456','poker_app:pokerplus_profiles|ID000009':JSON.stringify({pokerPlusUserId:'123456',nickname:'Poker Nick'})},{123456:'Saved Name'});
 const player=await f.readPlayerIdentity(user);assert.equal(player.name,'Saved Name');assert.equal(player.poker21Id,'123456');
 assert.ok(f.calls.some(c=>c[1]==='poker_app:pokerplus_user_ids'&&c[2]==='ID000009'));
 assert.equal(f.identityText(user,player),'Telegram Name @handle\nSaved Name P21:123456 X:не найден');
});
test('without confirmed binding, never substitutes Telegram or app IDs for Poker21',async()=>{
 const f=fixture();const player=await f.readPlayerIdentity(user);assert.equal(player.name,'Telegram Name');assert.equal(player.poker21Id,null);assert.match(f.identityText(user,player),/не найден/);
 assert.ok(!f.calls.some(c=>c[1]==='poker_app:pokerplus_user_ids'));
});
test('stale profile for another player cannot supply name or Poker21 ID',async()=>{
 const f=fixture({'poker_app:visitor_dt_ids|tg_777':'ID000001','poker_app:pokerplus_user_ids|ID000009':'123456','poker_app:pokerplus_profiles|ID000009':JSON.stringify({pokerPlusUserId:'999999',nickname:'Wrong Player'}),'poker_app:visitor_chat_display_names|ID000009':'App Name'});
 const player=await f.readPlayerIdentity(user);assert.equal(player.name,'App Name');assert.equal(player.poker21Id,'123456');
});
test('lookup outage falls back visibly without blocking message delivery',async()=>{
 const f=fixture();f.offline();const player=await f.readPlayerIdentity(user);assert.equal(player.poker21Id,null);assert.match(f.identityText(user,player),/не удалось проверить/);
});

test('X Poker IDs come only from accounts linked to the confirmed P21 profile',async()=>{
 const f=fixture({'poker_app:visitor_dt_ids|tg_777':'ID000001','poker_app:pokerplus_user_ids|ID000009':'123456',"local raw=redis.call('GET',KEYS[1]); if not raw then return '[]' end; local s=cjson.decode(raw); return cjson.encode(s.playerAccounts or {})|1":JSON.stringify([{room:'X',playerId:'98765',profileKey:'P21|123456'},{room:'X',playerId:'99999',profileKey:'P21|999999'}])});
 const p=await f.readPlayerIdentity(user);assert.deepEqual(Array.from(p.xpokerIds),['98765']);assert.match(f.identityText(user,p),/X:98765$/);
});
