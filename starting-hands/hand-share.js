(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.PokerHandShare=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const suits={s:'♠',h:'♥',d:'♦',c:'♣'},labels={'2':'Колл','3':'Рейз','5':'Олл-ин','10':'Фолд','17':'Чек','18':'Малый блайнд','19':'Большой блайнд','20':'Ставка'};
const card=value=>String(value||'').replace(/^T/,'10').replace(/([shdc])$/,(_,s)=>suits[s]||s);
const amount=value=>new Intl.NumberFormat('ru-RU',{maximumFractionDigits:2}).format(Number(value)||0);
function text(hand,replay,options){
 const date=new Intl.DateTimeFormat('ru-RU',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Europe/Moscow'}).format(new Date(hand.playedAt));
 const unit=hand.mode==='cash'?'₽':'фишек',result=(hand.resultMinor>0?'+':'')+amount(hand.resultMinor/100),lines=['Раздача #'+hand.handId+' · '+date+' МСК','Мои карты: '+(replay.cards||hand.cards||[]).map(card).join(' '),'Позиция: '+hand.position+' · большой блайнд '+amount(hand.bigBlindMinor/100)+' '+unit,''];
 let street='Префлоп';lines.push(street);
 for(const event of replay.events||[]){
  if(event.board?.length){street={3:'Флоп',4:'Тёрн',5:'Ривер'}[event.board.length]||'Борд';lines.push('',street+': '+event.board.map(card).join(' '));continue;}
  const label=labels[String(event.code)];if(!label)continue;
  lines.push(String(event.actor||'Игрок')+' — '+label+(event.amount?' '+amount(event.amount):''));
 }
 for(const player of replay.shownOpponents||[]){if(['showdown-winner','showdown-allin'].includes(player.disclosure))lines.push('Вскрытие: '+player.actor+' · '+(player.cards||[]).map(card).join(' '));}
 lines.push('','Результат: '+result+' '+unit+' · '+(hand.bb>0?'+':'')+amount(hand.bb)+' bb');
 lines.push('Два туза · Моя игра');
 return lines.join('\n');
}
return {text,card};
});
