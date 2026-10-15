import * as T from '../../vendor/three/three.module.min.js';
// Small authored surfaces give cloth and sneakers their own depth in every view.
export function addCharacterTailoring(rig,look,G){
 const geometries=[],materials=[];
 const cloth=new T.MeshStandardMaterial({color:G.item('suit',look.suit).color,roughness:.93,metalness:0});
 const edge=new T.MeshStandardMaterial({color:new T.Color(G.item('suit',look.suit).color).multiplyScalar(.70),roughness:.9});
 const rubber=new T.MeshStandardMaterial({color:'#e8e5db',roughness:.88});
 const dark=new T.MeshStandardMaterial({color:'#1b1f22',roughness:.8});
 const leather=new T.MeshStandardMaterial({color:G.item('shoes',look.shoes).color,roughness:.62});
 materials.push(cloth,edge,rubber,dark,leather);
 function add(geo,material,surface){const p=geo.getAttribute('position'),body=[],surfaces=[];for(let i=0;i<p.count;i++){body.push(.5+p.getX(i)/2.55,.5-p.getY(i)/3.825);surfaces.push(surface);}geo.setAttribute('bodyUv',new T.Float32BufferAttribute(body,2));geo.setAttribute('surface',new T.Float32BufferAttribute(surfaces,1));geometries.push(geo);return rig.mesh(geo,material);}
 function seam(points,material,surface,radius=.003){const path=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));return add(new T.TubeGeometry(path,24,radius,6,false),material,surface);}
 function panel(points,material,surface){const geo=new T.BufferGeometry(),vertices=points.flat();geo.setAttribute('position',new T.Float32BufferAttribute(vertices,3));const indices=[];for(let i=1;i<points.length-1;i++)indices.push(0,i,i+1);geo.setIndex(indices);geo.computeVertexNormals();material.side=T.DoubleSide;return add(geo,material,surface);}
 const jacket=['classic','ruby','midnight'].includes(look.suit);
 if(jacket){
  for(const sign of [-1,1]){
   const points=[[sign*.12,1.15,.205],[sign*.28,.99,.272],[sign*.20,.82,.29],[sign*.27,.72,.285],[sign*.075,.35,.265],[sign*.10,.83,.285]];
   panel(points,cloth,1);seam(points.slice(0,5),edge,1,.004);
   // Flap pockets and their stitching sit above the jacket surface.
   panel([[sign*.24,.22,.267],[sign*.39,.24,.248],[sign*.39,.17,.253],[sign*.24,.15,.271]],cloth,1);
   seam([[sign*.24,.15,.272],[sign*.39,.17,.254]],edge,1);
   seam([[sign*.20,1.05,-.207],[sign*.35,.82,-.254],[sign*.38,.38,-.244],[sign*.30,.14,-.201]],edge,1,.0025);
  }
  seam([[0,1.14,-.19],[0,.80,-.281],[0,.31,-.255],[0,.13,-.218]],edge,1,.003);
  for(const y of [.37,.17]){const b=new T.CylinderGeometry(.013,.013,.008,16);b.rotateX(Math.PI/2);b.translate(.04,y,.275);add(b,dark,1);}
 }
 // Separate soles are paired with a shaped toe cap, tongue and actual laces.
 for(const sign of [-1,1]){
  const x=sign*.45;
  panel([[x-.065,-1.34,.185],[x+.065,-1.34,.185],[x+.075,-1.60,.34],[x-.075,-1.60,.34]],leather,5);
  for(let n=0;n<6;n++){const y=-1.39-n*.035,z=.225+n*.023;seam([[x-.067,y,z],[x,y-.015,z+.013],[x+.067,y-.022,z]],rubber,5,.005);seam([[x+.067,y,z+.001],[x,y-.015,z+.014],[x-.067,y-.022,z+.001]],rubber,5,.005);}
  seam([[x-.135,-1.78,.10],[x-.145,-1.78,.30],[x,-1.78,.445],[x+.145,-1.78,.30],[x+.135,-1.78,.10]],dark,5,.007);
  seam([[x-.10,-1.42,-.075],[x,-1.40,-.09],[x+.10,-1.42,-.075]],leather,5,.008);
 }
 return {dispose(){geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}};
}
