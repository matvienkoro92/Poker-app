'use strict';
const env=process.argv.find(a=>a.startsWith('--env='))?.slice(6);if(env)process.loadEnvFile(env);
async function main(){
 const commands=require('../lib/telegram-support-templates').commands;
 if(!process.argv.includes('--apply')){console.log(JSON.stringify(commands));return;}
 const cfg=await require('../lib/telegram-support-config').config();if(!cfg?.enabled||!/^-[0-9]+$/.test(String(cfg.chatId)))throw Error('Support group unavailable');
 const token=process.env.TELEGRAM_BOT_TOKEN||process.env.TELEGRAM_TOKEN||process.env.BOT_TOKEN;
 const call=async(method,body)=>{const r=await fetch('https://api.telegram.org/bot'+token+'/'+method,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(15000)});const d=await r.json();if(!r.ok||!d.ok)throw Error('Telegram menu request failed');return d.result;};
 if((await call('getMe',{})).username!=='Poker_dvatuza_bot')throw Error('Unexpected bot');
 let count=0;for(const language_code of ['','ru','en'])for(const type of ['chat','chat_administrators']){
  const scope={type,chat_id:cfg.chatId};await call('setMyCommands',{scope,language_code,commands});
  const saved=await call('getMyCommands',{scope,language_code});if(JSON.stringify(saved)!==JSON.stringify(commands))throw Error('Menu verification failed');count++;
 }
 console.log('Verified template menu in '+count+' support-group scopes.');
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
