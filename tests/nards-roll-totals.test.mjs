import test from 'node:test';
import assert from 'node:assert/strict';
import {createBackgammon,backgammonRoll,backgammonMove,backgammonLegal,undoBackgammonStep} from '../scripts/board-games/backgammon.mjs';
test('roll totals follow the awarded opening player and add each roll once',()=>{
 const s=createBackgammon('long');assert.deepEqual(s.rollTotals,[0,0]);
 assert.equal(backgammonRoll(s,0,[2,2]),true);assert.deepEqual(s.rollTotals,[0,0]);
 assert.equal(backgammonRoll(s,0,[2,6]),true);assert.deepEqual(s.rollTotals,[0,8]);
 assert.equal(backgammonRoll(s,1,[6,6]),false);assert.deepEqual(s.rollTotals,[0,8]);
 const move=backgammonLegal(s)[0];backgammonMove(s,1,move);assert.deepEqual(s.rollTotals,[0,8]);assert.equal(undoBackgammonStep(s,1),true);assert.deepEqual(s.rollTotals,[0,8]);
});
test('normal doubles sum the two faces, and legacy states initialize safely',()=>{
 const s=createBackgammon('short');s.phase='roll';s.opening=false;s.turn=0;delete s.rollTotals;
 assert.equal(backgammonRoll(s,0,[6,6]),true);assert.deepEqual(s.rollTotals,[12,0]);
 s.phase='roll';s.turn=1;assert.equal(backgammonRoll(s,1,[3,5]),true);assert.deepEqual(s.rollTotals,[12,8]);
});
