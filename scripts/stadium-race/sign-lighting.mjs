import * as T from '../../vendor/three/three.module.min.js';

function luminousFace(canvas,width,height){
 const map=new T.CanvasTexture(canvas);
 map.colorSpace=T.SRGBColorSpace;map.anisotropy=4;
 const material=new T.MeshBasicMaterial({map,side:T.DoubleSide,toneMapped:false});
 return new T.Mesh(new T.PlaneGeometry(width,height),material);
}

// A double-sided blade is readable on the approach, even when the facade is edge-on.
export function addNeonBlade(parent,block,word,x,y,z,accent){
 const canvas=document.createElement('canvas');canvas.width=128;canvas.height=512;
 const ctx=canvas.getContext('2d');
 ctx.fillStyle='#203038';ctx.fillRect(0,0,128,512);
 ctx.strokeStyle=accent;ctx.lineWidth=3;ctx.shadowColor=accent;ctx.shadowBlur=9;
 ctx.strokeRect(9,9,110,494);
 ctx.font='bold 67px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
 for(const [i,letter] of [...word].entries()){
  ctx.fillStyle=accent;ctx.fillText(letter,64,34+(i+.5)*440/word.length);
 }
 const width=1.65,height=6.6;
 block(parent,'#364149',x,y,z,width+.14,height+.16,.36);
 const front=luminousFace(canvas,width,height);front.position.set(x,y,z-.19);
 front.rotation.y=Math.PI;parent.add(front);
 const rear=front.clone();rear.position.z=z+.19;rear.rotation.y=0;parent.add(rear);
}

export function createCurveGuides(group,block,E,place){
 const canvas=document.createElement('canvas');canvas.width=256;canvas.height=96;
 const c=canvas.getContext('2d');
 c.fillStyle='#243238';c.fillRect(0,0,256,96);
 c.fillStyle='#f6ca78';
 for(const x of [30,144]){
  c.beginPath();c.moveTo(x,12);c.lineTo(x+42,12);c.lineTo(x+78,48);
  c.lineTo(x+42,84);c.lineTo(x,84);c.lineTo(x+37,48);c.fill();
 }
 const face=luminousFace(canvas,2.05,.77);
 const boards=Array.from({length:24},()=>{
  const g=group();block(g,'#63685f',0,.88,0,.085,1.76,.085);
  const panel=face.clone();panel.position.y=1.78;panel.rotation.y=Math.PI;
  panel.userData.batchSceneDetail=true;g.add(panel);
  return {g,panel};
 });
 let previous=null;
 return distance=>{
  const base=Math.floor(distance/120);
  if(base===previous)return;previous=base;
  boards.forEach(({g,panel},i)=>{
   const d=(base+i-1)*120,curve=E.road(d).curve;
   g.visible=d>=0&&d<E.FINISH&&Math.abs(curve)>2.2&&!E.crossings.some(j=>Math.abs(j.distance-d)<110);
   if(!g.visible)return;
   const turn=Math.sign(curve);
   place(g,d,turn*(E.roadLayout(d).halfWidth+1.05)/E.roadWidth(d));
   // In a forward-facing chase view positive world X lies screen-left.
   panel.rotation.y=turn>0?0:Math.PI;
  });
 };
}
