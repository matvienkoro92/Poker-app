// Draw on demand; moving scenes are capped independently of display refresh rate.
export function createRenderScheduler({render,active=()=>false,fps=30,document:doc=document,requestFrame=requestAnimationFrame,cancelFrame=cancelAnimationFrame}){
 let frame=0,dirty=false,disposed=false,last=-Infinity;
 function request(){if(disposed)return;dirty=true;if(!doc.hidden&&!frame)frame=requestFrame(tick);}
 function tick(time){frame=0;if(disposed||doc.hidden)return;const moving=active();if((dirty||moving)&&time-last>=1000/fps-.1){dirty=false;last=time;render(time);}if(!frame&&!disposed&&(dirty||active()))frame=requestFrame(tick);}
 function visibility(){if(doc.hidden){cancelFrame(frame);frame=0;}else request();}
 doc.addEventListener('visibilitychange',visibility);
 return {request,dispose(){disposed=true;cancelFrame(frame);frame=0;doc.removeEventListener('visibilitychange',visibility);}};
}
