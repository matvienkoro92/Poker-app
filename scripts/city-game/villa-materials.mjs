import * as T from '../../vendor/three/three.module.min.js';
// Deterministic, tileable surface maps: no network assets or random changes on reload.
export function villaMaterials(textures){
 let seed=91;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 function surface(kind){const c=document.createElement('canvas');c.width=c.height=512;const g=c.getContext('2d');
 const colors={stone:'#393d38',wood:'#62402b',felt:'#144333',leather:'#72291f',rug:'#782e25',roof:'#263532',plaster:'#c1b798',deck:'#846449'};
 g.fillStyle=colors[kind];g.fillRect(0,0,512,512);
 for(let i=0;i<14000;i++){const x=random()*512,y=random()*512;g.fillStyle=random()>.5?'#ffffff0a':'#00000010';g.fillRect(x,y,kind==='wood'||kind==='deck'?40:2,1);}
 if(kind==='stone'){for(let k=0;k<18;k++){let y=random()*512;g.beginPath();g.moveTo(0,y);for(let x=0;x<=512;x+=16){y+=Math.sin(x*.035+k)*6+(random()-.5)*9;g.lineTo(x,y);}g.strokeStyle=k%3?'#c7b68722':'#e2c89342';g.lineWidth=k%3?.7:1.4;g.stroke();}g.strokeStyle='#151f1c';g.lineWidth=2;g.strokeRect(0,0,256,256);g.strokeRect(256,256,256,256);g.strokeRect(256,0,256,256);g.strokeRect(0,256,256,256);}
 if(kind==='wood'||kind==='deck'){for(let y=0;y<512;y+=64){g.fillStyle='#00000026';g.fillRect(0,y,512,2);for(let x=(y%128?128:0);x<512;x+=256){g.fillRect(x,y,1,64);g.fillStyle='#c5916330';g.fillRect(x+3,y+3,250,1);g.fillStyle='#00000026';}}}
 if(kind==='rug'){g.strokeStyle='#dab77e';g.lineWidth=3;g.strokeRect(14,14,484,484);g.strokeRect(28,28,456,456);g.strokeStyle='#2d2421';g.lineWidth=3;for(let y=48;y<480;y+=24)for(let x=48;x<480;x+=24){g.beginPath();g.moveTo(x,y-9);g.lineTo(x+8,y);g.lineTo(x,y+9);g.lineTo(x-8,y);g.closePath();g.stroke();g.fillStyle='#bf9659';g.fillRect(x-2,y-2,4,4);}}
 if(kind==='roof'){g.strokeStyle='#83908644';for(let y=0;y<512;y+=32){g.fillStyle='#00000040';g.fillRect(0,y,512,3);for(let x=y%64?32:0;x<512;x+=64)g.strokeRect(x,y,64,32);}}
 if(kind==='leather'){for(let y=0;y<512;y+=128)for(let x=0;x<512;x+=128){g.beginPath();g.moveTo(x,y);g.lineTo(x+64,y+64);g.lineTo(x+128,y);g.strokeStyle='#31171055';g.lineWidth=4;g.stroke();g.fillStyle='#d38d5866';g.beginPath();g.arc(x+64,y+64,5,0,Math.PI*2);g.fill();}}
 const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;map.wrapS=map.wrapT=T.RepeatWrapping;map.anisotropy=4;textures.push(map);return map;}
 const m={};for(const kind of ['stone','wood','felt','leather','rug','roof','plaster','deck']){const map=surface(kind);m[kind]=new T.MeshStandardMaterial({map,roughness:{stone:.32,wood:.4,leather:.38,roof:.8}[kind]||.86,metalness:kind==='stone'?.12:0});}
 m.gold=new T.MeshStandardMaterial({color:'#b99958',metalness:.78,roughness:.29});m.dark=new T.MeshStandardMaterial({color:'#182421',metalness:.55,roughness:.35});m.cream=new T.MeshStandardMaterial({color:'#d7c5a1',roughness:.85});m.rubber=new T.MeshStandardMaterial({color:'#171d1c',roughness:.95});m.red=new T.MeshStandardMaterial({color:'#a04730',metalness:.25,roughness:.4});m.green=new T.MeshStandardMaterial({color:'#346044',roughness:.8});m.light=new T.MeshStandardMaterial({color:'#ffe2a8',emissive:'#ffc46a',emissiveIntensity:2.1,roughness:.4});m.water=new T.MeshPhysicalMaterial({color:'#398b8c',roughness:.16,metalness:.25,clearcoat:1,transparent:true,opacity:.82});m.glass=new T.MeshPhysicalMaterial({color:'#a7c4bc',roughness:.13,metalness:.2,transparent:true,opacity:.2,depthWrite:false});
 return m;
}
