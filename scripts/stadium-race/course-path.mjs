export function createCourseSampler(E){
  const points=[{x:0,z:0,a:0}];for(let d=10;d<=E.FINISH+6000;d+=10){const p=points.at(-1),a=p.a+E.road(d-5).curve*.0065;points.push({x:p.x+Math.sin(a)*.6,z:p.z+Math.cos(a)*.6,a});}
  function rise(d,start,end,height){return d>start&&d<end?height*Math.sin(Math.PI*(d-start)/(end-start))**2:0;}
  function sample(d,lateral=0,tier=0){if(d<0)return {x:-lateral*6,z:d*.06,y:0,a:0};d=Math.max(0,Math.min(points.length*10-11,d));const n=Math.floor(d/10),u=d/10-n,p=points[n],q=points[n+1],a=p.a+(q.a-p.a)*u,r=E.road(d),local=r.local;const hill=rise(d,5500,8150,3.2)+rise(d,E.LAP+4650,E.LAP+8900,4.8)+(r.bridge?Math.sin((local-8500)/1300*Math.PI)*2.8:Math.sin(local*.0017)*1.0+Math.sin(local*.0033)*.45);return {x:p.x+(q.x-p.x)*u-Math.cos(a)*lateral*E.roadWidth(d),z:p.z+(q.z-p.z)*u+Math.sin(a)*lateral*E.roadWidth(d),y:hill+E.deckHeight(d,tier),a};}
  return sample;
}
