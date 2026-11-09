import * as T from '../../vendor/three/three.module.min.js';

// The complete pool shares geometry and materials. Dimensions match engine hit areas.
export function createRoadPropFactory(block, mat) {
 const geometries=new Map(),materials=new Map(),textures=new Map();
 const geometry=(key,build)=>{if(!geometries.has(key))geometries.set(key,build());return geometries.get(key);};
 const material=(key,build)=>{if(!materials.has(key))materials.set(key,build());return materials.get(key);};
 function texture(kind){
  if(textures.has(kind))return textures.get(kind);
  const canvas=document.createElement('canvas');canvas.width=canvas.height=256;const c=canvas.getContext('2d');
  c.fillStyle={concrete:'#aaa99f',steel:'#727d82',stripe:'#e1d8b9',rubber:'#262c30'}[kind]||'#35424a';c.fillRect(0,0,256,256);
  let seed=1729;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  if(kind==='stripe'){c.fillStyle='#b35330';for(let x=-256;x<512;x+=88){c.beginPath();c.moveTo(x,0);c.lineTo(x+42,0);c.lineTo(x-86,256);c.lineTo(x-128,256);c.fill();}}
  for(let n=0;n<6500;n++){const x=random()*256,y=random()*256,v=random();c.fillStyle=v>.5?'#ffffff13':'#00000018';c.fillRect(x,y,kind==='concrete'?2:1,1+random()*2);}
  if(kind==='steel'){c.strokeStyle='#b5bdc077';c.lineWidth=2;for(let y=8;y<256;y+=16)for(let x=8;x<256;x+=24){c.beginPath();c.moveTo(x+(y%32?8:0),y);c.lineTo(x+8+(y%32?8:0),y+5);c.stroke();}}

  const t=new T.CanvasTexture(canvas);t.colorSpace=T.SRGBColorSpace;t.wrapS=t.wrapT=T.RepeatWrapping;t.anisotropy=4;textures.set(kind,t);return t;
 }
 const concrete=material('concrete',()=>new T.MeshStandardMaterial({map:texture('concrete'),bumpMap:texture('concrete'),bumpScale:.025,roughness:.96,color:'#c2c0b5'}));
 const steel=material('steel',()=>new T.MeshStandardMaterial({map:texture('steel'),bumpMap:texture('steel'),bumpScale:.012,roughness:.57,metalness:.7,color:'#8b969c'}));
 const dark=material('dark',()=>new T.MeshStandardMaterial({color:'#26343c',metalness:.6,roughness:.5}));
 const stripe=material('stripe',()=>new T.MeshStandardMaterial({map:texture('stripe'),roughness:.68,metalness:.15,side:T.DoubleSide}));
 const amber=material('amber',()=>new T.MeshStandardMaterial({color:'#d99426',emissive:'#ffaf30',emissiveIntensity:.65,roughness:.28}));
 function mesh(parent,g,m,x=0,y=0,z=0,sx=1,sy=1,sz=1){const o=new T.Mesh(g.geometry||g,m);o.position.set(x,y,z);const dimensions=g.dimensions||[1,1,1];o.scale.set(sx*dimensions[0],sy*dimensions[1],sz*dimensions[2]);parent.add(o);return o;}
 const plane=geometry('plane',()=>new T.PlaneGeometry(1,1));
 const cylinder=geometry('cylinder',()=>new T.CylinderGeometry(1,1,1,20));
 const sphere=geometry('sphere',()=>new T.SphereGeometry(1,12,8));
 function bevel(w,h,d){const unit=geometry('beveled-unit',()=>{const r=.045,shape=new T.Shape();shape.moveTo(-.5+r,-.5+r);shape.lineTo(.5-r,-.5+r);shape.lineTo(.5-r,.5-r);shape.lineTo(-.5+r,.5-r);shape.closePath();return new T.ExtrudeGeometry(shape,{depth:1-r*2,bevelEnabled:true,bevelSize:r,bevelThickness:r,bevelSegments:2,steps:1}).translate(0,0,-.5+r);});return {geometry:unit,dimensions:[w,h,d]};}

 function panel(parent,x,y,z,w,h){const o=mesh(parent,plane,stripe,x,y,z,w,h);o.rotation.y=Math.PI;return o;}
 function badge(parent,symbol,color,x,y,z,size){
  const key='badge:'+symbol+color;
  const m=material(key,()=>{const canvas=document.createElement('canvas');canvas.width=canvas.height=128;const c=canvas.getContext('2d');c.fillStyle='#14232b';c.fillRect(0,0,128,128);c.strokeStyle=color;c.lineWidth=5;c.strokeRect(5,5,118,118);c.fillStyle=color;c.strokeStyle=color;c.textAlign='center';c.textBaseline='middle';c.font='bold 84px Arial';
   if(symbol==='shield'){c.beginPath();c.moveTo(64,21);c.lineTo(99,34);c.lineTo(91,77);c.quadraticCurveTo(80,95,64,107);c.quadraticCurveTo(48,95,37,77);c.lineTo(29,34);c.closePath();c.lineWidth=7;c.stroke();}
   else if(symbol==='nitro'){c.beginPath();c.moveTo(73,15);c.lineTo(30,72);c.lineTo(59,72);c.lineTo(48,113);c.lineTo(100,51);c.lineTo(69,51);c.closePath();c.fill();}else c.fillText(symbol,64,68);
   const map=new T.CanvasTexture(canvas);map.colorSpace=T.SRGBColorSpace;return new T.MeshStandardMaterial({map,emissiveMap:map,emissive:'#ffffff',emissiveIntensity:.35,roughness:.4,side:T.DoubleSide});});
  const o=mesh(parent,plane,m,x,y,z,size,size);o.rotation.y=Math.PI;return o;
 }
 function glow(parent,color,r){const m=material('glow:'+color,()=>{const canvas=document.createElement('canvas');canvas.width=canvas.height=64;const c=canvas.getContext('2d'),g=c.createRadialGradient(32,32,4,32,32,32);g.addColorStop(0,color);g.addColorStop(1,'transparent');c.fillStyle=g;c.fillRect(0,0,64,64);return new T.MeshBasicMaterial({map:new T.CanvasTexture(canvas),transparent:true,opacity:.28,depthWrite:false});});const o=mesh(parent,plane,m,0,.025,0,r*2,r*2);o.rotation.x=-Math.PI/2;}
 function beacon(parent,x,y,z){mesh(parent,cylinder,dark,x,y,z,.11,.09,.11);mesh(parent,sphere,amber,x,y+.11,z,.10,.13,.10);}
 function contact(parent,w,d){const m=material('contact',()=>{const canvas=document.createElement('canvas');canvas.width=canvas.height=64;const c=canvas.getContext('2d'),g=c.createRadialGradient(32,32,8,32,32,32);g.addColorStop(0,'#081016aa');g.addColorStop(1,'#08101600');c.fillStyle=g;c.fillRect(0,0,64,64);return new T.MeshBasicMaterial({map:new T.CanvasTexture(canvas),transparent:true,depthWrite:false,opacity:.55});});const o=mesh(parent,plane,m,0,.012,0,w,d);o.rotation.x=-Math.PI/2;}
 function puddle(parent,oil){
  const g=geometry('puddle',()=>{const shape=new T.Shape();for(let n=0;n<=48;n++){const a=n/48*Math.PI*2,r=1+.13*Math.sin(a*3)+.07*Math.cos(a*7);const x=Math.cos(a)*r,y=Math.sin(a)*r*.65;n?shape.lineTo(x,y):shape.moveTo(x,y);}const result=new T.ShapeGeometry(shape,24),uv=result.attributes.uv,pos=result.attributes.position;for(let i=0;i<uv.count;i++)uv.setXY(i,(pos.getX(i)+1.3)/2.6,(pos.getY(i)+.85)/1.7);return result;});
  if(!textures.has('puddle-edge')){const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d'),data=ctx.createImageData(128,128);for(let y=0;y<128;y++)for(let x=0;x<128;x++){const dx=(x/127-.5)*2.6,dy=(y/127-.5)*1.7/.65,a=Math.atan2(dy,dx),edge=1+.13*Math.sin(a*3)+.07*Math.cos(a*7),alpha=Math.max(0,Math.min(1,(edge-Math.hypot(dx,dy))/.18)),i=(y*128+x)*4;data.data[i]=data.data[i+1]=data.data[i+2]=255;data.data[i+3]=Math.round(alpha*255);}ctx.putImageData(data,0,0);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;textures.set('puddle-edge',t);}
  const m=material('puddle:'+oil,()=>new T.MeshStandardMaterial({map:textures.get('puddle-edge'),color:oil?'#151c21':'#263c43',roughness:oil?.16:.19,metalness:.22,transparent:true,opacity:oil?.8:.48,depthWrite:false}));
  const o=mesh(parent,g,m,0,.03,0,oil?1.55:2.25,oil?1.55:2.25);o.rotation.x=-Math.PI/2;
  for(let n=0;n<3;n++){const reflection=material('reflection:'+oil,()=>new T.MeshBasicMaterial({color:oil?'#6d5470':'#b5d2d7',transparent:true,opacity:oil?.12:.09,depthWrite:false}));const streak=mesh(parent,plane,reflection,(n-1)*.3,.036,(n-1)*.27,1.2-n*.2,.025);streak.rotation.set(-Math.PI/2,0,.1*n);}
 }
 return function build(kind){
  const part=new T.Group();part.name='road-'+kind;
  if(kind==='barrier'){
   const g=geometry('jersey',()=>{const shape=new T.Shape();for(const [i,[x,y]]of [[-.42,0],[.42,0],[.42,.18],[.22,.6],[.18,1.1],[-.18,1.1],[-.22,.6],[-.42,.18]].entries())i?shape.lineTo(x,y):shape.moveTo(x,y);shape.closePath();return new T.ExtrudeGeometry(shape,{depth:2.72,bevelEnabled:true,bevelSize:.025,bevelThickness:.04,bevelSegments:1,steps:1}).translate(0,0,-1.36).rotateY(Math.PI/2);});
   mesh(part,g,concrete);panel(part,0,.85,-.255,2.35,.33);for(const x of [-1.08,1.08])for(const y of [.73,.97]){const bolt=mesh(part,cylinder,steel,x,y,-.267,.025,.018,.025);bolt.rotation.x=Math.PI/2;}for(const side of [-1,1]){mesh(part,bevel(.34,.12,.72,.025),dark,side*1.04,.07,0);beacon(part,side*1.07,1.15,0);}
  }else if(kind==='gate'){
   for(const side of [-1,1]){mesh(part,bevel(.55,.18,1,.035),dark,side*1.13,.1,0);mesh(part,cylinder,steel,side*1.13,.65,0,.055,1.15,.055);beacon(part,side*1.13,1.36,0);}
   mesh(part,bevel(2.9,.6,.14,.035),dark,0,.93,0);panel(part,0,.93,-.08,2.82,.52);mesh(part,bevel(2.8,.12,.12,.025),steel,0,.4,0);
  }else if(kind==='ramp'){
   const g=geometry('ramp',()=>{const shape=new T.Shape();shape.moveTo(-2,0);shape.lineTo(2,0);shape.lineTo(2,1.1);shape.closePath();return new T.ExtrudeGeometry(shape,{depth:4,bevelEnabled:false,steps:1}).translate(0,0,-2).rotateY(-Math.PI/2);});
   mesh(part,g,dark);const deck=mesh(part,plane,steel,0,.563,0,3.86,Math.hypot(4,1.1));deck.rotation.x=-Math.PI/2-Math.atan2(1.1,4);
   for(const side of [-1,1]){const rail=mesh(part,bevel(.1,.1,4.15,.025),steel,side*1.95,.59,0);rail.rotation.x=-Math.atan2(1.1,4);for(const z of [-1.2,0,1.2])mesh(part,cylinder,amber,side*1.95,(z+2)*1.1/4+.08,z,.045,.035,.045);}
   for(const z of [-1.5,.1,1.6]){const band=panel(part,0,(z+2)*1.1/4+.022,z,3.7,.18);band.rotation.set(-Math.PI/2-Math.atan2(1.1,4),0,0);}
   for(const child of part.children)child.position.z-=2;
  }else if(kind==='box'){
   mesh(part,bevel(1.15,.85,.85,.08),dark,0,.57,0);for(const side of [-1,1])mesh(part,bevel(.1,.91,.91,.025),steel,side*.43,.57,0);mesh(part,bevel(.4,.1,.14,.03),steel,0,1.06,0);badge(part,'?','#e4c37e',0,.6,-.438,.53);glow(part,'#e9bb5c',.95);
  }else if(kind==='nitro'||kind==='shield'){
   const color=kind==='nitro'?'#b68b3e':'#387888';const shell=material(kind,()=>new T.MeshStandardMaterial({color,metalness:.65,roughness:.3}));
   mesh(part,cylinder,shell,0,.65,0,.34,1,.34);mesh(part,sphere,shell,0,1.15,0,.34,.2,.34);mesh(part,cylinder,dark,0,.15,0,.37,.15,.37);mesh(part,cylinder,steel,0,1.36,0,.08,.16,.08);mesh(part,bevel(.3,.06,.06,.02),steel,0,1.45,0);for(const y of [.35,.95])mesh(part,cylinder,dark,0,y,0,.35,.07,.35);badge(part,kind,kind==='nitro'?'#ffe0a0':'#9ceded',0,.66,-.35,.43);glow(part,kind==='nitro'?'#efc16e':'#6ddce7',.9);
  }else if(kind==='chips'){
   for(let i=0;i<3;i++){mesh(part,cylinder,mat('#b38c48'),0,.12+i*.13,0,.43,.105,.43);for(let n=0;n<6;n++){const a=n*Math.PI/3;const mark=block(part,'#e0d1a9',Math.cos(a)*.39,.12+i*.13,Math.sin(a)*.39,.09,.106,.12);mark.rotation.y=-a;}}const top=badge(part,'♠','#d7b66e',0,.438,0,.42);top.rotation.set(-Math.PI/2,0,0);
  }else if(kind==='pad'){
   mesh(part,bevel(4,.06,3.5,.02),dark,0,.035,0);for(const side of [-1,1])block(part,'#4e9b9c',side*1.95,.08,0,.09,.04,3.5);for(const z of [-1.1,0,1.1])for(const side of [-1,1]){const arrow=block(part,'#b5ded0',side*.45,.085,z,.12,.025,1.15);arrow.rotation.y=side*.8;}
  }else if(kind==='oil'||kind==='wet'){puddle(part,kind==='oil');
  }else if(kind==='rocket'){
   const body=mesh(part,cylinder,steel,0,.65,0,.18,1.3,.18);body.rotation.x=Math.PI/2;const nose=mesh(part,geometry('nose',()=>new T.ConeGeometry(.18,.45,12)),mat('#a6533c'),0,.65,.85);nose.rotation.x=Math.PI/2;for(const side of [-1,1])block(part,'#a6533c',side*.24,.65,-.45,.4,.08,.45);
  }else if(kind==='trap'){
   mesh(part,cylinder,dark,0,.12,0,.55,.18,.55);for(let n=0;n<6;n++)mesh(part,geometry('spike',()=>new T.ConeGeometry(.1,.3,8)),steel,Math.cos(n*Math.PI/3)*.4,.32,Math.sin(n*Math.PI/3)*.4);beacon(part,0,.24,0);
  }
  if(['barrier','gate'].includes(kind))contact(part,3.5,1.5);else if(['box','nitro','shield','trap','chips'].includes(kind))contact(part,1.35,1.35);
  return part;
 };
}
