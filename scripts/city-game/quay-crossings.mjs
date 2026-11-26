// Axis is the direction of traffic. Lanes match the coastal circuit.
export const quayCrossings=[
 {axis:'z',center:96,lanes:[70,74],stops:[92.9,99.1],poles:[[66.15,93.6],[77.94,98.35]]},
 {axis:'x',center:48,lanes:[107,103],stops:[44.9,51.1],poles:[[45.75,110.91],[50.25,99.05]]}
];
export const streetFences=[
 {x:78,z:88,w:.12,d:10,h:1.02},{x:78,z:104.8,w:.12,d:9,h:1.02},
 {x:66.08,z:87.4,w:.12,d:8,h:1.02},{x:52.3,z:109.51,w:2.2,d:.12,h:1.02},
 {x:58.05,z:109.51,w:4.3,d:.12,h:1.02}
];
export const litterBins=[{x:82,z:92.75,w:.48,d:.48,h:.85},{x:82,z:104.3,w:.48,d:.48,h:.85}];
export function crossingPhase(time){
 const t=time%30;
 if(t<18)return 'green';
 if(t<21)return 'amber';
 return 'red';
}
export function signalGap(car,time){
 if(car.id>1||crossingPhase(time)==='green')return Infinity;
 for(const c of quayCrossings){
  const alongZ=c.axis==='z',heading=alongZ?Math.cos(car.yaw):Math.sin(car.yaw);
  if(Math.abs(heading)<.9)continue;
  const lane=heading>0?0:1;
  if(Math.abs((alongZ?car.x:car.z)-c.lanes[lane])>1.5)continue;
  const gap=(c.stops[lane]-(alongZ?car.z:car.x))*Math.sign(heading)-2.35;
  if(gap>=-.01&&gap<14)return Math.max(0,gap);
 }
 return Infinity;
}
