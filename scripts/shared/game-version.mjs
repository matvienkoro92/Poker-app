// Only deployment-stamped game documents enforce the release gate; source previews stay local.
export async function ensureGameVersion({roomId,watch=false}={}){
 const local=document.documentElement.dataset.releaseId;
 if(!local)return true;
 try{
  const url=new URL('app-release.json',location.href);url.searchParams.set('check',Date.now());
  const response=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(10000)});
  if(!response.ok)throw Error('release');
  const remote=(await response.json()).releaseId;
  if(typeof remote!=='string'||!/^[a-f0-9]{32}$/.test(remote))throw Error('release');
  if(remote===local)return true;
  const target=new URL(location.href);target.searchParams.set('gameRelease',remote);
  if(roomId)target.searchParams.set(watch?'watch':'room',roomId);
  if(new URL(location.href).searchParams.get('gameRelease')===remote){showFailure('Обновление ещё загружается. Попробуйте ещё раз.');return false;}
  window.__gameVersionReload=true;
  location.replace(target.href);return false;
 }catch{showFailure('Не удалось проверить обновление игры. Проверьте связь и попробуйте ещё раз.');return false;}
}
function showFailure(message){
 if(document.getElementById('gameVersionError'))return;
 const d=document.createElement('dialog');d.id='gameVersionError';d.style.cssText='max-width:360px;padding:24px;border:1px solid #cba85c;border-radius:18px;background:#15251d;color:#f8e5b7;font:16px sans-serif';
 const p=document.createElement('p');p.textContent=message;const retry=document.createElement('button');retry.textContent='Обновить игру';retry.onclick=()=>{window.__gameVersionReload=true;const url=new URL(location.href);url.searchParams.set('retryUpdate',Date.now());location.replace(url.href);};const close=document.createElement('button');close.textContent='Закрыть';close.onclick=()=>d.close();d.append(p,retry,close);d.addEventListener('close',()=>d.remove(),{once:true});document.body.append(d);d.showModal();
}
export function gameWorkerURL(file){const url=new URL(file,location.href),release=document.documentElement.dataset.releaseId;if(release)url.searchParams.set('release',release);return url.href;}
