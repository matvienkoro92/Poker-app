'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {deposits,reports,acquisition}=require('../lib/telegram-support-card-extras');
test('deposit count, sum, average and most recent date use positive ledger deposits',()=>{
 assert.deepEqual(deposits([{amount:1000,at:'2026-11-01T12:00:00Z'},{amount:2000,at:'2026-11-05T12:00:00Z'},{amount:-100,at:'2026-11-06T12:00:00Z'}]),{deposits:3000,depositCount:2,depositAverage:1500,lastDepositAt:'2026-11-05T12:00:00.000Z'});
 assert.deepEqual(deposits([]),{deposits:0,depositCount:0,depositAverage:0,lastDepositAt:null});
});
test('favorite game uses own report rake and trend compares adjacent complete weeks',()=>{
 const periods=[{startDate:'2026-10-26',endDate:'2026-11-01',rake:{123:10000,999:999999},games:{123:{NLH:10000}}},{startDate:'2026-11-02',endDate:'2026-11-08',rake:{123:15000},games:{123:{PLO6:15000}}}];
 const result=reports('123',periods,Date.parse('2026-11-14T10:00:00Z'));
 assert.equal(result.favoriteGame,'PLO6');assert.equal(result.rakeTrend.percent,50);assert.equal(result.rakeTrend.delta,50);assert.equal(result.rakeTrend.currentStart,'2026-11-02');
 assert.equal(reports('123',[periods[0],{...periods[1],startDate:'2026-11-09'}],Date.parse('2026-11-14T10:00:00Z')).rakeTrend,null);
});
test('acquisition counts unique invitations and selects the earliest saved tracking source',async()=>{
 const cache=new Map();
 const run=async commands=>commands.map(([op,key,...args])=>{
  if(op==='GET')return cache.get(key)||null;
  if(op==='SET'){cache.set(key,args[0]);return 'OK';}
  if(op==='HSCAN')return ['0',['ID000001','ID123456','ID000002','ID123456','ID000001','ID123456','ID123456','ID123456','ID000003','ID999999']];
  if(key==='poker_app:referrals:referrer')return 'ID222222';
  if(key==='poker_app:visitor_chat_display_names')return 'Алексей';
  if(key==='poker_app:attribution:v1:contexts')return JSON.stringify({first:{ref:args[0]==='ID123456'?'new':'old',at:args[0]==='ID123456'?200:100,label:'Метка'}});
  if(key==='poker_app:track_links:meta'){assert.equal(args[0],'old');return JSON.stringify({source:'Telegram',placement:'Канал',campaign:'Ноябрь'});}
  throw Error(op+' '+key);
 });
 const result=await acquisition('ID123456',777,run);
 assert.equal(result.invitedCount,2);assert.equal(result.invitedBy,'Алексей · ID222222');assert.equal(result.source,'Telegram → Канал → Ноябрь');
});
