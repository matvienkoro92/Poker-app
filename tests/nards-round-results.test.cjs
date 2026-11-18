'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fixture=require('./helpers/nards-tournament-fixture.cjs');
test('completed rounds do not send intermediate summaries',async()=>{
 const sent=[],f=fixture({notify:async p=>sent.push(p)}),t=await f.seed(4,{capacity:4,target:1});
 f.time(t.startsAt);const ready=await f.call('m0','get',t.id);f.time(ready.readyUntil);await f.service.synchronize(t.id);
 assert.ok(!sent.some(p=>p.text.includes('Начался полуфинал')));
 const matches=t.rounds[0].matches;
 await f.finish(matches[0].roomId);await f.service.synchronize(t.id);
 assert.equal(sent.filter(p=>p.text.startsWith('🏁 Итоги')).length,0);
 await f.finish(matches[1].roomId,1);await f.service.synchronize(t.id);
 await f.service.synchronize(t.id);await f.service.sweep();
 assert.equal(sent.filter(p=>p.text.startsWith('🏁 Итоги')).length,0);
 assert.ok(!Object.keys(t.notices||{}).some(event=>event.startsWith('round-result:')));
});
