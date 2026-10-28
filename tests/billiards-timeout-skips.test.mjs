import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame,expireTurn,action,step} from '../scripts/billiards/engine.mjs';
for(const discipline of ['pyramid','pool8']){
 test(discipline+': automatic shot has exactly five percent power and keeps the timeout streak',()=>{
  const s=createGame({discipline});let move;
  assert.ok(expireTurn(s,m=>{move=m;}));assert.equal(move.power,.05);assert.ok(s.moving);assert.equal(s.shot,1);assert.equal(s.missedTurns[0],1);
  const cue=s.balls.find(b=>b.id===s.cueId);assert.ok(Math.abs(Math.hypot(cue.vx,cue.vy)-(180+.05*1250))<1e-8);
  let ticks=0;while(s.moving&&ticks++<7200)step(s);assert.equal(s.moving,false);
 });
 test(discipline+': third own timeout loses without another automatic shot',()=>{
  const s=createGame({discipline});s.missedTurns=[2,0];let calls=0;expireTurn(s,()=>calls++);assert.equal(s.winner,1);assert.equal(s.endReason,'timeout-skips');assert.equal(s.shot,0);assert.equal(calls,0);
 });
 test(discipline+': a manual legal shot resets the timeout streak',()=>{
  const s=createGame({discipline});s.missedTurns=[2,1];assert.ok(action(s,0,{type:'shot',angle:0,power:.4}));assert.deepEqual(s.missedTurns,[0,1]);
 });
 test(discipline+': auto placement precedes a five percent shot with ball in hand',()=>{
  const s=createGame({discipline});s.inHand=true;s.balls[0].pocket=true;let before;
  expireTurn(s,m=>{before=structuredClone(s);assert.equal(m.power,.05);});assert.equal(before.inHand,false);assert.equal(before.balls[0].pocket,false);assert.ok(s.moving);assert.equal(s.missedTurns[0],1);
 });
}
