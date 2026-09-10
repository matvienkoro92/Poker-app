'use strict';
const DAY=86400000;
const TYPES=['news_read','friend_news_read','news_comment_created','news_shared','news_link_copied','review_opened','review_created','review_reply_created','review_answer_read','appearance_saved','summary_action','tournament_reminder_saved','push_opened'];
const SOCIAL=new Set(['news_read','friend_news_read','news_comment_created','news_shared','review_opened','review_created','review_reply_created','review_answer_read','appearance_saved','tournament_reminder_saved']);
function monday(at){const d=new Date(at+3*3600000),day=(d.getUTCDay()+6)%7;return Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate()-day)-3*3600000;}
function label(at){return new Date(at+3*3600000).toISOString().slice(0,10);}
function ratio(n,d){return d?Math.round(1000*n/d)/10:null;}
function calculateEngagement(visits,events,options={}){
 const now=options.now||Date.now(),from=options.from||0,to=Math.min(options.to||now,now),weekly=new Map(),users=new Set(),socialUsers=new Set(),otherSections=new Set();
 const valid=rows=>(rows||[]).filter(r=>r.accountId&&Number.isFinite(r.at)&&r.at>=from&&r.at<=to);
 visits=valid(visits);events=valid(events).sort((a,b)=>a.at-b.at);
 for(const v of visits){users.add(v.accountId);const week=monday(v.at);if(!weekly.has(week))weekly.set(week,new Set());weekly.get(week).add(v.accountId);}
 for(const e of events){if(SOCIAL.has(e.type))socialUsers.add(e.accountId);if(e.type==='section_opened'&&!['home','daily-poker','raffles'].includes(e.section))otherSections.add(e.accountId);}
 const cohorts=[...weekly.entries()].sort((a,b)=>a[0]-b[0]).map(([week,accounts])=>{const complete=week>=from&&week+14*DAY<=to;const next=weekly.get(week+7*DAY)||new Set();const returned=[...accounts].filter(a=>next.has(a)).length;return {week:label(week),eligible:complete,active:accounts.size,returned:complete?returned:null,rate:complete?ratio(returned,accounts.size):null};});
 const grouped=new Map();for(const e of events){if(!grouped.has(e.accountId))grouped.set(e.accountId,[]);grouped.get(e.accountId).push(e);}for(const rows of grouped.values())rows.sort((a,b)=>a.at-b.at);
 function funnel(startType,endTypes,sameEntity,windowMs){const starts=events.filter(e=>e.type===startType),seen=new Set();let eligible=0,converted=0;for(const s of starts){const key=[s.accountId,s.entity||s.session||'',startType].join('|');if(seen.has(key)||s.at+windowMs>to)continue;seen.add(key);eligible++;if((grouped.get(s.accountId)||[]).some(e=>e.at>=s.at&&e.at<=s.at+windowMs&&endTypes.includes(e.type)&&(!sameEntity||(s.entity&&s.entity===e.entity))))converted++;}return {eligible,converted,rate:ratio(converted,eligible)};}
 let summaryStarts=0,summaryReached=0;for(const s of events.filter(e=>e.type==='summary_action'&&e.target&&e.at+600000<=to)){summaryStarts++;if((grouped.get(s.accountId)||[]).some(e=>((e.type==='section_opened'&&e.section===s.target)||(s.target==='friend-news'&&e.type==='friend_news_read'))&&e.session===s.session&&e.at>=s.at&&e.at<=s.at+600000))summaryReached++;}
 const featureStarted=events.filter(e=>TYPES.includes(e.type)).reduce((n,e)=>Math.min(n,e.at),Infinity);
 return {definition:'Аккаунты, активные в полную календарную неделю МСК и следующую за ней. Не D7 новых пользователей.',cohorts,activeAccounts:users.size,beyondRewards:{accounts:[...otherSections].filter(a=>users.has(a)).length,rate:ratio([...otherSections].filter(a=>users.has(a)).length,users.size)},meaningfulActions:{accounts:[...socialUsers].filter(a=>users.has(a)).length,rate:ratio([...socialUsers].filter(a=>users.has(a)).length,users.size)},instrumentedSince:Number.isFinite(featureStarted)?new Date(featureStarted).toISOString():null,newsToInteraction:funnel('news_read',['news_comment_created','news_shared'],true,7*DAY),friendNewsToInteraction:funnel('friend_news_read',['news_comment_created','news_shared'],true,7*DAY),pushToAnswerRead:funnel('push_opened',['review_answer_read'],true,DAY),summaryNavigation:{clicks:summaryStarts,reached:summaryReached,rate:ratio(summaryReached,summaryStarts)}};
}
module.exports={TYPES,calculateEngagement,monday};
