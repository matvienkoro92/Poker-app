const test=require('node:test'),assert=require('node:assert/strict');
test('awards can be picked nearby, but not through walls, from behind or while driving',async()=>{
 const T=await import('../vendor/three/three.module.min.js'),{createAwardInteraction}=await import('../scripts/city-game/award-interaction.mjs');
 const scene=new T.Scene(),root=new T.Group();scene.add(root);const camera=new T.PerspectiveCamera(50,1,.1,100);camera.position.set(0,1,4);camera.lookAt(0,1,0);const target=new T.Mesh(new T.BoxGeometry(.8,.8,.1),new T.MeshBasicMaterial());target.position.y=1;root.add(target);const record={item:{id:'test'},target,source:'award.webp'};target.userData.awardRecord=record;root.userData.awardTargets=[record];scene.updateMatrixWorld(true);camera.updateMatrixWorld(true);
 const interaction=createAwardInteraction({root,scene,camera,canvas:{getBoundingClientRect:()=>({left:0,top:0,width:200,height:200})}}),state={player:{x:0,z:2.5},driving:false};
 assert.equal(interaction.nearest(state),record);assert.equal(interaction.pick(100,100,state),record);assert.equal(interaction.nearest({...state,driving:true}),null);assert.equal(interaction.nearest({...state,player:{x:0,z:8}}),null);assert.equal(interaction.nearest({...state,player:{x:0,z:-2}}),null);
 const wall=new T.Mesh(new T.BoxGeometry(3,3,.2),new T.MeshBasicMaterial());wall.position.set(0,1,1);scene.add(wall);scene.updateMatrixWorld(true);assert.equal(interaction.pick(100,100,state),null);
});
