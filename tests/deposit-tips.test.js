'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {applyOperation,view}=require('../lib/admin-deposits');
const now=Date.now(),actor='2144406710';
const base={revision:0,requests:[],entries:[{id:'withdrawal',room:'P21',playerId:'123',total:100000,payments:[],returns:[],reservations:[],createdAt:now}]};
const op={action:'tip',requestId:'tip_request_12345678',playerName:'Игрок',room:'P21',playerId:'123',entryId:'withdrawal',amount:10000};
test('tips link to withdrawals without changing payable balances; retries and cancellation preserve audit',()=>{
 const result=applyOperation(base,op,actor,now);
 assert.equal(applyOperation(result.state,op,actor,now).duplicate,true);
 let report=view(result.state,now,{preset:'all'});
 assert.equal(report.statistics.tips,10000);assert.equal(report.tips.length,1);assert.equal(report.tips[0].createdByName,'Аня');
 assert.equal(report.entries[0].remaining,100000);assert.equal(report.entries[0].tipAmount,10000);
 const cancelled=applyOperation(result.state,{action:'void-tip',operationId:op.requestId,requestId:'cancel_request_123456'},actor,now+1);
 report=view(cancelled.state,now,{preset:'all'});
 assert.equal(report.statistics.tips,0);assert.equal(report.entries[0].tipAmount,0);assert.equal(report.tips[0].voidedBy,actor);
});
test('tips reject another player, missing withdrawal, invalid amounts and allow separate removal',()=>{
 for(const patch of [{playerId:'456'},{room:'X'},{entryId:'missing'},{amount:0},{amount:1.1},{playerName:''}])assert.throws(()=>applyOperation(base,{...op,...patch},actor,now));
 const s=applyOperation(base,{...op,entryId:''},actor,now).state;
 assert.equal(s.tips[0].entryId,'');assert.equal(view(s,now,{preset:'all'}).entries[0].tipAmount,0);
});
