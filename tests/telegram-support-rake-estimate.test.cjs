'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {estimate}=require('../lib/telegram-support-rake-estimate');
const periods=[['2026-09-28','2026-10-04',700],['2026-10-05','2026-10-11',1400],['2026-10-12','2026-10-18',2100],['2026-10-19','2026-10-25',2800],['2026-10-26','2026-11-01',3500],['2026-11-02','2026-11-08',4200]].map(([startDate,endDate,amount])=>({startDate,endDate,rake:{123:amount*100}}));
const now=Date.parse('2026-11-14T10:00:00Z');
test('splits boundary weeks by days and adds current partial week only once',()=>{
 const p={syncedAt:Date.parse('2026-11-12T10:00:00Z'),weekCounter:{fee:800}};
 const result=estimate('123',p,periods,now);
 assert.equal(result.rakeMonth,500+4200+800);assert.equal(result.rakePreviousMonth,400+1400+2100+2800+3000);
 // A whole processed week overrides an older profile snapshot from within that week.
 assert.equal(estimate('123',{syncedAt:Date.parse('2026-11-05T10:00:00Z'),weekCounter:{fee:200}},periods,now).rakeMonth,4700);
});
test('does not extrapolate missing weeks or substitute another player',()=>{
 assert.equal(estimate('123',{},periods.filter(p=>p.startDate!=='2026-10-12'),now).rakePreviousMonth,null);
 assert.deepEqual(estimate('',{},periods,now),{rakeMonth:null,rakePreviousMonth:null});
 assert.equal(estimate('999',{},periods,now).rakePreviousMonth,0);
 assert.throws(()=>estimate('123',{},[...periods,periods[0]],now),/Overlapping/);
});
