import * as T from '../../vendor/three/three.module.min.js';

// Five roadside sets share the renderer's existing instance batches. Empty spaces
// between garages and freight stacks leave sight lines into the next district.
export function createCourseScenery(block,tree,cylinder,frontage){
 const rock=new T.IcosahedronGeometry(1,4);
 const tankSteel=new T.MeshStandardMaterial({color:'#aaa89d'});
 const rockTint=[],pos=rock.attributes.position;
 // Distort the shared outcrop by continuous coordinates so adjacent faces meet.
 for(let n=0;n<pos.count;n++){
  const x=pos.getX(n),y=pos.getY(n),z=pos.getZ(n);
  const bed=Math.sin(y*18+x*2.3+Math.sin(z*4))*.5+.5;
  const erosion=.91+.085*Math.sin(x*6+z*3)*Math.cos(y*5)+.055*bed;
  pos.setXYZ(n,x*erosion+.12*y,y*(.92+.055*Math.cos(z*5)),z*erosion);
  const tone=new T.Color('#887f70').lerp(new T.Color('#c0a68c'),bed*.58+.15*(1+y));
  tone.multiplyScalar(.84+.15*Math.sin(z*8+x*6)*Math.cos(y*7));
  rockTint.push(tone.r,tone.g,tone.b);
 }
 rock.computeVertexNormals();
 rock.setAttribute('color',new T.Float32BufferAttribute(rockTint,3));
 const stone=new T.MeshStandardMaterial({vertexColors:true,roughness:.95});
 return function(slot,side){
  const park=new T.Group(),paddock=new T.Group(),cutting=new T.Group(),freight=new T.Group();
  const x=side*17;

  for(let i=0;i<2+slot%3;i++){
   const tx=side*(14+(slot*7+i*5)%14),z=(slot*3+i*7)%21-10;
   tree(park,slot+i,tx,z);
  }

  for(let i=0;i<3;i++){
   const ledge=new T.Mesh(rock,stone),h=2.5+(slot*5+i*3)%6;
   ledge.position.set(side*(17+i*3),h*.28,-7+i*7);
   ledge.rotation.set(.12*(slot%3),slot*1.65+i,.11*(i-1));
   ledge.scale.set(4+i,h,5.8);ledge.userData.batchSceneDetail=true;cutting.add(ledge);
  }
  block(cutting,'#777971',side*11.5,.62,0,.52,1.24,23.8);

  if(slot%5<3){
   for(let n=0;n<1+slot%3;n++){
    const cx=x+side*(n%2)*3.1,y=1.25+(n===2?2.5:0),z=slot%2?1:-1;
    block(freight,['#8f5546','#687c77','#4f6574'][(slot+n)%3],cx,y,z,3,2.5,9);
    for(let rib=0;rib<9;rib++)block(freight,'#484f50',cx-side*1.51,y,z-4+rib,.05,2.32,.07);
   }
  }else if(slot%5===3){
   for(const z of [-3.5,3.5]){
    const tank=new T.Mesh(cylinder,tankSteel);
    tank.position.set(x,3.7,z);tank.scale.set(2.5,7.4,2.5);freight.add(tank);
    block(freight,'#5a6265',x+side*2.55,2.6,z,.22,5.2,.22);
   }
  }
  if(slot%5===4){
   const warehouseX=side*18;
   block(freight,'#655f54',warehouseX,2.1,0,8,4.2,10);
   block(freight,'#495457',warehouseX,4.25,0,8.5,.22,10.6);
   frontage(freight,2,side*13.98,2.1,0,9.9,4.15,-side*Math.PI/2);
   for(const end of [-1,1])frontage(freight,2,warehouseX,2.1,end*5.02,7.95,4.15,end<0?Math.PI:0);
  }
  return {park,paddock,cutting,freight};
 };
}

// Continuous shoulders beneath the scenery keep the road embedded in terrain as
// it climbs. Separate left/right strips leave the outside of the quay open.
export function createCourseGround(scene,E,sample){
 const groups=[];
 const loader=new T.TextureLoader();
 const materials=[
  'assets/last-buy-in/optimized/race-verge-grass-v1.webp',
  'assets/last-buy-in/optimized/race-verge-concrete-v1.webp',
  'assets/last-buy-in/optimized/race-verge-limestone-v1.webp',
  'assets/last-buy-in/optimized/race-verge-pavers-v1.webp'
 ].map(url=>{
  const map=loader.load(url);map.wrapS=map.wrapT=T.RepeatWrapping;
  map.colorSpace=T.SRGBColorSpace;map.anisotropy=4;
  return new T.MeshStandardMaterial({map,vertexColors:true,roughness:.96,side:T.DoubleSide});
 });
 const surfaces={stands:0,park:0,departure:0,paddock:1,cutting:2,boulevard:3,quay:3,freight:1};
 for(let start=0;start<E.FINISH;start+=600){
  const runs=[];
  const positions=[],uv=[],rgb=[],indices=[];
  for(let d=start;d<Math.min(start+600,E.FINISH);d+=25){
   const zone=E.district(d),material=surfaces[zone];if(material===undefined)continue;
   if(runs.at(-1)?.material!==material)runs.push({start:indices.length,material});
   for(const side of [-1,1]){
    if(side<0&&E.riverbank(d))continue;
    const base=positions.length/3;
    for(const dist of [d,Math.min(d+25,E.FINISH)])for(const offset of [-.28,4,16,32,95]){
     const width=E.roadWidth(dist),p=sample(dist,side*(E.roadLayout(dist).halfWidth+offset)/width);
     const slope=offset>16&&(zone==='stands'||zone==='park'||zone==='cutting');
     const ridge=slope?(zone==='cutting'?3.2:1.8)*(1+Math.sin(dist*.0012+side))*(offset-16)/39:0;
     const y=offset<=16?p.y-.12:offset===32?p.y-.48:-2.65+ridge;
     const shade=.76+.09*Math.sin(dist*.004+offset*.19+side);
     positions.push(p.x,y,p.z);uv.push(p.x*.24,p.z*.24);rgb.push(shade,shade,shade);
    }
    for(let n=0;n<4;n++){const k=base+n;indices.push(k,k+5,k+1,k+1,k+5,k+6);}
   }
  }
  if(!indices.length)continue;
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));geo.setAttribute('color',new T.Float32BufferAttribute(rgb,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setIndex(indices);geo.computeVertexNormals();geo.computeBoundingSphere();
  for(const [i,run] of runs.entries())geo.addGroup(run.start,(runs[i+1]?.start??indices.length)-run.start,run.material);
  const mesh=new T.Mesh(geo,materials);mesh.receiveShadow=true;scene.add(mesh);groups.push({mesh,start});
 }
 return {update(distance){for(const {mesh,start} of groups)mesh.visible=start<distance+4000&&start+600>distance-420;}};
}
