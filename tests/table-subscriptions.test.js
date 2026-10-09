'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const {create,parseLimit,matches} = require('../lib/table-subscriptions');
const base = {deskId:'1',deskName:'Классика',leagueId:'184691',unionId:'7158',groupId:'680649',playType:'PLO6',blindAnnotation:'5/10',playerCount:2,pos:{pos1:123,pos2:456}};
function fixture(push) {
  const db = new Map(), sets = new Map(), sorted = new Map(), calls = [], commandsLog = [];
  let tables = [], fail = false, deliveryFail = false;
  const redis = {isConfigured:()=>true,pipeline:async commands=>commands.map(([cmd,key,...args])=>{
    commandsLog.push([cmd,key,...args]);
    let result = null;
    if (cmd === 'GET') result = db.get(key)||null;
    else if (cmd === 'SET') { if (!(args.includes('NX') && db.has(key))) {db.set(key,args[0]); result='OK';} }
    else if (cmd === 'DEL') result = Number(db.delete(key));
    else if (cmd === 'SADD') {const s=sets.get(key)||new Set();s.add(args[0]);sets.set(key,s);result=1;}
    else if (cmd === 'SREM') result = Number(sets.get(key)?.delete(args[0]));
    else if (cmd === 'SSCAN') result = ['0',[...(sets.get(key)||[])]];
    else if (cmd === 'SMEMBERS') result=[...(sets.get(key)||[])];
    else if (cmd === 'ZADD') {const z=sorted.get(key)||new Map();z.set(args[1],Number(args[0]));sorted.set(key,z);result=1;}
    else if (cmd === 'ZREM') result=Number(sorted.get(key)?.delete(args[0]));
    else if (cmd === 'ZRANGEBYSCORE') result=[...(sorted.get(key)||[])].filter(([,score])=>score<=Number(args[1])).map(([member])=>member);
    else if (cmd === 'EVAL') {const [,lock,token]=args;result=db.get(lock)===token ? Number(db.delete(lock)) : 0;}
    else throw new Error(cmd);
    return {result};
  })};
  const service = create({redis,namespace:'test',push,getTables:async()=>{if(fail)throw Error('upstream');return structuredClone(tables);},getNames:async()=>new Map([['123','Ник <&>']]),send:async(method,body)=>{calls.push({method,body});if(deliveryFail && method==='sendMessage')return {ok:false,error_code:500};return {ok:true,result:{username:'TestBot'}};}});
  const callback = async (action,user=42,type='private',finish=true) => {
    const update=a=>({callback_query:{id:'cb',data:'club:sub:'+a,from:{id:user},message:{message_id:1,chat:{id:type==='private'?user:-1,type}}}});
    const result=await service.handle(update(action));
    if(finish && /^player:\d+$/.test(action) && type==='private') {await service.handle(update('pg:next'));await service.handle(update('pl:save'));}
    return result;
  };
  const message = (text,user=42) => service.handle({message:{text,from:{id:user},chat:{id:user,type:'private'}}});
  return {service,redis,callback,message,calls,db,commandsLog,setTables:v=>tables=v,setFailure:v=>fail=v,setDeliveryFailure:v=>deliveryFail=v};
}
test('game and limits distinguish exact, minimum, malformed values and private scopes',()=>{
  assert.deepEqual(parseLimit('5/10р'),{small:5,big:10});
  assert.deepEqual(parseLimit('0,5 / 1'),{small:0.5,big:1});
  assert.equal(parseLimit('-5/10'),null);assert.equal(parseLimit('10/5'),null);
  const exact={kind:'game',game:'PLO6',mode:'exact',limit:{small:5,big:10}};
  const rows=[base,{...base,deskId:'2',blindAnnotation:'25/50'},{...base,leagueId:'111'},{...base,playType:'MTT PLO6'},{...base,playerCount:0}];
  assert.equal(matches(exact,rows).length,1);
  assert.equal(matches({...exact,mode:'from'},rows).length,2);
  assert.equal(matches({kind:'player',playerId:'123'},rows).length,3);
});
test('subscribe baseline, game activation, no duplicates, departures and reactivation',async()=>{
  const f=fixture();f.setTables([base]);
  await f.callback('add:PLO6:any');f.calls.length=0;
  await f.service.poll();assert.equal(f.calls.length,0);
  f.setTables([base,{...base,deskId:'2'}]);await f.service.poll();
  assert.equal(f.calls.filter(c=>c.method==='sendMessage').length,1);
  await f.service.poll();assert.equal(f.calls.filter(c=>c.method==='sendMessage').length,1);
  f.setTables([base]);await f.service.poll();f.setTables([base,{...base,deskId:'2'}]);await f.service.poll();
  assert.equal(f.calls.filter(c=>c.method==='sendMessage').length,2);
});
test('player search uses exact ID, tracks new seating, escapes names, deletion isolates owners',async()=>{
  const f=fixture();await f.callback('player');await f.message('Ник');
  assert.ok(f.calls.at(-1).body.reply_markup.inline_keyboard[0][0].callback_data.endsWith('123'));
  await f.callback('player:123');f.calls.length=0;
  f.setTables([base]);await f.service.poll();
  assert.match(f.calls[0].body.text,/Ник &lt;&amp;&gt;/);
  f.setTables([{...base,pos:{pos2:456}}]);await f.service.poll();f.setTables([base]);await f.service.poll();
  assert.equal(f.calls.length,2);
  const saved=JSON.parse(f.db.get('poker21:table-subscriptions:test:user:42'));
  await f.callback('delete:'+saved[0].id,43);
  assert.equal(JSON.parse(f.db.get('poker21:table-subscriptions:test:user:42')).length,1);
  await f.callback('delete:'+saved[0].id);assert.equal(JSON.parse(f.db.get('poker21:table-subscriptions:test:user:42')).length,0);
});
test('upstream failures preserve previous seating and group entry only links to private bot',async()=>{
  const f=fixture();await f.callback('menu',42,'supergroup');
  assert.equal(f.db.size,0);assert.match(f.calls.at(-1).body.reply_markup.inline_keyboard[0][0].url,/TestBot\?start=tablesub/);
  assert.equal(f.calls.at(-1).method,'editMessageText');
  assert.equal(f.calls.at(-1).body.chat_id,-1);
  assert.equal(f.calls.at(-1).body.message_id,1);
  assert.deepEqual(f.calls.at(-1).body.reply_markup.inline_keyboard.at(-1),[{text:'⬅️ Назад',callback_data:'club:pulse'}]);
  assert.ok(!f.calls.some(call=>call.method==='sendMessage'));
  f.setTables([base]);await f.callback('add:PLO6:any');const before=f.db.get('poker21:table-subscriptions:test:user:42');
  f.setFailure(true);await assert.rejects(f.service.poll(),/upstream/);assert.equal(f.db.get('poker21:table-subscriptions:test:user:42'),before);
});
test('private limit input is saved and existing identical subscriptions do not multiply',async()=>{
  const f=fixture();await f.callback('limit:NLH:from');await f.message('25/50');
  await f.callback('limit:NLH:from');await f.message('25/50');
  const subs=JSON.parse(f.db.get('poker21:table-subscriptions:test:user:42'));
  assert.equal(subs.length,1);assert.deepEqual(subs[0].limit,{small:25,big:50});
  assert.equal(await f.message('/unrelated'),false);
});

