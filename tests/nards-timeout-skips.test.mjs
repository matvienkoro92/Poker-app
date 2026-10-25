import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame,action,expireTurn,legalMoves} from '../scripts/board-games/engine.mjs';
for(const kind of ['short','long']){
 test(kind+': each player loses only after their own third consecutive expired turn',()=>{
  const s=createGame(kind);for(let n=0;n<4;n++){assert.equal(expireTurn(s),true);assert.equal(s.winner,null);assert.equal(s.turn,(n+1)%2);assert.equal(s.phase,'roll');assert.deepEqual(s.dice,[]);assert.deepEqual(s.stepUndo,[]);}
  assert.deepEqual(s.missedTurns,[2,2]);expireTurn(s);assert.equal(s.winner,1);assert.equal(s.endReason,'timeout-skips');assert.equal(expireTurn(s),false);
 });
 test(kind+': a completed legal turn resets only that player; rolling does not reset skips',()=>{
  const s=createGame(kind);expireTurn(s);expireTurn(s);assert.deepEqual(s.missedTurns,[1,1]);assert.ok(action(s,0,{type:'roll'},[6,1]));assert.equal(s.missedTurns[0],1);
  for(let n=0;n<4&&s.phase==='moving';n++){const move=legalMoves(s)[0];assert.ok(move);assert.ok(action(s,0,{type:'move',...move}));}
  assert.equal(s.turn,1);assert.deepEqual(s.missedTurns,[0,1]);expireTurn(s);assert.equal(s.winner,null);assert.deepEqual(s.missedTurns,[0,2]);
 });
 test(kind+': old saved rooms without skip counters initialize safely',()=>{const s=createGame(kind);delete s.missedTurns;expireTurn(s);assert.deepEqual(s.missedTurns,[1,0]);});
}
