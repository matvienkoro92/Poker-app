// Loading is independent of rendering and starts once within the villa approach zone.
export function createInteriorProximity(load,{x,z,radius=65,disposed=()=>false,now=()=>Date.now()}={}){
 let state='idle',pending=null,retryAt=0;
 function ensure(){
  if(disposed())return Promise.resolve(false);
  if(pending)return pending;
  if(now()<retryAt)return Promise.resolve(false);
  state='loading';pending=Promise.resolve().then(()=>disposed()?false:load()).then(result=>{state=disposed()?'disposed':'ready';return result;}).catch(()=>{state=disposed()?'disposed':'failed';retryAt=now()+30000;pending=null;return false;});return pending;
 }
 return {ensure,update(position){if(!disposed()&&Math.hypot(position.x-x,position.z-z)<=radius)void ensure();},get state(){return state;}};
}
