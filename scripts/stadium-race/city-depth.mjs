import * as T from '../../vendor/three/three.module.min.js';

// One instanced skyline draw; each footprint stays clear of the entire winding route.
export function createCityDepth(scene,E,sample,facades){
 const geometry=new T.BoxGeometry(1,1,1),matrix=new T.Object3D();
 const material=facades[2].clone();
 // Skyline windows repeat without copying ground-floor shops halfway up a tower.
 for(const key of ['map','emissiveMap','bumpMap'])if(facades[2][key]){
  const canvas=document.createElement('canvas');canvas.width=512;canvas.height=800;canvas.getContext('2d').drawImage(facades[2][key].image,0,20,512,800,0,0,512,800);
  const texture=new T.CanvasTexture(canvas);texture.colorSpace=facades[2][key].colorSpace;texture.wrapS=texture.wrapT=T.RepeatWrapping;texture.repeat.set(2,2);texture.anisotropy=4;material[key]=texture;
 }

 const blocks=new T.InstancedMesh(geometry,material,48);blocks.frustumCulled=false;scene.add(blocks);
 // Two shared batches give the distant roofline setbacks, water tanks and lit cornices.
 const crowns=new T.InstancedMesh(geometry,material,48);
 const trim=new T.InstancedMesh(geometry,new T.MeshBasicMaterial({color:'#d9af85'}),48);
 const quays=new T.InstancedMesh(geometry,new T.MeshStandardMaterial({color:'#647074',roughness:.91}),48);
 for(const mesh of [crowns,trim,quays]){mesh.frustumCulled=false;scene.add(mesh);}
 const road=[];for(let d=E.LAP*2-400;d<=E.FINISH+4000;d+=40){const p=sample(d);road.push({x:p.x,z:p.z,width:E.roadWidth(d)*7/6});}
 let lastBase=null,clearance=null;
 return {update(distance){const base=Math.floor(distance/130)*130;if(base===lastBase)return;lastBase=base;let count=0,crownCount=0,trimCount=0;clearance=null;
  for(let slot=0;slot<48;slot++){
   const i=(base/130-2+Math.floor(slot/2))*2+slot%2;
   const d=Math.floor(i/2)*130;if(d<E.LAP*2+4750||d>E.cityDistance(8510))continue;
   const side=i%2?1:-1,zone=E.district(d);
   const port=zone==='freight',quay=zone==='quay';
   if(port&&i%3===0)continue;
   const w=port?16+i%4*2:9+i%4*1.7,depth=port?18:10+i%3*3;
   const cluster=Math.max(0,1-Math.abs(d-E.cityDistance(5520))/1500);
   const h=port?4.5+i%4:quay?6+i%8:10+(i*7%13)+cluster*(8+i%13);
   const radius=Math.hypot(w,depth)/2;
   if(side<0&&E.riverbank(d))continue;
   let placement=null,space=0;
   for(let offset=0;offset<=3.2;offset+=.8){const p=sample(d,side*(4.1+(i%5)*.43+offset));space=Infinity;for(const r of road){const gap=Math.hypot(p.x-r.x,p.z-r.z)-r.width-radius;space=Math.min(space,gap);if(space<3)break;}if(space>=3){placement=p;break;}}
   if(!placement)continue;const p=placement;
   matrix.position.set(p.x,p.y+h/2-1,p.z);matrix.rotation.set(0,p.a,0);matrix.scale.set(w,h,depth);matrix.updateMatrix();blocks.setMatrixAt(count,matrix.matrix);blocks.setColorAt(count++,new T.Color(['#d3d4d0','#bdc9cd','#c8bfb1'][i%3]));clearance=clearance===null?space:Math.min(clearance,space);
   // The water plane is at -4; foundations continue below it on both banks.
   const floor=p.y-1,bed=-5;
   matrix.position.set(p.x,(floor+bed)/2,p.z);matrix.scale.set(w+.5,floor-bed,depth+.5);
   matrix.updateMatrix();quays.setMatrixAt(count-1,matrix.matrix);
   if(!port&&i%3!==0){
    const upperHeight=i%4===0?6:2.8;
    matrix.position.set(p.x,p.y+h-1+upperHeight/2,p.z);
    matrix.scale.set(w*.69,upperHeight,depth*.73);matrix.updateMatrix();
    crowns.setMatrixAt(crownCount++,matrix.matrix);
   }
   if(!port&&i%5===1){
    matrix.position.set(p.x,p.y+h-1,p.z);matrix.scale.set(w+.12,.13,depth+.12);
    matrix.updateMatrix();trim.setMatrixAt(trimCount++,matrix.matrix);
   }
  }
  crowns.count=crownCount;trim.count=trimCount;quays.count=count;
  for(const mesh of [crowns,trim,quays]){mesh.visible=mesh.count>0;mesh.instanceMatrix.needsUpdate=true;}
  blocks.count=count;blocks.visible=count>0;blocks.instanceMatrix.needsUpdate=true;if(blocks.instanceColor)blocks.instanceColor.needsUpdate=true;
 },snapshot(){return {buildings:blocks.count,roadClearance:clearance};}};
}
