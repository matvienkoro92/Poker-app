'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('lib/api-handlers/admin.js','utf8');
test('bonus balance search indexes Poker21 IDs for account and Telegram aliases',async()=>{
 const ctx={Date,Map,Set,JSON,Number,String,Array,Math,bonusBalancesSnapshotCache:null,BONUS_BALANCES_SNAPSHOT_TTL_MS:30000,BONUS_BALANCES_SNAPSHOT_CACHE_KEY:'snapshot',mapObject:v=>v||{},intValue:v=>Number(v)||0};
 for(const key of ['BONUS_USERS_KEY','DAILY_POKER_USERS_KEY','BONUS_BALANCES_KEY','DAILY_POKER_PLAYED_COUNT_KEY','DAILY_POKER_TICKET_COUNT_KEY','DAILY_POKER_LAST_GAME_AT_KEY','USERNAMES_KEY','CHAT_DISPLAY_NAMES_KEY','EMAIL_ORIGINALS_KEY','ID_TO_USER_KEY','DT_IDS_KEY','POKERPLUS_BIND_HASH_KEY'])ctx[key]=key;
 const data={BONUS_USERS_KEY:['ID240934','tg_5136488563'],BONUS_BALANCES_KEY:{ID240934:5150},ID_TO_USER_KEY:{ID240934:'tg_5136488563',tg_5136488563:'tg_5136488563'},DT_IDS_KEY:{tg_5136488563:'ID240934'},POKERPLUS_BIND_HASH_KEY:{ID240934:'337922'}};
 ctx.redisPipeline=async commands=>commands.map(([op,key])=>({result:op==='GET'?null:data[key]||{}}));
 vm.createContext(ctx);
 vm.runInContext(source.slice(source.indexOf('function normalizeSearch('),source.indexOf('async function resolveTargetAccountId(')),ctx);
 vm.runInContext(source.slice(source.indexOf('function rowSearchText('),source.indexOf('async function readBonusTotalsCached(')),ctx);
 const snapshot=await ctx.readBonusBalancesSnapshot();
 const matches=snapshot.users.filter(row=>row.searchText.includes('337922'));
 assert.equal(matches.length,1);assert.equal(matches[0].bonusBalance,5150);assert.equal(matches[0].poker21Id,'337922');
 assert.ok(matches[0].searchText.includes('id240934'));assert.ok(matches[0].searchText.includes('tg_5136488563'));
 assert.equal(snapshot.users.filter(row=>row.searchText.includes('999999')).length,0);
});
