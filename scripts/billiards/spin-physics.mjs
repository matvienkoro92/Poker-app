import {tableSpec} from './table-geometry.mjs';
const clamp=(v,limit)=>Math.max(-limit,Math.min(limit,v));
export function validSpin(spin){return spin===undefined||!!spin&&typeof spin==='object'&&Number.isFinite(spin.x)&&Number.isFinite(spin.y)&&Math.hypot(spin.x,spin.y)<=1.000001;}
export function strikeSpin(b,angle,speed,spin={x:0,y:0}){const roll=1.625*spin.y*speed;b.rollX=Math.cos(angle)*roll;b.rollY=Math.sin(angle)*roll;b.side=-1.625*spin.x*speed;}
// rollX/rollY are r*omega projected into travel directions: v == roll is pure rolling.
// Sliding friction acts on v-roll; solid-sphere inertia gives angular response 5/2.
export function clothStep(b,dt,s){const gravity=9810*1000/tableSpec(s).length;let sx=b.vx-(b.rollX||0),sy=b.vy-(b.rollY||0),slip=Math.hypot(sx,sy);if(slip>.05){const amount=Math.min(.2*gravity*dt,slip/3.5),dx=sx/slip*amount,dy=sy/slip*amount;b.vx-=dx;b.vy-=dy;b.rollX=(b.rollX||0)+2.5*dx;b.rollY=(b.rollY||0)+2.5*dy;}else{const speed=Math.hypot(b.vx,b.vy),next=Math.max(0,speed-.018*gravity*dt);if(speed){b.vx*=next/speed;b.vy*=next/speed;}b.rollX=b.vx;b.rollY=b.vy;}b.side=Math.sign(b.side||0)*Math.max(0,Math.abs(b.side||0)-.018*gravity*dt);}
export function cushionImpact(b,nx,ny,restitution){const vn=b.vx*nx+b.vy*ny;if(vn>=0)return false;const impulse=-(1+restitution)*vn,tx=-ny,ty=nx,slip=b.vx*tx+b.vy*ty-(b.side||0),jt=clamp(-slip/3.5,.14*impulse);b.vx+=impulse*nx+jt*tx;b.vy+=impulse*ny+jt*ty;b.side=(b.side||0)-2.5*jt;return true;}
export function throwImpulse(a,b,nx,ny,normalImpulse){const tx=-ny,ty=nx,slip=(a.vx-b.vx)*tx+(a.vy-b.vy)*ty+(a.side||0)+(b.side||0),jt=clamp(slip/7,.04*normalImpulse);a.vx-=jt*tx;a.vy-=jt*ty;b.vx+=jt*tx;b.vy+=jt*ty;a.side=(a.side||0)-2.5*jt;b.side=(b.side||0)-2.5*jt;}
export function clearSpin(b){b.rollX=b.rollY=b.side=0;}
export function stillSliding(b){return Math.hypot(b.vx-(b.rollX||0),b.vy-(b.rollY||0))>1;}
