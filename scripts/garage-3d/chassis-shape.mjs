import * as T from '../../vendor/three/three.module.min.js';
export function chassisWidth(x){const t=Math.max(0,Math.min(1,(x+.65)/2.25));return 1.10-.68*t*t*(3-2*t);}
// Reversible chassis-space deformation; running gear and cockpit controls keep
// their own dimensions. Every supported finish follows the same body contour.
export function chassisShape(car,excluded=[]){
 let active=false;const saved=new Map(),skip=new Set(excluded),point=new T.Vector3();
 function excludedMesh(mesh){for(let o=mesh;o&&o!==car;o=o.parent)if(skip.has(o)||o.userData.groundWheel||/^(rear-wing-|formula-cockpit)/.test(o.name)||o.name.startsWith('front-wing-')&&mesh.name!=='tapered-nose')return true;return false;}
 return {set(enabled){enabled=!!enabled;if(enabled===active)return;active=enabled;car.updateWorldMatrix(true,true);const inv=car.matrixWorld.clone().invert();car.traverse(mesh=>{if(!mesh.geometry||excludedMesh(mesh))return;const geo=mesh.geometry,p=geo.getAttribute('position');if(!p)return;if(!saved.has(geo))saved.set(geo,new Float32Array(p.array));const original=saved.get(geo);p.array.set(original);if(enabled){const local=new T.Matrix4().multiplyMatrices(inv,mesh.matrixWorld),back=local.clone().invert();for(let i=0;i<p.count;i++){point.fromBufferAttribute(p,i).applyMatrix4(local);point.z*=chassisWidth(point.x);if(point.y>1.08)point.y=1.08+(point.y-1.08)*.68;point.applyMatrix4(back);p.setXYZ(i,point.x,point.y,point.z);}}p.needsUpdate=true;geo.computeVertexNormals();geo.computeBoundingBox();geo.computeBoundingSphere();});}};
}
