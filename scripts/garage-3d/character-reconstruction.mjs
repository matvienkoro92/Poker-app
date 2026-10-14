import * as T from '../../vendor/three/three.module.min.js';
// Anatomical reconstruction from the club portrait. Front appearance is sampled
// from the wardrobe renderer; unseen anatomy and rear textiles are authored here.
export async function createCharacterStudy(host,look){
 const G=window.PokerGarage,source=new Image();source.src='./assets/player-hall/standing-monkey-v1.webp';await source.decode();await G.loadWardrobe(look);
 const art=G.renderCharacter(source,look),sample=document.createElement('canvas');sample.width=1024;sample.height=1536;const paint=sample.getContext('2d',{willReadFrequently:true});paint.drawImage(art,0,0,1024,1536);
 const rearSource=new Image();rearSource.src='./assets/player-hall/character-3d/club-rear-v1.png';await rearSource.decode();
 const rearCanvas=document.createElement('canvas');rearCanvas.width=1024;rearCanvas.height=1536;const rear=rearCanvas.getContext('2d');rear.drawImage(rearSource,0,0,1024,1536);
 const sideSource=new Image();sideSource.src='./assets/player-hall/character-3d/club-side-v1.png';await sideSource.decode();const sideCanvas=document.createElement('canvas');sideCanvas.width=1024;sideCanvas.height=1536;const sideContext=sideCanvas.getContext('2d');sideContext.drawImage(sideSource,0,0,1024,1536);const sidePixels=sideContext.getImageData(0,0,1024,1536).data;
 const frontPixels=paint.getImageData(0,0,1024,1536).data,rearPixels=rear.getImageData(0,0,1024,1536).data;
 function opaqueUv(data,x,y){const row=Math.max(0,Math.min(1535,Math.round(y*1535))),col=Math.max(0,Math.min(1023,Math.round(x*1023)));if(data[(row*1024+col)*4+3]>220)return x;for(let d=1;d<180;d++)for(const px of [col-d,col+d])if(px>=0&&px<1024&&data[(row*1024+px)*4+3]>220)return px/1023;return x;}
 const photo=new T.CanvasTexture(art),back=new T.CanvasTexture(rearCanvas),profile=new T.CanvasTexture(sideCanvas);for(const tex of [photo,back,profile]){tex.colorSpace=T.SRGBColorSpace;tex.anisotropy=4;}
 const material=new T.ShaderMaterial({uniforms:{portrait:{value:photo},rear:{value:back},profile:{value:profile},jacketColor:{value:new T.Color(G.item('suit',look.suit).color)},pantsColor:{value:new T.Color(G.item('pants',look.pants).color)},shoeColor:{value:new T.Color(G.item('shoes',look.shoes).color)}},side:T.DoubleSide,vertexShader:`attribute float frontWeight;attribute vec2 rearUv;attribute vec2 profileUv;varying vec2 vRearUv;varying vec2 vProfileUv;varying vec2 vUv;varying float vFront;varying vec3 vNormal;void main(){vUv=uv;vRearUv=rearUv;vProfileUv=profileUv;vFront=frontWeight;vNormal=normalMatrix*normal;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`uniform sampler2D portrait;uniform sampler2D rear;uniform sampler2D profile;uniform vec3 jacketColor;uniform vec3 pantsColor;uniform vec3 shoeColor;varying vec2 vRearUv;varying vec2 vProfileUv;varying vec2 vUv;varying float vFront;varying vec3 vNormal;vec3 tint(vec3 c,float y){if(c.g>c.r*1.20&&c.g>c.b*1.15){vec3 target=y>.83?shoeColor:y>.46?pantsColor:jacketColor;float lum=dot(c,vec3(.2126,.7152,.0722));return target*clamp(lum/.13,.12,2.); }return c;}void main(){vec4 a=texture2D(portrait,vUv);vec3 b=tint(texture2D(rear,vRearUv).rgb,1.-vUv.y);vec3 s=tint(texture2D(profile,vProfileUv).rgb,1.-vUv.y);float f=smoothstep(.03,.52,vFront)*a.a;vec3 n=normalize(vNormal);float light=.90+.10*max(0.,dot(n,normalize(vec3(-.5,.8,1.))));vec3 color=mix(b,a.rgb,f);float sideAmount=1.-smoothstep(.05,.72,abs(vFront));color=mix(color,s,sideAmount)*light;gl_FragColor=vec4(color,1.);
#include <colorspace_fragment>
}`});
 const root=new T.Group(),geometries=[];
 // Ring sections describe width and depth separately, so every limb has a
 // rounded cross-section instead of a silhouette extruded as one flat slab.
 function part(keys,{rings=70,sides=80,muzzle=false,folds=0,z=0}={}){
  const pos=[],uv=[],rearUv=[],profileUv=[],weight=[],idx=[];const y0=keys[0][0],y1=keys.at(-1)[0];
  function section(t){let k=0;while(k<keys.length-2&&keys[k+1][0]<t)k++;const a=keys[k],b=keys[k+1],f=Math.max(0,Math.min(1,(t-a[0])/(b[0]-a[0])));return a.map((v,i)=>{if(i===0)return t;const p=keys[Math.max(0,k-1)][i]||0,q=keys[Math.min(keys.length-1,k+2)][i]||0,bv=b[i]||0;return Math.max(Math.min(v,bv),Math.min(Math.max(v,bv),.5*((2*v)+(-p+bv)*f+(2*p-5*v+4*bv-q)*f*f+(-p+3*v-3*bv+q)*f*f*f)));});}
  for(let j=0;j<=rings;j++){const y=y0+(y1-y0)*j/rings,[,left,right,depth,shift=0]=section(y),center=(left+right)/2,radius=(right-left)/2;
   for(let n=0;n<=sides;n++){const angle=2*Math.PI*n/sides,cs=Math.cos(angle),sn=Math.sin(angle),x=center+radius*cs;let d=depth*(1+folds*Math.sin(y*260+angle*4)*Math.sin(Math.PI*j/rings));let zz=z+shift+d*sn;
    if(muzzle&&sn>0){const nx=(x-.507)/.085;zz+=.17*Math.exp(-(nx*nx)-((y-.126)/.031)**2)*sn*sn;zz+=.045*Math.exp(-(((x-.505)/.05)**2)-((y-.104)/.015)**2)*sn;zz-=.028*(Math.exp(-(((x-.466)/.024)**2))+Math.exp(-(((x-.55)/.024)**2)))*Math.exp(-(((y-.077)/.013)**2))*sn;}
    pos.push((x-.5)*2.55,(.5-y)*3.825,zz);uv.push(opaqueUv(frontPixels,x,y),1-y);
    let rearY=y,rearX=x;
    if(muzzle)rearY=.008+(y-.008)*.74;
    else if(y0<.24&&y1>.4&&left>.29&&right<.72)rearY=.14+(y-.165)*1.08;
    if(y0>.82)rearX=center+(x-center)*.80;
    rearUv.push(opaqueUv(rearPixels,rearX,rearY),1-rearY);
    const sideY=muzzle?y*.92:y;let sideX=(muzzle?.45:.49)+zz*.40;if(y0>=.45&&y1>.62&&y>.49&&y<.62)sideX=Math.min(sideX,.43);profileUv.push(opaqueUv(sidePixels,sideX,sideY),1-sideY);weight.push(sn);
    if(j<rings&&n<sides){const a=j*(sides+1)+n,b=a+sides+1;idx.push(a,a+1,b,a+1,b+1,b);}
   }
  }
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(pos,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setAttribute('rearUv',new T.Float32BufferAttribute(rearUv,2));geo.setAttribute('profileUv',new T.Float32BufferAttribute(profileUv,2));geo.setAttribute('frontWeight',new T.Float32BufferAttribute(weight,1));geo.setIndex(idx);geo.computeVertexNormals();root.add(new T.Mesh(geo,material));geometries.push(geo);
 }
 // Torso, neck and skull follow the portrait's proportions.
 part([[.165,.435,.575,.10],[.19,.35,.65,.21],[.245,.313,.69,.28],[.32,.32,.69,.28],[.40,.31,.69,.255],[.455,.315,.68,.225],[.475,.37,.63,.18]],{folds:.025});
 part([[.13,.45,.56,.12],[.18,.425,.59,.17],[.23,.45,.57,.12]],{z:.035,rings:36});
 part([[.008,.49,.515,.015],[.018,.445,.56,.13],[.045,.414,.59,.25],[.075,.399,.61,.285],[.115,.367,.61,.29],[.155,.35,.624,.26],[.183,.428,.586,.17],[.195,.492,.53,.025]],{muzzle:true,z:.10,rings:110,sides:112});
 // Ears have independent volume and sit behind the cheek fur.
 part([[.041,.376,.391,.01],[.05,.36,.405,.05],[.072,.357,.407,.065],[.09,.37,.405,.047],[.097,.39,.399,.005]],{z:.055,rings:35});
 part([[.055,.614,.627,.008],[.064,.60,.638,.045],[.083,.599,.638,.06],[.102,.602,.627,.035],[.109,.61,.617,.005]],{z:.045,rings:35});
 // Each arm, cuff and hand is separate from the jacket body.
 for(const side of [-1,1]){const mirror=keys=>side<0?keys:keys.map(([y,l,r,d,z])=>[y,1-r,1-l,d,z||0]);
  part(mirror([[.175,.324,.35,.02],[.20,.26,.35,.13],[.255,.22,.328,.145],[.32,.185,.303,.15],[.37,.167,.276,.135],[.43,.141,.254,.13],[.475,.145,.234,.105],[.49,.153,.23,.085]]),{z:-.025,folds:.025,rings:100});
  part(mirror([[.466,.151,.233,.105],[.48,.146,.233,.11],[.495,.151,.229,.092]]),{folds:.025,rings:22});
  part(mirror([[.478,.168,.221,.055],[.493,.151,.23,.08],[.525,.146,.251,.09],[.554,.153,.263,.085],[.58,.166,.251,.065],[.60,.195,.234,.025]]),{z:.035,rings:60,folds:.018});
  // Four rounded finger tips and the opposed thumb provide the profile anatomy.
  for(let n=0;n<4;n++){const l=.166+n*.018,top=.55+n*.004;part(mirror([[top,l,l+.019,.025],[top+.025,l-.002,l+.02,.028],[top+.041,l+.003,l+.017,.007]]),{z:.07,rings:18,sides:24});}
  part(mirror([[.525,.239,.252,.018],[.541,.239,.267,.032],[.562,.239,.262,.026],[.57,.244,.252,.006]]),{z:.11,rings:20,sides:30});
 }
 // Pelvis and two independent trouser legs.
 part([[.454,.36,.65,.17],[.48,.303,.70,.24],[.53,.29,.713,.25],[.58,.30,.70,.23],[.595,.46,.54,.09],[.608,.495,.505,.003]],{z:-.035,folds:.025});
 for(const side of [-1,1]){const mirror=keys=>side<0?keys:keys.map(([y,l,r,d,z])=>[y,1-r,1-l,d,z||0]);
  part(mirror([[.55,.296,.50,.20],[.61,.283,.468,.205],[.68,.271,.44,.19],[.74,.252,.423,.185],[.79,.242,.397,.165],[.826,.254,.39,.155],[.843,.27,.379,.12]]),{z:-.01,folds:.025,rings:110});
  part(mirror([[.829,.275,.373,.095],[.848,.27,.389,.135],[.875,.25,.394,.19],[.907,.207,.397,.245],[.944,.165,.40,.285],[.966,.154,.393,.255],[.98,.18,.37,.16],[.986,.26,.31,.01]]),{z:.10,folds:.014,rings:85});
 }
 const scene=new T.Scene();scene.add(root);const renderer=new T.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=T.SRGBColorSpace;host.append(renderer.domElement);renderer.domElement.setAttribute('role','img');renderer.domElement.setAttribute('aria-label','Объёмный Покерманки: вращайте перетаскиванием');
 const camera=new T.OrthographicCamera(-1.5,1.5,2.05,-2.05,.1,30);camera.position.set(0,0,8);let yaw=0,pitch=0,drag=null,raf,disposed=false,autoRotate=false,lastTime=0;
 const fit=()=>{if(!host.clientWidth||!host.clientHeight)return;const aspect=host.clientWidth/host.clientHeight,half=Math.max(2.05,1.17/aspect);camera.left=-half*aspect;camera.right=half*aspect;camera.top=half;camera.bottom=-half;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight,false);};const resize=new ResizeObserver(fit);resize.observe(host);fit();
 const down=e=>{autoRotate=false;drag={id:e.pointerId,x:e.clientX,y:e.clientY};host.setPointerCapture(e.pointerId);e.preventDefault();};const move=e=>{if(!drag||drag.id!==e.pointerId)return;yaw+=(e.clientX-drag.x)*.012;pitch=Math.max(-.35,Math.min(.35,pitch+(e.clientY-drag.y)*.006));drag.x=e.clientX;drag.y=e.clientY;};const up=()=>{drag=null;};const key=e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){yaw+=e.key==='ArrowLeft'?-.15:.15;e.preventDefault();}};host.addEventListener('pointerdown',down);host.addEventListener('pointermove',move);host.addEventListener('pointerup',up);host.addEventListener('pointercancel',up);host.addEventListener('keydown',key);
 function tick(time=0){if(disposed)return;if(autoRotate&&!drag&&lastTime)yaw+=Math.min(.05,(time-lastTime)/1000)*.35;lastTime=time;root.rotation.set(pitch,yaw,0);host.dataset.yaw=String(yaw);renderer.render(scene,camera);raf=requestAnimationFrame(tick);}tick();return {setYaw(v){yaw=v;},setAutoRotate(v){autoRotate=!!v;},dispose(){if(disposed)return;disposed=true;cancelAnimationFrame(raf);resize.disconnect();for(const [event,fn]of [['pointerdown',down],['pointermove',move],['pointerup',up],['pointercancel',up],['keydown',key]])host.removeEventListener(event,fn);for(const geo of geometries)geo.dispose();material.dispose();photo.dispose();back.dispose();profile.dispose();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();}};
}
