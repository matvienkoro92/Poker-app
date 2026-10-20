'use strict';
const crypto=require('node:crypto'),redis=require('./redis');
const {summary}=require('./admin-deposits');
const {canonicalAccountId}=require('./account-canonical');
const {guardedFetch}=require('./telegram-group-policy');
const OUTBOX='poker_app:deposit_notifications:outbox',QUEUE='poker_app:deposit_notifications:pending';
const money=n=>(Number(n)/100).toLocaleString('ru-RU',{maximumFractionDigits:2})+' ₽';
const rooms={P21:'Poker21',X:'X-Poker',PP:'PPPoker',Supr:'SupremaPoker'};
async function run(commands){const rows=await redis.pipeline(commands,{throwOnError:true,context:'deposit-player-notifications'});if(!rows||rows.length!==commands.length||rows.some(r=>r.error))throw Error('Notification storage unavailable');return rows;}
function eventForOperation(state,op,now=Date.now()){
 const e=(state.entries||[]).find(e=>e.id===(op.action==='create'?op.requestId:op.entryId));if(!e)return null;
 const s=summary(e),payment=e.payments.find(p=>p.id===op.requestId||op.action==='void'&&p.id===op.paymentId),reservation=(e.reservations||[]).find(r=>r.id===op.requestId||r.id===op.reservationId),returned=(e.returns||[]).find(r=>r.id===op.requestId||r.id===op.returnId);
 let title='';
 switch(op.action){
  case 'create':title='Заявка на вывод принята: '+money(e.total);break;
  case 'reserve':if(reservation)title='Готовится выплата: '+money(reservation.amount);break;
  case 'release-reservation':if(reservation)title='Подготовка выплаты отменена: '+money(reservation.amount);break;
  case 'payment':case 'confirm-reservation':if(payment)title='Выплачено: '+money(payment.amount);break;
  case 'void':if(payment)title='Выплата отменена: '+money(payment.amount);break;
  case 'return':if(returned)title='По выводу отмечен возврат в кассу: '+money(returned.amount);break;
  case 'void-return':if(returned)title='Возврат в кассу отменён: '+money(returned.amount);break;
  case 'adjust':title='Сумма заявки на вывод изменена: '+money(e.total);break;
  case 'delete':title='Заявка на вывод отменена';break;
 }
 if(!title)return null;
 // Only allowlisted fields: never include manager notes, payment sources or payee details.
 const when=new Intl.DateTimeFormat('ru-RU',{timeZone:'Europe/Moscow',day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'});
 const text=[title,rooms[e.room]+' · ID '+e.playerId,'Заявка от '+when.format(new Date(e.createdAt))+' МСК','Операция: '+when.format(new Date(now))+' МСК','Сумма вывода: '+money(e.total),'Выплачено по заявке: '+money(s.paid),'Осталось по заявке: '+money(s.remaining),...(!s.remaining&&!e.deletedAt?['Вывод закрыт.']:[])].join('\n');
 return {id:op.requestId,entryId:e.id,room:e.room,playerId:e.playerId,text,createdAt:now};
}
function poker21Anchor(state,event){
 const connected=new Set([event.room+'|'+event.playerId]);let changed=true;
 while(changed){changed=false;for(const link of state.playerAccounts||[]){const a=String(link.profileKey||''),b=link.room+'|'+link.playerId;if(!connected.has(a)&&!connected.has(b))continue;for(const key of [a,b])if(!connected.has(key)){connected.add(key);changed=true;}}}
 const ids=[...connected].filter(k=>k.startsWith('P21|')).map(k=>k.slice(4));return ids.length===1?ids[0]:'';
}
async function recipient(state,event){
 const playerId=poker21Anchor(state,event);if(!playerId)return '';
 let account=String((await run([['HGET','poker_app:pokerplus_accounts_by_user_id',playerId.toLowerCase()]]))[0].result||'');
 if(!account){const bindings=await redis.hscanall('poker_app:pokerplus_user_ids',{context:'deposit-notifications.binding',count:500,maxPages:100});const matches=Object.keys(bindings||{}).filter(id=>String(bindings[id])===playerId);if(matches.length!==1)return '';account=matches[0];}
 account=await canonicalAccountId(account);if(!/^ID\d{6}$/.test(account))return '';
 const values=await run([['HGET','poker_app:pokerplus_user_ids',account],['HGET','poker_app:id_to_user',account],['SMEMBERS','poker_app:account_users:'+account]]);
 if(String(values[0].result||'')!==playerId)return '';
 const primary=String(values[1].result||''),candidates=[...new Set([primary,...(values[2].result||[])].filter(id=>/^tg_\d+$/.test(id)))];
 if(!candidates.length)return '';
 const owners=await run(candidates.map(id=>['HGET','poker_app:visitor_dt_ids',id]));const valid=[];
 for(let i=0;i<candidates.length;i++){if(owners[i].result&&await canonicalAccountId(String(owners[i].result))===account)valid.push(candidates[i]);}
 const chosen=valid.includes(primary)?primary:valid.length===1?valid[0]:'';return chosen.replace(/^tg_/,'');
}
async function deliver(id,token,now=Date.now()){
 if(!token)return false;
 const lock='poker_app:deposit_notifications:lock:'+id,nonce=crypto.randomUUID();
 if((await run([['SET',lock,nonce,'NX','EX',30]]))[0].result!=='OK')return false;
 try{
  const raw=(await run([['HGET',OUTBOX,id]]))[0].result;if(!raw){await run([['ZREM',QUEUE,id]]);return false;}
  const event=JSON.parse(raw),ledger=(await run([['GET','poker21:admin-deposits:v1']]))[0].result;
  const chatId=await recipient(ledger?JSON.parse(ledger):{},event);
  if(!chatId){await run([['HDEL',OUTBOX,id],['ZREM',QUEUE,id]]);return false;}
  const response=await guardedFetch('https://api.telegram.org/bot'+token+'/sendMessage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:chatId,text:event.text}),signal:AbortSignal.timeout(4000)},'');
  const result=await response.json();
  if(result.ok||result.error_code===403||result.error_code===400){await run([['HDEL',OUTBOX,id],['ZREM',QUEUE,id]]);return !!result.ok;}
  await run([['ZADD',QUEUE,now+Math.max(60000,Number(result.parameters?.retry_after||0)*1000),id]]);return false;
 }catch(_){await run([['ZADD',QUEUE,now+60000,id]]);return false;}
 finally{await run([['EVAL',"if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end; return 0",1,lock,nonce]]);}
}
async function retryPending(token,now=Date.now()){
 const ids=(await run([['ZRANGEBYSCORE',QUEUE,'-inf',now,'LIMIT',0,10]]))[0].result||[];
 let sent=0;for(const id of ids){try{if(await deliver(id,token,now))sent++;}catch(_){}}return {processed:ids.length,sent};
}
module.exports={OUTBOX,QUEUE,eventForOperation,poker21Anchor,recipient,deliver,retryPending};
