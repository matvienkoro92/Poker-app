import * as T from '../../vendor/three/three.module.min.js';

// Local procedural textures: shared by all instances, no additional downloads.
export function createRaceSky(){
 const canvas=document.createElement('canvas');canvas.width=2048;canvas.height=1024;const c=canvas.getContext('2d');
 const gradient=c.createLinearGradient(0,0,0,1024);
 for(const [at,color] of [[0,'#172b43'],[.27,'#3c5974'],[.45,'#738391'],[.5,'#b09882'],[.57,'#596c77'],[1,'#485c68']])gradient.addColorStop(at,color);
 c.fillStyle=gradient;c.fillRect(0,0,2048,1024);
 // Broad, low-contrast cloud banks keep the skyline readable at phone resolution.
 for(let layer=0;layer<4;layer++)for(let n=0;n<17;n++){
  const x=(n*137+layer*91)%2048,y=260+layer*47+Math.sin(n*1.7+layer)*27;
  c.save();c.translate(x,y);c.scale(2.1,.3);const cloud=c.createRadialGradient(0,0,3,0,0,115);cloud.addColorStop(0,'rgba(239,228,209,.12)');cloud.addColorStop(1,'rgba(239,228,209,0)');c.fillStyle=cloud;c.fillRect(-115,-115,230,230);c.restore();
 }
 const sun=c.createRadialGradient(1450,445,2,1450,445,170);sun.addColorStop(0,'rgba(255,239,200,.7)');sun.addColorStop(.1,'rgba(255,224,175,.25)');sun.addColorStop(1,'rgba(255,224,175,0)');c.fillStyle=sun;c.fillRect(1280,275,340,340);
 const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;texture.mapping=T.EquirectangularReflectionMapping;return texture;
}

