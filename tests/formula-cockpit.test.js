const test=require('node:test'),assert=require('node:assert/strict');
test('halo clears the arm corridor and front pillar stays beyond the steering wheel',async()=>{
 const T=await import('../vendor/three/three.module.min.js'),{formulaCockpit}=await import('../scripts/garage-3d/formula-cockpit.mjs');const mat=new T.MeshStandardMaterial(),{group}=formulaCockpit({paint:mat,carbon:mat,metal:mat});
 const ring=group.getObjectByName('halo-ring').geometry.getAttribute('position');let checked=0;
 for(let i=0;i<ring.count;i++)if(ring.getX(i)>-.75&&ring.getX(i)<.70){assert.ok(ring.getY(i)>2.38);checked++;}assert.ok(checked>100);
 const pillar=group.getObjectByName('halo-pillar');pillar.geometry.computeBoundingBox();assert.ok(pillar.geometry.boundingBox.min.x>.9);
 group.traverse(m=>m.geometry?.dispose());mat.dispose();
});
