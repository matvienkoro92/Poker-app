'use strict';
const {randomUUID}=require('node:crypto');
const redis=require('./redis');
const {guardedFetch}=require('./telegram-group-policy');
const {issuePaymentLink}=require('./deposit-link-routing');
const {STORE_KEY}=require('./telegram-deposit-withdrawals');
const PREFIX='poker_app:player-deposit:v1:';
const COMMAND=/^\/?(?:деп|депозит|dep|deposit)(?:@Poker_dvatuza_bot)?(?:\s+([\s\S]*))?$/i;
function amount(value){
  const text=String(value||'').trim().replace(/[ \u00a0\u202f]/g,'').replace(/(?:₽|руб(?:лей|ля|ль)?\.?|р\.?)$/i,'');
  if(!/^\d{1,8}(?:[.,]\d{1,2})?$/.test(text))return null;
  const [rub,fraction='']=text.split(/[.,]/),n=Number(rub)*100+Number(fraction.padEnd(2,'0'));
  return Number.isSafeInteger(n)&&n>=0&&n<=10000000000?n:null;
}
function command(update){
  const m=update.message;
  return m?.chat?.type==='private'&&(COMMAND.test(String(m.text||'').trim())||/^\/start(?:@Poker_dvatuza_bot)?\s+deposit$/i.test(String(m.text||'').trim()));
}
async function run(commands){return redis.pipeline(commands,{throwOnError:true,context:'player-deposit'});}
async function read(key){return (await run([['GET',key]]))[0]?.result||null;}
async function handle(update,token){
  const cb=update.callback_query,m=cb?.message||update.message,user=cb?.from||m?.from;
  const selection=String(cb?.data||'').match(/^club:player-deposit:amount:(100000|150000|200000|300000)$/);
  const clicked=cb?.data==='club:player-deposit'||Boolean(selection);
  if(cb&&!clicked)return false;
  if(!token||!m||!user||user.is_bot)return false;
  async function api(method,body){
    const r=await guardedFetch('https://api.telegram.org/bot'+token+'/'+method,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(8000)},'player-deposit');
    const d=await r.json();if(!r.ok||!d.ok)throw Error('Player deposit Telegram request failed');return d.result;
  }
  if(m.chat?.type!=='private'||String(m.chat.id)!==String(user.id)){
    if(clicked)await api('answerCallbackQuery',{callback_query_id:cb.id,text:'Откройте @Poker_dvatuza_bot в личке и напишите /деп.',show_alert:true});
    return Boolean(clicked);
  }
  if(!redis.isConfigured())return false;
  const text=String(m.text||'').trim(),match=COMMAND.exec(text),explicit=clicked||command(update);
  const waitingKey=PREFIX+'waiting:'+user.id;
  const waitingRaw=explicit&&!selection?null:await read(waitingKey);
  let waiting;try{waiting=JSON.parse(waitingRaw||'null');}catch{}
  if(selection&&(!waiting||waiting.expiresAt<Date.now()||waiting.promptMessageId!==m.message_id||!waiting.options?.includes(Number(selection[1])))){
    await api('answerCallbackQuery',{callback_query_id:cb.id,text:'Этот выбор устарел. Напишите /деп ещё раз.',show_alert:true});return true;
  }
  if(!explicit&&(!waiting||waiting.expiresAt<Date.now()))return false;
  if(!explicit&&m.reply_to_message&&m.reply_to_message.message_id!==waiting.promptMessageId)return false;
  const cancel=/^\/(?:отмена|cancel)(?:@Poker_dvatuza_bot)?$/i.test(text);
  const value=selection?Number(selection[1]):explicit?amount(match?.[1]):amount(text);
  if(!explicit&&!cancel&&value===null){
    if(/^\//.test(text))return false;
    await run([['DEL',waitingKey]]);return false;
  }
  const event=cb?'callback_'+cb.id:'message_'+m.message_id;
  const doneKey=PREFIX+'done:'+user.id+':'+event,lockKey=PREFIX+'lock:'+user.id,lockValue=randomUUID();
  const [claim]=await run([['SET',lockKey,lockValue,'NX','EX',60]]);
  if(claim.result!=='OK')throw Error('Deposit request busy');
  const supportTasks=[];let clearWaiting=false;
  async function replyOnce(suffix,body){
    const key=doneKey+':'+suffix,saved=await read(key);
    if(saved)return JSON.parse(saved);
    const reply=await api('sendMessage',body);
    await run([['SET',key,JSON.stringify({message_id:reply.message_id}),'EX',7*86400]]);
    return reply;
  }
  try{
    if(await read(doneKey))return true;
    if(clicked)await api('answerCallbackQuery',{callback_query_id:cb.id});
    if(cancel){
      await replyOnce('cancel-reply',{chat_id:m.chat.id,text:'Запрос пополнения отменён.'});
      supportTasks.push(()=>require('./telegram-support').clearAwaitingAmountNotice(token,m.chat.id));
      clearWaiting=true;
    }
    else{
      // Player replies never wait for manager/topic work. Keep that work awaited
      // afterwards so webhook retries can recover it using the saved reply IDs.
      if(value!==null)supportTasks.push(()=>require('./telegram-support').clearAwaitingAmountNotice(token,m.chat.id));
      if(!cb&&(value===null||value>=100000))supportTasks.push(()=>require('./telegram-support').handle(update,token,{includePrivateCommands:true}));
      if(value===null){
        const promptKey=doneKey+':prompt';
        const savedPrompt=await read(promptKey);
        const prompt=savedPrompt?JSON.parse(savedPrompt):await api('sendMessage',{chat_id:m.chat.id,text:'На какую сумму хотите пополнить?\nНапишите сумму числом, например: 3000.\n\nОтмена — /отмена.',reply_markup:{force_reply:true}});
        if(!savedPrompt)await run([['SET',promptKey,JSON.stringify({message_id:prompt.message_id}),'EX',7*86400]]);
        await run([['SET',waitingKey,JSON.stringify({promptMessageId:prompt.message_id,expiresAt:Date.now()+15*60000}),'EX',900]]);
        supportTasks.push(()=>require('./telegram-support').mirrorBotMessage(token,m.chat.id,prompt.message_id,user,{awaitingAmount:true}));
      }else if(value<100000){
        const prompt=await replyOnce('minimum-reply',{chat_id:m.chat.id,text:'Напишите сумму от 1000, например 3000',reply_markup:{force_reply:true,input_field_placeholder:'От 1000 ₽'}});
        await run([['SET',waitingKey,JSON.stringify({promptMessageId:prompt.message_id,expiresAt:Date.now()+15*60000}),'EX',900]]);
      }else if(value>=300000){
        clearWaiting=true;
        const reply=await replyOnce('requisites-reply',{chat_id:m.chat.id,text:'Ожидайте, ищем реквизиты на '+(value/100).toLocaleString('ru-RU')+' ₽.'});
        if(selection)supportTasks.push(()=>require('./telegram-support').mirrorBotMessage(token,m.chat.id,reply.message_id,user));
      }else if(![100000,150000,200000].includes(value)){
        const amounts=[100000,150000,200000,300000];
        const options=[amounts.filter(n=>n<value).at(-1),amounts.find(n=>n>value)];
        const money=n=>(n/100).toLocaleString('ru-RU')+' ₽';
        const prompt=await replyOnce('choice-reply',{chat_id:m.chat.id,text:'Для суммы '+money(value)+' выберите ближайшую сумму ниже или выше:',reply_markup:{inline_keyboard:[options.map(n=>({text:money(n),callback_data:'club:player-deposit:amount:'+n}))]}});
        await run([['SET',waitingKey,JSON.stringify({promptMessageId:prompt.message_id,options,expiresAt:Date.now()+15*60000}),'EX',900]]);
        supportTasks.push(()=>require('./telegram-support').mirrorBotMessage(token,m.chat.id,prompt.message_id,user));
      }else{
        let link;
        for(let attempt=0;attempt<8;attempt++){
          const raw=await read(STORE_KEY)||'',state=raw?JSON.parse(raw):{revision:0,entries:[],requests:[]};
          const result=issuePaymentLink(state,{amount:value,requestId:'player_deposit_'+user.id+'_'+(cb?cb.message.message_id:m.message_id)},'tg_'+user.id);
          if(result.duplicate){link=result.link;break;}
          const [saved]=await run([['EVAL',"if (redis.call('GET',KEYS[1]) or '')~=ARGV[1] then return 0 end; redis.call('SET',KEYS[1],ARGV[2]); return 1",1,STORE_KEY,raw,JSON.stringify(state)]]);
          if(Number(saved.result)===1){link=result.link;break;}
        }
        if(!link)throw Error('Concurrent payment link issuance');
        const money=n=>(n/100).toLocaleString('ru-RU')+' ₽';
        const replyKey=doneKey+':payment-reply',savedReply=await read(replyKey);
        const reply=savedReply?JSON.parse(savedReply):await api('sendMessage',{chat_id:m.chat.id,text:'Пополнение игрового счёта: '+money(link.amount)+'\nКомиссия: '+money(link.chargeAmount-link.amount)+'\nК оплате: '+money(link.chargeAmount)+'\n\nПосле оплаты напишите здесь свой игровой ID и ID клуба. Менеджер проверит оплату и зачислит деньги.',reply_markup:{inline_keyboard:[[{text:'💳 Оплатить '+money(link.chargeAmount),url:link.url}]]}});
        if(!savedReply)await run([['SET',replyKey,JSON.stringify({message_id:reply.message_id}),'EX',7*86400]]);
        supportTasks.push(()=>require('./telegram-support').mirrorBotMessage(token,m.chat.id,reply.message_id,user,{paymentLink:{providerId:link.providerId,amount:link.amount,chargeAmount:link.chargeAmount}}));
        clearWaiting=true;
      }
    }
    for(const task of supportTasks)await task();
    if(clearWaiting)await run([['DEL',waitingKey]]);
    await run([['SET',doneKey,'sent','EX',7*86400]]);return true;
  }finally{await run([['EVAL',"if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end; return 0",1,lockKey,lockValue]]);}
}
module.exports={handle,command,amount};
