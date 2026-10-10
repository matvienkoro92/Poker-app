(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PokerGarage=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){'use strict';
const groups={paint:'Окраска',wheels:'Диски',light:'Подсветка',helmet:'Шлем',suit:'Костюм',shoes:'Кроссовки'};
// Explicit unlock levels: free personalisation, frequent early rewards, rare prestige finishes.
const items=[
['paint','classic','Клубный зелёный','#186943',0],['paint','ruby','Красный ривер','#a62d3b',0],['paint','midnight','Ночной стол','#42518d',0],['paint','pearl','Жемчужный стол','#dce3e8',10],['paint','champagne','Золотой натс','#c9a551',50],['paint','royal','Королевский фиолетовый','#925bc5',75],['paint','legend','Легенда клуба','#e7c780',100],
['wheels','classic','Золотая пика','#dab56a',0],['wheels','silver','Серебряный круг','#dce5ec',2],['wheels','carbon','Карбон 21','#687887',15],['wheels','onyx','Чёрная пика','#303742',30],
['light','cyan','Лазурь','#39dfed',0],['light','amber','Янтарь','#ffb54f',0],['light','violet','Неоновая ночь','#c087ff',8],['light','ice','Ледяной свет','#b9ecff',40],
['helmet','none','Без шлема','#ac9371',0],['helmet','club','Клубный шлем','#d5ab57',3],['helmet','night','Ночной визор','#62dbe1',25],
['suit','classic','Клубная форма','#227844',0],['suit','ruby','Красная линия','#a52f3f',5],['suit','midnight','Ночная смена','#465493',20],
['shoes','classic','Белая пара','#f1eee6',0],['shoes','ruby','Красные акценты','#d54447',5],['shoes','gold','Золотой шаг','#d9b462',40]
].map(([kind,id,title,color,target])=>({kind,id,title,color,metric:'level',target,key:kind+':'+id}));
const defaults={paint:'classic',wheels:'classic',light:'cyan',helmet:'none',visor:'open',suit:'classic',shoes:'classic',number:'А217КМ',region:'54',target:'wheels:silver'};
function stats(s){return Object.fromEntries(['best','runs','chips','level'].map(k=>[k,Math.max(0,Math.floor(Number(s&&s[k])||0))]));}
function catalog(s){s=stats(s);return items.map(i=>({...i,value:s.level,unlocked:s.level>=i.target,condition:i.target===0?'Бесплатно · доступно сразу':s.level>=i.target?'Открыто на уровне '+i.target:'Откроется на уровне '+i.target}));}
function parsePlate(number,region='54'){const latin={A:'А',B:'В',E:'Е',K:'К',M:'М',H:'Н',O:'О',P:'Р',C:'С',T:'Т',Y:'У',X:'Х'};let n=String(number).toUpperCase().replace(/\s/g,'').replace(/[ABEKMHOPCTYX]/g,c=>latin[c]);if(/^\d{1,3}$/.test(n))n='А'+n.padStart(3,'0')+'КМ';const r=String(region);return /^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}$/.test(n)&&n.slice(1,4)!=='000'&&/^\d{2,3}$/.test(r)&&Number(r)>0?{number:n,region:r}:null;}
function plateLevel(number){const p=parsePlate(number);if(!p)return 0;const d=p.number.slice(1,4),letters=p.number[0]+p.number.slice(4);let level=0;if(d[0]===d[2])level=10;if(d.endsWith('00'))level=Math.max(level,20);if(letters[0]===letters[1]&&letters[1]===letters[2])level=Math.max(level,30);if(/^(\d)\1\1$/.test(d))level=Math.max(level,50);if(['001','007'].includes(d)||['АМР','ЕКХ','СКР'].includes(letters))level=Math.max(level,75);if(d==='777'&&letters[0]===letters[1]&&letters[1]===letters[2])level=100;return level;}
function plateCanvas(v){const p=parsePlate(v.number,v.region)||defaults,c=document.createElement('canvas');c.width=580;c.height=340;const x=c.getContext('2d');x.fillStyle='#fffefa';x.beginPath();x.roundRect(3,3,574,334,18);x.fill();x.strokeStyle='#111';x.lineWidth=8;x.stroke();x.beginPath();x.moveTo(312,335);x.lineTo(312,212);x.quadraticCurveTo(312,195,332,195);x.lineTo(576,195);x.stroke();x.fillStyle='#111';x.textAlign='center';x.textBaseline='middle';x.font='bold 158px Arial';x.fillText(p.number[0]+' '+p.number.slice(1,4),290,104,520);x.font='bold 145px Arial';x.fillText(p.number.slice(4),155,266,260);x.font='bold 108px Arial';x.fillText(p.region,444,252,230);x.font='bold 35px Arial';x.fillText('RUS',390,310);['#fff','#1548a0','#d4272e'].forEach((color,i)=>{x.fillStyle=color;x.fillRect(442,294+i*11,92,11);});x.strokeStyle='#555';x.lineWidth=1;x.strokeRect(442,294,92,33);return c;}
function normalize(value,s,strict){const c=catalog(s),v={...defaults};for(const kind of Object.keys(groups)){const id=value&&value[kind]||defaults[kind],item=c.find(i=>i.kind===kind&&i.id===id);if(!item||!item.unlocked){if(strict)throw Error('Эта вещь ещё не открыта');}else v[kind]=id;}v.visor=value&&value.visor==='closed'?'closed':'open';const plate=parsePlate(value&&value.number!==undefined?value.number:defaults.number,value&&value.region!==undefined?value.region:defaults.region);if(!plate){if(strict)throw Error('Номер: буква, 3 цифры, 2 буквы; регион — 2 или 3 цифры');}else if(plateLevel(plate.number)>stats(s).level){if(strict)throw Error('Это сочетание номера откроется на уровне '+plateLevel(plate.number));}else Object.assign(v,plate);if(value&&value.target){if(!c.some(i=>i.key===value.target)){if(strict)throw Error('Неизвестная цель');}else v.target=value.target;}return v;}
function shelfSlots(garage){const s=stats(garage&&garage.stats),c=catalog(s),look=normalize(garage&&garage.loadout,s);return Object.keys(groups).map(kind=>{const choices=c.filter(i=>i.kind===kind),selected=choices.find(i=>i.id===look[kind]),next=choices.filter(i=>!i.unlocked).sort((a,b)=>a.target-b.target)[0];return {kind,selected,owned:choices.filter(i=>i.unlocked).length,total:choices.length,next:next||null,empty:kind==='helmet'&&selected.id==='none'};});}
function item(kind,id){return items.find(i=>i.kind===kind&&i.id===id)||items.find(i=>i.kind===kind&&i.id===defaults[kind]);}
const artCache=new Map();
const helmetFront=typeof Image!=='undefined'?new Image():null;if(helmetFront){helmetFront.onload=()=>{if(typeof dispatchEvent==='function')dispatchEvent(new Event('poker-garage-art-ready'));};}
const helmet=typeof Image!=='undefined'?new Image():null;if(helmet){helmet.onload=()=>{if(typeof dispatchEvent==='function')dispatchEvent(new Event('poker-garage-art-ready'));};}

