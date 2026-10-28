'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),stats=require('../lib/admin-game-daily-stats');
const room='ABCDEFGHJK',time=Date.parse('2026-10-25T17:30:00Z');
test('daily archive uses local dates, separates paid/free, and advances bounded source cursors',async()=>{
 const commands=async rows=>rows.map(([op,key])=>op==='HSCAN'?['0',[room+':1:1',JSON.stringify({finishedAt:time})]]:null);
 const page=await stats.read({commands});assert.equal(page.records[0].day,'2026-10-26');assert.equal(page.records[0].paid,false);assert.equal(page.records[0].game,'long');assert.equal(page.next,'1:0');
 const paid=await stats.read({commands,cursor:'1:0'});assert.equal(paid.records[0].paid,true);
 await assert.rejects(stats.read({commands,cursor:'999:0'}),e=>e.status===400);
});
test('old billiards records classify stakes from durable journal and use one event for both players',async()=>{
 const calls=[];const page=await stats.read({cursor:'9:0',commands:async rows=>{calls.push(...rows);return rows.map(([op])=>op==='HSCAN'?['0',[room+':1:1',JSON.stringify({finishedAt:time,room:{id:room}})]]:JSON.stringify({stake:300}));}});
 assert.equal(page.records.length,1);assert.equal(page.records[0].paid,true);assert.equal(page.records[0].game,'pyramid');assert.ok(calls.some(r=>r[1]==='poker_app:billiards:v1:wager:'+room));
});
test('server rejects non-admin stats requests before reading any archive',async()=>{
 const social=require('../lib/club-social'),old=social.context,path=require.resolve('../lib/api-handlers/player-hall');let admin=false;social.context=async()=>({admin,villaAccess:true,body:{action:'game-stats'},accountId:'ID123456'});delete require.cache[path];
 const service=require('../lib/board-games-service'),oldCommands=service.commands;let reads=0;service.commands=async()=>{reads++;return [['0',[]]];};
 try{const handler=require(path),call=async()=>{const res={code:200,status(n){this.code=n;return this;},json(value){this.value=value;return this;}};await handler({},res);return res;};assert.equal((await call()).code,403);assert.equal(reads,0);admin=true;const allowed=await call();assert.equal(allowed.code,200);assert.equal(allowed.value.ok,true);assert.equal(reads,1);}finally{social.context=old;service.commands=oldCommands;delete require.cache[path];}
});
test('rake comes only from a confirmed payout and keeps a stable match identity',async()=>{
 const page=await stats.read({cursor:'1:0',commands:async rows=>rows.map(([op])=>op==='HSCAN'?['0',[room+':1:1',JSON.stringify({finishedAt:time}),room+':1:2',JSON.stringify({finishedAt:time})]]:JSON.stringify({stake:2000,status:'paid',commission:200,finishedAt:time}))});
 assert.equal(page.records.length,2);assert.equal(page.records[0].rake,200);assert.equal(page.records[0].rakeId,page.records[1].rakeId);assert.equal(page.records[0].rakeDay,'2026-10-26');
});
