'use strict';
const CACHE_TTL_SECONDS=24*60*60;
function lifetimePrizesCacheKey(accountIds) {
 const accounts=[...new Set((Array.isArray(accountIds)?accountIds:[]).map(String).filter(Boolean))].sort();
 return 'poker_app:daily_poker_lifetime:v2:'+accounts.join(':');
}
async function lifetimePrizes(accountIds,{pipeline,readGames,prizeTotals}) {
 const accounts=[...new Set(accountIds)].sort();
 const cacheKey=lifetimePrizesCacheKey(accounts);
 const cached=await pipeline([['GET',cacheKey]],{throwOnError:true});
 if(cached?.[0]?.result)return JSON.parse(cached[0].result);
 const ids=new Set();
 for(const account of accounts){
  if(!/^ID\d+$/.test(account))throw new Error('Invalid account');
  const keys=new Set(['poker_app:daily_poker_games_user:'+account]);let cursor='0';
  do{const rows=await pipeline([['SCAN',cursor,'MATCH','poker_app:daily_poker_games_date:'+account+':*','COUNT','500']],{throwOnError:true});
   if(!Array.isArray(rows?.[0]?.result))throw new Error('Archive unavailable');
   const result=rows[0].result;cursor=String(result[0]);for(const key of result[1])keys.add(key);
  }while(cursor!=='0');
  const all=[...keys];for(let i=0;i<all.length;i+=100){const lists=await pipeline(all.slice(i,i+100).map(k=>['LRANGE',k,'0','-1']),{throwOnError:true,allowLargeRedisRead:true,context:'daily-poker-lifetime.archive-totals'});
   if(!lists||lists.some(r=>!Array.isArray(r?.result)))throw new Error('Archive unavailable');
   for(const row of lists)for(const id of row.result)ids.add(id);
  }
 }
 const rows=await readGames([...ids],{throwOnError:true});let ticketAmount=0,bonusAmount=0;
 for(const row of rows){if(!row.result)throw new Error('Incomplete archive');const game=JSON.parse(row.result),totals=prizeTotals(game);ticketAmount+=totals.ticketAmount;bonusAmount+=totals.bonusAmount;}
 const total={ticketAmount,bonusAmount};await pipeline([['SET',cacheKey,JSON.stringify(total),'EX',String(CACHE_TTL_SECONDS)]],{throwOnError:true});return total;
}
module.exports={CACHE_TTL_SECONDS,lifetimePrizes,lifetimePrizesCacheKey};
