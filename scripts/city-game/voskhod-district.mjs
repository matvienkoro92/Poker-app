import {alleyBenchStations} from './pimenov-plan.mjs';
import * as T from '../../vendor/three/three.module.min.js';
import {districtBlocks,districtRoads,westRoads,flotiliyaPodium} from './voskhod-survey.mjs';

export function buildVoskhodDistrict({scene,box,cylinder,label,outdoors}){
 outdoors.paving(77,-177,98,156,.014);
 // Continue the existing Kirova approach to the mapped northern street network.
 outdoors.asphalt(72,-155.2,5.2,107.8,.052);
 outdoors.asphalt(96,-84,50,3.65,.052);
 outdoors.asphalt(94.4,-72.5,3.1,23,.054);
 // OSM 374962306, open parking area opposite the Moscow Street side.
 const parking=[[92.41,-78.42],[83.43,-78.62],[83.21,-89.16],[80.2,-89.06],[79.97,-78.56],[80.07,-65.95],[80.09,-62.85],[92.76,-62.72],[92.71,-65.06]];
 const lot=new T.Shape(parking.map(([x,z])=>new T.Vector2(x,-z)));
 const surface=new T.Mesh(new T.ShapeGeometry(lot),new T.MeshStandardMaterial({color:'#666867',roughness:.95}));
 surface.rotation.x=-Math.PI/2;surface.position.y=.075;surface.receiveShadow=true;scene.add(surface);
 outdoors.asphalt(92.7,-65.1,3.6,2.6,.08);
 for(const x of [81.7,90.8]){
  for(let i=0;i<=5;i++)box('#dad7c8',x,.092,-77.4+i*2.1,2.87,.016,.065);
 }
 for(const [x,z,color] of [[81.7,-74.25,'#858c91'],[90.8,-72.15,'#5c7281'],[81.7,-67.95,'#a39888']]){
  box(color,x,.44,z,2.68,.55,1.36);
  box('#414d52',x-.08,.87,z,1.42,.38,1.16);
  for(const side of [-1,1])for(const axle of [-.84,.84])
   box('#353839',x+axle,.27,z+side*.62,.41,.4,.16);
 }
 outdoors.paving(106.1,-81.47,22.5,1.44,.112);
 for(let z=-202;z<=-102;z+=5)box('#e4ddc9',72,.06,z,.09,.01,1.7);
 outdoors.paving(-115,44,55,62,.018);
 for(const [a,b,width] of [...districtRoads,...westRoads]){
  const dx=b[0]-a[0],dz=b[1]-a[1],length=Math.hypot(dx,dz);
  box('#5d6263',(a[0]+b[0])/2,.047,(a[1]+b[1])/2,width,.04,length+.12,Math.atan2(dx,dz));
  if(width<4)continue;
  for(let s=3;s<length-2;s+=5)
   box('#d9d3c2',a[0]+dx*s/length,.073,a[1]+dz*s/length,.09,.012,1.65,Math.atan2(dx,dz));
 }
 const podiumShape=new T.Shape(flotiliyaPodium.map(([x,z])=>new T.Vector2(x,-z)));
 const podiumGeometry=new T.ExtrudeGeometry(podiumShape,{depth:.54,bevelEnabled:false});
 podiumGeometry.rotateX(-Math.PI/2);
 const podium=new T.Mesh(podiumGeometry,new T.MeshStandardMaterial({color:'#aaa69c'}));
 podium.receiveShadow=true;scene.add(podium);
 for(const [name,ring,h] of districtBlocks){
  const tower=name.startsWith('Адмирал'),coffee=name.includes('Chicago');
  const shape=new T.Shape(ring.map(([x,z])=>new T.Vector2(x,-z)));
  const geometry=new T.ExtrudeGeometry(shape,{depth:h,bevelEnabled:false});
  geometry.rotateX(-Math.PI/2);
  const facade=new T.Mesh(geometry,new T.MeshStandardMaterial({color:tower?'#628a9b':coffee?'#9fb7ad':'#bcaf99',roughness:.78}));
  facade.castShadow=facade.receiveShadow=true;scene.add(facade);
  for(let i=1;i<ring.length;i++){
   const [x,z]=ring[i-1],[ex,ez]=ring[i],dx=ex-x,dz=ez-z,len=Math.hypot(dx,dz);
   if(len<.5)continue;
   const yaw=Math.atan2(dx,dz);
   if(name==='27' && len>2){
    const floors=9,bays=Math.max(1,Math.round(len/1.5));
    for(let floor=0;floor<floors;floor++){
     const y=(floor+.54)*h/floors;
     for(let bay=0;bay<bays;bay++){
      const t=(bay+.5)/bays,cx=x+dx*t,cz=z+dz*t;
      const width=len/bays*.64;
      box('#d3c7b5',cx,y,cz,.14,.54,width+.10,yaw);
      box((bay+floor)%5===0?'#a8a496':'#576a70',cx,y,cz,.17,.43,width,yaw);
      box('#c8bba7',cx,y,cz,.19,.45,.045,yaw);
      box('#cbbca7',cx,y-.26,cz,.22,.055,width+.16,yaw);
     }
    }
    continue;
   }
   for(let y=1.55;y<h-.55;y+=tower?h/25:2.25){
    box(tower?'#486e83':'#516467',x+dx/2,y,z+dz/2,.105,.58,len*.88,yaw);
   }
  }
  if(tower){
   for(let i=1;i<ring.length;i++){
    const [ax,az]=ring[i-1],[bx,bz]=ring[i],len=Math.hypot(bx-ax,bz-az);
    if(len<.2)continue;
    const angle=Math.atan2(bx-ax,bz-az);
    box('#d3d6d1',(ax+bx)/2,h-.22,(az+bz)/2,.15,.35,len,angle);
    box('#94a9ae',ax,h/2,az,.085,h,.085);
   }
  }
  if(coffee){
   // The shop pin falls on the north frontage of Moskovskaya, 77.
   const front=-80.84,door=115.64;
   outdoors.paving(108.05,-81.33,19.2,1.72,.115);
   box('#414344',108,1.87,-80.60,18.7,3.52,.23);
   const glass=new T.MeshPhysicalMaterial({color:'#a6c2c2',roughness:.14,transparent:true,opacity:.25,depthWrite:false,side:T.DoubleSide});
   for(const x of [99.65,102.85,106.05,109.25,112.45,door]){
    box('#ede9df',x-1.58,1.91,front,.93,3.65,.39);
    for(const y of [1.19,2.32])box('#c9c7c2',x-1.58,y,front-.20,.9,.018,.012);
    box('#997f63',x,1.8,-80.73,2.18,3.12,.035);
    const pane=new T.Mesh(new T.PlaneGeometry(2.16,3.16),glass);
    pane.position.set(x,1.8,front-.16);scene.add(pane);
    for(const side of [-1,1])box('#323638',x+side*1.10,1.81,front-.13,.075,3.34,.14);
    for(const y of [.22,2.2,3.42])box('#373b3d',x,y,front-.15,2.2,.085,.14);
   }
   box('#e9e6dd',117.09,1.91,front,.66,3.65,.40);
   box('#34383b',117.48,1.85,-73.05,.20,3.45,14.7);
   for(let z=-80.1;z<-66;z+=2.7)box('#e9e5da',117.63,1.86,z,.35,3.6,.85);
   box('#323434',door,2.83,front-.43,2.67,.59,.88);
   // Individual pale letters on the canopy, with a transparent background.
   const canvas=document.createElement('canvas');canvas.width=768;canvas.height=180;
   const ctx=canvas.getContext('2d');ctx.font='bold 144px Georgia';ctx.fillStyle='#fbf6ec';ctx.textAlign='center';ctx.fillText('Кремс',384,141);
   const map=new T.CanvasTexture(canvas);map.colorSpace=T.SRGBColorSpace;
   const lettering=new T.Mesh(new T.PlaneGeometry(2.27,.54),new T.MeshStandardMaterial({map,transparent:true,depthWrite:false}));
   lettering.material.addEventListener('dispose',()=>map.dispose());
   lettering.position.set(door,2.85,front-.88);lettering.rotation.y=Math.PI;scene.add(lettering);
   box('#343535',door,1.17,front-.18,.065,2.0,.14);
   box('#c1b4a0',door-.15,1.14,front-.28,.038,.43,.04);
   box('#524535',112.45,.54,front-.1,.6,.67,.19);
   for(let i=-3;i<=3;i++){
    box('#cab38b',112.45+i*.068,1.08,front-.12,.034,.7-Math.abs(i)*.09,.055);
   }
   for(const x of [110,113.1])cylinder('#e8e3cb',x,2.08,front-.08,.17,.14);
  }
 }
 // A verge separates Kirova from the long frontage of house 27.
 outdoors.lawnRect(90,16,11,14,.19);
 outdoors.paving(90.3,15.2,15.7,1.55,.215);
 outdoors.paving(97.05,14.2,1.4,9.6,.14);
 const doorX=98.15;
 box('#4b514e',doorX-.13,1.12,15.2,.22,2.12,1.48);
 box('#798c8b',doorX-.26,1.48,15.2,.07,.88,1.16);
 box('#b5ae9c',doorX-.33,1.04,15.69,.085,.36,.05);
 box('#766b59',doorX-.47,2.32,15.2,1.36,.15,2.18);
 box('#555951',doorX-.26,1.28,16.08,.09,.29,.17);
 box('#d8cdb1',doorX-.32,1.33,16.08,.025,.06,.10);
 box('#e4cda4',doorX-.24,2.10,14.27,.15,.15,.31);
 for(const z of [8.1,18.7]){
  const wallX=97.73+(z-2.33)*.035;
  cylinder('#847e70',wallX-.16,3.79,z,.07,7.1);
  for(const y of [1.35,3.6,5.85])box('#675f56',wallX-.11,y,z,.22,.055,.18);
 }
 for(const z of [5.2,10.0,19.7]){
  const wallX=97.73+(z-2.33)*.035;
  for(const y of [2.15,3.81,5.47]){
   box('#b8ac97',wallX-.32,y,z,.72,.11,1.72);
   box('#65695d',wallX-.65,y+.41,z,.05,.063,1.64);
   for(const side of [-1,1])box('#666b60',wallX-.34,y+.41,z+side*.8,.66,.06,.045);
   for(let j=-3;j<=3;j++)box('#687068',wallX-.65,y+.22,z+j*.25,.04,.41,.038);
  }
 }
 label('КИРОВА  27',doorX-.22,2.11,16.95,1.38,.38,-Math.PI/2,'#344c61','#ede6cf');
 outdoors.asphalt(100.1,24.15,12,2.15,.10);
 for(const z of [11,18,22])outdoors.tree(89,z,4.5);
 // The west arm crosses Yakusheva and ends at Zyryanovskaya.
 for(const [left,right] of [[-120,-99],[-92,-68],[-60,-5],[4,12]]){
  const mid=(left+right)/2;
  outdoors.lawnRect(mid,42.65,right-left,4.2,.16);
  outdoors.paving(mid,42.65,right-left,1.6,.175);
  for(let px=left+2;px<right-1;px+=5.7){
   outdoors.tree(px,41.25,4.9);outdoors.tree(px+.7,44.15,5.3);
  }
 }
 // Nizhegorodskaya cuts both carriageways and the pedestrian island.
 outdoors.asphalt(15.04,35,3.7,70,.2);
 for(const z of [39.1,47.35]){
  for(let x=6;x<67;x+=3.3)if(Math.abs(x-15)>5)
   box('#eee4cd',x,.19,z,1.55,.013,.085);
  for(const x of [11.7,18.4]){
   for(let j=-3;j<=3;j++)box('#f1e8d6',x,.239,z+j*.52,1.05,.014,.28);
  }
 }
 for(const [x,z,dx,dz] of [[10.35,49.63,-1,0],[19.75,36.84,1,0],[12.85,34.45,0,-1],[17.25,52,0,1]]){
  cylinder('#484b48',x,1.45,z,.06,2.8);
  box('#303533',x,2.61,z,.28,.75,.28);
  for(const [i,color] of ['#be655e','#b59a62','#738c70'].entries()){
   box(color,x+.15*dx,2.82-i*.21,z+.15*dz,dx?.026:.15,.15,dz?.026:.15);
  }
 }
 for(const [x,z] of [[10.35,47.35],[19.75,39.1]]){
  box('#eee7d6',x,.238,z,.14,.014,4.05);
 }
 for(const z of [35.9,50.55]){
  for(let j=-2;j<=2;j++)box('#eee7d6',15+j*.64,.24,z,.34,.014,.95);
  const side=z<43?-1:1;
  box('#eee7d6',15+side*.89,.24,z+side*1.4,1.66,.014,.14);
 }
 for(const x of alleyBenchStations){
  for(const z of [42.25,44.15]){
   const back=z<43?-1:1;
   for(const offset of [-.15,0,.15])box('#886e51',x,.65,z+offset,1.5,.095,.12);
   for(const y of [.85,1.02])box('#957856',x,y,z+back*.22,1.5,.10,.065);
   for(const dx of [-.52,.52])box('#474c48',x+dx,.80,z+back*.21,.045,.55,.05);
   for(const dx of [-.52,.52])box('#525550',x+dx,.37,z,.085,.47,.27);
  }
  cylinder('#484d46',x+2,1.56,42.05,.06,2.78);
  cylinder('#f0dfb5',x+2,3.05,42.05,.18,.32);
  cylinder('#434a44',x+2,3.25,42.05,.22,.07);
  cylinder('#434a44',x+2,.40,42.05,.15,.49);
  cylinder('#555e51',x+1.13,.48,42.12,.16,.53);
  cylinder('#303b35',x+1.13,.75,42.12,.125,.025);
 }
 for(const z of [41.8,44.65]){
  box('#a58478',61,.66,z,.83,.99,.75);
  const finial=new T.Mesh(new T.SphereGeometry(.26,12,8),new T.MeshStandardMaterial({color:'#bd9d88'}));
  finial.position.set(61,1.36,z);scene.add(finial);
  label('АЛЛЕЯ БЛОКАДНИКОВ',61.43,.73,z,.72,.35,Math.PI/2,'#74584f','#e0c8a7');
 }
 cylinder('#966c65',56.5,1.88,43.2,.19,3.2);
 box('#a58279',56.5,.38,43.2,.82,.57,.82);
 box('#baa16f',56.5,3.59,43.2,.63,.16,.2);
 cylinder('#bca174',56.5,3.87,43.2,.018,.48);
 const sailShape=new T.Shape();
 sailShape.moveTo(0,0);sailShape.lineTo(.25,.03);sailShape.lineTo(0,.39);sailShape.closePath();
 const sail=new T.Mesh(new T.ShapeGeometry(sailShape),new T.MeshStandardMaterial({color:'#c5ae7a',side:T.DoubleSide}));
 sail.rotation.y=.4;sail.position.set(56.51,3.67,43.2);scene.add(sail);
}
