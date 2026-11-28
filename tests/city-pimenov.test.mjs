import test from 'node:test';
import assert from 'node:assert/strict';
import {kremsDriveways,kremsEntrance,kremsParkedCars,kremsStreets,kremsWalks} from '../scripts/city-game/krems-plan.mjs';
import {kremsNavigation} from '../scripts/city-game/krems-navigation.mjs';
import {CAR_START,blocked} from '../scripts/city-game/world.mjs';
import {create,step} from '../scripts/city-game/engine.mjs';
import {outlines} from '../scripts/city-game/pimenov-survey.mjs';
import {basins,kiosk,library} from '../scripts/city-game/pimenov-plan.mjs';

function verifyDrive(points,radius=.8){
 for(let i=1;i<points.length;i++){
  const [ax,az]=points[i-1],[bx,bz]=points[i];
  const steps=Math.ceil(Math.hypot(bx-ax,bz-az)/.25);
  if(!steps)continue;
  for(let step=0;step<=steps;step++){
   const x=ax+(bx-ax)*step/steps,z=az+(bz-az)*step/steps;
   assert.equal(blocked(x,z,radius),false,`blocked road at ${x}, ${z}`);
  }
 }
}

test('both carriageways of Voskhod and both library approaches are driveable',()=>{
 for(const z of [39.1,47.35])verifyDrive([[0,z],[72,z]]);
 verifyDrive(outlines[79887436]);
 verifyDrive(outlines[34126327].slice(0,5));
});

test('the fountain basins, kiosk and library have physical footprints',()=>{
 for(const {x,z} of [...basins,kiosk,library])assert.equal(blocked(x,z,.1),true);
 assert.equal(blocked(108.7,43.3,.35),false,'library entrance landing');
 assert.equal(blocked(119,44,.25),false,'recess behind the library');
});

test('Nizhegorodskaya crosses the alley and both directions remain clear to traffic',()=>{
 verifyDrive([[15,3],[15,69]]);
});

test('Flotiliya can be reached from the villa approach',()=>{
 verifyDrive([[72,-84],[72,-197],[62,-197],[55,-202]]);
});

test('sidewalks reach the alley benches and the entrance of Kirova 27',()=>{
 for(const [from,to] of [
  [[19.1,43.2],[53.5,43.2]],
  [[84,15.2],[97.55,15.2]]
 ]){
  for(let step=0;step<=100;step++){
   const t=step/100;
   assert.equal(blocked(from[0]+(to[0]-from[0])*t,from[1]+(to[1]-from[1])*t,.30),false);
  }
 }
 assert.equal(blocked(26,42.25,.30),true,'bench seat');
});

test('Krems parking is reachable from Kirova and Moskovskaya at the car collision radius',()=>{
 const [[fromKirova],[fromMoskovskaya]]=kremsDriveways;
 verifyDrive([[72,70],[72,-65.91],...fromKirova.toReversed(),[85.8,-65.49],[85.74,-77.65]],1.6);
 verifyDrive([...kremsStreets[1][0],[94.42,-79.51],...fromMoskovskaya,[89.03,-65.38],[89.37,-77.68]],1.6);
 verifyDrive([...fromKirova.toReversed(),...fromMoskovskaya.toReversed()],1.6);
 for(const [x,z] of kremsParkedCars)assert.equal(blocked(x,z,1.6),true,'parked car');
 assert.equal(blocked(89,-84,1.6),true,'S7 occupies the old shortcut through the block');
});

test('Makovskogo joins Leningradskaya and sidewalks from both ends reach Krems',()=>{
 for(const [points] of kremsStreets)verifyDrive(points,1.6);
 const [frontage]=kremsWalks[3];
 const {x,frontZ}=kremsEntrance;
 verifyDrive([...frontage,[121.27,-65.34]],.45);
 for(const end of [frontage[0],frontage[1]]){
  verifyDrive([end,[x,-82.8],[x,frontZ-.75]],.45);
 }
 assert.equal(blocked(x,frontZ-.35,.45),true,'closed exterior door');
});

test('the driving simulation crosses both Krems parking entrances without damage',()=>{
 for(const [street,x,z,yaw,finishX,direction] of [
  ['Kirova',74.9,-65.98,Math.PI/2,86,1],
  ['Moskovskaya',94.55,-65.12,-Math.PI/2-.063,84,-1]
 ]){
  const state=create();
  state.traffic=[];
  state.metroTraffic=[];
  state.driving=true;
  Object.assign(state.car,{x,z,yaw,speed:0});
  for(let frame=0;frame<600&&direction*(finishX-state.car.x)>0;frame++){
   step(state,{forward:.55},1/60);
  }
  assert.ok(direction*(finishX-state.car.x)<=0,street);
  assert.ok(state.car.z>-67&&state.car.z<-64.8,street);
  assert.equal(state.health,100,street);
 }
});

test('Krems guidance follows the villa exit, Kirova parking entrance and the walking crossing',()=>{
 const coordinates=({x,z})=>[x,z];
 const drive=kremsNavigation(CAR_START,true);
 verifyDrive([CAR_START,...drive.path].map(coordinates),1.6);
 assert.ok(drive.path.some(({x,z})=>x===40&&z===105),'promenade turn');
 assert.ok(drive.path.some(({x,z})=>x===78.82&&z===-66.06),'Kirova entrance');
 const walk=kremsNavigation(drive.target,false);
 verifyDrive([drive.target,...walk.path].map(coordinates),.45);
 assert.ok(walk.path.some(({x,z})=>x===95.91&&z===-64.22),'Moskovskaya crossing');
 assert.equal(walk.target.x,kremsEntrance.x);
});
