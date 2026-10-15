import * as T from '../../vendor/three/three.module.min.js';
export function wristWatch(id,color='#c5b899'){
 const group=new T.Group();group.name='wardrobe-wrist-watch';group.position.set(.79,.035,.04);group.rotation.z=-.12;
 const gold=/gold|rose|bronze|DayDate|Skeleton/i.test(id),metal=new T.MeshStandardMaterial({color:gold?color:'#b7c2c9',metalness:.88,roughness:.24}),strap=new T.MeshStandardMaterial({color:/roseDress|bronzePilot/.test(id)?'#51382c':'#171d22',roughness:.66,metalness:.1});
 const add=(geo,material,x,y,z)=>{const mesh=new T.Mesh(geo,material);mesh.position.set(x,y,z);group.add(mesh);return mesh;};
 const band=add(new T.TorusGeometry(.105,.016,12,64),/Dress|Pilot|smart/i.test(id)?strap:metal,0,0,0);band.rotation.x=Math.PI/2;band.scale.x=.78;
 if(!/Dress|Pilot|smart/i.test(id))for(let n=0;n<18;n++){const a=n*Math.PI/9;const link=add(new T.BoxGeometry(.026,.049,.016),metal,Math.cos(a)*.083,0,Math.sin(a)*.105);link.rotation.y=-a;}
 const body=add(new T.CylinderGeometry(.078,.073,.022,64),metal,0,0,.119);body.rotation.x=Math.PI/2;
 const bezel=add(new T.TorusGeometry(.069,.006,12,64),metal,0,0,.136);
 const dial=document.createElement('canvas');dial.width=dial.height=512;const c=dial.getContext('2d'),green=/green|Submariner|DayDate/i.test(id),white=/Daytona|square|rose/i.test(id);const glow=c.createRadialGradient(190,170,20,256,256,256);glow.addColorStop(0,green?'#237050':white?'#fff7db':'#294559');glow.addColorStop(1,green?'#072b20':white?'#c7c4b4':'#06121c');c.fillStyle=glow;c.fillRect(0,0,512,512);c.translate(256,256);
 for(let n=0;n<60;n++){c.save();c.rotate(n*Math.PI/30);c.strokeStyle=white?'#283333':'#f2dfb3';c.lineWidth=n%5?3:9;c.beginPath();c.moveTo(0,-221);c.lineTo(0,n%5?-207:-184);c.stroke();c.restore();}
 const hand=(angle,length,width)=>{c.save();c.rotate(angle);c.strokeStyle=white?'#203337':'#f4e4bb';c.lineWidth=width;c.lineCap='round';c.beginPath();c.moveTo(0,18);c.lineTo(0,-length);c.stroke();c.restore();};hand(-Math.PI/3,112,13);hand(Math.PI/3,168,9);hand(Math.PI*.1,183,3);c.fillStyle='#d7b66e';c.beginPath();c.arc(0,0,14,0,Math.PI*2);c.fill();c.font='bold 28px Arial';c.textAlign='center';c.fillStyle=white?'#334449':'#e3d6ac';c.fillText('♠',0,-80);
 const texture=new T.CanvasTexture(dial);texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=4;const face=add(new T.CircleGeometry(.066,64),new T.MeshStandardMaterial({map:texture,roughness:.34,metalness:.10}),0,0,.139);
 const crystal=add(new T.CircleGeometry(.066,64),new T.MeshPhysicalMaterial({color:'#e7f4ff',transparent:true,opacity:.11,roughness:.05,metalness:0,clearcoat:1,depthWrite:false}),0,0,.142);
 const crown=add(new T.CylinderGeometry(.012,.012,.019,16),metal,.085,0,.12);crown.rotation.z=Math.PI/2;
 return {group,dispose(){const materials=new Set();group.traverse(o=>{o.geometry?.dispose();if(o.material)materials.add(o.material);});for(const m of materials)m.dispose();texture.dispose();}};
}
export function fingerRing(color='#d3b15b'){
 const group=new T.Group();group.name='wardrobe-finger-ring';group.position.set(.731,-.225,.07);
 const gold=new T.MeshStandardMaterial({color:'#c5a14d',metalness:.9,roughness:.24}),stone=new T.MeshStandardMaterial({color,metalness:.25,roughness:.13});const band=new T.Mesh(new T.TorusGeometry(.026,.006,12,48),gold);band.rotation.x=Math.PI/2;group.add(band);const bezel=new T.Mesh(new T.BoxGeometry(.026,.026,.012),gold);bezel.position.z=.028;group.add(bezel);const gem=new T.Mesh(new T.OctahedronGeometry(.017),stone);gem.scale.z=.5;gem.position.z=.039;group.add(gem);return {group,dispose(){group.traverse(o=>o.geometry?.dispose());gold.dispose();stone.dispose();}};
}
