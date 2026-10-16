import * as T from '../../vendor/three/three.module.min.js';
// Sidepod shoulders stay nearly parallel around the cockpit, then taper
// independently into the rear gearbox and the long, narrow nose.
export function chassisWidth(x){const sections=[[-2.6,.22],[-1.8,.42],[-1.3,.76],[-.65,.94],[-.1,.91],[.35,.68],[.8,.30],[1.25,.19],[1.65,.17]];if(x<=sections[0][0])return sections[0][1];for(let i=1;i<sections.length;i++){const [end,width]=sections[i],[start,previous]=sections[i-1];if(x<=end){const t=(x-start)/(end-start),smooth=t*t*(3-2*t);return previous+(width-previous)*smooth;}}return sections.at(-1)[1];}

// Reversible chassis-space deformation; running gear and cockpit controls keep
// their own dimensions. Every supported finish follows the same body contour.
export function chassisShape(car,excluded=[]){
 let active=false;const saved=new Map(),skip=new Set(excluded),point=new T.Vector3();
 function excludedMesh(mesh){for(let o=mesh;o&&o!==car;o=o.parent)if(skip.has(o)||o.userData.groundWheel||/^(rear-wing-|formula-cockpit)/.test(o.name)||o.name.startsWith('front-wing-')&&mesh.name!=='tapered-nose')return true;return false;}
 return {set(enabled){enabled=!!enabled;const changed=enabled!==active;if(!changed&&!enabled)return;active=enabled;car.updateWorldMatrix(true,true);const inv=car.matrixWorld.clone().invert();car.traverse(mesh=>{if(!mesh.geometry||excludedMesh(mesh))return;const geo=mesh.geometry,p=geo.getAttribute('position');if(!p||!changed&&saved.has(geo))return;if(!saved.has(geo))saved.set(geo,new Float32Array(p.array));const original=saved.get(geo);p.array.set(original);if(enabled){const local=new T.Matrix4().multiplyMatrices(inv,mesh.matrixWorld),back=local.clone().invert();for(let i=0;i<p.count;i++){point.fromBufferAttribute(p,i).applyMatrix4(local);point.z*=chassisWidth(point.x);if(point.y>1.08)point.y=1.08+(point.y-1.08)*.68;point.applyMatrix4(back);p.setXYZ(i,point.x,point.y,point.z);}}p.needsUpdate=true;geo.computeVertexNormals();geo.computeBoundingBox();geo.computeBoundingSphere();});}};
}
