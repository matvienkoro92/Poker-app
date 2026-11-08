const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
test('BMW E60 is a self-contained mobile GLB within the asset budget',()=>{
 const bytes=fs.readFileSync(path.join(__dirname,'../assets/garage/models/bmw-m5-e60-v5.glb'));
 assert.equal(bytes.toString('ascii',0,4),'glTF');assert.equal(bytes.readUInt32LE(4),2);
 assert.equal(bytes.readUInt32LE(8),bytes.length);assert.ok(bytes.length<10*1024*1024,'Model must stay below 10 MiB');
 const length=bytes.readUInt32LE(12),gltf=JSON.parse(bytes.toString('utf8',20,20+length));
 assert.equal((gltf.images||[]).length,0,'Do not add heavy texture downloads');
 assert.ok(gltf.buffers.every(buffer=>!buffer.uri),'GLB must not depend on external buffers');
 const primitives=gltf.meshes.flatMap(mesh=>mesh.primitives);
 const paint=gltf.materials.findIndex(material=>material.name==='E60_00');
 assert.ok(paint>=0&&primitives.some(primitive=>primitive.material===paint),'Keep the painted body in the export');
 assert.ok(primitives.length<=32,'Keep the material/draw-call budget bounded');
 const triangles=primitives.reduce((sum,p)=>sum+gltf.accessors[p.indices].count/3,0);
 assert.ok(triangles<500000,'Keep the triangle budget bounded');
});