const helmetClosed=typeof Image!=='undefined'?new Image():null;if(helmetClosed)helmetClosed.onload=()=>{if(typeof dispatchEvent==='function')dispatchEvent(new Event('poker-garage-art-ready'));};
function loadHelmet(front,visor){const img=front?(visor==='closed'?helmetClosed:helmetFront):helmet;if(img&&!img.src)img.src=front?(visor==='closed'?'./assets/player-hall/garage-helmet-closed-v1.webp':'./assets/player-hall/garage-helmet-front-v1.webp'):'./assets/player-hall/garage-helmet-club-v1.webp';return img;}
function helmetArt(front,v){const img=loadHelmet(front,v.visor);if(!img||!img.naturalWidth||v.helmet!=='night')return img;const key='helmet:'+front+':'+v.visor+':night';if(artCache.has(key))return artCache.get(key);const c=document.createElement('canvas');c.width=img.naturalWidth;c.height=img.naturalHeight;const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0);const p=ctx.getImageData(0,0,c.width,c.height),d=p.data;for(let n=0;n<d.length;n+=4)if(d[n]>d[n+2]*1.3&&d[n+1]>d[n+2]*1.15){const l=d[n]/255;d[n]=60*l;d[n+1]=215*l;d[n+2]=232*l;}ctx.putImageData(p,0,0);artCache.set(key,c);return c;}
function insidePolygon(x,y,points){let inside=false;for(let i=0,j=points.length-1;i<points.length;j=i++){const a=points[i],b=points[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])inside=!inside;}return inside;}
function greenMaterial(x,y,width,height,role){if(role==='vehicle')return 'paint';if(width<1000)return insidePolygon(x/width,y/height,[[.32,.23],[.49,.23],[.7,.39],[.65,.54],[.4,.58],[.31,.46]])?'suit':'paint';return insidePolygon(x,y%550,[[640,125],[790,125],[930,215],[920,285],[850,343],[650,329],[610,260]])?'suit':'paint';}
function renderArt(image,v,role){if(typeof document==='undefined'||!image.naturalWidth)return image;v={...defaults,...v};const key=image.src+JSON.stringify([v.paint,v.suit,v.shoes,v.wheels,v.light])+(role||'');if(artCache.has(key))return artCache.get(key);const canvas=document.createElement('canvas');canvas.width=image.naturalWidth;canvas.height=image.naturalHeight;const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(image,0,0);const pixels=ctx.getImageData(0,0,canvas.width,canvas.height),d=pixels.data;
const rgb=color=>[1,3,5].map(n=>parseInt(color.slice(n,n+2),16));const colors={paint:rgb(item('paint',v.paint).color),suit:rgb(item('suit',v.suit).color),light:rgb(item('light',v.light).color),wheels:rgb(item('wheels',v.wheels).color),shoes:rgb(item('shoes',v.shoes).color)};
for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++){const n=(y*canvas.width+x)*4;if(d[n+3]<10)continue;const r=d[n],g=d[n+1],b=d[n+2],localY=y%550;let color=null;if(g>r*1.08&&g>b*1.08&&g>8&&g-Math.min(r,b)>4){const group=greenMaterial(x,y,canvas.width,canvas.height,role);if(v[group]!=='classic')color=colors[group];}else if(b>r*1.45&&g>r*1.4&&g>100&&v.light!=='cyan')color=colors.light;else if(v.wheels!=='classic'&&r>b*1.5&&g>b*1.15&&(role==='vehicle'?((x-canvas.width*.08)**2+(y-canvas.height*.44)**2<(canvas.width*.09)**2||(x-canvas.width*.44)**2+(y-canvas.height*.77)**2<(canvas.width*.13)**2):canvas.width<1000?y>canvas.height*.57:((x-455)**2+(localY-440)**2<78**2||(x-1080)**2+(localY-440)**2<78**2)))color=colors.wheels;else if(v.shoes!=='classic'&&localY>285&&localY<352&&x>850&&x<980&&r>120&&Math.max(r,g,b)-Math.min(r,g,b)<50)color=colors.shoes;if(color){const light=Math.max(r,g,b)/(color===colors.wheels?255:Math.max(...color));d[n]=Math.min(255,color[0]*light);d[n+1]=Math.min(255,color[1]*light);d[n+2]=Math.min(255,color[2]*light);}}
ctx.putImageData(pixels,0,0);if(artCache.size>8)artCache.clear();artCache.set(key,canvas);return canvas;}
function draw(ctx,v){v={...defaults,...v};ctx.save();ctx.font='bold 4.5px Arial';ctx.textAlign='center';ctx.fillStyle='#fff0ba';ctx.shadowColor='#000';ctx.shadowBlur=1;ctx.drawImage(plateCanvas(v),-4,21,16,9.38);ctx.shadowBlur=0;if(v.helmet!=='none')loadHelmet(false);if(v.helmet!=='none'&&helmet&&helmet.naturalWidth){ctx.drawImage(helmetArt(false,v),-12,-20,25,25);ctx.font='bold 2px Arial';ctx.fillStyle='#e1c27a';ctx.fillText('POKER21',-3,-8);} ctx.restore();}
function renderCharacter(image,v){
 if(typeof document==='undefined'||!image.naturalWidth)return image;
 v={...defaults,...v};const standing=image.src.includes('standing-monkey');const helmetImage=v.helmet!=='none'?loadHelmet(true,v.visor):null;
 const key='character:'+image.src+JSON.stringify([v.suit,v.shoes,v.helmet,v.visor])+(helmetImage&&helmetImage.naturalWidth||0);
 if(artCache.has(key))return artCache.get(key);
 const canvas=document.createElement('canvas');canvas.width=image.naturalWidth;canvas.height=image.naturalHeight;
 const c=canvas.getContext('2d',{willReadFrequently:true});c.drawImage(image,0,0);
 const pixels=c.getImageData(0,0,canvas.width,canvas.height),d=pixels.data;
 const colors=Object.fromEntries(['suit','shoes'].map(kind=>[kind,[1,3,5].map(n=>parseInt(item(kind,v[kind]).color.slice(n,n+2),16))]));
 for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++){
  const n=(y*canvas.width+x)*4,r=d[n],g=d[n+1],b=d[n+2];
  if(!d[n+3]||r<g*1.45||r<b*1.3||r<55)continue;
  const nx=x/canvas.width,ny=y/canvas.height;
  const shoe=standing?ny>.815:(nx>.55&&ny>.77)||(nx>.69&&ny>.51);
  // Keep the face and both hands completely outside the fabric mask.
  if(standing){if(ny<.145||(ny<.21&&nx>.42&&nx<.58)||(!shoe&&ny>.47&&ny<.61&&(nx<.28||nx>.72)))continue;}
  else if(!shoe&&(ny<.15||(nx>.15&&nx<.42&&ny<.25)||(nx>.73&&ny>.30&&ny<.515)))continue;
  const rgb=colors[shoe?'shoes':'suit'],light=r/255;
  d[n]=rgb[0]*light;d[n+1]=rgb[1]*light;d[n+2]=rgb[2]*light;
 }
 c.putImageData(pixels,0,0);
 if(v.helmet!=='none'&&helmetImage&&helmetImage.naturalWidth){
  if(standing){
   c.save();c.scale(canvas.width/1024,canvas.height/1536);
   c.beginPath();c.rect(0,0,1024,1536);
   c.moveTo(408,84);c.bezierCurveTo(440,57,563,57,596,84);
   c.bezierCurveTo(623,125,608,202,578,232);
   c.bezierCurveTo(538,270,462,264,425,231);
   c.bezierCurveTo(397,190,389,123,408,84);c.closePath();if(v.visor!=='closed')c.clip('evenodd');
   c.drawImage(helmetArt(true,v),337,-5,350,270);c.restore();
  }else{
  c.save();c.scale(canvas.width/1179,canvas.height/1334);
  c.beginPath();c.rect(0,0,1179,1334);
  // The open helmet follows the brow; its padding stays behind the face.
  c.moveTo(302,105);c.bezierCurveTo(325,74,432,59,459,93);
  c.bezierCurveTo(481,124,490,206,469,254);
  c.bezierCurveTo(441,300,358,296,337,258);
  c.bezierCurveTo(303,221,284,145,302,105);c.closePath();if(v.visor!=='closed')c.clip('evenodd');
  c.drawImage(helmetArt(true,v),170,-17,365,280);c.restore();
  // The hand rests in front of the helmet, just as it rests in front of the chin.
  c.save();c.scale(canvas.width/1179,canvas.height/1334);c.beginPath();
  c.moveTo(191,249);c.bezierCurveTo(198,194,275,204,324,231);
  c.bezierCurveTo(349,247,396,277,383,310);c.lineTo(350,340);
  c.lineTo(278,328);c.lineTo(201,289);c.closePath();c.clip();
  c.drawImage(image,0,0,1179,1334);c.restore();
  }
 }
 artCache.set(key,canvas);return canvas;
}

return {parsePlate,plateLevel,plateCanvas,groups,items,defaults,stats,catalog,normalize,shelfSlots,greenMaterial,item,draw,renderArt,renderCharacter,helmet,helmetFront,loadHelmet,helmetArt};});
