import test from 'node:test';
import assert from 'node:assert/strict';
import {drivingDirections,navigationText} from '../scripts/city-game/navigation.mjs';

test('directions measure the road and distinguish turns on a north-up map',()=>{
 const start={x:0,z:0},corner={x:0,z:40};
 for(const [x,direction] of [[-30,'Направо'],[30,'Налево']]){
  const end={x,z:40};
  assert.deepEqual(drivingDirections(start,[start,corner,corner,end],end),{distance:70,turn:{distance:40,direction}});
 }
 assert.equal(navigationText(drivingDirections(start,[],start)),'Вы у цели');
});
