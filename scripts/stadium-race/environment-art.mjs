import * as T from '../../vendor/three/three.module.min.js';

// Local procedural textures: shared by all instances, no additional downloads.
export function createRaceSky(){
 const canvas=document.createElement('canvas');canvas.width=2048;canvas.height=1024;const c=canvas.getContext('2d');
 const gradient=c.createLinearGradient(0,0,0,1024);
 for(const [at,color] of [[0,'#08182e'],[.27,'#162e50'],[.45,'#344965'],[.5,'#806978'],[.57,'#38485c'],[1,'#253748']])gradient.addColorStop(at,color);
 c.fillStyle=gradient;c.fillRect(0,0,2048,1024);
 // Broad, low-contrast cloud banks keep the skyline readable at phone resolution.
 for(let layer=0;layer<4;layer++)for(let n=0;n<17;n++){
  const x=(n*137+layer*91)%2048,y=260+layer*47+Math.sin(n*1.7+layer)*27;
  c.save();c.translate(x,y);c.scale(2.1,.3);const cloud=c.createRadialGradient(0,0,3,0,0,115);cloud.addColorStop(0,'rgba(157,172,196,.07)');cloud.addColorStop(1,'rgba(239,228,209,0)');c.fillStyle=cloud;c.fillRect(-115,-115,230,230);c.restore();
 }
 const sun=c.createRadialGradient(1450,445,2,1450,445,170);sun.addColorStop(0,'rgba(255,189,144,.34)');sun.addColorStop(.1,'rgba(238,169,146,.16)');sun.addColorStop(1,'rgba(255,224,175,0)');c.fillStyle=sun;c.fillRect(1280,275,340,340);
 // Layer the hills behind the waterfront so the skyline has depth around a full turn.
 for(const [base,amplitude,shade] of [[481,19,'#68677b'],[492,14,'#555c70'],[502,8,'#495569']]){
  c.beginPath();c.moveTo(0,560);
  for(let x=0;x<=2048;x+=4){const t=x*Math.PI/1024;
   c.lineTo(x,base+amplitude*(Math.sin(t*3)+.49*Math.sin(t*9+.4)+.19*Math.cos(t*23)));
  }
  c.lineTo(2048,560);c.closePath();c.fillStyle=shade;c.fill();
 }
 let seed=901;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 for(let x=0;x<2048;){
  const t=x*Math.PI/1024,cluster=Math.max(0,Math.cos(3*t-.6))**1.7;
  const w=6+Math.floor(random()*16),h=5+random()*12+cluster*random()*47,y=515-h;
  const glass=random()>.49;
  c.fillStyle=glass?'#424e63':'#534e59';c.fillRect(x,y,w,h);
  c.fillStyle=glass?'#354357':'#413f4c';c.fillRect(x+w*.65,y,w*.35,h);
  if(h>27){c.fillRect(x+w*.16,y-3,w*.65,3);c.fillRect(x+w*.45,y-5,1,3);}
  for(let row=y+3;row<513;row+=3.3)for(let col=2;col<w-1;col+=3.2){
   const v=random();c.fillStyle=v>.81?'#d7ae88':v>.53?'#8e8580':'#5c6470';c.fillRect(x+col,row,1.4,1);
  }
  x+=w+1+random()*3;
 }
 // Cable spans and port cranes occupy distinct stretches of the horizon.
 c.strokeStyle='#3b4858';c.lineWidth=1.8;c.beginPath();
 for(const x of [320,411]){
  c.moveTo(x,519);c.lineTo(x+3,474);c.lineTo(x+6,519);
  for(const dir of [-1,1])for(const reach of [10,19,28,38]){c.moveTo(x+3,477);c.lineTo(x+3+dir*reach,505);}
 }
 c.moveTo(267,505);c.lineTo(468,505);c.stroke();
 for(let i=0;i<4;i++){const x=986+i*24;c.strokeStyle='#49505b';c.lineWidth=2;c.beginPath();
  c.moveTo(x,516);c.lineTo(x+3,489-i*1.6);c.lineTo(x+25,482-i*1.6);c.lineTo(x+5,495);c.lineTo(x+9,516);c.stroke();
  c.lineWidth=.8;c.beginPath();c.moveTo(x+24,483-i*1.6);c.lineTo(x+24,495);c.stroke();
 }
 c.fillStyle='#303e48';c.fillRect(0,515,2048,55);
 for(let x=0;x<2048;x+=2+random()*3){const y=516+Math.sin(x*.02)*2;c.fillStyle=random()>.5?'#364648':'#38474b';c.beginPath();c.ellipse(x,y,4+random()*3,2+random()*3,0,0,Math.PI*2);c.fill();}
 const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;texture.mapping=T.EquirectangularReflectionMapping;return texture;
}

