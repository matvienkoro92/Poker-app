import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame,action} from '../scripts/board-games/engine.mjs';
import {createMatch,recordWin,nextMatch} from '../scripts/billiards/match.mjs';
for(const discipline of ['short','long'])for(const winner of [0,1])for(const kind of ['single','mars','koks'])test(discipline+' '+winner+' '+kind+': final checker awards exact points',()=>{
 const s=createGame(discipline),loser=1-winner,sign=winner===0?1:-1,from=discipline==='long'?(winner===0?23:11):(winner===0?23:0);
 s.points.fill(0);s.points[from]=sign;s.off[winner]=14;s.off[loser]=kind==='single'?1:0;s.turn=winner;s.turns=[2,2];s.phase='moving';s.opening=false;s.roll=[1,2];s.dice=[1];
 const other=kind==='koks'?(discipline==='short'?(winner===0?22:1):(loser===0?0:12)):(discipline==='short'?10:(loser===0?8:20));s.points[other]=-sign*(15-s.off[loser]);
 assert.ok(action(s,winner,{type:'move',from,to:24,die:1}));assert.equal(s.winner,winner);assert.equal(s.winKind,kind);assert.equal(s.scores[winner],{single:1,mars:2,koks:3}[kind]);
});
test('three-point match credits mars and koks once and finishes as soon as target is reached',()=>{
 let m=createMatch(3);assert.ok(recordWin(m,0,2));assert.deepEqual(m.wins,[2,0]);assert.equal(m.winner,null);assert.equal(recordWin(m,0,2),false);m=nextMatch(m);assert.ok(recordWin(m,0,1));assert.equal(m.winner,0);assert.deepEqual(m.wins,[3,0]);const k=createMatch(3);recordWin(k,1,3);assert.equal(k.winner,1);assert.deepEqual(k.wins,[0,3]);
});
test('short koks includes a checker on the bar, but any borne-off checker makes the result single',async()=>{
 const {backgammonWinPoints}=await import('../scripts/board-games/backgammon.mjs'),s=createGame('short');s.points.fill(0);s.points[10]=-14;s.bar[1]=1;assert.deepEqual(backgammonWinPoints(s,0),{points:3,kind:'koks'});s.off[1]=1;assert.deepEqual(backgammonWinPoints(s,0),{points:1,kind:'single'});
});
