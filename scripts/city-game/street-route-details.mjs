import * as T from '../../vendor/three/three.module.min.js';

const lookout={x:26.4,z:133.6,w:.46,d:.47,h:1.44};
const plazaBenches=[
 {x:99.54,z:36.6,w:1.87,d:.51,h:1.01},
 {x:99.70,z:50.1,w:1.87,d:.51,h:1.01}
];
const plazaBins=[
 {x:98.07,z:36.8,w:.44,d:.44,h:.83},
 {x:98.23,z:50.3,w:.44,d:.44,h:.83}
];
const bikeBay={x:80.04,z:-42.5,w:.76,d:2.74,h:.81};
export const streetRouteSolids=[lookout,...plazaBenches,...plazaBins,bikeBay];

export function buildStreetRouteDetails({scene,box,batch,cylinder,groundHeight}){
 const iron='#3c4946',wood='#a7825c';
 const {x,z}=lookout;
 const base=groundHeight(x,z);
 cylinder('#827e70',x,base+.08,z,.22,.15);
 cylinder(iron,x,base+.57,z,.078,1.07);
 cylinder('#8a938a',x,base+1.09,z,.13,.16);
 batch('box','#777f70',x-.11,base+1.23,z,.45,.21,.28,0,-.14);
 for(const side of [-1,1]){
  const lensZ=z+side*.084;
  box('#222e32',x-.346,base+1.248,lensZ,.048,.115,.115);
  box('#53717a',x-.372,base+1.248,lensZ,.018,.074,.074);
  box('#292d2b',x+.115,base+1.208,lensZ,.055,.083,.084);
 }
 for(const zz of [125.6,137.2,147.2]){
  const xx=33.22;
  const y=groundHeight(xx,zz);
  box('#635e55',xx,y+.014,zz,.30,.022,.68);
  for(let dz=-.27;dz<=.30;dz+=.092)
   box('#353b38',xx,y+.027,zz+dz,.245,.009,.026);
 }
 // Granite benches and steel bins give the open library plaza a seating edge.
 for(const bench of plazaBenches){
  const y=groundHeight(bench.x,bench.z);
  for(const side of [-1,1]){
   const foot=bench.x+side*.67;
   box('#878078',foot,y+.17,bench.z,.22,.32,.48);
   box('#6e6a61',foot,y+.62,bench.z+.17,.043,.66,.064);
  }
  for(const offset of [-.16,-.055,.055,.16])
   box(wood,bench.x,y+.36,bench.z+offset,bench.w,.062,.087);
  for(const height of [.59,.72,.85])
   box('#9a7655',bench.x,y+height,bench.z+.21,bench.w,.086,.063);
 }
 for(const bin of plazaBins){
  const y=groundHeight(bin.x,bin.z);
  cylinder('#5b5c52',bin.x,y+.364,bin.z,.207,.67);
  cylinder('#77796b',bin.x,y+.71,bin.z,.219,.083);
  cylinder('#222b28',bin.x,y+.755,bin.z,.145,.014);
  for(let i=0;i<12;i++){
   const angle=i*Math.PI/6;
   box('#77796a',bin.x+Math.cos(angle)*.2,y+.355,bin.z+Math.sin(angle)*.20,.019,.58,.029,angle);
  }
 }
 for(const xx of [96.6,99.4,102.2,105.2]){
  const zz=38.65;
  const y=groundHeight(xx,zz);
  box('#a69c88',xx,y+.008,zz,1.15,.013,.34);
  for(let i=-2;i<=2;i++)
   box('#c2b69c',xx+i*.205,y+.016,zz,.016,.009,.32);
 }

 // Bike stands are grouped at the shop edge, with the approach left clear.
 const bikeY=.11;
 for(const zz of [-43.62,-42.53,-41.4]){
  for(const offset of [-.23,.23]){
   cylinder(iron,bikeBay.x,bikeY+.25,zz+offset,.027,.50);
   box('#767b70',bikeBay.x,bikeY+.02,zz+offset,.11,.034,.11);
  }
  box(iron,bikeBay.x,bikeY+.48,zz,.052,.054,.46);
 }
 const tire=new T.TorusGeometry(.235,.024,7,20);
 const rim=new T.TorusGeometry(.213,.009,5,20);
 const tireMaterial=new T.MeshStandardMaterial({color:'#22282a',roughness:.91});
 const alloyMaterial=new T.MeshStandardMaterial({color:'#a9aaa2',roughness:.49,metalness:.4});
 const bikeX=bikeBay.x+.15,bikeZ=bikeBay.z;
 for(const offset of [-.43,.43]){
  for(const [geometry,material] of [[tire,tireMaterial],[rim,alloyMaterial]]){
   const wheel=new T.Mesh(geometry,material);
   wheel.rotation.y=Math.PI/2;
   wheel.position.set(bikeX,bikeY+.249,bikeZ+offset);
   scene.add(wheel);
  }
  cylinder('#737970',bikeX,bikeY+.249,bikeZ+offset,.043,.09,0,Math.PI/2);
 }
 const frame='#507b72';
 for(const [height,offset,dz,lean] of [[.39,-.16,.49,-.58],[.41,.19,.56,.48],[.48,-.09,.56,0],[.37,-.29,.34,.80]]){
  // Rotate in the YZ plane so frame tubes connect the two wheels.
  batch('box',frame,bikeX,bikeY+height,bikeZ+offset,dz,.037,.035,Math.PI/2,lean);
 }
 cylinder(iron,bikeX,bikeY+.52,bikeZ+.32,.023,.23);
 box(iron,bikeX,bikeY+.643,bikeZ+.32,.35,.033,.043);
 box('#343837',bikeX,bikeY+.565,bikeZ-.23,.116,.038,.18);
}

