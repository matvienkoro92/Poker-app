import {buildVoskhodLampPools,streetRibbon,weatheredMaterial} from './voskhod-materials.mjs';
import {buildBahetleFront,createStorefrontReflection} from './bahetle-facade.mjs';
import {buildKremsStreetDetails,buildKremsWindowRoom} from './krems-details.mjs';
import {alleyBenchStations} from './pimenov-plan.mjs';
import * as T from '../../vendor/three/three.module.min.js';
import {districtBlocks,districtRoads,westRoads,flotiliyaPodium} from './voskhod-survey.mjs';

import {chicagoCourtyard,chicagoTowers,kremsDriveways,kremsEntrance,kremsGround,kremsNeighbours,kremsParkedCars,kremsParkedCarSize,kremsParking,kremsStreets,kremsWalks} from './krems-plan.mjs';

function surveyShape(ring){
 return new T.Shape(ring.map(([x,z])=>new T.Vector2(x,-z)));
}

function dressParking({box,cylinder,label}){
 // Individual bays on the edge of the open lot, with the mapped aisles left open.
 const paint='#ded6bf';
 for(const [left,right,start,count] of [[80.20,81.28,-76.7,5],[83.64,84.82,-76.8,5],[90.58,92.46,-77.12,5]]){
  for(let i=0;i<=count;i++){
   box(paint,(left+right)/2,.071,start+i*1.92,right-left,.012,.054);
  }
 }
 for(const [x,z] of [[80.46,-72.3],[84.09,-74.6],[92.28,-74.2],[92.43,-69.75]]){
  box('#928c7f',x,.082,z,.10,.055,1.36);
  for(const end of [-.43,.43])box('#d0b376',x,.115,z+end,.105,.011,.16);
 }
 for(const [x,z,angle] of [[82.3,-65.69,-Math.PI/2],[90.6,-65.28,Math.PI/2]]){
  box(paint,x,.090,z,.065,.009,.52,angle);
  for(const side of [-1,1]){
   const dx=side*.129,dz=.22;
   box(paint,x+Math.cos(angle)*dx+Math.sin(angle)*dz,.09,z-Math.sin(angle)*dx+Math.cos(angle)*dz,.054,.009,.30,angle-side*.68);
  }
 }
 for(const [x,z,yaw] of [[81.16,-62.99,Math.PI],[92.57,-62.95,Math.PI]]){
  cylinder('#505754',x,.72,z,.033,1.39);
  label('P',x,1.44,z,.29,.31,yaw,'#2f5282','#f9ead0');
 }
}

function dressChicagoCourt({outdoors,box,cylinder}){
 // Details are on the podium terrace, inside the traced courtyard boundary.
 for(const [x,z,w,d] of [[106.55,-72.05,4.5,3.5],[104.77,-64.4,2.8,3.2],[110.05,-63.2,2.7,2.0]]){
  outdoors.lawnRect(x,z,w,d,2.064);
  for(const offset of [-1,1]){
   box('#b1a69b',x+offset*w/2,2.103,z,.10,.11,d);
   box('#b1a69b',x,2.103,z+offset*d/2,w,.11,.10);
  }
  for(const side of [-1,1])outdoors.shrub(x+side*w*.27,z,.55,2.06);
 }
 outdoors.paving(108.88,-68.7,1.16,13.8,2.077);
 outdoors.paving(106.1,-68.8,5.02,1.05,2.077);
 for(const [x,z] of [[106.7,-69.55],[109.83,-69.65],[104.90,-62.11]]){
  for(const dx of [-.40,.40])box('#6d706b',x+dx,2.22,z,.085,.25,.41);
  for(const dz of [-.12,0,.12])box('#a58264',x,2.36,z+dz,1.06,.055,.10);
  box('#9b7558',x,2.56,z+.17,1.06,.28,.063);
 }
 for(const [x,z] of [[109.65,-72.4],[107.88,-66.1],[110.38,-61.1]]){
  cylinder('#616c64',x,2.79,z,.030,1.44);
  cylinder('#ded5bb',x,3.52,z,.082,.17);
 }
}

