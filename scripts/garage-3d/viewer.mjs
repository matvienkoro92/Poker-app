import * as T from '../../vendor/three/three.module.min.js';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function makeModel(scene,look){
 const G=window.PokerGarage,car=new T.Group();scene.add(car);car.scale.set(1.24,.86,.95);
 const material=(color,metalness,roughness)=>new T.MeshPhysicalMaterial({color,metalness,roughness,clearcoat:metalness>.3?.65:.12,clearcoatRoughness:.12});
 const paint=material(G.item('paint',look.paint).color,.55,.24),felt=material(G.item('paint',look.paint).color,0,.93),gold=material('#e5aa28',1,.135),rubber=material('#171a1e',.04,.76),rim=material(G.item('wheels',look.wheels).color,.88,.2),black=material('#0d1417',.35,.3),leather=material('#060809',.12,.36),light=material(G.item('light',look.light).color,.45,.2),fanMetal=material('#123e47',.86,.22);
 light.emissive.copy(light.color);light.emissiveIntensity=2.0;
 function mesh(geometry,mat,x=0,y=0,z=0,parent=car){const o=new T.Mesh(geometry,mat);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
 const box=(w,h,d,m,x,y,z)=>mesh(new T.BoxGeometry(w,h,d),m,x,y,z);
 function cylinder(r,h,m,x,y,z,axis='y'){const o=mesh(new T.CylinderGeometry(r,r,h,64),m,x,y,z);if(axis==='z')o.rotation.x=Math.PI/2;if(axis==='x')o.rotation.z=Math.PI/2;return o;}
 function torus(r,t,m,x,y,z,axis='z'){const o=mesh(new T.TorusGeometry(r,t,12,80),m,x,y,z);if(axis==='y')o.rotation.x=Math.PI/2;if(axis==='x')o.rotation.y=Math.PI/2;return o;}
 function outline(w,d,r,Path=T.Shape){const s=new Path(),x=-w/2,z=-d/2;r=Math.min(r,d/2-.001);s.moveTo(x+r,z);s.lineTo(x+w-r,z);s.quadraticCurveTo(x+w,z,x+w,z+r);s.lineTo(x+w,z+d-r);s.quadraticCurveTo(x+w,z+d,x+w-r,z+d);s.lineTo(x+r,z+d);s.quadraticCurveTo(x,z+d,x,z+d-r);s.lineTo(x,z+r);s.quadraticCurveTo(x,z,x+r,z);return s;}
 function shell(w,d,h,r,m,y,inner=null,bevel=.025){const s=outline(w,d,r);if(inner){const p=outline(inner[0],inner[1],inner[2],T.Path);const shifted=new T.Path(p.getPoints(40).map(v=>new T.Vector2(v.x+(inner[3]||0),v.y)));s.holes.push(shifted);}const o=mesh(new T.ExtrudeGeometry(s,{depth:h,bevelEnabled:bevel>0,bevelSize:bevel,bevelThickness:bevel,bevelSegments:4,curveSegments:40}),m,0,y,0);o.rotation.x=-Math.PI/2;return o;}
 const cockpit=[3.02,1.51,.65,-.28];
 // The body and rail follow one oval, with a long driving well cut through the felt.
 const bodyOutline=outline(4.96,2.44,1.15).getSpacedPoints(128),bodyV=[],bodyI=[],bodyLayers=[[.60,.94],[.70,.97],[1.02,1.0],[1.22,.99]];
 for(const [y,scale] of bodyLayers)for(let n=0;n<128;n++){const p=bodyOutline[n];bodyV.push(p.x*scale,y,-p.y*scale);}
 for(let row=0;row<3;row++)for(let n=0;n<128;n++){const k=row*128+n,next=row*128+(n+1)%128;bodyI.push(k,next,k+128,next,next+128,k+128);}const bodyGeo=new T.BufferGeometry();bodyGeo.setAttribute('position',new T.Float32BufferAttribute(bodyV,3));bodyGeo.setIndex(bodyI);bodyGeo.computeVertexNormals();paint.side=T.DoubleSide;mesh(bodyGeo,paint);
 shell(5.03,2.51,.065,1.19,gold,.58,null,.035);
 shell(5.10,2.58,.09,1.22,gold,1.25,cockpit,.035);
 const railCurve=new T.CatmullRomCurve3(outline(4.94,2.42,1.15).getPoints(40).map(v=>new T.Vector3(v.x,1.44,-v.y)),true,'centripetal');mesh(new T.TubeGeometry(railCurve,240,.125,16,true),leather);
 for(const sign of [-1,1]){const points=Array.from({length:21},(_,n)=>{const a=.26+n*.25/20;return new T.Vector3(1.32+1.15*Math.cos(a),1.44,sign*(.06+1.15*Math.sin(a)));});mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),32,.132,20,false),gold);}
 shell(4.65,2.14,.035,1.03,gold,1.39,cockpit,.015);
 shell(4.52,2.01,.025,.97,felt,1.43,cockpit,.01);
 const floor=shell(2.98,1.47,.025,.63,felt,.94);floor.position.x=-.28;
 const lip=shell(3.13,1.62,.018,.70,gold,1.46,[3.02,1.51,.65,0],.006);lip.position.x=-.28;
 // Upholstery seams inside the well, matching the panels in the garage drawing.
 const well=shell(3.08,1.57,.46,.68,paint,.96,[3.02,1.51,.65,0],.005);well.position.x=-.28;
 for(const x of [-1.0,-.35,.35])for(const z of [-.75,.75])box(.011,.40,.009,black,x,1.20,z);
 // Procedural fine grain changes the material, never the car's silhouette.
 function grain(base,opacity){const c=document.createElement('canvas');c.width=c.height=256;const ctx=c.getContext('2d');ctx.fillStyle=base;ctx.fillRect(0,0,256,256);let seed=17;for(let n=0;n<18000;n++){seed=(seed*1664525+1013904223)>>>0;ctx.fillStyle='rgba(0,0,0,'+opacity+')';ctx.fillRect(seed%256,(seed>>>8)%256,1,1);}const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.wrapS=t.wrapT=T.RepeatWrapping;return t;}
 felt.map=grain('#e8e8e8',.035);felt.bumpMap=grain('#888888',.5);felt.bumpScale=.0015;felt.clearcoat=0;rubber.bumpMap=grain('#888888',.12);rubber.bumpScale=.003;leather.bumpMap=grain('#888888',.3);leather.bumpScale=.001;
 function spade(size,m,x,y,z,flip=false,parent=car){const s=new T.Shape();s.moveTo(0,.5);s.bezierCurveTo(-.12,.28,-.48,.12,-.3,-.1);s.bezierCurveTo(-.2,-.23,-.05,-.17,0,-.06);s.bezierCurveTo(.05,-.17,.2,-.23,.3,-.1);s.bezierCurveTo(.48,.12,.12,.28,0,.5);s.moveTo(-.12,-.3);s.lineTo(0,-.06);s.lineTo(.12,-.3);s.closePath();const o=mesh(new T.ExtrudeGeometry(s,{depth:.018,bevelEnabled:true,bevelSize:.012,bevelThickness:.009,bevelSegments:3,curveSegments:24}),m,x,y,z,parent);o.scale.setScalar(size);if(flip)o.rotation.y=Math.PI;return o;}
 // Wide rounded tires, recessed dark wheel faces and metal spade emblems.
 const spokes=[],faces=[];
 for(const x of [-1.72,1.72])for(const sign of [-1,1]){
  const z=sign*1.36,out=sign*1.57;const wheelGroup=new T.Group();wheelGroup.position.set(x,.81,z);car.add(wheelGroup);const wheelStart=car.children.length;
  const tire=mesh(new T.LatheGeometry([new T.Vector2(.56,-.19),new T.Vector2(.61,-.245),new T.Vector2(.67,-.25),new T.Vector2(.76,-.19),new T.Vector2(.80,-.10),new T.Vector2(.80,.10),new T.Vector2(.76,.19),new T.Vector2(.67,.25),new T.Vector2(.61,.245),new T.Vector2(.56,.19)],80),rubber,x,.81,z);tire.rotation.x=Math.PI/2;
  for(let n=-2;n<=2;n++)torus(.798-Math.abs(n)*.012,.0035,black,x,.81,z+n*.071);
  // Curved diagonal cuts run across the tread, with fine raised sidewall rings.
  for(let n=0;n<28;n++){const a=n*Math.PI/14;const points=Array.from({length:17},(_,j)=>{const q=j/16,zz=-.205+q*.41,r=.799-.044*Math.pow(Math.abs(zz)/.205,3),aa=a+.13*Math.sin(q*Math.PI);return new T.Vector3(x+Math.sin(aa)*r,.81+Math.cos(aa)*r,z+zz);});mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),20,.0045,5,false),black);}
  for(const side of [-1,1])for(const radius of [.625,.654,.681])torus(radius,.0035,black,x,.81,z+side*.244);
  cylinder(.566,.04,rim,x,.81,out,'z');cylinder(.515,.045,black,x,.81,out+sign*.022,'z');
  torus(.548,.023,rim,x,.81,out+sign*.035);torus(.505,.016,rim,x,.81,out+sign*.043);
  cylinder(.14,.045,black,x,.81,out+sign*.045,'z');torus(.14,.012,rim,x,.81,out+sign*.069);
  const emblem=spade(.20,rim,x,.80,out+sign*.075,sign<0);faces.push(emblem);
  for(const points of G.wheelDesign()){const path=new T.CatmullRomCurve3(points.map(([xx,yy])=>new T.Vector3(x+xx,.81+yy,out+sign*(.04+.025*(1-Math.hypot(xx,yy)/.51)))));spokes.push(mesh(new T.TubeGeometry(path,20,.007,6,false),rim));}
  for(let n=0;n<20;n++){const a=n*Math.PI/10;cylinder(.006,.009,rim,x+Math.sin(a)*.526,.81+Math.cos(a)*.526,out+sign*.06,'z');}
  car.updateMatrixWorld(true);for(const part of car.children.slice(wheelStart))wheelGroup.attach(part);wheelGroup.scale.set(.88/1.24,.88/.86,1/.95);wheelGroup.position.y=.715/.86;
 }
 // The original has a black/gold plaque and separate side spade, not a flat racing stripe.
 const sideEmblems=[];for(const sign of [-1,1]){sideEmblems.push(spade(.65,gold,-1.12,.95,sign*1.32,sign<0));box(1.35,.43,.04,gold,.05,.94,sign*1.30);}
 for(const sign of [-1,1]){const support=cylinder(.275,.27,black,2.16,.945,sign*.97,'z');torus(.278,.035,gold,2.16,.945,sign*1.11);}
 for(const x of [-1.72,1.72])cylinder(.07,2.8,black,x,.70,0,'z');box(3.6,.08,.8,black,0,.57,0);
 const textures=[];
 function texture(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.anisotropy=8;textures.push(t);return t;}
 const plaqueTex=texture(768,256,(c,w,h)=>{c.fillStyle='#101b18';c.fillRect(0,0,w,h);c.strokeStyle='#d9b35b';c.lineWidth=7;c.strokeRect(10,10,w-20,h-20);c.fillStyle='#ebc66c';c.textAlign='center';c.font='italic 116px Georgia';c.fillText('Two Aces',w/2,137);c.font='38px Georgia';c.fillText('♠ Poker21 ♠',w/2,209);});
 const plaqueMaterials=[];for(const sign of [-1,1]){const m=new T.MeshPhysicalMaterial({map:plaqueTex,metalness:.55,roughness:.2,clearcoat:1});plaqueMaterials.push(m);const p=mesh(new T.PlaneGeometry(1.28,.40),m,.05,.94,sign*1.326);m.userData.plane=p;if(sign<0)p.rotation.y=Math.PI;}

 const carBadges=[];for(const sign of [-1,1])for(let n=0;n<3;n++){
  const group=new T.Group();group.position.set((n-1)*.55+.05,.96,sign*1.35);if(sign<0)group.rotation.y=Math.PI;car.add(group);
  const back=mesh(new T.CylinderGeometry(.217,.217,.045,48),gold,0,0,0,group);back.rotation.x=Math.PI/2;
  const mat=new T.MeshStandardMaterial({transparent:true,alphaTest:.05,metalness:.2,roughness:.4});const face=mesh(new T.PlaneGeometry(.49,.49),mat,0,0,.027,group);carBadges.push({group,mat,n});
 }
 for(const sign of [-1,1])for(const x of [-.54,.64])for(const y of [.78,1.10]){const rivet=cylinder(.014,.018,gold,x,y,sign*1.35,'z');}
 for(const x of [-1.70,-.35,1.48])for(const z of [-1.21,1.21]){const sleeve=cylinder(.128,.13,gold,x,1.44,z,'x');}
 for(const x of [-1.70,-.35,1.48])for(const sign of [-1,1]){torus(.125,.004,black,x+.08,1.44,sign*1.21,'x');torus(.125,.004,black,x-.08,1.44,sign*1.21,'x');}
 // Deep brass cup wells interrupt the padded rail, and eight varied chip stacks sit on felt.
 for(const x of [-1.70,-.35,1.48])for(const z of [-.96,.96]){cylinder(.135,.08,gold,x,1.49,z);cylinder(.108,.082,black,x,1.498,z);torus(.125,.015,gold,x,1.54,z,'y');torus(.111,.006,gold,x,1.535,z,'y');}
 const chipEdges=[],chipTops=[];const chipMats=['#ab2338','#1b684b','#2455a5'].map(c=>material(c,.08,.55)),ivory=material('#eee9d6',.04,.6);
 for(const [x,z,n,count] of [[-1.47,.85,0,5],[-1.13,.88,2,4],[.38,.86,0,3],[1.43,-.75,2,4],[1.88,-.56,0,3]])for(let j=0;j<count;j++){cylinder(.104,.033,chipMats[n],x,1.49+j*.037,z);for(let k=0;k<6;k++){const a=k*Math.PI/3,dash=box(.024,.021,.012,ivory,x+Math.cos(a)*.103,1.49+j*.037,z+Math.sin(a)*.103);dash.rotation.y=-a;chipEdges.push(dash);}if(j===count-1){const mat=new T.MeshStandardMaterial({transparent:true,roughness:.55});const top=mesh(new T.PlaneGeometry(.17,.17),mat,x,1.509+j*.037,z);top.rotation.x=-Math.PI/2;chipTops.push({mat,n});}}
 // Large, inclined, three-spoke steering wheel with the same prominent spade boss.
 const steering=new T.Group();steering.position.set(.89,1.96,0);steering.scale.set(1/1.24,1/.86,1/.95);steering.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),new T.Vector3(-.65,.76,0).normalize());car.add(steering);
 const steeringLeather=leather.clone();mesh(new T.TorusGeometry(.53,.060,16,80),steeringLeather,0,0,0,steering);mesh(new T.TorusGeometry(.473,.014,10,64),gold,0,0,-.02,steering);
 for(const a of [Math.PI]){const sp=mesh(new T.BoxGeometry(.09,.39,.045),gold,Math.sin(a)*.26,Math.cos(a)*.26,0,steering);sp.rotation.z=-a;}
 for(const side of [-1,1]){const spoke=mesh(new T.BoxGeometry(.35,.075,.06),gold,side*.265,0,0,steering);mesh(new T.BoxGeometry(.32,.035,.064),black,side*.265,0,.006,steering);}
 const boss=mesh(new T.CylinderGeometry(.195,.195,.075,64),gold,0,0,.035,steering);boss.rotation.x=Math.PI/2;const bossFace=mesh(new T.CircleGeometry(.177,64),new T.MeshStandardMaterial({color:'#040607',metalness:.08,roughness:.4}),0,0,.085,steering);bossFace.receiveShadow=false;spade(.38,gold,0,-.025,.105,false,steering);
 const steeringVariants={classic:new T.Group(),sport:new T.Group(),formula:new T.Group()};for(const o of steering.children.slice())steeringVariants.classic.add(o);Object.values(steeringVariants).forEach(g=>steering.add(g));
 function steeringTube(group,points,r,m){const path=new T.CatmullRomCurve3(points.map(([x,y])=>new T.Vector3(x,y,0)),true);mesh(new T.TubeGeometry(path,72,r,12,true),m,0,0,0,group);}
 steeringTube(steeringVariants.sport,[[-.31,-.40],[.31,-.40],[.50,-.18],[.52,.13],[.32,.44],[0,.52],[-.32,.44],[-.52,.13],[-.50,-.18]],.062,steeringLeather);
 for(const sign of [-1,1]){mesh(new T.BoxGeometry(.35,.065,.045),rim,sign*.27,0,0,steeringVariants.sport);mesh(new T.BoxGeometry(.065,.30,.045),rim,sign*.12,-.22,0,steeringVariants.sport);}
 mesh(new T.TorusGeometry(.50,.018,8,64,.22),light,0,0,.005,steeringVariants.sport);
 steeringTube(steeringVariants.formula,[[-.48,-.26],[-.54,.17],[-.40,.27],[-.27,.14],[.27,.14],[.40,.27],[.54,.17],[.48,-.26],[.32,-.28],[.24,-.12],[-.24,-.12],[-.32,-.28]],.065,steeringLeather);
 mesh(new T.BoxGeometry(.60,.23,.065),black,0,0,0,steeringVariants.formula);for(const sign of [-1,1]){mesh(new T.SphereGeometry(.035,12,8),light,sign*.25,.055,.06,steeringVariants.formula);mesh(new T.BoxGeometry(.08,.29,.025),rim,sign*.37,0,-.07,steeringVariants.formula);}
 for(const id of ['sport','formula']){const hub=mesh(new T.CylinderGeometry(.15,.15,.07,48),rim,0,0,.035,steeringVariants[id]);hub.rotation.x=Math.PI/2;mesh(new T.CircleGeometry(.13,48),black,0,0,.078,steeringVariants[id]);spade(.25,rim,0,-.018,.09,false,steeringVariants[id]);}
 // Machined hub fasteners, leather grips and a center marker distinguish finished wheels.
 const stitch=material('#b9ab8a',.15,.8),grip=material('#171c20',.02,.85);
 for(const [id,g] of Object.entries(steeringVariants)){
  const radius=id==='classic'?.53:id==='sport'?.51:.47;
  for(const sign of [-1,1]){
   if(id!=='formula'){const pad=mesh(new T.TorusGeometry(radius,.072,12,30,.64),grip,0,0,.003,g);pad.rotation.z=sign<0?Math.PI-.32:-.32;}
   for(let j=0;j<9;j++){const a=(sign<0?Math.PI:0)-.28+j*.07;mesh(new T.SphereGeometry(.007,6,4),stitch,Math.cos(a)*(radius-.045),Math.sin(a)*(radius-.045),.063,g);}
  }
  const marker=mesh(new T.BoxGeometry(.065,.10,.035),id==='classic'?gold:light,0,id==='formula'?.16:.51,.045,g);
  for(let n=0;n<6;n++){const a=n*Math.PI/3;const bolt=mesh(new T.CylinderGeometry(.012,.012,.012,6),rim,Math.cos(a)*.13,Math.sin(a)*.13,.099,g);bolt.rotation.x=Math.PI/2;}
 }

 // The column shares the wheel axis and meets the underside of its hub.
 const columnBase=new T.Vector3(1.30,1.48,0),columnTop=new T.Vector3(.89,1.96,0),columnAxis=columnTop.clone().sub(columnBase),columnCenter=columnBase.clone().add(columnTop).multiplyScalar(.5);
 const column=box(.12,columnAxis.length(),.095,gold,...columnCenter.toArray());column.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),columnAxis.normalize());
 const columnInset=box(.075,column.geometry.parameters.height-.04,.10,black,...columnCenter.toArray());columnInset.quaternion.copy(column.quaternion);
 // Turbine sits directly on the rear deck. Its broad swept blades are solid, not wires.
 const tx=-1.84,ty=1.99,tr=.74;const turbineGroup=new T.Group();turbineGroup.position.set(tx,ty,0);car.add(turbineGroup);const turbineStart=car.children.length;
 cylinder(tr,.51,gold,tx,ty,0,'z');cylinder(.67,.54,black,tx,ty,0,'z');
 for(const sign of [-1,1]){const z=sign*.29;torus(.72,.055,black,tx,ty,z);torus(.75,.022,gold,tx,ty,z+sign*.03);torus(.665,.012,light,tx,ty,z+sign*.025);
  for(let n=0;n<14;n++){const a=n*Math.PI/7,vertices=[],indices=[];for(let j=0;j<=16;j++){const t=j/16,r=.22+t*.44,angle=a+.55*t;for(const offset of [-.15,.15])vertices.push(tx+Math.sin(angle+offset)*r,ty+Math.cos(angle+offset)*r,z+sign*(.018+Math.sin(t*Math.PI)*.12));}for(let j=0;j<16;j++){const k=j*2;indices.push(k,k+1,k+2,k+1,k+3,k+2);}const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(vertices,3));g.setIndex(indices);g.computeVertexNormals();fanMetal.side=T.DoubleSide;mesh(g,fanMetal);const curve=new T.CatmullRomCurve3(Array.from({length:17},(_,j)=>{const t=j/16,r=.22+t*.44,angle=a+.55*t-.15;return new T.Vector3(tx+Math.sin(angle)*r,ty+Math.cos(angle)*r,z+sign*(.025+Math.sin(t*Math.PI)*.12));}));mesh(new T.TubeGeometry(curve,20,.009,6,false),light);}
  cylinder(.215,.07,gold,tx,ty,z+sign*.085,'z');cylinder(.18,.085,black,tx,ty,z+sign*.11,'z');
 }
 for(let n=0;n<12;n++){const a=n*Math.PI/6,vent=box(.045,.15,.20,black,tx+Math.cos(a)*.735,ty+Math.sin(a)*.735,0);vent.rotation.z=a;}
 car.updateMatrixWorld(true);for(const part of car.children.slice(turbineStart))turbineGroup.attach(part);turbineGroup.rotation.set(0,Math.PI/2,0);turbineGroup.scale.set(.96/1.24,.96/.86,.96/.95);
 const secondTurbine=turbineGroup.clone(true);car.add(secondTurbine);
 const boostHousing=new T.Group();turbineGroup.add(boostHousing);const boostMetal=material('#829aaa',.92,.24);
 for(const z of [-.24,-.08,.08,.24])mesh(new T.TorusGeometry(.765,.028,10,80),boostMetal,0,0,z,boostHousing);
 for(let n=0;n<8;n++){const a=n*Math.PI/4;const bolt=mesh(new T.CylinderGeometry(.025,.025,.025,6),boostMetal,Math.sin(a)*.73,Math.cos(a)*.73,.35,boostHousing);bolt.rotation.x=Math.PI/2;}

 const exhaustGroups={classic:new T.Group(),dual:new T.Group(),titanium:new T.Group()},exhaustSteel=material('#a9b7c4',.92,.23),titanium=material('#668bb5',.88,.25);Object.values(exhaustGroups).forEach(g=>car.add(g));
 for(const [id,positions] of Object.entries({classic:[0],dual:[-.67,.67],titanium:[-.83,-.57,.57,.83]}))for(const z of positions){const m=id==='titanium'?titanium:exhaustSteel;const pipe=mesh(new T.CylinderGeometry(.105,.105,.50,32),m,-2.42,.76,z,exhaustGroups[id]);pipe.rotation.z=Math.PI/2;const core=mesh(new T.CylinderGeometry(.079,.079,.012,32),black,-2.678,.76,z,exhaustGroups[id]);core.rotation.z=Math.PI/2;const lip=mesh(new T.TorusGeometry(.094,.012,8,32),m,-2.69,.76,z,exhaustGroups[id]);lip.rotation.y=Math.PI/2;}
 // Complete muffler cans, mounting straps and recessed outlet throats.
 for(const [id,g] of Object.entries(exhaustGroups)){
  const centers=id==='classic'?[0]:[-.67,.67];
  for(const z of centers){const can=mesh(new T.CylinderGeometry(.18,.18,.52,40),exhaustSteel,-2.19,.76,z,g);can.rotation.z=Math.PI/2;
   for(const xx of [-2.36,-2.04]){const strap=mesh(new T.TorusGeometry(.184,.016,8,40),black,xx,.76,z,g);strap.rotation.y=Math.PI/2;mesh(new T.BoxGeometry(.07,.19,.07),exhaustSteel,xx,.94,z,g);}
  }
  const positions=id==='classic'?[0]:id==='dual'?[-.67,.67]:[-.83,-.57,.57,.83];
  for(const z of positions){const throat=mesh(new T.CylinderGeometry(.077,.077,.11,32,1,true),material('#151c23',.35,.65),-2.63,.76,z,g);throat.rotation.z=Math.PI/2;
   const collar=mesh(new T.TorusGeometry(.107,.018,10,40),id==='titanium'?titanium:exhaustSteel,-2.57,.76,z,g);collar.rotation.y=Math.PI/2;
   if(id==='titanium')for(const [xx,color]of [[-2.65,'#6575ba'],[-2.61,'#9f746a'],[-2.58,'#c0a474']]){const weld=mesh(new T.TorusGeometry(.106,.008,6,40),material(color,.85,.3),xx,.76,z,g);weld.rotation.y=Math.PI/2;}
  }
 }
 // Brass tubing and braces tie the turbine into the rear chassis.
 for(const sign of [-1,1]){const curve=new T.CatmullRomCurve3([new T.Vector3(-2.16,1.46,sign*.65),new T.Vector3(-1.94,1.66,sign*.69),new T.Vector3(-1.30,1.59,sign*.64),new T.Vector3(-.98,1.47,sign*.70)]);mesh(new T.TubeGeometry(curve,32,.022,8,false),gold);box(.34,.06,.14,gold,-1.84,1.48,sign*.40);}
 for(const sign of [-1,1]){
  const pipe=new T.CatmullRomCurve3([new T.Vector3(-2.45,1.10,sign*.70),new T.Vector3(-2.43,1.36,sign*.72),new T.Vector3(-2.19,1.55,sign*.70),new T.Vector3(-1.90,1.55,sign*.68)]);mesh(new T.TubeGeometry(pipe,40,.075,14,false),black);mesh(new T.TubeGeometry(pipe,40,.019,10,false),gold);
  for(const x of [-2.2,-1.96]){const strut=new T.CatmullRomCurve3([new T.Vector3(x,1.43,sign*.48),new T.Vector3(x,1.63,sign*.60),new T.Vector3(x+.24,1.57,sign*.82)]);mesh(new T.TubeGeometry(strut,24,.017,8,false),gold);}
 }
 // A rounded recessed front fascia, with integrated light strips and gold end bands.
 const fasciaVertices=[],fasciaIndices=[];
 for(let n=0;n<=48;n++){const a=-.92+n*1.84/48;for(const y of [.64,1.23])fasciaVertices.push(2.57-.28*(Math.sin(a)*1.25/1.1)**2,y,Math.sin(a)*1.25);}
 for(let n=0;n<48;n++){const k=n*2;fasciaIndices.push(k,k+2,k+1,k+1,k+2,k+3);}const fasciaGeo=new T.BufferGeometry();fasciaGeo.setAttribute('position',new T.Float32BufferAttribute(fasciaVertices,3));fasciaGeo.setIndex(fasciaIndices);fasciaGeo.computeVertexNormals();const fasciaMat=material('#00453f',.72,.14);fasciaMat.clearcoat=1;fasciaMat.side=T.DoubleSide;mesh(fasciaGeo,fasciaMat);
 for(const y of [.635,1.225]){const points=Array.from({length:65},(_,n)=>{const z=-1.04+n*2.08/64;return new T.Vector3(2.57-.28*(z/1.1)**2,y,z);});mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),80,.034,12,false),gold);}
 for(const sign of [-1,1]){const z=sign*1.0,x=2.57-.28*(z/1.1)**2;const bandCurve=new T.CatmullRomCurve3([new T.Vector3(x-.04,.635,z),new T.Vector3(x+.05,.78,z),new T.Vector3(x+.065,1.12,z),new T.Vector3(x-.04,1.25,z)]);mesh(new T.TubeGeometry(bandCurve,32,.065,12,false),gold);for(const y of [.91,1.065]){const points=Array.from({length:16},(_,n)=>{const z=sign*(.51+n*.41/15);return new T.Vector3(2.57-.28*(z/1.1)**2+.018,y,z);});mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),24,.017,8,false),light);}}
 // Shared card artwork keeps the option cards, garage and model in sync.
 const cardMats=[];for(let n=0;n<2;n++){const map=new T.CanvasTexture(G.cardCanvas(look.cards,n));map.colorSpace=T.SRGBColorSpace;map.anisotropy=16;const mat=new T.MeshBasicMaterial({map,transparent:true,toneMapped:false});cardMats.push(mat);const x=1.43+n*.40,z=-.18+n*.23;const backing=box(.506,.008,.676,material('#20252c',0,.95),x,1.474+n*.004,z);backing.rotation.y=-n*.13;const card=mesh(new T.PlaneGeometry(.50,.67),mat,x,1.480+n*.004,z);card.rotation.x=-Math.PI/2;card.rotation.z=n*.13;}


 const numberMat=new T.MeshStandardMaterial({map:new T.CanvasTexture(G.plateCanvas(look)),roughness:.6});
 for(const sign of [-1,1]){const plate=mesh(new T.PlaneGeometry(.79,.463),numberMat,sign*2.605,1.01,0);plate.rotation.y=sign*Math.PI/2;}
 function update(v){Object.entries(steeringVariants).forEach(([id,g])=>g.visible=id===(v.steering||'classic'));Object.entries(exhaustGroups).forEach(([id,g])=>g.visible=id===(v.exhaust||'classic'));boostHousing.visible=v.turbine==='boost';const twin=v.turbine==='twin',fanScale=twin?.52:v.turbine==='boost'?.96:.90;turbineGroup.scale.set(fanScale/1.24,fanScale/.86,fanScale/.95);turbineGroup.position.set(tx,ty+(twin?-.20:-.04),twin?-.44:0);secondTurbine.visible=twin;secondTurbine.scale.copy(turbineGroup.scale);secondTurbine.position.set(tx,ty-.20,.44);const badges=v.badges||[];plaqueMaterials.forEach(m=>m.userData.plane.visible=!badges.length);carBadges.forEach(({group,mat,n})=>{const id=badges[n];group.visible=!!id;if(!id||mat.userData.badge===id)return;mat.map?.dispose();mat.map=new T.CanvasTexture(G.badgeCanvas(id));mat.map.colorSpace=T.SRGBColorSpace;mat.map.anisotropy=16;mat.emissive.set('#ffffff');mat.emissiveMap=mat.map;mat.emissiveIntensity=.12;mat.userData.badge=id;mat.needsUpdate=true;});paint.color.set(G.item('paint',v.paint).color);felt.color.copy(paint.color).multiplyScalar(.45);rim.color.set(G.item('wheels',v.wheels).color);gold.color.set(G.item('trim',v.trim).color);if(leather.userData.style!==v.upholstery){leather.map?.dispose();leather.map=new T.CanvasTexture(G.upholsteryCanvas(v.upholstery));leather.map.colorSpace=T.SRGBColorSpace;leather.map.wrapS=leather.map.wrapT=T.RepeatWrapping;leather.map.repeat.set(12,2);leather.color.set('#ffffff');leather.roughness=v.upholstery==='alcantara'?.9:.38;leather.userData.style=v.upholstery;leather.needsUpdate=true;}G.chipPalette(v.chips).forEach((color,n)=>{chipMats[n].color.set(color);chipMats[n].roughness=v.chips==='ceramic'?.25:.55;});chipEdges.forEach(o=>o.visible=v.chips!=='ceramic');chipTops.forEach(({mat,n})=>{if(mat.userData.style===v.chips)return;mat.map?.dispose();mat.map=new T.CanvasTexture(G.chipCanvas(v.chips,n));mat.map.colorSpace=T.SRGBColorSpace;mat.map.anisotropy=8;mat.userData.style=v.chips;mat.needsUpdate=true;});cardMats.forEach((m,n)=>{if(m.userData.style===v.cards)return;m.map?.dispose();m.map=new T.CanvasTexture(G.cardCanvas(v.cards,n));m.map.colorSpace=T.SRGBColorSpace;m.map.anisotropy=16;m.userData.style=v.cards;m.needsUpdate=true;});spokes.forEach(o=>o.visible=true);faces.forEach(o=>o.visible=true);light.color.set(G.item('light',v.light).color);light.emissive.copy(light.color);fanMetal.color.copy(light.color).multiplyScalar(.075);fanMetal.emissive.copy(light.color);fanMetal.emissiveIntensity=.045;if(numberMat.userData.number!==v.number+v.region){numberMat.map?.dispose();numberMat.map=new T.CanvasTexture(G.plateCanvas(v));numberMat.userData.number=v.number+v.region;numberMat.needsUpdate=true;}}
 const fanGlow=new T.PointLight(light.color,.45,2,2);fanGlow.position.set(-1.9,2,.48);car.add(fanGlow);
 const oldUpdate=update;function updateLit(v){oldUpdate(v);fanGlow.color.copy(light.color);}
 updateLit(look);return {car,update:updateLit};
}
window.pokerCreateGarage3D=function(host,look,state={}){
 let renderer;try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch(_){host.textContent='3D-просмотр недоступен на этом устройстве';return null;}
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;host.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-label','Объёмная машина: потяните, чтобы повернуть');renderer.domElement.setAttribute('role','img');
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(35,1,.1,60);scene.add(new T.HemisphereLight('#c6d9ef','#44311e',1.25));
 for(const [color,intensity,x,y,z] of [['#fff0d0',4,1,6,5],['#9dcfff',2,-4,3,-3],['#ffffff',1.5,0,5,-4]]){const l=new T.DirectionalLight(color,intensity);l.position.set(x,y,z);l.castShadow=color==='#fff0d0';l.shadow.bias=-.0002;l.shadow.normalBias=.025;l.shadow.mapSize.set(2048,2048);l.shadow.camera.left=-5;l.shadow.camera.right=5;l.shadow.camera.top=5;l.shadow.camera.bottom=-5;scene.add(l);}
 const studio=new T.Scene();studio.background=new T.Color('#48505b');for(const [x,y,z,w,h,d] of [[0,5,0,7,.1,2],[4,2,0,.1,3,1.3],[-4,3,-2,.1,2,5],[0,2,-5,6,1,.1],[0,1.5,5,6,.35,.1]]){const p=new T.Mesh(new T.BoxGeometry(w,h,d),new T.MeshBasicMaterial({color:'#ffffff'}));p.position.set(x,y,z);studio.add(p);}const pmrem=new T.PMREMGenerator(renderer),env=pmrem.fromScene(studio,.05);scene.environment=env.texture;scene.environmentIntensity=1.5;studio.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});pmrem.dispose();
 const ground=new T.Mesh(new T.PlaneGeometry(30,30),new T.ShadowMaterial({opacity:.34}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);const model=makeModel(scene,look);
 state.yaw??=.90;state.pitch??=.25;state.manual??=window.matchMedia('(prefers-reduced-motion: reduce)').matches;let disposed=false,drag=null,raf=0,last=0;
 const fit=()=>{const w=host.clientWidth,h=host.clientHeight;if(w&&h){renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}};const resize=new ResizeObserver(fit);resize.observe(host);fit();
 const target=new T.WebGLRenderTarget(1,1,{type:T.HalfFloatType,depthBuffer:true});
 target.samples=4;
 const postScene=new T.Scene(),postCamera=new T.OrthographicCamera(-1,1,1,-1,0,1);
 const postMat=new T.ShaderMaterial({transparent:true,depthTest:false,depthWrite:false,toneMapped:true,uniforms:{source:{value:target.texture},stepSize:{value:new T.Vector2()}},vertexShader:'varying vec2 uvPass;void main(){uvPass=uv;gl_Position=vec4(position.xy,0.,1.);}',fragmentShader:`uniform sampler2D source;uniform vec2 stepSize;varying vec2 uvPass;
 void main(){vec4 base=texture2D(source,uvPass);vec3 glow=vec3(0.);for(int i=0;i<12;i++){float a=float(i)*6.2831853/12.;vec2 off=vec2(cos(a),sin(a))*stepSize;glow+=max(texture2D(source,uvPass+off).rgb-vec3(1.1),vec3(0.));}glow/=12.;gl_FragColor=vec4(base.rgb+glow*.24,max(base.a,min(.65,max(glow.r,max(glow.g,glow.b))*.12)));
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`});const postQuad=new T.Mesh(new T.PlaneGeometry(2,2),postMat);postScene.add(postQuad);
 function drawFrame(){const size=renderer.getDrawingBufferSize(new T.Vector2());if(target.width!==size.x||target.height!==size.y)target.setSize(size.x,size.y);postMat.uniforms.stepSize.value.set(3/size.x,3/size.y);renderer.setRenderTarget(target);renderer.render(scene,camera);renderer.setRenderTarget(null);renderer.render(postScene,postCamera);}

 const down=e=>{if(e.button&&e.button!==0)return;state.manual=true;drag={id:e.pointerId,x:e.clientX,y:e.clientY};host.setPointerCapture(e.pointerId);e.preventDefault();};const move=e=>{if(!drag||drag.id!==e.pointerId)return;state.yaw-=(e.clientX-drag.x)*.011;state.pitch=clamp(state.pitch+(e.clientY-drag.y)*.009,-.24,1.35);drag.x=e.clientX;drag.y=e.clientY;e.preventDefault();};const up=e=>{if(drag&&drag.id===e.pointerId){drag=null;if(host.hasPointerCapture(e.pointerId))host.releasePointerCapture(e.pointerId);}};
 const key=e=>{const turns={ArrowLeft:[.12,0],ArrowRight:[-.12,0],ArrowUp:[0,.09],ArrowDown:[0,-.09]};if(!turns[e.key])return;state.manual=true;state.yaw+=turns[e.key][0];state.pitch=clamp(state.pitch+turns[e.key][1],-.24,1.35);e.preventDefault();};host.addEventListener('keydown',key);host.addEventListener('pointerdown',down);host.addEventListener('pointermove',move);host.addEventListener('pointerup',up);host.addEventListener('pointercancel',up);host.addEventListener('lostpointercapture',up);
 function dispose(){if(disposed)return;disposed=true;cancelAnimationFrame(raf);resize.disconnect();host.removeEventListener('keydown',key);host.removeEventListener('pointerdown',down);host.removeEventListener('pointermove',move);host.removeEventListener('pointerup',up);host.removeEventListener('pointercancel',up);host.removeEventListener('lostpointercapture',up);const textures=new Set(),materials=new Set(),geometries=new Set();scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)materials.add(o.material);});materials.forEach(m=>{for(const value of Object.values(m))if(value&&value.isTexture)textures.add(value);m.dispose();});textures.forEach(t=>t.dispose());geometries.forEach(g=>g.dispose());env.dispose();target.dispose();postMat.dispose();postQuad.geometry.dispose();renderer.dispose();renderer.domElement.remove();}
 function tick(time){if(disposed)return;if(!host.isConnected||(host.closest('dialog')&&!host.closest('dialog').open)){dispose();return;}const dt=last?Math.min(.05,(time-last)/1000):0;last=time;if(!document.hidden&&host.getBoundingClientRect().bottom>0){if(!state.manual)state.yaw+=dt*.13;const distance=Math.max(9.0,3.6/(Math.tan(35*Math.PI/360)*camera.aspect));camera.position.set(Math.sin(state.yaw)*Math.cos(state.pitch)*distance,1.15+Math.sin(state.pitch)*distance,Math.cos(state.yaw)*Math.cos(state.pitch)*distance);camera.lookAt(0,1.2,0);drawFrame();host.dataset.yaw=state.yaw.toFixed(4);host.dataset.pitch=state.pitch.toFixed(4);host.dataset.manual=String(state.manual);}raf=requestAnimationFrame(tick);}
 raf=requestAnimationFrame(tick);return {update:model.update,dispose,state};
};
