import * as T from '../../vendor/three/three.module.min.js';
// Keep both lights in the renderer's light set during jumps. Changing visibility
// changes shader light counts and recompiles the scene at takeoff and landing.
// Zero intensity switches the beams off without rebuilding shader programs.
export function createHeadlights(scene){
 const lamps=[-1,1].map(side=>{const light=new T.SpotLight('#e8f1ff',10,24,.22,1,2);light.castShadow=false;scene.add(light,light.target);return {light,side};});
 return {update(p,heading,enabled){const a=p.a-heading,sin=Math.sin(a),cos=Math.cos(a);for(const {light,side}of lamps){light.intensity=enabled?10:0;light.position.set(p.x+sin*1.95+cos*side*.65,p.y+.7,p.z+cos*1.95-sin*side*.65);light.target.position.set(p.x+sin*15+cos*side*.9,p.y-.4,p.z+cos*15-sin*side*.9);}}};
}