function buildKremsStreets({scene,box,outdoors}){
 const {minX,maxX,minZ,maxZ}=kremsGround;
 outdoors.paving((minX+maxX)/2,(minZ+maxZ)/2,maxX-minX,maxZ-minZ,.016);
 const street=weatheredMaterial(outdoors.asphaltMap,'#b9bfbc',.43,.021);
 const parking=weatheredMaterial(outdoors.asphaltMap,'#aeb3aa',.55,.016);
 const flagstone=weatheredMaterial(outdoors.stoneMap,'#e1d9c6',.41,.017);
 function strip(points,width,y,color,drivewayZ=[],material=null){
  for(let i=1;i<points.length;i++){
   const [ax,az]=points[i-1],[bx,bz]=points[i];
   const dx=bx-ax,dz=bz-az,angle=Math.atan2(dx,dz),length=Math.hypot(dx,dz);
   let spans=[[0,1]];
   for(const z of drivewayZ){
    if(!dz)continue;
    const cut=[(z-1.64-az)/dz,(z+1.64-az)/dz].sort((a,b)=>a-b);
    spans=spans.flatMap(([start,end])=>[[start,Math.min(end,cut[0])],[Math.max(start,cut[1]),end]].filter(([a,b])=>b>a));
   }
   for(const [start,end] of spans){
    const mid=(start+end)/2;
    const span=length*(end-start)+.12;
    if(!material){
     box(color,ax+dx*mid,y,az+dz*mid,width,.028,span,angle);
     continue;
    }
    const geometry=new T.PlaneGeometry(width,span);
    geometry.rotateX(-Math.PI/2);
    geometry.rotateY(angle);
    geometry.translate(ax+dx*mid,y+.015,az+dz*mid);
    const positions=geometry.getAttribute('position'),uv=geometry.getAttribute('uv');
    for(let vertex=0;vertex<positions.count;vertex++){
     uv.setXY(vertex,positions.getX(vertex),-positions.getZ(vertex));
    }
    const mesh=new T.Mesh(geometry,material);
    mesh.receiveShadow=true;
    scene.add(mesh);
   }
  }
 }
 for(const ring of kremsParking){
  const mesh=new T.Mesh(new T.ShapeGeometry(surveyShape(ring)),parking);
  mesh.rotation.x=-Math.PI/2;
  mesh.position.y=.058;
  mesh.receiveShadow=true;
  scene.add(mesh);
 }
 for(const [index,[points,width]] of kremsDriveways.entries()){
  const internalParkingAisle=index>=2&&index<=7;
  strip(points,width,.068,'#6c6e6e',[],internalParkingAisle?parking:street);
 }
 for(const [points,width] of kremsStreets)strip(points,width,.079,'#575e61',[],street);
 for(const [index,[points,width,crossing]] of kremsWalks.entries()){
  if(!crossing){
   const drivewayZ=index===0?[-108.66,-66.06,-59.03]:index===7?[-65.11,-58.88]:[];
   strip(points,width+.14,.093,'#aaa397',drivewayZ);
   strip(points,width,.107,'#beb5a5',drivewayZ,flagstone);
   continue;
  }
  const [ax,az]=points[0],[bx,bz]=points.at(-1);
  const length=Math.hypot(bx-ax,bz-az),angle=Math.atan2(bx-ax,bz-az);
  for(let d=.33;d<length;d+=.53)
   box('#ece5d7',ax+(bx-ax)*d/length,.103,az+(bz-az)*d/length,.83,.012,.24,angle);
 }
 // Forecourt between the mapped public sidewalk and the commercial frontage.
 outdoors.paving(108,-81.45,18.7,2.02,.116);
 // Individual curb blocks along Makovskogo, stopping before the corner crossings.
 for(const [offset,zStart,slope] of [[0,-83.31,-.0103],[1,-84.39,-.0132]]){
  for(let x=97.14;x<=120.28;x+=.73){
   const z=zStart+(x-96)*slope;
   const tint=['#c2b9aa','#b2ac9e','#c9c1b0'][(Math.round(x/.73)+offset)%3];
   box(tint,x,.111,z,.704,.064,.115);
  }
 }
 for(const [x,z,color] of kremsParkedCars){
  const {w,d}=kremsParkedCarSize;
  box(color,x,.4,z,w,.56,d);
  box('#35464b',x,.79,z-.09,1.13,.27,1.30);
  box(color,x,.943,z-.11,.98,.074,1.06);
  box(color,x,.773,z-.08,1.15,.049,1.22);
  box('#252b2d',x,.265,z+d*.5,.93,.115,.059);
  box('#303739',x,.278,z-d*.5,.96,.13,.054);
  for(const side of [-1,1]){
   box('#e2dcc7',x+side*.415,.441,z+d*.5+.009,.228,.100,.028);
   box('#ad6153',x+side*.425,.443,z-d*.5-.009,.234,.092,.027);
   box('#7d877f',x+side*.656,.391,z-.12,.016,.033,1.09);
  }
  box('#dbd8c9',x,.301,z-d*.5-.032,.223,.058,.017);
  for(const side of [-1,1])for(const axle of [-.77,.77])
   box('#353839',x+side*.56,.25,z+axle,.18,.34,.36);
 }
 for(const [x,z] of kremsParkedCars){
  for(const offset of [-1.39,1.39])
   box('#ddd8c8',x,.074,z+offset,1.66,.012,.045);
 }
}

