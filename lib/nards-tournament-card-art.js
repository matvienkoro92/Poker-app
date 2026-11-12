'use strict';
const path=require('node:path');
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
function cardData(t){return {title:t.title,status:t.status,startsAt:t.startsAt,discipline:t.discipline,entryType:t.entryType,buyIn:t.buyIn,capacity:t.capacity,count:t.entries.filter(e=>!e.withdrawn&&(!t.buyIn||e.paid)).length,prizeKind:t.prizeKind,prizeFund:t.entryType==='chips'?t.entries.filter(e=>!e.withdrawn).length*t.buyIn:t.prizeFund||0,prizeAmounts:t.prizeAmounts};}
async function render(t){
 const sharp=require('sharp'),overlays=[];let y=42;const panels=[];
 async function text(value,size=27,color='#d0ddc9',bold=false,x=48,width=804){
  const {data,info}=await sharp({text:{text:'<span foreground="'+color+'">'+escape(value)+'</span>',font:'Noto Sans '+(bold?'Bold ':'')+size,fontfile:path.join(__dirname,'../assets/fonts/NotoSans-'+(bold?'Bold':'Regular')+'.ttf'),width,rgba:true}}).png().toBuffer({resolveWithObject:true});
  overlays.push({input:data,left:x,top:y});y+=info.height+18;
 }
 await text((t.status==='running'?'ТУРНИР НАЧАЛСЯ':'РЕГИСТРАЦИЯ')+'   •   '+t.count+' / '+t.capacity+' игроков',23,'#ffe4a1',true);
 y+=8;await text(t.title,48,'#fff0c6',true);
 const time=t.startsAt==null?'Старт объявит организатор':new Date(t.startsAt).toLocaleString('ru-RU',{timeZone:'Europe/Moscow',day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})+' МСК';
 await text(time+'   ·   '+(t.discipline==='long'?'Длинные нарды':'Короткие нарды'),25);
 await text(t.entryType==='chips'?'Вход · '+t.buyIn+' фишек Poker21':'Бесплатное участие',27,'#e0e8d5',true);
 y+=12;let top=y-16;
 await text(t.prizeKind==='tickets'?'ПРИЗЫ · БИЛЕТЫ НА ПОКЕР':'ПРИЗОВОЙ ФОНД',23,'#d8ca9b',true,66,768);
 if(t.prizeKind==='tickets'){
  for(const [i,amount]of (t.prizeAmounts||[]).entries())if(amount>0)await text((i+1)+' место — билет за '+Number(amount).toLocaleString('ru-RU')+' ₽',34,'#ffe4a1',true,66,768);
 }else await text(t.prizeFund?Number(t.prizeFund).toLocaleString('ru-RU')+' фишек Poker21':'Без турнирных призов',34,'#ffe4a1',true,66,768);
 panels.push('<rect x="46" y="'+top+'" width="808" height="'+(y-top+4)+'" rx="24" fill="#8c843225" stroke="#d6ba6970"/>');
 y+=36;top=y-16;
 await text('ДЖЕКПОТ · БИЛЕТ ЗА 1 000 ₽',27,'#dcecc7',true,66,768);
 await text('Три одинаковых куша подряд у одного игрока — билет на покерный турнир за 1 000 ₽.',25,'#d0ddc9',false,66,768);
 await text('Например: 4:4 → 4:4 → 4:4. Броски соперника не прерывают серию.',23,'#a7bba7',false,66,768);
 panels.push('<rect x="46" y="'+top+'" width="808" height="'+(y-top+4)+'" rx="24" fill="#081e1960" stroke="#a9cda62b"/>');
 const height=y+44;
 const svg='<svg xmlns="http://www.w3.org/2000/svg" width="900" height="'+height+'"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#315d42"/><stop offset="1" stop-color="#1b4033"/></linearGradient></defs><rect x="3" y="3" width="894" height="'+(height-6)+'" rx="42" fill="url(#bg)" stroke="#e6c570" stroke-width="5"/>'+panels.join('')+'</svg>';
 return sharp(Buffer.from(svg)).composite(overlays).jpeg({quality:90}).toBuffer();
}
module.exports={cardData,render};
