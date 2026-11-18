import * as T from '../../vendor/three/three.module.min.js';

// Keep a fixed light count at takeoff and landing to avoid shader recompilation.
export function createHeadlights(scene){
 const lens=new T.SphereGeometry(1,10,6);
 const lampGlass=new T.MeshBasicMaterial({color:'#ecf6ff',toneMapped:false});
 const beamIntensity=240;
 const lamps=[-1,1].map(side=>{
  const light=new T.SpotLight('#ecf4ff',beamIntensity,38,.49,.96,2);
  light.castShadow=false;scene.add(light,light.target);
  return {light,side};
 });
 return {
  fit(root,transport){
   root.updateWorldMatrix(true,true);
   const bounds=new T.Box3(),worldToLocal=root.matrixWorld.clone().invert();
   const rearOptics=new Set();
   root.traverseVisible(mesh=>{
    if(!mesh.isMesh)return;
    for(const m of [].concat(mesh.material)){
     if((m.name==='M5_E60_Taillights'||m.name==='rearlight')&&m.emissive)rearOptics.add(m);
    }
    if(!mesh.geometry.boundingBox)mesh.geometry.computeBoundingBox();
    bounds.union(mesh.geometry.boundingBox.clone().applyMatrix4(worldToLocal.clone().multiply(mesh.matrixWorld)));
   });
   if(bounds.isEmpty())return;
   const height=transport==='kart'?.59:.72;
   for(const m of rearOptics){m.emissive.setHex(0xff150c);m.emissiveIntensity=.45;}
   const tail=rearOptics.size?null:new T.MeshBasicMaterial({color:'#d72619',toneMapped:false});
   for(const side of [-1,1])for(const rear of [false,true]){
    if(rear&&!tail)continue;
    const glass=new T.Mesh(lens,rear?tail:lampGlass);
    glass.scale.set(rear?.21:.19,.068,.095);
    glass.position.set(side*(transport==='kart'?.74:.67),height,rear?bounds.min.z+.04:bounds.max.z-.04);
    glass.userData.batchSceneDetail=true;root.add(glass);
   }
   return braking=>{
    for(const m of rearOptics)m.emissiveIntensity=braking?2.6:.45;
    if(tail)tail.color.set(braking?'#ff5441':'#d72619');
   };
  },
  update(p,heading,enabled,pitch=0){
   const a=p.a-heading,sin=Math.sin(a),cos=Math.cos(a);
   for(const {light,side}of lamps){
    light.intensity=enabled?beamIntensity:0;
    light.position.set(p.x+sin*2.25+cos*side*.67,p.y+.65,p.z+cos*2.25-sin*side*.67);
    light.target.position.set(p.x+sin*13+cos*side*1.2,p.y-.24-Math.sin(pitch)*11,p.z+cos*13-sin*side*1.2);
   }
  }
 };
}
