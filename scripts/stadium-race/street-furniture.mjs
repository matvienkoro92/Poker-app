import * as T from '../../vendor/three/three.module.min.js';
export function createStreetFurnitureFactory(block,foliage,mat,cylinder){
 const glass=new T.MeshStandardMaterial({color:'#627e83',metalness:.25,roughness:.23,transparent:true,opacity:.38,side:T.DoubleSide,depthWrite:false,forceSinglePass:true});const panel=new T.PlaneGeometry(3.5,1.9);
 return function(parent,index,side){
  // Slatted seat, backrest and iron supports, set beyond the carriageway.
  for(let n=0;n<4;n++){block(parent,'#655447',side*9.2,.58,-2.7+n*.11,1.5,.07,.085);block(parent,'#70604e',side*9.2,.83+n*.11,-2.72,1.5,.08,.065);}
  for(const x of [8.62,9.78])block(parent,'#303d40',side*x,.3,-2.5,.07,.6,.43);
  if(index%4===1){
   block(parent,'#45575d',side*9.6,2.55,0,1.7,.12,3.8);
   for(const z of [-1.75,1.75])block(parent,'#6f7c7e',side*10.2,1.3,z,.07,2.6,.07);
   const pane=new T.Mesh(panel,glass);pane.userData.batchSceneDetail=true;pane.position.set(side*10.2,1.45,0);pane.rotation.y=side*Math.PI/2;parent.add(pane);
   block(parent,'#cbc5af',side*10.13,1.25,0,.035,.045,3.5);
   block(parent,'#20383c',side*8.6,1.85,-2.05,.12,.7,.55);
  }
  if(index%3!==0){
   const trunk=new T.Mesh(cylinder,mat('#625549'));trunk.position.set(side*10.6,1.75,3.8);trunk.scale.set(.13,3.5,.13);parent.add(trunk);
   for(let n=0;n<7;n++){const a=n*2.4;foliage(parent,['#384a3b','#455441','#52604a'][n%3],side*10.6+Math.cos(a)*.65,3.1+(n%3)*.55,3.8+Math.sin(a)*.65,.85,.95,.8);}
   block(parent,'#555d56',side*10.6,.24,3.8,1.85,.48,1.85);
  }
 };
}
