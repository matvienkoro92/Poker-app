'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {statisticsRange,view}=require('../lib/admin-deposits');
test('business weeks change Monday at 06:00 Novosibirsk',()=>{
 const before=statisticsRange({preset:'week'},Date.parse('2026-10-18T22:59:59Z'));
 const after=statisticsRange({preset:'week'},Date.parse('2026-10-18T23:00:00Z'));
 assert.equal(before.from,'2026-10-12');assert.equal(after.from,'2026-10-19');
 assert.equal(statisticsRange({preset:'previous-week'},Date.parse('2026-10-18T23:00:00Z')).from,'2026-10-12');
});
test('custom dates include 06:00 start and exclude next 06:00, reconciling manager totals',()=>{
 const range=statisticsRange({preset:'custom',from:'2026-10-18',to:'2026-10-18'});
 assert.equal(range.start,Date.parse('2026-10-17T23:00:00Z'));
 const state={channelOperations:[range.start-1,range.start,range.end-1,range.end].map((createdAt,i)=>({createdAt,amount:100,direction:'income',channelId:'runex',createdBy:String(i),createdByName:'Менеджер'}))};
 const result=view(state,Date.now(),{preset:'custom',from:'2026-10-18',to:'2026-10-18'});
 assert.equal(result.statistics.deposits,200);assert.equal(result.statistics.managers.length,2);
 assert.equal(result.statistics.managers.reduce((n,m)=>n+m.deposits,0),200);
 assert.equal(result.channelOperations.length,4);
 assert.throws(()=>statisticsRange({preset:'custom',from:'2026-02-30',to:'2026-03-01'}));
 assert.throws(()=>statisticsRange({preset:'custom',from:'2026-10-19',to:'2026-10-18'}));
});
test('payout statistics use payment and return dates, preserving current card balances',()=>{
 const start=Date.parse('2026-10-17T23:00:00Z');
 const state={entries:[{id:'entry',total:1000,archived:true,payments:[{amount:100,createdAt:start-1},{amount:200,createdAt:start,createdBy:'anya'}],returns:[{amount:50,createdAt:start,createdBy:'vika'}],reservations:[]}]};
 const result=view(state,start,{preset:'custom',from:'2026-10-18',to:'2026-10-18'});
 assert.equal(result.statistics.deposits,200);assert.equal(result.statistics.returned,50);
 assert.equal(result.entries[0].paid,300);assert.equal(result.entries[0].remaining,650);
 assert.equal(result.statistics.managers.find(m=>m.id==='anya').deposits,200);
});