test('large notification batches resume without starving later subscribers or repeating sends',async()=>{
  const f=fixture();await f.callback('add:PLO6:any',42);await f.callback('add:PLO6:any',43);
  f.calls.length=0;
  f.setTables(Array.from({length:35},(_,i)=>({...base,deskId:String(i)})));
  for(let i=0;i<3;i++)await f.service.poll();
  const sent=f.calls.filter(c=>c.method==='sendMessage');
  assert.equal(sent.filter(c=>c.body.chat_id==='42').length,35);
  assert.equal(sent.filter(c=>c.body.chat_id==='43').length,35);
});


test('failed Telegram delivery keeps the event retryable',async()=>{
  const f=fixture();await f.callback('add:PLO6:any');f.calls.length=0;
  f.setTables([base]);f.setDeliveryFailure(true);
  await assert.rejects(f.service.poll(),/Telegram delivery failed/);
  assert.deepEqual(JSON.parse(f.db.get('poker21:table-subscriptions:test:user:42'))[0].seen,[]);
  f.setDeliveryFailure(false);await f.service.poll();
  assert.equal(JSON.parse(f.db.get('poker21:table-subscriptions:test:user:42'))[0].seen.length,1);
  const count=f.calls.length;await f.service.poll();assert.equal(f.calls.length,count);
});

test('notification endpoint rejects an incorrect cron secret',async t=>{
  const old=process.env.CRON_SECRET;process.env.CRON_SECRET='expected';
  t.after(()=>{if(old===undefined)delete process.env.CRON_SECRET;else process.env.CRON_SECRET=old;});
  const handler=require('../lib/api-handlers/cron-table-subscriptions');
  const res={setHeader(){},status(code){this.code=code;return this;},json(body){this.body=body;}};
  await handler({method:'GET',headers:{authorization:'Bearer wrong'}},res);
  assert.equal(res.code,403);
});


