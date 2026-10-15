import * as T from '../../vendor/three/three.module.min.js';
export function formulaCockpit({paint,carbon,metal}){
 const group=new T.Group();group.name='formula-cockpit';
 function tube(points,r,mat,name){const mesh=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p))),40,r,10,false),mat);mesh.name=name;mesh.castShadow=mesh.receiveShadow=true;group.add(mesh);return mesh;}
 tube([[-1.03,1.47,-.49],[-.97,1.98,-.46],[-.38,2.03,-.43],[.38,1.96,-.29],[.60,1.87,0],[.38,1.96,.29],[-.38,2.03,.43],[-.97,1.98,.46],[-1.03,1.47,.49]],.043,carbon,'halo-ring');
 tube([[.60,1.87,0],[.69,1.56,0],[.78,1.22,0]],.038,metal,'halo-pillar');
 tube([[-1.25,1.4,-.29],[-1.27,2.12,-.23],[-1.22,2.22,0],[-1.27,2.12,.23],[-1.25,1.4,.29]],.048,carbon,'roll-hoop');
 for(const sign of [-1,1])for(const y of [.67,.94])tube([[1.19,y,sign*.34],[1.92,y-.12,sign*1.24],[2.22,y,sign*.31]],.024,carbon,'front-wishbone');
 const engine=new T.Group();engine.name='formula-engine-cover';
 const positions=[],indices=[],sections=[[-2.43,.98,.18,.10],[-2.12,1.18,.32,.26],[-1.64,1.37,.42,.40],[-1.26,1.40,.41,.44],[-.99,1.26,.32,.25]],sides=32;
 sections.forEach(([x,y,w,h],row)=>{for(let n=0;n<=sides;n++){const a=n/sides*Math.PI*2;positions.push(x,y+Math.sin(a)*h,Math.cos(a)*w);if(row<sections.length-1&&n<sides){const k=row*(sides+1)+n,j=k+sides+1;indices.push(k,j,k+1,k+1,j,j+1);}}});
 for(const row of [0,sections.length-1])for(let n=1;n<sides-1;n++){const k=row*(sides+1);if(row===0)indices.push(k,k+n,k+n+1);else indices.push(k,k+n+1,k+n);}
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));geo.setIndex(indices);geo.computeVertexNormals();const skin=new T.Mesh(geo,paint);skin.castShadow=skin.receiveShadow=true;engine.add(skin);
 for(const sign of [-1,1])for(let n=0;n<5;n++){const vent=new T.Mesh(new T.BoxGeometry(.025,.07,.19),carbon);vent.position.set(-1.48-n*.13,1.57-n*.055,sign*.31);vent.rotation.z=-.2;engine.add(vent);}
 group.add(engine);return {group,engine};
}
