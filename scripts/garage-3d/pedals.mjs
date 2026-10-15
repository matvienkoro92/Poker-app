import * as T from '../../vendor/three/three.module.min.js';
export function pedalAssembly(id='classic'){
 const group=new T.Group();group.name='pedal-assembly-'+id;const formula=id==='formula',sport=id!=='classic';
 const alloy=new T.MeshStandardMaterial({color:formula?'#b7a16c':'#a8b4bf',metalness:.82,roughness:.3}),black=new T.MeshStandardMaterial({color:'#161d23',roughness:.83,metalness:.15}),rubber=new T.MeshStandardMaterial({color:'#0c1116',roughness:.95});
 function mesh(geo,mat,name,x,y,z,parent=group){const m=new T.Mesh(geo,mat);m.name=name;m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;parent.add(m);return m;}
 mesh(new T.BoxGeometry(.66,.035,.77),formula?black:alloy,'floor-mount',.94,1.035,0);
 for(const x of [.67,1.20])for(const z of [-.32,.32])mesh(new T.CylinderGeometry(.016,.016,.012,6),alloy,'mount-bolt',x,1.058,z);
 for(const [name,z,width]of [['brake',-.22,formula?.25:.23],['accelerator',.22,.15]]){
  const pivot=mesh(new T.CylinderGeometry(.037,.037,width+.06,20),alloy,name+'-hinge',.72,1.09,z);pivot.rotation.x=Math.PI/2;
  const a=new T.Vector3(.72,1.09,z),b=new T.Vector3(1.10,1.31,z),axis=b.clone().sub(a),center=a.clone().add(b).multiplyScalar(.5);
  const stem=mesh(new T.BoxGeometry(.055,axis.length(),.035),alloy,name+'-lever',...center.toArray());stem.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),axis.normalize());
  const height=name==='brake'?.24:.32,shape=new T.Shape(),w=width/2,h=height/2,r=.025;
  shape.moveTo(-w+r,-h);shape.lineTo(w-r,-h);shape.quadraticCurveTo(w,-h,w,-h+r);shape.lineTo(w,h-r);shape.quadraticCurveTo(w,h,w-r,h);shape.lineTo(-w+r,h);shape.quadraticCurveTo(-w,h,-w,h-r);shape.lineTo(-w,-h+r);shape.quadraticCurveTo(-w,-h,-w+r,-h);
  if(sport)for(const y of [-.065,0,.065])for(const x of name==='brake'?[-.055,.055]:[0]){const hole=new T.Path();hole.absarc(x,y,.014,0,Math.PI*2,true);shape.holes.push(hole);}
  const face=mesh(new T.ExtrudeGeometry(shape,{depth:.025,bevelEnabled:true,bevelSize:.004,bevelThickness:.004,bevelSegments:2,curveSegments:10}),sport?alloy:rubber,name+'-face',1.115,1.32,z);face.rotation.y=-Math.PI/2;face.rotation.z=-.18;
  for(const y of sport?[-.10,.10]:[-.09,-.045,0,.045,.09])mesh(new T.BoxGeometry(width*.76,.009,.007),sport?rubber:alloy,name+'-grip',0,y,-.007,face);
  const points=Array.from({length:65},(_,n)=>{const t=n/64,angle=t*Math.PI*12;return new T.Vector3(.77+t*.23,1.095+t*.15+Math.sin(angle)*.018,z+.045+Math.cos(angle)*.018);});mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),64,.004,6,false),alloy,name+'-return-spring',0,0,0);
  if(formula){const rod=mesh(new T.CylinderGeometry(.025,.025,.25,16),black,name+'-hydraulic-cylinder',.95,1.14,z-.055);rod.rotation.z=-1.05;}
 }
 return group;
}
