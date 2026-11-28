import * as T from '../../vendor/three/three.module.min.js';

export const kremsStreetFurniture=[
 {x:101.35,z:-81.1,w:1.18,d:.37,h:.44},
 {x:104.5,z:-81.08,w:.36,d:.36,h:.78},
 {x:118.65,z:-81.05,w:.40,d:.40,h:.82}
];

export function buildKremsStreetDetails({box,cylinder}){
 const [bench,...planters]=kremsStreetFurniture;
 const pavement=.116;
 for(const x of [bench.x-.45,bench.x+.45])
  box('#383b39',x,pavement+.11,bench.z,.075,.22,.33);
 for(const z of [bench.z-.12,bench.z,bench.z+.12])
  box('#8e6948',bench.x,pavement+.24,z,bench.w,.065,.093);
 for(const y of [.35,.43])
  box('#a07a53',bench.x,pavement+y,bench.z+.16,bench.w,.055,.047);
 for(const {x,z,w,d} of planters){
  box('#55524b',x,pavement+.20,z,w,.40,d);
  box('#777367',x,pavement+.39,z,w+.035,.055,d+.035);
  for(let i=0;i<11;i++){
   const a=i*2.399,xOffset=Math.cos(a)*.12,zOffset=Math.sin(a)*.13;
   cylinder(i%2?'#607653':'#70805b',x+xOffset,pavement+.52+(i%3)*.046,z+zOffset,.064,.21+(i%3)*.06);
  }
 }
 for(const x of [100.0,106.8,114.4]){
  const z=-83.27-(x-96)*.022;
  box('#53524d',x,.102,z,.49,.016,.18);
  for(let i=-3;i<=3;i++)box('#262c2b',x+i*.059,.112,z,.021,.006,.14);
 }
}


export function buildKremsWindowRoom({scene,box,cylinder},{x:door,frontZ:front}){
 const floor=.135,z=depth=>front+depth;
 const cream='#e5dac9',oak='#a18160',fabric='#ad9e8f',base='#5f665e';
 box('#b2a99a',112.6,floor-.024,z(1.25),8.75,.048,2.92);
 box(cream,112.6,1.1,z(2.39),8.7,1.94,.08);
 box(cream,112.6,2.05,z(1.17),8.7,.13,2.48);

 // Face the rear bar from the entrance. Both side aisles pass the central table.
 const tableZ=z(.97);
 const top=new T.Mesh(new T.CylinderGeometry(1,1,.07,28),new T.MeshStandardMaterial({color:oak,roughness:.84}));
 top.position.set(door,.65,tableZ);
 top.scale.set(.39,1,.52);
 top.castShadow=top.receiveShadow=true;
 scene.add(top);
 for(const depth of [.70,1.24]){
  cylinder(base,door,.383,z(depth),.045,.465);
  cylinder(base,door,.158,z(depth),.134,.046);
 }
 cylinder('#ede5d7',door,.741,tableZ,.057,.120);
 for(const side of [-1,1]){
  const x=door+side*1.40;
  for(const depth of [.64,1.56]){
   cylinder(oak,x,.55,z(depth),.19,.045);
   cylinder(base,x,.341,z(depth),.034,.405);
   cylinder(base,x,.16,z(depth),.11,.035);
   const chairX=x+side*.12,chairZ=z(depth-.285);
   box(fabric,chairX,.377,chairZ,.205,.065,.206);
   box(fabric,chairX,.49,chairZ-.078,.205,.18,.044);
   for(const dx of [-.071,.071])for(const dz of [-.070,.070]){
    box(oak,chairX+dx,.246,chairZ+dz,.025,.22,.025);
   }
   cylinder('#eee6d8',x,.596,z(depth),.025,.047);
  }
 }
 // Keep the two paths open up to the service edge of the counter.
 const barZ=z(2.10);
 box(oak,door,.484,barZ,2.72,.65,.43);
 box('#f1e8db',door,.829,barZ,2.80,.056,.50);
 for(let x=door-1.32;x<door+1.36;x+=.071){
  box('#987653',x,.489,barZ-.224,.034,.59,.018);
 }
 for(const [offset,h] of [[-1.16,.22],[-.78,.17],[-.39,.23],[0,.13],[.39,.18],[.78,.24],[1.16,.31]]){
  box(cream,door+offset,.158+h/2,barZ-.239,.39,h,.025);
 }
 const showcase=door-.83;
 const glass=new T.MeshStandardMaterial({color:'#c7d9d7',transparent:true,opacity:.16,roughness:.24,depthWrite:false});
 const caseFront=new T.Mesh(new T.PlaneGeometry(.58,.45),glass);
 caseFront.rotation.y=Math.PI;
 caseFront.position.set(showcase,1.077,barZ-.174);
 scene.add(caseFront);
 for(const x of [showcase-.29,showcase+.29]){
  box('#302f29',x,1.077,barZ-.174,.020,.46,.03);
 }
 for(const y of [.87,1.067,1.305]){
  box('#3f3c34',showcase,y,barZ,.60,.027,.35);
 }
 for(const y of [.89,1.09])for(const [index,dx] of [-.17,0,.16].entries()){
  cylinder(index===1?'#c48474':'#dcc196',showcase+dx,y+.029,barZ,.049,.054);
 }
 box('#ced1c7',door+.66,.976,barZ,.49,.24,.29);
 box('#403c34',door+.66,.972,barZ-.152,.46,.075,.02);
 for(const dx of [-1.06,-.51,.04,.59,1.10]){
  box('#efebe0',door+dx,1.73,z(2.29),.47,.27,.132);
 }

 const pendant=new T.MeshStandardMaterial({color:'#fff2dc',emissive:'#ffd3a0',emissiveIntensity:.65});
 const diffuser=new T.Mesh(new T.SphereGeometry(.107,12,8),pendant);
 diffuser.position.set(door,1.56,tableZ);
 diffuser.scale.set(1,.53,1);
 scene.add(diffuser);
 cylinder('#443d31',door,1.827,tableZ,.012,.40);
 cylinder('#b89b78',door,1.62,tableZ,.155,.10);
 const roomLight=new T.PointLight('#ffe3bb',1.55,5.2,2);
 roomLight.position.set(door,1.80,z(1.31));
 scene.add(roomLight);
}
