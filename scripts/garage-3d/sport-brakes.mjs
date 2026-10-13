import * as T from '../../vendor/three/three.module.min.js';

export function sportBrakes(id){
 const group=new T.Group();group.name='sport-brakes-'+id;const stock=id==='stock',ceramic=id==='ceramic';
 const material=(color,metalness,roughness)=>new T.MeshPhysicalMaterial({color,metalness,roughness,clearcoat:.3,clearcoatRoughness:.2});
 const steel=material('#c1cad0',.88,.3),dark=material('#202831',.65,.44),rotorMat=material(ceramic?'#62676b':'#aab4bd',ceramic?.3:.85,ceramic?.7:.32),paint=material(stock?'#56616c':id==='red'?'#cf192c':id==='gold'?'#d6a43c':'#dfc550',.5,.29);
 const add=(geo,mat,x=0,y=0,z=0)=>{const o=new T.Mesh(geo,mat);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;group.add(o);return o;};
 const circle=(r,x,y,clockwise=true)=>{const p=new T.Path();p.absarc(x,y,r,0,Math.PI*2,clockwise);return p;};
 const radius=stock?.395:.437,shape=new T.Shape();shape.absarc(0,0,radius,0,Math.PI*2,false);shape.holes.push(circle(.181,0,0));
 if(!stock)for(let n=0;n<24;n++)for(const [r,shift]of [[.28,0],[.36,.045]]){const a=n*Math.PI/12+shift;shape.holes.push(circle(ceramic?.009:.011,Math.cos(a)*r,Math.sin(a)*r));}
 // Two friction plates and visible radial cooling vanes form a floating rotor.
 for(const z of [0,.033])add(new T.ExtrudeGeometry(shape,{depth:.008,bevelEnabled:false,curveSegments:stock?64:12}),rotorMat,0,0,z);
 const vaneGeo=new T.BoxGeometry(.22,.014,.025),vanes=new T.InstancedMesh(vaneGeo,dark,32),matrix=new T.Matrix4();for(let n=0;n<32;n++){const a=n*Math.PI/16;matrix.compose(new T.Vector3(Math.cos(a)*.31,Math.sin(a)*.31,.021),new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),a+.18),new T.Vector3(1,1,1));vanes.setMatrixAt(n,matrix);}group.add(vanes);
 const hat=add(new T.CylinderGeometry(.184,.16,.045,48),dark,0,0,.018);hat.rotation.x=Math.PI/2;
 const hub=add(new T.CylinderGeometry(.095,.11,.055,32),steel,0,0,.035);hub.rotation.x=Math.PI/2;
 for(let n=0;n<10;n++){const a=n*Math.PI/5;const bobbin=add(new T.CylinderGeometry(.017,.017,.015,12),steel,Math.cos(a)*.18,Math.sin(a)*.18,.05);bobbin.rotation.x=Math.PI/2;const bolt=add(new T.CylinderGeometry(.009,.009,.018,6),dark,Math.cos(a)*.18,Math.sin(a)*.18,.058);bolt.rotation.x=Math.PI/2;}
 // Fine concentric machining marks stay inside the swept friction surface.
 for(const r of [.235,.26,.31,.335,.39,.414])if(r<radius){const groove=add(new T.TorusGeometry(r,.0012,3,96),dark,0,0,.042);groove.castShadow=false;}
 if(!stock)for(let n=0;n<8;n++){const a=n*Math.PI/4,points=[.25,.29,.34,.395].map((r,j)=>new T.Vector3(Math.cos(a+j*.075)*r,Math.sin(a+j*.075)*r,.043));const slot=add(new T.TubeGeometry(new T.CatmullRomCurve3(points),12,.0024,3,false),dark);slot.castShadow=false;}
 // Monoblock caliper has a sculpted bridge, piston bulges, pad and exposed fasteners.
 const profile=new T.Shape();profile.moveTo(-.08,-.20);profile.quadraticCurveTo(-.13,-.15,-.115,-.06);profile.lineTo(-.115,.10);profile.quadraticCurveTo(-.12,.19,-.05,.215);profile.lineTo(.055,.19);profile.quadraticCurveTo(.11,.14,.105,.06);profile.lineTo(.105,-.10);profile.quadraticCurveTo(.10,-.19,.04,-.21);profile.closePath();const caliper=add(new T.ExtrudeGeometry(profile,{depth:.065,bevelEnabled:true,bevelSize:.013,bevelThickness:.012,bevelSegments:3,curveSegments:16}),paint,.323,.005,.011);if(stock)caliper.scale.set(.8,.8,.8);
 add(new T.BoxGeometry(.09,.31,.032),dark,.27,0,.005);
 for(const y of [-.125,0,.125]){const piston=add(new T.CylinderGeometry(.055,.055,.028,24),paint,.354,y,.07);piston.rotation.x=Math.PI/2;}
 for(const y of [-.155,.155]){const fastener=add(new T.CylinderGeometry(.014,.014,.025,6),steel,.325,y,.094);fastener.rotation.x=Math.PI/2;}
 const logo=document.createElement('canvas');logo.width=128;logo.height=384;const ctx=logo.getContext('2d');ctx.fillStyle='#f5f0df';ctx.translate(64,192);ctx.rotate(-Math.PI/2);ctx.textAlign='center';ctx.font='italic bold 60px Arial';ctx.fillText(stock?'P21':'P21 SPORT',0,20);const map=new T.CanvasTexture(logo);map.colorSpace=T.SRGBColorSpace;const label=add(new T.PlaneGeometry(.075,.24),new T.MeshBasicMaterial({map,transparent:true,depthWrite:false}),.329,0,.1);label.castShadow=false;
 const bleeder=add(new T.CylinderGeometry(.012,.014,.047,6),steel,.36,.217,.042);bleeder.rotation.z=.2;
 return group;
}
let preview;
export function paintBrakePreview(canvas,id){
 if(!canvas.isConnected)return;
 if(!preview){const renderer=new T.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true,powerPreference:'low-power'});renderer.setSize(512,512);renderer.setPixelRatio(1);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;const scene=new T.Scene();scene.add(new T.HemisphereLight('#eaf1ff','#342a22',2));for(const [x,y,z,intensity]of [[2,3,4,4],[-3,0,2,2]]){const light=new T.DirectionalLight('#ffffff',intensity);light.position.set(x,y,z);scene.add(light);}const camera=new T.PerspectiveCamera(30,1,.1,10);camera.position.set(.65,.35,2.1);camera.lookAt(.025,0,0);preview={renderer,scene,camera,models:{}};}
 const {renderer,scene,camera,models}=preview;if(!models[id]){models[id]=sportBrakes(id);scene.add(models[id]);}for(const [key,model]of Object.entries(models))model.visible=key===id;renderer.render(scene,camera);canvas.width=canvas.height=512;canvas.getContext('2d').drawImage(renderer.domElement,0,0);
}
