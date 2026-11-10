// Physics stays at 60 Hz; render between its last two poses at any display rate.
const fields=['distance','lateral','heading','steering','speed','currentSpeed','spin'];
export function captureMotion(state){return {...state,rivals:state.rivals.map(r=>({...r}))};}
function vehiclePose(previous,current,alpha){
 if(!previous||previous.tier!==current.tier||Math.abs(current.distance-previous.distance)>100)return current;
 const pose={...current};
 for(const key of fields)if(Number.isFinite(previous[key])&&Number.isFinite(current[key]))pose[key]=previous[key]+(current[key]-previous[key])*alpha;
 if(previous.air>0&&current.air>0&&previous.airDuration===current.airDuration)pose.air=previous.air+(current.air-previous.air)*alpha;
 return pose;
}
export function renderMotion(previous,current,alpha){
 if(!previous)return current;
 alpha=Math.max(0,Math.min(1,alpha));
 return {...vehiclePose(previous,current,alpha),rivals:current.rivals.map((r,i)=>vehiclePose(previous.rivals[i],r,alpha))};
}
