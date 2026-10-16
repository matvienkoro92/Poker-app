import {addSculptedHeadwear} from './character-headwear.mjs';
import * as T from '../../vendor/three/three.module.min.js';
import {createCharacterRig} from './character-rig.mjs';
import {characterShape} from './character-shape.mjs';
import {addCharacterHair} from './character-hair.mjs';
import {addCharacterEyewear} from './character-eyewear.mjs';
import {wristWatch,fingerRing} from './wrist-watch.mjs';

const sculptCache=new Map();
async function sculptGeometry(name){
 if(!sculptCache.has(name))sculptCache.set(name,fetch('./assets/player-hall/character-3d/sculpt/'+name+'.bin').then(r=>{if(!r.ok)throw Error('Character anatomy: '+r.status);return r.arrayBuffer();}).catch(error=>{sculptCache.delete(name);throw error;}));
 const data=await sculptCache.get(name),size=new DataView(data).getUint32(0,true),meta=JSON.parse(new TextDecoder().decode(new Uint8Array(data,4,size))),start=4+size,geo=new T.BufferGeometry();
 geo.setAttribute('position',new T.BufferAttribute(new Float32Array(data.slice(start,start+meta.vertices*12)),3));geo.setAttribute('normal',new T.BufferAttribute(new Float32Array(data.slice(start+meta.vertices*12,start+meta.vertices*24)),3));geo.setIndex(new T.BufferAttribute(new Uint32Array(data.slice(start+meta.vertices*24)),1));return geo;
}
const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};
const noise=n=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v);};

