// Lane centres in metres, following the same junctions as the road mesh.
import {ROAD_X,ROAD_Z,estateExitRoute} from './world.mjs';
const [west,centre,east]=ROAD_X,[port,club,quay]=ROAD_Z;
const [,gate,bend,join]=estateExitRoute();
function circuit(points){
 const path=[];
 for(let i=0;i<points.length;i++){
  const [x,z]=points[i],prev=points[(i+points.length-1)%points.length],next=points[(i+1)%points.length];
  const inset=p=>{const dx=p[0]-x,dz=p[1]-z,k=Math.min(.4,3/Math.hypot(dx,dz));return [x+dx*k,z+dz*k];};
  const a=inset(prev),b=inset(next);
  for(let j=0;j<=5;j++){const t=j/5,u=1-t;path.push({x:u*u*a[0]+2*u*t*x+t*t*b[0],z:u*u*a[1]+2*u*t*z+t*t*b[1]});}
 }
 return path;
}
const coast=circuit([[gate.x+2,gate.z-2],[bend.x+2,bend.z+2],[join.x+2,join.z+2],[east+2,quay-2],[centre-2,quay-2],[centre-2,club-2],[east-2,club-2],[east-2,join.z-2],[bend.x-2,bend.z-2],[gate.x-2,gate.z-2]]);
const downtown=circuit([[west+2,quay-2],[west+2,port+2],[centre-2,port+2],[centre-2,quay-2]]);
const docks=circuit([[east+1,club+2],[east+1,port-2],[west-2,port-2],[west-2,club+2]]);
export const fleet=[
 {path:coast,start:4,pace:6.5,color:'#a54e35',kind:'uaz'},
 {path:coast,start:46,pace:6.5,color:'#d7c3a0',kind:'vaz'},
 {path:downtown,start:0,pace:8,color:'#d4a54f',kind:'taxi'},
 {path:downtown,start:14,pace:8,color:'#607449',kind:'uaz'},
 {path:docks,start:6,pace:6,color:'#a63540',kind:'vaz'},
 {path:docks,start:19,pace:6,color:'#496b8c',kind:'uaz'}
];
export function createTraffic(){return fleet.map(({path,start,pace},id)=>{const p=path[start],route=(start+1)%path.length,n=path[route];return {...p,id,route,speed:pace,yaw:Math.atan2(n.x-p.x,n.z-p.z)};});}
export function advanceTraffic(t,dt){
 const {path,pace}=fleet[t.id];let remaining=dt;
 while(remaining>0){
  const n=path[t.route],dx=n.x-t.x,dz=n.z-t.z,d=Math.hypot(dx,dz);
  t.speed=pace*(d<4?.72:1);const travel=Math.min(d,t.speed*remaining);
  if(d>0){t.yaw=Math.atan2(dx,dz);t.x+=dx*travel/d;t.z+=dz*travel/d;}
  if(travel<d)break;
  remaining-=travel/t.speed;t.route=(t.route+1)%path.length;
 }
}
