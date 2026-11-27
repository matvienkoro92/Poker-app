import {buildUpperShop,shopFittings,panelMoulding,botanicalBlade} from './shop-joinery.mjs';
import * as T from '../../vendor/three/three.module.min.js';
import {quayShopPlan} from './quay-shop-plan.mjs';

function wallFinish(florist,textures){
 const c=document.createElement('canvas');c.width=c.height=384;
 const g=c.getContext('2d');
 let seed=23;
 const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
 g.fillStyle=florist?'#aeb297':'#a29889';g.fillRect(0,0,384,384);
 if(!florist)for(let row=0;row<16;row++)for(let col=-1;col<6;col++){
  const v=Math.floor(random()*20);
  g.fillStyle='rgb('+(157+v)+','+(134+v)+','+(111+v)+')';
  g.fillRect((col+(row%2)*.5)*72,row*24,70,22.5);
 }
 for(let i=0;i<38000;i++){
  g.fillStyle=i%3?'#6c544222':'#fff2cb44';g.fillRect(random()*384,random()*384,1+random()*2,1);
 }
 const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;map.wrapS=map.wrapT=T.RepeatWrapping;map.anisotropy=4;textures.push(map);
 return new T.MeshStandardMaterial({map,bumpMap:map,bumpScale:florist?.014:.027,roughness:.93});
}

