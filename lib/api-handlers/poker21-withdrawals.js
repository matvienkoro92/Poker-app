'use strict';
const {createHash,timingSafeEqual,randomUUID}=require('node:crypto');
const redis=require('../redis');
const {summary,applyOperation,availablePoker21Offer}=require('../admin-deposits');
const {STORE_KEY}=require('../telegram-deposit-withdrawals');
const {parseBody}=require('../api-auth');
const removalAdmins=new Set(['388008256','5053253480']);
const digest=value=>createHash('sha256').update(value).digest();

function validReceipt(value){
  if(typeof value!=='string'||value.length>2800000)return false;
  const match=/^data:(image\/jpeg|image\/png|application\/pdf);base64,([A-Za-z0-9+/]+={0,2})$/.exec(value);
  if(!match)return false;
  const bytes=Buffer.from(match[2],'base64');
  const signatures={'image/jpeg':'ffd8ff','image/png':'89504e470d0a1a0a','application/pdf':'255044462d'};
  return bytes.length<=2097152 && bytes.toString('base64')===match[2] && bytes.subarray(0,8).toString('hex').startsWith(signatures[match[1]]);
}

function listed(entry,clubId,ownerOverview){
  if(entry.poker21RemovedByAdmin||entry.archived||entry.deletedAt||entry.paymentType==='usdt'||entry.wallet)return [];
  const e=summary(entry);
  const held=e.reservations.filter(r=>r.poker21OfferId&&!r.confirmedAt&&!r.releasedAt);
  const card=(id,amount)=>({id:'withdrawal:'+id,number:e.phone||e.card||e.paymentLink,bank:e.bank,amount:amount/100});
  const items=held.filter(r=>r.poker21Club===clubId).map(r=>({...card(r.id,r.amount),taker:true,
    status:r.poker21Paid?'Ожидает подтверждения':'В работе',expiresAt:r.poker21Paid?null:r.poker21ExpiresAt,canMarkPaid:!r.poker21Paid,
    details:[e.phone||e.card||e.paymentLink,e.bank,e.recipient].join('\n')}));
  const offer=availablePoker21Offer(e);
  if(ownerOverview===true && clubId==='758417'){
    if(!offer&&!held.length)return items;
    const bookings=(entry.reservations||[]).filter(r=>r.poker21OfferId).map(r=>{
      const expired=r.poker21ExpiresAt && r.poker21ExpiresAt<=Date.now();
      const stage=r.confirmedAt?'Оплата подтверждена':r.releasedAt?'Бронь отменена':r.poker21Paid?'Плательщик отметил оплату':expired?'Срок брони истёк':'Забронировано';
      return {clubId:r.poker21Club,amountCents:r.amount,stage};
    }).reverse();
    items.push({...card(offer?.id||entry.id,e.available),mine:true,taker:false,historyOnly:!offer,
        minimumCents:offer?entry.poker21Minimum||0:0,totalCents:entry.total,availableCents:e.available,bookings});
    return items;
  }
  if(offer)
    items.push({...card(offer.id,offer.amount),mine:clubId==='758417',minimumCents:entry.poker21Minimum||0,taker:false});
  return items;
}

