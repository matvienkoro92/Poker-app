// Ballistic arc from the 1.1 m ramp lip to the road; simulation owns airtime.
export function jumpPose(air,duration,speed){
 if(!(air>0&&duration>0))return {height:0,pitch:0};
 const total=duration/60,t=Math.max(0,Math.min(total,(duration-air)/60)),gravity=9.81;
 const velocity=(.5*gravity*total*total-1.1)/total;
 return {height:Math.max(0,1.1+velocity*t-.5*gravity*t*t),pitch:-Math.max(-.22,Math.min(.22,Math.atan2(velocity-gravity*t,Math.max(6,speed*3.6))))};
}