export function buildQuayShop(b,{scene,box,cylinder,batch,label,glaze,textures,mergeParts}){
 const florist=b.shop==='ЦВЕТЫ',{front,sign,depth,fixtures}=quayShopPlan(b);
 const frame=florist?'#2f554b':'#454951',trim=florist?'#dfcea6':'#c5ad8b',wood='#846448';
 const z=inset=>front-sign*inset;
 function part(color,x,y,inset,w,h,d){box(color,b.x+x,y,z(inset),w,h,d);}
 function ball(color,x,y,inset,w,h,d,angle=0){batch('ball',color,b.x+x,y,z(inset),w,h,d,0,angle);}
 function post(color,x,y,inset,r,h){cylinder(color,b.x+x,y,z(inset),r,h);}
 const skin=wallFinish(florist,textures);
 function wall(x,y,cz,w,h,d){
  const g=new T.BoxGeometry(w,h,d),pos=g.attributes.position,uv=g.attributes.uv,n=g.attributes.normal;
  for(let i=0;i<uv.count;i++)uv.setXY(i,(Math.abs(n.getX(i))>.5?pos.getZ(i):pos.getX(i))/1.92,(Math.abs(n.getY(i))>.5?pos.getZ(i):pos.getY(i))/1.92);
  const m=new T.Mesh(g,skin);m.position.set(x,y,cz);m.castShadow=m.receiveShadow=true;scene.add(m);
 }
 buildUpperShop(b,florist,skin,scene,mergeParts);
 const fittings=shopFittings(scene,b,front,sign,mergeParts);
 wall(b.x,1.85,b.z-sign*depth/2,b.w,3.7,b.d-depth);
 for(const side of [-1,1]){
  const ex=b.x+side*(b.w/2-.11);
  if(florist||side<0){wall(ex,1.85,z(depth/2),.22,3.7,depth);continue;}
  wall(ex,.58,z(depth/2),.22,1.16,depth);
  wall(ex,3.35,z(depth/2),.22,.70,depth);
  glaze(ex+.115,2.08,z(depth/2),depth-.18,1.86,Math.PI/2);
  for(const inset of [.12,depth*.34,depth*.66,depth-.12])box(frame,ex+.12,2.08,z(inset),.13,1.95,.10);
  box(trim,ex+.13,1.13,z(depth/2),.38,.12,depth);
 }
 part('#a19783',0,.15,depth/2,b.w,.30,depth);
 part('#c8b394',0,3.57,depth/2,b.w,.22,depth);
 // Baked ceiling occlusion and pools of lamplight remain visible through the glazing.
 const c=document.createElement('canvas');c.width=768;c.height=320;
 const ctx=c.getContext('2d'),wash=ctx.createLinearGradient(0,0,0,320);
 for(const [offset,color] of [[0,'#302f28'],[.23,florist?'#69735c':'#8e7965'],[.8,florist?'#535d4b':'#766456'],[1,'#403a32']])wash.addColorStop(offset,color);
 ctx.fillStyle=wash;ctx.fillRect(0,0,768,320);
 for(const cx of [158,592]){
  const glow=ctx.createRadialGradient(cx,87,8,cx,87,146);
  glow.addColorStop(0,'#ffe3a47a');glow.addColorStop(1,'#ffe3a400');ctx.fillStyle=glow;ctx.fillRect(cx-148,0,296,250);
 }
 for(let i=1;i<24;i++){
  ctx.fillStyle='#322c2828';ctx.fillRect(i*32,0,2,320);
  ctx.fillStyle='#e5dbb11e';ctx.fillRect(i*32+2,0,1,320);
 }
 const backMap=new T.CanvasTexture(c);backMap.colorSpace=T.SRGBColorSpace;textures.push(backMap);
 const lining=new T.Mesh(new T.PlaneGeometry(b.w-.3,3.2),new T.MeshStandardMaterial({map:backMap,roughness:.96}));
 lining.position.set(b.x,1.94,z(depth-.17));lining.rotation.y=sign>0?0:Math.PI;lining.receiveShadow=true;scene.add(lining);
 for(const x of [-2.3,2.3]){
  post('#555047',x,3.2,1.85,.021,.54);
  batch('cone',florist?'#7b6651':'#586462',b.x+x,2.88,z(1.85),.31,.24,.31);
  batch('ball','#ffe0a2',b.x+x,2.75,z(1.85),.21,.048,.21,0,0,true);
 }
 for(const h of [1.24,2.04]){
  part(wood,-2.15,h,depth-.4,3.7,.085,.56);
  for(const x of [-3.4,-.95])part(frame,x,h-.13,depth-.36,.045,.22,.3);
  for(let i=0;i<6;i++){
   const x=-3.52+i*.51;
   post(florist?['#a66f53','#668177','#b69b68'][i%3]:['#8f6758','#778888','#a79272'][i%3],x,h+.19,depth-.42,florist?.13:.16,.29);
   if(florist)for(let j=-1;j<=1;j++)ball('#627753',x+j*.081,h+.42,depth-.42+.045*j,.065,.16,.044,j*.42);
  }
 }
 for(let i=0;i<15;i++)part('#9d8a71',-b.w/2+.3+i*b.w/15,.303,depth/2,.016,.006,depth);
 for(const [level,over,h] of [[3.58,.23,.23],[b.h-.32,.14,.18],[b.h,.31,.25]])
  box(trim,b.x,level,b.z,b.w+over*2,h,b.d+over*2);
 for(const side of [-1,1]){
  const wing=(b.w-1.8)/2,cx=side*(.9+wing/2);
  part(frame,cx,.58,0,wing,.54,.22);
  for(const offset of [-wing/4,wing/4]){
   const mould=fittings.add(panelMoulding(wing/2-.17,.36),florist?'#45665a':'#595a5e',cx+offset,.58,-.114);
   mould.rotation.y=Math.PI;
  }
  glaze(b.x+cx,1.96,z(0),wing-.11,2.28,sign>0?0:Math.PI);
  for(const pos of [cx-wing/2,cx,cx+wing/2])part(frame,pos,1.99,-.055,.085,2.88,.15);
  part(trim,cx,.87,-.09,wing+.07,.095,.32);
  part(frame,cx,2.76,-.05,wing,.09,.15);
 }
 part(frame,0,3.26,-.05,b.w,.42,.23);
 label(b.shop,b.x,3.27,z(-.18),florist?3.45:3.7,.38,sign>0?0:Math.PI,frame,'#f0dbab');
 // The open leaf folds against the jamb and leaves the centre clear.
 part(frame,-.88,1.54,.57,.09,2.4,1.1);
 fittings.tube([[-.825,1.25,.85],[-.76,1.27,.85],[-.745,1.32,.85],[-.745,1.52,.85],[-.76,1.57,.85],[-.825,1.59,.85]],.019,'#aa8757');
 for(const y of [1.25,1.59]){
  const rose=fittings.add(new T.CylinderGeometry(.04,.048,.024,16),'#947349',-.823,y,.85,.48);
  rose.rotation.z=Math.PI/2;
 }
 const grainCanvas=document.createElement('canvas');grainCanvas.width=384;grainCanvas.height=128;
 const grain=grainCanvas.getContext('2d');grain.fillStyle=florist?'#a78662':'#a58c70';grain.fillRect(0,0,384,128);
 for(let i=0;i<380;i++){
  const yy=(i*31.3)%131;grain.beginPath();grain.moveTo(0,yy);
  grain.bezierCurveTo(80,yy+Math.sin(i)*5,197,yy+Math.cos(i*.53)*7,384,yy+Math.sin(i*.2)*4);
  grain.lineWidth=.32+i%3*.19;grain.strokeStyle=i%3?'#4e372224':'#e7c59f50';grain.stroke();
 }
 const grainMap=new T.CanvasTexture(grainCanvas);grainMap.colorSpace=T.SRGBColorSpace;grainMap.anisotropy=4;textures.push(grainMap);
 const tabletop=new T.MeshStandardMaterial({map:grainMap,roughness:.56});
 const shadeCanvas=document.createElement('canvas');shadeCanvas.width=shadeCanvas.height=64;
 const shadeCtx=shadeCanvas.getContext('2d'),fade=shadeCtx.createRadialGradient(32,32,1,32,32,31);
 fade.addColorStop(0,'rgba(44,29,16,.61)');fade.addColorStop(.38,'rgba(44,29,16,.35)');fade.addColorStop(1,'rgba(44,29,16,0)');
 shadeCtx.fillStyle=fade;shadeCtx.fillRect(0,0,64,64);
 const shadeMap=new T.CanvasTexture(shadeCanvas);shadeMap.colorSpace=T.SRGBColorSpace;textures.push(shadeMap);
 const contact=new T.MeshBasicMaterial({map:shadeMap,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1});
 const contactGeometry=new T.PlaneGeometry(1,1);
 function contactShadow(x,y,inset,w,d){
  const m=new T.Mesh(contactGeometry,contact);m.rotation.x=-Math.PI/2;m.scale.set(w,d,1);m.position.set(b.x+x,y,z(inset));scene.add(m);
 }
 for(const f of fixtures){
  part(wood,f.x,f.h/2+.15,f.inset,f.w,f.h-.30,f.d);
  const w=f.w+.08,d=f.d+.06,r=.055;
  const topShape=new T.Shape();topShape.moveTo(-w/2+r,-d/2);topShape.lineTo(w/2-r,-d/2);
  topShape.quadraticCurveTo(w/2,-d/2,w/2,-d/2+r);topShape.lineTo(w/2,d/2-r);
  topShape.quadraticCurveTo(w/2,d/2,w/2-r,d/2);topShape.lineTo(-w/2+r,d/2);
  topShape.quadraticCurveTo(-w/2,d/2,-w/2,d/2-r);topShape.lineTo(-w/2,-d/2+r);
  topShape.quadraticCurveTo(-w/2,-d/2,-w/2+r,-d/2);
  const g=new T.ExtrudeGeometry(topShape,{depth:.048,bevelSize:.012,bevelThickness:.011,bevelSegments:2,curveSegments:4});
  const uv=g.attributes.uv;for(let i=0;i<uv.count;i++)uv.setXY(i,uv.getX(i)/w+.5,uv.getY(i)/d+.5);
  g.rotateX(-Math.PI/2);const top=new T.Mesh(g,tabletop);top.position.set(b.x+f.x,f.h+.01,z(f.inset));
  top.castShadow=top.receiveShadow=true;scene.add(top);
  contactShadow(f.x,.324,f.inset,f.w*1.18,f.d*1.26);
 }
 if(florist){
  // Wrap the sage facade in dressed corner stones and a continuous string course.
  for(const side of [-1,1]){
   for(const end of [-1,1]){
    for(let row=0;row<14;row++){
     const width=row%2?.34:.51;
     box('#c9c3a7',b.x+side*(b.w-width)/2,3.94+row*.54,b.z+end*(b.d-.27)/2,width+.06,.47,.35);
    }
   }
   const rear=b.z+b.d/2+.12,x=b.x+side*(b.w/2-.22);
   cylinder('#68766b',x,b.h/2,rear,.074,b.h-.6);
   for(const h of [1.3,4.6,7.8,10.5])box(frame,x,h,rear,.2,.055,.22);
  }
  box(trim,b.x,6.94,b.z,b.w+.18,.12,b.d+.18);
  for(const x of [-2.8,0,2.8]){
   part(frame,x,4.02,-.22,1.48,.27,.4);
   for(let i=0;i<9;i++){
    const bx=x+(i-4)*.15, by=4.23+.06*Math.sin(i*2);
    ball('#526c4c',bx,by,-.24,.14,.16,.12);
    ball(i%3?'#bb7374':'#e4bf89',bx,by+.12,-.31,.067,.064,.07);
   }
  }
  // Potting supplies on the rear counter, opposite the flower display.
  for(let i=0;i<3;i++){
   const x=2+i*.44;
   part(wood,x,1.05,depth-.52,.38,1.46,.61);
   post('#c29473',x,1.88,depth-.51,.14,.19);
   post('#9f765c',x,1.98,depth-.51,.16,.055);
  }
  for(let i=0;i<13;i++)part(trim,-3.84+i*.64,b.h-.18,-.18,.21,.28,.29);
  // Raised planting beds flank the glass roof lantern.
  for(const end of [-1,1]){
   const cz=b.z+end*1.78;
   box(wood,b.x,b.h+.26,cz,5.2,.3,.55);
   for(let i=0;i<15;i++)batch('ball',i%2?'#718460':'#506e59',b.x-2.35+i*.335,b.h+.48,cz,.22,.18+i%3*.055,.19);
  }
  // The exposed return faces the waterfront. Continue the sash and sill around the corner.
  const ex=b.x-b.w/2;
  // Wall-trained climbing plant on an oak lattice, inside the width of the footing.
  for(let i=0;i<9;i++)box(wood,ex-.13,1.94,b.z-1.65+i*.4,.06,2.6,.044);
  for(let j=0;j<6;j++)box(wood,ex-.16,.81+j*.43,b.z,.06,.043,3.55);
  for(let i=0;i<90;i++){
   const y=.57+(i%30)*.079,branch=Math.floor(i/30);
   const cz=b.z-.98+branch*.97+.32*Math.sin(i*.51);
   batch('ball',i%3?'#577455':'#7d8f62',ex-.21,y,cz,.047,.124,.083,0,.27);
  }
  // Irregular stems, spear-shaped leaves and layered petals in glazed vessels.
  const leaf=botanicalBlade(.155,.029,.045);
  const petals=[botanicalBlade(.106,.046,.044),botanicalBlade(.114,.028,.017),botanicalBlade(.078,.035,.033)];
  for(let i=0;i<10;i++){
   const x=(i<5?-2.55:2.55)+(i%5-2)*.44,inset=.91+(i%2)*.25,base=i<5?.82:.78;
   const r=.13+.017*(i%3),h=.30+.03*(i%2);
   contactShadow(x,i<5?.851:.811,inset,.42,.34);
   fittings.turned(['#a7785f','#5b8880','#aa986f'][i%3],x,base,inset,
    [[.085,0],[.09,.025],[r*.94,.07],[r,.17],[r*.81,h-.055],[r*.85,h-.026],[r*.97,h-.021],[r*.99,h],[r*.78,h+.006],[r*.74,h-.031],[r*.68,h-.055]]);

   for(let j=0;j<6;j++){
    const a=j*2.4+i,dx=Math.cos(a)*.14,dz=Math.sin(a)*.13,y=base+.61+.11*Math.sin(i+j);
    const tx=x+dx,tz=inset+dz;
    const stem=fittings.add(new T.CylinderGeometry(.006,.008,1,6),'#496d45',0,0,0);
    const start=new T.Vector3(x+dx*.25,base+.24,inset+dz*.25),tip=new T.Vector3(tx,y,tz);
    stem.position.copy(start).lerp(tip,.5);stem.scale.y=start.distanceTo(tip);
    stem.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),tip.clone().sub(start).normalize());
    for(let k=0;k<2;k++){
     const frond=fittings.add(leaf,k?'#59784c':'#476b43',0,0,0);
     frond.material.side=T.DoubleSide;
     frond.position.copy(start).lerp(tip,.43+k*.26);frond.rotation.order='YXZ';
     frond.rotation.set(.73+k*.21,a+k*2.41,0,'YXZ');
    }
    const species=i%3,count=[6,10,7][species];
    for(let k=0;k<count;k++){
     const petal=fittings.add(petals[species],['#ca887f','#ddb874','#b48fac'][species],tx,y-.008,tz);
     petal.material.side=T.DoubleSide;
     petal.rotation.set(.61+species*.28+.12*Math.sin(j+k),a+k*Math.PI*2/count,0,'YXZ');
    }
    ball('#bc964d',tx,y+.008,tz,.022,.017,.022);
   }
  }
  // Curved shop canopy, segmented panes and scroll brackets cast a second line of shadow.
  const canopy=new T.Group();
  canopy.position.set(b.x,3.67,front);
  const profile=t=>new T.Vector3(0,-.32*t*t,sign*(.04+1.04*t));
  const bronze=new T.MeshStandardMaterial({color:'#806b4f',metalness:.45,roughness:.5});
  const canopyGlass=new T.MeshPhysicalMaterial({color:'#9ea88e',roughness:.2,transparent:true,opacity:.62});
  for(let k=-4;k<=4;k++){
   const x=k*.96,points=[0,.25,.5,.75,1].map(t=>profile(t).add(new T.Vector3(x,0,0)));
   const rib=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),8,.032,6,false),bronze);canopy.add(rib);
   if(k===4)continue;
   const paneGeometry=new T.PlaneGeometry(.92,1,1,14),pos=paneGeometry.attributes.position;
   for(let i=0;i<pos.count;i++){
    const p=profile(.5-pos.getY(i));
    pos.setXYZ(i,pos.getX(i)+x+.48,p.y+.012,p.z);
   }
   paneGeometry.computeVertexNormals();canopyGlass.side=T.DoubleSide;
   canopy.add(new T.Mesh(paneGeometry,canopyGlass));
  }
  for(const x of [-3.82,0,3.82]){
   const plate=new T.Mesh(new T.BoxGeometry(.145,.42,.04),bronze);
   plate.position.set(x,-.49,sign*.033);canopy.add(plate);
   for(const y of [-.65,-.32]){
    const bolt=new T.Mesh(new T.CylinderGeometry(.022,.022,.025,6),bronze);
    bolt.rotation.x=Math.PI/2;bolt.position.set(x,y,sign*.064);canopy.add(bolt);
   }
   const points=[[x,-.64,sign*.06],[x,-.61,sign*.34],[x,-.38,sign*.59],[x,-.32,sign*1.02]].map(p=>new T.Vector3(...p));
   canopy.add(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),10,.041,8,false),bronze));
  }
  canopy.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});mergeParts(canopy);scene.add(canopy);
  // Iron-and-glass conservatory lantern above the flat shop roof.
  const roof=new T.MeshPhysicalMaterial({color:'#89aca6',metalness:.28,roughness:.19,transparent:true,opacity:.65});
  for(const side of [-1,1]){
   const pitch=.58,slope=1.48,angle=side*pitch;
   const pane=new T.Mesh(new T.BoxGeometry(5.6,.055,slope),roof);
   pane.position.set(b.x,b.h+.63,b.z+side*.61);pane.rotation.x=angle;scene.add(pane);
   for(let k=-3;k<=3;k++){
    const rib=new T.Mesh(new T.BoxGeometry(.065,.09,slope+.06),skin);
    rib.position.copy(pane.position);rib.position.x+=k*.91;rib.position.y+=.05;rib.rotation.x=angle;scene.add(rib);
   }
  }
  const gable=new T.Shape();gable.moveTo(-1.22,0);gable.lineTo(1.22,0);gable.lineTo(1.22,.23);gable.lineTo(0,1.04);gable.lineTo(-1.22,.23);gable.closePath();
  for(const side of [-1,1]){
   const end=new T.Mesh(new T.ShapeGeometry(gable),roof);end.rotation.y=side*Math.PI/2;
   end.position.set(b.x+side*2.8,b.h,b.z);scene.add(end);
   box(frame,end.position.x,b.h+.5,b.z,.075,1,.065);
   box(frame,b.x,b.h+.15,b.z+side*1.22,5.73,.3,.085);
  }
  box(frame,b.x,b.h+1.075,b.z,5.83,.12,.14);
 }else{
  // Return from the raised stoop to the workshop floor inside the open doorway.
  for(let i=0;i<3;i++){
   const h=.32+.13*(3-i);part(trim,0,h/2,.22+i*.44,1.8,h,.44);
  }
  for(let i=0;i<10;i++){
   const x=.56+i*.25,h=1.32+.16*Math.cos(i*.7);
   const cut=new T.PlaneGeometry(.31,h,10,10),p=cut.attributes.position;
   for(let v=0;v<p.count;v++){
    const u=p.getX(v)/.31+.5,t=p.getY(v)/h+.5,fold=Math.cos(u*10+i);
    p.setXYZ(v,(u-.5)*(.30-.08*t),p.getY(v)-.033*fold*(1-t),.034*fold+.021*Math.sin(t*3));
   }
   cut.computeVertexNormals();
   const textile=fittings.add(cut,['#a26c60','#6d8184','#b29b76','#626a66'][i%4],x,2.31-h/2,depth-.64);
   textile.material.side=T.DoubleSide;
   fittings.tube([[x-.135,2.30,depth-.62],[x,2.41,depth-.62],[x+.135,2.30,depth-.62]],.012,'#9e8060');
   fittings.tube([[x,2.40,depth-.62],[x,2.49,depth-.62],[x+.025,2.54,depth-.62],[x+.045,2.51,depth-.62]],.009,'#978f7c');
  }
  part('#9f8968',1.75,2.54,depth-.6,3.35,.05,.05);
  // Full-size dress forms with neck blocks, waists, hips and weighted stands.
  for(const [i,x] of [-3.19,-2.12].entries()){
   const cloth=i?'#617681':'#a76d59';
   post('#474544',x,.51,1,.24,.085);post('#b49b71',x,.94,1,.027,.83);
   fittings.turned(cloth,x,1.03,1,[[.17,0],[.21,.03],[.245,.16],[.23,.29],[.178,.43],[.164,.50],[.19,.60],[.248,.73],[.265,.80],[.255,.84],[.18,.9],[.081,.95],[.068,1.02]],0,.71);
   for(const side of [-1,1]){
    const points=[[.13,.10,.145],[.12,.26,.138],[.09,.46,.105],[.13,.66,.125],[.17,.78,.144],[.14,.87,.137],[.064,.95,.062]].map(([dx,dy,dz])=>[x+side*dx,1.03+dy,1-dz]);
    fittings.tube(points,.0037,i?'#8b999b':'#c39782');
   }
   fittings.turned('#a17e5d',x,2.05,1,[[.063,0],[.08,.014],[.081,.038],[.052,.06],[.032,.081],[0,.083]]);

  }
  part('#343d3c',2.42,1.23,2.25,.78,.09,.42);
  const casing=new T.Shape();
  casing.moveTo(.14,0);casing.lineTo(.32,0);casing.quadraticCurveTo(.40,.01,.39,.11);
  casing.lineTo(.35,.40);casing.quadraticCurveTo(.33,.49,.19,.5);casing.lineTo(-.29,.5);
  casing.quadraticCurveTo(-.40,.49,-.39,.38);casing.lineTo(-.37,.24);casing.lineTo(-.27,.24);
  casing.lineTo(-.24,.32);casing.quadraticCurveTo(-.2,.36,-.11,.35);casing.lineTo(.06,.33);
  casing.quadraticCurveTo(.17,.29,.14,.18);casing.closePath();
  fittings.cast(casing,.16,'#374d48',2.43,1.25,2.16,.028);
  post('#b9b4a8',2.11,1.419,2.25,.012,.165);
  const wheel=new T.Mesh(new T.TorusGeometry(.165,.035,8,18),new T.MeshStandardMaterial({color:'#9d9480',metalness:.5,roughness:.4}));
  wheel.rotation.y=Math.PI/2;wheel.position.set(b.x+2.83,1.57,z(2.25));wheel.castShadow=true;scene.add(wheel);
  post('#ab8770',2.53,1.83,2.27,.053,.18);
  for(let j=0;j<8;j++)part('#d9cebb',1.47+j*.15,1.154,1.72,.012,.012,j%2?.08:.14);
  // Continuous cloth follows the tabletop, rounds its edge and hangs in folds.
  const clothGeo=new T.PlaneGeometry(.64,1,22,28),v=clothGeo.attributes.position;
  for(let i=0;i<v.count;i++){
   const x=v.getX(i),t=.5-v.getY(i),bend=Math.max(0,t-.52);
   const fold=Math.sin(x*30+.7)*.029*Math.min(1,bend*6);
   const drop=bend<.09?.09*(1-Math.cos(bend/.09*Math.PI/2)):.09+(bend-.09);
   const inset=2.20-Math.min(.52,t)-.09*Math.sin(Math.min(1,bend/.09)*Math.PI/2);
   v.setXYZ(i,x,1.154-drop+fold*.25,inset+fold);
  }
  clothGeo.computeVertexNormals();
  const cloth=fittings.add(clothGeo,'#995f57',2.02,0,0);cloth.material.side=T.DoubleSide;
  for(let i=0;i<7;i++)post(['#9d6e61','#827b67','#57737d'][i%3],-2.7+i*.56,1.4,depth-.42,.19,1.4+(i%3)*.2);
 }
 fittings.finish();
}
