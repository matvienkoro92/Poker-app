#!/usr/bin/env node
'use strict';
// Read-only Redis audit. Only sanitized player scenario fields are written locally.
const fs=require('fs'),path=require('path');
const env=path.join(__dirname,'..','.vercel','.env.preview.local');
if(fs.existsSync(env))fs.readFileSync(env,'utf8').split(/\r?\n/).forEach(line=>{const m=line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)=(.*)\s*$/);if(m&&!process.env[m[1]])process.env[m[1]]=m[2].trim().replace(/^(['"])(.*)\1$/,'$2');});
const allowed=new Set(['GET','HGET','HMGET','HGETALL','SMEMBERS','SCARD','LRANGE','ZREVRANGE','HSCAN','HLEN','SISMEMBER']);let calls=0,commands=0;
async function read(cmds){if(cmds.some(c=>!allowed.has(c[0])))throw Error('Read-only audit rejected mutation');if(!process.env.UPSTASH_REDIS_REST_URL||!process.env.UPSTASH_REDIS_REST_TOKEN)throw Error('Redis credentials unavailable');const r=await fetch(process.env.UPSTASH_REDIS_REST_URL.replace(/\/$/,'')+'/pipeline',{method:'POST',headers:{Authorization:'Bearer '+process.env.UPSTASH_REDIS_REST_TOKEN,'Content-Type':'application/json'},body:JSON.stringify(cmds),signal:AbortSignal.timeout(30000)});if(!r.ok)throw Error('Redis HTTP '+r.status);const rows=await r.json();if(!Array.isArray(rows)||rows.some(r=>r.error))throw Error('Redis read failed');calls++;commands+=cmds.length;return rows.map(r=>r.result);}
const obj=x=>Array.isArray(x)?Object.fromEntries(Array.from({length:x.length/2},(_,i)=>[x[i*2],x[i*2+1]])):x||{};
const parse=x=>{try{return JSON.parse(x);}catch(_){return null;}};
(async()=>{
 const now=Date.now(),days=Array.from({length:28},(_,i)=>new Date(now+3*3600000-(27-i)*86400000).toISOString().slice(0,10));
 const sessions=[];for(let i=0;i<days.length;i+=7){const batch=days.slice(i,i+7);const rows=await read(batch.flatMap(d=>[['HGETALL','poker_app:analytics:v1:sessions:day:'+d],['HGETALL','poker_app:analytics:v1:session_accounts:day:'+d]]));batch.forEach((day,j)=>{const accounts=obj(rows[j*2+1]);Object.entries(obj(rows[j*2])).forEach(([sid,value])=>{const r=parse(value),accountId=accounts[sid]||(r&&r.a);if(r&&/^ID\d+$/.test(accountId||''))sessions.push({accountId,day,at:r.x});});});}
 const counts={};sessions.forEach(s=>{if(!counts[s.accountId])counts[s.accountId]={days:new Set(),last:0};counts[s.accountId].days.add(s.day);counts[s.accountId].last=Math.max(counts[s.accountId].last,s.at||0);});
 const candidates=Object.keys(counts).sort((a,b)=>counts[b].days.size-counts[a].days.size);
 const ids=[...new Set(['ID400800','ID403173',...candidates])];
 const [bindings,profiles,firstSeen]=await read([['HMGET','poker_app:pokerplus_user_ids',...ids],['HMGET','poker_app:pokerplus_profiles',...ids],['HMGET','poker_app:visitor_first_seen',...ids]]);
 const [aliases]=await read([['HMGET','poker_app:id_to_user',...ids]]);
 const [aliasFirst]=await read([['HMGET','poker_app:visitor_first_seen',...aliases.map(a=>a||'__missing__')]]);
 const records=ids.map((id,i)=>{const p=parse(profiles[i])||{};return {accountId:id,firstSeen:firstSeen[i]||aliasFirst[i]||null,nick:p.nickname||p.Nike||p.nick||'',bound:!!bindings[i],activeDays:counts[id]?counts[id].days.size:0,lastVisit:counts[id]&&counts[id].last?new Date(counts[id].last).toISOString():null};});
 const many=records.filter(r=>r.bound&&r.accountId!=='ID400800').sort((a,b)=>b.activeDays-a.activeDays)[0];const rare=records.filter(r=>r.bound&&r.activeDays>0).sort((a,b)=>a.activeDays-b.activeDays)[0];const unlinked=records.find(r=>!r.bound&&r.activeDays>0);const newcomer=records.filter(r=>r.firstSeen&&(Number(r.firstSeen)||Date.parse(r.firstSeen))>now-14*86400000).sort((a,b)=>(Number(b.firstSeen)||Date.parse(b.firstSeen))-(Number(a.firstSeen)||Date.parse(a.firstSeen)))[0];
 const selected=[...new Map([records[0],records[1],many,rare,unlinked,newcomer].filter(Boolean).map(r=>[r.accountId,r])).values()];
 for(const r of selected){const [friends,readIds,appearance,reminder,state,pushCount,pushDisabled,trackingSince]=await read([['SMEMBERS','poker_app:friendships:'+r.accountId],['SMEMBERS','poker_app:friend_news_read:'+r.accountId],['GET','poker_app:profile_appearance:'+r.accountId],['HGET','poker_app:tournament_reminders',r.accountId],['GET','poker_app:daily_poker_state:'+r.accountId+':rolling'],['HLEN','poker_app:chat_push_sub:'+r.accountId],['SISMEMBER','poker_app:chat_push_disabled',r.accountId],['GET','poker_app:friend_news_tracking_since:'+r.accountId]]);r.friends=Array.isArray(friends)?friends:[];r.readIds=Array.isArray(readIds)?readIds:[];r.appearance=parse(appearance);r.trackingSince=trackingSince;r.tournamentReminder=!!reminder;r.pushSubscriptions=Number(pushCount)||0;r.pushDisabled=!!Number(pushDisabled);const spin=parse(state)||{};r.spin={baseAttemptUsed:spin.baseAttemptUsed,windowStartedAt:spin.windowStartedAt,lastPlayedAt:spin.lastPlayedAt};}
 const rosterIds=[...new Set(selected.flatMap(r=>r.friends))];const friendProfiles=rosterIds.length?(await read([['HMGET','poker_app:pokerplus_profiles',...rosterIds]]))[0]:[];const friendNicks=Object.fromEntries(rosterIds.map((id,i)=>{const p=parse(friendProfiles[i])||{};return [id,p.nickname||p.Nike||p.nick||''];}));
 selected.forEach(r=>r.friends=r.friends.map(id=>({accountId:id,nick:friendNicks[id]})));
 const {buildSharedEvents}=require('../lib/friend-news');
 const results=require('../lib/friend-tournament-results.json');
 for(const r of selected){
   const events=buildSharedEvents({userId:r.accountId,pokerPlusNickname:r.nick},r.friends.map(f=>({userId:f.accountId,pokerPlusNickname:f.nick})),results,now);
   r.sharedEvents=events.map(e=>({id:e.id,at:e.at,friendId:e.actorId,friendNick:e.actorNick,tournament:e.tournamentName,read:r.readIds.includes(e.id),unreadAfterTracking:!!r.trackingSince&&Date.parse(e.at)>Date.parse(r.trackingSince)&&!r.readIds.includes(e.id)}));
   r.latestResult=results.filter(x=>String(x.nick).toLowerCase()===String(r.nick).toLowerCase()).sort((a,b)=>b.date.localeCompare(a.date))[0]||null;
   if(r.latestResult)r.latestResult={date:r.latestResult.dateLabel,tournament:r.latestResult.tournament,place:r.latestResult.place,reward:r.latestResult.reward};
 }
 const eventRows=[];for(let i=0;i<days.length;i+=7){const data=await read(days.slice(i,i+7).map(d=>['HGETALL','poker_app:analytics:v1:events:day:'+d]));data.forEach(raw=>Object.values(obj(raw)).forEach(value=>{const e=parse(value);if(e&&e.a)eventRows.push({accountId:e.a,at:Number(e.x),type:e.t,section:e.n,session:e.s,entity:e.q||'',target:e.d||''});}));}
 const metrics=require('../lib/engagement-metrics').calculateEngagement(sessions.map(s=>({accountId:s.accountId,at:Number(s.at)})),eventRows,{from:Date.parse(days[0]+'T00:00:00+03:00'),to:now,now});
 const out={checkedAt:new Date().toISOString(),source:'Redis configured in local Vercel preview environment; not a browser session',range:{from:days[0],to:days.at(-1)},calls,commands,activeAccounts:Object.keys(counts).length,metrics,selected};
 const dir=path.join(__dirname,'..','output','engagement-audit');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'player-scenarios.json'),JSON.stringify(out,null,2));console.log(JSON.stringify({checkedAt:out.checkedAt,activeAccounts:out.activeAccounts,scenarios:selected.map(r=>({id:r.accountId,nick:r.nick,bound:r.bound,activeDays:r.activeDays,friends:r.friends.length})),calls,commands}));
})().catch(e=>{console.error(e.message);process.exitCode=1;});
