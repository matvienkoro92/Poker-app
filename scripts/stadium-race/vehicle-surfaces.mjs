import * as T from '../../vendor/three/three.module.min.js';
// Rounded surfaces retain real bevel normals instead of smoothing a cuboid's faces.
export function roundedBody(w,h,d,r=Math.min(w,h,d)*.22){
 r=Math.min(r,w/2,h/2,d/2);const g=new T.BoxGeometry(w,h,d,4,4,6),p=g.attributes.position,n=g.attributes.normal;
 const inner=new T.Vector3(w/2-r,h/2-r,d/2-r),v=new T.Vector3(),q=new T.Vector3();
 for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i);q.copy(v).clamp(inner.clone().negate(),inner);const normal=v.clone().sub(q).normalize();v.copy(q).addScaledVector(normal,r);p.setXYZ(i,v.x,v.y,v.z);n.setXYZ(i,normal.x,normal.y,normal.z);}return g;
}
export function cabinGeometry(w,h,d){const g=roundedBody(w,h,d,.12),p=g.attributes.position;for(let i=0;i<p.count;i++){const u=(p.getY(i)+h/2)/h;p.setX(i,p.getX(i)*(1-u*.22));p.setZ(i,p.getZ(i)*(1-u*.42)-u*.1);}g.computeVertexNormals();return g;}
export function sculptedHull(){
 const spline=new T.CatmullRomCurve3([new T.Vector3(.42,.2,-1.95),new T.Vector3(.82,.3,-1.6),new T.Vector3(1,.34,-.9),new T.Vector3(.85,.26,.3),new T.Vector3(.7,.23,1.25),new T.Vector3(.32,.12,1.92)]),positions=[],indices=[],rings=32,sides=20;
 for(let i=0;i<=rings;i++){const p=spline.getPoint(i/rings);for(let j=0;j<=sides;j++){const a=j/sides*Math.PI*2;positions.push(Math.cos(a)*p.x,.48+Math.sin(a)*p.y,p.z);}}
 for(let i=0;i<rings;i++)for(let j=0;j<sides;j++){const a=i*(sides+1)+j,b=a+sides+1;indices.push(a,b,a+1,b,b+1,a+1);}for(const ring of [0,rings]){const center=positions.length/3;positions.push(0,.48,spline.getPoint(ring/rings).z);for(let j=0;j<sides;j++){const a=ring*(sides+1)+j;if(ring===0)indices.push(center,a+1,a);else indices.push(center,a,a+1);}}const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setIndex(indices);g.computeVertexNormals();return g;
}