test('unchanged seating and reordered API rows cause no subscription writes; new seating writes once',async()=>{
  const f=fixture();const second={...base,deskId:'2'};
  f.setTables([base,second]);await f.callback('add:PLO6:any');f.commandsLog.length=0;
  f.setTables([second,base]);await f.service.poll();await f.service.poll();
  const userWrites=()=>f.commandsLog.filter(([cmd,key])=>cmd==='SET'&&key==='poker21:table-subscriptions:test:user:42');
  assert.equal(userWrites().length,0);
  assert.equal(f.commandsLog.filter(([cmd])=>cmd==='SADD'||cmd==='SREM').length,0);
  f.setTables([base,second,{...base,deskId:'3'}]);await f.service.poll();
  assert.equal(userWrites().length,1);
  f.setTables([base,second]);await f.service.poll();assert.equal(userWrites().length,2);
  await f.service.poll();assert.equal(userWrites().length,2);
});

test('shared snapshot avoids fetching tables and confirms whether the user batch is complete',async()=>{
  const f=fixture();await f.callback('add:PLO6:any');f.setFailure(true);
  const result=await f.service.poll([base]);assert.equal(result.complete,true);assert.equal(result.sent,1);
  const marker=f.commandsLog.find(([cmd,key])=>cmd==='SET'&&key.includes(':delivery:'));
  assert.equal(marker.at(-1),'86400');
});

test('indexed dispatch selects exact and qualifying minimum limits without reading unrelated users',async()=>{
  const f=fixture();
  for (const [user,game,mode,limit] of [[42,'PLO6','exact','5/10'],[43,'PLO6','from','25/50'],[44,'PLO6','from','1/2'],[45,'NLH','exact','5/10']]) {
    await f.callback('limit:'+game+':'+mode,user);await f.message(limit,user);
  }
  f.commandsLog.length=0;f.calls.length=0;
  await f.service.poll([base],{games:[{game:'PLO6',limit:{small:5,big:10}}],players:[]});
  const reads=f.commandsLog.filter(([cmd,key])=>cmd==='GET'&&/:user:\d+$/.test(key)).map(([,key])=>key.split(':').at(-1));
  assert.deepEqual(reads.sort(),['42','44']);
  assert.equal(f.commandsLog.some(([cmd])=>cmd==='SSCAN'),false);
  assert.deepEqual(f.calls.filter(c=>c.method==='sendMessage').map(c=>c.body.chat_id).sort(),['42','44']);
});
test('player-only event does not read game subscribers; deleting one overlapping subscription preserves the index',async()=>{
  const f=fixture();await f.callback('player:123',42);await f.callback('add:PLO6:any',43);
  f.commandsLog.length=0;
  await f.service.poll([base],{players:['123'],games:[]});
  assert.equal(f.commandsLog.some(([cmd,key])=>cmd==='GET'&&key==='poker21:table-subscriptions:test:user:43'),false);
  await f.callback('limit:PLO6:from',44);await f.message('1/2',44);
  await f.callback('limit:PLO6:from',44);await f.message('0.5/2',44);
  const subs=JSON.parse(f.db.get('poker21:table-subscriptions:test:user:44'));
  await f.callback('delete:'+subs[0].id,44);f.commandsLog.length=0;
  await f.service.poll([base],{players:[],games:[{game:'PLO6',limit:{small:5,big:10}}]});
  assert.ok(f.commandsLog.some(([cmd,key])=>cmd==='GET'&&key==='poker21:table-subscriptions:test:user:44'));
  await f.callback('delete:'+subs[1].id,44);f.commandsLog.length=0;
  await f.service.poll([base],{players:[],games:[{game:'PLO6',limit:{small:5,big:10}}]});
  assert.equal(f.commandsLog.some(([cmd,key])=>cmd==='GET'&&key==='poker21:table-subscriptions:test:user:44'),false);
});


test('coordinator and indexed subscriptions handle activation, departure and reentry together',async()=>{
  const f=fixture();await f.callback('player:123',42);await f.callback('add:PLO6:any',43);
  let snapshot=[];
  const coordinator=require('../lib/table-subscription-coordinator').createCoordinator({redis:f.redis,getTables:async()=>snapshot,pollClub:(tables,interests)=>f.service.poll(tables,interests)});
  await coordinator();f.calls.length=0;
  snapshot=[base];await coordinator();assert.equal(f.calls.length,2);
  f.commandsLog.length=0;snapshot=[{...base,pos:{pos1:456}}];await coordinator();
  assert.equal(f.commandsLog.some(([cmd,key])=>cmd==='GET'&&key==='poker21:table-subscriptions:test:user:43'),false);
  snapshot=[base];await coordinator();assert.equal(f.calls.length,3);
  assert.equal(f.calls[2].body.chat_id,'42');
  const before=f.commandsLog.length;assert.equal((await coordinator()).unchanged,true);
  assert.equal(f.commandsLog.slice(before).some(([cmd,key])=>cmd==='GET'&&/:user:\d+$/.test(key)),false);
});

