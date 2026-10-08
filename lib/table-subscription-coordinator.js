'use strict';
const {createHash,randomUUID} = require('node:crypto');
function fingerprint(tables) {
  if (!Array.isArray(tables)) throw new Error('Invalid table snapshot');
  const active = tables.filter(t=>String(t.leagueId)==='184691' && Number(t.playerCount)>0).map(t=>[
    String(t.leagueId),String(t.unionId),String(t.groupId),String(t.deskId),
    String(t.playType).trim().toUpperCase(),String(t.blindAnnotation || '').trim(),
    [...new Set(Object.values(t.pos || {}).map(id=>String(id).trim()).filter(id=>/^\d+$/.test(id)&&!/^0+$/.test(id)))].sort(),
  ]).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
  return createHash('sha256').update(JSON.stringify(active)).digest('hex');
}
function createCoordinator({redis,getTables,pollClub,pollReport}) {
  const key='poker21:table-subscriptions:coordinator:';
  async function run(commands) {
    const rows=await redis.pipeline(commands,{context:'table-subscription-coordinator',throwOnError:true});
    if (!rows || rows.some(row=>row.error)) throw new Error('Coordinator storage unavailable');
    return rows;
  }
  return async function poll() {
    const token=randomUUID();
    if ((await run([['SET',key+'lock',token,'NX','EX','115']]))[0]?.result!=='OK') return {busy:true};
    try {
      const tables=await getTables(), hash=fingerprint(tables);
      const raw=(await run([['GET',key+'state']]))[0]?.result;
      const previous=raw ? JSON.parse(raw) : null;
      const changed=previous?.hash!==hash;
      if (!changed && !previous.clubPending && !previous.reportPending) return {unchanged:true,sent:0};
      const state={hash,clubPending:changed || previous.clubPending,reportPending:changed || previous.reportPending};
      // Save work before dispatch so a failure or timeout remains retryable.
      await run([['SET',key+'state',JSON.stringify(state)]]);
      let sent=0;
      const results=await Promise.allSettled([
        state.clubPending ? pollClub(tables) : Promise.resolve({complete:true,sent:0}),
        state.reportPending ? pollReport(tables) : Promise.resolve({complete:true,sent:0}),
      ]);
      for (const [i,result] of results.entries()) {
        if (result.status==='fulfilled') {
          state[i===0?'clubPending':'reportPending']=result.value?.complete!==true;
          sent+=Number(result.value?.sent || 0);
        }
      }
      await run([['SET',key+'state',JSON.stringify(state)]]);
      if (results.some(result=>result.status==='rejected')) throw new Error('Notification dispatch incomplete; will retry');
      return {changed,sent,pending:state.clubPending||state.reportPending};
    } finally {
      await run([['EVAL',"if redis.call('GET',KEYS[1]) == ARGV[1] then return redis.call('DEL',KEYS[1]) else return 0 end",'1',key+'lock',token]]);
    }
  };
}
let poll;
async function runCoordinator() {
  const secret=process.env.TABLE_SUBSCRIPTIONS_REPORT_SECRET;
  if (!secret) throw new Error('TABLE_SUBSCRIPTIONS_REPORT_SECRET is required for the Poker21 bot');
  if (!poll) poll=createCoordinator({redis:require('./redis'),getTables:require('./pokerplus').getPlayingTables,
    pollClub:require('./club-table-subscriptions').poll,
    pollReport:async tables=>{
      const response=await fetch('https://poker21-app.vercel.app/api/cron-table-subscriptions',{
        method:'POST',headers:{'Content-Type':'application/json','x-cron-secret':secret},
        body:JSON.stringify({tables}),signal:AbortSignal.timeout(50000),
      });
      const data=await response.json();
      if (!response.ok || !data.ok) throw new Error('Poker21 subscription dispatch failed');
      return data;
    }});
  return poll();
}
module.exports={createCoordinator,fingerprint,runCoordinator};
