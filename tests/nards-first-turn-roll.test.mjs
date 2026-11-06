import test from 'node:test';
import assert from 'node:assert/strict';
import {createBackgammon,backgammonRoll,backgammonLegal} from '../scripts/board-games/backgammon.mjs';
for(const kind of ['long','short'])for(const opening of [[6,1],[1,6]])test(kind+' opening '+opening+': winner rolls a new pair before moving',()=>{
 const s=createBackgammon(kind),before=[...s.points],winner=opening[0]>opening[1]?0:1;
 assert.equal(backgammonRoll(s,0,opening),true);assert.equal(s.turn,winner);assert.equal(s.phase,'roll');assert.equal(s.firstRollPending,true);assert.deepEqual(s.dice,[]);assert.deepEqual(s.points,before);assert.equal(backgammonLegal(s).length,0);assert.deepEqual(s.rollTotals,[0,0]);
 assert.equal(backgammonRoll(s,1-winner,[2,4]),false);assert.equal(backgammonRoll(s,winner,[2,4]),true);assert.equal(s.phase,'moving');assert.equal(s.firstRollPending,false);assert.deepEqual(s.dice,[2,4]);assert.equal(s.rollHistory.length,2);assert.equal(s.rollHistory[0].opening,true);assert.equal(s.rollHistory[1].opening,false);assert.equal(s.rollTotals[winner],6);assert.ok(backgammonLegal(s).length>0);
});
