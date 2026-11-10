import test from 'node:test';
import assert from 'node:assert/strict';
import {captureMotion,renderMotion} from '../scripts/stadium-race/render-motion.mjs';

test('constant speed renders evenly at 60, 90, 120 and 144 Hz',()=>{
 for(const hz of [60,90,120,144]){
  const state={distance:0,lateral:0,rivals:[{distance:30,lateral:0}]};
  let previous=null,acc=0,last=null;
  for(let frame=0;frame<hz;frame++){
   acc+=1000/hz;
   while(acc>=1000/60){previous=captureMotion(state);state.distance+=6;state.rivals[0].distance+=6;acc-=1000/60;}
   const pose=renderMotion(previous,state,acc/(1000/60));
   if(frame>3)assert.ok(Math.abs(pose.distance-last-360/hz)<1e-8,`${hz} Hz frame ${frame}`);
   assert.ok(Math.abs(pose.rivals[0].distance-pose.distance-30)<1e-8);
   last=pose.distance;
  }
 }
});

test('render poses do not mutate physics and resets never sweep across the track',()=>{
 const state={distance:10,lateral:0,heading:0,tier:0,air:10,airDuration:50,rivals:[{distance:30}]};
 const previous=captureMotion(state);state.distance=16;state.heading=.2;state.air=9;
 const pose=renderMotion(previous,state,.5);
 assert.equal(pose.distance,13);assert.equal(pose.heading,.1);assert.equal(pose.air,9.5);
 assert.equal(state.distance,16);assert.equal(previous.distance,10);
 state.distance=0;previous.distance=5000;
 assert.equal(renderMotion(previous,state,.5).distance,0);
 assert.equal(renderMotion(null,state,.5),state);
});

test('uneven frame intervals keep constant speed instead of alternating stopped and jumped poses',()=>{
 const state={distance:0,rivals:[]};let previous=null,acc=0,last=0,elapsed=0;
 for(let i=0;i<100;i++){
  const ms=[7,11,24,8,35,16][i%6];acc+=ms;elapsed+=ms;
  while(acc>=1000/60){previous=captureMotion(state);state.distance+=6;acc-=1000/60;}
  const pose=renderMotion(previous,state,acc/(1000/60));
  if(elapsed>50)assert.ok(Math.abs((pose.distance-last)/ms-.36)<1e-8);
  last=pose.distance;
 }
});
