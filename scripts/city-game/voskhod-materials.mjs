import * as T from '../../vendor/three/three.module.min.js';

export function weatheredMaterial(texture,color,repeat,bumpScale){
 const map=texture.clone();
 map.repeat.set(repeat,repeat);
 map.needsUpdate=true;
 const material=new T.MeshStandardMaterial({color,map,bumpMap:map,bumpScale,roughness:.92});
 material.addEventListener('dispose',()=>map.dispose());
 return material;
}

export function streetRibbon(scene,segments,material,height){
 const positions=[],uvs=[],indices=[];
 for(const [[ax,az],[bx,bz],width] of segments){
  const dx=bx-ax,dz=bz-az,length=Math.hypot(dx,dz);
  if(length<.001)continue;
  const nx=dz/length*width*.5,nz=-dx/length*width*.5;
  const ex=dx/length*.055,ez=dz/length*.055;
  const start=positions.length/3;
  for(const [x,z] of [
   [ax-ex-nx,az-ez-nz],[ax-ex+nx,az-ez+nz],
   [bx+ex+nx,bz+ez+nz],[bx+ex-nx,bz+ez-nz]
  ]){
   positions.push(x,height,z);
   uvs.push(x,-z);
  }
  indices.push(start,start+2,start+1,start,start+3,start+2);
 }
 const geometry=new T.BufferGeometry();
 geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));
 geometry.setAttribute('uv',new T.Float32BufferAttribute(uvs,2));
 geometry.setIndex(indices);
 geometry.computeVertexNormals();
 const mesh=new T.Mesh(geometry,material);
 mesh.receiveShadow=true;
 scene.add(mesh);
}

export function buildVoskhodLampPools(scene){
 const canvas=document.createElement('canvas');
 canvas.width=canvas.height=64;
 const ctx=canvas.getContext('2d');
 const falloff=ctx.createRadialGradient(32,32,1,32,32,31);
 falloff.addColorStop(0,'#ffdea165');
 falloff.addColorStop(.35,'#ffcf8b47');
 falloff.addColorStop(1,'#eec08700');
 ctx.fillStyle=falloff;ctx.fillRect(0,0,64,64);
 const map=new T.CanvasTexture(canvas);
 map.colorSpace=T.SRGBColorSpace;
 const material=new T.MeshBasicMaterial({map,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1});
 material.addEventListener('dispose',()=>map.dispose());
 const geometry=new T.PlaneGeometry(1,1);
 geometry.rotateX(-Math.PI/2);
 const places=[
  [28,42.27,.198,1.8,2.6],[40,42.27,.198,1.8,2.6],[52,42.27,.198,1.8,2.6],
  [82,-42.7,.132,2.5,3.45],[82,-69.7,.104,2.6,3.2],
  [114.1,-81.38,.137,2.4,1.6],[116.6,-81.38,.137,2.4,1.6]
 ];
 const pools=new T.InstancedMesh(geometry,material,places.length);
 const dummy=new T.Object3D();
 for(const [index,[x,z,y,width,depth]] of places.entries()){
  dummy.position.set(x,y,z);dummy.scale.set(width,1,depth);dummy.updateMatrix();
  pools.setMatrixAt(index,dummy.matrix);
 }
 scene.add(pools);
}
