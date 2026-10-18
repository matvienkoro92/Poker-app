'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {paymentForms}=require('../lib/deposit-payment-forms');
test('payment-form day changes at 06:00 Novosibirsk, independent of host timezone',()=>{
 const before=paymentForms(Date.parse('2026-10-18T05:59:59.999+07:00'));
 const after=paymentForms(Date.parse('2026-10-18T06:00:00+07:00'));
 assert.equal(before.period.start,Date.parse('2026-10-17T06:00:00+07:00'));
 assert.equal(before.period.end,after.period.start);assert.equal(after.period.end,Date.parse('2026-10-19T06:00:00+07:00'));
 assert.equal(after.providers[0].total,null);
});
test('only confirmed payments inside the half-open period count; unavailable is distinct from zero',()=>{
 const now=Date.parse('2026-10-18T12:00:00+07:00'),period=paymentForms(now).period;
 const rows=[{providerId:'prodamus',status:'confirmed',amount:100000,confirmedAt:period.start},{providerId:'prodamus',status:'confirmed',amount:200000,confirmedAt:period.end-1},{providerId:'prodamus',status:'confirmed',amount:300000,confirmedAt:period.start-1},{providerId:'prodamus',status:'confirmed',amount:400000,confirmedAt:period.end},{providerId:'prodamus',status:'pending',amount:500000,confirmedAt:now}];
 assert.equal(paymentForms(now,rows).providers[0].total,300000);
 assert.equal(paymentForms(now,[]).providers[0].total,0);
 assert.deepEqual(paymentForms(now).providers[0].options,[{amount:100000,url:'https://payform.ru/4jah7zO/'},{amount:200000,url:'https://payform.ru/8tah7Dv/'}]);
});
test('manual channel totals reset at 06:00, exclude cancellations, and separate incoming from outgoing',()=>{
 const now=Date.parse('2026-10-18T06:00:00+07:00'),period=paymentForms(now).period;
 const operations=[{channelId:'runex',direction:'income',amount:100000,createdAt:period.start},{channelId:'runex',direction:'outgoing',amount:30000,createdAt:period.start},{channelId:'runex',direction:'income',amount:500000,createdAt:period.start-1},{channelId:'runex',direction:'income',amount:600000,createdAt:period.start,voidedAt:now}];
 const rows=paymentForms(now,undefined,operations).providers;
 assert.equal(rows.find(p=>p.id==='runex').total,100000);assert.equal(rows.find(p=>p.id==='runex').outgoing,30000);assert.equal(rows.find(p=>p.id==='prodamus').total,null);
 assert.deepEqual(rows.filter(p=>p.manual).map(p=>p.name),['Рунекс','Эксчип','Р Крипта','Другое','Перевод','Бонусы']);
});
