'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const {pages}=require('../lib/telegram-player-withdrawals');
const commands=require('../lib/telegram-club-commands');
const entry={id:'a',room:'P21',playerId:'208238',total:100000,payments:[{amount:30000}],createdAt:Date.parse('2026-10-20T18:17:45Z')};
test('command is private, exact and accepts the own bot mention',()=>{
 for(const text of ['/вывод','/вывод@Poker_dvatuza_bot','/выводы'])assert.equal(commands.command({message:{text,chat:{type:'private'}}}),'player-withdrawals');
 for(const text of ['/вывод@Other_bot','/вывод 208238'])assert.equal(commands.command({message:{text,chat:{type:'private'}}}),null);
 assert.equal(commands.command({message:{text:'/вывод',chat:{type:'group'}}}),null);
});
test('only own open Poker21 withdrawals are shown without payment details',()=>{
 const text=pages({entries:[entry,{...entry,playerId:'999999'},{...entry,room:'X'},{...entry,deletedAt:1},{...entry,archived:true},{...entry,total:30000}]},'208238').join('\n');
 assert.equal((text.match(/Актуальная заявка/g)||[]).length,1);assert.match(text,/Выплачено по заявке: 300/);assert.match(text,/Осталось по заявке: 700/);assert.doesNotMatch(text,/999999/);assert.doesNotMatch(text,/По Х-покеру данных/);
 assert.match(pages({entries:[]},'208238')[0],/Актуальных выводов по вашим связанным аккаунтам нет/);
 assert.throws(()=>pages({},'208238'));
 assert.ok(pages({entries:Array.from({length:100},()=>entry)},'208238').every(p=>p.length<4096));
});
function mock({bound='ID123456',playerId='208238',broken=false}={}){
 const sent=[],reads=[],mod={exports:{}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/telegram-player-withdrawals'),'utf8'),{module:mod,require:id=>id==='./redis'?{pipeline:async cmds=>{reads.push(...cmds);if(broken)throw Error('offline');return cmds.map(c=>({result:c[1]==='poker_app:visitor_dt_ids'?bound:c[1]==='poker_app:pokerplus_user_ids'?playerId:JSON.stringify({entries:[entry]})}));}}:id==='./account-canonical'?{canonicalAccountId:async a=>a}:id==='./admin-deposits'?require('../lib/admin-deposits'):id==='./deposit-player-notifications'?require('../lib/deposit-player-notifications'):require(id),Intl,AbortSignal,fetch:async(url,opts)=>{sent.push(JSON.parse(opts.body));return {json:async()=>({ok:true})};}});
 return {api:mod.exports,sent,reads};
}
const update={message:{text:'/вывод',from:{id:42},chat:{id:42,type:'private'}}};
test('handler uses sender binding and refuses groups or another chat',async()=>{
 const m=mock();assert.equal(await m.api.handle(update,'token'),true);assert.match(m.sent[0].text,/ID 208238/);assert.equal(m.reads[0][2],'tg_42');
 assert.equal(await m.api.handle({message:{...update.message,chat:{id:43,type:'private'}}},'token'),false);
 assert.equal(await m.api.handle({message:{...update.message,chat:{id:-1,type:'group'}}},'token'),false);
 assert.equal(m.sent.length,1);
});
test('unbound accounts and storage failures do not report no withdrawals',async()=>{
 for(const config of [{bound:''},{playerId:''},{broken:true}]){const m=mock(config);await m.api.handle(update,'token');assert.doesNotMatch(m.sent[0].text,/выводов на Poker21 нет/);assert.match(m.sent[0].text,/привяжите|Не удалось/);}
});


test('all rooms use explicit links in either direction and reject ambiguous or unlinked accounts',()=>{
 const linked=[{profileKey:'P21|208238',room:'X',playerId:'2299644'},
 {profileKey:'X|2299644',room:'Supr',playerId:'supr1'},
 {profileKey:'PP|pp1',room:'P21',playerId:'208238'}];
 const entries=[entry,...[['X','2299644'],['Supr','supr1'],['PP','pp1'],['X','unlinked'],['X','208238']].map(([room,playerId])=>({...entry,room,playerId}))];
 const text=pages({entries,playerAccounts:linked},'208238').join('\n');
 assert.equal((text.match(/Актуальная заявка/g)||[]).length,4);
 for(const label of ['Poker21 · ID 208238','Х-покер · ID 2299644','Suprema · ID supr1','PPpoker · ID pp1'])assert.ok(text.includes(label));
 assert.doesNotMatch(text,/unlinked|Х-покер · ID 208238/);
 const conflict=pages({entries,playerAccounts:[...linked,{profileKey:'P21|999999',room:'X',playerId:'2299644'}]},'208238').join('\n');
 assert.doesNotMatch(conflict,/2299644|supr1|pp1/);
});

test('withdrawal includes dated payment breakdown and excludes cancelled payments and internal details',()=>{
 const e={...entry,payments:[{amount:20000,createdAt:Date.parse('2026-10-20T19:00:00Z'),note:'secret',paymentSource:'owner'}, {amount:10000,createdAt:Date.parse('2026-10-20T18:30:00Z')},{amount:9000,createdAt:Date.parse('2026-10-20T19:01:00Z'),voidedAt:1}]};
 const text=pages({entries:[e]},'208238').join('\n');
 assert.match(text,/Выплачено по заявке: 300/);
 assert.match(text,/Платежи:\n1\. 20.10, 21:30:00 МСК — 100\n2\. 20.10, 22:00:00 МСК — 200/);
 assert.doesNotMatch(text,/secret|owner|90|₽/);
 assert.match(pages({entries:[{...entry,payments:[]}]},'208238')[0],/Платежей пока нет/);
 const many={...entry,total:1000000,payments:Array.from({length:150},()=>({amount:100,createdAt:entry.createdAt}))};
 const result=pages({entries:[many]},'208238');assert.ok(result.length>1);assert.ok(result.every(p=>p.length<4096));assert.match(result.join('\n'),/150\./);
});
