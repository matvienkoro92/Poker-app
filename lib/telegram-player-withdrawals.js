'use strict';
const redis=require('./redis');
const {canonicalAccountId}=require('./account-canonical');
const {summary}=require('./admin-deposits');
const {poker21Anchor}=require('./deposit-player-notifications');
const rooms={P21:'Poker21',X:'Х-покер',Supr:'Suprema',PP:'PPpoker'};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const money=n=>(n/100).toLocaleString('ru-RU',{maximumFractionDigits:2});
async function read(commands){const rows=await redis.pipeline(commands,{throwOnError:true,context:'player-withdrawals'});if(!rows||rows.length!==commands.length||rows.some(r=>r.error))throw Error('Storage unavailable');return rows.map(r=>r.result);}
function pages(state,playerId){
 if(!Array.isArray(state.entries))throw Error('Invalid ledger');
 const entries=state.entries.filter(e=>rooms[e.room]&&poker21Anchor(state,e)===String(playerId)&&!e.deletedAt&&!e.archived).map(summary).filter(e=>e.remaining>0);
 const when=new Intl.DateTimeFormat('ru-RU',{timeZone:'Europe/Moscow',day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'});
 const blocks=entries.flatMap(e=>{
  const date=new Intl.DateTimeFormat('ru-RU',{timeZone:'Europe/Moscow',day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(new Date(e.createdAt));
  const overview='<b>Актуальная заявка на вывод: '+money(e.total)+'\n'+rooms[e.room]+' · ID '+esc(e.playerId)+'</b>\n\nЗаявка от '+date+' МСК\n\nСумма вывода: '+money(e.total)+'\nВыплачено по заявке: '+money(e.paid)+'\nОсталось по заявке: '+money(e.remaining);
  const payments=(e.payments||[]).filter(p=>!p.voidedAt).slice().sort((a,b)=>a.createdAt-b.createdAt);
  if(!payments.length)return [overview+'\n\nПлатежей пока нет.'];
  const history=payments.map((p,i)=>(i+1)+'. '+(Number.isFinite(p.createdAt)?when.format(new Date(p.createdAt))+' МСК':'Дата не указана')+' — '+money(p.amount));
  const chunks=[];for(let i=0;i<history.length;i+=25)chunks.push((i===0?overview+'\n\nПлатежи:':'<b>'+rooms[e.room]+' · ID '+esc(e.playerId)+' — платежи, продолжение</b>')+'\n'+history.slice(i,i+25).join('\n'));
  return chunks;
 });
 if(!blocks.length)blocks.push('Актуальных выводов по вашим связанным аккаунтам нет.');
 const result=[];let text='';for(const block of blocks){if(text&&text.length+block.length+2>3500){result.push(text);text='';}text+=(text?'\n\n':'')+block;}if(text)result.push(text);return result;
}
async function handle(update,token){
 const m=update.message||update.business_message;
 if(!token||m?.chat?.type!=='private'||!m.from||m.from.is_bot||String(m.chat.id)!==String(m.from.id))return false;
 let messages;
 try{
  const [bound]=await read([['HGET','poker_app:visitor_dt_ids','tg_'+m.from.id]]);
  const account=await canonicalAccountId(bound||'');
  if(!/^ID\d{6}$/.test(account))messages=['Сначала привяжите свой ID Poker21 в клубном приложении.'];
  else{
   const [playerId,raw]=await read([['HGET','poker_app:pokerplus_user_ids',account],['GET','poker21:admin-deposits:v1']]);
   messages=playerId?pages(raw?JSON.parse(raw):{entries:[]},String(playerId)):['Сначала привяжите свой ID Poker21 в клубном приложении.'];
  }
 }catch(_){messages=['Не удалось проверить выводы. Попробуйте /вывод позже.'];}
 for(const text of messages){const response=await fetch('https://api.telegram.org/bot'+token+'/sendMessage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:m.chat.id,text,parse_mode:'HTML'}),signal:AbortSignal.timeout(10000)});if(!(await response.json()).ok)throw Error('Telegram reply failed');}
 return true;
}
module.exports={handle,pages};
