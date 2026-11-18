// +Z points south on the map, so a clockwise turn has a positive cross product.
export function drivingDirections(position,waypoints,target){
 const points=[position];
 for(const point of [...waypoints,target]){
  const last=points.at(-1);
  if(Math.hypot(point.x-last.x,point.z-last.z)>.05)points.push(point);
 }
 let distance=0,turn=null,previous=null;
 for(let i=1;i<points.length;i++){
  const dx=points[i].x-points[i-1].x,dz=points[i].z-points[i-1].z,length=Math.hypot(dx,dz);
  if(length>=2){
   if(previous&&!turn){
    const angle=Math.atan2(previous.x*dz-previous.z*dx,previous.x*dx+previous.z*dz);
    if(Math.abs(angle)>Math.PI/5)turn={distance,direction:Math.abs(angle)>2.65?'Разворот':angle>0?'Направо':'Налево'};
   }
   previous={x:dx,z:dz};
  }
  distance+=length;
 }
 return {distance,turn};
}

export function navigationText({distance,turn}){
 const metres=Math.round(distance);
 if(metres<=5)return 'Вы у цели';
 const remaining=metres>=1000?(metres/1000).toFixed(1).replace('.',',')+' км':metres+' м';
 if(!turn||turn.distance>160)return 'До цели по маршруту · '+remaining;
 return turn.direction+(turn.distance<7?' здесь':' через '+Math.round(turn.distance)+' м')+' · до цели '+remaining;
}
