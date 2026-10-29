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
 try{const handler=require(path),call=async()=>{const res={code:200,status(n){this.code=n;return this;},json(value){this.value=value;return this;}};await handler({},res);return res;};assert.equal((await call()).code,403);assert.equal(reads,0);admin=true;const allowed=await call();assert.equal(allowed.code,200);assert.equal(allowed.value.ok,true);assert.equal(reads,3);}finally{social.context=old;service.commands=oldCommands;delete require.cache[path];}
});
test('rake comes only from a confirmed payout and keeps a stable match identity',async()=>{
 const page=await stats.read({cursor:'1:0',commands:async rows=>rows.map(([op])=>op==='HSCAN'?['0',[room+':1:1',JSON.stringify({finishedAt:time}),room+':1:2',JSON.stringify({finishedAt:time})]]:JSON.stringify({stake:2000,status:'paid',commission:200,finishedAt:time}))});
 assert.equal(page.records.length,2);assert.equal(page.records[0].rake,200);assert.equal(page.records[0].rakeId,page.records[1].rakeId);assert.equal(page.records[0].rakeDay,'2026-10-26');
});
test('legacy series reuse one wager read per room for classification and rake',async()=>{
 const calls=[];const page=await stats.read({cursor:'9:0',commands:async rows=>{calls.push(...rows);return rows.map(([op])=>op==='HSCAN'?['0',[room+':1:1',JSON.stringify({finishedAt:time}),room+':1:2',JSON.stringify({finishedAt:time})]]:JSON.stringify({stake:300,status:'paid',commission:30,finishedAt:time}));}});
 assert.equal(page.records.length,2);assert.equal(page.records[0].rake,30);assert.equal(calls.filter(r=>r[0]==='GET').length,1);
});

test('indexed period reads request only matching dates and never scan the archive',async()=>{
 const calls=[],now=Date.parse('2026-10-29T00:00:00+07:00');
 const commands=async rows=>{calls.push(...rows);return rows.map(([op])=>{if(op==='GET')return '1';if(op==='ZRANGEBYSCORE')return [room+':1:1'];if(op==='HMGET')return [JSON.stringify({finishedAt:time})];throw Error('Unexpected '+op);});};
 const page=await stats.read({commands,period:'7',now});assert.equal(page.records.length,1);assert.equal(page.records[0].day,'2026-10-26');assert.equal(calls.some(r=>r[0]==='HSCAN'),false);
 const range=calls.find(r=>r[0]==='ZRANGEBYSCORE');assert.equal(range[2],Date.parse('2026-10-23T00:00:00+07:00'));assert.equal(range[3],Date.parse('2026-10-30T00:00:00+07:00')-1);
 calls.length=0;await stats.read({commands,period:'30',now});assert.equal(calls.find(r=>r[0]==='ZRANGEBYSCORE')[2],Date.parse('2026-09-30T00:00:00+07:00'));
 await assert.rejects(stats.read({commands,period:'999',now}),e=>e.status===400);
});
test('one-time backfill indexes older dates but excludes them before journal reads',async()=>{
 const calls=[],now=Date.parse('2026-10-29T00:00:00+07:00'),old=Date.parse('2026-09-01T00:00:00Z');
 const commands=async rows=>{calls.push(...rows);return rows.map(([op])=>op==='GET'?null:op==='HSCAN'?['0',[room+':1:1',JSON.stringify({finishedAt:old})]]:1);};
 const page=await stats.read({commands,period:'7',now});assert.deepEqual(page.records,[]);assert.equal(page.preparing,true);assert.ok(calls.some(r=>r[0]==='ZADD'));assert.ok(calls.some(r=>r[0]==='SET'&&r[1].endsWith(':by-time-ready')));assert.equal(calls.filter(r=>r[0]==='GET').length,1);
});
test('current month starts at midnight in Novosibirsk and omits rake lookups when requested',async()=>{
 const index=require('../lib/admin-game-period-index'),previous=index.page,calls=[];let range;
 index.page=async options=>{range=options;return {scan:['0',[room+':1:1',JSON.stringify({finishedAt:Date.parse('2026-09-30T16:59:59Z')}),room+':1:2',JSON.stringify({finishedAt:Date.parse('2026-09-30T17:00:00Z')}),room+':1:3',JSON.stringify({finishedAt:Date.parse('2026-10-29T01:00:00Z')})]],mode:'range'};};
 try{const page=await stats.read({commands:async rows=>{calls.push(...rows);return [];},cursor:'1:0',period:'month',includeRake:false,now:Date.parse('2026-10-29T02:00:00Z')});assert.equal(range.start,Date.parse('2026-09-30T17:00:00Z'));assert.equal(page.records.length,2);assert.ok(page.records.every(r=>r.paid&&!Object.hasOwn(r,'rake')));assert.equal(calls.length,0);}finally{index.page=previous;}
});