test('application push controls edit the menu and dispatch alongside Telegram events',async()=>{
 let enabled=false,notifications=0;
 const push={status:async()=>({subscribed:enabled,ready:true}),set:async(user,value)=>{enabled=value;return {ok:true};},notify:async()=>{if(enabled)notifications++;}};
 const f=fixture(push);
 await f.callback('menu');assert.match(f.calls.at(-1).body.reply_markup.inline_keyboard.at(-1)[0].text,/выключен/);
 await f.callback('push:on');assert.match(f.calls.at(-1).body.text,/включён/);assert.equal(f.calls.at(-1).method,'editMessageText');
 await f.callback('add:PLO6:any');f.setTables([base]);await f.service.poll();assert.equal(notifications,1);
 await f.service.poll();assert.equal(notifications,1);
 await f.callback('push:off');f.setTables([base,{...base,deskId:'2'}]);await f.service.poll();assert.equal(notifications,1);
});

test('minimum player count waits for threshold and notifies again after dropping below it',async()=>{
 const f=fixture();f.setTables([{...base,playerCount:1}]);
 await f.callback('game:PLO6');assert.match(f.calls.at(-1).body.text,/Лимит для/);
 await f.callback('choose:PLO6:any');assert.match(f.calls.at(-1).body.text,/Выберите минимум/);
 await f.callback('minimum:3');await f.callback('duration:0');f.calls.length=0;
 f.setTables([{...base,playerCount:2}]);await f.service.poll();assert.equal(f.calls.length,0);
 f.setTables([{...base,playerCount:3}]);await f.service.poll();assert.equal(f.calls.filter(c=>c.method==='sendMessage').length,1);
 f.setTables([{...base,playerCount:4}]);await f.service.poll();assert.equal(f.calls.filter(c=>c.method==='sendMessage').length,1);
 f.setTables([{...base,playerCount:2}]);await f.service.poll();f.setTables([{...base,playerCount:3}]);await f.service.poll();assert.equal(f.calls.filter(c=>c.method==='sendMessage').length,2);
});

test('exact limit is entered before minimum player count and retained on save',async()=>{
 const f=fixture();await f.callback('game:NLH');await f.callback('choose:NLH:exact');await f.message('25/50');
 assert.match(f.calls.at(-1).body.text,/Сколько игроков/);
 assert.equal(f.db.has('poker21:table-subscriptions:test:user:42'),false);
 await f.callback('minimum:2');await f.callback('duration:0');
 const [sub]=JSON.parse(f.db.get('poker21:table-subscriptions:test:user:42'));
 assert.deepEqual(sub.limit,{small:25,big:50});assert.equal(sub.minPlayers,2);assert.equal(sub.mode,'exact');
});

test('temporary game subscriptions stop at expiry and remove their game index',async t=>{
 const oldNow=Date.now;t.after(()=>Date.now=oldNow);let now=100000;Date.now=()=>now;
 const f=fixture();await f.callback('choose:PLO6:any');await f.callback('minimum:2');await f.callback('duration:2');
 const [sub]=JSON.parse(f.db.get('poker21:table-subscriptions:test:user:42'));
 assert.equal(sub.expiresAt,now+7200000);
 assert.equal(matches(sub,[base]).length,1);
 now=sub.expiresAt;assert.equal(matches(sub,[base]).length,0);
 await f.service.expire();assert.deepEqual(JSON.parse(f.db.get('poker21:table-subscriptions:test:user:42')),[]);
 assert.ok(f.commandsLog.some(c=>c[0]==='SREM'&&c[1].endsWith('index:game:PLO6:any')));
});

