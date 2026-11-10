import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from '../vendor/three/three.module.min.js';
import {createHeadlights} from '../scripts/stadium-race/headlights.mjs';

test('takeoff and landing preserve shader light counts while switching beams',()=>{
 const scene=new T.Scene(),headlights=createHeadlights(scene);
 const visibleLights=()=>{const lights=[];scene.traverseVisible(o=>{if(o.isLight)lights.push(o);});return lights;};
 const initial=visibleLights();assert.equal(initial.length,2);
 for(const enabled of [true,false,false,true]){
  headlights.update({x:2,y:enabled?0:2,z:10,a:.2},.1,enabled);
  assert.deepEqual(visibleLights(),initial);
  assert.ok(initial.every(l=>l.intensity===(enabled?10:0)&&!l.castShadow));
 }
});
