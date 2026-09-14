/* Capture the rendered chart, including the currently visible SVG paths. */
async function captureProfitPanel() {
  const card=document.querySelector('.profit-panel'),box=card.getBoundingClientRect(),clone=card.cloneNode(true);
  const originals=[card,...card.querySelectorAll('*')],copies=[clone,...clone.querySelectorAll('*')];
  originals.forEach((original,i)=>{
    const style=getComputedStyle(original),copy=copies[i];
    for(const key of style)copy.style.setProperty(key,style.getPropertyValue(key));
    copy.style.animation='none';copy.style.transition='none';
    if(original.matches('input[type=checkbox]')){
      const mark=document.createElement('span');mark.style.cssText=copy.style.cssText;
      mark.style.display='inline-flex';mark.style.alignItems='center';mark.style.justifyContent='center';
      mark.style.background=original.checked?'#e4eaf1':'#151e2b';mark.style.color='#273449';
      mark.style.border='1px solid #9aa7b8';mark.style.borderRadius='3px';mark.textContent=original.checked?'✓':'';copy.replaceWith(mark);
    }
  });
  const actions=clone.querySelector('.profit-share-actions');if(actions)actions.style.visibility='hidden';
  clone.style.margin='0';clone.style.width=box.width+'px';clone.style.height=box.height+'px';
  const wrapper=document.createElement('div');wrapper.setAttribute('xmlns','http://www.w3.org/1999/xhtml');wrapper.append(clone);
  const svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+box.width+'" height="'+box.height+'"><foreignObject width="100%" height="100%">'+new XMLSerializer().serializeToString(wrapper)+'</foreignObject></svg>';
  const image=new Image();await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject;image.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);});
  const canvas=document.createElement('canvas');canvas.width=Math.ceil(box.width*2);canvas.height=Math.ceil(box.height*2);
  const ctx=canvas.getContext('2d');ctx.scale(2,2);ctx.drawImage(image,0,0);
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw new Error('Не удалось создать снимок');
  return {blob,dataUrl:canvas.toDataURL('image/webp',0.95)};
}
document.addEventListener('click',async event=>{
  const button=event.target.closest('[data-chart-share],[data-chart-wall]');if(!button||button.disabled)return;
  const wall=button.hasAttribute('data-chart-wall');
  button.disabled=true;
  try {
    // Clone before any asynchronous operation so filters and line visibility are frozen at this click.
    const snapshot=await captureProfitPanel(),url=URL.createObjectURL(snapshot.blob);
    const dialog=document.createElement('dialog');dialog.className='chart-share-dialog';
    dialog.innerHTML='<h2></h2><img alt="Снимок текущего графика"><div><button data-confirm></button><button data-close>Отмена</button></div><a download="my-poker-chart.png">Скачать PNG</a><p role="status"></p>';
    dialog.querySelector('h2').textContent=wall?'Хотите добавить себе на стену в профиль?':'Поделиться графиком';
    dialog.querySelector('img').src=url;dialog.querySelector('a').href=url;dialog.querySelector('a').hidden=wall;
    const confirm=dialog.querySelector('[data-confirm]'),file=new File([snapshot.blob],'my-poker-chart.png',{type:'image/png'});
    confirm.textContent=wall?'Добавить на стену':'Поделиться';
    const canShare=navigator.share&&navigator.canShare&&navigator.canShare({files:[file]});
    if(!wall&&!canShare){confirm.hidden=true;dialog.querySelector('p').textContent='Скачайте картинку и прикрепите её к сообщению.';}
    dialog.querySelector('[data-close]').onclick=()=>dialog.close();
    dialog.addEventListener('close',()=>{URL.revokeObjectURL(url);dialog.remove();},{once:true});
    confirm.onclick=async()=>{
      confirm.disabled=true;
      try{if(wall){await historyRequest('chart-wall',snapshot.dataUrl);dialog.querySelector('p').textContent='График добавлен на стену профиля';confirm.hidden=true;dialog.querySelector('[data-close]').textContent='Закрыть';}
      else await navigator.share({files:[file]});}
      catch(error){if(error.name!=='AbortError')dialog.querySelector('p').textContent=wall?'Не удалось добавить график. Попробуйте ещё раз.':'Не удалось отправить. Можно скачать PNG.';}
      finally{confirm.disabled=false;}
    };
    document.body.append(dialog);dialog.showModal();
  }catch(_){alert('Не удалось создать снимок графика. Попробуйте ещё раз.');}
  finally{button.disabled=false;}
});
