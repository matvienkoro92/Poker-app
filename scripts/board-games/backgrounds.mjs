const THEMES=[['emerald','Изумрудный клуб'],['sapphire','Сапфировая ночь'],['burgundy','Бордовый бархат'],['walnut','Тёплый орех'],['graphite','Графит и золото']];
export function mountGameBackground(){
 let selected='emerald';try{const saved=localStorage.getItem('p21-board-background');if(THEMES.some(([id])=>id===saved))selected=saved;}catch{}
 const button=document.createElement('button');button.id='gameBackground';button.type='button';button.innerHTML='<svg class="board-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8" cy="8" r="1.5"/><path d="m4 17 5-5 4 4 3-3 4 5"/></svg><small>Фон</small>';
 function paint(){const index=THEMES.findIndex(([id])=>id===selected);document.body.dataset.gameBackground=selected;button.title='Фон: '+THEMES[index][1]+' · '+(index+1)+'/5. Нажмите для смены';button.setAttribute('aria-label',button.title);button.dataset.theme=selected;}
 button.onclick=()=>{selected=THEMES[(THEMES.findIndex(([id])=>id===selected)+1)%THEMES.length][0];try{localStorage.setItem('p21-board-background',selected);}catch{}paint();};paint();return button;
}
