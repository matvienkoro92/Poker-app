import * as T from '../../vendor/three/three.module.min.js';
export function formulaFrontWing(id,materials){
 const {paint,carbon,metal,accent}=materials,pro=id!=='formula',elite=id==='formulaElite',group=new T.Group();group.name='front-wing-'+id;const span=elite?3.56:pro?3.32:3.10,layers=pro?4:2;
 const mesh=(geometry,material,name)=>{const m=new T.Mesh(geometry,material);m.name=name;m.castShadow=m.receiveShadow=true;group.add(m);return m;};
 // Closed airfoil sections swept across the nose, with upward-curving tips.
 for(let layer=0;layer<layers;layer++){const positions=[],indices=[],segments=72,sides=28;for(let i=0;i<=segments;i++){const t=i/segments*2-1,z=t*span/2,chord=(layer?pro?.36:.46:.76)*(1-.22*t*t),cx=(layer?2.86+layer*.055:3.02)-.13*t*t,cy=.43+layer*.095+.10*Math.pow(Math.abs(t),3);for(let n=0;n<=sides;n++){const a=n/sides*Math.PI*2,u=Math.cos(a);positions.push(cx+u*chord/2,cy+.035*(1-u*u)+Math.sin(a)*(layer?.024:.035),z);}if(i<segments)for(let n=0;n<sides;n++){const a=i*(sides+1)+n,b=a+sides+1;indices.push(a,a+1,b,a+1,b+1,b);}}const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));geo.setIndex(indices);geo.computeVertexNormals();mesh(geo,layer===0?carbon:paint,'wing-element-'+layer);}
 // A continuous fairing starts inside the chassis cut, rather than at its bumper.
 const sections=[[1.06,1.04,1.22,.31],[1.30,1.04,.89,.28],[1.65,1.02,.43,.22],[2.02,1.00,.27,.17],[2.39,.97,pro?.22:.19,.13],[2.70,.93,pro?.18:.15,.10],[2.94,.90,pro?.15:.12,.08],[3.06,.89,pro?.12:.09,.055]];
 const paths=[0,1,2,3].map(k=>new T.CatmullRomCurve3(sections.map((v,i)=>new T.Vector3(v[k],i,0)),false,'catmullrom',.35));
 const positions=[],indices=[],rings=96,sides=48;
 for(let r=0;r<=rings;r++){const t=r/rings,[x,y,w,h]=paths.map(p=>p.getPoint(t).x);for(let n=0;n<=sides;n++){const angle=n/sides*Math.PI*2,c=Math.cos(angle),q=Math.sin(angle),power=pro?.70:.82;positions.push(x,y+Math.sign(q)*Math.pow(Math.abs(q),power)*h,Math.sign(c)*Math.pow(Math.abs(c),power)*w);}if(r<rings)for(let n=0;n<sides;n++){const a=r*(sides+1)+n,b=a+1;indices.push(a,a+sides+1,b,b,a+sides+1,b+sides+1);}}
 const capStart=indices.length;for(const r of [0,rings]){const start=r*(sides+1);for(let n=1;n<sides-1;n++){if(r===0)indices.push(start,start+n,start+n+1);else indices.push(start,start+n+1,start+n);}}
 const nose=new T.BufferGeometry();nose.setAttribute('position',new T.Float32BufferAttribute(positions,3));nose.setIndex(indices);nose.computeVertexNormals();const tipStart=Math.floor(rings*.89)*sides*6;nose.addGroup(0,tipStart,0);nose.addGroup(tipStart,capStart-tipStart,pro?1:0);nose.addGroup(capStart,indices.length-capStart,0);mesh(nose,[paint,accent],'tapered-nose');
 for(const sign of [-1,1]){
  const support=mesh(new T.BoxGeometry(.15,.40,.035),carbon,'nose-pylon');support.position.set(2.94,.69,sign*.10);support.rotation.z=-.15;
  // Sculpted endplates carry an outer footplate and curved leading edge.
  const shape=new T.Shape();shape.moveTo(2.57,.38);shape.lineTo(3.43,.38);shape.quadraticCurveTo(3.53,.42,3.43,.61);shape.lineTo(3.14,pro?.69:.64);shape.quadraticCurveTo(2.79,pro?.71:.66,2.61,.57);shape.closePath();const plate=mesh(new T.ExtrudeGeometry(shape,{depth:.035,bevelEnabled:true,bevelThickness:.012,bevelSize:.015,bevelSegments:3,curveSegments:18}),pro?paint:carbon,'endplate');plate.position.z=sign*span/2-.017;
  const foot=mesh(new T.BoxGeometry(.81,.025,.18),carbon,'endplate-foot');foot.position.set(3.02,.39,sign*(span/2+.055));
  const path=new T.CatmullRomCurve3([[2.65,.57],[2.90,pro?.68:.63],[3.13,pro?.68:.63],[3.40,.61]].map(([x,y])=>new T.Vector3(x,y,sign*(span/2+.025))));mesh(new T.TubeGeometry(path,28,.009,6,false),accent,'endplate-trim');
  if(pro)for(let n=0;n<3;n++){const fin=mesh(new T.BoxGeometry(.27,.075,.018),carbon,'flow-fin');fin.position.set(2.86+n*.07,.54+n*.045,sign*(1.10+n*.10));fin.rotation.z=.15;}
 }
 for(const part of group.children){const p=part.geometry?.getAttribute('position');if(p){for(let i=0;i<p.count;i++)p.setX(i,p.getX(i)*.78);part.geometry.computeVertexNormals();}part.position.x=.2332+part.position.x*.78;}
 return group;
}
