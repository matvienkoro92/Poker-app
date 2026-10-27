export function mobileGraphics({width=globalThis.innerWidth,height=globalThis.innerHeight,coarse=globalThis.matchMedia?.('(pointer: coarse)').matches||false,dpr=globalThis.devicePixelRatio||1}={}){
 const mobile=coarse||Math.min(width,height)<600;
 return {mobile,pixelRatio:Math.min(dpr,mobile?1.25:2),ballSegments:mobile?[32,24]:[64,48],shadowSize:mobile?1024:2048,fps:mobile?30:60};
}
export function createFrameBudget(fps){
 let next=0;
 return {reset(){next=0;},ready(now,{hidden=false,active=true}={}){if(hidden){next=0;return false;}if(now+.5<next)return false;const interval=1000/(active?fps:15);next=now+interval-(Math.max(0,now-next)%interval);return true;}};
}
