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
