import * as T from '../../vendor/three/three.module.min.js';
import {sceneryAnchor} from './scenery-slots.mjs';

// Stream a small pool of identifiable street scenes; keep signs and geometry shared.
export function createCityLife(scene,E,sample,block,clearance){
 const plane=new T.PlaneGeometry(1,1),signs=new Map(),nodes=[],walkers=[];
 function sign(parent,text,color,x,y,z,w,h,angle=Math.PI){
  const key=text+color;if(!signs.has(key)){const canvas=document.createElement('canvas');canvas.width=512;canvas.height=192;const c=canvas.getContext('2d');c.fillStyle='#102832';c.fillRect(0,0,512,192);c.fillStyle=color;c.fillRect(0,0,512,9);c.fillRect(0,183,512,9);c.font='bold 54px Arial';c.textAlign='center';c.fillText(text,256,116);const map=new T.CanvasTexture(canvas);map.colorSpace=T.SRGBColorSpace;signs.set(key,new T.MeshBasicMaterial({map,side:T.DoubleSide}));}
  const mesh=new T.Mesh(plane,signs.get(key));mesh.position.set(x,y,z);mesh.scale.set(w,h,1);mesh.rotation.y=angle;mesh.userData.batchSceneDetail=true;parent.add(mesh);return mesh;
 }
 for(let i=0;i<8;i++){
  const root=new T.Group(),details=new T.Group(),surface=new T.Group(),side=i%2?-1:1,type=i%4;root.add(details,surface);scene.add(root);
  if(type===0){
   // Side street mouth, signal poles and zebra stripes give the boulevard a rhythm.
   for(const s of [-1,1]){
    block(details,'#313b40',s*17,-.09,0,18,.12,7);
    for(const z of [-4.5,4.5])block(details,'#adac9d',s*16,-.05,z,16,.2,1.8);
    block(details,'#64716d',s*8.5,2.7,-4,.12,5.4,.12);
    block(details,'#1a2b31',s*8.5,4.9,-4,.4,1.2,.35);
    block(details,'#57c8a2',s*8.5,4.68,-4.19,.18,.18,.035);
    sign(details,'PORT / CENTRE','#85d2d5',s*10,3.1,-4,3,.8);
   }
   for(let n=0;n<12;n++)block(surface,'#c4c8ba',-6.8+n*1.24,.035,0,.68,.018,2.7);
  }else if(type===1){
   const x=side*17;
   block(details,'#777e78',x,-.16,0,17,.25,15);
   for(const dx of [-4,4])for(const z of [-3,3])block(details,'#b6bdb2',x+dx,2.6,z,.28,5.2,.28);
   block(details,'#d5cfba',x,5.25,0,12,.3,10);block(details,'#d47e4d',x,5.48,0,12.2,.18,10.2);
   sign(details,'ACE · FUEL','#ffc17c',x,5.28,-5.12,8,1);
   for(const z of [-2.4,2.4])for(const dx of [-3,3]){block(details,'#b8b9a5',x+dx,.85,z,.7,1.7,.55);block(details,'#243b42',x+dx,1.05,z-.29,.48,.45,.03);block(details,'#e4aa5e',x+dx,1.7,z,.78,.15,.62);}
   block(details,'#354a50',side*9.4,3.5,-6,.2,7,.2);sign(details,'24 / 7','#78e1df',side*9.4,6,-6,3,1.8);
  }else if(type===2){
   const x=side*14;
   block(details,'#44535c',x,2.5,0,8,5,7);block(details,'#97a9aa',x,5.1,0,8.3,.2,7.3);
   for(const z of [-2,0,2]){block(details,'#163842',x-side*4.02,2.1,z,.035,3.1,1.6);block(details,'#c9a164',x-side*4.1,3.85,z,.13,.08,1.65);}
   sign(details,'NIGHT MARKET','#89e1df',x,4.15,-3.56,7,1.2);
   sign(details,'TWO ACES','#f5c88a',x-side*4.1,4.4,0,5.8,.8,-side*Math.PI/2);
   for(const z of [-2,2]){block(details,'#7e6952',x-side*6,.8,z,1.2,.12,1.2);block(details,'#566464',x-side*6,.4,z,.12,.8,.12);}
  }else{
   for(let n=0;n<5;n++){
    const x=side*(13+(n%2)*5),z=(Math.floor(n/2)-1)*7;
    block(details,['#546f78','#927052','#6f7f5e'][n%3],x,1.35,z,4.6,2.7,6.3);
    for(let rib=0;rib<6;rib++)block(details,'#34494f',x-side*2.32,1.35,z-2.6+rib,.035,2.5,.06);
   }
   sign(details,'DOCK 21','#e6bb68',side*13,3.8,-10,6,1.4);
   for(let n=0;n<5;n++)block(details,'#9c9b7d',side*9,.5,-6+n*3,.2,1,.2);
  }
  // Sidewalk activity stays outside the driving corridor and uses the shared batches.
  if(type===1||type===2){
   for(let n=0;n<2;n++){
    const person=new T.Group();person.position.set(side*(9.2+n*.65),0,-6+n*1.4);details.add(person);
    block(person,n?'#b99268':'#506e84',0,1.12,0,.34,.55,.22);
    block(person,'#bd9474',0,1.56,0,.23,.26,.22);
    const legs=[-1,1].map(s=>block(person,'#303f4e',s*.09,.47,0,.13,.7,.15));
    for(const s of [-1,1])block(person,'#bd9474',s*.23,1.05,0,.1,.48,.1);
    walkers.push({legs,phase:i+n*2});
   }
   // Parking bay and cycle stands identify the pavement edge.
   for(const z of [-9,-7]){block(details,'#8c9b9b',side*10,.45,z,.06,.9,.06);block(details,'#8c9b9b',side*11,.45,z,.06,.9,.06);block(details,'#8c9b9b',side*10.5,.9,z,1,.06,.06);}
   for(const z of [6,9])block(details,'#d4d3bb',side*12,.018,z,5,.018,.1);
   sign(details,'P','#8cc6de',side*9.1,2.8,8,1.1,1.1);
  }
  nodes.push({root,details,surface,side,type,anchor:null});
 }
 return {update(distance,tick=0){for(const w of walkers)w.legs.forEach((leg,i)=>leg.rotation.x=Math.sin(tick*.045+w.phase+i*Math.PI)*.13);nodes.forEach((node,i)=>{
  const d=sceneryAnchor(i,nodes.length,distance,900,1),road=E.road(d);node.root.visible=road.city&&!road.bridge&&d>distance-350&&d<distance+3800;
  if(node.anchor===d)return;node.anchor=d;const p=sample(d),edge=E.roadLayout(d).halfWidth;
  node.root.position.set(p.x,p.y,p.z);node.root.rotation.y=p.a;node.surface.rotation.x=-Math.atan2(sample(d+10).y-sample(d-10).y,1.2);
  // Crossroads expand symmetrically; all other scenes sit beyond the new kerb.
  node.details.position.x=node.type===0?0:node.side*(edge-7);
  if(node.type===0){node.details.scale.x=edge/7;node.surface.scale.x=edge/7;}
  clearance.update(node.details);
 });},snapshot(){return nodes.filter(n=>n.root.visible).map(n=>({type:['junction','fuel','market','depot'][n.type],distance:n.anchor}));}};
}
