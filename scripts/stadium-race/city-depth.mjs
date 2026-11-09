import * as T from '../../vendor/three/three.module.min.js';

// One instanced skyline draw; each footprint stays clear of the entire winding route.
export function createCityDepth(scene,E,sample,facades){
 const geometry=new T.BoxGeometry(1,1,1),matrix=new T.Object3D();
 const material=facades[2].clone();for(const key of ['map','emissiveMap','bumpMap'])if(facades[2][key]){material[key]=facades[2][key].clone();material[key].wrapS=material[key].wrapT=T.RepeatWrapping;material[key].repeat.set(2,2);}
 const blocks=new T.InstancedMesh(geometry,material,48);blocks.frustumCulled=false;scene.add(blocks);
 const road=[];for(let d=E.LAP*2-400;d<=E.LAP*3+4000;d+=40){const p=sample(d);road.push({x:p.x,z:p.z,width:E.roadWidth(d)*7/6});}
 let lastBase=null,clearance=null;
 return {update(distance){const base=Math.floor(distance/600)*600;if(base===lastBase)return;lastBase=base;let count=0;clearance=null;
  for(let i=0;i<48;i++){
   const d=base+800+Math.floor(i/2)*130;if(d<E.LAP*2+4750||d>E.LAP*3+1200)continue;
   const side=i%2?1:-1,w=9+i%4*1.7,depth=10+i%3*3,h=18+(i*7%17),radius=Math.hypot(w,depth)/2;
   let placement=null,space=0;
   for(let offset=0;offset<=3.2;offset+=.8){const p=sample(d,side*(2.9+(i%5)*.43+offset));space=Infinity;for(const r of road){const gap=Math.hypot(p.x-r.x,p.z-r.z)-r.width-radius;space=Math.min(space,gap);if(space<3)break;}if(space>=3){placement=p;break;}}
   if(!placement)continue;const p=placement;
   matrix.position.set(p.x,p.y+h/2-1,p.z);matrix.rotation.set(0,p.a,0);matrix.scale.set(w,h,depth);matrix.updateMatrix();blocks.setMatrixAt(count,matrix.matrix);blocks.setColorAt(count++,new T.Color(['#d3d4d0','#bdc9cd','#c8bfb1'][i%3]));clearance=clearance===null?space:Math.min(clearance,space);
  }
  blocks.count=count;blocks.visible=count>0;blocks.instanceMatrix.needsUpdate=true;if(blocks.instanceColor)blocks.instanceColor.needsUpdate=true;
 },snapshot(){return {buildings:blocks.count,roadClearance:clearance};}};
}
