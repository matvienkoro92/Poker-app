'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {statisticsRange,view}=require('../lib/admin-deposits');
test('business weeks change Monday at 06:00 Moscow',()=>{
 const before=statisticsRange({preset:'week'},Date.parse('2026-10-19T02:59:59Z'));
 const after=statisticsRange({preset:'week'},Date.parse('2026-10-19T03:00:00Z'));
 assert.equal(before.from,'2026-10-12');assert.equal(after.from,'2026-10-19');
 assert.equal(statisticsRange({preset:'previous-week'},Date.parse('2026-10-19T03:00:00Z')).from,'2026-10-12');
});
test('custom dates include 06:00 start and exclude next 06:00, reconciling manager totals',()=>{
 const range=statisticsRange({preset:'custom',from:'2026-10-18',to:'2026-10-18'});
 assert.equal(range.start,Date.parse('2026-10-18T03:00:00Z'));
 const state={channelOperations:[range.start-1,range.start,range.end-1,range.end].map((createdAt,i)=>({createdAt,amount:100,direction:'income',channelId:'runex',createdBy:String(i),createdByName:'Менеджер'}))};
 const result=view(state,Date.now(),{preset:'custom',from:'2026-10-18',to:'2026-10-18'});
 assert.equal(result.statistics.deposits,200);assert.equal(result.statistics.managers.length,2);
 assert.equal(result.statistics.managers.reduce((n,m)=>n+m.deposits,0),200);
 assert.equal(result.channelOperations.length,4);
 assert.throws(()=>statisticsRange({preset:'custom',from:'2026-02-30',to:'2026-03-01'}));
 assert.throws(()=>statisticsRange({preset:'custom',from:'2026-10-19',to:'2026-10-18'}));
});
test('payout statistics use payment and return dates, preserving current card balances',()=>{
 const start=Date.parse('2026-10-18T03:00:00Z');
 const state={entries:[{id:'entry',total:1000,archived:true,payments:[{amount:100,createdAt:start-1},{amount:200,createdAt:start,createdBy:'anya'}],returns:[{amount:50,createdAt:start,createdBy:'vika'}],reservations:[]}]};
 const result=view(state,start,{preset:'custom',from:'2026-10-18',to:'2026-10-18'});
 assert.equal(result.statistics.deposits,200);assert.equal(result.statistics.returned,50);
 assert.equal(result.entries[0].paid,300);assert.equal(result.entries[0].remaining,650);
 assert.equal(result.statistics.managers.find(m=>m.id==='anya').deposits,200);
});

test('deposits, payment forms and CRM share the exact 06:00 Moscow business day',()=>{
 const {rangeFromInput,mskDateKeyFromMs}=require('../lib/player-crm-utils');
 const {paymentForms}=require('../lib/deposit-payment-forms');
 const range=statisticsRange({preset:'custom',from:'2026-10-18',to:'2026-10-18'}),crm=rangeFromInput({from:'2026-10-18',to:'2026-10-18'});
 assert.equal(range.start,crm.fromMs);assert.equal(range.end,crm.toMs+1);
 for(const now of [range.start-1,range.start,range.end-1,range.end]){
  const today=statisticsRange({preset:'today'},now),forms=paymentForms(now);
  assert.equal(today.from,mskDateKeyFromMs(now));assert.equal(today.start,forms.period.start);assert.equal(today.end,forms.period.end);assert.equal(forms.period.timeZone,'Europe/Moscow');
 }
});

test('yesterday follows the Moscow business cutoff and payment forms use the selected range',()=>{
 const before=statisticsRange({preset:'yesterday'},Date.parse('2026-10-20T02:59:59Z'));
 const after=statisticsRange({preset:'yesterday'},Date.parse('2026-10-20T03:00:00Z'));
 assert.equal(before.from,'2026-10-18');assert.equal(after.from,'2026-10-19');
 const result=view({entries:[],channelOperations:[{channelId:'runex',direction:'income',amount:12300,createdAt:after.start},{channelId:'runex',direction:'income',amount:99900,createdAt:after.end}]},Date.parse('2026-10-20T04:00:00Z'),{preset:'yesterday'});
 assert.equal(result.paymentForms.period.start,after.start);assert.equal(result.paymentForms.period.end,after.end);
 assert.equal(result.paymentForms.providers.find(p=>p.id==='runex').total,12300);
});

test('channel journal filters by the selected period and manager, including exact cutoff boundaries',()=>{
 const fs=require('node:fs'),vm=require('node:vm');
 const source=fs.readFileSync(require.resolve('../app-admin-deposits'),'utf8');
 const start=Date.parse('2026-10-20T03:00:00Z'),end=start+86400000;
 const context={data:{paymentForms:{period:{start,end}}}};
 vm.createContext(context);
 vm.runInContext(source.match(/  function matchesPaymentPeriod\(row\)\{[^\n]+/)[0],context);
 for(const [createdAt,expected] of [[start-1,false],[start,true],[end-1,true],[end,false]])assert.equal(context.matchesPaymentPeriod({createdAt}),expected);
 context.data.paymentForms.period={start:null,end:null};assert.equal(context.matchesPaymentPeriod({createdAt:start-1}),true);
 delete context.data.paymentForms;context.data.statistics={period:{start,end}};assert.equal(context.matchesPaymentPeriod({createdAt:end}),false);
 const journal=source.match(/  function channelHistoryHtml\(id\)\{[^\n]+/)[0];
 assert.match(journal,/matchesPaymentManager\(r\)&&matchesPaymentPeriod\(r\)/);
});
