'use strict';
// Uses an isolated temporary Redis process, never club credentials or a shared database.
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('node:assert/strict'),{spawn,execFile}=require('child_process'),{promisify}=require('util');
const run=promisify(execFile),bin=process.env.HERO_TEST_REDIS_BIN||'/tmp/redis-7.4.2/src',socket='/tmp/hero-trades-'+process.pid+'.sock';
(async()=>{const server=spawn(path.join(bin,'redis-server'),['--port','0','--unixsocket',socket,'--save','','--appendonly','no'],{stdio:'ignore'});let startupError;server.on('error',e=>startupError=e);try{
 for(let n=0;n<100&&!fs.existsSync(socket)&&!startupError;n++)await new Promise(r=>setTimeout(r,50));if(startupError)throw startupError;assert.ok(fs.existsSync(socket),'Isolated Redis did not start');
 const redis=commands=>Promise.all(commands.map(async c=>JSON.parse((await run(path.join(bin,'redis-cli'),['-s',socket,'--json',...c.map(String)],{maxBuffer:4*1024*1024})).stdout)));
 function moduleAt(file,overrides){const filename=path.resolve(file),ctx={module:{exports:{}},require:id=>Object.hasOwn(overrides,id)?overrides[id]:require(require.resolve(id,{paths:[path.dirname(filename)]})),Date,console};vm.runInNewContext(fs.readFileSync(filename,'utf8'),ctx);return ctx.module.exports;}
 const H=moduleAt('lib/profile-hero.js',{'./club-social':{redis}}),T=moduleAt('lib/hero-trades.js',{'./club-social':{redis},'./profile-hero':H}),K=require('../lib/hero-collection'),P=require('../lib/pokerplus');
 let serial=0;const req=(action,extra={})=>({action,requestId:'real-redis-test-'+String(++serial).padStart(6,'0'),...extra});
 async function seed(){const a=H.fresh(),b=H.fresh();b.characterId='waaar';K.addModel(a,'final-body',10,'test',0);K.addModel(b,'grinder-body',10,'test',0);await redis([['SET','poker_app:profile_hero:ID400800',JSON.stringify(a)],['SET','poker_app:profile_hero:ID403173',JSON.stringify(b)],['SADD','poker_app:friendships:ID400800','ID403173'],['SADD','poker_app:friendships:ID403173','ID400800'],['HSET',P.PROFILE_HASH_KEY,'ID400800',JSON.stringify({nickname:'ПокерМанки'}),'ID403173',JSON.stringify({nickname:'Waaar'})],['HSET',P.BIND_HASH_KEY,'ID400800','1','ID403173','1']]);return {a,b,body:req('trade-create',{targetId:'ID403173',giveId:K.owned(a,'final-body').id,takeId:K.owned(b,'grinder-body').id})};}
 let f=await seed(),result=await T.handle('ID400800',f.body),id=result.trades.offers[0].id;
 assert.equal((await T.handle('ID403173',{action:'trade-count'})).incoming,1);await T.handle('ID400800',f.body);assert.equal((await T.list('ID400800')).trades.offers.length,1);assert.equal((await H.load('ID400800')).state.version,0);
 await assert.rejects(T.handle('ID400800',req('trade-accept',{offerId:id})),e=>e.status===403);
 const results=await Promise.allSettled([T.handle('ID403173',req('trade-accept',{offerId:id})),T.handle('ID403173',req('trade-accept',{offerId:id}))]);assert.ok(results.some(r=>r.status==='fulfilled'));
 let a=(await H.load('ID400800')).state,b=(await H.load('ID403173')).state;assert.equal(a.version,1);assert.equal(b.version,1);assert.equal(a.activity.filter(r=>r.kind==='trade').length,1);assert.ok(K.owned(a,'grinder-body'));assert.ok(K.owned(b,'final-body'));assert.ok(!K.owned(a,'final-body'));
 await T.handle('ID403173',req('trade-accept',{offerId:id}));assert.equal((await H.load('ID400800')).state.version,1);
 f=await seed();result=await T.handle('ID400800',f.body);id=result.trades.offers.find(o=>o.give.id===f.body.giveId).id;
 await H.updateHero('ID400800',req('wear',{version:0,item:f.body.giveId}));await assert.rejects(T.handle('ID403173',req('trade-accept',{offerId:id})),/недоступна/);assert.equal((await H.load('ID403173')).state.version,0);
 f=await seed();result=await T.handle('ID400800',f.body);id=result.trades.offers.find(o=>o.give.id===f.body.giveId).id;await redis([['SREM','poker_app:friendships:ID400800','ID403173']]);await assert.rejects(T.handle('ID403173',req('trade-accept',{offerId:id})),e=>e.status===403);assert.equal((await H.load('ID400800')).state.version,0);
 await T.handle('ID400800',req('trade-cancel',{offerId:id}));await assert.rejects(T.handle('ID403173',req('trade-accept',{offerId:id})),e=>e.status===409);
 console.log('PASS isolated Redis: create replay, role checks, concurrent acceptance, exactly-once swap, changed equipment, friendship removal, cancellation');
 }finally{server.kill();await new Promise(r=>server.once('exit',r));if(fs.existsSync(socket))fs.unlinkSync(socket);}})().catch(e=>{console.error(e);process.exitCode=1;});
