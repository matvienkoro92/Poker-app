import {mergeGeometries} from '../../vendor/three/addons/utils/BufferGeometryUtils.js';
import * as T from '../../vendor/three/three.module.min.js';

// Shared procedural textures keep every card and chip crisp without external assets.
export function furnishPokerTable(root,textures){
 const group=new T.Group();group.name='Detailed poker cards and chips';root.add(group);
 function material(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;map.anisotropy=8;textures.push(map);return new T.MeshStandardMaterial({map,roughness:.68,metalness:0,transparent:true,alphaTest:.05});}
 function cardFace(rank,suit){return material(512,720,(g,w,h)=>{
  g.fillStyle='#fffdf5';g.beginPath();g.roundRect(2,2,w-4,h-4,26);g.fill();g.strokeStyle='#d4cec0';g.lineWidth=3;g.stroke();const ink=suit==='♥'||suit==='♦'?'#af2435':'#17242b';g.fillStyle=ink;g.textAlign='center';g.textBaseline='middle';
  for(const flip of [false,true]){g.save();if(flip){g.translate(w,h);g.rotate(Math.PI);}g.font='bold 82px Georgia';g.fillText(rank,59,64);g.font='64px Georgia';g.fillText(suit,59,137);g.restore();}
  if(['K','Q','J'].includes(rank)){g.font='225px Georgia';g.fillText(suit,w/2,h/2);  }else if(rank==='A'){g.font='225px Georgia';g.fillText(suit,w/2,h/2);g.font='18px Arial';g.fillText('POKER21 · TWO ACES',w/2,542);}
  else {const spots=[[-1,-2],[1,-2],[-1,-1],[1,-1],[-1,1],[1,1],[-1,2],[1,2],[0,-.6],[0,.6]];g.font='86px Georgia';for(const [x,y]of spots){g.save();g.translate(w/2+x*85,h/2+y*109);if(y>0)g.rotate(Math.PI);g.fillText(suit,0,0);g.restore();}}
 });}

 const back=material(384,544,(g,w,h)=>{g.fillStyle='#fffdf5';g.beginPath();g.roundRect(2,2,w-4,h-4,22);g.fill();g.fillStyle='#183c57';g.fillRect(18,18,w-36,h-36);g.save();g.beginPath();g.rect(25,25,w-50,h-50);g.clip();g.strokeStyle='#9db7bf';g.lineWidth=2;for(let i=-h;i<w+h;i+=19){g.beginPath();g.moveTo(i,0);g.lineTo(i+h,h);g.stroke();g.beginPath();g.moveTo(i,h);g.lineTo(i+h,0);g.stroke();}g.restore();g.fillStyle='#183c57';g.beginPath();g.ellipse(w/2,h/2,100,119,0,0,Math.PI*2);g.fill();g.strokeStyle='#d5bc7b';g.lineWidth=5;g.stroke();g.fillStyle='#ead6a2';g.textAlign='center';g.font='100px Georgia';g.fillText('♠',w/2,h/2+20);g.font='bold 24px sans-serif';g.fillText('TWO ACES',w/2,h/2+65);});
 const shape=new T.Shape();shape.moveTo(-.215,-.34);shape.lineTo(.215,-.34);shape.quadraticCurveTo(.24,-.34,.24,-.315);shape.lineTo(.24,.315);shape.quadraticCurveTo(.24,.34,.215,.34);shape.lineTo(-.215,.34);shape.quadraticCurveTo(-.24,.34,-.24,.315);shape.lineTo(-.24,-.315);shape.quadraticCurveTo(-.24,-.34,-.215,-.34);
 const cardGeo=new T.ShapeGeometry(shape,5),edgeGeo=new T.ExtrudeGeometry(shape,{depth:.004,bevelEnabled:false,curveSegments:5}),edgeMat=new T.MeshStandardMaterial({color:'#e6decd',roughness:.88});
 const cardUV=cardGeo.getAttribute('uv'),cardPositions=cardGeo.getAttribute('position');for(let i=0;i<cardUV.count;i++)cardUV.setXY(i,cardPositions.getX(i)/.48+.5,cardPositions.getY(i)/.68+.5);
 function card(mat,x,z,angle=0,y=1.533){const o=new T.Mesh(cardGeo,mat);o.rotation.set(-Math.PI/2,0,angle);o.position.set(x,y,z);o.receiveShadow=true;group.add(o);const edge=new T.Mesh(edgeGeo,edgeMat);edge.rotation.copy(o.rotation);edge.position.set(x,y-.0055,z);edge.castShadow=true;group.add(edge);}
 const faces=[];for(const [i,[r,s]]of [['A','♠'],['K','♥'],['Q','♣'],['J','♦'],['10','♠']].entries()){const mat=cardFace(r,s);faces.push(mat);card(mat,-15.12+i*.56,9,.012*(i-2));}
 // A proper deck with visible paper edges and a patterned top.
 const paper=new T.MeshStandardMaterial({color:'#ede8db',roughness:.9});const deck=new T.Mesh(new T.BoxGeometry(.48,.13,.68),paper);deck.position.set(-12,1.59,8.35);group.add(deck);for(let i=0;i<18;i++){const line=new T.Mesh(new T.BoxGeometry(.481,.001,.681),edgeMat);line.position.set(-12,1.531+i*.007,8.35);group.add(line);}card(back,-12,8.35,0,1.657);
 for(let i=0;i<8;i++){const a=i*Math.PI/4,x=-14+Math.sin(a)*2.65,z=9+Math.cos(a)*1.15;card(back,x-.13,z,a+.09,1.535);card(back,x+.13,z+.08,a-.1,1.539);}
 const denominations=[['25','#28745c'],['100','#b83037'],['500','#222c3c']];
 const transform=new T.Object3D();
 denominations.forEach(([value,color],stack)=>{
  const top=material(256,256,(g,w,h)=>{g.translate(w/2,h/2);g.fillStyle=color;g.beginPath();g.arc(0,0,126,0,Math.PI*2);g.fill();for(let i=0;i<8;i++){g.save();g.rotate(i*Math.PI/4);g.fillStyle='#f5e8cb';g.fillRect(-11,-126,22,29);g.restore();}for(const radius of [91,79]){g.strokeStyle='#d7c49d';g.lineWidth=3;g.beginPath();g.arc(0,0,radius,0,Math.PI*2);g.stroke();}g.fillStyle='#f4e9cc';g.textAlign='center';g.textBaseline='middle';g.font='bold 61px sans-serif';g.fillText(value,0,8);g.font='18px sans-serif';g.fillText('TWO ACES',0,-43);g.fillText('♠',0,56);});
  const side=material(512,32,(g,w,h)=>{g.fillStyle=color;g.fillRect(0,0,w,h);g.fillStyle='#f5e8cb';for(let i=0;i<8;i++)g.fillRect(i*64+22,0,20,h);g.fillStyle='#00000035';g.fillRect(0,0,w,3);g.fillRect(0,h-3,w,3);g.fillStyle='#ffffff45';g.fillRect(0,5,w,1);for(let i=0;i<64;i++){g.fillStyle='#00000028';g.fillRect(i*8,8,1,16);}});
  const counts=[[12,5,3],[4,10,6],[8,3,14],[6,12,4],[3,6,9],[15,4,7],[7,9,2],[5,3,11]],positions=[];
  for(let i=0;i<8;i++){const a=i*Math.PI/4,x=-14+Math.sin(a)*3.38,z=9+Math.cos(a)*1.7,offset=(stack-1)*.275;for(let k=0;k<counts[i][stack];k++)positions.push([x+Math.cos(a)*offset+Math.sin(i*17+k)*.002,1.554+k*.042,z-Math.sin(a)*offset+Math.sin(i*13+k)*.002,i*.31+k*.11]);}

  const chips=new T.InstancedMesh(new T.CylinderGeometry(.115,.115,.038,48),[side,top,top],positions.length);chips.name='Poker chips '+value;positions.forEach(([x,y,z,angle],i)=>{transform.position.set(x,y,z);transform.rotation.set(0,angle,0);transform.updateMatrix();chips.setMatrixAt(i,transform.matrix);});chips.receiveShadow=true;chips.computeBoundingSphere();group.add(chips);
  // A few loose chips break the uniform stacks and show their printed faces.
  for(let j=0;j<3;j++){const loose=new T.Mesh(chips.geometry,[side,top,top]);loose.position.set(-14.6+stack*.3+j*.16,1.554,9.7+j*.12);loose.rotation.y=j*.8+stack;loose.castShadow=true;group.add(loose);}
 });
 const dealer=material(256,256,(g,w,h)=>{g.fillStyle='#fff7df';g.beginPath();g.arc(w/2,h/2,125,0,Math.PI*2);g.fill();g.strokeStyle='#252a2b';g.lineWidth=5;g.beginPath();g.arc(w/2,h/2,108,0,Math.PI*2);g.stroke();g.fillStyle='#252a2b';g.font='bold 43px sans-serif';g.textAlign='center';g.fillText('DEALER',w/2,144);});const puck=new T.Mesh(new T.CylinderGeometry(.24,.24,.035,40),[paper,dealer,paper]);puck.position.set(-11.3,1.55,8.2);group.add(puck);
 // Batch card stock, deck layers and loose chips by finish to keep detail inexpensive.
 const batches=new Map();for(const o of [...group.children]){if(o.isInstancedMesh||Array.isArray(o.material))continue;o.updateMatrix();const key=o.material;if(!batches.has(key))batches.set(key,[]);batches.get(key).push((o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone()).applyMatrix4(o.matrix));group.remove(o);}
 for(const [material,parts]of batches){const mesh=new T.Mesh(mergeGeometries(parts),material);parts.forEach(p=>p.dispose());mesh.receiveShadow=true;mesh.castShadow=true;group.add(mesh);}

 // Card artwork joins the existing proximity load; nothing is requested from afar.
 return {load:()=>Promise.all(['ace_of_spades','king_of_hearts','queen_of_clubs','jack_of_diamonds','10_of_spades'].map(async(name,i)=>{try{const map=await new T.TextureLoader().loadAsync('assets/city-interior/cards/'+name+'.webp');if(root.userData.disposed){map.dispose();return;}map.colorSpace=T.SRGBColorSpace;map.anisotropy=8;textures.push(map);faces[i].map=map;faces[i].needsUpdate=true;}catch(_){/* Keep legible ranks and suits if an image cannot load. */}}))};

}
