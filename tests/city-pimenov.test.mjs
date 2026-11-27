import test from 'node:test';
import assert from 'node:assert/strict';
import {blocked} from '../scripts/city-game/world.mjs';
import {outlines} from '../scripts/city-game/pimenov-survey.mjs';
import {basins,kiosk,library} from '../scripts/city-game/pimenov-plan.mjs';

function verifyDrive(points){
 for(let i=1;i<points.length;i++){
  const [ax,az]=points[i-1],[bx,bz]=points[i];
  const steps=Math.ceil(Math.hypot(bx-ax,bz-az)/.25);
  for(let step=0;step<=steps;step++){
   const x=ax+(bx-ax)*step/steps,z=az+(bz-az)*step/steps;
   assert.equal(blocked(x,z,.8),false,`blocked road at ${x}, ${z}`);
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

test('Krems and Flotiliya can be reached from the villa approach',()=>{
 verifyDrive([[72,70],[72,-84],[115.6,-84]]);
 verifyDrive([[72,-84],[72,-197],[62,-197],[55,-202]]);
});

test('sidewalks reach the KREMS display, the alley benches and the entrance of Kirova 27',()=>{
 for(const [from,to] of [
  [[113.9,-84.9],[115.5,-81.75]],
  [[19.1,43.2],[53.5,43.2]],
  [[84,15.2],[97.55,15.2]]
 ]){
  for(let step=0;step<=100;step++){
   const t=step/100;
   assert.equal(blocked(from[0]+(to[0]-from[0])*t,from[1]+(to[1]-from[1])*t,.30),false);
  }
 }
 assert.equal(blocked(115.33,-81.24,.30),true,'display glass');
 assert.equal(blocked(26,42.25,.30),true,'bench seat');
});
