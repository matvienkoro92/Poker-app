export function createReactionSquarePicker({board,key}){
 let active=null;
 function cancel(){active?.finish(null);}
 function update(){if(active&&active.key!==key())cancel();}
 function pick(){cancel();return new Promise(resolve=>{
  const layer=document.createElement('section');layer.dataset.reactionSquarePicker='';layer.setAttribute('aria-label','Выберите клетку для реакции');layer.style.cssText='position:fixed;inset:0;z-index:10001;background:#0002';
  const note=document.createElement('div');note.style.cssText='position:absolute;left:50%;transform:translateX(-50%);padding:6px 10px;border:1px solid #c8ac6d;border-radius:10px;background:#142b23;color:#f2dfb6;text-align:center;font:600 12px system-ui;white-space:nowrap';note.textContent='Выберите клетку · ';
  const back=document.createElement('button');back.textContent='Отмена';back.type='button';back.dataset.cancelReactionSquare='';back.style.cssText='min-height:28px;padding:2px 8px;font-size:12px';note.append(back);layer.append(note);
  const cells=[...board().querySelectorAll('[data-square]')].map(cell=>{const button=document.createElement('button');button.type='button';button.dataset.reactionSquare=cell.dataset.square;button.setAttribute('aria-label','Клетка '+cell.dataset.square);button.style.cssText='position:absolute;padding:0;min-height:0;border:1px solid #ffe4a477;border-radius:0;background:#ffe4a40c';button.onclick=()=>finish({square:cell.dataset.square});layer.append(button);return {cell,button};});
  function layout(){const box=board().getBoundingClientRect();if(!box.width||cells.length!==64){cancel();return;}note.style.top=Math.max(8,box.top-40)+'px';for(const {cell,button} of cells){const r=cell.getBoundingClientRect();Object.assign(button.style,{left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px'});}}
  function escape(e){if(e.key==='Escape'){e.preventDefault();cancel();}}
  function visibility(){if(document.hidden)cancel();}
  function finish(value){if(active?.layer!==layer)return;active=null;layer.remove();window.removeEventListener('resize',layout);window.removeEventListener('keydown',escape);document.removeEventListener('visibilitychange',visibility);window.removeEventListener('pagehide',cancel);resolve(value);}
  active={layer,key:key(),finish};back.onclick=cancel;document.body.append(layer);window.addEventListener('resize',layout);window.addEventListener('keydown',escape);document.addEventListener('visibilitychange',visibility);window.addEventListener('pagehide',cancel);layout();back.focus();
 });}
 return {pick,cancel,update};
}
