import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame,action,step,validState} from '../scripts/billiards/engine.mjs';
import {botMove} from '../scripts/billiards/solo.mjs';
function settle(state){for(let i=0;i<5000&&state.moving;i++)step(state);assert.equal(state.moving,false);assert(validState(state));}
test('computer places cue after a human foul and makes a valid simulated shot',()=>{
 const s=createGame();action(s,0,{type:'shot',angle:0,power:.05});settle(s);assert.equal(s.turn,1);assert(s.inHand);
 const placement=botMove(s);assert.equal(placement.type,'place');assert(action(s,1,placement));assert.equal(s.inHand,false);
 const move=botMove(s);assert.equal(move.type,'shot');assert(action(s,1,move));settle(s);assert.equal(s.shot,2);
});
test('computer targets its group and reserves the eight for after clearing it',()=>{
 for(const ready of [false,true]){
 const s=createGame();s.turn=1;s.groups=[1,0];for(const b of s.balls)if(b.id&&b.id!==8)b.pocket=ready||b.id!==1;
 const move=botMove(s);assert(move);assert(action(s,1,move));assert.deepEqual(s.legalFirst,ready?[8]:[1]);settle(s);
 }
});
test('computer cannot move finished or rolling games',()=>{const s=createGame();s.winner=0;assert.equal(botMove(s),null);s.winner=null;s.moving=true;assert.equal(botMove(s),null);});