export async function buildSculptedCharacter(G,look){
 const root=new T.Group(),rig=createCharacterRig(root),geometries=[],materials=[],textures=[],shape=characterShape(look.body),shorts=G.wardrobeSubcategory('pants',look.pants)==='shorts',tee=look.suit?.endsWith('Tee'),tank=look.suit?.endsWith('Tank'),helmet=look.helmet&&look.helmet!=='none';
 const showFace=!helmet||look.visor==='open';
 const sculptPending=Promise.all(['head','face','hand-left','hand-right','shirt-'+(tank?'tank':tee?'tee':'jacket'),shorts?'shorts':'pants',...(helmet?['helmet-shell']:[])].map(sculptGeometry));
 const material=(color,roughness=.8,metalness=0,physical=false)=>{const Type=physical?T.MeshPhysicalMaterial:T.MeshStandardMaterial;const m=new Type({color,roughness,metalness});materials.push(m);return m;};
 const fur=material('#ffffff',.96),skin=material('#ffffff',.73),skinCrease=material('#6b4735',.84),lip=material('#73503c',.59),nose=material('#453127',.51),eye=material('#241b14',.21),iris=material('#433627',.55),pupil=material('#0b0908',.15),white=material('#efe6d2',.32),nail=material('#6e5341',.42);
 const cloth=material(G.item('suit',look.suit).color,.94,0,true),clothEdge=material(new T.Color(G.item('suit',look.suit).color).multiplyScalar(.70),.92),pants=material(G.item('pants',look.pants).color,.96),pantsEdge=material(new T.Color(G.item('pants',look.pants).color).multiplyScalar(.68),.94),leather=material(G.item('shoes',look.shoes).color,.49,0,true),leatherEdge=material(new T.Color(G.item('shoes',look.shoes).color).multiplyScalar(.78),.64),rubber=material('#dedbd3',.84),outsole=material('#b1afa8',.93),gold=material('#c5a259',.30,.88);
 cloth.clearcoat=/leather|Biker/i.test(look.suit)? .25:0;cloth.roughness=/leather|Biker/i.test(look.suit)?.46:.94;cloth.sheen=/Knit|velvet/i.test(look.suit)?.65:.12;cloth.sheenRoughness=.85;leather.clearcoat=.18;leather.clearcoatRoughness=.48;
 if(leather.color.r>leather.color.g*1.8&&leather.color.r>leather.color.b*1.4){leather.color.multiplyScalar(.62);leatherEdge.color.multiplyScalar(.62);}
 const clubPants=['classic','ruby','midnight'].includes(look.pants);if(clubPants){pants.color.set('#171b20');pantsEdge.color.set('#101317');}
 const fiber=material('#ffffff',.97);fiber.vertexColors=true;fiber.side=T.DoubleSide;
 function detailTexture(kind){const data=new Uint8Array(128*128*4);for(let y=0;y<128;y++)for(let x=0;x<128;x++){const i=(y*128+x)*4,v=kind==='cloth'?128+24*Math.cos(x*Math.PI)+20*Math.sin(y*Math.PI/2)+noise(i)*15:128+(noise(i)-.5)*48;data[i]=data[i+1]=data[i+2]=v;data[i+3]=255;}const map=new T.DataTexture(data,128,128);map.wrapS=map.wrapT=T.RepeatWrapping;map.repeat.set(kind==='cloth'?4:8,kind==='cloth'?4:8);map.magFilter=T.LinearFilter;map.minFilter=T.LinearMipmapLinearFilter;map.generateMipmaps=true;map.anisotropy=4;map.needsUpdate=true;textures.push(map);return map;}
 const [sourceMeshes,[furMap,skinMap]]=await Promise.all([sculptPending,Promise.all(['fur','skin'].map(kind=>new T.TextureLoader().loadAsync('./assets/player-hall/character-3d/sculpt/'+kind+'-albedo-v1.webp')))]);
 for(const map of [furMap,skinMap]){map.colorSpace=T.SRGBColorSpace;map.wrapS=map.wrapT=T.RepeatWrapping;map.anisotropy=4;textures.push(map);}furMap.repeat.set(2,3);skinMap.repeat.set(2,2);fur.map=furMap;fur.bumpMap=furMap;fur.bumpScale=.0024;skin.map=skinMap;
 fur.onBeforeCompile=shader=>{
  shader.vertexShader='attribute float surface;varying float furRegion;varying float furHeight;\n'+shader.vertexShader;
  shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nfurRegion=surface;furHeight=position.y;');
  shader.fragmentShader='varying float furRegion;varying float furHeight;\n'+shader.fragmentShader;
  shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`#include <map_fragment>
   float beard=step(5.5,furRegion)*(1.-step(6.5,furRegion))*(1.-smoothstep(1.42,1.62,furHeight));float grey=dot(diffuseColor.rgb,vec3(.2126,.7152,.0722));diffuseColor.rgb=mix(diffuseColor.rgb,vec3(grey*1.6),beard*.72);
  `);
 };fur.customProgramCacheKey=()=> 'sculpted-chimp-beard-v1';
 const textile=detailTexture('cloth'),pores=detailTexture('skin');for(const m of [cloth,clothEdge,pants,pantsEdge]){m.bumpMap=textile;m.bumpScale=.0008;}for(const m of [skin,lip,nose]){m.bumpMap=pores;m.bumpScale=.00065;}
 function add(geo,mat,surface,name,sculpt=true){
  const p=geo.getAttribute('position'),uv=[],surfaces=[];
  for(let i=0;i<p.count;i++){let x=p.getX(i),y=p.getY(i),z=p.getZ(i);const region=typeof surface==='function'?surface(x,y,z):surface;if(sculpt){let q=shape(x,.5-y/3.825,z,region);if(name==='shirt-body'){const torso=shape(x,.5-y/3.825,z,1),arm=shape(x,.5-y/3.825,z,2),blend=smooth(.45,.60,Math.abs(x));q=torso.map((v,n)=>v+(arm[n]-v)*blend);}x=q[0];y=(.5-q[1])*3.825;z=q[2];p.setXYZ(i,x,y,z);}uv.push(.5+x/2.55,.5-y/3.825);surfaces.push(region);}
  geo.setAttribute('bodyUv',new T.Float32BufferAttribute(uv,2));geo.setAttribute('surface',new T.Float32BufferAttribute(surfaces,1));if(!geo.getAttribute('uv'))geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));if(!geo.getAttribute('normal')||(sculpt&&look.body&&look.body!=='bodyNormal'))geo.computeVertexNormals();geometries.push(geo);const mesh=rig.mesh(geo,mat);mesh.name=name||'';mesh.castShadow=mesh.receiveShadow=true;return mesh;
 }
 function ell(mat,c,r,surface,name){const geo=new T.SphereGeometry(1,40,28);geo.scale(...r);geo.translate(...c);return add(geo,mat,surface,name);}
 function line(points,r,mat,surface,name,closed=false){return add(new T.TubeGeometry(new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)),closed),Math.max(24,points.length*5),r,8,closed),mat,surface,name);}
 function loop(cx,cy,cz,rx,rz,r,mat,surface,name){const pts=[];for(let i=0;i<64;i++){const a=i/64*Math.PI*2;pts.push([cx+rx*Math.cos(a),cy,cz+rz*Math.sin(a)]);}return line(pts,r,mat,surface,name,true);}
 function hemBand(cx,y,cz,rx,rz,mat,surface,name,height=.023){
  loft([[cx,y+height,cz,rx+.003,rz+.003],[cx,y+.007,cz,rx+.001,rz+.001],[cx,y,cz,rx,rz]],mat,surface,name,{rings:12,sides:64,capTop:false,capBottom:false});
  const pos=[],idx=[],sides=64;for(let n=0;n<=sides;n++){const a=n/sides*Math.PI*2;pos.push(cx+rx*Math.cos(a),y,cz+rz*Math.sin(a),cx+(rx-.011)*Math.cos(a),y+.001,cz+(rz-.011)*Math.sin(a));if(n<sides){const k=n*2;idx.push(k,k+2,k+1,k+2,k+3,k+1);}}const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();add(g,mat,surface,name+'-inside');
 }
 function loft(keys,mat,surface,name,{sides=64,rings=80,clothFolds=0,capTop=true,capBottom=true,fork=false}={}){
  const pos=[],uv=[],index=[],high=keys[0][1],low=keys.at(-1)[1];
  function section(y){let k=0;while(k<keys.length-2&&keys[k+1][1]>y)k++;const a=keys[k],b=keys[k+1],t=Math.max(0,Math.min(1,(a[1]-y)/(a[1]-b[1])));return a.map((v,i)=>{if(i===1)return y;const p=keys[Math.max(0,k-1)][i],q=keys[Math.min(keys.length-1,k+2)][i];return .5*((2*v)+(-p+b[i])*t+(2*p-5*v+4*b[i]-q)*t*t+(-p+3*v-3*b[i]+q)*t*t*t);});}
  for(let j=0;j<=rings;j++){const y=high+(low-high)*j/rings,[cx,,cz,rx,rz]=section(y);for(let n=0;n<=sides;n++){
   const a=n/sides*Math.PI*2+(fork?Math.PI/2:0);let x=cx+rx*Math.cos(a),z=cz+rz*Math.sin(a),yy=y;
   if(fork){const u=n/sides,left=u<=.5,t=left?u*4*Math.PI:Math.PI+(u-.5)*4*Math.PI,tx=cx+(left?-1:1)*rx/2+rx/2*Math.cos(t),tz=cz+rz*Math.sin(t),mix=smooth(.02,-.28,y);x+=(tx-x)*mix;z+=(tz-z)*mix;}
   if(clothFolds){const edge=Math.sin(Math.PI*j/rings)*(.25+.75*Math.exp(-Math.pow((y-.30)/.24,2))),wave=Math.sin(y*26+a*3)*Math.sin(a*2+.4)*edge;z+=clothFolds*wave*Math.sin(a);x+=clothFolds*wave*Math.cos(a);yy+=clothFolds*.35*Math.sin(a*5+y*10)*edge;}
   pos.push(x,yy,z);uv.push(n/sides,j/rings);if(j<rings&&n<sides){const k=j*(sides+1)+n;index.push(k,k+1,k+sides+1,k+1,k+sides+2,k+sides+1);}
  }}
  for(const j of [0,rings]){if(j===0&&!capTop||j===rings&&!capBottom)continue;const start=j*(sides+1),center=pos.length/3;const c=new T.Vector3();for(let n=0;n<sides;n++)c.add(new T.Vector3(...pos.slice((start+n)*3,(start+n)*3+3)));c.multiplyScalar(1/sides);pos.push(c.x,c.y,c.z);uv.push(.5,j/rings);for(let n=0;n<sides;n++)index.push(center,start+n+(j===0?1:0),start+n+(j===0?0:1));}
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(pos,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setIndex(index);geo.computeVertexNormals();const normal=geo.getAttribute('normal');for(let j=0;j<=rings;j++){const a=j*(sides+1),b=a+sides,v=new T.Vector3().fromBufferAttribute(normal,a).add(new T.Vector3().fromBufferAttribute(normal,b)).normalize();normal.setXYZ(a,v.x,v.y,v.z);normal.setXYZ(b,v.x,v.y,v.z);}return add(geo,mat,surface,name);
 }
 if(showFace){
  const headUv=[],faceUv=[];const hp=sourceMeshes[0].getAttribute('position'),fp=sourceMeshes[1].getAttribute('position');for(let i=0;i<hp.count;i++)headUv.push((Math.atan2(hp.getZ(i)-.015,hp.getX(i))+Math.PI)/(2*Math.PI),(hp.getY(i)-1.17)/.84);for(let i=0;i<fp.count;i++)faceUv.push((fp.getX(i)+.26)/.52,(fp.getY(i)-1.29)/.48);sourceMeshes[0].setAttribute('uv',new T.Float32BufferAttribute(headUv,2));sourceMeshes[1].setAttribute('uv',new T.Float32BufferAttribute(faceUv,2));
  add(sourceMeshes[0],fur,6,'sculpt-cranium',false);add(sourceMeshes[1],skin,6,'sculpt-facial-mask',false);
 }else {sourceMeshes[0].dispose();sourceMeshes[1].dispose();}
 for(let s=0;s<2;s++)add(sourceMeshes[s+2],skin,3,s?'sculpt-right-hand':'sculpt-left-hand',false);
 // The facial features have depth, cavities, eyelids and lips from every angle.
 if(showFace){
  for(const s of [-1,1]){
   ell(eye,[s*.112,1.64,.277],[.040,.022,.032],6,'eye-socket');ell(iris,[s*.112,1.641,.311],[.015,.016,.008],6,'amber-iris');ell(pupil,[s*.112,1.642,.320],[.009,.012,.003],6,'pupil');ell(white,[s*.104,1.650,.324],[.002,.002,.001],6,'eye-catchlight');
   const lid=[];for(let i=0;i<=36;i++){const a=i/36*Math.PI*2;lid.push([s*.112+.044*Math.cos(a),1.64+.025*Math.sin(a),.281+.017*Math.sin(a)**2]);}line(lid,.0035,skin,6,'eyelid',true);
   line([[s*.045,1.688,.273],[s*.09,1.689,.281],[s*.14,1.693,.265],[s*.185,1.68,.238]],.030,fur,6,'brow-ridge');
   line([[s*.059,1.597,.310],[s*.103,1.593,.304],[s*.151,1.61,.276]],.0016,skinCrease,6,'orbital-fold');
   ell(pupil,[s*.029,1.550,.369],[.012,.007,.004],6,'nostril-cavity');
   line([[s*.075,1.515,.340],[s*.116,1.490,.340],[s*.139,1.453,.323]],.0016,skinCrease,6,'muzzle-fold');
  }
  const mouth=[[-.150,1.438,.320],[-.086,1.431,.353],[0,1.429,.370],[.086,1.431,.353],[.150,1.438,.320]];
  line(mouth,.008,lip,6,'upper-lip');line(mouth.map(([x,y,z])=>[x,y-.012,z-.003]),.009,lip,6,'lower-lip');line(mouth.map(([x,y,z])=>[x,y-.004,z+.005]),.0026,skinCrease,6,'mouth-opening');
  line([[-.076,1.375,.292],[0,1.362,.302],[.076,1.375,.292]],.0017,skinCrease,6,'chin-fold');
  for(const s of [-1,1]){
   // The pinna is a curved bowl with a thick helix and an inner antihelix.
   const pos=[],colors=[],indices=[],rings=16,sides=64;
   for(let j=0;j<=rings;j++)for(let n=0;n<=sides;n++){
    const r=j/rings,a=n/sides*Math.PI*2,x=s*(.295+.082*r*Math.cos(a)),y=1.674+.119*r*Math.sin(a),z=.035+.040*r*r+.009*Math.cos(a)*r;
    pos.push(x,y,z);const c=new T.Color('#8e6045').lerp(new T.Color('#b18361'),r*r);colors.push(c.r,c.g,c.b);if(j<rings&&n<sides){const k=j*(sides+1)+n;indices.push(k,k+1,k+sides+1,k+1,k+sides+2,k+sides+1);}
   }
   const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(pos,3));geo.setAttribute('color',new T.Float32BufferAttribute(colors,3));geo.setIndex(indices);const ear=material('#ffffff',.78);ear.vertexColors=true;ear.side=T.DoubleSide;add(geo,ear,10,'ear-bowl');
   const rim=[];for(let n=0;n<64;n++){const a=n/64*Math.PI*2;rim.push([s*(.295+.082*Math.cos(a)),1.674+.119*Math.sin(a),.075+.009*Math.cos(a)]);}line(rim,.011,skin,10,'ear-helix',true);
   line([[s*.311,1.607,.056],[s*.332,1.649,.057],[s*.323,1.697,.057],[s*.294,1.716,.052]],.007,skinCrease,10,'ear-antihelix');
   ell(skin,[s*.307,1.562,.047],[.035,.032,.027],10,'ear-lobe');
  }
 }
 loft([[0,1.43,.0,.12,.13],[0,1.30,.0,.15,.145],[0,1.15,.0,.18,.155]],fur,7,'fur-neck');
 // Relaxed anatomy bends at the elbow and carries muscle volume into the wrist.
 for(const s of [-1,1]){
  const armKeys=tank?[[s*.44,1.15,-.015,.11,.13],[s*.51,1.04,-.012,.16,.155]]:tee?[[s*.57,.83,-.005,.134,.132]]:[[s*.744,.07,.026,.065,.061]];if(tank||tee)armKeys.push([s*.57,.80,-.005,.134,.132],[s*.64,.59,.01,.116,.122],[s*.675,.43,.025,.139,.132],[s*.714,.22,.035,.116,.105]);armKeys.push([s*.744,.015,.026,.066,.061]);loft(armKeys,fur,2,'fur-arm-'+s);
  const legKeys=shorts?[[s*.285,-.655,-.02,.126,.125],[s*.315,-.74,-.02,.135,.13],[s*.34,-.91,-.008,.119,.112],[s*.37,-1.09,-.01,.127,.106],[s*.395,-1.34,-.015,.087,.081],[s*.410,-1.61,.01,.061,.064]]:[[s*.410,-1.52,.01,.061,.064],[s*.410,-1.61,.01,.061,.064]];
  loft(legKeys,fur,4,'fur-leg-'+s);
  for(let n=0;n<4;n++){
   const offset=[-.060,-.020,.022,.060][n],length=[.139,.178,.167,.127][n],x=s*(.755+offset*1.12),y=-.245-length*.84;
   const g=new T.SphereGeometry(1,20,14);g.scale(.010,.018,.0035);g.translate(x,y,.124);add(g,nail,3,'fingernail');
   line([[x-.014,y+.049,.107],[x,y+.051,.111],[x+.014,y+.049,.107]],.0013,skinCrease,3,'finger-crease');
  }
  line([[s*.710,-.032,.071],[s*.750,-.039,.077],[s*.794,-.032,.068]],.0016,skinCrease,3,'wrist-fold');
 }
 // Authored cloth uses one consistent material around the complete garment.
 // The sewn bands replace the raw isosurface endings. Clip color and shadow
 // passes identically so the original thin edge cannot show through the hem.
 const seamRegion=[],shirtPoints=sourceMeshes[4].getAttribute('position');for(let i=0;i<shirtPoints.count;i++)seamRegion.push(Math.abs(shirtPoints.getX(i))>.49?1:0);sourceMeshes[4].setAttribute('seamRegion',new T.Float32BufferAttribute(seamRegion,1));
 const sewnCloth=cloth.clone(),sewnDepth=new T.MeshDepthMaterial({depthPacking:T.RGBADepthPacking});materials.push(sewnCloth,sewnDepth);
 const hemClip=shader=>{shader.vertexShader='attribute float seamRegion;varying vec2 garmentHemCoords;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ngarmentHemCoords=vec2(seamRegion,position.y);');shader.fragmentShader='varying vec2 garmentHemCoords;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\nif((garmentHemCoords.x<.5&&garmentHemCoords.y<.118)||(garmentHemCoords.x>=.5&&garmentHemCoords.y<'+(tee?.798:.033).toFixed(3)+'))discard;');};
 sewnCloth.onBeforeCompile=hemClip;sewnDepth.onBeforeCompile=hemClip;sewnCloth.customProgramCacheKey=()=> 'sculpt-sewn-hem-'+(tee?'tee':tank?'tank':'jacket');sewnDepth.customProgramCacheKey=()=> 'sculpt-sewn-depth-'+(tee?'tee':tank?'tank':'jacket');
 const garment=add(sourceMeshes[4],sewnCloth,(x,y)=>Math.abs(x)>.52&&y>.015?2:1,'shirt-body');garment.customDepthMaterial=sewnDepth;

 for(const s of [-1,1])if(!tank)hemBand(s*(tee?.57:.744),tee?.773:.014,tee?.01:.026,tee?.165:.080,tee?.161:.076,clothEdge,2,'sewn-sleeve-hem',tee?.026:.019);
 const collar=[];for(let n=0;n<64;n++){const a=n/64*Math.PI*2;collar.push([.183*Math.cos(a),1.234-.034*Math.sin(a)**2,.132*Math.sin(a)]);}line(collar,.012,clothEdge,1,'ribbed-collar',true);hemBand(0,.097,.006,.415,.229,clothEdge,1,'sewn-shirt-hem',.021);
 function clothZ(x,y,front=true){let best=front?-Infinity:Infinity;
  for(const mesh of root.children){if(!mesh.name.startsWith('pants-')&&mesh.name!=='shirt-body')continue;const p=mesh.geometry.getAttribute('position'),idx=mesh.geometry.index.array;
   for(let i=0;i<idx.length;i+=3){const a=idx[i],b=idx[i+1],c=idx[i+2],ax=p.getX(a),ay=p.getY(a),bx=p.getX(b),by=p.getY(b),cx=p.getX(c),cy=p.getY(c),den=(by-cy)*(ax-cx)+(cx-bx)*(ay-cy);if(Math.abs(den)<1e-10)continue;const u=((by-cy)*(x-cx)+(cx-bx)*(y-cy))/den,v=((cy-ay)*(x-cx)+(ax-cx)*(y-cy))/den,w=1-u-v;if(u<-.0001||v<-.0001||w<-.0001)continue;const z=p.getZ(a)*u+p.getZ(b)*v+p.getZ(c)*w;if(front?z>best:z<best)best=z;}
  }return Number.isFinite(best)?best:(front?.2:-.2);
 }
 function stitch(points,mat,name,front=true,r=.0016){return line(points.map(([x,y])=>[x,y,clothZ(x,y,front)+(front?.0025:-.0065)]),r,mat,4,name);}
 // The shorts/pants fork is a continuous manifold, with stitched real pockets.
 add(sourceMeshes[5],pants,4,'pants-body');
 for(const s of [-1,1]){
  if(shorts)hemBand(s*.245,-.676,-.020,.183,.174,pants,4,'sewn-shorts-hem',.018);else hemBand(s*.41,-1.548,-.020,.102,.092,pantsEdge,4,'sewn-pants-hem',.020);
  stitch([[s*.32,-.035],[s*.36,-.13],[s*.392,-.23]],pantsEdge,'front-pocket');
  const vertices=[],uv=[],index=[],nx=12,ny=12;
  for(let j=0;j<=ny;j++)for(let i=0;i<=nx;i++){const u=i/nx,v=j/ny,x=s*.24+(u-.5)*.15,y=-.055-v*(.155+.022*(1-Math.abs(u-.5)*2)),z=clothZ(x,y,false)-.002-.003*Math.sin(u*Math.PI)*Math.sin(v*Math.PI);vertices.push(x,y,z);uv.push(u,v);if(i<nx&&j<ny){const k=j*(nx+1)+i;index.push(k,k+1,k+nx+1,k+1,k+nx+2,k+nx+1);}}
  const patch=new T.BufferGeometry();patch.setAttribute('position',new T.Float32BufferAttribute(vertices,3));patch.setAttribute('uv',new T.Float32BufferAttribute(uv,2));patch.setIndex(index);add(patch,pants,4,'rear-pocket-patch',false);
  const outline=[[-.068,0],[.068,0],[.068,-.142],[0,-.163],[-.068,-.142],[-.068,0]].map(([x,y])=>[s*.24+x,-.061+y]);stitch(outline,pantsEdge,'rear-pocket-stitch',false,.0012);
 }
 stitch([[0,.08],[0,-.06],[.019,-.19]],pantsEdge,'fly-stitch');
 // Distinct jacket details are authored geometry, not front-view photographs.
 if(!tee&&!tank&&!/Knit|Puffer|Hoodie/i.test(look.suit)){
  const inner=material('#171b1d',.92),trim=material('#303432',.84);
  const pos=[],uv=[],idx=[],nx=8,ny=36;
  for(let j=0;j<=ny;j++)for(let i=0;i<=nx;i++){const y=.20+j/ny*.96,x=(i/nx-.5)*(.15+.055*j/ny);pos.push(x,y,clothZ(x,y,true)+.002);uv.push(i/nx,j/ny);if(i<nx&&j<ny){const k=j*(nx+1)+i;idx.push(k,k+1,k+nx+1,k+1,k+nx+2,k+nx+1);}}
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(idx);add(g,inner,1,'jacket-inner-shirt',false);
  for(const sign of [-1,1]){
   const path=[[sign*.092,1.16],[sign*.11,.95],[sign*.105,.60],[sign*.075,.20]].map(([x,y])=>[x,y,clothZ(x,y,true)+.005]);line(path,.004,clothEdge,1,'jacket-front-edge');
   const pocket=[[sign*.27,.59],[sign*.35,.44]].map(([x,y])=>[x,y,clothZ(x,y,true)+.003]);line(pocket,.003,clothEdge,1,'jacket-pocket-welt');
  }
  if(/Blazer|Dinner|Biker/i.test(look.suit)){
   for(const sign of [-1,1]){const points=[[sign*.10,1.19],[sign*.20,1.02],[sign*.105,.77],[sign*.067,1.02]],vertices=points.flatMap(([x,y])=>[x,y,clothZ(x,y,true)+.012]),g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(vertices,3));g.setIndex([0,1,2,0,2,3]);g.computeVertexNormals();add(g,cloth,1,'folded-lapel',false);line(points.map(([x,y])=>[x,y,clothZ(x,y,true)+.014]),.0014,clothEdge,1,'lapel-stitch');}
   for(const y of [.48,.31]){const b=new T.CylinderGeometry(.009,.009,.006,20);b.rotateX(Math.PI/2);b.translate(.10,y,clothZ(.10,y,true)+.008);add(b,gold,1,'jacket-button',false);}
  }else{
   if(['classic','ruby','midnight'].includes(look.suit))for(const sign of [-1,1])line([[sign*.53,1.04,.16],[sign*.60,.80,.15],[sign*.65,.56,.14],[sign*.70,.28,.12]],.008,rubber,2,'racing-sleeve-piping');
   for(let y=.25;y<1.15;y+=.026){const tooth=new T.BoxGeometry(.008,.008,.004);tooth.translate(.080,y,clothZ(.08,y,true)+.007);add(tooth,gold,1,'zipper-tooth',false);}
   if(['classic','ruby','midnight'].includes(look.suit))for(let row=0;row<3;row++)for(let col=0;col<4;col++){const x=-.32+col*.033,y=.92+row*.033,g=new T.PlaneGeometry(.032,.032);g.translate(x,y,clothZ(x,y,true)+.004);add(g,(row+col)%2?inner:rubber,1,'club-checker-patch',false);}
  }
 }
 if(/Hoodie/i.test(look.suit)){
  const hood=new T.SphereGeometry(1,48,32,0,Math.PI*2,0,Math.PI*.68);hood.scale(.24,.24,.16);hood.rotateX(Math.PI/2);hood.translate(0,1.08,-.20);const hoodCloth=cloth.clone();hoodCloth.side=T.DoubleSide;materials.push(hoodCloth);add(hood,hoodCloth,1,'folded-hood');
  for(const sign of [-1,1])line([[sign*.10,1.17,.16],[sign*.09,1.04,.23],[sign*.11,.88,.235]],.0035,rubber,1,'hood-drawstring');
 }
 if(/Puffer/i.test(look.suit))for(let y=.26;y<1.17;y+=.14){const points=[];for(let n=0;n<=24;n++){const x=-.37+n*.74/24;points.push([x,y,clothZ(x,y,true)+.004]);}const g=new T.TubeGeometry(new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p))),32,.004,6,false);add(g,clothEdge,1,'quilted-puffer-seam',false);}
 if(look.necklace&&look.necklace!=='none'){
  const metal=material(G.item('necklace',look.necklace).color,.26,.88),path=new T.CatmullRomCurve3([[-.16,1.24,.04],[-.16,1.14,.20],[-.13,.93,.26],[0,.82,.275],[.13,.93,.26],[.16,1.14,.20],[.16,1.24,.04],[0,1.25,-.145]].map(p=>new T.Vector3(...p)),true),positions=[],normals=[],indices=[];
  for(let n=0;n<56;n++){
   const t=n/56,p=path.getPointAt(t),tangent=path.getTangentAt(t).normalize(),normal=new T.Vector3(p.x,0,p.z).normalize(),side=new T.Vector3().crossVectors(normal,tangent).normalize();normal.crossVectors(tangent,side).normalize();const matrix=new T.Matrix4().makeBasis(tangent,side,normal),q=new T.Quaternion().setFromRotationMatrix(matrix);if(n%2)q.multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),Math.PI/2));
   const beads=/Beads|pearl/.test(look.necklace),g=beads?new T.SphereGeometry(.010,12,8):new T.TorusGeometry(.0105,.003,6,12);if(!beads)g.scale(1.2,.8,1);g.applyQuaternion(q);g.translate(p.x,p.y,p.z);const a=g.getAttribute('position'),b=g.getAttribute('normal'),offset=positions.length/3;positions.push(...a.array);normals.push(...b.array);indices.push(...Array.from(g.index.array,i=>i+offset));g.dispose();
  }
  const chain=new T.BufferGeometry();chain.setAttribute('position',new T.Float32BufferAttribute(positions,3));chain.setAttribute('normal',new T.Float32BufferAttribute(normals,3));chain.setIndex(indices);add(chain,metal,1,'interlocked-necklace-links');
  if(!['silverChain','goldChain','blackBeads','pearl'].includes(look.necklace)){
   const id=look.necklace,shape=new T.Shape(),word=id==='nicknameBling',w=word?.11:.045,h=word?.032:.055;
   if(id==='spadeDiamond'){shape.moveTo(0,h);shape.bezierCurveTo(-.016,.028,-.069,0,-.041,-.026);shape.quadraticCurveTo(-.016,-.040,0,-.018);shape.quadraticCurveTo(.016,-.040,.041,-.026);shape.bezierCurveTo(.069,0,.016,.028,0,h);shape.lineTo(.016,-h);shape.lineTo(-.016,-h);shape.closePath();}
   else if(id==='crownPendant'){shape.moveTo(-w,-h);shape.lineTo(w,-h);shape.lineTo(w,h*.55);shape.lineTo(w*.48,0);shape.lineTo(0,h);shape.lineTo(-w*.48,0);shape.lineTo(-w,h*.55);shape.closePath();}
   else {shape.moveTo(-w,-h);shape.lineTo(w,-h);shape.lineTo(w,h);shape.lineTo(-w,h);shape.closePath();}
   const geo=new T.ExtrudeGeometry(shape,{depth:.008,bevelEnabled:true,bevelSize:.003,bevelThickness:.002,bevelSegments:3});geo.translate(0,.755,.279);add(geo,metal,1,'necklace-pendant:'+id);
   if(['silverTag','acesPendant','poker21Pendant','nicknameBling'].includes(id)){
    const canvas=document.createElement('canvas');canvas.width=512;canvas.height=192;const ctx=canvas.getContext('2d');ctx.clearRect(0,0,512,192);ctx.fillStyle='#f7e7b5';ctx.font='bold 100px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(id==='nicknameBling'?(look.patchText||'POKER21'):id==='acesPendant'?'A♠ A♥':id==='silverTag'?'♠':'P21',256,100,480);
    const map=new T.CanvasTexture(canvas);map.colorSpace=T.SRGBColorSpace;textures.push(map);const ink=new T.MeshStandardMaterial({map,transparent:true,alphaTest:.1,roughness:.32,metalness:.3});materials.push(ink);const face=new T.PlaneGeometry(w*1.85,h*1.7);face.translate(0,.755,.291);add(face,ink,1,'pendant-engraving:'+id);
   }
  }
 }
 if(clubPants&&!shorts){
  const stripeMat=material('#ffffff',.93);stripeMat.vertexColors=true;const accent=new T.Color(G.item('pants',look.pants).color),whiteStripe=new T.Color('#e5e1d7'),pantsMesh=root.children.find(m=>m.name==='pants-body'),p=pantsMesh.geometry.getAttribute('position'),faces=pantsMesh.geometry.index.array;
  function outerX(y,z,sign){let best=sign>0?-Infinity:Infinity;for(let i=0;i<faces.length;i+=3){const a=faces[i],b=faces[i+1],c=faces[i+2],ay=p.getY(a),az=p.getZ(a),by=p.getY(b),bz=p.getZ(b),cy=p.getY(c),cz=p.getZ(c),den=(bz-cz)*(ay-cy)+(cy-by)*(az-cz);if(Math.abs(den)<1e-10)continue;const u=((bz-cz)*(y-cy)+(cy-by)*(z-cz))/den,v=((cz-az)*(y-cy)+(ay-cy)*(z-cz))/den,w=1-u-v;if(u<-.0001||v<-.0001||w<-.0001)continue;const x=p.getX(a)*u+p.getX(b)*v+p.getX(c)*w;if(sign>0?x>best:x<best)best=x;}return Number.isFinite(best)?best:sign*.42;}
  for(const sign of [-1,1]){const vertices=[],colors=[],idx=[],rows=64,columns=6;for(let j=0;j<=rows;j++)for(let i=0;i<=columns;i++){const t=i/columns*2-1,y=.05-j/rows*1.58,z=-.02+t*.041,x=outerX(y,z,sign)+sign*.0025,c=Math.abs(t)<.5?accent:whiteStripe;vertices.push(x,y,z);colors.push(c.r,c.g,c.b);if(j<rows&&i<columns){const k=j*(columns+1)+i;idx.push(k,k+1,k+columns+1,k+1,k+columns+2,k+columns+1);}}const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(vertices,3));g.setAttribute('color',new T.Float32BufferAttribute(colors,3));g.setIndex(idx);g.computeVertexNormals();stripeMat.side=T.DoubleSide;add(g,stripeMat,4,'club-pants-side-stripe',false);}
 }
 if(/Cargo/i.test(look.pants))for(const sign of [-1,1]){
  const x=sign*.30,y=-.43,z=clothZ(x,y,true)+.023,box=new T.BoxGeometry(.15,.19,.035);box.translate(x,y,z);add(box,pants,4,'cargo-thigh-pocket',false);
  const flap=new T.BoxGeometry(.17,.045,.015);flap.translate(x,y+.08,z+.024);add(flap,pantsEdge,4,'cargo-pocket-flap',false);
 }
 // The patch follows the actual cloth surface and is available on jackets as well as tees.
 if(look.patch&&look.patch!=='none'){
  const map=new T.CanvasTexture(G.patchCanvas(look));map.colorSpace=T.SRGBColorSpace;textures.push(map);const mat=new T.MeshStandardMaterial({map,roughness:.94,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-1});materials.push(mat);
  const vertices=[],uv=[],faces=[],cols=12,rows=6;for(let j=0;j<=rows;j++)for(let i=0;i<=cols;i++){const x=-.285+i/cols*.235,y=.91-j/rows*.088;vertices.push(x,y,clothZ(x,y,true)+.004);uv.push(i/cols,1-j/rows);if(i<cols&&j<rows){const k=j*(cols+1)+i;faces.push(k,k+cols+1,k+1,k+1,k+cols+1,k+cols+2);}}
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(vertices,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setIndex(faces);geo.computeVertexNormals();add(geo,mat,1,'sewn-word-patch',false);
 }
 // Longitudinal shoe lasts, layered rubber, stitched leather panels and eyelets.
 for(const s of [-1,1]){
  const boot=/Chelsea|combat|desert|hiking|canvasHigh/i.test(look.shoes),formal=/Oxford|Loafer|Brogue/i.test(look.shoes),slipOn=/Chelsea|Loafer/i.test(look.shoes);
  const x=s*.41,sections=[[-.115,.060,-1.80,-1.61],[-.09,.112,-1.815,-1.54],[-.035,.132,-1.815,-1.53],[.04,.138,-1.815,-1.56],[.115,.145,-1.815,-1.615],[.20,.152,-1.815,-1.665],[.28,.156,-1.815,-1.686],[.36,.149,-1.815,-1.699],[.415,.115,-1.81,-1.72],[.443,.058,-1.80,-1.755],[.448,.004,-1.785,-1.780]];
  if(boot)for(const section of sections)if(section[0]<.06)section[3]+= .19*(1-Math.max(0,section[0])/.12);
  if(formal){rubber.color.set('#302923');outsole.color.set('#1b1918');}
  function shoe(sec,mat,name){const p=[],uv=[],idx=[],sides=48;for(let j=0;j<sec.length;j++){const [z,w,b,t]=sec[j];for(let n=0;n<=sides;n++){const a=n/sides*Math.PI*2;p.push(x+w*Math.cos(a),name==='leather-sneaker'?b+(t-b)*Math.max(0,Math.sin(a)):(b+t)/2+(t-b)/2*Math.sin(a),z);uv.push(n/sides,j/(sec.length-1));if(j<sec.length-1&&n<sides){const k=j*(sides+1)+n;idx.push(k,k+1,k+sides+1,k+1,k+sides+2,k+sides+1);}}}for(const j of [0,sec.length-1]){const [z,,b,t]=sec[j],base=j*(sides+1),c=p.length/3;p.push(x,(b+t)/2,z);uv.push(.5,j/(sec.length-1));for(let n=0;n<sides;n++)idx.push(c,base+(j===0?n+1:n),base+(j===0?n:n+1));}const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(p,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setIndex(idx);geo.computeVertexNormals();return add(geo,mat,5,name,false);}
  shoe(sections,leather,'leather-sneaker');
  shoe([[-.124,.065,-1.848,-1.805],[-.10,.124,-1.853,-1.798],[-.02,.145,-1.855,-1.798],[.16,.158,-1.855,-1.798],[.32,.164,-1.855,-1.798],[.40,.137,-1.85,-1.798],[.445,.078,-1.835,-1.805],[.459,.004,-1.822,-1.817]],rubber,'rubber-midsole');
  shoe([[-.122,.065,-1.865,-1.845],[-.09,.124,-1.870,-1.846],[.02,.145,-1.870,-1.846],[.20,.156,-1.870,-1.846],[.34,.158,-1.867,-1.846],[.42,.125,-1.856,-1.841],[.453,.055,-1.837,-1.824],[.458,.003,-1.826,-1.821]],outsole,'outsole');
  function vamp(z,dx=0){let k=0;while(k<sections.length-2&&sections[k+1][0]<z)k++;const a=sections[k],b=sections[k+1],t=Math.max(0,Math.min(1,(z-a[0])/(b[0]-a[0]))),w=a[1]+(b[1]-a[1])*t,low=a[2]+(b[2]-a[2])*t,high=a[3]+(b[3]-a[3])*t;return low+(high-low)*Math.sqrt(Math.max(0,1-(dx/w)**2));}
  for(const side of [-1,1]){
   line([[x+side*.098,-1.558,-.045],[x+side*.135,-1.63,.08],[x+side*.154,-1.735,.275],[x+side*.125,-1.765,.392]],.003,leatherEdge,5,'quarter-panel-seam');
   line([[x+side*.093,-1.579,-.04],[x+side*.131,-1.65,.10],[x+side*.148,-1.752,.275]],.0013,rubber,5,'quarter-stitch');
   for(let n=0;n<(slipOn?0:6);n++){const z=.06+n*.042,y=vamp(z,.060)+.002;const ring=new T.TorusGeometry(.0055,.0018,6,12);ring.rotateX(-.95);ring.translate(x+side*.060,y,z);add(ring,leatherEdge,5,'lace-eyelet',false);}
  }
  for(let n=0;n<(slipOn?0:6);n++){const z=.062+n*.042;line([[x-.060,vamp(z,.06)+.004,z],[x,vamp(z+.009)+.005,z+.009],[x+.060,vamp(z,.06)+.004,z]],.0032,rubber,5,'woven-lace');line([[x+.060,vamp(z+.004,.06)+.005,z+.004],[x,vamp(z+.012)+.006,z+.012],[x-.060,vamp(z+.004,.06)+.005,z+.004]],.0032,rubber,5,'woven-lace-cross');}
  if(slipOn)line([[x-.10,vamp(.14,.10)+.006,.14],[x,vamp(.14)+.009,.14],[x+.10,vamp(.14,.10)+.006,.14]],.008,leatherEdge,5,'slip-on-vamp-band');
  line([[x-.108,-1.777,.29],[x-.12,-1.762,.36],[x,-1.749,.421],[x+.12,-1.762,.36],[x+.108,-1.777,.29]],.0018,rubber,5,'toe-stitch');
  const tab=new T.BoxGeometry(.065,.10,.018);tab.translate(x,-1.60,-.107);add(tab,leatherEdge,5,'heel-pull-tab',false);
  for(let n=0;n<12;n++)for(const side of [-1,1])line([[x+side*.150,-1.827,.02+n*.027],[x+side*.150,-1.842,.02+n*.027]],.0013,outsole,5,'sole-groove');
 }
 // Hair strands use the authored surface normals instead of a painted fur strip.
 function furOn(mesh,count,surface,filter,length=.024){
  const p=mesh.geometry.getAttribute('position'),normal=mesh.geometry.getAttribute('normal'),positions=[],colors=[],indices=[];
  for(let i=0;i<count;i++){
   const index=Math.floor(noise(i+surface*521)*p.count),a=new T.Vector3().fromBufferAttribute(p,index),n=new T.Vector3().fromBufferAttribute(normal,index);if(filter&&!filter(a,n))continue;
   const down=new T.Vector3(.08*Math.sin(i*2.1),-1,.10*Math.cos(i*1.3));down.addScaledVector(n,-down.dot(n)).normalize();const tangent=new T.Vector3().crossVectors(n,down).normalize(),len=length*(.65+noise(i*2.7)*.75),w=.00035+noise(i*3.1)*.0004,base=positions.length/3;
   const grey=a.y<1.53&&surface===6?noise(i*2.2)>.50:false,c=new T.Color(grey?'#5d554b':'#362b23').multiplyScalar(.75+noise(i*8.7)*.35);
   for(let j=0;j<4;j++){const t=j/3,center=a.clone().addScaledVector(n,.001+len*.30*Math.sin(t*Math.PI/2)).addScaledVector(down,len*t);for(const side of [-1,1]){const v=center.clone().addScaledVector(tangent,side*w*(1-t*.92));positions.push(v.x,v.y,v.z);colors.push(c.r,c.g,c.b);}if(j<3){const k=base+j*2;indices.push(k,k+1,k+2,k+1,k+3,k+2);}}
  }
  if(!positions.length)return;const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setAttribute('color',new T.Float32BufferAttribute(colors,3));g.setIndex(indices);g.computeVertexNormals();const strands=add(g,fiber,surface,'individual-fur-strands',false);strands.castShadow=false;
 }
 if(showFace){const head=root.children.find(m=>m.name==='sculpt-cranium');furOn(head,3800,6,(a,n)=>!(a.z>.12&&a.y>1.33&&a.y<1.78&&Math.abs(a.x)<.235)&&(!look.hair||look.hair==='hairNatural'||a.y<1.76),.027);}
 if(showFace)for(const brow of root.children.filter(m=>m.name==='brow-ridge'))furOn(brow,300,6,null,.010);
 const limbMeshes=root.children.filter(m=>m.name.startsWith('fur-arm-')||m.name.startsWith('fur-leg-'));
 for(const mesh of limbMeshes){const arm=mesh.name.startsWith('fur-arm');furOn(mesh,1800,arm?2:4,a=>arm?a.y<(tank?1.10:tee?.80:.015):shorts&&a.y<-.68,.021);}
 // Wardrobe art is used solely as a print decal on the curved shirt surface.
 if(tee||tank){
  const printLook={...look,hair:'hairNatural',glasses:'none',watch:'none',ring:'none',necklace:'none',body:'bodyNormal',helmet:'none',hat:'none',patch:'none'};await G.loadWardrobe(printLook);const image=new Image();image.src='./assets/player-hall/standing-monkey-v1.webp';await image.decode();const art=G.renderCharacter(image,printLook),canvas=document.createElement('canvas');canvas.width=1024;canvas.height=1536;const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(art,0,1536-art.height);const pixels=ctx.getImageData(0,0,1024,1536);
  for(let y=0;y<1536;y++)for(let x=0;x<1024;x++){const i=(y*1024+x)*4,r=pixels.data[i]/255,g=pixels.data[i+1]/255,b=pixels.data[i+2]/255,lum=(r+g+b)/3,ink=Math.max(smooth(.23,.50,lum),smooth(.15,.30,r)*smooth(.02,.12,r-g));pixels.data[i+3]*=x>340&&x<684&&y>315&&y<663?ink:0;}
  ctx.putImageData(pixels,0,0);const map=new T.CanvasTexture(canvas);map.colorSpace=T.SRGBColorSpace;map.anisotropy=4;textures.push(map);const decal=new T.MeshStandardMaterial({map,transparent:true,alphaTest:.03,depthWrite:false,roughness:.96,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-1});materials.push(decal);
  const body=root.children.find(m=>m.name==='shirt-body'),g=body.geometry.clone(),p=g.getAttribute('position'),n=g.getAttribute('normal'),uv=[],idx=[];for(let i=0;i<p.count;i++){uv.push(.5+p.getX(i)/2.55,.5+p.getY(i)/3.825);p.setXYZ(i,p.getX(i)+n.getX(i)*.001,p.getY(i)+n.getY(i)*.001,p.getZ(i)+n.getZ(i)*.001);}const old=g.index.array;for(let i=0;i<old.length;i+=3)if(old.slice(i,i+3).every(k=>p.getZ(k)>.03))idx.push(...old.slice(i,i+3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(idx);add(g,decal,1,'screen-printed-shirt',false);
 }
 if(helmet){
  for(const o of [...root.children])if(o.name.startsWith('ear-'))o.removeFromParent();
  const shell=material(G.item('helmet',look.helmet).color,.25,.45,true);shell.clearcoat=.7;shell.clearcoatRoughness=.16;
  const visor=material('#152731',.10,.55,true);visor.clearcoat=1;visor.transparent=true;visor.opacity=.91;visor.side=T.DoubleSide;
  add(sourceMeshes[6],shell,6,'helmet-shell',false);
  line([[-.28,1.43,.16],[-.20,1.39,.30],[0,1.36,.36],[.20,1.39,.30],[.28,1.43,.16]],.030,shell,6,'helmet-chin-bar');
  const pos=[],uv=[],tri=[],nx=48,ny=20;for(let j=0;j<=ny;j++)for(let i=0;i<=nx;i++){const u=(i/nx-.5)*1.9,v=(j/ny-.5)*2.4;let point=new T.Vector3(.35*Math.sin(u),1.665+.26*Math.sin(v),.20+.19*Math.cos(u)*Math.cos(v));if(look.visor==='open')point.sub(new T.Vector3(0,1.84,.13)).applyAxisAngle(new T.Vector3(1,0,0),-1.10).add(new T.Vector3(0,1.84,.13));pos.push(point.x,point.y,point.z);uv.push(i/nx,j/ny);if(i<nx&&j<ny){const k=j*(nx+1)+i;tri.push(k,k+1,k+nx+1,k+1,k+nx+2,k+nx+1);}}const pane=new T.BufferGeometry();pane.setAttribute('position',new T.Float32BufferAttribute(pos,3));pane.setAttribute('uv',new T.Float32BufferAttribute(uv,2));pane.setIndex(tri);pane.computeVertexNormals();add(pane,visor,6,'hinged-helmet-visor',false);
  for(const sign of [-1,1]){const pivot=new T.CylinderGeometry(.027,.027,.012,32);pivot.rotateZ(Math.PI/2);pivot.translate(sign*.327,1.73,.035);add(pivot,gold,6,'visor-hinge',false);for(let n=0;n<4;n++)ell(nose,[sign*.322,1.48+n*.022,-.02],[.007,.006,.036],6,'helmet-vent');}
  line([[0,1.90,-.20],[0,2.007,-.05],[0,1.995,.15],[0,1.91,.245]],.015,gold,6,'helmet-racing-stripe');
 }
 const headwear=addSculptedHeadwear(rig,look,G),hair=addCharacterHair(rig,{...look,sculptHairOffset:.025,sculptHairDepth:-.075,sculptHairTexture:furMap}),eyewear=addCharacterEyewear(rig,{...look,helmet:showFace?'none':look.helmet,sculptEyewearDepth:-.025},G);
 const watch=look.watch&&look.watch!=='none'?wristWatch(look.watch,G.item('watch',look.watch).color):null;if(watch){root.add(watch.group);rig.attach(watch.group,'rightWrist');}
 const ring=look.ring&&look.ring!=='none'?fingerRing(G.item('ring',look.ring).color,look.ring):null;if(ring){root.add(ring.group);rig.attach(ring.group,'rightHand');}
 rig.setRelaxedPose(true);
 return {root,rig,geometries,materials,textures,dispose(){headwear.dispose();hair.dispose();eyewear.dispose();watch?.dispose();ring?.dispose();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());rig.dispose();}};
}
