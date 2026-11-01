import {createFrame,clearFrame,createFx,composite} from '../vendor/pixelfx/core/fx.js';
import * as confetti from '../vendor/pixelfx/fx/ui/confetti.js';

// Inside the result dialog so the browser's modal top layer does not hide it.
export function playVictoryConfetti(dialog){
 if(!dialog.open||document.hidden||matchMedia('(prefers-reduced-motion: reduce)').matches)return ()=>{};
 const canvas=document.createElement('canvas');canvas.width=240;canvas.height=160;
 canvas.setAttribute('aria-hidden','true');canvas.dataset.victoryConfetti='';
 canvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;image-rendering:pixelated;z-index:5;object-fit:contain';
 const previousPosition=dialog.style.position;
 if(getComputedStyle(dialog).position==='static')dialog.style.position='relative';
 const ctx=canvas.getContext('2d');if(!ctx)return ()=>{};
 dialog.append(canvas);
 const frame=createFrame(240,160),image=ctx.createImageData(240,160),fx=createFx(confetti,{x:120,y:145,seed:42});
 let raf=0,last=0,elapsed=0,stopped=false;
 function stop(){if(stopped)return;stopped=true;cancelAnimationFrame(raf);canvas.remove();dialog.style.position=previousPosition;document.removeEventListener('visibilitychange',stop);dialog.removeEventListener('close',stop);}
 function tick(now){if(!dialog.open||!dialog.isConnected||document.hidden){stop();return;}const dt=last?Math.min((now-last)/1000,1/30):1/30;last=now;elapsed+=dt;fx.update(dt);clearFrame(frame);fx.draw(frame);composite(frame,image.data);ctx.putImageData(image,0,0);if(fx.done()||elapsed>=3.5)stop();else raf=requestAnimationFrame(tick);}
 document.addEventListener('visibilitychange',stop);dialog.addEventListener('close',stop);raf=requestAnimationFrame(tick);return stop;
}
