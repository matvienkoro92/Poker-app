// Axis is the direction of traffic. Lanes match the coastal circuit.
// Each approach has its own zebra and an upstream stop in the incoming lane.
function approach(axis, roadCenter, center, direction){
 const stop=center-direction*3.6;
 const side=axis==='z'?-direction:direction;
 const lane=roadCenter+side*2;
 const shoulder=roadCenter+side*5.95;
 const pole=axis==='z'?[shoulder,stop]:[stop,shoulder];
 return {axis,roadCenter,center,direction,lane,stop,pole};
}
export const quayCrossings=[
 approach('z',72,96,1), approach('x',105,62,1),
 approach('x',105,49,-1), approach('z',40,115,-1)
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
  if(Math.sign(heading)!==c.direction)continue;
  if(Math.abs((alongZ?car.x:car.z)-c.lane)>1.5)continue;
  const gap=(c.stop-(alongZ?car.z:car.x))*Math.sign(heading)-2.35;
  if(gap>=-.01&&gap<14)return Math.max(0,gap);
 }
 return Infinity;
}
