'use strict';
const envPath=process.argv.find(arg=>arg.startsWith('--env='))?.slice(6);
if(envPath)process.loadEnvFile(envPath);
async function main(){
 if(!process.argv.includes('--apply')){console.log('/dep — Пополнить счёт\n/stats — Моя статистика\n/spin — Крутка и выигрыши\n/create_game — Создать игру');return;}
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
  const first=[
   {command:'dep',description:'Пополнить счёт'},
   {command:'stats',description:'Моя статистика'},
   {command:'spin',description:'Крутка — доступность и выигрыши'},
   {command:'bonus_balance',description:'Мой бонусный баланс'},
   existing.find(c=>c.command==='create_game')||{command:'create_game',description:'Создать игру'}
  ];
  const commands=first.concat(existing.filter(c=>!['dep','stats','spin','bonus_balance','create_game'].includes(c.command)));
  if(commands.length>100)throw Error('Command list is full');
  await call('setMyCommands',{scope,language_code,commands});
  const saved=await call('getMyCommands',{scope,language_code});
  if(JSON.stringify(saved)!==JSON.stringify(commands))throw Error('Command verification failed');
  updated++;
 }
 console.log('Ordered /dep, /stats, /spin, /create_game and verified '+updated+' private command lists.');
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