export function createDistrictDetailFactory(block,sharedCylinder){
 const plane=new T.PlaneGeometry(1,1);
 const contactCanvas=document.createElement('canvas');contactCanvas.width=contactCanvas.height=128;const shade=contactCanvas.getContext('2d'),gradient=shade.createRadialGradient(64,64,8,64,64,64);gradient.addColorStop(0,'rgba(9,18,23,.42)');gradient.addColorStop(.65,'rgba(9,18,23,.24)');gradient.addColorStop(1,'rgba(9,18,23,0)');shade.fillStyle=gradient;shade.fillRect(0,0,128,128);
 const contact=new T.MeshBasicMaterial({map:new T.CanvasTexture(contactCanvas),transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1});
 const labels=['TWO ACES · COFFEE','PORTSIDE · MARKET'];
 const shopMaterials=labels.map((label,index)=>{
  const canvas=document.createElement('canvas');canvas.width=512;canvas.height=256;const c=canvas.getContext('2d');
  c.fillStyle=['#344b51','#56493f','#3e504a','#424d60'][index];c.fillRect(0,0,512,256);c.fillStyle='#d8c8aa';c.fillRect(6,7,500,3);c.fillRect(6,56,500,2);c.font='bold 25px sans-serif';c.textAlign='center';c.fillText(label,256,40);
  for(let bay=0;bay<4;bay++){
   const x=12+bay*125;c.fillStyle='#b3aaa0';c.fillRect(x-3,70,116,180);
   const glass=c.createLinearGradient(x,74,x+110,247);glass.addColorStop(0,'#53636b');glass.addColorStop(.3,'#263d47');glass.addColorStop(1,'#0b1e2a');c.fillStyle=glass;c.fillRect(x,74,110,171);
   c.fillStyle='#c4a67545';c.fillRect(x+8,91,94,119);c.fillStyle='#192c31';c.fillRect(x+10,155,90,6);c.fillRect(x+10,202,90,7);
   for(let item=0;item<5;item++){c.fillStyle=['#b4a087','#958773','#c0ae82'][item%3];c.fillRect(x+14+item*17,140-(item%2)*10,10,14+(item%2)*10);}
   c.fillStyle='#aeb8b83b';c.beginPath();c.moveTo(x,74);c.lineTo(x+47,74);c.lineTo(x+106,245);c.lineTo(x+80,245);c.fill();c.fillStyle='#28393f';c.fillRect(x+52,74,4,171);c.fillStyle='#c8b99b';c.fillRect(x+60,184,3,20);
  }
  const map=new T.CanvasTexture(canvas);map.colorSpace=T.SRGBColorSpace;map.anisotropy=4;return new T.MeshStandardMaterial({map,roughness:.55,metalness:.08,emissive:'#e6c38c',emissiveMap:map,emissiveIntensity:.13});
 });
 const leavesCanvas=document.createElement('canvas');leavesCanvas.width=leavesCanvas.height=512;const leaves=leavesCanvas.getContext('2d');
 let seed=291;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 leaves.strokeStyle='#514d3b';leaves.lineWidth=4;for(let n=0;n<18;n++){const x=100+random()*310,y=80+random()*290;leaves.beginPath();leaves.moveTo(256,460);leaves.quadraticCurveTo(250,300,x,y);leaves.stroke();}
 for(let n=0;n<2300;n++){const x=random()*470+21,y=random()*410+25,dx=(x-256)/220,dy=(y-225)/205,angle=Math.atan2(dy,dx);if(Math.hypot(dx,dy)>1+.07*Math.sin(angle*7))continue;const size=4+random()*8;leaves.fillStyle=['#2e4936','#3b5840','#4a6849','#5a7753','#687e55'][n%5];leaves.beginPath();leaves.ellipse(x,y,size,size*.48,random()*Math.PI,0,Math.PI*2);leaves.fill();}
 const leavesMap=new T.CanvasTexture(leavesCanvas);leavesMap.colorSpace=T.SRGBColorSpace;leavesMap.anisotropy=4;
 const leafMaterial=new T.MeshStandardMaterial({map:leavesMap,alphaTest:.45,side:T.DoubleSide,roughness:1,metalness:0});
 const trunkGeometry=sharedCylinder||new T.CylinderGeometry(.65,1,1,9);const bark=new T.MeshStandardMaterial({color:'#62594d',roughness:1});
 const seats=new T.CylinderGeometry(1,1,1,12,1,false,0,Math.PI),seatMaterials=['#324e59','#6d5148','#9c917a'].map(color=>new T.MeshStandardMaterial({color,roughness:.85}));
 function detail(parent,geometry,material,x,y,z,w,h,d){const m=new T.Mesh(geometry,material);m.position.set(x,y,z);m.scale.set(w,h,d);m.userData.batchSceneDetail=geometry!==sharedCylinder;parent.add(m);return m;}
 return {
  city(parent,index,side){
   // Fill gaps between taller buildings with a human-scale commercial frontage.
   const z=11.8;block(parent,'#827e72',side*13.7,1.65,z,5,3.3,6.5);block(parent,'#bbb09a',side*13.7,3.36,z,5.3,.18,6.8);
   block(parent,'#444e4e',side*13.7,3.55,z,4.8,.2,6.3);
   const frontage=detail(parent,plane,shopMaterials[index%shopMaterials.length],side*11.18,1.65,z,6.3,3.1,1);frontage.rotation.y=-side*Math.PI/2;
   for(const dz of [-3.25,3.25])block(parent,'#b0a590',side*11.08,1.65,z+dz,.2,3.3,.2);
   for(let bar=0;bar<4;bar++)block(parent,index%2?'#766657':'#4c6869',side*(10.8+bar*.16),2.82,z,.14,.09,6.6);
   // Rainwater pipe, vents and a narrow address plaque break up the large blank masses.
   block(parent,'#485456',side*11.04,1.2,z-3,.065,2.4,.065);block(parent,'#303e43',side*11.04,2.1,z+2.5,.04,.35,.32);
   for(let n=0;n<4;n++)block(parent,'#6c7777',side*12.5,3.78,z-1+n*.3,1,.32,.08);
   const shadow=detail(parent,plane,contact,side*14,.035,2,13,22,1);shadow.rotation.x=-Math.PI/2;
  },
  tree(parent,index,x,z,foliage){
   detail(parent,trunkGeometry,bark,x,1.9,z,.22,3.8,.22);
   for(let n=0;n<3;n++){const crown=detail(parent,plane,leafMaterial,x,3.9,z,4.6,4.6,1);crown.rotation.y=index*.73+n*Math.PI/3;}
  },
  stadiumSeat(parent,index,x,y,z){
   const shell=detail(parent,seats,seatMaterials[index%3],x,y,z,.27,.36,.24);shell.rotation.x=Math.PI/2;shell.userData.batchMaterialKey='stadium-seat';
   block(parent,'#3c4548',x,y-.2,z,.055,.35,.055);
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
