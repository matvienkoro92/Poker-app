const test=require('node:test'),assert=require('node:assert/strict');
test('glasses have lenses and temple arms that follow the head through a full orbit',async()=>{
 const T=await import('../vendor/three/three.module.min.js'),{createCharacterRig}=await import('../scripts/garage-3d/character-rig.mjs'),{addCharacterEyewear}=await import('../scripts/garage-3d/character-eyewear.mjs');
 for(const glasses of ['aviatorGold','wayfarerBlack','roundGold','rimlessSilver','tortoise','ovalBlack','sportMirror','browline']){
  const root=new T.Group(),rig=createCharacterRig(root),detail=addCharacterEyewear(rig,{glasses,helmet:'none'},{item:()=>({color:'#9b8755'})});
  root.updateMatrixWorld(true);const group=rig.bones.head.children.find(o=>o.isGroup);assert.ok(group,glasses);
  const box=new T.Box3().setFromObject(group);assert.ok(box.min.z<.10&&box.max.z>.38,'temples reach behind lenses');assert.ok(box.min.y>1.5&&box.max.y<1.75);
  const lens=group.children.find(o=>o.material.isMeshPhysicalMaterial),point=new T.Vector3().fromBufferAttribute(lens.geometry.getAttribute('position'),0),before=point.clone().applyMatrix4(lens.matrixWorld);
  rig.bones.head.rotation.y=Math.PI/2;root.updateMatrixWorld(true);assert.ok(point.clone().applyMatrix4(lens.matrixWorld).distanceTo(before)>.2);
  let freed=0;lens.geometry.addEventListener('dispose',()=>freed++);detail.dispose();assert.equal(freed,1);assert.equal(group.parent,null);rig.dispose();
 }
});
