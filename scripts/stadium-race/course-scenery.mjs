import * as T from '../../vendor/three/three.module.min.js';

// Five roadside sets share the renderer's existing instance batches. Empty spaces
// between garages and freight stacks leave sight lines into the next district.
export function createCourseScenery(block,tree,cylinder){
 const rock=new T.IcosahedronGeometry(1,1);
 const tankSteel=new T.MeshStandardMaterial({color:'#aaa89d'});
 const rockTint=[],pos=rock.attributes.position;
 for(let n=0;n<pos.count;n+=3){
  const y=(pos.getY(n)+pos.getY(n+1)+pos.getY(n+2))/3;
  const color=new T.Color(y>.45?'#9d9680':y>-.22?'#827b6e':'#635e52');
  color.multiplyScalar(.94+.08*Math.sin(n*3.14));
  for(let k=0;k<3;k++)rockTint.push(color.r,color.g,color.b);
 }
 rock.setAttribute('color',new T.Float32BufferAttribute(rockTint,3));
 const stone=new T.MeshStandardMaterial({vertexColors:true,flatShading:true,roughness:1});
 return function(slot,side){
  const park=new T.Group(),paddock=new T.Group(),cutting=new T.Group(),freight=new T.Group();
  const x=side*17;
  block(park,'#535f48',side*21,-.7,0,24,1.3,24.3);
  for(let i=0;i<2+slot%3;i++){
   const tx=side*(14+(slot*7+i*5)%14),z=(slot*3+i*7)%21-10;
   tree(park,slot+i,tx,z);
  }
  block(paddock,'#676863',side*19,-.18,0,18,.35,24.2);
  if(slot%5!==0 && side>0){
   const height=3.9+slot%3*.45;
   block(paddock,'#8c918c',x,height/2,0,8,height,15);
   block(paddock,'#344552',x,height+.1,0,8.8,.26,15.8);
   for(const z of [-4.6,0,4.6]){
    block(paddock,'#39424b',side*12.94,1.55,z,.16,3,3.8);
    for(let n=0;n<4;n++)block(paddock,'#778381',side*12.83,.65+n*.52,z,.09,.055,3.72);
    block(paddock,'#e4b77b',side*12.78,3.2,z,.12,.12,3.6);
   }
  }else if(slot%3===0){
   for(const z of [-3,3])block(paddock,'#4a545b',x,2.15,z,.2,4.3,.2);
   block(paddock,'#bca481',x,4.35,0,5.2,.21,8);
   block(paddock,'#a45b46',x,.62,-2.5,1.25,1.2,.85);
  }
  for(let i=0;i<3;i++){
   const ledge=new T.Mesh(rock,stone),h=2.5+(slot*5+i*3)%6;
   ledge.position.set(side*(17+i*3),h*.28,-7+i*7);
   ledge.rotation.set(.12*(slot%3),slot*1.65+i,.11*(i-1));
   ledge.scale.set(4+i,h,5.8);ledge.userData.batchSceneDetail=true;cutting.add(ledge);
  }
  block(cutting,'#777971',side*11.5,.62,0,.52,1.24,23.8);
  block(freight,'#74736a',side*22,-.24,0,21,.48,24.2);
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
  return {park,paddock,cutting,freight};
 };
}

// Continuous shoulders beneath the scenery keep the road embedded in terrain as
// it climbs. Separate left/right strips leave the outside of the quay open.
export function createCourseGround(scene,E,sample){
 const groups=[];
 const canvas=document.createElement('canvas');canvas.width=canvas.height=128;
 const ctx=canvas.getContext('2d');ctx.fillStyle='#d8d5cb';ctx.fillRect(0,0,128,128);
 let seed=23;for(let n=0;n<5200;n++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;
  ctx.fillStyle=n%2?'#958e7c':'#f3edda';ctx.fillRect(seed&127,(seed>>>12)&127,1,1);}
 const tex=new T.CanvasTexture(canvas);tex.colorSpace=T.SRGBColorSpace;tex.wrapS=tex.wrapT=T.RepeatWrapping;
 const mat=new T.MeshStandardMaterial({map:tex,vertexColors:true,roughness:1,side:T.DoubleSide});
 const colors={stands:'#61715e',park:'#637455',paddock:'#686b69',cutting:'#877b66',departure:'#657458',boulevard:'#77766e',quay:'#676b65',freight:'#7c7568'};
 for(let start=0;start<E.FINISH;start+=600){
  const positions=[],uv=[],rgb=[],indices=[];
  for(let d=start;d<Math.min(start+600,E.FINISH);d+=25){
   const zone=E.district(d),color=colors[zone];if(!color)continue;
   const tint=new T.Color(color);
   for(const side of [-1,1]){
    if(side<0&&E.riverbank(d))continue;
    const base=positions.length/3;
    for(const dist of [d,Math.min(d+25,E.FINISH)])for(const offset of [-.28,4,16,55]){
     const width=E.roadWidth(dist),p=sample(dist,side*(E.roadLayout(dist).halfWidth+offset)/width);
     const y=offset<4?p.y-.48:offset===4?p.y-.7:offset===16?Math.min(p.y-.75,-1.92):-2.65;
     positions.push(p.x,y,p.z);uv.push(p.x*.24,p.z*.24);rgb.push(tint.r,tint.g,tint.b);
    }
    for(let n=0;n<3;n++){const k=base+n;indices.push(k,k+4,k+1,k+1,k+4,k+5);}
   }
  }
  if(!indices.length)continue;
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));geo.setAttribute('color',new T.Float32BufferAttribute(rgb,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setIndex(indices);geo.computeVertexNormals();geo.computeBoundingSphere();
  const mesh=new T.Mesh(geo,mat);mesh.receiveShadow=true;scene.add(mesh);groups.push({mesh,start});
 }
 return {update(distance){for(const {mesh,start} of groups)mesh.visible=start<distance+4000&&start+600>distance-420;}};
}
