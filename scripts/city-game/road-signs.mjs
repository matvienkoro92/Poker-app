import {CanvasTexture, Mesh, MeshStandardMaterial, PlaneGeometry, SRGBColorSpace} from '../../vendor/three/three.module.min.js';

export function createRoadSigns({scene,textures,box,cylinder,groundHeight}){
 return function roadSign(x,z,rows,{width=1.85,yaw=0,base=groundHeight(x,z),center=1.9}={}){
  const height=.44*rows.length+.07;
  const canvas=document.createElement('canvas');
  canvas.width=512;
  canvas.height=Math.round(512*height/width);
  const ctx=canvas.getContext('2d');
  const {height:h,width:w}=canvas;
  ctx.fillStyle='#144a8c';
  ctx.fillRect(0,0,w,h);
  ctx.strokeStyle='#f5f7f7';
  ctx.lineWidth=5;
  ctx.beginPath();
  ctx.roundRect(8,8,w-16,h-16,9);
  ctx.stroke();
  const rowHeight=(h-18)/rows.length;
  for(const [i,[text,arrow]] of rows.entries()){
   const y=9+(i+.5)*rowHeight, hasArrow=Boolean(arrow);
   ctx.font='700 '+Math.round(rowHeight*.52)+'px Arial, sans-serif';
   ctx.textBaseline='middle';
   ctx.textAlign=hasArrow?'left':'center';
   ctx.fillStyle='#f5f7f7';
   ctx.fillText(text,hasArrow?28:w/2,y+1,hasArrow?w-110:w-56);
   if(hasArrow){
    const x=w-53;
    ctx.lineWidth=6;
    ctx.lineCap=ctx.lineJoin='round';
    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(arrow==='left'?Math.PI:arrow==='up'?-Math.PI/2:0);
    ctx.beginPath();
    ctx.moveTo(-16,0);ctx.lineTo(16,0);
    ctx.moveTo(4,-12);ctx.lineTo(16,0);ctx.lineTo(4,12);
    ctx.stroke();
    ctx.restore();
   }
   if(i<rows.length-1){
    ctx.lineWidth=2;
    ctx.beginPath();
    ctx.moveTo(22,y+rowHeight/2);
    ctx.lineTo(w-22,y+rowHeight/2);
    ctx.stroke();
   }
  }
  const texture=new CanvasTexture(canvas);
  texture.colorSpace=SRGBColorSpace;
  texture.anisotropy=4;
  textures.push(texture);
  cylinder('#747e80',x,base+center/2,z,.032,center);
  box('#64727a',x,base+center,z,width,height,.042,yaw);
  const material=new MeshStandardMaterial({map:texture,roughness:.79,emissiveMap:texture,emissive:0xffffff,emissiveIntensity:.22});
  const face=new Mesh(new PlaneGeometry(width,height),material);
  face.name='Road sign '+rows.map(([text])=>text).join(' / ');
  face.position.set(x+Math.sin(yaw)*.024,base+center,z+Math.cos(yaw)*.024);
  face.rotation.y=yaw;
  scene.add(face);
  return face;
 };
}
