'use strict';
const {pipeline}=require('./redis'),{isBroadcast}=require('./tracking-link-kind');
const P='poker_app:attribution:v1:',META='poker_app:track_links:meta';
const parse=v=>{try{return JSON.parse(v||'null')}catch(_){return null}};
async function read(commands){const rows=await pipeline(commands,{context:'tracking.own-source',throwOnError:true});if(!rows||rows.some(r=>!r||r.error))throw Error('source_unavailable');return rows.map(r=>r.result);}
async function ownContext(context,subjects){
 if(!context)return null;
 const refs=[...new Set([context.first.ref,context.last.ref])],meta=await read(refs.map(ref=>['HGET',META,ref])),known=new Map(refs.map((ref,i)=>[ref,parse(meta[i])]));
 if(refs.every(ref=>!isBroadcast(known.get(ref))))return context;
 const candidates=[context.first,context.last],events=[];
 for(const subject of [...new Set(subjects.filter(Boolean))]){let cursor='0';do{const [scan]=await read([['HSCAN',P+'events:'+subject,cursor,'COUNT','500']]);for(let i=1;i<(scan[1]||[]).length;i+=2){const e=parse(scan[1][i]);if(e?.ref&&Number.isFinite(Number(e.at)))events.push(e);}cursor=String(scan[0]);}while(cursor!=='0');}
 const missing=[...new Set(events.map(e=>e.ref))].filter(ref=>!known.has(ref));if(missing.length){const values=await read(missing.map(ref=>['HGET',META,ref]));missing.forEach((ref,i)=>known.set(ref,parse(values[i])));}
 candidates.push(...events.map(e=>({ref:e.ref,at:Number(e.at),label:known.get(e.ref)?.label||''})));
 const own=candidates.filter(t=>!isBroadcast(known.get(t.ref))).sort((a,b)=>a.at-b.at);
 return own.length?{first:own[0],last:own[own.length-1]}:null;
}
module.exports={ownContext};
