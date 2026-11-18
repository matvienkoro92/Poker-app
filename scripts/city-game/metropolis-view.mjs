import * as T from '../../vendor/three/three.module.min.js';
import {mapPoint,atlasTrees,shores,lagoon,parks,roads,lots,landmarks} from './metropolis.mjs';

// Static instances share one draw per visible 200 m cell and primitive.
export function buildMetropolis(scene){
 const bins=new Map(),box=new T.BoxGeometry(),crown=new T.IcosahedronGeometry(1,0),material=new T.MeshStandardMaterial({roughness:.86});
 // A tapered, drooping palm leaf with a raised spine. Both sides share geometry.
 const frond=new T.BufferGeometry(),vertices=[],indices=[];
 for(let i=0;i<=8;i++){
  const t=i/8,width=.015+.52*Math.sin(Math.PI*t),y=Math.sin(t*Math.PI)*.52-t*t*.5;
  vertices.push(-width,y-width*.38,t,0,y,t,width,y-width*.38,t);
  if(i){const a=3*i-3;indices.push(a,a+3,a+1,a+1,a+3,a+4,a+1,a+4,a+2,a+2,a+4,a+5);}
 }
 frond.setAttribute('position',new T.Float32BufferAttribute(vertices,3));frond.setIndex(indices);frond.computeVertexNormals();
 const foliage=new T.MeshStandardMaterial({side:T.DoubleSide,roughness:.94});
 const luminous=new T.MeshBasicMaterial({color:0xffffff});
 const facadeMap=new T.TextureLoader().load('assets/last-buy-in/optimized/miami-neighborhoods-v1.webp');
 facadeMap.colorSpace=T.SRGBColorSpace;facadeMap.anisotropy=4;
 const facade=new T.MeshStandardMaterial({map:facadeMap,emissiveMap:facadeMap,emissive:'#e9c6a6',emissiveIntensity:.22,roughness:.82});
 facade.addEventListener('dispose',()=>facadeMap.dispose());
 const faces=Array.from({length:4},(_,tile)=>{
  const g=new T.PlaneGeometry(),uv=g.attributes.uv;
  for(let i=0;i<uv.count;i++)uv.setXY(i,((tile%2)+.003+uv.getX(i)*.994)/2,((1-(tile>>1))+.003+uv.getY(i)*.994)/2);
  return g;
 });
 function add(x,y,z,w,h,d,color,angle=0,round=false,tile=-1){
  const key=[Math.floor(x/200),Math.floor(z/200),round,tile].join(',');
  if(!bins.has(key))bins.set(key,{geometry:tile===-2?frond:tile>=0?faces[tile]:round?crown:box,material:tile===-2?foliage:tile===-3?luminous:tile>=0?facade:material,parts:[]});
  bins.get(key).parts.push([x,y,z,w,h,d,color,angle]);
 }
 // Preserve the illustration's sand, planting and paved areas at their world coordinates.
 const landMaterial=new T.MeshStandardMaterial({color:0xa4aa83,roughness:1});
 const atlas=new Image();
 landMaterial.addEventListener('dispose',()=>{atlas.onload=null;landMaterial.map?.dispose();});
 atlas.onload=()=>{
  const canvas=document.createElement('canvas');canvas.width=canvas.height=640;
  const ctx=canvas.getContext('2d');ctx.drawImage(atlas,0,0,640,640);
  const pixels=ctx.getImageData(0,0,640,640);
  for(let i=0;i<pixels.data.length;i+=4){
   const r=pixels.data[i],g=pixels.data[i+1],b=pixels.data[i+2];
   const plants=Math.min(1,Math.max(0,(g-b-22)/50))*Math.min(1,Math.max(0,(g-r+17)/27));
   const sand=Math.min(1,Math.max(0,(r-b-20)/65))*(1-plants);
   const light=.79+.23*(r+g+b)/765;
   pixels.data[i]=(174-77*plants+48*sand)*light;
   pixels.data[i+1]=(171-45*plants+33*sand)*light;
   pixels.data[i+2]=(155-74*plants+5*sand)*light;
  }
  ctx.putImageData(pixels,0,0);landMaterial.map=new T.CanvasTexture(canvas);
  landMaterial.map.colorSpace=T.SRGBColorSpace;landMaterial.color.setHex(0xffffff);landMaterial.needsUpdate=true;
 };
 atlas.src='assets/last-buy-in/optimized/poker21-city-map-locations-v5.webp';
 function groundPolygon(points,color,height,terrain=false){
  const shape=new T.Shape(points.map(p=>new T.Vector2(p.x,-p.z)));
  const geometry=new T.ShapeGeometry(shape);geometry.rotateX(-Math.PI/2);
  if(terrain){
   const pos=geometry.attributes.position,uv=geometry.attributes.uv,corner=mapPoint(0,0),span=640*5.6;
   for(let i=0;i<pos.count;i++)uv.setXY(i,(pos.getX(i)-corner.x)/span,1-(pos.getZ(i)-corner.z)/span);
  }
  const mesh=new T.Mesh(geometry,terrain?landMaterial:new T.MeshStandardMaterial({color,roughness:1}));mesh.position.y=height;mesh.receiveShadow=true;scene.add(mesh);
 }
 for(const coast of shores)groundPolygon(coast,0xa4aa83,-.05,true);
 groundPolygon(lagoon,0x3c8997,.1);
 const coast=[];
 for(let v=44;v<=539;v+=5){
  const z=mapPoint(0,v).z,polygon=shores[1];let edge=-Infinity;
  for(let i=0;i<polygon.length;i++){const a=polygon[i],b=polygon[(i+1)%polygon.length];
   if((a.z>z)!==(b.z>z))edge=Math.max(edge,a.x+(b.x-a.x)*(z-a.z)/(b.z-a.z));
  }
  if(Number.isFinite(edge))coast.push({x:edge,z});
 }
 const inland=coast.map(p=>({x:p.x-55,z:p.z})).reverse();
 groundPolygon([...coast,...inland],0xe0cb9c,-.02);
 for(let i=1;i<coast.length;i++){
  const a=coast[i-1],b=coast[i],length=Math.hypot(b.x-a.x,b.z-a.z);
  for(let m=16;m<length;m+=36){
   const x=a.x+(b.x-a.x)*m/length-32,z=a.z+(b.z-a.z)*m/length;
   add(x,3.2,z,.55,6.4,.55,0x84684c);
   for(let k=0;k<8;k++){
    const angle=i*1.32+k*2.4;
    add(x,6.45,z,1.35,k%2?1.25:1.85,4.1+(k%3)*.42,k%2?0x508053:0x62945a,angle,false,-2);
   }
  }
 }
 for(const [i,p] of atlasTrees.entries()){
  const height=4+(i%5)*.7;
  add(p.x,height*.35,p.z,.42,height*.7,.42,0x795d48);
  add(p.x,height*.78,p.z,height*.49,height*.4,height*.46,i%3?0x526f41:0x647e49,i*.82,true);
 }
 for(const p of parks){
  add(p.x,.02,p.z,p.w,.12,p.d,0x829867);add(p.x,.09,p.z,3,.04,p.d,0xdcc9a1);
  for(let i=0;i<24;i++){const x=p.x+((i*37%97)/97-.5)*p.w,z=p.z+((i*53%101)/101-.5)*p.d;if(Math.abs(x-p.x)<5)continue;
   add(x,2,z,.65,4,.65,0x715e47);add(x,5,z,3.6,3.7,3.6,0x58744e,0,true);}
 }
 for(const {a,b,bridge} of roads){
  const dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz),angle=Math.atan2(dx,dz),sx=dz/len,sz=-dx/len;
  const x=(a.x+b.x)/2,z=(a.z+b.z)/2;
  add(x,bridge?-.22:0,z,18,bridge?.51:.08,len+1,bridge?0x666e70:0x555e62,angle);
  for(const side of [-1,1])add(x+sx*side*9.8,bridge?.52:.12,z+sz*side*9.8,bridge?.43:1.7,bridge?1:.23,len-18,bridge?0xb2aa99:0xcac2ad,angle);
  // Paired warm lamps frame the bridges; staggered lights lead along city avenues.
  for(let m=24,index=0;m<len-20;m+=48,index++){
   for(const side of bridge?[-1,1]:[index%2?1:-1]){
    const px=a.x+dx*m/len+sx*side*9.9,pz=a.z+dz*m/len+sz*side*9.9;
    add(px,3.5,pz,.18,7,.18,0x535d63,angle);
    add(px-sx*side*.8,7,pz-sz*side*.8,1.75,.15,.16,0x737c80,angle);
    add(px-sx*side*1.6,6.91,pz-sz*side*1.6,.65,.09,.44,bridge?0xffda9e:0xffe4c2,angle,false,-3);
   }
  }
  for(let m=12;m<len-8;m+=14){const px=a.x+dx*m/len,pz=a.z+dz*m/len;add(px,.075,pz,.18,.025,4.8,0xead3a4,angle);
   if(!bridge&&m%42===12){const tx=px+sx*14,tz=pz+sz*14;add(tx,2.3,tz,.45,4.6,.45,0x78634b);add(tx,5.3,tz,3.1,2.6,3.1,0x637f57,0,true);}
  }
 }
 for(const p of lots){
  const {x,z,w,d,h,color}=p;
  const yardDepth=p.kind==='warehouse'?d*.43:0;
  add(x,h/2,z+yardDepth/2,w,h,d-yardDepth,color);
  add(x,h+.4,z+yardDepth/2,w+1,.8,d-yardDepth+1,0xd7cdb8);
  if(p.kind==='block'||p.kind==='office'){
   const downtown=x<mapPoint(250,0).x&&z<mapPoint(0,250).z;
   const tile=h>=30||p.kind==='office'?3:downtown?2:h<=9?1:0;
   for(const axis of [0,1]){
    const span=axis?d:w,bays=Math.max(1,Math.round(span/(tile===3?21:14)));
    for(let i=0;i<bays;i++)for(const side of [-1,1]){
     const offset=span*((i+.5)/bays-.5);
     const px=x+(axis?side*(w/2+.05):offset),pz=z+(axis?offset:side*(d/2+.05));
     add(px,h/2,pz,span/bays,h,1,0xffffff,axis?side*Math.PI/2:side>0?0:Math.PI,false,tile);
    }
   }
   // Give the street-facing entrance depth and a distinct silhouette at driving height.
   const frontageRoad=roads.reduce((best,road)=>{
    const dx=road.b.x-road.a.x,dz=road.b.z-road.a.z;
    const t=Math.max(0,Math.min(1,((x-road.a.x)*dx+(z-road.a.z)*dz)/(dx*dx+dz*dz)));
    const ox=road.a.x+t*dx-x,oz=road.a.z+t*dz-z,distance=ox*ox+oz*oz;
    return distance<best.distance?{ox,oz,distance}:best;
   },{distance:Infinity});
   const lateral=Math.abs(frontageRoad.ox)/w>Math.abs(frontageRoad.oz)/d;
   const normal=lateral?Math.sign(frontageRoad.ox):Math.sign(frontageRoad.oz);
   const angle=lateral?normal*Math.PI/2:normal>0?0:Math.PI;
   const front=(along,out,y,width,height,depth,color,glow=false)=>{
    const edge=(lateral?w:d)/2+out;
    add(x+Math.cos(angle)*along+Math.sin(angle)*edge,y,z-Math.sin(angle)*along+Math.cos(angle)*edge,width,height,depth,color,angle,false,glow?-3:-1);
   };
   const span=Math.min((lateral?d:w)*.74,tile===3?14:10);
   const trim=[0xffa69c,0xffdbae,0x9be2d4,0xaed7eb][tile];
   front(0,.14,1.55,span,3,.22,0x344852);
   for(const side of [-1,0,1])front(side*span*.44,.29,1.55,.11,3,.12,0xaf9e87);
   front(0,.84,3.32,span+.65,.36,1.75,tile===3?0x475969:0xb39c89);
   front(0,1.73,3.32,span+.56,.075,.06,trim,true);
   if(tile===0||tile===2)front(-span*.37,.38,4.65,.4,2.4,.62,trim,true);
   if(tile===0){for(let i=-1;i<=1;i++)add(x+i*.95,h+1.1-Math.abs(i)*.35,z+d*.37,.76,2.8-Math.abs(i)*.7,1.4,0xe3b7a7);}
   if(tile===3)add(x,h+1.5,z,w*.76,3,d*.72,0x78979e);
   continue;
  }
  if(p.kind==='club'){add(x,h+2,z,w*.7,4,d*.69,0x496854);add(x,h+5,z,w*.42,3,d*.43,0xb29a61);}
  if(p.kind==='warehouse'){for(let i=-1;i<=1;i++)add(x+i*9,3,z+d/2+.12,7,6,.3,0x475457);continue;}
  if(p.kind==='stand'){
   const longX=w>d,long=longX?w:d;
   for(let t=-long/2+5;t<long/2;t+=12)for(const side of [-1,1]){
    const px=x+(longX?t:side*w/2),pz=z+(longX?side*d/2:t);
    add(px,3,pz,longX?6:.4,6,longX?.4:6,0x45545b);
    add(px,h*.66,pz,longX?9:.5,1.3,longX?.5:9,0xa65b4f);
   }
   for(let i=0;i<4;i++)add(x,h+i*.7,z,w*(1-i*.07),.65,d*(1-i*.07),i%2?0xb45b51:0xdca98e);continue;}
  for(let y=4;y<h-1;y+=5){for(const sign of [-1,1]){add(x,y,z+sign*(d/2+.05),w*.87,1.6,.12,0x51747c);add(x+sign*(w/2+.05),y,z,.12,1.6,d*.79,0x51747c);}}
  for(const side of [-1,1]){
   for(let dx=-w*.38;dx<w*.39;dx+=5)add(x+dx,h/2,z+side*(d/2+.15),.55,h,.27,color);
   for(let dz=-d*.38;dz<d*.39;dz+=5)add(x+side*(w/2+.15),h/2,z+dz,.27,h,.55,color);
   add(x,1.75,z+side*(d/2+.19),3.6,3.5,.26,0x435c60);
   add(x,3.7,z+side*(d/2+.9),5.7,.28,2,0xb37c67);
  }
  if(h>20)add(x+w*.18,h+1.5,z,6,3,5,0x848e87);
 }
 // The freight yards read from the approach road by their gantries above the sheds.
 for(const [index,shed] of lots.filter(lot=>lot.kind==='warehouse').entries()){
  const {x,z,w,d}=shed;
  // A fenced service yard occupies the rear of the original solid lot.
  for(const side of [-1,1])add(x+side*(w/2-.14),1.2,z-d*.29,.28,2.4,d*.42,0x768381);
  add(x,1.2,z-d/2+.14,w,2.4,.28,0x768381);
  if(index%2===0){
   const girder=0xc58154,rail=w*.38;
   const craneZ=z-d*.29;
   for(const side of [-1,1]){
    for(const end of [-1,1])add(x+side*rail,8,craneZ+end*7,1.1,16,1.1,girder);
    add(x+side*rail,16,craneZ,1.3,1.6,24,girder);
   }
   add(x,17,craneZ-5,w*.94,1.4,2,girder);
   add(x+w*.15,16,craneZ-5,3.3,2.3,3.1,0x545e60);
   for(const side of [-1,1])add(x+w*.15+side,13.8,craneZ-5,.09,3.4,.09,0x444c4c);
   add(x+w*.15,12.1,craneZ-5,4,.4,1.6,0xe2ad52);
  }
  for(let bay=0;bay<3;bay++){
   const px=x+(bay-1)*w*.26,pz=z-d*.34;
   const tint=[0x924e42,0x607d83,0x9f916b][(bay+index)%3];
   add(px,1.35,pz,3,2.7,10,tint);
   for(let rib=-4;rib<=4;rib++)add(px,2.73,pz+rib,3,.12,.12,tint);
  }
 }
 // Finger piers on the Gulf side of the eastern island; the airport faces the other shore.
 for(let i=0;i<5;i++){const p=mapPoint(489,449+i*4);
  add(p.x-29,.26,p.z,59,.52,2.2,0x9b8768);
  for(let k=0;k<4;k++){const x=p.x-8-k*13;const z=p.z+4,length=6.1+(i+k)%3;
   add(x,.49,z,2.9,.91,length,0xe9e4cf,0,true);
   if((i+k)%3===0){
    add(x,3.8,z,.13,6.7,.13,0xa7aba4);
    add(x,1.5,z+.7,.15,.15,3.6,0xbbab91);
    add(x,1,z,1.5,.6,2.7,0xbd9d76);
   }else{
    add(x,1.04,z-.3,1.85,.67,2.9,0x516570,0,true);
    add(x,1.41,z-.35,1.98,.16,3.1,0xe7dcca);
   }}
 }
 const beacon=mapPoint(565,575);
 for(let tier=0;tier<6;tier++)add(beacon.x,2+tier*4,beacon.z,6-tier*.5,4,6-tier*.5,tier%2?0xf1e7d0:0xb55d4d);
 add(beacon.x,25,beacon.z,4,2.2,4,0xf3cf7e);
 const runway=mapPoint(109,546);
 add(runway.x,.06,runway.z,740,.12,23,0x626767,-.14);
 for(let n=-8;n<=8;n++)add(runway.x+n*40,.14,runway.z+n*5.64,15,.02,.65,0xebe4d1,-.14);
 for(const u of [76,99,121]){const p=mapPoint(u,483);add(p.x,1.8,p.z,3.2,3.6,27,0xe8e6de,0,true);add(p.x,2,p.z,24,.5,4,0xcecec3);}
 const arena=mapPoint(78,61);
 for(let i=0;i<40;i++){
  const angle=i*Math.PI/20,sa=Math.sin(angle),ca=Math.cos(angle);
  if(i===10||i===30)continue;
  const rotation=Math.atan2(-73*ca,-109*sa);
  for(let step=0;step<6;step++){
   const x=arena.x+(88+step*3.7)*ca,z=arena.z+(52+step*3.8)*sa;
   add(x,1.7+step*2.0,z,Math.hypot(109*sa,73*ca)*.162,2.4,4.6,step%2?0xd6aa71:0x99574a,rotation);
  }
  add(arena.x+117*ca,17,arena.z+82*sa,Math.hypot(117*sa,82*ca)*.165,1.2,14,0xc7c5ad,rotation);
 }
 const pitch=mapPoint(78,61);add(pitch.x,.09,pitch.z,142,.16,97,0x5b895a);
 for(const dx of [-83,83])for(const dz of [-59,59]){add(pitch.x+dx,16,pitch.z+dz,.65,32,.65,0x889591);add(pitch.x+dx,32,pitch.z+dz,5,2,1,0xffe5ad);}
 const dummy=new T.Object3D(),tint=new T.Color();
 for(const {geometry,material:batchMaterial,parts} of bins.values()){
  const mesh=new T.InstancedMesh(geometry,batchMaterial,parts.length);
  parts.forEach(([x,y,z,w,h,d,color,angle],i)=>{dummy.position.set(x,y,z);dummy.rotation.y=angle;dummy.scale.set(w,h,d);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);mesh.setColorAt(i,tint.setHex(color));});
  mesh.computeBoundingSphere();scene.add(mesh);
 }
}
