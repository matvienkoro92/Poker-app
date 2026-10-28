export function turnGuidance(s,{player,ready,call={},placing=false,penaltyPicking=false}){
 if(!ready)return {kind:'waiting',title:'Связь восстанавливается',detail:'Дождитесь подключения. Удар пока недоступен.'};
 if(s.winner!==null)return null;
 if(s.moving)return {kind:'waiting',title:'Шары в движении',detail:'Дождитесь остановки шаров.'};
 const mine=s.turn===player;
 if(!mine)return {kind:'waiting',title:'Ход соперника',detail:s.pending?'Соперник выбирает продолжение партии.':s.breakPending?'Соперник разбивает. Дождитесь его удара.':'Вам пока ничего нажимать не нужно — дождитесь удара.'};
 if(s.pending&&(penaltyPicking||s.pending.type==='pyramid-foul'))return {kind:'mine',title:'ШТРАФ сопернику — заберите шар',detail:'Нажмите на любой оставшийся шар на столе — вы заберёте его себе.'};
 if(s.pending)return {kind:'mine',title:'Ваше решение',detail:'Откройте «Выбрать продолжение» и решите, как играть дальше.'};
 if(s.inHand||placing)return {kind:'mine',title:'Ваш ход',detail:'Коснитесь свободного места на столе, чтобы поставить биток.'};
 if(s.breakPending)return {kind:'mine',title:'Ваш ход · вы разбиваете',detail:'Прицельтесь кием, выберите силу и нажмите «Удар».'};
 if(s.discipline==='pool8'&&!call.safety&&(call.callBall===null||call.callPocket===null))return {kind:'mine',title:'Ваш ход',detail:call.callPocket===null?'Выберите лузу':'Выберите шар, который забьёте в эту лузу'};
 return {kind:'mine',title:'Ваш ход',detail:'Прицельтесь кием, выберите силу и нажмите «Удар».'};
}
export function mountTurnGuide(){
 const banner=document.createElement('aside');banner.id='turnGuide';banner.className='turn-guide';banner.hidden=true;banner.setAttribute('role','status');banner.setAttribute('aria-live','polite');banner.innerHTML='<strong></strong><span></span>';document.querySelector('main').append(banner);
 const title=banner.querySelector('strong'),detail=banner.querySelector('span'),$=id=>document.getElementById(id);
 const text=(node,value)=>{if(node.textContent!==value)node.textContent=value;};
 return {render(s,context){const visible=(['online','solo','training','spectator'].includes(context.mode)||context.penaltyPicking)&&context.tableView,guide=visible?turnGuidance(s,context.mode==='spectator'?{...context,player:-1}:context):null;banner.hidden=!guide;
  if(guide){banner.dataset.kind=guide.kind;text(title,guide.title);text(detail,guide.detail);if(s.winner===null)text($('status'),guide.title);}
  const waiting=context.mode==='online'&&s.winner===null&&(!context.ready||s.turn!==context.player);
  text($('shoot'),waiting?'Ждите':'Удар');$('shoot').title=waiting?(!context.ready?'Дождитесь восстановления связи.':'Сейчас ход соперника. Дождитесь своего хода.'):'Сделать удар';
  $('power').disabled=!context.ready||s.turn!==context.player||s.moving||s.winner!==null||!!s.pending;
 }};
}
