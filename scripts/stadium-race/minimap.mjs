const colors=['#ff786c','#d896ff','#ffc96b'];
export function radarPoint(point,origin,heading,scale=.65){
 const dx=point.x-origin.x,dz=point.z-origin.z;
 return {x:76+(-dx*Math.cos(heading)+dz*Math.sin(heading))*scale,y:99-(dx*Math.sin(heading)+dz*Math.cos(heading))*scale};
}
export function radarMarker(point){
 const dx=point.x-76,dy=point.y-76,k=Math.max(1,Math.abs(dx)/62,Math.abs(dy)/62);
 return {x:76+dx/k,y:76+dy/k,offscreen:k>1,angle:Math.atan2(dy,dx)};
}
export function createMinimap(host,E,sample){
 const root=document.createElement('div');root.className='race3d-minimap';
 root.innerHTML='<div class="race3d-map-title"><span data-map-zone>СТАДИОН</span><b data-map-progress>0%</b></div><canvas width="304" height="304" role="img" aria-label="Карта трассы и соперников"></canvas><div class="race3d-map-legend"><i></i>ВЫ <span><i></i><i></i><i></i>СОПЕРНИКИ</span></div>';
 host.appendChild(root);const canvas=root.querySelector('canvas'),c=canvas.getContext('2d'),zone=root.querySelector('[data-map-zone]'),progress=root.querySelector('[data-map-progress]');let last=-Infinity,markers=[];
 function path(points,color,width){if(points.length<2)return;c.beginPath();points.forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y));c.strokeStyle=color;c.lineWidth=width;c.lineJoin='round';c.lineCap='round';c.stroke();}
 return {update(s,now=performance.now()){
  if(now-last<50)return;last=now;const origin=sample(s.distance,s.lateral,s.tier),heading=origin.a-(s.heading||0),project=p=>radarPoint(p,origin,heading);
  c.setTransform(2,0,0,2,0,0);c.clearRect(0,0,152,152);c.save();c.beginPath();c.rect(3,3,146,146);c.clip();
  c.strokeStyle='#a8c5cd0b';c.lineWidth=1;for(let n=0;n<152;n+=19){c.beginPath();c.moveTo(n,0);c.lineTo(n,152);c.moveTo(0,n);c.lineTo(152,n);c.stroke();}
  const road=[],ahead=[];for(let d=Math.max(0,s.distance-3400);d<=Math.min(E.FINISH,s.distance+4400);d+=35){const p=project(sample(d));road.push(p);if(d>=s.distance)ahead.push(p);}
  path(road,'#07121c',12);path(road,'#5e7481',8);path(ahead,'#60d8df',3);
  for(const deck of E.overpasses){if(deck.end<s.distance-2000||deck.start>s.distance+3400)continue;const route=[];for(let d=deck.start;d<=deck.end;d+=40)route.push(project(sample(d,deck.center,1)));c.setLineDash([3,3]);path(route,'#efcc7e',2);c.setLineDash([]);}
  const finish=project(sample(E.FINISH));if(finish.x>6&&finish.x<146&&finish.y>6&&finish.y<146){c.fillStyle='#fff';c.fillRect(finish.x-5,finish.y-5,10,10);c.fillStyle='#0b1d29';for(let x=0;x<2;x++)for(let y=0;y<2;y++)c.fillRect(finish.x-5+x*5,finish.y-5+y*5+(x%2?2.5:0),2.5,2.5);}
  markers=s.rivals.map((r,i)=>{const marker=radarMarker(project(sample(r.distance,r.lateral,r.tier))),rank=1+[s,...s.rivals.filter((_,j)=>j!==i)].filter(car=>car.distance>r.distance).length;c.save();c.translate(marker.x,marker.y);c.fillStyle=colors[i%3];c.strokeStyle='#112331';c.lineWidth=2;
   if(marker.offscreen){c.rotate(marker.angle);c.beginPath();c.moveTo(6,0);c.lineTo(-4,-4);c.lineTo(-4,4);c.closePath();c.fill();c.stroke();}else{c.beginPath();c.arc(0,0,6.5,0,Math.PI*2);c.fill();c.stroke();c.fillStyle='#13202b';c.font='bold 8px Arial';c.textAlign='center';c.fillText(String(rank),0,3);}c.restore();return {...marker,name:r.name,rank,gap:Math.round((r.distance-s.distance)*.06)};});
  c.translate(76,99);c.beginPath();c.moveTo(0,-8);c.lineTo(6,6);c.lineTo(0,3);c.lineTo(-6,6);c.closePath();c.fillStyle='#fff6d9';c.fill();c.strokeStyle='#d9ad53';c.lineWidth=1.5;c.stroke();c.restore();
  zone.textContent=s.routeZone==='bridge'?'МОСТ':s.routeZone==='city'?(E.road(s.distance).local>7300?'ПОРТ':'НАБЕРЕЖНАЯ'):'СТАДИОН';progress.textContent=s.progress+'%';canvas.setAttribute('aria-label','Карта. Вы: '+s.position+' место. '+markers.map(m=>m.name+': '+m.rank+' место, '+(m.gap>=0?'впереди ':'позади ')+Math.abs(m.gap)+' м').join('. '));
 },snapshot(){return {rivals:markers.map(m=>({...m})),width:152};}};
}
