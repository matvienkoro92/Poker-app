import * as T from '../../vendor/three/three.module.min.js';

// Local coordinates run along the street elevation; +Z points out of the wall.
function opening(width,height,crown){
 const w=width/2,h=height/2,p=new T.Shape();
 p.moveTo(-w,-h);p.lineTo(w,-h);p.lineTo(w,h-crown);
 p.quadraticCurveTo(w*.68,h+crown*.16,0,h);
 p.quadraticCurveTo(-w*.68,h+crown*.16,-w,h-crown);
 p.closePath();return p;
}
function shiftedHole(shape,x,y){
 const points=shape.getPoints(4).map(p=>new T.Vector2(p.x+x,p.y+y));
 return new T.Path(points);
}
function extrusion(shape,depth,bevel=0){
 return new T.ExtrudeGeometry(shape,{depth,curveSegments:4,bevelEnabled:bevel>0,
  bevelSegments:1,bevelThickness:bevel,bevelSize:bevel,steps:1});
}

export function buildUpperShop(b,florist,skin,scene,mergeParts){
 const base=3.7,wallHeight=b.h-base;
 const stone=new T.MeshStandardMaterial({color:florist?'#d1be98':'#b9a287',roughness:.82});
 const shadowStone=new T.MeshStandardMaterial({color:'#796d5e',roughness:.91});
 const enamel=new T.MeshStandardMaterial({color:florist?'#35554d':'#424d52',roughness:.42,metalness:.25});
 const glass=new T.MeshPhysicalMaterial({color:'#95a7ac',roughness:.16,metalness:.23,clearcoat:.8,transparent:true,opacity:.27,depthWrite:false});
 const room=new T.MeshStandardMaterial({color:florist?'#726753':'#586064',roughness:.93});
 const fabric=new T.MeshStandardMaterial({color:florist?'#c2b59a':'#a2aba5',roughness:.96,side:T.DoubleSide});
 function elevation(cx,cz,yaw,width,count,rows){
  const group=new T.Group();group.position.set(cx,base,cz);group.rotation.y=yaw;
  function add(geometry,material,x,y,z){
   const m=new T.Mesh(geometry,material);m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;group.add(m);return m;
  }
  const wall=new T.Shape();wall.moveTo(-width/2,0);wall.lineTo(width/2,0);wall.lineTo(width/2,wallHeight);wall.lineTo(-width/2,wallHeight);wall.closePath();
  const bay=width/count,w=Math.min(florist?2.21:1.75,bay-.62),h=2.03,crown=florist?.26:.085;
  for(let row=0;row<rows;row++)for(let col=0;col<count;col++){
   const x=(col+.5)*bay-width/2,y=1.46+row*(florist?2.95:3);
   const voidShape=opening(w,h,crown);
   wall.holes.push(shiftedHole(voidShape,x,y));
   // The stepped stone reveal surrounds the actual hole in the masonry.
   const surround=opening(w+.30,h+.30,crown+.035);
   surround.holes.push(shiftedHole(voidShape,0,0));
   add(extrusion(surround,.095,.018),stone,x,y,-.012);
   const sash=opening(w-.035,h-.035,crown);
   sash.holes.push(shiftedHole(opening(w-.17,h-.17,crown),0,0));
   add(extrusion(sash,.055,.012),enamel,x,y,-.285);
   const pane=add(new T.ShapeGeometry(voidShape,8),glass,x,y,-.305);pane.castShadow=false;
   add(new T.BoxGeometry(w+.72,h+.74,.12),room,x,y,-.77);
   for(const side of [-1,1]){
    add(new T.BoxGeometry(.08,h+.36,.51),shadowStone,x+side*(w/2+.028),y,-.52);
    add(new T.BoxGeometry(w+.15,.08,.51),shadowStone,x,y+side*(h/2+.026),-.52);
   }
   const drapeWidth=w*(.22+.065*((row+col)%3)),drapeHeight=h-.22;
   const drape=new T.PlaneGeometry(drapeWidth,drapeHeight,10,4),p=drape.attributes.position;
   for(let n=0;n<p.count;n++){
    const t=p.getX(n)/drapeWidth+.5,v=p.getY(n)/drapeHeight+.5,fold=Math.cos(t*Math.PI*5);
    p.setXYZ(n,p.getX(n)*(.79+.21*v),p.getY(n)+.025*fold*(1-v),.043*fold+.035*Math.sin(v*Math.PI));
   }
   drape.computeVertexNormals();
   add(drape,fabric,x+(col%2?1:-1)*(w/2-drapeWidth*.46),y-.015,-.49);
   add(new T.BoxGeometry(.051,h-.19,.073),enamel,x,y,-.229);
   add(new T.BoxGeometry(w-.15,.065,.085),enamel,x,y+.31,-.219);
   // A sloped top, rolled nose and underside drip give the sill three distinct edges.
   const sill=new T.Shape();sill.moveTo(-.30,0);sill.lineTo(.22,-.038);
   sill.quadraticCurveTo(.28,-.045,.28,-.09);sill.lineTo(.27,-.122);
   sill.lineTo(.15,-.128);sill.lineTo(.14,-.151);sill.lineTo(-.30,-.151);sill.closePath();
   const sillGeo=extrusion(sill,w+.39,.009);sillGeo.rotateY(-Math.PI/2);
   add(sillGeo,stone,x+(w+.39)/2,y-h/2-.018,0);
   for(const side of [-1,1])add(new T.BoxGeometry(.16,.17,.22),shadowStone,x+side*w*.38,y-h/2-.17,-.004);
  }
  const geo=extrusion(wall,.36);geo.translate(0,0,-.36);
  const uv=geo.getAttribute('uv');for(let i=0;i<uv.count;i++)uv.setXY(i,uv.getX(i)/1.92,uv.getY(i)/1.92);
  add(geo,skin,0,0,0);
  mergeParts(group);group.children.forEach(m=>{if(m.material===glass)m.castShadow=false;});scene.add(group);
 }
 const rows=florist?2:4;
 elevation(b.x,b.z+b.d/2,0,b.w,florist?2:3,rows);
 elevation(b.x,b.z-b.d/2,Math.PI,b.w,florist?2:3,rows);
 elevation(b.x+b.w/2,b.z,Math.PI/2,b.d,florist?2:5,rows);
 elevation(b.x-b.w/2,b.z,-Math.PI/2,b.d,florist?2:5,rows);
 const roof=new T.Mesh(new T.BoxGeometry(b.w,.18,b.d),shadowStone);roof.position.set(b.x,b.h-.09,b.z);
 roof.castShadow=roof.receiveShadow=true;scene.add(roof);
}

