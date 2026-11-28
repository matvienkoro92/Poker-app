import {outlines} from './pimenov-survey.mjs';

export const library={x:115.7,z:43.22,w:10,d:29.1,h:12.4,color:'#d6d1bf',name:'ГПНТБ'};
// The point comes from the kiosk listing, distinct from the address building.
export const kiosk={x:78.06,z:12.01,w:3.2,d:4.2,h:3.1};
export const basins=[
 {id:34126326,x:95.9,z:43.55,r:3.3,jet:3.7},
 {id:34126325,x:94.81,z:34.45,r:1.47,jet:1.6},
 {id:34126324,x:94.64,z:52.67,r:1.47,jet:1.6}
];
export function footprintSlices(points,h){
 const zs=points.map(p=>p[1]),low=Math.min(...zs),high=Math.max(...zs);
 const count=Math.ceil((high-low)/.25),d=(high-low)/count;
 return Array.from({length:count},(_,i)=>{
  const z=low+(i+.5)*d,cuts=[];
  for(let j=1;j<points.length;j++){
   const [ax,az]=points[j-1],[bx,bz]=points[j];
   if((az>z)!==(bz>z))cuts.push(ax+(bx-ax)*(z-az)/(bz-az));
  }
  const left=Math.min(...cuts),right=Math.max(...cuts);
  return {x:(left+right)/2,z,w:right-left,d,h};
 });
}
export const boulevardTrees=Array.from({length:6},(_,i)=>[
 {x:13+i*8,z:42.05,h:4.3},{x:15+i*8,z:44.48,h:4.8}
]).flat().filter(tree=>Math.abs(tree.x-15)>2.6);
export const alleyBenchStations=[26,38,50];
const alleyFurniture=alleyBenchStations.flatMap(x=>[
 ...[42.25,44.15].map(z=>({x,z,w:1.5,d:.49,h:1.08})),
 {x:x+2,z:42.05,w:.3,d:.3,h:3.28},{x:x+1.13,z:42.12,w:.32,d:.32,h:.76}
]);
export const squareFixtures=[kiosk,...alleyFurniture,...boulevardTrees.map(tree=>({...tree,w:.32,d:.32})),...footprintSlices(outlines[25643643],library.h),
 ...basins.flatMap(b=>footprintSlices(outlines[b.id],.64))];
