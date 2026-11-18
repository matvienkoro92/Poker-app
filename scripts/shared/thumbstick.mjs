// Measure travel from touchdown so an off-centre first touch is neutral.
export function thumbstick(origin,event,radius){
 const dx=event.clientX-origin.x,dy=event.clientY-origin.y;
 const ratio=Math.min(1,radius/Math.max(1,Math.hypot(dx,dy)));
 function axis(offset){
  const value=offset*ratio/radius;
  return Math.sign(value)*Math.max(0,(Math.abs(value)-.10)/.90);
 }
 return {x:axis(dx),y:axis(dy),px:dx*ratio,py:dy*ratio};
}
