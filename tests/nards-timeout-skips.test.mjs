import test from 'node:test';
import assert from 'node:assert/strict';
import {progress} from '../scripts/board-games/backgammon.mjs';
import {createGame,action,expireTurn,legalMoves} from '../scripts/board-games/engine.mjs';
for(const kind of ['short','long']){
 test(kind+': first two timeouts autoplay; third loses',()=>{
  const s=createGame(kind);
  for(let n=0;n<4;n++){
   const ply=s.ply,before=s.moves.length;
   assert.equal(expireTurn(s,()=>[6,1]),true);
   assert.equal(s.winner,null);assert.equal(s.ply,ply+1);assert.ok(s.moves.length>before);
   assert.equal(s.phase,'roll');assert.deepEqual(s.dice,[]);assert.deepEqual(s.stepUndo,[]);
  }
  assert.deepEqual(s.missedTurns,[2,2]);const before=s.moves.length;expireTurn(s,()=>[6,1]);assert.equal(s.winner,1);assert.equal(s.endReason,'timeout-skips');assert.equal(s.moves.length,before);
 });
 test(kind+': timeout finishes remaining dice without rerolling or moving the opponent',()=>{
  const s=createGame(kind);action(s,0,{type:'roll'},[6,1]);
  action(s,0,{type:'move',...legalMoves(s)[0]});
  const expected=structuredClone(s),player=s.turn;
  while(expected.turn===player){const moves=legalMoves(expected).sort((a,b)=>(b.from===-1?-1:progress(expected,player,b.from))-(a.from===-1?-1:progress(expected,player,a.from)));action(expected,player,{type:'move',...moves[0]});}
  expireTurn(s,()=>{throw Error('must not reroll');});
  assert.deepEqual(s.points,expected.points);assert.deepEqual(s.moves,expected.moves);assert.equal(s.ply,1);
 });
 test(kind+': timeout uses all four legal double moves',()=>{
  const s=createGame(kind);s.phase='roll';s.opening=false;s.turns=[2,2];
  expireTurn(s,()=>[1,1]);assert.equal(s.moves.length,4);assert.equal(s.ply,1);assert.equal(s.turn,1);
 });
 test(kind+': opening ties reroll and play for the actual opening winner',()=>{
  const s=createGame(kind),rolls=[[3,3],[1,6]];
  expireTurn(s,()=>rolls.shift());assert.equal(s.moves[0].player,1);assert.equal(s.turn,0);assert.equal(s.ply,1);
 });
 test(kind+': a fully blocked turn passes without moving the opponent',()=>{
  const s=createGame(kind);s.phase='roll';s.opening=false;s.turns=[2,2];s.points.fill(0);
  if(kind==='short'){s.bar[0]=15;s.points[0]=-2;s.points[1]=-2;s.points[10]=-11;}
  else{s.points[0]=15;s.points[1]=-1;s.points[2]=-1;s.points[12]=-13;}
  expireTurn(s,()=>[1,2]);assert.equal(s.turn,1);assert.equal(s.ply,1);assert.equal(s.moves.length,0);assert.equal(s.winner,null);
 });
 test(kind+': auto bear-off can finish with a scored win',()=>{
  const s=createGame(kind);s.points.fill(0);s.points[23]=1;s.points[10]=-15;s.off=[14,0];s.turns=[2,2];s.phase='moving';s.opening=false;s.dice=[1];s.roll=[1,2];
  expireTurn(s);assert.equal(s.winner,0);assert.equal(s.endReason,'borne-off');assert.ok(s.winPoints>=2);assert.equal(expireTurn(s),false);
 });
 test(kind+': completing a manual turn resets its own streak',()=>{
  const s=createGame(kind);s.missedTurns=[2,1];action(s,0,{type:'roll'},[6,1]);
  while(s.turn===0)action(s,0,{type:'move',...legalMoves(s)[0]});
  assert.deepEqual(s.missedTurns,[0,1]);expireTurn(s,()=>[6,1]);assert.equal(s.winner,null);assert.deepEqual(s.missedTurns,[0,2]);
 });
}

for(const kind of ['short','long'])for(const player of [0,1])test(kind+': auto move chooses the furthest legal checker for player '+player,()=>{
 const s=createGame(kind);s.points.fill(0);s.turn=player;s.turns=[2,2];s.phase='moving';s.opening=false;s.roll=[1,2];s.dice=[1];
 const sign=player===0?1:-1;
 const point=n=>kind==='long'?(n+(player===0?0:12))%24:player===0?n:23-n;
 s.points[point(4)]=sign*14;s.points[point(16)]=sign;
 expireTurn(s);assert.equal(s.moves[0].from,point(16));assert.equal(s.moves[0].to,point(17));
});
for(const kind of ['short','long'])test(kind+': a blocked front checker falls back to the next legal checker',()=>{
 const s=createGame(kind);s.points.fill(0);s.turns=[2,2];s.phase='moving';s.opening=false;s.roll=[1,2];s.dice=[1];
 s.points[4]=14;s.points[16]=1;s.points[17]=-15;
 expireTurn(s);assert.equal(s.moves[0].from,4);assert.equal(s.moves[0].to,5);
});
