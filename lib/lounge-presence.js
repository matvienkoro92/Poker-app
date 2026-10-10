'use strict';
const C=require('../hero-catalog');
const {nickKey}=require('./profile-appearance');
const {parseLimit,tableKey}=require('./table-subscriptions');
const CACHE_KEY='poker_app:lounge:live_tables:v1';
const characters=new Set(['pokermanki','waaar','cooler','babnik']);
function character(nick,saved,account){const pilot=require('./hero-pilot-accounts.json')[account];if(characters.has(pilot))return pilot;if(characters.has(saved&&saved.characterId)&&saved.characterId!=='pokermanki')return saved.characterId;return (C.characters.find(c=>c.nicks.some(n=>nickKey(n)===nickKey(nick)))||{}).id||'pokermanki';}
function label(table){const type=String(table.playType||'').trim().toUpperCase().slice(0,24),limit=parseLimit(table.blindAnnotation);return (type||'Игра')+(limit?' '+limit.small+'/'+limit.big:'');}
function identify(tables,player){if(!/^\d+$/.test(String(player||''))||/^0+$/.test(String(player)))return {status:'unlinked',tables:[]};const active=tables.filter(t=>Number(t.playerCount)>0),matches=active.filter(t=>t.pos&&Object.values(t.pos).some(id=>String(id).trim()===String(player))).sort((a,b)=>tableKey(a).localeCompare(tableKey(b)));if(matches.length)return {status:'playing',tables:matches.map(t=>({key:tableKey(t),label:label(t),game:String(t.playType||'').trim().toUpperCase().slice(0,24),limit:parseLimit(t.blindAnnotation)}))};return {status:active.some(t=>!t.pos||typeof t.pos!=='object'||!Object.keys(t.pos).length||Object.values(t.pos).filter(id=>/^\d+$/.test(String(id))&&!/^0+$/.test(String(id))).length<Number(t.playerCount))?'unknown':'away',tables:[]};}
function create({redis,getTables,now=Date.now}){let pending=null;async function snapshot(){if(pending)return pending;pending=(async()=>{try{const [raw]=await redis([['GET',CACHE_KEY]]);if(raw){try{const cached=JSON.parse(raw);if(Number.isFinite(cached.checkedAt)&&now()-cached.checkedAt>=0&&now()-cached.checkedAt<(cached.available?15000:5000)&&Array.isArray(cached.tables))return cached;}catch(_){}}const list=await getTables();if(!Array.isArray(list))throw Error('Invalid live tables');const tables=list.map(t=>({deskId:String(t.deskId||''),leagueId:String(t.leagueId||''),unionId:String(t.unionId||''),groupId:String(t.groupId||''),playType:String(t.playType||''),blindAnnotation:String(t.blindAnnotation||''),playerCount:Number(t.playerCount)||0,pos:t.pos&&typeof t.pos==='object'&&!Array.isArray(t.pos)?t.pos:null}));const result={available:true,checkedAt:now(),tables};await redis([['SET',CACHE_KEY,JSON.stringify(result),'EX',15]]);return result;}catch(_){const failed={available:false,checkedAt:now(),tables:[]};try{await redis([['SET',CACHE_KEY,JSON.stringify(failed),'EX',5]]);}catch(_){}return failed;}})();try{return await pending;}finally{pending=null;}}
return {async read(accountId,seatIds){
const [ids]=await redis([['SMEMBERS','poker_app:friendships:'+accountId]]);
const friends=(Array.isArray(ids)?ids:[]).filter(id=>/^ID\d+$/.test(id)&&id!==accountId).slice(0,100);
if(!friends.length)return {available:true,checkedAt:now(),friends:[]};
// Any playing friend can occupy an available lounge seat, so resolve every character.
const selected=friends;
const values=await redis([...friends.map(id=>['HGET','poker_app:pokerplus_user_ids',id]),...selected.flatMap(id=>[['HGET','poker_app:pokerplus_profiles',id],['GET','poker_app:profile_hero:'+id]])]);
const live=values.slice(0,friends.length).some(v=>/^\d+$/.test(String(v||''))&&!/^0+$/.test(String(v)))?await snapshot():{available:true,checkedAt:now(),tables:[]};
return {available:live.available,checkedAt:live.checkedAt,friends:friends.map((id,n)=>{let profile={},saved={};const index=selected.indexOf(id),offset=friends.length+index*2;if(index>=0){try{profile=JSON.parse(values[offset]||'{}')||{};}catch(_){}try{saved=JSON.parse(values[offset+1]||'{}')||{};}catch(_){}}const player=values[n],state=live.available?identify(live.tables,player):{status:/^\d+$/.test(String(player||''))&&!/^0+$/.test(String(player))?'unknown':'unlinked',tables:[]};return {accountId:id,characterId:character(profile.nickname||profile.Nike||profile.nick||'',saved,id),...state};})};}};}

let service;
async function read(accountId,seatIds){if(!service)service=create({redis:require('./club-social').redis,getTables:require('./pokerplus').getPlayingTables});return service.read(accountId,seatIds);}
module.exports={create,read,identify,label,character,CACHE_KEY};
