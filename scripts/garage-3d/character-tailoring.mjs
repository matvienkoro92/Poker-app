import {characterShape} from './character-shape.mjs';
import * as T from '../../vendor/three/three.module.min.js';
// Small authored surfaces give cloth and sneakers their own depth in every view.
export function addCharacterTailoring(rig,look,G){
 const geometries=[],materials=[],shape=characterShape(look.body);
 const cloth=new T.MeshStandardMaterial({color:G.item('suit',look.suit).color,roughness:.93,metalness:0});
 const edge=new T.MeshStandardMaterial({color:new T.Color(G.item('suit',look.suit).color).multiplyScalar(.70),roughness:.9});
 const rubber=new T.MeshStandardMaterial({color:'#e8e5db',roughness:.88});
 const dark=new T.MeshStandardMaterial({color:'#1b1f22',roughness:.8});
 const pantsEdge=new T.MeshStandardMaterial({color:new T.Color(G.item('pants',look.pants).color).multiplyScalar(.62),roughness:.95});
 const nails=new T.MeshStandardMaterial({color:'#80604d',roughness:.38});
 const leather=new T.MeshStandardMaterial({color:G.item('shoes',look.shoes).color,roughness:.62});
 materials.push(cloth,edge,rubber,dark,leather,pantsEdge,nails);
 function add(geo,material,surface){const p=geo.getAttribute('position'),body=[],surfaces=[];for(let i=0;i<p.count;i++){const q=shape(p.getX(i),.5-p.getY(i)/3.825,p.getZ(i),surface);p.setXYZ(i,q[0],(.5-q[1])*3.825,q[2]);body.push(.5+p.getX(i)/2.55,.5-p.getY(i)/3.825);surfaces.push(surface);}geo.setAttribute('bodyUv',new T.Float32BufferAttribute(body,2));geo.setAttribute('surface',new T.Float32BufferAttribute(surfaces,1));geometries.push(geo);return rig.mesh(geo,material);}
 function seam(points,material,surface,radius=.003){const path=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));return add(new T.TubeGeometry(path,24,radius,6,false),material,surface);}
 function panel(points,material,surface){const geo=new T.BufferGeometry(),vertices=points.flat();geo.setAttribute('position',new T.Float32BufferAttribute(vertices,3));const indices=[];for(let i=1;i<points.length-1;i++)indices.push(0,i,i+1);geo.setIndex(indices);geo.computeVertexNormals();material.side=T.DoubleSide;return add(geo,material,surface);}
 const jacket=['classic','ruby','midnight'].includes(look.suit);
 if(jacket){
  for(const sign of [-1,1]){
   // The front wardrobe texture supplies lapels and pocket flaps.
   seam([[sign*.20,1.05,-.207],[sign*.35,.82,-.254],[sign*.38,.38,-.244],[sign*.30,.14,-.201]],edge,1,.0025);
  }
  seam([[0,1.14,-.19],[0,.80,-.281],[0,.31,-.255],[0,.13,-.218]],edge,1,.003);
  for(const y of [.37,.17]){const b=new T.CylinderGeometry(.013,.013,.008,16);b.rotateX(Math.PI/2);b.translate(.04,y,.275);add(b,dark,1);}
 }
 // Cloth edges have real thickness and catch the same studio light as the car.
 const tee=look.suit?.endsWith('Tee'),tank=look.suit?.endsWith('Tank');
 function loop(cx,cy,cz,rx,rz,mat,surface,r=.004){
  const points=[];for(let n=0;n<=64;n++){const a=n/64*Math.PI*2;points.push([cx+Math.cos(a)*rx,cy,cz+Math.sin(a)*rz]);}
  return seam(points,mat,surface,r);
 }
 if(tee||tank){
  const collar=[];for(let n=0;n<=64;n++){const a=n/64*Math.PI*2;collar.push([.013+Math.cos(a)*.18,1.275-Math.max(0,Math.sin(a))*.055,.015+Math.sin(a)*.117]);}
  seam(collar,edge,1,.008);
  loop(0,.173,0,.419,.197,edge,1,.005);
  if(tee)for(const sign of [-1,1])loop(sign*.616,.815,-.025,.143,.145,edge,2,.005);
 }
 if(G.wardrobeSubcategory('pants',look.pants)==='shorts'){
  for(const sign of [-1,1]){
   loop(sign*.315,-.560,-.030,.207,.198,pantsEdge,4,.0035);
   // Curved pocket openings and a stitched fly follow the actual front cloth.
   seam([[sign*.36,-.04,.176],[sign*.39,-.12,.181],[sign*.44,-.21,.175]],pantsEdge,4,.002);
  }
  seam([[0,.05,.175],[0,-.12,.182],[.025,-.24,.177]],pantsEdge,4,.002);
 }
 // Back pockets and side seams follow the garment volume.
 for(const sign of [-1,1]){
  for(let n=0;n<4;n++){
   const geo=new T.SphereGeometry(1,10,8),l=.166+n*.019,length=[.039,.046,.043,.034][n],top=.540+n*.002;
   geo.scale(.013,.022,.006);geo.translate(sign*(.5-(l+.009))*2.55,(.5-(top+length*.72))*3.825,.117);add(geo,nails,3);
  }
 }
 // Separate soles are paired with a shaped toe cap, tongue and actual laces.
 for(const sign of [-1,1]){
  const x=sign*.45;
  // Details follow the shallow vamp rather than floating up the shin.
  panel([[x-.064,-1.54,.113],[x+.064,-1.54,.113],[x+.077,-1.69,.315],[x-.077,-1.69,.315]],leather,5);
  for(let n=0;n<5;n++){const y=-1.56-n*.026,z=.14+n*.043;seam([[x-.062,y,z],[x,y-.008,z+.010],[x+.062,y-.014,z]],rubber,5,.0035);seam([[x+.062,y,z+.001],[x,y-.008,z+.011],[x-.062,y-.014,z+.001]],rubber,5,.0035);}
  seam([[x-.115,-1.77,.21],[x-.11,-1.77,.35],[x,-1.77,.380],[x+.11,-1.77,.35],[x+.115,-1.77,.21]],leather,5,.003);
  for(const side of [-1,1]){
   seam([[x+side*.093,-1.56,.025],[x+side*.132,-1.64,.10],[x+side*.145,-1.72,.27],[x+side*.112,-1.74,.36]],edge,5,.0025);
   for(let n=0;n<5;n++){
    const eye=new T.TorusGeometry(.006,.0018,6,12);eye.translate(x+side*.064,-1.56-n*.026,.142+n*.043);add(eye,dark,5);
   }
  }
  seam([[x-.08,-1.55,-.07],[x,-1.52,-.087],[x+.08,-1.55,-.07]],dark,5,.006);
 }
 return {dispose(){geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}};
}
