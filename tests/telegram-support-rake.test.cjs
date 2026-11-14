'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {periods,calculate,read}=require('../lib/telegram-support-rake');
const snapshot=(date,total,today)=>({date,totalCounter:{fee:total},todayCounter:{fee:today}});
test('rake uses Monday weeks and calendar months in Moscow',()=>{
 assert.deepEqual(periods(Date.parse('2026-11-01T21:30:00Z')),{today:'2026-11-02',week:'2026-11-02',month:'2026-11-01',previous:'2026-10-01'});
 assert.equal(periods(Date.parse('2027-01-01T10:00:00Z')).previous,'2026-12-01');
});
test('monthly rake uses lifetime baselines at midnight, including full previous month',()=>{
 const now=Date.parse('2026-11-14T10:00:00Z');
 const p={syncedAt:now,totalCounter:{fee:20000},weekCounter:{fee:1500}};
 const result=calculate(p,{'2026-11-01':snapshot('2026-11-01',15000,1000),'2026-10-01':snapshot('2026-10-01',6000,1000)},now);
 assert.deepEqual(result,{rakeWeek:1500,rakeMonth:6000,rakePreviousMonth:9000});
});
test('first day, leap February and missing boundaries never produce misleading partial sums',()=>{
 const now=Date.parse('2024-03-01T00:00:00Z');
 const p={syncedAt:now,totalCounter:{fee:1000},todayCounter:{fee:20}};
 const result=calculate(p,{'2024-02-01':snapshot('2024-02-01',100,10)},now);
 assert.equal(result.rakeMonth,20);assert.equal(result.rakePreviousMonth,890);assert.equal(result.rakeWeek,null);
 assert.equal(calculate(p,{},now).rakePreviousMonth,null);
 const stale={...p,syncedAt:Date.parse('2024-02-28T00:00:00Z')};assert.equal(calculate(stale,{},now).rakeMonth,null);
});
test('reads only the three required boundary snapshots',async()=>{
 let command;const now=Date.parse('2026-11-14T10:00:00Z');
 await read('ID123456',{syncedAt:now},async commands=>{command=commands[0];return [[null,null,null]];},now);
 assert.deepEqual(command,['HMGET','poker_app:pokerplus_profile_snapshots:ID123456','2026-11-09','2026-11-01','2026-10-01']);
});
