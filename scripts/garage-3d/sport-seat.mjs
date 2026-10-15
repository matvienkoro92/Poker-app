import * as T from '../../vendor/three/three.module.min.js';

// Local axes: x across the seat, y up, z toward the driver's knees.
export function sportSeat(id){
 const group=new T.Group();group.name='sport-seat-'+id;
 const mat=(color,roughness=.8,metalness=0)=>new T.MeshPhysicalMaterial({color,roughness,metalness,clearcoat:metalness?.4:.08});
 const comfort=id==='emerald',ivory=id==='ivory',palette={red:['#a91e32','#151b22','#e26970'],carbon:['#303943','#151b22','#89959f'],emerald:['#146453','#124336','#c7b574'],ivory:['#d8c8a6','#847352','#f6e7bd']}[id]||['#303943','#151b22','#89959f'];
 const cloth=mat(palette[0],comfort?.55:.8),insert=mat(palette[1],comfort?.52:.8),shell=mat('#10151c',.32,.35),thread=mat(palette[2]),metal=mat('#acb5be',.28,.85),belt=mat('#cfb579',.95),dark=mat('#070b10');
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
 // A thin lower shell supports the cushion without a tall pedestal.
 const seatBase=rounded(comfort?.86:.77,.045,.84,.012,shell,0,.435,.34);seatBase.name='seat-base';
 const cushion=rounded(comfort?.61:.54,.12,ivory?.74:.67,.03,insert,0,.535,.39);cushion.name='seat-cushion';
 rounded(.54,.15,.17,.045,cloth,0,.52,.77);
 for(const z of [.20,.33,.46,.59])line([[-.23,.625,z],[0,.635,z+.015],[.23,.625,z]],.003,thread);
 if(comfort){for(const sign of [-1,1]){rounded(.14,.13,.64,.04,cloth,sign*.45,.65,.32);rounded(.045,.23,.10,.01,metal,sign*.45,.48,.16);}for(let y=.45;y<1.1;y+=.15)for(const x of [-.1,.1])line([[x-.1,y,.18],[x,y+.07,.18],[x+.1,y,.18]],.003,thread,back);}
 if(ivory){rounded(.47,.10,.22,.035,cloth,0,.56,.86);line([[-.24,.62,.88],[0,.64,.90],[.24,.62,.88]],.004,thread);}
 for(const sign of [-1,1]){const bolster=rounded(.16,.26,.74,.055,cloth,sign*(comfort?.365:.325),.54,.39);bolster.rotation.z=-sign*.12;line([[sign*.26,.63,.03],[sign*.26,.66,.35],[sign*.26,.63,.73]],.005,thread);rounded(.075,.075,.82,.015,metal,sign*.28,-.015,.34);for(const z of [.02,.65]){rounded(.13,.09,.12,.015,shell,sign*.28,-.055,z);add(new T.CylinderGeometry(.022,.022,.015,12),metal,sign*.28,-.002,z);}}
 for(let y=.30;y<1.08;y+=.11)line([[-.19,y,.16],[0,y-.015,.17],[.19,y,.16]],.0025,thread,back);
 // Flat webbing instead of ropes, with a four-point cam-lock buckle.
 for(const sign of [-1,1]){const points=[[sign*.135,1.50,-.13],[sign*.135,1.15,-.03],[sign*.13,.78,.08],[sign*.10,.66,.40]];const vertices=[],indices=[];points.forEach(([x,y,z],n)=>{vertices.push(x-.033,y,z,x+.033,y,z);if(n)indices.push(n*2-2,n*2-1,n*2,n*2-1,n*2+1,n*2);});const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(vertices,3));geo.setIndex(indices);geo.computeVertexNormals();const web=belt.clone();web.side=T.DoubleSide;add(geo,web);const lap=rounded(.27,.055,.025,.008,belt,sign*.18,.64,.45);lap.rotation.z=-sign*.20;}
 const lock=add(new T.CylinderGeometry(.065,.065,.035,24),metal,0,.66,.48);lock.rotation.x=Math.PI/2;const release=add(new T.CylinderGeometry(.037,.037,.04,24),mat('#b52332',.4),0,.66,.50);release.rotation.x=Math.PI/2;
 // The lower shell is the floor contact, rather than the deleted pedestal.
 // Normalize the complete chair so its shell underside rests at local y=0.
 group.updateMatrixWorld(true);
 const underside=new T.Box3().setFromObject(seatBase).min.y;
 for(const child of group.children)child.position.y-=underside;
 group.userData.floorContact=0;
 return group;
}

let preview;
export function paintSeatPreview(canvas,id){
 if(!canvas.isConnected||id==='none')return;
 if(!preview){const renderer=new T.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true,powerPreference:'low-power'});renderer.setSize(512,512);renderer.setPixelRatio(1);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;const scene=new T.Scene();scene.add(new T.HemisphereLight('#eaf1ff','#3e3028',2));for(const [x,y,z,intensity]of [[3,4,5,4],[-3,2,1,2],[0,3,-3,3]]){const light=new T.DirectionalLight('#ffffff',intensity);light.position.set(x,y,z);scene.add(light);}const camera=new T.PerspectiveCamera(30,1,.1,20);camera.position.set(1.8,1.55,3.6);camera.lookAt(0,.78,.12);preview={renderer,scene,camera,models:{}};}
 const {renderer,scene,camera,models}=preview;if(!models[id]){models[id]=sportSeat(id);scene.add(models[id]);}for(const [key,model]of Object.entries(models))model.visible=key===id;renderer.render(scene,camera);canvas.width=canvas.height=512;canvas.getContext('2d').drawImage(renderer.domElement,0,0);
}
