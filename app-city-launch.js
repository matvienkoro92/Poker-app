/* Same-tab handoff of the owner's saved garage. No credentials or garage writes. */
(function(){'use strict';const KEY='poker21-city:garage-v1';
function fingerprint(){try{const b=window.pokerApiAuthJsonBody?.({})||{},value=b.pwaSession||b.pwaVkSession||b.initData||'';if(!value)return '';let h=2166136261;for(const c of value)h=Math.imul(h^c.charCodeAt(0),16777619);return (h>>>0).toString(16);}catch(_){return '';}}
function read(){try{if(window.pokerReadPwaGuestMode?.())return null;const d=JSON.parse(sessionStorage.getItem(KEY)||'null'),current=fingerprint();if(!d||!d.loadout||typeof d.loadout!=='object'||!d.accountId||Date.now()-d.capturedAt>30*60*1000||Date.now()<d.capturedAt||current&&d.fingerprint!==current)return null;return d;}catch(_){return null;}}
window.pokerCaptureCityGarage=function(hall){if(!hall?.self||!hall.accountId||!hall.garage?.loadout)return null;const back=new URL(/\/(?:city-play|last-buy-in)\.html$/.test(location.pathname)?'./':location.href,location.href);back.searchParams.set('startapp','profile');back.searchParams.set('cityVilla','1');const d={accountId:hall.accountId,loadout:hall.garage.loadout,hall:{items:hall.items,shelves:hall.shelves,featured:hall.featured},stats:hall.garage.stats||{},capturedAt:Date.now(),fingerprint:fingerprint(),returnUrl:back.href};try{sessionStorage.setItem(KEY,JSON.stringify(d));}catch(_){}return d;};
window.pokerReadCityGarage=read;
window.pokerLaunchCityFromVilla=function(hall){if(window.pokerCityAdminAllowed!==true||!window.pokerCaptureCityGarage(hall))return false;location.assign(new URL('city-play.html',location.href).href);return true;};
let accessRequest=null;
window.pokerCityAdminAllowed=false;
window.pokerCheckCityAccess=function(){if(accessRequest)return accessRequest;accessRequest=(async()=>{let allowed=false;try{const auth=window.pokerApiAuthJsonBody?.({})||{};if(auth.pwaSession||auth.pwaVkSession||auth.initData){const base=typeof window.getApiBase==='function'?window.getApiBase():location.origin;const r=await fetch(base+'/api/city-access',{method:'POST',headers:{'Content-Type':'application/json'},cache:'no-store',body:JSON.stringify(auth),signal:AbortSignal.timeout(8000)});const d=await r.json();allowed=r.ok&&d.ok===true&&d.allowed===true;}}catch(_){}window.pokerCityAdminAllowed=allowed;document.querySelectorAll('[data-city-admin-entry]').forEach(el=>el.hidden=!allowed);window.dispatchEvent(new Event('poker-city-access'));return allowed;})();return accessRequest;};
function check(){accessRequest=null;window.pokerCityAdminAllowed=false;document.querySelectorAll('[data-city-admin-entry]').forEach(el=>el.hidden=true);window.pokerCheckCityAccess();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',check,{once:true});else check();
window.addEventListener('poker-telegram-auth',()=>{check();});
window.addEventListener('poker-telegram-auth',()=>{try{sessionStorage.removeItem(KEY);}catch(_){}});
})();
