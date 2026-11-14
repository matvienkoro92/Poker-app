'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {read}=require('../lib/deposit-player-snapshot');
const {matchDeposits}=require('../lib/tracking-deposits');
test('compact player snapshot uses a filtered server read and preserves deposit matching',async()=>{
 let command;
 const state=await read('415786',async commands=>{command=commands[0];return [{result:JSON.stringify({playerAccounts:{},entries:{},channelOperations:[{id:'a',direction:'income',channelId:'prodamus',room:'P21',playerId:'415786',amount:918000,createdAt:1794327933000},{id:'void',direction:'income',room:'P21',playerId:'415786',amount:10000,createdAt:1794327933000,voidedAt:1}],tipCashouts:{}})}];});
 assert.equal(command[0],'EVAL');assert.equal(command[3],'poker21:admin-deposits:v1');assert.equal(command[4],'415786');
 assert.ok(Array.isArray(state.entries));assert.ok(Array.isArray(state.playerAccounts));
 const result=matchDeposits(state,'415786');assert.equal(result.available,true);assert.equal(result.deposits.length,1);assert.equal(result.deposits[0].amount,9180);
});
test('missing ledger and Redis errors remain unavailable instead of becoming zero deposits',async()=>{
 await assert.rejects(read('415786',async()=>[{result:null}]),/unavailable/);
 await assert.rejects(read('415786',async()=>[{error:'failure'}]),/unavailable/);
});
