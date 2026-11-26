// Detail the publicly visible elevation of each address. All entrance fixtures
// are wall mounted; canopies and galleries clear the pedestrian collision hull.
export function detailNeighbourhood(b,{box,batch,cylinder,label}){
 const front=b.z+b.d/2,stone='#c8b59b',steel='#3e5152',copper='#9c795a';
 function cornice(y,over,color){
  box(color,b.x,y,b.z,b.w+over,.18,b.d+over);
 }
 function pilasters(spacing,from,to,color){
  for(let dx=-b.w/2+.42;dx<=b.w/2-.3;dx+=spacing){
   box(color,b.x+dx,(from+to)/2,front+.18,.33,to-from,.36);
   box(stone,b.x+dx,to,front+.22,.52,.25,.48);
  }
 }
 function gallery(y,width,color){
  box(stone,b.x,y,front+.75,width,.18,1.55);
  for(const yy of [y+.23,y+.99])box(color,b.x,yy,front+1.48,width,.064,.07);
  for(let dx=-width/2;dx<=width/2;dx+=.42)box(color,b.x+dx,y+.6,front+1.48,.035,.76,.045);
  for(const side of [-1,1])box(color,b.x+side*width/2,y+.99,front+.75,.07,.065,1.45);
 }
 function lantern(x,y,z){
  box(steel,x,y,z,.32,.56,.26);
  batch('box','#f4c88b',x,y,z+.145,.22,.39,.045,0,0,true);
  for(const dy of [-.29,.29])box(copper,x,y+dy,z,.41,.055,.35);
 }
 function skylight(cx,cz,w,d,h){
  box(steel,cx,b.h+h*.5,cz,w,h,d);
  for(let dx=-w/2+.27;dx<w/2-.35;dx+=1.1)
   box('#72898b',cx+dx+.43,b.h+h*.53,cz+d/2+.04,.81,h*.7,.08);
  box('#6b7774',cx,b.h+h+.06,cz,w+.35,.15,d+.35);
 }
 function shutters(y,h,spacing,color){
  for(let x=b.x-b.w/2+1.45;x<b.x+b.w/2-1;x+=spacing){
   box(color,x,y,front+.18,.58,h,.12);
   for(let k=-3;k<=3;k++)box('#918774',x,y+k*h/9,front+.255,.50,.043,.07);
  }
 }
 const id=b.x+','+b.z;
 switch(id){
  case '32,85': // Arcaded waterfront apartments: shaded galleries on the avenue.
   for(const y of [7.98,11.37])gallery(y,b.w*.46,'#38635d');
   for(const x of [-8,0,8])lantern(b.x+x,3.6,front+.56);
   break;
  case '-33,84': // Hotel belvedere, with a glazed roof pavilion.
   skylight(b.x-3,b.z,10,6,2.2);
   for(let i=-4;i<=4;i++)box(copper,b.x-3+i*1.15,b.h+2.5,b.z,.08,.52,5.8);
   break;
  case '104,55': // Shuttered loggia, best seen across the garden.
   shutters(6.3,2.05,3.45,'#58766a');gallery(8.35,6.4,'#4a625a');break;
  case '107,35': // Vertical stairwell lantern on the west elevation.
   for(let y=4.5;y<b.h-2;y+=2.6){
    box(steel,b.x-b.w/2-.12,y,b.z,.33,2.5,2.3);
    for(const dz of [-.55,.55])box('#91aead',b.x-b.w/2-.32,y,b.z+dz,.08,2.25,1);
   }break;
  case '105,16': // Ceramic entry surround and parapet of the smallest coastal house.
   for(let i=-5;i<=5;i++)box(i%2?'#73928a':'#dcccb4',b.x+i*.37,3.99,front+.22,.35,.36,.14);
   for(const x of [-2.25,2.25])lantern(b.x+x,2.4,front+.35);
   cornice(b.h-.1,.58,'#9e7869');break;
  case '-43,30': // Coffee roastery, copper exhaust and a sawtooth roof monitor.
   skylight(b.x-3,b.z,8,3.7,1.7);
   cylinder(copper,b.x+6,b.h+1.4,b.z+3,.34,2.8);
   batch('cone',steel,b.x+6,b.h+2.94,b.z+3,.57,.3,.57);
   break;
  case '-17,29': // Bistro's enclosed dining balcony above the awning.
   gallery(5.04,b.w*.7,'#5b6351');
   for(const dx of [-5,-2.5,0,2.5,5])box('#6f5843',b.x+dx,6.1,front+1.35,.11,2.12,.12);
   box('#91614e',b.x,7.22,front+.65,b.w*.75,.22,1.7);break;
  case '29,28': // Record shop: a projecting record sleeve and black vinyl disc.
   box(steel,b.x-5,5,front+.78,.085,.09,1.5);
   box('#b09d79',b.x-5,4.33,front+1.46,1.35,1.3,.12);
   batch('ball','#283034',b.x-5,4.34,front+1.54,.57,.57,.04);
   batch('ball','#bc7859',b.x-5,4.34,front+1.585,.15,.15,.025);
   break;
  case '54,33': // Open market clerestory with ventilating louvers.
   skylight(b.x,b.z,9,5,2.1);
   for(let i=0;i<5;i++)box(steel,b.x,b.h+.45+i*.29,b.z+2.61,8.7,.09,.18);
   break;
  case '49,-48': // Barber lights and a striped three-dimensional blade sign.
   for(let i=0;i<12;i++)cylinder(['#924f48','#dfd6bd','#4e6977'][i%3],b.x+2.15,2.05+i*.1,front+.49,.14,.102);
   for(const y of [1.97,3.24])batch('ball',copper,b.x+2.15,y,front+.49,.18,.12,.18);
   break;
  case '-43,-53': // Deco hotel porte-cochere and backlit stepped fascia.
   for(let i=0;i<3;i++)box(i===1?'#928266':stone,b.x,4.05+i*.15,front+1.15,8.3-i*.42,.15,2.72-i*.21);
   for(let i=-4;i<=4;i++)batch('ball','#ffdb95',b.x+i*.82,3.94,front+2.28,.07,.045,.07,0,0,true);
   break;
  case '-18,-52': // Apartment stair tower with stacked landing windows.
   for(let y=4.4;y<b.h-1;y+=3.6){
    box('#817d70',b.x+b.w*.33,y,front+.16,2.35,3.52,.38);
    box('#69818a',b.x+b.w*.33,y,front+.38,1.91,2.54,.08);
    box(stone,b.x+b.w*.33,y-.1,front+.45,2,.085,.12);
   }break;
  case '26,-31': // Broadcast mast, outriggers and aerial hoops.
   cylinder(steel,b.x,b.h+3,b.z,.12,6);
   for(let i=0;i<4;i++){
    const y=b.h+2.3+i*.82;
    box('#a9b2ab',b.x,y,b.z,3.6-i*.56,.075,.075);
    box('#a9b2ab',b.x,y+.18,b.z,.075,.075,2.8-i*.42);
   }batch('ball','#db694c',b.x,b.h+6,b.z,.11,.11,.11,0,0,true);break;
  case '30,-96': // Glass drafting studio in two roof bays.
   skylight(b.x-7,b.z,9,5,2);skylight(b.x+7,b.z,9,5,2);break;
  case '-31,-97': // Long masonry warehouse, grouped bays and steel lintels.
   pilasters(7,3.9,b.h-.53,'#9b806e');cornice(4.12,.66,steel);break;
  case '-83,-43': // Narrow apartment block, continuous iron balconies.
   for(let y=5.05;y<b.h-1;y+=7.4)gallery(y,b.w*.76,steel);break;
  case '-83,24': // Corniced sandstone end building and timber shutters.
   for(const y of [6.28,9.98,13.68])shutters(y,2.04,3.5,'#626c5d');
   cornice(b.h-.65,.59,stone);cornice(b.h-.38,.86,copper);break;
 }
}
