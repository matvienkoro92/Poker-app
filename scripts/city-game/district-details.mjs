import * as T from '../../vendor/three/three.module.min.js';
import {venuePlan,districtDriveways} from './district-plan.mjs';
// The shop fit-out is actual geometry; signs and menus are mounted on physical objects.
export function buildDistrict({buildings,scene,textures,box,cylinder,batch,label,outdoors}){
 const glass=new T.MeshPhysicalMaterial({color:'#abc5be',metalness:.12,roughness:.1,transparent:true,opacity:.19,depthWrite:false,side:T.DoubleSide});
 function panel(x,y,z,w,h){const p=new T.Mesh(new T.PlaneGeometry(w,h),glass);p.position.set(x,y,z);p.name='Shopfront glazing';scene.add(p);}
 function chair(x,z,color,angle=0){
  const c=Math.cos(angle),s=Math.sin(angle),p=(dx,dz)=>[x+dx*c+dz*s,z-dx*s+dz*c];
  for(const dx of [-.26,.26])for(const dz of [-.25,.25]){const q=p(dx,dz);box('#354740',q[0],.23,q[1],.045,.46,.045);}
  batch('box',color,x,.49,z,.65,.09,.65,angle);const back=p(0,-.31);batch('box',color,back[0],.84,back[1],.66,.6,.065,angle);
  for(const dx of [-.3,.3]){const q=p(dx,0);batch('box','#354740',q[0],.74,q[1],.035,.06,.6,angle);}
 }
 function cup(x,y,z){cylinder('#e5d9ba',x,y,z,.12,.018);cylinder('#e8dfc9',x,y+.08,z,.065,.14);cylinder('#523d2b',x,y+.155,z,.047,.006);batch('ball','#e8dfc9',x+.074,y+.08,z,.035,.047,.025);}
 function table(f,theme){cylinder('#324139',f.x,.42,f.z,.065,.75);cylinder('#324139',f.x,.12,f.z,.38,.055);cylinder(theme,f.x,.82,f.z,.67,.065);cylinder('#b29a67',f.x,.787,f.z,.675,.012);cup(f.x-.22,.863,f.z);cup(f.x+.22,.863,f.z+.12);box('#c7b99a',f.x+.12,.87,f.z-.24,.25,.012,.34);}
 function menu(f,v){
  for(const side of [-1,1])batch('box','#765c40',f.x+side*.28,.57,f.z,.045,1.13,.045,0,side*.08);
  box('#765c40',f.x,1.09,f.z,.68,.08,.09);box('#233b34',f.x,.64,f.z,.57,.84,.06);
  const c=document.createElement('canvas');c.width=256;c.height=384;const g=c.getContext('2d');g.fillStyle='#20362f';g.fillRect(0,0,256,384);g.strokeStyle='#c7b286';g.strokeRect(10,10,236,364);g.textAlign='center';g.fillStyle='#eee1ba';g.font='600 24px sans-serif';g.fillText(v.type==='records'?'NEW RELEASES':'МЕНЮ',128,65);g.font='18px sans-serif';for(const [i,t]of (v.type==='bistro'?['Завтраки','Паста дня','Лимонад']:v.type==='records'?['JAZZ / SOUL','HIP HOP','LISTEN INSIDE']:['Эспрессо','Капучино','Круассан']).entries()){g.fillText(t,128,136+i*62);g.fillRect(45,154+i*62,166,1);}const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;textures.push(map);const sign=new T.Mesh(new T.PlaneGeometry(.55,.82),new T.MeshStandardMaterial({map,roughness:.85}));sign.position.set(f.x,.65,f.z+.034);scene.add(sign);
 }
 for(const b of buildings){const p=venuePlan(b);if(!p)continue;const {venue:v,front,depth,items}=p,back=front-depth;
  // Structural side walls, low plinth and proper lintel leave a 2.4m opening in the centre.
  for(const side of [-1,1])box('#d2c7af',b.x+side*(b.w/2-.12),1.95,front-depth/2,.24,3.9,depth);
  box('#d6cbb4',b.x,3.86,front-depth/2,b.w,.18,depth);box('#b1a58e',b.x,.09,front-depth/2,b.w-.3,.08,depth);
  if(['cafe','records','hotel'].includes(v.type))outdoors.deck(b.x,front-depth/2,b.w-.4,depth,.145);else outdoors.paving(b.x,front-depth/2,b.w-.4,depth,.145);
  box(v.color,b.x,3.4,front+.05,b.w-.14,.7,.22);box('#cfb579',b.x,3.04,front+.18,b.w-.1,.045,.06);
  label(v.name,b.x,3.43,front+.173,Math.min(b.w-1,12),.55,0,v.color,'#f0dbab');
  for(const side of [-1,1]){
   const wing=(b.w-2.4)/2,x=b.x+side*(1.2+wing/2);
   panel(x,1.82,front+.06,wing-.13,2.7);box('#334b44',x,.37,front+.075,wing,.55,.13);box('#334b44',x,3.02,front+.075,wing,.08,.15);
   for(let dx=-wing/2;dx<=wing/2+.01;dx+=2.1)box('#4c5f50',x+dx,1.81,front+.08,.065,2.4,.12);
   box('#d2c7af',b.x+side*1.22,1.54,front+.06,.12,3.08,.3);box('#bba26c',b.x+side*1.13,1.7,front+.17,.045,.42,.05);
  }
  // Rolled fabric awnings project from a fascia and are supported by slender metal arms.
  for(let x=b.x-b.w/2+.3;x<b.x+b.w/2-.2;x+=.55){batch('box',Math.round((x-b.x)/.55)%2?v.color:'#cdbb94',x,3.1,front+.78,.54,.055,1.45,0,-.08);box(v.color,x,3,front+1.48,.54,.18,.035);}
  for(const dx of [-b.w/2+.55,0,b.w/2-.55])box('#45594d',b.x+dx,2.83,front+.7,.04,.04,1.35);
  // Back wall shelving and ceiling lights stay inside the room, never on the street plane.
  box(v.color,b.x,1.95,back+.08,b.w-.35,3.8,.13);box('#eee1bd',b.x,3.74,front-2.25,b.w-.8,.035,.28);
  for(const dx of [-b.w*.3,b.w*.3]){cylinder('#3c4840',b.x+dx,3.38,front-2.2,.02,.66);batch('cone','#9a8156',b.x+dx,3.05,front-2.2,.34,.22,.34);batch('box','#f4ddb0',b.x+dx,2.95,front-2.2,.38,.025,.38,0,0,true);}
  for(const f of items){
   if(f.kind==='counter'){
    box('#765d46',f.x,.65,f.z,f.w,1.3,f.d);box('#bdb499',f.x,1.34,f.z,f.w+.12,.1,f.d+.13);
    for(let x=f.x-f.w/2+.15;x<f.x+f.w/2;x+=.18)box('#4c4136',x,.65,f.z+.61,.04,1.15,.025);
    if(['cafe','bistro','hotel'].includes(v.type)){
     box('#33433f',f.x-.7,1.66,f.z,.9,.58,.55);box('#b1b7a8',f.x-.7,1.75,f.z+.29,.85,.2,.035);
     for(const dx of [-.95,-.65]){cylinder('#33433f',f.x+dx,1.89,f.z,.1,.065);cup(f.x+dx,1.4,f.z+.43);}
     for(let i=0;i<4;i++)cylinder('#d7c9a9',f.x+.5,1.42+i*.035,f.z,.18,.025);
    }
   }else if(f.kind==='indoor-table'){table(f,'#9c8060');chair(f.x,f.z+.95,'#a49270',Math.PI);}
   else if(f.kind==='patio-table'){
    table(f,'#aa9270');
    if(['cafe','bistro'].includes(v.type)&&f.x<b.x&&f.z>front+7){
     cylinder('#6a5c44',f.x,1.65,f.z,.027,2.8);batch('cone',v.type==='cafe'?'#d0c09a':'#926450',f.x,2.95,f.z,1.7,.42,1.7);for(let i=0;i<8;i++){const a=i*Math.PI/4;batch('box','#b4a483',f.x+Math.sin(a)*.8,2.82,f.z+Math.cos(a)*.8,.022,.022,1.65,a);}
    }
   }else if(f.kind==='patio-chair')chair(f.x,f.z,v.color,f.x<b.x?Math.PI/2:-Math.PI/2);
   else if(f.kind==='menu')menu(f,v);
   else if(f.kind==='planter'){box('#a9a48e',f.x,.27,f.z,f.w,.54,f.d);box('#484633',f.x,.55,f.z,f.w-.14,.025,f.d-.18);for(let dz=-2.8;dz<3;dz+=.85)outdoors.shrub(f.x,f.z+dz,.55,.55);}
   else if(f.kind==='produce'){
    box('#8b6b45',f.x,.57,f.z,f.w,1.1,f.d);for(let k=0;k<3;k++){box('#bb9767',f.x,.82+k*.13,f.z+f.d/2+.015,f.w+.03,.06,.035);}
    for(let i=0;i<5;i++)for(let j=0;j<3;j++){batch('ball',['#a7984c','#b87843','#71904a'][(i+j)%3],f.x-.5+i*.23,1.18,f.z-.32+j*.27,.1,.11,.1);}
   }else if(f.kind==='record-bin'){
    box('#896d50',f.x,.61,f.z,f.w,1.1,f.d);for(let i=0;i<7;i++){box('#252b2b',f.x-.84+i*.27,1.2,f.z,.21,.44,.35);batch('ball','#c1a464',f.x-.84+i*.27,1.22,f.z+.19,.06,.06,.015);}
   }else if(f.kind==='barber-chair'){
    cylinder('#a4aaa0',f.x,.25,f.z,.4,.1);cylinder('#a4aaa0',f.x,.53,f.z,.075,.55);batch('ball','#392c29',f.x,.85,f.z,.56,.16,.55);box('#392c29',f.x,1.19,f.z-.44,1.05,.76,.16);box('#b7b9a7',f.x,2.1,back+.14,1.35,1.6,.055);box('#ccc7b4',f.x,1.22,back+.43,1.7,.09,.55);
   }
  }
  if(['cafe','bistro'].includes(v.type)){
   const c=document.createElement('canvas');c.width=512;c.height=640;const g=c.getContext('2d');g.fillStyle=v.type==='cafe'?'#243b32':'#453d33';g.fillRect(0,0,512,640);g.strokeStyle='#baa276';g.lineWidth=5;g.strokeRect(14,14,484,612);g.strokeRect(24,24,464,592);g.fillStyle='#e6d7ad';g.textAlign='center';g.font='600 37px Georgia';g.fillText(v.type==='cafe'?'SPECIALTY COFFEE':'СЕГОДНЯ В МЕНЮ',256,84);g.font='24px Georgia';for(const [i,t]of (v.type==='cafe'?['Эспрессо / фильтр','Капучино / латте','Свежие круассаны','Завтраки весь день']:['Домашняя паста','Сезонный салат','Суп дня','Лимонады']).entries()){g.fillText(t,256,169+i*77);g.strokeStyle='#b4a17366';g.lineWidth=1;g.beginPath();g.moveTo(65,191+i*77);g.lineTo(447,191+i*77);g.stroke();}g.font='italic 25px Georgia';g.fillText(v.type==='cafe'?'Take a little break':'Сделано с любовью',256,565);const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;textures.push(map);box('#8f7652',b.x,2.1,back+.15,2.6,2.8,.08);const board=new T.Mesh(new T.PlaneGeometry(2.5,2.7),new T.MeshStandardMaterial({map,roughness:.85}));board.position.set(b.x,2.1,back+.195);scene.add(board);
  }
  // Shop-specific back displays make each business readable before entering.
  if(v.type==='records')for(let i=0;i<7;i++){const x=b.x-10+i*3;box('#232c2c',x,2.2,back+.17,2.05,1.8,.09);batch('ball','#171d1d',x,2.2,back+.24,.65,.65,.035);batch('ball',['#aa8059','#789183','#c1b18b'][i%3],x,2.2,back+.28,.19,.19,.018);}
  else if(v.type==='cafe'||v.type==='bistro'){
   for(const y of [1.85,2.55]){box('#8c7253',b.x-b.w*.28,y,back+.35,Math.min(6,b.w*.4),.09,.55);for(let i=0;i<8;i++){const x=b.x-b.w*.28-2+i*.55;cylinder(i%3?'#d0c7ac':'#7a5b3d',x,y+.17,back+.38,.1,.26);}}
   label(v.subtitle,b.x+b.w*.23,2.3,back+.17,Math.min(6,b.w*.4),.65,0,v.color,'#e3ce9c');
  }else if(v.type==='market'){for(let i=0;i<6;i++){const x=b.x-5+i*2;box('#9b815c',x,2.25,back+.22,1.5,1.8,.18);for(let j=0;j<3;j++)box(['#c4b77f','#c7a180','#9eac8a'][j],x,1.7+j*.48,back+.34,1.2,.28,.09);}}
  else if(v.type==='hotel'){label('RECEPTION',b.x-b.w*.28,2.65,back+.17,5,.5,0,v.color,'#ead6ad');for(const dx of [4,7]){box('#8a775d',b.x+dx,2.3,back+.16,2,1.5,.1);box('#ada68a',b.x+dx,2.3,back+.23,1.8,1.3,.025);}}
  else if(v.type==='barber'){
   cylinder('#dfd8bf',b.x-1.85,2.12,front+.22,.1,.8);for(let j=0;j<5;j++)cylinder(j%2?'#84523f':'#40596b',b.x-1.85,1.84+j*.14,front+.22,.105,.06);
  }
  // Approach, terrace and service spur stop before the public through-lane.
  if(v.patio){
   outdoors.paving(b.x,front+6,b.w-.3,11,.105);const approach=Math.max(.4,62.5-(front+11.5));outdoors.paving(b.x,front+11.5+approach/2,3.3,approach,.11);
   for(const side of [-1,1]){box('#baae92',b.x+side*1.6,.12,front+12.8,.07,.05,4);}
   if(v.type==='cafe'||v.type==='records'){
    const drive=districtDriveways(buildings).find(d=>Math.abs(d.x-(v.type==='records'?b.x:b.x+b.w/2+2.4))<.01),x=drive.x,mid=(drive.start+drive.end)/2;outdoors.asphalt(x,mid,drive.width,drive.end-drive.start,.055);for(const side of [-1,1])box('#c6bda2',x+side*1.72,.04,mid,.12,.08,drive.end-drive.start);
    for(const dx of [-1.25,1.25])box('#d7ceac',x+dx,.069,front+5,.045,.012,4.6);box('#d7ceac',x,.069,front+2.7,2.5,.012,.045);
   }
  }else outdoors.paving(b.x,front+1.2,3.8,2.2,.12);
 }
}