// Raised fixtures sit outside the primary walking lines and share their scene footprints.
const routePlanters=[
 {x:56.7,z:156.9,w:1.55,d:.76,h:.95},
 {x:30.8,z:151.9,w:1.25,d:.68,h:.91},
 {x:88.7,z:18.7,w:1.25,d:.67,h:.87},
 {x:85.5,z:34.9,w:1.35,d:.62,h:.8},
 {x:80.75,z:-48.7,w:.45,d:.72,h:.82}
];
streetRouteSolids.push(...routePlanters);

export function finishStreetRoute({box,cylinder,batch,outdoors,groundHeight}){
 for(const [index,{x,z,w,d}] of routePlanters.entries()){
  const y=groundHeight(x,z);
  box('#8c8475',x,y+.14,z,w,.28,d);
  box('#bcb0a0',x,y+.288,z,w+.10,.065,d+.08);
  box('#655649',x,y+.331,z,w-.09,.03,d-.09);
  for(let i=0;i<3;i++){
   const offset=(i-1)*w*.23;
   outdoors.shrub(x+offset,z,.27+(i%2)*.10,y+.33);
   for(let bud=0;bud<3;bud++){
    const dx=Math.sin(i*8+bud*2)*.123,dz=Math.cos(i*8+bud*2)*.12;
    batch('ball',index%2?'#bd826c':'#d2bc89',x+offset+dx,y+.61+(bud%2)*.06,z+dz,.08,.06,.077);
   }
  }
 }
 for(const [x,z] of [[55.9,160.8],[29.9,153.9],[30.3,117.5],[88,68.5],[92.6,38.7],[79.8,-35.8]]){
  const y=groundHeight(x,z);
  cylinder('#545a54',x,y+.014,z,.30,.023);
  cylinder('#878579',x,y+.027,z,.267,.008);
  for(let i=-2;i<=2;i++)
   box('#525953',x+i*.071,y+.034,z,.024,.007,.32);
  box('#5e645c',x,y+.038,z,.4,.007,.035);
 }
 // Short contrasting inserts at pedestrian junctions, with the kerbs left visible.
 for(const [x,z,dir] of [[29.8,108,1],[83.0,69.95,1],[87.3,39.1,1],[95.8,-82.35,0],[121.13,-82.11,0]]){
  const y=groundHeight(x,z);
  box('#c6a36d',x,y+.014,z,dir?1.18:.43,.02,dir?.43:1.18);
  for(let u=-2;u<=2;u++)for(let v=-1;v<=1;v++){
   cylinder('#dec08b',x+(dir?u*.195:v*.124),y+.03,z+(dir?v*.124:u*.195),.028,.012);
  }
 }
}
