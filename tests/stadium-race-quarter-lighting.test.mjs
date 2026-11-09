import test from 'node:test';import assert from 'node:assert/strict';import * as T from '../vendor/three/three.module.min.js';import {quarterLightState,createQuarterLighting} from '../scripts/stadium-race/quarter-lighting.mjs';
const E={road:()=>({city:true,bridge:false}),roadWidth:()=>9};
test('street lamps recycle only after their contribution has faded out',()=>{
 for(const boundary of [24000,24200,26000]){const before=quarterLightState(boundary-.001,E),after=quarterLightState(boundary+.001,E);assert.equal(before.length,2);for(let i=0;i<2;i++){
  if(before[i].distance!==after[i].distance){assert.ok(before[i].intensity<1e-6);assert.ok(after[i].intensity<1e-6);}else assert.ok(Math.abs(before[i].intensity-after[i].intensity)<.01);
  assert.ok(after[i].intensity>=0&&after[i].intensity<=85);
 }}
});
test('local city lamps stay off on stadium and bridge sections',()=>{for(const road of [{city:false},{city:true,bridge:true}])assert.ok(quarterLightState(26000,{...E,road:()=>road}).every(l=>l.intensity===0));});

test('local lighting reuses two lights and allocates no extra shadow maps',()=>{
 const scene=new T.Scene(),lighting=createQuarterLighting(scene,E,(d,l)=>({x:-l*9,y:0,z:d*.06}));
 for(const d of [24000,24100,24200,25000])lighting.update(d);
 assert.equal(scene.children.length,2);assert.ok(scene.children.every(l=>l.isPointLight&&!l.castShadow));assert.ok(lighting.snapshot().every(l=>l.position.every(Number.isFinite)));
});
