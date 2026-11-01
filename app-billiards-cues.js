(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PokerBilliardsCues=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){'use strict';
const cues=Object.freeze([
 {
  "id": "maple",
  "name": "Первый удар",
  "level": 0,
  "color": "#dec18d",
  "grip": "#62452e",
  "metal": "#b6a38a",
  "art": "./assets/player-hall/billiards-cue-maple-v3.webp"
 },
 {
  "id": "walnut",
  "name": "Ореховый клуб",
  "level": 10,
  "color": "#633a23",
  "grip": "#453024",
  "metal": "#d5ae60",
  "art": "./assets/player-hall/billiards-cue-walnut-v3.webp"
 },
 {
  "id": "aces",
  "name": "Два туза",
  "level": 20,
  "color": "#124e3c",
  "grip": "#173c30",
  "metal": "#e7bb61",
  "art": "./assets/player-hall/billiards-cue-aces-v3.webp"
 },
 {
  "id": "ocean",
  "name": "Океан",
  "level": 35,
  "color": "#226b96",
  "grip": "#203f56",
  "metal": "#cad7df",
  "art": "./assets/player-hall/billiards-cue-ocean-v3.webp"
 },
 {
  "id": "carbon",
  "name": "Карбон",
  "level": 50,
  "color": "#242b30",
  "grip": "#161d21",
  "metal": "#d6dee3",
  "art": "./assets/player-hall/billiards-cue-carbon-v3.webp"
 },
 {
  "id": "ruby",
  "name": "Рубиновый",
  "level": 65,
  "color": "#6d1726",
  "grip": "#3c1720",
  "metal": "#edbf65",
  "art": "./assets/player-hall/billiards-cue-ruby-v3.webp"
 },
 {
  "id": "signature",
  "name": "Именной",
  "level": 80,
  "color": "#eee0b2",
  "grip": "#171b1a",
  "metal": "#e5bf68",
  "named": true,
  "art": "./assets/player-hall/billiards-cue-signature-v3.webp"
 },
 {
  "id": "sovereign",
  "name": "Повелитель стола",
  "level": 100,
  "color": "#122d27",
  "grip": "#12201c",
  "metal": "#f4cc71",
  "art": "./assets/player-hall/billiards-cue-sovereign-v3.webp"
 }
 ,{id:'decisive',name:'Решающий',level:0,superShotWins:1,color:'#122f39',grip:'#122126',metal:'#a7dfed',art:'./assets/player-hall/billiards-cue-decisive.webp'},
 {id:'decisive-gold',name:'Решающий · Золото',level:0,superShotWins:10,color:'#c7982c',grip:'#2c2311',metal:'#ffe39a',art:'./assets/player-hall/billiards-cue-decisive-gold.webp'},
 {id:'decisive-named',name:'Решающий · Легенда',level:0,superShotWins:25,named:true,effect:'super-gold',color:'#201733',grip:'#211d29',metal:'#f5d98f',art:'./assets/player-hall/billiards-cue-decisive-named.webp'}
].map(Object.freeze));
function unlocked(c,level,wins=0){return c.superShotWins?Number(wins)>=c.superShotWins:Number.isFinite(level)&&level>=c.level;}
function available(id,level,wins=0){return cues.find(c=>c.id===id&&unlocked(c,level,wins))||cues[0];}
function paintPreview(root,cue,nick){
 if(!root)return;
 let frame=Array.from(root.children).find(c=>c.classList.contains('billiards-cue-preview'));
 if(!frame){frame=document.createElement('div');frame.className='billiards-cue-preview';root.prepend(frame);}
 if(frame.dataset.previewCue!==cue.id||frame.dataset.nick!==(nick||'')){
  frame.dataset.previewCue=cue.id;frame.dataset.nick=nick||'';frame.replaceChildren();
  const brand=document.createElement('div');brand.className='billiards-cloth-brand';brand.textContent='Two Aces';brand.setAttribute('aria-hidden','true');frame.append(brand);
  const lean=document.createElement('div');lean.className='billiards-cue-preview__lean';
  const image=document.createElement('img');image.src=cue.art;image.alt='Выбранный кий «'+cue.name+'», прислонённый к столу';image.draggable=false;lean.append(image);
  const slippers=document.createElement('img');slippers.src='./assets/player-hall/billiards-club-slippers-v3.webp';slippers.alt='Тапочки клуба «2 туза»';slippers.style.cssText='position:absolute;left:22%;top:84%;width:20%;height:12%;object-fit:contain;filter:drop-shadow(1px 3px 2px #0007);pointer-events:none';frame.append(slippers);
  if(cue.named&&nick){const label=document.createElement('small');label.className='billiards-cue-preview__name';label.textContent=nick;lean.append(label);}frame.append(lean);
 }
 function fit(){if(!root.isConnected){root._billiardsCueObserver?.disconnect();delete root._billiardsCueObserver;return;}const layer=Array.from(root.children).find(c=>c.classList.contains('billiards-cue-preview'));if(!layer)return;const scale=Math.max(root.clientWidth/1122,root.clientHeight/1402);layer.style.fontSize=(64*scale)+'px';layer.style.width=(1122*scale)+'px';layer.style.height=(1402*scale)+'px';}
 fit();if(!root._billiardsCueObserver&&typeof ResizeObserver!=='undefined'){root._billiardsCueObserver=new ResizeObserver(fit);root._billiardsCueObserver.observe(root);}
}
return {cues,available,unlocked,paintPreview};
});
