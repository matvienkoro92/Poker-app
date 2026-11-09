import * as T from '../../vendor/three/three.module.min.js';
// Baked light pools keep street lighting readable without dozens of mobile GPU lights.
export function createStreetLighting(scene,sample,E){
 const canvas=document.createElement('canvas');canvas.width=canvas.height=128;const c=canvas.getContext('2d'),g=c.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,211,139,.4)');g.addColorStop(.4,'rgba(255,201,125,.18)');g.addColorStop(1,'rgba(255,201,125,0)');c.fillStyle=g;c.fillRect(0,0,128,128);
 const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
 const pools=new T.InstancedMesh(new T.PlaneGeometry(1,1),new T.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1}),20);pools.frustumCulled=false;scene.add(pools);const transform=new T.Object3D();
 return {update(distance){let count=0;const base=Math.floor(distance/200)*200;for(let i=0;i<20;i++){const index=base/200+i-2,d=index*200;if(!E.road(d).city||E.road(d).bridge)continue;const p=sample(d,index%2?-.95:.95);transform.position.set(p.x,p.y+.045,p.z);const a=sample(d-15),b=sample(d+15),slope=Math.atan2(b.y-a.y,1.8);transform.rotation.set(-Math.PI/2-slope,p.a,0,'YXZ');transform.scale.set(5,7,1);transform.updateMatrix();pools.setMatrixAt(count++,transform.matrix);}pools.count=count;pools.instanceMatrix.needsUpdate=true;}};
}
