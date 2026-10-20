// Ground-floor businesses share one plan between architecture, furniture and walking collision.
export const VENUE_DEPTH=4.6;
export const VENUES=[
 {x:-43,z:30,type:'cafe',name:'CHECK / COFFEE',subtitle:'КОФЕ · ВЫПЕЧКА',color:'#365f54',patio:true},
 {x:-17,z:29,type:'bistro',name:'RIVER BISTRO',subtitle:'ЗАВТРАКИ · КУХНЯ',color:'#8c5240',patio:true},
 {x:29,z:28,type:'records',name:'ALL IN RECORDS',subtitle:'ВИНИЛ · МУЗЫКА',color:'#395266',patio:true},
 {x:54,z:33,type:'market',name:'CORNER MARKET',subtitle:'ЦВЕТЫ · ФРУКТЫ',color:'#637044',patio:true},
 {x:49,z:-48,type:'barber',name:'ACE BARBER',subtitle:'BARBER SHOP',color:'#4b5254',patio:false},
 {x:-43,z:-53,type:'hotel',name:'RIVER HOTEL',subtitle:'LOBBY · RECEPTION',color:'#78604d',patio:false}
];
export const venueForBuilding=b=>VENUES.find(v=>v.x===b.x&&v.z===b.z);
const rectangle=(x,z,w,d,h)=>({minX:x-w/2,maxX:x+w/2,minZ:z-d/2,maxZ:z+d/2,h});
export function venuePlan(b){
 const venue=venueForBuilding(b);if(!venue)return null;
 const front=b.z+b.d/2,depth=VENUE_DEPTH,items=[];
 // Door axis stays clear; interiors are real recessed rooms, not a painted wall.
 items.push({kind:'counter',x:b.x-b.w*.28,z:front-3.35,w:Math.min(5,b.w*.28),d:1.2,h:1.25});
 if(['cafe','bistro','hotel'].includes(venue.type))for(const dx of [b.w*.23,b.w*.38])items.push({kind:'indoor-table',x:b.x+dx,z:front-2.9,w:1.05,d:1.05,h:.85});
 if(venue.type==='records')for(const dx of [4,8,11])items.push({kind:'record-bin',x:b.x+dx,z:front-2.65,w:2.1,d:1.1,h:1.05});
 if(venue.type==='market')for(const dx of [3,5])items.push({kind:'produce',x:b.x+dx,z:front-2.7,w:1.5,d:1.2,h:1.15});
 if(venue.type==='barber')for(const dx of [3.3,5.7])items.push({kind:'barber-chair',x:b.x+dx,z:front-2.8,w:1.2,d:1.4,h:1.4});
 if(venue.patio){
  for(const dx of [-b.w*.3,b.w*.3])for(const dz of [4.2,8.3]){
   if(venue.type==='market'&&dz>5)continue;
   items.push({kind:venue.type==='market'?'produce':'patio-table',x:b.x+dx,z:front+dz,w:1.3,d:1.3,h:.85});
   if(venue.type!=='market')for(const side of [-1,1])items.push({kind:'patio-chair',x:b.x+dx+side*1.1,z:front+dz,w:.7,d:.78,h:1.15});
  }
  items.push({kind:'menu',x:b.x+1.9,z:front+1.8,w:.65,d:.5,h:1.15});
  for(const side of [-1,1])items.push({kind:'planter',x:b.x+side*(b.w/2-.65),z:front+5.7,w:.75,d:7,h:.5});
 }
 return {venue,front,depth,items};
}
export function buildingSolids(b){
 const p=venuePlan(b);if(!p)return [rectangle(b.x,b.z,b.w,b.d,b.h)];
 const {front,depth,items}=p,wing=(b.w-2.4)/2;
 return [rectangle(b.x,b.z-depth/2,b.w,b.d-depth,b.h),rectangle(b.x-b.w/2+.12,front-depth/2,.24,depth,4),rectangle(b.x+b.w/2-.12,front-depth/2,.24,depth,4),rectangle(b.x-1.2-wing/2,front,wing,.18,3.7),rectangle(b.x+1.2+wing/2,front,wing,.18,3.7),...items.map(f=>rectangle(f.x,f.z,f.w,f.d,f.h))];
}
export function insideVenue(point,buildings){return buildings.some(b=>{if(!venueForBuilding(b)||Math.abs(point.x-b.x)>=b.w/2)return false;const front=b.z+b.d/2;return point.z<front+.4&&point.z>front-VENUE_DEPTH;});}
export function districtDriveways(buildings){return buildings.flatMap(b=>{const p=venuePlan(b);if(!p||!['cafe','records'].includes(p.venue.type))return [];return [{x:p.venue.type==='records'?b.x:b.x+b.w/2+2.4,start:p.front+1.6,end:64.2,width:3.2}];});}
export const districtTrees=[[-55,45],[-55.5,60],[16,57],[43,57],[-8.5,60],[61.5,61]];
