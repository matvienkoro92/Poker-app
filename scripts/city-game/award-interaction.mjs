import * as T from '../../vendor/three/three.module.min.js';

export function createAwardInteraction({root,scene,camera,canvas}){
 const ray=new T.Raycaster(),point=new T.Vector3(),player=new T.Vector3(),local=new T.Vector3(),forward=new T.Vector3();
 const records=()=>root.userData.awardTargets||[];
 function allowed(record,state){if(state.driving||state.failed)return false;player.set(state.player.x,0,state.player.z);local.copy(player);root.worldToLocal(local);if(local.z<1.2)return false;record.target.getWorldPosition(point);return Math.hypot(player.x-point.x,player.z-point.z)<3.8;}
 function nearest(state){camera.getWorldDirection(forward);let best=null,score=Infinity;for(const r of records()){if(!allowed(r,state))continue;r.target.getWorldPosition(point);if(point.clone().sub(camera.position).dot(forward)<=0)continue;point.project(camera);const s=point.x*point.x+point.y*point.y;if(s<score){score=s;best=r;}}return best;}
 function pick(x,y,state){const rect=canvas.getBoundingClientRect();ray.setFromCamera(new T.Vector2((x-rect.left)/rect.width*2-1,1-(y-rect.top)/rect.height*2),camera);scene.updateMatrixWorld(true);const visible=o=>{for(let p=o;p;p=p.parent)if(!p.visible)return false;return true;};const hit=ray.intersectObjects(scene.children,true).find(h=>visible(h.object));const record=hit?.object.userData.awardRecord;return record&&allowed(record,state)?record:null;}
 return {nearest,pick,records};
}
