(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.PokerHandShare=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const suits={s:'♠',h:'♥',d:'♦',c:'♣'},labels={'2':'Колл','3':'Рейз','5':'Олл-ин','10':'Фолд','17':'Чек','18':'МБ','19':'ББ','20':'Ставка','21':'Страдл'};
const potCodes=new Set(['2','3','5','18','19','20','21','92']);
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
// Poker21 omits the live straddle post from opt. It can still be recovered when
// a raise-free preflop has calls above the BB and ends with a non-BB player
// checking their option. Do not rely on replay.seats order: live exports may
// list physical seats rather than action order.
function events(replay){
 const source=Array.isArray(replay&&replay.events)?replay.events:[];
 const boardIndex=source.findIndex(event=>Array.isArray(event.board)&&event.board.length);
 const end=boardIndex<0?source.length:boardIndex,preflop=source.slice(0,end);
 const decisions=preflop.filter(event=>['2','3','5','10','17','20'].includes(String(event.code)));
 const checks=decisions.filter(event=>String(event.code)==='17'),calls=decisions.filter(event=>String(event.code)==='2');
 if(!decisions.length||checks.length!==1||!calls.length||decisions.at(-1)!==checks[0]||decisions.some(event=>['3','5','20'].includes(String(event.code))))return source;
 const straddler=checks[0],actorId=String(straddler.actorId??''),seats=Array.isArray(replay&&replay.seats)?replay.seats:[];
 const straddlerSeat=seats.find(seat=>String(seat.actorId??'')===actorId),bb=preflop.find(event=>String(event.code)==='19'),amount=Number(calls[0].amount);
 const alreadyContributed=preflop.some(event=>String(event.actorId??'')===actorId&&['2','3','5','18','19','20','21'].includes(String(event.code))&&Number(event.amount)>0);
 if(!straddlerSeat||String(straddlerSeat.position)==='BB'||alreadyContributed||!Number.isFinite(amount)||amount<=Number(bb&&bb.amount||0)||calls.some(event=>Number(event.amount)!==amount))return source;
 const insertAt=Math.max(0,source.indexOf(decisions[0]));
 const inferred={sequence:Number(straddler.sequence)-0.5,code:'21',actor:straddler.actor,actorId:straddler.actorId,amount,board:[],inferred:true};
 return [...source.slice(0,insertAt),inferred,...source.slice(insertAt)];
}
function splitOutcome(text){
 const lines=String(text||'').split(/\r?\n/);
 const action=/\s—\s(?:Колл|Рейз|Олл-ин|Фолд|Чек|Ставка|МБ|ББ)(?:\s|$)/;
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
 let street='Префлоп',streetCards='',pot=0;
 const positionFor=positions(hand,replay);
 const startingStacks=new Map((replay.stacks||[]).map(player=>[String(player.actor||''),Number(player.amount)]));
 const actorLabel=event=>{const actor=String(event.actor||'Игрок');if(actor==='Вы'||String(event.actorId)===String(hand.playerId))return actor;const stack=startingStacks.get(actor);return Number.isFinite(stack)?actor+' ('+display(stack)+' '+unit+')':actor;};
 const startStreet=()=>{lines.push(street+(streetCards?': '+streetCards:'')+' · Банк: '+display(pot)+' '+unit);};
 startStreet();
 for(const event of events(replay)){
  if(event.board?.length){street={3:'Флоп',4:'Тёрн',5:'Ривер'}[event.board.length]||'Борд';streetCards=event.board.map(card).join(' ');lines.push('');startStreet();continue;}
  if(String(event.code)==='92'){pot+=Number(event.amount)||0;continue;}
  const label=labels[String(event.code)];if(!label)continue;
  if(potCodes.has(String(event.code)))pot+=Number(event.amount)||0;
  const position=positionFor(event);lines.push((position?position+': ':'')+actorLabel(event)+' — '+label+(event.amount?' '+display(event.amount)+' '+unit:''));
 }
 lines.push('','Итоговый банк: '+display(pot)+' '+unit);
 for(const player of replay.shownOpponents||[]){if(['showdown-winner','showdown-allin'].includes(player.disclosure))lines.push('Вскрытие: '+player.actor+' · '+(player.cards||[]).map(card).join(' '));}
 lines.push('','Результат: '+result+' '+unit+(inBb?'':' · '+(hand.bb>0?'+':'')+amount(hand.bb)+' bb'));
 lines.push('Два туза · Моя игра');
 const full=lines.join('\n');
 return options?.showShowdown===false?splitOutcome(full).visible:full;
}
return {text,card,positions,events,splitOutcome};
});
