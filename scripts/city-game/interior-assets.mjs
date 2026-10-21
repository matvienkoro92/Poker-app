import * as T from '../../vendor/three/three.module.min.js';
import {GLTFLoader} from '../../vendor/three/addons/loaders/GLTFLoader.js';

// Authored CC0 models, kept local with their source manifests and 1K PBR maps.
export async function loadHallFurniture(root,textures,materials){
 const loader=new GLTFLoader();
 async function load(url,name,x,z,height,y=.08){
  const gltf=await loader.loadAsync(url),model=gltf.scene;
  if(root.userData.disposed){model.traverse(o=>{o.geometry?.dispose();for(const mat of [].concat(o.material||[])){for(const value of Object.values(mat))if(value?.isTexture)value.dispose();mat.dispose();}});return null;}
  const bounds=new T.Box3().setFromObject(model),size=bounds.getSize(new T.Vector3()),scale=height/size.y;
  const mount=new T.Group();mount.name=name;model.position.set(-(bounds.min.x+bounds.max.x)/2,-bounds.min.y,-(bounds.min.z+bounds.max.z)/2);mount.add(model);mount.scale.setScalar(scale);mount.position.set(x,y,z);
  const seen=new Set();model.traverse(o=>{if(!o.isMesh)return;o.castShadow=o.receiveShadow=true;for(const mat of [].concat(o.material)){mat.envMapIntensity=.65;if(mat.roughnessMap){mat.aoMap=mat.roughnessMap;mat.aoMapIntensity=.7;}for(const value of Object.values(mat))if(value?.isTexture&&!seen.has(value)){seen.add(value);value.anisotropy=4;textures.push(value);}}});root.add(mount);return mount;
 }
 const results=await Promise.allSettled([
  load('assets/city-interior/armchair/ArmChair_01_1k.gltf','Authored hall armchair',0,6,2.05),
  load('assets/city-interior/coffee-table/coffee_table_round_01_1k.gltf','Authored marble coffee table',0,9.6,.95),
  load('assets/city-interior/plant/potted_plant_01-mobile.gltf','Authored hall plant',-4,5,2.3).then(first=>{if(first&&!root.userData.disposed){const second=first.clone();second.name='Authored hall plant right';second.position.x=4;second.rotation.y=1.6;root.add(second);}return first;}),
  load('assets/city-interior/pendant/modern_ceiling_lamp_01_1k.gltf','Authored hall pendant',0,8,1.25,3.8)
 ]);
 // Real floor grain, normal and roughness maps; UVs use a consistent room scale.
 const floorLoader=new T.TextureLoader();
 try{const maps=await Promise.all(['diff','nor_gl','rough'].map(kind=>floorLoader.loadAsync('assets/city-interior/wood-floor/wood_floor_'+kind+'_1k.webp')));
 if(root.userData.disposed){maps.forEach(t=>t.dispose());}else{maps.forEach(t=>{t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(3,4);t.anisotropy=4;textures.push(t);});maps[0].colorSpace=T.SRGBColorSpace;
 const floor=new T.Mesh(new T.PlaneGeometry(11.5,15.7),new T.MeshStandardMaterial({map:maps[0],normalMap:maps[1],roughnessMap:maps[2],normalScale:new T.Vector2(.35,.35),roughness:.85}));floor.name='Authored hall wood floor';floor.rotation.x=-Math.PI/2;floor.position.set(0,.06,8);floor.receiveShadow=true;root.add(floor);}
 }catch(_){/* Existing stone floor remains available offline. */}
 if(materials){try{const maps=await Promise.all(['diff','nor_gl','rough'].map(kind=>floorLoader.loadAsync('assets/city-interior/walnut/european_walnut_veneer_05_'+kind+'_1k.webp')));if(root.userData.disposed)maps.forEach(t=>t.dispose());else{maps.forEach(t=>{t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(1,2);t.anisotropy=4;textures.push(t);});maps[0].colorSpace=T.SRGBColorSpace;Object.assign(materials.hallWalnut,{map:maps[0],normalMap:maps[1],roughnessMap:maps[2],normalScale:new T.Vector2(.18,.18),needsUpdate:true});}}catch(_){/* Keep the registered fallback finish. */}}
 return {plant:results[2].status==='fulfilled'&&!!results[2].value,pendant:results[3].status==='fulfilled'&&!!results[3].value,chair:results[0].status==='fulfilled'&&!!results[0].value,table:results[1].status==='fulfilled'&&!!results[1].value};
}
