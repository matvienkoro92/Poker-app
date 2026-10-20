import * as T from '../../vendor/three/three.module.min.js';
import {ISLAND,ESTATE,GATE} from './world.mjs';
export function buildIsland({scene,box,cylinder,batch,label,textures}){
 const {x,z,rx,rz}=ISLAND;
 const ground=new T.Mesh(new T.CylinderGeometry(1,1.03,1,72),new T.MeshStandardMaterial({color:'#bba77d',roughness:1}));ground.position.set(x,-.52,z);ground.scale.set(rx,1,rz);ground.receiveShadow=true;scene.add(ground);
 const turf=new T.Mesh(new T.CircleGeometry(1,72),new T.MeshStandardMaterial({color:'#647856',roughness:1}));turf.rotation.x=-Math.PI/2;turf.scale.set(rx-1,rz-1,1);turf.position.set(x,.01,z);turf.receiveShadow=true;scene.add(turf);
 box('#c5b799',170,.04,45,26,.08,4);
 // Two waterfront districts share one island: public park north, private villa south.
 box('#a9a088',157,.045,67,10,.08,74);box('#c9bda5',157,.07,67,11,.04,74);
 box('#7d8581',136,.08,70,52,.16,14);for(const side of [-1,1]){box('#d4c3a1',136,.22,70+side*6.7,52,.24,.5);box('#47564e',136,1.15,70+side*6.7,52,.09,.1);for(let xx=112;xx<163;xx+=4)cylinder('#a79877',xx,.75,70+side*6.7,.12,1.5);}
 for(let xx=113;xx<162;xx+=7)box('#e3d2a2',xx,.17,70,3,.015,.12);for(const xx of [116,132,148]){box('#c6ba9e',xx,-1.4,70,1.4,2.8,12);}
 label('ОСТРОВ TWO ACES →',111,3.3,78,13,1.2);
 // Estate boundary: cream stone plinth, black iron infill, brass lanterns.
 const fence=(ax,az,bx,bz)=>{const horizontal=Math.abs(bx-ax)>Math.abs(bz-az),length=Math.hypot(bx-ax,bz-az),cx=(ax+bx)/2,cz=(az+bz)/2;box('#c2b18f',cx,.35,cz,horizontal?length:.38,.7,horizontal?.38:length);for(let t=0;t<=length;t+=.65){const px=ax+(bx-ax)*t/length,pz=az+(bz-az)*t/length;box('#26342c',px,1.25,pz,.055,1.55,.055);}for(const y of [.8,1.7])box('#45513c',cx,y,cz,horizontal?length:.08,.055,horizontal?.08:length);for(let t=0;t<=length;t+=6){const px=ax+(bx-ax)*t/length,pz=az+(bz-az)*t/length;box('#bba887',px,1,pz,.5,2,.5);cylinder('#e0bf76',px,2.07,pz,.18,.16);}};
 fence(166,58,166,96);fence(166,106,166,114);fence(166,58,232,58);fence(166,114,232,114);fence(232,58,232,114);
 // A generous turning court, separate pedestrian approach, lawn and fountain.
 box('#a1947b',180,.045,100,28,.08,24);for(let xx=168;xx<194;xx+=2)for(let zz=90;zz<113;zz+=2){box('#c4b79b',xx,.09,zz,1.94,.035,1.94);}
 box('#d0c3a5',185,.07,88,20,.08,3);box('#d0c3a5',175,.07,80,3,.08,18);
 box('#52764c',183,.06,72,22,.1,19);for(const side of [-1,1])box('#9b9677',183,.2,72+side*9.5,23,.3,.3);
 cylinder('#b2a384',181,.27,74,3.4,.5);cylinder('#518c8b',181,.55,74,3.05,.06);cylinder('#c5b18b',181,1,74,.35,1);batch('ball','#d3c29c',181,1.65,74,.7,.24,.7);
 for(const [px,pz]of [[170,63],[188,63],[171,83],[193,78],[226,61],[229,111]]){cylinder('#766544',px,.45,pz,.65,.9);for(let i=0;i<8;i++){const a=i*Math.PI/4;batch('ball','#446943',px+Math.sin(a)*.5,1.2,pz+Math.cos(a)*.5,.45,.7,.3,a);}}
 for(const pz of [86,113]){box('#514736',182,.6,pz,5,.18,1);box('#514736',182,1,pz+.5,5,.8,.14);for(const px of [180,184])box('#273b31',px,.3,pz,.1,.6,.7);}
 // Sliding gate opens before the player reaches it; the fixed fence has one physical opening.
 const gate=new T.Group();gate.name='Estate sliding gate';scene.add(gate);const iron=new T.MeshStandardMaterial({color:'#1c3028',metalness:.7,roughness:.3}),gold=new T.MeshStandardMaterial({color:'#bda365',metalness:.7,roughness:.3});
 function bar(w,h,d,y,z,material=iron){const o=new T.Mesh(new T.BoxGeometry(w,h,d),material);o.position.set(0,y,z);o.castShadow=true;gate.add(o);}
 for(let zz=-4.8;zz<=4.8;zz+=.48)bar(.12,2.15,.045,1.28,zz);for(const yy of [.4,1.9])bar(.15,.11,10,yy,0,gold);bar(.19,.6,1.35,1.35,0,gold);
 for(const zz of [95.6,106.4]){box('#c5b18d',166,1.45,zz,.9,2.9,.9);box('#263a2c',166,3,zz,.8,.25,.8);batch('ball','#ffe0a0',166,3.25,zz,.17,.3,.17,0,0,true);}label('ВИЛЛА · ЧАСТНАЯ ТЕРРИТОРИЯ',165.4,3.8,101,12,.8,-Math.PI/2);gate.position.set(GATE.x,0,GATE.z);
 // A park silhouette locates the already-existing bonus mission, without changing its unlock.
 const parkFloor=new T.Mesh(new T.CircleGeometry(21,48),new T.MeshStandardMaterial({color:'#bbaa7d',roughness:.9}));parkFloor.rotation.x=-Math.PI/2;parkFloor.position.set(199,.035,34);scene.add(parkFloor);
 for(const xx of [187,209]){cylinder('#ae8e4c',xx,3,45,.23,6);batch('cone','#a1513d',xx,6.5,45,4.5,2,4.5);cylinder('#c5ae6c',xx,1,45,3.5,.15);}
 const wheel=new T.Group();wheel.name='Lunapark Royal Flush wheel';wheel.position.set(200,12,27);scene.add(wheel);const trim=new T.MeshStandardMaterial({color:'#d6b662',metalness:.6,roughness:.3,emissive:'#8c5a1f',emissiveIntensity:.2});const hoop=new T.Mesh(new T.TorusGeometry(9,.16,8,64),trim);wheel.add(hoop);
 for(let i=0;i<8;i++){const a=i*Math.PI/4;const spoke=new T.Mesh(new T.BoxGeometry(.09,17,.09),trim);spoke.rotation.z=a;wheel.add(spoke);const cabin=new T.Mesh(new T.SphereGeometry(.8,10,8),new T.MeshStandardMaterial({color:i%2?'#a34431':'#27654c',metalness:.25,roughness:.4}));cabin.position.set(Math.sin(a)*9,-Math.cos(a)*9,0);wheel.add(cabin);}for(const xx of [195,205]){box('#b8a176',xx,5,27,.45,10,.6);}
 label('ЛУНОПАРК · ДОПМИССИЯ',199,3.2,54,22,1.3);label('ВИЛЛА ←  ·  В ГОРОД →',157,3,77,16,1);
 // Palms follow the shoreline and never occupy the driveway or house.
 for(let i=0;i<22;i++){const a=i*Math.PI*2/22,px=x+Math.cos(a)*(rx-5),pz=z+Math.sin(a)*(rz-5);if(px<164&&pz>62&&pz<110)continue;const h=6+(i%3);cylinder('#896a43',px,h/2,pz,.19,h);for(let j=0;j<7;j++){const angle=j*Math.PI*2/7;batch('ball','#416a41',px+Math.sin(angle)*1.6,h,pz+Math.cos(angle)*1.6,2.4,.18,.55,angle);}}
 let openness=0;return {update(position,dt){const near=Math.hypot(position.x-GATE.x,position.z-GATE.z)<18;openness=T.MathUtils.damp(openness,near?1:0,5,dt);gate.position.z=GATE.z+openness*10.2;},get status(){return {open:openness>.85,amount:openness};}};
}
