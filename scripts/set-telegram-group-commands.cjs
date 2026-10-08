'use strict';
const fs = require('node:fs');
const envPath = process.argv.find(arg=>arg.startsWith('--env='))?.slice(6);
if (envPath) {
  for (const line of fs.readFileSync(envPath,'utf8').split('\n')) {
    const index=line.indexOf('=');
    if (index<1 || line.startsWith('#')) continue;
    let value=line.slice(index+1);
    try { value=JSON.parse(value); } catch { value=value.replace(/^['"]|['"]$/g,''); }
    process.env[line.slice(0,index)]=value;
  }
}
const commands=[
  {command:'pulse',description:'Меню клуба'},
  {command:'tables',description:'Столы сейчас'},
  {command:'subscriptions',description:'Оповещения об игроке или столе'},
];
async function main() {
  if (!process.argv.includes('--apply')) { console.log(JSON.stringify(commands,null,2)); return; }
  const token=process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN;
  if (!token) throw new Error('Bot token missing');
  async function call(method,payload) {
    const response=await fetch('https://api.telegram.org/bot'+token+'/'+method,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(15000)});
    const result=await response.json();
    if (!result.ok) throw new Error('Telegram command update failed');
    return result.result;
  }
  if ((await call('getMe',{})).username !== 'Poker_dvatuza_bot') throw new Error('Unexpected bot');
  for (const type of ['all_group_chats','all_chat_administrators']) {
    for (const language_code of ['','ru','en']) {
      const scope={type};
      await call('setMyCommands',{commands,scope,language_code});
      const saved=await call('getMyCommands',{scope,language_code});
      if (JSON.stringify(saved)!==JSON.stringify(commands)) throw new Error('Command verification failed');
    }
  }
  console.log('Group command menus updated and verified; private commands unchanged.');
}
main().catch(()=>{console.error('Could not update group commands.');process.exitCode=1;});
