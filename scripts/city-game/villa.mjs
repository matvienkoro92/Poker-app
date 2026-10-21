import * as T from '../../vendor/three/three.module.min.js';
import {VILLA,villaPoint,villaInteriorAt} from './world.mjs';
import {furnishVilla} from './villa-details.mjs';
import {villaMaterials} from './villa-materials.mjs';
import {loadHallFurniture} from './interior-assets.mjs';
import {finishHall} from './hall-finishes.mjs';
import {createInteriorProximity} from './interior-proximity.mjs';
// The existing coastal villa is built as actual rooms, with an exterior roof.
export function buildVilla({scene,textures,label,box:rawBox,cylinder:rawCylinder,batch,hall}){
 const worldBox=(c,x,y,z,...args)=>rawBox(c,x+VILLA.x-98,y,z+VILLA.z-40,...args),worldCylinder=(c,x,y,z,...args)=>rawCylinder(c,x+VILLA.x-98,y,z+VILLA.z-40,...args);
 const root=new T.Group();root.name='Two Aces villa';root.position.set(VILLA.x,0,VILLA.z);root.rotation.y=-Math.PI/2;scene.add(root);
 const m=villaMaterials(textures),bins=new Map(),geos={box:new T.BoxGeometry(1,1,1),cyl:new T.CylinderGeometry(1,1,1,20),ball:new T.SphereGeometry(1,16,10),torus:new T.TorusGeometry(1,.12,8,24)},dummy=new T.Object3D();
 // Rounded timber/leather pieces keep a furniture silhouette instead of stacked cubes.
 const soft=new T.BoxGeometry(1,1,1,4,4,4),points=soft.attributes.position;
 for(let i=0;i<points.count;i++){const p=new T.Vector3().fromBufferAttribute(points,i),core=p.clone().clampScalar(-.38,.38),edge=p.sub(core).normalize().multiplyScalar(.12).add(core);points.setXYZ(i,edge.x,edge.y,edge.z);}soft.computeVertexNormals();geos.soft=soft;
 // Curved pointed leaves replace the old inflated oval foliage.
 const leafPositions=[],leafUV=[];
 for(let i=0;i<10;i++){const a=i/10,b=(i+1)/10;const edge=t=>[Math.sin(t*Math.PI)*.48,t,Math.sin(t*Math.PI)*.19];const p=edge(a),q=edge(b);leafPositions.push(-p[0],p[1],p[2],-q[0],q[1],q[2],q[0],q[1],q[2],-p[0],p[1],p[2],q[0],q[1],q[2],p[0],p[1],p[2]);leafUV.push(0,a,0,b,1,b,0,a,1,b,1,a);}
 geos.leaf=new T.BufferGeometry();geos.leaf.setAttribute('position',new T.Float32BufferAttribute(leafPositions,3));geos.leaf.setAttribute('uv',new T.Float32BufferAttribute(leafUV,2));geos.leaf.computeVertexNormals();m.green.side=T.DoubleSide;
 function part(kind,material,x,y,z,w,h,d,rx=0,ry=0,rz=0){const key=kind+material;if(!bins.has(key))bins.set(key,{kind,material,items:[]});bins.get(key).items.push([x,y,z,w,h,d,rx,ry,rz]);}
 const B=(a,x,y,z,w,h,d,ry=0)=>part('box',a,x,y,z,w,h,d,0,ry);
 const C=(a,x,y,z,r,h)=>part('cyl',a,x,y,z,r,h,r);
 const S=(a,x,y,z,w,h,d)=>part('ball',a,x,y,z,w,h,d);
 const ring=(a,x,y,z,r,rx=0,ry=0)=>part('torus',a,x,y,z,r,r,r,rx,ry);
 const sign=(text,x,y,z,w,h=.8)=>{const p=villaPoint(x,z);const mesh=label(text,p.x,y,p.z,w,h,-Math.PI/2,'#172b25','#d4b775');return mesh;};
 function floor(kind,x,z,w,d,repeat=5){const map=m[kind].map.clone();map.repeat.set(kind==='rug'?1:w/repeat,kind==='rug'?1:d/repeat);map.needsUpdate=true;textures.push(map);const material=m[kind].clone();material.map=map;const mesh=new T.Mesh(new T.PlaneGeometry(w,d),material);mesh.rotation.x=-Math.PI/2;mesh.position.set(x,kind==='rug'?.075:kind==='wood'?.045:kind==='deck'?.055:.025,z);mesh.receiveShadow=true;root.add(mesh);}
 function frame(x,y,z,w,h){B('gold',x,y-h/2,z,w,.045,.08);B('gold',x,y+h/2,z,w,.045,.08);for(const s of [-1,1])B('gold',x+s*w/2,y,z,.045,h,.08);}
 function plant(x,z,scale=1){C('dark',x,.4*scale,z,.48*scale,.8*scale);C('gold',x,.8*scale,z,.49*scale,.06);for(let i=0;i<8;i++){const a=i*Math.PI/4;part('leaf','green',x,.72*scale,z,.65*scale,(1.25+(i%3)*.22)*scale,.7*scale,.48,a,.12*Math.sin(a));C('green',x+Math.sin(a)*.08,.93*scale,z+Math.cos(a)*.08,.018*scale,.7*scale);}}
 function sconce(x,y,z,ry=0){B('dark',x,y,z,.24,1,.18,ry);B('light',x,y,z+.1,.1,.7,.13,ry);B('gold',x,y-.45,z,.35,.07,.3,ry);B('gold',x,y+.45,z,.35,.07,.3,ry);}
 function stool(x,z){C('gold',x,.47,z,.08,.85);C('dark',x,.1,z,.45,.12);S('leather',x,.95,z,.53,.18,.53);ring('gold',x,.42,z,.32,Math.PI/2);}
 function trophy(x,y,z,s=1){B('dark',x,y,z,.5*s,.18*s,.4*s);C('gold',x,y+.28*s,z,.08*s,.4*s);part('cyl','gold',x,y+.64*s,z,.28*s,.4*s,.28*s);ring('gold',x-.28*s,y+.66*s,z,.15*s);ring('gold',x+.28*s,y+.66*s,z,.15*s);}
 function chair(x,z,scale=1,angle=0){// All chairs share instanced geometry, including their brass nailheads.
 const piece=(geo,mat,px,py,pz,sx,sy,sz)=>{const c=Math.cos(angle),sn=Math.sin(angle);part(geo,mat,x+(px*c+pz*sn)*scale,py*scale,z+(-px*sn+pz*c)*scale,sx*scale,sy*scale,sz*scale,0,angle);};
 piece('soft','leather',0,.5,0,2.1,.35,1.95);piece('soft','leather',0,1.24,-.73,2.25,1.55,.55);for(const s of [-1,1]){piece('soft','leather',s*1.02,.86,0,.5,.65,1.98);piece('ball','leather',s*1.02,.94,.79,.3,.3,.31);for(const z1 of [-.65,.65])piece('cyl','wood',s*.82,.16,z1,.11,.3,.11);for(let j=0;j<6;j++)piece('ball','gold',s*1.07,.6+j*.15,.97,.026,.026,.026);}for(let y=.9;y<=1.8;y+=.3)for(let xx=-.7;xx<=.71;xx+=.35)piece('ball','leather',xx,y,-.44,.035,.035,.018);
 return null;}
 B('dark',0,-.16,0,44.8,.3,32.8);floor('stone',0,0,44,32,4);floor('wood',0,-8,11.5,15.5,4);floor('wood',14,-7.5,15,15,4);floor('deck',0,-18.5,44,5,3);
 // Perimeter follows the shared collision plan; clerestory glass and brass trim.
 for(const [x,z,w,d]of [[-22,0,.55,32],[22,0,.55,32],[-13,-16,18,.55],[13,-16,18,.55],[-12.5,16,19,.55],[5,16,4,.55],[21,16,2,.55]]){if(Math.abs(x)===22){B('plaster',x,2.05,z,w,4.1,d);B('plaster',x,5.15,z,w,.5,d);}else if(z===-16||(z===16&&w>15)){B('plaster',x,.4,z,w,.8,d);B('plaster',x,5.1,z,w,.6,d);}else B('plaster',x,2.7,z,w,5.4,d);B('dark',x,.4,z,w+.09,.8,d+.09);B('gold',x,1.05,z,w+.1,.04,d+.1);B('dark',x,5.35,z,w+.25,.24,d+.25);}
 // Side façades have high glazing, deep pilasters, planting and stone bases.
 for(const side of [-1,1]){for(const zz of [-12,-4,4,12]){B('glass',side*22,4.5,zz,.07,.8,7.4);B('dark',side*22.08,4.1,zz,.12,.08,7.5);B('gold',side*22.1,4.91,zz,.08,.04,7.5);}for(const zz of [-16,-8,0,8,16]){B('dark',side*22.25,2.65,zz,.42,5.3,.65);B('gold',side*22.48,2.65,zz,.04,4.8,.035);}B('stone',side*22.12,.48,0,.12,.9,31.7);for(const zz of [-12,-4,4,12]){B('stone',side*23.7,.2,zz,1.6,.4,4.5);plant(side*23.7,zz,.8);}}
 // A covered front portico makes the main house entrance distinct from the garage.
 B('dark',0,4.8,18,7.5,.28,5);B('wood',0,4.62,18,7.3,.08,4.7);B('gold',0,4.91,20.5,7.5,.045,.06);for(const xx of [-3.3,3.3]){B('dark',xx,2.35,19.6,.27,4.7,.27);B('gold',xx,2.35,19.6,.29,.045,.29);}C('light',0,4.5,18.5,.32,.06);
 // Front facade overlays: framed dark glazing, stone pilasters and brass sconces.
 for(const x of [-19,-14,-9]){B('dark',x,2.8,16.3,3.7,3.6,.08);B('glass',x,2.8,16.36,3.35,3.24,.04);frame(x,2.8,16.41,3.5,3.4);B('gold',x,2.8,16.44,.04,3.4,.08);}
 for(const x of [-21.5,-6.8,3.2,20.5]){B('dark',x,2.65,16.45,.65,5.3,.65);sconce(x,2.9,16.84);}
 // Two real open portals, with a rolled-up garage shutter and dark lintels.
 for(const x of [-3.2,3.2,7.1,20])B('gold',x,2.4,16.36,.12,4.8,.12);B('dark',0,4.9,16.35,6.5,.7,.6);B('dark',13.5,5,16.35,13,.8,.7);for(let i=0;i<5;i++)B('dark',13.5,4.75+i*.09,16.6,12.6,.045,.25);
 B('dark',-12.5,4.88,16.49,13.5,.85,.12);sign('TWO ACES · ВИЛЛА',-12.5,4.88,16.56,13,.65);sign('МАНКИCAR · TWO ACES',13.5,5.02,16.74,11,.55);
 // Wood-paneled partitions leave the original broad room openings clear.
 for(const [x,z,w,d]of [[6,4,.35,6],[6,14,.35,4],[-6,2.5,.35,5],[-6,14,.35,4],[-18,1,8,.35],[-9,1,2,.35],[9.5,1,3,.35],[19.5,1,5,.35]]){B('wood',x,2.45,z,w,4.9,d);B('gold',x,1.05,z,w+.03,.04,d+.03);B('gold',x,4.7,z,w+.06,.05,d+.06);}
 // Central trophy wall, green inset and the villa's recognizable club chair.
 B('wood',0,2.5,.3,6.4,5,.35);for(const x of [-3.1,-2.2,2.2,3.1]){B('gold',x,2.5,.51,.04,4.7,.04);}B('gold',0,4.9,.55,6.4,.08,.08);B('felt',0,3,.51,4.1,2.7,.06);frame(0,3,.56,4.2,2.8);
 for(const side of [-1,1]){B('dark',side*2.65,2.45,.55,1.25,4.6,.3);for(let i=0;i<3;i++){const y=.9+i*1.35;B('wood',side*2.65,y,.78,1.28,.12,.8);B('light',side*2.65,y+.12,1.04,1.1,.025,.04);}}
 floor('rug',0,8.7,6.4,10.5,12);
 const mark=()=>new Map([...bins].map(([key,b])=>[key,b.items.length]));
 const ranges=(before)=>[...bins].map(([key,b])=>({key,start:before.get(key)||0,end:b.items.length})).filter(r=>r.end>r.start);
 let before=mark();chair(0,6,.95);const legacyChair=ranges(before);before=mark();C('dark',0,.48,9.6,.12,.9);C('gold',0,.94,9.6,1.32,.13);C('dark',0,1.02,9.6,1.24,.06);const legacyTable=ranges(before);
 before=mark();plant(-4,5);plant(4,5);const legacyPlants=ranges(before);
 for(const zz of [3.5,7,10.5,14]){B('wood',21.65,2.5,zz,.18,4.8,.12);B('gold',21.52,2.5,zz,.04,4.3,.045);}
 // Garage picture frames and a service bench, as in the original panorama.
 for(const zz of [5.5,12.5]){B('dark',21.6,3,zz,.08,2.35,2.8);B('gold',21.52,4.17,zz,.08,.05,2.9);B('gold',21.52,1.82,zz,.08,.05,2.9);for(const edge of [-1,1])B('gold',21.52,3,zz+edge*1.43,.08,2.35,.05);}
 // Private poker room: oval felt, padded rail, cupholders, cards and chip stacks.
 floor('rug',-14,8.6,13,12.4,13);C('dark',-14,.55,9,.6,1.1);part('cyl','gold',-14,1.19,9,4.7,.22,2.75);part('cyl','leather',-14,1.34,9,4.65,.22,2.7);part('cyl','felt',-14,1.47,9,4.16,.08,2.2);
 for(let i=0;i<8;i++){const a=i*Math.PI/4,x=-14+Math.sin(a)*5.1,z=9+Math.cos(a)*3.7;chair(x,z,.55,a+Math.PI);C('gold',-14+Math.sin(a)*4.35,1.49,9+Math.cos(a)*2.4,.13,.025);}

 for(const x of [-20,-8]){sconce(x,3.3,1.27);plant(x,3);}
 // Lounge with a soft sectional, cushions, a coffee table and a working kitchen island.
 part('soft','cream',0,.56,-8,7,1.05,2.8);part('soft','cream',0,1.1,-9.25,7.2,1.5,.5);for(const x of [-3.5,3.5])B('cream',x,.96,-8,.6,1.1,2.8);for(const x of [-2.2,0,2.2]){S('cream',x,.99,-7.9,1.04,.16,1.15);B(x?'felt':'leather',x,1.35,-8.8,.8,.7,.22,.1*x);}
 C('dark',0,.55,-4.6,1.7,.14);C('gold',0,.48,-4.6,1.74,.06);C('gold',0,.25,-4.6,.16,.45);C('gold',0,.66,-4.6,.1,.14);
 for(const x of [-4,-2,0,2]){B('wood',x,1,-14.45,1.95,2,1.7);B('gold',x,1.2,-13.56,.6,.035,.07);}B('stone',-1,2.06,-14.4,8,.12,1.95);B('dark',-3,2.14,-14.3,1.5,.05,1);B('dark',1.4,2.14,-14.3,1.3,.05,1);for(const x of [-3.4,-2.6])for(const z of [-14.6,-14])C('rubber',x,2.18,z,.23,.03);
 // Faucet, backsplash, upper cupboards and under-cabinet lighting.
 C('gold',1.9,2.4,-14.8,.04,.6);B('gold',1.7,2.69,-14.8,.4,.05,.05);B('stone',-1,2.85,-15.65,8,1.45,.09);B('wood',-1,4.15,-15.25,8,1.2,.8);B('light',-1,3.51,-15,7.7,.035,.05);B('stone',0,1.52,-11.8,7,.17,1.4);B('wood',0,.78,-11.9,6.5,1.45,1);for(const x of [-2,0,2])stool(x,-10.6);
 // Garage: stone floor, inset bay markings, tool drawers, real display objects.
 for(const x of [10,18]){for(const s of [-1,1])B('gold',x+s*3.2,.055,9,.055,.025,12.5);for(const z of [2.8,15.2])B('gold',x,.055,z,6.4,.025,.055);}
 const spade=sign('♠',18,.07,9,2.2,2.2);spade.rotation.set(-Math.PI/2,0,Math.PI/2);
 B('wood',14,2.35,1.45,13,4.6,.45);for(const x of [8.8,12.2,15.6,19]){B('stone',x,3.1,1.73,3.15,2.8,.04);B('gold',x-1.59,3.1,1.79,.035,2.8,.05);}for(const x of [8.8,12.2,15.6,19]){B('dark',x,.85,2,3.2,1.6,.75);for(let y=.45;y<1.6;y+=.35){B('rubber',x,y,2.4,3,.025,.04);B('gold',x,y+.13,2.45,1.1,.035,.06);}B('stone',x,1.72,2.1,3.25,.12,1);for(const y of [2.45,3.7]){B('wood',x,y,1.95,3.25,.1,.9);B('light',x,y+.08,2.37,3.05,.035,.04);}}
 // Helmets, steering wheel, polished cup, oil cans and tools on illuminated shelves.
 for(const x of [8.4,10,18.2,19.5]){S(x<12?'red':'dark',x,2.95,2,.42,.43,.39);B('rubber',x,2.95,2.34,.66,.2,.04);B('gold',x,3.28,2.15,.045,.04,.45);}
 ring('dark',12.2,4.2,2.18,.49);for(let i=0;i<3;i++){const a=i*Math.PI*2/3;B('gold',12.2+Math.sin(a)*.24,4.2+Math.cos(a)*.24,2.2,.08,.52,.06,-a);}C('gold',15.6,3.9,2.1,.18,.3);trophy(15.6,2.58,2.03,.85);
 for(let i=0;i<8;i++){B(i%2?'red':'dark',8+i*.42,1.93,2.14,.23,.34,.23);B('gold',8+i*.42,2.13,2.14,.09,.08,.1);}
 B('red',20.8,.85,5,1.5,1.65,1.1);for(let y=.25;y<1.6;y+=.22)B('gold',20.8,y,5.57,1.2,.035,.05);
 for(let i=0;i<4;i++){C('rubber',21,.23+i*.43,9,.58,.38);ring('rubber',21,.42+i*.43,9,.49,Math.PI/2);ring('gold',21,.43+i*.43,9,.3,Math.PI/2);}plant(7.3,2.7,.8);
 // Billiards and bar. Pockets, balls and cues remain legible at walking distance.
 B('wood',14,1.2,-7,8.4,.55,4.4);B('gold',14,1.48,-7,8.5,.08,4.5);B('felt',14,1.55,-7,7.8,.08,3.8);for(const x of [10.5,17.5])for(const z of [-8.6,-5.4]){B('wood',x,.55,z,.35,1.1,.35);C('rubber',x,1.61,z,.18,.02);}for(let i=0;i<8;i++)S(i%2?'cream':'red',12+(i%3)*.4,1.7,-7+Math.floor(i/3)*.35,.11,.11,.11);B('wood',14,1.68,-6.1,5,.04,.04,.15);
 B('wood',20,1.1,-10.5,2.2,2.2,7);B('stone',20,2.26,-10.5,2.5,.12,7.3);for(let i=0;i<8;i++)C(i%2?'green':'gold',20,2.5,-13+i*.6,.1,.45);for(const z of [-12,-9])stool(17.6,z);chair(11,-2.4,.7,-Math.PI/3);chair(16,-2.4,.7,Math.PI/3);C('dark',13.5,.65,-2.5,.8,.12);
 // Sauna glazing, timber bench and gym equipment on the opposite side.
 B('wood',-18,2.4,-12.5,6,4.8,.3);B('wood',-21,2.4,-8,.3,4.8,9);B('glass',-15,2.2,-8,.1,4.4,9);B('gold',-15,4.4,-8,.13,.07,9);for(const z of [-11,-9,-7])B('wood',-19.4,.65,z,2.4,1.3,1.85);C('dark',-16.7,.65,-11,.6,1.3);for(let i=0;i<8;i++)S('stone',-16.7+Math.sin(i)*.35,1.42,-11+Math.cos(i)*.35,.2,.13,.2);
 for(const x of [-11,-8]){B('rubber',x,.12,-8,1.7,.22,5);B('dark',x,.7,-8,1.3,.24,2.8);for(const s of [-1,1])B('dark',x+s*.8,1.8,-9.8,.08,2.8,.08);B('gold',x,2.8,-9.8,1.9,.09,.09);for(const s of [-1,1])ring('rubber',x+s*.8,2.8,-9.8,.35,0,Math.PI/2);}
 // Tall terrace glazing, open central doors and warm evening sconces.
 for(const x of [-19,-11,-3,5,13,20]){B('dark',x,2.5,-15.65,.08,5,.2);sconce(x,3.3,-15.35);}for(const x of [-13,13])B('glass',x,2.9,-15.98,16,3.9,.04);
 // Pool with coping and tile lines, hot tub, loungers, dining and perimeter planting.
 B('cream',8,.07,-18,15,.14,4.2);B('water',8,.16,-18,14,.09,3.35);for(const x of [1,15])B('stone',x,.24,-18,.35,.15,4.3);for(const z of [-16.1,-19.9])B('stone',8,.24,z,14,.15,.35);for(let x=2;x<15;x++)B('cream',x,.18,-18,.025,.015,3.2);
 C('stone',-16,.25,-18,2.1,.5);C('water',-16,.52,-18,1.75,.06);ring('cream',-16,.55,-18,1.9,Math.PI/2);B('wood',-6,.8,-18,6, .18,2.2);for(const x of [-8,-4])for(const z of [-18.7,-17.3])B('dark',x,.4,z,.09,.8,.09);for(const x of [-9.6,-2.4]){B('cream',x,.5,-18,.9,.2,1.7);B('wood',x,.9,-18.7,.9,.8,.12);}for(const x of [18,20.5]){B('wood',x,.35,-18,1.8,.2,3.3);B('cream',x,.53,-18,1.6,.16,3);B('cream',x,.86,-19.25,1.6,.7,.2);}
 for(const x of [-21,21])for(const z of [-14,13])plant(x,z,1.25);for(const x of [-5,5])plant(x,14,1.1);for(const x of [-21,-10,0,10,21])plant(x,-20.6,.8);
 for(const x of [-22,22]){B('dark',x,1,-18.5,.08,1.4,4.7);B('gold',x,1.7,-18.5,.1,.06,4.7);}
 // Covered entrance, driveway pavers and lanterns. Doorways stay at ground level.
 B('stone',0,-.015,18,7,.06,4);B('gold',0,.025,18,5,.025,3.5);B('dark',0,.04,18,4.8,.02,3.3);const entrance=sign('♠',0,.06,18,1.5,1.5);entrance.rotation.set(-Math.PI/2,0,Math.PI/2);
 B('stone',12,-.02,18,16,.04,4);for(let x=4;x<21;x+=2)B('gold',x,.01,18,.02,.02,4);for(const x of [-4.5,4.5,21]){B('dark',x,.55,18,.65,1.1,.65);C('light',x,1.22,18,.14,.28);}
 // Actual pitched roof sections, fascia, gutters and ceiling beams.
 const roof=new T.Group();roof.name='Villa roof';root.add(roof);const roofMap=m.roof.map.clone();roofMap.repeat.set(9,7);roofMap.needsUpdate=true;textures.push(roofMap);const roofMaterial=m.roof.clone();roofMaterial.map=roofMap;roofMaterial.transparent=true;roofMaterial.depthWrite=false;
 function roofSection(x,z,w,d){const h=1.8,y=5.65,verts=[-w/2,y,-d/2,w/2,y,-d/2,w/2,y,d/2,-w/2,y,d/2,-w/2+1.5,y+h,0,w/2-1.5,y+h,0];const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(verts,3));geo.setIndex([0,4,5,0,5,1,1,5,2,2,5,4,2,4,3,3,4,0,3,0,1,3,1,2]);geo.computeVertexNormals();const uv=[];for(let i=0;i<verts.length;i+=3)uv.push((verts[i]+w/2)/w,(verts[i+2]+d/2)/d);geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));const o=new T.Mesh(geo,roofMaterial);o.position.set(x,0,z);o.castShadow=o.receiveShadow=true;roof.add(o);}
 // The interior keeps a real timber ceiling. Its back is culled in the cutaway view.
 const ceilingMap=m.wood.map.clone();ceilingMap.repeat.set(9,6);ceilingMap.needsUpdate=true;textures.push(ceilingMap);const ceilingMaterial=m.wood.clone();ceilingMaterial.map=ceilingMap;const ceiling=new T.Mesh(new T.PlaneGeometry(44,32),ceilingMaterial);ceiling.rotation.x=Math.PI/2;ceiling.position.y=5.28;ceiling.castShadow=ceiling.receiveShadow=true;root.add(ceiling);
 roofSection(-14.25,0,16.5,33.5);roofSection(0,0,12,33.5);roofSection(14.25,0,16.5,33.5);
 for(const z of [-16.6,16.6]){B('dark',0,5.55,z,45,.27,.35);B('gold',0,5.4,z,45,.045,.3);}for(const x of [-22.5,22.5])B('dark',x,5.55,0,.3,.27,33.5);
 // Ceiling structure remains above the camera; lit pendants give each room a scale.
 for(const x of [-20,-6,6,21])B('wood',x,5.05,0,.22,.3,31.5);
 let legacyPendant=[];
 for(const [x,z]of [[0,8],[-14,9],[14,9],[14,-7],[0,-7]]){const pendantStart=mark();C('dark',x,4.4,z,.025,1.2);part('cyl','dark',x,3.9,z,.64,.2,.64);part('cyl','light',x,3.78,z,.5,.025,.5);if(x===0&&z===8)legacyPendant=ranges(pendantStart);const light=new T.PointLight('#ffd69a',17,12,2);light.position.set(x,3.6,z);root.add(light);}
 // One focused shadow light gives the sample hall depth without lighting every room.
 const hallKey=new T.SpotLight('#ffe3ba',65,17,Math.PI/3,.7,1.7);hallKey.position.set(-3,4.8,11);hallKey.target.position.set(0,.5,6.5);hallKey.castShadow=true;hallKey.shadow.mapSize.set(512,512);hallKey.shadow.bias=-.0004;hallKey.shadow.normalBias=.025;root.add(hallKey,hallKey.target);
 const hallFinish=finishHall(root,m,textures);
 const awards=furnishVilla({root,B,C,S,ring,part,m,textures,hall});
 for(const [key,b]of bins){const mesh=new T.InstancedMesh(geos[b.kind],m[b.material],b.items.length);for(let i=0;i<b.items.length;i++){const [x,y,z,w,h,d,rx,ry,rz]=b.items[i];dummy.position.set(x,y,z);dummy.scale.set(w,h,d);dummy.rotation.set(rx,ry,rz);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);}mesh.name='Villa '+key;mesh.castShadow=b.material!=='glass'&&b.material!=='light';mesh.receiveShadow=true;mesh.computeBoundingSphere();root.add(mesh);}
 const loadFurniture=()=>loadHallFurniture(root,textures,m).then(result=>{if(root.userData.disposed)return;for(const range of [...(result.chair?legacyChair:[]),...(result.table?legacyTable:[]),...(result.plant?legacyPlants:[]),...(result.pendant?legacyPendant:[])]){const mesh=root.children.find(o=>o.name==='Villa '+range.key);if(!mesh)continue;dummy.scale.setScalar(0);dummy.updateMatrix();for(let i=range.start;i<range.end;i++)mesh.setMatrixAt(i,dummy.matrix);mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();}root.userData.authoredFurniture=result;});
 // Existing pier and yacht remain connected to the ocean terrace.
 worldBox('#8f7856',133,.12,57,22,.28,2.8);for(let x=124;x<145;x+=2.5)worldBox('#69543d',x,-.9,57,.3,2.1,2.8);batch('ball','#d8ded2',149+VILLA.x-98,.6,57+VILLA.z-40,3,.9,8.5);worldBox('#f0ebd8',149,1.35,56,4.6,.6,11);worldBox('#b5c3bd',149,2.1,55,3.6,1.2,4.5);worldBox('#3f666c',149,2.6,56.3,3.8,.7,.12);worldBox('#ece4ca',149,3.05,55,4.2,.18,5);worldCylinder('#c7cbbb',149,4.1,54.5,.05,2.1);
 const interior=createInteriorProximity(()=>Promise.all([awards.load(),loadFurniture(),hallFinish.userData.loadArt()]),{x:VILLA.x,z:VILLA.z,disposed:()=>!!root.userData.disposed});
 root.userData.loadInterior=interior.ensure;
 let alpha=1,inside=false;return {root,roof,ready:Promise.resolve(),loadInterior:interior.ensure,update(position,dt,intro=false){interior.update(position);inside=!intro&&villaInteriorAt(position,inside?.65:0);hallKey.visible=inside;alpha=T.MathUtils.damp(alpha,inside?0:1,9,dt);roof.visible=alpha>.015;roofMaterial.opacity=alpha;roofMaterial.depthWrite=false;return inside;},get status(){return {interiorState:interior.state,inside,roofVisible:roof.visible,roofOpacity:alpha,awards:awards.count};}};
}
