'use strict';
const {createHash,timingSafeEqual,randomUUID}=require('node:crypto');
const redis=require('../redis');
const {summary,applyOperation}=require('../admin-deposits');
const {STORE_KEY}=require('../telegram-deposit-withdrawals');
const {parseBody}=require('../api-auth');
const digest=value=>createHash('sha256').update(value).digest();

function validReceipt(value){
  if(typeof value!=='string'||value.length>2800000)return false;
  const match=/^data:(image\/jpeg|image\/png|application\/pdf);base64,([A-Za-z0-9+/]+={0,2})$/.exec(value);
  if(!match)return false;
  const bytes=Buffer.from(match[2],'base64');
  const signatures={'image/jpeg':'ffd8ff','image/png':'89504e470d0a1a0a','application/pdf':'255044462d'};
  return bytes.length<=2097152 && bytes.toString('base64')===match[2] && bytes.subarray(0,8).toString('hex').startsWith(signatures[match[1]]);
}

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
    const {action,item,clubId,userId,receipt}=parseBody(req);
    if(!/^\d+$/.test(clubId)||!/^\d+$/.test(userId)||!['list','take','paid','cancel'].includes(action))return res.status(400).end();
    if(receipt!==undefined && (action!=='paid' || !validReceipt(receipt)))
      return res.status(400).json({error:'Выберите чек JPEG, PNG или PDF до 2 МБ.'});
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
      if(receipt){
        const reservation=result.state.entries.find(e=>e.id===entry.id).reservations.find(r=>r.id===item);
        reservation.hasPoker21Receipt=true;
      }
      const keys=receipt?[STORE_KEY,'poker21:withdrawal-receipt:'+item]:[STORE_KEY];
      const script=`
        if (redis.call('GET',KEYS[1]) or '')~=ARGV[1] then return 0 end
        if KEYS[2] then
          redis.call('MSET',KEYS[1],ARGV[2],KEYS[2],ARGV[3])
        else
          redis.call('SET',KEYS[1],ARGV[2])
        end
        return 1
      `;
      const command=['EVAL',script,keys.length,...keys,raw,JSON.stringify(result.state)];
      if(receipt)command.push(receipt);
      const [saved]=await redis.pipeline([command],{throwOnError:true,context:'poker21-withdrawals.write'});
      if(Number(saved.result)===1)return res.json({ok:true});
    }
    return res.status(409).json({error:'Остаток изменился. Обновите список.'});
  }catch(e){return res.status(e.status||503).json({error:e.status?e.message:'Реестр выводов временно недоступен.'});}
};
