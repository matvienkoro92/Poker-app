'use strict';
const G=require('../app-garage-catalog');
const PREFIX='poker_app:garage:';
async function read(accountId,redis,friends=[]){const ids=[accountId,...friends.map(f=>f.accountId)];const rows=await redis(ids.map(id=>['GET',PREFIX+'stats:'+id]));const states=rows.map(raw=>{try{return G.stats(JSON.parse(raw||'{}'));}catch(_){return G.stats({});}});return {stats:states[0],friendBest:friends.map((f,n)=>({name:f.nick,best:states[n+1].best})).filter(f=>f.best>0).sort((a,b)=>b.best-a.best)[0]||null};}
function view(saved,progress){return {...progress,loadout:G.normalize(saved.garage,progress.stats),catalog:G.catalog(progress.stats),groups:G.groups};}
function choose(value,progress){try{return G.normalize(value,progress.stats,true);}catch(e){throw Object.assign(e,{status:400});}}
module.exports={read,view,choose,PREFIX};
