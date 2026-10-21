import * as T from '../../vendor/three/three.module.min.js';

// Shared procedural textures keep every card and chip crisp without external assets.
export function furnishPokerTable(root,textures){
 const group=new T.Group();group.name='Detailed poker cards and chips';root.add(group);
 function material(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;map.anisotropy=8;textures.push(map);return new T.MeshStandardMaterial({map,roughness:.68,metalness:0,transparent:true,alphaTest:.05});}
 function cardFace(rank,suit){return material(384,544,(g,w,h)=>{g.fillStyle='#fffdf5';g.beginPath();g.roundRect(2,2,w-4,h-4,22);g.fill();g.strokeStyle='#d4cec0';g.lineWidth=3;g.stroke();g.fillStyle=suit==='♥'||suit==='♦'?'#b52231':'#17242b';g.textAlign='center';g.textBaseline='middle';for(const flip of [false,true]){g.save();if(flip){g.translate(w,h);g.rotate(Math.PI);}g.font='bold 68px Georgia';g.fillText(rank,49,59);g.font='57px Georgia';g.fillText(suit,49,119);g.restore();}g.font='175px Georgia';g.fillText(suit,w/2,h/2);});}
 const back=material(384,544,(g,w,h)=>{g.fillStyle='#fffdf5';g.beginPath();g.roundRect(2,2,w-4,h-4,22);g.fill();g.fillStyle='#183c57';g.fillRect(18,18,w-36,h-36);g.save();g.beginPath();g.rect(25,25,w-50,h-50);g.clip();g.strokeStyle='#9db7bf';g.lineWidth=2;for(let i=-h;i<w+h;i+=19){g.beginPath();g.moveTo(i,0);g.lineTo(i+h,h);g.stroke();g.beginPath();g.moveTo(i,h);g.lineTo(i+h,0);g.stroke();}g.restore();g.fillStyle='#183c57';g.beginPath();g.ellipse(w/2,h/2,100,119,0,0,Math.PI*2);g.fill();g.strokeStyle='#d5bc7b';g.lineWidth=5;g.stroke();g.fillStyle='#ead6a2';g.textAlign='center';g.font='100px Georgia';g.fillText('♠',w/2,h/2+20);g.font='bold 24px sans-serif';g.fillText('TWO ACES',w/2,h/2+65);});
 const cardGeo=new T.PlaneGeometry(.48,.68);
 function card(mat,x,z,angle=0,y=1.533){const o=new T.Mesh(cardGeo,mat);o.rotation.set(-Math.PI/2,0,angle);o.position.set(x,y,z);o.receiveShadow=true;group.add(o);}
 for(const [i,[r,s]]of [['A','♠'],['K','♥'],['Q','♣'],['J','♦'],['10','♠']].entries())card(cardFace(r,s),-15.12+i*.56,9,.012*(i-2));
 // A proper deck with visible paper edges and a patterned top.
 const paper=new T.MeshStandardMaterial({color:'#ede8db',roughness:.9});const deck=new T.Mesh(new T.BoxGeometry(.48,.13,.68),paper);deck.position.set(-12,1.59,8.35);group.add(deck);card(back,-12,8.35,0,1.657);
 for(let i=0;i<8;i++){const a=i*Math.PI/4,x=-14+Math.sin(a)*2.65,z=9+Math.cos(a)*1.15;card(back,x-.13,z,a+.09,1.535);card(back,x+.13,z+.08,a-.1,1.539);}
 const denominations=[['25','#28745c'],['100','#b83037'],['500','#222c3c']];
 const transform=new T.Object3D();
 denominations.forEach(([value,color],stack)=>{
  const top=material(256,256,(g,w,h)=>{g.translate(w/2,h/2);g.fillStyle=color;g.beginPath();g.arc(0,0,126,0,Math.PI*2);g.fill();for(let i=0;i<8;i++){g.save();g.rotate(i*Math.PI/4);g.fillStyle='#f5e8cb';g.fillRect(-11,-126,22,29);g.restore();}for(const radius of [91,79]){g.strokeStyle='#d7c49d';g.lineWidth=3;g.beginPath();g.arc(0,0,radius,0,Math.PI*2);g.stroke();}g.fillStyle='#f4e9cc';g.textAlign='center';g.textBaseline='middle';g.font='bold 61px sans-serif';g.fillText(value,0,8);g.font='18px sans-serif';g.fillText('TWO ACES',0,-43);g.fillText('♠',0,56);});
  const side=material(512,32,(g,w,h)=>{g.fillStyle=color;g.fillRect(0,0,w,h);g.fillStyle='#f5e8cb';for(let i=0;i<8;i++)g.fillRect(i*64+22,0,20,h);g.fillStyle='#00000035';g.fillRect(0,0,w,3);g.fillRect(0,h-3,w,3);});
  const positions=[];for(let i=0;i<8;i++){const a=i*Math.PI/4,x=-14+Math.sin(a)*3.5,z=9+Math.cos(a)*1.8;for(let k=0;k<5+stack;k++)positions.push([x+stack*.26,1.554+k*.045,z,i*.31+k*.11]);}
  const chips=new T.InstancedMesh(new T.CylinderGeometry(.115,.115,.038,32),[side,top,top],positions.length);chips.name='Poker chips '+value;positions.forEach(([x,y,z,angle],i)=>{transform.position.set(x,y,z);transform.rotation.set(0,angle,0);transform.updateMatrix();chips.setMatrixAt(i,transform.matrix);});chips.receiveShadow=true;chips.computeBoundingSphere();group.add(chips);
 });
 const dealer=material(256,256,(g,w,h)=>{g.fillStyle='#fff7df';g.beginPath();g.arc(w/2,h/2,125,0,Math.PI*2);g.fill();g.strokeStyle='#252a2b';g.lineWidth=5;g.beginPath();g.arc(w/2,h/2,108,0,Math.PI*2);g.stroke();g.fillStyle='#252a2b';g.font='bold 43px sans-serif';g.textAlign='center';g.fillText('DEALER',w/2,144);});const puck=new T.Mesh(new T.CylinderGeometry(.24,.24,.035,40),[paper,dealer,paper]);puck.position.set(-11.3,1.55,8.2);group.add(puck);
}
