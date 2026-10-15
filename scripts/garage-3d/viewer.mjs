import {createCharacterStudy} from './character-reconstruction.mjs';
window.pokerCreateReferenceCharacter3D=createCharacterStudy;
import './character.mjs';
import {sportBrakes,paintBrakePreview} from './sport-brakes.mjs';
window.pokerPaintBrakePreview=paintBrakePreview;
import {formulaTyre} from './formula-tyre.mjs';
import {formulaBodyTransition} from './formula-body-transition.mjs';
import {formulaFrontWing} from './formula-front-wing.mjs';
import {sportSeat,paintSeatPreview} from './sport-seat.mjs';
window.pokerPaintSeatPreview=paintSeatPreview;
import * as T from '../../vendor/three/three.module.min.js';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function makeModel(scene,look){
 const G=window.PokerGarage,car=new T.Group();scene.add(car);car.scale.set(1.24,.86,.95);
 const material=(color,metalness,roughness)=>new T.MeshPhysicalMaterial({color,metalness,roughness,clearcoat:metalness>.3?.65:.12,clearcoatRoughness:.12});
 const paint=material(G.item('paint',look.paint).color,.55,.24),felt=material(G.item('paint',look.paint).color,0,.93),gold=material('#e5aa28',1,.135),rubber=material('#171a1e',.04,.76),rim=material(G.wheelPaintColor(look),0,.95),black=material('#0d1417',.35,.3),leather=material('#060809',.12,.36),light=material(G.item('light',look.light).color,.45,.2),fanMetal=material('#123e47',.86,.22);
 light.emissive.copy(light.color);light.emissiveIntensity=2.0;
 function mesh(geometry,mat,x=0,y=0,z=0,parent=car){const o=new T.Mesh(geometry,mat);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
 const box=(w,h,d,m,x,y,z)=>mesh(new T.BoxGeometry(w,h,d),m,x,y,z);
 function cylinder(r,h,m,x,y,z,axis='y'){const o=mesh(new T.CylinderGeometry(r,r,h,64),m,x,y,z);if(axis==='z')o.rotation.x=Math.PI/2;if(axis==='x')o.rotation.z=Math.PI/2;return o;}
 function torus(r,t,m,x,y,z,axis='z'){const o=mesh(new T.TorusGeometry(r,t,12,80),m,x,y,z);if(axis==='y')o.rotation.x=Math.PI/2;if(axis==='x')o.rotation.y=Math.PI/2;return o;}
 function outline(w,d,r,Path=T.Shape){const s=new Path(),x=-w/2,z=-d/2;r=Math.min(r,d/2-.001);s.moveTo(x+r,z);s.lineTo(x+w-r,z);s.quadraticCurveTo(x+w,z,x+w,z+r);s.lineTo(x+w,z+d-r);s.quadraticCurveTo(x+w,z+d,x+w-r,z+d);s.lineTo(x+r,z+d);s.quadraticCurveTo(x,z+d,x,z+d-r);s.lineTo(x,z+r);s.quadraticCurveTo(x,z,x+r,z);return s;}
 function shell(w,d,h,r,m,y,inner=null,bevel=.025){const s=outline(w,d,r);if(inner){const p=outline(inner[0],inner[1],inner[2],T.Path);const shifted=new T.Path(p.getPoints(40).map(v=>new T.Vector2(v.x+(inner[3]||0),v.y)));s.holes.push(shifted);}const o=mesh(new T.ExtrudeGeometry(s,{depth:h,bevelEnabled:bevel>0,bevelSize:bevel,bevelThickness:bevel,bevelSegments:4,curveSegments:40}),m,0,y,0);o.rotation.x=-Math.PI/2;return o;}
 const stockNoseParts=[],bodyStart=car.children.length;
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
 stockNoseParts.push(...car.children.slice(bodyStart));
 const floor=shell(2.98,1.47,.025,.63,felt,.94);floor.position.x=-.28;
 const vinylMaterial=new T.MeshPhysicalMaterial({transparent:true,alphaTest:.025,depthWrite:false,metalness:.15,roughness:.48,clearcoat:.25,side:T.DoubleSide,polygonOffset:true,polygonOffsetFactor:-1});
 const vinylShape=new T.ShapeGeometry(outline(2.90,1.40,.60)),positions=vinylShape.attributes.position,uv=vinylShape.attributes.uv;
 for(let i=0;i<positions.count;i++)uv.setXY(i,(positions.getX(i)+1.45)/2.90,(positions.getY(i)+.70)/1.40);
 const floorVinyl=mesh(vinylShape,vinylMaterial,-.28,1.005,0);floorVinyl.rotation.x=-Math.PI/2;floorVinyl.castShadow=false;
 const sideVinylMaterial=vinylMaterial.clone();const vinylSides=[];
 for(const sign of [-1,1]){const decal=mesh(new T.PlaneGeometry(3.05,.30),sideVinylMaterial,0,1.04,sign*1.329);if(sign<0)decal.rotation.y=Math.PI;decal.castShadow=false;vinylSides.push(decal);}
 function updateVinyl(v){const id=v.vinyl||'none';floorVinyl.visible=id!=='none';vinylSides.forEach(o=>o.visible=id!=='none');const key=id+':'+(v.vinylText||'');if(vinylMaterial.userData.id===key)return;
  vinylMaterial.map?.dispose();sideVinylMaterial.map?.dispose();vinylMaterial.map=new T.CanvasTexture(G.vinylCanvas(id,false,v.vinylText));sideVinylMaterial.map=new T.CanvasTexture(G.vinylCanvas(id,true,v.vinylText));
  for(const mat of [vinylMaterial,sideVinylMaterial]){mat.map.colorSpace=T.SRGBColorSpace;mat.map.anisotropy=16;const map=mat.map;map.image.addEventListener('vinyl-ready',()=>{map.needsUpdate=true;},{once:true});mat.needsUpdate=true;mat.userData.id=key;}
 }

 const lip=shell(3.13,1.62,.018,.70,gold,1.46,[3.02,1.51,.65,0],.006);lip.position.x=-.28;
 // Upholstery seams inside the well, matching the panels in the garage drawing.
 const well=shell(3.08,1.57,.46,.68,paint,.96,[3.02,1.51,.65,0],.005);well.position.x=-.28;
 for(const x of [-1.0,-.35,.35])for(const z of [-.75,.75])box(.011,.40,.009,black,x,1.20,z);
 // Procedural fine grain changes the material, never the car's silhouette.
 function grain(base,opacity){const c=document.createElement('canvas');c.width=c.height=256;const ctx=c.getContext('2d');ctx.fillStyle=base;ctx.fillRect(0,0,256,256);let seed=17;for(let n=0;n<18000;n++){seed=(seed*1664525+1013904223)>>>0;ctx.fillStyle='rgba(0,0,0,'+opacity+')';ctx.fillRect(seed%256,(seed>>>8)%256,1,1);}const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.wrapS=t.wrapT=T.RepeatWrapping;return t;}
 felt.map=grain('#e8e8e8',.035);felt.bumpMap=grain('#888888',.5);felt.bumpScale=.0015;felt.clearcoat=0;rubber.bumpMap=grain('#888888',.12);rubber.bumpScale=.003;leather.bumpMap=grain('#888888',.3);leather.bumpScale=.001;
 function spade(size,m,x,y,z,flip=false,parent=car){const s=new T.Shape();s.moveTo(0,.5);s.bezierCurveTo(-.12,.28,-.48,.12,-.3,-.1);s.bezierCurveTo(-.2,-.23,-.05,-.17,0,-.06);s.bezierCurveTo(.05,-.17,.2,-.23,.3,-.1);s.bezierCurveTo(.48,.12,.12,.28,0,.5);s.moveTo(-.12,-.3);s.lineTo(0,-.06);s.lineTo(.12,-.3);s.closePath();const o=mesh(new T.ExtrudeGeometry(s,{depth:.018,bevelEnabled:true,bevelSize:.012,bevelThickness:.009,bevelSegments:3,curveSegments:24}),m,x,y,z,parent);o.scale.setScalar(size);if(flip)o.rotation.y=Math.PI;return o;}
 // Wide rounded tires, recessed dark wheel faces and metal spade emblems.
 const spokes=[],faces=[],wheelSpecs=[];let wheelStyle=null;
 for(const x of [-1.72,1.72])for(const sign of [-1,1]){
  const z=sign*1.36,out=sign*1.57;const wheelGroup=new T.Group();wheelGroup.position.set(x,.81,z);car.add(wheelGroup);wheelGroup.userData.groundWheel=true;const wheelStart=car.children.length;
  const tire=mesh(new T.LatheGeometry([new T.Vector2(.56,-.19),new T.Vector2(.61,-.245),new T.Vector2(.67,-.25),new T.Vector2(.76,-.19),new T.Vector2(.80,-.10),new T.Vector2(.80,.10),new T.Vector2(.76,.19),new T.Vector2(.67,.25),new T.Vector2(.61,.245),new T.Vector2(.56,.19)],80),rubber,x,.81,z);tire.rotation.x=Math.PI/2;
  for(let n=-2;n<=2;n++)torus(.798-Math.abs(n)*.012,.0035,black,x,.81,z+n*.071);
  // Curved diagonal cuts run across the tread, with fine raised sidewall rings.
  for(let n=0;n<28;n++){const a=n*Math.PI/14;const points=Array.from({length:17},(_,j)=>{const q=j/16,zz=-.205+q*.41,r=.799-.044*Math.pow(Math.abs(zz)/.205,3),aa=a+.13*Math.sin(q*Math.PI);return new T.Vector3(x+Math.sin(aa)*r,.81+Math.cos(aa)*r,z+zz);});mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),20,.0045,5,false),black);}
  for(const side of [-1,1])for(const radius of [.625,.654,.681])torus(radius,.0035,black,x,.81,z+side*.244);
  const stockTireParts=car.children.slice(wheelStart);
  // Open rim: brake rotor and caliper remain visible through the spokes.
  torus(.548,.023,rim,x,.81,out+sign*.035);torus(.505,.016,rim,x,.81,out+sign*.043);
  cylinder(.14,.045,black,x,.81,out+sign*.045,'z');torus(.14,.012,rim,x,.81,out+sign*.069);
  const emblem=spade(.20,rim,x,.80,out+sign*.075,sign<0);faces.push(emblem);
  for(const points of G.wheelDesign()){const path=new T.CatmullRomCurve3(points.map(([xx,yy])=>new T.Vector3(x+xx,.81+yy,out+sign*(.04+.025*(1-Math.hypot(xx,yy)/.51)))));spokes.push(mesh(new T.TubeGeometry(path,20,.007,6,false),rim));}
  for(let n=0;n<20;n++){const a=n*Math.PI/10;cylinder(.006,.009,rim,x+Math.sin(a)*.526,.81+Math.cos(a)*.526,out+sign*.06,'z');}
  car.updateMatrixWorld(true);for(const part of car.children.slice(wheelStart))wheelGroup.attach(part);wheelGroup.scale.set(.88/1.24,.88/.86,1/.95);wheelGroup.position.y=.715/.86;const tyres={standard:stockTireParts};for(const id of ['soft','medium','hard','semi','wet']){const g=formulaTyre(id);g.visible=false;wheelGroup.add(g);tyres[id]=[g];}wheelSpecs.push({wheelGroup,x,out,sign,tyres});
 }
 // Black and gold supports for the side plaques.
 const badgeSupports=[];for(const sign of [-1,1]){badgeSupports.push(box(1.35,.43,.04,gold,.05,.94,sign*1.30));}
 for(const sign of [-1,1]){const support=cylinder(.275,.27,black,2.16,.945,sign*.97,'z');torus(.278,.035,gold,2.16,.945,sign*1.11);}
 for(const x of [-1.72,1.72])cylinder(.07,2.8,black,x,.70,0,'z');box(3.6,.08,.8,black,0,.57,0);
 const textures=[];
 function texture(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.anisotropy=8;textures.push(t);return t;}
 const plaqueTex=texture(768,256,(c,w,h)=>{c.fillStyle='#101b18';c.fillRect(0,0,w,h);c.strokeStyle='#d9b35b';c.lineWidth=7;c.strokeRect(10,10,w-20,h-20);c.fillStyle='#ebc66c';c.textAlign='center';c.font='italic 116px Georgia';c.fillText('Two Aces',w/2,137);c.font='38px Georgia';c.fillText('♠ Poker21 ♠',w/2,209);});
 const plaqueMaterials=[];for(const sign of [-1,1]){const m=new T.MeshPhysicalMaterial({map:plaqueTex,metalness:.55,roughness:.2,clearcoat:1});plaqueMaterials.push(m);const p=mesh(new T.PlaneGeometry(1.28,.40),m,.05,.94,sign*1.326);m.userData.plane=p;if(sign<0)p.rotation.y=Math.PI;}

 const carBadges=[];for(const sign of [-1,1])for(let n=0;n<3;n++){
  const group=new T.Group();group.position.set((n-1)*.70+.05,1.00,sign*1.365);if(sign<0)group.rotation.y=Math.PI;car.add(group);
  // The alpha-cut face defines the badge silhouette; a circular backing showed through shields.
  const back=mesh(new T.BoxGeometry(.1,.1,.025),gold,0,0,0,group);
  const mat=new T.MeshStandardMaterial({transparent:true,alphaTest:.15,metalness:.05,roughness:.75,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});const face=mesh(new T.PlaneGeometry(.65,.65),mat,0,0,.035,group);face.castShadow=false;face.receiveShadow=false;carBadges.push({group,mat,back,n});
 }
 for(const sign of [-1,1])for(const x of [-.54,.64])for(const y of [.78,1.10]){const rivet=cylinder(.014,.018,gold,x,y,sign*1.35,'z');}
 const deckDecorStart=car.children.length;
 for(const x of [-1.70,-.35,1.48])for(const z of [-1.21,1.21]){const sleeve=cylinder(.128,.13,gold,x,1.44,z,'x');}
 for(const x of [-1.70,-.35,1.48])for(const sign of [-1,1]){torus(.125,.004,black,x+.08,1.44,sign*1.21,'x');torus(.125,.004,black,x-.08,1.44,sign*1.21,'x');}
 // Deep brass cup wells interrupt the padded rail, and eight varied chip stacks sit on felt.
 for(const x of [-1.70,-.35,1.48])for(const z of [-.96,.96]){cylinder(.135,.08,gold,x,1.49,z);cylinder(.108,.082,black,x,1.498,z);torus(.125,.015,gold,x,1.54,z,'y');torus(.111,.006,gold,x,1.535,z,'y');}
 const chipEdges=[],chipTops=[];const chipMats=['#ab2338','#1b684b','#2455a5'].map(c=>material(c,.08,.55)),ivory=material('#eee9d6',.04,.6);
 for(const [x,z,n,count] of [[-1.47,.85,0,5],[-1.13,.88,2,4],[.38,.86,0,3],[1.43,-.75,2,4],[1.88,-.56,0,3]])for(let j=0;j<count;j++){cylinder(.104,.033,chipMats[n],x,1.49+j*.037,z);for(let k=0;k<6;k++){const a=k*Math.PI/3,dash=box(.024,.021,.012,ivory,x+Math.cos(a)*.103,1.49+j*.037,z+Math.sin(a)*.103);dash.rotation.y=Math.PI/2-a;dash.castShadow=false;dash.receiveShadow=false;chipEdges.push(dash);}if(j===count-1){const mat=new T.MeshStandardMaterial({transparent:true,alphaTest:.1,roughness:.65});const top=mesh(new T.PlaneGeometry(.208,.208),mat,x,1.511+j*.037,z);top.rotation.x=-Math.PI/2;top.castShadow=false;top.receiveShadow=false;chipTops.push({mat,n});}}
 stockNoseParts.push(...car.children.slice(deckDecorStart));
 // Large, inclined, three-spoke steering wheel with the same prominent spade boss.
 // Cancel the body stretch before orienting the wheel, so its rim remains round.
 const steeringMount=new T.Group();steeringMount.position.set(.89,1.96,0);steeringMount.scale.set(1/1.24,1/.86,1/.95);car.add(steeringMount);
 const steering=new T.Group();steeringMount.add(steering);
 const steeringNormal=new T.Vector3((.89-1.30)*1.24,(1.96-1.48)*.86,0).normalize();
 const steeringRight=new T.Vector3(0,0,1),steeringUp=new T.Vector3().crossVectors(steeringNormal,steeringRight).normalize();
 steering.quaternion.setFromRotationMatrix(new T.Matrix4().makeBasis(steeringRight,steeringUp,steeringNormal));
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
 for(const [id,d] of Object.entries(G.steeringDesigns)){
 const g=new T.Group();steering.add(g);steeringVariants[id]=g;
 const m=material(d.color,id==='woodHeritage'?.3:.55,.35);
 if(d.shape==='round')mesh(new T.TorusGeometry(.53,.065,16,80),m,0,0,0,g);
 else if(d.shape==='flat')steeringTube(g,[[-.32,-.40],[.32,-.40],[.51,-.12],[.48,.23],[.27,.46],[0,.53],[-.27,.46],[-.48,.23],[-.51,-.12]],.065,m);
 else tube([[-.48,.24,0],[-.52,-.22,0],[0,-.39,0],[.52,-.22,0],[.48,.24,0]],.065,m,g);
 for(let n=0;n<d.spokes;n++){const a=n*Math.PI*2/d.spokes;const sp=mesh(new T.BoxGeometry(.39,.065,.05),rim,Math.cos(a)*.25,Math.sin(a)*.25,.015,g);sp.rotation.z=a;}
 const hub=mesh(new T.CylinderGeometry(.15,.15,.075,40),black,0,0,.05,g);hub.rotation.x=Math.PI/2;spade(.23,rim,0,-.015,.095,false,g);
 mesh(new T.BoxGeometry(.045,.09,.025),material('#ed5555',.1,.6),0,.51,.06,g);
 }
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
 const fasciaStart=car.children.length;
 const stockHeadlights=[];const fasciaVertices=[],fasciaIndices=[];
 for(let n=0;n<=48;n++){const a=-.92+n*1.84/48;for(const y of [.64,1.23])fasciaVertices.push(2.57-.28*(Math.sin(a)*1.25/1.1)**2,y,Math.sin(a)*1.25);}
 for(let n=0;n<48;n++){const k=n*2;fasciaIndices.push(k,k+2,k+1,k+1,k+2,k+3);}const fasciaGeo=new T.BufferGeometry();fasciaGeo.setAttribute('position',new T.Float32BufferAttribute(fasciaVertices,3));fasciaGeo.setIndex(fasciaIndices);fasciaGeo.computeVertexNormals();const fasciaMat=material('#00453f',.72,.14);fasciaMat.clearcoat=1;fasciaMat.side=T.DoubleSide;mesh(fasciaGeo,fasciaMat);
 for(const y of [.635,1.225]){const points=Array.from({length:65},(_,n)=>{const z=-1.04+n*2.08/64;return new T.Vector3(2.57-.28*(z/1.1)**2,y,z);});mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),80,.034,12,false),gold);}
 for(const sign of [-1,1]){const z=sign*1.0,x=2.57-.28*(z/1.1)**2;const bandCurve=new T.CatmullRomCurve3([new T.Vector3(x-.04,.635,z),new T.Vector3(x+.05,.78,z),new T.Vector3(x+.065,1.12,z),new T.Vector3(x-.04,1.25,z)]);mesh(new T.TubeGeometry(bandCurve,32,.065,12,false),gold);for(const y of [.91,1.065]){const points=Array.from({length:16},(_,n)=>{const z=sign*(.51+n*.41/15);return new T.Vector3(2.57-.28*(z/1.1)**2+.018,y,z);});stockHeadlights.push(mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),24,.017,8,false),light));}}
 // Shared card artwork keeps the option cards, garage and model in sync.
 const cardMats=[];for(let n=0;n<2;n++){const map=new T.CanvasTexture(G.cardCanvas(look.cards,n));map.colorSpace=T.SRGBColorSpace;map.anisotropy=16;const mat=new T.MeshBasicMaterial({map,transparent:true,toneMapped:false});cardMats.push(mat);const x=1.65,z=n? .34:-.34;const backing=box(.47,.008,.63,material('#ddd9cf',0,.95),x,1.474+n*.003,z);backing.rotation.y=-(n?-.08:.08);const card=mesh(new T.PlaneGeometry(.50,.67),mat,x,1.480+n*.003,z);card.rotation.x=-Math.PI/2;card.rotation.z=n?-.08:.08;card.castShadow=false;card.receiveShadow=false;}


 stockNoseParts.push(...car.children.slice(fasciaStart));
 const numberMat=new T.MeshStandardMaterial({map:new T.CanvasTexture(G.plateCanvas(look)),roughness:.6});
 for(const sign of [-1,1]){const plate=mesh(new T.PlaneGeometry(.79,.463),numberMat,sign*2.605,1.01,0);plate.rotation.y=sign*Math.PI/2;if(sign>0)stockNoseParts.push(plate);}

 // Finished hardware uses rolled edges, recessed inserts and visible mounting points.
 const hardware={},kitMetal=material('#7d8c98',.82,.28),kitDark=material('#202a32',.45,.38),mirrorGlass=material('#a7c6d5',.98,.055);
 const carbon=material('#182029',.35,.48);carbon.bumpMap=grain('#888888',.2);carbon.bumpScale=.001;
 function rounded(w,h,d,r,mat,x,y,z,parent){const geo=new T.ExtrudeGeometry(outline(w,h,r),{depth:d,bevelEnabled:true,bevelSize:Math.min(.012,d*.2),bevelThickness:Math.min(.012,d*.2),bevelSegments:3,curveSegments:12});geo.translate(0,0,-d/2);return mesh(geo,mat,x,y,z,parent);}
 function tube(points,r,mat,parent){return mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p))),40,r,12,false),mat,0,0,0,parent);}
 function fastener(x,y,z,parent){const bolt=mesh(new T.CylinderGeometry(.014,.014,.014,6),kitMetal,x,y,z,parent);bolt.rotation.x=Math.PI/2;}
 function wing(x,y,width,chord,mat,parent){
  // Cambered airfoil: a broad rounded nose tapers to a fine trailing edge.
  const profile=new T.Shape();profile.moveTo(-chord*.5,0);profile.bezierCurveTo(-chord*.52,.055,-chord*.12,.070,chord*.5,.008);profile.quadraticCurveTo(chord*.05,-.025,-chord*.5,0);
  const geo=new T.ExtrudeGeometry(profile,{depth:width,bevelEnabled:true,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});geo.translate(0,0,-width/2);const blade=mesh(geo,mat,x,y,0,parent);blade.rotation.z=-.08;return blade;
 }
 for(const kind of ['mirrors','frontBumper','rearBumper','sideSkirts','spoiler']){
  hardware[kind]={};
  for(const style of (kind==='spoiler'?['lip','sport','gt','double']:['club','sport','round','rally','aero'])){
   const group=new T.Group();car.add(group);hardware[kind][style]=group;
   const metal=['sport','aero'].includes(style)?carbon:kitMetal;
   if(kind==='spoiler'){
    const h=style==='lip'?1.43:style==='sport'?1.78:2.08,width=style==='gt'||style==='double'?1.98:1.72,x=-2.39;
    for(const z of [-.62,.62]){
     rounded(.25,.055,.22,.045,kitDark,-2.24,1.31,z,group);
     if(style!=='lip'){const post=rounded(.15,h-1.32,.065,.035,kitDark,-2.32,(h+1.32)/2,z,group);post.rotation.z=-.19;}
     for(const dz of [-.065,.065]){const bolt=mesh(new T.CylinderGeometry(.012,.012,.015,6),kitMetal,-2.24,1.35,z+dz,group);}
    }
    wing(x,h,width,style==='lip'?.22:.36,metal,group);
    if(style!=='lip')for(const sign of [-1,1]){const end=rounded(.43,.19,.025,.055,metal,x,h+.055,sign*width/2,group);end.rotation.z=-.12;fastener(x-.10,h+.045,sign*(width/2+.02),group);fastener(x+.10,h+.045,sign*(width/2+.02),group);}
    if(style==='double'){wing(x+.025,h+.24,width*.94,.27,carbon,group);for(const sign of [-1,1])rounded(.08,.28,.025,.02,kitDark,x,h+.13,sign*width*.47,group);}
    continue;
   }
   if(kind==='mirrors')for(const sign of [-1,1]){
    const compact=style==='aero',cy=compact?1.77:1.86,cz=sign*(compact?1.47:1.53),cx=.77;
    rounded(.18,.08,.15,.035,kitDark,.64,1.46,sign*1.19,group);
    tube([[.64,1.47,sign*1.19],[.62,1.62,sign*1.32],[cx,cy-.07,cz]],compact?.023:.029,metal,group);
    const ball=mesh(new T.SphereGeometry(.046,16,12),kitDark,cx,cy-.065,cz,group);
    if(style==='round'){
     const housing=mesh(new T.SphereGeometry(1,32,20),kitMetal,cx,cy,cz,group);housing.scale.set(.065,.15,.15);
     const glass=mesh(new T.CircleGeometry(.13,48),mirrorGlass,cx-.056,cy,cz,group);glass.rotation.y=-Math.PI/2;glass.castShadow=false;
     const ring=mesh(new T.TorusGeometry(.136,.009,8,48),kitMetal,cx-.060,cy,cz,group);ring.rotation.y=Math.PI/2;
    }else{
     const w=compact?.31:style==='sport'?.35:.38,h=compact?.16:.22;
     const housing=rounded(w,h,.095,.065,style==='club'?kitDark:carbon,cx,cy,cz,group);housing.rotation.y=Math.PI/2;
     const glass=mesh(new T.ShapeGeometry(outline(w-.045,h-.035,.05)),mirrorGlass,cx-.061,cy,cz,group);glass.rotation.y=-Math.PI/2;glass.castShadow=false;glass.receiveShadow=false;
     // Thin machined rim keeps the glass visibly seated inside its shell.
     const edge=outline(w-.028,h-.018,.055).getPoints(24).map(p=>[cx-.058,cy+p.y,cz+p.x]);edge.push(edge[0]);tube(edge,.006,kitMetal,group);
    }
   }else if(kind==='sideSkirts')for(const sign of [-1,1]){
    const skirt=rounded(2.30,style==='aero'?.17:.12,style==='rally'?.27:.13,.05,metal,0,.59,sign*1.24,group);
    if(style==='rally')for(const x of [-.84,-.42,0,.42,.84]){const tread=rounded(.13,.018,.25,.018,kitDark,x,.67,sign*1.24,group);}
    else tube([[-1.08,.54,sign*1.30],[0,.53,sign*1.32],[1.08,.54,sign*1.30]],.009,light,group);
    for(const x of [-.87,.87]){rounded(.12,.14,.16,.025,kitDark,x,.65,sign*1.20,group);fastener(x,.61,sign*1.33,group);}
    if(style==='aero')for(const x of [-.95,.95]){const fin=rounded(.24,.12,.025,.025,carbon,x,.57,sign*1.35,group);fin.rotation.z=x>0?.2:-.2;}
   }else{
    const sign=kind==='frontBumper'?1:-1;
    const path=[[sign*2.26,.66,-.92],[sign*2.58,.65,-.70],[sign*2.67,.65,0],[sign*2.58,.65,.70],[sign*2.26,.66,.92]];
    tube(path,style==='sport'?.061:.047,metal,group);
    for(const z of [-.67,.67]){tube([[sign*2.31,.74,z],[sign*2.50,.68,z]],.032,kitDark,group);const sleeve=rounded(.16,.12,.13,.035,kitDark,sign*2.51,.67,z,group);}
    if(style==='aero'){
     const splitter=rounded(.38,.045,1.94,.07,carbon,sign*2.48,.50,0,group);
     for(const z of [-.70,-.27,.27,.70])rounded(.27,.12,.022,.025,kitDark,sign*2.48,.55,z,group);
     tube([[sign*2.40,.52,-.91],[sign*2.64,.52,0],[sign*2.40,.52,.91]],.008,kitMetal,group);
    }
    if(style==='rally'){
     // Side guards protect the lights while leaving the plate opening clear.
     for(const z of [-.72,.72])tube([[sign*2.53,.65,z-.14],[sign*2.56,.94,z-.14],[sign*2.55,1.04,z],[sign*2.56,.94,z+.14],[sign*2.53,.65,z+.14]],.036,kitMetal,group);
    }
    if(style==='sport')for(const z of [-.67,.67]){const pad=rounded(.20,.13,.14,.045,kitDark,sign*2.56,.66,z,group);}
    if(kind==='rearBumper'&&style==='aero')for(const z of [-.70,-.35,0,.35,.70]){const diffuser=rounded(.27,.15,.025,.025,carbon,-2.46,.48,z,group);diffuser.rotation.z=.12;}
   }
  }
 }

 const lampWhite=material('#b9e4f5',.28,.17);lampWhite.emissive.set('#b9e4f5');lampWhite.emissiveIntensity=1.8;
 const lampWarm=material('#ffdda0',.2,.2);lampWarm.emissive.set('#ffe0a8');lampWarm.emissiveIntensity=1.25;

 // Sculpted lower aprons follow the curved nose and leave the plate and lights clear.
 for(const kind of ['frontBumper','rearBumper'])for(const [id,width,depth]of [['streetLow',2.10,.12],['driftWide',2.30,.16],['trackGT',2.22,.19]]){
  const group=new T.Group();car.add(group);hardware[kind][id]=group;const sign=kind==='frontBumper'?1:-1;
  const h=id==='trackGT'?.34:.29,cy=.59;
  const shape=outline(width,h,.10);
  for(const [z,w]of [[0,.94],[-.79,.32],[.79,.32]]){const hole=outline(w,.115,.045,T.Path);shape.holes.push(new T.Path(hole.getPoints(24).map(p=>new T.Vector2(p.x+z,p.y))));}
  const geo=new T.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelSize:.025,bevelThickness:.018,bevelSegments:4,curveSegments:32});
  const positions=geo.attributes.position;
  for(let n=0;n<positions.count;n++){const z=positions.getX(n),y=positions.getY(n),thickness=positions.getZ(n);positions.setXYZ(n,sign*(2.43+thickness-.24*(z/(width/2))**2),cy+y,z);}
  geo.computeVertexNormals();mesh(geo,paint,0,0,0,group);
  // Dark recessed grille, with fine horizontal slats behind the openings.
  for(const [z,w]of [[0,.94],[-.79,.32],[.79,.32]]){
   const x=sign*(2.43-.24*(z/(width/2))**2);
   rounded(.025,.14,w+.02,.04,black,x,cy,z,group);
   for(const dy of [-.032,.012,.045])rounded(.012,.006,w-.035,.003,kitDark,x+sign*.022,cy+dy,z,group);
  }
  const edge=Array.from({length:41},(_,n)=>{const z=-width/2+n*width/40;return [sign*(2.44+depth+.045-.24*(z/(width/2))**2),cy-h/2-.025,z];});
  tube(edge,id==='trackGT'?.028:.019,carbon,group);
  const lipGeo=new T.BufferGeometry(),verts=[],indices=[];
  for(const [x,y,z]of edge)verts.push(x,y,z,x-sign*.17,y+.005,z);
  for(let n=0;n<40;n++){const k=n*2;indices.push(k,k+1,k+2,k+1,k+3,k+2);}lipGeo.setAttribute('position',new T.Float32BufferAttribute(verts,3));lipGeo.setIndex(indices);lipGeo.computeVertexNormals();mesh(lipGeo,carbon,0,0,0,group);
  if(kind==='rearBumper')for(let n=0;n<(id==='trackGT'?5:3);n++){const z=(n-(id==='trackGT'?2:1))*.30;const fin=rounded(.24,.075,.014,.008,carbon,-2.48,cy-h/2-.035,z,group);fin.rotation.z=-.12;}
  else if(id==='trackGT')for(const z of [-.92,.92]){const fin=rounded(.18,.05,.018,.008,carbon,2.43,cy-h/2,z,group);fin.rotation.z=.08;}
 }
 // Integrated nose and swept airfoils replace the flat bumper bars.
 for(const id of ['formula','formulaPro','formulaElite']){const group=formulaFrontWing(id,{paint,carbon,metal:kitMetal,accent:gold});car.add(group);hardware.frontBumper[id]=group;}
 // High-level Formula aero: rear diffuser, sidepods and rear wings.
 for(const kind of ['rearBumper','sideSkirts','spoiler'])for(const id of ['formula','formulaPro']){const group=new T.Group();group.name=kind+'-'+id;car.add(group);hardware[kind][id]=group;const pro=id==='formulaPro';if(kind==='rearBumper'){rounded(.48,.16,pro?2.3:2.05,.03,carbon,-2.47,.45,0,group);for(let n=-3;n<=3;n++){const fin=rounded(.64,.23,.025,.01,carbon,-2.48,.44,n*.30,group);fin.rotation.z=-.15;}for(const sign of [-1,1])tube([[-2.2,.54,sign*1.0],[-2.65,.62,sign*1.10]],.025,paint,group);}else if(kind==='sideSkirts'){for(const sign of [-1,1]){const pod=rounded(2.35,pro?.42:.33,.34,.08,paint,-.15,.83,sign*1.30,group);pod.rotation.z=-.045;rounded(2.65,.055,.48,.025,carbon,-.06,.58,sign*1.30,group);rounded(.07,.21,.24,.035,black,.96,.87,sign*1.30,group);for(let n=0;n<(pro?3:1);n++)rounded(.35,.11,.025,.01,carbon,.48-n*.32,.65,sign*1.53,group);}}else{const height=pro?2.30:2.02,width=pro?2.36:2.16;for(const sign of [-1,1]){rounded(.10,height-.82,.09,.025,carbon,-2.23,(height+.82)/2,sign*.42,group);rounded(.54,.49,.035,.03,paint,-2.28,height-.04,sign*width/2,group);}wing(-2.26,height,width,.56,carbon,group);wing(-2.36,height-.18,width,.33,paint,group);if(pro)wing(-2.39,height-.31,width,.24,carbon,group);}}
 hardware.headlights={};
 for(const style of ['round','projector','rally','matrix']){
  const group=new T.Group();car.add(group);hardware.headlights[style]=group;
  for(const sign of [-1,1]){
   const z=sign*.74,x=2.57-.28*(z/1.1)**2+.07,y=1.075;
   if(style==='matrix'){
    const shell=rounded(.40,.20,.075,.045,kitDark,x,y,z,group);shell.rotation.y=Math.PI/2;
    const gasket=rounded(.35,.15,.01,.035,black,x+.05,y,z,group);gasket.rotation.y=Math.PI/2;
    for(let n=0;n<4;n++){const cell=rounded(.060,.10,.012,.017,lampWhite,x+.065,y,z-.128+n*.085,group);cell.rotation.y=Math.PI/2;cell.castShadow=false;}
   }else{
    const r=style==='rally'?.16:style==='round'?.14:.135;
    const shell=mesh(new T.CylinderGeometry(r+.027,r+.020,.095,48),kitDark,x,y,z,group);shell.rotation.z=Math.PI/2;
    const ring=mesh(new T.TorusGeometry(r+.008,.010,10,48),kitMetal,x+.054,y,z,group);ring.rotation.y=Math.PI/2;
    const lens=mesh(new T.SphereGeometry(1,32,20),style==='round'||style==='rally'?lampWarm:lampWhite,x+.055,y,z,group);lens.scale.set(.025,r,r);lens.castShadow=false;
    if(style==='projector'){const halo=mesh(new T.TorusGeometry(r*.80,.008,8,48),lampWhite,x+.076,y,z,group);halo.rotation.y=Math.PI/2;const projector=mesh(new T.SphereGeometry(1,24,16),mirrorGlass,x+.081,y,z,group);projector.scale.set(.022,r*.53,r*.53);}
    if(style==='rally')for(const offset of [-.07,0,.07]){const length=Math.sqrt(r*r-offset*offset);tube([[x+.09,y-length,z+offset],[x+.10,y,z+offset],[x+.09,y+length,z+offset]],.009,kitDark,group);}
   }
  }
 }

 // Street optics: housings, individual lenses, mounting brackets and light signatures.
 for(const [id,d]of Object.entries(G.streetHeadlights)){
  const group=new T.Group();car.add(group);hardware.headlights[id]=group;
  const beam=material(d.color,.12,.22);beam.emissive.set(d.color);beam.emissiveIntensity=d.smoke?.35:1.1;
  const lensMat=material(d.smoke?'#1c3348':'#83b6d5',.45,.12);
  for(const sign of [-1,1]){
   const z=sign*.72,x=2.57-.28*(z/1.1)**2+.07,y=1.075;
   if(d.shape==='sportHousing'){
    const profile=new T.Shape();profile.moveTo(-.29,.12);profile.lineTo(.23,.09);profile.quadraticCurveTo(.32,.02,.26,-.13);profile.lineTo(-.25,-.14);profile.closePath();
    const housing=mesh(new T.ExtrudeGeometry(profile,{depth:.09,bevelEnabled:true,bevelSize:.018,bevelThickness:.018,bevelSegments:3,steps:1}),kitDark,x+.02,y,z,group);housing.rotation.y=Math.PI/2;
    for(let n=0;n<2;n++){const zz=z+(n-.5)*.24;const lens=mesh(new T.SphereGeometry(1,24,16),lensMat,x+.13,y,zz,group);lens.scale.set(.022,.067,.067);
     if(d.signature==='rings'){const ring=mesh(new T.TorusGeometry(.086,.010,10,48),beam,x+.155,y,zz,group);ring.rotation.y=Math.PI/2;}
     if(d.signature==='doubleL')tube([[x+.155,y+.075,zz-.085],[x+.155,y-.075,zz-.085],[x+.155,y-.075,zz+.075]],.012,beam,group);
     if(d.signature==='pixels')for(let k=0;k<3;k++)mesh(new T.BoxGeometry(.014,.026,.026),beam,x+.155,y+.09,zz-.055+k*.055,group);
    }
    if(d.signature==='arc')tube([[x+.155,y-.09,z-.25],[x+.155,y+.10,z-.25],[x+.155,y+.12,z],[x+.155,y+.07,z+.25]],.012,beam,group);
    continue;
   }
   const casing=rounded(.47,.25,.10,.04,kitDark,x,y,z,group);casing.rotation.y=Math.PI/2;
   for(const zz of [-.18,.18]){mesh(new T.BoxGeometry(.10,.07,.035),kitMetal,x-.035,y-.15,z+zz,group);const bolt=mesh(new T.CylinderGeometry(.012,.012,.018,12),gold,x+.02,y-.13,z+zz,group);bolt.rotation.z=Math.PI/2;}
   if(['doubleU','brow','triBeam'].includes(d.shape)){
    const count=d.shape==='doubleU'?2:1;
    for(let n=0;n<count;n++){const zz=z+(n-(count-1)/2)*.21;const lens=mesh(new T.SphereGeometry(1,24,16),lensMat,x+.073,y,zz,group);lens.scale.set(.019,.067,.067);
     if(d.shape==='doubleU')tube([[x+.10,y+.075,zz-.08],[x+.10,y-.04,zz-.08],[x+.10,y-.08,zz-.045],[x+.10,y-.08,zz+.045],[x+.10,y-.04,zz+.08],[x+.10,y+.075,zz+.08]],.010,beam,group);
     else if(d.shape==='brow'){tube([[x+.10,y+.055,zz-.19],[x+.10,y+.093,zz-.14],[x+.10,y+.093,zz+.19]],.011,beam,group);const halo=mesh(new T.TorusGeometry(.068,.006,8,32),beam,x+.095,y-.015,zz,group);halo.rotation.y=Math.PI/2;}
     else for(let k=0;k<3;k++){const a=k*Math.PI*2/3-Math.PI/2;tube([[x+.102,y+Math.sin(a)*.025,zz+Math.cos(a)*.025],[x+.102,y+Math.sin(a)*.10,zz+Math.cos(a)*.10]],.011,beam,group);}
    }continue;
   }
   if(d.shape==='bar'){for(const [dy,w,h]of [[.035,.41,.025],[-.045,.33,.012]]){const strip=rounded(w,h,.014,.006,beam,x+.064,y+dy,z,group);strip.rotation.y=Math.PI/2;strip.castShadow=false;}continue;}
   if(d.shape==='square'){const glass=rounded(.37,.17,.024,.015,beam,x+.065,y,z,group);glass.rotation.y=Math.PI/2;for(let n=0;n<7;n++)mesh(new T.BoxGeometry(.006,.16,.004),lensMat,x+.082,y,z-.15+n*.05,group);continue;}
   const radius=d.count===3?.062:d.count===2?.087:.106;
   for(let n=0;n<d.count;n++){
    const zz=z+(n-(d.count-1)/2)*(d.count===3?.14:.205);
    const cup=mesh(new T.CylinderGeometry(radius+.014,radius+.02,.09,d.shape==='hex'?6:40),black,x+.035,y,zz,group);cup.rotation.z=Math.PI/2;
    const outer=mesh(new T.TorusGeometry(radius,.009,8,d.shape==='hex'?6:48),beam,x+.09,y,zz,group);outer.rotation.y=Math.PI/2;outer.castShadow=false;
    const lens=mesh(new T.SphereGeometry(1,24,16),d.projector?lensMat:beam,x+.077,y,zz,group);lens.scale.set(.018,radius*.74,radius*.74);lens.castShadow=false;
    if(d.projector){const core=mesh(new T.SphereGeometry(1,16,12),beam,x+.092,y,zz,group);core.scale.set(.006,radius*.31,radius*.31);}
    if(d.cross||d.guard)for(const slope of [-1,1])tube([[x+.11,y-radius*.74,zz-slope*radius*.74],[x+.115,y,zz],[x+.11,y+radius*.74,zz+slope*radius*.74]],.009,kitDark,group);
   }
  }
 }
 // Fenders follow the unsprung wheels, retaining tyre clearance at every ride height.
 const wheelFenders={};
 for(const style of ['club','sport','rally','chrome']){
  const parts=[];wheelFenders[style]=parts;
  for(const {wheelGroup,sign} of wheelSpecs){
   const group=new T.Group();wheelGroup.add(group);parts.push(group);
   const radius=style==='rally'?.91:.87,width=style==='rally'?.64:style==='sport'?.49:.57,span=style==='sport'?1.00:1.23;
   const verts=[],indices=[];for(let n=0;n<=48;n++){const a=-span+n*span*2/48;for(const z of [-width/2,width/2])verts.push(Math.sin(a)*radius,Math.cos(a)*radius,z);}
   for(let n=0;n<48;n++){const k=n*2;indices.push(k,k+1,k+2,k+1,k+3,k+2);}
   const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(verts,3));geo.setIndex(indices);geo.computeVertexNormals();
   const mat=style==='chrome'?kitMetal:style==='club'?paint:carbon;const coverMat=mat.clone();coverMat.side=T.DoubleSide;mesh(geo,coverMat,0,0,0,group);
   for(const side of [-1,1]){const path=Array.from({length:49},(_,n)=>{const a=-span+n*span*2/48;return [Math.sin(a)*radius,Math.cos(a)*radius,side*width/2];});tube(path,.012,style==='chrome'?kitMetal:kitDark,group);}
   // Brackets meet the axle on the inner side, away from the wheel face.
   for(const dir of [-1,1]){tube([[0,0,-sign*.28],[dir*.28,.42,-sign*.31],[dir*.49,.68,-sign*.31]],.022,kitDark,group);fastener(dir*.49,.68,-sign*.32,group);}
   if(style==='rally'){const flap=rounded(.13,.25,width*.90,.025,kitDark,-.83,.20,0,group);}
   group.userData.shell=coverMat;
  }
 }

 // Swept compound curvature keeps the screen ahead of the steering wheel.
 hardware.windshield={};
 for(const [style,height,tint,opacity] of [['deflector',.30,'#b6e3eb',.18],['sport',.59,'#a9d5e7',.23],['touring',.88,'#c1e3ed',.17],['smoke',.70,'#455f7a',.40],['iridium',.82,'#8b8dc3',.30],['highClear',1.15,'#c5e8ef',.18],['highSmoke',1.28,'#597187',.38],['grandTour',1.50,'#b8e0e9',.20],['highIridium',1.40,'#9d91ce',.30]]){
  const group=new T.Group();car.add(group);hardware.windshield[style]=group;
  function point(u,t){const width=.92*(1-.13*t),arch=1-u*u;return [1.97+.23*arch-height*.32*t,1.50+height*t*(.84+.16*arch),u*width];}
  const verts=[],indices=[],cols=40,rows=16;
  for(let j=0;j<=rows;j++)for(let i=0;i<=cols;i++)verts.push(...point(-1+i*2/cols,j/rows));
  for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const k=j*(cols+1)+i;indices.push(k,k+1,k+cols+1,k+1,k+cols+2,k+cols+1);}
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(verts,3));geo.setIndex(indices);geo.computeVertexNormals();
  const glass=new T.MeshPhysicalMaterial({color:tint,metalness:.05,roughness:.075,transparent:true,opacity,depthWrite:false,side:T.DoubleSide,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:.65});
  group.userData.glass=glass;group.userData.originalTint={color:tint,opacity};const pane=mesh(geo,glass,0,0,0,group);pane.castShadow=false;pane.receiveShadow=false;pane.renderOrder=3;
  const frame=['smoke','highSmoke'].includes(style)?kitDark:kitMetal;
  for(const t of [0,1])tube(Array.from({length:41},(_,i)=>point(-1+i/20,t)),t===0?.017:.009,frame,group);
  for(const u of [-1,1]){
   tube(Array.from({length:17},(_,i)=>point(u,i/16)),.011,frame,group);
   const p=point(u,0);rounded(.19,.055,.14,.025,kitDark,p[0],p[1]-.025,p[2],group);
   const bolt=mesh(new T.CylinderGeometry(.013,.013,.018,6),kitMetal,p[0]+.04,p[1]+.014,p[2],group);
  }
  // Short curved glints describe the glazing without obscuring the forward view.
  const glint=new T.MeshBasicMaterial({color:'#ddf4ff',transparent:true,opacity:.20,depthWrite:false});
  for(const u of [-.77,-.69]){const pts=Array.from({length:13},(_,i)=>{const p=point(u,.18+i*.058);p[0]+=.004;return p;});const edge=tube(pts,.003,glint,group);edge.castShadow=false;edge.receiveShadow=false;edge.renderOrder=4;}
 }
 const sprungBody=new T.Group();
 for(const child of car.children.slice())if(!child.userData.groundWheel)sprungBody.add(child);
 car.add(sprungBody);
 const springSteel=material('#b8c7d6',.72,.27),springs=new T.Group(),suspensionUnits=[];car.add(springs);
 for(const x of [-1.72,1.72])for(const sign of [-1,1]){
  const unit=new T.Group();unit.position.set(x,.52,sign*1.12);springs.add(unit);
  const points=Array.from({length:193},(_,n)=>{const t=n/192,a=t*Math.PI*14;return new T.Vector3(Math.cos(a)*.071,.055+t*.36,Math.sin(a)*.071);});
  const coil=mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),192,.014,10,false),springSteel,0,0,0,unit);
  mesh(new T.CylinderGeometry(.039,.039,.23,24),kitDark,0,.14,0,unit);
  const rod=mesh(new T.CylinderGeometry(.018,.018,.28,20),kitMetal,0,.34,0,unit);
  const upper=new T.Group();upper.position.y=.47;unit.add(upper);
  for(const [parent,y] of [[unit,.04],[upper,-.015]]){mesh(new T.CylinderGeometry(.095,.095,.026,32),kitMetal,0,y,0,parent);mesh(new T.CylinderGeometry(.068,.068,.018,24),kitDark,0,y+.02,0,parent);}
  mesh(new T.BoxGeometry(.14,.075,.18),kitDark,0,.025,sign*.035,unit);
  mesh(new T.BoxGeometry(.16,.075,.22),kitDark,0,0,-sign*.075,upper);
  const armA=new T.Vector3(x,.56,sign*1.12),armB=new T.Vector3(x,.81,sign*1.43),direction=armB.clone().sub(armA);
  const arm=mesh(new T.CylinderGeometry(.026,.026,direction.length(),16),kitDark,...armA.clone().add(armB).multiplyScalar(.5).toArray(),springs);arm.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),direction.normalize());
  suspensionUnits.push({coil,rod,upper});
 }


 hardware.brakes={};for(const id of ['stock','red','gold','ceramic']){const group=new T.Group();car.add(group);hardware.brakes[id]=group;
 for(const {wheelGroup,sign} of wheelSpecs){const assembly=sportBrakes(id);assembly.position.z=sign*.165;if(sign<0)assembly.rotation.y=Math.PI;wheelGroup.add(assembly);group.userData.brakeAssemblies??=[];group.userData.brakeAssemblies.push(assembly);}
 }

 // Machined N2O cylinders on a bolted cradle, with a shared feed manifold.
 hardware.nitrous={};
 const labelCanvas=document.createElement('canvas');labelCanvas.width=512;labelCanvas.height=256;const lc=labelCanvas.getContext('2d');lc.fillStyle='#101923';lc.fillRect(0,0,512,256);lc.strokeStyle='#e8e1cc';lc.lineWidth=8;lc.strokeRect(10,10,492,236);lc.fillStyle='#f5f2e8';lc.textAlign='center';lc.font='italic bold 106px Arial';lc.fillText('N₂O',256,117);lc.font='bold 24px Arial';lc.fillText('NITROUS OXIDE',256,159);lc.fillStyle='#d9b36b';lc.font='bold 18px Arial';lc.fillText('RACING SYSTEM · 2.5 LB',256,195);for(let n=0;n<42;n++)lc.fillRect(165+n*4,212,(n%3)+1,17);
 const labelTexture=new T.CanvasTexture(labelCanvas);labelTexture.colorSpace=T.SRGBColorSpace;labelTexture.anisotropy=8;
 const gaugeCanvas=document.createElement('canvas');gaugeCanvas.width=gaugeCanvas.height=128;const gc=gaugeCanvas.getContext('2d');gc.fillStyle='#eee9dc';gc.fillRect(0,0,128,128);gc.translate(64,64);gc.strokeStyle='#17202a';for(let n=0;n<=20;n++){const a=-Math.PI*.8+n*Math.PI*1.6/20;gc.lineWidth=n%5?2:4;gc.beginPath();gc.moveTo(Math.sin(a)*43,-Math.cos(a)*43);gc.lineTo(Math.sin(a)*(n%5?49:53),-Math.cos(a)*(n%5?49:53));gc.stroke();}gc.fillStyle='#293541';gc.textAlign='center';gc.font='bold 14px Arial';gc.fillText('PSI',0,30);gc.strokeStyle='#c92737';gc.lineWidth=4;gc.beginPath();gc.moveTo(-9,12);gc.lineTo(26,-31);gc.stroke();gc.fillStyle='#25313a';gc.beginPath();gc.arc(0,0,6,0,Math.PI*2);gc.fill();const gaugeTexture=new T.CanvasTexture(gaugeCanvas);gaugeTexture.colorSpace=T.SRGBColorSpace;
 for(const id of ['blue','twin','triple']){const group=new T.Group();group.name='nitrous-'+id;car.add(group);hardware.nitrous[id]=group;const color=material(G.item('nitrous',id).color,.65,.27),count=id==='triple'?3:id==='twin'?2:1,cy=1.49,cx=-1.30,spacing=.37;
 const brass=material('#b4924f',.8,.3),steel=material('#a5b2bd',.85,.24),hose=material('#1b2028',.08,.85),red=material('#ab2635',.35,.4);
 for(const xx of [-1.52,-1.13]){rounded(.095,.05,count*spacing+.04,.015,black,xx,1.29,0,group);for(const sign of [-1,1]){const z=sign*(count*spacing/2-.02);mesh(new T.CylinderGeometry(.024,.024,.023,6),steel,xx,1.327,z,group);}}
 for(let n=0;n<count;n++){const z=(n-(count-1)/2)*spacing;
 // Lathed pressure vessel: rounded base, straight barrel, shoulder and narrow neck.
 const profile=[ [0,-.40],[.075,-.395],[.12,-.37],[.144,-.32],[.145,-.26],[.145,.20],[.14,.25],[.12,.29],[.085,.32],[.045,.34],[.041,.385],[0,.385] ].map(([r,y])=>new T.Vector2(r,y));
 const bottle=mesh(new T.LatheGeometry(profile,40),color,cx,cy,z,group);bottle.rotation.z=-Math.PI/2;
 for(const xx of [-1.52,-1.13]){rounded(.11,.095,.27,.025,hose,xx,1.35,z,group);const strap=mesh(new T.TorusGeometry(.152,.013,8,40),steel,xx,cy,z,group);strap.rotation.y=Math.PI/2;rounded(.08,.025,.055,.008,steel,xx,cy+.155,z,group);mesh(new T.CylinderGeometry(.013,.013,.018,6),black,xx,cy+.179,z,group);}
 // Curved top label follows the barrel instead of hovering above it.
 const positions=[],uvs=[],indices=[];for(let row=0;row<2;row++)for(let j=0;j<=16;j++){const a=-.91+j*1.82/16;positions.push(cx+(row? .12:-.12),cy+Math.cos(a)*.147,z+Math.sin(a)*.147);uvs.push(row,j/16);if(row&&j){const k=17+j;indices.push(k-18,k-17,k,k-18,k,k-1);}}const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uvs,2));geo.setIndex(indices);geo.computeVertexNormals();const lm=new T.MeshPhysicalMaterial({map:labelTexture,roughness:.55,metalness:.05,side:T.DoubleSide});mesh(geo,lm,0,0,0,group);
 const neck=mesh(new T.CylinderGeometry(.046,.046,.055,24),brass,-.89,cy,z,group);neck.rotation.z=Math.PI/2;rounded(.075,.07,.065,.012,brass,-.845,cy,z,group);
 mesh(new T.CylinderGeometry(.016,.016,.065,16),steel,-.845,cy+.045,z,group);const wheel=mesh(new T.TorusGeometry(.052,.012,8,24),red,-.845,cy+.092,z,group);wheel.rotation.x=Math.PI/2;for(const a of [0,Math.PI/3,Math.PI*2/3]){const spoke=rounded(.106,.014,.014,.004,red,-.845,cy+.092,z,group);spoke.rotation.y=a;}
 // Angled gauge, legible from the normal orbit camera and from above.
 const gauge=new T.Group();gauge.position.set(-.84,cy+.065,z+.075);gauge.rotation.x=-Math.PI*.32;group.add(gauge);const housing=mesh(new T.CylinderGeometry(.057,.057,.03,32),steel,0,0,0,gauge);housing.rotation.x=Math.PI/2;const face=mesh(new T.CircleGeometry(.047,32),new T.MeshBasicMaterial({map:gaugeTexture}),0,0,.017,gauge);
 const fitting=mesh(new T.CylinderGeometry(.024,.024,.055,6),brass,-.79,cy,z,group);fitting.rotation.z=Math.PI/2;tube([[-.76,cy,z],[-.70,cy-.02,z],[-.71,1.30,z],[-.91,1.24,z]],.014,hose,group);const ferrule=mesh(new T.CylinderGeometry(.021,.021,.055,12),steel,-.74,cy,z,group);ferrule.rotation.z=Math.PI/2;
 }
 rounded(.07,.07,count*spacing,.015,brass,-.91,1.24,0,group);tube([[-.91,1.24,0],[-.66,1.16,.12],[-.20,1.10,.39],[.46,1.11,.49]],.016,hose,group);
 }
 hardware.seat={};for(const id of ['red','carbon','emerald','ivory']){const seat=sportSeat(id);seat.rotation.y=Math.PI/2;seat.position.set(-.80,1.00,0);car.add(seat);hardware.seat[id]=seat;}
 const formulaBody=formulaBodyTransition(stockNoseParts);
 function update(v){const formulaActive=['formula','formulaPro','formulaElite'].includes(v.frontBumper);formulaBody.set(formulaActive);updateVinyl(v);const tint=G.glassTints[v.glassTint]||G.glassTints.original;for(const g of Object.values(hardware.windshield)){const original=g.userData.originalTint;g.userData.glass.color.set(tint.opacity===null?original.color:tint.color);g.userData.glass.opacity=tint.opacity??original.opacity;}const wheelFactor={standard:1,large:1.15,max:1.25}[v.wheelSize]||1,wheelLift=(wheelFactor-1)*(.715/.86);const widthFactor={standard:1,wide:1.25,ultra:1.45}[v.tyreWidth]||1;for(const {wheelGroup,sign,tyres}of wheelSpecs){wheelGroup.scale.set(.88/1.24*wheelFactor,.88/.86*wheelFactor,widthFactor/.95);wheelGroup.position.y=.715/.86*wheelFactor;wheelGroup.position.z=sign*(1.36+.25*(widthFactor-1));for(const [id,parts]of Object.entries(tyres))for(const part of parts)part.visible=id===(v.tyres||'standard');}const lift=wheelLift+({standard:0,raised:.20,comfort:.12,high:.38,rally:.48,extreme:.60}[v.suspension]||0);for(const [kind,variants]of Object.entries(hardware))if(kind!=='brakes')for(const group of Object.values(variants))if(group.parent===car){group.userData.mountBaseY??=group.position.y;group.position.y=group.userData.mountBaseY+lift;}stockHeadlights.forEach(o=>o.visible=!v.headlights||v.headlights==='classic');for(const [id,parts] of Object.entries(wheelFenders))for(const part of parts){part.visible=v.fenders===id;if(id==='club')part.userData.shell.color.set(G.item('paint',v.paint).color);}springSteel.color.set(G.item('suspension',v.suspension).color);sprungBody.position.y=lift;springs.visible=lift>0;suspensionUnits.forEach(({coil,rod,upper})=>{coil.scale.y=1+lift/.415;rod.scale.y=1+lift/.28;rod.position.y=.34+lift/2;upper.position.y=.47+lift;});for(const [kind,variants] of Object.entries(hardware))for(const [id,group] of Object.entries(variants))group.visible=v[kind]===id;if(formulaActive)Object.values(hardware.headlights).forEach(g=>g.visible=false);for(const [id,g]of Object.entries(hardware.brakes))for(const a of g.userData.brakeAssemblies||[])a.visible=(v.brakes||'stock')===id;Object.entries(steeringVariants).forEach(([id,g])=>g.visible=id===(v.steering||'classic'));Object.entries(exhaustGroups).forEach(([id,g])=>g.visible=id===(v.exhaust||'classic'));boostHousing.visible=v.turbine==='boost';const twin=['twin','twinBig'].includes(v.turbine),largeTwin=v.turbine==='twinBig',fanScale=largeTwin?.90:twin?.52:v.turbine==='boost'?.96:.90;turbineGroup.scale.set(fanScale/1.24,fanScale/.86,fanScale/.95);turbineGroup.position.set(tx,ty+(largeTwin?.06:twin?-.20:-.04),twin?(largeTwin?-.70:-.44):0);secondTurbine.visible=twin;secondTurbine.scale.copy(turbineGroup.scale);secondTurbine.position.set(tx,ty+(largeTwin?.06:-.20),largeTwin?.70:.44);const badges=v.badges||[];badgeSupports.forEach(o=>o.visible=!badges.length);plaqueMaterials.forEach(m=>m.userData.plane.visible=!badges.length);carBadges.forEach(({group,mat,back,n})=>{const id=badges[n];group.visible=!!id;const badgeKey=id+':'+(v.prizeTotal||0);if(!id||mat.userData.badge===badgeKey)return;const shape=new T.Shape(),unit=.65/512;const point=(x,y)=>[(x-256)*unit,(256-y)*unit];
 if(id==='millionaire'||id==='day-hero'){shape.absarc(0,0,204*unit,0,Math.PI*2,false);}
 else if(id==='rating-top10'){for(let j=0;j<6;j++){const a=j*Math.PI/3-Math.PI/2,p=point(256+Math.cos(a)*215,256+Math.sin(a)*215);j?shape.lineTo(...p):shape.moveTo(...p);}shape.closePath();}
 else{shape.moveTo(...point(80,88));shape.quadraticCurveTo(...point(256,0),...point(432,88));shape.lineTo(...point(420,296));shape.quadraticCurveTo(...point(390,400),...point(256,465));shape.quadraticCurveTo(...point(122,400),...point(92,296));shape.closePath();}
 back.geometry.dispose();back.geometry=new T.ExtrudeGeometry(shape,{depth:.025,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.008,bevelThickness:.008,curveSegments:24});
 mat.map?.dispose();mat.map=new T.CanvasTexture(G.badgeCanvas(id,v));mat.map.colorSpace=T.SRGBColorSpace;mat.map.anisotropy=16;mat.emissive.set('#ffffff');mat.emissiveMap=mat.map;mat.emissiveIntensity=.35;mat.userData.badge=badgeKey;mat.needsUpdate=true;});paint.color.set(G.item('paint',v.paint).color);felt.color.copy(paint.color).multiplyScalar(.45);rim.color.set(G.wheelPaintColor(v));
 if(wheelStyle!==v.wheels){for(const spoke of spokes){spoke.removeFromParent();spoke.geometry.dispose();}spokes.length=0;car.updateMatrixWorld(true);for(const {wheelGroup,x,out,sign} of wheelSpecs)for(const points of G.wheelDesign(v.wheels)){const path=new T.CatmullRomCurve3(points.map(([xx,yy])=>new T.Vector3(xx,yy,sign*(.25+.025*(1-Math.hypot(xx,yy)/.51)))));const spoke=mesh(new T.TubeGeometry(path,20,({bronzeSix:.024,deepFive:.038,muscleFive:.045,triBlade:.065,turbofan:.024,splitY:.018,concaveTen:.018}[v.wheels]||(['fiveSpoke','legend'].includes(v.wheels)?.023:.009)),8,false),rim,0,0,0,wheelGroup);spokes.push(spoke);}wheelStyle=v.wheels;}
 gold.color.set(G.item('trim',v.trim).color);gold.roughness=['brushedSteel','gunmetal','satinNickel'].includes(v.trim)?.48:['cobalt','anodizedRed','champagne'].includes(v.trim)?.3:.135;gold.metalness=.95;if(leather.userData.style!==v.upholstery){leather.map?.dispose();leather.map=new T.CanvasTexture(G.upholsteryCanvas(v.upholstery));leather.map.colorSpace=T.SRGBColorSpace;leather.map.wrapS=leather.map.wrapT=T.RepeatWrapping;leather.map.repeat.set(12,2);leather.color.set('#ffffff');leather.roughness=['alcantara','blueSuede','greenSuede'].includes(v.upholstery)?.95:v.upholstery==='carbonWeave'?.28:.38;leather.userData.style=v.upholstery;leather.needsUpdate=true;}G.chipPalette(v.chips).forEach((color,n)=>{chipMats[n].color.set(color);chipMats[n].roughness=v.chips==='ceramic'?.25:.55;});chipEdges.forEach(o=>o.visible=v.chips!=='ceramic');chipTops.forEach(({mat,n})=>{if(mat.userData.style===v.chips)return;mat.map?.dispose();mat.map=new T.CanvasTexture(G.chipCanvas(v.chips,n));mat.map.colorSpace=T.SRGBColorSpace;mat.map.anisotropy=8;mat.userData.style=v.chips;mat.needsUpdate=true;});cardMats.forEach((m,n)=>{if(m.userData.style===v.cards)return;m.map?.dispose();m.map=new T.CanvasTexture(G.cardCanvas(v.cards,n));m.map.colorSpace=T.SRGBColorSpace;m.map.anisotropy=16;m.userData.style=v.cards;m.needsUpdate=true;});spokes.forEach(o=>o.visible=true);faces.forEach(o=>o.visible=true);light.color.set(G.item('light',v.light).color);light.emissive.copy(light.color);fanMetal.color.copy(light.color).multiplyScalar(.075);fanMetal.emissive.copy(light.color);fanMetal.emissiveIntensity=.045;if(numberMat.userData.number!==v.number+v.region){numberMat.map?.dispose();numberMat.map=new T.CanvasTexture(G.plateCanvas(v));numberMat.userData.number=v.number+v.region;numberMat.needsUpdate=true;}}
 // Continuous neon rails sit beneath the sills, independent of the room lights.
 for(const sign of [-1,1]){tube([[-1.64,.43,sign*.94],[0,.40,sign*1.02],[1.66,.43,sign*.94]],.027,light,sprungBody);tube([[sign*1.91,.43,-.66],[sign*2.05,.43,0],[sign*1.91,.43,.66]],.023,light,sprungBody);}
 const fanGlow=new T.PointLight(light.color,.45,2,2);fanGlow.position.set(-1.9,2,.48);sprungBody.add(fanGlow);
 const oldUpdate=update;function updateLit(v){oldUpdate(v);fanGlow.color.copy(light.color);}
 updateLit(look);return {car,update:updateLit};
}
window.pokerCreateGarage3D=function(host,look,state={}){
 let renderer;try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch(_){host.textContent='3D-просмотр недоступен на этом устройстве';return null;}
 renderer.setPixelRatio(state.snapshotOnly?1:Math.min(window.devicePixelRatio||1,2));renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;host.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-label','Объёмная машина: потяните, чтобы повернуть');renderer.domElement.setAttribute('role','img');
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(state.snapshotOnly?25:35,1,.1,60);camera.zoom=state.previewScale||1;scene.add(new T.HemisphereLight('#c6d9ef','#44311e',1.25));
 for(const [color,intensity,x,y,z] of [['#fff0d0',4,1,6,5],['#9dcfff',2,-4,3,-3],['#ffffff',1.5,0,5,-4]]){const l=new T.DirectionalLight(color,intensity);l.position.set(x,y,z);l.castShadow=color==='#fff0d0';l.shadow.bias=-.0002;l.shadow.normalBias=.025;l.shadow.mapSize.set(2048,2048);l.shadow.camera.left=-5;l.shadow.camera.right=5;l.shadow.camera.top=5;l.shadow.camera.bottom=-5;scene.add(l);}
 const studio=new T.Scene();studio.background=new T.Color('#48505b');for(const [x,y,z,w,h,d] of [[0,5,0,7,.1,2],[4,2,0,.1,3,1.3],[-4,3,-2,.1,2,5],[0,2,-5,6,1,.1],[0,1.5,5,6,.35,.1]]){const p=new T.Mesh(new T.BoxGeometry(w,h,d),new T.MeshBasicMaterial({color:'#ffffff'}));p.position.set(x,y,z);studio.add(p);}const pmrem=new T.PMREMGenerator(renderer),env=pmrem.fromScene(studio,.05);scene.environment=env.texture;scene.environmentIntensity=1.5;studio.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});pmrem.dispose();
 const ground=new T.Mesh(new T.PlaneGeometry(30,30),new T.ShadowMaterial({opacity:.34}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);const model=makeModel(scene,look);
 const glowMat=new T.ShaderMaterial({transparent:true,depthWrite:false,side:T.DoubleSide,toneMapped:false,uniforms:{color:{value:new T.Color(window.PokerGarage.item('light',look.light).color)},strength:{value:1}},vertexShader:'varying vec2 p;void main(){p=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec2 p;uniform vec3 color;uniform float strength;void main(){float d=pow(abs(p.x),4.)+pow(abs(p.y),4.);float halo=exp(-d*4.5);float core=exp(-d*16.);float a=(halo*.44+core*.18)*strength;gl_FragColor=vec4(color,a);}' });
 const floorGlow=new T.Mesh(new T.PlaneGeometry(7.5,4.5),glowMat);floorGlow.rotation.x=-Math.PI/2;floorGlow.position.y=.014;floorGlow.renderOrder=1;scene.add(floorGlow);
 const underLights=[];for(const z of [-.9,.9]){const lamp=new T.PointLight(glowMat.uniforms.color.value,1.8,3,2);lamp.position.set(0,.32,z);scene.add(lamp);underLights.push(lamp);}
 const room=host.closest('.player-hall__room');state.night??=room?.dataset.theme==='midnight';
 function setNight(night){state.night=!!night;for(const light of scene.children){if(light.isHemisphereLight)light.intensity=night?.26:1.25;if(light.isDirectionalLight){light.userData.dayIntensity??=light.intensity;light.intensity=light.userData.dayIntensity*(night?.13:1);}}scene.environmentIntensity=night?.24:1.5;glowMat.uniforms.strength.value=night?1.35:.95;}
 setNight(state.night);
 const onRoomLight=event=>{if(room)setNight(room.dataset.theme==='midnight');};window.addEventListener('poker-garage-lighting',onRoomLight);
 const updateLook=v=>{model.update(v);glowMat.uniforms.color.value.set(window.PokerGarage.item('light',v.light).color);underLights.forEach(l=>l.color.copy(glowMat.uniforms.color.value));};
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
 function dispose(){if(disposed)return;disposed=true;window.removeEventListener('poker-garage-lighting',onRoomLight);cancelAnimationFrame(raf);resize.disconnect();host.removeEventListener('keydown',key);host.removeEventListener('pointerdown',down);host.removeEventListener('pointermove',move);host.removeEventListener('pointerup',up);host.removeEventListener('pointercancel',up);host.removeEventListener('lostpointercapture',up);const textures=new Set(),materials=new Set(),geometries=new Set();scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)materials.add(o.material);});materials.forEach(m=>{for(const value of Object.values(m))if(value&&value.isTexture)textures.add(value);m.dispose();});textures.forEach(t=>t.dispose());geometries.forEach(g=>g.dispose());env.dispose();target.dispose();postMat.dispose();postQuad.geometry.dispose();renderer.dispose();if(state.snapshotOnly)renderer.forceContextLoss();renderer.domElement.remove();}
 function tick(time){if(disposed)return;if(!host.isConnected||(host.closest('dialog')&&!host.closest('dialog').open)){dispose();return;}const dt=last?Math.min(.05,(time-last)/1000):0;last=time;if(!document.hidden&&host.getBoundingClientRect().bottom>0){if(!state.manual)state.yaw+=dt*.13;const distance=Math.max(state.snapshotOnly?13:9,3.6/(Math.tan(camera.fov*Math.PI/360)*camera.aspect));camera.position.set(Math.sin(state.yaw)*Math.cos(state.pitch)*distance,1.15+Math.sin(state.pitch)*distance,Math.cos(state.yaw)*Math.cos(state.pitch)*distance);camera.lookAt(0,1.2,0);drawFrame();host.dataset.yaw=state.yaw.toFixed(4);host.dataset.pitch=state.pitch.toFixed(4);host.dataset.manual=String(state.manual);}raf=requestAnimationFrame(tick);}
 if(!state.snapshotOnly)raf=requestAnimationFrame(tick);return {update:updateLook,setNight,dispose,state,snapshot(){const distance=Math.max(state.snapshotOnly?13:9,3.6/(Math.tan(camera.fov*Math.PI/360)*camera.aspect));camera.position.set(Math.sin(state.yaw)*Math.cos(state.pitch)*distance,1.15+Math.sin(state.pitch)*distance,Math.cos(state.yaw)*Math.cos(state.pitch)*distance);camera.lookAt(0,1.2,0);drawFrame();const image=document.createElement('canvas');image.width=renderer.domElement.width;image.height=renderer.domElement.height;image.getContext('2d').drawImage(renderer.domElement,0,0);return image;}};
};
