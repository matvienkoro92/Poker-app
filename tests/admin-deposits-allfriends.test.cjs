'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const source=fs.readFileSync('app-admin-deposits.js','utf8');
function context(operations=[],manager='all'){const c={data:{entries:[{payments:[{amount:2900000,paymentSource:'allfriends',createdAt:150,createdBy:'a'},{amount:999999,paymentSource:'allfriends',createdAt:150,voidedAt:160}]}],channelOperations:operations},paymentManager:manager,Intl,money:n=>String(n),esc:x=>x};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('  function matchesPaymentManager'),source.indexOf('  function prodamusProviderHtml')),c);return c;}
const forms={period:{start:100,end:200},providers:[]};
test('owner can correct manual operation direction with audit and without changing date, author or amount',()=>{
 const {applyOperation}=require('../lib/admin-deposits');
 const state=applyOperation(null,{action:'channel-operation',requestId:'direction_create_001',channelId:'other',direction:'income',counterparty:'allfriends',amount:1000000,room:'X',playerId:'2465472'},'vika',100,'Вика').state;
 const body={action:'edit-channel-operation',requestId:'direction_correct_001',operationId:state.channelOperations[0].id,editVersion:0,direction:'outgoing',counterparty:'allfriends',amount:1000000,room:'X',playerId:'2465472'};
 assert.throws(()=>applyOperation(state,body,'owner',200),/главному администратору/);
 const fixed=applyOperation(state,body,'owner',200,'Владелец',{canDelete:true}).state;
 assert.equal(fixed.channelOperations.length,1);const row=fixed.channelOperations[0];
 assert.equal(row.direction,'outgoing');assert.equal(row.amount,1000000);assert.equal(row.createdAt,100);assert.equal(row.createdBy,'vika');assert.equal(row.edits[0].before.direction,'income');
});
test('AllFriends outgoing appears under Уход им and reduces the settlement balance',()=>{
 const c=context([{channelId:'other',counterparty:'allfriends',direction:'outgoing',amount:3000000,createdAt:150}]);c.data.entries=[];
 const totals=c.paymentFormsTotals(forms);assert.equal(totals.allfriendsSent,3000000);assert.equal(totals.allfriendsReceived,0);assert.equal(totals.allfriendsBalance,-3000000);
 const html=c.paymentFormsTotalsHtml(forms);assert.match(html,/AllFriends<\/span><b>0/);assert.match(html,/Уход им<\/span><b>−3000000/);assert.match(html,/Итого<\/span><b>-3000000/);
});
test('AllFriends settlement counts both directions, excludes voided, unrelated and out-of-period rows',()=>{const c=context([{channelId:'other',counterparty:'allfriends',direction:'income',amount:1000000,createdAt:150},{channelId:'other',note:'Олл френдс',direction:'outgoing',amount:300000,createdAt:150},{channelId:'other',note:'AllFriends',direction:'income',amount:500000,createdAt:150},{channelId:'other',note:'AllFriends',counterparty:'other',direction:'income',amount:999999,createdAt:150},{channelId:'other',note:'Другое',direction:'income',amount:999999,createdAt:150},{channelId:'other',counterparty:'allfriends',direction:'income',amount:999999,createdAt:99},{channelId:'other',counterparty:'allfriends',direction:'income',amount:999999,createdAt:150,voidedAt:160}]);const totals=c.paymentFormsTotals(forms);assert.equal(totals.allfriendsSent,300000);assert.equal(totals.allfriendsReceived,4400000);assert.equal(totals.allfriendsBalance,4100000);assert.match(c.paymentFormsTotalsHtml(forms),/Уход им/);});
test('opposite and zero balances have correct creditor labels; manager filter applies',()=>{const rows=[{channelId:'other',counterparty:'allfriends',direction:'outgoing',amount:3900000,createdAt:150,createdBy:'a'}];assert.match(context(rows).paymentFormsTotalsHtml(forms),/-1000000/);rows[0].amount=2900000;assert.match(context(rows).paymentFormsTotalsHtml(forms),/Итого<\/span><b>0/);const totals=context(rows,'b').paymentFormsTotals(forms);assert.equal(totals.allfriendsSent,0);assert.equal(totals.allfriendsReceived,0);});
test('server persists explicit counterparty and retains it in edit audit history',()=>{const {applyOperation}=require('../lib/admin-deposits');let state=applyOperation(null,{action:'channel-operation',requestId:'allfriends_create_001',channelId:'other',direction:'income',counterparty:'allfriends',amount:10000,room:'P21',playerId:'123456'},'admin').state;const row=state.channelOperations[0];assert.equal(row.counterparty,'allfriends');state=applyOperation(state,{action:'edit-channel-operation',requestId:'allfriends_edit_001',operationId:row.id,editVersion:0,amount:10000,room:'P21',playerId:'123456',counterparty:'other'},'admin',Date.now(),'Admin',{canDelete:true}).state;assert.equal(state.channelOperations[0].counterparty,'other');assert.equal(state.channelOperations[0].edits[0].before.counterparty,'allfriends');});
test('other deposits accept optional ZP, All Friends or only a comment and preserve edit history',()=>{
 const {applyOperation}=require('../lib/admin-deposits');
 for(const counterparty of ['zp','allfriends','sergeyMarina','owner','other',undefined]){
  let state=applyOperation(null,{action:'channel-operation',requestId:'optional_destination_001',channelId:'other',direction:'income',...(counterparty?{counterparty}:{}),amount:10000,room:'P21',playerId:'123456',note:'Комментарий'},'admin').state;
  assert.equal(state.channelOperations[0].counterparty,counterparty);
  assert.equal(state.channelOperations[0].note,'Комментарий');
  state=applyOperation(state,{action:'edit-channel-operation',requestId:'optional_destination_edit',operationId:state.channelOperations[0].id,editVersion:0,amount:10000,room:'P21',playerId:'123456',counterparty:'zp',note:'Комментарий'},'admin',Date.now(),'Admin',{canDelete:true}).state;
  assert.equal(state.channelOperations[0].counterparty,'zp');
  assert.equal(state.channelOperations[0].edits[0].before.counterparty,counterparty||null);
 }
});
test('other deposit form offers optional destinations and does not classify ZP as All Friends',()=>{
 const c=context();const html=c.allFriendsField('other','zp');
 assert.match(html,/value="zp" data-counterparty-fallback/);assert.match(html,/>All friends</);assert.match(html,/>Сергей\/Марина</);assert.match(html,/>Владельцу</);assert.doesNotMatch(html,/required/);
 assert.equal(c.isAllFriendsOperation({channelId:'other',counterparty:'zp',note:'AllFriends'}),false);
});
test('counterparty mini blocks omit zeros and include both directions even at zero net balance',()=>{
 const c=context();c.data.entries=[];
 assert.doesNotMatch(c.paymentFormsTotalsHtml(forms),/AllFriends|Сергей\/Марина|Рома PPC|Владелец/);
 c.data.entries=[{payments:[{amount:10000,paymentSource:'romaPpc',createdAt:150,createdBy:'a'}]}];
 c.data.channelOperations=[{channelId:'other',counterparty:'romaPpc',direction:'outgoing',amount:10000,createdAt:150,createdBy:'a'},{channelId:'other',counterparty:'sergeyMarina',direction:'income',amount:2500,createdAt:150,createdBy:'a'},{channelId:'other',counterparty:'owner',direction:'outgoing',amount:500,createdAt:150,createdBy:'a'},{channelId:'other',counterparty:'romaPpc',direction:'income',amount:99999,createdAt:200,createdBy:'a'}];
 const totals=c.paymentFormsTotals(forms);assert.equal(totals.withdrawals,10000);assert.equal(totals.sources.player,0);assert.equal(totals.settlements.romaPpc.received,10000);assert.equal(totals.settlements.romaPpc.sent,10000);
 const html=c.paymentFormsTotalsHtml(forms);assert.match(html,/Рома PPC/);assert.match(html,/Сергей\/Марина/);assert.match(html,/Владелец/);assert.doesNotMatch(html,/AllFriends/);
 c.paymentManager='b';assert.doesNotMatch(c.paymentFormsTotalsHtml(forms),/Рома PPC|Сергей\/Марина|Владелец/);
});
test('Roma PPC and Sergey/Marina payouts close reservations without creating player deposits',()=>{
 const {applyOperation,view}=require('../lib/admin-deposits');
 for(const source of ['romaPpc','sergeyMarina']){
 let s=applyOperation(null,{action:'create',requestId:'external_create_001',entry:{room:'P21',playerId:'123456',recipient:'Иван Петров',bank:'Сбербанк',phone:'+79991234567',total:100000}},'a',100).state;
 const id=s.entries[0].id;
 s=applyOperation(s,{action:'reserve',requestId:'external_reserve_001',entryId:id,amount:100000},'a',110).state;
 s=applyOperation(s,{action:'confirm-reservation',requestId:'external_confirm_001',entryId:id,reservationId:'external_reserve_001',amount:100000,paymentSource:source},'a',120).state;
 let v=view(s,130);assert.equal(v.entries[0].remaining,0);assert.equal(v.statistics.deposits,0);assert.equal(v.statistics.outgoing,100000);assert.equal(v.statistics[source+'Paid'],100000);assert.equal(v.statistics.managers[0].deposits,0);assert.equal(v.statistics.managers[0][source+'Paid'],100000);
 s=applyOperation(s,{action:'void',requestId:'external_void_001',entryId:id,paymentId:'external_confirm_001'},'a',140).state;
 v=view(s,150);assert.equal(v.entries[0].remaining,100000);assert.equal(v.statistics[source+'Paid'],0);assert.equal(v.statistics.outgoing,0);
 }
});
test('Roma PPC can be saved and edited as an Other counterparty',()=>{
 const {applyOperation}=require('../lib/admin-deposits');
 let s=applyOperation(null,{action:'channel-operation',requestId:'roma_other_create_001',channelId:'other',counterparty:'romaPpc',direction:'income',amount:10000,room:'X',playerId:'2465472'},'a',100).state;
 assert.equal(s.channelOperations[0].counterparty,'romaPpc');
 s=applyOperation(s,{action:'edit-channel-operation',requestId:'roma_other_edit_001',operationId:s.channelOperations[0].id,editVersion:0,channelId:'other',counterparty:'romaPpc',amount:20000,room:'X',playerId:'2465472'},'a',110,'Администратор',{canDelete:true}).state;
 assert.equal(s.channelOperations[0].amount,20000);assert.equal(s.channelOperations[0].counterparty,'romaPpc');
});
