import * as T from '../../vendor/three/three.module.min.js';
export function quarterLightState(distance,E){
 const first=Math.floor(distance/200);
 return Array.from({length:2},(_,slot)=>{const index=first+((slot-first)%2+2)%2,d=index*200,r=E.road(d),side=index%2?-1:1,fade=Math.max(0,1-Math.abs(d-distance)/200);
  return {distance:d,lateral:-side*(8.3+(E.roadWidth(d)-6)*1.5)/E.roadWidth(d),intensity:r.city&&!r.bridge?85*fade*fade:0};
 });
}
// Two local lamps, with no shadow maps; fade to zero before their pool slot moves.
export function createQuarterLighting(scene,E,sample){
 const lights=Array.from({length:2},()=>{const light=new T.PointLight('#ffd19a',0,17,2);scene.add(light);return light;});
 return {update(distance){quarterLightState(distance,E).forEach((state,slot)=>{
  const light=lights[slot],p=sample(state.distance,state.lateral);light.position.set(p.x,p.y+5.15,p.z);light.intensity=state.intensity;
 });},snapshot(){return lights.map(light=>({intensity:light.intensity,position:light.position.toArray()}));}};
}
