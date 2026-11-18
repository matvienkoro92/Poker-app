import {buildMiamiArchitecture} from './miami-architecture.mjs';
import {addNeonBlade} from './sign-lighting.mjs';
import * as T from '../../vendor/three/three.module.min.js';

// Each address is fixed in course coordinates. The parent landmark manager
// streams it with the district, including on restart and on the short route.
export function buildDistrictLandmarks(E,at,block,tree){
 const atlas=new T.TextureLoader().load('assets/last-buy-in/optimized/miami-route-facades-v1.webp');
 atlas.colorSpace=T.SRGBColorSpace;atlas.anisotropy=4;
 const masonry=new T.MeshStandardMaterial({map:atlas,emissiveMap:atlas,emissive:'#ffe6cd',emissiveIntensity:.32,roughness:.86});
 const walls=Array.from({length:6},(_,tile)=>{
  const box=new T.BoxGeometry(1,1,1),uv=box.attributes.uv;
  for(let i=0;i<uv.count;i++)uv.setXY(i,(tile%3+.006+.988*uv.getX(i))/3,(1-Math.floor(tile/3)+.006+.988*uv.getY(i))/2);
  return box;
 });
 function building(g,tile,x,z,width,height,length,trim){
  const wall=new T.Mesh(walls[tile],masonry);
  wall.position.set(x,height/2,z);wall.scale.set(width,height,length);
  wall.userData.batchSceneDetail=true;g.add(wall);
  block(g,trim,x,height+.1,z,width+.36,.2,length+.36);
  block(g,'#817d70',x,-.32,z,width+.28,.7,length+.28);
 }
 const pipe=new T.CylinderGeometry(1,1,1,10);
 const steel=new T.MeshStandardMaterial({color:'#839398',roughness:.56,metalness:.35});
 function tube(g,a,b,r){
  const line=new T.Vector3().subVectors(b,a),mesh=new T.Mesh(pipe,steel);
  mesh.position.copy(a).addScaledVector(line,.5);mesh.scale.set(r,line.length(),r);
  mesh.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),line.normalize());
  mesh.userData.batchSceneDetail=true;g.add(mesh);
 }
 const v=(x,y,z)=>new T.Vector3(x,y,z);
 buildMiamiArchitecture(E,at,block);
 const ticket=at(720);
 building(ticket,0,16,0,6,4.1,8,'#b3ad91');
 for(const z of [-3,0,3]){
  block(ticket,'#436764',11.7,2.96,z,3,.17,2.8);
  tube(ticket,v(10.4,0,z-1.2),v(10.4,2.92,z-1.2),.055);
 }
 // Low planted berms connect the stadium approach to the distant skyline.
 // Leave a break between groves at the apex so the chevrons stay visible.
 const bermGeometry=new T.SphereGeometry(1,18,8);
 const turf=new T.MeshStandardMaterial({color:'#647354',roughness:1});
 for(const [d,side,depth] of [[1020,-1,24],[1490,-1,31],[3450,1,25],[4270,1,32]]){
  const grove=at(d),mound=new T.Mesh(bermGeometry,turf);
  mound.position.set(side*depth,-.55,0);mound.scale.set(7.8,2,12);
  mound.userData.batchSceneDetail=true;grove.add(mound);
  for(const [i,z] of [-7,-2,5].entries())tree(grove,i+d,side*(depth+Math.sin(d+i)*2.6),z);
 }
 const scoreboard=at(3720);
 for(const z of [-3.8,3.8])tube(scoreboard,v(17,0,z),v(17,7,z),.21);
 block(scoreboard,'#343f4a',17,6.4,0,.54,3.4,9);
 for(let row=0;row<3;row++)for(let col=0;col<6;col++)
  block(scoreboard,col<=row+1?'#e2b175':'#697979',16.7,7.4-row*.86,-3.5+col*1.4,.055,.28,.98);

 const garden=at(6670);
 building(garden,1,-18,0,8.4,4.8,12,'#788e84');
 const arch=new T.CylinderGeometry(1,1,1,20,1,false,0,Math.PI).rotateY(-Math.PI/2);
 const glass=new T.MeshStandardMaterial({color:'#789e9c',roughness:.32,metalness:.26,side:T.DoubleSide});
 const dome=new T.Mesh(arch,glass);dome.rotation.x=-Math.PI/2;
 dome.position.set(-18,4.8,0);dome.scale.set(4.18,12,2.3);dome.userData.batchSceneDetail=true;garden.add(dome);
 for(let z=-5;z<=5;z+=2.5)for(let n=0;n<8;n++){
  const p=t=>v(-18+4.2*Math.cos(t),4.81+2.34*Math.sin(t),z);
  tube(garden,p(n*Math.PI/8),p((n+1)*Math.PI/8),.055);
 }
 // The park's outdoor stage has a scalloped shell and curved rows of timber seating.
 const stage=at(7540),shellGeometry=new T.SphereGeometry(1,32,12,0,Math.PI,0,Math.PI/2);
 const shell=new T.Mesh(shellGeometry,new T.MeshStandardMaterial({color:'#c4b398',side:T.DoubleSide,roughness:.81}));
 shell.position.set(19,.65,1);shell.rotation.y=Math.PI/2;
 shell.scale.set(6.2,5.1,4.2);shell.userData.batchSceneDetail=true;stage.add(shell);
 block(stage,'#846b57',18,.31,1,6.7,.62,12.8);
 for(const angle of [.15,.65,1.25,1.88,2.49,3.0]){
  const arcPoint=t=>v(19+4.24*Math.sin(t)*Math.sin(angle),.65+5.14*Math.cos(t),1-6.24*Math.sin(t)*Math.cos(angle));
  for(let k=0;k<8;k++)tube(stage,arcPoint(k*Math.PI/16),arcPoint((k+1)*Math.PI/16),.057);
 }
 for(const x of [11.3,13.5])for(const z of [-2.9,1.1,5.1]){
  block(stage,'#956f50',x,.53,z,.55,.14,2.95);
  for(const dz of [-.95,.95])block(stage,'#646c66',x,.25,z+dz,.28,.5,.18);
 }
 // Rockfall galleries: drainage outlets, inspection steps and a braced steel walkway.
 for(const [d,side,count] of [[E.LAP+6350,-1,6],[E.LAP+8320,1,4]]){
  const g=at(d),x=side*13;
  block(g,'#626e6d',x,2.3,0,1.65,.18,count*2.3);
  for(let i=0;i<=count;i++){
   const z=(i-count/2)*2.3;
   tube(g,v(x+side*.6,.2,z),v(x-side*.6,2.25,z),.10);
   tube(g,v(x-side*.77,2.38,z),v(x-side*.77,3.38,z),.048);
  }
  for(const h of [2.85,3.38])tube(g,v(x-side*.77,h,-count*1.15),v(x-side*.77,h,count*1.15),.052);
 }
 const transit=at(E.LAP*2+1560);
 building(transit,0,20,0,7,4,8,'#9ca28c');
 for(const z of [-5,5])tube(transit,v(12,.1,z),v(12,3.75,z),.11);
 block(transit,'#728c88',15.4,3.78,0,7.3,.22,11);
 const theater=at(E.cityDistance(5000));
 building(theater,2,26,0,10,8.6,13,'#dab9a4');
 for(let i=0;i<3;i++)block(theater,i===1?'#c8dec9':'#b7897f',26,8.84+i*.43,0,9-i*1.6,.46,9-i*2);
 block(theater,'#f0c793',20.35,3.8,0,2.2,.45,9);
 block(theater,'#58656a',15.4,4,-5.8,.3,8,.3);
 addNeonBlade(theater,block,'CINEMA',15.4,10.1,-5.8,'#ffad91');
 // Open parking decks give the commercial block a silhouette visible through its columns.
 const parking=at(E.cityDistance(5300));
 for(let level=0;level<4;level++){
  const y=.22+level*2.8;
  block(parking,'#a49a89',23,y,0,13,.42,18);
  if(level===3)continue;
  for(const x of [17.2,23,28.8])for(const z of [-8,0,8])block(parking,'#817e75',x,y+1.4,z,.52,2.8,.52);
  block(parking,'#777b78',17,y+.68,0,.22,.88,17.8);
  const ramp=block(parking,'#96988e',25,y+1.4,0,3.4,.25,12.2);
  ramp.rotation.x=-.23;
  for(const z of [-6,0,6])block(parking,'#f1d29e',18.5,y+2.52,z,.25,.09,1.8);
 }
 const hotel=at(E.cityDistance(5670));
 building(hotel,3,-28,0,12,12,13,'#c5c4ab');
 const penthouse=new T.Group();penthouse.position.y=12.22;hotel.add(penthouse);
 building(penthouse,3,-29,-1,8,4.4,8,'#cdc9ad');
 block(hotel,'#58656a',-15.7,4.5,-5.3,.3,9,.3);
 addNeonBlade(hotel,block,'HOTEL',-15.7,11,-5.3,'#85e1db');
 const inn=at(E.cityDistance(6550));
 building(inn,4,-25,0,8,5.4,11,'#c0c2ac');
 for(const z of [-5,0,5])tube(inn,v(-18,.05,z),v(-18,3.15,z),.10);
 block(inn,'#718a91',-20,3.18,0,5,.2,11);
 // Sails stay out in the bay and read above the coping before the dock comes into view.
 const regatta=at(E.cityDistance(6750));regatta.position.y=-4;
 const sailGeometry=new T.BufferGeometry();
 sailGeometry.setAttribute('position',new T.Float32BufferAttribute([0,0,0, .20,2.65,1.25, 0,5.35,0, 0,0,0, 0,.23,2.7, .20,2.65,1.25],3));
 sailGeometry.computeVertexNormals();
 const sailcloth=['#e8d6ae','#a66354','#92b2ad'].map(color=>new T.MeshStandardMaterial({color,side:T.DoubleSide,roughness:.93}));
 for(const [i,x,z,angle] of [[0,28,-8,.6],[1,38,4,1.25],[2,47,-15,-.4]]){
  const yacht=new T.Group();yacht.position.set(x,0,z);yacht.rotation.y=angle;regatta.add(yacht);
  const hull=new T.Mesh(new T.SphereGeometry(1,14,8),steel);hull.position.y=.11;hull.scale.set(.86,.47,3.15);hull.userData.batchSceneDetail=true;yacht.add(hull);
  tube(yacht,v(0,.3,0),v(0,6.15,0),.053);
  for(const dir of [-1,1]){
   const sail=new T.Mesh(sailGeometry,sailcloth[dir<0?0:i]);sail.position.y=.64;
   sail.rotation.y=dir<0?Math.PI:0;sail.scale.set(1,dir<0?.75:1,dir<0?.74:1);
   sail.userData.batchSceneDetail=true;yacht.add(sail);
  }
 }
 const customs=at(E.cityDistance(8050));
 building(customs,5,24,0,10,6,14,'#76807a');
 block(customs,'#999485',17.9,.56,0,2.3,1.12,12);
 for(const z of [-4,0,4])block(customs,'#403f3c',16.69,.65,z,.18,.55,.65);
 // A covered loading conveyor climbs to twin grain silos beyond the customs yard.
 const mill=at(E.cityDistance(7780));
 const vat=new T.CylinderGeometry(1,1,1,24),cap=new T.ConeGeometry(1,1,24);
 for(const z of [-4,3]){
  for(const [geometry,y,r,h] of [[vat,6.4,2.95,12.8],[cap,13.55,3.12,1.5]]){
   const m=new T.Mesh(geometry,steel);m.position.set(25,y,z);m.scale.set(r,h,r);
   m.userData.batchSceneDetail=true;mill.add(m);
  }
 }
 const belt=block(mill,'#8e867a',25,8.1,10.6,1.7,1.3,16.5);belt.rotation.x=.58;
 for(const z of [8,13,17])block(mill,'#6b706a',25,Math.max(1,8.1-(z-10.6)*.65)/2,z,.27,Math.max(1,8.1-(z-10.6)*.65),.27);
 const finish=at(E.FINISH-410);
 for(const side of [-1,1]){
  const x=side*(E.roadLayout(E.FINISH-410).halfWidth+2.2);
  for(let i=0;i<3;i++){
   const h=6.6-i*.95;
   block(finish,'#83a4a1',x+side*i*.44,h/2,0,.42,h,1.05);
   block(finish,'#f6cd94',x+side*i*.44,h+.12,0,.45,.24,1.1);
  }
 }
}
