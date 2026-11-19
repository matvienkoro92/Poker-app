import {Color, Group, Quaternion, Skeleton, Vector3} from '../../vendor/three/three.module.min.js';
import {GLTFLoader} from '../../vendor/three/addons/loaders/GLTFLoader.js';
import {HOME} from './world.mjs';

const loop=Math.PI*2;
const cats=[
 {name:'Тигра',x:86,z:148,rx:.65,rz:.8,scale:1.02,coat:'#ffc18a',period:12,walk:9},
 {name:'Дымок',x:76,z:145,rx:1.15,rz:.75,scale:1.1,coat:'#b8c6dc',period:16,walk:11},
 {name:'Уголёк',x:-46,z:55,rx:1.35,rz:.9,scale:.94,coat:'#4b5061',period:17,walk:12},
 {name:'Ириска',x:31,z:55,rx:1.45,rz:1,scale:.78,coat:'#ffe4bb',period:14,walk:12},
 {name:'Пират',x:86,z:-55,rx:1.1,rz:.8,scale:1.16,coat:'#af907d',period:15,walk:11},
 {name:'Мята',x:194,z:93,rx:1.3,rz:.9,scale:.9,coat:'#e5e6df',period:19,walk:8},
 {name:'Фишка',x:HOME.x-9,z:HOME.z+10,rx:1.15,rz:.78,scale:1,coat:'#ddaa82',period:17,walk:10},
];
const legs=[['n21','n22','n23',0],['n24','n25','n26',.5],['n28','n29','n30',.75],['n31','n32','n33',.25]];

function cloneCat(source){
 const copy=source.clone(true),nodes=new Map();
 function pair(original,clone){
  nodes.set(original,clone);
  original.children.forEach((child,i)=>pair(child,clone.children[i]));
 }
 pair(source,copy);
 copy.updateMatrixWorld(true);
 for(const [original,clone] of nodes){
  if(!original.isSkinnedMesh)continue;
  clone.bind(new Skeleton(original.skeleton.bones.map(bone=>nodes.get(bone)),original.skeleton.boneInverses),original.bindMatrix);
 }
 return copy;
}

export async function addCityCats(scene,textures,disposers,heightAt){
 let source;
 try{
  ({scene:source}=await new GLTFLoader().loadAsync('assets/city-animals/city-cat-v1.glb'));
 }catch{
  return ()=>{};
 }
 const maps=new Set(), sourceMaterials=new Set();
 const actors=cats.map((spec,index)=>{
  const model=cloneCat(source),root=new Group(),bones=new Map(),skeletons=new Set();
  model.traverse(node=>{
   if(node.isSkinnedMesh){
    skeletons.add(node.skeleton);
    node.castShadow=true;
    sourceMaterials.add(node.material);
    node.material=node.material.clone();
    node.material.color.multiply(new Color(spec.coat));
    if(node.material.map)maps.add(node.material.map);
   }
   if(node.isBone){
    const inverse=node.getWorldQuaternion(new Quaternion()).invert();
    bones.set(node.name,{
     node,rest:node.quaternion.clone(),
     pitch:new Vector3(1,0,0).applyQuaternion(inverse),
     yaw:new Vector3(0,1,0).applyQuaternion(inverse),
    });
   }
  });
  root.name='City cat '+spec.name;
  root.scale.setScalar(spec.scale);
  root.add(model);
  root.visible=false;
  disposers.push(()=>skeletons.forEach(skeleton=>skeleton.dispose()));
  scene.add(root);
  return {spec,index,root,bones};
 });
 sourceMaterials.forEach(material=>material.dispose());
 textures.push(...maps);
 const turn=new Quaternion();
 function rotate(bones,name,axis,angle){
  const bone=bones.get(name);
  if(bone)bone.node.quaternion.copy(bone.rest).multiply(turn.setFromAxisAngle(bone[axis],angle));
 }

 return function update(time,near){
  for(const {spec,index,root,bones} of actors){
   root.visible=Math.hypot(near.x-spec.x,near.z-spec.z)<65;
   if(!root.visible)continue;
   const cycle=(time+index*2.9+1.8)%spec.period;
   const p=Math.min(1,cycle/spec.walk), angle=loop*p*p*(3-2*p);
   const x=spec.x+Math.cos(angle)*spec.rx,z=spec.z+Math.sin(angle)*spec.rz;
   const gait=4*p*(1-p);
   root.position.set(x,heightAt(x,z)+.006+.012*gait*Math.sin(angle*14),z);
   root.rotation.y=Math.atan2(-Math.sin(angle)*spec.rx,Math.cos(angle)*spec.rz);
   for(const [upper,mid,paw,phase] of legs){
    const stride=Math.sin(angle*7+phase*loop);
    const lift=Math.max(0,stride);
    rotate(bones,upper,'pitch',-.27*stride*gait);
    rotate(bones,mid,'pitch',.36*lift*gait*(phase<.6?1:-1));
    rotate(bones,paw,'pitch',-.18*lift*gait);
   }
   rotate(bones,'n14','pitch',.045*Math.sin(time*3+index)+(1-gait)*.13*Math.max(0,Math.sin(time*1.1+index)));
   rotate(bones,'n15','yaw',(.08+.16*(1-gait))*Math.sin(time*1.45+index));
   for(const [i,name] of ['n34','n35','n36'].entries()){
    rotate(bones,name,'yaw',(.17+i*.045)*Math.sin(time*3.25+index-i*.62));
   }
  }
 };
}
