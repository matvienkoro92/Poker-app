import * as T from '../../vendor/three/three.module.min.js';
import {GLTFLoader} from '../../vendor/three/addons/loaders/GLTFLoader.js';

const baseUrl=document.currentScript?.src||location.href;
const assets={
 'bmw-e60':{file:'./assets/garage/models/bmw-m5-e60-v5.glb?v=20261108-admin-e60',paint:'E60_00',glass:'Tinted windows',wheels:'Anthracite alloy'},
 'mustang-gt500':{file:'./assets/garage/models/mustang-shelby-gt500-v1.glb',paint:'carpaint',glass:'tinted_glass',yaw:Math.PI/2,scale:4.812/4.850}
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
 // Both models face +X and use the BMW length as the garage reference.
 car.rotation.y=asset.yaw||0;
 car.scale.setScalar(1.22*(asset.scale||1));
 const G=window.PokerGarage;
 const colors={
  paint:look=>look.paint==='classic'?null:G.item('paint',look.paint).color,
  wheels:look=>look.wheels==='classic'?null:G.wheelPaintColor(look),
  glass:look=>look.glassTint==='original'?null:G.glassTints[look.glassTint]?.color
 };
 const body=asset.template.clone(true),finishes=[];
 body.traverse(object=>{
  if(!object.isMesh)return;
  object.geometry=object.geometry.clone();
  object.material=object.material.clone();
  object.castShadow=true;
  object.receiveShadow=true;
  const kind=Object.keys(colors).find(key=>asset[key]===object.material.name);
  if(kind)finishes.push({kind,material:object.material,original:object.material.color.clone()});
 });
 car.add(body);
 scene.add(car);
 function update(value){
  for(const {kind,material,original} of finishes){
   const color=colors[kind](value);
   if(color)material.color.set(color);
   else material.color.copy(original);
  }
 }
 update(look);
 return {car,update,measureClearance:()=>null};
}
