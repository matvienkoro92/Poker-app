'use strict';
const DAY=86400000,HOUR=3600000;
const providers=[{id:'prodamus',name:'Продамус',options:[{amount:100000,url:'https://payform.ru/4jah7zO/'},{amount:200000,url:'https://payform.ru/8tah7Dv/'}]}];
const channels=[{id:'prodamus',name:'Продамус'},{id:'runex',name:'Рунекс'},{id:'exchip',name:'Эксчип'},{id:'r-crypto',name:'Р Крипта'},{id:'other',name:'Другое'},{id:'transfer',name:'Перевод'}];
function paymentForms(now=Date.now(),confirmedPayments,operations=[]){
  // Novosibirsk UTC+7: the operational day starts at 06:00, or 23:00 UTC.
  const start=Math.floor((now+HOUR)/DAY)*DAY-HOUR,end=start+DAY;
  const channelRows=channels.filter(c=>!providers.some(p=>p.id===c.id)).map(c=>{const rows=operations.filter(r=>r.channelId===c.id&&!r.voidedAt&&r.createdAt>=start&&r.createdAt<end);return {...c,options:[],manual:true,total:rows.filter(r=>r.direction==='income').reduce((s,r)=>s+r.amount,0),outgoing:rows.filter(r=>r.direction==='outgoing').reduce((s,r)=>s+r.amount,0)};});
  return {period:{start,end,timeZone:'Asia/Novosibirsk'},providers:providers.map(provider=>{const manual=operations.filter(r=>r.channelId===provider.id&&r.direction==='income'&&!r.voidedAt&&r.createdAt>=start&&r.createdAt<end);const confirmed=Array.isArray(confirmedPayments)?confirmedPayments.filter(p=>p.providerId===provider.id&&p.status==='confirmed'&&Number.isSafeInteger(p.amount)&&p.amount>0&&p.confirmedAt>=start&&p.confirmedAt<end):[];return {...provider,manualEntry:true,outgoing:0,total:Array.isArray(confirmedPayments)||manual.length?confirmed.reduce((s,r)=>s+r.amount,0)+manual.reduce((s,r)=>s+r.amount,0):null};}).concat(channelRows)};
}
module.exports={paymentForms,channels};
