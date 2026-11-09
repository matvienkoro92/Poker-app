import test from 'node:test';import assert from 'node:assert/strict';import * as T from '../vendor/three/three.module.min.js';
import {createCityBuildingFactory} from '../scripts/stadium-race/city-buildings.mjs';
test('street arcades have real open arches and solid piers',()=>{
 const scene=new T.Scene(),factory=createCityBuildingFactory(Array.from({length:3},()=>new T.MeshStandardMaterial()),new T.BoxGeometry(1,1,1),new T.CylinderGeometry(1,1,1,24));
 const building=factory(scene,4,1),arcade=building.children.find(m=>m.geometry?.type==='ExtrudeGeometry');assert.ok(arcade);scene.updateMatrixWorld(true);
 const throughOpening=new T.Raycaster(new T.Vector3(8,1.3,0),new T.Vector3(1,0,0));assert.equal(throughOpening.intersectObject(arcade).length,0);
 const throughPier=new T.Raycaster(new T.Vector3(8,1.3,2.3),new T.Vector3(1,0,0));assert.ok(throughPier.intersectObject(arcade).length>0);
 for(const value of arcade.geometry.attributes.position.array)assert.ok(Number.isFinite(value));
 scene.traverse(m=>{m.geometry?.dispose();m.material?.dispose();});
});
