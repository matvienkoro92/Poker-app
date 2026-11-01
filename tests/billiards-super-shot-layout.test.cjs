'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),{layout,simulate,TEMPLATES}=require('../lib/billiards-super-shot-layout');
test('every hard bonus layout is legally pottable with the production physics',async()=>{
 for(let n=0;n<8;n++){
  const {state,difficulty}=await layout(n),r=TEMPLATES[n%2].reference,dx=Math.cos(r.angle)*(n&2?-1:1),dy=Math.sin(r.angle)*(n&4?-1:1);
  assert.ok(difficulty>=85&&difficulty<=90);assert.equal(state.balls.filter(b=>!b.pocket).length,2);
  const result=await simulate(state,Math.atan2(dy,dx),r.power);assert.equal(result.success,true,'layout '+n);
  assert.equal(state.shot,0);
 }
});
test('a miss fails and malformed bonus shots cannot be submitted',async()=>{
 const {state}=await layout(0);assert.equal((await simulate(state,Math.PI,.1)).success,false);
 for(const [angle,power]of [[NaN,.5],[0,2],[Infinity,.5],[0,0]])await assert.rejects(simulate(state,angle,power),e=>e.status===400);
});
