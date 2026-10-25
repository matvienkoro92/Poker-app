import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame,expireTurn,action} from '../scripts/billiards/engine.mjs';
for(const discipline of ['pyramid','pool8']){
 test(discipline+': two skips hand over without foul or score changes; third own skip loses',()=>{
 const s=createGame({discipline});for(let n=0;n<4;n++){assert.ok(expireTurn(s));assert.equal(s.winner,null);assert.equal(s.pending,null);assert.equal(s.turn,(n+1)%2);assert.deepEqual(s.scores,[0,0]);}expireTurn(s);assert.equal(s.winner,1);assert.equal(s.endReason,'timeout-skips');assert.equal(expireTurn(s),false);
 });
 test(discipline+': a valid shot resets own skips; invalid shots and placement do not',()=>{
 const s=createGame({discipline});expireTurn(s);expireTurn(s);assert.equal(action(s,0,{type:'shot',angle:0,power:0}),false);assert.deepEqual(s.missedTurns,[1,1]);assert.ok(action(s,0,{type:'place',x:220,y:250}));assert.deepEqual(s.missedTurns,[1,1]);assert.ok(action(s,0,{type:'shot',angle:0,power:.4}));assert.deepEqual(s.missedTurns,[0,1]);assert.equal(expireTurn(s),false);
 });
}
