import test from 'node:test';import assert from 'node:assert/strict';
import {createBackgammon,backgammonRoll,backgammonMove,backgammonLegal,backgammonPipTotals} from '../scripts/board-games/backgammon.mjs';
function setup(variant){const s=createBackgammon('long',{variant});s.phase='roll';s.opening=false;s.turns=[1,1];return s;}
test('crazy double progresses through six while ordinary long ends after four steps',()=>{
 for(const variant of ['classic','crazy']){const s=setup(variant);assert.equal(backgammonRoll(s,0,[4,4]),true);let count=0;while(s.turn===0&&s.winner===null&&count<30){const move=backgammonLegal(s)[0];assert.ok(move);assert.equal(backgammonMove(s,0,move),true);count++;}assert.ok(count<=12);assert.equal(backgammonPipTotals(s,0).rolled,variant==='crazy'?60:16);if(variant==='classic')assert.ok(count<=4);}
});
test('blocked crazy chain burns remaining moves and passes turn',()=>{const s=setup('crazy');s.points=Array(24).fill(0);s.points[0]=15;for(let i=1;i<=6;i++)s.points[i]=-1;s.points[12]=-9;assert.equal(backgammonRoll(s,0,[1,1]),true);assert.equal(s.turn,1);assert.equal(s.phase,'roll');});
test('short nards cannot accidentally enable crazy mode',()=>{assert.equal(createBackgammon('short',{variant:'crazy'}).variant,'classic');});
test('an incomplete double stops the chain even when higher dice could move',()=>{
 const s=setup('crazy');s.points=Array(24).fill(0);s.points[0]=15;s.points[2]=-1;s.points[12]=-14;
 assert.equal(backgammonRoll(s,0,[1,1]),true);
 assert.equal(backgammonMove(s,0,{from:0,to:1,die:1}),true);
 assert.equal(s.turn,1);assert.equal(s.phase,'roll');assert.equal(s.moves.length,1);assert.deepEqual(s.doubleQueue,[]);
});
