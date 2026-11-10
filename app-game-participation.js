export async function ensureGameParticipation(){
 let source=window;try{if(parent!==window&&parent.location.origin===location.origin)source=parent;}catch{}
 async function check(){
  for(let attempt=0;attempt<2;attempt++){
   try{
    const response=await fetch((source.getApiBase?.()||location.origin)+'/api/billiards',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',cache:'no-store',signal:AbortSignal.timeout(20000),body:JSON.stringify({...source.pokerApiAuthJsonBody?.({}),action:'participation'})});
    const result=await response.json();
    if(result?.ok===true)return result;
    if(result?.code==='GAME_SUBSCRIPTION_REQUIRED'||result?.code==='GAME_TELEGRAM_REQUIRED'||response.status===401||response.status===403)return result;
    if(attempt===0)continue;
    return {ok:false,code:result?.code||'GAME_CHECK_UNAVAILABLE',error:result?.error||'Сервер проверки доступа временно недоступен. Это не означает, что подписок нет. Повторите попытку.'};
   }catch(error){
    if(attempt===0)continue;
    return {ok:false,code:'GAME_CHECK_UNAVAILABLE',error:error?.name==='TimeoutError'?'Сервер не успел подтвердить доступ. Это не означает, что подписок нет. Повторите попытку.':'Не удалось связаться с сервером проверки доступа. Подписки не проверены. Проверьте соединение и повторите попытку.'};
   }
  }
 }

 let result=await check();if(result.ok)return true;
 return new Promise(resolve=>{const d=document.createElement('dialog');d.setAttribute('aria-label','Подписки для игры');d.style.cssText='max-width:360px;width:calc(100% - 32px);box-sizing:border-box;padding:24px;border:1px solid #cba85c;border-radius:18px;background:#15251d;color:#f8e5b7;font:16px sans-serif;z-index:2147483647';
 const title=document.createElement('h2');title.textContent='Проверка доступа к игре';d.append(title);const message=document.createElement('p'),links=document.createElement('div');d.append(message,links);
 function render(){title.textContent=result.code==='GAME_SUBSCRIPTION_REQUIRED'?'Для игры нужны подписки':'Проверка доступа к игре';message.textContent=result.error||'Войдите в аккаунт и проверьте подписки.';links.replaceChildren();for(const item of result.missingRequirements||[]){const a=document.createElement('a');a.textContent=item.action;a.href=item.url;a.target='_blank';a.rel='noopener';a.onclick=event=>{const tg=source.Telegram?.WebApp||window.Telegram?.WebApp;if(typeof tg?.openTelegramLink==='function'){try{tg.openTelegramLink(item.url);event.preventDefault();return;}catch{}}};a.style.cssText='display:block;padding:12px;margin:8px 0;color:#ffe3a2;border:1px solid #9b804d;border-radius:10px;text-align:center';links.append(a);}}
 const retry=document.createElement('button');retry.textContent='Проверить ещё раз';retry.style.cssText='padding:12px;width:100%;margin:8px 0';retry.onclick=async()=>{retry.disabled=true;retry.textContent='Проверяем доступ…';result=await check();retry.disabled=false;retry.textContent='Проверить ещё раз';if(result.ok){d.close();d.remove();resolve(true);}else render();};const close=document.createElement('button');close.textContent='Отмена';close.onclick=()=>d.close();d.append(retry,close);d.addEventListener('close',()=>{d.remove();resolve(false);},{once:true});render();document.body.append(d);d.showModal();});
}
