import {kremsDriveways,kremsEntrance} from './krems-plan.mjs';
import {roadRoute} from './world.mjs';

const point=([x,z])=>({x,z});
const [kirovaDriveway]=kremsDriveways;
// Round the right turn on Kirova using the car's steering radius.
const parkingApproach=[
 [72,-59.95],[72.45,-62.25],[73.75,-64.2],[75.8,-65.5],
 ...kirovaDriveway[0].toReversed().slice(1),[86,-65.75]
].map(point);
const sidewalkApproach=[
 [86,-65.75],[91.8,-64.23],[93.7,-64.22],[95.91,-64.22],
 [95.96,-82.69],[kremsEntrance.x,-82.87],[kremsEntrance.x,kremsEntrance.frontZ-.83]
].map(point);

export const kremsDestination={
 id:'krems',
 name:'Кремс · Московская, 77',
 title:'Кремс'
};

function remainingRoute(position,points,maxOffset=3){
 let best=maxOffset,next=0,start=null;
 for(let i=1;i<points.length;i++){
  const a=points[i-1],b=points[i],dx=b.x-a.x,dz=b.z-a.z;
  const t=Math.max(0,Math.min(1,((position.x-a.x)*dx+(position.z-a.z)*dz)/(dx*dx+dz*dz)));
  const projection={x:a.x+dx*t,z:a.z+dz*t};
  const offset=Math.hypot(position.x-projection.x,position.z-projection.z);
  if(offset>=best)continue;
  best=offset;
  next=i+Number(t===1);
  start=projection;
 }
 return start?[start,...points.slice(next)]:null;
}

export function kremsNavigation(position,driving){
 const walkingPath=driving?null:remainingRoute(position,sidewalkApproach,4);
 if(walkingPath){
  return {target:sidewalkApproach.at(-1),path:walkingPath,detail:'Пешком через Московскую · вход с Маковского'};
 }
 const target=parkingApproach.at(-1),entry=parkingApproach[0];
 const path=remainingRoute(position,parkingApproach)??[...roadRoute(position,entry),...parkingApproach];
 const parked=Math.hypot(position.x-target.x,position.z-target.z)<3;
 return {target,path,detail:parked?'Припаркуйтесь и выйдите из машины':'По Кирова мимо «Бахетле» · заезд на парковку с Кирова'};
}
