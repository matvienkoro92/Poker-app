import * as T from '../../vendor/three/three.module.min.js';
export function wristWatch(id,color='#c5b899'){
 const group=new T.Group();group.name='wardrobe-wrist-watch';group.position.set(.744,.015,.026);group.rotation.z=-.12;
 const gold=/gold|rose|bronze|DayDate|Skeleton/i.test(id),metal=new T.MeshStandardMaterial({color:gold?color:'#b7c2c9',metalness:.88,roughness:.24}),strap=new T.MeshStandardMaterial({color:/roseDress|bronzePilot/.test(id)?'#51382c':'#171d22',roughness:.66,metalness:.1});
 const add=(geo,material,x,y,z)=>{const mesh=new T.Mesh(geo,material);mesh.position.set(x,y,z);group.add(mesh);return mesh;};
 const band=add(new T.TorusGeometry(.072,.012,12,64),/Dress|Pilot|smart/i.test(id)?strap:metal,0,0,0);band.rotation.x=Math.PI/2;band.scale.x=.90;
 if(!/Dress|Pilot|smart/i.test(id))for(let n=0;n<18;n++){const a=n*Math.PI/9;const link=add(new T.BoxGeometry(.026,.049,.016),metal,Math.cos(a)*.065,0,Math.sin(a)*.072);link.rotation.y=-a;}
 const square=/square|smart/i.test(id);const body=add(square?new T.BoxGeometry(.147,.153,.022):new T.CylinderGeometry(.078,.073,.022,64),metal,0,0,.078);if(!square)body.rotation.x=Math.PI/2;
 if(!square) add(new T.TorusGeometry(.069,.006,12,64),metal,0,0,.095);
 else for(const [x,y,w,h]of [[-.071,0,.008,.15],[.071,0,.008,.15],[0,.071,.14,.008],[0,-.071,.14,.008]])add(new T.BoxGeometry(w,h,.009),metal,x,y,.095);
 const dial=document.createElement('canvas');dial.width=dial.height=512;const c=dial.getContext('2d'),green=/green|Submariner|DayDate/i.test(id),white=/Daytona|square|rose/i.test(id);const glow=c.createRadialGradient(190,170,20,256,256,256);glow.addColorStop(0,green?'#237050':white?'#fff7db':'#294559');glow.addColorStop(1,green?'#072b20':white?'#c7c4b4':'#06121c');c.fillStyle=glow;c.fillRect(0,0,512,512);c.translate(256,256);
 for(let n=0;n<60;n++){c.save();c.rotate(n*Math.PI/30);c.strokeStyle=white?'#283333':'#f2dfb3';c.lineWidth=n%5?3:9;c.beginPath();c.moveTo(0,-221);c.lineTo(0,n%5?-207:-184);c.stroke();c.restore();}
 const hand=(angle,length,width)=>{c.save();c.rotate(angle);c.strokeStyle=white?'#203337':'#f4e4bb';c.lineWidth=width;c.lineCap='round';c.beginPath();c.moveTo(0,18);c.lineTo(0,-length);c.stroke();c.restore();};hand(-Math.PI/3,112,13);hand(Math.PI/3,168,9);hand(Math.PI*.1,183,3);c.fillStyle='#d7b66e';c.beginPath();c.arc(0,0,14,0,Math.PI*2);c.fill();c.font='bold 28px Arial';c.textAlign='center';c.fillStyle=white?'#334449':'#e3d6ac';c.fillText('♠',0,-80);
 if(/GMT/i.test(id)){for(let n=0;n<24;n++){c.beginPath();c.strokeStyle=n<12?'#a52d40':'#274e9a';c.lineWidth=24;c.arc(0,0,240,n*Math.PI/12,(n+1)*Math.PI/12);c.stroke();}hand(-Math.PI*.55,172,6);}
 if(/Daytona/i.test(id))for(const [x,y]of [[-91,35],[91,35],[0,128]]){c.fillStyle='#182027';c.beginPath();c.arc(x,y,48,0,Math.PI*2);c.fill();c.strokeStyle='#e3dfd3';c.lineWidth=3;c.beginPath();c.moveTo(x,y);c.lineTo(x+17,y-28);c.stroke();}
 if(/Skeleton/i.test(id))for(const [x,y,r]of [[-60,60,65],[80,45,43],[15,-115,40]]){c.strokeStyle='#d6b783';c.lineWidth=9;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.stroke();for(let n=0;n<8;n++){const a=n*Math.PI/4;c.beginPath();c.moveTo(x+Math.cos(a)*15,y+Math.sin(a)*15);c.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r);c.stroke();}}
 if(/smart/i.test(id)){c.fillStyle='#06131d';c.fillRect(-256,-256,512,512);c.fillStyle='#8ae9c7';c.font='bold 100px Arial';c.fillText('10:10',0,10);c.font='32px Arial';c.fillText('POKER21',0,88);}
 const texture=new T.CanvasTexture(dial);texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=4;const face=add((square?new T.PlaneGeometry(.13,.13):new T.CircleGeometry(.066,64)),new T.MeshStandardMaterial({map:texture,roughness:.34,metalness:.10}),0,0,.098);
 const crystal=add((square?new T.PlaneGeometry(.13,.13):new T.CircleGeometry(.066,64)),new T.MeshPhysicalMaterial({color:'#e7f4ff',transparent:true,opacity:.11,roughness:.05,metalness:0,clearcoat:1,depthWrite:false}),0,0,.101);
 const crown=add(new T.CylinderGeometry(.012,.012,.019,16),metal,.085,0,.08);crown.rotation.z=Math.PI/2;
 return {group,dispose(){const materials=new Set();group.traverse(o=>{o.geometry?.dispose();if(o.material)materials.add(o.material);});for(const m of materials)m.dispose();texture.dispose();}};
}
export function fingerRing(color='#d3b15b',id='rubyLion'){
 const group=new T.Group();group.name='wardrobe-finger-ring';group.position.set(.731,-.225,.07);
 const silver=['silverSpade','clubSignet','diamondKing'].includes(id),gold=new T.MeshStandardMaterial({color:silver?'#c6d3df':'#c5a14d',metalness:.9,roughness:.24}),stone=new T.MeshPhysicalMaterial({color:id==='rubyLion'?'#a51c39':id==='emeraldCrown'?'#167953':id==='diamondKing'?'#e8f7ff':color,metalness:.08,roughness:.10,clearcoat:1});
 const band=new T.Mesh(new T.TorusGeometry(.026,.006,12,48),gold);band.name='ring-band';band.rotation.x=Math.PI/2;group.add(band);
 const bezel=new T.Mesh(id==='clubSignet'?new T.CylinderGeometry(.021,.019,.012,8):new T.BoxGeometry(.029,.029,.012),gold);if(id==='clubSignet')bezel.rotation.x=Math.PI/2;bezel.name='ring-bezel';bezel.position.z=.028;group.add(bezel);
 let geo;if(id==='silverSpade'){const sh=new T.Shape();sh.moveTo(0,.019);sh.bezierCurveTo(-.008,.007,-.022,-.002,-.012,-.009);sh.quadraticCurveTo(-.004,-.014,0,-.006);sh.quadraticCurveTo(.004,-.014,.012,-.009);sh.bezierCurveTo(.022,-.002,.008,.007,0,.019);sh.lineTo(.006,-.017);sh.lineTo(-.006,-.017);sh.closePath();geo=new T.ExtrudeGeometry(sh,{depth:.003,bevelEnabled:false});}else if(id==='clubSignet'||id==='goldAces'){geo=new T.BoxGeometry(.022,.025,.004);}else geo=id==='emeraldCrown'?new T.BoxGeometry(.020,.024,.012):new T.OctahedronGeometry(id==='diamondKing'?.021:.017);
 const gem=new T.Mesh(geo,id==='silverSpade'||id==='goldAces'?gold:stone);gem.name='ring-face:'+id;gem.scale.z=.5;gem.position.z=.039;group.add(gem);
 if(['clubSignet','goldAces'].includes(id)){const canvas=document.createElement('canvas');canvas.width=canvas.height=128;const c=canvas.getContext('2d');c.fillStyle=silver?'#24343d':'#45341a';c.fillRect(0,0,128,128);c.fillStyle=silver?'#e1eaf1':'#edce83';c.font='bold 48px Arial';c.textAlign='center';c.textBaseline='middle';c.fillText(id==='goldAces'?'AA':'P21',64,66,116);stone.map=new T.CanvasTexture(canvas);stone.map.colorSpace=T.SRGBColorSpace;gem.material=stone;}
 return {group,dispose(){group.traverse(o=>o.geometry?.dispose());stone.map?.dispose();gold.dispose();stone.dispose();}};
}
