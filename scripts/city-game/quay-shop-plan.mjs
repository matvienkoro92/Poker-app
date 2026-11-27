// Each shop has an open doorway between solid display windows.
export function quayShopPlan(b){
 const florist=b.shop==='ЦВЕТЫ',sign=florist?-1:1,front=b.z+sign*b.d/2;
 const depth=florist?3.4:4.8,wing=(b.w-1.8)/2;
 const rect=(x,z,w,d,h)=>({minX:x-w/2,maxX:x+w/2,minZ:z-d/2,maxZ:z+d/2,h});
 const fixtures=florist?
  [{x:-2.56,inset:.91,w:2.6,d:.85,h:.78},{x:2.56,inset:1.06,w:2.55,d:1.12,h:.74}]:
  [{x:-2.63,inset:.98,w:2.34,d:.98,h:.42},{x:2.61,inset:2.25,w:2.6,d:1.25,h:1.05}];
 return {front,sign,depth,fixtures,solids:[
  rect(b.x,b.z-sign*depth/2,b.w,b.d-depth,b.h),
  ...[-1,1].flatMap(side=>[
   rect(b.x+side*(b.w/2-.11),front-sign*depth/2,.22,depth,3.6),
   rect(b.x+side*(.9+wing/2),front,wing,.16,3.6)
  ]),
  ...(florist?[rect(b.x+2.44,front-sign*(depth-.52),1.26,.61,1.78)]:[]),
  ...fixtures.map(f=>rect(b.x+f.x,front-sign*f.inset,f.w,f.d,f.h))
 ]};
}
