import * as T from '../../vendor/three/three.module.min.js';
// Frame, lenses, bridge and temple arms are head-bound geometry, including in profile.
export function addCharacterEyewear(rig,look,G){
 const geometries=[],materials=[],group=new T.Group();
 if(!look.glasses||look.glasses==='none'||look.helmet&&look.helmet!=='none')return {dispose(){}};
 group.name='eyewear:'+look.glasses;
 const id=look.glasses,round=/round|rimless/.test(id),sport=/sport/.test(id),thin=/Gold|Silver|browline/.test(id);
 const frame=new T.MeshStandardMaterial({color:G.item('glasses',id).color,metalness:thin?.85:.08,roughness:thin?.28:.38});
 const lens=new T.MeshPhysicalMaterial({color:sport?'#406d80':'#182322',metalness:sport?.65:.15,roughness:.12,clearcoat:1,clearcoatRoughness:.08,transparent:true,opacity:.94,side:T.DoubleSide});
 materials.push(frame,lens);
 const add=(geo,mat)=>{geometries.push(geo);const m=new T.Mesh(geo,mat);group.add(m);return m;};
 const line=(points,r)=>add(new T.TubeGeometry(new T.CatmullRomCurve3(points.map(v=>new T.Vector3(...v))),32,r,8,false),frame);
 for(const sign of [-1,1]){
  const x=sign*.125,y=1.63,z=.391,rx=sport?.127:.112,ry=round?.079:sport?.060:.067;
  const points=[],shape=new T.Shape();
  for(let n=0;n<=64;n++){
   const a=n/64*Math.PI*2,cs=Math.cos(a),sn=Math.sin(a),px=rx*(round?cs:Math.sign(cs)*Math.pow(Math.abs(cs),.65)),py=ry*(round?sn:Math.sign(sn)*Math.pow(Math.abs(sn),.65));
   if(n===0)shape.moveTo(px,py);else shape.lineTo(px,py);
   points.push(new T.Vector3(x+px,y+py,z-Math.abs(px)*.16));
  }
  const geo=new T.ShapeGeometry(shape,32);geo.translate(x,y,z-.005);add(geo,lens);
  add(new T.TubeGeometry(new T.CatmullRomCurve3(points,true),64,thin?.0045:.0085,8,true),frame);
  line([[sign*.233,y+.008,.376],[sign*.256,y+.004,.300],[sign*.273,y-.005,.17],[sign*.282,y-.024,.085]],thin?.0045:.008);
  const hinge=new T.SphereGeometry(.011,16,10);hinge.translate(sign*.237,y+.009,.374);add(hinge,frame);
 }
 line([[-.025,1.644,.389],[0,1.655,.404],[.025,1.644,.389]],thin?.004:.006);
 rig.bones.head.add(group);group.position.copy(new T.Vector3(...rig.bones.head.userData.rest).negate());
 group.position.z+=look.sculptEyewearDepth||0;
 return {dispose(){group.removeFromParent();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}};
}
