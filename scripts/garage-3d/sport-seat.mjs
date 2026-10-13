import * as T from '../../vendor/three/three.module.min.js';

// Local axes: x across the seat, y up, z toward the driver's knees.
export function sportSeat(id){
 const group=new T.Group();group.name='sport-seat-'+id;
 const mat=(color,roughness=.8,metalness=0)=>new T.MeshPhysicalMaterial({color,roughness,metalness,clearcoat:metalness?.4:.08});
 const cloth=mat(id==='red'?'#a91e32':'#303943'),insert=mat('#151b22'),shell=mat('#10151c',.32,.35),thread=mat(id==='red'?'#e26970':'#89959f'),metal=mat('#acb5be',.28,.85),belt=mat('#cfb579',.95),dark=mat('#070b10');
 const weave=document.createElement('canvas');weave.width=weave.height=64;const ctx=weave.getContext('2d');ctx.fillStyle='#30343b';ctx.fillRect(0,0,64,64);for(let y=0;y<64;y+=8)for(let x=0;x<64;x+=8){ctx.fillStyle=(x+y)%16?'#121820':'#626973';ctx.fillRect(x,y,7,3);ctx.fillStyle='#252b33';ctx.fillRect(x,y+4,3,4);}const texture=new T.CanvasTexture(weave);texture.wrapS=texture.wrapT=T.RepeatWrapping;texture.repeat.set(3,5);texture.colorSpace=T.SRGBColorSpace;shell.map=texture;shell.bumpMap=texture;shell.bumpScale=.004;
 const add=(geo,m,x=0,y=0,z=0,parent=group)=>{const mesh=new T.Mesh(geo,m);mesh.position.set(x,y,z);mesh.castShadow=mesh.receiveShadow=true;parent.add(mesh);return mesh;};
 const rounded=(w,h,d,r,m,x,y,z,parent=group)=>{const shape=new T.Shape(),a=-w/2,b=-h/2;r=Math.min(r,w/2,h/2,d/2);shape.moveTo(a+r,b);shape.lineTo(a+w-r,b);shape.quadraticCurveTo(a+w,b,a+w,b+r);shape.lineTo(a+w,b+h-r);shape.quadraticCurveTo(a+w,b+h,a+w-r,b+h);shape.lineTo(a+r,b+h);shape.quadraticCurveTo(a,b+h,a,b+h-r);shape.lineTo(a,b+r);shape.quadraticCurveTo(a,b,a+r,b);const mesh=add(new T.ExtrudeGeometry(shape,{depth:d-2*r,bevelEnabled:true,bevelSize:r,bevelThickness:r,bevelSegments:4,curveSegments:12}),m,x,y,z-d/2+r,parent);return mesh;};
 const line=(points,r,m,parent=group)=>add(new T.TubeGeometry(new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p))),32,r,6,false),m,0,0,0,parent);
 const back=new T.Group();back.rotation.x=-.14;back.position.set(0,.20,0);group.add(back);
 const shape=new T.Shape();shape.moveTo(-.29,0);shape.bezierCurveTo(-.38,.2,-.39,.42,-.43,.65);shape.lineTo(-.47,.92);shape.quadraticCurveTo(-.46,1.02,-.34,1.11);shape.lineTo(-.28,1.21);shape.lineTo(-.26,1.48);shape.quadraticCurveTo(0,1.62,.26,1.48);shape.lineTo(.28,1.21);shape.lineTo(.34,1.11);shape.quadraticCurveTo(.46,1.02,.47,.92);shape.lineTo(.43,.65);shape.bezierCurveTo(.39,.42,.38,.2,.29,0);shape.closePath();
 for(const x of [-.135,.135]){const hole=new T.Path();hole.moveTo(x-.075,1.24);hole.lineTo(x+.075,1.24);hole.lineTo(x+.075,1.34);hole.lineTo(x-.075,1.34);hole.closePath();shape.holes.push(hole);}
 add(new T.ExtrudeGeometry(shape,{depth:.09,bevelEnabled:true,bevelSize:.018,bevelThickness:.018,bevelSegments:4,curveSegments:18}),shell,0,0,-.09,back);
 const lining=add(new T.ExtrudeGeometry(shape,{depth:.025,bevelEnabled:true,bevelSize:.012,bevelThickness:.012,bevelSegments:4,curveSegments:18}),cloth,0,.02,.012,back);lining.scale.set(.96,.97,1);
 rounded(.41,.18,.095,.025,cloth,0,1.43,.035,back);
 rounded(.46,.50,.12,.035,insert,0,.85,.065,back);rounded(.45,.31,.17,.04,insert,0,.40,.10,back);
 for(const sign of [-1,1]){
 const shoulder=rounded(.17,.42,.19,.055,cloth,sign*.34,.98,.10,back);shoulder.rotation.z=sign*.28;shoulder.rotation.y=-sign*.25;
 const lumbar=rounded(.13,.55,.23,.045,cloth,sign*.30,.49,.14,back);lumbar.rotation.z=-sign*.12;
 line([[sign*.27,.18,.28],[sign*.34,.52,.28],[sign*.40,.93,.24],[sign*.30,1.17,.20]],.005,thread,back);
 // Metal-lined harness slots remain open through the composite shell.
 const x=sign*.135;for(const y of [1.235,1.345])rounded(.16,.014,.022,.004,metal,x,y,.015,back);for(const xx of [x-.08,x+.08])rounded(.014,.12,.022,.004,metal,xx,1.29,.015,back);
 }
 rounded(.77,.16,.80,.055,shell,0,.12,.32);rounded(.49,.13,.60,.045,insert,0,.235,.36);
 for(const sign of [-1,1]){const bolster=rounded(.16,.26,.74,.055,cloth,sign*.325,.28,.35);bolster.rotation.z=-sign*.12;line([[sign*.26,.37,.03],[sign*.26,.40,.31],[sign*.26,.37,.66]],.005,thread);rounded(.075,.075,.82,.015,metal,sign*.28,-.015,.34);for(const z of [.02,.65]){rounded(.13,.09,.12,.015,shell,sign*.28,-.055,z);add(new T.CylinderGeometry(.022,.022,.015,12),metal,sign*.28,-.002,z);}}
 for(let y=.30;y<1.08;y+=.11)line([[-.19,y,.16],[0,y-.015,.17],[.19,y,.16]],.0025,thread,back);
 // Flat webbing instead of ropes, with a four-point cam-lock buckle.
 for(const sign of [-1,1]){const points=[[sign*.135,1.50,-.13],[sign*.135,1.15,-.03],[sign*.13,.78,.08],[sign*.10,.40,.36]];const vertices=[],indices=[];points.forEach(([x,y,z],n)=>{vertices.push(x-.033,y,z,x+.033,y,z);if(n)indices.push(n*2-2,n*2-1,n*2,n*2-1,n*2+1,n*2);});const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(vertices,3));geo.setIndex(indices);geo.computeVertexNormals();const web=belt.clone();web.side=T.DoubleSide;add(geo,web);const lap=rounded(.27,.055,.025,.008,belt,sign*.18,.38,.42);lap.rotation.z=-sign*.20;}
 const lock=add(new T.CylinderGeometry(.065,.065,.035,24),metal,0,.40,.45);lock.rotation.x=Math.PI/2;const release=add(new T.CylinderGeometry(.037,.037,.04,24),mat('#b52332',.4),0,.40,.47);release.rotation.x=Math.PI/2;
 return group;
}

let preview;
export function paintSeatPreview(canvas,id){
 if(!canvas.isConnected||id==='none')return;
 if(!preview){const renderer=new T.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true,powerPreference:'low-power'});renderer.setSize(512,512);renderer.setPixelRatio(1);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;const scene=new T.Scene();scene.add(new T.HemisphereLight('#eaf1ff','#3e3028',2));for(const [x,y,z,intensity]of [[3,4,5,4],[-3,2,1,2],[0,3,-3,3]]){const light=new T.DirectionalLight('#ffffff',intensity);light.position.set(x,y,z);scene.add(light);}const camera=new T.PerspectiveCamera(30,1,.1,20);camera.position.set(1.8,1.55,3.6);camera.lookAt(0,.78,.12);preview={renderer,scene,camera,models:{}};}
 const {renderer,scene,camera,models}=preview;if(!models[id]){models[id]=sportSeat(id);scene.add(models[id]);}for(const [key,model]of Object.entries(models))model.visible=key===id;renderer.render(scene,camera);canvas.width=canvas.height=512;canvas.getContext('2d').drawImage(renderer.domElement,0,0);
}
