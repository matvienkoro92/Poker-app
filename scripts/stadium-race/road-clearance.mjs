import * as T from '../../vendor/three/three.module.min.js';

// Check decorations against every nearby part of the route, including the
// opposite side of hairpins. A world AABB is conservative for rotated meshes.
export function createRoadClearance(E,sample){
 const cell=16,buckets=new Map(),bounds=new T.Box3();
 function add(p,radius){
  for(let x=Math.floor((p.x-radius)/cell);x<=Math.floor((p.x+radius)/cell);x++)for(let z=Math.floor((p.z-radius)/cell);z<=Math.floor((p.z+radius)/cell);z++){
   const key=x+':'+z;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push({x:p.x,z:p.z,radius});
  }
 }
 for(let d=-240;d<=E.FINISH+6000;d+=10)add(sample(d),E.roadWidth(d)*7/6+.4);
 // Reserve side streets too: a crossing car must never drive through a facade.
 for(const j of E.crossings||[]){const width=E.roadWidth(j.distance),reach=width*7/6+24;for(let x=-reach;x<=reach;x+=2)add(sample(j.distance,x/width),4.3);}
 function intersects(box){
  for(let x=Math.floor(box.min.x/cell);x<=Math.floor(box.max.x/cell);x++)for(let z=Math.floor(box.min.z/cell);z<=Math.floor(box.max.z/cell);z++){
   for(const p of buckets.get(x+':'+z)||[]){const dx=Math.max(box.min.x-p.x,0,p.x-box.max.x),dz=Math.max(box.min.z-p.z,0,p.z-box.max.z);if(dx*dx+dz*dz<p.radius*p.radius)return true;}
  }
  return false;
 }
 function mesh(m){
  if(!m.geometry.boundingBox)m.geometry.computeBoundingBox();
  bounds.copy(m.geometry.boundingBox).applyMatrix4(m.matrixWorld);
  m.userData.roadBlocked=intersects(bounds);
  if(!m.userData.roadVisibilitySaved){m.userData.roadOriginalVisible=m.visible;m.userData.roadVisibilitySaved=true;}
  if(!m.userData.raceBatched)m.visible=m.userData.roadOriginalVisible&&!m.userData.roadBlocked;
 }
 return {intersects,update(group){group.updateWorldMatrix(true,true);group.traverse(m=>{if(m.isMesh)mesh(m);});}};
}
