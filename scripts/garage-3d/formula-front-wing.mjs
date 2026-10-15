import * as T from '../../vendor/three/three.module.min.js';
export function formulaFrontWing(id,materials){
 const {paint,carbon,metal,accent}=materials,pro=id==='formulaPro',group=new T.Group();group.name='front-wing-'+id;const span=pro?3.32:3.10,layers=pro?4:2;
 const mesh=(geometry,material,name)=>{const m=new T.Mesh(geometry,material);m.name=name;m.castShadow=m.receiveShadow=true;group.add(m);return m;};
 // Closed airfoil sections swept across the nose, with upward-curving tips.
 for(let layer=0;layer<layers;layer++){const positions=[],indices=[],segments=72,sides=28;for(let i=0;i<=segments;i++){const t=i/segments*2-1,z=t*span/2,chord=(layer?pro?.36:.46:.76)*(1-.22*t*t),cx=(layer?2.86+layer*.055:3.02)-.13*t*t,cy=.43+layer*.095+.10*Math.pow(Math.abs(t),3);for(let n=0;n<=sides;n++){const a=n/sides*Math.PI*2,u=Math.cos(a);positions.push(cx+u*chord/2,cy+.035*(1-u*u)+Math.sin(a)*(layer?.024:.035),z);}if(i<segments)for(let n=0;n<sides;n++){const a=i*(sides+1)+n,b=a+sides+1;indices.push(a,a+1,b,a+1,b+1,b);}}const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));geo.setIndex(indices);geo.computeVertexNormals();mesh(geo,layer===0?carbon:paint,'wing-element-'+layer);}
 // A tapered nose ties the wing to the kart's lower frontal frame.
 const positions=[],indices=[],rings=[[2.13,1.04,.33,.13],[2.43,.98,.28,.12],[2.72,.83,.20,.10],[3.02,.70,.115,.075]];
 for(const [x,y,w,h]of rings)for(let n=0;n<24;n++){const a=n/24*Math.PI*2;positions.push(x,y+Math.sin(a)*h,Math.cos(a)*w);}
 for(let r=0;r<rings.length-1;r++)for(let n=0;n<24;n++){const a=r*24+n,b=r*24+(n+1)%24;indices.push(a,a+24,b,b,a+24,b+24);}for(let n=1;n<23;n++){indices.push(0,n,n+1);const last=(rings.length-1)*24;indices.push(last,last+n+1,last+n);}const nose=new T.BufferGeometry();nose.setAttribute('position',new T.Float32BufferAttribute(positions,3));nose.setIndex(indices);nose.computeVertexNormals();mesh(nose,paint,'tapered-nose');
 for(const sign of [-1,1]){
  const support=mesh(new T.BoxGeometry(.13,.37,.065),carbon,'nose-pylon');support.position.set(2.90,.61,sign*.13);support.rotation.z=-.15;
  // Sculpted endplates carry an outer footplate and curved leading edge.
  const shape=new T.Shape();shape.moveTo(2.57,.38);shape.lineTo(3.43,.38);shape.quadraticCurveTo(3.53,.42,3.43,.61);shape.lineTo(3.14,pro?.95:.82);shape.quadraticCurveTo(2.79,pro?.97:.84,2.61,.69);shape.closePath();const plate=mesh(new T.ExtrudeGeometry(shape,{depth:.035,bevelEnabled:true,bevelThickness:.012,bevelSize:.015,bevelSegments:3,curveSegments:18}),pro?paint:carbon,'endplate');plate.position.z=sign*span/2-.017;
  const foot=mesh(new T.BoxGeometry(.81,.025,.18),carbon,'endplate-foot');foot.position.set(3.02,.39,sign*(span/2+.055));
  const path=new T.CatmullRomCurve3([[2.65,.70],[2.90,pro?.94:.81],[3.13,pro?.94:.81],[3.40,.61]].map(([x,y])=>new T.Vector3(x,y,sign*(span/2+.025))));mesh(new T.TubeGeometry(path,28,.009,6,false),accent,'endplate-trim');
  if(pro)for(let n=0;n<3;n++){const fin=mesh(new T.BoxGeometry(.27,.13,.018),carbon,'flow-fin');fin.position.set(2.86+n*.07,.58+n*.07,sign*(1.10+n*.10));fin.rotation.z=.15;}
 }
 return group;
}
