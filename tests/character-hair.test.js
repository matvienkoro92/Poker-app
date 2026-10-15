const test=require('node:test'),assert=require('node:assert/strict');
test('every hairstyle has head-bound volume; bald and helmets hide hair',async()=>{
 const T=await import('../vendor/three/three.module.min.js'),{createCharacterRig}=await import('../scripts/garage-3d/character-rig.mjs'),{addCharacterHair}=await import('../scripts/garage-3d/character-hair.mjs');
 for(const id of ['hairBuzz','hairPompadour','hairCurly','hairSidePart','hairMohawk','hairSilver','hairRocker','hairBlond','hairDreads','hairAfro','hairBlue']){
  const root=new T.Group(),rig=createCharacterRig(root),hair=addCharacterHair(rig,{hair:id,helmet:'none',hat:'none'});root.updateMatrixWorld(true);
  const group=rig.bones.head.children.find(o=>o.isGroup);assert.ok(group&&group.children.length>0,id);const box=new T.Box3().setFromObject(group);assert.ok(box.max.y>1.7&&box.min.y>1.2,id);assert.ok(box.max.x<.5&&box.min.x>-.5,id);
  rig.bones.head.rotation.y=.7;root.updateMatrixWorld(true);assert.ok(group.parent===rig.bones.head);hair.dispose();assert.ok(!group.parent);rig.dispose();
 }
 const root=new T.Group(),rig=createCharacterRig(root);for(const look of [{hair:'hairNatural'},{hair:'hairBald'},{hair:'hairAfro',helmet:'silver'}]){const hair=addCharacterHair(rig,look);assert.ok(!rig.bones.head.children.some(o=>o.isGroup&&o.children.length));hair.dispose();}rig.dispose();
});
