import * as T from '../../vendor/three/three.module.min.js';
import {mergeGeometries} from '../../vendor/three/addons/utils/BufferGeometryUtils.js';

// Dedicated millwork surfaces keep material scale independent of the old blockout.
export function finishHall(root,m,textures){
 m.hallWalnut=new T.MeshStandardMaterial({color:'#55402d',roughness:.55,metalness:0});
 const plaster=m.plaster.clone(),brass=new T.MeshStandardMaterial({color:'#b69a58',metalness:.8,roughness:.34}),velvet=new T.MeshStandardMaterial({color:'#163c32',roughness:1}),stone=new T.MeshStandardMaterial({color:'#292d2b',roughness:.35,metalness:.05});
 const group=new T.Group();group.name='Finished hall walls and display joinery';root.add(group);
 function slab(w,h,d,material,x,y,z,ry=0,r=.025){const s=new T.Shape(),a=-w/2,b=-h/2;r=Math.min(r,w/4,h/4);s.moveTo(a+r,b);s.lineTo(a+w-r,b);s.quadraticCurveTo(a+w,b,a+w,b+r);s.lineTo(a+w,b+h-r);s.quadraticCurveTo(a+w,b+h,a+w-r,b+h);s.lineTo(a+r,b+h);s.quadraticCurveTo(a,b+h,a,b+h-r);s.lineTo(a,b+r);s.quadraticCurveTo(a,b,a+r,b);const geometry=new T.ExtrudeGeometry(s,{depth:d,bevelEnabled:false,curveSegments:4});geometry.translate(0,0,-d/2);if(material===plaster){const uv=geometry.attributes.uv;for(let i=0;i<uv.count;i++)uv.setXY(i,uv.getX(i)/2.4,uv.getY(i)/2.4);}if(material===m.cabinet){const uv=geometry.attributes.uv;for(let i=0;i<uv.count;i++)uv.setXY(i,uv.getX(i)/w+.5,uv.getY(i)/h+.5);}const o=new T.Mesh(geometry,material);o.position.set(x,y,z);o.rotation.y=ry;o.castShadow=o.receiveShadow=true;group.add(o);return o;}
 for(const side of [-1,1])for(const [z,depth]of side<0?[[2.5,5],[14,4]]:[[4,6],[14,4]]){
  const x=side*5.79,ry=-side*Math.PI/2,w=depth-.12;
  slab(w,4.72,.04,m.hallWalnut,x,2.43,z,ry);
  slab(w-.22,3.12,.025,plaster,x-side*.04,3.18,z,ry);
  slab(w-.28,.82,.04,m.cabinet,x-side*.07,.64,z,ry);
  for(const y of [.15,1.15,4.74])slab(w,.045,.05,brass,x-side*.085,y,z,ry,.008);
  for(const dz of [-w/2+.12,w/2-.12])slab(.07,4.4,.035,m.hallWalnut,x-side*.12,2.45,z+dz,ry,.01);
  // Recessed lower panels and fine shadow reveals replace flat floorboard walls.
  for(let dz=-w/2+.65;dz<w/2-.3;dz+=1.1)slab(.035,.72,.045,brass,x-side*.1,.65,z+dz,ry,.007);
 }
 // The central wall has vertical walnut flutes and a padded green inset.
 for(let x=-2.04;x<=2.05;x+=.13)slab(.075,3.9,.045,m.hallWalnut,x,2.65,.57,0,.012);
 slab(3.6,2.7,.08,velvet,0,3,.65,0,.09);
 for(const x of [-1.85,1.85])slab(.035,2.83,.04,brass,x,3,.71,0,.008);
 for(const y of [1.59,4.41])slab(3.73,.035,.04,brass,0,y,.71,0,.008);
 const glass=new T.MeshPhysicalMaterial({color:'#b6cdc3',roughness:.15,metalness:.05,transparent:true,opacity:.16,depthWrite:false});
 for(const side of [-1,1]){const x=side*2.65;
  for(const dx of [-.62,.62]){slab(.1,4.55,.65,m.cabinet,x+dx,2.45,.91,0,.008);const pane=new T.Mesh(new T.PlaneGeometry(.6,4.38),glass);pane.rotation.y=Math.PI/2;pane.position.set(x+dx,2.45,.97);group.add(pane);}
  for(let i=0;i<3;i++){const y=.9+i*1.35;slab(1.16,1.08,.025,plaster,x,y+.64,.78);slab(1.24,.095,.64,m.cabinet,x,y+.01,.98,0,.015);slab(.72,.11,.46,stone,x,y+.13,1.02,0,.025);slab(.72,.025,.47,brass,x,y+.2,1.02,0,.006);slab(1.08,.025,.035,m.light,x,y+1.16,1.12,0,.005);}
 }
 // A quieter walnut ceiling gives the room a coherent finish.
 const ceiling=new T.Mesh(new T.PlaneGeometry(11.5,15.7),m.hallWalnut);ceiling.rotation.x=Math.PI/2;ceiling.position.set(0,5.23,8);ceiling.receiveShadow=true;group.add(ceiling);
 // Bake the static joinery transforms into a few material batches.
 const batches=new Map();for(const o of [...group.children]){o.updateMatrix();const geometry=(o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone()).applyMatrix4(o.matrix);if(!batches.has(o.material))batches.set(o.material,[]);batches.get(o.material).push(geometry);group.remove(o);o.geometry.dispose();}
 for(const [material,geometries]of batches){const geometry=mergeGeometries(geometries);geometries.forEach(g=>g.dispose());const mesh=new T.Mesh(geometry,material);mesh.name='Batched hall finish';mesh.castShadow=!material.transparent;mesh.receiveShadow=true;group.add(mesh);}
 group.userData.loadArt=()=>new T.TextureLoader().loadAsync('assets/city-interior/club-art/poker21-two-aces-mural-v3.webp').then(map=>{
 if(root.userData.disposed){map.dispose();return;}map.colorSpace=T.SRGBColorSpace;map.anisotropy=4;textures.push(map);
 const art=new T.Mesh(new T.PlaneGeometry(3.6,2.7),new T.MeshStandardMaterial({map,roughness:.8,emissiveMap:map,emissive:'#ffffff',emissiveIntensity:.16}));art.name='Poker21 Two Aces club mural';art.position.set(0,3,.705);group.add(art);
 }).catch(()=>{/* The green inset remains if the artwork is unavailable. */});
 return group;
}
