import {coastlines,plantings} from './atlas-coasts.mjs';
import chapters from '../../app-last-buy-in-chapters.js';
// Survey coordinates on the 640-unit Poker21 campaign illustration, in metres in game.
export const villaAtlas={u:571,v:581};
export const mapPoint=(u,v)=>({x:98+(u-villaAtlas.u)*5.6,z:147+(v-villaAtlas.v)*5.6});
export const mapPercent=({x,z})=>[(villaAtlas.u+(x-98)/5.6)/6.4,(villaAtlas.v+(z-147)/5.6)/6.4];
export const bounds={minX:-3270,maxX:500,minZ:-3580,maxZ:320};
function points(line){return line.trim().split(/\s+/).map(pair=>mapPoint(...pair.split(',').map(Number)));}
export const shores=coastlines.map(points);
export const lighthouseShore=points('534,573 540,568 548,565 557,563 567,563 576,567 586,571 595,575 599,583 596,588 589,591 584,598 576,597 568,603 556,605 543,602 534,597 529,590 530,583');
const extent=new Map([...shores,lighthouseShore].map(poly=>[poly,{left:Math.min(...poly.map(p=>p.x)),right:Math.max(...poly.map(p=>p.x)),north:Math.min(...poly.map(p=>p.z)),south:Math.max(...poly.map(p=>p.z))}]));
function inside(p,polygon){
 const e=extent.get(polygon);if(e&&(p.x<e.left||p.x>e.right||p.z<e.north||p.z>e.south))return false;
 let hit=false;
 for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){
  const a=polygon[i],b=polygon[j];
  if((a.z>p.z)!==(b.z>p.z)&&p.x<(b.x-a.x)*(p.z-a.z)/(b.z-a.z)+a.x)hit=!hit;
 }
 return hit;
}
export const onLighthouseShore=(x,z)=>inside({x,z},lighthouseShore);
export const nodes=[],roads=[],circuits=[],parks=[],lots=[];
const vertices=new Map(),links=new Map(),edges=new Map();
function node(p){const key=p.x+','+p.z;if(vertices.has(key))return vertices.get(key);nodes.push(p);vertices.set(key,p);links.set(p,[]);return p;}
function connect(a,b,bridge=false){
 const key=[nodes.indexOf(a),nodes.indexOf(b)].sort((u,v)=>u-v).join('/');
 if(edges.has(key))return;
 const edge={a,b,bridge,width:bridge?16:21};edges.set(key,edge);roads.push(edge);links.get(a).push(b);links.get(b).push(a);
}
function street(line,bridge=false){
 const path=points(line).map(node);
 for(let i=1;i<path.length;i++)connect(path[i-1],path[i],bridge);
 if(path[0]===path.at(-1)){
  const legs=path.slice(1).map((b,i)=>({a:path[i],b,length:Math.hypot(b.x-path[i].x,b.z-path[i].z)}));
  const xx=path.map(p=>p.x),zz=path.map(p=>p.z);
  circuits.push({legs,length:legs.reduce((sum,e)=>sum+e.length,0),speed:9+circuits.length%5,offset:circuits.length*87,x:Math.min(...xx),z:Math.min(...zz),w:Math.max(...xx)-Math.min(...xx),d:Math.max(...zz)-Math.min(...zz)});
 }
}
// Western mainland: stadium ring, stepped downtown avenues and the airport service loop.
street('111,72 102,88 77,92 55,84 43,69 45,52 59,38 81,34 101,42 111,57 111,72');
street('111,72 148,72 177,72 196,58 222,54 249,68');
street('77,92 77,131 95,161 93,197 84,245 74,288 58,353 51,390 59,411 83,420 108,391 119,347 136,297 149,249 156,195 159,148 155,106 148,72');
street('93,197 156,195 192,198 233,204 223,243 203,259 149,249 84,245 93,197');
street('74,288 136,297 193,305 203,259');
street('58,353 119,347 189,355 230,357 250,358');
street('83,420 122,429 175,438 208,439 239,437 260,452 280,461');
street('189,355 193,305');street('189,355 180,399 175,438');
street('108,391 180,399 224,403 239,437');
street('155,106 198,106 222,104 249,68');street('159,148 198,151 222,146 222,104');
street('192,198 198,151 198,106 196,58');street('95,161 159,148');
street('59,411 43,434 30,454 27,503 27,545 68,554 145,570 192,576 204,552 208,499 208,439 175,438 146,464 120,455 83,433 59,411');
street('208,499 235,492 254,492 275,501 278,548');
// Northern palace crossing, garden island drive and southern marina.
street('249,68 274,65 308,60 333,62',true);street('333,62 342,48 360,41 382,48 390,65 377,78 351,80 333,62');
street('390,65 410,67 445,76',true);
street('233,204 268,205 309,208 337,201',true);
street('337,201 350,186 355,148 364,132 378,132 389,149 394,189 399,221 410,265 408,285 395,299 372,304 354,293 350,266 347,234 337,201');
street('399,221 431,225 468,229',true);
street('250,358 302,360 326,358',true);
street('326,358 350,355 374,365 402,356 416,360 403,381 378,401 352,398 332,382 326,358');
street('416,360 459,359 510,358',true);
// Eastern seafront follows the sand; the inner carriageway bends around the club and docks.
street('445,76 455,58 482,46 514,47 533,60 541,85 541,142 542,183 550,222 550,262 549,307 552,357 551,408 552,461 555,503 556,531 543,535 532,544');
street('445,76 464,96 482,124 480,154 469,182 468,209 468,229 482,250 505,280 510,312 510,358 517,384 509,422 500,449 492,473 475,499 488,512 515,520 532,544');
street('464,96 511,96 541,85');street('480,154 512,146 541,142');
street('468,209 495,189 520,185 542,183');street('482,250 503,263 530,263 550,262');
street('510,312 549,307');street('510,358 552,357');street('509,422 551,408');street('492,473 521,465 552,461');
// Club forecourt and loading apron are the playable entrances on the atlas.
street('550,222 540,223 529,230');
street('275,501 280,507 281.6,512');
street('280,461 343,476 408,491 475,499',true);
// The villa approach follows the east shore below the beach district.
street('532,544 538,538 543,535');
street('556,531 562,532 568,534');
// Cross streets visible between the western avenues on the campaign atlas.
street('77,131 110,138 134,141 159,148');
street('111,72 109,98 110,138 107,158 95,161');
street('122,429 128,405 136,392 149,378 180,399');
export const gateways=[-64,72].map((x,i)=>{
 const p=node({x,z:-100}),approach=node({x,z:-112});
 connect(node(i?mapPoint(568,534):mapPoint(543,535)),approach);connect(approach,p);return p;
});
const roadTiles=new Map();
for(const edge of roads){
 const {a,b}=edge;
 for(let i=Math.floor((Math.min(a.x,b.x)-12)/128);i<=Math.floor((Math.max(a.x,b.x)+12)/128);i++)
  for(let j=Math.floor((Math.min(a.z,b.z)-12)/128);j<=Math.floor((Math.max(a.z,b.z)+12)/128);j++){
   const key=i+','+j;if(!roadTiles.has(key))roadTiles.set(key,[]);roadTiles.get(key).push(edge);
  }
}
export function metroLand(x,z){
 if((z>-100&&x>=-98&&x<=246))return false;
 const p={x,z};if(inside(p,lagoon))return false;return shores.some(poly=>inside(p,poly))||(roadTiles.get(cell(x,z))||[]).some(e=>distance(p,project(p,e))<=e.width/2+.1);
}
export const lagoon=points('363,194 368,185 376,188 382,197 381,206 386,215 382,223 374,222 370,214 371,206 362,201');
export const lunaSite={...mapPoint(58*6.4,56.5*6.4),name:'ЛУНОПАРК'};
export const landmarks=[
 ['АЭРОПОРТ',120,455,'airport'],['СТАДИОН',55,84,'stadium'],['ПОЛИЦИЯ',482,46,'police'],
 ['ДЕЛОВОЙ ЦЕНТР',198,151,'office'],['ПЛЯЖНЫЙ ПРОСПЕКТ',550,262,'beach'],['ДВОРЕЦ',360,41,'palace'],
 ['ЗАПАДНЫЙ TWO ACES',192,198,'club'],['ВОСТОЧНЫЙ TWO ACES',503,263,'club'],['ГРУЗОВОЙ ПОРТ',275,501,'freight'],['ОСТРОВ САДОВ',364,132,'garden'],['МАРИНА',378,401,'marina']
].map(([name,u,v,type])=>({...mapPoint(u,v),name,type}));
const buckets=new Map();
function cell(x,z){return Math.floor(x/128)+','+Math.floor(z/128);}
function lot(x,z,w,d,h,color,kind='block'){
 const p={x,z,w,d,h,color,kind,minX:x-w/2,maxX:x+w/2,minZ:z-d/2,maxZ:z+d/2};lots.push(p);
 for(let ix=Math.floor((p.minX-4)/128);ix<=Math.floor((p.maxX+4)/128);ix++)for(let iz=Math.floor((p.minZ-4)/128);iz<=Math.floor((p.maxZ+4)/128);iz++){const key=ix+','+iz;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(p);}
}
export const nearbyLots=(x,z)=>buckets.get(cell(x,z))||[];
function building(u,v,w,d,h,c,type){const p=mapPoint(u,v);lot(p.x,p.z,w,d,h,c,type);}
for(const [u,v,w,d] of [[61,61,12,86],[94,61,12,86],[78,48,148,12],[78,74,148,12]])building(u,v,w,d,17,0xd9ae85,'stand');
building(99,503,215,55,14,0xb4c4c4,'terminal');building(131,491,16,16,36,0x859c9e,'tower');
building(500,71,140,64,16,0x9bafb6,'police');building(216,135,33,42,118,0xc6ab78,'office');
building(362,60,110,64,25,0xc98f69,'palace');
building(190,223,130,118,18,0xc49b62,'club');building(515,225,140,110,21,0xc7a36f,'club');
for(const [u,v] of [[239,516],[249,530],[232,550],[260,554]])building(u,v,36,70,10,0x76878a,'warehouse');
for(const [u,v] of [[349,54],[375,54],[349,65],[375,65]])building(u,v,15,15,39,0xc29259,'tower');
for(const [u,v,w,d] of [[369,165,72,204],[372,245,105,180],[85,174,28,54]]){parks.push({...mapPoint(u,v),w,d});}
// The skyline, service buildings and piers are placed against their atlas footprints.
building(178,165,30,35,15,0xcab98d,'newsroom');building(191,263,38,32,12,0xab927a,'archive');
building(197,381,43,40,9,0xadc0b3,'workshop');
building(287,512,39,62,11,0x879496,'warehouse');
const colors=[0xe1b395,0xe2ceae,0xbfc9ad,0xcb9d90,0x9fb6bd];
// Block footprints surveyed on the campaign art: centre u/v and width/depth in atlas units.
const blocks=[
 [134,62,17,10],[160,63,14,12],[184,49,11,16],[202,33,12,17],[225,40,14,11],
 [97,105,11,19],[127,109,12,34],[146,94,10,19],[169,91,10,20],[185,98,9,28],[207,86,10,15],[238,88,11,10],
 [128,153,17,12],[143,133,10,19],[170,135,11,18],[186,125,9,23],[229,167,11,18],
 [108,185,12,11],[127,174,16,10],[139,186,14,9],[173,175,10,13],[186,179,10,10],
 [106,214,11,19],[122,225,13,12],[138,211,12,14],[105,239,15,8],[166,233,8,13],[213,225,10,16],
 [101,267,13,10],[119,278,14,11],[158,269,13,13],[177,273,13,17],[210,270,13,10],
 [84,312,15,12],[99,330,14,10],[118,311,10,15],[152,324,13,17],[169,335,14,10],[199,327,11,22],[223,338,13,14],
 [70,379,11,18],[88,386,12,12],[140,369,12,17],[158,378,14,15],[173,368,9,13],[204,374,10,17],[235,378,12,16],
 [119,404,12,12],[146,414,16,11],[197,420,13,13],[222,420,11,12],
 [467,58,10,9],[481,40,11,8],[518,48,12,8],[528,82,10,13],[497,113,15,15],[523,119,12,20],
 [493,158,11,14],[526,162,11,18],[487,184,10,12],[537,194,8,13],[489,248,8,9],
 [524,291,16,18],[537,317,10,14],[522,332,12,11],[530,374,19,16],[532,397,16,9],
 [529,421,20,10],[530,440,19,12],[515,483,14,16],[539,479,11,12],[504,505,10,10],[548,520,9,10],
 [351,152,6,9],[344,172,6,8],[341,186,6,7],[343,247,6,9],[353,281,6,8],[366,307,7,6],[392,306,8,6],[411,278,6,9],[407,245,6,10],[405,183,6,9],[400,154,6,8],
 [332,351,8,6],[347,348,9,6],[362,349,8,6],[391,349,9,6],[409,350,8,6],[347,376,8,8],[366,382,7,9],[386,374,8,10],[367,412,9,6]
];
for(const [i,[u,v,width,depth]] of blocks.entries()){
 const p=mapPoint(u,v),clearance=closest(p).gap-13;
 const scale=Math.min(5.6,2*clearance/Math.hypot(width,depth));
 if(scale<2)continue;
 const w=width*scale,d=depth*scale;
 if(distance(lunaSite,p)<38||nearbyLots(p.x,p.z).some(b=>Math.abs(b.x-p.x)<(w+b.w)/2+2&&Math.abs(b.z-p.z)<(d+b.d)/2+2))continue;
 const downtown=u<250&&v<250;
 lot(p.x,p.z,w,d,downtown?16+(i%5)*8:6+(i%4)*3,colors[i%colors.length]);
}
export const atlasTrees=plantings.flatMap(points).filter(p=>p.z<-112&&metroLand(p.x,p.z)&&closest(p).gap>16&&!nearbyLots(p.x,p.z).some(b=>p.x>b.minX-3&&p.x<b.maxX+3&&p.z>b.minZ-3&&p.z<b.maxZ+3));
export const missionSites=chapters.activeOrder.map((id,index)=>{
 const c=chapters[id],point=mapPoint(c.mapPoint[0]*6.4,c.mapPoint[1]*6.4);
 return {...point,id,number:index+1,name:c.mapLocation,title:c.title,approach:closest(point).point};
});
function project(p,{a,b}){const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz)));return {x:a.x+t*dx,z:a.z+t*dz};}
function distance(a,b){return Math.hypot(a.x-b.x,a.z-b.z);}
function closest(p){let best=null;for(const edge of roads){const point=project(p,edge),gap=distance(point,p);if(!best||gap<best.gap)best={edge,point,gap};}return best;}
export const metroNearest=p=>closest(p).point;
export function metroRoute(from,to){
 const a=closest(from),b=closest(to);if(a.edge===b.edge)return [a.point,b.point];
 const costs=new Map(),previous=new Map(),open=new Set(nodes);
 for(const n of [a.edge.a,a.edge.b])costs.set(n,distance(n,a.point));
 while(open.size){
  let n=null;for(const p of open)if(costs.has(p)&&(!n||costs.get(p)<costs.get(n)))n=p;
  if(!n)break;open.delete(n);
  for(const p of links.get(n)){const cost=costs.get(n)+distance(n,p);if(cost<(costs.get(p)??Infinity)){costs.set(p,cost);previous.set(p,n);}}
 }
 let end=[b.edge.a,b.edge.b].sort((u,v)=>costs.get(u)+distance(u,b.point)-costs.get(v)-distance(v,b.point))[0];
 const path=[b.point];while(end){path.unshift(end);end=previous.get(end);}return [a.point,...path];
}

export function cityDriver(c,t){
 let m=(c.offset+t*c.speed)%c.length;
 for(const {a,b,length} of c.legs){
  if(m<=length){const dx=(b.x-a.x)/length,dz=(b.z-a.z)/length;return {x:a.x+dx*m+dz*3,z:a.z+dz*m-dx*3,yaw:Math.atan2(dx,dz)};}
  m-=length;
 }
 return {...c.legs[0].a,yaw:0};
}
