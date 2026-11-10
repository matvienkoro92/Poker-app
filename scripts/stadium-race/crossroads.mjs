import * as T from '../../vendor/three/three.module.min.js';
export function createCrossroads(scene,E,sample,block){
 const groups=[];
 for(const junction of E.crossings){
  const root=new T.Group(),p=sample(junction.distance),edge=E.roadLayout(junction.distance).halfWidth;root.position.set(p.x,p.y,p.z);root.rotation.y=p.a;scene.add(root);
  const signals=[];
  for(const side of [-1,1]){
   // A full-width street mouth and separated pavement; no facade in the car's path.
   block(root,'#30373a',side*(edge+12),-.035,0,24,.045,8);
   for(const z of [-5.2,5.2]){block(root,'#a2a69d',side*(edge+12),-.04,z,24,.18,2.3);for(let n=0;n<7;n++)block(root,'#6c756f',side*(edge+3+n*3),.65,z,.1,1.3,.1);}
   block(root,'#ddd8c3',side*(edge+2.7),.008,side*1.8,.3,.016,3.3);
   for(let n=0;n<6;n++)block(root,'#d4d7c8',side*(edge+6),.009,-2.8+n*1.12,2.8,.018,.55);
   block(root,'#566b70',side*(edge+1.3),2.8,-5,.13,5.6,.13);
   const light=new T.Group();light.position.set(side*(edge+1.3),5,-5);light.rotation.y=side*Math.PI/2;root.add(light);
   block(light,'#15262f',0,0,0,.45,1.25,.35);
   const red=block(light,'#e45040',0,.33,-.19,.23,.23,.04),amber=block(light,'#f0bd53',0,0,-.19,.23,.23,.04),green=block(light,'#51cda0',0,-.33,-.19,.23,.23,.04);signals.push({red,amber,green});
   // Street corner: hydrant, litter bin and curb ramps rather than empty grass.
   block(root,'#954d40',side*(edge+2),.45,6,.3,.9,.3);block(root,'#b19e73',side*(edge+2),.88,6,.42,.14,.42);
   block(root,'#45534f',side*(edge+2.2),.48,-7,.55,.96,.55);
  }
  groups.push({root,junction,signals});
 }
 return {update(distance,tick){const cars=E.crossTrafficAt(tick);for(const item of groups){item.root.visible=Math.abs(item.junction.distance-distance)<2200;const phase=cars[item.junction.id].phase;for(const light of item.signals){light.red.userData.batchHidden=phase>=240&&phase<600;light.amber.userData.batchHidden=phase<210||phase>=240;light.green.userData.batchHidden=phase<240||phase>=600;}}},snapshot(){return groups.filter(g=>g.root.visible).map(g=>g.junction.id);}};
}
