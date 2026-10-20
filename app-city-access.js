/* Keep the prototype closed until the server confirms the current administrator. */
(async function(){'use strict';const loading=document.getElementById('cityLoading'),start=document.getElementById('cityStart');loading.textContent='Проверяем доступ администратора…';
if(!await window.pokerCheckCityAccess?.()){loading.textContent='Город пока доступен только администратору. Войдите в основной мини-апп под аккаунтом администратора.';start.textContent='На главную';start.disabled=false;start.onclick=()=>location.assign('./');return;}
const script=document.createElement('script');script.src='app-city-game.js?v=11';script.onerror=()=>{loading.textContent='Не удалось загрузить игру. Повторите загрузку.';start.textContent='Повторить';start.disabled=false;start.onclick=()=>location.reload();};document.body.append(script);
})();
