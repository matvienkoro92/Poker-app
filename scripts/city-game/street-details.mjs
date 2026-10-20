import {venueForBuilding} from './district-plan.mjs';
import {BUILDINGS,ROAD_X,ROAD_Z} from './world.mjs';
// Street furniture remains on pavements and inside building footprints: no new invisible obstacles.
export function dressStreets({box,cylinder,batch,label}){
 for(const [index,b]of BUILDINGS.entries()){
  const z=b.z+b.d/2+.24;
  if(!venueForBuilding(b)){
  // Stone portal, recessed door, bell panel, address enamel, awning with individual seams.
  for(const side of [-1,1]){box('#c6b99c',b.x+side*1.22,1.6,z,.18,3.2,.24);box('#656b62',b.x+side*1.22,.13,z,.28,.26,.42);}
  box('#c6b99c',b.x,3.25,z,2.65,.18,.25);box('#c5a774',b.x,1.45,z+.12,.035,2.65,.035);
  box('#263c38',b.x+1.55,1.48,z,.22,.38,.06);for(let i=0;i<4;i++)batch('ball','#c5a774',b.x+1.55,1.36+i*.07,z+.04,.022,.022,.015);
  label(String(10+index*2),b.x-1.65,2.4,z+.05,.52,.42,0,'#183d36','#efd8a4');
  for(let i=-3;i<=3;i++){batch('box',i%2?'#475c50':'#d1b78a',b.x+i*.4,3.28,z+.7,.39,.09,1.45,0,-.13);}
  }
  // Drainpipes, brackets, ventilation slots and balcony planter boxes.
  for(const side of [-1,1]){const x=b.x+side*(b.w/2-.5);cylinder('#55645e',x,b.h/2,z,.055,b.h);for(let y=1;y<b.h;y+=2.8)box('#a8a58d',x,y,z+.04,.16,.05,.12);}
  for(let i=-1;i<=1;i++){
   const x=b.x+i*3.4;if(Math.abs(i*3.4)>b.w/2-1.5)continue;
   box('#35443d',x,.6,z,.95,.35,.1);for(let j=-3;j<=3;j++)box('#8b9181',x+j*.12,.6,z+.06,.025,.29,.025);
   if(b.h>7){box('#625344',x,5.02,z+.52,1.35,.32,.45);for(let j=0;j<5;j++){batch('ball','#496946',x-.5+j*.25,5.25,z+.53,.2,.19,.23);batch('ball',j%2?'#dfbb8b':'#b88b7c',x-.5+j*.25,5.4,z+.53,.06,.055,.06);}}
  }
  // Roof equipment: seams and fan grilles, rather than unbroken rooftop cubes.
  for(let i=0;i<2;i++){const x=b.x-3+i*6;for(let j=-3;j<=3;j++)box('#293e3c',x+j*.22,b.h+1.59,b.z, .045,.025,1.6);cylinder('#a7b0a2',x,b.h+1.7,b.z,.36,.12);}
 }
 // Cast iron drains, patched kerbs, utility covers and tactile paving at crossings.
 for(const x of ROAD_X)for(const z of ROAD_Z){
  for(const side of [-1,1]){
   box('#384340',x+side*6.65,.055,z+11, .55,.028,1.05);
   for(let j=-3;j<=3;j++)box('#a0a894',x+side*6.65+j*.065,.075,z+11,.022,.014,.9);
   for(let i=0;i<5;i++)for(let j=0;j<3;j++)batch('ball','#c0ae7f',x-3+i*.3,.17,z+side*8.1+j*.26,.055,.025,.055);
  }
  cylinder('#394946',x+3,.045,z+4,.48,.02);for(let i=-2;i<=2;i++)box('#889080',x+3+i*.13,.062,z+4,.025,.012,.6);
 }
 // Repeated waterfront furniture: slatted benches, bins, bike stands and softly lit bollards.
 for(const z of [116,136,156]){
  const x=31;
  for(let i=0;i<6;i++){box('#806347',x,.56,z-.75+i*.3, .8,.09,.23);box('#806347',x-.43,1.04,z-.75+i*.3,.08,.65,.23);}
  for(const dz of [-.65,.65]){box('#34483f',x,.27,z+dz,.65,.54,.09);box('#34483f',x,1.36,z+dz,.86,.06,.06);}
  cylinder('#354940',x, .58,z+2.3,.3,1.16);cylinder('#a88e5e',x,1.18,z+2.3,.32,.04);cylinder('#152b2b',x,1.21,z+2.3,.22,.025);
  for(const dz of [-2.5,-3.5]){cylinder('#697a70',x,.4,z+dz,.035,.8);box('#697a70',x,.82,z+dz,.7,.07,.07);}
  cylinder('#3b5148',x+2,.36,z+3,.11,.72);batch('box','#f1d7a1',x+2,.73,z+3,.16,.06,.16,0,0,true);
 }
}
