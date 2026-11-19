import {Group} from '../../vendor/three/three.module.min.js';
import {GLTFLoader} from '../../vendor/three/addons/loaders/GLTFLoader.js';
import {disposeSceneResources} from '../garage-3d/scene-resources.mjs';

export const loadUaz=()=>loadClassic('uaz-469-v1.glb','UAZ-469','UAZ',.406);
export const loadVaz=()=>loadClassic('vaz-2101-v1.glb','VAZ-2101','VAZ',.30);

async function loadClassic(file,label,prefix,radius){
 let template;
 try{
  ({scene:template}=await new GLTFLoader().loadAsync('assets/city-vehicles/'+file));
 }catch{
  return null;
 }
 const create=color=>{
  const root=template.clone(true),wheels=[],frontWheels=[];
  root.name=label;
  const paint=new Map();
  for(const part of [...root.children]){
   if(!part.name.startsWith(prefix+'_Wheel_'))continue;
   const pivot=new Group(),spin=new Group();
   pivot.name=part.name;
   pivot.position.copy(part.position);
   part.position.set(0,0,0);
   spin.userData.rollingRadius=radius;
   pivot.add(spin);
   spin.add(part);
   root.add(pivot);
   wheels.push(spin);
   if(part.name.startsWith(prefix+'_Wheel_front'))frontWheels.push(pivot);
  }
  root.traverse(mesh=>{
   if(!mesh.isMesh)return;
   const replace=material=>{
    if(material.name!==prefix+'_Paint')return material;
    if(!paint.has(material)){
     const copy=material.clone();
     copy.color.set(color);
     paint.set(material,copy);
    }
    return paint.get(material);
   };
   mesh.material=Array.isArray(mesh.material)?mesh.material.map(replace):replace(mesh.material);
   mesh.castShadow=mesh.receiveShadow=true;
  });
  return {root,wheels,frontWheels};
 };
 create.dispose=()=>disposeSceneResources(template);
 return create;
}
