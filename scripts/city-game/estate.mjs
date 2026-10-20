import * as T from '../../vendor/three/three.module.min.js';
import {detailEstate} from './estate-details.mjs';
import {VILLA,GATE,PENINSULA} from './world.mjs';
export function buildEstate({scene,box:rawBox,cylinder:rawCylinder,batch:rawBatch,label:rawLabel,outdoors,textures}){
 const dx=VILLA.x-211,dz=VILLA.z-88;
 const box=(c,x,y,z,...args)=>rawBox(c,x+dx,y,z+dz,...args),cylinder=(c,x,y,z,...args)=>rawCylinder(c,x+dx,y,z+dz,...args),batch=(type,c,x,y,z,...args)=>rawBatch(type,c,x+dx,y,z+dz,...args),label=(t,x,y,z,...args)=>rawLabel(t,x+dx,y,z+dz,...args);
 const ground=new T.Mesh(new T.CylinderGeometry(1,1.02,1,72),new T.MeshStandardMaterial({color:'#bba77d',roughness:1}));ground.position.set(PENINSULA.x,-.52,PENINSULA.z);ground.scale.set(PENINSULA.rx,1,PENINSULA.rz);ground.receiveShadow=true;scene.add(ground);
 outdoors.lawnEllipse(PENINSULA.x,PENINSULA.z,PENINSULA.rx-1,PENINSULA.rz-1);
 outdoors.lawnRect(69,114,98,58,.018);
 rawBox('#a1947b',69,-.02,114,98,.04,58);
 rawBox('#787f77',40,.06,132.5,11,.12,55);rawBox('#787f77',56,.06,105,43,.12,11);rawBox('#787f77',72,.06,89,11,.12,38);rawBox('#b8b097',48,.07,160,16,.14,10);
 outdoors.asphalt(40,132.5,11,55);outdoors.asphalt(56,105,43,11);outdoors.asphalt(72,89,11,38);
 outdoors.paving(32.8,139,2.8,43,.075);outdoors.paving(47.2,139,2.8,43,.075);
 for(const x of [34.2,45.8]){rawBox('#c3bea6',x,.09,139,.22,.18,43);rawBox('#4b5651',x+(x<40?.2:-.2),.128,139,.055,.012,43);}
 // Subtle lane-edge repairs and expansion cuts keep the approach from reading as a flat plane.
 for(let z=119;z<158;z+=6){rawBox('#636d66',35.1,.132,z,.35,.008,2.5);rawBox('#879184',44.9,.132,z,.035,.009,4);}
 for(let z=111;z<159;z+=7)rawBox('#e8d7ac',40,.13,z,.1,.015,3);for(let x=43;x<75;x+=7)rawBox('#e8d7ac',x,.13,105,3,.015,.1);
 for(const [px,pz]of [[27,126],[24,146],[36,174],[62,184],[88,188],[122,144]])outdoors.palm(px,pz,7);
 for(const [px,pz]of [[51,126],[51,144],[51,169],[67,178],[92,177],[117,170]])outdoors.shrub(px,pz,1.3);
 for(const [px,pz]of [[26,120],[30,163],[54,183]])outdoors.tree(px,pz,5.5);
 for(let i=0;i<16;i++){const a=.15+i*.13,px=PENINSULA.x+Math.cos(a)*(PENINSULA.rx-1),pz=PENINSULA.z+Math.sin(a)*(PENINSULA.rz-1);if(px>92&&px<117&&pz>174&&pz<190)continue;outdoors.rock(px,pz,.6+i%3*.35);}
 for(const pz of [115,137,160]){rawCylinder('#43564c',34,3.2,pz,.08,6.4);rawBox('#43564c',35,6.35,pz,2,.1,.1);rawBatch('box','#ffe0a0',35.7,6.25,pz,.55,.1,.3,0,0,true);}
 // An ocean lounge belongs to the villa: timber pergola, outdoor sofas and low planting.
 rawBox('#8c7354',107,.035,181,14,.07,10);outdoors.deck(107,181,14,10,.08);
 outdoors.paving(103,174.5,2.6,5,.045);for(const px of [100.7,113.3])for(const pz of [176.7,185.3]){rawBox('#68513a',px,1.75,pz,.18,3.5,.18);rawCylinder('#79684d',px,-.6,pz,.15,1.2);}
 for(const px of [100.5,113.5])rawBox('#6f563b',px,3.5,181,.18,.22,9.4);for(let xx=101;xx<114;xx+=.5)rawBox('#93704b',xx,3.6,181,.14,.15,9.4);
 for(const pz of [178,184]){rawBox('#6d604b',108,.35,pz,5.6,.5,1.6);rawBox('#d1c7ae',108,.65,pz,5.3,.22,1.45);rawBox('#d1c7ae',108,.95,pz+(pz<181?-.65:.65),5.5,.75,.25);for(const px of [106,110])rawBox('#52766b',px,.98,pz,.65,.55,.18);}
 rawBox('#544e40',107,.48,181,2.8,.12,1.5);for(const px of [105.9,108.1])rawBox('#303c34',px,.25,181,.07,.5,1.1);
 for(const pz of [178,184]){outdoors.shrub(114.1,pz,1.2);rawBox('#867555',114.1,.3,pz,1,.6,1.4);}for(const px of [101,113]){rawCylinder('#564d39',px,.35,186.1,.35,.7);rawBatch('ball','#f6dca0',px,.85,186.1,.17,.26,.17,0,0,true);}
 for(const pz of [178.5,183.5]){rawBox('#806b4a',94.5,.35,pz,3.6,.18,1.5);rawBox('#ded3b8',95,.53,pz,2.4,.18,1.32);rawBatch('box','#ded3b8',93.35,.8,pz,1.15,.18,1.32,0,-.55);for(const px of [93,96])rawBox('#5a5140',px,.17,pz,.1,.34,1.2);}

 // Estate boundary: cream stone plinth, black iron infill, brass lanterns.
 const fence=(ax,az,bx,bz)=>{const horizontal=Math.abs(bx-ax)>Math.abs(bz-az),length=Math.hypot(bx-ax,bz-az),cx=(ax+bx)/2,cz=(az+bz)/2;box('#c2b18f',cx,.35,cz,horizontal?length:.38,.7,horizontal?.38:length);for(let t=0;t<=length;t+=.65){const px=ax+(bx-ax)*t/length,pz=az+(bz-az)*t/length;box('#26342c',px,1.25,pz,.055,1.55,.055);}for(const y of [.8,1.7])box('#45513c',cx,y,cz,horizontal?length:.08,.055,horizontal?.08:length);for(let t=0;t<=length;t+=6){const px=ax+(bx-ax)*t/length,pz=az+(bz-az)*t/length;box('#bba887',px,1,pz,.5,2,.5);cylinder('#e0bf76',px,2.07,pz,.18,.16);}};
 fence(232,58,232,114);
 // A generous turning court, separate pedestrian approach, lawn and fountain.
 box('#a1947b',180,.045,100,28,.08,24);for(let xx=168;xx<194;xx+=2)for(let zz=90;zz<113;zz+=2){box('#c4b79b',xx,.09,zz,1.94,.035,1.94);}
 box('#d0c3a5',185,.07,88,20,.08,3);box('#d0c3a5',175,.07,80,3,.08,18);outdoors.paving(185+dx,88+dz,20,3,.125);outdoors.paving(175+dx,80+dz,3,18,.125);
 box('#52764c',183,.06,72,22,.1,19);outdoors.lawnRect(183+dx,72+dz,22,19,.12);for(const side of [-1,1])box('#9b9677',183,.2,72+side*9.5,23,.3,.3);
 cylinder('#b2a384',181,.27,74,3.4,.5);cylinder('#518c8b',181,.55,74,3.05,.06);cylinder('#c5b18b',181,1,74,.35,1);batch('ball','#d3c29c',181,1.65,74,.7,.24,.7);
 for(const [px,pz]of [[170,63],[188,63],[171,83],[193,78],[226,61],[229,111]]){cylinder('#766544',px,.45,pz,.65,.9);for(let i=0;i<8;i++){const a=i*Math.PI/4;batch('ball','#446943',px+Math.sin(a)*.5,1.2,pz+Math.cos(a)*.5,.45,.7,.3,a);}}

 outdoors.paving(180+dx,100+dz,28,24,.13);for(const [px,pz]of [[170,63],[188,63],[171,83],[193,78],[226,61],[229,111]])outdoors.shrub(px+dx,pz+dz,.9);
 // Sliding gate opens before the player reaches it; the fixed fence has one physical opening.
 const gate=new T.Group();gate.name='Estate sliding gate';scene.add(gate);const iron=new T.MeshStandardMaterial({color:'#1c3028',metalness:.7,roughness:.3}),gold=new T.MeshStandardMaterial({color:'#bda365',metalness:.7,roughness:.3});
 function bar(w,h,d,y,z,material=iron){const o=new T.Mesh(new T.BoxGeometry(w,h,d),material);o.position.set(0,y,z);o.castShadow=true;gate.add(o);}
 bar(.13,2.65,10,1.52,0);for(let yy=.32;yy<2.85;yy+=.22)bar(.18,.055,9.9,yy,0,gold);for(const zz of [-4.95,4.95])bar(.21,2.8,.13,1.55,zz,gold);bar(.2,.65,1.25,1.55,0,gold);
 for(const zz of [95.6,106.4]){box('#c5b18d',166,1.45,zz,.9,2.9,.9);box('#263a2c',166,3,zz,.8,.25,.8);batch('ball','#ffe0a0',166,3.25,zz,.17,.3,.17,0,0,true);}gate.position.set(GATE.x,0,GATE.z);
 const details=detailEstate({scene,box:rawBox,cylinder:rawCylinder,batch:rawBatch,label:rawLabel,outdoors,textures});
 let openness=0,clock=0;return {update(position,dt){clock+=dt;details.update(clock,position,dt);const near=Math.hypot(position.x-GATE.x,position.z-GATE.z)<18;openness=T.MathUtils.damp(openness,near?1:0,5,dt);gate.position.z=GATE.z+openness*10.2;},get status(){return {open:openness>.85,amount:openness};}};
}
