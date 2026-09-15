'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),crypto=require('node:crypto');
process.env.TELEGRAM_BOT_TOKEN='bet-auth-test';
const token=process.env.TELEGRAM_BOT_TOKEN;
const {signPwaSession}=require('../lib/poker-pwa-session');
const redis=require('../lib/redis'),account=require('../lib/account-id'),poker=require('../lib/pokerplus'),chips=require('../lib/api-handlers/pokerplus-chips'),subs=require('../lib/tournament-bet-subscriptions');
let state,charges=0,balanceGate=null;const locks=new Map();
redis.isConfigured=()=>true;
redis.pipeline=async commands=>commands.map(([cmd,key,...args])=>{
 let result=null;
 if(cmd==='GET') result=key==='poker_app:tournament_bet:current'?JSON.stringify(state):locks.get(key)||null;
 else if(cmd==='SET') {if(key==='poker_app:tournament_bet:current'){state=JSON.parse(args[0]);result='OK';}else if(!args.includes('NX')||!locks.has(key)){locks.set(key,args[0]);result='OK';}}
 else if(cmd==='DEL')result=Number(locks.delete(key));
 else if(cmd==='HGET'&&key==='poker_app:pokerplus_user_ids') result=['ID111111','ID222222','tg_123','mail_ID111111'].includes(args[0])?'777':'888';
 else if(cmd==='LRANGE'||cmd==='HVALS')result=[];
 return {result};
});
account.ensureDtIdForUserId=async id=>id==='mail_ID111111'?'ID111111':'ID222222';
account.redisPipeline=redis.pipeline;
poker.getGroupMemberData=async()=>{if(balanceGate)await balanceGate;return {balance:10000,nickname:'Player'};};
chips.processDirectChange=async()=>{charges++;};
for(const key of ['notify','notifyRegistration','notifyParticipantJoined'])subs[key]=async()=>{};
subs.status=async()=>false;
delete require.cache[require.resolve('../lib/api-handlers/tournament-bet')];
const handler=require('../lib/api-handlers/tournament-bet');
const email=signPwaSession({id:111,memberId:'mail_ID111111'},token);
const pwa=signPwaSession({id:123},token);
const params=new URLSearchParams({auth_date:String(Math.floor(Date.now()/1000)),user:JSON.stringify({id:123})});
const secret=crypto.createHmac('sha256','WebAppData').update(token).digest();
params.set('hash',crypto.createHmac('sha256',secret).update([...params].sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>k+'='+v).join('\n')).digest('hex'));
const tg=params.toString();
function reset(entries=[]){state={id:'tb_shared',title:'Test',status:'open',stakePrice:300,startingBank:5000,entries};charges=0;locks.clear();balanceGate=null;}
async function call(method,auth,extra={}){const res={setHeader(){},status(n){this.code=n;return this},json(body){this.body=body;return this}};await handler({method,query:method==='GET'?{...auth,...extra}:{},body:method==='POST'?{...auth,...extra}:{}},res);return res;}

test('PWA email and Telegram recognize the same Poker21 bet and reject another charge',async()=>{
 reset([{accountId:'ID111111',memberId:'mail_ID111111',poker21Id:'777',name:'Player',stake:300}]);
 for(const auth of [{pwaSession:email},{pwaSession:pwa},{initData:tg}]){
  const get=await call('GET',auth,{eventId:'tb_shared'});
  assert.equal(get.code,200);assert.ok(get.body.myEntry);assert.equal(get.body.entries[0].mine,true);assert.equal(get.body.events[0].joined,true);
  assert.equal(get.body.entries[0].accountId,'');assert.equal(get.body.entries[0].poker21Id,'');
  const post=await call('POST',auth,{action:'bet',eventId:'tb_shared'});
  assert.equal(post.code,409);
 }
 assert.equal(charges,0);assert.equal(state.entries.length,1);
});

test('anonymous and invalid sessions do not own a bet and cannot place one',async()=>{
 reset([{accountId:'ID111111',poker21Id:'777',stake:300}]);
 for(const auth of [{},{pwaSession:'invalid'},{initData:'invalid'}]){
  const get=await call('GET',auth);assert.equal(get.body.authenticated,false);assert.equal(get.body.myEntry,null);
  assert.equal((await call('POST',auth,{action:'bet'})).code,401);
 }
 assert.equal(charges,0);
});

test('deep link and default main event share one lock during simultaneous PWA and Telegram bets',async()=>{
 reset();let release;balanceGate=new Promise(resolve=>{release=resolve});
 const first=call('POST',{pwaSession:email},{action:'bet'});
 for(let i=0;i<30&&!locks.has('poker_app:tournament_bet:lock:main');i++)await Promise.resolve();
 assert.ok(locks.has('poker_app:tournament_bet:lock:main'));
 const second=await call('POST',{initData:tg},{action:'bet',eventId:'tb_shared'});
 assert.equal(second.code,409);release();assert.equal((await first).code,200);
 assert.equal(charges,1);assert.equal(state.entries.length,1);
 assert.equal((await call('POST',{initData:tg},{action:'bet',eventId:'tb_shared'})).code,409);
 assert.equal(charges,1);
});

test('ownership never matches nickname or empty identifiers',()=>{
 assert.equal(handler.entryBelongsTo({name:'Player'},{name:'Player'}),false);
 assert.equal(handler.entryBelongsTo({accountId:'A',poker21Id:''},{accountId:'B',poker21Id:''}),false);
 assert.equal(handler.entryBelongsTo({accountId:'A',poker21Id:'777'},{accountId:'B',poker21Id:'888'}),false);
 assert.equal(handler.entryBelongsTo({memberId:'tg_123'},{memberId:'tg_123'}),true);
});
