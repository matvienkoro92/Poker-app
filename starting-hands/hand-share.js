(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.PokerHandShare=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const suits={s:'♠',h:'♥',d:'♦',c:'♣'},labels={'2':'Колл','3':'Рейз','5':'Олл-ин','10':'Фолд','17':'Чек','18':'Малый блайнд','19':'Большой блайнд','20':'Ставка'};
const card=value=>String(value||'').replace(/^T/,'10').replace(/([shdc])$/,(_,s)=>suits[s]||s);
const amount=value=>new Intl.NumberFormat('ru-RU',{maximumFractionDigits:2}).format(Number(value)||0);
function text(hand,replay){
 const date=new Intl.DateTimeFormat('ru-RU',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Europe/Moscow'}).format(new Date(hand.playedAt));
 const unit=hand.mode==='cash'?'₽':'фишек',result=(hand.resultMinor>0?'+':'')+amount(hand.resultMinor/100),lines=['Раздача #'+hand.handId+' · '+date+' МСК','Мои карты: '+(replay.cards||hand.cards||[]).map(card).join(' '),'Позиция: '+hand.position+' · большой блайнд '+amount(hand.bigBlindMinor/100)+' '+unit,''];
 let street='Префлоп';lines.push(street);
 for(const event of replay.events||[]){
  if(event.board?.length){street={3:'Флоп',4:'Тёрн',5:'Ривер'}[event.board.length]||'Борд';lines.push('',street+': '+event.board.map(card).join(' '));continue;}
  const label=labels[String(event.code)];if(!label)continue;
  lines.push(String(event.actor||'Игрок')+' — '+label+(event.amount?' '+amount(event.amount):''));
 }
 lines.push('','Результат: '+result+' '+unit+' · '+(hand.bb>0?'+':'')+amount(hand.bb)+' bb','Два туза · Моя игра');
 return lines.join('\n');
}
function imageBlob(hand,replay){
 const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),width=1080,pad=70,contentWidth=width-pad*2;
 const source=text(hand,replay).split('\n'),rows=[];
 ctx.font='32px system-ui';
 for(const line of source){
  if(!line){rows.push('');continue;}
  const words=line.split(' ');let row='';
  for(const word of words){const next=row?row+' '+word:word;if(ctx.measureText(next).width>contentWidth&&row){rows.push(row);row=word;}else row=next;}
  rows.push(row);
 }
 const lineHeight=48,height=Math.max(1080,260+rows.length*lineHeight+150);canvas.width=width;canvas.height=height;
 const gradient=ctx.createLinearGradient(0,0,width,height);gradient.addColorStop(0,'#101b2d');gradient.addColorStop(.55,'#07101f');gradient.addColorStop(1,'#1c1320');ctx.fillStyle=gradient;ctx.fillRect(0,0,width,height);
 ctx.strokeStyle='#d7ae4c';ctx.lineWidth=4;ctx.beginPath();ctx.roundRect(28,28,width-56,height-56,34);ctx.stroke();
 ctx.fillStyle='#f6c951';ctx.font='700 30px system-ui';ctx.fillText('♠  ДВА ТУЗА',pad,92);
 ctx.fillStyle='#f3f6fb';ctx.font='800 54px system-ui';ctx.fillText('МОЯ РАЗДАЧА',pad,160);
 ctx.fillStyle='#9eabc0';ctx.font='26px system-ui';ctx.fillText('История игры по улицам',pad,205);
 let y=270;
 rows.forEach((line,index)=>{
  const heading=/^(Раздача|Префлоп|Флоп:|Тёрн:|Ривер:|Борд:|Результат:)/.test(line);
  ctx.font=(heading?'700 ':'400 ')+(heading?'34px':'30px')+' system-ui';
  ctx.fillStyle=line.startsWith('Результат:')?'#f6c951':heading?'#eaf0f8':'#b9c5d7';
  if(!line){y+=18;return;}ctx.fillText(line,pad,y);y+=lineHeight;
 });
 ctx.fillStyle='#6f7e94';ctx.font='24px system-ui';ctx.fillText('Клуб «Два туза»',pad,height-75);
 return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('image')),'image/png'));
}
return {text,card,imageBlob};
});
