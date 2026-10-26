// Animate motion at display cadence; park quiet games and stop entirely in the background.
export function createFrameLoop(run,{active=()=>false,isHidden=()=>document.hidden,idleMs=200}={}){
 let frame=null,timer=null,closed=false;
 function clear(){if(frame!==null)cancelAnimationFrame(frame);if(timer!==null)clearTimeout(timer);frame=timer=null;}
 function tick(now){frame=null;if(closed||isHidden())return;run(now);if(closed||isHidden()||frame!==null||timer!==null)return;if(active())frame=requestAnimationFrame(tick);else timer=setTimeout(()=>{timer=null;wake();},idleMs);}
 function wake(){if(closed||isHidden())return;if(timer!==null){clearTimeout(timer);timer=null;}if(frame===null)frame=requestAnimationFrame(tick);}
 return {wake,pause:clear,dispose(){closed=true;clear();}};
}
