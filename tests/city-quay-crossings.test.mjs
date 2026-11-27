import test from 'node:test';
import assert from 'node:assert/strict';
import {quayCrossings, signalGap} from '../scripts/city-game/quay-crossings.mjs';
import {createTraffic, advanceTraffic} from '../scripts/city-game/traffic.mjs';

test('each stop line controls only vehicles approaching it in the matching lane',()=>{
 for(const c of quayCrossings){
  {
   const {direction,stop:line}=c;
   assert((c.center-line)*direction>2);
   const position=line-direction*5;
   const car=c.axis==='z'
    ? {x:c.lane,z:position,yaw:direction===1?0:Math.PI}
    : {x:position,z:c.lane,yaw:direction*Math.PI/2};
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
