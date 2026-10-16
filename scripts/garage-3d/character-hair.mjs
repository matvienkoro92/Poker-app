import * as T from '../../vendor/three/three.module.min.js';
// Head-bound volumes make hairstyles readable from every orbit.
export function addCharacterHair(rig,look){
 const id=look.hair||'hairNatural',geometries=[];
 if(id==='hairNatural'||look.helmet&&look.helmet!=='none'||look.hat&&look.hat!=='none')return {dispose(){}};
 const colors={hairSilver:'#a9a49c',hairBlond:'#bda16a',hairAfro:'#733c24',hairBlue:'#235a8f'};
 const material=new T.MeshStandardMaterial({color:colors[id]||'#30241d',roughness:.96});
 const pixels=new Uint8Array(128*128*4);
 for(let y=0;y<128;y++)for(let x=0;x<128;x++){const i=(y*128+x)*4,noise=Math.sin(x*127.1+y*311.7)*43758.5453,value=128+Math.round(28*Math.sin(y*1.7)+28*(noise-Math.floor(noise)-.5));pixels[i]=pixels[i+1]=pixels[i+2]=value;pixels[i+3]=255;}
 const fiber=new T.DataTexture(pixels,128,128);fiber.wrapS=fiber.wrapT=T.RepeatWrapping;fiber.repeat.set(3,3);fiber.magFilter=T.LinearFilter;fiber.minFilter=T.LinearMipmapLinearFilter;fiber.generateMipmaps=true;fiber.needsUpdate=true;material.bumpMap=fiber;material.bumpScale=.002;
 const sculptSurface=look.sculptHairTexture?.clone();
 if(sculptSurface){sculptSurface.center.set(.5,.5);sculptSurface.rotation=Math.PI/2;sculptSurface.repeat.set(2,2);sculptSurface.needsUpdate=true;material.bumpMap=sculptSurface;material.bumpScale=.0024;if(!colors[id]){material.map=sculptSurface;material.color.set('#c7b9a4');}}
 const group=new T.Group();group.name='hairstyle:'+id;
 function tuft(x,y,z,sx,sy,sz,tilt=0){const geo=new T.SphereGeometry(1,12,10);geometries.push(geo);const mesh=new T.Mesh(geo,material);mesh.position.set(x,y,z);mesh.scale.set(sx,sy,sz);mesh.rotation.z=tilt;group.add(mesh);}
 if(id==='hairDreads'){
  // A fitted scalp and curved, tapered locks replace disconnected capsules.
  const cap=new T.SphereGeometry(1,48,24,0,Math.PI*2,0,Math.PI*.62);
  cap.scale(.275,.292,.278);cap.translate(0,1.62,.10);geometries.push(cap);
  group.add(new T.Mesh(cap,material));
  for(let row=0;row<5;row++)for(let col=0;col<11;col++){
   const a=(col+(row%2)*.5)/11*Math.PI*2,t=.30+row*.28;
   const x=Math.cos(a)*Math.sin(t)*.278,z=.10+Math.sin(a)*Math.sin(t)*.285;
   const y=1.62+Math.cos(t)*.299;
   if(Math.sin(a)>.25&&row===4)continue;
   const length=Math.sin(a)>.25?Math.min(.10+row*.035,Math.max(.035,y-1.70)):.10+row*.035;
   const points=[new T.Vector3(x,y,z),new T.Vector3(x*1.10,y-.035,.10+(z-.10)*1.12),new T.Vector3(x*1.16,y-length*.65,.10+(z-.10)*1.17),new T.Vector3(x*1.12,y-length,.10+(z-.10)*1.18)];
   const geo=new T.TubeGeometry(new T.CatmullRomCurve3(points),16,.020,8,false);
   const p=geo.getAttribute('position');
   for(let ring=0;ring<=16;ring++){
    const center=new T.Vector3();for(let n=0;n<=8;n++)center.add(new T.Vector3().fromBufferAttribute(p,ring*9+n));center.multiplyScalar(1/9);
    const taper=(1-.60*Math.pow(ring/16,5))*(1+.045*Math.sin(ring*2.4+col));
    for(let n=0;n<=8;n++){const i=ring*9+n,v=new T.Vector3().fromBufferAttribute(p,i).sub(center).multiplyScalar(taper).add(center);p.setXYZ(i,v.x,v.y,v.z);}
   }
   geo.computeVertexNormals();geometries.push(geo);group.add(new T.Mesh(geo,material));
  }
 }else if(id!=='hairBald'){
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
 group.position.y+=look.sculptHairOffset||0;group.position.z+=look.sculptHairDepth||0;
 return {dispose(){group.removeFromParent();geometries.forEach(g=>g.dispose());material.dispose();fiber.dispose();sculptSurface?.dispose();}};
}
