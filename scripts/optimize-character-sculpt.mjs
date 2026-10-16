import fs from 'node:fs';
import {MeshoptSimplifier} from '../vendor/meshoptimizer/meshopt_simplifier.mjs';
await MeshoptSimplifier.ready;
// Opposite duplicate triangles are zero-volume fins, which can occur when an
// isosurface passes exactly through a tetrahedron edge. Cancel those pairs.
function cleanTriangles(indices){const faces=[],seen=new Map();for(let i=0;i<indices.length;i+=3){const tri=Array.from(indices.subarray(i,i+3));if(new Set(tri).size<3)continue;const key=[...tri].sort((a,b)=>a-b).join(':');let inversions=0;for(let a=0;a<3;a++)for(let b=a+1;b<3;b++)if(tri[a]>tri[b])inversions++;const parity=inversions%2;if(seen.has(key)){const old=seen.get(key);if(old.parity!==parity){faces[old.index]=null;seen.delete(key);}continue;}seen.set(key,{index:faces.length,parity});faces.push(tri);}return new Uint32Array(faces.filter(Boolean).flat());}

for(const [name,triangles]of [['head',18000],['face',18000],['hand-left',12000],['hand-right',12000],['shirt-tee',22000],['shirt-jacket',28000],['shirt-tank',18000],['shorts',18000],['pants',24000],['helmet-shell',20000]]){
 const path='assets/player-hall/character-3d/sculpt/'+name+'.bin',buffer=fs.readFileSync(path),header=buffer.readUInt32LE(0),meta=JSON.parse(buffer.subarray(4,header+4).toString()),start=header+4;
 const positions=new Float32Array(buffer.buffer,buffer.byteOffset+start,meta.vertices*3),normals=new Float32Array(buffer.buffer,buffer.byteOffset+start+meta.vertices*12,meta.vertices*3),indices=new Uint32Array(buffer.buffer,buffer.byteOffset+start+meta.vertices*24,meta.indices);
 const [simplified,error]=meta.indices>triangles*3?MeshoptSimplifier.simplifyWithAttributes(cleanTriangles(indices),positions,3,normals,3,[.05,.05,.05],null,triangles*3,.003,['RegularizeLight']):[indices,meta.error||0];
 const result=cleanTriangles(simplified);
 const [remap,count]=MeshoptSimplifier.compactMesh(result),p=new Float32Array(count*3),n=new Float32Array(count*3);
 for(let i=0;i<remap.length;i++)if(remap[i]!==0xffffffff){p.set(positions.subarray(i*3,i*3+3),remap[i]*3);n.set(normals.subarray(i*3,i*3+3),remap[i]*3);}
 let text=JSON.stringify({vertices:count,indices:result.length,error});text+=' '.repeat((4-text.length%4)%4);const size=Buffer.alloc(4);size.writeUInt32LE(Buffer.byteLength(text));const out=Buffer.concat([size,Buffer.from(text),Buffer.from(p.buffer),Buffer.from(n.buffer),Buffer.from(result.buffer)]);fs.writeFileSync(path,out);console.log(name,meta.indices/3,'→',result.length/3,'triangles;',out.length,'bytes; error',error);
}
