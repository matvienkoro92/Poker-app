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
test('each new double in crazy chain allows one fresh checker from the head',()=>{
 const s=setup('crazy');s.points[12]=0;s.points[23]=-15;backgammonRoll(s,0,[4,4]);
 let count=0;while(s.turn===0&&s.roll[0]===4&&count++<5){const move=backgammonLegal(s)[0];assert.ok(move);backgammonMove(s,0,move);}
 assert.equal(s.roll[0],5);assert.equal(s.headTaken,0);assert.ok(backgammonLegal(s).some(move=>move.from===0));
 const move=backgammonLegal(s).find(move=>move.from===0);backgammonMove(s,0,move);assert.equal(s.headTaken,1);assert.ok(!backgammonLegal(s).some(move=>move.from===0));
});
