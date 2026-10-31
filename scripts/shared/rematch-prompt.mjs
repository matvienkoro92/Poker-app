// Queue the modal after result rendering so the invitation stays above the result.
export function mountRematchPrompt({context,accept}){
 const dialog=document.createElement('dialog');dialog.className='replay-stake-dialog';dialog.dataset.rematchPrompt='';dialog.innerHTML='<h2>Соперник предлагает реванш</h2><p>Начать новую партию с тем же соперником?</p><button type="button" data-accept>Принять реванш</button><button type="button" data-later>Позже</button>';document.body.append(dialog);let seen='',queued=false;
 dialog.querySelector('[data-later]').onclick=()=>dialog.close();
 dialog.querySelector('[data-accept]').onclick=async()=>{const button=dialog.querySelector('[data-accept]');button.disabled=true;try{await accept();}finally{button.disabled=false;render();}};
 function render(){const c=context(),incoming=c.online&&!c.spectator&&c.finished&&(!c.wager||c.wager.status==='playing')&&c.ready?.[1-c.player]&&!c.ready?.[c.player],key=c.key;if(!incoming){if(dialog.open)dialog.close();if(!c.finished)seen='';return;}if(seen===key||queued)return;queued=true;queueMicrotask(()=>{queued=false;const latest=context();if(latest.key!==key||!latest.finished||!latest.ready?.[1-latest.player]||latest.ready?.[latest.player]||latest.spectator)return;if(!dialog.open)dialog.showModal();seen=key;});}
 return {render};
}
