// Metres. Shared by collision, rendering, route guidance and tests.
export const CLUB={x:-24,z:-23,w:30,d:24};
export const PORT={x:86,z:-70,w:22,d:24};
export const VILLA={x:98,z:40,w:32,d:44};
export const VILLA_ENTRY={x:81,z:40};
export const START={x:87,z:43};
export const CAR_START={x:87,z:53,yaw:-Math.PI/2};
// The existing villa plan faces the road, with its terrace towards the ocean.
export const villaPoint=(x,z)=>({x:VILLA.x-z,z:VILLA.z+x});
export const PICKUP={x:85,z:-53};
export const HOME={x:-24,z:-8};
export const LIMITS={minX:-98,maxX:118,minZ:-109,maxZ:91};
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
const villaRect=(x,z,w,d)=>{const p=villaPoint(x,z);return rect(p.x,p.z,d,w);};
const rect=(x,z,w,d)=>({minX:x-w/2,maxX:x+w/2,minZ:z-d/2,maxZ:z+d/2});
export const SOLIDS=[...BUILDINGS.map(b=>rect(b.x,b.z,b.w,b.d)),rect(PORT.x,PORT.z,PORT.w,PORT.d),
 // Club is a traversable room, with a six-metre opening towards the street.
 rect(-39,-23,.65,24),rect(-9,-23,.65,24),rect(-24,-35,30,.65),rect(-33,-11,12,.65),rect(-15,-11,12,.65),
 rect(-32,-28,9,2),rect(-17,-27,4,5),
 // Planters and the container yard leave the pickup and sidewalks reachable.
 rect(89,-33,10,10),rect(88,-14,12,12),// Villa perimeter, open front door and garage door; an interior passage joins hall and garage.
 villaRect(-22,0,.5,32),villaRect(22,0,.5,32),
 villaRect(-13,-16,18,.5),villaRect(13,-16,18,.5),
 villaRect(-12.5,16,19,.5),villaRect(5,16,4,.5),villaRect(21,16,2,.5),
 villaRect(6,4,.4,6),villaRect(6,14,.4,4),villaRect(-6,2.5,.4,5),villaRect(-6,14,.4,4),
 villaRect(-4,0,4,.4),villaRect(4,0,4,.4),villaRect(-18,1,8,.4),villaRect(-9,1,2,.4),villaRect(9.5,1,3,.4),villaRect(19.5,1,5,.4),villaRect(-18,-8,6,9),
 villaRect(0,6,3,3),villaRect(-14,9,8,5),villaRect(0,-8,7,3),
 villaRect(8,-18,14,4)
];
export function blocked(x,z,r=.45){return x-r<LIMITS.minX||x+r>LIMITS.maxX||z-r<LIMITS.minZ||z+r>LIMITS.maxZ||SOLIDS.some(b=>x+r>b.minX&&x-r<b.maxX&&z+r>b.minZ&&z-r<b.maxZ);}
export function move(body,dx,dz,r){let hit=false;if(!blocked(body.x+dx,body.z,r))body.x+=dx;else hit=true;if(!blocked(body.x,body.z+dz,r))body.z+=dz;else hit=true;return hit;}
export function nearestRoad(p){const x=ROAD_X.reduce((a,b)=>Math.abs(p.x-a)<Math.abs(p.x-b)?a:b),z=ROAD_Z.reduce((a,b)=>Math.abs(p.z-a)<Math.abs(p.z-b)?a:b);return Math.abs(x-p.x)<Math.abs(z-p.z)?{x,z:Math.max(-100,Math.min(84,p.z))}:{x:Math.max(-92,Math.min(90,p.x)),z};}
export function roadRoute(from,to){const a=nearestRoad(from),b=nearestRoad(to),vx=ROAD_X.includes(a.x),tx=ROAD_X.includes(b.x);if(vx&&tx)return [{...a},{x:a.x,z:ROAD_Z.reduce((m,n)=>Math.abs(n-a.z)+Math.abs(n-b.z)<Math.abs(m-a.z)+Math.abs(m-b.z)?n:m)},{x:b.x,z:ROAD_Z.reduce((m,n)=>Math.abs(n-a.z)+Math.abs(n-b.z)<Math.abs(m-a.z)+Math.abs(m-b.z)?n:m)},{...b}];if(!vx&&!tx){const x=ROAD_X.reduce((m,n)=>Math.abs(n-a.x)+Math.abs(n-b.x)<Math.abs(m-a.x)+Math.abs(m-b.x)?n:m);return [a,{x,z:a.z},{x,z:b.z},b];}const v=vx?a:b,h=vx?b:a,m={x:v.x,z:h.z};return [a,m,b];}
