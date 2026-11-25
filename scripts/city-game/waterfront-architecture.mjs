import * as T from '../../vendor/three/three.module.min.js';

const styleByFootprint = {
 '32,85': {wall:'#dfc5a4',trim:'#f4dfba',accent:'#58877e',roof:'#b17152',radius:3.7,tall:false},
 '-33,84': {wall:'#b3c4ba',trim:'#dfddc4',accent:'#3d6668',roof:'#627471',radius:2.9,tall:true},
 '105,16': {wall:'#d7b498',trim:'#efdbbe',accent:'#526b65',roof:'#a97863',radius:1.6,tall:false},
 '107,35': {wall:'#afc0b5',trim:'#e7dfc8',accent:'#527474',roof:'#677878',radius:2.3,tall:true},
 '104,55': {wall:'#d7c1a5',trim:'#f3e1c4',accent:'#6a8a80',roof:'#9b7760',radius:2,tall:false}
};

export function buildWaterfrontBuilding(building,{scene,mat,mergeParts}){
 const {x,z,w,d,h}=building,style=styleByFootprint[x+','+z];
 if(!style)return false;
 const {wall,trim,accent,roof,radius,tall}=style;
 const facade=new T.Group();
 facade.name="Waterfront facade";
 const stone=mat(trim),plaster=mat(wall),glass=mat('#345b65'),metal=mat(accent);
 function rounded(width,depth,r){
  const a=width/2,b=depth/2,s=new T.Shape();
  s.moveTo(-a+r,-b);s.lineTo(a-r,-b);s.quadraticCurveTo(a,-b,a,-b+r);
  s.lineTo(a,b-r);s.quadraticCurveTo(a,b,a-r,b);s.lineTo(-a+r,b);
  s.quadraticCurveTo(-a,b,-a,b-r);s.lineTo(-a,-b+r);s.quadraticCurveTo(-a,-b,-a+r,-b);
  return s;
 }
 function volume(cx,cy,cz,width,depth,r,height,material){
  const geometry=new T.ExtrudeGeometry(rounded(width,depth,r),{depth:height,bevelEnabled:false,curveSegments:8});
  geometry.rotateX(-Math.PI/2);
  const mesh=new T.Mesh(geometry,material);
  mesh.position.set(cx,cy,cz);mesh.castShadow=mesh.receiveShadow=true;scene.add(mesh);
 }
 const reveal=mat(tall?'#788d83':'#ab8869');
 const warmGlass=mat('#c08d5a',true);
 const charcoal=mat('#263b39');
 const wallDepth=.73;
 function panelShape(width,height,arched){
  const shape=new T.Shape(),r=width/2;
  shape.moveTo(-r,0);shape.lineTo(r,0);
  if(arched){
   shape.lineTo(r,height-r);
   shape.absarc(0,height-r,r,0,Math.PI,false);
  }else{
   shape.lineTo(r,height);shape.lineTo(-r,height);
  }
  shape.closePath();
  return shape;
 }
 function addMesh(group,geometry,material,x=0,y=0,z=0){
  const mesh=new T.Mesh(geometry,material);
  mesh.position.set(x,y,z);mesh.castShadow=mesh.receiveShadow=true;group.add(mesh);
  return mesh;
 }
 function detailBox(group,width,height,depth,material,x,y,z){
  return addMesh(group,new T.BoxGeometry(width,height,depth),material,x,y,z);
 }
 function facadePanel(cx,base,cz,angle,width,height,doors,publicFront){
  const panel=new T.Group();
  panel.name='Recessed waterfront facade';
  panel.position.set(cx,base,cz);panel.rotation.y=angle;
  const wall=panelShape(width,height,false);
  for(const door of doors){
   const {x,y,w,h,arched,entry,lit}=door;
   const voidShape=panelShape(w,h,arched);
   const hole=new T.Path(voidShape.getPoints(16).map(p=>new T.Vector2(p.x+x,p.y+y)));
   wall.holes.push(hole);
   const trimShape=panelShape(w+.24,h+.19,arched);
   const inner=panelShape(w,h,arched);
   trimShape.holes.push(new T.Path(inner.getPoints(16).map(p=>new T.Vector2(p.x,p.y+.095))));
   addMesh(panel,new T.ExtrudeGeometry(trimShape,{depth:.09,bevelEnabled:false,curveSegments:12}),stone,x,y-.095,.005);
   addMesh(panel,new T.ShapeGeometry(panelShape(w,h,arched),12),entry?metal:lit?warmGlass:glass,x,y,-wallDepth-.025);
   if(entry){
    detailBox(panel,.055,h-.18,.055,stone,x,y+h*.44,-wallDepth+.005);
    for(const sign of [-1,1])detailBox(panel,.055,.26,.07,stone,x+sign*.14,y+1.07,-wallDepth+.03);
   }else{
    const cross=h-(arched?w*.5:h*.44);
    detailBox(panel,.044,h-.14,.06,charcoal,x,y+h*.5,-wallDepth+.015);
    detailBox(panel,w-.05,.045,.06,charcoal,x,y+cross,-wallDepth+.018);
   }
   if(!entry)detailBox(panel,w+.22,.13,.36,stone,x,y-.08,.10);
   if(publicFront&&y<1&&lit){
    const fabric=mat('#bda485');
    for(const sign of [-1,1]){
     detailBox(panel,w*.15,h*.53,.045,fabric,x+sign*w*.32,y+h*.31,-wallDepth+.03);
     detailBox(panel,.038,h*.49,.047,stone,x+sign*w*.26,y+h*.32,-wallDepth+.047);
    }
   }
  }
  const wallGeo=new T.ExtrudeGeometry(wall,{depth:wallDepth,bevelEnabled:false,curveSegments:10});
  addMesh(panel,wallGeo,[plaster,reveal],0,0,-wallDepth);
  if(publicFront){
   for(const x of [-width*.36,-width*.18,width*.18,width*.36]){
    detailBox(panel,.14,3.95,.16,reveal,x,2.5,.017);
   }
   for(const y of [4.68,height-.19])detailBox(panel,width+.08,.22,.23,stone,0,y,.085);
   if(!tall){
    const light=mat('#88e5d8',true);
    for(const side of [-1,1]){
     const lanternX=side*2.18;
     detailBox(panel,.18,.41,.16,metal,lanternX,2.54,.15);
     detailBox(panel,.095,.24,.065,light,lanternX,2.52,.253);
    }
    detailBox(panel,3.76,.045,.095,light,0,3.66,1.04);
   }
   // A shallow curved canopy extends past the entrance and casts a street-level shadow.
   const canopy=new T.Shape();
   canopy.moveTo(-2.05,.06);canopy.lineTo(2.05,.06);
   canopy.bezierCurveTo(1.93,-1.72,-1.93,-1.72,-2.05,.06);
   const cover=new T.ExtrudeGeometry(canopy,{depth:.16,bevelEnabled:false,curveSegments:14});
   cover.rotateX(-Math.PI/2);
   addMesh(panel,cover,mat(roof),0,3.71,.03);
   for(const side of [-1,1]){
    const brace=new T.QuadraticBezierCurve3(new T.Vector3(side*1.63,2.79,.08),new T.Vector3(side*1.63,3.31,.15),new T.Vector3(side*1.63,3.73,.76));
    addMesh(panel,new T.TubeGeometry(brace,12,.043,8,false),metal);
   }
  }
  // The wall uses a material array for the jambs, so merge only the trim and glazing.
  const solidWall=panel.children.find(mesh=>mesh.geometry===wallGeo);
  panel.remove(solidWall);
  mergeParts(panel);
  panel.add(solidWall);
  scene.add(panel);
 }
 function roundCorners(cx,cy,cz,width,depth,r,height){
  for(const sx of [-1,1])for(const sz of [-1,1]){
   const px=sx*(width/2-r),pz=sz*(depth/2-r);
   const sector=new T.Shape();
   for(let edge=0;edge<2;edge++){
    const radius=r-edge*wallDepth;
    for(let i=0;i<=12;i++){
     const t=(edge?12-i:i)*Math.PI/24;
     const vx=px+sx*radius*Math.cos(t),vy=-pz-sz*radius*Math.sin(t);
     if(edge===0&&i===0)sector.moveTo(vx,vy);else sector.lineTo(vx,vy);
    }
   }
   sector.closePath();
   const geometry=new T.ExtrudeGeometry(sector,{depth:height,bevelEnabled:false});
   geometry.rotateX(-Math.PI/2);
   addMesh(facade,geometry,plaster,cx,cy,cz);
  }
 }
 function balcony(cx,cy,cz,angle){
  const anchor=new T.Group();anchor.position.set(cx,cy,cz);anchor.rotation.y=angle;
  const create=(shape,height,material,y)=>{
   const geometry=new T.ExtrudeGeometry(shape,{depth:height,bevelEnabled:false,curveSegments:12});
   geometry.rotateX(-Math.PI/2);
   const mesh=new T.Mesh(geometry,material);mesh.position.y=y;mesh.castShadow=true;mesh.receiveShadow=true;
   anchor.add(mesh);
  };
  const lip=new T.Shape();
  lip.moveTo(-1.65,.04);lip.lineTo(1.65,.04);lip.bezierCurveTo(1.53,-1.62,-1.53,-1.62,-1.65,.04);
  create(lip,.18,stone,0);
  const rail=new T.CubicBezierCurve3(new T.Vector3(-1.55,.76,-.04),new T.Vector3(-1.4,.76,1.47),new T.Vector3(1.4,.76,1.47),new T.Vector3(1.55,.76,-.04));
  anchor.add(new T.Mesh(new T.TubeGeometry(rail,18,.048,6,false),metal));
  for(const t of [0,.16,.33,.5,.67,.84,1]){
   const p=rail.getPoint(t),post=new T.Mesh(new T.CylinderGeometry(.026,.026,.59,6),metal);
   post.position.set(p.x,.465,p.z);anchor.add(post);
  }
  mergeParts(anchor);
  scene.add(anchor);
 }
 const mainHeight=h-(tall?4.4:3.25);
 const finishWall=(cx,cy,cz,width,depth,r,height)=>{
  // The backing volume sits beyond the back of each window niche.
  volume(cx,cy,cz,width-1.68,depth-1.68,r-.76,height,plaster);
  roundCorners(cx,cy,cz,width,depth,r,height);
 };
 finishWall(x,0,z,w,d,radius,mainHeight);
 volume(x,.04,z,w+.1,d+.1,radius,.48,stone);
 volume(x,mainHeight-.16,z,w+.28,d+.25,radius,.34,stone);
 const crownW=w*(tall?.59:.72),crownD=d*(tall?.61:.73);
 const crownX=x+(tall?-3.4:3.4),crownH=h-mainHeight;
 finishWall(crownX,mainHeight,z,crownW,crownD,2.1,crownH);
 volume(crownX,h-.14,z,crownW+.45,crownD+.42,2.2,.34,mat(roof));
 volume(crownX,h+.19,z,crownW*.68,crownD*.62,1.45,.49,stone);
 for(const sign of [-1,1]){
  const angle=sign>0?0:Math.PI,front=z+sign*d/2;
  const bayOffsets=tall?[-12,-6,0,6,12]:[-13.8,-9.2,-4.6,0,4.6,9.2,13.8];
  const openingWidth=tall?3.1:3.65;
  const bays=bayOffsets.filter(offset=>Math.abs(offset)+openingWidth/2+.14<w/2-radius);
  const windows=[];
  for(const [index,offset] of bays.entries()){
   windows.push({x:offset,y:offset===0?.55:.72,w:openingWidth,h:3.68,arched:true,entry:offset===0,lit:index%3===2});
   for(let y=5.08,floor=0;y+2.45<mainHeight;y+=3.42,floor++){
    windows.push({x:offset,y,w:1.84,h:2.28,arched:!tall&&floor!==1,lit:(floor*3+index)%7===1});
   }
   if(Math.abs(offset)>2&&Math.abs(offset)<12)balcony(x+offset,4.82,front,angle);
  }
  facadePanel(x,0,front,angle,w-2*radius+.015,mainHeight,windows,true);
  const crownOffsets=[-7,-3.5,0,3.5,7].filter(offset=>Math.abs(offset)+.9<(crownW-4.19)/2);
  facadePanel(crownX,mainHeight,z+sign*crownD/2,angle,crownW-4.19,crownH,crownOffsets.map(x=>({x,y:.42,w:1.52,h:Math.min(2.46,crownH-.7),arched:true})),false);
  const sideWindows=[];
  for(const offset of [-1.62,1.62]){
   for(let y=.76;y+2.43<mainHeight;y+=3.42)sideWindows.push({x:offset,y,w:1.42,h:2.2,arched:tall});
  }
  facadePanel(x+sign*w/2,0,z,sign*Math.PI/2,d-radius*2+.015,mainHeight,sideWindows,false);
  facadePanel(crownX+sign*crownW/2,mainHeight,z,sign*Math.PI/2,crownD-4.19,crownH,[{x:0,y:.42,w:1.35,h:Math.min(2.46,crownH-.7),arched:true}],false);
 }
 if(!tall){
  for(const side of [-1,1]){
   const endX=x+side*(w/2-radius-1.25);
   volume(endX,mainHeight-.1,z+1.4,3.6,3.8,1.7,1.05,mat(roof));
  }
 }
 mergeParts(facade);
 scene.add(facade);
 return true;
}