// Turned profiles and cast pieces are grouped by finish before they enter the scene.
export function shopFittings(scene,b,front,sign,mergeParts){
 const group=new T.Group();group.position.set(b.x,0,front);group.scale.z=-sign;
 const finishes=new Map();
 function add(g,color,x,y,z,metal=0){
  if(!finishes.has(color))finishes.set(color,new T.MeshStandardMaterial({color,roughness:metal?.38:.76,metalness:metal}));
  const m=new T.Mesh(g,finishes.get(color));m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;group.add(m);return m;
 }
 function turned(color,x,y,z,profile,metal=0,aspect=1){
  const g=new T.LatheGeometry(profile.map(([r,h])=>new T.Vector2(r,h)),24);
  g.scale(1,1,aspect);return add(g,color,x,y,z,metal);
 }
 function cast(shape,depth,color,x,y,z,bevel){
  return add(extrusion(shape,depth,bevel),color,x,y,z,.38);
 }
 function tube(points,r,color){
  add(new T.TubeGeometry(new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p))),18,r,8,false),color,0,0,0,.48);
 }
 return {turned,cast,tube,add,finish(){mergeParts(group);scene.add(group);}};
}

// A fielded timber panel: one continuous mitred profile around the inset face.
export function panelMoulding(width,height){
 const g=new T.BufferGeometry(),vertices=[],indices=[];
 const profile=[[0,0],[.009,.015],[.020,.021],[.031,.019],[.039,.011],[.050,.008],[.059,.002]];
 for(const [inset,depth] of profile){
  const w=width/2-inset,h=height/2-inset;
  vertices.push(-w,-h,depth,w,-h,depth,w,h,depth,-w,h,depth);
 }
 for(let j=0;j<profile.length-1;j++)for(let side=0;side<4;side++){
  const a=j*4+side,b=j*4+(side+1)%4;indices.push(a,b,b+4,a,b+4,a+4);
 }
 g.setAttribute('position',new T.Float32BufferAttribute(vertices,3));g.setIndex(indices);g.computeVertexNormals();return g;
}

