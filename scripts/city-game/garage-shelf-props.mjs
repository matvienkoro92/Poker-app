import * as T from '../../vendor/three/three.module.min.js';

// Small workshop props share finishes and are merged with the room's static batches.
export function furnishGarageShelves({add,panel,steel,paint,black,brass,textures}){
 const red=new T.MeshStandardMaterial({color:'#963d32',roughness:.53,metalness:.15}),plastic=new T.MeshStandardMaterial({color:'#d2c8a6',roughness:.76}),rubber=new T.MeshStandardMaterial({color:'#252b29',roughness:.93});
 const labelCanvas=document.createElement('canvas');labelCanvas.width=1024;labelCanvas.height=512;const g=labelCanvas.getContext('2d');g.fillStyle='#e7debd';g.fillRect(0,0,1024,512);g.fillStyle='#173934';g.fillRect(20,20,984,100);g.fillStyle='#f8e7b7';g.font='bold 64px Arial';g.textAlign='center';g.fillText('TWO ACES GARAGE',512,94);g.fillStyle='#1d2927';g.font='bold 112px Arial';g.fillText('5W–40',512,270);g.font='46px Arial';g.fillText('SYNTHETIC MOTOR OIL',512,347);g.font='32px Arial';g.fillText('SERVICE SERIES  /  1 L',512,412);for(let i=0;i<60;i++)g.fillRect(240+i*9,440,i%3+2,42);const map=new T.CanvasTexture(labelCanvas);map.colorSpace=T.SRGBColorSpace;map.anisotropy=4;textures.push(map);const label=new T.MeshStandardMaterial({map,roughness:.8});
 // Moulded bottles: angled shoulders, ribbed screw caps and printed service labels.
 const profile=[[.115,0],[.13,.025],[.13,.29],[.115,.34],[.055,.39],[.055,.43]].map(([r,y])=>new T.Vector2(r,y));
 for(let i=0;i<6;i++){const x=8+i*.46,z=2.13;add(new T.LatheGeometry(profile,24),i%2?red:paint,x,1.79,z);add(new T.CylinderGeometry(.064,.064,.07,24),black,x,2.25,z);for(let k=0;k<12;k++){const a=k*Math.PI/6;panel(.009,.055,.008,steel,x+Math.sin(a)*.065,2.25,z+Math.cos(a)*.065,a);}add(new T.PlaneGeometry(.18,.22),label,x,1.99,z+.132);}
 // A metal socket rail with actual hollow sockets and ratchet extensions.
 panel(1.35,.045,.22,paint,15.6,3.77,2.04);
 for(let i=0;i<8;i++){const x=15.04+i*.16,r=.035+i*.003;const path=new T.Shape();path.absarc(0,0,r,0,Math.PI*2,false);const hole=new T.Path();hole.absarc(0,0,r*.66,0,Math.PI*2,true);path.holes.push(hole);const geo=new T.ExtrudeGeometry(path,{depth:.13+i*.008,bevelEnabled:false,curveSegments:12});geo.rotateX(-Math.PI/2);add(geo,steel,x,3.8,2.04);}
 // Screwdrivers have translucent-looking coloured handles, collars and steel blades.
 for(let i=0;i<5;i++){const x=14.65+i*.4;panel(.055,.48,.045,steel,x,2.95,2.12);add(new T.CylinderGeometry(.07,.055,.27,12),i%2?red:plastic,x,3.31,2.12);add(new T.CylinderGeometry(.075,.075,.035,16),steel,x,3.16,2.12);panel(.073,.035,.018,steel,x,2.7,2.12);}
 // Reels, folded shop towels and labelled parts boxes give shelves different silhouettes.
 for(let i=0;i<2;i++){const x=18.2+i*.85;for(let k=0;k<4;k++)add(new T.TorusGeometry(.19+k*.025,.026,7,32),rubber,x,3.98,2.02);panel(.035,.12,.12,brass,x+.24,3.88,2.03);}
 for(let i=0;i<3;i++){panel(.68,.055,.44,plastic,17,1.84+i*.065,2.1);panel(.62,.012,.025,paint,17,1.855+i*.065,2.33);}
 const boxMat=new T.MeshStandardMaterial({color:'#a88e63',roughness:.96});for(let i=0;i<3;i++){const x=8.4+i*.9;panel(.71,.42,.48,boxMat,x,3.97,2);panel(.73,.055,.5,plastic,x,4.18,2);panel(.29,.15,.012,plastic,x,3.97,2.25);for(let j=0;j<5;j++)panel(.018,.08,.014,black,x-.09+j*.04,3.97,2.26);}
 // Three-spoke wheel: rim, padded centre, machined spokes and hub bolts.
 add(new T.TorusGeometry(.44,.052,10,48),rubber,12.2,4.2,2.18);for(let i=0;i<3;i++){const a=i*Math.PI*2/3;const o=panel(.1,.35,.055,steel,12.2+Math.sin(a)*.22,4.2+Math.cos(a)*.22,2.18);o.rotation.z=-a;}const hub=add(new T.CylinderGeometry(.14,.14,.085,32),black,12.2,4.2,2.21);hub.rotation.x=Math.PI/2;for(let i=0;i<6;i++){const a=i*Math.PI/3;const bolt=add(new T.CylinderGeometry(.015,.015,.015,6),steel,12.2+Math.sin(a)*.1,4.2+Math.cos(a)*.1,2.26);bolt.rotation.x=Math.PI/2;}
}
