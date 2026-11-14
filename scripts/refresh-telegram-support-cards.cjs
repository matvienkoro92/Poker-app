'use strict';
const envPath=process.argv.find(arg=>arg.startsWith('--env='))?.slice(6);
if(envPath)process.loadEnvFile(envPath);
async function main(){
 const redis=require('../lib/redis'),support=require('../lib/telegram-support');
 const cfg=await require('../lib/telegram-support-config').config();
 if(!cfg?.enabled)throw Error('Support disabled');
 const token=process.env.TELEGRAM_BOT_TOKEN||process.env.TELEGRAM_TOKEN||process.env.BOT_TOKEN;
 const response=await fetch('https://api.telegram.org/bot'+token+'/getMe');const me=await response.json();
 if(!response.ok||!me.ok||me.result.username!=='Poker_dvatuza_bot')throw Error('Unexpected bot');
 const group=String(cfg.chatId),ids=new Set();let cursor='0',pages=0;const deadline=Date.now()+30000;
 do{
  if(++pages>100||Date.now()>deadline)throw Error('Client inventory limit reached');
  const [row]=await redis.pipeline([['SCAN',cursor,'MATCH',support.PREFIX+'client:'+group+':*','COUNT',100]],{throwOnError:true});
  if(!Array.isArray(row.result))throw Error('Client inventory unavailable');
  cursor=String(row.result[0]);for(const key of row.result[1]){const id=key.split(':').at(-1);if(/^[1-9]\d*$/.test(id))ids.add(id);}
 }while(cursor!=='0');
 console.log(JSON.stringify({bot:me.result.username,group,clients:ids.size,apply:process.argv.includes('--apply')}));
 if(!process.argv.includes('--apply'))return;
 let updated=0,skipped=0,failed=0;
 for(const id of ids){
  try{if(await support.refreshPlayerCard(token,group,id))updated++;else skipped++;}
  catch{failed++;console.error('Card refresh failed for client '+id);}
  console.log(JSON.stringify({updated,skipped,failed,total:ids.size}));
 }
 if(failed)process.exitCode=1;
}
main().catch(()=>{console.error('Support card refresh failed');process.exitCode=1;});
