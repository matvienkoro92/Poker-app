import * as T from '../../vendor/three/three.module.min.js';
// Only the player's two lamps illuminate geometry; no additional shadow maps.
export function createHeadlights(scene){
 const lamps=[-1,1].map(side=>{const light=new T.SpotLight('#e8f1ff',28,32,.36,.65,1.5);light.castShadow=false;scene.add(light,light.target);return {light,side};});
 return {update(p,heading,enabled){const a=p.a-heading,sin=Math.sin(a),cos=Math.cos(a);for(const {light,side}of lamps){light.visible=enabled;if(!enabled)continue;light.position.set(p.x+sin*1.95+cos*side*.65,p.y+.7,p.z+cos*1.95-sin*side*.65);light.target.position.set(p.x+sin*18+cos*side*.9,p.y-.15,p.z+cos*18-sin*side*.9);}}};
}
