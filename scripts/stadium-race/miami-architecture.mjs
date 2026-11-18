import * as T from '../../vendor/three/three.module.min.js';

// Signed sides are in landmark-local space, with positive X to the driver's left.
export const miamiAddresses={bakery:[4750,-1],ocean:[5160,-1],brickell:[5850,1],courtyard:[7090,-1]};

export function buildMiamiArchitecture(E,at,block){
 const atlas=new T.TextureLoader().load('assets/last-buy-in/optimized/miami-neighborhoods-v1.webp');
 atlas.colorSpace=T.SRGBColorSpace;atlas.anisotropy=4;
 const facade=new T.MeshStandardMaterial({map:atlas,emissiveMap:atlas,emissive:'#ffe1c1',emissiveIntensity:.25,roughness:.73});
 const walls=Array.from({length:4},(_,tile)=>{
  const box=new T.BoxGeometry(),uv=box.attributes.uv;
  for(let i=0;i<uv.count;i++)uv.setXY(i,((tile%2)+.003+uv.getX(i)*.994)/2,(1-(tile>>1)+.003+uv.getY(i)*.994)/2);
  return box;
 });
 function volume(g,tile,x,y,z,w,h,d){
  const m=new T.Mesh(walls[tile],facade);m.position.set(x,y+h/2,z);m.scale.set(w,h,d);
  m.userData.batchSceneDetail=true;g.add(m);
 }
 function address(name){return at(E.cityDistance(miamiAddresses[name][0]));}

 // Shared light footprint on the entrance paving. A radial falloff softens its edge.
 const pool=new T.PlaneGeometry(1,1),lightCanvas=document.createElement('canvas');
 lightCanvas.width=lightCanvas.height=128;
 const c=lightCanvas.getContext('2d'),falloff=c.createRadialGradient(64,64,0,64,64,64);
 falloff.addColorStop(0,'rgba(255,255,255,.52)');falloff.addColorStop(.5,'rgba(255,255,255,.22)');falloff.addColorStop(1,'rgba(255,255,255,0)');
 c.fillStyle=falloff;c.fillRect(0,0,128,128);
 const lightMap=new T.CanvasTexture(lightCanvas);
 function entranceLight(g,x,z,w,d,color){
  const glow=new T.Mesh(pool,new T.MeshBasicMaterial({map:lightMap,color,transparent:true,depthWrite:false,blending:T.AdditiveBlending}));
  glow.rotation.x=-Math.PI/2;glow.position.set(x,.052,z);glow.scale.set(w,d,1);g.add(glow);
 }
 function marquee(g,text,x,y,z,width,height,ink,background){
  const canvas=document.createElement('canvas');canvas.width=768;canvas.height=156;
  const ctx=canvas.getContext('2d');ctx.fillStyle=background;ctx.fillRect(0,0,768,156);
  ctx.strokeStyle=ink;ctx.lineWidth=4;ctx.strokeRect(8,8,752,140);
  ctx.font='bold 79px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillStyle=ink;ctx.shadowColor=ink;ctx.shadowBlur=7;ctx.fillText(text,384,78,714);
  const map=new T.CanvasTexture(canvas);map.colorSpace=T.SRGBColorSpace;map.anisotropy=4;
  const face=new T.Mesh(new T.PlaneGeometry(width,height),new T.MeshBasicMaterial({map,toneMapped:false}));
  face.rotation.y=Math.PI;face.position.set(x,y,z);g.add(face);
 }
 const bakery=address('bakery');
 volume(bakery,1,-19,0,0,8,4.2,11);
 block(bakery,'#ddb272',-19,4.28,0,8.35,.2,11.35);
 for(let i=0;i<11;i++){
  const awning=block(bakery,i%2?'#58867c':'#ede0b9',-14.26,2.95,i*.89-4.45,1.65,.12,.9);
  awning.rotation.z=-.14;
 }
 block(bakery,'#a87b58',-14.65,1.08,0,.79,.14,5.6);
 for(const z of [-1.8,0,1.8]){
  block(bakery,'#537474',-13.75,.38,z,.12,.76,.12);
  block(bakery,'#976b52',-13.75,.8,z,.48,.1,.48);
 }

 block(bakery,'#30584f',-17,3.64,-5.65,4.2,.92,.28);
 marquee(bakery,'CAFÉ CUBANO',-17,3.64,-5.81,4.1,.83,'#ffe2a1','#2a514a');
 block(bakery,'#bbab90',-14.27,-.04,0,2.5,.14,11.3);
 entranceLight(bakery,-14.15,0,2.25,8,'#ffc181');

 const ocean=address('ocean');
 volume(ocean,0,-21,0,0,9,9.1,15);
 volume(ocean,0,-21.8,9.1,.4,6.8,2.2,9);
 for(const y of [3.1,6.1,9.13]){
  block(ocean,'#ead3b3',-16.34,y,0,.72,.19,15.4);
  block(ocean,'#dbbba7',-20.8,y,-7.5,9.35,.19,.62);
 }
 for(let i=-1;i<=1;i++){
  const h=11.7-Math.abs(i)*1.2;
  block(ocean,'#d89d94',-16.35,h/2,i*.56,.68,h,.45);
  block(ocean,'#b6dbce',-15.99,h/2,i*.56,.045,h-.35,.085);
 }

 // A stepped porte-cochère projects from the hotel and faces approaching traffic.
 block(ocean,'#b7aa97',-15.2,-.04,0,3.4,.14,10);
 for(const z of [-4.2,4.2])block(ocean,'#9e8480',-13.9,1.83,z,.23,3.66,.23);
 for(const [i,color] of ['#685968','#d9a6a0','#8ccbc0'].entries())
  block(ocean,color,-15.25,3.62+i*.17,0,3.85-i*.13,.17,9.6-i*.2);
 marquee(ocean,'PALM HOTEL',-15.25,3.77,-4.83,3.85,.75,'#f4c1b2','#403d51');
 entranceLight(ocean,-15.1,0,3.2,9.4,'#efa9a1');

 const tower=address('brickell');
 volume(tower,3,24,0,0,13,5.1,17);
 for(let section=0;section<3;section++){
  const x=24+section*.75,z=section*.82,w=10.7-section*1.4,d=13-section*1.7,y=5.1+section*6;
  volume(tower,3,x,y,z,w,6,d);
  for(const rise of [2,4,6])block(tower,'#bcc9c0',x,y+rise,z,w+.44,.14,d+.56);
 }
 block(tower,'#708b92',25.6,24.1,1.8,4.8,1.9,5.6);

 // The office lobby has a deep glass canopy, stone piers and a broad landing.
 block(tower,'#91928b',16.3,-.05,0,3.1,.16,9.6);
 for(const z of [-3.6,3.6])block(tower,'#718989',14.95,2.12,z,.22,4.24,.22);
 block(tower,'#71979b',16.3,4.24,0,3.2,.22,9.1);
 block(tower,'#bbdfdf',14.69,4.21,0,.065,.12,9.18);
 for(const z of [-2.9,0,2.9])block(tower,'#536b76',17.4,1.68,z,.2,3.36,2.45);
 entranceLight(tower,16.18,0,2.8,9.2,'#9ddde1');

 const court=address('courtyard');
 volume(court,2,-24,0,0,8,6.3,14);
 const arcade=new T.Shape();arcade.moveTo(-7,0);arcade.lineTo(7,0);arcade.lineTo(7,4.45);arcade.lineTo(-7,4.45);arcade.closePath();
 for(const z of [-4.4,0,4.4]){
  const hole=new T.Path();hole.moveTo(z-1.7,.025);hole.lineTo(z-1.7,1.65);
  hole.absarc(z,1.65,1.7,Math.PI,0,true);hole.lineTo(z+1.7,.025);hole.closePath();arcade.holes.push(hole);
 }
 const loggia=new T.Mesh(new T.ExtrudeGeometry(arcade,{depth:.44,bevelEnabled:false,curveSegments:12}),new T.MeshStandardMaterial({color:'#c9af89',roughness:.94}));
 loggia.position.x=-17.7;loggia.rotation.y=Math.PI/2;loggia.userData.batchSceneDetail=true;court.add(loggia);
 const roof=block(court,'#ac6c52',-18.9,4.74,0,3.2,.22,14.7);roof.rotation.z=-.19;
 block(court,'#ae947c',-18.87,-.05,0,3.4,.16,14.3);
 for(const z of [-4.4,0,4.4]){
  block(court,'#574d42',-18.7,3.66,z,.07,.71,.07);
  block(court,'#f3ca87',-18.7,3.18,z,.27,.38,.27);
  entranceLight(court,-18.8,z,3,3.8,'#f8c98a');
 }
}
