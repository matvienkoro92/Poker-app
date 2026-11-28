import * as T from '../../vendor/three/three.module.min.js';
import {bahetle} from './krems-plan.mjs';

export function createStorefrontReflection(){
 const canvas=document.createElement('canvas');
 canvas.width=128;canvas.height=256;
 const ctx=canvas.getContext('2d');
 const sky=ctx.createLinearGradient(0,0,0,256);
 sky.addColorStop(0,'#b1b9c6a7');
 sky.addColorStop(.44,'#cbb8a363');
 sky.addColorStop(.76,'#bac8bd13');
 sky.addColorStop(1,'#a5b7af94');
 ctx.fillStyle=sky;ctx.fillRect(0,0,128,256);
 ctx.fillStyle='#d6d7ca45';
 ctx.beginPath();ctx.moveTo(8,0);ctx.lineTo(34,0);ctx.lineTo(100,256);ctx.lineTo(80,256);ctx.fill();
 ctx.fillStyle='#304e5560';ctx.fillRect(0,164,128,3);
 const map=new T.CanvasTexture(canvas);
 map.colorSpace=T.SRGBColorSpace;
 return map;
}

export function buildBahetleFront({scene,box,cylinder,label,outdoors}){
 const west=81.80,first=-54.7,last=-28.33,ground=.116;
 const stone='#c8b8a2',lintel='#b4a48f',bronze='#454d47';
 const glassMap=createStorefrontReflection();
 const glaze=new T.MeshPhysicalMaterial({map:glassMap,color:'#d0ded9',transparent:true,opacity:.62,depthWrite:false,roughness:.19,metalness:.12,clearcoat:.74,side:T.DoubleSide});
 glaze.addEventListener('dispose',()=>glassMap.dispose());
 const panel=new T.PlaneGeometry(1,1);
 const panes=new T.Group();panes.name='Bahetle recessed glazing';scene.add(panes);
 function pane(z,w,h,y,x=west+.093){
  const mesh=new T.Mesh(panel,glaze);
  mesh.scale.set(w,h,1);mesh.rotation.y=-Math.PI/2;mesh.position.set(x,y,z);panes.add(mesh);
 }
 function window(z,w,door=false){
  box('#514d43',west+.29,1.12,z,.07,1.88,w+.12);
  box('#c0ae93',west+.095,.27,z,.43,.13,w+.14);
  box('#706554',west+.075,1.99,z,.39,.11,w+.14);
  for(const side of [-1,1]){
   box(lintel,west+.065,1.12,z+side*(w/2+.02),.38,1.7,.073);
   box(bronze,west+.076,1.13,z+side*w/2,.080,1.64,.045);
  }
  for(const y of [.31,1.57,1.96])
   box(bronze,west+.073,y,z,.086,.043,w);
  if(door){
   box(bronze,west+.07,1.12,z,.073,1.64,.050);
   for(const side of [-1,1])
    box('#d7c7ad',west+.011,1.06,z+side*.09,.055,.28,.027);
  }else{
   const inset=west+.225;
   for(const y of [.55,.83,1.11]){
    box('#83775f',inset,y,z,.13,.035,w*.81);
    for(let i=-3;i<=3;i++){
     const itemZ=z+i*w*.102;
     const color=['#88836b','#a86c54','#c8ac75','#66786c'][(i+(y>.8?6:3))%4];
     box(color,inset-.055,y+.064,itemZ,.072,.10+(Math.abs(i)%2)*.038,.079);
    }
   }
   box('#f1d8ab',west+.265,1.75,z,.035,.025,w*.82);
  }
  pane(z,w,1.63,1.13);
 }

 box(stone,west+.135,.214,(first+last)/2,.36,.198,last-first);
 box(stone,west+.12,2.12,(first+last)/2,.47,.154,last-first);
 box(lintel,west+.085,2.249,(first+last)/2,.49,.112,last-first);
 box('#7d7264',west-.137,2.195,(first+last)/2,.033,.025,last-first);
 const bayCenters=[];
 for(let z=first+.86;z<last-.45;z+=1.68){
  if(Math.abs(z-bahetle.z)>1.62)bayCenters.push(z);
 }
 for(const z of bayCenters)window(z,1.32);
 window(bahetle.z,1.88,true);
 for(const z of [first,...bayCenters.map(center=>center-.81),bahetle.z-1.05,bahetle.z+1.05,last]){
  box(stone,west-.032,1.16,z,.29,1.89,.25);
  for(const y of [.63,1.16,1.66])
   box('#857969',west-.18,y,z,.009,.014,.231);
 }
 box('#504e42',west-.35,2.12,bahetle.z,.73,.135,2.57);
 box('#e5d3ad',west-.5,2.045,bahetle.z,.30,.019,2.35);
 label('БАХЕТЛЕ',west-.732,2.20,bahetle.z,2.50,.35,-Math.PI/2,'#403e32','#fff1ce');
 for(const z of [-50.55,-43.5,-30.15]){
  cylinder('#626d63',west-.187,1.16,z,.029,2.02);
  for(const y of [.53,1.29,1.94])box('#a5a497',west-.178,y,z,.087,.041,.079);
 }

 outdoors.asphalt(72,-41.55,14,26.8,.040);
 outdoors.paving(80.59,-41.55,2.36,26.8,ground);
 for(let z=first+.39;z<=last;z+=.71){
  const color=['#b8b3a7','#c6bfb0','#a9a79c','#beb7aa'][Math.floor((z-first)*17)%4];
  box(color,79.43,.139,z,.273,.104,.691);
  box('#928e83',79.283,.097,z,.029,.027,.692);
  box('#b3aa9b',80.64,ground+.005,z,2.10,.008,.019);
 }
 box('#a9a18e',81.72,ground+.006,(first+last)/2,.065,.008,last-first);
 for(const z of [-31.4,-42.4,-51.8]){
  box('#5d6159',79.074,.054,z,.285,.025,.55);
  for(let d=-.195;d<=.2;d+=.077)
   box('#333a35',79.078,.070,z+d,.22,.008,.021);
 }
 // Warm pools beneath the shop canopy soften the join between stone and glass.
 const glowCanvas=document.createElement('canvas');
 glowCanvas.width=glowCanvas.height=64;
 const ctx=glowCanvas.getContext('2d');
 const gradient=ctx.createRadialGradient(32,32,1,32,32,31);
 gradient.addColorStop(0,'#fbd9a541');gradient.addColorStop(1,'#fbd9a500');
 ctx.fillStyle=gradient;ctx.fillRect(0,0,64,64);
 const glowMap=new T.CanvasTexture(glowCanvas);
 glowMap.colorSpace=T.SRGBColorSpace;
 const glow=new T.MeshBasicMaterial({map:glowMap,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1});
 glow.addEventListener('dispose',()=>glowMap.dispose());
 const pool=new T.PlaneGeometry(1.7,2.3);
 for(const z of [bahetle.z,-43.3,-49.5]){
  const mesh=new T.Mesh(pool,glow);mesh.rotation.x=-Math.PI/2;
  mesh.position.set(81.08,ground+.017,z);scene.add(mesh);
 }
}
