'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const limit=require('../lib/pokerplus-transfer-limit');
for(const family of ['board','billiards'])test(family+': debit, payout and refund use 5000 chunks with exact totals and safe retries',async()=>{
 const fixture=require('./helpers/'+family+'-wager-fixture.cjs');
 const f=fixture({chunkSize:limit});let room=await f.create(3000);room=await f.call('m2','join',room.roomId);await f.call('m2','move',room.roomId,{revision:room.revision,move:{type:'resign'}});
 assert.deepEqual(f.changes.map(o=>o.chips),[-3000,-3000,5000,700]);await f.call('m1','room',room.roomId);assert.equal(f.changes.length,4);
 const g=fixture({chunkSize:limit});const waiting=await g.create(5000);await g.call('m1','cancel',waiting.roomId);await g.call('m1','cancel',waiting.roomId);assert.deepEqual(g.changes.map(o=>o.chips),[-5000,5000]);
});
function transfer(previous){
 const source=fs.readFileSync(require.resolve('../lib/api-handlers/tournament-bet'),'utf8'),start=source.indexOf('async function changePoker21Amount('),end=source.indexOf('\nmodule.exports = async function handler',start),calls=[];
 const context={crypto,POKER21_CHUNK:limit,redisPipeline:async commands=>{assert.equal(commands[0][0],'GET');return [{result:previous?JSON.stringify({chips:String(previous)}):null}];},processPoker21DirectChange:async op=>calls.push(op)};vm.createContext(context);vm.runInContext(source.slice(start,end),context);return {run:context.changePoker21Amount,calls};
}
test('tournament transfers use 5000 for new operations and preserve legacy part IDs and amounts',async()=>{
 for(const total of [3000,5000,12000,-12000]){const f=transfer();await f.run({chips:total,userId:'1',idempotencyKey:'new'});assert.deepEqual(f.calls.map(o=>o.chips),total===3000?[3000]:total===5000?[5000]:total>0?[5000,5000,2000]:[-5000,-5000,-2000]);}
 const f=transfer(-1000);await f.run({chips:-3000,userId:'1',idempotencyKey:'old'});assert.deepEqual(f.calls.map(o=>o.chips),[-1000,-1000,-1000]);assert.deepEqual(f.calls.map(o=>o.idempotencyKey),['old:part:0','old:part:1','old:part:2']);
});
