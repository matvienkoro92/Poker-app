import * as T from '../../vendor/three/three.module.min.js';
// Cluster in world units, preserving UV islands and hard normal seams.
export function streetGeometry(source,matrix){
 const g=source.clone().applyMatrix4(matrix),p=g.attributes.position,n=g.attributes.normal,uv=g.attributes.uv,lookup=new Map(),clusters=[],remap=[];
 for(let i=0;i<p.count;i++){
  const normal=[n?.getX(i)||0,n?.getY(i)??1,n?.getZ(i)||0],tex=[uv?.getX(i)||0,uv?.getY(i)||0];
  const key=[Math.round(p.getX(i)/.12),Math.round(p.getY(i)/.12),Math.round(p.getZ(i)/.12),...normal.map(v=>Math.round(v)),...tex.map(v=>Math.round(v*4))].join(',');
  let id=lookup.get(key);if(id===undefined){id=clusters.length;lookup.set(key,id);clusters.push({position:[0,0,0],normal:[0,0,0],uv:[0,0],count:0});}
  const c=clusters[id];c.count++;c.position[0]+=p.getX(i);c.position[1]+=p.getY(i);c.position[2]+=p.getZ(i);for(let j=0;j<3;j++)c.normal[j]+=normal[j];for(let j=0;j<2;j++)c.uv[j]+=tex[j];remap.push(id);
 }
 const indices=[],seen=new Set(),count=g.index?.count||p.count;
 for(let i=0;i<count;i+=3){const a=remap[g.index?g.index.getX(i):i],b=remap[g.index?g.index.getX(i+1):i+1],c=remap[g.index?g.index.getX(i+2):i+2];if(a===b||b===c||a===c)continue;const key=[a,b,c].sort((a,b)=>a-b).join(',');if(seen.has(key))continue;seen.add(key);indices.push(a,b,c);}
 const result=new T.BufferGeometry();result.setAttribute('position',new T.Float32BufferAttribute(clusters.flatMap(c=>c.position.map(v=>v/c.count)),3));result.setAttribute('normal',new T.Float32BufferAttribute(clusters.flatMap(c=>c.normal),3));result.setAttribute('uv',new T.Float32BufferAttribute(clusters.flatMap(c=>c.uv.map(v=>v/c.count)),2));result.setIndex(indices);result.normalizeNormals();result.computeBoundingSphere();g.dispose();return result;
}
