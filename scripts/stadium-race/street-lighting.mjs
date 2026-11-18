import * as T from '../../vendor/three/three.module.min.js';
// Baked light pools keep street lighting readable without dozens of mobile GPU lights.
export function createStreetLighting(scene,sample,E){
 const canvas=document.createElement('canvas');canvas.width=canvas.height=128;const c=canvas.getContext('2d'),g=c.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,250,238,.50)');g.addColorStop(.4,'rgba(255,245,234,.21)');g.addColorStop(1,'rgba(255,245,234,0)');c.fillStyle=g;c.fillRect(0,0,128,128);
 const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
 const pools=new T.InstancedMesh(new T.PlaneGeometry(1,1),new T.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1}),20);pools.frustumCulled=false;scene.add(pools);const transform=new T.Object3D();
 const gold=new T.Color('#ffc790'),marina=new T.Color('#a8dce3'),port=new T.Color('#edb580');
 let previous=null;
 return {update(distance){
  const base=Math.floor(distance/200);if(base===previous)return;previous=base;
  let count=0;
  for(let i=0;i<20;i++){
   const index=base+i-2,d=index*200;
   if(!E.road(d).city||E.road(d).bridge)continue;
   const waterfront=E.riverbank(d),side=waterfront?1:index%2?1:-1;
   const lateral=side*.83,p=sample(d,lateral),a=sample(d-15,lateral),b=sample(d+15,lateral);
   const slope=Math.atan2(b.y-a.y,Math.hypot(b.x-a.x,b.z-a.z));
   transform.position.set(p.x,p.y+.038,p.z);
   transform.rotation.set(-Math.PI/2-slope,p.a,0,'YXZ');
   transform.scale.set(waterfront?3.8:5,waterfront?8.1:6.6,1);transform.updateMatrix();
   pools.setMatrixAt(count,transform.matrix);
   pools.setColorAt(count++,waterfront?marina:E.district(d)==='freight'?port:gold);
  }
  pools.count=count;pools.instanceMatrix.needsUpdate=true;
  if(pools.instanceColor)pools.instanceColor.needsUpdate=true;
 }};
}
