'use strict';
const {createHash,randomUUID} = require('node:crypto');
const {gameOf,parseLimit,tableKey} = require('./table-subscriptions');
const active = tables => tables.filter(t=>String(t.leagueId)==='184691' && Number(t.playerCount)>0);
const players = table => [...new Set(Object.values(table?.pos || {}).map(id=>String(id).trim()).filter(id=>/^\d+$/.test(id)&&!/^0+$/.test(id)))].sort();
function fingerprint(tables) {
  if (!Array.isArray(tables)) throw new Error('Invalid table snapshot');
  const rows=active(tables).map(t=>[tableKey(t),String(t.playType).trim().toUpperCase(),String(t.blindAnnotation||'').trim(),Number(t.playerCount),players(t)]).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
  return createHash('sha256').update(JSON.stringify(rows)).digest('hex');
}
function interestsBetween(previous,current) {
  const old=new Map(active(previous).map(t=>[tableKey(t),t])), next=new Map(active(current).map(t=>[tableKey(t),t]));
  const affectedPlayers=new Set(), affectedGames=new Map();
  for (const id of new Set([...old.keys(),...next.keys()])) {
    const a=old.get(id),b=next.get(id),left=new Set(players(a)),right=new Set(players(b));
    for(const player of new Set([...left,...right])) if(left.has(player)!==right.has(player))affectedPlayers.add(player);
    const gameInterest = t => t && gameOf(t) ? {game:gameOf(t),limit:parseLimit(t.blindAnnotation)} : null;
    const before=gameInterest(a),after=gameInterest(b);
    if(JSON.stringify(before)!==JSON.stringify(after) || Number(a?.playerCount || 0)!==Number(b?.playerCount || 0)) {
      for(const game of [before,after]) if(game)affectedGames.set(JSON.stringify(game),game);
    }
  }
  return {players:[...affectedPlayers],games:[...affectedGames.values()]};
}
function mergeInterests(a={},b={}) {
  return {players:[...new Set([...(a.players||[]),...(b.players||[])])],games:[...new Map([...(a.games||[]),...(b.games||[])].map(g=>[JSON.stringify(g),g])).values()]};
}
function createCoordinator({redis,getTables,pollClub}) {
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
      const tables=await getTables(),hash=fingerprint(tables);
      const raw=(await run([['GET',key+'state']]))[0]?.result;
      const previous=raw ? JSON.parse(raw) : null,changed=previous?.hash!==hash;
      if(!changed&&!previous.pending)return {unchanged:true,sent:0};
      const interests=mergeInterests(previous?.pending?previous.interests:{},interestsBetween(previous?.tables||[],tables));
      const state={hash,pending:true,interests,tables:active(tables).map(t=>({deskId:t.deskId,leagueId:t.leagueId,unionId:t.unionId,groupId:t.groupId,playType:t.playType,blindAnnotation:t.blindAnnotation,playerCount:Number(t.playerCount),pos:Object.fromEntries(players(t).map((id,i)=>['pos'+i,id]))}))};
      // Preserve affected interests before dispatch; failures remain retryable.
      await run([['SET',key+'state',JSON.stringify(state)]]);
      const result=await pollClub(tables,interests);
      state.pending=result?.complete!==true;
      if(!state.pending)state.interests={players:[],games:[]};
      await run([['SET',key+'state',JSON.stringify(state)]]);
      return {changed,sent:Number(result?.sent||0),pending:state.pending};
    } finally {
      await run([['EVAL',"if redis.call('GET',KEYS[1]) == ARGV[1] then return redis.call('DEL',KEYS[1]) else return 0 end",'1',key+'lock',token]]);
    }
  };
}
let poll;
async function runCoordinator() {
  await require('./club-table-subscriptions').expire();
  if (!poll) poll=createCoordinator({redis:require('./redis'),getTables:require('./pokerplus').getPlayingTables,pollClub:require('./club-table-subscriptions').poll});
  return poll();
}
module.exports={createCoordinator,fingerprint,interestsBetween,runCoordinator};
