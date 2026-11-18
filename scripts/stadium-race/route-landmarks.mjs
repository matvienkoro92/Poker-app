import * as T from '../../vendor/three/three.module.min.js';
export function createRouteLandmarks(scene,E,sample,block){
 const landmarks=[],metal=new T.MeshStandardMaterial({color:0x59666b,metalness:.65,roughness:.4});
 function at(distance,extent=0){const root=new T.Group(),p=sample(distance);root.position.set(p.x,p.y,p.z);root.rotation.y=p.a;scene.add(root);landmarks.push({root,distance,extent});return root;}
 function sign(parent,text,x,y,width=4,color='#1e363e'){const canvas=document.createElement('canvas');canvas.width=768;canvas.height=192;const c=canvas.getContext('2d');c.fillStyle=color;c.fillRect(0,0,768,192);c.strokeStyle='#d2c7a7';c.lineWidth=6;c.strokeRect(6,6,756,180);c.fillStyle='#f2e5c7';c.textAlign='center';c.font='bold 58px Arial';c.fillText(text,384,117);const map=new T.CanvasTexture(canvas);map.colorSpace=T.SRGBColorSpace;const mesh=new T.Mesh(new T.PlaneGeometry(width,width/4),new T.MeshBasicMaterial({map,side:T.DoubleSide}));mesh.position.set(x,y,-.15);mesh.rotation.y=Math.PI;parent.add(mesh);return mesh;}
 for(const [distance,text]of [[E.LAP*2+220,'STADIUM SPRINT'],[E.cityDistance(4900),'НАБЕРЕЖНАЯ'],[E.cityDistance(7500),'ПОРТОВЫЙ КВАРТАЛ'],[E.FINISH-650,'TWO ACES · ФИНИШ']]){const g=at(distance),width=E.roadLayout(distance).halfWidth+1.3;for(const side of [-1,1]){block(g,'#566268',side*width,3.7,0,.23,7.4,.23);block(g,'#c6bba2',side*width,.4,0,.7,.8,.7);}block(g,'#566268',0,7.3,0,width*2,.25,.25);sign(g,text,0,6.7,9);}
 for(const start of [E.LAP*2+4300,E.cityDistance(6000)])for(const [offset,label]of [[-420,'ТОРМОЗИ · 180°'],[-220,'↷  ШПИЛЬКА'],[-60,'↷']]){const d=start+offset,g=at(d),x=E.roadWidth(d)+1.5;block(g,'#747d7d',x,1.5,0,.12,3,.12);sign(g,label,x,3,offset===-60?2:4,'#67543a');}
 // Single-use silhouettes mark the transition from the open pits to the rock cutting.
 const press=at(1000);
 block(press,'#4a5962',16,2.4,0,1.25,4.8,6);
 block(press,'#d2c6ac',16,5.4,0,6.4,1.2,11.3);
 block(press,'#465f71',16,6.65,0,6.05,1.3,10.8);
 block(press,'#b2aba1',16,7.43,0,6.6,.23,11.5);
 for(let z=-4;z<=4;z+=2)block(press,'#dfcdb2',12.96,6.65,z,.08,1.34,.13);
 const pits=at(E.LAP+1460);
 block(pits,'#87918d',-17,3.2,0,6.8,6.4,5.8);
 block(pits,'#3c5968',-17,7.45,0,8,2.15,7.4);
 block(pits,'#d1c5a5',-17,8.65,0,8.6,.24,7.8);
 for(const z of [-3.5,-1.2,1.2,3.5])block(pits,'#c2c6ba',-12.93,7.45,z,.13,2.1,.14);
 block(pits,'#414c56',-14,4.5,-4.5,.32,9,.32);
 sign(pits,'ПИТ-ЛЕЙН',-14,6.3,6,'#2f554f');
 const viaduct=at(E.LAP+6950);
 for(const side of [-1,1]){
  block(viaduct,'#8e887e',side*12,4.4,0,2.2,8.8,3.6);
  block(viaduct,'#b3aba0',side*12,8.52,0,3,.6,4.1);
 }
 block(viaduct,'#535b60',0,9.25,0,39,.85,4.1);
 for(const z of [-1.9,1.9]){
  block(viaduct,'#747e80',0,10.75,z,39,.14,.13);
  for(let x=-18;x<=18;x+=3)block(viaduct,'#697575',x,10.15,z,.1,1.32,.1);
 }
 // An enclosed pedestrian crossing marks the quay entrance. Its supports sit
 // outside the clear road width and its lit truss reads from the stadium arch.
 const crossingDistance=E.cityDistance(4770),walkway=at(crossingDistance);
 const span=E.roadLayout(crossingDistance).halfWidth+3;
 for(const side of [-1,1]){
  block(walkway,'#485767',side*span,3.6,0,1.05,7.2,2.7);
  block(walkway,'#ad9075',side*span,.4,0,1.6,.8,3.2);
  for(const z of [-1.25,1.25]){
   block(walkway,'#4b6476',0,side<0?7.1:9.45,z,span*2+.9,.23,.19);
  }
 }
 block(walkway,'#4b5562',0,7.18,0,span*2, .28,2.6);
 block(walkway,'#495767',0,9.57,0,span*2+1,.22,3);
 for(let i=0;i<8;i++){
  const bay=span/4,x=-span+(i+.5)*bay;
  for(const z of [-1.25,1.25]){
   const brace=block(walkway,'#b1aaa0',x,8.27,z,.12,Math.hypot(bay,2.2),.12);
   brace.rotation.z=(i%2?1:-1)*Math.atan2(bay,2.2);
  }
 }
 const luminous=new T.MeshBasicMaterial({color:0xffd7a3});
 const strip=new T.Mesh(new T.BoxGeometry(span*2,.085,.085),luminous);
 strip.position.set(0,7.05,-1.36);walkway.add(strip);
 sign(walkway,'РЕЧНОЙ ВОКЗАЛ',0,8.36,5.8,'#203d53');
 // A recognisable waterfront clock tower and a port gantry establish distinct districts.
 const tower=at(E.cityDistance(5300));for(const [radius,height,y]of [[2.3,9,4.5],[2.6,.5,9],[1.7,3,10.5],[2,.35,12.2]]){const m=new T.Mesh(new T.CylinderGeometry(radius,radius,height,24),new T.MeshStandardMaterial({color:height>1?0xa59c88:0x40515b,roughness:.85}));m.position.set(-18,y,0);tower.add(m);}sign(tower,'TWO ACES',-18,7,3.4);const clock=new T.Mesh(new T.CircleGeometry(1.2,32),new T.MeshStandardMaterial({color:0xe7ddc3}));clock.position.set(-18,10.5,-1.72);clock.rotation.y=Math.PI;tower.add(clock);block(tower,'#26363b',-18,10.8,-1.75,.09,.65,.04);const hand=block(tower,'#26363b',-18.25,10.5,-1.75,.6,.08,.04);hand.rotation.z=-.2;
 const copper=new T.MeshStandardMaterial({color:'#48786f',metalness:.48,roughness:.42});
 const dome=new T.Mesh(new T.SphereGeometry(2.06,24,12,0,Math.PI*2,0,Math.PI/2),copper);
 dome.position.set(-18,12.35,0);dome.scale.y=1.24;tower.add(dome);
 block(tower,'#d7b97a',-18,15.46,0,.09,1.5,.09);
 clock.material.emissive.set('#f3c28a');clock.material.emissiveIntensity=.6;
 for(let hour=0;hour<12;hour++){
  const a=hour*Math.PI/6;
  const mark=block(tower,'#3f4743',-18+Math.sin(a)*.96,10.5+Math.cos(a)*.96,-1.75,.065,.17,.035);
  mark.rotation.z=-a;
 }
 const port=at(E.cityDistance(7650));for(const side of [-1,1]){block(port,'#586e76',-22+side*4,7,0,.45,14,.45);const brace=block(port,'#76868a',-22+side*2,6,0,.22,12,.22);brace.rotation.z=side*.34;}block(port,'#71838a',-22,14,0,17,.5,.55);block(port,'#303c43',-16,10,0,.06,8,.06);const hook=new T.Mesh(new T.TorusGeometry(.38,.07,6,16,Math.PI*1.5),metal);hook.position.set(-16,5.8,0);port.add(hook);
 // Counterweight, operator cab and triangular lattice give the port crane its working profile.
 block(port,'#835e47',-27,14.8,0,3,1.3,1.7);
 block(port,'#9c7959',-20,14.85,0,2.1,1.65,1.7);
 block(port,'#466479',-20,15,-.88,1.66,.86,.10);
 for(let bay=0;bay<7;bay++){
  const brace=block(port,'#929c98',-28+bay*2.2,14.78,0,.10,2.64,.16);
  brace.rotation.z=(bay%2?1:-1)*.99;
 }
 block(port,'#71838a',-21.4,15.5,0,15.7,.15,.25);
 // Follow the outside kerb with a stone coping and a continuous wall down to the riverbed.
 const waterY=-4;
 for(let d=E.cityDistance(6020);d<E.cityDistance(7530);d+=50){
  if(E.crossings.some(j=>Math.abs(j.distance-(d+25))<108))continue;
  const end=Math.min(d+50,E.cityDistance(7530)),mid=(d+end)/2;
  const edge=-(E.roadLayout(mid).halfWidth+1.4)/E.roadWidth(mid);
  const a=sample(d,edge),b=sample(end,edge),bank=at(mid,55);
  bank.position.set((a.x+b.x)/2,(a.y+b.y)/2,(a.z+b.z)/2);
  bank.rotation.y=Math.atan2(b.x-a.x,b.z-a.z);
  const length=Math.hypot(b.x-a.x,b.z-a.z)+.05,height=bank.position.y-waterY+1.4;
  block(bank,'#656c71',0,.64-height/2,0,.52,height,length);
  block(bank,'#bea98f',0,.72,0,.65,.16,length);
 }
 const quayD=E.cityDistance(7070),pier=at(quayD),edge=E.roadLayout(quayD).halfWidth;
 pier.position.y=waterY;
 for(let n=0;n<12;n++)block(pier,n%3?'#897765':'#746453',edge+6.3,.76,n*.88-4.8,4.7,.23,.84);
 for(const z of [-5,0,5])for(const x of [edge+4.2,edge+8.4])block(pier,'#454d50',x,.37,z,.23,1.45,.23);
 // A pointed bow, raised wheelhouse and mooring cleats identify the cabin launch from the road.
 const boat=new T.Group();boat.position.set(edge+11,.12,.4);boat.rotation.y=.22;boat.scale.setScalar(1.55);pier.add(boat);
 const hullShape=new T.Shape();hullShape.moveTo(-1.22,-3.8);hullShape.lineTo(1.22,-3.8);hullShape.quadraticCurveTo(1.7,1.6,0,4.6);hullShape.quadraticCurveTo(-1.7,1.6,-1.22,-3.8);
 const hull=new T.Mesh(new T.ExtrudeGeometry(hullShape,{depth:.74,bevelSize:.16,bevelThickness:.13,bevelSegments:2,steps:1}),new T.MeshStandardMaterial({color:'#7b453b',roughness:.48}));
 hull.rotation.x=-Math.PI/2;boat.add(hull);
 block(boat,'#d7c6aa',0,1.1,-.45,2,.78,3.5);block(boat,'#396174',0,1.64,-.35,1.8,.54,2.65);
 block(boat,'#ede1bc',0,1.96,-.35,2.08,.14,2.99);
 for(const side of [-1,1])for(const z of [-1.4,-.3,.8])block(boat,'#cbbca8',side*.91,1.65,z,.06,.55,.08);
 for(const z of [-2.95,2.45])block(boat,'#414e55',0,.94,z,.42,.12,.13);
 block(boat,'#a1a4a0',0,2.88,-.72,.07,1.9,.07);
 block(boat,'#f0d296',0,3.89,-.72,.14,.19,.14);
 for(let n=0;n<5;n++)block(pier,'#777b79',edge+2.25+n*.51,3.28-n*.5,-3.65,.57,.25,1.36);
 // Opposite quay and broken reflections share the water level. No local shadow lights.
 const shore=at(quayD);shore.position.y=waterY;
 for(let i=0;i<18;i++){
  const x=100+Math.sin(i*.31)*4,z=(i-8)*8;
  block(shore,'#48515d',x,.5,z,6,1,8.3);
  block(shore,'#525866',x,2.5,z,.13,4,.13);
  const lamp=new T.Mesh(new T.SphereGeometry(.21,8,5),luminous);lamp.position.set(x,4.56,z);shore.add(lamp);
  for(let k=0;k<4;k++)block(shore,k%2?'#8c877e':'#c5aa86',x-4-k*1.8,.04,z+Math.sin(i+k)*.27,1.3-k*.13,.025,.21+k*.09);
 }
 // Twin cable fans mark the last bridge. Anchor each stay to the local deck surface.
 const upright=new T.Vector3(0,1,0);
 for(const local of [8780,9380]){
  const distance=E.cityDistance(local),deck=at(distance,650);landmarks.at(-1).horizon=true;
  deck.updateMatrixWorld(true);
  const halfSpan=E.roadLayout(distance).halfWidth+1.7;
  function beam(a,b,width,depth,color){
   const delta=b.clone().sub(a),centre=a.clone().addScaledVector(delta,.5);
   const piece=block(deck,color,centre.x,centre.y,centre.z,width,delta.length(),depth);
   piece.quaternion.setFromUnitVectors(upright,delta.normalize());
  }
  for(const side of [-1,1]){
   const foot=new T.Vector3(side*halfSpan,0,0),cap=new T.Vector3(side*(halfSpan-1.3),17,0);
   beam(foot,cap,.78,1.2,'#a2a6aa');
   for(const direction of [-1,1])for(let k=1;k<=5;k++){
    const anchorDistance=distance+direction*(130+k*92);
    const q=sample(anchorDistance,-side*(E.roadLayout(anchorDistance).halfWidth+.78)/E.roadWidth(anchorDistance));
    const anchor=deck.worldToLocal(new T.Vector3(q.x,q.y+.58,q.z));
    beam(new T.Vector3(cap.x,12.3+k*.86,0),anchor,.076,.076,'#cfbba1');
   }
  }
  block(deck,'#798c98',0,16.7,0,halfSpan*2-2.25,.62,1.2);
 }
 // Stacked freight and corrugated sides give the port its own silhouette.
 for(let n=0;n<8;n++){
  const x=-19-(n%2)*5.2,z=-13+Math.floor(n/2)*7.1,y=n>5?2.65:0;
  const color=['#52656b','#805b4b','#667263','#b09a73'][n%4];
  block(port,color,x,y+1.25,z,4.7,2.5,6.2);
  for(const face of [-1,1])for(let rib=0;rib<10;rib++)block(port,'#38494e',x+face*2.37,y+1.25,z-2.8+rib*.62,.045,2.35,.045);
  for(const face of [-1,1])for(const side of [-1,1]){block(port,'#b1b2a4',x+side*1.05,y+1.25,z+face*3.12,.05,2.35,.04);block(port,'#39494b',x,y+(side<0?.12:2.38),z+face*3.13,4.6,.08,.045);}
 }
 return {update(distance){for(const item of landmarks)item.root.visible=item.distance+item.extent>distance-450&&item.distance-item.extent<distance+(item.horizon?8400:2600);}};
}
