'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fixture=require('./helpers/nards-tournament-fixture.cjs');
test('live semifinals do not publish group announcements',async()=>{
 const sent=[];const f=fixture({notify:async p=>sent.push(p)});
 const t=await f.create({capacity:4,roundTargets:[2,3]});
 for(let i=1;i<=4;i++)await f.call('m'+i,'join',t.id);
 await f.call('m0','draw',t.id);
 assert.equal(sent.filter(p=>p.text.includes('полуфинал')).length,0);
 f.time(t.startsAt);const waiting=await f.call('m0','get',t.id);f.time(waiting.readyUntil);
 await f.service.synchronize(t.id);
 const notices=sent.filter(p=>p.text.includes('полуфинал'));
 assert.equal(notices.length,0);
 await f.service.synchronize(t.id);await f.service.sweep();
 assert.equal(sent.filter(p=>p.text.includes('полуфинал')).length,0);
});
