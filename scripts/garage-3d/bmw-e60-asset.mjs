import * as T from '../../vendor/three/three.module.min.js';
import {GLTFLoader} from '../../vendor/three/addons/loaders/GLTFLoader.js';
const assetUrl=new URL('./assets/garage/models/bmw-m5-e60-v5.glb?v=20261108-admin-e60',document.currentScript?.src||location.href).href;
let template=null,pending=null;
export function prepareBmwE60(){
 if(template)return Promise.resolve();
 if(!pending)pending=new GLTFLoader().loadAsync(assetUrl).then(gltf=>{template=gltf.scene;}).catch(error=>{pending=null;throw error;});
 return pending;
}
export function createBlenderBmwE60(scene,look){
 if(!template)throw Error('BMW E60 ещё загружается');
 const car=new T.Group();car.name='BMW-M5-E60-Blender';car.scale.setScalar(1.22);
 const body=template.clone(true),paints=[];
 body.traverse(object=>{if(!object.isMesh)return;object.geometry=object.geometry.clone();object.material=object.material.clone();object.castShadow=true;object.receiveShadow=true;if(object.material.name==='E60_00')paints.push(object.material);});
 car.add(body);scene.add(car);
 const original=paints.map(m=>m.color.clone());
 function update(value){paints.forEach((material,i)=>{material.color.copy(value.paint==='classic'?original[i]:new T.Color(window.PokerGarage.item('paint',value.paint).color));});}
 update(look);return {car,update,measureClearance:()=>null};
}
