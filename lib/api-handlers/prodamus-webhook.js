'use strict';
const {createHmac,timingSafeEqual}=require('node:crypto');
const redis=require('../redis');
const {prodamusDisplayAmount}=require('../deposit-payment-forms');
const {STORE_KEY}=require('../telegram-deposit-withdrawals');

const CAS="if (redis.call('GET',KEYS[1]) or '')~=ARGV[1] then return 0 end; redis.call('SET',KEYS[1],ARGV[2]); return 1";

function canonical(value) {
  if (value && typeof value==='object') {
    const keys=Object.keys(value);
    if(keys.length&&keys.every((key,index)=>key===String(index))) return '['+keys.map(key=>canonical(value[key])).join(',')+']';
    return '{'+keys.sort().map(key=>canonical(key)+':'+canonical(value[key])).join(',')+'}';
  }
  return JSON.stringify(String(value)).replaceAll('/','\\/');
}

async function readPayload(req) {
  const chunks=[];
  let size=0;
  if (typeof req.body==='string' || Buffer.isBuffer(req.body)) chunks.push(Buffer.from(req.body));
  else for await (const chunk of req) {
    size+=chunk.length;
    if(size>65536) throw Error('Payload too large');
    chunks.push(chunk);
  }
  const body=Buffer.concat(chunks.map(chunk=>Buffer.from(chunk)));
  if(body.length>65536) throw Error('Payload too large');
  const contentType=req.headers['content-type']||'';
  const fields=await new Response(body,{headers:{'Content-Type':contentType}}).formData();
  const payload=Object.create(null);
  for(const [field,value] of fields){
    if(typeof value!=='string'||!/^[a-zA-Z0-9_]+(?:\[[a-zA-Z0-9_]+\]){0,8}$/.test(field)) throw Error('Invalid field');
    const path=field.match(/[a-zA-Z0-9_]+/g);
    let parent=payload;
    for(const [index,key] of path.entries()){
      if(index===path.length-1){
        if(Object.hasOwn(parent,key)) throw Error('Duplicate field');
        parent[key]=value;
      }else{
        parent[key]??=Object.create(null);
        if(typeof parent[key]!=='object') throw Error('Conflicting fields');
        parent=parent[key];
      }
    }
  }
  return payload;
}

async function savePayment(payment) {
  for(let attempt=0;attempt<8;attempt++){
    const [row]=await redis.pipeline([['GET',STORE_KEY]],{throwOnError:true});
    const raw=row.result||'';
    const state=raw?JSON.parse(raw):{revision:0,entries:[],requests:[]};
    const payments=state.paymentFormPayments||=[];
    if(payments.some(old=>old.providerId===payment.providerId&&old.id===payment.id)) return false;
    require('../deposit-unique-links').matchPayment(state,payment,payment.orderReference);
    payments.push(payment);
    state.revision=(state.revision||0)+1;
    const [saved]=await redis.pipeline([['EVAL',CAS,1,STORE_KEY,raw,JSON.stringify(state)]],{throwOnError:true});
    if(Number(saved.result)===1) return true;
  }
  throw Error('Concurrent ledger update');
}

async function notifyGroup(payment) {
  const chatId=process.env.PRODAMUS_WITHDRAWALS_CHAT_ID||'';
  const token=process.env.TELEGRAM_BOT_TOKEN||process.env.TELEGRAM_TOKEN||process.env.BOT_TOKEN;
  if(!/^-\d+$/.test(chatId)||!token) return;
  const amount=new Intl.NumberFormat('ru-RU',{style:'currency',currency:'RUB',minimumFractionDigits:0,maximumFractionDigits:2}).format(prodamusDisplayAmount(payment.amount)/100);
  const response=await fetch('https://api.telegram.org/bot'+token+'/sendMessage',{
    method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(4000),
    body:JSON.stringify({chat_id:chatId,parse_mode:'HTML',text:'💳 <b>Продамус</b> - '+amount+'\n№'+payment.id})
  });
  if(!response.ok) throw Error('Telegram delivery failed');
}

module.exports=async function(req,res){
  if(req.method!=='POST') return res.status(405).end();
  const secret=process.env.PRODAMUS_WEBHOOK_SECRET;
  if(!secret||!redis.isConfigured()) return res.status(503).end();
  const signature=req.headers.sign;
  if(typeof signature!=='string'||!/^[0-9a-f]{64}$/i.test(signature)) return res.status(403).end();

  let payload;
  try{payload=await readPayload(req);}catch{return res.status(400).end();}
  const signed=canonical(payload);
  const supplied=Buffer.from(signature,'hex');
  const valid=[signed,signed.replace(/[\u0080-\uffff]/g,char=>'\\u'+char.charCodeAt(0).toString(16).padStart(4,'0'))]
    .some(json=>timingSafeEqual(createHmac('sha256',secret).update(json).digest(),supplied));
  if(!valid||payload.domain!=='matro.payform.ru') return res.status(403).end();
  if(payload.payment_status!=='success') return res.status(200).send('success');
  const id=payload.order_id;
  const confirmedAt=Date.parse(payload.date);
  if(typeof id!=='string'||!/^\d{1,64}$/.test(id)||!Number.isFinite(confirmedAt)||
    typeof payload.sum!=='string'||!/^\d{1,9}(?:\.\d{1,2})?$/.test(payload.sum)) return res.status(400).end();
  const amount=Math.round(Number(payload.sum)*100);
  if(amount<=0||amount>10000000000) return res.status(400).end();

  const payment={id,providerId:'prodamus',status:'confirmed',amount,confirmedAt,receivedAt:Date.now()};
  if(typeof payload.order_num==='string'&&/^[a-zA-Z0-9_-]{1,100}$/.test(payload.order_num))payment.orderReference=payload.order_num;
  let inserted;
  try{inserted=await savePayment(payment);}catch{return res.status(503).end();}
  try{await require('../payment-income-topic').notify(payment);}catch{console.error('Income topic notification pending retry');}
  if(inserted) try{await notifyGroup(payment);}catch{console.error('Prodamus notification delivery failed');}
  return res.status(200).send('success');
};
