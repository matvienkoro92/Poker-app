"use strict";
const {displayNick}=require('./club-monthly-summary');
const DAY=86400000;
function buildAchievementNews(input) {
  const rows=input.filter(r=>r.tournamentId && r.reward>0 && /^\d{4}-\d{2}-\d{2}/.test(r.date)).map(r=>({...r,nick:displayNick(r.nick),minor:Math.round(r.reward*100),day:r.date.slice(0,10)})).sort((a,b)=>a.day.localeCompare(b.day)||a.tournamentId.localeCompare(b.tournamentId)||a.nick.localeCompare(b.nick,'ru'));
  if(!rows.length)return [];
  const latest=rows.at(-1).day, cutoff=new Date(Date.parse(latest+'T00:00:00Z')-13*DAY).toISOString().slice(0,10);
  const state=new Map(),groups=new Map();
  function add(kind,day,item){const key=kind+'|'+day;if(!groups.has(key))groups.set(key,{id:key,kind,date:day+'T18:00:00',items:[]});groups.get(key).items.push(item);}
  const keyOf=nick=>nick.toLowerCase().replace(/\s+/g,'');
  for(const r of rows){const key=keyOf(r.nick),s=state.get(key)||{total:0,max:0,first:false};
    if(r.day>=cutoff){
      const item={nick:r.nick,reward:r.minor/100,tournament:r.tournament,date:r.dateLabel,place:r.place};
      if(r.place===1&&!s.first)add('first',r.day,item);
      if(r.minor>=5000000)add('big',r.day,item);
      if(s.max>0&&r.minor>s.max)add('personal',r.day,{...item,previous:s.max/100});
      for(const threshold of [10000000,50000000,100000000])if(s.total<threshold&&s.total+r.minor>=threshold)add('milestone',r.day,{...item,threshold:threshold/100,total:(s.total+r.minor)/100});
    }
    s.first=s.first||r.place===1;s.max=Math.max(s.max,r.minor);s.total+=r.minor;state.set(key,s);
  }
  // Monday–Sunday, using date labels rather than the machine timezone.
  const latestMs=Date.parse(latest+'T00:00:00Z'),weekday=new Date(latestMs).getUTCDay();
  const currentMonday=latestMs-((weekday+6)%7)*DAY;
  const endMs=weekday===0?latestMs:currentMonday-DAY,startMs=endMs-6*DAY;
  const start=new Date(startMs).toISOString().slice(0,10),end=new Date(endMs).toISOString().slice(0,10);
  const week=rows.filter(r=>r.day>=start&&r.day<=end);
  if(week.length){const top=week.slice().sort((a,b)=>b.minor-a.minor||a.nick.localeCompare(b.nick,'ru')).slice(0,5).map(r=>({nick:r.nick,reward:r.minor/100,tournament:r.tournament,date:r.dateLabel,place:r.place}));
    const stats={start,end,total:week.reduce((n,r)=>n+r.minor,0)/100,first:week.filter(r=>r.place===1).length,paid:week.length,players:new Set(week.map(r=>keyOf(r.nick))).size,big50:week.filter(r=>r.minor>=5000000&&r.minor<10000000).length,big100:week.filter(r=>r.minor>=10000000).length};
    add('weekly',end,{...stats,top});add('record',end,{...stats,top});
    const winners=new Map();for(const r of week.filter(r=>r.place===1)){const k=keyOf(r.nick),p=winners.get(k)||{nick:r.nick,wins:0,reward:0};p.wins++;p.reward+=r.minor;winners.set(k,p);}
    for(const p of [...winners.values()].filter(p=>p.wins>=2).sort((a,b)=>b.wins-a.wins||b.reward-a.reward))add('series',end,{...p,reward:p.reward/100,start,end});
  }
  // Keep the newest card for each category so the feed remains concise.
  const newest=new Map();for(const g of [...groups.values()].sort((a,b)=>a.date.localeCompare(b.date)))newest.set(g.kind,g);
  return [...newest.values()].sort((a,b)=>b.date.localeCompare(a.date)||a.kind.localeCompare(b.kind));
}
module.exports={buildAchievementNews};
