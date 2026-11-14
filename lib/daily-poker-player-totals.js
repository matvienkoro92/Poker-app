'use strict';
const PREFIX='poker_app:daily_poker_player_totals:v1:';
const COUNT='poker_app:daily_poker_played_count';
function amounts(g){return {ticket:Number(g.ticket_balance_credited||0)+Number(g.ticketless_streak_ticket_balance_credited||0),bonus:Number(g.bonus_credited||0)};}
function writes(account,g){const a=amounts(g),key=PREFIX+account;return [['HINCRBY',key,'count',1],['HINCRBY',key,'ticket',a.ticket],['HINCRBY',key,'bonus',a.bonus],['HINCRBY',key,'hand:'+String(g.hand_rank||'unknown'),1]];}
const SAVE="if (redis.call('HGET',KEYS[1],ARGV[1]) or '0')~=ARGV[2] then return 0 end; redis.call('DEL',KEYS[2]); for i=3,#ARGV,2 do redis.call('HSET',KEYS[2],ARGV[i],ARGV[i+1]) end; return 1";
function object(pairs){if(!Array.isArray(pairs))return pairs||{};const out={};for(let i=0;i<pairs.length;i+=2)out[pairs[i]]=pairs[i+1];return out;}
async function read(account,pipeline){
 if(!/^ID\d{6}$/.test(account))throw Error('Invalid spin account');
 const run=async commands=>{const rows=await pipeline(commands,{throwOnError:true,context:'daily-poker.player-totals'});if(!rows||rows.some(r=>r.error))throw Error('Spin statistics unavailable');return rows.map(r=>r.result);};
 const [raw,countRaw]=await run([['HGETALL',PREFIX+account],['HGET',COUNT,account]]),count=Number(countRaw||0),cached=object(raw);
 if(cached.ready==='1'&&Number(cached.count)===count)return cached;
 if(count===0){const total={ready:'1',count:'0',ticket:'0',bonus:'0'};const [saved]=await run([['EVAL',SAVE,2,COUNT,PREFIX+account,account,'0',...Object.entries(total).flat()]]);if(Number(saved)!==1)throw Error('Spin changed during bootstrap; retry');return total;}
 // Bootstrap once. Every later spin updates this small hash in the spin transaction.
 const keys=new Set(['poker_app:daily_poker_games_user:'+account]);let cursor='0',pages=0;const deadline=Date.now()+12000;
 do{if(++pages>100||Date.now()>deadline)throw Error('Spin archive inventory timeout');const [r]=await run([['SCAN',cursor,'MATCH','poker_app:daily_poker_games_date:'+account+':*','COUNT',500]]);if(!Array.isArray(r))throw Error('Spin archive unavailable');cursor=String(r[0]);for(const key of r[1])keys.add(key);}while(cursor!=='0');
 const ids=new Set(),list=[...keys];for(let i=0;i<list.length;i+=50){const rows=await run(list.slice(i,i+50).map(key=>['LRANGE',key,0,-1]));for(const row of rows){if(!Array.isArray(row))throw Error('Spin archive unavailable');for(const id of row)ids.add(id);}}
 const total={ready:'1',count:'0',ticket:'0',bonus:'0'},all=[...ids];
 for(let i=0;i<all.length;i+=100){const [rows]=await run([['MGET',...all.slice(i,i+100).map(id=>'poker_app:daily_poker_game:'+id)]]);for(const raw of rows){if(!raw)throw Error('Incomplete spin archive');const g=JSON.parse(raw),a=amounts(g);total.count=String(Number(total.count)+1);total.ticket=String(Number(total.ticket)+a.ticket);total.bonus=String(Number(total.bonus)+a.bonus);const key='hand:'+String(g.hand_rank||'unknown');total[key]=String(Number(total[key]||0)+1);}}
 if(Number(total.count)!==count)throw Error('Spin archive count mismatch');
 const [saved]=await run([['EVAL',SAVE,2,COUNT,PREFIX+account,account,String(count),...Object.entries(total).flat()]]);
 if(Number(saved)!==1)throw Error('Spin changed during bootstrap; retry');
 return total;
}
module.exports={read,writes,amounts,PREFIX,SAVE};