module.exports=async function(req,res){
  res.setHeader('Cache-Control','private, no-store');
  const key=process.env.POKER21_WITHDRAWALS_SYNC_KEY;
  if(req.method!=='POST'||!key||!timingSafeEqual(digest('Bearer '+key),digest(String(req.headers.authorization||''))))return res.status(403).end();
  try{
    const {action,item,clubId,userId,receipt,account,takeCents,minimum,ownerOverview}=parseBody(req);
    const inboxKey=STORE_KEY+':poker21-claim-notices';
    if(action==='confirmed-withdrawals'){
      const [row]=await redis.pipeline([['GET',STORE_KEY]],{throwOnError:true});
      const state=JSON.parse(row.result||'{}');
      const credits=(state.entries||[]).flatMap(entry=>(entry.reservations||[])
        .filter(r=>r.poker21OfferId&&r.confirmedAt&&!r.releasedAt&&entry.payments?.some(p=>p.reservationId===r.id&&p.amount===r.amount&&!p.voidedAt))
        .map(r=>({id:r.id,clubId:r.poker21Club,account:r.poker21Account,amountCents:r.amount,confirmedAt:r.confirmedAt})));
      return res.json({credits:item?credits.filter(c=>c.id===item):credits.sort((a,b)=>b.confirmedAt-a.confirmedAt)});
    }
    if(action==='pending-credits'||action==='ack-credit'){
      for(let attempt=0;attempt<5;attempt++){
        const [row]=await redis.pipeline([['GET',STORE_KEY]],{throwOnError:true});
        const state=JSON.parse(row.result||'{}');
        const credits=state.poker21Credits||[];
        if(action==='pending-credits')return res.json({credits:credits.filter(c=>!clubId||c.clubId===clubId)});
        if(!credits.some(c=>c.id===item))return res.json({ok:true});
        state.poker21Credits=credits.filter(c=>c.id!==item);
        const [saved]=await redis.pipeline([['EVAL',"if redis.call('GET',KEYS[1])~=ARGV[1] then return 0 end redis.call('SET',KEYS[1],ARGV[2]) return 1",1,STORE_KEY,row.result,JSON.stringify(state)]],{throwOnError:true});
        if(Number(saved.result))return res.json({ok:true});
      }
      return res.status(409).end();
    }
    if(action==='pending-claim-notices'){
      const [row]=await redis.pipeline([['LRANGE',inboxKey,0,49]],{throwOnError:true});
      return res.json({notices:(row.result||[]).map(value=>JSON.parse(value))});
    }
    if(action==='ack-claim-notice'){
      const {notice}=parseBody(req);
      if(!notice||typeof notice!=='object')return res.status(400).end();
      await redis.pipeline([['LREM',inboxKey,1,JSON.stringify(notice)]],{throwOnError:true});
      return res.json({ok:true});
    }
    if(action==='notice-receipt'){
      if(!/^[a-f0-9-]{36}$/.test(item))return res.status(400).end();
      const [file]=await redis.pipeline([['GET','poker21:withdrawal-receipt:'+item]],{throwOnError:true});
      if(!file.result)return res.status(404).end();
      return res.json({receipt:file.result});
    }
    const confirm=action==='telegram-confirm'&&clubId==='758417';
    if(!/^\d+$/.test(clubId)||!/^\d+$/.test(userId)||(!confirm&&!['list','take','paid','cancel','remove','split'].includes(action)))return res.status(400).end();
    if(receipt!==undefined && (action!=='paid' || !validReceipt(receipt)))
      return res.status(400).json({error:'Выберите чек JPEG, PNG или PDF до 2 МБ.'});
    for(let i=0;i<5;i++){
      const [row]=await redis.pipeline([['GET',STORE_KEY]],{throwOnError:true,context:'poker21-withdrawals.read'});
      const raw=row.result||'',state=raw?JSON.parse(raw):{entries:[],requests:[],revision:0};
      if(action==='list')return res.json({items:state.entries.flatMap(e=>listed(e,clubId,ownerOverview))});
      const take=action==='take',remove=action==='remove';
      const adminRemoval=remove&&removalAdmins.has(userId);
      if(remove&&!adminRemoval&&clubId!=='758417')return res.status(403).json({error:'Можно снять только свою заявку.'});
      if(action==='split' && clubId!=='758417')return res.status(403).end();
      if(!confirm&&!remove&&action!=='split'&&clubId==='758417')return res.status(403).json({error:'Нельзя взять собственные реквизиты.'});
      const heldByClub=e=>!e.poker21RemovedByAdmin&&e.reservations?.some(r=>r.id===item&&r.poker21Club===clubId);
      const entry=state.entries.find(e=>{
        if(confirm)return !e.deletedAt&&e.reservations?.some(r=>r.id===item&&r.poker21OfferId&&r.poker21Paid);
        if(adminRemoval&&heldByClub(e))return true;
        if(take||remove||action==='split')return Boolean(item)&&availablePoker21Offer(summary(e))?.id===item;
        return heldByClub(e);
      });
      if(!entry)return res.status(409).json({error:'Заявка больше недоступна.'});
      const reservationRemoval=adminRemoval&&heldByClub(entry);
      const operation={action:reservationRemoval?'poker21-remove-reservation':remove?'poker21-unpublish':'poker21-'+action,entryId:entry.id,requestId:randomUUID(),clubId,...(take&&account?{poker21Account:account}:{}),
        ...(take?{takeCents}:{}),...(action==='split'?{minimum}:{}),...((take||remove||action==='split')&&!reservationRemoval?{offerId:item}:{reservationId:item})};
      if(confirm){
        const r=entry.reservations.find(r=>r.id===item);
        if(r.confirmedAt)return res.json({ok:true,alreadyConfirmed:true});
        if(entry.poker21RemovedByAdmin||r.releasedAt)return res.status(409).json({error:'Бронь снята. Проверьте карточку в Депозитах.'});
        Object.assign(operation,{action:'confirm-reservation',reservationId:r.id,amount:r.amount});
      }
      const result=applyOperation(state,operation,'tg_'+userId,Date.now(),confirm?'Telegram · '+userId:'Poker21 · клуб '+clubId,{poker21:true,adminRemoval});
      if(receipt){
        const reservation=result.state.entries.find(e=>e.id===entry.id).reservations.find(r=>r.id===item);
        reservation.hasPoker21Receipt=true;
      }
      let notice;
      if(take||action==='paid'){
        const reservationId=take?operation.requestId:item;
        const reservation=result.state.entries.find(e=>e.id===entry.id).reservations.find(r=>r.id===reservationId);
        notice={id:reservationId,clubId,amountCents:reservation.amount,...(take?{}:{kind:'withdrawal-paid',hasReceipt:Boolean(receipt),sender:String(userId)})};
      }
      const keys=[STORE_KEY];
      if(notice)keys.push(inboxKey);
      if(receipt)keys.push('poker21:withdrawal-receipt:'+item);
      const script=`
        if (redis.call('GET',KEYS[1]) or '')~=ARGV[1] then return 0 end
        if KEYS[2] then redis.call('RPUSH',KEYS[2],ARGV[3]) end
        if KEYS[3] then redis.call('SET',KEYS[3],ARGV[4]) end
        redis.call('SET',KEYS[1],ARGV[2])
        return 1
      `;
      const command=['EVAL',script,keys.length,...keys,raw,JSON.stringify(result.state)];
      if(notice)command.push(JSON.stringify(notice));
      if(receipt)command.push(receipt);
      const [saved]=await redis.pipeline([command],{throwOnError:true,context:'poker21-withdrawals.write'});
      if(Number(saved.result)===1){
        await require('../poker21-credit-delivery')(result.state,operation);
        return res.json(notice?{ok:true,notice}:{ok:true});
      }
    }
    return res.status(409).json({error:'Остаток изменился. Обновите список.'});
  }catch(e){return res.status(e.status||503).json({error:e.status?e.message:'Реестр выводов временно недоступен.'});}
};
