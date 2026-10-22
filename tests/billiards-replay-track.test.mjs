import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame,action,step} from '../scripts/billiards/engine.mjs';
import {buildReplay,buildReplayAsync,sampleReplay} from '../scripts/billiards/replay-track.mjs';
for(const discipline of ['pyramid','pool8'])test(`compact ${discipline} replay agrees with authoritative physics and interpolates late frames`,()=>{
 const before=createGame({discipline,seed:44}),move={type:'shot',angle:0,power:.75,cueId:0},track=buildReplay({before,move}),reference=structuredClone(before);
 assert.ok(action(reference,reference.turn,move));let ticks=0;while(reference.moving&&ticks<7200){step(reference);ticks++;}
 assert.deepEqual(track.final,reference);assert.equal(track.durationMs,ticks/120*1000);assert.ok(track.values.byteLength<1200000);
 const display=structuredClone(before);sampleReplay(track,0,display);assert.equal(display.balls[0].x,before.balls[0].x);
 const i=Math.min(15,track.times.length-1),at=track.times[i],exact=structuredClone(before);action(exact,exact.turn,move);for(let n=0;n<i*4;n++)step(exact);
 sampleReplay(track,at,display);for(const ball of display.balls){const expected=exact.balls.find(b=>b.id===ball.id);assert.ok(Math.abs(ball.x-expected.x)<.001);assert.ok(Math.abs(ball.y-expected.y)<.001);}
 sampleReplay(track,track.durationMs+5000,display);assert.equal(display.moving,false);for(const [i,ball]of display.balls.entries()){assert.ok(Math.abs(ball.x-reference.balls[i].x)<.001);assert.equal(ball.pocket,reference.balls[i].pocket);}
});
test('fallback calculation yields to the UI between small physics batches',async()=>{
 let yielded=false;setTimeout(()=>{yielded=true;},0);const track=await buildReplayAsync({before:createGame({seed:12}),move:{type:'shot',angle:0,power:.8}});assert.equal(yielded,true);assert.equal(track.final.moving,false);
});
