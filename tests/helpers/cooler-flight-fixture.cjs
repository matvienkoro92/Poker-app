'use strict';
const vm = require('node:vm');
const fs = require('node:fs');
const crypto = require('node:crypto');
const Engine = require('../../app-cooler-flight-engine');
function fixture() {
  const strings = new Map(), hashes = new Map(), top = new Map();
  let now = Date.now(), configured = true;
  function ranked() { return [...top.entries()].sort((a,b) => b[1]-a[1] || b[0].localeCompare(a[0])); }
  function command(c) {
    const [op,k,...args] = c;
    if(op==='GET')return strings.get(k)||null;
    if(op==='SET'){strings.set(k,args[0]);return 'OK';}
    if(op==='ZREVRANGE')return ranked().slice(Number(args[0]),Number(args[1])+1).flatMap(([id,score])=>[id,String(score)]);
    if(op==='ZREVRANK'){const at=ranked().findIndex(([id])=>id===args[0]);return at<0?null:at;}
    if(op==='ZSCORE')return top.has(args[0])?String(top.get(args[0])):null;
    if(op==='HMGET')return args.map(id=>(hashes.get(k)||new Map()).get(id)||null);
    if(op==='EVAL'){
      const count=Number(args[0]), keys=args.slice(1,1+count), values=args.slice(1+count);
      if(k.includes("redis.call('INCR'"))return 1;
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
        if(Number(values[2])>=0){top.set(values[0],Math.max(top.get(values[0])||0,Number(values[2])));if(!hashes.has(keys[3]))hashes.set(keys[3],new Map());hashes.get(keys[3]).set(values[0],values[3]);}return 1;
      }
      if(k.includes('v.finished or v.tick')){
        if(!strings.has(keys[0]))return 0;const p=strings.get(keys[1]);if(p){const old=JSON.parse(p);if(old.finished||old.tick>Number(values[1]))return 0;}
        strings.set(keys[1],values[0]);return 1;
      }
    }
    throw new Error('Unsupported fixture command '+op);
  }
  class Clock extends Date { static now(){return now;} }
  const context={module:{exports:{}},require(p){if(p==='crypto')return crypto;if(p.includes('engine'))return Engine;
    if(p==='../api-auth')return {parseBody:r=>typeof r.body==='string'?JSON.parse(r.body):r.body||{},setCors(){},authRequired:r=>r.testPlayer?{ok:true,memberId:r.testPlayer,identity:{first_name:r.testPlayer}}:{ok:false,status:401}};
    if(p==='../redis')return {isConfigured:()=>configured,pipeline:async list=>list.map(c=>({result:command(c)}))};throw new Error(p);},process:{env:{}},Date:Clock,console};
  vm.runInNewContext(fs.readFileSync(require.resolve('../../lib/api-handlers/cooler-flight'),'utf8'),context);
  async function request(body,player='Alice'){
    let statusCode=200,data;
    await context.module.exports({method:'POST',body,testPlayer:player},{setHeader(){},status(n){statusCode=n;return this;},json(d){data=JSON.parse(JSON.stringify(d));return this;},end(){return this;}});
    return {status:statusCode,data};
  }
  return {request,strings,top,advance:ms=>{now+=ms;},setConfigured:v=>{configured=v;}};
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
