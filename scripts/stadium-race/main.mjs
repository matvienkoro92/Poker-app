import {createRoadPropFactory} from './road-props.mjs';
import {createUpperRoutes} from './upper-routes.mjs';
import {createRaceEffects} from './effects.mjs';
import {createRivalArt} from './rival-art.mjs';
import * as T from '../../vendor/three/three.module.min.js';
import {createOwnedVehicle} from '../city-game/vehicle.mjs';
import {loadCityGarage} from '../city-game/garage.mjs';
import {buildSculptedCharacter} from '../garage-3d/character-atelier.mjs';
import {disposeSceneResources} from '../garage-3d/scene-resources.mjs';

// The simulation remains the authority for road, obstacles, opponents and finish.
// Geometry is streamed around that distance; no garage data is written here.
window.LastBuyInRace3D={mount(host,chapter,onWin,onLose,options={}){
 const E=window.LastBuyInRaceEngine,s=E.create(chapter),abort=new AbortController();
 let effects,stopped=false,paused=true,finished=false,raf=0,last=0,acc=0,renderer,scene,kart,hero,observer,ready=false;
 const input={},signal=abort.signal;
 host.innerHTML=`<div class="race3d-stage"><div class="race3d-view"></div><div class="race3d-hud"><b data-place>4 / 4</b><span data-lap>Круг 1 / 3</span><button data-pause aria-label="Пауза">Ⅱ</button><small data-zone>Стадион TWO ACES</small><strong data-speed>0 км/ч</strong></div><div class="race3d-notice" aria-live="polite"></div><div class="race3d-meter"><i></i><span>Дрифт → золото → турбо</span></div><div class="race3d-controls"><div class="race3d-steering"><button data-key="left" aria-label="Поворот налево">◀</button><button data-key="right" aria-label="Поворот направо">▶</button><button data-key="down">Тормоз</button></div><div class="race3d-actions"><button data-key="jump">Дрифт / прыжок</button><button data-key="attack">Предмет</button><button data-key="special">Турбо</button></div></div><div class="race3d-dialog"><h2>Забрать своё первым</h2><p data-loading>Выкатываем машинку из гаража…</p><button data-start disabled>Загрузка…</button></div></div>`;
 const $=q=>host.querySelector(q),view=$('.race3d-view'),dialog=$('.race3d-dialog'),start=$('[data-start]'),notice=$('.race3d-notice');
 function clearInput(){for(const k of Object.keys(input))delete input[k];}
 function pause(){if(!ready||finished)return;paused=true;clearInput();dialog.hidden=false;start.textContent='Продолжить';$('[data-loading]').textContent='Билеты ждут на финише. Соперники тоже притормозили.';}
 start.addEventListener('click',()=>{if(!ready)return;paused=false;dialog.hidden=true;last=0;view.querySelector('canvas')?.focus();},{signal});
 $('[data-pause]').addEventListener('click',pause,{signal});
 for(const button of host.querySelectorAll('[data-key]')){
  button.addEventListener('pointerdown',e=>{e.preventDefault();button.setPointerCapture(e.pointerId);input[button.dataset.key]=true;},{signal});
  for(const event of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(event,()=>{input[button.dataset.key]=false;},{signal});
 }
 const keys={ArrowLeft:'left',a:'left',ArrowRight:'right',d:'right',ArrowDown:'down',s:'down',' ':'jump',Shift:'jump',x:'attack',Enter:'attack',z:'special'};
 window.addEventListener('keydown',e=>{if(e.key==='Escape'){pause();return;}if(keys[e.key]){e.preventDefault();input[keys[e.key]]=true;}},{signal});
 window.addEventListener('keyup',e=>{if(keys[e.key]){e.preventDefault();input[keys[e.key]]=false;}},{signal});
 window.addEventListener('blur',pause,{signal});document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();},{signal});
 function stop(){if(stopped)return;stopped=true;abort.abort();cancelAnimationFrame(raf);observer?.disconnect();hero?.dispose();if(scene){scene.background?.dispose?.();disposeSceneResources(scene);}renderer?.dispose();renderer?.forceContextLoss();}
 async function init(){
  const garage=await loadCityGarage();if(stopped)return;s.transport=garage.look.transport||'kart';
  renderer=new T.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.75));renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
  renderer.domElement.tabIndex=0;renderer.domElement.setAttribute('aria-label','Трёхмерная стадионная гонка');view.appendChild(renderer.domElement);view.dataset.garageSource=garage.source;
  scene=new T.Scene();scene.background=new T.Color('#91cde5');scene.fog=new T.Fog('#b8d5da',115,245);
  const skyCanvas=document.createElement('canvas');skyCanvas.width=1024;skyCanvas.height=512;const sky=skyCanvas.getContext('2d'),skyGradient=sky.createLinearGradient(0,0,0,512);skyGradient.addColorStop(0,'#498eb3');skyGradient.addColorStop(.6,'#a7d3df');skyGradient.addColorStop(1,'#e9d9b4');sky.fillStyle=skyGradient;sky.fillRect(0,0,1024,512);for(let i=0;i<18;i++){const x=(i*197)%1024,y=70+(i*47)%170,g=sky.createRadialGradient(x,y,3,x,y,65);g.addColorStop(0,'#fff9e9aa');g.addColorStop(1,'#fff9e900');sky.fillStyle=g;sky.save();sky.translate(x,y);sky.scale(2.4,.5);sky.translate(-x,-y);sky.fillRect(x-70,y-70,140,140);sky.restore();}const skyTexture=new T.CanvasTexture(skyCanvas);skyTexture.colorSpace=T.SRGBColorSpace;scene.background=skyTexture;
  scene.add(new T.HemisphereLight('#d8f4ff','#61705b',1.7));const sun=new T.DirectionalLight('#fff0ce',2.5);sun.position.set(-30,55,-20);scene.add(sun);
  const camera=new T.PerspectiveCamera(58,1,.1,280),box=new T.BoxGeometry(1,1,1),materials=new Map();
  function mat(color){if(!materials.has(color))materials.set(color,new T.MeshStandardMaterial({color,roughness:.72,metalness:.12}));return materials.get(color);}
  function block(parent,color,x,y,z,w,h,d){const m=new T.Mesh(box,mat(color));m.position.set(x,y,z);m.scale.set(w,h,d);parent.add(m);return m;}
  const roundGeo=new T.SphereGeometry(1,10,6);
  function foliage(parent,color,x,y,z,w,h,d){const m=new T.Mesh(roundGeo,mat(color));m.position.set(x,y,z);m.scale.set(w,h,d);parent.add(m);return m;}
  function group(){const g=new T.Group();scene.add(g);return g;}
  // Integrate a single centreline for every road strip and every obstacle.
  const points=[{x:0,z:0,a:0}];for(let d=10;d<=E.LAP*3+6000;d+=10){const p=points.at(-1),a=p.a+E.road(d-5).curve*.0065;points.push({x:p.x+Math.sin(a)*.6,z:p.z+Math.cos(a)*.6,a});}
  function sample(d,lateral=0,tier=0){if(d<0)return {x:-lateral*6,z:d*.06,y:0,a:0};d=Math.max(0,Math.min(points.length*10-11,d));const n=Math.floor(d/10),u=d/10-n,p=points[n],q=points[n+1],a=p.a+(q.a-p.a)*u,r=E.road(d),local=r.local;const hill=r.bridge?Math.sin((local-8500)/1300*Math.PI)*2.8:Math.sin(local*.0017)*1.0+Math.sin(local*.0033)*.45;return {x:p.x+(q.x-p.x)*u-Math.cos(a)*lateral*6,z:p.z+(q.z-p.z)*u+Math.sin(a)*lateral*6,y:hill+E.deckHeight(d,tier),a};}
  function place(g,d,l=0,height=0,tier=0){const p=sample(d,l,tier);g.position.set(p.x,p.y+height,p.z);g.rotation.y=p.a;return p;}
  const strips=Array.from({length:100},()=>{const g=group();const roadPlaceholder=new T.Group();g.add(roadPlaceholder);for(const side of [-1,1]){block(g,'#e65c59',side*7,-.03,0,.45,.14,2.55);block(g,'#f2e2bc',side*6.7,.015,0,.1,.03,2.55);block(g,'#8bbfa6',side*11,-.3,0,7,.3,2.55);}return g;});
  const asphaltCanvas=document.createElement('canvas');asphaltCanvas.width=asphaltCanvas.height=256;
  const ac=asphaltCanvas.getContext('2d');ac.fillStyle='#303b42';ac.fillRect(0,0,256,256);let seed=21;
  for(let n=0;n<15000;n++){seed=(seed*1664525+1013904223)>>>0;const x=seed>>>24;seed=(seed*1664525+1013904223)>>>0;const y=seed>>>24;ac.fillStyle=n%2?'#ffffff09':'#00000012';ac.fillRect(x,y,1,1);}
  const asphalt=new T.CanvasTexture(asphaltCanvas);asphalt.colorSpace=T.SRGBColorSpace;asphalt.wrapS=asphalt.wrapT=T.RepeatWrapping;asphalt.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
  const roadGeo=new T.BufferGeometry(),roadPositions=new Float32Array(101*6),roadUV=new Float32Array(101*4),roadIndices=[];
  for(let i=0;i<101;i++){roadUV.set([0,i*.6,3,i*.6],i*4);if(i<100){const n=i*2;roadIndices.push(n,n+2,n+1,n+1,n+2,n+3);}}
  roadGeo.setAttribute('position',new T.BufferAttribute(roadPositions,3));roadGeo.setAttribute('uv',new T.BufferAttribute(roadUV,2));roadGeo.setIndex(roadIndices);
  const roadMesh=new T.Mesh(roadGeo,new T.MeshStandardMaterial({map:asphalt,roughness:.93,side:T.DoubleSide}));roadMesh.frustumCulled=false;scene.add(roadMesh);
  const upperRoutes=createUpperRoutes(scene,E,sample,block,asphalt);
  const markings=Array.from({length:50},()=>{const g=group();for(const side of [-1,1])block(g,'#eee7cc',side*2.35,.025,0,.12,.025,1.7);return g;});
  const scenery=Array.from({length:32},(_,i)=>{const g=group(),side=i%2?-1:1;const stadium=new T.Group(),city=new T.Group(),bridge=new T.Group(),plaza=new T.Group();g.add(stadium,city,bridge,plaza);
   block(stadium,'#577b62',side*26,-.5,0,37,.5,24.2);block(stadium,'#aab4a5',side*15,-.2,0,14,.3,24.2);
   block(stadium,'#cfaf65',side*19,5.2,0,.08,2,.08);const flag=block(stadium,i%2?'#c45d48':'#1f6978',side*19+.5,5.8,0,1,.6,.04);flag.rotation.y=.3;
   for(let row=0;row<4;row++){block(stadium,row%2?'#237488':'#e0aa62',side*(11+row*1.5),row*.75+.4,0,2,.6,9);for(let seat=0;seat<7;seat++)block(stadium,['#e3ca87','#153c58','#e86e60'][(seat+i)%3],side*(11+row*1.5),row*.75+.95,-4+seat*1.25,.45,.45,.45);}
   for(let row=0;row<4;row+=2)for(let n=0;n<7;n+=2){const x=side*(11+row*1.5),z=-4+n*1.25;
    block(stadium,['#d9d1ae','#3c5266','#bc6154','#537269'][(n+row+i)%4],x,row*.75+1.18,z,.3,.45,.26);
    foliage(stadium,['#c89570','#e3b98e','#8d624d'][(n+i)%3],x,row*.75+1.54,z,.14,.17,.14);
   }
   for(const z of [-3,3]){block(stadium,'#6e5742',side*24,2,z,.35,4,.35);foliage(stadium,i%2?'#376b50':'#528357',side*24,4,z,2,2.4,2);}
   block(stadium,'#142f42',side*16,4.6,0,6,.25,10);block(stadium,'#d0a65c',side*13,4.5,0,.18,.4,10);
   for(const z of [-4,4])block(stadium,'#344e59',side*18,2.3,z,.18,4.6,.18);
   for(const z of [-4,0,4]){block(stadium,'#a0b6bb',side*8.1,.7,z,.12,1.4,.12);}
   block(stadium,'#a0b6bb',side*8.1,1.2,0,.12,.12,10);block(stadium,'#284d60',side*8.1,.45,0,.15,.7,10);
   block(stadium,'#d4e8e4',side*14,5.2,0,.2,7,.2);block(stadium,'#fff3c4',side*14,8.5,0,3,.5,.4);
   block(city,'#b1b7a5',side*17,-.4,0,18,.4,24.2);
   block(city,['#f1cfad','#71b8bb','#bda7cb'][i%3],side*15,4+i%5,0,6,8+i%5*2,8);for(let row=0;row<5;row++)for(let col=0;col<3;col++)block(city,'#236a83',side*11.95,row*1.5+1,col*2-2,.04,.7,1.0);
   block(city,'#d0c5a6',side*9,-.05,0,3,.18,10);
   block(city,'#283c49',side*8.3,2.6,0,.12,5.2,.12);block(city,'#f6dc9b',side*8.3,5.2,0,.7,.18,.7);
   block(city,'#71513b',side*9.1,.6,-2.5,1.4,.16,.5);for(const z of [-2.7,-2.3])block(city,'#263b44',side*9.1,.3,z,.12,.6,.12);
   block(city,'#d9d3b5',side*15,8+i%5*2+.2,0,6.4,.35,8.4);
   for(const z of [-3,0,3]){block(city,'#e2d5b9',side*11.8,2.5,z,.25,.25,2.2);const awning=block(city,i%2?'#a95648':'#397a78',side*11.3,2.7,z,1.2,.15,2.2);awning.rotation.z=side*.12;}
   if(i%4===0){const c=document.createElement('canvas');c.width=512;c.height=128;const ctx=c.getContext('2d');ctx.fillStyle='#133b47';ctx.fillRect(0,0,512,128);ctx.strokeStyle='#d3ab5f';ctx.lineWidth=7;ctx.strokeRect(6,6,500,116);ctx.fillStyle='#f4e1ad';ctx.font='bold 49px Arial';ctx.textAlign='center';ctx.fillText(i%8?'POKER21':'TWO ACES',256,81);const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;
    for(const parent of [stadium,city]){const sign=new T.Mesh(new T.PlaneGeometry(6,1.5),new T.MeshBasicMaterial({map:tx,side:T.DoubleSide}));sign.position.set(side*8.03,parent===city?3.8:.8,0);sign.rotation.y=-side*Math.PI/2;parent.add(sign);}
   }
   // Palm trees on the waterfront.
   block(city,'#8d7252',side*9.5,2.3,4,.3,4.6,.3);for(let leaf=0;leaf<5;leaf++){const m=foliage(city,leaf%2?'#427854':'#315f48',side*9.5,4.7,4,.35,.18,2.2);m.rotation.y=leaf*Math.PI/2.5;m.rotation.x=.18;}
   block(bridge,'#dce4ce',side*7.3,.6,0,.25,1.2,9);block(bridge,'#e7c486',side*7.3,1.3,0,.4,.15,9);block(bridge,'#375c70',side*7.3,-3.2,0,.7,6,1);
   block(plaza,'#c7baa1',side*13,-.1,0,11,.3,24.2);block(plaza,'#314c52',side*11,.35,0,2,.7,3);foliage(plaza,'#487357',side*11,1,0,1,.8,1.5);block(plaza,'#304956',side*8.5,2.8,0,.15,5.6,.15);block(plaza,'#f3e1b3',side*8.5,5.6,0,.9,.15,.9);
   return {g,stadium,city,bridge,plaza};});
  const waterCanvas=document.createElement('canvas');waterCanvas.width=waterCanvas.height=256;const wc=waterCanvas.getContext('2d');wc.fillStyle='#277c91';wc.fillRect(0,0,256,256);for(let n=0;n<80;n++){wc.strokeStyle=n%3?'#80bcb52b':'#153f6022';wc.lineWidth=1;wc.beginPath();const y=n*3.2;for(let x=0;x<=256;x+=4){const yy=y+Math.sin(x*.06+n)*2;x?wc.lineTo(x,yy):wc.moveTo(x,yy);}wc.stroke();}const waterTexture=new T.CanvasTexture(waterCanvas);waterTexture.wrapS=waterTexture.wrapT=T.RepeatWrapping;waterTexture.repeat.set(26,26);waterTexture.colorSpace=T.SRGBColorSpace;const sea=new T.Mesh(new T.PlaneGeometry(550,550),new T.MeshStandardMaterial({map:waterTexture,roughness:.36,metalness:.3}));sea.rotation.x=-Math.PI/2;sea.position.y=-4;scene.add(sea);
  const finish=group();block(finish,'#123d50',-7.6,3.8,0,.5,7.6,.5);block(finish,'#123d50',7.6,3.8,0,.5,7.6,.5);block(finish,'#d9ac52',0,7.5,0,16,1,.7);
  const labelCanvas=document.createElement('canvas');labelCanvas.width=1024;labelCanvas.height=128;const lc=labelCanvas.getContext('2d');lc.fillStyle='#102c40';lc.fillRect(0,0,1024,128);lc.fillStyle='#ffe7a9';lc.font='bold 72px Arial';lc.textAlign='center';lc.fillText('TWO ACES · GRAND PRIX',512,89);const labelTexture=new T.CanvasTexture(labelCanvas);labelTexture.colorSpace=T.SRGBColorSpace;const label=new T.Mesh(new T.PlaneGeometry(14,.95),new T.MeshBasicMaterial({map:labelTexture,side:T.DoubleSide}));label.position.set(0,7.5,-.4);label.rotation.y=Math.PI;finish.add(label);
  const tunnel=group();for(const z of [-8,0,8]){block(tunnel,'#243b53',-7.5,3,z,.5,6,.6);block(tunnel,'#243b53',7.5,3,z,.5,6,.6);block(tunnel,'#243b53',0,6,z,15.5,.5,.6);block(tunnel,'#61dce6',0,5.7,z,14,.08,.1);}
  const exitDistance=E.LAP*2+4300,exitGate=group();exitGate.name='Stadium exit arch';
  const archShape=new T.Shape();archShape.moveTo(-12,0);archShape.lineTo(-12,6);archShape.quadraticCurveTo(-12,10.8,0,10.8);archShape.quadraticCurveTo(12,10.8,12,6);archShape.lineTo(12,0);archShape.lineTo(9.3,0);archShape.lineTo(9.3,5.8);archShape.quadraticCurveTo(9.3,8.5,0,8.5);archShape.quadraticCurveTo(-9.3,8.5,-9.3,5.8);archShape.lineTo(-9.3,0);archShape.closePath();
  const arch=new T.Mesh(new T.ExtrudeGeometry(archShape,{depth:2,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.1,bevelThickness:.1,curveSegments:24}),mat('#d9c9a6'));arch.position.z=-1;exitGate.add(arch);
  for(const side of [-1,1]){block(exitGate,'#35525c',side*10.7,2.8,0,2.5,5.6,2.4);block(exitGate,'#bdab88',side*16,3.2,0,12,6.4,2);for(let n=0;n<5;n++)block(exitGate,'#203f4a',side*(11+n*2.3),4, -1.04,.8,1.5,.05);block(exitGate,'#e7bb62',side*9.38,3.2,-1.2,.16,6.4,.1);}
  const exitLabelCanvas=document.createElement('canvas');exitLabelCanvas.width=1024;exitLabelCanvas.height=256;const ec=exitLabelCanvas.getContext('2d');ec.fillStyle='#153944';ec.fillRect(0,0,1024,256);ec.strokeStyle='#d9b667';ec.lineWidth=10;ec.strokeRect(8,8,1008,240);ec.textAlign='center';ec.fillStyle='#f9e8be';ec.font='bold 88px Arial';ec.fillText('ВЫЕЗД В ГОРОД',512,116);ec.font='40px Arial';ec.fillText('TWO ACES   ↓   НАБЕРЕЖНАЯ',512,193);const exitTexture=new T.CanvasTexture(exitLabelCanvas);exitTexture.colorSpace=T.SRGBColorSpace;
  const exitSign=new T.Mesh(new T.PlaneGeometry(9,2.2),new T.MeshBasicMaterial({map:exitTexture,side:T.DoubleSide}));exitSign.position.set(0,9.3,-1.13);exitSign.rotation.y=Math.PI;exitGate.add(exitSign);
  const exitApproach=Array.from({length:10},()=>{const g=group();for(const side of [-1,1]){block(g,'#345565',side*9.5,.45,0,.3,.9,6.1);block(g,'#e3c37d',side*9.5,.95,0,.32,.12,6.1);}return g;});
  const propKinds=['box','chips','pad','ramp','barrier','oil','gate','wet','trap','rocket','shield','nitro'],buildRoadProp=createRoadPropFactory(block,mat);
  function prop(){const g=group(),types={};for(const kind of propKinds){const part=buildRoadProp(kind);part.visible=false;types[kind]=part;g.add(part);}return {g,types};}

  const props=Array.from({length:40},prop);
  kart=await createOwnedVehicle(garage.look);if(stopped){kart.dispose();return;}scene.add(kart.root);view.dataset.garageLook=JSON.stringify(garage.look);
  if(!kart.closedCabin){
  hero=await buildSculptedCharacter(window.PokerGarage,garage.look);if(stopped){hero.dispose();return;}hero.root.scale.setScalar(kart.seat.scale);hero.root.position.set(0,kart.seat.height,kart.seat.forward);kart.root.add(hero.root);for(const side of ['left','right']){const b=hero.rig.bones;const standing=['scooter','hoverboard'].includes(kart.riderPose);b[side+'Hip'].rotation.x=standing?-.08:kart.riderPose==='bicycle'?-.8:-1.3;b[side+'Knee'].rotation.x=standing?.16:kart.riderPose==='bicycle'?1.15:1.45;b[side+'Shoulder'].rotation.x=kart.riderPose==='hoverboard'?-.15:kart.riderPose?-.55:-1.05;b[side+'Elbow'].rotation.x=standing?-.15:-.5;}hero.root.updateMatrixWorld(true);hero.rig.skeleton.update();
  }
  const shadow=new T.Mesh(new T.CircleGeometry(1.6,24),new T.MeshBasicMaterial({color:0x071725,transparent:true,opacity:.25,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.scale.set(kart.riderPose?.4:1,kart.riderPose?.7:1.6,1);scene.add(shadow);
  const shieldAura=new T.Mesh(new T.SphereGeometry(1,20,12),new T.MeshBasicMaterial({color:0x64ddf3,transparent:true,opacity:.12,depthWrite:false}));shieldAura.scale.set(kart.riderPose?1.1:1.9,kart.riderPose?1.5:1.6,kart.riderPose?1.2:2.5);shieldAura.visible=false;scene.add(shieldAura);
  effects=createRaceEffects(scene);
  const rivalArt=s.rivals.map((r,i)=>createRivalArt(i,r.name)),rivals=rivalArt.map(r=>{scene.add(r.root);return r.root;});

  // Batch the streamed architecture and road furniture into one draw call.
  const geometryBatches=[box,roundGeo].map(geometry=>{const meshes=[];scene.traverse(o=>{if(o.isMesh&&o.geometry===geometry){meshes.push(o);o.visible=false;}});const batch=new T.InstancedMesh(geometry,new T.MeshStandardMaterial({color:0xffffff,roughness:.8,metalness:.08}),meshes.length);batch.frustumCulled=false;batch.instanceMatrix.setUsage(T.DynamicDrawUsage);scene.add(batch);return {meshes,batch};});
  // Pool repeated road objects by geometry/material instead of drawing each chip separately.
  const propBuckets=new Map();for(const prop of props)prop.g.traverse(mesh=>{if(!mesh.isMesh||mesh.geometry===box)return;const key=mesh.geometry.type+JSON.stringify(mesh.geometry.parameters||{})+mesh.material.uuid;if(!propBuckets.has(key))propBuckets.set(key,[]);propBuckets.get(key).push(mesh);mesh.visible=false;});
  for(const meshes of propBuckets.values()){const material=meshes[0].material.clone();material.color?.set(0xffffff);const batch=new T.InstancedMesh(meshes[0].geometry,material,meshes.length);batch.frustumCulled=false;batch.instanceMatrix.setUsage(T.DynamicDrawUsage);scene.add(batch);geometryBatches.push({meshes,batch});}
  function batchBoxes(){scene.updateMatrixWorld(true);for(const {meshes,batch}of geometryBatches){let count=0;for(const mesh of meshes){let parent=mesh.parent,visible=true;while(parent&&parent!==scene){if(!parent.visible){visible=false;break;}parent=parent.parent;}if(!visible)continue;batch.setMatrixAt(count,mesh.matrixWorld);batch.setColorAt(count,mesh.material.color);count++;}batch.count=count;batch.visible=count>0;batch.instanceMatrix.needsUpdate=true;if(batch.instanceColor)batch.instanceColor.needsUpdate=true;}}

  function resize(){const r=view.getBoundingClientRect();renderer.setSize(r.width,r.height);camera.aspect=r.width/Math.max(1,r.height);camera.updateProjectionMatrix();}observer=new ResizeObserver(resize);observer.observe(view);resize();
  function draw(){upperRoutes.update(s.distance);const base=Math.floor(s.distance/40)*40;
   for(let i=0;i<=100;i++){const d=base+(i-6)*40;for(let side=0;side<2;side++){const p=sample(d,side?7/6:-7/6);roadPositions.set([p.x,p.y-.01,p.z],i*6+side*3);}}roadGeo.attributes.position.needsUpdate=true;roadGeo.computeVertexNormals();
   markings.forEach((g,i)=>{const d=Math.floor(s.distance/80)*80+(i-3)*80;g.visible=d>=0;place(g,d,0);});

   for(let i=0;i<strips.length;i++){const d=base+(i-6)*40,g=strips[i];g.visible=d>=-240;if(!g.visible)continue;const a=sample(d),b=sample(d+40);g.position.set((a.x+b.x)/2,(a.y+b.y)/2,(a.z+b.z)/2);g.rotation.set(-Math.atan2(b.y-a.y,2.4),a.a,0);g.children[1].material=mat(i%2?'#f1e2bd':'#e65c59');g.children[4].material=g.children[1].material;}
   for(let i=0;i<scenery.length;i++){const d=Math.floor(s.distance/200)*200+(i-2)*200,part=scenery[i],r=E.road(d);place(part.g,d);part.g.visible=d>=0&&d<s.distance+3800;part.stadium.visible=d<exitDistance-250;part.city.visible=d>=exitDistance+650&&!r.bridge;part.plaza.visible=d>=exitDistance-250&&d<exitDistance+650;part.bridge.visible=r.bridge;}
   place(exitGate,exitDistance);exitGate.visible=Math.abs(s.distance-exitDistance)<4000;exitApproach.forEach((g,i)=>{place(g,exitDistance-500+i*100);g.visible=Math.abs(s.distance-exitDistance)<4000;});
   const lap=Math.floor(s.distance/E.LAP);place(finish,Math.min(3,lap+1)*E.LAP);place(tunnel,lap*E.LAP+5650);tunnel.visible=!E.road(s.distance).city;
   sea.position.set(sample(s.distance).x,-4,sample(s.distance).z);waterTexture.offset.x=s.tick*.0001;
   const visible=[...E.trackObjects(s.distance,s.tick).filter(o=>!s.used.has(o.key)),...s.traps.filter(o=>!o.used).map(o=>({...o,kind:'trap'})),...s.enemyShots.map(o=>({...o,kind:'rocket'}))].filter(o=>o.distance>s.distance-100&&o.distance<s.distance+3800);
   props.forEach((p,i)=>{const o=visible[i];p.g.visible=!!o;if(!o)return;for(const [k,m]of Object.entries(p.types))m.visible=k===o.kind;place(p.g,o.distance,o.lateral,0,o.tier||0);if(['box','shield','nitro'].includes(o.kind))p.types[o.kind].position.y=Math.sin(s.tick*.04+i)*.08;});
   kart.animate?.(s.tick*1000/60);
   const p=place(kart.root,s.distance,s.lateral,s.air?Math.sin(s.air/s.airDuration*Math.PI)*3.1+1.1*s.air/s.airDuration:E.rampHeight(s.distance,s.lateral,s.tier,s.tick),s.tier);const inclineAhead=sample(s.distance+10,s.lateral,s.tier),inclineBehind=sample(s.distance-10,s.lateral,s.tier);kart.root.rotation.x=-Math.atan2(inclineAhead.y-inclineBehind.y+(s.air?0:E.rampHeight(s.distance+10,s.lateral,s.tier,s.tick)-E.rampHeight(s.distance-10,s.lateral,s.tier,s.tick)),1.2);kart.root.rotation.y+=s.spin?s.spin*.22:s.drift?-s.driftSide*.26:-s.steering*.08;kart.root.rotation.z=-s.steering*.025;shadow.position.set(p.x,p.y+.03,p.z);shadow.material.opacity=s.air?.1:.25;for(const w of kart.wheels)w.rotation.z=-s.distance*.04;for(const w of kart.frontWheels)w.rotation.y=-s.steering*.3;
   rivals.forEach((g,i)=>{const r=s.rivals[i];g.visible=Math.abs(r.distance-s.distance)<3800;place(g,r.distance,r.lateral,r.air?Math.sin(r.air/r.airDuration*Math.PI)*3.1+1.1*r.air/r.airDuration:E.rampHeight(r.distance,r.lateral,r.tier||0,s.tick),r.tier||0);const ra=sample(r.distance+10,r.lateral,r.tier),rb=sample(r.distance-10,r.lateral,r.tier);g.rotation.x=-Math.atan2(ra.y-rb.y,1.2);rivalArt[i].update(r.distance,Math.sin(r.distance*.0015+i*2),s.tick,r.stun>0);});
   const cameraBack=kart.riderPose?7.5:11;camera.position.set(p.x-Math.sin(p.a)*cameraBack,p.y+(kart.riderPose?5:7.3),p.z-Math.cos(p.a)*cameraBack);const look=sample(s.distance+(kart.riderPose?95:140),s.lateral*.3,s.tier);camera.lookAt(look.x,look.y+1,look.z);
   shieldAura.visible=!!(s.shield||s.shieldImpact);shieldAura.position.set(p.x,p.y+.8,p.z);shieldAura.material.opacity=s.shieldImpact?.3:.1+Math.sin(s.tick*.06)*.025;
   effects.update(s,p,!!kart.riderPose);const targetFov=58+(!kart.riderPose&&s.boost?4:0);if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&Math.abs(camera.fov-targetFov)>.02){camera.fov+=(targetFov-camera.fov)*.08;camera.updateProjectionMatrix();}
   batchBoxes();renderer.render(scene,camera);
   $('[data-place]').textContent=s.position+' / 4';$('[data-lap]').textContent='Круг '+s.lap+' / 3 · ♠ '+s.picked;
   $('[data-speed]').textContent=Math.round(s.speed*21)+' км/ч';$('[data-zone]').textContent=s.tier?'Верхний путь · щит и разгон':E.road(s.distance).name;
   const nextDeck=E.overpasses.find(d=>d.start>s.distance&&d.start-s.distance<550);notice.textContent=s.countdown?String(Math.ceil(s.countdown/60)):s.noticeTicks?s.notice:nextDeck?((nextDeck.center<0?'Слева':'Справа')+' ↑ верхний путь: щит и разгон'):s.hazardWarning?({barrier:'Отбойник',gate:'Подвижный блок',oil:'Масло',wet:'Лужа'}[s.hazardWarning.kind]+' впереди · '+(s.hazardWarning.lateral<-.2?'держись правее':s.hazardWarning.lateral>.2?'держись левее':'обходи сбоку')):'';
   const meter=$('.race3d-meter i');meter.style.width=Math.min(100,s.driftMeter)+'%';meter.style.background=s.driftMeter>=60?'#ffe184':'#61d9e8';$('[data-key=attack]').textContent=s.itemRoll?'…':({rocket:'Ракета',shield:'Щит',turbo:'Разгон',trap:'Ловушка'}[s.item]|| (s.shield?'Запустить щит':'Нет предмета'));
   view.dataset.distance=Math.round(s.distance);view.dataset.routeZone=s.routeZone;
  }
  ready=true;start.disabled=false;start.textContent='На старт';$('[data-loading]').textContent=(E.mobility[s.transport]?'Похоже, гонять на '+({bicycle:'велике',scooter:'самокате',hoverboard:'скейте'}[s.transport])+' против машин — идея так себе. Вам нужна машина для гонки — выберите её в гараже. А пока можно прокатиться: до '+Math.round(E.mobility[s.transport].max*21)+' км/ч. ':garage.source==='preview'?'Пробный заезд на клубном карте. ':'Твоя машинка из гаража готова. ')+'Три круга за коробку билетов. Стрелки — руль, Shift — дрифт, Z — турбо в золотой зоне, X — предмет. Фишки усиливают предметы, голубой щит защищает, золотой заряд ускоряет. Стрелки на асфальте — разгон. На трамплине удерживай прыжок. Верхний объезд: займи полосу под знаком ↑ до подъёма; нижний проезд остаётся открыт.';
  renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();pause();ready=false;start.textContent='Перезагрузить гонку';start.disabled=false;$('[data-loading]').textContent='3D-сцена потеряла связь с видеокартой. Перезапусти заезд.';start.onclick=()=>{stop();window.LastBuyInRace3D.mount(host,chapter,onWin,onLose,options);};},{signal});
  // Read-only diagnostics used by the rendered route check.
  view.raceSnapshot=()=>({distance:s.distance,world:kart.root.position.toArray(),tier:s.tier,deckHeight:E.deckHeight(s.distance,s.tier),upperRoutes:upperRoutes.snapshot(),exit:{distance:exitDistance,visible:exitGate.visible,passed:s.distance>exitDistance,opening:18.6},effects:effects.snapshot(),look:{...garage.look},source:garage.source,closedCabin:!!kart.closedCabin,vehicle:garage.look.transport||'kart',speedLimit:E.mobility[s.transport]?.max||null,screenX:new T.Vector3(kart.root.position.x,kart.root.position.y,kart.root.position.z).project(camera).x,triangles:renderer.info.render.triangles,drawCalls:renderer.info.render.calls});
  function frame(time){if(stopped)return;const delta=last?Math.min(100,time-last):0;last=time;if(!paused&&!finished){acc+=delta;while(acc>=1000/60){E.step(s,input);acc-=1000/60;if(s.won||s.lost){finished=true;clearInput();if(s.won)onWin({chapter,score:s.score,hits:s.hits});else onLose(()=>{E.revive(s);effects.reset();finished=false;paused=true;dialog.hidden=false;start.textContent='Повторить заезд';last=0;acc=0;});break;}}}else acc=0;if(stopped)return;draw();raf=requestAnimationFrame(frame);}raf=requestAnimationFrame(frame);
 }
 init().catch(error=>{if(stopped)return;ready=false;$('[data-loading]').textContent=error.userMessage||'Не удалось открыть 3D-гонку. Повтори загрузку.';start.textContent='Повторить';start.disabled=false;start.onclick=()=>{stop();window.LastBuyInRace3D.mount(host,chapter,onWin,onLose,options);};console.error(error);});
 return {stop};
}};
