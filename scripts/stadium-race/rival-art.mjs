import {mergeGeometries} from '../../vendor/three/addons/utils/BufferGeometryUtils.js';
import * as T from '../../vendor/three/three.module.min.js';

// Lightweight, self-contained race bodies; no additional model downloads.
export function createRivalArt(index,name){
 const root=new T.Group(),wheels=[],frontWheels=[];
 const colors=[0xb63d37,0x664c9b,0xe7ae32],paint=new T.MeshStandardMaterial({color:colors[index],metalness:.45,roughness:.32}),dark=new T.MeshStandardMaterial({color:0x182631,roughness:.67}),metal=new T.MeshStandardMaterial({color:0xb7c6c9,metalness:.8,roughness:.28}),rubber=new T.MeshStandardMaterial({color:0x12181c,roughness:1});
 const add=(geometry,material,x,y,z,parent=root)=>{const m=new T.Mesh(geometry,material);m.position.set(x,y,z);parent.add(m);return m;};
 const box=(m,x,y,z,w,h,d)=>add(new T.BoxGeometry(w,h,d),m,x,y,z);
 // Sculpt the body along its length instead of stacking rectangular blocks.
 const sections=[[-1.85,.65,.38],[-1.45,1.0,.66],[-.75,1.02,.82],[.35,.81,.68],[1.25,.65,.5],[1.9,.42,.34]],vertices=[],indices=[];
 for(const [z,w,h]of sections)vertices.push(-w,.32,z,-w,h,z,w,h,z,w,.32,z);
 for(let i=0;i<sections.length-1;i++)for(let j=0;j<4;j++){const a=i*4+j,b=i*4+(j+1)%4,c=b+4,d=a+4;indices.push(a,b,d,b,c,d);}
 indices.push(0,2,1,0,3,2,20,21,22,20,22,23);const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(vertices,3));geo.setIndex(indices);geo.computeVertexNormals();add(geo,paint,0,0,0);
 box(dark,0,.77,-.5,1.05,.2,1.12);box(paint,0,.95,-.95,1.1,.36,.25);box(dark,0,.32,1.7,1.8,.12,.4);
 const accent=new T.MeshStandardMaterial({color:index===1?0xe2d7bb:0xf4ecd6,roughness:.5});box(accent,0,.69,.7,.23,.025,1.1);
 const wingWidth=[2.5,2.2,2.65][index];box(dark,0,1.18,-1.6,wingWidth,.12,.44);for(const side of [-1,1]){box(metal,side*.65,.85,-1.6,.08,.65,.08);box(paint,side*wingWidth/2,1.25,-1.6,.09,.32,.5);box(dark,side*.96,.42,-.2,.12,.14,2.5);
  const light=new T.MeshStandardMaterial({color:0xff4530,emissive:0xb5220a,emissiveIntensity:.6});box(light,side*.6,.62,-1.68,.34,.1,.05);
  const exhaust=add(new T.CylinderGeometry(.105,.105,.4,10),metal,side*.38,.38,-1.85);exhaust.rotation.x=Math.PI/2;
 }
 for(const side of [-1,1])for(const z of [-1.18,1.18]){const pivot=new T.Group();pivot.position.set(side*1.05,.45,z);root.add(pivot);if(z>0)frontWheels.push(pivot);const spin=new T.Group();pivot.add(spin);wheels.push(spin);
  const tyre=add(new T.CylinderGeometry(.46,.46,.4,20),rubber,0,0,0,spin);tyre.rotation.z=Math.PI/2;
  const rim=add(new T.CylinderGeometry(.27,.27,.42,12),metal,0,0,0,spin);rim.rotation.z=Math.PI/2;
  const hub=add(new T.CylinderGeometry(.12,.12,.44,8),dark,0,0,0,spin);hub.rotation.z=Math.PI/2;
 }
 const suit=new T.MeshStandardMaterial({color:[0x303b45,0xddd9d0,0x223e43][index],roughness:.9});const sphere=new T.SphereGeometry(1,16,10);
 const ellipsoid=(material,x,y,z,sx,sy,sz)=>{const m=add(sphere,material,x,y,z);m.scale.set(sx,sy,sz);return m;};
 ellipsoid(suit,0,1.13,-.5,.35,.42,.25);
 const helmet=ellipsoid(paint,0,1.68,-.42,.32,.34,.32);
 ellipsoid(new T.MeshStandardMaterial({color:0x142a3e,metalness:.6,roughness:.16}),0,1.7,-.15,.28,.12,.11);
 box(accent,0,1.98,-.42,.08,.025,.36);
 for(const side of [-1,1]){const arm=ellipsoid(suit,side*.3,1.22,-.1,.11,.12,.4);arm.rotation.x=-.25;ellipsoid(dark,side*.25,1.18,.25,.1,.09,.1);}
 const steering=add(new T.TorusGeometry(.28,.035,6,16),dark,0,1.18,.25);steering.rotation.x=-.6;
 const canvas=document.createElement('canvas');canvas.width=256;canvas.height=128;const ctx=canvas.getContext('2d');ctx.fillStyle='#f1e9d0';ctx.fillRect(0,0,256,128);ctx.fillStyle='#142c38';ctx.textAlign='center';ctx.font='bold 62px Arial';ctx.fillText(String(index+7).padStart(2,'0'),128,66);ctx.font='bold 29px Arial';ctx.fillText(name.toUpperCase(),128,105);const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
 const plate=add(new T.PlaneGeometry(.75,.38),new T.MeshBasicMaterial({map:texture}),0,.78,-1.87);plate.rotation.y=Math.PI;
 const shadowCanvas=document.createElement('canvas');shadowCanvas.width=shadowCanvas.height=64;const sc=shadowCanvas.getContext('2d'),fade=sc.createRadialGradient(32,32,6,32,32,32);fade.addColorStop(0,'#07121a88');fade.addColorStop(1,'#07121a00');sc.fillStyle=fade;sc.fillRect(0,0,64,64);const shadow=add(new T.PlaneGeometry(3.4,5),new T.MeshBasicMaterial({map:new T.CanvasTexture(shadowCanvas),transparent:true,depthWrite:false}),0,.025,0);shadow.rotation.x=-Math.PI/2;
 // Merge fixed body pieces by material; moving wheels and helmet stay separate.
 root.updateMatrixWorld(true);const buckets=new Map();
 for(const mesh of [...root.children]){if(!mesh.isMesh||mesh===helmet||mesh.material.map||mesh.material.transparent)continue;const geometry=mesh.geometry.index?mesh.geometry.toNonIndexed():mesh.geometry.clone();geometry.applyMatrix4(mesh.matrix);geometry.deleteAttribute('uv');const list=buckets.get(mesh.material)||[];list.push(geometry);buckets.set(mesh.material,list);root.remove(mesh);}
 for(const [material,parts]of buckets){const geometry=mergeGeometries(parts);parts.forEach(g=>g.dispose());root.add(new T.Mesh(geometry,material));}
 root.userData.rivalName=name;
 return {root,update(distance,steer,time,stunned=false){wheels.forEach(w=>w.rotation.x=distance*.11);frontWheels.forEach(w=>w.rotation.y=-steer*.2);helmet.rotation.z=-steer*.12+Math.sin(time*.025+index)*.025;root.rotation.z=stunned?Math.sin(time*.45)*.08:-steer*.035;root.position.y+=stunned?Math.abs(Math.sin(time*.6))*.07:Math.sin(distance*.09)*.012;}};
}
