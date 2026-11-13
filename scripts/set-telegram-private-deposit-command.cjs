'use strict';
const envPath=process.argv.find(arg=>arg.startsWith('--env='))?.slice(6);
if(envPath)process.loadEnvFile(envPath);
async function main(){
 if(!process.argv.includes('--apply')){console.log('/dep — Пополнить счёт (личные чаты; /деп вводится вручную)');return;}
 const token=process.env.TELEGRAM_BOT_TOKEN||process.env.TELEGRAM_TOKEN||process.env.BOT_TOKEN;
 if(!token)throw Error('Bot token missing');
 async function call(method,body){
  const response=await fetch('https://api.telegram.org/bot'+token+'/'+method,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(15000)});
  const data=await response.json();if(!response.ok||!data.ok)throw Error('Telegram command request failed');return data.result;
 }
 if((await call('getMe',{})).username!=='Poker_dvatuza_bot')throw Error('Unexpected bot');
 let updated=0;
 for(const language_code of ['','ru','en']){
  const scope={type:'all_private_chats'};
  let commands=await call('getMyCommands',{scope,language_code});
  if(!commands.length)commands=await call('getMyCommands',{scope,language_code:''});
  if(!commands.length)commands=await call('getMyCommands',{scope:{type:'default'},language_code});
  if(!commands.length)commands=await call('getMyCommands',{scope:{type:'default'},language_code:''});
  await update(scope,language_code,commands);
  // Preserve any explicit private-chat overrides already used by the owner/managers.
  for(const chat_id of ['388008256','5053253480','2144406710','1897001087']){
   const chatScope={type:'chat',chat_id};const custom=await call('getMyCommands',{scope:chatScope,language_code});
   if(custom.length)await update(chatScope,language_code,custom);
  }
 }
 async function update(scope,language_code,existing){
  const commands=existing.filter(c=>c.command!=='dep');
  if(commands.length>=100)throw Error('Command list is full');
  const index=commands.findIndex(c=>c.command==='create_game');
  commands.splice(index<0?0:index+1,0,{command:'dep',description:'Пополнить счёт'});
  await call('setMyCommands',{scope,language_code,commands});
  const saved=await call('getMyCommands',{scope,language_code});
  if(JSON.stringify(saved)!==JSON.stringify(commands))throw Error('Command verification failed');
  updated++;
 }
 console.log('Added /dep and verified '+updated+' private command lists.');
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
