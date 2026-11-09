import * as T from '../../vendor/three/three.module.min.js';
// Three architectural silhouettes share the facade atlases and roof material.
export function createCityBuildingFactory(facades,roofBox,roofCylinder){
 const roof=new T.MeshStandardMaterial({color:'#505b60',roughness:.88});
 const stone=new T.MeshStandardMaterial({color:'#afa38b',roughness:.9});
 const box=new T.BoxGeometry(1,1,1);
 // Roofs must not inherit the window grid from the walls.
 const uv=box.attributes.uv,normal=box.attributes.normal;for(let i=0;i<uv.count;i++)if(Math.abs(normal.getY(i))>.5)uv.setXY(i,.5,.035);
 const cylinder=new T.CylinderGeometry(1,1,1,24);
 const arcadeShape=new T.Shape();arcadeShape.moveTo(-7,0);arcadeShape.lineTo(7,0);arcadeShape.lineTo(7,3.05);arcadeShape.lineTo(-7,3.05);arcadeShape.closePath();
 for(const x of [-4.6,0,4.6]){const hole=new T.Path();hole.moveTo(x-1.45,.035);hole.lineTo(x-1.45,1.3);hole.absarc(x,1.3,1.45,Math.PI,0,true);hole.lineTo(x+1.45,.035);hole.closePath();arcadeShape.holes.push(hole);}
 const arcade=new T.ExtrudeGeometry(arcadeShape,{depth:.32,bevelEnabled:true,bevelSize:.035,bevelThickness:.035,bevelSegments:1,steps:1});
 return function(parent,index,side){
  const group=new T.Group();group.position.x=side*15;parent.add(group);
  const h=9.6+index%3*1.6,kind=Math.floor(index/2)%3,facade=facades[kind===0?0:index%facades.length];
  function mesh(geometry,material,x,y,z,w,height,depth){const shape=material===facade?geometry:geometry===box?roofBox:roofCylinder;const m=new T.Mesh(shape,material);m.position.set(x,y,z);m.scale.set(w,height,depth);m.receiveShadow=true;m.userData.batchSceneDetail=material===facade;group.add(m);return m;}
  if(kind===0){
   mesh(cylinder,facade,0,h/2,0,3.5,h,4.2);
   mesh(cylinder,stone,0,h+.15,0,3.65,.3,4.35);
   mesh(cylinder,roof,0,h+.55,0,2.4,.65,3.1);
  }else if(kind===1){
   mesh(box,facade,0,h/2,0,7,h,12);
   mesh(box,roof,side*.7,h+.6,1,5.6,1.2,8);
   mesh(box,stone,side*.7,h+1.28,1,5.85,.16,8.25);
  }else{
   mesh(box,facade,0,h/2,0,6.5,h,14);
   mesh(box,stone,0,h+.15,0,6.85,.3,14.35);
   mesh(box,roof,0,h+.6,1,2,.75,1.8);
  }
  if(kind===2){
   const arches=new T.Mesh(arcade,stone);arches.position.set(-side*3.3,0,0);arches.rotation.y=-side*Math.PI/2;arches.userData.batchSceneDetail=true;group.add(arches);
   for(let floor=1;floor<=3;floor++)mesh(box,stone,-side*3.34,floor*3.1,0,.2,.16,14.2);
   for(const z of [-6.8,6.8])mesh(box,stone,-side*3.35,h/2,z,.18,h,.28);
  }
  if(kind===2){for(let level=1;level<Math.floor(h/3);level++){
   mesh(box,stone,-side*3.45,level*3.1,1.8,.85,.13,2.8);
   mesh(box,roof,-side*3.85,level*3.1+.5,1.8,.045,.045,2.8);
   for(const z of [.5,1.15,1.8,2.45,3.1])mesh(box,roof,-side*3.85,level*3.1+.25,z,.045,.5,.045);
  }}
  mesh(box,roof,side*.8,h+.45,-1.8,1.6,.55,1.2);
  for(const z of [-2.1,-1.7])mesh(cylinder,roof,side*.8,h+.95,z,.13,.7,.13);
  group.userData.architecture=['rounded','terraced','masonry'][kind];return group;
 };
}
