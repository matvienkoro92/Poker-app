'use strict';
const parser = require('../app-admin-deposits-parser');
function fail(message, status = 400) { const e = new Error(message); e.status = status; throw e; }
function text(value, max = 180) { return String(value || '').trim().slice(0, max); }
function amount(value) { if (!Number.isSafeInteger(value) || value <= 0 || value > 10000000000) fail('Укажите корректную сумму'); return value; }
function summary(entry) {
  const paid = entry.payments.filter(p => !p.voidedAt).reduce((sum, p) => sum + p.amount, 0);
  const returned = (entry.returns || []).filter(r=>!r.voidedAt).reduce((sum,r)=>sum+r.amount,0);
  const reserved = (entry.reservations || []).filter(r => !r.confirmedAt && !r.releasedAt).reduce((sum,r)=>sum+r.amount,0);
  return {...entry, reservations:entry.reservations || [], returns:entry.returns || [], paid, returned, reserved, remaining:entry.total - paid - returned, available:entry.total - paid - returned - reserved};
}
function applyOperation(input, body, actor, now = Date.now(), actorName = 'Администратор') {
  const state = JSON.parse(JSON.stringify(input || {revision:0, entries:[], requests:[]}));
  const requestId = text(body.requestId, 100);
  if (!/^[a-zA-Z0-9_-]{16,100}$/.test(requestId)) fail('Не удалось определить операцию. Обновите страницу.');
  const fingerprint = JSON.stringify({...body, accessToken:undefined});
  const previous = state.requests.find(r => r.id === requestId);
  if (previous) {
    if (previous.actor !== actor || previous.fingerprint !== fingerprint) fail('Номер операции уже использован', 409);
    return {state, duplicate:true};
  }
  if (state.requests.length >= 20000) fail('Журнал заполнен. Обратитесь к владельцу.', 409);
  let entry = state.entries.find(e => e.id === body.entryId);
  if (body.action === 'create') {
    if (state.entries.length >= 2000) fail('Достигнут лимит реквизитов', 409);
    const data = body.entry || {};
    const room=text(data.room,10),playerId=text(data.playerId,64);
    if(!['P21','X','Supr','PP'].includes(room)) fail('Выберите рум');
    if(!/^[a-zA-Z0-9_-]{1,64}$/.test(playerId)) fail('Укажите корректный ID игрока в руме');
    const card = text(data.card, 32).replace(/[ -]/g, '');
    const phone = text(data.phone, 32).replace(/[ ()-]/g, '').replace(/^8(?=\d{10}$)/, '+7');
    if (card && !/^\d{16,19}$/.test(card)) fail('Проверьте номер карты');
    if (phone && !/^(?:\+7|8)\d{10}$/.test(phone)) fail('Проверьте номер телефона');
    const paymentLink = parser.safeLink(data.paymentLink);
    if (data.paymentLink && !paymentLink) fail('Ссылка должна начинаться с https://');
    if (!card && !phone && !paymentLink) fail('Укажите карту, телефон или ссылку на платёжку');
    if (!text(data.recipient)) fail('Укажите получателя');
    if (!text(data.bank) && !paymentLink) fail('Укажите банк');
    if (state.entries.some(e => !e.archived && summary(e).remaining > 0 && e.card === card && e.phone === phone && e.paymentLink === paymentLink && e.recipient.toLowerCase() === text(data.recipient).toLowerCase())) fail('Такой активный реквизит уже есть. Используйте его карточку.', 409);
    entry = {id:requestId, room, playerId, card, phone, paymentLink, bank:text(data.bank), recipient:text(data.recipient),
      note:text(data.note, 500), rawText:text(data.rawText, 5000), total:amount(data.total), createdAt:now, createdBy:actor, createdByName:text(actorName), archived:false, payments:[], changes:[]};
    state.entries.unshift(entry);
  } else {
    if (!entry) fail('Реквизит не найден', 404);
    if (body.action === 'return') {
      if(entry.archived) fail('Реквизит в архиве',409);
      const value=amount(body.amount);
      if(value>summary(entry).available) fail('Сумма возврата больше доступного остатка. Сначала освободите нужный резерв.',409);
      entry.returns ||= [];
      if(entry.returns.length>=1000) fail('Достигнут лимит возвратов',409);
      entry.returns.push({id:requestId,amount:value,note:text(body.note,300),createdAt:now,createdBy:actor,createdByName:text(actorName)});
    } else if(body.action==='void-return') {
      const returned=(entry.returns||[]).find(r=>r.id===body.returnId);
      if(!returned||returned.voidedAt) fail('Возврат уже отменён или не найден',409);
      returned.voidedAt=now;returned.voidedBy=actor;returned.voidedByName=text(actorName);entry.archived=false;
    } else if (body.action === 'reserve') {
      if (entry.archived) fail('Реквизит в архиве',409);
      const value=amount(body.amount);
      if(value>summary(entry).available) fail('Сумма больше доступного остатка: часть средств уже зарезервирована.',409);
      entry.reservations ||= [];
      if(entry.reservations.length>=1000) fail('Достигнут лимит резервов',409);
      entry.reservations.push({id:requestId,amount:value,note:text(body.note,300),createdAt:now,createdBy:actor,createdByName:text(actorName)});
    } else if (body.action === 'confirm-reservation' || body.action === 'release-reservation') {
      const reservation=(entry.reservations||[]).find(r=>r.id===body.reservationId);
      if(!reservation || reservation.confirmedAt || reservation.releasedAt) fail('Резерв уже обработан или не найден',409);
      if(body.action==='confirm-reservation') {
        if(entry.payments.length>=1000) fail('Достигнут лимит операций по реквизиту',409);
        reservation.confirmedAt=now;reservation.confirmedBy=actor;reservation.confirmedByName=text(actorName);
        entry.payments.push({id:requestId,reservationId:reservation.id,amount:reservation.amount,note:reservation.note,createdAt:now,createdBy:actor,createdByName:text(actorName)});
      } else {reservation.releasedAt=now;reservation.releasedBy=actor;reservation.releasedByName=text(actorName);}
    } else if (body.action === 'payment') {
      if (entry.archived) fail('Реквизит в архиве', 409);
      const value = amount(body.amount);
      if (value > summary(entry).available) fail('Сумма больше текущего остатка. Обновите карточку.', 409);
      if (entry.payments.length >= 1000) fail('Достигнут лимит операций по реквизиту', 409);
      entry.payments.push({id:requestId, amount:value, note:text(body.note, 300), createdAt:now, createdBy:actor, createdByName:text(actorName)});
    } else if (body.action === 'void') {
      const payment = entry.payments.find(p => p.id === body.paymentId);
      if (!payment || payment.voidedAt) fail('Операция уже отменена или не найдена', 409);
      payment.voidedAt = now; payment.voidedBy = actor; payment.voidedByName = text(actorName); entry.archived = false;
    } else if (body.action === 'adjust') {
      if (entry.archived) fail('Сначала верните реквизит из архива отменой операции', 409);
      const total = amount(body.total);
      if (total < summary(entry).paid + summary(entry).reserved + summary(entry).returned) fail('Общая сумма меньше проведённых депозитов, возвратов и замороженных резервов', 409);
      const reason = text(body.reason, 300);
      if (!reason) fail('Укажите причину изменения суммы');
      entry.changes.push({id:requestId, before:entry.total, after:total, reason, createdAt:now, createdBy:actor, createdByName:text(actorName)}); entry.total = total;
    } else if (body.action === 'archive') {
      if (summary(entry).remaining !== 0) fail('В архив можно убрать только полностью закрытый реквизит', 409);
      entry.archived = true;
    } else fail('Неизвестная операция');
  }
  state.revision += 1;
  state.requests.push({id:requestId, actor, fingerprint});
  return {state, duplicate:false};
}
function destinations(deposits){return [{id:'withdrawals',title:'На выводы',amount:deposits},{id:'payment-links',title:'В платёжки',amount:null},{id:'exchip',title:'Эксчип бот',amount:null},{id:'runex',title:'Рунекс',amount:null},{id:'all-friends',title:'Ол френдс',amount:null}];}
function view(state) {
  const entries = (state.entries || []).map(summary);
  const active = entries.filter(e => !e.archived);
  const deposits=entries.reduce((s,e)=>s+e.paid,0);
  const managers=new Map();
  function manager(actor,name){const id=String(actor||'unknown');if(!managers.has(id))managers.set(id,{id,name:name||'Менеджер не указан',deposits:0,returned:0,reserved:0});const row=managers.get(id);if(name)row.name=name;return row;}
  for(const e of entries){
    for(const p of e.payments){if(p.voidedAt)continue;const reservation=p.reservationId&&e.reservations.find(r=>r.id===p.reservationId);manager(reservation?reservation.createdBy:p.createdBy,reservation?reservation.createdByName:p.createdByName).deposits+=p.amount;}
    for(const r of e.returns){if(!r.voidedAt)manager(r.createdBy,r.createdByName).returned+=r.amount;}
    for(const r of e.reservations){if(!r.confirmedAt&&!r.releasedAt)manager(r.createdBy,r.createdByName).reserved+=r.amount;}
  }
  const statistics={deposits,returned:entries.reduce((s,e)=>s+e.returned,0),destinations:destinations(deposits),managers:[...managers.values()].sort((a,b)=>b.deposits-a.deposits||a.name.localeCompare(b.name,'ru')||a.id.localeCompare(b.id)).map(m=>({...m,destinations:destinations(m.deposits)}))};
  return {revision:state.revision || 0, entries, statistics, totals:{total:active.reduce((s,e)=>s+e.total,0), paid:active.reduce((s,e)=>s+e.paid,0), remaining:active.reduce((s,e)=>s+e.remaining,0), reserved:active.reduce((s,e)=>s+e.reserved,0), available:active.reduce((s,e)=>s+e.available,0)}};
}
module.exports = {applyOperation, summary, view};
