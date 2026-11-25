'use strict';
const {createHash,timingSafeEqual,randomUUID}=require('node:crypto');
const redis=require('../redis');
const {summary,applyOperation}=require('../admin-deposits');
const {STORE_KEY}=require('../telegram-deposit-withdrawals');
const {parseBody}=require('../api-auth');
const digest=value=>createHash('sha256').update(value).digest();

function listed(entry,clubId){
  if(entry.archived||entry.deletedAt)return [];
  const e=summary(entry);
  const held=e.reservations.filter(r=>r.poker21OfferId&&!r.confirmedAt&&!r.releasedAt);
  const card=(id,amount)=>({id:'withdrawal:'+id,number:e.phone||e.card,bank:e.bank,amount:amount/100});
  const items=held.filter(r=>r.poker21Club===clubId).map(r=>({...card(r.id,r.amount),taker:true,
    status:r.poker21Paid?'Ожидает подтверждения':'Взята на 15 минут',canMarkPaid:!r.poker21Paid,
    details:[e.phone||e.card,e.bank,e.recipient].join('\n')}));
  const offer=e.poker21Offer;
  if(offer&&offer.amount<=e.available&&!held.some(r=>r.poker21OfferId===offer.id))
    items.push({...card(offer.id,offer.amount),mine:clubId==='758417',taker:false});
  return items;
}

module.exports=async function(req,res){
  res.setHeader('Cache-Control','private, no-store');
  const key=process.env.POKER21_WITHDRAWALS_SYNC_KEY;
  if(req.method!=='POST'||!key||!timingSafeEqual(digest('Bearer '+key),digest(String(req.headers.authorization||''))))return res.status(403).end();
  try{
    const {action,item,clubId,userId}=parseBody(req);
    if(!/^\d+$/.test(clubId)||!/^\d+$/.test(userId)||!['list','take','paid','cancel'].includes(action))return res.status(400).end();
    for(let i=0;i<5;i++){
      const [row]=await redis.pipeline([['GET',STORE_KEY]],{throwOnError:true,context:'poker21-withdrawals.read'});
      const raw=row.result||'',state=raw?JSON.parse(raw):{entries:[],requests:[],revision:0};
      if(action==='list')return res.json({items:state.entries.flatMap(e=>listed(e,clubId))});
      const take=action==='take';
      if(clubId==='758417')return res.status(403).json({error:'Нельзя взять собственные реквизиты.'});
      const entry=state.entries.find(e=>take?e.poker21Offer?.id===item:e.reservations?.some(r=>r.id===item&&r.poker21Club===clubId));
      if(!entry)return res.status(409).json({error:'Заявка больше недоступна.'});
      const operation={action:'poker21-'+action,entryId:entry.id,requestId:randomUUID(),clubId,
        ...(take?{offerId:item}:{reservationId:item})};
      const result=applyOperation(state,operation,'tg_'+userId,Date.now(),'Poker21 · клуб '+clubId,{poker21:true});
      const [saved]=await redis.pipeline([['EVAL',"if (redis.call('GET',KEYS[1]) or '')~=ARGV[1] then return 0 end redis.call('SET',KEYS[1],ARGV[2]);return 1",1,STORE_KEY,raw,JSON.stringify(result.state)]],{throwOnError:true,context:'poker21-withdrawals.write'});
      if(Number(saved.result)===1)return res.json({ok:true});
    }
    return res.status(409).json({error:'Остаток изменился. Обновите список.'});
  }catch(e){return res.status(e.status||503).json({error:e.status?e.message:'Реестр выводов временно недоступен.'});}
};
