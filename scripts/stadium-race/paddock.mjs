// Fixed sites give the service road an entrance, working yards and a pit exit.
import * as T from '../../vendor/three/three.module.min.js';

export function createPaddock(scene,start,sample,block,frontage){
 const sites=[];
 function site(offset){
  const p=sample(start+offset),g=new T.Group();
  g.position.set(p.x,p.y,p.z);g.rotation.y=p.a;scene.add(g);
  sites.push({g,d:start+offset});return g;
 }
 const metal='#536269',concrete='#958e7e';
 function fence(g,x,z,length){
  for(let i=0;i<=length;i+=2)block(g,metal,x,.82,z+i,.075,1.64,.075);
  for(const y of [.48,1.35])block(g,'#89918e',x,y,z+length/2,.07,.07,length);
 }
 function shed(g,x,z,width,height,length,color){
  block(g,color,x,height/2,z,width,height,length);
  const pitch=.21;
  for(const side of [-1,1]){
   const roof=block(g,'#4a5960',x+side*width/4,height+width*pitch/4,z,width*.53,.17,length+.6);
   roof.rotation.z=-side*pitch;
  }
  for(const end of [-1,1])for(let i=-1;i<=1;i++){
   block(g,'#54636a',x+i*width*.29,height*.66,z+end*(length/2+.03),width*.23,height*.24,.06);
  }
 }
 function mast(g,x,z){
  block(g,metal,x,5,z,.15,10,.15);
  block(g,metal,x,9.85,z,2.7,.12,.12);
  for(const dx of [-.95,0,.95])block(g,'#e6d7b0',x+dx,9.74,z,.61,.32,.28);
 }
 // Curved fronds are shared meshes. The leaflets cast a broken silhouette
 // against the sky when seen end-on from the chase camera.
 const frond=new T.BufferGeometry(),vertices=[];
 function leaflet(a,b,c){vertices.push(...a,...b,...c);}
 for(let i=0;i<13;i++){
  const t=(i+.5)/13,x=t*3.6,y=1.25*Math.sin(t*Math.PI)-.8*t;
  const span=.16+.56*Math.sin(Math.PI*t);
  for(const side of [-1,1]){
   leaflet([x-.18,y,0],[x+.16,y+.02,0],[x+.46,y-.33,side*span]);
  }
 }
 frond.setAttribute('position',new T.Float32BufferAttribute(vertices,3));frond.computeVertexNormals();
 const palmGreen=new T.MeshStandardMaterial({color:'#536a46',side:T.DoubleSide,roughness:.92});
 const trunk=new T.CylinderGeometry(.15,.28,1,9);
 const bark=new T.MeshStandardMaterial({color:'#887663',roughness:1});
 function palm(g,x,z,h,angle){
  const stem=new T.Mesh(trunk,bark);stem.scale.y=h;stem.position.set(x,h/2,z);stem.rotation.z=.07;
  stem.userData.batchSceneDetail=true;g.add(stem);
  for(let i=0;i<11;i++){
   const leaf=new T.Mesh(frond,palmGreen);leaf.rotation.order='YXZ';
   leaf.rotation.y=angle+i*2.4;leaf.rotation.z=.22*Math.sin(i*3+angle);
   leaf.position.set(x-h*.035,h-.12,z);leaf.userData.batchSceneDetail=true;g.add(leaf);
  }
 }
 function loadingDock(g,x,z){
  block(g,concrete,x,.55,z,4.5,1.1,8.5);
  for(const dz of [-2.8,0,2.8])block(g,'#353c40',x+2.27,.68,z+dz,.18,.56,.46);
  for(let i=0;i<4;i++)block(g,concrete,x,.14*(i+1),z-6+i*.48,1.6,.28*(i+1),.53);
  for(const dz of [-1.8,1])for(let layer=0;layer<(dz<0?2:1);layer++){
   block(g,'#a47f5d',x,1.68+layer*1.13,z+dz,1.65,1.12,1.88);
   for(const band of [-.55,.55])block(g,'#615b51',x+.84,1.68+layer*1.13,z+dz+band,.04,1.13,.08);
  }
 }
 const gate=site(280);
 fence(gate,12,-11,8);fence(gate,12,4,10);
 block(gate,'#607570',14,1.45,0,3,2.9,3.4);
 block(gate,'#9fada4',14,3.02,0,3.55,.18,4);
 block(gate,'#334d5b',12.48,1.9,0,.07,.98,2.9);
 for(const z of [-3,3])block(gate,'#b59862',11,.75,z,.28,1.5,.28);
 shed(gate,26,5,8,4.3,14,'#837b6e');

 const shop=site(1080);
 shed(shop,19,0,9,4.5,15,'#70685b');
 frontage(shop,1,14.47,2.15,0,14.85,4.25,-Math.PI/2);
 frontage(shop,1,19,2.15,-7.53,8.88,4.25,Math.PI);
 shed(shop,32,-5,10,6.2,20,'#78786e');mast(shop,25,-9);
 const tyre=new T.TorusGeometry(.43,.14,8,20);
 const rubber=new T.MeshStandardMaterial({color:'#393a39',roughness:.95});
 for(let i=0;i<9;i++){
  const m=new T.Mesh(tyre,rubber);m.userData.batchSceneDetail=true;
  m.rotation.x=Math.PI/2;m.position.set(12.6+Math.floor(i/3)*1.2,.17+(i%3)*.27,5.3);shop.add(m);
 }

 const depot=site(2090);
 shed(depot,-21,1,12,5.3,20,'#847968');
 for(const z of [-5,2,8]){
  block(depot,'#475257',-14.96,1.9,z,.09,3.8,4.2);
  for(let n=0;n<8;n++)block(depot,'#697074',-14.89,.35+n*.43,z,.06,.055,4);
 }
 mast(depot,-14,-10);fence(depot,-12,9,8);
 const van=new T.Group();van.position.set(-17,0,-12);van.rotation.y=.96;depot.add(van);
 block(van,'#c1b9a2',0,1.33,.45,2,1.9,3.7);
 block(van,'#a49e8c',0,.93,-1.75,1.95,.94,1.45);
 const cab=block(van,'#4f6268',0,1.64,-1.55,1.88,.72,.9);cab.rotation.x=-.22;
 for(const x of [-.99,.99])for(const z of [-1.47,1.52]){
  const wheel=new T.Mesh(tyre,rubber);wheel.rotation.y=Math.PI/2;
  wheel.position.set(x,.49,z);wheel.userData.batchSceneDetail=true;van.add(wheel);
 }

 const inspection=site(3190);
 for(const x of [13,20])for(const z of [-6,6])block(inspection,metal,x,2.35,z,.17,4.7,.17);
 const roof=block(inspection,'#818d89',16.5,4.7,0,8,.19,13);roof.rotation.z=.055;
 for(const z of [-3,3]){
  block(inspection,'#b6a05d',16,.19,z,3.3,.38,1.3);
  block(inspection,'#b75744',19,.66,z,.78,1.32,1.1);
 }
 shed(inspection,31,3,11,5.4,19,'#746c62');
 const yard=site(4030);
 shed(yard,-25,1,10,4.7,20,'#706e67');fence(yard,-13,-12,18);mast(yard,-20,-6);
 // A dock and overhead service pipes connect the rear buildings into one yard.
 loadingDock(depot,-26,-15);
 shed(depot,-34,-16,10,7.2,18,'#686f70');
 for(const z of [-11,-6]){
  for(const x of [-32,-24])block(depot,metal,x,2.25,z,.16,4.5,.16);
  block(depot,'#89938e',-28,4.58,z,9.2,.26,.27);
 }
 for(const [g,x,z,h,a] of [[gate,-13,-7,6.3,.6],[gate,-18,3,8,1.8],[shop,-17,7,7.6,.2],[inspection,-19,4,6.8,2.3],[yard,16,7,8.4,1.4]])palm(g,x,z,h,a);
 const cantina=site(2630);
 shed(cantina,19,0,8,3.65,9,'#a58c7c');
 frontage(cantina,0,14.98,1.78,0,8.9,3.48,-Math.PI/2);
 frontage(cantina,0,19,1.78,-4.52,7.88,3.48,Math.PI);
 for(const z of [-2.6,2.6]){
  block(cantina,'#7c6557',12.7,.82,z,1.5,.12,1);
  block(cantina,metal,12.7,.4,z,.22,.8,.22);
  for(const dz of [-.79,.79])block(cantina,'#947867',12.7,.43,z+dz,1.46,.19,.36);
 }
 palm(cantina,13,-6,6.9,.3);
 const exit=site(4910);
 fence(exit,-11,4,12);mast(exit,-24,9);
 // The last bend stays open on the inside so the next district is visible.
 return {update(distance){for(const {g,d} of sites)g.visible=d>distance-550&&d<distance+2800;}};
}
