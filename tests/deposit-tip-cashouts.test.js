'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),{applyOperation,view}=require('../lib/admin-deposits'),{matchDeposits}=require('../lib/tracking-deposits');
let serial=0;const id=()=> 'tips_test_operation_'+(++serial);const A='tg_1897001087',B='tg_2144406710';
function apply(s,b,actor=A,time=Date.now(),permissions={}){return applyOperation(s,{requestId:id(),...b},actor,time,actor===A?'Вика':'Аня',permissions).state;}
function receive(s,amount=100000,room='P21',actor=A,time=Date.now()){return apply(s,{action:'tip',amount,room,playerId:'111',playerName:'Первый игрок'},actor,time);}
function cashout(s,amount=60000,extra={},actor=A,time=Date.now(),permissions={}){return apply(s,{action:'tip-cashout',amount,room:'P21',playerId:'222',playerName:'Второй игрок',...extra},actor,time,permissions);}
test('received tips are player withdrawals, cashouts are deposits, bank withdrawals and cash channels stay untouched',()=>{
 let s=receive(null);s=cashout(s);const v=view(s),m=v.statistics.managers.find(m=>m.id===A);assert.equal(v.statistics.tips,100000);assert.equal(v.statistics.tipsCashedOut,60000);assert.equal(v.statistics.deposits,60000);assert.equal(v.statistics.outgoing,100000);assert.equal(v.statistics.withdrawals.total,100000);assert.equal(v.statistics.withdrawals.paid,100000);assert.equal(v.statistics.cashWithdrawals,0);assert.equal(v.statistics.players.find(p=>p.playerId==='111').withdrawals,100000);assert.equal(v.statistics.players.find(p=>p.playerId==='222').deposits,60000);assert.equal(m.deposits,60000);assert.equal(m.tipsReceived,100000);assert.equal(m.tipsCashedOut,60000);assert.equal(m.destinations.find(d=>d.id==='withdrawals').amount,0);assert.equal(m.destinations.find(d=>d.id==='manager-tips').amount,60000);assert.equal(v.tipAccounts[0].balance,40000);assert.equal(v.entries.length,0);assert.equal(v.channelOperations.length,0);assert.equal(v.paymentForms.providers.reduce((n,p)=>n+(p.total||0),0),0);assert.equal(v.totals.available,0);assert.ok(v.playerDirectory.some(p=>p.playerId==='222'));
});
test('cashouts cannot spend another manager or room balance; explicit cross-room deposit retains source room',()=>{
 let s=receive(null);assert.throws(()=>cashout(s,100001),/остатка/);assert.throws(()=>cashout(s,10000,{managerId:A},B),e=>e.status===403);assert.throws(()=>cashout(s,10000,{room:'X'}),/остатка/);s=cashout(s,60000,{room:'X',tipRoom:'P21'});assert.equal(view(s).tipAccounts[0].balance,40000);assert.equal(s.tipCashouts[0].tipRoom,'P21');assert.equal(view(s).statistics.players.find(p=>p.playerId==='222').room,'X');
});
test('FIFO allocations bind cashouts to receipts, reversals restore balance and spent receipts cannot be voided',()=>{
 let s=receive(null,30000,'P21',A,1000);const first=s.tips[0].id;s=receive(s,70000,'P21',A,2000);s=cashout(s,60000);const row=s.tipCashouts[0];assert.deepEqual(row.tipAllocations.map(p=>p.amount),[30000,30000]);assert.throws(()=>apply(s,{action:'void-tip',operationId:first}),/Сначала отмените/);assert.throws(()=>apply(s,{action:'void-tip-cashout',operationId:row.id},B),e=>e.status===403);s=apply(s,{action:'void-tip-cashout',operationId:row.id});assert.equal(view(s).tipAccounts[0].balance,100000);assert.equal(view(s).statistics.deposits,0);s=apply(s,{action:'void-tip',operationId:first});assert.equal(view(s).tipAccounts[0].balance,70000);assert.equal(view(s).statistics.outgoing,70000);assert.throws(()=>apply(s,{action:'void-tip-cashout',operationId:row.id}),/отменена/);
});
test('balances span all time, but deposits and withdrawals respect the selected period',()=>{
 const yesterday=Date.parse('2026-10-25T12:00Z'),today=Date.parse('2026-10-26T12:00Z');let s=receive(null,100000,'P21',A,yesterday);s=cashout(s,60000,{},A,today);const v=view(s,today,{preset:'custom',from:'2026-10-26',to:'2026-10-26'});assert.equal(v.statistics.tips,0);assert.equal(v.statistics.deposits,60000);assert.equal(v.tipAccounts[0].balance,40000);assert.equal(v.tipAccounts[0].received,100000);assert.equal(v.tips.length,0);assert.equal(v.tipCashouts.length,1);
});
test('duplicate cashout retry is counted once and a second operation cannot overspend',()=>{
 let s=receive(null);const op={action:'tip-cashout',requestId:id(),amount:60000,room:'P21',playerId:'222'};s=applyOperation(s,op,A).state;const again=applyOperation(s,op,A);assert.equal(again.duplicate,true);assert.equal(again.state.tipCashouts.length,1);assert.throws(()=>cashout(s,60000),/остатка/);assert.equal(view(s).tipAccounts[0].balance,40000);
});
test('owner can cash out for a named manager while attribution stays with that manager',()=>{
 let s=receive(null);s=cashout(s,60000,{managerId:A},'owner',Date.now(),{canDelete:true});const row=s.tipCashouts[0];assert.equal(row.managerId,A);assert.equal(row.createdBy,'owner');assert.equal(view(s).statistics.managers.find(m=>m.id===A).deposits,60000);assert.equal(view(s).tipAccounts[0].balance,40000);
});
test('a linked tip is counted once in addition to the withdrawal amount, never added to its payable balance',()=>{
 let s=apply(null,{action:'create',entry:{room:'P21',playerId:'111',recipient:'Игрок',bank:'Банк',phone:'+79998887766',total:500000}});const entryId=s.entries[0].id;s=apply(s,{action:'tip',entryId,room:'P21',playerId:'111',amount:100000});const v=view(s);assert.equal(v.entries[0].remaining,500000);assert.equal(v.entries[0].tipAmount,100000);assert.equal(v.statistics.withdrawals.total,600000);assert.equal(v.statistics.cashWithdrawals+v.statistics.tips,600000);assert.equal(v.statistics.players.find(p=>p.playerId==='111').withdrawals,100000);
});
test('cashed tips appear as a tracked player deposit exactly once, received tips never do',()=>{
 let s=receive(null);s=cashout(s);const deposits=matchDeposits(s,'222').deposits;assert.equal(deposits.length,1);assert.equal(deposits[0].amount,600);assert.equal(matchDeposits(s,'111').deposits.length,0);
});
