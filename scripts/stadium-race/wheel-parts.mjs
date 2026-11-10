import * as T from '../../vendor/three/three.module.min.js';
export function splitWheelParts(geometry){
 const groups=[[],[],[],[]],p=geometry.attributes.position,index=geometry.index;
 for(let i=0;i<(index?.count||p.count);i+=3){const ids=[0,1,2].map(n=>index?index.getX(i+n):i+n),x=ids.reduce((v,id)=>v+p.getX(id),0)/3,z=ids.reduce((v,id)=>v+p.getZ(id),0)/3;groups[(x>0?1:0)+(z>0?2:0)].push(...ids);}
 return groups.filter(ids=>ids.length).map(ids=>{const g=new T.BufferGeometry();for(const [name,attribute]of Object.entries(geometry.attributes)){const values=[];for(const id of ids)for(let n=0;n<attribute.itemSize;n++)values.push(attribute.array[id*attribute.itemSize+n]);g.setAttribute(name,new T.Float32BufferAttribute(values,attribute.itemSize));}g.computeBoundingBox();const center=g.boundingBox.getCenter(new T.Vector3());g.translate(-center.x,-center.y,-center.z);return {geometry:g,center,front:center.z>0};});
}

export function animateOwnedWheels(vehicle){
 if(vehicle.wheels.length||!vehicle.closedCabin)return;
 vehicle.root.updateMatrixWorld(true);const sources=[];vehicle.root.traverse(m=>{if(m.isMesh&&['tire','Anthracite alloy'].includes(m.material?.name))sources.push(m);});
 for(const source of sources){const geometry=source.geometry.clone().applyMatrix4(source.matrixWorld);for(const part of splitWheelParts(geometry)){const pivot=new T.Group(),spin=new T.Group();pivot.position.copy(part.center);spin.userData.spinAxis='x';spin.add(new T.Mesh(part.geometry,source.material));pivot.add(spin);vehicle.root.add(pivot);vehicle.wheels.push(spin);if(part.front)vehicle.frontWheels.push(pivot);}source.removeFromParent();source.geometry.dispose();geometry.dispose();}
}
