import * as T from '../../vendor/three/three.module.min.js';
// Three architectural silhouettes share the facade atlases and roof material.
export function createCityBuildingFactory(facades,roofBox,roofCylinder){
 const roof=new T.MeshStandardMaterial({color:'#505b60',roughness:.88});
 const stone=new T.MeshStandardMaterial({color:'#afa38b',roughness:.9});
 const box=new T.BoxGeometry(1,1,1);
 // Roofs must not inherit the window grid from the walls.
 const uv=box.attributes.uv,normal=box.attributes.normal;for(let i=0;i<uv.count;i++)if(Math.abs(normal.getY(i))>.5)uv.setXY(i,.5,.035);
 const cylinder=new T.CylinderGeometry(1,1,1,24);
 return function(parent,index,side){
  const group=new T.Group();group.position.x=side*15;parent.add(group);
  const h=8+index%5*2,kind=Math.floor(index/2)%3,facade=facades[index%facades.length];
  function mesh(geometry,material,x,y,z,w,height,depth){const shape=material===facade?geometry:geometry===box?roofBox:roofCylinder;const m=new T.Mesh(shape,material);m.position.set(x,y,z);m.scale.set(w,height,depth);m.receiveShadow=true;m.userData.batchSceneDetail=material===facade;group.add(m);return m;}
  if(kind===0){
   mesh(cylinder,facade,0,h/2,0,3.5,h,4.2);
   mesh(cylinder,stone,0,h+.15,0,3.65,.3,4.35);
   mesh(cylinder,roof,0,h+.55,0,2.4,.65,3.1);
  }else if(kind===1){
   mesh(box,facade,0,h*.3,0,7,h*.6,8);
   mesh(box,facade,side*.7,h*.8,1,5.6,h*.4,6);
   mesh(box,roof,side*.7,h+.15,1,5.85,.3,6.25);
  }else{
   mesh(box,facade,0,h/2,0,6.5,h,8);
   mesh(box,stone,0,h+.15,0,6.85,.3,8.35);
   mesh(box,roof,0,h+.6,1,2,.75,1.8);
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
