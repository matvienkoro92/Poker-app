const test=require('node:test'),assert=require('node:assert/strict');
test('closing a scene disposes material arrays, shadow variants and shared resources exactly once',async()=>{
 const T=await import('../vendor/three/three.module.min.js'),{disposeSceneResources}=await import('../scripts/garage-3d/scene-resources.mjs'),scene=new T.Scene(),geometry=new T.BoxGeometry(),map=new T.Texture(),a=new T.MeshStandardMaterial({map}),b=new T.MeshStandardMaterial({map}),depth=new T.MeshDepthMaterial(),distance=new T.MeshDistanceMaterial(),first=new T.Mesh(geometry,[a,b]),second=new T.Mesh(geometry,a);first.visible=false;first.customDepthMaterial=depth;first.customDistanceMaterial=distance;scene.add(first,second);
 const counts=new Map();for(const resource of [geometry,map,a,b,depth,distance]){counts.set(resource,0);resource.addEventListener('dispose',()=>counts.set(resource,counts.get(resource)+1));}
 disposeSceneResources(scene);for(const count of counts.values())assert.equal(count,1);
});
