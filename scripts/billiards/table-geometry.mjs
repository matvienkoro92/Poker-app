// Physical dimensions in mm; one shared geometry feeds physics, renderer and UI.
// WPA equipment specification §9; FBSR technical specifications, 12-foot pyramid.
export const TABLE_SPECS=Object.freeze({
 pool8:Object.freeze({name:'Пул · 9 футов',length:2540,ball:57.15,corner:114.3,side:127,cornerShelf:38.1,sideShelf:6.35,cornerFlare:7,sideFlare:14,restitution:.86}),
 pyramid:Object.freeze({name:'Пирамида · 12 футов',length:3560,ball:68,corner:72.5,side:82.5,cornerShelf:5.5,sideShelf:0,cornerFlare:0,sideFlare:0,restitution:.84})
});
export const tableSpec=s=>TABLE_SPECS[typeof s==='string'?s:s.discipline]||TABLE_SPECS.pool8;
const cache=new Map();
export function tableGeometry(s){const spec=tableSpec(s),key=spec.name;if(cache.has(key))return cache.get(key);const scale=1000/spec.length,r=spec.ball/2*scale,corner=spec.corner*scale,side=spec.side*scale,cut=corner/Math.SQRT2,half=side/2;
 const rails=[[[cut,0],[500-half,0],2],[[500+half,0],[1000-cut,0],2],[[cut,500],[500-half,500],3],[[500+half,500],[1000-cut,500],3],[[0,cut],[0,500-cut],0],[[1000,cut],[1000,500-cut],1]].map(([a,b,side])=>({a,b,side,jaw:false}));
 const points=[[0,0],[500,0],[1000,0],[0,500],[500,500],[1000,500]],pockets=points.map(([x,y],index)=>{const middle=index%3===1,n=middle?[0,y===0?1:-1]:[x===0?Math.SQRT1_2:-Math.SQRT1_2,y===0?Math.SQRT1_2:-Math.SQRT1_2],t=[-n[1],n[0]],mouth=middle?side:corner,center=middle?[x,y]:[x+n[0]*cut/Math.SQRT2,y+n[1]*cut/Math.SQRT2],shelf=(middle?spec.sideShelf:spec.cornerShelf)*scale,depth=shelf+r*1.4,flare=Math.tan((middle?spec.sideFlare:spec.cornerFlare)*Math.PI/180),ends=[-1,1].map(sign=>center.map((c,i)=>c+t[i]*mouth/2*sign));
  for(const [j,a]of ends.entries()){const sign=j===0?-1:1,b=a.map((v,i)=>v-n[i]*depth-t[i]*sign*flare*depth);rails.push({a,b,side:middle?(y===0?2:3):(Math.abs(a[0]-x)<.01?(x===0?0:1):(y===0?2:3)),jaw:true});}
  const lip=ends.map((a,j)=>a.map((v,i)=>v-n[i]*shelf+t[i]*(j===0?-1:1)*flare*shelf));return {index,center,n,t,mouth,shelf,ends,lip,drop:center.map((v,i)=>v-n[i]*(shelf+r*.7))};});
 const geometry={spec,scale,r,rails,pockets};cache.set(key,geometry);return geometry;
}
export function pocketAt(b,g){for(const p of g.pockets){const dx=b.x-p.center[0],dy=b.y-p.center[1],depth=dx*p.n[0]+dy*p.n[1],across=dx*p.t[0]+dy*p.t[1];if(depth<-p.shelf-1e-6&&Math.abs(across)<p.mouth/2-g.r*.99)return p.index;}return -1;}
export function closestPoint(b,segment){const dx=segment.b[0]-segment.a[0],dy=segment.b[1]-segment.a[1],length=dx*dx+dy*dy,t=Math.max(0,Math.min(1,((b.x-segment.a[0])*dx+(b.y-segment.a[1])*dy)/length));return {x:segment.a[0]+dx*t,y:segment.a[1]+dy*t};}
