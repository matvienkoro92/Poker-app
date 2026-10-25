export function mountResultPanel(dock,restart){
 const panel=document.createElement('section');panel.id='matchResult';panel.hidden=true;panel.setAttribute('role','status');panel.innerHTML='<small>ПАРТИЯ ЗАВЕРШЕНА</small><h2></h2><p></p><button type="button" class="primary"></button><span></span>';dock.append(panel);panel.querySelector('button').onclick=restart;
 return {render(s,{mode,player,series,tableView,wager}){
  const finished=!!mode&&s.winner!==null&&!s.moving;panel.hidden=!finished||!tableView;document.body.classList.toggle('billiards-finished',finished);
  if(!finished)return;
  const draw=s.winner==='draw',training=mode==='training',won=s.winner===player,complete=series.target===3&&series.winner!==null;
  panel.querySelector('small').textContent=complete?'СЕРИЯ ЗАВЕРШЕНА':'ПАРТИЯ ЗАВЕРШЕНА';
  panel.querySelector('h2').textContent=draw?'Ничья по соглашению':training?'Сторона '+(s.winner+1)+' победила!':won?(complete?'Вы выиграли серию!':'Вы победили!'):'Победил '+(mode==='solo'?'компьютер':'соперник');
  panel.querySelector('p').textContent=(s.endReason==='resign'?(won?'Соперник сдался. ':'Вы сдались. '):'')+'Счёт партии: '+s.scores[player]+' : '+s.scores[1-player]+(series.target===3?' · Серия: '+series.wins[player]+' : '+series.wins[1-player]:'');
  const owner=mode!=='online'||player===0,button=panel.querySelector('button');button.hidden=!owner||!!(wager&&wager.status!=='playing');button.textContent=series.target===3?(complete?'Начать новую серию':'Начать следующую партию'):'Начать новую партию';panel.querySelector('span').textContent=wager?(wager.status==='paid'?(wager.winner===player?'Вам начислено ':'Победителю начислено ')+wager.payout.toLocaleString('ru-RU')+' фишек на Poker21. Комиссия — '+wager.feePercent+'% банка.':wager.status==='refunded'?'Ставки возвращены на баланс Poker21 без комиссии.':wager.status==='paying'?'Начисляем выигрыш на Poker21…':'Банк '+wager.bank.toLocaleString('ru-RU')+' фишек. Ставка — на всю серию.'):owner?'': 'Следующую партию запускает создатель комнаты.';
 }};
}
