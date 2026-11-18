import * as T from '../../vendor/three/three.module.min.js';
import {shores,parks,roads,lots,landmarks} from './metropolis.mjs';

// Static instances share one draw per visible 200 m cell and primitive.
export function buildMetropolis(scene){
 const bins=new Map(),box=new T.BoxGeometry(),crown=new T.IcosahedronGeometry(1,0),material=new T.MeshStandardMaterial({roughness:.86});
 function add(x,y,z,w,h,d,color,angle=0,round=false){
  const key=[Math.floor(x/200),Math.floor(z/200),round].join(',');
  if(!bins.has(key))bins.set(key,{geometry:round?crown:box,parts:[]});
  bins.get(key).parts.push([x,y,z,w,h,d,color,angle]);
 }
 for(const rows of shores)for(const p of rows){add(p.x,-.55,p.z,p.w,1,p.d,0xa9ab89);add(p.x+p.w/2-3,-.045,p.z,6,.06,p.d,0xe2cca1);}
 for(const p of parks){
  add(p.x,.02,p.z,p.w,.12,p.d,0x829867);add(p.x,.09,p.z,3,.04,p.d,0xdcc9a1);
  for(let i=0;i<24;i++){const x=p.x+((i*37%97)/97-.5)*p.w,z=p.z+((i*53%101)/101-.5)*p.d;if(Math.abs(x-p.x)<5)continue;
   add(x,2,z,.65,4,.65,0x715e47);add(x,5,z,3.6,3.7,3.6,0x58744e,0,true);}
 }
 for(const {a,b,bridge} of roads){
  const dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz),angle=Math.atan2(dx,dz),sx=dz/len,sz=-dx/len;
  const x=(a.x+b.x)/2,z=(a.z+b.z)/2;
  add(x,bridge?-.22:0,z,18,bridge?.51:.08,len+1,bridge?0x666e70:0x555e62,angle);
  for(const side of [-1,1])add(x+sx*side*9.8,bridge?.52:.12,z+sz*side*9.8,bridge?.43:1.7,bridge?1:.23,len-18,bridge?0xb2aa99:0xcac2ad,angle);
  for(let m=12;m<len-8;m+=14){const px=a.x+dx*m/len,pz=a.z+dz*m/len;add(px,.075,pz,.18,.025,4.8,0xead3a4,angle);
   if(!bridge&&m%42===12){const tx=px+sx*14,tz=pz+sz*14;add(tx,2.3,tz,.45,4.6,.45,0x78634b);add(tx,5.3,tz,3.1,2.6,3.1,0x637f57,0,true);}
  }
 }
 for(const p of lots){
  const {x,z,w,d,h,color}=p;add(x,h/2,z,w,h,d,color);add(x,h+.4,z,w+1,.8,d+1,0xd7cdb8);
  if(p.kind==='stand'){
   const longX=w>d,long=longX?w:d;
   for(let t=-long/2+5;t<long/2;t+=12)for(const side of [-1,1]){
    const px=x+(longX?t:side*w/2),pz=z+(longX?side*d/2:t);
    add(px,3,pz,longX?6:.4,6,longX?.4:6,0x45545b);
    add(px,h*.66,pz,longX?9:.5,1.3,longX?.5:9,0xa65b4f);
   }
   for(let i=0;i<4;i++)add(x,h+i*.7,z,w*(1-i*.07),.65,d*(1-i*.07),i%2?0xb45b51:0xdca98e);continue;}
  for(let y=4;y<h-1;y+=5){for(const sign of [-1,1]){add(x,y,z+sign*(d/2+.05),w*.87,1.6,.12,0x51747c);add(x+sign*(w/2+.05),y,z,.12,1.6,d*.79,0x51747c);}}
  for(const side of [-1,1]){
   for(let dx=-w*.38;dx<w*.39;dx+=5)add(x+dx,h/2,z+side*(d/2+.15),.55,h,.27,color);
   for(let dz=-d*.38;dz<d*.39;dz+=5)add(x+side*(w/2+.15),h/2,z+dz,.27,h,.55,color);
   add(x,1.75,z+side*(d/2+.19),3.6,3.5,.26,0x435c60);
   add(x,3.7,z+side*(d/2+.9),5.7,.28,2,0xb37c67);
  }
  if(h>20)add(x+w*.18,h+1.5,z,6,3,5,0x848e87);
 }
 // The east coast promenade runs beside the last avenue, clear of its intersections.
 for(const p of shores[1]){const edge=p.x+p.w/2;add((509+edge)/2,-.01,p.z,edge-509,.12,p.d,0xe9d3a3);}add(513,.08,-1650,8,.16,2880,0xcfbd9f);
 for(let z=-3040;z<-230;z+=36){
  add(517,3.2,z,.55,6.4,.55,0x84684c);
  for(let i=0;i<5;i++){const angle=i*Math.PI*.4;add(517+Math.sin(angle)*1.55,6.4,z+Math.cos(angle)*1.55,1.45,.42,4.6,0x507b53,angle,true);}
 }
 for(const p of landmarks){
  if(p.type==='airport'){
   for(const dx of [45,104]){const x=p.x+dx,z=p.z+102;add(x,1.6,z,2,2,16,0xe1e5df,0,true);add(x,1.5,z,14,.4,3,0xd9ded8);add(x,2.7,z-6,.45,3.4,2.4,0x537285);}
   add(p.x+80,.07,p.z+70,138,.12,19,0x596068);for(let i=0;i<8;i++)add(p.x+20+i*16,.15,p.z+70,7,.03,.4,0xffffff);}
  if(p.type==='stadium'){add(p.x+115,.12,p.z+130,125,.2,121,0x59865c);for(const dx of [28,194])for(const dz of [29,219]){add(p.x+dx,18,p.z+dz,.65,36,.65,0x848e89);add(p.x+dx,36,p.z+dz,6,2.4,1,0xffe4b3);}}
 }
 const dummy=new T.Object3D(),tint=new T.Color();
 for(const {geometry,parts} of bins.values()){
  const mesh=new T.InstancedMesh(geometry,material,parts.length);
  parts.forEach(([x,y,z,w,h,d,color,angle],i)=>{dummy.position.set(x,y,z);dummy.rotation.y=angle;dummy.scale.set(w,h,d);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);mesh.setColorAt(i,tint.setHex(color));});
  mesh.computeBoundingSphere();scene.add(mesh);
 }
}
