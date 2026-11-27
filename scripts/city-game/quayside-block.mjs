// Building footprints, stoops and rails are shared with the movement solver.
export const quayHouses=[
 {x:67,z:114.4,w:16,d:4.6,h:14.2,wall:'#92523f',trim:'#c99c77',shop:'КАФЕ МАЯК'},
 {x:54.7,z:114.4,w:8.4,d:4.6,h:11.6,wall:'#a5ae98',trim:'#ddd4b8',shop:'ЦВЕТЫ'},
 {x:57.6,z:89,w:9,d:16,h:16.6,wall:'#b9a88f',trim:'#e0d1b4',shop:'АТЕЛЬЕ'}
];
export const mayakTerraceTables=[61.5,65,68.5].map(x=>({x,z:111.45}));
export const quayRails=[{x:56.5,z:97.6,w:.09,d:1.2,h:1.1},{x:58.7,z:97.6,w:.09,d:1.2,h:1.1}];
export const quayKiosk={x:84,z:98,w:4.2,d:6,h:3.3};
export const quayBenches=[{x:81.9,z:91,w:.64,d:2.2,h:.94},{x:81.9,z:106,w:.64,d:2.2,h:.94}];
export function quayHeight(x,z){
 if(x>=51&&x<=77.5&&z>=109.25&&z<110.5)return .31;
 if(x>=77.5&&x<=86.5&&z>=79&&z<=116.8){
  const ramp=Math.max(0,1-Math.max(0,Math.abs(z-96)-1.45)/.65);
  return .31-.172*ramp*Math.max(0,1-(x-77.5)/1.2);
 }
 if(x>=45.5&&x<=66.5&&z>=97.9&&z<=99.5&&x<54)return .16+.15*Math.min(1,(99.5-z)/1.2);
 if(x>=45.5&&x<=77.5&&z>=110.5&&z<=116.8)return x>=51?.31:.16+.15*Math.min(1,(z-110.5)/.85);
 if(x>=54&&x<=66.5&&z>=79&&z<=99.5){
  if(Math.abs(x-57.6)<.9&&z<97&&z>95.68)return .32+.13*(3-Math.floor((97-z)/.44));
  if(Math.abs(x-57.6)<1.1&&z>=97&&z<=98.45)return .32+.13*(1+Math.floor((98.45-z)/.48));
  return .16+.16*Math.min(1,(66.5-x)/.75);
 }
 return 0;
}
// Relative elevation above the adjoining carriageway at all four tyre contacts.
export function quayWheelRise(x,z,yaw){
 if(x<43||x>80||z<76||z>119)return 0;
 const dx=Math.sin(yaw),dz=Math.cos(yaw);
 let sum=0;
 for(const side of [-.7,.7])for(const axle of [-1.2,1.2]){
  sum+=Math.max(0,quayHeight(x+side*dz+axle*dx,z-side*dx+axle*dz)-.138);
 }
 return sum*.25;
}
export function buildQuayBlock({box,label,outdoors,glaze,cylinder,cafeModel,buildShop}){
 const iron='#313638',glass='#374d54';
 for(const {x,z} of mayakTerraceTables){
  cylinder('#39423e',x,.36,z,.26,.09);
  cylinder('#39423e',x,.77,z,.055,.78);
  cylinder('#b88254',x,1.17,z,.48,.08);
  for(const side of [-1,1]){
   const chair=x+side*.72;
   cylinder('#385248',chair,.75,z,.24,.09);
   for(const dx of [-.15,.15])for(const dz of [-.15,.15])
    box('#413b32',chair+dx,.53,z+dz,.044,.42,.044);
   box('#385248',chair+side*.2,.95,z,.07,.36,.41);
   cylinder('#eee2cd',x+side*.23,1.27,z,.073,.12);
  }
 }
 for(const b of quayHouses){
  if(b!==quayHouses[0]){
   buildShop(b);
   continue;
  }
  if(cafeModel&&b===quayHouses[0]){
   label('КАФЕ   МАЯК',b.x+.1,3.05,b.z-2.49,5.85,.47,Math.PI,'#214743','#edcf98');
   continue;
  }
  const north=b.z>100,sign=north?-1:1,front=b.z+sign*b.d/2;
  box(b.wall,b.x,(b.h+3.45)/2,b.z,b.w,b.h-3.45,b.d);
  // Set the lower wall back to make real display bays under the upper storeys.
  box('#78614e',b.x-.46,1.73,b.z-sign*.46,b.w-.92,3.46,b.d-.92);
  for(const [y,extra] of [[3.55,.25],[b.h-.38,.28],[b.h,.55]])box(b.trim,b.x,y,b.z,b.w+extra,.21,b.d+extra);
  function face(side,u,y,out,w,h,d,color){
   if(side)box(color,b.x+b.w/2+out,y,b.z+u,d,h,w);
   else box(color,b.x+u,y,front+sign*out,w,h,d);
  }
  for(const side of [false,true]){
   const span=side?b.d:b.w,count=Math.max(1,Math.floor(span/2.65)),bay=span/count;
   for(let col=0;col<count;col++){
    const u=(col+.5)*bay-span/2;
    face(side,u-bay/2+.1,1.85,.02,.22,3.24,.3,b.trim);
    face(side,u,.53,-.27,bay-.14,.42,.99,'#69645b');
    face(side,u,2.96,-.26,bay-.14,.21,1,'#443c34');
    if(side||Math.abs(u)>1){
     face(side,u,1.8,-.85,bay-.24,2.13,.08,'#967759');
     face(side,u,1.96,-.63,bay-.33,.065,.4,'#584538');
     face(side,u,2.8,-.54,bay-.4,.055,.22,'#ffd6a0');
     for(let item=0;item<3;item++){
      const pos=u+(item-1)*bay*.23;
      if(b.shop==='ЦВЕТЫ'){
       face(side,pos,.98,-.39,.31,.43,.29,'#9c6950');
       face(side,pos,1.34,-.42,.39,.39,.25,['#738753','#ab7664','#857694'][item]);
      }else if(b.shop==='АТЕЛЬЕ'){
       face(side,pos,1.55,-.47,.32,.91,.18,['#ab8164','#777b85','#8d5651'][item]);
       face(side,pos,2.06,-.47,.19,.19,.13,'#bdac91');
      }else{
       face(side,pos,1.14,-.46,.34,.38,.3,'#cbaf88');
       face(side,pos,2.12,-.52,.22,.24,.19,'#dbc4a4');
      }
     }
     if(side)glaze(b.x+b.w/2+.04,1.79,b.z+u,bay-.23,2.12,Math.PI/2);
     else glaze(b.x+u,1.79,front+sign*.04,bay-.23,2.12,north?Math.PI:0);
     face(side,u,1.79,.06,.047,2.18,.075,iron);
     face(side,u,2.48,.06,bay-.14,.06,.075,iron);
     face(side,u,3.11,.32,bay-.05,.16,.72,b.shop==='АТЕЛЬЕ'?'#596865':'#864c3c');
    }
    for(let y=4.77;y<b.h-1;y+=3.05){
     const w=y<2?bay-.57:1.32;
     face(side,u,y,.07,w+.23,2.25,.17,b.trim);
     face(side,u,y,.18,w,2,.08,glass);
     face(side,u,y+.33,.24,w,.08,.09,iron);
     face(side,u,y,.24,.055,2,.09,iron);
     face(side,u,y-1.08,.24,w+.36,.13,.46,b.trim);
    }
   }
  }
  const doorstep=north?.31:.84;
  face(false,0,doorstep+1.22,.31,1.74,2.44,.28,b.trim);
  face(false,0,doorstep+1.16,.49,1.43,2.32,.13,'#483f38');
  face(false,0,doorstep+1.47,.57,1.14,1.39,.05,'#557079');
  face(false,.49,doorstep+.98,.63,.048,.32,.08,b.trim);
  label(b.shop,b.x,3.29,front+sign*.63,Math.min(b.w-1,6),.66,north?Math.PI:0,'#294740','#f5deb3');
  if(b===quayHouses[0]){
   // Staggered courses and narrow mortar joints stay visible from the street.
   for(let y=3.86,row=0;y<b.h-.45;y+=.34,row++){
    face(false,0,y,.012,b.w,.018,.024,'#bf896d');
    for(let u=-b.w/2+.4+(row%2)*.5;u<b.w/2;u+=1)face(false,u,y+.17,.012,.021,.31,.024,'#b88065');
   }
   for(let floor=0;floor<3;floor++){
    const y=3.8+floor*3.05;
    face(false,2,y,.83,4,.14,1.5,iron);
    face(false,2,y+.9,1.54,4,.07,.07,iron);
    for(let i=0;i<=8;i++)face(false,i*.49,y+.46,1.54,.045,.92,.045,iron);
    if(floor<2)for(let i=0;i<14;i++)face(false,.18+i*.26,y+i*.218,1,.32,.1,.74,iron);
   }
  }
 }
 // The crossing lands on the kiosk forecourt and the path turns towards the shops.
 box('#a99e8e',82.6,.15,97.9,7.8,.30,37.8);
 outdoors.paving(82.6,97.9,7.8,37.8,.31);
 for(const [start,end] of [[79,93.9],[98.1,116.8]]){
  box('#ada292',78.1,.15,(start+end)/2,1.2,.30,end-start);
  outdoors.paving(78.1,(start+end)/2,1.2,end-start,.31);
 }
 for(let i=0;i<12;i++)for(let j=0;j<7;j++){
  const x=77.5+(j+.5)*1.2/7,z=93.9+(i+.5)*.35,h=quayHeight(x,z);
  box('#c6bcb0',x,h/2,z,1.2/7,h,.35);
 }
 for(let i=0;i<8;i++){
  const z=97.9+(i+.5)*.2,h=quayHeight(48,z);
  box('#b7ad9d',49.75,h/2,z,8.5,h,.2);
 }
 // Detectable warning tiles sit behind each ramp, level with the walking surface.
 for(const x of [65.65,78.78]){
  for(let row=0;row<4;row++){
   const z=94.94+row*.7,y=quayHeight(x,z);
   box('#b59d69',x,y+.011,z,.49,.019,.68);
   for(let a=-1;a<=1;a++)for(let b=-2;b<=2;b++)
    box('#c8b17b',x+a*.135,y+.025,z+b*.125,.049,.012,.049);
  }
 }
 const k=quayKiosk;
 box('#335750',k.x,1.81,k.z,k.w,3,k.d);
 box('#c4aa83',k.x-.37,3.42,k.z,k.w+1.12,.24,k.d+.52);
 box('#302c29',81.87,1.94,k.z,.12,1.42,4.95);
 box('#735741',81.61,1.12,k.z,.7,.19,5.2);
 for(const dz of [-1.98,-.99,0,.99,1.98]){
  box('#ad8260',81.76,1.54,k.z+dz,.22,.67,.68);
  box('#e0cba0',81.62,1.63,k.z+dz,.08,.39,.48);
 }
 label('ПРЕССА',81.73,2.93,k.z,3.4,.52,-Math.PI/2,'#32584f','#f2d9b1');
 for(const b of quayBenches){
  for(const z of [b.z-.84,b.z+.84])box(iron,b.x,.53,z,.48,.42,.1);
  for(const dx of [-.21,0,.21])box('#926745',b.x+dx,.76,b.z,.18,.1,b.d);
  for(const y of [.99,1.22])box('#926745',b.x+.28,y,b.z,.08,.18,b.d);
 }
 // Textured paving ends at the curb and runs uninterrupted to each threshold.
 outdoors.paving(61.5,114.08,32,5.43,.315);
 outdoors.paving(59.875,89.25,11.75,20.5,.325);
 for(let z=79.65;z<99.5;z+=1.3)box('#80786c',66.12,.249,z,.17,.022,.025);
 for(let x=46;x<77.5;x+=1.3)box('#897e70',x,.243,110.96,.025,.022,.18);
 // Extend the shop-side pavement toward the bend while keeping the crossing ramp.
 box('#a79580',64.25,.15,110.32,26.5,.30,2.14);
 outdoors.paving(64.25,110.32,26.5,2.14,.315);
 for(let x=51.4;x<77.5;x+=1){
  box('#c6bba6',x,.225,109.29,.985,.175,.14);
 }
 // Narrow paving strips build the curb ramps to the same profile as the solver.
 for(let i=0;i<8;i++){
  const z=110.5+(i+.5)*.11,h=quayHeight(48,z);
  box('#c7baaa',61.5,h/2,z,32,h,.11);
 }
 box('#c7baaa',61.5,.155,114.09,32,.31,5.42);
 box('#bcae9e',59.875,.16,89.25,11.75,.32,20.5);
 for(let i=0;i<8;i++){
  const x=65.75+(i+.5)*.09375,h=quayHeight(x,90);
  box('#bcae9e',x,h/2,89.25,.09375,h,20.5);
 }
 for(let i=0;i<3;i++){
  const z=98.45-(i+.5)*.48,h=quayHeight(57.6,z);
  box('#cdbba0',57.6,h/2,z,2.18,h,.48);
 }
 for(const r of quayRails){
  box(iron,r.x,1.32,r.z,r.w,.07,r.d);
  for(const dz of [-.52,.52])box(iron,r.x,.82,r.z+dz,.07,1,.07);
 }
}
