'use strict';
const {randomUUID}=require('node:crypto');
const redis=require('./redis');
const {guardedFetch}=require('./telegram-group-policy');
const {issuePaymentLink}=require('./deposit-link-routing');
const {STORE_KEY}=require('./telegram-deposit-withdrawals');
const PREFIX='poker_app:player-deposit:v1:';
const COMMAND=/^\/?(?:деп|депозит|пополнить|dep|deposit)(?:@Poker_dvatuza_bot)?(?:(?:\s+|(?=\d))([\s\S]*))?$/i;
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
  const startedAt=Date.now();
  const cb=update.callback_query,m=cb?.message||update.message,user=cb?.from||m?.from;
  const selection=String(cb?.data||'').match(/^club:player-deposit:amount:(100000|150000|200000|300000)$/);
  const paymentAction=String(cb?.data||'').match(/^club:player-deposit:(restart|cancel|paid)$/)?.[1];
  const roomSelection=/^club:player-deposit:room:[01]$/.test(String(cb?.data||''));
  const clicked=roomSelection||cb?.data==='club:player-deposit'||Boolean(selection)||Boolean(paymentAction);
  if(cb&&!clicked)return false;
  if(!token||!m||!user||user.is_bot)return false;
  async function api(method,body){
    const apiStartedAt=Date.now();
    const r=await guardedFetch('https://api.telegram.org/bot'+token+'/'+method,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(8000)},'player-deposit');
    const d=await r.json();if(method==='editMessageText'&&/message is not modified/i.test(d.description||''))return;
    if(!r.ok||!d.ok)throw Error('Player deposit Telegram request failed');
    if(method==='sendMessage')console.info('[player-deposit-reply]',{elapsedMs:Date.now()-startedAt,telegramMs:Date.now()-apiStartedAt});
    return d.result;
  }
  if(m.chat?.type!=='private'||String(m.chat.id)!==String(user.id)){
    if(clicked)await api('answerCallbackQuery',{callback_query_id:cb.id,text:'Откройте @Poker_dvatuza_bot в личке и напишите /деп.',show_alert:true});
    return Boolean(clicked);
  }
  if(!cb&&(require('./telegram-player-statistics').isCommand(update)||require('./telegram-player-spin').isCommand(update)||require('./telegram-player-bonus-balance').isCommand(update)||require('./telegram-player-chat').isCommand(update)))return false;
  if(!redis.isConfigured())return false;
  if(roomSelection)return require('./telegram-deposit-room').handle({cb,user,message:m,api,run,token});
  const event=cb?'callback_'+cb.id:'message_'+m.message_id;
  const doneKey=PREFIX+'done:'+user.id+':'+event,preparedKey=doneKey+':support';
  const waitingKey=PREFIX+'waiting:'+user.id;
  const snapshot=await run([['GET',doneKey],['GET',preparedKey],['GET',waitingKey]]);
  if(snapshot[0]?.result)return true;
  const prepared=snapshot[1]?.result;
  const text=String(m.text||'').trim(),match=COMMAND.exec(text),explicit=clicked||command(update);
  const waitingRaw=snapshot[2]?.result||null;
  let waiting;try{waiting=JSON.parse(waitingRaw||'null');}catch{}
  if(!prepared){
    if((selection||paymentAction)&&(!waiting||waiting.expiresAt<Date.now()||waiting.promptMessageId!==m.message_id||(selection&&!waiting.options?.includes(Number(selection[1]))))){
      await api('answerCallbackQuery',{callback_query_id:cb.id,text:'Этот выбор устарел. Напишите /деп ещё раз.',show_alert:true});return true;
    }
    if(!explicit&&(!waiting||waiting.expiresAt<Date.now()))return false;
    if(!explicit&&m.reply_to_message&&m.reply_to_message.message_id!==waiting.promptMessageId)return false;
  }
  const cancel=paymentAction==='cancel'||(!cb&&/^(?:отмена|\/(?:отмена|cancel)(?:@Poker_dvatuza_bot)?)$/i.test(text));
  const value=selection?Number(selection[1]):explicit?amount(match?.[1]):amount(text);
  if(!prepared&&!explicit&&!cancel&&value===null){
    if(/^\//.test(text))return false;
    await run([['DEL',waitingKey]]);return false;
  }
  // Event retries remain serialized while the user's next reply is independent
  // of slow manager synchronization from their previous command.
  const lockKey=doneKey+':lock',lockValue=randomUUID(),userLock=PREFIX+'lock:'+user.id;
  const replySuffixes=['paid-reply','cancel-reply','minimum-reply','requisites-reply','choice-reply','prompt','payment-reply'];
  const [claim,...current]=await run([['SET',lockKey,lockValue,'NX','EX',60],['GET',doneKey],['GET',preparedKey],...replySuffixes.map(suffix=>['GET',doneKey+':'+suffix])]);
  const savedReplies=new Map(replySuffixes.map((suffix,index)=>[suffix,current[index+2]?.result||null]));
  if(claim.result!=='OK')throw Error('Deposit event busy');
  async function unlock(key){await run([['EVAL',"if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end; return 0",1,key,lockValue]]);}
  async function syncSupport(tasks){
    tasks=tasks.filter(task=>task.method!=='handle'&&!(task.method==='mirrorBotMessage'&&task.args[3]?.awaitingAmount));
    while(tasks.length){
      const task=tasks[0];
      const support=require('./telegram-support');
      if(task.method==='handle')await support.handle(task.args[0],token,task.args[1]);
      else await support[task.method](token,...task.args);
      tasks=tasks.slice(1);
      await run([['SET',preparedKey,JSON.stringify(tasks),'EX',7*86400]]);
    }
    await run([['SET',doneKey,'sent','EX',7*86400],['DEL',preparedKey]]);
    return true;
  }
  const supportTasks=[];let clearWaiting=false;
  async function replyOnce(suffix,body){
    const key=doneKey+':'+suffix,saved=savedReplies.get(suffix);
    if(saved)return JSON.parse(saved);
    const reply=await api('sendMessage',body);
    await run([['SET',key,JSON.stringify({message_id:reply.message_id}),'EX',7*86400]]);
    return reply;
  }
  try{
    if(current[0]?.result)return true;
    const retry=current[1]?.result;
    if(retry)return await syncSupport(JSON.parse(retry));
    const [userClaim,currentWaiting]=await run([['SET',userLock,lockValue,'NX','EX',60],...((!explicit||selection||paymentAction)?[['GET',waitingKey]]:[])]);
    if(userClaim.result!=='OK')throw Error('Deposit request busy');
    try{
      if((!explicit||selection||paymentAction)&&currentWaiting?.result!==waitingRaw)throw Error('Deposit prompt changed; retry update');
      if(clicked)await api('answerCallbackQuery',{callback_query_id:cb.id});
      let roomOptions;
      if(paymentAction==='paid'){
        const room=require('./telegram-deposit-room'),key=room.PREFIX+user.id+':'+m.message_id;
        const existing=await read(key);let saved;try{saved=JSON.parse(existing||'null');}catch{}
        roomOptions=saved?.options||room.choices(await require('./telegram-support-player').readPlayerIdentity(user));
        if(!saved)await run([['SET',key,JSON.stringify({options:roomOptions,expiresAt:Date.now()+86400000}),'EX',86400]]);
      }
      if(paymentAction)await api('editMessageText',{chat_id:m.chat.id,message_id:m.message_id,text:paymentAction==='paid'?'✅ Вы сообщили об оплате. Менеджер проверит поступление.\n\nИ выберите пока, куда пополнить:':cancel?'Запрос пополнения отменён.':'Выбрано пополнение на другую сумму.',reply_markup:paymentAction==='paid'?require('./telegram-deposit-room').keyboard(roomOptions):{inline_keyboard:[]}});
      if(paymentAction==='paid'){
        const receipt=await replyOnce('paid-reply',{chat_id:m.chat.id,text:'Пришлите чек об оплате.'});
        supportTasks.push({method:'clearAwaitingAmountNotice',args:[m.chat.id,{throughMessageId:m.message_id,cancelPayment:true}]});
        supportTasks.push({method:'mirrorBotMessage',args:[m.chat.id,receipt.message_id,user]});
        clearWaiting=true;
      }else if(cancel){
        await replyOnce('cancel-reply',{chat_id:m.chat.id,text:'Запрос пополнения отменён.'});
        supportTasks.push({method:'clearAwaitingAmountNotice',args:[m.chat.id,{throughMessageId:m.message_id,cancelPayment:true}]});
        clearWaiting=true;
      }
      else{
        // Persist manager work before releasing the user lock. A retry resumes
        // this journal without changing a newer prompt or resending the reply.
        if(value!==null||explicit)supportTasks.push({method:'clearAwaitingAmountNotice',args:[m.chat.id,{throughMessageId:m.message_id,cancelPayment:true}]});
        if(value===null){
          const promptKey=doneKey+':prompt';
          const savedPrompt=savedReplies.get('prompt');
          const prompt=savedPrompt?JSON.parse(savedPrompt):await api('sendMessage',{chat_id:m.chat.id,text:'На какую сумму хотите пополнить?\nНапишите сумму числом, например: 3000.\n\nОтмена — /отмена.',reply_markup:{force_reply:true}});
          if(!savedPrompt)await run([['SET',promptKey,JSON.stringify({message_id:prompt.message_id}),'EX',7*86400]]);
          await run([['SET',waitingKey,JSON.stringify({promptMessageId:prompt.message_id,expiresAt:Date.now()+15*60000}),'EX',900]]);
        }else if(value<100000){
          const prompt=await replyOnce('minimum-reply',{chat_id:m.chat.id,text:'Напишите сумму от 1000, например 3000',reply_markup:{force_reply:true,input_field_placeholder:'От 1000 ₽'}});
          await run([['SET',waitingKey,JSON.stringify({promptMessageId:prompt.message_id,expiresAt:Date.now()+15*60000}),'EX',900]]);
        }else if(value>=300000){
          const reply=await replyOnce('requisites-reply',{chat_id:m.chat.id,text:'Ожидайте, ищем реквизиты на '+(value/100).toLocaleString('ru-RU')+' ₽.\n\nЕсли решили изменить сумму, просто напишите какую.'});
          await run([['SET',waitingKey,JSON.stringify({promptMessageId:reply.message_id,expiresAt:Date.now()+15*60000}),'EX',900]]);
          supportTasks.push({method:'mirrorBotMessage',args:[m.chat.id,reply.message_id,user]});
        }else if(![100000,150000,200000].includes(value)){
          const amounts=[100000,150000,200000,300000];
          const options=[amounts.filter(n=>n<value).at(-1),amounts.find(n=>n>value)];
          const money=n=>(n/100).toLocaleString('ru-RU')+' ₽';
          const prompt=await replyOnce('choice-reply',{chat_id:m.chat.id,text:'Для суммы '+money(value)+' выберите ближайшую сумму ниже или выше:',reply_markup:{inline_keyboard:[options.map(n=>({text:money(n),callback_data:'club:player-deposit:amount:'+n}))]}});
          await run([['SET',waitingKey,JSON.stringify({promptMessageId:prompt.message_id,options,expiresAt:Date.now()+15*60000}),'EX',900]]);
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
          const replyKey=doneKey+':payment-reply',savedReply=savedReplies.get('payment-reply');
          const reply=savedReply?JSON.parse(savedReply):await api('sendMessage',{chat_id:m.chat.id,text:'💰 Пополнение игрового счёта: '+money(link.amount)+'\n🧾 Комиссия сервиса на мелкие переводы: '+money(link.chargeAmount-link.amount)+'\n💳 К оплате: '+money(link.chargeAmount)+'\n\n✨ Чтобы пополнять без комиссии, пополняйте от 3000 и выше.\n\n📝 После оплаты напишите ваш ID и ID клуба.\n\n💳 Для оплаты нажмите «Оплатить».\n🔄 Чтобы изменить сумму, нажмите «Взять другую сумму».\n❌ Чтобы отказаться от пополнения, нажмите «Отказаться».',entities:[{type:'bold',offset:('💰 Пополнение игрового счёта: '+money(link.amount)+'\n🧾 Комиссия сервиса на мелкие переводы: '+money(link.chargeAmount-link.amount)+'\n💳 К оплате: '+money(link.chargeAmount)+'\n\n').length,length:'✨ Чтобы пополнять без комиссии, пополняйте от 3000 и выше.'.length}],reply_markup:{inline_keyboard:[[{text:'💳 Оплатить '+money(link.chargeAmount),style:'success',url:link.url}],[{text:'Взять другую сумму',callback_data:'club:player-deposit:restart'}],[{text:'✅ Оплатил',style:'success',callback_data:'club:player-deposit:paid'},{text:'❌ Отказаться',callback_data:'club:player-deposit:cancel'}]]}});
          if(!savedReply)await run([['SET',replyKey,JSON.stringify({message_id:reply.message_id}),'EX',7*86400]]);
          supportTasks.push({method:'mirrorBotMessage',args:[m.chat.id,reply.message_id,user,{paymentLink:{providerId:link.providerId,amount:link.amount,chargeAmount:link.chargeAmount}}]});
          await run([['SET',waitingKey,JSON.stringify({promptMessageId:reply.message_id,expiresAt:Date.now()+15*60000}),'EX',900]]);
        }
      }
      await run([['SET',preparedKey,JSON.stringify(supportTasks),'EX',7*86400],...(clearWaiting?[['DEL',waitingKey]]:[]),...(explicit?[['DEL','poker21:table-subscriptions:club:pending:'+user.id]]:[])]);
    }finally{await unlock(userLock);}
    return await syncSupport(supportTasks);
  }finally{await unlock(lockKey);}
}
module.exports={handle,command,amount};
