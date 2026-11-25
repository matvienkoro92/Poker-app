import * as T from '../../vendor/three/three.module.min.js';

export const GHOST_SAMPLE_TICKS=8;
const MAX_SAMPLES=2400;

export function recordGhostFrame(frames,state,height){
 const index=Math.floor((state.tick-180)/GHOST_SAMPLE_TICKS);
 if(index<0||index>=MAX_SAMPLES||index!==frames.length)return;
 frames.push([
  Math.round(state.distance),Math.round(state.lateral*1000),state.tier,
  Math.round((state.heading||0)*1000),Math.round(height*100)
 ]);
}

export function createTrialGhost(scene,frames,place){
 if(!Array.isArray(frames)||frames.length<2||frames.length>MAX_SAMPLES)return null;
 if(frames.some(frame=>!Array.isArray(frame)||frame.length!==5||!frame.every(Number.isFinite)))return null;
 const root=new T.Group();
 const material=new T.MeshBasicMaterial({color:0x81eaff,transparent:true,opacity:.28,depthWrite:false});
 const edges=new T.LineBasicMaterial({color:0xc0f5ff,transparent:true,opacity:.55,depthWrite:false});
 for(const [width,height,length,y,z] of [[1.78,.44,3.9,.51,0],[1.37,.35,1.86,.86,-.12]]){
  const geometry=new T.BoxGeometry(width,height,length);
  const mesh=new T.Mesh(geometry,material);
  mesh.position.set(0,y,z);
  mesh.add(new T.LineSegments(new T.EdgesGeometry(geometry),edges));
  root.add(mesh);
 }
 scene.add(root);
 return (tick,playerDistance)=>{
  const sample=(tick-180)/GHOST_SAMPLE_TICKS,index=Math.floor(sample);
  const from=frames[index],to=frames[index+1];
  root.visible=!!(from&&to&&Math.abs(from[0]-playerDistance)<2200);
  if(!root.visible)return;
  const blend=sample-index;
  const mix=i=>from[i]+(to[i]-from[i])*blend;
  const distance=mix(0),tier=blend<.5?from[2]:to[2];
  place(root,distance,mix(1)/1000,mix(4)/100,tier);
  root.rotation.y-=mix(3)/1000;
  const opacity=T.MathUtils.clamp(Math.abs(distance-playerDistance)/120,.12,.75);
  material.opacity=opacity*.47;
  edges.opacity=opacity;
 };
}
