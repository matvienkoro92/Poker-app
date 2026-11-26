import test from 'node:test';
import assert from 'node:assert/strict';
import {quayCrossings, signalGap} from '../scripts/city-game/quay-crossings.mjs';
import {createTraffic, advanceTraffic} from '../scripts/city-game/traffic.mjs';

test('each stop line controls only vehicles approaching it in the matching lane',()=>{
 for(const c of quayCrossings){
  for(const [i,line] of c.stops.entries()){
   const direction=i===0?1:-1;
   const position=line-direction*5;
   const car=c.axis==='z'
    ? {x:c.lanes[i],z:position,yaw:i===0?0:Math.PI}
    : {x:position,z:c.lanes[i],yaw:direction*Math.PI/2};
   car.id=0;
   assert(Math.abs(signalGap(car,24)-2.65)<1e-6);
   assert.equal(signalGap(car,3),Infinity);
   car.yaw+=Math.PI;
   assert.equal(signalGap(car,24),Infinity);
  }
 }
});

test('coastal drivers wait with the bumper behind the line and restart on green',()=>{
 for(const car of createTraffic().slice(0,2)){
  for(let i=0;i<7000&&signalGap(car,24)>.001;i++)advanceTraffic(car,.05,null,24);
  assert(signalGap(car,24)<=.001);
  const {x,z}=car;
  for(let i=0;i<40;i++)advanceTraffic(car,.05,null,24);
  assert(Math.hypot(car.x-x,car.z-z)<.01);
  for(let i=0;i<40;i++)advanceTraffic(car,.05,null,3);
  assert(Math.hypot(car.x-x,car.z-z)>2);
 }
});
