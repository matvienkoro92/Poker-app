import * as T from '../../vendor/three/three.module.min.js';
export function boundsInFrame(objects,frame){frame.updateWorldMatrix(true,true);const inverse=frame.matrixWorld.clone().invert(),bounds=new T.Box3();function visit(o){if(!o.visible)return;if(o.geometry){if(!o.geometry.boundingBox)o.geometry.computeBoundingBox();bounds.union(o.geometry.boundingBox.clone().applyMatrix4(new T.Matrix4().multiplyMatrices(inverse,o.matrixWorld)));}for(const child of o.children)visit(child);}for(const object of objects)visit(object);return bounds;}
export function rearWing(id,{paint,carbon,metal}){
 const group=new T.Group();group.name='rear-wing-'+id;const head=new T.Group();head.name='rear-wing-airfoils';group.add(head);
 const pro=id==='formulaPro',formula=id.startsWith('formula'),dual=id==='double'||pro,height=id==='lip'?1.43:id==='sport'?1.78:pro?2.30:2.08,width=pro?2.48:formula?2.36:id==='gt'||dual?2.16:1.80,chord=formula?.54:id==='lip'?.24:.38;
 function mesh(geo,material,name,x,y,z,parent=group){const m=new T.Mesh(geo,material);m.name=name;m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;parent.add(m);return m;}
 function foil(x,y,w,c,material){const shape=new T.Shape();shape.moveTo(-c*.5,0);shape.bezierCurveTo(-c*.52,.055,-c*.12,.07,c*.5,.008);shape.quadraticCurveTo(c*.05,-.025,-c*.5,0);const g=new T.ExtrudeGeometry(shape,{depth:w,bevelEnabled:true,bevelSize:.008,bevelThickness:.008,bevelSegments:3,curveSegments:16});g.translate(0,0,-w/2);const m=mesh(g,material,'rear-wing-blade',x,y,0,head);m.rotation.z=-.08;}
 foil(0,height,width,chord,formula||id==='sport'?carbon:metal);if(dual)foil(.025,height+.23,width*.96,chord*.7,carbon);if(pro)foil(-.05,height-.18,width,.30,paint);
 if(id!=='lip')for(const sign of [-1,1]){mesh(new T.BoxGeometry(chord+.10,dual?.42:.24,.035),formula?paint:carbon,'rear-wing-endplate',0,height+(dual?.11:.05),sign*width/2,head);}
 const links=[];for(const z of [-.72,.72]){
  mesh(new T.BoxGeometry(.24,.055,.18),carbon,'rear-frame-bracket',-2.29,1.0,z);
  for(const x of [-2.36,-2.22])mesh(new T.CylinderGeometry(.018,.018,.012,6),metal,'rear-frame-bolt',x,1.034,z);
  const lower=mesh(new T.BoxGeometry(1,.075,.085),carbon,'rearward-mount-arm',0,1.015,z),post=mesh(new T.BoxGeometry(.085,1,.075),carbon,'rear-wing-upright',0,0,z);links.push({lower,post,z});
 }
 const headFront=boundsInFrame([head],group).max.x;
 function fit(turbines){const rear=Math.min(-2.85,turbines&&!turbines.isEmpty()?turbines.min.x-.24-headFront:-2.85);head.position.x=rear;for(const {lower,post}of links){lower.position.x=(-2.29+rear)/2;lower.scale.x=Math.abs(rear+2.29);post.position.set(rear,(height-.04+1.015)/2,post.position.z);post.scale.y=height-.04-1.015;}group.userData.turbineClearance=.24;group.userData.wingRearX=rear;group.updateMatrixWorld(true);}
 fit();group.userData.fitTurbines=fit;return group;
}
