'use strict';
const crypto=require('crypto'),redis=require('./redis');
const {isBroadcast}=require('./tracking-link-kind');
const META='poker_app:track_links:meta',GRANTS='poker_app:track_links:category_grants';
const digest=token=>crypto.createHash('sha256').update(token).digest('hex');
async function read(commands){const rows=await redis.pipeline(commands);if(!rows||rows.length!==commands.length||rows.some(r=>!r||r.error))throw Error('storage_unavailable');return rows.map(r=>r.result);}
async function metadata(){const rows=await redis.hscanall(META,{count:200,maxPages:100,context:'tracking.category-access'});if(!rows)throw Error('storage_unavailable');return Object.entries(rows).flatMap(([id,raw])=>{try{const meta=JSON.parse(raw);return [{id,...meta}];}catch(_){return [];}});}
async function create(category,name,actor){category=String(category||'').trim();name=String(name||'').trim();if(!category||category.length>80||!name||name.length>80)throw Error('invalid_grant');if(!(await metadata()).some(r=>!isBroadcast(r)&&String(r.params?.category||'').trim()===category))throw Error('category_not_found');const token=crypto.randomBytes(32).toString('hex'),id=digest(token),grant={id,category,name,createdBy:actor,createdAt:Date.now()};await read([['HSET',GRANTS,id,JSON.stringify(grant)]]);return {token,grant};}
async function list(category){const rows=await redis.hscanall(GRANTS,{count:100,maxPages:100,context:'tracking.category-grants'});if(!rows)throw Error('storage_unavailable');return Object.values(rows).flatMap(raw=>{try{const row=JSON.parse(raw);return row.category&&(!category||row.category===category)?[row]:[];}catch(_){return [];}}).sort((a,b)=>b.createdAt-a.createdAt);}
async function revoke(id){if(!/^[a-f0-9]{64}$/.test(String(id)))throw Error('invalid_grant');await read([['HDEL',GRANTS,id]]);}
function shareToken(id) {
  const secret = process.env.TRACKING_CATEGORY_ACCESS_SECRET || process.env.TELEGRAM_BOT_TOKEN ||
    process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN;
  if (!secret || !/^[a-f0-9]{64}$/.test(id)) return null;
  const signature = crypto.createHmac('sha256', secret).update('tracking-category-access:v1:' + id).digest('hex');
  return id + '.' + signature;
}
function grantIdForToken(token) {
  if (/^[a-f0-9]{64}$/.test(token)) return digest(token);
  if (!/^[a-f0-9]{64}\.[a-f0-9]{64}$/.test(token)) return null;
  const id = token.slice(0, 64);
  const expected = shareToken(id);
  if (!expected || !crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected))) return null;
  return id;
}
async function resolve(token) {
  const id = grantIdForToken(String(token || ''));
  if (!id) return null;
  const [raw] = await read([['HGET',GRANTS,id]]);
  try { return raw ? JSON.parse(raw) : null; } catch (_) { return null; }
}
function belongs(link,grant){return !!link&&!isBroadcast(link)&&String(link.params?.category||'').trim()===grant.category;}
async function linkForGrant(id,grant){if(!/^[a-f0-9]{8}$/.test(String(id||'')))return null;const [raw]=await read([['HGET',META,id]]);try{const link=raw?{id,...JSON.parse(raw)}:null;return belongs(link,grant)?link:null;}catch(_){return null;}}
async function periodLinks(matches, grant, period) {
  const {PERIOD}=require('./tracking-link-counters');
  const results=[];
  for(let i=0;i<matches.length;i+=15){
    const batch=matches.slice(i,i+15);
    const values=await read(batch.map(({id})=>['EVAL',PERIOD,4,
      `poker_app:track_links:log:${id}`,'poker_app:track_links:totals',`poker_app:track_links:vd:${id}`,`poker_app:track_links:ev_n:${id}`,
      period.from,period.until,id]));
    batch.forEach((link,index)=>{
      const stats=values[index];
      if(!Array.isArray(stats)||stats.length!==6)throw Error('stats_unavailable');
      const [totalClicks,uniqueClicks,activeVisitors,actionEvents,hitsComplete,navComplete]=stats.map(Number);
      const partialMetrics = [
        ...(!hitsComplete ? ['totalClicks','uniqueClicks'] : []),
        ...(!navComplete ? ['activeVisitors','actionEvents'] : [])
      ];
      results.push({id:link.id,label:link.label||'Ссылка',createdAt:link.createdAt,category:grant.category,
        totalClicks,uniqueClicks,activeVisitors,actionEvents,partialMetrics});
    });
  }
  return results;
}
async function lifetimeLinks(matches,grant){const counters=require('./tracking-link-counters'),out=[];for(let i=0;i<matches.length;i+=30){const batch=matches.slice(i,i+30),stats=await read(batch.flatMap(r=>[['HGET','poker_app:track_links:totals',r.id],['EVAL',counters.SUMMARY,3,`poker_app:track_links:users:${r.id}`,`poker_app:track_links:ev_u:${r.id}`,`poker_app:track_links:vd:${r.id}`]]));batch.forEach((r,n)=>{const values=stats[n*2+1];if(!Array.isArray(values))throw Error('stats_unavailable');out.push({id:r.id,label:r.label||'Ссылка',createdAt:r.createdAt,category:grant.category,totalClicks:Number(stats[n*2])||0,uniqueClicks:Number(values[0])||0,activeVisitors:Number(values[1])||0,actionEvents:Number(values[2])||0});});}return out;}

async function links(grant, period) {
  const matches = (await metadata()).filter(link => belongs(link, grant));
  if (!period) return lifetimeLinks(matches, grant);
  const from = Date.parse(period.from);
  const wholeLifetime = Date.parse(period.until) > Date.now() ? matches.filter(link => {
    const created = Date.parse(link.createdAt || '');
    return Number.isFinite(created) && created >= from;
  }) : [];
  if (!wholeLifetime.length) return periodLinks(matches, grant, period);
  const fullIds = new Set(wholeLifetime.map(link => link.id));
  const [full, dated] = await Promise.all([
    lifetimeLinks(wholeLifetime, grant),
    periodLinks(matches.filter(link => !fullIds.has(link.id)), grant, period)
  ]);
  const byId = new Map([...full, ...dated].map(link => [link.id, link]));
  return matches.map(link => byId.get(link.id));
}

module.exports={create,list,revoke,resolve,shareToken,links,linkForGrant,belongs};
