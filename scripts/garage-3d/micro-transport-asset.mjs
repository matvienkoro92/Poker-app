import * as T from '../../vendor/three/three.module.min.js';
import {GLTFLoader} from '../../vendor/three/addons/loaders/GLTFLoader.js';
const base=document.currentScript?.src||location.href;
const urls={scooter:new URL('./assets/garage/models/scooter-v1.glb',base).href,hoverboard:new URL('./assets/garage/models/skyboard-v1.glb',base).href};
const templates={},pending={};
export function prepareMicroTransport(id){if(templates[id])return Promise.resolve();return pending[id]||(pending[id]=new GLTFLoader().loadAsync(urls[id]).then(gltf=>{templates[id]=gltf.scene;}).catch(error=>{delete pending[id];throw error;}));}
export function createMicroTransport(scene,look){
 const id=look.transport;if(!templates[id])throw Error('Транспорт ещё загружается');
 const car=new T.Group();car.name=id==='scooter'?'Hyper scooter':'Skyboard';car.scale.setScalar(id==='scooter'?1.9:2.4);const model=templates[id].clone(true);car.add(model);scene.add(car);
 model.traverse(o=>{if(o.isMesh){o.geometry=o.geometry.clone();o.material=o.material.clone();o.castShadow=true;o.receiveShadow=true;}});
 const flames=[];
 if(id==='hoverboard'){
  // Tapered exhaust points down from each of the four lift nozzles.
  for(const x of [-.36,.36])for(const z of [-.21,.21]){
   const jet=new T.Group();jet.position.set(x,.245,z);car.add(jet);
   for(const [radius,length,color,opacity] of [[.056,.22,'#ff7718',.65],[.036,.17,'#ffc74a',.85],[.020,.11,'#fff5cf',1]]){
    const geometry=new T.ConeGeometry(radius,length,12,1,true);geometry.rotateZ(Math.PI);geometry.translate(0,-length/2,0);
    const material=new T.MeshBasicMaterial({color,transparent:true,opacity,depthWrite:false,side:T.DoubleSide,blending:T.AdditiveBlending});
    const flame=new T.Mesh(geometry,material);flame.name='Skyboard exhaust flame';jet.add(flame);
   }
   flames.push(jet);
  }
 }
 function update(value){if(id!=='scooter')return;const selected={...window.PokerScooter.defaults,...value.scooter};model.traverse(o=>{const match=/^sc__([a-z]+)__([a-z]+)$/.exec(o.name);if(match)o.visible=match[2]==='always'||selected[match[1]]===match[2];if(o.isMesh&&o.material.name==='Scooter frame')o.material.color.set(selected.frame==='gold'?'#d4a13c':'#475560');});}
 update(look);return {car,update,measureClearance:()=>null,animate:id==='hoverboard'?time=>{flames.forEach((jet,i)=>{jet.scale.y=1+Math.sin(time*.021+i*1.7)*.12;});car.position.y=Math.sin(time*.0018)*.065;car.rotation.x=Math.sin(time*.0011)*.018;car.rotation.z=Math.sin(time*.0014)*.015;}:undefined};
}
