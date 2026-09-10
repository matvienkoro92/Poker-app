(function(){
  'use strict';
  window.pokerSocialEscape=function(value){return String(value==null?'':value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
  window.pokerSocialRequest=function(endpoint,payload){
    var control=new AbortController(),timeout=setTimeout(function(){control.abort();},18000);
    return fetch(getApiBase()+'/api/'+endpoint,{method:'POST',headers:{'Content-Type':'application/json'},cache:'no-store',signal:control.signal,body:JSON.stringify(pokerApiAuthJsonBody(payload||{}))}).then(function(r){return r.json().then(function(d){if(!r.ok||!d.ok)throw new Error(d.error||'Не удалось выполнить запрос');return d;});}).finally(function(){clearTimeout(timeout);});
  };
  window.pokerSocialRequestId=function(){return Array.from(crypto.getRandomValues(new Uint8Array(12))).map(function(v){return v.toString(16).padStart(2,'0');}).join('');};
})();
