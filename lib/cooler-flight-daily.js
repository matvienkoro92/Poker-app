'use strict';
const DAY=86400000, OFFSET=14*3600000, SCALE=100000000;
const WINNER_QUEUE_KEY='poker_app:cooler_flight:winner_notifications:v1';
const PREFIX='poker_app:cooler_flight:daily:v1:';
function round(now=Date.now()) {
  const end=(Math.floor((now-OFFSET)/DAY)+1)*DAY+OFFSET;
  const date=new Date(end+3*3600000).toISOString().slice(0,10);
  const day=new Date(end+3*3600000).getUTCDay();
  return {date,end,prize:day===0||day===6?'Билет за 500 ₽':'Билет на турнир вечера'};
}
const CLOSE="if redis.call('HEXISTS',KEYS[3],ARGV[1])==1 then return 0 end;local t=redis.call('TIME');if tonumber(t[1])*1000<tonumber(ARGV[2]) then return 0 end;local top=redis.call('ZREVRANGE',KEYS[1],0,0,'WITHSCORES');if #top>0 then local row=cjson.decode(ARGV[3]);row.member=top[1];row.name=redis.call('HGET',KEYS[2],top[1]) or 'Игрок клуба';row.score=math.floor(tonumber(top[2])/100000000);local payload=cjson.encode(row);redis.call('HSET',KEYS[3],ARGV[1],payload);redis.call('HSET',KEYS[5],ARGV[1],payload);end;redis.call('ZREM',KEYS[4],ARGV[1]);return 1";
module.exports=function(commands){
  async function settle(){
    const [dates]=await commands([['ZRANGEBYSCORE',PREFIX+'pending','-inf',Date.now(),'LIMIT',0,100]]);
    for(const date of dates||[]){const end=Date.parse(date+'T17:00:00+03:00');const r=round(end-1);await commands([['EVAL',CLOSE,5,PREFIX+date,PREFIX+date+':names',PREFIX+'winners',PREFIX+'pending',WINNER_QUEUE_KEY,date,end,JSON.stringify(r)]]);}
  }
  return {
    settle,
    async get(member){await settle();const r=round();const [raw,names,archive]=await commands([['ZREVRANGE',PREFIX+r.date,0,19,'WITHSCORES'],['HGETALL',PREFIX+r.date+':names'],['HGETALL',PREFIX+'winners']]);
      function hash(v){if(!Array.isArray(v))return v||{};const h={};for(let i=0;i<v.length;i+=2)h[v[i]]=v[i+1];return h;}
      const nick=hash(names),saved=hash(archive),rows=[];for(let i=0;i<(raw||[]).length;i+=2)rows.push({place:i/2+1,name:nick[raw[i]]||'Игрок клуба',score:Math.floor(Number(raw[i+1])/SCALE),mine:raw[i]===member});
      return {...r,rows,winners:Object.values(saved).map(v=>JSON.parse(v)).sort((a,b)=>b.end-a.end).slice(0,60)};
    }
  };
};
module.exports.round=round;
