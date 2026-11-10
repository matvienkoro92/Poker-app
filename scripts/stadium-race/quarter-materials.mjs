import * as T from '../../vendor/three/three.module.min.js';
// Human-scale masonry, deep glazing and a distinct ground floor for the waterfront.
export function createQuarterMaterials(){
 return ['#765442','#999484','#526064'].map((base,index)=>{
  const canvas=document.createElement('canvas');canvas.width=canvas.height=1024;const c=canvas.getContext('2d');c.fillStyle=base;c.fillRect(0,0,1024,1024);
  let seed=83+index;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  for(let row=0;row<128;row++)for(let col=-1;col<48;col++){const x=col*22+(row%2)*11,y=row*8;c.fillStyle=`rgba(${random()>.5?'235,208,174':'31,25,22'},${.03+random()*.13})`;c.fillRect(x+1,y+1,20,6);c.fillStyle='#261f1b40';c.fillRect(x,y,22,1);c.fillRect(x,y,1,8);}
  const glow=document.createElement('canvas');glow.width=glow.height=1024;const e=glow.getContext('2d');e.fillStyle='#000';e.fillRect(0,0,1024,1024);
  for(let row=0;row<3;row++)for(let col=0;col<6;col++){
   const x=22+col*170,y=32+row*220,w=126,h=164;c.fillStyle='#343a3a';c.fillRect(x-10,y-9,w+20,h+20);c.fillStyle='#827d70';c.fillRect(x-7,y-6,w+14,h+14);
   const glass=c.createLinearGradient(x,y,x+w,y+h);glass.addColorStop(0,'#65777b');glass.addColorStop(.38,'#263a45');glass.addColorStop(1,'#101e29');c.fillStyle=glass;c.fillRect(x,y,w,h);
   if((row*7+col+index)%6===0){c.fillStyle='#b9915759';c.fillRect(x+6,y+7,w-12,h-14);e.fillStyle='#80633f';e.fillRect(x+6,y+7,w-12,h-14);}
   c.fillStyle='#d9cbb33b';c.fillRect(x+7,y+5,24,h-10);c.fillRect(x+w-31,y+5,24,h-10);c.fillStyle='#253234';c.fillRect(x+w/2-3,y,6,h);c.fillRect(x,y+h*.6,w,5);
   c.fillStyle='#9c9484';c.fillRect(x-14,y+h+5,w+28,10);c.fillStyle='#171d2180';c.fillRect(x-14,y+h+15,w+28,9);
  }
  c.fillStyle='#302e2a';c.fillRect(0,696,1024,328);c.fillStyle=['#30474c','#50453b','#414b45'][index];c.fillRect(10,712,1004,63);c.fillStyle='#dfcba4';c.font='bold 34px serif';c.textAlign='center';c.fillText(['OLD QUAY · COFFEE & RECORDS','TWO ACES · MOTOR WORKS','НАБЕРЕЖНАЯ · ГАЛЕРЕЯ'][index],512,754);
  for(let col=0;col<4;col++){const x=20+col*250;c.fillStyle='#b6aa91';c.fillRect(x,791,232,229);c.fillStyle='#162c35';c.fillRect(x+8,800,216,216);c.fillStyle='#b1905848';c.fillRect(x+18,821,196,173);c.fillStyle='#243437';c.fillRect(x+112,800,6,216);c.fillRect(x+8,931,216,7);for(let n=0;n<6;n++){c.fillStyle=['#9f8b69','#655f50','#b29974'][n%3];c.fillRect(x+24+n*30,911-(n%2)*15,15,20+(n%2)*15);}}
  // Grime under cornices, restrained enough not to read as a repeating black band.
  for(let n=0;n<5000;n++){c.fillStyle=n%2?'#ffffff08':'#00000010';c.fillRect(random()*1024,random()*1024,1+random()*3,1+random()*6);}
  const map=new T.CanvasTexture(canvas),emissiveMap=new T.CanvasTexture(glow);map.colorSpace=emissiveMap.colorSpace=T.SRGBColorSpace;map.anisotropy=4;
  return new T.MeshStandardMaterial({map,emissiveMap,emissive:'#efc38b',emissiveIntensity:.38,bumpMap:map,bumpScale:.025,roughness:.84,metalness:.03});
 });
}
