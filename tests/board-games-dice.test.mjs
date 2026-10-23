import test from 'node:test';
import assert from 'node:assert/strict';
import {diceFaces} from '../scripts/board-games/dice-view.mjs';
import {createBackgammon,backgammonRoll} from '../scripts/board-games/backgammon.mjs';
test('every displayed outcome has six distinct physical faces and opposite sides sum to seven',()=>{for(let n=1;n<=6;n++){const f=diceFaces(n);assert.equal(f.top,n);assert.equal(new Set(Object.values(f)).size,6);for(const [a,b]of [['top','bottom'],['left','right'],['front','back']])assert.equal(f[a]+f[b],7);}});
test('identical accepted opening ties get independent throw identities; invalid attempts do not',()=>{const s=createBackgammon('short');assert.equal(backgammonRoll(s,0,[2,2]),true);assert.equal(s.rollCount,1);assert.equal(s.phase,'opening');assert.equal(backgammonRoll(s,0,[2,2]),true);assert.equal(s.rollCount,2);assert.equal(backgammonRoll(s,0,[7,2]),false);assert.equal(s.rollCount,2);assert.equal(backgammonRoll(s,0,[6,1]),true);assert.equal(s.rollCount,3);assert.equal(backgammonRoll(s,0,[3,3]),false);assert.equal(s.rollCount,3);assert.deepEqual(s.dice,[6,1]);});
test('older saved nards positions without a counter accept their next roll',()=>{const s=createBackgammon('long');delete s.rollCount;assert.equal(backgammonRoll(s,0,[5,3]),true);assert.equal(s.rollCount,1);assert.deepEqual(s.roll,[5,3]);});
