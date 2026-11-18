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
  assert.ok(initial.every(l=>l.intensity===(enabled?850:0)&&!l.castShadow));
 }
});

test('front and rear lenses follow the body and braking brightens only the rear pair',()=>{
 const scene=new T.Scene(),car=new T.Group();
 const body=new T.Mesh(new T.BoxGeometry(1.8,1.4,4.81));
 body.position.z=.12;car.add(body);
 const brake=createHeadlights(scene).fit(car,'bmw-e60');
 const lenses=car.children.slice(1);
 const rear=lenses.filter(m=>m.position.z<0),front=lenses.filter(m=>m.position.z>0);
 assert.equal(rear.length,2);assert.equal(front.length,2);
 assert.ok(rear.every(m=>m.position.z-m.scale.z<.12-4.81/2));
 assert.ok(front.every(m=>m.position.z+m.scale.z>.12+4.81/2));
 const running=rear[0].material.color.getHex(),white=front[0].material.color.getHex();
 brake(true);assert.notEqual(rear[0].material.color.getHex(),running);
 assert.equal(front[0].material.color.getHex(),white);
 brake(false);assert.equal(rear[0].material.color.getHex(),running);
});
