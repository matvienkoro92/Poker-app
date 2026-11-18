import * as T from '../../vendor/three/three.module.min.js';

// Keep a fixed light count at takeoff and landing to avoid shader recompilation.
export function createHeadlights(scene){
 const lens=new T.SphereGeometry(1,10,6);
 const lampGlass=new T.MeshBasicMaterial({color:'#ecf6ff',toneMapped:false});
 const lamps=[-1,1].map(side=>{
  const light=new T.SpotLight('#ecf4ff',850,32,.40,.78,2);
  light.castShadow=false;scene.add(light,light.target);
  return {light,side};
 });
 return {
  fit(root,transport){
   root.updateWorldMatrix(true,true);
   const bounds=new T.Box3(),worldToLocal=root.matrixWorld.clone().invert();
   root.traverseVisible(mesh=>{
    if(!mesh.isMesh)return;
    if(!mesh.geometry.boundingBox)mesh.geometry.computeBoundingBox();
    bounds.union(mesh.geometry.boundingBox.clone().applyMatrix4(worldToLocal.clone().multiply(mesh.matrixWorld)));
   });
   if(bounds.isEmpty())return;
   const height=transport==='kart'?.59:.72;
   const tail=new T.MeshBasicMaterial({color:'#d72619',toneMapped:false});
   for(const side of [-1,1])for(const rear of [false,true]){
    const glass=new T.Mesh(lens,rear?tail:lampGlass);
    glass.scale.set(rear?.21:.19,.068,.095);
    glass.position.set(side*(transport==='kart'?.74:.67),height,rear?bounds.min.z+.04:bounds.max.z-.04);
    glass.userData.batchSceneDetail=true;root.add(glass);
   }
   return braking=>tail.color.set(braking?'#ff5441':'#d72619');
  },
  update(p,heading,enabled,pitch=0){
   const a=p.a-heading,sin=Math.sin(a),cos=Math.cos(a);
   for(const {light,side}of lamps){
    light.intensity=enabled?850:0;
    light.position.set(p.x+sin*2.25+cos*side*.67,p.y+.65,p.z+cos*2.25-sin*side*.67);
    light.target.position.set(p.x+sin*13+cos*side*1.2,p.y-.24-Math.sin(pitch)*11,p.z+cos*13-sin*side*1.2);
   }
  }
 };
}
