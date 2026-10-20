'use strict';
const fs=require('node:fs');
const envPath=process.argv.find(a=>a.startsWith('--env='))?.slice(6);
if(envPath)for(const line of fs.readFileSync(envPath,'utf8').split('\n')){const m=line.match(/^([A-Z_0-9]+)=(.*)$/);if(m){try{process.env[m[1]]=JSON.parse(m[2]);}catch{process.env[m[1]]=m[2].replace(/^['"]|['"]$/g,'');}}}
async function main(){
 if(!process.argv.includes('--apply')){console.log('/withdrawals — Мои выводы (личные чаты)');return;}
 const token=process.env.TELEGRAM_BOT_TOKEN||process.env.TELEGRAM_TOKEN||process.env.BOT_TOKEN;if(!token)throw Error('Bot token missing');
 async function call(method,payload){const response=await fetch('https://api.telegram.org/bot'+token+'/'+method,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(15000)});const result=await response.json();if(!result.ok)throw Error('Telegram command request failed');return result.result;}
 if((await call('getMe',{})).username!=='Poker_dvatuza_bot')throw Error('Unexpected bot');
 for(const language_code of ['','ru','en']){
  const scope={type:'all_private_chats'};
  let commands=await call('getMyCommands',{scope,language_code});
  if(!commands.length)commands=await call('getMyCommands',{scope,language_code:''});
  if(!commands.length)commands=await call('getMyCommands',{scope:{type:'default'},language_code});
  if(!commands.length)commands=await call('getMyCommands',{scope:{type:'default'},language_code:''});
  commands=commands.filter(c=>c.command!=='withdrawals').concat({command:'withdrawals',description:'Мои выводы'});
  await call('setMyCommands',{scope,language_code,commands});
  const saved=await call('getMyCommands',{scope,language_code});if(JSON.stringify(saved)!==JSON.stringify(commands))throw Error('Command verification failed');
 }
 console.log('Private withdrawal command added and verified.');
}
main().catch(()=>{console.error('Could not update private commands.');process.exitCode=1;});
