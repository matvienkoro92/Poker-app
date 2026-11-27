import {quayRoad} from './quay-road.mjs';
import * as T from '../../vendor/three/three.module.min.js';

// From the villa gate to the waterfront bend and north along the first avenue.
import {waterfrontBasin,waterfrontWaterEdges} from './world.mjs';

const promenade=z=>Math.max(21.5,waterfrontWaterEdges(z).east+1.2);
const roadEdge=z=>34.35-.55*Math.pow(Math.sin((z-105)*.095),2);
export function waterfrontWalkHeight(x,z){
 return z>=106&&z<=167&&x>=promenade(z)&&x<=roadEdge(z) ? .21 : 0;
}

export function waterfrontSurfaceHeight(x,z){
 if(z<106||z>167||x<promenade(z))return 0;
 const offset=x-roadEdge(z);
 if(offset<-.055)return .21;
 if(offset<=.16)return .222;
 if(offset<.27)return .222-(offset-.16)*(.09/.11);
 return z<=160&&x<=45.46?.132:0;
}

export function buildVillaWaterfront({scene,box,cylinder,batch,label,roadSign,outdoors,mergeParts,registerSurface}){
 const stone='#cfc0a3',iron='#29464a',wood='#88674b',sand='#ab9c78';
 const metal=new T.MeshStandardMaterial({color:iron,roughness:.58,metalness:.32});
 const timber=new T.MeshStandardMaterial({color:wood,roughness:.85});
 const pavingCanvas=document.createElement('canvas');
 pavingCanvas.width=pavingCanvas.height=128;
 const paving=pavingCanvas.getContext('2d');
 paving.fillStyle=stone;
 paving.fillRect(0,0,128,128);
 for(let i=0;i<2200;i++){
  paving.fillStyle=i%3?'#a1846680':'#f8ebc780';
  paving.fillRect((i*47)%127,(i*89+Math.floor(i/127)*31)%128,1+(i%2),1);
 }
 const pavingMap=new T.CanvasTexture(pavingCanvas);
 pavingMap.colorSpace=T.SRGBColorSpace;
 pavingMap.wrapS=pavingMap.wrapT=T.RepeatWrapping;
 pavingMap.repeat.set(.48,.48);
 const limestone=new T.MeshStandardMaterial({map:pavingMap,roughness:.93});
 limestone.addEventListener('dispose',()=>pavingMap.dispose());
 const gravel=new T.MeshStandardMaterial({color:'#b7a68b',roughness:1});
 const curbTop=new T.MeshStandardMaterial({color:'#d9c6a5',roughness:.91});
 const curbFace=new T.MeshStandardMaterial({color:'#958674',roughness:.94});
 const joint=new T.MeshStandardMaterial({color:'#a08f77',roughness:1});
 const edging=new T.MeshStandardMaterial({color:'#a48d6e',roughness:.98});
 const gutter=new T.MeshStandardMaterial({color:'#41474a',roughness:.98});
 const repair=new T.MeshStandardMaterial({color:'#454b4e',roughness:.97});
 function texturedAsphalt(){
  const canvas=document.createElement('canvas');
  canvas.width=canvas.height=256;
  const context=canvas.getContext('2d');
  context.fillStyle='#565b5b';context.fillRect(0,0,256,256);
  let seed=239;
  function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
  const grains=['#a5a19a35','#c0b7a030','#25292a4d','#363e403e','#787f8138'];
  for(let i=0;i<19000;i++){
   context.fillStyle=grains[i%grains.length];
   context.fillRect(random()*256,random()*256,.65+random()*1.4,.6+random()*1.1);
  }
  const map=new T.CanvasTexture(canvas);
  map.colorSpace=T.SRGBColorSpace;
  map.wrapS=map.wrapT=T.RepeatWrapping;
  map.repeat.set(.36,.36);
  map.anisotropy=4;
  const material=new T.MeshStandardMaterial({map,bumpMap:map,bumpScale:.012,roughness:.94});
  material.addEventListener('dispose',()=>map.dispose());
  return material;
 }
 const asphalt=texturedAsphalt();
 asphalt.roughness=.78;
 const lightCanvas=document.createElement('canvas');
 lightCanvas.width=lightCanvas.height=96;
 const lightContext=lightCanvas.getContext('2d');
 const halo=lightContext.createRadialGradient(48,48,0,48,48,47);
 halo.addColorStop(0,'#fff9ecb0');halo.addColorStop(.37,'#fff9ec55');halo.addColorStop(1,'#fff9ec00');
 lightContext.fillStyle=halo;lightContext.fillRect(0,0,96,96);
 const lightMap=new T.CanvasTexture(lightCanvas);
 lightMap.colorSpace=T.SRGBColorSpace;
 const lightMaterial=new T.MeshBasicMaterial({map:lightMap,transparent:true,depthWrite:false,blending:T.AdditiveBlending,toneMapped:false,opacity:.46});
 lightMaterial.addEventListener('dispose',()=>lightMap.dispose());
 const lights=[];
 function pool(x,y,z,width,length,color){lights.push({x,y,z,width,length,color});}
 function tube(points,radius,material){
  const path=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));
  const mesh=new T.Mesh(new T.TubeGeometry(path,Math.max(10,points.length*3),radius,8,false),material);
  mesh.castShadow=true;
  scene.add(mesh);
 }
 function lamp(x,z){
  cylinder(iron,x,.14,z,.18,.28);
  tube([[x,.12,z],[x,1.7,z],[x+.1,2.85,z],[x+.48,3.15,z],[x+.94,3.03,z]],.068,metal);
  batch('ball','#ffd49a',x+.94,2.96,z,.26,.16,.23,0,0,true);
  batch('ball',iron,x+.94,3.05,z,.34,.12,.29);
  const alongWater=z>100;
  pool(x+1.45,alongWater?.219:.104,z,alongWater?5:4.5,6.8,'#ffd293');
  pool(alongWater?36.4:78.1,alongWater?.155:.065,z+.4,alongWater?2.9:2.1,8.1,'#e7aa72');
 }
 function bench(x,z,base){
  const frame=new T.Group();
  frame.name='Waterfront park bench';
  frame.position.set(x,base,z);
  function part(material,x,y,z,w,h,d,tilt=0){
   const mesh=new T.Mesh(new T.BoxGeometry(w,h,d),material);
   mesh.position.set(x,y,z);
   mesh.rotation.z=tilt;
   mesh.castShadow=mesh.receiveShadow=true;
   frame.add(mesh);
  }
  for(const end of [-.68,.68]){
   // Each end frame carries the seat, back and armrest down to the paving.
   part(metal,.19,.215,end,.065,.43,.06,-.12);
   part(metal,-.225,.225,end,.065,.45,.06,.13);
   part(metal,-.02,.41,end,.55,.065,.07);
   part(metal,-.286,.657,end,.064,.56,.065,.15);
   part(metal,.174,.525,end,.052,.21,.051);
   part(metal,-.044,.625,end,.49,.048,.055);
  }
  part(metal,-.09,.377,0,.055,.06,1.42);
  for(const dx of [-.205,-.104,-.003,.098,.199])part(timber,dx,.458,0,.084,.033,1.82);
  for(const y of [.538,.643,.748,.853])part(timber,-.23-(y-.43)*.15,y,0,.038,.087,1.82,.15);
  mergeParts(frame);
  scene.add(frame);
 }
 function surface(points,y,material,parent=scene){
  const shape=new T.Shape(points.map(([x,z])=>new T.Vector2(x,-z)));
  const geometry=new T.ShapeGeometry(shape);
  geometry.rotateX(-Math.PI/2);
  const mesh=new T.Mesh(geometry,material);
  mesh.position.y=y;
  mesh.receiveShadow=true;
  parent.add(mesh);
  return mesh;
 }
 function strip(start,end,west,east,y,material){
  const samples=Array.from({length:Math.ceil((end-start)*2)+1},(_,i)=>start+(end-start)*i/Math.ceil((end-start)*2));
  return surface([...samples.map(z=>[west(z),z]),...samples.reverse().map(z=>[east(z),z])],y,material);
 }
 const {minZ,maxZ}=waterfrontBasin;
 const waterCanvas=document.createElement('canvas');
 waterCanvas.width=waterCanvas.height=256;
 const waterContext=waterCanvas.getContext('2d');
 const waterColor=waterContext.createLinearGradient(0,0,256,256);
 for(const [stop,color] of [[0,'#387581'],[.42,'#49888a'],[.64,'#609c9b'],[1,'#387581']])waterColor.addColorStop(stop,color);
 waterContext.fillStyle=waterColor;
 waterContext.fillRect(0,0,256,256);
 for(let i=0;i<190;i++){
  const x=i*137%256,y=i*97%256,length=7+i*17%42;
  waterContext.strokeStyle=i%3?'#c7e1d324':'#183f592e';
  waterContext.beginPath();
  waterContext.moveTo(x,y);
  waterContext.quadraticCurveTo(x+length*.5,y+(i%5-2)*2,x+length,y+1);
  waterContext.stroke();
 }
 const waterMap=new T.CanvasTexture(waterCanvas);
 waterMap.colorSpace=T.SRGBColorSpace;
 waterMap.wrapS=waterMap.wrapT=T.RepeatWrapping;
 waterMap.repeat.set(4,2);
 const waterMaterial=new T.MeshStandardMaterial({map:waterMap,roughness:.4,metalness:.28});
 waterMaterial.addEventListener('dispose',()=>waterMap.dispose());
 const water=strip(minZ,maxZ,z=>waterfrontWaterEdges(z).west,z=>waterfrontWaterEdges(z).east,.012,waterMaterial);
 water.name='Villa tidal basin';
 const attributes=water.geometry.attributes;
 for(let i=0;i<attributes.position.count;i++){
  attributes.uv.setXY(i,attributes.position.getX(i)/105,attributes.position.getZ(i)/68);
 }
 function curbProfile(start,end){
  const rows=Array.from({length:Math.ceil((end-start)*3)+1},(_,i)=>start+(end-start)*i/Math.ceil((end-start)*3));
  const profile=[[-.055,.211],[-.035,.222],[.16,.222],[.25,.177],[.27,.13]];
  const verts=[],indices=[];
  const geometry=new T.BufferGeometry();
  for(const z of rows)for(const [offset,height] of profile)verts.push(roadEdge(z)+offset,height,z);
  for(let face=0;face<profile.length-1;face++){
   const indexStart=indices.length;
   for(let i=0;i<rows.length-1;i++){
    const a=i*profile.length+face,b=a+profile.length;
    indices.push(a,b,a+1,a+1,b,b+1);
   }
   geometry.addGroup(indexStart,indices.length-indexStart,face===3?1:0);
  }
  geometry.setAttribute('position',new T.Float32BufferAttribute(verts,3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const mesh=new T.Mesh(geometry,[curbTop,curbFace]);mesh.receiveShadow=true;scene.add(mesh);
 }
 strip(106,167,promenade,roadEdge,.21,limestone);
 strip(106,167,z=>promenade(z)+.48,z=>promenade(z)+.89,.213,gravel);
 strip(106,167,z=>roadEdge(z)-.38,z=>roadEdge(z)-.12,.213,edging);
 strip(106,160,z=>roadEdge(z)+.22,()=>45.46,.132,asphalt);
 strip(106,160,z=>roadEdge(z)+.23,z=>roadEdge(z)+.43,.135,gutter);
 curbProfile(106,167);
 const surfaceDetails=new T.Group();
 for(let z=107.2;z<166.5;z+=1.25){
  const x=roadEdge(z);
  surface([[x-.025,z],[x+.155,z],[x+.155,z+.022],[x-.025,z+.022]],.223,joint,surfaceDetails);
 }
 for(let z=110;z<165;z+=4.6){
  const west=promenade(z)+1.11,east=roadEdge(z)-.45;
  // Sparse, staggered slab seams avoid reading as a square grid.
  const mid=west+(east-west)*(.42+.13*Math.sin(z));
  surface([[west,z],[mid,z-.12],[mid,z-.10],[west,z+.023]],.212,joint,surfaceDetails);
  surface([[mid,z+.72],[east,z+.6],[east,z+.62],[mid,z+.742]],.212,joint,surfaceDetails);
 }
 for(const [x,z,l,w] of [[36.1,116,1.8,.34],[43.7,128,2.1,.26],[35.8,143,2.4,.3],[44.3,153,1.2,.23]]){
  surface([[x-w,z-l*.45],[x+w*.55,z-l*.5],[x+w,z+l*.27],[x+w*.25,z+l*.5],[x-w*.7,z+l*.33]],.135,repair,surfaceDetails);
 }
 mergeParts(surfaceDetails);
 for(const mesh of surfaceDetails.children)mesh.castShadow=false;
 scene.add(surfaceDetails);
 for(const z of [118.8,137.2,154.3]){
  const x=roadEdge(z)+.5;
  box('#333938',x,.138,z,.39,.012,.66);
  for(let i=-3;i<=3;i++)box('#737875',x,.147,z+i*.082,.32,.011,.029);
 }
 registerSurface(56,105,43,11,.138);
 registerSurface(72,84.75,11,29.5,.138);
 registerSurface(40,116,10.9,11,.138);
 quayRoad(scene,40,116,10.9,11,false);
 quayRoad(scene,56,105,43,11,true);
 quayRoad(scene,72,84.75,11,29.5,false);
 for(const z of [81,91,98]){
  box('#454340',66.78,.149,z,.37,.018,.74);
  for(let i=-3;i<=3;i++)box('#888278',66.78,.164,z+i*.09,.32,.018,.028);
 }
 const railing=Array.from({length:32},(_,i)=>{
  const z=106+i*1.94;
  return [promenade(z)+.12,1.04,z];
 });
 tube(railing,.05,metal);
 tube(railing.map(([x,y,z])=>[x,y-.44,z]),.029,metal);
 for(const [x,,z] of railing.filter((_,i)=>i%2===0))cylinder(iron,x,.58,z,.05,1);
 for(const z of [113,130,146,161])lamp(promenade(z)+1.25,z);
 for(const z of [124,151])bench(promenade(z)+1.65,z,.21);
 for(const z of [122,139,156]){
  const x=promenade(z)+1.05;
  outdoors.lawnEllipse(x,z,1.35,2.1,.214);
  outdoors.shrub(x,z,1.05,.185);
  outdoors.rock(x-.4,z+1.35,.42);
 }
 // Local landmark at the bend, clear of both the footpath and the carriageway.
 const x=20,z=116;
 cylinder(sand,x,.22,z,3.8,.44);
 cylinder(stone,x,.7,z,2.08,.88);
 for(const [y,r,h,color] of [[2.8,1.56,3.5,'#e9dcc2'],[5.4,1.43,1.7,'#a84e40'],[7.4,1.27,2.3,'#e9dcc2'],[8.63,1.98,.23,iron],[9.4,1.14,1.45,'#4a6768'],[10.25,1.52,.28,iron]]){
  const ring=new T.Mesh(new T.CylinderGeometry(r,r*1.035,h,28),new T.MeshStandardMaterial({color,roughness:.8}));
  ring.position.set(x,y,z);ring.castShadow=true;ring.receiveShadow=true;scene.add(ring);
 }
 for(const y of [8.99,9.82])cylinder(iron,x,y,z,1.18,.08);
 for(let i=0;i<8;i++){
  const angle=i*Math.PI/4;
  batch('box','#ffd28f',x+Math.sin(angle)*1.13,9.38,z+Math.cos(angle)*1.13,.48,.57,.055,angle,0,true);
 }
 box(iron,x,1.32,z+1.58,.64,1.65,.12);
 label('МАЯК',x,3.65,z+1.57,1.4,.42,0,iron);
 roadSign(25.7,162.5,[['НАБЕРЕЖНАЯ']],{width:1.32,center:1.18,yaw:.38,base:.21});
 roadSign(33.4,107,[['ГОРОД','right']],{width:1.42,center:1.62});
 // The retaining garden and repeated curb lamps carry the view into town.
 strip(-25,71,z=>79.9+.28*Math.cos(z*.2),z=>86.5+1.5*Math.sin(z*.105),.093,limestone);
 for(const z of [64,12,-8,-23]){
  lamp(84.8,z);
  cylinder(stone,87.2,.19,z,1.55,.38);
  cylinder('#655944',87.2,.4,z,1.38,.035);
  if(z>0)outdoors.tree(87.2,z,5.8);
  else outdoors.coastalPalm(87.2,z,6.4+(Math.abs(z)%4)*.36,.42);
  outdoors.shrub(87.2,z+1.1,.8,.45);
 }
 for(const z of [13,-19])bench(84.1,z,.093);
 for(let z=-23;z<78;z+=5)box('#adad93',79.14,.043,z,.085,.012,2.2);
 // A line of road studs leads uphill into the bend.
 for(let z=109;z<159;z+=4.8){
  const x=roadEdge(z)+.71;
  batch('box','#d9c7a8',x,.146,z,.11,.019,.17,0,0,true);
 }
 for(const z of [126,144]){
  pool(35.9,.156,z,1.8,5.2,'#a5e0e4');
 }
 const glow=new T.InstancedMesh(new T.PlaneGeometry(1,1),lightMaterial,lights.length);
 const transform=new T.Object3D();
 transform.rotation.x=-Math.PI/2;
 for(const [i,light] of lights.entries()){
  transform.position.set(light.x,light.y,light.z);
  transform.scale.set(light.width,light.length,1);
  transform.updateMatrix();
  glow.setMatrixAt(i,transform.matrix);glow.setColorAt(i,new T.Color(light.color));
 }
 glow.computeBoundingSphere();scene.add(glow);
}
