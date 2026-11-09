import * as T from '../../vendor/three/three.module.min.js';
export function createUpperRoutes(scene,E,sample,block,asphalt){
 const deckMaterial=new T.MeshStandardMaterial({color:0xc5d3d9,map:asphalt,roughness:.85,side:T.DoubleSide}),groups=[];
 const canvas=document.createElement('canvas');canvas.width=512;canvas.height=160;const c=canvas.getContext('2d');c.fillStyle='#143b50';c.fillRect(0,0,512,160);c.strokeStyle='#76e6db';c.lineWidth=9;c.strokeRect(5,5,502,150);c.fillStyle='#eaffee';c.textAlign='center';c.font='bold 60px Arial';c.fillText('↑ ВЕРХНИЙ ПУТЬ',256,72);c.font='32px Arial';c.fillText('ЩИТ + РАЗГОН',256,125);const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
 for(const route of E.overpasses){const root=new T.Group();root.name=route.name;scene.add(root);const positions=[],uv=[],indices=[],steps=50;
  for(let i=0;i<=steps;i++){const d=route.start+(route.end-route.start)*i/steps;for(const side of [-1,1]){const p=sample(d,route.center+side*route.halfWidth,1);positions.push(p.x,p.y+.02,p.z);uv.push(side<0?0:1,i*.35);}if(i<steps){const n=i*2;indices.push(n,n+2,n+1,n+1,n+2,n+3);}}
  const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geometry.setIndex(indices);geometry.computeVertexNormals();root.add(new T.Mesh(geometry,deckMaterial));
  for(let i=0;i<steps;i++){const d=route.start+(route.end-route.start)*(i+.5)/steps,a=sample(d-(route.end-route.start)/steps/2,route.center,1),b=sample(d+(route.end-route.start)/steps/2,route.center,1),length=Math.hypot(b.x-a.x,b.y-a.y,b.z-a.z)+.025;
   for(const side of [-1,1]){const p=sample(d,route.center+side*route.halfWidth,1),rail=block(root,i%3?'#274d63':'#e8be63',p.x,p.y+.48,p.z,.15,.7,length);rail.rotation.set(-Math.atan2(b.y-a.y,Math.hypot(b.x-a.x,b.z-a.z)),p.a,0);}
   if(i%4===0){const p=sample(d,route.center,1),stripe=block(root,'#a8e5df',p.x,p.y+.05,p.z,.12,.025,.8);stripe.rotation.set(-Math.atan2(b.y-a.y,Math.hypot(b.x-a.x,b.z-a.z)),p.a,0);}
   if(i%8===4&&E.deckHeight(d,1)>2.8){const p=sample(d,route.center+Math.sign(route.center)*.64),h=E.deckHeight(d,1);block(root,'#8d999c',p.x,p.y+h/2,p.z,.4,h,.55);}
  }
  const entry=sample(route.start-100,Math.sign(route.center)*1.5);block(root,'#899b9d',entry.x,entry.y+2,entry.z,.15,4,.15);const sign=new T.Mesh(new T.PlaneGeometry(5,1.56),new T.MeshBasicMaterial({map:texture,side:T.DoubleSide}));sign.position.set(entry.x,entry.y+4,entry.z);sign.rotation.y=entry.a+Math.PI;root.add(sign);
  groups.push({root,route});
 }
 return {update(distance){for(const {root,route}of groups)root.visible=route.end>distance-250&&route.start<distance+3800;},snapshot(){return groups.filter(g=>g.root.visible).map(g=>g.route.id);}};
}
