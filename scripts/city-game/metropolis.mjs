// Metres. Both the coastal district and the northern islands use sea level zero.
export const bounds={minX:-2990,maxX:650,minZ:-3140,maxZ:198};
const xs=[-2840,-2590,-2390,-2150,-1900,-1660,-1430,-1230,-680,-470,-265,-64,72,280,495];
const zs=[-3000,-2710,-2460,-2190,-1910,-1650,-1400,-1130,-880,-630,-410,-245];
export const islands=[
 {x:-2060,z:-1650,w:1830,d:2960},
 {x:-90,z:-1650,w:1390,d:2960}
];
// Shoreline samples keep beaches, water collision and the map on the same coast.
export const shores=islands.map((island,index)=>{
 const rows=[];
 for(let j=0;j<74;j++){
  const t=j/73,z=island.z-island.d/2+(j+.5)*40;
  const taper=Math.pow(Math.abs(t*2-1),9)*34;
  const left=island.x-island.w/2+16+33*Math.sin(t*15+index)+17*Math.sin(t*33)+taper;
  const right=island.x+island.w/2-14+29*Math.sin(t*13+1)+17*Math.cos(t*31)-taper;
  rows.push({x:(left+right)/2,z,w:right-left,d:40});
 }
 return rows;
});
export const parks=[];
export const landmarks=[
 {name:'АЭРОПОРТ',x:-2590,z:-2710,type:'airport'},
 {name:'СТАДИОН',x:-1660,z:-1910,type:'stadium'},
 {name:'ПОЛИЦИЯ',x:-470,z:-1130,type:'police'},
 {name:'ДЕЛОВОЙ ЦЕНТР',x:-2150,z:-880,type:'office'},
 {name:'ПЛЯЖНЫЙ ПРОСПЕКТ',x:280,z:-2190,type:'beach'}
];
export const nodes=[],roads=[],lots=[];
const grid=new Map(),links=new Map();
function node(x,z){const p={x,z};nodes.push(p);links.set(p,[]);grid.set(x+','+z,p);return p;}
function connect(a,b,bridge=false){roads.push({a,b,bridge});links.get(a).push(b);links.get(b).push(a);}
for(const z of zs)for(const x of xs)node(x,z);
for(const [j,z] of zs.entries())for(const [i,x] of xs.entries()){
 const p=grid.get(x+','+z);
 if(i&& (i!==8||[1,6,10].includes(j)))connect(grid.get(xs[i-1]+','+z),p,i===8);
 if(j)connect(grid.get(x+','+zs[j-1]),p);
}
export const gateways=[-64,72].map(x=>{const p=node(x,-100);connect(grid.get(x+',-245'),p,true);return p;});
const contains=(p,x,z,r=0)=>Math.abs(x-p.x)<=p.w/2+r&&Math.abs(z-p.z)<=p.d/2+r;
export const bridges=roads.filter(r=>r.bridge).map(({a,b})=>({x:(a.x+b.x)/2,z:(a.z+b.z)/2,w:Math.abs(a.x-b.x)||18,d:Math.abs(a.z-b.z)||18}));
export function metroLand(x,z){return z<=-100&&(shores.some(rows=>{const row=rows[Math.floor((z+3130)/40)];return row&&contains(row,x,z);})||bridges.some(p=>contains(p,x,z)));}
const buckets=new Map();
function cell(x,z){return Math.floor(x/128)+','+Math.floor(z/128);}
function lot(x,z,w,d,h,color,kind='block'){
 const p={x,z,w,d,h,color,kind,minX:x-w/2,maxX:x+w/2,minZ:z-d/2,maxZ:z+d/2};lots.push(p);
 for(let ix=Math.floor((p.minX-4)/128);ix<=Math.floor((p.maxX+4)/128);ix++)for(let iz=Math.floor((p.minZ-4)/128);iz<=Math.floor((p.maxZ+4)/128);iz++){const key=ix+','+iz;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(p);}
}
export const nearbyLots=(x,z)=>buckets.get(cell(x,z))||[];
const pastels=[0xe6b79d,0xc4d1bd,0xe7d5ae,0xc39e97,0xa0b9bc];
for(let j=1;j<zs.length;j++)for(let i=1;i<xs.length;i++){
 if(i===8)continue;
 const left=xs[i-1],top=zs[j-1],w=xs[i]-left,d=zs[j]-top;
 const spot=landmarks.find(p=>p.x===left&&p.z===top);
 if(spot){
  const x=left+w/2,z=top+d/2;
  if(spot.type==='stadium'){for(const side of [-1,1]){lot(x+side*w*.34,z,17,d*.68,23,0xc4b194,'stand');lot(x,z+side*d*.34,w*.61,15,17,0xd9b497,'stand');}}
  else if(spot.type==='airport'){lot(x,z+d*.23,w*.74,31,13,0xb6c8c8,'terminal');lot(x+w*.32,z,14,14,36,0xa5bcc0,'tower');}
  else lot(x,z,w*.53,d*.38,spot.type==='office'?112:spot.type==='beach'?19:14,spot.type==='police'?0x7895a4:0xe9ba9b,spot.type);
  continue;
 }
 if((i*13+j*7)%11===0){parks.push({x:left+w/2,z:top+d/2,w:w-34,d:d-34});continue;}
 for(let k=0;k<6;k++){
  const seed=(i*71+j*47+k*31)%113,x=left+w*(.19+(k%3)*.31),z=top+d*(k<3?.25:.75);
  lot(x,z,25+seed%22,30+seed%34,(i<8?11:7)+seed%(i<8?55:25),pastels[seed%5]);
 }
}
function project(p,{a,b}){const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz)));return {x:a.x+t*dx,z:a.z+t*dz};}
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
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

// Vehicles circulate on opposite sides of different blocks using right-hand lanes.
export const circuits=[];
for(let j=1;j<zs.length;j++)for(let i=1;i<xs.length;i++){
 if(i===8||(i+j)%2)continue;
 const x=xs[i-1]+3,z=zs[j-1]+3,w=xs[i]-xs[i-1]-6,d=zs[j]-zs[j-1]-6;
 circuits.push({x,z,w,d,length:2*(w+d),speed:8+(i*7+j)%8,offset:i*107+j*71});
}
export function cityDriver(c,t){
 let m=(c.offset+t*c.speed)%c.length;
 if(m<c.w)return {x:c.x+m,z:c.z,yaw:Math.PI/2};
 m-=c.w;if(m<c.d)return {x:c.x+c.w,z:c.z+m,yaw:0};
 m-=c.d;if(m<c.w)return {x:c.x+c.w-m,z:c.z+c.d,yaw:-Math.PI/2};
 return {x:c.x,z:c.z+c.d-(m-c.w),yaw:Math.PI};
}
