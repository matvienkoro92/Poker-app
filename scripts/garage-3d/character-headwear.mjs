import * as T from '../../vendor/three/three.module.min.js';
export function addSculptedHeadwear(rig,look,G){
 const id=look.hat,group=new T.Group(),geometries=[],materials=[],textures=[];
 if(!id||id==='none'||look.helmet&&look.helmet!=='none')return {dispose(){}};group.name='headwear:'+id;
 const material=(color,roughness=.88,metalness=0)=>{const m=new T.MeshStandardMaterial({color,roughness,metalness,side:T.DoubleSide});materials.push(m);return m;},cloth=material(G.item('hat',id).color),edge=material(new T.Color(G.item('hat',id).color).multiplyScalar(.66)),thread=material('#a79672'),dark=material('#242422');
 const add=(g,m)=>{geometries.push(g);const mesh=new T.Mesh(g,m);mesh.castShadow=mesh.receiveShadow=true;group.add(mesh);return mesh;};
 const line=(points,r,m,closed=false)=>add(new T.TubeGeometry(new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)),closed),64,r,8,closed),m);
 function ring(y,rx,rz,r,m){const p=[];for(let n=0;n<64;n++){const a=n/64*Math.PI*2;p.push([Math.cos(a)*rx,y,.015+Math.sin(a)*rz]);}line(p,r,m,true);}
 function brim(inner,outer,y,fall,m){const p=[],uv=[],idx=[],rings=12,sides=96;for(let j=0;j<=rings;j++)for(let n=0;n<=sides;n++){const a=n/sides*Math.PI*2,t=j/rings,r=inner+(outer-inner)*t;p.push(r*Math.cos(a),y-fall*t*t,.015+r*.92*Math.sin(a));uv.push(n/sides,j/rings);if(j<rings&&n<sides){const k=j*(sides+1)+n;idx.push(k,k+1,k+sides+1,k+1,k+sides+2,k+sides+1);}}const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();add(g,m);ring(y-fall,outer,outer*.92,.004,edge);}
 if(/straw/i.test(id)){
  const crown=new T.CylinderGeometry(.245,.282,.245,64,8);crown.translate(0,1.955,.015);add(crown,cloth);brim(.27,.48,1.836,.030,cloth);ring(1.854,.285,.269,.017,dark);
  for(let y=1.86;y<2.075;y+=.012)ring(y,.282-(y-1.83)*.14,.26-(y-1.83)*.12,.0014,thread);
  for(let r=.30;r<.48;r+=.013)ring(1.836-.03*((r-.27)/.21)**2,r,r*.92,.0012,thread);
 }else if(/bucket|duck/i.test(id)){
  const crown=new T.CylinderGeometry(.255,.293,.215,64,8);crown.translate(0,1.952,.015);add(crown,cloth);brim(.29,.363,1.845,.053,cloth);ring(1.85,.294,.276,.0025,edge);ring(2.054,.255,.245,.002,edge);
  const canvas=document.createElement('canvas');canvas.width=canvas.height=256;const c=canvas.getContext('2d');c.fillStyle=G.item('hat',id).color;c.fillRect(0,0,256,256);for(let y=30;y<256;y+=70)for(let x=20;x<256;x+=80){c.fillStyle='#d9ad42';c.beginPath();c.ellipse(x,y,12,8,0,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+9,y-7,6,0,Math.PI*2);c.fill();c.fillStyle='#e89c34';c.fillRect(x+13,y-8,6,3);c.fillStyle='#201a13';c.fillRect(x+10,y-9,2,2);}const map=new T.CanvasTexture(canvas);map.colorSpace=T.SRGBColorSpace;map.wrapS=map.wrapT=T.RepeatWrapping;map.repeat.set(4,1);textures.push(map);cloth.map=map;
 }else{
  const cap=new T.SphereGeometry(1,64,36,0,Math.PI*2,0,Math.PI*.51);cap.scale(.305,.235,.288);cap.translate(0,1.82,.015);add(cap,cloth);ring(1.818,.305,.288,.007,edge);
  const pos=[],uv=[],idx=[],nx=32,nz=16;for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){const u=i/nx*2-1,v=j/nz,x=u*(.292-.018*v),z=.17+.40*Math.sqrt(Math.max(.08,1-u*u))*v,y=1.814-.028*v-.027*u*u*v;pos.push(x,y,z);uv.push(i/nx,j/nz);if(i<nx&&j<nz){const k=j*(nx+1)+i;idx.push(k,k+1,k+nx+1,k+1,k+nx+2,k+nx+1);}}const visor=new T.BufferGeometry();visor.setAttribute('position',new T.Float32BufferAttribute(pos,3));visor.setAttribute('uv',new T.Float32BufferAttribute(uv,2));visor.setIndex(idx);visor.computeVertexNormals();add(visor,cloth);
  const hem=[];for(let i=0;i<=nx;i++){const u=i/nx*2-1;hem.push([u*.274,1.786-.027*u*u,.17+.40*Math.sqrt(Math.max(.08,1-u*u))]);}line(hem,.004,edge);
  for(let sector=0;sector<6;sector++){const a=sector/6*Math.PI*2,p=[];for(let j=0;j<=24;j++){const t=j/24*Math.PI/2;p.push([.307*Math.sin(t)*Math.cos(a),1.82+.237*Math.cos(t),.015+.290*Math.sin(t)*Math.sin(a)]);}line(p,.0017,edge);}
  const button=new T.SphereGeometry(.015,20,12);button.translate(0,2.058,.015);add(button,edge);
  if(/propeller/i.test(id)){const metal=material('#c7c4b9',.35,.8),stem=new T.CylinderGeometry(.006,.006,.065,12);stem.translate(0,2.09,.015);add(stem,metal);for(let n=0;n<3;n++){const blade=new T.SphereGeometry(1,20,12);blade.scale(.115,.007,.027);blade.translate(.086,0,0);blade.rotateY(n/3*Math.PI*2);blade.translate(0,2.126,.015);add(blade,material(['#ba3847','#3e83ae','#d4b74a'][n]));}}
  else{
   const canvas=document.createElement('canvas');canvas.width=256;canvas.height=128;const c=canvas.getContext('2d');c.clearRect(0,0,256,128);c.fillStyle='#d0b77a';c.font='bold 62px Arial';c.textAlign='center';c.fillText('P21',128,88);const map=new T.CanvasTexture(canvas);map.colorSpace=T.SRGBColorSpace;textures.push(map);const badge=new T.MeshStandardMaterial({map,transparent:true,alphaTest:.1,roughness:.9});materials.push(badge);const g=new T.PlaneGeometry(.12,.06);g.translate(0,1.945,.265);add(g,badge);
  }
 }
 rig.bones.head.add(group);group.position.copy(new T.Vector3(...rig.bones.head.userData.rest).negate());
 return {dispose(){group.removeFromParent();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());}};
}
