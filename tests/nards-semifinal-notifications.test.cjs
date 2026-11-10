'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fixture=require('./helpers/nards-tournament-fixture.cjs');
test('each live semifinal is announced once with the correct spectators link',async()=>{
 const sent=[];const f=fixture({notify:async p=>sent.push(p)});
 const t=await f.create({capacity:4,roundTargets:[2,3]});
 for(let i=1;i<=4;i++)await f.call('m'+i,'join',t.id);
 const drawn=await f.call('m0','draw',t.id);
 assert.equal(sent.filter(p=>p.text.includes('полуфинал')).length,0);
 f.time(t.startsAt);const waiting=await f.call('m0','get',t.id);f.time(waiting.readyUntil);
 await f.service.synchronize(t.id);
 const notices=sent.filter(p=>p.text.includes('полуфинал'));
 assert.equal(notices.length,2);
 for(const match of drawn.rounds[0].matches){
  const notice=notices.find(p=>p.reply_markup.inline_keyboard[0][0].url.endsWith('board_watch_'+match.roomId));
  assert.ok(notice);assert.match(notice.text,/Игра до 2 очк/);
 }
 await f.service.synchronize(t.id);await f.service.sweep();
 assert.equal(sent.filter(p=>p.text.includes('полуфинал')).length,2);
});
