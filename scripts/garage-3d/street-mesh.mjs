// Taubin smoothing softens the scanned garment silhouette without shrinking the cuffs.
export function softenStreetGarment(geometry,weightAt){
 const positions=geometry.getAttribute('position'),indices=geometry.index.array;
 const rings=Array.from({length:positions.count},()=>new Set());
 for(let i=0;i<indices.length;i+=3){
  const a=indices[i],b=indices[i+1],c=indices[i+2];
  rings[a].add(b).add(c);rings[b].add(a).add(c);rings[c].add(a).add(b);
 }
 const base=positions.array.slice();
 let current=base;
 for(const strength of [.53,-.55,.53,-.55,.48]){
  const result=current.slice();
  for(let vertex=0;vertex<rings.length;vertex++){
   const ring=rings[vertex],i=vertex*3;
   if(ring.size<3)continue;
   const influence=strength*weightAt(base[i],base[i+1]);
   if(!influence)continue;
   let x=0,y=0,z=0;
   for(const neighbor of ring){
    const j=neighbor*3;
    x+=current[j];y+=current[j+1];z+=current[j+2];
   }
   result[i]+=(x/ring.size-current[i])*influence;
   result[i+1]+=(y/ring.size-current[i+1])*influence;
   result[i+2]+=(z/ring.size-current[i+2])*influence;
  }
  current=result;
 }
 positions.array.set(current);
 positions.needsUpdate=true;
 geometry.computeVertexNormals();
}
