(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.PokerHandShare=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const suits={s:'♠',h:'♥',d:'♦',c:'♣'},labels={'2':'Колл','3':'Рейз','5':'Олл-ин','10':'Фолд','17':'Чек','18':'Малый блайнд','19':'Большой блайнд','20':'Ставка'};
const potCodes=new Set(['2','3','5','18','19','20','92']);
const card=value=>String(value||'').replace(/^T/,'10').replace(/([shdc])$/,(_,s)=>suits[s]||s);
const amount=value=>new Intl.NumberFormat('ru-RU',{maximumFractionDigits:2}).format(Number(value)||0);
const shortPosition=value=>({'UTG':'UT','UTG+1':'U1','UTG+2':'U2','UTG+3':'U3','BTN':'BU','BTN/SB':'SB'}[value]||value||'');
function positions(hand,replay){
 const byId=new Map(),byActor=new Map(),set=(event,position)=>{if(!position||!event)return;if(event.actorId!=null)byId.set(String(event.actorId),position);if(event.actor)byActor.set(String(event.actor),position);};
 const events=replay.events||[],heroEvent=events.find(event=>String(event.actorId)===String(hand.playerId)||event.actor==='Вы');set(heroEvent,shortPosition(hand.position));
 events.forEach(event=>{if(String(event.code)==='18')set(event,'SB');if(String(event.code)==='19')set(event,'BB');});
 const actors=[...new Set((replay.stacks||[]).map(item=>String(item&&item.actor||'')).filter(Boolean))],n=actors.length;
 const layouts={2:['SB','BB'],3:['BU','SB','BB'],4:['CO','BU','SB','BB'],5:['HJ','CO','BU','SB','BB'],6:['LJ','HJ','CO','BU','SB','BB'],7:['UT','LJ','HJ','CO','BU','SB','BB'],8:['UT','U1','LJ','HJ','CO','BU','SB','BB'],9:['UT','U1','U2','LJ','HJ','CO','BU','SB','BB'],10:['UT','U1','U2','U3','LJ','HJ','CO','BU','SB','BB']};
 const used=new Set([...byActor.values()]),available=(layouts[n]||[]).filter(position=>!used.has(position));let index=0,seen=new Set();
 for(const event of events){if(event.board?.length)break;const code=String(event.code);if(['18','19','92','93','94'].includes(code)||!event.actor||event.actor==='Стол')continue;const actor=String(event.actor);if(seen.has(actor)){continue;}seen.add(actor);if(byActor.has(actor))continue;set(event,available[index++]);}
 return event=>byId.get(String(event&&event.actorId))||byActor.get(String(event&&event.actor||''))||'';
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
 return lines.join('\n');
}
return {text,card,positions};
});
