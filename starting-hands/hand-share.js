(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.PokerHandShare=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const suits={s:'♠',h:'♥',d:'♦',c:'♣'},labels={'2':'Колл','3':'Рейз','5':'Олл-ин','10':'Фолд','17':'Чек','18':'Малый блайнд','19':'Большой блайнд','20':'Ставка'};
const potCodes=new Set(['2','3','5','18','19','20','92']);
const card=value=>String(value||'').replace(/^T/,'10').replace(/([shdc])$/,(_,s)=>suits[s]||s);
const amount=value=>new Intl.NumberFormat('ru-RU',{maximumFractionDigits:2}).format(Number(value)||0);
const shortPosition=value=>({'LJ':'MP','HJ':'MP+1','BTN/SB':'SB','UNKNOWN':''}[value]??value??'');
function positions(hand,replay){
 const byId=new Map(),byActor=new Map(),set=(event,position)=>{if(!position||!event)return;if(event.actorId!=null)byId.set(String(event.actorId),position);if(event.actor)byActor.set(String(event.actor),position);};
 const events=replay.events||[],heroEvent=events.find(event=>String(event.actorId)===String(hand.playerId)||event.actor==='Вы');set(heroEvent,shortPosition(hand.position));
 events.forEach(event=>{if(String(event.code)==='18')set(event,'SB');if(String(event.code)==='19')set(event,'BB');});
 // Seats must come from the source, never from the order players first act
 // (straddles, missing actions and all-ins make that order ambiguous).
 if(replay.seats?.length){byId.clear();byActor.clear();}
 for(const seat of replay.seats||[])set(seat,shortPosition(seat.position));
 return event=>byId.get(String(event&&event.actorId))||byActor.get(String(event&&event.actor||''))||'';
}
function splitOutcome(text){
 const lines=String(text||'').split(/\r?\n/);
 const action=/\s—\s(?:Колл|Рейз|Олл-ин|Фолд|Чек|Ставка|Малый блайнд|Большой блайнд)(?:\s|$)/;
 let lastAction=-1,allIn=false;
 lines.forEach((line,index)=>{if(action.test(line))lastAction=index;if(/\s—\sОлл-ин(?:\s|$)/.test(line))allIn=true;});
 // Keep every decision, including side-pot betting and calls after an all-in.
 let split=lines.findIndex((line,index)=>/^Вскрытие:|^Результат:/.test(line)||(allIn&&index>lastAction&&/^(?:Флоп|Тёрн|Ривер)(?::|\s*·|$)/.test(line)));
 if(split<0)return {visible:lines.join('\n'),hidden:''};
 while(split>0&&!lines[split-1].trim())split--;
 return {visible:lines.slice(0,split).join('\n'),hidden:lines.slice(split).join('\n')};
}
function text(hand,replay,options){
 const date=new Intl.DateTimeFormat('ru-RU',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Europe/Moscow'}).format(new Date(hand.playedAt));
 const metric=hand.metric||(options&&options.metric),inBb=metric==='bb',bigBlind=Number(hand.bigBlindMinor)/100;
 const unit=inBb?'bb':(hand.mode==='cash'?'₽':'фишек'),display=value=>amount(inBb&&bigBlind>0?Number(value)/bigBlind:value);
 const resultValue=inBb?Number(hand.bb):(Number(hand.resultMinor)/100),result=(resultValue>0?'+':'')+amount(resultValue);
 const lines=['Раздача #'+hand.handId+' · '+date+' МСК','Мои карты: '+(replay.cards||hand.cards||[]).map(card).join(' '),'Позиция: '+hand.position+' · большой блайнд '+(inBb?'1':amount(bigBlind))+' '+unit,''];
 let street='Префлоп',streetCards='',streetLine=lines.length,pot=0;
 const positionFor=positions(hand,replay);
 lines.push(street);
 const finishStreet=()=>{lines[streetLine]=street+(streetCards?': '+streetCards:'')+' · Банк: '+display(pot)+' '+unit;};
 for(const event of replay.events||[]){
  if(event.board?.length){finishStreet();street={3:'Флоп',4:'Тёрн',5:'Ривер'}[event.board.length]||'Борд';streetCards=event.board.map(card).join(' ');lines.push('');streetLine=lines.length;lines.push(street);continue;}
  if(String(event.code)==='92'){pot+=Number(event.amount)||0;continue;}
  const label=labels[String(event.code)];if(!label)continue;
  if(potCodes.has(String(event.code)))pot+=Number(event.amount)||0;
  const position=positionFor(event);lines.push((position?position+': ':'')+String(event.actor||'Игрок')+' — '+label+(event.amount?' '+display(event.amount)+' '+unit:''));
 }
 finishStreet();
 for(const player of replay.shownOpponents||[]){if(['showdown-winner','showdown-allin'].includes(player.disclosure))lines.push('Вскрытие: '+player.actor+' · '+(player.cards||[]).map(card).join(' '));}
 lines.push('','Результат: '+result+' '+unit+(inBb?'':' · '+(hand.bb>0?'+':'')+amount(hand.bb)+' bb'));
 lines.push('Два туза · Моя игра');
 const full=lines.join('\n');
 return options?.showShowdown===false?splitOutcome(full).visible:full;
}
return {text,card,positions,splitOutcome};
});
