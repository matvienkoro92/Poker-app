import {Color, InstancedMesh, Object3D} from '../../vendor/three/three.module.min.js';
import {GLTFLoader} from '../../vendor/three/addons/loaders/GLTFLoader.js';

export function loadCityTrees(){
 return loadPlanting('street-tree-v1.glb','City trees',(x,z)=>'Tree_'+Math.abs(Math.round(x*7+z*13))%2);
}

export function loadCityPalms(){
 return loadPlanting('coconut-palm-v1.glb','City palms',()=>'Coconut_palm');
}

async function loadPlanting(file,label,selectVariant){
 let model;
 try{
  ({scene:model}=await new GLTFLoader().loadAsync('assets/city-landscape/'+file));
 }catch{
  return null;
 }

 const bins=new Map(), variants=[];
 model.updateMatrixWorld(true);
 model.traverse(mesh=>{
  if(!mesh.isMesh)return;
  // The leaf atlas uses cutouts so overlapping instances can write depth in any order.
  mesh.material.transparent=false;
  mesh.material.depthWrite=true;
  mesh.material.alphaTest=.43;
  mesh.material.metalness=0;
  mesh.material.roughness=.96;
  variants.push(mesh);
 });
 const byName=new Map(variants.map(mesh=>[mesh.name,mesh]));
 function add(x,z,height,base=0,distant=false){
  const variant=selectVariant(x,z);
  const mesh=byName.get(variant+(distant?'_distant':''));
  const key=[mesh.name,Math.floor(x/200),Math.floor(z/200)].join(',');
  if(!bins.has(key))bins.set(key,{mesh,distant,placements:[]});
  bins.get(key).placements.push({x,z,height,base});
 }
 function flush(scene,textures){
  const transform=new Object3D(),tint=new Color();
  const unused=new Set(variants.map(mesh=>mesh.geometry));
  const usedMaterials=new Set();
  for(const {mesh,distant,placements} of bins.values()){
   unused.delete(mesh.geometry);
   usedMaterials.add(mesh.material);
   const instances=new InstancedMesh(mesh.geometry,mesh.material,placements.length);
   instances.name=label+(distant?' · distant':' · detailed');
   for(const [i,{x,z,height,base}] of placements.entries()){
    const variation=(Math.sin(x*12.9898+z*78.233)*43758.5453)%1;
    transform.position.set(x,base,z);
    transform.rotation.y=variation*Math.PI*2;
    transform.scale.set(height*(.92+.12*Math.abs(variation)),height,height);
    transform.updateMatrix();
    instances.setMatrixAt(i,transform.matrix.multiply(mesh.matrixWorld));
    instances.setColorAt(i,tint.setScalar(.88+.12*Math.abs(variation)));
   }
   instances.castShadow=!distant;
   instances.receiveShadow=true;
   instances.computeBoundingSphere();
   scene.add(instances);
  }
  unused.forEach(geometry=>geometry.dispose());
  const maps=new Set();
  for(const material of usedMaterials)if(material.map)maps.add(material.map);
  textures.push(...maps);
 }
 return {add,flush};
}
