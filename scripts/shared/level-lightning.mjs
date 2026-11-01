import {createFrame,clearFrame,createFx,composite} from '../vendor/pixelfx/core/fx.js';
import * as zap from '../vendor/pixelfx/fx/lightning/zap-hit.js';

// A small local arc beside the new level, without flashing the whole screen.
export function playLevelLightning(label){
 if(document.hidden||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const canvas=document.createElement('canvas');canvas.width=144;canvas.height=112;
 canvas.dataset.levelLightning='';canvas.setAttribute('aria-hidden','true');
 canvas.style.cssText='position:absolute;right:-12px;top:50%;transform:translateY(-50%);width:100px;height:78px;pointer-events:none;image-rendering:pixelated;z-index:2';
 const ctx=canvas.getContext('2d');if(!ctx)return;
 label.style.position='relative';label.append(canvas);
 const frame=createFrame(144,112),image=ctx.createImageData(144,112),fx=createFx(zap,{x:76,y:56,seed:3,light:.65});
 let raf=0,last=0,observer;
 function stop(){cancelAnimationFrame(raf);canvas.remove();observer?.disconnect();document.removeEventListener('visibilitychange',stop);label.closest('dialog')?.removeEventListener('close',stop);}
 function tick(now){if(!label.isConnected||!label.getClientRects().length||document.hidden){stop();return;}fx.update(last?Math.min((now-last)/1000,1/30):1/60);last=now;clearFrame(frame);fx.draw(frame);composite(frame,image.data);ctx.putImageData(image,0,0);if(fx.done())stop();else raf=requestAnimationFrame(tick);}
 observer=new MutationObserver(()=>{if(!label.isConnected)stop();});observer.observe(label.parentElement,{childList:true});
 document.addEventListener('visibilitychange',stop);label.closest('dialog')?.addEventListener('close',stop);raf=requestAnimationFrame(tick);
}
