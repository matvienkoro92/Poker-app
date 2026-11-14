'use strict';
const env=process.argv.find(a=>a.startsWith('--env='))?.slice(6);if(env)process.loadEnvFile(env);
async function main(){
 const redis=require('../lib/redis'),bootstrap=require('../lib/daily-poker-totals-bootstrap');
 const apply=process.argv.includes('--apply'),started=Date.now();
 const run=async commands=>{const rows=await redis.pipeline(commands,{throwOnError:true,timeoutMs:20000,context:'daily-poker.totals-bootstrap',allowLargeRedisRead:true});if(!rows||rows.some(r=>r.error))throw Error('Bootstrap Redis request failed');return rows.map(r=>r.result);};
 const players=new Map();let cursor='0',pages=0;
 do{if(++pages>200)throw Error('Player inventory limit');const [r]=await run([['HSCAN','poker_app:daily_poker_played_count',cursor,'COUNT',500]]);cursor=String(r[0]);for(let i=0;i<r[1].length;i+=2){const id=r[1][i],n=Number(r[1][i+1]);if(!/^ID\d{6}$/.test(id)||!Number.isSafeInteger(n)||n<0)throw Error('Invalid player count');players.set(id,{count:n,ids:new Set()});}}while(cursor!=='0');
 const accounts=[...players.keys()];
 for(let i=0;i<accounts.length;i+=50){const slice=accounts.slice(i,i+50),rows=await run(slice.map(id=>['LRANGE','poker_app:daily_poker_games_user:'+id,0,499]));rows.forEach((ids,j)=>{if(!Array.isArray(ids))throw Error('Invalid game list');players.get(slice[j]).ids=new Set(ids);});}
 const incomplete=new Set(accounts.filter(id=>players.get(id).ids.size!==players.get(id).count));
 console.log(JSON.stringify({players:players.size,needsDateArchive:incomplete.size,apply}));
 if(incomplete.size){
  cursor='0';pages=0;const archiveKeys=[];
  // A single shared inventory pass, never one database scan per player.
  do{if(++pages>20000||Date.now()-started>20*60000)throw Error('Date inventory limit');const [r]=await run([['SCAN',cursor,'MATCH','poker_app:daily_poker_games_date:*','COUNT',2000]]);cursor=String(r[0]);for(const key of r[1]){const id=key.split(':')[2];if(incomplete.has(id))archiveKeys.push(key);}}while(cursor!=='0');
  for(let i=0;i<archiveKeys.length;i+=50){const slice=archiveKeys.slice(i,i+50),rows=await run(slice.map(key=>['LRANGE',key,0,-1]));rows.forEach((ids,j)=>{if(!Array.isArray(ids))throw Error('Invalid archive list');const p=players.get(slice[j].split(':')[2]);for(const id of ids)p.ids.add(id);});}
 }
 let indexed=0,failed=0,games=0,tickets=0,bonus=0;const failures=[];
 for(let i=0;i<accounts.length;i+=10){
  const slice=accounts.slice(i,i+10),rows=await run(slice.map(id=>{const p=players.get(id);return bootstrap.command(id,p.count,[...p.ids],apply);}));
  rows.forEach((raw,j)=>{if(typeof raw!=='string'||!raw.startsWith('{')){failed++;failures.push({account:slice[j],reason:raw});return;}const total=JSON.parse(raw);indexed++;games+=total.count;tickets+=total.ticket;bonus+=total.bonus;});
  console.log(JSON.stringify({processed:Math.min(i+10,accounts.length),indexed,failed,total:accounts.length}));
 }
 console.log(JSON.stringify({apply,indexed,failed,games,tickets,bonus,elapsedMs:Date.now()-started,failures}));if(failed)process.exitCode=1;
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
