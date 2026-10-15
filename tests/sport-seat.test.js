const test=require('node:test'),assert=require('node:assert/strict');
test('seat cushions sit above the deck and new designs have distinct geometry',async()=>{
 const T=await import('../vendor/three/three.module.min.js'),{sportSeat}=await import('../scripts/garage-3d/sport-seat.mjs');const before=global.document;global.document={createElement:()=>({width:64,height:64,getContext:()=>({fillRect(){}})})};
 try{const models=Object.fromEntries(['red','carbon','emerald','ivory'].map(id=>[id,sportSeat(id)]));const boxes={};for(const [id,model]of Object.entries(models)){model.position.y=1.00;model.updateMatrixWorld(true);const cushion=model.getObjectByName('seat-cushion');assert.ok(cushion);const base=new T.Box3().setFromObject(model.getObjectByName('seat-base'));assert.ok(base.max.y-base.min.y<.09,id+' lower shell should stay thin');boxes[id]=new T.Box3().setFromObject(cushion);assert.ok(boxes[id].min.y>1.43,id+' cushion must clear the tabletop');}assert.ok(boxes.emerald.max.x-boxes.emerald.min.x>boxes.carbon.max.x-boxes.carbon.min.x);assert.ok(boxes.ivory.max.z-boxes.ivory.min.z>boxes.carbon.max.z-boxes.carbon.min.z);
 for(const model of Object.values(models))model.traverse(o=>{o.geometry?.dispose();o.material?.map?.dispose();o.material?.dispose();});
 }finally{if(before===undefined)delete global.document;else global.document=before;}
});
