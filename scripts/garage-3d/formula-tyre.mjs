import * as T from '../../vendor/three/three.module.min.js';
export function formulaTyre(type){const group=new T.Group();group.name='tyre-'+type;const rubber=new T.MeshStandardMaterial({color:'#15181b',roughness:.86}),cut=new T.MeshStandardMaterial({color:'#050708',roughness:.96}),mark=new T.MeshStandardMaterial({color:type==='soft'?'#e63e3b':type==='medium'?'#ecc84e':type==='wet'?'#528edd':'#e8e8dc',roughness:.60});
 const add=(geo,m)=>{const o=new T.Mesh(geo,m);o.castShadow=o.receiveShadow=true;group.add(o);return o;};const tyre=add(new T.LatheGeometry([new T.Vector2(.56,-.19),new T.Vector2(.63,-.25),new T.Vector2(.72,-.23),new T.Vector2(.79,-.15),new T.Vector2(.80,-.10),new T.Vector2(.80,.10),new T.Vector2(.79,.15),new T.Vector2(.72,.23),new T.Vector2(.63,.25),new T.Vector2(.56,.19)],96),rubber);tyre.rotation.x=Math.PI/2;
 if(type!=='semi')for(const side of [-1,1]){const stripe=add(new T.TorusGeometry(.69,.009,8,80),mark);stripe.position.z=side*.247;for(let n=0;n<16;n++){const a=n*Math.PI/8;const block=add(new T.BoxGeometry(.018,.036,.006),mark);block.position.set(Math.sin(a)*.71,Math.cos(a)*.71,side*.246);block.rotation.z=-a;}}
 const rain=type==='wet',semi=type==='semi';
 if(rain||semi){
  const count=rain?34:14;
  // Swept branches open toward the shoulder, leaving the semi-slick centre solid.
  for(let n=0;n<count;n++)for(const side of [-1,1]){
   const base=n*2*Math.PI/count+(side<0?Math.PI/count*.45:0),pts=Array.from({length:23},(_,j)=>{const t=j/22,z=side*((semi?.035:.012)+t*(semi?.175:.198)),r=.800-.045*(Math.abs(z)/.20)**3,angle=base+(semi?.25:.19)*(1-t)*(1-t);return new T.Vector3(Math.sin(angle)*r,Math.cos(angle)*r,z);});
   const groove=add(new T.TubeGeometry(new T.CatmullRomCurve3(pts),28,rain?.008:.009,6,false),cut);groove.name='tread-shoulder-groove';
  }
  if(rain)for(const z of [-.14,-.045,.045,.14]){const groove=add(new T.TorusGeometry(.798,.007,8,96),cut);groove.position.z=z;groove.name='tread-water-channel';}
 }
 return group;
}
