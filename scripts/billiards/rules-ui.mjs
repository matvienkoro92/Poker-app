import {legalTargets} from './engine.mjs';
import {tableSpec} from './table-geometry.mjs';
import {ballColor} from './ball-appearance.mjs';
export const POCKET_NAMES=['Нижняя слева','Средняя слева','Верхняя слева','Нижняя справа','Средняя справа','Верхняя справа'];
const $=id=>document.getElementById(id);
export function mountRules({move,room}){
 let selectedCue=0,lastKey='',viewState=null,placing=false;
 function settings(){return {discipline:$('discipline').value,color:$('ballSet').value,raceTo:Number($('raceTo').value)};}
 function choiceButtons(id){const select=$(id);$(id+'Buttons').replaceChildren(...Array.from(select.options,option=>{const button=document.createElement('button');button.type='button';button.dataset.value=option.value;button.textContent=option.text;button.setAttribute('aria-pressed',String(select.value===option.value));button.onclick=()=>{select.value=option.value;select.dispatchEvent(new Event('change'));};return button;}));}
 function setup(){const russian=$('discipline').value==='pyramid';$('ballSet').replaceChildren(...(russian?[['yellow','Белые + жёлтый биток'],['red','Белые + красный биток']]:[['standard','Цветные: сплошные и полосатые']]).map(([value,text])=>new Option(text,value)));$('disciplineInfo').textContent=russian?'Свободная пирамида: первым набрать 8 шаров. После разбоя битком может быть любой шар.':'Пул «восьмёрка»: сначала своя группа, затем № 8. Группа определяется правильным заказанным шаром после разбоя.';const t=tableSpec($('discipline').value);$('tableDimensions').textContent=t.name+' · шары '+t.ball+' мм · створы '+t.corner+' / '+t.side+' мм';choiceButtons('discipline');choiceButtons('ballSet');}
 $('placeBreak').onclick=()=>placing=!placing;
 $('discipline').onchange=setup;$('ballSet').onchange=()=>choiceButtons('ballSet');setup();POCKET_NAMES.forEach((name,i)=>$('callPocket').add(new Option((i+1)+' · '+name,String(i))));
 $('callBall').onchange=$('callPocket').onchange=$('safety').onchange=()=>{};
 $('decisionButtons').onclick=e=>{const choice=e.target.closest('[data-decision]')?.dataset.decision;if(choice)move({type:'decision',choice,ballId:Number($('penaltyBall').value)});};
 $('pocketMarkers').replaceChildren(...POCKET_NAMES.map((name,i)=>{const b=document.createElement('button');b.type='button';b.textContent=i+1;b.title=name;b.setAttribute('aria-label','Заказать лузу '+(i+1)+' · '+name);b.onclick=()=>$('callPocket').value=String(i);return b;}));
 function token(id,s){const b=document.createElement('span');b.className='potted-ball'+(s.discipline!=='pyramid'&&id>8?' striped':'');b.style.setProperty('--ball-color',ballColor(id,s));b.textContent=id||'';b.title=id?'Шар '+id:'Цветной шар';if(id===8&&s.discipline==='pool8'&&s.winner!==null&&s.winner!==s.lastShooter){b.classList.add('invalid-eight');b.title='Восьмёрка с нарушением — проигрыш партии';}return b;}
 function updateOptions(select,values,empty){const old=select.value;select.replaceChildren(new Option(empty,''),...values.map(b=>new Option(b.id?'№ '+b.id:'Цветной',String(b.id))));if(values.some(b=>String(b.id)===old))select.value=old;}
 function options(s){return {cueId:selectedCue,callBall:$('callBall').value===''?null:Number($('callBall').value),callPocket:$('callPocket').value===''?null:Number($('callPocket').value),safety:$('safety').checked};}
 function chooseCue(s,point){if(s.discipline!=='pyramid'||s.breakPending||s.inHand)return false;const ball=s.balls.filter(b=>!b.pocket).map(b=>({ball:b,distance:Math.hypot(b.x-point.x,b.y-point.y)})).filter(b=>b.distance<22).sort((a,b)=>a.distance-b.distance)[0]?.ball;if(!ball)return false;selectedCue=ball.id;return true;}
 function render(s,{player,mode,tableView,can}){
  viewState=s;$('matchDiscipline').textContent=s.discipline==='pyramid'?'Русский · свободная пирамида':'Американский пул · восьмёрка';if(!s.balls.some(b=>b.id===selectedCue&&!b.pocket)||s.breakPending||s.discipline!=='pyramid')selectedCue=s.discipline==='pyramid'&&!s.breakPending?(s.balls.find(b=>!b.pocket)?.id??0):0;
  const russian=s.discipline==='pyramid',key=JSON.stringify([s.shot,s.turn,s.discipline,s.color,s.groups,s.balls.map(b=>b.pocket),s.pending,s.winner,player,mode]);
  $('placeBreak').hidden=!s.breakPending||!can;$('placeBreak').textContent=placing?'Нажмите в доме на столе':'Передвинуть биток в доме';
  $('ballShelves').hidden=!tableView;$('callControls').hidden=!tableView||russian||s.breakPending||s.moving||!!s.pending||!can;$('cuePickHint').hidden=!tableView||!russian||s.breakPending;
  $('cuePickHint').textContent='Биток: '+(selectedCue?'№ '+selectedCue:'цветной')+' · нажмите на шар для выбора';
  $('decisionPanel').hidden=!s.pending||!can;const call=options(s),needCall=!russian&&!s.breakPending&&!safety()&&(call.callBall===null||call.callPocket===null);
  if(can&&s.pending)$('hint').textContent='Выберите продолжение партии ниже';else if(can&&s.inHand)$('hint').textContent=s.handZone==='head'?'Установите биток в доме — в нижней четверти стола':'Нажмите на свободное место для установки битка';else if(can&&needCall)$('hint').textContent='Выберите заказанный шар и лузу либо отыгрыш';
  $('shoot').disabled=!can||s.inHand||!tableView||!!s.pending||needCall||placing;
  $('pocketMarkers').hidden=!tableView||russian||s.breakPending||!can||!!s.pending;
  if(!$('pocketMarkers').hidden)Array.from($('pocketMarkers').children).forEach((b,i)=>{const p=room.projectPocket?.(i);if(p){b.style.left=p.x+'px';b.style.top=p.y+'px';}b.classList.toggle('chosen',$('callPocket').value===String(i));});
  if(key!==lastKey){lastKey=key;updateOptions($('callBall'),legalTargets({...s,cueId:selectedCue}),'Выберите шар');
   for(let side=0;side<2;side++){const me=side===0,p=mode==='training'?side:me?player:1-player,name=mode==='training'?'Сторона '+(side+1):me?'Вы':mode==='solo'?'Компьютер':'Друг',g=s.groups[p];$('shelfName'+side).textContent=name;$('shelfGroup'+side).textContent=russian?'До 8 шаров':g===null?'Стол открыт':g===0?'Сплошные · 1–7':'Полосатые · 9–15';const ids=[...(s.captured?.[p]||s.balls.filter(b=>b.pocket&&b.id&&b.id!==8&&g!==null&&(b.id<8?0:1)===g).map(b=>b.id))];if(!russian&&s.winner!==null&&s.lastShooter===p&&s.balls.some(b=>b.id===8&&b.pocket))ids.push(8);$('shelfBalls'+side).replaceChildren(...ids.map(id=>token(id,s)));$('shelfCount'+side).textContent=(russian?ids.length:ids.filter(id=>id!==8).length)+' / '+(russian?8:7);$('shelf'+side).classList.toggle('active',s.turn===p&&s.winner===null);}
   const unassigned=!russian&&s.groups[0]===null?s.balls.filter(b=>b.pocket&&b.id&&b.id!==8):[];$('unassignedBalls').replaceChildren(...unassigned.map(b=>token(b.id,s)));$('unassignedTray').hidden=!unassigned.length;
   if(s.pending){const d=s.pending,pyramid=d.type==='pyramid-foul';$('penaltyLabel').hidden=!pyramid;if(pyramid)updateOptions($('penaltyBall'),s.balls.filter(b=>!b.pocket),'Выберите штрафной шар');const choices=pyramid?[['play','Снять шар и играть'],['pass','Снять шар и передать ход'],...(d.illegalBreak?[['rerack-self','Переразбить самому'],['rerack-opponent','Повторит соперник']]:[])]:d.illegal?[['accept','Принять позицию'],...(d.foul?[['hand','Биток с руки из дома']]:[]),['rerack-self','Переразбить самому'],['rerack-opponent','Повторит соперник']]:d.eight?[['accept',d.foul?'Выставить № 8 · биток из дома':'Выставить № 8 и продолжить'],['rerack-self','Разбить заново']]:[['accept','Принять позицию'],['hand','Биток с руки из дома']];$('decisionButtons').replaceChildren(...choices.map(([choice,label])=>{const b=document.createElement('button');b.type='button';b.dataset.decision=choice;b.textContent=label;return b;}));}
  }
  if(s.pending?.type==='pyramid-foul')for(const b of $('decisionButtons').children)b.disabled=$('penaltyBall').value==='';
  return {...s,cueId:selectedCue};
 }
 function safety(){return $('safety').checked;}
 function rules(){const russian=(viewState?.discipline||settings().discipline)==='pyramid';$('rulesTitle').textContent=russian?'Русский · свободная пирамида':'Американский пул · восьмёрка';$('rulesText').replaceChildren(...(russian?[
  '15 белых шаров и один цветной. Побеждает тот, кто первым набрал 8 шаров. Шары не делятся на свои и чужие.',
  'Разбой — цветным шаром из дома. После разбоя нажмите на любой шар на столе, чтобы выбрать его битком. Можно забивать и прицельный шар, и сам биток после касания другого шара. Заказ лузы не нужен.',
  'Правильный разбой: после касания забит шар, либо 3 прицельных шара коснулись борта, либо 2 коснулись борта и прицельный шар пересёк середину стола.',
  'Если шар не забит, после касания нужны два разных борта либо пересечение середины и борт. Это может быть выполнено через передачу движения другим шарам. Одного короткого касания борта недостаточно.',
  'За фол все неправильно забитые шары возвращаются на стол. Соперник выбирает любой оставшийся шар на свою полку, затем играет сам или передаёт ход. При неправильном разбое можно также заказать новую расстановку с сохранением счёта.'
 ]:[
  'Белый биток и 15 цветных: сплошные 1–7, полосатые 9–15, чёрный № 8. Сначала уберите свою группу, затем забейте № 8 в заказанную лузу.',
  'Разбой из дома. Без забитого шара минимум 4 разных прицельных шара должны коснуться борта. Стол после разбоя остаётся открытым. Группа определяется первым правильно забитым заказанным шаром после разбоя.',
  'Перед каждым ударом после разбоя выберите шар и лузу (номера луз показаны на столе). Заказанный шар должен попасть именно туда, чтобы продолжить серию. Можно объявить отыгрыш — после него ход переходит сопернику.',
  'Сначала коснитесь шара своей группы; на открытом столе — любого, кроме № 8, пока не очищена одна из групп. После касания нужен забитый прицельный шар или касание борта любым шаром.',
  'Забитый биток, отсутствие касания и неправильный первый шар — фол. Соперник ставит биток в любом месте; после фола на разбое — в доме. Ранняя восьмёрка, восьмёрка с фолом или в другой лузе — поражение. На разбое восьмёрка выставляется либо выбирается повторный разбой.'
 ]).map(text=>{const p=document.createElement('p');p.textContent=text;return p;}));$('rules').showModal();}
 $('rulesButton').onclick=rules;
 return {settings,options,render,chooseCue,restoreControls(c){selectedCue=c.cueId??0;lastKey='';placing=false;$('callBall').replaceChildren(new Option('Выберите шар',''),new Option('№ '+c.callBall,String(c.callBall)));$('callBall').value=c.callBall==null?'':String(c.callBall);$('callPocket').value=c.callPocket==null?'':String(c.callPocket);$('safety').checked=!!c.safety;},isPlacing:s=>s.inHand||s.breakPending&&placing,placed(){placing=false;},reset(){selectedCue=0;placing=false;lastKey='';$('callBall').value='';$('callPocket').value='';$('safety').checked=false;},inspect:()=>({selectedCue,call:options(viewState||{})})};
}
