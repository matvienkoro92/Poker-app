import * as T from '../../vendor/three/three.module.min.js';
import {GLTFLoader} from '../../vendor/three/addons/loaders/GLTFLoader.js';
const url=new URL('./assets/garage/models/bicycle-v1.glb',document.currentScript?.src||location.href).href;
let template,pending;
export function prepareBicycle(){if(template)return Promise.resolve();if(!pending)pending=new GLTFLoader().loadAsync(url).then(gltf=>{template=gltf.scene;}).catch(error=>{pending=null;throw error;});return pending;}
export function createBicycle(scene,look){
 if(!template)throw Error('Велосипед ещё загружается');
 const car=new T.Group();car.name='Club bicycle';car.scale.setScalar(1.75);const model=template.clone(true);car.add(model);scene.add(car);
 model.traverse(o=>{if(!o.isMesh)return;o.geometry=o.geometry.clone();o.material=o.material.clone();o.castShadow=true;o.receiveShadow=true;});
 function update(value){const selected={...window.PokerBicycle.defaults,...value.bicycle};model.traverse(o=>{const match=/^bike__([a-z]+)__([a-z]+)$/.exec(o.name);if(match)o.visible=match[2]==='always'||selected[match[1]]===match[2];if(o.isMesh&&o.material.name==='Bicycle frame')o.material.color.set(selected.frame==='ruby'?'#b91c32':'#126aa0');if(o.isMesh&&o.material.name==='Headlight lens'){o.material.emissive.set('#e7f5ff');o.material.emissiveIntensity=.6;}});}
 update(look);return {car,update,measureClearance:()=>null};
}
