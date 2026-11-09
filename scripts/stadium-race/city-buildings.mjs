import * as T from '../../vendor/three/three.module.min.js';
// Three architectural silhouettes share the facade atlases and roof material.
export function createCityBuildingFactory(facades,roofBox,roofCylinder){
 const roof=new T.MeshStandardMaterial({color:'#505b60',roughness:.88});
 const stone=new T.MeshStandardMaterial({color:'#afa38b',roughness:.9});
 const box=new T.BoxGeometry(1,1,1),cylinder=new T.CylinderGeometry(1,1,1,24);
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
  group.userData.architecture=['rounded','terraced','masonry'][kind];return group;
 };
}
