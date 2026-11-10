'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fixture=require('./helpers/nards-tournament-fixture.cjs');
const {message}=require('../lib/nards-tournament-notifications');
test('round summary waits for every match and is delivered once',async()=>{
 const sent=[],f=fixture({notify:async p=>sent.push(p)}),t=await f.seed(4,{capacity:4,target:1});
 f.time(t.startsAt);const ready=await f.call('m0','get',t.id);f.time(ready.readyUntil);await f.service.synchronize(t.id);
 const matches=t.rounds[0].matches;
 await f.finish(matches[0].roomId);await f.service.synchronize(t.id);
 assert.equal(sent.filter(p=>p.text.startsWith('🏁 Итоги')).length,0);
 await f.finish(matches[1].roomId,1);await f.service.synchronize(t.id);
 const summary=sent.filter(p=>p.text.startsWith('🏁 Итоги'));
 assert.equal(summary.length,1);assert.match(summary[0].text,/Итоги полуфинала/);
 assert.equal((summary[0].text.match(/✅ Дальше:/g)||[]).length,2);
 assert.match(summary[0].text,/1:0/);assert.match(summary[0].text,/0:1/);
 await f.service.synchronize(t.id);await f.service.sweep();
 assert.equal(sent.filter(p=>p.text.startsWith('🏁 Итоги')).length,1);
});
test('maximum round fits Telegram message and handles byes and exclusions',()=>{
 const entries=Array.from({length:64},(_,i)=>({id:String(i),name:'Я'.repeat(80)}));
 const matches=Array.from({length:32},(_,i)=>({playerIds:[String(i*2),String(i*2+1)],scores:[25,24],winnerId:String(i*2)}));
 matches[0].playerIds[1]=null;matches[1].winnerId=null;
 const result=message({id:'t',title:'Т'.repeat(80),entries,rounds:[{matches},{},{},{},{},{}]},'round-result:0');
 assert.ok(result.text.length<=4096);assert.match(result.text,/проход без соперника/);assert.match(result.text,/Оба выбыли/);
});