export function buildVoskhodDistrict({scene,box,cylinder,label,outdoors}){
 outdoors.paving(77,-177,98,156,.014);
 // Continue the existing Kirova approach to the mapped northern street network.
 outdoors.asphalt(72,-155.2,5.2,107.8,.052);
 buildKremsStreets({scene,box,outdoors});
 dressParking({box,cylinder,label});
 buildVoskhodLampPools(scene);
 buildKremsStreetDetails({box,cylinder});
 for(let z=-202;z<=-102;z+=5)box('#e4ddc9',72,.06,z,.09,.01,1.7);
 outdoors.paving(-115,44,55,62,.018);
 const network=[...districtRoads,...westRoads];
 streetRibbon(scene,network,weatheredMaterial(outdoors.asphaltMap,'#c8ccca',.42,.026),.068);
 const alleyStone=weatheredMaterial(outdoors.stoneMap,'#e7ddc6',.46,.015);
 const westernPaths=[];
 for(const [left,right] of [[-120,-99],[-92,-68],[-60,-5],[4,12],[19,60]]){
  westernPaths.push([[left,42.65],[right,42.65],1.48]);
 }
 streetRibbon(scene,westernPaths,alleyStone,.192);
 const facadeMaterials=new Map();
 function masonry(color){
  if(!facadeMaterials.has(color))facadeMaterials.set(color,weatheredMaterial(outdoors.facadeMap,color,.54,.037));
  return facadeMaterials.get(color);
 }
 for(const [a,b,width] of [...districtRoads,...westRoads]){
  const dx=b[0]-a[0],dz=b[1]-a[1],length=Math.hypot(dx,dz);
  if(width<4)continue;
  for(let s=3;s<length-2;s+=5)
   box('#d9d3c2',a[0]+dx*s/length,.073,a[1]+dz*s/length,.09,.012,1.65,Math.atan2(dx,dz));
 }
 const podiumShape=new T.Shape(flotiliyaPodium.map(([x,z])=>new T.Vector2(x,-z)));
 const podiumGeometry=new T.ExtrudeGeometry(podiumShape,{depth:.54,bevelEnabled:false});
 podiumGeometry.rotateX(-Math.PI/2);
 const podium=new T.Mesh(podiumGeometry,masonry('#d1cabc'));
 podium.receiveShadow=true;scene.add(podium);
 for(const [name,ring,h] of [...districtBlocks,...kremsNeighbours]){
  const tower=name.startsWith('Адмирал'),coffee=name.includes('Chicago'),crown=name==='ЖК Корона',gallery=name==='Галерея №1';
  // Open the café bays in the podium mesh so the glass looks into a room.
  const facadeRing=coffee?[
   ...ring.slice(0,3),[108.06,-80.49],[108.06,-78.01],
   [117.24,-78.01],[117.24,-80.44],...ring.slice(3)
  ]:gallery?ring.map(([x,z])=>[x<82?82.36:x,z]):ring;
  const shape=surveyShape(facadeRing);
  const facadeHeight=coffee?2.05:h;
  if(coffee)shape.holes.push(surveyShape(chicagoCourtyard));
  const geometry=new T.ExtrudeGeometry(shape,{depth:facadeHeight,bevelEnabled:false});
  geometry.rotateX(-Math.PI/2);
  const facade=new T.Mesh(geometry,masonry(tower?'#7ca0ab':coffee?'#c9cec2':crown?'#c59477':gallery?'#ded1bf':'#d7ccb8'));
  facade.castShadow=facade.receiveShadow=true;scene.add(facade);
  for(let i=1;i<ring.length;i++){
   const [x,z]=ring[i-1],[ex,ez]=ring[i],dx=ex-x,dz=ez-z,len=Math.hypot(dx,dz);
   if(len<.5||coffee||gallery)continue;
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
   if(crown){
    const bays=Math.max(1,Math.round(len/1.62));
    for(let bay=0;bay<bays;bay++){
     const t=(bay+.5)/bays,cx=x+dx*t,cz=z+dz*t;
     for(let y=2.58;y<h-.48;y+=.88){
      const width=len/bays*.71;
      box('#ba9b86',cx,y,cz,.14,.63,width+.08,yaw);
      box('#3d535d',cx,y+.028,cz,.175,.48,width,yaw);
      box((bay+Math.round(y))%5===0?'#9b9180':'#749098',cx,y+.064,cz,.184,.325,width*.86,yaw);
      box('#a7998b',cx,y+.031,cz,.181,.48,.043,yaw);
      box('#c2a996',cx,y-.30,cz,.22,.052,width+.12,yaw);
     }
    }
   }else{
    const bays=Math.max(1,Math.round(len/(tower?1.12:1.95)));
    for(let floor=0,y=tower?.72:1.55;y<h-.4;y+=tower?h/25:2.25,floor++){
     for(let bay=0;bay<bays;bay++){
      const t=(bay+.5)/bays,cx=x+dx*t,cz=z+dz*t;
      const w=len/bays*(tower?.79:.64);
      box(tower?'#66838b':'#928d81',cx,y,cz,.125,.62,w+.08,yaw);
      box((bay+floor)%9===1?'#a3987d':tower?'#456775':'#536b72',cx,y+.014,cz,.148,.49,w,yaw);
      box('#8b9b96',cx,y+.02,cz,.156,.46,.031,yaw);
      box(tower?'#6d8a8e':'#bfb5a4',cx,y-.31,cz,.198,.05,w+.12,yaw);
     }
    }
   }
  }
  if(gallery)buildBahetleFront({scene,box,cylinder,label,outdoors});
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
   const court=new T.Mesh(new T.ShapeGeometry(surveyShape(chicagoCourtyard)),new T.MeshStandardMaterial({color:'#899375',roughness:.93}));
   court.rotation.x=-Math.PI/2;
   court.position.y=2.03;
   court.receiveShadow=true;
   scene.add(court);
   dressChicagoCourt({outdoors,box,cylinder});
   for(const footprint of chicagoTowers){
    const towerGeometry=new T.ExtrudeGeometry(surveyShape(footprint),{depth:h-2.05,bevelEnabled:false});
    towerGeometry.rotateX(-Math.PI/2);
    const mass=new T.Mesh(towerGeometry,masonry('#d6cec0'));
    mass.position.y=2.05;
    mass.receiveShadow=mass.castShadow=true;
    scene.add(mass);
    for(let i=1;i<footprint.length;i++){
     const [a,b]=footprint.slice(i-1,i+1),dx=b[0]-a[0],dz=b[1]-a[1];
     const length=Math.hypot(dx,dz),yaw=Math.atan2(dx,dz),bays=Math.ceil(length/1.08);
     for(let bay=0;bay<bays;bay++){
      const t=(bay+.5)/bays,x=a[0]+dx*t,z=a[1]+dz*t;
      for(let floor=0;floor<28;floor++){
       const y=2.5+floor*.86,width=length/bays*.68;
       box('#a39c90',x,y,z,.13,.64,width+.083,yaw);
       box((bay+floor)%8===2?'#a89b81':floor%7===6?'#718a93':'#4e6e7b',x,y+.016,z,.151,.50,width,yaw);
       box('#94a2a2',x,y+.017,z,.165,.49,.029,yaw);
       box('#b4aa9b',x,y-.31,z,.181,.043,width+.10,yaw);
     }
     }
    }
   }
   const {frontZ:front,x:door}=kremsEntrance;
   box('#414344',103.24,1.14,front+.012,9.25,2.06,.23);
   buildKremsWindowRoom({scene,box,cylinder},kremsEntrance);
   const facadeY=y=>.116+(y-.116)*.55;
   const reflection=createStorefrontReflection();
   const glass=new T.MeshPhysicalMaterial({map:reflection,color:'#c6dad4',roughness:.19,transparent:true,opacity:.42,depthWrite:false,side:T.DoubleSide,clearcoat:.65});
   glass.addEventListener('dispose',()=>reflection.dispose());
   for(const x of [99.65,102.85,106.05,109.25,112.45,door]){
    box('#ede9df',x-1.58,facadeY(1.91),front,.93,2.0,.39);
    for(const y of [1.19,2.32])box('#c9c7c2',x-1.58,facadeY(y),front-.20,.9,.018,.012);
    if(x<108)box('#997f63',x,facadeY(1.8),front-.115,2.18,1.72,.035);
    const pane=new T.Mesh(new T.PlaneGeometry(2.16,1.74),glass);
    pane.position.set(x,facadeY(1.8),front-.115);scene.add(pane);
    box('#c6b9a6',x,.184,front-.195,2.27,.063,.35);
    box('#999187',x,2.055,front-.154,2.24,.075,.28);
    for(const side of [-1,1]){
     box('#aaa396',x+side*1.10,1.06,front-.145,.074,1.77,.23);
    }
    if(x!==door)box('#464746',x,facadeY(1.8),front-.162,.043,1.79,.10);
    for(const side of [-1,1])box('#323638',x+side*1.10,facadeY(1.81),front-.13,.075,1.84,.14);
    for(const y of [.22,2.2,3.42])box('#373b3d',x,facadeY(y),front-.15,2.2,.085,.14);
   }
   box('#e9e6dd',117.09,facadeY(1.91),front,.66,2.0,.40);
   box('#34383b',117.48,1.12,-73.05,.20,2.01,14.7);
   for(let z=-80.1;z<-66;z+=2.7)box('#e9e5da',117.63,1.10,z,.35,2.0,.85);
   box('#323434',door,1.98,front-.43,2.67,.32,.66);
   box('#e8d1a3',door,1.817,front-.43,2.03,.025,.12);
   // Individual pale letters on the canopy, with a transparent background.
   const canvas=document.createElement('canvas');canvas.width=768;canvas.height=180;
   const ctx=canvas.getContext('2d');ctx.font='bold 144px Georgia';ctx.fillStyle='#fbf6ec';ctx.textAlign='center';ctx.fillText('Кремс',384,141);
   const map=new T.CanvasTexture(canvas);map.colorSpace=T.SRGBColorSpace;
   const lettering=new T.Mesh(new T.PlaneGeometry(2.27,.30),new T.MeshStandardMaterial({map,transparent:true,depthWrite:false}));
   lettering.material.addEventListener('dispose',()=>map.dispose());
   lettering.position.set(door,1.99,front-.77);lettering.rotation.y=Math.PI;scene.add(lettering);
   box('#b4a58e',door,.14,front-.4,2.28,.048,.75);
   box('#343535',door,facadeY(1.5),front-.18,.065,1.32,.14);
   box('#c1b4a0',door-.15,facadeY(1.14),front-.28,.038,.43,.04);

  }
 }
 // A verge separates Kirova from the long frontage of house 27.
 outdoors.lawnRect(90,16,11,14,.19);
 for(const z of [10.7,19.9]){
  outdoors.lawnEllipse(93.85,z,2.1,1.72,.213);
  for(const dz of [-.58,0,.58])outdoors.shrub(94.35,z+dz,.48,.218);
  for(const x of [92.5,93.2,94.0,94.7])
   cylinder('#afa491',x,.247,z-1.59,.16,.11);
 }
 for(let x=83.25;x<97.5;x+=.80)
  box('#978d80',x,.221,15.2,.019,.013,1.42);
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
