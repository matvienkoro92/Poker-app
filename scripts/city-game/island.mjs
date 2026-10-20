import * as T from '../../vendor/three/three.module.min.js';
import {ISLAND} from './world.mjs';
export function buildIsland({scene,box,cylinder,batch,label,textures,outdoors}){
 const {x,z,rx,rz}=ISLAND;
 const ground=new T.Mesh(new T.CylinderGeometry(1,1.03,1,72),new T.MeshStandardMaterial({color:'#bba77d',roughness:1}));ground.position.set(x,-.52,z);ground.scale.set(rx,1,rz);ground.receiveShadow=true;scene.add(ground);
 outdoors.lawnEllipse(x,z,rx-1,rz-1);
 box('#c5b799',170,.04,45,26,.08,4);
 // The island belongs to the public lunapark; the villa stands on the mainland.
 box('#a9a088',157,.045,67,10,.08,74);box('#c9bda5',157,.07,67,11,.04,74);
 box('#7d8581',136,.08,70,52,.16,14);for(const side of [-1,1]){box('#d4c3a1',136,.22,70+side*6.7,52,.24,.5);box('#47564e',136,1.15,70+side*6.7,52,.09,.1);for(let xx=112;xx<163;xx+=4)cylinder('#a79877',xx,.75,70+side*6.7,.12,1.5);}
 for(let xx=113;xx<162;xx+=7)box('#e3d2a2',xx,.17,70,3,.015,.12);for(const xx of [116,132,148]){box('#c6ba9e',xx,-1.4,70,1.4,2.8,12);}
 label('ОСТРОВ TWO ACES →',111,3.3,78,13,1.2);
 // A park silhouette locates the already-existing bonus mission, without changing its unlock.
 const parkFloor=new T.Mesh(new T.CircleGeometry(21,48),new T.MeshStandardMaterial({color:'#bbaa7d',roughness:.9}));parkFloor.rotation.x=-Math.PI/2;parkFloor.position.set(199,.035,34);scene.add(parkFloor);
 for(const xx of [187,209]){cylinder('#ae8e4c',xx,3,45,.23,6);batch('cone','#a1513d',xx,6.5,45,4.5,2,4.5);cylinder('#c5ae6c',xx,1,45,3.5,.15);}
 const wheel=new T.Group();wheel.name='Lunapark Royal Flush wheel';wheel.position.set(200,12,27);scene.add(wheel);const trim=new T.MeshStandardMaterial({color:'#d6b662',metalness:.6,roughness:.3,emissive:'#8c5a1f',emissiveIntensity:.2});const hoop=new T.Mesh(new T.TorusGeometry(9,.16,8,64),trim);wheel.add(hoop);
 for(let i=0;i<8;i++){const a=i*Math.PI/4;const spoke=new T.Mesh(new T.BoxGeometry(.09,17,.09),trim);spoke.rotation.z=a;wheel.add(spoke);const cabin=new T.Mesh(new T.SphereGeometry(.8,10,8),new T.MeshStandardMaterial({color:i%2?'#a34431':'#27654c',metalness:.25,roughness:.4}));cabin.position.set(Math.sin(a)*9,-Math.cos(a)*9,0);wheel.add(cabin);}for(const xx of [195,205]){box('#b8a176',xx,5,27,.45,10,.6);}
 label('ЛУНОПАРК · ДОПМИССИЯ',199,3.2,54,22,1.3);label('ЛУНОПАРК ←  ·  В ГОРОД →',157,3,77,16,1);
 // Palms follow the shoreline and never occupy the driveway or house.
 for(let i=0;i<22;i++){const a=i*Math.PI*2/22,px=x+Math.cos(a)*(rx-5),pz=z+Math.sin(a)*(rz-5);if(px<164&&pz>62&&pz<110)continue;outdoors.palm(px,pz,6+i%3);}

 return {};
}
