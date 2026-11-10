import * as T from '../../vendor/three/three.module.min.js';

// Shallow surface detail is decorative, never an unmarked collision obstacle.
export function createStreetSurfaces(scene,E,sample){
 const canvas=document.createElement('canvas');canvas.width=canvas.height=256;const c=canvas.getContext('2d');c.clearRect(0,0,256,256);c.fillStyle='#313b3e';c.beginPath();c.arc(128,128,116,0,Math.PI*2);c.fill();c.strokeStyle='#818483';c.lineWidth=7;c.stroke();c.strokeStyle='#141d20';c.lineWidth=6;for(let y=48;y<220;y+=17){const w=Math.sqrt(Math.max(0,10000-(y-128)**2));c.beginPath();c.moveTo(128-w,y);c.lineTo(128+w,y);c.stroke();}c.strokeStyle='#a1a29b';c.lineWidth=2;c.beginPath();c.arc(128,128,103,0,Math.PI*2);c.stroke();
 const map=new T.CanvasTexture(canvas);map.colorSpace=T.SRGBColorSpace;
 const iron=new T.InstancedMesh(new T.PlaneGeometry(1,1),new T.MeshStandardMaterial({map,transparent:true,alphaTest:.2,roughness:.72,metalness:.45,depthWrite:false}),18);iron.frustumCulled=false;iron.receiveShadow=true;scene.add(iron);
 const patchCanvas=document.createElement('canvas');patchCanvas.width=patchCanvas.height=128;const p=patchCanvas.getContext('2d');p.fillStyle='#262d30';p.beginPath();p.moveTo(9,17);p.lineTo(106,9);p.lineTo(119,92);p.lineTo(98,117);p.lineTo(16,111);p.closePath();p.fill();p.strokeStyle='#111c20';p.lineWidth=3;p.stroke();for(let n=0;n<1500;n++){p.fillStyle=n%2?'#a1a5a40a':'#0000000c';p.fillRect((n*47)%112+8,(n*71)%100+14,1,1);}
 const patchMap=new T.CanvasTexture(patchCanvas);patchMap.colorSpace=T.SRGBColorSpace;
 const patches=new T.InstancedMesh(new T.PlaneGeometry(1,1),new T.MeshStandardMaterial({map:patchMap,transparent:true,alphaTest:.1,roughness:.98,depthWrite:false}),18);patches.frustumCulled=false;patches.receiveShadow=true;scene.add(patches);
 const transform=new T.Object3D();let last=null;
 function at(mesh,index,d,lateral,w,h){const q=sample(d,lateral),a=sample(d-10,lateral),b=sample(d+10,lateral);transform.position.set(q.x,q.y+.012,q.z);transform.rotation.set(-Math.PI/2-Math.atan2(b.y-a.y,1.2),q.a,0,'YXZ');transform.scale.set(w,h,1);transform.updateMatrix();mesh.setMatrixAt(index,transform.matrix);}
 return {update(distance){const base=Math.floor(distance/220)*220;if(base===last)return;last=base;let count=0;for(let i=0;i<18;i++){const index=base/220+i-2,d=index*220;if(!E.road(d).city||E.road(d).bridge)continue;at(iron,count,d,(index%2?-.7:.65),.8,.8);at(patches,count,d+70,((index*7)%9-4)*.15,1.3,2.1);count++;}for(const mesh of [iron,patches]){mesh.count=count;mesh.instanceMatrix.needsUpdate=true;}}};
}
