import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createBackgammon,backgammonDestinations,backgammonMove} from '../scripts/board-games/backgammon.mjs';
function position(discipline,dice){const s=createBackgammon(discipline);s.phase='moving';s.opening=false;s.points.fill(0);s.points[0]=15;s.points[12]=-15;s.roll=dice.slice(0,2);s.dice=[...dice];return s;}
for(const discipline of ['short','long']){
 test(discipline+' combines a legal two-die path',()=>{const s=position(discipline,[2,3]),move=backgammonDestinations(s).find(m=>m.from===0&&m.to===5&&m.path);assert.ok(move);assert.equal(backgammonMove(s,0,move),true);assert.equal(s.points[0],14);assert.equal(s.points[5],1);assert.equal(s.moves.length,2);assert.equal(s.turn,1);assert.equal(s.lastMove.from,0);assert.equal(s.lastMove.to,5);});
 test(discipline+' does not jump over blocked intermediate points',()=>{const s=position(discipline,[2,3]);s.points[2]=-2;s.points[3]=-2;assert.equal(backgammonDestinations(s).some(m=>m.from===0&&m.to===5),false);const before=structuredClone(s);assert.equal(backgammonMove(s,0,{from:0,to:5,die:5,path:[{from:0,to:2,die:2},{from:2,to:5,die:3}]}),false);assert.deepEqual(s,before);});
 test(discipline+' offers all four double steps',()=>{const s=position(discipline,[2,2,2,2]);const move=backgammonDestinations(s).find(m=>m.from===0&&m.to===8&&m.path?.length===4);assert.ok(move);assert.equal(backgammonMove(s,0,move),true);assert.equal(s.points[8],1);assert.equal(s.moves.length,4);});
 test(discipline+' rejects a different checker in the same path atomically',()=>{const s=position(discipline,[2,3]),before=structuredClone(s);assert.equal(backgammonMove(s,0,{from:0,to:3,die:5,path:[{from:0,to:2,die:2},{from:0,to:3,die:3}]}),false);assert.deepEqual(s,before);});
}
test('short intermediate hits are retained',()=>{const s=position('short',[2,3]);s.points[2]=-1;s.points[3]=-2;const move=backgammonDestinations(s).find(m=>m.from===0&&m.to===5&&m.path);assert.ok(move);assert.equal(backgammonMove(s,0,move),true);assert.equal(s.bar[1],1);assert.equal(s.points[2],0);});
