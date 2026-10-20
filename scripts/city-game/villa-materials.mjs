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
 if(kind==='rug'){
 g.fillStyle='#263733';g.fillRect(0,0,512,512);
 for(let i=0;i<12000;i++){g.fillStyle=i%2?'#bdab7a0b':'#0000000d';g.fillRect(random()*512,random()*512,1,2);}
 for(const [inset,width,color]of [[12,3,'#af9862'],[21,1,'#847553'],[35,2,'#b69c68'],[45,1,'#847553']]){g.strokeStyle=color;g.lineWidth=width;g.strokeRect(inset,inset,512-inset*2,512-inset*2);}
 g.strokeStyle='#a8946155';g.lineWidth=1;
 for(let y=65;y<460;y+=32)for(let x=65;x<460;x+=32){g.beginPath();g.moveTo(x-5,y);g.quadraticCurveTo(x,y-9,x+5,y);g.quadraticCurveTo(x,y+9,x-5,y);g.stroke();}
 g.save();g.translate(256,256);for(let i=0;i<16;i++){g.rotate(Math.PI/8);g.strokeStyle='#b6a16c';g.beginPath();g.moveTo(0,0);g.bezierCurveTo(25,-26,65,-23,88,0);g.bezierCurveTo(65,23,25,26,0,0);g.stroke();}for(const r of [28,94,104]){g.beginPath();g.arc(0,0,r,0,Math.PI*2);g.stroke();}g.fillStyle='#c2ac78';g.font='44px Georgia';g.textAlign='center';g.fillText('♠',0,16);g.restore();
 }
 if(kind==='roof'){g.strokeStyle='#83908644';for(let y=0;y<512;y+=32){g.fillStyle='#00000040';g.fillRect(0,y,512,3);for(let x=y%64?32:0;x<512;x+=64)g.strokeRect(x,y,64,32);}}
 if(kind==='leather'){for(let y=0;y<512;y+=128)for(let x=0;x<512;x+=128){g.beginPath();g.moveTo(x,y);g.lineTo(x+64,y+64);g.lineTo(x+128,y);g.strokeStyle='#31171055';g.lineWidth=4;g.stroke();g.fillStyle='#d38d5866';g.beginPath();g.arc(x+64,y+64,5,0,Math.PI*2);g.fill();}}
 const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;map.wrapS=map.wrapT=T.RepeatWrapping;map.anisotropy=4;textures.push(map);return map;}
 const m={};for(const kind of ['stone','wood','felt','leather','rug','roof','plaster','deck']){const map=surface(kind);m[kind]=new T.MeshStandardMaterial({map,bumpMap:map,bumpScale:{stone:.018,wood:.012,leather:.025,rug:.018,plaster:.012}[kind]||.01,roughness:{stone:.32,wood:.4,leather:.38,roof:.8}[kind]||.86,metalness:kind==='stone'?.12:0});}
 m.gold=new T.MeshStandardMaterial({color:'#b99958',metalness:.78,roughness:.29});m.dark=new T.MeshStandardMaterial({color:'#182421',metalness:.55,roughness:.35});m.cream=new T.MeshStandardMaterial({color:'#d7c5a1',roughness:.85});m.rubber=new T.MeshStandardMaterial({color:'#171d1c',roughness:.95});m.red=new T.MeshStandardMaterial({color:'#a04730',metalness:.25,roughness:.4});m.green=new T.MeshStandardMaterial({color:'#346044',roughness:.8});m.light=new T.MeshStandardMaterial({color:'#ffe2a8',emissive:'#ffc46a',emissiveIntensity:2.1,roughness:.4});m.water=new T.MeshPhysicalMaterial({color:'#398b8c',roughness:.16,metalness:.25,clearcoat:1,transparent:true,opacity:.82});m.glass=new T.MeshPhysicalMaterial({color:'#a7c4bc',roughness:.13,metalness:.2,transparent:true,opacity:.2,depthWrite:false});
 return m;
}
