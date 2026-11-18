import {streetGeometry} from './lod-geometry.mjs';
import {splitWheelParts} from './wheel-parts.mjs';
import {mergeGeometries} from '../../vendor/three/addons/utils/BufferGeometryUtils.js';
import * as T from '../../vendor/three/three.module.min.js';
import {createOwnedVehicle,cloneRoadMaterial} from '../city-game/vehicle.mjs';
// Cluster the display meshes once in world units; every opponent shares the resulting buffers.
export async function createProductionFleet(){
 const templates=await Promise.all(['mustang-gt500','bmw-e60'].map(async transport=>{
  const vehicle=await createOwnedVehicle({...window.PokerGarage.defaults,transport,paint:'classic',wheels:'classic',glassTint:'original'}),root=new T.Group();root.name=transport;vehicle.root.updateMatrixWorld(true);
  vehicle.root.traverse(m=>{if(!m.isMesh||['GR86_Leather','leather','seat','roll'].includes(m.material?.name))return;let visible=true;for(let a=m;a;a=a.parent)if(!a.visible)visible=false;if(!visible)return;const material=Array.isArray(m.material)?m.material.map(cloneRoadMaterial):cloneRoadMaterial(m.material);const mesh=new T.Mesh((transport==='bmw-e60'||['E60_00','carpaint','Tinted windows','tinted_glass','Glass_Parts'].includes(m.material.name)?m.geometry.clone().applyMatrix4(m.matrixWorld):streetGeometry(m.geometry,m.matrixWorld)),material);mesh.castShadow=mesh.receiveShadow=true;if(['tire','Anthracite alloy'].includes(m.material.name)){for(const part of splitWheelParts(mesh.geometry)){const pivot=new T.Group(),spin=new T.Group();pivot.position.copy(part.center);pivot.userData.roadWheel=true;pivot.userData.front=part.front;spin.add(new T.Mesh(part.geometry,material));pivot.add(spin);root.add(pivot);}mesh.geometry.dispose();}else root.add(mesh);});
  vehicle.root.traverse(m=>{if(m.isMesh){m.geometry.dispose();for(const material of [].concat(m.material))material.dispose();}});
  const buckets=new Map();for(const mesh of [...root.children]){if(!mesh.isMesh)continue;const key=mesh.material.name+':'+(mesh.material.map?.uuid||'');if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(mesh);}for(const meshes of buckets.values()){if(meshes.length<2)continue;const merged=new T.Mesh(mergeGeometries(meshes.map(m=>m.geometry)),meshes[0].material);merged.castShadow=merged.receiveShadow=true;meshes.forEach(m=>{root.remove(m);m.geometry.dispose();if(m.material!==merged.material)m.material.dispose();});root.add(merged);}return root;
 }));
 const lowGeometry=new Map();for(const template of templates)template.traverse(mesh=>{if(mesh.isMesh&&!lowGeometry.has(mesh.geometry))lowGeometry.set(mesh.geometry,streetGeometry(mesh.geometry,new T.Matrix4()));});
 // Far traffic still uses the production silhouette. Bake fixed wheel transforms
 // and trim colours once per model so a distant car needs just two body draws.
 const farShells=templates.map(template=>{
  template.updateMatrixWorld(true);
  const paint=[],trim=[];
  template.traverse(m=>{
   if(!m.isMesh)return;
   const part=lowGeometry.get(m.geometry).clone().applyMatrix4(m.matrixWorld);
   if(['E60_00','carpaint'].includes(m.material.name)){paint.push(part);return;}
   const glass=/glass|window/i.test(m.material.name);
   const color=glass?new T.Color('#475969'):m.material.color;
   const values=new Float32Array(part.attributes.position.count*3);
   for(let n=0;n<values.length;n+=3){values[n]=color.r;values[n+1]=color.g;values[n+2]=color.b;}
   part.setAttribute('color',new T.BufferAttribute(values,3));trim.push(part);
  });
  return [paint,trim].map(parts=>{if(!parts.length)return null;const merged=mergeGeometries(parts);for(const part of parts)part.dispose();return merged;});
 });
 const farTrim=new T.MeshStandardMaterial({vertexColors:true,roughness:.65,metalness:.22});
 const canvas=document.createElement('canvas');canvas.width=canvas.height=64;const ctx=canvas.getContext('2d'),gradient=ctx.createRadialGradient(32,32,8,32,32,32);gradient.addColorStop(0,'#07101999');gradient.addColorStop(1,'#07101900');ctx.fillStyle=gradient;ctx.fillRect(0,0,64,64);const texture=new T.CanvasTexture(canvas);
 const factory=(index,traffic=false)=>{const root=templates[traffic?0:index%templates.length].clone(true),paintColors=traffic?[0x555e64,0x9caaa8,0x263944,0x9b9382,0x78332d,0xc1bfb5]:[0x792722,0x26374f,0x9d8658];root.traverse(m=>{if(!m.isMesh)return;if(traffic)m.geometry=lowGeometry.get(m.geometry);m.material=m.material.clone();if(['E60_00','carpaint'].includes(m.material.name)){m.material.color.setHex(paintColors[index%paintColors.length]);m.material.metalness=.65;m.material.roughness=.3;}});
  const contactShadow=new T.Mesh(new T.PlaneGeometry(2.8,5.4),new T.MeshBasicMaterial({map:texture,transparent:true,opacity:.6,depthWrite:false}));contactShadow.rotation.x=-Math.PI/2;
  const wheels=[];root.traverse(n=>{if(n.userData.roadWheel)wheels.push(n);});const closeParts=[...root.children];
  const far=new T.Group(),shell=farShells[traffic?0:index%templates.length];
  const farPaint=new T.MeshStandardMaterial({color:paintColors[index%paintColors.length],metalness:.55,roughness:.35});
  if(shell[0])far.add(new T.Mesh(shell[0],farPaint));if(shell[1])far.add(new T.Mesh(shell[1],farTrim));
  far.visible=false;root.add(far);let low=false;root.userData.roadDetail='near';
  return {root,contactShadow,wheels,setDistance(distance){const next=low?distance>(traffic?250:320):distance>(traffic?325:450);if(next===low)return;low=next;root.userData.roadDetail=low?'far':'near';for(const child of closeParts)child.visible=!low;far.visible=low;},update(distance,steer,tick,stunned){for(const wheel of wheels){wheel.children[0].rotation.x=distance*.06/.36;if(wheel.userData.front)wheel.rotation.y=-steer*.3;}root.rotation.z=stunned?Math.sin(tick*.45)*.04:-steer*.012;}};
 };
 factory.dispose=()=>{for(const pair of farShells)for(const g of pair)g?.dispose();farTrim.dispose();for(const [high,low]of lowGeometry){high.dispose();low.dispose();}for(const template of templates)template.traverse(m=>{if(m.isMesh)m.material.dispose();});texture.dispose();};return factory;
}
