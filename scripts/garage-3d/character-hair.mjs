import * as T from '../../vendor/three/three.module.min.js';
// Head-bound volumes make hairstyles readable from every orbit.
export function addCharacterHair(rig,look){
 const id=look.hair||'hairNatural',geometries=[];
 if(id==='hairNatural'||look.helmet&&look.helmet!=='none'||look.hat&&look.hat!=='none')return {dispose(){}};
 const colors={hairSilver:'#a9a49c',hairBlond:'#bda16a',hairAfro:'#733c24',hairBlue:'#235a8f'};
 const material=new T.MeshStandardMaterial({color:colors[id]||'#30241d',roughness:.96});
 const group=new T.Group();
 function tuft(x,y,z,sx,sy,sz,tilt=0){const geo=new T.SphereGeometry(1,12,10);geometries.push(geo);const mesh=new T.Mesh(geo,material);mesh.position.set(x,y,z);mesh.scale.set(sx,sy,sz);mesh.rotation.z=tilt;group.add(mesh);}
 if(id!=='hairBald'){
  const buzz=id==='hairBuzz',afro=id==='hairAfro',mohawk=id==='hairMohawk'||id==='hairBlue',dreads=id==='hairDreads',rocker=id==='hairRocker';
  for(let row=0;row<7;row++)for(let col=0;col<12;col++){
   const a=col/12*Math.PI*2,t=row/7*Math.PI*.57;
   if(mohawk&&Math.abs(Math.cos(a))>.27)continue;
   const x=Math.cos(a)*Math.sin(t)*.23,z=.10+Math.sin(a)*Math.sin(t)*.24;
   const curl=id==='hairCurly'||afro;
   let size=buzz?.026:curl?.067:.045,height=buzz?.018:afro?.12:mohawk?.16:curl?.065:.075;
   let y=1.62+Math.cos(t)*.29;
   if(id==='hairPompadour'){height+=Math.max(0,Math.sin(a))*.10;y+=Math.max(0,Math.sin(a))*.04;}
   if(id==='hairSidePart'||id==='hairSilver')y+=x*.16;
   if(dreads||rocker){height=row>3?.18:.065;y-=row>3?.07:0;}
   tuft(x,y,z,size,height,size,id==='hairSidePart'?-.5:id==='hairSilver'?-.35:0);
  }
 }
 rig.bones.head.add(group);group.position.copy(rig.bones.head.userData.rest?new T.Vector3(...rig.bones.head.userData.rest).negate():new T.Vector3());
 return {dispose(){group.removeFromParent();geometries.forEach(g=>g.dispose());material.dispose();}};
}
