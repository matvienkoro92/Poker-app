'use strict';
const {getPreferredUserIdByDtId}=require('./account-id');
const {sendTelegramMessage}=require('./telegram-bot-send');
const {eventChatId}=require('./telegram-group-policy');
function token(){return process.env.TELEGRAM_BOT_TOKEN||process.env.TELEGRAM_TOKEN||process.env.BOT_TOKEN||'';}
function link(id){const url=new URL('https://t.me/Poker_dvatuza_bot/DvaTuza');url.searchParams.set('startapp','review_'+id);return url.href;}
const amount=value=>new Intl.NumberFormat('ru-RU',{maximumFractionDigits:2}).format(Number(value)||0);
function cards(t){return (t.cards||[]).map(c=>c.replace(/^T/,'10').replace(/[shdc]$/,s=>({s:'♠',h:'♥',d:'♦',c:'♣'}[s]))).join(' ');}
function title(t){return (t.authorNick||t.authorName||'Игрок')+' · '+cards(t);}
function game(t){
 const blind=Number(t.bigBlindMinor)||0,pot=Number(t.totalPotMinor)||0;
 if(t.gameMode==='cash')return 'Кеш · '+amount(blind/200)+'/'+amount(blind/100)+' ₽ · банк '+amount(pot/100)+' ₽';
 if(t.gameMode==='mtt')return 'МТТ'+(blind>0&&Number.isSafeInteger(t.startingStackMinor)?' · стек '+amount(t.startingStackMinor/blind)+' BB':'')+(blind>0&&pot>=0?' · банк '+amount(pot/blind)+' BB':'');
 return '';
}
async function recipient(accountId){const id=/^tg_\d+$/.test(accountId)?accountId:await getPreferredUserIdByDtId(accountId);return /^tg_[1-9]\d*$/.test(id||'')?id.slice(3):'';}
async function checkSubscription(accountId){
 const id=await recipient(accountId);
 if(!id)return 'Для уведомлений в боте привяжите Telegram к аккаунту.';
 const {canReachTelegramBot}=require('./telegram-participation-gate');
 return await canReachTelegramBot(id,token())?'':'Откройте @Poker_dvatuza_bot, нажмите «Старт» и повторите подписку.';
}
async function notify(t,actor,reply){
 if(!token())return;
 const url=link(t.id);
 if(!reply){
  if(t.type!=='hand')return;
  const chat=await eventChatId();if(!chat)throw new Error('Review announcement chat is not configured');
  const lines=['♠ Новая раздача на разбор',t.authorNick||t.authorName||'Игрок',cards(t),game(t),'',t.question,url].filter((line,index)=>line||index===4);
  const sent=await sendTelegramMessage(token(),{chat_id:chat,text:lines.join('\n'),buttonText:'Открыть раздачу',buttonUrl:url,notificationScope:'club-review'});
  if(!sent.ok)throw new Error('Review announcement failed: '+sent.hint);
  return;
 }
 const ids=Object.keys(t.followers).filter(id=>t.followers[id]&&id!==actor.accountId&&(id!==t.authorId||t.explicitFollowers&&t.explicitFollowers[id]));
 for(let i=0;i<ids.length;i+=10)await Promise.all(ids.slice(i,i+10).map(async accountId=>{
  try{const chat=await recipient(accountId);if(!chat)return;
   const sent=await sendTelegramMessage(token(),{chat_id:chat,text:'💬 Новый комментарий\n'+title(t)+'\n'+reply.authorName+': '+reply.text.slice(0,900)+'\n'+url,buttonText:'Открыть тему',buttonUrl:url});
   if(!sent.ok)console.error('[review-telegram]',t.id,sent.hint);
  }catch(e){console.error('[review-telegram]',t.id,e.message);}
 }));
}
module.exports={notify,checkSubscription,link,title};
