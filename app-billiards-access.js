(async function(){
  'use strict';
  document.querySelector('main').hidden=true;
  try{
    var source=window;
    try{if(parent!==window&&parent.location.origin===location.origin)source=parent;}catch(_){}
    var auth=source.pokerApiAuthJsonBody?.({})||{},base=source.getApiBase?.()||location.origin;
    var response=await fetch(base+'/api/billiards',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',cache:'no-store',body:JSON.stringify(Object.assign({},auth,{action:'access'})),signal:AbortSignal.timeout(10000)});
    var result=await response.json();
    if(!response.ok||!result.allowed)throw Error(result.error||'Бильярдная временно закрыта.');

    var script=document.createElement('script');script.src='app-billiards.js?v=4.020.1.29-overlay-20261022';script.onload=function(){document.querySelector('main').hidden=false;};document.body.appendChild(script);
  }catch(_){
    document.body.innerHTML='<main class="panel"><h1>Бильярдная временно закрыта</h1><p>Доступ временно ограничен.</p><button id="closedBack" type="button">← На виллу</button></main>';
    document.getElementById('closedBack').onclick=function(){if(parent!==window)parent.postMessage({type:'p21-billiards-close'},location.origin);else location.href='./';};
  }
})();
