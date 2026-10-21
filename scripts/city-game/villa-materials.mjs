import * as T from '../../vendor/three/three.module.min.js';
// Deterministic, tileable surface maps: no network assets or random changes on reload.
export function villaMaterials(textures){
 let seed=91;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 function surface(kind){const c=document.createElement('canvas');c.width=c.height=512;const g=c.getContext('2d');
 const colors={stone:'#795437',wood:'#35271f',felt:'#144333',leather:'#8d201b',rug:'#782e25',roof:'#263532',plaster:'#303235',cabinet:'#202225',deck:'#846449'};
 g.fillStyle=colors[kind];g.fillRect(0,0,512,512);
 for(let i=0;i<14000;i++){const x=random()*512,y=random()*512;g.fillStyle=random()>.5?'#ffffff0a':'#00000010';g.fillRect(x,y,kind==='wood'||kind==='deck'?40:2,1);}
 if(kind==='stone'){
  // A four-metre warm bronze-brown slab: branching mineral veins, quiet grain, brass joints.
  for(let k=0;k<28;k++){let x=random()*512,y=random()*512;g.beginPath();g.moveTo(x,y);for(let n=0;n<18;n++){x+=12+random()*14;y+=Math.sin(n*.7+k)*8+(random()-.5)*20;g.lineTo(x,y);}g.strokeStyle=k%4?'#d7ad7830':'#f0ce9750';g.lineWidth=k%4?.65:1.5;g.stroke();}
  g.strokeStyle='#141518';g.lineWidth=5;g.strokeRect(0,0,512,512);g.strokeStyle='#d4a04e';g.lineWidth=1.8;g.strokeRect(2,2,508,508);
 }
 if(kind==='wood'||kind==='deck'){for(let y=0;y<512;y+=64){g.fillStyle='#00000026';g.fillRect(0,y,512,2);for(let x=(y%128?128:0);x<512;x+=256){g.fillRect(x,y,1,64);g.fillStyle='#c5916330';g.fillRect(x+3,y+3,250,1);g.fillStyle='#00000026';}}}
 if(kind==='rug'){
 g.fillStyle='#7d2225';g.fillRect(0,0,512,512);
 for(let i=0;i<12000;i++){g.fillStyle=i%2?'#e4b48718':'#0000000d';g.fillRect(random()*512,random()*512,1,2);}
 for(const [inset,width,color]of [[12,3,'#3c2626'],[21,1,'#b07058'],[35,2,'#242322'],[45,1,'#b07058']]){g.strokeStyle=color;g.lineWidth=width;g.strokeRect(inset,inset,512-inset*2,512-inset*2);}
 g.strokeStyle='#a8946155';g.lineWidth=1;
 for(let y=65;y<460;y+=32)for(let x=65;x<460;x+=32){g.beginPath();g.moveTo(x-5,y);g.quadraticCurveTo(x,y-9,x+5,y);g.quadraticCurveTo(x,y+9,x-5,y);g.stroke();}
 g.save();g.translate(256,256);for(let i=0;i<16;i++){g.rotate(Math.PI/8);g.strokeStyle='#b6a16c';g.beginPath();g.moveTo(0,0);g.bezierCurveTo(25,-26,65,-23,88,0);g.bezierCurveTo(65,23,25,26,0,0);g.stroke();}for(const r of [28,94,104]){g.beginPath();g.arc(0,0,r,0,Math.PI*2);g.stroke();}g.fillStyle='#c2ac78';g.font='44px Georgia';g.textAlign='center';g.fillText('♠',0,16);g.restore();
 }
 if(kind==='plaster'){
  // Four large interlocking ogee motifs per tile, with discreet antique-gold nodes.
  for(let y=-64;y<600;y+=128)for(let x=-64;x<600;x+=128){g.beginPath();g.moveTo(x,y-64);g.bezierCurveTo(x+9,y-31,x+47,y-28,x+64,y);g.bezierCurveTo(x+47,y+28,x+9,y+31,x,y+64);g.bezierCurveTo(x-9,y+31,x-47,y+28,x-64,y);g.bezierCurveTo(x-47,y-28,x-9,y-31,x,y-64);g.strokeStyle='#a599784e';g.lineWidth=2.2;g.stroke();g.fillStyle='#b39157';g.beginPath();g.arc(x,y-64,2,0,Math.PI*2);g.fill();g.strokeStyle='#10131880';g.lineWidth=1;g.strokeRect(x-6,y-6,12,12);}
 }
 if(kind==='cabinet'){g.fillStyle='#ffffff06';for(let y=0;y<512;y+=4)g.fillRect(0,y,512,1);g.strokeStyle='#0b0e10';g.lineWidth=12;g.strokeRect(18,18,476,476);g.strokeStyle='#947547';g.lineWidth=2;g.strokeRect(27,27,458,458);g.strokeStyle='#4b4b45';g.lineWidth=1;g.strokeRect(32,32,448,448);}
 if(kind==='roof'){g.strokeStyle='#83908644';for(let y=0;y<512;y+=32){g.fillStyle='#00000040';g.fillRect(0,y,512,3);for(let x=y%64?32:0;x<512;x+=64)g.strokeRect(x,y,64,32);}}
 if(kind==='leather'){for(let y=0;y<512;y+=128)for(let x=0;x<512;x+=128){g.beginPath();g.moveTo(x,y);g.lineTo(x+64,y+64);g.lineTo(x+128,y);g.strokeStyle='#31171055';g.lineWidth=4;g.stroke();g.fillStyle='#d38d5866';g.beginPath();g.arc(x+64,y+64,5,0,Math.PI*2);g.fill();}}
 const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;map.wrapS=map.wrapT=T.RepeatWrapping;map.anisotropy=4;textures.push(map);return map;}
 const m={};for(const kind of ['stone','wood','felt','leather','rug','roof','plaster','cabinet','deck']){const map=surface(kind);m[kind]=new (kind==='stone'?T.MeshPhysicalMaterial:T.MeshStandardMaterial)({map,bumpMap:map,bumpScale:{stone:.004,wood:.012,leather:.025,rug:.018,plaster:.012}[kind]||.01,roughness:{stone:.18,wood:.4,leather:.38,roof:.8}[kind]||.86,metalness:kind==='stone'?.3:0});}
 // A small warm studio environment supplies ceiling-light reflections to polished stone.
 const reflection=document.createElement('canvas');reflection.width=512;reflection.height=256;const rg=reflection.getContext('2d');rg.fillStyle='#29241d';rg.fillRect(0,0,512,256);for(const x of [40,168,296,424]){const glow=rg.createRadialGradient(x,86,2,x,86,43);glow.addColorStop(0,'#ffe4a8');glow.addColorStop(.2,'#d59345');glow.addColorStop(1,'#29241d');rg.fillStyle=glow;rg.fillRect(x-43,43,86,86);rg.fillStyle='#ffe5b3';rg.fillRect(x-3,60,6,43);}const reflectionMap=new T.CanvasTexture(reflection);reflectionMap.colorSpace=T.SRGBColorSpace;reflectionMap.mapping=T.EquirectangularReflectionMapping;textures.push(reflectionMap);m.stone.envMap=reflectionMap;m.stone.clearcoat=.85;m.stone.clearcoatRoughness=.12;m.stone.envMapIntensity=.9;
 m.gold=new T.MeshStandardMaterial({color:'#b99958',metalness:.78,roughness:.29});m.dark=new T.MeshStandardMaterial({color:'#182421',metalness:.55,roughness:.35});m.cream=new T.MeshStandardMaterial({color:'#d7c5a1',roughness:.85});m.rubber=new T.MeshStandardMaterial({color:'#171d1c',roughness:.95});m.red=new T.MeshStandardMaterial({color:'#a04730',metalness:.25,roughness:.4});m.green=new T.MeshStandardMaterial({color:'#346044',roughness:.8});m.light=new T.MeshStandardMaterial({color:'#ffe2a8',emissive:'#ffc46a',emissiveIntensity:2.1,roughness:.4});m.water=new T.MeshPhysicalMaterial({color:'#398b8c',roughness:.16,metalness:.25,clearcoat:1,transparent:true,opacity:.82});m.glass=new T.MeshPhysicalMaterial({color:'#a7c4bc',roughness:.13,metalness:.2,transparent:true,opacity:.2,depthWrite:false});
 return m;
}