export function createDistrictDetailFactory(block,sharedCylinder){
 const plane=new T.PlaneGeometry(1,1);
 const contactCanvas=document.createElement('canvas');contactCanvas.width=contactCanvas.height=128;const shade=contactCanvas.getContext('2d'),gradient=shade.createRadialGradient(64,64,8,64,64,64);gradient.addColorStop(0,'rgba(9,18,23,.42)');gradient.addColorStop(.65,'rgba(9,18,23,.24)');gradient.addColorStop(1,'rgba(9,18,23,0)');shade.fillStyle=gradient;shade.fillRect(0,0,128,128);
 const contact=new T.MeshBasicMaterial({map:new T.CanvasTexture(contactCanvas),transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1});
 const loader=new T.TextureLoader();
 const atlas=loader.load('assets/last-buy-in/optimized/district-frontages-v1.webp');
 atlas.colorSpace=T.SRGBColorSpace;atlas.anisotropy=4;
 const frontageMaterial=new T.MeshStandardMaterial({map:atlas,emissiveMap:atlas,emissive:'#f6dbc0',emissiveIntensity:.34,roughness:.83});
 const frontagePanels=Array.from({length:4},(_,index)=>{
  const panel=plane.clone(),uv=panel.attributes.uv;
  for(let i=0;i<uv.count;i++)uv.setXY(i,(index%2+ .003+uv.getX(i)*.994)/2,(1-Math.floor(index/2)+.003+uv.getY(i)*.994)/2);
  return panel;
 });
 function frontage(parent,index,x,y,z,width,height,rotation){
  const mesh=detail(parent,frontagePanels[index],frontageMaterial,x,y,z,width,height,1);
  mesh.rotation.y=rotation;
 }
 const leavesMap=loader.load('assets/last-buy-in/optimized/district-elm-v1.webp');
 leavesMap.colorSpace=T.SRGBColorSpace;leavesMap.anisotropy=4;
 const leafMaterial=new T.MeshStandardMaterial({map:leavesMap,alphaTest:.45,side:T.DoubleSide,roughness:1,metalness:0});
 const trunkGeometry=sharedCylinder||new T.CylinderGeometry(.65,1,1,9);const bark=new T.MeshStandardMaterial({color:'#62594d',roughness:1});
 // A tensioned fabric bay rises at its corners and dips between the masts.
 const canopy=new T.PlaneGeometry(1,1,12,16);
 const cloth=canopy.attributes.position;
 for(let n=0;n<cloth.count;n++){
  const u=cloth.getX(n)*2,v=cloth.getY(n)*2;
  cloth.setXYZ(n,u*(3.65+.45*v*v),.42*u+.72*v*v+.65*u*u*v*v-.35*Math.cos(v*Math.PI/2),v*5.4);
 }
 canopy.computeVertexNormals();
 const canvasRoof=new T.MeshStandardMaterial({color:'#dfc9a6',side:T.DoubleSide,roughness:.9});
 const pavingCanvas=document.createElement('canvas');pavingCanvas.width=pavingCanvas.height=256;
 const paving=pavingCanvas.getContext('2d');
 paving.fillStyle='#77756e';paving.fillRect(0,0,256,256);
 for(let row=0;row<8;row++)for(let col=-1;col<4;col++){
  const tone=Math.round(148+8*Math.sin(row*13+(col+4)%4*5));
  paving.fillStyle='rgb('+tone+','+(tone-2)+','+(tone-9)+')';
  paving.fillRect(col*64+(row%2)*32+1,row*32+1,62,30);
 }
 const pavingMap=new T.CanvasTexture(pavingCanvas);
 pavingMap.colorSpace=T.SRGBColorSpace;pavingMap.wrapS=pavingMap.wrapT=T.RepeatWrapping;
 pavingMap.repeat.set(4,7);pavingMap.anisotropy=4;
 const pavingMaterial=new T.MeshStandardMaterial({map:pavingMap,roughness:.96});
 const vergeGeometry=new T.IcosahedronGeometry(1,1);
 const vergeMaterial=new T.MeshStandardMaterial({color:'#63764c',roughness:1});
 const spectatorBody=new T.CapsuleGeometry(1,1,2,6);
 const spectatorHead=new T.SphereGeometry(1,7,5);
 const jackets=['#8f5145','#426172','#d2b981','#53555d'].map(color=>new T.MeshStandardMaterial({color,roughness:.93}));
 const skin=['#ad8067','#d2a98a','#895e49'].map(color=>new T.MeshStandardMaterial({color,roughness:1}));
 const seats=new T.CylinderGeometry(1,1,1,12,1,false,0,Math.PI),seatMaterials=['#324e59','#6d5148','#9c917a'].map(color=>new T.MeshStandardMaterial({color,roughness:.85}));
 function detail(parent,geometry,material,x,y,z,w,h,d){const m=new T.Mesh(geometry,material);m.position.set(x,y,z);m.scale.set(w,h,d);m.userData.batchSceneDetail=geometry!==sharedCylinder;parent.add(m);return m;}
 return {
  frontage,
  city(parent,index,side){
   // Fill gaps between taller buildings with a human-scale commercial frontage.
   const z=11.8;block(parent,'#827e72',side*13.7,1.65,z,5,3.3,6.5);block(parent,'#bbb09a',side*13.7,3.36,z,5.3,.18,6.8);
   block(parent,'#444e4e',side*13.7,3.55,z,4.8,.2,6.3);
   const shop=[0,3,2][Math.floor(index/2)%3];
   frontage(parent,shop,side*11.18,1.65,z,6.3,3.1,-side*Math.PI/2);
   frontage(parent,shop,side*13.7,1.65,z-3.26,4.95,3.1,Math.PI);
   for(const dz of [-3.25,3.25])block(parent,'#b0a590',side*11.08,1.65,z+dz,.2,3.3,.2);
   for(let bar=0;bar<4;bar++)block(parent,index%2?'#766657':'#4c6869',side*(10.8+bar*.16),2.82,z,.14,.09,6.6);
   // Rainwater pipe, vents and a narrow address plaque break up the large blank masses.
   block(parent,'#485456',side*11.04,1.2,z-3,.065,2.4,.065);block(parent,'#303e43',side*11.04,2.1,z+2.5,.04,.35,.32);
   for(let n=0;n<4;n++)block(parent,'#6c7777',side*12.5,3.78,z-1+n*.3,1,.32,.08);
   const shadow=detail(parent,plane,contact,side*14,.035,2,13,22,1);shadow.rotation.x=-Math.PI/2;
  },
  tree(parent,index,x,z,foliage){
   const angle=index*2.4+z*.83,scale=.9+.17*Math.sin(angle);
   const trunk=detail(parent,trunkGeometry,bark,x,1.5*scale,z,.15,3*scale,.18);
   trunk.rotation.z=.07*Math.sin(angle);
   for(let n=0;n<4;n++){
    const direction=angle+n*2.4,spread=n===3?.2:.95;
    const dx=Math.cos(direction)*spread*scale,dz=Math.sin(direction)*spread*scale;
    const by=(n===3?4.6:3.3+.42*Math.sin(direction))*scale;
    const branch=new T.Vector3(dx,by-1.75*scale,dz);
    const limb=detail(parent,trunkGeometry,bark,x+dx/2,1.75*scale+branch.y/2,z+dz/2,.09,branch.length(),.09);
    limb.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),branch.normalize());
    for(let k=0;k<2;k++){
     const crown=detail(parent,plane,leafMaterial,x+dx,by,z+dz,3.35*scale,(2.55+.4*Math.cos(direction))*scale,1);
     crown.rotation.y=direction+k*Math.PI/2;
    }
   }
  },
  stadiumVerge(parent,index,side){
   const pavement=detail(parent,plane,pavingMaterial,side*15,-.045,0,14,24.2,1);
   pavement.rotation.x=-Math.PI/2;
   for(let n=0;n<6;n++){
    const wave=Math.sin(index*1.7+n*2.8);
    detail(parent,vergeGeometry,vergeMaterial,side*(9.7+.55*wave),.13,n*.97-7.8,1+.22*wave,.37+.16*wave,.91);
   }
  },
  stadCanopy(parent,side){
   const roof=detail(parent,canopy,canvasRoof,side*15,4.75,0,1,1,1);
   roof.rotation.y=side<0?Math.PI:0;
   for(const z of [-5.4,5.4])for(const edge of [-1,1]){
    const height=4.75+.42*edge+.72+.65;
    detail(parent,trunkGeometry,bark,side*(15+edge*4.1),height/2,z,.09,height,.09);
   }
  },
  stadiumSeat(parent,index,x,y,z){
   const shell=detail(parent,seats,seatMaterials[index%3],x,y,z,.27,.36,.24);shell.rotation.x=Math.PI/2;shell.userData.batchMaterialKey='stadium-seat';
   block(parent,'#3c4548',x,y-.2,z,.055,.35,.055);
   const guest=Math.abs(Math.round(index*13+z*17+y*29));
   if(guest%7<3){
    const lean=.08*Math.sin(guest);
    const body=detail(parent,spectatorBody,jackets[guest%4],x,y+.23,z,.17,.19,.21);
    body.rotation.x=lean;
    detail(parent,spectatorHead,skin[guest%3],x-.055*Math.sign(x),y+.64,z+lean,.12,.15,.12);
   }
  },
  concourse(parent,index,side){
   const pavilion=Math.floor(index/2)%2===0;
   const z=(index%3-1)*2;
   const piece=(color,x,y,dz,w,h,d)=>block(parent,color,side*x,y,z+dz,w,h,d);
   if(pavilion){
    // Open terrace with a pitched canopy, warm service windows and outdoor tables.
    piece('#71675e',16,1.5,0,5,3,8);
    frontage(parent,0,side*13.48,1.49,z,7.8,2.92,-side*Math.PI/2);
    frontage(parent,0,side*16,1.49,z-4.01,4.95,2.92,Math.PI);
    const roof=piece('#547272',14,3.35,0,9,.23,9.6);roof.rotation.z=side*.08;
    for(const dz of [-4,4])piece('#48565a',10,1.54,dz,.13,3.08,.13);
    for(const dz of [-2,2]){
     piece('#9d7854',11.7,.84,dz,1.6,.12,1.4);
     piece('#485358',11.7,.41,dz,.25,.8,.25);
     for(const delta of [-.9,.9])piece('#aa8860',11.7,.45,dz+delta,1.55,.18,.4);
    }
   }else{
    // Recessed entry gates framed by masonry piers and a stepped art-deco marquee.
    for(const dz of [-4,0,4]){
     piece('#b4a18a',15,1.85,dz,.95,3.7,.72);
     piece('#e2c499',15,3.63,dz,1.18,.24,.96);
    }
    for(const dz of [-2,2]){
     piece('#374a52',15,1.05,dz,.11,.12,3.3);
     for(let bar=-1.4;bar<=1.4;bar+=.55)piece('#586666',15,.98,dz+bar,.08,1.94,.08);
    }
    for(let n=0;n<3;n++)piece(n===1?'#d6ae73':'#566a70',15,3.83+n*.2,0,2.5-n*.36,.22,10-n*1.2);
    for(const dz of [-6,6]){
     piece('#887b69',11,.33,dz,2.3,.66,2.5);
     this.tree(parent,index+dz,side*11,z+dz);
    }
   }
  },
  stadium(parent,index,side){
   // Roof trusses and access stairs give grandstands a believable structure.
   for(const z of [-4,4])for(const direction of [-1,1]){const brace=block(parent,'#758487',side*16,3.9,z+direction*.7,.08,1.5,.09);brace.rotation.x=direction*.6;}
   for(let n=0;n<7;n++)block(parent,'#a1a297',side*(10.4+n*.65),n*.38+.14,5.1,.72,.28,1.1);
   block(parent,'#263f49',side*8.14,.7,1.5,.08,.5,5.5);
   const shadow=detail(parent,plane,contact,side*16,.02,0,15,20,1);shadow.rotation.x=-Math.PI/2;
  }
 };
}
