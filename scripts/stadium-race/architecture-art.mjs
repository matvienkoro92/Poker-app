import * as T from '../../vendor/three/three.module.min.js';
// Shared facade atlases: no network assets, deterministic masonry and glazing.
export function createArchitectureMaterials(indices=null){
 return ['#77766e','#657079','#938675','#795e51','#596a70','#8b8980'].map((base,index)=>{
  if(indices&&!indices.includes(index))return null;
  const canvas=document.createElement('canvas');canvas.width=512;canvas.height=1024;const c=canvas.getContext('2d');c.fillStyle=base;c.fillRect(0,0,512,1024);
  let seed=index+31;for(let n=0;n<18000;n++){seed=(seed*1664525+1013904223)>>>0;const x=seed%512;seed=(seed*1664525+1013904223)>>>0;c.fillStyle=n%2?'#ffffff0b':'#0000000d';c.fillRect(x,seed%1024,2,2);}
  const glow=document.createElement('canvas');glow.width=512;glow.height=1024;const light=glow.getContext('2d');light.fillStyle='#000';light.fillRect(0,0,512,1024);
  for(let y=0;y<1024;y+=16){c.fillStyle='#302d271a';c.fillRect(0,y,512,1);for(let x=(y%32?0:32);x<512;x+=64)c.fillRect(x,y,1,16);}
  const floors=3+index%3,floorHeight=800/floors;
  for(let row=0;row<floors;row++){c.save();light.save();c.translate(0,30+row*floorHeight);light.translate(0,30+row*floorHeight);c.scale(1,floorHeight/117);light.scale(1,floorHeight/117);const y=0;c.fillStyle='#ded5bb';c.fillRect(0,y+94,512,5);c.fillStyle='#282a2b55';c.fillRect(0,y+99,512,6);
   for(let col=0;col<4;col++){const x=22+col*124;c.fillStyle='#252c32';c.fillRect(x-5,y-5,87,83);const g=c.createLinearGradient(x,y,x+77,y+72);g.addColorStop(0,'#7695a1');g.addColorStop(.5,'#304a59');g.addColorStop(1,'#14252f');c.fillStyle=g;c.fillRect(x,y,77,72);if((row*3+col+index)%6===0){c.fillStyle='#d9b879aa';c.fillRect(x+4,y+5,69,62);light.fillStyle='#b88c4d';light.fillRect(x+4,y+5,69,62);}if((row+col+index)%3===0){c.fillStyle='#ddd5ba24';c.fillRect(x+5,y+5,14,62);c.fillRect(x+59,y+5,13,62);}if((row*7+col+index)%4===0){c.fillStyle='#15293270';c.fillRect(x+2,y+3,73,18);c.fillStyle='#a6b3b12a';for(let blind=0;blind<5;blind++)c.fillRect(x+2,y+4+blind*3,73,1);}c.fillStyle='#b1b2a5';c.fillRect(x+36,y,4,72);c.fillRect(x,y+34,77,3);c.fillStyle='#e1d9bf';c.fillRect(x-8,y+74,93,5);c.fillStyle='#151e2344';c.fillRect(x,y,77,6);}c.restore();light.restore();}
  c.fillStyle='#34393a';c.fillRect(0,858,512,166);for(let col=0;col<4;col++){const x=12+col*126;c.fillStyle='#182f39';c.fillRect(x,906,112,118);c.fillStyle='#8b9994';c.fillRect(x+53,906,4,118);c.fillStyle='#b9c4ba44';c.fillRect(x+7,914,43,94);}
  c.fillStyle=['#263d45','#4d3731','#2e3e34'][index%3];c.fillRect(7,858,498,44);c.fillStyle='#e8d9b8';c.textAlign='center';c.font='22px sans-serif';c.fillText(['TWO ACES · COFFEE','POKER21 · GARAGE','НАБЕРЕЖНАЯ · МАРКЕТ'][index%3],256,888);
  const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=4;
  const emissiveMap=new T.CanvasTexture(glow);emissiveMap.colorSpace=T.SRGBColorSpace;return new T.MeshStandardMaterial({map:texture,emissiveMap,emissive:'#ffd49c',emissiveIntensity:.28,bumpMap:texture,bumpScale:.018,roughness:.88,metalness:.04});
 });
}
