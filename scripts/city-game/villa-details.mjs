import * as T from '../../vendor/three/three.module.min.js';
import {selectedVillaAwards,villaAwardArt} from './villa-awards.mjs';
import {furnishPokerTable} from './poker-table-props.mjs';
import {trophyRelief} from './trophy-relief.mjs';
import {awardPlaque} from './award-plaque.mjs';
// Small static pieces use the villa's existing instance bins and materials.
export function furnishVilla({root,B,C,S,ring,part,m,textures,hall}){
 // One instanced soft-contact layer grounds furniture without extra shadow lights.
 const contactCanvas=document.createElement('canvas');contactCanvas.width=contactCanvas.height=128;const cg=contactCanvas.getContext('2d'),gradient=cg.createRadialGradient(64,64,8,64,64,64);gradient.addColorStop(0,'#00000090');gradient.addColorStop(.5,'#00000050');gradient.addColorStop(1,'#00000000');cg.fillStyle=gradient;cg.fillRect(0,0,128,128);const contactMap=new T.CanvasTexture(contactCanvas);textures.push(contactMap);
 const contacts=[[0,6,3.8,3.5],[0,9.6,3.4,3.4],[-14,9,11,7],[0,-8,9,4],[0,-4.6,4,4],[14,-7,10,6],[20,-10.5,4,9],[-4,5,1.9,1.9],[4,5,1.9,1.9],[7.3,2.7,1.5,1.5]];
 const shadow=new T.InstancedMesh(new T.PlaneGeometry(1,1),new T.MeshBasicMaterial({map:contactMap,transparent:true,depthWrite:false,toneMapped:false,polygonOffset:true,polygonOffsetFactor:-1}),contacts.length),transform=new T.Object3D();shadow.name='Furniture soft contact';contacts.forEach(([x,z,w,d],i)=>{transform.position.set(x,.079,z);transform.rotation.set(-Math.PI/2,0,0);transform.scale.set(w,d,1);transform.updateMatrix();shadow.setMatrixAt(i,transform.matrix);});shadow.computeBoundingSphere();root.add(shadow);
 // Cabinetry: fluted pilasters, bronze shelf brackets, recessed lit velvet and engraved plinths.
 for(const side of [-1,1]){
  const x=side*2.65;
  for(let i=0;i<3;i++){
   const y=.9+i*1.35;
   B('felt',x,y+.66,.73,1.12,1.1,.04);
   for(const dx of [-.56,.56]){B('gold',x+dx,y+.55,1.12,.025,1.16,.035);B('gold',x+dx,y-.09,.9,.055,.24,.38);}
   B('gold',x,y+.02,1.17,1.22,.035,.045);
   B('stone',x,y+.16,.94,.68,.16,.44);
  }
 }
 for(let x=-3;x<=3;x+=.12)B('wood',x,4.66,.57,.035,.3,.04);
 // Keep the walking floor clear of thin overlapping inlay strips.
 // The preview's black-and-gold serving tray, paired cut-glass tumblers and amber drink.
 B('dark',0,1.07,9.6,.96,.055,.5);for(const x of [-.48,.48])B('gold',x,1.11,9.6,.025,.08,.52);for(const z of [9.35,9.85])B('gold',0,1.11,z,.98,.08,.025);
 for(const x of [-.26,.26]){C('gold',x,1.115,9.6,.13,.025);C('glass',x,1.25,9.6,.125,.25);C(x<0?'red':'dark',x,1.18,9.6,.106,.1);ring('gold',x,1.375,9.6,.124,Math.PI/2);for(let j=0;j<12;j++){const a=j*Math.PI/6;B('gold',x+Math.sin(a)*.12,1.25,9.6+Math.cos(a)*.12,.009,.21,.009,a);}}
 // Shared detailed cards, patterned backs and denomination chip stacks.
 const pokerProps=furnishPokerTable(root,textures);
 for(let i=0;i<64;i++){const a=i*Math.PI*2/64;S('gold',-14+Math.sin(a)*4.5,1.46,9+Math.cos(a)*2.56,.018,.01,.018);}
 // Bar back: bottle shoulders, stoppers, labels, mirrored niches, stemware and cue rack.
 for(const y of [2.65,3.65]){
  B('dark',20.9,y,-10.5,.12,.9,6.6);B('gold',20.5,y-.48,-10.5,1,.055,6.8);B('light',20.65,y+.44,-10.5,.05,.025,6.5);
  for(let i=0;i<8;i++){const z=-13.4+i*.8;C(i%2?'green':'red',20.35,y-.15,z,.095,.42);S(i%2?'green':'red',20.35,y+.07,z,.095,.1,.095);C('gold',20.35,y+.19,z,.04,.18);B('cream',20.24,y-.15,z,.012,.15,.13);}
 }
 for(let i=0;i<4;i++){const z=-11+i*.65;C('glass',19.35,2.38,z,.11,.025);C('glass',19.35,2.53,z,.018,.3);S('glass',19.35,2.76,z,.12,.16,.12);}
 for(let i=0;i<5;i++){const z=-11.4+i*.45;part('cyl','wood',21.4,2.3,z,.025,3.8,.025,0,0,.07);C('cream',21.53,4.18,z,.028,.08);}
 // Kitchen: cupboard reveals, sockets, framed backsplash, crockery, chopping board and kettle.
 for(let x=-4.8;x<3;x+=1){B('dark',x,4.15,-14.83,.015,1.15,.025);B('gold',x+.45,3.94,-14.8,.03,.22,.035);}
 for(const x of [-3.6,-.4,2.3]){B('cream',x,2.7,-15.57,.2,.26,.035);B('dark',x-.045,2.7,-15.54,.02,.06,.01);B('dark',x+.045,2.7,-15.54,.02,.06,.01);}
 for(let i=0;i<4;i++)C('cream',-.7,2.15+i*.04,-14.1,.24,.025);
 B('deck',.2,2.15,-14.05,.8,.035,.5);S('dark',2.2,2.36,-14.2,.25,.24,.23);ring('gold',2.2,2.65,-14.2,.18);C('gold',2.2,2.6,-14.2,.12,.035);
 // Black-and-brass cassette deck sits on the service bench, matching the villa preview.
 const radioX=12.2,radioY=2.18,radioZ=2.12;
 part('soft','dark',radioX,radioY,radioZ,1.85,.88,.52);
 for(const side of [-1,1]){
  const x=radioX+side*.59;
  part('cyl','gold',x,radioY-.03,radioZ+.28,.3,.035,.3,Math.PI/2);
  part('cyl','rubber',x,radioY-.03,radioZ+.31,.26,.025,.26,Math.PI/2);
  S('dark',x,radioY-.03,radioZ+.34,.12,.12,.045);
  for(let j=-4;j<=4;j++)B('dark',x+j*.05,radioY-.03,radioZ+.33,.013,.42,.012);
  B('gold',radioX+side*.8,radioY+.65,radioZ,.065,.43,.06);
  C('gold',radioX+side*.65,radioY+.49,radioZ,.085,.07);
 }
 B('rubber',radioX,radioY+.84,radioZ,1.65,.1,.1);
 B('gold',radioX,radioY+.27,radioZ+.285,1.58,.12,.025);
 B('dark',radioX,radioY+.27,radioZ+.305,1.49,.08,.018);
 for(let j=-6;j<=6;j++)B('cream',radioX+j*.1,radioY+.27,radioZ+.32,.008,.045,.008);
 B('gold',radioX,radioY-.02,radioZ+.285,.45,.35,.035);B('rubber',radioX,radioY-.02,radioZ+.31,.39,.28,.02);
 for(const dx of [-.11,.11])ring('gold',radioX+dx,radioY-.01,radioZ+.33,.065);
 for(let j=0;j<5;j++)B('gold',radioX-.18+j*.09,radioY-.29,radioZ+.31,.065,.065,.04);
 B('light',radioX+.19,radioY+.13,radioZ+.33,.045,.02,.01);
 // Sauna: slatted seats with visible gaps, bucket staves, ladle, thermometer and folded towels.
 for(const z of [-11,-9,-7])for(let x=-20.5;x<-18.1;x+=.18)B('deck',x,1.32,z,.14,.05,1.8);
 for(let i=0;i<12;i++){const a=i*Math.PI/6;B('deck',-18.9+Math.sin(a)*.23,1.56,-7+Math.cos(a)*.23,.055,.44,.055);}
 ring('gold',-18.9,1.42,-7,.24,Math.PI/2);ring('gold',-18.9,1.7,-7,.24,Math.PI/2);B('wood',-18.5,1.87,-7,.7,.035,.045);S('wood',-18.82,1.83,-7,.12,.045,.1);
 B('cream',-20.8,2.9,-8,.05,.55,.22);B('red',-20.76,2.83,-8,.02,.26,.025);
 for(let i=0;i<3;i++)B('cream',-19.3,1.38+i*.09,-10.6,.8,.08,.5);
 // The real award pixels from the application's catalog, framed by physical display bases.
 const awards=selectedVillaAwards(hall),loader=new T.TextureLoader();
 const load=()=>Promise.all([pokerProps.load(),...awards.map(async(item,index)=>{
  const source=villaAwardArt(item,window.PokerHallTrophies);if(!source)return;
  const x=index<3?-2.65:2.65,y=.9+(index%3)*1.35;
  try{const map=await loader.loadAsync(source);if(root.userData.disposed){map.dispose();return;}map.colorSpace=T.SRGBColorSpace;map.anisotropy=4;textures.push(map);
   const ratio=map.image.width/map.image.height,w=Math.min(.98,.75*ratio),h=w/ratio;
   const art=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshStandardMaterial({map,transparent:true,alphaTest:.08,roughness:.38,metalness:.08,side:T.DoubleSide}));art.name='Owned award '+item.id;art.position.set(x,y+.27+h/2,1.12);root.add(art);
   const record={item,source,target:art};art.userData.awardRecord=record;(root.userData.awardTargets||=[]).push(record);root.userData.awardTargets.sort((a,b)=>awards.indexOf(a.item)-awards.indexOf(b.item));
   const relief=trophyRelief(map,w,h);if(relief){relief.position.copy(art.position);relief.userData.awardRecord=record;root.add(relief);}
   const back=new T.Mesh(art.geometry,art.material);back.position.set(x,art.position.y,1.035);back.rotation.y=Math.PI;back.userData.awardRecord=record;root.add(back);
   const plate=awardPlaque(item,textures);plate.position.set(x,y-.12,1.34);plate.userData.awardRecord=record;root.add(plate);
  }catch(_){/* An empty display is preferable to inventing an earned award. */}
 })]);
 return {load,count:awards.length};
}
