import * as T from '../../vendor/three/three.module.min.js';
import {GLTFLoader} from '../../vendor/three/addons/loaders/GLTFLoader.js';

const baseUrl=document.currentScript?.src||location.href;
const assets={
 'bmw-e60':{file:'./assets/garage/models/bmw-m5-e60-v5.glb?v=20261108-admin-e60',paint:'E60_00'},
 'mustang-gt500':{file:'./assets/garage/models/mustang-shelby-gt500-v1.glb',paint:'carpaint'}
};

export function prepareImportedCar(transport){
 const asset=assets[transport];
 if(!asset.pending){
  const url=new URL(asset.file,baseUrl).href;
  asset.pending=new GLTFLoader().loadAsync(url).then(gltf=>{asset.template=gltf.scene;}).catch(error=>{asset.pending=null;throw error;});
 }
 return asset.pending;
}

export function createImportedCar(scene,look){
 const asset=assets[look.transport];
 if(!asset.template)throw Error('Машина ещё загружается');
 const car=new T.Group();
 car.name=look.transport;
 car.scale.setScalar(1.22);
 const body=asset.template.clone(true),paints=[];
 body.traverse(object=>{
  if(!object.isMesh)return;
  object.geometry=object.geometry.clone();
  object.material=object.material.clone();
  object.castShadow=true;
  object.receiveShadow=true;
  if(object.material.name===asset.paint)paints.push(object.material);
 });
 car.add(body);
 scene.add(car);
 const original=paints.map(material=>material.color.clone());
 function update(value){
  paints.forEach((material,i)=>{
   material.color.copy(value.paint==='classic'?original[i]:new T.Color(window.PokerGarage.item('paint',value.paint).color));
  });
 }
 update(look);
 return {car,update,measureClearance:()=>null};
}
