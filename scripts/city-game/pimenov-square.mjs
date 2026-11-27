import * as T from '../../vendor/three/three.module.min.js';
import {outlines} from './pimenov-survey.mjs';
import {library,kiosk,basins,boulevardTrees} from './pimenov-plan.mjs';

export function buildPimenovSquare({scene,box,cylinder,label,outdoors}){
 const stone='#d6d1bf',glass='#365c61',granite='#9a6458';
 const {x,z,w,d,h}=library,front=x-w/2;
 // Extrude in the XZ plane, retaining the measured returns and basin outlines.
 function polygon(points,base,height,color){
  const shape=new T.Shape(points.slice(0,-1).map(([px,pz])=>new T.Vector2(px,-pz)));
  const geo=new T.ExtrudeGeometry(shape,{depth:height,bevelEnabled:false});
  geo.rotateX(-Math.PI/2);
  const mesh=new T.Mesh(geo,new T.MeshStandardMaterial({color,roughness:.86}));
  mesh.position.y=base;mesh.receiveShadow=true;mesh.castShadow=height>.3;scene.add(mesh);
 }
 // Both one-way carriageways of Voskhod terminate at Kirova.
 for(const cz of [39.1,47.35])outdoors.asphalt(38,cz,69,4.3,.165);
 outdoors.lawnRect(36,43.2,55,3.35,.17);
 outdoors.paving(36,43.2,54,1.25,.18);
 for(const tree of boulevardTrees)outdoors.tree(tree.x,tree.z,tree.h);
 outdoors.paving(116.5,41.5,15,37,.045);
 outdoors.paving(95.2,43.4,31,31.5,.06);
 polygon(outlines[25643643],0,h,stone);
 polygon(outlines[25643643],h,.19,'#dcd8cc');
 for(const [id,points] of Object.entries(outlines)){
  if(!id.startsWith('4083182'))continue;
  polygon(points,.062,.05,'#96a178');
  const ring=points.slice(0,-1);
  const cx=ring.reduce((sum,p)=>sum+p[0],0)/ring.length;
  const cz=ring.reduce((sum,p)=>sum+p[1],0)/ring.length;
  outdoors.shrub(cx,cz,.52,.12);
 }
 for(const id of [34126327,79887436,697808464,697808465]){
  const pts=outlines[id],drive=id===79887436||id===34126327;
  for(let i=1;i<pts.length;i++){
   const [ax,az]=pts[i-1],[bx,bz]=pts[i];
   box(drive?'#66676a':'#c4bba6',(ax+bx)/2,drive?.083:.072,(az+bz)/2,drive?2.7:.78,.024,Math.hypot(bx-ax,bz-az)+.12,Math.atan2(bx-ax,bz-az));
  }
 }
 for(let bay=-5;bay<=5;bay++){
  const cz=z+bay*2.52;
  box(glass,front-.04,7.1,cz,.12,7.3,2.22);
  for(const y of [4.8,6.45,8.1,9.75])box('#89918a',front-.13,y,cz,.09,.065,2.23);
  box('#92998e',front-.13,7.1,cz,.08,7.28,.062);
  box('#e7e1cc',front-.26,7.1,cz-1.24,.55,8.35,.28);
 }
 for(const side of [-1,1])for(let col=0;col<4;col++)for(let level=0;level<3;level++)
  box(glass,x-4.4+col*2.8,3+level*3.1,z+side*(d/2+.02),1.97,1.96,.09);
 for(let i=-3;i<=3;i++){
  box(glass,front-.09,1.66,z+i*1.3,.13,2.4,1.14);
  box('#b9ada0',front-.19,1.5,z+i*1.3+.31,.1,.52,.06);
 }
 box(stone,front-.9,3.13,z,2,.25,12.2);
 label('ГПНТБ СО РАН',front-.35,11.62,z,8,.67,-Math.PI/2,stone,'#544f46');
 for(let i=0;i<4;i++)box('#b2a99d',front-2+i*.5,.09+i*.055,z,.51,.16+i*.11,11.7);
 const sprays=[];
 const water=new T.MeshStandardMaterial({color:'#b6deda',transparent:true,opacity:.76,roughness:.23});
 for(const {id,x,z,r,jet} of basins){
  polygon(outlines[id],.06,.53,granite);
  polygon(outlines[id].map(([px,pz])=>[x+(px-x)*.94,z+(pz-z)*.94]),.59,.025,'#589597');
  cylinder(granite,x,.83,z,r*.27,.46);
  const spray=new T.Group();
  spray.position.set(x,.64,z);scene.add(spray);sprays.push(spray);
  const arc=new T.QuadraticBezierCurve3(new T.Vector3(r*.73,0,0),
   new T.Vector3(r*.50,jet*1.25,0),new T.Vector3(r*.24,.41,0));
  const geometry=new T.TubeGeometry(arc,16,.045,5,false);
  const ring=new T.InstancedMesh(geometry,water,20),rotation=new T.Matrix4();
  for(let i=0;i<20;i++)ring.setMatrixAt(i,rotation.makeRotationY(i*Math.PI/10));
  spray.add(ring);
  const plume=new T.Mesh(new T.CylinderGeometry(.055,.16,jet,12),water);
  plume.position.y=.4+jet/2;spray.add(plume);
 }
 const k=kiosk;
 box('#a73c37',k.x,1.48,k.z,k.w,2.92,k.d);
 box('#ebbd76',k.x,1.45,k.z,k.w+.08,2.65,k.d-.26);
 box('#86433f',k.x,3.02,k.z,k.w+.36,.29,k.d+.36);
 const counter=k.x+k.w/2;
 box(glass,counter+.05,1.79,k.z,.12,1.1,2.55);
 box('#dad0b9',counter+.26,1.21,k.z,.59,.12,2.75);
 box('#ad4941',counter+.39,2.51,k.z,.85,.14,2.97);
 label('РУССКИЕ БЛИНЫ',counter+.21,2.83,k.z,3.94,.47,Math.PI/2,'#a23c36','#fff0cb');
 return time=>sprays.forEach((spray,i)=>{spray.scale.y=1+.055*Math.sin(time*2.2+i);});
}
