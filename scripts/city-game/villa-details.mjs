import * as T from '../../vendor/three/three.module.min.js';
import {selectedVillaAwards,villaAwardArt} from './villa-awards.mjs';
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
 // Black and white marble inlay with restrained bronze accents at the wall.
 for(const x of [-4.6,4.6])B('gold',x,.064,8,.025,.015,13.5);
 for(const z of [1.35,14.75])B('gold',0,.064,z,9.2,.015,.025);
 // Tabletop: leather-bound club books, coasters, porcelain espresso and a folded paper.
 B('leather',.46,1.083,9.3,.56,.065,.42,.12);B('cream',.46,1.085,9.3,.5,.04,.39,.12);
 B('felt',.43,1.125,9.3,.57,.035,.43,.12);B('gold',.43,1.148,9.3,.25,.008,.02,.12);
 C('cream',-.46,1.067,9.75,.2,.025);C('cream',-.46,1.16,9.75,.105,.17);C('dark',-.46,1.25,9.75,.08,.008);ring('cream',-.34,1.18,9.75,.065);
 // Poker room: individually edged chips, dealer puck, card indices and rail stitching.
 for(let i=0;i<8;i++){
  const a=i*Math.PI/4,x=-14+Math.sin(a)*3.5,z=9+Math.cos(a)*1.8;
  for(let stack=0;stack<3;stack++)for(let k=0;k<5+stack;k++){
   C(['cream','red','dark'][stack],x+stack*.25,1.57+k*.045,z,.115,.038);
   for(let j=0;j<4;j++){const q=j*Math.PI/2;B('gold',x+stack*.25+Math.sin(q)*.09,1.59+k*.045,z+Math.cos(q)*.09,.035,.008,.035);}
  }
 }
 C('cream',-11.3,1.55,8.2,.24,.035);C('dark',-11.3,1.572,8.2,.18,.008);
 for(let i=0;i<5;i++){const x=-15.4+i*.6;B('cream',x,1.54,9.15,.48,.016,.72);B(i%2?'red':'dark',x-.13,1.551,8.94,.06,.004,.1);B(i%2?'red':'dark',x+.13,1.551,9.35,.06,.004,.1);}
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
 // Garage: pegboard holes, labelled drawers, hanging spanners and folded mechanic's cloths.
 for(const x of [8.8,12.2,15.6,19]){
  for(let dx=-1.3;dx<1.4;dx+=.3)for(let y=2.05;y<4.4;y+=.3)C('dark',x+dx,y,1.78,.017,.012);
  for(let j=0;j<4;j++){B('cream',x-1+j*.65,.75,2.46,.27,.12,.012);B('dark',x-1+j*.65,.75,2.47,.18,.025,.012);}
  for(let j=0;j<3;j++){const px=x-.6+j*.55;B('gold',px,3,2.25,.045,.55,.045);ring('gold',px,3.3,2.25,.075);}
 }
 for(let i=0;i<3;i++)B('cream',17,1.83+i*.04,2.12,.8,.035,.48);
 // Sauna: slatted seats with visible gaps, bucket staves, ladle, thermometer and folded towels.
 for(const z of [-11,-9,-7])for(let x=-20.5;x<-18.1;x+=.18)B('deck',x,1.32,z,.14,.05,1.8);
 for(let i=0;i<12;i++){const a=i*Math.PI/6;B('deck',-18.9+Math.sin(a)*.23,1.56,-7+Math.cos(a)*.23,.055,.44,.055);}
 ring('gold',-18.9,1.42,-7,.24,Math.PI/2);ring('gold',-18.9,1.7,-7,.24,Math.PI/2);B('wood',-18.5,1.87,-7,.7,.035,.045);S('wood',-18.82,1.83,-7,.12,.045,.1);
 B('cream',-20.8,2.9,-8,.05,.55,.22);B('red',-20.76,2.83,-8,.02,.26,.025);
 for(let i=0;i<3;i++)B('cream',-19.3,1.38+i*.09,-10.6,.8,.08,.5);
 // The real award pixels from the application's catalog, framed by physical display bases.
 const awards=selectedVillaAwards(hall),loader=new T.TextureLoader();
 const pending=awards.map(async(item,index)=>{
  const source=villaAwardArt(item,window.PokerHallTrophies);if(!source)return;
  const x=index<3?-2.65:2.65,y=.9+(index%3)*1.35;
  try{const map=await loader.loadAsync(source);if(root.userData.disposed){map.dispose();return;}map.colorSpace=T.SRGBColorSpace;map.anisotropy=4;textures.push(map);
   const ratio=map.image.width/map.image.height,w=Math.min(.98,.91*ratio),h=w/ratio;
   const art=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshStandardMaterial({map,transparent:true,alphaTest:.08,roughness:.38,metalness:.08,side:T.DoubleSide}));art.name='Owned award '+item.id;art.position.set(x,y+.27+h/2,1.02);root.add(art);
   const c=document.createElement('canvas');c.width=512;c.height=128;const g=c.getContext('2d');g.fillStyle='#151e1b';g.fillRect(0,0,512,128);g.strokeStyle='#c9ab70';g.strokeRect(3,3,506,122);g.fillStyle='#ffe3a0';g.font='600 24px sans-serif';g.textAlign='center';g.fillText(item.title||item.name||item.history?.tournament||'Награда',256,54,470);g.font='18px sans-serif';g.fillText(item.origin||'Коллекция игрока',256,91,470);const plaque=new T.CanvasTexture(c);plaque.colorSpace=T.SRGBColorSpace;textures.push(plaque);const plate=new T.Mesh(new T.PlaneGeometry(1.1,.275),new T.MeshStandardMaterial({map:plaque,roughness:.4,metalness:.2}));plate.position.set(x,y-.15,1.2);root.add(plate);
  }catch(_){/* An empty display is preferable to inventing an earned award. */}
 });
 return {ready:Promise.all(pending),count:awards.length};
}
