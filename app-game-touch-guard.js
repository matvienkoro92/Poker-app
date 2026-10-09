/* Suppress browser long-press UI only on game surfaces, including iframe games. */
(function(){'use strict';
 if(window.pokerGameTouchGuard)return;window.pokerGameTouchGuard=true;
 const surfaces=['.campaign-stage','.comic-stage','.hidden-stage','.arcade-arena','.arcade-move','.arcade-actions','.roma-touch-controls','.race-arena','.race-controls','.cooler-flight__arena'];
 const selector=surfaces.join(','),editable='input,textarea,select,[contenteditable="true"],.flight-code';
 const style=document.createElement('style');style.dataset.gameTouchGuard='true';
 style.textContent=surfaces.map(s=>s+','+s+' *').join(',')+'{-webkit-user-select:none!important;user-select:none!important;-webkit-touch-callout:none!important;-webkit-tap-highlight-color:transparent}'+surfaces.map(s=>s+' canvas,'+s+' button,'+s+' [role="group"],'+s+' [data-input],'+s+' [data-hold]').join(',')+'{touch-action:none!important}'+surfaces.map(s=>s+' img').join(',')+'{-webkit-user-drag:none}'+surfaces.map(s=>s+' :is('+editable+')').join(',')+'{-webkit-user-select:text!important;user-select:text!important;-webkit-touch-callout:default!important;touch-action:manipulation!important}';
 document.head.appendChild(style);
 function gameTarget(event){const el=event.target instanceof Element?event.target:event.target?.parentElement;return el&&!el.closest(editable)&&el.closest(selector);}
 function suppress(event){if(gameTarget(event)&&event.cancelable)event.preventDefault();}
 for(const type of ['selectstart','dragstart','contextmenu','dblclick','gesturestart','gesturechange'])document.addEventListener(type,suppress,{capture:true,passive:false});
 document.addEventListener('touchmove',suppress,{capture:true,passive:false});
 // Do not cancel a single touchstart: buttons and input fields still receive clicks.
 document.addEventListener('touchstart',event=>{if(event.touches.length>1)suppress(event);},{capture:true,passive:false});
})();
