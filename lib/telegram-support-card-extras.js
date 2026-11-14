'use strict';
const clean=value=>String(value||'').replace(/[\r\n]+/g,' ').trim().slice(0,180);
function deposits(rows){
 const valid=rows.filter(row=>Number.isFinite(Number(row.amount))&&Number(row.amount)>0);
 const sum=valid.reduce((s,row)=>s+Number(row.amount),0);
 const dates=valid.map(row=>Date.parse(row.at)).filter(Number.isFinite);
 return {deposits:sum,depositCount:valid.length,depositAverage:valid.length?Math.round(sum/valid.length*100)/100:0,lastDepositAt:dates.length?new Date(Math.max(...dates)).toISOString():null};
}
function reports(playerId,periods,now=Date.now()){
 const today=new Date(now+3*3600000).toISOString().slice(0,10);
 const rows=periods.filter(p=>p.endDate<today).sort((a,b)=>a.endDate.localeCompare(b.endDate)),games={};
 for(const row of rows)for(const [game,amount]of Object.entries(row.games?.[playerId]||{}))games[game]=(games[game]||0)+amount;
 const favorite=Object.entries(games).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]))[0]?.[0]||null;
 let rakeTrend=null;
 if(rows.length>=2){const last=rows.at(-1),prior=rows.at(-2);
  if(Date.parse(last.startDate)-Date.parse(prior.endDate)===86400000){
   const current=Number(last.rake[playerId]||0)/100,previous=Number(prior.rake[playerId]||0)/100;
   rakeTrend={current,previous,delta:Math.round((current-previous)*100)/100,percent:previous?Math.round((current-previous)/previous*1000)/10:null,from:prior.startDate,previousEnd:prior.endDate,to:last.endDate,currentStart:last.startDate};
  }
 }
 return {favoriteGame:favorite,favoriteFrom:rows[0]?.startDate,favoriteTo:rows.at(-1)?.endDate,rakeTrend};
}
let referralsPending;
async function referralCounts(run){
 const key='poker_app:telegram:support:referral_counts:v1';const [raw]=await run([['GET',key]]);if(raw)return JSON.parse(raw);
 if(referralsPending)return referralsPending;
 referralsPending=(async()=>{
  const members=new Map();let cursor='0',pages=0;const deadline=Date.now()+10000;
  do{
   if(++pages>40||Date.now()>deadline)throw Error('Incomplete referral index');
   const [row]=await run([['HSCAN','poker_app:referrals:referrer',cursor,'COUNT',500]]);
   if(!Array.isArray(row)||!Array.isArray(row[1]))throw Error('Referral index unavailable');
   cursor=String(row[0]);for(let i=0;i<row[1].length;i+=2)members.set(String(row[1][i]),String(row[1][i+1]));
  }while(cursor!=='0');
  const counts={};for(const [invitee,inviter]of members)if(/^ID\d{6}$/.test(invitee)&&/^ID\d{6}$/.test(inviter)&&invitee!==inviter)counts[inviter]=(counts[inviter]||0)+1;
  await run([['SET',key,JSON.stringify(counts),'EX',900]]);return counts;
 })();
 try{return await referralsPending;}finally{referralsPending=null;}
}
async function acquisition(account,userId,run){
 const result={invitedCount:null,invitedBy:null,source:null};
 await Promise.allSettled([
  (async()=>{const counts=await referralCounts(run);result.invitedCount=counts[account]||0;})(),
  (async()=>{const [id]=await run([['HGET','poker_app:referrals:referrer',account]]);if(!id){result.invitedBy='не указан';return;}if(!/^ID\d{6}$/.test(id))return;const [name]=await run([['HGET','poker_app:visitor_chat_display_names',id]]);result.invitedBy=clean(name)?clean(name)+' · '+id:id;})(),
  (async()=>{const raw=await run([['HGET','poker_app:attribution:v1:contexts',account],['HGET','poker_app:attribution:v1:contexts','tg_'+userId]]);
   const first=raw.filter(Boolean).map(JSON.parse).map(context=>context.first).filter(t=>t&&Number.isFinite(Number(t.at))&&t.ref).sort((a,b)=>Number(a.at)-Number(b.at))[0];
   if(!first){result.source='не зафиксирован';return;}
   const [metaRaw]=await run([['HGET','poker_app:track_links:meta',first.ref]]);const meta=metaRaw?JSON.parse(metaRaw):{};
   const labels=[meta.source,meta.placement,meta.campaign].map(clean).filter(Boolean);
   result.source=labels.length?[...new Set(labels)].join(' → '):clean(first.label||meta.label)||'Ссылка '+clean(first.ref);
  })()
 ]);return result;
}
module.exports={deposits,reports,acquisition};
