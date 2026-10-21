import * as T from '../../vendor/three/three.module.min.js';
import {createOwnedKart} from '../city-game/vehicle.mjs';
import {loadCityGarage} from '../city-game/garage.mjs';
import {buildSculptedCharacter} from '../garage-3d/character-atelier.mjs';
import {disposeSceneResources} from '../garage-3d/scene-resources.mjs';

// The simulation remains the authority for road, obstacles, opponents and finish.
// Geometry is streamed around that distance; no garage data is written here.
window.LastBuyInRace3D={mount(host,chapter,onWin,onLose,options={}){
 const E=window.LastBuyInRaceEngine,s=E.create(chapter),abort=new AbortController();
 let stopped=false,paused=true,finished=false,raf=0,last=0,acc=0,renderer,scene,kart,hero,observer,ready=false;
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
 function stop(){if(stopped)return;stopped=true;abort.abort();cancelAnimationFrame(raf);observer?.disconnect();hero?.dispose();if(scene)disposeSceneResources(scene);renderer?.dispose();renderer?.forceContextLoss();}
 async function init(){
  const garage=await loadCityGarage();if(stopped)return;
  renderer=new T.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.75));renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
  renderer.domElement.tabIndex=0;renderer.domElement.setAttribute('aria-label','Трёхмерная стадионная гонка');view.appendChild(renderer.domElement);view.dataset.garageSource=garage.source;
  scene=new T.Scene();scene.background=new T.Color('#91cde5');scene.fog=new T.Fog('#91cde5',100,245);
  scene.add(new T.HemisphereLight('#d8f4ff','#61705b',2.4));const sun=new T.DirectionalLight('#fff0ce',3.1);sun.position.set(-30,55,-20);scene.add(sun);
  const camera=new T.PerspectiveCamera(58,1,.1,280),box=new T.BoxGeometry(1,1,1),materials=new Map();
  function mat(color){if(!materials.has(color))materials.set(color,new T.MeshStandardMaterial({color,roughness:.72,metalness:.12}));return materials.get(color);}
  function block(parent,color,x,y,z,w,h,d){const m=new T.Mesh(box,mat(color));m.position.set(x,y,z);m.scale.set(w,h,d);parent.add(m);return m;}
  function group(){const g=new T.Group();scene.add(g);return g;}
  // Integrate a single centreline for every road strip and every obstacle.
  const points=[{x:0,z:0,a:0}];for(let d=10;d<=E.LAP*3+6000;d+=10){const p=points.at(-1),a=p.a+E.road(d-5).curve*.0065;points.push({x:p.x+Math.sin(a)*.6,z:p.z+Math.cos(a)*.6,a});}
  function sample(d,lateral=0){d=Math.max(0,Math.min(points.length*10-11,d));const n=Math.floor(d/10),u=d/10-n,p=points[n],q=points[n+1],a=p.a+(q.a-p.a)*u,r=E.road(d),local=r.local;const hill=r.bridge?Math.sin((local-8500)/1300*Math.PI)*2.8:Math.sin(local*.0017)*1.0+Math.sin(local*.0033)*.45;return {x:p.x+(q.x-p.x)*u+Math.cos(a)*lateral*6,z:p.z+(q.z-p.z)*u-Math.sin(a)*lateral*6,y:hill,a};}
  function place(g,d,l=0,height=0){const p=sample(d,l);g.position.set(p.x,p.y+height,p.z);g.rotation.y=p.a;return p;}
  const strips=Array.from({length:100},()=>{const g=group();block(g,'#314550',0,-.16,0,14,.3,2.55);for(const side of [-1,1]){block(g,'#e65c59',side*7,-.03,0,.45,.14,2.55);block(g,'#f2e2bc',side*6.7,.015,0,.1,.03,2.55);block(g,'#8bbfa6',side*11,-.3,0,7,.3,2.55);}return g;});
  const scenery=Array.from({length:32},(_,i)=>{const g=group(),side=i%2?-1:1;const stadium=new T.Group(),city=new T.Group(),bridge=new T.Group();g.add(stadium,city,bridge);
   for(let row=0;row<4;row++){block(stadium,row%2?'#237488':'#e0aa62',side*(11+row*1.5),row*.75+.4,0,2,.6,9);for(let seat=0;seat<7;seat++)block(stadium,['#e3ca87','#153c58','#e86e60'][(seat+i)%3],side*(11+row*1.5),row*.75+.95,-4+seat*1.25,.45,.45,.45);}
   block(stadium,'#d4e8e4',side*14,5.2,0,.2,7,.2);block(stadium,'#fff3c4',side*14,8.5,0,3,.5,.4);
   block(city,['#f1cfad','#71b8bb','#bda7cb'][i%3],side*15,4+i%5,0,6,8+i%5*2,8);for(let row=0;row<5;row++)for(let col=0;col<3;col++)block(city,'#236a83',side*11.95,row*1.5+1,col*2-2,.04,.7,1.0);
   // Palm trees on the waterfront.
   block(city,'#8d7252',side*9.5,2.3,4,.3,4.6,.3);for(let leaf=0;leaf<5;leaf++){const m=block(city,'#387d65',side*9.5,4.7,4,.5,.12,4);m.rotation.y=leaf*Math.PI/2.5;}
   block(bridge,'#dce4ce',side*7.3,.6,0,.25,1.2,9);block(bridge,'#e7c486',side*7.3,1.3,0,.4,.15,9);block(bridge,'#375c70',side*7.3,-3.2,0,.7,6,1);
   return {g,stadium,city,bridge};});
  const sea=block(scene,'#288fa9',0,-4,0,550,.1,550);
  const finish=group();block(finish,'#123d50',-7.6,3.8,0,.5,7.6,.5);block(finish,'#123d50',7.6,3.8,0,.5,7.6,.5);block(finish,'#d9ac52',0,7.5,0,16,1,.7);
  const labelCanvas=document.createElement('canvas');labelCanvas.width=1024;labelCanvas.height=128;const lc=labelCanvas.getContext('2d');lc.fillStyle='#102c40';lc.fillRect(0,0,1024,128);lc.fillStyle='#ffe7a9';lc.font='bold 72px Arial';lc.textAlign='center';lc.fillText('TWO ACES · GRAND PRIX',512,89);const labelTexture=new T.CanvasTexture(labelCanvas);labelTexture.colorSpace=T.SRGBColorSpace;const label=new T.Mesh(new T.PlaneGeometry(14,.95),new T.MeshBasicMaterial({map:labelTexture,side:T.DoubleSide}));label.position.set(0,7.5,-.4);label.rotation.y=Math.PI;finish.add(label);
  const tunnel=group();for(const z of [-8,0,8]){block(tunnel,'#243b53',-7.5,3,z,.5,6,.6);block(tunnel,'#243b53',7.5,3,z,.5,6,.6);block(tunnel,'#243b53',0,6,z,15.5,.5,.6);block(tunnel,'#61dce6',0,5.7,z,14,.08,.1);}
  const propKinds=['box','chips','pad','ramp','barrier','oil','gate','wet','trap','rocket'];
  function prop(){const g=group(),types={};for(const kind of propKinds){const part=new T.Group();part.visible=false;types[kind]=part;g.add(part);if(kind==='box'){const m=block(part,'#ab78e1',0,.85,0,1.25,1.25,1.25);m.rotation.y=.6;block(part,'#ffda75',0,1.55,0,.3,.25,.3);}else if(kind==='chips'){for(let i=0;i<3;i++){const m=new T.Mesh(new T.CylinderGeometry(.5,.5,.12,16),mat('#e6b95d'));m.position.set(0,.4+i*.15,0);part.add(m);}}else if(kind==='ramp'){const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute([-2,0,-2,2,0,-2,-2,1.1,2,2,0,-2,2,1.1,2,-2,1.1,2],3));geo.computeVertexNormals();part.add(new T.Mesh(geo,new T.MeshStandardMaterial({color:'#eba04d',side:T.DoubleSide})));}else if(kind==='pad'){block(part,'#40cedb',0,.05,0,4,.1,3);for(let j=-1;j<=1;j++)block(part,'#e1ffec',0,.12,j,2,.02,.12);}else if(kind==='oil'||kind==='wet'){const m=new T.Mesh(new T.CircleGeometry(kind==='wet'?2.3:1.6,24),new T.MeshStandardMaterial({color:kind==='wet'?'#5daec5':'#111c37',metalness:.8,roughness:.12,transparent:true,opacity:.85}));m.rotation.x=-Math.PI/2;m.position.y=.04;part.add(m);}else if(kind==='gate'){block(part,'#e78350',0,.9,0,2.9,1.8,.4);for(let i=-1;i<=1;i++)block(part,'#ffefbc',i,.95,-.23,.3,1.6,.05);}else if(kind==='rocket'){block(part,'#ed7851',0,.8,0,.4,.4,1.4);}else{block(part,'#e26759',0,.5,0,kind==='trap'?1:2.8,1,.65);for(let i=-1;i<=1;i++)block(part,'#ffdf8b',i*.8,.6,-.34,.3,.5,.03);}}return {g,types};}
  const props=Array.from({length:60},prop);
  kart=createOwnedKart(garage.look);scene.add(kart.root);view.dataset.garageLook=JSON.stringify(garage.look);
  hero=await buildSculptedCharacter(window.PokerGarage,garage.look);if(stopped){hero.dispose();return;}hero.root.scale.setScalar(kart.seat.scale);hero.root.position.set(0,kart.seat.height,kart.seat.forward);kart.root.add(hero.root);for(const side of ['left','right']){const b=hero.rig.bones;b[side+'Hip'].rotation.x=-1.3;b[side+'Knee'].rotation.x=1.45;b[side+'Shoulder'].rotation.x=-1.05;b[side+'Elbow'].rotation.x=-.5;}hero.root.updateMatrixWorld(true);hero.rig.skeleton.update();
  const shadow=new T.Mesh(new T.CircleGeometry(1.6,24),new T.MeshBasicMaterial({color:0x071725,transparent:true,opacity:.25,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.scale.set(1,1.6,1);scene.add(shadow);
  const rivals=s.rivals.map((r,i)=>{const g=group(),color=['#d96b5f','#bba4da','#eac75d'][i];
   function round(c,x,y,z,sx,sy,sz){const m=new T.Mesh(new T.SphereGeometry(1,16,10),mat(c));m.position.set(x,y,z);m.scale.set(sx,sy,sz);g.add(m);return m;}
   round(color,0,.65,0,1.15,.36,1.9);round('#142d3c',0,.92,-.3,.65,.12,.95);block(g,'#e1c477',0,.35,0,2.2,.12,3.3);
   block(g,'#1a2d37',0,1.15,-1.55,2.6,.16,.4);for(const side of [-1,1]){block(g,'#d9c58e',side*.8,.9,-1.55,.12,.6,.12);round('#fff4c8',side*.65,.7,1.56,.2,.14,.12);round('#d3655e',side*.65,.7,-1.66,.18,.1,.08);}
   for(const side of [-1,1])for(const z of [-1.2,1.2]){const wheel=new T.Mesh(new T.CylinderGeometry(.47,.47,.4,20),mat('#17232d'));wheel.rotation.z=Math.PI/2;wheel.position.set(side*1.15,.47,z);g.add(wheel);const hub=new T.Mesh(new T.CylinderGeometry(.25,.25,.42,12),mat('#b8cbcd'));hub.rotation.z=Math.PI/2;hub.position.copy(wheel.position);g.add(hub);}
   round('#213e4d',0,1.25,-.45,.4,.45,.3);round(color,0,1.87,-.45,.43,.45,.42);round('#152b3c',0,1.91,-.1,.35,.16,.12);for(const side of [-1,1]){const arm=round('#213e4d',side*.38,1.3,-.04,.12,.14,.4);arm.rotation.x=-.3;}const steering=new T.Mesh(new T.TorusGeometry(.3,.045,6,16),mat('#17232d'));steering.position.set(0,1.21,.28);steering.rotation.x=-.6;g.add(steering);return g;});

  // Batch the streamed architecture and road furniture into one draw call.
  const boxes=[];scene.traverse(o=>{if(o.isMesh&&o.geometry===box){boxes.push(o);o.visible=false;}});
  const instanced=new T.InstancedMesh(box,new T.MeshStandardMaterial({color:0xffffff,roughness:.72,metalness:.12}),boxes.length);instanced.frustumCulled=false;instanced.instanceMatrix.setUsage(T.DynamicDrawUsage);scene.add(instanced);
  function batchBoxes(){scene.updateMatrixWorld(true);let count=0;for(const mesh of boxes){let parent=mesh.parent,visible=true;while(parent&&parent!==scene){if(!parent.visible){visible=false;break;}parent=parent.parent;}if(!visible)continue;instanced.setMatrixAt(count,mesh.matrixWorld);instanced.setColorAt(count,mesh.material.color);count++;}instanced.count=count;instanced.instanceMatrix.needsUpdate=true;if(instanced.instanceColor)instanced.instanceColor.needsUpdate=true;}
  function resize(){const r=view.getBoundingClientRect();renderer.setSize(r.width,r.height);camera.aspect=r.width/Math.max(1,r.height);camera.updateProjectionMatrix();}observer=new ResizeObserver(resize);observer.observe(view);resize();
  function draw(){const base=Math.floor(s.distance/40)*40;
   for(let i=0;i<strips.length;i++){const d=base+(i-6)*40,g=strips[i];g.visible=d>=0;if(!g.visible)continue;const a=sample(d),b=sample(d+40);g.position.set((a.x+b.x)/2,(a.y+b.y)/2,(a.z+b.z)/2);g.rotation.set(-Math.atan2(b.y-a.y,2.4),a.a,0);g.children[0].material=mat(E.road(d).bridge?'#9a958a':'#314550');g.children[1].material=mat(i%2?'#f1e2bd':'#e65c59');g.children[4].material=g.children[1].material;}
   for(let i=0;i<scenery.length;i++){const d=Math.floor(s.distance/200)*200+(i-2)*200,part=scenery[i],r=E.road(d);place(part.g,d);part.g.visible=d>=0;part.stadium.visible=!r.city;part.city.visible=r.city&&!r.bridge;part.bridge.visible=r.bridge;}
   const lap=Math.floor(s.distance/E.LAP);place(finish,Math.min(3,lap+1)*E.LAP);place(tunnel,lap*E.LAP+5650);tunnel.visible=!E.road(s.distance).city;
   sea.position.set(sample(s.distance).x,-4,sample(s.distance).z);
   const visible=[...E.trackObjects(s.distance,s.tick).filter(o=>!s.used.has(o.key)),...s.traps.filter(o=>!o.used).map(o=>({...o,kind:'trap'})),...s.enemyShots.map(o=>({...o,kind:'rocket'}))].filter(o=>o.distance>s.distance-100&&o.distance<s.distance+3800);
   props.forEach((p,i)=>{const o=visible[i];p.g.visible=!!o;if(!o)return;for(const [k,m]of Object.entries(p.types))m.visible=k===o.kind;place(p.g,o.distance,o.lateral);if(o.kind==='box')p.types.box.rotation.y=s.tick*.025;});
   const p=place(kart.root,s.distance,s.lateral,s.air?Math.sin(s.air/s.airDuration*Math.PI)*3.1:0);kart.root.rotation.y+=s.spin?s.spin*.22:s.drift?s.driftSide*.26:-s.steering*.08;kart.root.rotation.z=-s.steering*.025;shadow.position.set(p.x,p.y+.03,p.z);shadow.material.opacity=s.air?.1:.25;for(const w of kart.wheels)w.rotation.z=-s.distance*.04;for(const w of kart.frontWheels)w.rotation.y=-s.steering*.3;
   rivals.forEach((g,i)=>{const r=s.rivals[i];g.visible=Math.abs(r.distance-s.distance)<3800;place(g,r.distance,r.lateral);});
   camera.position.set(p.x-Math.sin(p.a)*11,p.y+7.3,p.z-Math.cos(p.a)*11);const look=sample(s.distance+140,s.lateral*.3);camera.lookAt(look.x,look.y+1,look.z);
   batchBoxes();renderer.render(scene,camera);
   $('[data-place]').textContent=s.position+' / 4';$('[data-lap]').textContent='Круг '+s.lap+' / 3 · ♠ '+s.picked;
   $('[data-speed]').textContent=Math.round(s.speed*21)+' км/ч';$('[data-zone]').textContent=E.road(s.distance).name;
   notice.textContent=s.countdown?String(Math.ceil(s.countdown/60)):s.noticeTicks?s.notice:s.hazardWarning?'Впереди препятствие — смени линию':'';
   const meter=$('.race3d-meter i');meter.style.width=Math.min(100,s.driftMeter)+'%';meter.style.background=s.driftMeter>=60?'#ffe184':'#61d9e8';$('[data-key=attack]').textContent=s.itemRoll?'…':({rocket:'Ракета',shield:'Щит',turbo:'Разгон',trap:'Ловушка'}[s.item]|| (s.shield?'Запустить щит':'Нет предмета'));
   view.dataset.distance=Math.round(s.distance);view.dataset.routeZone=s.routeZone;
  }
  ready=true;start.disabled=false;start.textContent='На старт';$('[data-loading]').textContent=(garage.source==='preview'?'Пробный заезд на клубном карте. ':'Твоя машинка из гаража готова. ')+'Три круга за коробку билетов. Стрелки — руль, Shift — дрифт, Z — турбо в золотой зоне, X — предмет. На трамплине удерживай прыжок. Мокрый асфальт тормозит, подвижные ворота обходи сбоку.';
  renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();pause();ready=false;start.textContent='Перезагрузить гонку';start.disabled=false;$('[data-loading]').textContent='3D-сцена потеряла связь с видеокартой. Перезапусти заезд.';start.onclick=()=>{stop();window.LastBuyInRace3D.mount(host,chapter,onWin,onLose,options);};},{signal});
  // Read-only diagnostics used by the rendered route check.
  view.raceSnapshot=()=>({distance:s.distance,look:{...garage.look},source:garage.source,triangles:renderer.info.render.triangles,drawCalls:renderer.info.render.calls});
  function frame(time){if(stopped)return;const delta=last?Math.min(100,time-last):0;last=time;if(!paused&&!finished){acc+=delta;while(acc>=1000/60){E.step(s,input);acc-=1000/60;if(s.won||s.lost){finished=true;clearInput();if(s.won)onWin({chapter,score:s.score,hits:s.hits});else onLose(()=>{E.revive(s);finished=false;paused=true;dialog.hidden=false;start.textContent='Повторить заезд';last=0;acc=0;});break;}}}else acc=0;if(stopped)return;draw();raf=requestAnimationFrame(frame);}raf=requestAnimationFrame(frame);
 }
 init().catch(error=>{if(stopped)return;ready=false;$('[data-loading]').textContent=error.userMessage||'Не удалось открыть 3D-гонку. Повтори загрузку.';start.textContent='Повторить';start.disabled=false;start.onclick=()=>{stop();window.LastBuyInRace3D.mount(host,chapter,onWin,onLose,options);};console.error(error);});
 return {stop};
}};
