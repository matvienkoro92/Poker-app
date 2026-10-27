'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {applyOperation,view}=require('../lib/admin-deposits');
const id=n=>'operation_add_amount_'+n;
function setup(){let state=applyOperation(null,{action:'create',requestId:id(1),entry:{room:'P21',playerId:'973892',recipient:'Игрок',bank:'ВТБ',phone:'+79621581046',total:1000000}},'admin').state;return applyOperation(state,{action:'payment',requestId:id(2),entryId:id(1),amount:900000},'admin').state;}
test('additional withdrawal increases total and available, preserves payments and reservations, and is idempotent',()=>{
 const state=setup();state.entries[0].reservations=[{id:id(9),amount:50000}];const original=structuredClone(state.entries[0]);
 const operation={action:'add-amount',requestId:id(3),entryId:id(1),amount:500000};
 const result=applyOperation(state,operation,'manager',1000,'Аня');const entry=view(result.state).entries[0];
 assert.equal(entry.total,1500000);assert.equal(entry.paid,900000);assert.equal(entry.reserved,50000);assert.equal(entry.available,550000);assert.deepEqual(entry.payments,original.payments);assert.deepEqual(entry.reservations,original.reservations);
 assert.equal(entry.changes.at(-1).added,500000);assert.equal(entry.changes.at(-1).before,1000000);assert.equal(entry.changes.at(-1).after,1500000);
 const duplicate=applyOperation(result.state,operation,'manager');assert.equal(duplicate.duplicate,true);assert.equal(duplicate.state.entries[0].total,1500000);
 const next=applyOperation(result.state,{...operation,requestId:id(4),amount:200000},'manager');assert.equal(next.state.entries[0].total,1700000);
});
test('additional withdrawal rejects nonpositive amounts, overflow and archived entries',()=>{
 for(const amount of [0,-100,1.5,10000000000])assert.throws(()=>applyOperation(setup(),{action:'add-amount',requestId:id(3),entryId:id(1),amount},'admin'));
 const state=setup();state.entries[0].archived=true;assert.throws(()=>applyOperation(state,{action:'add-amount',requestId:id(3),entryId:id(1),amount:100},'admin'),/архиве/);
});
