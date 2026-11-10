import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from '../vendor/three/three.module.min.js';
import {createRoadClearance} from '../scripts/stadium-race/road-clearance.mjs';

const E={FINISH:100,roadWidth:()=>6};
// A returning lane is 20 m away from the initial straight.
const sample=d=>({x:d<50?0:20,y:0,z:d*.06});
test('houses and green slabs cannot overlap a neighbouring road segment',()=>{
 const clearance=createRoadClearance(E,sample),group=new T.Group();
 const house=new T.Mesh(new T.BoxGeometry(7,12,14));house.position.set(20,6,8);group.add(house);
 const grass=new T.Mesh(new T.BoxGeometry(37,.5,24));grass.position.set(26,-.5,0);group.add(grass);
 const safe=new T.Mesh(new T.BoxGeometry(4,8,4));safe.position.set(-16,4,0);group.add(safe);
 clearance.update(group);
 assert.equal(house.visible,false);assert.equal(grass.visible,false);assert.equal(safe.visible,true);
 group.position.x=-80;clearance.update(group);
 assert.equal(house.visible,true);assert.equal(grass.visible,true);
});
test('batched decorations carry a clearance flag without being rendered twice',()=>{
 const clearance=createRoadClearance(E,sample),mesh=new T.Mesh(new T.BoxGeometry(4,4,4));
 mesh.userData.raceBatched=true;mesh.visible=false;
 clearance.update(mesh);assert.equal(mesh.userData.roadBlocked,true);assert.equal(mesh.visible,false);
 mesh.position.x=-30;clearance.update(mesh);assert.equal(mesh.userData.roadBlocked,false);assert.equal(mesh.visible,false);
});
test('bounds and rotated overhangs are checked, not just object centres',()=>{
 const clearance=createRoadClearance(E,sample),mesh=new T.Mesh(new T.BoxGeometry(2,2,20));
 mesh.position.x=-12;mesh.rotation.y=Math.PI/4;clearance.update(mesh);
 assert.equal(mesh.userData.roadBlocked,true);
});
test('side street corridor reserves space for emerging traffic beyond the main road',()=>{
 const straight=(d,l=0)=>({x:-l*6,y:0,z:d*.06});
 const mesh=new T.Mesh(new T.BoxGeometry(3,6,3));mesh.position.set(20,3,6);
 createRoadClearance(E,straight).update(mesh);assert.equal(mesh.userData.roadBlocked,false);
 createRoadClearance({...E,crossings:[{distance:100}]},straight).update(mesh);assert.equal(mesh.userData.roadBlocked,true);
});
