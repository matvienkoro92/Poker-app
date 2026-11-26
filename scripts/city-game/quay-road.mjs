import {quayCrossings} from './quay-crossings.mjs';
import * as T from '../../vendor/three/three.module.min.js';

// Bake the wear and markings into the aggregate so paint follows the road surface.
export function quayRoad(scene,x,z,width,length,across){
 const c=document.createElement('canvas'),scale=48;
 c.width=Math.round(width*scale);c.height=Math.round(length*scale);
 const ctx=c.getContext('2d'),pixels=ctx.createImageData(c.width,c.height);
 let seed=391+width;
 const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
 for(let row=0;row<c.height;row++)for(let col=0;col<c.width;col++){
  const u=col/scale,v=row/scale,lateral=across?v:u;
  const wear=Math.exp(-Math.pow((lateral%5.5-1.9)/.57,2))+Math.exp(-Math.pow((lateral%5.5-3.55)/.56,2));
  const grit=59+random()*26+5*Math.sin(.8*u+.37*v)*Math.cos(v*.51)+wear*9;
  const i=(row*c.width+col)*4;
  pixels.data[i]=grit; pixels.data[i+1]=grit+1;
  pixels.data[i+2]=grit+2; pixels.data[i+3]=255;
 }
 ctx.putImageData(pixels,0,0);ctx.scale(scale,scale);
 // Canvas Y increases towards positive world Z on a horizontal Three.js plane.
 const paint=(cx,cz,w,d)=>{
  ctx.fillStyle='#d4cdbb';ctx.fillRect(cx-w/2,cz-d/2,w,d);
  ctx.fillStyle='#666465';
  for(let i=0;i<w*d*65;i++)ctx.fillRect(cx-w/2+random()*w,cz-d/2+random()*d,.018+random()*.07,.025);
 };
 const localX=n=>n-x+width/2,localZ=n=>n-z+length/2;
 for(let i=-4;i<=4;i++)across?paint(localX(48),localZ(105+i*1.16),2.85,.62):paint(localX(72+i*1.16),localZ(96),.62,2.85);
 const crossing=quayCrossings[across?1:0];
 for(const [i,stop] of crossing.stops.entries()){
  const lane=crossing.lanes[i]+(crossing.lanes[i]-(across?105:72))*.375;
  if(across)paint(localX(stop),localZ(lane),.21,4.95);
  else paint(localX(lane),localZ(stop),4.95,.21);
 }
 if(across){for(const n of [52,58,64])paint(localX(n),localZ(105),2.3,.1);}
 else{for(const n of [75,81,87])paint(localX(72),localZ(n),.1,2.3);}
 for(let i=0;i<7;i++){
  let px=random()*width,pz=random()*length;
  ctx.beginPath();ctx.moveTo(px,pz);
  for(let j=0;j<10;j++){px+=(random()-.42)*.45;pz+=random()*.43;ctx.lineTo(px,pz);}
  ctx.strokeStyle='#333536';ctx.lineWidth=.027;ctx.stroke();
 }
 const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;map.anisotropy=8;
 const material=new T.MeshStandardMaterial({map,roughness:.94});
 material.addEventListener('dispose',()=>map.dispose());
 const mesh=new T.Mesh(new T.PlaneGeometry(width,length),material);
 mesh.rotation.x=-Math.PI/2;mesh.position.set(x,.138,z);mesh.receiveShadow=true;scene.add(mesh);
}
