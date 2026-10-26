'use strict';
const DAY=86400000,CUTOFF_UTC_MS=3*3600000;
const providers=[{id:'prodamus',name:'Продамус',options:[{amount:100000,url:'https://payform.ru/4jah7zO/'},{amount:200000,url:'https://payform.ru/8tah7Dv/'}]}];
const channels=[{id:'prodamus',name:'Продамус'},{id:'runex',name:'Рунекс'},{id:'exchip',name:'Эксчип'},{id:'r-crypto',name:'Роман Крипта'},{id:'other',name:'Другое'},{id:'transfer',name:'Перевод'},{id:'bonuses',name:'Бонусы'}];
function paymentForms(now=Date.now(),confirmedPayments,operations=[],period){
  // Moscow UTC+3: the operational day starts at 06:00, or 03:00 UTC.
  const start=period&&Number.isFinite(period.start)?period.start:Math.floor((now-CUTOFF_UTC_MS)/DAY)*DAY+CUTOFF_UTC_MS,end=period&&Number.isFinite(period.end)?period.end:start+DAY;
  const channelRows=channels.filter(c=>!providers.some(p=>p.id===c.id)).map(c=>{const rows=operations.filter(r=>r.channelId===c.id&&!r.voidedAt&&r.createdAt>=start&&r.createdAt<end);return {...c,options:[],manual:true,total:rows.filter(r=>r.direction==='income'||c.id==='bonuses').reduce((s,r)=>s+(r.direction==='outgoing'?-r.amount:r.amount),0),outgoing:rows.filter(r=>r.direction==='outgoing').reduce((s,r)=>s+r.amount,0)};});
  return {period:{start,end,timeZone:'Europe/Moscow'},providers:providers.map(provider=>{const manual=operations.filter(r=>r.channelId===provider.id&&r.direction==='income'&&!r.voidedAt&&r.createdAt>=start&&r.createdAt<end);const confirmed=Array.isArray(confirmedPayments)?confirmedPayments.filter(p=>p.providerId===provider.id&&p.status==='confirmed'&&Number.isSafeInteger(p.amount)&&p.amount>0&&p.confirmedAt>=start&&p.confirmedAt<end):[];return {...provider,manualEntry:true,outgoing:0,total:Array.isArray(confirmedPayments)||manual.length?confirmed.reduce((s,r)=>s+r.amount,0)+manual.reduce((s,r)=>s+r.amount,0):null};}).concat(channelRows)};
}
module.exports={paymentForms,channels};
