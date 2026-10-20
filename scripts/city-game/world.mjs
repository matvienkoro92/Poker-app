import {buildingSolids,districtTrees} from './district-plan.mjs';
import {estateFeatures} from './estate-plan.mjs';
// Metres. Shared by collision, rendering, route guidance and tests.
export const CLUB={x:-24,z:-23,w:30,d:24};
export const PORT={x:86,z:-70,w:22,d:24};
export const VILLA={x:98,z:147,w:32,d:44};
export const GARAGE_RADIO={x:95.8,z:159.2};
export const VILLA_ENTRY={x:81,z:147};
export const START={x:87,z:150};
export const CAR_START={x:87,z:160,yaw:-Math.PI/2};
// The existing villa plan faces the road, with its terrace towards the ocean.
export const villaPoint=(x,z)=>({x:VILLA.x-z,z:VILLA.z+x});
// Local villa footprint, with a small hysteresis for the roof at door thresholds.
export function villaInteriorAt(point,margin=0){const x=point.z-VILLA.z,z=VILLA.x-point.x;return Math.abs(x)<22+margin&&Math.abs(z)<16+margin;}
export const PICKUP={x:85,z:-53};
export const HOME={x:-24,z:-8};
export const LIMITS={minX:-98,maxX:246,minZ:-109,maxZ:198};
export const ISLAND={x:194,z:70,rx:52,rz:65};
export const PENINSULA={x:73,z:146,rx:55,rz:50};
export const ESTATE={minX:53,maxX:119,minZ:117,maxZ:173};
export const GATE={x:53,z:160,width:10};
export const BRIDGE={minX:110,maxX:162,minZ:63,maxZ:77};
export function landAt(x,z){return (x>=100&&x<=114&&z>=176&&z<=186)||(x>=20&&x<=118&&z>=85&&z<=146)||((x-PENINSULA.x)**2/PENINSULA.rx**2+(z-PENINSULA.z)**2/PENINSULA.rz**2<=1)||(x>=-98&&x<=118&&z>=-109&&z<=91)||(x>=BRIDGE.minX&&x<=BRIDGE.maxX&&z>=BRIDGE.minZ&&z<=BRIDGE.maxZ)||((x-ISLAND.x)**2/ISLAND.rx**2+(z-ISLAND.z)**2/ISLAND.rz**2<=1);}
export function islandExitRoute(point){return [{x:157,z:point.z},{x:157,z:70},{x:72,z:70}];}
export function estateExitRoute(){return [{x:61,z:160},{x:40,z:160},{x:40,z:105},{x:72,z:105},{x:72,z:70}];}
export const ROAD_X=[-64,0,72],ROAD_Z=[-75,0,70];
export const BUILDINGS=[
 {x:-43,z:-53,w:23,d:24,h:18,color:'#cba28a',name:'RIVER HOTEL'},
 {x:-18,z:-52,w:19,d:23,h:29,color:'#b9c9bc'},
 {x:26,z:-31,w:27,d:29,h:25,color:'#dcc7ab',name:'POKER RADIO'},
 {x:49,z:-48,w:16,d:23,h:18,color:'#d69c85'},
 {x:30,z:-96,w:36,d:17,h:22,color:'#aac4c8'},
 {x:-31,z:-97,w:42,d:16,h:18,color:'#c2ae9e'},
 {x:-83,z:-43,w:15,d:39,h:28,color:'#a0b7b4'},
 {x:-83,z:24,w:15,d:32,h:22,color:'#dcba97'},
 {x:-43,z:30,w:22,d:34,h:19,color:'#e2bd93',name:'CHECK / COFFEE'},
 {x:-17,z:29,w:18,d:32,h:25,color:'#9bbcb4'},
 {x:29,z:28,w:30,d:28,h:23,color:'#d4a590',name:'ALL IN RECORDS'},
 {x:54,z:33,w:15,d:34,h:16,color:'#b2bbcd'},
 {x:-33,z:84,w:41,d:14,h:20,color:'#b6c9c3'},
 {x:32,z:85,w:42,d:14,h:18,color:'#cbb59d'}
];
const villaRect=(x,z,w,d,h=5.4)=>{const p=villaPoint(x,z);return {...rect(p.x,p.z,d,w),h};};
const rect=(x,z,w,d)=>({minX:x-w/2,maxX:x+w/2,minZ:z-d/2,maxZ:z+d/2});
export const SOLIDS=[...districtTrees.map(([x,z])=>({...rect(x,z,.65,.65),h:4})),...estateFeatures.map(f=>({...rect(f.x,f.z,f.w,f.d),h:f.h})),...[[100.7,176.7],[113.3,176.7],[100.7,185.3],[113.3,185.3]].map(([x,z])=>({...rect(x,z,.35,.35),h:3.7})),{...rect(94.5,178.5,3.6,1.5),h:1.1},{...rect(94.5,183.5,3.6,1.5),h:1.1},{...rect(108,178,5.6,1.6),h:1.4},{...rect(108,184,5.6,1.6),h:1.4},{...rect(107,181,2.8,1.5),h:.6},
 {...rect(68,133,6.8,6.8),h:1.8},
 // Mainland estate fence, with one ten-metre opening towards the promenade.
 {...rect(53,136,.65,38),h:3.1},{...rect(53,169,.65,8),h:3.1},
 {...rect(86,117,66,.65),h:3.1},{...rect(77.25,173,48.5,.45),h:2.7},{...rect(111.75,173,14.5,.45),h:2.7},{...rect(119,145,.45,56),h:2.2},
...BUILDINGS.flatMap(buildingSolids),rect(PORT.x,PORT.z,PORT.w,PORT.d),
 // Club is a traversable room, with a six-metre opening towards the street.
 rect(-39,-23,.65,24),rect(-9,-23,.65,24),rect(-24,-35,30,.65),rect(-33,-11,12,.65),rect(-15,-11,12,.65),
 rect(-32,-28,9,2),rect(-17,-27,4,5),
 // Planters and the container yard leave the pickup and sidewalks reachable.
 rect(89,-33,10,10),rect(88,-14,12,12),// Villa perimeter, open front door and garage door; an interior passage joins hall and garage.
 villaRect(-22,0,.5,32),villaRect(22,0,.5,32),
 villaRect(-13,-16,18,.5),villaRect(13,-16,18,.5),
 villaRect(-12.5,16,19,.5),villaRect(5,16,4,.5),villaRect(21,16,2,.5),
 villaRect(6,4,.4,6),villaRect(6,14,.4,4),villaRect(-6,2.5,.4,5),villaRect(-6,14,.4,4),
 villaRect(0,.3,6.4,.5),villaRect(-18,1,8,.4),villaRect(-9,1,2,.4),villaRect(9.5,1,3,.4),villaRect(19.5,1,5,.4),villaRect(-18,-12.5,6,.3),villaRect(-21,-8,.3,9),villaRect(-15,-8,.1,9),
 villaRect(0,6,3,3,1.95),villaRect(-14,9,9.4,5.5,1.6),villaRect(0,-8,7,3,1.9),
 villaRect(14,-7,8.4,4.4,1.65),villaRect(20,-10.5,2.5,7.3,2.4),villaRect(0,-11.9,7,1.4,1.65),
 villaRect(-1,-14.45,8,1.8),villaRect(14,1.9,13,.9),villaRect(20.8,5,1.5,1.2,1.7),
 villaRect(8,-18,14,4,.3),villaRect(0,9.6,2.6,2.6,1.15),villaRect(0,-4.6,3.4,3.4,.8),
 ...Array.from({length:8},(_,i)=>{const a=i*Math.PI/4;return villaRect(-14+Math.sin(a)*5.1,9+Math.cos(a)*3.7,1.6,1.6,1.2);})
];
export function blocked(x,z,r=.45){return ![[x,z],[x-r,z],[x+r,z],[x,z-r],[x,z+r]].every(p=>landAt(...p))||x-r<LIMITS.minX||x+r>LIMITS.maxX||z-r<LIMITS.minZ||z+r>LIMITS.maxZ||SOLIDS.some(b=>x+r>b.minX&&x-r<b.maxX&&z+r>b.minZ&&z-r<b.maxZ);}
export function move(body,dx,dz,r){let hit=false;if(!blocked(body.x+dx,body.z,r))body.x+=dx;else hit=true;if(!blocked(body.x,body.z+dz,r))body.z+=dz;else hit=true;return hit;}
export function nearestRoad(p){if(p.z>98&&p.x<130)return {x:40,z:Math.max(105,Math.min(160,p.z))};if(p.x>130)return {x:157,z:Math.max(70,Math.min(105,p.z))};const x=ROAD_X.reduce((a,b)=>Math.abs(p.x-a)<Math.abs(p.x-b)?a:b),z=ROAD_Z.reduce((a,b)=>Math.abs(p.z-a)<Math.abs(p.z-b)?a:b);return Math.abs(x-p.x)<Math.abs(z-p.z)?{x,z:Math.max(-100,Math.min(84,p.z))}:{x:Math.max(-92,Math.min(90,p.x)),z};}
export function roadRoute(from,to){if(from.z>98&&from.x<130&&!(to.z>98&&to.x<130)){const exit=estateExitRoute();return [...exit,...roadRoute(exit.at(-1),to)];}if(to.z>98&&to.x<130&&!(from.z>98&&from.x<130))return roadRoute(to,from).reverse();if(from.z>98&&from.x<130&&to.z>98&&to.x<130)return [{x:from.x,z:to.z},{...to}];if(from.x>130&&to.x<=130){const exit=islandExitRoute(from);return [...exit,...roadRoute(exit.at(-1),to)];}if(to.x>130&&from.x<=130)return roadRoute(to,from).reverse();if(from.x>130&&to.x>130){if(from.x>166&&to.x>166&&from.z>58&&to.z>58)return [{x:from.x,z:to.z},{x:to.x,z:to.z}];return [...islandExitRoute(from).slice(0,-1),...islandExitRoute(to).slice(0,-1).reverse()];}const a=nearestRoad(from),b=nearestRoad(to),vx=ROAD_X.includes(a.x),tx=ROAD_X.includes(b.x);if(vx&&tx)return [{...a},{x:a.x,z:ROAD_Z.reduce((m,n)=>Math.abs(n-a.z)+Math.abs(n-b.z)<Math.abs(m-a.z)+Math.abs(m-b.z)?n:m)},{x:b.x,z:ROAD_Z.reduce((m,n)=>Math.abs(n-a.z)+Math.abs(n-b.z)<Math.abs(m-a.z)+Math.abs(m-b.z)?n:m)},{...b}];if(!vx&&!tx){const x=ROAD_X.reduce((m,n)=>Math.abs(n-a.x)+Math.abs(n-b.x)<Math.abs(m-a.x)+Math.abs(m-b.x)?n:m);return [a,{x,z:a.z},{x,z:b.z},b];}const v=vx?a:b,h=vx?b:a,m={x:v.x,z:h.z};return [a,m,b];}
