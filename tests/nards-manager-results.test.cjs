'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fixture=require('./helpers/nards-tournament-fixture.cjs');
test('results reach both managers with IDs and prizes; failed manager retries without repeating other deliveries',async()=>{
 const group=[],managers=[];let fail=true;
 const f=fixture({notify:async p=>group.push(p),notifyManager:async(id,p)=>{if(id==='2144406710'&&fail){fail=false;throw Error('temporary');}managers.push({id,p});}});
 const t=await f.create({capacity:2,roundTargets:[2],entryType:'free',prizeKind:'tickets',prizeAmounts:[1000,300]});
 await f.call('m1','join',t.id);await f.call('m2','join',t.id);
 const drawn=await f.call('m0','draw',t.id);f.time(t.startsAt);const waiting=await f.call('m0','get',t.id);f.time(waiting.readyUntil);await f.service.synchronize(t.id);
 await f.finish(drawn.rounds[0].matches[0].roomId,0,2);await f.service.synchronize(t.id);
 assert.equal(managers.length,1);assert.equal(managers[0].id,'1897001087');assert.match(managers[0].p.text,/Poker21 ID: p21-/);assert.match(managers[0].p.text,/1\s000 ₽/);assert.match(managers[0].p.text,/300 ₽/);
 const count=group.length;await f.service.sweep();assert.equal(managers.length,1);
 f.time(f.now()+60001);await f.service.sweep();assert.equal(managers.length,2);assert.equal(managers[1].id,'2144406710');assert.equal(group.length,count);
 await f.service.sweep();assert.equal(managers.length,2);
});
test('opening old completed tournaments does not enqueue historical manager messages',async()=>{
 const sends=[],f=fixture({notify:async()=>{},notifyManager:async(...v)=>sends.push(v)}),t=await f.create();const saved=f.tournaments.get(t.id);saved.status='completed';saved.paymentsSettled=true;saved.notices={created:{sent:true},result:{sent:true}};
 await f.service.synchronize(t.id);assert.equal(sends.length,0);
});