test('friend alerts use their own player index, ignore tournaments and stop on disable',async()=>{
 const f=fixture();
 assert.deepEqual(await f.service.list('ID111111'),[]);
 await f.service.setFriend('ID111111',{accountId:'ID222222',playerId:'123',nick:'Друг'},true);
 assert.equal((await f.service.list('ID111111'))[0].cashOnly,true);
 f.calls.length=0;
 const tournament={...base,playType:'MTT NLH'};
 await f.service.poll([tournament],{players:['123'],games:[]});assert.equal(f.calls.length,0);
 await f.service.poll([base],{players:['123'],games:[]});assert.equal(f.calls.filter(c=>c.method==='sendMessage').length,1);
 await f.service.poll([base],{players:['123'],games:[]});assert.equal(f.calls.filter(c=>c.method==='sendMessage').length,1);
 await f.service.setFriend('ID111111',{accountId:'ID222222'},false);
 await f.service.poll([{...base,deskId:'2'}],{players:['123'],games:[]});assert.equal(f.calls.filter(c=>c.method==='sendMessage').length,1);
 assert.deepEqual(await f.service.list('ID111111'),[]);
});

test('friend channel settings are stored independently and carried to delivery',async()=>{
 const f=fixture();await f.service.setFriend('ID111111',{accountId:'ID222222',playerId:'123',botEnabled:false,pushEnabled:true},true);
 const [sub]=await f.service.list('ID111111');assert.equal(sub.botEnabled,false);assert.equal(sub.pushEnabled,true);
 await f.service.poll([base],{players:['123'],games:[]});
 assert.equal(f.calls.at(-1).body.friendAccountId,'ID222222');
});

test('player subscriptions support several selected games and limits with all as default',async()=>{
 const f=fixture();await f.callback('player:123',42,'private',false);
 assert.match(f.calls.at(-1).body.text,/виды игры/);
 assert.equal(f.db.has('poker21:table-subscriptions:test:user:42'),false);
 await f.callback('pg:PLO6');await f.callback('pg:NLH');await f.callback('pg:next');
 await f.callback('pl:0');await f.callback('pl:1');await f.callback('pl:save');
 const [sub]=await f.service.list('42');assert.deepEqual(sub.selectedGames,['PLO6','NLH']);assert.deepEqual(sub.selectedLimits,['low','middle']);
 assert.equal(matches(sub,[base]).length,1);assert.equal(matches(sub,[{...base,playType:'PLO5'}]).length,0);assert.equal(matches(sub,[{...base,blindAnnotation:'50/100'}]).length,0);
 assert.equal(matches({...sub,selectedGames:[],selectedLimits:[]},[{...base,playType:'PLO5',blindAnnotation:'25/50'}]).length,1);
});

test('game checkboxes retain selected games and limits through player count and duration with indexed dispatch',async()=>{
 const f=fixture();await f.callback('games');await f.callback('gg:PLO6');await f.callback('gg:NLH');await f.callback('gg:next');
 await f.callback('gl:0');await f.callback('gl:1');await f.callback('gl:save');
 assert.match(f.calls.at(-1).body.text,/Сколько игроков/);
 await f.callback('minimum:3');await f.callback('duration:0');
 const [sub]=await f.service.list('42');assert.deepEqual(sub.selectedGames,['PLO6','NLH']);assert.deepEqual(sub.selectedLimits,['low','middle']);assert.equal(sub.minPlayers,3);
 assert.equal(matches(sub,[base]).length,0);
 const three={...base,playerCount:3};assert.equal(matches(sub,[three]).length,1);assert.equal(matches(sub,[{...three,playType:'PLO5'}]).length,0);
 f.calls.length=0;await f.service.poll([three],{players:[],games:[{game:'PLO6',limit:{small:5,big:10}}]});assert.equal(f.calls.filter(c=>c.method==='sendMessage').length,1);
 const all={...sub,selectedGames:[],selectedLimits:[]};assert.equal(matches(all,[{...three,playType:'PLO5',blindAnnotation:'25/50'}]).length,1);
});

test('limit categories include their boundaries and all higher limits without changing legacy exact filters',()=>{
 const sub={kind:'game',mode:'selected',selectedGames:['PLO6'],selectedLimits:['low']};
 const hit=value=>matches(sub,[{...base,blindAnnotation:value}]).length;
 assert.equal(hit('1/2'),1);assert.equal(hit('3/6'),1);assert.equal(hit('5/10'),1);assert.equal(hit('10/20'),0);
 sub.selectedLimits=['middle'];assert.equal(hit('10/20'),1);assert.equal(hit('15/30'),1);assert.equal(hit('25/50'),1);assert.equal(hit('30/60'),0);
 sub.selectedLimits=['high'];assert.equal(hit('50/100'),1);assert.equal(hit('1000/2000'),1);assert.equal(hit('25/50'),0);
 sub.selectedLimits=['5/10'];assert.equal(hit('5/10'),1);assert.equal(hit('3/6'),0);
});
