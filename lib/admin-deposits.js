'use strict';
const parser = require('../app-admin-deposits-parser');
const {paymentForms,channels}=require('./deposit-payment-forms');
function fail(message, status = 400) { const e = new Error(message); e.status = status; throw e; }
function text(value, max = 180) { return String(value || '').trim().slice(0, max); }
function managerName(actor,fallback){const id=String(actor||'').trim().replace(/^tg_/,'');return ({'2144406710':'Аня','1897001087':'Вика'})[id]||fallback;}
function amount(value) { if (!Number.isSafeInteger(value) || value <= 0 || value > 10000000000) fail('Укажите корректную сумму'); return value; }
function paymentAllocations(rows,total){
 if(!Array.isArray(rows)||rows.length<2||rows.length>20)fail('Укажите от 2 до 20 частей оплаты');
 const result=rows.map(row=>{if(!row||typeof row!=='object')fail('Проверьте части оплаты');const depositorId=text(row.depositorId,65),depositorRoom=text(row.depositorRoom,10);if(!['P21','X','Supr','PP'].includes(depositorRoom))fail('Выберите рум для каждой части');if(!/^[a-zA-Z0-9_-]{1,64}$/.test(depositorId))fail('Укажите ID для каждой части');return {depositorId,depositorRoom,amount:amount(row.amount)};});
 if(result.reduce((s,r)=>s+r.amount,0)!==total)fail('Сумма частей должна совпадать с суммой оплаты');return result;
}
function summary(entry) {
  const paid = entry.payments.filter(p => !p.voidedAt).reduce((sum, p) => sum + p.amount, 0);
  const returned = (entry.returns || []).filter(r=>!r.voidedAt).reduce((sum,r)=>sum+r.amount,0);
  const reserved = (entry.reservations || []).filter(r => !r.confirmedAt && !r.releasedAt).reduce((sum,r)=>sum+r.amount,0);
  return {...entry, reservations:entry.reservations || [], returns:entry.returns || [], paid, returned, reserved, remaining:entry.total - paid - returned, available:entry.total - paid - returned - reserved};
}
function applyOperation(input, body, actor, now = Date.now(), actorName = 'Администратор', permissions = {}) {
  actorName=managerName(actor,actorName);
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
  if(body.action==='save-player-account'){
    const room=text(body.room,10),playerId=text(body.playerId,65),nick=text(body.nick),directory=require('./deposit-player-directory').depositPlayerDirectory(state);
    if(!['P21','X','Supr','PP'].includes(room)||!/^[a-zA-Z0-9_-]{1,64}$/.test(playerId))fail('Выберите рум и укажите ID игрока');
    const key=room+'|'+playerId,requestedKey=require('./deposit-player-directory').profileKeyForRoom(text(body.profileKey,80)||key),profileKey=(directory.find(p=>p.room+'|'+p.playerId===requestedKey)||{}).profileKey||requestedKey;
    const base=directory.find(p=>p.room+'|'+p.playerId===profileKey);
    if(!base&&profileKey!==key)fail('Выберите игрока из поиска');
    if(!base&&!nick)fail('Укажите ник игрока');
    if(base&&base.profileKey!==profileKey)fail('Данные игрока изменились. Выберите его заново.',409);
    state.playerAccounts ||= [];
    const existing=state.playerAccounts.find(p=>p.room===room&&p.playerId===playerId);
    if(existing&&((directory.find(p=>p.room+'|'+p.playerId===require('./deposit-player-directory').profileKeyForRoom(existing.profileKey))||{}).profileKey||require('./deposit-player-directory').profileKeyForRoom(existing.profileKey))!==profileKey)fail('Этот ID уже сохранён за другим игроком',409);
    const target=directory.find(p=>p.room===room&&p.playerId===playerId);
    if(target&&target.profileKey!==profileKey){const isolated=target.profileKey===key&&directory.filter(p=>p.profileKey===target.profileKey).length===1&&!existing;if(!isolated||body.confirmSamePlayer!==true)fail('Этот ID известен под другим ником. Подтвердите, что аккаунты принадлежат одному игроку.',409);}
    if(!existing){if(state.playerAccounts.length>=5000)fail('Достигнут лимит сохранённых аккаунтов',409);state.playerAccounts.push({profileKey,room,playerId,...(target&&target.profileKey!==profileKey?{previousNick:target.nick,confirmedSamePlayer:true}:{}),nick:base&&(base.nick||base.name)||nick,createdAt:now,createdBy:actor,createdByName:text(actorName)});}
  }else if(body.action==='edit-channel-operation'){
    if(!permissions.canDelete)fail('Редактирование доступно только главному администратору',403);
    const row=(state.channelOperations||[]).find(r=>r.id===body.operationId);
    if(!row||row.voidedAt||row.transferId)fail('Эту операцию нельзя изменить',409);
    if(body.editVersion!==(row.edits||[]).length)fail('Операция уже изменена. Обновите журнал.',409);
    const value=amount(body.amount),allocations=body.allocations===undefined?null:paymentAllocations(body.allocations,value);
    if(allocations&&row.channelId==='bonuses')fail('Для бонусов укажите одно начисление игроку');
    if(allocations&&row.direction!=='income')fail('Дробление доступно только для прихода');
    const playerId=allocations?'':text(body.playerId,65);
    if(!allocations&&(!['P21','X','Supr','PP'].includes(body.room)||!/^[a-zA-Z0-9_-]{1,64}$/.test(playerId)))fail('Выберите рум и укажите ID игрока');
    row.edits ||= [];row.edits.push({at:now,by:actor,byName:text(actorName),before:{amount:row.amount,room:row.room,playerId:row.playerId,note:row.note,allocations:row.allocations||null}});
    Object.assign(row,{amount:value,room:allocations?'':body.room,playerId,note:text(body.note,300)});
    if(allocations)row.allocations=allocations;else delete row.allocations;
  }else if(body.action==='transfer'){
    const sides=['from','to'].map(side=>{const room=body[side+'Room'],playerId=text(body[side+'PlayerId'],65);if(!['P21','X','Supr','PP'].includes(room))fail('Выберите рум с обеих сторон');if(!/^[a-zA-Z0-9_-]{1,64}$/.test(playerId))fail('Укажите ID с обеих сторон');return {room,playerId};});
    if(sides[0].room===sides[1].room)fail('Выберите разные румы для перевода');
    const directory=require('./deposit-player-directory').depositPlayerDirectory(state),profileKey=text(body.profileKey,80);
    const accounts=sides.map(side=>directory.find(p=>p.room===side.room&&p.playerId===side.playerId));
    if(!profileKey||accounts.some(p=>!p||p.profileKey!==profileKey))fail('Перевод доступен только между сохранёнными аккаунтами одного игрока. Сначала сохраните его ID в обоих румах.');
    const playerName=accounts[0].nick||accounts[0].name||text(body.playerName);

    const value=amount(body.amount);state.channelOperations ||= [];if(state.channelOperations.length>9998)fail('Достигнут лимит операций',409);
    sides.forEach((side,n)=>state.channelOperations.push({...side,id:requestId+'_'+n,transferId:requestId,profileKey,playerName,channelId:'transfer',direction:n?'income':'outgoing',amount:value,note:text(body.note,300),createdAt:now,createdBy:actor,createdByName:text(actorName)}));
  }else if(body.action==='channel-operation'){
    if(body.channelId==='bonuses'&&(body.direction!=='income'||body.allocations!==undefined))fail('Для бонусов укажите одно начисление игроку');
    if(body.channelId==='transfer')fail('Используйте форму перевода');
    if(body.channelId==='prodamus'&&body.direction!=='income')fail('Для Продамуса доступен только приход');
    if(!channels.some(c=>c.id===body.channelId))fail('Выберите направление');
    if(!['income','outgoing'].includes(body.direction))fail('Выберите приход или вывод');
    const value=amount(body.amount);
    const allocations=body.allocations===undefined?null:paymentAllocations(body.allocations,value);
    if(allocations&&body.direction!=='income')fail('Дробление доступно только для прихода');
    if(!allocations&&!['P21','X','Supr','PP'].includes(body.room))fail('Выберите рум');
    const playerId=allocations?'':text(body.playerId,65);if(!allocations&&!/^[a-zA-Z0-9_-]{1,64}$/.test(playerId))fail('Укажите ID игрока');
    state.channelOperations ||= [];if(state.channelOperations.length>=10000)fail('Достигнут лимит операций',409);
    state.channelOperations.push({id:requestId,channelId:body.channelId,direction:body.direction,room:allocations?'':body.room,playerId,amount:value,...(allocations?{allocations}:{}),note:text(body.note,300),createdAt:now,createdBy:actor,createdByName:text(actorName)});
  }else if(body.action==='void-channel-operation'){
    const operation=(state.channelOperations||[]).find(r=>r.id===body.operationId);
    if(!operation||operation.voidedAt)fail('Операция уже отменена или не найдена',409);
    for(const row of state.channelOperations){if(row.id===operation.id||(operation.transferId&&row.transferId===operation.transferId)){row.voidedAt=now;row.voidedBy=actor;row.voidedByName=text(actorName);}}
  }else if (body.action === 'create') {
    if (state.entries.length >= 2000) fail('Достигнут лимит реквизитов', 409);
    const data = body.entry || {};
    const room=text(data.room,10),playerId=text(data.playerId,64);
    if(!['P21','X','Supr','PP'].includes(room)) fail('Выберите рум');
    if(!/^[a-zA-Z0-9_-]{1,64}$/.test(playerId)) fail('Укажите корректный ID игрока в руме');
    const paymentType=data.paymentType==='usdt'?'usdt':'bank',wallet=text(data.wallet,100),network=text(data.network,20).toUpperCase();
    if(paymentType==='usdt'&&(!/^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(wallet)||network!=='TRC20')) fail('Проверьте USDT-кошелёк и сеть TRC20');
    const card = text(data.card, 32).replace(/[ -]/g, '');
    const phone = text(data.phone, 32).replace(/[ ()-]/g, '').replace(/^8(?=\d{10}$)/, '+7');
    if (card && !/^\d{16,19}$/.test(card)) fail('Проверьте номер карты');
    if (phone && !/^(?:\+7|8)\d{10}$/.test(phone)) fail('Проверьте номер телефона');
    const paymentLink = parser.safeLink(data.paymentLink);
    if (data.paymentLink && !paymentLink) fail('Ссылка должна начинаться с https://');
    if (paymentType!=='usdt'&&!card && !phone && !paymentLink) fail('Укажите карту, телефон или ссылку на платёжку');
    if (paymentType!=='usdt'&&!text(data.bank) && !paymentLink) fail('Укажите банк');
    const recipient=text(data.recipient)||(paymentType==='usdt'?'ID '+playerId:'');
    if (state.entries.some(e => !e.deletedAt && !e.archived && summary(e).remaining > 0 && (e.paymentType||'bank')===paymentType && (e.wallet||'')===wallet && e.card === card && e.phone === phone && e.paymentLink === paymentLink && e.recipient.toLowerCase() === recipient.toLowerCase())) fail('Такой активный реквизит уже есть. Используйте его карточку.', 409);
    entry = {id:requestId, room, playerId, paymentType,wallet,network,card, phone, paymentLink, bank:paymentType==='usdt'?'USDT':text(data.bank), recipient,
      note:text(data.note, 500), rawText:text(data.rawText, 5000), total:amount(data.total), createdAt:now, createdBy:actor, createdByName:text(actorName), archived:false, payments:[], changes:[]};
    state.entries.unshift(entry);
  } else {
    if (!entry) fail('Реквизит не найден', 404);
    if(entry.deletedAt) fail('Вывод удалён',409);
    if(body.action==='delete'){if(!permissions.canDelete)fail('Удаление доступно только главному администратору',403);entry.deletedAt=now;entry.deletedBy=actor;entry.deletedByName=text(actorName);}
    else if (body.action === 'return') {
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
      const depositorId=text(body.depositorId,65),depositorRoom=text(body.depositorRoom,10);
      if(depositorRoom&&!['P21','X','Supr','PP'].includes(depositorRoom)) fail('Выберите рум того, кто депает');
      if(depositorRoom&&!depositorId) fail('Укажите ID того, кто депает');
      if(depositorId&&!/^[a-zA-Z0-9_-]{1,64}$/.test(depositorId)) fail('Проверьте ID того, кто депает');
      if(body.reservationChannel!==undefined&&body.reservationChannel!=='exchip')fail('Неизвестный канал брони');
      entry.reservations.push({id:requestId,...(body.reservationChannel==='exchip'?{channelId:'exchip'}:{}),amount:value,depositorId,depositorRoom,note:text(body.note,300),createdAt:now,createdBy:actor,createdByName:text(actorName)});
    } else if (body.action === 'confirm-reservation' || body.action === 'release-reservation') {
      const reservation=(entry.reservations||[]).find(r=>r.id===body.reservationId);
      if(!reservation || reservation.confirmedAt || reservation.releasedAt) fail('Резерв уже обработан или не найден',409);
      if(body.action==='confirm-reservation'&&reservation.channelId==='exchip'){
        if(entry.payments.length>=1000)fail('Достигнут лимит операций по реквизиту',409);
        reservation.confirmedAt=now;reservation.confirmedBy=actor;reservation.confirmedByName=text(actorName);
        entry.payments.push({id:requestId,reservationId:reservation.id,channelId:'exchip',amount:reservation.amount,note:reservation.note,createdAt:now,createdBy:actor,createdByName:text(actorName)});
      }else if(body.action==='confirm-reservation') {
        let allocations;
        if(body.allocations!==undefined)allocations=paymentAllocations(body.allocations,reservation.amount);
        const depositorId=allocations?'':text(body.depositorId===undefined?reservation.depositorId:body.depositorId,65),depositorRoom=allocations?'':text(body.depositorRoom===undefined?reservation.depositorRoom:body.depositorRoom,10);
        if(!allocations&&!['P21','X','Supr','PP'].includes(depositorRoom))fail('Выберите рум того, кто депает');
        if(!allocations&&!/^[a-zA-Z0-9_-]{1,64}$/.test(depositorId))fail('Укажите ID того, кто депает');
        reservation.depositorId=depositorId;reservation.depositorRoom=depositorRoom;
        if(allocations)reservation.allocations=allocations;
        if(entry.payments.length>=1000) fail('Достигнут лимит операций по реквизиту',409);
        reservation.confirmedAt=now;reservation.confirmedBy=actor;reservation.confirmedByName=text(actorName);
        entry.payments.push({id:requestId,reservationId:reservation.id,amount:reservation.amount,...(allocations?{allocations}:{}),depositorId:reservation.depositorId||'',depositorRoom:reservation.depositorRoom||'',note:reservation.note,createdAt:now,createdBy:actor,createdByName:text(actorName)});
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
function statisticsRange(options={},now=Date.now()) {
  const day=86400000,cutoff=3*3600000;
  const businessDay=Math.floor((now-cutoff)/day)*day;
  const iso=n=>new Date(n).toISOString().slice(0,10);
  let from,to;
  const preset=options.preset||'all';
  if(preset==='all')return {preset,start:null,end:null};
  if(preset==='today'){from=iso(businessDay);to=from;}
  else if(preset==='week'||preset==='previous-week'){
    const monday=businessDay-((new Date(businessDay).getUTCDay()+6)%7)*day-(preset==='previous-week'?7*day:0);
    from=iso(monday);to=iso(monday+6*day);
  }else if(preset==='custom'){
    from=options.from;to=options.to;
    for(const value of [from,to])if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value)||!Number.isFinite(Date.parse(value))||iso(Date.parse(value))!==value)throw Object.assign(new Error('Выберите корректные даты'),{status:400});
    if(from>to)throw Object.assign(new Error('Начало периода должно быть раньше окончания'),{status:400});
  }else throw Object.assign(new Error('Неизвестный период'),{status:400});
  return {preset,from,to,start:Date.parse(from)+cutoff,end:Date.parse(to)+day+cutoff};
}
function view(state,now=Date.now(),options={}) {
  const period=statisticsRange(options,now);
  const included=row=>period.start===null||(row.createdAt>=period.start&&row.createdAt<period.end);
  const entries = (state.entries || []).filter(e=>!e.deletedAt).map(summary);
  const active = entries.filter(e => !e.archived);
  const operations=(state.channelOperations||[]).filter(r=>!r.voidedAt&&!r.transferId&&r.channelId!=='bonuses'&&included(r));
  const payoutDeposits=entries.reduce((s,e)=>s+e.payments.filter(p=>!p.voidedAt&&p.channelId!=='exchip'&&included(p)).reduce((n,p)=>n+p.amount,0),0);
  const exchipPayments=entries.flatMap(e=>e.payments.filter(p=>!p.voidedAt&&p.channelId==='exchip').map(p=>({...p,room:e.room,playerId:e.playerId,channelId:'exchip',direction:'outgoing'})));
  const exchipPaid=exchipPayments.filter(included).reduce((sum,p)=>sum+p.amount,0);
  const deposits=payoutDeposits+operations.filter(r=>r.direction==='income').reduce((s,r)=>s+r.amount,0);
  const managers=new Map();
  function manager(actor,name){name=managerName(actor,name);const id=String(actor||'unknown');if(!managers.has(id))managers.set(id,{id,name:name||'Менеджер не указан',deposits:0,returned:0,reserved:0,outgoing:0});const row=managers.get(id);if(name)row.name=name;return row;}
  for(const e of entries){
    for(const p of e.payments){if(p.voidedAt||!included(p))continue;const reservation=p.reservationId&&e.reservations.find(r=>r.id===p.reservationId);const m=manager(reservation?reservation.createdBy:p.createdBy,reservation?reservation.createdByName:p.createdByName);if(p.channelId!=='exchip')m.deposits+=p.amount;m.outgoing+=p.amount;}
    for(const r of e.returns){if(!r.voidedAt&&included(r))manager(r.createdBy,r.createdByName).returned+=r.amount;}
    for(const r of e.reservations){if(!r.confirmedAt&&!r.releasedAt&&included(r))manager(r.createdBy,r.createdByName).reserved+=r.amount;}
  }
  for(const r of operations){const m=manager(r.createdBy,r.createdByName);m.channelAmounts ||= {};if(r.direction==='income'){m.deposits+=r.amount;m.channelAmounts[r.channelId]=(m.channelAmounts[r.channelId]||0)+r.amount;}else m.outgoing+=r.amount;}
  function withChannels(rows,channelAmounts){return rows.map(d=>channels.some(c=>c.id===d.id)?{...d,amount:channelAmounts[d.id]||0}:d).concat(channels.filter(c=>c.id!=='bonuses'&&!rows.some(d=>d.id===c.id)).map(c=>({id:c.id,title:c.name,amount:channelAmounts[c.id]||0})));}
  const channelAmounts={};for(const r of operations)if(r.direction==='income')channelAmounts[r.channelId]=(channelAmounts[r.channelId]||0)+r.amount;
  const otherCategories=new Map();
  for(const r of operations)if(r.channelId==='other'&&r.direction==='income'){const title=String(r.note||'').trim().replace(/\s+/g,' ')||'Без комментария';otherCategories.set(title,(otherCategories.get(title)||0)+r.amount);}
  const playerRows=new Map(),{knownPlayerNick}=require('./deposit-player-directory');
  function player(room,id){room=String(room||'');id=String(id||'');const key=room+'|'+id;if(!playerRows.has(key))playerRows.set(key,{room,playerId:id,nick:knownPlayerNick(room,id),deposits:0,withdrawals:0});return playerRows.get(key);}
  function depositParts(record){const parts=record.allocations||[{depositorRoom:record.depositorRoom,depositorId:record.depositorId,amount:record.amount}];for(const part of parts)player(part.depositorRoom,part.depositorId).deposits+=part.amount;}
  for(const e of entries)for(const paid of e.payments){if(paid.voidedAt||!included(paid))continue;if(paid.channelId!=='exchip')depositParts(paid);player(e.room,e.playerId).withdrawals+=paid.amount;}
  for(const r of operations){if(r.direction==='income')depositParts(r.allocations?r:{...r,depositorRoom:r.room,depositorId:r.playerId});else player(r.room,r.playerId).withdrawals+=r.amount;}
  const players=[...playerRows.values()].sort((a,b)=>(b.deposits+b.withdrawals)-(a.deposits+a.withdrawals)||a.room.localeCompare(b.room)||a.playerId.localeCompare(b.playerId));
  const withdrawals=entries.filter(included).reduce((s,e)=>({total:s.total+e.total,paid:s.paid+e.paid,returned:s.returned+e.returned,remaining:s.remaining+e.remaining,reserved:s.reserved+e.reserved}),{total:0,paid:0,returned:0,remaining:0,reserved:0});
  const statistics={period,bonuses:(state.channelOperations||[]).filter(r=>r.channelId==='bonuses'&&!r.voidedAt&&included(r)).reduce((s,r)=>s+r.amount,0),deposits,withdrawals,players,otherCategories:[...otherCategories].map(([title,amount])=>({title,amount})),cashWithdrawals:entries.filter(included).reduce((sum,e)=>sum+e.total,0),exchipWithdrawals:exchipPaid+operations.filter(r=>r.channelId==='exchip'&&r.direction==='outgoing').reduce((sum,r)=>sum+r.amount,0),outgoing:payoutDeposits+exchipPaid+operations.filter(r=>r.direction==='outgoing').reduce((s,r)=>s+r.amount,0),returned:entries.reduce((s,e)=>s+e.returns.filter(r=>!r.voidedAt&&included(r)).reduce((n,r)=>n+r.amount,0),0),destinations:withChannels(destinations(payoutDeposits),channelAmounts),managers:[...managers.values()].sort((a,b)=>b.deposits-a.deposits||a.name.localeCompare(b.name,'ru')||a.id.localeCompare(b.id)).map(m=>({...m,destinations:withChannels(destinations(m.deposits-Object.values(m.channelAmounts||{}).reduce((s,n)=>s+n,0)),m.channelAmounts||{})}))};
  return {revision:state.revision || 0, entries, statistics, playerDirectory:require('./deposit-player-directory').depositPlayerDirectory(state), channelOperations:state.channelOperations||[], paymentForms:paymentForms(now,state.paymentFormPayments,(state.channelOperations||[]).concat(exchipPayments)), totals:{total:active.reduce((s,e)=>s+e.total,0), paid:active.reduce((s,e)=>s+e.paid,0), remaining:active.reduce((s,e)=>s+e.remaining,0), reserved:active.reduce((s,e)=>s+e.reserved,0), available:active.reduce((s,e)=>s+e.available,0)}};
}
module.exports = {applyOperation, summary, view, statisticsRange};
