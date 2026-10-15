import {characterShape} from './character-shape.mjs';
import {addCharacterHair} from './character-hair.mjs';
import * as T from '../../vendor/three/three.module.min.js';
import {addCharacterTailoring} from './character-tailoring.mjs';
import {createCharacterRig} from './character-rig.mjs';
import {wristWatch,fingerRing} from './wrist-watch.mjs';
// Anatomical reconstruction from the club portrait. Front appearance is sampled
// from the wardrobe renderer; unseen anatomy and rear textiles are authored here.
export async function createCharacterStudy(host,look,state={}){
 const G=window.PokerGarage,source=new Image();source.src='./assets/player-hall/standing-monkey-v1.webp';await source.decode();await G.loadWardrobe(look);if(look.helmet&&look.helmet!=='none'){const helmet=G.loadHelmet(true,look.visor,true,look.helmet);if(!helmet.naturalWidth)await new Promise((resolve,reject)=>{helmet.addEventListener('load',resolve,{once:true});helmet.addEventListener('error',reject,{once:true});});}
 const art=G.renderCharacter(source,{...look,hair:'hairNatural',watch:'none',ring:'none'}),sample=document.createElement('canvas');sample.width=1024;sample.height=1536;const paint=sample.getContext('2d',{willReadFrequently:true});paint.drawImage(art,0,1536-art.height);
 const rearSource=new Image();rearSource.src='./assets/player-hall/character-3d/club-rear-v1.png';await rearSource.decode();
 const rearCanvas=document.createElement('canvas');rearCanvas.width=1024;rearCanvas.height=1536;const rear=rearCanvas.getContext('2d');rear.drawImage(rearSource,0,0,1024,1536);
 const sideSource=new Image();sideSource.src='./assets/player-hall/character-3d/club-side-v1.png';await sideSource.decode();const sideCanvas=document.createElement('canvas');sideCanvas.width=1024;sideCanvas.height=1536;const sideContext=sideCanvas.getContext('2d');sideContext.drawImage(sideSource,0,0,1024,1536);const sidePixels=sideContext.getImageData(0,0,1024,1536).data;
 const frontPixels=paint.getImageData(0,0,1024,1536).data,rearPixels=rear.getImageData(0,0,1024,1536).data;
 function opaqueUv(data,x,y){const row=Math.max(0,Math.min(1535,Math.round(y*1535))),col=Math.max(0,Math.min(1023,Math.round(x*1023)));if(data[(row*1024+col)*4+3]>220)return x;for(let d=1;d<180;d++)for(const px of [col-d,col+d])if(px>=0&&px<1024&&data[(row*1024+px)*4+3]>220)return px/1023;return x;}
 const photo=new T.CanvasTexture(sample),back=new T.CanvasTexture(rearCanvas),profile=new T.CanvasTexture(sideCanvas);for(const tex of [photo,back,profile]){tex.colorSpace=T.SRGBColorSpace;tex.anisotropy=4;}
 const shorts=G.wardrobeSubcategory('pants',look.pants)==='shorts',tank=look.suit?.endsWith('Tank'),tee=look.suit?.endsWith('Tee'),club=['classic','ruby','midnight'].includes(look.suit),helmetOn=!!look.helmet&&look.helmet!=='none';
 const material=new T.ShaderMaterial({uniforms:{helmetColor:{value:new T.Color(look.helmet==='formulaCrimson'?'#b82e38':look.helmet==='formulaGold'?'#e9dec3':'#ccd1d4')},helmetStripe:{value:new T.Color(look.helmet==='formulaGold'?'#b48e3d':look.helmet==='formulaCrimson'?'#151b20':'#a50408')},idleTime:{value:0},idleStrength:{value:0},palmPattern:{value:look.suit==='palmTank'?1:0},hairChanged:{value:!helmetOn&&(!look.hat||look.hat==='none')&&look.hair&&look.hair!=='hairNatural'?1:0},helmetOn:{value:helmetOn?1:0},shorts:{value:shorts?1:0},sleeveEnd:{value:tank?.165:tee?.29:.49},club:{value:club?1:0},portrait:{value:photo},rear:{value:back},profile:{value:profile},jacketColor:{value:new T.Color(G.item('suit',look.suit).color)},pantsColor:{value:new T.Color(G.item('pants',look.pants).color)},shoeColor:{value:new T.Color(G.item('shoes',look.shoes).color)}},side:T.DoubleSide,vertexShader:`
#include <common>
#include <skinning_pars_vertex>
attribute vec2 bodyUv;attribute float surface;attribute float frontWeight;attribute vec2 rearUv;attribute vec2 profileUv;
varying vec3 vRestPosition;varying vec2 vBodyUv;varying float vSurface;varying vec2 vRearUv;varying vec2 vProfileUv;varying vec2 vUv;varying float vFront;varying vec3 vNormal;
void main(){vRestPosition=position;vBodyUv=bodyUv;vSurface=surface;vUv=uv;vRearUv=rearUv;vProfileUv=profileUv;vFront=frontWeight;
#include <skinbase_vertex>
#include <beginnormal_vertex>
#include <skinnormal_vertex>
vNormal=normalMatrix*objectNormal;
#include <begin_vertex>
#include <skinning_vertex>
gl_Position=projectionMatrix*modelViewMatrix*vec4(transformed,1.);
}`,fragmentShader:`uniform float palmPattern;uniform float hairChanged;uniform vec3 helmetColor;uniform vec3 helmetStripe;uniform float helmetOn;uniform float shorts;uniform float sleeveEnd;uniform float club;uniform sampler2D portrait;uniform sampler2D rear;uniform sampler2D profile;uniform vec3 jacketColor;uniform vec3 pantsColor;uniform vec3 shoeColor;varying vec3 vRestPosition;varying vec2 vBodyUv;varying float vSurface;varying vec2 vRearUv;varying vec2 vProfileUv;varying vec2 vUv;varying float vFront;varying vec3 vNormal;float hash3(vec3 p){p=fract(p*.1031);p+=dot(p,p.yzx+33.33);return fract((p.x+p.y)*p.z);}
float noise3(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash3(i),hash3(i+vec3(1,0,0)),f.x),mix(hash3(i+vec3(0,1,0)),hash3(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash3(i+vec3(0,0,1)),hash3(i+vec3(1,0,1)),f.x),mix(hash3(i+vec3(0,1,1)),hash3(i+vec3(1,1,1)),f.x),f.y),f.z);}
vec3 furColor(){
 // Object-space noise keeps fur continuous around the limb and through rotation.
 vec3 p=vRestPosition;
 float tufts=noise3(p*vec3(38.,13.,38.));
 float strands=noise3(p*vec3(145.,25.,145.));
 float broad=noise3(p*vec3(7.,10.,7.));
 return mix(vec3(.018,.012,.008),vec3(.075,.047,.028),.48*tufts+.32*strands+.20*broad);
}
vec3 tint(vec3 c,float y){if(c.g>c.r*1.20&&c.g>c.b*1.15){vec3 target=y>.83?shoeColor:y>.46?pantsColor:jacketColor;float lum=dot(c,vec3(.2126,.7152,.0722));return target*clamp(lum/.13,.12,2.); }return c;}vec3 dressed(vec3 c,float y,float x){
 if(vSurface>8.5)return vec3(.85,.86,.84);
 if(vSurface>7.5){float tread=.90+.055*sin(x*460.)*sin(y*900.);return vec3(.78,.79,.77)*tread;}
 if(vSurface>4.5&&vSurface<5.5){float sole=smoothstep(.968,.978,y);float upperPanel=smoothstep(.90,.92,y)*(1.-smoothstep(.94,.96,y));vec3 leather=mix(shoeColor*.82,shoeColor*.64,upperPanel);float stitch=1.-.12*exp(-pow((y-.945)/.0025,2.));return mix(leather*stitch,vec3(.78,.79,.77),sole);}
 if(vSurface>6.5&&vSurface<7.5&&y>.19)return jacketColor*.75;
 float arm=step(1.5,vSurface)*(1.-step(2.5,vSurface));
 float legs=step(3.5,vSurface)*(1.-step(4.5,vSurface));
 if(vSurface>5.5&&vSurface<6.5&&helmetOn>.5){float stripe=1.-smoothstep(.017,.024,abs(x-.505));vec3 shell=mix(helmetColor,helmetStripe,stripe);float visorBand=smoothstep(.045,.055,y)*(1.-smoothstep(.098,.112,y))*smoothstep(-.65,.15,vFront);shell=mix(shell,vec3(.025,.035,.045),visorBand);float vent=step(.105,y)*(1.-step(.155,y))*(1.-smoothstep(.08,.11,abs(x-.505)));return shell*(1.-vent*.38);}
 if(vSurface>2.5&&vSurface<3.5){
 float pores=noise3(vRestPosition*95.);
 float backOfHand=(1.-smoothstep(.50,.53,y));
 return mix(vec3(.32,.19,.125)*(.87+.20*pores),furColor(),backOfHand*.8);
 }
 if((legs>.5&&shorts>.5&&y>.65)||(arm>.5&&y>sleeveEnd)){
  // Photograph projection on the sides stretches a narrow strip into bands.
  // Use directional fur shading there; keep the portrait on the front only.
  return furColor();
 }
 if(vSurface<1.5||(arm>.5&&y<sleeveEnd)){float weave=.81+.008*sin(y*85.)*sin(x*110.);float seam=1.-.10*exp(-pow((x-.505)/.003,2.));float fabricShade=.98+.025*sin(y*65.+x*18.);vec3 fabric=jacketColor*weave*seam*fabricShade;
 if(palmPattern>.5){vec2 p=fract(vec2(x*12.,y*19.))-.5;float trunk=(1.-smoothstep(.012,.026,abs(p.x+.05*p.y)))*step(-.27,p.y)*(1.-step(.13,p.y));float leaves=0.;for(int k=0;k<6;k++){float a=float(k)*.62+.1;vec2 d=vec2(cos(a),sin(a));float along=dot(p-vec2(0.,.1),d);float crossD=abs(dot(p-vec2(0.,.1),vec2(-d.y,d.x)));leaves=max(leaves,(1.-smoothstep(.014,.035,crossD))*step(0.,along)*(1.-smoothstep(.13,.23,along)));}fabric=mix(fabric,vec3(.62,.76,.69),max(trunk,leaves)*.65);}
 return fabric;}
 if(legs>.5&&y<(shorts>.5?.65:.85)){float fold=.83+.025*sin(x*44.+y*14.);float inseam=1.-.09*exp(-pow((abs(x-.5)-.07)/.008,2.));fold*=inseam;
 float pocketX=abs(x-.5),pocketY=y-.527;
 float pocketSides=(1.-smoothstep(.001,.0025,min(abs(pocketX-.065),abs(pocketX-.135))))*step(-.024,pocketY)*(1.-step(.024,pocketY));
 float pocketEnds=(1.-smoothstep(.001,.0025,abs(abs(pocketY)-.024)))*step(.065,pocketX)*(1.-step(.135,pocketX));
 fold*=1.-.16*max(pocketSides,pocketEnds)*(1.-smoothstep(-.6,0.,vFront));
 return pantsColor*fold;}return c;
}void main(){vec4 a=texture2D(portrait,vUv);vec3 b=tint(texture2D(rear,vRearUv).rgb,1.-vUv.y);vec3 s=tint(texture2D(profile,vProfileUv).rgb,1.-vUv.y);b=dressed(b,vBodyUv.y,vBodyUv.x);s=dressed(s,vBodyUv.y,vBodyUv.x);float f=smoothstep(.38,.86,vFront)*a.a;float shoe=step(4.5,vSurface)*(1.-step(5.5,vSurface));float sole=step(7.5,vSurface);float bareArm=step(1.5,vSurface)*(1.-step(2.5,vSurface))*step(sleeveEnd,vBodyUv.y);
 float bareLeg=step(3.5,vSurface)*(1.-step(4.5,vSurface))*shorts*step(.65,vBodyUv.y);
 f*=1.-max(max(shoe,sole),max(bareArm,bareLeg)*.70);f*=1.-bareLeg*step(.85,vBodyUv.y);vec3 n=normalize(vNormal);vec3 lamp=normalize(vec3(-.55,.85,1.));float light=.62+.34*max(0.,dot(n,lamp))+.09*max(0.,dot(n,normalize(vec3(.7,.2,-1.))));float underArm=exp(-pow((abs(vBodyUv.x-.5)-.19)/.025,2.))*exp(-pow((vBodyUv.y-.30)/.11,2.));float collar=exp(-pow((vBodyUv.y-.192)/.018,2.))*exp(-pow((vBodyUv.x-.5)/.09,2.));light*=1.-.13*underArm-.12*collar;vec3 color=mix(b,a.rgb,f);float sideAmount=(1.-smoothstep(.05,.72,abs(vFront)))*step(5.5,vSurface)*(1.-step(6.5,vSurface))*(1.-helmetOn);color=mix(color,s,sideAmount);
 float scalp=step(5.5,vSurface)*(1.-step(6.5,vSurface))*hairChanged*(1.-helmetOn);
 float crown=1.-smoothstep(.034,.054,vBodyUv.y);
 float rearScalp=(1.-smoothstep(-.1,.35,vFront))*(1.-smoothstep(.075,.115,vBodyUv.y));
 color=mix(color,vec3(.18,.105,.060)*(.86+.24*noise3(vRestPosition*90.)),scalp*max(crown,rearScalp));color*=light;float hardSurface=step(4.5,vSurface)*(1.-step(6.5,vSurface));float gloss=mix(.025,.16,hardSurface);float highlight=pow(max(0.,dot(reflect(-lamp,n),vec3(0.,0.,1.))),mix(14.,48.,hardSurface));float rim=pow(1.-abs(n.z),3.)*.045;color+=vec3(1.,.90,.75)*(highlight*gloss+rim);gl_FragColor=vec4(color,1.);
#include <colorspace_fragment>
}`});
 const root=new T.Group(),geometries=[],rig=createCharacterRig(root),shape=characterShape(look.body);
 // Ring sections describe width and depth separately, so every limb has a
 // rounded cross-section instead of a silhouette extruded as one flat slab.
 function part(keys,{rings=70,sides=80,muzzle=false,folds=0,z=0,surface=0}={}){
  const pos=[],uv=[],rearUv=[],profileUv=[],weight=[],bodyUv=[],surfaces=[],idx=[];const y0=keys[0][0],y1=keys.at(-1)[0];
  function section(t){let k=0;while(k<keys.length-2&&keys[k+1][0]<t)k++;const a=keys[k],b=keys[k+1],f=Math.max(0,Math.min(1,(t-a[0])/(b[0]-a[0])));return a.map((v,i)=>{if(i===0)return t;const p=keys[Math.max(0,k-1)][i]||0,q=keys[Math.min(keys.length-1,k+2)][i]||0,bv=b[i]||0;return Math.max(Math.min(v,bv),Math.min(Math.max(v,bv),.5*((2*v)+(-p+bv)*f+(2*p-5*v+4*bv-q)*f*f+(-p+3*v-3*bv+q)*f*f*f)));});}
  for(let j=0;j<=rings;j++){const y=y0+(y1-y0)*j/rings,[,left,right,depth,shift=0]=section(y),center=(left+right)/2,radius=(right-left)/2;
   for(let n=0;n<=sides;n++){const angle=2*Math.PI*n/sides,cs=Math.cos(angle),sn=Math.sin(angle),x=center+radius*cs;const clothed=surface===1||(surface===2&&y<(tank?.165:tee?.29:.49))||(surface===4&&(!shorts||y<.65));let d=depth*(1+(clothed?folds:0)*Math.sin(y*65+angle*3)*Math.sin(Math.PI*j/rings));let zz=z+shift+d*sn;
    if(muzzle&&sn>0){const nx=(x-.507)/.085;zz+=.17*Math.exp(-(nx*nx)-((y-.126)/.031)**2)*sn*sn;zz+=.045*Math.exp(-(((x-.505)/.05)**2)-((y-.104)/.015)**2)*sn;zz-=.028*(Math.exp(-(((x-.466)/.024)**2))+Math.exp(-(((x-.55)/.024)**2)))*Math.exp(-(((y-.077)/.013)**2))*sn;}
    const shaped=shape(((surface===5?center+(x-center)*.88:x)-.5)*2.55,y,surface===5?zz*.84:zz,surface);if(muzzle&&look.hair&&look.hair!=='hairNatural'&&y<.065){const crown=1-y/.065;shaped[0]*=1-.12*crown;shaped[2]=.1+(shaped[2]-.1)*(1-.10*crown);shaped[1]+=.008*crown;}pos.push(shaped[0],(.5-shaped[1])*3.825,shaped[2]);bodyUv.push(x,y);surfaces.push(surface);let textureX=x,textureY=y;if(surface===3){const palmX=x<.5?.20:.80;textureX=palmX+(x-(left+right)/2)*.45;textureY=Math.min(y,.545);}uv.push(opaqueUv(frontPixels,textureX,textureY),1-textureY);
    let rearY=y,rearX=x;
    if(muzzle)rearY=.008+(y-.008)*.74;
    else if(y0<.24&&y1>.4&&left>.29&&right<.72)rearY=.14+(y-.165)*1.08;
    if(y0>.82)rearX=center+(x-center)*.80;
    rearUv.push(opaqueUv(rearPixels,rearX,rearY),1-rearY);
    const sideY=muzzle?y*.92:y;let sideX=(muzzle?.45:.49)+zz*.40;if(y0>=.45&&y1>.62&&y>.49&&y<.62)sideX=Math.min(sideX,.43);profileUv.push(opaqueUv(sidePixels,sideX,sideY),1-sideY);weight.push(sn);
    if(j<rings&&n<sides){const a=j*(sides+1)+n,b=a+sides+1;idx.push(a,a+1,b,a+1,b+1,b);}
   }
  }
  for(const end of [0,rings]){const start=end*(sides+1),centerIndex=pos.length/3;for(const [array,size] of [[pos,3],[uv,2],[rearUv,2],[profileUv,2],[bodyUv,2]]){for(let component=0;component<size;component++){let sum=0;for(let n=0;n<sides;n++)sum+=array[(start+n)*size+component];array.push(sum/sides);}}surfaces.push(surface);weight.push(0);for(let n=0;n<sides;n++){if(end===0)idx.push(centerIndex,start+n+1,start+n);else idx.push(centerIndex,start+n,start+n+1);}}
  const geo=new T.BufferGeometry();geo.setAttribute('bodyUv',new T.Float32BufferAttribute(bodyUv,2));geo.setAttribute('surface',new T.Float32BufferAttribute(surfaces,1));geo.setAttribute('position',new T.Float32BufferAttribute(pos,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setAttribute('rearUv',new T.Float32BufferAttribute(rearUv,2));geo.setAttribute('profileUv',new T.Float32BufferAttribute(profileUv,2));geo.setAttribute('frontWeight',new T.Float32BufferAttribute(weight,1));geo.setIndex(idx);geo.computeVertexNormals();rig.mesh(geo,material);geometries.push(geo);
 }
 // Torso, neck and skull follow the portrait's proportions.
 part([[.165,.435,.575,.10],[.19,tank?.405:.35,tank?.605:.65,tank?.15:.21],[.245,tank?.335:.313,tank?.675:.69,.235],[.32,.33,.68,.225],[.40,.33,.67,.21],[.455,.33,.67,.195],[.475,.37,.63,.18]],{folds:.025,surface:1});
 part([[.13,.45,.56,.12],[.18,.425,.59,.17],[.23,.45,.57,.12]],{z:.035,rings:36,surface:7});
 part(helmetOn?[[.005,.49,.525,.02],[.025,.432,.58,.19],[.06,.405,.61,.31],[.10,.397,.617,.32],[.15,.416,.60,.30],[.18,.445,.577,.24],[.195,.48,.545,.13]]:[[.008,.49,.515,.015],[.018,.445,.56,.13],[.045,.414,.59,.25],[.075,.399,.61,.285],[.115,.367,.61,.29],[.155,.35,.624,.26],[.183,.428,.586,.17],[.195,.492,.53,.025]],{muzzle:!helmetOn,z:.10,rings:110,sides:112,surface:6});
 // Helmets replace the ears as well as the front face.
 if(!helmetOn){
 // Ears have independent volume and sit behind the cheek fur.
 part([[.041,.376,.391,.01],[.05,.36,.405,.05],[.072,.357,.407,.065],[.09,.37,.405,.047],[.097,.39,.399,.005]],{z:.055,rings:35,surface:6});
 part([[.055,.614,.627,.008],[.064,.60,.638,.045],[.083,.599,.638,.06],[.102,.602,.627,.035],[.109,.61,.617,.005]],{z:.045,rings:35,surface:6});
 }
 // Each arm, cuff and hand is separate from the jacket body.
 for(const side of [-1,1]){const mirror=keys=>side<0?keys:keys.map(([y,l,r,d,z])=>[y,1-r,1-l,d,z||0]);
  part(mirror([[.175,.318,.363,.065],[.20,.26,.35,.13],[.255,.22,.328,.145],[.305,.194,.305,.121,.005],[.34,.185,.283,.103,-.018],[.375,.170,.272,.132,.004],[.41,.153,.256,.128,.018],[.455,.149,.241,.100,.018],[.49,.158,.230,.079,.010]]),{z:-.025,folds:.025,rings:100,surface:2});
  if(!tee&&!tank)part(mirror([[.466,.151,.233,.105],[.48,.146,.233,.11],[.495,.151,.229,.092]]),{folds:.025,rings:22,surface:2});
  else if(tee)part(mirror([[.279,.205,.317,.143],[.288,.201,.314,.144]]),{z:-.025,rings:8,surface:2});
  if(club)part(mirror([[.491,.156,.227,.084],[.500,.159,.225,.080]]),{z:.005,rings:8,surface:9});
  part(mirror([[.478,.168,.221,.055],[.493,.151,.23,.08],[.515,.151,.241,.082],[.531,.153,.245,.086],[.545,.165,.241,.066],[.553,.184,.231,.025]]),{z:.035,rings:60,folds:.018,surface:3});
  // Four rounded finger tips and the opposed thumb provide the profile anatomy.
  for(let n=0;n<4;n++){const l=.166+n*.019,top=.540+n*.002,length=[.039,.046,.043,.034][n];part(mirror([[top,l,l+.019,.024,0],[top+length*.35,l-.001,l+.020,.025,.008],[top+length*.72,l+.001,l+.018,.021,.026],[top+length,l+.005,l+.014,.007,.035]]),{z:.07,rings:22,sides:24,surface:3});}
  part(mirror([[.525,.239,.252,.018],[.541,.239,.267,.032],[.562,.239,.262,.026],[.57,.244,.252,.006]]),{z:.11,rings:20,sides:30,surface:3});
 }
 // Pelvis and two independent trouser legs.
 part([[.454,.36,.65,.17],[.48,.313,.69,.205],[.53,.30,.703,.215],[.58,.31,.69,.205],[.595,.46,.54,.09],[.608,.495,.505,.003]],{z:-.035,folds:.025,surface:4});
 for(const side of [-1,1]){const mirror=keys=>side<0?keys:keys.map(([y,l,r,d,z])=>[y,1-r,1-l,d,z||0]);
  part(mirror([[.55,.296,.50,.20],[.61,.283,.468,.205],[.68,shorts?.302:.271,shorts?.428:.44,shorts?.14:.19],[.72,shorts?.292:.262,shorts?.416:.432,shorts?.155:.19],[.77,shorts?.286:.247,shorts?.396:.41,shorts?.135:.175],[.81,shorts?.294:.248,shorts?.387:.393,shorts?.115:.16],[.843,shorts?.300:.270,shorts?.379:.385,shorts?.095:.13],[.884,.304,.368,.078],[.920,.308,.361,.070]]),{z:-.01,folds:.012,rings:110,surface:4});
  // Low-top sneakers: rounded toe, shallow vamp and a separate heel collar.
  // The old upper rose to mid-shin, producing a triangular boot in profile.
  part(mirror([[.893,.304,.352,.075,-.015],[.908,.284,.373,.12,.015],[.929,.269,.386,.215,.095],[.950,.263,.389,.275,.145],[.963,.265,.387,.281,.15],[.972,.272,.380,.267,.15]]),{z:.015,rings:54,surface:5});
  part(mirror([[.968,.269,.383,.269,.15],[.974,.265,.387,.277,.15],[.982,.267,.385,.272,.15],[.986,.276,.376,.251,.15]]),{z:.015,rings:14,surface:8});
 }
 const tailoring=addCharacterTailoring(rig,look,G),hair=addCharacterHair(rig,look);
 const ring=look.ring&&look.ring!=='none'?fingerRing(G.item('ring',look.ring).color):null;if(ring){root.add(ring.group);rig.attach(ring.group,'rightHand');}
 const watch=look.watch&&look.watch!=='none'?wristWatch(look.watch,G.item('watch',look.watch).color):null;if(watch){root.add(watch.group);rig.attach(watch.group,'rightWrist');}
 const scene=new T.Scene();scene.add(root);{scene.add(new T.HemisphereLight('#fff0d4','#283849',2.1));const key=new T.DirectionalLight('#fff0dc',3.5);key.position.set(-2,4,5);scene.add(key);const fill=new T.DirectionalLight('#9cc3ed',1.2);fill.position.set(3,1,-2);scene.add(fill);}const renderer=new T.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=T.SRGBColorSpace;host.append(renderer.domElement);renderer.domElement.setAttribute('role','img');renderer.domElement.setAttribute('aria-label','Объёмный Покерманки: вращайте перетаскиванием');
 const camera=new T.OrthographicCamera(-1.5,1.5,2.05,-2.05,.1,30);camera.position.set(0,0,8);let yaw=state.yaw||0,pitch=state.pitch||0,drag=null,raf,disposed=false,autoRotate=false,lastTime=0;
 const reducedMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)');
 let focus='full',savedOrbit=state.focusOrbit||null,viewHalf=2.05,viewX=0,viewY=0;
 function setFocus(next){next=next==='watch'?'watch':'full';if(next===focus)return;if(next==='watch'){savedOrbit=savedOrbit||{yaw,pitch};state.focusOrbit=savedOrbit;yaw=0;pitch=0;}else if(savedOrbit){yaw=savedOrbit.yaw;pitch=savedOrbit.pitch;savedOrbit=null;delete state.focusOrbit;}state.yaw=yaw;state.pitch=pitch;focus=next;host.dataset.focus=focus;}
 function frameCamera(dt){const aspect=host.clientWidth/Math.max(1,host.clientHeight),close=focus==='watch',half=close?Math.max(.40,.30/aspect):Math.max(2.40,1.17/aspect),x=close?.76*Math.cos(yaw)+.10*Math.sin(yaw):0,y=close?.04*Math.cos(pitch)-(.10*Math.cos(yaw)-.76*Math.sin(yaw))*Math.sin(pitch):-.22,blend=1-Math.exp(-dt*12);viewHalf+=(half-viewHalf)*blend;viewX+=(x-viewX)*blend;viewY+=(y-viewY)*blend;camera.left=viewX-viewHalf*aspect;camera.right=viewX+viewHalf*aspect;camera.top=viewY+viewHalf;camera.bottom=viewY-viewHalf;camera.updateProjectionMatrix();}
 const fit=()=>{if(!host.clientWidth||!host.clientHeight)return;frameCamera(1);renderer.setSize(host.clientWidth,host.clientHeight,false);};const resize=new ResizeObserver(fit);resize.observe(host);fit();
 const down=e=>{autoRotate=false;drag={id:e.pointerId,x:e.clientX,y:e.clientY};host.setPointerCapture(e.pointerId);e.preventDefault();};const move=e=>{if(!drag||drag.id!==e.pointerId)return;yaw+=(e.clientX-drag.x)*.012;pitch=Math.max(-.35,Math.min(.35,pitch+(e.clientY-drag.y)*.006));drag.x=e.clientX;drag.y=e.clientY;};const up=()=>{drag=null;};const key=e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){yaw+=e.key==='ArrowLeft'?-.15:.15;e.preventDefault();}};host.addEventListener('pointerdown',down);host.addEventListener('pointermove',move);host.addEventListener('pointerup',up);host.addEventListener('pointercancel',up);host.addEventListener('keydown',key);
 function tick(time=0){if(disposed)return;if(!host.isConnected){dispose();return;}if(autoRotate&&!drag&&lastTime)yaw+=Math.min(.05,(time-lastTime)/1000)*.35;material.uniforms.idleTime.value=time/1000;material.uniforms.idleStrength.value=!reducedMotion?.matches&&!drag&&focus==='full'?1:0;const dt=lastTime?Math.min(.05,(time-lastTime)/1000):.016;rig.update(time/1000,material.uniforms.idleStrength.value,dt);frameCamera(dt);lastTime=time;root.rotation.set(pitch,yaw,0);state.yaw=yaw;state.pitch=pitch;host.dataset.yaw=String(yaw);renderer.render(scene,camera);raf=requestAnimationFrame(tick);}tick();return {state,setFocus,setYaw(v){yaw=v;},setAutoRotate(v){autoRotate=!!v;},dispose};function dispose(){if(disposed)return;disposed=true;cancelAnimationFrame(raf);resize.disconnect();for(const [event,fn]of [['pointerdown',down],['pointermove',move],['pointerup',up],['pointercancel',up],['keydown',key]])host.removeEventListener(event,fn);for(const geo of geometries)geo.dispose();watch?.dispose();ring?.dispose();tailoring.dispose();hair.dispose();rig.dispose();material.dispose();photo.dispose();back.dispose();profile.dispose();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();}
}
