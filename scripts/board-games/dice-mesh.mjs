// Rounded solid geometry, projected into a small high-DPI canvas on every frame.
// Game outcomes and face numbering stay in dice-view; this module only paints them.
export const DICE_REST_X=-1.30,DICE_REST_Y=.12;
const spots={1:[[0,0]],2:[[-1,-1],[1,1]],3:[[-1,-1],[0,0],[1,1]],4:[[-1,-1],[1,-1],[-1,1],[1,1]],5:[[-1,-1],[1,-1],[0,0],[-1,1],[1,1]],6:[[-1,-1],[1,-1],[-1,0],[1,0],[-1,1],[1,1]]};
const sides={front:[[0,0,1],[1,0,0],[0,1,0]],back:[[0,0,-1],[-1,0,0],[0,1,0]],right:[[1,0,0],[0,0,-1],[0,1,0]],left:[[-1,0,0],[0,0,1],[0,1,0]],top:[[0,-1,0],[1,0,0],[0,0,1]],bottom:[[0,1,0],[1,0,0],[0,0,-1]]};
const add=(n,u,v,a,b)=>n.map((x,i)=>x+u[i]*a+v[i]*b);
function rounded(p){const q=p.map(x=>Math.max(-.79,Math.min(.79,x))),d=p.map((x,i)=>x-q[i]),len=Math.hypot(...d);return q.map((x,i)=>x+d[i]/len*.21);}
const geometries=new Map();
function geometryFor(steps){if(geometries.has(steps))return geometries.get(steps);const geometry=[];
for(const [n,u,v] of Object.values(sides))for(let a=0;a<steps;a++)for(let b=0;b<steps;b++){
 const vertices=[[a,b],[a+1,b],[a+1,b+1],[a,b+1]].map(([i,j])=>rounded(add(n,u,v,-1+i*2/steps,-1+j*2/steps)));
 const center=vertices[0].map((_,i)=>vertices.reduce((s,p)=>s+p[i],0)/4),q=center.map(x=>Math.max(-.79,Math.min(.79,x))),normal=center.map((x,i)=>x-q[i]),length=Math.hypot(...normal);
 geometry.push({vertices,normal:normal.map(x=>x/length)});
}
geometries.set(steps,geometry);return geometry;}
function rgb(value,fallback){const m=value.trim().match(/^#([\da-f]{6}|[\da-f]{3})$/i);if(!m)return fallback;const h=m[1].length===3?m[1].split('').map(c=>c+c).join(''):m[1];return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16));}
export function createDiceMesh(cube,faces,size){
 const canvas=document.createElement('canvas');canvas.className='dice-solid';canvas.setAttribute('aria-hidden','true');cube.append(canvas);
 const mobile=matchMedia('(pointer: coarse)').matches||Math.min(innerWidth,innerHeight)<600,geometry=geometryFor(mobile?6:10);
 const ratio=Math.min(devicePixelRatio||1,mobile?1.5:2),extent=size*2;canvas.width=canvas.height=Math.ceil(extent*ratio);const ctx=canvas.getContext('2d');
 const style=getComputedStyle(cube),base=rgb(style.getPropertyValue('--die-face'),[245,230,196]).map(c=>Math.min(255,c*1.14)),pip=style.getPropertyValue('--die-pip').trim()||'#24201b';
 function draw(rx=DICE_REST_X,ry=DICE_REST_Y,rz=-.12,contact=1){
  const cx=Math.cos(rx),sx=Math.sin(rx),cy=Math.cos(ry),sy=Math.sin(ry),cz=Math.cos(rz),sz=Math.sin(rz);
  const rotate=([x,y,z])=>{const a=x*cy+z*sy,c=z*cy-x*sy,b=y*cx-c*sx,d=y*sx+c*cx;return [a*cz-b*sz,a*sz+b*cz,d];};
  const project=p=>{const k=size*.41/(1-p[2]*.055);return [extent/2+p[0]*k,extent/2+p[1]*k];};
  ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,extent,extent);
  // The footprint shares the cube's bottom plane, so its shadow touches the edges.
  if(contact){
   const [n,u,v]=sides.bottom;ctx.save();ctx.fillStyle='rgba(25,16,8,.48)';ctx.shadowColor='rgba(20,12,5,.65)';ctx.shadowBlur=size*.13;ctx.shadowOffsetX=size*.10;ctx.shadowOffsetY=size*.07;ctx.beginPath();
   const edge=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([a,b])=>project(rotate(rounded(add(n,u,v,a,b)))));
   edge.forEach((p,i)=>i?ctx.lineTo(p[0]+1,p[1]+2):ctx.moveTo(p[0]+1,p[1]+2));ctx.closePath();ctx.fill();ctx.restore();
  }
  const polys=geometry.map(g=>({p:g.vertices.map(rotate),n:rotate(g.normal)})).filter(g=>g.n[2]>-.08).sort((a,b)=>a.p.reduce((s,p)=>s+p[2],0)-b.p.reduce((s,p)=>s+p[2],0));
  for(const g of polys){const light=Math.max(0,(-g.n[0]*.4-g.n[1]*.65+g.n[2]*.65)/1.01),shine=Math.pow(Math.max(0,(-g.n[0]*.25-g.n[1]*.45+g.n[2]*.86)),32)*34;
   const color='rgb('+base.map(c=>Math.round(Math.min(255,c*(.53+light*.48)+shine))).join(',')+')';ctx.fillStyle=ctx.strokeStyle=color;ctx.lineWidth=.45;ctx.beginPath();g.p.forEach((p,i)=>{const q=project(p);i?ctx.lineTo(...q):ctx.moveTo(...q);});ctx.closePath();ctx.fill();ctx.stroke();
  }
  for(const [name,[n,u,v]]of Object.entries(sides)){if(rotate(n)[2]<.03)continue;for(const [a,b]of spots[faces[name]]){
   const center=add(n,u,v,a*.44,b*.44),radius=name==='top'?.135:.17;ctx.beginPath();for(let i=0;i<32;i++){const t=i/32*Math.PI*2,p=project(rotate(add(center,u,v,Math.cos(t)*radius,Math.sin(t)*radius)));i?ctx.lineTo(...p):ctx.moveTo(...p);}ctx.closePath();const c=project(rotate(center)),grad=ctx.createRadialGradient(c[0]+1,c[1]+1,0,c[0],c[1],size*.09);grad.addColorStop(0,pip);grad.addColorStop(.72,pip);grad.addColorStop(1,'#080a0b');ctx.fillStyle=grad;ctx.fill();ctx.strokeStyle=name==='top'?'#ffffff45':'#080a0b99';ctx.lineWidth=name==='top'?.6:.3;ctx.stroke();
  }}
 }
 draw();return {draw,animate(index,duration){let frame=0,stopped=false;const start=performance.now(),sign=index?1:-1;let last=-Infinity;const tick=now=>{if(stopped)return;if(mobile&&now-last<1000/30-.5&&now-start<duration){frame=requestAnimationFrame(tick);return;}last=now;const t=Math.min(1,(now-start)/duration),ease=1-Math.pow(1-t,3);draw(DICE_REST_X+(1-ease)*-9,DICE_REST_Y+(1-ease)*sign*11,(index?.14:-.12)+(1-ease)*sign*4,t>.94?1:0);if(t<1)frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);return {cancel(){stopped=true;cancelAnimationFrame(frame);draw(DICE_REST_X,DICE_REST_Y,index?.14:-.12);}};}};
}
