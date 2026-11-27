import * as T from '../../vendor/three/three.module.min.js';
import {quayCrossings,streetFences,litterBins,crossingPhase} from './quay-crossings.mjs';
import {quayHeight} from './quayside-block.mjs';

export function furnishCrossings({scene,box,cylinder}){
 const iron='#354948',cap='#897f69';
 for(const f of streetFences){
  const across=f.w>f.d,length=Math.max(f.w,f.d),count=Math.ceil(length/1.85);
  const base=quayHeight(f.x,f.z);
  for(let i=0;i<=count*5;i++){
   const offset=length*(i/(count*5)-.5),post=i%5===0;
   box(iron,f.x+(across?offset:0),base+.52,f.z+(across?0:offset),post?.085:.032,post?1.02:.7,post?.085:.032);
  }
  for(const y of [.18,.88,.98])box(y===.98?cap:iron,f.x,base+y,f.z,f.w,.045,f.d);
 }
 for(const b of litterBins){
  cylinder(iron,b.x,.75,b.z,.23,.82);
  cylinder(cap,b.x,1.19,b.z,.255,.065);
  cylinder('#242c2c',b.x,1.227,b.z,.17,.02);
 }
 const pedestrianLights=[];
 const lenses=[],geo=new T.SphereGeometry(.098,12,8);
 const colors={green:0x56da8e,amber:0xffc455,red:0xff5045};
 const shell=new T.MeshStandardMaterial({color:'#343e40',roughness:.52,metalness:.45});
 const rim=new T.MeshStandardMaterial({color:'#77817e',roughness:.42,metalness:.6});
 const ring=new T.TorusGeometry(.112,.012,6,24);
 // Open lower half of each curved visor leaves the lens visible from the stop line.
 const hood=new T.CylinderGeometry(.143,.13,.19,20,1,true,-Math.PI*.58,Math.PI*1.16);
 hood.rotateX(Math.PI/2);hood.rotateZ(Math.PI);
 shell.side=T.DoubleSide;
 function signalPart(group,geometry,material,x,y,z){
  const mesh=new T.Mesh(geometry,material);mesh.position.set(x,y,z);
  mesh.castShadow=mesh.receiveShadow=true;group.add(mesh);return mesh;
 }
 function pedestrianIcon(walk){
  const c=document.createElement('canvas');c.width=c.height=64;
  const ctx=c.getContext('2d');ctx.fillStyle='#fff';ctx.strokeStyle='#fff';ctx.lineWidth=7;ctx.lineCap='round';
  ctx.beginPath();ctx.arc(walk?35:32,11,5,0,Math.PI*2);ctx.fill();
  function line(points){ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();}
  line(walk?[[33,22],[28,36],[17,54]]:[[32,21],[32,37],[27,55]]);
  line(walk?[[29,35],[37,41],[45,53]]:[[32,37],[37,55]]);
  line(walk?[[19,34],[26,25],[32,23],[39,32],[46,33]]:[[21,38],[24,23],[32,21],[40,23],[43,38]]);
  const map=new T.CanvasTexture(c);return map;
 }
 const icons=[pedestrianIcon(false),pedestrianIcon(true)];
 for(const c of quayCrossings){
  const [x,z]=c.pole;
  const alongZ=c.axis==='z',sign=-c.direction;
  cylinder(iron,x,1.86,z,.077,3.38);
  cylinder(cap,x,.45,z,.14,.32);
  box('#292e2b',x,3.13,z,alongZ?.36:.25,.91,alongZ?.25:.36);
  const head=new T.Group();head.position.set(x,3.13,z);
  head.rotation.y=Math.atan2(alongZ?0:sign,alongZ?sign:0);scene.add(head);
  signalPart(head,new T.BoxGeometry(.43,1.02,.05),rim,0,0,0);
  signalPart(head,new T.BoxGeometry(.39,.98,.07),shell,0,0,.045);
  // Hinges, fluted service cover and pole clamps are visible from the back.
  for(const y of [-.3,.30]){
   cylinder(cap,x,3.13+y,z,.099,.065);
   signalPart(head,new T.BoxGeometry(.16,.085,.14),rim,0,y,-.14);
   signalPart(head,new T.BoxGeometry(.042,.12,.09),rim,-.183,y,.105);
  }
  for(let k=-2;k<=2;k++)signalPart(head,new T.BoxGeometry(.027,.61,.044),shell,k*.052,0,-.14);
  for(const [j,phase] of ['red','amber','green'].entries()){
   const y=3.40-j*.26,dx=alongZ?0:sign,dz=alongZ?sign:0;
   signalPart(head,ring,rim,0,y-3.13,.168);
   signalPart(head,hood,shell,0,y-3.13,.235);
   const m=new T.MeshStandardMaterial({color:0x342f29});
   const light=new T.Mesh(geo,m);
   light.position.set(x+dx*.14,y,z+dz*.14);
   light.scale.set(alongZ?1:.36,1,alongZ?.36:1);
   scene.add(light);lenses.push({phase,m});
  }
  // Face the opposite landing so walkers can see their indication across the road.
  const walkSign=c.direction,wx=alongZ?walkSign:0,wz=alongZ?0:-walkSign;
  box(iron,x,2.04,z,alongZ?.22:.31,.54,alongZ?.31:.22);
  for(const [index,walk] of [false,true].entries()){
   const m=new T.MeshStandardMaterial();
   m.map=icons[index];m.transparent=true;m.alphaTest=.2;
   m.addEventListener('dispose',()=>icons[index].dispose());
   const lens=new T.Mesh(new T.PlaneGeometry(.245,.245),m);
   lens.rotation.y=Math.atan2(wx,wz);
   lens.position.set(x+.12*wx,2.16-index*.23,z+.12*wz);

   scene.add(lens);pedestrianLights.push({walk,m});
  }
 }
 let previous;
 return time=>{
  const active=crossingPhase(time);
  const walk=time%30>=22&&time%30<28;
  const state=active+walk;
  if(state===previous)return;
  previous=state;
  for(const light of pedestrianLights){
   const color=light.walk?colors.green:colors.red,lit=light.walk===walk;
   light.m.color.setHex(lit?color:0x383832);
   light.m.emissive.setHex(lit?color:0);
  }
  for(const {phase,m} of lenses){
   m.color.setHex(phase===active?colors[phase]:0x383832);
   m.emissive.setHex(phase===active?colors[phase]:0);
  }
 };
}