// A cupped blade with a central rib; both silhouette and normal vary along the blade.
export function botanicalBlade(length,width,cup){
 const p=[],index=[];
 for(let i=0;i<=6;i++){
  const t=i/6,span=width*(.015+Math.sin(Math.PI*t)**.72);
  for(const side of [-1,0,1]){
   p.push(side*span,t*length,cup*t*t+(side===0?.22:0)*span);
  }
  if(i<6)for(let j=0;j<2;j++){
   const a=i*3+j;index.push(a,a+1,a+4,a,a+4,a+3);
  }
 }
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setIndex(index);g.computeVertexNormals();return g;
}

// The first upper storey is close enough to see both reveals when walking past.
export function districtWindowStorey(b,{scene,box,mat,mergeParts}){
 const bottom=4,top=8.25,centre=6.3,width=1.88,height=2.16,recess=.31;
 const front=b.z+b.d/2,count=Math.floor(b.w/3.5),wallColour=b.color;
 box(wallColour,b.x,(b.h+top)/2,b.z,b.w,b.h-top,b.d);
 box(wallColour,b.x,(bottom+top)/2,b.z-recess/2,b.w,top-bottom,b.d-recess);
 const skin=mat(wallColour),stone=mat('#cfc2ab'),frame=mat('#4e5a58'),glass=mat('#345b65');
 const group=new T.Group();group.position.set(b.x,centre,front);
 const shape=new T.Shape();shape.moveTo(-b.w/2,bottom-centre);shape.lineTo(b.w/2,bottom-centre);
 shape.lineTo(b.w/2,top-centre);shape.lineTo(-b.w/2,top-centre);shape.closePath();
 function piece(g,m,x,y,z){
  const mesh=new T.Mesh(g,m);mesh.position.set(x,y,z);mesh.castShadow=mesh.receiveShadow=true;group.add(mesh);
 }
 for(let i=0;i<count;i++){
  const x=(i-(count-1)/2)*3.5,outline=opening(width,height,.09);
  shape.holes.push(shiftedHole(outline,x,0));
  const surround=opening(width+.24,height+.22,.11);
  surround.holes.push(shiftedHole(outline,0,0));
  piece(extrusion(surround,.068,.014),stone,x,0,-.01);
  piece(new T.ShapeGeometry(outline,8),glass,x,0,-recess+.014);
  piece(new T.BoxGeometry(.06,height-.09,.075),frame,x,0,-.245);
  piece(new T.BoxGeometry(width-.02,.065,.075),frame,x,.37,-.245);
  const sill=new T.BoxGeometry(width+.32,.115,.54);sill.rotateX(.055);
  piece(sill,stone,x,-height/2-.055,-.02);
 }
 const shell=extrusion(shape,recess);shell.translate(0,0,-recess);piece(shell,skin,0,0,0);
 mergeParts(group);scene.add(group);
}
