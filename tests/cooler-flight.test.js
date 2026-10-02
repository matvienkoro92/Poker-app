'use strict';
const test=require('node:test');const assert=require('node:assert/strict');
const E=require('../app-cooler-flight-engine');const {fixture,fly}=require('./helpers/cooler-flight-fixture.cjs');
test('fixed-step flight is repeatable and legitimate flights replay to the same score',()=>{
  for(const seed of [0,1,123456,4294967295]){const {s,taps}=fly(seed);assert.ok(s.score>=3);assert.deepEqual(E.replay(seed,taps,s.tick),s);}
});
test('replay rejects fabricated duration, reordered taps, taps after collision and unfinished flights',()=>{
  const {s,taps}=fly(44);assert.throws(()=>E.replay(44,taps,s.tick+1));assert.throws(()=>E.replay(44,[0,1],100));assert.throws(()=>E.replay(44,[-1],100));assert.throws(()=>E.replay(44,[],2));assert.throws(()=>E.replay(44,[...taps,s.tick],s.tick));assert.throws(()=>E.replay(44,[],E.MAX_TICKS+1));
});
test('simulation keeps generating reachable-sized gaps and stops at the ceiling or felt',()=>{
  const s=E.create(8);while(s.alive)E.step(s,false);assert.ok(s.y+16>E.FLOOR);const a=E.create(8);while(a.alive)E.step(a,a.tick%7===0);assert.ok(a.y-16<24);
  const hard=E.create(812);hard.score=100;E.step(hard,false);assert.equal(hard.obstacles[0].gap,158);assert.ok(hard.obstacles[0].center>=180 && hard.obstacles[0].center<=350);
});
test('server requires identity, binds a run to its owner, verifies score and consumes once',async()=>{
  const f=fixture();assert.equal((await f.request({action:'start'},'')).status,401);
  const {data:run}=await f.request({action:'start'});const {s,taps}=fly(run.seed);f.advance(s.tick*1000/60+100);
  assert.equal((await f.request({action:'finish',runId:run.runId,ticks:s.tick,taps},'Bob')).status,409);
  const result=await f.request({action:'finish',runId:run.runId,ticks:s.tick,taps,score:999999});assert.equal(result.status,200);assert.equal(result.data.score,s.score);assert.equal(f.top.get('Alice'),s.score);
  assert.equal((await f.request({action:'finish',runId:run.runId,ticks:s.tick,taps})).status,409);
});
test('fast fabricated flights and malformed replays do not enter the leaderboard',async()=>{
  const f=fixture();const {data:run}=await f.request({action:'start'});const {s,taps}=fly(run.seed);
  assert.equal((await f.request({action:'finish',runId:run.runId,ticks:s.tick,taps})).status,400);
  assert.equal((await f.request({action:'finish',runId:run.runId,ticks:10,taps:[4,2]})).status,400);assert.equal(f.top.size,0);
});
test('duel joins are idempotent, share seed/countdown, reject third players and hide private identifiers',async()=>{
  const f=fixture();const host=(await f.request({action:'create'})).data;const guest=(await f.request({action:'join',roomId:host.roomId},'Bob')).data;
  assert.equal(host.seed,guest.seed);assert.ok(guest.startAt);const again=(await f.request({action:'join',roomId:host.roomId},'Bob')).data;assert.equal(again.runId,guest.runId);
  assert.equal((await f.request({action:'join',roomId:host.roomId},'Carol')).status,409);assert.equal((await f.request({action:'room',roomId:host.roomId},'Carol')).status,403);
  const state=(await f.request({action:'room',roomId:host.roomId})).data;assert.equal(state.startAt,guest.startAt);assert.equal(state.opponentName,'Bob');assert.equal(state.opponentRunId,undefined);
});
test('live updates never award points; validated results determine duel winner and forfeit cannot overwrite finish',async()=>{
  const f=fixture();const host=(await f.request({action:'create'})).data;const guest=(await f.request({action:'join',roomId:host.roomId},'Bob')).data;
  await f.request({action:'progress',runId:guest.runId,tick:10,y:20,score:999},'Bob');assert.equal(f.top.size,0);
  const {s,taps}=fly(host.seed);f.advance(5000+s.tick*1000/60+100);
  await f.request({action:'finish',runId:host.runId,ticks:s.tick,taps});await f.request({action:'abandon',runId:guest.runId},'Bob');
  const state=(await f.request({action:'room',roomId:host.roomId})).data;assert.equal(state.result,'win');assert.equal(state.opponent.forfeited,true);
  assert.equal((await f.request({action:'progress',runId:host.runId,tick:1,score:999})).status,409);assert.equal((await f.request({action:'abandon',runId:host.runId})).status,409);assert.equal(f.top.get('Alice'),s.score);
});
test('missing storage reports unavailable, without accepting unverified records',async()=>{const f=fixture();f.setConfigured(false);assert.equal((await f.request({action:'start'})).status,503);});
