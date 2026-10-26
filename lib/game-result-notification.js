'use strict';
const labels={chess:'♟ Шахматы',short:'🎲 Короткие нарды',long:'🎲 Длинные нарды',pyramid:'🎱 Русский бильярд',pool8:'🎱 Американский пул'};
const clean=name=>String(name||'Игрок').replace(/[\u0000-\u001f\u007f-\u009f\u2028\u2029]/g,' ').replace(/\s+/g,' ').trim().slice(0,80);
function create({commands,playersGroup,send}){
 return async function notify(view,family){
  const winner=view?.state?.winner;
  if(!view?.ready||!view.roomId||![0,1,'draw'].includes(winner))return false;
  if(view.wager&&view.match?.winner!==null&&!['paid','refunded'].includes(view.wager.status))return false;
  const chat=await playersGroup();if(!/^-\d+$/.test(String(chat)))return false;
  const key='poker_app:game-result:'+family+':'+view.roomId+':'+(view.match?.number||1)+':'+(view.match?.round||1);
  // Claim before delivery: concurrent polling and ambiguous Telegram timeouts must not duplicate messages.
  const [claimed]=await commands([['SET',key,'pending','NX','EX',2592000]]);if(!claimed)return false;
  const names=[0,1].map(i=>clean(view.playerProfiles?.[i]?.name));
  const lines=[(labels[view.state.discipline]||'Игра')+' · партия завершена!','',winner==='draw'?'🤝 Ничья: '+names.join(' — '):'🏆 Победил: '+names[winner],...(winner==='draw'?[]:['Соперник: '+names[1-winner]])];
  if(['long','short'].includes(view.state.discipline)&&winner!=='draw'&&view.state.winPoints)lines.push((view.state.winKind==='koks'?'Кокс':view.state.winKind==='mars'?'Марс':'Обычная победа')+' · '+view.state.winPoints+' очк.');
  if(view.match?.target===3)lines.push('Счёт серии: '+view.match.wins.join(' : '));
  if(view.wager?.status==='paid')lines.push('Победителю выплачено '+Number(view.wager.payout).toLocaleString('ru-RU')+' фишек.');
  const payload={chat_id:chat,text:lines.join('\n')};
  if(winner!=='draw'){const prefix='🏆 Победил: ';payload.entities=[{type:'bold',offset:payload.text.indexOf(prefix)+prefix.length,length:names[winner].length}];}
  const response=await send(payload),data=await response.json();
  if(!response.ok||!data.ok){await commands([['DEL',key]]);throw Error('Telegram rejected game result');}
  await commands([['SET',key,String(data.result?.message_id||'sent'),'XX','KEEPTTL']]);return true;
 };
}
module.exports=async function({view,family,commands,token}){if(!token)return false;return create({commands,playersGroup:()=>require('./tracking-link-milestones').playersGroup(),send:payload=>require('./telegram-group-policy').guardedFetch('https://api.telegram.org/bot'+token+'/sendMessage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(8000)},'game-result')})(view,family);};
module.exports.create=create;
