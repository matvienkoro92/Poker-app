/* Touchscreen commander for four local sectors. Network co-op is not implemented. */
(function(){'use strict';const E=window.LastBuyInTD;
const escape=text=>String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
window.LastBuyInTDGame={mount(root,chapter,onWin,onLose){
  const KEY='poker-last-buy-in:burbenog-243-checkpoint-v2';let saved=null;try{saved=E.restore(JSON.parse(localStorage.getItem(KEY)||'null'));}catch(_){}
  let s=saved||E.create(),owner=0,builder=s.players[0].builders[0],selected='',slot=-1,paused=true,setup=true,stopped=false,raf,last=0,reported=false,overview=false,speed=1,heroMove=false,lastWave=s.wave,viewDirty=true,lastPaint=-1;
  root.innerHTML='<section class="td-stage"><header><div><small>BURBENOG · TWO ACES</small><b>Четыре рубежа</b></div><button data-pause>Ⅱ</button></header><div class="td-status" aria-live="polite"></div><div class="td-sectors" aria-label="Сектор">'+['СЗ','СВ','ЮЗ','ЮВ'].map((n,i)=>'<button data-sector="'+i+'">'+n+'<small></small></button>').join('')+'</div><div class="td-board"><canvas width="1000" height="1000" aria-label="Поле обороны. Выбери строение и нажми на площадку. Приближение показывает выбранный сектор."></canvas><button data-overview>Вся карта</button><button data-speed>×1</button></div><div class="td-message" aria-live="polite"></div><div class="td-shop"><label>Строитель <select data-builder></select></label><label>Строение <select data-tower></select></label><p class="td-description"></p><div class="td-inspect"></div></div><div class="td-actions"><button data-wave>Начать волну</button><button data-sell>Продать</button><button data-hero>Герой</button><button data-help>?</button></div><dialog class="td-dialog"></dialog></section>';
  const el=selector=>root.querySelector(selector),canvas=el('canvas'),c=canvas.getContext('2d'),dialog=el('dialog'),message=el('.td-message'),towerSelect=el('[data-tower]'),builderSelect=el('[data-builder]');
  const names=['Северо-запад','Северо-восток','Юго-запад','Юго-восток'],tints=['#ffbf6c','#7ebee9','#a2d67f','#d4a0e1'];
  function save(){const data=E.checkpoint(s);if(data)try{localStorage.setItem(KEY,JSON.stringify(data));}catch(_){}}
  function clearSave(){try{localStorage.removeItem(KEY);}catch(_){}}
  function notify(text){message.textContent=text;}
  function modal(html,handler){paused=true;dialog.innerHTML=html;dialog.showModal();dialog.onclick=e=>{const b=e.target.closest('button');if(b)handler(b);};}
  function closeModal(){dialog.close();dialog.onclick=null;paused=false;last=0;viewDirty=true;}
  dialog.oncancel=e=>{e.preventDefault();if(setup)return;closeModal();};
  function chooseSetup(){
    const choices=E.governors.map(g=>'<option value="'+g.id+'">'+escape(g.name)+' · '+escape(E.builders.find(b=>b.id===g.builders[0])?.name||'')+'</option>').join('');
    modal('<small>ОБОРОНА КЛУБА</small><h2>Четыре рубежа</h2><p>Враги идут с четырёх сторон к общей базе. Ты управляешь всеми четырьмя секторами: у каждого губернатора своя казна и набор строителей.</p><div class="td-picks">'+s.players.map((p,i)=>'<label>'+names[i]+'<select data-governor="'+i+'">'+choices+'</select></label>').join('')+'</div><label>Сложность<select data-difficulty><option value="easy">Легко · 50 жизней · 40 волн</option><option value="normal">Нормально · 25 жизней · 42 этапа</option><option value="hard">Сложно · 1 жизнь · 42 этапа</option></select></label><label class="td-check"><input type="checkbox" data-shared checked> Общий доход за убийства</label><label class="td-check"><input type="checkbox" data-blitz> Blitz · вдвое больше врагов</label><p class="td-note">По мотивам Burbenog TD · Shvegait и Mad Mauler. Одиночная оборона: все четыре сектора под твоим управлением.</p>'+(saved?'<button data-resume>Продолжить · волна '+(saved.wave+1)+'</button>':'')+'<button data-begin>Новая оборона</button>',b=>{
      if(b.hasAttribute('data-resume')){s=saved;setup=false;closeModal();refreshShop();return;}
      if(!b.hasAttribute('data-begin'))return;
      s=E.create({governors:[...dialog.querySelectorAll('[data-governor]')].map(x=>x.value),difficulty:dialog.querySelector('[data-difficulty]').value,shared:dialog.querySelector('[data-shared]').checked,blitz:dialog.querySelector('[data-blitz]').checked});owner=0;builder=s.players[0].builders[0];selected='';slot=-1;lastWave=0;setup=false;clearSave();save();closeModal();refreshShop();
    });
    dialog.querySelectorAll('[data-governor]').forEach((x,i)=>x.value=s.players[i].governor);
  }
  function refreshShop(){
    const p=s.players[owner],g=E.governors.find(g=>g.id===p.governor);
    if(!g.builders.includes(builder))builder=p.builders[0];
    builderSelect.innerHTML=g.builders.map(id=>'<option value="'+id+'">'+escape(E.builders.find(b=>b.id===id)?.name||id)+(p.builders.includes(id)?'':' · нанять за 1 дерево')+'</option>').join('');builderSelect.value=builder;
    const choices=E.builders.find(b=>b.id===builder)?.units.filter(id=>E.catalog[id])||[];
    if(!choices.includes(selected))selected=choices[0]||'';
    towerSelect.innerHTML=choices.map(id=>{const a=E.catalog[id];return '<option value="'+id+'">'+escape(a.name)+' · '+a.cost+' з.'+(a.timber?' / '+a.timber+' д.':'')+'</option>';}).join('');towerSelect.value=selected;viewDirty=true;inspect();
  }
  function inspect(){
    const t=s.towers.find(t=>t.slot===slot),a=E.catalog[t?.type||selected];
    el('.td-description').textContent=a? a.name+' · '+(a.raw.dmgplus1? 'урон '+a.raw.dmgplus1+'–'+(a.raw.dmgplus1+(a.raw.dice1||0)*(a.raw.sides1||0))+' · ':'')+'дальность '+Math.round(a.range/E.SCALE)+' · '+a.buildTime+' с':'';
    el('.td-inspect').textContent=t? t.ready>0?'Строительство · '+Math.ceil(t.ready)+' с':a.name+' · '+Math.ceil(t.hp)+' / '+t.max+' HP':(E.canBuild(s,owner,selected)||'Нажми на свободную площадку, чтобы построить');
    el('[data-sell]').disabled=!t;el('[data-sell]').textContent=t?'Продать · '+Math.floor(t.paid/(t.ready>0?1:2)):'Продать';
  }
  builderSelect.onchange=()=>{const id=builderSelect.value;if(!s.players[owner].builders.includes(id)&&!E.commission(s,owner,id)){notify('За каждые пять волн получаешь дерево. Новый строитель стоит 1 дерево.');builderSelect.value=builder;return;}builder=id;selected='';slot=-1;refreshShop();save();};
  towerSelect.onchange=()=>{selected=towerSelect.value;slot=-1;heroMove=false;inspect();};
  root.querySelectorAll('[data-sector]').forEach(b=>b.onclick=()=>{owner=Number(b.dataset.sector);builder=s.players[owner].builders[0];selected='';slot=-1;heroMove=false;refreshShop();});
  el('[data-overview]').onclick=()=>{overview=!overview;el('[data-overview]').textContent=overview?'Приблизить':'Вся карта';};
  el('[data-speed]').onclick=()=>{speed=speed===1?2:speed===2?3:1;el('[data-speed]').textContent='×'+speed;};
  el('[data-sell]').onclick=()=>{if(E.sell(s,slot)){slot=-1;save();inspect();}};
  el('[data-wave]').onclick=()=>{E.start(s);viewDirty=true;};
  el('[data-pause]').onclick=()=>{if(setup||dialog.open)return;modal('<h2>Пауза</h2><p>Оборона TWO ACES · волна '+s.wave+'</p><button data-continue>Продолжить</button><button data-settings>Начать заново</button>',b=>{if(b.hasAttribute('data-settings')){dialog.close();setup=true;chooseSetup();}else closeModal();});};
  el('[data-help]').onclick=()=>{
    const a=E.catalog[selected];modal('<h2>Как удержать рубежи</h2><p>1. Переключай четыре сектора. Начальный капитал — 30 золота каждому. Башни строятся за указанное время.</p><p>2. Доход: награда за врагов и бонус за волну. Каждые пять волн — 1 дерево: нанимай второго строителя или открывай технологии.</p><p>3. Против воздуха нужны башни с атакой по воздуху. На волнах 17, 25, 30 и 35 нужен True Sight: Sentry Tower либо Chilling Tower после исследования Magic Sentry в Freezer.</p><p>4. Технологии открывают сильные и гибридные башни. Ресурсы можно передать соседнему сектору; готовую башню продать за половину цены.</p><p>5. Герой доступен после постройки технологического здания. Он может двигаться и применять способности.</p>'+(a?'<h3>'+escape(a.name)+'</h3><p>'+escape(a.description).replace(/\n/g,'<br>')+'</p>':'')+'<h3>Помощь соседям</h3><div class="td-gifts">'+s.players.map((p,i)=>i===owner?'':'<button data-give="'+i+'">50 золота → '+names[i]+'</button>').join('')+'</div><button data-repair>Ремонт выбранной башни · 1 золото</button><button data-close>Вернуться</button>',b=>{if(b.hasAttribute('data-give')){notify(E.give(s,owner,Number(b.dataset.give),50)?'Золото передано':'Недостаточно золота');save();}else if(b.hasAttribute('data-cede')){notify(E.transfer(s,slot,Number(b.dataset.cede))?'Башня передана':'Башня ещё строится');save();}else if(b.hasAttribute('data-research')){notify(E.research(s,owner,b.dataset.research)?'Исследование начато':'Не хватает ресурсов или уже изучено');save();}else if(b.hasAttribute('data-repair')){notify(E.repair(s,slot)?'Башня отремонтирована':'Выбери повреждённую башню');save();}else closeModal();});
  };
  el('[data-hero]').onclick=()=>{
    const p=s.players[owner],h=p.hero;
    if(h){modal('<h2>'+escape(E.clean(h.raw.name))+' · уровень '+h.level+'</h2><p>Мана '+Math.floor(h.mana)+' / '+h.maxMana+'</p><button data-move>Переместить героя</button>'+h.abilities.map((id,i)=>'<button data-spell="'+i+'"'+(E.heroSpellKind(E.D.abilities[id])==='passive-or-unsupported'?' disabled':'')+'>'+escape(E.clean(E.D.abilities[id]?.name||id))+'</button>').join('')+'<button data-close>Вернуться</button>',b=>{if(b.hasAttribute('data-move')){heroMove=true;notify('Нажми на поле, чтобы переместить героя');closeModal();}else if(b.hasAttribute('data-spell')){const ok=E.castSpell(s,owner,Number(b.dataset.spell));closeModal();notify(ok?'Способность применена':'Нужны враги, мана и готовность способности');}else closeModal();});return;}
    const ids=[...new Set(s.towers.filter(t=>t.owner===owner&&t.ready<=0).flatMap(t=>E.catalog[t.type].trains))].filter(id=>E.D.units[id]&&E.D.units[id].heroabillist);
    modal('<h2>Герой сектора</h2><p>Нужен технологический центр выбранного элемента. Один герой на сектор.</p>'+ids.map(id=>'<button data-train="'+id+'">'+escape(E.clean(E.D.units[id].name))+' · '+E.D.units[id].goldcost+' золота</button>').join('')+'<button data-close>Вернуться</button>',b=>{if(b.hasAttribute('data-train')){notify(E.trainHero(s,owner,b.dataset.train)?'Герой призван к клубу':'Не хватает ресурсов');save();}closeModal();});
  };
  function bounds(){if(overview)return [0,0,500];return [[0,0,285],[215,0,285],[0,215,285],[215,215,285]][owner];}
  canvas.onclick=e=>{if(paused||setup||reported)return;const r=canvas.getBoundingClientRect(),[vx,vy,size]=bounds(),x=vx+(e.clientX-r.left)/r.width*size,y=vy+(e.clientY-r.top)/r.height*size;
    if(heroMove){E.moveHero(s,owner,x,y);heroMove=false;return;}
    let index=-1,nearest=12;E.slots.forEach((p,i)=>{const d=Math.hypot(p[0]-x,p[1]-y);if(d<nearest){nearest=d;index=i;}});
    if(index<0)return;if(E.sectors[index]!==owner&&!s.towers.some(t=>t.slot===index&&t.owner===owner)){notify('Выбери сектор этой площадки');return;}
    slot=index;const t=s.towers.find(t=>t.slot===slot);if(!t){const reason=E.canBuild(s,owner,selected);if(!E.build(s,slot,selected,owner))notify(reason||'Площадка занята');else{notify(E.catalog[selected].name+' · строительство');save();}}inspect();
  };
  function rect(x,y,w,h,fill,stroke){c.fillStyle=fill;c.fillRect(x,y,w,h);if(stroke){c.strokeStyle=stroke;c.lineWidth=1;c.strokeRect(x,y,w,h);}}
  function circle(x,y,r,color){c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fillStyle=color;c.fill();}
  function draw(){
    c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,1000,1000);const [vx,vy,size]=bounds(),scale=1000/size;c.setTransform(scale,0,0,scale,-vx*scale,-vy*scale);
    rect(0,0,500,500,'#21382e');
    for(let y=0;y<500;y+=20)for(let x=0;x<500;x+=20){const n=((x*17+y*31)%97)/97;rect(x,y,20,20,n>.5?'#263e31':'#243a2d');if(n>.7){circle(x+6,y+9,1.5,'#53704a');circle(x+14,y+16,1,'#758351');}}
    c.lineJoin='round';c.lineCap='round';for(const path of E.paths){c.beginPath();path.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.strokeStyle='#14271f';c.lineWidth=24;c.stroke();c.strokeStyle='#8b7c54';c.lineWidth=17;c.stroke();c.strokeStyle='#a9986a';c.lineWidth=12;c.stroke();}
    for(let lane=0;lane<4;lane++){const p=E.paths[lane][0];circle(p[0],p[1],12,'#251f22');c.strokeStyle=tints[lane];c.lineWidth=3;c.beginPath();c.arc(p[0],p[1],11,0,Math.PI*2);c.stroke();}
    // Stone village and club at the shared center.
    rect(231,234,38,37,'#536368','#e2cd97');rect(236,239,28,26,'#1b3535');c.fillStyle='#be7d55';c.beginPath();c.moveTo(225,235);c.lineTo(250,220);c.lineTo(275,235);c.closePath();c.fill();rect(245,254,10,17,'#d2bb79');c.font='bold 6px sans-serif';c.textAlign='center';c.fillStyle='#f8e0ac';c.fillText('TWO ACES',250,249);
    const selectedTower=s.towers.find(t=>t.slot===slot);
    if(selectedTower){const p=E.slots[slot];circle(p[0],p[1],E.catalog[selectedTower.type].range,'#e2d39715');c.beginPath();c.arc(p[0],p[1],E.catalog[selectedTower.type].range,0,Math.PI*2);c.strokeStyle='#e2d39766';c.lineWidth=.6;c.stroke();}
    E.slots.forEach((p,i)=>{const t=s.towers.find(t=>t.slot===i);if(!t){if(E.sectors[i]===owner||overview){circle(p[0],p[1],10,'#132c25');c.strokeStyle=i===slot?'#ffecaf':'#a6b28b70';c.lineWidth=.7;c.beginPath();c.arc(p[0],p[1],9,0,Math.PI*2);c.stroke();c.fillStyle='#b8c1a0';c.font='12px sans-serif';c.fillText('+',p[0],p[1]+4);}return;}
      const a=E.catalog[t.type];circle(p[0]+1,p[1]+3,10,'#10221d88');rect(p[0]-8,p[1]-7,16,17,'#555e59','#b1b3a0');rect(p[0]-6,p[1]-14,12,10,a.color);rect(p[0]-7,p[1]+6,14,3,tints[t.owner]);c.fillStyle='#162b2c';c.font='bold 9px sans-serif';c.fillText(a.builder==='hpea'?'↑':a.builder==='ohun'?'❄':a.builder==='ncpn'?'♨':a.trains.length?'⌂':'◆',p[0],p[1]-5);
      if(t.ready>0){rect(p[0]-9,p[1]-19,18,3,'#172b25');rect(p[0]-9,p[1]-19,18*(1-t.ready/Math.max(1,a.buildTime)),3,'#e4cc88');}if(t.hp<t.max){rect(p[0]-9,p[1]+12,18,2,'#172b25');rect(p[0]-9,p[1]+12,18*t.hp/t.max,2,'#9ed181');}
    });
    for(const e of s.enemies){if(e.hp<=0)continue;circle(e.x+1,e.y+2,e.air?5:4,'#11251c88');if(e.air){c.fillStyle=e.slow>0?'#8ae2ef':'#cf837c';c.beginPath();c.moveTo(e.x-7,e.y+2);c.lineTo(e.x,e.y-5);c.lineTo(e.x+7,e.y+2);c.lineTo(e.x,e.y);c.closePath();c.fill();}else circle(e.x,e.y,4,e.invisible?'#b3a4d888':e.slow>0?'#83d5e8':e.mechanical?'#a4a59b':'#d17b65');rect(e.x-5,e.y-8,10,1.7,'#152820');rect(e.x-5,e.y-8,10*Math.max(0,e.hp/e.max),1.7,'#bee19d');}
    for(const p of s.players)if(p.hero){const h=p.hero;circle(h.x,h.y,7,'#efcb65');c.strokeStyle='#fbedba';c.lineWidth=1;c.beginPath();c.arc(h.x,h.y,9,0,Math.PI*2);c.stroke();c.fillStyle='#1f3230';c.font='bold 9px sans-serif';c.fillText('★',h.x,h.y+3);}
    for(const shot of s.shots){c.beginPath();c.moveTo(...shot.a);c.lineTo(...shot.b);c.strokeStyle=shot.color;c.lineWidth=1.2;c.stroke();}
  }
  function hud(){
    el('.td-status').textContent='Волна '+s.wave+'/'+s.totalWaves+' · База '+Math.max(0,s.lives)+'/'+s.maxLives+' · '+(s.active?'Враги '+(s.enemies.length+s.pending):'Подготовка '+Math.ceil(Math.max(0,s.prep))+' с');
    root.querySelectorAll('[data-sector]').forEach((b,i)=>{const p=s.players[i];b.setAttribute('aria-pressed',String(owner===i));b.querySelector('small').textContent=Math.floor(p.gold)+' з. · '+p.timber+' д.';});
    const wave=el('[data-wave]');wave.disabled=s.active||s.won||setup;wave.textContent=s.active?'Идёт волна':'Волна '+(s.wave+1);inspect();
  }
  function visibility(){if(document.hidden&&!paused&&!setup)el('[data-pause]').click();}document.addEventListener('visibilitychange',visibility);
  function frame(now){if(stopped)return;const dt=last?Math.min(.05,(now-last)/1000):0;last=now;
    if(!paused&&!reported){for(let i=0;i<speed;i++)E.step(s,dt);if(!s.active&&s.wave!==lastWave){lastWave=s.wave;save();notify(s.message);viewDirty=true;}}
    draw();if(viewDirty||now-lastPaint>200){hud();viewDirty=false;lastPaint=now;}
    if((s.won||s.over)&&!reported){reported=true;paused=true;if(s.won){clearSave();onWin({chapter,score:s.kills*20+s.lives*100,hits:s.lost,secret:s.lost===0});}else onLose(()=>{let retry=null;try{retry=E.restore(JSON.parse(localStorage.getItem(KEY)||'null'));}catch(_){}s=retry||E.create({governors:s.players.map(p=>p.governor),difficulty:s.difficulty,shared:s.shared,blitz:s.blitz});s.lives=s.maxLives;reported=false;paused=false;last=0;lastWave=s.wave;refreshShop();});}
    raf=requestAnimationFrame(frame);
  }
  refreshShop();chooseSetup();raf=requestAnimationFrame(frame);
  return {stop(){stopped=true;cancelAnimationFrame(raf);document.removeEventListener('visibilitychange',visibility);if(dialog.open)dialog.close();save();}};
}};
})();
