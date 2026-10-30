'use strict';
const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch();
 try{for(const discipline of ['chess','short','long']){
  const rooms=new Map(),service=require('../lib/board-games-room')({
   load:async id=>structuredClone(rooms.get(id)),
   create:async(id,room)=>{rooms.set(id,structuredClone(room));return true;},
   cas:async(id,revision,room)=>{if(rooms.get(id)?.revision!==revision)return false;rooms.set(id,structuredClone(room));return true;}
  });
  const room=await service.call('host',{action:'create',discipline,timeControl:discipline==='chess'?'blitz-3':undefined,turnSeconds:60});
  await service.call('guest',{action:'join',roomId:room.roomId});
  const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
   window.heldPoll=null;
   const original=window.fetch;
   window.fetch=(url,options)=>{
    const body=options?.body&&JSON.parse(options.body);
    if(body?.sinceRevision!==undefined){
     heldPoll=options.signal;
     return new Promise((resolve,reject)=>options.signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError')),{once:true}));
    }
    return original(url,options);
   };
  });
  await page.route('http://clock-lifecycle.test/**',async route=>{
   const url=new URL(route.request().url());
   if(url.pathname.startsWith('/api/')){
    const body=route.request().postDataJSON();if(body.action==='admission')return route.fulfill({json:{ok:true,conflict:null}});
    if(!['watch','access'].includes(body.action))return route.fulfill({json:{ok:true,active:null}});
    return route.fulfill({json:url.pathname!=='/api/board-games'||body.action==='access'?{ok:true,allowed:true}:await service.call('viewer',body)});
   }
   const file=path.join(process.cwd(),url.pathname);
   return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404});
  });
  await page.goto('http://clock-lifecycle.test/board-games-play.html?watch='+room.roomId);
  await page.waitForFunction(()=>window.PokerBoardGames?.inspect().ready&&heldPoll);
  // No-op refreshes in the same clock second must not touch the player cards.
  const mutations=await page.evaluate(()=>{
   const observer=new MutationObserver(()=>{});observer.observe(document.querySelector('#matchup'),{subtree:true,attributes:true,childList:true,characterData:true});
   window.dispatchEvent(new Event('online'));
   observer.takeRecords();
   for(let i=0;i<5;i++)window.dispatchEvent(new Event('online'));
   const count=observer.takeRecords().length;observer.disconnect();return count;
  });
  assert.equal(mutations,0,discipline+' rewrites unchanged player clocks');
  await page.waitForFunction(()=>heldPoll&&!heldPoll.aborted);
  await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pagehide')));
  assert.equal(await page.evaluate(()=>heldPoll.aborted),true,discipline+' leaves a room poll running after exit');
  assert.deepEqual(errors,[]);await page.close();
  console.log('PASS '+discipline+' unchanged clocks stay untouched; exit aborts frozen poll');
 }}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
