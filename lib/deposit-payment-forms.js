'use strict';
const DAY=86400000,HOUR=3600000;
const providers=[{id:'prodamus',name:'Продамус',options:[{amount:100000,url:'https://payform.ru/4jah7zO/'},{amount:200000,url:'https://payform.ru/8tah7Dv/'}]}];
function paymentForms(now=Date.now(),confirmedPayments){
  // Novosibirsk UTC+7: the operational day starts at 06:00, or 23:00 UTC.
  const start=Math.floor((now+HOUR)/DAY)*DAY-HOUR,end=start+DAY;
  return {period:{start,end,timeZone:'Asia/Novosibirsk'},providers:providers.map(provider=>({...provider,total:Array.isArray(confirmedPayments)?confirmedPayments.filter(p=>p.providerId===provider.id&&p.status==='confirmed'&&Number.isSafeInteger(p.amount)&&p.amount>0&&p.confirmedAt>=start&&p.confirmedAt<end).reduce((sum,p)=>sum+p.amount,0):null}))};
}
module.exports={paymentForms};
