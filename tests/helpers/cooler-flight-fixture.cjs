'use strict';
const vm = require('node:vm');
const fs = require('node:fs');
const crypto = require('node:crypto');
const Engine = require('../../app-cooler-flight-engine');
function fixture(options={}) {
  const race=!!options.race,engine=race?require('../../app-monkey-race-engine'):Engine;
  const strings = new Map(), hashes = new Map(), top = new Map(), boards=new Map();
  let now = Date.now(), configured = true;
  function ranked(k) { return [...(k && k.includes(':daily:') ? boards.get(k)||new Map() : top).entries()].sort((a,b) => b[1]-a[1] || b[0].localeCompare(a[0])); }
  function command(c) {
    const [op,k,...args] = c;
    if(op==='GET')return strings.get(k)||null;
    if(op==='SET'){strings.set(k,args[0]);return 'OK';}
    if(op==='ZREVRANGE')return ranked(k).slice(Number(args[0]),Number(args[1])+1).flatMap(([id,score])=>[id,String(score)]);
    if(op==='ZREVRANK'){const at=ranked().findIndex(([id])=>id===args[0]);return at<0?null:at;}
    if(op==='ZSCORE')return top.has(args[0])?String(top.get(args[0])):null;
    if(op==='ZRANGEBYSCORE')return [...(boards.get(k)||new Map()).entries()].filter(([_,value])=>value<=Number(args[1])).sort((a,b)=>a[1]-b[1]).slice(0,100).map(([id])=>id);
    if(op==='HGETALL')return Object.fromEntries(hashes.get(k)||[]);
    if(op==='HMGET')return args.map(id=>(hashes.get(k)||new Map()).get(id)||null);
    if(op==='EVAL'){
      const count=Number(args[0]), keys=args.slice(1,1+count), values=args.slice(1+count);
      if(k.includes("redis.call('INCR'"))return 1;
      if(k.includes("redis.call('HEXISTS'")){
        if(!hashes.has(keys[2]))hashes.set(keys[2],new Map());const archive=hashes.get(keys[2]);
        if(archive.has(values[0])||now<Number(values[1]))return 0;
        const winner=ranked(keys[0])[0];if(winner)archive.set(values[0],JSON.stringify({...JSON.parse(values[2]),member:winner[0],name:hashes.get(keys[1]).get(winner[0]),score:Math.floor(winner[1]/100000000)}));
        boards.get(keys[3])?.delete(values[0]);return 1;
      }

      if(k.includes('r.rematch=r.rematch or')){
        const raw=strings.get(keys[0]);if(!raw)return 'missing';const r=JSON.parse(raw);
        const side=r.host.member===values[0]?'host':r.guest&&r.guest.member===values[0]?'guest':'';
        if(!side)return 'forbidden';if(r[side].runId!==values[1])return 'stale';if(!r.guest)return 'unfinished';
        const a=JSON.parse(strings.get(keys[1])||'null'),b=JSON.parse(strings.get(keys[2])||'null');if(!a||!b||!a.finished||!b.finished)return 'unfinished';
        r.rematch=r.rematch||{};r.rematch[side]=true;
        if(r.rematch.host&&r.rematch.guest){const h=JSON.parse(values[2]),g=JSON.parse(values[3]);r.host.runId=h.id;r.guest.runId=g.id;r.seed=h.seed;r.startAt=h.startAt;r.round=(r.round||1)+1;r.rematch={};strings.set(keys[3],values[2]);strings.set(keys[4],values[3]);}
        strings.set(keys[0],JSON.stringify(r));return 'ready';
      }
      if(k.includes('r.guest=cjson.decode')){
        const raw=strings.get(keys[0]);if(!raw)return 'missing';const r=JSON.parse(raw);
        if(r.host.member===values[0])return 'host';
        if(r.guest)return r.guest.member===values[0]?'guest':'full';
        const hostRaw=strings.get(keys[1]);if(!hostRaw)return 'missing';
        r.guest=JSON.parse(values[1]);r.startAt=Number(values[2]);const h=JSON.parse(hostRaw);h.startAt=r.startAt;
        strings.set(keys[1],JSON.stringify(h));strings.set(keys[2],values[3]);strings.set(keys[0],JSON.stringify(r));return 'joined';
      }
      if(k.includes("redis.call('DEL',KEYS[1])")){
        const raw=strings.get(keys[0]);if(!raw)return 0;const r=JSON.parse(raw);if(r.member!==values[0])return -1;
        strings.delete(keys[0]);strings.set(keys[1],values[1]);
        if(Number(values[2])>=0){top.set(values[0],Math.max(top.get(values[0])||0,Number(values[2])));if(!hashes.has(keys[3]))hashes.set(keys[3],new Map());hashes.get(keys[3]).set(values[0],values[3]);}
        if(keys.length===7 && Number(values[2])>0 && now<Number(values[4])){
          if(!boards.has(keys[4]))boards.set(keys[4],new Map());const board=boards.get(keys[4]);const value=Number(values[2])*100000000+Number(values[4])-now;
          board.set(values[0],Math.max(board.get(values[0])||0,value));if(!hashes.has(keys[5]))hashes.set(keys[5],new Map());hashes.get(keys[5]).set(values[0],values[3]);
          if(!boards.has(keys[6]))boards.set(keys[6],new Map());boards.get(keys[6]).set(values[5],Number(values[4]));
        }return 1;
      }
      if(k.includes('v.finished or v.tick')){
        if(!strings.has(keys[0]))return 0;const p=strings.get(keys[1]);if(p){const old=JSON.parse(p);if(old.finished||old.tick>Number(values[1]))return 0;}
        strings.set(keys[1],values[0]);return 1;
      }
    }
    throw new Error('Unsupported fixture command '+op);
  }
  class Clock extends Date { static now(){return now;} }
  const context={module:{exports:{}},require(p){if(p==='../cooler-flight-daily'){const dailyContext={module:{exports:{}},Date:Clock};vm.runInNewContext(fs.readFileSync(require.resolve('../../lib/cooler-flight-daily'),'utf8'),dailyContext);return dailyContext.module.exports;}if(p==='crypto')return crypto;if(p.includes('engine'))return engine;
    if(p==='../pokerplus')return {PROFILE_HASH_KEY:'poker_app:pokerplus_profiles'};if(p==='../account-canonical')return {canonicalAccountId:async id=>(hashes.get('poker_app:account_redirects')||new Map()).get(id)||id};
    if(p==='../api-auth')return {parseBody:r=>typeof r.body==='string'?JSON.parse(r.body):r.body||{},setCors(){},authRequired:r=>r.testPlayer?{ok:true,memberId:r.testPlayer,identity:r.testIdentity||{first_name:r.testPlayer}}:{ok:false,status:401}};
    if(p==='../redis')return {isConfigured:()=>configured,pipeline:async list=>list.map(c=>({result:command(c)}))};throw new Error(p);},process:{env:{}},Date:Clock,console};
  vm.runInNewContext(fs.readFileSync(require.resolve(race?'../../lib/api-handlers/monkey-race':'../../lib/api-handlers/cooler-flight'),'utf8'),context);
  async function request(body,player='Alice',identity){
    let statusCode=200,data;
    await context.module.exports({method:'POST',body,testPlayer:player,testIdentity:identity},{setHeader(){},status(n){statusCode=n;return this;},json(d){data=JSON.parse(JSON.stringify(d));return this;},end(){return this;}});
    return {status:statusCode,data};
  }
  return {request,strings,top,hashes,boards,setTime:value=>{now=value;},advance:ms=>{now+=ms;},setConfigured:v=>{configured=v;}};
}
function fly(seed,until=1100){
  const s=Engine.create(seed),taps=[];
  while(s.alive){
    const next=s.obstacles.find(o=>o.x+o.width>s.x-Engine.RADIUS);
    const target=next?next.center:270;
    const flap=s.tick<until && s.tick-s.lastFlap>=7 && s.vy>=0 && s.y+Math.max(0,s.vy)*10>target+35;
    if(flap)taps.push(s.tick);Engine.step(s,flap);
  }
  return {s,taps};
}
module.exports={fixture,fly};
