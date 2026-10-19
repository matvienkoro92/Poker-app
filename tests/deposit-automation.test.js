'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const quick=require('../deposit-quick-input'),{recentPlayers}=require('../lib/deposit-player-recents');
const {depositPlayerDirectory}=require('../lib/deposit-player-directory');
const directory=depositPlayerDirectory({});
test('quick income resolves Russian alias to correct room and rejects incomplete or ambiguous amount',()=>{
 const p=quick.parse('деп Пряник Х 2000 Рунекс',directory);assert.equal(p.error,'');assert.equal(p.matches.length,1);assert.equal(p.matches[0].playerId,'2728933');assert.equal(p.amount,200000);assert.equal(p.channelId,'runex');
 assert.ok(quick.parse('деп Пряник 2000 Рунекс',directory).error);assert.ok(quick.parse('деп Пряник Х 2000 1000 Рунекс',directory).error);assert.ok(quick.parse('деп Неизвестный Х 2000 Рунекс',directory).error);
 assert.equal(quick.parse('/dep@Poker_dvatuza_bot pryanik2la X 12,50 prodamus',directory).amount,1250);
 const fake=[{nick:'same',room:'X',playerId:'1'},{nick:'same',room:'X',playerId:'2'}];assert.equal(quick.parse('деп same X 100 Рунекс',fake).matches.length,2);
});
test('recent accounts are personal, canonical, ordered and exclude void operations',()=>{
 const state={channelOperations:[{room:'P21',playerId:'398176',amount:100,createdAt:20,createdBy:'tg_2144406710',direction:'income'},{room:'X',playerId:'2728933',amount:100,createdAt:30,createdBy:'2144406710',direction:'income'},{room:'P21',playerId:'11111',createdAt:40,createdBy:'1897001087',direction:'income'},{room:'PP',playerId:'22222',createdAt:50,createdBy:'2144406710',direction:'income',voidedAt:60}]};
 const a=recentPlayers(state,'tg_2144406710');assert.deepEqual(a.map(p=>p.playerId),['2728933','398176']);assert.equal(a[0].profileKey,a[1].profileKey);assert.deepEqual(recentPlayers(state,'1897001087').map(p=>p.playerId),['11111']);assert.equal(recentPlayers(state,'999').length,0);
});
function setup(){const calls=[],store=new Map([['poker_app:admin-deposits:telegram-group','-123']]);let collision=true;const module={exports:{}};
 const redis={isConfigured:()=>true,pipeline:async commands=>commands.map(([op,...a])=>{if(op==='GET')return {result:store.get(a[0])||null};if(op==='SET'){store.set(a[0],a[1]);return {result:'OK'};}if(op==='EVAL'){if(collision){collision=false;return {result:0};}if((store.get(a[2])||'')!==a[3])return {result:0};store.set(a[2],a[4]);return {result:1};}throw Error(op);})};
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/telegram-deposit-income'),'utf8'),{module,exports:module.exports,require:id=>id==='./redis'?redis:id==='./api-auth'?{isAdmin:id=>['2144406710','1897001087'].includes(String(id))}:id==='node:crypto'?require(id):require(require('node:path').resolve(__dirname,'../lib',id)),process:{env:{}},Date,AbortSignal,fetch:async(url,options)=>{calls.push({url,body:JSON.parse(options.body)});return {json:async()=>({ok:true})};}});
 return {...module.exports,store,calls};}
const message=(id=2144406710,chat=-123)=>({message:{message_id:7,text:'деп Пряник Х 2000 Рунекс',from:{id,first_name:'Аня'},chat:{id:chat,type:'supergroup'}}});
test('bot previews only in bound admin group, author confirms once with CAS retry and preserves manager',async()=>{
 const a=setup();assert.equal(await a.handle(message(999),'token','deposit:new'),false);assert.equal(await a.handle(message(2144406710,-999),'token','deposit:new'),false);assert.equal(a.calls.length,0);
 await a.handle(message(),'token','deposit:new');assert.equal(a.store.has('poker21:admin-deposits:v1'),false);
 const button=a.calls.at(-1).body.reply_markup.inline_keyboard[0][0];await a.handle(message(),'token','deposit:new');assert.equal(a.calls.at(-1).body.reply_markup.inline_keyboard[0][0].callback_data,button.callback_data);assert.ok(button.callback_data.length<=64);assert.match(a.calls.at(-1).body.text,/2728933/);
 const cb={callback_query:{id:'cb',from:{id:1897001087},message:{message_id:8,chat:{id:-123,type:'supergroup'}}}};const action=button.callback_data.slice(5);await a.handle(cb,'token',action);assert.equal(a.store.has('poker21:admin-deposits:v1'),false);
 cb.callback_query.from.id=2144406710;await a.handle(cb,'token',action);await a.handle(cb,'token',action);
 const state=JSON.parse(a.store.get('poker21:admin-deposits:v1'));assert.equal(state.channelOperations.length,1);assert.equal(state.channelOperations[0].amount,200000);assert.equal(state.channelOperations[0].room,'X');assert.equal(state.channelOperations[0].createdBy,'tg_2144406710');assert.equal(state.channelOperations[0].createdByName,'Аня');
 const draftKey=[...a.store.keys()].find(k=>k.startsWith(a.PREFIX)),draft=JSON.parse(a.store.get(draftKey));draft.expiresAt=1;a.store.set(draftKey,JSON.stringify(draft));await a.handle(cb,'token',action);assert.match(a.calls.at(-1).body.text,/устарело/);
});
