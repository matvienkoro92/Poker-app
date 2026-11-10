import {roundedBody,cabinGeometry} from './vehicle-surfaces.mjs';
import {mergeGeometries} from '../../vendor/three/addons/utils/BufferGeometryUtils.js';
import * as T from '../../vendor/three/three.module.min.js';
// Low-cost road cars with shaped cabins, opaque glass and readable lights.
export function createTrafficCar(index){
 const root=new T.Group(),paint=new T.MeshStandardMaterial({color:[0x434e58,0x9b3430,0xb4b7b4,0x263b49,0xc3ab71,0xddd7cc][index%6],metalness:.65,roughness:.28}),glass=new T.MeshStandardMaterial({color:0x172b38,metalness:.65,roughness:.17}),rubber=new T.MeshStandardMaterial({color:0x141619,roughness:.95}),chrome=new T.MeshStandardMaterial({color:0x919da5,metalness:.85,roughness:.25});
 const box=(mat,x,y,z,w,h,d)=>{const m=new T.Mesh(roundedBody(w,h,d),mat);m.position.set(x,y,z);root.add(m);return m;};
 box(paint,0,.55,0,1.75,.55,3.9);box(paint,0,.84,1.25,1.65,.17,1.1);const cabin=new T.Mesh(cabinGeometry(1.52,.72,2.15),glass);cabin.position.set(0,1.02,-.18);root.add(cabin);box(paint,0,1.39,-.28,1.19,.12,1.22);
 for(const side of [-1,1]){for(const z of [-1.23,1.22]){const wheel=new T.Mesh(new T.CylinderGeometry(.39,.39,.25,16),rubber);wheel.rotation.z=Math.PI/2;wheel.position.set(side*.88,.4,z);root.add(wheel);const hub=new T.Mesh(new T.CylinderGeometry(.22,.22,.27,12),chrome);hub.rotation.z=Math.PI/2;hub.position.copy(wheel.position);root.add(hub);}box(paint,side*.67,1.08,-.2,.065,.56,.12);box(paint,side*.98,1.03,.58,.25,.16,.26);box(chrome,side*.75,.67,-.55,.04,.055,.22);}
 const head=new T.MeshStandardMaterial({color:0xfff3ce,emissive:0xffdb99,emissiveIntensity:1.1}),tail=new T.MeshStandardMaterial({color:0x991c16,emissive:0xb5190b,emissiveIntensity:.5});
 for(const side of [-1,1]){box(head,side*.6,.65,1.96,.4,.18,.035);box(tail,side*.62,.65,-1.96,.35,.15,.035);}box(rubber,0,.45,1.97,.75,.18,.035);box(chrome,0,.39,-1.98,1.5,.07,.035);
 const shadow=new T.Mesh(new T.PlaneGeometry(2.15,4.35),new T.MeshBasicMaterial({color:0x071018,transparent:true,opacity:.22,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.y=.025;root.add(shadow);
 root.updateMatrixWorld(true);const batches=new Map();for(const m of [...root.children]){if(m===shadow)continue;const geo=m.geometry.clone().applyMatrix4(m.matrix);if(!batches.has(m.material))batches.set(m.material,[]);batches.get(m.material).push(geo);root.remove(m);m.geometry.dispose();}for(const [material,geos]of batches){root.add(new T.Mesh(mergeGeometries(geos),material));geos.forEach(g=>g.dispose());}return root;
}
