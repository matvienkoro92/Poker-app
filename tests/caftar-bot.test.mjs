import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createBackgammon,turnSequences} from '../scripts/board-games/backgammon.mjs';
import {botMove} from '../scripts/board-games/bot.mjs';
import {caftarPositionScore} from '../scripts/board-games/caftar-bot.mjs';
const state=()=>({...createBackgammon('long',{variant:'six-one'}),phase:'moving',dice:[1,6],roll:[1,6]});
test('6:1 bot uses direct head transfers and leaves input untouched',()=>{
 const s=state(),before=JSON.stringify(s);const move=botMove(s);
 assert.equal(move.from,0);assert.ok([18,23].includes(move.to));assert.equal(JSON.stringify(s),before);
 assert.ok(turnSequences(s).some(seq=>JSON.stringify(seq[0])===JSON.stringify({from:move.from,to:move.to,die:move.die})));
});
test('single checker at opponents transfer gate is worth keeping while head is occupied',()=>{
 const s=state();s.points.fill(0);s.points[12]=-15;s.points[6]=1;s.points[18]=14;
 const open=[...s.points];open[6]=0;open[7]=1;
 assert.ok(caftarPositionScore(s,s.points,0,0)>caftarPositionScore(s,open,0,0));
});
test('equal pip positions prefer spread home checkers over a tall stack',()=>{
 const s=state(),stack=Array(24).fill(0),spread=Array(24).fill(0);stack[20]=6;stack[12]=-15;spread[19]=2;spread[20]=2;spread[21]=2;spread[12]=-15;
 assert.ok(caftarPositionScore(s,spread,9,0)>caftarPositionScore(s,stack,9,0));
});
test('evaluation is symmetric between players and prefers winning bearoff',()=>{
 const s=state(),points=Array(24).fill(0);points[23]=1;points[12]=-15;
 const rotated=points.map((_,i)=>-points[(i+12)%24]);
 assert.equal(caftarPositionScore(s,points,14,0),caftarPositionScore(s,rotated,14,1));
 s.points=points;s.off=[14,0];s.dice=[1];s.roll=[1,2];assert.equal(botMove(s,'hard').to,24);
});
