(async function(){
  'use strict';
  document.querySelector('main').hidden=true;
  var loading=document.createElement('section');
  loading.className='panel';loading.setAttribute('role','status');
  loading.style.cssText='position:fixed;left:16px;right:16px;top:20%;z-index:20;text-align:center';
  loading.innerHTML='<small>TWO ACES</small><h1>Бильярдная</h1><p>Открываем стол…</p><button type="button">← На виллу</button>';
  loading.querySelector('button').onclick=function(){if(parent!==window)parent.postMessage({type:'p21-billiards-close'},location.origin);else location.href='./';};
  document.body.appendChild(loading);
  try{
    var source=window;
    try{if(parent!==window&&parent.location.origin===location.origin)source=parent;}catch(_){}
    var auth=source.pokerApiAuthJsonBody?.({})||{},base=source.getApiBase?.()||location.origin;
    var response=await fetch(base+'/api/billiards',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',cache:'no-store',body:JSON.stringify(Object.assign({},auth,{action:'access'})),signal:AbortSignal.timeout(10000)});
    var result=await response.json();
    if(!response.ok||!result.allowed)throw Error(result.error||'Бильярдная временно закрыта.');

    var script=document.createElement('script');script.src='app-billiards.js?v=4.020.1.31-room-v3';script.onload=function(){loading.remove();document.querySelector('main').hidden=false;};script.onerror=function(){loading.querySelector('p').textContent='Не удалось загрузить игру. Попробуйте открыть снова.';};document.body.appendChild(script);
  }catch(_){
    document.body.innerHTML='<main class="panel"><h1>Бильярдная временно закрыта</h1><p>Доступ временно ограничен.</p><button id="closedBack" type="button">← На виллу</button></main>';
    document.getElementById('closedBack').onclick=function(){if(parent!==window)parent.postMessage({type:'p21-billiards-close'},location.origin);else location.href='./';};
  }
})();
