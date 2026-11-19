import {Group} from '../../vendor/three/three.module.min.js';
import {GLTFLoader} from '../../vendor/three/addons/loaders/GLTFLoader.js';

const placements = [
 {file:'android', x:-3.8, z:8.2, yaw:1.0, height:1.72},
 {file:'mai', x:3.7, z:7.7, yaw:-.95, height:1.69},
 {file:'woman', x:3.1, z:10, yaw:-1.6, height:1.3},
];

export function createVillaGuests(root,textures){
 const guests=[];
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
 let time=0, pending;
 function load(){
  const loader=new GLTFLoader();
  pending??=Promise.allSettled(placements.map(async ({file,x,z,yaw,height},index)=>{
   const {scene:model}=await loader.loadAsync('assets/city-guests/'+file+'.glb');
   const meshes=[], materials=new Set(), maps=new Set();
   model.traverse(mesh=>{
    if(!mesh.isMesh)return;
    meshes.push(mesh);
    for(const material of [].concat(mesh.material)){
     materials.add(material);
     for(const value of Object.values(material))if(value?.isTexture)maps.add(value);
    }
   });
   if(root.userData.disposed){
    new Set(meshes.map(mesh=>mesh.geometry)).forEach(geometry=>geometry.dispose());
    materials.forEach(material=>material.dispose());
    maps.forEach(map=>map.dispose());
    return;
   }
   textures.push(...maps);
   const mount=new Group();
   mount.name='Villa guest '+file;
   mount.position.set(x,.074,z);
   mount.rotation.y=yaw;
   mount.scale.setScalar(height);
   mount.add(model);
   root.add(mount);
   guests.push({meshes:meshes.filter(mesh=>mesh.morphTargetInfluences?.length===2),phase:index*2.4});
  }));
  return pending;
 }
 function update(dt){
  time+=dt;
  for(const {meshes,phase} of guests){
   const sway=reducedMotion.matches?0:Math.sin(time*1.25+phase);
   for(const mesh of meshes){
    mesh.morphTargetInfluences[0]=Math.max(0,sway);
    mesh.morphTargetInfluences[1]=Math.max(0,-sway);
   }
  }
 }
 return {load,update};
}
