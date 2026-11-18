import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from '../vendor/three/three.module.min.js';
import E from '../app-last-buy-in-race-engine.js';
import {createCourseSampler} from '../scripts/stadium-race/course-path.mjs';
import {createCourseGround} from '../scripts/stadium-race/course-scenery.mjs';

test('track verges across the full course leave the mobile chase camera a clear view of the car',t=>{
 t.mock.method(T.TextureLoader.prototype,'load',()=>new T.Texture());
 const sample=createCourseSampler(E),scene=new T.Scene(),ground=createCourseGround(scene,E,sample);
 const ray=new T.Raycaster(),camera=new T.Vector3(),car=new T.Vector3();
 for(let d=0;d<=E.FINISH;d+=10){
  ground.update(d);
  for(const [lane,tier] of [[-1.16,0],[0,0],[1.16,0],...(E.deckAt(d)?[[E.deckAt(d).center,1]]:[])]){
   const p=sample(d,lane,tier);
   const back=8;
   let y=Math.max(p.y+3.2,sample(d-back/.06,lane,tier).y+1.8);
   for(let i=1;i<10;i++){
    const t=i/10,surface=sample(d-back/.06*(1-t),lane,tier);
    y=Math.max(y,(surface.y+.45-(p.y+.35)*t)/(1-t));
   }
   camera.set(p.x-back*Math.sin(p.a),y,p.z-back*Math.cos(p.a));
   car.set(p.x,p.y+.7,p.z);
   ray.far=camera.distanceTo(car);
   ray.set(camera,car.sub(camera).normalize());
   assert.equal(ray.intersectObjects(scene.children.filter(mesh=>mesh.visible),false).length,0,'distance '+d+' lane '+lane);
  }
 }
});
