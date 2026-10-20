'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {eventForOperation,poker21Anchor}=require('../lib/deposit-player-notifications');
const now=Date.parse('2026-10-20T12:00Z');
const entry=(extra={})=>({id:'withdrawal_123456789',room:'P21',playerId:'123456',total:1000000,payments:[],reservations:[],createdAt:now,...extra});
function event(e,action,extra={}){return eventForOperation({entries:[e]},{action,entryId:e.id,requestId:action==='create'?e.id:'operation_123456',...extra},now);}
test('creation shows withdrawal amount and balance without bank, owner, manager or internal comments',()=>{
 const result=event(entry({recipient:'Тайный получатель',bank:'Тайный банк',card:'1234567890123456',note:'Эксчип, оплачено владельцем'}),'create');
 assert.match(result.text,/Заявка на вывод принята: 10\s000 ₽/);assert.match(result.text,/Осталось по заявке: 10\s000 ₽/);
 assert.doesNotMatch(result.text,/Тайный|1234567890123456|эксчип|владельц/i);
});
test('all payment sources have identical player-facing messages, including partial and final payouts',()=>{
 const messages=['player','owner','exchip'].map(source=>event(entry({payments:[{id:'operation_123456',amount:300000,paymentSource:source,channelId:source,note:'служебное'}]}),'confirm-reservation').text);
 assert.equal(new Set(messages).size,1);assert.match(messages[0],/Выплачено: 3\s000 ₽/);assert.match(messages[0],/Осталось по заявке: 7\s000 ₽/);
 assert.match(event(entry({payments:[{id:'operation_123456',amount:1000000}]}),'payment').text,/Вывод закрыт/);
});
test('reservation, release, void, return, correction and cancellation have factual messages',()=>{
 const e=entry({reservations:[{id:'reserve_1',amount:200000,channelId:'exchip'}],payments:[{id:'payment_1',amount:300000,voidedAt:now}],returns:[{id:'return_1',amount:100000,voidedAt:now}]});
 for(const [action,extra,pattern] of [['reserve',{requestId:'reserve_1'},/Готовится выплата/],['release-reservation',{reservationId:'reserve_1'},/Подготовка выплаты отменена/],['void',{paymentId:'payment_1'},/Выплата отменена/],['return',{requestId:'return_1'},/отмечен возврат в кассу/],['void-return',{returnId:'return_1'},/Возврат в кассу отменён/],['adjust',{},/Сумма заявки.*изменена/],['delete',{},/Заявка на вывод отменена/]]){
  const result=event(e,action,extra);assert.match(result.text,pattern);assert.doesNotMatch(result.text,/эксчип|владельц|служебное/i);
 }
 assert.equal(event(e,'archive'),null);assert.equal(event(e,'channel-operation'),null);
});
test('other rooms require explicit saved account links, never matching nicknames or numeric IDs',()=>{
 assert.equal(poker21Anchor({},entry({room:'X'})),'');
 const state={playerAccounts:[{profileKey:'P21|987654',room:'X',playerId:'123456'}]};assert.equal(poker21Anchor(state,entry({room:'X'})),'987654');
 state.playerAccounts.push({profileKey:'P21|111111',room:'X',playerId:'123456'});assert.equal(poker21Anchor(state,entry({room:'X'})),'');
});
function mocked({binding='ID123456',forward='123456',primary='tg_42',aliases=['tg_42'],owners={tg_42:'ID123456'},sendResults=[{ok:true}]}={}){
 const mod={exports:{}},events=new Map([['evt',JSON.stringify({...entry(),id:'evt',text:'Вывод'})]]),locks=new Map(),calls=[],sends=[];
 const redis={pipeline:async commands=>commands.map(c=>{calls.push(c);let result=null;
  if(c[0]==='HGET'){if(c[1].endsWith('accounts_by_user_id'))result=binding;else if(c[1]==='poker_app:pokerplus_user_ids')result=forward;else if(c[1]==='poker_app:id_to_user')result=primary;else if(c[1]==='poker_app:visitor_dt_ids')result=owners[c[2]];else result=events.get(c[2])||null;}
  else if(c[0]==='SMEMBERS')result=aliases;
  else if(c[0]==='GET')result=JSON.stringify({entries:[]});
  else if(c[0]==='SET'){if(!locks.has(c[1])){locks.set(c[1],c[2]);result='OK';}}
  else if(c[0]==='HDEL')events.delete(c[2]);
  else if(c[0]==='EVAL'){if(locks.get(c[3])===c[4])locks.delete(c[3]);}
  else if(c[0]==='ZADD'||c[0]==='ZREM')result=1;
  else if(c[0]==='ZRANGEBYSCORE')result=[...events.keys()];
  else throw Error('Unexpected '+c[0]);return {result};})};
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/deposit-player-notifications'),'utf8'),{module:mod,exports:mod.exports,require:id=>id==='./redis'?redis:id==='./admin-deposits'?require('../lib/admin-deposits'):id==='./account-canonical'?{canonicalAccountId:async id=>id}:id==='./telegram-group-policy'?{guardedFetch:async(url,options)=>{sends.push(JSON.parse(options.body));return {json:async()=>sendResults.shift()||{ok:true}};}}:require(id),AbortSignal,Intl});
 return {api:mod.exports,calls,sends,events};
}
test('recipient must have a verified current Poker21 binding and current Telegram ownership',async()=>{
 assert.equal(await mocked().api.recipient({},entry()),'42');
 assert.equal(await mocked({forward:'wrong'}).api.recipient({},entry()),'');
 assert.equal(await mocked({owners:{tg_42:'ID999999'}}).api.recipient({},entry()),'');
 assert.equal(await mocked({primary:'mail_1',aliases:['tg_42','tg_43'],owners:{tg_42:'ID123456',tg_43:'ID123456'}}).api.recipient({},entry()),'');
 assert.equal(await mocked({primary:'mail_1'}).api.recipient({},entry()),'42');
});
test('concurrent workers and a completed event do not send duplicate notifications',async()=>{
 const m=mocked();await Promise.all([m.api.deliver('evt','token',now),m.api.deliver('evt','token',now)]);await m.api.deliver('evt','token',now);
 assert.equal(m.sends.length,1);assert.equal(m.sends[0].chat_id,'42');assert.equal(m.events.size,0);
});
test('Telegram errors retain the event for retry; blocked bots and missing bindings are skipped',async()=>{
 const m=mocked({sendResults:[{ok:false,error_code:429,parameters:{retry_after:120}},{ok:true}]});assert.equal(await m.api.deliver('evt','token',now),false);assert.equal(m.events.size,1);assert.ok(m.calls.some(c=>c[0]==='ZADD'&&c[2]===now+120000));await m.api.deliver('evt','token',now+120000);assert.equal(m.events.size,0);
 const blocked=mocked({sendResults:[{ok:false,error_code:403}]});await blocked.api.deliver('evt','token');assert.equal(blocked.events.size,0);
 const unbound=mocked({forward:'other'});await unbound.api.deliver('evt','token');assert.equal(unbound.sends.length,0);
});

test('pending events are delivered in queue order so a payment follows creation',async()=>{
 const m=mocked();m.events.set('evt2',JSON.stringify({...entry(),id:'evt2',text:'Выплачено'}));
 const result=await m.api.retryPending('token',now);assert.equal(result.sent,2);assert.deepEqual(m.sends.map(s=>s.text),['Вывод','Выплачено']);
});
