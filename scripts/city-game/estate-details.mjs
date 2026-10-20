import * as T from '../../vendor/three/three.module.min.js';
import {estateFeatures} from './estate-plan.mjs';
// No camera-facing signs or distance-switched props: solid architecture at every viewing angle.
export function detailEstate({scene,box,cylinder,batch,label,outdoors,textures}){
 const bronze='#ad915b',iron='#263b35',stone='#b7b09b',cream='#e1d8be',wood='#76604a',green='#405d3c';
 // A solid boundary with stone caps and vertical teak screens hides the private garden from the road.
 function screen(ax,az,bx,bz,height=2.8){
  const alongX=Math.abs(bx-ax)>Math.abs(bz-az),length=Math.hypot(bx-ax,bz-az),x=(ax+bx)/2,z=(az+bz)/2;
  box(stone,x,height/2,z,alongX?length:.42,height,alongX?.42:length);
  box(cream,x,height+.06,z,alongX?length+.1:.55,.12,alongX?.55:length+.1);
  box(iron,x,.24,z,alongX?length+.03:.47,.48,alongX?.47:length+.03);
  for(let t=.4;t<length;t+=.22){const px=ax+(bx-ax)*t/length,pz=az+(bz-az)*t/length;box(wood,px+(alongX?0:.24),2,pz+(alongX?.24:0),alongX?.075:.08,1.25,alongX?.08:.075);}
  for(let t=0;t<=length;t+=5.5){const px=ax+(bx-ax)*t/length,pz=az+(bz-az)*t/length;box('#a7a08a',px,1.5,pz,.65,3,.65);box(cream,px,3.05,pz,.77,.1,.77);}
 }
 screen(53,117,53,154.4);screen(53,165.6,53,173);screen(53,117,119,117);
 // Rear and seaward edges keep the ocean view while screening the seating from neighbouring plots.
 for(const [ax,bx]of [[53,101.5],[104.5,119]]){
  box(stone,(ax+bx)/2,.48,173,bx-ax,.96,.42);box(cream,(ax+bx)/2,1.02,173,bx-ax+.05,.12,.55);
  for(let x=ax+.3;x<bx;x+=.25)box(wood,x,1.83,173,.075,1.55,.12);
  box(iron,(ax+bx)/2,2.63,173,bx-ax,.08,.18);
 }
 // Gate hardware: intercom on the actual pier, key reader, discreet downlights and rail in the paving.
 for(const z of [154.6,165.4]){
  box(stone,53,1.65,z,1.1,3.3,1.1);box(cream,53,3.36,z,1.25,.12,1.25);
  box(iron,52.41,1.65,z,.075,.62,.32);box(bronze,52.35,1.8,z,.035,.2,.22);
  batch('ball','#476866',52.32,1.86,z,.025,.025,.025);box('#d1c3a4',52.32,1.48,z,.035,.09,.09);
  box(iron,53,2.9,z,.35,.14,.4);batch('box','#f4d7a0',53,2.81,z,.28,.035,.26,0,0,true);
 }
 box(iron,53,.027,160,.16,.025,21);for(const z of [154.3,165.7])box(bronze,53,.05,z,.55,.025,.12);
 // Recognition plate is flush with the entrance pier instead of hanging above the gate.
 const address=label('TWO ACES',52.405,2.48,154.6,.68,.23,-Math.PI/2,'#263b35','#dfc28c');address.name='Mounted estate address';
 // Arrival court: generous turn-in, edge drains, inset pavers and a pedestrian route clear of the garage.
 outdoors.paving(67,159,27,24,.145);outdoors.paving(72,147,18,3,.15);
 for(const z of [147.2,170.8]){box('#4e5b53',67,.155,z,26,.025,.14);for(let x=54.5;x<80;x+=.25)box('#b4b09c',x,.173,z,.06,.018,.12);}
 for(const x of [54,80])box(iron,x,.155,159,.12,.025,23);
 for(const z of [149.2,167]){box(bronze,67,.171,z,22,.01,.035);}
 // Recessed ground lights, not floating emissive cubes.
 for(const [x,z]of [[56,151],[56,168],[64,151],[64,168],[73,151],[73,168],[79,148]]){
  cylinder(iron,x,.17,z,.12,.045);cylinder('#edcea0',x,.198,z,.075,.012);
 }
 // A flush bronze club medallion breaks up the arrival court without obstructing a turning car.
 const emblemCanvas=document.createElement('canvas');emblemCanvas.width=emblemCanvas.height=512;const eg=emblemCanvas.getContext('2d');eg.beginPath();eg.arc(256,256,242,0,Math.PI*2);eg.fillStyle='#243a34';eg.fill();for(const r of [229,216]){eg.beginPath();eg.arc(256,256,r,0,Math.PI*2);eg.strokeStyle='#b6a273';eg.lineWidth=r===229?3:1;eg.stroke();}eg.fillStyle='#c6b180';eg.font='210px Georgia';eg.textAlign='center';eg.fillText('♠',256,302);eg.font='600 24px Arial';eg.fillText('TWO ACES',256,365);const emblemMap=new T.CanvasTexture(emblemCanvas);emblemMap.colorSpace=T.SRGBColorSpace;emblemMap.anisotropy=4;textures.push(emblemMap);const emblem=new T.Mesh(new T.PlaneGeometry(5.6,5.6),new T.MeshStandardMaterial({map:emblemMap,transparent:true,alphaTest:.08,roughness:.52,metalness:.24,polygonOffset:true,polygonOffsetFactor:-1}));emblem.rotation.set(-Math.PI/2,0,Math.PI/2);emblem.position.set(67,.166,159);emblem.receiveShadow=true;emblem.name='Flush arrival medallion';scene.add(emblem);
 // Wall-mounted camera and charging point share the gate/garage architecture, never float in space.
 box(iron,52.42,3.1,154.6,.3,.07,.14);batch('cyl',cream,52.2,3.1,154.6,.12,.42,.12,0,Math.PI/2);batch('cyl','#223f43',51.98,3.1,154.6,.09,.015,.09,0,Math.PI/2);
 box(iron,81.65,1.48,169.3,.3,1.3,.55);box('#586f69',81.48,1.68,169.3,.025,.32,.35);box(bronze,81.46,1.44,169.3,.025,.06,.3);box(iron,81.33,1.1,169.3,.07,.65,.07);box(iron,81.4,.79,169.3,.2,.07,.07);
 // Raised beds have soil, stone coping, repeated planting and warm under-coping strips.
 for(const f of estateFeatures.filter(f=>f.id.includes('planter'))){
  box(stone,f.x,f.h/2,f.z,f.w,f.h,f.d);box(cream,f.x,f.h+.035,f.z,f.w+.12,.07,f.d+.12);
  box('#3f3d2e',f.x,f.h+.08,f.z,Math.max(.3,f.w-.28),.035,Math.max(.3,f.d-.28));
  const length=Math.max(f.w,f.d),alongX=f.w>f.d;
  for(let t=-length/2+.5;t<length/2;t+=.9){const x=f.x+(alongX?t:0),z=f.z+(alongX?0:t);outdoors.shrub(x,z,.7,f.h+.1);for(let i=0;i<4;i++){const a=i*2.399;batch('ball',i%2?'#b4b3a3':'#b19a7c',x+Math.sin(a)*.15,.83,z+Math.cos(a)*.15,.035,.06,.035);}}
  batch('box','#e6ca94',f.x,f.h-.12,f.z+f.d/2+.018,Math.max(.1,f.w-.25),.025,.02,0,0,true);
 }
 // Intimate garden pavilion with a slatted roof, built-in sofa and brass privacy louvers.
 outdoors.deck(68,144.1,13,5.7,.16);
 for(const x of [62,74])for(const z of [142,146]){box(iron,x,1.7,z,.28,3.25,.28);box(bronze,x,.32,z,.31,.04,.31);}
 for(const z of [142,146])box(wood,68,3.36,z,12.6,.22,.25);
 for(let x=61.9;x<74.2;x+=.32)box(wood,x,3.52,144,.13,.16,4.7);
 for(let x=62.2;x<74;x+=.25)box(wood,x,1.82,146.1,.09,2.75,.1);
 box(wood,69,.58,145,5.4,.22,1.5);box('#d5cbb2',69,.78,145,5.25,.22,1.35);box('#d5cbb2',69,1.19,145.6,5.4,.68,.18);
 for(const x of [67.4,68.5,69.6,70.7]){batch('box',x<69?'#48665c':'#bcaa81',x,1.13,145.44,.62,.5,.17,0,.06);}
 box(iron,68,.49,143.3,2.7,.12,1.2);for(const x of [67,69])box(bronze,x,.26,143.3,.05,.48,.8);
 for(let i=0;i<3;i++){cylinder(cream,67.5+i*.42,.59,143.25,.11,.05);cylinder(cream,67.5+i*.42,.69,143.25,.055,.14);}
 box(green,68.5,.59,143.5,.5,.065,.35);box(bronze,68.5,.63,143.5,.35,.008,.015);
 // Garden lamps have sealed bases and softly glowing diffusers, with no free-standing signboards.
 for(const [x,z]of [[59,125],[59,139],[75.8,122],[75.8,139],[61,149],[75,149]]){
  box(iron,x,.46,z,.14,.92,.14);box(iron,x,.93,z,.28,.08,.28);batch('box','#efd8aa',x,.82,z,.12,.13,.12,0,0,true);
 }
 for(const [x,z]of [[60.5,123],[74,122],[59.5,138]])outdoors.tree(x,z,4.2);
 // Quiet visitor bench beside the arrival court, with a screen and integrated planter.
 box(wood,59.5,.55,168.6,4,.18,1.3);box('#c7bca2',59.5,.73,168.6,3.8,.18,1.16);box(wood,59.5,1.05,169.13,4,.85,.14);
 for(const x of [57.4,61.6]){box(stone,x,.45,168.6,.7,.9,1.5);outdoors.shrub(x,168.6,.75,.9);}
 // Ocean lounge: tableware, a proper outdoor bar, towel rolls and a framed timber threshold.
 box(wood,111.5,.57,181,1.1,1.14,3.5);box(stone,111.5,1.2,181,1.3,.12,3.7);
 for(const z of [179.7,180.3,180.9]){cylinder('#476359',111.5,1.4,z,.075,.3);cylinder(bronze,111.5,1.58,z,.035,.08);}
 for(const z of [180,181.3]){cylinder(iron,110,.32,z,.07,.64);cylinder(wood,110,.7,z,.36,.12);}
 for(const z of [178.5,183.5]){batch('cyl','#d5cbb4',94.4,.72,z,.16,.65,.16,0,Math.PI/2);box(wood,96.9,.4,z,.7,.1,.65);cylinder(cream,96.9,.49,z,.12,.055);}
 box(wood,103,.16,173.2,3,.16,1.2);for(const x of [101.7,104.3])box(bronze,x,.27,173.2,.045,.035,1.2);
 // The seaside retreat is private too; low rails preserve the horizon and stay aligned with physics.
 for(const f of estateFeatures.filter(f=>f.id.includes('sea-fence'))){const alongX=f.w>f.d,length=Math.max(f.w,f.d);box(stone,f.x,.18,f.z,f.w,.36,f.d);box(iron,f.x,1.18,f.z,f.w,.07,f.d);for(let t=-length/2;t<=length/2;t+=.6)box(iron,f.x+(alongX?t:0),.76,f.z+(alongX?0:t),.035,.84,.035);}
 const gardenGate=new T.Group();gardenGate.name='Private garden pedestrian gate';gardenGate.position.set(101.5,0,173);scene.add(gardenGate);const gardenGateMaterial=new T.MeshStandardMaterial({color:iron,metalness:.45,roughness:.4});
 for(let i=0;i<12;i++){const slat=new T.Mesh(new T.BoxGeometry(.1,1.8,.1),gardenGateMaterial);slat.position.set(.15+i*.24,1.24,0);slat.castShadow=true;gardenGate.add(slat);}for(const y of [.4,2.1]){const rail=new T.Mesh(new T.BoxGeometry(3,.08,.13),gardenGateMaterial);rail.position.set(1.5,y,0);gardenGate.add(rail);}
 let gardenOpen=0;
 // A dark still-water basin with visible stone coping and continuous curved fountain streams.
 const water=new T.MeshPhysicalMaterial({color:'#426d68',roughness:.16,metalness:.12,clearcoat:1,transparent:true,opacity:.83,depthWrite:false});
 const basin=new T.Mesh(new T.CylinderGeometry(2.95,2.95,.018,64),water);basin.position.set(68,.593,133);basin.name='Private garden fountain water';scene.add(basin);
 const rim=new T.Mesh(new T.TorusGeometry(3.22,.15,10,80),new T.MeshStandardMaterial({color:cream,roughness:.62}));rim.rotation.x=Math.PI/2;rim.position.set(68,.56,133);rim.castShadow= true;scene.add(rim);
 const jets=new T.Group();jets.name='Garden fountain streams';scene.add(jets);
 const jetMaterial=new T.MeshPhysicalMaterial({color:'#a8d5cc',roughness:.13,transparent:true,opacity:.65,depthWrite:false});
 for(let i=0;i<6;i++){const a=i*Math.PI/3,path=new T.CatmullRomCurve3([new T.Vector3(0,1.57,0),new T.Vector3(Math.sin(a)*.8,1.8,Math.cos(a)*.8),new T.Vector3(Math.sin(a)*1.75,.61,Math.cos(a)*1.75)]),jet=new T.Mesh(new T.TubeGeometry(path,16,.022,5,false),jetMaterial);jet.position.set(68,0,133);jets.add(jet);}
 // Water ripples are a single stable mesh, never randomly replaced geometry.
 const rippleCanvas=document.createElement('canvas');rippleCanvas.width=rippleCanvas.height=256;const g=rippleCanvas.getContext('2d');for(let r=12;r<122;r+=14){g.beginPath();g.arc(128,128,r,0,Math.PI*2);g.strokeStyle='#b9ded526';g.lineWidth=1.5;g.stroke();}const map=new T.CanvasTexture(rippleCanvas);textures.push(map);const ripples=new T.Mesh(new T.PlaneGeometry(5.7,5.7),new T.MeshBasicMaterial({map,transparent:true,opacity:.45,depthWrite:false}));ripples.rotation.x=-Math.PI/2;ripples.position.set(68,.608,133);scene.add(ripples);
 return {update(time,position,dt){gardenOpen=T.MathUtils.damp(gardenOpen,Math.hypot(position.x-103,position.z-173)<4?1:0,5,dt);gardenGate.rotation.y=gardenOpen*-Math.PI*.48;ripples.material.opacity=.33+Math.sin(time*.8)*.07;jetMaterial.opacity=.58+Math.sin(time*1.1)*.035;}};
}
